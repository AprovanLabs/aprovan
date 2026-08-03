# Brief: Apps pane conformance (stream 9)

## Mission
Confirm IW-1 `apps` surface is registered; apply panel conventions (shell primitives,
four states, ux.md copy) to `AppsPanel` without regressing app-model behavior.

## Gate
Stream 2 merged. IW-1 app-model-split complete (`apps` in NATIVE_SURFACES, AppsPanel exists).

## Read first
1. `briefs/02-report.md`, IW-1 `app-model-split/briefs/05-report.md` if present
2. `tasks.md` stream 9 (9.1–9.2)
3. Specs: `panel-conventions`, apps-native-surface (IW-1)
4. `AppsPanel.tsx`, `native-surfaces.tsx`, `shell.tsx`

## Tasks
9.1–9.2 verbatim.

## Verify
```bash
git grep -q '"apps"' client/web/src/lib/native-surfaces.tsx
pnpm --filter @aprovan/patchwork-web typecheck
pnpm --filter @aprovan/patchwork-web build
```

## Git
`/tmp/iw4-apps-conformance` branch `iw4/apps-conformance`. No `move_agent_to_root`.

## Constraints
Touches AppsPanel (+ minimal native-surfaces copy if required). Do not reopen IW-1 model.

## Report back
Check off tasks, merge PR, `briefs/09-report.md`. Return merged PR URL.
