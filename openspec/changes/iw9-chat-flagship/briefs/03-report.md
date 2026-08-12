# Stream 3 report — CF-2 instance-targeted guest invites

**PR:** https://github.com/AprovanLabs/aprovan/pull/231  
**Branch:** `feat/iw9-chat-cf2-invites`  
**Base:** `origin/main`

## Built

| Path | Role |
|---|---|
| `server/workspace/src/identity/types.ts` | `InviteTarget` + optional `InviteRecord.target`; `create(..., target?)` |
| `server/workspace/src/identity/sql.ts` | Persist `target` JSON column (+ additive ALTER); expired consume throws |
| `server/workspace/src/identity/dynamo.ts` | Same `create`/`consume` contract (interface parity) |
| `server/workspace/src/db/dsql-schema.sql` | `invites.target` column |
| `server/workspace/src/invites.ts` | Facade: optional `target`; `consumeInvite(token, userId?)` mints F2 participant when targeted; `InviteConsumeError` |
| `server/workspace/src/routes/invites.ts` | Accept optional `target` on create; accept path skips membership when targeted |
| `server/workspace/tests/invites-app-instance-target.test.ts` | Guest mint / expired / consumed / revoke |
| `server/workspace/tests/invites.test.ts` | Non-targeted regression gate (was missing on main) |

`identity/store.ts` unchanged — factory already forwards the interface.

## Verified

```bash
pnpm --filter @aprovan/workspace exec vitest run \
  tests/invites-app-instance-target.test.ts tests/invites.test.ts
# ✓ 5 passed

pnpm --filter @aprovan/workspace typecheck
# exit 0

pnpm --filter @aprovan/workspace exec vitest run tests/identity-relational.test.ts
# ✓ 10 passed (invite create/consume/revoke still green)
```

## Tasks

| Task | Status |
|---|---|
| 3.1 `InviteRecord.target` | done |
| 3.2 create + consume → F2 participant | done |
| 3.3 routes accept optional target | done |
| 3.4 targeted + regression tests | done |

## Deviations

See `briefs/deviations.md` (stream 3). Headline:

1. **Persistence lives in `identity/sql.ts` (+ dynamo / dsql-schema), not `store.ts`** — brief Touches listed the factory; backends required the column.
2. **F2 `participants` remain `string[]`** — `addParticipant` has no role/channelIds args; invite carries `role: "guest"` + `channelIds` for Chat; consume calls `addParticipant(workspaceId, target.installId, userId, …)` treating `installId` as the F2 **instanceId**.
3. **`tests/invites.test.ts` did not exist** — added as the absent-target regression gate the verify command requires.
