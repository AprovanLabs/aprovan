# Brief: Credential profiles UI (stream 5)

## Mission
Add ProfilesSection + form to registry-ui (injected client), copy-pass CredentialManager,
compose CredentialsPanel tabs (Credentials | Profiles), unit tests for member/admin paths.

## Gate
Streams 2–3 merged. Profile CRUD routes exist server-side.

## Read first
1. `briefs/02-report.md`, `ux.md` Credentials, `tech-plan.md`
2. `tasks.md` stream 5 (5.1–5.4)
3. Spec: `credential-profiles`
4. Existing: `packages/registry-ui/src/credentials/**`, `CredentialsPanel.tsx`, shell primitives

## Tasks
5.1–5.4 verbatim.

## Verify
```bash
pnpm --filter @aprovan/registry-ui build
pnpm --filter @aprovan/registry-ui test
pnpm --filter @aprovan/patchwork-web build
```

## Git
`/tmp/iw4-credential-profiles` branch `iw4/credential-profiles`. No `move_agent_to_root`.
If `packages/registry-ui/src/index.tsx` conflicts with another stream, rebase and keep both exports.

## Constraints
Touches stream 5 globs only. Do not edit admin/** (stream 6).

## Report back
Check off tasks, merge PR, `briefs/05-report.md`. Return merged PR URL.
