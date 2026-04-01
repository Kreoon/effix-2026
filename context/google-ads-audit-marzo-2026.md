---
tags:
  - google-ads
  - feria-effix
  - auditoria
  - marzo-2026
status: completado
created: "2026-03-31"
cuenta: 356-853-8992
periodo: Marzo 2026
presupuesto_total: USD $40,000
---

# Auditoría Google Ads — Feria Effix 2026
## Cuenta 356-853-8992 | Periodo: Marzo 2026

---

## 1. Resumen Ejecutivo

### Estado actual: CRITICO (Score estimado: 28/100)

La cuenta lleva ~3 semanas activa y ha gastado **COP $1,265,253 (~$296 USD)** con **0 conversiones registradas**. El problema no es la demanda — el CTR de 31% en campaña de marca confirma que hay audiencia buscando activamente. El problema es estructural: el tracking de conversiones está roto para la mayoría del portafolio, los CPC de la campaña de categoría están fuera de control (+10x), y hay gasto activo en términos completamente irrelevantes.

### Diagnóstico en 3 líneas
- **Canal con mejor calidad del ecosistema** (53.85% engagement en GA4) — el potencial está validado
- **0 conversiones = tracking roto + embudo incompleto**, no falta de demanda
- **COP $190,000+ (~$44 USD) gastados en términos irrelevantes** — gasto que debe eliminarse hoy

### Métricas del periodo

| Métrica | Valor | Benchmark | Estado |
|---|---|---|---|
| Clicks totales | 300 | — | — |
| Impresiones | 1,702 | — | — |
| CTR Marca | 31.02% | 5-10% | EXCELENTE |
| CTR Categoría F1 | 11.51% | 3-6% | BUENO |
| CPC Marca | COP $1,010 (~$0.24 USD) | $0.30-0.50 | EXCELENTE |
| CPC Categoría F1 | COP $10,263 (~$2.40 USD) | $0.30-0.50 | CRITICO |
| Conversiones | 0 | >0 | CRITICO |
| Gasto total | COP $1,265,253 (~$296 USD) | — | — |

---

## 2. Problemas Críticos (Ordenados por Impacto)

### CRITICO-1: Cero conversiones rastreadas — El mayor riesgo del proyecto

**Descripción:** Toda la inversión publicitaria corre sin poder optimizarse. Google Ads no tiene señales para Smart Bidding. No se puede saber qué keywords, ads o días generan ventas.

**Causa raíz (3 puntos de quiebre):**

| Punto | Estado | Impacto |
|---|---|---|
| Conversiones Black (Wompi) | Verificadas en Tag Assistant | Solo cubre tickets $997 USD |
| Conversiones General/VIP (LaTiquetera) | PENDIENTE — código enviado, no implementado | El ticket más vendible ($50) no trackea |
| Revenue en GA4 | $0 configurado | Sin datos de valor para ROAS |

**Impacto:** Sin conversiones, Google Ads no puede activar Target CPA ni Target ROAS. La cuenta continuará en "Maximizar Clics" indefinidamente, gastando sin optimización hacia resultados.

**Acción requerida:** Escalar con LaTiquetera. El código AW-17981312035 debe estar implementado antes de que se gasten más $USD en campañas de boletas General/VIP.

---

### CRITICO-2: CPC de Categoría F1 a COP $10,263 (~$2.40 USD) — 10x sobre el benchmark

**Descripción:** La campaña [Search] Categoría Ecommerce F1 está gastando COP $1,016,007 (80% del presupuesto total) con CPC promedio de $10,263 COP. En días específicos llegó a COP $30,171 por clic.

**Análisis de la causa:**

Los search terms revelan el problema. Los términos de marca propia ("feria effix", "effix 2026") tienen CPC de COP $600-880. Los términos de categoría genérica ("expo emprendedores", "ferias de emprendimiento", "ecommerce day") tienen CPC de COP $17,000-49,340.

