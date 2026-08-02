# Linear API

Linear is a modern project management tool for high-performance software teams. This API provides REST endpoints for webhooks, OAuth, and attachment management alongside the primary GraphQL API.

- **Provider URL**: repo://data/openapi/linear.json
- **Operations**: 9
- **Authentication**: http:bearer
- **Top capabilities**: Webhooks, OAuth, Attachments, GraphQL

## Quick start

```ts
import client from "@utdk/linear";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
