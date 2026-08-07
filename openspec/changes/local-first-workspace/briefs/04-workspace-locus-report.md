# Report: Workspace execution locus (stream 4)

## PR
https://github.com/AprovanLabs/aprovan/pull/TBD

## Version bump
`@aprovan/registry-server` **0.2.7 → 0.2.8** (KeystoreCipher / `requireEncryption` from stream 3)

## What was built
- `WorkspaceRecord` gains optional `locus` / `dataDir` / `vfsRoot`; readers normalize missing locus to `"cloud"`
- SQLite + DSQL schema columns; SQLite migrates existing DBs with `ALTER TABLE` on open; SQL `ON CONFLICT` never overwrites locus
- Dynamo get projection includes the new fields; put preserves an existing locus
- `createWorkspace` / `updateWorkspace` / `assertProviderBindingAllowed` / `initLocalWorkspaceCipher` in `workspaces.ts`
- Local init calls `getCredentialCipher({ keyProvider?, requireEncryption: true })` — refuses plaintext
- `profiles.set` and `writeBinding` refuse `local-directory` in cloud workspaces with an inbound-access message

## Spec coverage (`workspace-execution-locus`)
| Scenario | Covered by |
|---|---|
| Local workspace resolves locally | create with `locus: "local"` + dataDir persisted |
| Cloud workspace resolves remotely | default / explicit `locus: "cloud"` |
| Locus cannot be changed | `updateWorkspace({ locus })` rejected; row unchanged |
| Existing workspaces default to cloud | put without locus → get returns `cloud` |
| Local workspace without an account | create succeeds with no Cognito / auth |
| Local workspace using a hosted model | cloud providers still bindable in cloud (and local) |
| Cloud rejects local-directory binding | `writeBinding` / `setProfile` / `assertProviderBindingAllowed` |

## Verify
```text
pnpm --filter @aprovan/workspace test -- tests/workspace-locus.test.ts
  ✓ 11 passed
pnpm --filter @aprovan/workspace check-types
  ✓ tsc --noEmit
```

## Deviations
- Brief listed `src/__tests__/workspace-locus.test.ts`; vitest only includes `tests/**/*.test.ts`, so the file lives at `tests/workspace-locus.test.ts`.
- Binding refusal is enforced in `profiles/store.ts` and `interfaces.ts` (call `assertProviderBindingAllowed`) in addition to the workspaces facade — otherwise `profiles.set` would bypass the rule.
- Identity persistence (`identity/types.ts`, `identity/sql.ts`, `identity/dynamo.ts`) updated alongside `db/dsql-schema.sql` because that is where workspace rows actually live.

## Notes for stream 5 (locus-aware resolution)
- `getWorkspace` / `createWorkspace` are the server-side source of truth for locus; session routes still hard-code the auth-none `"local"` picker entry and do not yet surface `locus` / `dataDir` / `vfsRoot`.
- `LOCAL_MACHINE_PROVIDERS` currently lists only `local-directory`; add providers here when stream 2 lands additional machine-backed entries.
