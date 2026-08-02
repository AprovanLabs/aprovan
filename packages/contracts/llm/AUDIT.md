# Shape audit — @utdk/llm

Paper audit (documentation-level) of the contract surface against real vendor
APIs, per Decision 8. Freeze criterion for the 0.2.0 bump.

## Vendors

1. **Anthropic native** (`POST /v1/messages`, `GET /v1/models`)
2. **Google Gemini** (`models.generateContent`, `models.list`)
3. **OpenRouter** (`POST /api/v1/chat/completions`, `GET /api/v1/models`)

## Per-operation mapping

### `createChatCompletion` (`LlmChatCompletionArgs` → `LlmChatCompletionResult`)

| Contract element | Anthropic | Gemini | OpenRouter |
| --- | --- | --- | --- |
| `messages[]` role/content | `messages[]` + top-level `system` (adapter splits system role out) | `contents[]` with `role: user/model` + `systemInstruction` | `messages[]` verbatim (OpenAI-compatible) |
| `model` id string | `model` | model in URL path | `model` |
| `maxTokens` | `max_tokens` (required — adapter defaults it) | `generationConfig.maxOutputTokens` | `max_tokens` |
| `temperature` | `temperature` | `generationConfig.temperature` | `temperature` |
| single assistant message result | `content[]` blocks → joined text | `candidates[0].content.parts[]` → joined text | `choices[0].message` verbatim |
| usage tokens | `usage.input_tokens`/`output_tokens` | `usageMetadata.promptTokenCount`/`candidatesTokenCount` | `usage.prompt_tokens`/`completion_tokens` |
| finish reason | `stop_reason` | `candidates[0].finishReason` | `choices[0].finish_reason` |
| error → `LlmError(status)` | HTTP status + `error.type` | HTTP status + `error.status` | HTTP status + OpenAI error shape |

### `listModels` (→ `LlmListModelsResult`)

| Contract element | Anthropic | Gemini | OpenRouter |
| --- | --- | --- | --- |
| `models[]` id | `data[].id` | `models[].name` (strip `models/` prefix) | `data[].id` |
| display name | `data[].display_name` | `models[].displayName` | `data[].name` |

Findings:

- The OpenAI-compatible wire shape is the least common denominator all three
  speak (natively or through a documented mapping); role vocabulary
  (`system`/`user`/`assistant`) converts mechanically to Anthropic's
  system-parameter split and Gemini's `user`/`model` + `systemInstruction`.
- Anthropic requires `max_tokens`; the contract leaves it optional, so
  adapters must supply a default — an adapter concern, consistent with the
  existing chat-provider registry implementations.
- Multi-part content (images, tool calls) is out of the v1 surface by design;
  all three vendors degrade cleanly to text-only messages.

## Changes

No change. The one-message-shape surface with `createChatCompletion` +
`listModels` mapped onto all three vendors without modification.

## Verdict

**Frozen at 0.2.0.** All operations implementable against all three audited
vendors; vendor-specific requirements (Anthropic `max_tokens`, Gemini role
renaming) are adapter-local defaults/renames, not contract shape gaps.
