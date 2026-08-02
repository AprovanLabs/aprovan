# CommentThreads

2 operations · `utdk/google/youtube`

```ts
import youtube from "utdk/google/youtube";
```

## `youtube.youtubeCommentThreadsList`

Retrieves a list of resources, possibly filtered. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeCommentThreadsList(input: {
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
  /** The *part* parameter specifies a comma-separated list of one or more commentThread resource properties that the API response will include. */
  part: (string)[];
  /** Returns the comment threads of all videos of the channel and the channel comments as well. */
  allThreadsRelatedToChannelId?: string;
  /** Returns the comment threads for all the channel comments (ie does not include comments left on videos). */
  channelId?: string;
  /** Returns the comment threads with the given IDs for Stubby or Apiary. */
  id?: (string)[];
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** Limits the returned comment threads to those with the specified moderation status. Not compatible with the 'id' filter. Valid values: published, heldForReview, likelySpam. */
  moderationStatus?: "published" | "heldForReview" | "likelySpam" | "rejected";
  order?: "orderUnspecified" | "time" | "relevance";
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** Limits the returned comment threads to those matching the specified key words. Not compatible with the 'id' filter. */
  searchTerms?: string;
  /** The requested text format for the returned comments. */
  textFormat?: "textFormatUnspecified" | "html" | "plainText";
  /** Returns the comment threads of the specified video. */
  videoId?: string;
}): Promise<CommentThreadListResponse>
```

<sub>`GET /youtube/v3/commentThreads` · `youtube.commentThreads.list`</sub>

## `youtube.youtubeCommentThreadsInsert`

Inserts a new resource into this collection. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeCommentThreadsInsert(input: {
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube uses to uniquely identify the comment thread. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#commentThread". */
  kind?: string;
  /** The replies object contains a limited number of replies (if any) to the top level comment found in the snippet. */
  replies?: CommentThreadReplies;
  /** The snippet object contains basic details about the comment thread and also the top level comment. */
  snippet?: CommentThreadSnippet;
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
  /** The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units. */
  part: (string)[];
}): Promise<CommentThread>
```

<sub>`POST /youtube/v3/commentThreads` · `youtube.commentThreads.insert`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
