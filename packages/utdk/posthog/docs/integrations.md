# Integrations

## Operations

### `posthog.environmentsIntegrationsList`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/`
- **OpenAPI operationId**: `environments_integrations_list`
- **Path params**: None
- **Query params**: `kind`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customeri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsListInput = Parameters<typeof posthog.environmentsIntegrationsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsListOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsList>>;

const result: EnvironmentsIntegrationsListOutput = await posthog.environmentsIntegrationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customeri...
```

### `posthog.environmentsIntegrationsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/integrations/`
- **OpenAPI operationId**: `environments_integrations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsCreateInput = Parameters<typeof posthog.environmentsIntegrationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsCreate>>;

const result: EnvironmentsIntegrationsCreateOutput = await posthog.environmentsIntegrationsCreate();

// Result shape (from schema): { id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...
```

### `posthog.environmentsIntegrationsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/integrations/{id}/`
- **OpenAPI operationId**: `environments_integrations_destroy`
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

type EnvironmentsIntegrationsDestroyInput = Parameters<typeof posthog.environmentsIntegrationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsDestroy>>;

const result: EnvironmentsIntegrationsDestroyOutput = await posthog.environmentsIntegrationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/`
- **OpenAPI operationId**: `environments_integrations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsRetrieve>>;

const result: EnvironmentsIntegrationsRetrieveOutput = await posthog.environmentsIntegrationsRetrieve();

// Result shape (from schema): { id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...
```

### `posthog.environmentsIntegrationsAnthropicManagedAgentEnvsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/anthropic_managed_agent_environments/`
- **OpenAPI operationId**: `environments_integrations_anthropic_managed_agent_envs_retrieve`
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

type EnvironmentsIntegrationsAnthropicManagedAgentEnvsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsAnthropicManagedAgentEnvsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsAnthropicManagedAgentEnvsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsAnthropicManagedAgentEnvsRetrieve>>;

const result: EnvironmentsIntegrationsAnthropicManagedAgentEnvsRetrieveOutput = await posthog.environmentsIntegrationsAnthropicManagedAgentEnvsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsAnthropicManagedAgentVaultsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/anthropic_managed_agent_vaults/`
- **OpenAPI operationId**: `environments_integrations_anthropic_managed_agent_vaults_retrieve`
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

type EnvironmentsIntegrationsAnthropicManagedAgentVaultsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsAnthropicManagedAgentVaultsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsAnthropicManagedAgentVaultsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsAnthropicManagedAgentVaultsRetrieve>>;

const result: EnvironmentsIntegrationsAnthropicManagedAgentVaultsRetrieveOutput = await posthog.environmentsIntegrationsAnthropicManagedAgentVaultsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsAnthropicManagedAgentsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/anthropic_managed_agents/`
- **OpenAPI operationId**: `environments_integrations_anthropic_managed_agents_retrieve`
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

type EnvironmentsIntegrationsAnthropicManagedAgentsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsAnthropicManagedAgentsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsAnthropicManagedAgentsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsAnthropicManagedAgentsRetrieve>>;

const result: EnvironmentsIntegrationsAnthropicManagedAgentsRetrieveOutput = await posthog.environmentsIntegrationsAnthropicManagedAgentsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsChannelsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/channels/`
- **OpenAPI operationId**: `environments_integrations_channels_retrieve`
- **Path params**: `id`
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ channels: ({ id: string; name: string; is_private: boolean; is_member: boolean; is_ext_shared: boolean; is_private_without_access: boolean })[]; lastRefreshedAt?: string | null; has_more?: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsChannelsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsChannelsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsChannelsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsChannelsRetrieve>>;

const result: EnvironmentsIntegrationsChannelsRetrieveOutput = await posthog.environmentsIntegrationsChannelsRetrieve();

// Result shape (from schema): { channels: ({ id: string; name: string; is_private: boolean; is_member: boolean; is_ext_shared: boolean; is_private_without_access: boolean })[]; lastRefreshedAt?: string | null; has_more?: boolean }
```

### `posthog.environmentsIntegrationsClickupListsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/clickup_lists/`
- **OpenAPI operationId**: `environments_integrations_clickup_lists_retrieve`
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

type EnvironmentsIntegrationsClickupListsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsClickupListsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsClickupListsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsClickupListsRetrieve>>;

