# Brief: tools-addressing §5 — Lazy type acquisition by alias

## Mission
Editor `.d.ts` fetches are keyed by scanned alias, resolved to canonical name via the
catalog (`globalAlias` from §2). Scan misses are cache misses, not errors. A script
touching two namespaces fetches exactly two type bundles.

## Read first
1. `openspec/changes/tools-addressing/{prd,tech-plan,tasks}.md`
2. Tech-plan D3
3. aprovan `packages/editor/src/ts/**` and `__tests__`
4. Catalog namespaces now expose `globalAlias` (registry #130)

## Tasks
- [ ] 5.1 Key `.d.ts` fetches by scanned alias, resolved to canonical name through the
      catalog from 2.1. Do not eagerly load the catalog's type surface.
- [ ] 5.2 Treat a scan miss as a cache miss, not an error — the scan is a hint (D3), and
      dynamic access legitimately produces incomplete lists.
- [ ] 5.3 Test that a script touching two namespaces fetches exactly two type bundles.

## Acceptance criteria
**Done when** opening a script fetches types only for the namespaces it references, and
an unresolvable reference degrades to no types rather than a broken editor.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/aprovan
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/editor test -- type-environment
```

## Constraints
- Depends-on: §2 and §4 (both merged)
- Touches: aprovan `packages/editor/src/ts/**`, `__tests__`
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw8-ta05`
- Branch `iw8/tools-addressing-05-types`; report `briefs/05-report.md`; do NOT merge
