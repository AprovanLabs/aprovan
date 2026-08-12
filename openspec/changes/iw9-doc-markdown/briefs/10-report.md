# Report: `document/fix-typos` agent profile (stream 10)

**Status:** done · **Branch:** `feat/iw9-doc-fix-typos` · **Worktree:**
`/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-doc-fix-typos`

## 10.0 CF-5 gate

Verified on `origin/main` (HEAD at stream-5 merge `#257`):

| Check | Result |
| --- | --- |
| `apps/manifest.ts` accepts `agents:` | yes |
| `agents/app-profiles.ts` `resolveAppProfile` | yes |
| `agents/service.ts` `ctx.appScope` run of `<slug>/<agent>` | allowed (not 403) |
| Stream 9 Document `app.yaml` (#254) | merged |
| Stream 5 reconcile (#257) | merged |
| iw9-d stream 10 / CF-5 | already on main |

No Document-local agent loop built; no edits to `agents/service.ts`.

## What shipped

1. **`Apps/document/app.yaml`** — `agents: [{ name: fix-typos, … }]` with
   tools `vfs.read` / `vfs.write` (⊆ `vfs.*` ceiling), prompt instructing
   read → correct → write, and `llm: { interface: llm, profile: fast }`.
2. **`Apps/document/agents/fix-typos.ts`** — constants
   (`FIX_TYPOS_AGENT`, prompt, tools) kept in sync with the manifest for
   tests and stream-11 host triggers.
3. **`tests/doc-fix-typos.test.ts`** — CF-5 declaration + non-403 run;
   live-doc merge through real `agents.run` → `vfs.write` → reconcile;
   non-live ordinary `store.write` (no `reconciled` field).

## Verify

```text
pnpm --filter @aprovan/workspace exec vitest run tests/doc-fix-typos.test.ts
# 4 passed
```

## Stream 11 — how to trigger the profile

```ts
await agentsService.call(appCtx, "run", {
  agent: "document/fix-typos", // FIX_TYPOS_AGENT
  input: `Fix typos in ${relativePath}`,
});
```

- App-scoped VFS remaps relative paths under `apps/document/`
  (`notes/x.md` → `apps/document/notes/x.md`). Live-doc identity is the
  **resolved** path — seed/`getOrLoadDoc` must use the same absolute path
  the write will hit.
- Workspace files outside the app root need `~/…` plus an app FS share
  (`appFsAllowed`); relative paths alone stay under the Document prefix.
- Scripted LLM fixture pattern: `vfs.read` then `vfs.write` with full
  corrected content (same as this stream's test). When `base` is omitted,
  reconcile uses FS materialized content (stream 5 deviation).

## Deviations

1. **Address is `document/fix-typos`, not colloquial `doc/fix-typos`.**
   CF-5 grammar is `<app-slug>/<agent>`; stream 9 shipped `slug: document`.
   PRD/task shorthand `doc/fix-typos` maps to this address. Yjs audit
   strings in stream 5 unit tests still say `doc/fix-typos` (free-form
   origin) — unrelated to the agents.run address.
2. **`llm.profile: fast`** pinned (matches Chat stream 5 / iw9-d examples).
   Tests create that named llm profile via `profiles.set`.
3. **No host-side read/write helpers beyond constants** — unlike Chat's
   `postSummaryMessage`, Document's write goes through `vfs.write` inside
   the loop so stream 5 reconcile is exercised directly.
4. **Touches:** only `Apps/document/**`,
   `server/workspace/tests/doc-fix-typos.test.ts`, plus this report and
   `tasks.md` 10.x checkoff (per brief Report back).

## Tasks

- [x] 10.0 CF-5 verify-landed
- [x] 10.1 Declare profile in `app.yaml`
- [x] 10.2 Prompt: vfs.read → correct → vfs.write
- [x] 10.3 Integration tests (live merge + non-live ordinary write)
