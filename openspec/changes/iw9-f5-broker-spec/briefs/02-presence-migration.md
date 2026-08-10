# Brief: Presence migration onto the broker-owned store (Stream 2)

**Model:** Sonnet (default tier — see `openspec/changes/IW-9-EXECUTION-OVERVIEW.md`
"Model tiers for the implementing fleet"; not on the Opus-escalation list,
but this is the highest-risk-of-subtle-regression task in the change —
byte-identical-behavior migration — so read the current behavior carefully
before touching anything).

## Mission

When you are done, `presence.ts` holds zero module/closure state:
`focusByConn` and `members` are gone, replaced by reads/writes through
`broker.storeFor(conn.workspaceId, "presence")`. Every observable behavior —
roster snapshots on subscribe, join/leave/update deltas, exclusive focus
(leave-before-join on path change), blur clearing focus, disconnect clearing
focus — is unchanged from the client's perspective. This closes the
namespace-handler statefulness gap the whole F5 change exists to fix
(handlers must be portable to a future cloud-backed store; a handler with
its own `Map` can never be).

You will land on top of Stream 1's task 1.7, which put a
`Promise.resolve(...)` wrap around `onSubscribe` purely so Stream 1 could
typecheck independently. Do not treat that wrap as a foundation to build
on — replace it wholesale with the real store-backed implementation. This
overlap on one file is intentional (see "Overlaps Stream 1" note in
`tasks.md` §2 and `briefs/deviations.md` item 1): you only start after
Stream 1 has merged, so there is no concurrent edit to coordinate, just a
sequential handoff.

## Read first

1. `openspec/changes/iw9-f5-broker-spec/tasks.md` §2 — read the "Overlaps Stream 1" note before the checkboxes
2. `openspec/changes/iw9-f5-broker-spec/briefs/deviations.md` — item 1 (exactly what Stream 1 left in `presence.ts` and why)
3. `openspec/changes/iw9-f5-broker-spec/tech-plan.md` — D2, and the "Presence key layout" paragraph immediately after "Interfaces & Data" (`focus:<connId>` → `{ path, lastActive }`; `member:<path>\0<userId>` → `{ connIds: string[], lastActive }`; roster = `list("member:" + path + "\0")`)
4. `openspec/changes/iw9-f5-broker-spec/specs/realtime-broker/spec.md` — "Namespace handlers hold no state" requirement and both its scenarios
5. `server/workspace/src/realtime/store.ts` — the merged `NamespaceStore`/`storeFor` interface from Stream 1 (read the landed code, not just the tech-plan sketch, in case anything drifted)
6. `server/workspace/src/realtime/broker.ts` — merged; how `storeFor` is exposed
7. `server/workspace/src/realtime/presence.ts` — current file (post Stream 1's task 1.7): full behavioral baseline — `roster`, `emit`, `clearFocus`, `setFocus`, and the `onSubscribe`/`onPublish`/`onDisconnect` triad (currently around lines 169-195, though task 1.7 shifted `onSubscribe`'s body slightly)
8. `server/workspace/tests/presence.test.ts` — current assertions; the byte-identical-behavior bar you must keep passing

## Tasks

(Verbatim from `openspec/changes/iw9-f5-broker-spec/tasks.md` §2)

- [ ] 2.1 Replace the closure maps `focusByConn`/`members`
      (presence.ts:71-73, types `ConnFocus` presence.ts:30-33 /
      `UserMembership` presence.ts:36-39) with reads/writes through
      `broker.storeFor(conn.workspaceId, "presence")` using the key layout
      from tech-plan "Interfaces & Data" (`focus:<connId>`,
      `member:<path>\0<userId>`).
- [ ] 2.2 Make `onSubscribe`/`onPublish`/`onDisconnect` async against the
      store while keeping wire behavior byte-identical: roster `subscribed`
      body, join/leave/update deltas, exclusive focus (leave-before-join on
      path change), blur clears focus, disconnect clears focus (spec
      "Namespace handlers hold no state", both scenarios).
- [ ] 2.3 Update `tests/presence.test.ts` for the async handler contract and
      add a two-workspace isolation case (same path, separate store scopes);
      confirm zero handler-module state remains (the Verify grep gate).

## Acceptance criteria

Full requirement text and both WHEN/THEN scenarios from
`specs/realtime-broker/spec.md` this stream satisfies:

> ### Requirement: Namespace handlers hold no state
>
> Namespace handlers SHALL NOT retain per-connection, per-user, or per-topic state in handler-scoped closures or module scope. All handler state SHALL live behind a broker-owned ephemeral state store interface that the broker constructs and passes to the handler at registration. The store is keyed by workspace and namespace, is never persisted, and is dropped for a workspace when the broker drops that workspace's state. The presence handler (`server/workspace/src/realtime/presence.ts`), which today holds `ConnFocus`/`UserMembership` maps in-process, SHALL be migrated onto this store with identical observable behavior (roster snapshots, join/leave/update deltas, exclusive focus, disconnect clears focus).
>
> #### Scenario: Presence state lives in the broker-owned store
> - **WHEN** the presence handler records a connection's focus
> - **THEN** the focus and membership entries are written through the broker-owned store interface, and no handler module retains them in its own Map or closure
>
> #### Scenario: Store scoped per workspace and namespace
> - **WHEN** two workspaces have presence members on the same path
> - **THEN** each workspace's entries live under that workspace's store scope and neither can read or clobber the other's

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/presence.test.ts && ! grep -n "new Map" server/workspace/src/realtime/presence.ts
```

Both must pass. The grep gate is the literal enforcement of "zero handler
module state" — it will fail if any `new Map` survives in `presence.ts`
outside the store implementation itself (which lives in `store.ts`, not
here).

## Constraints

- Touches only: `server/workspace/src/realtime/presence.ts`,
  `server/workspace/tests/presence.test.ts`.
- The `NamespaceStore`/key-layout contract in `tech-plan.md` is fixed —
  implement against it; don't invent a different key scheme even if it
  seems cleaner.
- Wire behavior must stay byte-identical: same roster snapshot shape, same
  join/leave/update delta shape and ordering rules, same exclusive-focus
  semantics. This is a state-ownership refactor, not a behavior change.
- Surgical changes only; match existing style.
- Do not start this stream until Stream 1's brief is merged and its Verify
  has passed — this is a sequential dependency, not a parallel one.

## Report back

When done: check off tasks 2.1–2.3 in `openspec/changes/iw9-f5-broker-spec/tasks.md`,
and write `openspec/changes/iw9-f5-broker-spec/briefs/02-report.md` containing
what you built, the Verify output (including the grep-gate result verbatim),
and any deviations from byte-identical behavior you had to make and why.
