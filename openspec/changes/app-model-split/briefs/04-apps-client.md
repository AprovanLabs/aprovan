# Brief: App-model client packages (stream 4)

## Mission
Wire id/lineage/requires into apps-store; rebuild registry-ui apps pane (grouped list,
detail with dependencies/install settings, directory + install sheet); delete Personal
synthesis. Buildable against tech-plan wire contract; integration in stream 6.

## Read first
1. `briefs/01-report.md`, `02-report.md` (#28, #31 landed)
2. `tech-plan.md` Interfaces (wire shapes)
3. `tasks.md` stream 4
4. Specs: `apps-native-surface`, `per-user-space` client grep gates
5. `packages/ui/src/apps-store/**`, `packages/registry-ui/src/apps-panel.tsx`

## Tasks
4.1–4.5 verbatim.

## Verify
```
pnpm --dir packages/ui typecheck
pnpm --dir packages/registry-ui typecheck && pnpm --dir packages/registry-ui test
! grep -rn "PERSONAL_APP_NAME\|personalApp\|builtin" packages/ui/src/apps-store packages/registry-ui/src
```

## Git
`/tmp/iw1-apps-client` branch `iw1/apps-client` from latest origin/main. PR+merge.

## Constraints
Touches stream 4 globs only. Path conflict: standalone-creds may have touched
registry-ui admin — rebase carefully; do not revert admin capabilities.
