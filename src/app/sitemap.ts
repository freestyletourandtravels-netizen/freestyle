import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { packages } from "@/data/packages";
import { img } from "@/data/images";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (p: string) => `${site.url}${p}`;
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1, images: [abs(site.ogImage)] },
    { url: abs("/kashmir-tour-packages"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: abs("/about-us"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/gallery"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/contact-us"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];
  const packagePages: MetadataRoute.Sitemap = packages.map((p) => ({
    url: abs(`/kashmir-tour-packages/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [abs(img(p.image).src)],
  }));
  return [...pages, ...packagePages];
}
