# iw9-doc-markdown — delegation waves

aprovan-only (no registry work). Wave 3 DOC flagship: Yjs live docs,
quiesce materialization, agent/CRDT reconciliation, managed Document app.

**Already on main (do not rebuild):** Chat + C; CF-5 app-scoped agent
profiles (`iw9-d` stream 10); `RunTransport`. Stream 10's CF-5 gate is open
— verify `agents/service.ts` no longer 403s `ctx.appScope` for
manifest-declared profiles, then proceed.

**External gates (still required where noted):**

| Stream | External | Why |
|--------|----------|-----|
| 3 | `iw9-f5-broker-spec` | async `NamespaceHandler.onSubscribe(): Promise<{body?}>` |
| 8 | `iw9-a-vcs-consolidation` | `MergeDialog` / `DiffViewer` / per-file `sessions.resolve` |
| 9 | `iw9-b-app-model` + `iw9-f4-app-identity` | `app.yaml` reconcile, managed-only install |
| 11 | `iw9-chat-flagship` stream 9 | reuse `e2e/fixtures/two-users.ts` |

See `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` and
`docs/decisions/0002-app-first-platform-invariants.md` (esp. 2, 7, 8, 9).

## Wave graph (Depends-on)

| Wave | Streams | Parallel? | Notes |
|------|---------|-----------|-------|
| **0** | **1, 9** | **yes** | Deps none. 9 also needs B+F4 landed. Touches disjoint. |
| 1 | 2, 6 | after 1 | Registry/persistence ‖ CollabMarkdownEditor. Disjoint. |
| 2 | 3, 5 | after 2 | `doc` namespace (F5-gated) ‖ reconcile hook. Disjoint. |
| 3 | 4, 7, 10 | after 2+3 / 1+3+6 / 5+9 | Quiesce+auth ‖ client store ‖ `doc/fix-typos` (CF-5 open). Disjoint. |
| 4 | 8, 12 | after 5+7 / 4+9 | Conflict banner (A-gated) ‖ integration tests. Disjoint. |
| 5 | 11 | after 6+7+8 | Playwright E2E (needs chat harness). |

## Wave-0 dispatchable now

**1** — yjs deps (no external gate).

**9** — only if `iw9-b` + `iw9-f4` are on main; otherwise hold.

## tasks.md fixes applied while briefing

1. Stream **7** `Depends-on` was `1, 3` but task 7.2 wires `CollabMarkdownEditor`
   from stream 6 → set to **`1, 3, 6`** so 7 cannot race 6.
2. Stream **10** `Depends-on` was `9` but tasks 10.2–10.3 exercise stream 5
   reconciliation against a live doc → set to **`5, 9`**.

## Touches audit (parallel waves)

| Wave | Check |
|------|-------|
| 0 | 1 (`package.json`+lock) vs 9 (`Apps/document/app.yaml`, `DocumentAppTile`) — OK |
| 1 | 2 (`doc/registry|persistence`) vs 6 (`CollabMarkdownEditor`+`yjs-cm6`) — OK |
| 2 | 3 (`protocol`, `doc-namespace`, `socket`) vs 5 (`reconcile`, `services`, `routes/fs`) — OK |
| 3 | 4 (`doc-namespace`, `quiesce`) vs 7 (`features/document/*`, `tabs/**`) vs 10 (`Apps/document/**`) — OK |
| 4 | 8 (`DraftBanner`, `useDocumentSession`) vs 12 (`doc-integration.test.ts`) — OK |

Sequential overlaps (expected, not parallel): 3⊂4 (`doc-namespace*`),
7⊂8 (`useDocumentSession.ts`), 9⊂10 (`Apps/document/**`).
