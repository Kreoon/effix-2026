# Marketing Ops Command Center — Grupo Effi

## Qué es este sistema

El Marketing Ops Command Center es la columna vertebral operativa del Grupo Effi. Es un repositorio centralizado donde se documentan, ejecutan y rastreen todas las campañas de marketing (Google Ads, Meta Ads, Email, etc.) para las 10 marcas del grupo a través de 5 países.

Este sistema resuelve:
- Falta de visibilidad única entre marcas y canales
- Retrasos en aprobación de creativos y presupuestos
- Inconsistencia en tracking y medición
- Duplicación de trabajo entre equipos
- Pérdida de historia de decisiones

## Para qué sirve

- **Unificación**: Una sola fuente de verdad para todas las marcas
- **Control de ejecución**: Checklists, workflows de aprobación, bitácoras
- **Análisis**: Comparador Plan vs Realidad semanal, auditorías por marca
- **Gobierno**: Presupuestos centralizados, trazabilidad de decisiones
- **Escalabilidad**: Estructura que crece con nuevas marcas y canales

---

## Las 10 marcas del Grupo

1. **Feria Effix** (Colombia) - Evento ecommerce más grande de LATAM
2. **EffiCommerce** (Colombia, Ecuador, RD) - Software de ecommerce SaaS
3. **Effi System** (Colombia, Ecuador, RD, Guatemala, Costa Rica) - Plataforma de sistemas y tecnología
4. **Effi Living** (Colombia) - Vertical de lifestyle y bienestar
5. **EffiWoman** (Colombia) - Vertical femenino especializado
6. **Efficaex** (Guatemala, Costa Rica) - Evento ecommerce LATAM
7. **Sara Montoya** (Colombia) - CEO y marca personal
8. **Juan Carmona** (Colombia) - Líder y marca personal
9. **Oswaldo Alarcon** (Colombia) - Líder y marca personal
10. **Grupo Effi Eventos** (Colombia) - Plataforma de eventos general

**Países activos**: Colombia, Ecuador, República Dominicana, Guatemala, Costa Rica

---

## Estructura de carpetas

```
effix-2026/
├── SISTEMA.md                    ← Este archivo (guía del sistema)
├── ROLES.md                      ← Roles y responsabilidades
├── marcas/                       ← Una carpeta por marca
│   ├── feria-effix/
│   │   ├── context/
│   │   ├── estrategia/
│   │   ├── campanas/
│   │   ├── presupuesto/
│   │   ├── creativos/
│   │   ├── reportes/
│   │   ├── comparador/
│   │   ├── flujos/
│   │   └── assets/
│   ├── efficommerce/
│   ├── effi-system/
│   ├── effi-living/
│   ├── effiwomen/
│   ├── efficaex/
│   ├── sara-montoya/
│   ├── juan-carmona/
│   ├── oswaldo-alarcon/
│   └── grupo-effi-eventos/
├── recursos/                     ← Compartidos entre marcas
│   ├── plantillas/
│   ├── brand-guidelines/
│   ├── stock-creativos/
│   └── integraciones/
├── sistema/                      ← Configuración central
│   ├── admin-maestro.md          ← Administradores y accesos
│   ├── presupuesto-maestro.csv   ← Presupuestos consolidados
│   ├── calendario-anual.md       ← Fechas clave, eventos
│   └── integraciones.md          ← Google Ads, Meta, Supabase, etc.
└── dashboard/                    ← Reportes agregados
    ├── kpis-grupo.md
    ├── comparador-mensual.md
    └── auditoria-maestro.md
```

---

## Cómo navegar: estructura de cada marca

Cada marca en `marcas/[nombre]/` tiene 8 subcarpetas con propósitos específicos:

### 1. context/
**Qué**: Análisis, investigación, auditorías, datos maestros.
**Archivos típicos**:
- `proyecto-master.md` - Resumen ejecutivo (objetivo, público, presupuesto anual)
- `auditorias/` - Landing audits, Google Ads audits, Meta analysis
- `datos-maestros.md` - Segmentos, audiencias, públicos definidos
- `competencia.md` - Análisis competitivo por canal

### 2. estrategia/
**Qué**: Planes de marketing, posicionamiento, messaging, propuesta de valor.
**Archivos típicos**:
- `estrategia-anual.md` - Plan integral para el año
- `strategy-por-fase.md` - Desglose por fase (Awareness → Consideration → Conversion)
- `messaging-framework.md` - Copys, tonalidad, proposiciones clave
- `calendar-contenido.md` - Temas, verticales, variaciones

### 3. campanas/
**Qué**: Configuración exacta de cada campaña (ad copies, keywords, audiences, bids).
**Archivos típicos**:
- `google-ads/` - Campañas de Search, Display, Shopping, Video
- `meta-ads/` - Campañas de Feed, Reels, Stories, Conversion
- `email/` - Secuencias, segmentos, plantillas
- `otras-campanas/` - Programmatic, Influencer, Affiliate
- `checklists/` - Pre-launch checks, launch checks, daily monitoring

