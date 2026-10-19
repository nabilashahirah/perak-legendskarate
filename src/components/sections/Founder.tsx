import Image from "next/image";
import { founder } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Founder() {
  return (
    <section id="founder" aria-labelledby="founder-title" className="section-y relative overflow-hidden bg-ink-900">
      <div aria-hidden="true" className="glow -right-48 top-0 size-[40rem] opacity-50" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Portrait with offset gold frame */}
        <Reveal className="pb-3 pr-3 sm:pb-5 sm:pr-5 lg:col-span-5">
          <div className="relative mx-auto max-w-[460px] lg:sticky lg:top-28">
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[6px] border border-gold/60 sm:translate-x-5 sm:translate-y-5" />
            <div className="relative overflow-hidden rounded-[6px] bg-[#f4f2ee]">
              <Image
                src={founder.image.src}
                alt={founder.image.alt}
                width={founder.image.width}
                height={founder.image.height}
                sizes="(min-width: 1024px) 460px, 90vw"
                className="photo-grade h-auto w-full"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-950/95 via-ink-950/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="eyebrow text-gold-light">{founder.role}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-gold-gradient font-display text-xl tracking-[0.08em]">02</span>
              <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
              <span>{founder.eyebrow}</span>
            </p>
            <h2 id="founder-title" className="display h-display-lg mt-5 text-cream">
              {founder.name.replace(/ Saravanan$/, "")}{" "}
              <span className="text-gold-gradient">Saravanan</span>
            </h2>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted">{founder.credentials}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <ul className="mt-8 space-y-3">
              {founder.highlights.map((h) => (
                <li key={h} className="flex gap-4 text-cream/90">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-gold" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Timeline */}
          <Reveal delay={0.05} className="mt-12">
            <h3 className="eyebrow text-muted">Career milestones</h3>
            <ol className="relative mt-6 border-l border-gold/30 pl-0">
              {founder.timeline.map((t, i) => (
                <li key={`${t.year}-${i}`} className="relative grid grid-cols-[4.5rem_1fr] gap-4 py-4 pl-6 sm:grid-cols-[6rem_1fr]">
                  <span aria-hidden="true" className="absolute -left-[5px] top-[1.55rem] size-[9px] rotate-45 border border-gold bg-ink-900" />
                  <span className="display text-gold-gradient text-3xl leading-none sm:text-4xl">{t.year}</span>
                  <span>
                    <span className="block font-semibold text-cream">{t.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{t.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Count badges */}
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4">
            {founder.counts.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.06} className="card-frame flex flex-col justify-between gap-3 p-5 sm:p-6">
                <span className="display text-gold-gradient text-5xl sm:text-6xl">{c.value}</span>
                <span className="text-sm leading-snug text-cream/85">{c.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
