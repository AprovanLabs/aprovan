# Brief: tools-addressing §2 — Publish alias in catalog

## Mission
`GET /tools/namespaces` returns `globalAlias` alongside canonical `name` so a client can
build the full `tools.` binding map from one catalog call without deriving aliases.

## Read first
1. `openspec/changes/tools-addressing/{prd,tech-plan,tasks}.md`
2. Tech-plan Interfaces (`globalAlias` on namespace entries; never stored)
3. registry `packages/registry-server/src/catalog/**`
4. registry `packages/registry-server/src/routes/tools.ts`
5. Confirm TA §1 merged: `ResolvedProviderName.globalAlias` exists

## Tasks
Copy §2 checkboxes from tasks.md verbatim.

## Acceptance criteria
**Done when** a client can build the full `tools.` binding map from one catalog call
without deriving aliases itself.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- catalog
```
Grep profiles/grants/credentials/dispatch — no writes of `globalAlias`.

## Constraints
- Depends-on: TA §1 merged to registry main
- Touches only: registry `packages/registry-server/src/catalog/**`,
  `packages/registry-server/src/routes/tools.ts` (+ tests)
- Branch `iw8/tools-addressing-02-catalog`; PR; report `briefs/02-report.md`
