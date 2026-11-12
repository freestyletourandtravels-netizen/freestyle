"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappEnquiryMessage, whatsappLink } from "@/lib/whatsapp";
import { getPackage } from "@/data/packages";

export function WhatsAppFloat() {
  const pathname = usePathname();
  // On a package page, prefill the WhatsApp message with that package.
  const slug = pathname.startsWith("/kashmir-tour-packages/") ? pathname.split("/")[2] : undefined;
  const pkg = slug ? getPackage(slug) : undefined;
  const href = whatsappLink(
    whatsappEnquiryMessage(pkg ? { packageName: `${pkg.durationLabel} ${pkg.name}` } : {}),
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Freestyle Tour & Travels on WhatsApp"
      className={`group fixed bottom-5 right-5 z-40 items-center md:bottom-8 md:right-8 ${pkg ? "hidden lg:flex" : "flex"}`}
    >
      <span className="pointer-events-none mr-3 hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Chat with us
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25 [animation-duration:2.6s]" aria-hidden="true" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  );
}