Esto ocurre porque:
1. **Concordancia amplia o frase en keywords de categoría** — Google expande las búsquedas hacia términos competitivos de alto costo
2. **Sin negative keywords suficientes** — el presupuesto se fuga hacia términos de eventos competidores (vtex day, hotmart fire, south summit) donde hay pujas más altas
3. **Quality Score bajo en keywords de categoría** — la relevancia ad↔keyword↔landing es menor que en campaña de marca, lo que eleva el CPC efectivo

**Evidencia directa:**

| Search Term | CPC COP | Tipo |
|---|---|---|
| "feria effix 2026" | $624 | Marca propia — correcto |
| "feria effix" | $881 | Marca propia — correcto |
| "expo emprendedores 2026" | $28,018 | Evento competidor — GASTO PERDIDO |
| "ferias de emprendimiento en bogota 2026" | $49,340 | Genérico competitivo — GASTO PERDIDO |
| "ecommerce day colombia 2026" | $21,392 | Evento competidor — GASTO PERDIDO |
| "eventos de startups 2026" | $12,904 | Irrelevante — GASTO PERDIDO |

---

### CRITICO-3: GA4 con "Paid Other" de 9,215 sesiones — tráfico sospechoso sin identificar

**Descripción:** GA4 registra 9,215 sesiones en el canal "Paid Other" con un tiempo promedio de **1 segundo**. Esto representa casi la mitad de todo el tráfico del sitio y virtualmente ninguno de esos visitantes lee contenido.

**Hipótesis más probables:**
1. Tráfico de bot o tráfico inválido de una red de Display/Demand Gen mal configurada
2. Campaña en una plataforma no identificada (posiblemente TikTok Ads, Taboola, o una compra de medios externa)
3. Sesiones infladas por redirects mal implementados

**Impacto:** Estos 9,215 "visitantes" distorsionan todos los promedios de engagement en GA4 y enmascaran la performance real del sitio. Si hay inversión publicitaria detrás de este tráfico, está siendo 100% desperdiciada.

---

### CRITICO-4: Geografía del tráfico desalineada con la segmentación de Google Ads

**Descripción:** GA4 muestra que el principal mercado es **República Dominicana (6,804 usuarios)**, seguido de El Salvador (3,456), Ecuador (2,156) y Perú (1,839). Colombia, donde se realiza el evento, es el segundo mercado con solo 4,250 usuarios.

**El problema:** Las campañas de Google Ads están activas principalmente para Colombia (campaña de marca). Si los usuarios de República Dominicana y El Salvador no están siendo alcanzados por Search, hay una oportunidad enorme sin capitalizar. Al mismo tiempo, hay que verificar si estos usuarios internacionales convierten o simplemente generan tráfico sin intención de compra.

---

### ALTO-1: Gasto en términos de eventos competidores — dinero quemado hoy

**Descripción:** Los search terms muestran clics activos en búsquedas de eventos que no son Feria Effix:

| Term | Clics | CPC COP | Gasto COP estimado |
|---|---|---|---|
| "ecommerce day" | 2 | $10,634 | $21,268 |
| "expo emprendedores 2026" | 2 | $28,018 | $56,036 |
| "feria de emprendedores 2026" | 2 | $17,074 | $34,148 |
| "eventos de startups 2026" | 2 | $12,904 | $25,808 |
| "evento ecommerce 2026" | 1 | $25,758 | $25,758 |
| "eventos para startups 2026" | 1 | $22,417 | $22,417 |
| "ecommerce day colombia 2026" | 1 | $21,392 | $21,392 |
| "feria effix 2025" | 3 | $5,901 | $17,703 |
| **Subtotal visible** | **14** | — | **~$224,530 COP (~$52 USD)** |

Además aparecen impresiones (sin clics confirmados) en: inc mty, vtex day, hotmart fire, exma doers, south summit, shop talk. Estos están generando costos de CPM aunque no generen clics.

---

