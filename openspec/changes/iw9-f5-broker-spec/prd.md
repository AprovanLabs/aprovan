# PRD — iw9-f5-broker-spec (Wave 0 / F5)

_Elaborates F5 of `openspec/changes/IW-9-APP-FIRST.md` (settled authority; D16,
invariant 7). This change is spec + minimal signature work: the in-memory
broker stays, sharding is deferred per D16._

## Problem

The realtime broker (`server/workspace/src/realtime/broker.ts`) was built for
one namespace (presence) on one Fargate task, and its contract quietly bakes
those assumptions in: `onSubscribe` is synchronous (broker.ts:24), so any
handler that needs a store read to produce its snapshot cannot exist;
namespace handlers hold state in module closures (presence.ts:71-73 holds
`focusByConn`/`members` maps in-process), so state ownership is invisible to
the broker and unswappable for cloud; and a fast producer can flood a slow
WebSocket client without bound. Wave 2's Chat flagship builds directly on this
contract — its message fan-out, typing, and presence all ride the broker — so
the contract must be hardened now, before Chat's handler is written against
the wrong shape.

## Users & Jobs

- **Wave-2 Chat implementers** (`iw9-chat-flagship`): need a stable
  `NamespaceHandler`/`RealtimeBroker` contract with async subscribe and
  backpressure guarantees to build the chat namespace against.
- **Namespace handler authors** (presence today; doc/fs reserved): need a
  broker-owned state store so handlers stay stateless and portable across
  backends.
- **Platform operators**: need slow or dead clients to degrade themselves,
  not the workspace's event fan-out.

## Goals

- `NamespaceHandler.onSubscribe` returns a Promise; presence compiles and all
  existing realtime tests pass against the revised interface.
- Zero module-closure state in namespace handlers: presence's
  `ConnFocus`/`UserMembership` maps live behind a broker-owned store
  interface; `grep`-verifiable (no `Map` state in `presence.ts` outside the
  store implementation).
- Delivery semantics are written down: handlers MUST NOT assume ordering or
  exactly-once delivery; the spec says so in normative language.
- Backend selection mirrors the storage pattern (`WORKSPACE_MODE` /
  locus-aware resolution in `runtime/config.ts`): in-process store for
  `local` locus, swappable interface for cloud — with only the in-process
  implementation shipped.
- Invariant 7 codified: topic keys route, they never authorize; authorization
  is re-applied at every fan-out path.
- Backpressure is specified and implemented at the socket layer: bounded
  outbound queue, separate priority control channel, batch flush, slow-client
  disconnect after N consecutive full-buffer events.

## Non-Goals

- **No Redis/Valkey/NATS backend** — explicitly deferred (D16). This change
  ships the interface and the in-process implementation only.
- **No sharding / cross-node fan-out** — deferred per D16; single-task
  deployment stands.
- **No scoped-topic bus** (`ws:<id>:<topic>` with refcounted dynamic
  subscribe) — that is the Wave-2 destination; this change documents it as a
  target, nothing more.
- **No actor-per-topic** — waits for a runtime interface (IW-9 deferred list).
- **No socket auth or workspace membership changes** — upgrade auth,
  principal resolution, and membership checks in `realtime/socket.ts` are out
  of scope.
- **No client changes** — the wire protocol envelopes are unchanged; batch
  flush stays within existing `ServerMessage` frames.
- **No `doc`/`fs` namespace implementation** — they stay reserved.

## Capabilities

### New Capabilities

- `realtime-broker`: the broker⇄namespace-handler contract — async
  subscribe, stateless handlers over a broker-owned state store, delivery
  semantics (no ordering, no exactly-once), locus-selected store backends,
  fan-out authorization (invariant 7), and the documented Wave-2 scoped-topic
  target.

### Modified Capabilities

- `realtime-socket`: gains backpressure requirements (bounded outbound queue,
  priority control channel, batch flush, slow-client disconnect). Note: this
  capability currently lives as a change-delta under
  `openspec/changes/presence-realtime/specs/realtime-socket/` and is not yet
  synced to `openspec/specs/`; this change adds a delta on the same capability
  name so the requirements merge on sync.

## Constraints & Assumptions

- **Contract stability**: `iw9-chat-flagship` (Wave 2) depends on the revised
  `NamespaceHandler`/`RealtimeBroker` interfaces exactly as stated in this
  change's tech-plan; breaking them later means re-opening Chat's plan.
- **Serialization**: F5 touches only `server/workspace/src/realtime/*` and
  its tests — no shared files with F1-F4/F6 (per the IW-9 wave plan).
- Backpressure pattern source is the block/buzz connection lifecycle (D24
  reads buzz as reference material, not adopted code).
- Assumption: presence's in-process store keeps identical observable behavior
  (roster snapshots, join/leave/update deltas, exclusive focus) — this change
  refactors state ownership, not presence semantics.
- Assumption: queue bounds and disconnect thresholds are server-side
  constants with test-injectable overrides (matching how
  `pingIntervalMs`/`maxMissedPongs` are injected in socket.ts today), not
  user-visible configuration.

## Open Questions

None. Scope, ordering, and invariants are settled by IW-9-APP-FIRST.md (D16,
invariant 7); numeric defaults (queue depth, N full-buffer events, flush
interval) are implementation-chosen constants recorded in the tech-plan.
