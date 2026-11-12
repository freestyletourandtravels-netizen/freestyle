import clsx from "clsx";

/**
 * Editorial line-by-line heading reveal, done in CSS so the text paints
 * immediately from server HTML (good for LCP) and respects reduced motion.
 * Pass `lines` to control line breaks; otherwise the title rises word by word.
 */
export function HeroText({
  eyebrow,
  title,
  lines,
  accentLast,
  className,
  headingClassName = "display-xl",
  delay = 0.2,
}: {
  eyebrow?: string;
  title: string;
  lines?: string[];
  accentLast?: boolean;
  className?: string;
  headingClassName?: string;
  delay?: number;
}) {
  const parts = lines ?? title.split(" ");
  return (
    <div className={className}>
      {eyebrow && (
        <p className="eyebrow flex animate-fade-up items-center gap-3 text-white/85" style={{ animationDelay: `${delay}s` }}>
          <span className="h-px w-10 bg-coral" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h1 className={clsx(headingClassName, "mt-6 text-white")}>
        <span className="sr-only">{title}</span>
        {parts.map((part, i) => {
          const accent = accentLast && i === parts.length - 1;
          return (
            <span
              key={i}
              className={clsx("overflow-hidden pb-[0.1em] align-bottom", lines ? "block" : "mr-[0.22em] inline-block")}
              aria-hidden="true"
            >
              <span
                className={clsx("inline-block animate-rise", accent && "italic text-[#f6b8b0]")}
                style={{ animationDelay: `${delay + 0.1 + i * (lines ? 0.14 : 0.06)}s` }}
              >
                {part}
              </span>
            </span>
          );
        })}
      </h1>
    </div>
  );
}
