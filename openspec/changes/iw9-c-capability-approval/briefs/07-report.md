# Report: stream 7 — effect wiring + CI gate

**Status:** done  
**PR:** (filled after open)  
**Branch:** `feat/iw9-c-effect-wiring`  
**Base:** `feat/iw9-c-pin-bump` (#237) fast-forwarded onto this branch (stream 6 not yet on `main` at start)

## What landed

| Task | Result |
|------|--------|
| 7.1 | `effect: Effect` on `ToolEntry` + optional on `ServiceToolEntry`; threaded through `deriveToolEntries`, `catalogToolEntries`, `platformToolEntries`, and interface/native discovery helpers so `GET /tools` surfaces effect end to end |
| 7.2 | Every `apps.*` static tool annotated explicitly; other platform plugins classified at `platformToolEntries` via `classifyCoreEffect` (read/list/get-style → `observation`, else `action`) |
| 7.3 | `scripts/check-effect-completeness.ts` builds configured-scope tool list and fails naming holes; wired into `check-types` / `typecheck` |
| 7.4 | `tests/effect-classification.test.ts` — all entries carry effect; `github.repos.get` matches pinned `@utdk/clients` metadata; observation routing assertion; gate names unannotated tools |

## Local `Effect` alias (stream 6 deviation)

Published `@utdk/clients@0.1.3` still lacks the named `Effect` type on `client.d.ts`. Defined locally in `service-kernel.ts`:

```ts
export type Effect = "observation" | "action";
```

Runtime metadata `"effect"` strings are passed through; no clients republish required.

## Verify

```text
pnpm --filter @aprovan/workspace test -- effect-classification
→ 5 passed

tsx server/workspace/scripts/check-effect-completeness.ts
→ effect-completeness: ok (137 tools)

pnpm --filter @aprovan/workspace exec tsc -p tsconfig.json --noEmit
→ exit 0
```

## Touches

- `server/workspace/src/service-kernel.ts` — `Effect`, `classifyCoreEffect`, `parseEffect`, `ServiceToolEntry.effect?`
- `server/workspace/src/platform-plugins.ts` — fill effect on every platform tool entry
- `server/workspace/src/routes/tools.ts` — `ToolEntry.effect`, discovery pass-through + catalog metadata enrichment (invoke handler untouched)
- `server/workspace/src/apps/service.ts` — explicit `effect` on all 28 apps tools
- `server/workspace/src/services.ts` — `catalogToolEntries` sets effect from `httpMethod` (task 7.1; see deviations)
- `server/workspace/scripts/check-effect-completeness.ts` — new
- `server/workspace/tests/effect-classification.test.ts` — new
- `server/workspace/package.json` — `check-types` / `typecheck` run the gate
- `openspec/changes/iw9-c-capability-approval/tasks.md` — 7.x checked

## Deviations

1. **`services.ts` `catalogToolEntries`** — not listed in brief Touches, but task 7.1 names it and `ToolEntry.effect` is required; catalog rows now carry effect from `httpMethod`. Discovery still prefers bundler metadata from `@utdk/clients/<provider>/metadata.js` when enriching catalog fallbacks in `tools.ts`.

2. **`package.json` scripts** — not listed in Touches; required to wire the gate into `check-types` per task 7.3.

3. **Core services outside `apps/service.ts`** — only apps tools have hand annotations in their static `tools` export (Touches limit). Other platform plugins get `effect` at `platformToolEntries` via `classifyCoreEffect`. Interface/native discovery in `tools.ts` uses the same classifier when contract packages lack published `effect` (stream 5 unpublished contracts).

4. **Named `Effect` type** — local alias; did not block on clients republish.

5. **Prerequisite pin** — branched from `origin/main` then fast-forwarded `feat/iw9-c-pin-bump` (#237 still open). Merge/rebase onto main after #237 lands.

## Unblocks

Stream 8 (`evaluateDispatch`) can consume `ToolEntry.effect` / observation skip.
