---
tags:
  - google-ads
  - feria-effix
  - bitacora
created: "2026-03-19"
---

# Bitácora — Google Ads Feria Effix 2026

## v3 — 2026-03-19 | Creación de proyecto

### Contexto
- Se crea la estructura completa del proyecto Google Ads para Feria Effix 2026
- Presupuesto aprobado: USD $40,000
- Evento: 16-18 Oct 2026, Plaza Mayor, Medellín
- Runway: ~7 meses

### Análisis realizado

**Campañas Meta Ads anteriores (Jun-Jul 2025):**
- 35 campañas analizadas, todas en Meta Ads (Facebook/Instagram) para mercado Guatemala
- Gasto total del período: ~$539 USD (presupuestos bajos)
- Video es el formato ganador: $0.80/conversación WhatsApp vs $3-5 para carrusel/imágenes
- Funnel secuencial de contenido (24h → 7d → 14d → 30d) funciona bien para nurturing
- ThruPlay ultra-barato ($0.003-0.004/vista) excelente para pixel warming
- Framework de messaging: PERTENENCIA - GARANTÍA - FOMO
- Total conversaciones WhatsApp en el período: ~241

**Landing page Black Ticket:**
- HTML puro, single-page, diseño premium dark theme
- **NO tiene GTM, GA4, ni ningún tracking** — bloqueante para Google Ads
- Copy y estructura alineados con los ads propuestos
- Falta: landings para General y VIP
- Funciona: countdown, urgencia visual, WhatsApp flotante, social proof con números

### Decisiones tomadas
1. Estructura de 4 fases + Fase 0 de fundación
2. 50% del presupuesto en últimas 6 semanas (push final)
3. Bidding inicial: Max Clicks → migrar a Target CPA con 30+ conversiones
4. GTM + GA4 es prioridad #1 antes de cualquier gasto en ads
5. Customer Match desde día 1 usando BD de clientes existente
6. No reciclar copies de Meta directo — adaptar messaging a formato Search
7. Campaña Brand Search desde Fase 0 para proteger marca

### Archivos creados
- `CLAUDE.md` — directrices del proyecto
- `context/proyecto-master.md` — estrategia completa con fases, presupuesto, KPIs, creativos
- `context/meta-ads-insights.md` — análisis de 35 campañas Meta Ads anteriores
- `context/landing-audit.md` — auditoría de landing Black Ticket
- `context/credenciales.md` — IDs y accesos (sin contraseñas)
- `campañas/search-marca-effix.md` — campaña Brand Search configurada
- `campañas/search-categoria.md` — campaña categoría con 4 ad groups
- `campañas/fase2-plantillas.md` — plantillas para YouTube, Display, Demand Gen, PMax, Push Final
- `assets/effix-black-landing.html` — copia de la landing actual
- `bitacoras/bitacora-v3.md` — este archivo

### Próximos pasos (prioridad)
1. **URGENTE:** Implementar GTM + GA4 en landing Black
2. Crear landings General y VIP
3. Subir Customer Match list (SHA256 hashed)
4. Configurar conversiones en Google Ads
5. Lanzar campaña Brand Search
6. Keyword research con volúmenes reales (Google Keyword Planner)
7. Crear assets de video para YouTube Ads

### Riesgos identificados
- Cuenta Google Ads fresca = sin data histórica = smart bidding limitado
- Solo existe 1 landing page de 3 necesarias
- Landing actual sin tracking = todo el tráfico actual se pierde
- Presupuesto de $40K para 7 meses requiere disciplina en pacing
- Los benchmarks de Meta no aplican a Google — CPC de Search será significativamente mayor

---

---

## v4 — 2026-03-19 | Análisis de rendimiento + nueva estrategia portafolio

### Primera ejecución (11-17 marzo 2026)
- 2 campañas corrieron 6 días: Search Marca + Search Categoría
- **Total:** 616 impresiones, 101 clics, CTR 16.4%, CPC $0.54 USD, $228,930 COP gastados
- **0 conversiones** — diagnóstico: landing solo vendía Black ($997), volumen insuficiente, 6 días es poco, sin remarketing, URL revelaba estrategia
- **Señales positivas:** CTR 4x benchmark, CPC ultra-eficiente, demanda de marca confirmada

### Cruce GA4 (Feb 17 - Mar 15)
- **Paid Search es el canal #1 en calidad:** 53.85% engagement, 34s promedio
- **Meta Ads (Paid Social) tiene alerta roja:** 10,789 sesiones pero 3.52% engagement y 0s tiempo
- **Paid Other (9,205 sesiones):** Fuente desconocida, 1s promedio — investigar
- **Organic Search:** Mayor tiempo (48s) — invertir en SEO

