---
tags:
  - google-ads
  - feria-effix
  - fase-2
  - guia-montaje
created: "2026-03-24"
status: planificado
presupuesto_fase: USD $13,000
periodo: "2026-05 al 2026-07"
---

# Fase 2: Consideracion — Guia de Montaje Completa

> Cuenta: 356-853-8992 | Moneda: COP | Zona horaria: GMT-5 Colombia
> Presupuesto Fase 2: $13,000 USD (May $4,000 + Jun $4,500 + Jul $4,500)
> Budget diario total: ~$140 USD (~COP $595,000)

## Logica de funnel

```
FASE 1 (Mar-Abr):  Calentar → Acumular data → Remarketing lists    ✅ COMPLETADA
FASE 2 (ahora):    Retargetear → Smart Bidding → RLSA → Scale       ← ESTAMOS AQUI
FASE 3 (Ago-Oct):  Customer Match a full → PMax → Urgencia → Push final
```

**Esta es la fase de ENGAGEMENT / RETARGETING.** Equivalente al retargeting de viewers + campanas de engagement de Meta Ads.

### Cambios clave vs Fase 1

| Aspecto | Fase 1 | Fase 2 |
|---------|--------|--------|
| Bidding | Maximizar clics (data) | Smart Bidding (conversiones) |
| Audiencias | Customer Match en Observacion | + RLSA + Combined Audiences |
| YouTube | Awareness (nuevos) | Remarketing (visitantes) |
| Display | Remarketing basico | Remarketing secuencial (3 mensajes) |
| Campanas | 6 campanas | 7 campanas (+Experiencia Black) |
| Budget diario | ~$83 USD | ~$140 USD (+69%) |
| Customer Match | Solo observacion | Display como audiencia combinada |

---

## Pre-requisitos (verificar ANTES de activar Fase 2)

> ⚠️ Si alguno de estos criterios NO se cumple, NO activar Fase 2 para esa campana especifica.

- [ ] **30+ conversiones registradas** → Google Ads → Herramientas → Medicion → Conversiones → Verificar total
  - Si < 30: mantener Maximizar clics en campanas Search
  - Si >= 30: activar Smart Bidding (Maximizar conversiones o Target CPA)
- [ ] **Remarketing list "All Visitors" > 3,000 usuarios** → Google Ads → Herramientas → Gestor de audiencias → Verificar tamano
  - Si < 1,000: Search no puede usar RLSA → mantener sin ajustes de audiencia
  - Si >= 1,000: activar RLSA en Search
  - Si >= 3,000: activar Display remarketing con audiencia combinada
- [ ] **YouTube Video Viewers > 10,000 usuarios** → Gestor de audiencias → Lista "YouTube Users"
  - Si < 10,000: YouTube remarketing limitado → considerar mantener Awareness de F1
  - Si >= 10,000: activar YouTube Remarketing F2
- [ ] **Customer Match subido y matched** → Gestor de audiencias → Listas de clientes → Verificar tasa de coincidencia
  - Esperado: 60,259 registros → ~30-40% match rate → ~18,000-24,000 usuarios
  - Si no esta subido: SUBIR AHORA → `assets/customer-match-boletas.csv`
- [ ] **Landing Black con URL correcta** → Verificar que `feriaeffix.com/experiencia-black/` esta activa
  - Si URL no cambiada: NO lanzar campana Experiencia Black
  - Contactar equipo web para redirigir /estrategia-google-ads/ → /experiencia-black/
- [ ] **Conversion LaTiquetera verificada** → Tag Assistant → Simular compra → Verificar AW-17981312035

---

## Campana 1: [Search] Categoria Ecommerce | F2

### Estado: UPGRADE desde Fase 1

**Archivo de referencia F1:** `campanas/search-categoria.md`

### Paso 1 — Evaluar data de Fase 1
1. Google Ads → Campana `[Search] Categoria Ecommerce` → Revisar metricas
2. Verificar: ¿Tiene 30+ conversiones?
   - **SI:** Proceder al Paso 2 (cambiar bidding)
   - **NO:** Mantener Maximizar clics, solo subir presupuesto al nuevo nivel

### Paso 2 — Cambiar estrategia de puja
1. Ir a la campana → Configuracion → Pujas
2. Cambiar de "Maximizar clics" a:

| Campo | Valor |
|-------|-------|
| Estrategia de puja | Maximizar conversiones |
| CPA objetivo (opcional) | COP $40,000 (~$9.40 USD) — SOLO si hay 50+ conversiones |
| | Si hay 30-49 conv: dejar Maximizar conversiones SIN CPA objetivo |

