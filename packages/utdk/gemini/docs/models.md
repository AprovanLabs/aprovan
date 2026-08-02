# Models

2 operations · `@utdk/gemini`

```ts
import gemini from "@utdk/gemini";
```

## `gemini.listModels`

List models — [Provider docs](https://ai.google.dev/gemini-api/docs)

```ts
gemini.listModels(input: {
  pageSize?: number;
  pageToken?: string;
}): Promise<{ models?: (Model)[]; nextPageToken?: string }>
```

<sub>`GET /v1beta/models` · `listModels`</sub>

## `gemini.getModel`

Get a model — [Provider docs](https://ai.google.dev/gemini-api/docs)

```ts
gemini.getModel(input: {
  /** Model name without the models/ prefix, e.g. gemini-2.5-flash */
  model: string;
}): Promise<Model>
```

<sub>`GET /v1beta/models/{model}` · `getModel`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
