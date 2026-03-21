---
tags:
  - google-ads
  - feria-effix
  - guia
  - paso-a-paso
created: "2026-03-19"
updated: "2026-03-19"
para: Equipo Effix (principiantes en Google Ads)
interfaz: Google Ads 2026 (flujo con IA)
---

# Guía Paso a Paso — Montaje de Campañas en Google Ads

> Esta guía sigue el flujo actual de Google Ads (2026) que tiene estos pasos:
> **Búsqueda → Ofertas → Configuración → IA Max → Generación de palabras clave y recursos → Palabras clave y anuncios → Presupuesto → Revisar**

---

## ANTES DE EMPEZAR

### Subir Customer Match (hacer PRIMERO — tarda 24-48h)

Ya lo hiciste. La lista "Boletería Effix 2021-2025" está procesándose. Después de 48h revisa si pasó de `< 100` matcheados. La campaña funciona sin esto — es solo una mejora.

### Desactivar ad blocker

Google Ads no funciona con ad blocker activo. Si ves el mensaje "Turn off ad blockers":
1. Ve a las extensiones de tu navegador
2. Desactiva uBlock Origin, AdBlock Plus, o cualquier bloqueador
3. Recarga la página de Google Ads

---

## PASO 1: Búsqueda

Este paso define el tipo de campaña.

**1.1** Al crear nueva campaña, selecciona **"Búsqueda"** (Search).

> Si te pregunta por un objetivo primero, selecciona **"Crear una campaña sin la orientación de un objetivo"** para tener control total. Si no aparece esa opción, selecciona "Ventas" o "Tráfico del sitio web" y luego "Búsqueda".

---

## PASO 2: Ofertas (Bidding)

**2.1** Te preguntará en qué te quieres enfocar.

**2.2** Selecciona → **"Clics"** (o "Maximizar clics").

**2.3** Si aparece la opción "Establecer un límite de puja máximo de CPC" → **déjalo vacío** (sin límite).

> **¿Por qué clics y no conversiones?** Porque la cuenta tiene 0 conversiones registradas. Google necesita mínimo 30 para que "Maximizar conversiones" funcione bien. Cuando lleguemos a 30+, lo cambiaremos.

---

## PASO 3: Configuración de la campaña

Aquí se configura todo lo técnico: redes, geografía, idioma.

### 3.1 — Nombre de la campaña

Arriba de la página, donde dice el nombre de la campaña, cámbialo a:
```
[Search] Categoría Ecommerce | F1
```

### 3.2 — Redes

Busca la sección de "Redes" y configura así:
- ✅ Red de Búsqueda de Google → **ACTIVADA**
- ✅ Partners de búsqueda de Google → **ACTIVADA**
- ❌ Red de Display de Google → **DESACTIVADA** (desmarca esta casilla)

> **¿Por qué desactivar Display?** Porque Display muestra banners en sitios web aleatorios. Nosotros queremos aparecer solo cuando alguien BUSCA algo relacionado con ferias/ecommerce.

### 3.3 — Ubicaciones (Geo-targeting)

Agrega estos 10 países uno por uno:
```
Colombia
Ecuador
República Dominicana
El Salvador
Perú
México
Chile
Costa Rica
Panamá
Guatemala
```

### 3.4 — MUY IMPORTANTE: Opciones de ubicación

Busca **"Opciones de ubicación"** (puede aparecer como texto pequeño o un link expandible).

→ Selecciona: **"Presencia: Personas que se encuentran o suelen estar en tus ubicaciones"**
→ **NO** dejes "Presencia o interés" (que es el default).

> **¿Por qué?** Si dejas "Presencia o interés", Google mostrará ads a personas en España o Argentina que "muestran interés" en Colombia. Eso desperdicia presupuesto.

### 3.5 — Idioma

Selecciona: **Español**

---

## PASO 4: IA Max

Google puede ofrecer funciones de IA para expandir automáticamente tus keywords y crear variaciones de ads.

**4.1** Si ves opciones como:
- "Permitir que la IA de Google genere recursos adicionales"
- "Búsqueda ampliada con IA" / "AI Max for Search"
- "Recursos creados automáticamente"

→ **DESACTIVA todas las opciones de IA por ahora.**

> **¿Por qué?** Queremos control total sobre qué keywords y anuncios se muestran. La IA de Google puede expandir las búsquedas a cosas irrelevantes. Cuando tengamos datos de rendimiento (semana 3-4), podemos experimentar activándola.

Si no puedes desactivarlas o no ves opciones, simplemente avanza al siguiente paso.

---

## PASO 5: Generación de palabras clave y recursos

Aquí es donde Google usa IA para sugerir keywords y copies basándose en tu sitio.

