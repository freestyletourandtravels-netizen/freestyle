"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BookImage, ChevronRight, Home, Info, Mail, MapPin, Mountain, Phone, type LucideIcon } from "lucide-react";
import clsx from "clsx";
import { navLinks, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

const ease = [0.22, 1, 0.36, 1] as const;

const menuIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/kashmir-tour-packages": Mountain,
  "/about-us": Info,
  "/gallery": BookImage,
  "/contact-us": Phone,
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change; lock scroll while open.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const solid = scrolled && !menuOpen;
  /** The home page hero is light, so the transparent navbar uses dark text there. */
  /** Pages whose hero is light, so the transparent navbar needs dark text. */
  // Every page now has a light hero, and the mobile menu is light too.
  const lightHero = true;
  const onLight = true;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={clsx(
          "relative z-10 animate-drop-in transition-[background-color,box-shadow,backdrop-filter] duration-500",
          solid
            ? "bg-ivory/92 shadow-[0_8px_30px_-18px_rgba(22,37,61,0.45)] backdrop-blur-md"
            : onLight
              ? "bg-white/80 shadow-[0_6px_24px_-18px_rgba(22,37,61,0.35)] backdrop-blur-md"
              : "bg-transparent",
        )}
      >
        {!onLight && (
          <div className="pointer-events-none absolute inset-0 -z-10 h-40 bg-linear-to-b from-navy-deep/60 to-transparent" aria-hidden="true" />
        )}
        {!onLight && (
          <div className="hidden border-b border-white/15 lg:block">
            <div className="container-luxe flex h-10 items-center justify-between text-[0.72rem] font-medium tracking-[0.06em] text-white/80">
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-coral" aria-hidden="true" /> {site.address.locality}, Kashmir
                <span className="mx-3 h-3 w-px bg-white/25" aria-hidden="true" />
                <span className="font-serif text-[0.95rem] italic tracking-normal text-[#f6b8b0]">{site.tagline}</span>
              </p>
              <div className="flex items-center gap-6">
                <a href={site.phoneHref} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-3.5 w-3.5 text-coral" aria-hidden="true" /> {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-3.5 w-3.5 text-coral" aria-hidden="true" /> {site.email}
                </a>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                  <InstagramIcon className="h-3.5 w-3.5 text-coral" /> @{site.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        )}
        <nav
          className={clsx("container-luxe flex items-center justify-between transition-[height] duration-500", solid ? "h-[72px]" : "h-[88px]")}
          aria-label="Main navigation"
        >
          <Link href="/" aria-label={`${site.name} — home`} className="relative z-10 shrink-0">
            <Logo tone={onLight ? "dark" : "light"} size={solid ? "sm" : "md"} priority />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={clsx(
                    "relative px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                    onLight ? "text-navy hover:text-coral" : "text-white/90 hover:text-white",
                  )}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <motion.span layoutId="nav-active" className="absolute inset-x-4 -bottom-0.5 h-px bg-coral" transition={{ duration: 0.5, ease }} />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href={site.phoneHref}
              className={clsx(
                "hidden items-center gap-2 px-3 text-sm font-semibold xl:flex",
                onLight ? "text-navy hover:text-coral" : "text-white hover:text-white/80",
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone}
            </a>
            <EnquiryButton variant={lightHero ? "navy" : "coral"} className="hidden !min-h-[2.75rem] !px-5 sm:inline-flex">
              Plan Your Trip
            </EnquiryButton>
            <button
              type="button"
              className={clsx(
                "grid h-12 w-12 place-items-center rounded-full transition-colors lg:hidden",
                "text-navy",
              )}
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3.5 w-6" aria-hidden="true">
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-6 bg-current"
                  animate={menuOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease }}
                />
                <motion.span
                  className="absolute bottom-0 right-0 h-[1.5px] bg-current"
                  animate={menuOpen ? { y: -6.5, rotate: -45, width: 24 } : { y: 0, rotate: 0, width: 16 }}
                  transition={{ duration: 0.4, ease }}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-0 flex flex-col overflow-y-auto bg-linear-to-b from-[#eef4fa] to-ivory px-5 pb-8 pt-24 lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease }}
          >
            <motion.ul
              className="flex flex-col gap-2"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {navLinks.map((l) => {
                const Icon = menuIcons[l.href] ?? Home;
                const active = isActive(l.href);
                return (
                  <motion.li key={l.href} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } } }}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={clsx(
                        "flex min-h-14 items-center gap-4 rounded-2xl px-4 transition-colors",
                        active ? "bg-navy text-white shadow-[0_12px_24px_-14px_rgba(36,59,96,0.8)]" : "bg-white text-navy ring-1 ring-stone/60 active:bg-[#e7f0f8]",
                      )}
                    >
                      <span className={clsx("grid h-9 w-9 place-items-center rounded-full", active ? "bg-white/15" : "bg-[#e7f0f8]")}>
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="flex-1 text-[1.02rem] font-semibold">{l.label}</span>
                      <ChevronRight className={clsx("h-5 w-5", active ? "text-white/70" : "text-navy/30")} aria-hidden="true" />
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div className="mt-6 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.25 } }}>
              <EnquiryButton variant="coral" className="w-full">
                Plan Your Trip
              </EnquiryButton>
              <div className="grid grid-cols-2 gap-3">
                <a href={site.phoneHref} className="btn btn-ghost-dark bg-white">
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call
                </a>
                <a href={whatsappLink(whatsappEnquiryMessage())} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              className="mt-auto space-y-2.5 rounded-2xl bg-white p-4 text-sm text-ink/80 ring-1 ring-stone/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.35 } }}
            >
              <a href={site.phoneHref} className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-coral" aria-hidden="true" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-coral" aria-hidden="true" /> <span className="truncate">{site.email}</span>
              </a>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <InstagramIcon className="h-4 w-4 text-coral" /> @{site.instagramHandle}
              </a>
              <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <FacebookIcon className="h-4 w-4 text-coral" /> Facebook
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-coral" aria-hidden="true" /> {site.address.locality}, Kashmir
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
