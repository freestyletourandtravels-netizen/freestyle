"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

export type EnquiryPrefill = {
  packageName?: string;
  destination?: string;
  travelDate?: string;
  adults?: string;
  packageCategory?: string;
};

type Ctx = { openEnquiry: (prefill?: EnquiryPrefill) => void };
const EnquiryContext = createContext<Ctx | null>(null);

// The modal (and its form + validation code) loads separately, after the page is interactive.
const EnquiryModal = dynamic(() => import("./EnquiryModal").then((m) => m.EnquiryModal), { ssr: false });

const SEEN_KEY = "fst-enquiry-popup-seen";
const AUTO_OPEN_DELAY = 1000;
const NO_AUTO_OPEN = ["/contact-us", "/admin"];

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* storage unavailable (private mode) — ignore */
  }
}
function wasSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<EnquiryPrefill>({});
  const [instance, setInstance] = useState(0);
  const pathname = usePathname();

  const openEnquiry = useCallback((p: EnquiryPrefill = {}) => {
    setPrefill(p);
    setInstance((n) => n + 1); // fresh form each time it is opened
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    markSeen();
    setOpen(false);
  }, []);

  // Automatic popup: once per browser session, ~1s after the first page load.
  useEffect(() => {
    if (wasSeen() || NO_AUTO_OPEN.some((p) => pathname.startsWith(p))) return;
    const t = window.setTimeout(() => {
      if (wasSeen()) return;
      markSeen();
      setPrefill({});
      setInstance((n) => n + 1);
      setOpen(true);
    }, AUTO_OPEN_DELAY);
    return () => window.clearTimeout(t);
    // Only on first mount — do not re-trigger on client navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ openEnquiry }), [openEnquiry]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      {instance > 0 && <EnquiryModal key={instance} open={open} prefill={prefill} onClose={close} />}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}
