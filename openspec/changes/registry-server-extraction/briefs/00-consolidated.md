# Brief: registry-server-extraction — full implementation (streams 1–8)

## Mission
Build `@aprovan/registry-server` in the registry repo: the multi-tenant execution plane
extracted from `apps/workspace` — Profiles + credentials (with `created_by`), the dispatch
pipeline with the in-process provider executor (lazy-load + LRU), the QuickJS-WASM sandbox
runtime, pluggable auth adapters (OIDC/API-key/none), pluggable storage (SQLite/libSQL default),
attributed OTLP telemetry, the MCP surface, standalone boot, and the `aprovan/registry` Docker
image — then rewire `apps/workspace` to consume it and delete the superseded workspace code.
This is the architectural center of gravity of the platform refactor.

## Read first (under /Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/registry-server-extraction/)
1. `tech-plan.md` — 12 decisions, complete SQL schema, `RegistryServerOptions`/`RegistryServer`
   embedding contract, AuthAdapter, executor contract, frozen `__dispatch` envelope, HTTP
   surface, telemetry attributes. ALL FIXED — implement, don't redesign.
2. `tasks.md` — streams 1–8
3. `specs/*/spec.md` — seven capability specs; every scenario is an acceptance criterion
4. `prd.md`, `ux.md`
5. Handoff notes from completed changes:
   - `../contracts-and-catalog/briefs/00-report.md` — contracts are at `packages/contracts/*`,
     frozen 0.2.0; the catalog site imports `apps/workspace/src/llm.ts` at build time for llm
     compat — when you move/delete that file, update the catalog's import (one site).
   - `../metadata-and-cost/briefs/00-phase-a-report.md` — Phase A landed in apps/workspace
     (change journal, auth-cache, mounts cache, versioned writes). Rebase-aware: your worktree
     must branch from CURRENT main (all of purge/contracts/e2e/phase-A are merged).
   - `../purge-dead-code/briefs/01-report.md` — `@utdk/isolate` is gone; the direct executor
     in `apps/workspace/src/isolate.ts` is the starting point for your `ProviderExecutor`.
6. Source: `apps/workspace/src/{routes/tools.ts,credentials.ts,credentialCipher.ts,
   oauthTokens.ts,interfaces.ts,isolate.ts,toolCache.ts,service-kernel.ts,
   workflows/sandbox.ts,mcp/server.ts,middleware/auth.ts,runtime/config.ts}` and
   `packages/runtime/`.

## Tasks
Execute all 8 streams in dependency order: 1 first; then 2, 4, 5, 6 in parallel conceptually
(you work alone — do 2, then 4, 5, 6); then 3; then 7; then 8. Check tasks off in the main
checkout's tasks.md as you go.

## Acceptance criteria
Every scenario in the seven spec files. Each stream's Verify passes before moving on.

## Verify (final — stream 8's gate)
```
pnpm -r build && pnpm -r test
docker build -f docker/registry.Dockerfile -t aprovan/registry:dev .
./packages/registry-server/scripts/smoke-standalone.sh aprovan/registry:dev
```
(If Docker is unavailable on this machine, run every non-Docker verify, mark the image tasks
unchecked, and say so — do not fake the smoke test.)

## Git workflow
- Isolated worktree: `git -C /Users/jacob/Documents/Code/AprovanLabs/registry worktree add /private/tmp/claude-501/-Users-jacob-Documents-Code-AprovanLabs-aprovan/2300937b-9a5a-436a-9139-c2f3e7d66fb5/scratchpad/wt-registry-server -b registry-server-extraction origin/main` after `git fetch origin` — branch from CURRENT origin/main (post-merge-train). `pnpm install` first.
- Commit incrementally per stream with `git commit --no-gpg-sign`
  (messages end `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`).
- Run commands synchronously; never idle waiting on background shells.
- Push and open ONE PR via `gh pr create -R AprovanLabs/registry` (body ends
  "🤖 Generated with [Claude Code](https://claude.com/claude-code)"). Do NOT merge it.
- If any harness denial blocks you, leave work staged/committed, write your report, end.

## Constraints
- The interfaces in tech-plan.md are the contract. If one is unimplementable as written, stop
  that stream and report — do not redesign. Two frozen seams from sibling changes:
  credential `created_by` column semantics (metadata-and-cost coordinates on it) and
  contract packages pinned at 0.2.0.
- Deletions of superseded apps/workspace code happen ONLY in stream 8 after everything is
  green, and colon-syntax deletion requires the both-repo grep in the tasks.
- Do not touch openspec/ in your commits.

## Report back
Write `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/registry-server-extraction/briefs/00-report.md`
(main checkout, uncommitted): per-stream status, verify results, PR URL, deviations, and the
handoff notes WS-4 (product-plane-move) and WS-6 (data-auth-model) need — especially the final
package name/exports and anything that diverged from the embedding contract they assume.
