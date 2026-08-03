# Brief: Telemetry freeze + npm path (stream 4)

## Mission
Freeze `@utdk/telemetry` at **0.3.0**, confirm `./sdk` subpath is publishable, publish to
npm, then point aprovan at the published package (IW-0 landed — **do not** mirror into
`aprovan/packages/contracts/telemetry`; use npm semver instead). Record the path taken
in the commit message.

## Gate
Streams 1–3 merged (registry#86). IW-0 unfork landed — npm path required by task 4.2.

## Read first
1. `openspec/changes/telemetry-contract-v2/briefs/01-report.md` (in aprovan)
2. `tasks.md` stream 4, `tech-plan.md` D7
3. Spec telemetry-contract-signals
4. `registry/packages/contracts/telemetry/**`
5. Owner discovery: bare `telemetry` never vendor-egresses; vendor = named instance
   (`telemetry:datadog`) — do not weaken this in freeze notes.

## Tasks
4.1–4.2 verbatim. For 4.2: npm path (not mirror).

## Verify
```bash
# registry
cd /tmp/iw5-telemetry-freeze
pnpm --filter @utdk/telemetry build && pnpm --filter @utdk/telemetry test
pnpm --filter @utdk/telemetry publish --dry-run
# after real publish:
npm view @utdk/telemetry version   # expect 0.3.0

# aprovan (same PR series or follow-up PR in aprovan):
pnpm --filter @utdk/telemetry build && pnpm --filter @utdk/telemetry test
# OR if consuming npm: dependency resolves to 0.3.0 and workspace builds
```

## Git
Registry worktree: `/tmp/iw5-telemetry-freeze` branch `iw5/telemetry-freeze`.
Aprovan dep switch: create `/tmp/iw5-telemetry-npm` from aprovan `origin/main` if needed.
Do **not** call `move_agent_to_root`.

Use `gh workflow run publish.yml` or package-level publish per repo norms. Merge registry
first, then aprovan dep PR.

## Constraints
- Do not rewrite lockfile beyond this package's version bump.
- Do not start streams 5–7 here.

## Report back
Check off 4.1–4.2 in aprovan `openspec/changes/telemetry-contract-v2/tasks.md` (via
aprovan PR if needed). Write `briefs/04-report.md`. Return merged PR URL(s).