const result: EnvironmentsIntegrationsClickupListsRetrieveOutput = await posthog.environmentsIntegrationsClickupListsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsClickupSpacesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/clickup_spaces/`
- **OpenAPI operationId**: `environments_integrations_clickup_spaces_retrieve`
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

type EnvironmentsIntegrationsClickupSpacesRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsClickupSpacesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsClickupSpacesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsClickupSpacesRetrieve>>;

const result: EnvironmentsIntegrationsClickupSpacesRetrieveOutput = await posthog.environmentsIntegrationsClickupSpacesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsClickupWorkspacesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/clickup_workspaces/`
- **OpenAPI operationId**: `environments_integrations_clickup_workspaces_retrieve`
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

type EnvironmentsIntegrationsClickupWorkspacesRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsClickupWorkspacesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsClickupWorkspacesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsClickupWorkspacesRetrieve>>;

const result: EnvironmentsIntegrationsClickupWorkspacesRetrieveOutput = await posthog.environmentsIntegrationsClickupWorkspacesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsEmailPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/integrations/{id}/email/`
- **OpenAPI operationId**: `environments_integrations_email_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsEmailPartialUpdateInput = Parameters<typeof posthog.environmentsIntegrationsEmailPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsEmailPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsEmailPartialUpdate>>;

const result: EnvironmentsIntegrationsEmailPartialUpdateOutput = await posthog.environmentsIntegrationsEmailPartialUpdate();

// Result shape (from schema): { id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...
```

### `posthog.environmentsIntegrationsEmailVerifyCreate`

- **HTTP**: `POST /api/environments/{environment_id}/integrations/{id}/email/verify/`
- **OpenAPI operationId**: `environments_integrations_email_verify_create`
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

type EnvironmentsIntegrationsEmailVerifyCreateInput = Parameters<typeof posthog.environmentsIntegrationsEmailVerifyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsEmailVerifyCreateOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsEmailVerifyCreate>>;

const result: EnvironmentsIntegrationsEmailVerifyCreateOutput = await posthog.environmentsIntegrationsEmailVerifyCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsGithubBranchesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/github_branches/`
- **OpenAPI operationId**: `environments_integrations_github_branches_retrieve`
- **Path params**: `id`
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

type EnvironmentsIntegrationsGithubBranchesRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsGithubBranchesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsGithubBranchesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsGithubBranchesRetrieve>>;

const result: EnvironmentsIntegrationsGithubBranchesRetrieveOutput = await posthog.environmentsIntegrationsGithubBranchesRetrieve();

// Result shape (from schema): { branches: (string)[]; default_branch?: string | null; has_more: boolean }
```

### `posthog.environmentsIntegrationsGithubReposRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/github_repos/`
- **OpenAPI operationId**: `environments_integrations_github_repos_retrieve`
- **Path params**: `id`
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

type EnvironmentsIntegrationsGithubReposRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsGithubReposRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsGithubReposRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsGithubReposRetrieve>>;

const result: EnvironmentsIntegrationsGithubReposRetrieveOutput = await posthog.environmentsIntegrationsGithubReposRetrieve();

// Result shape (from schema): { repositories: ({ id: number; name: string; full_name: string; private?: boolean; default_branch?: string; language?: string; pushed_at?: string; archived?: boolean; can_push?: boolean })[]; has_more: boolean }
```

### `posthog.environmentsIntegrationsGithubReposRefreshCreate`

- **HTTP**: `POST /api/environments/{environment_id}/integrations/{id}/github_repos/refresh/`
- **OpenAPI operationId**: `environments_integrations_github_repos_refresh_create`
- **Path params**: `id`
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

type EnvironmentsIntegrationsGithubReposRefreshCreateInput = Parameters<typeof posthog.environmentsIntegrationsGithubReposRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsGithubReposRefreshCreateOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsGithubReposRefreshCreate>>;

const result: EnvironmentsIntegrationsGithubReposRefreshCreateOutput = await posthog.environmentsIntegrationsGithubReposRefreshCreate();

// Result shape (from schema): { repositories: ({ id: number; name: string; full_name: string; private?: boolean; default_branch?: string; language?: string; pushed_at?: string; archived?: boolean; can_push?: boolean })[] }
```

### `posthog.environmentsIntegrationsGithubTeamsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/github_teams/`
- **OpenAPI operationId**: `environments_integrations_github_teams_retrieve`
- **Path params**: `id`
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ teams: ({ id: number; slug: string; name: string })[]; has_more: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsGithubTeamsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsGithubTeamsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsGithubTeamsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsGithubTeamsRetrieve>>;

const result: EnvironmentsIntegrationsGithubTeamsRetrieveOutput = await posthog.environmentsIntegrationsGithubTeamsRetrieve();

// Result shape (from schema): { teams: ({ id: number; slug: string; name: string })[]; has_more: boolean }
```

