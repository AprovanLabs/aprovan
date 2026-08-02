# Codes Of Conduct

2 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.codesOfConduct.getAllCodesOfConduct`

Get all codes of conduct — [API reference](https://docs.github.com/rest/codes-of-conduct/codes-of-conduct#get-all-codes-of-conduct)

```ts
github.codesOfConduct.getAllCodesOfConduct(): Promise<(CodeOfConduct)[]>
```

<sub>`GET /codes_of_conduct` · `codes-of-conduct/get-all-codes-of-conduct`</sub>

## `github.codesOfConduct.getConductCode`

Get a code of conduct — [API reference](https://docs.github.com/rest/codes-of-conduct/codes-of-conduct#get-a-code-of-conduct)

```ts
github.codesOfConduct.getConductCode(input: {
  key: string;
}): Promise<CodeOfConduct>
```

<sub>`GET /codes_of_conduct/{key}` · `codes-of-conduct/get-conduct-code`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
