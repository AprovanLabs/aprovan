# Brief: Keystore cipher envelope

## Mission
Add `KeyProvider` and `KeystoreCipher` to `@aprovan/registry-server` alongside existing KMS/local/none ciphers. Selection prefers a supplied key provider; without one, current env-based selection is unchanged. Ship an in-memory provider for tests.

## Read first
1. In the **aprovan** repo (sibling or clone): `openspec/changes/local-first-workspace/tech-plan.md` (D4, KeyProvider/KeystoreCipher interfaces)
2. `openspec/changes/local-first-workspace/specs/protected-credential-envelope/spec.md`
3. `openspec/changes/local-first-workspace/tasks.md` — section 3 only
4. In **this** repo (registry): `packages/registry-server/src/credentials/cipher.ts` and its tests/exports

## Tasks
- [ ] 3.1 Add the `KeyProvider` interface and `KeystoreCipher` alongside `KmsCipher` / `LocalCipher` / `NoneCipher`, following their existing structure (D4).
- [ ] 3.2 Cache the unsealed key for the process lifetime so a provider that prompts is consulted at most once.
- [ ] 3.3 Extend backend selection to prefer a supplied key provider over the environment-variable backends, leaving current selection untouched when none is supplied.
- [ ] 3.4 Ship an in-memory key provider for tests and cover every scenario in `specs/protected-credential-envelope/spec.md`.

## Acceptance criteria
Every scenario in `specs/protected-credential-envelope/spec.md`. Existing kms/local/none selection unchanged when no KeyProvider is passed.

## Verify
```bash
pnpm --filter @aprovan/registry-server test && pnpm --filter @aprovan/registry-server check-types
```

## Constraints
- Work in the **registry** git repo only (`packages/registry-server/**`).
- Interfaces must match the tech plan exactly:
  ```ts
  export interface KeyProvider {
    getKey(): Promise<Buffer>;
    readonly id: string;
  }
  export class KeystoreCipher implements CredentialCipher {
    readonly backend: "keystore";
    constructor(provider: KeyProvider);
  }
  ```
- Extend `CredentialCipher.backend` union to include `"keystore"`.
- Do not modify files outside: `packages/registry-server/src/credentials/cipher.ts`, `packages/registry-server/src/credentials/__tests__/cipher.test.ts`, `packages/registry-server/src/index.ts` (exports only).
- Branch from latest `main`, push, open PR to `main`.
- Also update checkboxes in aprovan's `openspec/changes/local-first-workspace/tasks.md` section 3 (checkout aprovan main in a separate clone/worktree if needed, or note in report for orchestrator).
- Publish is orchestrator's job after merge — bump version patch on registry-server if the repo's publish convention requires it before merge.

## Report back
What you built, version bump if any, how verified, deviations.
