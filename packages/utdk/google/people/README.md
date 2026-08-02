# People API

`utdk/google/people` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on People, ContactGroups, OtherContacts.

## Quick start

```ts
import people from "utdk/google/people";

const result = await people.peopleContactGroupsList({});
```

In the UTDK isolate runtime, `people` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [ContactGroups](./docs/contactgroups.md) — 6 operations
- [OtherContacts](./docs/othercontacts.md) — 3 operations
- [People](./docs/people.md) — 14 operations

Every operation is a typed method (`people.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


