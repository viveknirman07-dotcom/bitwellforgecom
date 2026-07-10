- BitwellForge — Design Evolution Plan

A refinement pass (not a redesign) that elevates the site into a unified, engineered, executive-consulting experience. Preserves brand identity, palette, typography, motion register, and layout philosophy already established.

---

## 1. Master Visual Language (Anchor)

Adopt Process **Stage 04 (Activate)** and **Stage 05 (Optimize)** as the canonical illustration standard. Reverse-engineer their language into a shared primitive layer so every remaining diagram inherits it without copying it.

**Shared primitives to formalise** (new file `src/components/diagrams/primitives.tsx`):

- `BlueprintFrame` — borderless container, internal 12px grid backdrop (opacity 0.14–0.18), corner tick marks, meta ribbon slot (small caps label + framework tag)
- `Node`, `HubNode`, `TerminalNode` — consistent radii (r=6/8/12), 0.6–0.8 stroke, subtle inner highlight
- `Rail`, `Bus`, `SignalPath` — 0.5–0.7 stroke weights, dash cadence `5 5` for latent, solid for live
- `TravellingSignal` — reusable animated dot along any path (SMIL animateMotion), staggered
- `Pulse`, `Breath` — perpetual r/opacity oscillation
- `MicroLabel` — 5–5.5px DM Sans, letter-spacing 0.5, opacity 0.55–0.65

All colours drawn from existing `--svg-stroke / --svg-accent / --svg-highlight / --svg-secondary / --svg-fill / --svg-text` tokens so light + dark mode remain honest with zero new palette.

**Global rules baked into primitives:**

- No decorative outlines. Only structural blueprint lines.
- Illustration container is borderless — no card frame, no drop shadow.
- Everything animates perpetually, slowly (3–9s cycles), GPU-only (transform/opacity).
- Respect `prefers-reduced-motion` (already global).
- All illustrations scaled ~+1%, internal labels ~+0.6% (fontSize 5→5.03 rounded to 5, so we bump to 5.5 where text is <6 and 6.5 where <7 for the visibility lift).

---

## 2. Illustration Redesigns

Each diagram gets a unique geometry expressing its section's meaning. All share the primitives above.

**Homepage — Problem Diagrams** (`src/components/home/ProblemDiagrams.tsx`)

- `LeakyFunnel` → pipeline attrition with staged gates and downward drop signals *(keep concept, rebuild on primitives, remove residual card look)*
- `ChannelWire` → single dominant rail with starved satellites + fracture pulse
- `FeedbackLoop` → forward path lit, return path broken with X marker + fading return particles

**Homepage — Service Visuals** (`src/components/home/ServiceVisuals.tsx`)

- `DemandGraph` → 4 outer channel nodes → central pipeline hub with orbiting qualified-lead ring
- `RevenueFunnel` → horizontal stage bars with conversion percent floats
- `PositioningMatrix` → 2×2 differentiation matrix with orbiting "You" node in top-right quadrant
- `AutomationFlow` → lead → AI-score → decision diamond → nurture/route → close, with travelling packets

**Services page** (`src/components/services/ServiceVisuals.tsx`) — 8 service diagrams, one per module, each with distinct topology (radial, layered, matrix, mesh, spine, orbital, dendritic, lattice). Same primitives, no reuse of geometry.

**About — Revenue Architecture** (`src/components/about/RevenueArchitecture.tsx`) — refined to inherit BlueprintFrame; remove any residual card border.

**Process — Stages 01–03** — restyle to match 04/05 (04 & 05 remain untouched as the master).

**Case Studies cards** — audit for stray borders and align diagram framing.

---

## 3. Border & Container Audit

Sweep the whole site for accidental container borders around illustrations:

- `diagram-frame` in `src/index.css` — strip any border/ring, keep only grid backdrop utility
- `PanelFrame`, `ProblemCard`, `ServiceFeature`, service detail visuals
Only intentional blueprint lines survive.

---

## 4. Homepage Copy Rewrite

Rewrite hero, section eyebrows, section headlines, sub-headings, body, microcopy, and CTAs in `src/pages/Index.tsx` and any homepage subcomponents that carry copy (`EngagementFormats`, `HowEngagementsWork`, hero components).

**Tone:** premium consulting, confident, restrained. No sales language.

**Language shift:** reduce repetition of *system / systems / infrastructure*. Broaden to: Commercial Growth, Client Acquisition, Growth Strategy, Revenue Growth, Market Positioning, Demand Generation, Outbound, Business Development, Authority Building, Performance Marketing, Digital Visibility, Automation, Execution, Commercial Excellence.

**Preserve site-wide rules from memory:**

- No dashes, no bullet points in prose
- Serif headings, sans-serif body
- "Book Infrastructure Audit" remains the primary CTA (per Core memory)

Hero headline reframes BitwellForge as a commercial growth consultancy delivering multiple specialised services, not a single systems shop.

---

## 5. Design System Consistency Pass

Standardise across all pages:

