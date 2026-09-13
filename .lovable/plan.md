# Homepage Services Architectural Matrix

## Build

Replace the current alternating homepage service rows with one precise architectural matrix based on the selected direction.

Preserve every existing service title, category, description, diagram, service destination, and surrounding homepage content.

Create four full service cells with prominent serif titles, compact technical labels, integrated diagrams, and clear whole-cell navigation.

Keep the matrix legible in both light and dark modes, with one column on phones, two on tablets, and four on wide screens.

Use restrained transform and opacity interactions only, with keyboard focus and reduced-motion support.

## Technical details

Refactor `ServiceFeature` into a semantic linked matrix cell and update only the homepage service composition in `Index.tsx`.

Use existing semantic color and typography tokens, existing diagrams, existing reveal system, and existing service routes.

Validate all links, light and dark appearance, reduced motion, overflow, and responsive layouts at phone, tablet, and desktop widths.
