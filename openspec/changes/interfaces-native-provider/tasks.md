## 1. Un-erase helper return types

> Depends-on: - | Touches: server/workspace/src/sandboxes/service.ts, server/workspace/src/vcs/sessions-service.ts | Verify: `pnpm --filter @aprovan/workspace test && pnpm check-types`

- [x] 1.1 Replace the sandbox summariser's opaque record return with the shape it actually produces; it also spreads an open-ended record, which must be narrowed.
- [x] 1.2 Replace the session helper's opaque promise return with the shape it actually produces — eleven operations' schemas are blocked behind this one signature.
- [x] 1.3 Fix the downstream type errors both changes surface.

## 2. Create `@aprovan/native`

> Depends-on: - | Touches: packages/native/**, packages/sandbox-bashkit/** (delete), packages/sandbox-host/** (delete), packages/sandbox-image-node/** (delete), .github/workflows/** | Verify: `pnpm --filter @aprovan/native build && pnpm check-types`

- [x] 2.1 Create the package; move the three sandbox packages into it and retire them.
- [x] 2.2 Add a test asserting nothing in the package is importable by sandboxed widget code.
- [x] 2.3 Update the publish workflow's package list.

## 3. Implement the contracts

> Depends-on: 1, 2 | Touches: packages/native/src/**, packages/native/__tests__/** | Verify: `pnpm --filter @aprovan/native test`

- [x] 3.1 Implement the file contract over workspace storage, including the operation the first-party surface never had.
- [x] 3.2 Implement the version-control contract over the workspace commit store.
- [x] 3.3 Implement the key-value contract, adding the field that distinguishes a missing key from a stored empty value — this is a correctness fix, not only a shape change.
- [x] 3.4 Implement the event contract, reconciling the record's field names and adding the fields the contract declares.
- [x] 3.5 Implement the telemetry contract — the one pair that already agrees; confirm rather than change.
- [x] 3.6 Add a conformance test per contract asserting every declared operation is implemented and every result matches the declared shape (satisfies `native-interface-provider` / "First-party results match their contracts").

## 4. Register as default bindings

> Depends-on: 3 | Touches: registry/packages/contracts/{vfs,vcs,keyvalue,events,telemetry}/compat.json, server/workspace/src/interfaces.ts | Verify: `pnpm --filter @aprovan/workspace test`

- [x] 4.1 Add a credentialless compat entry per contract for the Aprovan provider, using the module-specifier form that already points outside the catalogue.
- [x] 4.2 Short-circuit these entries in process, matching the existing pattern for the contracts that already do this — an isolate-hosted module cannot reach workspace storage.
- [x] 4.3 Verify default resolution reaches the native provider, and that a profile bound to a third party reaches that instead, with the same shapes.

## 5. Split version control off the file namespace

> Depends-on: 3 | Touches: server/workspace/src/services.ts, server/workspace/src/vcs/**, server/workspace/src/apps/capabilities.ts, server/workspace/tests/** | Verify: `pnpm --filter @aprovan/workspace test`

- [ ] 5.1 Move commit, history, show, comparison, references, and restoration to the version-control namespace.
- [ ] 5.2 Reduce the file namespace to its contract's operations.
- [ ] 5.3 Remove the workspace-only guard, now redundant — the operations it protected are no longer reachable there.
- [ ] 5.4 Remove the file-namespace procedure allow-list in the application capability model, now identical to the contract.
- [ ] 5.5 Confirm mount management is gone from the file namespace and served by path-keyed profiles from `profiles-unified`.
- [ ] 5.6 Add tests for all `vfs-vcs-split` scenarios.

## 6. Platform namespaces become plugins

> Depends-on: 4, 5 | Touches: server/workspace/src/service-kernel.ts, server/workspace/src/services.ts, server/workspace/src/routes/tools.ts, server/workspace/src/registry-embed.ts, server/workspace/src/{apps,workflows,sandboxes,agents,notifications,telemetry,webhooks}/**, server/workspace/src/{sync.ts,interfaces-service.ts} | Verify: `pnpm --filter @aprovan/workspace test`

- [ ] 6.1 Register each Aprovan-only namespace through the plugin registry established by `tools-global`.
- [ ] 6.2 Delete the enumerated first-party service list and the branch that resolves those names ahead of interfaces.
- [ ] 6.3 Replace the build-time consistency check that list provided — a name declared without an implementation must still fail the build.
- [ ] 6.4 Keep namespace classification published, so a services surface can still group first-party namespaces.
- [ ] 6.5 Add tests for the first three `platform-namespace-plugins` scenarios.

## 7. Platform output schemas

> Depends-on: 1, 6 | Touches: server/workspace/src/{services.ts,workflows/service.ts,apps/service.ts,sandboxes/service.ts,agents/service.ts,sync.ts,webhooks/service.ts,interfaces-service.ts,telemetry/service.ts,notifications/service.ts,vcs/sessions-service.ts} | Verify: `pnpm --filter @aprovan/workspace test`

- [ ] 7.1 Batch one — the flat-literal services: key-value, events, registry, webhooks, notifications, interfaces, telemetry (23 operations).
- [ ] 7.2 Batch two — workflows and sync (15 operations); the sync run result is a union over its destination kind and needs a judgement call.
- [ ] 7.3 Batch three — sessions (11 operations), unblocked by task 1.2.
- [ ] 7.4 Batch four — applications (25 operations); three summariser helpers already carry inferred shapes to read off. Voluminous; budget accordingly.
- [ ] 7.5 Batch five — files and version control after the split; the listing and read operations have argument-dependent shapes needing judgement.
- [ ] 7.6 Batch six — the non-passthrough agent and sandbox operations, unblocked by task 1.1.
- [ ] 7.7 Split the argument-dependent application data operation into one operation per result shape (satisfies `platform-namespace-plugins` / "Argument-dependent results are separated").
- [ ] 7.8 Mark the seven driver-passthrough operations, declaring their contract's shape as advisory rather than guaranteed.
- [ ] 7.9 Add the regression test: every platform operation either declares an output schema or is marked passthrough.

## 8. Update callers and reseed

> Depends-on: 5, 6, 7 | Touches: client/web/src/**, packages/registry-ui/src/**, server/workspace/examples/**, server/workspace/scripts/seed-*.ts, data/prompts/** | Verify: `pnpm check-types && pnpm --filter @aprovan/workspace test`

- [ ] 8.1 Update every caller of a changed result shape — key-value read and write, key-value list, file read, file list, file delete, and the event record.
- [ ] 8.2 Update callers of the version-control operations to the new namespace.
- [ ] 8.3 Update the seeded example content and the widget authoring prompt for the new namespaces and shapes.
- [ ] 8.4 Flip the gateway's catalog-derived tool entries from an undefined output schema to the real one now served by `utdk-output-schemas`.
- [ ] 8.5 Reseed examples and prompts; verify against the reference snapshot that no content depends on a removed shape.
