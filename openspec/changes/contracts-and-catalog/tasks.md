# Tasks — contracts-and-catalog

All paths are in the **registry repo** (sibling checkout: `../registry` from this repo).
Verify commands use `pnpm -C ../registry` so they run from anywhere in the aprovan repo;
run `pnpm -C ../registry install` once before starting.

## 1. Contract promotion and exclusion-list removal

> Depends-on: - | Touches: ../registry/packages/contracts/{sql,llm,sandbox,vcs,agent}/**, ../registry/packages/utdk/build.mjs, ../registry/packages/utdk/copy-assets.mjs, ../registry/packages/utdk/tsconfig.json, ../registry/packages/utdk/package.json, ../registry/packages/bundler/src/render.ts | Verify: pnpm -C ../registry install && pnpm -C ../registry --filter "@utdk/sql" --filter "@utdk/llm" --filter "@utdk/sandbox" --filter "@utdk/vcs" --filter "@utdk/agent" build && pnpm -C ../registry --filter utdk build && pnpm -C ../registry --filter @utdk/e2e test:generation

- [ ] 1.1 `git mv` `packages/utdk/{sql,llm,sandbox,vcs,agent}` to `packages/contracts/<name>` (D1); fix each moved `tsconfig.json` `extends` depth; confirm pnpm picks them up via the existing `packages/**` glob (no `pnpm-workspace.yaml` change expected)
- [ ] 1.2 Add the `"utdk": { "contract": "sql", "handwritten": true }` marker to `@utdk/sql`; add `"publishConfig": { "access": "public" }` and `"license": "MIT"` to `@utdk/sql` and `@utdk/llm` (spec: utdk-contracts / marker + publishable manifests)
- [ ] 1.3 Remove contract names from `SKIP_TOP_DIRS` in `packages/utdk/build.mjs` and `skippedTopDirs` in `packages/utdk/copy-assets.mjs`; update both files' comments so they no longer describe a four-list alignment (spec: exclusion lists eliminated)
- [ ] 1.4 Remove `llm`, `sql`, `sandbox`, `agent`, `vcs` from `packages/utdk/tsconfig.json` `exclude` and from the `providersOnDisk` skip-set in `packages/bundler/src/render.ts` (keep `dist`, `node_modules`, `common`, `.turbo`, test skips)
- [ ] 1.5 Repo-wide grep for `packages/utdk/(sql|llm|sandbox|vcs|agent)` and stale `@utdk/<contract>` relative imports; fix every hit outside `apps/registry` (the catalog site is stream 7's) — then confirm the `utdk` root build emits `dist/github/vcs/` and the regenerated exports map still advertises the suite adapter (spec scenario: suite adapters survive)
- [ ] 1.6 Shape-audit `@utdk/sql` against MySQL (PlanetScale HTTP), BigQuery, DuckDB/MotherDuck; record `packages/contracts/sql/AUDIT.md` per D8's fixed schema; apply surface changes; bump to 0.2.0
- [ ] 1.7 Shape-audit `@utdk/llm` against Anthropic native, Gemini, OpenRouter; `AUDIT.md`; bump to 0.2.0
- [ ] 1.8 Shape-audit `@utdk/sandbox` against E2B, Modal, Daytona; `AUDIT.md`; bump to 0.2.0
- [ ] 1.9 Shape-audit `@utdk/vcs` against GitLab, Bitbucket, Gitea; `AUDIT.md`; bump to 0.2.0
- [ ] 1.10 Shape-audit `@utdk/agent` against OpenAI Assistants, Claude Agent SDK harness, relayed-harness shape; `AUDIT.md`; bump to 0.2.0

## 2. Provider naming authority

> Depends-on: - | Touches: ../registry/packages/bundler/src/naming.ts, ../registry/packages/bundler/src/naming.test.ts, ../registry/packages/bundler/src/provider.ts, ../registry/scripts/sources/apis-guru.ts, ../registry/data/registry.json | Verify: pnpm -C ../registry --filter @aprovan/utdk-bundler test && pnpm -C ../registry --filter @aprovan/utdk-bundler check-types && pnpm -C ../registry --filter @utdk/e2e test:generation

- [ ] 2.1 Create `packages/bundler/src/naming.ts` per the tech-plan interface: `HOSTNAME_PACKAGE_MAP`, `resolveProviderNameFromHostname` (explicit → `.com` default → single-segment full-domain slug), `assertValidProviderName` (D3)
- [ ] 2.2 Unit-test the authority: `github.com→github`, `drive.google.com→google/drive`, `synthetic.new→synthetic-new`, `linear.com→linear`, `api.github.com` (explicit-map case), `github.io→github-io`; assert no output ever contains `.`
- [ ] 2.3 Fix `splitProviderName` in `packages/bundler/src/provider.ts` to split on `/` only; wire `assertValidProviderName` into `loadRegistryProviders` so a dotted name fails at load time (spec: provider names never contain dots)
- [ ] 2.4 Replace `domainToSlug`/`domainToFullSlug` logic in `scripts/sources/apis-guru.ts` with calls into the naming authority, preserving the collision fallback via explicit-map entries
- [ ] 2.5 Normalize `data/registry.json` through the authority (expected no-op assert given current slash-separated names); seed `HOSTNAME_PACKAGE_MAP` with the exceptions found in provenance `originDomain` values

## 3. New contract packages

> Depends-on: 1 | Touches: ../registry/packages/contracts/{keyvalue,events,vfs,telemetry}/** | Verify: pnpm -C ../registry --filter "@utdk/keyvalue" --filter "@utdk/events" --filter "@utdk/vfs" --filter "@utdk/telemetry" build && pnpm -C ../registry --filter "@utdk/keyvalue" --filter "@utdk/events" --filter "@utdk/vfs" --filter "@utdk/telemetry" test

- [ ] 3.1 Scaffold all four packages per the tech-plan contract-package layout (manifest with marker/publishConfig/license, tsconfig, tool-entry factory, error class, client options, vitest)
- [ ] 3.2 Implement `@utdk/keyvalue` exactly per tech-plan Interfaces & Data (get/set/delete/list, limits, TTL 501 semantics, found-flag get, keys-only list); tests cover validators, tool entries, and every documented error status
- [ ] 3.3 Implement `@utdk/events` per tech-plan (emit/list, channel regex, after/cursor exclusivity, unknown-channel-empty-list); tests as above
- [ ] 3.4 Implement `@utdk/vfs` per tech-plan (read/write/delete/list/stat, path validation, etag/ifMatch with 409 and 501 paths, base64 binary, delimiter listing); assert the surface contains no session/overlay/mount concept (spec scenario: vfs surface stays minimal)
- [ ] 3.5 Implement `@utdk/telemetry` per tech-plan (single `export` op, OTLP JSON subset types, `withAttribution` with `aprovan.*` keys, partial-success result, reserved-metrics 501); tests validate a real OTLP/HTTP JSON sample payload passes unmodified (spec scenario: OTLP-shaped)
- [ ] 3.6 Shape-audit the four new contracts (keyvalue: Valkey/Redis, Cloudflare KV, DynamoDB; events: Redis Streams, SNS, Ably; vfs: S3-compatible, local FS, WebDAV; telemetry: OTLP collector, Datadog intake, Honeycomb intake); write each `AUDIT.md`; apply findings; bump each to 0.2.0

## 4. Shared types and generation metadata

> Depends-on: - | Touches: ../registry/packages/utdk/common/**, ../registry/packages/bundler/src/phases/authIntel.ts, ../registry/packages/bundler/src/phases/webhookIntel.ts, ../registry/docs/interfaces.md | Verify: pnpm -C ../registry --filter "@utdk/common" build && pnpm -C ../registry --filter "@utdk/common" test && pnpm -C ../registry --filter @aprovan/utdk-bundler test && pnpm -C ../registry --filter @aprovan/utdk-bundler check-types

- [ ] 4.1 Extend `@utdk/common/auth` with `CREDENTIAL_TYPES` tuple + `CredentialType` type (D9)
- [ ] 4.2 Rewrite `authIntel.ts` to import them: `AuthIntelMethod = CredentialType`, schema enum spread from the runtime tuple, local union deleted (spec scenarios: bundler imports shared types; divergence impossible)
- [ ] 4.3 Add `@utdk/common/compat` subpath: `CompatDocument`/`CompatEntry` types, `parseCompatDocument` (errors name sourcePath + field), `loadCompatDocuments` (enumerates by `utdk.contract` marker); unit tests for round-trip and each malformed-field failure (spec: published loader)
- [ ] 4.4 Add `@utdk/common/webhooks` types-only subpath re-exporting the webhook-intel result shapes; make `webhookIntel.ts` import its result types from it, preserving `sourceHash` caching behavior (spec: metadata shape is published)
- [ ] 4.5 Update `docs/interfaces.md` (and any doc that frames webhooks near interfaces) to classify webhook intel as bundler generation metadata alongside auth intel, and to document the contracts' new home and the compat.json mechanism (spec scenario: docs frame webhooks as metadata)

## 5. Compat catalog extraction

> Depends-on: 1, 4 | Touches: ../registry/packages/contracts/{sql,llm,sandbox,vcs,agent}/compat.json, ../registry/apps/workspace/src/interfaces.ts | Verify: pnpm -C ../registry --filter @aprovan/workspace check-types && pnpm -C ../registry --filter @aprovan/workspace test

- [ ] 5.1 Author `compat.json` for `sql`, `sandbox`, `vcs`, `agent` transcribing `listInterfaces()` verbatim — every entry, default, timeout, `defaultsFor`, `credentialless`, `moduleSpecifier`, and `unavailable` string (spec scenario: externalized faithfully)
- [ ] 5.2 Author `packages/contracts/llm/compat.json` with interface metadata + `"compatSource": "chat-provider-registry"` (D5)
- [ ] 5.3 Swap `listInterfaces()` to build from `loadCompatDocuments` (llm composed from `listLlmProviders()` on `compatSource`), leaving `resolveInterface`/binding/instance logic untouched; add a test asserting the produced `InterfaceDef[]` deep-equals the pre-extraction literals (spec scenario: behavior-preserving swap)
- [ ] 5.4 Confirm no `webhooks` id exists in any compat document or contract marker (spec: webhooks never an interface)

## 6. CI publish list

> Depends-on: 1, 3 | Touches: ../registry/.github/workflows/publish.yml | Verify: pnpm -C ../registry --filter "@utdk/*" exec pnpm publish --dry-run --no-git-checks

- [ ] 6.1 Extend the publish loop to `@utdk/common @utdk/sql @utdk/llm @utdk/sandbox @utdk/vcs @utdk/agent @utdk/keyvalue @utdk/events @utdk/vfs @utdk/telemetry @utdk/mcp-core utdk`, preserving skip-if-published and independent-failure semantics (spec: publish list covers all contracts)
- [ ] 6.2 Run the Verify dry-run publish across `@utdk/*` and fix any manifest rejection (access, license, files) (spec scenario: manifests are publishable)

## 7. Catalog site interface representation

> Depends-on: 1, 3, 4, 5 | Touches: ../registry/apps/registry/** | Verify: pnpm -C ../registry --filter @aprovan/registry-web build

- [ ] 7.1 Add `apps/registry/src/lib/contracts.ts`: enumerate contracts by marker under `packages/contracts/`, parse compat via `@utdk/common/compat`, execute each contract's tool-entry factory for operation metadata, build the inverted `provider → CompatEntry[]` index; fail the build loudly when `packages/contracts/` is missing (spec scenario: missing directory fails build)
- [ ] 7.2 Build `/interfaces` index page per ux.md (card grid, implementer counts incl. zero, available/planned split) and add it to primary nav
- [ ] 7.3 Build `/interfaces/[id]` detail pages per ux.md: description + npm identity, operations table (names/descriptions/required args), compat table with availability, `credentialless` and capability badges, `unavailable` reasons rendered un-linked, and the empty-compat state (spec scenarios: availability truthfully; empty compat)
- [ ] 7.4 Add the provider-page Implements section fed by the inverted index (absent when empty, badge + reason for unavailable), linking to interface pages; build-time validation fails on a compat entry whose available `module` has no provider on disk (spec: provider pages show what they implement)
- [ ] 7.5 Render the provider-page Webhooks metadata section from `webhooks.json` using `@utdk/common/webhooks` types, in the auth-intel visual family: supported badge, summary, collapsed event list, subscription ops, setup steps; omit or mute when absent/unsupported; build-warn and omit on malformed JSON (spec: webhook metadata as setup intel)
- [ ] 7.6 Update the site's off-disk path handling for the contracts move anywhere `apps/registry` referenced `packages/utdk/{sql,llm,sandbox,vcs,agent}` paths, and verify the full static build renders github (implements vcs), bitbucket-unavailable, and a zero-implementer new contract correctly
