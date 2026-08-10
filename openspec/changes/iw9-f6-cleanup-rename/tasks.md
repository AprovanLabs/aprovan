# Tasks — iw9-f6-cleanup-rename

All twelve streams are mutually independent (`Depends-on: -`) and touch
disjoint paths — parallelizable to independent agents with no shared
conversational context. Nine streams are `Repo: aprovan`, three are
`Repo: registry`. See tech-plan.md "Rollout" for the one real *deploy-order*
note (streams 8 and 9 should deploy together, even though their code review
is independent).

## 1. Repair the mechanical vfs→vcs test renames

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/tests/vcs.test.ts, aprovan/server/workspace/tests/chat-sessions.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/vcs.test.ts tests/chat-sessions.test.ts

- [x] 1.1 In `tests/vcs.test.ts`, rename every `call("vfs/commit"|"vfs/log"|"vfs/diff"|"vfs/show"|"vfs/restore"|"vfs/branches", ...)`
      to the `vcs/` equivalent (tech-plan D1). Leave `call("vfs/read", ...)`
      and `call("vfs/list", ...)` untouched — those are genuine `vfs`
      operations and already pass.
- [x] 1.2 In `tests/chat-sessions.test.ts`, rename the two `call("vfs/log", ...)`
      calls (lines 81, 177) to `call("vcs/log", ...)`. Leave the
      `call("vfs/list", ...)` call untouched.
- [x] 1.3 Grep gate: `grep -nE 'call\("vfs/(commit|log|diff|show|restore|branches)"' server/workspace/tests/vcs.test.ts server/workspace/tests/chat-sessions.test.ts`
      returns nothing.

## 2. Repair mount-lineage fixtures; quarantine the mount-CRUD test

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/tests/vcs-mount-lineage.test.ts, aprovan/server/workspace/tests/vfs-mounts.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/vcs-mount-lineage.test.ts tests/vfs-mounts.test.ts

- [x] 2.1 In `tests/vcs-mount-lineage.test.ts`, replace the `call("vfs/mount", {...})`
      and `call("vfs/unmount", {...})` fixture-setup calls (lines 140, 208,
      and any `unmount` call) with direct calls to `addMount(workspaceId,
      ...)` / `removeMount(workspaceId, ...)`, imported from
      `../src/vcs/mounts.js` (already imported for `collectMountLineage`/
      `resetMountsCache` at line 20) — `workspaceId` is `"local"`, matching
      every other call in the file. Match `addMount`'s current parameter
      order/shape exactly (tech-plan D2; this is a fixture-setup change
      only, no assertions on commit/snapshot output move).
- [x] 2.2 Confirm every remaining assertion in `vcs-mount-lineage.test.ts`
      (git SHA + provenance recording, forced-new-snapshot-on-upstream-
      movement, short-circuit-when-nothing-moved, pre-lineage JSON parsing)
      passes unmodified — they exercise `collectMountLineage`/`commitTree`
      directly and don't depend on the tool-call rename.
- [x] 2.3 In `tests/vfs-mounts.test.ts`, wrap the top-level
      `describe("vfs mounts", ...)` in `describe.skip(...)` and add a
      comment immediately above naming the un-skip condition verbatim:
      "Quarantined — no tool-level mount CRUD surface exists
      (`addMount`/`removeMount` have zero non-test callers). Un-skip and
      rename `vfs/mount|mounts|unmount` to whatever verb
      `iw9-b-app-model`'s mounts revival (D19) lands." Do not delete the
      file or rewrite its assertions — it is a ready-made spec for that
      stream (tech-plan D2).
- [x] 2.4 Grep gate: `grep -n 'describe.skip' server/workspace/tests/vfs-mounts.test.ts`
      is non-empty; `pnpm --filter @aprovan/workspace test -- tests/vfs-mounts.test.ts`
      reports 0 failed (all skipped, none red).

## 3. Fix the vcs-interface resolution-order collision

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/interfaces.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/vcs-interface.test.ts

- [ ] 3.1 In `interfaces.ts`, locate the compat-resolution logic
      `resolveInterfaceForWorkspace` uses to pick a zero-config default among
      an interface's `compat` entries. Confirm (via the failing assertions in
      `tests/vcs-interface.test.ts:109,142,151`) that the `vcs` interface's
      `credentialless: true` `{provider: "aprovan", module: "aprovan"}` entry
      currently wins zero-config resolution unconditionally, pre-empting
      both "no credential → reject" and "credentialed github → route to
      github" (tech-plan D3).
