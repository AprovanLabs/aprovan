# Stream 5 report: Serve schemas from catalog

## Done

- **5.1** Added `outputs` and `responseUnknown` to `OperationInfo` (`openapi.ts`) and `CatalogOperation` (`catalog.ts`).
- **5.2** Catalog endpoint (`pages/catalog/p/[...path].json.ts`) serves per-status `outputs` from `registry.ts` `extractOperations`, merged with OpenAPI-resolved parameters/request bodies.
- **5.3** `responseUnknown: true` when upstream OpenAPI omits `responses` (635 ops — digitalocean bulk).
- **5.4** "Returns" section in `ProviderExplorer` (operation view) and `SdkExplorer` (active symbol).
- **5.5** Payload measurement (45 provider catalog JSON files):

| Metric | Value |
|--------|-------|
| Before (simulated, no outputs) | 22.21 MB |
| After (with outputs) | 25.83 MB |
| Delta | +3.61 MB (+16.3%) |
| Ops with `responseUnknown` | 635 |
| Ops with ≥1 response schema | 7,970 |

No pagination/trimming needed — growth is proportional and expected.

## Verify

```bash
cd registry && pnpm turbo run build --filter=@aprovan/registry-web
```

Build passes.

## PR

Branch: `iw7/utdk-catalog-outputs`
