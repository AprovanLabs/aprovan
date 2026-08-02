# User Interview Topics

## Operations

### `posthog.environmentsUserInterviewTopicsList`

- **HTTP**: `GET /api/environments/{environment_id}/user_interview_topics/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `environments_user_interview_topics_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsListInput = Parameters<typeof posthog.environmentsUserInterviewTopicsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsListOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsList>>;

const result: EnvironmentsUserInterviewTopicsListOutput = await posthog.environmentsUserInterviewTopicsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...
```

### `posthog.environmentsUserInterviewTopicsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interview_topics/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `environments_user_interview_topics_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsCreateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsCreate>>;

const result: EnvironmentsUserInterviewTopicsCreateOutput = await posthog.environmentsUserInterviewTopicsCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewTopicsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/user_interview_topics/{id}/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `environments_user_interview_topics_destroy`
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

type EnvironmentsUserInterviewTopicsDestroyInput = Parameters<typeof posthog.environmentsUserInterviewTopicsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsDestroy>>;

const result: EnvironmentsUserInterviewTopicsDestroyOutput = await posthog.environmentsUserInterviewTopicsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsUserInterviewTopicsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/user_interview_topics/{id}/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `environments_user_interview_topics_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsRetrieveInput = Parameters<typeof posthog.environmentsUserInterviewTopicsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsRetrieve>>;

const result: EnvironmentsUserInterviewTopicsRetrieveOutput = await posthog.environmentsUserInterviewTopicsRetrieve();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewTopicsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/user_interview_topics/{id}/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `environments_user_interview_topics_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsPartialUpdateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsPartialUpdate>>;

const result: EnvironmentsUserInterviewTopicsPartialUpdateOutput = await posthog.environmentsUserInterviewTopicsPartialUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewTopicsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/user_interview_topics/{id}/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `environments_user_interview_topics_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsUpdateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsUpdate>>;

const result: EnvironmentsUserInterviewTopicsUpdateOutput = await posthog.environmentsUserInterviewTopicsUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewTopicsAddIntervieweeCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interview_topics/{id}/add_interviewee/`
- **What it does**: Add a single interviewee to this topic. Email-shaped identifiers (including the `Display Name <email@host>` form) are appended to `interviewee_emails`; everything else is appended to `interviewee_distinct_ids`. Idempotent — adding an identifier that's already present leaves the topic unchanged. Returns the updated topic.
- **OpenAPI operationId**: `environments_user_interview_topics_add_interviewee_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsAddIntervieweeCreateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsAddIntervieweeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsAddIntervieweeCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsAddIntervieweeCreate>>;

const result: EnvironmentsUserInterviewTopicsAddIntervieweeCreateOutput = await posthog.environmentsUserInterviewTopicsAddIntervieweeCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewTopicsGenerateLinksCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interview_topics/{id}/generate_links/`
- **What it does**: Generate one public interview link per targeted interviewee. Materializes an IntervieweeContext row for every identifier on the topic (without overwriting existing per-person context), and an enabled SharingConfiguration with a unique access token. The URL resolves to the public interview viewer with no PostHog auth required.
- **OpenAPI operationId**: `environments_user_interview_topics_generate_links_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ interviewee_identifier: string; user_name: string; interview_url: string; agent_context: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsGenerateLinksCreateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsGenerateLinksCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsGenerateLinksCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsGenerateLinksCreate>>;

const result: EnvironmentsUserInterviewTopicsGenerateLinksCreateOutput = await posthog.environmentsUserInterviewTopicsGenerateLinksCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ interviewee_identifier: string; user_name: string; interview_url: string; agent_context: string })[] }
```

### `posthog.environmentsUserInterviewTopicsLinksCsvCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interview_topics/{id}/links_csv/`
- **What it does**: Same materialization as generate_links, returned as a downloadable CSV. Intended for users who want to mail-merge the per-person interview links into their own email tooling.
- **OpenAPI operationId**: `environments_user_interview_topics_links_csv_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `string`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsLinksCsvCreateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsLinksCsvCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsLinksCsvCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsLinksCsvCreate>>;

const result: EnvironmentsUserInterviewTopicsLinksCsvCreateOutput = await posthog.environmentsUserInterviewTopicsLinksCsvCreate();

