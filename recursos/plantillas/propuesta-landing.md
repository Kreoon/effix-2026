---
tipo: plantilla
version: "1.0"
marca: ""
campana: ""
url_propuesta: ""
tipo_landing: ""
estado: "borrador"
---

# Propuesta Landing — {marca} | {campana}

URL propuesta:
Tipo:
Estado:

---

## 1. Objetivo

Accion principal (CTA):
Tasa conversion objetivo: ___%

Fuentes de trafico:
- [ ] Google Ads Search
- [ ] Google Ads Display
- [ ] Meta Ads
- [ ] TikTok Ads
- [ ] Email
- [ ] Organico

---

## 2. Publico

| Campo | Valor |
|---|---|
| Segmento | |
| Awareness | frio / tibio / caliente |
| Objecion principal | |
| Motivacion principal | |
| Dispositivo | movil / desktop / ambos |

---

## 3. Estructura

### Hero (above the fold)
- H1:
- Subtitulo:
- CTA:
- Imagen/video:
- Social proof inmediato:

### Beneficios
- Beneficio 1:
- Beneficio 2:
- Beneficio 3:

### Social proof
- Tipo: [ ] testimonios | [ ] logos | [ ] cifras
- Cantidad:

### Oferta
- Que incluye:
- Precio visible: [ ] si | [ ] no | Precio:

### FAQ
- Pregunta 1:
- Pregunta 2:
- Pregunta 3:

### CTA final
- Texto boton:
- Urgencia/escasez:

---

## 4. Elementos de conversion

- [ ] CTA visible sin scroll
- [ ] Boton con color contrastante
- [ ] Urgencia o escasez
- [ ] Prueba social
- [ ] Garantia / riesgo reversal
- [ ] Formulario corto (max 3-4 campos)
- [ ] Carga < 3 segundos
- [ ] Mobile-first
- [ ] Sin menu navegacion
- [ ] Exit intent popup

---

## 5. Tracking requerido

| Tag | Tipo | Evento | Trigger |
|---|---|---|---|
| GA4 PageView | GA4 | page_view | All Pages |
| GA4 CTA Click | GA4 | cta_click | Click boton principal |
| GA4 Conversion | GA4 | purchase/generate_lead | Pagina confirmacion |
| Google Ads Conv | Google Ads | conversion | Pagina confirmacion |
| Meta ViewContent | Pixel | ViewContent | Page load |
| Meta Purchase | Pixel | Purchase | Pagina confirmacion |

GTM Container:
UTM: `?utm_source={plataforma}&utm_medium={medio}&utm_campaign={campana}&utm_content={variacion}`

---

## 6. Aprobaciones

| Etapa | Responsable | Estado |
|---|---|---|
| Propuesta | | [ ] pendiente / [ ] aprobado |
| Copy | | [ ] pendiente / [ ] aprobado |
| Diseno | | [ ] pendiente / [ ] aprobado |
| Desarrollo | | [ ] pendiente / [ ] aprobado |
| QA + Tracking | | [ ] pendiente / [ ] aprobado |
| Lanzamiento | | [ ] pendiente / [ ] aprobado |
