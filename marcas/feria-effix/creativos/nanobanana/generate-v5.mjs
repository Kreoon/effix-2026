// V5: Chrome metallic liquid decorations + sticker logos (estilo feriaeffix.com real)
import fs from "node:fs/promises";

const API_KEY = process.env.GEMINI_API_KEY || (() => { throw new Error("GEMINI_API_KEY env var required"); })();
const MODEL = "nano-banana-pro-preview";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUT = "./output";
await fs.mkdir(OUT, { recursive: true });

const STYLE = `
Style: Feria Effix 2026 brand from LATAM's biggest ecommerce fair.
Aesthetic: urban sticker/graffiti style on dark navy blue #1F1E35 background.
Main decorative elements: chrome silver liquid metal blobs, highly reflective, almost like molten mercury/aluminum.
Mood: premium, energetic, urban, cool, Latin youth energy.
`;

const prompts = [
  {
    name: "chrome-blob-1",
    prompt: `${STYLE}
Generate a CHROME LIQUID METAL BLOB (1024x1024 PNG with transparent background).
An abstract metallic silver liquid shape, highly reflective chrome surface with realistic reflections,
organic drippy edges, mercury-like fluid texture. Should look like it was splashed/poured onto a surface.
Size: fills most of canvas. Position: top-right corner bias.
IMPORTANT: transparent background (no navy blue behind), ONLY the chrome blob.
Reference style: Apple chrome logo / liquid mercury puddles / Y2K tech aesthetic.`
  },
  {
    name: "chrome-blob-2",
    prompt: `${STYLE}
Generate a CHROME LIQUID SPLASH (1024x1024 PNG transparent background).
A different abstract chrome liquid metal shape, smaller, more dynamic, like a splash frozen mid-air.
Multiple droplets separating from main mass. Ultra-reflective polished chrome.
Transparent background. Just the silver chrome element.`
  },
  {
    name: "sticker-circulo-logo",
    prompt: `${STYLE}
Generate a STICKER-STYLE LOGO (1600x600 transparent PNG).
Text: "EL CÍRCULO EC'26" in heavy condensed bold sans-serif (Anton/Impact style).
Filled white with thick 8px BLACK OUTLINE, subtle black drop shadow. Slight playful rotation.
Decorative elements: 3 bright yellow stars (★) scattered around the text at different sizes and angles.
One star has a star-shaped shine highlight. Chrome metallic accent on "26".
Sticker peel effect on one corner (like the text has a slight curl at edge).
TRANSPARENT background. The logo looks like a peeled sticker slapped onto a wall.
Reference: Feria Effix 2026 branding, skateboard sticker culture, urban Latino sticker art.`
  },
  {
    name: "sticker-que-es",
    prompt: `${STYLE}
Generate a STICKER-STYLE TITLE (1400x500 transparent PNG).
Text: "¿QUÉ ES EL CÍRCULO?" in heavy condensed bold sans-serif.
White fill, thick 6px black outline, drop shadow. Sticker effect.
Small chrome liquid mercury blob next to the "?" at end.
TRANSPARENT background.`
  },
  {
    name: "sticker-se-parte",
    prompt: `${STYLE}
Generate a STICKER-STYLE TITLE (1600x500 transparent PNG).
Text: "SÉ PARTE DEL CÍRCULO SI..." in heavy bold condensed display font.
White fill, 6px black outline, dramatic shadow. Playful sticker tilt.
TRANSPARENT background. Looks like a peeled decal.`
  },
  {
    name: "sticker-nuestras-versiones",
    prompt: `${STYLE}
Generate a STICKER-STYLE TITLE (1400x400 transparent PNG).
Text: "NUESTRAS VERSIONES" in heavy bold condensed display font.
White fill with 6px black outline, shadow.
TRANSPARENT background.`
  },
  {
    name: "sticker-preguntas",
    prompt: `${STYLE}
Generate a STICKER-STYLE TITLE (1400x400 transparent PNG).
Text: "PREGUNTAS FRECUENTES" in heavy bold condensed display.
White fill, 6px black outline, subtle shadow. Sticker tilt.
TRANSPARENT background.`
  }
];

async function generate(item) {
  console.log(`\n⏳ ${item.name}...`);
  const t0 = Date.now();
  const r = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: item.prompt }] }],
      generationConfig: { responseModalities: ["IMAGE"] }
    })
  });

  if (!r.ok) {
    console.error(`   ❌ HTTP ${r.status}: ${(await r.text()).slice(0, 300)}`);
    return null;
  }

  const data = await r.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const img = parts.find(p => p.inlineData?.data);
  if (!img) {
    console.error(`   ❌ No image`);
    return null;
  }

  const buf = Buffer.from(img.inlineData.data, "base64");
  const path = `${OUT}/${item.name}.png`;
  await fs.writeFile(path, buf);
  console.log(`   ✅ ${path} (${buf.length}b, ${((Date.now()-t0)/1000).toFixed(1)}s)`);
}

console.log(`🎨 Generando ${prompts.length} assets v5 — chrome + stickers`);
for (const p of prompts) await generate(p);
console.log(`\n✅ Done`);
