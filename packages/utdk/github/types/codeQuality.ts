import type { CodeQualityFinding, CodeQualitySetup, CodeQualitySetupUpdate, EmptyObject } from "./schemas.js";

export type CodeQualityOperations = {
  /**
   * List code quality findings for a repository
   * @see https://docs.github.com/rest/code-quality/code-quality#list-code-quality-findings-for-a-repository
   */
  listFindingsForRepo: (input: {
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
  }) => Promise<(CodeQualityFinding)[]>;

  /**
   * Get a code quality finding
   * @see https://docs.github.com/rest/code-quality/code-quality#get-a-code-quality-finding
   */
  getFinding: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies a finding. */
    finding_number: number;
  }) => Promise<CodeQualityFinding>;

  /**
   * Get a code quality setup configuration
   * @see https://docs.github.com/rest/code-quality/code-quality#get-a-code-quality-setup-configuration
   */
  getSetup: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CodeQualitySetup>;

  /**
   * Update a code quality setup configuration
   * @see https://docs.github.com/rest/code-quality/code-quality#update-a-code-quality-setup-configuration
   */
  updateSetup: (input: {
    body: CodeQualitySetupUpdate;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<EmptyObject>;
};
