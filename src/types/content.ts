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

export type HallOfFameItem = {
  id: string;
  eyebrow: string;
  title: string;
  image: SiteImage;
  /**
   * Bento cell size. "feature" and "large" are 2x2, "tall" is 1x2.
   * Keep talls in pairs between large cards so the grid tiles without holes.
   */
  size: "feature" | "large" | "tall";
  /** Crop anchor in grid cards: posters read best from the top, photos from the centre */
  focus?: "top" | "center";
};

export type Coach = {
  id: string;
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
  /** TODO: full street address */
  address: string;
  /** Search phrase for the temporary Google Maps embed */
  mapQuery: string;
  /** TODO: real Google Maps share link (https://maps.app.goo.gl/...) */
  mapUrl?: string;
  /** TODO: real class schedule */
  schedule: ScheduleRow[];
};
