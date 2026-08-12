# Stream 3 report — resource grants storage / matcher / dispatch

**Registry PR:** https://github.com/AprovanLabs/registry/pull/164  
**Verify:** `pnpm --filter @aprovan/registry-server test -- resource-grants` → 10 passed

## Exported API (streams 5 / 6 / 8 pin against)

From `@aprovan/registry-server`:

| Export | Role |
| --- | --- |
| `ResourceGrantRow` | Row shape (`id`, `tenantId`, `subject{kind,id}`, `capability`, `resourcePattern`, `credentialLevel`, `grantedBy`, `createdAt`, `revokedAt?`) |
| `ResourceGrantSubject` / `ResourceGrantSubjectKind` | `user` \| `group` \| `app-install` |
| `ResourceGrantStore` / `ResourceGrantCreateInput` | CRUD + `listForSubjects` |
| `RegistryStorage.resourceGrants` | Facade field (sqlite/dsql + dynamo) |
| `matchesResourcePattern(pattern, resource)` | Pure URL-style matcher |
| `assertResourceAccess` / `resourceGrantSubjects` | Shared predicate extension (grant-enforcement family) |

## Matcher edge cases discovered

- Whole-segment wildcards only (`*` / `**` / trailing `*`); no partial-segment match (spec scenario covered).
- Host compare is case-insensitive; scheme must match.
- Inline wildcards inside a segment (e.g. `mailto:*@aprovan.com`) do **not** match under segment rules — store the pattern as data today; stream 8 may need a mailto-aware grammar if product grants use that shape.

## Deviations

- `server.ts` is outside stream 3 Touches, so `createRegistryServer` does not yet inject `storage.resourceGrants` into `DispatcherDeps`. Tests / embedders inject the store; a one-liner wire-up should land with publish stream 5 (or a tiny follow-up).
