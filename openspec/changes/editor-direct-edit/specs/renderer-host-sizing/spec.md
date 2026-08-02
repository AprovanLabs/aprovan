## ADDED Requirements

### Requirement: Renderers negotiate size with the host pane
The renderer registry contract (`packages/registry-ui/src/renderers.tsx`) SHALL carry a host
sizing mode to rendered components — `fill` (host pane owns the height; renderer fills it and
scrolls internally) or `inline` (host provides a bounded container; renderer sizes to content
within it). `RenderedView` SHALL accept and forward the mode, and registered renderers SHALL
honor it.

#### Scenario: Fill mode in a tab pane
- **WHEN** a renderer is mounted in a host pane with `fill`
- **THEN** it occupies the pane's height and scrolls internally, with no gap below and no
  overflow outside the pane

#### Scenario: Inline mode in chat
- **WHEN** a renderer is mounted inline in a message
- **THEN** its height is bounded by the host-provided container, not by renderer-internal
  viewport units

### Requirement: No hardcoded viewport-height floors or caps in renderers
Renderer and preview components SHALL NOT hardcode viewport-relative height floors/caps
(`min-h-[..vh]`, `max-h-[..vh]`) for their overall body sizing; bounds come from the host.
This includes `CodePreview` (`min-h-[50vh]`/`max-h-[75vh]`, `max-h-[60vh]`), `MediaPreview`,
and `apps-panel`'s `md:max-h-[70vh]` fallbacks.

#### Scenario: Grep gate
- **WHEN** `packages/editor/src/components` and `packages/registry-ui/src` are searched for
  `vh]` class literals in renderer body sizing
- **THEN** no hardcoded viewport-height floor/cap remains on renderer/preview body elements

#### Scenario: Small widget in chat is not inflated
- **WHEN** a short widget renders inline in a message
- **THEN** it takes its natural height (no 50vh minimum inflating it)

#### Scenario: Tall widget in a pane is not clipped at an arbitrary cap
- **WHEN** a tall widget renders in a fill-mode pane
- **THEN** it uses the full pane height and scrolls internally, rather than stopping at a
  75vh cap
