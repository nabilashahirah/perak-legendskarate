"use client";

import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { centres, isTodo } from "@/content/site";
import { centreTrialLink, mapEmbedUrl, mapSearchUrl, whatsappLink } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { MapEmbed } from "./MapEmbed";

const PANEL_ID = "centre-panel";

/**
 * Centre list + one map/detail panel (WAI-ARIA tabs).
 * Address and schedule rows appear automatically once they're filled in site.ts.
 * Deep links like /centres#kampar select that centre.
 */
export function CentreLocator() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const centre = centres[active];

  const select = useCallback((i: number, focus = false) => {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
    history.replaceState(null, "", `#${centres[i].id}`);
  }, []);

  // Sync with #hash (initial load + the jump links in the page hero)
  useEffect(() => {
    const fromHash = () => {
      const i = centres.findIndex((c) => `#${c.id}` === window.location.hash);
      if (i >= 0) setActive(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = centres.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? active === last ? 0 : active + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? active === 0 ? last : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  const addressPending = isTodo(centre.address);
  const hasSchedule = centre.schedule.length > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Centre list */}
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Centres" aria-orientation="vertical" className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {centres.map((c, i) => {
            const selected = i === active;
            return (
              <button
                key={c.id}
                id={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={PANEL_ID}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={onKeyDown}
                className={`group relative flex min-h-[4.5rem] scroll-mt-[calc(var(--header-h)+1rem)] items-center gap-4 overflow-hidden rounded-[6px] border px-4 py-3 text-left transition-[background-color,border-color] duration-200 sm:px-5 lg:min-h-[5.5rem] ${
                  c.isHQ ? "col-span-2 lg:col-span-1" : ""
                } ${selected ? "border-gold/70 bg-ink-800" : "border-hairline bg-ink-900 hover:border-gold/40 hover:bg-ink-800/60"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-[3px] bg-[var(--gold-gradient)] transition-opacity ${selected ? "opacity-100" : "opacity-0"}`}
                />
                <span className="font-display text-lg tracking-[0.06em] text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className={`display text-[1.6rem] leading-none sm:text-3xl ${selected ? "text-gold-light" : "text-cream"}`}>{c.name}</span>
                    {c.isHQ && (
                      <span className="rounded-full border border-gold/70 bg-gold/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold-light">
                        HQ
                      </span>
                    )}
                  </span>
                  <span className="mt-1 hidden truncate text-sm text-muted sm:block">{c.area}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 hidden rounded-[6px] border border-dashed border-hairline p-6 lg:block">
          <p className="display text-2xl text-cream">Not sure which centre?</p>
          <p className="mt-2 text-sm text-muted">Tell us where you live and the student&apos;s age, and we&apos;ll suggest the nearest class.</p>
          <ButtonLink href={whatsappLink()} external variant="outline" size="sm" className="mt-5">
            <WhatsAppIcon className="size-4" /> Ask on WhatsApp
          </ButtonLink>
        </div>
      </div>

      {/* Selected centre */}
      <div id={PANEL_ID} role="tabpanel" aria-labelledby={centre.id} className="card-frame overflow-hidden lg:col-span-7">
        <div className="relative aspect-[4/3] border-b border-hairline bg-ink-800 sm:aspect-[16/9]">
          <MapEmbed key={centre.id} title={`Map of the ${centre.name} area`} src={mapEmbedUrl(centre.mapQuery)} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(232,168,40,0.15),inset_0_0_60px_rgba(0,0,0,0.6)]" />
          {addressPending && (
            <p className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-hairline bg-ink-950/85 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted backdrop-blur">
              Approximate area
            </p>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <p className="eyebrow">{centre.isHQ ? "Headquarters" : `Centre ${String(active + 1).padStart(2, "0")}`}</p>
          <h2 className="display mt-2 text-[clamp(2.5rem,6vw,3.75rem)] text-cream">{centre.name}</h2>

          <ul className="mt-5 space-y-3 text-cream/85">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>
                {addressPending ? centre.area : centre.address}
                {addressPending && <span className="block text-sm text-muted">Full address coming soon</span>}
              </span>
            </li>
            {!hasSchedule && (
              <li className="flex gap-3">
                <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
                <span>Message us on WhatsApp for current class times.</span>
              </li>
            )}
          </ul>

          {hasSchedule && (
            <table className="mt-6 w-full text-left text-sm">
              <caption className="eyebrow mb-3 text-left text-muted">Class schedule</caption>
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
                    <td className="py-2.5 pr-3 text-cream">{row.day}</td>
                    <td className="py-2.5 pr-3 text-cream">{row.time}</td>
                    <td className="py-2.5 text-cream/85">{row.group}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
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
      </div>
    </div>
  );
}
