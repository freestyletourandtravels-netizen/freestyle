import type { ReactNode } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import type { SiteImage } from "@/data/images";

/**
 * Light, compact page hero shared by every inner page:
 * breadcrumb, chip, headline (optional coral highlight), text, actions,
 * and a two-photo collage on the right (desktop).
 */
export function PageHero({
  image,
  image2,
  imageLabel,
  eyebrow,
  title,
  highlight,
  description,
  crumbs,
  children,
}: {
  image: SiteImage;
  image2?: SiteImage;
  imageLabel?: string;
  eyebrow: string;
  title: string;
  /** Part of the title to show in coral, e.g. "With a Story." */
  highlight?: string;
  description?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  const i = highlight ? title.indexOf(highlight) : -1;
  const heading =
    i >= 0 ? (
      <>
        {title.slice(0, i).trim()} <span className="block text-coral">{highlight}</span>
        {title.slice(i + highlight!.length)}
      </>
    ) : (
      title
    );

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#e7f0f8] via-[#f2f5f7] to-ivory pb-10 pt-28 md:pt-32 lg:pb-14">
      <div className="container-luxe grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Breadcrumbs items={crumbs} tone="dark" />
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 px-4 py-2 text-[0.72rem] font-semibold text-navy shadow-sm">
            <MapPin className="h-3.5 w-3.5 text-coral" aria-hidden="true" /> {eyebrow}
          </p>
          <h1 className="mt-4 text-[clamp(2.1rem,3.7vw,3.2rem)] font-extrabold leading-[1.06] text-navy">{heading}</h1>
          {description && <div className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-ink/75">{description}</div>}
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>

        <div className="relative hidden h-[24rem] lg:col-span-6 lg:block">
          <div className={image2 ? "absolute inset-y-0 right-0 w-[82%] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(36,59,96,0.5)]" : "absolute inset-0 overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(36,59,96,0.5)]"}>
            <Image src={image.src} alt={image.alt} fill priority sizes="45vw" quality={85} className="object-cover" />
          </div>
          {image2 && (
            <div className="absolute bottom-8 left-0 w-[38%] overflow-hidden rounded-2xl border-[6px] border-white shadow-xl">
              <div className="relative aspect-[4/5]">
                <Image src={image2.src} alt={image2.alt} fill sizes="18vw" className="object-cover" />
              </div>
            </div>
          )}
          {imageLabel && (
            <p className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[0.7rem] font-semibold text-navy shadow">
              <MapPin className="h-3.5 w-3.5 text-coral" aria-hidden="true" /> {imageLabel}
            </p>
          )}
        </div>

        {/* Mobile photo */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-[0_24px_50px_-28px_rgba(36,59,96,0.5)] lg:hidden">
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