// Result shape (from schema): string
```

### `posthog.environmentsUserInterviewTopicsPreviewInviteCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interview_topics/{id}/preview_invite/`
- **What it does**: Render the invite email exactly as a specific targeted interviewee would receive it — personalized subject and body — without sending anything and without creating or reading any share links. Pass `interviewee_identifier` to preview for a particular person, or omit it to preview for the first targeted interviewee. The body always shows an illustrative placeholder link (`is_preview_link: true`), never a live interview URL.
- **OpenAPI operationId**: `environments_user_interview_topics_preview_invite_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ interviewee_identifier: string; user_name: string; email: string | null; subject: string; html: string; interview_url: string; emailable: boolean; is_preview_link: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsPreviewInviteCreateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsPreviewInviteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsPreviewInviteCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsPreviewInviteCreate>>;

const result: EnvironmentsUserInterviewTopicsPreviewInviteCreateOutput = await posthog.environmentsUserInterviewTopicsPreviewInviteCreate();

// Result shape (from schema): { interviewee_identifier: string; user_name: string; email: string | null; subject: string; html: string; interview_url: string; emailable: boolean; is_preview_link: boolean }
```

### `posthog.environmentsUserInterviewTopicsRemoveIntervieweeCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interview_topics/{id}/remove_interviewee/`
- **What it does**: Remove an interviewee from this topic. Drops the identifier from both `interviewee_emails` and `interviewee_distinct_ids`, and disables any active SharingConfiguration linked to an IntervieweeContext for that identifier on this topic so the removed person can no longer open their interview link. Idempotent — removing an identifier that isn't present is a no-op. Returns the updated topic.
- **OpenAPI operationId**: `environments_user_interview_topics_remove_interviewee_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsRemoveIntervieweeCreateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsRemoveIntervieweeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsRemoveIntervieweeCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsRemoveIntervieweeCreate>>;

const result: EnvironmentsUserInterviewTopicsRemoveIntervieweeCreateOutput = await posthog.environmentsUserInterviewTopicsRemoveIntervieweeCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewTopicsSendInvitesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interview_topics/{id}/send_invites/`
- **What it does**: Generate (if needed) and email a personalized public interview link to every targeted interviewee on this topic whose identifier is an email address. Distinct-ID-only interviewees are skipped and surfaced in the response. Each invite is keyed on the underlying SharingConfiguration so re-runs after token rotation produce a fresh send.
- **OpenAPI operationId**: `environments_user_interview_topics_send_invites_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ interviewee_identifier: string; email?: string | null; interview_url: string; sent: boolean; reason?: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsSendInvitesCreateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsSendInvitesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsSendInvitesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsSendInvitesCreate>>;

const result: EnvironmentsUserInterviewTopicsSendInvitesCreateOutput = await posthog.environmentsUserInterviewTopicsSendInvitesCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ interviewee_identifier: string; email?: string | null; interview_url: string; sent: boolean; reason?: string })[] }
```

### `posthog.environmentsUserInterviewTopicsTestLinkRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/user_interview_topics/{id}/test_link/`
- **What it does**: Return the calling user's personal dogfood interview link for this topic, plus the latest test interview they have recorded against it. Lazily get-or-creates a per-caller IntervieweeContext + enabled SharingConfiguration the first time it's called, then returns the same stable URL on subsequent calls. The caller's identifier is intentionally not added to the topic's targeting arrays — each user dogfoods under their own row, so test calls never mint a public share token on someone else's behalf.
- **OpenAPI operationId**: `environments_user_interview_topics_test_link_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ interview_url: string; latest_test_interview: { completed_at: string; transcript: string; summary: string } | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsTestLinkRetrieveInput = Parameters<typeof posthog.environmentsUserInterviewTopicsTestLinkRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsTestLinkRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsTestLinkRetrieve>>;

const result: EnvironmentsUserInterviewTopicsTestLinkRetrieveOutput = await posthog.environmentsUserInterviewTopicsTestLinkRetrieve();

