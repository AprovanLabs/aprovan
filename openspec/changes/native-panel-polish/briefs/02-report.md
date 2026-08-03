# Brief 02 report — panel conventions (shell primitives + registry copy)

## PR
https://github.com/AprovanLabs/aprovan/pull/37

## Done
- Stream 2.1: additive `PanelUnavailable` (calm capability-gap card) and `ArmedButton`
  (arm → confirm, 3s disarm) on `client/web/src/components/panels/shell.tsx`.
- Stream 2.2: rewrote the 11 non-`apps` `NATIVE_SURFACES` descriptions to ux.md tone
  (benefit-first, sentence case, no dotted identifiers). Preserved IW-1 `apps` entry.
- Stream 2.3: confirmed `NativePanelProps` / `PanelHostActions` contract freeze
  (no hunks touching those declarations).

## Verify
| Check | Result |
| --- | --- |
| `git grep -n "scope?: AppScope" …/shell.tsx` | pass |
| `! grep -E "description: .*[a-z]+\.[a-z]+\(|…\.run|…namespace" native-surfaces.tsx` | pass |
| contract-freeze diff filter → `0` | pass |
| patchwork-web `tsc --noEmit` | pass |
| patchwork-web `vite build` | pass |

## Notes for later streams
- **Stream 4 (agents):** adopt `ArmedButton`; do not change shell contracts.
- **Streams 5–6:** use `PanelUnavailable` for 501 profile-storage gaps.
- **Streams 7–8:** copy-pass panels should consume shell primitives already landed here.
