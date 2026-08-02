# Mylibrary

14 operations · `utdk/google/books`

```ts
import books from "utdk/google/books";
```

## `books.booksMylibraryAnnotationsList`

Retrieves a list of annotations, possibly filtered. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryAnnotationsList(input: {
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
  /** The content version for the requested volume. */
  contentVersion?: string;
  /** The layer ID to limit annotation by. */
  layerId?: string;
  /** The layer ID(s) to limit annotation by. */
  layerIds?: (string)[];
  /** Maximum number of results to return */
  maxResults?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false. */
  showDeleted?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
  updatedMax?: string;
  /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
  updatedMin?: string;
  /** The volume to restrict annotations to. */
  volumeId?: string;
}): Promise<Annotations>
```

<sub>`GET /books/v1/mylibrary/annotations` · `books.mylibrary.annotations.list`</sub>

## `books.booksMylibraryAnnotationsInsert`

Inserts a new annotation. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryAnnotationsInsert(input: {
  /** Anchor text after excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
  afterSelectedText?: string;
  /** Anchor text before excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
  beforeSelectedText?: string;
  /** Selection ranges sent from the client. */
  clientVersionRanges?: { cfiRange?: BooksAnnotationsRange; contentVersion?: string; gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange; imageCfiRange?: BooksAnnotationsRange };
  /** Timestamp for the created time of this annotation. */
  created?: string;
  /** Selection ranges for the most recent content version. */
  currentVersionRanges?: { cfiRange?: BooksAnnotationsRange; contentVersion?: string; gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange; imageCfiRange?: BooksAnnotationsRange };
  /** User-created data for this annotation. */
  data?: string;
  /** Indicates that this annotation is deleted. */
  deleted?: boolean;
  /** The highlight style for this annotation. */
  highlightStyle?: string;
  /** Id of this annotation, in the form of a GUID. */
  id?: string;
  /** Resource type. */
  kind?: string;
  /** The layer this annotation is for. */
  layerId?: string;
  layerSummary?: { allowedCharacterCount?: number; limitType?: string; remainingCharacterCount?: number };
  /** Pages that this annotation spans. */
  pageIds?: (string)[];
  /** Excerpt from the volume. */
  selectedText?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Timestamp for the last time this annotation was modified. */
  updated?: string;
  /** The volume that this annotation belongs to. */
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
  /** The ID for the annotation to insert. */
  annotationId?: string;
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** Requests that only the summary of the specified layer be provided in the response. */
  showOnlySummaryInResponse?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Annotation>
```

<sub>`POST /books/v1/mylibrary/annotations` · `books.mylibrary.annotations.insert`</sub>

## `books.booksMylibraryAnnotationsDelete`

Deletes an annotation. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryAnnotationsDelete(input: {
  /** The ID for the annotation to delete. */
  annotationId: string;
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
}): Promise<Empty>
```

<sub>`DELETE /books/v1/mylibrary/annotations/{annotationId}` · `books.mylibrary.annotations.delete`</sub>

## `books.booksMylibraryAnnotationsUpdate`

Updates an existing annotation. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryAnnotationsUpdate(input: {
  /** Anchor text after excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
  afterSelectedText?: string;
  /** Anchor text before excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
  beforeSelectedText?: string;
  /** Selection ranges sent from the client. */
  clientVersionRanges?: { cfiRange?: BooksAnnotationsRange; contentVersion?: string; gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange; imageCfiRange?: BooksAnnotationsRange };
  /** Timestamp for the created time of this annotation. */
  created?: string;
  /** Selection ranges for the most recent content version. */
  currentVersionRanges?: { cfiRange?: BooksAnnotationsRange; contentVersion?: string; gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange; imageCfiRange?: BooksAnnotationsRange };
  /** User-created data for this annotation. */
  data?: string;
  /** Indicates that this annotation is deleted. */
  deleted?: boolean;
  /** The highlight style for this annotation. */
  highlightStyle?: string;
  /** Id of this annotation, in the form of a GUID. */
  id?: string;
  /** Resource type. */
  kind?: string;
  /** The layer this annotation is for. */
  layerId?: string;
  layerSummary?: { allowedCharacterCount?: number; limitType?: string; remainingCharacterCount?: number };
  /** Pages that this annotation spans. */
  pageIds?: (string)[];
  /** Excerpt from the volume. */
  selectedText?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Timestamp for the last time this annotation was modified. */
  updated?: string;
  /** The volume that this annotation belongs to. */
  volumeId?: string;
  /** The ID for the annotation to update. */
  annotationId: string;
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
}): Promise<Annotation>
```

<sub>`PUT /books/v1/mylibrary/annotations/{annotationId}` · `books.mylibrary.annotations.update`</sub>

## `books.booksMylibraryAnnotationsSummary`

