# Layers

6 operations · `utdk/google/books`

```ts
import books from "utdk/google/books";
```

## `books.booksLayersVolumeAnnotationsList`

Gets the volume annotations for a volume and layer. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksLayersVolumeAnnotationsList(input: {
  /** The volume to retrieve annotations for. */
  volumeId: string;
  /** The ID for the layer to get the annotations. */
  layerId: string;
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
  contentVersion: string;
  /** The end offset to end retrieving data from. */
  endOffset?: string;
  /** The end position to end retrieving data from. */
  endPosition?: string;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false. */
  showDeleted?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** The start offset to start retrieving data from. */
  startOffset?: string;
  /** The start position to start retrieving data from. */
  startPosition?: string;
  /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
  updatedMax?: string;
  /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
  updatedMin?: string;
  /** The version of the volume annotations that you are requesting. */
  volumeAnnotationsVersion?: string;
}): Promise<Volumeannotations>
```

<sub>`GET /books/v1/volumes/{volumeId}/layers/{layerId}` · `books.layers.volumeAnnotations.list`</sub>

## `books.booksLayersVolumeAnnotationsGet`

Gets the volume annotation. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksLayersVolumeAnnotationsGet(input: {
  /** The volume to retrieve annotations for. */
  volumeId: string;
  /** The ID for the layer to get the annotations. */
  layerId: string;
  /** The ID of the volume annotation to retrieve. */
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
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Volumeannotation>
```

<sub>`GET /books/v1/volumes/{volumeId}/layers/{layerId}/annotations/{annotationId}` · `books.layers.volumeAnnotations.get`</sub>

## `books.booksLayersAnnotationDataList`

Gets the annotation data for a volume and layer. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksLayersAnnotationDataList(input: {
  /** The volume to retrieve annotation data for. */
  volumeId: string;
  /** The ID for the layer to get the annotation data. */
  layerId: string;
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
  contentVersion: string;
  /** The list of Annotation Data Ids to retrieve. Pagination is ignored if this is set. */
  annotationDataId?: (string)[];
  /** The requested pixel height for any images. If height is provided width must also be provided. */
  h?: number;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** The requested scale for the image. */
  scale?: number;
  /** String to identify the originator of this request. */
  source?: string;
  /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
  updatedMax?: string;
  /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
  updatedMin?: string;
  /** The requested pixel width for any images. If width is provided height must also be provided. */
  w?: number;
}): Promise<Annotationsdata>
```

<sub>`GET /books/v1/volumes/{volumeId}/layers/{layerId}/data` · `books.layers.annotationData.list`</sub>

## `books.booksLayersAnnotationDataGet`

Gets the annotation data. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksLayersAnnotationDataGet(input: {
  /** The volume to retrieve annotations for. */
  volumeId: string;
  /** The ID for the layer to get the annotations. */
  layerId: string;
  /** The ID of the annotation data to retrieve. */
  annotationDataId: string;
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
  /** The content version for the volume you are trying to retrieve. */
  contentVersion: string;
  /** For the dictionary layer. Whether or not to allow web definitions. */
  allowWebDefinitions?: boolean;
  /** The requested pixel height for any images. If height is provided width must also be provided. */
  h?: number;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** The requested scale for the image. */
  scale?: number;
  /** String to identify the originator of this request. */
  source?: string;
  /** The requested pixel width for any images. If width is provided height must also be provided. */
  w?: number;
}): Promise<DictionaryAnnotationdata>
```

<sub>`GET /books/v1/volumes/{volumeId}/layers/{layerId}/data/{annotationDataId}` · `books.layers.annotationData.get`</sub>

## `books.booksLayersList`

List the layer summaries for a volume. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksLayersList(input: {
  /** The volume to retrieve layers for. */
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
  /** The content version for the requested volume. */
  contentVersion?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Layersummaries>
```

<sub>`GET /books/v1/volumes/{volumeId}/layersummary` · `books.layers.list`</sub>

## `books.booksLayersGet`

Gets the layer summary for a volume. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksLayersGet(input: {
  /** The volume to retrieve layers for. */
  volumeId: string;
  /** The ID for the layer to get the summary for. */
  summaryId: string;
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
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<Layersummary>
```

<sub>`GET /books/v1/volumes/{volumeId}/layersummary/{summaryId}` · `books.layers.get`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
