# Surveys

## Operations

### `posthog.surveysList`

- **HTTP**: `GET /api/projects/{project_id}/surveys/`
- **OpenAPI operationId**: `surveys_list`
- **Path params**: None
- **Query params**: `archived`, `ids`, `limit`, `offset`, `search`, `type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysListInput = Parameters<typeof posthog.surveysList> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysListOutput = Awaited<ReturnType<typeof posthog.surveysList>>;

const result: SurveysListOutput = await posthog.surveysList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag:...
```

### `posthog.surveysCreate`

- **HTTP**: `POST /api/projects/{project_id}/surveys/`
- **OpenAPI operationId**: `surveys_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type SurveysCreateInput = Parameters<typeof posthog.surveysCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysCreateOutput = Awaited<ReturnType<typeof posthog.surveysCreate>>;

const result: SurveysCreateOutput = await posthog.surveysCreate();

// Result shape (from schema): { id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...
```

### `posthog.surveysDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/surveys/{id}/`
- **OpenAPI operationId**: `surveys_destroy`
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

type SurveysDestroyInput = Parameters<typeof posthog.surveysDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysDestroyOutput = Awaited<ReturnType<typeof posthog.surveysDestroy>>;

const result: SurveysDestroyOutput = await posthog.surveysDestroy();

// Result shape (from schema): unknown
```

### `posthog.surveysRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/surveys/{id}/`
- **OpenAPI operationId**: `surveys_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysRetrieveInput = Parameters<typeof posthog.surveysRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysRetrieveOutput = Awaited<ReturnType<typeof posthog.surveysRetrieve>>;

const result: SurveysRetrieveOutput = await posthog.surveysRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...
```

### `posthog.surveysPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/surveys/{id}/`
- **OpenAPI operationId**: `surveys_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysPartialUpdateInput = Parameters<typeof posthog.surveysPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysPartialUpdateOutput = Awaited<ReturnType<typeof posthog.surveysPartialUpdate>>;

const result: SurveysPartialUpdateOutput = await posthog.surveysPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...
```

### `posthog.surveysUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/surveys/{id}/`
- **OpenAPI operationId**: `surveys_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysUpdateInput = Parameters<typeof posthog.surveysUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysUpdateOutput = Awaited<ReturnType<typeof posthog.surveysUpdate>>;

const result: SurveysUpdateOutput = await posthog.surveysUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...
```

### `posthog.surveysActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/surveys/{id}/activity/`
- **OpenAPI operationId**: `surveys_activity_retrieve`
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

type SurveysActivityRetrieveInput = Parameters<typeof posthog.surveysActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.surveysActivityRetrieve>>;

const result: SurveysActivityRetrieveOutput = await posthog.surveysActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.surveysArchivedResponseUuidsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/surveys/{id}/archived-response-uuids/`
- **What it does**: Get list of archived response UUIDs for HogQL filtering.

Returns list of UUIDs that the frontend can use to filter out archived responses
in HogQL queries.
- **OpenAPI operationId**: `surveys_archived_response_uuids_retrieve`
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

type SurveysArchivedResponseUuidsRetrieveInput = Parameters<typeof posthog.surveysArchivedResponseUuidsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysArchivedResponseUuidsRetrieveOutput = Awaited<ReturnType<typeof posthog.surveysArchivedResponseUuidsRetrieve>>;

const result: SurveysArchivedResponseUuidsRetrieveOutput = await posthog.surveysArchivedResponseUuidsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.surveysDuplicateToProjectsCreate`

- **HTTP**: `POST /api/projects/{project_id}/surveys/{id}/duplicate_to_projects/`
- **What it does**: Duplicate a survey to multiple projects in a single transaction.

Accepts a list of target team IDs and creates a copy of the survey in each project.
Uses an all-or-nothing approach - if any duplication fails, all changes are rolled back.
- **OpenAPI operationId**: `surveys_duplicate_to_projects_create`
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

type SurveysDuplicateToProjectsCreateInput = Parameters<typeof posthog.surveysDuplicateToProjectsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysDuplicateToProjectsCreateOutput = Awaited<ReturnType<typeof posthog.surveysDuplicateToProjectsCreate>>;

const result: SurveysDuplicateToProjectsCreateOutput = await posthog.surveysDuplicateToProjectsCreate();

// Result shape (from schema): unknown
```

