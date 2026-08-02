# IT Glue / MyGlue API

Focused IT Glue REST API wrapper for MSP automation. The API follows the JSON:API media type and uses an x-api-key header. This spec covers the read surface used by existing read-only integrations plus the non-destructive write endpoints needed for contact sync, password mirroring, configuration creation, and onboarding documentation.

- **Provider URL**: https://raw.githubusercontent.com/mvanhorn/cli-printing-press/main/catalog/specs/itglue-openapi.yaml
- **Operations**: 25
- **Authentication**: apiKey
- **Top capabilities**: Contacts, Configurations, Documents, Passwords, Organizations

## Quick start

```ts
import client from "@utdk/itglue";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
