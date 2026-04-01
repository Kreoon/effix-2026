# Roles y Responsabilidades — Marketing Ops Grupo Effi

---

## Tabla de Roles

| Rol | Qué hace | Archivos que toca | Frecuencia | Entrega esperada |
|-----|----------|-------------------|-----------|-----------------|
| **Estratega** | Crea/versiona estrategias, define presupuestos, aprueba creativos, toma decisiones | `marcas/[x]/estrategia/`, `presupuesto/budget-plan.md`, `flujos/aprobaciones/` | Semanal | Aprobaciones en máx 48h, comparador semanal |
| **Trafficker** | Ejecuta campañas en plataformas, registra gasto real, completa checklists, reporta KPIs | `campanas/`, `presupuesto/spend-log.csv`, `reportes/semanal/`, `flujos/checklist-ejecucion.md` | Diario | Gasto actualizado EOD, checklist completado |
| **Equipo Creativo** | Produce guiones, creativos, VSLs, propuestas de landing, copywriting | `creativos/propuestas-nuevas/`, `creativos/guiones/`, `creativos/propuestas-landing/` | Por solicitud | Propuestas en 48-72h desde brief |
| **Contabilidad** | Consulta reportes financieros, valida gastos, reconcilia con facturas, aplica TRM | `presupuesto/spend-log.csv`, `reportes/financiero/`, `presupuesto/reconciliacion-mensual.md` | Quincenal | Reconciliación mensual antes del cierre |
| **Desarrollo** | Implementa landing pages desde propuestas aprobadas, integra tracking, deploy a producción | `creativos/propuestas-landing/` → `assets/landing-pages/`, validación de tracking | Por solicitud | Landing en producción con tracking validado |
| **Dirección / C-Level** | Revisa comparadores semanales, aprueba presupuestos, toma decisiones estratégicas, escala | `comparador/`, `presupuesto/`, `reportes/`, auditorías | Semanal | Aprobación de cambios presupuestarios |

---

## Detalles por Rol

### 1. Estratega

**Responsabilidades principales:**
- Desarrollar la estrategia anual y por fase para cada marca
- Definir el messaging framework (tono, proposición, copys templates)
- Crear/revisar el plan presupuestario por canal y mes
- Revisar y aprobar creativos, propuestas de landing, cambios en campañas
- Analizar comparadores semanales y recomendar acciones correctivas
- Mantener documentación de decisiones estratégicas

**Archivos que actualiza:**

| Archivo | Frecuencia | Qué hace |
|---------|-----------|----------|
| `estrategia/estrategia-anual-[año].md` | 1x al año (o cuando hay pivote) | Define objetivos, públicos, positioning, fases |
| `estrategia/messaging-framework.md` | Semanal (cuando hay nuevas insights) | Actualiza copys principales, tonalidad, USPs |
| `presupuesto/budget-plan.md` | Semanal (ajustes según performance) | Aprueba reasignaciones, nuevos presupuestos |
| `flujos/aprobaciones/01-pending-*` | Máx 48h desde que se reciba | Revisa y aprueba/rechaza con comentarios |
| `comparador/comparador-semanal-*.md` | Viernes (genera antes del EOW) | Analiza varianzas, recomienda acciones |
| `comparador/red-flags.md` | Semanal | Documenta alertas y acciones urgentes |

**Checklist semanal:**
- Lunes: Revisar comparador anterior, identificar qué cambió
- Miércoles: Revisar propuestas en 01-pending, aprobar/rechazar
- Viernes: Generar nuevo comparador semanal, hacer recomendaciones

**Cuándo la contacta el Trafficker:**
- "La campaña X está underperforming, ¿aumento presupuesto a Y o pause?"
- "Propuesta de landing nueva, ¿me das feedback?"
- "Quiero lanzar nueva campaña, ¿presupuesto disponible?"

---

### 2. Trafficker

**Responsabilidades principales:**
- Ejecutar campañas en Google Ads, Meta Ads, Email y otras plataformas
- Registrar gasto real diariamente
- Monitorear métricas (CTR, CPC, conversiones, ROAS)
- Completar checklist de ejecución diariamente
- Reportar KPIs semanales
- Alertar al Estratega sobre underperformance o oportunidades

