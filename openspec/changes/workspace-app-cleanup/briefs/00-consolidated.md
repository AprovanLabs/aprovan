# Brief: workspace-app-cleanup — full implementation (streams 1–12)

## Mission
Decompose the 3,264-line `client/web/src/pages/ChatPage.tsx` into the feature-module structure
fixed in the tech plan (`contexts/`, `features/{tabs,widgets,self-heal,sidebar,sessions,chat,edit-modal}/`),
consolidate UI component sourcing on the vendored `components/ui/*`, and rebrand the repo
(`@aprovan/aprovan-monorepo`, README, workspace globs). **Zero user-visible behavior change** —
ux.md enumerates the flows that must survive identically; treat it as your regression checklist.

## Read first (under openspec/changes/workspace-app-cleanup/)
1. `tech-plan.md` — the module map, context/hook interfaces (FIXED), decisions D1–D5
2. `tasks.md` — streams 1–12
3. `specs/*/spec.md` — acceptance scenarios (composition-root size cap, module caps, self-heal budget preservation, panel isolation)
4. `ux.md` — the must-survive behavior inventory
5. `client/web/src/pages/ChatPage.tsx` — read it fully before extracting anything

## Tasks
Execute all 12 streams in dependency order: 1, 2, 10 first (independent), then 3–7 (all only
create files under their own `features/**` dir), then 8, 9, then 11 (the only stream that edits
ChatPage.tsx), then 12. Check tasks off in the MAIN checkout's
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/workspace-app-cleanup/tasks.md`
(uncommitted) as you go.

## Acceptance criteria
Every scenario in the three spec files. After stream 11, ChatPage.tsx must be under the
composition-root size cap the spec sets, and `pnpm --filter @aprovan/patchwork-web build` must
be clean at EVERY stream boundary — never leave the build broken between streams.

## Verify (final)
```
pnpm install && pnpm typecheck && pnpm --filter @aprovan/patchwork-web build
! grep -rn 'from "@aprovan/ui"' client/web/src
```
Plus each stream's own Verify as you complete it.

## Git workflow
- You are in an isolated worktree of the aprovan repo (harness-provided). All tracked work
  happens on your branch there.
- IMPORTANT: the user's main checkout has an UNCOMMITTED modification to
  `client/web/src/pages/ChatPage.tsx`. Your worktree branches from the committed HEAD and
  will not include it; stream 11's rewrite WILL conflict with it at merge time. Note this
  prominently in your PR body so the owner reconciles deliberately. Do not try to merge their
  uncommitted change yourself.
- A purge agent may be concurrently deleting `packages/{bobbin,mcp-app-server,patchwork}` and
  compiler-vfs files on another branch — your Touches globs are disjoint from all of that; do
  not touch those packages.
- Commit per stream (messages end `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`),
  push, ONE PR via `gh pr create` (body ends "🤖 Generated with [Claude Code](https://claude.com/claude-code)").

## Constraints
- Pure refactor: no behavior change, no new features, no dependency changes except the root
  package rename. The context/hook interfaces in tech-plan.md are fixed.
- Streams 3–9 only CREATE files in their feature dir; only stream 11 edits ChatPage.tsx.
- Do not modify the nine panels (`components/panels/**`) or anything outside the streams'
  Touches globs.

## Report back
Write `openspec/changes/workspace-app-cleanup/briefs/00-report.md` in the MAIN checkout
(uncommitted): per-stream status, final line counts (ChatPage before/after), verify results,
PR URL, the merge-conflict warning for the owner's uncommitted ChatPage edit, deviations.
