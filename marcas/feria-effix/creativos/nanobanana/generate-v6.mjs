// V6: Community WhatsApp Ecuador — backgrounds + photos + mockups
import fs from "node:fs/promises";

const API_KEY = process.env.GEMINI_API_KEY || (() => { throw new Error("GEMINI_API_KEY env var required"); })();
const MODEL = "nano-banana-pro-preview";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUT = "./output-v6";
await fs.mkdir(OUT, { recursive: true });

const BRAND = `
Style: Feria Effix 2026 brand aesthetic — urban sticker/graffiti culture meets premium ecommerce.
Palette: dark navy blue background #1F1E35, chrome silver metallic accents, lilac purple #A89FD4 touches, pops of bright yellow #FFD700.
Mood: energetic, aspirational, Latino youth entrepreneurial, premium but accessible.
Context: Ecuador (Quito, Guayaquil, Cuenca) — ecommerce, dropshipping, digital commerce community.
`;

const prompts = [
  {
    name: "hero-bg-ecuador",
    prompt: `${BRAND}
Generate a HERO BACKGROUND IMAGE (1600x1200 landscape PNG).
Scene: Cinematic night view of Guayaquil/Quito skyline with subtle neon lights, dark navy sky with chrome liquid splashes emerging from corners,
silhouettes of Latino entrepreneurs in the distance working on laptops/phones.
Heavy atmospheric depth: foreground darker, middle with glowing lights, background softly blurred.
Space for text overlay: the composition should have a darker gradient in the top-center area for text readability.
NO text, NO logos, NO people faces clearly visible — this is an atmospheric backdrop.`
  },
  {
    name: "section-bg-whatsapp",
    prompt: `${BRAND}
Generate an ATMOSPHERIC SECTION BACKGROUND (1600x900 PNG).
Scene: Abstract representation of connected network — glowing green WhatsApp-like connection lines flowing through a dark navy space,
chrome liquid droplets, subtle chat bubbles floating, digital particles.
Very dark overall, suitable for text overlay.
Aesthetic: cyberpunk meets urban LATAM, premium feel.`
  },
  {
    name: "section-bg-community",
    prompt: `${BRAND}
Generate a COMMUNITY VIBES background (1600x900 PNG).
Scene: Abstract group of connected silhouettes (Latin American entrepreneurs/merchants) forming a circle,
rendered as golden-chrome wireframes on dark navy, interconnected by bright chrome network lines,
floating yellow stars around them.
Atmospheric depth, no distinct faces, cinematic mood.`
  },
  {
    name: "whatsapp-phone-mockup",
    prompt: `${BRAND}
Generate a SMARTPHONE MOCKUP (800x1400 vertical PNG with transparent background).
Show a realistic iPhone-style smartphone from slight 3D angle, screen displaying a WhatsApp Community chat interface
titled "EL CÍRCULO EFFIX ECUADOR" in the header.
Chat shows 4-5 message bubbles with Latin Spanish text snippets (e.g. "Ya subí el playbook!", "Alguien con experiencia en envíos a GYE?", "Miércoles 7PM sesión en vivo 🔥").
Visible member count badge "847 miembros". Yellow accent notification dot on the phone.
Phone has chrome/silver metallic finish. Transparent background (only the phone element).
High detail, premium render.`
  },
  {
    name: "chrome-splash-hero",
    prompt: `${BRAND}
Generate a CHROME LIQUID MERCURY SPLASH (1200x600 horizontal PNG transparent background).
A dynamic silver chrome liquid splash frozen mid-air, highly reflective with realistic reflections of yellow star particles.
Organic drippy shape, some droplets separating. Should look like molten mercury poured across the canvas horizontally.
Transparent background. Ultra-detailed chrome texture.`
  },
  {
    name: "stars-burst-sticker",
    prompt: `${BRAND}
Generate a STAR BURST STICKER (1000x1000 PNG transparent background).
A bright yellow 8-pointed star burst shape (like Soviet-era star burst or Japanese sale sticker),
with black outline around the star shape, slight rotation, shiny highlight.
Inside the star: white sticker text in bold display font "SOLO 1000 CUPOS" in multiple lines.
Outer yellow, 8px black stroke, white text inside with 3px black stroke.
Transparent background. Sticker peel-corner effect.`
  },
  {
    name: "testimonial-guayaquil",
    prompt: `${BRAND}
Generate a PHOTO-REALISTIC HEADSHOT (600x600 square PNG).
A confident Latino man in his 30s from Guayaquil, Ecuador — entrepreneur look,
wearing a casual but polished shirt, subtle smile, warm natural lighting,
dark navy textured background with subtle chrome bokeh.
High quality, editorial photography style, authentic, not overly polished.`
  },
  {
    name: "testimonial-quito",
    prompt: `${BRAND}
Generate a PHOTO-REALISTIC HEADSHOT (600x600 square PNG).
A Latina woman in her late 20s from Quito, Ecuador — entrepreneur/ecommerce founder,
professional but modern look, confident expression, warm indoor lighting,
dark navy background with lilac bokeh hints.
Editorial photography style, natural authentic beauty, not overly edited.`
  },
  {
    name: "testimonial-cuenca",
    prompt: `${BRAND}
Generate a PHOTO-REALISTIC HEADSHOT (600x600 square PNG).
A Latino man in his early 40s from Cuenca, Ecuador — mature ecommerce merchant,
slightly rugged look, smart casual outfit, friendly grounded expression,
dark navy textured background with chrome reflections.
Editorial photography style, authentic, approachable.`
  },
  {
    name: "community-preview",
    prompt: `${BRAND}
Generate a COMMUNITY PREVIEW COLLAGE (1200x800 PNG).
Scene: A montage/collage showing 6-8 small photo squares arranged in a grid, each showing a different Latino entrepreneur in action:
one packing boxes, one on laptop, one selling on phone, one with product photos, one in a warehouse, one with a delivery,
one managing social media, one celebrating a sale.
Each photo has a subtle navy tint and chrome border. Background between photos is dark navy with chrome splashes.
Photo-realistic, authentic Ecuadorian entrepreneur vibe.`
  },
  {
    name: "dropshipping-visual",
    prompt: `${BRAND}
Generate a DROPSHIPPING HERO ILLUSTRATION (1200x800 PNG transparent or navy background).
Scene: 3D render of packages/boxes floating above a chrome surface with shipping labels visible,
golden arrows showing flow from warehouse to doorstep, world map subtly in background with Ecuador highlighted,
chrome liquid details, subtle yellow glow accents.
Premium commerce aesthetic, no text on the boxes except generic shipping marks.`
  },
  {
    name: "ecommerce-charts",
    prompt: `${BRAND}
Generate an ECOMMERCE GROWTH VISUALIZATION (1200x800 PNG transparent background).
Scene: 3D golden chart bars growing upward with a chrome shopping cart on top,
glowing arrow trending up to the right, scattered yellow stars,
floating percentage symbols (+40%, +150%), chrome liquid spillage,
all on a dark navy atmospheric backdrop.
Premium growth success aesthetic, aspirational.`
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

console.log(`🎨 v6: Generando ${prompts.length} assets community WhatsApp Ecuador`);
for (const p of prompts) await generate(p);
console.log(`\n✅ Done`);
