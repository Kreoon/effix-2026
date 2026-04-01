---
tags:
  - google-ads
  - feria-effix
  - fase-1
  - guia-montaje
created: "2026-03-24"
status: activo
presupuesto_fase: USD $5,000
periodo: "2026-03 al 2026-04"
---

# Fase 1: Guia de Montaje Completa — 6 Campanas Google Ads

> Cuenta: 356-853-8992 | Moneda: COP | Zona horaria: GMT-5 Colombia
> Presupuesto Fase 1: $5,000 USD (Mar $2,500 + Abr $2,500)
> Budget diario total: ~$83 USD (~COP $353,000)

## Logica de funnel (adaptada de Meta)

```
FASE 1 (ahora):  Calentar → Acumular data → Remarketing lists
FASE 2 (May-Jul): Retargetear → Smart Bidding → RLSA
FASE 3 (Ago-Oct): Customer Match a full → PMax → Urgencia
```

**Customer Match (60,259 registros):** En Fase 1 SOLO como Observacion (senal). El poder real se activa en Fase 2-3.

---

## Pre-requisitos (hacer ANTES de crear campanas)

- [ ] **Subir CSV Customer Match** → Google Ads → Herramientas → Gestor de audiencias → Listas de clientes → + → Subir archivo
  - Archivo: `assets/customer-match-boletas.csv`
  - Formato: Email (SHA256), Telefono, Nombre, Apellido, Pais
- [ ] **Verificar conversion LaTiquetera** → Tag Assistant → Navegar a latiquetera.com/site/effix → Simular compra → Verificar que AW-17981312035 dispara en pagina de confirmacion
- [ ] **Confirmar remarketing activo** → Google Ads → Herramientas → Gestor de audiencias → Verificar lista "All Visitors" tiene usuarios

---

## Campana 1: [Search] Categoria Ecommerce | F1

### Estado: YA ACTIVA desde 2026-03-19

**No crear — solo monitorear y optimizar.**

Archivo de configuracion: `campanas/search-categoria.md`

### Checklist semanal
- [ ] Revisar Search Terms Report → agregar negativos si hay terminos irrelevantes
- [ ] Verificar Customer Match esta en modo **Observacion** (no Targeting)
- [ ] CPC promedio < COP $5,000 ($1.20 USD)
- [ ] CTR > 5%
- [ ] Budget COP $80,000/dia ejecutandose

---

## Campana 2: [Search] Marca Effix | Always-on

> **ESTA CAMPANA YA EXISTE** — solo hay que reconfigurarla. NO crear una nueva.
> Campana actual: "[Search] Marca Effix" | Estado: Detenida | Budget: COP $88,000/dia
> Problema: apuntaba solo a landing Black ($997), bidding incorrecto, Partners activos.

### Paso 1 — Cambiar estrategia de puja
1. Ir a la campana **[Search] Marca Effix** → Configuracion
2. Click en **Ofertas** → Cambiar estrategia de oferta
3. Seleccionar: **Cuota de impresiones en parte superior de busqueda**
4. Porcentaje objetivo: **90%**
5. Limite CPC maximo: **COP $4,000**
6. Guardar

| Campo | Actual (mal) | Correcto |
|-------|-------------|----------|
| Estrategia | Maximizar conversiones | Cuota impresiones 90% top |
| Limite CPC | Sin limite | COP $4,000 |

### Paso 2 — Quitar Socios de Busqueda
1. Configuracion → **Redes**
2. ❌ Desmarcar **"Incluir socios de busqueda de Google"**
3. ❌ Verificar que **Red de Display** este desactivada
4. Guardar

### Paso 3 — Ajustar presupuesto
1. Configuracion → **Presupuesto**
2. Cambiar de COP $88,000 a **COP $68,000/dia**
3. Guardar

### Paso 4 — Cambiar URL del anuncio (CRITICO)
1. Ir a **Anuncios** dentro de la campana
2. Click en el anuncio RSA existente → **Editar**
3. Cambiar **URL final** de la landing Black a: `https://feriaeffix.com`
4. Cambiar **Ruta visible**:
   - Ruta 1: `2026`
   - Ruta 2: `boletas`

