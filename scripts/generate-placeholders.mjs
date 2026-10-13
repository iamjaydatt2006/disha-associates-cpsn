/**
 * Placeholder asset generator
 * ===========================
 *
 * The owner has not yet supplied real photography or the official logo, so this
 * script produces consistent, on-brand SVG placeholders (vector = tiny + sharp,
 * great for LCP). Every placeholder is deliberately labelled so it can never be
 * mistaken for a real Disha Associates project or photograph.
 *
 * Run:  node scripts/generate-placeholders.mjs
 * Then replace the generated files in /public/images with real WebP/AVIF photos
 * (see README → Images).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");
mkdirSync(outDir, { recursive: true });

const GOLD = "#BD8B45";
const GOLD_SOFT = "#D8B57E";
const CHARCOAL = "#171C24";
const CHARCOAL_2 = "#1F2632";
const INK = "#2A323F";

/** Reusable defs: subtle grid + vignette. */
function defs(id) {
  return `
  <defs>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${CHARCOAL}"/>
      <stop offset="1" stop-color="${INK}"/>
    </linearGradient>
    <radialGradient id="vig${id}" cx="0.5" cy="0.42" r="0.75">
      <stop offset="0" stop-color="rgba(255,255,255,0.10)"/>
      <stop offset="1" stop-color="rgba(0,0,0,0.28)"/>
    </radialGradient>
    <pattern id="grid${id}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="rgba(248,247,243,0.05)" stroke-width="1"/>
    </pattern>
  </defs>`;
}

function label(text) {
  return `
  <g>
    <rect x="40" y="40" rx="4" width="${Math.max(220, text.length * 12 + 48)}" height="38"
      fill="rgba(189,139,69,0.16)" stroke="${GOLD}" stroke-width="1"/>
    <text x="64" y="65" fill="${GOLD_SOFT}" font-family="ui-sans-serif, system-ui, sans-serif"
      font-size="17" font-weight="700" letter-spacing="1.5">${text}</text>
  </g>`;
}

function frame(w, h) {
  return `
  <rect x="0" y="0" width="${w}" height="${h}" fill="url(#bgF)"/>
  <rect x="0" y="0" width="${w}" height="${h}" fill="url(#gridF)"/>
  <rect x="0" y="0" width="${w}" height="${h}" fill="url(#vigF)"/>
  <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none"
    stroke="rgba(189,139,69,0.35)" stroke-width="1"/>`;
}

const W = 1600;
const H = 900;

