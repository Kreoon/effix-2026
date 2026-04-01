---
tags:
  - google-ads
  - feria-effix
  - fase-3
  - guia-montaje
created: "2026-03-24"
status: planificado
presupuesto_fase: USD $22,000
periodo: "2026-08 al 2026-10-16"
---

# Fase 3: Urgencia y Venta — Guia de Montaje Completa — 7 Campanas Google Ads

> Cuenta: 356-853-8992 | Moneda: COP | Zona horaria: GMT-5 Colombia
> Presupuesto Fase 3: $22,000 USD (Ago $6,000 + Sep $9,000 + Oct 1-16 $7,000)
> Budget diario promedio: ~$237 USD (~COP $1,007,000) — ajustar semanalmente

## Logica de funnel (contexto completo)

```
FASE 1 (Mar-Abr):  Calentar → Acumular data → Remarketing lists       ✅ COMPLETADA
FASE 2 (May-Jul):  Retargetear → Smart Bidding → RLSA                  ✅ COMPLETADA
FASE 3 (Ago-Oct):  Customer Match a full → PMax → Urgencia → VENTA     🔴 AHORA
```

**FASE DE VENTAS.** Equivalente a campanas de Conversion de Meta hacia audiencias calientes + lookalikes + FOMO.

### Cambios clave respecto a Fase 2
1. **Smart Bidding obligatorio:** Target CPA o Target ROAS en TODAS las campanas de Search
2. **Customer Match a FULL POWER:** Senal PMax, RLSA +50% bid, Display targeting directo
3. **Lanzamiento Performance Max (PMax):** El tipo de campana mas poderoso de Google — usa TODO el inventario
4. **Lanzamiento campana de competidores en Search**
5. **YouTube cambia a mensajes de urgencia**
6. **Todo el messaging cambia a FOMO/escasez/cuenta regresiva**
7. **Escalar TODOS los presupuestos agresivamente** — 50% del presupuesto total se gasta aqui
8. **Ajustes de presupuesto semanales** para alcanzar $22,000 total

---

## Pre-requisitos (verificar ANTES de activar Fase 3)

- [ ] **100+ conversiones** registradas en la cuenta Google Ads
- [ ] **CPA estable** establecido desde Fase 2 (anotar valor: COP $_____)
- [ ] **Listas de remarketing > 10,000 usuarios** → Google Ads → Herramientas → Gestor de audiencias → Verificar tamano
- [ ] **YouTube Video Viewers > 50,000** → Gestor de audiencias → Verificar lista video viewers
- [ ] **Assets creativos listos:**
  - [ ] Banners de urgencia (countdown, "ultimas boletas")
  - [ ] Videos de cuenta regresiva (15-30 seg)
  - [ ] Videos de testimonios de asistentes 2025
  - [ ] Fotos actualizadas del evento (speakers, venue, expo)
- [ ] **Landing pages optimizadas:**
  - [ ] URL cambiada a `/experiencia-black/`
  - [ ] Video agregado a la landing
  - [ ] Garantia visible
  - [ ] Countdown timer implementado
- [ ] **Customer Match subido y procesado** → 60,259 registros → Match rate verificado
- [ ] **Conversion LaTiquetera verificada** → AW-17981312035 disparando correctamente

---

## Campana 1: [Search] All Tickets Consolidado | F3

### Estrategia
**CONSOLIDAR** Categoria + Boletas General + Marca en una sola campana para eficiencia de Smart Bidding. Google optimiza mejor con mas data en una campana.

### Paso 1 — Crear campana
1. Google Ads → **+ Nueva campana**
2. "Crear una campana sin la orientacion de un objetivo"
3. Tipo de campana: **Busqueda**
4. Nombre: `[Search] All Tickets Consolidado | F3`
5. Continuar

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia de puja | **Target CPA** |
| CPA objetivo | COP $35,000 (ajustar segun promedio de Fase 2) |
| Presupuesto diario | COP $255,000 (~$60 USD) |

### Paso 3 — Configuracion de campana
| Campo | Valor |
|-------|-------|
| Redes | ❌ Incluir Red de Display → DESACTIVAR |
| | ❌ Incluir partners de busqueda → DESACTIVAR |
| Ubicaciones | Seleccionar manualmente: |
| | Colombia (ajuste puja: +20%) |
| | Ecuador |
| | Republica Dominicana |
| | El Salvador |
| | Peru |
| | Mexico (ajuste puja: -15%) |
| | Chile (ajuste puja: -15%) |
| | Costa Rica (ajuste puja: -15%) |
| | Panama (ajuste puja: -15%) |
| | Guatemala (ajuste puja: -15%) |
| Opciones ubicacion | **"Presencia: Personas que se encuentran en tus ubicaciones"** |
| | ❌ NO seleccionar "Presencia o interes" |
| Idiomas | Espanol |
| Fecha inicio | 1 de agosto 2026 |
| Fecha finalizacion | 16 de octubre 2026 |
| Rotacion de anuncios | Optimizar: preferir anuncios con mejor rendimiento |

### Paso 4 — Audiencias (RLSA)
1. Ir a Audiencias → Editar segmentos de audiencia
2. Agregar las siguientes audiencias en modo **Observacion**:
   - Website Visitors → **Ajuste puja: +50%**
   - Customer Match (60,259 registros) → **Ajuste puja: +50%**
   - YouTube Video Viewers → **Ajuste puja: +30%**
