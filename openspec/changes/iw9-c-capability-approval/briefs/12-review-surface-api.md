# Brief: aprovan — review surface API + notifications retrofit (server)

**Depends-on: 9, 10 (merged)** | Repo: aprovan | Wave 8

## Mission

When you are done, one server projection API composes queued actions,
staged session changes, merge conflicts, and capability requests into
`ReviewItem`s (shell/widget split, invariant 6); notifications retrofit
onto the same sandbox rules; decisions route to the holder of authority
(D15 / invariant 1).

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — **invariant 6**, 1
3. `openspec/changes/iw9-c-capability-approval/prd.md` — Goal 6
4. `openspec/changes/iw9-c-capability-approval/ux.md` — Review surface
5. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — Interfaces `ReviewItem`
6. `openspec/changes/iw9-c-capability-approval/specs/review-surface/spec.md`
7. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 12
8. `notifications/service.ts` (`NotificationRecord.widget` ~:66); streams 9–10 outputs; iw9-a answerable sessions

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 12.1 New module `review-surface.ts`: a projection API composing
      queued actions (stream 9), staged session changes (iw9-a's
      answerable sessions), merge conflicts, and capability requests
      (install/JIT/ask/draft cards from stream 10) into one `ReviewItem`
      list per tech-plan's shape, filterable by kind, with a combined
      badge count. New decision kinds are added as item kinds of this
      surface, never a new surface. Spec: review-surface "One surface,
      four item kinds", scenario "Mixed queue in one list".
- [ ] 12.2 `ReviewItem.shell` is built server-side only from the
      authoritative request data (who, capability, resource, credential
      level, effect, available decisions); `widget` carries only the
      app-supplied payload path/data. A widget-originated call re-enters
      `evaluateDispatch` — it never gets to assert its own authority.
      Spec: "Shell renders the decision, widget renders only the
      payload", scenarios "Widget cannot spoof the shell", "Payload edit
      re-renders shell", "No widget, generic card".
- [ ] 12.3 Retrofit `notifications/service.ts`'s existing
      `NotificationRecord.widget` (`:66`) onto the same shell/widget
      split and the same sandbox host as review items; `choices` render
      in the shell, not the widget; preserve the existing constraint that
      apps may only embed calls they can make themselves (now enforced by
      `evaluateDispatch` on widget-originated calls, not a separate
      check). Spec: "Notifications adopt the shell/widget split", scenario
      "Notification widget is sandboxed like a review widget".
- [ ] 12.4 Route each item to the queue of the principal with authority
      to decide it: workspace-credential grants → admins; user-credential
      and own-run approvals (`ask`, JIT) → the invoker (D15); a user is
      never shown a decision they cannot make except read-only admin
      visibility. Spec: "Decisions route to the holder of authority",
      scenarios "Run approval goes to invoker", "Workspace grant goes to
      admins".
- [ ] 12.5 New test file `tests/review-surface.test.ts`: one queued
      action + one staged change + one JIT request produce a combined
      list with badge count 3, filterable by kind; a widget claiming a
      different capability than the request does not change the shell
      header or what the approve button acts on; an edited payload
      re-renders the shell summary before approval; a notification
      widget's out-of-grant call is rejected by the dispatch predicate; a
      member's `ask` lands in their own queue, not an admin's; a
      workspace-credential request lands for admins only.

## Acceptance criteria

From `specs/review-surface/spec.md`:

#### Scenario: Mixed queue in one list
- **WHEN** a user has one queued action, one staged change, and one JIT
  capability request
- **THEN** all three appear in the same surface, filterable by kind, with
  a combined badge count of 3

#### Scenario: Widget cannot spoof the shell
- **WHEN** an app widget renders a payload claiming a different capability
  than the request carries
- **THEN** the shell header still shows the request's true (capability,
  resource, credential) and buttons act on that, not on widget content

#### Scenario: Payload edit re-renders shell
- **WHEN** the user edits the message body inside a send-message widget
- **THEN** the shell summary updates to reflect the edited payload before
  the approve button acts, and the approved action carries the edit

#### Scenario: No widget, generic card
- **WHEN** an item's app supplies no widget
- **THEN** the shell renders a generic payload card and all decisions remain available

#### Scenario: Notification widget is sandboxed like a review widget
- **WHEN** an app notification with a widget body renders
- **THEN** the widget runs in the same sandbox as review-surface widgets,
  the shell renders source app and choices, and a widget-embedded call
  outside the app's grants is rejected by the dispatch predicate

#### Scenario: Run approval goes to invoker
- **WHEN** a member's agent run raises an `ask`
- **THEN** the card appears in that member's review surface, not the admin's

#### Scenario: Workspace grant goes to admins
- **WHEN** an app requests a resource under a workspace-oauth credential
- **THEN** the card appears for workspace admins and resolves once for the
  whole space

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- review-surface
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/src/review-surface.ts`, `aprovan/server/workspace/src/notifications/service.ts`, `aprovan/server/workspace/tests/review-surface.test.ts`
- Do not build client components (stream 13). Shell is server-authored only.

## Report back

Check off tasks; PR or `briefs/12-report.md` with `ReviewItem` wire shape
for stream 13.
