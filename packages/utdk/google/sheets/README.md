# Google Sheets API

`utdk/google/sheets` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Spreadsheets.

## Quick start

```ts
import sheets from "utdk/google/sheets";

const result = await sheets.sheetsSpreadsheetsGet({ /* spreadsheetId */ });
```

In the UTDK isolate runtime, `sheets` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [Spreadsheets](./docs/spreadsheets.md) — 17 operations

Every operation is a typed method (`sheets.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