- [ ] 3.2 Change resolution so the native `aprovan` compat entry does not
      win the *generic* catalog path (`resolveInterfaceForWorkspace`/
      `dispatchInterface`) used by third-party git-hosting dispatch — the
      native path already has its own explicit short-circuit at
      `routes/tools.ts:478-488` (`if (resolved.compat.provider === "aprovan")
      return nativeVcsDiscoveryEntries(...)`), which does not need the
      generic resolver to also answer for it. Do not edit `routes/tools.ts`
      (F1-owned region) — the fix is confined to `interfaces.ts`'s
      resolution-order logic.
- [ ] 3.3 Verify all three `vcs-interface.test.ts` assertions pass:
      "zero-configs to github once a github credential exists" (rejects with
      no credential), "reaches the github/vcs adapter with the workspace's
      github credential" (routes to github once bound), "refuses a bitbucket
      binding with the reason, not a module-loader error" (200 + reason, not
      404).
- [ ] 3.4 Regression check: run the full suite and confirm no other
      interface's resolution (`llm`, `telemetry`, `agent`, `events`,
      `keyvalue`) changes behavior — `pnpm --filter @aprovan/workspace test`
      shows the same pass/fail set for every non-F6-owned suite as the
      pre-change baseline (81 failures across the 13 suites named in the
      PRD's Non-Goals), modulo this stream's own three fixes.

## 4. Delete the tracked infra/aws/aws duplicate

> Depends-on: - | Repo: aprovan | Touches: aprovan/infra/aws/aws/** | Verify: pnpm --filter @aprovan/infra typecheck && pnpm --filter @aprovan/infra synth

- [x] 4.1 Confirm zero references before deleting:
      `grep -rn "aws/aws" infra/aws/cdk.json infra/aws/Makefile infra/aws/package.json infra/aws/tsconfig.json`
      returns nothing, and no `.ts` file under `infra/aws/src` imports from
      `./aws/...` (tech-plan D6, already verified 2026-08-09; re-verify at
      implementation time in case it drifted).
- [x] 4.2 `git rm -r infra/aws/aws` (a normal tracked deletion — not a husk
      scan; it produces a real diff).
- [x] 4.3 Verify the CDK app still typechecks and synthesizes cleanly with
      the directory gone (Verify command above).
- [x] 4.4 Grep gate in both repos: `grep -rn "infra/aws/aws" .` (excluding
      `.git`) returns nothing in either `aprovan` or `registry`.

## 5. Purge dataScope residue

> Depends-on: - | Repo: aprovan | Touches: aprovan/packages/ui/src/apps-store/wire.ts, aprovan/packages/ui/src/apps-store/index.ts, aprovan/packages/registry-ui/src/apps/ui.tsx, aprovan/packages/registry-ui/src/apps/app-detail.tsx, aprovan/server/workspace/src/records.ts, aprovan/server/workspace/src/workflows/runner.ts, aprovan/server/workspace/scripts/migrate-app-records.ts | Verify: pnpm --filter @aprovan/ui typecheck && pnpm --filter @aprovan/ui test && pnpm --filter @aprovan/registry-ui typecheck && pnpm --filter @aprovan/registry-ui build && pnpm --filter @aprovan/registry-ui test

- [ ] 5.1 `packages/ui/src/apps-store/wire.ts`: delete the `DataScope` type
      (line 370), the `dataScope?: DataScope` field on `AppSummary`
      (lines 412-413) and its parse block (lines 519-520), the
      `dataScope: DataScope` field on `CapabilityModel` (line 859), the
      local `dataScope` derivation and every branch that reads it in
      `deriveCapabilities` (lines 953, 956, 992, 1025 — collapse
      `dataLocation`'s two-branch string to the single formerly-`"owner"`
      wording), and the `dataScope` merge block in `mergeCapabilities`
      (lines 1050-1051). Do not leave a `scope === "workspace"` branch that
      can no longer be reached (tech-plan D10).
- [ ] 5.2 `packages/registry-ui/src/apps/ui.tsx`: delete `DataScopeBadge`
      (its only purpose was rendering the now-removed field).
- [ ] 5.3 `packages/registry-ui/src/apps/app-detail.tsx`: remove the
      `<DataScopeBadge app={app} />` render call (line 195) and its now-dead
      import; collapse `dataLocationPath`/`DataLocationCallout`'s
      `model.dataScope === "workspace"` branches to the single remaining
      explanation (owner-hosted), keeping the tooltip/title wording
      substantively intact.
- [ ] 5.4 Fix the stale comments (no functional change): `records.ts:20`
      ("an app's `dataScope`" → describe tenancy resolution without the
      retired term), `workflows/runner.ts:73-77`'s `scriptWorkspaceId` doc
      comment, `scripts/migrate-app-records.ts:26-32`'s caveat block —
      reword each to describe current behavior without asserting a
      `dataScope` concept exists.
- [ ] 5.5 Grep gate, both repos: `grep -rni "dataScope" --include='*.ts' --include='*.tsx' packages server client` (aprovan)
      and `grep -rni "dataScope" --include='*.ts' --include='*.tsx' packages apps` (registry)
      both return nothing.

## 6. AGENTS.md refactor rule (aprovan)

> Depends-on: - | Repo: aprovan | Touches: aprovan/AGENTS.md | Verify: grep -n "Refactor rule" AGENTS.md

- [x] 6.1 Add a `### Refactor rule` section to `AGENTS.md` stating, in this
      repo's existing prose style: delete replaced code in the same change
      that replaces it; a "delete X" task is not done until `grep X` returns
      nothing in **both** `aprovan` and `registry`; a workspace-glob
      directory with zero git-tracked files (`git ls-files <dir> | wc -l` =
      0) is build residue, not a package — delete it, don't deprecate it
      (tech-plan "AGENTS.md refactor-rule section").
- [x] 6.2 Grep gate: `grep -n "Refactor rule" AGENTS.md` is non-empty.

## 7. Bug fixes: script privacy claim, share identity, discarded commit changes

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/workflows/store.ts, aprovan/server/workspace/src/apps/store.ts, aprovan/server/workspace/scripts/migrate-shares-to-appid.ts, aprovan/server/workspace/tests/app-share-identity.test.ts, aprovan/client/web/src/lib/vfs-commits.ts, aprovan/client/web/src/lib/__tests__/vfs-commits.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/app-share-identity.test.ts && pnpm --filter @aprovan/patchwork-web test -- src/lib/__tests__/vfs-commits.test.ts

- [ ] 7.1 `server/workspace/src/workflows/store.ts`: rewrite
      `workflowVisibleTo`'s doc comment (lines 207-211) and
      `listVisibleRegistrations`' doc comment to state the filter is a
      listing convenience only — never claim "creator-private" — per
      tech-plan D4. No behavior change to the filtering logic itself.
- [ ] 7.2 `server/workspace/src/apps/store.ts`: change `shareAllows`'s
      `app` parameter to take an `appId` and match against it; change
      `appFsAllowed`'s call site (line ~499) to pass `app.id` instead of
      `app.name`; add a read-time fallback that resolves any
      `WorkspaceShare.apps` entry that isn't a live `appId` through the
      existing name→appId alias index before comparing (tech-plan D5).
      Update the `WorkspaceShare.apps` doc comment to say "app ids," not
      "app names."
- [ ] 7.3 New script `server/workspace/scripts/migrate-shares-to-appid.ts`
      (model on `migrate-app-records.ts`'s structure): for every workspace's
      `WorkspaceConfig`, rewrite each `shares[].apps` entry from name to
      `appId` via the alias index; supports a dry-run flag that logs
      intended rewrites without writing (tech-plan D5, Risks).
- [ ] 7.4 New test `server/workspace/tests/app-share-identity.test.ts`:
      grant a share to an app, rename the app, assert `appFsAllowed`/
      `shareAllows` still allow the same path for the same app after the
      rename (spec `app-share-identity`, scenario "Renaming an app does not
      change what its shares allow"); also assert a pre-existing name-keyed
      `WorkspaceConfig.shares` entry still resolves via the fallback (spec
      scenario "An existing share keeps working after upgrade").
- [ ] 7.5 `client/web/src/lib/vfs-commits.ts`: add `changes?: unknown` to
      the `CommitDetail` interface and include `raw.changes` in
      `fetchCommitDetail`'s return object (tech-plan "Interfaces & Data").
- [ ] 7.6 New test `client/web/src/lib/__tests__/vfs-commits.test.ts`:
      mock `invokeNamespaceTool` to return a `show` response with a
      `changes` payload; assert `fetchCommitDetail` includes it in the
      resolved `CommitDetail` (spec `commit-detail-fidelity`, both
      scenarios — with and without a `changes` payload present).
- [ ] 7.7 Grep gate: `grep -n "creator-private" server/workspace/src/workflows/store.ts`
      returns nothing; `grep -n "app.name" server/workspace/src/apps/store.ts | grep shareAllows`
      returns nothing.

## 8. Client base-path rename (/chat → /workspace)

> Depends-on: - | Repo: aprovan | Touches: aprovan/client/web/vite.config.ts, aprovan/client/web/index.html, aprovan/client/web/src/main.tsx, aprovan/client/web/src/lib/auth.ts, aprovan/client/web/src/components/panels/CredentialsPanel.tsx, aprovan/client/web/src/pages/OAuthCallbackPage.tsx | Verify: pnpm --filter @aprovan/patchwork-web build && ! grep -q '"/chat' client/web/dist/index.html

- [ ] 8.1 `client/web/vite.config.ts`: `base: "/chat/"` → `"/workspace/"`;
      PWA `manifest.start_url`/`scope` → `"/workspace/"`; `workbox.navigateFallback`
      → `"/workspace/index.html"`.
- [ ] 8.2 `client/web/index.html`: `apple-touch-icon` href → `/workspace/apple-touch-icon.png`.
- [ ] 8.3 `client/web/src/main.tsx`: `fallbackPath="/chat/"` → `"/workspace/"`.
- [ ] 8.4 `client/web/src/lib/auth.ts`: `basePath: "/chat"` → `"/workspace"`.
- [ ] 8.5 `client/web/src/components/panels/CredentialsPanel.tsx`:
      `OAUTH_REDIRECT_PATH = "/chat/account/oauth-callback"` → `"/workspace/account/oauth-callback"`.
- [ ] 8.6 `client/web/src/pages/OAuthCallbackPage.tsx`: the
      `window.history.replaceState` path (line 69) and both `<a href="/chat">`
      links (lines 103, 119) → `/workspace` equivalents.
- [ ] 8.7 Grep gate: `grep -rn '"/chat\|'"'"'/chat\|/chat/'"'"'' client/web/src client/web/index.html client/web/vite.config.ts`
      returns nothing; build output (`dist/index.html`) contains no `/chat`
      asset reference.

## 9. Deploy pipeline + infra rename (/chat → /workspace)

> Depends-on: - | Repo: aprovan | Touches: aprovan/scripts/deploy-web.sh, aprovan/.github/workflows/web.yml, aprovan/infra/aws/src/stacks/main.ts, aprovan/infra/aws/src/stacks/web.ts | Verify: pnpm --filter @aprovan/infra typecheck && pnpm --filter @aprovan/infra synth && bash -n scripts/deploy-web.sh

- [ ] 9.1 `scripts/deploy-web.sh`: replace every `chat/` S3 key prefix (the
      four `s3 sync` calls, the `s3 cp` SPA-shell publish, and its
      surrounding comment) and the `/chat/*` CloudFront invalidation path
      with `workspace/`/`/workspace/*`; update the header comment and the
      final `log "Done. https://aprovan.com/chat/ ..."` line to
      `.../workspace/`.
- [ ] 9.2 `.github/workflows/web.yml`: update the header comment
      ("...automated deployment to aprovan.com/chat on main...") to say
      `/workspace`. No functional change — the workflow delegates entirely
      to `deploy-web.sh`.
- [ ] 9.3 `infra/aws/src/stacks/web.ts`: add a new `cloudfront.Function`
      (viewer-request, JS_2_0) implementing the `/chat` → `/workspace`
      permanent-redirect contract in tech-plan D8/"Interfaces & Data"; add
      it to `defaultBehavior.functionAssociations` **before** the existing
      `rewrite` (`StaticRewrite`) function, so the redirect short-circuits
      ahead of the extension/index.html rewrite.
- [ ] 9.4 `infra/aws/src/stacks/main.ts`: add
      `"https://aprovan.com/workspace/auth/callback"` and
      `"http://localhost:5173/workspace/auth/callback"` to `callbackUrls`
      (lines ~166-168), and `"https://aprovan.com/workspace"` /
      `"http://localhost:5173/workspace"` to `logoutUrls` (lines ~191-193).
      Do **not** remove any existing `/chat` entry (tech-plan D9).
- [ ] 9.5 Verify the CDK app synthesizes with the new function and URLs
      (Verify command above); manually confirm (documented in the PR, not a
      script) that a deployed distribution 301s `/chat`, `/chat/`, and
      `/chat/deep/path?x=1` to the correct `/workspace` equivalents,
      preserving query strings, before calling this stream done (tech-plan
      Risks — no automated CDK test exists in this repo to assert it).
- [ ] 9.6 Grep gate: `grep -rn '"chat/\|/chat/\*\|aprovan.com/chat' scripts/deploy-web.sh .github/workflows/web.yml`
      returns nothing (the `/chat/auth/callback` and `/chat` literals in
      `main.ts`'s Cognito lists are expected to remain per D9 — this gate
      does not apply to that file).

## 10. Delete the registry-side husk (packages/utdk/infra)

> Depends-on: - | Repo: registry | Touches: registry/packages/utdk/infra/** | Verify: n=$(git ls-files packages/utdk/infra | wc -l | tr -d ' '); [ "$n" = 0 ] && rm -rf packages/utdk/infra && git status --short

- [x] 10.1 Confirm the husk test: `git ls-files packages/utdk/infra | wc -l`
      is 0 (all that's on disk is `cdk.out/bundling-temp-*/node_modules/`
      build residue).
- [x] 10.2 `rm -rf packages/utdk/infra` — untracked, so this produces no git
      diff (MIGRATION-DEBT "Husks are untracked" caveat); record the
      before/after scan output in the PR description since `git show` can't.
- [x] 10.3 Re-run the husk scan repo-wide:
      `for d in packages/*/ apps/*/; do [ -d "$d" ] || continue; n=$(git ls-files "$d" | wc -l | tr -d ' '); [ "$n" = 0 ] && echo "HUSK: $d"; done`
      returns nothing; `git status --short` shows no unexpected changes
      (deleting an untracked dir produces none).

## 11. Resolve the stale registry docs

> Depends-on: - | Repo: registry | Touches: registry/docs/apps-and-workflows.md, registry/docs/vcs-and-sessions.md, registry/docs/platform.md | Verify: ! grep -q "STALE" docs/apps-and-workflows.md docs/vcs-and-sessions.md && ! grep -qE "vfs\.(commit|log|diff|show|restore|branches)" docs/vcs-and-sessions.md

- [x] 11.1 `docs/apps-and-workflows.md`: replace the document body (keep the
      file so `platform.md:110`'s inbound link resolves) with a short stub:
      state the normative model now lives in `aprovan/docs/app-data.md` and
      `aprovan/docs/native-surfaces.md` (current truth) and
      `aprovan/openspec/changes/IW-9-APP-FIRST.md` (forward direction);
      remove the STALE banner (it's now simply not the content anymore, not
      stale content) (tech-plan D7).
- [x] 11.2 `docs/vcs-and-sessions.md`: rewrite the "Surface" section
      (lines 113-161) to current reality — the verb table lives under
      `vcs.*`, not `vfs.*`; storage is the record store, not
      `.services/vcs/*.json`; there are no `mount`/`unmount`/`mounts`
      operations (note they're quarantined pending `iw9-b-app-model`, don't
      just delete the mention); keep noting the still-unbuilt
      `auto`-session `diff(base, main)` and `GET /fs?commit=` as unbuilt
      (accurate, not stale) — resolve the file's banner once this section is
      fixed, since the banner says only this section was wrong (tech-plan
      D7). Leave every other section as-is.
- [x] 11.3 Update `platform.md:110,114`'s link text only if the surrounding
      sentence no longer reads correctly after 11.1/11.2 (e.g. if it still
      says "the naming decision, the app SDK contract, `dataScope`..." for a
      file that's now a stub) — keep the links, fix only what would mislead.
- [x] 11.4 Grep gate: neither doc's body (excluding a removed-banner's own
      historical mention, if kept) asserts `vfs.commit`/`vfs.mount`-style
      verbs or `dataScope` as current; `grep -rn "STALE" docs/apps-and-workflows.md docs/vcs-and-sessions.md`
      finds no unresolved banner (both banners are either removed or
      demonstrably no longer apply to the surviving content).

## 12. AGENTS.md refactor rule (registry)

> Depends-on: - | Repo: registry | Touches: registry/AGENTS.md | Verify: grep -n "Refactor rule" AGENTS.md

- [x] 12.1 Add a `### Refactor rule` section to `AGENTS.md`, same three
      points as stream 6 (delete-in-same-change; grep-gate-in-both-repos
      done-definition; husk test), phrased in this repo's existing prose
      style (tech-plan "AGENTS.md refactor-rule section").
- [x] 12.2 Grep gate: `grep -n "Refactor rule" AGENTS.md` is non-empty.
