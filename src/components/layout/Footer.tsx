import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { packages } from "@/data/packages";
import { destinations } from "@/data/destinations";
import { Logo } from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden bg-navy-deep text-white">
      <div className="container-luxe relative pt-20 md:pt-28">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" size="lg" />
            <p className="mt-6 max-w-sm leading-relaxed text-white/65">
              A Kashmir-based travel agency in Tangmarg creating personalised holidays across Srinagar, Gulmarg, Pahalgam,
              Sonamarg, Doodhpathri and Gurez Valley.
            </p>
            <p className="mt-8 font-serif text-3xl italic text-coral">{site.tagline}</p>
            <div className="mt-6 flex gap-3" aria-label="Follow us">
              {[
                { href: site.instagramUrl, label: "Instagram", Icon: InstagramIcon },
                { href: site.facebookUrl, label: "Facebook", Icon: FacebookIcon },
                { href: whatsappLink(whatsappEnquiryMessage()), label: "WhatsApp", Icon: WhatsAppIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${label}`}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-coral hover:ring-coral"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="eyebrow text-white/45">Explore</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-white/80 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-white/45">Kashmir Packages</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {packages.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/kashmir-tour-packages/${p.slug}`} className="link-underline text-white/80 hover:text-white">
                      {p.name} <span className="text-white/45">· {p.nights}N/{p.days}D</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-white/45">Contact</h2>
              <ul className="mt-5 space-y-4 text-[0.95rem] text-white/80">
                <li>
                  <a href={site.phoneHref} className="flex items-start gap-3 hover:text-white">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden="true" /> {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink(whatsappEnquiryMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 hover:text-white"
                  >
                    <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-coral" /> WhatsApp us
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-start gap-3 hover:text-white">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
                    <span className="min-w-0">
                      {site.email.split("@")[0]}
                      <wbr />@{site.email.split("@")[1]}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 hover:text-white"
                  >
                    <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <span className="min-w-0">
                      @
                      {site.instagramHandle.split("_").map((part, i, all) => (
                        <span key={i}>
                          {part}
                          {i < all.length - 1 && (
                            <>
                              _<wbr />
                            </>
                          )}
                        </span>
                      ))}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white">
                    <FacebookIcon className="mt-0.5 h-4 w-4 shrink-0 text-coral" /> Facebook
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
                  <address className="not-italic">{site.address.full}</address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 py-8">
          <p className="eyebrow text-white/45">Popular destinations</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link href={`/gallery#${d.slug}`} className="link-underline hover:text-white">
                  {d.name} tour
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-2 pb-24 pt-8 text-center md:pb-10">
          <p className="text-[0.95rem] text-white/75 md:text-base">
            Prepared by{" "}
            <a
              href="https://deenxconsultancy.com/"
              target="_blank"
              rel="noopener"
              className="font-bold text-white underline decoration-coral decoration-2 underline-offset-4 transition-colors hover:text-coral"
            >
              Deenx Consultancy
            </a>
          </p>
          <p className="text-xs text-white/45">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
