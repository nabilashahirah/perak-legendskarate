import { Plus } from "lucide-react";
import { faq } from "@/content/site";
import { whatsappLink } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  if (faq.items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative overflow-hidden border-t border-hairline bg-ink-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="container-x relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" index="07" eyebrow={faq.eyebrow} title={faq.title} />
            <Reveal delay={0.05} className="mt-8 hidden lg:block">
              <p className="text-muted">Still have a question?</p>
              <ButtonLink href={whatsappLink()} external variant="outline" className="mt-4">
                <WhatsAppIcon className="size-4" /> Ask us on WhatsApp
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.05} className="lg:col-span-8">
          <div className="border-t border-hairline">
            {faq.items.map((f) => (
              <details key={f.question} className="group border-b border-hairline">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-cream transition-colors hover:text-gold-light sm:text-xl [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline text-gold transition-[transform,border-color] duration-300 group-open:rotate-45 group-open:border-gold"
                  >
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-12 text-cream/80">{f.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 lg:hidden">
            <ButtonLink href={whatsappLink()} external variant="outline">
              <WhatsAppIcon className="size-4" /> Ask us on WhatsApp
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
