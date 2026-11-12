"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Sun } from "lucide-react";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { img } from "@/data/images";
import { Reveal } from "@/components/motion/Reveal";

export function TopDestinations() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 20), behavior: "smooth" });
  };

  return (
    <section id="destinations" className="scroll-mt-20 bg-white py-16 md:py-20" aria-labelledby="top-dest-title">
      <div className="container-luxe">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="top-dest-title" className="font-serif text-[clamp(1.75rem,2.9vw,2.45rem)] font-bold leading-tight text-navy">
              Top Destinations
            </h2>
            <p className="mt-1.5 text-muted">Handpicked Kashmir valleys for your next journey.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/kashmir-tour-packages" className="mr-2 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-coral">
              View All <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white text-navy transition hover:bg-navy hover:text-white md:hidden"
              aria-label="Previous destinations"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white transition hover:bg-coral md:hidden"
              aria-label="More destinations"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <ul
          ref={track}
          className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
        >
          {destinations.map((d, i) => {
            const p = img(d.image);
            const count = packages.filter((x) => x.destinations.includes(d.packageFilter)).length;
            const href = `/kashmir-tour-packages?destination=${encodeURIComponent(d.packageFilter)}`;
            return (
              <li key={d.slug} className="w-[72%] shrink-0 snap-start sm:w-[46%] md:w-auto">
                <Link
                  href={href}
                  className="group relative block aspect-[4/4.1] overflow-hidden rounded-[1.4rem] bg-navy-deep text-white shadow-[0_26px_50px_-28px_rgba(23,27,34,0.6)] ring-1 ring-black/5"
                  aria-label={`Discover ${d.name}: ${count} ${count === 1 ? "journey" : "journeys"}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 80vw"
                    quality={85}
                    style={d.imagePosition ? { objectPosition: d.imagePosition } : undefined}
                    priority={i < 2}
                    className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                  />
                  {/* Soft grading so text stays readable on any photo */}
                  <div className="absolute inset-0 bg-linear-to-b from-charcoal/25 via-transparent to-charcoal/60" />

                  {/* Top row: best-time chip + arrow */}
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[0.7rem] font-semibold text-navy shadow-sm backdrop-blur">
                      <Sun className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" /> {d.bestTime}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-md transition-all duration-500 group-hover:bg-coral group-hover:ring-coral">
                      <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Glass info panel */}
                  <div className="absolute inset-x-2.5 bottom-2.5 rounded-2xl border border-white/25 bg-white/15 px-3.5 py-3 backdrop-blur-md transition-colors duration-500 group-hover:bg-white/20">
                    <h3 className="font-serif text-[1.5rem] font-semibold leading-none">{d.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 truncate text-[0.74rem] text-white/85">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {d.label}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between border-t border-white/25 pt-2.5 text-[0.76rem]">
                      <span className="font-semibold">{count > 0 ? `${count} ${count === 1 ? "journey" : "journeys"}` : "Custom plan"}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-white/90 transition-colors group-hover:text-white">
                        Explore <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
