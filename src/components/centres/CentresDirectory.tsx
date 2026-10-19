import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { centres, isTodo } from "@/content/site";
import type { Centre } from "@/types/content";
import { centreTrialLink, mapEmbedUrl, mapSearchUrl, whatsappLink } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { MapEmbed } from "./MapEmbed";

/** HQ as a featured card with map; every other centre as a simple list item. */
export function CentresDirectory() {
  const hq = centres.find((c) => c.isHQ) ?? centres[0];
  const others = centres.filter((c) => c !== hq);

  return (
    <div>
      {/* HQ (rendered without a reveal: it's above the fold and the LCP element) */}
      <article id={hq.id} aria-labelledby={`${hq.id}-title`} className="card-frame relative grid scroll-mt-[calc(var(--header-h)+1rem)] overflow-hidden lg:grid-cols-12">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px bg-[var(--gold-gradient)] opacity-80" />
        <div className="p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <span className="inline-flex items-center rounded-full border border-gold/70 bg-gold/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold-light">
            Headquarters
          </span>
          <h2 id={`${hq.id}-title`} className="display mt-4 text-[clamp(3rem,7vw,4.5rem)] text-cream">
            {hq.name}
          </h2>
          <CentreFacts centre={hq} />
          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap lg:flex-col lg:items-start xl:flex-row">
            <ButtonLink href={centreTrialLink(hq.name)} external>
              <WhatsAppIcon className="size-4" />
              Book at {hq.name}
            </ButtonLink>
            {(hq.mapUrl || hq.mapQuery) && (
              <ButtonLink href={hq.mapUrl ?? mapSearchUrl(hq.mapQuery!)} external variant="outline">
                Open in Google Maps
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </ButtonLink>
            )}
          </div>
        </div>

        {hq.mapQuery && (
          <div className="relative min-h-[280px] border-t border-hairline bg-ink-800 sm:min-h-[360px] lg:col-span-7 lg:border-l lg:border-t-0">
            <MapEmbed title={`Map of Perak Legends ${hq.name} headquarters`} src={mapEmbedUrl(hq.mapQuery)} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(232,168,40,0.15),inset_0_0_60px_rgba(0,0,0,0.6)]" />
          </div>
        )}
      </article>

      {/* Other centres */}
      <h2 className="eyebrow mt-14 flex items-center gap-3 sm:mt-16">
        <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
        Our other centres
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {others.map((c, i) => (
          <Reveal
            as="li"
            key={c.id}
            delay={i * 0.05}
            className="card-frame flex scroll-mt-[calc(var(--header-h)+1rem)] items-center justify-between gap-4 p-5 sm:p-6"
          >
            <div id={c.id} className="min-w-0">
              <p className="flex items-baseline gap-3">
                <span className="font-display text-lg tracking-[0.06em] text-gold/80">{String(i + 2).padStart(2, "0")}</span>
                <span className="display text-[2rem] leading-none text-cream sm:text-4xl">{c.name}</span>
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-gold" />
                {!isTodo(c.address) ? c.address : c.area}
              </p>
              {c.schedule.length > 0 && <Schedule centre={c} compact />}
            </div>
            {/* Phones: round icon button; larger screens: labelled button */}
            <a
              href={centreTrialLink(c.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book a trial at ${c.name} on WhatsApp`}
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold-light transition-colors hover:bg-gold hover:text-ink-950 md:hidden"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <div className="hidden shrink-0 md:block">
              <ButtonLink href={centreTrialLink(c.name)} external variant="outline" size="sm">
                <WhatsAppIcon className="size-4" /> Book at {c.name}
              </ButtonLink>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-4 rounded-[6px] border border-dashed border-hairline p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-cream/85">
          <span className="font-semibold text-cream">Not sure which centre?</span>{" "}
          <span className="text-muted">Tell us where you live and the student&apos;s age, and we&apos;ll suggest the nearest class.</span>
        </p>
        <ButtonLink href={whatsappLink()} external variant="ghost" size="sm" className="shrink-0 self-start px-0 sm:self-center">
          <WhatsAppIcon className="size-4 text-gold" /> Ask on WhatsApp
        </ButtonLink>
      </div>
    </div>
  );
}

function CentreFacts({ centre }: { centre: Centre }) {
  const hasAddress = !isTodo(centre.address);
  return (
    <>
      <ul className="mt-5 space-y-3 text-cream/85">
        <li className="flex gap-3">
          <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
          <span>{hasAddress ? centre.address : centre.area}</span>
        </li>
        {centre.schedule.length === 0 && (
          <li className="flex gap-3">
            <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
            <span>Message us on WhatsApp for current class times.</span>
          </li>
        )}
      </ul>
      {centre.schedule.length > 0 && <Schedule centre={centre} />}
    </>
  );
}

function Schedule({ centre, compact }: { centre: Centre; compact?: boolean }) {
  return (
    <table className={`w-full text-left text-sm ${compact ? "mt-4" : "mt-6"}`}>
      <caption className="eyebrow mb-2 text-left text-[0.65rem] text-muted">Class schedule</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Time</th>
          <th scope="col">Class</th>
        </tr>
      </thead>
      <tbody>
        {centre.schedule.map((row, i) => (
          <tr key={i} className="border-b border-white/5 last:border-0">
            <td className="py-2 pr-3 text-cream">{row.day}</td>
            <td className="py-2 pr-3 text-cream">{row.time}</td>
            <td className="py-2 text-cream/80">{row.group}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
