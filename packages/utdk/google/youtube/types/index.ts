import type { AbuseReport, AbuseType, ActivityListResponse, Caption, CaptionListResponse, CaptionSnippet, CdnSettings, Channel, ChannelAuditDetails, ChannelBannerResource, ChannelBrandingSettings, ChannelContentDetails, ChannelContentOwnerDetails, ChannelConversionPings, ChannelListResponse, ChannelLocalization, ChannelSection, ChannelSectionContentDetails, ChannelSectionListResponse, ChannelSectionLocalization, ChannelSectionSnippet, ChannelSectionTargeting, ChannelSnippet, ChannelStatistics, ChannelStatus, ChannelTopicDetails, Comment, CommentListResponse, CommentSnippet, CommentThread, CommentThreadListResponse, CommentThreadReplies, CommentThreadSnippet, Cuepoint, Entity, I18NLanguageListResponse, I18NRegionListResponse, InvideoPosition, InvideoTiming, LiveBroadcast, LiveBroadcastContentDetails, LiveBroadcastListResponse, LiveBroadcastSnippet, LiveBroadcastStatistics, LiveBroadcastStatus, LiveChatBan, LiveChatBanSnippet, LiveChatMessage, LiveChatMessageAuthorDetails, LiveChatMessageListResponse, LiveChatMessageSnippet, LiveChatModerator, LiveChatModeratorListResponse, LiveChatModeratorSnippet, LiveStream, LiveStreamContentDetails, LiveStreamListResponse, LiveStreamSnippet, LiveStreamStatus, MemberListResponse, MembershipsLevelListResponse, Playlist, PlaylistContentDetails, PlaylistItem, PlaylistItemContentDetails, PlaylistItemListResponse, PlaylistItemSnippet, PlaylistItemStatus, PlaylistListResponse, PlaylistLocalization, PlaylistPlayer, PlaylistSnippet, PlaylistStatus, RelatedEntity, SearchListResponse, Subscription, SubscriptionContentDetails, SubscriptionListResponse, SubscriptionSnippet, SubscriptionSubscriberSnippet, SuperChatEventListResponse, TestItem, TestItemTestItemSnippet, ThirdPartyLink, ThirdPartyLinkListResponse, ThirdPartyLinkSnippet, ThirdPartyLinkStatus, ThumbnailSetResponse, Video, VideoAbuseReportReasonListResponse, VideoAgeGating, VideoCategoryListResponse, VideoContentDetails, VideoFileDetails, VideoGetRatingResponse, VideoListResponse, VideoLiveStreamingDetails, VideoLocalization, VideoMonetizationDetails, VideoPlayer, VideoProcessingDetails, VideoProjectDetails, VideoRecordingDetails, VideoSnippet, VideoStatistics, VideoStatus, VideoSuggestions, VideoTopicDetails } from "./schemas.js";