> ⚠️ Si configuras Target CPA demasiado pronto, Google restringe la entrega. Mejor dejar que optimice solo primero.

### Paso 3 — Subir presupuesto
1. Campana → Configuracion → Presupuesto diario
2. Cambiar de COP $80,000 → **COP $95,000/dia (~$22 USD)**

### Paso 4 — Agregar RLSA (Remarketing Lists for Search Ads)
1. Ir a la campana → Audiencias → Editar segmentos de audiencia
2. Buscar la lista **"All Website Visitors"** (remarketing)
3. Agregar con modo: **Observacion** (NO Segmentacion — queremos ampliar, no restringir)
4. Ir a Ajustes de puja → Audiencias → "All Website Visitors"
5. Configurar ajuste de puja: **+20%**
   - Esto significa: si alguien ya visito el sitio Y busca keywords de categoria, pagamos 20% mas por ese clic

### Paso 5 — Actualizar palabras clave
1. Ir a Search Terms Report de los ultimos 60 dias
2. Identificar terminos con:
   - CTR > 5% y conversiones > 0 → **AGREGAR como keyword**
   - CTR < 1% o irrelevantes → **AGREGAR como negativo**
3. Mantener keywords existentes de F1
4. Agregar nuevas keywords ganadoras del Search Terms Report

### Paso 6 — Actualizar negativos
1. Revisar lista de negativos actual
2. Agregar cualquier termino nuevo irrelevante encontrado en F1
3. Palabras clave negativas vigentes (minimo):
```
[gratis]
[free]
[curso online]
[empleo]
[trabajo]
[vacante]
```

### Checklist semanal F2
- [ ] CPA < COP $40,000 (si Smart Bidding activo)
- [ ] Conversiones incrementando semana a semana
- [ ] RLSA bid adjustment generando mas conversiones con visitors
- [ ] Search Terms Report limpio (sin terminos basura)
- [ ] Customer Match en modo **Observacion** (no Segmentacion)
- [ ] Budget COP $95,000/dia ejecutandose correctamente

---

## Campana 2: [Search] Marca Effix | Always-on | F2

### Estado: UPGRADE menor desde Fase 1

### Paso 1 — Subir presupuesto
1. Ir a la campana → Configuracion → Presupuesto diario
2. Cambiar de COP $68,000 → **COP $77,000/dia (~$18 USD)**

### Paso 2 — Verificar bidding
| Campo | Valor |
|-------|-------|
| Estrategia de puja | Target Impression Share — **SIN CAMBIO** |
| Porcentaje objetivo | 90% top of page — **SIN CAMBIO** |
| Limite CPC maximo | COP $4,000 — **SIN CAMBIO** |

> La campana de marca no cambia bidding. El objetivo sigue siendo dominar las busquedas de marca.

### Paso 3 — Actualizar keywords de marca
1. Revisar Search Terms Report de F1
2. Buscar variaciones nuevas de la marca que aparezcan (typos, combinaciones)
3. Agregar como concordancia exacta si son relevantes
4. Keywords vigentes (minimo):
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

### Paso 4 — Verificar audiencias
- Customer Match → **Observacion** (sin cambio)

### Paso 5 — Verificar extensiones
- Sitelinks: Mismos de nivel de cuenta
- Call: +57 320 655 6725
- Callouts: +49,000 asistentes en 2025, 380+ marcas expositoras, Paga en cuotas, 3 dias completos

### Checklist semanal F2
- [ ] Impression Share > 85% (top of page)
- [ ] CPC < COP $4,000
- [ ] Sin fugas de presupuesto a terminos no-brand
- [ ] Budget COP $77,000/dia ejecutandose

---

## Campana 3: [Search] Boletas General | Masivo | F2

### Estado: UPGRADE — CAMPANA CLAVE (mayor volumen)

### Paso 1 — Evaluar data de Fase 1
1. Google Ads → Campana Boletas General → Revisar conversiones
2. ¿Tiene 30+ conversiones?
   - **SI:** Cambiar bidding a Maximizar conversiones
   - **NO:** Mantener Maximizar clics y solo subir presupuesto

### Paso 2 — Cambiar estrategia de puja (si aplica)
| Campo | Valor |
|-------|-------|
| Estrategia de puja | Maximizar conversiones |
| CPA objetivo (opcional) | COP $35,000 (~$8.20 USD) — SOLO si hay 50+ conversiones |
| | Si 30-49 conv: Maximizar conversiones SIN CPA objetivo |
| Presupuesto diario | COP $128,000 (~$30 USD) |

