# Brief: registry-main transport headers (standalone-creds stream 2)

## Mission
Extend `GatewayClientOptions` with `authHeader?` / `scopeHeader?` (defaults preserve
current behavior). Doc-comment CloudFront OAC rationale on `authHeader`.

## Read first
1. `openspec/changes/registry-standalone-credentials/tech-plan.md` (D4)
2. `tasks.md` stream 2
3. Specs as referenced
4. `packages/registry-main/**` in aprovan (post IW-0 — packages live in aprovan)

## Tasks
2.1–2.2 verbatim.

## Verify
```
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/registry-main typecheck && pnpm --filter @aprovan/registry-main build
```

## Git
Worktree `/tmp/iw3-registry-main-headers` branch `iw3/registry-main-headers` from aprovan
`origin/main`. PR + merge. Do not bump publish version (stream 4).

## Constraints
Touches only `aprovan:packages/registry-main/**`. No registry-ui / registry-server edits.
