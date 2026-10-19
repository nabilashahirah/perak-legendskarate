"use client";

import { useEffect, useState } from "react";
import { bookTrialLink } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Appears once the visitor scrolls past the first screen, so it never covers the hero CTAs. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={bookTrialLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-300 ease-out hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] motion-safe:animate-[pulse-ring_2.8s_ease-out_infinite]"
      />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
