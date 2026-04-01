# 📦 Proyecto Feria Effix 2026 — Reporte Maestro
> **Generado:** 19 de marzo de 2026  
> **Responsable:** Alexander Kastiñeira  
> **Empresa:** Grupo Effi — EffiX S.A.S. | NIT 901497359  
> **Cuenta Google Ads:** 356-853-8992 | `pautaferiaeffix@gmail.com`

---

## 🗂️ Índice

1. [Contexto del Evento](#contexto-del-evento)
2. [Infraestructura Técnica (Google Ads + GA4 + GTM)](#infraestructura-técnica)
3. [Campañas Activas](#campañas-activas)
4. [Estrategia por Fases](#estrategia-por-fases)
5. [Segmentación Geográfica](#segmentación-geográfica)
6. [Landing Page y Pasarelas de Pago](#landing-page-y-pasarelas-de-pago)
7. [Análisis Meta Ads — Dataset EVENTOSGRUPOEFFI.csv](#análisis-meta-ads)
8. [Pendientes y Próximos Pasos](#pendientes-y-próximos-pasos)
9. [Credenciales y Accesos](#credenciales-y-accesos)
10. [Historial de Versiones GTM](#historial-de-versiones-gtm)

---

## 🎯 Contexto del Evento

| Campo | Detalle |
|---|---|
| **Nombre** | Feria Effix 2026 — 6ª Edición |
| **Fecha** | 16, 17 y 18 de Octubre de 2026 |
| **Sede** | Plaza Mayor, Medellín |
| **Organizador** | Grupo Effi — EffiX S.A.S. |
| **Posicionamiento** | Mayor feria de ecommerce de Latinoamérica |
| **Ticket principal** | Black Ticket — USD $997 (o 4 cuotas de USD $250) |

### Trayectoria histórica

| Edición | Año | Asistentes | Crecimiento | Inversión |
|---|---|---|---|---|
| 1ª | 2021 | 2,580 | — | N/D |
| 2ª | 2022 | 14,000 | +443% | N/D |
| 3ª | 2023 | 35,733 | +155% | N/D |
| 4ª | 2024 | 41,991 | +18% | N/D |
| 5ª | 2025 | 49,256 | +17% | US$1.5M |
| **6ª** | **2026** | **Meta: ~55,000–58,000** | ~+17% proy. | US$40,000 Google Ads |

> **Nota:** El crecimiento se ha estabilizado en ~17–18% anual. La proyección conservadora para 2026 es 55,000–58,000 asistentes.

### Estructura de tickets 2026

| Ticket | Precio COP | Precio USD | Incluye |
|---|---|---|---|
| Pasaporte 3 días | $201,300 | ~$50 | Acceso general 3 días |
| **Black** | **$3,997,000** | **$997** | Comidas, 9 mentorías, networking premium, zonas exclusivas, backstage, desayunos con speakers, Fotograffix, zona de contenido, fire walk, apertura/cierre exclusivo |
| Black (cuotas) | 4 × $1,000,000 | 4 × $250 | Mismo beneficio |
| Menores de 12 | Gratis | — | — |

---

## 🔧 Infraestructura Técnica

### 2.1 Google Ads

| Campo | Valor |
|---|---|
| ID de cuenta | **356-853-8992** |
| Correo de acceso | pautaferiaeffix@gmail.com |
| Tipo de perfil | Organización — Effix S.A.S. |
| NIT | 901497359 |
| País de facturación | Colombia |
| Zona horaria | GMT-05:00 — Hora estándar de Colombia |
| Moneda | COP (Peso colombiano) |
| Etiquetado automático | ✅ Activado |
| Certificación venta entradas | ✅ Aprobada |
| Estado | ✅ Activa — 2 campañas corriendo |

### 2.2 Google Analytics 4 (GA4)

| Campo | Valor |
|---|---|
| ID de medición | **G-CRXZ50VX7D** |
| ID del flujo de datos | 13248640925 |
| Nombre del flujo | feriaeffix.com |
| URL | https://feriaeffix.com |
| Vinculada con Google Ads | ✅ Sí — Cuenta 356-853-8992 |
| Fecha de vinculación | 10 de marzo de 2026 |
| Estado | ✅ Activa — Recibiendo datos en tiempo real |

> **GA4 sin usar:** G-6DQBGWG7RS — puede eliminarse.

### 2.3 Google Tag Manager (GTM)

| Campo | Valor |
|---|---|
| ID del contenedor | **GTM-TLRMK246** |
| Google Tag | GT-P8QZK4S6 |
| Versión publicada | **V5** (13 de marzo de 2026) |
| Estado | ✅ Activo — 3 etiquetas, 2 activadores |

### 2.4 Etiquetas GTM publicadas

#### Etiqueta 1 — Remarketing
| Campo | Valor |
|---|---|
| Tipo | Remarketing de Google Ads |
| ID de conversión | AW-17981312035 |
| Activador | All Pages |
| Estado | ✅ Publicada y activa |

#### Etiqueta 2 — Conversión Black Pago Completo
| Campo | Valor |
|---|---|
| Tipo | Seguimiento de conversiones Google Ads |
| ID de conversión | 17981312035 |
| Etiqueta de conversión | RTbrCMHZpoYcEKOYlP5C |
| Valor | 3,997,000 COP (USD $997) |
| Activador | Page URL = `https://feriaeffix.com/boleta-black/gracias/` |
| Verificado con Tag Assistant | ✅ 13 de marzo de 2026 |

#### Etiqueta 3 — Conversión Black Cuotas
| Campo | Valor |
|---|---|
| Tipo | Seguimiento de conversiones Google Ads |
| ID de conversión | 17981312035 |
| Etiqueta de conversión | RTbrCMHZpoYcEKOYlP5C |
| Valor | 1,000,000 COP (primera cuota, USD $250) |
| Activador | Page URL contiene `boleta-black/gracias-2` |
| Verificado con Tag Assistant | ✅ 13 de marzo de 2026 |

---

## 📣 Campañas Activas

### 4.1 [Search] Marca Effix

> Captura personas que ya buscan Feria Effix directamente.

| Campo | Valor |
|---|---|
| Tipo | Búsqueda (Search) |
| Objetivo | Ventas — Maximizar conversiones |
| URL de destino | `https://feriaeffix.com/estrategia-google-ads/` |
| Ruta visible | feriaeffix.com/black-ticket/2026 |
| Presupuesto diario | **88,000 COP (~USD $21/día)** |
| Redes | Búsqueda + Partners (Display desactivada) |
| Concordancia | Exacta |
| Calidad del anuncio | Promedio |
| Nivel de optimización | 93.4% |
| Estado | ✅ Activa — Anuncio apto |
| Fecha de inicio | 11 de marzo de 2026 |

**Palabras clave (10 — concordancia exacta):**
```
[feria effix], [effix], [feria effix 2026], [effix medellin], [effix 2026]
[feriaeffix], [feria effi], [grupo effi feria], [effix colombia], [effix black ticket]
```
> 7 aptas, 3 con volumen bajo (se activan automáticamente).

**Títulos del anuncio (15):**
- Effix 2026 | Entrada Black
- Black Ticket USD $997
- 9 Mentorías con Speakers
- Solo 43% Disponible
- Feria Effix | Medellín
- Experiencia VIP Premium
- 16-18 Octubre 2026
- Comidas + Mentorías 3 Días
- La Feria #1 del MUNDO
- Paga en 4 Cuotas de $250
- Networking de Alto Nivel
- 49,000+ Asistentes en 2025
- Plaza Mayor Medellín
- Zona Black Exclusiva
- Compra Tu Black Ticket Hoy

**Descripciones (4):**
1. La feria de ecommerce más grande del MUNDO. 3 días de networking, mentorías y aprendizaje.
2. 9 mentorías exclusivas con speakers premium. Comidas incluidas los 3 días. Cupos limitados.
3. Conecta con +20,000 negocios. Zona Black exclusiva. Descuentos en hotelería. Compra ahora.
4. USD $997 o 4 cuotas de $250. Solo queda el 43% disponible. Asegura tu entrada Black hoy.

---

### 4.2 [Search] Categoría

> Captura personas que buscan eventos de ecommerce sin conocer Effix aún.

| Campo | Valor |
|---|---|
| Tipo | Búsqueda (Search) |
| Objetivo | Ventas — Maximizar conversiones |
| URL de destino | `https://feriaeffix.com` |
| Ruta visible | feriaeffix.com/2026/boletas |
| Presupuesto diario | **73,000 COP (~USD $17/día)** |
| Redes | Búsqueda + Partners (Display desactivada) |
| Concordancia | Frase |
| Calidad del anuncio | Pendiente (sin datos aún) |
| Nivel de optimización | 98% |
| Estado | ✅ Activa — Estrategia de oferta en aprendizaje |
| Fecha de inicio | 13 de marzo de 2026 |

**Palabras clave activas (concordancia de frase):**
```
"conferencias marketing digital", "eventos ecommerce colombia", "feria ecommerce medellin"
"eventos emprendimiento 2026", "feria emprendimiento medellin", "cursos ecommerce presencial"
```

**Palabras clave con volumen bajo (se activan solas):**
```
"feria dropshipping", "eventos negocios digitales", "conferencias emprendedores colombia"
"donde aprender ecommerce presencial", "evento dropshipping latinoamerica"
"feria negocios digitales 2026", "feria comercio electronico"
"eventos marketing digital colombia", "conferencias ecommerce latinoamerica"
"aprender dropshipping colombia", "evento emprendedores medellin", "conferencias negocios online"
```

**Títulos (15):**
- Feria Effix 2026 | Medellín
- 50,000 Emprendedores
- Boletas Desde $201,300
- 16-18 Octubre 2026
- 380+ Stands | 180+ Charlas
- Ecommerce y Dropshipping
- Speakers Internacionales
- Plaza Mayor Medellín
- Compra Ya y Ahorra
- La Feria #1 del MUNDO
- Entradas VIP Disponibles
- AI, Marketing y Negocios
- 140,000+ Asistentes Total
- Networking Real Presencial
- Inscríbete Ahora | Effix

**Descripciones (4):**
1. La feria de ecommerce más grande de Latinoamérica. 3 días de networking y aprendizaje.
2. Aprende dropshipping, marketing digital e IA con los mejores expertos de la región.
3. Conecta con +20,000 negocios y proveedores verificados. Compra tu boleta ahora.
4. Experiencias VIP con masterminds exclusivos. Cupos limitados disponibles.

### Extensiones de anuncio (ambas campañas)

**Sitelinks (4):**
| Texto | URL |
|---|---|
| Comprar Boletas | feriaeffix.com/estrategia-google-ads/ |
| Ver Agenda | feriaeffix.com/#programacion |
| Speakers 2026 | feriaeffix.com/ponentes |
| Quiero un Stand | feriaeffix.com/quiero-tener-un-stand/ |

**Textos destacados:**
- +49,000 asistentes en 2025
- 380+ marcas expositoras
- 3 días completos
- Speakers internacionales

---

## 🗺️ Estrategia por Fases

### Presupuesto total recomendado

| Escenario | Inversión | % del total | Riesgo |
|---|---|---|---|
| Conservador | US$30,000 | 2% | Bajo |
| **Recomendado** | **US$40,000** | **2.7%** | Medio |
| Agresivo | US$55,000 | 3.7% | Medio-Alto |

> **Recomendación:** Iniciar con conservador y escalar si Fase 1 y 2 justifican la inversión adicional.

### Distribución por fase

| Fase | Período | Semanas | Presupuesto | % Total |
|---|---|---|---|---|
| Fase 1: Awareness | Feb – Abr | 12 | US$7,000 | 17.5% |
| Fase 2: Consideración | May – Jul | 12 | US$13,000 | 32.5% |
| Fase 3: Urgencia | Ago – Oct | 10 | US$20,000 | 50% |
| **TOTAL** | | **34 semanas** | **US$40,000** | 100% |

### Desglose mensual

| Mes | Inversión | Acumulado | Notas |
|---|---|---|---|
| Febrero | US$2,000 | US$2,000 | Arranque suave, testing |
| Marzo | US$2,500 | US$4,500 | Optimización inicial |
| Abril | US$2,500 | US$7,000 | Cierre early birds |
| Mayo | US$4,000 | US$11,000 | Inicio Fase 2 |
| Junio | US$4,500 | US$15,500 | Escalar ganadores |
| Julio | US$4,500 | US$20,000 | Pre-urgencia |
| Agosto | US$6,000 | US$26,000 | Inicio Fase 3 |
| Septiembre | US$7,000 | US$33,000 | Aceleración |
| Octubre 1–16 | US$7,000 | US$40,000 | Máximo push final |

### Distribución por tipo de campaña

| Tipo | % | Inversión estimada |
|---|---|---|
| Red de Búsqueda | 40% | US$16,000 |
| YouTube / Video | 22% | US$8,800 |
| Performance Max | 20% | US$8,000 |
| Display / Remarketing | 18% | US$7,200 |

### Fase 1 — Awareness y Early Birds (Feb–Abr)
**Campañas activas:**
- Búsqueda Marca (30%)
- Búsqueda Categoría (25%)
- YouTube Awareness (30%) — *pendiente producción de videos*
- Display Prospección (15%) — *pendiente producción de banners*

**Expectativas realistas:**
- Conversiones directas limitadas (evento a 6+ meses)
- Enfoque en construir audiencias de remarketing
- Las primeras 4 semanas son período de aprendizaje del algoritmo

### Fase 2 — Consideración y Conversión (May–Jul)
**Campañas activas:**
- Búsqueda Intención Compra (35%) — keywords: "boletas", "entradas"
- Performance Max (25%) — conversiones escaladas
- Remarketing Display (20%) — visitantes previos
- YouTube Consideración (20%) — speakers y agenda

### Fase 3 — Urgencia y Cierre (Ago–Oct 16)
**Campañas activas:**
- Búsqueda Urgencia (40%) — "últimas boletas"
- Remarketing Agresivo (25%) — alta frecuencia
- Performance Max (25%) — máxima conversión
- YouTube Pre-roll (10%) — último empuje

---

## 🌍 Segmentación Geográfica

| País | Tier | Justificación |
|---|---|---|
| **Colombia** | Tier 1 — Principal | Mercado local, mayor conversión |
| **Ecuador** | Tier 1 | Segundo mercado de Grupo Effi |
| **República Dominicana** | Tier 1 | 4,400 usuarios activos en GA4 |
| **El Salvador** | Tier 1 | 2,500 usuarios activos en GA4 |
| **Perú** | Tier 1 | 900 usuarios activos en GA4 |
| México | Tier 2 | Mayor mercado ecommerce LATAM |
| Chile | Tier 2 | Alto poder adquisitivo |
| Costa Rica | Tier 2 | Mercado digital en crecimiento |
| Panamá | Tier 2 | Hub de negocios, alto poder adquisitivo |
| Guatemala | Tier 2 | Presencia de Efficaex |

---

## 💳 Landing Page y Pasarelas de Pago

| Recurso | URL |
|---|---|
| Landing Black Ticket | https://feriaeffix.com/estrategia-google-ads/ |
| Página gracias pago completo | https://feriaeffix.com/boleta-black/gracias/ |
| Página gracias cuotas | https://feriaeffix.com/boleta-black/gracias-2 |
| Wompi — Pago único | checkout.wompi.co/l/xlLrYC |
| Wompi — Cuotas | checkout.wompi.co/l/imLxOX |
| ePayco — Pago único | payco.link/0c4bcec3-7bb9-4e71-a64b-dc4028bc2610 |
| ePayco — Cuotas | payco.link/41c35812-1fe3-4d6c-90cd-7536fdd01824 |

### Precios
| Modalidad | COP | USD |
|---|---|---|
| Pago único Black | $3,997,000 | $997 |
| Cuotas (x4) | $1,000,000 c/u | $250 c/u |

### Hallazgos de auditoría — Pendientes de implementar
- ⚠️ URL actual revela estrategia: `/estrategia-google-ads/` — cambiar a URL neutra
- ⚠️ Falta video principal en la landing
- ⚠️ Falta botón de WhatsApp
- ⚠️ 4 botones de pago generan fricción — simplificar
- ⚠️ Falta garantía / risk reversal visible
- ⚠️ Headline genérico — requiere copy más específico y orientado a conversión

---

## 📊 Análisis Meta Ads — Dataset EVENTOSGRUPOEFFI.csv

> **Fuente:** 1,198 registros de campañas F2 (eventos satélite / leads) de dos páginas: **EffiWoman** y **Grupo Effi**.  
> **Período cubierto:** Sep 2025 – Mar 2026  
> **Gasto total registrado:** COP $706,428

### Campañas incluidas (10)

| Campaña | Gasto COP | Resultados | CPR COP |
|---|---|---|---|
| EVENTO SANTIAGO VELEZ — IMG y VID | $208,161 | 114 | $1,826 |
| EVENTO MAURICIO HOYOS — VIDEOS | $171,305 | 32 | $5,353 |
| EVENTO Juliana Berrio — IMG | $128,105 | 48 | $2,669 |
| EFFIWOMAN — SARA — IMG | $79,111 | 37 | $2,138 |
| EFFIWOMAN — CAMILA HERNANDEZ — VIDEOS | $54,135 | 6 | $9,022 |
| EVENTO Christian Chávez — IMG | $36,268 | 18 | $2,015 |
| EVENTO Juan Pablo López — IMG y VID | $15,527 | 11 | $1,412 |
| EFFIWOMAN — @paofelicidad — IMG | $8,710 | 2 | $4,355 |
| EVENTO Esteban Gómez / Juan Aristizábal | $3,975 | 2 | $1,988 |
| EVENTO Jackson Rozo — IMG | $1,131 | 0 | — |

### Top 10 anuncios por inversión

| ID anuncio | Nombre | Gasto COP | Resultados | CPR | CTR |
|---|---|---|---|---|---|
| 120233298027180337 | VIDEO 1 CRISTIAN | $106,281 | 17 | $6,252 | 2.49% |
| 120240018401340337 | VID 1 SANTIAGO VELEZ – Copia | $105,462 | 64 | **$1,648** | 2.70% |
| 120240018363520337 | VID 1 SANTIAGO VELEZ | $102,699 | 50 | $2,054 | 2.95% |
| 120240594556360337 | VID 1 – Copia | $96,003 | 39 | $2,462 | 1.93% |
| 120234922973210337 | VID 1 | $76,563 | 32 | $2,393 | **10.04%** |
| 120233553628020337 | VIDEO 3 ANDRÉS | $55,644 | 14 | $3,975 | 2.79% |
| 120233326930220337 | VID 1 PAULA | $54,135 | 6 | $9,022 | 4.35% |
| 120240672746490337 | VID 2 – Copia | $15,718 | 5 | $3,144 | 5.21% |
| 120240455539730337 | VID 1 – Copia | $13,503 | 5 | $2,701 | 2.46% |
| 120240455514780337 | VID 2 | $13,395 | 6 | $2,232 | 5.33% |

> 🏆 **Menor CPR:** VID 1 SANTIAGO VELEZ – Copia ($1,648) — mejor eficiencia general  
> 🏆 **Mayor CTR:** VID 1 (120234922973210337) — 10.04% — tasa de clic excepcional

### Segmentación por edad

| Edad | Gasto COP | Resultados | CPR COP |
|---|---|---|---|
| 18–24 | $63,553 | 24 | $2,648 |
| **25–34** | **$253,305** | **112** | **$2,262** |
| 35–44 | $257,946 | 89 | $2,898 |
| 45–54 | $94,181 | 36 | $2,616 |
| 55–64 | $28,914 | 7 | $4,131 |
| 65+ | $8,527 | 2 | $4,264 |

> 📌 El segmento 25–34 es el más eficiente. El grupo 18–24 tiene buen CPR ($2,648) con menor inversión — segmento subutilizado identificado.

### Segmentación por género

| Género | Gasto COP | Resultados | CPR COP |
|---|---|---|---|
| Masculino | $365,561 | 152 | **$2,405** |
| Femenino | $331,948 | 114 | $2,912 |
| Desconocido | $8,919 | 4 | $2,230 |

> 📌 Masculino tiene CPR más eficiente (~$2,405 vs $2,912). Sin embargo, EffiWoman demuestra que el segmento femenino puede ser muy eficiente en campañas específicamente diseñadas para esa audiencia.

### Benchmarks de referencia — Meta Ads
Extraídos del análisis previo de 16 campañas (~984 registros del dataset histórico completo):

| Referencia | ID Anuncio | Nota |
|---|---|---|
| **Menor CPR global (EffiWoman)** | 120234923448390337 | Sara Montoya — benchmark eficiencia |
| **Mayor CTR global** | 120239063012960337 | @paofelicidad — benchmark engagement |

### Insights clave Meta Ads
1. **Formato video supera imagen** en prácticamente todos los indicadores (CPR, resultados)
2. **Santiago Vélez como figura** generó los mejores resultados acumulados ($208K, 114 registros)
3. **Segmento 18–24 femenino** identificado como underused con potencial (aprendizaje EffiWoman)
4. **Duplicar ad sets ganadores** funcionó bien (ver variantes "–Copia" con rendimientos similares o mejores)
5. **CTR excepcional de 10%** en ID 120234922973210337 — vale la pena analizar el creativo

---

## ✅ Estado de Implementación General

| Componente | Estado | Notas |
|---|---|---|
| Cuenta Google Ads | ✅ Completado | ID 356-853-8992 |
| GA4 vinculado | ✅ Completado | G-CRXZ50VX7D |
| GTM publicado | ✅ Completado | V5 — 3 etiquetas activas |
| Certificación venta entradas | ✅ Aprobada | Google aprobó solicitud |
| Remarketing (todas las páginas) | ✅ Completado | — |
| Conversión Black Pago Completo | ✅ Completado | Verificada con Tag Assistant |
| Conversión Black Cuotas | ✅ Completado | Verificada con Tag Assistant |
| Páginas de agradecimiento | ✅ Completado | /boleta-black/gracias/ y /gracias-2 |
| Campaña [Search] Marca Effix | ✅ Activa | $88,000 COP/día — anuncio apto |
| Campaña [Search] Categoría | ✅ Activa | $73,000 COP/día — en aprendizaje |
| Guía operativa | ✅ Completado | Documento generado |
| Redirección Wompi | ✅ Completado | Configurado y activo |
| Redirección ePayco | ✅ Completado | Configurado y activo |
| Sitelinks en campaña Categoría | ✅ Completado | 4 sitelinks agregados |
| Públicos personalizados CSV | ⏳ Pendiente | Obtener bases de datos |
| Campaña YouTube Awareness | ⏳ Pendiente | Requiere videos producidos |
| Campaña Display Prospección | ⏳ Pendiente | Requiere banners producidos |
| Palabras clave negativas | ⏳ Pendiente | Revisar en 1 semana |
| Microsoft Clarity landing | ⏳ Pendiente | Análisis de comportamiento |

---

## 📋 Pendientes y Próximos Pasos

### Prioridad inmediata (esta semana)
1. Monitorear primeros datos — **NO hacer cambios en los primeros 3–5 días**
2. Configurar alertas de presupuesto y rendimiento en Google Ads

### Prioridad alta (semana 2)
- Revisar informe de términos de búsqueda → agregar palabras clave negativas
- Obtener bases de datos de clientes para públicos personalizados (Customer Match)
  - Formato CSV requerido: Email, Teléfono (+57...), Nombre, Apellido, País
  - Listas target: Asistentes Effix 2024/2025, usuarios Effisystems, compradores Black anteriores

### Prioridad media (semanas 3–4)
- Producir banners Display (formatos: 300×250, 728×90, 160×600, 320×50, 300×600, 336×280)
- Producir videos YouTube:
  - Bumper: 6 segundos exactos
  - In-stream skippable: 15–30 segundos (hook en primeros 5 seg)
  - Largo: 60–90 segundos
  - Resolución mínima: 1080p | Subtítulos obligatorios
- Crear campaña [YouTube] Awareness
- Crear campaña [Display] Prospección
- Evaluar rendimiento Fase 1 y ajustar presupuestos para Fase 2
- Implementar Microsoft Clarity en landing page
- Corregir hallazgos de auditoría en landing (URL, video, WhatsApp, fricción de pago, garantía, headline)

### KPIs de monitoreo semanal

| Métrica | Alerta Roja | Aceptable | Óptimo |
|---|---|---|---|
| CTR Búsqueda | <3% | 3–6% | >6% |
| Nivel de calidad | <5 | 5–7 | 8–10 |
| CPC | >US$0.60 | US$0.30–0.50 | <US$0.30 |
| Tasa de rebote landing | >70% | 50–70% | <50% |
| Tiempo en sitio | <30 seg | 30–90 seg | >90 seg |

### Objetivos por escenario (Escenario Base — US$40,000 inversión total)

| Métrica | Pesimista | Base | Optimista |
|---|---|---|---|
| Boletas vendidas vía Google | 4,000 | 6,500 | 10,000 |
| Visitas al sitio web | 200,000 | 325,000 | 500,000 |
| CPA (Costo por Adquisición) | US$10 | US$6.15 | US$4 |
| ROAS | 2:1 | 3.2:1 | 5:1 |

---

## 🔑 Credenciales y Accesos

| Plataforma | ID / Identificador | Acceso |
|---|---|---|
| Google Ads | 356-853-8992 | pautaferiaeffix@gmail.com |
| GA4 (activa) | G-CRXZ50VX7D | pautaferiaeffix@gmail.com |
| GTM | GTM-TLRMK246 | pautaferiaeffix@gmail.com |
| ID de conversión | AW-17981312035 | — |
| Etiqueta conversión | RTbrCMHZpoYcEKOYlP5C | — |
| Google Tag | GT-P8QZK4S6 | — |
| GA4 (sin usar — eliminar) | G-6DQBGWG7RS | — |

**Contacto evento:** gerencia@feriaeffix.com | +57 320 655 6725

---

## 🕒 Historial de Versiones GTM

| V. | Nombre | Fecha | Cambios |
|---|---|---|---|
| 1 | Empty Container | 10/03/2026 | Contenedor inicial |
| 2 | V1 - Remarketing y Conversión | 10/03/2026 | Primera publicación |
| 3 | V1 - Remarketing + Conversiones Black | 10/03/2026 | 3 etiquetas activas |
| 4 | (sin nombre) | 12/03/2026 | Ajustes menores |
| **5** | **V2 - URLs de gracias actualizadas** | **13/03/2026** | **Activadores corregidos con URLs reales** |

---

## 📁 Documentos del Proyecto

| Documento | Descripción |
|---|---|
| `Bitacora_Configuracion_Google_Ads_Effix_2026_v3.docx` | Registro de configuración técnica completa — **Versión vigente** |
| `Estrategia_Google_Ads_Feria_Effix_2026.docx` | Plan estratégico por fases, presupuestos y proyecciones |
| `Guia_Implementacion_Google_Ads_Effix_2026.docx` | Guía paso a paso de implementación técnica |
| `Bitacora_v1.docx` / `v2.docx` | Versiones anteriores — referencia histórica |
| `EVENTOSGRUPOEFFI.csv` | Dataset Meta Ads — 1,198 registros de 10 campañas F2 |
| `effix-black-landing.html` | Mockup HTML landing page Black Ticket |
| Archivos `.md` en Obsidian | Knowledge base — 12 notas estructuradas en 5 carpetas |

---

## 🧠 Aprendizajes y Principios Clave

1. **La precisión de datos es no negociable** — nunca fabricar métricas ni estadísticas no verificadas
2. **High-ticket ($997) requiere estrategia diferente** — mayor tolerancia al CPA, más cualificación, ciclos de conversión más largos
3. **El ecosistema de 20K clientes de Grupo Effi** es la ventaja más poderosa — reducción de CAC vía remarketing a audiencias calientes
4. **Google Ads es canal complementario** — el ecosistema orgánico (Instagram 382K+, TikTok, YouTube 110+ videos, comunidad) es el motor principal
5. **Ciclos de conversión LATAM** son más largos que en mercados USA/EU — la estrategia de 3 fases refleja esta realidad
6. **Videos superan imágenes** en Meta Ads según el dataset analizado
7. **Segmento 18–24 femenino** subaprovechado — CPR competitivo según hallazgos EffiWoman
8. **GitHub API calls desde el entorno de Claude** están bloqueadas — siempre entregar archivos para subida manual

---

*Documento generado el 19 de marzo de 2026 | Proyecto activo hasta Octubre 18 de 2026*
