# Salesforce REST API

The Salesforce REST API provides programmatic access to Salesforce CRM data including accounts, contacts, leads, opportunities, cases, and custom objects. Use it to build integrations that create and update records, run SOQL queries, manage metadata, and handle event-driven updates via streaming.

- **Provider URL**: repo://data/openapi/salesforce.json
- **Operations**: 10
- **Authentication**: oauth2
- **Top capabilities**: Records, Query, sObjects, Composite

## Quick start

```ts
import client from "@utdk/salesforce";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