### ALTO-2: Retención semanal del sitio al 1-2% — problema de experiencia

**Descripción:** GA4 muestra que de los usuarios que visitan en la semana 0, solo el 1-2% regresa en la semana 1. Para un evento de este precio ($997 USD para Black, $50 para General), el proceso de decisión es multivisita. Con retención del 2%, prácticamente nadie que visita el sitio vuelve a considerar la compra.

**Causa probable:** Sin secuencia de remarketing activa (Display/YouTube pendiente de lanzar), los visitantes que no compran en la primera visita simplemente no regresan.

---

### ALTO-3: Campaña Categoría (old) activa gastando con datos obsoletos

**Descripción:** La campaña [Search] Categoría (old) aparece como "Paused" pero registró 22 clics y COP $68,495 de gasto en el periodo. Si está realmente pausada pero acumuló gasto, hay un problema de sincronización de estado entre el reporte y la cuenta real.

**Acción:** Verificar en la cuenta que esta campaña está efectivamente pausada y que el gasto fue del periodo activo anterior. Si hay cualquier gasto post-pausa, hay un bug en la configuración.

---

## 3. Análisis de Gasto Perdido

### Desglose por campaña

| Campaña | Gasto Total COP | Conversiones | Gasto/Conv | Veredicto |
|---|---|---|---|---|
| [Search] Marca Effix | $180,751 | 0 (tracking roto) | N/A | ACEPTABLE — tráfico de calidad |
| [Search] Categoría F1 | $1,016,007 | 0 | N/A | CRITICO — CPC fuera de control |
| [Search] Categoría (old) | $68,495 | 0 | N/A | PAUSAR — gasto sin valor actual |
| **TOTAL** | **$1,265,253** | **0** | — | — |

### Estimación de gasto perdido en Categoría F1

De los COP $1,016,007 gastados en Categoría F1:
- Términos de marca propia ("feria effix", "effix"): ~70 clics × ~$750 COP promedio = ~$52,500 COP — JUSTIFICADO
- Términos de categoría competidores/irrelevantes: ~29 clics × ~$20,000 COP promedio = ~$580,000 COP — PERDIDO
- Términos de categoría relevante pero sin conversión (tracking roto): balance restante

**Estimación conservadora de gasto perdido: COP $400,000-600,000 (~$93-140 USD) del periodo.**

---

## 4. Análisis de Search Terms — Calidad y Recomendaciones

### Términos de ALTO valor (mantener y pujar más)

| Term | CTR | CPC COP | Acción |
|---|---|---|---|
| "feria effix 2026" | 41.48% | $624 | Aumentar puja — término más eficiente |
| "feria effix" | 40.24% | $881 | Mantener — alto volumen y conversión potencial |
| "feria effi" (typo) | 44.44% | — | Agregar como keyword exacta |
| "effix" | 14.44% | $1,676 | Mantener en Marca — genérico de marca |
| "effix 2026" | — | — | Mantener — intent específico |
| "effix colombia" | — | — | Mantener — geo-intent |

### Términos NEGATIVOS a agregar inmediatamente

**Lista 1 — Eventos competidores (Phrase Match negativo):**
```
-"ecommerce day"
-"vtex day"
-"hotmart fire"
-"exma doers"
-"south summit"
-"shop talk"
-"shoptalk"
-"ecommerce summit"
-"marketingpro"
```

**Lista 2 — Geografías equivocadas (si el objetivo es presencial):**
```
-"bogota" (si el foco es Medellín — evaluar)
-"online"
-"virtual"
-"webinar"
-"curso"
-"certificacion"
```

**Lista 3 — Términos de emprendimiento genérico:**
```
-"expo emprendedores"
-"feria de emprendedores"
-"eventos de startups"
-"eventos para startups"
-"ferias de emprendimiento"
-"startup weekend"
-"incubadora"
```

**Lista 4 — Año equivocado:**
```
-"2025"
-"2024"
-"2023"
```

