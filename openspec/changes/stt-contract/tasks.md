## 1. The `@utdk/stt` contract package

> Depends-on: - | Touches: registry/packages/contracts/stt/** | Verify: `pnpm --filter @utdk/stt test && pnpm --filter @utdk/stt check-types`

- [ ] 1.1 Scaffold the package alongside the other contracts: `index.ts`, `compat.json`, `tsconfig.json`, `__tests__/`, `package.json` with `utdk.contract: "stt"` and `handwritten: true`.
- [ ] 1.2 Declare the types exactly as in the tech plan's Interfaces & Data: `SttCapabilities`, `SttOpenArgs`, `SttPushMessage`, `SttWord`, `SttSegment`, `SttEvent`, `SttResult`, `SttError`, `REQUIRED_ENCODING`.
- [ ] 1.3 Implement open-argument validation: reject a requested capability the descriptor does not declare, and reject an unadvertised encoding, both naming what was asked and what is supported (D2, D4).
- [ ] 1.4 Add `sttToolEntries()` following the `sandboxToolEntries` pattern, declaring `open` with streaming mode `"session"`.
- [ ] 1.5 Write the module header in the house style: what the contract is, why diarization is a capability rather than an operation, and that providers never capture audio.
- [ ] 1.6 Tests for every validation branch, plus a conformance suite a provider module can run against itself.

## 2. Deepgram provider module

> Depends-on: 1 | Touches: registry/packages/utdk/deepgram/**, registry/packages/contracts/stt/compat.json | Verify: `pnpm --filter @utdk/clients build && pnpm --filter @utdk/clients check-types`

- [ ] 2.1 Implement `StreamingSessionDriver` over Deepgram's streaming API: hold the vendor socket inside the driver, translate `push` to vendor frames and vendor messages to `SessionEvent`s.
- [ ] 2.2 Publish a capability descriptor reflecting what Deepgram actually supports — diarization, word timestamps, VAD, language list — rather than the contract's full surface.
- [ ] 2.3 Map a dropped upstream connection to an `error` event with `retryable: true`, leaving the session active (spec: "Recoverable provider errors do not end the session").
- [ ] 2.4 Take the secret from the standard `Authorization: Bearer …` header injection, as every other provider does.
- [ ] 2.5 Add the `deepgram` entry to `compat.json`.
- [ ] 2.6 Run the conformance suite from 1.6 against this module.

## 3. Second provider shape, declared unavailable

> Depends-on: 1 | Touches: registry/packages/contracts/stt/compat.json, registry/packages/contracts/stt/AUDIT.md | Verify: `pnpm --filter @utdk/stt test`

- [ ] 3.1 Add the `assemblyai` entry with an `unavailable` reason, following the `agent` contract's precedent.
- [ ] 3.2 Record in `AUDIT.md` where AssemblyAI's surface differs from Deepgram's and which contract choices those differences drove — this is the evidence that the contract was not shaped by one vendor (D5).

## 4. Catalog registration

> Depends-on: 2 | Touches: registry/packages/registry-server/src/catalog/default.ts, registry/packages/registry-server/src/catalog/__tests__/** | Verify: `pnpm --filter @aprovan/registry-server test`

- [ ] 4.1 Add `stt` to `INTERFACE_ORDER` so it sorts deliberately rather than alphabetically after the pre-instance set.
- [ ] 4.2 Assert in tests that the loaded interface exposes a session-mode operation and that binding an unavailable entry fails with its declared reason.

## 5. Workspace integration and docs

> Depends-on: 4 | Touches: server/workspace/package.json, server/workspace/src/interfaces.ts, docs/stt.md, docs/index.md | Verify: `pnpm --filter @aprovan/workspace test && pnpm check-types`

- [ ] 5.1 Add `@utdk/stt` to the workspace's dependencies and confirm the interface resolves through the existing interface→provider path with no bespoke branch.
- [ ] 5.2 End-to-end test against a fake driver: open, push three chunks, receive partials and one final, close, assert the terminal result.
- [ ] 5.3 Write `docs/stt.md` stating the required encoding, that `final` is per-segment and not end-of-session, and that speaker ids are session-scoped — the three things a caller is most likely to assume wrongly.
- [ ] 5.4 Link it from `docs/index.md`.
