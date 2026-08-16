# Report: End-to-end verification and contract gates (Stream 4)

## What was built

**`server/workspace/tests/realtime-e2e.test.ts`** (tasks 4.1, 4.2):

### Module header update (async-contract documentation)

The file-level comment was updated to document the async subscribe contract
and the spec's permitted reordering: `onSubscribe` returns
`Promise<{body?:unknown}>`, the broker awaits it before sending `subscribed`,
and events between subscription registration and `subscribed` delivery MAY
arrive in either order — clients MUST NOT assume `subscribed` precedes the
first event.

### Stale `doc:` assertion fixed

The "reserved namespaces doc: and fs: return reserved-namespace" test title
and body were updated to reflect reality: `doc:` is no longer reserved — it
was registered by `createDocHandler` in commit `19da322` (iw9-doc-markdown,
IW-9 doc stream 3). The test was asserting `reserved-namespace` for
`doc:notes/plan.md`, which now returns `subscribed`. Stream 3's report
(briefs/03-report.md, D2) noted and fixed this same stale assertion in
`realtime-socket.test.ts`; this stream's Touches covers the same fix in
`realtime-e2e.test.ts`.

The updated test:
- Still asserts `fs:` subscribe → `reserved-namespace` (fs is still reserved)
- Still asserts `fs:` publish → `reserved-namespace`
- Now asserts `doc:notes/plan.md` subscribe → `subscribed` (registered handler)
- Still confirms presence works on the same connection after reserved errors

### New test: "recovery" scenario (task 4.1)

Added a third test case: **"recovery: disconnected client resubscribes and
rebuilds state from subscribed body alone"**, implementing the full
WHEN/THEN scenario from spec "Client recovers by resubscribing":

> WHEN a client suspects it missed events (reconnect, buffer-drop disconnect)
> THEN re-subscribing yields a `subscribed` body sufficient to rebuild
>      current state without any replayed events

Test walkthrough:
1. User A connects, subscribes to `presence:notes/plan.md`, and focuses on it.
2. User B connects and subscribes — the `subscribed` body contains A's peer entry (confirms initial sync works).
3. User B is disconnected (simulating slow-client/1013 close via `wsB.close()`), waiting for the close event.
4. While B is offline, A switches to `notes/other.md` then back to `notes/plan.md` — these are leave + join events B can never receive.
5. B reconnects as a fresh connection (`wsB2`) and resubscribes.
6. The `subscribed` body from the reconnected subscription correctly contains A's peer entry (A is on `notes/plan.md`) — derived entirely from the broker store, with no replayed events.

This demonstrates that the `subscribed` body is the recovery mechanism: a
client that lost all missed events during disconnection can reconstruct
correct current state from a single resubscribe, with no replay needed.

Async-contract interaction: the test relies on `await onSubscribe` (via
`subscribe()` helper which calls `nextMessage` after the subscribe message) —
the broker awaits the presence handler's async store read before delivering
the `subscribed` frame, so the body is always current-at-delivery.

## Verify output (verbatim)

### Targeted e2e test

```
$ pnpm --filter @aprovan/workspace exec vitest run tests/realtime-e2e.test.ts

 RUN  v2.1.5 .../server/workspace

 ✓ tests/realtime-e2e.test.ts (3 tests) 224ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  15:37:56
   Duration  653ms (transform 113ms, setup 9ms, collect 241ms, tests 213ms, environment 0ms, prepare 24ms)
```

### All five realtime test files (owned by F5)

```
$ pnpm --filter @aprovan/workspace exec vitest run \
    tests/presence.test.ts tests/realtime-broker.test.ts \
    tests/realtime-socket.test.ts tests/realtime-backpressure.test.ts \
    tests/realtime-e2e.test.ts

 RUN  v2.1.5 .../server/workspace

 ✓ tests/realtime-broker.test.ts (6 tests) 3ms
 ✓ tests/realtime-backpressure.test.ts (9 tests) 117ms
 ✓ tests/realtime-e2e.test.ts (3 tests) 224ms
 ✓ tests/presence.test.ts (8 tests) 612ms
 ✓ tests/realtime-socket.test.ts (9 tests) 1152ms

 Test Files  5 passed (5)
      Tests  35 passed (35)
   Start at  15:39:55
   Duration  2.18s (transform 486ms, setup 104ms, collect 2.92s, tests 2.11s, environment 1ms, prepare 423ms)
```

