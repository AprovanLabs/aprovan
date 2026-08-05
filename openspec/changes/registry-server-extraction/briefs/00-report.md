# Report — registry-server-extraction (streams 1–8)

**PR: https://github.com/AprovanLabs/registry/pull/77** (branch `registry-server-extraction`, branched from post-merge-train `origin/main` @ `360ec77`, 9 commits, NOT merged).

## Per-stream status

| Stream | Status | Notes |
| --- | --- | --- |
| 1. Scaffold, config, tenancy, storage | **Done** | `packages/registry-server` (`@aprovan/registry-server`); `CallContext`/`RegistryServerOptions`/`RegistryServer`/`DispatchResult` verbatim from the tech plan; kernel (`ServiceError`, `ServiceContext`, `CoreService`, per-instance `NativeServiceRegistry`); `RegistryStorage` facade + full DDL; ONE store implementation over a `SqlClient` seam with sqlite (better-sqlite3), libsql (`@libsql/client`, lazy optional), and dsql (postgres-dialect via `pg`, lazy optional) adapters; driver-conformance suite (dsql runs when `REGISTRY_TEST_DSQL_URL` set, skipped otherwise); tenant-isolation tests; single-mode `default` auto-provision + external auto-provision-on-first-use. |
| 2. Credentials + Profiles | **Done** | Cipher ported unchanged (kms/local/none envelope, env-selected); OAuth service ported, token cache instance-scoped keyed `tenant:provider:credentialId`; `CredentialService` populates `created_by`; `ProfileService` write-time validation (uniqueness, compat check, credential existence/provider match); one-join `resolveGrantedProfileIds`; `resolveProfile()` implements the normative 6-step algorithm exactly. 23-test suite mirrors every `specs/profiles` scenario (incl. label-is-never-a-key, stored-default-is-grant-checked/synthesized-fallback-is-not, colon-syntax refusal with `client(name)` hint). |
| 3. Dispatch + executor | **Done** | `ProviderExecutor` (renamed direct executor): LRU keyed by **import specifier**, catalogue guard before the loader, per-call clients (never cached), call timeout now actually enforced; `Dispatcher` = the one pipeline with audit + exactly one attributed span on EVERY exit path; token-bucket limits + 24h call budgets keyed `tenant:profileOrProvider:principal` (profile limits over tenant defaults); OAuth pre-resolution (executor only sees injectables); streaming normalization + SSE-immediate-open with keepalives in the HTTP route; llm-alias table behind the catalog seam; HTTP `GET /tools(/namespaces,/search)`, `POST /tools/:ns/:op{.*}`, cross-tenant executor isolation test. 3.8: get-client + sandbox suites now execute against the package via the workspace re-export, plus fresh dispatch suites pin tools-route semantics. |
| 4. QuickJS sandbox + SDK | **Done** | `sandbox/quickjs.ts` moved essentially verbatim (debug-asyncify pinned, `_MaybeAsync` pump, memory ceiling, concurrency gate, deadline race; `ServiceError` from the kernel — 422/504 `instanceof` holds in the host); prelude rebuilt: `client(name)` root factory (reserved name; `client()` = bare namespace per the ux open-question rec), cooperative `paginate`/`retry`/`sleep`; frozen contract documented in `src/sandbox/README.md`; 200-run ≥3-suspension asyncify soak with RSS-baseline assertion; full ported workspace sandbox suite + new SDK tests. |
| 5. Auth adapters | **Done** | `none` (implicit admin), generic OIDC (discovery + jose `createRemoteJWKSet`; `{issuer, audience}` only; zero Cognito parsing — tested against a **local mock issuer** incl. wrong-audience/expiry/wrong-issuer 401s), api-key (`apr_` prefix, SHA-256 digest, plaintext-once mint, revocation, key→tenant without a header, admin HTTP surface `/api-keys`); `TenantResolver` seam + requested-tenant 403; insecure-boot guard in `createRegistryServer`. |
| 6. Telemetry | **Done** | `RegistryTelemetry`: context-REQUIRED helpers stamping `aprovan.tenant`/`aprovan.principal`/`aprovan.source.type` (+detail)/`aprovan.request_id`; dispatch spans add namespace/operation/profile/http.status; OTLP/HTTP exporter from `telemetry.otlpEndpoint`; TRUE no-op when unset (no SDK load, no exporter); telemetry-namespace dispatches audited but never span-recorded; two-tenant partition test. |
| 7. MCP | **Done** | Meta-tools (`@utdk/mcp-core`) with module-scope catalog cache; `call_tool` executes through `dispatch()` — profiles/grants/limits/audit/`source: mcp` attribution (drift closed); visibility follows dispatchability (ungranted stored-default namespaces hidden from members; ungoverned namespaces visible; admins see all); `mcp.extensions` host hook (tools/prompts/resources); streamable HTTP at `ALL /mcp` (verified live in the smoke test). |
| 8. Standalone, Docker, rewiring | **Done** (8.3–8.4 closed by follow-on changes on main; 8.7 published) | 8.1 ✓ 8.2 ✓ 8.3 ✓ 8.4 ✓ 8.5 ✓ 8.6 ✓ 8.7 ✓ — see Closeout below. |

