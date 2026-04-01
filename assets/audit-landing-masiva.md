---
title: Auditoría Landing Venta Masiva v1 — Feria Effix 2026
fecha: 2026-03-31
archivo: assets/landing-venta-masiva-v1.html
auditor: Creative Quality Agent
score_total: 98/120
---

# Auditoría CRO — Landing Venta Masiva v1

## Resumen Ejecutivo

**Score general: 98 / 120 (82%) — Grado B+**

La landing está técnicamente sólida y contiene la mayoría de los elementos de conversión esenciales. El Stage Manager JS es el punto más fuerte: configurable, robusto y conectado correctamente a todos los `data-stage-*` del HTML. Los defectos principales son de contenido (speakers sin nombres reales, foto del evento placeholder) y algunas fricciones menores de UX que se pueden corregir en 1-2 días sin tocar el código base.

---

## Tabla de Resultados por Categoría

| # | Categoría | Score | Estado |
|---|-----------|-------|--------|
| 1 | CRO Elements Completeness | 8/10 | Bueno |
| 2 | Above-the-fold Impact | 8/10 | Bueno |
| 3 | Stage-based Pricing System | 10/10 | Excelente |
| 4 | Price Timeline Section | 9/10 | Excelente |
| 5 | Comparison Table | 8/10 | Bueno |
| 6 | CTA Frequency & Quality | 9/10 | Excelente |
| 7 | Mobile Responsiveness | 8/10 | Bueno |
| 8 | Social Proof Strength | 7/10 | Aceptable |
| 9 | FAQ Quality | 9/10 | Excelente |
| 10 | Brandbook Compliance | 7/10 | Aceptable |
| 11 | Copy Quality | 9/10 | Excelente |
| 12 | Technical Quality | 9/10 | Excelente |

---

## Análisis Detallado por Categoría

---

### 1. CRO Elements Completeness — 8/10

**Elementos presentes:**
- Countdown: SI — 4 instancias (hero, pricing card, final CTA, exit popup)
- Scarcity/urgency: SI — etapas de precio, barra de anuncio, modo urgente (last 72h)
- Social proof: SI — testimonios, stats, media logos, ediciones pasadas
- Trust badges: SI — "Pago seguro", "Boleta digital", "IVA incluido"
- FAQ: SI — 8 preguntas con acordeón funcional y schema markup
- Exit-intent popup: SI — con countdown duplicado y copy contextual por etapa
- Price anchoring: SI — precio siguiente tachado en hero + savings calculados
- Payment plans (mencion): SI — FAQ menciona cuotas via LaTiquetera

**Elementos faltantes o debiles (-2):**
- **Garantia**: No existe ninguna mencion de politica de reembolso o garantia. Para un ticket de $201,300 COP dirigido a masa, la ausencia de garantia genera friccion. Aunque los eventos tipicamente no la ofrecen, debe haber una clausula de "transferible hasta 15 dias antes" mas visible (actualmente enterrada en FAQ).
- **Contador de boletas disponibles / sold out**: No hay "Quedan X boletas a este precio". Es el elemento de escasez mas efectivo para ventas masivas y esta ausente.

---

### 2. Above-the-fold Impact — 8/10

**Lo que esta en el hero sin scroll:**
- H1 claro con propuesta de valor: SI
- Fecha y lugar: SI (sub-headline)
- Precio actual con USD equivalente: SI
- Countdown con barra de progreso: SI
- CTA principal (gold, full-width mobile): SI
- Trust badges: SI (3 iconos inline)
- Stage badge: SI

**Problemas (-2):**
- **Foto del evento es un placeholder** (`FOTO EVENTO 2025`). La imagen tiene el mayor potencial de impacto emocional above-the-fold — es la principal deuda de contenido de toda la landing. En desktop el lado derecho es un rectangulo gris con texto placeholder.
- **El precio en el CTA principal se repite dos veces** en el mismo elemento (`COMPRAR MI ENTRADA — $201,300 COP`) pero el boton en si no tiene suficiente contraste tactil en mobile — el padding de `py-4 px-8` es correcto pero en mobile se renderiza a full-width sin espacio visual respirable a los lados.

---

### 3. Stage-based Pricing System — 10/10

**Evaluacion del JS Stage Manager:**

El sistema es el mejor elemento tecnico de la landing. Analisis completo:

