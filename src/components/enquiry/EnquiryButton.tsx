"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { useEnquiry, type EnquiryPrefill } from "./EnquiryProvider";

export function EnquiryButton({
  children,
  className,
  prefill,
  variant = "coral",
}: {
  children: ReactNode;
  className?: string;
  prefill?: EnquiryPrefill;
  variant?: "coral" | "navy" | "ghost-light" | "ghost-dark" | "none";
}) {
  const { openEnquiry } = useEnquiry();
  return (
    <button
      type="button"
      onClick={() => openEnquiry(prefill)}
      aria-haspopup="dialog"
      className={clsx(variant !== "none" && `btn btn-${variant}`, className)}
    >
      {children}
    </button>
  );
}