> Esta campana es la de mayor volumen. El CPA objetivo de COP $35,000 es agresivo — si no se cumple en 2 semanas, subir a COP $45,000.

### Paso 3 — Agregar RLSA
1. Campana → Audiencias → Editar segmentos
2. Agregar **"All Website Visitors"** → Observacion
3. Ajuste de puja: **+30%**
   - Mayor bid adjustment que Categoria porque el intent de compra ya es mas claro

> ⚠️ +30% es agresivo. Si el CPA sube demasiado con visitors, bajar a +20%.

### Paso 4 — Verificar audiencias
- Customer Match → **Observacion** (sin cambio)
- RLSA → Observacion con bid +30%

### Paso 5 — Actualizar keywords
1. Revisar Search Terms de F1
2. Keywords vigentes (minimo):
```
Concordancia exacta:
[boletas feria effix]
[entradas feria effix 2026]
[boletas feria medellin octubre]
[pasaporte feria effix]
[cuanto cuesta feria effix]
[precio boletas feria effix]

Concordancia de frase:
"comprar boletas feria effix"
"entradas feria ecommerce medellin"
"boletas eventos medellin octubre"
"precio entrada feria effix"
"donde comprar boletas effix"
```
3. Agregar keywords ganadoras del Search Terms Report de F1

### Paso 6 — Actualizar negativos
```
[gratis]
[free]
[curso online]
[empleo]
[trabajo]
[vacante]
[black]
[vip]
[stand]
[expositor]
```

### Paso 7 — Verificar anuncio y extensiones
- Anuncio RSA: Sin cambios (mismo de F1)
- URL final: `https://latiquetera.com/site/effix`
- Extensiones: Mismas de nivel de cuenta + Call +57 320 655 6725

### Checklist semanal F2
- [ ] CPA < COP $45,000 (si Smart Bidding activo)
- [ ] Conversiones > 10/semana (objetivo)
- [ ] RLSA visitors convirtiendo a mayor tasa que nuevos
- [ ] Budget COP $128,000/dia ejecutandose
- [ ] LaTiquetera conversion firing correctamente (verificar con Tag Assistant)

---

## Campana 4: [Search] Experiencia Black | Empresarios | F2

### Estado: ⭐ CAMPANA NUEVA — High-ticket $997 USD

> Esta campana NO existia en Fase 1. Es nueva y requiere montaje completo.
> Equivalente en Meta: campana de retargeting para producto premium.

### Pre-requisito critico
⚠️ **La URL debe estar activa:** `feriaeffix.com/experiencia-black/`
- Actualmente la landing esta en: `feriaeffix.com/estrategia-google-ads/`
- Si la URL NO ha cambiado: **NO lanzar esta campana**. Usar la URL vieja temporal.
- Contactar equipo web: redirigir /estrategia-google-ads/ → /experiencia-black/

### Paso 1 — Crear campana
1. Google Ads → **+ Nueva campana**
2. "Crear una campana sin la orientacion de un objetivo"
3. Tipo de campana: **Busqueda**
4. Nombre: `[Search] Experiencia Black | Empresarios | F2`
5. Continuar

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia de puja | Maximizar clics |
| Limite CPC maximo | COP $12,000 (~$2.80 USD) |
| Presupuesto diario | COP $107,000 (~$25 USD) |

> ⚠️ Se usa Maximizar clics porque es producto high-ticket y nuevo. Necesita acumular data antes de Smart Bidding. El CPC maximo de $12,000 es mas alto que en otras campanas porque el valor del producto ($997 USD) lo justifica.

### Paso 3 — Configuracion de campana
| Campo | Valor |
|-------|-------|
| Redes | ❌ Incluir Red de Display → DESACTIVAR |
| | ❌ Incluir partners de busqueda → DESACTIVAR |
| Ubicaciones | Seleccionar manualmente: |
| | Colombia (ajuste puja: +20%) |
| | Ecuador |
| | Republica Dominicana |
| | Mexico |
| | Peru |
| | Chile |
| Opciones ubicacion | **"Presencia: Personas que se encuentran en tus ubicaciones"** |
| | ❌ NO seleccionar "Presencia o interes" |
| Idiomas | Espanol |
| Fecha inicio | 1 de mayo 2026 (o cuando URL este lista) |
| Fecha finalizacion | Sin fecha |
| Rotacion de anuncios | Optimizar: preferir anuncios con mejor rendimiento |

> Solo paises con poder adquisitivo para un ticket de $997 USD. No incluir El Salvador, Guatemala, Costa Rica ni Panama para esta campana.

