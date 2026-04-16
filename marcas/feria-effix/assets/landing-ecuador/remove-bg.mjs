// Remover fondo navy de las imágenes → transparencia REAL
import sharp from 'sharp';
import fs from 'node:fs/promises';

const ASSETS = './assets';

// Navy sólido del site #1F1E35 (31, 30, 53)
// Card-black (para cards imágenes) #0A0A14 (10, 10, 20)
// Tolerance generoso para capturar variaciones de compresión

async function removeColorBg(inputPath, targets) {
  // Leer completamente antes de procesar (para liberar handle)
  const image = sharp(inputPath).ensureAlpha();
  const { width, height } = await image.metadata();
  const raw = await image.raw().toBuffer();
  const out = Buffer.alloc(raw.length);
  raw.copy(out);

  let changed = 0;
  for (let i = 0; i < raw.length; i += 4) {
    const r = raw[i], g = raw[i + 1], b = raw[i + 2];

    for (const t of targets) {
      const dr = Math.abs(r - t.r);
      const dg = Math.abs(g - t.g);
      const db = Math.abs(b - t.b);
      const dist = dr + dg + db;

      if (dist < t.tolerance) {
        const ratio = dist / t.tolerance;
        out[i + 3] = Math.round(ratio * 255);
        changed++;
        break;
      }
    }
  }

  // Escribir a archivo temp, luego renombrar (evita lock en Windows)
  const tempPath = inputPath + '.tmp.png';
  await sharp(out, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(tempPath);
  await fs.rm(inputPath);
  await fs.rename(tempPath, inputPath);

  const pct = ((changed / (width * height)) * 100).toFixed(1);
  console.log(`   ✅ ${inputPath.split('/').pop()} — ${pct}% transparente (${width}x${height})`);
}

// TARGETS
const navyTargets = [{ r: 31, g: 30, b: 53, tolerance: 55 }];
const cardTargets = [{ r: 10, g: 10, b: 20, tolerance: 35 }];
// Checker pattern — blanco + gris claro (NanoBanana transparency indicator baked)
const checkerTargets = [
  { r: 255, g: 255, b: 255, tolerance: 20 },   // blanco
  { r: 230, g: 230, b: 230, tolerance: 25 },   // gris muy claro
  { r: 204, g: 204, b: 204, tolerance: 25 },   // gris medio
];

const tasks = [
  // Stickers (fondos navy)
  { in: `${ASSETS}/nb/sticker-circulo-logo.png`,      targets: navyTargets },
  { in: `${ASSETS}/nb/sticker-se-parte.png`,          targets: navyTargets },
  { in: `${ASSETS}/nb/sticker-nuestras-versiones.png`,targets: navyTargets },
  { in: `${ASSETS}/nb/sticker-preguntas.png`,         targets: navyTargets },
  // Chrome blobs (fondos navy)
  { in: `${ASSETS}/nb/chrome-blob-1.png`,             targets: navyTargets },
  { in: `${ASSETS}/nb/chrome-blob-2.png`,             targets: navyTargets },
  // Kit cards (fondos card-black)
  { in: `${ASSETS}/nb-v9/card-playbook-hero.png`,     targets: cardTargets },
  { in: `${ASSETS}/nb-v9/card-directorio-hero.png`,   targets: cardTargets },
  { in: `${ASSETS}/nb-v9/card-whatsapp-hero.png`,     targets: cardTargets },
  // Phone mockup (CHECKER PATTERN baked-in — NanoBanana lo pintó como píxeles)
  { in: `${ASSETS}/nb-v6/whatsapp-phone-mockup.png`,  targets: checkerTargets },
];

// Sticker "¿qué es?" tiene fondo blanco — skip (ya funciona bien con multiply)

console.log(`🎨 Procesando ${tasks.length} imágenes para remover fondos opacos`);
for (const task of tasks) {
  try {
    const stats = await fs.stat(task.in);
    if (stats.isFile()) {
      await removeColorBg(task.in, task.targets);
    }
  } catch (err) {
    console.error(`   ❌ ${task.in} — ${err.message}`);
  }
}

console.log(`\n✅ Done — todas las imágenes ahora con transparencia real`);
