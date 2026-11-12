import Image from "next/image";
import { whyChooseUs } from "@/data/content";
import { img } from "@/data/images";
import { iconMap } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";

const photo = img("gulmarg-sunset-point");

export function WhyChoose({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <section className="grain relative overflow-hidden bg-navy-deep py-24 text-white md:py-36" aria-labelledby="why-title">
      <div className="container-luxe relative grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="eyebrow flex items-center gap-3 text-coral">
            <span className="h-px w-8 bg-current" aria-hidden="true" />
            Why Travel With Us
          </p>
          <H id="why-title" className="display-lg mt-5">
            Travel with people who <em className="text-coral">call Kashmir home.</em>
          </H>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
            We live at the foot of Gulmarg. Kashmir isn&apos;t a destination we sell. It&apos;s home, and we plan every trip that way.
          </p>
          <div className="relative mt-10 hidden aspect-[16/10] overflow-hidden lg:block">
            <Image src={photo.src} alt={photo.alt} fill sizes="40vw" className="object-cover" />
          </div>
          <EnquiryButton className="mt-10">Start Planning</EnquiryButton>
        </Reveal>

        <RevealGroup className="grid gap-px bg-white/10 sm:grid-cols-2 lg:col-span-7">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <RevealItem key={item.title} className="group bg-navy-deep p-8 transition-colors duration-500 hover:bg-navy md:p-10">
                <div className="flex items-start justify-between">
                  <Icon className="h-8 w-8 text-coral transition-transform duration-500 group-hover:scale-110" strokeWidth={1.3} aria-hidden="true" />
                  <span className="font-serif text-lg text-white/30">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-serif text-[1.7rem] leading-tight">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{item.text}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
