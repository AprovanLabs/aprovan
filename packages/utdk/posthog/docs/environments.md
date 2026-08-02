# Environments

## Operations

### `posthog.environmentsList`

- **HTTP**: `GET /api/projects/{project_id}/environments/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; uuid: string; organization: string; project_id: number; api_token: string; name: string; completed_snippet_onboarding: boolean; ha...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsListInput = Parameters<typeof posthog.environmentsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsListOutput = Awaited<ReturnType<typeof posthog.environmentsList>>;

const result: EnvironmentsListOutput = await posthog.environmentsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; uuid: string; organization: string; project_id: number; api_token: string; name: string; completed_snippet_onboarding: boolean; ha...
```

### `posthog.environmentsCreate`

- **HTTP**: `POST /api/projects/{project_id}/environments/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; uuid: string; name?: string; access_control?: boolean; organization: string; project_id: number; api_token: string; secret_api_token: string | null; secret_api_token_backup: string | null; created_at: stri...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCreateInput = Parameters<typeof posthog.environmentsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsCreate>>;

const result: EnvironmentsCreateOutput = await posthog.environmentsCreate();

// Result shape (from schema): { id: number; uuid: string; name?: string; access_control?: boolean; organization: string; project_id: number; api_token: string; secret_api_token: string | null; secret_api_token_backup: string | null; created_at: stri...
```

### `posthog.environmentsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/environments/{id}/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_destroy`
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

type EnvironmentsDestroyInput = Parameters<typeof posthog.environmentsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsDestroy>>;

const result: EnvironmentsDestroyOutput = await posthog.environmentsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/environments/{id}/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; uuid: string; name?: string; access_control?: boolean; organization: string; project_id: number; api_token: string; secret_api_token: string | null; secret_api_token_backup: string | null; created_at: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsRetrieveInput = Parameters<typeof posthog.environmentsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsRetrieve>>;

const result: EnvironmentsRetrieveOutput = await posthog.environmentsRetrieve();

// Result shape (from schema): { id: number; uuid: string; name?: string; access_control?: boolean; organization: string; project_id: number; api_token: string; secret_api_token: string | null; secret_api_token_backup: string | null; created_at: stri...
```

### `posthog.environmentsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/environments/{id}/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; uuid: string; name?: string; access_control?: boolean; organization: string; project_id: number; api_token: string; secret_api_token: string | null; secret_api_token_backup: string | null; created_at: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPartialUpdateInput = Parameters<typeof posthog.environmentsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsPartialUpdate>>;

const result: EnvironmentsPartialUpdateOutput = await posthog.environmentsPartialUpdate();

// Result shape (from schema): { id: number; uuid: string; name?: string; access_control?: boolean; organization: string; project_id: number; api_token: string; secret_api_token: string | null; secret_api_token_backup: string | null; created_at: stri...
```

### `posthog.environmentsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/environments/{id}/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; uuid: string; name?: string; access_control?: boolean; organization: string; project_id: number; api_token: string; secret_api_token: string | null; secret_api_token_backup: string | null; created_at: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUpdateInput = Parameters<typeof posthog.environmentsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsUpdate>>;

const result: EnvironmentsUpdateOutput = await posthog.environmentsUpdate();

// Result shape (from schema): { id: number; uuid: string; name?: string; access_control?: boolean; organization: string; project_id: number; api_token: string; secret_api_token: string | null; secret_api_token_backup: string | null; created_at: stri...
```

### `posthog.environmentsActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/environments/{id}/activity/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_activity_retrieve`
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

type EnvironmentsActivityRetrieveInput = Parameters<typeof posthog.environmentsActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsActivityRetrieve>>;

const result: EnvironmentsActivityRetrieveOutput = await posthog.environmentsActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsAddProductIntentPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/environments/{id}/add_product_intent/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_add_product_intent_partial_update`
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

type EnvironmentsAddProductIntentPartialUpdateInput = Parameters<typeof posthog.environmentsAddProductIntentPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAddProductIntentPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsAddProductIntentPartialUpdate>>;

const result: EnvironmentsAddProductIntentPartialUpdateOutput = await posthog.environmentsAddProductIntentPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsCompleteProductOnboardingPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/environments/{id}/complete_product_onboarding/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_complete_product_onboarding_partial_update`
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

type EnvironmentsCompleteProductOnboardingPartialUpdateInput = Parameters<typeof posthog.environmentsCompleteProductOnboardingPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCompleteProductOnboardingPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsCompleteProductOnboardingPartialUpdate>>;

const result: EnvironmentsCompleteProductOnboardingPartialUpdateOutput = await posthog.environmentsCompleteProductOnboardingPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsDefaultEvaluationContextsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/environments/{id}/default_evaluation_contexts/`
- **What it does**: Manage default evaluation contexts for a team.
- **OpenAPI operationId**: `environments_default_evaluation_contexts_destroy`
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

type EnvironmentsDefaultEvaluationContextsDestroyInput = Parameters<typeof posthog.environmentsDefaultEvaluationContextsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDefaultEvaluationContextsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsDefaultEvaluationContextsDestroy>>;

