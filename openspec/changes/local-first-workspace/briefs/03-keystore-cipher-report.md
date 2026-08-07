# Report: Keystore cipher envelope (stream 3)

## PR
https://github.com/AprovanLabs/registry/pull/152

## Version bump
`@aprovan/registry-server` **0.2.7 → 0.2.8**

## What was built
- `KeyProvider` interface (`getKey(): Promise<Buffer>`, `readonly id: string`)
- `KeystoreCipher` (`backend: "keystore"`) — AES-256-GCM seal/unseal with a provider-supplied 32-byte key; caches the key for the process lifetime
- `InMemoryKeyProvider` for tests / no platform keystore
- `getCredentialCipher(options?)` prefers `options.keyProvider` when supplied; env-based kms/local/none selection unchanged when absent
- `options.requireEncryption` refuses the plaintext `none` backend with an error naming the missing key provider (local-workspace init seam for stream 4)
- Exports from `@aprovan/registry-server`: `KeystoreCipher`, `InMemoryKeyProvider`, `KeyProvider`, `GetCredentialCipherOptions`

## Spec coverage (`protected-credential-envelope`)
| Scenario | Covered by |
|---|---|
| Seal and unseal with a provided key | `cipher.test.ts` KeystoreCipher round-trip |
| Store surface unchanged | list + filter by `createdBy` via CredentialService + sqlite |
| Key provider consulted once per process | counting provider + cached `getCredentialCipher` |
| Plaintext refused for local workspace | `requireEncryption: true` throws /key provider/i |
| In-memory provider satisfies the seam | `InMemoryKeyProvider` seal/unseal |

## Verify
```text
pnpm --filter @aprovan/registry-server check-types  # pass
pnpm --filter @aprovan/registry-server test
  # cipher.test.ts: 9 passed
  # full suite: 230 passed, 10 skipped, 4 failed (pre-existing, unrelated)
```

Pre-existing failures (not introduced by this change):
- `tests/dispatch.test.ts` (2): grant-enforcement “No default profile” when authMode ≠ none
- `tests/server.test.ts` (2): sandbox script error-message shape mismatch

## tasks.md
Checkboxes 3.1–3.4 updated in the aprovan working tree. **No commit on aprovan** — checkout was on `local-first/01-contain` with unrelated WIP. Orchestrator should commit the checkbox update (or re-apply) on an appropriate branch.

## Deviations
None from the tech-plan interfaces. Selection API is `getCredentialCipher({ keyProvider?, requireEncryption? })` rather than a separate setter; `requireEncryption` is the stream-3 hook for the “refuse plaintext” scenario (workspace init wiring remains stream 4 / task 4.4).
