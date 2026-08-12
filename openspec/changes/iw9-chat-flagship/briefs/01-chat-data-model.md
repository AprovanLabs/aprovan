# Brief: Chat data model and channel authorization helper

**Depends-on: -** | Repo: aprovan | Wave 0 (parallel with 3, 6, 9)

## Mission

When you are done, Chat has `Channel`/`Message` schemas and CRUD on F2's
shared partition, plus the single shared `canReadChannel` authz helper
(T3) used by both the read path and CF-1 fan-out (stream 2). Deny-as-404
for non-participants/non-members. This is the data foundation for the
flagship.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 4, 7, 8
3. `openspec/changes/iw9-chat-flagship/prd.md`
4. `openspec/changes/iw9-chat-flagship/tech-plan.md` — T3, Interfaces (`Channel`, `Message`)
5. `openspec/changes/iw9-chat-flagship/specs/chat-app/spec.md`
6. `openspec/changes/iw9-chat-flagship/tasks.md` — preamble + stream 1
7. F2 frozen: `apps/instances.ts` `assertInstanceAccess`, `resolveRecordScope`

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`. Create `apps/chat/**` as needed.

## Tasks

- [x] 1.1 Define `Channel` and `Message` zod schemas exactly as specified in
      tech-plan.md "Interfaces & Data" (`ch#<channelId>`,
      `msg#<channelId>#<messageId>` ULID keys, `parentId` for one-level
      threads, `agent` marker field) in `apps/chat/schema.ts`.
- [x] 1.2 Implement channel/message CRUD against F2's shared partition via
      `resolveRecordScope(ctx, { instance })` (iw9-f2 frozen seam) —
      `createChannel`, `postMessage` (rejects `parentId` pointing at a
      message that itself has a `parentId` — spec `chat-app` "Thread nesting
      is bounded"), `listChannels`, `fetchWindow`/`fetchOlder` by
      `createdAt`/id ordering.
- [x] 1.3 Implement `canReadChannel(principal, installId, channelId)` in
      `apps/chat/authz.ts`: public channel ⇒ any F2 instance participant
      (via `assertInstanceAccess`); restricted channel ⇒ participant is also
      in the channel's `members` list. This is the ONE authz function T3
      commits to sharing between the read path (this stream) and CF-1's
      delivery filter (stream 2) — export it, do not duplicate it.
- [x] 1.4 Enforce deny-as-404 for non-participants and non-members
      (spec `chat-app` "Non-participant cannot read instance data",
      "Restricted channel hides from non-members" — invariant 8 posture, no
      existence oracle).
- [x] 1.5 New test file `tests/chat-data-model.test.ts`: attributed message
      write, thread-reply-of-reply rejected, restricted channel invisible to
      non-members, non-participant 404 on every read/write surface,
      `canReadChannel` unit-covered for public/restricted/non-member/
      non-participant/guest-with-partial-grant cases (feeds stream 2's reuse
      claim).

## Acceptance criteria

From `specs/chat-app/spec.md`:

#### Scenario: Message write is attributed and partition-scoped
- **WHEN** a participant posts a message to a channel
- **THEN** the record is written to that instance's shared partition with
  the author's user id, and is readable by other participants of that
  channel only

#### Scenario: Non-participant cannot read instance data
- **WHEN** a user who is not a participant of the instance queries its
  records
- **THEN** the platform returns the established deny-as-404 behavior — no
  existence oracle

#### Scenario: Thread nesting is bounded
- **WHEN** a client attempts to create a thread reply on a message that is
  itself a thread reply
- **THEN** the write is rejected with a validation error

#### Scenario: Restricted channel hides from non-members
- **WHEN** a participant who is not a member of a restricted channel lists
  channels or fetches its messages
- **THEN** the restricted channel's messages are not returned, and message
  fetch behaves as deny-as-404

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace exec vitest run tests/chat-data-model.test.ts && pnpm --filter @aprovan/workspace typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/src/apps/chat/schema.ts`, `aprovan/server/workspace/src/apps/chat/service.ts`, `aprovan/server/workspace/src/apps/chat/authz.ts`, `aprovan/server/workspace/tests/chat-data-model.test.ts`
- Export `canReadChannel` for stream 2 — do not reimplement elsewhere.
- F2 contracts are frozen — consume, don't redesign.

## Report back

Check off tasks; PR or `briefs/01-report.md` with `canReadChannel` export
path for stream 2.