// Result shape (from schema): { interview_url: string; latest_test_interview: { completed_at: string; transcript: string; summary: string } | null }
```

### `posthog.environmentsUserInterviewTopicsIntervieweesList`

- **HTTP**: `GET /api/environments/{environment_id}/user_interview_topics/{topic_id}/interviewees/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `environments_user_interview_topics_interviewees_list`
- **Path params**: `topic_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsIntervieweesListInput = Parameters<typeof posthog.environmentsUserInterviewTopicsIntervieweesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsIntervieweesListOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsIntervieweesList>>;

const result: EnvironmentsUserInterviewTopicsIntervieweesListOutput = await posthog.environmentsUserInterviewTopicsIntervieweesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...
```

### `posthog.environmentsUserInterviewTopicsIntervieweesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interview_topics/{topic_id}/interviewees/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `environments_user_interview_topics_interviewees_create`
- **Path params**: `topic_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsIntervieweesCreateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsIntervieweesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsIntervieweesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsIntervieweesCreate>>;

const result: EnvironmentsUserInterviewTopicsIntervieweesCreateOutput = await posthog.environmentsUserInterviewTopicsIntervieweesCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewTopicsIntervieweesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/user_interview_topics/{topic_id}/interviewees/{id}/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `environments_user_interview_topics_interviewees_destroy`
- **Path params**: `id`, `topic_id`
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

type EnvironmentsUserInterviewTopicsIntervieweesDestroyInput = Parameters<typeof posthog.environmentsUserInterviewTopicsIntervieweesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsIntervieweesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsIntervieweesDestroy>>;

const result: EnvironmentsUserInterviewTopicsIntervieweesDestroyOutput = await posthog.environmentsUserInterviewTopicsIntervieweesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsUserInterviewTopicsIntervieweesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/user_interview_topics/{topic_id}/interviewees/{id}/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `environments_user_interview_topics_interviewees_retrieve`
- **Path params**: `id`, `topic_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsIntervieweesRetrieveInput = Parameters<typeof posthog.environmentsUserInterviewTopicsIntervieweesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsIntervieweesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsIntervieweesRetrieve>>;

const result: EnvironmentsUserInterviewTopicsIntervieweesRetrieveOutput = await posthog.environmentsUserInterviewTopicsIntervieweesRetrieve();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewTopicsIntervieweesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/user_interview_topics/{topic_id}/interviewees/{id}/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `environments_user_interview_topics_interviewees_partial_update`
- **Path params**: `id`, `topic_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsIntervieweesPartialUpdateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsIntervieweesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsIntervieweesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsIntervieweesPartialUpdate>>;

const result: EnvironmentsUserInterviewTopicsIntervieweesPartialUpdateOutput = await posthog.environmentsUserInterviewTopicsIntervieweesPartialUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewTopicsIntervieweesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/user_interview_topics/{topic_id}/interviewees/{id}/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `environments_user_interview_topics_interviewees_update`
- **Path params**: `id`, `topic_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsIntervieweesUpdateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsIntervieweesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsIntervieweesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsIntervieweesUpdate>>;

const result: EnvironmentsUserInterviewTopicsIntervieweesUpdateOutput = await posthog.environmentsUserInterviewTopicsIntervieweesUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewTopicsIntervieweesBulkCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interview_topics/{topic_id}/interviewees/bulk/`
- **What it does**: Create up to 500 interviewee context rows for a topic in a single request. Rows whose (topic, interviewee_identifier) already exists are skipped — the response surfaces an `inserted_count`, a `skipped_count`, and the `skipped_identifiers` so the caller can reconcile. Items must have unique `interviewee_identifier` values within the batch.
- **OpenAPI operationId**: `environments_user_interview_topics_interviewees_bulk_create`
- **Path params**: `topic_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ inserted_count: number; skipped_count: number; skipped_identifiers: (string)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewTopicsIntervieweesBulkCreateInput = Parameters<typeof posthog.environmentsUserInterviewTopicsIntervieweesBulkCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewTopicsIntervieweesBulkCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewTopicsIntervieweesBulkCreate>>;

const result: EnvironmentsUserInterviewTopicsIntervieweesBulkCreateOutput = await posthog.environmentsUserInterviewTopicsIntervieweesBulkCreate();

