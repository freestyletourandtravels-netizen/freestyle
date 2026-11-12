"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import clsx from "clsx";
import { categoryLabels, packageCategories, packageDestinations, packages, type PackageCategory } from "@/data/packages";
import { CompactPackageCard } from "./CompactPackageCard";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";

const durations = [
  { id: "short", label: "Up to 4 days", test: (d: number) => d <= 4 },
  { id: "mid", label: "5–6 days", test: (d: number) => d >= 5 && d <= 6 },
  { id: "long", label: "7+ days", test: (d: number) => d >= 7 },
] as const;
type DurationId = (typeof durations)[number]["id"] | "";

const ease = [0.22, 1, 0.36, 1] as const;

export function PackageExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const initialDest = params.get("destination") ?? "";
  const initialCat = params.get("category") ?? "";
  const [q, setQ] = useState(params.get("q") ?? "");
  const [destination, setDestination] = useState((packageDestinations as string[]).includes(initialDest) ? initialDest : "");
  const [category, setCategory] = useState<PackageCategory | "">(
    (packageCategories as readonly string[]).includes(initialCat) ? (initialCat as PackageCategory) : "",
  );
  const [duration, setDuration] = useState<DurationId>((params.get("duration") as DurationId) ?? "");

  // Keep the URL in sync so filtered views can be shared and bookmarked.
  useEffect(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (destination) sp.set("destination", destination);
    if (category) sp.set("category", category);
    if (duration) sp.set("duration", duration);
    const next = sp.toString();
    if (next !== params.toString()) router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, destination, category, duration]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const dur = durations.find((d) => d.id === duration);
    return packages.filter((p) => {
      if (destination && !p.destinations.includes(destination)) return false;
      if (category && !p.categories.includes(category)) return false;
      if (dur && !dur.test(p.days)) return false;
      if (term) {
        const hay = [p.name, p.summary, p.durationLabel, ...p.destinations, ...p.highlights, ...p.categories.map((c) => categoryLabels[c])]
          .join(" ")
          .toLowerCase();
        return term.split(/\s+/).every((w) => hay.includes(w));
      }
      return true;
    });
  }, [q, destination, category, duration]);

  const active = Boolean(q || destination || category || duration);
  const reset = () => {
    setQ("");
    setDestination("");
    setCategory("");
    setDuration("");
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="relative rounded-2xl bg-white p-3 shadow-[0_18px_40px_-24px_rgba(23,27,34,0.35)] ring-1 ring-black/5 sm:p-4">
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr] md:items-center">
          <label className="relative block">
            <span className="sr-only">Search packages</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/50" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search: Gulmarg, honeymoon, snow…"
              className="field rounded-xl border-stone/80 pl-11"
            />
          </label>
          <label className="block">
            <span className="sr-only">Destination</span>
            <select value={destination} onChange={(e) => setDestination(e.target.value)} className="field rounded-xl border-stone/80">
              <option value="">All destinations</option>
              {packageDestinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="sr-only">Duration</span>
            <select value={duration} onChange={(e) => setDuration(e.target.value as DurationId)} className="field rounded-xl border-stone/80">
              <option value="">Any duration</option>
              {durations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="-mx-5 mt-3 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0">
          <div className="flex w-max items-center gap-2" role="group" aria-label="Package category">
            <SlidersHorizontal className="mr-1 h-4 w-4 text-navy/50" aria-hidden="true" />
            {packageCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(category === c ? "" : c)}
                className={clsx(
                  "min-h-9 whitespace-nowrap rounded-full px-4 text-[0.78rem] font-semibold transition-colors",
                  category === c ? "bg-navy text-white" : "bg-ivory text-ink hover:bg-[#e7f0f8] hover:text-navy",
                )}
              >
                {categoryLabels[c]}
              </button>
            ))}
            {active && (
              <button type="button" onClick={reset} className="ml-2 inline-flex min-h-10 items-center gap-1.5 px-2 text-[0.78rem] font-semibold text-coral hover:text-coral-deep">
                <X className="h-3.5 w-3.5" aria-hidden="true" /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm font-medium text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "journey" : "journeys"} {active ? "match your filters" : "to choose from"}
      </p>

      <motion.div layout={!reduce} className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {results.map((p) => (
            <motion.div
              key={p.slug}
              layout={!reduce}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease }}
            >
              <CompactPackageCard pkg={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <div className="mt-6 flex flex-col items-start gap-5 rounded-2xl bg-white p-8 ring-1 ring-stone/60 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="font-serif text-3xl text-navy">No ready-made journey matches that yet.</p>
            <p className="mt-2 text-muted">That&apos;s fine: we can design one around exactly what you have in mind.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <EnquiryButton prefill={{ destination: destination || undefined, packageCategory: "Customized Kashmir Tour" }}>Design My Journey</EnquiryButton>
            <button type="button" onClick={reset} className="btn btn-ghost-dark">
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
