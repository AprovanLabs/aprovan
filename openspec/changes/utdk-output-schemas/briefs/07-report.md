# Stream 7 report: Re-bundle digitalocean

## Coverage delta

| Metric | Before (stream 4) | After (stream 7) |
|--------|-------------------|------------------|
| Total operations | 9,450 | 9,474 |
| With schema | 7,330 | 7,874 |
| No-content (`undefined`) | 590 | 700 |
| Streaming | 4 | 9 |
| Unknown | 1,526 | 891 |
| **Known coverage** | **83.9%** (7,924) | **90.6%** (8,583) |

Target was ~83.9% → ~89%; landed at **90.6%** (+6.7pp).

Recorded in `registry/packages/utdk/response-schema-coverage.json`.

## digitalocean

| | Before | After |
|--|--------|-------|
| Operations | 635 | 659 |
| Ops with `responses` | 0 | 659 |
| Return `unknown` | 635 | 0 |
| With schema / no-content / streaming | — | 544 / 110 / 5 |

## Approach

Upstream multi-file GitHub source (`specification/DigitalOcean-public.v2.yaml`) leaves every operation as an external `$ref` to `resources/**/*.yml`. Pointed `data/registry.json` at DigitalOcean's published bundled CDN artifact:

`https://api-engineering.nyc3.digitaloceanspaces.com/spec-ci/DigitalOcean-public.v2.yaml`

Then ran bundler `generateRegistryTypes` + docs augment + ship (not clients transpile alone).

## Verify

```bash
pnpm --filter @utdk/clients build
NODE_OPTIONS=--max-old-space-size=8192 pnpm --filter @aprovan/utdk-bundler test
```

`provider-output-schemas` passed. One pre-existing catalogue test failure (`dynamodb-kv`, `sqs` uncatalogued) is unrelated.

## Blockers

None — upstream bundled spec was available. GitHub push protection flagged DigitalOcean's placeholder Slack webhook example URLs in `openapi.json`; replaced with `https://example.com/slack/webhook` before push (types unchanged).
