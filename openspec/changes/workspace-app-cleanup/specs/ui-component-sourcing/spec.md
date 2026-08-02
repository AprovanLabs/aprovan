## ADDED Requirements

### Requirement: Vendored shadcn copies are the canonical primitive source
All shadcn-style UI primitives used inside `client/web/src` (`Button`, `Badge`, `Input`,
`Card`/`CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`, `Avatar`/
`AvatarFallback`, `Collapsible`/`CollapsibleContent`/`CollapsibleTrigger`, `ScrollArea`,
`Separator`) SHALL be imported from `@/components/ui/*`, never from the bare `@aprovan/ui`
package specifier.

#### Scenario: No bare `@aprovan/ui` imports
- **WHEN** searching `client/web/src` for import statements
- **THEN** there SHALL be zero occurrences of a bare `from "@aprovan/ui"` import (i.e. the
  package's root export)

#### Scenario: Subpath imports of `@aprovan/ui` remain unaffected
- **WHEN** a file imports from `@aprovan/ui/auth`, `@aprovan/ui/gateway`,
  `@aprovan/ui/shell`, or `@aprovan/ui/apps-store`
- **THEN** that import SHALL remain unchanged — this requirement governs only the unused
  root-export primitives, not the subpath modules that provide non-duplicated functionality

### Requirement: Apps-catalog layering is documented, not duplicated
`@aprovan/registry-ui/apps-panel`'s apps-catalog exports (`AppsCatalogProvider`,
`useAppsCatalog`, `LastRunProvider`, `useLastRun`) are re-exports of
`@aprovan/ui/apps-store`'s implementation, not an independent one. New code SHALL pick
whichever entry point matches the layer it operates at, and SHALL NOT introduce a third,
parallel implementation of apps-catalog state.

#### Scenario: New apps-catalog consumer picks an existing entry point
- **WHEN** a new file needs apps-catalog/last-run state
- **THEN** it SHALL import it from either `@aprovan/ui/apps-store` (data layer) or
  `@aprovan/registry-ui/apps-panel` (presentational re-export), and SHALL NOT define a new
  local implementation of the same concept
