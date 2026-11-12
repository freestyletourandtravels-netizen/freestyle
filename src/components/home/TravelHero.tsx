"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Headset, Heart, Map, MapPin, MountainSnow, Route, Search, Snowflake, Users, UsersRound } from "lucide-react";
import clsx from "clsx";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { img } from "@/data/images";
import { destinationOptions } from "@/data/site";
import { todayIST } from "@/lib/enquiry-schema";

const photo = img("gulmarg-winter-hero");
const ease = [0.22, 1, 0.36, 1] as const;

const tabs = [
  { id: "packages", label: "Tour Packages", icon: Map, category: undefined, filter: "" },
  { id: "honeymoon", label: "Honeymoon", icon: Heart, category: "Honeymoon", filter: "Honeymoon" },
  { id: "family", label: "Family", icon: UsersRound, category: "Family Holiday", filter: "Family" },
  { id: "winter", label: "Winter Snow", icon: Snowflake, category: undefined, filter: "Winter" },
] as const;

const features = [
  { icon: MountainSnow, title: "Local Kashmir", sub: "Experts in Tangmarg" },
  { icon: Route, title: "Personalised", sub: "Day-by-day plans" },
  { icon: Headset, title: "Direct Support", sub: "On WhatsApp" },
];

export function TravelHero() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("packages");
  const { openEnquiry } = useEnquiry();
  const reduce = useReducedMotion();
  const current = tabs.find((t) => t.id === tab)!;

  function onPlan(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    openEnquiry({
      destination: String(f.get("destination") || "") || undefined,
      travelDate: String(f.get("travelDate") || "") || undefined,
      adults: String(f.get("adults") || "") || undefined,
      packageCategory: current.category,
    });
  }

  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay } };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#e7f0f8] via-[#f2f5f7] to-ivory pb-10 pt-24 md:pt-28 lg:pb-12" aria-label="Plan your Kashmir trip">
      {/* Photo: full-bleed on the right, fading into the sky on the left (desktop) */}
      <motion.div
        className="absolute right-0 top-0 hidden h-[33.5rem] w-[60%] lg:block"
        initial={reduce ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 32%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 32%)" }}
      >
        <Image src={photo.src} alt={photo.alt} fill priority sizes="60vw" quality={85} className="object-cover object-center" />
        
      </motion.div>

      <div className="container-luxe relative">
        <div className="relative z-10 isolate max-w-2xl">
          {/* Mobile/tablet: photo behind the heading, text and icons only */}
          <div className="absolute -inset-x-5 -bottom-6 -top-28 -z-10 overflow-hidden md:-inset-x-10 lg:hidden">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" quality={85} className="object-cover object-[center_70%]" />
            <div className="absolute inset-0 bg-linear-to-b from-[#eef4fa]/95 via-[#eef4fa]/80 to-[#eef4fa]/60" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-[#f2f5f7] to-transparent" />
          </div>
          
          <motion.h1 {...rise(0.2)} className="mt-4 font-serif text-[clamp(2.1rem,3.7vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.01em] text-navy">
            <span className="block">Your Next Kashmir</span> <span className="block text-coral">Adventure Awaits</span>
          </motion.h1>
          <motion.p {...rise(0.32)} className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-ink/75">
            Discover Dal Lake, Gulmarg&apos;s snow, Pahalgam&apos;s valleys and beyond. Create unforgettable memories with a trip
            planned around you by Freestyle Tour &amp; Travels.
          </motion.p>
          <motion.ul {...rise(0.44)} className="mt-6 grid max-w-lg grid-cols-3 gap-3">
            {features.map((f) => (
              <li key={f.title} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-navy shadow-[0_8px_20px_-10px_rgba(36,59,96,0.45)]">
                  <f.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="text-[0.8rem] leading-tight">
                  <span className="block font-bold text-navy">{f.title}</span>
                  <span className="text-muted">{f.sub}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Mobile/tablet: leave room so the background photo shows between the text and the search card */}

        {/* Floating place label (desktop) */}
        <motion.p
          {...rise(0.9)}
          className="absolute right-6 top-4 hidden items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-[0.72rem] font-semibold text-navy shadow-lg backdrop-blur lg:inline-flex"
        >
          <MapPin className="h-3.5 w-3.5 text-coral" aria-hidden="true" /> Gulmarg · Winter
        </motion.p>

        {/* Search / planner card */}
        {/* Folder-style widget: a narrow tab strip sitting on top of the full-width search bar */}
        <motion.div {...rise(0.55)} className="relative z-10 mt-12 drop-shadow-[0_18px_28px_rgba(23,27,34,0.16)] lg:mt-8">
          <div
            role="tablist"
            aria-label="Trip type"
            className="flex w-fit max-w-full gap-1.5 overflow-x-auto rounded-t-2xl bg-white px-3 pb-2 pt-3 [scrollbar-width:none] sm:px-4"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={clsx(
                  "inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg px-3.5 text-[0.78rem] font-semibold transition-colors",
                  tab === t.id ? "bg-[#e7f0f8] text-navy" : "text-muted hover:bg-ivory hover:text-navy",
                )}
              >
                <t.icon className={clsx("h-3.5 w-3.5", tab === t.id ? "text-coral" : "")} aria-hidden="true" />
                {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={onPlan} className="grid gap-2.5 rounded-2xl rounded-tl-none bg-white p-3 sm:p-4 md:grid-cols-[1.3fr_1fr_0.9fr_auto] md:items-center md:gap-0" aria-label="Quick trip planner">
            <Field icon={MapPin} label="Destination" htmlFor="hp-dest">
              <select id="hp-dest" name="destination" defaultValue="" className="w-full cursor-pointer appearance-none bg-transparent text-[0.92rem] font-semibold text-navy outline-none">
                <option value="">Where to?</option>
                {destinationOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>
            <Field icon={CalendarDays} label="Travel date" htmlFor="hp-date">
              <input id="hp-date" type="date" name="travelDate" min={todayIST()} className="w-full bg-transparent text-[0.92rem] font-semibold text-navy outline-none" />
            </Field>
            <Field icon={Users} label="Travellers" htmlFor="hp-adults" last>
              <select id="hp-adults" name="adults" defaultValue="2" className="w-full cursor-pointer appearance-none bg-transparent text-[0.92rem] font-semibold text-navy outline-none">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Adult" : "Adults"}
                  </option>
                ))}
              </select>
            </Field>
            <div className="md:pl-3">
              <button type="submit" className="btn btn-navy !min-h-12 w-full !rounded-xl !px-7 !tracking-[0.08em]">
                <Search className="h-4 w-4" aria-hidden="true" /> Search
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  htmlFor,
  last,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  htmlFor: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("flex items-center gap-3 rounded-xl border border-stone/80 px-3.5 py-2.5 md:rounded-none md:border-0 md:px-4 md:py-1", !last && "md:border-r md:border-stone/60")}>
      <Icon className="h-[18px] w-[18px] shrink-0 text-coral" strokeWidth={1.7} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <label htmlFor={htmlFor} className="block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}
