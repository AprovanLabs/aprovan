# Zendesk Support API

The Zendesk Support API lets you access, create, update, and delete help desk tickets (called 'tickets'), users, organizations, and groups. Build integrations that automate support workflows, sync customer data, and extend the Zendesk platform.

- **Provider URL**: repo://data/openapi/zendesk.json
- **Operations**: 10
- **Authentication**: http:bearer
- **Top capabilities**: Tickets, Users, Organizations, Search

## Quick start

```ts
import client from "@utdk/zendesk";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
