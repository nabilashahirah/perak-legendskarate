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

/** Slow infinite ticker of achievements. Pauses on hover; static under reduced motion. */
export function Marquee() {
  return (
    <section aria-label="Achievements" className="relative border-y border-hairline bg-ink-900">
      <div className="group relative no-scrollbar flex overflow-hidden py-5 motion-reduce:overflow-x-auto [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
