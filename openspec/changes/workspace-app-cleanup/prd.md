## Problem

`client/web/src/pages/ChatPage.tsx` is 3,264 lines — the entire application shell (tabs,
chat, widget pipeline, sidebar, sessions, self-heal) in one file with no router. It is the
highest-friction file in the repo for every future change (WS-4's product-plane move,
WS-6's data-auth UX, WS-3's Profile UI wiring all land features inside it). The app shell
also carries three overlapping UI-primitive sources (`components/ui/*` vendored shadcn
copies, `@aprovan/ui`, `@aprovan/registry-ui`) with no documented rule for which one to use,
and the repo still identifies as `@aprovan/patchwork-workspace` / "patchwork" in its root
package name, README, and a dead `apps/**` workspace glob — stale branding from before the
product/registry split decided in the refactor. None of this blocks a specific feature today,
but every workstream that touches `client/web` after this one pays the tax. WS-8 is free
(no dependencies) and clears the ground before WS-4 lands the product-plane move.

## Users & Jobs

- **Aprovan engineers (all workstreams touching `client/web`)**: hired to add or modify a
  chat-app feature (a panel, a tab type, a session action) without reading or risking 3,264
  lines of unrelated logic, and without guessing which of three component sources to import
  from.
- **WS-4 implementer (near-term)**: hired to embed the registry server and re-home
  `@aprovan/ui` without first untangling ChatPage's single-file coupling.
- **End users of the chat app**: not hired for anything new here — this change must be
  invisible to them. Their job ("chat with the workspace, open tabs, manage sessions, watch
  widgets self-heal") must work identically before and after.

## Goals

- `pages/ChatPage.tsx` shrinks to a composition root only: mounts contexts, lays out the
  shell, delegates everything else. Target ≤ 300 LOC (from 3,264).
- No single extracted module exceeds ~500 LOC (the largest panel today, `AgentsPanel.tsx`,
  is 1,360 LOC and is *not* touched by this change — 500 is a target for *new* modules this
  change creates, not a retroactive cap on existing panels).
- Zero user-visible behavior change. Every flow enumerated in `ux.md`'s Screens & States
  passes an identical manual smoke pass before and after (no automated UI test suite exists
  for ChatPage today — see Constraints).
- `pnpm --filter @aprovan/patchwork-web build` (`tsc && vite build`) passes with zero new
  TypeScript errors at every work-stream boundary in `tasks.md`, not just at the end.
- One documented, enforced rule for which of the three component sources a new import should
  come from — stated as a spec requirement, not just a comment.
- Root `package.json` name, `README.md`, and `pnpm-workspace.yaml` no longer claim the repo
  is "patchwork" or glob a nonexistent `apps/**` directory.

## Non-Goals

- **No behavior change of any kind** — this is a pure structural refactor. Any bug fix,
  feature, or UX tweak discovered along the way gets filed separately, not folded in here.
- **Not renaming the `@aprovan/patchwork-*` npm packages** (`patchwork-web`, `patchwork`,
  `patchwork-editor`, `patchwork-compiler`, `patchwork-mcp`). That touches every import site
  across three repos and is WS-4's "product-plane move" territory (`packages/mcp-app-server`
  and parts of `packages/patchwork` are also WS-1 deletion targets). WS-8 only renames the
  *root workspace* package name (`@aprovan/patchwork-workspace`) and the README's framing —
  not the sub-package identifiers.
- **Not resolving the `@aprovan/ui` root-export duplication** (`Button`, `Badge`, `Input`,
  `Card*`, `Separator` are declared in `@aprovan/ui`'s root but unused — nothing in
  `client/web/src` imports the bare `@aprovan/ui` specifier). That package lives in `core/`
  today and dissolves into `aprovan` under WS-4; deleting the unused exports there is WS-4's
  or a follow-up's call, not WS-8's — WS-8 only fixes `client/web`'s own import discipline.
- **Not touching `packages/bobbin`, `packages/mcp-app-server`, or
  `packages/compiler/src/vfs/**`** — those are WS-1 deletion targets; WS-8's globs must not
  overlap.
