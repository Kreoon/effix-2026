// Scraping profundo Instagram @feriaeffix con Apify
// Actor: apify~instagram-scraper (full profile + posts + reels)

const TOKEN = process.env.APIFY_API_TOKEN || (() => { throw new Error("APIFY_API_TOKEN env var required"); })();
const OUT_DIR = "./output";

const fs = await import("node:fs/promises");
await fs.mkdir(OUT_DIR, { recursive: true });

async function runActor(actor, input, filename) {
  const url = `https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items?token=${TOKEN}`;
  console.log(`\n⏳ ${actor} → ${filename}`);
  const t0 = Date.now();
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  console.log(`   HTTP ${r.status} (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
  if (!r.ok) {
    console.error("   ❌ " + (await r.text()).slice(0, 300));
    return null;
  }
  const items = await r.json();
  await fs.writeFile(`${OUT_DIR}/${filename}`, JSON.stringify(items, null, 2));
  console.log(`   ✅ ${items.length} items → ${filename}`);
  return items;
}

// 1) Profile details (bio, followers, profile pic, highlights)
await runActor(
  "apify~instagram-profile-scraper",
  { usernames: ["feriaeffix"] },
  "01-profile.json"
);

// 2) Posts + Reels (últimos 60)
await runActor(
  "apify~instagram-scraper",
  {
    directUrls: ["https://www.instagram.com/feriaeffix/"],
    resultsType: "posts",
    resultsLimit: 60,
    addParentData: true,
  },
  "02-posts.json"
);

// 3) Hashtag posts para contexto de marca (opcional)
// await runActor(
//   "apify~instagram-hashtag-scraper",
//   { hashtags: ["feriaeffix", "effix2026"], resultsLimit: 30 },
//   "03-hashtag.json"
// );

console.log("\n✅ Scraping completo. Revisa ./output/");
