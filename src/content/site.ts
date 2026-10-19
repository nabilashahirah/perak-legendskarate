/**
 * ALL website content lives here: text, achievements, centres, links and image paths.
 * Edit this file to update the site; no component changes needed.
 *
 * Search for "TODO" to find information that is still missing.
 * Images live in /public/images (regenerate with `npm run images`, see scripts/process-images.mjs).
 */
import type {
  Athlete,
  Centre,
  Coach,
  Faq,
  FounderAchievement,
  FounderCount,
  NavItem,
  Poster,
  ProgrammeGroup,
  ResultCard,
  SiteImage,
} from "@/types/content";

// TODO: add each centre's real class schedule. While a schedule is empty the page shows
// "Message us on WhatsApp for current class times" instead of a table.
// Example: [{ day: "Tuesday", time: "8:00pm – 9:30pm", group: "Kids (6–12)" }]
const TODO_SCHEDULE: Centre["schedule"] = [];

/* ------------------------------------------------------------------ */
/* Centres (kept at the top: counts and names elsewhere derive from it) */
/* ------------------------------------------------------------------ */

// The HQ is the only centre with an exact location on the site (map + address).
// Every other centre is listed by name only; visitors WhatsApp for the exact location.
export const centres: Centre[] = [
  {
    id: "buntong",
    name: "Buntong",
    isHQ: true,
    area: "Desa Rishah, Buntong, Ipoh",
    // From the academy's Google Maps listing (share link below)
    address: "No 105A (1st Floor), Persiaran Raja Perempuan Mazwin Selatan, Desa Rishah Indah, 30100 Ipoh, Perak",
    // Google listing name, so the embedded map pins the dojo itself
    mapQuery: "Perak United Karate Academy, Buntong, Ipoh",
    mapUrl: "https://share.google/dmp9n6YgwsdsQR0Zw",
    schedule: TODO_SCHEDULE,
  },
  { id: "tasek", name: "Tasek", area: "Tasek, Ipoh", schedule: TODO_SCHEDULE },
  { id: "kampar", name: "Kampar", area: "Kampar", schedule: TODO_SCHEDULE },
  { id: "batu-gajah", name: "Batu Gajah", area: "Batu Gajah", schedule: TODO_SCHEDULE },
  { id: "tanjung-rambutan", name: "Tanjung Rambutan", area: "Tanjung Rambutan", schedule: TODO_SCHEDULE },
  { id: "botani", name: "Botani", area: "Bandar Baru Botani, Ipoh", schedule: TODO_SCHEDULE },
  { id: "ipoh-town", name: "Ipoh Town", area: "Ipoh", schedule: TODO_SCHEDULE },
  { id: "seri-iskandar", name: "Seri Iskandar", area: "Seri Iskandar", schedule: TODO_SCHEDULE },
];

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
/** e.g. "eight" */
export const centreCountWord = NUMBER_WORDS[centres.length] ?? String(centres.length);
const listNames = (names: string[]) => `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
/** e.g. "Buntong, Tasek, … and Seri Iskandar" */
export const centreNameList = listNames(centres.map((c) => c.name));
const capitalise = (w: string) => w[0].toUpperCase() + w.slice(1);

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
    `Perak Legends Karate Academy (Perak United): competitive karate in Perak, founded by Asian Karate Champion Dr Wugindran Raja Saravanan. Centres in ${centreNameList}.`,
  // TODO: replace with the real domain once it is connected in Cloudflare Pages
  url: "https://peraklegendskarate.pages.dev",
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

/** Pre-filled WhatsApp message for centres without a listed location ({centre} is replaced with the centre name) */
export const centreEnquiryMessage =
  "Hi Perak Legends! I'm interested in the {centre} centre. Could you share the exact location and class times?\nName:\nAge:";

/** Pre-filled WhatsApp message for the HQ ({centre} is replaced with the centre name) */
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
  titleSuffix: "Karate Academy",
  subtitle: "You are about to witness the journey towards greatness",
  primaryCta: "Book a Trial",
  secondaryCta: "Our Centres",
};

// Academy results only; the founder's personal record lives in the Founder section
export const marquee: string[] = [
  "National Champion 2026",
  "Top 3 Nationwide out of 72 Teams",
  "Southeast Asia Bronze Medallist",
  "4 National Medals 2026",
  "National University Silver 2026",
  "25th MILO Karate Championship",
  `${centres.length} Centres Across Perak`,
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
    { value: centres.length, label: "Centres across Perak" },
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
    "MBBS, MSU Shah Alam (2020). Active medical practitioner in Ipoh, Perak",
  ],
  timeline: [
    { year: "2010", title: "Asian Bronze Medallist", detail: "AKF · Hong Kong" },
    { year: "2011", title: "Asian Gold Medallist", detail: "AKF · China" },
    { year: "2011", title: "World Championship Quarter-Finalist", detail: "Melaka, Malaysia" },
    { year: "2014", title: "SUKMA Champion", detail: "Perlis" },
  ] satisfies FounderAchievement[],
  counts: [
    { value: "6x", label: "National Champion" },
    { value: "14x", label: "National Medallist" },
    { value: "1x", label: "National University Champion" },
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
  groupsTitle: "Classes by age",
  /**
   * TODO: fill in from the client. The "Classes by age" cards stay hidden while this is empty.
   * Example:
   * { name: "Little Legends", ages: "Ages 5–7", description: "Fun fundamentals: balance, coordination and focus.", details: ["2x a week", "45 min"] },
   */
  groups: [] as ProgrammeGroup[],
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
  intro: "A year written in gold.",

  /**
   * Scoreboard. Figures are taken from the academy's own result posters
   * (source poster noted on each entry). Update here when new results come in.
   */
  results: [
    {
      // Source: OVERALLMEDALNATIONALCHAMPION 2026 poster
      id: "national-2026",
      event: "National Karate Championship 2026",
      detail: "34th MAKAF · Cadet, Junior & U21",
      headline: "4",
      headlineLabel: "National medals",
      medals: { gold: 1, silver: 2, bronze: 1 },
      notes: [
        "Gold · Samson Kendrick",
        "Silver · Derren Nagenthiran",
        "Silver (Team Kumite) · Hasvin Arun",
        "Bronze · Navinessan Vickneswaran",
      ],
    },
    {
      // Source: TOP3NSATIONALWIDE posters
      id: "top-3",
      event: "Top 3 Nationwide",
      detail: "Karate Club Championship 2026",
      headline: "3rd",
      headlineLabel: "out of 72 teams",
      medals: { gold: 9, silver: 5, bronze: 9 },
      notes: ["42 athletes · 23 medallists", "Highest ever finish by a Perak team"],
    },
    {
      // Source: 25THMILOKARATECHAMPIONSHIP2026 posters
      id: "milo-2026",
      event: "25th MILO Karate Championship",
      detail: "2026 · International Open",
      headline: "8th",
      headlineLabel: "out of 64 teams",
      medals: { gold: 6, silver: 1, bronze: 1 },
      notes: ["Clubs from 7+ countries"],
    },
  ] satisfies ResultCard[],
  /** Source: HallofFame poster ("Overall national medals since 2021") */
  sinceFounding: { label: "National medals since 2021", medals: { gold: 1, silver: 4, bronze: 5 } },

  athletesTitle: "Our champions",
  athletes: [
    {
      id: "samson",
      name: "Samson Kendrick",
      achievement: "National Champion 2026",
      images: [
        hof("samson-kendrick-1", 810, 1080, "Samson Kendrick on top of the podium at the National Karate Championship 2026"),
        hof("samson-kendrick-2", 1080, 810, "Samson Kendrick receiving his gold medal on the national championship podium"),
      ],
    },
    {
      id: "navin",
      name: "Master Navinessan Vickneswaran",
      achievement: "Southeast Asia Bronze Medallist",
      images: [
        hof("navinessan-vickneswaran", 960, 1280, "Master Navinessan Vickneswaran holding his Southeast Asia bronze medal in the competition arena"),
        hof("navinessan-vickneswaran-ceremony", 916, 596, "Master Navinessan Vickneswaran (right) on the podium with his bronze medal at the 13th SEAKF South East Asian Karate Championship medal ceremony in Ninh Binh"),
      ],
    },
    {
      id: "derren",
      name: "Derren Nagenthiran",
      achievement: "National University Silver Medallist 2026",
      images: [
        hof("derren-nagenthiran", 1280, 960, "Derren Nagenthiran on the podium with his silver medal at the national university games 2026"),
      ],
    },
  ] satisfies Athlete[],

  postersTitle: "Championship posters",
  posters: [
    {
      id: "hall-of-fame-2026",
      eyebrow: "Hall of Fame",
      title: "Perak Legends 2026",
      image: hof("hall-of-fame-2026", 592, 1066, "Perak Legends Hall of Fame 2026 poster listing the academy's national medallists"),
    },
    {
      id: "overall-medal",
      eyebrow: "National Championship 2026",
      title: "Overall Medal",
      image: hof("overall-medal-national-2026", 960, 1280, "Poster celebrating Perak Legends' four medals at the National Karate Championship 2026"),
    },
    {
      id: "top3-1",
      eyebrow: "2026",
      title: "Top 3 Nationwide out of 72 Teams",
      image: hof("top-3-nationwide-1", 960, 1280, "Poster announcing Perak Legends finishing Top 3 nationwide out of 72 teams"),
    },
    {
      id: "top3-2",
      eyebrow: "2026",
      title: "Top 3 Nationwide out of 72 Teams",
      image: hof("top-3-nationwide-2", 853, 1280, "Poster: Perak Legends 3rd over 72 teams, history made, Perak proud"),
    },
    {
      id: "milo-1",
      eyebrow: "2026",
      title: "25th MILO Karate Championship",
      image: hof("milo-championship-2026-1", 853, 1280, "Perak Legends' young athletes with their medals at the 25th MILO Karate Championship 2026"),
    },
    {
      id: "milo-2",
      eyebrow: "2026",
      title: "25th MILO Karate Championship",
      image: hof("milo-championship-2026-2", 853, 1280, "Perak Legends team holding the Perak flag at the 25th MILO Karate Championship 2026"),
    },
    {
      id: "malaysia-day",
      eyebrow: "2026",
      title: "4th Malaysia Day Karate Championship",
      image: hof("malaysia-day-championship-2026", 512, 1280, "4th Malaysia Day Karate Championship 2026 poster featuring Dr Wugindran Raja Saravanan"),
    },
    {
      // From the client's own poster; confirm wording with the client
      id: "no1",
      eyebrow: "Recognition",
      title: "No.1 Standalone Karate Club / Academy in Perak",
      image: hof("no1-standalone-club-perak", 960, 1280, "Poster naming Perak Legends the No.1 standalone karate club and academy in Perak, featuring founder Dr Wugindran Raja Saravanan"),
    },
  ] satisfies Poster[],
};

const coach = (n: number, w: number, h: number, alt: string, people: Coach["people"]): Coach => ({
  id: `coach-${n}`,
  people,
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
    coach(1, 290, 325, "Dr Wugindran Raja Saravanan, founder and head coach", [
      {
        name: "Dr Wugindran Raja Saravanan (MBBS)",
        credentials: [
          "Graduated from MSU Shah Alam in 2020",
          "First ever Asian Karate Champion (AKF) as a medical practitioner",
          "Active medical practitioner in Ipoh, Perak",
        ],
      },
    ]),
    coach(2, 300, 385, "Master Harikrishnan", [
      {
        name: "Master Harikrishnan",
        credentials: ["Former State Champion & National Medallist", "Active in karate for the last 20 years"],
      },
    ]),
    coach(5, 300, 330, "Master Kauthemen", [
      {
        name: "Master Kauthemen",
        credentials: ["Former State Champion & National Medallist", "Active in karate for the last 20 years"],
      },
    ]),
    coach(3, 440, 280, "Master Navinessan Vickneswaran and Master Derren Nagenthiran with their gold medals", [
      {
        name: "Master Navinessan Vickneswaran",
        credentials: ["Southeast Asia Bronze Medallist", "National Bronze Medallist", "SUKMA 2026 Representative for Terengganu"],
      },
      {
        name: "Master Derren Nagenthiran",
        credentials: ["National Silver Medallist", "National University Silver Medallist", "SUKMA 2026 Representative for Terengganu"],
      },
    ]),
    coach(4, 400, 295, "Master Ghaneash Kumaran Alageasan and Master Yogish Umaganthan", [
      {
        name: "Master Ghaneash Kumaran Alageasan",
        credentials: ["SUKMA 2022 Silver Medallist for Team Perak", "National Medallist", "National PDRM Medallist"],
      },
      {
        name: "Master Yogish Umaganthan",
        credentials: [
          "National Medallist",
          "Thailand Open Bronze Medallist 2022",
          "Chief Referee of Kelab Karate Ipoh",
          "SUKMA 2022 & 2024 Representative for Terengganu",
        ],
      },
    ]),
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions, answered",
  items: [
    {
      question: "How do I book a trial class?",
      answer:
        "Send us a WhatsApp message on 010-828 2417 with your name, age, preferred centre and preferred day, and we'll arrange your first class.",
    },
    {
      question: "Where are your centres?",
      answer: `We train at ${centreCountWord} centres across Perak: ${listNames(centres.map((c) => (c.isHQ ? `${c.name} (HQ)` : c.name)))}. Our HQ is in Desa Rishah, Buntong; message us on WhatsApp for the exact location of any other centre.`,
    },
    {
      question: "Who runs the academy?",
      answer:
        "Perak Legends was founded in April 2021 by Dr Wugindran Raja Saravanan (MBBS), Asian Gold Medallist (AKF) 2011, SUKMA 2014 Champion and 6x National Champion.",
    },
    {
      question: "Is the academy officially affiliated?",
      answer: "Yes. We are affiliated to Kelab Karate Ipoh under Pesuruhjaya Sukan Malaysia (KBS).",
    },
    {
      question: "How does belt progression work?",
      answer:
        "Students progress through a structured belt system from white belt to black belt. You can view the full chart in the Programmes section above.",
    },
    // TODO: add once the client confirms the details
    // { question: "What ages do you teach?", answer: "" },
    // { question: "How much are the fees?", answer: "" },
    // { question: "What should I bring to my first class?", answer: "" },
  ] satisfies Faq[],
};

export const finalCta = {
  title: "Ready to start your journey?",
  body: `Book a trial class at any of our ${centreCountWord} centres. Just send us a message on WhatsApp.`,
  cta: "Book a Trial",
};

/* ------------------------------------------------------------------ */
/* Centres                                                            */
/* ------------------------------------------------------------------ */


export const centresPage = {
  eyebrow: "Locations & Contact",
  title: "Our Centres",
  intro: `${capitalise(centreCountWord)} centres across Perak, one standard of excellence. Find the one closest to you and book a trial on WhatsApp.`,
};


/** True while a value is still a placeholder (used to style TODO text) */
export const isTodo = (value?: string) => !value || value.startsWith("TODO");
