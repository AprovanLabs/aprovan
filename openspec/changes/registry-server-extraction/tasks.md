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

- [x] 1.1 Scaffold `packages/registry-server` (name per PRD open question, default
      `@aprovan/registry-server`): package.json, tsconfig, vitest, exports barrel;
      register in pnpm-workspace and the repo build.
- [x] 1.2 Define the core types from tech-plan Interfaces & Data: `CallContext`,
      `TelemetrySource`, `RegistryServerOptions`, `RegistryServer`, `DispatchResult`
      (`src/config/types.ts`); config parsing for the standalone env surface.
- [x] 1.3 Move the service-kernel contract (`ServiceError`, `ServiceContext`,
      `CoreService`, native-service registry with host `registerNativeServices`) into
      `src/kernel/` (satisfies sandbox-runtime "ServiceError moves with the kernel
      contract").
- [x] 1.4 Implement `RegistryStorage` facade + sqlite/libsql driver with the full DDL from
      the tech plan (tenants, credentials incl. `created_by`, profiles, profile_grants,
      api_keys, audit_log); migrations-on-boot; driver conformance suite skeleton.
- [x] 1.5 Catalog shim: export today's `listInterfaces()` data (copied from
      `apps/workspace/src/interfaces.ts`) as an injectable `InterfaceCatalog` in the WS-2
      shape, including `credentialless`/`unavailable`/`defaultsFor`/`timeoutMs` fields.
- [x] 1.6 Tenancy: `TenantStore`, single-mode auto-provision of `default`, external-mode
      auto-provision-on-first-use, `X-Registry-Tenant` validation seam (multi-tenancy
      spec scenarios).