### Paso 4 — Audiencias
1. Ir a Audiencias → Editar segmentos de audiencia
2. Buscar la lista **Customer Match** → Seleccionar → **Observacion** (NO Segmentacion)
3. Guardar

> Customer Match en observacion permite ver cuantos de tus clientes historicos buscan keywords de Black, sin restringir el alcance.

### Paso 5 — Crear grupo de anuncios
- Nombre grupo: `Black Ticket - Premium Intent`

### Paso 6 — Palabras clave
Copiar y pegar exactamente:
```
Concordancia exacta:
[effix black ticket]
[entrada black feria effix]
[feria effix premium]
[effix black]
[black ticket effix 2026]

Concordancia de frase:
"entrada premium feria ecommerce"
"experiencia vip evento ecommerce"
"mentorias con speakers ecommerce"
"networking exclusivo emprendedores"
"masterclass ecommerce presencial"
"evento ecommerce premium latam"
```

### Paso 7 — Palabras clave negativas (nivel campana)
```
[gratis]
[free]
[curso online]
[empleo]
[trabajo]
[general]
[basica]
[stand]
[expositor]
```

> Negamos [general] y [basica] para que esta campana NO capture busquedas de boletas baratas. Esas van a la campana Boletas General.

### Paso 8 — Crear anuncio responsive (RSA)
| Campo | Valor |
|-------|-------|
| URL final | `https://feriaeffix.com/experiencia-black/` |
| Ruta visible 1 | `black` |
| Ruta visible 2 | `2026` |

**Titulos (copiar en orden):**
1. `Feria Effix 2026 — Black Ticket` → **FIJAR en posicion 1**
2. `9 Mentorias Exclusivas Incluidas` → **FIJAR en posicion 2**
3. `USD $997 o 4 Cuotas de $250`
4. `Comidas Incluidas 3 Dias`
5. `Backstage con Speakers Premium`
6. `Solo Queda el 43% Disponible`
7. `Zona Black Exclusiva`
8. `Networking de Alto Nivel`
9. `Desayunos con Ponentes`
10. `Fire Walk + Apertura Exclusiva`
11. `Fotograffix Profesional`
12. `Zona de Contenido Premium`
13. `La Experiencia Mas Completa`
14. `Cupos Limitados — Compra Hoy`
15. `16-18 Oct · Medellin, Colombia`

**Descripciones:**
1. `Black Ticket Feria Effix: 9 mentorias exclusivas, comidas 3 dias, backstage con speakers, zona premium. La experiencia mas completa del ecommerce en LATAM.`
2. `USD $997 o 4 cuotas de $250. Networking de alto nivel, fire walk, apertura exclusiva, desayunos con ponentes. Solo queda el 43% disponible.`
3. `Conecta con los mayores expertos de ecommerce de America Latina. 3 dias de mentorias, networking exclusivo y experiencia gastronomica premium.`
4. `49,000+ asistentes en 2025, pero solo unos pocos viven la experiencia Black. 9 mentorias 1-a-1, zona VIP exclusiva. Asegura tu entrada.`

### Paso 9 — Extensiones
- Compartir extensiones de nivel de cuenta (mismos sitelinks)
- Call: +57 320 655 6725

**Sitelinks adicionales especificos (nivel campana, opcionales):**

| Texto del enlace | URL | Descripcion linea 1 | Descripcion linea 2 |
|------------------|-----|---------------------|---------------------|
| Que Incluye Black | https://feriaeffix.com/experiencia-black/ | 9 mentorias, comidas 3 dias | Backstage + zona exclusiva |
| Paga en 4 Cuotas | https://feriaeffix.com/experiencia-black/ | USD $250 por cuota | Sin intereses |
| Ver Speakers 2026 | https://feriaeffix.com/ponentes | Los expertos de LATAM | Mentorias 1-a-1 incluidas |
| WhatsApp Directo | https://wa.me/573206556725 | Resuelve tus dudas | Atencion inmediata |

### Paso 10 — Publicar campana

### Checklist semanal F2
- [ ] Clics > 50/semana (volumen minimo)
- [ ] CTR > 3% (benchmark premium)
- [ ] CPC < COP $12,000
- [ ] Conversiones: cualquier conversion es valiosa (producto de $997)
- [ ] Landing page load time < 3 seg
- [ ] Search Terms Report limpio — sin terminos de boletas generales
- [ ] Budget COP $107,000/dia ejecutandose

---

## Campana 5: [Search] Stands Expositores | B2B | F2

### Estado: UPGRADE menor desde Fase 1

