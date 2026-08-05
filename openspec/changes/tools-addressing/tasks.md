# tools-addressing

Work streams 1, 2 and 4 touch disjoint paths and may run in parallel from the start.
Stream 3 depends on 1. Stream 5 depends on 2 and 4.

## 1. Naming authority: derive and validate the alias

> Depends-on: - | Touches: registry `packages/bundler/src/naming.ts`, `packages/bundler/src/naming.test.ts`, `packages/bundler/src/provider.ts` | Verify: `pnpm --filter @aprovan/utdk-bundler test`

- [x] 1.1 Add `globalAlias` to `ResolvedProviderName`, derived in
      `resolveProviderNameFromHostname`: segments joined camelCase, internal dashes
      removed (`google/drive` → `googleDrive`, `adyen/checkoutservice` →
      `adyenCheckoutservice`, `ably-io/platform` → `ablyIoPlatform`).
- [x] 1.2 Add `assertUniqueGlobalAliases(names)`; call it from `loadRegistryProviders`
      beside the existing `assertValidProviderName` pass. Comparison is
      case-insensitive.
- [x] 1.3 Assert every derived alias is a valid JS identifier — `/^[A-Za-z_$][\w$]*$/`.
      A provider name that cannot produce one is a load error naming the provider.
- [x] 1.4 Tests: single-segment names alias to themselves unchanged; three-segment names;
      names with leading digits (`api-` prefix path); a deliberate collision fails load
      with both offending provider names in the message.

**Done when** every provider in `data/registry.json` derives a unique, valid-identifier
alias, and a seeded collision fails `loadRegistryProviders` rather than surfacing later.

## 2. Publish the alias in the namespace catalog

> Depends-on: 1 | Touches: registry `packages/registry-server/src/catalog/**`, `packages/registry-server/src/routes/tools.ts` | Verify: `pnpm --filter @aprovan/registry-server test -- catalog`

- [x] 2.1 Add `globalAlias` to the namespace entries returned by `GET /tools/namespaces`,
      alongside the existing `name`. `name` stays the key.
- [x] 2.2 Confirm nothing persists the alias: grep profiles, grants, credentials, and
      dispatch for writes of `globalAlias`. It is a binding surface only.
- [x] 2.3 Test that a slash-named provider appears exactly once, with both renderings.

**Done when** a client can build the full `tools.` binding map from one catalog call
without deriving aliases itself.

## 3. Bind the full registry into the `tools.` global

> Depends-on: 1 | Touches: registry `packages/remote/src/imports.ts`, `packages/remote/src/proxy.ts`, `packages/remote/__tests__/remote.test.ts` | Verify: `pnpm --filter @utdk/remote test`

- [x] 3.1 Resolve a scanned alias back to its canonical provider name when building
      `RuntimeDependency` — `identifier: "googleDrive"`, `provider: "google/drive"`,
      `path: ""`. The alias never reaches `transport.call`.
- [x] 3.2 Test that `tools.googleDrive.files.list({})` dispatches
      `call("google/drive", "files.list", …)`.
- [x] 3.3 Test that an unknown alias produces a resolution error naming the alias and
      suggesting `tools.search()`, not a silent `undefined`.

**Done when** any of the 1,996 slash-named providers is reachable from `tools.` and
dispatches under its canonical name.

## 4. Consolidate the dependency scanner

> Depends-on: - | Touches: registry `packages/remote/package.json`, `packages/remote/__tests__/remote.test.ts`; aprovan `packages/editor/package.json`, `packages/editor/src/lib/code-extractor.ts`, `packages/editor/src/lib/scan-tools-access.ts`, `packages/editor/src/lib/__tests__/scan-tools-access.test.ts` | Verify: `pnpm --filter @utdk/remote test && pnpm --filter @aprovan/editor test && pnpm --filter @aprovan/editor typecheck`

- [x] 4.1 Add `"./tools-scan"` to `@utdk/remote`'s `exports` and set
      `"sideEffects": false`; publish the resulting version.
- [x] 4.2 Port the scanner cases the canonical suite does not cover — the `uses="…"`
      comment case, string-literal immunity, sort/dedup order — into
      `packages/remote/__tests__/remote.test.ts`. The rest are already covered
      transitively by `parseScriptDependencies`.
- [ ] 4.3 Repoint `packages/editor/src/lib/code-extractor.ts` at `@utdk/remote`; add the
      dependency at the version already resolved in the workspace so pnpm reuses one
      instance. Delete `scan-tools-access.ts` and its test.
- [ ] 4.4 Confirm the editor's public API is unchanged: `scanToolsAccess` and
      `ToolsAccessScan` still export from `packages/editor/src/index.ts`.
- [ ] 4.5 Grep both repos for a second scanner definition and assert exactly one
      survives.

**Done when** one implementation exists, the editor's exports are byte-compatible, and
`tsup` still builds the editor with `@utdk/remote` external.

## 5. Lazy type acquisition keyed by alias

> Depends-on: 2, 4 | Touches: aprovan `packages/editor/src/ts/**`, `packages/editor/src/ts/__tests__/**` | Verify: `pnpm --filter @aprovan/editor test -- type-environment`

- [ ] 5.1 Key `.d.ts` fetches by scanned alias, resolved to canonical name through the
      catalog from 2.1. Do not eagerly load the catalog's type surface.
- [ ] 5.2 Treat a scan miss as a cache miss, not an error — the scan is a hint (D3), and
      dynamic access legitimately produces incomplete lists.
- [ ] 5.3 Test that a script touching two namespaces fetches exactly two type bundles.

**Done when** opening a script fetches types only for the namespaces it references, and
an unresolvable reference degrades to no types rather than a broken editor.

## 6. Documentation

> Depends-on: 3 | Touches: registry `packages/remote/src/imports.ts` (docstring), aprovan `openspec/changes/tools-addressing/**` | Verify: `pnpm --filter @utdk/remote typecheck`

- [ ] 6.1 State in the `imports.ts` module docstring that the scan is a type-loading
      hint and that enforcement lives at `resolveProfile` — the next reader will
      otherwise assume the dependency list is a security boundary.
- [ ] 6.2 Record that transport-specific namespace segments (`gql`, `mcp`) were
      considered and rejected, so the question is not reopened from scratch.