### `posthog.environmentsIntegrationsGoogleAccessibleAccountsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/google_accessible_accounts/`
- **OpenAPI operationId**: `environments_integrations_google_accessible_accounts_retrieve`
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

type EnvironmentsIntegrationsGoogleAccessibleAccountsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsGoogleAccessibleAccountsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsGoogleAccessibleAccountsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsGoogleAccessibleAccountsRetrieve>>;

const result: EnvironmentsIntegrationsGoogleAccessibleAccountsRetrieveOutput = await posthog.environmentsIntegrationsGoogleAccessibleAccountsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsGoogleConversionActionsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/google_conversion_actions/`
- **OpenAPI operationId**: `environments_integrations_google_conversion_actions_retrieve`
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

type EnvironmentsIntegrationsGoogleConversionActionsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsGoogleConversionActionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsGoogleConversionActionsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsGoogleConversionActionsRetrieve>>;

const result: EnvironmentsIntegrationsGoogleConversionActionsRetrieveOutput = await posthog.environmentsIntegrationsGoogleConversionActionsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsJiraProjectsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/jira_projects/`
- **OpenAPI operationId**: `environments_integrations_jira_projects_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ projects: ({ id: string; key: string; name: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsJiraProjectsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsJiraProjectsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsJiraProjectsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsJiraProjectsRetrieve>>;

const result: EnvironmentsIntegrationsJiraProjectsRetrieveOutput = await posthog.environmentsIntegrationsJiraProjectsRetrieve();

// Result shape (from schema): { projects: ({ id: string; key: string; name: string })[] }
```

### `posthog.environmentsIntegrationsLinearTeamsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/linear_teams/`
- **OpenAPI operationId**: `environments_integrations_linear_teams_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ teams: ({ id: string; name: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsLinearTeamsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsLinearTeamsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsLinearTeamsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsLinearTeamsRetrieve>>;

const result: EnvironmentsIntegrationsLinearTeamsRetrieveOutput = await posthog.environmentsIntegrationsLinearTeamsRetrieve();

// Result shape (from schema): { teams: ({ id: string; name: string })[] }
```

### `posthog.environmentsIntegrationsLinkedinAdsAccountsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/linkedin_ads_accounts/`
- **OpenAPI operationId**: `environments_integrations_linkedin_ads_accounts_retrieve`
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

type EnvironmentsIntegrationsLinkedinAdsAccountsRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsLinkedinAdsAccountsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsLinkedinAdsAccountsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsLinkedinAdsAccountsRetrieve>>;

const result: EnvironmentsIntegrationsLinkedinAdsAccountsRetrieveOutput = await posthog.environmentsIntegrationsLinkedinAdsAccountsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsLinkedinAdsConversionRulesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/linkedin_ads_conversion_rules/`
- **OpenAPI operationId**: `environments_integrations_linkedin_ads_conversion_rules_retrieve`
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

type EnvironmentsIntegrationsLinkedinAdsConversionRulesRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsLinkedinAdsConversionRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsLinkedinAdsConversionRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsLinkedinAdsConversionRulesRetrieve>>;

const result: EnvironmentsIntegrationsLinkedinAdsConversionRulesRetrieveOutput = await posthog.environmentsIntegrationsLinkedinAdsConversionRulesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsTwilioPhoneNumbersRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/{id}/twilio_phone_numbers/`
- **OpenAPI operationId**: `environments_integrations_twilio_phone_numbers_retrieve`
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

type EnvironmentsIntegrationsTwilioPhoneNumbersRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsTwilioPhoneNumbersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsTwilioPhoneNumbersRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsTwilioPhoneNumbersRetrieve>>;

const result: EnvironmentsIntegrationsTwilioPhoneNumbersRetrieveOutput = await posthog.environmentsIntegrationsTwilioPhoneNumbersRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsAuthorizeRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/authorize/`
- **OpenAPI operationId**: `environments_integrations_authorize_retrieve`
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

type EnvironmentsIntegrationsAuthorizeRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsAuthorizeRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsAuthorizeRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsAuthorizeRetrieve>>;

const result: EnvironmentsIntegrationsAuthorizeRetrieveOutput = await posthog.environmentsIntegrationsAuthorizeRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsDomainConnectApplyUrlCreate`

- **HTTP**: `POST /api/environments/{environment_id}/integrations/domain-connect/apply-url/`
- **What it does**: Unified endpoint for generating Domain Connect apply URLs.

