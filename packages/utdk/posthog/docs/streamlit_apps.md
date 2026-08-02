# Streamlit Apps

## Operations

### `posthog.streamlitAppsList`

- **HTTP**: `GET /api/projects/{project_id}/streamlit_apps/`
- **What it does**: List streamlit apps
- **OpenAPI operationId**: `streamlit_apps_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsListInput = Parameters<typeof posthog.streamlitAppsList> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsListOutput = Awaited<ReturnType<typeof posthog.streamlitAppsList>>;

const result: StreamlitAppsListOutput = await posthog.streamlitAppsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: ...
```

### `posthog.streamlitAppsCreate`

- **HTTP**: `POST /api/projects/{project_id}/streamlit_apps/`
- **What it does**: Create a streamlit app
- **OpenAPI operationId**: `streamlit_apps_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsCreateInput = Parameters<typeof posthog.streamlitAppsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsCreateOutput = Awaited<ReturnType<typeof posthog.streamlitAppsCreate>>;

const result: StreamlitAppsCreateOutput = await posthog.streamlitAppsCreate();

// Result shape (from schema): { created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...
```

### `posthog.streamlitAppsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/streamlit_apps/{short_id}/`
- **What it does**: Delete a streamlit app
- **OpenAPI operationId**: `streamlit_apps_destroy`
- **Path params**: `short_id`
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

type StreamlitAppsDestroyInput = Parameters<typeof posthog.streamlitAppsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsDestroyOutput = Awaited<ReturnType<typeof posthog.streamlitAppsDestroy>>;

const result: StreamlitAppsDestroyOutput = await posthog.streamlitAppsDestroy();

// Result shape (from schema): unknown
```

### `posthog.streamlitAppsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/streamlit_apps/{short_id}/`
- **What it does**: Retrieve a streamlit app
- **OpenAPI operationId**: `streamlit_apps_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsRetrieveInput = Parameters<typeof posthog.streamlitAppsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsRetrieveOutput = Awaited<ReturnType<typeof posthog.streamlitAppsRetrieve>>;

const result: StreamlitAppsRetrieveOutput = await posthog.streamlitAppsRetrieve();

// Result shape (from schema): { created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...
```

### `posthog.streamlitAppsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/streamlit_apps/{short_id}/`
- **What it does**: Partially update a streamlit app
- **OpenAPI operationId**: `streamlit_apps_partial_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsPartialUpdateInput = Parameters<typeof posthog.streamlitAppsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.streamlitAppsPartialUpdate>>;

const result: StreamlitAppsPartialUpdateOutput = await posthog.streamlitAppsPartialUpdate();

// Result shape (from schema): { created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...
```

### `posthog.streamlitAppsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/streamlit_apps/{short_id}/`
- **What it does**: Update a streamlit app
- **OpenAPI operationId**: `streamlit_apps_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsUpdateInput = Parameters<typeof posthog.streamlitAppsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsUpdateOutput = Awaited<ReturnType<typeof posthog.streamlitAppsUpdate>>;

const result: StreamlitAppsUpdateOutput = await posthog.streamlitAppsUpdate();

// Result shape (from schema): { created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...
```

### `posthog.streamlitAppsActivateVersionCreate`

- **HTTP**: `POST /api/projects/{project_id}/streamlit_apps/{short_id}/activate_version/`
- **What it does**: Activate an existing app version
- **OpenAPI operationId**: `streamlit_apps_activate_version_create`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ active_version: { created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsActivateVersionCreateInput = Parameters<typeof posthog.streamlitAppsActivateVersionCreate> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsActivateVersionCreateOutput = Awaited<ReturnType<typeof posthog.streamlitAppsActivateVersionCreate>>;

const result: StreamlitAppsActivateVersionCreateOutput = await posthog.streamlitAppsActivateVersionCreate();

// Result shape (from schema): { active_version: { created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown...
```

### `posthog.streamlitAppsConnectInfoRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/streamlit_apps/{short_id}/connect_info/`
- **What it does**: Get iframe connection info for a running app
- **OpenAPI operationId**: `streamlit_apps_connect_info_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ iframe_url: string; expires_in: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsConnectInfoRetrieveInput = Parameters<typeof posthog.streamlitAppsConnectInfoRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsConnectInfoRetrieveOutput = Awaited<ReturnType<typeof posthog.streamlitAppsConnectInfoRetrieve>>;

const result: StreamlitAppsConnectInfoRetrieveOutput = await posthog.streamlitAppsConnectInfoRetrieve();

// Result shape (from schema): { iframe_url: string; expires_in: number }
```

