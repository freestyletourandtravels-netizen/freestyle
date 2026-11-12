import { TravelHero } from "@/components/home/TravelHero";
import { PopularPackages } from "@/components/home/PopularPackages";
import { TopDestinations } from "@/components/home/TopDestinations";
import { WhyBanner } from "@/components/home/WhyBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqs } from "@/data/content";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kashmir Tour Packages & Holidays | Freestyle Tour & Travels, Tangmarg",
  description:
    "Personalised Kashmir tour packages from a local travel agency in Tangmarg. Family, honeymoon, winter and adventure trips to Srinagar, Gulmarg, Pahalgam, Sonamarg and beyond.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <TravelHero />
      <PopularPackages />
      <TopDestinations />
      <WhyBanner />
      <Testimonials />
      <FaqSection />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
