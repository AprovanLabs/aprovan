# Docs

## Operations

### `posthog.environmentsDocsSearch`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_tools/docs_search/`
- **What it does**: Search PostHog documentation
- **OpenAPI operationId**: `environments_docs_search`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ content: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDocsSearchInput = Parameters<typeof posthog.environmentsDocsSearch> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDocsSearchOutput = Awaited<ReturnType<typeof posthog.environmentsDocsSearch>>;

const result: EnvironmentsDocsSearchOutput = await posthog.environmentsDocsSearch();

// Result shape (from schema): { content: string }
```

### `posthog.docsSearch`

- **HTTP**: `POST /api/projects/{project_id}/mcp_tools/docs_search/`
- **What it does**: Search PostHog documentation
- **OpenAPI operationId**: `docs_search`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ content: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DocsSearchInput = Parameters<typeof posthog.docsSearch> extends [infer T, ...unknown[]] ? T : undefined;
type DocsSearchOutput = Awaited<ReturnType<typeof posthog.docsSearch>>;

const result: DocsSearchOutput = await posthog.docsSearch();

// Result shape (from schema): { content: string }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
