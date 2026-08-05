# Report: grant-enforcement §5 — MCP sandbox execution tool

## Summary

Registered a sandboxed-TypeScript MCP tool (`run_script`) through the existing
`McpExtensions` hook. Its `tools.<namespace>` calls dispatch through the same
`Dispatcher` as `call_tool`, so every call passes `resolveProfile` — the same
predicate `permittedTools` uses for `list_tools`. The tool refuses to register
at all when `authMode === "none"`, and accepts an optional `narrowedTo`
argument that feeds `CallContext.narrowedTo` (grant-enforcement §4).

## Design

- **Not a `buildMcpServer` special case (5.1).** `mcp/sandbox-tool.ts` exports
  `createSandboxMcpExtensions(deps)`, which builds a plain `McpExtensions`
  object (`{ tools, handleTool }`) — the exact same hook shape a host uses for
  its own product-plane tools. `withSandboxTool(deps, base)` composes that
  contribution with a host-supplied `McpExtensions`, concatenating `tools` and
  dispatching `handleTool` by name ownership. `server.ts` calls
  `withSandboxTool({ dispatcher, resolveDeps }, options.mcp?.extensions)` once,
  at construction, before handing a single `extensions` object to
  `createMcpHandler`. `buildMcpServer` itself is untouched — it already knew
  how to serve `extensions.tools` / `extensions.handleTool` from the §5
  brief's "MCP extension hook" contract.
- **Dispatch parity, not a second predicate (5.2).** Per tech-plan D2, the
  guest's `tools.*` globals are NOT pre-filtered by grant inside the sandbox
  host — that would be a second implementation of the same check `permittedTools`
  already makes. Instead the tool's `dispatch` callback calls
  `Dispatcher.dispatch()` directly (the identical call `call_tool` makes),
  so an ungranted namespace fails with the same 403 at the same chokepoint
  (`resolveProfile`) regardless of whether it was listed in the call's
  `namespaces` array. A test builds the exact `permittedTools`-hides-it setup
  from `mcp.test.ts` (credential connected by a different principal) and
  asserts the same namespace is unreachable from inside a submitted script,
  both uncaught (surfaces as `isError: true`) and caught (`try { ... } catch`
  sees the same message `call_tool` would return).
- **Refusal, not a failing registration (5.3).** `createSandboxMcpExtensions`
  returns `{}` (no `tools`, no `handleTool`) when `deps.resolveDeps.authMode
  === "none"`. `list_tools` under `authMode: "none"` therefore never mentions
  `run_script` — there is no tool to call, not a tool that errors.
- **Narrowing (5.4).** The tool's input schema carries an optional
  `narrowedTo: string[]`. `handleRunScript` folds it onto the caller's base
  `CallContext` and runs it through `finalizeCallContext` (the same helper the
  embedding `dispatch`/`runScript` API uses) before the run starts — a
  superset of the caller's grant is rejected up front (400, naming the
  offending entries) rather than silently clamped, and a valid subset is
  honoured by every dispatch the script makes for the rest of that call.

## Changes

| Area | Change |
|------|--------|
| `mcp/sandbox-tool.ts` (new) | `SANDBOX_TOOL_NAME`, `createSandboxMcpExtensions()`, `withSandboxTool()` |
| `server.ts` | `createMcpHandler` extensions wired through `withSandboxTool(...)` |
| `index.ts` | Export `createSandboxMcpExtensions`, `withSandboxTool`, `SANDBOX_TOOL_NAME`, `SandboxToolDeps` |
| `tests/mcp-sandbox.test.ts` (new) | Registration gating, dispatch parity, narrowing |

## Verification

```bash
cd ~/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ge05
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- mcp
```

**Result:** 14 passed (7 pre-existing `mcp.test.ts` + 7 new `mcp-sandbox.test.ts`).

Full package suite: 177 passed, 10 skipped, 5 failed. Confirmed via `git
stash` that the same 5 failures (2 in `profiles.test.ts`, 3 in
`server.test.ts`, all pre-existing sandbox/namespace-resolution issues
unrelated to `mcp/**`) reproduce identically on `main` before this change.

`pnpm --filter @aprovan/registry-server typecheck` passes clean.

## Tasks (§5)

- [x] 5.1 Registered through `McpExtensions`, not a `buildMcpServer` special case
- [x] 5.2 `tools` routes through `Dispatcher`; confused-deputy test passes
- [x] 5.3 Refuses to register when `authMode === "none"`
- [x] 5.4 Optional narrowing argument feeds `CallContext.narrowedTo`
- [x] 5.5 Tests: ungranted namespace unreachable; `authMode: "none"` omits
      the tool from `list_tools`; narrowing argument honoured (including
      superset rejection)

## Notes for graphql-schema-surface §3

This branch was rebased onto `origin/main` immediately before opening the PR
(picked up POA §1/§2 and graphql-schema-surface §2/§4, none of which touch
`mcp/**`). §3 should branch from `main` after this PR merges to avoid a
`McpExtensions`-shape conflict in `server.ts`'s `createMcpHandler` wiring.

## PR

<https://github.com/AprovanLabs/registry/pull/141> — **not merged**, per
instructions.
