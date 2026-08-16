# Brief: CF-2 — Instance-targeted guest invites (core touch)

**Depends-on: -** | Repo: aprovan | Wave 0 (parallel with 1, 6, 9)

## Mission

When you are done, `InviteRecord` optionally carries
`target: { kind: "app-instance"; installId; channelIds? }`; consume mints
an F2 guest participant (not workspace membership) when target is set;
absent target remains byte-identical. Existing invite tests still pass.
Deliberate minimal core touch (CF-2).

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 5, 9
3. `openspec/changes/iw9-chat-flagship/prd.md` — Hosted install goal
4. `openspec/changes/iw9-chat-flagship/tech-plan.md` — CF-2 invite shape
5. `openspec/changes/iw9-chat-flagship/specs/chat-guest-access/spec.md`
6. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 3
7. `invites.ts`, `identity/types.ts`, `identity/store.ts`, `routes/invites.ts`; F2 `addParticipant`

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 3.1 Extend `InviteRecord` (`identity/types.ts`) with optional
      `target?: { kind: "app-instance"; installId: string; channelIds?:
      string[] }` (tech-plan CF-2 shape). Absent target ⇒ byte-identical
      existing behavior — no change to any call site that doesn't pass one.
- [ ] 3.2 Extend `createInvite`/the identity store's invite `create` to
      accept the optional `target`, and `consumeInvite`'s consume path: when
      `target.kind === "app-instance"`, mint an F2 participant entry
      (`apps/instances.ts` `addParticipant`, role `guest`, scoped to
      `channelIds` if given) instead of a workspace membership (spec
      `chat-guest-access` "Guest invites via existing invite machinery").
      When absent, today's `consume → membership` path is untouched.
- [ ] 3.3 `routes/invites.ts`: accept the optional target on invite-create,
      keep the 7-day TTL and single-use-on-consume semantics unchanged
      (spec "Invite is single-use and expiring").
- [ ] 3.4 New test file `tests/invites-app-instance-target.test.ts`: targeted
      invite consume mints exactly one F2 participant entry with role
      `guest` and zero workspace membership rows; consumed/expired token
      fails distinguishably with no participation created; revoke makes the
      token non-consumable; existing non-targeted invite tests
      (`tests/invites.test.ts`) still pass unmodified — the regression gate
      tech-plan's Risks section requires.

## Acceptance criteria

From `specs/chat-guest-access/spec.md`:

#### Scenario: Guest joins hosted instance via link
- **WHEN** a creator issues a guest invite for their hosted instance and the
  invitee opens the link and authenticates
- **THEN** the invite is consumed exactly once, the invitee appears in the
  instance participant list as a guest, and can read/post in granted
  channels

#### Scenario: Invite is single-use and expiring
- **WHEN** a consumed or expired (7-day TTL) invite token is presented
- **THEN** joining fails with a distinguishable error and no participation
  is created

#### Scenario: Host revokes a pending invite
- **WHEN** the host revokes a pending guest invite
- **THEN** the token no longer consumes, and the revocation is visible in
  the host's invite list

#### Scenario: Anonymous user cannot participate
(enforced at consume — unauthenticated visitors cannot consume; UI in stream 8)

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace exec vitest run tests/invites-app-instance-target.test.ts tests/invites.test.ts && pnpm --filter @aprovan/workspace typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/src/invites.ts`, `aprovan/server/workspace/src/identity/types.ts`, `aprovan/server/workspace/src/identity/store.ts`, `aprovan/server/workspace/src/routes/invites.ts`, `aprovan/server/workspace/tests/invites-app-instance-target.test.ts`
- Additive `target` only; absent-target path untouched. Do not fork invite machinery.

## Report back

Check off tasks; PR or `briefs/03-report.md`; confirm `tests/invites.test.ts`
still green.
