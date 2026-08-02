# Session Recordings

## Operations

### `posthog.environmentsSessionRecordingsSharingList`

- **HTTP**: `GET /api/environments/{environment_id}/session_recordings/{recording_id}/sharing/`
- **OpenAPI operationId**: `environments_session_recordings_sharing_list`
- **Path params**: `recording_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingsSharingListInput = Parameters<typeof posthog.environmentsSessionRecordingsSharingList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingsSharingListOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingsSharingList>>;

const result: EnvironmentsSessionRecordingsSharingListOutput = await posthog.environmentsSessionRecordingsSharingList();

// Result shape (from schema): ({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...
```

### `posthog.environmentsSessionRecordingsSharingPasswordsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/session_recordings/{recording_id}/sharing/passwords/`
- **What it does**: Create a new password for the sharing configuration.
- **OpenAPI operationId**: `environments_session_recordings_sharing_passwords_create`
- **Path params**: `recording_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingsSharingPasswordsCreateInput = Parameters<typeof posthog.environmentsSessionRecordingsSharingPasswordsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingsSharingPasswordsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingsSharingPasswordsCreate>>;

const result: EnvironmentsSessionRecordingsSharingPasswordsCreateOutput = await posthog.environmentsSessionRecordingsSharingPasswordsCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.environmentsSessionRecordingsSharingPasswordsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/session_recordings/{recording_id}/sharing/passwords/{password_id}/`
- **What it does**: Delete a password from the sharing configuration.
- **OpenAPI operationId**: `environments_session_recordings_sharing_passwords_destroy`
- **Path params**: `password_id`, `recording_id`
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

type EnvironmentsSessionRecordingsSharingPasswordsDestroyInput = Parameters<typeof posthog.environmentsSessionRecordingsSharingPasswordsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingsSharingPasswordsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingsSharingPasswordsDestroy>>;

const result: EnvironmentsSessionRecordingsSharingPasswordsDestroyOutput = await posthog.environmentsSessionRecordingsSharingPasswordsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsSessionRecordingsSharingRefreshCreate`

- **HTTP**: `POST /api/environments/{environment_id}/session_recordings/{recording_id}/sharing/refresh/`
- **OpenAPI operationId**: `environments_session_recordings_sharing_refresh_create`
- **Path params**: `recording_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingsSharingRefreshCreateInput = Parameters<typeof posthog.environmentsSessionRecordingsSharingRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingsSharingRefreshCreateOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingsSharingRefreshCreate>>;

const result: EnvironmentsSessionRecordingsSharingRefreshCreateOutput = await posthog.environmentsSessionRecordingsSharingRefreshCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.sessionRecordingsSharingList`

- **HTTP**: `GET /api/projects/{project_id}/session_recordings/{recording_id}/sharing/`
- **OpenAPI operationId**: `session_recordings_sharing_list`
- **Path params**: `recording_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingsSharingListInput = Parameters<typeof posthog.sessionRecordingsSharingList> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingsSharingListOutput = Awaited<ReturnType<typeof posthog.sessionRecordingsSharingList>>;

const result: SessionRecordingsSharingListOutput = await posthog.sessionRecordingsSharingList();

// Result shape (from schema): ({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...
```

### `posthog.sessionRecordingsSharingPasswordsCreate`

- **HTTP**: `POST /api/projects/{project_id}/session_recordings/{recording_id}/sharing/passwords/`
- **What it does**: Create a new password for the sharing configuration.
- **OpenAPI operationId**: `session_recordings_sharing_passwords_create`
- **Path params**: `recording_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingsSharingPasswordsCreateInput = Parameters<typeof posthog.sessionRecordingsSharingPasswordsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingsSharingPasswordsCreateOutput = Awaited<ReturnType<typeof posthog.sessionRecordingsSharingPasswordsCreate>>;

const result: SessionRecordingsSharingPasswordsCreateOutput = await posthog.sessionRecordingsSharingPasswordsCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.sessionRecordingsSharingPasswordsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/session_recordings/{recording_id}/sharing/passwords/{password_id}/`
- **What it does**: Delete a password from the sharing configuration.
- **OpenAPI operationId**: `session_recordings_sharing_passwords_destroy`
- **Path params**: `password_id`, `recording_id`
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

type SessionRecordingsSharingPasswordsDestroyInput = Parameters<typeof posthog.sessionRecordingsSharingPasswordsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingsSharingPasswordsDestroyOutput = Awaited<ReturnType<typeof posthog.sessionRecordingsSharingPasswordsDestroy>>;

const result: SessionRecordingsSharingPasswordsDestroyOutput = await posthog.sessionRecordingsSharingPasswordsDestroy();

// Result shape (from schema): unknown
```

### `posthog.sessionRecordingsSharingRefreshCreate`

- **HTTP**: `POST /api/projects/{project_id}/session_recordings/{recording_id}/sharing/refresh/`
- **OpenAPI operationId**: `session_recordings_sharing_refresh_create`
- **Path params**: `recording_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingsSharingRefreshCreateInput = Parameters<typeof posthog.sessionRecordingsSharingRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingsSharingRefreshCreateOutput = Awaited<ReturnType<typeof posthog.sessionRecordingsSharingRefreshCreate>>;

const result: SessionRecordingsSharingRefreshCreateOutput = await posthog.sessionRecordingsSharingRefreshCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