**Archivos que actualiza:**

| Archivo | Frecuencia | Qué hace |
|---------|-----------|----------|
| `presupuesto/spend-log.csv` | Diario (EOD) | Registra gasto por canal, campaña, costo |
| `reportes/kpis-diarios.csv` | Diario (EOD) | Registra clics, impresiones, conversiones, CPA |
| `flujos/checklist-ejecucion.md` | Diario (mañana) | Verifica campañas activas, pausa underperformers, documenta cambios |
| `campanas/[tipo]/[campaña]/status.md` | Semanal | Resume performance de la campaña |
| `reportes/semanal/reporte-[fecha].md` | Viernes (EOD) | Resumen ejecutivo de la semana |

**Checklist diario (mañana):**
- Revisar status de todas las campañas activas en Google Ads
- Revisar status en Meta Ads (budget spend, CPC, engagement)
- Registrar gasto en `spend-log.csv`
- Registrar métricas en `kpis-diarios.csv`
- Si CTR < benchmark -20% o CPA > target +15%, alertar al Estratega
- Si presupuesto se termina antes de lo esperado, notificar

**Qué NO debe hacer sin aprobación del Estratega:**
- Pausar una campaña (salvo que esté destruyendo dinero)
- Aumentar/reducir presupuesto > 20%
- Cambiar targeting, keywords, o audiencias
- Crear nuevas campañas (solo ejecutar las aprobadas)

**Cuándo contacta al Estratega:**
- "La campaña X tiene CPA $50, target era $20, ¿pause?"
- "Me queda presupuesto de este mes, ¿en qué invierto?"
- "Las conversiones bajaron 40% desde ayer, ¿qué hacemos?"

---

### 3. Equipo Creativo

**Responsabilidades principales:**
- Producir guiones para VSLs, videos, email sequences
- Crear propuestas de landing pages (html, copy, specs)
- Generar copys para anuncios (headlines, descriptions, CTAs)
- Hacer diseño de creativos (si hay diseñador interno) o briefear a diseñador externo
- Documentar cada propuesta con especificaciones claras

**Archivos que actualiza:**

| Archivo | Frecuencia | Qué hace |
|---------|-----------|----------|
| `creativos/propuestas-landing/[nombre]/index.md` | Por solicitud | Briefing: objetivo, público, CTA, specs técnicas |
| `creativos/propuestas-landing/[nombre]/draft.html` | Por solicitud | HTML/CSS draft de la landing |
| `creativos/guiones/[nombre]-[variante].md` | Por solicitud | Copy para VSL, email, video |
| `creativos/propuestas-nuevas/00-borrador-[nombre].md` | Por solicitud | Propuesta nueva (nuevo ad, nuevo ángulo) |

**Cómo trabaja:**

1. Recibe brief del Estratega: "Necesitamos landing para Black Ticket con CTA a Whatsapp"
2. Crea carpeta `creativos/propuestas-landing/black-ticket-v3/`
3. Dentro: `index.md` (specs) + `draft.html` (prototipo)
4. Mueve a `flujos/aprobaciones/00-borrador-black-ticket-v3.md`
5. Estratega revisa en 48h
6. Si aprobada: → `02-aprobado`, se notifica a Desarrollo
7. Si rechazada: → `02-rechazado` + comentarios, itera

**Qué debe documentar siempre:**
- Objetivo de la landing (qué conversión buscamos)
- Público objetivo (segmento, dolor, deseo)
- Propuesta de valor en el headline
- CTA claro (botón, texto, color)
- Wireframe o descripción visual
- Si es versión A/B, explicar la diferencia

**Cuándo contacta al Estratega:**
- "Terminé la propuesta de landing, ¿te la envío?"
- "Necesito brief para el nuevo ad copy de Meta"

---

### 4. Contabilidad

**Responsabilidades principales:**
- Validar que gasto registrado en `spend-log.csv` concuerde con facturas/reportes de plataformas
- Aplicar TRM (Tasa de Cambio Real) para conversión USD → COP
- Generar reportes financieros consolidados por marca
- Reconcialiación mensual antes del cierre contable
- Alertar sobre desviaciones presupuestarias

