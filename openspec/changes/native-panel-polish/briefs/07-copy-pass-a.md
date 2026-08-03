# Brief: Copy pass A — data & pipelines panels (stream 7)

## Mission
Apply ux.md tone/density/empty-error states to KeyValue, Sync, Sandboxes, Interfaces
panels. Keep structure; restyle copy. Use shell primitives where destructive actions need
`ArmedButton`.

## Gate
Stream 2 merged (#37).

## Read first
1. `briefs/02-report.md`, `ux.md` for Data/Sync/Sandboxes/Interfaces
2. `tasks.md` stream 7 (7.1–7.4)
3. Spec: `panel-conventions`
4. Existing panel files listed in Touches

## Tasks
7.1–7.4 verbatim.

## Verify
```bash
pnpm --filter @aprovan/patchwork-web typecheck
pnpm --filter @aprovan/patchwork-web build
```

## Git
`/tmp/iw4-copy-pass-a` branch `iw4/copy-pass-a`. No `move_agent_to_root`.

## Constraints
Touches only the four panel files in stream 7. No Telemetry/Sessions (stream 8).

## Report back
Check off tasks, merge PR, `briefs/07-report.md`. Return merged PR URL.
