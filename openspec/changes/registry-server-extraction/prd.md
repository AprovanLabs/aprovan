# PRD — registry-server-extraction (WS-3)

## Problem

The execution plane — provider dispatch, credentials, interface resolution, the QuickJS
runtime, the MCP surface — is welded into `registry/apps/workspace` (41K LOC), a
single-tenant-shaped app that also carries the entire product plane. The refactor's target
architecture (docs/tasks/refactor-decisions.md) requires the execution plane to ship as a
standalone product (`aprovan/registry` image) **and** embed in-process in the aprovan
workspace image, where one ECS task serves many workspaces. Neither is possible today:
tenancy is implicit (`workspaceId` threaded ad hoc), auth is hardcoded to Cognito,
storage selection is a two-world `isAwsMode()` switch, and configuration state
(interface bindings) lives as files on the product plane's VFS.

## Users & Jobs

- **Aprovan platform (embedded host)** — embeds the registry server as a library so every
  workspace's tool calls, credentials, and workflow scripts execute in-process with strict
  per-tenant isolation. (WS-4 does the embedding; WS-3 must make it possible.)
- **Standalone operator** — `docker run aprovan/registry` (or `aprovan registry run`) and
  gets a working execution plane with zero cloud dependencies: SQLite storage, auth off or
  API keys, a default tenant auto-provisioned.
- **Script/workflow authors and agents** — call `sql.query(...)`, `github.repos.get(...)`,
  `sql.client("docs")` and get predictable credential routing through Profiles, with
  loud, actionable failures instead of silent first-credential fallbacks.
- **Workspace admins** — manage Profiles as the single allow-listing unit: granting a
  profile to a group, app, workflow, or agent IS the credential grant.
- **Deployment operators** — get attributed telemetry (`{tenant, principal, source}` on
  every emission) exported over OTLP to whatever backend they configure.

## Goals

- The registry server package builds, tests, and runs standalone from a fresh clone of the
  registry repo with no sibling checkouts and no AWS account (`pnpm build && pnpm test`
  green; `docker run aprovan/registry` serves `/tools` on first boot).
- One dispatch pipeline: HTTP `/tools`, in-process embedding API, MCP, and QuickJS-guest
  `__dispatch` all resolve namespaces, Profiles, credentials, and authorization through the
  same code path — no behavioral drift between surfaces.
- Multi-tenant at core: no query, cache key, credential resolution, or telemetry emission
  exists without a `tenantId`. Cross-tenant reads are impossible by construction (every
  store method takes the tenant; verified by isolation tests).
- Profiles fully replace the two half-mechanisms they supersede: `.services/bindings.json`
  named instances and credential-label resolution both have zero call sites when this
  change lands.
- Auth is pluggable: OIDC against any issuer (Cognito is just configuration), API keys,
  and `none` — selected by config, no code fork.
- Storage is pluggable: SQLite/libSQL bundled default; DSQL driver behind the same
  interfaces (schema designed here; DSQL production hardening coordinates with WS-5).
- Every telemetry emission carries `{tenant, principal, source}`; the server exports OTLP
  to a configurable endpoint out of the box.
- p95 warm provider dispatch overhead (auth + profile resolution + executor, excluding the
  upstream API) under 20ms in standalone SQLite mode.

## Non-Goals

- **Moving the product plane** (VFS, apps, workflows-as-registrations, sessions, chat,
  sandboxes-the-service, notifications, sync) — that is WS-4. WS-3 extracts only the
  execution plane; `apps/workspace` keeps running by consuming the extracted package.
- **Groups→profiles product wiring and admin UI** — WS-6. WS-3 ships the grants schema
  and auth-time resolution join only.
- **Contract package promotion, hostname map, catalog site** — WS-2 (this change consumes
  its outputs; see Constraints).
- **DSQL data migration / nuke-and-reseed cutover** — WS-5 owns the runbook and cutover.
- **Backwards compatibility** — none required anywhere (repo convention). bindings.json,
  credential-label profiles, `sql:analytics` instance-namespace syntax, and the
  `@utdk/isolate` fiction are deleted, not shimmed.
- **A bespoke admin portal or operator UI** — per decision 9, no admin portal this pass.

## Capabilities

### New Capabilities

- `registry-server`: the package itself — boot, configuration, embedding API, HTTP
  surface, MCP surface, pluggable storage, Docker image.
- `multi-tenancy`: tenant model, standalone default tenant, embedded workspaceId→tenant
  mapping, isolation invariants.
- `profiles`: the unified `{name, target, credential ref, options, grants}` primitive,
  its resolution algorithm, credential owner dimension, and the group→profile grants
  schema.
- `provider-execution`: the in-process provider executor (lazy `import('utdk/<p>')`,
  LRU cap), dispatch pipeline, server-side rate limits and budgets, streaming.
- `sandbox-runtime`: the QuickJS-WASM runtime extraction (debug-asyncify build, the
  `__dispatch` host contract, `ServiceError` seam) and the in-sandbox SDK layer.
- `auth-adapters`: pluggable OIDC / API-key / none authentication.
- `registry-telemetry`: built-in OTLP instrumentation with `{tenant, principal, source}`
  attribution (plane 2 of the three-plane model, decision 9).

### Modified Capabilities

None — `openspec/specs/` has no existing execution-plane capabilities; all deltas are ADDED.

## Constraints & Assumptions

- **Depends on WS-2 (`contracts-and-catalog`)**: promoted top-level `@utdk/*` contract
  packages, the interface compat catalog extracted to keep-set data (out of
  `apps/workspace/src/interfaces.ts`), the explicit hostname→package map, and shared
  credential types in `@utdk/common` (replacing the bundler's hand-mirrored types). Work
  streams that consume these are marked in tasks.md; streams that don't can start first.
- **Depends on WS-1** for the mechanical rename of the direct executor and deletion of the
  dead `@utdk/isolate` import branch (`isolate.ts:188`); if WS-1 has not landed, this
  change performs the rename as part of extraction (it is extracting that exact file).
- Decisions 1, 4, 7, 8, 9 of the decision record are FINAL and are treated as fixed
  requirements, not open design space.
- Cross-repo consumption only via published npm; the registry repo must build standalone.
- The QuickJS build stays `@jitl/quickjs-wasmfile-debug-asyncify` — release asyncify
  builds are miscompiled (heap corruption after ~2 suspensions).
- Assumption: the embedded host (aprovan) is trusted to assert principals — the embedding
  API accepts a caller-supplied `{tenantId, principal}` without re-authenticating.
  Confirmed by the target architecture (in-process embedding).
- Assumption: `better-sqlite3`/libSQL remains acceptable as the bundled default store
  (it is what local mode uses today).

## Open Questions

- **npm package name**: `@aprovan/registry-server` (recommended — `@aprovan/registry-main`
  and the `registry` core-service namespace are both taken) vs `@aprovan/registry`.
- **Wire syntax for named-profile dispatch over HTTP**: recommendation — `profile` field in
  the `POST /tools/:ns/:op` body (mirrors the `__dispatch` 4th argument); the
  `sql:analytics` path-segment syntax is deleted with bindings.json. Confirm nothing
  outside chat/workflows depends on the colon syntax before deletion.
- **API-key format**: recommendation — `apr_<tenantShort>_<random>` with SHA-256 digest at
  rest, shown once at mint time. Needs owner sign-off since keys outlive this change.
