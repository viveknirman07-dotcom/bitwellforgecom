# BitwellForge 3.0 — Enterprise Futurism Redesign

Copy, headings, metrics, service names, and the five-phase model stay byte-identical. Logo and the existing token palette stay locked. Everything changes at the level of structure, space, type scale, surface treatment, and motion.

## Design language

**Space.** Section rhythm moves to a strict vertical scale: 160px desktop / 96px mobile between sections, 64px between a section header and its body. Content locks to a 1280px measure inside a 1440px frame with a visible 1px hairline gutter on each side, so the page reads as an engineered sheet rather than a stack of blocks.

**Type.** Headlines shift from serif display to the existing sans at heavier weight and tighter tracking (-0.03em), sizes 72/56/40/28. Body drops to 15px at 1.75 line height, muted foreground. Eyebrows stay 10px / 0.28em uppercase in the locked accent. Serif italic is retained only as the single accent word per headline, unchanged in wording.

**Surface.** Three depths only:
1. Page ground (background token)
2. Panel: `background/60` + `backdrop-blur-xl` + 1px `border/40` hairline — the glassmorphic card
3. Emphasis: panel + a 1px inner top highlight and a 40px accent glow at 8% opacity

**Accent glow.** A reusable `--glow-accent` shadow token built from the locked accent hue, applied to the primary CTA, active nav state, live diagram nodes, and counter digits on reveal.

**Grid field.** A single global background component: a 64px hairline grid with a slow radial mask that follows scroll, plus 6 abstract network nodes with travelling signal paths. GPU-only (transform/opacity), disabled under reduced motion. It sits behind the hero and re-emerges at low opacity behind the Process track.

## Layout architecture

```text
HEADER   [logo] ................................ nav · nav · nav  [ CTA glow ]
HERO     eyebrow
         massive headline (2 lines, left)
         description (max 52ch)          |  right rail: 4 hairline stat ticks
         CTAs
         ── full-bleed cinematic media plate (16:9, 45-60s brand film) ──
PROBLEM  section header left · 3-up hairline grid, no card borders
SOLUTION 4-part modular grid, glass panels, hover reveals detail layer
OUTCOMES 4 large digital counters on a hairline rail
VOICES   3 executive quotes + 15s vertical/square film block (9:16) inline
PROCESS  01–05 horizontal engineering track (vertical on mobile)
FORMATS  3 columns, hairline separated
FAQ      two-column: title left, accordion right
CTA      centred, maximum negative space
FOOTER   4-column sitemap, hairline top rule, silent
```

## Section specifics

**Header.** Height 72px, `background/70` + blur, hairline bottom border only after scroll. Nav items get a 2px accent underline that wipes in from left. The "Book Infrastructure Audit" CTA becomes a pill with the accent glow and a hover glow ramp.

**Hero.** Left-weighted, 60/40 split. The headline occupies its own line box with no decoration. A right-hand rail shows four hairline-separated micro stats (existing values only). Below the fold, a full-bleed cinematic plate: 16:9, hairline frame, custom minimal controls (play glyph, scrub hairline, mute, fullscreen) that fade out after 2s of inactivity. Poster-first, lazy loaded, no third-party chrome.

**Problem.** Three columns divided by 1px vertical hairlines rather than cards. Each: minimal abstract glyph, title, body, existing diagram below at reduced visual weight so the type leads.

**Solution.** 2×2 modular grid of glass panels. Default state shows tag, title, body. On hover/focus the panel lifts 4px, the accent glow ramps, and a detail layer (existing channel/detail text and the existing diagram) cross-fades in. Keyboard focus triggers the same state.

**Outcomes.** Counters rendered at 88px, tabular numerals, counting on scroll into view with an accent glow that decays after the count settles. Labels stay 11px uppercase beneath a hairline.

**Voices.** Quotes in large light type on a glass panel with a premium avatar treatment (circular, hairline ring, accent glow on hover). Beside them, the 15s promotional film in a 9:16 block with the same minimal control set.

**Process.** A horizontal track with 01–05 nodes on a hairline spine. The spine draws in on scroll; each node pulses once as it activates, then holds a slow breathing glow. Content stays exactly as written. Mobile reflows to a vertical spine with the same behaviour.

**Footer.** Four columns, hairline top rule, no gradients, no decorative marks. Final CTA sits above it with 200px of clearance.

## Motion

- Reveal: 24px rise + opacity, 700ms, cubic-bezier(0.22, 1, 0.36, 1), 80ms stagger
- Hover: 200ms transform/opacity only
- Diagram signals: continuous 8–14s loops, opacity/transform only
- Everything gated behind `prefers-reduced-motion`

## Technical notes

- New tokens in `src/index.css`: `--glow-accent`, `--panel`, `--hairline`, `--space-section`, plus a `.glass-panel`, `.hairline-x/y`, and `.glow-cta` utility layer. No new colours — all derived from locked hue variables.
- `tailwind.config.ts`: extend `boxShadow.glow`, `backdropBlur`, and the type scale. Heading font stack switches to the existing body sans; the serif stays registered for accent words.
- New components: `src/components/media/CinematicPlayer.tsx` (16:9 + 9:16 variants, custom controls, poster, lazy), `src/components/GridField.tsx` (global background), `src/components/ui/GlassPanel.tsx`.
- Rewritten for layout only: `Index.tsx`, `Header.tsx`, `Footer.tsx`, `ProblemCard.tsx`, `ServiceFeature.tsx`, `HowEngagementsWork.tsx`, `EngagementFormats.tsx`, `StatCounter.tsx`, `QuoteCard.tsx`.
- Video sources: the players ship with poster placeholders and accept a `src` prop, so the brand film and the 15s promo drop in without further layout work.
- Verified in both light and dark mode, at 375 / 768 / 1440, with a typecheck pass.
