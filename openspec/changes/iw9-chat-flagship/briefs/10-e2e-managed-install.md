# Brief: E2E — Managed install (company)

**Depends-on: 4, 7, 9 (merged)** | Repo: aprovan | Wave 3 (parallel with 8)

## Mission

When you are done, a Playwright `@chat` spec proves the PRD managed-install
goal: workspace with ≥2 members, Chat installed workspace-managed, both
users exchange channel + thread messages, timelines converge, host mode
immutable server-side, data in F2 shared partition.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 5, 10
3. `openspec/changes/iw9-chat-flagship/prd.md` — Managed install (company)
4. `openspec/changes/iw9-chat-flagship/specs/chat-app/spec.md` — host mode scenarios
5. `openspec/changes/iw9-chat-flagship/ux.md`
6. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 10
7. Stream 9 fixtures (`two-users`); stream 4/7 surfaces

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [x] 10.1 Flow: create a workspace, invite and add ≥2 users via the
      existing `invites.*` machinery (not Chat's guest path), install Chat
      choosing **workspace-managed**, both users open the same channel and
      exchange messages, one user posts a thread reply — PRD goal "Managed
      install (company)".
- [x] 10.2 Assert: both users' timelines converge on the same message ids
      (adapter reconciliation, T4); the install-mode prompt appeared because
      two modes are declared (spec `chat-app` "Install prompts for host
      mode"); the chosen mode is rejected on a follow-up mutation attempt
      (spec "Host mode cannot change after install" — call the platform
      mutation directly in-test, not through UI, to prove server-side
      enforcement independent of the UI).
- [x] 10.3 Assert data lands in the F2 shared partition of the company
      workspace (server-side assertion via a test-only record read, not UI
      inference).

## Acceptance criteria

From `specs/chat-app/spec.md`:
#### Scenario: Install prompts for host mode
#### Scenario: Host mode cannot change after install
Plus PRD managed-install E2E bar (message + thread exchange; F2 partition).

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec playwright test e2e/chat-managed-install.spec.ts --retries=0
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/client/web/e2e/chat-managed-install.spec.ts`
- Use workspace invites, not guest path. `--retries=0`. Tag `@chat` in title.

## Report back

Check off tasks; PR or `briefs/10-report.md`; flake notes for stream 12.
