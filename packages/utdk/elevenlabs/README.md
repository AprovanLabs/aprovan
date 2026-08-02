# ElevenLabs API Documentation

This is the documentation for the ElevenLabs API. You can use this API to use our service programmatically, this is done by using your API key. You can find your API key in the dashboard at https://elevenlabs.io/app/settings/api-keys.

- **Provider URL**: https://api.elevenlabs.io/openapi.json
- **Operations**: 315
- **Authentication**: None
- **Top capabilities**: Agents Platform, workspace, studio, dubbing, pvc-voices

## Quick start

```ts
import client from "@utdk/elevenlabs";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
