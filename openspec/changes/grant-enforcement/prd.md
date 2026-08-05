## Problem

The grant check in `resolveProfile` runs only when a stored profile row exists. When no
row exists and the requested name is `default`, step 5 falls through to a zero-config
path that its own comment marks `NOT grant-checked`, ending in an unconditional
`credentials.firstForProvider(tenantId, provider)`. **Any namespace with a tenant
credential and no stored profile is therefore reachable by every member of the tenant.**

This is already live on the MCP surface: `permittedTools` hides a namespace only when
`resolveProfile` throws 403, and step 5 never throws 403.

The product host compounds it. `server/workspace/src/mcp/server.ts` carries a second
`permittedTools` — same name, different signature, different semantics — that executes
through `makeExecute(principal)` rather than `dispatch()`. Two enforcement paths, one of
which never touches the designated chokepoint.

Adding an MCP tool that runs arbitrary sandboxed TypeScript on top of this would make it
a confused deputy: one tool whose blast radius is every credential the tenant holds,
regardless of what the catalog decided to show.

## Users & Jobs

- **Workspace administrators** — need a member's reach to be what they granted, not
  whatever credentials happen to be connected.
- **Agents calling through MCP** — need a grant they cannot widen from inside a script.
- **Script authors** — need zero-config onboarding to keep working; connecting a
  credential should not require authoring a profile first.

## Goals

- Grants attach to the calling identity. A run may narrow its principal's grant; it can
  never widen it.
- `resolveProfile` is the only place a namespace becomes a credential, on every path
  including the sandbox transport.
- No reachable code path hands over a credential without a grant check, except when
  `authMode` is explicitly `"none"`.
- Connecting a credential remains one step for the user.

## Non-Goals

- Does **not** backfill existing data. Pre-launch; there is no production credential set
  to migrate.
- Does **not** change the cipher, KMS envelope scheme, or credential payload shapes.
- Does **not** rewire the product host's MCP server — that is section 9 of
  `registry-server-extraction`, which depends on this change landing first.

## Capabilities

### New Capabilities

- `run-scoped-narrowing`: a run may request a subset of its principal's grant.
- `sandbox-mcp-tool`: an MCP tool that executes sandboxed TypeScript under the caller's
  grant.

### Modified Capabilities

- `profile-resolution`: the zero-config fallback is gated; a granted `default` profile is
  provisioned when a credential is connected.
- `dependency-scan`: dynamic `tools[expr]` access becomes an error rather than a warning.

## Open Questions

- Should a run's narrowing request be recorded in the audit trail as distinct from its
  principal's full grant? Assumed **yes** — otherwise least-privilege runs are
  indistinguishable from unrestricted ones after the fact.
