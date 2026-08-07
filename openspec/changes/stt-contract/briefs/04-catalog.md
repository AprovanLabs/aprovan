# Brief: STT catalog registration

## Mission
Add `stt` to `INTERFACE_ORDER` in registry-server catalog; assert session-mode operation is exposed and binding an unavailable entry fails with its declared reason.

## Read first
1. aprovan `openspec/changes/stt-contract/tasks.md` section 4
2. aprovan `openspec/changes/stt-contract/tech-plan.md`
3. registry `packages/registry-server/src/catalog/default.ts` and existing catalog tests
4. `@utdk/stt` compat (deepgram + assemblyai unavailable) already on registry main

## Depends-on
Streams 2–3 merged (Deepgram + AssemblyAI unavailable).

## Tasks
- [x] 4.1 Add `stt` to `INTERFACE_ORDER` so it sorts deliberately rather than alphabetically after the pre-instance set.
- [x] 4.2 Assert in tests that the loaded interface exposes a session-mode operation and that binding an unavailable entry fails with its declared reason.

## Verify
`pnpm --filter @aprovan/registry-server test`

## Constraints
Work in **registry** repo. Touches: `packages/registry-server/src/catalog/default.ts`, `packages/registry-server/src/catalog/__tests__/**`.
Bump `@aprovan/registry-server` patch if publish convention requires.
PR to registry main; check off aprovan tasks 4.1–4.2.
