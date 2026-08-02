# LiveChatMessages

3 operations · `utdk/google/youtube`

```ts
import youtube from "utdk/google/youtube";
```

## `youtube.youtubeLiveChatMessagesDelete`

Deletes a chat message. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeLiveChatMessagesDelete(input: {
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
  id: string;
}): Promise<unknown>
```

<sub>`DELETE /youtube/v3/liveChat/messages` · `youtube.liveChatMessages.delete`</sub>

## `youtube.youtubeLiveChatMessagesList`

Retrieves a list of resources, possibly filtered. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeLiveChatMessagesList(input: {
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
  /** The id of the live chat for which comments should be returned. */
  liveChatId: string;
  /** The *part* parameter specifies the liveChatComment resource parts that the API response will include. Supported values are id and snippet. */
  part: (string)[];
  /** Specifies the localization language in which the system messages should be returned. */
  hl?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken property identify other pages that could be retrieved. */
  pageToken?: string;
  /** Specifies the size of the profile image that should be returned for each user. */
  profileImageSize?: number;
}): Promise<LiveChatMessageListResponse>
```

<sub>`GET /youtube/v3/liveChat/messages` · `youtube.liveChatMessages.list`</sub>

## `youtube.youtubeLiveChatMessagesInsert`

Inserts a new resource into this collection. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeLiveChatMessagesInsert(input: {
  /** The authorDetails object contains basic details about the user that posted this message. */
  authorDetails?: LiveChatMessageAuthorDetails;
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube assigns to uniquely identify the message. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatMessage". */
  kind?: string;
  /** The snippet object contains basic details about the message. */
  snippet?: LiveChatMessageSnippet;
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
  /** The *part* parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the parameter value to snippet. */
  part: (string)[];
}): Promise<LiveChatMessage>
```

<sub>`POST /youtube/v3/liveChat/messages` · `youtube.liveChatMessages.insert`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