### 4. presupuesto/
**Qué**: Planeación financiera, gasto registrado, proyecciones, ROI.
**Archivos típicos**:
- `budget-plan.md` - Presupuesto aprobado por canal, mes, semana
- `spend-log.csv` - Registro diario de gasto real (Google Ads, Meta, otros)
- `proyecciones.md` - ROAS esperado, CPA target, MER por canal
- `reconciliacion-mensual.md` - Gasto real vs plan, varianzas, acciones

### 5. creativos/
**Qué**: Recursos audiovisuales, propuestas de landing, guiones, assets.
**Archivos típicos**:
- `propuestas-landing/` - HTML, specs, mockups de landing pages
- `guiones/` - Copy para VSLs, videos, email sequences
- `creativos-actuales/` - Links a carpetas Google Drive con banners, videos
- `propostas-nuevas/` - En evaluación, awaiting approval
- `archive/` - Creativos pasados (referencia)

### 6. reportes/
**Qué**: Performance data, analytics, insights, toma de decisiones.
**Archivos típicos**:
- `semanal/` - Reportes de ejecución (clics, impresiones, conversiones, CPA)
- `comparador-plan-vs-realidad.md` - Se genera semanalmente
- `insights/` - Análisis de por qué pasó lo que pasó
- `kpis-diarios.csv` - Tracking de métricas principales

### 7. comparador/
**Qué**: Análisis Plan vs Realidad, toma de decisiones.
**Archivos típicos**:
- `comparador-semanal-[fecha].md` - Presupuesto planeado vs real, varianzas, acciones
- `tendencias.md` - Tendencias de performance en últimas 4 semanas
- `red-flags.md` - Alertas sobre campañas underperforming

### 8. flujos/
**Qué**: Workflows de aprobación, checklists, documentación operativa.
**Archivos típicos**:
- `aprobaciones/` - Estados: borrador → pending → aprobado/rechazado → en-produccion → publicado
- `checklist-preproduccion.md` - Qué validar antes de lanzar
- `checklist-ejecucion.md` - Qué monitorear diariamente
- `responsables.md` - Quién aprueba qué

### 9. assets/
**Qué**: Archivos finales, creativos en uso, datos CSVs, screenshots.
**Archivos típicos**:
- `landing-pages/` - HTML y CSS finales en producción
- `datos/` - CSVs de Customer Match, audiencias exportadas
- `creativos/` - Imágenes, videos finales (o links a Google Drive)
- `screenshots/` - Pruebas de ejecución, status de campañas

---

## Convenciones de nombres de archivos

Mantener consistencia para que todo sea buscable y navegable:

### Archivos markdown
```
[tipo]-[descripcion]-[variante]-[fecha].md

Ejemplos:
- estrategia-anual-2026.md
- auditoria-google-ads-marzo-2026.md
- comparador-semanal-2026-w12.md
- propuesta-landing-black-ticket-v2.md
- checklist-preproduccion-google-ads.md
```

### CSVs y datos
```
[fuente]-[tipo]-[fecha].csv

Ejemplos:
- google-ads-spend-log-2026-03.csv
- meta-ads-performance-daily-2026-03-30.csv
- customer-match-audiencia-MailChimp-2026-03-28.csv
```

### Reportes semanales
```
reporte-semanal-[w##-año].md o comparador-semanal-[YYYY-W##].md

Ejemplos:
- comparador-semanal-2026-w13.md
- reporte-semanal-w12-2026.md
```

### Estados de archivo (en subcarpeta flujos/aprobaciones/)
Usar prefijo de estado al inicio:
- `00-borrador-[nombre]` - Creado, no revisado
- `01-pending-[nombre]` - Enviado a revisión
- `02-aprobado-[nombre]` - Aprobado, listo para ejecutar
- `02-rechazado-[nombre]` - Requiere cambios
- `03-en-produccion-[nombre]` - Actualmente ejecutándose
- `04-publicado-[nombre]` - Finalizado, archived

---

## Workflow de aprobación

Todos los creativos, presupuestos y campañas pasan por este flujo:

```
BORRADOR (Creador)
    ↓
    Creador sube a flujos/aprobaciones/00-borrador-[nombre]
    ↓
PENDING (Enviado a Estratega)
    ↓
    Renombra a 01-pending-[nombre]
    Estratega revisa en máx 48h
    ↓
    ↙─────────────────┬──────────────────┘
    ↓                 ↓
APROBADO        RECHAZADO
    ↓                 ↓
02-aprobado    02-rechazado
    ↓                 ↓
Notifica a        Creador revisa
Trafficker        comentarios
    ↓                 ↓
    ↓         Corrige y reenvía
EN-PRODUCCION     a 01-pending
    ↓                 ↓
03-en-          (vuelve a revisar)
produccion          ↓
    ↓         (hasta aprobado)
PUBLICADO/
ARCHIVED
    ↓
04-publicado
```

