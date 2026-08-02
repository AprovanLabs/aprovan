# Users

## Operations

### `posthog.usersList`

- **HTTP**: `GET /api/users/`
- **OpenAPI operationId**: `users_list`
- **Path params**: None
- **Query params**: `email`, `is_staff`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ date_joined: string; uuid: string; distinct_id: string | null; first_name?: string; last_name?: string; email: string; pending_email: string |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersListInput = Parameters<typeof posthog.usersList> extends [infer T, ...unknown[]] ? T : undefined;
type UsersListOutput = Awaited<ReturnType<typeof posthog.usersList>>;

const result: UsersListOutput = await posthog.usersList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ date_joined: string; uuid: string; distinct_id: string | null; first_name?: string; last_name?: string; email: string; pending_email: string |...
```

### `posthog.usersSignalAutonomyDestroy`

- **HTTP**: `DELETE /api/users/{user_id}/signal_autonomy/`
- **What it does**: Per-user signal autonomy config (singleton keyed by user).

GET    /api/users/<id>/signal_autonomy/ → current config (or 404)
POST   /api/users/<id>/signal_autonomy/ → create or update
DELETE /api/users/<id>/signal_autonomy/ → remove (opt out)
- **OpenAPI operationId**: `users_signal_autonomy_destroy`
- **Path params**: `user_id`
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

type UsersSignalAutonomyDestroyInput = Parameters<typeof posthog.usersSignalAutonomyDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type UsersSignalAutonomyDestroyOutput = Awaited<ReturnType<typeof posthog.usersSignalAutonomyDestroy>>;

const result: UsersSignalAutonomyDestroyOutput = await posthog.usersSignalAutonomyDestroy();

// Result shape (from schema): unknown
```

### `posthog.usersSignalAutonomyRetrieve`

- **HTTP**: `GET /api/users/{user_id}/signal_autonomy/`
- **What it does**: Per-user signal autonomy config (singleton keyed by user).

GET    /api/users/<id>/signal_autonomy/ → current config (or 404)
POST   /api/users/<id>/signal_autonomy/ → create or update
DELETE /api/users/<id>/signal_autonomy/ → remove (opt out)
- **OpenAPI operationId**: `users_signal_autonomy_retrieve`
- **Path params**: `user_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; user: { id: number; uuid: string; first_name: string; last_name: string; email: string }; autostart_priority?: "P0" | "P1" | "P2" | "P3" | "P4" | "" | null; slack_notification_integration_id: number | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersSignalAutonomyRetrieveInput = Parameters<typeof posthog.usersSignalAutonomyRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UsersSignalAutonomyRetrieveOutput = Awaited<ReturnType<typeof posthog.usersSignalAutonomyRetrieve>>;

const result: UsersSignalAutonomyRetrieveOutput = await posthog.usersSignalAutonomyRetrieve();

// Result shape (from schema): { id: string; user: { id: number; uuid: string; first_name: string; last_name: string; email: string }; autostart_priority?: "P0" | "P1" | "P2" | "P3" | "P4" | "" | null; slack_notification_integration_id: number | null...
```

### `posthog.usersSignalAutonomyCreate`

- **HTTP**: `POST /api/users/{user_id}/signal_autonomy/`
- **What it does**: Per-user signal autonomy config (singleton keyed by user).

GET    /api/users/<id>/signal_autonomy/ → current config (or 404)
POST   /api/users/<id>/signal_autonomy/ → create or update
DELETE /api/users/<id>/signal_autonomy/ → remove (opt out)
- **OpenAPI operationId**: `users_signal_autonomy_create`
- **Path params**: `user_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; user: { id: number; uuid: string; first_name: string; last_name: string; email: string }; autostart_priority?: "P0" | "P1" | "P2" | "P3" | "P4" | "" | null; slack_notification_integration_id: number | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersSignalAutonomyCreateInput = Parameters<typeof posthog.usersSignalAutonomyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersSignalAutonomyCreateOutput = Awaited<ReturnType<typeof posthog.usersSignalAutonomyCreate>>;

const result: UsersSignalAutonomyCreateOutput = await posthog.usersSignalAutonomyCreate();

// Result shape (from schema): { id: string; user: { id: number; uuid: string; first_name: string; last_name: string; email: string }; autostart_priority?: "P0" | "P1" | "P2" | "P3" | "P4" | "" | null; slack_notification_integration_id: number | null...
```