3. Excluir: Converters (personas que ya compraron)

> ⚠️ Customer Match en RLSA con +50% porque son asistentes pasados = alta probabilidad de conversion.

### Paso 5 — Crear grupos de anuncios (3 separados)

**Grupo 1: `Brand - Exact Match`**
```
[feria effix]
[feria effix 2026]
[effix 2026]
[effix medellin]
[effix colombia]
[feriaeffix]
[feria effi]
[effix]
[boletas feria effix]
[effix black ticket]
[entrada feria effix]
[effix entradas]
```

**Grupo 2: `General - Intent Compra`**
```
[boletas feria effix]
[entradas feria effix 2026]
[boletas feria medellin octubre]
[pasaporte feria effix]
[cuanto cuesta feria effix]
[precio boletas feria effix]
"comprar boletas feria effix"
"entradas feria ecommerce medellin"
"boletas eventos medellin octubre"
"precio entrada feria effix"
"donde comprar boletas effix"
```

**Grupo 3: `Categoria - Prospeccion`**
```
[feria ecommerce medellin]
[evento ecommerce 2026]
[feria emprendimiento colombia]
[conferencia marketing digital medellin]
"feria ecommerce colombia 2026"
"eventos de ecommerce en latinoamerica"
"feria emprendimiento medellin octubre"
"conferencia dropshipping colombia"
```

Incluir TODAS las keywords ganadoras de Fase 1 y Fase 2 en cada grupo respectivo.

**Palabras clave negativas (nivel campana):**
```
[gratis]
[free]
[curso online]
[empleo]
[trabajo]
[vacante]
[stand]
[expositor]
```

### Paso 6 — Anuncios RSA (1 por grupo de anuncios)

**RSA Grupo Brand:**
| Campo | Valor |
|-------|-------|
| URL final | `https://feriaeffix.com` |
| Ruta visible 1 | `2026` |
| Ruta visible 2 | `boletas` |

**Titulos (urgencia):**
1. `Feria Effix 2026 — Sitio Oficial` → **FIJAR en posicion 1**
2. `16-18 Oct · Plaza Mayor Medellin` → **FIJAR en posicion 2**
3. `Ultimas Boletas Disponibles`
4. `Faltan X Dias — No Te Lo Pierdas`
5. `Cupos Agotandose Rapidamente`
6. `General · VIP · Black — Elige Ahora`
7. `49,000+ Asistentes en 2025`
8. `380+ Stands · 180+ Charlas · 3 Dias`
9. `Paga en Cuotas — Ultimos Cupos`
10. `La Feria Ecommerce #1 del Mundo`
11. `Compra Hoy — Precio Sube Pronto`
12. `Speakers Internacionales 2026`
13. `Networking con +20,000 Negocios`
14. `Boletas Desde $201,300 COP`
15. `Ecommerce · Dropshipping · AI`

> ⚠️ ACTUALIZAR SEMANALMENTE: Reemplazar "X" con numeros reales de dias/boletas restantes.

**Descripciones:**
1. `Feria Effix 2026: la feria de ecommerce mas grande del mundo. 3 dias de conferencias, networking y exposicion. Ultimas boletas — asegura tu lugar ahora.`
2. `49,000+ asistentes en 2025. 380+ stands, 180+ charlas. Boletas desde $201,300. Cupos limitados — se agotan rapido.`
3. `16-18 de octubre en Plaza Mayor, Medellin. Ecommerce, dropshipping, marketing digital e IA. Faltan pocos dias — compra ahora.`
4. `Experiencia Black: 9 mentorias exclusivas, comidas 3 dias, backstage con speakers. USD $997 o 4 cuotas de $250. Ultimos cupos.`

**RSA Grupo General:**
| Campo | Valor |
|-------|-------|
| URL final | `https://latiquetera.com/site/effix` |
| Ruta visible 1 | `effix` |
| Ruta visible 2 | `boletas` |

**Titulos:**
1. `Boletas Feria Effix 2026` → **FIJAR posicion 1**
2. `Desde $201,300 — Ultimas Boletas` → **FIJAR posicion 2**
3. `16-18 Oct · Plaza Mayor Medellin`
4. `Pasaporte 3 Dias Completos`
5. `Se Agotan — Compra Ahora`
6. `49,000+ Asistentes en 2025`
7. `Faltan X Dias para Effix`
8. `No Te Quedes Sin Tu Entrada`
9. `El Evento #1 de LATAM`
10. `Compra Segura en LaTiquetera`
11. `Cupos Limitados — Ultima Oportunidad`
12. `380+ Stands · 180+ Charlas`
13. `Speakers Internacionales`
14. `Networking con +20,000 Negocios`
15. `Ultimas Entradas Disponibles`

**Descripciones:**
1. `Ultimas boletas para Feria Effix 2026. Pasaporte 3 Dias desde $201,300. 380+ stands, 180+ charlas. Compra ahora antes de que se agoten.`
2. `16-18 de octubre en Plaza Mayor, Medellin. 49,000+ asistentes en 2025. No te quedes fuera — compra segura por LaTiquetera.`
3. `Ecommerce, dropshipping, marketing digital e IA. 3 dias intensivos. Cupos limitados — asegura tu entrada hoy.`