### 5.1 — URL final

```
https://feriaeffix.com/
```
(Ya lo tienes puesto ✅)

### 5.2 — Descripción del producto/servicio

Ya escribiste una descripción. Está bien, pero asegúrate de que incluya estos puntos clave:

```
Feria Effix 2026 es la feria de ecommerce y emprendimiento más grande de Latinoamérica. 49,000+ asistentes en 2025, 380+ marcas expositoras, 180+ charlas y 8 auditorios. Se celebra del 16 al 18 de octubre de 2026 en Plaza Mayor, Medellín, Colombia. Ofrecemos boletas General desde $201,300 COP, entradas VIP y Black Ticket con experiencias premium. También stands de exhibición para empresas. Temas: ecommerce, dropshipping, marketing digital, inteligencia artificial, negocios digitales. Speakers internacionales, networking con +20,000 negocios y proveedores verificados.
```

**5.3** Google generará sugerencias de keywords y anuncios. **NO te preocupes** por lo que genere — en el siguiente paso podrás borrar todo y poner los nuestros.

Haz clic en **"Siguiente"** para avanzar.

---

## PASO 6: Palabras clave y anuncios

Este es el paso más importante. Aquí agregas las keywords y creas el anuncio.

### 6.1 — Palabras clave

Google puede haber pre-llenado keywords basadas en tu URL y descripción. **Borra todas las sugerencias de Google** y reemplázalas con las nuestras.

Copia y pega este bloque completo (las comillas `" "` son importantes — indican concordancia de frase):

```
"feria ecommerce medellin"
"feria ecommerce colombia"
"feria ecommerce 2026"
"feria comercio electronico"
"evento ecommerce latinoamerica"
"expo ecommerce"
"conferencias marketing digital"
"conferencias ecommerce"
"congreso marketing digital colombia"
"summit emprendimiento 2026"
"eventos emprendimiento 2026"
"feria emprendimiento medellin"
"eventos negocios digitales"
"feria dropshipping"
"cursos ecommerce presencial"
"aprender dropshipping colombia"
"eventos marketing digital colombia"
"conferencias inteligencia artificial colombia"
```

> **Las comillas son obligatorias.** Sin comillas, Google usa "concordancia amplia" y puede mostrar tu ad para búsquedas irrelevantes como "feria del libro" o "comercio internacional".

### 6.2 — Crear el anuncio RSA

Busca la sección del anuncio (Responsive Search Ad). Debería mostrarte campos para URL, títulos y descripciones.

**URL final:**
```
https://feriaeffix.com
```

**Ruta visible** (los 2 campos opcionales debajo de la URL):
- Campo 1: `2026`
- Campo 2: `boletas`

(El usuario verá: `feriaeffix.com/2026/boletas` — aunque la URL real sea feriaeffix.com)

**Títulos — Agrega los 15 (uno en cada campo):**

| # | Título | Fijar (Pin) |
|---|---|---|
| 1 | Feria Effix 2026 · Medellín | **Fijar en posición 1** |
| 2 | La Mayor Feria Ecommerce LATAM | **Fijar en posición 2** |
| 3 | Boletas Desde $201,300 | — |
| 4 | 49,000+ Emprendedores en 2025 | — |
| 5 | 380+ Stands · 180+ Charlas | — |
| 6 | Ecommerce · Dropshipping · AI | — |
| 7 | Speakers Internacionales | — |
| 8 | 16-18 Octubre 2026 | — |
| 9 | Compra Ya — Cupos Limitados | — |
| 10 | Networking con +20,000 Negocios | — |
| 11 | General · VIP · Black Disponibles | — |
| 12 | Plaza Mayor Medellín · 3 Días | — |
| 13 | Inscríbete Ahora en Effix | — |
| 14 | 140,000+ Asistentes en 5 Ediciones | — |
| 15 | Entradas VIP y Premium | — |

> **¿Cómo fijar?** Al lado de cada título hay un icono de chincheta/pin (📌). Haz clic → selecciona "Posición 1" para el título 1 y "Posición 2" para el título 2. Esto garantiza que siempre aparezcan primero.

**Descripciones — Agrega las 4:**

| # | Descripción |
|---|---|
| 1 | La feria de ecommerce más grande de Latinoamérica. 3 días de conferencias, networking y exposición. Boletas desde $201,300. |
| 2 | Aprende dropshipping, marketing digital e IA con los mejores expertos de la región. 49,000+ asistentes en 2025. |
| 3 | Conecta con +20,000 negocios y proveedores verificados. General, VIP y Black Ticket disponibles. Compra tu boleta ahora. |
| 4 | 380+ stands, 180+ charlas, 8 auditorios. Experiencias VIP con masterminds exclusivos. 16-18 Oct, Plaza Mayor Medellín. |

