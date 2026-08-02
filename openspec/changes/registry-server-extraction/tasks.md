# Tasks — registry-server-extraction

All paths are relative to the **registry repo** checkout
(`/Users/jacob/Documents/Code/AprovanLabs/registry`) unless prefixed `aprovan/`.

**Cross-change dependency (WS-2 `contracts-and-catalog`)**: streams 2, 3, and 7 consume
WS-2 outputs — promoted top-level `@utdk/*` contract packages, the interface compat
catalog extracted to data, and shared credential types in `@utdk/common`. Until WS-2
lands, task 1.5's catalog shim (today's `listInterfaces()` data re-exported in the WS-2
`InterfaceCatalog` shape) unblocks them; swapping the shim for the real WS-2 data is task
8.6. Streams 1, 4, 5, 6 have no WS-2 dependency. **WS-1 note**: if `purge-dead-code` has
not landed, task 3.1 performs the executor rename itself (same file, same edit — first
one in wins, coordinate via rebase).

## 1. Package scaffold, config, tenancy, storage core

> Depends-on: - | Touches: packages/registry-server/package.json, packages/registry-server/tsconfig.json, packages/registry-server/src/config/**, packages/registry-server/src/tenancy/**, packages/registry-server/src/storage/**, packages/registry-server/src/kernel/**, packages/registry-server/src/catalog-shim/** | Verify: pnpm --filter @aprovan/registry-server build && pnpm --filter @aprovan/registry-server test

- [ ] 1.1 Scaffold `packages/registry-server` (name per PRD open question, default
      `@aprovan/registry-server`): package.json, tsconfig, vitest, exports barrel;
      register in pnpm-workspace and the repo build.
- [ ] 1.2 Define the core types from tech-plan Interfaces & Data: `CallContext`,
      `TelemetrySource`, `RegistryServerOptions`, `RegistryServer`, `DispatchResult`
      (`src/config/types.ts`); config parsing for the standalone env surface.
- [ ] 1.3 Move the service-kernel contract (`ServiceError`, `ServiceContext`,
      `CoreService`, native-service registry with host `registerNativeServices`) into
      `src/kernel/` (satisfies sandbox-runtime "ServiceError moves with the kernel
      contract").
- [ ] 1.4 Implement `RegistryStorage` facade + sqlite/libsql driver with the full DDL from
      the tech plan (tenants, credentials incl. `created_by`, profiles, profile_grants,
      api_keys, audit_log); migrations-on-boot; driver conformance suite skeleton.
- [ ] 1.5 Catalog shim: export today's `listInterfaces()` data (copied from
      `apps/workspace/src/interfaces.ts`) as an injectable `InterfaceCatalog` in the WS-2
      shape, including `credentialless`/`unavailable`/`defaultsFor`/`timeoutMs` fields.
- [ ] 1.6 Tenancy: `TenantStore`, single-mode auto-provision of `default`, external-mode
      auto-provision-on-first-use, `X-Registry-Tenant` validation seam (multi-tenancy
      spec scenarios).
- [ ] 1.7 Tenant-isolation test: two tenants' credentials/profiles/audit are mutually
      invisible through every store method (multi-tenancy "Cross-tenant reads are
      impossible").

## 2. Credentials + Profiles

> Depends-on: 1 | Touches: packages/registry-server/src/credentials/**, packages/registry-server/src/profiles/** | Verify: pnpm --filter @aprovan/registry-server test -- profiles credentials

- [ ] 2.1 Port `credentialCipher.ts` (kms/local/none envelope — unchanged) and
      `oauthTokens.ts` (exchange/refresh/client-credentials, tenant-keyed token cache)
      into `src/credentials/`; CredentialStore over `RegistryStorage` with `created_by`
      populated (profiles spec "Credential owner dimension").
- [ ] 2.2 ProfileStore: CRUD with write-time validation — name uniqueness per
      (tenant, target), interface-provider compat check, credential existence/provider
      match (profiles spec "Profile schema" scenarios).
- [ ] 2.3 Grants: `profile_grants` store + `resolveGrantedProfileIds(ctx)` as one indexed
      query over user/groups/actor subjects (tech-plan D12; profiles spec "one join"
      scenario).
- [ ] 2.4 Implement `resolveProfile()` exactly per the normative algorithm (steps 1–6):
      default-name resolution, zero-config fallback ordering (credentialless first),
      loud named-miss listing existing names, loud deleted-credential failure, grant
      enforcement with admin/auth-none bypass.
- [ ] 2.5 Test suite mirroring every scenario in `specs/profiles/spec.md` — these are the
      acceptance tests for the capability.

## 3. Dispatch pipeline + provider executor

> Depends-on: 2 | Touches: packages/registry-server/src/executor/**, packages/registry-server/src/dispatch/**, packages/registry-server/src/http/tools.ts | Verify: pnpm --filter @aprovan/registry-server test -- dispatch executor

- [ ] 3.1 Extract the executor from `apps/workspace/src/isolate.ts` as
      `ProviderExecutor` (rename per decision 1; delete the `@utdk/isolate` branch if
      WS-1 hasn't): lazy import, LRU keyed by import specifier, catalog guard, factory
      naming, per-call client construction (provider-execution spec "no client caching").
- [ ] 3.2 Build `dispatch()` — the one pipeline: namespace classification (native |
      interface | provider | llm-alias) → `resolveProfile` → OAuth pre-resolution →
      limits → execute → audit + telemetry span on EVERY exit path (provider-execution
      "Every dispatch is audited and telemetered").
- [ ] 3.3 Server-side rate limits/budgets: token bucket keyed
      (tenant, profile-or-provider, principal), profile `limits` over tenant defaults;
      port the bucket from `packages/runtime/src/policy.ts` (provider-execution spec).
- [ ] 3.4 Streaming: port SSE-immediate-open + keepalives + `asStreamBody` normalization
      from `routes/tools.ts`; embedding API surfaces `{kind: "stream"}` unbuffered.
- [ ] 3.5 Port LLM alias resolution (`llm.ts` provider table) behind the catalog seam;
      default-model arg fill via `defaultsFor` merging.
- [ ] 3.6 HTTP tools router: `GET /tools`, `GET /tools/namespaces`, `GET /tools/search`,
      `POST /tools/:ns/:op` with body `{args, profile?, stream?, credential?}`; colon
      instance syntax returns unknown-namespace with the replacement hint (profiles spec
      "Colon namespace no longer routes").
- [ ] 3.7 Cross-tenant executor isolation test: interleaved tenants through one cached
      module observe no credential/baseUrl bleed (provider-execution scenario).
- [ ] 3.8 Port the relevant `apps/workspace` dispatch tests (tools route, interface
      resolution, credential resolution) onto the package to pin behavior.

## 4. QuickJS sandbox runtime + in-sandbox SDK

> Depends-on: 1 | Touches: packages/registry-server/src/sandbox/** | Verify: pnpm --filter @aprovan/registry-server test -- sandbox

- [ ] 4.1 Move `apps/workspace/src/workflows/sandbox.ts` verbatim to
      `src/sandbox/quickjs.ts` (debug-asyncify pinned, `_MaybeAsync` pump, memory
      ceiling, concurrency gate, deadline race); import `ServiceError` from the kernel;
      move its existing tests.
- [ ] 4.2 Freeze and document the `__dispatch`/`__log`/`__boot` guest contract in
      `src/sandbox/README.md` per the tech plan (normative envelope shapes).
- [ ] 4.3 Rebuild the guest prelude as the in-sandbox SDK: namespace proxies,
      `client(name)` root factory (replaces `getClient({profile})`, reserved name),
      cooperative `paginate`/retry helpers ported from `packages/runtime`
      (`proxy.ts`, `paginate.ts`, `policy.ts` shapes — cooperative only).
- [ ] 4.4 `server.runScript(ctx, opts)`: bind guest dispatch to the pipeline with the
      run's `CallContext`; module-shape transform (`import x from "ns"` /
      `export default`) preserved.
- [ ] 4.5 Asyncify soak test: 200 sequential runs × ≥3 suspensions, memory-baseline
      assertion (sandbox-runtime spec "Asyncify soak passes"); timeout and
      error-envelope scenarios.

## 5. Auth adapters

> Depends-on: 1 | Touches: packages/registry-server/src/auth/** | Verify: pnpm --filter @aprovan/registry-server test -- auth

- [ ] 5.1 `AuthAdapter` interface + `none` adapter (implicit admin, default tenant) +
      insecure-boot guard (`allowInsecure`) per auth-adapters spec.
- [ ] 5.2 Generic OIDC adapter: discovery + remote JWKS (jose), `{issuer, audience}`
      config only; delete all Cognito-pattern parsing; wrong-audience/expiry/issuer
      rejection tests against a local mock issuer.
- [ ] 5.3 API-key adapter: mint (plaintext once, `apr_` prefix per PRD open question),
      SHA-256 digest at rest, revocation, key→tenant resolution; admin HTTP surface for
      mint/revoke/list.
- [ ] 5.4 `TenantResolver` seam: built-in resolver (storage-backed roles/groups for
      standalone) and external resolver injection; requested-tenant 403 test.

## 6. Telemetry

> Depends-on: 1 | Touches: packages/registry-server/src/telemetry/** | Verify: pnpm --filter @aprovan/registry-server test -- telemetry

- [ ] 6.1 `RegistryTelemetry` on the OTel Node SDK: OTLP/HTTP exporter from config,
      true no-op provider when unset (no exporter I/O — registry-telemetry spec).
- [ ] 6.2 Context-required emission helpers stamping `aprovan.tenant`,
      `aprovan.principal`, `aprovan.source.*`, `aprovan.request_id`; dispatch-span
      helper with namespace/operation/profile/status attributes.
- [ ] 6.3 Attribution tests: every dispatch exit path emits exactly one attributed span;
      telemetry-namespace calls are not self-recorded; two-tenant partition test
      (registry-telemetry scenarios).

## 7. MCP surface

> Depends-on: 3 | Touches: packages/registry-server/src/mcp/** | Verify: pnpm --filter @aprovan/registry-server test -- mcp

- [ ] 7.1 Move `apps/workspace/src/mcp/server.ts` into `src/mcp/`; keep the
      `@utdk/mcp-core` meta-tool catalog cache; route `call_tool` through `dispatch()`
      (closing the MCP first-credential/no-interface drift — registry-server spec MCP
      scenarios).
- [ ] 7.2 Extension hook (`mcp.extensions`) for host-attached tools/prompts/resources;
      fs-tools/prompts/resources do NOT move (product plane).
- [ ] 7.3 Per-tenant streamable-HTTP endpoint wired into the router with adapter auth;
      permission-filtered tool listing test.

## 8. Standalone boot, Docker image, host rewiring, integration

> Depends-on: 3, 4, 5, 6, 7 | Touches: packages/registry-server/src/standalone.ts, packages/registry-server/src/index.ts, docker/registry.Dockerfile, .github/workflows/** (image publish), apps/workspace/src/** (consumption rewiring, deletions) | Verify: pnpm -r build && pnpm -r test && docker build -f docker/registry.Dockerfile -t aprovan/registry:dev . && ./packages/registry-server/scripts/smoke-standalone.sh aprovan/registry:dev

- [ ] 8.1 `createRegistryServer()` composition + `standalone.ts` entrypoint (env → 
      options → serve) + `/healthz`.
- [ ] 8.2 `docker/registry.Dockerfile` (multi-stage, node:22-slim, VOLUME /data,
      HEALTHCHECK) + `smoke-standalone.sh` (boot → create credential → create profile →
      grant → dispatch → MCP list_tools) + CI image publish job (tech-plan D11).
- [ ] 8.3 Rewire `apps/workspace` to consume the package: replace
      `isolate.ts`/`toolCache.ts` executor use, `credentials.ts`/`credentialCipher.ts`/
      `oauthTokens.ts`, `interfaces.ts` resolution, `workflows/sandbox.ts`, and
      `mcp/server.ts` with package imports; product services import kernel types from
      the package; register natives + tenant resolver (workspaceId 1:1) via the embed
      API.
- [ ] 8.4 Delete replaced mechanisms in `apps/workspace`: bindings.json read/write,
      `interfaces.bind/unbind`, `listInstances`, label-profile resolution, colon
      instance-namespace parsing; grep BOTH repos (registry + aprovan) for `bindings.json`,
      `interfaces.bind`, `getClient({`, and `:` instance syntax; add `profiles.*` tool
      surface for chat parity (profiles spec "Replaced mechanisms are deleted").
- [ ] 8.5 Embed-vs-HTTP equivalence test (registry-server spec "Standalone and embedded
      share one pipeline") and dispatch-overhead benchmark asserting the PRD's p95 <20ms
      target in sqlite mode.
- [ ] 8.6 When WS-2 lands: swap the catalog shim for the WS-2 compat data + shared
      credential types; delete the shim.
- [ ] 8.7 Publish `@aprovan/registry-server@0.x` to npm via the repo release flow;
      confirm the aprovan repo can install it (WS-4 handoff).
