/**
 * ALL website content lives here: text, achievements, centres, links and image paths.
 * Edit this file to update the site; no component changes needed.
 *
 * Search for "TODO" to find information that is still missing.
 * Images live in /public/images (regenerate with `npm run images`, see scripts/process-images.mjs).
 */
import type {
  Centre,
  Coach,
  FounderAchievement,
  FounderCount,
  HallOfFameItem,
  NavItem,
  SiteImage,
} from "@/types/content";

/* ------------------------------------------------------------------ */
/* Brand & links                                                      */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Perak Legends Karate Academy",
  shortName: "Perak Legends",
  altName: "Perak United",
  fullName: "Perak Legends Karate Academy (Perak United)",
  tagline: "The Biggest in Perak",
  affiliation: "Affiliated to Kelab Karate Ipoh under Pesuruhjaya Sukan Malaysia (KBS)",
  description:
    "Perak Legends Karate Academy (Perak United): competitive karate in Perak, founded by Asian Karate Champion Dr Wugindran Raja Saravanan. Centres in Buntong, Tasek, Batu Gajah, Kampar and Botani.",
  // TODO: replace with the real domain once it is connected in Cloudflare Pages
  url: "https://perak-legends.pages.dev",
  established: "April 2021",
  locale: "en_MY",
} as const;

export const contact = {
  whatsappDisplay: "010-828 2417",
  phoneE164: "+60108282417",
  whatsappNumber: "60108282417",
  instagram: "https://www.instagram.com/perakunited",
  instagramHandle: "@perakunited",
  tiktok: "https://www.tiktok.com/@perakkarate",
  tiktokHandle: "@perakkarate",
} as const;

/** Pre-filled WhatsApp message for "Book a Trial" */
export const trialMessage =
  "Hi Perak Legends! I'd like to book a trial class.\nName:\nAge:\nPreferred centre:\nPreferred day:";

/** Pre-filled WhatsApp message for a specific centre ({centre} is replaced with the centre name) */
export const centreTrialMessage =
  "Hi Perak Legends! I'd like to book a trial class at the {centre} centre.\nName:\nAge:\nPreferred day:";

export const brandImages = {
  logo: { src: "/images/brand/logo-alpha.webp", width: 800, height: 800, alt: "Perak Legends Karate Academy crest" },
  badge: { src: "/images/brand/logo-badge-128.webp", width: 128, height: 128, alt: "Perak Legends" },
} satisfies Record<string, SiteImage>;

/* ------------------------------------------------------------------ */
/* Navigation                                                         */
/* ------------------------------------------------------------------ */

export const nav: NavItem[] = [
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Founder", href: "/#founder", sectionId: "founder" },
  { label: "Programmes", href: "/#programmes", sectionId: "programmes" },
  { label: "Hall of Fame", href: "/#hall-of-fame", sectionId: "hall-of-fame" },
  { label: "Coaches", href: "/#coaches", sectionId: "coaches" },
  { label: "Centres", href: "/centres" },
];

