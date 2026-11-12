"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, LoaderCircle, Mail, Phone, Send, TriangleAlert, User } from "lucide-react";
import clsx from "clsx";
import { destinationOptions, packageCategoryOptions, phoneCountryCodes } from "@/data/site";
import { enquirySchema, fieldErrors, phoneError } from "@/lib/enquiry-schema";
import { whatsappEnquiryMessage, whatsappFromForm, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import type { EnquiryPrefill } from "./EnquiryProvider";

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success"; name: string } | { kind: "error"; message: string };

const pick = <T extends readonly string[]>(list: T, v?: string) => (v && (list as readonly string[]).includes(v) ? v : undefined);

/** Short popup form: name, mobile and email only. Anything already chosen (package, destination…) is sent along. */
export function QuickEnquiryForm({ prefill }: { prefill?: EnquiryPrefill }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [v, setV] = useState({ fullName: "", countryCode: "91", phone: "", email: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (name: keyof typeof v) => (e: { target: { value: string } }) => {
    setV((s) => ({ ...s, [name]: e.target.value }));
    if (errors[name]) setErrors(({ [name]: _r, ...rest }) => rest);
  };

  const payload = () => ({
    source: "quick",
    fullName: v.fullName,
    countryCode: v.countryCode,
    phone: v.phone,
    email: v.email,
    destination: pick(destinationOptions, prefill?.destination),
    travelDate: prefill?.travelDate,
    adults: prefill?.adults,
    packageCategory: pick(packageCategoryOptions, prefill?.packageCategory),
    packageName: prefill?.packageName,
    company: v.company,
    pageUrl: typeof window !== "undefined" ? window.location.pathname : undefined,
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    const parsed = enquirySchema.safeParse(payload());
    const errs = parsed.success ? {} : fieldErrors(parsed.error);
    const pe = phoneError(v.phone, v.countryCode);
    if (pe && !errs.phone) errs.phone = pe;
    if (!v.email.trim() && !errs.email) errs.email = "Please enter your email address";
    if (Object.keys(errs).length) {
      setErrors(errs);
      const first = ["fullName", "phone", "email"].find((k) => errs[k]);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }
    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload()) });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; fields?: Record<string, string> } | null;
      if (res.ok && json?.ok) {
        setStatus({ kind: "success", name: v.fullName.trim().split(/\s+/)[0] });
        return;
      }
      if (json?.fields) setErrors(json.fields);
      setStatus({ kind: "error", message: json?.error || "We couldn't submit your enquiry right now. Please send it on WhatsApp instead." });
    } catch {
      setStatus({ kind: "error", message: "You seem to be offline. Please send your enquiry on WhatsApp instead." });
    }
  }

  if (status.kind === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-4 text-center" role="status" aria-live="polite">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <CircleCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-navy">Thank you, {status.name}!</h3>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
          Our team in Tangmarg will call you back on{" "}
          <span className="font-semibold text-ink">
            +{v.countryCode} {v.phone.replace(/\D/g, "")}
          </span>{" "}
          with a plan and quote.
        </p>
        <a href={whatsappFromForm(payload())} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-5">
          <WhatsAppIcon className="h-4 w-4" /> Continue on WhatsApp
        </a>
      </motion.div>
    );
  }

  const input =
    "h-12 w-full rounded-xl border border-[#e3e8ef] bg-[#f6f8fb] pl-11 pr-3 text-[0.95rem] text-ink outline-none transition placeholder:text-[#9aa3b2] focus:border-navy focus:bg-white focus:ring-4 focus:ring-navy/10 aria-[invalid=true]:border-coral aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-coral/10";
  const a = (name: string) => ({
    id: id(name),
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? id(`${name}-e`) : undefined,
  });
  const submitting = status.kind === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Quick enquiry form" className="space-y-3.5">
      {prefill?.packageName && (
        <p className="rounded-xl border border-coral/25 bg-coral/5 px-3.5 py-2 text-[0.82rem] text-ink">
          <span className="mr-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-coral">Package</span>
          {prefill.packageName}
        </p>
      )}

      <Field label="Full Name" htmlFor={id("fullName")} icon={User} error={errors.fullName} errorId={id("fullName-e")}>
        <input {...a("fullName")} className={input} autoComplete="name" placeholder="e.g. Rahul Sharma" value={v.fullName} onChange={set("fullName")} />
      </Field>

      <Field label="Mobile / WhatsApp No." htmlFor={id("phone")} icon={Phone} error={errors.phone} errorId={id("phone-e")}>
        <div className="flex">
          <label htmlFor={id("cc")} className="sr-only">
            Country code
          </label>
          <select
            id={id("cc")}
            value={v.countryCode}
            onChange={set("countryCode")}
            className="h-12 w-[4.6rem] shrink-0 cursor-pointer appearance-none rounded-l-xl border border-r-0 border-[#e3e8ef] bg-[#eef2f7] pl-10 pr-1 text-[0.85rem] font-semibold text-navy outline-none"
            autoComplete="tel-country-code"
          >
            {phoneCountryCodes.map((c) => (
              <option key={c.code} value={c.code} label={`+${c.code}`}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            {...a("phone")}
            className={clsx(input, "rounded-l-none !pl-3")}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={v.countryCode === "91" ? "10-digit mobile number" : "Phone number"}
            maxLength={20}
            value={v.phone}
            onChange={set("phone")}
          />
        </div>
      </Field>

      <Field label="Email Address" htmlFor={id("email")} icon={Mail} error={errors.email} errorId={id("email-e")}>
        <input {...a("email")} className={input} type="email" autoComplete="email" placeholder="e.g. rahul@gmail.com" value={v.email} onChange={set("email")} />
      </Field>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" name="company" value={v.company} onChange={set("company")} />
      </div>

      <AnimatePresence>
        {status.kind === "error" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} role="alert" className="overflow-hidden">
            <div className="flex gap-3 rounded-xl border border-coral/40 bg-coral/5 p-3 text-sm text-ink">
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden="true" />
              <div>
                <p>{status.message}</p>
                <a href={whatsappFromForm(payload())} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1.5 font-semibold text-navy underline">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Send on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={submitting}
        className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-navy-deep via-navy to-[#2f5fb3] px-6 py-3 text-[0.92rem] font-bold text-white shadow-[0_14px_30px_-12px_rgba(36,59,96,0.7)] transition hover:brightness-110 disabled:opacity-80"
      >
        {submitting ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Get Free Call Back <Send className="h-[18px] w-[18px]" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="text-center text-[0.8rem] text-muted">
        Prefer chatting?{" "}
        <a
          href={whatsappLink(whatsappEnquiryMessage(prefill))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#128c4a] hover:underline"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" /> Plan on WhatsApp
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  icon: Icon,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  icon: typeof User;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[0.82rem] font-semibold text-ink">
        {label} <span className="text-coral">*</span>
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-[18px] w-[18px] -translate-y-1/2 text-[#64748b]" strokeWidth={1.8} aria-hidden="true" />
        {children}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-[0.76rem] font-medium text-coral-deep">
          {error}
        </p>
      )}
    </div>
  );
}
