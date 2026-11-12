import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, BusFront, CircleCheck, CircleMinus, Heart, MapPin, Mountain, Plane, Users } from "lucide-react";
import { packages } from "@/data/packages";
import { faqs } from "@/data/content";
import { img } from "@/data/images";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CompactPackageCard } from "@/components/packages/CompactPackageCard";
import { PackageExplorer } from "@/components/packages/PackageExplorer";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { FaqSection } from "@/components/home/FaqSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { absoluteUrl, faqSchema, pageMetadata } from "@/lib/seo";
import { whatsappEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Kashmir Tour & Holiday Packages | Freestyle Tour & Travels",
  description:
    "Kashmir tour packages from 3 to 7 days: family and honeymoon trips, Gulmarg snow, Gurez and Pahalgam escapes, with day-wise itineraries. Get a free quote.",
  path: "/kashmir-tour-packages",
  image: img("pahalgam-valley").src,
  absoluteTitle: true,
});

const heroMain = img("sonamarg-paradise");
const heroSmall = img("srinagar-hazratbal");
const ctaPhoto = img("gulmarg-snowfall");

const included = [
  {
    icon: BedDouble,
    title: "Hotel of your choice",
    text: "Budget, Standard, Premium or Luxury, plus an optional houseboat night on Dal Lake. Properties are named in your quote.",
  },
  {
    icon: BusFront,
    title: "Private transport",
    text: "Sedan, SUV or tempo traveller for your group. Local union taxis in Pahalgam, Sonamarg and Gulmarg where required.",
  },
  {
    icon: CircleCheck,
    title: "Usually included",
    list: ["Stay in your chosen category", "Daily breakfast", "Srinagar airport pick-up & drop", "Sightseeing as per itinerary"],
  },
  {
    icon: CircleMinus,
    title: "Usually not included",
    list: ["Flights or train tickets", "Gondola, pony rides & activities", "Entry fees & personal expenses"],
  },
];

const styles = [
  {
    icon: Users,
    title: "Kashmir Family Tour Packages",
    text: "Comfortable pacing, vehicles sized for your group and hotels that suit children and elders.",
    href: "/kashmir-tour-packages?category=Family",
  },
  {
    icon: Heart,
    title: "Kashmir Honeymoon Packages",
    text: "A houseboat night on Dal Lake, a private sunset shikara and stays in Gulmarg and Pahalgam.",
    href: "/kashmir-tour-packages?category=Honeymoon",
  },
  {
    icon: Mountain,
    title: "Winter & Adventure Tours",
    text: "Gulmarg snow, the Gondola and remote Gurez Valley for travellers who want more than sightseeing.",
    href: "/kashmir-tour-packages?category=Winter",
  },
  {
    icon: Plane,
    title: "Kashmir Tour from Delhi",
    text: "Fly or take the train to Srinagar from anywhere in India. We plan everything around your tickets.",
    href: "/kashmir-tour-packages/kashmir-5-nights-6-days",
  },
];

