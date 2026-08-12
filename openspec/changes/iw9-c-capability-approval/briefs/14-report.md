# Report: stream 14 — grep-gate cleanup + definition of done

**Status:** done  
**PRs:** (filled after open)  
**Branches:** `feat/iw9-c-grep-dod` (aprovan + registry)  
**Base:** `origin/main` @ aprovan `baae6ed` / registry `bf64a16`

## What landed

| Task | Result |
|------|--------|
| 14.1 | Deleted `mayInvokeTool`, `assertAllowedTools` alias, and `toolGranted` alias. `workflows/invoke.ts` calls `evaluateDispatch` directly; publish path uses `validateAllowedToolsEntries`; tests use `matchesCapabilityPattern` / local `dispatchAllows`. `getPermissionStore().check` already absent from authorize path. Also fixed stream-8 leftover `getApp` → `readApp` in `resolveAppCeiling` (silent app-ceiling miss). |
| 14.2 | Registry already clean: no `legacyDispatch` / `bypassResourceCheck`; MCP/sandbox resource checks ride `assertResourceAccess` on the shared Dispatcher. Confirmed via grep + `resource-grants` suite (10 passed). |
| 14.3 | Both `AGENTS.md` files document the one-predicate rule (aprovan: `evaluateDispatch`; registry: Dispatcher + `matchesResourcePattern`). |
| 14.4 | Full suites run — results below. Stream-scoped gates green; remaining failures reproduce on pristine `origin/main` (not introduced here). |

## Grep gates

```text
# aprovan
! grep -rn "mayInvokeTool\|assertAllowedTools\b" server/workspace/src --include="*.ts" | grep -v "\.test\.ts"
→ empty (PASS)

! grep -rn "toolGranted\b" server/workspace/src --include="*.ts" | grep -v "\.test\.ts"
→ empty (PASS)

! grep -rn "getPermissionStore()\.check" server/workspace/src --include="*.ts"
→ empty (PASS)

# registry
! grep -rn "legacyDispatch\|bypassResourceCheck" packages/registry-server/src --include="*.ts"
→ empty (PASS)
```

## Suite results

| Suite | Result |
|-------|--------|
| `@aprovan/workspace test` (stream-scoped: `evaluate-dispatch`, `groups-profiles`, `agents`) | **24 passed** |
| `@aprovan/workspace test` (full) | 738 passed / **70 failed** / 63 skipped — **same agent-run / interfaces / sandbox failures on pristine `origin/main`** (e.g. `No llm profile named "fast"`); not caused by this stream |
| `@aprovan/patchwork-web test` | **159 passed** (21 files) |
| `@aprovan/registry-server test -- resource-grants` | **10 passed** |
| `@aprovan/registry-server test` (full) | 259 passed / **4 failed** / 10 skipped — **same on pristine `origin/main`** (`No default profile for agent`, sandbox `'sql' is not defined` message shape) |

## Deviations / carryovers

1. **Full-suite red on main** — workspace (~70) and registry-server (~4) failures pre-exist at the stream base; archive gate should treat stream-scoped greps + web green + resource-grants / evaluate-dispatch green as DoD, or land a separate hygiene PR for llm-profile / interface test fixtures.
2. **`mailto:*@domain` matcher gap** — still open from stream 8/9 reports; not in this stream's Touches for matcher code (registry already published).
3. **Workflow in-process path** — `queue`/`ask` from `evaluateDispatch` fail closed (403) in `assertProviderAllowed`; HTTP/agent own the queue/card machinery. Same effective posture as the old boolean adapter.

## Ready for archive

Grep gates clean both repos; one-predicate rule in both `AGENTS.md`; stream-scoped suites green. Full-suite noise is pre-existing — call out before `openspec archive` if the archive checklist requires literally zero red tests on main.
