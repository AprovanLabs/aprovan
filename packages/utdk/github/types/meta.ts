import type { ApiOverview, Root } from "./schemas.js";

export type MetaOperations = {
  /**
   * GitHub API Root
   * @see https://docs.github.com/rest/meta/meta#github-api-root
   */
  root: () => Promise<Root>;

  /**
   * Get GitHub meta information
   * @see https://docs.github.com/rest/meta/meta#get-apiname-meta-information
   */
  get: () => Promise<ApiOverview>;

  /**
   * Get Octocat
   * @see https://docs.github.com/rest/meta/meta#get-octocat
   */
  getOctocat: (input: {
    /** The words to show in Octocat's speech bubble */
    s?: string;
  }) => Promise<string>;

  /**
   * Get all API versions
   * @see https://docs.github.com/rest/meta/meta#get-all-api-versions
   */
  getAllVersions: () => Promise<(string)[]>;

  /**
   * Get the Zen of GitHub
   * @see https://docs.github.com/rest/meta/meta#get-the-zen-of-github
   */
  getZen: () => Promise<string>;
};