**RSA Grupo Categoria:**
| Campo | Valor |
|-------|-------|
| URL final | `https://feriaeffix.com` |
| Ruta visible 1 | `feria` |
| Ruta visible 2 | `2026` |

Usar mismos titulos y descripciones del grupo Brand con enfoque en urgencia.

### Paso 7 — Extensiones (nivel campana)
**Sitelinks:**
| Texto del enlace | URL | Descripcion linea 1 | Descripcion linea 2 |
|------------------|-----|---------------------|---------------------|
| Ultimas Boletas $201,300 | https://latiquetera.com/site/effix | Pasaporte 3 dias completos | Se agotan — compra ahora |
| Black Ticket $997 USD | https://feriaeffix.com/experiencia-black/ | 9 mentorias exclusivas | Ultimos cupos disponibles |
| Quiero un Stand | https://feriaeffix.com/quiero-tener-un-stand/ | Exhibe tu marca | Ultimos espacios |
| Ver Speakers 2026 | https://feriaeffix.com/ponentes | Speakers internacionales | Los mejores de LATAM |

**Textos destacados (Callouts):**
- Ultimas Boletas
- Cupos Limitados
- Paga en Cuotas
- 3 Dias Completos

**Fragmentos estructurados:**
- Tipo: Tipos → General, VIP, Black Ticket

**Extension de llamada:**
- Telefono: +57 320 655 6725

### Paso 8 — Pausar campanas anteriores
Al activar esta campana, **PAUSAR** las siguientes de Fase 1/Fase 2:
- [Search] Categoria Ecommerce
- [Search] Boletas General
- [Search] Marca Effix

> La consolidacion evita competencia interna y alimenta mejor al Smart Bidding.

### Paso 9 — Publicar campana

---

## Campana 2: [Search] Experiencia Black | Urgencia | F3

### Estrategia
**UPGRADE** de Fase 2. Escalar para el push final. Target ROAS porque el ticket es alto ($997 USD).

### Paso 1 — Crear campana
1. + Nueva campana → Sin orientacion → Busqueda
2. Nombre: `[Search] Experiencia Black | Urgencia | F3`

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia de puja | **Target ROAS** |
| ROAS objetivo | 300% (ajustar segun data Fase 2) |
| Presupuesto diario | COP $170,000 (~$40 USD) |

### Paso 3 — Configuracion
| Campo | Valor |
|-------|-------|
| Redes | ❌ Display off. ❌ Partners off |
| Ubicaciones | Colombia (+20%), Ecuador, Rep. Dominicana, El Salvador, Peru |
| | Mexico, Chile, Costa Rica, Panama, Guatemala (ajuste: -15%) |
| Opciones ubicacion | "Presencia" solamente |
| Idiomas | Espanol |
| Fecha inicio | 1 de agosto 2026 |
| Fecha finalizacion | 16 de octubre 2026 |

### Paso 4 — Audiencias (RLSA)
- Website Visitors → **Observacion** + **Ajuste puja: +50%**
- Customer Match → **Observacion** + **Ajuste puja: +50%**
- Excluir: Converters Black (quienes ya compraron Black)

### Paso 5 — Grupo de anuncios
- Nombre: `Black - Urgencia Intent`

### Paso 6 — Palabras clave
```
Concordancia exacta:
[effix black ticket]
[entrada black feria effix]
[experiencia vip feria effix]
[mentorias feria effix]
[feria effix premium]
[effix black]

Concordancia de frase:
"entrada premium feria ecommerce"
"experiencia vip evento ecommerce"
"mentorias con speakers ecommerce"
"networking exclusivo emprendedores"
"masterclass ecommerce presencial"
"evento ecommerce premium latam"

NUEVAS — modificadores de urgencia:
"ultimas entradas black effix"
"black ticket effix disponibilidad"
"effix black cupos disponibles"
"black ticket precio feria effix"
```

**Palabras clave negativas:**
```
[gratis]
[free]
[general]
[stand]
[expositor]
[empleo]
[trabajo]
```

### Paso 7 — Anuncio RSA
| Campo | Valor |
|-------|-------|
| URL final | `https://feriaeffix.com/experiencia-black/` |
| Ruta visible 1 | `black` |
| Ruta visible 2 | `2026` |

**Titulos:**
1. `Feria Effix 2026 — Black Ticket` → **FIJAR posicion 1**
2. `Solo Quedan X Cupos Black` → **FIJAR posicion 2**
3. `USD $997 o 4 Cuotas de $250`
4. `9 Mentorias Exclusivas Incluidas`
5. `Precio Sube en X Dias`
6. `Comidas Incluidas 3 Dias`
7. `Backstage con Speakers Premium`
8. `Zona Black Exclusiva`
9. `Networking de Alto Nivel`
10. `Desayunos con Ponentes`
11. `Ultimas Entradas Black`
12. `No Te Quedes Sin Tu Black`
13. `Cupos Agotandose — Compra Hoy`
14. `Experiencia Premium 3 Dias`
15. `La Inversion Que Cambia Tu Negocio`

> ⚠️ ACTUALIZAR SEMANALMENTE: Reemplazar "X" en titulos 2 y 5 con numeros reales.

