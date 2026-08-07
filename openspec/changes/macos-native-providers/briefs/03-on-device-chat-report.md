# Report: On-device chat provider (stream 3)

## What was built

### aprovan (`native/macos-helper`)
- New **`ChatCompletions`** SPM target:
  - OpenAI shapes matching `@utdk/llm` (`chat.completion`, `chat.completion.chunk`, model list)
  - `OnDeviceChatEngine` protocol + `UnavailableChatEngine` + `#if canImport(FoundationModels)` backend
  - `ChatCompletionsService` for non-streaming JSON and SSE streaming (`data: …` / `[DONE]`)
- **HTTP** (additive): POST body parsing; `POST /v1/chat/completions`; `GET /v1/models`
- **`/availability` llm probe**: OS floor → unsupported; otherwise disabled (or available when FoundationModels is linkable and ready)
- Workspace `CHAT_PROVIDERS` gains `apple` (loopback `http://127.0.0.1:0/v1`) so the picker stays aligned with the registry catalog

### registry ([PR #157](https://github.com/AprovanLabs/registry/pull/157))
- `@utdk/common@0.1.3`: enumerated `availabilityProbe` (`helper:llm` only)
- `@aprovan/registry-server@0.2.10`: Apple `CHAT_PROVIDERS` entry (`credentialless`, `availabilityProbe`), bind/resolve refusal via host `runAvailabilityProbe`
- Tests assert no `@utdk/llm` contract shape/dispatch change

## Verify

```
# registry
pnpm --filter @utdk/common test
pnpm --filter @aprovan/registry-server exec vitest run tests/catalog-apple-llm.test.ts

# aprovan
swift test --package-path native/macos-helper   # 11 passed
```

## Spec coverage (`native-llm-provider`)

| Scenario | Covered by |
| --- | --- |
| On-device model appears alongside hosted models | Apple in registry `CHAT_PROVIDERS` + workspace `llm.ts` |
| Chat completion on device | Swift stub/HTTP tests; FoundationModels when SDK links |
| Model listing | `GET /v1/models` + unit test |
| No contract change | `catalog-apple-llm.test.ts` asserts `@utdk/llm` index unchanged |
| Swapping providers is a binding change | Same `module: "openai"` / OpenAI shapes |
| Unsupported OS | `llmCapability(majorVersion: 14)` → unsupported |
| Feature disabled | macOS 26+ → disabled + remedy (or available with FM) |
| Binding unavailable fails loudly | Registry create/resolve 501 with probe reason |

## Deviations / follow-ups

- Current Xcode SDK (`MacOSX15.1`) cannot `import FoundationModels`; production helper reports **disabled** until built with an SDK that includes the framework. Completions still speak OpenAI shapes via the injectable engine.
- Desktop must set `LLM_APPLE_BASE_URL=http://127.0.0.1:<helperPort>/v1` and pass `runAvailabilityProbe` that GETs helper `/availability` → `capabilities.llm` when embedding the registry. Not wired in this stream (brief scope = helper + registry catalog).
- Publish of `@utdk/common@0.1.3` / `@aprovan/registry-server@0.2.10` runs on registry `main` via `.github/workflows/publish.yml` after PR merge.

## Next wave needs to know

- Probe id: `helper:llm` (capability key in `/availability`: `llm`)
- Default model id: `apple-on-device`
- Catalog provider id: `apple`
- Helper routes: `POST /v1/chat/completions`, `GET /v1/models` (no auth)
