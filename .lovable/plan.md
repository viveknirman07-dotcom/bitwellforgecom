# BitwellForge Homepage Revamp

## Goal
Rework the public homepage into a more focused corporate luxury experience built around commercial architecture, without changing the private post-purchase Vault portal.

## Structural wireframe

```text
Global header
  BitwellForge
  Services | Case Studies | The Vault | Book Audit

Homepage
  01 Hero: engineering compounding systems
  02 Structural constraints: three failure patterns
  03 Commercial architecture: four connected disciplines
  04 Outcomes: verified-proof placeholders, never invented claims
  05 The Forge Vault: FounderOS | Client Acquisition OS | Forge Vault
  06 Client perspectives
  07 How engagements work
  08 Engagement formats
  09 Letter from the Architect
  10 Our Thesis vs. The Industry
  11 Book Infrastructure Audit

Global footer
  About | Insights | Careers | Contact
  Services | Case Studies | The Vault
```

## Refined section copy

### Hero
Preserve the approved headline and approved SEO paragraph exactly. Keep the two existing calls to action and current motion sequence.

### Structural constraints
**Eyebrow:** What Is Actually Broken

**Heading:** Most businesses do not have a growth problem. They have an architecture problem.

**Support:** Commercial drag rarely begins with a lack of effort. It begins where positioning, acquisition, sales, and delivery stop reinforcing one another.

Keep the existing three diagnostic themes: leaking pipelines, single-channel dependency, and absent feedback intelligence.

### Commercial architecture
**Eyebrow:** What We Build

**Heading:** Four commercial disciplines. One compounding growth engine.

**Support:** Strategy determines the system. Acquisition creates qualified movement. Revenue architecture converts it. Operations preserve the gain.

Keep the existing four services and their diagrams.

### Outcomes
**Eyebrow:** Outcomes

**Heading:** Evidence belongs to the system, not the presentation.

Use clearly marked proof fields until source evidence is approved:

`[Verified ROI]` — Return on commercial investment

`[Verified hours reclaimed]` — Founder capacity recovered

`[Verified revenue outcome]` — Revenue influenced within 30 days

`[Verified pipeline lift]` — Qualified opportunity density

No zero values and no fabricated client results will be published.

### The Forge Vault
**Eyebrow:** The Forge Vault

**Heading:** The operating intelligence behind a stronger commercial system.

**Support:** For founders who prefer to build with precision, the Vault turns BitwellForge methodology into structured frameworks, implementation sequences, and working assets.

**FounderOS:** A decision system for priorities, operating cadence, and founder leverage.

**Client Acquisition OS:** A sequenced infrastructure for positioning, outreach, qualification, and pipeline control.

**Forge Vault:** The complete commercial library, including the Blueprint, 31-module Operating System, and 44-asset Toolkit.

**Primary action:** Enter The Forge Vault

**Secondary action:** View what is included

### Letter from the Architect
**Eyebrow:** From the Founder

**Heading:** Campaigns expire. Architecture keeps producing.

**Body:** Most commercial problems are treated as isolated execution gaps. A new channel is added. A campaign is launched. A tool is purchased. Activity rises, but the underlying constraints remain. BitwellForge exists to solve the system beneath the symptoms: the decisions, dependencies, and operating structures that determine whether growth can repeat. The objective is not more motion. It is a commercial architecture that continues to create leverage after the engagement ends.

**Signature:** Founder, BitwellForge

No invented biography, credentials, or client claims will be added.

### Our Thesis vs. The Industry
**Eyebrow:** Our Thesis

**Heading:** Tactics create activity. Architecture creates continuity.

| The Industry | BitwellForge |
| --- | --- |
| Manual effort | Automated operating leverage |
| Isolated campaigns | Connected commercial systems |
| Channel-first decisions | Constraint-first diagnosis |
| Short-term activity | Compounding infrastructure |
| Vendor dependency | Client-owned capability |

Closing line: The difference is not how much gets done. It is whether each action strengthens the system that follows.

### Final action
Retain **Book Infrastructure Audit** as the primary conversion action.

## Layout and CSS directives

### Visual system
Use the existing semantic theme tokens rather than hardcoded component colors. The dark presentation should read as deep matte black, warm ivory, and restrained champagne-gold accents. Light mode remains supported through the existing token system.

### Grid
Use the current 1400px page measure and section gutters. Build the Vault section on a 12-column grid with editorial copy spanning five columns and three product rows spanning seven. Stack at tablet width without horizontal overflow.

Build the founder letter as a restrained two-column editorial band: short heading and signature on the left, letter copy on the right. Do not place it inside a decorative card.

Build the thesis comparison as one bordered two-column field, not nested cards. Align every comparison row to a shared baseline and collapse to labeled stacked rows on mobile.

### Vault presentation
Use a dark full-width band with a subtle architectural grid and a CSS data-flow layer. Reserve an aspect-ratio-stable media field for a future 4K WebGL scene; render a lightweight CSS/SVG infrastructure visualization now so the page never shows an empty placeholder.

### Motion
Keep animation limited to opacity and transform. Use measured staggered reveals, slow signal travel through the data-flow visual, and restrained button/icon movement. Preserve the existing reduced-motion behavior and Lenis scrolling. Do not animate layout properties.

### Components
Use the existing button and navigation patterns. Keep cards at 8px radius or less. Avoid nested cards, decorative gradient orbs, oversized pills, and unrelated visual effects.

### Responsive behavior
Desktop uses the full 12-column composition. Tablet stacks complex split sections while preserving hierarchy. Mobile uses one column, touch targets of at least 44px, stable diagram aspect ratios, and no clipped type or horizontal scrolling.

## Implementation scope

1. Simplify the shared header and add the requested footer destinations.
2. Replace the homepage FAQ and FAQ schema with the thesis comparison and suitable organization/service schema.
3. Add the Forge Vault and founder letter sections using focused homepage components.
4. Replace any zero or unverified numerical outcome presentation with explicit verified-proof placeholders.
5. Preserve the approved hero headline, approved hero paragraph, SEO title, meta description, private Vault portal, and all unrelated pages.
6. Verify desktop, tablet, and mobile in light and dark modes, including navigation, scrolling, reduced motion, overflow, and build status.
