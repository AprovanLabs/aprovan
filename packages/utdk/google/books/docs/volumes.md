# Volumes

7 operations · `utdk/google/books`

```ts
import books from "utdk/google/books";
```

## `books.booksVolumesList`

Performs a book search. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksVolumesList(input: {
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
  /** Full-text search query string. */
  q: string;
  /** Restrict to volumes by download availability. */
  download?: "DOWNLOAD_UNDEFINED" | "EPUB";
  /** Filter search results. */
  filter?: "FILTER_UNDEFINED" | "ebooks" | "free-ebooks" | "full" | "paid-ebooks" | "partial";
  /** Restrict results to books with this language code. */
  langRestrict?: string;
  /** Restrict search to this user's library. */
  libraryRestrict?: "LIBRARY_RESTRICT_UNDEFINED" | "my-library" | "no-restrict";
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Sort search results. */
  orderBy?: "ORDER_BY_UNDEFINED" | "newest" | "relevance";
  /** Restrict and brand results for partner ID. */
  partner?: string;
  /** Restrict to books or magazines. */
  printType?: "PRINT_TYPE_UNDEFINED" | "ALL" | "BOOKS" | "MAGAZINES";
  /** Restrict information returned to a set of selected fields. */
  projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE";
  /** Set to true to show books available for preorder. Defaults to false. */
  showPreorders?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** Index of the first result to return (starts at 0) */
  startIndex?: number;
}): Promise<Volumes>
```

<sub>`GET /books/v1/volumes` · `books.volumes.list`</sub>

## `books.booksVolumesGet`

Gets volume information for a single volume. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksVolumesGet(input: {
  /** ID of volume to retrieve. */
  volumeId: string;
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
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** Set to true to include non-comics series. Defaults to false. */
  includeNonComicsSeries?: boolean;
  /** Brand results for partner ID. */
  partner?: string;
  /** Restrict information returned to a set of selected fields. */
  projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE";
  /** string to identify the originator of this request. */
  source?: string;
  user_library_consistent_read?: boolean;
}): Promise<Volume>
```

<sub>`GET /books/v1/volumes/{volumeId}` · `books.volumes.get`</sub>

## `books.booksVolumesAssociatedList`

Return a list of associated books. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksVolumesAssociatedList(input: {
  /** ID of the source volume. */
  volumeId: string;
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
  /** Association type. */
  association?: "ASSOCIATION_UNDEFINED" | "end-of-sample" | "end-of-volume" | "related-for-play";
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Volumes>
```

<sub>`GET /books/v1/volumes/{volumeId}/associated` · `books.volumes.associated.list`</sub>

## `books.booksVolumesMybooksList`

Return a list of books in My Library. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksVolumesMybooksList(input: {
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
  /** How the book was acquired */
  acquireMethod?: ("ACQUIRE_METHOD_UNDEFINED" | "FAMILY_SHARED" | "PREORDERED" | "PREVIOUSLY_RENTED" | "PUBLIC_DOMAIN" | "PURCHASED" | "RENTED" | "SAMPLE" | "UPLOADED")[];
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** ISO-639-1 language and ISO-3166-1 country code. Ex:'en_US'. Used for generating recommendations. */
  locale?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** The processing state of the user uploaded volumes to be returned. Applicable only if the UPLOADED is specified in the acquireMethod. */
  processingState?: ("PROCESSING_STATE_UNDEFINED" | "COMPLETED_FAILED" | "COMPLETED_SUCCESS" | "RUNNING")[];
  /** String to identify the originator of this request. */
  source?: string;
  /** Index of the first result to return (starts at 0) */
  startIndex?: number;
}): Promise<Volumes>
```

<sub>`GET /books/v1/volumes/mybooks` · `books.volumes.mybooks.list`</sub>

## `books.booksVolumesRecommendedList`

Return a list of recommended books for the current user. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksVolumesRecommendedList(input: {
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
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Volumes>
```

<sub>`GET /books/v1/volumes/recommended` · `books.volumes.recommended.list`</sub>

## `books.booksVolumesRecommendedRate`

Rate a recommended book for the current user. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksVolumesRecommendedRate(input: {
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
  /** Rating to be given to the volume. */
  rating: "RATING_UNDEFINED" | "HAVE_IT" | "NOT_INTERESTED";
  /** ID of the source volume. */
  volumeId: string;
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<BooksVolumesRecommendedRateResponse>
```

<sub>`POST /books/v1/volumes/recommended/rate` · `books.volumes.recommended.rate`</sub>

## `books.booksVolumesUseruploadedList`

Return a list of books uploaded by the current user. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksVolumesUseruploadedList(input: {
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
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** The processing state of the user uploaded volumes to be returned. */
  processingState?: ("PROCESSING_STATE_UNDEFINED" | "COMPLETED_FAILED" | "COMPLETED_SUCCESS" | "RUNNING")[];
  /** String to identify the originator of this request. */
  source?: string;
  /** Index of the first result to return (starts at 0) */
  startIndex?: number;
  /** The ids of the volumes to be returned. If not specified all that match the processingState are returned. */
  volumeId?: (string)[];
}): Promise<Volumes>
```

<sub>`GET /books/v1/volumes/useruploaded` · `books.volumes.useruploaded.list`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
