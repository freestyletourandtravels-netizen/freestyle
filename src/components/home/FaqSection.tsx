"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Phone, Plus } from "lucide-react";
import clsx from "clsx";
import { faqs } from "@/data/content";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/lib/whatsapp";

const photo = img("srinagar-hazratbal");

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="faq-title">
      <div className="container-luxe grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left: heading + help card */}
        <Reveal className="lg:col-span-5">
          <span className="inline-flex rounded-full bg-[#e7f0f8] px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy">FAQ</span>
          <h2 id="faq-title" className="mt-4 font-serif text-[clamp(1.75rem,2.9vw,2.45rem)] font-bold leading-tight text-navy">
            Questions? <span className="text-coral">We&apos;ve got answers.</span>
          </h2>
          <p className="mt-3 max-w-md text-muted">Everything travellers usually ask before planning a Kashmir holiday with us.</p>

          <div className="relative mt-8 hidden overflow-hidden rounded-[1.6rem] lg:block">
            <div className="relative aspect-[4/3.2]">
              <Image src={photo.src} alt={photo.alt} fill sizes="38vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/40 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="font-serif text-2xl font-semibold">Still have a question?</p>
              <p className="mt-1 text-sm text-white/80">Talk directly to our team in Tangmarg.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={whatsappLink("Hello Freestyle Tour & Travels! I have a question about a Kashmir trip.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp !min-h-11 !px-5 !text-[0.72rem]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
                <a href={site.phoneHref} className="btn btn-ghost-light !min-h-11 !px-5 !text-[0.72rem]">
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: accordion */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <ul className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const id = `faq-${i}`;
              return (
                <li
                  key={f.q}
                  className={clsx(
                    "rounded-2xl border transition-colors duration-300",
                    isOpen ? "border-navy/15 bg-[#f3f7fb]" : "border-stone/70 bg-white hover:border-navy/25",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${id}-panel`}
                      id={`${id}-btn`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left md:px-6 md:py-5"
                    >
                      <span className="font-sans font-bold leading-snug text-navy md:text-[1.02rem]">{f.q}</span>
                      <span
                        className={clsx(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300",
                          isOpen ? "bg-coral text-white" : "bg-ivory text-navy",
                        )}
                      >
                        {isOpen ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${id}-panel`}
                    role="region"
                    aria-labelledby={`${id}-btn`}
                    className={clsx("grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 leading-relaxed text-muted md:px-6">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
