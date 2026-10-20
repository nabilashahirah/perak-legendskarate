"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { students } from "@/content/site";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Masonry photo gallery (no cropping). Shows `initialCount` photos, then "View all". */
export function Students() {
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const items = students.items;
  const visible = expanded ? items : items.slice(0, students.initialCount);
  const hiddenCount = items.length - visible.length;

  return (
    <section id="students" aria-labelledby="students-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="glow -left-40 top-1/4 size-[36rem] opacity-50" />
      <div className="container-x relative">
        <SectionHeading id="students-title" index="05" eyebrow={students.eyebrow} title={students.title} intro={students.intro} />

        <ul className="mt-12 columns-2 gap-3 sm:gap-4 md:columns-3 lg:mt-14 lg:columns-4">
          {visible.map((s, i) => (
            <li key={s.image.src} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[6px] border border-hairline bg-ink-800 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/70"
                aria-label={`View photo: ${s.image.alt}`}
              >
                <Image
                  src={s.image.thumb}
                  alt={s.image.alt}
                  width={600}
                  height={Math.round((600 / s.image.width) * s.image.height)}
                  sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw"
                  className="photo-grade h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </button>
            </li>
          ))}
        </ul>

        {hiddenCount > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex min-h-12 items-center gap-2 rounded-[4px] border border-gold/70 px-6 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-light transition-colors hover:bg-gold/10 hover:text-cream"
            >
              View all {items.length} photos
              <ChevronDown aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}
      </div>

      <Lightbox
        label="Student gallery"
        items={visible.map((s) => ({ ...s.image, eyebrow: "Perak Legends students", title: s.event }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </section>
  );
}
