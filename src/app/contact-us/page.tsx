import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { pageMetadata } from "@/lib/seo";
import { whatsappEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Contact Us – Plan Your Kashmir Trip | Freestyle",
  description:
    "Call or WhatsApp +91 7889649774 to plan your Kashmir holiday with Freestyle Tour & Travels, a local travel agency in Tangmarg, Kashmir.",
  path: "/contact-us",
  image: img("srinagar-dal-sunset").src,
  absoluteTitle: true,
});

export default function ContactPage() {
  const channels = [
    {
      icon: Phone,
      label: "Call us",
      value: site.phone,
      href: site.phoneHref,
      action: "Tap to call",
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: site.phone,
      href: whatsappLink(whatsappEnquiryMessage()),
      action: "Start a chat",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}?subject=${encodeURIComponent("Kashmir trip enquiry")}`,
      action: "Write to us",
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: `@${site.instagramHandle}`,
      href: site.instagramUrl,
      action: "Follow our journeys",
      external: true,
    },
  ];

  return (
    <>
      <PageHero
        image={img("srinagar-dal-sunset")}
        image2={img("srinagar-houseboats")}
        imageLabel="Tangmarg · Kashmir"
        eyebrow="Contact Freestyle Tour & Travels"
        title="Your Kashmir Story Starts With a Conversation."
        highlight="Starts With a Conversation."
        description="Call, WhatsApp or send us your travel details. Our Tangmarg team will get back to you with a personalised plan."
        crumbs={[{ name: "Contact Us", path: "/contact-us" }]}
      />

      <section className="py-14 md:py-20" aria-label="Contact details and enquiry form">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          {/* Channels */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex rounded-full bg-[#e7f0f8] px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy">Get in touch</span>
              <h2 className="mt-4 text-[clamp(1.75rem,2.9vw,2.45rem)] font-bold leading-tight text-navy">We&apos;d love to hear about your trip</h2>
              <p className="mt-3 leading-relaxed text-muted">
                The quickest way to reach us is a call or WhatsApp message. Prefer writing? Fill in the form and we&apos;ll reply
                with ideas and a quote.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map((c) => (
                <RevealItem key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-stone/60 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(23,27,34,0.45)]"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-white transition-colors group-hover:bg-coral">
                      <c.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-muted">{c.label}</span>
                      <span className="mt-0.5 block break-words font-semibold text-navy">{c.value}</span>
                      <span className="mt-0.5 block text-xs text-coral">{c.action}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-navy/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" aria-hidden="true" />
                  </a>
                </RevealItem>
              ))}
              <RevealItem>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-stone/60">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-white">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-muted">Location</span>
                    <address className="mt-1 not-italic font-semibold text-navy">{site.address.full}</address>
                  </span>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_30px_70px_-40px_rgba(22,37,61,0.5)] ring-1 ring-stone/50 sm:p-9">
              <span className="inline-flex rounded-full bg-coral/10 px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-coral-deep">Enquiry form</span>
              <h2 className="mt-3 text-2xl font-bold text-navy md:text-3xl">Tell us about your trip</h2>
              <p className="mb-8 mt-3 text-muted">It takes less than a minute. No payment, no obligation.</p>
              <EnquiryForm variant="contact" submitLabel="Send My Enquiry" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white pt-14 md:pt-20" aria-labelledby="find-us">
        <div className="container-luxe">
        <div className="grid overflow-hidden rounded-[1.75rem] bg-ivory ring-1 ring-stone/60 lg:grid-cols-12">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-4">
            <span className="self-start rounded-full bg-[#e7f0f8] px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy">Find us</span>
            <h2 id="find-us" className="mt-4 text-2xl font-bold leading-tight text-navy md:text-3xl">
              Tangmarg, the gateway to Gulmarg
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              {site.name} is based in Tangmarg, Kashmir, on the road between Srinagar and Gulmarg. We plan trips across the whole
              Kashmir Valley.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 font-semibold text-navy">Business</dt>
                <dd className="text-muted">{site.name}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 font-semibold text-navy">Address</dt>
                <dd className="text-muted">{site.address.full}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 font-semibold text-navy">Phone</dt>
                <dd>
                  <a href={site.phoneHref} className="text-muted hover:text-coral">
                    {site.phone}
                  </a>
                </dd>
              </div>
            </dl>
            <a href={site.mapsLinkUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark mt-8 self-start">
              Open in Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="relative min-h-[340px] bg-sand lg:col-span-8 lg:min-h-[460px]">
            <iframe
              title={`Map showing ${site.address.full}`}
              src={site.mapsEmbedUrl}
              className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
        </div>
      </section>

      <FinalCta
        title="Ready when you are."
        description="Whether it's snow in Gulmarg or sunsets on Dal Lake, we're one message away."
        image="sonamarg-03"
      />
    </>
  );
}
