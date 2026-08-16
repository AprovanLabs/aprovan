# Deviations — iw9-f5-broker-spec

Recorded before dispatch, per `IW-9-IMPLEMENTATION-PROMPT.md` step 6 ("when
reality contradicts a task... write the finding to `briefs/deviations.md`,
adapt minimally, and keep the task's intent"). No implementation code was
touched to produce these findings or fixes — only `tasks.md`, `tech-plan.md`,
and this file.

## 1. Stream 1 readiness bug: not independently verifiable as originally scoped

**Finding.** Stream 1's own `Verify` runs `pnpm --filter @aprovan/workspace
typecheck` across the whole package. Stream 1's original `Touches` was
limited to `broker.ts`, `store.ts`, and its own test — it did not include
`presence.ts`. But `presence.ts`'s `createPresenceHandler` returns an object
typed as `NamespaceHandler` whose `onSubscribe` (presence.ts:172-175) is a
plain synchronous function returning `{ body: {...} }`. The moment task 1.1
changes `NamespaceHandler.onSubscribe`'s return type to
`Promise<{ body?: unknown }>`, that object literal fails to typecheck —
TypeScript does not bivariantly relax method *return* types (only
parameters), so a non-`Promise` return is a real, blocking
`tsc` error. This means a Stream-1-only branch, verified in isolation exactly
as the orchestrator protocol requires ("run its Verify command... check the
box only when it passes"), would fail its own Verify before Stream 2 — whose
job is the *real* migration — ever starts.

**Fix.** Widened Stream 1's `Touches` by one file
(`server/workspace/src/realtime/presence.ts`) and added task 1.7: a
compile-preserving `Promise.resolve(...)` wrap around `presence.ts`'s
`onSubscribe` return, and nothing else — no store reads, no state migration.
Stream 1's `Verify` now also runs `tests/presence.test.ts` to confirm the
shim doesn't change observable behavior. Stream 2 (task 2.1-2.2) replaces
this shim wholesale with the real store-backed implementation; a note in
`tasks.md` §2 calls out that this is an intentional sequential handoff on one
file, not a planning error, and is safe specifically because Stream 2 is
`Depends-on: 1` (it starts only after Stream 1 merges, never in parallel).

**Verified:** re-read the amended `tasks.md` end-to-end after editing —
Stream 1's `Touches`/`Verify`/task 1.7 and Stream 2's overlap note are
internally consistent; no other stream references `presence.ts`.

## 2. Synchronous `storeFor`/locus seam — clarified, not implementable literally

**Finding.** Tech-plan D3 says the store factory "keys off
`resolveLocusDispatch`... `local` → in-process; cloud loci → in-process with
the deferral documented at the selection site." But `resolveLocusDispatch`
(`runtime/config.ts:274`) takes an already-known `WorkspaceLocusKind`, not a
`workspaceId`; turning a `workspaceId` into its locus is `workspaces.ts`'s
`getWorkspace` (`server/workspace/src/workspaces.ts:49`, confirmed
`async`) → `resolveLocus`. `NamespaceStoreFactory.storeFor(workspaceId,
namespace)` in "Interfaces & Data" is synchronous by contract (D2 — the
in-process backend must not force an async API on future backends... but
also must not itself require one just to *select* a backend). A literal
reading of D3 would have an implementer try to thread an async workspace
lookup into a sync method, which is impossible without changing the frozen
`storeFor` signature.

**Fix.** Added a clarification to D3 and rewrote the `createNamespaceStoreFactory()`
doc comment in "Interfaces & Data": because every locus resolves to the same
in-process backend today (D16), the factory constructs the in-process store
unconditionally — there is nothing to branch on yet. The "selection seam" is
a documented comment at the site a real per-workspace dispatch would go, not
a live `if (locus === ...)` reading from a workspace record. Implementers
must not add an async workspace lookup to make `storeFor` "really"
locus-aware now; that lookup, and any signature change it implies, is
deferred with the rest of D16.

## 3. Socket call-site Promise handling — ownership and form clarified

**Finding.** Tech-plan D1 already stated "`socket.ts` invokes it with
`void`," and task 3.3 said to "update `tests/realtime-socket.test.ts` for the
async `handleClientMessage` call site" — but neither named the production
call site itself (`broker.handleClientMessage(conn, parsed);` at
socket.ts:266, inside `ws.on("message", ...)`) or which stream owns editing
it. Note: leaving it unedited would not actually fail `tsc` (TypeScript does
not error on an ignored `Promise` return), so this was a clarity gap, not a
second readiness bug — but leaving it implicit risked either no stream
touching it, or Stream 1 attempting to touch `socket.ts` outside its
`Touches`.

**Fix.** Task 3.3 now names the exact call site and the exact edit (`void
broker.handleClientMessage(conn, parsed);`), states the rationale (D1 intent;
the spec's permitted event/`subscribed` reordering means not awaiting is
spec-compliant), and states explicitly that Stream 3 owns it because Stream
1's `Touches` never opens `socket.ts`. Tech-plan D1 gained a matching
parenthetical pointing to Stream 3.

## 5. Registry grep gate — pre-existing false positive on Datadog types

**Finding (Stream 4).** The Verify command `! grep -rn --include="*.ts"
"focusByConn\|UserMembership" ../registry/packages` returns 3 non-zero results:

```
registry/packages/utdk/datadog/metadata.ts:16862:  "GetUserMemberships": {
registry/packages/utdk/datadog/metadata.ts:16864:      "getUserMemberships"
registry/packages/utdk/datadog/types/index.ts:8595:  getUserMemberships: (input: {
```

These are Datadog API client type definitions (`GetUserMemberships`,
`getUserMemberships`) that contain the substring `UserMembership` — a Datadog
API operation for listing Datadog user memberships, entirely unrelated to the
presence handler's former `UserMembership` interface. These files were last
changed in commit `2167184` (stream 4, Aug 2025) and have not been touched by
any F5 stream. The grep pattern `UserMembership` matches these Datadog names as
substrings, not as the symbol F5 deleted.

**Fix.** None; this is outside Stream 4's `Touches` (`realtime-e2e.test.ts`
only). The gate as written will exit 1 for this reason. Stream 4's report
documents this as a pre-existing false positive. The deleted symbol
(`UserMembership` the presence interface) is confirmed absent from
`server/workspace/src/realtime/presence.ts` (gate 2 passes cleanly). The
registry hits are not the deleted symbol; they cannot be a migration-debt
indicator for F5's work.

## 4. Full-suite baseline recorded (for Stream 4)

Ran `pnpm --filter @aprovan/workspace test` against a clean `main` checkout
(git status clean; build via `pnpm turbo run build --filter=@aprovan/workspace`
succeeded, full cache hit) before any F5 work:

```
Test Files  18 failed | 58 passed | 6 skipped (82)
     Tests  81 failed | 474 passed | 57 skipped (612)
```

The 18 failing files are pre-existing (owned by F6's test-repair stream per
`IW-9-APP-FIRST.md` §F6, not F5):

```
tests/agent-interface.test.ts
tests/agent-run.test.ts
tests/apps.test.ts
tests/chat-sessions.test.ts
tests/get-client.test.ts
tests/interfaces.test.ts
tests/live-apps.test.ts
tests/oauth-tokens.test.ts
tests/profiles.test.ts
tests/sandbox-agent-runs.test.ts
tests/sandbox-repo-mounts.test.ts
tests/sandboxes.test.ts
tests/sync.test.ts
tests/telemetry.test.ts
tests/vcs-interface.test.ts
tests/vcs-mount-lineage.test.ts
tests/vcs.test.ts
tests/vfs-mounts.test.ts
```

None are realtime files. The realtime suite (`presence.test.ts`,
`realtime-socket.test.ts`, `realtime-e2e.test.ts` — `realtime-broker.test.ts`
and `realtime-backpressure.test.ts` don't exist yet, they're new in this
change) is fully green today. Stream 4's brief carries this baseline so it
can distinguish "pre-existing, not ours" from "we introduced this" without
either hiding the pre-existing 81 or falsely claiming a clean full-suite run.