Accepts a context ("email" or "proxy") and the relevant resource ID.
The backend resolves the domain, template variables, and service ID
based on context, then builds the signed apply URL.
- **OpenAPI operationId**: `environments_integrations_domain_connect_apply_url_create`
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

type EnvironmentsIntegrationsDomainConnectApplyUrlCreateInput = Parameters<typeof posthog.environmentsIntegrationsDomainConnectApplyUrlCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsDomainConnectApplyUrlCreateOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsDomainConnectApplyUrlCreate>>;

const result: EnvironmentsIntegrationsDomainConnectApplyUrlCreateOutput = await posthog.environmentsIntegrationsDomainConnectApplyUrlCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsDomainConnectCheckRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/integrations/domain-connect/check/`
- **OpenAPI operationId**: `environments_integrations_domain_connect_check_retrieve`
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

type EnvironmentsIntegrationsDomainConnectCheckRetrieveInput = Parameters<typeof posthog.environmentsIntegrationsDomainConnectCheckRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsDomainConnectCheckRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsDomainConnectCheckRetrieve>>;

const result: EnvironmentsIntegrationsDomainConnectCheckRetrieveOutput = await posthog.environmentsIntegrationsDomainConnectCheckRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsGithubLinkExistingCreate`

- **HTTP**: `POST /api/environments/{environment_id}/integrations/github/link_existing/`
- **What it does**: Reuse a GitHub installation already linked to a sibling team in the same organization.
- **OpenAPI operationId**: `environments_integrations_github_link_existing_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsGithubLinkExistingCreateInput = Parameters<typeof posthog.environmentsIntegrationsGithubLinkExistingCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsGithubLinkExistingCreateOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsGithubLinkExistingCreate>>;

const result: EnvironmentsIntegrationsGithubLinkExistingCreateOutput = await posthog.environmentsIntegrationsGithubLinkExistingCreate();

// Result shape (from schema): { id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...
```

### `posthog.environmentsIntegrationsGithubOauthAuthorizeCreate`

- **HTTP**: `POST /api/environments/{environment_id}/integrations/github/oauth_authorize/`
- **What it does**: Mint a User OAuth URL to bootstrap a fresh `code` when the install flow returns without one.
- **OpenAPI operationId**: `environments_integrations_github_oauth_authorize_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ oauth_url: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsGithubOauthAuthorizeCreateInput = Parameters<typeof posthog.environmentsIntegrationsGithubOauthAuthorizeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsGithubOauthAuthorizeCreateOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsGithubOauthAuthorizeCreate>>;

const result: EnvironmentsIntegrationsGithubOauthAuthorizeCreateOutput = await posthog.environmentsIntegrationsGithubOauthAuthorizeCreate();

// Result shape (from schema): { oauth_url: string }
```

### `posthog.environmentsIntegrationsGithubPrepareCallbackCreate`

- **HTTP**: `POST /api/environments/{environment_id}/integrations/github/prepare_callback/`
- **What it does**: Seed GitHub setup callback state without redirecting to GitHub.

Used when the user opens an existing installation's settings on github.com (e.g. PostHog
Code "Update in GitHub") so the subsequent Setup URL redirect can be validated.
- **OpenAPI operationId**: `environments_integrations_github_prepare_callback_create`
- **Path params**: None
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

type EnvironmentsIntegrationsGithubPrepareCallbackCreateInput = Parameters<typeof posthog.environmentsIntegrationsGithubPrepareCallbackCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsGithubPrepareCallbackCreateOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsGithubPrepareCallbackCreate>>;

const result: EnvironmentsIntegrationsGithubPrepareCallbackCreateOutput = await posthog.environmentsIntegrationsGithubPrepareCallbackCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsIntegrationsRequestAccessCreate`

- **HTTP**: `POST /api/environments/{environment_id}/integrations/request_access/`
- **What it does**: Notify project admins that a member is requesting an integration be connected.
- **OpenAPI operationId**: `environments_integrations_request_access_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsIntegrationsRequestAccessCreateInput = Parameters<typeof posthog.environmentsIntegrationsRequestAccessCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIntegrationsRequestAccessCreateOutput = Awaited<ReturnType<typeof posthog.environmentsIntegrationsRequestAccessCreate>>;

const result: EnvironmentsIntegrationsRequestAccessCreateOutput = await posthog.environmentsIntegrationsRequestAccessCreate();

