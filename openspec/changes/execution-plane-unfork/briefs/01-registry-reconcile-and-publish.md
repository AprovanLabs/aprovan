# Brief: Registry reconcile + publish gate (execution-plane-unfork streams 1–3)

## Mission
Make the registry repo the single installable source of the execution plane. Port the
fork's two registry-server deltas (`executorInstance` + monorepo-contracts fallback)
verbatim, scrub absolute `/Users/` docs paths, fix `publish.yml` so `utdk` and
`@aprovan/runtime` actually publish, clean workspace/lockfile hygiene, bump
`@aprovan/registry-server` to `0.1.1`, merge to registry `main`, run publish, and prove
clean-room `npm install` works. Streams 4 and 6 (aprovan unfork) are blocked until this
gate passes. When you are done, `utdk@0.1.0`, `@aprovan/runtime@0.1.0`, and
`@aprovan/registry-server@0.1.1` are on npm and a fresh registry clone is green.

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/execution-plane-unfork/prd.md`
2. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/execution-plane-unfork/tech-plan.md` (D1–D4, Rollout)
3. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/execution-plane-unfork/tasks.md` (streams 1–3)
4. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/execution-plane-unfork/specs/registry-publish-integrity/spec.md`
5. Fork sources to port verbatim:
   - `/Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/registry-server/src/config/types.ts`
   - `/Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/registry-server/src/server.ts`
   - `/Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/registry-server/src/catalog/default.ts`
6. Targets in registry:
   - `/Users/jacob/Documents/Code/AprovanLabs/registry/packages/registry-server/**`
   - `/Users/jacob/Documents/Code/AprovanLabs/registry/.github/workflows/publish.yml`
   - `/Users/jacob/Documents/Code/AprovanLabs/registry/pnpm-workspace.yaml`

## Tasks
Work streams **1**, **2**, and **3** from
`openspec/changes/execution-plane-unfork/tasks.md` (tasks 1.1–1.4, 2.1–2.4, 3.1–3.3).
Execute verbatim; check each off in that tasks.md as you complete it.

Owner decisions already settled (do not reopen):
- Port both fork deltas verbatim (not just `executorInstance`).
- Publish `@aprovan/runtime` rather than scope-creeping into playground deletion.
- Fix `publish.yml` is a hard gate before any aprovan fork deletion.
- Contingency if CI cannot publish `utdk`: manual publish from a clean checkout, then fix CI
  before closing (tech-plan D3).

## Acceptance criteria
All scenarios in `specs/registry-publish-integrity/spec.md`, including:

#### Scenario: Reconciled files match the fork's behavior
#### Scenario: Embedding host can share its executor
#### Scenario: Clean-room install
#### Scenario: utdk meta-package is on npm
#### Scenario: Runtime package available
#### Scenario: Repo grep is clean
#### Scenario: Tarball grep is clean
#### Scenario: Frozen install on a fresh clone
#### Scenario: No stale importers
#### Scenario: Fresh registry clone is green

(Copy full WHEN/THEN bodies from the spec file while implementing; they are the tests of done.)

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/registry-server build && pnpm --filter @aprovan/registry-server typecheck && pnpm --filter @aprovan/registry-server test
# after 1.1–1.4:
diff -q ../aprovan/packages/registry-server/src/server.ts packages/registry-server/src/server.ts
diff -q ../aprovan/packages/registry-server/src/config/types.ts packages/registry-server/src/config/types.ts
diff -q ../aprovan/packages/registry-server/src/catalog/default.ts packages/registry-server/src/catalog/default.ts
# after 2.*:
grep -rn "/Users/" packages/utdk --include=package.json | grep -v node_modules | grep -v /dist/ | wc -l | grep -qx 0
pnpm install --frozen-lockfile
pnpm --filter utdk exec npm pack --dry-run 2>&1 | grep -c "/Users/" | grep -qx 0
# after publish (3.*):
npm view utdk version
npm view @aprovan/runtime version
npm view @aprovan/registry-server version | grep -qx 0.1.1
T=$(mktemp -d) && cd $T && npm init -y >/dev/null && npm install @aprovan/registry-server@^0.1.1 @aprovan/runtime utdk && node -e "require.resolve('utdk/registry.json'); console.log('ok')"
```

## Git workflow
- Repo: `/Users/jacob/Documents/Code/AprovanLabs/registry`
- Branch from latest `origin/main`: `iw0/registry-reconcile-publish`
- Use an isolated worktree; do not commit unrelated local dirt.
- Sync with `main` before opening the PR (`git fetch && git rebase origin/main`).
- Open PR against `AprovanLabs/registry` `main`, merge when green, then trigger/confirm
  `publish.yml`. Deploy = publish to npm for this stream.
- Check off tasks in the **aprovan** tasks.md (leave that file uncommitted in aprovan, or
  include a note in the PR; write `briefs/01-report.md` in aprovan openspec path).

## Constraints
- Implement only what the tasks say; tech-plan interfaces/decisions are fixed — if one
  seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (karpathy-guidelines).
- Do not modify files outside stream Touches:
  - Stream 1: `registry/packages/registry-server/**`
  - Stream 2: `registry/packages/utdk/*/package.json`, `registry/pnpm-workspace.yaml`,
    `registry/pnpm-lock.yaml`, `registry/.github/workflows/publish.yml`
  - Stream 3: no source (CI + npm state)
- Do **not** start aprovan streams 4/6.
- Coordination: another agent may be editing `registry/packages/contracts/telemetry/**`
  and `registry/packages/utdk/datadog/telemetry/**` on a sibling branch. Do not touch those
  paths. If `pnpm-lock.yaml` conflicts on rebase, keep your importer hygiene changes and
  re-run `pnpm install`.

## Report back
When done: check off tasks 1.1–3.3 in `tasks.md`, write
`openspec/changes/execution-plane-unfork/briefs/01-report.md` with: what you built, verify
output, PR URL(s), published versions, deviations, and anything wave-2 (aprovan unfork /
standalone-creds / telemetry freeze) must know.