### `posthog.usersDestroy`

- **HTTP**: `DELETE /api/users/{uuid}/`
- **OpenAPI operationId**: `users_destroy`
- **Path params**: `uuid`
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

type UsersDestroyInput = Parameters<typeof posthog.usersDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type UsersDestroyOutput = Awaited<ReturnType<typeof posthog.usersDestroy>>;

const result: UsersDestroyOutput = await posthog.usersDestroy();

// Result shape (from schema): unknown
```

### `posthog.usersRetrieve`

- **HTTP**: `GET /api/users/{uuid}/`
- **What it does**: Retrieve a user's profile and settings. Pass `@me` as the UUID to fetch the authenticated user; non-staff callers may only access their own account.
- **OpenAPI operationId**: `users_retrieve`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ date_joined: string; uuid: string; distinct_id: string | null; first_name?: string; last_name?: string; email: string; pending_email: string | null; is_email_verified: boolean | null; notification_settings?: { [key: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersRetrieveInput = Parameters<typeof posthog.usersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UsersRetrieveOutput = Awaited<ReturnType<typeof posthog.usersRetrieve>>;

const result: UsersRetrieveOutput = await posthog.usersRetrieve();

// Result shape (from schema): { date_joined: string; uuid: string; distinct_id: string | null; first_name?: string; last_name?: string; email: string; pending_email: string | null; is_email_verified: boolean | null; notification_settings?: { [key: s...
```

### `posthog.usersPartialUpdate`

