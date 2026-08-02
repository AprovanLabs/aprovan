# Generation

2 operations · `@utdk/gemini`

```ts
import gemini from "@utdk/gemini";
```

## `gemini.countTokens`

Count tokens — [Provider docs](https://ai.google.dev/gemini-api/docs)

```ts
gemini.countTokens(input: {
  contents?: (Content)[];
  model: string;
}): Promise<{ totalTokens?: number }>
```

<sub>`POST /v1beta/models/{model}:countTokens` · `countTokens`</sub>

## `gemini.generateContent`

Generate content — [Provider docs](https://ai.google.dev/gemini-api/docs)

```ts
gemini.generateContent(input: {
  contents: (Content)[];
  systemInstruction?: Content;
  generationConfig?: GenerationConfig;
  safetySettings?: ({ [key: string]: unknown })[];
  /** Model name without the models/ prefix, e.g. gemini-2.5-flash */
  model: string;
}): Promise<GenerateContentResponse>
```

<sub>`POST /v1beta/models/{model}:generateContent` · `generateContent`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
