# Brief: E2E — Hosted install (friends) and guest join

**Depends-on: 3, 4, 8, 9 (merged)** | Repo: aprovan | Wave 4

## Mission

When you are done, a Playwright `@chat` spec proves hosted-by-creator
install into personal space (D1 default surfaced), guest join without
workspace membership, disclosure copy, invite expiry/revoke negatives, and
live removal without reconnect (invariant 3/7).

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 3, 5, 7, 9
3. `openspec/changes/iw9-chat-flagship/prd.md` — Hosted install (friends)
4. `openspec/changes/iw9-chat-flagship/ux.md` — disclosure copy verbatim
5. `openspec/changes/iw9-chat-flagship/specs/chat-guest-access/spec.md`
6. `openspec/changes/iw9-chat-flagship/specs/chat-app/spec.md` — Hosted default…
7. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 11
8. Stream 9 two-users + fixtures; streams 3/8 surfaces

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 11.1 Flow: creator installs Chat into their personal space choosing
      **hosted-by-creator** (assert D1 default is surfaced, not silently
      applied — spec `chat-app` "Hosted default is the creator's personal
      space"), invites a guest by link, guest (separate browser context, no
      pre-existing workspace membership) opens the link, authenticates,
      accepts the join card, and posts a message in a granted channel — PRD
      goal "Hosted install (friends)".
- [ ] 11.2 Assert the guest never becomes a member of the creator's
      workspace (server-side membership check returns empty — spec
      `chat-guest-access` "Guest joins hosted instance via link") and the
      hosted-vs-managed disclosure text is visible in the guest's join card
      and instance header (invariant 5 copy, ux.md verbatim).
- [ ] 11.3 Negative cases in the same spec: expired/consumed/revoked invite
      link shows the distinguishable terminal copy and creates no
      participation (spec "Invite is single-use and expiring", "Host
      revokes a pending invite").
- [ ] 11.4 Removed-guest case: host removes the guest mid-session (open
      connection); assert the guest's next fan-out event is not delivered
      and their next store read is denied, without requiring a reconnect
      (spec `chat-guest-access` "Removed guest loses live access" —
      invariant 3/7).

## Acceptance criteria

From `specs/chat-guest-access/spec.md` and `chat-app` hosted-default /
disclosure scenarios — all listed in tasks 11.1–11.4.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec playwright test e2e/chat-hosted-guest-join.spec.ts --retries=0
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/client/web/e2e/chat-hosted-guest-join.spec.ts`
- `--retries=0`. Tag `@chat`. Verbatim ux.md disclosure assertions.

## Report back

Check off tasks; PR or `briefs/11-report.md`; unblock stream 12.
