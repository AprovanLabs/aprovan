# Proxy ready — `@utdk/remote` stream 1

`packages/remote/src/proxy.ts` is on branch `iw7/utdk-remote` in the registry
worktree.

## Surface for profiles-unified stream 6

- `createNamespaceProxy(provider, transport, pathPrefix?, options?)`
- Depth-0 invocation configures and returns a node (no dispatch):
  `tools.github({ name: "work" })` → pinned node
- Profile pin is carried on `TransportCallOptions.profile` for subsequent
  depth ≥ 1 dispatches
- Empty configure (`tools.github()`) is legal and equivalent to the bare node

profiles-unified stream 6 can proceed against this seam (lazy `client(name)` /
body profile wiring).
