# Google Forms API

`utdk/google/forms` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Forms.

## Quick start

```ts
import forms from "utdk/google/forms";

const result = await forms.formsFormsGet({ /* formId */ });
```

In the UTDK isolate runtime, `forms` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [Forms](./docs/forms.md) — 9 operations

Every operation is a typed method (`forms.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


