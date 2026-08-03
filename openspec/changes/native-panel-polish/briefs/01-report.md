# Brief 01 report — playground removal + workspace profile CRUD

## PR
https://github.com/AprovanLabs/aprovan/pull/TBD

## Done
- Stream 1: removed `playground` native surface, `PlaygroundPanel.tsx`, `lib/playground.ts`,
  and playground-only deps (`sucrase`, `@aprovan/runtime` from patchwork-web). Stale/unknown
  `native://` tabs render `UnknownNativeSurface` (playground → catalog link + Close tab).
- Stream 3: moved `/profiles` into `routes/profiles.ts` with full CRUD over
  `ProfileService` (`GET` member; `POST`/`PATCH`/`DELETE` admin), `profileGrantsAvailable`
  501 gating, `ProfileWire` + `credentialLabel`, no credential payload leakage.
  `/groups/:id/profiles` unchanged.

## Verify
| Check | Result |
| --- | --- |
| `! git grep -q "PlaygroundPanel\|lib/playground" -- client/web/src` | pass |
| patchwork-web `tsc --noEmit` | pass |
| patchwork-web `vite build` | pass |
| `vitest run src/features/tabs` | pass (3) |
| workspace `tsc --noEmit` | pass |
| `vitest run tests/profiles.test.ts tests/groups-profiles.test.ts` | pass (9) |
| full workspace `vitest run` | 488 pass; 2 pre-existing sandbox machine-credential failures also on `main` |

## Notes for later streams
- **Stream 2 (shell primitives):** `NativePanelProps` / `PanelHostActions` untouched here.
  Stale-tab notice is local to `features/tabs/` — consider aligning copy/layout with
  `PanelUnavailable` once it lands.
- **Stream 4 (agents):** no AgentsPanel edits; wire surface frozen as required.
- **Stream 5 (credentials UI):** consume `GET/POST/PATCH/DELETE /profiles` + `ProfileWire`;
  use `credentialLabel` for list rows; map 501 via `isUnavailable`.
- **Stream 6 (admin group profiles):** attach picker should read `ProfileWire`
  (`targetKind`/`targetId`/`provider`) rather than the old nested `target` summary;
  `/groups/:id/profiles` still returns `GroupProfileSummary`.
