import { ArrowRight } from "lucide-react";
import { hero, site } from "@/content/site";
import { bookTrialLink } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ParallaxCrest } from "./ParallaxCrest";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-[calc(var(--header-h)+2rem)] lg:pb-16">
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_75%_35%,#1d1508_0%,#0a0a0a_60%)]" />
        <div className="glow right-[-10%] top-[5%] size-[70vmax] opacity-70" />
        <div className="glow -left-1/4 bottom-[-30%] size-[50vmax] opacity-40" />
        {/* Title-fight poster lines + outline word (desktop only: on phones they run through the centred text) */}
        <div className="absolute inset-y-0 left-[8%] hidden w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent lg:block" />
        <div className="absolute inset-y-0 right-[38%] hidden w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent lg:block" />
        <p className="display pointer-events-none absolute -bottom-[0.18em] left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap lg:block text-[28vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(232,168,40,0.07)]">
          Legends
        </p>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="mx-auto w-[min(62vw,280px)] sm:w-[340px] lg:order-2 lg:col-span-5 lg:w-full lg:max-w-[520px]">
          <ParallaxCrest />
        </div>

        <div className="text-center lg:order-1 lg:col-span-7 lg:text-left">
          <p className="anim-rise mx-auto flex max-w-[46ch] items-start justify-center gap-3 text-[0.68rem] lg:mx-0 lg:justify-start font-medium uppercase leading-relaxed tracking-[0.2em] text-muted sm:text-xs">
            <span aria-hidden="true" className="mt-[0.45em] hidden size-1.5 shrink-0 rotate-45 bg-gold lg:inline-block" />
            <span className="max-w-[46ch]">{site.affiliation}</span>
          </p>

          <h1 id="hero-title" className="display mt-6 text-cream">
            <span className="anim-rise block text-[clamp(1.6rem,4vw,2.6rem)] tracking-[0.12em] text-cream/90 [animation-delay:80ms]">
              {hero.kicker}
            </span>
            <span className="anim-rise h-display-xl mt-1 block [animation-delay:140ms]">Perak</span>
            <span className="anim-rise h-display-xl text-gold-gradient block [animation-delay:200ms]">Legends</span>
          </h1>

          <p className="anim-rise mx-auto mt-6 max-w-md text-lg leading-relaxed lg:mx-0 text-cream/85 [animation-delay:280ms] sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="anim-rise mt-7 flex items-center justify-center gap-4 [animation-delay:340ms] lg:justify-start">
            <span aria-hidden="true" className="h-px w-8 bg-gold sm:w-10" />
            <p className="display text-2xl tracking-[0.08em] text-gold-light sm:text-3xl">{site.tagline}</p>
            <span aria-hidden="true" className="h-px w-8 bg-gold sm:w-10 lg:hidden" />
          </div>

          <div className="anim-rise mx-auto mt-9 flex max-w-md flex-col gap-3 [animation-delay:400ms] xs:flex-row xs:justify-center lg:mx-0 lg:max-w-none lg:justify-start">
            <ButtonLink href={bookTrialLink} external size="lg">
              <WhatsAppIcon className="size-4" />
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="/centres" variant="outline" size="lg">
              {hero.secondaryCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted transition-colors hover:text-gold-light lg:flex"
      >
        Scroll
        <span aria-hidden="true" className="relative h-12 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-0 bg-gold motion-safe:animate-[scroll-cue_2.2s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}
