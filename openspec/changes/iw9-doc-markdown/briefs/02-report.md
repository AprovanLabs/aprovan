# Report: Server — live-doc registry + durable persistence (Stream 2)

## What was built

Process-local live-doc substrate under `server/workspace/src/doc/`:

| Export | Module | Role |
| --- | --- | --- |
| `docKey`, `LiveDoc`, `getOrLoadDoc`, `releaseDoc`, `hasLiveDoc` | `registry.ts` | Private `Map<docKey, LiveDoc>`; load-on-miss via `loadDurable`; no `broker.storeFor` / `NamespaceStore` (D2) |
| `loadDurable`, `appendUpdate`, `compactIfDue`, `DOC_COMPACT` | `persistence.ts` | `svc#doc#snapshot` + `svc#doc#updates#<docKey>` via svc-records (D4); size/age compaction (D6); file-hash restore gate |

Body text lives in `doc.getText("content")`. Snapshot records store `{ data: base64, updatedAt, fileHash? }`; update log rows are `seqKey`-ordered `{ data, createdAt }`.

Also added direct `yjs@13.6.32` and `y-protocols@1.0.7` deps on `@aprovan/workspace` (pnpm isolation — editor deps are not importable from the workspace package).

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/doc-registry.test.ts tests/doc-persistence.test.ts && pnpm --filter @aprovan/workspace typecheck
```

- Vitest: **11 passed** (5 registry + 6 persistence)
- Typecheck: **ok** (effect-completeness 137 tools)

## Deviations

1. **`server/workspace/package.json` + lockfile** — brief said touch only the four doc files; without declaring `yjs`/`y-protocols` on `@aprovan/workspace`, imports fail under pnpm. Stream 1's note that server could import from editor's graph does not hold with pnpm isolation.
2. **`DOC_COMPACT` mutable object** — ESM/Vitest cannot assign to `export let` live bindings; tests mutate `DOC_COMPACT.SIZE_BYTES` / `AGE_MS`. Frozen `DOC_COMPACT_SIZE_BYTES` / `DOC_COMPACT_AGE_MS` remain as the tech-plan default names.
3. **`appendUpdate` accepts `Uint8Array | readonly Uint8Array[]`** — tech-plan signature is singular; brief asked for batching when the caller passes multiple. One svc-record per update either way.
4. **`releaseDoc` is memory-only** — drops Awareness/`Y.Doc` and the Map entry. Stream 4 owns quiesce-materialize + durable flush before drop.

## Notes for next wave

- **Streams 3/5**: import `docKey`, `getOrLoadDoc`, `releaseDoc`, `hasLiveDoc` from `../doc/registry.js` (or `src/doc/registry.ts`). `hasLiveDoc` is the reconcile gate (D7).
- **Stream 4**: on materialize, rewrite the snapshot's `fileHash` to the post-write FS hash — otherwise the next cold load treats a quiesced write as an external restore and re-inits from the file (dropping CRDT history that matches the file).
- **Stream 4**: extend `releaseDoc` to materialize + flush durable state before destroying the live replica.
- Compaction is on-demand (`compactIfDue`); no background timer yet — stream 3/4 can schedule it.
- No realtime namespace registered (stream 3).
