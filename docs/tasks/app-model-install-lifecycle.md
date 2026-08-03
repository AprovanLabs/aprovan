# Stream 3: install lifecycle + dependencies

## Plan
1. Parse/validate `requires` in capabilities; extend allow-list for contracts
2. Rewrite `install.ts` to ULID `AppInstallation`
3. Grant mirroring via profile-grants (degrade when dynamo)
4. Lifecycle procedures + directory write-through
5. Serve-from-origin / fork materialization
6. Tests

## Progress
- [x] 3.1–3.7 implemented
- [x] typecheck + full test suite green (516 passed, 7 skipped)
- PR + merge next