### `posthog.streamlitAppsRestartCreate`

- **HTTP**: `POST /api/projects/{project_id}/streamlit_apps/{short_id}/restart/`
- **What it does**: Restart the app sandbox
- **OpenAPI operationId**: `streamlit_apps_restart_create`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsRestartCreateInput = Parameters<typeof posthog.streamlitAppsRestartCreate> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsRestartCreateOutput = Awaited<ReturnType<typeof posthog.streamlitAppsRestartCreate>>;

const result: StreamlitAppsRestartCreateOutput = await posthog.streamlitAppsRestartCreate();

// Result shape (from schema): unknown
```

### `posthog.streamlitAppsStartCreate`

- **HTTP**: `POST /api/projects/{project_id}/streamlit_apps/{short_id}/start/`
- **What it does**: Start the app sandbox
- **OpenAPI operationId**: `streamlit_apps_start_create`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`, `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...`
- OpenAPI response codes: `200`, `202`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsStartCreateInput = Parameters<typeof posthog.streamlitAppsStartCreate> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsStartCreateOutput = Awaited<ReturnType<typeof posthog.streamlitAppsStartCreate>>;

const result: StreamlitAppsStartCreateOutput = await posthog.streamlitAppsStartCreate();

// Result shape (from schema): { created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...
```

### `posthog.streamlitAppsStatusRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/streamlit_apps/{short_id}/status/`
- **What it does**: Get app sandbox status
- **OpenAPI operationId**: `streamlit_apps_status_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status: string; restart_count: number; last_error: string; started_at: string | null; last_activity_at: string | null; version_number?: number | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsStatusRetrieveInput = Parameters<typeof posthog.streamlitAppsStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.streamlitAppsStatusRetrieve>>;

const result: StreamlitAppsStatusRetrieveOutput = await posthog.streamlitAppsStatusRetrieve();

// Result shape (from schema): { status: string; restart_count: number; last_error: string; started_at: string | null; last_activity_at: string | null; version_number?: number | null }
```

### `posthog.streamlitAppsStopCreate`

- **HTTP**: `POST /api/projects/{project_id}/streamlit_apps/{short_id}/stop/`
- **What it does**: Stop the app sandbox
- **OpenAPI operationId**: `streamlit_apps_stop_create`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsStopCreateInput = Parameters<typeof posthog.streamlitAppsStopCreate> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsStopCreateOutput = Awaited<ReturnType<typeof posthog.streamlitAppsStopCreate>>;

const result: StreamlitAppsStopCreateOutput = await posthog.streamlitAppsStopCreate();

// Result shape (from schema): { created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...
```

### `posthog.streamlitAppsUploadVersionCreate`

- **HTTP**: `POST /api/projects/{project_id}/streamlit_apps/{short_id}/upload_version/`
- **What it does**: Upload a new app version
- **OpenAPI operationId**: `streamlit_apps_upload_version_create`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsUploadVersionCreateInput = Parameters<typeof posthog.streamlitAppsUploadVersionCreate> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsUploadVersionCreateOutput = Awaited<ReturnType<typeof posthog.streamlitAppsUploadVersionCreate>>;

const result: StreamlitAppsUploadVersionCreateOutput = await posthog.streamlitAppsUploadVersionCreate();

// Result shape (from schema): { created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_at...
```

### `posthog.streamlitAppsVersionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/streamlit_apps/{short_id}/versions/`
- **What it does**: List app versions
- **OpenAPI operationId**: `streamlit_apps_versions_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type StreamlitAppsVersionsRetrieveInput = Parameters<typeof posthog.streamlitAppsVersionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type StreamlitAppsVersionsRetrieveOutput = Awaited<ReturnType<typeof posthog.streamlitAppsVersionsRetrieve>>;

const result: StreamlitAppsVersionsRetrieveOutput = await posthog.streamlitAppsVersionsRetrieve();

// Result shape (from schema): { results: ({ created_by?: { id: number; uuid: string; distinct_id: string | null; first_name: string; last_name: string; email: string; is_email_verified: boolean | null; hedgehog_config: { [key: string]: unknown } | n...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
