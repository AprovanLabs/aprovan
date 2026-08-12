# Report: `chat/summarize` agent profile (stream 5)

**Status:** done · **Branch:** `feat/iw9-chat-summarize` · **Worktree:**
`/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-chat-summarize`

## 5.1 CF-5 gate

Verified on `origin/main` (HEAD at stream-4 merge `#230`):

| Check | Result |
| --- | --- |
| `apps/manifest.ts` accepts `agents:` | yes |
| `agents/app-profiles.ts` `resolveAppProfile` | yes |
| `tests/agent-app-profiles.test.ts` | present; declared `<slug>/<agent>` runs; create/update stay 403 |
| iw9-d stream 10 / CF-5 (#220) | landed |

No Chat-local agent loop built.

## What shipped

1. **`Apps/chat/app.yaml`** — `agents: [{ name: summarize, … }]` with
   tools `records.get` / `records.list` (⊆ `records.*` ceiling), prompt,
   and `llm: { interface: llm, profile: fast }`.
2. **`Apps/chat/agents/summarize.ts`** — host seams around `agents.run`:
   `readMessagesForSummarize` (`canReadChannel` via `fetchWindow`) and
   `postSummaryMessage` (`postMessage` +
   `agent: { profile: "chat/summarize", invoker }`).
3. **`tests/chat-summarize-agent.test.ts`** — guest channel isolation,
   out-of-grant `tool_denied`, invoker/app provenance on the run, agent
   marker on the posted summary.

## Verify

```text
pnpm --filter @aprovan/workspace exec vitest run tests/chat-summarize-agent.test.ts
# 5 passed
pnpm --filter @aprovan/workspace exec vitest run tests/chat-app-manifest.test.ts
# 3 passed (ceiling unchanged; agents additive)
```

## Attribution / billing (5.3)

No Chat-local billing. Runs go through `agents.run`; `runCtx.userId` is the
invoker (D22); `meta.agent` + `meta.app` are the via-path (D15). Approvals
would route on the same invoker context when iw9-c lands.

## Deviations

1. **Tool patterns are `records.get` / `records.list`**, not the tech-plan
   illustrative `chat.messages.*` — Chat's capability ceiling is
   `records.*` (stream 4), and CF-5 parse rejects tools outside the
   ceiling. The canReadChannel-gated read + attributed write live in
   `summarize.ts` (host posts the summary after the run).
2. **`llm.profile: fast`** pinned in the declaration (matches iw9-d
   tech-plan example). Workspace must provide that named llm profile
   (or retarget the pin); tests create it via `profiles.set`.
3. Host modes remain F4 enum labels `managed` / `creator-hosted` (stream 4
   deviation from brief's workspace-managed labels) — unchanged here.

## Tasks

- [x] 5.1 CF-5 verify-landed
- [x] 5.2 Declare `chat/summarize` in `app.yaml`
- [x] 5.3 Invoker attribution via `agents.run` (no Chat billing path)
- [x] 5.4 `postSummaryMessage` → `postMessage` with agent marker
- [x] 5.5 `tests/chat-summarize-agent.test.ts`
