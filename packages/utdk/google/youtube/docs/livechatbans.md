# LiveChatBans

2 operations · `utdk/google/youtube`

```ts
import youtube from "utdk/google/youtube";
```

## `youtube.youtubeLiveChatBansDelete`

Deletes a chat ban. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeLiveChatBansDelete(input: {
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

<sub>`DELETE /youtube/v3/liveChat/bans` · `youtube.liveChatBans.delete`</sub>

## `youtube.youtubeLiveChatBansInsert`

Inserts a new resource into this collection. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeLiveChatBansInsert(input: {
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube assigns to uniquely identify the ban. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"youtube#liveChatBan"`. */
  kind?: string;
  /** The `snippet` object contains basic details about the ban. */
  snippet?: LiveChatBanSnippet;
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
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response returns. Set the parameter value to snippet. */
  part: (string)[];
}): Promise<LiveChatBan>
```

<sub>`POST /youtube/v3/liveChat/bans` · `youtube.liveChatBans.insert`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