## Verify results (all run in the worktree)

- `pnpm --filter @aprovan/registry-server test` — **114 passed**, 10 conditionally skipped (dsql conformance without a connection string); suite is stable across repeat runs.
- `pnpm -r build` — clean (registry-web included, 341 pages).
- `pnpm -r test` — **exit 0**, 21 packages with suites all green; `@aprovan/workspace` **435/435** after the rewiring.
- `docker build -f docker/registry.Dockerfile -t aprovan/registry:dev .` — clean.
- `./packages/registry-server/scripts/smoke-standalone.sh aprovan/registry:dev` — **ALL SMOKE CHECKS PASSED** (boot → healthz → credential w/ `createdBy` → profile → group grant → colon-syntax refusal → unknown-namespace refusal → ephemeral-credential dispatch reaching the executor → audit rows → MCP list_tools over streamable HTTP).
- Embed-vs-HTTP equivalence test: identical results, identical audit rows (modulo request id), identically attributed spans. Uniform profile-limit enforcement verified across HTTP + embed + sandbox in one test. Dispatch-overhead benchmark: **p95 < 20 ms** asserted in sqlite mode (typically ~1–2 ms with a stub provider).
- Note: `pnpm --filter @aprovan/registry-web typecheck` remains failing **pre-existing** (dual `@aprovan/registry-main` type identity) — untouched per the brief.

## Handoff for WS-4 (product-plane-move) and WS-6 (data-auth-model)

**Package name / entry points**: `@aprovan/registry-server` (published through **0.2.2** on npm via registry `publish.yml`). Exports: `.` (barrel) and `./standalone`. The barrel exports everything WS-4 needs: `createRegistryServer`, all contract types, `ServiceError`/`ServiceContext`/`CoreService`/`NativeServiceRegistry`, `defaultCatalog`, storage types, `ProviderExecutor`, sandbox (`runScriptInSandbox`, `configureSandbox`), auth adapters + `mintApiKey`, `RegistryTelemetry`, MCP factories.

**The embedding contract as implemented** (three deliberate extensions beyond the tech-plan shapes; nothing removed or renamed):

1. `RegistryServer.executor: ProviderExecutor` — exposed so hosts get module-injection test seams and cache control (`setModuleForTesting(specifier, mod)`, `reset()`). The workspace's `isolate.ts` adapter uses exactly this.
2. `RegistryServerOptions.mcp?: { extensions?: McpExtensions }` — the D10 extension hook's concrete shape (tools + handleTool + prompts/resources callbacks, all `CallContext`-first). WS-4 re-attaches fs_* tools/prompts/artifacts here.
3. `RegistryServerOptions.compatDispatch?: Record<interfaceId, (ServiceContext, operation, args) => Promise<unknown>>` — the hook for compat entries with `module: "native"` (the agent contract's in-host runner). Without it such entries 501 with a clear message. **WS-4 must register the agent runner here** (`{ agent: (ctx, op, args) => dispatchNativeAgentOp(ctx, op, args) }`).

Other contract notes:
- `dispatch()` **throws `ServiceError`** on every failure (after auditing/attributing); `DispatchResult` is success-only, per its declared shape. HTTP maps status→response; embedded hosts should catch `ServiceError`.
- `RunScriptOptions` = `{source, filename?, input?, namespaces, timeoutMs?, agent?, log?}`; guest dispatch is bound to the pipeline with the run's `CallContext`; stream results are buffered to text at the guest boundary.
- Auth-adapter claims convention: the tenant layer honors `claims.tenantId` (api-key), `claims.role` (`"member"` demotes; anything else is admin in single mode), `claims.groupIds`. External-mode resolvers receive the whole `Authn` and decide themselves.
- API keys resolve to principal `key:<id>` with role **admin** in single-tenant standalone (no membership model exists there — schema has no users/memberships table; WS-6 note below).
- `created_by` on credentials: populated from `ctx.principal` on every create path (HTTP + embed), exposed on list/get — the frozen seam metadata-and-cost coordinates on. `NULL` = tenant-shared remains representable at the storage layer.
- Contracts pinned at WS-2's frozen **0.2.0**; the catalog is injected (`options.catalog`), and `defaultCatalog()` builds from the real `compat.json` documents via `@utdk/common/compat` — there is **no throwaway shim to swap** (task 8.6's end-state holds by construction). The llm chat-provider alias table lives in `src/catalog/default.ts` (with the same `LLM_<ID>_{BASE_URL,DEFAULT_MODEL}` env overrides); `apps/workspace/src/llm.ts` still exists for the workspace chat surface, and **the catalog site still imports it at build time** (`apps/registry/src/lib/contracts.ts`) — unchanged in this PR; WS-4 must update that one import when it moves the file.
- **WS-6**: `profile_grants` schema + one-join resolution + grant/revoke HTTP (`POST/DELETE /profiles/:id/grants`, subjects `user|group|app|workflow|agent`) are live; error copy matches the ux doc (403 names the profile; 404 lists existing names). Grants die with their profile on delete. The admin/product surface that writes grants and the groups→context wiring (`CallContext.groupIds` supplier) is yours; the server never reads memberships itself.