### Paso 1 — Subir presupuesto
1. Ir a la campana → Configuracion → Presupuesto diario
2. Cambiar de COP $35,000 → **COP $43,000/dia (~$10 USD)**

### Paso 2 — Verificar bidding
| Campo | Valor |
|-------|-------|
| Estrategia de puja | Maximizar clics — **SIN CAMBIO** |
| Limite CPC | COP $8,000 — **SIN CAMBIO** |

> La conversion de stands es offline (WhatsApp/email/llamada). No tiene sentido usar Smart Bidding porque Google no puede optimizar hacia conversiones que no trackea.

### Paso 3 — Actualizar keywords
1. Revisar Search Terms Report de F1
2. Agregar terminos ganadores como keywords
3. Agregar terminos irrelevantes como negativos
4. Keywords vigentes (minimo):
```
Concordancia exacta:
[stand feria effix]
[exponer feria effix]
[stand feria ecommerce medellin]
[stand feria medellin]
[effix expositor]

Concordancia de frase:
"alquilar stand feria ecommerce"
"participar como expositor feria"
"stand feria emprendimiento medellin"
"exhibir productos feria ecommerce"
"ferias para vender productos colombia"
"donde exhibir mi marca colombia"
```

### Paso 4 — Verificar audiencias
- Customer Match → **Observacion** (sin cambio)

### Paso 5 — Verificar anuncio y extensiones
- Anuncio RSA: Sin cambios (mismo de F1)
- URL final: `https://feriaeffix.com/quiero-tener-un-stand/`
- Extensiones: Sitelink "Contactar Equipo Comercial" + Call +57 320 655 6725

### Paso 6 — Negativos vigentes
```
[boletas]
[entradas]
[asistir]
[visitante]
[gratis]
```

### Checklist semanal F2
- [ ] Leads via WhatsApp/email rastreados manualmente
- [ ] CPC < COP $8,000
- [ ] Search Terms Report limpio
- [ ] Budget COP $43,000/dia ejecutandose

---

## Campana 6: [YouTube] Remarketing | F2

### Estado: ⭐ CAMBIO MAYOR — De Awareness a Remarketing

> En Fase 1 YouTube era para calentar publicos nuevos (awareness).
> En Fase 2 cambia a remarketing: re-impactar personas que ya interactuaron.

### Paso 1 — Verificar pre-requisito
1. Gestor de audiencias → Buscar lista "YouTube Video Viewers"
2. ¿Tiene > 10,000 usuarios?
   - **SI:** Proceder con remarketing
   - **NO:** Mantener campana de Awareness F1 y agregar remarketing como audiencia adicional

### Paso 2 — Pausar campana F1 (o modificar)

**Opcion A — Crear nueva campana:**
1. Pausar `[YouTube] Awareness Effix 2026 | F1`
2. Crear nueva campana de remarketing (seguir pasos abajo)

**Opcion B — Modificar campana existente:**
1. Cambiar nombre a `[YouTube] Remarketing | F2`
2. Cambiar audiencias (Paso 5)
3. Cambiar bidding (Paso 3)

> Recomendado: **Opcion A** (crear nueva) para mantener historico limpio.

### Paso 3 — Crear campana (si Opcion A)
1. Google Ads → **+ Nueva campana**
2. "Crear una campana sin la orientacion de un objetivo"
3. Tipo de campana: **Video**
4. Subtipo: Campana de video para generar conversiones
5. Nombre: `[YouTube] Remarketing | F2`

### Paso 4 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia de puja | Maximizar conversiones |
| CPA objetivo (opcional) | Dejar vacio inicialmente |
| Presupuesto diario | COP $64,000 (~$15 USD) |

> Si no hay suficientes conversiones para Smart Bidding en video, usar CPV maximo COP $300 como alternativa.

### Paso 5 — Configuracion
| Campo | Valor |
|-------|-------|
| Redes | YouTube Videos + YouTube Search |
| Ubicaciones | Colombia (+20%), Ecuador, Rep. Dominicana, Mexico, Peru |
| Idiomas | Espanol |
| Limite frecuencia | 5 impresiones por usuario por semana |

### Paso 6 — Audiencias (**TARGETING, no Observacion**)

> ⚠️ IMPORTANTE: En esta campana las audiencias van en modo **Segmentacion** (Targeting), NO Observacion. Queremos SOLO mostrar a quienes ya interactuaron.

| Segmento | Modo |
|----------|------|
| YouTube Video Viewers (de Fase 1) | **Segmentacion** (targeting) |
| All Website Visitors (remarketing) | **Segmentacion** (targeting) |
| Exclusion: Converters | **Exclusion** |

