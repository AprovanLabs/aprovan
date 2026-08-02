# Google Docs API

`utdk/google/docs` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Documents.

## Quick start

```ts
import docs from "utdk/google/docs";

const result = await docs.docsDocumentsGet({ /* documentId */ });
```

In the UTDK isolate runtime, `docs` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [Documents](./docs/documents.md) — 3 operations

Every operation is a typed method (`docs.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