### `posthog.surveysGenerateTranslationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/surveys/{id}/generate_translations/`
- **OpenAPI operationId**: `surveys_generate_translations_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ translations: { [key: string]: { name?: string; thankYouMessageHeader?: string; thankYouMessageDescription?: string; thankYouMessageCloseButtonText?: string } | undefined }; questions: ({ id: string; translations: { [...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysGenerateTranslationsCreateInput = Parameters<typeof posthog.surveysGenerateTranslationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysGenerateTranslationsCreateOutput = Awaited<ReturnType<typeof posthog.surveysGenerateTranslationsCreate>>;

const result: SurveysGenerateTranslationsCreateOutput = await posthog.surveysGenerateTranslationsCreate();

// Result shape (from schema): { translations: { [key: string]: { name?: string; thankYouMessageHeader?: string; thankYouMessageDescription?: string; thankYouMessageCloseButtonText?: string } | undefined }; questions: ({ id: string; translations: { [...
```

### `posthog.surveysLaunch`

- **HTTP**: `POST /api/projects/{project_id}/surveys/{id}/launch/`
- **What it does**: Launch a survey by setting `start_date` to the current time. No-op if the survey is already launched (start_date set in the past) — returns the existing state unchanged. Does not affect archived surveys or surveys with an end_date in the past; unarchive or extend the end_date first.
- **OpenAPI operationId**: `surveys_launch`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysLaunchInput = Parameters<typeof posthog.surveysLaunch> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysLaunchOutput = Awaited<ReturnType<typeof posthog.surveysLaunch>>;

const result: SurveysLaunchOutput = await posthog.surveysLaunch();

// Result shape (from schema): { id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...
```

### `posthog.surveysResponsesList`

- **HTTP**: `GET /api/projects/{project_id}/surveys/{id}/responses/`
- **What it does**: List survey responses for a specific survey, with question text resolved server-side so callers do not have to map opaque `$survey_response_<id>` keys. Each row carries `distinct_id`, `session_id`, `submitted_at`, and an `extra` block (device, browser, OS, geoip, current_url, iteration) so agents can cross-pivot to recordings, persons, or paths in a single follow-up call. For person properties at event time, follow up with `persons-get` using the returned `distinct_id` — keeps scopes scoped. Use `question_id` + `score_lte` to fetch NPS detractors and similar score-filtered cohorts.
- **OpenAPI operationId**: `surveys_responses_list`
- **Path params**: `id`
- **Query params**: `exclude_archived`, `limit`, `offset`, `question_id`, `score_gte`, `score_lte`, `since`, `until`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ uuid: string; distinct_id: string; session_id: string | null; submitted_at: string; answers: ({ question_id: string; question_index: number; question_text: string; question_type: string; answer: unknown })...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysResponsesListInput = Parameters<typeof posthog.surveysResponsesList> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysResponsesListOutput = Awaited<ReturnType<typeof posthog.surveysResponsesList>>;

const result: SurveysResponsesListOutput = await posthog.surveysResponsesList();

// Result shape (from schema): { results: ({ uuid: string; distinct_id: string; session_id: string | null; submitted_at: string; answers: ({ question_id: string; question_index: number; question_text: string; question_type: string; answer: unknown })...
```

### `posthog.surveysResponsesArchiveCreate`

- **HTTP**: `POST /api/projects/{project_id}/surveys/{id}/responses/{response_uuid}/archive/`
- **What it does**: Archive a single survey response.
- **OpenAPI operationId**: `surveys_responses_archive_create`
- **Path params**: `id`, `response_uuid`
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

