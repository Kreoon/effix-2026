---
tags:
  - google-ads
  - feria-effix
  - acciones
  - equipo
created: "2026-03-19"
status: activo
---

# Acciones Bloqueantes — Equipo Effix + Proveedores

> Este documento lista las acciones que **deben completarse por personas externas** al equipo de Google Ads para que las campañas funcionen correctamente. Enviarlo a cada responsable con su sección correspondiente.

---

## 🔴 CRÍTICAS (bloquean conversiones)

### 1. Instalar código de conversión en LaTiquetera

| Campo | Detalle |
|---|---|
| **Responsable** | Equipo técnico LaTiquetera |
| **Urgencia** | 🔴 CRÍTICA — Sin esto NO se miden ventas de boletas General/VIP |
| **Acción** | Instalar snippet de conversión Google Ads en página de confirmación de pago |
| **Código** | Conversion ID: `AW-17981312035` |
| **Valor** | Idealmente dinámico (valor real de la transacción). Default: 201,300 COP |
| **Transaction ID** | Incluir Order ID para deduplicar conversiones |
| **Dónde** | Página que ve el usuario DESPUÉS de pagar exitosamente |
| **Verificación** | Usar Google Tag Assistant para confirmar que dispara correctamente |
| **Estado** | ✅ IMPLEMENTADO (2026-03-20) — GTM-MKGKFGL con valor dinámico, transaction_id, vinculación de conversiones y server-side via Stape |

**Snippet enviado:**
```html
<!-- Google Ads Conversion Tracking — LaTiquetera -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17981312035"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-17981312035');
  gtag('event', 'conversion', {
    'send_to': 'AW-17981312035/XXXXX',
    'value': 201300,          // Idealmente: valor dinámico real
    'currency': 'COP',
    'transaction_id': ''      // Idealmente: Order ID único
  });
</script>
```

> **¿Por qué es crítico?** Sin este código, Google Ads no puede saber cuántas boletas se venden. Esto impide optimizar las campañas y eventualmente usar Smart Bidding (Target CPA/ROAS), que requiere 30+ conversiones registradas.

---

### 2. Actualizar números del evento en LaTiquetera

| Campo | Detalle |
|---|---|
| **Responsable** | LaTiquetera / Equipo contenido Effix |
| **Urgencia** | 🟠 ALTA — Inconsistencia entre ads y página de venta |
| **Acción** | Actualizar los números del evento en la página de LaTiquetera |
| **Problema** | Los ads dicen "49,000+ asistentes, 380+ marcas, 180+ charlas" pero LaTiquetera puede mostrar números viejos |
| **Números correctos** | 49,000+ asistentes (2025), 380+ marcas expositoras, 180+ charlas, 8 auditorios |
| **Impacto** | Message mismatch entre ad y landing = mayor rebote, menor confianza |

---

## 🟠 ALTA (bloquean optimización)

### 3. Crear URL /experiencia-black/ (o redirect)

| Campo | Detalle |
|---|---|
| **Responsable** | Equipo web Effix |
| **Urgencia** | 🟠 ALTA — URL actual revela estrategia de ads |
| **Acción** | Crear la URL `feriaeffix.com/experiencia-black/` con el contenido actual de `/estrategia-google-ads/` |
| **Alternativa** | Si no se puede crear nueva URL, configurar redirect 301 de `/experiencia-black/` a la página actual |
| **Por qué** | La URL `/estrategia-google-ads/` le dice al usuario que llegó por un anuncio pagado, lo cual reduce confianza y conversiones |

### 4. Cambiar title tag de landing Black

| Campo | Detalle |
|---|---|
| **Responsable** | Equipo web Effix |
| **Urgencia** | 🟠 ALTA — Afecta Quality Score de Google Ads |
| **Acción** | Cambiar el `<title>` de la landing Black |
| **Actual** | (verificar — puede decir "Estrategia Google Ads" o similar) |
| **Nuevo** | `Entrada Black | Feria Effix 2026 — La Experiencia Premium` |
| **Por qué** | Google usa el title tag para calcular Quality Score. Un title relevante mejora la posición del anuncio y reduce CPC |

---

## 🟡 MEDIA (mejoran rendimiento)

### 5. Agregar video de highlights a landing Black

| Campo | Detalle |
|---|---|
| **Responsable** | Equipo de contenido Effix |
| **Urgencia** | 🟡 MEDIA |
| **Acción** | Producir y subir video de 60-90s con highlights de ediciones anteriores |
| **Impacto** | Landing pages con video convierten 30-49% más |
| **Ubicación** | Hero section (hay placeholder de VSL) |

### 6. Simplificar botones de pago en landing Black

| Campo | Detalle |
|---|---|
| **Responsable** | Equipo web Effix |
| **Urgencia** | 🟡 MEDIA |
| **Acción** | Reducir de 4 botones de pago a 2: "Pagar Completo" y "Pagar en 4 Cuotas" |
| **Por qué** | 4 opciones de pago genera parálisis de decisión (paradoja de la elección) |

### 7. Agregar garantía/risk reversal visible

| Campo | Detalle |
|---|---|
| **Responsable** | Equipo de contenido Effix |
| **Urgencia** | 🟡 MEDIA |
| **Acción** | Agregar sección de garantía visible cerca del precio ($997 requiere confianza) |
| **Ejemplo** | "Garantía de satisfacción: si no es lo que esperabas, te devolvemos tu dinero" |

---

## Seguimiento

| # | Acción | Responsable | Estado | Fecha límite sugerida |
|---|---|---|---|---|
| 1 | Código conversión LaTiquetera | LaTiquetera | ⏳ Pendiente | 2026-03-22 |
| 2 | Actualizar números LaTiquetera | LaTiquetera | ⏳ Pendiente | 2026-03-22 |
| 3 | Crear /experiencia-black/ | Equipo web | ⏳ Pendiente | 2026-03-24 |
| 4 | Cambiar title tag Black | Equipo web | ⏳ Pendiente | 2026-03-24 |
| 5 | Video highlights | Contenido | ⏳ Pendiente | 2026-04-07 |
| 6 | Simplificar CTAs pago | Equipo web | ⏳ Pendiente | 2026-03-28 |
| 7 | Garantía/risk reversal | Contenido | ⏳ Pendiente | 2026-03-28 |

---

*Última actualización: 2026-03-19*
*Próxima revisión: 2026-03-22 (verificar items críticos)*
