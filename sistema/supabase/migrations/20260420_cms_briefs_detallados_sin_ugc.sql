-- ============================================================================
-- Migration: 20260420 — Briefs detallados con guiones + sin referencias UGC
-- Descripción:
--   1) Borra los 10 spend entries ficticios creados por el seed inicial
--      (eran demo para que el libro diario no se viera vacío).
--   2) Reescribe los 6 requerimientos con briefs COMPLETOS: guiones palabra
--      por palabra, copys listos, specs técnicos, criterios de aprobación.
--   3) Elimina toda mención a "UGC" — la comunicación del Grupo Effi es
--      corporativa, con actores contratados, no creators ni influencers.
--
-- Idempotente: re-ejecutable. Los UPDATE sobrescriben; el DELETE filtra por source.
-- ============================================================================


do $mig$
declare
  v_strategy_id uuid;
begin
  select id into v_strategy_id
  from public.admin_effix_strategies
  where brand_slug = 'efficommerce' and nombre = 'EffiCommerce CR 2026-Q2';

  if v_strategy_id is null then
    raise exception 'No existe la estrategia EffiCommerce CR 2026-Q2. Aplicá primero 20260420_cms_seed_efficommerce_cri.sql.';
  end if;

  ---------------------------------------------------------------------------
  -- 1) Borrar spend entries FICTICIOS del seed inicial
  --    Filtra por source='manual' + fechas seed (17-20 abr) + strategy
  --    El equipo registra los gastos reales con source='manual' también,
  --    pero la ventana de fechas y la ausencia de datos reales en esas
  --    fechas hace el filtro seguro. Ajustar si hubo gastos reales en esas
  --    fechas.
  ---------------------------------------------------------------------------
  delete from public.admin_effix_spend_entries
  where strategy_id = v_strategy_id
    and source = 'manual'
    and fecha between '2026-04-17' and '2026-04-20'
    and (notes like '%lanzamiento soft%'
         or notes like '%Funnel A%'
         or notes like '%Factura 4.4%'
         or notes like '%sinpe movil ecommerce%'
         or notes like '%Funnel Shopify%'
         or notes like '%alternativa shopify%'
         or notes like '%plantillas welcome%'
         or notes like '%nurturing D2%'
         or notes like '%Twilio WABA%'
         or notes like '%ajuste audiencia GAM%');

  raise notice 'Spend entries ficticios eliminados. El libro diario queda en cero para registrar gastos reales.';

  ---------------------------------------------------------------------------
  -- 2) UPDATE requerimientos con briefs DETALLADOS — sin UGC
  ---------------------------------------------------------------------------

  -- ===== ESTRATEGA =====
  update public.admin_effix_requirements
  set brief_md = $brief$# Plan Maestro EffiCommerce Costa Rica · Q2-Q3 2026

## 1. Resumen ejecutivo

Lanzamiento de **EffiCommerce** en Costa Rica aprovechando la ventana regulatoria de **Factura Electrónica 4.4** (obligatoria desde sept 2025) + **SINPE Móvil** obligatorio en facturas. EffiCommerce soporta ambos nativamente — ventaja única vs Shopify/Jumpseller/Tiendanube que los resuelven con apps externas de terceros.

**Toda la comunicación es corporativa**: video, estático y web se producen como marca empresa. No se usa UGC ni creators externos. Los testimoniales son dramatizaciones con actores profesionales contratados por casting.

## 2. Contexto mercado Costa Rica

| Métrica | Valor | Fuente |
|---|---|---|
| Mercado ecommerce 2025 | USD $1.8 mil millones | Statista |
| Proyección 2029 | USD $2.535 mil millones | Statista |
| CAGR 2024-2029 | 8.91% | Statista |
| Negocios activos CR | 494,564 (+13.5% vs 2024) | MEIC |
| Población en WhatsApp | >80% | Mazkara |
| Usuarios WA que mensajean a negocios | 71% | Greenbook LATAM |
| Tiendas Shopify activas en CR | 2,192 | StoreLeads |
| Contribuyentes obligados Factura 4.4 | 450,000+ | Hacienda CR |

## 3. KPIs target 90 días

| KPI | Target | Semáforo verde | Rojo |
|---|---|---|---|
| Leads cualificados totales | 300+ | 400+ | <150 |
| Demos agendadas | 60+ | 80+ | <30 |
| Clientes cerrados (cierre 15-25%) | 9-15 | 18+ | <5 |
| CPL promedio | <$3.00 USD | <$2.00 | >$5.00 |
| Conversión landing A | ≥5% | ≥7% | <3% |
| Conversión landing B | ≥3% | ≥5% | <2% |
| Coincidencia pixel + CAPI | ≥95% | ≥98% | <90% |

## 4. Arquitectura de pauta — dual funnel 70/30

### Funnel A — Digitalizar negocios tradicionales (70% = $2,100 USD/3 meses)

**Audiencia**: pulperías, sodas, talleres mecánicos, profesionales independientes (médicos, dentistas, abogados, arquitectos). 450k contribuyentes con dolor administrativo.

**Ángulo principal**: "Vendé en línea cumpliendo Hacienda — sin pelear con la 4.4."

**Canales**:
- Meta Ads (Conversations WA + ThruPlay video): $1,200 / 3m
- Google Search Brand + Categoría A (factura 4.4, sinpe movil, pos pymes): $750 / 3m
- WhatsApp Business API + nurturing: $150 / 3m

### Funnel B — Migrar tiendas Shopify (30% = $900 USD/3 meses)

**Audiencia**: dueños de tiendas Shopify Basic+ en CR que sufren con pagos en USD, apps extras, compliance débil y soporte en inglés.

**Ángulo**: "Migrá de Shopify a EffiCommerce: compliance CR + ahorro apps + soporte tico. 7 días sin caída."

**Canales**:
- Meta Ads (Traffic Landing B + Retargeting): $600 / 3m
- Google Search Categoría B (alternativa shopify, plataforma ecommerce CR): $300 / 3m

## 5. Cronograma por fases

| Semana | Fecha | Fase | Acción |
|---|---|---|---|
| 1 | abr 20-26 | Build 1 | Brand guide, cuentas Ads, pixel + CAPI, WABA, reunión frontera Effi System CR |
| 2 | abr 27-may 3 | Build 2 | Clon landing-ecuador → landing-cr, tracking QA, creativos en producción |
| 3 | may 4-10 | Launch soft | Activar Meta Funnel A + Google Brand + Categoría A · budget mínimo |
| 4 | may 11-17 | Funnel B on | Activar Meta Funnel B + Google Categoría B |
| 5 | may 18-24 | Gate G4 | Revisión: si CPL A <$2 y B >$4 → pausar B, reasignar a A |
| 6-8 | may 25-jun 14 | Optimización | Rotar creativos, activar remarketing |
| 9-12 | jun 15-jul 13 | Escala | Lookalikes Meta, PMax Google, A/B landing |

## 6. Dependencias críticas

1. Asignación de equipo CR (trafficker, creativo AV, dev, SDR)
2. Aprobar brand guide EffiCommerce (NO heredar paleta Feria Effix)
3. Reunión con Effi System CR para definir frontera (ERP vs ecommerce+logística)
4. Confirmación producto: Factura 4.4 + SINPE nativos (confirmado 2026-04-17)
5. Validar partners logística reales CR (Correos CR, Aeropost, DHL)
6. Compliance Ley 8968 — DPO designado, aviso de privacidad publicado

## 7. Riesgos top 3

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Pixel Meta bloqueado (issue conocido) | Alto | CAPI server-side desde día 1 + QA Events Manager antes de gastar $1 |
| Canibalización con Effi System CR | Alto | Reunión semana 1 + lista negativa cruzada de keywords |
| Presupuesto lean con 2 funnels dispersa aprendizaje | Medio | Split 70/30 con gate G4 de reasignación forzada |

## 8. Criterio de aprobación de esta estrategia

- [ ] CEO valida el presupuesto $1,000/mes y el split 70/30
- [ ] CFO valida el flujo de registro de gastos multi-moneda (CRC+USD)
- [ ] Owner del producto confirma roadmap Factura 4.4 + SINPE para CR
- [ ] Design Lead confirma que EffiCommerce tendrá brand propio (no heredar Feria Effix)
$brief$,
    brief_format = 'markdown',
    updated_at = now()
  where strategy_id = v_strategy_id
    and area = 'estratega'
    and title = 'Definir plan maestro Q2 EffiCommerce CR';

  -- ===== DISEÑO =====
  update public.admin_effix_requirements
  set brief_md = $brief$# Brief · Diseño · Brand guide + 6 estáticos Meta Funnel A