Gets the summary of specified layers. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryAnnotationsSummary(input: {
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
  /** Array of layer IDs to get the summary for. */
  layerIds: (string)[];
  /** Volume id to get the summary for. */
  volumeId: string;
}): Promise<AnnotationsSummary>
```

<sub>`POST /books/v1/mylibrary/annotations/summary` · `books.mylibrary.annotations.summary`</sub>

## `books.booksMylibraryBookshelvesList`

Retrieves a list of bookshelves belonging to the authenticated user. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryBookshelvesList(input: {
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

<sub>`GET /books/v1/mylibrary/bookshelves` · `books.mylibrary.bookshelves.list`</sub>

## `books.booksMylibraryBookshelvesGet`

Retrieves metadata for a specific bookshelf belonging to the authenticated user. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryBookshelvesGet(input: {
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

<sub>`GET /books/v1/mylibrary/bookshelves/{shelf}` · `books.mylibrary.bookshelves.get`</sub>

## `books.booksMylibraryBookshelvesAddVolume`

Adds a volume to a bookshelf. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryBookshelvesAddVolume(input: {
  /** ID of bookshelf to which to add a volume. */
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
  /** ID of volume to add. */
  volumeId: string;
  /** The reason for which the book is added to the library. */
  reason?: "REASON_UNDEFINED" | "IOS_PREX" | "IOS_SEARCH" | "ONBOARDING";
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Empty>
```

<sub>`POST /books/v1/mylibrary/bookshelves/{shelf}/addVolume` · `books.mylibrary.bookshelves.addVolume`</sub>

## `books.booksMylibraryBookshelvesClearVolumes`

Clears all volumes from a bookshelf. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryBookshelvesClearVolumes(input: {
  /** ID of bookshelf from which to remove a volume. */
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
}): Promise<Empty>
```

<sub>`POST /books/v1/mylibrary/bookshelves/{shelf}/clearVolumes` · `books.mylibrary.bookshelves.clearVolumes`</sub>

## `books.booksMylibraryBookshelvesMoveVolume`

Moves a volume within a bookshelf. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryBookshelvesMoveVolume(input: {
  /** ID of bookshelf with the volume. */
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
  /** ID of volume to move. */
  volumeId: string;
  /** Position on shelf to move the item (0 puts the item before the current first item, 1 puts it between the first and the second and so on.) */
  volumePosition: number;
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Empty>
```

<sub>`POST /books/v1/mylibrary/bookshelves/{shelf}/moveVolume` · `books.mylibrary.bookshelves.moveVolume`</sub>

## `books.booksMylibraryBookshelvesRemoveVolume`

Removes a volume from a bookshelf. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryBookshelvesRemoveVolume(input: {
  /** ID of bookshelf from which to remove a volume. */
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
  /** ID of volume to remove. */
  volumeId: string;
  /** The reason for which the book is removed from the library. */
  reason?: "REASON_UNDEFINED" | "ONBOARDING";
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Empty>
```

<sub>`POST /books/v1/mylibrary/bookshelves/{shelf}/removeVolume` · `books.mylibrary.bookshelves.removeVolume`</sub>

## `books.booksMylibraryBookshelvesVolumesList`

Gets volume information for volumes on a bookshelf. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryBookshelvesVolumesList(input: {
  /** The bookshelf ID or name retrieve volumes for. */
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
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** Restrict information returned to a set of selected fields. */
  projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE";
  /** Full-text search query string in this bookshelf. */
  q?: string;
  /** Set to true to show pre-ordered books. Defaults to false. */
  showPreorders?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** Index of the first element to return (starts at 0) */
  startIndex?: number;
}): Promise<Volumes>
```

<sub>`GET /books/v1/mylibrary/bookshelves/{shelf}/volumes` · `books.mylibrary.bookshelves.volumes.list`</sub>

## `books.booksMylibraryReadingpositionsGet`

Retrieves my reading position information for a volume. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryReadingpositionsGet(input: {
  /** ID of volume for which to retrieve a reading position. */
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
  /** Volume content version for which this reading position is requested. */
  contentVersion?: string;
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<ReadingPosition>
```

<sub>`GET /books/v1/mylibrary/readingpositions/{volumeId}` · `books.mylibrary.readingpositions.get`</sub>

## `books.booksMylibraryReadingpositionsSetPosition`

Sets my reading position information for a volume. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMylibraryReadingpositionsSetPosition(input: {
  /** ID of volume for which to update the reading position. */
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
  /** Position string for the new volume reading position. */
  position: string;
  /** RFC 3339 UTC format timestamp associated with this reading position. */
  timestamp: string;
  /** Action that caused this reading position to be set. */
  action?: "ACTION_UNDEFINED" | "bookmark" | "chapter" | "next-page" | "prev-page" | "scroll" | "search";
  /** Volume content version for which this reading position applies. */
  contentVersion?: string;
  /** Random persistent device cookie optional on set position. */
  deviceCookie?: string;
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Empty>
```

<sub>`POST /books/v1/mylibrary/readingpositions/{volumeId}/setPosition` · `books.mylibrary.readingpositions.setPosition`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