**Archivos que actualiza:**

| Archivo | Frecuencia | Qué hace |
|---------|-----------|----------|
| `presupuesto/spend-log.csv` | Quincenal (validación) | Verifica contra facturas, aplica TRM |
| `presupuesto/reconciliacion-mensual.md` | Mensual (antes del cierre) | Genera reporte de gasto real vs presupuesto aprobado |
| `reportes/financiero/[mes-año]-summary.md` | Mensual | Resumen de gasto por marca, canal, país |

**Cómo trabaja:**

1. Cada 15 de mes: Descarga reports oficiales de Google Ads, Meta, etc.
2. Valida que coincidan con `spend-log.csv`
3. Si hay diferencias > 5%, investiga con Trafficker
4. Aplica TRM del día de transacción
5. Genera `reconciliacion-mensual.md` con:
   - Presupuesto aprobado original
   - Gasto real por canal
   - Varianza %
   - Notas sobre ajustes

**Qué NO debe hacer:**
- Cambiar registros de gasto sin evidencia (rechazo de Trafficker)
- Hacer presupuestos nuevos (eso es del Estratega)

**Cuándo contacta al Estratega:**
- "La marca X ha gastado el 90% del presupuesto en 2 semanas"
- "Hay varianza de 12% en Meta Ads, revisar UTMs"

---

### 5. Desarrollo

**Responsabilidades principales:**
- Convertir propuestas aprobadas de landing a código en producción
- Implementar tracking (GA4, Meta Pixel, Google Ads conversion tags)
- Validar tracking con Tag Assistant / Pixel Helper antes de publicar
- Deploy a servidor de producción
- Mantener versionado de landings

**Archivos que actualiza:**

| Archivo | Frecuencia | Qué hace |
|---------|-----------|----------|
| `assets/landing-pages/[nombre]/index.html` | Por solicitud | Landing en producción |
| `assets/landing-pages/[nombre]/tracking.json` | Por solicitud | Documenta qué tags están instalados |
| `creativos/propuestas-landing/[nombre]/tracking-checklist.md` | Por solicitud | Validación de tracking |

**Cómo trabaja:**

1. Recibe aprobación de `02-aprobado-landing-black-ticket-v3.md`
2. Clona de `creativos/propuestas-landing/black-ticket-v3/draft.html`
3. Refina HTML/CSS (puede no ser idéntico al draft)
4. Implementa tracking:
   - GA4 event para page_view, form_submit, etc.
   - Meta Pixel events
   - Google Ads conversion tag
5. Valida con Tag Assistant / Pixel Helper
6. Genera `tracking-checklist.md` con evidencia (screenshots)
7. Deploy a producción
8. Copia final a `assets/landing-pages/[nombre]/index.html`
9. Notifica a Estratega: "Landing live en [URL]"

**Qué debe documentar:**
- URL de producción
- Tracking tags instalados (IDs exactos)
- Screenshot de Tag Assistant validando
- Fecha de deploy
- Versión anterior (si fue update)

**Cuándo contacta al Estratega:**
- "La landing está lista en [URL], ¿me das vista?"
- "El tracking de Meta Pixel no se valida, puede ser error en el Pixel ID"

---

### 6. Dirección / C-Level

**Responsabilidades principales:**
- Revisar comparadores semanales
- Aprobar aumentos/reducciones de presupuesto > 20%
- Tomar decisiones estratégicas: escalas, pausa de marcas, pivotes
- Revisar auditorías mensuales
- Autorizar nuevas iniciativas o canales

**Archivos que revisa:**

| Archivo | Frecuencia | Acciones esperadas |
|---------|-----------|-------------------|
| `comparador/comparador-semanal-*.md` | Semanal (viernes) | Revisa resumen ejecutivo, identifica oportunidades/problemas |
| `comparador/red-flags.md` | Semanal | Toma decisiones sobre alertas rojas |
| `reportes/auditoria-marca-[mes].md` | Mensual | Identifica marcas en rojo, solicita plan de mejora |
| `presupuesto/presupuesto-maestro.csv` | Mensual | Revisa rentabilidad por marca, ajusta asignación |

