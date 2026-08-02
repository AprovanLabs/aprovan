# Exports

## Operations

### `posthog.environmentsExportsList`

- **HTTP**: `GET /api/environments/{environment_id}/exports/`
- **OpenAPI operationId**: `environments_exports_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExportsListInput = Parameters<typeof posthog.environmentsExportsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExportsListOutput = Awaited<ReturnType<typeof posthog.environmentsExportsList>>;

const result: EnvironmentsExportsListOutput = await posthog.environmentsExportsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd...
```

### `posthog.environmentsExportsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/exports/`
- **OpenAPI operationId**: `environments_exports_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "video/webm" | "video...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExportsCreateInput = Parameters<typeof posthog.environmentsExportsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExportsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExportsCreate>>;

const result: EnvironmentsExportsCreateOutput = await posthog.environmentsExportsCreate();

// Result shape (from schema): { id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "video/webm" | "video...
```

### `posthog.environmentsExportsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/exports/{id}/`
- **OpenAPI operationId**: `environments_exports_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "video/webm" | "video...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExportsRetrieveInput = Parameters<typeof posthog.environmentsExportsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExportsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExportsRetrieve>>;

const result: EnvironmentsExportsRetrieveOutput = await posthog.environmentsExportsRetrieve();

// Result shape (from schema): { id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "video/webm" | "video...
```

### `posthog.environmentsExportsContentRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/exports/{id}/content/`
- **OpenAPI operationId**: `environments_exports_content_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExportsContentRetrieveInput = Parameters<typeof posthog.environmentsExportsContentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExportsContentRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExportsContentRetrieve>>;

const result: EnvironmentsExportsContentRetrieveOutput = await posthog.environmentsExportsContentRetrieve();

// Result shape (from schema): unknown
```

### `posthog.exportsList`

- **HTTP**: `GET /api/projects/{project_id}/exports/`
- **OpenAPI operationId**: `exports_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExportsListInput = Parameters<typeof posthog.exportsList> extends [infer T, ...unknown[]] ? T : undefined;
type ExportsListOutput = Awaited<ReturnType<typeof posthog.exportsList>>;

const result: ExportsListOutput = await posthog.exportsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd...
```

### `posthog.exportsCreate`

- **HTTP**: `POST /api/projects/{project_id}/exports/`
- **OpenAPI operationId**: `exports_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "video/webm" | "video...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ExportsCreateInput = Parameters<typeof posthog.exportsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExportsCreateOutput = Awaited<ReturnType<typeof posthog.exportsCreate>>;

const result: ExportsCreateOutput = await posthog.exportsCreate();

// Result shape (from schema): { id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "video/webm" | "video...
```

### `posthog.exportsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/exports/{id}/`
- **OpenAPI operationId**: `exports_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "video/webm" | "video...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExportsRetrieveInput = Parameters<typeof posthog.exportsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExportsRetrieveOutput = Awaited<ReturnType<typeof posthog.exportsRetrieve>>;

const result: ExportsRetrieveOutput = await posthog.exportsRetrieve();

// Result shape (from schema): { id: number; dashboard?: number | null; insight?: number | null; export_format: "image/png" | "application/pdf" | "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "video/webm" | "video...
```

### `posthog.exportsContentRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/exports/{id}/content/`
- **OpenAPI operationId**: `exports_content_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExportsContentRetrieveInput = Parameters<typeof posthog.exportsContentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExportsContentRetrieveOutput = Awaited<ReturnType<typeof posthog.exportsContentRetrieve>>;

const result: ExportsContentRetrieveOutput = await posthog.exportsContentRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
