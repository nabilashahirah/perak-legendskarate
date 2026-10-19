import Image from "next/image";
import Link from "next/link";
import { brandImages, centres, contact, nav, site } from "@/content/site";
import { whatsappLink } from "@/lib/links";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-ink-950 pb-24 pt-16 sm:pb-16">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <Image src={brandImages.badge.src} alt="" width={64} height={64} className="size-16" />
            <div>
              <p className="display text-3xl text-cream">Perak Legends</p>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold">{site.altName} Karate Academy</p>
            </div>
          </div>
          <p className="display text-gold-gradient mt-8 text-4xl">{site.tagline}</p>
          <p className="mt-3 max-w-sm text-sm text-muted">{site.affiliation}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-cream/85 transition-colors hover:text-gold-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-4">Get in touch</p>
          <ul className="space-y-1">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 text-cream/85 transition-colors hover:text-gold-light">
                <WhatsAppIcon className="size-4 text-gold" /> {contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 text-cream/85 transition-colors hover:text-gold-light">
                <InstagramIcon className="size-4 text-gold" /> {contact.instagramHandle}
              </a>
            </li>
            <li>
              <a href={contact.tiktok} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 text-cream/85 transition-colors hover:text-gold-light">
                <TikTokIcon className="size-4 text-gold" /> {contact.tiktokHandle}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm text-muted">
            Centres: {centres.map((c) => c.name).join(" · ")}
          </p>
        </div>
      </div>

      <div className="container-x mt-14">
        <div className="gold-rule" />
        <div className="mt-6 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <p>Est. {site.established} · Buntong, Ipoh, Perak</p>
        </div>
      </div>
    </footer>
  );
}
