# API Reference

Sentry Public API

- **Provider URL**: https://raw.githubusercontent.com/getsentry/sentry-api-schema/main/openapi-derefed.json
- **Operations**: 216
- **Authentication**: http:bearer, http:DSN
- **Top capabilities**: Projects, Releases, Events, Organizations, Integrations

## Quick start

```ts
import client from "@utdk/sentry";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
