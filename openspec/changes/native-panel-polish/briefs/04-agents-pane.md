# Brief: Agents pane rebuild (stream 4)

## Mission
Decompose AgentsPanel into `panels/agents/*` (presentation children; data in index),
preserve dispatch-chain payload shapes with tests first, then restyle list/detail/editor/
executions per ux.md using shell primitives (`ArmedButton`).

## Gate
Stream 2 merged (#37 / #38). Shell has `PanelUnavailable` + `ArmedButton`.

## Read first
1. `briefs/02-report.md`, `ux.md` Agents, `tech-plan.md` D3
2. `tasks.md` stream 4 (4.1–4.4)
3. Spec: `agents-pane`
4. Existing: `components/panels/AgentsPanel.tsx`, `components/panels/shell.tsx`

## Tasks
4.1–4.4 verbatim. Port `handleSave` normalization BEFORE restyling; unit-test payloads.

## Verify
```bash
pnpm --filter @aprovan/patchwork-web exec vitest run src/components/panels/agents
pnpm --filter @aprovan/patchwork-web typecheck
pnpm --filter @aprovan/patchwork-web build
```

## Git
`/tmp/iw4-agents-pane` branch `iw4/agents-pane`. No `move_agent_to_root`. Rebase + merge.

## Constraints
Touches stream 4 globs only. Do not edit Credentials/Admin/other panels.

## Report back
Check off tasks, merge PR, `briefs/04-report.md`. Return merged PR URL.
