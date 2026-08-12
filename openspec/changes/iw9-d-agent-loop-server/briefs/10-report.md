# Stream 10 report — App-scoped agent profiles (CF-5)

## Serialization facts (pre-start)

Confirmed before coding:

1. **iw9-f4 landed** — `server/workspace/src/apps/manifest.ts` exists on
   `origin/main` in its final Zod-over-YAML shape (`.strict()`,
   `loadAppYaml`).
2. **No iw9-b stream touches `apps/manifest.ts`** — grep of
   `openspec/changes/iw9-b-app-model` found no Touches/references that edit
   that file. No deviation recorded.

## `agents:` grammar as shipped

Additive optional top-level key on `AppYamlSchema` (still `.strict()`):

```yaml
agents:
  - name: summarize            # NAME_RE: ^[a-z0-9][a-z0-9-]{0,63}$
    description: ...           # optional → AgentProfile.title
    prompt: ...                # optional string
    llm:                       # optional; .strict()
      interface: llm
      profile: fast            # optional
    tools: ["chat.messages.*"] # required; each pattern must be ⊆ capabilities
```

Parse-time rejection when a tool pattern is not covered by
`capabilities` (empty ceiling if absent): issue path
`agents.<i>.tools.<j>`, message names both the offending pattern and the
ceiling JSON. Unknown top-level keys still rejected (F4 suite green).

Addressed at run time as `<app-slug>/<name>` (e.g. `chat/summarize`,
`doc/fix-typos`).

## `ctx.appScope` gate — before / after

**Before (every non-read):**

```ts
if (ctx.appScope) {
  if (get|list|runs|getRun) { /* ok */ }
  else throw ServiceError("Apps cannot manage or run agent profiles", 403);
}
```

**After:**

```ts
if (ctx.appScope) {
  if (get|list|runs|getRun) { /* ok — unchanged */ }
  else if (procedure === "run") {
    // allow only <own-slug>/<agent> that resolveAppProfile returns
    if (!resolved) throw ServiceError("Apps cannot manage or run agent profiles", 403);
  } else {
    throw ServiceError("Apps cannot manage or run agent profiles", 403);
  }
}
```

Widened **exactly one** case: `run` of the calling app's own
manifest-declared `<slug>/<agent>`. All other `run`s and all
`create`/`update`/`delete` keep the existing 403 and message. Comment
extended to state why the widening is safe (person-authored declaration;
invariant 11).

## Three-way intersection

Computed inside `renderAgentRun` when `profile.app` is set (same rendering
path as workspace runs — no new path):

```
effective tools = declared.tools ∩ app.allowedTools ∩ (invoker ctx.grants.tools | *)
```

Helpers: `patternCoversPattern` / `intersectToolPatterns` /
`intersectAppRunTools` in `agents/app-profiles.ts` (and ceiling check in
`apps/manifest.ts`). Absent invoker tools = permissive identity `*`.
Result becomes both the runner's pattern list and `runCtx.grants.tools`.
Runner pattern-list bound and `invokeTool`'s `ctx.grants` re-check were
**not** modified.

Attribution: `runCtx.userId` stays the invoker (principal/payer);
`metadata.agent` + `metadata.app: { appId, slug }` are the via-path.

## Resolver

`resolveAppProfile(workspaceId, appId, name)` reads
`AppRecord.declared.agents`, matches short `name`, returns in-memory
`AgentProfile` with `app` provenance and `grants.tools = declared tools`.
No stored registration. Removed declaration → `undefined` → gate 403.

## Baselines

Captured on worktree HEAD from `origin/main` before edits:

| Suite | Baseline | After |
| --- | --- | --- |
| `tests/app-manifest.test.ts` | 25 passed | 25 passed (must stay green) |
| `tests/agent-run.test.ts` | 5 failed / 0 passed | 5 failed / 0 passed (no new failures) |
| `tests/agent-app-profiles.test.ts` | n/a | **9 passed / 0 failed** |
| `pnpm --filter @aprovan/workspace typecheck` | n/a | clean |

## Flagship gates (task 10.7)

- **`iw9-chat-flagship` 5.1** names `iw9-d-agent-loop-server` stream 10 and
  requires: `agents:` block, `resolveAppProfile`, `agents.run` for own
  `<slug>/<agent>`, `create`/`update` stay 403. **Satisfied** by this
  landing — Chat may proceed to declare `chat/summarize`.
- **`iw9-doc-markdown` 10.0** names the same stream and requires the
  `appScope` block to stop 403ing a manifest-declared profile and
  `app.yaml` to accept `agents:`. **Satisfied** — Doc may proceed to
  declare `doc/fix-typos`.

No mismatch / blocker against those changes.

## Deviations

None. Touches stayed within the stream-10 allow-list. Serialization facts
held. No runner / `invokeTool` grant-path edits.
