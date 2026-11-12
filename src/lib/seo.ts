import type { Metadata } from "next";
import { site } from "@/data/site";
import type { TourPackage } from "@/data/packages";
import { img } from "@/data/images";

export const absoluteUrl = (path = "/") => `${site.url}${path === "/" ? "" : path}`;

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const image = opts.image ?? site.ogImage;
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      url: opts.path,
      title: opts.title,
      description: opts.description,
      images: [{ url: image, width: 1920, height: 1280, alt: `${site.name} — Kashmir` }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

const businessId = `${site.url}/#travel-agency`;

export function travelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": businessId,
        name: site.name,
        slogan: site.tagline,
        description: site.description,
        url: site.url,
        telephone: site.phone.replace(/\s/g, ""),
        email: site.email,
        image: absoluteUrl(site.ogImage),
        ...(site.logo.src ? { logo: absoluteUrl(site.logo.src) } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.regionSchema,
          addressCountry: site.address.countryCode,
        },
        areaServed: [
          { "@type": "Place", name: "Kashmir" },
          ...["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Doodhpathri", "Gurez Valley"].map((name) => ({
            "@type": "Place",
            name,
          })),
        ],
        sameAs: [site.instagramUrl],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone.replace(/\s/g, ""),
          email: site.email,
          contactType: "reservations",
          availableLanguage: ["English", "Hindi", "Urdu", "Kashmiri"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": businessId },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function touristTripSchema(p: TourPackage) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${p.name} — ${p.durationLabel} Kashmir Tour Package`,
    description: p.summary,
    url: absoluteUrl(`/kashmir-tour-packages/${p.slug}`),
    image: absoluteUrl(img(p.image).src),
    touristType: p.idealFor,
    provider: { "@id": businessId },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: p.itinerary.length,
      itemListElement: p.itinerary.map((d) => ({
        "@type": "ListItem",
        position: d.day,
        item: { "@type": "TouristAttraction", name: `Day ${d.day}: ${d.title}`, description: d.description },
      })),
    },
  };
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
