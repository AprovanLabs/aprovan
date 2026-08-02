# Code Quality

4 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.codeQuality.listFindingsForRepo`

List code quality findings for a repository — [API reference](https://docs.github.com/rest/code-quality/code-quality#list-code-quality-findings-for-a-repository)

```ts
github.codeQuality.listFindingsForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** If specified, only code quality findings with this state will be returned. */
  state?: "open" | "dismissed";
}): Promise<(CodeQualityFinding)[]>
```

<sub>`GET /repos/{owner}/{repo}/code-quality/findings` · `code-quality/list-findings-for-repo`</sub>

## `github.codeQuality.getFinding`

Get a code quality finding — [API reference](https://docs.github.com/rest/code-quality/code-quality#get-a-code-quality-finding)

```ts
github.codeQuality.getFinding(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies a finding. */
  finding_number: number;
}): Promise<CodeQualityFinding>
```

<sub>`GET /repos/{owner}/{repo}/code-quality/findings/{finding_number}` · `code-quality/get-finding`</sub>

## `github.codeQuality.getSetup`

Get a code quality setup configuration — [API reference](https://docs.github.com/rest/code-quality/code-quality#get-a-code-quality-setup-configuration)

```ts
github.codeQuality.getSetup(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<CodeQualitySetup>
```

<sub>`GET /repos/{owner}/{repo}/code-quality/setup` · `code-quality/get-setup`</sub>

## `github.codeQuality.updateSetup`

Update a code quality setup configuration — [API reference](https://docs.github.com/rest/code-quality/code-quality#update-a-code-quality-setup-configuration)

```ts
github.codeQuality.updateSetup(input: {
  body: CodeQualitySetupUpdate;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<EmptyObject>
```

<sub>`PATCH /repos/{owner}/{repo}/code-quality/setup` · `code-quality/update-setup`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
