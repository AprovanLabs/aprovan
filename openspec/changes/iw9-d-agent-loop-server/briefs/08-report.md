# Report — Stream 8: Parity checklist, flag flip, legacy-loop deletion

**PR:** (filled after `gh pr create`)
**Base:** `origin/main` @ `c8c5159` (`fix(web): type self-heal test mock for ChatTurnRequest` / #222)

## Verify

```bash
pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/patchwork-web typecheck && test -d /Users/jacob/Documents/Code/AprovanLabs/registry && ! grep -rn "TOOL_PROMPT_CAP_PER_NAMESPACE\|formatToolSignatures" <worktree>/client <worktree>/server /Users/jacob/Documents/Code/AprovanLabs/registry
```

| Check | Result |
| --- | --- |
| `pnpm --filter @aprovan/patchwork-web test` | **125/125 passed** (15 files), including stream 7 self-heal suite (9) and parity extensions |
| `pnpm --filter @aprovan/patchwork-web typecheck` | clean |
| `test -d …/registry` | exists |
| grep gate (worktree client+server + registry) | **no matches** |

### Grep gate (verbatim)

```
$ test -d /Users/jacob/Documents/Code/AprovanLabs/registry && ! grep -rn "TOOL_PROMPT_CAP_PER_NAMESPACE\|formatToolSignatures" \
  /Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-d-parity-flip/client \
  /Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-d-parity-flip/server \
  /Users/jacob/Documents/Code/AprovanLabs/registry
# exit 0 — no matches
```

## Parity checklist (8.1–8.6)

| Task | Evidence |
| --- | --- |
| **8.1** model/provider picker | `chat-artifact.test.ts` — same `RunTransport` instance; second send posts switched `provider`/`model` from refs |
| **8.2** file context | Same file — `buildContextFiles` set equals `ChatTurnRequest.contextFiles` posted by `RunTransport` |
| **8.3** widget fences | Same file — one buffered `assistant_delta` → text-delta → `extractVisibleWidgetBlocks` + `shouldMountAsWidget`; **not** token-wise (stream 2) |
| **8.4** self-heal bounds | Full suite re-run after flip: `useWidgetSelfHeal.test.ts` **9/9 passed** |
| **8.5** session sync / reload | `createRunUIMessageStream` from `activeRunId` at `from=0`; orchestration calls `chat.resumeStream()` when `info.activeRunId` set; session-record outcome asserted without client writer |
| **8.6** read-only guard | Gate formula (`status !== "open"`) + submit short-circuit before network asserted in parity test; `useChatSubmit.ts:149` unchanged |

## What was deleted / flipped

| Change | Detail |
| --- | --- |
| **8.7** flag flip | `ChatPage.tsx` always uses `useRunTransport`; dual-path / `USE_RUN_TRANSPORT` branch removed from the page |
| **8.8** legacy transport | Deleted `DefaultChatTransport` usage, `formatToolSignatures`, `TOOL_PROMPT_CAP_PER_NAMESPACE`, and `useChatTransport` from `chat-transport.ts`. **`useEditTransport` kept** (stream 9) |
| **8.9** grep gate | Empty across worktree client/server + registry |
| **8.10** client transcript writer | Removed `appendSessionMessages` / `lastPersistedCountRef`-gated persistence from `useSessionChatSync.ts`; kept staged-change refresh, cross-window sync, and auto-title |

## Deviations

1. **`USE_RUN_TRANSPORT` constant remains in `run-transport.ts`** — that file is outside stream 8 Touches. Product path no longer reads it (ChatPage always uses RunTransport). Cleaning the dead export is a tiny follow-up outside this stream's file list.
2. **Buffered LLM → one `assistant_delta` per turn** (stream 2) — 8.3 asserts one text-delta + fence mount, not token-level incremental deltas.
3. **Parity tests live in `chat-artifact.test.ts`** (brief Constraints) rather than new files (tasks preamble convention) — stream-specific constraint wins.
4. **`activeRunId` resume** is wired via a thin `transportWithResume` wrapper in `useSessionOrchestration` (Touches-allowed) calling `createRunUIMessageStream`, because `RunTransport.reconnectToStream` only knows in-memory `lastRun` and `run-transport.ts` is out of Touches.
5. **Self-heal test still mocks `USE_RUN_TRANSPORT: false`** — harmless leftover; heal path uses `startChatTurnStream` directly (stream 7). Test file not in Touches.