/* ------------------------------------------------------------------ */
/* Home                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  kicker: "Welcome to",
  title: "Perak Legends",
  subtitle: "You are about to witness the journey towards greatness",
  primaryCta: "Book a Trial",
  secondaryCta: "Our Centres",
};

export const marquee: string[] = [
  "Asian Gold 2011",
  "SUKMA Champion 2014",
  "6x National Champion",
  "Top 3 Nationwide 2026",
  "Asian Bronze 2010",
  "National Champion 2026",
  "14x National Medallist",
  "Southeast Asia Bronze",
  "World Championship Quarter-Finalist 2011",
];

export const about = {
  eyebrow: "About",
  title: "Built in Buntong. Built for the podium.",
  intro:
    "Perak Legends Karate Academy was established in April 2021 at Desa Rishah, Buntong.",
  body: "Our objective is simple: to grow karate bigger in our state and compete towards international standards.",
  mission: { label: "Mission & Vision", value: "Biggest in Perak" },
  objective: {
    label: "Objective",
    value: "To grow karate bigger in our state and compete towards international standards.",
  },
  stats: [
    { value: 2021, prefix: "Est. ", label: "Founded at Desa Rishah, Buntong" },
    { value: 5, label: "Centres across Perak" },
    { text: "Biggest", label: "in Perak: our mission" },
  ] as { value?: number; prefix?: string; text?: string; label: string }[],
};

export const founder = {
  eyebrow: "Founder",
  name: "Dr Wugindran Raja Saravanan",
  credentials: "MBBS",
  role: "Founder & Head Coach",
  image: {
    src: "/images/founder/dr-wugindran.webp",
    thumb: "/images/founder/dr-wugindran-sm.webp",
    width: 1149,
    height: 1280,
    alt: "Portrait of Dr Wugindran Raja Saravanan, founder of Perak Legends Karate Academy, in a black suit with arms crossed",
  } satisfies SiteImage,
  highlights: [
    "First ever Asian Karate Champion (AKF) as a medical practitioner",
    "First ever medical doctor national karate medallist while actively working as a Medical Officer serving Hospital Raja Permaisuri Bainun (2023)",
    "Graduated from MSU Shah Alam in 2020",
    "Active medical practitioner in Ipoh, Perak",
  ],
  timeline: [
    { year: "2010", title: "Asian Bronze Medallist", detail: "AKF · Hong Kong" },
    { year: "2011", title: "Asian Gold Medallist", detail: "AKF · China" },
    { year: "2011", title: "World Championship Quarter-Finalist", detail: "Melaka, Malaysia" },
    { year: "2014", title: "SUKMA Champion", detail: "Perlis" },
    { year: "2020", title: "Graduated MBBS", detail: "MSU Shah Alam" },
    { year: "2023", title: "National Medallist as a serving Medical Officer", detail: "Hospital Raja Permaisuri Bainun" },
  ] satisfies FounderAchievement[],
  counts: [
    { value: "6x", label: "National Champion" },
    { value: "14x", label: "National Medallist" },
    { value: "1x", label: "National University Champion" },
    { value: "1st", label: "Asian Champion as a medical practitioner" },
  ] satisfies FounderCount[],
};

export const programmes = {
  eyebrow: "Programmes",
  title: "From white belt to black belt",
  body: "Every student follows a clear belt progression, from their first white belt all the way to black belt. Tap the chart to see the full progression.",
  chart: {
    src: "/images/programmes/belt-progression.webp",
    thumb: "/images/programmes/belt-progression-sm.webp",
    width: 853,
    height: 1280,
    alt: "Perak United Karate Academy belt progression chart, from white belt to black belt",
  } satisfies SiteImage,
  beltRow: {
    src: "/images/programmes/belt-row.webp",
    thumb: "/images/programmes/belt-row-sm.webp",
    width: 660,
    height: 270,
    alt: "Row of karate belts from white through yellow, orange, blue, red and brown to black",
  } satisfies SiteImage,
  cta: "Book a Trial",
};

const hof = (name: string, width: number, height: number, alt: string): SiteImage => ({
  src: `/images/hall-of-fame/${name}.webp`,
  thumb: `/images/hall-of-fame/${name}-sm.webp`,
  width,
  height,
  alt,
});

export const hallOfFame = {
  eyebrow: "Hall of Fame",
  title: "Hall of Fame 2026",
  intro: "A year written in gold. Tap any card to view it in full.",
  // Order matters: the grid tiles in 2-row bands of [2x2 + two talls] or [four talls].
  items: [
    {
      id: "hall-of-fame-2026",
      eyebrow: "Hall of Fame",
      title: "Perak Legends 2026",
      size: "feature",
      image: hof("hall-of-fame-2026", 592, 1066, "Perak Legends Hall of Fame 2026 poster listing the academy's national medallists"),
    },
    {
      id: "samson-1",
      eyebrow: "National Champion 2026",
      title: "Samson Kendrick",
      focus: "center",
      size: "tall",
      image: hof("samson-kendrick-1", 810, 1080, "Samson Kendrick on top of the podium at the National Karate Championship 2026"),
    },
    {
      id: "navin",
      eyebrow: "Southeast Asia Bronze Medallist",
      title: "Master Navinessan Vickneswaran",
      focus: "center",
      size: "tall",
      image: hof("navinessan-vickneswaran", 960, 1280, "Master Navinessan Vickneswaran holding his Southeast Asia bronze medal in the competition arena"),
    },
    {
      id: "overall-medal",
      eyebrow: "National Championship 2026",
      title: "Overall Medal",
      size: "tall",
      image: hof("overall-medal-national-2026", 960, 1280, "Poster celebrating Perak Legends' overall medal tally at the National Karate Championship 2026"),
    },
    {
      id: "top3-1",
      eyebrow: "2026",
      title: "Top 3 Nationwide out of 72 Teams",
      size: "tall",
      image: hof("top-3-nationwide-1", 960, 1280, "Poster announcing Perak Legends finishing Top 3 nationwide out of 72 teams"),
    },
    {
      id: "derren",
      eyebrow: "National University Silver Medallist 2026",
      title: "Derren Nagenthiran",
      focus: "center",
      size: "large",
      image: hof("derren-nagenthiran", 1280, 960, "Derren Nagenthiran on the podium with his silver medal at the national university games 2026"),
    },
    {
      id: "samson-2",
      eyebrow: "National Champion 2026",
      title: "Samson Kendrick",
      focus: "center",
      size: "large",
      image: hof("samson-kendrick-2", 1080, 810, "Samson Kendrick receiving his gold medal on the national championship podium"),
    },
    {
      id: "milo-1",
      eyebrow: "2026",
      title: "25th MILO Karate Championship",
      size: "tall",
      image: hof("milo-championship-2026-1", 853, 1280, "Perak Legends' young athletes with their medals at the 25th MILO Karate Championship 2026"),
    },
    {
      id: "malaysia-day",
      eyebrow: "2026",
      title: "4th Malaysia Day Karate Championship",
      size: "tall",
      image: hof("malaysia-day-championship-2026", 512, 1280, "4th Malaysia Day Karate Championship 2026 poster featuring Dr Wugindran Raja Saravanan"),
    },
    {
      id: "top3-2",
      eyebrow: "2026",
      title: "Top 3 Nationwide out of 72 Teams",
      size: "tall",
      image: hof("top-3-nationwide-2", 853, 1280, "Poster: Perak Legends 3rd over 72 teams, history made, Perak proud"),
    },
    {
      id: "milo-2",
      eyebrow: "2026",
      title: "25th MILO Karate Championship",
      size: "tall",
      image: hof("milo-championship-2026-2", 853, 1280, "Perak Legends team holding the Perak flag at the 25th MILO Karate Championship 2026"),
    },
    {
      // From the client's own poster; confirm wording with the client
      id: "no1",
      eyebrow: "Recognition",
      title: "No.1 Standalone Karate Club / Academy in Perak",
      size: "large",
      image: hof("no1-standalone-club-perak", 960, 1280, "Poster naming Perak Legends the No.1 standalone karate club and academy in Perak, featuring founder Dr Wugindran Raja Saravanan"),
    },
  ] satisfies HallOfFameItem[],
};

const coach = (n: number, w: number, h: number, alt: string): Coach => ({
  id: `coach-${n}`,
  portrait: { src: `/images/coaches/coach-${n}.webp`, width: w, height: h, alt },
  poster: {
    src: `/images/coaches/coach-${n}-poster.webp`,
    width: 512,
    height: 1280,
    alt: `${alt}, 4th Malaysia Day Karate Championship 2026 poster`,
  },
});

export const coaches = {
  eyebrow: "Coaches",
  title: "The team behind the legends",
  intro: "Champions coaching the next generation of champions.",
  items: [
    // Solo portraits first, then duo shots: the desktop mosaic fills row 1 with solos, row 2 with duos
    coach(1, 290, 325, "Dr Wugindran Raja Saravanan, founder and head coach"),
    coach(2, 300, 385, "Perak Legends coach in a black suit"),
    coach(5, 300, 330, "Perak Legends coach smiling in a black suit"),
    coach(3, 440, 280, "Two Perak Legends coaches holding their gold medals"),
    coach(4, 400, 295, "Two Perak Legends coaches in dark suits"),
  ],
};

export const finalCta = {
  title: "Ready to start your journey?",
  body: "Book a trial class at any of our five centres. Just send us a message on WhatsApp.",
  cta: "Book a Trial",
};

/* ------------------------------------------------------------------ */
/* Centres                                                            */
/* ------------------------------------------------------------------ */