**Descripciones:**
1. `Experiencia Black Feria Effix 2026: 9 mentorias exclusivas, comidas 3 dias, backstage con speakers. Ultimos cupos — no te quedes fuera.`
2. `USD $997 o 4 cuotas de $250. Zona exclusiva, networking de alto nivel, desayunos con ponentes. Se agotan — compra ahora.`
3. `La inversion que transforma tu negocio. 3 dias de acceso premium a la feria de ecommerce mas grande de LATAM. Cupos limitados.`
4. `Solo quedan pocos cupos Black. 16-18 Oct, Plaza Mayor Medellin. Mentorias, backstage, networking exclusivo. Asegura tu lugar hoy.`

### Paso 8 — Extensiones
- Compartir extensiones de cuenta (mismas de campana 1)
- Call: +57 320 655 6725

### Paso 9 — Publicar

---

## Campana 3: [Search] Stands B2B | F3

### Estrategia
Continuar de Fase 2 con ligero aumento de presupuesto para el push final. B2B se mantiene en Maximizar clics porque la conversion es offline (cotizacion → llamada → cierre).

### Paso 1 — Crear campana
1. + Nueva campana → Sin orientacion → Busqueda
2. Nombre: `[Search] Stands Expositores | B2B | F3`

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia | Maximizar clics |
| Limite CPC | COP $8,000 (~$1.90 USD) |
| Presupuesto diario | COP $51,000 (~$12 USD) |

### Paso 3 — Configuracion
| Campo | Valor |
|-------|-------|
| Redes | ❌ Display off. ❌ Partners off |
| Ubicaciones | Colombia (+20%), Ecuador, Mexico, Peru |
| Opciones ubicacion | "Presencia" |
| Idiomas | Espanol |
| Fecha inicio | 1 de agosto 2026 |
| Fecha finalizacion | 16 de octubre 2026 |

### Paso 4 — Audiencias
- Customer Match → **Observacion**
- Website Visitors → **Observacion**

### Paso 5 — Grupo: `Stands - B2B Urgencia`

### Paso 6 — Palabras clave
```
[stand feria effix]
[exponer feria effix]
[stand feria ecommerce medellin]
[stand feria medellin]
[effix expositor]
"alquilar stand feria ecommerce"
"participar como expositor feria"
"stand feria emprendimiento medellin"
"exhibir productos feria ecommerce"
"ferias para vender productos colombia"
"donde exhibir mi marca colombia"
```

**Negativos:**
```
[boletas]
[entradas]
[asistir]
[visitante]
[gratis]
```

### Paso 7 — Anuncio RSA
| Campo | Valor |
|-------|-------|
| URL final | `https://feriaeffix.com/quiero-tener-un-stand/` |
| Ruta visible | `stands/2026` |

**Titulos:**
1. `Exhibe en Feria Effix 2026` → **FIJAR posicion 1**
2. `Ultimos Espacios Disponibles` → **FIJAR posicion 2**
3. `+49,000 Visitantes · Tu Stand Ahi`
4. `380+ Marcas Ya Confirmaron`
5. `Plaza Mayor Medellin · 3 Dias`
6. `Stands Desde $500 USD`
7. `Se Agotan — Reserva Ahora`
8. `Conecta con +20,000 Negocios`
9. `La Feria Ecommerce #1 LATAM`
10. `Solicita Cotizacion Hoy`

**Descripciones:**
1. `Ultimos espacios para exhibir en Feria Effix 2026. +49,000 asistentes. Plaza Mayor Medellin, 16-18 Oct. Solicita cotizacion antes de que se agoten.`
2. `380+ marcas ya confirmaron su stand. Espacios premium casi agotados. Contacta ahora y asegura tu lugar en la feria de ecommerce mas grande de LATAM.`

### Paso 8 — Extensiones
- Sitelink: "Contactar Equipo Comercial" → /quiero-tener-un-stand/
- Call: +57 320 655 6725
- Callout: Ultimos Stands, Alto Trafico, Networking B2B, Espacios Premium

### Paso 9 — Publicar

---

## Campana 4: [PMax] Conversiones Effix | F3

### Estrategia
**NUEVA** — Performance Max. El tipo de campana mas poderoso de Google. Usa TODO el inventario de Google: Search, Display, YouTube, Gmail, Discover, Maps. Aqui es donde Customer Match brilla como senal primaria.

### Paso 1 — Crear campana
1. Google Ads → **+ Nueva campana**
2. Objetivo: **Ventas** o "Crear campana sin orientacion de objetivo"
3. Tipo de campana: **Performance Max**
4. Nombre: `[PMax] Conversiones Effix | F3`
5. Seleccionar objetivo de conversion: Compra (LaTiquetera + Black)
6. Continuar

### Paso 2 — Presupuesto y puja
| Campo | Valor |
|-------|-------|
| Presupuesto diario | COP $234,000 (~$55 USD) |
| Estrategia de puja | **Maximizar conversiones** |
| CPA objetivo | No establecer las primeras 2 semanas |
| | Despues de 2 semanas: establecer Target CPA basado en resultados |

### Paso 3 — Configuracion
| Campo | Valor |
|-------|-------|
| Ubicaciones | Colombia (+20%), Ecuador, Rep. Dominicana, El Salvador, Peru |
| | Mexico, Chile, Costa Rica, Panama, Guatemala |
| Opciones ubicacion | "Presencia" solamente |
| Idiomas | Espanol |
| Fecha inicio | 1 de agosto 2026 |
| Fecha finalizacion | 16 de octubre 2026 |
| URL final | Activar "Expansion de URL final" → `https://feriaeffix.com` |
| Excluir URLs | Excluir paginas no relevantes (blog posts, politicas, etc.) |

