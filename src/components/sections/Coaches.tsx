"use client";

import Image from "next/image";
import { useState } from "react";
import { coaches } from "@/content/site";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Mobile: horizontal snap-scroll strip of same-width cards (square photo + names).
 * Desktop: solo portraits share row 1, duo photos row 2; each card is photo + names/credentials.
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
        aria-label="Coaching team"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-6 sm:px-6 md:container-x md:mt-14 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:pb-0"
      >
        {items.map((c, i) => {
          const isDuo = c.people.length > 1;
          const names = c.people.map((p) => p.name).join(" & ");
          return (
            <li
              key={c.id}
              className={`card-frame flex w-[78vw] max-w-[320px] shrink-0 snap-start flex-col overflow-hidden md:w-auto md:max-w-none ${
                isDuo ? "md:col-span-3" : "md:col-span-2"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className={`group relative block w-full cursor-zoom-in overflow-hidden bg-ink-800 ${
                  isDuo ? "aspect-square md:aspect-[16/10]" : "aspect-square md:aspect-[4/5]"
                }`}
                aria-label={`View poster: ${names}`}
              >
                <Image
                  src={c.portrait.src}
                  alt={c.portrait.alt}
                  width={c.portrait.width}
                  height={c.portrait.height}
                  sizes={isDuo ? "(min-width: 768px) 600px, 320px" : "(min-width: 768px) 400px, 320px"}
                  className="photo-grade absolute inset-0 size-full object-cover object-top saturate-[0.55] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] group-hover:saturate-[0.85]"
                />
                <span aria-hidden="true" className="absolute inset-0 hidden bg-[#3a2606]/35 mix-blend-color md:block" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 font-display text-lg tracking-[0.12em] text-gold-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>

              <div className={`flex-1 border-t border-hairline p-5 sm:p-6 ${isDuo ? "grid gap-5 md:grid-cols-2 md:gap-6" : ""}`}>
                {c.people.map((p) => (
                  <div key={p.name}>
                    <h3 className="display text-[1.55rem] leading-[0.95] text-cream sm:text-[1.75rem]">{p.name}</h3>
                    <ul className="mt-3 space-y-1.5 text-sm leading-snug text-cream/80">
                      {p.credentials.map((cr) => (
                        <li key={cr} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-gold" />
                          <span>{cr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      <Lightbox
        label="Coaching team"
        items={items.map((c) => ({
          ...c.poster,
          eyebrow: "Perak Legends coaching team",
          title: c.people.map((p) => p.name).join(" & "),
        }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </section>
  );
}
