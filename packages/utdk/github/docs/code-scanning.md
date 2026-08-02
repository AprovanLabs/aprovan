# Code Scanning

21 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.codeScanning.listAlertsForOrg`

List code scanning alerts for an organization — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#list-code-scanning-alerts-for-an-organization)

```ts
github.codeScanning.listAlertsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  tool_name?: CodeScanningAnalysisToolName;
  tool_guid?: CodeScanningAnalysisToolGuid;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  state?: CodeScanningAlertStateQuery;
  /** The property by which to sort the results. */
  sort?: "created" | "updated";
  severity?: CodeScanningAlertSeverity;
  /** Filter alerts by assignees. Provide a comma-separated list of user handles (e.g., `octocat` or `octocat,hubot`). Use `*` to list alerts with at least one assignee or `none` to list alerts with no assignees.  */
  assignees?: string;
}): Promise<(CodeScanningOrganizationAlertItems)[]>
```

<sub>`GET /orgs/{org}/code-scanning/alerts` · `code-scanning/list-alerts-for-org`</sub>

## `github.codeScanning.listAlertsForRepo`

List code scanning alerts for a repository — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#list-code-scanning-alerts-for-a-repository)

```ts
github.codeScanning.listAlertsForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  tool_name?: CodeScanningAnalysisToolName;
  tool_guid?: CodeScanningAnalysisToolGuid;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  ref?: CodeScanningRef;
  /** The number of the pull request for the results you want to list. */
  pr?: number;
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The property by which to sort the results. */
  sort?: "created" | "updated";
  state?: CodeScanningAlertStateQuery;
  severity?: CodeScanningAlertSeverity;
  /** Filter alerts by assignees. Provide a comma-separated list of user handles (e.g., `octocat` or `octocat,hubot`). Use `*` to list alerts with at least one assignee or `none` to list alerts with no assignees.  */
  assignees?: string;
}): Promise<(CodeScanningAlertItems)[]>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/alerts` · `code-scanning/list-alerts-for-repo`</sub>

## `github.codeScanning.getAlert`

Get a code scanning alert — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#get-a-code-scanning-alert)

```ts
github.codeScanning.getAlert(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
}): Promise<CodeScanningAlert>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}` · `code-scanning/get-alert`</sub>

## `github.codeScanning.updateAlert`

Update a code scanning alert — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#update-a-code-scanning-alert)

```ts
github.codeScanning.updateAlert(input: {
  body: unknown | unknown;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
}): Promise<CodeScanningAlert>
```

<sub>`PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}` · `code-scanning/update-alert`</sub>

## `github.codeScanning.getAutofix`

Get the status of an autofix for a code scanning alert — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#get-the-status-of-an-autofix-for-a-code-scanning-alert)

```ts
github.codeScanning.getAutofix(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
}): Promise<CodeScanningAutofix>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix` · `code-scanning/get-autofix`</sub>

## `github.codeScanning.createAutofix`

Create an autofix for a code scanning alert — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#create-an-autofix-for-a-code-scanning-alert)

```ts
github.codeScanning.createAutofix(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
}): Promise<CodeScanningAutofix>
```

<sub>`POST /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix` · `code-scanning/create-autofix`</sub>

## `github.codeScanning.commitAutofix`

Commit an autofix for a code scanning alert — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#commit-an-autofix-for-a-code-scanning-alert)

```ts
github.codeScanning.commitAutofix(input: {
  /** The Git reference of target branch for the commit. Branch needs to already exist.  For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
  target_ref?: string;
  /** Commit message to be used. */
  message?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
}): Promise<CodeScanningAutofixCommitsResponse>
```

<sub>`POST /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix/commits` · `code-scanning/commit-autofix`</sub>

## `github.codeScanning.listAlertInstances`

List instances of a code scanning alert — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#list-instances-of-a-code-scanning-alert)

```ts
github.codeScanning.listAlertInstances(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  ref?: CodeScanningRef;
  /** The number of the pull request for the results you want to list. */
  pr?: number;
}): Promise<(CodeScanningAlertInstanceList)[]>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances` · `code-scanning/list-alert-instances`</sub>

## `github.codeScanning.listRecentAnalyses`

List code scanning analyses for a repository — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#list-code-scanning-analyses-for-a-repository)

```ts
github.codeScanning.listRecentAnalyses(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  tool_name?: CodeScanningAnalysisToolName;
  tool_guid?: CodeScanningAnalysisToolGuid;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The number of the pull request for the results you want to list. */
  pr?: number;
  ref?: CodeScanningRef;
  sarif_id?: CodeScanningAnalysisSarifId;
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The property by which to sort the results. */
  sort?: "created";
}): Promise<(CodeScanningAnalysis)[]>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/analyses` · `code-scanning/list-recent-analyses`</sub>

## `github.codeScanning.deleteAnalysis`

Delete a code scanning analysis from a repository — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#delete-a-code-scanning-analysis-from-a-repository)

```ts
github.codeScanning.deleteAnalysis(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The ID of the analysis, as returned from the `GET /repos/{owner}/{repo}/code-scanning/analyses` operation. */
  analysis_id: number;
  /** Allow deletion if the specified analysis is the last in a set. If you attempt to delete the final analysis in a set without setting this parameter to `true`, you'll get a 400 response with the message: `Analysis is last of its type and deletion may result in the loss of historical alert data. Please specify confirm_delete.` */
  confirm_delete?: string | null;
}): Promise<CodeScanningAnalysisDeletion>
```

<sub>`DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}` · `code-scanning/delete-analysis`</sub>

## `github.codeScanning.getAnalysis`

Get a code scanning analysis for a repository — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#get-a-code-scanning-analysis-for-a-repository)

```ts
github.codeScanning.getAnalysis(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The ID of the analysis, as returned from the `GET /repos/{owner}/{repo}/code-scanning/analyses` operation. */
  analysis_id: number;
}): Promise<CodeScanningAnalysis>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}` · `code-scanning/get-analysis`</sub>

## `github.codeScanning.listCodeqlDatabases`

List CodeQL databases for a repository — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#list-codeql-databases-for-a-repository)

```ts
github.codeScanning.listCodeqlDatabases(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<(CodeScanningCodeqlDatabase)[]>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/codeql/databases` · `code-scanning/list-codeql-databases`</sub>

## `github.codeScanning.deleteCodeqlDatabase`

Delete a CodeQL database — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#delete-a-codeql-database)

```ts
github.codeScanning.deleteCodeqlDatabase(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The language of the CodeQL database. */
  language: string;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}` · `code-scanning/delete-codeql-database`</sub>

## `github.codeScanning.getCodeqlDatabase`

Get a CodeQL database for a repository — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#get-a-codeql-database-for-a-repository)

```ts
github.codeScanning.getCodeqlDatabase(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The language of the CodeQL database. */
  language: string;
}): Promise<CodeScanningCodeqlDatabase>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}` · `code-scanning/get-codeql-database`</sub>

## `github.codeScanning.createVariantAnalysis`

Create a CodeQL variant analysis — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#create-a-codeql-variant-analysis)

```ts
github.codeScanning.createVariantAnalysis(input: {
  body: unknown | unknown | unknown;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<CodeScanningVariantAnalysis>
```

<sub>`POST /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses` · `code-scanning/create-variant-analysis`</sub>

## `github.codeScanning.getVariantAnalysis`

Get the summary of a CodeQL variant analysis — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#get-the-summary-of-a-codeql-variant-analysis)

```ts
github.codeScanning.getVariantAnalysis(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the variant analysis. */
  codeql_variant_analysis_id: number;
}): Promise<CodeScanningVariantAnalysis>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}` · `code-scanning/get-variant-analysis`</sub>

## `github.codeScanning.getVariantAnalysisRepoTask`

Get the analysis status of a repository in a CodeQL variant analysis — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#get-the-analysis-status-of-a-repository-in-a-codeql-variant-analysis)

```ts
github.codeScanning.getVariantAnalysisRepoTask(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the controller repository. */
  repo: string;
  /** The ID of the variant analysis. */
  codeql_variant_analysis_id: number;
  /** The account owner of the variant analysis repository. The name is not case sensitive. */
  repo_owner: string;
  /** The name of the variant analysis repository. */
  repo_name: string;
}): Promise<CodeScanningVariantAnalysisRepoTask>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}/repos/{repo_owner}/{repo_name}` · `code-scanning/get-variant-analysis-repo-task`</sub>

## `github.codeScanning.getDefaultSetup`

Get a code scanning default setup configuration — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#get-a-code-scanning-default-setup-configuration)

```ts
github.codeScanning.getDefaultSetup(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<CodeScanningDefaultSetup>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/default-setup` · `code-scanning/get-default-setup`</sub>

## `github.codeScanning.updateDefaultSetup`

Update a code scanning default setup configuration — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#update-a-code-scanning-default-setup-configuration)

```ts
github.codeScanning.updateDefaultSetup(input: {
  /** The desired state of code scanning default setup. */
  state?: "configured" | "not-configured";
  /** Runner type to be used. */
  runner_type?: "standard" | "labeled";
  /** Runner label to be used if the runner type is labeled. */
  runner_label?: string | null;
  /** CodeQL query suite to be used. */
  query_suite?: "default" | "extended";
  /** Threat model to be used for code scanning analysis. Use `remote` to analyze only network sources and `remote_and_local` to include local sources like filesystem access, command-line arguments, database reads, environment variable and standard input. */
  threat_model?: "remote" | "remote_and_local";
  /** CodeQL languages to be analyzed. */
  languages?: ("actions" | "c-cpp" | "csharp" | "go" | "java-kotlin" | "javascript-typescript" | "python" | "ruby" | "swift")[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<EmptyObject>
```

<sub>`PATCH /repos/{owner}/{repo}/code-scanning/default-setup` · `code-scanning/update-default-setup`</sub>

## `github.codeScanning.uploadSarif`

Upload an analysis as SARIF data — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#upload-an-analysis-as-sarif-data)

```ts
github.codeScanning.uploadSarif(input: {
  commit_sha: CodeScanningAnalysisCommitSha;
  ref: CodeScanningRefFull;
  sarif: CodeScanningAnalysisSarifFile;
  /** The base directory used in the analysis, as it appears in the SARIF file. This property is used to convert file paths from absolute to relative, so that alerts can be mapped to their correct location in the repository. */
  checkout_uri?: string;
  /** The time that the analysis run began. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  started_at?: string;
  /** The name of the tool used to generate the code scanning analysis. If this parameter is not used, the tool name defaults to "API". If the uploaded SARIF contains a tool GUID, this will be available for filtering using the `tool_guid` parameter of operations such as `GET /repos/{owner}/{repo}/code-scanning/alerts`. */
  tool_name?: string;
  /** Whether the SARIF file will be validated according to the code scanning specifications. This parameter is intended to help integrators ensure that the uploaded SARIF files are correctly rendered by code scanning. */
  validate?: boolean;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<CodeScanningSarifsReceipt>
```

<sub>`POST /repos/{owner}/{repo}/code-scanning/sarifs` · `code-scanning/upload-sarif`</sub>

## `github.codeScanning.getSarif`

Get information about a SARIF upload — [API reference](https://docs.github.com/rest/code-scanning/code-scanning#get-information-about-a-sarif-upload)

```ts
github.codeScanning.getSarif(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The SARIF ID obtained after uploading. */
  sarif_id: string;
}): Promise<CodeScanningSarifsStatus>
```

<sub>`GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}` · `code-scanning/get-sarif`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