### Paso 4 — Senales de audiencia (CRITICO)

> ⚠️ Las senales de audiencia son lo MAS IMPORTANTE de PMax. Google las usa para encontrar personas similares a tu mejor audiencia.

**Senales a configurar (en este orden de prioridad):**

1. **Customer Match (SENAL PRIMARIA)**
   - Subir la lista de 60,259 registros
   - Google encontrara personas que SE PARECEN a tus clientes pasados

2. **Website Visitors (Remarketing)**
   - Lista "All Website Visitors" del GTM

3. **YouTube Video Viewers**
   - Lista de quienes vieron videos del canal

4. **Segmentos personalizados (Custom Segments):**
   - Personas que buscaron: `feria ecommerce`, `eventos medellin`, `conferencias marketing digital`, `evento emprendimiento`, `feria dropshipping`

5. **Intereses (In-Market / Affinity):**
   - E-commerce y compras online
   - Marketing digital
   - Emprendimiento y startups
   - Tecnologia empresarial
   - Viajes y eventos (afinidad)

### Paso 5 — Crear grupo de assets
- Nombre del grupo: `Effix 2026 — All Tickets`

### Paso 6 — Assets del grupo

**URL final:** `https://feriaeffix.com`

**Titulos (minimo 5, maximo 15):**
1. `Feria Effix 2026`
2. `Boletas Desde $201,300`
3. `16-18 Oct Medellin`
4. `Ultimas Entradas`
5. `49,000+ Asistentes`
6. `Cupos Agotandose`
7. `Compra Ahora`
8. `380+ Marcas Expositoras`
9. `La Feria #1 de LATAM`
10. `Faltan X Dias`

**Titulos largos (minimo 1, maximo 5):**
1. `La Feria de Ecommerce Mas Grande de LATAM — 16-18 Oct 2026 Medellin`
2. `Feria Effix 2026: 3 Dias de Ecommerce, Networking y Conferencias en Medellin`
3. `Ultimas Boletas para Feria Effix 2026 — No Te Quedes Fuera`
4. `49,000+ Asistentes, 380+ Stands, 180+ Charlas — Feria Effix 2026`
5. `Compra Tu Entrada para la Feria de Ecommerce Mas Grande del Mundo`

**Descripciones (minimo 2, maximo 5):**
1. `Feria Effix 2026: la feria de ecommerce mas grande del mundo. 3 dias de conferencias, networking y exposicion. Ultimas boletas — compra ahora.`
2. `49,000+ asistentes en 2025. 380+ stands, 180+ charlas. Boletas desde $201,300. Cupos limitados — se agotan rapido.`
3. `16-18 de octubre en Plaza Mayor, Medellin. Ecommerce, dropshipping, marketing digital e IA. No te quedes fuera.`
4. `General, VIP o Black — elige tu experiencia. Desde $201,300 COP. Speakers internacionales, networking exclusivo.`
5. `Experiencia Black: 9 mentorias exclusivas, comidas 3 dias, backstage con speakers. USD $997 o 4 cuotas de $250.`

**Imagenes (subir todas):**
| Formato | Tamano | Descripcion |
|---------|--------|-------------|
| Landscape | 1200x628 px | Fotos del evento (expo hall, publico, speakers) |
| Cuadrado | 1200x1200 px | Fotos con logo y fecha |
| Cuadrado pequeno | 300x300 px | Logo Feria Effix |

> Subir minimo 3 imagenes landscape, 3 cuadradas y 1 cuadrada pequena.

**Logo:**
- Logo de Feria Effix (formato cuadrado, fondo transparente si es posible)

**Videos:**
- URL(s) de YouTube del canal de Feria Effix
- Ideal: Video highlights 2025 (15-30 seg)
- Ideal: Video countdown/urgencia (15 seg)

> Si no hay videos listos, PMax generara automaticamente videos a partir de las imagenes.

**Sitelinks (nivel campana):**
| Texto del enlace | URL |
|------------------|-----|
| Ultimas Boletas $201,300 | https://latiquetera.com/site/effix |
| Black Ticket $997 USD | https://feriaeffix.com/experiencia-black/ |
| Quiero un Stand | https://feriaeffix.com/quiero-tener-un-stand/ |
| Ver Speakers 2026 | https://feriaeffix.com/ponentes |

**Textos destacados:**
- Ultimas Boletas
- Cupos Limitados
- Paga en Cuotas
- 3 Dias Completos

**Extension de llamada:**
- +57 320 655 6725

### Paso 7 — Publicar campana

### Notas importantes sobre PMax
- **Las primeras 2 semanas son de aprendizaje** — NO tocar presupuesto ni configuracion
- Revisar tab "Insights" semanalmente para entender donde muestra Google los anuncios
- Si Search canibaliza con campanas manuales, considerar agregar Brand como negativo en PMax (requiere contactar soporte Google)
- Revisar Asset Performance: reemplazar assets con calificacion "Bajo" por nuevos

---

## Campana 5: [Display] Urgencia | F3

### Estrategia
**UPGRADE** de Fase 2 remarketing. Ahora incluye Customer Match como targeting DIRECTO. Mensaje para asistentes pasados: "Ya fuiste a Effix — Vuelve en 2026".

