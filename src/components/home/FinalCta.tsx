import Image from "next/image";
import { img, type ImageKey } from "@/data/images";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

/** Rounded call-to-action banner used at the end of inner pages. */
export function FinalCta({
  title = "Let Kashmir Become Your Next Beautiful Memory.",
  description = "Tell us how you dream of seeing the valley. We will take care of everything else.",
  image = "gulmarg-snowfall",
}: {
  title?: string;
  description?: string;
  image?: ImageKey;
}) {
  const p = img(image);
  return (
    <section className="bg-white py-16 md:py-20" aria-labelledby="cta-title">
      <div className="container-luxe">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy-deep text-white">
          <Image src={p.src} alt="" fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-navy-deep via-navy-deep/80 to-navy-deep/20" aria-hidden="true" />
          <div className="relative flex flex-col gap-6 p-8 sm:p-12 md:flex-row md:items-center md:justify-between lg:p-14">
            <div className="max-w-xl">
              <h2 id="cta-title" className="text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-tight">
                {title}
              </h2>
              <p className="mt-3 text-white/75">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <EnquiryButton>Plan Your Journey</EnquiryButton>
              <a href={whatsappLink(whatsappEnquiryMessage())} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                <WhatsAppIcon className="h-4 w-4" /> Chat With Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