### Auditoría landing Black: 7.2/10
- **Fortalezas:** Paleta premium, estructura sólida, anclaje de precio, tabla comparativa, FAQs
- **Problemas:** URL revela estrategia, title tag incorrecto, sin video, sin WhatsApp, 4 botones de pago, sin garantía

### Decisión: reestructurar a portafolio completo
- Campañas pausadas para reestructuración
- **5 campañas nuevas:** Marca (→ feriaeffix.com), Boletas General (→ LaTiquetera), Experiencia Black (→ /experiencia-black/), Stands, Categoría
- **Cambio clave:** Marca ya no apunta solo a Black, sino a feriaeffix.com (portafolio completo)

### Coordinación con LaTiquetera
- Código de conversión enviado para boletas General/VIP
- Pendiente implementación por su equipo técnico
- Valor por defecto: 201,300 COP | Se solicitó valor dinámico + Transaction ID

### Nuevos pendientes
- Reestructurar campañas (portafolio completo)
- Confirmar LaTiquetera
- Cambiar URL /estrategia-google-ads/ → /experiencia-black/
- Implementar mejoras landing (video, WhatsApp, CTAs, garantía)
- Investigar Paid Other y optimizar Meta Ads

*Próxima entrada: post-reestructuración de campañas*

---

## v5 — 2026-03-19 | Relanzamiento [Search] Categoría + Customer Match + Validación

### Contexto
Primera campaña relanzada después de la reestructuración a portafolio completo. Se procesan 3 bases de datos de clientes para Customer Match. Se valida que feriaeffix.com tiene CTAs funcionales (botones de compra + WhatsApp de stands).

### Customer Match — Público Boletería

**3 bases de datos procesadas:**

| Fuente | Registros |
|---|---|
| Bd clientes directos de Effix | 1,182 |
| Bd consolidada boleteria 2021-2025 | 17,572 |
| Empresas | 52,274 (+ emails secundarios = 54,437) |
| **Total antes de dedup** | **73,191** |
| Removidos (email inválido/vacío) | 467 |
| Duplicados removidos (por email) | 12,465 |
| **Total final único** | **60,259** |

**Calidad de datos:**
- 99.9% con teléfono (formato E.164)
- 23.4% con nombre (mayoría viene de base Empresas que no tiene nombres)
- 100% con país (default: Colombia)

**Output:** `assets/customer-match-boletas.csv` — Formato Customer Match (Email, Phone, First Name, Last Name, Country). Sin hashing (Google lo hace al subir).

**Uso:** Audiencia de **observación** (no restricción) en Search Categoría. Google muestra ads a todos los buscadores pero prioriza perfiles similares.

### Campaña relanzada: [Search] Categoría Ecommerce | F1

| Cambio | v1 → v2 |
|---|---|
| Bidding | Maximizar conversiones → Maximizar clics |
| Budget | COP $73K → COP $80K/día |
| Keywords | 6 activas → 20 en 4 grupos |
| Negativos | Sin negativos → 14 exact match |
| Customer Match | Sin audiencia → 60,259 registros (observación) |
| Extensiones | Sitelinks + Callouts → + Structured Snippets + Call |
| Geo bid adjustments | Sin ajustes → Colombia +20%, Tier 2 -15% |
| Geo targeting | Default → Presencia only |
| Landing | feriaeffix.com (confirmada con CTAs funcionales) |

### Validaciones realizadas
1. ✅ feriaeffix.com tiene botones de compra funcionales (boletas vía LaTiquetera)
2. ✅ feriaeffix.com tiene WhatsApp para stands
3. ✅ CSV Customer Match generado con formato correcto de Google Ads
4. ✅ Configuración completa de campaña documentada para copiar a Google Ads
5. ⚠️ LaTiquetera aún NO tiene código de conversión implementado (AW-17981312035)
6. ⚠️ Números de LaTiquetera pueden estar desactualizados vs los ads

### Archivos creados/actualizados
- `assets/customer-match-boletas.csv` — **CREADO** (60,259 registros)
- `assets/build-customer-match.py` — **CREADO** (script reproducible)
- `campañas/search-categoria.md` — **ACTUALIZADO** (configuración relanzamiento v2)
- `campañas/acciones-bloqueantes.md` — **CREADO** (guía para equipo/proveedores)
- `bitacoras/bitacora-v3.md` — **ACTUALIZADO** (esta entrada)
- `context/proyecto-master.md` — **ACTUALIZADO** (estado general)
- `context/landing-audit.md` — **ACTUALIZADO** (hallazgos LaTiquetera)