### Paso 1 — Crear campana
1. + Nueva campana → Sin orientacion → **Display**
2. Nombre: `[Display] Urgencia | Remarketing + Customer Match | F3`

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia | **Target CPA** |
| CPA objetivo | COP $35,000 (ajustar segun data) |
| Presupuesto diario | COP $128,000 (~$30 USD) |

### Paso 3 — Configuracion
| Campo | Valor |
|-------|-------|
| Ubicaciones | Colombia, Ecuador, Rep. Dominicana, El Salvador, Peru, Mexico |
| Idiomas | Espanol |
| Limite frecuencia | **10 impresiones por usuario por dia** (agresivo — es fase de cierre) |
| Exclusion de contenido | Excluir contenido sensible, juegos de azar, contenido adulto |

### Paso 4 — Audiencias (**TARGETING — no Observacion**)

| Segmento | Modo |
|----------|------|
| Website Visitors (ultimos 30 dias) | **Segmentacion** (targeting) |
| Customer Match — 60,259 registros | **Segmentacion** (targeting directo) |
| Exclusion: Converters | **Exclusion** |

> ⚠️ Esta campana SI restringe. Solo muestra banners a:
> 1. Quienes visitaron feriaeffix.com en los ultimos 30 dias
> 2. Clientes pasados de la base de datos (Customer Match)
> NO muestra a audiencia fria.

### Paso 5 — Crear anuncio Display Responsive
| Campo | Valor |
|-------|-------|
| Imagenes | Banners de urgencia con countdown |
| | Formatos: 1200x628 (landscape), 300x300 (cuadrado), 1200x1200 (cuadrado) |
| Titulo largo | `Faltan X Dias para Feria Effix 2026 — Ultimas Boletas` |
| Titulo corto 1 | `Ultimas Boletas Effix 2026` |
| Titulo corto 2 | `Faltan X Dias — Compra Ahora` |
| Titulo corto 3 | `Ya Fuiste a Effix — Vuelve en 2026` |
| Titulo corto 4 | `Cupos Agotandose` |
| Descripcion 1 | `Ultimas boletas para Feria Effix 2026. 16-18 Oct, Plaza Mayor Medellin. Compra ahora antes de que se agoten.` |
| Descripcion 2 | `Ya fuiste a Effix — La edicion 2026 sera la mas grande. 49,000+ asistentes, 380+ stands. Asegura tu entrada.` |
| Descripcion 3 | `Faltan pocos dias. Boletas desde $201,300. General, VIP o Black. No te quedes fuera de Effix 2026.` |
| Nombre empresa | `Feria Effix` |
| URL final | `https://feriaeffix.com` |
| CTA | `Compra Ahora` |

> ⚠️ ACTUALIZAR SEMANALMENTE: Los titulos con "X Dias" deben actualizarse con la cuenta regresiva real.

**Mensajes clave para banners:**
- "Faltan X Dias para Feria Effix"
- "Ultimas Boletas — Compra Ahora"
- "Ya fuiste a Effix — La Edicion 2026 Sera la Mas Grande"
- "Cupos Agotandose — Asegura Tu Entrada"
- "El Evento Ecommerce del Ano — No Te Lo Pierdas"

### Paso 6 — Publicar

---

## Campana 6: [YouTube] Urgencia | F3

### Estrategia
Cambio a video ads enfocados en conversion con mensajes de urgencia. Testimonios de asistentes pasados + countdown.

### Paso 1 — Crear campana
1. + Nueva campana → Sin orientacion → **Video**
2. Subtipo: **Campana de accion de video** (Video Action Campaign)
3. Nombre: `[YouTube] Urgencia + Conversion | F3`

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia | **Target CPA** |
| CPA objetivo | COP $50,000 (ajustar segun data) |
| Presupuesto diario | COP $107,000 (~$25 USD) |

### Paso 3 — Configuracion
| Campo | Valor |
|-------|-------|
| Redes | YouTube Videos |
| Ubicaciones | Colombia (+20%), Ecuador, Rep. Dominicana, Mexico, Peru |
| Idiomas | Espanol |
| Limite frecuencia | 5 impresiones por usuario por dia |

### Paso 4 — Audiencias
| Segmento | Modo |
|----------|------|
| YouTube Video Viewers | **Segmentacion** |
| Similar Audiences (basada en Video Viewers) | **Segmentacion** |
| Website Visitors | **Segmentacion** |
| Customer Match | **Senal** para Similar Audiences |
| Exclusion: Converters | **Exclusion** |

> Customer Match como SENAL: Google encuentra personas que SE PARECEN a tus compradores pasados y les muestra los videos.

### Paso 5 — Crear anuncio de video
| Campo | Valor |
|-------|-------|
| Video de YouTube | URL del video de testimonios/countdown |
| Formato | In-Stream saltable (Video Action) |
| URL final | `https://feriaeffix.com` |
| CTA | `Compra Ahora` |
| Headline | `Ultimas Boletas Feria Effix 2026` |
| Titulo largo | `Faltan X Dias — La Feria de Ecommerce Mas Grande de LATAM` |
| Descripcion | `Ultimas entradas para Feria Effix 2026. 16-18 Oct, Medellin. Compra ahora.` |

