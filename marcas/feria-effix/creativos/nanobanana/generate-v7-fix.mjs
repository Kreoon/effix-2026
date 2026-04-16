// V7 FIX: Regenerar stickers con transparencia REAL (los v5 salieron con fondo navy)
import fs from "node:fs/promises";

const API_KEY = process.env.GEMINI_API_KEY || (() => { throw new Error("GEMINI_API_KEY env var required"); })();
const MODEL = "nano-banana-pro-preview";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUT = "./output-v7";
await fs.mkdir(OUT, { recursive: true });

// Prompt mejorado: énfasis extremo en transparencia real
const TRANSPARENCY = `
CRITICAL: Output PNG MUST have TRUE ALPHA CHANNEL transparency.
The canvas outside the actual sticker shape MUST be 100% transparent (alpha=0).
DO NOT use any background color. DO NOT add a navy blue backdrop. DO NOT add any solid color fill outside the sticker.
The sticker alone floats on pure transparent alpha.
`;

const prompts = [
  {
    name: "sticker-circulo-t",
    prompt: `${TRANSPARENCY}
Create a STICKER LOGO on TRANSPARENT BACKGROUND (checkered transparency pattern should show outside the sticker when viewed).
Subject: the text "EL CÍRCULO EC'26" as a bold graffiti/sticker-style logo.
Style: heavy condensed display font (Impact/Bowlby/Anton-like), filled white with thick 8px black outline, drop shadow.
Decorative elements ATTACHED to the text (not background): 3 yellow 5-pointed stars scattered around letters at varying sizes/angles, small chrome liquid droplets as accents.
Sticker peel effect on bottom-right corner (slight curl).
THE STICKER IS THE ONLY OPAQUE ELEMENT. Everywhere else: transparent alpha.
Reference: a die-cut sticker photographed floating in mid-air against pure transparent background.`
  },
  {
    name: "sticker-que-es-t",
    prompt: `${TRANSPARENCY}
Create a TEXT STICKER on TRANSPARENT BACKGROUND.
Text: "¿QUÉ ES EL CÍRCULO?" in bold condensed display font.
White fill, 6px black outline, drop shadow. Slight playful rotation (-2deg).
A small chrome liquid mercury blob attached next to the "?" mark.
Everywhere outside the text/decorations: TRANSPARENT ALPHA. NO solid backdrop.`
  },
  {
    name: "sticker-se-parte-t",
    prompt: `${TRANSPARENCY}
Create a TEXT STICKER on TRUE TRANSPARENT BACKGROUND.
Text: "SÉ PARTE DEL CÍRCULO SI..." in heavy bold condensed display.
White fill with 6px black outline, sticker shadow. Slight tilt.
Small decorative yellow stars and chrome droplets beside the text.
NO NAVY BACKGROUND. NO BLUE FILL. NO SOLID BACKDROP.
Pure transparent alpha everywhere except the sticker shape.`
  },
  {
    name: "sticker-nuestras-t",
    prompt: `${TRANSPARENCY}
Create a TEXT STICKER "NUESTRAS VERSIONES" on TRANSPARENT BACKGROUND.
Heavy bold condensed display font, white with 6px black outline, shadow.
Only the text+outline are opaque. Everything else is transparent alpha channel.`
  },
  {
    name: "sticker-preguntas-t",
    prompt: `${TRANSPARENCY}
Create a TEXT STICKER "PREGUNTAS FRECUENTES" on TRANSPARENT BACKGROUND.
Heavy bold condensed font, white with 6px black outline.
TRUE TRANSPARENT PNG. No backdrop color. Only sticker is opaque.`
  },
  {
    name: "sticker-kit-t",
    prompt: `${TRANSPARENCY}
Create a TEXT STICKER "KIT CÍRCULO EFFIX 2026" on TRANSPARENT BACKGROUND.
Heavy condensed display. White fill + 6px black outline + shadow.
Accompanying yellow stars attached to the text shape.
TRUE ALPHA TRANSPARENT BACKGROUND.`
  },
  {
    name: "ecuador-flag-bg",
    prompt: `
Create an ECUADOR FLAG background tile (1200x600 horizontal PNG).
Horizontal stripes from top to bottom: YELLOW (50% height #FFCE00) · BLUE (25% height #034EA2) · RED (25% height #ED1C24).
Colors are the OFFICIAL Ecuador flag colors (yellow, blue, red).
Slightly textured/fabric feel, subtle shadows, clean professional look.
NO logos, NO text, NO coat of arms. Pure flag stripes only.
SOLID flag — not transparent — will be used as CSS background-image.`
  }
];

async function gen(item) {
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

  if (!r.ok) { console.error(`   ❌ HTTP ${r.status}`); return; }
  const data = await r.json();
  const img = (data.candidates?.[0]?.content?.parts || []).find(p => p.inlineData?.data);
  if (!img) { console.error(`   ❌ No image`); return; }

  const buf = Buffer.from(img.inlineData.data, "base64");
  await fs.writeFile(`${OUT}/${item.name}.png`, buf);
  console.log(`   ✅ ${buf.length}b (${((Date.now()-t0)/1000).toFixed(1)}s)`);
}

console.log(`🎨 v7 FIX: Regenerando stickers con transparencia real + Ecuador flag`);
for (const p of prompts) await gen(p);
console.log(`\n✅ Done`);