export type GoogleYoutubeClient = {
  /**
   * Inserts a new resource into this collection.
   */
  youtubeAbuseReportsInsert: (input: {
    abuseTypes?: (AbuseType)[];
    description?: string;
    relatedEntities?: (RelatedEntity)[];
    subject?: Entity;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
    part: (string)[];
  }) => Promise<AbuseReport>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeActivitiesList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more activity resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in an activity resource, the snippet property contains other properties that identify the type of activity, a display title for the activity, and so forth. If you set *part=snippet*, the API response will also contain all of those nested properties. */
    part: (string)[];
    channelId?: string;
    home?: boolean;
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
    maxResults?: number;
    mine?: boolean;
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
    pageToken?: string;
    publishedAfter?: string;
    publishedBefore?: string;
    regionCode?: string;
  }) => Promise<ActivityListResponse>;

  /**
   * Deletes a resource.
   */
  youtubeCaptionsDelete: (input: {
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
    /** ID of the Google+ Page for the channel that the request is be on behalf of */
    onBehalfOf?: string;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeCaptionsList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the parameter value are id and snippet. */
    part: (string)[];
    /** Returns the captions for the specified video. */
    videoId: string;
    /** Returns the captions with the given IDs for Stubby or Apiary. */
    id?: (string)[];
    /** ID of the Google+ Page for the channel that the request is on behalf of. */
    onBehalfOf?: string;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<CaptionListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeCaptionsInsert: (input: {
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the caption track. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#caption". */
    kind?: string;
    /** The snippet object contains basic details about the caption. */
    snippet?: CaptionSnippet;
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
    /** The *part* parameter specifies the caption resource parts that the API response will include. Set the parameter value to snippet. */
    part: (string)[];
    /** ID of the Google+ Page for the channel that the request is be on behalf of */
    onBehalfOf?: string;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio. */
    sync?: boolean;
  }) => Promise<Caption>;

  /**
   * Updates an existing resource.
   */
  youtubeCaptionsUpdate: (input: {
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the caption track. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#caption". */
    kind?: string;
    /** The snippet object contains basic details about the caption. */
    snippet?: CaptionSnippet;
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
    /** The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the parameter value are id and snippet. */
    part: (string)[];
    /** ID of the Google+ Page for the channel that the request is on behalf of. */
    onBehalfOf?: string;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio. */
    sync?: boolean;
  }) => Promise<Caption>;

  /**
   * Downloads a caption track.
   */
  youtubeCaptionsDownload: (input: {
    /** The ID of the caption track to download, required for One Platform. */
    id: string;
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
    /** ID of the Google+ Page for the channel that the request is be on behalf of */
    onBehalfOf?: string;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** Convert the captions into this format. Supported options are sbv, srt, and vtt. */
    tfmt?: string;
    /** tlang is the language code; machine translate the captions into this language. */
    tlang?: string;
  }) => Promise<unknown>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeChannelBannersInsert: (input: {
    etag?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelBannerResource". */
    kind?: string;
    /** The URL of this banner image. */
    url?: string;
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
    /** Unused, channel_id is currently derived from the security context of the requestor. */
    channelId?: string;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
  }) => Promise<ChannelBannerResource>;

  /**
   * Deletes a resource.
   */
  youtubeChannelSectionsDelete: (input: {
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
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeChannelSectionsList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more channelSection resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, and contentDetails. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channelSection resource, the snippet property contains other properties, such as a display title for the channelSection. If you set *part=snippet*, the API response will also contain all of those nested properties. */
    part: (string)[];
    /** Return the ChannelSections owned by the specified channel ID. */
    channelId?: string;
    /** Return content in specified language */
    hl?: string;
    /** Return the ChannelSections with the given IDs for Stubby or Apiary. */
    id?: (string)[];
    /** Return the ChannelSections owned by the authenticated user. */
    mine?: boolean;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<ChannelSectionListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeChannelSectionsInsert: (input: {
    /** The contentDetails object contains details about the channel section content, such as a list of playlists or channels featured in the section. */
    contentDetails?: ChannelSectionContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the channel section. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelSection". */
    kind?: string;
    /** Localizations for different languages */
    localizations?: { [key: string]: ChannelSectionLocalization | undefined };
    /** The snippet object contains basic details about the channel section, such as its type, style and title. */
    snippet?: ChannelSectionSnippet;
    /** The targeting object contains basic targeting settings about the channel section. */
    targeting?: ChannelSectionTargeting;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
  }) => Promise<ChannelSection>;

  /**
   * Updates an existing resource.
   */
  youtubeChannelSectionsUpdate: (input: {
    /** The contentDetails object contains details about the channel section content, such as a list of playlists or channels featured in the section. */
    contentDetails?: ChannelSectionContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the channel section. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelSection". */
    kind?: string;
    /** Localizations for different languages */
    localizations?: { [key: string]: ChannelSectionLocalization | undefined };
    /** The snippet object contains basic details about the channel section, such as its type, style and title. */
    snippet?: ChannelSectionSnippet;
    /** The targeting object contains basic targeting settings about the channel section. */
    targeting?: ChannelSectionTargeting;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<ChannelSection>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeChannelsList: (input: {
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
  }) => Promise<ChannelListResponse>;

  /**
   * Updates an existing resource.
   */
  youtubeChannelsUpdate: (input: {
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
  }) => Promise<Channel>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeCommentThreadsList: (input: {
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
  }) => Promise<CommentThreadListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeCommentThreadsInsert: (input: {
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
  }) => Promise<CommentThread>;

  /**
   * Updates an existing resource.
   */
  youtubeYoutubeV3UpdateCommentThreads: (input: {
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
    /** The *part* parameter specifies a comma-separated list of commentThread resource properties that the API response will include. You must at least include the snippet part in the parameter value since that part contains all of the properties that the API request can update. */
    part?: (string)[];
  }) => Promise<CommentThread>;

  /**
   * Deletes a resource.
   */
  youtubeCommentsDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeCommentsList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more comment resource properties that the API response will include. */
    part: (string)[];
    /** Returns the comments with the given IDs for One Platform. */
    id?: (string)[];
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
    maxResults?: number;
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
    pageToken?: string;
    /** Returns replies to the specified comment. Note, currently YouTube features only one level of replies (ie replies to top level comments). However replies to replies may be supported in the future. */
    parentId?: string;
    /** The requested text format for the returned comments. */
    textFormat?: "textFormatUnspecified" | "html" | "plainText";
  }) => Promise<CommentListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeCommentsInsert: (input: {
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the comment. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#comment". */
    kind?: string;
    /** The snippet object contains basic details about the comment. */
    snippet?: CommentSnippet;
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
  }) => Promise<Comment>;

  /**
   * Updates an existing resource.
   */
  youtubeCommentsUpdate: (input: {
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the comment. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#comment". */
    kind?: string;
    /** The snippet object contains basic details about the comment. */
    snippet?: CommentSnippet;
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
    /** The *part* parameter identifies the properties that the API response will include. You must at least include the snippet part in the parameter value since that part contains all of the properties that the API request can update. */
    part: (string)[];
  }) => Promise<Comment>;

  /**
   * Expresses the caller's opinion that one or more comments should be flagged as spam.
   */
  youtubeCommentsMarkAsSpam: (input: {
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
    /** Flags the comments with the given IDs as spam in the caller's opinion. */
    id: (string)[];
  }) => Promise<unknown>;

  /**
   * Sets the moderation status of one or more comments.
   */
  youtubeCommentsSetModerationStatus: (input: {
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
    /** Modifies the moderation status of the comments with the given IDs */
    id: (string)[];
    /** Specifies the requested moderation status. Note, comments can be in statuses, which are not available through this call. For example, this call does not allow to mark a comment as 'likely spam'. Valid values: MODERATION_STATUS_PUBLISHED, MODERATION_STATUS_HELD_FOR_REVIEW, MODERATION_STATUS_REJECTED. */
    moderationStatus: "published" | "heldForReview" | "likelySpam" | "rejected";
    /** If set to true the author of the comment gets added to the ban list. This means all future comments of the author will autmomatically be rejected. Only valid in combination with STATUS_REJECTED. */
    banAuthor?: boolean;
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeI18NLanguagesList: (input: {
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
    /** The *part* parameter specifies the i18nLanguage resource properties that the API response will include. Set the parameter value to snippet. */
    part: (string)[];
    hl?: string;
  }) => Promise<I18NLanguageListResponse>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeI18NRegionsList: (input: {
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
    /** The *part* parameter specifies the i18nRegion resource properties that the API response will include. Set the parameter value to snippet. */
    part: (string)[];
    hl?: string;
  }) => Promise<I18NRegionListResponse>;

  /**
   * Delete a given broadcast.
   */
  youtubeLiveBroadcastsDelete: (input: {
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
    /** Broadcast to delete. */
    id: string;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
  }) => Promise<unknown>;

  /**
   * Retrieve the list of broadcasts associated with the given channel.
   */
  youtubeLiveBroadcastsList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, status and statistics. */
    part: (string)[];
    /** Return broadcasts with a certain status, e.g. active broadcasts. */
    broadcastStatus?: "broadcastStatusFilterUnspecified" | "all" | "active" | "upcoming" | "completed";
    /** Return only broadcasts with the selected type. */
    broadcastType?: "broadcastTypeFilterUnspecified" | "all" | "event" | "persistent";
    /** Return broadcasts with the given ids from Stubby or Apiary. */
    id?: (string)[];
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
    maxResults?: number;
    mine?: boolean;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
    pageToken?: string;
  }) => Promise<LiveBroadcastListResponse>;

  /**
   * Inserts a new stream for the authenticated user.
   */
  youtubeLiveBroadcastsInsert: (input: {
    /** The contentDetails object contains information about the event's video content, such as whether the content can be shown in an embedded video player or if it will be archived and therefore available for viewing after the event has concluded. */
    contentDetails?: LiveBroadcastContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube assigns to uniquely identify the broadcast. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcast". */
    kind?: string;
    /** The snippet object contains basic details about the event, including its title, description, start time, and end time. */
    snippet?: LiveBroadcastSnippet;
    /** The statistics object contains info about the event's current stats. These include concurrent viewers and total chat count. Statistics can change (in either direction) during the lifetime of an event. Statistics are only returned while the event is live. */
    statistics?: LiveBroadcastStatistics;
    /** The status object contains information about the event's status. */
    status?: LiveBroadcastStatus;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
  }) => Promise<LiveBroadcast>;

  /**
   * Updates an existing broadcast for the authenticated user.
   */
  youtubeLiveBroadcastsUpdate: (input: {
    /** The contentDetails object contains information about the event's video content, such as whether the content can be shown in an embedded video player or if it will be archived and therefore available for viewing after the event has concluded. */
    contentDetails?: LiveBroadcastContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube assigns to uniquely identify the broadcast. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcast". */
    kind?: string;
    /** The snippet object contains basic details about the event, including its title, description, start time, and end time. */
    snippet?: LiveBroadcastSnippet;
    /** The statistics object contains info about the event's current stats. These include concurrent viewers and total chat count. Statistics can change (in either direction) during the lifetime of an event. Statistics are only returned while the event is live. */
    statistics?: LiveBroadcastStatistics;
    /** The status object contains information about the event's status. */
    status?: LiveBroadcastStatus;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a broadcast's privacy status is defined in the status part. As such, if your request is updating a private or unlisted broadcast, and the request's part parameter value includes the status part, the broadcast's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the broadcast will revert to the default privacy setting. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
  }) => Promise<LiveBroadcast>;

  /**
   * Bind a broadcast to a stream.
   */
  youtubeLiveBroadcastsBind: (input: {
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
    /** Broadcast to bind to the stream */
    id: string;
    /** The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
    /** Stream to bind, if not set unbind the current one. */
    streamId?: string;
  }) => Promise<LiveBroadcast>;

  /**
   * Insert cuepoints in a broadcast
   */
  youtubeLiveBroadcastsInsertCuepoint: (input: {
    cueType?: "cueTypeUnspecified" | "cueTypeAd";
    /** The duration of this cuepoint. */
    durationSecs?: number;
    etag?: string;
    /** The identifier for cuepoint resource. */
    id?: string;
    /** The time when the cuepoint should be inserted by offset to the broadcast actual start time. */
    insertionOffsetTimeMs?: string;
    /** The wall clock time at which the cuepoint should be inserted. Only one of insertion_offset_time_ms and walltime_ms may be set at a time. */
    walltimeMs?: string;
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
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
    /** The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status. */
    part?: (string)[];
  }, options?: { query?: { id?: string } }) => Promise<Cuepoint>;

  /**
   * Transition a broadcast to a given status.
   */
  youtubeLiveBroadcastsTransition: (input: {
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
    /** The status to which the broadcast is going to transition. */
    broadcastStatus: "statusUnspecified" | "testing" | "live" | "complete";
    /** Broadcast to transition. */
    id: string;
    /** The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
  }) => Promise<LiveBroadcast>;

  /**
   * Deletes a chat ban.
   */
  youtubeLiveChatBansDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeLiveChatBansInsert: (input: {
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
  }) => Promise<LiveChatBan>;

  /**
   * Deletes a chat message.
   */
  youtubeLiveChatMessagesDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeLiveChatMessagesList: (input: {
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
  }) => Promise<LiveChatMessageListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeLiveChatMessagesInsert: (input: {
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
  }) => Promise<LiveChatMessage>;

  /**
   * Deletes a chat moderator.
   */
  youtubeLiveChatModeratorsDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeLiveChatModeratorsList: (input: {
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
    /** The id of the live chat for which moderators should be returned. */
    liveChatId: string;
    /** The *part* parameter specifies the liveChatModerator resource parts that the API response will include. Supported values are id and snippet. */
    part: (string)[];
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
    maxResults?: number;
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
    pageToken?: string;
  }) => Promise<LiveChatModeratorListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeLiveChatModeratorsInsert: (input: {
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube assigns to uniquely identify the moderator. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModerator". */
    kind?: string;
    /** The snippet object contains basic details about the moderator. */
    snippet?: LiveChatModeratorSnippet;
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
  }) => Promise<LiveChatModerator>;

  /**
   * Deletes an existing stream for the authenticated user.
   */
  youtubeLiveStreamsDelete: (input: {
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
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
  }) => Promise<unknown>;

  /**
   * Retrieve the list of streams associated with the given channel. --
   */
  youtubeLiveStreamsList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more liveStream resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, cdn, and status. */
    part: (string)[];
    /** Return LiveStreams with the given ids from Stubby or Apiary. */
    id?: (string)[];
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
    maxResults?: number;
    mine?: boolean;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
    pageToken?: string;
  }) => Promise<LiveStreamListResponse>;

  /**
   * Inserts a new stream for the authenticated user.
   */
  youtubeLiveStreamsInsert: (input: {
    /** The cdn object defines the live stream's content delivery network (CDN) settings. These settings provide details about the manner in which you stream your content to YouTube. */
    cdn?: CdnSettings;
    /** The content_details object contains information about the stream, including the closed captions ingestion URL. */
    contentDetails?: LiveStreamContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube assigns to uniquely identify the stream. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveStream". */
    kind?: string;
    /** The snippet object contains basic details about the stream, including its channel, title, and description. */
    snippet?: LiveStreamSnippet;
    /** The status object contains information about live stream's status. */
    status?: LiveStreamStatus;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, cdn, content_details, and status. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
  }) => Promise<LiveStream>;

  /**
   * Updates an existing stream for the authenticated user.
   */
  youtubeLiveStreamsUpdate: (input: {
    /** The cdn object defines the live stream's content delivery network (CDN) settings. These settings provide details about the manner in which you stream your content to YouTube. */
    cdn?: CdnSettings;
    /** The content_details object contains information about the stream, including the closed captions ingestion URL. */
    contentDetails?: LiveStreamContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube assigns to uniquely identify the stream. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveStream". */
    kind?: string;
    /** The snippet object contains basic details about the stream, including its channel, title, and description. */
    snippet?: LiveStreamSnippet;
    /** The status object contains information about live stream's status. */
    status?: LiveStreamStatus;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, cdn, and status. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. If the request body does not specify a value for a mutable property, the existing value for that property will be removed. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
  }) => Promise<LiveStream>;

  /**
   * Retrieves a list of members that match the request criteria for a channel.
   */
  youtubeMembersList: (input: {
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
  }) => Promise<MemberListResponse>;

  /**
   * Retrieves a list of all pricing levels offered by a creator to the fans.
   */
  youtubeMembershipsLevelsList: (input: {
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
    /** The *part* parameter specifies the membershipsLevel resource parts that the API response will include. Supported values are id and snippet. */
    part: (string)[];
  }) => Promise<MembershipsLevelListResponse>;

  /**
   * Deletes a resource.
   */
  youtubePlaylistItemsDelete: (input: {
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
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubePlaylistItemsList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more playlistItem resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlistItem resource, the snippet property contains numerous fields, including the title, description, position, and resourceId properties. As such, if you set *part=snippet*, the API response will contain all of those properties. */
    part: (string)[];
    id?: (string)[];
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
    maxResults?: number;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
    pageToken?: string;
    /** Return the playlist items within the given playlist. */
    playlistId?: string;
    /** Return the playlist items associated with the given video ID. */
    videoId?: string;
  }) => Promise<PlaylistItemListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubePlaylistItemsInsert: (input: {
    /** The contentDetails object is included in the resource if the included item is a YouTube video. The object contains additional information about the video. */
    contentDetails?: PlaylistItemContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the playlist item. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItem". */
    kind?: string;
    /** The snippet object contains basic details about the playlist item, such as its title and position in the playlist. */
    snippet?: PlaylistItemSnippet;
    /** The status object contains information about the playlist item's privacy status. */
    status?: PlaylistItemStatus;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<PlaylistItem>;

  /**
   * Updates an existing resource.
   */
  youtubePlaylistItemsUpdate: (input: {
    /** The contentDetails object is included in the resource if the included item is a YouTube video. The object contains additional information about the video. */
    contentDetails?: PlaylistItemContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the playlist item. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItem". */
    kind?: string;
    /** The snippet object contains basic details about the playlist item, such as its title and position in the playlist. */
    snippet?: PlaylistItemSnippet;
    /** The status object contains information about the playlist item's privacy status. */
    status?: PlaylistItemStatus;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a playlist item can specify a start time and end time, which identify the times portion of the video that should play when users watch the video in the playlist. If your request is updating a playlist item that sets these values, and the request's part parameter value includes the contentDetails part, the playlist item's start and end times will be updated to whatever value the request body specifies. If the request body does not specify values, the existing start and end times will be removed and replaced with the default settings. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<PlaylistItem>;

  /**
   * Deletes a resource.
   */
  youtubePlaylistsDelete: (input: {
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
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubePlaylistsList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more playlist resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlist resource, the snippet property contains properties like author, title, description, tags, and timeCreated. As such, if you set *part=snippet*, the API response will contain all of those properties. */
    part: (string)[];
    /** Return the playlists owned by the specified channel ID. */
    channelId?: string;
    /** Return content in specified language */
    hl?: string;
    /** Return the playlists with the given IDs for Stubby or Apiary. */
    id?: (string)[];
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
    maxResults?: number;
    /** Return the playlists owned by the authenticated user. */
    mine?: boolean;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
    pageToken?: string;
  }) => Promise<PlaylistListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubePlaylistsInsert: (input: {
    /** The contentDetails object contains information like video count. */
    contentDetails?: PlaylistContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the playlist. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlist". */
    kind?: string;
    /** Localizations for different languages */
    localizations?: { [key: string]: PlaylistLocalization | undefined };
    /** The player object contains information that you would use to play the playlist in an embedded player. */
    player?: PlaylistPlayer;
    /** The snippet object contains basic details about the playlist, such as its title and description. */
    snippet?: PlaylistSnippet;
    /** The status object contains status information for the playlist. */
    status?: PlaylistStatus;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
  }) => Promise<Playlist>;

  /**
   * Updates an existing resource.
   */
  youtubePlaylistsUpdate: (input: {
    /** The contentDetails object contains information like video count. */
    contentDetails?: PlaylistContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the playlist. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlist". */
    kind?: string;
    /** Localizations for different languages */
    localizations?: { [key: string]: PlaylistLocalization | undefined };
    /** The player object contains information that you would use to play the playlist in an embedded player. */
    player?: PlaylistPlayer;
    /** The snippet object contains basic details about the playlist, such as its title and description. */
    snippet?: PlaylistSnippet;
    /** The status object contains status information for the playlist. */
    status?: PlaylistStatus;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for mutable properties that are contained in any parts that the request body specifies. For example, a playlist's description is contained in the snippet part, which must be included in the request body. If the request does not specify a value for the snippet.description property, the playlist's existing description will be deleted. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<Playlist>;

  /**
   * Retrieves a list of search resources
   */
  youtubeSearchList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet. */
    part: (string)[];
    /** Filter on resources belonging to this channelId. */
    channelId?: string;
    /** Add a filter on the channel search. */
    channelType?: "channelTypeUnspecified" | "any" | "show";
    /** Filter on the livestream status of the videos. */
    eventType?: "none" | "upcoming" | "live" | "completed";
    /** Search owned by a content owner. */
    forContentOwner?: boolean;
    /** Restrict the search to only retrieve videos uploaded using the project id of the authenticated user. */
    forDeveloper?: boolean;
    /** Search for the private videos of the authenticated user. */
    forMine?: boolean;
    /** Filter on location of the video */
    location?: string;
    /** Filter on distance from the location (specified above). */
    locationRadius?: string;
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
    maxResults?: number;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** Sort order of the results. */
    order?: "searchSortUnspecified" | "date" | "rating" | "viewCount" | "relevance" | "title" | "videoCount";
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
    pageToken?: string;
    /** Filter on resources published after this date. */
    publishedAfter?: string;
    /** Filter on resources published before this date. */
    publishedBefore?: string;
    /** Textual search terms to match. */
    q?: string;
    /** Display the content as seen by viewers in this country. */
    regionCode?: string;
    /** Search related to a resource. */
    relatedToVideoId?: string;
    /** Return results relevant to this language. */
    relevanceLanguage?: string;
    /** Indicates whether the search results should include restricted content as well as standard content. */
    safeSearch?: "safeSearchSettingUnspecified" | "none" | "moderate" | "strict";
    /** Restrict results to a particular topic. */
    topicId?: string;
    /** Restrict results to a particular set of resource types from One Platform. */
    type?: (string)[];
    /** Filter on the presence of captions on the videos. */
    videoCaption?: "videoCaptionUnspecified" | "any" | "closedCaption" | "none";
    /** Filter on videos in a specific category. */
    videoCategoryId?: string;
    /** Filter on the definition of the videos. */
    videoDefinition?: "any" | "standard" | "high";
    /** Filter on 3d videos. */
    videoDimension?: "any" | "2d" | "3d";
    /** Filter on the duration of the videos. */
    videoDuration?: "videoDurationUnspecified" | "any" | "short" | "medium" | "long";
    /** Filter on embeddable videos. */
    videoEmbeddable?: "videoEmbeddableUnspecified" | "any" | "true";
    /** Filter on the license of the videos. */
    videoLicense?: "any" | "youtube" | "creativeCommon";
    /** Filter on syndicated videos. */
    videoSyndicated?: "videoSyndicatedUnspecified" | "any" | "true";
    /** Filter on videos of a specific type. */
    videoType?: "videoTypeUnspecified" | "any" | "movie" | "episode";
  }) => Promise<SearchListResponse>;

  /**
   * Deletes a resource.
   */
  youtubeSubscriptionsDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeSubscriptionsList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more subscription resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a subscription resource, the snippet property contains other properties, such as a display title for the subscription. If you set *part=snippet*, the API response will also contain all of those nested properties. */
    part: (string)[];
    /** Return the subscriptions of the given channel owner. */
    channelId?: string;
    /** Return the subscriptions to the subset of these channels that the authenticated user is subscribed to. */
    forChannelId?: string;
    /** Return the subscriptions with the given IDs for Stubby or Apiary. */
    id?: (string)[];
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
    maxResults?: number;
    /** Flag for returning the subscriptions of the authenticated user. */
    mine?: boolean;
    myRecentSubscribers?: boolean;
    /** Return the subscribers of the given channel owner. */
    mySubscribers?: boolean;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
    /** The order of the returned subscriptions */
    order?: "subscriptionOrderUnspecified" | "relevance" | "unread" | "alphabetical";
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
    pageToken?: string;
  }) => Promise<SubscriptionListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeSubscriptionsInsert: (input: {
    /** The contentDetails object contains basic statistics about the subscription. */
    contentDetails?: SubscriptionContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The ID that YouTube uses to uniquely identify the subscription. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#subscription". */
    kind?: string;
    /** The snippet object contains basic details about the subscription, including its title and the channel that the user subscribed to. */
    snippet?: SubscriptionSnippet;
    /** The subscriberSnippet object contains basic details about the subscriber. */
    subscriberSnippet?: SubscriptionSubscriberSnippet;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
    part: (string)[];
  }) => Promise<Subscription>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeSuperChatEventsList: (input: {
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
    /** The *part* parameter specifies the superChatEvent resource parts that the API response will include. This parameter is currently not supported. */
    part: (string)[];
    /** Return rendered funding amounts in specified language. */
    hl?: string;
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
    maxResults?: number;
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
    pageToken?: string;
  }) => Promise<SuperChatEventListResponse>;

  /**
   * POST method.
   */
  youtubeTestsInsert: (input: {
    featuredPart?: boolean;
    gaia?: string;
    id?: string;
    snippet?: TestItemTestItemSnippet;
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
    part: (string)[];
    externalChannelId?: string;
  }) => Promise<TestItem>;

  /**
   * Deletes a resource.
   */
  youtubeThirdPartyLinksDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeThirdPartyLinksList: (input: {
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
  }) => Promise<ThirdPartyLinkListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeThirdPartyLinksInsert: (input: {
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
  }) => Promise<ThirdPartyLink>;

  /**
   * Updates an existing resource.
   */
  youtubeThirdPartyLinksUpdate: (input: {
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
  }) => Promise<ThirdPartyLink>;

  /**
   * As this is not an insert in a strict sense (it supports uploading/setting of a thumbnail for multiple videos, which doesn't result in creation of a single resource), I use a custom verb here.
   */
  youtubeThumbnailsSet: (input: {
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
    /** Returns the Thumbnail with the given video IDs for Stubby or Apiary. */
    videoId: string;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<ThumbnailSetResponse>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeVideoAbuseReportReasonsList: (input: {
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
    /** The *part* parameter specifies the videoCategory resource parts that the API response will include. Supported values are id and snippet. */
    part: (string)[];
    hl?: string;
  }) => Promise<VideoAbuseReportReasonListResponse>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeVideoCategoriesList: (input: {
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
    /** The *part* parameter specifies the videoCategory resource properties that the API response will include. Set the parameter value to snippet. */
    part: (string)[];
    hl?: string;
    /** Returns the video categories with the given IDs for Stubby or Apiary. */
    id?: (string)[];
    regionCode?: string;
  }) => Promise<VideoCategoryListResponse>;

  /**
   * Deletes a resource.
   */
  youtubeVideosDelete: (input: {
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
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<unknown>;

  /**
   * Retrieves a list of resources, possibly filtered.
   */
  youtubeVideosList: (input: {
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
    /** The *part* parameter specifies a comma-separated list of one or more video resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a video resource, the snippet property contains the channelId, title, description, tags, and categoryId properties. As such, if you set *part=snippet*, the API response will contain all of those properties. */
    part: (string)[];
    /** Return the videos that are in the specified chart. */
    chart?: "chartUnspecified" | "mostPopular";
    /** Stands for "host language". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX). */
    hl?: string;
    /** Return videos with the given ids. */
    id?: (string)[];
    locale?: string;
    maxHeight?: number;
    /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. *Note:* This parameter is supported for use in conjunction with the myRating and chart parameters, but it is not supported for use in conjunction with the id parameter. */
    maxResults?: number;
    /** Return the player with maximum height specified in */
    maxWidth?: number;
    /** Return videos liked/disliked by the authenticated user. Does not support RateType.RATED_TYPE_NONE. */
    myRating?: "none" | "like" | "dislike";
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. *Note:* This parameter is supported for use in conjunction with the myRating and chart parameters, but it is not supported for use in conjunction with the id parameter. */
    pageToken?: string;
    /** Use a chart that is specific to the specified region */
    regionCode?: string;
    /** Use chart that is specific to the specified video category */
    videoCategoryId?: string;
  }) => Promise<VideoListResponse>;

  /**
   * Inserts a new resource into this collection.
   */
  youtubeVideosInsert: (input: {
    /** Age restriction details related to a video. This data can only be retrieved by the video owner. */
    ageGating?: VideoAgeGating;
    /** The contentDetails object contains information about the video content, including the length of the video and its aspect ratio. */
    contentDetails?: VideoContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The fileDetails object encapsulates information about the video file that was uploaded to YouTube, including the file's resolution, duration, audio and video codecs, stream bitrates, and more. This data can only be retrieved by the video owner. */
    fileDetails?: VideoFileDetails;
    /** The ID that YouTube uses to uniquely identify the video. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#video". */
    kind?: string;
    /** The liveStreamingDetails object contains metadata about a live video broadcast. The object will only be present in a video resource if the video is an upcoming, live, or completed live broadcast. */
    liveStreamingDetails?: VideoLiveStreamingDetails;
    /** The localizations object contains localized versions of the basic details about the video, such as its title and description. */
    localizations?: { [key: string]: VideoLocalization | undefined };
    /** The monetizationDetails object encapsulates information about the monetization status of the video. */
    monetizationDetails?: VideoMonetizationDetails;
    /** The player object contains information that you would use to play the video in an embedded player. */
    player?: VideoPlayer;
    /** The processingDetails object encapsulates information about YouTube's progress in processing the uploaded video file. The properties in the object identify the current processing status and an estimate of the time remaining until YouTube finishes processing the video. This part also indicates whether different types of data or content, such as file details or thumbnail images, are available for the video. The processingProgress object is designed to be polled so that the video uploaded can track the progress that YouTube has made in processing the uploaded video file. This data can only be retrieved by the video owner. */
    processingDetails?: VideoProcessingDetails;
    /** The projectDetails object contains information about the project specific video metadata. b/157517979: This part was never populated after it was added. However, it sees non-zero traffic because there is generated client code in the wild that refers to it [1]. We keep this field and do NOT remove it because otherwise V3 would return an error when this part gets requested [2]. [1] https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html [2] http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677 */
    projectDetails?: VideoProjectDetails;
    /** The recordingDetails object encapsulates information about the location, date and address where the video was recorded. */
    recordingDetails?: VideoRecordingDetails;
    /** The snippet object contains basic details about the video, such as its title, description, and category. */
    snippet?: VideoSnippet;
    /** The statistics object contains statistics about the video. */
    statistics?: VideoStatistics;
    /** The status object contains information about the video's uploading, processing, and privacy statuses. */
    status?: VideoStatus;
    /** The suggestions object encapsulates suggestions that identify opportunities to improve the video quality or the metadata for the uploaded video. This data can only be retrieved by the video owner. */
    suggestions?: VideoSuggestions;
    /** The topicDetails object encapsulates information about Freebase topics associated with the video. */
    topicDetails?: VideoTopicDetails;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still be included in the API response. */
    part: (string)[];
    /** Should auto-levels be applied to the upload. */
    autoLevels?: boolean;
    /** Notify the channel subscribers about the new video. As default, the notification is enabled. */
    notifySubscribers?: boolean;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
    /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
    onBehalfOfContentOwnerChannel?: string;
    /** Should stabilize be applied to the upload. */
    stabilize?: boolean;
  }) => Promise<Video>;

  /**
   * Updates an existing resource.
   */
  youtubeVideosUpdate: (input: {
    /** Age restriction details related to a video. This data can only be retrieved by the video owner. */
    ageGating?: VideoAgeGating;
    /** The contentDetails object contains information about the video content, including the length of the video and its aspect ratio. */
    contentDetails?: VideoContentDetails;
    /** Etag of this resource. */
    etag?: string;
    /** The fileDetails object encapsulates information about the video file that was uploaded to YouTube, including the file's resolution, duration, audio and video codecs, stream bitrates, and more. This data can only be retrieved by the video owner. */
    fileDetails?: VideoFileDetails;
    /** The ID that YouTube uses to uniquely identify the video. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#video". */
    kind?: string;
    /** The liveStreamingDetails object contains metadata about a live video broadcast. The object will only be present in a video resource if the video is an upcoming, live, or completed live broadcast. */
    liveStreamingDetails?: VideoLiveStreamingDetails;
    /** The localizations object contains localized versions of the basic details about the video, such as its title and description. */
    localizations?: { [key: string]: VideoLocalization | undefined };
    /** The monetizationDetails object encapsulates information about the monetization status of the video. */
    monetizationDetails?: VideoMonetizationDetails;
    /** The player object contains information that you would use to play the video in an embedded player. */
    player?: VideoPlayer;
    /** The processingDetails object encapsulates information about YouTube's progress in processing the uploaded video file. The properties in the object identify the current processing status and an estimate of the time remaining until YouTube finishes processing the video. This part also indicates whether different types of data or content, such as file details or thumbnail images, are available for the video. The processingProgress object is designed to be polled so that the video uploaded can track the progress that YouTube has made in processing the uploaded video file. This data can only be retrieved by the video owner. */
    processingDetails?: VideoProcessingDetails;
    /** The projectDetails object contains information about the project specific video metadata. b/157517979: This part was never populated after it was added. However, it sees non-zero traffic because there is generated client code in the wild that refers to it [1]. We keep this field and do NOT remove it because otherwise V3 would return an error when this part gets requested [2]. [1] https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html [2] http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677 */
    projectDetails?: VideoProjectDetails;
    /** The recordingDetails object encapsulates information about the location, date and address where the video was recorded. */
    recordingDetails?: VideoRecordingDetails;
    /** The snippet object contains basic details about the video, such as its title, description, and category. */
    snippet?: VideoSnippet;
    /** The statistics object contains statistics about the video. */
    statistics?: VideoStatistics;
    /** The status object contains information about the video's uploading, processing, and privacy statuses. */
    status?: VideoStatus;
    /** The suggestions object encapsulates suggestions that identify opportunities to improve the video quality or the metadata for the uploaded video. This data can only be retrieved by the video owner. */
    suggestions?: VideoSuggestions;
    /** The topicDetails object encapsulates information about Freebase topics associated with the video. */
    topicDetails?: VideoTopicDetails;
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
    /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a video's privacy setting is contained in the status part. As such, if your request is updating a private video, and the request's part parameter value includes the status part, the video's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the video will revert to the default privacy setting. In addition, not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still be included in the API response. */
    part: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<Video>;

  /**
   * Retrieves the ratings that the authorized user gave to a list of specified videos.
   */
  youtubeVideosGetRating: (input: {
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
    id: (string)[];
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<VideoGetRatingResponse>;

  /**
   * Adds a like or dislike rating to a video or removes a rating from a video.
   */
  youtubeVideosRate: (input: {
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
    rating: "none" | "like" | "dislike";
  }) => Promise<unknown>;

  /**
   * Report abuse for a video.
   */
  youtubeVideosReportAbuse: (input: {
    /** Additional comments regarding the abuse report. */
    comments?: string;
    /** The language that the content was viewed in. */
    language?: string;
    /** The high-level, or primary, reason that the content is abusive. The value is an abuse report reason ID. */
    reasonId?: string;
    /** The specific, or secondary, reason that this content is abusive (if available). The value is an abuse report reason ID that is a valid secondary reason for the primary reason. */
    secondaryReasonId?: string;
    /** The ID that YouTube uses to uniquely identify the video. */
    videoId?: string;
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
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<unknown>;

  /**
   * Allows upload of watermark image and setting it for a channel.
   */
  youtubeWatermarksSet: (input: {
    /** The bytes the uploaded image. Only used in api to youtube communication. */
    imageBytes?: string;
    /** The url of the uploaded image. Only used in apiary to api communication. */
    imageUrl?: string;
    /** The spatial position within the video where the branding watermark will be displayed. */
    position?: InvideoPosition;
    /** The channel to which this branding links. If not present it defaults to the current channel. */
    targetChannelId?: string;
    /** The temporal position within the video where watermark will be displayed. */
    timing?: InvideoTiming;
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
    channelId: string;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<unknown>;

  /**
   * Allows removal of channel watermark.
   */
  youtubeWatermarksUnset: (input: {
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
    channelId: string;
    /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
    onBehalfOfContentOwner?: string;
  }) => Promise<unknown>;
};

export * from "./schemas.js";