### Decisiones tomadas
1. **Maximizar clics** (no conversiones) porque aún no hay 30+ conversiones para Smart Bidding
2. **Customer Match como observación** — las campañas funcionan sin la BD pero mejoran con ella
3. **Sin hashing** en CSV — Google lo hace automáticamente al subir
4. **3 BDs en 1 solo público** — boletería consolidada; stands será lista separada después
5. **Acciones bloqueantes documentadas** para enviar a LaTiquetera y equipo web

### Próximos pasos
1. **Subir CSV** a Google Ads → Herramientas → Gestor de audiencias → Customer Match
2. **Crear campaña** en Google Ads copiando configuración de `search-categoria.md`
3. **Enviar `acciones-bloqueantes.md`** a LaTiquetera y equipo web
4. **Esperar 7 días** sin tocar la campaña (hasta 2026-03-26)
5. **Semana 2:** Revisar términos de búsqueda, agregar negativos, evaluar keywords

### Riesgos
- Sin código en LaTiquetera, las conversiones de General/VIP siguen sin medirse
- Message mismatch entre ads ("49,000+ asistentes") y lo que LaTiquetera muestra
- Customer Match tarda 24-48h en procesarse después de subir

*Próxima entrada: primera semana de rendimiento post-relanzamiento (2026-03-26)*

---

## v6 — 2026-03-20 | Análisis Meta Ads Colombia + Tracking completo + Optimización anuncios

### Análisis Meta Ads Colombia (5 exports nuevos)

**Datos analizados:** Cuenta EFFICOMMERCE COL (COP), Nov 2025 – Mar 2026, $30.6M COP (~$7,200 USD)

**Clarificación clave del usuario:**
- EffiSystems = EffiCommerce SAS = MISMO producto (software ecommerce + logística)
- **Feria Effix NO se pauta en Meta Ads.** Solo en Google Ads.
- La cuenta Meta es 100% para el ecosistema Effi (software, marcas personales, eventos internos)

**8 verticales identificados y separados:**

| Vertical | Gasto COP | Tipo | Página FB |
|---|---|---|---|
| EffiCommerce/EffiSystems (software) | $14.6M (48%) | Ventas WhatsApp + VSL Landing | Efficommerce SAS |
| Eventos Grupo Effi | $3.8M (12%) | Registro eventos con ponentes | Grupo Effi |
| Sara Montoya (CEO Effi) | $3.3M (11%) | Marca personal IG | Sara Montoya |
| Juan Carmona (líder Effi) | $3.6M (12%) | Marca personal IG | Juan David Carmona |
| EffiWoman | $3.1M (10%) | Vertical femenino | EffiWoman |
| Uniremington (cliente externo) | $2.2M (7%) | WhatsApp universidad | — |
| Oswaldo (líder Effi) | $36K (0.1%) | Marca personal IG (nuevo) | Oswaldo Alarcon Rueda |

**Hallazgos principales:**
- Sara es 2x más eficiente que Juan en crecimiento IG ($71 vs $150/profile visit)
- Mujeres 25-44 son el core demográfico del ecosistema
- Instagram genera 4.3x más clics que Facebook con mismo presupuesto
- Ads de Oswaldo están corriendo dentro de ad sets de Juan (contaminación)
- Zero compras trackeadas en toda la cuenta Meta (pixel de compra no configurado)
- 93.4% de los "976K resultados" son vanity metrics (likes + video views)

**Lo transferible a Google Ads (Feria Effix):**
- Demografía: mujeres 25-44 → bid adjustments +20%
- Sara como asset creativo principal
- Framework PERTENENCIA-GARANTÍA-FOMO
- Audiencia de Eventos Grupo Effi para Customer Match
- Los CPAs/CPCs de Meta NO son benchmark (producto diferente)

### Tracking — LaTiquetera IMPLEMENTADO

- ✅ GTM-MKGKFGL con tag de conversión Google Ads (AW-17981312035)
- ✅ Valor dinámico ({{DLV - Conversion Value}})
- ✅ Transaction ID ({{DLV - transaction_id}})
- ✅ Vinculación de conversiones (LTQTRA)
- ✅ Server-side via Stape
- ✅ GA4 de LaTiquetera activo
- ✅ Etiqueta AW-17981312035 confirmada cargando en página de confirmación

