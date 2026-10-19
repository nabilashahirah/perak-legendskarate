import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div aria-hidden="true" className="glow left-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <p
        aria-hidden="true"
        className="display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[48vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(232,168,40,0.12)] sm:text-[34vw]"
      >
        404
      </p>
      <div className="container-x relative text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="display h-display-lg mt-5 text-cream">
          Out of <span className="text-gold-gradient">bounds</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          This page stepped off the mat. Let&apos;s get you back to the action.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 xs:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/centres" variant="outline" size="lg">
            Our centres <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
