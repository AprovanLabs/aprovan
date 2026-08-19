# Report: 06 — aprovan invoker-aware resolution at every dispatch path

## What was built (tasks 6.1–6.5)

### 6.1 — `resolveCredentialRecord` (`credentials.ts:953`)

Signature is now
`resolveCredentialRecord(workspaceId, provider, invoker: CredentialInvoker, credentialId?, profile?)`
returning `Promise<ResolvedCredential | undefined>` — the invoker is
**required at the type level** (third parameter, before the optionals, so
every invoker-less call site is a compile error). Implements D4 exactly,
mirroring the registry semantics from `briefs/02-report.md`:

- **Pin loud**: `credentialId` resolves exactly that row; missing/mismatched
  pin stays a `CredentialResolutionError` (400, unchanged). A pinned
  `user-oauth` row whose `createdBy !== invoker.sub` throws
  `CredentialNotConnectedError` — never a downgrade, even when a
  workspace-level row for the provider exists.
- **Unpinned**: `list()`-then-filter (the D4a idiom): the invoker's own
  `user-oauth` row first, else the first workspace-level row
  (`record.level !== "user-oauth"`) in the store's creation order. Rows
  exist but all foreign `user-oauth` → `CredentialNotConnectedError`;
  no rows at all → `undefined`.
- `owner` present iff `level === "user-oauth"` (shared
  `toResolvedCredential` helper); the error is matched on `code`
  (`credential_not_connected`), never message.
- `CredentialNotConnectedError`, `CredentialInvoker`, `ResolvedCredential`
  are re-exported from `credentials.ts` (import from
  `@aprovan/registry-server`, no local redeclaration — same pattern as the
  stream-5 level re-exports).

Per stream 5's deviation note: `CredentialRecord.level` is consumed as-is
(already effectiveLevel-backfilled) — `effectiveLevel` is **not**
re-applied anywhere in this stream.

### 6.2 — `resolveWorkspaceCredential` (`credentials.ts:1024`)

`resolveWorkspaceCredential(workspaceId: string, provider: string): Promise<ResolvedCredential | undefined>`
— the D6 workspace-only resolver. The structural guarantee is in the
selection itself: `user-oauth` rows are filtered out of the candidate set
**before** ranking (`.filter(r => r.provider === provider && r.level !== "user-oauth")`),
so `owner` is `undefined` on every result by construction. It never
throws not-connected — a provider whose only rows are personal connections
is simply "no workspace credential" (`undefined`), matching the
pre-existing contract of the paths it serves. Both invoker-less call sites
migrated:

- `vcs/mounts.ts:210` (`githubToken`) — was the raw
  `getCredentialStore().resolveRecordForProvider(...)`; the
  `getCredentialStore` import is gone from the file.
- `credential-store-adapter.ts:53` (`firstForProvider`) — dead code
  (still zero call sites), brought into compliance before anything wires
  it up.

### 6.3 — invoker threaded at the dispatch call sites

- **`routes/tools.ts:1720`** — `resolveCredentialRecord(workspaceId,
  provider, { sub: callerId }, interfaceCredentialId)` where `callerId =
  principal.sub` (from `c.get("principal")` at :1246). The catch now maps
  `CredentialNotConnectedError` → HTTP 403 with
  `{ error, code: "credential_not_connected" }`, audit/telemetry recorded
  with status 403; every other resolution error stays 400 as before.
- **`workflows/invoke.ts:397`** — `resolveCredentialRecord(ctx.workspaceId,
  provider, invokerFromContext(ctx), credentialId, credentialProfile)`.
  `invokerFromContext` (invoke.ts:373) builds
  `{ sub: ctx.userId, actor? }`: `actor = { kind: "app", id: ctx.appScope.id }`
  for app sessions, else `{ kind: "workflow", id: ctx.parentRunId }` when
  `ctx.workflowDepth` is set (the runner stamps `parentRunId: run.id` on a
  run's own dispatch context — runner.ts:163 — so this IS the dispatching
  run's id). `CredentialNotConnectedError` is rethrown **unwrapped** (it
  carries `status: 403` + `code`); other errors keep the 400
  `ServiceError` wrap.
