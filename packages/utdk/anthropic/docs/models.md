# Models

2 operations · `@utdk/anthropic`

```ts
import anthropic from "@utdk/anthropic";
```

## `anthropic.listModels`

List models — [Provider docs](https://platform.claude.com/docs)

```ts
anthropic.listModels(input: {
  limit?: number;
  before_id?: string;
  after_id?: string;
}, options: { headers: { "anthropic-version": string } }): Promise<{ data: (ModelInfo)[]; has_more: boolean; first_id?: string | null; last_id?: string | null }>
```

<sub>`GET /v1/models` · `listModels`</sub>

## `anthropic.getModel`

Get a model — [Provider docs](https://platform.claude.com/docs)

```ts
anthropic.getModel(input: {
  /** Model identifier or alias, e.g. claude-opus-4-8 */
  model_id: string;
}, options: { headers: { "anthropic-version": string } }): Promise<ModelInfo>
```

<sub>`GET /v1/models/{model_id}` · `getModel`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
