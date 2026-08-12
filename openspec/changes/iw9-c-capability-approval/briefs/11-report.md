# Report: stream 11 — derived authority

**Status:** done  
**PR:** (filled after open)  
**Branch:** `feat/iw9-c-derived-authority`  
**Base:** `origin/main` @ stream 8 `#242`

## What landed

| Task | Result |
|------|--------|
| 11.1 | `derived-authority.ts` — standing automations store `ownerId` only; `resolveAutomationDispatch` builds a live principal and calls `evaluateDispatch` |
| 11.2 | `onMembershipDeparture` deactivates with reason `"owner departed"`, stops user-level credential grant resolution; `reassignAutomation` is admin-only and re-derives under the new owner |
| 11.3 | `onGrantRevoked` / `onCredentialRevoked` → `invalidateToolListCache` via setter wired in `routes/tools.ts`; credential store `delete` hooks the cascade |
| 11.4 | `tests/derived-authority.test.ts` — 5 cases covering narrow-after-save, departure, reassign, grant/credential revoke |

## Reassign API (for review surface / admin UX)

```ts
reassignAutomation({
  workspaceId: string;
  automationId: string;
  newOwnerId: string;
  actor: Principal; // must be admin in the same workspace
}): StandingAutomationRecord
```

Returns an **active** record owned by `newOwnerId` with no inherited grants.
List deactivated rows via `listStandingAutomations(ws, { status: "deactivated" })`
(`deactivationReason: "owner departed"`).

Also exported for wiring:

- `onMembershipDeparture(workspaceId, userId)` — call from membership remove
- `resolveAutomationDispatch(...)` — call from cron / workflow / agent-profile run paths
- `onGrantRevoked(workspaceId)` — call from resource-grant revoke paths
- `canRunStandingAutomation` / `userLevelCredentialGrantsResolvable` — gates

## Verify

```text
pnpm --filter @aprovan/workspace test -- derived-authority
→ 5 passed
```

## Deviations / carryovers

1. **In-memory automation registry** — standing records live in
   `derived-authority.ts` (not yet persisted into `workflows/store` /
   agents). Persistence + cron-tick wiring are out of Touches; API is ready
   for review-surface / runner follow-up.
2. **`removeMember` not patched** — `onMembershipDeparture` is exported;
   memberships.ts is outside Touches (parallel-safe with stream 9). Wire in
   a follow-up or stream 12/14.
3. **Grant-revoke call sites** — resource-grant revoke routes are outside
   Touches; callers should invoke `onGrantRevoked(workspaceId)`. Credential
   store delete is hooked.
4. **Tool-list “granted” visibility** — cache invalidation is wired; grant-
   visibility filtering in the tool list itself remains iw9-a / later C UI
   work. Tests assert invalidator invocation + out-of-grant dispatch.
5. **Agents draft / never self-provision** (spec requirement) — not in tasks
   11.1–11.4; left for review-surface / capability-approval streams.

## Unblocks

Stream 12 (review surface can list deactivated automations + Reassign) and
runner wiring that calls `resolveAutomationDispatch` / `canRunStandingAutomation`.