### Paso 5 — Actualizar titulos del RSA
Reemplazar los titulos actuales (que mencionan solo Black) con estos 15:

1. `Feria Effix 2026 — Sitio Oficial` → **FIJAR en posicion 1**
2. `16-18 Oct · Plaza Mayor Medellin` → **FIJAR en posicion 2**
3. `Boletas Desde $201,300 COP`
4. `Black Ticket USD $997 — 9 Mentorias`
5. `49,000+ Asistentes en 2025`
6. `General · VIP · Black — Elige Tu Nivel`
7. `380+ Stands · 180+ Charlas · 3 Dias`
8. `Paga en Cuotas — Cupos Limitados`
9. `La Feria Ecommerce #1 del Mundo`
10. `Speakers Internacionales 2026`
11. `Networking con +20,000 Negocios`
12. `Compra Tu Entrada Ahora`
13. `Ecommerce · Dropshipping · AI`
14. `Plaza Mayor Medellin — 3 Dias`
15. `Experiencia VIP y Black Disponible`

### Paso 6 — Actualizar descripciones
Reemplazar las descripciones actuales con estas 4:

1. `Feria Effix 2026: la feria de ecommerce mas grande del mundo. 3 dias de conferencias, networking y exposicion. General, VIP o Black — elige tu experiencia.`
2. `49,000+ asistentes en 2025. 380+ stands, 180+ charlas, speakers internacionales. Boletas desde $201,300. Cupos limitados.`
3. `16-18 de octubre en Plaza Mayor, Medellin. Ecommerce, dropshipping, marketing digital e IA. Inscribete ahora.`
4. `Experiencia Black: 9 mentorias exclusivas, comidas 3 dias, backstage con speakers. USD $997 o 4 cuotas de $250.`

Click **Guardar** en el anuncio.

### Paso 7 — Verificar palabras clave
1. Ir a **Palabras clave** dentro de la campana
2. Verificar que esten TODAS estas (agregar las que falten, todas **concordancia exacta**):
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
3. Si alguna keyword tiene URL individual apuntando a landing Black, cambiarla a `https://feriaeffix.com`

### Paso 8 — Verificar/actualizar extensiones (Sitelinks)
1. Ir a **Recursos** → Sitelinks
2. Verificar o crear estos 4:

| Texto del enlace | URL | Descripcion linea 1 | Descripcion linea 2 |
|------------------|-----|---------------------|---------------------|
| Boletas General $201,300 | https://feriaeffix.com | Pasaporte 3 dias completos | Acceso a todo el evento |
| Entrada Black $997 USD | https://feriaeffix.com/estrategia-google-ads/ | 9 mentorias exclusivas | Networking VIP + backstage |
| Quiero un Stand | https://feriaeffix.com/quiero-tener-un-stand/ | Exhibe tu marca | Ante +49,000 asistentes |
| Ver Speakers 2026 | https://feriaeffix.com/ponentes | Speakers internacionales | Los mejores de LATAM |

3. Verificar **Textos destacados (Callouts):**
   - +49,000 asistentes en 2025
   - 380+ marcas expositoras
   - Paga en cuotas
   - 3 dias completos

4. Agregar **Fragmento estructurado** si no existe:
   - Tipo: Tipos → General, VIP, Black Ticket

5. Verificar **Extension de llamada:** +57 320 655 6725

### Paso 9 — Agregar Customer Match en Observacion
1. Ir a **Audiencias** → Editar segmentos de audiencia
2. Buscar la lista Customer Match (60,259 registros)
3. Seleccionar modo: **Observacion** (NO "Segmentacion")
4. Guardar

### Paso 10 — Verificar ubicaciones y bid adjustments
1. Ir a **Ubicaciones** dentro de la campana
2. Confirmar estos paises con ajustes:

| Pais | Bid adjustment |
|------|---------------|
| Colombia | +20% |
| Ecuador | 0% |
| Republica Dominicana | 0% |
| El Salvador | 0% |
| Peru | 0% |
| Mexico | -15% |
| Chile | -15% |
| Costa Rica | -15% |
| Panama | -15% |
| Guatemala | -15% |

