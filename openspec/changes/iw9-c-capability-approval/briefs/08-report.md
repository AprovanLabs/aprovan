# Report: stream 8 — evaluateDispatch + four dispatch paths

**Status:** done  
**PR:** (filled after open)  
**Branch:** `feat/iw9-c-evaluate-dispatch`  
**Base:** `origin/main` @ `305e14b` (stream 7 #239)

## 8.1 Serialization check

`vcsAppScopeSchema` + `scope` on `vcs.commit/log/diff/show/branches/restore` already on
`origin/main` (`routes/tools.ts` ~327–534). No schema edits in this stream.

## Decision matrix (`evaluateDispatch`)

| Scenario | Input sketch | Decision |
|----------|--------------|----------|
| Action within granted resource | `email.send` + `mailto:alice@…` + matching grant | `allow` |
| Action outside granted resource | same capability, other mailto | `queue` (+ provisional id) |
| App ceiling ⊃ invoker | app allows `email.send`, invoker has none | `deny/capability` |
| Invoker ⊃ app ceiling | invoker has email, app omits it | `deny/capability` |
| Hidden namespace (HTTP / app) | no capability patterns | `deny/capability` |
| Hidden namespace (agent run) | same + `runContext` | `ask` (JIT; stream 10) |
| Admin + app resource miss | admin + app ceiling + unmatched resource | `queue` (no admin bypass) |
| Workspace-oauth member invoke | grant at `workspace-oauth` + resource hit | `allow` |
| User-oauth unconnected | `credential.level=user-oauth`, no id/connection | `deny/credential-unconnected` |
| Legacy `keyvalue.*` permission row | APR-320 row, no resource grants | `allow` |
| Observation in granted ns | `effect=observation`, resource outside pattern | `allow` (skip resource/queue) |

Queue/ask ids are provisional UUIDs — persistence is stream 9; cards are stream 10.

## What landed

| Task | Result |
|------|--------|
| 8.1 | Confirmed iw9-a VCS scope schemas already on branch |
| 8.2 | `evaluateDispatch` in `grants.ts` — tech-plan `DispatchRequest` / `DispatchDecision` |
| 8.3 | `invokerMatchedToolPatterns`; `profileGrantAllows` wraps it |
| 8.4 | Wired HTTP invoke, agent `call_tool`, `evaluateAppToolDispatch`, native dispatch |
| 8.5 | Legacy permissions resolve as capability patterns; `getPermissionStore().check` gone from authorize |
| 8.6 | `tests/evaluate-dispatch.test.ts` — 11 passed |
| 8.7 | Grep results below |

## Verify

```text
pnpm --filter @aprovan/workspace test -- evaluate-dispatch
→ 11 passed
```

## Grep gate (aprovan `server/workspace/src`)

Remaining hits (out-of-Touches adapters / publish validation / pattern helper):

| Symbol | Where | Notes |
|--------|-------|-------|
| `mayInvokeTool` | `authorize.ts` (thin → `evaluateDispatch`), `workflows/invoke.ts` | workflows not in Touches; adapter kept so package typechecks |
| `assertAllowedTools` | alias → `validateAllowedToolsEntries` in `capabilities.ts`; `apps/service.ts` publish path | publish validation, not a runtime dispatch gate |
| `toolGranted` | `grants.ts` alias → `matchesCapabilityPattern` | evaluateDispatch implementation helper |

Four dispatch paths no longer call the old gates as standalone enforcement:
HTTP → `evaluateDispatch`; agent → `evaluateDispatch`; app → `evaluateAppToolDispatch`;
native → `evaluateDispatch` (oidc).

## Grep gate (registry `packages/registry-server/src` on `origin/main`)

- No `mayInvokeTool` / `assertAllowedTools` / `toolGranted`.
- Resource checks go through `assertResourceAccess` + `matchesResourcePattern` on the
  shared Dispatcher (`dispatch/index.ts`, `mcp/sandbox-tool.ts`). No parallel bypass.

## Carryovers / deviations

1. **`createRegistryServer` → Dispatcher `resourceGrants`** — evaluateDispatch reads
   `getRegistryStorage().resourceGrants` directly; Dispatcher injection still a stream-3
   carryover, not required for this predicate.
2. **`workflows/invoke.ts` / `apps/service.ts`** — outside Touches; still import
   `mayInvokeTool` / `assertAllowedTools` aliases. Stream 14 grep DoD should delete aliases
   after those call sites move.
3. **`mailto:*@domain` local-part glob** — published matcher treats `*` as a whole path
   segment; tests use exact `mailto:alice@…` (same predicate behavior).
4. **Agent capability miss → `ask`** — runner still ends the turn as non-allow; JIT resume
   is stream 10.
5. **routes/apps.ts** — still uses ceiling helpers; new `evaluateAppToolDispatch` is the
   chokepoint for app sessions (wire at proxy in a follow-up / stream 14).

## Unblocks

Streams 9 (queue persistence) and 11 (derived authority) — and 10 (JIT cards) consuming
`queue` / `ask` decisions.
