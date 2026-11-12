import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MoonStar, Route } from "lucide-react";
import clsx from "clsx";
import { categoryLabels, categoryToEnquiry, type TourPackage } from "@/data/packages";
import { img } from "@/data/images";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";

/** Which destination to preselect in the enquiry form for a package. */
export function packageDestination(p: TourPackage) {
  const places = p.destinations.filter((d) => d !== "Srinagar");
  return places.length === 1 ? places[0] : "Complete Kashmir Tour";
}

export function packagePrefill(p: TourPackage) {
  return {
    packageName: `${p.durationLabel} · ${p.name}`,
    destination: packageDestination(p),
    packageCategory: categoryToEnquiry[p.categories[0]],
  };
}

export const packageRoute = (p: TourPackage) => p.destinations.join(" → ");

export function PackageCard({
  pkg,
  headingLevel = "h3",
  layout = "vertical",
  priority,
}: {
  pkg: TourPackage;
  headingLevel?: "h2" | "h3";
  layout?: "vertical" | "horizontal";
  priority?: boolean;
}) {
  const photo = img(pkg.image);
  const H = headingLevel;
  const href = `/kashmir-tour-packages/${pkg.slug}`;
  const horizontal = layout === "horizontal";

  return (
    <article
      className={clsx(
        "group flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-white shadow-[0_24px_50px_-38px_rgba(23,27,34,0.6)] transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_40px_70px_-36px_rgba(23,27,34,0.55)]",
        horizontal && "lg:flex-row",
      )}
    >
      <Link
        href={href}
        className={clsx("relative block shrink-0 overflow-hidden bg-sand", horizontal ? "aspect-[4/3] lg:aspect-auto lg:w-[55%]" : "aspect-[4/3]")}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={photo.src}
          alt=""
          fill
          priority={priority}
          sizes={horizontal ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal/55 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-ivory/95 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-navy">
          <MoonStar className="h-3.5 w-3.5 text-coral" aria-hidden="true" /> {pkg.durationLabel}
        </span>
        <span className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {pkg.categories.slice(0, 2).map((c) => (
            <span key={c} className="rounded-full border border-white/40 bg-charcoal/30 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              {categoryLabels[c]}
            </span>
          ))}
        </span>
      </Link>

      <div className={clsx("flex flex-1 flex-col p-6 md:p-7", horizontal && "lg:p-10 xl:p-12")}>
        <p className="flex items-start gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-coral">
          <Route className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{packageRoute(pkg)}</span>
        </p>
        <H className={clsx("mt-3 font-serif leading-[1.08] text-navy", horizontal ? "text-[2.1rem] lg:text-[2.75rem]" : "text-[1.85rem]")}>
          <Link href={href} className="transition-colors hover:text-coral">
            {pkg.name}
          </Link>
          <span className="sr-only"> — {pkg.durationLabel} Kashmir tour package</span>
        </H>
        <p className={clsx("mt-3 text-[0.95rem] leading-relaxed text-muted", !horizontal && "line-clamp-3")}>{pkg.summary}</p>

        <ul className="mt-5 space-y-2 border-t border-sand pt-5 text-sm text-ink">
          {pkg.highlights.slice(0, horizontal ? 4 : 3).map((h) => (
            <li key={h} className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7">
          <Link href={href} className="btn btn-navy !min-h-[2.75rem] !px-5">
            View Itinerary <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">for {pkg.name}</span>
          </Link>
          <EnquiryButton
            prefill={packagePrefill(pkg)}
            variant="none"
            className="inline-flex min-h-11 items-center text-[0.74rem] font-bold uppercase tracking-[0.14em] text-navy underline decoration-coral decoration-2 underline-offset-[6px] hover:text-coral"
          >
            Request a Quote
          </EnquiryButton>
        </div>
      </div>
    </article>
  );
}
