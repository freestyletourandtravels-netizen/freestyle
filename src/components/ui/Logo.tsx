import Image from "next/image";
import { site } from "@/data/site";
import clsx from "clsx";

type Props = { tone?: "light" | "dark"; className?: string; priority?: boolean; size?: "sm" | "md" | "lg" };

/**
 * Brand logo. Uses the original logo file when `site.logo.src` is set
 * (aspect ratio preserved, never stretched). Until then, a typographic
 * wordmark placeholder is rendered.
 */
export function Logo({ tone = "dark", className, priority, size = "md" }: Props) {
  const heights = { sm: 40, md: 52, lg: 72 };
  const h = heights[size];
  const src = tone === "light" && site.logo.srcOnDark ? site.logo.srcOnDark : site.logo.src;

  if (src) {
    // Original round badge (never stretched) + the name beside it for legibility.
    return (
      <span className={clsx("inline-flex items-center gap-2.5 leading-none", tone === "light" ? "text-white" : "text-navy", className)}>
        <Image
          src={src}
          alt={`${site.name} logo`}
          width={h}
          height={Math.round((site.logo.height / site.logo.width) * h)}
          priority={priority}
          className="shrink-0 rounded-full object-contain"
          style={{ width: h, height: "auto" }}
        />
        <span className="flex flex-col">
          <span className={clsx("font-serif font-bold tracking-tight", size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl")}>Freestyle</span>
          <span className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.3em] opacity-80">Tour &amp; Travels</span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-3 leading-none",
        tone === "light" ? "text-white" : "text-navy",
        className,
      )}
    >
      <svg viewBox="0 0 48 48" className={clsx(size === "lg" ? "h-12 w-12" : size === "sm" ? "h-8 w-8" : "h-10 w-10")} aria-hidden="true">
        <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="31" cy="16" r="4" fill="#E95C50" />
        <path d="M7 33 L18 19 L24 26 L29 21 L41 33 Z" fill="currentColor" />
        <path d="M18 19 L21 23 L19.5 23 L18 21.5 L16.5 23.2 Z" fill="#F7F5F0" opacity="0.9" />
      </svg>
      <span className="flex flex-col">
        <span className={clsx("font-serif font-semibold tracking-tight", size === "lg" ? "text-3xl" : size === "sm" ? "text-xl" : "text-2xl")}>
          Freestyle
        </span>
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em] opacity-80">Tour &amp; Travels</span>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