**Cómo trabaja:**

1. Viernes mañana: Recibe comparador semanal consolidado
2. Identifica:
   - Marcas con rojo (score < 33): Requiere intervención urgente
   - Varianzas > 20%: Por qué pasó, qué hacer
   - ROAS > meta: Escalar presupuesto
   - ROAS < meta: Pause o ajuste
3. Comunica decisiones al Estratega
4. Autoriza cambios presupuestarios
5. Mensualmente: Revisa auditoria, solicita planes de mejora

**Qué NO revisa:**
- Cambios tácticos pequeños (eso es del Estratega)
- Detalles de ad copy o targeting (eso es Trafficker)

**Cuándo contacta:**
- Al Estratega: "Autorizo pasar de $5K a $8K en marca X"
- A ambos: "En la próxima sesión revisaremos por qué Meta está 3.52% engagement"

---

## Workflow de Aprobación (detallado)

Todos los creativos, presupuestos y cambios de campaña pasan por este proceso:

### Estados

```
00-borrador-[nombre]
    ↓
Creador guarda archivo con este prefijo en flujos/aprobaciones/
Envía mensaje: "He dejado propuesta en flujos/aprobaciones/00-borrador-landing-black"
    ↓
01-pending-[nombre]
    ↓
Renombra archivo a este prefijo
Estratega: "Recibido, reviso en 48h"
Máximo plazo: 48 horas hábiles
    ↓
    ├─→ 02-aprobado-[nombre] ✓
    │       ↓
    │   Estratega deja comentarios positivos
    │   Renombra archivo
    │   Notifica: "Aprobado, procede con ejecución"
    │       ↓
    │   03-en-produccion-[nombre]
    │       ↓
    │   Trafficker/Desarrollo ejecuta
    │   Renombra archivo
    │       ↓
    │   04-publicado-[nombre]
    │       ↓
    │   Al terminar vigencia, archiva
    │
    └─→ 02-rechazado-[nombre] ✗
            ↓
        Estratega deja feedback con razones
        Renombra archivo
        Notifica: "Requiere cambios. Ver comentarios"
            ↓
        00-borrador-[nombre-v2]
            ↓
        Creador itera y reenvía
        (vuelve a empezar el ciclo)
```

### Responsables por transición

| Transición | Responsable | Plazo | Checklist |
|-----------|-------------|-------|-----------|
| borrador → pending | Creador | Inmediato | Validar formato del archivo, que tenga toda la info |
| pending → aprobado/rechazado | Estratega | 48h | Revisar contra brief, presupuesto, strategy, dejar comentarios |
| aprobado → en-produccion | Trafficker/Desarrollo | Según urgencia | Ejecutar exacto a las specs, sin improvisar |
| en-produccion → publicado | Trafficker/Desarrollo | Cuando vence | Documentar performance, archivar |

### Ejemplo real: Propuesta de landing Black Ticket

```
Día 1, martes 09:00 AM
Equipo Creativo: Termina propuesta de landing Black Ticket v3
Crea archivo: flujos/aprobaciones/00-borrador-landing-black-ticket-v3.md
Contiene:
  - Objetivo (convertir a Black Ticket $997)
  - Público (ecommerce sellers, +30 años)
  - Copy del headline
  - CTA (Comprar ahora → feriaeffix.com/black-ticket)
  - Wireframe
  - Specs técnicas (responsive, conversión tracking)
Notifica: "Propuesta lista para revisar"

Día 1, martes 14:00 PM
Estratega recibe
Renombra: flujos/aprobaciones/01-pending-landing-black-ticket-v3.md
Responde: "Recibido, reviso mañana"

Día 2, miércoles 10:00 AM
Estratega termina review
Feedback: "Buena propuesta, cambiar 'Limited slots' por 'Cupos agotándose' (
culturalmente más efectivo en CO), rest aprobado"
Renombra: flujos/aprobaciones/02-aprobado-landing-black-ticket-v3.md
Notifica: "Aprobado. Procede con cambio de copy, luego publica."

Día 2, miércoles 14:00 PM
Equipo Creativo: Actualiza copy
Notifica a Desarrollo: "Landing lista, pueden implementar"

Día 3, jueves 09:00 AM
Desarrollo: Clona HTML, ajusta copy, implementa tracking, valida con Tag Assistant
Renombra: flujos/aprobaciones/03-en-produccion-landing-black-ticket-v3.md
Publica en: feriaeffix.com/black-ticket
Notifica: "Live en feriaeffix.com/black-ticket, tracking validado ✓"

Día 15, viernes (vence campaign)
Trafficker: Campaign termina, archiva
Renombra: flujos/aprobaciones/04-publicado-landing-black-ticket-v3.md
Documenta: Performance final (X conversiones, Y ROAS)
```

