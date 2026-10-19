"use client";

import Image from "next/image";
import { Images, Plus } from "lucide-react";
import { useState } from "react";
import { hallOfFame } from "@/content/site";
import type { MedalCount } from "@/types/content";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MEDALS: { key: keyof MedalCount; label: string; className: string }[] = [
  { key: "gold", label: "Gold", className: "bg-[linear-gradient(135deg,#ffe08a,#e8a828_55%,#a8680c)] text-ink-950" },
  { key: "silver", label: "Silver", className: "bg-[linear-gradient(135deg,#f4f5f7,#c3c8ce_55%,#8a9097)] text-ink-950" },
  { key: "bronze", label: "Bronze", className: "bg-[linear-gradient(135deg,#f0b27a,#c27c3e_55%,#7c4a1e)] text-ink-950" },
];

function MedalRow({ medals, size = "md" }: { medals: MedalCount; size?: "sm" | "md" }) {
  return (
    <ul className={`flex flex-wrap items-center gap-y-2 ${size === "sm" ? "gap-x-3.5" : "gap-x-5"}`}>
      {MEDALS.map((m) => (
        <li key={m.key} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`inline-flex items-center justify-center rounded-full font-display shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)] ${m.className} ${
              size === "sm" ? "size-7 text-base" : "size-9 text-xl"
            }`}
          >
            {medals[m.key]}
          </span>
          <span className={`text-[0.7rem] font-semibold uppercase text-muted ${size === "sm" ? "tracking-[0.12em]" : "tracking-[0.16em]"}`}>
            <span className="sr-only">{medals[m.key]} </span>
            {m.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function HallOfFame() {
  const [open, setOpen] = useState<number | null>(null);
  const { results, athletes, posters, sinceFounding } = hallOfFame;

  // One lightbox for every image in the section: athlete photos first, then posters
  const items: LightboxItem[] = [
    ...athletes.flatMap((a) => a.images.map((img) => ({ ...img, eyebrow: a.achievement, title: a.name }))),
    ...posters.map((p) => ({ ...p.image, eyebrow: p.eyebrow, title: p.title })),
  ];
  const athleteStart = athletes.map((_, i) => athletes.slice(0, i).reduce((n, a) => n + a.images.length, 0));
  const posterStart = athletes.reduce((n, a) => n + a.images.length, 0);

  return (
    <section id="hall-of-fame" aria-labelledby="hof-title" className="section-y relative overflow-hidden bg-ink-900">
      <div aria-hidden="true" className="glow -left-40 -top-20 size-[40rem] opacity-50" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading id="hof-title" index="04" eyebrow={hallOfFame.eyebrow} title={hallOfFame.title} intro={hallOfFame.intro} />
          <Reveal className="md:pb-2">
            <p className="eyebrow mb-3 text-muted">{sinceFounding.label}</p>
            <MedalRow medals={sinceFounding.medals} />
          </Reveal>
        </div>

      </div>

      {/* 1 — Scoreboard (swipe strip on phones) */}
      <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:container-x lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:pb-0">
          {results.map((r) => (
            <li key={r.id} className="card-frame relative flex w-[84vw] max-w-[360px] shrink-0 snap-start flex-col overflow-hidden p-6 sm:p-8 lg:w-auto lg:max-w-none">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[var(--gold-gradient)] opacity-70" />
              {r.detail && <p className="eyebrow text-[0.65rem] text-muted">{r.detail}</p>}
              <h3 className="display mt-2 text-[1.75rem] leading-none text-cream lg:min-h-[3.5rem]">{r.event}</h3>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="display text-gold-gradient text-[clamp(4rem,9vw,5.5rem)] leading-[0.8]">{r.headline}</span>
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-cream/85">{r.headlineLabel}</span>
              </p>
              {r.medals && (
                <div className="mt-6">
                  <MedalRow medals={r.medals} size="sm" />
                </div>
              )}
              {r.notes && (
                <ul className="mt-6 space-y-1.5 border-t border-hairline pt-5 text-sm text-cream/80">
                  {r.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>

      <div className="container-x relative">
        {/* 2 — Athletes (real photos) */}
        <h3 className="eyebrow mt-16 flex items-center gap-3 lg:mt-20">
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
          {hallOfFame.athletesTitle}
        </h3>
      </div>

      <ul className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:container-x lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:pb-0">
        {athletes.map((a, i) => {
          const cover = a.images[0];
          return (
            <li key={a.id} className="w-[72vw] max-w-[320px] shrink-0 snap-start lg:w-auto lg:max-w-none">
              <button
                type="button"
                onClick={() => setOpen(athleteStart[i])}
                className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-[6px] border border-hairline bg-ink-800 text-left transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_20px_40px_-20px_rgba(232,168,40,0.35)]"
                aria-label={`View photos of ${a.name}, ${a.achievement}`}
              >
                <Image
                  src={cover.thumb ?? cover.src}
                  alt={cover.alt}
                  width={600}
                  height={Math.round((600 / cover.width) * cover.height)}
                  sizes="(min-width: 1024px) 400px, 320px"
                  className="photo-grade absolute inset-0 size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                {a.images.length > 1 ? (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-ink-950/75 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-light backdrop-blur">
                    <Images aria-hidden="true" className="size-3.5" /> {a.images.length}
                  </span>
                ) : (
                  <span aria-hidden="true" className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full border border-gold/50 bg-ink-950/70 text-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Plus className="size-4" />
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="eyebrow block text-[0.65rem] leading-snug">{a.achievement}</span>
                  <span className="display mt-1.5 block text-[1.9rem] leading-[0.95] text-cream sm:text-4xl">{a.name}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* 3 — Poster archive: kept small; full posters open in the lightbox */}
      <div className="container-x relative">
        <h3 className="eyebrow mt-16 flex items-center gap-3 lg:mt-20">
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
          {hallOfFame.postersTitle}
        </h3>
      </div>
      <ul className="no-scrollbar mt-6 flex snap-x gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:container-x lg:grid lg:grid-cols-8 lg:gap-3 lg:overflow-visible lg:pb-0">
        {posters.map((p, i) => (
          <li key={p.id} className="w-[38vw] max-w-[180px] shrink-0 snap-start lg:w-auto lg:max-w-none">
            <button
              type="button"
              onClick={() => setOpen(posterStart + i)}
              className="group block w-full cursor-zoom-in text-left"
              aria-label={`View poster: ${p.title}`}
            >
              <span className="relative block aspect-[3/4] overflow-hidden rounded-[4px] border border-hairline bg-ink-800 transition-[border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-gold/70">
                <Image
                  src={p.image.thumb ?? p.image.src}
                  alt={p.image.alt}
                  width={600}
                  height={Math.round((600 / p.image.width) * p.image.height)}
                  sizes="(min-width: 1024px) 150px, 38vw"
                  className="absolute inset-0 size-full object-cover object-top opacity-80 transition-[opacity,transform] duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                />
              </span>
              <span className="mt-2.5 line-clamp-2 block text-xs leading-snug text-cream/75 transition-colors group-hover:text-gold-light">
                {p.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox label="Hall of Fame 2026" items={items} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </section>
  );
}