- `getCurrentStage()` itera correctamente por `PRICING_STAGES[]` comparando `new Date()` vs `new Date(stage.ends)` con zona horaria Bogota (-05:00).
- `updateAllPrices(stage)` hace `querySelectorAll` sobre TODOS los `data-stage-*` atributos — cobertura completa sin hardcode.
- Atributos conectados verificados: `data-stage-price-general`, `data-stage-price-vip`, `data-stage-price-black`, `data-stage-usd-general`, `data-stage-usd-vip`, `data-stage-badge`, `data-stage-countdown-label`, `data-stage-bar-message`, `data-stage-exit-message`, `data-stage-next-price-general`, `data-stage-savings`.
- El calculo de savings es dinamico: `nextTickets.general.price - tickets.general.price` formateado con `toLocaleString('es-CO')`.
- El countdown usa `setInterval(1000)` con modo urgente al llegar a 72h.
- `location.reload()` al expirar la etapa — garantiza transicion automatica.
- `PRICING_STAGES` con 4 etapas y precios consistentes y escalables: $201,300 → $250,000 → $300,000 → $350,000 COP (General).
- La funcion `updateTimeline()` usa `past/current/future` CSS classes correctamente.

**No hay bugs detectados. Score perfecto.**

---

### 4. Price Timeline Section — 9/10

**Desktop (horizontal, 5 columnas):**
- Linea conectora absoluta entre nodos: SI
- Nodos con estados visuales `past/current/future` via CSS classes: SI
- "ESTAS AQUI →" badge en nodo actual: SI
- Etapa "Evento" destacada en accent (rojo) como punto final: SI
- `data-timeline="actual/aumento-1/aumento-2/puerta"` — todos conectados al JS: SI

**Mobile (vertical con linea lateral):**
- Linea vertical `absolute left-3.5`: SI
- Todos los nodos duplicados para mobile: SI
- Precios con "COP" incluido en mobile (mas claro que desktop): SI

**Problema menor (-1):**
- En desktop, los precios del timeline muestran solo el numero sin "COP" (ej. `$201,300`). En mobile si aparece `$201,300 COP`. Esta inconsistencia puede confundir a usuarios internacionales que visiten desde paises con otra moneda. Recomendable agregar "COP" tambien en desktop.

---

### 5. Comparison Table — 8/10

**Evaluacion:**
- Badge "MAS VENDIDA" en columna General: SI — `absolute -top-3` con fondo `bg-primary`
- 3 tiers mostrados (General, VIP, Black): SI
- Border dorado en columna General via `.col-general::before`: SI — CSS pseudo-elemento con `border: 2px solid #C9A84C`
- Features diferenciadas: 6 comunes, 3 VIP+, 3 Black-exclusivas
- CTAs en cada columna: SI — todos linkeados correctamente
- Scroll horizontal en mobile: SI — `.comparison-scroll` con `overflow-x: auto` y `min-width: 600px`

**Problemas (-2):**
- **En mobile el scroll horizontal es poco descubrible** — no hay indicador visual (flecha, sombra lateral) que avise al usuario que hay contenido a la derecha. Un porcentaje alto de usuarios en mobile no vera las columnas VIP y Black.
- **El precio de Black en la tabla muestra "$3,997,000 COP"** en el HTML estatico, pero el JS actualiza con `$3,990,000 COP` desde `PRICING_STAGES[0].tickets.black.label`. Hay un desajuste de $7,000 entre el valor hardcoded en el HTML del `data-stage-price-black` inicial y el configurado en el JS. Antes de que cargue el JS, el usuario ve el precio incorrecto por ~100-200ms. **Riesgo de confianza bajo, pero existe.**

---

### 6. CTA Frequency & Quality — 9/10

**Conteo de CTAs rastreados por GTM:**
1. `cta_nav_click` — Nav desktop
2. `cta_nav_mobile_click` — Nav mobile
3. `cta_hero_click` — Hero principal (con precio dinamico en el texto)
4. `cta_table_general` — Tabla comparativa General
5. `cta_table_vip` — Tabla comparativa VIP
6. `cta_table_black` — Tabla comparativa Black
7. `cta_timeline_click` — Post-timeline
8. `cta_pricing_card` — Pricing card S10
9. `cta_exit_popup` — Exit intent popup
10. `cta_final_click` — Final CTA S12
11. `whatsapp_float_click` — WhatsApp flotante
12. `whatsapp_final_click` — WhatsApp en final CTA

**URLs verificadas:**
- General/VIP → `https://latiquetera.com/site/effix` — correcto
- Black → `/experiencia-black/` — correcto (URL interna)

