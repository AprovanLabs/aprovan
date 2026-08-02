# Flag Value

## Operations

### `posthog.flagValueValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/flag_value/values/`
- **What it does**: Get possible values for a feature flag.

Query parameters:
- key: The flag ID (required)
Returns:

- Array of objects with 'name' field containing possible values
- **OpenAPI operationId**: `flag_value_values_retrieve`
- **Path params**: None
- **Query params**: `key`
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ name: unknown })[]; refreshing: boolean }`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type FlagValueValuesRetrieveInput = Parameters<typeof posthog.flagValueValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FlagValueValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.flagValueValuesRetrieve>>;

const result: FlagValueValuesRetrieveOutput = await posthog.flagValueValuesRetrieve();

// Result shape (from schema): { results: ({ name: unknown })[]; refreshing: boolean }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
