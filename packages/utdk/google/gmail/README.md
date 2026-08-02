# Gmail API

`utdk/google/gmail` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Users.

## Quick start

```ts
import gmail from "utdk/google/gmail";

const result = await gmail.gmailUsersDraftsList({ /* userId */ });
```

In the UTDK isolate runtime, `gmail` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [Users](./docs/users.md) — 79 operations

Every operation is a typed method (`gmail.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


