# Manual smoke checklist — workspace-app-cleanup (task 11.5)

Owner-run acceptance gate for “zero user-visible behavior change.” Source of truth
for flow detail is `../ux.md` (Flows + Screens & States). This file is the
checkbox list to run and record; check off items here when done, then mark
`tasks.md` 11.5.

**Prior partial pass** (`briefs/00-report.md`): boot, workspace tree + create-file
→ preview tab, native `agents` tab, tab strip controls + reload persistence, chat
dock expand, session “Synced” chip, provider-not-connected gating. **Not done:**
LLM send/stream, self-heal, session apply/discard/merge, edit-modal LLM path,
notifications-bell widget.

**Prereqs:** running gateway + `patchwork-web`; LLM provider credential connected
for flows marked LLM.

## Flows

- [ ] **Send + widget render** (LLM) — composer submit; lazy session create if
      needed; stream into `MessageBubble`; compilable/widget fence mounts live
      preview; unclosed fence stays raw text until close.
- [ ] **Self-heal** (LLM) — force a widget throw; auto follow-up under
      `MAX_WIDGET_AUTOFIXES = 2`; user send re-arms the window.
- [ ] **Tabs (all namespaces)** — open `native://…`, `app://…`,
      `workflow://…`, and a workspace file; icons + panel dispatch correct;
      app→workflow retitles in place; open/close/active persist across reload.
- [ ] **Session lifecycle** — new / switch / boot restore; Apply, Discard, Reset,
      Delete, Sync; ~20s conflict → `MergeDialog` → completion path; presence
      heartbeat; all via `SessionBar`.
- [ ] **Edit modal** — open via tab or widget edit; live compile preview; close
      apply / keep-draft / discard paths.
- [ ] **Notifications bell** — header bell + drawer; rich notification path
      renders via `NotificationPathWidget` (compiler wired).

## Screens & states (spot-check)

- [ ] Chat dock: empty session, streaming indicator, transport error placement.
- [ ] Tab strip + preview: empty tabs, `workspaceLoading` / `workspaceError` /
      `compilerError` still visible.
- [ ] Sidebar: boot load, empty workspace, create/delete feedback, mobile drawer.
- [ ] Session bar: `sessionBusy` disables actions; `sessionNotice` shows; merge
      conflict path.
- [ ] Edit modal: compile loading + inline compile error (no modal crash).

## Done when

Every box above is checked on a real browser against the composed `ChatPage`
(post–streams 2–11). Then check `tasks.md` 11.5 and note date/env in this file
or a short `briefs/11.5-report.md`.