**Creativos necesarios (videos):**
1. **Video testimonial** (30-60 seg): Asistentes de 2025 hablando de su experiencia
2. **Video countdown** (15-30 seg): Cuenta regresiva con highlights del evento
3. **Video "ultimas boletas"** (15 seg): Mensaje directo de urgencia con CTA fuerte

> ⚠️ Si solo hay 1 video disponible, usar ese. Agregar mas videos a medida que esten listos.

### Paso 6 — Publicar

---

## Campana 7: [Search] Competidores | F3

### Estrategia
**NUEVA** — Capturar personas buscando eventos de la competencia. Posicionar Effix como la alternativa #1 en LATAM.

### Paso 1 — Crear campana
1. + Nueva campana → Sin orientacion → Busqueda
2. Nombre: `[Search] Competidores | Conquest | F3`

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia | Maximizar clics |
| Limite CPC maximo | COP $6,000 (~$1.40 USD) |
| Presupuesto diario | COP $64,000 (~$15 USD) |

### Paso 3 — Configuracion
| Campo | Valor |
|-------|-------|
| Redes | ❌ Display off. ❌ Partners off |
| Ubicaciones | Colombia, Ecuador, Mexico, Peru, Chile |
| Opciones ubicacion | "Presencia" |
| Idiomas | Espanol |
| Fecha inicio | 1 de agosto 2026 |
| Fecha finalizacion | 16 de octubre 2026 |

### Paso 4 — Audiencias
- Customer Match → **Observacion**

### Paso 5 — Grupo de anuncios
- Nombre: `Competidores - Conquest`

### Paso 6 — Palabras clave (concordancia de frase)
```
"expo ecommerce bogota"
"feria emprendimiento bogota"
"evento marketing digital mexico"
"congreso ecommerce santiago"
"summit ecommerce lima"
"expo negocios digitales"
"feria dropshipping"
"congreso marketing digital bogota"
"evento emprendimiento latam"
"feria negocios online"
"expo emprendimiento mexico"
"summit marketing digital"
```

**Palabras clave negativas (CRITICO — no canibalizar marca):**
```
[effix]
[feria effix]
[feriaeffix]
[effix 2026]
[feria effix 2026]
```

### Paso 7 — Anuncio RSA
| Campo | Valor |
|-------|-------|
| URL final | `https://feriaeffix.com` |
| Ruta visible 1 | `feria` |
| Ruta visible 2 | `ecommerce` |

> ⚠️ NO mencionar competidores por nombre en los anuncios — Google lo prohibe.

**Titulos:**
1. `La Mayor Feria Ecommerce de LATAM` → **FIJAR posicion 1**
2. `49,000+ Asistentes · 380+ Marcas` → **FIJAR posicion 2**
3. `16-18 Oct · Medellin Colombia`
4. `Boletas Desde $201,300 COP`
5. `180+ Charlas · Speakers de Talla Mundial`
6. `3 Dias Intensivos de Ecommerce`
7. `Networking con +20,000 Negocios`
8. `La Feria que Reune a Todo LATAM`
9. `General · VIP · Black — Tu Nivel`
10. `El Evento #1 del Ecommerce`
11. `Medellin como Destino — Feria + Ciudad`
12. `Dropshipping · IA · Marketing Digital`
13. `8 Auditorios · 3 Pabellones`
14. `Compra Tu Entrada Ahora`
15. `Cupos Limitados — Se Agotan`

**Descripciones:**
1. `Feria Effix 2026: la feria de ecommerce mas grande de LATAM. 49,000+ asistentes, 380+ stands, 180+ charlas. 16-18 Oct, Medellin. Boletas desde $201,300.`
2. `No hay evento mas grande. 3 dias de ecommerce, dropshipping, marketing digital e IA. Speakers internacionales. Plaza Mayor Medellin — compra tu entrada.`
3. `Medellin te espera. La feria que reune a todo LATAM en un solo lugar. Networking, conferencias y expo. Cupos limitados — asegura tu lugar.`

### Paso 8 — Extensiones
- Compartir extensiones de cuenta
- Call: +57 320 655 6725
- Callout: #1 en LATAM, 49,000+ Asistentes, Medellin Colombia, 3 Dias

### Paso 9 — Publicar

---

## Resumen de lanzamiento

### Orden recomendado (hacer en 3-4 sesiones)

| Dia | Accion |
|-----|--------|
| **Dia 1 (inicio Agosto)** | 1. Pausar campanas Fase 2 que se consolidan |
| | 2. Crear [Search] All Tickets Consolidado (campana 1) |
| | 3. Crear [Search] Black Urgencia (campana 2) |
| **Dia 2** | 4. Crear [Search] Stands B2B (campana 3) |
| | 5. Crear [Search] Competidores (campana 7) |
| **Dia 3** | 6. Crear [PMax] Conversiones (campana 4) — requiere todos los assets listos |
| **Dia 4** | 7. Crear [Display] Urgencia (campana 5) |
| | 8. Crear [YouTube] Urgencia (campana 6) — cuando videos esten listos |

---

## Verificacion de presupuesto

| Campana | COP/dia | USD/dia | % |
|---------|---------|---------|---|
| [Search] All Tickets Consolidado | $255,000 | $60 | 25% |
| [Search] Experiencia Black | $170,000 | $40 | 17% |
| [Search] Stands B2B | $51,000 | $12 | 5% |
| [PMax] Conversiones Effix | $234,000 | $55 | 23% |
| [Display] Urgencia | $128,000 | $30 | 13% |
| [YouTube] Urgencia | $107,000 | $25 | 11% |
| [Search] Competidores | $64,000 | $15 | 6% |
| **TOTAL** | **COP $1,009,000** | **$237** | **100%** |

