# Brief 05 report — Credential profiles UI (stream 5)

## PR
https://github.com/AprovanLabs/aprovan/pull/46

## Done
- Stream 5.1: `credentials/ProfilesSection` + `ProfileForm` in `@aprovan/registry-ui`
  (workspace `/profiles` CRUD via injected `GatewayClient`); `isUnavailable()` 501
  detector; additive package exports.
- Stream 5.2: CredentialManager copy pass + revoke moved to armed confirm (no
  `window.confirm` in credentials UI).
- Stream 5.3: `CredentialsPanel` composes Credentials | Profiles tabs; thin wiring
  (client, OAuth redirect, prefill, session role → `canManage`); Profiles tab uses
  shell `PanelUnavailable` via `renderUnavailable` on 501. Panel stays under 120 LOC.
- Stream 5.4: Unit tests — member read-only list, admin create round-trip (no payload
  leak), 501 → unavailable card / `isUnavailable`.

## Verify
| Check | Result |
| --- | --- |
| `pnpm --filter @aprovan/registry-ui build` | pass |
| `pnpm --filter @aprovan/registry-ui test` | pass (36) |
| `! grep confirm( …/credentials --include="*.tsx"` | pass |
| `wc -l CredentialsPanel.tsx` | 76 (&lt; 120) |
| `pnpm --filter @aprovan/patchwork-web build` | pass |

## Notes
- Admin panel `ProfilesSection` (legacy grants UI under `admin/`) is untouched — stream 6.
- Workspace profile API uses flat `targetKind`/`targetId` wire (not nested `target`).
