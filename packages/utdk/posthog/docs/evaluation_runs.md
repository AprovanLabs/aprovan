# Evaluation Runs

## Operations

### `posthog.environmentsEvaluationRunsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/evaluation_runs/`
- **What it does**: Create a new evaluation run.

This endpoint validates the request and enqueues a Temporal workflow
to asynchronously execute the evaluation.
- **OpenAPI operationId**: `environments_evaluation_runs_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEvaluationRunsCreateInput = Parameters<typeof posthog.environmentsEvaluationRunsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEvaluationRunsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsEvaluationRunsCreate>>;

const result: EnvironmentsEvaluationRunsCreateOutput = await posthog.environmentsEvaluationRunsCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.evaluationRunsCreate`

- **HTTP**: `POST /api/projects/{project_id}/evaluation_runs/`
- **What it does**: Create a new evaluation run.

This endpoint validates the request and enqueues a Temporal workflow
to asynchronously execute the evaluation.
- **OpenAPI operationId**: `evaluation_runs_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EvaluationRunsCreateInput = Parameters<typeof posthog.evaluationRunsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EvaluationRunsCreateOutput = Awaited<ReturnType<typeof posthog.evaluationRunsCreate>>;

const result: EvaluationRunsCreateOutput = await posthog.evaluationRunsCreate();

// Result shape (from schema): { [key: string]: unknown }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
