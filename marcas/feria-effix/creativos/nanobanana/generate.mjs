// Generador de imágenes con NanoBanana (Gemini 2.5 Flash Image Preview)
// Para El Círculo Effix Ecuador — branding real Feria Effix (púrpura + amarillo + estrellas)
import fs from "node:fs/promises";

const API_KEY = process.env.GEMINI_API_KEY || (() => { throw new Error("GEMINI_API_KEY env var required"); })();
const MODEL = "nano-banana-pro-preview";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUT = "./output";
await fs.mkdir(OUT, { recursive: true });

// Estilo base Feria Effix — aplicado a todos los prompts
const BRAND_STYLE = `
Visual style: Feria Effix 2026 brand — LATAM's biggest ecommerce fair.
Color palette: deep purple-to-violet gradient background (#0f0720 to #3a2660),
bright golden yellow accents (#FFCC00, #FFD700), white typography.
Decorative elements: small star particles, subtle constellation patterns,
premium shine highlights. Mood: premium, energetic, motivational, aspirational.
Aesthetic: modern editorial poster, high contrast, bold condensed typography vibe.
Reference: Cannes Lions promotional posters crossed with LATAM event premium energy.
Avoid: cheesy stock photos, flat corporate design, beige or champagne tones.
`;

const prompts = [
  {
    name: "hero-backdrop",
    prompt: `${BRAND_STYLE}
Generate a HERO BACKDROP image (9:16 vertical, mobile landing hero).
Scene: abstract deep purple nebula with scattered golden star particles,
premium light rays, soft lens flare in upper right corner (golden yellow).
No text, no logos — pure atmospheric background.
Space in lower third is darker for text overlay readability.`
  },
  {
    name: "miercoles-hero",
    prompt: `${BRAND_STYLE}
Generate a HERO CARD IMAGE for "MIÉRCOLES DEL CÍRCULO" (1:1 square, 800x800).
Scene: premium dark purple card with glowing golden constellation forming a circle.
A bright golden star at the center with rays emanating outward.
Subtle "Miércoles" calendar vibe — no literal calendar, but evocative.
No text. Pure visual emblem.`
  },
  {
    name: "session-shopify",
    prompt: `${BRAND_STYLE}
Generate a SESSION THUMBNAIL (1:1 square, 400x400) for ecommerce session "Escalando de 0 a 1M en Shopify".
Scene: minimalist iconic representation — glowing golden Shopify-style shopping bag rising from purple ground,
with a chart arrow going up and to the right in golden yellow.
Premium editorial style, no text. Dark purple background with star particles.`
  },
  {
    name: "session-logistica",
    prompt: `${BRAND_STYLE}
Generate a SESSION THUMBNAIL (1:1 square, 400x400) for "Logística de última milla en Ecuador".
Scene: minimalist golden delivery truck or package icon on a route map with Ecuador silhouette subtly hinted.
Purple background with golden route lines and star particles.
Editorial premium, no text.`
  },
  {
    name: "session-impuestos",
    prompt: `${BRAND_STYLE}
Generate a SESSION THUMBNAIL (1:1 square, 400x400) for "Impuestos y Facturación E-commerce".
Scene: minimalist golden document/invoice icon with percentage % symbol,
gold coin stack, clean financial aesthetic.
Purple background, star particles, no text.`
  },
  {
    name: "session-ads",
    prompt: `${BRAND_STYLE}
Generate a SESSION THUMBNAIL (1:1 square, 400x400) for "Facebook Ads: la guía definitiva GYE".
Scene: minimalist golden target with arrow hitting bullseye, surrounded by small golden digital spark/ad icons.
Purple background, star particles, no text.`
  },
  {
    name: "stars-decor",
    prompt: `${BRAND_STYLE}
Generate a DECORATIVE ELEMENT (transparent/dark background, 800x200 horizontal banner).
Scene: scattered golden 5-point stars of varying sizes, some with glow halos,
arranged in a horizontal constellation pattern. Pure Feria Effix brand star motif.
Deep purple background, no text.`
  },
  {
    name: "bento-playbook",
    prompt: `${BRAND_STYLE}
Generate a BENTO CARD ILLUSTRATION (1:1 square, 600x600) for "Playbook Feria Effix 2026".
Scene: a premium dark purple/black book with golden spine and golden edges standing open slightly,
with golden constellation lines emanating from the pages.
Deep purple background, subtle stars. No text on the book.`
  },
  {
    name: "bento-directorio",
    prompt: `${BRAND_STYLE}
Generate a BENTO CARD ILLUSTRATION (1:1 square, 600x600) for "Directorio 30 Partners".
Scene: 30 small golden circles/nodes connected by thin golden lines forming a network constellation.
Deep purple background, subtle stars. Minimalist, editorial.`
  }
];

async function generate(item) {
  console.log(`\n⏳ ${item.name}...`);
  const t0 = Date.now();
  const body = {
    contents: [{ parts: [{ text: item.prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"] }
  };

  const r = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!r.ok) {
    const err = await r.text();
    console.error(`   ❌ HTTP ${r.status}: ${err.slice(0, 400)}`);
    return null;
  }

  const data = await r.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find(p => p.inlineData?.data);
  if (!imagePart) {
    console.error(`   ❌ No image in response`, JSON.stringify(data).slice(0, 300));
    return null;
  }

  const buf = Buffer.from(imagePart.inlineData.data, "base64");
  const path = `${OUT}/${item.name}.png`;
  await fs.writeFile(path, buf);
  console.log(`   ✅ ${path} (${buf.length} bytes, ${((Date.now() - t0) / 1000).toFixed(1)}s)`);
  return path;
}

console.log(`🎨 Generando ${prompts.length} imágenes con NanoBanana (Gemini ${MODEL})`);
console.log(`📂 Output: ${OUT}\n`);

for (const p of prompts) {
  await generate(p);
}

console.log(`\n✅ Listo. Mueve los .png a landing-ecuador/assets/nb/`);