**6.3** Verás una vista previa del anuncio y un indicador de "Eficacia del anuncio". Intenta que diga al menos **"Buena"** o **"Excelente"**. Si dice "Promedio" o menos, verifica que tengas los 15 títulos y 4 descripciones.

---

## PASO 7: Presupuesto

**7.1** Presupuesto diario:
```
80000
```
(COP $80,000 por día, que equivale a ~$19 USD/día)

> Google puede gastar hasta el doble en un día fuerte, pero se compensa. Al final del mes no superará 30.4 × $80,000 = ~$2,432,000 COP/mes.

---

## PASO 8: Revisar

**8.1** Google te mostrará un resumen de toda la configuración. Verifica:

| Campo | Debe decir |
|---|---|
| Tipo de campaña | Búsqueda |
| Estrategia de puja | Maximizar clics |
| Presupuesto | $80,000/día |
| Ubicaciones | 10 países (Colombia + 9 más) |
| Idioma | Español |
| Keywords | 18 palabras clave en concordancia de frase |
| Anuncio | 15 títulos + 4 descripciones |
| Red de Display | Desactivada |

**8.2** Si todo está correcto, haz clic en **"Publicar campaña"**.

> Si quieres crearla pausada primero (para agregar extensiones y negativos antes de activar), busca la opción de publicar como "Pausada". Si no la ves, puedes publicarla activa y pausarla inmediatamente después.

---

## DESPUÉS DE CREAR: Agregar extensiones y negativos

Una vez creada la campaña, ve a la campaña y configura esto:

### A — Palabras clave negativas

**A.1** Dentro de la campaña → menú izquierdo → **"Palabras clave"** → **"Palabras clave negativas"**.

**A.2** Haz clic en **"+"** → **"Agregar palabras clave negativas"** → selecciona la campaña.

**A.3** Pega estas palabras (los corchetes `[ ]` indican concordancia exacta negativa):

```
[gratis]
[free]
[curso online]
[empleo]
[trabajo]
[vacante]
[pasantía]
[becas]
[diplomado]
[maestría]
[certificación]
[tutorial]
[pdf]
[libro]
[descargar]
```

### B — Sitelinks (enlaces adicionales debajo del anuncio)

**B.1** Menú izquierdo → **"Anuncios y recursos"** → **"Recursos"** (o "Assets").

**B.2** Haz clic en **"+"** → **"Sitelink"**.

**B.3** Agrega estos 4:

| Texto del enlace | URL final | Línea 1 | Línea 2 |
|---|---|---|---|
| Speakers 2026 | `https://feriaeffix.com/ponentes/` | Los mejores expertos de LATAM | Marketing, ecommerce, AI y más |
| Comprar Entradas | `https://feriaeffix.com/entradas/` | Boletas desde $201,300 COP | General, VIP y Black disponibles |
| Entrada VIP | `https://feriaeffix.com/entrada-vip/` | Acceso premium a Feria Effix | Experiencias exclusivas VIP |
| Black Ticket | `https://feriaeffix.com/boleta-black/` | 9 mentorías exclusivas | La experiencia más completa |
| Quiero un Stand | `https://feriaeffix.com/quiero-tener-un-stand/` | Exhibe ante 49,000+ asistentes | Solicita cotización hoy |
| Patrocinadores | `https://feriaeffix.com/patrocinadores/` | Marcas que respaldan Effix | Únete como patrocinador |
| Sé Embajador | `https://feriaeffix.com/embajadores/` | Programa de embajadores Effix | Gana comisiones por referidos |

### C — Callouts (textos destacados)

**C.1** Clic en **"+"** → **"Texto destacado"** (o "Callout").

**C.2** Agrega estos 4 (uno por campo):
```
+49,000 asistentes en 2025
380+ marcas expositoras
3 días completos
Speakers internacionales
```

### D — Structured Snippets (fragmentos estructurados)

**D.1** Clic en **"+"** → **"Fragmento estructurado"**.

**D.2** Agrega:

| Encabezado (header) | Valores |
|---|---|
| Tipos (o "Types") | General, VIP, Black Ticket |
| Cursos (o "Courses") | Ecommerce, Dropshipping, Marketing Digital, IA, Negocios Digitales |

> Si no encuentras "Tipos" o "Cursos" exacto en la lista, usa el encabezado más parecido de los que Google ofrece.

### E — Extensión de llamada

**E.1** Clic en **"+"** → **"Llamada"** (o "Call").

**E.2** País: Colombia | Número: `+57 320 655 6725`

