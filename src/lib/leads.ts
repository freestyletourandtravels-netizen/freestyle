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

const FORM_NAMES: Record<string, string> = {
  quick: "Website popup",
  popup: "Trip planner",
  package: "Package enquiry",
  contact: "Contact page",
};

/** Subject + HTML + plain-text body for a lead notification email. */
function leadEmail(lead: Lead) {
  const rows: [string, string | number | undefined][] = [
    ["Name", lead.fullName],
    ["WhatsApp / Mobile", formatPhone(lead)],
    ["Email", lead.email],
    ["Destination", lead.destination],
    ["Travel date", lead.travelDate],
    ["Adults", lead.adults],
    ["Children", lead.children],
    ["Trip style", lead.packageCategory],
    ["Hotel preference", lead.hotelPreference],
    ["Package", lead.packageName],
    ["Message", lead.message],
    ["Form", FORM_NAMES[lead.source] ?? lead.source],
    ["Page", lead.pageUrl],
    ["Received", new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ];
  const filled = rows.filter(([, v]) => v !== undefined && v !== "");
  const wa = `https://wa.me/${lead.countryCode || "91"}${lead.phone}`;
  const subject = `New enquiry: ${lead.fullName}${lead.destination ? ` · ${lead.destination}` : ""}${lead.travelDate ? ` · ${lead.travelDate}` : ""}`;

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e3e8ef;border-radius:14px;overflow:hidden">
  <div style="background:#243b60;color:#fff;padding:18px 22px">
    <div style="font-size:12px;letter-spacing:1px;color:#f6b8b0;text-transform:uppercase">Freestyle Tour &amp; Travels</div>
    <div style="font-size:20px;font-weight:bold;margin-top:4px">New website enquiry</div>
  </div>
  <table cellpadding="8" style="width:100%;border-collapse:collapse;font-size:14px;color:#171b22">${filled
    .map(([k, v]) => `<tr style="border-bottom:1px solid #f0f2f5"><td style="width:38%;color:#5f6878">${k}</td><td><b>${escapeHtml(String(v))}</b></td></tr>`)
    .join("")}</table>
  <div style="padding:18px 22px">
    <a href="${wa}" style="display:inline-block;background:#25d366;color:#0b2e1a;text-decoration:none;font-weight:bold;padding:10px 18px;border-radius:999px">Reply on WhatsApp</a>
    <a href="tel:+${lead.countryCode || "91"}${lead.phone}" style="display:inline-block;margin-left:8px;color:#243b60;font-weight:bold">Call ${escapeHtml(formatPhone(lead))}</a>
  </div>
</div>`;
  const text = filled.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nReply on WhatsApp: ${wa}`;
  return { subject, html, text };
}

/** Gmail (or any SMTP) — set SMTP_USER + SMTP_PASS (a Gmail App Password). */
async function sendViaSmtp(lead: Lead, to: string) {
  const nodemailer = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10000,
  });
  const { subject, html, text } = leadEmail(lead);
  await transport.sendMail({
    from: process.env.LEADS_FROM_EMAIL || `"Freestyle Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo: lead.email || undefined,
    subject,
    html,
    text,
  });
}

async function sendViaResend(lead: Lead, apiKey: string, to: string) {
  const { subject, html, text } = leadEmail(lead);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEADS_FROM_EMAIL || "Freestyle Website <onboarding@resend.dev>",
      to: [to],
      reply_to: lead.email,
      subject,
      html,
      text,
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
  const notify = process.env.LEADS_NOTIFY_EMAIL || "Freestyletourandtravels@gmail.com";
  if (process.env.SMTP_USER && process.env.SMTP_PASS) tasks.push({ name: "email (smtp)", run: () => sendViaSmtp(lead, notify) });
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) tasks.push({ name: "email (resend)", run: () => sendViaResend(lead, resendKey, notify) });

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
