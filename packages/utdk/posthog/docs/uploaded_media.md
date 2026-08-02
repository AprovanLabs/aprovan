# Uploaded Media

## Operations

### `posthog.uploadedMediaCreate`

- **HTTP**: `POST /api/projects/{project_id}/uploaded_media/`
- **What it does**: 
    When object storage is available this API allows upload of media which can be used, for example, in text cards on dashboards.

    Uploaded media must have a content type beginning with 'image/' and be less than 4MB.
    
- **OpenAPI operationId**: `uploaded_media_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type UploadedMediaCreateInput = Parameters<typeof posthog.uploadedMediaCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UploadedMediaCreateOutput = Awaited<ReturnType<typeof posthog.uploadedMediaCreate>>;

const result: UploadedMediaCreateOutput = await posthog.uploadedMediaCreate();

// Result shape (from schema): { [key: string]: unknown }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