3. Click en **Opciones de ubicacion** → verificar **"Presencia"** (NO "presencia o interes")

### Paso 11 — Reactivar la campana
1. Cambiar estado de **Detenida** a **Habilitada**
2. La campana empezara a correr inmediatamente

### Checklist de verificacion
- [ ] Bidding cambiado a Target Impression Share 90%
- [ ] Partners de busqueda desactivados
- [ ] Budget ajustado a COP $68,000
- [ ] URL del anuncio cambiada a feriaeffix.com
- [ ] 15 titulos RSA actualizados (portafolio completo)
- [ ] 4 descripciones actualizadas
- [ ] 4 sitelinks verificados/creados
- [ ] Callouts, snippets, extension de llamada OK
- [ ] Customer Match en Observacion
- [ ] 12 keywords en concordancia exacta
- [ ] Ubicaciones con bid adjustments correctos
- [ ] Opciones de ubicacion en "Presencia"
- [ ] Campana REACTIVADA

---

## Campana 3: [Search] Boletas General | Masivo | F1

### Paso 1 — Crear campana
1. + Nueva campana → Sin orientacion → Busqueda
2. Nombre: `[Search] Boletas General | Masivo | F1`

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia de puja | Maximizar clics |
| Limite CPC maximo | COP $5,000 (~$1.20 USD) |
| Presupuesto diario | COP $85,000 (~$20 USD) |

### Paso 3 — Configuracion
| Campo | Valor |
|-------|-------|
| Redes | ❌ Display off. ❌ Partners off |
| Ubicaciones | Colombia (+20%), Ecuador, Rep. Dominicana, El Salvador, Peru |
| Opciones ubicacion | "Presencia" solamente |
| Idiomas | Espanol |

### Paso 4 — Audiencias
- Customer Match → **Observacion**

### Paso 5 — Grupo de anuncios
- Nombre: `General - Intent Compra`

### Paso 6 — Palabras clave
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

**Palabras clave negativas (nivel campana):**
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

### Paso 7 — Anuncio RSA
| Campo | Valor |
|-------|-------|
| URL final | `https://latiquetera.com/site/effix` |
| Ruta visible 1 | `effix` |
| Ruta visible 2 | `boletas` |

**Titulos:**
1. `Boletas Feria Effix 2026` → **FIJAR posicion 1**
2. `Desde $201,300 — Compra Ahora` → **FIJAR posicion 2**
3. `16-18 Oct · Plaza Mayor Medellin`
4. `Pasaporte 3 Dias Completos`
5. `380+ Stands · 180+ Charlas`
6. `49,000+ Asistentes en 2025`
7. `Ecommerce · Dropshipping · AI`
8. `Speakers Internacionales`
9. `El Evento #1 de LATAM`
10. `Compra Segura en LaTiquetera`
11. `No Te Quedes Sin Tu Entrada`
12. `Networking con +20,000 Negocios`
13. `8 Auditorios · 3 Pabellones`
14. `Acceso a Toda la Expo`
15. `Ultimas Boletas Disponibles`

**Descripciones:**
1. `Compra tu Pasaporte 3 Dias para Feria Effix 2026. Acceso a todas las conferencias, expo y networking. Desde $201,300. La feria de ecommerce mas grande del mundo.`
2. `16-18 de octubre en Plaza Mayor, Medellin. 380+ stands, 180+ charlas, speakers internacionales. Compra segura por LaTiquetera.`
3. `49,000+ asistentes en 2025. Ecommerce, dropshipping, marketing digital e inteligencia artificial. 3 dias intensivos de aprendizaje y networking.`

### Paso 8 — Extensiones
- Compartir extensiones de cuenta (mismas de Marca)
- Call: +57 320 655 6725

### Paso 9 — Publicar

---

## Campana 4: [Search] Stands Expositores | B2B | F1

### Paso 1 — Crear campana
1. + Nueva campana → Sin orientacion → Busqueda
2. Nombre: `[Search] Stands Expositores | B2B | F1`

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia | Maximizar clics |
| Limite CPC | COP $8,000 (~$1.90 USD) |
| Presupuesto diario | COP $35,000 (~$8 USD) |

