# The Jira Cloud platform REST API

Jira Cloud platform REST API documentation

- **Provider URL**: https://developer.atlassian.com/cloud/jira/platform/swagger-v3.v3.json
- **Operations**: 619
- **Authentication**: oauth2, http:basic
- **Top capabilities**: Issues, Workflow schemes, Dashboards, Issue security schemes, Workflows

## Quick start

```ts
import client from "@utdk/jira";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
