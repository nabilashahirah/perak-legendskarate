import { ArrowRight } from "lucide-react";
import { finalCta } from "@/content/site";
import { bookTrialLink } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-hairline">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_120%,#3a2606_0%,#0a0a0a_65%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[var(--gold-gradient)] opacity-60" />
      <div className="container-x relative py-20 sm:py-28 lg:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Your first class is waiting</p>
          <h2 id="cta-title" className="display h-display-lg mt-5 text-cream">
            Ready to start <span className="text-gold-gradient">your journey?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-cream/80">{finalCta.body}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 xs:flex-row">
            <ButtonLink href={bookTrialLink} external size="lg">
              <WhatsAppIcon className="size-4" />
              {finalCta.cta}
            </ButtonLink>
            <ButtonLink href="/centres" variant="outline" size="lg">
              Find a centre
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
