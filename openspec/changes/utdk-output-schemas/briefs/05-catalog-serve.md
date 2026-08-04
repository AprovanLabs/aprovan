# Brief: Serve schemas from catalog (utdk-output-schemas stream 5)

## Mission
Expose per-status `outputs` + `responseUnknown` on catalog operations; render a Returns
section; measure payload size.

## Read first
tasks.md stream 5; depends on stream 3 merged.

## Tasks
Stream **5** (5.1–5.5) verbatim.

## Acceptance criteria
### Catalog serves response schemas / Coverage is measurable scenarios from provider-output-schemas

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/registry-web build
```

## Git workflow
- Branch: `iw7/utdk-catalog-outputs` after stream 3 on main
- Touches: `apps/registry/src/lib/openapi.ts`, `lib/registry.ts`,
  `pages/catalog/p/[...path].json.ts`, `components/{ProviderExplorer,SdkExplorer}.tsx`
- Open PR; do not merge. Parallel-safe with streams 4 and 6.

## Report back
`briefs/05-report.md`
