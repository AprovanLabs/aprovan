# Report: Server — agent-write reconciliation (Stream 5)

## What was built

| Export / hook | Module | Role |
| --- | --- | --- |
| `reconcileOrPassThrough`, `deriveDiffBlocks`, `matchDiffBlock` | `doc/reconcile.ts` | Gate on `hasLiveDoc`; line Myers → `DiffBlock[]`; exact+fuzzy match (mirrors `diff.ts`); one attributed `Y.Doc.transact`; durable `appendUpdate`; conflict → staged session + `sessionWrite` (D3) |
| `vfs.write` | `services.ts` | Calls reconcile after grant/partition/mount checks, before staged/`store.write` (D7) |
| `PUT /fs/*` | `routes/fs.ts` | Same choke-point hook; optional body `base` |

`ReconcileResult`: `not-live` | `applied` | `conflict{sessionId, appliedBlocks, failed[]}`.
Yjs origin: `{ userId, agentProfile?, app? }`.

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/doc-reconcile.test.ts
pnpm --filter @aprovan/workspace exec vitest run tests/vfs-vcs-split.test.ts tests/partition-access.test.ts
pnpm --filter @aprovan/workspace typecheck
```

- `doc-reconcile.test.ts`: **5 passed**
- vfs regression stand-ins (`vfs.test.ts` absent on main): **21 passed**
- typecheck: **ok** (effect-completeness 137 tools)

## Deviations

1. **`applyDiffs` vendored into `reconcile.ts`** — `@aprovan/editor` is not a workspace dep (pnpm isolation; React-heavy). Matching logic copied from `diff.ts` `applyDiffs`/`applyFuzzyDiff`; source file untouched.
2. **`tests/vfs.test.ts` missing** — verify command names it; not present on `main`. Ran `vfs-vcs-split` + `partition-access` instead.
3. **Conflict stages full agent `content`** — intact whole-file write into the overlay (merge UI gets live vs agent file), not a failed-hunk-only patch.
4. **`base` optional** — when omitted, FS materialized content is used (agent `vfs.read` mid-session reads FS, not live Y.Text).

## Notes for next wave

- **Conflict `sessionId`**: UUID string from `createSession` / flipped `explicitSessionId`. Overlay key = VFS path; value = content hash. Stream 8 banner / MergeDialog should load via `sessionRead(ws, session, path)` vs live doc text.
- **Return shape** (tool + HTTP): `{ path, reconciled: true, appliedBlocks }` or `{ …, conflict: true, sessionId, failed }`. Not a normal `{ hash, size, … }` FS meta — stream 10 agent UX should branch on `reconciled`/`conflict`.
- **`native-dispatch.ts` still unhooked** (D7 known gap).
- Matched blocks apply even when siblings conflict; draft holds full agent content for resolution.