// Result shape (from schema): { inserted_count: number; skipped_count: number; skipped_identifiers: (string)[] }
```

### `posthog.userInterviewTopicsList`

- **HTTP**: `GET /api/projects/{project_id}/user_interview_topics/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `user_interview_topics_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsListInput = Parameters<typeof posthog.userInterviewTopicsList> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsListOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsList>>;

const result: UserInterviewTopicsListOutput = await posthog.userInterviewTopicsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...
```

### `posthog.userInterviewTopicsCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interview_topics/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `user_interview_topics_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsCreateInput = Parameters<typeof posthog.userInterviewTopicsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsCreate>>;

const result: UserInterviewTopicsCreateOutput = await posthog.userInterviewTopicsCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewTopicsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/user_interview_topics/{id}/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `user_interview_topics_destroy`
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

type UserInterviewTopicsDestroyInput = Parameters<typeof posthog.userInterviewTopicsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsDestroyOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsDestroy>>;

const result: UserInterviewTopicsDestroyOutput = await posthog.userInterviewTopicsDestroy();

// Result shape (from schema): unknown
```

### `posthog.userInterviewTopicsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/user_interview_topics/{id}/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `user_interview_topics_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsRetrieveInput = Parameters<typeof posthog.userInterviewTopicsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsRetrieveOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsRetrieve>>;

const result: UserInterviewTopicsRetrieveOutput = await posthog.userInterviewTopicsRetrieve();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewTopicsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/user_interview_topics/{id}/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `user_interview_topics_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsPartialUpdateInput = Parameters<typeof posthog.userInterviewTopicsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsPartialUpdate>>;

const result: UserInterviewTopicsPartialUpdateOutput = await posthog.userInterviewTopicsPartialUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewTopicsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/user_interview_topics/{id}/`
- **What it does**: Planned user interview topics: who we want to target and what we want to ask about.
- **OpenAPI operationId**: `user_interview_topics_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsUpdateInput = Parameters<typeof posthog.userInterviewTopicsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsUpdateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsUpdate>>;

const result: UserInterviewTopicsUpdateOutput = await posthog.userInterviewTopicsUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewTopicsAddIntervieweeCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interview_topics/{id}/add_interviewee/`
- **What it does**: Add a single interviewee to this topic. Email-shaped identifiers (including the `Display Name <email@host>` form) are appended to `interviewee_emails`; everything else is appended to `interviewee_distinct_ids`. Idempotent — adding an identifier that's already present leaves the topic unchanged. Returns the updated topic.
- **OpenAPI operationId**: `user_interview_topics_add_interviewee_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsAddIntervieweeCreateInput = Parameters<typeof posthog.userInterviewTopicsAddIntervieweeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsAddIntervieweeCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsAddIntervieweeCreate>>;

const result: UserInterviewTopicsAddIntervieweeCreateOutput = await posthog.userInterviewTopicsAddIntervieweeCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewTopicsGenerateLinksCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interview_topics/{id}/generate_links/`
- **What it does**: Generate one public interview link per targeted interviewee. Materializes an IntervieweeContext row for every identifier on the topic (without overwriting existing per-person context), and an enabled SharingConfiguration with a unique access token. The URL resolves to the public interview viewer with no PostHog auth required.
- **OpenAPI operationId**: `user_interview_topics_generate_links_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ interviewee_identifier: string; user_name: string; interview_url: string; agent_context: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsGenerateLinksCreateInput = Parameters<typeof posthog.userInterviewTopicsGenerateLinksCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsGenerateLinksCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsGenerateLinksCreate>>;

const result: UserInterviewTopicsGenerateLinksCreateOutput = await posthog.userInterviewTopicsGenerateLinksCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ interviewee_identifier: string; user_name: string; interview_url: string; agent_context: string })[] }
```

### `posthog.userInterviewTopicsLinksCsvCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interview_topics/{id}/links_csv/`
- **What it does**: Same materialization as generate_links, returned as a downloadable CSV. Intended for users who want to mail-merge the per-person interview links into their own email tooling.
- **OpenAPI operationId**: `user_interview_topics_links_csv_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `string`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsLinksCsvCreateInput = Parameters<typeof posthog.userInterviewTopicsLinksCsvCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsLinksCsvCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsLinksCsvCreate>>;

const result: UserInterviewTopicsLinksCsvCreateOutput = await posthog.userInterviewTopicsLinksCsvCreate();

