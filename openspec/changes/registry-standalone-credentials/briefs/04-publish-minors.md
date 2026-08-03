# Brief: Publish package minors (standalone-creds stream 4)

## Mission
Version and publish the three minors now that streams 1–3 landed:
- `@aprovan/registry-server` (discovery endpoints) — registry repo publish.yml
- `@aprovan/registry-main` (header options) — aprovan publish.yml
- `@aprovan/registry-ui` (admin capabilities/sections) — aprovan publish.yml

## Gate
IW-0 complete; streams 1–3 merged:
- registry#92 (auth discovery)
- aprovan#25 (registry-main headers)
- aprovan#26 (registry-ui admin)

## Read first
1. `tasks.md` stream 4
2. `briefs/01-report.md`, `02-report.md`, `03-report.md`
3. Current package.json versions in both repos

## Tasks
4.1–4.2 verbatim. Bump minor (or patch if already ahead) per repo convention; ensure
publish workflows run green; verify `npm view` versions.

## Verify
```
npm view @aprovan/registry-server version
npm view @aprovan/registry-main version
npm view @aprovan/registry-ui version
```

## Git
Separate PRs if version bumps need commits; or bump+push on main via short PRs:
- registry: bump registry-server version if not already past discovery
- aprovan: bump registry-main + registry-ui

Merge, watch publish.yml on each repo, confirm npm.

## Constraints
Do not start stream 5 until all three packages are on npm at the new minors.
Report exact published versions in `briefs/04-report.md`.
