import { about } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="glow -left-40 top-1/3 size-[36rem] opacity-60" />
      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id="about-title" index="01" eyebrow={about.eyebrow} title={about.title} />
            <Reveal delay={0.05}>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-cream sm:text-2xl">{about.intro}</p>
              <p className="mt-5 max-w-xl text-muted">{about.body}</p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-24">
            <Reveal delay={0.08} className="card-frame relative overflow-hidden p-7 sm:p-9">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[var(--gold-gradient)]" />
              <p className="eyebrow">{about.mission.label}</p>
              <p className="display text-gold-gradient mt-3 text-[clamp(2.75rem,6vw,4.25rem)]">{about.mission.value}</p>
            </Reveal>
            <Reveal delay={0.14} className="card-frame p-7 sm:p-9">
              <p className="eyebrow">{about.objective.label}</p>
              <p className="mt-3 text-lg leading-relaxed text-cream/90">{about.objective.value}</p>
            </Reveal>
          </div>
        </div>

        <dl className="mt-16 grid border-y border-hairline sm:grid-cols-3 lg:mt-24">
          {about.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.07}
              className={`flex flex-col-reverse gap-2 px-2 py-8 sm:px-8 sm:py-10 ${
                i > 0 ? "border-t border-hairline sm:border-l sm:border-t-0" : ""
              }`}
            >
              <dt className="text-sm uppercase tracking-[0.16em] text-muted">{s.label}</dt>
              <dd className="display text-[clamp(3.25rem,7vw,5.5rem)] text-cream">
                {s.prefix && <span className="text-gold">{s.prefix}</span>}
                {s.value !== undefined ? (
                  <span className="tabular-nums">{s.value}</span>
                ) : (
                  <span className="text-gold-gradient">{s.text}</span>
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
