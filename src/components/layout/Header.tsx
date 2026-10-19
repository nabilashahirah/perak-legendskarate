"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { brandImages, contact, nav, site } from "@/content/site";
import { bookTrialLink } from "@/lib/links";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in the middle of the viewport
  useEffect(() => {
    if (!isHome) return;
    const ids = nav.flatMap((n) => (n.sectionId ? [n.sectionId] : []));
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    const onTop = () => window.scrollY < window.innerHeight * 0.5 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [isHome]);

  // Mobile menu: lock scroll, Esc to close, focus first link, return focus to the toggle
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = menuButtonRef.current;
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [menuOpen]);

  const isActive = (sectionId?: string, href?: string) =>
    sectionId ? isHome && active === sectionId : href === pathname;

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid
            ? "border-b border-hairline bg-ink-950/95 md:bg-ink-950/75 md:backdrop-blur-xl md:backdrop-saturate-150"
            : "border-b border-transparent bg-gradient-to-b from-ink-950/70 to-transparent"
        }`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label={`${site.name}, home`} onClick={() => setMenuOpen(false)}>
            <Image src={brandImages.badge.src} alt="" width={44} height={44} className="size-9 shrink-0 sm:size-11" />
            {/* Wordmark hidden on very narrow phones; it truncates (never pushes the menu off-screen) with large system text */}
            <span className="hidden min-w-0 leading-none min-[370px]:block">
              <span className="display block truncate text-[1.25rem] tracking-[0.04em] text-cream sm:text-[1.5rem]">Perak Legends</span>
              <span className="mt-0.5 hidden truncate text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-gold sm:block">Karate Academy</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const on = isActive(item.sectionId, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={on ? (item.sectionId ? "location" : "page") : undefined}
                      className={`relative inline-flex min-h-11 items-center px-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-colors ${
                        on ? "text-gold-light" : "text-cream/80 hover:text-cream"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 bottom-2 h-px origin-left bg-gold transition-transform duration-300 ${
                          on ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={bookTrialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-[4px] bg-yellow px-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink-950 transition-colors hover:bg-yellow-hover sm:px-5 sm:text-[0.7rem] sm:tracking-[0.14em]"
            >
              Book a Trial
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-[4px] border border-hairline text-cream transition-colors hover:border-gold lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would make it the containing block for this fixed overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 flex flex-col overflow-y-auto bg-ink-950 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            <div aria-hidden="true" className="glow -right-32 top-10 size-96" />
            <nav aria-label="Mobile" className="container-x relative flex-1 pt-8">
              <ul className="divide-y divide-white/5">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.25, delay: reduce ? 0 : 0.04 * i, ease: "easeOut" }}
                  >
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex min-h-16 items-baseline gap-4 py-3"
                    >
                      <span className="font-display text-base text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`display text-[2.75rem] transition-colors ${
                          isActive(item.sectionId, item.href) ? "text-gold-light" : "text-cream group-hover:text-gold-light"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="container-x relative border-t border-hairline py-6">
              <p className="eyebrow mb-4 text-muted">Follow the journey</p>
              <div className="flex gap-3">
                <SocialChip href={`https://wa.me/${contact.whatsappNumber}`} label="WhatsApp">
                  <WhatsAppIcon />
                </SocialChip>
                <SocialChip href={contact.instagram} label="Instagram">
                  <InstagramIcon />
                </SocialChip>
                <SocialChip href={contact.tiktok} label="TikTok">
                  <TikTokIcon />
                </SocialChip>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SocialChip({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-12 items-center justify-center rounded-full border border-hairline text-cream transition-colors hover:border-gold hover:text-gold-light"
    >
      {children}
    </a>
  );
}