### Paso 3 — Configuracion
| Campo | Valor |
|-------|-------|
| Redes | ❌ Display off. ❌ Partners off |
| Ubicaciones | Colombia (+20%), Ecuador, Mexico, Peru |
| Opciones ubicacion | "Presencia" |
| Idiomas | Espanol |

### Paso 4 — Audiencias
- Customer Match → **Observacion**

### Paso 5 — Grupo: `Stands - B2B Intent`

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
2. `+49,000 Visitantes · Tu Stand Ahi` → **FIJAR posicion 2**
3. `380+ Marcas Ya Confirmaron`
4. `Plaza Mayor Medellin · 3 Dias`
5. `Stands Desde $500 USD`
6. `Conecta con +20,000 Negocios`
7. `La Feria Ecommerce #1 LATAM`
8. `Solicita Tu Cotizacion Hoy`
9. `16-18 Octubre 2026`
10. `Ultimos Espacios Disponibles`

**Descripciones:**
1. `Exhibe tu marca ante +49,000 asistentes en la feria de ecommerce mas grande de LATAM. Plaza Mayor Medellin, 16-18 Oct 2026. Solicita tu cotizacion.`
2. `380+ marcas ya confirmaron su stand. Espacios premium con alto trafico. Contacta a nuestro equipo y asegura tu lugar en Feria Effix 2026.`

### Paso 8 — Extensiones
- Sitelink: "Contactar Equipo Comercial" → /quiero-tener-un-stand/
- Call: +57 320 655 6725
- Callout: Stands Premium, Alto Trafico, Networking B2B

### Paso 9 — Publicar

---

## Campana 5: [YouTube] Awareness Effix 2026 | F1

> Equivalente a ThruPlay de Meta. Calienta publicos, acumula video viewers.

### Pre-requisito
⚠️ Necesitas al menos 1 video subido al canal de YouTube de Feria Effix.
- Ideal: Video highlights de Effix 2025 (15-30 segundos)
- Minimo: Cualquier video del evento con logo y fecha 2026
- Si no hay video: **POSPONER esta campana** y priorizar las 4 de Search

### Paso 1 — Crear campana
1. + Nueva campana → Sin orientacion → **Video**
2. Subtipo: Campana de alcance de video eficiente
3. Nombre: `[YouTube] Awareness Effix 2026 | F1`

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia | CPV maximo (Maximizar vistas) |
| CPV maximo | COP $200 (~$0.05 USD) |
| Presupuesto diario | COP $50,000 (~$12 USD) |

### Paso 3 — Configuracion
| Campo | Valor |
|-------|-------|
| Redes | YouTube Videos + YouTube Search |
| Ubicaciones | Colombia (+20%), Ecuador, Rep. Dominicana, Mexico, Peru |
| Idiomas | Espanol |
| Limite frecuencia | 3 impresiones por usuario por semana |

### Paso 4 — Targeting (audiencias)
| Segmento | Tipo |
|----------|------|
| E-commerce y compras online | Interes / Afinidad |
| Emprendimiento y negocios | Interes / Afinidad |
| Marketing digital | Interes / Afinidad |
| Tecnologia empresarial | Interes / Afinidad |
| Customer Match | **Observacion** (senal) |
| Edad | 25-54 |
| Genero | Todos |

### Paso 5 — Crear anuncio
| Campo | Valor |
|-------|-------|
| Video de YouTube | (URL del video de highlights) |
| Formato | In-Stream saltable (skippable) |
| URL final | `https://feriaeffix.com` |
| CTA | `Reserva tu Lugar` |
| Headline | `Feria Effix 2026 — 16-18 Oct Medellin` |

### Paso 6 — Publicar

### Lo que acumula esta campana
- **Lista "Video Viewers"** → usable para remarketing en Fase 2
- Data de que perfiles ven el video completo
- Awareness de marca a bajo costo ($0.03-0.05/vista)

---

## Campana 6: [Display] Remarketing Basico | Visitors | F1

### Paso 1 — Crear campana
1. + Nueva campana → Sin orientacion → **Display**
2. Nombre: `[Display] Remarketing Basico | Visitors | F1`