// Result shape (from schema): { success: boolean }
```

### `posthog.integrationsList`

- **HTTP**: `GET /api/projects/{project_id}/integrations/`
- **OpenAPI operationId**: `integrations_list`
- **Path params**: None
- **Query params**: `kind`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customeri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsListInput = Parameters<typeof posthog.integrationsList> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsListOutput = Awaited<ReturnType<typeof posthog.integrationsList>>;

const result: IntegrationsListOutput = await posthog.integrationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customeri...
```

### `posthog.integrationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/integrations/`
- **OpenAPI operationId**: `integrations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type IntegrationsCreateInput = Parameters<typeof posthog.integrationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsCreateOutput = Awaited<ReturnType<typeof posthog.integrationsCreate>>;

const result: IntegrationsCreateOutput = await posthog.integrationsCreate();

// Result shape (from schema): { id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...
```

### `posthog.integrationsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/integrations/{id}/`
- **OpenAPI operationId**: `integrations_destroy`
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

type IntegrationsDestroyInput = Parameters<typeof posthog.integrationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsDestroyOutput = Awaited<ReturnType<typeof posthog.integrationsDestroy>>;

const result: IntegrationsDestroyOutput = await posthog.integrationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.integrationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/`
- **OpenAPI operationId**: `integrations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsRetrieveInput = Parameters<typeof posthog.integrationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsRetrieve>>;

const result: IntegrationsRetrieveOutput = await posthog.integrationsRetrieve();

// Result shape (from schema): { id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...
```

### `posthog.integrationsAnthropicManagedAgentEnvsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/anthropic_managed_agent_environments/`
- **OpenAPI operationId**: `integrations_anthropic_managed_agent_envs_retrieve`
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

type IntegrationsAnthropicManagedAgentEnvsRetrieveInput = Parameters<typeof posthog.integrationsAnthropicManagedAgentEnvsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsAnthropicManagedAgentEnvsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsAnthropicManagedAgentEnvsRetrieve>>;

const result: IntegrationsAnthropicManagedAgentEnvsRetrieveOutput = await posthog.integrationsAnthropicManagedAgentEnvsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsAnthropicManagedAgentVaultsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/anthropic_managed_agent_vaults/`
- **OpenAPI operationId**: `integrations_anthropic_managed_agent_vaults_retrieve`
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

type IntegrationsAnthropicManagedAgentVaultsRetrieveInput = Parameters<typeof posthog.integrationsAnthropicManagedAgentVaultsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsAnthropicManagedAgentVaultsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsAnthropicManagedAgentVaultsRetrieve>>;

const result: IntegrationsAnthropicManagedAgentVaultsRetrieveOutput = await posthog.integrationsAnthropicManagedAgentVaultsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsAnthropicManagedAgentsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/anthropic_managed_agents/`
- **OpenAPI operationId**: `integrations_anthropic_managed_agents_retrieve`
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

type IntegrationsAnthropicManagedAgentsRetrieveInput = Parameters<typeof posthog.integrationsAnthropicManagedAgentsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsAnthropicManagedAgentsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsAnthropicManagedAgentsRetrieve>>;

const result: IntegrationsAnthropicManagedAgentsRetrieveOutput = await posthog.integrationsAnthropicManagedAgentsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsChannelsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/channels/`
- **OpenAPI operationId**: `integrations_channels_retrieve`
- **Path params**: `id`
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ channels: ({ id: string; name: string; is_private: boolean; is_member: boolean; is_ext_shared: boolean; is_private_without_access: boolean })[]; lastRefreshedAt?: string | null; has_more?: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsChannelsRetrieveInput = Parameters<typeof posthog.integrationsChannelsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsChannelsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsChannelsRetrieve>>;

const result: IntegrationsChannelsRetrieveOutput = await posthog.integrationsChannelsRetrieve();

// Result shape (from schema): { channels: ({ id: string; name: string; is_private: boolean; is_member: boolean; is_ext_shared: boolean; is_private_without_access: boolean })[]; lastRefreshedAt?: string | null; has_more?: boolean }
```

### `posthog.integrationsClickupListsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/clickup_lists/`
- **OpenAPI operationId**: `integrations_clickup_lists_retrieve`
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

type IntegrationsClickupListsRetrieveInput = Parameters<typeof posthog.integrationsClickupListsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsClickupListsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsClickupListsRetrieve>>;

const result: IntegrationsClickupListsRetrieveOutput = await posthog.integrationsClickupListsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsClickupSpacesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/clickup_spaces/`
- **OpenAPI operationId**: `integrations_clickup_spaces_retrieve`
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

type IntegrationsClickupSpacesRetrieveInput = Parameters<typeof posthog.integrationsClickupSpacesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsClickupSpacesRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsClickupSpacesRetrieve>>;

const result: IntegrationsClickupSpacesRetrieveOutput = await posthog.integrationsClickupSpacesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsClickupWorkspacesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/clickup_workspaces/`
- **OpenAPI operationId**: `integrations_clickup_workspaces_retrieve`
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

type IntegrationsClickupWorkspacesRetrieveInput = Parameters<typeof posthog.integrationsClickupWorkspacesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsClickupWorkspacesRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsClickupWorkspacesRetrieve>>;

const result: IntegrationsClickupWorkspacesRetrieveOutput = await posthog.integrationsClickupWorkspacesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsEmailPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/integrations/{id}/email/`
- **OpenAPI operationId**: `integrations_email_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsEmailPartialUpdateInput = Parameters<typeof posthog.integrationsEmailPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsEmailPartialUpdateOutput = Awaited<ReturnType<typeof posthog.integrationsEmailPartialUpdate>>;

const result: IntegrationsEmailPartialUpdateOutput = await posthog.integrationsEmailPartialUpdate();

// Result shape (from schema): { id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...
```

### `posthog.integrationsEmailVerifyCreate`

- **HTTP**: `POST /api/projects/{project_id}/integrations/{id}/email/verify/`
- **OpenAPI operationId**: `integrations_email_verify_create`
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

type IntegrationsEmailVerifyCreateInput = Parameters<typeof posthog.integrationsEmailVerifyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsEmailVerifyCreateOutput = Awaited<ReturnType<typeof posthog.integrationsEmailVerifyCreate>>;

const result: IntegrationsEmailVerifyCreateOutput = await posthog.integrationsEmailVerifyCreate();

// Result shape (from schema): unknown
```

### `posthog.integrationsGithubBranchesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/github_branches/`
- **OpenAPI operationId**: `integrations_github_branches_retrieve`
- **Path params**: `id`
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

type IntegrationsGithubBranchesRetrieveInput = Parameters<typeof posthog.integrationsGithubBranchesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsGithubBranchesRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsGithubBranchesRetrieve>>;

const result: IntegrationsGithubBranchesRetrieveOutput = await posthog.integrationsGithubBranchesRetrieve();

// Result shape (from schema): { branches: (string)[]; default_branch?: string | null; has_more: boolean }
```

### `posthog.integrationsGithubReposRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/github_repos/`
- **OpenAPI operationId**: `integrations_github_repos_retrieve`
- **Path params**: `id`
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

type IntegrationsGithubReposRetrieveInput = Parameters<typeof posthog.integrationsGithubReposRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsGithubReposRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsGithubReposRetrieve>>;

const result: IntegrationsGithubReposRetrieveOutput = await posthog.integrationsGithubReposRetrieve();

// Result shape (from schema): { repositories: ({ id: number; name: string; full_name: string; private?: boolean; default_branch?: string; language?: string; pushed_at?: string; archived?: boolean; can_push?: boolean })[]; has_more: boolean }
```

### `posthog.integrationsGithubReposRefreshCreate`

- **HTTP**: `POST /api/projects/{project_id}/integrations/{id}/github_repos/refresh/`
- **OpenAPI operationId**: `integrations_github_repos_refresh_create`
- **Path params**: `id`
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

type IntegrationsGithubReposRefreshCreateInput = Parameters<typeof posthog.integrationsGithubReposRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsGithubReposRefreshCreateOutput = Awaited<ReturnType<typeof posthog.integrationsGithubReposRefreshCreate>>;

const result: IntegrationsGithubReposRefreshCreateOutput = await posthog.integrationsGithubReposRefreshCreate();

// Result shape (from schema): { repositories: ({ id: number; name: string; full_name: string; private?: boolean; default_branch?: string; language?: string; pushed_at?: string; archived?: boolean; can_push?: boolean })[] }
```

### `posthog.integrationsGithubTeamsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/github_teams/`
- **OpenAPI operationId**: `integrations_github_teams_retrieve`
- **Path params**: `id`
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ teams: ({ id: number; slug: string; name: string })[]; has_more: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsGithubTeamsRetrieveInput = Parameters<typeof posthog.integrationsGithubTeamsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsGithubTeamsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsGithubTeamsRetrieve>>;

const result: IntegrationsGithubTeamsRetrieveOutput = await posthog.integrationsGithubTeamsRetrieve();

