import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { centres, isTodo } from "@/content/site";
import type { Centre } from "@/types/content";
import { centreEnquiryLink, centreTrialLink, mapEmbedUrl, mapSearchUrl, whatsappLink } from "@/lib/links";
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
      <article id={hq.id} aria-labelledby={`${hq.id}-title`} className="card-frame relative grid scroll-mt-[calc(var(--header-h)+1rem)] grid-cols-1 overflow-hidden lg:grid-cols-12">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px bg-[var(--gold-gradient)] opacity-80" />
        <div className="min-w-0 p-6 sm:p-8 lg:col-span-5 lg:p-10">
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

      {/* Other centres: names only, exact location shared on WhatsApp */}
      <div className="mt-14 flex flex-col gap-2 sm:mt-16 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
          More centres
        </h2>
        <p className="text-sm text-muted">Exact locations and class times are shared on WhatsApp.</p>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {others.map((c, i) => (
          <Reveal
            as="li"
            key={c.id}
            delay={(i % 4) * 0.05}
            className="card-frame group/centre relative flex items-center justify-between gap-4 p-5 transition-colors hover:border-gold/50 sm:flex-col sm:items-start sm:justify-between sm:p-6"
          >
            <div id={c.id} className="min-w-0 scroll-mt-[calc(var(--header-h)+1rem)]">
              <span className="font-display text-lg tracking-[0.06em] text-gold/80">{String(i + 2).padStart(2, "0")}</span>
              <p className="display mt-1 text-[1.9rem] leading-[0.95] text-cream sm:text-[2.1rem]">{c.name}</p>
              {!isTodo(c.address) && (
                <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                  <MapPin aria-hidden="true" className="size-4 shrink-0 text-gold" />
                  {c.address}
                </p>
              )}
              {c.schedule.length > 0 && <Schedule centre={c} compact />}
            </div>
            <a
              href={centreEnquiryLink(c.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask on WhatsApp for the ${c.name} centre's location and class times`}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-gold/60 px-3 text-gold-light transition-colors hover:bg-gold hover:text-ink-950 sm:mt-5 sm:px-4"
            >
              <WhatsAppIcon className="size-5 sm:size-4" />
              <span className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:inline">Ask location</span>
            </a>
          </Reveal>
        ))}

        {/* Helper fills the last cell (7 centres + 1 = a full 4-column grid) */}
        <Reveal as="li" delay={0.15} className="flex flex-col justify-between gap-4 rounded-[6px] border border-dashed border-gold/30 p-5 sm:p-6">
          <div>
            <p className="display text-[1.9rem] leading-[0.95] text-cream sm:text-[2.1rem]">Not sure which centre?</p>
            <p className="mt-2 text-sm text-muted">Tell us where you live and the student&apos;s age, and we&apos;ll suggest the nearest class.</p>
          </div>
          <ButtonLink href={whatsappLink()} external size="sm" className="self-start">
            <WhatsAppIcon className="size-4" /> Ask us
          </ButtonLink>
        </Reveal>
      </ul>
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
