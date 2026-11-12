import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Headset, MapPin, Route } from "lucide-react";
import { img } from "@/data/images";
import { destinations } from "@/data/destinations";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { WhyBanner } from "@/components/home/WhyBanner";
import { FinalCta } from "@/components/home/FinalCta";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us – Kashmir Travel Agency in Tangmarg | Freestyle",
  description:
    "Freestyle Tour & Travels is a Kashmir travel agency in Tangmarg, near Gulmarg, creating personalised holidays across Srinagar, Gulmarg and Pahalgam.",
  path: "/about-us",
  image: img("srinagar-dal-dusk").src,
  absoluteTitle: true,
});

const storyPoints = [
  { icon: Compass, title: "Local experts", text: "We live here and know every road and season." },
  { icon: Route, title: "Personal plans", text: "Itineraries shaped around how you travel." },
  { icon: Headset, title: "Direct support", text: "Talk to our team on WhatsApp, anytime." },
];

const philosophy = [
  {
    title: "Travel at your pace",
    text: "Some travellers want to see everything; others want one perfect view and a long cup of kahwa. We plan for how you like to travel.",
  },
  {
    title: "Local by heart",
    text: "Our home is Tangmarg, on the road to Gulmarg. That local knowledge shapes better routes, better timing and better moments.",
  },
  {
    title: "Every detail considered",
    text: "Comfortable stays, reliable vehicles and someone to call at any point of your journey, so you can simply enjoy Kashmir.",
  },
];

export default function AboutPage() {
  const story = img("srinagar-dal");
  const story2 = img("gulmarg-snowfall");
  return (
    <>
      <PageHero
        image={img("srinagar-hazratbal")}
        image2={img("gulmarg-jannat")}
        imageLabel="Dal Lake · Srinagar"
        eyebrow="About Freestyle Tour & Travels"
        title="Every Great Journey Begins With a Story."
        highlight="Begins With a Story."
        description="A Kashmir-based travel agency in Tangmarg, creating journeys that feel personal from the very first conversation."
        crumbs={[{ name: "About Us", path: "/about-us" }]}
      />

      {/* Our story */}
      <section className="py-16 md:py-24" aria-labelledby="story">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Photos */}
          <Reveal className="relative lg:col-span-6">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(36,59,96,0.5)]">
              <Image src={story.src} alt={story.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" quality={85} className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-8 right-4 hidden w-[36%] overflow-hidden rounded-2xl border-[6px] border-white shadow-xl sm:block lg:-right-6">
              <div className="relative aspect-[4/5]">
                <Image src={story2.src} alt={story2.alt} fill sizes="18vw" className="object-cover" />
              </div>
            </div>
            <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-coral text-white">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-navy">Based in Tangmarg</span>
                <span className="text-xs text-muted">The gateway to Gulmarg</span>
              </span>
            </div>
          </Reveal>

          {/* Text */}
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Our Story" title={<span id="story">More than just a holiday</span>} />
            <Reveal delay={0.1} className="mt-5 space-y-4 leading-relaxed text-muted">
              <p>
                <span className="font-bold text-navy">{site.name}</span> is a Kashmir-based travel agency in Tangmarg. We believe every
                journey should be more than just a holiday: a collection of unforgettable experiences.
              </p>
              <p>
                From the landscapes of Gulmarg to the peaceful valleys of Pahalgam and the charm of Srinagar, we help travellers
                discover Kashmir through personalised plans, made comfortable, memorable and easy.
              </p>
            </Reveal>

            <RevealGroup className="mt-7 grid gap-3 sm:grid-cols-3">
              {storyPoints.map((s) => (
                <RevealItem key={s.title} className="rounded-2xl bg-white p-4 ring-1 ring-stone/60">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e7f0f8] text-navy">
                    <s.icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-sm font-bold leading-snug text-navy">{s.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{s.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <EnquiryButton variant="navy">Plan Your Trip</EnquiryButton>
              <p className="text-lg font-bold italic text-coral">“{site.tagline}”</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-white py-16 md:py-24" aria-labelledby="philosophy">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our Travel Philosophy"
            title={<span id="philosophy">Thoughtful journeys, planned by locals</span>}
            align="split"
            intro="Three simple ideas guide every itinerary we create."
          />
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {philosophy.map((p, i) => (
              <RevealItem key={p.title} className="rounded-2xl bg-ivory p-7 ring-1 ring-stone/50">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-sm font-bold text-white">0{i + 1}</span>
                <h3 className="mt-5 text-[1.2rem] font-bold text-navy">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <WhyBanner />

      {/* Destinations */}
      <section className="py-16 md:py-24" aria-labelledby="our-destinations">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our Destinations"
            title={<span id="our-destinations">Where we take you</span>}
            align="split"
            intro="Eight corners of Kashmir, each with its own character. Combine them into one journey or explore one deeply."
          />
          <RevealGroup className="mt-10 grid gap-3">
            {destinations.map((d, i) => {
              const p = img(d.image);
              return (
                <RevealItem key={d.slug}>
                  <Link href={`/kashmir-tour-packages?destination=${encodeURIComponent(d.packageFilter)}`} className="group grid items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-stone/60 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(23,27,34,0.45)] sm:grid-cols-12 sm:gap-6">
                    <span className="hidden text-sm font-semibold text-navy/40 sm:col-span-1 sm:block">0{i + 1}</span>
                    <span className="relative hidden aspect-[4/3] overflow-hidden rounded-xl sm:col-span-2 sm:block">
                      <Image src={p.src} alt="" fill sizes="15vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </span>
                    <span className="sm:col-span-4">
                      <span className="block text-xl font-bold text-navy transition-colors group-hover:text-coral md:text-2xl">{d.name}</span>
                      <span className="mt-0.5 block text-sm font-medium text-coral">{d.tagline}</span>
                    </span>
                    <span className="text-sm leading-relaxed text-muted sm:col-span-4">{d.description}</span>
                    <ArrowUpRight className="hidden h-6 w-6 justify-self-end text-navy transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:col-span-1 sm:block" aria-hidden="true" />
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/kashmir-tour-packages" className="btn btn-navy">
              View Kashmir Packages
            </Link>
            <EnquiryButton variant="ghost-dark">Plan a Custom Trip</EnquiryButton>
          </div>
        </div>
      </section>

      <FinalCta
        title="Let's plan your Kashmir story together."
        description="Tell us what you dream of seeing. We'll take care of the rest, from Tangmarg with love."
        image="nishat-sunset"
      />
    </>
  );
}
