# Search

7 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.search.code`

Search code — [API reference](https://docs.github.com/rest/search/search#search-code)

```ts
github.search.code(input: {
  /** The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/search/search#constructing-a-search-query). See "[Searching code](https://docs.github.com/search-github/searching-on-github/searching-code)" for a detailed list of qualifiers. */
  q: string;
  /** **This field is closing down.** Sorts the results of your query. Can only be `indexed`, which indicates how recently a file has been indexed by the GitHub search infrastructure. Default: [best match](https://docs.github.com/rest/search/search#ranking-search-results) */
  sort?: "indexed";
  /** **This field is closing down.** Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`.  */
  order?: "desc" | "asc";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; incomplete_results: boolean; items: (CodeSearchResultItem)[] }>
```

<sub>`GET /search/code` · `search/code`</sub>

## `github.search.commits`

Search commits — [API reference](https://docs.github.com/rest/search/search#search-commits)

```ts
github.search.commits(input: {
  /** The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/search/search#constructing-a-search-query). See "[Searching commits](https://docs.github.com/search-github/searching-on-github/searching-commits)" for a detailed list of qualifiers. */
  q: string;
  /** Sorts the results of your query by `author-date` or `committer-date`. Default: [best match](https://docs.github.com/rest/search/search#ranking-search-results) */
  sort?: "author-date" | "committer-date";
  /** Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`. */
  order?: "desc" | "asc";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; incomplete_results: boolean; items: (CommitSearchResultItem)[] }>
```

<sub>`GET /search/commits` · `search/commits`</sub>

## `github.search.issuesAndPullRequests`

Search issues and pull requests — [API reference](https://docs.github.com/rest/search/search#search-issues-and-pull-requests)

```ts
github.search.issuesAndPullRequests(input: {
  /** The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/search/search#constructing-a-search-query). See "[Searching issues and pull requests](https://docs.github.com/search-github/searching-on-github/searching-issues-and-pull-requests)" for a detailed list of qualifiers. */
  q: string;
  /** Sorts the results of your query by the number of `comments`, `reactions`, `reactions-+1`, `reactions--1`, `reactions-smile`, `reactions-thinking_face`, `reactions-heart`, `reactions-tada`, or `interactions`. You can also sort results by how recently the items were `created` or `updated`, Default: [best match](https://docs.github.com/rest/search/search#ranking-search-results) */
  sort?: "comments" | "reactions" | "reactions-+1" | "reactions--1" | "reactions-smile" | "reactions-thinking_face" | "reactions-heart" | "reactions-tada" | "interactions" | "created" | "updated";
  /** Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`. */
  order?: "desc" | "asc";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** Set to `true` to use advanced search. Example: `http://api.github.com/search/issues?q={query}&advanced_search=true` */
  advanced_search?: string;
  /** The type of search to perform on issues. When not specified, the default is lexical search.  - `semantic` — performs a pure semantic (vector) search using embedding-based understanding. - `hybrid` — combines semantic search with lexical search for best results.  Semantic and hybrid search require authentication and are rate limited to 10 requests per minute. Only applies to issue searches (`/search/issues`). */
  search_type?: "semantic" | "hybrid";
}): Promise<{ total_count: number; incomplete_results: boolean; items: (IssueSearchResultItem)[]; search_type: "lexical" | "semantic" | "hybrid"; lexical_fallback_reason?: ("no_text_terms" | "quoted_text" | "non_issue_target" | "or_boolean_not_supported" | "no_accessible_repos" | "server_error" | "only_non_semantic_fields_requested" | "service_unavailable")[] }>
```

<sub>`GET /search/issues` · `search/issues-and-pull-requests`</sub>

## `github.search.labels`

Search labels — [API reference](https://docs.github.com/rest/search/search#search-labels)

```ts
github.search.labels(input: {
  /** The id of the repository. */
  repository_id: number;
  /** The search keywords. This endpoint does not accept qualifiers in the query. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/search/search#constructing-a-search-query). */
  q: string;
  /** Sorts the results of your query by when the label was `created` or `updated`. Default: [best match](https://docs.github.com/rest/search/search#ranking-search-results) */
  sort?: "created" | "updated";
  /** Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`. */
  order?: "desc" | "asc";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; incomplete_results: boolean; items: (LabelSearchResultItem)[] }>
```

<sub>`GET /search/labels` · `search/labels`</sub>

## `github.search.repos`

Search repositories — [API reference](https://docs.github.com/rest/search/search#search-repositories)

```ts
github.search.repos(input: {
  /** The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/search/search#constructing-a-search-query). See "[Searching for repositories](https://docs.github.com/articles/searching-for-repositories/)" for a detailed list of qualifiers. */
  q: string;
  /** Sorts the results of your query by number of `stars`, `forks`, or `help-wanted-issues` or how recently the items were `updated`. Default: [best match](https://docs.github.com/rest/search/search#ranking-search-results) */
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated";
  /** Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`. */
  order?: "desc" | "asc";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; incomplete_results: boolean; items: (RepoSearchResultItem)[] }>
```

<sub>`GET /search/repositories` · `search/repos`</sub>

## `github.search.topics`

Search topics — [API reference](https://docs.github.com/rest/search/search#search-topics)

```ts
github.search.topics(input: {
  /** The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/search/search#constructing-a-search-query). */
  q: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; incomplete_results: boolean; items: (TopicSearchResultItem)[] }>
```

<sub>`GET /search/topics` · `search/topics`</sub>

## `github.search.users`

Search users — [API reference](https://docs.github.com/rest/search/search#search-users)

```ts
github.search.users(input: {
  /** The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/search/search#constructing-a-search-query). See "[Searching users](https://docs.github.com/search-github/searching-on-github/searching-users)" for a detailed list of qualifiers. */
  q: string;
  /** Sorts the results of your query by number of `followers` or `repositories`, or when the person `joined` GitHub. Default: [best match](https://docs.github.com/rest/search/search#ranking-search-results) */
  sort?: "followers" | "repositories" | "joined";
  /** Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`. */
  order?: "desc" | "asc";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; incomplete_results: boolean; items: (UserSearchResultItem)[] }>
```

<sub>`GET /search/users` · `search/users`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
