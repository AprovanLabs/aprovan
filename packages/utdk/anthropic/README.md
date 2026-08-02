# Anthropic API

`@utdk/anthropic` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Messages, Models.

## Quick start

```ts
import anthropic from "@utdk/anthropic";

const result = await anthropic.listModels({});
```

In the UTDK isolate runtime, `anthropic` is also available directly as a namespace value — no import needed.

## Authentication

- **API key** — sent as the `x-api-key` header.
- **Bearer token** — sent as `Authorization: Bearer <token>`.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [Messages](./docs/messages.md) — 2 operations
- [Models](./docs/models.md) — 2 operations

Every operation is a typed method (`anthropic.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