**Customer Match como EXCLUSION:**
1. Agregar lista Customer Match
2. Seleccionar modo: **Exclusion**
3. Razon: No gastar en personas que ya asistieron a ediciones anteriores
4. Excepcion: Si hay una lista de "Customer Match - Upsell" (asistentes anteriores General que podrian comprar VIP/Black), esa SI se deja

> La logica: remarketing de YouTube va dirigido a gente que YA vio videos o visito el sitio en Fase 1, pero que AUN no compro.

### Paso 7 — Crear anuncio de video
| Campo | Valor |
|-------|-------|
| Video de YouTube | (mismo video de F1, o version con CTA mas fuerte) |
| Formato | In-Stream saltable (skippable) |
| URL final | `https://feriaeffix.com` |
| CTA | `Compra tu Entrada Ahora` |
| Headline | `Feria Effix 2026 — Ultimas Boletas` |

> El CTA cambia de "Reserva tu Lugar" (F1 awareness) a "Compra tu Entrada Ahora" (F2 conversion). Mensaje mas directo para quienes ya conocen el evento.

### Paso 8 — Publicar

### Checklist semanal F2
- [ ] View rate > 25%
- [ ] Conversiones de video remarketing > 0/semana
- [ ] Audiencia de remarketing creciendo
- [ ] Exclusion de converters activa (no re-impactar compradores)
- [ ] Budget COP $64,000/dia ejecutandose
- [ ] Frecuencia no excesiva (< 5/semana por usuario)

---

## Campana 7: [Display] Remarketing Secuencial | F2

### Estado: ⭐ UPGRADE MAYOR — De basico a secuencial

> En Fase 1 el Display era remarketing basico (1 solo mensaje para todos los visitors).
> En Fase 2 evoluciona a remarketing secuencial: 3 mensajes diferentes segun dias desde la visita.

### Paso 1 — Crear listas de audiencia por recencia

Primero necesitas crear 3 listas en el Gestor de audiencias:

**Lista 1: Visitors Recientes (<7 dias)**
1. Google Ads → Herramientas → Gestor de audiencias → + → Lista basada en sitio web
2. Nombre: `Visitors - Ultimos 7 dias`
3. Miembros de la lista: Visitantes de una pagina web
4. Pagina visitada: feriaeffix.com (cualquier pagina)
5. Duracion de la membresia: **7 dias**
6. Guardar

**Lista 2: Visitors Medios (7-30 dias)**
1. + → Lista basada en sitio web
2. Nombre: `Visitors - 8 a 30 dias`
3. Pagina visitada: feriaeffix.com (cualquier pagina)
4. Duracion de la membresia: **30 dias**
5. Guardar
6. Luego EXCLUIR la lista de 7 dias en la configuracion del grupo de anuncios

**Lista 3: Visitors Antiguos (30+ dias)**
1. + → Lista basada en sitio web
2. Nombre: `Visitors - 31 a 90 dias`
3. Pagina visitada: feriaeffix.com (cualquier pagina)
4. Duracion de la membresia: **90 dias**
5. Guardar
6. Luego EXCLUIR la lista de 30 dias en la configuracion del grupo de anuncios

### Paso 2 — Pausar campana F1
1. Pausar `[Display] Remarketing Basico | Visitors | F1`

### Paso 3 — Crear nueva campana
1. Google Ads → **+ Nueva campana**
2. "Crear una campana sin la orientacion de un objetivo"
3. Tipo de campana: **Display**
4. Nombre: `[Display] Remarketing Secuencial | F2`

### Paso 4 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia de puja | Maximizar clics |
| Presupuesto diario | COP $85,000 (~$20 USD) |

### Paso 5 — Configuracion
| Campo | Valor |
|-------|-------|
| Ubicaciones | Colombia, Ecuador, Rep. Dominicana, El Salvador, Peru, Mexico |
| Idiomas | Espanol |
| Limite frecuencia | **7 impresiones por usuario por dia** |
| Exclusion de contenido | Excluir contenido sensible, juegos de azar, contenido adulto |

### Paso 6 — Crear 3 grupos de anuncios

> Cada grupo tiene su propia audiencia y mensaje. Esto es lo que hace que sea "secuencial".

---

#### Grupo de anuncios A: "Recientes - 7 dias"

**Audiencias (TARGETING):**
| Segmento | Modo |
|----------|------|
| Visitors - Ultimos 7 dias | **Segmentacion** |
| YouTube Video Viewers | **Segmentacion** |
| Customer Match | **Segmentacion** (audiencia combinada) |
| Exclusion: Converters | **Exclusion** |

