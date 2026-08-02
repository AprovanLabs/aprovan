# Calendar API

`utdk/google/calendar` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Events, Acl, CalendarList, Calendars.

## Quick start

```ts
import calendar from "utdk/google/calendar";

const result = await calendar.calendarColorsGet({});
```

In the UTDK isolate runtime, `calendar` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [Acl](./docs/acl.md) — 7 operations
- [CalendarList](./docs/calendarlist.md) — 7 operations
- [Calendars](./docs/calendars.md) — 6 operations
- [Channels](./docs/channels.md) — 1 operation
- [Colors](./docs/colors.md) — 1 operation
- [Events](./docs/events.md) — 11 operations
- [Freebusy](./docs/freebusy.md) — 1 operation
- [Settings](./docs/settings.md) — 3 operations

Every operation is a typed method (`calendar.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


