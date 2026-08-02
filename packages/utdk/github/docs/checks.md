# Checks

12 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.checks.create`

Create a check run — [API reference](https://docs.github.com/rest/checks/runs#create-a-check-run)

```ts
github.checks.create(input: {
  body: { status: "completed"; [key: string]: unknown } | { status?: "queued" | "in_progress"; [key: string]: unknown };
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<CheckRun>
```

<sub>`POST /repos/{owner}/{repo}/check-runs` · `checks/create`</sub>

## `github.checks.get`

Get a check run — [API reference](https://docs.github.com/rest/checks/runs#get-a-check-run)

```ts
github.checks.get(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the check run. */
  check_run_id: number;
}): Promise<CheckRun>
```

<sub>`GET /repos/{owner}/{repo}/check-runs/{check_run_id}` · `checks/get`</sub>

## `github.checks.update`

Update a check run — [API reference](https://docs.github.com/rest/checks/runs#update-a-check-run)

```ts
github.checks.update(input: {
  body: { status?: "completed"; [key: string]: unknown } | { status?: "queued" | "in_progress"; [key: string]: unknown };
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the check run. */
  check_run_id: number;
}): Promise<CheckRun>
```

<sub>`PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}` · `checks/update`</sub>

## `github.checks.listAnnotations`

List check run annotations — [API reference](https://docs.github.com/rest/checks/runs#list-check-run-annotations)

```ts
github.checks.listAnnotations(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the check run. */
  check_run_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(CheckAnnotation)[]>
```

<sub>`GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations` · `checks/list-annotations`</sub>

## `github.checks.rerequestRun`

Rerequest a check run — [API reference](https://docs.github.com/rest/checks/runs#rerequest-a-check-run)

```ts
github.checks.rerequestRun(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the check run. */
  check_run_id: number;
}): Promise<EmptyObject>
```

<sub>`POST /repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest` · `checks/rerequest-run`</sub>

## `github.checks.createSuite`

Create a check suite — [API reference](https://docs.github.com/rest/checks/suites#create-a-check-suite)

```ts
github.checks.createSuite(input: {
  /** The sha of the head commit. */
  head_sha: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<CheckSuite>
```

<sub>`POST /repos/{owner}/{repo}/check-suites` · `checks/create-suite`</sub>

## `github.checks.getSuite`

Get a check suite — [API reference](https://docs.github.com/rest/checks/suites#get-a-check-suite)

```ts
github.checks.getSuite(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the check suite. */
  check_suite_id: number;
}): Promise<CheckSuite>
```

<sub>`GET /repos/{owner}/{repo}/check-suites/{check_suite_id}` · `checks/get-suite`</sub>

## `github.checks.listForSuite`

List check runs in a check suite — [API reference](https://docs.github.com/rest/checks/runs#list-check-runs-in-a-check-suite)

```ts
github.checks.listForSuite(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the check suite. */
  check_suite_id: number;
  /** Returns check runs with the specified `name`. */
  check_name?: string;
  /** Returns check runs with the specified `status`. */
  status?: "queued" | "in_progress" | "completed";
  /** Filters check runs by their `completed_at` timestamp. `latest` returns the most recent check runs. */
  filter?: "latest" | "all";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; check_runs: (CheckRun)[] }>
```

<sub>`GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs` · `checks/list-for-suite`</sub>

## `github.checks.rerequestSuite`

Rerequest a check suite — [API reference](https://docs.github.com/rest/checks/suites#rerequest-a-check-suite)

```ts
github.checks.rerequestSuite(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the check suite. */
  check_suite_id: number;
}): Promise<EmptyObject>
```

<sub>`POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest` · `checks/rerequest-suite`</sub>

## `github.checks.setSuitesPreferences`

Update repository preferences for check suites — [API reference](https://docs.github.com/rest/checks/suites#update-repository-preferences-for-check-suites)

```ts
github.checks.setSuitesPreferences(input: {
  /** Enables or disables automatic creation of CheckSuite events upon pushes to the repository. Enabled by default. */
  auto_trigger_checks?: ({ app_id: number; setting: boolean })[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<CheckSuitePreference>
```

<sub>`PATCH /repos/{owner}/{repo}/check-suites/preferences` · `checks/set-suites-preferences`</sub>

## `github.checks.listForRef`

List check runs for a Git reference — [API reference](https://docs.github.com/rest/checks/runs#list-check-runs-for-a-git-reference)

```ts
github.checks.listForRef(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The commit reference. Can be a commit SHA, branch name (`heads/BRANCH_NAME`), or tag name (`tags/TAG_NAME`). For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
  ref: string;
  /** Returns check runs with the specified `name`. */
  check_name?: string;
  /** Returns check runs with the specified `status`. */
  status?: "queued" | "in_progress" | "completed";
  /** Filters check runs by their `completed_at` timestamp. `latest` returns the most recent check runs. */
  filter?: "latest" | "all";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  app_id?: number;
}): Promise<{ total_count: number; check_runs: (CheckRun)[] }>
```

<sub>`GET /repos/{owner}/{repo}/commits/{ref}/check-runs` · `checks/list-for-ref`</sub>

## `github.checks.listSuitesForRef`

List check suites for a Git reference — [API reference](https://docs.github.com/rest/checks/suites#list-check-suites-for-a-git-reference)

```ts
github.checks.listSuitesForRef(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The commit reference. Can be a commit SHA, branch name (`heads/BRANCH_NAME`), or tag name (`tags/TAG_NAME`). For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
  ref: string;
  /** Filters check suites by GitHub App `id`. */
  app_id?: number;
  /** Returns check runs with the specified `name`. */
  check_name?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; check_suites: (CheckSuite)[] }>
```

<sub>`GET /repos/{owner}/{repo}/commits/{ref}/check-suites` · `checks/list-suites-for-ref`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
