# execution-plane-unfork — PRD

_IW-0 of the improve wave. Zero-context sources of truth:
[docs/tasks/improve-findings.md](../../../docs/tasks/improve-findings.md) (§0 and the IW-0
workstream entry define this change; "Settled decisions" are owner-confirmed) and
[docs/tasks/refactor-decisions.md](../../../docs/tasks/refactor-decisions.md) (boundary rules).
This change finishes the WS-4 boundary; it gates IW-1 (`app-model-split`) and IW-3
(`registry-standalone-credentials`)._

## Problem

The aprovan repo carries a forked byte-copy of the entire execution plane
(`packages/{utdk,contracts/*,runtime,bundler,mcp,mcp-core,registry-server}`) instead of
consuming the published packages the registry repo exists to ship. Three registry-server files
have already diverged in the fork, five generated provider manifests embed absolute paths into
a developer's home directory, and the published `@aprovan/registry-server@0.1.0` is
**uninstallable from npm** (it depends on `utdk@0.1.0`, which was never published). Every day
the fork lives, improvements land on one side only — and IW-1/IW-3 built on the fork would
deepen the split-brain.

## Users & Jobs

- **The owner/maintainer** — hires this change so the npm one-way boundary
  (aprovan → registry for execution-plane code) is real: an execution-plane fix lands once, in
  the registry repo, and reaches the product via a version bump.
- **Contributors to either repo** — clone one repo, `pnpm install && pnpm build`, no sibling
  checkout, no absolute paths from someone else's machine.
- **Registry standalone users** — install `@aprovan/registry-server` from npm and it actually
  resolves; published artifacts carry no references to private checkouts.
- **The IW-1 / IW-3 implementers** — start from a single source of truth for execution-plane
  code.

## Goals

- aprovan contains **zero** execution-plane source: `packages/utdk`, `packages/contracts`,
  `packages/runtime`, `packages/bundler`, `packages/mcp`, `packages/mcp-core`, and
  `packages/registry-server` are deleted; all execution-plane dependencies resolve from npm
  with semver ranges (no `workspace:*`, no `link:`, no pnpm overrides pointing at deleted
  packages).
- The fork's three diverged registry-server files (`src/catalog/default.ts`,
  `src/config/types.ts`, `src/server.ts`) are reconciled **upstream into the registry repo
  first**, published, and only then is the fork deleted — no fork-only behavior is lost.
- `npm install @aprovan/registry-server` succeeds in an empty project (the missing `utdk`
  publish is fixed); every npm package aprovan consumes from the registry repo
  (`@aprovan/registry-server`, `utdk`, `@utdk/*`, `@aprovan/runtime`) is published and
  installable.
- No file in either repo — and no file inside any published registry tarball — contains an
  absolute path into a developer checkout (`grep -r "/Users/" …` over manifests is clean).
- `aprovan/.claude/launch.json` launches the gateway from aprovan's own `server/workspace`,
  not the gutted `registry/apps/workspace`.
- Registry repo hygiene: `pnpm-lock.yaml` carries no importers for directories that no longer
  exist; `pnpm-workspace.yaml` has no globs for nonexistent directories.
- **Exit criterion (both repos):** a fresh clone of each repo, with no sibling checkout, runs
  `pnpm install && pnpm build && pnpm typecheck && pnpm test` green.

## Non-Goals

- **No refactoring of consumed code.** Upstream changes are limited to the three-file
  reconciliation, the publish-pipeline fix, and mechanical hygiene (path scrub, lockfile,
  globs). No API redesign, no provider regeneration.
- **No app-model, credentials, or panel work** — IW-1, IW-3, IW-4. In particular the
  playground panel keeps working against npm-published `@aprovan/runtime`; its deletion is
  IW-4's.
- **No decision on the registry `product-plane-removal` branch** — superseded-by-IW-3 per the
  findings; this change neither merges nor deletes it.
- **No core-repo work.** IW-0 touches aprovan and registry only.
- **No backwards compatibility.** No shim packages, no re-export stubs. Git history is the
  archive.
