import type { AlertNumber, BasicError, CodeScanningAlert, CodeScanningAlertInstanceList, CodeScanningAlertItems, CodeScanningAlertSeverity, CodeScanningAlertStateQuery, CodeScanningAnalysis, CodeScanningAnalysisCommitSha, CodeScanningAnalysisDeletion, CodeScanningAnalysisSarifFile, CodeScanningAnalysisSarifId, CodeScanningAnalysisToolGuid, CodeScanningAnalysisToolName, CodeScanningAutofix, CodeScanningAutofixCommitsResponse, CodeScanningCodeqlDatabase, CodeScanningDefaultSetup, CodeScanningOrganizationAlertItems, CodeScanningRef, CodeScanningRefFull, CodeScanningSarifsReceipt, CodeScanningSarifsStatus, CodeScanningVariantAnalysis, CodeScanningVariantAnalysisRepoTask, EmptyObject } from "./schemas.js";

export type CodeScanningOperations = {
  /**
   * List code scanning alerts for an organization
   * @see https://docs.github.com/rest/code-scanning/code-scanning#list-code-scanning-alerts-for-an-organization
   */
  listAlertsForOrg: (input: {
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
  }) => Promise<(CodeScanningOrganizationAlertItems)[]>;

  /**
   * List code scanning alerts for a repository
   * @see https://docs.github.com/rest/code-scanning/code-scanning#list-code-scanning-alerts-for-a-repository
   */
  listAlertsForRepo: (input: {
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
  }) => Promise<(CodeScanningAlertItems)[]>;

  /**
   * Get a code scanning alert
   * @see https://docs.github.com/rest/code-scanning/code-scanning#get-a-code-scanning-alert
   */
  getAlert: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    alert_number: AlertNumber;
  }) => Promise<CodeScanningAlert>;

  /**
   * Update a code scanning alert
   * @see https://docs.github.com/rest/code-scanning/code-scanning#update-a-code-scanning-alert
   */
  updateAlert: (input: {
    body: unknown | unknown;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    alert_number: AlertNumber;
  }) => Promise<CodeScanningAlert>;

  /**
   * Get the status of an autofix for a code scanning alert
   * @see https://docs.github.com/rest/code-scanning/code-scanning#get-the-status-of-an-autofix-for-a-code-scanning-alert
   */
  getAutofix: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    alert_number: AlertNumber;
  }) => Promise<CodeScanningAutofix>;

  /**
   * Create an autofix for a code scanning alert
   * @see https://docs.github.com/rest/code-scanning/code-scanning#create-an-autofix-for-a-code-scanning-alert
   */
  createAutofix: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    alert_number: AlertNumber;
  }) => Promise<CodeScanningAutofix>;

  /**
   * Commit an autofix for a code scanning alert
   * @see https://docs.github.com/rest/code-scanning/code-scanning#commit-an-autofix-for-a-code-scanning-alert
   */
  commitAutofix: (input: {
    /** The Git reference of target branch for the commit. Branch needs to already exist.  For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
    target_ref?: string;
    /** Commit message to be used. */
    message?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    alert_number: AlertNumber;
  }) => Promise<CodeScanningAutofixCommitsResponse>;

  /**
   * List instances of a code scanning alert
   * @see https://docs.github.com/rest/code-scanning/code-scanning#list-instances-of-a-code-scanning-alert
   */
  listAlertInstances: (input: {
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
  }) => Promise<(CodeScanningAlertInstanceList)[]>;

  /**
   * List code scanning analyses for a repository
   * @see https://docs.github.com/rest/code-scanning/code-scanning#list-code-scanning-analyses-for-a-repository
   */
  listRecentAnalyses: (input: {
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
  }) => Promise<(CodeScanningAnalysis)[]>;

  /**
   * Get a code scanning analysis for a repository
   * @see https://docs.github.com/rest/code-scanning/code-scanning#get-a-code-scanning-analysis-for-a-repository
   */
  getAnalysis: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the analysis, as returned from the `GET /repos/{owner}/{repo}/code-scanning/analyses` operation. */
    analysis_id: number;
  }) => Promise<CodeScanningAnalysis>;

  /**
   * Delete a code scanning analysis from a repository
   * @see https://docs.github.com/rest/code-scanning/code-scanning#delete-a-code-scanning-analysis-from-a-repository
   */
  deleteAnalysis: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the analysis, as returned from the `GET /repos/{owner}/{repo}/code-scanning/analyses` operation. */
    analysis_id: number;
    /** Allow deletion if the specified analysis is the last in a set. If you attempt to delete the final analysis in a set without setting this parameter to `true`, you'll get a 400 response with the message: `Analysis is last of its type and deletion may result in the loss of historical alert data. Please specify confirm_delete.` */
    confirm_delete?: string | null;
  }) => Promise<CodeScanningAnalysisDeletion>;

  /**
   * List CodeQL databases for a repository
   * @see https://docs.github.com/rest/code-scanning/code-scanning#list-codeql-databases-for-a-repository
   */
  listCodeqlDatabases: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(CodeScanningCodeqlDatabase)[]>;

  /**
   * Get a CodeQL database for a repository
   * @see https://docs.github.com/rest/code-scanning/code-scanning#get-a-codeql-database-for-a-repository
   */
  getCodeqlDatabase: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The language of the CodeQL database. */
    language: string;
  }) => Promise<CodeScanningCodeqlDatabase>;

  /**
   * Delete a CodeQL database
   * @see https://docs.github.com/rest/code-scanning/code-scanning#delete-a-codeql-database
   */
  deleteCodeqlDatabase: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The language of the CodeQL database. */
    language: string;
  }) => Promise<BasicError>;

  /**
   * Create a CodeQL variant analysis
   * @see https://docs.github.com/rest/code-scanning/code-scanning#create-a-codeql-variant-analysis
   */
  createVariantAnalysis: (input: {
    body: unknown | unknown | unknown;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CodeScanningVariantAnalysis>;

  /**
   * Get the summary of a CodeQL variant analysis
   * @see https://docs.github.com/rest/code-scanning/code-scanning#get-the-summary-of-a-codeql-variant-analysis
   */
  getVariantAnalysis: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the variant analysis. */
    codeql_variant_analysis_id: number;
  }) => Promise<CodeScanningVariantAnalysis>;

  /**
   * Get the analysis status of a repository in a CodeQL variant analysis
   * @see https://docs.github.com/rest/code-scanning/code-scanning#get-the-analysis-status-of-a-repository-in-a-codeql-variant-analysis
   */
  getVariantAnalysisRepoTask: (input: {
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
  }) => Promise<CodeScanningVariantAnalysisRepoTask>;

  /**
   * Get a code scanning default setup configuration
   * @see https://docs.github.com/rest/code-scanning/code-scanning#get-a-code-scanning-default-setup-configuration
   */
  getDefaultSetup: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CodeScanningDefaultSetup>;

  /**
   * Update a code scanning default setup configuration
   * @see https://docs.github.com/rest/code-scanning/code-scanning#update-a-code-scanning-default-setup-configuration
   */
  updateDefaultSetup: (input: {
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
  }) => Promise<EmptyObject>;

  /**
   * Upload an analysis as SARIF data
   * @see https://docs.github.com/rest/code-scanning/code-scanning#upload-an-analysis-as-sarif-data
   */
  uploadSarif: (input: {
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
  }) => Promise<CodeScanningSarifsReceipt>;

  /**
   * Get information about a SARIF upload
   * @see https://docs.github.com/rest/code-scanning/code-scanning#get-information-about-a-sarif-upload
   */
  getSarif: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The SARIF ID obtained after uploading. */
    sarif_id: string;
  }) => Promise<CodeScanningSarifsStatus>;
};
