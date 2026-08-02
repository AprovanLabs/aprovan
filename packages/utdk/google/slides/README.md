# Google Slides API

`utdk/google/slides` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Presentations.

## Quick start

```ts
import slides from "utdk/google/slides";

const result = await slides.slidesPresentationsGet({ /* presentationId */ });
```

In the UTDK isolate runtime, `slides` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [Presentations](./docs/presentations.md) — 5 operations

Every operation is a typed method (`slides.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