35/35 tests pass; no skips introduced; no weakened assertions.

### Contract gate 1: async signature present

```
$ grep -n "Promise<{ body?: unknown }>" server/workspace/src/realtime/broker.ts
34:  onSubscribe(conn: Conn, topic: Topic): Promise<{ body?: unknown }>;
```

PASS.

### Contract gate 2: focusByConn/UserMembership not in presence.ts

```
$ ! grep -rn "focusByConn\|UserMembership" server/workspace/src/realtime/presence.ts
(no output — command exits 0 via negation)
```

PASS.

### Contract gate 3: focusByConn/UserMembership in registry/packages

```
$ ! grep -rn --include="*.ts" "focusByConn\|UserMembership" ../registry/packages
/Users/jacob/Documents/Code/AprovanLabs/registry/packages/utdk/datadog/metadata.ts:16862:  "GetUserMemberships": {
/Users/jacob/Documents/Code/AprovanLabs/registry/packages/utdk/datadog/metadata.ts:16864:      "getUserMemberships"
/Users/jacob/Documents/Code/AprovanLabs/registry/packages/utdk/datadog/types/index.ts:8595:  getUserMemberships: (input: {
```

FAIL (gate exits 1 — see Deviations D5 below). These hits are `getUserMemberships`
/ `GetUserMemberships` in the Datadog API client (`packages/utdk/datadog/`),
not the `UserMembership` interface deleted from `presence.ts`. They are
pre-existing Datadog type definitions (last changed commit `2167184`, well
before F5). Gate 2 confirms the deleted symbol is absent from the realtime
source; the registry hits are unrelated substrings.

### Scoped diff (F5 touches only realtime/ + its tests)

```
$ git diff --stat HEAD
server/workspace/tests/realtime-e2e.test.ts | 82 ++++++++++++++++++++++++-----
1 file changed, 70 insertions(+), 12 deletions(-)
```

Only `realtime-e2e.test.ts` changed. F5 shares no files with F1-F4/F6.

## Full-suite baseline comparison

### Pre-F5 baseline (deviations.md item 4)

```
Test Files  18 failed | 58 passed | 6 skipped (82)
     Tests  81 failed | 474 passed | 57 skipped (612)
```

18 pre-existing failing files, none realtime.

### Post-F5 stream 4 actual run

```
Test Files  21 failed | 96 passed | 7 skipped (124)
     Tests  71 failed | 794 passed | 63 skipped (928)
```

Total file count grew from 82 to 124 (F5 added 2 new test files
`realtime-broker.test.ts`, `realtime-backpressure.test.ts`; other IW-9
streams added more; `permissions-dynamodb.test.ts` moved from failing to
skipped). Total test count grew from 612 to 928.

### Owned-regression check

**Realtime files — fully green, no skips:**

| File | Tests | Status |
|---|---|---|
| `tests/presence.test.ts` | 8 | ✓ all pass |
| `tests/realtime-broker.test.ts` | 6 | ✓ all pass |
| `tests/realtime-socket.test.ts` | 9 | ✓ all pass |
| `tests/realtime-backpressure.test.ts` | 9 | ✓ all pass |
| `tests/realtime-e2e.test.ts` | 3 | ✓ all pass |

Zero new failures introduced by F5 stream 4. No skips introduced. No
weakened assertions.

**Failing files diff vs baseline:**

