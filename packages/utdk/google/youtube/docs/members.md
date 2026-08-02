# Members

1 operation · `utdk/google/youtube`

```ts
import youtube from "utdk/google/youtube";
```

## `youtube.youtubeMembersList`

Retrieves a list of members that match the request criteria for a channel. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeMembersList(input: {
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
  /** The *part* parameter specifies the member resource parts that the API response will include. Set the parameter value to snippet. */
  part: (string)[];
  /** Comma separated list of channel IDs. Only data about members that are part of this list will be included in the response. */
  filterByMemberChannelId?: string;
  /** Filter members in the results set to the ones that have access to a level. */
  hasAccessToLevel?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** Parameter that specifies which channel members to return. */
  mode?: "listMembersModeUnknown" | "updates" | "all_current";
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
}): Promise<MemberListResponse>
```

<sub>`GET /youtube/v3/members` · `youtube.members.list`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
