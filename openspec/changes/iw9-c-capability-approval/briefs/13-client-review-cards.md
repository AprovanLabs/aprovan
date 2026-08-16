# Brief: aprovan — client: review surface, install card, JIT cards (widget-payload split)

**Depends-on: 12 (merged)** | Repo: aprovan | Wave 9

## Mission

When you are done, the web client renders the review surface, install card,
and JIT cards with invariant-6 shell/widget split (`PayloadWidgetHost`,
`ReviewItemShell`, credential badges), matcher-validated Allow-pattern
preview, and bulk actions constrained to a single (app, capability) group.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — **invariant 6**
3. `openspec/changes/iw9-c-capability-approval/ux.md` — Review surface, Install card, JIT card, Credential-level copy rules, Revocation cascade visibility
4. `openspec/changes/iw9-c-capability-approval/specs/review-surface/spec.md`
5. `openspec/changes/iw9-c-capability-approval/specs/capability-approval-flow/spec.md`
6. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — `ReviewItem`
7. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 13
8. Existing notification widget sandbox; published `matchesResourcePattern`

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 13.1 `PayloadWidgetHost`: sandboxed iframe host reused by review
      items and notifications (extends, does not duplicate, the existing
      notification widget sandbox); on widget failure to mount/compile,
      falls back to the generic payload card silently — the decision
      buttons stay live either way. ux.md "JIT card" states
      "widget-failed", "Notification card" states "widget-failed".
- [ ] 13.2 `ReviewItemShell`: renders only from server-supplied
      `ReviewItem.shell` (who/capability/resource/effect/credential +
      decision buttons); re-renders on a widget payload-edit event before
      any decision button is enabled to act (invariant 6 structural
      enforcement on the client). ux.md "Review surface" screen.
- [ ] 13.3 `CredentialLevelBadge` + shell sentence: implement the three
      fixed strings and distinct badge treatment from ux.md "Credential-
      level copy rules" (`workspace-token`/`workspace-oauth` = "Workspace
      bot"/"Workspace secret"; `user-oauth` = "Your account"); a
      `CredentialNotConnectedError` from the server renders the "Connect
      your account to let this continue as you" prompt, never a bare
      "connect a credential".
- [ ] 13.4 Install card: capability rows with effect + credential-level
      badges, undeclared/unused flags, "Send to admins" path when the
      confirming user cannot approve a workspace-level credential, and
      the "resources come later" note (ux.md "Install card"). JIT card:
      inline transcript slot (iw9-d's card slot) + review-surface
      duplicate, Allow once / Allow pattern (with matcher-validated
      coverage preview via the published `matchesResourcePattern`) / Deny
      (ux.md "JIT card").
- [ ] 13.5 Review surface panel: kind filter tabs with counts, item
      list/detail, bulk release/discard restricted to a single (app,
      capability) group, expiry countdown under 24h, revocation
      blast-radius confirm dialog (ux.md "Review surface", "Revocation
      cascade visibility").
- [ ] 13.6 Component/integration tests covering: shell summary re-render
      on widget edit before the approve action fires; generic-card
      fallback on widget mount failure; credential badge renders the
      correct fixed string per level; bulk actions disabled across mixed
      groups.

## Acceptance criteria

From `specs/review-surface/spec.md` and `ux.md` screens: shell/widget
split; credential copy rules; install/JIT/review surfaces as specified.
Client tests in 13.6 are the verification bar for UI-specific behavior.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web test -- review-surface
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/client/web/src/features/review-surface/**`, `aprovan/client/web/src/features/capability-cards/**`, `aprovan/client/web/src/features/notifications/**`
- Never let widget output feed the decision payload. Extend existing sandbox; do not duplicate.

## Report back

Check off tasks; PR or `briefs/13-report.md`; screenshot notes optional;
unblock stream 14.
