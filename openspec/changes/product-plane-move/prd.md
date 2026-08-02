# product-plane-move — PRD

_WS-4 of the platform refactor. Zero-context source of truth:
[docs/tasks/refactor-decisions.md](../../../docs/tasks/refactor-decisions.md) (decisions 4, 5,
and the target architecture are settled — this change implements them, it does not reopen them)._

## Problem

The product is smeared across three repos: the product plane (chat, apps, workflows, sessions,
sandboxes — 41K LOC of `apps/workspace`) lives in the *registry* repo, the client lives in the
*aprovan* repo, and identity/edge infra plus shared UI live in *core*. Every product change
round-trips through npm publishes (or the `.pnpmfile.cjs` local-link hack), the registry repo
carries a circular dependency on `@aprovan/patchwork-compiler`, the core publish pipeline covers
3 of 8 packages with six undelivered changesets, and consumers pin stale versions
(`ui@^0.5.0` vs 0.6.0, `registry-main` pinned to a dev SHA). With WS-3 extracting the execution
plane into a standalone registry server, the product plane no longer has a reason to live in the
registry repo.

## Users & Jobs

- **The owner/maintainer** — hires this change so that one repo (`aprovan`) builds, tests, and
  deploys the entire product, and a product-plane change is one commit, not a three-repo
  publish dance.
- **Contributors to the product** — clone one repo, `pnpm install && pnpm build`, no sibling
  checkouts, no `APROVAN_LOCAL_LINKS=1`.
- **Registry standalone users / self-hosters** — hire the registry repo to build and run the
  execution plane from a fresh clone with zero knowledge that the aprovan repo exists.
- **Workspace end users** — see no behavior change, except credential/admin management moves
  from the catalog site into the product app.

## Goals

- The aprovan repo is THE product repo: a fresh clone with `pnpm install && pnpm build &&
  pnpm typecheck && pnpm test` succeeds with no sibling checkouts and no local links.
- The registry repo builds standalone from a fresh clone (its remaining workspace resolves
  entirely from npm + its own packages).
- One production deploy path: the ECS service runs the `aprovan/workspace` all-in-one image
  built from the aprovan repo; releases and rollbacks remain one command via the existing SSM
  image-pin mechanism.
- The core repo is fully dissolved: infra and `@aprovan/ui` land in aprovan, config packages
  are inlined per-repo, personal tooling is evicted, and the repo is archived with nothing left
  that any deploy or build depends on.
- `.pnpmfile.cjs` is deleted; `APROVAN_LOCAL_LINKS` appears nowhere.
- Every npm package that still has an external consumer publishes green from CI
  (`@aprovan/ui`, `@aprovan/registry-ui`, `@aprovan/registry-main`, `@aprovan/cli`,
  `@aprovan/sandbox-host`, `@aprovan/sandbox-bashkit`, `@aprovan/sandbox-image-node`).
- `aprovan registry run` starts a local execution plane with the bundled SQLite/libSQL backend
  and no configuration.

## Non-Goals

- **No execution-plane extraction** — that is WS-3 (`registry-server-extraction`); this change
  consumes its output as a published npm package and hard-depends on it.
- **No contract (`@utdk/*`) changes** — WS-2.
- **No storage migration or cost work** (DSQL, polling fixes) — WS-5.
- **No Profiles/groups product wiring or per-user data model** — WS-6.
- **No `ChatPage.tsx` decomposition, rebranding, or component-source consolidation** — WS-8
  (this change moves code; it does not refactor it).
- **No backwards compatibility.** No shim packages, no re-export stubs, no dual-publish. Git
  history in the source repos is the archive.
- **No new infra design.** Stacks and terraform move as-is; the single-container + Cloudflare
  tunnel arrangement is already solved and is not touched.

## Capabilities

### New Capabilities

- `repo-topology`: which repo owns what — the aprovan monorepo composition, the registry repo's
  standalone remainder, the `apps/registry` catalog/credentials split, core dissolution, and the
  npm-only cross-repo rule.
- `product-composition`: the product plane embedding the WS-3 registry server in-process —
  native implementations registered against `@utdk` contracts, workspaceId→tenant mapping,
  and the relocated credentials/admin UI.
- `deployment`: images, infra, CI — `aprovan/workspace` built in aprovan, `aprovan/registry`
  built in registry, ECS cutover via SSM image pin, moved CDK stacks and tunnel terraform,
  publish pipelines for surviving npm packages.
- `aprovan-cli`: the `aprovan` CLI in its new home, growing `aprovan registry run` with a
  pluggable backend (bundled SQLite/libSQL default), keeping the sandbox-host commands.

### Modified Capabilities

None — `openspec/specs/` is empty; this is a greenfield spec set.

## Constraints & Assumptions

**Constraints (settled by the decision record):**

- Hard dependency: WS-3 (`registry-server-extraction`) must be complete — the registry server
  package published to npm and `apps/workspace` already stripped of the execution plane —
  before the move lands. WS-2's contract promotion is transitively required.
- Cross-repo consumption is via published npm only, in one direction for execution-plane code:
  aprovan → registry. The registry repo must never depend on an aprovan checkout. (UI packages
  published *from* aprovan and consumed by the catalog site via semver are the sanctioned
  exception — see tech-plan D5.)
- The catalog site (`apps/registry`) stays in the registry repo: it walks `packages/utdk` on
  disk at build time.
- Only the aprovan repo stands up infra. The registry repo ships artifacts only (npm + image).
- npm packages are deprecated, never unpublished.

**Assumptions (flagged, not owner-confirmed):**

- The WS-3 registry server package is assumed to be named `@aprovan/registry-server` with a
  programmatic `createRegistryServer(...)` embedding entrypoint. If WS-3 lands under a
  different name/API, only identifiers change here, not shape.
- aprovan has only 5 commits; a plain file move (no git-subtree) is acceptable because the
  source repos remain as the history archive (tech-plan D1).
- GHCR image coordinates stay `ghcr.io/aprovanlabs/*`; only the *building repo* changes for
  the workspace image.

## Open Questions

1. **Where does the catalog playground live after the split?** The `ScriptPlayground`/
   `TryItPanel` pages exercise gateway tool calls, which can involve credentials.
   _Recommendation:_ playground stays with the catalog using ephemeral/anonymous credentials
   only; any "use my saved credential" affordance is removed and the page links to the product
   app for authenticated use.
2. **Destination of evicted personal tooling** (core's `agents/`, `evals/`, `skills/`,
   `prompts/`): which personal repo, and who moves it? _Recommendation:_ owner runs the move
   to a private `jacobsampson/toolbox` (or similar) repo; this change only tracks the eviction
   as an owner-run task and core's archive is gated on it.
3. **Do `@aprovan/cdk` and `@aprovan/node` keep publishing to npm?** After the move their only
   consumers are inside the aprovan monorepo. _Recommendation:_ internalize both (workspace
   packages, stop publishing, `npm deprecate` pointing at the monorepo); revisit only if the
   registry repo's remaining tooling turns out to import them.
