# Brief: Telemetry contract + SDK + Datadog compat (telemetry-contract-v2 streams 1–3)

## Mission
Promote `@utdk/telemetry` to a three-signal contract (logs / metrics / traces): add the
OTLP metrics subset, lift the metrics 501, ship a zero-dependency `@utdk/telemetry/sdk`
helper, write `compat.json` (native / datadog / sentry-unavailable), and implement the
handwritten `datadog/telemetry` adapter. When you are done, registry builds/tests green
for the contract + Datadog suite; freeze/mirror (stream 4) waits until audit + this PR
land. Owner rule: bare `telemetry` never egresses to vendors — vendor export is always an
explicit named instance (`telemetry:datadog`).

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/telemetry-contract-v2/prd.md`
2. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/telemetry-contract-v2/tech-plan.md` (D1–D6, Interfaces & Data)
3. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/telemetry-contract-v2/tasks.md` (streams 1–3)
4. Specs:
   - `openspec/changes/telemetry-contract-v2/specs/telemetry-contract-signals/spec.md`
   - `openspec/changes/telemetry-contract-v2/specs/telemetry-sdk/spec.md`
   - `openspec/changes/telemetry-contract-v2/specs/telemetry-provider-compat/spec.md`
5. Existing sources:
   - `/Users/jacob/Documents/Code/AprovanLabs/registry/packages/contracts/telemetry/`
   - `/Users/jacob/Documents/Code/AprovanLabs/registry/packages/utdk/github/vcs/` (handwritten adapter pattern)
   - `/Users/jacob/Documents/Code/AprovanLabs/registry/packages/contracts/agent/compat.json` (native entry pattern)

## Tasks
Work streams **1**, **2**, and **3** from
`openspec/changes/telemetry-contract-v2/tasks.md` (1.1–1.5, 2.1–2.3, 3.1–3.4).
Execute verbatim; check each off as you complete it.

Do **not** bump to 0.3.0 / mirror / touch aprovan in this brief (stream 4+). Complete the
AUDIT.md metrics mapping (1.5) so stream 4 can freeze.

## Acceptance criteria
All scenarios under:
- `telemetry-contract-signals` (metrics validate / reject / unmodified OTLP / accounting /
  empty rules / discovery / audit gate prep)
- `telemetry-sdk` (subpath import, helper round-trip, span correlation, attribution,
  failure isolation, flush, destination-agnostic)
- `telemetry-provider-compat` (compat loads, native default, Datadog fan-out / partial
  success / missing credential, Sentry unavailable 501)

Copy full WHEN/THEN bodies from those specs while implementing.

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @utdk/telemetry build && pnpm --filter @utdk/telemetry test
npx vitest run packages/utdk/datadog/telemetry
pnpm --filter utdk check-types
```

## Git workflow
- Repo: `/Users/jacob/Documents/Code/AprovanLabs/registry`
- Branch from latest `origin/main`: `iw5/telemetry-contract-sdk-compat`
- Isolated worktree; rebase onto `origin/main` before PR.
- Open PR to `AprovanLabs/registry` `main`. Do **not** publish `@utdk/telemetry@0.3.0`
  yet (stream 4).
- Coordination with IW-0 agent: do not edit `packages/registry-server/**`,
  `packages/utdk/*/package.json` (provider docs paths), `publish.yml`, or claim sole
  ownership of root `pnpm-lock.yaml` unless you must add no new workspace packages (you
  should not). Prefer leaving lockfile untouched.

## Constraints
- Tech-plan Interfaces & Data are fixed; stop and report if wrong.
- Surgical changes; karpathy-guidelines.
- Touches only:
  - Stream 1: `registry/packages/contracts/telemetry/{index.ts,__tests__/**,AUDIT.md}`
  - Stream 2: `registry/packages/contracts/telemetry/{sdk/**,package.json}`
  - Stream 3: `registry/packages/contracts/telemetry/compat.json`,
    `registry/packages/utdk/datadog/telemetry/**`
- No aprovan edits in this brief.

## Report back
Check off 1.1–3.4 in tasks.md; write
`openspec/changes/telemetry-contract-v2/briefs/01-report.md` with PR URL, verify summary,
audit status, and notes for stream 4 (freeze/mirror) and IW-0 publish interaction.