- **HTTP**: `PATCH /api/users/{uuid}/`
- **What it does**: Update one or more of the authenticated user's profile fields or settings.
- **OpenAPI operationId**: `users_partial_update`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ date_joined: string; uuid: string; distinct_id: string | null; first_name?: string; last_name?: string; email: string; pending_email: string | null; is_email_verified: boolean | null; notification_settings?: { [key: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersPartialUpdateInput = Parameters<typeof posthog.usersPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersPartialUpdateOutput = Awaited<ReturnType<typeof posthog.usersPartialUpdate>>;

const result: UsersPartialUpdateOutput = await posthog.usersPartialUpdate();

// Result shape (from schema): { date_joined: string; uuid: string; distinct_id: string | null; first_name?: string; last_name?: string; email: string; pending_email: string | null; is_email_verified: boolean | null; notification_settings?: { [key: s...
```

### `posthog.usersUpdate`

- **HTTP**: `PUT /api/users/{uuid}/`
- **What it does**: Replace the authenticated user's profile and settings. Pass `@me` as the UUID to update the authenticated user. Prefer the PATCH endpoint for partial updates — PUT requires every writable field to be provided.
- **OpenAPI operationId**: `users_update`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ date_joined: string; uuid: string; distinct_id: string | null; first_name?: string; last_name?: string; email: string; pending_email: string | null; is_email_verified: boolean | null; notification_settings?: { [key: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersUpdateInput = Parameters<typeof posthog.usersUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersUpdateOutput = Awaited<ReturnType<typeof posthog.usersUpdate>>;

const result: UsersUpdateOutput = await posthog.usersUpdate();

// Result shape (from schema): { date_joined: string; uuid: string; distinct_id: string | null; first_name?: string; last_name?: string; email: string; pending_email: string | null; is_email_verified: boolean | null; notification_settings?: { [key: s...
```

### `posthog.usersCredentialsReviewCompleteCreate`

- **HTTP**: `POST /api/users/{uuid}/credentials_review_complete/`
- **What it does**: Mark the user as having reviewed their existing credentials. Idempotent. Flips `requires_credential_review` to False so the post-login interstitial isn't shown again. Does not modify any credentials; the user revokes individual Personal API Keys and passkeys via their existing endpoints from the same screen.
- **OpenAPI operationId**: `users_credentials_review_complete_create`
- **Path params**: `uuid`
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

type UsersCredentialsReviewCompleteCreateInput = Parameters<typeof posthog.usersCredentialsReviewCompleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersCredentialsReviewCompleteCreateOutput = Awaited<ReturnType<typeof posthog.usersCredentialsReviewCompleteCreate>>;

const result: UsersCredentialsReviewCompleteCreateOutput = await posthog.usersCredentialsReviewCompleteCreate();

// Result shape (from schema): unknown
```

### `posthog.usersGithubLoginRetrieve`

- **HTTP**: `GET /api/users/{uuid}/github_login/`
- **OpenAPI operationId**: `users_github_login_retrieve`
- **Path params**: `uuid`
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

type UsersGithubLoginRetrieveInput = Parameters<typeof posthog.usersGithubLoginRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UsersGithubLoginRetrieveOutput = Awaited<ReturnType<typeof posthog.usersGithubLoginRetrieve>>;

const result: UsersGithubLoginRetrieveOutput = await posthog.usersGithubLoginRetrieve();

// Result shape (from schema): unknown
```

### `posthog.usersHedgehogConfigRetrieve`

- **HTTP**: `GET /api/users/{uuid}/hedgehog_config/`
- **OpenAPI operationId**: `users_hedgehog_config_retrieve`
- **Path params**: `uuid`
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

type UsersHedgehogConfigRetrieveInput = Parameters<typeof posthog.usersHedgehogConfigRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UsersHedgehogConfigRetrieveOutput = Awaited<ReturnType<typeof posthog.usersHedgehogConfigRetrieve>>;

const result: UsersHedgehogConfigRetrieveOutput = await posthog.usersHedgehogConfigRetrieve();

// Result shape (from schema): unknown
```

### `posthog.usersHedgehogConfigPartialUpdate`

- **HTTP**: `PATCH /api/users/{uuid}/hedgehog_config/`
- **OpenAPI operationId**: `users_hedgehog_config_partial_update`
- **Path params**: `uuid`
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

type UsersHedgehogConfigPartialUpdateInput = Parameters<typeof posthog.usersHedgehogConfigPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersHedgehogConfigPartialUpdateOutput = Awaited<ReturnType<typeof posthog.usersHedgehogConfigPartialUpdate>>;

const result: UsersHedgehogConfigPartialUpdateOutput = await posthog.usersHedgehogConfigPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.usersIntegrationsList`

- **HTTP**: `GET /api/users/{uuid}/integrations/`
- **What it does**: List the user's personal integrations of a given kind
- **OpenAPI operationId**: `users_integrations_list`
- **Path params**: `uuid`
- **Query params**: `kind`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ results: ({ id: string; kind: string; installation_id: string; repository_selection?: string | null; account?: { type?: string | null; name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersIntegrationsListInput = Parameters<typeof posthog.usersIntegrationsList> extends [infer T, ...unknown[]] ? T : undefined;
type UsersIntegrationsListOutput = Awaited<ReturnType<typeof posthog.usersIntegrationsList>>;

const result: UsersIntegrationsListOutput = await posthog.usersIntegrationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ results: ({ id: string; kind: string; installation_id: string; repository_selection?: string | null; account?: { type?: string | null; name?: ...
```

### `posthog.usersIntegrationsGithubDestroy`

- **HTTP**: `DELETE /api/users/{uuid}/integrations/github/{installation_id}/`
- **What it does**: Disconnect a personal GitHub integration
- **OpenAPI operationId**: `users_integrations_github_destroy`
- **Path params**: `installation_id`, `uuid`
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

type UsersIntegrationsGithubDestroyInput = Parameters<typeof posthog.usersIntegrationsGithubDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type UsersIntegrationsGithubDestroyOutput = Awaited<ReturnType<typeof posthog.usersIntegrationsGithubDestroy>>;

const result: UsersIntegrationsGithubDestroyOutput = await posthog.usersIntegrationsGithubDestroy();

// Result shape (from schema): unknown
```

### `posthog.usersIntegrationsGithubBranchesRetrieve`

- **HTTP**: `GET /api/users/{uuid}/integrations/github/{installation_id}/branches/`
- **What it does**: List branches for a personal GitHub installation repository
- **OpenAPI operationId**: `users_integrations_github_branches_retrieve`
- **Path params**: `installation_id`, `uuid`
- **Query params**: `limit`, `offset`, `repo`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ branches: (string)[]; default_branch?: string | null; has_more: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersIntegrationsGithubBranchesRetrieveInput = Parameters<typeof posthog.usersIntegrationsGithubBranchesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UsersIntegrationsGithubBranchesRetrieveOutput = Awaited<ReturnType<typeof posthog.usersIntegrationsGithubBranchesRetrieve>>;

const result: UsersIntegrationsGithubBranchesRetrieveOutput = await posthog.usersIntegrationsGithubBranchesRetrieve();

// Result shape (from schema): { branches: (string)[]; default_branch?: string | null; has_more: boolean }
```

### `posthog.usersIntegrationsGithubReposRetrieve`

- **HTTP**: `GET /api/users/{uuid}/integrations/github/{installation_id}/repos/`
- **What it does**: List repositories for a personal GitHub installation
- **OpenAPI operationId**: `users_integrations_github_repos_retrieve`
- **Path params**: `installation_id`, `uuid`
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ repositories: ({ id: number; name: string; full_name: string; private?: boolean; default_branch?: string; language?: string; pushed_at?: string; archived?: boolean; can_push?: boolean })[]; has_more: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersIntegrationsGithubReposRetrieveInput = Parameters<typeof posthog.usersIntegrationsGithubReposRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UsersIntegrationsGithubReposRetrieveOutput = Awaited<ReturnType<typeof posthog.usersIntegrationsGithubReposRetrieve>>;

const result: UsersIntegrationsGithubReposRetrieveOutput = await posthog.usersIntegrationsGithubReposRetrieve();

// Result shape (from schema): { repositories: ({ id: number; name: string; full_name: string; private?: boolean; default_branch?: string; language?: string; pushed_at?: string; archived?: boolean; can_push?: boolean })[]; has_more: boolean }
```

### `posthog.usersIntegrationsGithubReposRefreshCreate`

- **HTTP**: `POST /api/users/{uuid}/integrations/github/{installation_id}/repos/refresh/`
- **What it does**: Refresh repositories for a personal GitHub installation
- **OpenAPI operationId**: `users_integrations_github_repos_refresh_create`
- **Path params**: `installation_id`, `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ repositories: ({ id: number; name: string; full_name: string; private?: boolean; default_branch?: string; language?: string; pushed_at?: string; archived?: boolean; can_push?: boolean })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersIntegrationsGithubReposRefreshCreateInput = Parameters<typeof posthog.usersIntegrationsGithubReposRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersIntegrationsGithubReposRefreshCreateOutput = Awaited<ReturnType<typeof posthog.usersIntegrationsGithubReposRefreshCreate>>;

const result: UsersIntegrationsGithubReposRefreshCreateOutput = await posthog.usersIntegrationsGithubReposRefreshCreate();

// Result shape (from schema): { repositories: ({ id: number; name: string; full_name: string; private?: boolean; default_branch?: string; language?: string; pushed_at?: string; archived?: boolean; can_push?: boolean })[] }
```

### `posthog.usersIntegrationsGithubPrepareCallbackCreate`

- **HTTP**: `POST /api/users/{uuid}/integrations/github/prepare_callback/`
- **What it does**: Seed personal GitHub manage callback state before opening installation settings on GitHub.
- **OpenAPI operationId**: `users_integrations_github_prepare_callback_create`
- **Path params**: `uuid`
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

type UsersIntegrationsGithubPrepareCallbackCreateInput = Parameters<typeof posthog.usersIntegrationsGithubPrepareCallbackCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersIntegrationsGithubPrepareCallbackCreateOutput = Awaited<ReturnType<typeof posthog.usersIntegrationsGithubPrepareCallbackCreate>>;

const result: UsersIntegrationsGithubPrepareCallbackCreateOutput = await posthog.usersIntegrationsGithubPrepareCallbackCreate();

// Result shape (from schema): unknown
```

### `posthog.usersIntegrationsGithubStartCreate`

- **HTTP**: `POST /api/users/{uuid}/integrations/github/start/`
- **What it does**: Start GitHub personal integration linking
- **OpenAPI operationId**: `users_integrations_github_start_create`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ install_url: string; connect_flow: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersIntegrationsGithubStartCreateInput = Parameters<typeof posthog.usersIntegrationsGithubStartCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersIntegrationsGithubStartCreateOutput = Awaited<ReturnType<typeof posthog.usersIntegrationsGithubStartCreate>>;

const result: UsersIntegrationsGithubStartCreateOutput = await posthog.usersIntegrationsGithubStartCreate();

// Result shape (from schema): { install_url: string; connect_flow: string }
```

### `posthog.usersIntegrationsSlackDestroy`

- **HTTP**: `DELETE /api/users/{uuid}/integrations/slack/{slack_user_id}/`
- **What it does**: Unlink a Slack identity
- **OpenAPI operationId**: `users_integrations_slack_destroy`
- **Path params**: `slack_user_id`, `uuid`
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

type UsersIntegrationsSlackDestroyInput = Parameters<typeof posthog.usersIntegrationsSlackDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type UsersIntegrationsSlackDestroyOutput = Awaited<ReturnType<typeof posthog.usersIntegrationsSlackDestroy>>;

const result: UsersIntegrationsSlackDestroyOutput = await posthog.usersIntegrationsSlackDestroy();

// Result shape (from schema): unknown
```

### `posthog.usersIntegrationsSlackLinkableWorkspacesRetrieve`

- **HTTP**: `GET /api/users/{uuid}/integrations/slack/linkable_workspaces/`
- **What it does**: List Slack workspaces this user could link to
- **OpenAPI operationId**: `users_integrations_slack_linkable_workspaces_retrieve`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ posthog_team_id: number; posthog_team_name: string; posthog_organization_name: string; slack_team_id: string; slack_team_name?: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersIntegrationsSlackLinkableWorkspacesRetrieveInput = Parameters<typeof posthog.usersIntegrationsSlackLinkableWorkspacesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UsersIntegrationsSlackLinkableWorkspacesRetrieveOutput = Awaited<ReturnType<typeof posthog.usersIntegrationsSlackLinkableWorkspacesRetrieve>>;

const result: UsersIntegrationsSlackLinkableWorkspacesRetrieveOutput = await posthog.usersIntegrationsSlackLinkableWorkspacesRetrieve();

// Result shape (from schema): { results: ({ posthog_team_id: number; posthog_team_name: string; posthog_organization_name: string; slack_team_id: string; slack_team_name?: string | null })[] }
```

### `posthog.usersIntegrationsSlackStartCreate`

- **HTTP**: `POST /api/users/{uuid}/integrations/slack/start/`
- **What it does**: Start Slack identity link from settings
- **OpenAPI operationId**: `users_integrations_slack_start_create`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ install_url: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersIntegrationsSlackStartCreateInput = Parameters<typeof posthog.usersIntegrationsSlackStartCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersIntegrationsSlackStartCreateOutput = Awaited<ReturnType<typeof posthog.usersIntegrationsSlackStartCreate>>;

const result: UsersIntegrationsSlackStartCreateOutput = await posthog.usersIntegrationsSlackStartCreate();

// Result shape (from schema): { install_url: string }
```

### `posthog.usersLoginSessionsList`

- **HTTP**: `GET /api/users/{uuid}/login_sessions/`
- **What it does**: List the cookie-auth login sessions for the current user. Self-only — never another user.
- **OpenAPI operationId**: `users_login_sessions_list`
- **Path params**: `uuid`
- **Query params**: `email`, `is_staff`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; created_at: string | null; last_activity: string; location: string; device: string; login_method: string; is_current: boolean })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersLoginSessionsListInput = Parameters<typeof posthog.usersLoginSessionsList> extends [infer T, ...unknown[]] ? T : undefined;
type UsersLoginSessionsListOutput = Awaited<ReturnType<typeof posthog.usersLoginSessionsList>>;

const result: UsersLoginSessionsListOutput = await posthog.usersLoginSessionsList();

// Result shape (from schema): ({ id: string; created_at: string | null; last_activity: string; location: string; device: string; login_method: string; is_current: boolean })[]
```

### `posthog.usersLoginSessionsDestroy`

- **HTTP**: `DELETE /api/users/{uuid}/login_sessions/{session_id}/`
- **What it does**: Revoke a single login session belonging to the current user. Self-only.

Requires recent auth (TimeSensitiveActionPermission) so a stolen cookie can't weaponize
revocation, and is blocked while impersonating via ImpersonationBlockedPathsMiddleware.
- **OpenAPI operationId**: `users_login_sessions_destroy`
- **Path params**: `session_id`, `uuid`
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

type UsersLoginSessionsDestroyInput = Parameters<typeof posthog.usersLoginSessionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type UsersLoginSessionsDestroyOutput = Awaited<ReturnType<typeof posthog.usersLoginSessionsDestroy>>;

const result: UsersLoginSessionsDestroyOutput = await posthog.usersLoginSessionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.usersLoginSessionsRevokeOthersCreate`

- **HTTP**: `POST /api/users/{uuid}/login_sessions/revoke_others/`
- **What it does**: Revoke every login session for the current user except the one making this request. Self-only.

Requires recent auth (TimeSensitiveActionPermission) so a stolen cookie can't weaponize the
"log out everywhere else" lock-out, and is blocked while impersonating.
- **OpenAPI operationId**: `users_login_sessions_revoke_others_create`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ revoked_count: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersLoginSessionsRevokeOthersCreateInput = Parameters<typeof posthog.usersLoginSessionsRevokeOthersCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersLoginSessionsRevokeOthersCreateOutput = Awaited<ReturnType<typeof posthog.usersLoginSessionsRevokeOthersCreate>>;

const result: UsersLoginSessionsRevokeOthersCreateOutput = await posthog.usersLoginSessionsRevokeOthersCreate();

// Result shape (from schema): { revoked_count: number }
```

### `posthog.usersOnboardingSkipCreate`

- **HTTP**: `POST /api/users/{uuid}/onboarding/skip/`
- **What it does**: Mark the current user as having exited onboarding with a non-delegated reason.
Idempotent: the skip timestamp is only set on the first successful call.

Callers wanting to delegate setup to a teammate must use the dedicated
/organizations/{id}/invites/delegate/ endpoint, which atomically creates the
invite and sets reason="delegated". This endpoint rejects that reason so state
can't be faked without a real invite.
- **OpenAPI operationId**: `users_onboarding_skip_create`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ date_joined: string; uuid: string; distinct_id: string | null; first_name?: string; last_name?: string; email: string; pending_email: string | null; is_email_verified: boolean | null; notification_settings?: { [key: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersOnboardingSkipCreateInput = Parameters<typeof posthog.usersOnboardingSkipCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersOnboardingSkipCreateOutput = Awaited<ReturnType<typeof posthog.usersOnboardingSkipCreate>>;

const result: UsersOnboardingSkipCreateOutput = await posthog.usersOnboardingSkipCreate();

// Result shape (from schema): { date_joined: string; uuid: string; distinct_id: string | null; first_name?: string; last_name?: string; email: string; pending_email: string | null; is_email_verified: boolean | null; notification_settings?: { [key: s...
```

### `posthog.usersPushTokensCreate`

- **HTTP**: `POST /api/users/{uuid}/push_tokens/`
- **What it does**: Register a push notification token
- **OpenAPI operationId**: `users_push_tokens_create`
- **Path params**: `uuid`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; platform: "ios" | "android" | "web"; created_at: string; last_seen_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UsersPushTokensCreateInput = Parameters<typeof posthog.usersPushTokensCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersPushTokensCreateOutput = Awaited<ReturnType<typeof posthog.usersPushTokensCreate>>;

const result: UsersPushTokensCreateOutput = await posthog.usersPushTokensCreate();

// Result shape (from schema): { id: string; platform: "ios" | "android" | "web"; created_at: string; last_seen_at: string }
```

### `posthog.usersPushTokensUnregisterCreate`

- **HTTP**: `POST /api/users/{uuid}/push_tokens/unregister/`
- **What it does**: Unregister a push notification token
- **OpenAPI operationId**: `users_push_tokens_unregister_create`
- **Path params**: `uuid`
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

type UsersPushTokensUnregisterCreateInput = Parameters<typeof posthog.usersPushTokensUnregisterCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersPushTokensUnregisterCreateOutput = Awaited<ReturnType<typeof posthog.usersPushTokensUnregisterCreate>>;

const result: UsersPushTokensUnregisterCreateOutput = await posthog.usersPushTokensUnregisterCreate();

// Result shape (from schema): unknown
```

### `posthog.usersScenePersonalisationCreate`

- **HTTP**: `POST /api/users/{uuid}/scene_personalisation/`
- **OpenAPI operationId**: `users_scene_personalisation_create`
- **Path params**: `uuid`
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

type UsersScenePersonalisationCreateInput = Parameters<typeof posthog.usersScenePersonalisationCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersScenePersonalisationCreateOutput = Awaited<ReturnType<typeof posthog.usersScenePersonalisationCreate>>;

const result: UsersScenePersonalisationCreateOutput = await posthog.usersScenePersonalisationCreate();

// Result shape (from schema): unknown
```

### `posthog.usersStart2FaSetupRetrieve`

- **HTTP**: `GET /api/users/{uuid}/start_2fa_setup/`
- **OpenAPI operationId**: `users_start_2fa_setup_retrieve`
- **Path params**: `uuid`
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

type UsersStart2FaSetupRetrieveInput = Parameters<typeof posthog.usersStart2FaSetupRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UsersStart2FaSetupRetrieveOutput = Awaited<ReturnType<typeof posthog.usersStart2FaSetupRetrieve>>;

const result: UsersStart2FaSetupRetrieveOutput = await posthog.usersStart2FaSetupRetrieve();

// Result shape (from schema): unknown
```

### `posthog.usersTwoFactorBackupCodesCreate`

- **HTTP**: `POST /api/users/{uuid}/two_factor_backup_codes/`
- **What it does**: Generate new backup codes, invalidating any existing ones
- **OpenAPI operationId**: `users_two_factor_backup_codes_create`
- **Path params**: `uuid`
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

type UsersTwoFactorBackupCodesCreateInput = Parameters<typeof posthog.usersTwoFactorBackupCodesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersTwoFactorBackupCodesCreateOutput = Awaited<ReturnType<typeof posthog.usersTwoFactorBackupCodesCreate>>;

const result: UsersTwoFactorBackupCodesCreateOutput = await posthog.usersTwoFactorBackupCodesCreate();

// Result shape (from schema): unknown
```

### `posthog.usersTwoFactorDisableCreate`

- **HTTP**: `POST /api/users/{uuid}/two_factor_disable/`
- **What it does**: Disable 2FA and remove all related devices
- **OpenAPI operationId**: `users_two_factor_disable_create`
- **Path params**: `uuid`
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

type UsersTwoFactorDisableCreateInput = Parameters<typeof posthog.usersTwoFactorDisableCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersTwoFactorDisableCreateOutput = Awaited<ReturnType<typeof posthog.usersTwoFactorDisableCreate>>;

const result: UsersTwoFactorDisableCreateOutput = await posthog.usersTwoFactorDisableCreate();

// Result shape (from schema): unknown
```

### `posthog.usersTwoFactorStartSetupRetrieve`

- **HTTP**: `GET /api/users/{uuid}/two_factor_start_setup/`
- **OpenAPI operationId**: `users_two_factor_start_setup_retrieve`
- **Path params**: `uuid`
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

type UsersTwoFactorStartSetupRetrieveInput = Parameters<typeof posthog.usersTwoFactorStartSetupRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UsersTwoFactorStartSetupRetrieveOutput = Awaited<ReturnType<typeof posthog.usersTwoFactorStartSetupRetrieve>>;

const result: UsersTwoFactorStartSetupRetrieveOutput = await posthog.usersTwoFactorStartSetupRetrieve();

// Result shape (from schema): unknown
```

### `posthog.usersTwoFactorStatusRetrieve`

- **HTTP**: `GET /api/users/{uuid}/two_factor_status/`
- **What it does**: Get current 2FA status including backup codes if enabled
- **OpenAPI operationId**: `users_two_factor_status_retrieve`
- **Path params**: `uuid`
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

type UsersTwoFactorStatusRetrieveInput = Parameters<typeof posthog.usersTwoFactorStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UsersTwoFactorStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.usersTwoFactorStatusRetrieve>>;

const result: UsersTwoFactorStatusRetrieveOutput = await posthog.usersTwoFactorStatusRetrieve();

// Result shape (from schema): unknown
```

### `posthog.usersTwoFactorValidateCreate`

- **HTTP**: `POST /api/users/{uuid}/two_factor_validate/`
- **OpenAPI operationId**: `users_two_factor_validate_create`
- **Path params**: `uuid`
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

type UsersTwoFactorValidateCreateInput = Parameters<typeof posthog.usersTwoFactorValidateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersTwoFactorValidateCreateOutput = Awaited<ReturnType<typeof posthog.usersTwoFactorValidateCreate>>;

const result: UsersTwoFactorValidateCreateOutput = await posthog.usersTwoFactorValidateCreate();

// Result shape (from schema): unknown
```

### `posthog.usersValidate2FaCreate`

- **HTTP**: `POST /api/users/{uuid}/validate_2fa/`
- **OpenAPI operationId**: `users_validate_2fa_create`
- **Path params**: `uuid`
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

type UsersValidate2FaCreateInput = Parameters<typeof posthog.usersValidate2FaCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersValidate2FaCreateOutput = Awaited<ReturnType<typeof posthog.usersValidate2FaCreate>>;

const result: UsersValidate2FaCreateOutput = await posthog.usersValidate2FaCreate();

// Result shape (from schema): unknown
```

### `posthog.usersCancelEmailChangeRequestPartialUpdate`

- **HTTP**: `PATCH /api/users/cancel_email_change_request/`
- **OpenAPI operationId**: `users_cancel_email_change_request_partial_update`
- **Path params**: None
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

type UsersCancelEmailChangeRequestPartialUpdateInput = Parameters<typeof posthog.usersCancelEmailChangeRequestPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersCancelEmailChangeRequestPartialUpdateOutput = Awaited<ReturnType<typeof posthog.usersCancelEmailChangeRequestPartialUpdate>>;

const result: UsersCancelEmailChangeRequestPartialUpdateOutput = await posthog.usersCancelEmailChangeRequestPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.usersRequestEmailVerificationCreate`

- **HTTP**: `POST /api/users/request_email_verification/`
- **OpenAPI operationId**: `users_request_email_verification_create`
- **Path params**: None
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

type UsersRequestEmailVerificationCreateInput = Parameters<typeof posthog.usersRequestEmailVerificationCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersRequestEmailVerificationCreateOutput = Awaited<ReturnType<typeof posthog.usersRequestEmailVerificationCreate>>;

const result: UsersRequestEmailVerificationCreateOutput = await posthog.usersRequestEmailVerificationCreate();

// Result shape (from schema): unknown
```

### `posthog.usersVerifyEmailCreate`

- **HTTP**: `POST /api/users/verify_email/`
- **OpenAPI operationId**: `users_verify_email_create`
- **Path params**: None
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

type UsersVerifyEmailCreateInput = Parameters<typeof posthog.usersVerifyEmailCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UsersVerifyEmailCreateOutput = Awaited<ReturnType<typeof posthog.usersVerifyEmailCreate>>;

const result: UsersVerifyEmailCreateOutput = await posthog.usersVerifyEmailCreate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