type SurveysResponsesArchiveCreateInput = Parameters<typeof posthog.surveysResponsesArchiveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysResponsesArchiveCreateOutput = Awaited<ReturnType<typeof posthog.surveysResponsesArchiveCreate>>;

const result: SurveysResponsesArchiveCreateOutput = await posthog.surveysResponsesArchiveCreate();

// Result shape (from schema): unknown
```

### `posthog.surveysResponsesUnarchiveCreate`

- **HTTP**: `POST /api/projects/{project_id}/surveys/{id}/responses/{response_uuid}/unarchive/`
- **What it does**: Unarchive a single survey response.
- **OpenAPI operationId**: `surveys_responses_unarchive_create`
- **Path params**: `id`, `response_uuid`
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

type SurveysResponsesUnarchiveCreateInput = Parameters<typeof posthog.surveysResponsesUnarchiveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysResponsesUnarchiveCreateOutput = Awaited<ReturnType<typeof posthog.surveysResponsesUnarchiveCreate>>;

const result: SurveysResponsesUnarchiveCreateOutput = await posthog.surveysResponsesUnarchiveCreate();

// Result shape (from schema): unknown
```

### `posthog.surveysStatsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/surveys/{id}/stats/`
- **What it does**: Get survey response statistics for a specific survey.

Args:
    date_from: Optional ISO timestamp for start date (e.g. 2024-01-01T00:00:00Z)
    date_to: Optional ISO timestamp for end date (e.g. 2024-01-31T23:59:59Z)
    exclude_archived: Optional boolean to exclude archived responses (default: false, includes archived)
    include_per_question_stats: Optional boolean to include per-question response counts and distributions

Returns:
    Survey statistics including event counts, unique respondents, and conversion rates
- **OpenAPI operationId**: `surveys_stats_retrieve`
- **Path params**: `id`
- **Query params**: `date_from`, `date_to`, `include_per_question_stats`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ survey_id: string; start_date: string | null; end_date: string | null; stats: { [key: string]: unknown }; rates: { [key: string]: unknown }; per_question_stats?: (unknown)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysStatsRetrieveInput = Parameters<typeof posthog.surveysStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.surveysStatsRetrieve>>;

const result: SurveysStatsRetrieveOutput = await posthog.surveysStatsRetrieve();

// Result shape (from schema): { survey_id: string; start_date: string | null; end_date: string | null; stats: { [key: string]: unknown }; rates: { [key: string]: unknown }; per_question_stats?: (unknown)[] }
```

### `posthog.surveysStop`

- **HTTP**: `POST /api/projects/{project_id}/surveys/{id}/stop/`
- **What it does**: Stop a survey by setting `end_date` to the current time. No new responses are accepted after this; existing responses remain available. No-op if the survey already has an end_date in the past.
- **OpenAPI operationId**: `surveys_stop`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysStopInput = Parameters<typeof posthog.surveysStop> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysStopOutput = Awaited<ReturnType<typeof posthog.surveysStop>>;

const result: SurveysStopOutput = await posthog.surveysStop();

// Result shape (from schema): { id: string; name: string; description?: string; type: "popover" | "widget" | "external_survey" | "api"; schedule?: string | null; linked_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [ke...
```

### `posthog.surveysSummarizeResponsesCreate`

- **HTTP**: `POST /api/projects/{project_id}/surveys/{id}/summarize_responses/`
- **What it does**: Summarize survey responses. When `question_index` or `question_id` is provided, returns a per-question theme summary using cached `survey.question_summaries` when fresh. When neither is provided, returns the survey-wide headline summary (delegates to summary_headline). Pass `force_refresh=true` in the body to bypass caches.
- **OpenAPI operationId**: `surveys_summarize_responses_create`
- **Path params**: `id`
- **Query params**: `question_id`, `question_index`
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

type SurveysSummarizeResponsesCreateInput = Parameters<typeof posthog.surveysSummarizeResponsesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysSummarizeResponsesCreateOutput = Awaited<ReturnType<typeof posthog.surveysSummarizeResponsesCreate>>;

