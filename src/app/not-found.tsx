import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { img } from "@/data/images";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  const p = img("gulmarg-snowfall");
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-deep text-white">
      <Image src={p.src} alt="" fill sizes="100vw" className="object-cover opacity-40" priority />
      <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/60 to-navy-deep/40" />
      <div className="container-luxe relative py-40">
        <p className="eyebrow text-coral">Error 404</p>
        <h1 className="display-lg mt-6 max-w-3xl">This trail is covered in snow.</h1>
        <p className="mt-6 max-w-lg text-lg text-white/75">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on the road.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-coral">
            Back to Home
          </Link>
          <Link href="/kashmir-tour-packages" className="btn btn-ghost-light">
            Kashmir Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