**Problema menor (-1):**
- **El CTA de la seccion de Speakers** (`Ver lineup completo →`) apunta a `href="#"` — enlace muerto que puede generar confusion. Si el lineup no esta listo, remover el enlace o reemplazar con el anchor `#entradas`.

---

### 7. Mobile Responsiveness — 8/10

**Evaluacion:**
- Viewport meta: SI — `width=device-width, initial-scale=1.0`
- Tailwind mobile-first: SI — clases base mobile, modificadores `md:` y `lg:`
- Touch targets minimos: MAYORMENTE SI — botones con `py-3/py-4` (~48px), WhatsApp float 56px (`w-14 h-14`)
- Font sizes en mobile:
  - H1: `text-4xl` (36px) — adecuado
  - Precios: `text-4xl lg:text-5xl` — correcto
  - CTAs: `text-xs` con `uppercase tracking-widest` — legible aunque pequeño
- Grids adaptativos: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` en beneficios, correcto
- Comparison table scroll: SI

**Problemas (-2):**
- **La barra de anuncio en mobile trunca el texto** con `truncate` — el countdown `id="bar-countdown"` tiene `hidden sm:inline`, lo que significa que en mobile el usuario NO ve el countdown en la barra. Solo ve "PRECIO MAS BAJO DEL AÑO — Sube en" cortado. Se pierde urgencia en el touch point mas visible.
- **Los speakers cards en mobile** son `grid-cols-2` — con 6 placeholders sin nombres reales, esto ocupa espacio valioso sin aportar credibilidad. Una vez que se agreguen speakers reales, revisar si el grid `grid-cols-2 md:grid-cols-3 lg:grid-cols-6` resulta en alturas inconsistentes por nombres largos.

---

### 8. Social Proof Strength — 7/10

**Lo que tiene:**
- 3 testimonios con nombre, ciudad y quote especifico: SI — quotes bien escritos con resultados concretos ("duplicaron mi margen", "facturo 10x", "vale cada peso")
- Avatars con iniciales: SI — `ML`, `DR`, `VG`
- Media logos: SI — El Tiempo, Semana, Portafolio, RCN, Teleantioquia
- Impact box con $23M USD impacto economico: SI
- Ediciones pasadas con contadores animados (2021-2025): SI — narrativa de crecimiento poderosa
- Stats strip: 49,256 asistentes, 380+ marcas, 180+ conferencias: SI

**Deficiencias importantes (-3):**
- **Los logos de medios son solo texto** con `opacity: 0.25`. No son imagenes reales. Para usuarios que no conozcan esos medios, no transmiten credibilidad. Mas critico: sin imagenes reales, se podrian percibir como inventados.
- **Los speakers son todos placeholders** ("Speaker 2026 / Por confirmar"). Esta seccion en su estado actual hace mas dano que bien — comunica falta de organizacion. Se deberia ocultar con `display: none` hasta tener al menos 3-4 speakers reales.
- **Los testimonios son anonimos** (solo iniciales + ciudad). Para venta masiva funciona, pero sin foto real la credibilidad es limitada. Al menos uno deberia tener foto y nombre completo.
- **No hay numero de boletas vendidas** / "X personas ya compraron" como prueba social en tiempo real.

---

### 9. FAQ Quality — 9/10

**Evaluacion:**
- 8 preguntas: SI — cubre los temas criticos: que incluye, pago en cuotas, upgrade, precio subira, grupos, viajeros, parqueadero, transferencia
- Acordeon funcional: SI — event delegation en `#faq-container`, cierra otros al abrir uno, aria-expanded correcto
- Schema markup FAQPage: SI — 3 preguntas en JSON-LD (subset de las 8 del HTML)
- Respuestas con links accionables (WhatsApp): SI — 2 respuestas incluyen `wa.me` directo

**Problema menor (-1):**
- **El schema FAQPage solo incluye 3 de las 8 preguntas** del HTML. Las 5 preguntas restantes (upgrade, grupos, viaje internacional, parqueadero, transferencia) no estan en el JSON-LD. Google puede indexar y mostrar en rich snippets las preguntas del schema — incluir las 8 maximizaria la visibilidad organica.

---

### 10. Brandbook Compliance — 7/10

**Evaluacion contra design-system.md:**

