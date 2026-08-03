# Brief 04 report — Agents pane rebuild

## PR
(pending — filled after merge)

## Done
- Stream 4.1: decomposed `AgentsPanel.tsx` into `panels/agents/{index,ProfileList,
  ProfileDetail,ProfileEditor,Executions}` (+ `types`, `draft`, `payload`, `utils`).
  Data ownership (usePanelData, merge/normalize, poll timers, dispatch) stays in `index`;
  children are presentation-only. `AgentsPanel.tsx` re-exports. Ported `handleSave`
  normalization to `buildSavePayload` with unit tests for create/update/clear shapes
  before restyling.
- Stream 4.2: compact two-line profile list (display name, model chip, prompt preview);
  click-through detail with humanized config, recent executions for that agent, Edit +
  `ArmedButton` delete.
- Stream 4.3: sectioned editor (Basics / Model / Instructions / Access / Files); name +
  instructions required/prominent; Model picks LLM bindings from `interfaces.list` with
  free-text fallback; Access intro per ux.md; inline per-section validation.
- Stream 4.4: Executions keeps merged agent+sandbox listing, in-progress/history groups,
  filter chips, expand drill-down, poll-while-visible + elapsed tick; workflow-attributed
  missing detail copy humanized.

## Verify
| Check | Result |
| --- | --- |
| `vitest run src/components/panels/agents` | pass (5) |
| patchwork-web `tsc --noEmit` | pass |
| patchwork-web `vite build` | pass |

## Notes
- Wire surface unchanged: `agents` list/create/update/delete/runs/getRun + `sandboxes.runs`.
- Shell contracts untouched; adopts `ArmedButton` and `PanelErrorWithRetry`.
