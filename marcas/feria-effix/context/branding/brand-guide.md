---
titulo: Feria Effix 2026 — Guía de Marca
marca: Feria Effix
edicion: 6ta versión (2026)
fecha_extraccion: 2026-04-16
fuentes:
  - https://feriaeffix.com/ (scraping WebFetch)
  - https://feriaeffix.com/boleta-black/ (scraping WebFetch)
  - https://feriaeffix.com/entradas/ (scraping WebFetch)
  - https://feriaeffix.com/entrada-vip/ (scraping WebFetch)
  - Apify instagram-profile-scraper → @feriaeffix
  - Apify instagram-scraper → 60 posts recientes
proximos_pasos: Usar este guide con NanoBanana (generación imágenes) y para landing pages futuras
---

# Feria Effix 2026 — Guía de Marca

**Data consolidada del scraping real del sitio + Instagram @feriaeffix (380,909 followers).** Este documento es la fuente de verdad para:
- Crear landing pages adicionales manteniendo consistencia
- Generar imágenes con NanoBanana con prompts alineados al branding real
- Redactar copy que suene como la marca (tono de voz validado por 60 posts)
- Subir anuncios con look & feel reconocible

---

## 1. Identidad esencial

| Campo | Valor |
|-------|-------|
| **Marca** | Feria Effix |
| **Tagline principal** | La feria de comercio electrónico **MÁS GRANDE DEL MUNDO** |
| **Tagline IG** | LA FERIA MÁS GRANDE DE COMERCIO ELECTRÓNICO 🔥 |
| **Grupo matriz** | Grupo Effi (`grupoeffi.com`) |
| **Evento** | 16, 17 y 18 de octubre 2026 · 9am–8pm |
| **Lugar** | Plaza Mayor, Medellín (Cra. 57 # 41-81) |
| **Edición** | 6ta versión (desde 2021) |
| **Historial** | 140,000+ asistentes acumulados |
| **Contacto** | gerencia@feriaeffix.com · +57 320 655 6725 |

---

## 2. Paleta de colores

> ⚠️ **Nota de extracción:** Los hex exactos no están expuestos en el HTML (Cloudflare bloquea fetch directo y Elementor renderiza CSS compilado). Los valores abajo son **aproximaciones fieles** a las descripciones visuales del sitio y deben confirmarse con inspección DOM en navegador antes de usarse como "oficiales". Se mantienen separados por **tier** porque cada tipo de entrada tiene un universo visual propio.

### Brand principal (homepage, IG, stand corporativo)

| Uso | Color sugerido | Notas |
|-----|----------------|-------|
| Fondo primario | `#0A0A0A` (casi negro) | Da profundidad y premium |
| Texto principal | `#FFFFFF` | Alto contraste |
| Acento azul brand | `#0066CC` | Iconos, links, details |
| Plateado | `#C0C0C0` | Borders y flechas decorativas |

### Tier Black (landing `/boleta-black/`, $997 USD)

| Uso | Color sugerido |
|-----|----------------|
| Fondo | `#000000` |
| Acento premium | `#D4AF37` (dorado clásico) |
| Dorado oscuro | `#8B6914` |
| Dorado claro | `#F5D76E` |
| Texto | `#FFFFFF` |

### Tier VIP (landing `/entrada-vip/`, $1,050,000 COP)

| Uso | Color sugerido |
|-----|----------------|
| Dorado principal | `#D4AF37` |
| Dorado champagne | `#F7E7CE` |
| Texto oscuro | `#1A1A1A` |

### Tier General / Pasaporte 3 días

| Uso | Color sugerido |
|-----|----------------|
| Azul brand | `#0066CC` |
| Azul oscuro | `#003D7A` |
| Blanco | `#FFFFFF` |

### Acentos funcionales

| Uso | Color |
|-----|-------|
| CTA "fuego" / urgencia | `#FF6B35` |
| WhatsApp | `#25D366` |

---

## 3. Tipografía

### Patrones observados en copy real

- **Headings:** Bold/Heavy, con fuerte tendencia a **UPPERCASE** en H1 y H2
- **CTAs:** Siempre en UPPERCASE, bold
- **Body:** Regular, legible, line-height cómodo
- **Énfasis:** MAYÚSCULAS inline dentro de oraciones normales (recurso retórico constante)

### Recomendación para replicar look & feel

| Rol | Fuente recomendada | Peso |
|-----|--------------------|------|
| Display impactante (H1 hero) | **Bebas Neue** o **Anton** | 400 (ya son condensed bold) |
| Headings | **Montserrat** / **Poppins** | 700–800 |
| Body | **Inter** o **Poppins** | 400–500 |
| CTA buttons | **Montserrat** | 700 uppercase, letter-spacing 0.5px |

Todas disponibles en Google Fonts → cero fricción para NanoBanana prompts y páginas nuevas.

---

## 4. Logos y assets descargados

Ubicación física: `marcas/feria-effix/assets/branding/`

```
logos/
  logo-2026-principal.webp     ← oficial evento 2026
  logo-2026-alt.webp           ← variante
  logo-2025.webp               ← versión anterior
  logo-grupo-effi.webp         ← holding
  titulo-mas-grande.webp       ← "MÁS GRANDE DEL MUNDO"
  titulo-que-es.webp           ← "¿Qué es la Feria?"
  titulo-black.webp            ← "Entrada Black"
  titulo-vip-dorado.webp       ← "VIP Dorado"
  titulo-pasaporte.webp        ← "Pasaporte 3 Días"
  titulo-se-parte.webp         ← "Sé parte"
  titulo-contacto.webp
iconos/                        ← 12 iconos de secciones + 9 personas target
decoradores/                   ← fondos y elementos decorativos
versiones-previas/             ← info cards de ediciones 2021-2025
instagram/
  profile-pic-feriaeffix.jpg   ← profile pic HD
```

---

## 5. Tono de voz (validado con 60 posts de IG)

### Personalidad

- **Motivacional e inspiracional** → frases tipo "La verdadera transformación comienza cuando te atreves a dar el primer paso"
- **Disruptivo y confrontacional** → reta al lector ("¿tú también estás dispuesto a seguir de pie?")
- **Conversacional** → habla de tú, nunca de usted
- **Autoridad colectiva** → cita textualmente a speakers como si fueran voces oficiales

### Español colombiano neutro

- Usa "tarima" (no "escenario"), "ponencia" (no "charla")
- Modismos suaves: "vengo desde Ecuador cada año"
- Nunca vulgar, siempre aspiracional

### Recursos retóricos recurrentes

1. **Citas textuales de speakers como autoridad**
   > "Hay dos caminos: intentarlo… o quedarte lamentándote." — Rigoberto Urán

2. **Contrastes binarios**
   > "Las ideas inspiran, la tecnología potencia, pero el equipo construye."

3. **Micro-datos con cifras**
   > "160+ conferencias, 300+ stands, 140.000+ asistentes en 5 ediciones"

4. **Preguntas retóricas al final**
   > "¿a quién quieres ver en 2026? 👇"

5. **MAYÚSCULAS para picos emocionales dentro de oraciones**
   > "Te atreves a DAR EL PRIMER PASO"

### Emojis del ecosistema (por categoría)

- **Fuego / energía:** 🔥 💥
- **Aspiración:** 🚀 ✨
- **Intelecto / estrategia:** 🧠 💡 ⚙️ 📊
- **Tech / IA:** 🤖 🌐
- **Networking / gente:** 🤝 🙌 🎤
- **Ecommerce / producto:** 📦 💼 🛒
- **Ubicación / tiempo:** 📍 🗓️
- **País:** 🇨🇴

### Frases marca (usables en copy propio)

- "La verdadera transformación comienza cuando te atreves a dar el primer paso"
- "Aprendizaje real, estrategias aplicables y mentes que ya están facturando en grande"
- "Somos la verdadera revolución digital"
- "Nos vemos en la Feria EFFIX 2026 🚀✨"
- "Link in bio 🔗"

---

## 6. Tickets (datos confirmados)

### Black · $997 USD

- **Valor real:** $1,323 USD · descuento vigente
- **Cuotas:** 4 × $250 USD (Wompi o ePayco)
- **Urgencia actual:** "SOLO QUEDA EL 43% DISPONIBLE"
- **Landing:** https://feriaeffix.com/boleta-black/
- **Incluye:** escarapela Black · 9 comidas buffet (desayuno/almuerzo/cena × 3 días) · 9 mentorías durante comidas · zona networking Black · descuentos hotel · foto/video pro · línea soporte Black · inauguración privada · clausura exclusiva · entrada prioritaria 3 días

### VIP · $1,050,000 COP + IVA

- **Color identidad:** Dorado
- **Landing:** https://feriaeffix.com/entrada-vip/
- **Incluye:** inauguración 15 oct · mastermind privado · zona VIP hidratación · auditorio reservado · cena VIP · entrada preferencial · zona creación contenido · clausura

### Pasaporte 3 Días (General)

- **Precio fase AFICIONADO:** ~201,300 COP (según proyecto-master)
- **Canal:** latiquetera.com
- **Incluye:** acceso +300 marcas · zonas académicas · conferencias generales

### Stands

- **Canal:** WhatsApp +57 320 655 6725 o +57 314 768 0442
- **URL:** https://feriaeffix.com/quiero-tener-un-stand/

---

## 7. Speakers

### Confirmado 2026

- **@fauadz** — Co-fundador @myhuevos.co y @mycocos.cl. Fundador del Club de Emprendedores Imparables. Sistema "Loops de Marcas Rentables". +60 marcas impulsadas.

### Speakers citados de ediciones previas (banco de autoridad)

| Handle | Línea reconocible |
|--------|-------------------|
| @rigobertouran | "Hay dos caminos: intentarlo… o quedarte lamentándote." |
| @jmrestrepoa | "El significado de la palabra MAGIA" (viral 38.5K likes) |
| @aidavictoriam | "20 días después de dar a luz, estaba en la tarima" |
| @soydavid | "La IA no elimina empresas. Las reemplazan otras que sí la usan." |
| @ivanmazomejia (@escueladelariqueza) | — |
| @javireelbe | — |
| @danieltirado | — |
| @julianatabordav | — |
| @santiagovc50 | "Las compras recurrentes no se improvisan, se construyen." |
| @francocoronel.cmo | — |
| @andrespatarroyo04 + @patarroyodiego | @academydaco |
| Vilma Núñez | Mencionada en testimonio de María Fernanda López |

---

## 8. Testimonios (validados en landing Black)

```
"Con la Feria Effix pasé de un negocio de 2 personas a 12 personas.
Las conexiones que hice fueron clave para mi crecimiento."
— Carlos Mendoza, Fundador TechStore CO · Bogotá

"La mentoría durante el meet and greet con Vilma Núñez me dio la estrategia
que necesitaba. Ese solo consejo valió 10 veces lo que pagué."
— María Fernanda López, CEO Bella Cosmetics · Quito

"Vengo desde Ecuador cada año. Las conexiones son invaluables."
— Andrés Villacís, Director Droplatam · Guayaquil
```

---

## 9. Instagram @feriaeffix — métricas reales

| Métrica | Valor |
|---------|-------|
| Followers | **380,909** |
| Following | 89 |
| Posts totales | 1,229 |
| Highlights | 7 |
| Business account | ✅ |
| Verified | ❌ |
| Engagement rate (60 últimos) | 0.22% |
| Avg likes | 813 |
| Avg comments | 37 |

### Mix de contenido (últimos 60)

- Video/Reels: **31** (51.6%)
- Carruseles (Sidecar): **15** (25%)
- Imagen única: **14** (23.3%)

### Top hashtags

`#Ecommerce` `#FeriaEffix2026` `#FeriaEffix2025` `#Networking` `#NegociosDigitales` `#Emprendimiento`

### Enlaces bio

- Primary: https://feriaeffix.com/entradas/
- Linktree: https://linktr.ee/feriaeffix

---

## 10. Patrones de copy que FUNCIONAN (para replicar en páginas nuevas)

### Estructura de post ganador

```
[Hook con cita textual de speaker o pregunta provocativa]

[Cuerpo: paralelismos + contrastes + 1 cifra]

[Lista con emojis (máx 4 líneas)]

[CTA suave: etiqueta, comenta, link in bio]

[Bloque hashtags 3-7 al final]
```

### Hooks más efectivos

- "El significado de la palabra ___ en la Feria Effix 2025…"
- "20 días después de ___, @speaker estaba en la tarima"
- "Esto nos lo dijo en tarima @speaker:"
- "La verdadera transformación comienza cuando…"
- "¿a quién quieres ver en 2026?"

### Longitud óptima: **200–500 caracteres** (mejor engagement por post).

---

## 11. CTAs del ecosistema (texto literal)

**Primarios:**
- ¡Compra tu Entrada!
- ASEGURA TU ENTRADA
- COMPRA TU ENTRADA BLACK
- COMPRA TU ENTRADA VIP
- COMPRA TU PASAPORTE 3 DÍAS
- ¡Compra tu Stand 2026!
- ADQUIERE TU STAND

**Secundarios:**
- Conócelas aquí (directorio)
- Escríbenos!!
- Link in bio
- Revive su ponencia completa en YouTube

---

## 12. Urgencia y scarcity (copy activo)

- **Header principal Black:** "SOLO QUEDA EL 43% DISPONIBLE"
- **Alt:** "57% DE ENTRADAS VENDIDAS"
- "Precio exclusivo por tiempo limitado"
- "Sé de los primeros en vivir la experiencia BLACK"
- "Cada vez que termine una etapa, el valor aumentará"

---

## 13. Garantía

> "Garantizamos ponentes de nivel premium. En 5 ediciones nunca hemos fallado en traer figuras de talla internacional."

---

## 14. Cómo usar este guide

### Para crear una landing nueva

1. Abrir `brand-profile.json` para valores estructurados
2. Copiar paleta del tier correspondiente (Black / VIP / General)
3. Usar logos desde `assets/branding/logos/`
4. Redactar copy con el tono de la sección 5
5. Incluir al menos 1 CTA de la sección 11
6. Agregar al menos 1 elemento de urgencia (sección 12)

### Para generar imágenes con NanoBanana

**Template de prompt:**

```
Create a [formato] for Feria Effix 2026, the biggest ecommerce fair in Latin America.
Style: [Black tier / VIP tier / General tier] visual identity.
Color palette: [ver paleta del tier en sección 2]
Typography: bold sans-serif uppercase for headlines (Bebas Neue / Montserrat 800 style)
Mood: premium, energetic, motivational, slightly disruptive.
Spanish copy: "[frase de la sección 5]"
Include: Feria Effix logo placement (top-left or bottom-right), date "16-18 OCT 2026", 
location "Plaza Mayor, Medellín".
Avoid: cheesy stock photos, generic blue/white corporate, excessive flat design.
Reference: highly polished event posters like Cannes Lions / AWS re:Invent, 
but with Colombian entrepreneurial energy.
```

### Para escribir posts/anuncios

- Máx 500 caracteres si es para engagement
- Incluir entre 5–15 emojis del set oficial (sección 5)
- Cerrar con pregunta retórica o CTA "link in bio"
- Hashtags al final, 3–7 del top list

---

## 15. Archivos auxiliares

- `brand-profile.json` — datos estructurados (para consumo programático)
- `output/01-profile.json` — raw Apify profile
- `output/02-posts.json` — raw Apify 60 posts
- `output/03-summary.json` — resumen analítico
- `scrape-instagram.mjs` — script para re-ejecutar scraping
- `parse-instagram.mjs` — parser del raw
