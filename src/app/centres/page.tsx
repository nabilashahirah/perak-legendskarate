import type { Metadata } from "next";
import { centres, centresPage, contact, site } from "@/content/site";
import { bookTrialLink, whatsappLink } from "@/lib/links";
import { CentreLocator } from "@/components/centres/CentreLocator";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const description = `${site.name} centres in ${centres.map((c) => c.name).join(", ")}. Book a trial class on WhatsApp ${contact.whatsappDisplay}.`;

export const metadata: Metadata = {
  title: "Centres & Contact",
  description,
  alternates: { canonical: "/centres" },
  openGraph: { title: `Centres & Contact | ${site.name}`, description, url: "/centres" },
  twitter: { title: `Centres & Contact | ${site.name}`, description },
};

export default function CentresPage() {
  return (
    <>
      {/* Page hero */}
      <section aria-labelledby="centres-title" className="relative overflow-hidden pb-10 pt-[calc(var(--header-h)+3.5rem)] sm:pb-14 sm:pt-[calc(var(--header-h)+5rem)]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_80%_0%,#22180a_0%,#0a0a0a_60%)]" />
        <div aria-hidden="true" className="glow -right-32 -top-32 size-[40rem] opacity-60" />
        <div className="container-x relative">
          <p className="eyebrow anim-rise flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
            {centresPage.eyebrow}
          </p>
          <h1 id="centres-title" className="display h-display-xl anim-rise mt-5 text-cream [animation-delay:80ms]">
            Our <span className="text-gold-gradient">Centres</span>
          </h1>
          <p className="anim-rise mt-6 max-w-xl text-lg text-cream/85 [animation-delay:160ms]">{centresPage.intro}</p>
        </div>
      </section>

      <section aria-label="Centre finder" className="pb-20 sm:pb-28">
        <div className="container-x">
          <CentreLocator />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-hairline bg-ink-900">
        <div aria-hidden="true" className="glow -left-40 top-0 size-[36rem] opacity-50" />
        <div className="container-x section-y relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title" className="display h-display-lg mt-5 text-cream">
              Talk to <span className="text-gold-gradient">the team</span>
            </h2>
            <p className="mt-5 max-w-md text-muted">
              The fastest way to reach us is WhatsApp. Follow the journey on Instagram and TikTok.
            </p>
            <ButtonLink href={bookTrialLink} external size="lg" className="mt-9">
              <WhatsAppIcon className="size-4" /> Book a Trial
            </ButtonLink>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 xl:grid-cols-1">
            {[
              { label: "WhatsApp", value: contact.whatsappDisplay, href: whatsappLink(), Icon: WhatsAppIcon },
              { label: "Instagram", value: contact.instagramHandle, href: contact.instagram, Icon: InstagramIcon },
              { label: "TikTok", value: contact.tiktokHandle, href: contact.tiktok, Icon: TikTokIcon },
            ].map(({ label, value, href, Icon }, i) => (
              <Reveal as="li" key={label} delay={i * 0.06}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center gap-5 rounded-[6px] border border-hairline bg-ink-950 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/70 sm:flex-col sm:items-start lg:flex-row lg:items-center lg:p-6"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-light transition-colors group-hover:bg-gold group-hover:text-ink-950">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block text-muted">{label}</span>
                    <span className="display mt-1 block truncate text-2xl text-cream sm:text-3xl">{value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
