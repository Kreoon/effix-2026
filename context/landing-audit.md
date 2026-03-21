---
tags:
  - google-ads
  - feria-effix
  - landing-page
  - auditoria
created: "2026-03-19"
fuente: Downloads/effix-black-proyecto/effix-black/index.html
---

# Auditoría Landing Page — Black Ticket Feria Effix 2026

## Estado actual

| Aspecto | Estado | Detalle |
|---|---|---|
| **URL actual** | feriaeffix.com/estrategia-google-ads/ | ⚠️ Cambiar a /experiencia-black/ |
| **Ticket** | Solo Black ($997) | NO existen landings General ni VIP |
| **GTM** | ✅ IMPLEMENTADO | GTM-TLRMK246, V5, 3 etiquetas activas |
| **GA4** | ✅ IMPLEMENTADO | G-CRXZ50VX7D, recibiendo datos |
| **Conversiones** | ✅ ACTIVAS | Black pago completo + Black cuotas |
| **Remarketing** | ✅ ACTIVO | Todas las páginas |
| **Nota general** | 7.2/10 | Auditado en bitácora v4 |

## Análisis técnico

### Stack
- HTML puro + CSS inline (single-page, no framework)
- Fonts: Bebas Neue, DM Sans, DM Serif Display (Google Fonts)
- Animaciones CSS: shimmer, glitter, nebula canvas
- Responsive: grid 2-col desktop → stack mobile
- Peso estimado: ~64KB (todo en un archivo)

### Estructura de contenido
1. **Announcement bar** — urgencia (cupos limitados)
2. **Hero 2-col** — headlines + VSL video placeholder + countdown
3. **Social proof** — stats (5 ediciones, 140K asistentes, 8 auditorios, 3 pabellones)
4. **Secciones de beneficios** — mentorías, networking, gastronomía, backstage
5. **Pricing** — Black Ticket $997 con opción de cuotas (4 pagos)
6. **CTA principal** — botón de compra (Wompi)
7. **FAQ** — preguntas frecuentes
8. **WhatsApp float** — botón WhatsApp fijo

### Elementos de conversión
- **CTAs:** "Asegura tu Black Ticket" (múltiples)
- **Countdown timer:** JavaScript con fecha del evento
- **Urgencia:** "Cupos limitados", pill roja con dot animado
- **Social proof:** números (140K+, 5 ediciones, 8 auditorios)
- **Precio:** USD $997 con opción "Paga en 4 cuotas"
- **WhatsApp:** +57 320 655 6725

