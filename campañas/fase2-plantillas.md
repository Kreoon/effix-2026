---
tags:
  - google-ads
  - feria-effix
  - campaña
  - plantilla
created: "2026-03-19"
fase: 2-3
status: plantilla
---

# Plantillas de Campañas — Fase 2 y 3

> Estas plantillas se activarán cuando la cuenta tenga suficiente data de conversiones (~30+ conversiones) y se entre en Fase 2 (Junio 2026).

---

## Campaña: YouTube Awareness

| Parámetro | Valor |
|---|---|
| **Nombre** | [YouTube] Awareness Effix \| Fase 1-2 |
| **Tipo** | Video |
| **Subtipo** | In-stream skippable + In-feed |
| **Bidding** | Target CPV ($0.03-0.05 objetivo) |
| **Budget** | 30% de Fase 1 = ~$3,000 |
| **Audiencias** | Intereses: ecommerce, marketing digital, emprendimiento |
| **Geo** | Colombia + LATAM |

**Assets necesarios:**
- [ ] Video VSL 30-60s (hook en primeros 5s)
- [ ] Video testimonial 15-30s
- [ ] Video recap edición anterior 15s (bumper)
- [ ] Thumbnails para In-feed

**Script base (In-stream 30s):**
```
[0-5s] ¿Sabías que hay una feria donde +140,000 emprendedores de ecommerce se reúnen?
[5-15s] Feria Effix 2026 — 3 días en Plaza Mayor, Medellín. 8 auditorios, mentorías exclusivas, networking con los líderes del ecommerce de LATAM.
[15-25s] General, VIP o Black Ticket — elige tu experiencia.
[25-30s] 16-18 de octubre. Inscríbete en feriaeffix.com
```

---

## Campaña: Display Remarketing

| Parámetro | Valor |
|---|---|
| **Nombre** | [Display] Remarketing \| Fase 1-2 |
| **Tipo** | Display |
| **Bidding** | Target CPA ($60-80) |
| **Budget** | 15% de Fase 1 = ~$1,500 |
| **Audiencias** | Visitantes sitio (7-30d), Video viewers (YouTube 50%+), Customer Match |
| **Exclusiones** | Compradores (excluir conversiones) |

**Secuencia de remarketing (Fase 2):**
1. **Día 1-3 post-visita:** Beneficios del evento (8 auditorios, 140K asistentes)
2. **Día 4-7:** Social proof (testimoniales, fotos evento anterior)
3. **Día 8-14:** Precio + cuotas + urgencia suave
4. **Día 15-30:** Countdown + "últimos cupos" + FOMO

**Assets necesarios (por tamaño):**
- [ ] 300x250 (medium rectangle)
- [ ] 336x280 (large rectangle)
- [ ] 728x90 (leaderboard)
- [ ] 160x600 (wide skyscraper)
- [ ] 320x50 (mobile banner)
- [ ] Responsive display ads (logo + imágenes + headlines)

---

## Campaña: Demand Gen (Fase 2)

| Parámetro | Valor |
|---|---|
| **Nombre** | [Demand Gen] Mid-Funnel \| Fase 2 |
| **Tipo** | Demand Gen |
| **Bidding** | Max Conversions |
| **Budget** | $150-200/semana |
| **Audiencias** | Lookalike de compradores + video viewers |
| **Formatos** | Carrusel (speakers, venue) + single image + video |

**Carrusel sugerido:**
1. Slide 1: "Feria Effix 2026" + imagen venue
2. Slide 2: Speaker destacado + quote
3. Slide 3: "140K+ asistentes en 5 ediciones" + foto público
4. Slide 4: "Mentorías exclusivas Black Ticket" + foto mentoring
5. Slide 5: CTA "Inscríbete ahora" + precio

---

## Campaña: Performance Max (Fase 2+)

| Parámetro | Valor |
|---|---|
| **Nombre** | [PMax] Effix All Tickets \| Fase 2 |
| **Tipo** | Performance Max |
| **Bidding** | Max Conversions (→ Target ROAS cuando haya data) |
| **Budget** | 10% → escalar si ROAS >12:1 |
| **Señales de audiencia** | Customer Match, visitantes sitio, intereses ecommerce |

**Asset groups:**
1. **General Ticket** — headlines, descriptions, imágenes para ticket general
2. **VIP Ticket** — headlines, descriptions, imágenes para ticket VIP
3. **Black Ticket** — headlines, descriptions, imágenes para ticket Black

> **IMPORTANTE:** No lanzar PMax sin al menos 30 conversiones en la cuenta. Smart bidding necesita data.

---

## Campaña: Search Push Final (Fase 3)

| Parámetro | Valor |
|---|---|
| **Nombre** | [Search] Push Final \| Fase 3 |
| **Tipo** | Search |
| **Bidding** | Target CPA ($60) — bajar CPA para push |
| **Budget** | $50-60/día (concentrar presupuesto) |
| **Modificadores** | +20% bid en keywords high-intent |

**Keywords adicionales Fase 3:**
```
"últimas boletas feria effix"
"feria effix octubre 2026"
"boletas feria medellín octubre"
"conferencia ecommerce octubre"
"effix precio boleta"
"cuánto cuesta feria effix"
```

**Copy urgencia:**
```
H1: Feria Effix 2026 — Últimos Cupos
H2: {COUNTDOWN(2026-10-16)} Para el Evento
H3: Precio Final — No Esperes Más
D1: Últimas boletas disponibles para la feria de ecommerce más grande de LATAM. 16-18 Oct, Plaza Mayor Medellín. No te quedes fuera.
D2: +140,000 asistentes en 5 ediciones. General, VIP y Black Ticket. Compra ahora antes de que se agoten. Paga en cuotas.
```

---

## Campaña: Geo-targeted Medellín (Fase 3)

| Parámetro | Valor |
|---|---|
| **Nombre** | [Search] Medellín Local \| Fase 3 |
| **Tipo** | Search |
| **Bidding** | Max Conversions |
| **Budget** | $20/día (últimas 2 semanas) |
| **Geo** | Medellín + radio 50km |
| **Inicio** | 2 semanas antes del evento |

**Keywords:**
```
"eventos este fin de semana medellín"
"que hacer en medellín"
"plaza mayor eventos octubre"
"feria medellín octubre"
```

> Last-minute buyers. CPA más bajo porque ya están en la ciudad.

---

## Checklist pre-lanzamiento Fase 2

- [ ] Mínimo 30 conversiones acumuladas
- [ ] Landing pages General y VIP creadas y con tracking
- [ ] Assets de video listos (VSL, testimoniales)
- [ ] Banners display diseñados (todos los tamaños)
- [ ] Audiencias de remarketing con >1,000 usuarios
- [ ] Customer Match list actualizada
- [ ] Review de search terms de Fase 1 completado
- [ ] Negativos actualizados
