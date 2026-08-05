# Report: grant-enforcement §1 — Gate the zero-config fallback

## PR
https://github.com/AprovanLabs/registry/pull/125

## Branch
`iw8/grant-enforcement-01-gate`

## Verify (full output)

```
> @aprovan/registry-server@0.2.2 test /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ge01/packages/registry-server
> vitest run profiles


 RUN  v2.1.5 /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ge01/packages/registry-server

9:32:40 PM [vite] warning: Missing "./${provider}" specifier in "@utdk/clients" package
  Plugin: vite:dynamic-import-vars
  File: /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ge01/packages/registry-server/src/executor/index.ts
 ✓ tests/profiles.test.ts (30 tests) 21ms

 Test Files  1 passed (1)
      Tests  30 passed (30)
   Start at  21:32:40
   Duration  605ms (transform 104ms, setup 0ms, collect 160ms, tests 21ms, environment 0ms, prepare 45ms)
```

Additional: `pnpm --filter @aprovan/registry-server test -- mcp` — 7 passed.

Docstring grep: `NOT grant-checked` absent from `resolve.ts` (replaced with ungoverned-mode wording).

## Exact 403 message text

For interface or provider targets when `authMode !== "none"` and no default profile row exists:

```
No default profile for {namespace}. Ask a workspace admin to grant a profile.
```

Examples:
- `No default profile for sql. Ask a workspace admin to grant a profile.`
- `No default profile for github. Ask a workspace admin to grant a profile.`

## Visibility test details (§9.6 snapshot authors)

**File:** `packages/registry-server/tests/mcp.test.ts`
**Test:** `permission filtering hides namespaces with a credential but no granted profile`

Setup:
- Governed auth (`authMode: "oidc"`, default in test harness).
- Catalog: `github__repos_get` (provider `github`) and `sql__query` (interface `sql`).
- `github`: stored `default` profile row, no grant to member.
- `sql`: connected `postgres` credential, **no profile row** (previously visible via step 5).

Assertions for member caller:
- `list_tools` output does **not** contain `github__repos_get`.
- `list_tools` output does **not** contain `sql__query`.

Assertions for admin caller:
- Both tools remain visible.

This is the visibility snap: credential-connected namespaces without a granted profile are now hidden from `permittedTools`, not just namespaces with an ungranted stored profile.

## Files changed

- `packages/registry-server/src/profiles/resolve.ts` — gate + docstring
- `packages/registry-server/tests/profiles.test.ts` — governed/ungoverned tests, return-path enumeration
- `packages/registry-server/tests/mcp.test.ts` — visibility test + dispatch setup fix

## Not in scope (deferred)

- §3 credential provisioning (default profile on connect)
- Product-host MCP (§9 registry-server-extraction)
