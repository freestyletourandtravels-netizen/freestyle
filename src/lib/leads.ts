import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { formatPhone, type Enquiry } from "./enquiry-schema";

/**
 * Lead storage layer. A lead is considered SAVED only if at least one
 * persistent destination succeeds (file, webhook or email). If none do,
 * the API returns an error and the visitor is offered WhatsApp instead —
 * we never show a fake success message.
 *
 * Configure with environment variables (see .env.example / README).
 */

/** Older leads (before the multi-step form) may carry `travellers` / `packageType` instead. */
export type Lead = Enquiry & { id: string; createdAt: string; userAgent?: string; travellers?: number; packageType?: string };

const filePath = () => path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.LEADS_FILE_PATH || "./data/leads.jsonl");
const fileStorageEnabled = () => (process.env.LEADS_FILE_STORAGE ?? "true").toLowerCase() !== "false";

async function saveToFile(lead: Lead) {
  const file = filePath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.appendFile(file, JSON.stringify(lead) + "\n", "utf8");
}

async function sendToWebhook(lead: Lead, url: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(lead: Lead, apiKey: string, to: string) {
  const rows: [string, string | number | undefined][] = [
    ["Name", lead.fullName],
    ["WhatsApp", formatPhone(lead)],
    ["Email", lead.email],
    ["Travel date", lead.travelDate],
    ["Adults", lead.adults],
    ["Children", lead.children],
    ["Destination", lead.destination],
    ["Trip style", lead.packageCategory],
    ["Hotel preference", lead.hotelPreference],
    ["Package", lead.packageName],
    ["Message", lead.message],
    ["Form", lead.source],
    ["Page", lead.pageUrl],
  ];
  const html = `<h2>New Kashmir trip enquiry</h2><table cellpadding="6">${rows
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(String(v))}</td></tr>`)
    .join("")}</table><p><a href="https://wa.me/${lead.countryCode || "91"}${lead.phone}">Reply on WhatsApp</a></p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEADS_FROM_EMAIL || "Freestyle Website <onboarding@resend.dev>",
      to: [to],
      reply_to: lead.email,
      subject: `New enquiry: ${lead.fullName} · ${lead.destination}${lead.travelDate ? ` · ${lead.travelDate}` : ""}`,
      html,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

export async function storeLead(enquiry: Enquiry, meta: { userAgent?: string } = {}): Promise<Lead> {
  const lead: Lead = {
    ...enquiry,
    company: undefined,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    userAgent: meta.userAgent?.slice(0, 200),
  };

  const tasks: { name: string; run: () => Promise<void> }[] = [];
  if (fileStorageEnabled()) tasks.push({ name: "file", run: () => saveToFile(lead) });
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) tasks.push({ name: "webhook", run: () => sendToWebhook(lead, webhook) });
  const resendKey = process.env.RESEND_API_KEY;
  const notify = process.env.LEADS_NOTIFY_EMAIL;
  if (resendKey && notify) tasks.push({ name: "email", run: () => sendEmail(lead, resendKey, notify) });

  if (tasks.length === 0) throw new Error("No lead storage is configured");

  const results = await Promise.allSettled(tasks.map((t) => t.run()));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[leads] ${tasks[i].name} failed:`, r.reason);
  });
  if (!results.some((r) => r.status === "fulfilled")) throw new Error("All lead storage destinations failed");
  return lead;
}

export async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(filePath(), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((l) => JSON.parse(l) as Lead)
      .reverse();
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}
