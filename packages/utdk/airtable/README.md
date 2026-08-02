# Airtable REST API

Airtable is a low-code platform for building collaborative apps. The REST API allows you to create, read, update, and delete records in Airtable bases, manage tables and fields, and automate workflows. Each Airtable base has a unique API that mirrors its structure.

- **Provider URL**: repo://data/openapi/airtable.json
- **Operations**: 9
- **Authentication**: http:bearer
- **Top capabilities**: Records, Metadata

## Quick start

```ts
import client from "@utdk/airtable";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
