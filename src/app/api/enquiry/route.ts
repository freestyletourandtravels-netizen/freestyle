import { NextResponse, type NextRequest } from "next/server";
import { enquirySchema, fieldErrors } from "@/lib/enquiry-schema";
import { readLeads, storeLead } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple in-memory rate limit: 5 submissions / 10 minutes per IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries in a short time. Please try again shortly or contact us on WhatsApp." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bots without storing anything.
  if (body && typeof body === "object" && "company" in body && (body as { company?: string }).company) {
    return NextResponse.json({ ok: true });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  try {
    const lead = await storeLead(parsed.data, { userAgent: req.headers.get("user-agent") ?? undefined });
    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("[enquiry] could not store lead:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your enquiry right now. Please send it to us on WhatsApp instead." },
      { status: 503 },
    );
  }
}

/** Owner-only: list stored leads (file storage). Requires `Authorization: Bearer <ADMIN_TOKEN>`. */
export async function GET(req: NextRequest) {
  const token = process.env.ADMIN_TOKEN;
  const auth = req.headers.get("authorization");
  if (!token || token.length < 12 || auth !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const leads = await readLeads();
    return NextResponse.json({ ok: true, leads }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[enquiry] could not read leads:", err);
    return NextResponse.json({ ok: false, error: "Could not read leads" }, { status: 500 });
  }
}