---

## DESPUÉS DE CREAR: Ajustes de puja por ubicación

Esto se hace DENTRO de la campaña ya creada:

**1.** Ve a la campaña → menú izquierdo → **"Ubicaciones"**.

**2.** Verás la lista de los 10 países. En la columna **"Ajuste de puja"**, haz clic en cada país y configura:

| País | Ajuste |
|---|---|
| **Colombia** | **+20%** |
| Ecuador | 0% (dejar sin ajuste) |
| República Dominicana | 0% |
| El Salvador | 0% |
| Perú | 0% |
| México | 0% |
| Chile | **-15%** |
| Costa Rica | **-15%** |
| Panamá | **-15%** |
| Guatemala | **-15%** |

> Colombia +20% porque es el mercado principal (evento en Medellín). Tier 2 con -15% porque tienen menor probabilidad de asistir.

---

## DESPUÉS DE CREAR: Agregar audiencia Customer Match

> Hacer este paso cuando la lista "Boletería Effix 2021-2025" aparezca como "Lista activa" en el Gestor de audiencias (después de 24-48h).

**1.** Dentro de la campaña → menú izquierdo → **"Audiencias"**.

**2.** Haz clic en **"Editar segmentos de audiencia"**.

**3.** IMPORTANTE — Arriba verás dos opciones:
- **Segmentación** (Targeting): Solo muestra ads a esta audiencia
- **Observación** (Observation): Muestra ads a todos, pero monitorea esta audiencia

→ Selecciona **"Observación"** ✅

**4.** Busca `Boletería Effix 2021-2025` en "Tus segmentos de datos" y selecciónala.

**5.** Haz clic en **"Guardar"**.

---

## ACTIVAR LA CAMPAÑA

**1.** Si la creaste pausada: ve a la lista de campañas → busca `[Search] Categoría Ecommerce | F1` → cambia el estado a **Activada** (toggle verde).

**2.** Verifica que aparezca "Apta" o "Publicándose".

---

## VERIFICACIÓN

### Checklist día 1
- [ ] Campaña aparece como "Activada" / "Apta"
- [ ] Anuncio RSA: "Aprobado" o "En revisión" (puede tardar horas)
- [ ] Extensiones: "Aprobadas"
- [ ] Keywords con estado "Apta" (algunas dirán "Volumen bajo" — es normal)
- [ ] Presupuesto muestra $80,000 COP

### Checklist día 2-3
- [ ] Hay impresiones y clics
- [ ] CPC en rango ~$2,000-4,000 COP (~$0.50-1.00 USD)
- [ ] No hay keywords rechazadas

### REGLA DE ORO: NO TOCAR NADA POR 7 DÍAS

Después de activar, **no hagas cambios hasta 2026-03-26**. Google necesita tiempo para aprender. Cambios constantes reinician el aprendizaje.

---

## SI ALGO SALE MAL

| Problema | Solución |
|---|---|
| "Anuncio rechazado" | Revisa el motivo. Usualmente es por claims sin comprobar. Edita y reenvía. |
| "Keyword de volumen bajo" | Normal — Google la activa cuando haya búsquedas. No la elimines. |
| "Limitada por presupuesto" | Hay más búsquedas de las que el presupuesto cubre. Buena señal. |
| "0 impresiones después de 24h" | Verifica: campaña activada, keywords aptas, geo correcta. |
| "CPC muy alto (>$1.50 USD)" | Pausa las keywords más caras y deja las eficientes. |
| "No veo las opciones que dice la guía" | La interfaz de Google Ads cambia frecuentemente. Busca opciones con nombres similares. |

---

## GLOSARIO

| Término | Qué significa |
|---|---|
| **CTR** | % de personas que ven tu ad y hacen clic |
| **CPC** | Cuánto pagas por cada clic |
| **Impresiones** | Cuántas veces se mostró tu anuncio |
| **Conversión** | Acción valiosa (compra, clic en WhatsApp) |
| **RSA** | Responsive Search Ad — Google combina títulos/descripciones automáticamente |
| **Concordancia de frase** | Ad aparece cuando la búsqueda CONTIENE tu keyword |
| **Customer Match** | Lista de clientes que subes para mejorar targeting |
| **Observación** | Google monitorea la audiencia pero no restringe a quién muestra ads |
| **Sitelinks** | Enlaces extra debajo de tu anuncio |
| **Callouts** | Textos cortos destacados en el anuncio |
| **Pin/Fijar** | Forzar un título a aparecer siempre en esa posición |

---

*Documento actualizado: 2026-03-19*
*Interfaz: Google Ads 2026 (flujo con IA)*
*Cuenta: 356-853-8992*