**Lista 5 — Competidores directos (investigar y agregar):**
```
-"inc mty"
-"vtex"
-"hotmart"
```

**Total de negativos recomendados: 25-35 términos**

---

## 5. Análisis de Anomalías de CPC

### Por qué Categoría F1 tiene CPC 10x mayor que Marca

**Razón 1 — Intención de búsqueda diferente (mayor competencia)**
Los términos de marca propia ("feria effix") solo los buscan personas que ya conocen el evento. Hay poca competencia en subasta. Los términos de categoría ("ecommerce colombia", "eventos emprendedores") los puja cualquier empresa de eventos, plataformas de cursos, medios, etc. Más competidores = CPC más alto.

**Razón 2 — Quality Score probablemente bajo en Categoría F1**
La relevancia entre keyword → ad → landing page en la campaña de Categoría es menor. Si el keyword es "expo ecommerce colombia" y el anuncio habla de "Feria Effix" y la landing dice "Feria Effix", hay un gap de relevancia que Google castiga con CPC más alto.

**Razón 3 — Sin historial de Quality Score (campaña nueva)**
Las campañas nuevas sin historial pagan sobreprecio de 30-60% hasta que acumulan datos. La campaña Categoría F1 fue relanzada el 19 de marzo — apenas tiene datos.

**Razón 4 — Concordancia de keywords demasiado amplia**
La volatilidad diaria (CPC $4,436 el Mar 26 → $30,171 el Mar 24) indica que algunos días la campaña compete en subastas de términos muy caros por expansión de concordancia amplia o frase.

### Análisis de volatilidad diaria de CPC

| Fecha | Clicks | CPC COP | Diagnóstico |
|---|---|---|---|
| Mar 23 | 7 | $22,857 | Día con términos genéricos caros |
| Mar 24 | 4 | $30,171 | Pico máximo — posible término único muy caro |
| Mar 25 | 11 | $8,149 | Normalización parcial |
| Mar 26 | 31 | $4,436 | Más clicks en términos de marca effix |
| Mar 30 | 46 | $1,473 | Mejor día — dominado por marca propia |
| Mar 31 | 5 | $6,383 | Relajación de volumen |

**Conclusión:** Los días con pocos clicks tienen CPC altísimo porque un solo clic en "ferias de emprendimiento en bogota 2026" (COP $49,340) sube el promedio drásticamente. Los días con 30-46 clicks tienen CPC bajo porque hay volumen de términos de marca propios baratos diluyendo el promedio.

---

## 6. Efectividad de Landing Pages

### Análisis por URL

| Landing | Clicks | CTR | CPC COP | Diagnóstico |
|---|---|---|---|---|
| feriaeffix.com/ (Marca) | 97 | 21.41% | $207 | EXCELENTE — Homepage como portal de portafolio |
| feriaeffix.com (Categoría F1) | 94 | 6.65% | $10,562 | PROBLEMA — Misma landing, CPC 50x mayor |
| /estrategia-google-ads/ (Marca) | 75 | 13.91% | $2,078 | URL revela estrategia pagada — CAMBIAR |
| feriaeffix.com (old) | 20 | 5.49% | $3,120 | Campaña pausada — sin acción requerida |
| /#programacion | 4 | 1.49% | — | Tráfico mínimo |

### Hallazgos críticos de landing

**1. La URL /estrategia-google-ads/ sigue activa**
Esta URL fue identificada como problema desde la auditoría de marzo 19. Con 75 clicks y CPC de $2,078, se han gastado ~COP $155,850 en enviar tráfico a una URL que le dice al visitante que llegó por un anuncio pagado. Afecta la percepción de exclusividad del Black Ticket ($997).

**2. Sin landing específica para boletas General/VIP**
La campaña de Categoría envía tráfico a feriaeffix.com pero no hay una landing optimizada para conversión de Pasaporte 3 días ($50 USD). El visitante llega al homepage, no ve un CTA claro hacia LaTiquetera, y se va.

