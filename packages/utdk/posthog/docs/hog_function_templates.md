# Hog Function Templates

## Operations

### `posthog.hogFunctionTemplatesList`

- **HTTP**: `GET /api/projects/{project_id}/hog_function_templates/`
- **OpenAPI operationId**: `hog_function_templates_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `template_id`, `type`, `types`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; code: string; code_language?: string; inputs_schema: unknown; type: string; status?: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFunctionTemplatesListInput = Parameters<typeof posthog.hogFunctionTemplatesList> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionTemplatesListOutput = Awaited<ReturnType<typeof posthog.hogFunctionTemplatesList>>;

const result: HogFunctionTemplatesListOutput = await posthog.hogFunctionTemplatesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; code: string; code_language?: string; inputs_schema: unknown; type: string; status?: st...
```

### `posthog.hogFunctionTemplatesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_function_templates/{template_id}/`
- **OpenAPI operationId**: `hog_function_templates_retrieve`
- **Path params**: `template_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; code: string; code_language?: string; inputs_schema: unknown; type: string; status?: string; category?: unknown; free?: boolean; icon_url?: string | null; filters...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFunctionTemplatesRetrieveInput = Parameters<typeof posthog.hogFunctionTemplatesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionTemplatesRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFunctionTemplatesRetrieve>>;

const result: HogFunctionTemplatesRetrieveOutput = await posthog.hogFunctionTemplatesRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string | null; code: string; code_language?: string; inputs_schema: unknown; type: string; status?: string; category?: unknown; free?: boolean; icon_url?: string | null; filters...
```

### `posthog.publicHogFunctionTemplatesList`

- **HTTP**: `GET /api/public_hog_function_templates/`
- **OpenAPI operationId**: `public_hog_function_templates_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `template_id`, `type`, `types`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; code: string; code_language?: string; inputs_schema: unknown; type: string; status?: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PublicHogFunctionTemplatesListInput = Parameters<typeof posthog.publicHogFunctionTemplatesList> extends [infer T, ...unknown[]] ? T : undefined;
type PublicHogFunctionTemplatesListOutput = Awaited<ReturnType<typeof posthog.publicHogFunctionTemplatesList>>;

const result: PublicHogFunctionTemplatesListOutput = await posthog.publicHogFunctionTemplatesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; code: string; code_language?: string; inputs_schema: unknown; type: string; status?: st...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
