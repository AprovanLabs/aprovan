# Sandbox Custom Images

## Operations

### `posthog.sandboxCustomImagesList`

- **HTTP**: `GET /api/projects/{project_id}/sandbox_custom_images/`
- **What it does**: API for custom sandbox base images, built on top of the VM sandbox base via an image-builder agent.

Custom images only run on the Modal VM runtime, so every action is gated on the
`tasks-modal-vm-sandbox` flag (org-enabled with `user_created` in its origin_products payload).
- **OpenAPI operationId**: `sandbox_custom_images_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string; repository?: string; private?: boolean; status: string; version: number; modal_image_name: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SandboxCustomImagesListInput = Parameters<typeof posthog.sandboxCustomImagesList> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxCustomImagesListOutput = Awaited<ReturnType<typeof posthog.sandboxCustomImagesList>>;

const result: SandboxCustomImagesListOutput = await posthog.sandboxCustomImagesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string; repository?: string; private?: boolean; status: string; version: number; modal_image_name: stri...
```

### `posthog.sandboxCustomImagesCreate`

- **HTTP**: `POST /api/projects/{project_id}/sandbox_custom_images/`
- **What it does**: Create a draft custom image and start its interactive image-builder agent task. The returned builder_task_id points at the conversation.
- **OpenAPI operationId**: `sandbox_custom_images_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; repository?: string; private?: boolean; status: string; version: number; modal_image_name: string; spec?: { [key: string]: unknown }; spec_yaml?: string; scan_result?: { ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type SandboxCustomImagesCreateInput = Parameters<typeof posthog.sandboxCustomImagesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxCustomImagesCreateOutput = Awaited<ReturnType<typeof posthog.sandboxCustomImagesCreate>>;

const result: SandboxCustomImagesCreateOutput = await posthog.sandboxCustomImagesCreate();

// Result shape (from schema): { id: string; name: string; description: string; repository?: string; private?: boolean; status: string; version: number; modal_image_name: string; spec?: { [key: string]: unknown }; spec_yaml?: string; scan_result?: { ...
```

### `posthog.sandboxCustomImagesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/sandbox_custom_images/{id}/`
- **What it does**: API for custom sandbox base images, built on top of the VM sandbox base via an image-builder agent.

Custom images only run on the Modal VM runtime, so every action is gated on the
`tasks-modal-vm-sandbox` flag (org-enabled with `user_created` in its origin_products payload).
- **OpenAPI operationId**: `sandbox_custom_images_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type SandboxCustomImagesDestroyInput = Parameters<typeof posthog.sandboxCustomImagesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxCustomImagesDestroyOutput = Awaited<ReturnType<typeof posthog.sandboxCustomImagesDestroy>>;

const result: SandboxCustomImagesDestroyOutput = await posthog.sandboxCustomImagesDestroy();

// Result shape (from schema): unknown
```

### `posthog.sandboxCustomImagesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/sandbox_custom_images/{id}/`
- **What it does**: API for custom sandbox base images, built on top of the VM sandbox base via an image-builder agent.

Custom images only run on the Modal VM runtime, so every action is gated on the
`tasks-modal-vm-sandbox` flag (org-enabled with `user_created` in its origin_products payload).
- **OpenAPI operationId**: `sandbox_custom_images_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; repository?: string; private?: boolean; status: string; version: number; modal_image_name: string; spec?: { [key: string]: unknown }; spec_yaml?: string; scan_result?: { ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SandboxCustomImagesRetrieveInput = Parameters<typeof posthog.sandboxCustomImagesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxCustomImagesRetrieveOutput = Awaited<ReturnType<typeof posthog.sandboxCustomImagesRetrieve>>;

const result: SandboxCustomImagesRetrieveOutput = await posthog.sandboxCustomImagesRetrieve();

// Result shape (from schema): { id: string; name: string; description: string; repository?: string; private?: boolean; status: string; version: number; modal_image_name: string; spec?: { [key: string]: unknown }; spec_yaml?: string; scan_result?: { ...
```

### `posthog.sandboxCustomImagesBuildCreate`

- **HTTP**: `POST /api/projects/{project_id}/sandbox_custom_images/{id}/build/`
- **What it does**: Persist the image spec (from the request body or the builder agent's sandbox), run the security scan, and on pass build and publish the image.
- **OpenAPI operationId**: `sandbox_custom_images_build_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; repository?: string; private?: boolean; status: string; version: number; modal_image_name: string; spec?: { [key: string]: unknown }; spec_yaml?: string; scan_result?: { ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SandboxCustomImagesBuildCreateInput = Parameters<typeof posthog.sandboxCustomImagesBuildCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxCustomImagesBuildCreateOutput = Awaited<ReturnType<typeof posthog.sandboxCustomImagesBuildCreate>>;

const result: SandboxCustomImagesBuildCreateOutput = await posthog.sandboxCustomImagesBuildCreate();

// Result shape (from schema): { id: string; name: string; description: string; repository?: string; private?: boolean; status: string; version: number; modal_image_name: string; spec?: { [key: string]: unknown }; spec_yaml?: string; scan_result?: { ...
```

### `posthog.sandboxCustomImagesBuilderTaskCreate`

- **HTTP**: `POST /api/projects/{project_id}/sandbox_custom_images/{id}/builder_task/`
- **What it does**: Revive (or reuse) the image's builder agent session. When the previous session has ended, a fresh one is started seeded with the stored spec — use this to update an existing image.
- **OpenAPI operationId**: `sandbox_custom_images_builder_task_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; repository?: string; private?: boolean; status: string; version: number; modal_image_name: string; spec?: { [key: string]: unknown }; spec_yaml?: string; scan_result?: { ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SandboxCustomImagesBuilderTaskCreateInput = Parameters<typeof posthog.sandboxCustomImagesBuilderTaskCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxCustomImagesBuilderTaskCreateOutput = Awaited<ReturnType<typeof posthog.sandboxCustomImagesBuilderTaskCreate>>;

const result: SandboxCustomImagesBuilderTaskCreateOutput = await posthog.sandboxCustomImagesBuilderTaskCreate();

// Result shape (from schema): { id: string; name: string; description: string; repository?: string; private?: boolean; status: string; version: number; modal_image_name: string; spec?: { [key: string]: unknown }; spec_yaml?: string; scan_result?: { ...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
