# PRD — iw9-f6-cleanup-rename

_Wave 0 stream F6 of IW-9 (openspec/changes/IW-9-APP-FIRST.md). All product
decisions are settled there; this PRD elaborates scope, not policy. F6 is the
one Wave-0 stream that spans both repos; per the Cross-repo coordination
rules, aprovan-side and registry-side work stay in separate work streams
(independent commits per repo, no publish, so no ordering constraints)._

## Problem

The vfs→vcs split left 22 VCS test failures on `main` (verified 2026-08-09:
`tests/vcs.test.ts` 7, `tests/vfs-mounts.test.ts` 6,
`tests/vcs-mount-lineage.test.ts` 4, `tests/vcs-interface.test.ts` 3,
`tests/chat-sessions.test.ts` 2 — exactly the brief's count; the run's other
59 failures belong to other owners, see Non-Goals). Migration residue misleads
both agents and humans: a retired `dataScope` concept still shapes wire types
and UI, two registry docs describe the pre-split model (banner-stamped but not
fixed), a tracked byte-identical duplicate CDK app sits at `infra/aws/aws/`,
and build residue survives in `registry/packages/utdk/infra/`. Three latent
bugs ship today: a false "creator-private" claim on unbundled workflows whose
scripts any member reads, workspace shares keyed on mutable `app.name` so a
rename silently breaks them, and a client commit-detail fetch that discards
the change data it fetched. Finally, the product is now **Aprovan Workspace**
(IW-9 Mission) but deploys to `aprovan.com/chat`.

## Users & Jobs

- **IW-9 Wave 1+ streams (iw9-a/b/c/d, chat, doc)** — hire F6 for a green VCS
  test baseline, residue-free grep results, and honest docs, so their own
  grep-gates and test runs signal only their work.
- **Agents working either repo** — hire AGENTS.md for the refactor rule
  (delete replaced code in the same change; grep-gate definition of done;
  husk test) so the duplicate-implementation failure mode stops recurring.
- **Workspace members** — hire shares that survive an app rename and honest
  visibility semantics for unbundled workflows.
- **End users** — reach the product at `aprovan.com/workspace`; old `/chat`
  links and bookmarks keep working via permanent redirect.

## Goals

1. The five F6-owned server test suites pass:
   `pnpm --filter @aprovan/workspace test` shows zero failures in
   `vcs.test.ts`, `vcs-mount-lineage.test.ts`, `vfs-mounts.test.ts`,
   `vcs-interface.test.ts`, `chat-sessions.test.ts` (quarantined mount-
   procedure tests are explicitly skipped with a pointer, not failing).
2. `grep -rn "dataScope"` (case-insensitive, `*.ts`/`*.tsx`, excluding
   node_modules/dist) returns nothing in **either** repo.
3. Husk scan (`git ls-files <dir> | wc -l` = 0 over workspace-glob dirs)
   returns zero rows in both repos; `registry/packages/utdk/infra/` and the
   tracked duplicate `aprovan/infra/aws/aws/` are gone.
4. No document in `registry/docs/` presents the pre-split app/workflow or
   VCS model as normative; the stale banners stamped 2026-08-09 are resolved
   (rewrite or archive), not left standing.
5. AGENTS.md in both repos states the refactor rule verbatim enough to be
   grep-able: same-change deletion, grep-gate done-definition, husk test.
6. Workspace shares grant by durable `appId`; renaming an app changes no
   share's effect (asserted by test). `fetchCommitDetail` returns the change
   data it fetches. The workflow "creator-private" claim is resolved per the
   decision in the tech-plan (drop the claim; listing filter documented as
   de-clutter, not access control).
7. `aprovan.com/workspace/` serves the app (asset prefix, PWA scope, OAuth
   callback, deploy pipeline all agree); any `/chat` or `/chat/*` request
   returns a permanent redirect to the `/workspace` equivalent.

## Non-Goals

- **No mounts revival.** `vcs/mounts.ts` procedures/UI are D19 work owned by
  `iw9-b-app-model`. F6 only repairs-or-quarantines the mount test files.
- **No VCS scoping work** — `prefix`/`ref` params, snapshot identity, wire
  hashes are F1 (`iw9-f1-vcs-scoping-params`). F6 does not edit
  `server/workspace/src/vcs/store.ts` or `native-dispatch.ts`.
