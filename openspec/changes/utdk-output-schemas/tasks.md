## 1. Output-schema slot

> Depends-on: - | Touches: registry/packages/contracts/*/index.ts, registry/packages/registry-server/src/http/discovery.ts, registry/packages/registry-server/src/kernel/index.ts | Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm check-types`

- [x] 1.1 Add `outputSchema?` and `streaming?` to the return literal of the nine contract tool-entry helpers (`vfs`, `keyvalue`, `events`, `telemetry`, `vcs`, `sql`, `llm`, `agent`, `sandbox`) — today the literal has no such field, so the shape cannot be expressed at all.
- [x] 1.2 Add the same fields to `relabelEntries` in `registry-server/src/http/discovery.ts` and to the `ToolEntry` declaration in the kernel.
- [x] 1.3 Add a test asserting an entry's `outputSchema` survives discovery relabelling unchanged (satisfies `tool-entry-output-slot` / "Discovery preserves the slot").
- [x] 1.4 Add a test asserting an operation with no known schema omits the field rather than setting a placeholder.

## 2. Envelope contract ADR

> Depends-on: - | Touches: docs/adr/** | Verify: `test -f docs/adr/*envelope*.md`

- [x] 2.1 Record via the `adr` skill: an output schema describes the value inside `data`; errors travel out of band as a throw or `{ error }` with a non-OK status; streams bypass the envelope entirely.
- [x] 2.2 Document the two divergent unwrap implementations — the two-key guard in the widget bridge versus the unconditional `body.data` in the web client — and name `tools-global` as the change that converges them.

## 3. Fix response extraction

> Depends-on: - | Touches: registry/packages/bundler/src/openapi.ts, registry/packages/bundler/src/render.ts, registry/packages/bundler/src/schema.ts, registry/packages/bundler/src/**/*.test.ts | Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/utdk-bundler test`

- [x] 3.1 Deduplicate `getResponseSchema` and `getRawResponseSchema` into one function parameterised by dereferencing (tech-plan D2).
- [x] 3.2 Restrict selection to 2xx responses; a non-2xx response must never become a return type.
- [x] 3.3 Introduce the four-outcome result type (`schema` | `no-content` | `unknown` | `streaming`) so the fall-through that caused this bug is unrepresentable.
- [x] 3.4 Make a `204`/`205` success yield an explicit no-value return type, matching `client.ts:397-400`.
- [x] 3.5 Make multi-2xx selection deterministic and add a test pinning the choice.
- [x] 3.6 Add a regression test built from the shape that caused the bug: a `204` success plus a `400` with a body must not produce the `400`'s type.

## 4. Regenerate providers

> Depends-on: 3 | Touches: registry/packages/utdk/*/types/**, registry/packages/utdk/*/docs/** | Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/clients build`

- [ ] 4.1 Regenerate all provider packages.
- [ ] 4.2 Review the changed return types — expect ~286 across github (173), launchdarkly (61), elevenlabs (18), jira (13), intercom (7), sendgrid (7), hubspot (3), salesforce (2), plaid (1), zendesk (1).
- [ ] 4.3 Add a test asserting no generated operation declares a type sourced from a non-2xx response (satisfies `provider-output-schemas` / "Error bodies eliminated").
- [ ] 4.4 Record the coverage figure before and after so the digitalocean work in stream 7 can be measured against it.

## 5. Serve schemas from the catalog

> Depends-on: 3 | Touches: registry/apps/registry/src/lib/openapi.ts, registry/apps/registry/src/lib/registry.ts, registry/apps/registry/src/pages/catalog/p/[...path].json.ts, registry/apps/registry/src/components/{ProviderExplorer,SdkExplorer}.tsx | Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-web build`

- [x] 5.1 Add `outputs` and `responseUnknown` to `OperationInfo`.
- [x] 5.2 Serve the per-status `outputs` map already built at `lib/registry.ts:694-709` and currently read by nothing.
- [x] 5.3 Mark operations whose upstream spec declares no response, so coverage is measurable rather than inferred.
- [x] 5.4 Render a "Returns" section in the catalog explorer components.
- [x] 5.5 Measure the served payload size before and after; trim or paginate if it regresses materially.

## 6. MCP output schemas

> Depends-on: 3 | Touches: registry/packages/mcp-core/src/loader.ts, registry/packages/mcp-core/src/meta-tools.ts, registry/packages/mcp-core/**/*.test.ts | Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/mcp-core test`

- [x] 6.1 Set `ProviderTool.outputSchema` from `tool.outputs` in the loader — the value is already on the object the loader reads.
- [x] 6.2 Pass it through meta-tools normalisation alongside `inputSchema`.
- [x] 6.3 Omit the field entirely when no schema is known; do not emit a permissive placeholder.
- [x] 6.4 Add tests for both MCP scenarios in `provider-output-schemas`.

## 7. Re-bundle digitalocean

> Depends-on: 4 | Touches: registry/packages/utdk/digitalocean/** | Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/clients build`

- [ ] 7.1 Resolve the external `$ref`s to `resources/**/*.yml` in digitalocean's source specification — currently 0 of 635 operations carry a `responses` object.
- [ ] 7.2 Regenerate and confirm the operations now carry return types.
- [ ] 7.3 Re-measure global coverage against the baseline from 4.4; expect roughly 83% → 89%.
- [ ] 7.4 If the upstream source proves unavailable, record that outcome and leave the package marked as unknown-response rather than partially patched.