const result: SurveysSummarizeResponsesCreateOutput = await posthog.surveysSummarizeResponsesCreate();

// Result shape (from schema): unknown
```

### `posthog.surveysSummaryHeadlineCreate`

- **HTTP**: `POST /api/projects/{project_id}/surveys/{id}/summary_headline/`
- **OpenAPI operationId**: `surveys_summary_headline_create`
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

type SurveysSummaryHeadlineCreateInput = Parameters<typeof posthog.surveysSummaryHeadlineCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysSummaryHeadlineCreateOutput = Awaited<ReturnType<typeof posthog.surveysSummaryHeadlineCreate>>;

const result: SurveysSummaryHeadlineCreateOutput = await posthog.surveysSummaryHeadlineCreate();

// Result shape (from schema): unknown
```

### `posthog.surveysAllActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/surveys/activity/`
- **OpenAPI operationId**: `surveys_all_activity_retrieve`
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

type SurveysAllActivityRetrieveInput = Parameters<typeof posthog.surveysAllActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysAllActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.surveysAllActivityRetrieve>>;

const result: SurveysAllActivityRetrieveOutput = await posthog.surveysAllActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.surveysQuestionLabels`

- **HTTP**: `GET /api/projects/{project_id}/surveys/question_labels/`
- **What it does**: Return a slim list of question labels for the team's surveys. Used by the frontend to resolve `$survey_response_<question_id>` property keys into human-readable question text without loading the full survey payload.
- **OpenAPI operationId**: `surveys_question_labels`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ labels: ({ question_id: string; question_text: string; question_index: number; survey_id: string; survey_name: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysQuestionLabelsInput = Parameters<typeof posthog.surveysQuestionLabels> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysQuestionLabelsOutput = Awaited<ReturnType<typeof posthog.surveysQuestionLabels>>;

const result: SurveysQuestionLabelsOutput = await posthog.surveysQuestionLabels();

// Result shape (from schema): { labels: ({ question_id: string; question_text: string; question_index: number; survey_id: string; survey_name: string })[] }
```

### `posthog.surveysResponsesCountRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/surveys/responses_count/`
- **What it does**: Get response counts for all surveys.

Args:
    exclude_archived: Optional boolean to exclude archived responses (default: false, includes archived)
    survey_ids: Optional comma-separated list of survey IDs to filter by

Returns:
    Dictionary mapping survey IDs to response counts
- **OpenAPI operationId**: `surveys_responses_count_retrieve`
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

type SurveysResponsesCountRetrieveInput = Parameters<typeof posthog.surveysResponsesCountRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysResponsesCountRetrieveOutput = Awaited<ReturnType<typeof posthog.surveysResponsesCountRetrieve>>;

const result: SurveysResponsesCountRetrieveOutput = await posthog.surveysResponsesCountRetrieve();

// Result shape (from schema): unknown
```

### `posthog.surveysGlobalStatsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/surveys/stats/`
- **What it does**: Get aggregated response statistics across all surveys.

Args:
    date_from: Optional ISO timestamp for start date (e.g. 2024-01-01T00:00:00Z)
    date_to: Optional ISO timestamp for end date (e.g. 2024-01-31T23:59:59Z)

Returns:
    Aggregated statistics across all surveys including total counts and rates
- **OpenAPI operationId**: `surveys_global_stats_retrieve`
- **Path params**: None
- **Query params**: `date_from`, `date_to`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ stats: { [key: string]: unknown }; rates: { [key: string]: unknown } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SurveysGlobalStatsRetrieveInput = Parameters<typeof posthog.surveysGlobalStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SurveysGlobalStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.surveysGlobalStatsRetrieve>>;

const result: SurveysGlobalStatsRetrieveOutput = await posthog.surveysGlobalStatsRetrieve();

// Result shape (from schema): { stats: { [key: string]: unknown }; rates: { [key: string]: unknown } }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
