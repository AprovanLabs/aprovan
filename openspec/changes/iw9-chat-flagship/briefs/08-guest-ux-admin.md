# Brief: Guest UX and host administration surface

**Depends-on: 3, 4, 7 (merged)** | Repo: aprovan | Wave 3 (parallel with 10)

## Mission

When you are done, hosts can issue/revoke guest invites and manage
storage/caps/delete; guests see the trusted-shell join card (invariant 6 —
copy only, no custom widget v1) with ux.md disclosure verbatim; managed
mode coworker picker requires workspace membership first.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 5, 6, 9
3. `openspec/changes/iw9-chat-flagship/ux.md` — Friends install, Manage panel, Host administration, disclosure copy
4. `openspec/changes/iw9-chat-flagship/specs/chat-guest-access/spec.md`
5. `openspec/changes/iw9-chat-flagship/specs/chat-app/spec.md` — Hosted-vs-managed disclosure; Host storage
6. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 8
7. Stream 3 invite APIs; F2 `apps.instance*` metering

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 8.1 Guest invite issuance UI (creator side): email + optional channel
      subset, link creation, pending-invite list with revoke and expiry
      countdown (ux.md "Friends install" flow steps 3, "Manage panel").
- [ ] 8.2 Guest join card (trusted-shell payload per invariant 6 — Chat
      supplies copy only, no custom widget in v1): inviter identity,
      instance name, granted-channel summary, hosted/managed disclosure copy
      verbatim from ux.md, sign-in-first gate for unauthenticated visitors
      (invariant 9 — spec `chat-guest-access` "Anonymous user cannot
      participate"), already-a-participant deep-link skip.
- [ ] 8.3 Guest lifecycle UI: host can remove a guest (participant list in
      the Manage panel), guest can leave; removal effect is asserted
      end-to-end in stream 12, this task only wires the UI action to the
      platform call.
- [ ] 8.4 Host Manage panel: storage usage meter with "as of {time}" stamp,
      cap editor with below-usage warning, delete-instance flow with typed
      confirmation (D22, ux.md "Host administration" flow) — reads/writes
      only through `apps.instance*` (iw9-f2 frozen procedures).
- [ ] 8.5 Managed-mode "add coworkers" picker restricted to workspace
      members, with the "invite to the workspace first" guidance copy for
      non-members (spec `chat-guest-access` "Managed mode requires
      membership").
- [ ] 8.6 New test file `chat-guest-join.test.ts`: unauthenticated visitor
      redirected to sign-in before join, expired/revoked/consumed invite
      shows distinct terminal copy, already-participant skips the card,
      hosted disclosure text matches ux.md verbatim (snapshot).

## Acceptance criteria

From `specs/chat-guest-access/spec.md` and `chat-app` disclosure/storage
scenarios; ux.md copy verbatim for hosted disclosure.

#### Scenario: Anonymous user cannot participate
#### Scenario: Non-member cannot be added to managed instance
#### Scenario: Guest sees hosting disclosure
#### Scenario: Host views and caps storage / Host deletes the instance

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec vitest run src/features/messaging/guest src/features/messaging/admin && pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/client/web/src/features/messaging/guest/**`, `aprovan/client/web/src/features/messaging/admin/**`, `aprovan/client/web/src/lib/__tests__/chat-guest-join.test.ts`
- No custom join widget in v1. Verbatim ux.md disclosure. F2 metering only.

## Report back

Check off tasks; PR or `briefs/08-report.md`; unblock stream 11.
