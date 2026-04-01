# Design System — Feria Effix 2026

## Color Tokens

### Core Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | #000000 | Fondo principal |
| `--bg-secondary` | #0A0A0A | Fondo secciones alternas |
| `--bg-card` | #1A1A1A | Cards, elevated surfaces |
| `--bg-surface` | #121212 | Inputs, modals |
| `--text-primary` | #F0EDE8 | Texto principal (crema) |
| `--text-secondary` | #B8B8B8 | Texto secundario (plata) |
| `--text-muted` | #6B6B6B | Texto deshabilitado |
| `--accent-gold` | #C9A84C | CTA premium, Black tier |
| `--accent-gold-hover` | #D4B85C | Gold hover state |
| `--accent-gold-active` | #B89A3E | Gold pressed state |
| `--accent-red` | #C0392B | Urgencia, alertas, countdown |
| `--accent-red-hover` | #E74C3C | Red hover |
| `--accent-silver` | #B8B8B8 | Botones secundarios |
| `--accent-silver-hover` | #D0D0D0 | Silver hover |
| `--border` | #2A2A2A | Bordes cards/dividers |
| `--border-hover` | #3A3A3A | Bordes hover |
| `--whatsapp` | #25D366 | WhatsApp button |

### Contrast Ratios (WCAG AA)
- #F0EDE8 on #000000 = 17.4:1 (AAA)
- #B8B8B8 on #000000 = 10.1:1 (AAA)
- #C9A84C on #000000 = 6.8:1 (AA)
- #C0392B on #000000 = 4.5:1 (AA)

## Typography Scale

### Font Stack
```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');

--font-display: 'Bebas Neue', sans-serif;    /* Headlines */
--font-body: 'DM Sans', sans-serif;           /* Body, UI */
--font-editorial: 'DM Serif Display', serif;   /* Quotes, accents */
```

### Scale (Mobile → Desktop)
| Token | Mobile | Desktop | Weight | Font |
|-------|--------|---------|--------|------|
| `display-xl` | 48px / 1.0 | 80px / 0.95 | 400 | Bebas Neue |
| `display-lg` | 36px / 1.05 | 64px / 1.0 | 400 | Bebas Neue |
| `display-md` | 28px / 1.1 | 48px / 1.05 | 400 | Bebas Neue |
| `heading-lg` | 24px / 1.2 | 36px / 1.15 | 700 | DM Sans |
| `heading-md` | 20px / 1.3 | 28px / 1.2 | 600 | DM Sans |
| `heading-sm` | 18px / 1.3 | 22px / 1.3 | 600 | DM Sans |
| `body-lg` | 18px / 1.6 | 20px / 1.6 | 400 | DM Sans |
| `body-md` | 16px / 1.6 | 18px / 1.6 | 400 | DM Sans |
| `body-sm` | 14px / 1.5 | 14px / 1.5 | 400 | DM Sans |
| `caption` | 12px / 1.4 | 12px / 1.4 | 500 | DM Sans |
| `quote` | 20px / 1.5 | 28px / 1.4 | 400i | DM Serif Display |

## Spacing (8px Grid)
| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-8` | 48px |
| `--space-10` | 64px |
| `--space-12` | 80px |
| `--space-16` | 128px |

## Breakpoints
| Name | Width | Target |
|------|-------|--------|
| `sm` | 375px | Mobile (base) |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1440px | Wide desktop |

## Borders & Shadows
| Token | Value |
|-------|-------|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-full` | 9999px |
| `--shadow-sm` | 0 1px 3px rgba(0,0,0,0.5) |
| `--shadow-md` | 0 4px 12px rgba(0,0,0,0.6) |
| `--shadow-lg` | 0 8px 24px rgba(0,0,0,0.7) |
| `--shadow-gold` | 0 4px 20px rgba(201,168,76,0.3) |
| `--shadow-red` | 0 4px 20px rgba(192,57,43,0.3) |

## Animation Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 150ms | Hovers, toggles |
| `--duration-normal` | 250ms | Transitions, modals |
| `--duration-slow` | 400ms | Page transitions |
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | Entrances |
| `--ease-in` | cubic-bezier(0.7, 0, 0.84, 0) | Exits |
| `--ease-spring` | cubic-bezier(0.34, 1.56, 0.64, 1) | Bouncy elements |

### Motion Rules
- Respect `prefers-reduced-motion: reduce`
- Only use `transform` and `opacity` for animations (GPU-accelerated)
- Micro-interactions: 150-300ms
- Page transitions: max 400ms
- No continuous decorative animations (except countdown)

## Z-Index Scale
| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | 0 | Default |
| `--z-card` | 10 | Elevated cards |
| `--z-sticky` | 20 | Sticky nav |
| `--z-dropdown` | 30 | Dropdowns |
| `--z-modal` | 40 | Modals, popups |
| `--z-float` | 50 | WhatsApp float, exit popup |

## Components

### Buttons
- **Primary (Gold):** bg #C9A84C, text #000, hover #D4B85C, shadow-gold, radius-md
- **Secondary (Silver):** bg transparent, border #B8B8B8, text #B8B8B8, hover bg #B8B8B8/10%
- **Ghost:** bg transparent, text #F0EDE8, hover bg #F0EDE8/5%
- **CTA (Red urgency):** bg #C0392B, text #FFF, hover #E74C3C, shadow-red
- **WhatsApp:** bg #25D366, text #FFF, radius-full, pulse animation
- Min height: 48px (touch target), padding: 16px 32px
- Font: DM Sans 600, 16px

### Ticket Pricing Cards
- bg-card #1A1A1A, border #2A2A2A, radius-lg
- Highlighted (Black): border-gold #C9A84C, shadow-gold, "Mas Popular" badge
- Price: Bebas Neue display-lg
- Features: check icons, body-sm
- CTA button full-width at bottom

### Countdown Timer
- 4 blocks: dias/horas/minutos/segundos
- Numbers: Bebas Neue display-xl, color #F0EDE8
- Labels: DM Sans caption, color #B8B8B8
- Separator: ":" in red #C0392B
- bg-card with subtle border

### FAQ Accordion
- Trigger: heading-sm, full-width, padding space-4
- Icon: + / - rotation animation 250ms
- Content: body-md, max-height transition
- Divider: border-bottom 1px #2A2A2A

### Testimonial Cards
- Avatar: 48px circle
- Quote: DM Serif Display italic
- Name: DM Sans 600
- Role: DM Sans 400, text-secondary

### Stats Counter
- Number: Bebas Neue display-xl, gold or cream
- Label: DM Sans body-sm, text-secondary
- Animate on scroll (intersection observer)
- Count from 0 to target in 2s

### WhatsApp Float
- Position: fixed, bottom-right, z-float
- Size: 56px circle
- bg #25D366, shadow-md
- Pulse animation (ring expanding)
- Mobile: 16px from edges

### Announcement Bar
- Full-width, fixed top, z-sticky
- bg gradient subtle (dark to slightly lighter)
- Dot animado rojo (pulse)
- Text: body-sm, text-primary
- Height: 40px
- Closeable with X

### Exit-Intent Popup
- Modal centered, z-modal
- bg-card, shadow-lg, radius-xl
- Backdrop: black/80%
- Content: headline + subtext + email input + CTA
- Close button top-right
