# Forge Vault precision scale adjustment

## Goal
Make only the post-purchase Forge Vault interface appear exactly 8% smaller while preserving its current design, hierarchy, behavior, content, and responsive composition.

## Changes
1. Apply a Vault-scoped 0.92 proportional scale to typography, controls, icons, spacing, containers, navigation, and content dimensions.
2. Preserve the available viewport width so scaling does not create blank side space or horizontal overflow.
3. Set only the Open document action to a 12px corner radius after scaling.

## Technical details
Use a Vault-only scale variable and scoped sizing so no public page or affiliate screen changes. Keep all existing breakpoints, colors, motion, and functional code unchanged.

## Verification
Check the authenticated Vault at phone, tablet, and desktop widths for consistent sizing, unchanged composition, correct 12px button corners, and zero horizontal overflow.