- **`routes/llm.ts:131`** — `resolveCredentialRecord(workspaceId,
  providerId, invoker, credentialId)`; `resolveCredentials` /
  `resolveChatCredentials` gained a `CredentialInvoker` parameter and
  return `{ credentials?, error?, status?, code? }`
  (`ResolvedChatCredentials`, llm.ts:107). All three route callers
  (`GET /:provider/models`, `handleChat`, `handleCompletionJob`) pass
  `{ sub: principal.sub }` and answer a not-connected error with
  `403 + code` (anything else keeps the historical 502).
- **HTTP surfacing for the in-process path**: the embed
  `dispatchInterface` catch in `routes/tools.ts` (~:1638) now recognizes
  `CredentialNotConnectedError` (403 + `code` in the body) so
  `dispatchProviderLegacy` → `resolveProviderCredentials` failures reach
  the client machine-distinguishable rather than as a 500.

### 6.4 — `tests/credential-level-resolution.test.ts`

11 tests through the workspace entry points over the singleton sqlite
store: own-connection wins over workspace row; workspace fallback for an
unconnected invoker; foreign-only fails closed (asserted on `code`,
`status`, `provider`, `requiredLevel` — never message); nothing-connected
→ undefined; pinned own user-oauth resolves with `owner`; pinned foreign
user-oauth fails closed **with a workspace row present** (no downgrade);
pin mismatch/missing stays `CredentialResolutionError` (distinguishable
from not-connected); `resolveWorkspaceCredential` returns workspace rows
with `owner === undefined` asserted on **every** result, and `undefined`
(not an error, not a row) when only user-oauth connections exist.

### 6.5 — grep gates

Both halves run and clean (outputs below).

## Verify (all run from the worktree root, 2026-08-18)

```
$ pnpm --filter @aprovan/workspace test -- credential-level-resolution
 ✓ tests/credential-level-resolution.test.ts (11 tests) 13ms
 Test Files  1 passed (1)
      Tests  11 passed (11)

$ grep -n "resolveWorkspaceCredential" server/workspace/src/vcs/mounts.ts server/workspace/src/credential-store-adapter.ts
server/workspace/src/credential-store-adapter.ts:14:import { resolveWorkspaceCredential } from "./credentials.js";
server/workspace/src/credential-store-adapter.ts:53:      const resolved = await resolveWorkspaceCredential(tenantId, provider);
server/workspace/src/vcs/mounts.ts:31:import { resolveWorkspaceCredential } from "../credentials.js";
server/workspace/src/vcs/mounts.ts:210:  const record = await resolveWorkspaceCredential(workspaceId, "github")

$ ! grep -rln "resolveRecordForProvider" server/workspace/src --include="*.ts" | grep -v "^server/workspace/src/credentials\.ts$"
(no output — exit 0; credentials.ts is the sole owner of the primitive)

$ cd /Users/jacob/Documents/Code/AprovanLabs/registry && ! grep -n "deps\.credentials\.firstForProvider" packages/registry-server/src/profiles/resolve.ts
(no output — exit 0)

$ pnpm --filter @aprovan/workspace check-types
effect-completeness: ok (143 tools)        # tsc --noEmit passed

$ grep -rn "resolveCredentialRecord" server/workspace/src --include="*.ts"
credentials.ts:953 (def) · workflows/invoke.ts:397 · routes/llm.ts:131 · routes/tools.ts:1720
(every call site passes an invoker; the compiler enforces it)
```

Full-suite baseline: at the clean base (merge of `72d9e3a`, stream 5),
`pnpm --filter @aprovan/workspace test` shows **50 failed / 882 passed
across 17 files** (0.3.0 pin fallout — `interfaces`, `get-client`,
`telemetry`, `agent-run`, `profiles`, `oauth-tokens`, etc.). After this
stream: **50 failed / 893 passed** — the per-test failure list is
**byte-identical** (diffed), i.e. this stream adds 0 failures and 11
passes. None of the pre-existing failures were fixed by the threading
(they fail in test-local construction, e.g. `profiles.test.ts` building
`CredentialService` with one argument, before reaching these resolvers).
Note the orchestrator prompt said "~10 pre-existing failures"; the honest
measured baseline at this base commit is 50 — recorded here, unchanged by
this stream.

