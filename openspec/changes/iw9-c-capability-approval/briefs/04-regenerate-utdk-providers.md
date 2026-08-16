# Brief: Registry — regenerate @utdk/* provider packages

**Depends-on: 1 (merged)** | Repo: registry | Wave 1

## Mission

When you are done, every OpenAPI-generated provider under `packages/utdk/*`
has been regenerated so published tool metadata carries `effect` from
stream 1's bundler derivation — no per-provider hand edits. Spot-check
GET-heavy, POST-heavy, and mixed providers. **Does not depend on stream 2**
(handwritten annotations run in parallel); do not overwrite handwritten
tool definitions.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — D1, Rollout
4. `openspec/changes/iw9-c-capability-approval/specs/effect-classification/spec.md` — "consumers SHALL NOT re-derive"
5. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 4 + "stream 2 vs 4" note in `briefs/00-waves.md`
6. Stream 1's landed `effectFromHttpMethod` / `ToolRuntimeMetadata.effect`

Work in `/Users/jacob/Documents/Code/AprovanLabs/registry`. Confirm stream 1 is merged before starting.

## Tasks

- [ ] 4.1 Run the bundler regen across every OpenAPI-generated provider
      under `packages/utdk/*` so published tool metadata carries `effect`
      from stream 1's derivation — no per-provider hand edits (spec:
      "the derivation happens in the registry bundler at generation time
      so the published package carries the effect; consumers SHALL NOT
      re-derive it").
- [ ] 4.2 Spot-check a representative sample (a GET-heavy provider like
      `github`, a POST-heavy one, and one with mixed methods) for effect
      correctness against their OpenAPI operations.
- [ ] 4.3 Regen tooling's own version-bump/CHANGELOG output stands as the
      per-provider changelog entry; no manual authorship needed.

## Acceptance criteria

From `specs/effect-classification/spec.md` — Generated providers derive
effect from HTTP method (scenarios GET/POST/Missing method) visible in
regenerated `metadata.ts` files. Grep gate: zero listed generated
metadata files lack `"effect"`.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/utdk-bundler generate && pnpm --filter @utdk/clients build && grep -L '"effect"' packages/utdk/github/metadata.ts packages/utdk/anthropic/metadata.ts packages/utdk/asana/metadata.ts | wc -l | grep -qx 0
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `registry/packages/utdk/**/metadata.ts`, `registry/packages/utdk/**/package.json`, `registry/packages/utdk/**/CHANGELOG.md`
- Do not hand-edit generated metadata for effect. Do not publish (stream 5). Do not touch handwritten provider tool lists (stream 2).

## Report back

Check off tasks; PR or `briefs/04-report.md` with spot-check results and
version bumps stream 5 will publish.
