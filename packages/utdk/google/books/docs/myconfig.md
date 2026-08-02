# Myconfig

5 operations · `utdk/google/books`

```ts
import books from "utdk/google/books";
```

## `books.booksMyconfigGetUserSettings`

Gets the current settings for the user. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMyconfigGetUserSettings(input: {
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
  /** Unused. Added only to workaround TEX mandatory request template requirement */
  country?: string;
}): Promise<Usersettings>
```

<sub>`GET /books/v1/myconfig/getUserSettings` · `books.myconfig.getUserSettings`</sub>

## `books.booksMyconfigReleaseDownloadAccess`

Release downloaded content access restriction. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMyconfigReleaseDownloadAccess(input: {
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
  /** The device/version ID from which to release the restriction. */
  cpksver: string;
  /** The volume(s) to release restrictions for. */
  volumeIds: (string)[];
  /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
  locale?: string;
  /** String to identify the originator of this request. */
  source?: string;
}): Promise<DownloadAccesses>
```

<sub>`POST /books/v1/myconfig/releaseDownloadAccess` · `books.myconfig.releaseDownloadAccess`</sub>

## `books.booksMyconfigRequestAccess`

Request concurrent and download access restrictions. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMyconfigRequestAccess(input: {
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
  /** The device/version ID from which to request the restrictions. */
  cpksver: string;
  /** The client nonce value. */
  nonce: string;
  /** String to identify the originator of this request. */
  source: string;
  /** The volume to request concurrent/download restrictions for. */
  volumeId: string;
  /** The type of access license to request. If not specified, the default is BOTH. */
  licenseTypes?: "LICENSE_TYPES_UNDEFINED" | "BOTH" | "CONCURRENT" | "DOWNLOAD";
  /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
  locale?: string;
}): Promise<RequestAccessData>
```

<sub>`POST /books/v1/myconfig/requestAccess` · `books.myconfig.requestAccess`</sub>

## `books.booksMyconfigSyncVolumeLicenses`

Request downloaded content access for specified volumes on the My eBooks shelf. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMyconfigSyncVolumeLicenses(input: {
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
  /** The device/version ID from which to release the restriction. */
  cpksver: string;
  /** The client nonce value. */
  nonce: string;
  /** String to identify the originator of this request. */
  source: string;
  /** List of features supported by the client, i.e., 'RENTALS' */
  features?: ("FEATURES_UNDEFINED" | "RENTALS")[];
  /** Set to true to include non-comics series. Defaults to false. */
  includeNonComicsSeries?: boolean;
  /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
  locale?: string;
  /** Set to true to show pre-ordered books. Defaults to false. */
  showPreorders?: boolean;
  /** The volume(s) to request download restrictions for. */
  volumeIds?: (string)[];
}): Promise<Volumes>
```

<sub>`POST /books/v1/myconfig/syncVolumeLicenses` · `books.myconfig.syncVolumeLicenses`</sub>

## `books.booksMyconfigUpdateUserSettings`

Sets the settings for the user. If a sub-object is specified, it will overwrite the existing sub-object stored in the server. Unspecified sub-objects will retain the existing value. — [Provider docs](https://code.google.com/apis/books/docs/v1/getting_started.html)

```ts
books.booksMyconfigUpdateUserSettings(input: {
  /** Resource type. */
  kind?: string;
  /** User settings in sub-objects, each for different purposes. */
  notesExport?: { folderName?: string; isEnabled?: boolean };
  notification?: { matchMyInterests?: { opted_state?: string }; moreFromAuthors?: { opted_state?: string }; moreFromSeries?: { opted_state?: string }; priceDrop?: { opted_state?: string }; rewardExpirations?: { opted_state?: string } };
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
}): Promise<Usersettings>
```

<sub>`POST /books/v1/myconfig/updateUserSettings` · `books.myconfig.updateUserSettings`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
