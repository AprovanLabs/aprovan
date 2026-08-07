# Brief: Local-first documentation

## Mission
Write `docs/local-first.md` covering what a local workspace is, why locus is immutable, what a cloud workspace cannot do, and why there is no offline cache for cloud workspaces (D5). State that the VFS root is a user-chosen boundary enforced in application code. Link from `docs/index.md` and cross-reference `docs/app-data.md`.

## Read first
1. `openspec/changes/local-first-workspace/tasks.md` section 7
2. `openspec/changes/local-first-workspace/tech-plan.md` (D5)
3. `docs/index.md`, `docs/app-data.md`
4. Streams 1–6 are on main (contain, VFS, cipher, locus, dispatch, gateway resolver)

## Tasks
Copy section 7 checkboxes (7.1–7.3) from tasks.md.

## Verify
Content matches landed behavior. Prefer not blocking on `pnpm lint` if eslint config is pre-broken.

## Constraints
Touches: `docs/local-first.md`, `docs/index.md`, `docs/app-data.md` (cross-ref only if needed).
If `docs/index.md` conflicts with an in-flight streaming-sessions docs PR, rebase onto latest main before opening/updating your PR.
This completes the `local-first-workspace` change when merged.
