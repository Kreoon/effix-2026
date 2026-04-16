// V8: Imágenes con fondo NAVY SÓLIDO (matching bg site) — no más checker pattern baked-in
import fs from "node:fs/promises";

const API_KEY = process.env.GEMINI_API_KEY || (() => { throw new Error("GEMINI_API_KEY env var required"); })();
const MODEL = "nano-banana-pro-preview";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUT = "./output-v8";
await fs.mkdir(OUT, { recursive: true });

// Regla dura: fondo sólido navy del site, NO checker, NO transparencia intentada
const NAVY_BG = `
CRITICAL BACKGROUND RULE: The image background MUST be SOLID PURE NAVY BLUE color #1F1E35 (hex).
NO checker pattern, NO transparent indicator, NO alpha transparency attempted.
The entire canvas is filled with solid #1F1E35 dark navy blue.
The subject of the image sits on top of this navy background.
Think of it as painting on a dark navy canvas — no gray squares, no checkered pattern anywhere.
`;

const prompts = [
  {
    name: "sticker-circulo-navy",
    prompt: `${NAVY_BG}
On the solid navy #1F1E35 background, paint a STICKER LOGO for "EL CÍRCULO EC'26".
Style: heavy graffiti/sticker display font (Impact/Bowlby/Anton-like), filled WHITE with thick 8px BLACK outline, drop shadow.
Decorative elements surrounding the text: 3 bright yellow 5-pointed stars at varying sizes/angles, small silver chrome liquid droplets as accents.
Sticker peel effect on bottom-right corner (slight curl).
The background is entirely solid navy #1F1E35 — ONLY the sticker is the foreground element.
Composition: sticker centered, clearly visible, takes up ~70% of canvas.
Reference: an urban sticker photographed on a navy blue wall.`
  },
  {
    name: "sticker-que-es-white",
    prompt: `
CRITICAL BACKGROUND RULE: The image background is SOLID PURE WHITE #FFFFFF.
NO checker pattern, NO transparency indicator. Fully opaque white canvas.
On the white background, paint a sticker text "¿QUÉ ES EL CÍRCULO?"
Bold condensed display font, white fill with thick 6px black outline, drop shadow.
Slight playful rotation -2deg. Small chrome liquid mercury blob next to the "?" mark.
Entire background: solid white.`
  },
  {
    name: "sticker-se-parte-navy",
    prompt: `${NAVY_BG}
On the solid navy #1F1E35 background, paint a sticker text "SÉ PARTE DEL CÍRCULO SI..."
Heavy bold condensed display, white fill with 6px black outline, drop shadow.
Slight tilt. Accompanying yellow stars and small chrome droplets.
Background: solid navy #1F1E35. Only the sticker is foreground.`
  },
  {
    name: "sticker-nuestras-navy",
    prompt: `${NAVY_BG}
On the solid navy #1F1E35 background, paint a sticker "NUESTRAS VERSIONES".
Heavy condensed display font, white with 6px black outline, drop shadow.
Solid navy background — no checker.`
  },
  {
    name: "sticker-preguntas-navy",
    prompt: `${NAVY_BG}
On the solid navy #1F1E35 background, paint a sticker "PREGUNTAS FRECUENTES".
Heavy condensed display font, white with 6px black outline.
Solid navy canvas only.`
  },
  {
    name: "chrome-blob-navy-right",
    prompt: `${NAVY_BG}
On the solid navy #1F1E35 background, paint an abstract silver chrome liquid splash on the RIGHT side of the canvas (mirror to the edge).
Highly reflective chrome texture with realistic mercury-like reflections.
Organic drippy shape with droplets, occupying the right ~40% of the canvas, fading off the right edge.
The left 60% is pure solid navy #1F1E35 (empty space).
No checker pattern.`
  },
  {
    name: "chrome-blob-navy-left",
    prompt: `${NAVY_BG}
On the solid navy #1F1E35 background, paint an abstract silver chrome liquid splash on the LEFT side (fading off the left edge).
Reflective chrome with droplets, occupying the left ~35% of canvas.
The right 65% is pure solid navy.
No checker pattern.`
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

console.log(`🎨 v8: Regenerando con fondos SÓLIDOS navy/white (sin checker baked-in)`);
for (const p of prompts) await gen(p);
console.log(`\n✅ Done`);
