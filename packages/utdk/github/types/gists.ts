import type { BaseGist, BasicError, GistComment, GistCommit, GistSimple } from "./schemas.js";

export type GistsOperations = {
  /**
   * List gists for the authenticated user
   * @see https://docs.github.com/rest/gists/gists#list-gists-for-the-authenticated-user
   */
  list: (input: {
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(BaseGist)[]>;

  /**
   * Create a gist
   * @see https://docs.github.com/rest/gists/gists#create-a-gist
   */
  create: (input: {
    /** Description of the gist */
    description?: string;
    /** Names and content for the files that make up the gist */
    files: { [key: string]: { content: string } | undefined };
    public?: boolean | "true" | "false";
  }) => Promise<GistSimple>;

  /**
   * List public gists
   * @see https://docs.github.com/rest/gists/gists#list-public-gists
   */
  listPublic: (input: {
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(BaseGist)[]>;

  /**
   * List starred gists
   * @see https://docs.github.com/rest/gists/gists#list-starred-gists
   */
  listStarred: (input: {
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(BaseGist)[]>;

  /**
   * Get a gist
   * @see https://docs.github.com/rest/gists/gists#get-a-gist
   */
  get: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
  }) => Promise<GistSimple>;

  /**
   * Update a gist
   * @see https://docs.github.com/rest/gists/gists#update-a-gist
   */
  update: (input: {
    /** The description of the gist. */
    description?: string;
    /** The gist files to be updated, renamed, or deleted. Each `key` must match the current filename (including extension) of the targeted gist file. For example: `hello.py`.  To delete a file, set the whole file to null. For example: `hello.py : null`. The file will also be deleted if the specified object does not contain at least one of `content` or `filename`. */
    files?: { [key: string]: { content?: string; filename?: string | null } | null | undefined };
    /** The unique identifier of the gist. */
    gist_id: string;
  }) => Promise<GistSimple>;

  /**
   * Delete a gist
   * @see https://docs.github.com/rest/gists/gists#delete-a-gist
   */
  delete: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
  }) => Promise<BasicError>;

  /**
   * List gist comments
   * @see https://docs.github.com/rest/gists/comments#list-gist-comments
   */
  listComments: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(GistComment)[]>;

  /**
   * Create a gist comment
   * @see https://docs.github.com/rest/gists/comments#create-a-gist-comment
   */
  createComment: (input: {
    /** The comment text. */
    body: string;
    /** The unique identifier of the gist. */
    gist_id: string;
  }) => Promise<GistComment>;

  /**
   * Get a gist comment
   * @see https://docs.github.com/rest/gists/comments#get-a-gist-comment
   */
  getComment: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<GistComment>;

  /**
   * Update a gist comment
   * @see https://docs.github.com/rest/gists/comments#update-a-gist-comment
   */
  updateComment: (input: {
    /** The comment text. */
    body: string;
    /** The unique identifier of the gist. */
    gist_id: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<GistComment>;

  /**
   * Delete a gist comment
   * @see https://docs.github.com/rest/gists/comments#delete-a-gist-comment
   */
  deleteComment: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<BasicError>;

  /**
   * List gist commits
   * @see https://docs.github.com/rest/gists/gists#list-gist-commits
   */
  listCommits: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(GistCommit)[]>;

  /**
   * List gist forks
   * @see https://docs.github.com/rest/gists/gists#list-gist-forks
   */
  listForks: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(GistSimple)[]>;

  /**
   * Fork a gist
   * @see https://docs.github.com/rest/gists/gists#fork-a-gist
   */
  fork: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
  }) => Promise<BaseGist>;

  /**
   * Check if a gist is starred
   * @see https://docs.github.com/rest/gists/gists#check-if-a-gist-is-starred
   */
  checkIsStarred: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
  }) => Promise<BasicError>;

  /**
   * Star a gist
   * @see https://docs.github.com/rest/gists/gists#star-a-gist
   */
  star: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
  }) => Promise<BasicError>;

  /**
   * Unstar a gist
   * @see https://docs.github.com/rest/gists/gists#unstar-a-gist
   */
  unstar: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
  }) => Promise<BasicError>;

  /**
   * Get a gist revision
   * @see https://docs.github.com/rest/gists/gists#get-a-gist-revision
   */
  getRevision: (input: {
    /** The unique identifier of the gist. */
    gist_id: string;
    sha: string;
  }) => Promise<GistSimple>;

  /**
   * List gists for a user
   * @see https://docs.github.com/rest/gists/gists#list-gists-for-a-user
   */
  listForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(BaseGist)[]>;
};
