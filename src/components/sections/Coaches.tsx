"use client";

import Image from "next/image";
import { useState } from "react";
import { coaches } from "@/content/site";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Mobile: horizontal snap-scroll strip; every card the same square size (solo and duo photos alike).
 * Desktop: mosaic. Solo portraits share one row, duo shots the next, so every row is flush
 * (a column masonry with only 5 mixed-ratio images leaves ragged holes).
 */
export function Coaches() {
  const [open, setOpen] = useState<number | null>(null);
  const items = coaches.items;

  return (
    <section id="coaches" aria-labelledby="coaches-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="glow -right-40 bottom-0 size-[36rem] opacity-50" />
      <div className="container-x relative">
        <SectionHeading id="coaches-title" index="05" eyebrow={coaches.eyebrow} title={coaches.title} intro={coaches.intro} />
      </div>

      <ul
        aria-label="Coaching team gallery"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-6 sm:px-6 md:container-x md:mt-14 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:pb-0"
      >
        {items.map((c, i) => {
          const isDuo = c.portrait.width > c.portrait.height;
          return (
            <li
              key={c.id}
              className={`w-[70vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none ${isDuo ? "md:col-span-3" : "md:col-span-2"}`}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-[6px] border border-hairline bg-ink-800 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-gold/70 ${
                  isDuo ? "aspect-square md:aspect-[16/10]" : "aspect-square md:aspect-[4/5]"
                }`}
                aria-label={`View poster: ${c.portrait.alt}`}
              >
                <Image
                  src={c.portrait.src}
                  alt={c.portrait.alt}
                  width={c.portrait.width}
                  height={c.portrait.height}
                  sizes={isDuo ? "(min-width: 768px) 600px, 280px" : "(min-width: 768px) 400px, 280px"}
                  className="photo-grade absolute inset-0 size-full object-cover object-top saturate-[0.55] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] group-hover:saturate-[0.85]"
                />
                <span aria-hidden="true" className="absolute inset-0 hidden bg-[#3a2606]/35 mix-blend-color md:block" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-ink-950/20" />
                <span className="absolute bottom-3 left-4 font-display text-lg tracking-[0.12em] text-gold-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Lightbox
        label="Coaching team"
        items={items.map((c) => ({ ...c.poster, eyebrow: "Perak Legends coaching team", title: "4th Malaysia Day Karate Championship" }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </section>
  );
}
