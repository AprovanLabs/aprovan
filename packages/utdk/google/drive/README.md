# Drive API

`utdk/google/drive` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Files, Drives, Comments, Permissions.

## Quick start

```ts
import drive from "utdk/google/drive";

const result = await drive.driveAboutGet({});
```

In the UTDK isolate runtime, `drive` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [About](./docs/about.md) — 1 operation
- [Changes](./docs/changes.md) — 3 operations
- [Channels](./docs/channels.md) — 1 operation
- [Comments](./docs/comments.md) — 5 operations
- [Drives](./docs/drives.md) — 7 operations
- [Files](./docs/files.md) — 12 operations
- [Permissions](./docs/permissions.md) — 5 operations
- [Replies](./docs/replies.md) — 5 operations
- [Revisions](./docs/revisions.md) — 4 operations
- [Teamdrives](./docs/teamdrives.md) — 5 operations

Every operation is a typed method (`drive.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


