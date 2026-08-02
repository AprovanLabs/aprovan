# Cloudloading

3 operations · `utdk/google/books`

```ts
import books from "utdk/google/books";
```

## `books.booksCloudloadingAddBook`

Add a user-upload volume and triggers processing. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksCloudloadingAddBook(input: {
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
  /** A drive document id. The upload_client_token must not be set. */
  drive_document_id?: string;
  /** The document MIME type. It can be set only if the drive_document_id is set. */
  mime_type?: string;
  /** The document name. It can be set only if the drive_document_id is set. */
  name?: string;
  /** Scotty upload token. */
  upload_client_token?: string;
}): Promise<BooksCloudloadingResource>
```

<sub>`POST /books/v1/cloudloading/addBook` · `books.cloudloading.addBook`</sub>

## `books.booksCloudloadingDeleteBook`

Remove the book and its contents — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksCloudloadingDeleteBook(input: {
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
  /** The id of the book to be removed. */
  volumeId: string;
}): Promise<Empty>
```

<sub>`POST /books/v1/cloudloading/deleteBook` · `books.cloudloading.deleteBook`</sub>

## `books.booksCloudloadingUpdateBook`

Updates a user-upload volume. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksCloudloadingUpdateBook(input: {
  author?: string;
  processingState?: string;
  title?: string;
  volumeId?: string;
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
}): Promise<BooksCloudloadingResource>
```

<sub>`POST /books/v1/cloudloading/updateBook` · `books.cloudloading.updateBook`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