- [x] 1.7 Tenant-isolation test: two tenants' credentials/profiles/audit are mutually
      invisible through every store method (multi-tenancy "Cross-tenant reads are
      impossible").

## 2. Credentials + Profiles

> Depends-on: 1 | Touches: packages/registry-server/src/credentials/**, packages/registry-server/src/profiles/** | Verify: pnpm --filter @aprovan/registry-server test -- profiles credentials

- [x] 2.1 Port `credentialCipher.ts` (kms/local/none envelope — unchanged) and
      `oauthTokens.ts` (exchange/refresh/client-credentials, tenant-keyed token cache)
      into `src/credentials/`; CredentialStore over `RegistryStorage` with `created_by`
      populated (profiles spec "Credential owner dimension").
- [x] 2.2 ProfileStore: CRUD with write-time validation — name uniqueness per
      (tenant, target), interface-provider compat check, credential existence/provider
      match (profiles spec "Profile schema" scenarios).
- [x] 2.3 Grants: `profile_grants` store + `resolveGrantedProfileIds(ctx)` as one indexed
      query over user/groups/actor subjects (tech-plan D12; profiles spec "one join"
      scenario).
- [x] 2.4 Implement `resolveProfile()` exactly per the normative algorithm (steps 1–6):
      default-name resolution, zero-config fallback ordering (credentialless first),
      loud named-miss listing existing names, loud deleted-credential failure, grant
      enforcement with admin/auth-none bypass.
- [x] 2.5 Test suite mirroring every scenario in `specs/profiles/spec.md` — these are the
      acceptance tests for the capability.

## 3. Dispatch pipeline + provider executor

> Depends-on: 2 | Touches: packages/registry-server/src/executor/**, packages/registry-server/src/dispatch/**, packages/registry-server/src/http/tools.ts | Verify: pnpm --filter @aprovan/registry-server test -- dispatch executor

- [x] 3.1 Extract the executor from `apps/workspace/src/isolate.ts` as
      `ProviderExecutor` (rename per decision 1; delete the `@utdk/isolate` branch if
      WS-1 hasn't): lazy import, LRU keyed by import specifier, catalog guard, factory
      naming, per-call client construction (provider-execution spec "no client caching").
- [x] 3.2 Build `dispatch()` — the one pipeline: namespace classification (native |
      interface | provider | llm-alias) → `resolveProfile` → OAuth pre-resolution →
      limits → execute → audit + telemetry span on EVERY exit path (provider-execution
      "Every dispatch is audited and telemetered").
- [x] 3.3 Server-side rate limits/budgets: token bucket keyed
      (tenant, profile-or-provider, principal), profile `limits` over tenant defaults;
      port the bucket from `packages/runtime/src/policy.ts` (provider-execution spec).
- [x] 3.4 Streaming: port SSE-immediate-open + keepalives + `asStreamBody` normalization
      from `routes/tools.ts`; embedding API surfaces `{kind: "stream"}` unbuffered.
- [x] 3.5 Port LLM alias resolution (`llm.ts` provider table) behind the catalog seam;
      default-model arg fill via `defaultsFor` merging.
- [x] 3.6 HTTP tools router: `GET /tools`, `GET /tools/namespaces`, `GET /tools/search`,
      `POST /tools/:ns/:op` with body `{args, profile?, stream?, credential?}`; colon
      instance syntax returns unknown-namespace with the replacement hint (profiles spec
      "Colon namespace no longer routes").
- [x] 3.7 Cross-tenant executor isolation test: interleaved tenants through one cached
      module observe no credential/baseUrl bleed (provider-execution scenario).
- [x] 3.8 Port the relevant `apps/workspace` dispatch tests (tools route, interface
      resolution, credential resolution) onto the package to pin behavior.

## 4. QuickJS sandbox runtime + in-sandbox SDK

> Depends-on: 1 | Touches: packages/registry-server/src/sandbox/** | Verify: pnpm --filter @aprovan/registry-server test -- sandbox

- [x] 4.1 Move `apps/workspace/src/workflows/sandbox.ts` verbatim to
      `src/sandbox/quickjs.ts` (debug-asyncify pinned, `_MaybeAsync` pump, memory
      ceiling, concurrency gate, deadline race); import `ServiceError` from the kernel;
      move its existing tests.
- [x] 4.2 Freeze and document the `__dispatch`/`__log`/`__boot` guest contract in
      `src/sandbox/README.md` per the tech plan (normative envelope shapes).
- [x] 4.3 Rebuild the guest prelude as the in-sandbox SDK: namespace proxies,
      `client(name)` root factory (replaces `getClient({profile})`, reserved name),
      cooperative `paginate`/retry helpers ported from `packages/runtime`
      (`proxy.ts`, `paginate.ts`, `policy.ts` shapes — cooperative only).
- [x] 4.4 `server.runScript(ctx, opts)`: bind guest dispatch to the pipeline with the
      run's `CallContext`; module-shape transform (`import x from "ns"` /
      `export default`) preserved.
- [x] 4.5 Asyncify soak test: 200 sequential runs × ≥3 suspensions, memory-baseline
      assertion (sandbox-runtime spec "Asyncify soak passes"); timeout and
      error-envelope scenarios.

## 5. Auth adapters

> Depends-on: 1 | Touches: packages/registry-server/src/auth/** | Verify: pnpm --filter @aprovan/registry-server test -- auth

- [x] 5.1 `AuthAdapter` interface + `none` adapter (implicit admin, default tenant) +
      insecure-boot guard (`allowInsecure`) per auth-adapters spec.
- [x] 5.2 Generic OIDC adapter: discovery + remote JWKS (jose), `{issuer, audience}`
      config only; delete all Cognito-pattern parsing; wrong-audience/expiry/issuer
      rejection tests against a local mock issuer.
- [x] 5.3 API-key adapter: mint (plaintext once, `apr_` prefix per PRD open question),
      SHA-256 digest at rest, revocation, key→tenant resolution; admin HTTP surface for
      mint/revoke/list.
- [x] 5.4 `TenantResolver` seam: built-in resolver (storage-backed roles/groups for
      standalone) and external resolver injection; requested-tenant 403 test.

## 6. Telemetry

> Depends-on: 1 | Touches: packages/registry-server/src/telemetry/** | Verify: pnpm --filter @aprovan/registry-server test -- telemetry

- [x] 6.1 `RegistryTelemetry` on the OTel Node SDK: OTLP/HTTP exporter from config,
      true no-op provider when unset (no exporter I/O — registry-telemetry spec).
- [x] 6.2 Context-required emission helpers stamping `aprovan.tenant`,
      `aprovan.principal`, `aprovan.source.*`, `aprovan.request_id`; dispatch-span
      helper with namespace/operation/profile/status attributes.
- [x] 6.3 Attribution tests: every dispatch exit path emits exactly one attributed span;
      telemetry-namespace calls are not self-recorded; two-tenant partition test
      (registry-telemetry scenarios).

## 7. MCP surface

> Depends-on: 3 | Touches: packages/registry-server/src/mcp/** | Verify: pnpm --filter @aprovan/registry-server test -- mcp

- [x] 7.1 Move `apps/workspace/src/mcp/server.ts` into `src/mcp/`; keep the
      `@utdk/mcp-core` meta-tool catalog cache; route `call_tool` through `dispatch()`
      (closing the MCP first-credential/no-interface drift — registry-server spec MCP
      scenarios).
- [x] 7.2 Extension hook (`mcp.extensions`) for host-attached tools/prompts/resources;
      fs-tools/prompts/resources do NOT move (product plane).
- [x] 7.3 Per-tenant streamable-HTTP endpoint wired into the router with adapter auth;
      permission-filtered tool listing test.

## 8. Standalone boot, Docker image, host rewiring, integration

> Depends-on: 3, 4, 5, 6, 7 | Touches: packages/registry-server/src/standalone.ts, packages/registry-server/src/index.ts, docker/registry.Dockerfile, .github/workflows/** (image publish), apps/workspace/src/** (consumption rewiring, deletions) | Verify: pnpm -r build && pnpm -r test && docker build -f docker/registry.Dockerfile -t aprovan/registry:dev . && ./packages/registry-server/scripts/smoke-standalone.sh aprovan/registry:dev

- [x] 8.1 `createRegistryServer()` composition + `standalone.ts` entrypoint (env → 
      options → serve) + `/healthz`.
- [x] 8.2 `docker/registry.Dockerfile` (multi-stage, node:22-slim, VOLUME /data,
      HEALTHCHECK) + `smoke-standalone.sh` (boot → create credential → create profile →
      grant → dispatch → MCP list_tools) + CI image publish job (tech-plan D11).
- [x] 8.3 Rewire `apps/workspace` to consume the package: replace
      `isolate.ts`/`toolCache.ts` executor use, `credentials.ts`/`credentialCipher.ts`/
      `oauthTokens.ts`, `interfaces.ts` resolution, `workflows/sandbox.ts`, and
      `mcp/server.ts` with package imports; product services import kernel types from
      the package; register natives + tenant resolver (workspaceId 1:1) via the embed
      API.
      _Done on main via WS-4 (`product-plane-move`) + follow-ons: product host is
      `aprovan/server/workspace`, which embeds `@aprovan/registry-server` through
      `registry-embed.ts` (`createRegistryServer`, workspace→tenant 1:1, natives +
      agent `compatDispatch`); cipher/oauth/sandbox/isolate/kernel re-export or
      adapt the package. Registry `apps/workspace` source is gone (moved)._
- [x] 8.4 Delete replaced mechanisms in `apps/workspace`: bindings.json read/write,
      `interfaces.bind/unbind`, `listInstances`, label-profile resolution, colon
      instance-namespace parsing; grep BOTH repos (registry + aprovan) for `bindings.json`,
      `interfaces.bind`, `getClient({`, and `:` instance syntax; add `profiles.*` tool
      surface for chat parity (profiles spec "Replaced mechanisms are deleted").
      _Done on main via `profiles-unified` (#85): `interfaces.bind`/`unbind` removed;
      `profiles.set`/`list`/`remove` is the config surface; colon namespaces rejected;
      credential label is display-only; `getClient({` gone from the sandbox prelude.
      Residual: profile-store adapters still named `readBindings`/`listInstances`, a
      one-time bindings.json→profiles tombstone import, and an interim Dynamo
      bindings.json path (`STORE_BACKEND=dynamo`) — owned by DSQL cutover, not WS-3._
- [x] 8.5 Embed-vs-HTTP equivalence test (registry-server spec "Standalone and embedded
      share one pipeline") and dispatch-overhead benchmark asserting the PRD's p95 <20ms
      target in sqlite mode.
- [x] 8.6 When WS-2 lands: swap the catalog shim for the WS-2 compat data + shared
      credential types; delete the shim.
- [x] 8.7 Publish `@aprovan/registry-server@0.x` to npm via the repo release flow;
      confirm the aprovan repo can install it (WS-4 handoff).
      _Published through `@aprovan/registry-server@0.2.2` (registry `publish.yml` on
      main). Aprovan depends on `^0.2.2`; clean-room `npm install` + import succeeds._

## 9. MCP host rewiring closeout (7.1 / 8.3 remainder)

> Depends-on: 7, 8 | Touches: server/workspace/src/mcp/**, server/workspace/src/registry-embed.ts, registry `packages/registry-server/src/mcp/**` | Verify: pnpm --filter @aprovan/workspace test -- mcp && pnpm --filter @aprovan/registry-server test -- mcp

**Why this section exists.** 7.1 and 8.3 are checked, but the MCP clause of 8.3 did
not land: `server/workspace/src/mcp/server.ts` is still a 326-line parallel assembly
with its own `buildMcpServer(principal)`, its own `permittedTools(all, principal)`, and
`makeExecute(principal)` in place of `dispatch()`. The registry-server implementation
(7.1) and the extension hook (7.2) were both built; the original was never removed or
rewired. The result is two `permittedTools` with the same name, different signatures,
and different semantics — only one of which routes through `resolveProfile`, the single
enforcement chokepoint the profiles spec designates.

- [ ] 9.1 Amend the 8.3 completion note to scope out `mcp/server.ts`; the claim
      "replace … and `mcp/server.ts` with package imports" is not true on main and
      should not stand as evidence.
- [ ] 9.2 **Ordering gate.** Land the profiles step-5 fix (gate the zero-config
      fallback on `authMode === "none"`; auto-provision a granted `default` profile
      row at credential-connect time) BEFORE 9.4. Both change what `permittedTools`
      returns; sequencing this first means the product host adopts the corrected
      predicate once instead of adopting the current one and shifting again.
- [ ] 9.3 Move `FS_TOOLS`/`handleFsTool` and `TELEMETRY_TOOLS`/`handleTelemetryTool`
      behind `McpExtensions` — the hook 7.2 built for exactly this. Tool behavior
      unchanged; registration path only.
- [ ] 9.4 Replace the `server/workspace/src/mcp/server.ts` assembly with
      `createMcpHandler(deps)` from `@aprovan/registry-server`, passing the 9.3
      extensions. Derive `CallContext` through the existing `registry-embed.ts`
      adapter (`Principal{sub, workspaceId, role, groupIds}` →
      `CallContext{principal, tenantId, role, groupIds}`); narrow `role: string` to
      `"admin" | "member"` explicitly and fail closed on any other value.
- [ ] 9.5 Delete `permittedTools(all, principal)` and `makeExecute(principal)` from the
      product host. Grep BOTH repos for a second `permittedTools` definition and assert
      exactly one survives.
- [ ] 9.6 Visibility-equivalence test, written and recorded BEFORE the 9.4 cutover:
      snapshot `list_tools` across (member, admin) × (granted, ungranted, no-stored-
      profile) against both implementations. The predicates are not equivalent —
      registry-server hides a namespace only on a 403 from `resolveProfile` — so the
      diff is an expected behavior change and belongs in the change notes, not in a
      bug report after the fact.
- [ ] 9.7 Remove untracked build litter: `packages/mcp/`, `packages/mcp-core/`, and
      `packages/mcp-app-server/` hold `dist`/`.turbo`/`node_modules` with no `src` and
      no `package.json`, and are tracked by git in zero files. Leftovers from the WS-4
      move; they shadow the real `@utdk/mcp*` packages during local resolution.
