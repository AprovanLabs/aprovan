# Report: Purge dataScope residue (stream 5)

## What was built

Collapsed the retired `dataScope` manifest concept out of the apps wire
model and UI (tech-plan D10):

- Deleted `DataScope`, `AppSummary.dataScope` (+ parse),
  `CapabilityModel.dataScope`, and all `deriveCapabilities` /
  `mergeCapabilities` branches that read it. `dataLocation` and native
  reach `location` strings keep only the formerly-`"owner"` wording.
- Deleted `DataScopeBadge` and its Overview render site.
- Collapsed `dataLocationPath` / `DataLocationCallout` to the single
  owner-hosted path + tooltip/chip (no unreachable `"workspace"` branch).
- Reworded stale comments in `records.ts`, `workflows/runner.ts`, and
  `migrate-app-records.ts` so they describe tenancy without asserting a
  `dataScope` field exists.

## Verify

From the worktree
(`/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-f6-datascope-r2`):

```bash
pnpm --filter @aprovan/ui typecheck && pnpm --filter @aprovan/ui test && \
  pnpm --filter @aprovan/registry-ui typecheck && \
  pnpm --filter @aprovan/registry-ui build && \
  pnpm --filter @aprovan/registry-ui test
```

**Result:** all passed.

- `@aprovan/ui` typecheck: exit 0
- `@aprovan/ui` test: 2 files / 15 tests passed
- `@aprovan/registry-ui` typecheck: exit 0
- `@aprovan/registry-ui` build: exit 0
- `@aprovan/registry-ui` test: 8 files / 42 tests passed

### Two-repo grep gate (task 5.5)

```bash
# aprovan worktree
grep -rni "dataScope" --include='*.ts' --include='*.tsx' packages server client
# → no output (exit 1 = no matches)

# registry checkout
grep -rni "dataScope" --include='*.ts' --include='*.tsx' packages apps --exclude-dir=utdk
# → no output (exit 1 = no matches)
```

Registry used the `--exclude-dir=utdk` form per `briefs/deviations.md` §4
(generated-client false positives only). No real residue outside `utdk`.

## Deviations

1. **Re-export ripples outside declared Touches (required for Verify +
   grep gate).** Deleting `DataScope` from `@aprovan/ui/apps-store` left
   three barrel re-exports that would fail typecheck and the case-insensitive
   grep gate. Removed the type-only re-export line from each:
   - `packages/registry-ui/src/apps/wire.ts`
   - `packages/registry-ui/src/apps-panel.tsx`
   - `packages/registry-ui/src/workflows-panel.tsx`

   PRD Goal 2 already notes "dataScope purge ripples beyond the brief's
   line list"; the inventory missed these barrels. No behavior change —
   type re-exports only. Recommend updating Stream 5 `Touches` metadata
   if tasks.md is revised.

## Next wave

- F2/B hosted-vs-managed picker (D2) should get a **new** correctly-named
  surface when it ships — do not resurrect `dataScope`.
- No registry-repo follow-up for this stream.
