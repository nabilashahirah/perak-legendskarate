import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { REVEAL_SCRIPT } from "@/components/ui/Reveal";
import { centres, contact, site } from "@/content/site";
import "./globals.css";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.shortName} Karate Academy`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${site.name} crest` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: site.fullName,
  alternateName: [site.shortName, site.altName],
  sport: "Karate",
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}/images/brand/logo.png`,
  image: `${site.url}/og-image.jpg`,
  telephone: contact.phoneE164,
  foundingDate: "2021-04",
  founder: { "@type": "Person", name: "Dr Wugindran Raja Saravanan", honorificSuffix: "MBBS" },
  areaServed: { "@type": "State", name: "Perak" },
  sameAs: [contact.instagram, contact.tiktok],
  location: centres.map((c) => ({
    "@type": "Place",
    name: `${site.shortName} ${c.name}${c.isHQ ? " (HQ)" : ""}`,
    ...(c.mapUrl && { hasMap: c.mapUrl }),
    address: { "@type": "PostalAddress", addressLocality: c.area, addressRegion: "Perak", addressCountry: "MY" },
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-MY" className={`${bebas.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
      </head>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only z-[90] rounded bg-yellow px-4 py-3 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
