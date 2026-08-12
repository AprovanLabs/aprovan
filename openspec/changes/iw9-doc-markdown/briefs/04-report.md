# Report: Server — join auth + quiesce materialization (Stream 4)

**PR:** https://github.com/AprovanLabs/aprovan/pull/261

## What was built

| Piece | Role |
| --- | --- |
| `doc/quiesce.ts` | `materialize` / `materializeAndFlush`; idle + max-interval timers (`DOC_QUIESCE`); `noteDocActivity` / `armQuiesceTimers` |
| `doc/doc-namespace.ts` | Join gate: refuse empty/`anonymous` `userId`; `assertPathGranted` + `assertPartitionAccess` before load; arm timers on subscribe; `noteDocActivity` after applied sync updates |
| `doc/registry.ts` | `releaseDoc` clears timers → `materializeAndFlush` → destroy (stream 2 was memory-only) |
| `tests/doc-quiesce.test.ts` | Idle / max-interval / mid-session plain Markdown / release materialize |
| `tests/doc-namespace.test.ts` | Anonymous refuse + foreign-partition join deny |

Defaults: idle **5s**, max-interval **30s** (overridable via `DOC_QUIESCE.*` for tests). Quiesce writes are plain `getFsStore().write` — no session, no VCS commit (D5).

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/doc-quiesce.test.ts tests/doc-namespace.test.ts
```

Also green: `tests/doc-registry.test.ts` + `tests/doc-persistence.test.ts` (24 total). Typecheck ok.

## Deviations

See `briefs/deviations.md` (stream 4 section).

## Notes for next wave

- **Stream 7**: join failures arrive as `{ type: "error", code: "bad-topic" }` (anonymous / partition deny). Client should not treat that as a reconnect loop.
- **Stream 8**: `forceMaterializeAndCommit` is not implemented here — add beside `materialize` when wiring Save.
- **Stream 5**: agent `Y.Doc.transact` writes should also call `noteDocActivity` so quiesce bounds agent-only edits; today only realtime `onPublish` updates arm idle.
- Idle/max timers force a durable compact after each materialize so snapshot `fileHash` matches the FS write (stream 2 note). D6 preferred not to compact on every quiesce; correctness won.