**Responsables por etapa:**
- **Borrador → Pending**: Creador (equipo creativo o estratega)
- **Pending → Aprobado/Rechazado**: Estratega (máx 48h)
- **Aprobado → En-Producción**: Trafficker (lanzamiento)
- **En-Producción → Publicado**: Trafficker (cuando termina vigencia)

---

## Frecuencia de actualización

| Rol | Frecuencia | Qué actualiza | Archivo |
|-----|-----------|---------------|---------|
| Trafficker | Diario | Gasto, clics, conversiones | campanas/, presupuesto/spend-log.csv, reportes/kpis-diarios.csv |
| Trafficker | Diario | Checklist de ejecución | flujos/checklist-ejecucion.md |
| Estratega | Semanal | Comparador Plan vs Realidad | comparador/comparador-semanal-[fecha].md |
| Estratega | Semanal | Acciones correctivas | comparador/red-flags.md |
| Equipo Creativo | Por solicitud | Propuestas de creativos | creativos/propuestas-nuevas/ |
| Contabilidad | Quincenal | Reconciliación de gastos | presupuesto/reconciliacion-mensual.md |
| Dirección | Semanal | Aprobación de presupuestos | presupuesto/budget-plan.md |

---

## Scoring de auditoría por marca

Se ejecuta **mensualmente** y genera `reportes/auditoria-marca-[mes-año].md`.

Cada marca se califica en **5 dimensiones x 20 puntos = 100 puntos máximo**:

### 1. Tracking (0-20 pts)
- GA4/GTM implementados correctamente: 5 pts
- Conversiones registradas en Google Ads: 5 pts
- Meta Pixel con eventos configurados: 5 pts
- Validación en Tag Assistant/Pixel Helper: 5 pts

### 2. Estructura (0-20 pts)
- Campañas organizadas por objetivo (Brand, Category, Conversión): 7 pts
- Ad groups bien segmentados: 7 pts
- Keywords con negatives actualizado: 6 pts

### 3. Presupuesto (0-20 pts)
- Plan presupuestario aprobado y documentado: 7 pts
- Gasto registrado diariamente vs plan: 7 pts
- Varianza presupuestaria < 10%: 6 pts

### 4. Creativos (0-20 pts)
- Propuestas documentadas y aprobadas: 7 pts
- Ad copy A/B testing en marcha: 7 pts
- Landing pages optimizadas: 6 pts

### 5. Resultados (0-20 pts)
- CTR vs benchmark de industria: 7 pts
- Conversiones registradas: 6 pts
- ROAS o CPA dentro de meta: 7 pts

**Escala de rating**: 0-33 (Rojo), 34-66 (Amarillo), 67-100 (Verde)

---

## Comparador Plan vs Realidad (generación semanal)

Cada **viernes** se genera `comparador/comparador-semanal-[YYYY-W##].md` para cada marca.

Estructura:

```markdown
# Comparador Semanal — [Marca] — W## 2026

## Resumen ejecutivo
- Presupuesto planeado: USD X
- Presupuesto gastado: USD Y
- Varianza: ±Z%
- Conversiones registradas: N
- CPA promedio: USD M

## Por canal

### Google Ads
| Métrica | Plan | Real | Varianza |
|---------|------|------|----------|
| Presupuesto | $X | $Y | ±Z% |
| Clics | N | M | ±Z% |
| Conversiones | N | M | ±Z% |
| CPA | $X | $Y | ±Z% |

### Meta Ads
(Idem)

### Email
(Idem)

## Análisis de varianzas
- Explica por qué se devió el plan
- Acciones correctivas sugeridas

## Red flags
- Si CPA > target en 15%+
- Si CTR < benchmark en 20%+
- Si conversiones = 0 (problema de tracking)

## Decisiones pendientes
- Pausa/aumento de presupuesto
- Cambios en creative
- Ajustes en targeting
```

---

## Integración con sistemas externos

### Google Ads
- ID de cuenta por marca (documentado en `sistema/admin-maestro.md`)
- Export automático de gasto a `presupuesto/spend-log.csv`
- Campañas deben tener UTM consistentes

### Meta Ads
- Pixel IDs por marca (documentado)
- Export de performance a `campanas/meta-ads/performance-[fecha].csv`
- Custom Audiences en Customer Match

### Supabase (opcional para tracking central)
- Tabla `campaigns` - metadatos
- Tabla `daily_performance` - gasto + conversiones
- Tabla `approvals` - estado de flujos

### Email (Mailchimp/ConvertKit/Klaviyo)
- Segmentos documentados en `campanas/email/segmentos.md`
- Performance en `reportes/semanal/email-[fecha].md`

---

## Notas finales

- Este sistema crece con el grupo: cuando hay nueva marca, replicar estructura `marcas/[nueva-marca]/`
- Mantener archivos actualizados es responsabilidad de cada rol (ver `ROLES.md`)
- Los comparadores semanales son la herramienta de toma de decisiones: si no se hacen, el sistema no funciona
- La auditoría mensual permite identificar marcas que necesitan intervención

Para más detalles sobre roles y responsabilidades, consultar `ROLES.md`.
