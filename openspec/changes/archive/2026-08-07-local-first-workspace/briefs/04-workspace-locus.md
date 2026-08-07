# Brief: Workspace execution locus

## Mission
Add immutable `locus` / `dataDir` / `vfsRoot` to workspace records (default existing to `cloud`), refuse local-machine provider bindings in cloud workspaces, and refuse local workspace init without a cipher key provider.

## Read first
1. `openspec/changes/local-first-workspace/tech-plan.md` (D2)
2. `openspec/changes/local-first-workspace/specs/workspace-execution-locus/spec.md`
3. `openspec/changes/local-first-workspace/tasks.md` — section 4
4. `server/workspace/src/workspaces.ts`, `server/workspace/src/db/**`
5. KeyProvider / KeystoreCipher from `@aprovan/registry-server` (stream 3 must be published; bump dependency)

## Depends-on
Stream 3 (KeystoreCipher) published and bumped in workspace package.json.

## Tasks
Copy section 4 checkboxes from tasks.md verbatim.

## Verify
`pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/workspace check-types`

## Constraints
Touches: `server/workspace/src/workspaces.ts`, `server/workspace/src/db/**`, `server/workspace/src/__tests__/workspace-locus.test.ts`, and package.json for the registry-server bump only.
