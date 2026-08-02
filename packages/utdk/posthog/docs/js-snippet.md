# Js Snippet

## Operations

### `posthog.jsSnippetResolveRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/js-snippet/resolve/`
- **What it does**: Preview what a given pin would resolve to, without saving it.
- **OpenAPI operationId**: `js_snippet_resolve_retrieve`
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

type JsSnippetResolveRetrieveInput = Parameters<typeof posthog.jsSnippetResolveRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type JsSnippetResolveRetrieveOutput = Awaited<ReturnType<typeof posthog.jsSnippetResolveRetrieve>>;

const result: JsSnippetResolveRetrieveOutput = await posthog.jsSnippetResolveRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.jsSnippetVersionRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/js-snippet/version/`
- **What it does**: Return the team's current version pin and resolved version.
- **OpenAPI operationId**: `js_snippet_version_retrieve`
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

type JsSnippetVersionRetrieveInput = Parameters<typeof posthog.jsSnippetVersionRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type JsSnippetVersionRetrieveOutput = Awaited<ReturnType<typeof posthog.jsSnippetVersionRetrieve>>;

const result: JsSnippetVersionRetrieveOutput = await posthog.jsSnippetVersionRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.jsSnippetVersionPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/js-snippet/version/`
- **What it does**: Update the team's version pin.
- **OpenAPI operationId**: `js_snippet_version_partial_update`
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

type JsSnippetVersionPartialUpdateInput = Parameters<typeof posthog.jsSnippetVersionPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type JsSnippetVersionPartialUpdateOutput = Awaited<ReturnType<typeof posthog.jsSnippetVersionPartialUpdate>>;

const result: JsSnippetVersionPartialUpdateOutput = await posthog.jsSnippetVersionPartialUpdate();

// Result shape (from schema): { [key: string]: unknown }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
