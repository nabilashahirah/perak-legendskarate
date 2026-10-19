import { ArrowUpRight, MapPin } from "lucide-react";
import { isTodo } from "@/content/site";
import type { Centre } from "@/types/content";
import { centreTrialLink, mapEmbedUrl, mapSearchUrl } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { MapEmbed } from "./MapEmbed";

export function CentreCard({ centre, index }: { centre: Centre; index: number }) {
  // The first card is above the fold on load: render it immediately so it isn't held back as the LCP element
  const Wrapper = index === 0 ? StaticArticle : Reveal;
  const addressPending = isTodo(centre.address);
  const scheduleId = `schedule-${centre.id}`;

  return (
    <Wrapper as="article" className="card-frame group relative overflow-hidden" y={24}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[var(--gold-gradient)] opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="grid lg:grid-cols-12">
        <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gold-gradient font-display text-2xl tracking-[0.06em]">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
            {centre.isHQ && (
              <span className="inline-flex items-center rounded-full border border-gold/70 bg-gold/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold-light">
                Headquarters
              </span>
            )}
          </div>

          <h2 className="display mt-4 text-[clamp(2.5rem,6vw,4rem)] text-cream">{centre.name}</h2>
          <p className="mt-1 flex items-center gap-2 text-muted">
            <MapPin aria-hidden="true" className="size-4 text-gold" />
            {centre.area}
          </p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-[8rem_1fr]">
            <dt className="eyebrow pt-0.5 text-muted">Address</dt>
            <dd className={addressPending ? "italic text-muted" : "text-cream"}>
              {addressPending ? "Full address coming soon" : centre.address}
            </dd>
            <dt id={scheduleId} className="eyebrow pt-0.5 text-muted">
              Schedule
            </dt>
            <dd>
              <table aria-labelledby={scheduleId} className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-hairline text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                    <th scope="col" className="pb-2 pr-3 font-semibold">Day</th>
                    <th scope="col" className="pb-2 pr-3 font-semibold">Time</th>
                    <th scope="col" className="pb-2 font-semibold">Class</th>
                  </tr>
                </thead>
                <tbody>
                  {centre.schedule.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className={`py-2.5 pr-3 ${isTodoText(row.day) ? "italic text-muted" : "text-cream"}`}>{row.day}</td>
                      <td className={`py-2.5 pr-3 ${isTodoText(row.time) ? "italic text-muted" : "text-cream"}`}>{row.time}</td>
                      <td className="py-2.5 text-cream/85">{row.group}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </dd>
          </dl>

          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <ButtonLink href={centreTrialLink(centre.name)} external>
              <WhatsAppIcon className="size-4" />
              Book at {centre.name}
            </ButtonLink>
            <ButtonLink href={centre.mapUrl ?? mapSearchUrl(centre.mapQuery)} external variant="outline">
              Open in Maps
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </div>

        <div className="relative min-h-[260px] border-t border-hairline bg-ink-800 sm:min-h-[320px] lg:col-span-5 lg:border-l lg:border-t-0">
          <MapEmbed title={`Map of the ${centre.name} area`} src={mapEmbedUrl(centre.mapQuery)} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(232,168,40,0.15),inset_0_0_60px_rgba(0,0,0,0.6)]" />
          {addressPending && (
            <p className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-hairline bg-ink-950/85 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted backdrop-blur">
              Approximate area
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

function StaticArticle({ className, children }: { as?: string; y?: number; className?: string; children: React.ReactNode }) {
  return <article className={className}>{children}</article>;
}

const isTodoText = (v: string) => /to be confirmed/i.test(v) || v.startsWith("TODO");
