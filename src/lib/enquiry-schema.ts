import { z } from "zod";
import { destinationOptions, hotelPreferenceOptions, packageCategoryOptions, phoneCountryCodes } from "@/data/site";

/** Today's date as YYYY-MM-DD in India Standard Time. */
export function todayIST(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters`)
    .optional()
    .transform((v) => (v ? v : undefined));

/** "" or undefined → undefined, so optional selects can be left blank. */
const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .union([z.literal(""), z.enum(values)])
    .optional()
    .transform((v) => (v ? v : undefined));

const blankToUndefined = (v: unknown) => (v === "" || v === null || v === undefined ? undefined : v);

const countryCodes = phoneCountryCodes.map((c) => c.code) as [string, ...string[]];

/** Normalises a typed number to national digits for the chosen country. */
export function normalisePhone(raw: string, countryCode: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith(countryCode) && d.length > countryCode.length + 6) d = d.slice(countryCode.length);
  if (d.startsWith("0")) d = d.replace(/^0+/, "");
  return d;
}

/** Returns an error message, or null when the number is valid for that country. */
export function phoneError(raw: string, countryCode: string): string | null {
  if (!raw.trim()) return "Please enter your WhatsApp number";
  const digits = normalisePhone(raw, countryCode);
  const ok = countryCode === "91" ? /^[6-9]\d{9}$/.test(digits) : /^\d{6,14}$/.test(digits);
  if (ok) return null;
  return countryCode === "91" ? "Enter a valid 10-digit Indian mobile number" : "Enter a valid phone number";
}

/**
 * One schema shared by every form (popup, package enquiry, contact page),
 * used on BOTH the client (instant validation) and the server (never trust
 * the browser).
 */
export const enquirySchema = z
  .object({
    /** "quick" = short popup form (name, phone, email only). */
    source: z.enum(["quick", "popup", "package", "contact"]),
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name")
      .max(80, "Name is too long")
      .regex(/^[\p{L} .'-]+$/u, "Please use letters only"),
    countryCode: z.enum(countryCodes).default("91"),
    phone: z.string().trim().min(1, "Please enter your WhatsApp number").max(20, "Number is too long"),
    email: z
      .string()
      .trim()
      .max(120)
      .optional()
      .transform((v) => (v ? v : undefined))
      .pipe(z.string().email("Enter a valid email address").optional()),
    travelDate: z
      .string()
      .optional()
      .transform((v) => (v ? v : undefined))
      .pipe(
        z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid date")
          .refine((v) => v >= todayIST(), "Travel date cannot be in the past")
          .optional(),
      ),
    adults: z.preprocess(
      blankToUndefined,
      z.coerce
        .number({ message: "Enter number of adults" })
        .int("Enter a whole number")
        .min(1, "At least 1 adult")
        .max(60, "For groups over 60, please call us")
        .optional(),
    ),
    children: z.preprocess(
      blankToUndefined,
      z.coerce.number({ message: "Enter number of children" }).int("Enter a whole number").min(0).max(30, "Please call us for larger groups").optional(),
    ),
    destination: z.preprocess(blankToUndefined, z.enum(destinationOptions, { message: "Please choose a destination" }).optional()),
    packageCategory: optionalEnum(packageCategoryOptions),
    hotelPreference: optionalEnum(hotelPreferenceOptions),
    packageName: optionalText(120),
    message: optionalText(1500),
    /** Honeypot — real users never see or fill this. */
    company: z.string().max(0).optional(),
    pageUrl: optionalText(300),
  })
  .superRefine((v, ctx) => {
    const pe = phoneError(v.phone, v.countryCode);
    if (pe) ctx.addIssue({ code: "custom", path: ["phone"], message: pe });
    if (v.source === "quick") {
      if (!v.email) ctx.addIssue({ code: "custom", path: ["email"], message: "Please enter your email address" });
      return;
    }
    if (!v.destination) ctx.addIssue({ code: "custom", path: ["destination"], message: "Please choose a destination" });
    if (v.adults === undefined) ctx.addIssue({ code: "custom", path: ["adults"], message: "Enter number of adults" });
    if (v.source !== "contact" && !v.travelDate) {
      ctx.addIssue({ code: "custom", path: ["travelDate"], message: "Please choose your travel date" });
    }
  })
  .transform((v) => ({ ...v, phone: normalisePhone(v.phone, v.countryCode) }));

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** "+91 9876543210" */
export function formatPhone(e: { countryCode?: string; phone: string }) {
  return `+${e.countryCode || "91"} ${e.phone}`;
}

/** Flatten zod issues into { field: firstMessage }. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
