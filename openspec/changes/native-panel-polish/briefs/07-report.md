# Brief 07 report — copy pass A (data & pipelines panels)

## PR
https://github.com/AprovanLabs/aprovan/pull/43

## Done
- Stream 7.1: KeyValuePanel — ux.md copy, `PanelErrorWithRetry`, `ArmedButton` delete,
  humanized empty/error/form messages; no `window.confirm`.
- Stream 7.2: SyncPanel — same pass; local confirm helper replaced with `ArmedButton`.
- Stream 7.3: SandboxesPanel — same pass across Environments/Console/Runs/Hosts;
  destroy/reset/cancel/revoke use `ArmedButton`; structure unchanged.
- Stream 7.4: InterfacesPanel — same pass; kept `def.label` titling; Clear/Remove armed;
  provider button labels de-engineered ("Choose/Change provider").

## Verify
| Check | Result |
| --- | --- |
| `! grep -n "confirm(" …/{KeyValue,Sync,Sandboxes}Panel.tsx` | pass |
| patchwork-web `tsc --noEmit` | pass |
| `vitest run src/lib/namespaces.test.ts` | pass (13) |
| patchwork-web `build` (`tsc && vite build`) | pass |

## Notes
- Touched only the four stream-7 panel files (+ this report / tasks checkoff).
- Stream 8 owns Notifications/Telemetry/Webhooks/Sessions.
