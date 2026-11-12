import clsx from "clsx";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/** Section heading: small pill label, bold title and optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center" | "split";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
}) {
  const eyebrowEl = (
    <span
      className={clsx(
        "inline-flex rounded-full px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em]",
        tone === "light" ? "bg-white/10 text-[#f6b8b0]" : "bg-[#e7f0f8] text-navy",
      )}
    >
      {eyebrow}
    </span>
  );
  const titleEl = (
    <Tag className={clsx("mt-4 text-[clamp(1.75rem,2.9vw,2.45rem)] font-bold leading-tight", tone === "light" ? "text-white" : "text-navy")}>{title}</Tag>
  );
  const introEl = intro ? <p className={clsx("leading-relaxed", tone === "light" ? "text-white/75" : "text-muted")}>{intro}</p> : null;

  if (align === "split") {
    return (
      <Reveal className={clsx("grid gap-4 lg:grid-cols-12 lg:items-end", className)}>
        <div className="lg:col-span-7">
          {eyebrowEl}
          {titleEl}
        </div>
        {introEl && <div className="lg:col-span-4 lg:col-start-9">{introEl}</div>}
      </Reveal>
    );
  }

  return (
    <Reveal className={clsx(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrowEl}
      {titleEl}
      {introEl && <div className="mt-3">{introEl}</div>}
    </Reveal>
  );
}
