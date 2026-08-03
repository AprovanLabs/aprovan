# Brief: App-model install lifecycle + dependencies (stream 3)

## Mission
Parse/validate `requires`, rewrite installs to ULID `AppInstallation` with profile
bindings/grants, lifecycle procedures (install/update/configure/uninstall), serve-from-origin
+ editing fork, and `__deployment__` directory index.

## Gate
Streams 1–2 merged (#28, #31). IW-0 npm packages available for profile grants.

## Read first
1. `briefs/01-report.md`, `02-report.md`
2. `tech-plan.md` D4–D7
3. `tasks.md` stream 3
4. Specs: `app-dependencies`, `app-install-lifecycle`

## Tasks
3.1–3.7 verbatim.

## Verify
```
pnpm --dir server/workspace typecheck && pnpm --dir server/workspace test
```

## Git
`/tmp/iw1-install-lifecycle` branch `iw1/install-lifecycle` from latest origin/main.

## Constraints
Touches stream 3 globs only. Degrade path when `profileGrantsAvailable()` is false.
