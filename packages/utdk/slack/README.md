# Slack Web API

One way to interact with the Slack platform is its HTTP RPC-based Web API, a collection of methods requiring OAuth 2.0-based user, bot, or workspace tokens blessed with related OAuth scopes.

- **Provider URL**: https://api.apis.guru/v2/specs/slack.com/1.7.0/openapi.json
- **Operations**: 174
- **Authentication**: oauth2
- **Top capabilities**: conversations, admin.conversations, users, chat, admin.users

## Quick start

```ts
import client from "@utdk/slack";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