// Result shape (from schema): string
```

### `posthog.userInterviewTopicsPreviewInviteCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interview_topics/{id}/preview_invite/`
- **What it does**: Render the invite email exactly as a specific targeted interviewee would receive it — personalized subject and body — without sending anything and without creating or reading any share links. Pass `interviewee_identifier` to preview for a particular person, or omit it to preview for the first targeted interviewee. The body always shows an illustrative placeholder link (`is_preview_link: true`), never a live interview URL.
- **OpenAPI operationId**: `user_interview_topics_preview_invite_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ interviewee_identifier: string; user_name: string; email: string | null; subject: string; html: string; interview_url: string; emailable: boolean; is_preview_link: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsPreviewInviteCreateInput = Parameters<typeof posthog.userInterviewTopicsPreviewInviteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsPreviewInviteCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsPreviewInviteCreate>>;

const result: UserInterviewTopicsPreviewInviteCreateOutput = await posthog.userInterviewTopicsPreviewInviteCreate();

// Result shape (from schema): { interviewee_identifier: string; user_name: string; email: string | null; subject: string; html: string; interview_url: string; emailable: boolean; is_preview_link: boolean }
```

### `posthog.userInterviewTopicsRemoveIntervieweeCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interview_topics/{id}/remove_interviewee/`
- **What it does**: Remove an interviewee from this topic. Drops the identifier from both `interviewee_emails` and `interviewee_distinct_ids`, and disables any active SharingConfiguration linked to an IntervieweeContext for that identifier on this topic so the removed person can no longer open their interview link. Idempotent — removing an identifier that isn't present is a no-op. Returns the updated topic.
- **OpenAPI operationId**: `user_interview_topics_remove_interviewee_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsRemoveIntervieweeCreateInput = Parameters<typeof posthog.userInterviewTopicsRemoveIntervieweeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsRemoveIntervieweeCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsRemoveIntervieweeCreate>>;

const result: UserInterviewTopicsRemoveIntervieweeCreateOutput = await posthog.userInterviewTopicsRemoveIntervieweeCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewTopicsSendInvitesCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interview_topics/{id}/send_invites/`
- **What it does**: Generate (if needed) and email a personalized public interview link to every targeted interviewee on this topic whose identifier is an email address. Distinct-ID-only interviewees are skipped and surfaced in the response. Each invite is keyed on the underlying SharingConfiguration so re-runs after token rotation produce a fresh send.
- **OpenAPI operationId**: `user_interview_topics_send_invites_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ interviewee_identifier: string; email?: string | null; interview_url: string; sent: boolean; reason?: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsSendInvitesCreateInput = Parameters<typeof posthog.userInterviewTopicsSendInvitesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsSendInvitesCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsSendInvitesCreate>>;

const result: UserInterviewTopicsSendInvitesCreateOutput = await posthog.userInterviewTopicsSendInvitesCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ interviewee_identifier: string; email?: string | null; interview_url: string; sent: boolean; reason?: string })[] }
```

### `posthog.userInterviewTopicsTestLinkRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/user_interview_topics/{id}/test_link/`
- **What it does**: Return the calling user's personal dogfood interview link for this topic, plus the latest test interview they have recorded against it. Lazily get-or-creates a per-caller IntervieweeContext + enabled SharingConfiguration the first time it's called, then returns the same stable URL on subsequent calls. The caller's identifier is intentionally not added to the topic's targeting arrays — each user dogfoods under their own row, so test calls never mint a public share token on someone else's behalf.
- **OpenAPI operationId**: `user_interview_topics_test_link_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ interview_url: string; latest_test_interview: { completed_at: string; transcript: string; summary: string } | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsTestLinkRetrieveInput = Parameters<typeof posthog.userInterviewTopicsTestLinkRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsTestLinkRetrieveOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsTestLinkRetrieve>>;

const result: UserInterviewTopicsTestLinkRetrieveOutput = await posthog.userInterviewTopicsTestLinkRetrieve();

