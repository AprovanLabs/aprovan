# Report: registry-server-extraction §9 — MCP host rewiring closeout

## Summary

`server/workspace/src/mcp/server.ts` (the 326-line parallel `buildMcpServer`/
`permittedTools`/`makeExecute` assembly) is deleted. The product's MCP surface
now runs entirely through `createMcpHandler` from `@aprovan/registry-server`,
bound to the embed's own `dispatcher`/`resolveDeps` and the `McpExtensions`
hook 7.2 built. `dispatch()` — profiles, grants, limits, audit, attribution —
is the one enforcement chokepoint for `call_tool`/`list_tools`/`search_tools`/
`tool_info`; the product's own `permissions.ts` Permissions-table check no
longer has any say over MCP tool visibility.

Cross-repo ordering gate honored: this consumes `@aprovan/registry-server`
0.2.3, which is grant-enforcement §1 (`30f17e7`, gate the zero-config fallback
on `authMode === "none"`) + §3 (`dbba5ef`, auto-provision a granted `default`
profile on credential connect) rebased onto the 0.2.2 release commit — not
main's HEAD, to avoid pulling in unrelated churn (POA, graphql-schema-surface,
relicense, sandbox/schema-lookup tools) that has nothing to do with this
closeout. See [registry PR #140](https://github.com/AprovanLabs/registry/pull/140).

## Tasks (all closed)

- **9.1** — Amended the 8.3 completion note (`briefs/00-report.md`) to scope
  the "replace … `mcp/server.ts` with package imports" claim out of MCP; it
  was never true for MCP on main, and §9 is what actually closes it.
- **9.2 (ordering gate)** — Verified GE §1/§3 on registry `main` before
  starting; the aprovan side never adopted the ungated predicate.
- **9.3** — `FS_TOOLS`/`handleFsTool` moved to `src/mcp/fs-tools.ts` (unchanged
  behavior), `TELEMETRY_TOOLS`/`handleTelemetryTool` moved to the new
  `src/mcp/telemetry-tools.ts`, both re-assembled behind `McpExtensions` in the
  new `src/mcp/extensions.ts` (`workspaceMcpExtensions`) along with the
  fs-backed prompts/artifacts surfaces `mcp/server.ts` used to build inline.
- **9.4** — `registry-embed.ts` now builds and memoizes an MCP handler via
  `createMcpHandler({ dispatcher, resolveDeps, extensions: workspaceMcpExtensions, serverName })`.
  `routes/mcp.ts` derives the `Principal` (session/role auth, unchanged) and
  hands the raw `Request` to `handleMcpRequest`, which narrows
  `Principal{sub, workspaceId, role, groupIds}` → registry
  `CallContext{principal, tenantId, role, groupIds}` via `callContextFromPrincipal`.
  `narrowRole()` fails closed (`throw`) on any role string other than
  `"admin" | "member"` rather than defaulting either way.
- **9.5** — Deleted `mcp/server.ts` outright (`permittedTools(all, principal)`,
  `makeExecute(principal)`, and the old inline `buildMcpServer` all went with
  it). DoD grep for both symbols across `server/workspace/src` and
  `server/workspace/tests` returns zero function definitions — the only hits
  are (a) a code comment in `registry-embed.ts` documenting what was replaced,
  and (b) `mcp-visibility-cutover.test.ts` importing/calling the **new**
  `buildMcpServer` from `@aprovan/registry-server` itself. Grepped the
  registry repo too: exactly one `permittedTools` definition exists
  (`packages/registry-server/src/mcp/server.ts`), gated by `resolveProfile`.
- **9.6** — Visibility equivalence captured on both sides of the cutover (see
  below); the one predicate difference is intentional and documented.
- **9.7** — `packages/mcp/`, `packages/mcp-core/`, `packages/mcp-app-server/`
  build litter confirmed absent from the worktree (`ls packages/` shows no
  `mcp*` directories).

## Visibility equivalence (9.6)

**Before cutover** (`tests/mcp-visibility-baseline.test.ts`, since deleted —
its only job was to snapshot the OLD predicate; the result below is what it
recorded before removal): the old `permittedTools(all, principal)` showed a
namespace to a member iff `getAuthMode() === "none"`, OR the caller is admin,
OR the caller (or a group they're in) holds a row in the product's own
`permissions.ts` Permissions table for that namespace (APR-320) — a resolved
`default` profile/grant in the registry sense had no bearing on this check at
all.

**After cutover** (`tests/mcp-visibility-cutover.test.ts`, new): the package's
`buildMcpServer` → internal `permittedTools` → `resolveProfile` shows a
namespace iff auth-none, admin, or `resolveProfile` does **not** throw a 403
for that namespace — i.e. a stored `default` profile (provider or interface
target) granted to the caller or one of their groups.

**The one documented behavior change**: a member with *only* the legacy
Permissions-table grant (no registry-server profile/grant) is now **not**
visible — `dispatch()` never consults that table. This is exactly the gap
7.1/8.3 were supposed to close and didn't; it is not a regression introduced
by this closeout, it's the closeout finally taking effect. Anyone relying on
the old grant path needs a `default` profile + grant created via
`POST /profiles` / the grants API (unaffected by this change) — same
migration path grant-enforcement §1/§3 already established for zero-config
callers.

`mcp-visibility-cutover.test.ts` exercises all four quadrants against the real
package `buildMcpServer`/`resolveProfile` (not a mock): admin with no grant,
member with only the legacy grant, member with only a registry-server
profile+grant, member with neither. All four match the documented predicate.

## Verification

```
$ pnpm --filter @aprovan/workspace test -- mcp
 ✓ tests/mcp-fs-tools.test.ts (4 tests)
 ✓ tests/mcp-telemetry-tools.test.ts (2 tests)
 ✓ tests/mcp-visibility-cutover.test.ts (4 tests)
 Test Files  3 passed (3)
      Tests  10 passed (10)
```

- `tsc -p server/workspace/tsconfig.json --noEmit`: clean.
- Full `server/workspace` suite (`vitest run`): 413 passed / 95 failed / 57
  skipped — same 21 pre-existing failing test files as main (unrelated:
  DSQL/AWS-credential-dependent tests with no local backend), and *fewer*
  total failures than the pre-cutover baseline (98 failed / 410 passed),
  i.e. no regressions from this change.
- `@aprovan/registry-server`'s own `mcp` suite was verified green against the
  0.2.3 branch in registry PR #140 before cutover began here.

Verified locally against a packed tarball of the not-yet-published 0.2.3 (see
below); `server/workspace/package.json` and this repo's lockfile reflect the
target published version, not a local override.

## Cross-repo state

- **Registry**: [PR #140](https://github.com/AprovanLabs/registry/pull/140)
  (`iw8/registry-extraction-09-npm-bump`, not merged) adds `dispatcher` +
  `resolveDeps` to the `RegistryServer` return shape and bumps
  `@aprovan/registry-server` to 0.2.3. This PR's branch point predates several
  now-merged `main` commits (graphql-schema-surface, POA, relicense) by
  design — it exists to publish GE §1/§3 without pulling in unrelated changes,
  not to track `main`'s tip.
- **Aprovan** (this PR): `server/workspace/package.json` declares
  `"@aprovan/registry-server": "^0.2.3"`. `pnpm-lock.yaml` is **not**
  regenerated in this PR — 0.2.3 isn't on npm yet, so a real `pnpm install`
  here would fail to resolve until PR #140 merges and publishes. Local
  verification (tests above) used a temporary `pnpm.overrides` entry pointing
  at a tarball packed from PR #140's branch; that override was reverted before
  committing, per the cross-repo publish-ordering rule (registry changes land
  and publish first, then the aprovan consumer bumps for real). Whoever merges
  this PR should merge #140 first, wait for the npm publish, then run
  `pnpm install` here to refresh the lockfile as a follow-up (or as part of
  merging this PR, if publish has already landed by then).

## Files touched

- Deleted: `server/workspace/src/mcp/server.ts`,
  `server/workspace/tests/mcp-visibility-baseline.test.ts` (temporary, its
  snapshot is captured above and superseded by the cutover test)
- Added: `server/workspace/src/mcp/extensions.ts`,
  `server/workspace/src/mcp/telemetry-tools.ts`,
  `server/workspace/tests/mcp-visibility-cutover.test.ts`
- Modified: `server/workspace/src/registry-embed.ts`,
  `server/workspace/src/routes/mcp.ts`,
  `server/workspace/src/routes/profiles.ts` (2-arg `CredentialService` ctor,
  GE §3),
  `server/workspace/src/registry-storage.ts` (`SqlClient.transaction()` on the
  DSQL adapter, GE §3),
  `server/workspace/tests/mcp-telemetry-tools.test.ts` (import path only),
  `server/workspace/package.json` (`@aprovan/registry-server` → `^0.2.3`),
  `openspec/changes/registry-server-extraction/briefs/00-report.md` (9.1),
  `openspec/changes/registry-server-extraction/tasks.md` (9.1–9.7 checked off)
