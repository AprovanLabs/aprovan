import type { CodeScanningRef, License, LicenseContent, LicenseSimple } from "./schemas.js";

export type LicensesOperations = {
  /**
   * Get all commonly used licenses
   * @see https://docs.github.com/rest/licenses/licenses#get-all-commonly-used-licenses
   */
  getAllCommonlyUsed: (input: {
    featured?: boolean;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(LicenseSimple)[]>;

  /**
   * Get a license
   * @see https://docs.github.com/rest/licenses/licenses#get-a-license
   */
  get: (input: {
    license: string;
  }) => Promise<License>;

  /**
   * Get the license for a repository
   * @see https://docs.github.com/rest/licenses/licenses#get-the-license-for-a-repository
   */
  getForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    ref?: CodeScanningRef;
  }) => Promise<LicenseContent>;
};
