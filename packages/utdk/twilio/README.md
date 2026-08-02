# Twilio - Api

This is the public Twilio REST API.

- **Provider URL**: https://raw.githubusercontent.com/twilio/twilio-oai/main/spec/json/twilio_api_v2010.json
- **Operations**: 197
- **Authentication**: http:basic
- **Top capabilities**: Api20100401Address, Api20100401Application, Api20100401Call, Api20100401CallRecording, Api20100401Credential

## Quick start

```ts
import client from "@utdk/twilio";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
