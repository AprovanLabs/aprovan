# PRD — contracts-and-catalog (WS-2)

## Problem

The UTDK contract packages (`@utdk/sql`, `@utdk/llm`, `@utdk/sandbox`, `@utdk/vcs`,
`@utdk/agent`) physically live *inside* the generated provider catalogue
(`registry/packages/utdk/<name>/`), held apart from the generators by four hand-aligned
exclusion lists that have already nearly drifted once. The interface compat catalog — which
providers implement which contract — is hardcoded in `apps/workspace/src/interfaces.ts`,
which WS-3 will extract and WS-4 will move, so contracts the registry product depends on are
currently defined by a file that is leaving the repo. Provider naming has a real bug
(`splitProviderName` splits on dots, so a `synthetic.new` provider would explode into
`utdk/synthetic/new`), three contract packages are silently missing from the CI publish list,
and the catalog site cannot show a user "this provider implements the SQL contract" at all.
WS-3 (registry server) builds directly on these contracts, so this must land first.

## Users & Jobs

- **Workflow/script authors** write against interface namespaces (`sql.query`,
  `vcs.pullRequests.diff`) and need contracts that are published, versioned, and stable.
- **Provider implementers** (first- or third-party) need each contract package to be complete
  enough to build an adapter against without asking questions, and need the catalog to show
  where their adapter fits.
- **Catalog visitors** evaluating the registry need to browse interfaces, see which providers
  implement each one, and see on a provider page what contracts it implements and what
  optional capabilities it declares.
- **The WS-3 implementer** consumes the promoted contract packages and the extracted compat
  data as published, standalone inputs.
- **The bundler/ingest pipeline** needs a single naming authority mapping API hostnames to
  package names so generated packages stop depending on lucky domain shapes.

## Goals

- All 9 contract packages (`sql`, `llm`, `sandbox`, `vcs`, `agent` promoted; `keyvalue`,
  `events`, `vfs`, `telemetry` new) live under `registry/packages/contracts/<name>/`, build
  standalone, and carry the `utdk.contract` manifest marker.
- Zero contract exclusion lists remain: `packages/utdk/build.mjs` `SKIP_TOP_DIRS`,
  `copy-assets.mjs` `skippedTopDirs`, `packages/utdk/tsconfig.json` `exclude`, and bundler
  `providersOnDisk` skip-set no longer name any contract.
- Each of the 5 promoted contracts has a completed shape audit against 2–3 real would-be
  providers before its surface is frozen at 0.2.0.
- Hostname→package mapping is an explicit authority map with a `.com` default;
  `synthetic.new → @utdk/synthetic-new` resolves correctly; provider names contain no dots.
- The interface compat catalog is data (`compat.json` per contract) consumable without
  importing `apps/workspace`; `listInterfaces()` reads it.
- CI publishes `@utdk/sandbox`, `@utdk/agent`, `@utdk/vcs` and the four new contracts.
- `webhooks.json` is documented and rendered as per-provider *generation metadata*; nothing
  in registry code or docs frames webhooks as an interface/contract.
- Bundler `authIntel.ts` imports credential types from `@utdk/common` instead of mirroring
  them by hand.
- Catalog site has interface index + detail pages, and provider pages show an
  "Implements &lt;contract&gt;" section with optional capabilities.
- `pnpm --filter @utdk/e2e test:generation` (280 assertions) passes throughout.

## Non-Goals

- **No registry server extraction** — dispatch, Profiles, credentials, QuickJS runtime are
  WS-3. This change only produces the contract packages and compat data WS-3 consumes.
- **No product-plane contracts** — `sessions`, `notifications`, `agents` (service), `apps`,
  `sync` stay product-side per Decision 6. `@utdk/vfs` is a minimal file contract only:
  sessions, overlays, and mounts stay aprovan-side.
- **No new provider implementations.** Shape audits validate contract surfaces on paper
  against real vendor APIs; building the adapters is future work (compat entries may be
  declared `unavailable`).
- **No telemetry pipeline** — Decision 9's three-plane pipeline is WS-3/WS-4 work; this
  change only ships the OTLP-shaped `@utdk/telemetry` contract package.
- **No Profiles** — `getClient({ profile })` and binding semantics are untouched.
- **No catalog-site redesign** beyond the interface representation and webhook-metadata
  rendering.
- **No npm unpublishing or renaming** of already-published packages.

## Capabilities

### New Capabilities

- `utdk-contracts`: contract packages as first-class top-level workspace packages —
  promotion of the existing 5, creation of `keyvalue`/`events`/`vfs`/`telemetry`, the
  `utdk.contract` marker, shape-audit gating, exclusion-list removal, shared credential
  types in `@utdk/common`, and the CI publish list.
- `provider-naming-authority`: the explicit hostname→package authority map with `.com`
  default, and the removal of dot-splitting from provider-name handling.
- `interface-compat-catalog`: the compat catalog as keep-set data (`compat.json` per
  contract) with a published loader, replacing hardcoded compat arrays in
  `apps/workspace/src/interfaces.ts`.
- `webhook-generation-metadata`: `webhooks.json` as per-provider UTDK generation metadata,
  never an interface.
- `catalog-interface-representation`: interface pages and provider "implements" sections on
  the catalog site.

### Modified Capabilities

None — `openspec/specs/` is empty; all capabilities in this change are new.

## Constraints & Assumptions

- Decisions 1–10 in `docs/tasks/refactor-decisions.md` are settled; Decision 6 governs this
  change and is not relitigated here.
- No backwards compatibility required; git history is the archive. But published npm names
  (`@utdk/*`) are stable — packages move on disk, not on npm.
- The catalog site (`apps/registry`) stays in the registry repo and reads packages off disk
  at build time (Decision 5); it must be updated in lockstep with the on-disk move or its
  build throws.
- `packages/utdk/common` cannot move: `client.ts` imports `./common/telemetry.js` by
  relative path, so `dist/common/` is load-bearing inside the `utdk` root package.
- `pnpm-workspace.yaml` globs `packages/**`, so `packages/contracts/<name>/` are workspace
  packages with no config change.
- A contract's name remains a legal suite segment (`github/vcs` is the GitHub adapter for
  `@utdk/vcs`); nothing may skip contract names below the catalogue's top level.
- Assumption (unconfirmed): `packages/contracts/` is an acceptable destination directory
  name for promoted contract packages.
- Assumption (unconfirmed): existing dotted provider names in `data/registry.json` (if any)
  can be normalized in place — nuke-and-reseed posture means no rename migration is owed.

## Open Questions

- **Where do promoted contract packages live on disk?** Recommendation:
  `registry/packages/contracts/<name>/` (one flat directory, covered by the existing
  `packages/**` workspace glob, trivially enumerable by the catalog site and by WS-3).
- **Do the four new contracts ship `compat.json` now?** Recommendation: no — per
  `docs/interfaces.md`, a compat entry is a contract commitment; the new contracts ship with
  an empty/absent compat list until the first vendor mapping is scheduled work (their native
  implementations are product-plane and get wired in WS-3/WS-4).
- **Freeze version for audited contracts?** Recommendation: bump each contract to `0.2.0`
  when its shape audit closes, and treat `0.2.x` as the surface WS-3 builds against.