const result: EnvironmentsDefaultEvaluationContextsDestroyOutput = await posthog.environmentsDefaultEvaluationContextsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsDefaultEvaluationContextsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/environments/{id}/default_evaluation_contexts/`
- **What it does**: Manage default evaluation contexts for a team.
- **OpenAPI operationId**: `environments_default_evaluation_contexts_retrieve`
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

type EnvironmentsDefaultEvaluationContextsRetrieveInput = Parameters<typeof posthog.environmentsDefaultEvaluationContextsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDefaultEvaluationContextsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDefaultEvaluationContextsRetrieve>>;

const result: EnvironmentsDefaultEvaluationContextsRetrieveOutput = await posthog.environmentsDefaultEvaluationContextsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsDefaultEvaluationContextsCreate`

- **HTTP**: `POST /api/projects/{project_id}/environments/{id}/default_evaluation_contexts/`
- **What it does**: Manage default evaluation contexts for a team.
- **OpenAPI operationId**: `environments_default_evaluation_contexts_create`
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

type EnvironmentsDefaultEvaluationContextsCreateInput = Parameters<typeof posthog.environmentsDefaultEvaluationContextsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDefaultEvaluationContextsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDefaultEvaluationContextsCreate>>;

const result: EnvironmentsDefaultEvaluationContextsCreateOutput = await posthog.environmentsDefaultEvaluationContextsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsDefaultReleaseConditionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/environments/{id}/default_release_conditions/`
- **What it does**: Manage default release conditions for new feature flags in this team.
- **OpenAPI operationId**: `environments_default_release_conditions_retrieve`
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

type EnvironmentsDefaultReleaseConditionsRetrieveInput = Parameters<typeof posthog.environmentsDefaultReleaseConditionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDefaultReleaseConditionsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDefaultReleaseConditionsRetrieve>>;

const result: EnvironmentsDefaultReleaseConditionsRetrieveOutput = await posthog.environmentsDefaultReleaseConditionsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsDefaultReleaseConditionsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/environments/{id}/default_release_conditions/`
- **What it does**: Manage default release conditions for new feature flags in this team.
- **OpenAPI operationId**: `environments_default_release_conditions_update`
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

type EnvironmentsDefaultReleaseConditionsUpdateInput = Parameters<typeof posthog.environmentsDefaultReleaseConditionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDefaultReleaseConditionsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDefaultReleaseConditionsUpdate>>;

const result: EnvironmentsDefaultReleaseConditionsUpdateOutput = await posthog.environmentsDefaultReleaseConditionsUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsDeleteSecretTokenBackupPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/environments/{id}/delete_secret_token_backup/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_delete_secret_token_backup_partial_update`
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

type EnvironmentsDeleteSecretTokenBackupPartialUpdateInput = Parameters<typeof posthog.environmentsDeleteSecretTokenBackupPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDeleteSecretTokenBackupPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDeleteSecretTokenBackupPartialUpdate>>;

const result: EnvironmentsDeleteSecretTokenBackupPartialUpdateOutput = await posthog.environmentsDeleteSecretTokenBackupPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsEvaluationContextSuggestionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/environments/{id}/evaluation_context_suggestions/`
- **What it does**: Hide an evaluation context name from the flag editor's suggestion list, or restore it.

POST hides the name; DELETE restores it. The underlying context row and any flags already
using it are never modified — this only controls what gets suggested.
- **OpenAPI operationId**: `environments_evaluation_context_suggestions_destroy`
- **Path params**: `id`
- **Query params**: `context_name`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean; name: string; hidden_from_suggestions: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEvaluationContextSuggestionsDestroyInput = Parameters<typeof posthog.environmentsEvaluationContextSuggestionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEvaluationContextSuggestionsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsEvaluationContextSuggestionsDestroy>>;

const result: EnvironmentsEvaluationContextSuggestionsDestroyOutput = await posthog.environmentsEvaluationContextSuggestionsDestroy();

// Result shape (from schema): { success: boolean; name: string; hidden_from_suggestions: boolean }
```

### `posthog.environmentsEvaluationContextSuggestionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/environments/{id}/evaluation_context_suggestions/`
- **What it does**: Hide an evaluation context name from the flag editor's suggestion list, or restore it.

POST hides the name; DELETE restores it. The underlying context row and any flags already
using it are never modified — this only controls what gets suggested.
- **OpenAPI operationId**: `environments_evaluation_context_suggestions_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean; name: string; hidden_from_suggestions: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEvaluationContextSuggestionsCreateInput = Parameters<typeof posthog.environmentsEvaluationContextSuggestionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEvaluationContextSuggestionsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsEvaluationContextSuggestionsCreate>>;

const result: EnvironmentsEvaluationContextSuggestionsCreateOutput = await posthog.environmentsEvaluationContextSuggestionsCreate();