- **No repair of the other 59 failing tests** (verified owners:
  `oauth-tokens.test.ts` → MIGRATION-DEBT §3/§5, blocked on the `^0.2.7` pin
  bump; `interfaces`, `sandboxes`, `get-client`, `telemetry`, `agent-run`,
  `agent-interface`, `sandbox-*`, `sync`, `profiles`, `live-apps`, `apps`
  suites → outside F6's brief; not touched).
- **No new privacy mechanism for workflow scripts** — the guarded-prefix
  option is rejected (tech-plan D-F6-1); real private execution artifacts
  arrive with F2's partitions and C's grants.
- **No app identity work** — `appId` already exists
  (`apps/store.ts:84`, name→appId alias `:370-374`); F6 re-keys shares on
  it but does not touch ULID/`app.yaml` (F4).
- **No marketing-site or non-`/chat` CloudFront behavior changes**; no
  registry npm publish (F6's registry work is docs/husks/AGENTS.md only).
- **No renaming of client code identifiers** (`ChatPage`, `features/chat/*`)
  — the `/chat` → `/workspace` rename is the URL/deploy surface only; code
  vocabulary is Wave-1 A/D territory.

## Capabilities

### New Capabilities

(Checked `openspec/specs/` — existing specs cover desktop/audio/gateway
surfaces only; none of these areas.)

- `workspace-base-path`: the web app's canonical base path is `/workspace`;
  `/chat` and `/chat/*` permanently redirect; PWA scope, OAuth redirect
  paths, and the deploy pipeline agree with the base.
- `app-share-identity`: workspace shares (`WorkspaceShare`) grant by durable
  app identity; app rename never changes what a share allows.
- `workflow-script-visibility`: unexported workflow registrations are a
  listing convenience, not an access boundary; no surface claims privacy for
  member-readable scripts.
- `commit-detail-fidelity`: the client commit-detail accessor exposes the
  change summary the server already returns.

### Modified Capabilities

None.

### Spec-less hygiene

Test repair, husk/duplicate deletion, `dataScope` purge, stale-doc
resolution, and AGENTS.md rules are behavior-preserving hygiene: they carry
grep-gate/test Verifies in tasks.md but no capability spec.

## Constraints & Assumptions

- **Cross-repo rules** (IW-9 "Cross-repo coordination"): every work stream is
  single-repo (`Repo: aprovan` or `Repo: registry`), `Touches` globs are
  repo-prefixed, deletions' grep-gates run in both repos, and F6 publishes
  nothing.
- **F1–F5 file ownership**: F6 does not touch `vcs/store.ts`,
  `native-dispatch.ts`, `credentials.ts`, `apps/identity.ts`,
  `realtime/broker.ts`. In shared files the footprint is confined to:
  `records.ts` doc-comment lines ~19-26 and `workflows/runner.ts` doc-comment
  lines ~73-77 (comment-only), and `apps/store.ts` `WorkspaceShare`/
  `shareAllows`/`appFsAllowed` (lines ~154-167, 473-500) — disjoint from
  F2's `partitionAccess` region (~276-310).
- **Verified deltas from the brief** (all re-checked against disk
  2026-08-09): (a) the 19 §B husks are already deleted (MIGRATION-DEBT §2
  DONE) — today's scan finds zero at the standard globs; the remaining
  residue is `registry/packages/utdk/infra/` (zero tracked files, only an
  empty `cdk.out`; the brief's "~6.7GB registry/infra/cdk.out" no longer
  exists — `registry/` has no `infra/` dir and totals 1.9G). (b) A
  **tracked** byte-identical duplicate CDK app exists at
  `aprovan/infra/aws/aws/` (19 files, artifact of rename `f00616f`
  `infra/aws-core → infra/aws`; nothing references it — verified against
  cdk.json/Makefile/package.json/tsconfig). (c) The stale banners on both
  registry docs are already stamped; F6 owns the fuller fix. (d) The `vcs`
  namespace exposes `commit/log/show/diff/branches/restore`
  (routes/tools.ts:270-380) and **no** mount/unmount procedures —
  `addMount`/`removeMount` have zero non-test callers (only
  `auth-cache.test.ts` imports them directly).
- **`vcs-interface.test.ts` failures are semantic, not renames**: the file
  tests the git-hosting `vcs` interface; the native workspace `vcs` binding
  now wins zero-config resolution, so its three failures need re-anchoring
  to the post-split resolution order, verified per-assertion at
  implementation time.
- **`dataScope` purge ripples beyond the brief's line list** (verified): the
  full inventory is `packages/ui/src/apps-store/wire.ts` (:370 type,
  :412-413, :519-520, :859, :953-1051 capability-model plumbing), its live
  readers `packages/registry-ui/src/apps/ui.tsx` + `app-detail.tsx`, stale
  comments in `records.ts`/`runner.ts`, and
  `server/workspace/scripts/migrate-app-records.ts` comments. The grep-gate
  covers all of them.
- Assumption: CI (`.github/workflows/web.yml`) needs only its comment
  updated — it delegates entirely to `scripts/deploy-web.sh`.
- Assumption: SSM parameters (`/aprovan/<env>/web/bucket`,
  `.../distribution-id`) are prefix-agnostic and need no rename (verified in
  `deploy-lib.sh`/`deploy-web.sh` — the `chat/` literal lives in the script
  and vite config, not in SSM).

## Open Questions

None. The two decisions the brief delegated ("decide per-file" on mount
tests; "guarded prefix or drop the privacy claim") are taken and argued in
the tech-plan (D-F6-2, D-F6-1), citing D19 and the "files are authored"
invariant.