## Closeout (8.3 / 8.4 / 8.7)

Originally deferred at PR #77 merge (Dynamo interim + npm publish pending). Verified done
on main without further WS-3 code:

1. **8.3** — Product plane lives in `aprovan/server/workspace` (WS-4). It embeds the
   package via `registry-embed.ts` (`createRegistryServer`, tenant = workspaceId,
   natives + agent `compatDispatch`). Cipher, OAuth, sandbox, isolate, and
   `ServiceError` come from `@aprovan/registry-server`. Registry `apps/workspace`
   source is gone.
   **Amended (§9.1, registry-server-extraction §9):** the claim above did not
   extend to MCP — `server/workspace/src/mcp/server.ts` was still a 326-line
   parallel assembly with its own `buildMcpServer`/`permittedTools`/`makeExecute`,
   never rewired to the package's `createMcpHandler`. That gap is what §9 closed;
   see `briefs/09-report.md`. This bullet should not have been read as covering
   MCP, and is corrected here rather than rewritten, so the history stays honest
   about when the claim was actually true.
2. **8.4** — `profiles-unified` (#85) deleted `interfaces.bind`/`unbind`, added
   `profiles.*`, rejected colon namespaces, and made credential labels display-only.
   Sandbox `getClient({` is gone. Leftover `readBindings`/`listInstances` names are
   profile-store adapters; Dynamo `bindings.json` and the one-time tombstone import
   are cutover residuals (not WS-3 blockers).
3. **8.7** — `@aprovan/registry-server` published through **0.2.2**; aprovan depends on
   `^0.2.2`; clean-room install + import succeeds. `tasks.md` is **42/42**.

## Deviations (historical / non-blocking)

1. ~~Workspace dispatch-plane cutover deferred~~ → closed; see Closeout.
2. ~~8.7 npm publish pending~~ → closed; see Closeout.
3. **Telemetry SDK**: built on `@opentelemetry/sdk-trace-node` (the repo's existing OTel stack) rather than `@opentelemetry/sdk-node` named in D9 — same OTLP/HTTP exporter, attributes, and no-op semantics; avoids hauling the auto-instrumentation meta-package in. Logs ride span events (the D9 revisit-if fallback).
4. **`__sleep` host function added** to the sandbox alongside the frozen `__dispatch`/`__log`/`__boot` trio (the frozen shapes are byte-for-byte unchanged): the spec's "retry with backoff" cooperative helper needs a timer and the guest has none. Asyncified, deadline-clamped, string-in/undefined-out; documented in the sandbox README.
5. **Provider execution failures are 502** (matching `workflows/invoke.ts` precedent) where the old HTTP route returned 500; execution timeouts are now actually enforced in the executor (the old `timeout` option was accepted and ignored).
6. **`limits.budget`** = calls per fixed 24h window from first call (the PRD rec was "rolling 24h"; a fixed window keeps it O(1) — flagged for revisit if WS-6 needs true rolling).
7. **Discovery drops the public-catalog network fallback** (`catalogToolEntries`) — that helper is product-plane (`services.ts`, network fetch); a credentialed provider without module metadata surfaces as a `provider.*` visibility placeholder instead. The workspace's own `GET /tools` is unchanged (not yet cut over).
8. **Straggler fix outside Touches globs**: `--passWithNoTests` for `@utdk/agent`, `@utdk/vcs`, `@aprovan/cli` — their test-less vitest scripts made `pnpm -r test` (the stream-8 verify gate) fail on pristine main.
9. Storage ids are time+sequence-prefixed (not pure random) so `ORDER BY created_at, id` is exact insertion order — "first credential, creation order" is load-bearing for zero-config fallback.