---

## Naming Conventions

Mantener consistencia en todos los nombres de archivo para facilitar búsqueda y navegación.

### Formato general
```
[categoria]-[descripcion]-[variante]-[periodo].md

Donde:
- categoria: tipo de documento (estrategia, auditoria, comparador, propuesta, etc.)
- descripcion: qué es (landing, google-ads, meta-ads, etc.)
- variante: versión o segmento (v1, v2, black-ticket, general, etc.)
- periodo: fecha si es relevante (2026-03, w13, 2026-03-31)
```

### Ejemplos por tipo

**Estrategias:**
- `estrategia-anual-2026.md`
- `estrategia-q1-2026.md`
- `estrategia-fase-awareness-2026.md`

**Auditorías:**
- `auditoria-google-ads-marzo-2026.md` (auditoría completa)
- `auditoria-marca-q1-2026.md` (audit mensual score)
- `auditoria-landing-black-ticket-v2.md` (landing audit)

**Comparadores:**
- `comparador-semanal-2026-w13.md`
- `comparador-mensual-marzo-2026.md`

**Propuestas (creativos/landing):**
- `propuesta-landing-black-ticket-v2.md`
- `propuesta-landing-general-v1.md`
- `propuesta-ad-carousel-reels-v3.md`

**Reportes:**
- `reporte-semanal-2026-w13.md`
- `reporte-kpis-diarios-2026-03-31.md`
- `reporte-financiero-marzo-2026.md`

**Estados (en flujos/aprobaciones/):**
- `00-borrador-landing-black-v2.md`
- `01-pending-landing-black-v2.md`
- `02-aprobado-landing-black-v2.md`
- `02-rechazado-landing-black-v2.md`
- `03-en-produccion-landing-black-v2.md`
- `04-publicado-landing-black-v2.md`

**CSVs y datos:**
- `google-ads-spend-log-2026-03.csv`
- `meta-ads-performance-daily-2026-03-31.csv`
- `customer-match-emails-2026-03-30.csv`
- `kpis-diarios-2026-03.csv`

**Archivos maestros:**
- `budget-plan-2026-aprobado.md`
- `admin-maestro.md` (accesos, IDs, contactos)
- `calendario-anual-2026.md`
- `integraciones.md` (Google Ads, Meta, Supabase, etc.)

### Reglas importantes
- Usar guiones `-`, nunca espacios ni underscores
- Fechas en ISO: `YYYY-MM-DD` o `YYYY-MM` o `YYYY-Wxx`
- Versiones: `v1`, `v2`, `v3` (no `version_1`)
- Estados de archivo: siempre prefijo `00`, `01`, `02`, `03`, `04`
- Archivos activos vs. históricos: históricos en carpeta `archive/`

---

## Checklist de inicio de rol

Cuando se asigna a alguien un rol, validar que tenga:

### Todos los roles
- [ ] Acceso a GitHub (repositorio)
- [ ] Acceso a Google Drive (creativos, datos, reportes)
- [ ] Acceso a Slack (notificaciones)
- [ ] Leído `SISTEMA.md` y `ROLES.md`

