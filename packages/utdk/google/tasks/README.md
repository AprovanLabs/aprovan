# Google Tasks API

`utdk/google/tasks` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Tasks, Tasklists.

## Quick start

```ts
import tasks from "utdk/google/tasks";

const result = await tasks.tasksTasklistsList({});
```

In the UTDK isolate runtime, `tasks` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [Tasklists](./docs/tasklists.md) — 6 operations
- [Tasks](./docs/tasks.md) — 8 operations

Every operation is a typed method (`tasks.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


