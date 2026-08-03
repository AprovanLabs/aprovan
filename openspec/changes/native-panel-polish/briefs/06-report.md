# Brief 06 report — Admin panel rework + group profiles (stream 6)

## PR
https://github.com/AprovanLabs/aprovan/pull/55

## Done
- Stream 6.1: `admin/api.ts` group-profile clients — `listWorkspaceProfiles`,
  `listGroupProfiles`, `attachGroupProfile`, `detachGroupProfile` — plus
  `GroupProfileSummary` / `ProfileWire` types.
- Stream 6.2: Group detail **Profiles** section (`GroupProfilesSection`): attached
  list (name/target/credential label), attach picker from `GET /profiles`,
  idempotent attach, armed detach; 501 → unavailable card (attach hidden).
- Stream 6.3: AdminPanel rework — Members / Groups / **Access** tabs, dense tables,
  master-detail groups (People + Profiles), armed destructive actions everywhere,
  conventions not-authorized card; props `{ client }` unchanged. No `confirm()` in
  admin TSX.
- Stream 6.4: Unit tests — attach/detach round-trip, 501 surface, armed revoke labels.

## Verify
| Check | Result |
| --- | --- |
| `pnpm --filter @aprovan/registry-ui build` | pass |
| `pnpm --filter @aprovan/registry-ui test` | pass (42) |
| `! grep confirm( …/admin --include="*.tsx"` | pass |
| `pnpm --filter @aprovan/patchwork-web build` | pass |

## Notes
- Did not edit `packages/registry-ui/src/credentials/**` or package `index.tsx`.
- Standalone admin `ProfilesSection` / `ApiKeysSection` also moved off `confirm()` to
  `ArmedButton` so the stream-wide grep stays clean.
