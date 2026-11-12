import { site } from "@/data/site";

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

type Context = { packageName?: string; destination?: string; travelDate?: string; adults?: string | number; packageCategory?: string };

/** A descriptive opening message, using whatever we already know about the trip. */
export function whatsappEnquiryMessage(opts: Context = {}) {
  const lines: (string | false | undefined)[] = [];
  if (opts.packageName) {
    lines.push(`Hello Freestyle Tour & Travels! I'm interested in the "${opts.packageName}" Kashmir package.`);
  } else if (opts.destination && opts.destination !== "Not sure yet") {
    lines.push(`Hello Freestyle Tour & Travels! I'd like to plan a trip to ${opts.destination}, Kashmir.`);
  } else {
    lines.push("Hello Freestyle Tour & Travels! I'd like to plan a Kashmir holiday.");
  }
  lines.push(
    opts.packageCategory && `Trip style: ${opts.packageCategory}`,
    opts.travelDate && `Travel date: ${opts.travelDate}`,
    opts.adults ? `Adults: ${opts.adults}` : undefined,
    "Could you please share the details and a quote?",
  );
  return lines.filter(Boolean).join("\n");
}

/** Turns a filled-in form into a WhatsApp message (also the fallback if the backend is down). */
export function whatsappFromForm(data: Record<string, string | number | undefined>) {
  const phone = data.phone ? `+${data.countryCode || "91"} ${data.phone}` : undefined;
  const lines = [
    "Hello Freestyle Tour & Travels! I'd like to plan a Kashmir trip.",
    data.packageName && `Package: ${data.packageName}`,
    data.fullName && `Name: ${data.fullName}`,
    phone && `WhatsApp: ${phone}`,
    data.email && `Email: ${data.email}`,
    data.travelDate && `Travel date: ${data.travelDate}`,
    data.adults && `Adults: ${data.adults}`,
    data.children && Number(data.children) > 0 && `Children: ${data.children}`,
    data.destination && `Destination: ${data.destination}`,
    data.packageCategory && `Trip style: ${data.packageCategory}`,
    data.hotelPreference && `Hotel preference: ${data.hotelPreference}`,
    data.message && `Notes: ${data.message}`,
  ].filter(Boolean);
  return whatsappLink(lines.join("\n"));
}
