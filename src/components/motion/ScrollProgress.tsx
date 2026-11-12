"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin coral reading-progress bar along the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-coral"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