### Tracking — GTM feriaeffix.com actualizado

- ✅ Vinculación de conversiones agregada (faltaba — era alerta urgente)
- ✅ Etiqueta de Google AW-17981312035 aceptada (sugerencia de GTM)
- ✅ Contenedor publicado con cambios
- ⚠️ 19 páginas sin etiquetar (notas de prensa viejas, no crítico — requiere acceso WordPress)
- ⚠️ Conversiones Avanzadas (Enhanced) sin configurar (opcional, esperar conversiones reales)

### Optimización de anuncios (recomendaciones Google Ads)

**Nivel de optimización:** 94.8% → 96.5%

**Acciones realizadas:**
- ✅ Vínculos a sitio agregados (6+)
- ✅ Textos destacados (callouts) sugeridos
- ✅ Fragmentos estructurados sugeridos
- ✅ Segmentación por clientes con datos de conversiones activada

**Acciones pendientes (títulos del RSA):**
- Reemplazar 5 títulos débiles por keywords sugeridas por Google:
  - `Feria Ecommerce Colombia 2026`
  - `Expo Ecommerce Medellín 2026`
  - `Congreso Marketing Digital 2026`
  - `Conferencias Ecommerce y AI`
  - `Summit Emprendimiento Medellín`
- Quitar vínculos a sitio duplicados

**Rechazadas:**
- ❌ IA Max para Búsqueda (sin conversiones aún)
- ❌ Cambiar bidding a conversiones (necesita 30+)
- ❌ Keywords sugeridas por Google (incluían "2022")

### Estado del tracking completo

| Producto | Dónde | GTM | Conversión | Estado |
|---|---|---|---|---|
| Black $997 pago completo | feriaeffix.com | GTM-TLRMK246 | /boleta-black/gracias/ | ✅ |
| Black $997 cuotas | feriaeffix.com | GTM-TLRMK246 | /boleta-black/gracias-2 | ✅ |
| Pasaporte/General/VIP | latiquetera.com | GTM-MKGKFGL | Evento personalizado | ✅ |
| Remarketing | feriaeffix.com | GTM-TLRMK246 | All Pages | ✅ |
| Vinculación conversiones | feriaeffix.com | GTM-TLRMK246 | All Pages | ✅ (nuevo) |

### Archivos creados/actualizados
- `context/meta-ads-colombia-analysis.md` — **CREADO** (análisis agregado + nota de separación)
- `context/meta-ads-verticals-analysis.md` — **CREADO** (análisis por 8 verticales)
- `campañas/acciones-bloqueantes.md` — **ACTUALIZADO** (LaTiquetera ✅)
- `CLAUDE.md` — **ACTUALIZADO** (LaTiquetera ✅)

### Bloqueantes restantes

| # | Acción | Responsable | Estado | Prioridad |
|---|---|---|---|---|
| ~~1~~ | ~~Código conversión LaTiquetera~~ | ~~LaTiquetera~~ | ✅ Hecho | ~~Crítica~~ |
| 2 | Números evento en LaTiquetera | LaTiquetera | ⏳ | Alta |
| 3 | URL /experiencia-black/ | Web Effix (WordPress) | ⏳ Sin acceso WP | Alta |
| 4 | Title tag landing Black | Web Effix (WordPress) | ⏳ Sin acceso WP | Alta |
| 5 | Video highlights | Contenido | ⏳ | Media |
| 6 | Simplificar CTAs pago | Web Effix | ⏳ | Media |
| 7 | Garantía/risk reversal | Contenido | ⏳ | Media |
| 8 | Etiquetar 19 páginas sin GTM | Web Effix (WordPress) | ⏳ Sin acceso WP | Baja |
| 9 | Compra de prueba LaTiquetera | Equipo Effix | ⏳ | Alta |
| 10 | Mejorar títulos RSA (5 cambios) | Google Ads | ⏳ | Media |

### Próximos pasos (semana 23-27 marzo)
1. **Compra de prueba** en LaTiquetera para verificar conversión end-to-end
2. **Conseguir acceso WordPress** para resolver URL, title tag y páginas sin etiquetar
3. **Actualizar títulos RSA** con keywords sugeridas
4. **Revisar rendimiento** de campaña Categoría (7 días post-relanzamiento = 26 marzo)
5. **Subir Customer Match** si no se ha hecho aún

*Próxima entrada: revisión semanal (2026-03-27)*