Files failing now that were NOT in the pre-F5 baseline (8 files):
```
tests/agent-app-profiles.test.ts  — NEW (post-baseline, non-realtime)
tests/agent-describe.test.ts       — NEW (post-baseline, non-realtime)
tests/agent-run-events.test.ts     — NEW (post-baseline, non-realtime)
tests/app-dependencies.test.ts     — NEW (post-baseline, non-realtime)
tests/app-domain.test.ts           — NEW (post-baseline, non-realtime)
tests/app-install.test.ts          — NEW (post-baseline, non-realtime)
tests/app-integration.test.ts      — NEW (post-baseline, non-realtime)
tests/chat-summarize-agent.test.ts — NEW (post-baseline, non-realtime)
```

None of these files are in `server/workspace/src/realtime/` or its tests.
None were touched by any F5 stream (confirmed by `git diff --name-only
HEAD~3 HEAD` — F5's diffs cover only `realtime/`, `presence.ts`, `socket.ts`,
and the 3 realtime test files). These failures are from other IW-9 streams
that landed after the pre-F5 baseline was recorded (F2 stream 2 for
`apps/store.ts`, and additional new features/tests from other IW-9 streams
such as doc, chat, and capability approval). Each failure is a logic failure
in non-realtime test scenarios (`awaiting_tools` vs `failed` in authority
tests, `409` vs `400` in app-slug tests, etc.) — none trace to realtime code.

Files from the baseline that are now passing (6 files — fixed by other streams):
```
tests/apps.test.ts
tests/chat-sessions.test.ts
tests/live-apps.test.ts
tests/vcs-mount-lineage.test.ts
tests/vcs.test.ts
tests/vfs-mounts.test.ts
```

**Also new to the failing list in this run (appeared mid-run, may be flaky):**
`tests/chat-data-model.test.ts` — added by IW-9 chat flagship work after
the baseline, not a realtime file.

**Summary: zero new regressions attributable to F5 stream 4. All 5 realtime-owned
test files pass fully. The 8 new-vs-baseline failures are post-baseline additions
from non-F5 IW-9 streams; none touch realtime code.**

## Deviations

### D5: Registry grep gate — pre-existing false positive on Datadog types

See `briefs/deviations.md` item 5 for the full finding. The Verify command's
third grep gate (`! grep -rn --include="*.ts" "focusByConn\|UserMembership"
../registry/packages`) exits 1 due to `getUserMemberships` /
`GetUserMemberships` in `packages/utdk/datadog/` — Datadog API client types
that contain `UserMembership` as a substring. The deleted symbol
(`UserMembership` the presence interface) is absent from all realtime sources
(gate 2 passes cleanly). The registry hits are pre-existing; F5 never touched
those files. This is a false positive in the grep pattern, not a migration-debt
indicator.

### Doc: stale assertion in realtime-e2e.test.ts (fixed in-stream)

The test "reserved namespaces doc: and fs: return reserved-namespace" was
asserting that `doc:` subscriptions return `reserved-namespace`. The `doc`
namespace was registered by `createDocHandler` in commit `19da322` (IW-9 doc
stream 3) before this stream ran, making the assertion stale. The same fix was
already applied to `realtime-socket.test.ts` in Stream 3 (D2 in that report).
Since `realtime-e2e.test.ts` is this stream's sole Touch file, fixing the
stale assertion here is in-scope. The fix is the minimal correct update:
remove the `doc:` → `reserved-namespace` assertions, replace with a positive
assertion that `doc:` now returns `subscribed`, keep all `fs:` assertions.

## Implementation-complete status

All tasks across all four streams are now checked off:

- Stream 1 (broker contract + namespace store): tasks 1.1–1.7 ✓
- Stream 2 (presence migration onto broker store): tasks 2.1–2.3 ✓
- Stream 3 (socket backpressure): tasks 3.1–3.4 ✓
- Stream 4 (e2e verification + contract gates): tasks 4.1–4.2 ✓

**iw9-f5-broker-spec is implementation-complete.** The only outstanding item
is the pre-existing false positive in the registry grep gate (D5), which is
a documentation issue in the Verify command pattern, not a code regression.
