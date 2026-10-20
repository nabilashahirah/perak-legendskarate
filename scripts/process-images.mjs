// Regenerates every optimised image in public/ from the untouched originals in assets-raw/.
// Usage: npm run images
// Add a new photo: drop the original in assets-raw/, add a row to JOBS, run the script,
// then reference the output path (and the printed width/height) in src/content/site.ts.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, "assets-raw");
const PUB = path.join(ROOT, "public");
const IMG = path.join(PUB, "images");

const MAX_WIDTH = 1600;
const THUMB_WIDTH = 600;

// [original, output path (no extension), optional crop {left, top, width, height}]
const JOBS = [
  ["founderpic.jpeg", "founder/dr-wugindran"],
  // Founder figure cropped out of the "No.1 standalone club" poster
  ["HIGHLIGHTKARATE.jpeg", "hero/highlight", { left: 0, top: 40, width: 425, height: 860 }],
  ["HIGHLIGHTKARATE.jpeg", "hall-of-fame/no1-standalone-club-perak"],
  // Trim the black phone-screenshot bars
  ["HallofFame.jpeg", "hall-of-fame/hall-of-fame-2026", { left: 0, top: 70, width: 592, height: 1066 }],
  ["gallerycoach1.jpeg", "hall-of-fame/malaysia-day-championship-2026"],
  ["1NATIONALCHAMPIO 2026 - SAMSON KENDRICK.jpeg", "hall-of-fame/samson-kendrick-1"],
  ["2NATIONALCHAMPION 2026 - SAMSON KENDRICK.jpeg", "hall-of-fame/samson-kendrick-2"],
  ["OVERALLMEDALNATIONALCHAMPION 2026.jpeg", "hall-of-fame/overall-medal-national-2026"],
  ["SOUTHEASTASIABRONZEMEDALNAVINESSANVICKNESWARAN.jpeg", "hall-of-fame/navinessan-vickneswaran"],
  ["the Southeast Asia Medal ceremony.jpeg", "hall-of-fame/navinessan-vickneswaran-ceremony"],
  ["25THMILOKARATECHAMPIONSHIP2026.jpeg", "hall-of-fame/milo-championship-2026-1"],
  ["(2)25THMILOKARATECHAMPIONSHIP2026.jpeg", "hall-of-fame/milo-championship-2026-2"],
  ["TOP3NSATIONALWIDE.jpeg", "hall-of-fame/top-3-nationwide-1"],
  ["(2)TOP3NSATIONALWIDE.JPEG", "hall-of-fame/top-3-nationwide-2"],
  ["DERREN NAGENTHIRAN.jpeg", "hall-of-fame/derren-nagenthiran"],
  ["ProgramProgressionFromWhiteBelttoBlackbelt.jpeg", "programmes/belt-progression"],
  ["ProgramProgressionFromWhiteBelttoBlackbelt.jpeg", "programmes/belt-row", { left: 8, top: 668, width: 660, height: 270 }],
  // Coach portraits cropped out of the Malaysia Day posters; full posters kept for the lightbox
  ["gallerycoach1.jpeg", "coaches/coach-1", { left: 120, top: 305, width: 290, height: 325 }],
  ["gallerycoach2.jpeg", "coaches/coach-2", { left: 120, top: 250, width: 300, height: 385 }],
  ["gallerycoach3.jpeg", "coaches/coach-3", { left: 30, top: 360, width: 440, height: 280 }],
  ["gallerycoach4.jpeg", "coaches/coach-4", { left: 60, top: 345, width: 400, height: 295 }],
  ["gallerycoach15.jpeg", "coaches/coach-5", { left: 120, top: 315, width: 300, height: 330 }],
  ["gallerycoach1.jpeg", "coaches/coach-1-poster"],
  ["gallerycoach2.jpeg", "coaches/coach-2-poster"],
  ["gallerycoach3.jpeg", "coaches/coach-3-poster"],
  ["gallerycoach4.jpeg", "coaches/coach-4-poster"],
  ["gallerycoach15.jpeg", "coaches/coach-5-poster"],
  // Student gallery (student8.jpeg is a duplicate of the MILO poster, so it's skipped)
  ...[1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((n) => [`student${n}.jpeg`, `students/student-${n}`]),
];

const outPath = (rel) => {
  const p = path.join(IMG, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  return p;
};

async function photo([src, dest, crop]) {
  let img = sharp(path.join(RAW, src)).rotate();
  if (crop) img = img.extract(crop);
  const buf = await img.toBuffer();
  const full = await sharp(buf)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outPath(`${dest}.webp`));
  await sharp(buf)
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(outPath(`${dest}-sm.webp`));
  console.log(`/images/${dest}.webp  ${full.width}x${full.height}`);
}

async function brand() {
  const logo = path.join(RAW, "OfficialLogo.jpeg");
  const S = 1080;

  // The logo has a solid black field; fade its edge to transparent so it melts into dark sections.
  const mask = Buffer.from(
    `<svg width="${S}" height="${S}"><defs><radialGradient id="g" r="0.5"><stop offset="0.88" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient></defs><rect width="${S}" height="${S}" fill="url(#g)"/></svg>`,
  );
  const alpha = await sharp(mask).greyscale().raw().toBuffer();
  const rgb = await sharp(logo).removeAlpha().raw().toBuffer();
  const rgba = Buffer.alloc(S * S * 4);
  for (let i = 0; i < S * S; i++) {
    rgba[i * 4] = rgb[i * 3];
    rgba[i * 4 + 1] = rgb[i * 3 + 1];
    rgba[i * 4 + 2] = rgb[i * 3 + 2];
    rgba[i * 4 + 3] = alpha[i];
  }
  const faded = () => sharp(rgba, { raw: { width: S, height: S, channels: 4 } });
  await faded().resize(800).png({ palette: true, quality: 90, effort: 10 }).toFile(outPath("brand/logo.png"));
  await faded().resize(800).webp({ quality: 85, alphaQuality: 90 }).toFile(outPath("brand/logo-alpha.webp"));
  // Hero crest at display sizes (static export can't resize on the fly, so the hero uses a manual srcset)
  for (const w of [360, 480, 560]) {
    await faded().resize(w).webp({ quality: 70, alphaQuality: 75 }).toFile(outPath(`brand/crest-${w}.webp`));
  }
  await sharp(logo).resize(800).webp({ quality: 85 }).toFile(outPath("brand/logo.webp"));
  await sharp(logo).resize(320).webp({ quality: 85 }).toFile(outPath("brand/logo-sm.webp"));

  // Circular badge with a thin gold ring (header / footer)
  const B = 512;
  const circle = Buffer.from(`<svg width="${B}" height="${B}"><circle cx="${B / 2}" cy="${B / 2}" r="${B / 2}" fill="#fff"/></svg>`);
  const ring = Buffer.from(
    `<svg width="${B}" height="${B}"><circle cx="${B / 2}" cy="${B / 2}" r="${B / 2 - 5}" fill="none" stroke="#E8A828" stroke-width="6"/></svg>`,
  );
  const badge = await sharp(await sharp(logo).resize(B).composite([{ input: circle, blend: "dest-in" }]).png().toBuffer())
    .composite([{ input: ring }])
    .png()
    .toBuffer();
  await sharp(badge).png({ palette: true, quality: 90, effort: 10 }).toFile(outPath("brand/logo-badge.png"));
  await sharp(badge).webp({ quality: 85, alphaQuality: 90 }).toFile(outPath("brand/logo-badge.webp"));
  // Small badge for the header/footer (shown at 40-64px)
  await sharp(badge).resize(128).webp({ quality: 82, alphaQuality: 90 }).toFile(outPath("brand/logo-badge-128.webp"));

  // "PU" monogram + crown: legible at favicon sizes where the full crest is not
  const mono = await sharp(logo).extract({ left: 420, top: 30, width: 240, height: 240 }).toBuffer();
  await sharp(mono).resize(512).png({ palette: true, quality: 90 }).toFile(outPath("brand/monogram.png"));
  fs.mkdirSync(path.join(PUB, "icons"), { recursive: true });
  for (const [name, size] of [["icon-192.png", 192], ["icon-512.png", 512], ["apple-touch-icon.png", 180]]) {
    await sharp(mono).resize(size).png({ palette: true, quality: 90 }).toFile(path.join(PUB, "icons", name));
  }
  const icoSizes = await Promise.all([16, 32, 48].map((s) => sharp(mono).resize(s).png().toBuffer()));
  fs.writeFileSync(path.join(PUB, "favicon.ico"), await pngToIco(icoSizes));

  // Open Graph 1200x630: crest on black with a soft gold glow
  const bg = Buffer.from(
    `<svg width="1200" height="630"><defs><radialGradient id="g" cx="0.5" cy="0.5" r="0.6"><stop offset="0" stop-color="#E8A828" stop-opacity="0.22"/><stop offset="1" stop-color="#0A0A0A" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="#0A0A0A"/><rect width="1200" height="630" fill="url(#g)"/></svg>`,
  );
  const ogLogo = await faded().resize(600).png().toBuffer();
  await sharp(bg).composite([{ input: ogLogo, left: 300, top: 15 }]).jpeg({ quality: 86 }).toFile(path.join(PUB, "og-image.jpg"));
  console.log("brand assets, icons and og-image.jpg written");
}

for (const job of JOBS) await photo(job);
await brand();
