# ThirdPartyLinks

4 operations · `utdk/google/youtube`

```ts
import youtube from "utdk/google/youtube";
```

## `youtube.youtubeThirdPartyLinksDelete`

Deletes a resource. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeThirdPartyLinksDelete(input: {
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
  /** Delete the partner links with the given linking token. */
  linkingToken: string;
  /** Type of the link to be deleted. */
  type: "linkUnspecified" | "channelToStoreLink";
  /** Channel ID to which changes should be applied, for delegation. */
  externalChannelId?: string;
  /** Do not use. Required for compatibility. */
  part?: (string)[];
}): Promise<unknown>
```

<sub>`DELETE /youtube/v3/thirdPartyLinks` · `youtube.thirdPartyLinks.delete`</sub>

## `youtube.youtubeThirdPartyLinksList`

Retrieves a list of resources, possibly filtered. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeThirdPartyLinksList(input: {
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
  /** The *part* parameter specifies the thirdPartyLink resource parts that the API response will include. Supported values are linkingToken, status, and snippet. */
  part: (string)[];
  /** Channel ID to which changes should be applied, for delegation. */
  externalChannelId?: string;
  /** Get a third party link with the given linking token. */
  linkingToken?: string;
  /** Get a third party link of the given type. */
  type?: "linkUnspecified" | "channelToStoreLink";
}): Promise<ThirdPartyLinkListResponse>
```

<sub>`GET /youtube/v3/thirdPartyLinks` · `youtube.thirdPartyLinks.list`</sub>

## `youtube.youtubeThirdPartyLinksInsert`

Inserts a new resource into this collection. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeThirdPartyLinksInsert(input: {
  /** Etag of this resource */
  etag?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#thirdPartyLink". */
  kind?: string;
  /** The linking_token identifies a YouTube account and channel with which the third party account is linked. */
  linkingToken?: string;
  /** The snippet object contains basic details about the third- party account link. */
  snippet?: ThirdPartyLinkSnippet;
  /** The status object contains information about the status of the link. */
  status?: ThirdPartyLinkStatus;
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
  /** The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet. */
  part: (string)[];
  /** Channel ID to which changes should be applied, for delegation. */
  externalChannelId?: string;
}): Promise<ThirdPartyLink>
```

<sub>`POST /youtube/v3/thirdPartyLinks` · `youtube.thirdPartyLinks.insert`</sub>

## `youtube.youtubeThirdPartyLinksUpdate`

Updates an existing resource. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeThirdPartyLinksUpdate(input: {
  /** Etag of this resource */
  etag?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#thirdPartyLink". */
  kind?: string;
  /** The linking_token identifies a YouTube account and channel with which the third party account is linked. */
  linkingToken?: string;
  /** The snippet object contains basic details about the third- party account link. */
  snippet?: ThirdPartyLinkSnippet;
  /** The status object contains information about the status of the link. */
  status?: ThirdPartyLinkStatus;
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
  /** The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet. */
  part: (string)[];
  /** Channel ID to which changes should be applied, for delegation. */
  externalChannelId?: string;
}): Promise<ThirdPartyLink>
```

<sub>`PUT /youtube/v3/thirdPartyLinks` · `youtube.thirdPartyLinks.update`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
