"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { marquee } from "@/content/site";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {marquee.map((item) => (
        <li key={item} className="flex items-center">
          <span className="display whitespace-nowrap px-6 text-[1.6rem] tracking-[0.06em] text-cream/90 sm:px-8 sm:text-[2rem]">
            {item}
          </span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 shrink-0 fill-gold">
            <path d="M12 2l2.9 6.9L22 9.6l-5.4 4.8L18.2 22 12 18.3 5.8 22l1.6-7.6L2 9.6l7.1-.7z" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

/**
 * Slow infinite ticker of achievements. Always moves (slower when the device asks for reduced motion);
 * pauses on hover (desktop) and with the pause button (all devices).
 */
export function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-label="Achievements" className="relative flex items-stretch border-y border-hairline bg-ink-900">
      <div className="group relative flex min-w-0 flex-1 overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div
          className={`marquee-track flex w-max animate-marquee group-hover:[animation-play-state:paused] ${
            paused ? "[animation-play-state:paused]" : ""
          }`}
        >
          <Row />
          <Row hidden />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play achievements ticker" : "Pause achievements ticker"}
        className="flex w-12 shrink-0 items-center justify-center border-l border-hairline text-muted transition-colors hover:text-gold-light sm:w-14"
      >
        {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
      </button>
    </section>
  );
}
