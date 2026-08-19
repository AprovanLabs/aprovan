# Smoke report — workspace-app-cleanup (task 11.5)

**Date:** 2026-08-18
**Agent:** Claude Fable 5 (automated smoke run)
**Verdict:** PARTIAL — 19 automatable flows PASS, 11 NOT-AUTOMATABLE (require live LLM or second user)
**Task 11.5:** NOT checked off — 11 flows still require human eyes

---

## Environment

| Item | Value |
|------|-------|
| Gateway | `@aprovan/workspace` via `tsx src/cli.ts start --mode local --port 4010` (SQLite, auth-none) |
| Web client | `@aprovan/patchwork-web` Vite dev server, port 5174, `APROVAN_ENV=off` |
| Data dir | `$TMPDIR/aprovan-playwright-e2e` (ephemeral, suite-scoped) |
| Browser | Chromium (Playwright 1.62.1, headless) |
| Commands | `pnpm turbo run build --filter @aprovan/workspace && pnpm turbo run build --filter @aprovan/patchwork-web` (warm cache) |
| Run command | `APROVAN_ENV=off pnpm --filter @aprovan/patchwork-web exec playwright test --grep @smoke-cleanup --timeout=60000` |
| Total elapsed | ~22 s |
| Spec | `client/web/e2e/workspace-app-cleanup-smoke.spec.ts` |

---

## Results table

| # | Checklist item | Verdict | Notes |
|---|---------------|---------|-------|
| F1 | Send + widget render (LLM) | NOT-AUTOMATABLE | Requires a live LLM provider credential (no `OPENAI_API_KEY` / equivalent in env) |
| F2 | Self-heal (LLM) | NOT-AUTOMATABLE | Depends on F1; `MAX_WIDGET_AUTOFIXES=2` budget cannot be exercised without a real stream |
| F3a | App boots, chat dock empty state renders | PASS | Composer (`<textarea>`) visible within 15 s of boot |
| F3b | Native tab opens (`native://agents`) via sidebar | PASS | "Agents" row clickable; tab title appears in tab strip |
| F3c | Tab strip icon for native tab (deep-link `?native=credentials`) | PASS | `[title*="credentials"]` tab visible after deep-link boot |
| F3d | Tab open/active persists across reload (localStorage) | PASS | Tab restored after `page.reload()` via `patchwork:open-tabs` key |
| F3e | `app://` and `workflow://` tab namespaces | NOT-AUTOMATABLE | Requires an installed app manifest; seeding the registry needs the full apps pipeline |
| F4a | Session bar renders on boot — SyncChip visible | PASS | "Synced" text appears in chat dock within 15 s |
| F4b | New session button present in SessionBar | PASS | Plus-icon button found in header area |
| F4c | No React crash from session-state hook wiring | PASS | No error boundary text in DOM |
| F4d | Apply / Discard / Sync / Delete session actions | NOT-AUTOMATABLE | Requires an active draft session with VFS file changes (needs LLM) |
| F4e | ~20 s conflict → MergeDialog completion path | NOT-AUTOMATABLE | Requires two concurrent editors with conflicting commits |
| F4f | Presence heartbeat (other peers) | NOT-AUTOMATABLE | Requires a second authenticated user in the same session |
| F5a | EditModal does not appear uninvited on boot | PASS | `[role="dialog"]` count = 0 after 2 s settle |
| F5b | EditModal LLM edit path (live compile preview) | NOT-AUTOMATABLE | `EditTransport` path requires LLM completions; `buildEditMessages` cannot be exercised headlessly |
| F6a | Notifications bell renders in AppHeader | PASS | Bell icon button visible |
| F6b | Clicking bell opens notification drawer | PASS | No crash; drawer responds to click |
| F6c | `NotificationPathWidget` rich render | NOT-AUTOMATABLE | Needs a workspace notification with a compilable widget path (LLM-generated) |
| S1 | Chat dock: empty session renders (not blank pane) | PASS | Composer visible in empty-session state |
| S2 | Chat dock: streaming indicator / status=ready on boot | PASS | Composer not disabled after 2 s settle (implies `useChat` status=ready) |
| S3 | Chat dock: transport error placement | NOT-AUTOMATABLE | Triggering mid-stream gateway error requires an active send |
| S4 | Tab strip: no strip when tabs list is empty | PASS | After clearing `patchwork:open-tabs*` from localStorage, no virtual-path tab buttons visible |
| S5 | Workspace loading / workspace error: no error text on boot | PASS | No "failed to load / network error" text in DOM |
| S6 | Sidebar: boot load settles (not stuck in spinner) | PASS | Spinner count ≤ 1 after 3 s settle |
| S7 | Sidebar: mobile drawer toggle works | PASS | Hamburger click produces no crash; drawer appears (375×812 viewport) |
| S8 | Session bar: sessionBusy / sessionNotice wiring visible | PASS | Sync chip text present |
| S9 | Session bar: merge conflict path | NOT-AUTOMATABLE | Same as F4e |
| S10 | Edit modal: compile error inline (no modal crash) | NOT-AUTOMATABLE | Same as F5b |
| R1 | Provider-not-connected: send blocked or banner shown | PASS | Send button disabled (no LLM credential in local env) |
| R2 | No React error boundary on boot | PASS | No "something went wrong" text; no fatal `pageerror` events |