const TODO_SCHEDULE = [
  // TODO: replace with the real class schedule
  { day: "To be confirmed", time: "To be confirmed", group: "All levels" },
];

export const centresPage = {
  eyebrow: "Locations & Contact",
  title: "Our Centres",
  intro: "Five centres across Perak, one standard of excellence. Find the one closest to you and book a trial on WhatsApp.",
};

export const centres: Centre[] = [
  {
    id: "buntong",
    name: "Buntong",
    isHQ: true,
    area: "Desa Rishah, Buntong, Ipoh",
    address: "TODO: full address",
    mapQuery: "Desa Rishah, Buntong, Ipoh, Perak",
    mapUrl: undefined, // TODO: Google Maps share link
    schedule: TODO_SCHEDULE,
  },
  {
    id: "tasek",
    name: "Tasek",
    area: "Tasek, Ipoh",
    address: "TODO: full address",
    mapQuery: "Tasek, Ipoh, Perak",
    mapUrl: undefined, // TODO
    schedule: TODO_SCHEDULE,
  },
  {
    id: "batu-gajah",
    name: "Batu Gajah",
    area: "Batu Gajah",
    address: "TODO: full address",
    mapQuery: "Batu Gajah, Perak",
    mapUrl: undefined, // TODO
    schedule: TODO_SCHEDULE,
  },
  {
    id: "kampar",
    name: "Kampar",
    area: "Kampar",
    address: "TODO: full address",
    mapQuery: "Kampar, Perak",
    mapUrl: undefined, // TODO
    schedule: TODO_SCHEDULE,
  },
  {
    id: "botani",
    name: "Botani",
    area: "Bandar Baru Botani, Ipoh",
    address: "TODO: full address",
    mapQuery: "Bandar Botani, Ipoh, Perak",
    mapUrl: undefined, // TODO
    schedule: TODO_SCHEDULE,
  },
];

/** True while a value is still a placeholder (used to style TODO text) */
export const isTodo = (value?: string) => !value || value.startsWith("TODO");
