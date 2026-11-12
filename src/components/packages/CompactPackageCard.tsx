import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, MapPin } from "lucide-react";
import { categoryLabels, type TourPackage } from "@/data/packages";
import { img } from "@/data/images";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { packagePrefill } from "./PackageCard";

/** Clean package card used on the home page and the packages page. */
export function CompactPackageCard({ pkg, priority }: { pkg: TourPackage; priority?: boolean }) {
  const photo = img(pkg.image);
  const href = `/kashmir-tour-packages/${pkg.slug}`;
  return (
    <article className="group flex h-full min-w-0 flex-col rounded-[1.4rem] bg-white p-2.5 shadow-[0_16px_36px_-24px_rgba(23,27,34,0.45)] ring-1 ring-stone/50 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(23,27,34,0.5)]">
      {/* Photo */}
      <Link href={href} className="relative block aspect-[4/3.3] overflow-hidden rounded-[1.05rem] bg-sand" tabIndex={-1} aria-hidden="true">
        <Image
          src={photo.src}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          quality={85}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal/45 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-navy shadow-sm">
          {categoryLabels[pkg.categories[0]]}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-charcoal/55 px-3 py-1.5 text-[0.74rem] font-semibold text-white backdrop-blur-md">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {pkg.nights} Nights / {pkg.days} Days
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-4">
        <p className="flex items-center gap-1.5 truncate text-[0.74rem] font-medium text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-coral" aria-hidden="true" />
          <span className="truncate">{pkg.destinations.join(" → ")}</span>
        </p>
        <h3 className="mt-1.5 font-serif text-[1.45rem] font-semibold leading-tight text-navy">
          <Link href={href} className="transition-colors hover:text-coral">
            {pkg.name}
          </Link>
        </h3>

        <ul className="mt-3 space-y-1.5 text-[0.82rem] text-ink/80">
          {pkg.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#e7f0f8] text-navy">
                <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="line-clamp-1">{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-stone/60 pt-3 text-[0.72rem]">
            <span className="text-muted">Price on request</span>
            <span className="font-semibold text-navy">Fully customisable</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={href}
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-navy text-[0.78rem] font-bold text-white transition hover:bg-navy-deep"
            >
              View Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              <span className="sr-only">of {pkg.name}</span>
            </Link>
            <EnquiryButton
              prefill={packagePrefill(pkg)}
              variant="none"
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-coral/10 text-[0.78rem] font-bold text-coral-deep transition hover:bg-coral hover:text-white"
            >
              Get Quote
            </EnquiryButton>
          </div>
        </div>
      </div>
    </article>
  );
}
