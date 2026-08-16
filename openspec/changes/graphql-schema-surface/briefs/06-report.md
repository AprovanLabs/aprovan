# Report: 06 — Provider schema/version lint (task 5.4)

## PR

https://github.com/AprovanLabs/registry/pull/169 — squash-merged to registry
main. Touches `packages/bundler/src/provider.ts` (+ its test) —
`loadRegistryProviders` / `assertValidSchemaFiles` is the existing
validation seam for registry data, so the lint runs wherever providers are
loaded.

## Verify

`pnpm --filter @aprovan/registry-server test -- profiles` → 36/36 pass.
Break-one-provider demonstration (both restored before commit):

- `schemas/` without `defaultVersion` →
  `Provider "github" has a schemas/ directory but declares no
  defaultVersion in data/registry.json — add defaultVersion to name the
  schema that unversioned callers resolve to.`
- declared `apiVersions: ["v3","v4"]` with only `schemas/v3.graphql` →
  `Provider "github" declares apiVersion "v4" but has no schema file at
  schemas/v4.graphql — add the file or remove the version from apiVersions.`

Catalog drift found: none (`linear` is the only schema provider today and is
unversioned; the lint is a no-op for it).

## Deviations

1. Rule "declared version must have a schema file" is gated on the
   `schemas/` directory existing — an unconditional rule would have broken
   stream 5's synthetic-data test ("accepts a provider declaring a
   consistent apiVersions/defaultVersion pair"). Semantics: once a provider
   ships schemas, every declared version must have one. Trade-off commented
   in the test.
2. `loadRegistryProviders` gained an optional `outputRoot` parameter
   (defaults unchanged) so filesystem checks are testable — backward-
   compatible, the only API change.
