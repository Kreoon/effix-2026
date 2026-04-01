# Marketing Ops Command Center — Grupo Effi

## Que es esto
Sistema centralizado de control de estrategia publicitaria y marketing para todo el Grupo Effi. Cubre 10 marcas en 5 paises con auditoria, presupuestos, KPIs, creativos y workflows de equipo.

## Marcas del grupo (10)

| Marca | Slug | Paises | Vertical |
|-------|------|--------|----------|
| Feria Effix | feria-effix | Colombia | Evento ecommerce |
| EffiCommerce | efficommerce | Colombia, Ecuador, RD | Software ecommerce + logistica |
| Effi System | effi-system | Colombia, Ecuador, RD, Guatemala, Costa Rica | Sistemas/tecnologia |
| Effi Living | effi-living | Colombia | Lifestyle/hogar |
| EffiWoman | effiwoman | Colombia | Empoderamiento femenino |
| Efficaex | efficaex | Guatemala, Costa Rica | Evento ecommerce Centroamerica |
| Sara Montoya | sara-montoya | Colombia | CEO marca personal |
| Juan Carmona | juan-carmona | Colombia | Lider marca personal |
| Oswaldo Alarcon | oswaldo-alarcon | Colombia | Lider marca personal |
| Grupo Effi Eventos | grupo-effi-eventos | Colombia | Eventos generales |

## Estado actual — Feria Effix (31 marzo 2026)
- **Cuenta Google Ads:** 356-853-8992 — 2 campanas activas
- **GTM/GA4:** Implementados — GTM-TLRMK246 (V5), GA4 G-CRXZ50VX7D
- **Conversiones Black:** Pago completo + cuotas verificadas
- **Conversiones LaTiquetera:** ❌ Tag AW-17981312035 instalado PERO bloqueado por CMP. Tag Assistant confirma 0 hits (2026-03-31). CMP bloquea GTM, Google Ads Y GA4. Accion: LaTiquetera debe configurar Consent Mode v2.
- **Auditoria Marzo:** Score 33/100 — 300 clics, $296 USD gastados, 0 conversiones
- **Ventas Black:** 70/400 boletas vendidas (meta: 300)
- **Presupuesto total feria:** $1,000M COP (~$235K USD)
- **Presupuesto Google Ads:** USD $40,000

## Arquitectura de carpetas
```
effix-2026/
├── CLAUDE.md                          <- Este archivo
├── SISTEMA.md                         <- Guia del sistema para el equipo
├── ROLES.md                           <- Roles y responsabilidades
│
├── marcas/                            <- Una carpeta por marca
│   ├── feria-effix/                   <- Colombia — Evento principal
│   │   ├── context/                   <- Auditorias, credenciales, datos
│   │   ├── estrategia/               <- Estrategias versionadas
│   │   ├── campanas/                  <- Config de campanas activas
│   │   ├── presupuesto/              <- Budget plan + spend log
│   │   ├── creativos/                <- Guiones, videos, banners, copies, VSLs
│   │   ├── reportes/                 <- Semanal, mensual, financiero
│   │   ├── comparador/              <- Plan vs Realidad semanal
│   │   ├── flujos/                   <- Aprobaciones y tareas
│   │   ├── bitacoras/               <- Log de decisiones
│   │   └── assets/                   <- Landing pages, CSVs, screenshots
│   ├── efficommerce/                  <- Colombia, Ecuador, RD
│   ├── effi-system/                   <- 5 paises
│   ├── effi-living/                   <- Colombia
│   ├── effiwoman/                     <- Colombia
│   ├── efficaex/                      <- Guatemala, Costa Rica
│   ├── sara-montoya/                  <- Colombia
│   ├── juan-carmona/                  <- Colombia
│   ├── oswaldo-alarcon/               <- Colombia
│   ├── grupo-effi-eventos/            <- Colombia
│   └── _plantilla-marca/             <- Template para nuevas marcas
│
├── recursos/                          <- Compartido entre marcas
│   ├── plantillas/                    <- Templates reutilizables
│   │   ├── checklist-google-ads.md
│   │   ├── checklist-meta-ads.md
│   │   ├── checklist-tiktok-ads.md
│   │   ├── reporte-semanal.md
│   │   ├── reporte-mensual.md
│   │   ├── ticket-aprobacion.md
│   │   ├── brief-creativo.md
│   │   └── propuesta-landing.md
│   ├── benchmarks.md                  <- KPIs referencia por plataforma
│   └── glosario.md                    <- Terminos del equipo
│
├── dashboard/                         <- App React (Capa 3)
│
└── sistema/                           <- Infraestructura
    ├── supabase/migrations/
    └── n8n-flows/
```