// Result shape (from schema): { success: boolean; name: string; hidden_from_suggestions: boolean }
```

### `posthog.environmentsEventIngestionRestrictionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/environments/{id}/event_ingestion_restrictions/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_event_ingestion_restrictions_retrieve`
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

type EnvironmentsEventIngestionRestrictionsRetrieveInput = Parameters<typeof posthog.environmentsEventIngestionRestrictionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEventIngestionRestrictionsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEventIngestionRestrictionsRetrieve>>;

const result: EnvironmentsEventIngestionRestrictionsRetrieveOutput = await posthog.environmentsEventIngestionRestrictionsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsExperimentsConfigRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/environments/{id}/experiments_config/`
- **What it does**: Manage experiment configuration for this environment.
- **OpenAPI operationId**: `environments_experiments_config_retrieve`
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

type EnvironmentsExperimentsConfigRetrieveInput = Parameters<typeof posthog.environmentsExperimentsConfigRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExperimentsConfigRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExperimentsConfigRetrieve>>;

const result: EnvironmentsExperimentsConfigRetrieveOutput = await posthog.environmentsExperimentsConfigRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsExperimentsConfigPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/environments/{id}/experiments_config/`
- **What it does**: Manage experiment configuration for this environment.
- **OpenAPI operationId**: `environments_experiments_config_partial_update`
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

type EnvironmentsExperimentsConfigPartialUpdateInput = Parameters<typeof posthog.environmentsExperimentsConfigPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExperimentsConfigPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsExperimentsConfigPartialUpdate>>;

const result: EnvironmentsExperimentsConfigPartialUpdateOutput = await posthog.environmentsExperimentsConfigPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsGenerateConversationsPublicTokenCreate`

- **HTTP**: `POST /api/projects/{project_id}/environments/{id}/generate_conversations_public_token/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_generate_conversations_public_token_create`
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

type EnvironmentsGenerateConversationsPublicTokenCreateInput = Parameters<typeof posthog.environmentsGenerateConversationsPublicTokenCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsGenerateConversationsPublicTokenCreateOutput = Awaited<ReturnType<typeof posthog.environmentsGenerateConversationsPublicTokenCreate>>;

const result: EnvironmentsGenerateConversationsPublicTokenCreateOutput = await posthog.environmentsGenerateConversationsPublicTokenCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsIsGeneratingDemoDataRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/environments/{id}/is_generating_demo_data/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_is_generating_demo_data_retrieve`
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

type EnvironmentsIsGeneratingDemoDataRetrieveInput = Parameters<typeof posthog.environmentsIsGeneratingDemoDataRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsIsGeneratingDemoDataRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsIsGeneratingDemoDataRetrieve>>;

const result: EnvironmentsIsGeneratingDemoDataRetrieveOutput = await posthog.environmentsIsGeneratingDemoDataRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsLogsConfigRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/environments/{id}/logs_config/`
- **What it does**: Manage logs product configuration for this environment.
- **OpenAPI operationId**: `environments_logs_config_retrieve`
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

type EnvironmentsLogsConfigRetrieveInput = Parameters<typeof posthog.environmentsLogsConfigRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsConfigRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLogsConfigRetrieve>>;

const result: EnvironmentsLogsConfigRetrieveOutput = await posthog.environmentsLogsConfigRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsLogsConfigPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/environments/{id}/logs_config/`
- **What it does**: Manage logs product configuration for this environment.
- **OpenAPI operationId**: `environments_logs_config_partial_update`
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

type EnvironmentsLogsConfigPartialUpdateInput = Parameters<typeof posthog.environmentsLogsConfigPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsConfigPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsConfigPartialUpdate>>;

const result: EnvironmentsLogsConfigPartialUpdateOutput = await posthog.environmentsLogsConfigPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsResetTokenPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/environments/{id}/reset_token/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_reset_token_partial_update`
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

type EnvironmentsResetTokenPartialUpdateInput = Parameters<typeof posthog.environmentsResetTokenPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsResetTokenPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsResetTokenPartialUpdate>>;

const result: EnvironmentsResetTokenPartialUpdateOutput = await posthog.environmentsResetTokenPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsRotateSecretTokenPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/environments/{id}/rotate_secret_token/`
- **What it does**: Deprecated: use /api/environments/{id}/ instead.
- **OpenAPI operationId**: `environments_rotate_secret_token_partial_update`
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

type EnvironmentsRotateSecretTokenPartialUpdateInput = Parameters<typeof posthog.environmentsRotateSecretTokenPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsRotateSecretTokenPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsRotateSecretTokenPartialUpdate>>;

const result: EnvironmentsRotateSecretTokenPartialUpdateOutput = await posthog.environmentsRotateSecretTokenPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsSettingsAsOfRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/environments/{id}/settings_as_of/`
- **What it does**: Return the team settings as of the provided timestamp.
Query params:
- at: ISO8601 datetime (required)
- scope: optional, one or multiple keys to filter the returned settings
- **OpenAPI operationId**: `environments_settings_as_of_retrieve`
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

type EnvironmentsSettingsAsOfRetrieveInput = Parameters<typeof posthog.environmentsSettingsAsOfRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSettingsAsOfRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsSettingsAsOfRetrieve>>;

const result: EnvironmentsSettingsAsOfRetrieveOutput = await posthog.environmentsSettingsAsOfRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
