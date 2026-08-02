# Markdown

2 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.markdown.render`

Render a Markdown document — [API reference](https://docs.github.com/rest/markdown/markdown#render-a-markdown-document)

```ts
github.markdown.render(input: {
  /** The Markdown text to render in HTML. */
  text: string;
  /** The rendering mode. */
  mode?: "markdown" | "gfm";
  /** The repository context to use when creating references in `gfm` mode.  For example, setting `context` to `octo-org/octo-repo` will change the text `#42` into an HTML link to issue 42 in the `octo-org/octo-repo` repository. */
  context?: string;
}): Promise<string>
```

<sub>`POST /markdown` · `markdown/render`</sub>

## `github.markdown.renderRaw`

Render a Markdown document in raw mode — [API reference](https://docs.github.com/rest/markdown/markdown#render-a-markdown-document-in-raw-mode)

```ts
github.markdown.renderRaw(input: {
  body?: string;
}): Promise<string>
```

<sub>`POST /markdown/raw` · `markdown/render-raw`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
