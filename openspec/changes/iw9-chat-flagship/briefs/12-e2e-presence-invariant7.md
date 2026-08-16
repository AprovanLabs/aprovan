# Brief: E2E — Presence, invariant 7, and platform-first close-out

**Depends-on: 2, 7, 9, 10, 11 (merged)** | Repo: aprovan | Wave 5 (final)

## Mission

When you are done, presence/typing E2E passes with grep-proven zero
`records.*`/`vfs.*` writes in `app-topics.ts`; invariant-7 guest
isolation is proven via raw WebSocket capture (`retries=0`); CF-1..CF-5
findings are re-checked; core-touch scope is git-diff verified; openspec
validate --strict passes.

**Already on main:** D stream 10 (CF-5) and D stream 8 (`RunTransport`) —
confirm in findings close-out; do not rebuild.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — **invariant 7**
3. `openspec/changes/iw9-chat-flagship/prd.md` — Presence / invariant 7 / platform-first
4. `openspec/changes/iw9-chat-flagship/tech-plan.md` — Findings CF-1..CF-5; Non-Goals core touches; T6
5. `openspec/changes/iw9-chat-flagship/specs/chat-realtime/spec.md`
6. `openspec/changes/iw9-chat-flagship/specs/chat-app/spec.md` — Gap discovered…
7. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 12
8. Stream 9 `ws-capture` fixture

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 12.1 Presence spec (`chat-presence.spec.ts`): two connected users see
      each other online, typing indicator round-trips within ~4s TTL, and
      disconnect clears presence for all viewers (PRD goal "Presence
      visible", spec `chat-realtime` "Presence and typing are ephemeral").
- [ ] 12.2 Grep gate (in Verify) proving zero writes to `records.*`/`vfs.*`
      on any code path in `realtime/app-topics.ts` — the PRD's
      grep-verifiable claim, enforced as an actual gate, not a manual check.
- [ ] 12.3 Invariant-7 spec (`chat-invariant7-guest-isolation.spec.ts`): a
      guest with a live subscription captures its full raw WebSocket frame
      stream (stream 9's capture helper) while a message is posted to a
      restricted channel the guest cannot read; assert zero frames reference
      that channel. `retries=0` per tech-plan T6 ("a flaky security
      assertion is worse than a slow one").
- [ ] 12.4 Same spec, second case: revoke a participant's channel access
      mid-session (open subscription) and assert post-revocation events are
      filtered without a reconnect (spec `chat-realtime` "Revocation takes
      effect at fan-out").
- [ ] 12.5 Findings and attribution close-out: re-read tech-plan.md
      "Findings" (CF-1..CF-5) against what actually landed — append any gap
      discovered during implementation that wasn't anticipated (spec
      `chat-app` "Gap discovered during implementation"); confirm
      `client/web/NOTICE` and vendor headers are present (stream 6);
      confirm no core file outside `realtime/app-topics.ts` (stream 2) and
      `invites.ts`/`identity/types.ts`/`identity/store.ts`/
      `routes/invites.ts` (stream 3) changed under `server/workspace/src/`
      (`git diff --stat` scoped review — the "one deliberate, minimal core
      touch" claim, tech-plan Non-Goals).
- [ ] 12.6 Run `openspec validate --change iw9-chat-flagship --strict` and
      fix anything it flags before closing the change.

## Acceptance criteria

From `specs/chat-realtime/spec.md`: Guest never receives unreadable-channel
events; Revocation takes effect at fan-out; Presence and typing are
ephemeral. From `chat-app`: Gap discovered during implementation handled
as findings. Grep gate + core-touch git-diff + openspec validate green.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec playwright test e2e/chat-presence.spec.ts e2e/chat-invariant7-guest-isolation.spec.ts --retries=0 && ! grep -rn "records\.\(set\|put\|write\)\|vfs\.\(write\|put\)" server/workspace/src/realtime/app-topics.ts
```

Also run task 12.6 validate.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/client/web/e2e/chat-presence.spec.ts`, `aprovan/client/web/e2e/chat-invariant7-guest-isolation.spec.ts` (plus tech-plan Findings append if 12.5 requires; openspec validate fixes only as needed)
- `--retries=0` on security assertions. Do not expand core touches.

## Report back

Check off tasks; PR or `briefs/12-report.md` with CF findings status,
grep/git-diff evidence, and validate result — change close-out.