/** ------- Motifs (line-art drawn on a 1600x900 stage) ------- */
const motifs = {
  hero: `
    <g stroke="${GOLD_SOFT}" fill="none" stroke-width="2.5" opacity="0.95">
      <!-- model base plate -->
      <path d="M360 720 L1100 720 L1300 600 L560 600 Z" fill="rgba(189,139,69,0.10)"/>
      <!-- towers -->
      <path d="M560 600 L560 330 L700 330 L700 600" fill="rgba(248,247,243,0.05)"/>
      <path d="M720 600 L720 400 L850 400 L850 600" fill="rgba(248,247,243,0.04)"/>
      <path d="M900 600 L900 250 L1040 250 L1040 600" fill="rgba(248,247,243,0.07)"/>
      <path d="M900 250 L1150 330 L1150 600 L1040 600"/>
      <!-- window grid -->
      <path d="M575 360 H685 M575 410 H685 M575 460 H685 M575 510 H685 M575 560 H685"/>
      <path d="M735 440 H835 M735 490 H835 M735 540 H835"/>
      <path d="M920 300 H1020 M920 350 H1020 M920 400 H1020 M920 450 H1020 M920 500 H1020 M920 550 H1020"/>
      <!-- trees -->
      <g fill="rgba(189,139,69,0.20)" stroke="${GOLD}">
        <circle cx="500" cy="640" r="26"/><rect x="496" y="660" width="8" height="34"/>
        <circle cx="1100" cy="650" r="20"/><rect x="1097" y="666" width="6" height="28"/>
      </g>
    </g>`,
  residential: `
    <g stroke="${GOLD_SOFT}" fill="none" stroke-width="2.5">
      <path d="M520 700 L1080 700 L1180 640 L620 640 Z" fill="rgba(189,139,69,0.10)"/>
      <path d="M600 640 L600 340 L780 340 L780 640" fill="rgba(248,247,243,0.05)"/>
      <path d="M800 640 L800 420 L960 420 L960 640" fill="rgba(248,247,243,0.04)"/>
      <path d="M600 380 H780 M600 430 H780 M600 480 H780 M600 530 H780 M600 580 H780"/>
      <path d="M820 460 H940 M820 510 H940 M820 560 H940 M820 610 H940"/>
      <circle cx="1040" cy="620" r="30" fill="rgba(189,139,69,0.18)" stroke="${GOLD}"/>
      <rect x="1036" y="646" width="8" height="40" stroke="${GOLD}"/>
    </g>`,
  commercial: `
    <g stroke="${GOLD_SOFT}" fill="none" stroke-width="2.5">
      <path d="M500 720 L1120 720 L1240 650 L620 650 Z" fill="rgba(189,139,69,0.10)"/>
      <path d="M640 650 L640 250 L820 250 L820 650" fill="rgba(248,247,243,0.06)"/>
      <path d="M660 300 H800 M660 350 H800 M660 400 H800 M660 450 H800 M660 500 H800 M660 550 H800 M660 600 H800"/>
      <path d="M640 250 L820 250 L860 290 L680 290 Z" fill="rgba(189,139,69,0.16)"/>
      <path d="M880 650 L880 400 L1010 400 L1010 650" fill="rgba(248,247,243,0.04)"/>
      <path d="M900 440 H990 M900 490 H990 M900 540 H990 M900 590 H990"/>
    </g>`,
  industrial: `
    <g stroke="${GOLD_SOFT}" fill="none" stroke-width="2.5">
      <path d="M420 700 L1200 700 L1200 640 L420 640 Z" fill="rgba(189,139,69,0.10)"/>
      <!-- sawtooth roof -->
      <path d="M470 640 L470 520 L590 580 L590 640 M590 640 L590 520 L710 580 L710 640
               M710 640 L710 520 L830 580 L830 640 M830 640 L830 520 L950 580 L950 640"
        fill="rgba(248,247,243,0.04)"/>
      <!-- silo / chimney -->
      <rect x="1000" y="360" width="60" height="280" fill="rgba(248,247,243,0.05)"/>
      <path d="M1000 360 L1030 320 L1060 360"/>
      <rect x="1090" y="440" width="70" height="200" fill="rgba(248,247,243,0.04)"/>
      <path d="M470 640 L470 600 L950 600"/>
    </g>`,
  landscape: `
    <g stroke="${GOLD_SOFT}" fill="none" stroke-width="2.5">
      <path d="M260 700 L1360 700 L1360 300 L260 300 Z" fill="rgba(189,139,69,0.08)"/>
      <!-- roads -->
      <path d="M260 620 C520 560 760 640 1000 560 S1280 520 1360 540"
        stroke="${GOLD}" stroke-width="8" opacity="0.7"/>
      <path d="M420 300 C460 460 400 560 460 700" stroke="${GOLD}" stroke-width="6" opacity="0.5"/>
      <path d="M900 300 C960 460 880 560 940 700" stroke="${GOLD}" stroke-width="6" opacity="0.5"/>
      <!-- plots -->
      <path d="M300 360 H380 V440 H300 Z M400 360 H480 V440 H400 Z M980 360 H1080 V460 H980 Z"/>
      <!-- pond -->
      <path d="M1120 600 C1180 560 1280 580 1300 640 C1300 690 1180 700 1120 660 Z"
        fill="rgba(189,139,69,0.16)" stroke="${GOLD}"/>
      <!-- trees -->
      <g fill="rgba(189,139,69,0.22)" stroke="${GOLD}">
        <circle cx="560" cy="400" r="18"/><circle cx="640" cy="360" r="14"/>
        <circle cx="720" cy="410" r="16"/><circle cx="1180" cy="380" r="14"/>
      </g>
    </g>`,
  infrastructure: `
    <g stroke="${GOLD_SOFT}" fill="none" stroke-width="2.5">
      <path d="M200 700 L1400 700" stroke="${GOLD}" stroke-width="6"/>
      <!-- bridge deck + arch -->
      <path d="M360 560 L1240 560" stroke-width="4"/>
      <path d="M420 700 C600 470 1000 470 1180 700" fill="none" stroke-width="4"/>
      <path d="M520 700 L520 560 M700 700 L700 560 M900 700 L900 560 M1080 700 L1080 560"
        stroke-width="2" opacity="0.8"/>
      <!-- pillars -->
      <path d="M360 560 L360 700 M1240 560 L1240 700" stroke-width="4"/>
      <!-- road markings -->
      <path d="M240 700 H340 M420 700 H480 M620 700 H680 M820 700 H880 M1020 700 H1140 M1260 700 H1360"
        stroke="${GOLD}" stroke-width="5" opacity="0.7"/>
    </g>`,
  custom: `
    <g stroke="${GOLD_SOFT}" fill="none" stroke-width="2.5">
      <!-- exhibition podium -->
      <path d="M420 720 L1180 720 L1300 660 L540 660 Z" fill="rgba(189,139,69,0.12)"/>
      <path d="M560 660 L560 340 L900 340 L900 660" fill="rgba(248,247,243,0.05)"/>
      <path d="M600 390 H860 M600 440 H860 M600 490 H860 M600 540 H860 M600 590 H860"/>
      <path d="M560 340 L900 340 L960 380 L620 380 Z" fill="rgba(189,139,69,0.16)"/>
      <!-- spotlights -->
      <path d="M480 300 L560 360 M980 300 L900 360" stroke="${GOLD}" opacity="0.6"/>
      <circle cx="480" cy="296" r="6" fill="${GOLD}"/>
      <circle cx="980" cy="296" r="6" fill="${GOLD}"/>
    </g>`,
  project: `
    <g stroke="${GOLD_SOFT}" fill="none" stroke-width="2.5">
      <path d="M480 700 L1120 700 L1220 640 L580 640 Z" fill="rgba(189,139,69,0.10)"/>
      <path d="M620 640 L620 380 L820 380 L820 640" fill="rgba(248,247,243,0.05)"/>
      <path d="M650 420 H790 M650 470 H790 M650 520 H790 M650 570 H790"/>
      <path d="M860 640 L860 470 L980 470 L980 640" fill="rgba(248,247,243,0.04)"/>
      <path d="M880 510 H960 M880 550 H960 M880 590 H960"/>
    </g>`,
};

