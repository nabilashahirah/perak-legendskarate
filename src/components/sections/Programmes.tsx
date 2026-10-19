"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { useState } from "react";
import { programmes } from "@/content/site";
import { bookTrialLink } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Programmes() {
  const [open, setOpen] = useState<number | null>(null);
  const { chart, beltRow } = programmes;

  return (
    <section id="programmes" aria-labelledby="programmes-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="glow left-1/2 top-1/4 size-[44rem] -translate-x-1/2 opacity-40" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading id="programmes-title" index="03" eyebrow={programmes.eyebrow} title={programmes.title} intro={programmes.body} />

          <Reveal delay={0.06} className="mt-10 overflow-hidden rounded-[6px] border border-hairline">
            <Image
              src={beltRow.thumb!}
              alt={beltRow.alt}
              width={600}
              height={Math.round((600 / beltRow.width) * beltRow.height)}
              sizes="(min-width: 1024px) 560px, 92vw"
              className="h-auto w-full"
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <ButtonLink href={bookTrialLink} external size="lg">
              <WhatsAppIcon className="size-4" />
              {programmes.cta}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="lg:col-span-6">
          <button
            type="button"
            onClick={() => setOpen(0)}
            className="group relative block w-full cursor-zoom-in rounded-[6px] border border-hairline bg-ink-900 p-3 text-left transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold/70 sm:p-4"
            aria-label="Open the full belt progression chart"
          >
            <span aria-hidden="true" className="absolute -inset-px rounded-[6px] bg-[var(--gold-gradient)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-10" />
            <span className="relative block aspect-[4/5] overflow-hidden rounded-[4px]">
              <Image
                src={chart.thumb!}
                alt={chart.alt}
                width={600}
                height={Math.round((600 / chart.width) * chart.height)}
                sizes="(min-width: 1024px) 560px, 92vw"
                className="absolute inset-0 size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900 via-ink-900/70 to-transparent" />
            </span>
            <span className="absolute bottom-6 right-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/60 bg-ink-950/85 px-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-light backdrop-blur sm:bottom-8 sm:right-8">
              <ZoomIn className="size-4" /> Tap to zoom
            </span>
          </button>
        </Reveal>
      </div>

      {/* Classes by age: hidden until programmes.groups is filled in (site.ts) */}
      {programmes.groups.length > 0 && (
        <div className="container-x relative mt-16 lg:mt-24">
          <h3 className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
            {programmes.groupsTitle}
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programmes.groups.map((g, i) => (
              <Reveal as="li" key={g.name} delay={i * 0.06} className="card-frame relative flex flex-col p-6 sm:p-7">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[var(--gold-gradient)] opacity-60" />
                <p className="eyebrow text-[0.68rem]">{g.ages}</p>
                <h4 className="display mt-2 text-3xl text-cream">{g.name}</h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/80">{g.description}</p>
                {g.details && g.details.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {g.details.map((d) => (
                      <li key={d} className="rounded-full border border-hairline px-3 py-1 text-xs text-cream/85">
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      )}

      <Lightbox
        label="Belt progression chart"
        items={[{ ...chart, eyebrow: programmes.eyebrow, title: "Belt progression" }]}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </section>
  );
}
