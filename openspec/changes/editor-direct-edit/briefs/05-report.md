# Report: Chat as an opt-in dock (stream 5)

## PR
https://github.com/AprovanLabs/aprovan/pull/57

## Verify results

| Check | Result |
| --- | --- |
| `pnpm --filter @aprovan/patchwork-web build` | Pass |
| Peers UI from #47 not restored | Pass |

## What landed

**5.1** — `ChatDock` is an opt-in right-side panel opened from the pane header `Chat`
button (plus a header MessageSquare when the dock is closed). Desktop width is
drag-resizable; mobile uses a bottom sheet with scrim. File context is shown in the
dock header and carried into the composer / first send. Opening the dock does not
create a session.

**5.2** — First chat send creates a `mode: "staged"` session so AI file edits always
land in the session overlay. A Proposed changes review block lists changed files with
Apply / Dismiss wired to the existing apply/discard procedures.

**5.3** — When proposal apply hits conflicts, `publishConflictNotification` fires with
`origin: "chat-proposal"` (MergeDialog still opens for resolution).

## Notes

- Rebased onto `origin/main` after stream 6 SessionBar declutter (#54); did not restore
  peers or `keepEditDrafts`.
- SessionBar declutter remains stream 6's domain — untouched beyond consuming its
  post-declutter props.
