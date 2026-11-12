import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BedDouble, BusFront, CalendarRange, Check, Info, MapPin, Minus, Phone, Plus, Sun, Users } from "lucide-react";
import { categoryLabels, getPackage, packages, type TourPackage } from "@/data/packages";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { packagePrefill, packageRoute } from "@/components/packages/PackageCard";
import { CompactPackageCard } from "@/components/packages/CompactPackageCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { faqSchema, pageMetadata, touristTripSchema } from "@/lib/seo";
import { whatsappEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

export const dynamicParams = false;

/** Practical notes that apply to every Kashmir trip. */
const travelInfo = [
  "Carry a government photo ID for every adult. It is checked at hotels and some sightseeing points.",
  "Prepaid mobile SIMs from outside Jammu & Kashmir do not work here; postpaid connections do.",
  "Mountain roads (Gurez, Sonamarg and the Gondola's upper phase) depend on weather and may close at short notice. We plan around this.",
  "Local union taxis are mandatory for some valley excursions in Pahalgam, Sonamarg and Gulmarg.",
  "Gulmarg Gondola tickets sell out in peak season. Book online in advance or ask us to help.",
  "Evenings are cool even in summer. Pack warm layers, and proper winter clothing from November to March.",
];

/** FAQs built only from this package's own published details, so every answer is accurate. */
function packageFaqs(p: TourPackage) {
  return [
    { q: `What is the best time for the ${p.name} package?`, a: p.bestTime },
    {
      q: `Can the ${p.durationLabel} itinerary be customised?`,
      a: "Yes. You can add or remove days, swap destinations, change the hotel category or add experiences. Share your plans and we will adjust the itinerary and quote.",
    },
    { q: "Which hotels are included?", a: p.hotelCategory },
    { q: "How will we travel during the trip?", a: p.transport },
    {
      q: "Why is no price shown for this package?",
      a: "The cost depends on your travel dates, group size, hotel category and season. Request a quote and we will send a clear, personalised price.",
    },
  ];
}

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPackage(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.seoTitle,
    absoluteTitle: true,
    description: `${p.durationLabel} Kashmir tour package covering ${p.destinations.join(", ")}. Day-wise itinerary, hotel options and a free personalised quote.`,
    path: `/kashmir-tour-packages/${p.slug}`,
    image: img(p.image).src,
  });
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPackage(slug);
  if (!p) notFound();

  const prefill = packagePrefill(p);
  const waHref = whatsappLink(whatsappEnquiryMessage({ packageName: `${p.durationLabel} ${p.name}` }));
  const others = packages
    .filter((x) => x.slug !== p.slug)
    .map((x) => ({ x, score: x.categories.filter((c) => p.categories.includes(c)).length + x.destinations.filter((d) => p.destinations.includes(d)).length * 0.3 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ x }) => x);
  const faqs = packageFaqs(p);

  const facts = [
    { icon: CalendarRange, label: "Duration", value: p.durationLabel },
    { icon: MapPin, label: "Route", value: packageRoute(p) },
    { icon: Users, label: "Ideal for", value: p.idealFor.join(", ") },
    { icon: Sun, label: "Best time", value: p.bestTime },
  ];

  return (
    <>
      <PageHero
        image={img(p.image)}
        image2={img(p.gallery[1] ?? p.gallery[0])}
        imageLabel={p.destinations.slice(1).join(" · ") || p.destinations[0]}
        eyebrow={`${p.durationLabel} · Kashmir Tour Package`}
        title={p.name}
        description={p.summary}
        crumbs={[
          { name: "Kashmir Tour Packages", path: "/kashmir-tour-packages" },
          { name: p.name, path: `/kashmir-tour-packages/${p.slug}` },
        ]}
      >
        <EnquiryButton prefill={prefill}>Request a Quote</EnquiryButton>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          <WhatsAppIcon className="h-5 w-5" /> Ask on WhatsApp
        </a>
      </PageHero>

      {/* Key facts */}
      <section aria-label="Package overview" className="bg-ivory pb-4">
        <div className="container-luxe">
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex gap-3.5 rounded-2xl bg-white p-5 ring-1 ring-stone/60">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e7f0f8] text-navy">
                <f.icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted">{f.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold leading-snug text-navy">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
        </div>
      </section>

      <div className="container-luxe grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-12 lg:col-span-8">
          {/* Introduction */}
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {p.categories.map((c) => (
                <span key={c} className="rounded-full bg-[#e7f0f8] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-navy">
                  {categoryLabels[c]}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xl font-semibold leading-snug text-navy md:text-2xl">{p.summary}</p>
            <p className="mt-4 text-muted">
              Ideal for {p.idealFor.join(", ").toLowerCase()}. This {p.durationLabel.toLowerCase()} itinerary starts and ends in Srinagar
              and is fully customisable.
            </p>
          </Reveal>

          {/* Gallery */}
          <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-3 md:grid-rows-2">
            {p.gallery.map((k, i) => {
              const g = img(k);
              return (
                <RevealItem
                  key={k}
                  className={i === 0 ? "relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl md:row-span-2 md:aspect-auto" : "relative aspect-square overflow-hidden rounded-2xl"}
                >
                  <Image src={g.src} alt={g.alt} fill sizes={i === 0 ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 20vw, 50vw"} className="object-cover" />
                </RevealItem>
              );
            })}
          </RevealGroup>

          {/* Highlights */}
          <Reveal>
            <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-navy">Package highlights</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 rounded-xl bg-white px-4 py-3.5 text-[0.95rem] text-ink ring-1 ring-stone/60">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden="true" /> {h}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Itinerary */}
          <section aria-labelledby="itinerary">
            <Reveal>
              <h2 id="itinerary" className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-navy">
                Day-wise itinerary
              </h2>
              <p className="mt-3 text-muted">A suggested plan. We adjust it to your arrival time, pace and interests.</p>
            </Reveal>
            <RevealGroup className="relative mt-10">
              <span className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-stone" aria-hidden="true" />
              <ol className="space-y-4">
                {p.itinerary.map((d) => (
                  <RevealItem key={d.day} as="li" className="relative flex gap-6">
                    <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white ring-4 ring-ivory">
                      {d.day}
                    </span>
                    <div className="flex-1 rounded-2xl bg-white p-5 ring-1 ring-stone/60">
                      <p className="text-[0.72rem] font-bold uppercase tracking-wider text-coral">Day {d.day}</p>
                      <h3 className="mt-1 text-lg font-bold leading-snug text-navy">{d.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{d.description}</p>
                    </div>
                  </RevealItem>
                ))}
              </ol>
            </RevealGroup>
          </section>

          {/* Hotel + transport */}
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            <RevealItem className="rounded-2xl bg-white p-6 ring-1 ring-stone/60">
              <BedDouble className="h-7 w-7 text-coral" strokeWidth={1.4} aria-hidden="true" />
              <h2 className="mt-4 text-lg font-bold text-navy">Hotel category</h2>
              <p className="mt-3 leading-relaxed text-muted">{p.hotelCategory}</p>
            </RevealItem>
            <RevealItem className="rounded-2xl bg-white p-6 ring-1 ring-stone/60">
              <BusFront className="h-7 w-7 text-coral" strokeWidth={1.4} aria-hidden="true" />
              <h2 className="mt-4 text-lg font-bold text-navy">Transportation</h2>
              <p className="mt-3 leading-relaxed text-muted">{p.transport}</p>
            </RevealItem>
          </RevealGroup>

          {/* Inclusions / exclusions */}
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 ring-1 ring-stone/60">
                <h2 className="text-lg font-bold text-navy">Inclusions</h2>
                <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                  {p.inclusions.map((x) => (
                    <li key={x} className="flex gap-3 text-ink">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-coral" aria-hidden="true" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-6 ring-1 ring-stone/60">
                <h2 className="text-lg font-bold text-navy">Exclusions</h2>
                <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                  {p.exclusions.map((x) => (
                    <li key={x} className="flex gap-3 text-muted">
                      <Minus className="mt-0.5 h-5 w-5 shrink-0 text-navy/40" aria-hidden="true" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-8 text-sm text-muted">
              Inclusions shown are a guide. Your final inclusions, hotels and price are confirmed in writing with your quote.
            </p>
          </Reveal>

          {/* Important travel information */}
          <Reveal>
            <div className="rounded-2xl bg-[#eef4fa] p-6 md:p-8">
              <h2 className="flex items-center gap-3 text-xl font-bold text-navy">
                <Info className="h-6 w-6 text-coral" strokeWidth={1.6} aria-hidden="true" /> Important travel information
              </h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {travelInfo.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/85">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* FAQ */}
          <section aria-labelledby="package-faq">
            <Reveal>
              <h2 id="package-faq" className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-navy">
                Frequently asked questions
              </h2>
              <div className="mt-5 space-y-3">
                {faqs.map((q) => (
                  <details key={q.q} className="group rounded-2xl bg-white ring-1 ring-stone/60 open:bg-[#f3f7fb]">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 font-semibold leading-snug text-navy [&::-webkit-details-marker]:hidden">
                      {q.q}
                      <Plus className="h-5 w-5 shrink-0 text-coral transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                    </summary>
                    <p className="max-w-2xl px-5 pb-5 leading-relaxed text-muted">{q.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </section>
        </div>

        {/* Sticky enquiry card */}
        <aside className="hidden lg:col-span-4 lg:block" aria-label="Enquire about this package">
          <div className="overflow-hidden rounded-[1.75rem] bg-linear-to-br from-navy-deep via-navy to-[#2f5fb3] p-7 text-white shadow-[0_30px_60px_-30px_rgba(36,59,96,0.7)] lg:sticky lg:top-28">
            <p className="inline-flex rounded-full border border-amber-300/40 bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-amber-300">Price on request</p>
            <p className="mt-4 text-2xl font-extrabold leading-tight">
              {p.name}
              <span className="mt-1 block text-base font-medium text-white/70">{p.durationLabel}</span>
            </p>
            <p className="mt-4 leading-relaxed text-white/70">
              Prices depend on your dates, group size and hotel category. Get a free, no-obligation quote.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <EnquiryButton prefill={prefill} className="w-full">
                Request a Quote
              </EnquiryButton>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full">
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
              <a href={site.phoneHref} className="btn btn-ghost-light w-full">
                <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone}
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Other packages */}
      <section className="bg-white py-14 md:py-20" aria-labelledby="more-packages">
        <div className="container-luxe">
          <Reveal>
            <h2 id="more-packages" className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-navy">
              You may also like
            </h2>
          </Reveal>
          <RevealGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <RevealItem key={o.slug}>
                <CompactPackageCard pkg={o} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Mobile bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone bg-ivory/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-lg leading-tight text-navy">{p.name}</p>
            <p className="text-xs text-muted">{p.durationLabel} · price on request</p>
          </div>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white" aria-label="Ask about this package on WhatsApp">
            <WhatsAppIcon className="h-6 w-6" />
          </a>
          <EnquiryButton prefill={prefill} className="!min-h-12 shrink-0 !px-5">
            Get Quote
          </EnquiryButton>
        </div>
      </div>
      <div className="h-20 lg:hidden" aria-hidden="true" />

      <JsonLd data={touristTripSchema(p)} />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
