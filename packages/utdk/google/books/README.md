# Books API

`utdk/google/books` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Mylibrary, Volumes, Layers, Myconfig.

## Quick start

```ts
import books from "utdk/google/books";

const result = await books.booksFamilysharingGetFamilyInfo({});
```

In the UTDK isolate runtime, `books` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [Bookshelves](./docs/bookshelves.md) — 3 operations
- [Cloudloading](./docs/cloudloading.md) — 3 operations
- [Dictionary](./docs/dictionary.md) — 1 operation
- [Familysharing](./docs/familysharing.md) — 3 operations
- [Layers](./docs/layers.md) — 6 operations
- [Myconfig](./docs/myconfig.md) — 5 operations
- [Mylibrary](./docs/mylibrary.md) — 14 operations
- [Notification](./docs/notification.md) — 1 operation
- [Onboarding](./docs/onboarding.md) — 2 operations
- [Personalizedstream](./docs/personalizedstream.md) — 1 operation
- [Promooffer](./docs/promooffer.md) — 3 operations
- [Series](./docs/series.md) — 2 operations
- [Volumes](./docs/volumes.md) — 7 operations

Every operation is a typed method (`books.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


