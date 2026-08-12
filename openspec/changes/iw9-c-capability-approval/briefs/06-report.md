# Report: stream 6 — aprovan dependency pin bump

**Status:** done  
**PR:** https://github.com/AprovanLabs/aprovan/pull/237  
**Pin commit:** `chore(workspace): pin registry-server 0.2.11 and utdk clients 0.1.3`

## Exact pins landed

| Package | Before | After |
|---------|--------|-------|
| `@aprovan/registry-server` | `^0.2.10` | **`^0.2.11`** (resolved `0.2.11`) |
| `@utdk/clients` | `^0.1.1` | **`^0.1.3`** (resolved `0.1.3`) |
| `@utdk/remote` | *(absent)* | **`0.1.4`** (exact, matches `packages/editor`) |

No other `@utdk/*` provider packages were bumped — `server/workspace` already consumes OpenAPI providers only through `@utdk/clients` (stream 5 deviation).

## Verify

```text
grep -n "@aprovan/registry-server" server/workspace/package.json
→ 43:    "@aprovan/registry-server": "^0.2.11",

pnpm --filter @aprovan/workspace list --depth 0
→ @aprovan/registry-server 0.2.11
→ @utdk/clients 0.1.3
→ @utdk/remote 0.1.4

pnpm --filter @aprovan/workspace check-types
→ exit 0 (after ^build of workspace deps)
```

Export resolution:

| Symbol | Source | Resolved? |
|--------|--------|-----------|
| `matchesResourcePattern` | `@aprovan/registry-server` root export | yes |
| `ResourceGrantRow` | `@aprovan/registry-server` via `export * from "./storage"` | yes |
| `scanToolsAccess` | `@utdk/remote/tools-scan` | yes |
| `effect` metadata values | `@utdk/clients` `dist/*/metadata.js` | yes (e.g. github) |
| `Effect` named type / `ToolRuntimeMetadata.effect` | `@utdk/clients/client` | **no** — see deviations |

## Touches

- `server/workspace/package.json`
- `pnpm-lock.yaml`

No runtime / behavior code changes.

## Deviations

1. **6.2 = `@utdk/clients@0.1.3` only.** Standalone `@utdk/github` etc. were not republished (stream 5); workspace never pinned them.

2. **Named `Effect` type not on npm yet.** Stream 1 put `export type Effect` and `effect: Effect` on bundler `client-api.ts`, and stream 4 wrote `"effect"` into generated `metadata.js`. The published `@utdk/clients@0.1.3` `client.d.ts` still mirrors `packages/utdk/client.ts`, which lacks `Effect` / `effect` on `ToolRuntimeMetadata`. Runtime metadata carries effect strings; TypeScript consumers cannot yet `import type { Effect } from "@utdk/clients/client"`. Stream 7 should either re-export a local `Effect` alias or wait for a clients type sync + republish — out of stream 6 Touches.

3. **Contract packages** (`@utdk/agent`, `@utdk/llm`, …) not newly published (stream 5) — left at existing pins; no invented versions.

## Unblocks

Stream 7 (effect wiring + CI gate) can start against these pins.