### Estratega (adicional)
- [ ] Acceso a Google Ads (todas las cuentas de marca)
- [ ] Acceso a Meta Ads Manager (todas las ad accounts)
- [ ] Acceso a GA4 (todas las propiedades)
- [ ] Conocimiento de: presupuestación, strategy, copywriting

### Trafficker (adicional)
- [ ] Acceso a Google Ads (ejecución)
- [ ] Acceso a Meta Ads Manager (ejecución)
- [ ] Conocimiento de: bidding strategies, targeting, optimization

### Equipo Creativo (adicional)
- [ ] Acceso a Figma o Canva (diseño)
- [ ] Acceso a ElevenLabs o similar (audio)
- [ ] Conocimiento de: copywriting, video production, psychology

### Contabilidad (adicional)
- [ ] Acceso a Google Sheets (spend-log, reconciliación)
- [ ] Conocimiento de: contabilidad básica, TRM, auditoría

### Desarrollo (adicional)
- [ ] Acceso a servidor de producción (deploy)
- [ ] Acceso a Google Tag Manager (tracking)
- [ ] Conocimiento de: HTML/CSS, tracking implementation, security

### Dirección (adicional)
- [ ] Acceso a comparadores semanales
- [ ] Acceso a auditorías mensuales
- [ ] Capacidad de tomar decisiones presupuestarias

---

## Matriz de RACI (responsable, accountable, consultor, informado)

| Tarea | Estratega | Trafficker | Creativo | Contabilidad | Desarrollo | Dirección |
|-------|-----------|-----------|----------|-------------|-----------|-----------|
| Crear estrategia anual | A | C | C | I | I | A |
| Aprobar propuesta de landing | A | C | R | I | I | C |
| Implementar landing en producción | C | C | C | I | R | I |
| Registrar gasto diario | I | R | I | C | I | I |
| Reconciliar presupuesto mensual | C | C | I | A | I | C |
| Generar comparador semanal | R | C | I | I | I | C |
| Ejecutar campañas | C | R | I | I | I | I |
| Validar tracking de landing | C | C | I | I | R | I |
| Tomar decisión de escalar presupuesto | C | I | I | I | I | A |
| Generar auditoria mensual | R | C | I | I | I | C |

**Leyenda:**
- **R (Responsible)**: Hace el trabajo
- **A (Accountable)**: Toma decisión final
- **C (Consulted)**: Opinión importante
- **I (Informed)**: Recibe notificación

---

## Contactos y escaladas

### Quién contactar si...

**Si necesito presupuesto aprobado rápido:**
→ Contacta al Estratega primero, luego a Dirección si es > 20% de cambio

**Si una campaña está underperforming:**
→ Trafficker lo reporta al Estratega, Estratega decide si pausa o ajusta

**Si hay problema con tracking:**
→ Contacta al Equipo de Desarrollo, ellos validan con Tag Assistant

**Si hay varianza presupuestaria:**
→ Contabilidad investiga, informa al Estratega, Estratega comunica a Dirección

**Si necesito nueva landing urgente:**
→ Briefea al Equipo Creativo (48-72h), aprobación Estratega (48h), desarrollo (1-2 días)

**Si hay alerta sobre marca en rojo:**
→ Dirección lo ve en auditoría, solicita plan de mejora al Estratega

---

## Resumen: Los 6 Roles en 60 segundos

| Rol | Actitud | Éxito se ve en... |
|-----|---------|------------------|
| **Estratega** | Pensador estratégico | Comparadores semanales generados, aprobaciones en tiempo, decisiones bien documentadas |
| **Trafficker** | Ejecutor obsesivo | Gasto registrado EOD, checklists completos, alertas tempranas de underperformance |
| **Creativo** | Artista data-informed | Propuestas aprobadas en plazo, copys testeados, innovación con resultados |
| **Contabilidad** | Guardián de la verdad | Reconciliación sin varianzas, gasto validado, reportes claros |
| **Desarrollo** | Engineer preciso | Landings en producción con tracking 100% validado, sin errores |
| **Dirección** | Capitán del barco | Decisiones oportunas, escalación inteligente de presupuestos, crecimiento sostenido |

---

Para más detalles sobre la estructura general del sistema, consultar `SISTEMA.md`.
