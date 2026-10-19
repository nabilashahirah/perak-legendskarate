// Shapes for everything in src/content/site.ts.
// Kept separate so a future /admin (Supabase) can read/write the same types.

export type SiteImage = {
  /** Full-size optimised image (max 1600px), used in lightboxes and large layouts */
  src: string;
  /** 600px thumbnail, used in grids. Optional for images that are already small. */
  thumb?: string;
  width: number;
  height: number;
  alt: string;
};

export type NavItem = { label: string; href: string; sectionId?: string };

export type FounderAchievement = { year: string; title: string; detail: string };

export type FounderCount = { value: string; label: string };

export type MedalCount = { gold: number; silver: number; bronze: number };

/** One event on the Hall of Fame scoreboard */
export type ResultCard = {
  id: string;
  event: string;
  detail?: string;
  /** Big number, e.g. "4" or "3rd" */
  headline: string;
  headlineLabel: string;
  medals?: MedalCount;
  /** Short lines under the medals, e.g. medallist names */
  notes?: string[];
};

/** Athlete card with real photos (first image is the card, all open in the lightbox) */
export type Athlete = {
  id: string;
  name: string;
  achievement: string;
  images: SiteImage[];
};

/** Poster shown in the Hall of Fame archive strip */
export type Poster = {
  id: string;
  eyebrow: string;
  title: string;
  image: SiteImage;
};

/** Age-group programme card (section stays hidden until at least one is filled in) */
export type ProgrammeGroup = {
  name: string;
  ages: string;
  description: string;
  /** e.g. "2x a week" or "RM 120 / month" */
  details?: string[];
};

export type Faq = { question: string; answer: string };

export type CoachPerson = { name: string; credentials: string[] };

export type Coach = {
  id: string;
  /** One person for solo portraits, two for duo photos (no left/right order implied) */
  people: CoachPerson[];
  /** Cropped portrait shown in the gallery */
  portrait: SiteImage;
  /** Full original poster shown in the lightbox */
  poster: SiteImage;
};

export type ScheduleRow = { day: string; time: string; group: string };

export type Centre = {
  id: string;
  name: string;
  isHQ?: boolean;
  area: string;
  /** Full street address (optional; the area is shown when missing) */
  address?: string;
  /** Search phrase for the embedded map. Only centres with a mapQuery get a map (currently the HQ). */
  mapQuery?: string;
  /** Google Maps share link for the "Open in Google Maps" button */
  mapUrl?: string;
  /** Class schedule; empty shows "Message us on WhatsApp for current class times" */
  schedule: ScheduleRow[];
};
