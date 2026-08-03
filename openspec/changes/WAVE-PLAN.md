# Wave plan — improve-wave delegation

## Wave 1 (dispatched now — path-disjoint)

| Brief | Repo | Branch | Blocks |
|---|---|---|---|
| `execution-plane-unfork/briefs/01-…` | registry | `iw0/registry-reconcile-publish` | streams 4/6 unfork; standalone-creds publish; app-model profile-binding |
| `telemetry-contract-v2/briefs/01-…` | registry | `iw5/telemetry-contract-sdk-compat` | stream 4 freeze (after IW-0 or mirror) |
| `editor-direct-edit/briefs/01-…` | aprovan | `iw2/editor-foundations` | editor streams 4–7 |
| `presence-realtime/briefs/01-…` | aprovan | `iw6/realtime-transport` | presence 2/4/5 |
| `native-panel-polish/briefs/01-…` | aprovan | `iw4/playground-and-profiles` | panel streams 2+ |

### Known conflict surfaces (orchestrator owns merges)
- Registry `pnpm-lock.yaml` / `publish.yml`: IW-0 owns; IW-5 must not rewrite.
- `SessionBar.tsx`: editor stream 6 vs presence stream 4 — serialize later.
- `packages/registry-ui`: editor stream 2 vs native-panel 5/6 vs standalone-creds 3 — wave-order.
- `TelemetryPanel.tsx`: telemetry stream 7 vs native-panel stream 8 — serialize.
- `native-surfaces.tsx`: native-panel 1/2 vs app-model 5 — rebase carefully.

### Merge + deploy policy
1. Rebase onto `origin/main` before every PR and again before merge.
2. Merge green PRs immediately; do not batch.
3. After IW-0 registry merge: run `publish.yml`, confirm npm versions, then open aprovan unfork.
4. Production deploy: registry `registry-deploy.yml` only after standalone-creds; aprovan
   `web.yml` / `workspace-image.yml` on each aprovan main push that changes those surfaces.

## Wave 2 (gated)
- `execution-plane-unfork` streams 4–6 (after npm gate)
- `telemetry-contract-v2` streams 4–7 (4 prefers published package if IW-0 landed)
- `editor-direct-edit` streams 4–7
- `presence-realtime` streams 2, 4, 5
- `native-panel-polish` streams 2, 4–8 (9 waits on app-model)
- `app-model-split` streams 1–2, 4–5 ungated internally; 3 profile-binding needs IW-0
- `registry-standalone-credentials` streams 1–3 ungated on paths; 4+ need IW-0 publish