### Diseño
- Palette: negro (#000) + crema (#F0EDE8) + gris plata (#B8B8B8) + rojo acento (#C0392B)
- Estilo premium/luxury (dark theme, tipografía editorial)
- Efecto nebula animado en canvas (background)
- Glitter particles en hero

---

## Problemas críticos (resueltos y pendientes)

### ✅ RESUELTO — GTM/GA4 implementado
- GTM-TLRMK246 con 3 etiquetas activas (remarketing + 2 conversiones)
- GA4 G-CRXZ50VX7D vinculado a Google Ads
- Conversiones verificadas con Tag Assistant (13/03/2026)

### ⚠️ PENDIENTE — URL revela estrategia
- URL actual: `/estrategia-google-ads/` le dice al usuario que llegó por anuncio pagado
- **Cambiar a:** `/experiencia-black/`
- Title tag incorrecto: cambiar a "Entrada Black | Feria Effix 2026"

### ⚠️ PENDIENTE — Mejoras de conversión
- **Sin video:** Un video de highlights puede aumentar conversiones 30-49%
- **Sin botón WhatsApp:** Para $997, la gente necesita hablar antes de comprar
- **4 botones de pago = parálisis:** Reducir a 2 (cuotas vs único)
- **Sin garantía visible:** No hay reversión de riesgo para $997
- **Sin exit-intent popup**

### ⚠️ PENDIENTE — Portafolio completo
- General/VIP se venden vía LaTiquetera (latiquetera.com/site/effix)
- Stands: feriaeffix.com/quiero-tener-un-stand/
- Campaña de marca debe dirigir a feriaeffix.com (no solo Black)

---

## Lo que funciona bien (mantener) — Nota 7.2/10

1. **Paleta negro + dorado** — comunica premium y exclusividad
2. **Estructura de flujo sólida** — escasez → promesa → precio → beneficios → comparativa → FAQ
3. **Anclaje de precio bien ejecutado** — $1,323 tachado → $997
4. **Tabla comparativa** — General vs VIP vs Black funcional
5. **3 bloques de CTAs bien distribuidos**
6. **FAQ aborda objeciones principales**
7. **Countdown timer** — crea urgencia real
8. **Mobile responsive** — grid se adapta

## Oportunidades de mejora

1. **Agregar testimoniales** — hay videos VSL disponibles pero no testimonios en la landing
2. **Fotos del venue real** — Plaza Mayor Medellín para tangibilizar
3. **Agenda/speakers** — no hay preview de contenido del evento
4. **Trust badges** — 5 ediciones, patrocinadores, medios
5. **Comparison table** — General vs VIP vs Black en una sola vista
6. **Exit intent popup** — para capturar emails de visitantes que no compran
7. **Thank you page** — para medir conversiones post-compra

---

## Alineación landing ↔ ads

| Elemento ad | ¿Presente en landing? | Nota |
|---|---|---|
| "Feria Effix 2026" | Si | Headline principal |
| "16-18 Oct" | Si | En countdown y copy |
| "Plaza Mayor, Medellín" | Si | En sección de ubicación |
| "9 Mentorías Exclusivas" | Si | Sección de beneficios |
| "$997" | Si | Pricing section |
| "Paga en 4 cuotas" | Si | Debajo del precio |
| "140,000+ asistentes" | Si | Social proof strip |
| "Networking exclusivo" | Si | Sección de beneficios |
| "Experiencia gastronómica" | Si | Sección de beneficios |

**Conclusión:** Los copies de Search Ads para Black Ticket están bien alineados con la landing existente. Message match es fuerte.

---

## Hallazgos LaTiquetera (2026-03-19)

> LaTiquetera maneja la venta de boletas General ($201,300 COP) y VIP (~$1,000,000 COP).

### Message mismatch detectado
Los anuncios de Google Ads promocionan:
- "49,000+ asistentes en 2025"
- "380+ marcas expositoras"
- "180+ charlas"

Pero la página de LaTiquetera puede mostrar **números desactualizados** de ediciones anteriores. Esto genera inconsistencia entre el ad y la landing de compra, lo cual:
1. Reduce confianza del usuario (lo que leyó en el ad no coincide con lo que ve)
2. Aumenta tasa de rebote
3. Afecta Quality Score a largo plazo

### Código de conversión pendiente
- **Conversion ID:** AW-17981312035
- **Estado:** Código enviado — pendiente implementación por equipo técnico LaTiquetera
- **Impacto:** Sin esto, NO se miden conversiones de boletas General/VIP en Google Ads
- **Bloquea:** Smart Bidding (necesita 30+ conversiones registradas)

Ver detalles completos en: [[acciones-bloqueantes]]

---

## Próximos pasos
1. [x] ~~Implementar GTM + GA4 en la landing actual~~ ✅
2. [x] ~~Configurar conversiones Black (Wompi pago completo + cuotas)~~ ✅
3. [ ] Cambiar URL de /estrategia-google-ads/ a /experiencia-black/
4. [ ] Cambiar title tag a "Entrada Black | Feria Effix 2026"
5. [ ] Agregar video de highlights (60-90s)
6. [ ] Agregar botón WhatsApp flotante
7. [ ] Simplificar CTAs de pago (2 en vez de 4)
8. [ ] Agregar garantía / risk reversal visible
9. [ ] Crear mockup de nueva landing para enviar a desarrollo
10. [x] ~~Coordinar con LaTiquetera para conversiones General/VIP~~ → Código enviado, pendiente implementación
11. [ ] Verificar que LaTiquetera actualice números del evento (49K+, 380+, 180+)