- **Not adding a router.** ChatPage's tab system (`native://`/`app://`/`workflow://`) already
  serves as an in-app router; introducing `react-router` or similar is out of scope.
- **Not adding a test framework or writing new automated tests for ChatPage.** (See
  Constraints — this is a real gap, but closing it is bigger than a cleanup pass; flagged as
  an Open Question below.)

## Capabilities

### New Capabilities
- `chat-app-structure`: The decomposed module boundaries for the chat app shell (tabs,
  chat transport/rendering, widget pipeline, sidebar, sessions, self-heal) and the
  behavior-preservation contract between them — i.e., what must still be true after the
  split, expressed as requirements a reviewer or agent can check.
- `ui-component-sourcing`: The rule for which of the three component sources
  (`@/components/ui/*`, `@aprovan/ui`, `@aprovan/registry-ui`) a given import must come from,
  and the elimination of any component actually duplicated *and in active use* across sources.
- `repo-identity`: The repo's self-description (root package name, README framing, workspace
  package globs) matches its actual role as the aprovan product repo, scoped to
  naming/docs — not a full package rename.

### Modified Capabilities
<!-- none: openspec/specs/ has no existing capabilities yet for this repo -->

## Constraints & Assumptions

- **No automated test suite covers ChatPage's runtime behavior.** `client/web` has no `test`
  script and no vitest wiring, despite three `*.test.ts` files existing under `src/lib/`
  (`namespaces.test.ts`, `sse.test.ts`, `llm-jobs.test.ts` — orphaned or run some other way not
  discovered). The only mechanical safety net is TypeScript (`tsc`) via the `build` script.
  **Assumption**: manual smoke-testing against the flows enumerated in `ux.md` is the
  acceptance gate for behavior preservation, run by the implementer at each work-stream
  boundary. Flag if the user wants this treated as a blocking gap instead.
- **Hard constraint**: work streams in `tasks.md` must not touch paths WS-1 owns
  (`packages/bobbin/**`, `packages/mcp-app-server/**`, `packages/compiler/src/vfs/**`).
- **Hard constraint**: the nine native panels under `client/web/src/components/panels/*.tsx`
  keep their current self-contained pattern (each owns its own state, is mounted by
  `PanelHostProvider`/`PanelTabs` from `panels/shell.tsx`) — they are not touched or absorbed
  into the new module structure, only the code that *hosts* them (inside ChatPage today) moves.
- **Assumption**: the root workspace package should be renamed `@aprovan/aprovan-monorepo`.
  NOT `@aprovan/workspace`: that npm name belongs to the registry's workspace app, which WS-4
  `product-plane-move` relocates into this monorepo — a duplicate package name would break
  pnpm. Not confirmed by the user — see Open Questions.
- **Assumption**: this change proceeds without waiting for WS-1 to actually land (WS-1 and
  WS-8 are both "free" per the decision record and can run in parallel) — WS-8 simply avoids
  WS-1's paths so the two can't conflict regardless of landing order.

## Open Questions

1. **Root package rename target.** Recommend `@aprovan/aprovan-monorepo`. `@aprovan/workspace`
   is ruled out: that npm name belongs to the registry's workspace app, which WS-4
   `product-plane-move` relocates into this monorepo — a duplicate package name would break
   pnpm. Alternative: `@aprovan/aprovan` or versionless `aprovan`. Proceeding with
   `@aprovan/aprovan-monorepo` unless the user objects.
2. **Is the missing test suite in scope to fix here?** Recommend **no** — closing it is a
   separate, larger effort (choosing a runner, writing meaningful coverage for a 3,264-line
   component under active decomposition is circular). Recommend treating "manual smoke pass
   per work stream" as sufficient for this change, and filing the test-gap as a follow-up.
3. **How aggressively should the module map subdivide `features/sessions/`?** The tech plan
   proposes three hooks (`useSessionOrchestration`, `useEditDraft`, `useDraftSync`) under one
   feature folder. Recommend proceeding as proposed; open to collapsing to two if review finds
   the split arbitrary.