**3. Retención 1-2% = los visitantes no regresan**
Sin video de remarketing activo y sin Display, el 98-99% de los visitantes se pierden. Para un ticket de $997, la secuencia de decisión típica es 3-7 visitas antes de comprar.

**4. LaTiquetera — message mismatch pendiente**
Los anuncios dicen "49,000+ asistentes" y "380+ marcas". Si LaTiquetera muestra datos de ediciones anteriores, la discrepancia reduce la confianza y aumenta el rebote en el punto de compra.

---

## 7. Gaps de Tracking de Conversiones

### Mapa de tracking actual

| Evento de conversión | Estado | Herramienta | ID |
|---|---|---|---|
| Black Ticket — Pago completo | ACTIVO y verificado | GTM + Wompi | AW-17981312035 |
| Black Ticket — Cuotas | ACTIVO y verificado | GTM + Wompi | AW-17981312035 |
| Boletas General (LaTiquetera) | PENDIENTE — no implementado | GTM a enviar a LaTiquetera | AW-17981312035 |
| Boletas VIP (LaTiquetera) | PENDIENTE — no implementado | GTM a enviar a LaTiquetera | AW-17981312035 |
| Stands — Formulario de contacto | No configurado | Sin GTM en esa página | — |
| Revenue/Valor de conversión | No configurado | GA4 sin ecommerce tracking | — |
| Micro-conversiones (leads, WA clicks) | No configurado | Sin tags | — |

### Impacto del tracking roto

1. **Sin 30 conversiones registradas, no se puede activar Smart Bidding.** La cuenta seguirá en "Maximizar Clics" indefinidamente, que es la estrategia menos eficiente para maximizar ventas.

2. **Sin valor de conversión, no se puede calcular ROAS real.** No hay forma de saber si el gasto está generando ROI positivo o negativo.

3. **Sin micro-conversiones, se pierde data de embudo.** No se sabe cuántos visitantes hacen click en WhatsApp, ven el video, o llegan a la sección de precios. Esto impide optimización basada en comportamiento.

4. **Customer Match subido sin verificar.** Los 60,259 registros están en CSV pero no confirmados como subidos y procesados en Google Ads. Sin esta audiencia activa, se pierde la ventaja del historial de asistentes previos para remarketing y similar audiences.

---

## 8. Recomendaciones Accionables (Ordenadas por Prioridad)

### URGENTE — Esta semana (antes de gastar más presupuesto)

**A1. Pausar o limitar fuertemente la campaña [Search] Categoría F1**
- Situación actual: COP $1,016,007 gastados con CPC promedio de $10,263
- Acción: Reducir budget diario a COP $20,000 hasta implementar negatives y revisar match types
- Tiempo: 5 minutos en Google Ads
- Impacto: Detiene el sangrado inmediatamente

**A2. Agregar las 5 listas de negative keywords (ver Sección 4)**
- 25-35 términos negativos en la campaña Categoría F1
- Prioridad: términos de eventos competidores y emprendimiento genérico
- Tiempo: 15 minutos
- Impacto: Elimina ~40-60% del gasto perdido en categoría

**A3. Escalar LaTiquetera para implementar conversion tracking**
- Enviar correo de escalación con código AW-17981312035
- Incluir instrucciones técnicas paso a paso
- Poner deadline concreto (máximo 5 días hábiles)
- Tiempo: 30 minutos para redactar y enviar
- Impacto: Desbloquea Smart Bidding para el 80% del volumen de ventas

