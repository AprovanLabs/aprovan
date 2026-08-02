# Meta

5 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.meta.root`

GitHub API Root — [API reference](https://docs.github.com/rest/meta/meta#github-api-root)

```ts
github.meta.root(): Promise<Root>
```

<sub>`GET /` · `meta/root`</sub>

## `github.meta.get`

Get GitHub meta information — [API reference](https://docs.github.com/rest/meta/meta#get-apiname-meta-information)

```ts
github.meta.get(): Promise<ApiOverview>
```

<sub>`GET /meta` · `meta/get`</sub>

## `github.meta.getOctocat`

Get Octocat — [API reference](https://docs.github.com/rest/meta/meta#get-octocat)

```ts
github.meta.getOctocat(input: {
  /** The words to show in Octocat's speech bubble */
  s?: string;
}): Promise<string>
```

<sub>`GET /octocat` · `meta/get-octocat`</sub>

## `github.meta.getAllVersions`

Get all API versions — [API reference](https://docs.github.com/rest/meta/meta#get-all-api-versions)

```ts
github.meta.getAllVersions(): Promise<(string)[]>
```

<sub>`GET /versions` · `meta/get-all-versions`</sub>

## `github.meta.getZen`

Get the Zen of GitHub — [API reference](https://docs.github.com/rest/meta/meta#get-the-zen-of-github)

```ts
github.meta.getZen(): Promise<string>
```

<sub>`GET /zen` · `meta/get-zen`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
