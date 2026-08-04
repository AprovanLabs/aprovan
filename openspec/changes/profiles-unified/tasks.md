## 1. Profile store and resolver

> Depends-on: - | Touches: server/workspace/src/profiles/**, server/workspace/tests/profiles.test.ts | Verify: `pnpm --filter @aprovan/workspace test`

- [ ] 1.1 Implement the store: `(namespace | path, name?) → { provider?, credential?, options? }`, with exactly one of `namespace`/`path` per record.
- [ ] 1.2 Implement the resolver — exact match for namespace keys, longest-prefix for path keys.
- [ ] 1.3 Accept any non-empty string as a profile name; add a test using characters invalid in a URL path segment.
- [ ] 1.4 Define `CallOptions` (no transport keys) and `ProfileOptions` (wider) as distinct types, per tech-plan D4.
- [ ] 1.5 Add tests for the resolution order: call-site options > profile options > compat defaults.
- [ ] 1.6 Add tests for `path-mounts` longest-prefix and no-match scenarios.

## 2. Configuration surface

> Depends-on: 1 | Touches: server/workspace/src/profiles-service.ts, server/workspace/src/service-kernel.ts, server/workspace/src/interfaces-service.ts | Verify: `pnpm --filter @aprovan/workspace test`

- [ ] 2.1 Add `profiles.set` / `profiles.list` / `profiles.remove` per the tech plan's interface block.
- [ ] 2.2 Remove `interfaces.bind` and `interfaces.unbind`; keep `interfaces.list`, which is genuine discovery and is unaffected.
- [ ] 2.3 Make namespace-keyed and path-keyed profiles list together (satisfies `path-mounts` / "One configuration surface").
- [ ] 2.4 Reject `profiles.set` from app sessions, matching the existing rule that bindings are workspace configuration.

## 3. Migration

> Depends-on: 1 | Touches: server/workspace/scripts/migrate-profiles.ts, server/workspace/src/credentials.ts | Verify: `pnpm --filter @aprovan/workspace test`

- [ ] 3.1 Mint one profile per labelled credential, so pinned scripts keep resolving after the label lookup is removed.
- [ ] 3.2 Convert `.services/bindings.json` entries to namespace-keyed profiles, including named instances.
- [ ] 3.3 Convert mount records to path-keyed profiles.
- [ ] 3.4 Report any workspace where two credentials share a label — today that fails at call time; after migration it must be resolved, not silently collapsed.
- [ ] 3.5 Verify against the reference snapshot at `~/aprovan-snapshots/workspace-2026-08-03/` before running against live data.

## 4. Dispatch reads the profile from the body

> Depends-on: 1, 2 | Touches: server/workspace/src/routes/tools.ts, server/workspace/src/workflows/invoke.ts, server/workspace/src/workflows/runner.ts | Verify: `pnpm --filter @aprovan/workspace test`

- [ ] 4.1 Accept `{ args, profile, options }` on `POST /tools/:namespace/:operation`.
- [ ] 4.2 Delete the re-serialisation at `workflows/invoke.ts:157-168` that rebuilds `<interface>:<profile>` and validates it against the instance-name regex — this is the single edit that delivers both arbitrary names and colon removal.
- [ ] 4.3 Resolve through the profile resolver for provider, interface, and path-keyed cases alike.
- [ ] 4.4 Reject transport-shaped keys arriving in call-site options, as the runtime backstop to the type-level rule.
- [ ] 4.5 Make an unresolved profile fail at the first operation with an error naming the profile and listing what exists.

## 5. Remove the colon form and `getClient`

> Depends-on: 4 | Touches: server/workspace/src/{interfaces.ts,interfaces-service.ts,service-kernel.ts,agents/service.ts,agents/policy.ts,routes/llm.ts}, server/workspace/tests/{interfaces,agent-run,get-client,agent-policy,sandbox-agent-runs}.test.ts, registry/docs/interfaces.md | Verify: `pnpm --filter @aprovan/workspace test`

- [ ] 5.1 Delete `parseInterfaceNamespace`'s colon handling, `INSTANCE_RE`, and `instanceNamespace`.
- [ ] 5.2 Delete every `getClient` reference and implementation, including the sandbox prelude guard that reserves the name and the stale documentation naming it as reserved.
- [ ] 5.3 Convert agent profiles' interface-instance field from a colon string to `{ interface, profile }` — the one consumer whose stored data changes meaning rather than spelling.
- [ ] 5.4 Rewrite `registry/docs/interfaces.md` lines 61-88, which justify the colon form on grounds that no longer hold.
- [ ] 5.5 Add a test asserting no colon-addressed namespace appears in the tool list or in stored configuration.

## 6. Lazy client on the call path

> Depends-on: 4 | Touches: registry/packages/remote/src/proxy.ts, packages/compiler/src/mount/** | Verify: `pnpm --filter @aprovan/patchwork-compiler test`

- [ ] 6.1 Make the depth-0 call signature accept `client(name)` and `client({ name, options })`, returning a lazily-configured node with no promise and no request.
- [ ] 6.2 Ensure a configured node is reusable across operations and resolves the profile at most once per call.
- [ ] 6.3 Carry `profile` and `options` through the postMessage bridge into the request body.
- [ ] 6.4 Add tests for the four `namespace-profiles` lazy-configuration scenarios.

## 7. UI surfaces

> Depends-on: 2, 5 | Touches: client/web/src/components/ServicesMenu.tsx, client/web/src/components/panels/InterfacesPanel.tsx, client/web/src/components/panels/agents/{ProfileEditor.tsx,payload.test.ts}, client/web/src/lib/{namespaces.ts,namespaces.test.ts} | Verify: `pnpm --filter @aprovan/patchwork-web typecheck`

- [ ] 7.1 Delete `interfaceBaseId` and the colon-splitting in `client/web/src/lib/namespaces.ts`; a namespace is now always a bare name.
- [ ] 7.2 Repoint the interfaces panel from bind/unbind onto the profile surface, showing namespace-keyed and path-keyed profiles together.
- [ ] 7.3 Update the agent profile editor for the `{ interface, profile }` shape.
- [ ] 7.4 Remove colon-form rendering from the services menu.

## 8. Delete the old stores

> Depends-on: 3, 5, 7 | Touches: server/workspace/src/interfaces.ts, server/workspace/src/credentials.ts, server/workspace/src/vcs/mounts.ts | Verify: `pnpm --filter @aprovan/workspace test && pnpm check-types`

- [ ] 8.1 Remove `bindings.json` reading and writing once every workspace is migrated.
- [ ] 8.2 Remove the credential-label lookup at `credentials.ts:807-826`; `label` reverts to a display name that can be renamed freely.
- [ ] 8.3 Remove the standalone mount table's management functions, keeping the delegation logic that `vfs.read` and `vfs.list` already use.
- [ ] 8.4 Add a test asserting exactly one configuration store remains.
