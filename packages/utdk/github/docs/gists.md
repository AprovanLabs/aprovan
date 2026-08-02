# Gists

20 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.gists.list`

List gists for the authenticated user — [API reference](https://docs.github.com/rest/gists/gists#list-gists-for-the-authenticated-user)

```ts
github.gists.list(input: {
  /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(BaseGist)[]>
```

<sub>`GET /gists` · `gists/list`</sub>

## `github.gists.create`

Create a gist — [API reference](https://docs.github.com/rest/gists/gists#create-a-gist)

```ts
github.gists.create(input: {
  /** Description of the gist */
  description?: string;
  /** Names and content for the files that make up the gist */
  files: { [key: string]: { content: string } | undefined };
  public?: boolean | "true" | "false";
}): Promise<GistSimple>
```

<sub>`POST /gists` · `gists/create`</sub>

## `github.gists.delete`

Delete a gist — [API reference](https://docs.github.com/rest/gists/gists#delete-a-gist)

```ts
github.gists.delete(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
}): Promise<BasicError>
```

<sub>`DELETE /gists/{gist_id}` · `gists/delete`</sub>

## `github.gists.get`

Get a gist — [API reference](https://docs.github.com/rest/gists/gists#get-a-gist)

```ts
github.gists.get(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
}): Promise<GistSimple>
```

<sub>`GET /gists/{gist_id}` · `gists/get`</sub>

## `github.gists.update`

Update a gist — [API reference](https://docs.github.com/rest/gists/gists#update-a-gist)

```ts
github.gists.update(input: {
  /** The description of the gist. */
  description?: string;
  /** The gist files to be updated, renamed, or deleted. Each `key` must match the current filename (including extension) of the targeted gist file. For example: `hello.py`.  To delete a file, set the whole file to null. For example: `hello.py : null`. The file will also be deleted if the specified object does not contain at least one of `content` or `filename`. */
  files?: { [key: string]: { content?: string; filename?: string | null } | null | undefined };
  /** The unique identifier of the gist. */
  gist_id: string;
}): Promise<GistSimple>
```

<sub>`PATCH /gists/{gist_id}` · `gists/update`</sub>

## `github.gists.getRevision`

Get a gist revision — [API reference](https://docs.github.com/rest/gists/gists#get-a-gist-revision)

```ts
github.gists.getRevision(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
  sha: string;
}): Promise<GistSimple>
```

<sub>`GET /gists/{gist_id}/{sha}` · `gists/get-revision`</sub>

## `github.gists.listComments`

List gist comments — [API reference](https://docs.github.com/rest/gists/comments#list-gist-comments)

```ts
github.gists.listComments(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(GistComment)[]>
```

<sub>`GET /gists/{gist_id}/comments` · `gists/list-comments`</sub>

## `github.gists.createComment`

Create a gist comment — [API reference](https://docs.github.com/rest/gists/comments#create-a-gist-comment)

```ts
github.gists.createComment(input: {
  /** The comment text. */
  body: string;
  /** The unique identifier of the gist. */
  gist_id: string;
}): Promise<GistComment>
```

<sub>`POST /gists/{gist_id}/comments` · `gists/create-comment`</sub>

## `github.gists.deleteComment`

Delete a gist comment — [API reference](https://docs.github.com/rest/gists/comments#delete-a-gist-comment)

```ts
github.gists.deleteComment(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /gists/{gist_id}/comments/{comment_id}` · `gists/delete-comment`</sub>

## `github.gists.getComment`

Get a gist comment — [API reference](https://docs.github.com/rest/gists/comments#get-a-gist-comment)

```ts
github.gists.getComment(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<GistComment>
```

<sub>`GET /gists/{gist_id}/comments/{comment_id}` · `gists/get-comment`</sub>

## `github.gists.updateComment`

Update a gist comment — [API reference](https://docs.github.com/rest/gists/comments#update-a-gist-comment)

```ts
github.gists.updateComment(input: {
  /** The comment text. */
  body: string;
  /** The unique identifier of the gist. */
  gist_id: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<GistComment>
```

<sub>`PATCH /gists/{gist_id}/comments/{comment_id}` · `gists/update-comment`</sub>

## `github.gists.listCommits`

List gist commits — [API reference](https://docs.github.com/rest/gists/gists#list-gist-commits)

```ts
github.gists.listCommits(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(GistCommit)[]>
```

<sub>`GET /gists/{gist_id}/commits` · `gists/list-commits`</sub>

## `github.gists.listForks`

List gist forks — [API reference](https://docs.github.com/rest/gists/gists#list-gist-forks)

```ts
github.gists.listForks(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(GistSimple)[]>
```

<sub>`GET /gists/{gist_id}/forks` · `gists/list-forks`</sub>

## `github.gists.fork`

Fork a gist — [API reference](https://docs.github.com/rest/gists/gists#fork-a-gist)

```ts
github.gists.fork(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
}): Promise<BaseGist>
```

<sub>`POST /gists/{gist_id}/forks` · `gists/fork`</sub>

## `github.gists.unstar`

Unstar a gist — [API reference](https://docs.github.com/rest/gists/gists#unstar-a-gist)

```ts
github.gists.unstar(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
}): Promise<BasicError>
```

<sub>`DELETE /gists/{gist_id}/star` · `gists/unstar`</sub>

## `github.gists.checkIsStarred`

Check if a gist is starred — [API reference](https://docs.github.com/rest/gists/gists#check-if-a-gist-is-starred)

```ts
github.gists.checkIsStarred(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
}): Promise<BasicError>
```

<sub>`GET /gists/{gist_id}/star` · `gists/check-is-starred`</sub>

## `github.gists.star`

Star a gist — [API reference](https://docs.github.com/rest/gists/gists#star-a-gist)

```ts
github.gists.star(input: {
  /** The unique identifier of the gist. */
  gist_id: string;
}): Promise<BasicError>
```

<sub>`PUT /gists/{gist_id}/star` · `gists/star`</sub>

## `github.gists.listPublic`

List public gists — [API reference](https://docs.github.com/rest/gists/gists#list-public-gists)

```ts
github.gists.listPublic(input: {
  /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(BaseGist)[]>
```

<sub>`GET /gists/public` · `gists/list-public`</sub>

## `github.gists.listStarred`

List starred gists — [API reference](https://docs.github.com/rest/gists/gists#list-starred-gists)

```ts
github.gists.listStarred(input: {
  /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(BaseGist)[]>
```

<sub>`GET /gists/starred` · `gists/list-starred`</sub>

## `github.gists.listForUser`

List gists for a user — [API reference](https://docs.github.com/rest/gists/gists#list-gists-for-a-user)

```ts
github.gists.listForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(BaseGist)[]>
```

<sub>`GET /users/{username}/gists` · `gists/list-for-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
