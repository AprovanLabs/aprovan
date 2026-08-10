# Report: F6 stream 11 — stale registry docs

## Result
Merged registry PR https://github.com/AprovanLabs/registry/pull/160 (`8d4b79d`).

## What landed
- `docs/apps-and-workflows.md` stubbed; STALE banner removed
- `docs/vcs-and-sessions.md` Surface section rewritten to `vcs.*` / record-store; PARTIALLY STALE banner removed
- `docs/platform.md` inbound clause updated for the stub

## Verify (post-merge on registry `origin/main`)
- no `STALE` in the two docs
- no `vfs.(commit|log|diff|show|restore|branches)` in `vcs-and-sessions.md`

## Deviations
Documented in the registry PR: out-of-scope "Sessions are branches" still describes two-parent merges while `closeSession` uses single-parent `commitTree`; in-scope note added instead of editing that section.

Agent: Update F6 registry docs (`8cc05fff-225e-4985-a8c4-d2a4a32bfc93`)
