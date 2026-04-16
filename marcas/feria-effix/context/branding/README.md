---
titulo: Branding Feria Effix 2026 — índice
actualizado: 2026-04-16
---

# Branding Feria Effix 2026

Extracción real del sitio y redes oficiales para usar como **fuente de verdad** al crear páginas nuevas y generar imágenes con NanoBanana.

## Archivos clave

| Archivo | Para qué |
|---------|----------|
| [`brand-guide.md`](./brand-guide.md) | Guía legible humana — tono, paleta, copy |
| [`brand-profile.json`](./brand-profile.json) | Datos estructurados — consumo programático |
| [`output/01-profile.json`](./output/01-profile.json) | Raw Apify profile |
| [`output/02-posts.json`](./output/02-posts.json) | Raw Apify 60 posts |
| [`output/03-summary.json`](./output/03-summary.json) | Resumen analítico posts |
| `scrape-instagram.mjs` | Re-ejecutar scraping (usa Node, requiere fix DNS o usar curl-version) |
| `parse-instagram.mjs` | Parser de los raw |

## Assets físicos descargados

Ubicación: `../../assets/branding/`

- `logos/` — logos oficiales 2025/2026 + títulos brandeados en .webp
- `iconos/` — iconos de secciones y personas target
- `decoradores/` — elementos decorativos
- `versiones-previas/` — info cards de ediciones 2021–2025
- `instagram/` — profile pic HD

## Cómo re-ejecutar el scraping

**Instagram (Apify):** usa curl para evitar DNS issue de Node:

```bash
TOKEN="$APIFY_API_TOKEN"
OUT="./output"

# Profile
curl -sS --ssl-no-revoke -X POST \
  "https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=$TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"usernames":["feriaeffix"]}' \
  -o "$OUT/01-profile.json"

# Posts últimos 60 (incluye Reels)
curl -sS --ssl-no-revoke -X POST \
  "https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=$TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"directUrls":["https://www.instagram.com/feriaeffix/"],"resultsType":"posts","resultsLimit":60,"addParentData":true}' \
  -o "$OUT/02-posts.json"

# Re-parsear
node parse-instagram.mjs
```

## Pendientes / mejoras posibles

- [ ] Extraer CSS literal del sitio (requiere browserless o headless Chrome — Cloudflare bloquea curl directo)
- [ ] Scrape de IG Stories highlights (los 7 destacados) con actor dedicado
- [ ] Scrape TikTok @feriaeffix con apify~tiktok-scraper
- [ ] Scrape YouTube @feriaeffix con apify~youtube-scraper
- [ ] Descargar videos top 5 de IG para reutilizar como assets
- [ ] Inspeccionar DOM en navegador y confirmar hex exactos de la paleta