### Paso 2 — Puja y presupuesto
| Campo | Valor |
|-------|-------|
| Estrategia | Maximizar clics |
| Presupuesto diario | COP $35,000 (~$8 USD) |

### Paso 3 — Configuracion
| Campo | Valor |
|-------|-------|
| Ubicaciones | Colombia, Ecuador, Rep. Dominicana, El Salvador, Peru, Mexico |
| Idiomas | Espanol |
| Limite frecuencia | 5 impresiones por usuario por dia |
| Exclusion de contenido | Excluir contenido sensible, juegos de azar, contenido adulto |

### Paso 4 — Audiencias (**TARGETING, no Observacion**)
| Segmento | Modo |
|----------|------|
| All Website Visitors (lista remarketing GTM) | **Segmentacion** (targeting) |
| Exclusion: Converters (si existe la lista) | Exclusion |

⚠️ Esta campana SI restringe. Solo muestra banners a quienes ya visitaron feriaeffix.com.
⚠️ NO agregar Customer Match aqui todavia — eso es para Fase 2-3.

### Paso 5 — Crear anuncio Display Responsive
| Campo | Valor |
|-------|-------|
| Imagenes | Subir logo Feria Effix + 2-3 fotos del evento |
| | Formatos: 1200x628 (landscape), 300x300 (cuadrado), 1200x1200 (cuadrado) |
| Titulo largo | `Feria Effix 2026 — La Feria de Ecommerce Mas Grande de LATAM` |
| Titulo corto 1 | `Feria Effix 2026` |
| Titulo corto 2 | `Boletas Desde $201,300` |
| Titulo corto 3 | `16-18 Oct Medellin` |
| Descripcion 1 | `49,000+ asistentes en 2025. 380+ stands. 180+ charlas. Compra tu entrada ahora.` |
| Descripcion 2 | `Ecommerce, dropshipping, marketing digital e IA. 3 dias en Plaza Mayor Medellin.` |
| Nombre empresa | `Feria Effix` |
| URL final | `https://feriaeffix.com` |
| CTA | `Mas informacion` o `Registrate` |

### Paso 6 — Publicar

---

## Resumen de lanzamiento

### Orden recomendado (hacer en 1-2 sesiones)

| Dia | Accion |
|-----|--------|
| **Dia 1** | 1. Subir Customer Match CSV |
| | 2. Reconfigurar campana Marca Effix existente (campana 2) |
| | 3. Crear campana Boletas General (campana 3) |
| **Dia 2** | 4. Crear campana Stands (campana 4) |
| | 5. Crear campana Display Remarketing (campana 6) |
| **Cuando haya video** | 6. Crear campana YouTube Awareness (campana 5) |

### Budget total verificacion

| Campana | COP/dia | USD/dia | % |
|---------|---------|---------|---|
| [Search] Categoria (ya activa) | $80,000 | $19 | 23% |
| [Search] Marca Effix | $68,000 | $16 | 19% |
| [Search] Boletas General | $85,000 | $20 | 24% |
| [Search] Stands | $35,000 | $8 | 10% |
| [YouTube] Awareness | $50,000 | $12 | 14% |
| [Display] Remarketing | $35,000 | $8 | 10% |
| **TOTAL** | **COP $353,000** | **$83** | 100% |

$83/dia x 30 dias = **$2,490/mes** → $4,980 en Mar-Abr ≈ **$5,000 presupuesto Fase 1** ✓

---

## Transicion a Fase 2 (Mayo)

Cuando se cumplan ESTOS criterios, pasar a Fase 2:
- [ ] 30+ conversiones registradas en Google Ads
- [ ] Remarketing list > 3,000 usuarios
- [ ] YouTube Video Viewers > 10,000
- [ ] Data suficiente para activar Smart Bidding

En Fase 2 se escala presupuesto a ~$140/dia y se activan:
- RLSA (bid adjustments para visitors)
- Smart Bidding (Target CPA o Max conversiones)
- Customer Match en Display (audiencia combinada)
- YouTube Remarketing (re-impactar video viewers)
- Campana [Search] Experiencia Black