$237/dia x 92 dias = $21,804 ≈ **$22,000 presupuesto Fase 3** ✓

### Pacing mensual (ajustar semanalmente)

| Mes | Dias | Presupuesto | Diario promedio | Estrategia |
|-----|------|-------------|-----------------|------------|
| **Agosto** | 31 | $6,000 | ~$194/dia | Arranque — reducir PMax y Display ligeramente |
| **Septiembre** | 30 | $9,000 | ~$300/dia | Escalar — aumentar todas las campanas |
| **Octubre 1-16** | 16 | $7,000 | ~$438/dia | **PUSH MAXIMO** — duplicar presupuestos clave |

### Como ajustar semanalmente
- **Agosto semana 1-2:** Presupuesto conservador. PMax esta aprendiendo. No tocar.
- **Agosto semana 3-4:** Subir 10-15% campanas con buen CPA. Bajar las que no rinden.
- **Septiembre:** Escalar agresivamente. Aumentar presupuestos 30-50% en campanas ganadoras.
- **Octubre 1-10:** Push fuerte. Aumentar frecuencia Display a maximo. Aumentar todos los budgets.
- **Octubre 11-16:** MAXIMO PUSH. Todo al 100%. Ultimos dias antes del evento.

---

## Checklist semanal de optimizacion — Fase 3

### Rendimiento
- [ ] Revisar CPA vs objetivo — ajustar pujas si CPA > 20% del target
- [ ] Verificar ROAS de campana Black — ajustar si esta por debajo del 300%
- [ ] Revisar conversiones por campana — redistribuir presupuesto a ganadoras

### Mensajes de urgencia
- [ ] **Actualizar numeros de countdown** en titulos de anuncios ("X dias", "X boletas")
- [ ] Refrescar mensajes de urgencia semanalmente
- [ ] Actualizar banners Display con nueva cuenta regresiva
- [ ] Verificar que los titulos fijados reflejan la urgencia actual

### Busqueda
- [ ] Revisar Search Terms Report → agregar negativos para terminos irrelevantes
- [ ] Agregar nuevos keywords de competidores que aparezcan
- [ ] Verificar que campana de competidores no canibaliza marca

### Performance Max
- [ ] Revisar tab "Insights" — entender donde muestra Google los anuncios
- [ ] Revisar Asset Performance — reemplazar assets con calificacion "Bajo"
- [ ] Verificar que senales de audiencia estan funcionando
- [ ] Monitorear si PMax canibaliza Search — ajustar si es necesario

### Presupuesto
- [ ] Verificar gasto acumulado vs pacing mensual
- [ ] Ajustar presupuestos diarios para alcanzar meta mensual
- [ ] Redistribuir presupuesto de campanas con bajo rendimiento

### General
- [ ] Verificar que conversiones estan registrandose correctamente
- [ ] Revisar listas de remarketing — tamanos creciendo
- [ ] Revisar performance por geo — ajustar bid adjustments si necesario

---

## Post-evento (despues del 18 de octubre)

### Acciones inmediatas
1. **PAUSAR todas las campanas** — no gastar mas presupuesto
2. **NO eliminar campanas** — mantener el historico para analisis
3. Exportar reportes finales de cada campana:
   - Exportar desde Google Ads → Reportes → Informe personalizado
   - Metricas: Impresiones, Clics, CTR, CPC, Conversiones, CPA, ROAS, Gasto
   - Segmentar por: Campana, Semana, Dispositivo, Geo

### Documentar aprendizajes
- [ ] CPA promedio por campana y fase
- [ ] Keywords top performers (CTR > 10%, CPA bajo)
- [ ] Keywords a eliminar para 2027
- [ ] Rendimiento de Customer Match (conversion rate vs audiencia fria)
- [ ] Rendimiento de PMax vs Search manual
- [ ] Mejor creatividad (Display + YouTube)
- [ ] Geo performance — cuales paises convirtieron mejor
- [ ] Dispositivo — mobile vs desktop conversion rate

### Preparar para 2027
- [ ] **Mantener listas de remarketing** — no eliminar, usables para proximo ano
- [ ] **Mantener Customer Match** — actualizar con nuevos compradores 2026
- [ ] Guardar estructura de campanas como plantilla
- [ ] Documentar presupuesto optimo por fase
- [ ] Anotar fechas clave para planificacion 2027

---

## Referencia rapida — IDs y accesos

| Recurso | ID / URL |
|---------|----------|
| Cuenta Google Ads | 356-853-8992 |
| ID de conversion | AW-17981312035 |
| Etiqueta de conversion | RTbrCMHZpoYcEKOYlP5C |
| GTM Container | GTM-TLRMK246 |
| GA4 Measurement ID | G-CRXZ50VX7D |
| Landing principal | feriaeffix.com |
| Landing Black | feriaeffix.com/experiencia-black/ |
| Landing Stands | feriaeffix.com/quiero-tener-un-stand/ |
| Boletas General | latiquetera.com/site/effix |
| WhatsApp | +57 320 655 6725 |
| Customer Match | 60,259 registros |