// Result shape (from schema): { interview_url: string; latest_test_interview: { completed_at: string; transcript: string; summary: string } | null }
```

### `posthog.userInterviewTopicsIntervieweesList`

- **HTTP**: `GET /api/projects/{project_id}/user_interview_topics/{topic_id}/interviewees/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `user_interview_topics_interviewees_list`
- **Path params**: `topic_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsIntervieweesListInput = Parameters<typeof posthog.userInterviewTopicsIntervieweesList> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsIntervieweesListOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsIntervieweesList>>;

const result: UserInterviewTopicsIntervieweesListOutput = await posthog.userInterviewTopicsIntervieweesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...
```

### `posthog.userInterviewTopicsIntervieweesCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interview_topics/{topic_id}/interviewees/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `user_interview_topics_interviewees_create`
- **Path params**: `topic_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsIntervieweesCreateInput = Parameters<typeof posthog.userInterviewTopicsIntervieweesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsIntervieweesCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsIntervieweesCreate>>;

const result: UserInterviewTopicsIntervieweesCreateOutput = await posthog.userInterviewTopicsIntervieweesCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewTopicsIntervieweesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/user_interview_topics/{topic_id}/interviewees/{id}/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `user_interview_topics_interviewees_destroy`
- **Path params**: `id`, `topic_id`
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

type UserInterviewTopicsIntervieweesDestroyInput = Parameters<typeof posthog.userInterviewTopicsIntervieweesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsIntervieweesDestroyOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsIntervieweesDestroy>>;

const result: UserInterviewTopicsIntervieweesDestroyOutput = await posthog.userInterviewTopicsIntervieweesDestroy();

// Result shape (from schema): unknown
```

### `posthog.userInterviewTopicsIntervieweesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/user_interview_topics/{topic_id}/interviewees/{id}/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `user_interview_topics_interviewees_retrieve`
- **Path params**: `id`, `topic_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsIntervieweesRetrieveInput = Parameters<typeof posthog.userInterviewTopicsIntervieweesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsIntervieweesRetrieveOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsIntervieweesRetrieve>>;

const result: UserInterviewTopicsIntervieweesRetrieveOutput = await posthog.userInterviewTopicsIntervieweesRetrieve();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewTopicsIntervieweesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/user_interview_topics/{topic_id}/interviewees/{id}/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `user_interview_topics_interviewees_partial_update`
- **Path params**: `id`, `topic_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsIntervieweesPartialUpdateInput = Parameters<typeof posthog.userInterviewTopicsIntervieweesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsIntervieweesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsIntervieweesPartialUpdate>>;

const result: UserInterviewTopicsIntervieweesPartialUpdateOutput = await posthog.userInterviewTopicsIntervieweesPartialUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewTopicsIntervieweesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/user_interview_topics/{topic_id}/interviewees/{id}/`
- **What it does**: Per-interviewee extra context for a user interview topic. At most one row per (topic, interviewee_identifier).
- **OpenAPI operationId**: `user_interview_topics_interviewees_update`
- **Path params**: `id`, `topic_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsIntervieweesUpdateInput = Parameters<typeof posthog.userInterviewTopicsIntervieweesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsIntervieweesUpdateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsIntervieweesUpdate>>;

const result: UserInterviewTopicsIntervieweesUpdateOutput = await posthog.userInterviewTopicsIntervieweesUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewTopicsIntervieweesBulkCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interview_topics/{topic_id}/interviewees/bulk/`
- **What it does**: Create up to 500 interviewee context rows for a topic in a single request. Rows whose (topic, interviewee_identifier) already exists are skipped — the response surfaces an `inserted_count`, a `skipped_count`, and the `skipped_identifiers` so the caller can reconcile. Items must have unique `interviewee_identifier` values within the batch.
- **OpenAPI operationId**: `user_interview_topics_interviewees_bulk_create`
- **Path params**: `topic_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ inserted_count: number; skipped_count: number; skipped_identifiers: (string)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewTopicsIntervieweesBulkCreateInput = Parameters<typeof posthog.userInterviewTopicsIntervieweesBulkCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewTopicsIntervieweesBulkCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewTopicsIntervieweesBulkCreate>>;

const result: UserInterviewTopicsIntervieweesBulkCreateOutput = await posthog.userInterviewTopicsIntervieweesBulkCreate();

// Result shape (from schema): { inserted_count: number; skipped_count: number; skipped_identifiers: (string)[] }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
