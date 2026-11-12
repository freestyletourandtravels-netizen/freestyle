import { img, images } from "@/data/images";
import { galleryItems } from "@/data/gallery";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kashmir Photo Gallery | Freestyle Tour & Travels",
  description:
    "Browse photos of Kashmir: Dal Lake houseboats in Srinagar, the Gulmarg Gondola and snow, Pahalgam valleys, Sonamarg, Doodhpathri and Gurez Valley.",
  path: "/gallery",
  image: img("srinagar-floating-market").src,
  absoluteTitle: true,
});

export default function GalleryPage() {
  const credited = Object.values(images).filter((i) => i.credit);
  const imageGallery = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Kashmir Photo Gallery",
    url: absoluteUrl("/gallery"),
    image: galleryItems.slice(0, 12).map((g) => {
      const p = img(g.image);
      return {
        "@type": "ImageObject",
        contentUrl: absoluteUrl(p.src),
        description: p.alt,
        ...(p.credit ? { creditText: p.credit.artist, license: p.credit.licenseUrl ?? undefined, acquireLicensePage: p.credit.source } : {}),
      };
    }),
  };

  return (
    <>
      <PageHero
        image={img("sonamarg-paradise")}
        image2={img("shikara-dal")}
        imageLabel="Sonamarg"
        eyebrow="Photo Gallery"
        title="Kashmir in Pictures"
        highlight="in Pictures"
        description="Lakes, meadows, glaciers and snowfields. Explore the landscapes waiting for you on your Kashmir holiday."
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
      />

      <section className="py-12 md:py-16" aria-label="Photo gallery">
        <div className="container-luxe">
          <GalleryGrid />
        </div>
      </section>

      <section id="photo-credits" className="scroll-mt-28 border-t border-stone/70 bg-white py-14" aria-labelledby="credits-title">
        <div className="container-luxe">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h2 id="credits-title" className="font-serif text-2xl text-navy">
                Photo credits
              </h2>
              <span className="text-sm font-semibold text-coral group-open:hidden">Show</span>
              <span className="hidden text-sm font-semibold text-coral group-open:inline">Hide</span>
            </summary>
            <p className="mt-4 max-w-3xl text-sm text-muted">
              Photographs are sourced from Wikimedia Commons and used under their Creative Commons licences. Thank you to the
              photographers who share Kashmir&apos;s beauty with the world.
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-2 text-xs text-muted sm:grid-cols-2 lg:grid-cols-3">
              {credited.map((i) => (
                <li key={i.key}>
                  <a href={i.credit!.source} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-navy">
                    {i.alt.split(",")[0]}
                  </a>{" "}
                  — {i.credit!.artist},{" "}
                  {i.credit!.licenseUrl ? (
                    <a href={i.credit!.licenseUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline hover:text-navy">
                      {i.credit!.license}
                    </a>
                  ) : (
                    i.credit!.license
                  )}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <FinalCta
        title="See it with your own eyes."
        description="Photos only tell half the story. Let us plan the Kashmir journey that tells the rest."
        image="gulmarg-snowfall"
      />
      <JsonLd data={imageGallery} />
    </>
  );
}
