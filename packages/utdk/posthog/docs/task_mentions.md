# Task Mentions

## Operations

### `posthog.taskMentionsList`

- **HTTP**: `GET /api/projects/{project_id}/task_mentions/`
- **What it does**: List mentions of the requester
- **OpenAPI operationId**: `task_mentions_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `since`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; message_id: string; task_id: string; task_title: string; channel_id: string | null; channel_name: string | null; author?: { id: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaskMentionsListInput = Parameters<typeof posthog.taskMentionsList> extends [infer T, ...unknown[]] ? T : undefined;
type TaskMentionsListOutput = Awaited<ReturnType<typeof posthog.taskMentionsList>>;

const result: TaskMentionsListOutput = await posthog.taskMentionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; message_id: string; task_id: string; task_title: string; channel_id: string | null; channel_name: string | null; author?: { id: nu...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
