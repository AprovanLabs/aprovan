# Discord HTTP API (Preview)

Preview of the Discord v10 HTTP API specification. See https://discord.com/developers/docs for more details.

- **Provider URL**: https://raw.githubusercontent.com/discord/discord-api-spec/main/specs/openapi.json
- **Operations**: 233
- **Authentication**: apiKey, oauth2

## Quick start

```ts
import client from "@utdk/discord";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
