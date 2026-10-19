"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Google Maps iframe that only loads when it's about to scroll into view.
 * Native loading="lazy" starts iframes ~1250px early, which pulls Maps' heavy JS into first load.
 */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {load ? (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.55)_brightness(0.92)_contrast(0.95)]"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-[radial-gradient(circle_at_50%_45%,rgb(232_168_40/0.08),transparent_60%)]">
          <MapPin aria-hidden="true" className="size-8 text-gold/40" />
        </div>
      )}
    </div>
  );
}
