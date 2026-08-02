# Stripe API

The Stripe REST API. Please see https://stripe.com/docs/api for more details.

- **Provider URL**: https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json
- **Operations**: 587
- **Authentication**: http:basic, http:bearer

## Quick start

```ts
import client from "@utdk/stripe";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
