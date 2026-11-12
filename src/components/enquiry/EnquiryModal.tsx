"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { QuickEnquiryForm } from "./QuickEnquiryForm";
import type { EnquiryPrefill } from "./EnquiryProvider";

const ease = [0.22, 1, 0.36, 1] as const;

export function EnquiryModal({ open, prefill, onClose }: { open: boolean; prefill: EnquiryPrefill; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Escape to close, simple focus trap, scroll lock, focus restore.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => panelRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      window.clearTimeout(t);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6">
          <motion.div
            className="absolute inset-0 bg-navy-deep/55 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            aria-describedby="enquiry-subtitle"
            tabIndex={-1}
            className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[1.6rem] bg-white shadow-2xl outline-none md:max-h-[min(94svh,640px)] md:max-w-[26rem] md:rounded-[1.6rem]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.7, ease }}
          >
            {/* Header */}
            <div className="relative shrink-0 overflow-hidden bg-linear-to-br from-navy-deep via-navy to-[#2f5fb3] px-5 pb-6 pt-5 text-white sm:px-7 sm:pt-6">
              <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/30 md:hidden" aria-hidden="true" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 md:right-4 md:top-4"
                aria-label="Close enquiry form"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/10 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-amber-300">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Free Quote · No Obligation
              </p>
              <h2 id="enquiry-title" className="mt-3 pr-10 text-[1.4rem] font-extrabold leading-tight text-white sm:text-[1.55rem]">
                Plan Your Kashmir Holiday!
              </h2>
              <p id="enquiry-subtitle" className="mt-1.5 max-w-md text-[0.88rem] leading-relaxed text-white/80">
                Share your details and our Tangmarg team will call you with a free plan &amp; quote.
              </p>
            </div>

            {/* Form */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 pt-5 sm:px-7 sm:pb-6">
              <QuickEnquiryForm prefill={prefill} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
