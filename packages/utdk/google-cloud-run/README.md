# Cloud Run Admin API

Deploy and manage user provided container images that scale automatically based on incoming requests. The Cloud Run Admin API v1 follows the Knative Serving API specification, while v2 is aligned with Google Cloud AIP-based API standards, as described in https://google.aip.dev/.

- **Provider URL**: https://api.apis.guru/v2/specs/googleapis.com/run/v2/openapi.yaml
- **Operations**: 16
- **Authentication**: oauth2, oauth2
- **Top capabilities**: projects

## Quick start

```ts
import client from "@utdk/google-cloud-run";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
