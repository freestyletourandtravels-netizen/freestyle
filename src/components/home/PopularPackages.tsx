"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { packages, type PackageCategory } from "@/data/packages";
import { CompactPackageCard } from "@/components/packages/CompactPackageCard";
import { Reveal } from "@/components/motion/Reveal";

const filters: { id: PackageCategory | "all"; label: string }[] = [
  { id: "all", label: "Popular" },
  { id: "Family", label: "Family" },
  { id: "Honeymoon", label: "Honeymoon" },
  { id: "Luxury", label: "Premium" },
  { id: "Winter", label: "Winter" },
  { id: "Adventure", label: "Adventure" },
];

export function PopularPackages() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const reduce = useReducedMotion();
  const list = (filter === "all" ? packages.filter((p) => p.featured) : packages.filter((p) => p.categories.includes(filter))).slice(0, 4);

  return (
    <section className="bg-ivory pb-16 pt-6 md:pb-20" aria-labelledby="packages-title">
      <div className="container-luxe">
        <Reveal className="text-center">
          <h2 id="packages-title" className="font-serif text-[clamp(1.75rem,2.9vw,2.45rem)] font-bold leading-tight text-navy">
            Popular Kashmir Packages
          </h2>
        </Reveal>

        <div className="-mx-5 mt-6 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0">
          <div className="mx-auto flex w-max gap-2" role="group" aria-label="Filter packages">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={clsx(
                  "min-h-10 rounded-full px-4 text-[0.82rem] font-semibold transition-colors",
                  filter === f.id ? "bg-navy text-white" : "bg-white text-ink ring-1 ring-stone hover:ring-navy/40",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={filter}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {list.map((p, i) => (
              <li key={p.slug}>
                <CompactPackageCard pkg={p} priority={i < 2} />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <Link href="/kashmir-tour-packages" className="btn btn-ghost-dark">
            View All Packages <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