> **Nota de tono**: toda la comunicación es desde la empresa EffiCommerce. No usamos UGC ni creators. Los testimoniales son dramatizaciones con actores contratados. La estética debe sentirse profesional-accesible, NO lifestyle-influencer.

## 1. Brand guide EffiCommerce (entregable #1)

### 1.1 Esencia
- Arquetipo primario: **El Gobernante** (orden, cumplimiento — resuena con Factura 4.4 / Hacienda)
- Arquetipo secundario: **El Tipo Común** (accesible, cercano, no corporate tieso)
- Palabras clave: competente, cálido, cumplido, costarricense-LATAM
- NO somos: disruptivo, lujoso, millennial cool, gurú transformador

### 1.2 Paleta de colores

| Rol | Nombre | Hex | Uso |
|---|---|---|---|
| Principal | Effi Navy | `#0E2A47` | Headlines, CTAs primarios, fondos oscuros |
| Secundario | Effi Mint | `#1BC49C` | Acentos positivos, checks, badges "incluido" |
| Terciario | Effi Sun | `#F5B700` | CTAs secundarios, highlights urgencia |
| Fondo claro | Effi Cream | `#FAF7F0` | Background principal landing (NO blanco puro) |
| Texto | Effi Ink | `#1A1A1A` | Body text (NO negro puro) |
| Muted | Effi Muted | `#6B7280` | Texto secundario, placeholders |
| WhatsApp | WA Green | `#25D366` | EXCLUSIVO para CTAs WhatsApp |

Regla 60/30/10: Cream 60% · Navy 30% · Mint/Sun 10%.