- **No new publish automation design** — the existing registry `publish.yml` pattern is fixed,
  not replaced.

## Capabilities

### New Capabilities

- `registry-publish-integrity`: the registry repo as the sole, installable source of the
  execution plane — fork reconciliation upstreamed, `utdk` and `@aprovan/runtime` published,
  no absolute-path leaks in tarballs, lockfile/workspace-glob hygiene, fresh-clone build.
- `execution-plane-consumption`: the aprovan repo consuming the execution plane exclusively
  from npm — fork deletion, semver dependencies, overrides cleanup, launch config, image
  build, fresh-clone build.

### Modified Capabilities

None — `openspec/specs/` is empty; this is a greenfield spec set.

## Constraints & Assumptions

**Constraints (settled by the decision record / findings):**

- npm one-way for execution-plane code: aprovan → registry. The registry repo never depends
  on an aprovan checkout. UI packages published from aprovan and consumed by the catalog are
  the sanctioned reverse edge (already in place: catalog pins `@aprovan/registry-ui@0.5.0`).
- Ordering is forced: reconcile + publish in registry **before** switching aprovan to npm and
  deleting the fork — otherwise aprovan's fresh-clone install cannot resolve.
- npm packages are deprecated, never unpublished.

**Assumptions (verified against ground truth during investigation, 2026-08-02):**

- The fork's real source divergence is exactly the three registry-server files (full-tree
  diff confirms; everything else is build plumbing — tsconfig `extends`, devDeps — or
  committed build litter). The two deltas are additive: an `executorInstance` embedding
  option (used by `server/workspace/src/registry-embed.ts:69`) and a monorepo-contracts
  resolution fallback in `catalog/default.ts`.
- Absolute paths exist in exactly 5 provider manifests per repo
  (`packages/utdk/{anthropic,figma,gemini,github,posthog}/package.json`, `utdk.docs.*`
  fields, 3 lines each, mirrored into `dist/` copies at build time — the "~40 reads" in the
  findings). Nothing reads these fields at runtime or build time (the bundler only writes
  them; its own tests expect repo-relative paths), so scrubbing them is safe.
- `@utdk/{common,mcp-core}` (0.1.0), `@utdk/{sql,llm,sandbox,vcs,agent,keyvalue,events,vfs,telemetry}`
  (0.2.0) are already published and current; only `utdk` and `@aprovan/runtime` are missing
  from npm.
- aprovan consumers of the fork are exactly: `server/workspace` (`@utdk/{agent,common,llm,mcp-core,sandbox}`,
  `utdk`, `@aprovan/registry-server`), `client/web` (`@aprovan/runtime`, playground only),
  and root `pnpm.overrides` (`@utdk/common`, `@utdk/mcp-core`). Nothing in aprovan consumes
  the forked `bundler` or `mcp` packages — they are deleted with no npm replacement needed.

## Open Questions

1. **Does the `catalog/default.ts` monorepo-contracts fallback go upstream, or die with the
   fork?** Its original purpose (resolving contracts inside the aprovan fork) disappears when
   the fork does; but the path is computed relative to the registry-server package itself, so
   upstream it is a harmless dev-mode convenience and a guaranteed no-op when installed from
   npm. _Recommendation:_ upstream both deltas verbatim — "reconcile, don't relitigate" — and
   let a future registry change delete it if it proves dead.
2. **Version for the reconciled `@aprovan/registry-server`:** `0.1.1` (additive options,
   patch) or `0.2.0`? _Recommendation:_ `0.1.1` — both deltas are additive and pre-1.0
   consumers are only ourselves.
3. **Publish `@aprovan/runtime` vs. delete the playground dependency now?** IW-4 deletes the
   playground panel anyway. _Recommendation:_ publish `@aprovan/runtime@0.1.0` from registry
   (one line in the publish list; it is registry keep-set code per decision 1) and let IW-4
   drop the dependency — deleting client code here would be IW-4 scope creep.
