# identity-store

Interface extraction over the Dynamo-only identity/authz modules
(`users.ts`, `workspaces.ts`, `memberships.ts`, `sessions.ts`, `invites.ts`,
`groups.ts`, `userGroups.ts`, `permissions.ts` — ~58 raw Dynamo call sites across 13
files today), the per-token auth-resolution cache, and the from-scratch relational
schema for DSQL. Credentials/audit keep their existing `IXStore` interfaces and gain
DSQL backends; the credential user-dimension column lands in the same schema pass.

## ADDED Requirements

### Requirement: Identity store interface

Identity/authz persistence SHALL sit behind an `IIdentityStore` interface (or a small
family of per-entity interfaces resolved by one `getIdentityStore()` factory) covering
users, workspaces, memberships, sessions (current-workspace), invites, groups, group
tool grants, user-group membership, permissions, and API keys. No module outside the
store implementations SHALL issue raw DynamoDB calls for these entities. Backends:
DynamoDB (mechanical wrap of today's code, retired at cutover), SQLite (local), and
DSQL — selected by the same runtime switch as the other stores.

#### Scenario: Call sites go through the interface

- **WHEN** the workspace sources are grepped for direct `dynamo()` usage
- **THEN** identity/authz entity access appears only inside the identity store's
  Dynamo backend implementation, and the full test suite passes against both the
  Dynamo and SQLite backends

### Requirement: Relational identity schema

The DSQL/SQLite identity schema SHALL be designed from scratch as normal relational
tables — `users`, `workspaces`, `memberships`, `user_sessions`, `invites`, `groups`,
`group_members`, `group_tool_grants`, `permissions`, `api_keys` — replacing composite
string keys (`workspaceId#groupId`, `SK`-prefix pointer rows) with real columns and
indexes (e.g. memberships indexed by user, invites by email+workspace, API-key lookup
by secret hash). Referential integrity SHALL be enforced at the application layer
(DSQL has no foreign keys); `GroupPrefixGrants` SHALL NOT be carried into the new
schema (deleted outright per decision record #8; its admin write surface is removed in
WS-6). The schema SHALL NOT model Profiles (WS-3 owns that table) but SHALL leave
group→profile membership expressible without altering these tables.

#### Scenario: Identity flows work on the relational backend

- **WHEN** the auth/membership/group/invite/permission test suites run against the
  SQLite identity backend (relational schema)
- **THEN** signup, workspace create, invite accept, membership role checks, group
  membership resolution, permission grant/check/revoke, and API-key verify all behave
  identically to the Dynamo backend

### Requirement: Credential and audit stores on DSQL, with credential ownership

`CredentialStoreDsql` and `AuditStoreDsql` SHALL implement the existing
`ICredentialStore`/`IAuditStore` interfaces on the same cluster. The credential schema
SHALL add the user dimension — `created_by` (user sub, required for new rows) — as
the column WS-3's Profiles schema references; existing rows reseed with a sentinel
owner. Audit rows SHALL be pruned by a periodic sweep implementing the existing
30-day retention (no native TTL in DSQL). KMS envelope encryption of credential
payloads is unchanged.

#### Scenario: Credential round-trip with ownership

- **WHEN** a credential is created through `ICredentialStore` on the DSQL backend
- **THEN** the record persists `created_by` = the creating user's sub, and
  list/get/resolve/delete round-trip identically to the other backends

#### Scenario: Audit retention on DSQL

- **WHEN** the audit sweep runs on a table containing entries older and newer than 30
  days
- **THEN** only the older entries are deleted, and `recent()` ordering/filtering
  matches the Dynamo backend's behaviour

### Requirement: Per-token auth resolution cache

The per-request auth resolution (verify token → current workspace → membership →
group ids: today three sequential store reads per request in
`middleware/auth.ts` `oidcPrincipal`) SHALL be cached in-process per (token, requested
workspace) with a short TTL (default 60s, configurable). Mutations that change the
answer (membership add/remove/role change, group membership change, current-workspace
switch) SHALL invalidate the affected entries synchronously in the same process; the
TTL bounds staleness across processes. A cache hit SHALL perform zero identity-store
reads. Token signature verification itself is unchanged (already in-memory).

#### Scenario: Repeat requests hit the cache

- **WHEN** the same bearer token makes 20 requests within the TTL with no identity
  mutations
- **THEN** the Sessions/Memberships/UserGroups (or relational equivalent) reads occur
  at most once, and every request gets the same principal

#### Scenario: Revocation takes effect

- **WHEN** a user's membership is removed and the same token issues a request in the
  same process
- **THEN** the request is rejected with the workspace-forbidden error immediately (no
  TTL wait)

#### Scenario: Workspace switch is not poisoned

- **WHEN** a token switches its `X-Aprovan-Workspace` header between two workspaces it
  belongs to
- **THEN** each request resolves the principal for the requested workspace (cache
  keyed per token+workspace, not per token alone)
