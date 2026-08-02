# Channels

2 operations · `utdk/google/youtube`

```ts
import youtube from "utdk/google/youtube";
```

## `youtube.youtubeChannelsList`

Retrieves a list of resources, possibly filtered. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeChannelsList(input: {
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
  /** The *part* parameter specifies a comma-separated list of one or more channel resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channel resource, the contentDetails property contains other properties, such as the uploads properties. As such, if you set *part=contentDetails*, the API response will also contain all of those nested properties. */
  part: (string)[];
  /** Return the channels within the specified guide category ID. */
  categoryId?: string;
  /** Return the channel associated with a YouTube username. */
  forUsername?: string;
  /** Stands for "host language". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX). */
  hl?: string;
  /** Return the channels with the specified IDs. */
  id?: (string)[];
  /** Return the channels managed by the authenticated user. */
  managedByMe?: boolean;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** Return the ids of channels owned by the authenticated user. */
  mine?: boolean;
  /** Return the channels subscribed to the authenticated user */
  mySubscribers?: boolean;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
}): Promise<ChannelListResponse>
```

<sub>`GET /youtube/v3/channels` · `youtube.channels.list`</sub>

## `youtube.youtubeChannelsUpdate`

Updates an existing resource. — [Provider docs](https://developers.google.com/youtube/)

```ts
youtube.youtubeChannelsUpdate(input: {
  /** The auditionDetails object encapsulates channel data that is relevant for YouTube Partners during the audition process. */
  auditDetails?: ChannelAuditDetails;
  /** The brandingSettings object encapsulates information about the branding of the channel. */
  brandingSettings?: ChannelBrandingSettings;
  /** The contentDetails object encapsulates information about the channel's content. */
  contentDetails?: ChannelContentDetails;
  /** The contentOwnerDetails object encapsulates channel data that is relevant for YouTube Partners linked with the channel. */
  contentOwnerDetails?: ChannelContentOwnerDetails;
  /** The conversionPings object encapsulates information about conversion pings that need to be respected by the channel. */
  conversionPings?: ChannelConversionPings;
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube uses to uniquely identify the channel. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#channel". */
  kind?: string;
  /** Localizations for different languages */
  localizations?: { [key: string]: ChannelLocalization | undefined };
  /** The snippet object contains basic details about the channel, such as its title, description, and thumbnail images. */
  snippet?: ChannelSnippet;
  /** The statistics object encapsulates statistics for the channel. */
  statistics?: ChannelStatistics;
  /** The status object encapsulates information about the privacy status of the channel. */
  status?: ChannelStatus;
  /** The topicDetails object encapsulates information about Freebase topics associated with the channel. */
  topicDetails?: ChannelTopicDetails;
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
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The API currently only allows the parameter value to be set to either brandingSettings or invideoPromotion. (You cannot update both of those parts with a single request.) Note that this method overrides the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. */
  part: (string)[];
  /** The *onBehalfOfContentOwner* parameter indicates that the authenticated user is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with needs to be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}): Promise<Channel>
```

<sub>`PUT /youtube/v3/channels` · `youtube.channels.update`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
