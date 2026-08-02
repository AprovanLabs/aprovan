# The Plaid API

The Plaid REST API. Please see https://plaid.com/docs/api for more details.

- **Provider URL**: https://raw.githubusercontent.com/plaid/plaid-openapi/master/2020-09-14.yml
- **Operations**: 330
- **Authentication**: apiKey, apiKey, apiKey
- **Top capabilities**: plaid

## Quick start

```ts
import client from "@utdk/plaid";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
