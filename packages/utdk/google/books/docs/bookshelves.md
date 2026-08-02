# Bookshelves

3 operations · `utdk/google/books`

```ts
import books from "utdk/google/books";
```

## `books.booksBookshelvesList`

Retrieves a list of public bookshelves for the specified user. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksBookshelvesList(input: {
  /** ID of user for whom to retrieve bookshelves. */
  userId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Bookshelves>
```

<sub>`GET /books/v1/users/{userId}/bookshelves` · `books.bookshelves.list`</sub>

## `books.booksBookshelvesGet`

Retrieves metadata for a specific bookshelf for the specified user. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksBookshelvesGet(input: {
  /** ID of user for whom to retrieve bookshelves. */
  userId: string;
  /** ID of bookshelf to retrieve. */
  shelf: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Bookshelf>
```

<sub>`GET /books/v1/users/{userId}/bookshelves/{shelf}` · `books.bookshelves.get`</sub>

## `books.booksBookshelvesVolumesList`

Retrieves volumes in a specific bookshelf for the specified user. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksBookshelvesVolumesList(input: {
  /** ID of user for whom to retrieve bookshelf volumes. */
  userId: string;
  /** ID of bookshelf to retrieve volumes. */
  shelf: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** Set to true to show pre-ordered books. Defaults to false. */
  showPreorders?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** Index of the first element to return (starts at 0) */
  startIndex?: number;
}): Promise<Volumes>
```

<sub>`GET /books/v1/users/{userId}/bookshelves/{shelf}/volumes` · `books.bookshelves.volumes.list`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
