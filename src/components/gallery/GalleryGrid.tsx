"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import clsx from "clsx";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/data/gallery";
import { img } from "@/data/images";

type Filter = "all" | GalleryCategory;
const ease = [0.22, 1, 0.36, 1] as const;

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const lastTrigger = useRef<HTMLElement | null>(null);

  // Deep links like /gallery#gulmarg select that category.
  useEffect(() => {
    const apply = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (galleryCategories.some((c) => c.id === hash)) {
        setFilter(hash as GalleryCategory);
        document.getElementById("gallery-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const items = useMemo(
    () => galleryItems.filter((g) => filter === "all" || g.categories.includes(filter)).map((g) => img(g.image)),
    [filter],
  );

  const choose = (f: Filter) => {
    setFilter(f);
    history.replaceState(null, "", f === "all" ? window.location.pathname : `#${f}`);
  };

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length));
    },
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [index, close, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 400) go(-1);
  };

  const current = index !== null ? items[index] : null;

  return (
    <>
      <div id="gallery-grid" className="scroll-mt-28">
        <div role="tablist" aria-label="Filter photos by destination" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
          {[{ id: "all" as const, label: "All" }, ...galleryCategories].map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={filter === c.id}
              onClick={() => choose(c.id)}
              className={clsx(
                "shrink-0 rounded-full border px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                filter === c.id ? "border-navy bg-navy text-white" : "border-stone text-navy hover:border-navy",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted" aria-live="polite">
          Showing {items.length} photo{items.length === 1 ? "" : "s"}
          {filter !== "all" && ` of ${galleryCategories.find((c) => c.id === filter)?.label}`}
        </p>

        <ul key={filter} className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">

            {items.map((p, i) => (
              <motion.li
                key={p.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: Math.min(i, 9) * 0.05 }}
                className="break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setDirection(0);
                    setIndex(i);
                  }}
                  className="group relative block w-full overflow-hidden bg-sand"
                  aria-label={`Open photo: ${p.alt}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-navy-deep/75 via-transparent to-transparent p-5 text-left text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="max-w-[85%] text-sm leading-snug">{p.alt}</span>
                    <Expand className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </span>
                </button>
              </motion.li>
            ))}
        </ul>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-navy-deep/97 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <div className="flex items-center justify-between px-4 py-4 md:px-8">
              <p className="eyebrow text-white/60" aria-live="polite">
                {index + 1} / {items.length}
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="grid h-12 w-12 place-items-center rounded-full transition hover:bg-white/10"
                aria-label="Close photo viewer"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 md:px-24">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={current.key}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d === 0 ? 0 : d > 0 ? 120 : -120, scale: d === 0 ? 0.96 : 1 }),
                    center: { opacity: 1, x: 0, scale: 1 },
                    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -120 : 120 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={onDragEnd}
                  className="relative h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
                >
                  <Image src={current.src} alt={current.alt} fill sizes="100vw" quality={85} className="pointer-events-none select-none object-contain" priority />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/25 transition hover:bg-white hover:text-navy md:grid"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/25 transition hover:bg-white hover:text-navy md:grid"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-end justify-between gap-4 px-4 pb-6 pt-4 md:px-8">
              <div className="min-w-0">
                <p className="font-serif text-xl leading-snug md:text-2xl">{current.alt}</p>
                {current.credit && (
                  <p className="mt-1 truncate text-xs text-white/50">
                    Photo: {current.credit.artist} · {current.credit.license}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-2 md:hidden">
                <button type="button" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/25" aria-label="Previous photo">
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/25" aria-label="Next photo">
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
