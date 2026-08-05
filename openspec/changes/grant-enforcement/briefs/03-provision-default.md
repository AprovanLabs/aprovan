# Brief: grant-enforcement §3 — Provision default profile on connect

## Mission
Connecting a credential also creates a `default` profile row bound to it and a grant to
the connecting principal, in the **same transaction**. Under governed auth, connect stays
one user action after §1 gates the ungated fallback. Failed writes leave no half-state.

## Read first
1. `openspec/changes/grant-enforcement/{prd,tech-plan,tasks}.md` (aprovan)
2. Tech-plan D3 and `CreateCredentialResult` interface
3. registry `packages/registry-server/src/credentials/service.ts`
4. registry `packages/registry-server/src/profiles/service.ts`
5. registry `packages/registry-server/src/storage/**` (transaction helpers)
6. Grep all `credentials.create` / OAuth exchange / admin import call sites

## Tasks
- [ ] 3.1 On credential creation, write a `default` profile row bound to it and a grant
      to the connecting principal, in the **same transaction** as the credential.
- [ ] 3.2 Apply to every creation path — direct create, OAuth authcode exchange, and any
      admin import. Grep for `credentials.create` call sites; a path that skips this
      reintroduces the hole 1.1 closed.
- [ ] 3.3 If a `default` row already exists for that (tenant, target), bind the new
      credential only when the row has none; never silently repoint a pinned profile.
- [ ] 3.4 Tests: connect → immediately dispatch, no admin step; transaction rollback
      leaves neither credential nor profile; second credential for the same provider does
      not steal the existing default.

## Acceptance criteria
**Done when** connecting a credential is still one user action under governed auth, and
a failed write leaves no half-state.

Do **not** implement OAuth platform-app resolution (that is `platform-oauth-apps` §1,
serialized after this stream merges — both touch `credentials/service.ts`).

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- credentials
```
Paste full output. Grep every creation path and list them in the report proving 3.2.

## Constraints
- Files only: registry `packages/registry-server/src/credentials/service.ts`,
  `packages/registry-server/src/profiles/service.ts`,
  `packages/registry-server/src/storage/**`, plus credential/profile tests.
- Do not change `resolve.ts` step-5 gating (§1 owns that).
- Do not add platform OAuth client resolution.
- Branch from `origin/main`; PR to `AprovanLabs/registry`.
- Check off `tasks.md` §3; write `briefs/03-report.md`.

## Report back
PR URL, verify paste, list of creation paths covered, any storage API you added that
POA §1 must rebase onto.