| Elemento | Brandbook | Landing | Estado |
|----------|-----------|---------|--------|
| Font display | Bebas Neue | Montserrat | DESVIACION |
| Font body | DM Sans | Montserrat | DESVIACION |
| bg-primary | #000000 | #000 | OK |
| accent-gold | #C9A84C | #C9A84C | OK |
| accent-red | #C0392B | #C0392B | OK |
| secondary | #726E8D | #726E8D | OK |
| bg-card | #1A1A1A | #1A1A1A (surface) | OK |
| radius-lg | 12px | `rounded-xl` (12px) | OK |
| shadow-gold | `0 4px 20px rgba(201,168,76,0.3)` | SI — en hero y pricing card | OK |
| Button min-height | 48px | `py-4` (~48px OK) | OK |
| Countdown separador rojo | #C0392B | NO usa separador ":" visible | MENOR |
| WhatsApp pulse | ring expanding | `wa-ping` animation | OK |
| Announcement bar closeable | SI | SI | OK |

**Desviacion principal (-3):**
- **La landing usa Montserrat (peso 400/700/900) en lugar de Bebas Neue + DM Sans** definidos en el brandbook. El Tailwind config declara `font-headline: ["Montserrat"]` y `font-body: ["Montserrat"]`. Esto es una decision deliberada pero no esta documentada — Montserrat es adecuado para venta masiva (mas legible que Bebas Neue en textos largos), pero implica que esta landing tiene identidad tipografica distinta al resto del ecosistema Effix. Si otras landing pages usan Bebas Neue, habra inconsistencia de marca.
- **El countdown no muestra el separador ":" en rojo** entre bloques (definido en design-system.md como `color #C0392B`). Los bloques estan separados visualmente solo por el grid gap, no por separadores de puntos.

---

### 11. Copy Quality — 9/10

**Evaluacion:**
- Tono masa-mercado (no elitista): SI — lenguaje accesible, "cada peso", "tu negocio", "primer Effix"
- Verbos de accion: SI — "Compra hoy", "Sal del evento con", "Asegura tu lugar"
- Urgencia sin exageracion: SI — precio subira verificable, no "oferta de una vez en la vida"
- Espanol correcto con tildes: MAYORMENTE SI
- Propuesta de valor clara: SI — H1 + sub + stats

**Problemas (-1):**
- **Incoherencia numerica**: El stats strip dice "50,000+ emprendedores" en el card de Networking, pero el stat animado dice 49,256 asistentes. La seccion de ediciones pasadas confirma 49,256 en 2025. El copy "50,000+" en el beneficio es redondeado pero puede percibirse como inconsistente si el usuario lo compara con el contador animado.
- **"1,200 empleos directos"** en el impact box no tiene fuente. Para un usuario critico suena a cifra inventada. Un pie de pagina "(Impacto economico estimado, edicion 2025)" aumentaria la credibilidad.
- La pregunta del FAQ "Hay parqueadero en el evento?" no tiene tilde en "Hay" — deberia ser "¿Hay parqueadero...?". Revision general de signos de apertura (¿ ¡) necesaria.

---

### 12. Technical Quality — 9/10

**Evaluacion:**
- HTML5 semantico: SI — `<header>`, `<nav>`, `<section>`, `<footer>`, `<main>` ausente pero no critico
- `lang="es"`: SI
- OG Tags completos: SI — title, description, url, image, twitter card
- Schema Event JSON-LD: SI — con location, organizer, offers
- Schema FAQPage JSON-LD: SI (parcial — ver categoria 9)
- GTM implementado: SI — GTM-TLRMK246, noscript fallback presente
- `prefers-reduced-motion`: SI — implementado correctamente en CSS
- GPU-only animations: SI — solo `transform` y `opacity` (cumple brandbook)
- aria-labels en iconos SVG: SI — `aria-hidden="true"` en decorativos, `aria-label` en interactivos
- `aria-expanded` en FAQ: SI — actualizado dinamicamente
- `aria-modal` en exit popup: SI
- `rel="noopener"` en target="_blank": SI — todos los links externos lo tienen
- Smooth scroll nativo + JS offset para nav sticky: SI — considera altura de nav y barra de anuncio
- `tabular-nums` en contadores: SI

**Problemas menores (-1):**
- **No hay etiqueta `<main>`** envolviendo el contenido principal. Impacto en accesibilidad para usuarios con screen readers.
- **Tailwind CDN en produccion**: El archivo usa `cdn.tailwindcss.com` con `plugins=forms,container-queries`. Para produccion, el CDN de Tailwind incluye TODAS las clases (~3MB sin purgar). Esto impacta negativamente el Core Web Vitals (LCP/FCP). Si esta landing va a recibir trafico de Google Ads a escala, se deberia compilar Tailwind o usar una version purged.
- **El `<script id="tailwind-config">` esta en el `<head>` despues del link de Google Fonts** pero antes de que Tailwind CDN cargue — en la practica funciona porque Tailwind CDN escanea el DOM, pero el orden podria causar un FOUC (flash of unstyled content) en conexiones lentas.