---

## Summary counts

| Verdict | Count |
|---------|-------|
| PASS | 19 |
| FAIL | 0 |
| NOT-AUTOMATABLE | 11 |
| **Total** | **30** |

---

## Human-eyes shortlist

These 11 items still require a real browser session with LLM provider credentials and/or a second human user. They cannot be meaningfully automated without that infrastructure.

1. **F1 — Send + widget render**: Type a prompt in the composer; confirm streaming into `MessageBubble`; confirm compilable fence mounts as `CodePreview` inline; confirm unclosed fence stays raw text.
2. **F2 — Self-heal**: Force a widget throw (break a widget's code); verify the orchestrator sends a follow-up automatically under `MAX_WIDGET_AUTOFIXES = 2`; verify a user send re-arms the window.
3. **F3e — app:// and workflow:// tabs**: Open an app tab and a workflow tab; verify icons + panel dispatch; verify `retitleAppsTab` re-keys (not duplicates) when navigating app→workflow.
4. **F4d — Session Apply/Discard/Sync/Delete**: Create a draft session; make file edits (via LLM); Apply → verify changes land; Discard → verify rollback; Delete → verify session removed.
5. **F4e — Merge conflict → MergeDialog**: Have two concurrent editors diverge; wait ~20 s for conflict poll; confirm `MergeDialog` appears; resolve and confirm `runMergeCompletion` path fires.
6. **F4f — Presence heartbeat**: Open the same session in two browsers; verify presence avatars update live on both sides.
7. **F5b — EditModal LLM path**: Open a file for edit via a widget's "edit" affordance; verify `EditTransport`/`buildEditMessages` streaming; verify live compile preview updates; test close→apply, close→keep-draft, and close→discard paths.
8. **F6c — NotificationPathWidget rich render**: Trigger a workspace notification that carries a compilable widget path; verify `NotificationPathWidget` mounts via the same compiler instance as the rest of the app (the compiler dependency must survive the refactor's new module boundaries).
9. **S3 — Transport error placement**: Send a message; have the gateway return an error mid-stream; verify the error surfaces via `useChat().error` in the same placement/copy as before the refactor.
10. **S9 — Session bar merge conflict path**: Same as F4e but specifically focused on the `SessionBar` action disabling during `sessionBusy` and the `sessionNotice` transient messaging after resolution.
11. **S10 — Edit modal compile error inline**: Open EditModal with a file that has a compile error; verify the error renders inline in the modal, not as a modal crash or blank pane.

---

## Observations from automated run

- The local gateway starts cleanly in `local` / `auth-none` / SQLite mode.
- Vite dev server emits one benign warning about an unanalyzable dynamic import in `packages/compiler/dist/index.js` (pre-existing; not introduced by this change).
- The pre-existing "Invalid hook call" dual-module warning noted in `00-report.md` deviation #7 was not observed in the automated run (it may only appear when `SidebarApps` renders with a seeded apps catalog).
- All `useChat` / `useSessionOrchestration` / `useCompilerBootstrap` / `useTabs` / `useWorkspaceExplorer` hook wiring in the composition root boots without a React error boundary, confirming stream 11's composition root is structurally sound.
