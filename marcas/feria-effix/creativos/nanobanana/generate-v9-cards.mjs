// V9: 3 imágenes hero premium para las 3 tarjetas verticales del Kit
import fs from "node:fs/promises";

const API_KEY = process.env.GEMINI_API_KEY || (() => { throw new Error("GEMINI_API_KEY env var required"); })();
const MODEL = "nano-banana-pro-preview";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUT = "./output-v9";
await fs.mkdir(OUT, { recursive: true });

// Fondos matching card-black (#0A0A14) para que se fundan limpios
const CARD_BG = `
CRITICAL BACKGROUND RULE: The image background MUST be SOLID DARK #0A0A14 (near black, slight blue tint).
NO checker pattern, NO transparency, NO gray squares.
The entire canvas is filled with solid #0A0A14.
`;

const prompts = [
  {
    name: "card-playbook-hero",
    prompt: `${CARD_BG}
On the solid dark #0A0A14 background, render a premium 3D illustration for "PLAYBOOK FERIA EFFIX 2026" card hero.
Scene: A premium closed book floating at slight angle, with bright golden edges/spine glowing,
a yellow bookmark ribbon hanging from the top, chrome liquid mercury droplets splashing around it,
glowing yellow stars and sparks emanating from the book.
The book cover shows subtle "2026" text and a minimalist Feria Effix style mark.
Lighting: premium spotlight from upper-right, creating dramatic shadows.
Composition: book centered, taking up 60-70% of canvas, background empty dark.
Aesthetic: Apple product render meets urban sticker culture.
1:1 aspect ratio. Solid #0A0A14 background fills canvas completely.`
  },
  {
    name: "card-directorio-hero",
    prompt: `${CARD_BG}
On the solid dark #0A0A14 background, render a premium 3D illustration for "DIRECTORIO 30 PARTNERS" card hero.
Scene: 30 small golden circular nodes arranged in an organic network pattern, connected by thin glowing golden lines,
forming a constellation-like web. Each node has a tiny icon inside (some look like payment cards, logistics boxes, shopping carts).
Central area has a larger golden glowing sphere with "30" written in bold display font.
Chrome liquid droplets floating between nodes.
Premium spotlight lighting.
Composition: network fills 70% of canvas, background empty dark.
1:1 aspect ratio. Solid #0A0A14 background.`
  },
  {
    name: "card-whatsapp-hero",
    prompt: `${CARD_BG}
On the solid dark #0A0A14 background, render a premium 3D illustration for "WHATSAPP COMMUNITY" card hero.
Scene: A modern smartphone at slight 3D tilt with glowing green WhatsApp-style screen,
chat bubbles floating around the phone in 3D space, small avatar circles connecting with glowing green lines,
chrome liquid splashes, green glowing particles.
The phone screen shows the WhatsApp community interface with "EL CÍRCULO EC'26" visible in the header.
Green (#25D366) glow emanating from the screen.
Premium lighting.
Composition: phone centered, filling 60-70%, background empty dark.
1:1 aspect ratio. Solid #0A0A14 background.`
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

console.log(`🎨 v9: 3 card hero illustrations con fondo solid matching card-black`);
for (const p of prompts) await gen(p);
console.log(`\n✅ Done`);