**Prohibido**: usar la paleta Feria Effix (negro / oro #C9A84C / rojo #C0392B) — es otra marca (evento) y confunde al audience B2B SaaS.

### 1.3 Tipografía

| Uso | Fuente | Peso | Fallback |
|---|---|---|---|
| Display/Headlines | **Inter Tight** | 700-800 | system-ui |
| Body | **Inter** | 400-500 | system-ui |
| Mono (código, TRM) | **JetBrains Mono** | 400 | monospace |

Ambas Google Fonts, gratis, robustas con tildes ES-CR.

### 1.4 Logo (entregables)

- [ ] Logo horizontal color (SVG + PNG 3x)
- [ ] Logo horizontal monocromo blanco (para fondos oscuros)
- [ ] Logo horizontal monocromo navy (para fondos claros)
- [ ] Iso (para favicon, app icon, redes)
- [ ] Logo sobre fondo Effi Navy (lockup oficial)
- [ ] Logo sobre fondo Effi Cream (lockup alternativo)

**Tamaño mínimo legible**: 24px de alto.

### 1.5 Iconografía

- Sistema: **Phosphor Icons** (outline 1.5px o regular)
- Color default: Effi Navy · positivo: Effi Mint · alerta: Effi Sun

### 1.6 Fotografía (cuando aplique)

- Real, profesional, no "stock gringo"
- Locaciones: oficinas reales CR, tiendas físicas, consultorios
- Personas: **actores profesionales CR contratados**, NUNCA influencers o creators UGC
- Prohibido: lifestyle con smartphones elegantes sobre mesa blanca, modelos de stock

---

## 2. 6 estáticos Meta Funnel A (entregable #2)

Cada estático tiene 2 variantes de layout + se provee el copy literal en el brief.
Entrega: 18 archivos PNG (6 estáticos × 3 formatos: 1080×1080, 1080×1350, 1080×1920).

### E1 · "Carta Hacienda" · 1080×1080 (1:1)

**Concepto**: close-up de sobre oficial tipo Hacienda CR con sello rojo tachado en verde (Effi Mint) encima, con badge "RESUELTO CON EFFICOMMERCE".

**Layout**:
- Fondo Effi Cream
- Sobre oficial recreado (sin logos reales Hacienda — diseño ilustrado que lo evoca)
- Sello rojo grande al 60% del área
- Sobre el sello: trazo verde Effi Mint diagonal tachándolo
- Badge Effi Mint esquina inferior derecha con texto "RESUELTO CON EFFICOMMERCE" en Inter Tight 700 blanco
- Logo EffiCommerce pequeño esquina superior izquierda

**Texto sobre imagen** (Inter Tight):
- Headline: **"Respirá. Hay salida."** (48pt navy)
- Subhead: "Factura 4.4 sin apps extra" (18pt muted)

**NO usar**: imágenes reales de Hacienda, logos oficiales gubernamentales.

### E2 · "Don Carlos testimonial" · 1080×1080 (1:1)

**Concepto**: retrato profesional cálido de actor CR masculino 55-65 años, apariencia auténtica de dueño pulpería. Foto de casting profesional, no stock.

**Dirección fotográfica**:
- Locación: pulpería real (arrendada por día)
- Vestuario: camisa polo sencilla, delantal opcional
- Expresión: sonrisa genuina, no posada
- Iluminación: natural cálida, mediodía
- Props: celular en mano mostrando pantalla EffiCommerce (mockup)

**Layout**:
- Foto ocupa 60% izquierdo del frame
- Quote sobrepuesto a la derecha en Inter Tight:
  - "Vendí ₡800.000 extra el primer mes." (32pt navy, 2 líneas)
- Attribution abajo (14pt muted):
  - "— Don Carlos · pulpería en Desamparados"
- Disclaimer obligatorio esquina inferior (10pt muted):
  - "Dramatización basada en caso real"
- Logo EffiCommerce esquina inferior derecha

### E3 · "Antes / Después" · 1080×1350 (4:5)

**Concepto**: split vertical comparando el antes (cuaderno + calculadora manchados) y el después (celular con EffiCommerce limpio).

**Layout**:
- 50/50 split horizontal, separador Effi Mint 2px
- Arriba "ANTES" en tag Effi Sun:
  - Foto producto: cuaderno anotaciones tachadas + calculadora antigua rota + factura a mano
  - Overlay texto: "Excel, cuaderno, calculadora"
- Abajo "DESPUÉS" en tag Effi Mint:
  - Foto producto: celular gama media mostrando UI EffiCommerce (pedido WhatsApp + SINPE + Factura 4.4)
  - Overlay texto: "Celular + EffiCommerce"
- CTA centrado abajo del frame:
  - **"Tu cambio en 7 días"** (Inter Tight 700 navy)
  - Botón verde WA "Hablar por WhatsApp →"

### E4 · "Cómo funciona 1-2-3" · 1080×1350 (4:5)

**Concepto**: 3 iconos Phosphor en columna vertical explicando el flujo.

**Layout**:
- Fondo Effi Cream
- 3 cards blancos apilados, cada uno con:
  - Número grande (Inter Tight 800, 96pt, Effi Mint): 1 · 2 · 3
  - Icono Phosphor grande (Effi Navy):
    - Card 1: `Camera` + Card texto "Tomás una foto del producto"
    - Card 2: `ChatCircleDots` + texto "Clientes piden por WhatsApp"
    - Card 3: `Receipt` + texto "Cobrás con SINPE + Factura 4.4 sale sola"
- Footer unificado:
  - "Listo en 7 días" (Inter Tight 700 navy 24pt)
  - "Desde ₡19.900/mes" (Inter 500 muted 16pt)
- Logo EffiCommerce esquina inferior derecha

### E5 · "Story pregunta directa" · 1080×1920 (9:16)

**Concepto**: pregunta disruptiva tipo "story question" para Meta Reels/Stories.

**Layout**:
- Fondo Effi Navy sólido
- Texto centrado vertical, muy grande (Inter Tight 800, 110pt cream):

```
¿Tu negocio
ya factura
con 4.4?
```

- Debajo (60pt más pequeño):
  - "Descubrí en 2 minutos si estás al día"
- Botón swipe visual (no funcional, decorativo) abajo:
  - "Hacer diagnóstico →" (bg Mint, texto navy)
- Logo EffiCommerce pequeño arriba centrado
- Sticker decorativo Effi Sun esquina (triangular, tipo "aviso")

### E6 · "Story Dra. Andrea profesional" · 1080×1920 (9:16)

**Concepto**: testimonial profesional (médica/dentista CR) para captar verticales de profesionales independientes.

**Casting**: actriz CR 35-45 años, vestida con bata profesional (médica o dental), en locación consultorio real.

**Layout**:
- Foto ocupa 70% superior del frame (ratio 3:4 dentro del 9:16)
- Gradient overlay inferior de navy a transparente para legibilidad
- Quote sobre la foto (Inter Tight 500 blanco):

```
"Mi consultorio cobra
por SINPE. Las
facturas 4.4 salen
solas desde el celular.
Dejé de perseguir pagos."
```

- Attribution abajo (Inter 400 cream 20pt):
  - "— Dra. Andrea · odontóloga en Heredia"
- Disclaimer obligatorio 12pt cream transparente:
  - "Dramatización basada en caso real"
- Logo EffiCommerce pequeño arriba

---

## 3. Specs técnicos de exportación

| Formato | Dimensiones | Uso | Peso máx |
|---|---|---|---|
| Cuadrado (1:1) | 1080×1080 | Feed Instagram/Facebook | 2 MB |
| Retrato (4:5) | 1080×1350 | Feed optimizado mobile | 2 MB |
| Story (9:16) | 1080×1920 | Stories + Reels cover | 2 MB |

- Formato: **PNG** (transparencias) o **JPG** de alta calidad (fotografía)
- Espacio color: **sRGB**
- Nombre archivo: `EffiCommerceCR_E[N]_[concepto]_[ratio]_v[XX].png`

## 4. Compliance visual

- [ ] Sin claims "#1", "único", "garantizado" (Ley 7472 CR)
- [ ] Disclaimer "Dramatización" en estáticos con actor
- [ ] Logo EffiCommerce visible en todos los archivos
- [ ] Captions NO aplicables en estáticos (ya son texto over image)
- [ ] Sin uso de imágenes Hacienda oficial (solo recreación ilustrada)
- [ ] Consent de imagen firmado por todos los modelos/actores

## 5. Criterios de aprobación

- [ ] Brand guide aprobado por CEO + Design Lead
- [ ] Paleta y tipografía validadas (NO usar Feria Effix)
- [ ] Logo en 4 variantes entregado
- [ ] 6 estáticos × 3 formatos = 18 archivos finales
- [ ] Todos los copies respetan límites Meta (headline <40, descripción <30)
- [ ] Revisión legal del disclaimer "Dramatización"

## 6. Timeline

| Entregable | Fecha |
|---|---|
| Brand guide v1 (propuesta) | abr 24 |
| Brand guide aprobado | abr 28 |
| 6 estáticos borrador | may 1 |
| Revisión estratega + CEO | may 2 |
| Entrega final | may 3 |
| Lanzamiento en Meta | may 4 |

## 7. Referencias visuales (benchmarks)

**Inspiración aprobada**:
- Stripe — claridad SaaS con calor LATAM
- Rippling — B2B SaaS accesible
- Notion — uso sobrio del color acento

**NO usar como referencia**:
- Shopify homepage (demasiado colorida)
- Klaviyo (púrpura saturado)
- Cualquier marca influencer coaching
$brief$,
    brief_format = 'markdown',
    updated_at = now()
  where strategy_id = v_strategy_id
    and area = 'design'
    and title = 'Brand guide + 6 estáticos Meta Funnel A';

end $mig$;


-- ============================================================================
-- Segundo bloque (audiovisual + trafficker + dev_web + finanzas)
-- Separado para evitar que un DO block supere el tamaño práctico.
-- ============================================================================

do $mig2$
declare
  v_strategy_id uuid;
begin
  select id into v_strategy_id
  from public.admin_effix_strategies
  where brand_slug = 'efficommerce' and nombre = 'EffiCommerce CR 2026-Q2';

  -- ===== AUDIOVISUAL =====
  update public.admin_effix_requirements
  set title = '3 videos cortos Meta 9:16 + VSL 90s (producción corporativa)',
      brief_md = $brief$# Brief · Audiovisual · 3 videos cortos Funnel A + VSL 90s

> **Importante — tono de producción**: toda la comunicación es desde la empresa EffiCommerce. NO se usa UGC ni creators. Los testimoniales son **dramatizaciones** con **actores profesionales contratados por casting** en Costa Rica. Tone corporate-cálido, no influencer-lifestyle.

## 1. Entregables

| # | Pieza | Duración | Ratio | Uso |
|---|---|---|---|---|
| V1 | "Don Carlos de la pulpería" | 30s | 9:16 | Meta Conv WA · Reels |
| V2 | "Del Excel a EffiCommerce" | 26s | 9:16 | Meta Conv WA · Reels |
| V3 | "No necesitás aprender computación" | 28s | 9:16 | Meta Conv WA · Reels |
| VSL | Versión 90s funnel A | 90s | 9:16 + 16:9 | Landing hero + Meta conversión |

**Exports adicionales**: cada video corto en 1:1 (1080×1080) y 4:5 (1080×1350). VSL también en 1920×1080 para YouTube y landing desktop.

## 2. Casting

**Todos los actores son talento profesional contratado**, NO creators ni UGC:

| Video | Personaje | Perfil buscado |
|---|---|---|
| V1 | Don Carlos | Actor CR masculino, 55-65 años, apariencia auténtica dueño pulpería. Manos trabajadas. Dicción cálida. Sin look "modelo" |
| V2 | Narrador off | Voz masculina o femenina 30-45 años, tono neutro-LATAM, cálido y directo |
| V3 | Señora confundida (3s) + narrador off | Actriz 55+ CR auténtica + misma voz V2 |
| VSL | Mezcla: narrador + apariciones Don Carlos + inserts Doña María, Luis, Dra. Andrea | Ver casting breakdown por persona abajo |

**Casting breakdown VSL**:
- Don Carlos: mismo actor V1
- Doña María (soda): actriz CR 45-55, apariencia auténtica dueña soda, delantal
- Luis (taller): actor CR 35-50, uniforme taller con detalles de trabajo
- Dra. Andrea (profesional): actriz CR 35-45, bata médica/dental, consultorio

**Agencias casting sugeridas CR**: pasar por People Casting Agency, La Vuelta Producciones, o casting director externo.

**Presupuesto talento**: $800-1,200 USD por día de rodaje (5 actores × 1 día rodaje).

---

## 3. Locaciones

- **Pulpería real CR** (alquiler 1 día, $150-250 USD)
- **Soda tradicional CR** (cocina + comedor) — 1 día, $200 USD
- **Taller mecánico** — 4 horas $100 USD
- **Consultorio médico/dental** — puede ser set con atrezzo, $100-200 USD

Alternativa: set único con redecoración por personaje (ahorra 50% de presupuesto locación).

---

## 4. Guión palabra por palabra · V1 "Don Carlos de la pulpería" · 30s

### Shot list + voz

| Tiempo | Toma | On-screen text | Voz off (Don Carlos) | Notas producción |
|---|---|---|---|---|
| 00:00-00:03 | Close-up manos abriendo sobre oficial Hacienda | — | "Esta carta me llegó hace seis meses..." | Luz natural, foley papel |
| 00:03-00:07 | Corte: Don Carlos sentado detrás mostrador pulpería, lentes puestos, leyendo | — | "...y yo ni sabía qué era esa 4.4." | Plano medio |
| 00:07-00:12 | Insert rápido: cuaderno lleno + factura manuscrita + calculadora | Pequeño en footer: "450.000 negocios deben emitir 4.4" | "Yo llevaba todo en este cuaderno. Hacía las facturas a mano." | 3 cortes de 1.5s |
| 00:12-00:18 | Don Carlos con celular gama media, UI EffiCommerce visible (mockup aprobado) | "EffiCommerce — desde el celular" | "Mi hijo me mostró EffiCommerce. Le tomé foto a mis productos. El sistema hizo el catálogo." | Alternar rostro/pantalla |
| 00:18-00:24 | Cliente entra a pulpería, Don Carlos muestra pedido WhatsApp en celular, cobra SINPE | "SINPE Móvil · Factura 4.4 · WhatsApp" (aparecen uno a uno) | "Ahora reciben pedidos por WhatsApp. Pagan con SINPE. La factura sale sola." | B-roll ambiental |
| 00:24-00:28 | Don Carlos sonriendo, encuadre cálido | — | "₡800.000 extra el primer mes. Y Hacienda me dejó en paz." | Pausa respirada |
| 00:28-00:30 | Cartela final: logo + CTA + badge WhatsApp | "Hacé tu diagnóstico Factura 4.4 — 2 min — gratis" + botón WA verde | "Hablemos." | Fade logo |

**Música**: guitarra acústica suave, warm LATAM, sin vocal. Track licenciado Artlist/Epidemic. Crescendo sutil hacia CTA.

**Disclaimer obligatorio** (esquina inferior, Inter 400 12pt cream):
> Dramatización basada en caso real

**Duración tolerancia**: 28-32 seg.

---

## 5. Guión V2 "Del Excel a EffiCommerce" · 26s

| Tiempo | Toma | On-screen text | Voz off narrador | Notas |
|---|---|---|---|---|
| 00:00-00:02 | Close manos tipeando furiosamente en Excel. Café se derrama sobre teclado | "¿Tu negocio corre con Excel?" | "Si tu negocio corre con Excel..." | Slow-mo café |
| 00:02-00:05 | Corte: cuaderno con anotaciones tachadas + calculadora antigua | "¿Cuaderno y calculadora?" | "...cuaderno, o la memoria de tu contador..." | Montaje rápido |
| 00:05-00:08 | Fondo Effi Navy sólido, texto grande blanco | **"Esto es para vos"** | "Esto es para vos." | Pausa 1 seg |
| 00:08-00:13 | Screencast celular: crear producto con foto → lista productos aparece en UI EffiCommerce | — | "Así funciona EffiCommerce: tomás una foto. El sistema hace tu catálogo." | UI limpia, sin datos falsos |
| 00:13-00:16 | Screencast: mensaje WhatsApp entrante con pedido estructurado | "Pedido por WhatsApp" | "Los clientes te piden por WhatsApp." | Animación suave |
| 00:16-00:20 | Screencast: botón SINPE se activa, confirma pago. XML 4.4 descargándose | "SINPE · Factura 4.4" | "Cobrás con SINPE. La factura 4.4 sale sola." | Transiciones fluidas |
| 00:20-00:24 | Split rápido: contador recibiendo XML en su pantalla, sonríe | "Tu contador la recibe directo" | "Tu contador la recibe directo. Nada más." | 2 shots encadenados |
| 00:24-00:26 | Cartela final con pricing + CTA | "₡19.900/mes · Prueba gratis 14 días · Hablá por WhatsApp" | "EffiCommerce. Para Costa Rica." | Fade in |

**Música**: electrónica optimista suave tipo corporate-LATAM.

---

## 6. Guión V3 "No necesitás aprender computación" · 28s

| Tiempo | Toma | On-screen text | Voz off | Notas |
|---|---|---|---|---|
| 00:00-00:03 | Señora mayor frente a computadora portátil, cara de confusión | **"NO necesitás aprender computación"** (texto tachado sobre "computación") | "¿Pensás que vender en línea es para gente joven y técnica?" | Cut-out texto grande |
| 00:03-00:07 | Montaje rápido rostros: Don Carlos, Doña María, Luis, Dra. Andrea — cada uno con su celular | "Don Carlos, 58 · Doña María, 45 · Luis, 42 · Dra. Andrea, 38" | "Don Carlos tiene 58. Doña María cocina desde las 5am. Luis huele a grasa. La doctora Andrea atiende 20 pacientes al día." | 1 seg por rostro |
| 00:07-00:10 | Fondo Effi Navy, texto centrado | **"Los cuatro venden con EffiCommerce"** | "Los cuatro venden con EffiCommerce." | Pausa énfasis |
| 00:10-00:15 | Screencast celular secuencia: foto → catálogo → WhatsApp → SINPE → Factura 4.4 | "Solo con tu celular" | "No hay truco. No hay computación. Es tu celular haciendo lo que ya hace — pero ordenado." | 5 shots encadenados |
| 00:15-00:20 | Don Carlos recibe pedido WA, cobra SINPE, factura imprime | — | "Recibís pedidos ordenados. Cobrás con SINPE. Facturás con 4.4. Sin aprender nada." | Tomas reales |
| 00:20-00:25 | Texto grande fondo Navy | **"Factura 4.4 obligatoria desde septiembre 2025"** | "Y si todavía facturás a mano, Hacienda ya viene por vos." | Urgencia sin histerismo |
| 00:25-00:28 | Cartela: logo + CTA | "Hablá por WhatsApp · Diagnóstico gratis · 2 min" | "EffiCommerce. Empezá hoy." | Cierre limpio |

**Música**: percusión suave ascendente, beat amable.

---

## 7. Guión VSL 90 segundos (versión larga — landing + Meta)

### Estructura

| Segmento | Tiempo | Objetivo |
|---|---|---|
| Hook | 0-5s | Detener scroll |
| Pain amplificado | 5-20s | Resonar dolor Hacienda |
| Solución qué es | 20-50s | Mostrar EffiCommerce |
| Authority | 50-60s | Grupo Effi · 20k clientes |
| Proof Don Carlos | 60-75s | Caso específico |
| CTA | 75-90s | Diagnóstico + WhatsApp |

### Guión palabra por palabra

**[00:00-00:05 · HOOK]**
> 🎬 Primer plano: manos mayores abriendo sobre oficial con sello Ministerio Hacienda CR (recreación)
> 📺 On-screen: "Recibiste esta carta?"
> 🎤 **Narrador** (voz cálida, tono maduro-neutro LATAM):
> "Si este año recibiste carta de Hacienda por Factura 4.4, respirá. Tenés salida."

**[00:05-00:14 · PAIN amplificado]**
> 🎬 Montaje 2s cada shot: cuaderno tachado · Excel caótico · factura a mano · mujer frustrada con calculadora
> 📺 On-screen: "450.000 contribuyentes en CR deben emitir Factura 4.4"
> 🎤 Narrador:
> "La 4.4 es obligatoria desde septiembre 2025. Cuatrocientos cincuenta mil contribuyentes la tienen que emitir. Y si tu negocio corre con cuaderno, Excel o la memoria del contador, la presión es real."

**[00:14-00:20 · PAIN específico CR]**
> 🎬 Corte a exterior pulpería. Rótulo "PULPERÍA DON CARLOS" desgastado. Don Carlos en mostrador
> 🎤 Narrador (íntimo):
> "Don Carlos tiene su pulpería en Desamparados hace quince años. Cuando le llegó la carta de Hacienda, pensó: 'yo no sé nada de computadoras'."

**[00:20-00:35 · SOLUCIÓN qué es]**
> 🎬 Secuencia uso real en celular (pantalla completa vertical):
> - Don Carlos toma foto a producto
> - App EffiCommerce genera ficha automática
> - Cliente escribe WhatsApp: "me da 2 arroz, 1 frijol"
> - Don Carlos confirma
> - Cliente paga SINPE Móvil
> - XML 4.4 sale al email del contador
>
> 📺 On-screen progresivo:
> - "Tomás foto → catálogo listo"
> - "Pedido WhatsApp → ordenado"
> - "SINPE → automático"
> - "Factura 4.4 → directo al contador"
>
> 🎤 Narrador:
> "Así nació EffiCommerce para Costa Rica: un sistema que le deja el trabajo técnico a nosotros y a vos te queda lo que sabés hacer. Tomás una foto del producto. El sistema hace el catálogo. Los clientes te piden por WhatsApp con un pedido ordenado. Cobrás con SINPE Móvil. Y la Factura 4.4 sale sola, con los ciento cuarenta y seis ajustes XML validados por Hacienda."

**[00:35-00:50 · SOLUCIÓN por qué es distinto]**
> 🎬 Split: izquierda apps Shopify amontonadas con precios en dólares. Derecha EffiCommerce simple con precio colones
> 📺 On-screen: "Pricing en colones · Sin apps extra · Soporte tico"
> 🎤 Narrador:
> "Shopify es gringo. Jumpseller es chileno. Ninguno te entiende con Hacienda. Ninguno habla tu lenguaje. EffiCommerce es costarricense. Tiene soporte en hora de Costa Rica. Y trae todo incluido — sin apps extra, sin sorpresas en dólares, sin comisión por venta."

**[00:50-00:60 · AUTHORITY]**
> 🎬 Montaje: logos de marcas clientes LATAM (blurred/ilustrado, no reales) · mapa LATAM con pines CO, EC, RD, CRI iluminados
> 📺 On-screen: "20.000 clientes · 4 países · Grupo Effi"
> 🎤 Narrador:
> "EffiCommerce viene del Grupo Effi — veinte mil clientes en LATAM. Ahora llegamos a Costa Rica."

**[00:60-00:75 · PROOF Don Carlos]**
> 🎬 Don Carlos sonriendo en pulpería, celular mostrando pedidos del día
> 📺 On-screen:
> - "Don Carlos · Pulpería Desamparados"
> - "+₡800.000 extra primer mes"
> 🎤 Narrador (íntimo):
> "Don Carlos lleva tres meses con EffiCommerce. Ochocientos mil colones extra el primer mes. Su contador recibe las facturas 4.4 directas. Y dejó de pelear con Hacienda."

**[00:75-00:90 · CTA]**
> 🎬 Logo EffiCommerce grande sobre fondo Effi Navy. Botón WhatsApp verde animado. Cartela pricing
> 📺 On-screen:
> - "Diagnóstico Factura 4.4 GRATIS · 2 minutos"
> - "Plan personalizado a tu WhatsApp"
> - "Desde ₡19.900 al mes · Prueba gratis 14 días"
> 🎤 Narrador:
> "Hacé el diagnóstico gratuito de tu negocio. Dos minutos. Te mandamos el plan por WhatsApp. Clic en el botón. Pura vida."

**Disclaimer bottom durante todo el video** (Inter 400 11pt cream):
> Dramatización basada en caso real

---

## 8. Specs técnicos

- **Cámara**: DSLR/mirrorless 4K (Sony A7 IV, Canon R6 o similar)
- **Lentes**: 35mm + 85mm (retrato)
- **Iluminación**: natural complementada con rebote. NO estudio glossy
- **Audio**: lavalier + shotgun · post normalizado a -12 LUFS
- **Color grading**: warm LATAM, tonos cálidos exteriores, Effi Navy en transiciones
- **Captions**: burned-in español (font Inter bold, contraste alto, stroke 2px)

### Export final

| Uso | Formato | Res | Peso |
|---|---|---|---|
| Meta Reels/Stories/Feed | MP4 H.264 | 1080×1920 9:16 | ≤30 MB |
| Meta Feed 1:1 | MP4 H.264 | 1080×1080 | ≤30 MB |
| Meta Feed 4:5 | MP4 H.264 | 1080×1350 | ≤30 MB |
| Landing hero + YouTube | MP4 H.264 | 1920×1080 16:9 | ≤50 MB |

### Entregables adicionales
- Archivo fuente Premiere Pro o DaVinci Resolve editable
- Subtítulos SRT separados en español CR
- Thumbnail YouTube 1280×720
- OG image landing 1200×630

## 9. Compliance

- [ ] Disclaimer "Dramatización" visible en todos los videos con actor
- [ ] Consent de imagen firmado por todos los actores
- [ ] Música licenciada con prueba descargable
- [ ] Sin claims "garantizado", "#1", "único" (Ley 7472)
- [ ] Sin imágenes oficiales Hacienda (solo ilustraciones que la evocan)

## 10. Timeline

| Fase | Fecha | Entregable |
|---|---|---|
| Pre-producción | abr 21-27 | Casting confirmado + locaciones + script aprobado |
| Rodaje | abr 28-may 2 | 2 días rodaje + 1 día inserts UI |
| Post | may 3-9 | Edición + color + captions + audio |
| Revisión | may 10 | Estratega + Marketing + Legal |
| Entrega final | may 12 | 4 videos × 3 formatos = 12 archivos |
| Lanzamiento Meta | may 13 | Subida a Ads Manager |

## 11. Criterios de aprobación

- [ ] Actores (5) aprobados en casting antes de rodar
- [ ] Guiones palabra por palabra validados por estratega y legal
- [ ] UI mockups de EffiCommerce aprobados por design lead
- [ ] Disclaimer visible en minuto:segundos correctos
- [ ] Color grading y captions validados
- [ ] Peso de archivos dentro de límites Meta
$brief$,
    brief_format = 'markdown',
    updated_at = now()
  where strategy_id = v_strategy_id
    and area = 'audiovisual';

  -- ===== TRAFFICKER =====
  update public.admin_effix_requirements
  set brief_md = $brief$# Brief · Trafficker · Setup Meta + Google + tracking CAPI

## 1. Bloqueantes antes de gastar (semanas 1-2)

- [ ] Meta Business Manager CR nuevo (no reusar Feria Effix)
- [ ] Meta Pixel `EffiCommerce_CR_Pixel` + CAPI dataset
- [ ] CAPI server-side vía n8n webhook — endpoint `/webhook/meta-capi-cr`
- [ ] Google Ads account CR + Enhanced Conversions + auto-tagging
- [ ] GTM container CR + GA4 property web + Consent Mode v2
- [ ] WhatsApp Business API (Twilio o 360dialog) + número +506 verificado
- [ ] 8 plantillas WhatsApp enviadas a aprobación Meta (2-3 días)
- [ ] QA Test Events: pixel + CAPI con deduplicación por event_id
- [ ] EMQ score Meta ≥ 7

## 2. Campañas Meta — detalle completo

### CAMP_1 · F1 Conversations WA · Funnel A (core)

| Parámetro | Valor |
|---|---|
| Objetivo | Engagement → Messaging |
| Destino | WhatsApp +506 XXXX-XXXX |
| Budget inicio | $15/día Ad Set 1 + $5/día Ad Set 2 |
| Escala sem 9+ | $25/día |
| Optimization event | Conversations Started |
| Placements | Feed + Stories + Reels (NO Audience Network) |
| Attribution | 7d click, 1d view |

**Ad Sets**:
- AS_A1 Broad GAM — Geo San José/Alajuela/Heredia/Cartago +25km · 30-55 · intereses Small business + WhatsApp Business + Factura electrónica
- AS_A2 Interest SMB CR — Geo nacional · 30-55 · intereses Small business + Entrepreneurship + Business consulting
- AS_A3 Lookalike Grupo Effi (sem 4+) — 1% CR seed clientes CO/EC/RD

**Creativos por Ad Set**: 3 videos × 3 variantes copy = 9 ads (ver copy deck abajo)

### CAMP_2 · F1 Video Views ThruPlay · Funnel A (pixel warming)

| Parámetro | Valor |
|---|---|
| Objetivo | Awareness → Video Views |
| Optimization | ThruPlay 15s |
| Budget | $5/día × 2 Ad Sets = $10/día |
| Placements | Stories + Reels + Feed · NO Audience Network |

### CAMP_3 · F1 Traffic Landing B · Funnel Shopify

| Parámetro | Valor |
|---|---|
| Objetivo | Traffic → Landing Page Views |
| URL destino | efficommerce.com/cr/auditoria-shopify |
| Budget | $8/día × 6 sem = $336 |
| Audiencia | Shopify owners CR 25-45 · intereses Shopify + Ecommerce + Online store |

### CAMP_4 · F1 Retargeting cross-funnel

| Parámetro | Valor |
|---|---|
| Objetivo | Conversions → Lead |
| Budget | $5/día × 8 sem = $280 |
| Audiencia | Custom 7/14/30 días visitantes /cr — excluir leads convertidos |

### CAMP_5 · F2 Lookalike (activar sem 9)

Lookalike 1% CR seed = demos agendadas (mínimo 100 personas).

---

## 3. Copy de anuncios Meta — LISTO PARA SUBIR

### Video V1 "Don Carlos" · 3 variantes

**Variante 1 · Dolor Hacienda**
- Primary text: "Si este año recibiste carta de Hacienda por Factura 4.4, respirá.\n\nDon Carlos también la recibió. Tiene su pulpería en Desamparados hace 15 años. Pensó: "yo no sé nada de computadoras".\n\nDos semanas después estaba vendiendo por WhatsApp, cobrando por SINPE y emitiendo Factura 4.4 desde el celular.\n\n¿Querés ver cómo? 👇"
- Headline: "La 4.4 no tiene que volverte loco"
- Description: "Diagnóstico gratis en 2 min"
- CTA: Send Message

**Variante 2 · Aspiracional**
- Primary text: "₡800.000 extra el primer mes.\n\nEse fue el resultado de Don Carlos después de poner su pulpería en línea con EffiCommerce.\n\nNo cambió de local. No aprendió computación. Solo empezó a recibir pedidos por WhatsApp y a cobrar con SINPE."
- Headline: "Tu pulpería en línea esta semana"
- Description: "WhatsApp + SINPE + Factura 4.4"
- CTA: Send Message

**Variante 3 · Curiosidad**
- Primary text: "Don Carlos tiene 58 años y nunca había usado Facebook para vender.\n\nHoy factura 4.4, recibe pedidos por WhatsApp y cobra con SINPE — todo desde el celular que ya tenía.\n\nTe cuento exactamente cómo lo hizo 👇"
- Headline: "Ni computadora necesitás"
- Description: "Solo tu celular. 7 días."
- CTA: Learn More

### Video V2 "Excel" y V3 "No computación"

Ver copy completo en 3 variantes cada uno en: `marcas/efficommerce/costa-rica/campanas/ads-meta-funnel-a.md`

---

## 4. Google Ads — estructura + RSAs

### CAMP Brand · Exact match

**Keywords**:
`[efficommerce]`, `[effi commerce]`, `[efficommerce costa rica]`, `[efficommerce cr]`, `[grupo effi costa rica]`

**RSA Headlines (15)**:
1. EffiCommerce Costa Rica (pin H1)
2. Sitio Oficial EffiCommerce
3. Factura 4.4 + SINPE Nativos (pin H2)
4. Software Ecommerce Costa Rica
5. ₡19.900/mes Todo Incluido
6. Habla con EffiCommerce Hoy
7. Demo Personalizada Gratis
8. Soporte Tico 8am-8pm
9. 20.000+ Clientes en LATAM
10. Prueba Gratis 14 Días
11. Sin Comisión por Venta
12. WhatsApp + SINPE + 4.4
13. Grupo Effi · Ahora en CR
14. Planes Desde ₡19.900/mes
15. Agendá Demo CR Ya

**Descriptions (4)**:
1. Sitio oficial de EffiCommerce CR. Factura 4.4 y SINPE Móvil listos desde día 1. Hablemos.
2. 20.000+ clientes en LATAM ahora en Costa Rica. Demo personalizada gratis. Prueba 14 días.
3. Grupo Effi — 140.000 asistentes Feria Effix. Vendé con WhatsApp, SINPE y 4.4 integrados.
4. Planes desde ₡19.900/mes. Todo incluido. Soporte en hora CR. Agendá tu demo hoy mismo.

### CAMP Categoría A · Ad Group "Factura 4.4"

**Keywords phrase match**:
- "factura electronica 4.4 costa rica"
- "factura 4.4 costa rica"
- "sistema factura electronica 4.4"
- "software factura electronica hacienda"
- "como emitir factura electronica 4.4"

**RSA Headlines**:
1. Factura 4.4 desde el Celular (pin H1)
2. Cumplí Hacienda sin Pelear (pin H2)
3. XML 4.4 Validado Siempre
4. 146 Ajustes XML Resueltos
5. Sistema Para Pulperías
6. ₡19.900/mes con 4.4 Incluida
7. Setup en 7 Días
8. Tu Contador lo Aprueba
9. SINPE Código 06 Automático
10. Demo Factura 4.4 Gratis
11. Hacienda OK con EffiCommerce
12. Prueba Gratis 14 Días
13. 450k Contribuyentes Afectados
14. Soporte Tico 8am-8pm
15. Sin Apps Extra · Todo Nativo

**Descriptions**:
1. Factura Electrónica 4.4 nativa. Los 146 ajustes XML validados por Hacienda.
2. Diagnóstico Factura 4.4 gratis en 2 min. Te mandamos un mini-plan a tu WhatsApp.
3. SINPE Móvil código 06 automático. Tu contador recibe los XML validados directamente.
4. Desde ₡19.900/mes. Soporte tico. Prueba 14 días sin tarjeta. Agendá demo personalizada.

### Ad Groups adicionales
Ver detalle completo 4 ad groups × 15 headlines en: `marcas/efficommerce/costa-rica/campanas/ads-google-funnel-a.md`
Categoría B (migración Shopify) en: `ads-google-funnel-b.md`

---

## 5. Extensiones Google Ads

**Sitelinks (8)**:
1. Diagnóstico 4.4 Gratis → /cr/diagnostico-factura-44
2. Planes y Precios → /cr/precios
3. Casos de Éxito → /cr/casos
4. Cómo Funciona → /cr/como-funciona
5. Integraciones CR → /cr/integraciones
6. Blog Factura 4.4 → /cr/blog/factura-4-4
7. Soporte en CR → /cr/soporte
8. Agendá Demo → /cr/demo

**Callouts (10)**:
Factura 4.4 nativa · SINPE automático · Soporte tico 8am-8pm · Prueba gratis 14 días · Sin comisión por venta · 20.000+ clientes LATAM · Setup guiado 7 días · Respuesta WA en 1 hora · Comunidad Grupo Effi · Cumple Ley 8968

**Structured Snippets**:
- Types: Factura 4.4 · SINPE · WhatsApp Business · Multi-Courier · Comunidad · Soporte CR

## 6. Audiencias Meta — parámetros exactos

### AUD_A1 — Broad GAM

- Ubicación: Costa Rica → San José, Alajuela, Heredia, Cartago + 25 km
- Excluir: Limón, Guanacaste, Puntarenas (testear Fase 2)
- Edad: 30-55
- Idioma: Español
- Expansión detailed targeting: Activada
- Intereses grupo 1 (OR): Small business · Entrepreneurship · Business consulting · Retail · Sole proprietorship
- Intereses grupo 2 (AND grupo 1): Accounting · Tax · Invoice · WhatsApp Business
- Comportamientos: Facebook Page Admins · Small business owners
- Exclusiones: engagers EffiCommerce + custom leads_efficommerce_cr

### AUD_A2 — Interest SMB CR
Ver detalle en `campanas/ads-meta-funnel-a.md` sección 2.

## 7. Tracking events pixel + CAPI

| Evento | Dispara en | Valor $ |
|---|---|---|
| PageView | /cr/* | — |
| ViewContent | /cr/diagnostico-factura-44, /cr/auditoria-shopify | — |
| Lead | Form diagnóstico submit | $10 |
| Contact | Click botón WhatsApp | $2 |
| CompleteRegistration | Primer mensaje WA recibido | $3 |
| Schedule | Demo agendada (webhook Calendly) | $50 |

**Parámetros custom**: `funnel_track` (A/B), `lead_source`, UTMs estándar.

## 8. Naming convention

**Meta**:
```
Campaign: [Fase] [Objetivo] | [Funnel]
Ad Set:   [Audiencia] | [Placement] | [Budget/día]
Ad:       [Creative-slug] | [Copy-variant] | [vXX]
```

Ejemplo: `F1 Conversations WA | Funnel A` / `Int-SMB-30-55-GAM | AutoPlacement | $15` / `Pulperia-Don-Carlos | Copy-PainHacienda | v1`

**Google**: `[Tipo] [Target] | [Match] | [Funnel]` — ej `Search Brand | Exact | Funnel AB`

## 9. Bidding strategy

| Campaña | Sem 3-8 | Sem 9-12 |
|---|---|---|
| Brand | Maximize Clicks | Target Impression Share 90% Top |
| Categoría A FE 4.4 | Max Clicks · bid cap $1.50 | Target CPA $25 (con 30+ conv) |
| Categoría A SINPE | Max Clicks · bid cap $1.30 | Target CPA $25 |
| Categoría B Shopify | Max Clicks · bid cap $1.80 | Target CPA $50 |

## 10. Negativas globales

Aplicar a toda la cuenta:
```
-gratis -free -crack -hackear -piratear -curso -tutorial -pdf -manual -descargar -empleo -trabajo -cargos -vacantes -sueldo -afiliados -mlm -multinivel -login -wikipedia -que es -significado
```

Exclusiones cruzadas con Effi System CR:
```
-erp -sistema administrativo -contabilidad avanzada -nomina -recursos humanos -planilla electronica
```

## 11. Criterios de aprobación

- [ ] BM + Pixel + CAPI verificados (Test Events verde)
- [ ] EMQ Score ≥ 7
- [ ] Todas las plantillas WA aprobadas por Meta
- [ ] 23 creativos subidos (9 Meta A + 14 Meta B)
- [ ] 3 campañas Google con RSAs completos (15H + 4D)
- [ ] Consent Mode v2 funcional
- [ ] Budget diario configurado por campaña
- [ ] Ad schedule 6am-23pm CR
- [ ] Frontera con Effi System CR documentada

## 12. Timeline

| Fase | Fecha |
|---|---|
| Setup cuentas + pixel + CAPI | abr 20-26 |
| QA tracking + WA templates aprobadas | abr 27-may 3 |
| Subida creativos | may 1-3 |
| **Lanzamiento soft** | **may 4** |
| Primera revisión | may 8 |
| Funnel B on | may 11 |
| Gate G4 reasignación | may 18 |
$brief$,
    brief_format = 'markdown',
    priority = 'urgent',
    updated_at = now()
  where strategy_id = v_strategy_id
    and area = 'trafficker';

  -- ===== DEV WEB =====
  update public.admin_effix_requirements
  set brief_md = $brief$# Brief · Desarrollo Web · Landing /cr/ + diagnóstico + auditoría

## 1. Stack técnico

- **Base**: clon del stack de `marcas/feria-effix/assets/landing-ecuador/` (Vite + HTML + Tailwind CDN + vanilla JS)
- **NO React** en esta landing (es microsite de conversión, no app)
- **Hosting**: Vercel subdirectorio `efficommerce.com/cr/`
- **Fonts**: Inter Tight + Inter de Google Fonts
- **Iconos**: Phosphor Icons CDN

## 2. Páginas a construir

| Ruta | Propósito |
|---|---|
| `/cr/` | Landing principal dual funnel con selector de perfil en hero |
| `/cr/diagnostico-factura-44` | Form 6 preguntas + score + plan personalizado al WhatsApp |
| `/cr/auditoria-shopify` | Form URL tienda + 5 preguntas → reporte 24h por email + WA |
| `/cr/gracias-a` | Thank-you Funnel A |
| `/cr/gracias-b` | Thank-you Funnel B |
| `/cr/privacidad` | Aviso de Privacidad (Ley 8968 CR) |
| `/cr/terminos` | Términos y Condiciones |

## 3. Landing principal `/cr/` — copy completo

Ver copy deck completo (16 secciones) en: `marcas/efficommerce/costa-rica/assets/landing-cr/copy-deck-cr.md`

### Secciones obligatorias
1. Meta SEO (title + description + OG)
2. Hero con selector de perfil dual (Card A + Card B)
3. Barra de logos de confianza (SINPE, Correos CR, Aeropost, DHL CR, BAC, Hacienda Digital)
4. Problema (storytelling — Factura 4.4, 450k contribuyentes)
5. Solución bento grid 6 cards
6. Cómo funciona 3 pasos
7. Funnel A dedicado (pulperías/sodas/talleres/profesionales)
8. Funnel B dedicado (tabla comparativa EffiCommerce vs Shopify)
9. Testimonios (4 con actores — dramatización basada en caso real)
10. Pricing 3 planes (Esencial ₡19.900 / Pro ₡49.900 / Escala a medida)
11. Seguridad y compliance
12. Sobre Grupo Effi
13. FAQ 12 preguntas
14. CTA final
15. Footer (4 columnas)
16. Páginas adicionales thin

## 4. Formulario diagnóstico Factura 4.4 (6 preguntas)

```html
<form id="diagnostico-factura-44">
  <!-- Pregunta 1 -->
  <label>¿Cómo emitís facturas hoy?
    <select name="facturacion_actual" required>
      <option value="mano">A mano</option>
      <option value="excel">Excel</option>
      <option value="software_otro">Otro software</option>
      <option value="no_facturo">No facturo aún</option>
      <option value="no_se">No sé</option>
    </select>
  </label>

  <!-- Pregunta 2 -->
  <label>¿Cuántas ventas al mes?
    <select name="ventas_mes" required>
      <option value="menos_50"><50</option>
      <option value="50_200">50-200</option>
      <option value="200_1000">200-1000</option>
      <option value="mas_1000">>1000</option>
    </select>
  </label>

  <!-- Pregunta 3 -->
  <label>¿Aceptás SINPE Móvil?
    <input type="radio" name="sinpe" value="si_manual"> Sí manual
    <input type="radio" name="sinpe" value="si_automatico"> Sí automatizado
    <input type="radio" name="sinpe" value="no"> No todavía
  </label>

  <!-- Pregunta 4 -->
  <label>¿Sabés qué es el código 06 en Factura 4.4?
    <input type="radio" name="codigo_06" value="si"> Sí
    <input type="radio" name="codigo_06" value="no"> No
    <input type="radio" name="codigo_06" value="mas_o_menos"> Más o menos
  </label>

  <!-- Pregunta 5 -->
  <label>Tu WhatsApp (+506) *
    <input type="tel" name="telefono" required pattern="^\+506[0-9]{8}$">
  </label>

  <!-- Pregunta 6 -->
  <label>Tu nombre *
    <input type="text" name="nombre" required>
  </label>

  <!-- Consent obligatorio Ley 8968 -->
  <label>
    <input type="checkbox" name="consent" required>
    Autorizo a EffiCommerce a usar mis datos para armar mi plan personalizado
    y contactarme por WhatsApp. Puedo revocar escribiendo SALIR o a
    privacidad.cr@efficommerce.com.
    <a href="/cr/privacidad">Aviso de Privacidad</a>
  </label>

  <button type="submit">Enviar y recibir mi plan en WhatsApp →</button>
</form>
```

### Cálculo del score (lógica cliente)

- Facturación actual: mano/no_facturo/no_se = 0pts · Excel = 2pts · software_otro = 5pts
- SINPE: no = 0pts · si_manual = 3pts · si_automatico = 7pts
- Código 06: no = 0pts · mas_o_menos = 3pts · si = 5pts
- Ventas: menos_50 = 1pts · 50-200 = 2pts · 200-1000 = 3pts · mas_1000 = 5pts

**Total máximo 22pts, normalizar a 10.**

### Plan personalizado (server-side vía n8n)

Según score, generar PDF 1 página con:
- Score visible (ej. 6/10)
- 3 acciones prioritarias según respuestas
- Link a demo EffiCommerce
- Enviar al WhatsApp vía plantilla `efficommerce_cr_welcome_diagnostico_a`

## 5. Formulario auditoría Shopify (5 campos)

```html
<form id="auditoria-shopify">
  <input type="url" name="url_tienda" placeholder="https://mitienda.cr" required>
  <select name="plataforma" required>
    <option value="shopify">Shopify</option>
    <option value="jumpseller">Jumpseller</option>
    <option value="tiendanube">Tiendanube</option>
    <option value="woocommerce">WooCommerce</option>
    <option value="otra">Otra</option>
  </select>
  <select name="facturacion_mes" required>
    <option value="menos_5k"><$5k USD</option>
    <option value="5k_20k">$5-20k</option>
    <option value="20k_50k">$20-50k</option>
    <option value="mas_50k">>$50k</option>
  </select>
  <select name="factura_44" required>
    <option value="nativa">Sí nativo</option>
    <option value="app">Sí vía app</option>
    <option value="no">No</option>
  </select>
  <input type="tel" name="telefono" placeholder="+506" required>
  <input type="text" name="nombre" required>
  <!-- Consent igual que diagnóstico -->
</form>
```

Reporte generado manual por SDR/trafficker y enviado en 24h.

## 6. Tracking completo

### GTM Container

Tags a configurar:
- **GA4 Config**: measurement ID `G-XXXXXXXXXX` · enhanced measurement ON
- **Meta Pixel base code**: pixel ID `XXXXXXXXXX`
- **Meta Conversions API**: via custom HTML tag → fetch a n8n webhook server-side
- **Google Ads conversion tag**: conversion ID + label para cada conversion

Triggers:
- `page_view` → All Pages
- `form_submit` → Form ID matches diagnostico o auditoria
- `wa_click` → Click element .btn-whatsapp
- `scroll_75` → Scroll Depth >= 75%

### Consent Mode v2

Implementar con Cookiebot free tier o similar:
```javascript
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
});
// Post consent:
gtag('consent', 'update', {
  ad_storage: 'granted',
  // ...
});
```

**Checkbox adicional Ley 8968** separado de T&C (obligatorio).

### UTMs propagados al webhook

```javascript
const utms = new URLSearchParams(window.location.search)
const payload = {
  ...formData,
  utm_source: utms.get('utm_source'),
  utm_medium: utms.get('utm_medium'),
  utm_campaign: utms.get('utm_campaign'),
  utm_content: utms.get('utm_content'),
  utm_term: utms.get('utm_term'),
  referrer: document.referrer,
  consent_ts: new Date().toISOString(),
}
fetch(N8N_WEBHOOK_URL, { method: 'POST', body: JSON.stringify(payload) })
```

## 7. n8n flow (coordinar con trafficker)

```
Webhook /webhook/cr-leads
   ↓
Insert Supabase admin_effix_leads (con strategy_id de CR)
   ↓
Router por profile_type (A/B)
   ↓
[Funnel A] → Supabase fetch plantilla → WhatsApp API plantilla `efficommerce_cr_welcome_diagnostico_a` con variables
[Funnel B] → WhatsApp API plantilla `efficommerce_cr_welcome_auditoria_b` + crear ticket asignado a SDR
   ↓
Set timer 48h → nurturing D2 (si no respondió)
   ↓
Set timer 96h → plantilla D4 objection
   ↓
Set timer 144h → D6 social proof
   ↓
Set timer 168h → D7 closeout → pausar
   ↓
CAPI event dispatch a Meta (deduplication por event_id)
```

## 8. Specs performance

- **Lighthouse Performance**: ≥90 mobile
- **LCP**: <2.5s
- **CLS**: <0.1
- **Bundle JS**: <100KB gzip
- **Imágenes**: WebP con fallback PNG · lazy load
- **Fonts**: preload + swap

## 9. Checklist pre-deploy

- [ ] Lighthouse mobile ≥ 90 en /cr/ y /cr/diagnostico-factura-44
- [ ] Forms submit webhook n8n staging
- [ ] GTM + GA4 + Meta Pixel + CAPI verificados con Tag Assistant y Events Manager
- [ ] Consent Mode v2 funcional (modo denied default)
- [ ] Thank-you pages operativas
- [ ] Links WhatsApp con número real +506
- [ ] Favicon + PWA manifest
- [ ] Sitemap.xml + robots.txt
- [ ] SSL habilitado (Vercel automático)
- [ ] Redirects 301 si `/cr/` tenía contenido previo
- [ ] UTMs propagan al webhook correctamente
- [ ] Responsive 320px a 1440px
- [ ] Accesibilidad WCAG AA (color contrast, alt texts, aria labels)

## 10. Timeline

| Fase | Fecha |
|---|---|
| Clon stack landing-ecuador | abr 21 |
| Aplicar brand + copy | abr 22-26 |
| Forms diagnóstico + auditoría | abr 27-29 |
| Tracking setup | abr 28-30 |
| n8n flow conectado | may 1 |
| QA end-to-end | may 2 |
| Deploy staging Vercel | may 2 |
| Aprobación estratega | may 3 |
| **Deploy producción** | **may 4** (junto con lanzamiento Meta) |

## 11. Criterios de aprobación

- [ ] Diseño aprobado por Design Lead (paleta + tipografía + specs)
- [ ] Copy exacto del `copy-deck-cr.md`
- [ ] Tracking Test Events Meta verde (EMQ >=7)
- [ ] GA4 DebugView muestra eventos con parámetros
- [ ] Forms guardan lead en Supabase con todos los UTMs
- [ ] Mensaje WA llega en <2 min tras submit
- [ ] Lighthouse ≥ 90
- [ ] Compliance Ley 8968 validado (consent, política, email privacidad)
$brief$,
    brief_format = 'markdown',
    priority = 'urgent',
    updated_at = now()
  where strategy_id = v_strategy_id
    and area = 'dev_web';

  -- ===== FINANZAS =====
  update public.admin_effix_requirements
  set brief_md = $brief$# Brief · Finanzas · Pacing + cierre mensual + conversión multi-moneda

## 1. Presupuesto total aprobado

- **$1,000 USD/mes × 3 meses = $3,000 USD total**
- Equivalente CRC a TRM 0.001923: **₡1,560,000 total**
- Distribución por plataforma: ver tab Presupuesto del CMS

## 2. Proceso diario — registro de gastos

### Flujo estándar (manual desde UI)

1. Cada día, el trafficker descarga de Meta Ads Manager y Google Ads el spend real del día anterior
2. Entra al CMS: BrandView EffiCommerce → tab Libro diario → botón "Nuevo gasto"
3. Completa:
   - Fecha (día del gasto, no de registro)
   - Plataforma (meta, google, tiktok, whatsapp, etc.)
   - Monto local (en la moneda en que pagamos — CRC si es tarjeta CR, USD si es tarjeta internacional)
   - Moneda
4. El sistema calcula automáticamente:
   - FX rate desde tabla `admin_effix_fx_rates` según fecha
   - Amount USD = amount_local × fx_rate (validado por trigger)
5. Notas opcionales: nombre campaña, ajustes, comentarios

### Flujo bulk (CSV import)

Cuando hay muchos gastos al final de la semana o mes:
1. Preparar CSV con columnas: `fecha,platform,currency,amount_local,campaign,notes`
2. BrandView → tab Libro diario → "Importar CSV"
3. El sistema valida fila a fila y muestra preview con errores
4. Si todas las filas son válidas → commit transaccional
5. Si hay errores (ej. sin TRM para esa fecha) → descargar error report, corregir, re-subir

## 3. TRMs — actualización semanal

Responsabilidad: revisar BCCR / Banrep / otros bancos centrales cada lunes y actualizar TRMs del día.

**Donde actualizar**: Admin → FX rates → form upsert

**Monedas a mantener actualizadas**:
- CRC (Costa Rica) — obligatorio
- COP (Colombia)
- DOP (Rep. Dominicana)
- GTQ (Guatemala)
- USD = 1.0 fijo

**Regla**: si al importar CSV falta una TRM para la fecha pedida, el sistema resuelve con la TRM más cercana anterior. Pero si queremos reportes precisos, conviene tener TRM diaria.

## 4. Pacing semanal

Cada viernes, revisar pace vs presupuesto:

- **Pace ideal** al 100% del tiempo transcurrido = 100% del budget gastado
- **Verde**: pace 70-110%
- **Amarillo**: pace 50-70% (sub-gasto) o 110-130% (sobre-gasto)
- **Rojo**: <50% (infrautilización) o >130% (riesgo presupuestario)

Widget "Pace cross-marca" en HomeView muestra esto para las 10 marcas. Click en una marca lleva al detalle.

Reporte semanal:
- BrandView → tab Reportes → "Nuevo reporte" → tipo "Semanal"
- Botón "Regenerar snapshot" captura automáticamente: spend total, spend por plataforma, requerimientos publicados en el período
- Editar body con markdown: highlights, lowlights, próximos pasos
- Guardar → disponible para imprimir a PDF

## 5. Cierre mensual

Al final de cada mes (último viernes o primer viernes del siguiente):

1. Validar que todos los gastos del mes están registrados (comparar con facturas Meta/Google)
2. Conciliar diferencias (si Meta factura $400 pero registramos $398, ajustar)
3. BrandView → tab Libro diario → botón "Cerrar mes" → confirmar año+mes
4. RPC `admin_effix_reconcile_month` marca todos los entries de ese período como `reconciled = true`
5. Después de reconciliar, los entries quedan **bloqueados**: solo super_admin puede editarlos (regla de integridad contable)
6. Crear reporte mensual con snapshot automático

## 6. KPIs financieros a reportar mensualmente

| KPI | Cálculo | Target |
|---|---|---|
| Spend total USD | sum(amount_usd) del mes | ≤$1,000 |
| Spend por plataforma | sum(amount_usd) group by platform | proporciones 40/25/20/10/5 |
| CPL promedio | spend_total / leads_qualified | <$3.00 |
| CAC (Customer Acquisition Cost) | spend_total / clientes_cerrados | <$200 |
| ROAS estimado | revenue_estimated / spend | >3x |

## 7. Integración con contador externo

- Exportar XLSX mensual: BrandView → Libro diario → "Export XLSX"
- Entregar a contabilidad junto con facturas Meta/Google del mes
- Convertir USD a CRC oficiales para declaración tributaria CR

## 8. Criterios de aprobación (checklist mensual)

- [ ] Todos los gastos del mes registrados (0 discrepancias vs facturas)
- [ ] TRMs diarias actualizadas del mes
- [ ] Mes cerrado con RPC reconcile
- [ ] Reporte mensual creado y exportado a PDF
- [ ] XLSX enviado a contabilidad
- [ ] Pace vs budget comentado en bitácora

## 9. Entregables

- [ ] Capacitación de 30 min a trafficker sobre flujo de registro
- [ ] Calendario semanal de updates TRM
- [ ] Proceso documentado de cierre mensual
- [ ] Primer reporte mensual (fin de mayo) como baseline

## 10. Timeline

| Acción | Fecha |
|---|---|
| Configurar alertas de pacing semanal | abr 22 |
| Primer update TRM | abr 20 |
| Primer gasto real registrado | may 4 (lanzamiento) |
| Primer reporte semanal | may 10 |
| Cierre mes abril (si aplica) | may 3 |
| Cierre mes mayo | jun 6 |
| Reporte mensual junio | jul 4 |
$brief$,
    brief_format = 'markdown',
    updated_at = now()
  where strategy_id = v_strategy_id
    and area = 'finanzas';

  raise notice 'Todos los briefs actualizados sin referencias UGC.';
end $mig2$;
