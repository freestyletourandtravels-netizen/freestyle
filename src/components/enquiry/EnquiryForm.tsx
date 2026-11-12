"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CircleCheck, LoaderCircle, Minus, Plus, TriangleAlert } from "lucide-react";
import clsx from "clsx";
import { destinationOptions, hotelPreferenceOptions, packageCategoryOptions, phoneCountryCodes, site } from "@/data/site";
import { enquirySchema, fieldErrors, phoneError, todayIST } from "@/lib/enquiry-schema";
import { whatsappEnquiryMessage, whatsappFromForm, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import type { EnquiryPrefill } from "./EnquiryProvider";

/**
 * "steps"   → the multi-step trip planner used in the popup.
 * "contact" → a single-page form for the Contact page (adds email, travel date optional).
 */
type Variant = "steps" | "contact";

type Values = {
  fullName: string;
  countryCode: string;
  phone: string;
  email: string;
  travelDate: string;
  adults: number;
  children: number;
  destination: string;
  packageCategory: string;
  hotelPreference: string;
  message: string;
  company: string;
};

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success"; name: string } | { kind: "error"; message: string };

const STEPS = [
  { title: "Your trip", fields: ["destination", "packageCategory", "travelDate"] },
  { title: "Travellers & stay", fields: ["adults", "children", "hotelPreference"] },
  { title: "Your details", fields: ["fullName", "phone", "message"] },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const pick = <T extends readonly string[]>(list: T, v?: string) => (v && (list as readonly string[]).includes(v) ? v : "");

export function EnquiryForm({ variant, prefill, submitLabel }: { variant: Variant; prefill?: EnquiryPrefill; submitLabel?: string }) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const reduce = useReducedMotion();
  const topRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [values, setValues] = useState<Values>({
    fullName: "",
    countryCode: "91",
    phone: "",
    email: "",
    travelDate: prefill?.travelDate ?? "",
    adults: Math.min(60, Math.max(1, Number(prefill?.adults) || 2)),
    children: 0,
    destination: pick(destinationOptions, prefill?.destination),
    packageCategory: pick(packageCategoryOptions, prefill?.packageCategory),
    hotelPreference: "",
    message: "",
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update = <K extends keyof Values>(name: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  };
  const onText = (name: keyof Values) => (e: { target: { value: string } }) => update(name, e.target.value as never);

  const isSteps = variant === "steps";
  const source = variant === "contact" ? "contact" : prefill?.packageName ? "package" : "popup";

  const payload = () => ({
    source,
    fullName: values.fullName,
    countryCode: values.countryCode,
    phone: values.phone,
    email: variant === "contact" ? values.email : undefined,
    travelDate: values.travelDate,
    adults: values.adults,
    children: values.children,
    destination: values.destination,
    packageCategory: values.packageCategory,
    hotelPreference: values.hotelPreference,
    packageName: prefill?.packageName,
    message: values.message,
    company: values.company,
    pageUrl: typeof window !== "undefined" ? window.location.pathname : undefined,
  });

  /** Full validation, plus explicit checks for rules zod only runs once every field is valid. */
  function validate(): Record<string, string> {
    const data = payload();
    const parsed = enquirySchema.safeParse(data);
    const errs = parsed.success ? {} : fieldErrors(parsed.error);
    const pe = phoneError(values.phone, values.countryCode);
    if (pe && !errs.phone) errs.phone = pe;
    if (source !== "contact" && !values.travelDate && !errs.travelDate) errs.travelDate = "Please choose your travel date";
    return errs;
  }

  function focusFirst(errs: Record<string, string>, among: readonly string[]) {
    const first = among.find((f) => errs[f]);
    if (first) window.setTimeout(() => document.getElementById(id(first))?.focus(), 30);
  }

  function goTo(next: number) {
    setDir(next > step ? 1 : -1);
    setStep(next);
    topRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }

  function onNext() {
    const fields = STEPS[step].fields as readonly string[];
    const all = validate();
    const stepErrs = Object.fromEntries(Object.entries(all).filter(([k]) => fields.includes(k)));
    setErrors(stepErrs);
    if (Object.keys(stepErrs).length) return focusFirst(stepErrs, fields);
    goTo(step + 1);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    if (isSteps && step < STEPS.length - 1) return onNext();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Jump back to the first step that has a problem.
      if (isSteps) {
        const bad = STEPS.findIndex((s) => s.fields.some((f) => errs[f]));
        if (bad >= 0 && bad !== step) goTo(bad);
        focusFirst(errs, bad >= 0 ? STEPS[bad].fields : Object.keys(errs));
      } else focusFirst(errs, Object.keys(errs));
      return;
    }
    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; fields?: Record<string, string> } | null;
      if (res.ok && json?.ok) {
        setStatus({ kind: "success", name: values.fullName.trim().split(/\s+/)[0] });
        return;
      }
      if (json?.fields) setErrors(json.fields);
      setStatus({ kind: "error", message: json?.error || "We couldn't submit your enquiry right now. Please send it to us on WhatsApp instead." });
    } catch {
      setStatus({ kind: "error", message: "You seem to be offline or our server is unreachable. Please send your enquiry on WhatsApp instead." });
    }
  }

  /* ---------------- Success ---------------- */
  if (status.kind === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col items-start py-4"
        role="status"
        aria-live="polite"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-coral/10 text-coral">
          <CircleCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-serif text-3xl text-navy md:text-4xl">Thank you, {status.name}.</h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          Your travel plan request has reached our team in Tangmarg. We will contact you on{" "}
          <span className="font-semibold text-ink">
            +{values.countryCode} {values.phone.replace(/\D/g, "")}
          </span>{" "}
          to shape your itinerary.
        </p>
        <p className="mt-6 text-sm text-muted">Prefer to chat right away?</p>
        <a href={whatsappFromForm(payload())} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-3">
          <WhatsAppIcon className="h-5 w-5" /> Continue on WhatsApp
        </a>
      </motion.div>
    );
  }

  /* ---------------- Field helpers ---------------- */
  const err = (name: string) =>
    errors[name] ? (
      <p id={id(`${name}-err`)} className="field-error">
        {errors[name]}
      </p>
    ) : null;
  const aria = (name: string) => ({
    id: id(name),
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? id(`${name}-err`) : undefined,
  });
  const optional = <span className="normal-case tracking-normal opacity-70">(optional)</span>;

  const destinationField = (
    <div>
      <label htmlFor={id("destination")} className="field-label">
        Preferred destination
      </label>
      <select {...aria("destination")} className="field" value={values.destination} onChange={onText("destination")} required>
        <option value="" disabled>
          Choose a destination
        </option>
        {destinationOptions.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      {err("destination")}
    </div>
  );

  const dateField = (
    <div>
      <label htmlFor={id("travelDate")} className="field-label">
        Travel date {variant === "contact" && optional}
      </label>
      <input
        {...aria("travelDate")}
        className="field"
        type="date"
        min={todayIST()}
        value={values.travelDate}
        onChange={onText("travelDate")}
        required={variant !== "contact"}
      />
      {err("travelDate")}
    </div>
  );

  const categoryField = (
    <fieldset>
      <legend className="field-label">Package category {optional}</legend>
      <div className="mt-1 flex flex-wrap gap-2" role="radiogroup" aria-label="Package category">
        {packageCategoryOptions.map((c) => (
          <Chip key={c} active={values.packageCategory === c} onClick={() => update("packageCategory", values.packageCategory === c ? "" : c)}>
            {c}
          </Chip>
        ))}
      </div>
    </fieldset>
  );

  const hotelField = (
    <fieldset>
      <legend className="field-label">Hotel preference {optional}</legend>
      <div className="mt-1 flex flex-wrap gap-2" role="radiogroup" aria-label="Hotel preference">
        {hotelPreferenceOptions.map((c) => (
          <Chip key={c} active={values.hotelPreference === c} onClick={() => update("hotelPreference", values.hotelPreference === c ? "" : c)}>
            {c}
          </Chip>
        ))}
      </div>
    </fieldset>
  );

  const guestFields = (
    <div className="grid grid-cols-2 gap-4">
      <Stepper label="Adults" hint="12+ years" id={id("adults")} value={values.adults} min={1} max={60} onChange={(n) => update("adults", n)} error={errors.adults} />
      <Stepper label="Children" hint="Under 12" id={id("children")} value={values.children} min={0} max={30} onChange={(n) => update("children", n)} error={errors.children} />
    </div>
  );

  const nameField = (
    <div>
      <label htmlFor={id("fullName")} className="field-label">
        Full name
      </label>
      <input {...aria("fullName")} className="field" autoComplete="name" placeholder="Your name" value={values.fullName} onChange={onText("fullName")} required />
      {err("fullName")}
    </div>
  );

  const phoneField = (
    <div>
      <label htmlFor={id("phone")} className="field-label">
        WhatsApp number
      </label>
      <div className="flex">
        <label htmlFor={id("countryCode")} className="sr-only">
          Country code
        </label>
        <select
          id={id("countryCode")}
          name="countryCode"
          value={values.countryCode}
          onChange={onText("countryCode")}
          className="field w-[6.5rem] shrink-0 rounded-r-none border-r-0 pr-2 font-semibold text-navy"
          autoComplete="tel-country-code"
        >
          {phoneCountryCodes.map((c) => (
            <option key={c.code} value={c.code} label={`+${c.code}`}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          {...aria("phone")}
          className="field min-w-0 flex-1 rounded-l-none"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={values.countryCode === "91" ? "98XXXXXXXX" : "Phone number"}
          maxLength={20}
          value={values.phone}
          onChange={onText("phone")}
          required
        />
      </div>
      {err("phone")}
    </div>
  );

  const messageField = (
    <div>
      <label htmlFor={id("message")} className="field-label">
        {variant === "contact" ? "Message" : "Additional requirements"} {optional}
      </label>
      <textarea
        {...aria("message")}
        className="field min-h-[88px] resize-y"
        rows={variant === "contact" ? 5 : 3}
        placeholder={
          variant === "contact"
            ? "Tell us about your trip: places you'd like to see, the occasion, anything we should know…"
            : "Honeymoon, travelling with elders, houseboat night, snow activities…"
        }
        value={values.message}
        onChange={onText("message")}
      />
      {err("message")}
    </div>
  );

  const honeypot = (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label>
        Company
        <input tabIndex={-1} autoComplete="off" value={values.company} onChange={onText("company")} name="company" />
      </label>
    </div>
  );

  const errorBox = (
    <AnimatePresence>
      {status.kind === "error" && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} role="alert" className="overflow-hidden">
          <div className="flex gap-3 rounded-lg border border-coral/40 bg-coral/5 p-4 text-sm text-ink">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden="true" />
            <div>
              <p>{status.message}</p>
              <a
                href={whatsappFromForm(payload())}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-semibold text-navy underline underline-offset-4"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Send these details on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const submitting = status.kind === "submitting";
  const submitButton = (
    <button type="submit" className={clsx("btn btn-coral w-full sm:w-auto", submitting && "opacity-80")} disabled={submitting}>
      {submitting ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
        </>
      ) : (
        <>
          {submitLabel ?? "Create My Travel Plan"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </>
      )}
    </button>
  );

  const whatsappAlt = (
    <a
      href={whatsappLink(whatsappEnquiryMessage({ ...prefill, destination: values.destination || prefill?.destination }))}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 py-2 text-sm font-semibold text-navy hover:text-coral"
    >
      <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> or plan on WhatsApp
    </a>
  );

  const packageBadge = prefill?.packageName ? (
    <p className="rounded-lg border border-coral/30 bg-coral/5 px-4 py-3 text-sm text-ink">
      <span className="eyebrow mr-2 text-[0.62rem] text-coral">Package</span>
      {prefill.packageName}
    </p>
  ) : null;

  /* ---------------- Contact (single page) ---------------- */
  if (!isSteps) {
    return (
      <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
        <div className="grid gap-5 sm:grid-cols-2">
          {nameField}
          {phoneField}
          <div className="sm:col-span-2">
            <label htmlFor={id("email")} className="field-label">
              Email {optional}
            </label>
            <input {...aria("email")} className="field" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={onText("email")} />
            {err("email")}
          </div>
          {destinationField}
          {dateField}
          <div className="sm:col-span-2">{guestFields}</div>
          <div className="sm:col-span-2">{messageField}</div>
        </div>
        {honeypot}
        {errorBox}
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-5">
          {submitButton}
          {whatsappAlt}
        </div>
        <Privacy />
      </form>
    );
  }

  /* ---------------- Multi-step planner ---------------- */
  const last = step === STEPS.length - 1;
  return (
    <form onSubmit={onSubmit} noValidate aria-label="Kashmir trip planner" className="flex flex-col">
      <div ref={topRef} className="scroll-mt-4" />
      {/* Progress */}
      <ol className="grid grid-cols-3 gap-2" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
        {STEPS.map((s, i) => (
          <li key={s.title} aria-current={i === step ? "step" : undefined}>
            <span className="block h-[3px] overflow-hidden rounded-full bg-stone">
              <motion.span
                className="block h-full bg-coral"
                initial={false}
                animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                transition={{ duration: 0.6, ease }}
              />
            </span>
            <span className={clsx("mt-2 block text-[0.68rem] font-bold uppercase tracking-[0.14em]", i <= step ? "text-navy" : "text-navy/35")}>
              <span className="text-coral">0{i + 1}</span> <span className="hidden sm:inline">{s.title}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-serif text-xl text-navy sm:hidden">{STEPS[step].title}</p>

      <div className="relative mt-6">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -28 }}
            transition={{ duration: 0.35, ease }}
            className="space-y-4"
          >
            {step === 0 && (
              <>
                {packageBadge}
                <div className="grid gap-4 sm:grid-cols-2">
                  {destinationField}
                  {dateField}
                </div>
                {categoryField}
              </>
            )}
            {step === 1 && (
              <>
                {guestFields}
                {hotelField}
              </>
            )}
            {step === 2 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  {nameField}
                  {phoneField}
                </div>
                {messageField}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {honeypot}
      <div className="mt-5">{errorBox}</div>

      <div className="mt-5 flex flex-col-reverse gap-3 border-t border-stone pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-4 sm:justify-start">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy hover:text-coral">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>
          ) : (
            <span />
          )}
          {whatsappAlt}
        </div>
        {last ? (
          submitButton
        ) : (
          <button type="button" onClick={onNext} className="btn btn-navy w-full sm:w-auto">
            Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      {last && (
        <div className="mt-4">
          <Privacy />
        </div>
      )}
    </form>
  );
}

function Privacy() {
  return (
    <p className="text-xs text-muted">
      We only use your details to plan your trip. You can also call us on{" "}
      <a href={site.phoneHref} className="font-semibold text-navy">
        {site.phone}
      </a>
      .
    </p>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={clsx(
        "min-h-10 rounded-full border px-4 py-2 text-[0.85rem] font-semibold transition-all duration-300",
        active ? "border-navy bg-navy text-white shadow-[0_8px_20px_-10px_rgba(36,59,96,0.8)]" : "border-stone bg-white text-ink hover:border-navy/50",
      )}
    >
      {children}
    </button>
  );
}

function Stepper({
  label,
  hint,
  id,
  value,
  min,
  max,
  onChange,
  error,
}: {
  label: string;
  hint: string;
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  error?: string;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} <span className="normal-case tracking-normal opacity-70">({hint})</span>
      </label>
      <div className={clsx("flex items-center rounded-lg border bg-white", error ? "border-coral" : "border-stone")}>
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
          className="grid h-12 w-12 shrink-0 place-items-center text-navy transition hover:text-coral disabled:opacity-30"
          aria-label={`Fewer ${label.toLowerCase()}`}
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
          className="h-12 w-full min-w-0 bg-transparent text-center font-serif text-2xl text-navy outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          aria-invalid={error ? true : undefined}
        />
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
          className="grid h-12 w-12 shrink-0 place-items-center text-navy transition hover:text-coral disabled:opacity-30"
          aria-label={`More ${label.toLowerCase()}`}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
