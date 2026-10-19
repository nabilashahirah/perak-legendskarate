"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useState } from "react";
import { hallOfFame } from "@/content/site";
import type { HallOfFameItem } from "@/types/content";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const sizeClass: Record<HallOfFameItem["size"], string> = {
  feature: "col-span-2 row-span-2",
  large: "col-span-2 row-span-2",
  tall: "col-span-1 row-span-2",
};

export function HallOfFame() {
  const [open, setOpen] = useState<number | null>(null);
  const items = hallOfFame.items;

  return (
    <section id="hall-of-fame" aria-labelledby="hof-title" className="section-y relative overflow-hidden bg-ink-900">
      <div aria-hidden="true" className="glow -left-40 -top-20 size-[40rem] opacity-50" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="hof-title" index="04" eyebrow={hallOfFame.eyebrow} title={hallOfFame.title} />
          <Reveal className="max-w-sm text-muted [text-wrap:balance] md:pb-2 md:text-right">{hallOfFame.intro}</Reveal>
        </div>

        <ul className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 xs:auto-rows-[180px] sm:gap-4 md:auto-rows-[200px] lg:mt-16 lg:auto-rows-[210px] lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 4) * 0.05} className={sizeClass[item.size]}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block size-full cursor-zoom-in overflow-hidden rounded-[6px] border border-hairline bg-ink-800 text-left transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_20px_40px_-20px_rgba(232,168,40,0.35)]"
                aria-label={`View ${item.title} (${item.eyebrow})`}
              >
                <Image
                  src={item.image.thumb ?? item.image.src}
                  alt={item.image.alt}
                  width={600}
                  height={Math.round((600 / item.image.width) * item.image.height)}
                  sizes={item.size !== "tall" ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
                  className={`photo-grade absolute inset-0 size-full object-cover ${item.focus === "center" ? "object-center" : "object-top"} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />
                <span aria-hidden="true" className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full border border-gold/50 bg-ink-950/70 text-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Plus className="size-4" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <span className="eyebrow block text-[0.6rem] leading-snug sm:text-[0.68rem]">{item.eyebrow}</span>
                  <span
                    className={`display mt-1.5 block text-cream ${
                      item.size === "feature" ? "text-3xl sm:text-5xl" : item.size === "large" ? "text-2xl sm:text-4xl" : "text-xl leading-[0.95] sm:text-[1.7rem]"
                    }`}
                  >
                    {item.title}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Lightbox
        label="Hall of Fame 2026"
        items={items.map((it) => ({ ...it.image, eyebrow: it.eyebrow, title: it.title }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </section>
  );
}
