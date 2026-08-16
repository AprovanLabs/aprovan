# Brief: Registry — effect classification: handwritten provider annotations

**Depends-on: -** | Repo: registry | Wave 0 (parallel with 1, 3)

## Mission

When you are done, every handwritten (non-OpenAPI-generated) `@utdk/*`
provider tool definition carries an explicit `effect: "observation" | "action"`
(read/list/get → observation; mutating → action). No holes: a missing effect
fails closed as action at dispatch but is noisy for reviewers. Runs in
parallel with stream 1; does **not** block stream 4.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-c-capability-approval/prd.md` — Goal 2
4. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — D1
5. `openspec/changes/iw9-c-capability-approval/specs/effect-classification/spec.md` — "Handwritten providers…"
6. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 2 (+ preamble: stream 2 vs 4 sequencing)
7. Tool definition sites under `packages/utdk/{agent,cloudflare,databricks,deepgram,fly,google,llm,postgres,s3,sandbox,snowflake,sql,sqs,vcs}/`

Work in `/Users/jacob/Documents/Code/AprovanLabs/registry`.

## Tasks

- [ ] 2.1 For each handwritten (non-OpenAPI-generated) provider under
      `packages/utdk/*` — agent, cloudflare, databricks, deepgram, fly,
      google, llm, postgres, s3, sandbox, snowflake, sql, sqs, vcs — add
      an explicit `effect: "observation" | "action"` on every tool
      definition (read/list/get operations → `observation`; anything
      mutating → `action`). Spec: effect-classification "Handwritten
      providers and core services are annotated".
- [ ] 2.2 Grep every handwritten provider's tool list for a missing
      `effect` field before finishing this stream — a hole here silently
      falls back to `action` at dispatch (fail-closed, but noisy for
      reviewers); leave none.

## Acceptance criteria

From `specs/effect-classification/spec.md`:

### Requirement: Handwritten providers and core services are annotated
Every handwritten provider tool and every core-service procedure (vcs, vfs,
records, apps, agents, notifications, …) SHALL carry an explicit
`effect` annotation in its tool metadata. Absence of an annotation SHALL be
treated as `action` at dispatch and reported by the completeness gate.

(This stream covers the **registry handwritten `@utdk/*` half**; aprovan
core-service annotations are stream 7.)

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/clients check-types && pnpm --filter @utdk/clients build
```

Also: grep the listed handwritten provider packages for tool defs missing
`effect` — zero holes.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `registry/packages/utdk/agent/**`, `registry/packages/utdk/cloudflare/**`, `registry/packages/utdk/databricks/**`, `registry/packages/utdk/deepgram/**`, `registry/packages/utdk/fly/**`, `registry/packages/utdk/google/**`, `registry/packages/utdk/llm/**`, `registry/packages/utdk/postgres/**`, `registry/packages/utdk/s3/**`, `registry/packages/utdk/sandbox/**`, `registry/packages/utdk/snowflake/**`, `registry/packages/utdk/sql/**`, `registry/packages/utdk/sqs/**`, `registry/packages/utdk/vcs/**`
- Do not edit OpenAPI-generated provider metadata (stream 4). Do not publish (stream 5). Do not change the bundler (stream 1).

## Report back

When done: check off tasks in `tasks.md`; PR or `briefs/02-report.md` with
annotation counts per provider and anything stream 5 needs before publish.
