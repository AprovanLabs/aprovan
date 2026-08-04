## 1. Create and publish `@utdk/remote`

> Depends-on: - | Touches: registry/packages/remote/**, registry/.github/workflows/publish.yml, registry/pnpm-workspace.yaml | Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/remote build && pnpm --filter @utdk/remote test`

- [ ] 1.1 Create `registry/packages/remote` containing `proxy.ts`, `transport.ts`, `policy.ts`, `paginate.ts`, `imports.ts` and their shared `types.ts`, copied from `registry/packages/runtime/src`.
- [ ] 1.2 Declare zero `@aprovan/*` dependencies; add a test that fails if any appear (satisfies `remote-client-package` / "Dependency direction").
- [ ] 1.3 Add the depth-0 call signature to `createNamespaceProxy` — invoking a namespace root returns a configured node rather than throwing (`tools-global` D2).
- [ ] 1.4 Add a test asserting no module in the package references `document`, `window`, or creates an iframe.
- [ ] 1.5 Add `@utdk/remote` to the registry publish workflow's build filter list and its publish loop; publish `0.1.0`.

## 2. Merge the sandbox hosts

> Depends-on: - | Touches: packages/compiler/src/mount/iframe.ts, packages/compiler/src/mount/sandbox.ts, packages/compiler/src/mount/index.ts, packages/compiler/src/__tests__/** | Verify: `pnpm --filter @aprovan/patchwork-compiler test`

- [ ] 2.1 Enumerate the feature sets of `registry/packages/runtime/src/sandbox.ts` and `packages/compiler/src/mount/iframe.ts` side by side — console mirroring exists only in the latter, policy integration only in the former. Record the union before merging.
- [ ] 2.2 Move `sandbox.ts` into the widget runtime's mount layer and merge the two into one protocol host preserving that union.
- [ ] 2.3 Export a script-running entry point suitable for the registry playground, distinct from widget mounting but sharing the host.
- [ ] 2.4 Add tests covering both entry points against the `service-call` / `service-result` contract in the tech plan.

## 3. Widget runtime consumes `@utdk/remote`

> Depends-on: 1, 2 | Touches: packages/compiler/package.json, packages/compiler/src/mount/bridge.ts, packages/compiler/src/index.ts | Verify: `pnpm --filter @aprovan/patchwork-compiler test && pnpm check-types`

- [ ] 3.1 Add `@utdk/remote` as a dependency of the widget runtime.
- [ ] 3.2 Delete the local field-access proxy in `mount/bridge.ts` and construct namespace nodes via `@utdk/remote`.
- [ ] 3.3 Delete the string-generated proxy inside `generateIframeBridgeScript` in favour of the shared implementation.
- [ ] 3.4 Add a test asserting exactly one proxy implementation is reachable from this package (satisfies `remote-client-package` / "Single proxy implementation").

## 4. Registry playground migrates

> Depends-on: 1, 2 | Touches: registry/apps/registry/src/components/ScriptPlayground.tsx, registry/apps/registry/src/components/HomeSandboxDemo.tsx, registry/apps/registry/src/lib/{demo,playground}.ts, registry/apps/registry/package.json | Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-web build`

- [ ] 4.1 Replace `@aprovan/runtime` imports with `@utdk/remote` plus the widget runtime's script-running entry point.
- [ ] 4.2 Keep the existing lazy-import boundary so a failure degrades to a playground error rather than a page failure.
- [ ] 4.3 Verify the playground still runs its sample script end to end against a live gateway.

## 5. Retire `@aprovan/runtime`

> Depends-on: 3, 4 | Touches: registry/packages/runtime/** (delete), registry/.github/workflows/publish.yml, client/web/package.json, pnpm-lock.yaml, registry/pnpm-lock.yaml | Verify: `pnpm check-types && cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm check-types`

- [ ] 5.1 Confirm no source file in either repository imports `@aprovan/runtime`.
- [ ] 5.2 Delete `registry/packages/runtime`.
- [ ] 5.3 Remove it from the registry publish workflow's build filter and publish loop.
- [ ] 5.4 Remove the declared-but-unused dependency from `client/web/package.json`; refresh both lockfiles.
- [ ] 5.5 Update the two `packages/registry-ui` files that reference it by structural stand-in, so their comments no longer name a retired package.
