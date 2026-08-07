# Report: Deepgram STT driver + AssemblyAI unavailable (streams 2–3)

## Summary
Landed the Deepgram `StreamingSessionDriver` under `packages/utdk/deepgram/`, filled `compat.json` with bindable `deepgram` and unavailable `assemblyai`, and added `AUDIT.md` comparing the two vendor surfaces (D5). `@utdk/stt` is consumed via monorepo `workspace:*` — public npm packument for `@utdk/stt` is broken, so clients must not `pnpm add` it from the registry.

## PR
https://github.com/AprovanLabs/registry/pull/155

## Versions
| Package | Version |
|---|---|
| `@utdk/stt` | **0.1.2** |
| `@utdk/clients` | **0.1.2** |
| `@utdk/deepgram` (manifest under clients) | 0.1.0 |

## Changes
| File | Change |
|---|---|
| `packages/utdk/deepgram/index.ts` | `createDeepgramClient` / `SttDriver`: listen WS, PCM push, Results→partial/final, VAD events, Bearer→Token, reconnect after retryable drop |
| `packages/utdk/deepgram/__tests__/deepgram.test.ts` | Mock-socket unit tests + `runSttConformance("deepgram", …)` |
| `packages/utdk/deepgram/package.json` | Handwritten provider manifest (`interface: stt`) |
| `packages/contracts/stt/compat.json` | `deepgram` + `assemblyai` (`unavailable`) |
| `packages/contracts/stt/AUDIT.md` | Deepgram vs AssemblyAI surface audit (D5) |
| `packages/contracts/stt/package.json` | Bump 0.1.1 → 0.1.2; ship `AUDIT.md` in `files` |
| `packages/utdk/package.json` | Export `./deepgram`; deps `@utdk/stt`/`@utdk/common` `workspace:*`, `ws`; bump 0.1.2 |
| `packages/utdk/registry.json` | Catalogue entry for `deepgram` |

## Verify
```text
pnpm --filter @utdk/stt test                    # 18/18 pass
pnpm --filter @utdk/clients test:deepgram       # 7/7 pass (incl. conformance)
pnpm --filter @utdk/clients build               # pass
pnpm --filter @utdk/clients check-types         # no deepgram errors; 2 pre-existing (dynamodb-kv, slack/types)
```

## Notes for orchestrator
- Tasks **2.1–2.6** and **3.1–3.2** checked off in `tasks.md`.
- Worktree: `/tmp/registry-stt-dg` on `feat/stt-deepgram`.
- Do not rely on `pnpm add @utdk/stt` from npm until the packument is fixed; keep `workspace:*` inside this monorepo.
- Stream 4 can register `stt` in catalog `INTERFACE_ORDER` and assert unavailable binding.
