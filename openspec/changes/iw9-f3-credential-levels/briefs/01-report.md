# Report: F3 stream 1 — registry credential level model

## Result
Merged registry PR https://github.com/AprovanLabs/registry/pull/161 (`79da708` → squash on main).

## Verify (from implementer)
- `credential-levels.test.ts` 11/11
- registry-server build + tsc pass
- schema `level` column + `credentials_user_oauth_owner` present
- eslint scoped baseline held (35/0)

## Orchestrator
Aprovan tasks 1.1–1.4 checked off here after registry merge. Publish/pin waves remain for later F3 streams.

Agent: Redispatch F3 registry levels (`e0a382a8-9c65-48a1-9d34-73a00b057b35`)
