# Stream 2 report — handwritten provider effect annotations

**PR:** https://github.com/AprovanLabs/registry/pull/163  
**Branch:** `feat/iw9-c-handwritten-effects`  
**Worktree:** `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw9-c-handwritten`

## What landed

Every handwritten contract `*ToolEntries` helper now carries an explicit
`effect: "observation" | "action"` on each tool. Provider wrappers that
call those helpers (`postgres`, `s3`, `sqs`, `deepgram`, `cloudflare/sandbox`,
`fly/sprites`, `github/vcs`, `dynamodb-kv`, `datadog/telemetry`, …) inherit
the annotations with no per-provider hand edits and no OpenAPI regen.

## Annotation counts (runtime hole check — zero missing)

| Contract helper | Tools | observation | action |
|---|---:|---:|---:|
| `sqlToolEntries` | 1 | 0 | 1 (`query` fail-closed) |
| `vfsToolEntries` | 5 | 3 | 2 |
| `eventsToolEntries` | 2 | 1 | 1 |
| `sttToolEntries` | 1 | 0 | 1 (`open`) |
| `keyvalueToolEntries` | 4 | 2 | 2 |
| `telemetryToolEntries` | 1 | 0 | 1 |
| `llmToolEntries` | 2 | 1 | 1 |
| `vcsToolEntries` | 9 | 6 | 3 |
| `sandboxToolEntries` | 10 | 4 | 6 |
| `agentToolEntries` | 7 | 3 | 4 |
| **Total** | **42** | **20** | **22** |

## Verify

```bash
pnpm --filter @utdk/clients build   # pass
# check-types: pre-existing main failures (dynamodb-kv export + slack/types),
# not introduced by this stream
```

Runtime import of all 10 helpers → **ZERO HOLES**.

## Deviations

1. **Path mapping.** Brief listed `packages/utdk/{agent,llm,sql,vcs,sandbox}`;
   those `@utdk/*` packages live under `packages/contracts/`. Annotations
   applied at the `*ToolEntries` definition site (tech-plan D1).
2. **Google skipped.** `packages/utdk/google/**` is OpenAPI-generated —
   stream 4 territory; not touched.
3. **Extra contracts covered.** `stt`, `events`, `keyvalue`, `telemetry`
   are handwritten helpers used by deepgram/sqs/dynamodb-kv/datadog and
   were annotated so provider `tools` exports have no holes.

## Stream 5 needs before publish

- Publish annotated `@utdk/{agent,llm,sql,vfs,vcs,sandbox,stt,events,keyvalue,telemetry}`.
- `registry-server` `discovery.ts` `deriveToolEntries` / `relabelEntries`
  currently strip `effect` when projecting to `ToolEntry` — add pass-through
  or wire visibility will drop the annotations on the registry catalog.
