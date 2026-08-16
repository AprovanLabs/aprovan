# Report: stream 5 — publish @utdk/* and @aprovan/registry-server

**Status:** done (published via CI after merge)  
**PR:** https://github.com/AprovanLabs/registry/pull/166 (merged)  
**CI:** Publish Packages to NPM run `31603250346` — success

## Preconditions confirmed

`origin/main` included streams 2/3/4 before this work:

| Stream | PR | Merge commit |
|--------|----|--------------|
| 2 handwritten effects | [#163](https://github.com/AprovanLabs/registry/pull/163) | `c392f5f` |
| 3 resource grants | [#164](https://github.com/AprovanLabs/registry/pull/164) | `a702273` |
| 4 OpenAPI regen | [#165](https://github.com/AprovanLabs/registry/pull/165) | `f808dc3` |

## Exact published versions (stream 6 must pin)

| Package | Version | Notes |
|---------|---------|-------|
| **`@aprovan/registry-server`** | **`0.2.11`** | Pin target for 6.1 (`^0.2.11` or `^0.2.10` → bump). Carries `matchesResourcePattern`, `ResourceGrantRow` (via storage re-exports). |
| **`@utdk/clients`** | **`0.1.3`** | Pin target for 6.2. Ships regenerated OpenAPI provider `effect` metadata in `dist/*/metadata.js` (verified: github metadata contains `"effect"`). |

Verified:

```text
npm view @aprovan/registry-server version  → 0.2.11
npm view @utdk/clients version             → 0.1.3
```

`0.2.11` is strictly above `0.2.10` and **not** in deprecated `0.2.4–0.2.6`.

## What was bumped (Touches only)

- `packages/registry-server/package.json` → `0.2.11`
- `packages/registry-server/CHANGELOG.md` (new)
- `packages/utdk/package.json` (`@utdk/clients`) → `0.1.3`

Local npm auth (`~/.npmrc`) is 401; publish used existing registry practice: merge to `main` → CI `publish.yml` with `NPM_TOKEN`.

## Deviations / delivery notes

1. **OpenAPI providers ship via `@utdk/clients`, not per-package `@utdk/github` etc.**  
   CI publish list does not include individual OpenAPI provider packages. `npm view @utdk/github version` still shows the old date-stamped line (`1.1.4-20260407.6-dev…`). Stream 4 already bumped per-provider `packages/utdk/*/package.json` versions in-tree; those standalone packages were **not** republished. Aprovan consumes providers through `@utdk/clients` today — pin **`@utdk/clients@0.1.3`**.

2. **Stream 2 contract packages not republished (outside Touches).**  
   Effect annotations landed under `packages/contracts/**` (`@utdk/agent@0.2.0`, `@utdk/llm@0.2.0`, …) with **no version bump**, so CI skipped them. Follow-up bump/publish needed if stream 6/7 require those contract packages’ npm artifacts to carry `effect`.

## Carryovers (later streams — do not expand this stream)

- `createRegistryServer` still needs `resourceGrants` injected into `Dispatcher` (`server.ts` — C3 deviation).
- `discovery.ts` may still strip `effect` on the wire (C2 note) — likely stream 7.
- Contract `@utdk/*` effect annotations unpublished until version bumps under `packages/contracts/**`.
