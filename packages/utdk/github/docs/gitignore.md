# Gitignore

2 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.gitignore.getAllTemplates`

Get all gitignore templates — [API reference](https://docs.github.com/rest/gitignore/gitignore#get-all-gitignore-templates)

```ts
github.gitignore.getAllTemplates(): Promise<(string)[]>
```

<sub>`GET /gitignore/templates` · `gitignore/get-all-templates`</sub>

## `github.gitignore.getTemplate`

Get a gitignore template — [API reference](https://docs.github.com/rest/gitignore/gitignore#get-a-gitignore-template)

```ts
github.gitignore.getTemplate(input: {
  name: string;
}): Promise<GitignoreTemplate>
```

<sub>`GET /gitignore/templates/{name}` · `gitignore/get-template`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
