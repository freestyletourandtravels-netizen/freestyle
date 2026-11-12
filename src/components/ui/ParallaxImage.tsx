"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { SiteImage } from "@/data/images";

/**
 * Full-bleed background image that drifts slowly as the page scrolls.
 * The load-in zoom is CSS, so the image paints straight from server HTML.
 */
export function ParallaxImage({
  image,
  priority,
  strength = 18,
  sizes = "100vw",
  className,
}: {
  image: SiteImage;
  priority?: boolean;
  strength?: number;
  sizes?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${strength}%`]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <motion.div className="absolute inset-x-0 -top-[4%] h-[112%] will-change-transform" style={reduce ? undefined : { y }}>
        <div className="absolute inset-0 animate-hero-zoom">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes={sizes}
            quality={75}
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