> Se usa audiencia combinada: cualquier persona que este en AL MENOS UNA de las 3 listas (visitors recientes O video viewers O customer match) vera los banners.

**Anuncio Display Responsive — Mensaje 1:**
| Campo | Valor |
|-------|-------|
| Imagenes | Logo Feria Effix + 2-3 fotos del evento |
| | Formatos: 1200x628 (landscape), 300x300 (cuadrado), 1200x1200 |
| Titulo largo | `Ya Conoces Effix — Asegura Tu Entrada Antes de Que Se Agoten` |
| Titulo corto 1 | `Ya Conoces Effix` |
| Titulo corto 2 | `Asegura Tu Entrada` |
| Titulo corto 3 | `Feria Effix 2026` |
| Descripcion 1 | `Ya visitaste Feria Effix. No dejes pasar la oportunidad. Boletas desde $201,300 COP. 16-18 Oct, Medellin.` |
| Descripcion 2 | `49,000+ asistentes en 2025. General, VIP o Black — elige tu experiencia. Compra ahora.` |
| Nombre empresa | `Feria Effix` |
| URL final | `https://feriaeffix.com` |
| CTA | `Compra ahora` |

---

#### Grupo de anuncios B: "Medios - 8 a 30 dias"

**Audiencias (TARGETING):**
| Segmento | Modo |
|----------|------|
| Visitors - 8 a 30 dias | **Segmentacion** |
| Exclusion: Visitors - Ultimos 7 dias | **Exclusion** |
| Exclusion: Converters | **Exclusion** |

**Anuncio Display Responsive — Mensaje 2:**
| Campo | Valor |
|-------|-------|
| Imagenes | Mismas imagenes + version con countdown/urgencia |
| Titulo largo | `Faltan X Dias Para Feria Effix 2026 — No Te Quedes Fuera` |
| Titulo corto 1 | `No Te Quedes Fuera` |
| Titulo corto 2 | `Cupos Limitados` |
| Titulo corto 3 | `Feria Effix 2026` |
| Descripcion 1 | `Feria Effix 2026 se acerca. 380+ stands, 180+ charlas, speakers internacionales. Boletas desde $201,300. No esperes mas.` |
| Descripcion 2 | `16-18 Oct en Plaza Mayor Medellin. La feria de ecommerce mas grande de LATAM. Compra tu entrada hoy.` |
| Nombre empresa | `Feria Effix` |
| URL final | `https://feriaeffix.com` |
| CTA | `Mas informacion` |

> Nota: "Faltan X Dias" debe actualizarse manualmente cada 2-4 semanas, o usar un Countdown Customizer de Google Ads si esta disponible.

---

#### Grupo de anuncios C: "Antiguos - 31 a 90 dias"

**Audiencias (TARGETING):**
| Segmento | Modo |
|----------|------|
| Visitors - 31 a 90 dias | **Segmentacion** |
| Exclusion: Visitors - 8 a 30 dias | **Exclusion** |
| Exclusion: Converters | **Exclusion** |

**Anuncio Display Responsive — Mensaje 3:**
| Campo | Valor |
|-------|-------|
| Imagenes | Mismas imagenes + version de urgencia maxima |
| Titulo largo | `Effix 2026 Se Acerca — Ultimas Boletas Disponibles` |
| Titulo corto 1 | `Ultimas Boletas` |
| Titulo corto 2 | `Effix 2026 Se Acerca` |
| Titulo corto 3 | `No Esperes Mas` |
| Descripcion 1 | `Visitaste Feria Effix hace tiempo. El evento esta cada vez mas cerca. Ultimas boletas desde $201,300. 16-18 Oct, Medellin.` |
| Descripcion 2 | `49,000+ asistentes en 2025. Este ano sera aun mas grande. Asegura tu lugar antes de que se agoten.` |
| Nombre empresa | `Feria Effix` |
| URL final | `https://feriaeffix.com` |
| CTA | `Compra ahora` |

---

### Paso 7 — Publicar campana

### Checklist semanal F2
- [ ] Frecuencia < 7 impresiones/dia por usuario
- [ ] CTR > 0.5% (benchmark Display)
- [ ] Converters excluidos correctamente (no re-impactar compradores)
- [ ] Cada grupo de anuncios recibiendo impresiones
- [ ] Mensajes secuenciales diferenciandose (revisar en vista previa)
- [ ] Budget COP $85,000/dia ejecutandose

---

## Resumen de lanzamiento