## Decisiones clave
1. **Sistema multi-marca multi-pais** — cada marca tiene su carpeta con estructura estandar
2. **3 capas progresivas** — Archivos Markdown → Supabase → Dashboard React
3. **Score de auditoria 0-100** — 5 dimensiones x 20 pts (Tracking, Estructura, Presupuesto, Creativos, Resultados)
4. **Comparador Plan vs Realidad** — generado semanalmente por marca
5. **Workflow de aprobacion** — borrador → pending → aprobado/rechazado → produccion → publicado
6. **Control por pais** — cada cuenta de ads se vincula a marca + pais

## Decisiones Feria Effix
1. GTM + GA4 implementados — tracking activo desde 10/03/2026
2. Reestructuracion a portafolio completo — General, VIP, Black y Stands
3. LaTiquetera maneja boletas General/VIP — tag bloqueado por CMP (confirmado con Tag Assistant 2026-03-31, 0 hits)
4. Maximizar clics primero — no Smart Bidding hasta 30+ conversiones
5. Customer Match como observacion — NO como restriccion de targeting
6. 3 etapas de pauta: Reconocimiento (Abr-Jun) → Reconocimiento+Venta (Jul) → Full Venta (Sep-Oct)
7. Split geo: 50/50 COL/intl en etapa 1, 70/30 COL en etapa final
8. Distribucion etapa final: 60% Meta, 20% Google, 20% TikTok

## Convenciones
- Archivos .md con frontmatter YAML
- Nombres de campanas: `[Tipo] [Objetivo] | [Segmento] | [Fase]`
- Presupuestos siempre en USD
- Fechas ISO (YYYY-MM-DD)
- Semanas ISO (YYYY-WNN)
- Archivos de marca en su carpeta `marcas/{slug}/`

## Que NO hacer
- No lanzar Search con Target CPA sin 30+ conversiones
- No crear PMax hasta tener data de conversion
- No editar landing Black sin respaldar version actual
- No subir audiencias sin SHA256 hash
- No mezclar archivos de una marca en la carpeta de otra
- No editar budget-plan.md despues de aprobado (crear nueva version)
- No ignorar el comparador semanal Plan vs Realidad

## Skills relevantes
`ads-google`, `ads-audit`, `ads-plan`, `ads-budget`, `ads-creative`, `ads-landing`, `ads-meta`, `ads-tiktok`, `analytics-tracking`, `copywriting`, `landing-page-generator`

### Herramientas de diseno y creacion
- **Stitch MCP** — UI con IA de Google. Skills: `stitch-loop`, `stitch-ui-design`, `design-md`
- **NanoBanana PPT** — Presentaciones con IA. Skill: `nanobanana-ppt-skills`
- **UI/UX Pro Max** — 50+ estilos, 97 paletas, 99 guidelines. Skill: `ui-ux-pro-max`
- **21st.dev Magic UI** — Componentes UI production-ready. Skill: `magic-ui-generator`

## Archivos clave externos
- Campanas Meta: `obsidian-brain/03 - Recursos/Pilar 5 - Infiny Latam/Campanas/`
- Estrategia Infiny: `obsidian-brain/03 - Recursos/Pilar 5 - Infiny Latam/Estrategia Infiny/`
- BD clientes: `Documents/Bd clientes directos de Effix para Google Ads.xlsx`
