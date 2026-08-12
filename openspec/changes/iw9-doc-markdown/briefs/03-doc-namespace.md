# Brief: Server — `doc` realtime namespace (F5-gated)

**Depends-on: 2** | Repo: aprovan | Wave 2 (parallel with 5)

## Mission

When you are done, the reserved `doc` namespace is unreserved and registered
as a `NamespaceHandler` that syncs Yjs + awareness over base64-in-JSON
frames on `doc:<path>` topics. Two joiners share one `LiveDoc`; last leave
releases it after ordered teardown.

**Hard gate:** `iw9-f5-broker-spec` must be on main — async
`onSubscribe(): Promise<{body?}>`. If `broker.ts` still has a synchronous
`onSubscribe`, stop and report; do not invent a sync workaround.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 7, 9
3. `openspec/changes/iw9-doc-markdown/tech-plan.md` — D1; Interfaces (DocSyncFrame / DocAwarenessFrame)
4. `openspec/changes/iw9-doc-markdown/specs/document-collab/spec.md`
5. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 3 + F5 external note
6. `server/workspace/src/realtime/presence.ts` — `createPresenceHandler` pattern (`:69-195`)
7. `server/workspace/src/realtime/protocol.ts` — `RESERVED_NAMESPACE_DOC`
8. `server/workspace/src/doc/registry.ts` — from stream 2

## Tasks

- [ ] 3.1 (F5-gated) Remove `"doc"` from `RESERVED_NAMESPACES`
      (`protocol.ts:15,24-27`) — the reservation comment names exactly this
      change as its consumer.
- [ ] 3.2 `doc/doc-namespace.ts`: `createDocHandler(broker)` returning a
      `NamespaceHandler` modeled on `presence.ts:69-195`'s shape —
      `onSubscribe` (async: `getOrLoadDoc`, reply with a `DocSyncFrame` per
      tech-plan "Interfaces & Data", then a second `event` frame carrying
      the current awareness snapshot), `onPublish` (parse `DocSyncFrame` /
      `DocAwarenessFrame`, apply via `syncProtocol.readSyncMessage` /
      `awarenessProtocol.applyAwarenessUpdate`, re-broadcast to other
      subscribers via `broker.publishToTopic`), `onDisconnect`
      (`awarenessProtocol.removeAwarenessStates` for the conn's clientID,
      broadcast the removal, decrement `LiveDoc.participants`, schedule
      release when it hits zero per D2's ordered teardown).
- [ ] 3.3 Register the handler in `attachRealtime`
      (`socket.ts:154-157`, beside `createPresenceHandler`).
- [ ] 3.4 Tests: two connections joining the same `(workspaceId, path)`
      converge to one `LiveDoc` (spec document-collab "Concurrent joiners
      share one doc"); reconnect syncs against live state, not a fresh file
      read (spec "Doc identity survives reconnect"); awareness join/update/
      leave deltas match the "Two users see each other's cursors" /
      "Departure clears presence" scenarios; last-leave releases the doc and
      a subsequent join reconstructs identical content (spec "Last leave
      releases the doc") — assert `hasLiveDoc` is false in between.

## Acceptance criteria

From `specs/document-collab/spec.md`:

#### Scenario: Concurrent joiners share one doc

- **WHEN** two clients join a session for the same workspace path at the
  same time
- **THEN** both converge to a single server-held doc, and a character typed
  by either client appears in the other's editor without reload

#### Scenario: Doc identity survives reconnect

- **WHEN** a client disconnects and rejoins the same path while other
  participants kept the session alive
- **THEN** it syncs against the same live doc state, not a fresh doc
  re-read from the file

#### Scenario: Two users see each other's cursors

- **WHEN** two authenticated users have the same document open and one
  moves their cursor or changes their selection
- **THEN** the other sees the updated cursor/selection decorated with the
  first user's display name, without any document content change

#### Scenario: Departure clears presence

- **WHEN** a participant closes the document or their connection drops
- **THEN** their cursor, selection, and name disappear from all remaining
  participants' editors, and no trace of the awareness state is persisted

#### Scenario: Last leave releases the doc

- **WHEN** the last participant leaves a live session and quiesce
  materialization plus snapshot persistence complete
- **THEN** the server drops the in-memory doc, and a subsequent join
  reconstructs identical content from durable state

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/doc-namespace.test.ts realtime-broker.test.ts && pnpm --filter @aprovan/workspace typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `server/workspace/src/realtime/protocol.ts`, `server/workspace/src/doc/doc-namespace.ts`, `server/workspace/src/realtime/socket.ts`, `server/workspace/tests/doc-namespace.test.ts`
- Wire shape is base64-in-JSON inside existing envelopes (D1) — no binary WS framing.
- Join auth / quiesce materialization belong to stream 4 — only wire the
  zero-participant release schedule here as D2 requires; stream 4 completes materialize-on-release.

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/03-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know (frame shapes for client stream 7).
