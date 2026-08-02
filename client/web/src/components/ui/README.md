# components/ui — canonical primitive source

These vendored shadcn copies are the canonical source for all app-shell UI
primitives in `client/web` (`Button`, `Badge`, `Input`, `Card*`, `Avatar*`,
`Collapsible*`, `ScrollArea`, `Separator`, …). New code imports them from
`@/components/ui/*`.

Never import the bare `@aprovan/ui` root specifier — its primitive exports are
declared but unused here and are out of scope. Subpath imports
(`@aprovan/ui/auth`, `/gateway`, `/shell`, `/apps-store`) provide
non-duplicated functionality and remain fine.

Mechanical check: `grep -rn 'from "@aprovan/ui"' client/web/src` must return
zero results.