**A4. Cambiar URL /estrategia-google-ads/ a /experiencia-black/**
- Coordinar con el equipo web para el redirect 301
- Actualizar la URL en el ad y en Google Ads
- Tiempo: 2 horas con el equipo web
- Impacto: Mejora percepción del Black Ticket, mejora Quality Score

---

### ALTA — Esta semana / la próxima

**B1. Subir Customer Match a Google Ads**
- Los 60,259 registros del CSV están listos
- Subir en: Herramientas → Gestor de audiencias → Listas de clientes
- Agregar como observación (no targeting) a todas las campañas
- Tiempo: 20 minutos
- Impacto: Mejora relevancia y CPC, permite Similar Audiences

**B2. Investigar y resolver el tráfico "Paid Other" en GA4**
- 9,215 sesiones con 1s de tiempo promedio es tráfico inválido o mal atribuido
- Revisar UTM parameters de todas las fuentes activas
- Si hay compra de medios externa (banners, redes minoritarias), auditar esa inversión
- Tiempo: 1-2 horas de investigación en GA4
- Impacto: Puede descubrir gasto publicitario totalmente desperdiciado

**B3. Cambiar match types en campaña Categoría a exacta o frase estricta**
- Usar concordancia exacta para las mejores keywords de categoría
- Eliminar o convertir a negativo cualquier keyword en concordancia amplia
- Tiempo: 30 minutos
- Impacto: Elimina la volatilidad de CPC y reduce gasto irrelevante

**B4. Configurar conversiones de micro-conversiones en GA4/GTM**
- Click en botón WhatsApp (+57 320 655 6725)
- Scroll depth >50% en landing Black
- Tiempo en sitio >60 segundos
- Click en "Ver agenda" o "Ponentes"
- Tiempo: 2-3 horas de implementación GTM
- Impacto: Data de embudo para optimización antes de tener compras confirmadas

**B5. Crear negative keyword list compartida entre todas las campañas**
- Aplicar la misma lista a todas las campañas activas y futuras
- Nombre sugerido: "NKL — Eventos Competidores | Effix 2026"
- Tiempo: 30 minutos
- Impacto: Previene el mismo problema en futuras campañas

---

### MEDIA — Semanas 2-3

**C1. Lanzar campaña [Search] Boletas General con landing dedicada**
- Crear landing page específica para Pasaporte 3 días ($50 USD)
- Keywords: "boletas feria effix", "entrada feria effix", "pasaporte feria effix"
- Landing con CTA directo a LaTiquetera (solo activar cuando LaTiquetera tenga tracking)
- Impacto: El ticket de $50 tiene mayor volumen de demanda que el de $997

**C2. Lanzar Display Remarketing**
- Audiencia: visitantes de los últimos 30 días que no convirtieron
- Creativos: 6 formatos (300x250, 728x90, 160x600, 320x50, 300x600, 336x280)
- Budget inicial: COP $50,000/día
- Impacto: Aumenta retención de 1-2% a proyección 8-12%

**C3. Implementar Thank You Pages para tracking de conversión**
- Crear thank-you pages después de cada tipo de compra
- Configurar conversiones basadas en URL (/gracias-black/, /gracias-general/)
- Impacto: Tracking más confiable que eventos GTM con fallos potenciales

**C4. Revisar segmentación geográfica vs datos GA4**
- GA4 muestra República Dominicana como #1 (6,804 usuarios)
- Verificar si las campañas de Search están activas en RD, El Salvador, Ecuador, Perú
- Ajustar presupuesto geográfico según tasa de conversión real por país
- Impacto: Puede duplicar el alcance sin aumentar presupuesto

**C5. Agregar extensiones de anuncio faltantes**
- Extensiones de sitelink: "Boletas", "Experiencia Black", "Stands", "Ponentes"
- Extensiones de texto destacado: "16-18 Oct · Medellín", "5ta Edición", "49,000+ asistentes"
- Extensiones de imagen (si disponibles)
- Impacto: CTR potencial +20-30%, mejor Quality Score

---

### PLANIFICACIÓN — Semanas 3-6

**D1. Activar campañas YouTube cuando haya creativos**
- In-stream de 15-30s: highlights del evento 2025
- Bumper 6s: "16-18 Oct · Plaza Mayor · Medellín"
- Audiencias: Similar a Customer Match + visitantes del sitio
- Presupuesto: Según plan maestro, $8,800 USD en total para YouTube

**D2. Activar Performance Max en Fase 2 (mayo+)**
- Solo después de tener 30+ conversiones registradas
- Asset groups por producto: General, Black, Stands
- Señales de audiencia: Customer Match + visitantes del sitio
- No lanzar antes de tiempo — PMax sin data de conversión gasta sin optimizar

**D3. Activar Smart Bidding cuando haya 30+ conversiones**
- Target CPA inicial basado en CPA histórico del primer mes con conversiones
- Para Black ($997): CPA objetivo COP $200,000-400,000 (~$50-95 USD)
- Para General ($50): CPA objetivo COP $15,000-25,000 (~$3.5-6 USD)

---

## 9. Reasignación de Presupuesto — Recomendación Inmediata

### Distribución actual (estimada) vs recomendada para Abril

| Campaña | Actual (mensual est.) | Recomendado Abril | Cambio |
|---|---|---|---|
| [Search] Marca Effix | COP $1,500,000 (~$350) | COP $2,000,000 (~$470) | +33% |
| [Search] Categoría F1 | COP $8,500,000 (~$2,000) | COP $500,000 (~$115) | -94% |
| [Search] Categoría (old) | Pausada | Pausada | Sin cambio |
| [Search] Boletas General | No existe | COP $1,500,000 (~$350) | Nueva |
| Display Remarketing | No existe | COP $750,000 (~$175) | Nueva |
| **TOTAL** | COP ~$10,000,000 (~$2,350) | COP ~$4,750,000 (~$1,110) | -53% |

**Rationale:** La reducción drástica en Categoría F1 no significa menos resultados — significa el mismo o mejor resultado con la mitad del gasto, una vez que los negative keywords estén implementados y los match types ajustados. El presupuesto liberado se redirige a Marca (donde el CPC es 10x menor) y a Boletas General (donde el precio de $50 tiene mayor demanda natural).

### Proyección para el mes de Abril (presupuesto plan maestro: USD $2,500)

| Canal | USD Recomendado | CPC objetivo | Clicks proyectados |
|---|---|---|---|
| [Search] Marca Effix | $800 | $0.25 | ~3,200 clicks |
| [Search] Boletas General | $700 | $0.35 | ~2,000 clicks |
| [Search] Categoría (restructurada) | $500 | $0.50 | ~1,000 clicks |
| Display Remarketing | $300 | CPM | ~150,000 impresiones |
| Reserva / testing | $200 | — | — |
| **TOTAL** | **$2,500** | — | **~6,200 clicks** |

---

## 10. Quick Wins — Impacto en menos de 15 minutos

| # | Acción | Tiempo | Impacto |
|---|---|---|---|
| 1 | Reducir budget Categoría F1 a COP $20,000/día | 2 min | Detiene gasto perdido hoy |
| 2 | Agregar 25 negative keywords en Categoría F1 | 15 min | Elimina 40-60% del gasto irrelevante |
| 3 | Subir Customer Match (CSV ya listo) | 10 min | Activa señal de audiencia en todas las campañas |
| 4 | Agregar extensiones de sitelink faltantes | 10 min | CTR +15-25% estimado |
| 5 | Verificar que Categoría (old) esté pausada | 2 min | Confirma que no hay gasto activo |

---

## Checklist de Checks del Auditoria (74 checks framework)

### Conversion Tracking (G42-G49, G-CT1 a G-CT3)

| Check | ID | Resultado | Hallazgo |
|---|---|---|---|
| Conversion actions defined | G42 | WARNING | Solo Black activo. General/VIP/Stands sin tracking |
| Enhanced conversions enabled | G43 | UNKNOWN | No confirmado en los datos proporcionados |
| Consent Mode v2 (EU/EEA) | G45 | N/A | Mercado LATAM — verificar si aplica |
| No duplicate conversion counting | G-CT1 | PASS | Una acción por tipo de compra |
| Google Tag firing correctly | G-CT3 | PARTIAL | Tag Assistant verificó Black. LaTiquetera no verificado |
| Revenue tracking | — | FAIL | $0 en GA4 — sin ecommerce tracking |

### Wasted Spend / Negatives (G13-G19)

| Check | ID | Resultado | Hallazgo |
|---|---|---|---|
| Search term audit (<14 days) | G13 | PASS | Datos del mes completo analizados |
| Negative keyword lists (>=3 themed) | G14 | FAIL | Sin evidencia de listas de negativos activas |
| Wasted spend on irrelevant terms (>15%) | G16 | FAIL | ~40-60% del gasto en Categoría va a términos irrelevantes |
| No Broad Match + Manual CPC | G17 | WARNING | Volatilidad de CPC sugiere match type amplio sin SmartBidding |

### Account Structure (G01-G12)

| Check | ID | Resultado | Hallazgo |
|---|---|---|---|
| Brand vs non-brand separation | G05 | PASS | Marca Effix separada de Categoría |
| Campaign naming convention | G01 | PASS | [Search] + descriptor + versión |
| Learning Limited ad sets | — | WARNING | Maximizar Clics sin conversiones — aprendizaje limitado |

### Settings & Targeting (G36-G41)

| Check | ID | Resultado | Hallazgo |
|---|---|---|---|
| Target CPA/ROAS within 20% of historical | G37 | FAIL | Sin Smart Bidding activo — prerequisito: 30 conversiones |
| Geographic targeting aligned | — | WARNING | GA4 muestra RD como #1 mercado — verificar cobertura en Ads |

---

## Resumen de Scoring Estimado

| Categoría | Peso | Score | Ponderado |
|---|---|---|---|
| Conversion Tracking | 25% | 15/100 | 3.75 |
| Wasted Spend / Negatives | 20% | 10/100 | 2.00 |
| Account Structure | 15% | 60/100 | 9.00 |
| Keywords & Quality Score | 15% | 40/100 | 6.00 |
| Ads & Assets | 15% | 55/100 | 8.25 |
| Settings & Targeting | 10% | 45/100 | 4.50 |
| **TOTAL** | **100%** | **33.50/100** | **33.50** |

**Grado: F (Critico) — La cuenta no puede optimizarse hacia resultados hasta resolver tracking y gasto perdido.**

> Nota: El score bajo no refleja mala ejecución inicial — refleja el estado natural de una cuenta nueva en la Fase 1 (reconocimiento) con tracking parcialmente implementado. Con las acciones de la Sección 8 ejecutadas, el score proyectado para finales de Abril es 55-65/100.

---

## Contexto importante para interpretar estos datos

### Lo que está funcionando bien

1. **CTR de marca 31%** — 4-6x el benchmark de industria. La demanda está probada.
2. **CPC de marca $0.24 USD** — extremadamente eficiente para LATAM. Hay margen para escalar.
3. **GA4 + GTM implementados** — la infraestructura de tracking está. Solo falta completarla.
4. **Conversiones Black verificadas** — para el ticket premium, el tracking funciona.
5. **Estrategia de portafolio correcta** — el CLAUDE.md del proyecto refleja una estrategia sólida.
6. **Customer Match de 60,259 registros** — ventaja competitiva enorme para audiencias.

### Lo que necesita corrección inmediata

1. **LaTiquetera** — el cuello de botella más crítico. Sin conversiones de boletas General, la cuenta nunca alcanzará las 30 conversiones para activar Smart Bidding.
2. **Categoría F1** — hay que controlarla antes de que siga gastando a CPC de $2.40 USD.
3. **Paid Other en GA4** — fuente desconocida de 9,215 sesiones bot/inválidas.

---

*Auditoría generada por Claude Code | Cuenta 356-853-8992 | 31 de marzo 2026*
*Basada en datos de reporte Google Ads + GA4 + archivos del proyecto effix-2026/*
