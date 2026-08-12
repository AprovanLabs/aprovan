# Report: Client — conflict banner into iw9-a's merge surface (Stream 8)

## What was built

| Piece | Role |
| --- | --- |
| `features/document/DraftBanner.tsx` | Persistent banner when a staged session touches the path; Review → iw9-a `MergeDialog`; Discard → close without stage |
| `features/document/useDocumentSession.ts` | Polls `sessions.list` for open staged sessions on this path; exposes `draftSession` / `refreshDraft` / `discardDraft`; `applyLiveContent` (one Yjs txn) + `forceMaterializeAndCommit` (`vcs.commit` `Save: ${path}`) |
| `features/tabs/DocumentCollabTab.tsx` | Mounts `DraftBanner` above the presence row (required for the banner to appear) |
| `features/document/index.ts` | Exports DraftBanner + helpers |
| `__tests__/DraftBanner.test.tsx` | Banner appear/hide, live apply txn, Save commit, discard no-mutation, resolve shape |

Resolve flow: MergeDialog (`applyOnConfirm`) runs `sessions.resolve` → FS gets chosen content via `store.write` → banner applies that text to live `Y.Text("content")` in one transaction → `forceMaterializeAndCommit` → `vcs.commit(`Save: ${path}`)`.

### Test hooks (stream 11)

- `data-testid="doc-draft-banner"` (+ `data-session-id`)
- `data-testid="doc-draft-review"`
- `data-testid="doc-draft-discard"`

## Verify

```bash
pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/patchwork-web typecheck
```

- Vitest: **170 passed** (incl. 8 new DraftBanner tests)
- Typecheck: **ok**

## Deviations

1. **`DocumentCollabTab.tsx` + `index.ts` + tests + tasks/report** — outside the two-path allowlist; required to mount the banner, export it, and satisfy Report back / 8.4.
2. **Server `forceMaterializeAndCommit` still absent** — tech-plan places it beside `materialize` in `doc/quiesce.ts` (stream 4 deferred it here). Client half is `commitVersion(`Save: ${path}`)`; FS write comes from `sessions.resolve` apply (`store.write`, bypasses reconcile). Full server `materialize()` + `commitTree` under that name is still a follow-up if a dedicated Save RPC is needed outside conflict resolve.
3. **Discard closes the session** (`closeChatSession` without stage) rather than flip `mode → auto` — overlay never applied; matches chat's discard-session flow. Spec "restore `auto`" is satisfied by removing the staged open session (banner clears); no mode flip on a closed record.
4. **Draft detection via poll** (`sessions.list` every 4s) — no push/notification hook for doc conflicts yet.

## Notes for next wave

- Stream 11 E2E: open a live `.md`, force a conflict draft (stream 5), assert `doc-draft-banner`, Review → MergeDialog, Discard leaves live text unchanged.
- If Save is needed without going through MergeDialog, implement server `forceMaterializeAndCommit` + a thin tool/HTTP surface and point the client helper at it.
- Polling can be replaced by a change-feed / notification once doc conflicts emit one.