export default function PackagesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kashmir Tour Packages",
    itemListElement: packages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/kashmir-tour-packages/${p.slug}`),
      name: `${p.name} (${p.durationLabel})`,
    })),
  };

  return (
    <>
      {/* Light hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#e7f0f8] via-[#f2f5f7] to-ivory pb-10 pt-28 md:pt-32 lg:pb-14">
        <div className="container-luxe grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ name: "Kashmir Tour Packages", path: "/kashmir-tour-packages" }]} tone="dark" />
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 px-4 py-2 text-[0.72rem] font-semibold text-navy shadow-sm">
              <MapPin className="h-3.5 w-3.5 text-coral" aria-hidden="true" /> {packages.length} journeys · 3 to 7 days
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.1rem,3.7vw,3.2rem)] font-extrabold leading-[1.04] text-navy">
              Find Your Perfect <span className="block text-coral">Kashmir Escape</span>
            </h1>
            <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-ink/75">
              Family holidays, honeymoon escapes, winter snow and journeys off the beaten path. Every itinerary can be tailored to you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <EnquiryButton variant="navy">Design Your Journey</EnquiryButton>
              <a href={whatsappLink(whatsappEnquiryMessage())} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>

          <div className="relative hidden h-[25rem] lg:col-span-6 lg:block">
            <div className="absolute inset-y-0 right-0 w-[82%] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(36,59,96,0.5)]">
              <Image src={heroMain.src} alt={heroMain.alt} fill priority sizes="40vw" quality={85} className="object-cover" />
            </div>
            <div className="absolute bottom-8 left-0 w-[38%] overflow-hidden rounded-2xl border-[6px] border-white shadow-xl">
              <div className="relative aspect-[4/5]">
                <Image src={heroSmall.src} alt={heroSmall.alt} fill sizes="18vw" className="object-cover" />
              </div>
            </div>
            <p className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[0.7rem] font-semibold text-navy shadow">
              <MapPin className="h-3.5 w-3.5 text-coral" aria-hidden="true" /> Sonamarg
            </p>
          </div>
        </div>
      </section>

      {/* Filters + packages */}
      <section className="bg-ivory pb-16 md:pb-20" aria-labelledby="all-packages">
        <div className="container-luxe">
          <h2 id="all-packages" className="sr-only">
            All Kashmir tour packages
          </h2>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {packages.map((p) => (
                  <CompactPackageCard key={p.slug} pkg={p} />
                ))}
              </div>
            }
          >
            <PackageExplorer />
          </Suspense>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white py-16 md:py-20" aria-labelledby="included">
        <div className="container-luxe">
          <Reveal className="max-w-2xl">
            <span className="inline-flex rounded-full bg-[#e7f0f8] px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy">Good to know</span>
            <h2 id="included" className="mt-4 font-serif text-[clamp(1.75rem,2.9vw,2.45rem)] font-bold leading-tight text-navy">
              What every package includes
            </h2>
            <p className="mt-2 text-muted">Final inclusions are confirmed in writing with your personalised quote.</p>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((c) => (
              <RevealItem key={c.title} className="rounded-2xl bg-ivory p-6 ring-1 ring-stone/50">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-coral shadow-sm">
                  <c.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-sans text-[1.02rem] font-bold text-navy">{c.title}</h3>
                {c.text && <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>}
                {c.list && (
                  <ul className="mt-3 space-y-1.5 text-sm text-ink/80">
                    {c.list.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                        {x}
                      </li>
                    ))}
                  </ul>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Travel styles (internal links for SEO) */}
      <section className="bg-ivory py-16 md:py-20" aria-labelledby="styles">
        <div className="container-luxe">
          <Reveal className="max-w-2xl">
            <span className="inline-flex rounded-full bg-[#e7f0f8] px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy">Travel your way</span>
            <h2 id="styles" className="mt-4 font-serif text-[clamp(1.75rem,2.9vw,2.45rem)] font-bold leading-tight text-navy">
              Packages for every kind of traveller
            </h2>
            <p className="mt-2 text-muted">
              Looking for a <Link href="/kashmir-tour-packages/gulmarg-snow-experience" className="font-semibold text-navy underline decoration-coral underline-offset-4">Gulmarg tour package</Link>,
              a <Link href="/kashmir-tour-packages/pahalgam-nature-escape" className="font-semibold text-navy underline decoration-coral underline-offset-4">Pahalgam tour package</Link> or
              the popular <Link href="/kashmir-tour-packages/kashmir-5-nights-6-days" className="font-semibold text-navy underline decoration-coral underline-offset-4">Kashmir 5 nights 6 days package</Link>?
            </p>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {styles.map((s) => (
              <RevealItem key={s.title}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_14px_34px_-24px_rgba(23,27,34,0.45)] ring-1 ring-stone/50 transition-shadow hover:shadow-[0_22px_44px_-22px_rgba(23,27,34,0.5)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e7f0f8] text-navy transition-colors group-hover:bg-coral group-hover:text-white">
                    <s.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-sans text-[1.02rem] font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-coral">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FaqSection />

      {/* CTA banner */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="container-luxe">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-deep text-white">
            <Image src={ctaPhoto.src} alt="" fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-r from-navy-deep via-navy-deep/80 to-navy-deep/20" />
            <div className="relative flex flex-col gap-6 p-8 sm:p-12 md:flex-row md:items-center md:justify-between lg:p-14">
              <div className="max-w-xl">
                <h2 className="font-serif text-[clamp(1.9rem,3.2vw,2.7rem)] font-semibold leading-tight">
                  Not sure which package fits? <span className="text-[#f6b8b0]">Let&apos;s design yours.</span>
                </h2>
                <p className="mt-3 text-white/75">Share your dates and wishes, and our Tangmarg team will craft a Kashmir itinerary just for you.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <EnquiryButton>Design My Journey</EnquiryButton>
                <a href={whatsappLink(whatsappEnquiryMessage())} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                  <WhatsAppIcon className="h-4 w-4" /> Chat With Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={itemList} />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
