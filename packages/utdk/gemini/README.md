# Google Gemini API

`@utdk/gemini` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Generation, Models.

## Quick start

```ts
import gemini from "@utdk/gemini";

const result = await gemini.listModels({});
```

In the UTDK isolate runtime, `gemini` is also available directly as a namespace value — no import needed.

## Authentication

- **API key** — sent as the `x-goog-api-key` header.
- **Bearer token** — sent as `Authorization: Bearer <token>`.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [Generation](./docs/generation.md) — 2 operations
- [Models](./docs/models.md) — 2 operations

Every operation is a typed method (`gemini.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


