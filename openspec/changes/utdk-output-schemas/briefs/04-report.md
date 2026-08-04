# Stream 4 report: Regenerate providers

## Coverage baseline (stream 7)

Recorded in `registry/packages/utdk/response-schema-coverage.json`.

| Metric | Before | After |
|--------|--------|-------|
| Total operations | 9,450 | 9,450 |
| With schema | 7,721 | 7,330 |
| No-content (`undefined`) | 0 | 590 |
| Streaming | 0 | 4 |
| Unknown | 1,729 | 1,526 |
| **Known coverage** | **81.7%** (7,721) | **83.9%** (7,924) |

`withSchema` dropped because ~590 operations moved from erroneous error-body types to explicit `undefined` (204/205 no-content). Net known coverage rose 2.2pp.

Stream 7 (digitalocean `$ref` resolution) targets ~83.9% → ~89%.

## Regeneration

- 47 OpenAPI providers regenerated via `generateRegistryTypes` against shipped `openapi.json` + docs augment.
- 645 return-type line changes across 24 providers vs `main`.
- Top movers: openai (148), spotify (96), jira (74), launchdarkly (61), front (60), discord (55).

## Test

`packages/bundler/src/provider-output-schemas.test.ts` — walks all registry providers and asserts no operation return type matches a substantive non-2xx response body.

## Verify

```bash
cd registry
pnpm --filter @utdk/clients build
NODE_OPTIONS=--max-old-space-size=8192 pnpm --filter @aprovan/utdk-bundler test
```