// Result shape (from schema): { teams: ({ id: number; slug: string; name: string })[]; has_more: boolean }
```

### `posthog.integrationsGoogleAccessibleAccountsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/google_accessible_accounts/`
- **OpenAPI operationId**: `integrations_google_accessible_accounts_retrieve`
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

type IntegrationsGoogleAccessibleAccountsRetrieveInput = Parameters<typeof posthog.integrationsGoogleAccessibleAccountsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsGoogleAccessibleAccountsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsGoogleAccessibleAccountsRetrieve>>;

const result: IntegrationsGoogleAccessibleAccountsRetrieveOutput = await posthog.integrationsGoogleAccessibleAccountsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsGoogleConversionActionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/google_conversion_actions/`
- **OpenAPI operationId**: `integrations_google_conversion_actions_retrieve`
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

type IntegrationsGoogleConversionActionsRetrieveInput = Parameters<typeof posthog.integrationsGoogleConversionActionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsGoogleConversionActionsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsGoogleConversionActionsRetrieve>>;

const result: IntegrationsGoogleConversionActionsRetrieveOutput = await posthog.integrationsGoogleConversionActionsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsJiraProjectsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/jira_projects/`
- **OpenAPI operationId**: `integrations_jira_projects_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ projects: ({ id: string; key: string; name: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsJiraProjectsRetrieveInput = Parameters<typeof posthog.integrationsJiraProjectsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsJiraProjectsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsJiraProjectsRetrieve>>;

const result: IntegrationsJiraProjectsRetrieveOutput = await posthog.integrationsJiraProjectsRetrieve();

// Result shape (from schema): { projects: ({ id: string; key: string; name: string })[] }
```

### `posthog.integrationsLinearTeamsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/linear_teams/`
- **OpenAPI operationId**: `integrations_linear_teams_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ teams: ({ id: string; name: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsLinearTeamsRetrieveInput = Parameters<typeof posthog.integrationsLinearTeamsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsLinearTeamsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsLinearTeamsRetrieve>>;

const result: IntegrationsLinearTeamsRetrieveOutput = await posthog.integrationsLinearTeamsRetrieve();

// Result shape (from schema): { teams: ({ id: string; name: string })[] }
```

### `posthog.integrationsLinkedinAdsAccountsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/linkedin_ads_accounts/`
- **OpenAPI operationId**: `integrations_linkedin_ads_accounts_retrieve`
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

type IntegrationsLinkedinAdsAccountsRetrieveInput = Parameters<typeof posthog.integrationsLinkedinAdsAccountsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsLinkedinAdsAccountsRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsLinkedinAdsAccountsRetrieve>>;

const result: IntegrationsLinkedinAdsAccountsRetrieveOutput = await posthog.integrationsLinkedinAdsAccountsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsLinkedinAdsConversionRulesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/linkedin_ads_conversion_rules/`
- **OpenAPI operationId**: `integrations_linkedin_ads_conversion_rules_retrieve`
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

type IntegrationsLinkedinAdsConversionRulesRetrieveInput = Parameters<typeof posthog.integrationsLinkedinAdsConversionRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsLinkedinAdsConversionRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsLinkedinAdsConversionRulesRetrieve>>;

const result: IntegrationsLinkedinAdsConversionRulesRetrieveOutput = await posthog.integrationsLinkedinAdsConversionRulesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsTwilioPhoneNumbersRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/{id}/twilio_phone_numbers/`
- **OpenAPI operationId**: `integrations_twilio_phone_numbers_retrieve`
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

type IntegrationsTwilioPhoneNumbersRetrieveInput = Parameters<typeof posthog.integrationsTwilioPhoneNumbersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsTwilioPhoneNumbersRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsTwilioPhoneNumbersRetrieve>>;

const result: IntegrationsTwilioPhoneNumbersRetrieveOutput = await posthog.integrationsTwilioPhoneNumbersRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsAuthorizeRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/authorize/`
- **OpenAPI operationId**: `integrations_authorize_retrieve`
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

type IntegrationsAuthorizeRetrieveInput = Parameters<typeof posthog.integrationsAuthorizeRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsAuthorizeRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsAuthorizeRetrieve>>;

const result: IntegrationsAuthorizeRetrieveOutput = await posthog.integrationsAuthorizeRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsDomainConnectApplyUrlCreate`

- **HTTP**: `POST /api/projects/{project_id}/integrations/domain-connect/apply-url/`
- **What it does**: Unified endpoint for generating Domain Connect apply URLs.

Accepts a context ("email" or "proxy") and the relevant resource ID.
The backend resolves the domain, template variables, and service ID
based on context, then builds the signed apply URL.
- **OpenAPI operationId**: `integrations_domain_connect_apply_url_create`
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

type IntegrationsDomainConnectApplyUrlCreateInput = Parameters<typeof posthog.integrationsDomainConnectApplyUrlCreate> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsDomainConnectApplyUrlCreateOutput = Awaited<ReturnType<typeof posthog.integrationsDomainConnectApplyUrlCreate>>;

const result: IntegrationsDomainConnectApplyUrlCreateOutput = await posthog.integrationsDomainConnectApplyUrlCreate();

// Result shape (from schema): unknown
```

### `posthog.integrationsDomainConnectCheckRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/integrations/domain-connect/check/`
- **OpenAPI operationId**: `integrations_domain_connect_check_retrieve`
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

type IntegrationsDomainConnectCheckRetrieveInput = Parameters<typeof posthog.integrationsDomainConnectCheckRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsDomainConnectCheckRetrieveOutput = Awaited<ReturnType<typeof posthog.integrationsDomainConnectCheckRetrieve>>;

const result: IntegrationsDomainConnectCheckRetrieveOutput = await posthog.integrationsDomainConnectCheckRetrieve();

// Result shape (from schema): unknown
```

### `posthog.integrationsGithubLinkExistingCreate`

- **HTTP**: `POST /api/projects/{project_id}/integrations/github/link_existing/`
- **What it does**: Reuse a GitHub installation already linked to a sibling team in the same organization.
- **OpenAPI operationId**: `integrations_github_link_existing_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsGithubLinkExistingCreateInput = Parameters<typeof posthog.integrationsGithubLinkExistingCreate> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsGithubLinkExistingCreateOutput = Awaited<ReturnType<typeof posthog.integrationsGithubLinkExistingCreate>>;

const result: IntegrationsGithubLinkExistingCreateOutput = await posthog.integrationsGithubLinkExistingCreate();

// Result shape (from schema): { id: number; kind: "anthropic" | "apns" | "aws-s3" | "azure-blob" | "bing-ads" | "clickup" | "customerio-app" | "customerio-track" | "customerio-webhook" | "databricks" | "email" | "firebase" | "github" | "gitlab" | "g...
```

### `posthog.integrationsGithubOauthAuthorizeCreate`

- **HTTP**: `POST /api/projects/{project_id}/integrations/github/oauth_authorize/`
- **What it does**: Mint a User OAuth URL to bootstrap a fresh `code` when the install flow returns without one.
- **OpenAPI operationId**: `integrations_github_oauth_authorize_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ oauth_url: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsGithubOauthAuthorizeCreateInput = Parameters<typeof posthog.integrationsGithubOauthAuthorizeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsGithubOauthAuthorizeCreateOutput = Awaited<ReturnType<typeof posthog.integrationsGithubOauthAuthorizeCreate>>;

const result: IntegrationsGithubOauthAuthorizeCreateOutput = await posthog.integrationsGithubOauthAuthorizeCreate();

// Result shape (from schema): { oauth_url: string }
```

### `posthog.integrationsGithubPrepareCallbackCreate`

- **HTTP**: `POST /api/projects/{project_id}/integrations/github/prepare_callback/`
- **What it does**: Seed GitHub setup callback state without redirecting to GitHub.

Used when the user opens an existing installation's settings on github.com (e.g. PostHog
Code "Update in GitHub") so the subsequent Setup URL redirect can be validated.
- **OpenAPI operationId**: `integrations_github_prepare_callback_create`
- **Path params**: None
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

type IntegrationsGithubPrepareCallbackCreateInput = Parameters<typeof posthog.integrationsGithubPrepareCallbackCreate> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsGithubPrepareCallbackCreateOutput = Awaited<ReturnType<typeof posthog.integrationsGithubPrepareCallbackCreate>>;

const result: IntegrationsGithubPrepareCallbackCreateOutput = await posthog.integrationsGithubPrepareCallbackCreate();

// Result shape (from schema): unknown
```

### `posthog.integrationsRequestAccessCreate`

- **HTTP**: `POST /api/projects/{project_id}/integrations/request_access/`
- **What it does**: Notify project admins that a member is requesting an integration be connected.
- **OpenAPI operationId**: `integrations_request_access_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IntegrationsRequestAccessCreateInput = Parameters<typeof posthog.integrationsRequestAccessCreate> extends [infer T, ...unknown[]] ? T : undefined;
type IntegrationsRequestAccessCreateOutput = Awaited<ReturnType<typeof posthog.integrationsRequestAccessCreate>>;

const result: IntegrationsRequestAccessCreateOutput = await posthog.integrationsRequestAccessCreate();

// Result shape (from schema): { success: boolean }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
