import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whyChooseUs } from "@/data/content";
import { img } from "@/data/images";
import { iconMap } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const photo = img("aru-horse");

export function WhyBanner() {
  const points = whyChooseUs.filter((w) =>
    ["Local Kashmir Knowledge", "Personalized Itineraries", "Direct Travel Assistance", "Flexible Holiday Planning"].includes(w.title),
  );
  return (
    <section className="bg-white pb-16 md:pb-20" aria-labelledby="why-title">
      <div className="container-luxe">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-deep text-white">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover object-[72%_center]" />
          <div className="absolute inset-0 bg-linear-to-r from-navy-deep via-navy-deep/85 to-navy-deep/10 max-lg:via-navy-deep/80 max-lg:to-navy-deep/50" />
          <div className="relative grid gap-10 p-8 sm:p-12 lg:min-h-[460px] lg:grid-cols-12 lg:items-center lg:p-16">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 id="why-title" className="font-serif text-[clamp(1.75rem,2.9vw,2.45rem)] font-bold leading-tight">
                  Why Travel with <span className="text-[#f6b8b0]">Freestyle?</span>
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-white/75">
                  We live in Tangmarg, at the foot of Gulmarg. Kashmir isn&apos;t a destination we sell. It&apos;s home, and we plan
                  every trip that way.
                </p>
              </Reveal>
              <RevealGroup className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {points.map((p) => {
                  const Icon = iconMap[p.icon];
                  return (
                    <RevealItem key={p.title} className="flex gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur">
                        <Icon className="h-5 w-5 text-[#f6b8b0]" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-semibold">{p.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-white/65">{p.text.split(". ")[0]}.</span>
                      </span>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
              <Reveal delay={0.2}>
                <Link href="/about-us" className="btn btn-coral mt-10">
                  Learn More <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </div>
          <p className="absolute bottom-5 right-6 hidden text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70 sm:block">
            Aru Valley · Pahalgam
          </p>
        </div>
      </div>
    </section>
  );
}