- Section vertical rhythm: `py-24 md:py-32` for major sections, `py-16 md:py-20` for sub-sections
- Eyebrows: `text-[10px] tracking-[0.28em] uppercase text-gold`
- Section headlines: `font-heading text-3xl md:text-[44px] lg:text-[52px] font-semibold tracking-tightest`
- Card radius: unify to `rounded-none` for blueprint surfaces, `rounded-sm` where cards persist
- Line weights on borders: `border-gold/15` structural, `border-gold/30` accent
- Hover: `transition-all duration-300 ease-out` baseline
- Buttons: verify Primary/Ghost variants render identically across pages

---

## 6. Micro-interactions

- Nav links: refined underline sweep (already `story-link`), verify on all headers
- Buttons: subtle magnetic scale on hover (max 1.02), 200ms
- Cards: `translateY(-2px)` + border highlight on hover
- Scroll reveals: unify timing to 700ms ease-out, 60px offset
- Page transitions: keep existing PageTransition, verify no jank

---

## 7. QA Checklist (before shipping)

- Every illustration animates perpetually, no static states
- No stray borders on diagram containers
- Light + dark mode contrast verified on every diagram
- Mobile: no clipping, illustrations scale to container, labels legible
- No dashes / bullets introduced in new copy
- All CTAs route correctly, all links clickable
- Build passes, no console errors

---

## Technical Section

**New files**

- `src/components/diagrams/primitives.tsx` — shared SVG primitives, animation helpers, BlueprintFrame

**Edited files**

- `src/components/home/ProblemDiagrams.tsx` — rebuild on primitives
- `src/components/home/ServiceVisuals.tsx` — rebuild on primitives
- `src/components/services/ServiceVisuals.tsx` — 8 unique diagrams on primitives
- `src/components/about/RevenueArchitecture.tsx` — reframe on primitives
- `src/components/process/StageVisuals.tsx` — restyle Stages 01–03 only
- `src/components/home/ServiceFeature.tsx` — strip diagram frame border
- `src/index.css` — clean `diagram-frame` utility, unified transitions
- `src/pages/Index.tsx` + homepage copy components — full copy rewrite
- `src/components/home/EngagementFormats.tsx`, `HowEngagementsWork.tsx` — copy refresh

**Preserved untouched**

- Process Stage 04 & 05 visuals (master reference)
- Palette, tokens, fonts, routing, business logic, Careers, Insights content, Services data model, contact flow   
  
Before implementing, incorporate the following additional non-negotiable design requirements into the execution plan.
  ==================================================
  1. VISUALS MUST TELL A STORY
  Every illustration should communicate the section's meaning instantly.
  A visitor should understand approximately 70–80% of the concept by looking at the visual alone, even before reading the copy.
  Illustrations must not feel decorative.
  They must function as explanatory commercial diagrams.
  ==================================================
  2. ABSOLUTELY NO AI-GENERATED LOOK
  Do not generate visuals that resemble common AI website illustrations.
  Avoid:
  generic nodes
  random connecting lines
  meaningless geometry
  repetitive layouts
  stock-looking diagrams
  Everything must feel handcrafted by a senior product designer.
  ==================================================
  3. EVERY VISUAL MUST BE UNIQUE
  No two illustrations should share the same structure.
  Every section should have its own geometry, flow direction, rhythm, hierarchy and storytelling.
  Even if they share the same design language, they must never feel duplicated.
  ==================================================
  4. MOTION MUST HAVE PURPOSE
  Every animation should communicate something.
  Signal movement.
  Decision flow.
  Optimization.
  Feedback.
  Growth.
  Routing.
  Qualification.
  Authority.
  Never animate purely for decoration.
  ==================================================
  5. HIGHEST VISUAL QUALITY
  Every SVG should look like it belongs inside Figma's best enterprise product showcases.
  Extremely crisp.
  Perfect alignment.
  Pixel-perfect geometry.
  Perfect stroke consistency.
  Perfect spacing.
  No rough edges.
  ==================================================
  6. POLISH PASS
  After implementation, perform one final polishing pass.
  Refine every visual until there are no obvious imperfections.
  Adjust alignment.
  Adjust animation timing.
  Adjust spacing.
  Adjust hierarchy.
  Adjust contrast.
  Adjust typography.
  Adjust SVG balance.
  Do not stop after the first implementation.
  Keep refining until the entire experience feels intentional and production-ready.
  ==================================================
  7. DO NOT SACRIFICE QUALITY FOR SPEED
  Take the time necessary to achieve the highest possible quality.
  Prioritize craftsmanship over implementation speed.  
    
  Every illustration should react subtly to user interaction.
  On hover:
  • nodes softly respond
  • travelling signals accelerate slightly
  • highlighted routes become brighter
  • blueprint grids gain subtle depth
  On scroll:
  • diagrams reveal progressively
  • signals continue travelling naturally
  The illustrations should feel interactive without becoming distracting.

---

Approve and I'll execute in one pass.