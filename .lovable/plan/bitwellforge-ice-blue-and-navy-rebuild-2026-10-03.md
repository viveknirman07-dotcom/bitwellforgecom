# BitwellForge ice blue and navy rebuild

## Direction

The latest brief replaces the midnight, lime, and cobalt direction. The site moves to pale ice blue (#CEE6F8) backgrounds with deep navy (#050A30) text, dark sections, buttons, and footer. On navy surfaces, text is white or ice blue. The structure takes cues from large strategy firm sites: sticky header, mega menus, an editorial hero, a featured case study band, numbered insight grids, and a large footer. All copy, layouts, and imagery are BitwellForge's own. No text, images, or brand marks are copied from the reference site.

## What will change

### Header
A sticky header with BitwellForge wordmark, mega menus for Services and Insights, a search field that filters insights, and a region label reading "Global, remote delivery". It becomes solid navy glass on scroll. On mobile it opens a full screen menu. Every current destination stays, including Careers and Vault.

### Homepage
1. Hero: the approved headline and description, a scroll triggered reveal, a cinematic photo with soft parallax, and the "Book Infrastructure Audit" action
2. Featured case study band: large photo with a summary of a real BitwellForge study, labelled Concept Study where it applies
3. Perspectives grid numbered 01 Insight, 02 Trends, 03 Operations, and so on, built from the existing insight library
4. Expertise panels that link to the current service pages, each with a photo
5. Closing conversation band in navy

### Diagrams to photos
Every diagram and chart on the homepage, Services, service detail, and Process pages is replaced with a generated photo in the same frame size, graded blue to match the palette.

### Footer
Navy footer with link columns, business@ and support@ contacts, social links, privacy notice, and a cookie settings link. Columns fold into accordions on mobile.

### Typography and motion
Serif headings, sans serif body, 1.6 line height, type that scales smoothly between screen sizes. Fade up reveals, hover image zoom, arrows that slide on hover, and gentle parallax, with reduced motion support.

## Unchanged
Checkout, pricing, Forge Vault portal, sign in, affiliates, approved SEO title and description, favicon, and email roles.

## Technical details
Swap semantic tokens in index.css and tailwind config for both themes. Generate about 10 photos into src/assets. Build header, footer, and homepage from small data driven components. Use transform and opacity motion only, keep 44px tap targets, and keep a 1440px max width with 3, 2, and 1 column grids. Check phone, tablet, and desktop with Playwright for overflow and contrast.
