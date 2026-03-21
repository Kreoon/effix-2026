# Proyecto: Google Ads — Feria Effix 2026

## Qué es esto
Estrategia completa de Google Ads para Feria Effix 2026, el evento de ecommerce más grande de LATAM. Presupuesto: USD $40,000. Evento: 16-18 Oct 2026, Plaza Mayor, Medellín.

## Estado actual (19 marzo 2026)
- **Cuenta Google Ads:** 356-853-8992 — [Search] Categoría relanzada, resto pausado
- **GTM/GA4:** ✅ Implementados — GTM-TLRMK246 (V5), GA4 G-CRXZ50VX7D
- **Conversiones:** ✅ Black pago completo + cuotas verificadas con Tag Assistant
- **Primera ejecución:** 6 días (11-17 mar), 101 clics, CTR 16.4%, 0 conversiones, $54 USD
- **[Search] Categoría v2:** 🟢 EN VIVO desde 2026-03-19 — Maximizar clics, COP $80K/día, 18 keywords
- **Customer Match:** ✅ 60,259 registros procesados → pendiente subir a Google Ads
- **Landing Black:** feriaeffix.com/estrategia-google-ads/ — ⚠️ Cambiar URL a /experiencia-black/
- **LaTiquetera:** ✅ Conversión implementada (2026-03-20) — GTM-MKGKFGL, valor dinámico, transaction_id, Stape server-side
- **Meta Ads (Paid Social):** Alerta roja — 3.52% engagement, 96.5% rebote
- **Tickets:** Pasaporte 3 días ($201,300 COP), VIP, Black ($997 USD), Stands

## Arquitectura de carpetas
```
effix-2026/
├── CLAUDE.md                          ← Este archivo
├── context/                           ← Análisis, auditorías, datos maestros
│   ├── proyecto-master.md             ← Resumen ejecutivo del proyecto
│   ├── credenciales.md                ← IDs, accesos, pasarelas
│   ├── landing-audit.md               ← Auditoría landing Black (7.2/10)
│   └── meta-ads-insights.md           ← Análisis Meta Ads (2 datasets)
├── campañas/                          ← Configuración exacta de cada campaña
│   ├── estrategia-reestructurada-v2.md ← ⭐ PLAN MAESTRO — 8 campañas, presupuestos, cronograma
│   ├── search-marca-effix.md          ← Campaña Brand (pausada, con datos rendimiento)
│   ├── search-categoria.md            ← Campaña Categoría (RELANZADA v2, con config completa)
│   ├── acciones-bloqueantes.md        ← Guía de acciones pendientes para equipo/proveedores
│   └── fase2-plantillas.md            ← Plantillas YouTube, Display, PMax
├── assets/                            ← Landing pages, creativos, Customer Match CSVs
└── bitacoras/                         ← Log de decisiones y cambios
```

## Decisiones clave tomadas
1. **GTM + GA4 implementados** — tracking activo desde 10/03/2026
2. **Reestructuración a portafolio completo** — no solo Black, también General, VIP y Stands
3. **Campaña de marca → feriaeffix.com** (no solo landing Black)
4. **LaTiquetera maneja boletas General/VIP** — código de conversión enviado
5. **50% del presupuesto en las últimas 10 semanas** (Ago-Oct) — push final
6. **Google Ads es el canal de mayor calidad** (53.85% engagement vs 3.52% de Meta)
7. **Los copies de Meta NO se reciclan directo** — formatos diferentes, messaging sí se mantiene
8. **Customer Match como observación** — NO como restricción de targeting (señal para Google)
9. **Maximizar clics primero** — no Smart Bidding hasta 30+ conversiones registradas

## Convenciones
- Todos los archivos .md usan formato Obsidian (frontmatter YAML + wikilinks)
- Los nombres de campañas siguen el formato: `[Tipo] [Objetivo] | [Segmento] | [Fase]`
- Presupuestos siempre en USD
- Fechas en formato ISO (YYYY-MM-DD)

## Qué NO hacer
- No lanzar campañas de Search con Target CPA sin tener al menos 30 conversiones
- No crear campañas Performance Max hasta Fase 2 (necesita data de conversión)
- No editar la landing de Black Ticket sin respaldar la versión actual
- No subir audiencias sin verificar formato de Customer Match (SHA256 hashed)
- No enviar todo el tráfico solo a landing Black ($997) — usar portafolio completo
- No ignorar el problema de Meta Ads (3.52% engagement) — requiere investigación

## Skills relevantes
Usar `ads-google`, `ads-audit`, `ads-plan`, `ads-budget`, `ads-creative`, `ads-landing`, `analytics-tracking`, `copywriting`, `landing-page-generator` cuando se trabaje en este proyecto.

## Archivos clave externos
- Campañas Meta originales: `obsidian-brain/03 - Recursos/Pilar 5 - Infiny Latam/Campañas/`
- Estrategia Infiny: `obsidian-brain/03 - Recursos/Pilar 5 - Infiny Latam/Estrategia Infiny/`
- BD clientes: `Documents/Bd clientes directos de Effix para Google Ads.xlsx`