function makeImage(motifKey, altLabel) {
  const m = motifs[motifKey];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${altLabel}">
  <title>${altLabel}</title>${defs("F")}
  <rect width="${W}" height="${H}" fill="${CHARCOAL_2}"/>
  ${frame(W, H)}
  ${m}
  ${label("PLACEHOLDER")}
  <text x="${W - 48}" y="${H - 54}" text-anchor="end"
    fill="rgba(248,247,243,0.55)" font-family="ui-sans-serif, system-ui, sans-serif" font-size="19">
    Replace with a real photograph · 1600×900 · WebP/AVIF
  </text>
</svg>`;
}

const images = {
  "hero.svg": makeImage("hero", "Placeholder cover image of an architectural scale model — replace with a real 16:9 photograph"),
  "service-residential.svg": makeImage("residential", "Placeholder illustration of a residential building scale model"),
  "service-commercial.svg": makeImage("commercial", "Placeholder illustration of a commercial building scale model"),
  "service-industrial.svg": makeImage("industrial", "Placeholder illustration of an industrial scale model"),
  "service-landscape.svg": makeImage("landscape", "Placeholder illustration of a landscape and township scale model"),
  "service-infrastructure.svg": makeImage("infrastructure", "Placeholder illustration of an infrastructure scale model"),
  "service-custom.svg": makeImage("custom", "Placeholder illustration of a custom architectural presentation model"),
  "project-placeholder.svg": makeImage("project", "Placeholder tile for a project — replace with a real project photograph"),
};

for (const [name, svg] of Object.entries(images)) {
  writeFileSync(join(outDir, name), svg.trim() + "\n", "utf8");
}

/* ---------------- Logo emblem (gold, 96x96) ---------------- */
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96" role="img" aria-label="Disha Associates emblem">
  <title>Disha Associates emblem</title>
  <rect x="1.5" y="1.5" width="93" height="93" rx="6" fill="${CHARCOAL}" stroke="${GOLD}" stroke-width="1.5"/>
  <g stroke="${GOLD}" fill="none" stroke-width="2" opacity="0.55">
    <path d="M48 16 L48 80 M16 48 L80 48"/>
  </g>
  <path d="M48 22 L68 52 A20 20 0 1 1 28 52 Z" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
  <path d="M48 26 L48 76" stroke="${GOLD_SOFT}" stroke-width="2.5"/>
  <path d="M48 26 L41 40 L48 35 L55 40 Z" fill="${GOLD_SOFT}"/>
  <circle cx="48" cy="48" r="43" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="0.5"/>
</svg>`;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
  <rect width="96" height="96" rx="10" fill="${CHARCOAL}"/>
  <path d="M48 20 L70 54 A22 22 0 1 1 26 54 Z" fill="none" stroke="${GOLD}" stroke-width="4"/>
  <path d="M48 24 L48 78" stroke="${GOLD_SOFT}" stroke-width="4"/>
  <path d="M48 24 L39 42 L48 36 L57 42 Z" fill="${GOLD_SOFT}"/>
</svg>`;

writeFileSync(join(root, "public", "logo.svg"), logo.trim() + "\n", "utf8");
writeFileSync(join(root, "public", "favicon.svg"), favicon.trim() + "\n", "utf8");
writeFileSync(join(root, "public", "images", "logo.svg"), logo.trim() + "\n", "utf8");

/* ---------------- Open Graph image (1200x630) ---------------- */
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="Disha Associates — Architectural Scale Model Making">
  <title>Disha Associates — Architectural Scale Model Making</title>
  <defs>
    <linearGradient id="ogbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${CHARCOAL}"/><stop offset="1" stop-color="${INK}"/>
    </linearGradient>
    <pattern id="oggrid" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M36 0H0V36" fill="none" stroke="rgba(248,247,243,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#ogbg)"/>
  <rect width="1200" height="630" fill="url(#oggrid)"/>
  <rect x="0" y="0" width="1200" height="6" fill="${GOLD}"/>
  <g transform="translate(80,60)">
    <path d="M40 8 L66 42 A26 26 0 1 1 14 42 Z" fill="none" stroke="${GOLD}" stroke-width="4"/>
    <path d="M40 12 L40 80" stroke="${GOLD_SOFT}" stroke-width="4"/>
    <path d="M40 12 L29 34 L40 27 L51 34 Z" fill="${GOLD_SOFT}"/>
  </g>
  <text x="80" y="200" fill="#F8F7F3" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="600">Disha Associates</text>
  <text x="80" y="252" fill="${GOLD_SOFT}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="22" letter-spacing="6">ARCHITECTURAL SCALE MODEL MAKING</text>
  <rect x="80" y="290" width="140" height="2" fill="${GOLD}"/>
  <text x="80" y="360" fill="rgba(248,247,243,0.85)" font-family="ui-sans-serif, system-ui, sans-serif" font-size="30">Physical architectural models for building</text>
  <text x="80" y="402" fill="rgba(248,247,243,0.85)" font-family="ui-sans-serif, system-ui, sans-serif" font-size="30">presentations, construction projects and</text>
  <text x="80" y="444" fill="rgba(248,247,243,0.85)" font-family="ui-sans-serif, system-ui, sans-serif" font-size="30">real estate developments.</text>
  <text x="80" y="560" fill="rgba(248,247,243,0.6)" font-family="ui-sans-serif, system-ui, sans-serif" font-size="24">Chhatrapati Sambhajinagar, Maharashtra</text>
</svg>`;
writeFileSync(join(root, "public", "images", "og-default.svg"), og.trim() + "\n", "utf8");

console.log("Generated placeholder assets in /public and /public/images");
