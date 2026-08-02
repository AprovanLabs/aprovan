# Product Enablement

## Operations

### `posthog.productEnablementCreate`

- **HTTP**: `POST /api/projects/{project_id}/product_enablement/`
- **OpenAPI operationId**: `product_enablement_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: { [key: string]: string | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProductEnablementCreateInput = Parameters<typeof posthog.productEnablementCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ProductEnablementCreateOutput = Awaited<ReturnType<typeof posthog.productEnablementCreate>>;

const result: ProductEnablementCreateOutput = await posthog.productEnablementCreate();

// Result shape (from schema): { results: { [key: string]: string | undefined } }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
