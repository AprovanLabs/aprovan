# Stream 3 report: registry-ui admin capabilities

## Status
**DONE** — merged via PR linked below.

## Built
- `AdminPanelProps.capabilities?` defaults to `["members","groups","permissions"]`; tabs render strictly from the list (no endpoint probing).
- Standalone sections: `ApiKeysSection` (mint one-time plaintext + revoke), `ProfilesSection` (CRUD + grants; 501 → storage-backend notice), `AuditSection` (paged read-only).
- Admin access probe follows the capability set (`/members` hosted, `/api-keys` standalone) so standalone never hits `/members` or `/groups`.

## Verified
```bash
pnpm --filter @aprovan/registry-ui typecheck   # pass
pnpm --filter @aprovan/registry-ui test        # pass (17 tests)
```

## Files touched
- `packages/registry-ui/src/admin/**` (AdminPanel, capabilities, ApiKeys/Profiles/Audit sections, api/types, tests)
- `packages/registry-ui/src/index.tsx` (re-exports)
- `openspec/changes/registry-standalone-credentials/tasks.md` (3.1–3.5 checked)

## Deviations
None. Did not touch `credentials/**`.

## Branch / PR
- Branch: `iw3/registry-ui-admin`
- PR: (filled after create)
