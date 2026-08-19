# Report — Stream 9: `llm-jobs` dissolution

**PR:** https://github.com/AprovanLabs/aprovan/pull/224
**Base:** `origin/main` @ `bbfc3f3` (`feat(web): IW-9 D stream 8 — RunTransport default, delete legacy loop` / #223)
**Outcome:** complete-with-blocker (9.5 does not delete) — **superseded 2026-08-18: blocker resolved, deletion performed; see Addendum at the bottom**

## Verify

```bash
pnpm --filter @aprovan/workspace test -- tests/llm.test.ts && \
pnpm --filter @aprovan/patchwork-web test -- src/lib/llm-jobs.test.ts
```

| Check | Result |
| --- | --- |
| `tests/llm.test.ts` | **8/8 passed** |
| `src/lib/llm-jobs.test.ts` | **4/4 passed** (rewritten for post-migration tools-proxy path) |
| Extra: `tests/llm-jobs.test.ts` | **7/7 passed** (store kept) |
| Extra: stream 8 parity (`pnpm --filter @aprovan/patchwork-web test`) | **125/125 passed** |
| Extra: `src/features/chat/` | **29/29 passed** |

## Tasks

| Task | Status |
| --- | --- |
| **9.1** chat no longer reads `x-llm-job` | **done** — only `lib/chat-transport.ts` (`resilientChatFetch`, unused by chat) |
| **9.2** migrate `useEditTransport` off llm-jobs | **done** — `streamChatCompletion` (tools-proxy stream); `onProgress` strings unchanged; `runChatCompletionJob` now aliases the same path |
| **9.3** deprecation on `GET /llm/jobs/:id` | **done** — body + `Deprecation`/`Sunset` headers state the 9.4 evidence conditions (not a calendar) |
| **9.4** evidence gate | **collected** — see below |
| **9.5** delete or blocker | **blocker** — store + deprecation left in place |

## 9.4 Evidence (verbatim)

### (a) Zero callers

```
$ AAP=/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-d-llm-jobs
$ REG=/Users/jacob/Documents/Code/AprovanLabs/registry
$ test -d "$REG" && echo REG_readable=yes
REG_readable=yes

$ grep -rn "x-llm-job\|readLlmJob\|writeLlmJob\|pollJobUntilTerminal\|resilientChatFetch" \
    "$AAP/client" "$AAP/server" --include='*.ts' --include='*.tsx' --include='*.js' --include='*.md' \
  | grep -v node_modules | grep -v '/dist/' | grep -v '.turbo/'
```

Hits (only definitions about to be deleted + their tests / deprecation text):

- `client/web/src/lib/chat-transport.ts` — `resilientChatFetch`, reads `x-llm-job`, calls `pollJobUntilTerminal` (no importers in `client/web/src` post-stream-8)
- `client/web/src/lib/llm.ts` — `pollJobUntilTerminal` definition (retained for the above)
- `server/workspace/src/llm-jobs.ts` — `readLlmJob` / `writeLlmJob` definitions
- `server/workspace/src/routes/llm.ts` — job writes, `x-llm-job` header, `GET /jobs/:id` + deprecation notice
- `server/workspace/tests/llm-jobs.test.ts`, `server/workspace/tests/llm.test.ts` — dedicated tests

```
$ grep -rn "x-llm-job\|readLlmJob\|writeLlmJob\|pollJobUntilTerminal\|resilientChatFetch" \
    "$REG" --include='*.ts' --include='*.tsx' --include='*.js' --include='*.md' \
  | grep -v node_modules | grep -v '/dist/' | grep -v '.turbo/'
# (empty)
```

**Verdict (a): PASS** for the listed symbols.

### (b) Parity green

| Suite | Result |
| --- | --- |
| Stream 8 full `pnpm --filter @aprovan/patchwork-web test` | **125/125** |
| `tests/llm.test.ts` | **8/8** |
| Widget-edit / completion client tests (`src/lib/llm-jobs.test.ts`) | **4/4** (asserts tools-proxy path; stall rejects, no `/llm/jobs` poll) |
| Chat feature tests | **29/29** |

**Verdict (b): PASS**

### (c) Compatibility assessment

**Can a client shipped before this change hold a job id across the deploy?**

- **Post-stream-8 chat (RunTransport):** does not read `x-llm-job` and does not call `GET /llm/jobs/:id`. Recovery is reattach to `GET /agents/runs/:id/stream`. A chat client from stream 8+ never holds a job id. If `/llm/jobs/:id` disappeared tomorrow, chat behavior is unchanged.
- **Widget-edit path (this stream):** previously `runChatCompletionJob` → `POST /llm/:provider/completions` (`job: true`) → on stall, `pollJobUntilTerminal`. After 9.2 it uses `streamChatCompletion` (`/tools/:provider/createChatCompletion`) with no job id and no poll. A *new* client never holds a job id. An *old* (pre-9.2) edit client mid-completion that already received a `jobId` SSE frame and then stalls would still poll `/llm/jobs/:id`; while the store remains (blocker branch), that poll still works. If the route were deleted out from under that old client, it would keep polling until `JOB_POLL_TIMEOUT_MS` (5 min) and then throw — the edit panel would surface a failure instead of applying blocks.
- **Leftover non-edit callers** (`useSessionChatSync` auto-title, `useSessionOrchestration` merge combine): still call `runChatCompletionJob`, which now aliases `streamChatCompletion` — no job ids issued.
- **Dead `resilientChatFetch`:** no importers; a pre-stream-8 chat build that still used it would be the only in-tree historical poller. Such a client holding `x-llm-job` across a deploy that *removes* `/llm/jobs/:id` would observe repeated non-OK polls then a synthesized stream error after the poll timeout (same as edit). That client path is already gone from `main` after #223.

**Verdict (c): recorded.** In-repo product paths after this PR do not depend on job ids. Only a stale pre-9.2 edit client (or pre-stream-8 chat build) mid-flight could still hold one; the store stays until the deletion unblock.

## 9.5 Branch taken: blocker (do not delete)

9.4 (a)+(b)+(c) authorize deletion for the *symbol* gate, but the mandatory post-deletion grep

```
grep -rn "llm-jobs\|x-llm-job\|readLlmJob\|writeLlmJob" $AAP/client $AAP/server $REG
```

**cannot return empty within this stream's Touches.** Preview residual hits outside Touches:

1. `server/workspace/scripts/migrate-services-to-records.ts` — CLI case `"llm-jobs"` / `svcScope("llm-jobs")` (not in Touches)
2. `registry/docs/local-mode.md` — table cell listing `llm-jobs` (sibling repo; not in Touches)

Deleting only the Touched definitions would leave those matches and fail AGENTS.md / spec "Job store deletion is gated". Per task 9.5: do not delete; leave 9.3's notice; record the blocker.

**Unblock later:** add the migrate script (and a registry docs edit, or a coordinated registry PR) to Touches / a hygiene follow-up; remove or rewrite those `llm-jobs` references; then re-run 9.5 deletion + empty grep.

## Deviations

1. **Edit path used tools-proxy stream, not chat-turn / run SSE.** `POST /agents/chat-turn` + `GET /agents/runs/:id/stream` would run an agent tool loop, not emit search/replace blocks. Brief allows "or an equivalent resumable run stream"; `streamChatCompletion` is the non-job streaming equivalent. Staged `onProgress` strings preserved exactly.
2. **`USE_RUN_TRANSPORT` left in `run-transport.ts`.** Stream 8 deviation; that file is outside stream 9 Touches — left untouched (noted only).
3. **`runChatCompletionJob` kept as alias** so out-of-Touches session callers (`useSessionChatSync`, `useSessionOrchestration`) keep compiling without job polling.

## What changed (Touched files only)

| File | Change |
| --- | --- |
| `features/chat/chat-transport.ts` | `useEditTransport` → `streamChatCompletion` |
| `lib/llm.ts` | `onReasoning` on `streamChatCompletion`; `runChatCompletionJob` → alias; `pollJobUntilTerminal` deprecated/retained |
| `lib/llm-jobs.test.ts` | Asserts tools-proxy path; no job poll |
| `lib/chat-transport.ts` | Deprecation comment on dead `resilientChatFetch` |
| `routes/llm.ts` | Evidence-gated deprecation on `GET /jobs/:id` |
| `llm-jobs.ts` / server `llm-jobs.test.ts` / `llm.test.ts` | Unchanged (store kept) |

---

## Addendum — 9.5 blocker re-evaluation and deletion (2026-08-18)

The codebase moved substantially after the blocker was recorded (streams
through #274 merged). Evidence gate 9.4 was re-run as written; all three
parts pass and the broad-grep residuals were exactly the two named in
`deviations.md` §7, so the deletion branch of 9.5 was taken.

### 9.4 re-run (verbatim)

**(a) zero callers** — `REG_readable=yes`;
`grep -rn "x-llm-job\|readLlmJob\|writeLlmJob\|pollJobUntilTerminal\|resilientChatFetch" $AAP/client $AAP/server` (node_modules/dist/.turbo filtered)
returned only: `client/web/src/lib/chat-transport.ts` (defs),
`client/web/src/lib/llm.ts` (def + comments),
`server/workspace/src/llm-jobs.ts` (defs), `server/workspace/src/routes/llm.ts`
(call sites + 9.3 deprecation text), `server/workspace/tests/llm-jobs.test.ts`
and `tests/llm.test.ts:172` (tests). Same grep over `$REG`: empty. **PASS.**

**(b) parity green (no-new-failures baseline per tasks.md preamble)** —
pre-delete on clean HEAD (`0226d25`): server `tests/llm.test.ts` **8/8**,
`tests/llm-jobs.test.ts` **7/7**; client full suite **9 failed files / 6
failed tests / 108 passed** — all pre-existing (yjs/virtua module-resolution
collect failures in `store.test.ts`, `namespaces.test.ts`,
`chat-artifact.test.ts`, `vfs-commits.test.ts`, `smoke.test.ts`,
`UnknownNativeSurface.test.tsx`, `DraftBanner.test.tsx`,
`voice-in-chat.test.ts`, plus `gateway.test.ts` 6 failures); none
job-path-related (`run-transport.test.ts` 11/11, `lib/llm-jobs.test.ts` 4/4,
`sse.test.ts` 10/10, `useWidgetSelfHeal.test.ts` 9/9). Client typecheck
baseline: **87 errors**, sorted-hash `31e033ccc61d36d6bdac6cf89136e8b4`.
**PASS** under the captured baseline.

**(c) compatibility assessment** — the assessment above (this report, §9.4c)
remains accurate on the current tree: post-stream-8 chat (RunTransport) never
holds a job id; the 9.2-migrated widget-edit path (`streamChatCompletion`,
tools-proxy) never obtains one; `runChatCompletionJob` aliases
`streamChatCompletion` for the session-title/merge callers. Only a pre-9.2
client already mid-completion at deploy could hold a job id; with the route
gone it observes non-OK polls until the 5-minute poll timeout, then a
surfaced stream error. **Recorded.**

### Deletion performed

- Deleted: `server/workspace/src/llm-jobs.ts`,
  `server/workspace/tests/llm-jobs.test.ts`,
  `client/web/src/lib/llm-jobs.test.ts`,
  `client/web/src/lib/chat-transport.ts` (sole export `resilientChatFetch`,
  zero importers).
- `server/workspace/src/routes/llm.ts`: removed the llm-jobs import,
  job-record creation/persistence in `/chat` and `/completions`, the
  `x-llm-job` response header, and the `GET /jobs/:id` route (with its
  deprecation constant). Streaming behavior is unchanged:
  first-byte-immediately, keepalives, in-stream error frames.
  `createChatUiJobStream` → `createChatUiStream` (message id is a plain
  uuid), `createJobResponseStream` → `createCompletionSseStream`;
  `/completions` keeps its legacy `{jobId}` first frame purely as a message
  id for old clients' happy path.
- `client/web/src/lib/llm.ts`: removed `pollJobUntilTerminal`, its
  constants, and the local `LlmJobRecord` type; `runChatCompletionJob`
  alias retained for out-of-Touches callers.
- `server/workspace/tests/llm.test.ts`: removed the one test of the deleted
  resume behavior ("exposes the backing job id and persists the text for
  resume"); 7 remaining tests untouched.

### Residual-ref clearance (the §7 blockers)

1. `server/workspace/scripts/migrate-services-to-records.ts` — `llm-jobs`
   case removed as **dead**: it migrated `.services/llm-jobs` files into the
   `svc#llm-jobs` record scope, whose only reader was the deleted store.
2. `registry/docs/local-mode.md:55` — **not edited from the aprovan
   worktree**. Required registry-side one-line change:

   ```
   - | VCS, chat sessions, workflows, apps, agents, events, llm-jobs, webhooks, prompts | workspace FS | workspace FS | inherit the FS backend |
   + | VCS, chat sessions, workflows, apps, agents, events, webhooks, prompts | workspace FS | workspace FS | inherit the FS backend |
   ```

### Post-delete gates (verbatim results)

| Gate | Result |
| --- | --- |
| `grep -rn "llm-jobs\|x-llm-job\|readLlmJob\|writeLlmJob" $AAP/client $AAP/server` | **empty** (exit 1) |
| Same grep over `$REG` | only `docs/local-mode.md:55` (reported above) |
| `grep -rn "pollJobUntilTerminal\|resilientChatFetch" $AAP/client $AAP/server $REG` | **empty** (exit 1) |
| `pnpm -C server/workspace typecheck` | clean (`effect-completeness: ok (143 tools)`) |
| `vitest run tests/llm.test.ts` | **7/7 passed** |
| Client full suite | 9 failed files / 6 failed tests / **104 passed** — failing set byte-identical to baseline; delta is exactly the 4 deleted `llm-jobs.test.ts` tests |
| Client typecheck | **87 errors**, hash `31e033ccc61d36d6bdac6cf89136e8b4` — identical to baseline, no new errors |
