# Report: STT catalog registration (stream 4)

## Summary
Registered `stt` in registry-server catalog `INTERFACE_ORDER`, added tests for session-mode `open` and AssemblyAI unavailable bind refusal, and bumped `@aprovan/registry-server` to **0.2.9**.

## PR
https://github.com/AprovanLabs/registry/pull/156

## Version
| Package | Version |
|---|---|
| `@aprovan/registry-server` | **0.2.9** |

## Changes
| File | Change |
|---|---|
| `packages/registry-server/src/catalog/default.ts` | `INTERFACE_ORDER` += `"stt"` (after `agent`) |
| `packages/registry-server/tests/catalog-stt.test.ts` | Order, `sttToolEntries` `streaming: "session"`, assemblyai 501 reason |
| `packages/registry-server/tests/catalog.test.ts` | Smoke that `stt` loads with `open` + unavailable compat |
| `packages/registry-server/package.json` | `0.2.8` → `0.2.9`; dep `@utdk/stt` |
| `packages/registry-server/vitest.config.ts` | Aliases for `@utdk/stt` + `@utdk/common/streaming` |
| `packages/registry-server/tsconfig.json` | Exclude `src/**/__tests__` from publish build |
| `pnpm-lock.yaml` | Link `@utdk/stt` into registry-server |

## Verify
```text
pnpm --filter @aprovan/registry-server exec vitest run \
  tests/catalog-stt.test.ts tests/catalog.test.ts   # 10/10 pass
pnpm --filter @aprovan/registry-server build         # pass
```

Full `pnpm --filter @aprovan/registry-server test`: 4 failures pre-existing on `origin/main` (dispatch default-profile cases; sandbox error-string shape in `server.test`).

## Notes for orchestrator
- Tasks **4.1–4.2** checked off in `tasks.md` / brief.
- Worktree: `/tmp/registry-stt-catalog` on `feat/stt-catalog`.
- Tests live under `tests/catalog-stt.test.ts` (not `src/catalog/__tests__`) so `tsc` `rootDir: src` does not pull `tests/helpers` into the build.
- Stream 5 can depend on catalog order + unavailable bind without further registry-server catalog work.
