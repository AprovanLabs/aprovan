# Licenses

3 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.licenses.getAllCommonlyUsed`

Get all commonly used licenses — [API reference](https://docs.github.com/rest/licenses/licenses#get-all-commonly-used-licenses)

```ts
github.licenses.getAllCommonlyUsed(input: {
  featured?: boolean;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(LicenseSimple)[]>
```

<sub>`GET /licenses` · `licenses/get-all-commonly-used`</sub>

## `github.licenses.get`

Get a license — [API reference](https://docs.github.com/rest/licenses/licenses#get-a-license)

```ts
github.licenses.get(input: {
  license: string;
}): Promise<License>
```

<sub>`GET /licenses/{license}` · `licenses/get`</sub>

## `github.licenses.getForRepo`

Get the license for a repository — [API reference](https://docs.github.com/rest/licenses/licenses#get-the-license-for-a-repository)

```ts
github.licenses.getForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  ref?: CodeScanningRef;
}): Promise<LicenseContent>
```

<sub>`GET /repos/{owner}/{repo}/license` · `licenses/get-for-repo`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