## Deviations

1. **`routes/tools.ts` line drift is much larger than the deviations table
   recorded**: the `resolveCredentialRecord` call sits at **:1706 (now
   :1720 after this stream's edits)**, not :1258 — other IW-9 streams
   (D/C waves) landed in the file since 2026-08-09. Located by content per
   the brief; the dispatch/audit region edits stayed clear of the F1
   tool-schema region (:278–380 untouched).
2. **No `actor` at the HTTP tools/llm sites**: the authenticated
   `Principal` (`middleware/auth.ts`) carries no non-user actor, and
   app/workflow/agent-originated calls reach credentials through
   `workflows/invoke.ts` (where the actor IS threaded from
   `ServiceContext`), not through these HTTP handlers. So tools.ts/llm.ts
   pass `{ sub: principal.sub }` — the invoker, no placeholder.
3. **`resolveWorkspaceCredential` resolves via the singleton store**
   (`getCredentialStore()`), including when called from
   `adaptCredentialStore(store)` — the injected `store` is still used for
   the row re-read but selection goes through the singleton. The adapter
   has zero call sites (verified again); any future wiring passes the
   singleton store anyway, and D6's fixed signature has no store
   parameter. Flagged for whoever revives the adapter.
4. **Selection uses `record.level !== "user-oauth"` directly**, not a
   literal `effectiveLevel(...) ∈ {...}` re-check — per stream 5's
   deviation 2 ("always present, already effective; do not re-apply").
   Same predicate, one comparison.
5. **`workflows/invoke.ts` rethrows `CredentialNotConnectedError`
   unwrapped** instead of wrapping into `ServiceError(…, 400)`: the class
   already carries `status: 403` + `code`, and wrapping would erase the
   machine distinction. The embed catch in `routes/tools.ts` (allowed
   file) maps it at the HTTP boundary. Workflow-script dispatches that hit
   it record the error message on the run, as all dispatch errors do.

## For stream 7 (audit attribution)

Where the resolved level/id/owner are in scope at each dispatch site,
immediately after resolution — thread the audit fields here:

- **`routes/tools.ts`** ~:1714–1740: `let record: ResolvedCredential |
  undefined` — after the try/catch, `record.id` / `record.level` /
  `record.owner` are live in the same scope as every subsequent
  `getAuditStore().append({...})` (the 502 OAuth branch and `finishLog`).
  The ephemeral branch (`body.credential`, ~:1699) never produces a
  `record` — that is your `credentialSource: "ephemeral"` case.
- **`workflows/invoke.ts`** `resolveProviderCredentials` (:381): `record:
  ResolvedCredential | undefined` exists inside the function but only the
  injectable payload is returned to `dispatchProviderLegacy` — to attribute
  there you will either widen this function's return or append inside it.
  `invokerFromContext(ctx)` (:373) is exported-shape-ready for
  `actorKind`/`actorId` (app → `appScope.id`, workflow → `parentRunId`
  which is the dispatching run's own id, per runner.ts:163).
- **`routes/llm.ts`** `resolveCredentials` (:116): same shape —
  `ResolvedCredential` is local; the routes' `getAuditStore().append`
  calls (e.g. completions :640) currently only see the payload. Widen
  `ResolvedChatCredentials` (llm.ts:107) with id/level if you need them at
  the append sites.
- `resolveWorkspaceCredential` results also carry `id`/`level`
  (`owner` always undefined) — `vcs/mounts.ts` `githubToken` discards all
  but the token today.
- The not-connected audit rows are already written: tools.ts appends
  status 403 on `CredentialNotConnectedError` at both the direct and
  embed catches.