### Orden recomendado (hacer en 2-3 sesiones)

| Dia | Accion | Tipo |
|-----|--------|------|
| **Dia 1 (1 Mayo)** | 1. Crear listas de audiencia por recencia (3 listas) | Preparacion |
| | 2. Verificar pre-requisitos (conversiones, audiencias, URL Black) | Verificacion |
| | 3. Upgrade Categoria → cambiar bidding + subir budget + RLSA | Upgrade |
| | 4. Upgrade Marca Effix → subir budget | Upgrade |
| **Dia 2 (2 Mayo)** | 5. Upgrade Boletas General → cambiar bidding + subir budget + RLSA | Upgrade |
| | 6. Upgrade Stands → subir budget | Upgrade |
| | 7. Crear campana Experiencia Black (campana 4) — NUEVA | Crear |
| **Dia 3 (3-5 Mayo)** | 8. Crear campana YouTube Remarketing (campana 6) — NUEVA | Crear |
| | 9. Pausar YouTube Awareness F1 | Pausar |
| | 10. Crear campana Display Remarketing Secuencial (campana 7) — NUEVA | Crear |
| | 11. Pausar Display Remarketing Basico F1 | Pausar |

### Budget total verificacion

| Campana | COP/dia | USD/dia | % |
|---------|---------|---------|---|
| [Search] Categoria | $95,000 | $22 | 16% |
| [Search] Marca Effix | $77,000 | $18 | 13% |
| [Search] Boletas General | $128,000 | $30 | 21% |
| [Search] Experiencia Black | $107,000 | $25 | 18% |
| [Search] Stands | $43,000 | $10 | 7% |
| [YouTube] Remarketing | $64,000 | $15 | 11% |
| [Display] Remarketing | $85,000 | $20 | 14% |
| **TOTAL** | **COP $599,000** | **$140** | **100%** |

$140/dia x 92 dias (Mayo-Julio) = **$12,880 ≈ $13,000 presupuesto Fase 2** ✓

### Distribucion por tipo de campana

```
Search:  $105/dia (75%)  ← Motor principal de conversiones
YouTube:  $15/dia (11%)  ← Remarketing de video viewers
Display:  $20/dia (14%)  ← Remarketing secuencial
```

---

## Metricas clave de Fase 2

| Metrica | Objetivo F2 | Referencia F1 |
|---------|-------------|---------------|
| Conversiones totales | 100+ (acumulado) | 30+ (minimo para F2) |
| CPA General | < COP $45,000 | N/A (Maximizar clics) |
| CPA Black | Cualquier conversion | N/A (nueva campana) |
| CTR Search | > 8% | 16.4% (F1 inicio) |
| ROAS | > 3x | N/A |
| Remarketing list | > 10,000 users | > 3,000 users |
| YouTube viewers | > 50,000 | > 10,000 |

---

## Transicion a Fase 3 (Agosto)

Cuando se cumplan ESTOS criterios, pasar a Fase 3:

- [ ] **100+ conversiones totales** registradas en Google Ads
- [ ] **CPA establecido y estable** — menos de 20% variacion semana a semana
- [ ] **Remarketing lists > 10,000 usuarios** en All Website Visitors
- [ ] **YouTube viewers > 50,000** en lista de video viewers
- [ ] **Ready para PMax** — suficiente data de conversion y creativos
- [ ] **Customer Match activo y matched** — tasa de coincidencia > 25%

En Fase 3 se escala presupuesto a ~$240/dia y se activan:
- **PMax (Performance Max)** — campana automatizada con todos los canales
- **Customer Match como targeting** (no solo observacion)
- **Urgencia maxima** — countdowns, "ultimas boletas", scarcity
- **Push final** — 50% del presupuesto total en 10 semanas (Ago-Oct)
- **Remarketing agresivo** — frecuencia aumentada, mensajes de urgencia

---

## Referencia rapida — IDs y accesos

| Recurso | ID/URL |
|---------|--------|
| Cuenta Google Ads | 356-853-8992 |
| ID de conversion | AW-17981312035 |
| Etiqueta conversion | RTbrCMHZpoYcEKOYlP5C |
| GTM Container | GTM-TLRMK246 |
| GA4 Measurement | G-CRXZ50VX7D |
| Landing Black | feriaeffix.com/experiencia-black/ |
| Landing General | latiquetera.com/site/effix |
| Landing Stands | feriaeffix.com/quiero-tener-un-stand/ |
| Landing Principal | feriaeffix.com |
| WhatsApp | +57 320 655 6725 |
| Customer Match CSV | assets/customer-match-boletas.csv |
