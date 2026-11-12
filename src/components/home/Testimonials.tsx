import Image from "next/image";
import { ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";
import { img } from "@/data/images";
import { Reveal } from "@/components/motion/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/lib/whatsapp";

const photo = img("srinagar-dal-sunset");

/**
 * Shows genuine reviews from data/testimonials.ts. While that list is empty
 * it shows an honest invitation instead of placeholder or invented reviews.
 */
export function Testimonials() {
  const shown = testimonials.slice(0, 2);
  return (
    <section className="bg-ivory py-16 md:py-20" aria-labelledby="stories-title">
      <div className="container-luxe">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-[#e7f0f8] px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy">Testimonials</span>
            <h2 id="stories-title" className="mt-4 font-serif text-[clamp(1.75rem,2.9vw,2.45rem)] font-bold leading-tight text-navy">
              What Our Travellers Say
            </h2>
            <p className="mt-2 text-muted">Genuine words from guests we have travelled with.</p>
          </div>
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-coral">
            Follow our journeys <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="grid gap-6 lg:col-span-7">
            {shown.length > 0 ? (
              shown.map((t) => (
                <Reveal key={t.name + t.quote.slice(0, 16)} className="rounded-[1.4rem] border border-stone/70 bg-ivory p-7 md:p-8">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-navy">
                      {t.name}
                      {t.context && <span className="block text-sm font-normal text-muted">{t.context}</span>}
                    </p>
                    {t.rating ? (
                      <p className="flex gap-0.5" aria-label={`Rated ${t.rating} out of 5`}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} className={i < t.rating! ? "h-4 w-4 fill-coral text-coral" : "h-4 w-4 text-stone"} aria-hidden="true" />
                        ))}
                      </p>
                    ) : null}
                  </div>
                  <blockquote className="mt-4 leading-relaxed text-ink/80">&ldquo;{t.quote}&rdquo;</blockquote>
                </Reveal>
              ))
            ) : (
              <Reveal className="flex h-full flex-col justify-between rounded-[1.4rem] border border-stone/70 bg-ivory p-8 md:p-10">
                <Quote className="h-9 w-9 text-coral" strokeWidth={1.3} aria-hidden="true" />
                <div>
                  <p className="mt-6 text-[1.4rem] font-semibold leading-snug text-navy md:text-[1.65rem]">
                    Travelled with us? We would love to share your Kashmir story here, in your own words.
                  </p>
                  <p className="mt-4 max-w-lg text-muted">
                    We only publish genuine reviews from our guests, with their permission. Send yours on WhatsApp and we will add it.
                  </p>
                  <a
                    href={whatsappLink("Hello Freestyle Tour & Travels! I'd like to share a review of my Kashmir trip:")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-navy mt-8"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Share Your Review
                  </a>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] h-full overflow-hidden rounded-[1.4rem] bg-navy-deep text-white lg:aspect-auto lg:min-h-[360px]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-xl transition-transform duration-500 group-hover:scale-110">
                <InstagramIcon className="h-7 w-7" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-6">
                <span className="block font-serif text-2xl font-semibold">Kashmir through our lens</span>
                <span className="mt-1 block text-sm text-white/80">@{site.instagramHandle} on Instagram</span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