---

## Matriz de Prioridades

### Critico — Resolver antes de lanzar trafico pago

| ID | Problema | Impacto en conversion | Esfuerzo |
|----|----------|-----------------------|----------|
| C1 | Foto del evento placeholder en hero desktop | Alto — primera impresion | Bajo (agregar imagen) |
| C2 | Speakers section con placeholders | Alto — destruye credibilidad | Bajo (ocultar seccion o agregar datos reales) |
| C3 | Tailwind CDN en produccion (3MB+ sin purgar) | Alto — Core Web Vitals / Score de calidad Google Ads | Alto (compilar Tailwind) |
| C4 | Conteo de boletas disponibles ausente | Alto — escasez especifica ausente | Medio |

### Alto — Resolver en la primera semana

| ID | Problema | Impacto | Esfuerzo |
|----|----------|-----------------------|----------|
| A1 | Scroll horizontal en tabla no descubrible en mobile | Medio-alto — VIP y Black invisibles en mobile | Bajo (agregar sombra lateral CSS) |
| A2 | Countdown oculto en barra de anuncio mobile | Medio — se pierde urgencia en primer elemento visible | Bajo (cambiar `hidden sm:inline` a visible) |
| A3 | Schema FAQPage incompleto (3 de 8 preguntas) | Medio — oportunidad SEO perdida | Bajo (copiar preguntas al JSON-LD) |
| A4 | `<main>` ausente | Medio — accesibilidad | Bajo |
| A5 | Logo medios de comunicacion como texto plano | Medio — credibilidad reducida | Medio (conseguir/crear logos SVG) |

### Medio — Mejoras para optimizacion continua

| ID | Problema | Impacto | Esfuerzo |
|----|----------|-----------------------|----------|
| M1 | Desajuste $7,000 en precio Black HTML vs JS | Bajo-medio — confianza | Muy bajo (cambiar "$3,997,000" a "$3,990,000" en HTML) |
| M2 | Testimonios sin foto real | Medio — conversion de indecisos | Medio |
| M3 | CTA de Speakers apunta a `#` | Bajo | Muy bajo |
| M4 | Inconsistencia 49,256 vs "50,000+" en copy | Bajo | Muy bajo |
| M5 | "COP" faltante en timeline desktop | Bajo | Muy bajo |
| M6 | Garantia/politica reembolso ausente | Medio | Bajo |
| M7 | Font discrepancia (Montserrat vs Bebas Neue+DM Sans) | Bajo — si el ecosistema es consistente en Montserrat | Medio |
| M8 | Tildes de apertura faltantes en FAQ | Muy bajo | Muy bajo |

---

## Quick Wins (implementables en menos de 2 horas)

1. **Ocultar seccion Speakers**: Agregar `style="display:none"` o `hidden` al `<section id="speakers">` hasta tener datos reales.
2. **Corregir precio Black en HTML**: Cambiar `$3,997,000 COP` a `$3,990,000 COP` en la linea ~610 de la tabla.
3. **Completar schema FAQPage**: Agregar las 5 preguntas faltantes al JSON-LD (lineas 56-87).
4. **CTA Speakers a `#entradas`**: Cambiar `href="#"` por `href="#entradas"` en linea 558.
5. **Hacer countdown visible en mobile en la barra**: Quitar `hidden sm:inline` del `id="bar-countdown"`, reducir font-size a `text-[10px]`.
6. **Agregar sombra lateral a tabla**: CSS ``.comparison-scroll { -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%); }`` para indicar scroll horizontal.
7. **Agregar `<main>`**: Envolver todo el contenido entre `<header>` y `<footer>` con `<main>`.

---

## Notas sobre el Stage Manager (para el equipo Effix)

El bloque `PRICING_STAGES` en la linea ~1374 es la unica seccion que el equipo operativo necesita editar. Cambiar precios, fechas o mensajes no requiere conocimiento de JavaScript — solo editar los valores dentro del array. Las fechas usan timezone `-05:00` (Bogota) correctamente. El sistema es production-ready.

**Unico riesgo operativo**: Si el servidor donde corre la landing tiene un timezone distinto a Bogota, el `new Date()` del cliente (navegador) usara el timezone LOCAL del visitante, lo que es correcto para un evento en Colombia. No hay dependencia de server-side para el Stage Manager.

---

*Auditoria generada por Creative Quality Agent — 2026-03-31*
