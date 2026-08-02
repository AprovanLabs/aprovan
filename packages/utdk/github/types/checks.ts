import type { CheckAnnotation, CheckRun, CheckSuite, CheckSuitePreference, EmptyObject } from "./schemas.js";

export type ChecksOperations = {
  /**
   * Create a check run
   * @see https://docs.github.com/rest/checks/runs#create-a-check-run
   */
  create: (input: {
    body: { status: "completed"; [key: string]: unknown } | { status?: "queued" | "in_progress"; [key: string]: unknown };
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CheckRun>;

  /**
   * Get a check run
   * @see https://docs.github.com/rest/checks/runs#get-a-check-run
   */
  get: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the check run. */
    check_run_id: number;
  }) => Promise<CheckRun>;

  /**
   * Update a check run
   * @see https://docs.github.com/rest/checks/runs#update-a-check-run
   */
  update: (input: {
    body: { status?: "completed"; [key: string]: unknown } | { status?: "queued" | "in_progress"; [key: string]: unknown };
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the check run. */
    check_run_id: number;
  }) => Promise<CheckRun>;

  /**
   * List check run annotations
   * @see https://docs.github.com/rest/checks/runs#list-check-run-annotations
   */
  listAnnotations: (input: {
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
  }) => Promise<(CheckAnnotation)[]>;

  /**
   * Rerequest a check run
   * @see https://docs.github.com/rest/checks/runs#rerequest-a-check-run
   */
  rerequestRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the check run. */
    check_run_id: number;
  }) => Promise<EmptyObject>;

  /**
   * Create a check suite
   * @see https://docs.github.com/rest/checks/suites#create-a-check-suite
   */
  createSuite: (input: {
    /** The sha of the head commit. */
    head_sha: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CheckSuite>;

  /**
   * Update repository preferences for check suites
   * @see https://docs.github.com/rest/checks/suites#update-repository-preferences-for-check-suites
   */
  setSuitesPreferences: (input: {
    /** Enables or disables automatic creation of CheckSuite events upon pushes to the repository. Enabled by default. */
    auto_trigger_checks?: ({ app_id: number; setting: boolean })[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CheckSuitePreference>;

  /**
   * Get a check suite
   * @see https://docs.github.com/rest/checks/suites#get-a-check-suite
   */
  getSuite: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the check suite. */
    check_suite_id: number;
  }) => Promise<CheckSuite>;

  /**
   * List check runs in a check suite
   * @see https://docs.github.com/rest/checks/runs#list-check-runs-in-a-check-suite
   */
  listForSuite: (input: {
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
  }) => Promise<{ total_count: number; check_runs: (CheckRun)[] }>;

  /**
   * Rerequest a check suite
   * @see https://docs.github.com/rest/checks/suites#rerequest-a-check-suite
   */
  rerequestSuite: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the check suite. */
    check_suite_id: number;
  }) => Promise<EmptyObject>;

  /**
   * List check runs for a Git reference
   * @see https://docs.github.com/rest/checks/runs#list-check-runs-for-a-git-reference
   */
  listForRef: (input: {
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
  }) => Promise<{ total_count: number; check_runs: (CheckRun)[] }>;

  /**
   * List check suites for a Git reference
   * @see https://docs.github.com/rest/checks/suites#list-check-suites-for-a-git-reference
   */
  listSuitesForRef: (input: {
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
  }) => Promise<{ total_count: number; check_suites: (CheckSuite)[] }>;
};
