# iw9-chat-flagship — delegation waves

aprovan-only. Builds on F2 + F5 (landed). Blocks on iw9-b (manifest/install)
and iw9-d for streams 4–5. **iw9-c is parallel** — no Chat stream depends
on it.

**Already on main:** iw9-d stream 10 (CF-5 app-scoped profiles) — Chat
stream 5.1 gate is open. iw9-d stream 8 (`RunTransport` default) is on
main — do not rebuild.

See `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` and
`docs/decisions/0002-app-first-platform-invariants.md` (esp. 4, 5, 7, 9, 10).

## Wave graph (Depends-on)

| Wave | Streams | Parallel? | Notes |
|------|---------|-----------|-------|
| **0** | **1, 3, 6, 9** | **yes** | Touches disjoint after tasks.md fix: 6 owns `package.json` (virtua + `@playwright/test`); 9 owns playwright config + fixtures only. |
| 1 | 2, 4 | after 1 | 2=CF-1 realtime; 4=`app.yaml`. Disjoint. 4 also needs iw9-b landed. |
| 2 | 5, 7 | after 1+4 / 1+2+6 | 5=`chat/summarize` (needs D CF-5 — **already on main**); 7=timeline UI. Disjoint. |
| 3 | 8, 10 | after 3+4+7 / 4+7+9 | Guest UX vs managed E2E. Disjoint. |
| 4 | 11 | after 3+4+8+9 | Hosted guest E2E. |
| 5 | 12 | after 2+7+9+10+11 | Presence + invariant-7 close-out. |

## Wave-0 dispatchable now

**1, 3, 6, 9** — all `Depends-on: -`, Touches verified disjoint:

- 1 → `server/workspace/src/apps/chat/**` + `tests/chat-data-model.test.ts`
- 3 → `invites.ts`, `identity/{types,store}.ts`, `routes/invites.ts` + invite tests
- 6 → `vendor/buzz-timeline/**`, NOTICE, virtua patch, **both** package.json files + lockfile
- 9 → `playwright.config.ts`, `e2e/fixtures/**`, `e2e/README.md` (no package.json)

If stream 9 starts before 6 merges, `@playwright/test` may be missing —
stop and report; do not edit package.json in stream 9.
