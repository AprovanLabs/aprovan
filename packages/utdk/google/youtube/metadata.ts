import type { ToolRuntimeMetadataMap } from "../../client.js";

export const toolMetadata = {
  "youtube.abuseReports.insert": {
    "accessPath": [
      "youtubeAbuseReportsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "abuseTypes",
      "description",
      "relatedEntities",
      "subject"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/abuseReports",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include."
    }
  },
  "youtube.activities.list": {
    "accessPath": [
      "youtubeActivitiesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/activities",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "channelId",
      "home",
      "maxResults",
      "mine",
      "pageToken",
      "publishedAfter",
      "publishedBefore",
      "regionCode"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more activity resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in an activity resource, the snippet property contains other properties that identify the type of activity, a display title for the activity, and so forth. If you set *part=snippet*, the API response will also contain all of those nested properties.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."
    }
  },
  "youtube.captions.delete": {
    "accessPath": [
      "youtubeCaptionsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/captions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOf",
      "onBehalfOfContentOwner"
    ],
    "description": "Deletes a resource.",
    "parameterDescriptions": {
      "onBehalfOf": "ID of the Google+ Page for the channel that the request is be on behalf of",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.captions.list": {
    "accessPath": [
      "youtubeCaptionsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/captions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "videoId",
      "id",
      "onBehalfOf",
      "onBehalfOfContentOwner"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the parameter value are id and snippet.",
      "videoId": "Returns the captions for the specified video.",
      "id": "Returns the captions with the given IDs for Stubby or Apiary.",
      "onBehalfOf": "ID of the Google+ Page for the channel that the request is on behalf of.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.captions.insert": {
    "accessPath": [
      "youtubeCaptionsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "snippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/captions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOf",
      "onBehalfOfContentOwner",
      "sync"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the caption resource parts that the API response will include. Set the parameter value to snippet.",
      "onBehalfOf": "ID of the Google+ Page for the channel that the request is be on behalf of",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "sync": "Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio."
    }
  },
  "youtube.captions.update": {
    "accessPath": [
      "youtubeCaptionsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "snippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/captions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOf",
      "onBehalfOfContentOwner",
      "sync"
    ],
    "description": "Updates an existing resource.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the parameter value are id and snippet.",
      "onBehalfOf": "ID of the Google+ Page for the channel that the request is on behalf of.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "sync": "Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio."
    }
  },
  "youtube.captions.download": {
    "accessPath": [
      "youtubeCaptionsDownload"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/captions/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "onBehalfOf",
      "onBehalfOfContentOwner",
      "tfmt",
      "tlang"
    ],
    "description": "Downloads a caption track.",
    "parameterDescriptions": {
      "id": "The ID of the caption track to download, required for One Platform.",
      "onBehalfOf": "ID of the Google+ Page for the channel that the request is be on behalf of",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "tfmt": "Convert the captions into this format. Supported options are sbv, srt, and vtt.",
      "tlang": "tlang is the language code; machine translate the captions into this language."
    }
  },
  "youtube.channelBanners.insert": {
    "accessPath": [
      "youtubeChannelBannersInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "kind",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/channelBanners/insert",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "channelId",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "channelId": "Unused, channel_id is currently derived from the security context of the requestor.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."
    }
  },
  "youtube.channelSections.delete": {
    "accessPath": [
      "youtubeChannelSectionsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/channelSections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner"
    ],
    "description": "Deletes a resource.",
    "parameterDescriptions": {
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.channelSections.list": {
    "accessPath": [
      "youtubeChannelSectionsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/channelSections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "channelId",
      "hl",
      "id",
      "mine",
      "onBehalfOfContentOwner"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more channelSection resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, and contentDetails. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channelSection resource, the snippet property contains other properties, such as a display title for the channelSection. If you set *part=snippet*, the API response will also contain all of those nested properties.",
      "channelId": "Return the ChannelSections owned by the specified channel ID.",
      "hl": "Return content in specified language",
      "id": "Return the ChannelSections with the given IDs for Stubby or Apiary.",
      "mine": "Return the ChannelSections owned by the authenticated user.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.channelSections.insert": {
    "accessPath": [
      "youtubeChannelSectionsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contentDetails",
      "etag",
      "id",
      "kind",
      "localizations",
      "snippet",
      "targeting"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/channelSections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."
    }
  },
  "youtube.channelSections.update": {
    "accessPath": [
      "youtubeChannelSectionsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contentDetails",
      "etag",
      "id",
      "kind",
      "localizations",
      "snippet",
      "targeting"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/channelSections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "description": "Updates an existing resource.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.channels.list": {
    "accessPath": [
      "youtubeChannelsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "categoryId",
      "forUsername",
      "hl",
      "id",
      "managedByMe",
      "maxResults",
      "mine",
      "mySubscribers",
      "onBehalfOfContentOwner",
      "pageToken"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more channel resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channel resource, the contentDetails property contains other properties, such as the uploads properties. As such, if you set *part=contentDetails*, the API response will also contain all of those nested properties.",
      "categoryId": "Return the channels within the specified guide category ID.",
      "forUsername": "Return the channel associated with a YouTube username.",
      "hl": "Stands for \"host language\". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX).",
      "id": "Return the channels with the specified IDs.",
      "managedByMe": "Return the channels managed by the authenticated user.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "mine": "Return the ids of channels owned by the authenticated user.",
      "mySubscribers": "Return the channels subscribed to the authenticated user",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."
    }
  },
  "youtube.channels.update": {
    "accessPath": [
      "youtubeChannelsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "auditDetails",
      "brandingSettings",
      "contentDetails",
      "contentOwnerDetails",
      "conversionPings",
      "etag",
      "id",
      "kind",
      "localizations",
      "snippet",
      "statistics",
      "status",
      "topicDetails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "description": "Updates an existing resource.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The API currently only allows the parameter value to be set to either brandingSettings or invideoPromotion. (You cannot update both of those parts with a single request.) Note that this method overrides the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies.",
      "onBehalfOfContentOwner": "The *onBehalfOfContentOwner* parameter indicates that the authenticated user is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with needs to be linked to the specified YouTube content owner."
    }
  },
  "youtube.commentThreads.list": {
    "accessPath": [
      "youtubeCommentThreadsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/commentThreads",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "allThreadsRelatedToChannelId",
      "channelId",
      "id",
      "maxResults",
      "moderationStatus",
      "order",
      "pageToken",
      "searchTerms",
      "textFormat",
      "videoId"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more commentThread resource properties that the API response will include.",
      "allThreadsRelatedToChannelId": "Returns the comment threads of all videos of the channel and the channel comments as well.",
      "channelId": "Returns the comment threads for all the channel comments (ie does not include comments left on videos).",
      "id": "Returns the comment threads with the given IDs for Stubby or Apiary.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "moderationStatus": "Limits the returned comment threads to those with the specified moderation status. Not compatible with the 'id' filter. Valid values: published, heldForReview, likelySpam.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.",
      "searchTerms": "Limits the returned comment threads to those matching the specified key words. Not compatible with the 'id' filter.",
      "textFormat": "The requested text format for the returned comments.",
      "videoId": "Returns the comment threads of the specified video."
    }
  },
  "youtube.commentThreads.insert": {
    "accessPath": [
      "youtubeCommentThreadsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "replies",
      "snippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/commentThreads",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units."
    }
  },
  "youtube.youtube.v3.updateCommentThreads": {
    "accessPath": [
      "youtubeYoutubeV3UpdateCommentThreads"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "replies",
      "snippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/commentThreads",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "description": "Updates an existing resource.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of commentThread resource properties that the API response will include. You must at least include the snippet part in the parameter value since that part contains all of the properties that the API request can update."
    }
  },
  "youtube.comments.delete": {
    "accessPath": [
      "youtubeCommentsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "description": "Deletes a resource."
  },
  "youtube.comments.list": {
    "accessPath": [
      "youtubeCommentsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "id",
      "maxResults",
      "pageToken",
      "parentId",
      "textFormat"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more comment resource properties that the API response will include.",
      "id": "Returns the comments with the given IDs for One Platform.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.",
      "parentId": "Returns replies to the specified comment. Note, currently YouTube features only one level of replies (ie replies to top level comments). However replies to replies may be supported in the future.",
      "textFormat": "The requested text format for the returned comments."
    }
  },
  "youtube.comments.insert": {
    "accessPath": [
      "youtubeCommentsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "snippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units."
    }
  },
  "youtube.comments.update": {
    "accessPath": [
      "youtubeCommentsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "snippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "description": "Updates an existing resource.",
    "parameterDescriptions": {
      "part": "The *part* parameter identifies the properties that the API response will include. You must at least include the snippet part in the parameter value since that part contains all of the properties that the API request can update."
    }
  },
  "youtube.comments.markAsSpam": {
    "accessPath": [
      "youtubeCommentsMarkAsSpam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/comments/markAsSpam",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "description": "Expresses the caller's opinion that one or more comments should be flagged as spam.",
    "parameterDescriptions": {
      "id": "Flags the comments with the given IDs as spam in the caller's opinion."
    }
  },
  "youtube.comments.setModerationStatus": {
    "accessPath": [
      "youtubeCommentsSetModerationStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/comments/setModerationStatus",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "moderationStatus",
      "banAuthor"
    ],
    "description": "Sets the moderation status of one or more comments.",
    "parameterDescriptions": {
      "id": "Modifies the moderation status of the comments with the given IDs",
      "moderationStatus": "Specifies the requested moderation status. Note, comments can be in statuses, which are not available through this call. For example, this call does not allow to mark a comment as 'likely spam'. Valid values: MODERATION_STATUS_PUBLISHED, MODERATION_STATUS_HELD_FOR_REVIEW, MODERATION_STATUS_REJECTED.",
      "banAuthor": "If set to true the author of the comment gets added to the ban list. This means all future comments of the author will autmomatically be rejected. Only valid in combination with STATUS_REJECTED."
    }
  },
  "youtube.i18nLanguages.list": {
    "accessPath": [
      "youtubeI18NLanguagesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/i18nLanguages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "hl"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the i18nLanguage resource properties that the API response will include. Set the parameter value to snippet."
    }
  },
  "youtube.i18nRegions.list": {
    "accessPath": [
      "youtubeI18NRegionsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/i18nRegions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "hl"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the i18nRegion resource properties that the API response will include. Set the parameter value to snippet."
    }
  },
  "youtube.liveBroadcasts.delete": {
    "accessPath": [
      "youtubeLiveBroadcastsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/liveBroadcasts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "description": "Delete a given broadcast.",
    "parameterDescriptions": {
      "id": "Broadcast to delete.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."
    }
  },
  "youtube.liveBroadcasts.list": {
    "accessPath": [
      "youtubeLiveBroadcastsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/liveBroadcasts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "broadcastStatus",
      "broadcastType",
      "id",
      "maxResults",
      "mine",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "pageToken"
    ],
    "description": "Retrieve the list of broadcasts associated with the given channel.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, status and statistics.",
      "broadcastStatus": "Return broadcasts with a certain status, e.g. active broadcasts.",
      "broadcastType": "Return only broadcasts with the selected type.",
      "id": "Return broadcasts with the given ids from Stubby or Apiary.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."
    }
  },
  "youtube.liveBroadcasts.insert": {
    "accessPath": [
      "youtubeLiveBroadcastsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contentDetails",
      "etag",
      "id",
      "kind",
      "snippet",
      "statistics",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/liveBroadcasts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "description": "Inserts a new stream for the authenticated user.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."
    }
  },
  "youtube.liveBroadcasts.update": {
    "accessPath": [
      "youtubeLiveBroadcastsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contentDetails",
      "etag",
      "id",
      "kind",
      "snippet",
      "statistics",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/liveBroadcasts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "description": "Updates an existing broadcast for the authenticated user.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a broadcast's privacy status is defined in the status part. As such, if your request is updating a private or unlisted broadcast, and the request's part parameter value includes the status part, the broadcast's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the broadcast will revert to the default privacy setting.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."
    }
  },
  "youtube.liveBroadcasts.bind": {
    "accessPath": [
      "youtubeLiveBroadcastsBind"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/liveBroadcasts/bind",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "streamId"
    ],
    "description": "Bind a broadcast to a stream.",
    "parameterDescriptions": {
      "id": "Broadcast to bind to the stream",
      "part": "The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
      "streamId": "Stream to bind, if not set unbind the current one."
    }
  },
  "youtube.liveBroadcasts.insertCuepoint": {
    "accessPath": [
      "youtubeLiveBroadcastsInsertCuepoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cueType",
      "durationSecs",
      "etag",
      "id",
      "insertionOffsetTimeMs",
      "walltimeMs"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/liveBroadcasts/cuepoint",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [
      "id"
    ],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "part"
    ],
    "description": "Insert cuepoints in a broadcast",
    "parameterDescriptions": {
      "id": "Broadcast to insert ads to, or equivalently `external_video_id` for internal use.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
      "part": "The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status."
    }
  },
  "youtube.liveBroadcasts.transition": {
    "accessPath": [
      "youtubeLiveBroadcastsTransition"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/liveBroadcasts/transition",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "broadcastStatus",
      "id",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "description": "Transition a broadcast to a given status.",
    "parameterDescriptions": {
      "broadcastStatus": "The status to which the broadcast is going to transition.",
      "id": "Broadcast to transition.",
      "part": "The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."
    }
  },
  "youtube.liveChatBans.delete": {
    "accessPath": [
      "youtubeLiveChatBansDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/liveChat/bans",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "description": "Deletes a chat ban."
  },
  "youtube.liveChatBans.insert": {
    "accessPath": [
      "youtubeLiveChatBansInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "snippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/liveChat/bans",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response returns. Set the parameter value to snippet."
    }
  },
  "youtube.liveChatMessages.delete": {
    "accessPath": [
      "youtubeLiveChatMessagesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/liveChat/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "description": "Deletes a chat message."
  },
  "youtube.liveChatMessages.list": {
    "accessPath": [
      "youtubeLiveChatMessagesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/liveChat/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "liveChatId",
      "part",
      "hl",
      "maxResults",
      "pageToken",
      "profileImageSize"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "liveChatId": "The id of the live chat for which comments should be returned.",
      "part": "The *part* parameter specifies the liveChatComment resource parts that the API response will include. Supported values are id and snippet.",
      "hl": "Specifies the localization language in which the system messages should be returned.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken property identify other pages that could be retrieved.",
      "profileImageSize": "Specifies the size of the profile image that should be returned for each user."
    }
  },
  "youtube.liveChatMessages.insert": {
    "accessPath": [
      "youtubeLiveChatMessagesInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "authorDetails",
      "etag",
      "id",
      "kind",
      "snippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/liveChat/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the parameter value to snippet."
    }
  },
  "youtube.liveChatModerators.delete": {
    "accessPath": [
      "youtubeLiveChatModeratorsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/liveChat/moderators",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "description": "Deletes a chat moderator."
  },
  "youtube.liveChatModerators.list": {
    "accessPath": [
      "youtubeLiveChatModeratorsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/liveChat/moderators",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "liveChatId",
      "part",
      "maxResults",
      "pageToken"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "liveChatId": "The id of the live chat for which moderators should be returned.",
      "part": "The *part* parameter specifies the liveChatModerator resource parts that the API response will include. Supported values are id and snippet.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."
    }
  },
  "youtube.liveChatModerators.insert": {
    "accessPath": [
      "youtubeLiveChatModeratorsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "snippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/liveChat/moderators",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response returns. Set the parameter value to snippet."
    }
  },
  "youtube.liveStreams.delete": {
    "accessPath": [
      "youtubeLiveStreamsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/liveStreams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "description": "Deletes an existing stream for the authenticated user.",
    "parameterDescriptions": {
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."
    }
  },
  "youtube.liveStreams.list": {
    "accessPath": [
      "youtubeLiveStreamsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/liveStreams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "id",
      "maxResults",
      "mine",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "pageToken"
    ],
    "description": "Retrieve the list of streams associated with the given channel. --",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more liveStream resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, cdn, and status.",
      "id": "Return LiveStreams with the given ids from Stubby or Apiary.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."
    }
  },
  "youtube.liveStreams.insert": {
    "accessPath": [
      "youtubeLiveStreamsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cdn",
      "contentDetails",
      "etag",
      "id",
      "kind",
      "snippet",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/liveStreams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "description": "Inserts a new stream for the authenticated user.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, cdn, content_details, and status.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."
    }
  },
  "youtube.liveStreams.update": {
    "accessPath": [
      "youtubeLiveStreamsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cdn",
      "contentDetails",
      "etag",
      "id",
      "kind",
      "snippet",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/liveStreams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "description": "Updates an existing stream for the authenticated user.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, cdn, and status. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. If the request body does not specify a value for a mutable property, the existing value for that property will be removed.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."
    }
  },
  "youtube.members.list": {
    "accessPath": [
      "youtubeMembersList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/members",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "filterByMemberChannelId",
      "hasAccessToLevel",
      "maxResults",
      "mode",
      "pageToken"
    ],
    "description": "Retrieves a list of members that match the request criteria for a channel.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the member resource parts that the API response will include. Set the parameter value to snippet.",
      "filterByMemberChannelId": "Comma separated list of channel IDs. Only data about members that are part of this list will be included in the response.",
      "hasAccessToLevel": "Filter members in the results set to the ones that have access to a level.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "mode": "Parameter that specifies which channel members to return.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."
    }
  },
  "youtube.membershipsLevels.list": {
    "accessPath": [
      "youtubeMembershipsLevelsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/membershipsLevels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "description": "Retrieves a list of all pricing levels offered by a creator to the fans.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the membershipsLevel resource parts that the API response will include. Supported values are id and snippet."
    }
  },
  "youtube.playlistItems.delete": {
    "accessPath": [
      "youtubePlaylistItemsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/playlistItems",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner"
    ],
    "description": "Deletes a resource.",
    "parameterDescriptions": {
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.playlistItems.list": {
    "accessPath": [
      "youtubePlaylistItemsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/playlistItems",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "id",
      "maxResults",
      "onBehalfOfContentOwner",
      "pageToken",
      "playlistId",
      "videoId"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more playlistItem resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlistItem resource, the snippet property contains numerous fields, including the title, description, position, and resourceId properties. As such, if you set *part=snippet*, the API response will contain all of those properties.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.",
      "playlistId": "Return the playlist items within the given playlist.",
      "videoId": "Return the playlist items associated with the given video ID."
    }
  },
  "youtube.playlistItems.insert": {
    "accessPath": [
      "youtubePlaylistItemsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contentDetails",
      "etag",
      "id",
      "kind",
      "snippet",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/playlistItems",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.playlistItems.update": {
    "accessPath": [
      "youtubePlaylistItemsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contentDetails",
      "etag",
      "id",
      "kind",
      "snippet",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/playlistItems",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "description": "Updates an existing resource.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a playlist item can specify a start time and end time, which identify the times portion of the video that should play when users watch the video in the playlist. If your request is updating a playlist item that sets these values, and the request's part parameter value includes the contentDetails part, the playlist item's start and end times will be updated to whatever value the request body specifies. If the request body does not specify values, the existing start and end times will be removed and replaced with the default settings.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.playlists.delete": {
    "accessPath": [
      "youtubePlaylistsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/playlists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner"
    ],
    "description": "Deletes a resource.",
    "parameterDescriptions": {
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.playlists.list": {
    "accessPath": [
      "youtubePlaylistsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/playlists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "channelId",
      "hl",
      "id",
      "maxResults",
      "mine",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "pageToken"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more playlist resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlist resource, the snippet property contains properties like author, title, description, tags, and timeCreated. As such, if you set *part=snippet*, the API response will contain all of those properties.",
      "channelId": "Return the playlists owned by the specified channel ID.",
      "hl": "Return content in specified language",
      "id": "Return the playlists with the given IDs for Stubby or Apiary.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "mine": "Return the playlists owned by the authenticated user.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."
    }
  },
  "youtube.playlists.insert": {
    "accessPath": [
      "youtubePlaylistsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contentDetails",
      "etag",
      "id",
      "kind",
      "localizations",
      "player",
      "snippet",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/playlists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."
    }
  },
  "youtube.playlists.update": {
    "accessPath": [
      "youtubePlaylistsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contentDetails",
      "etag",
      "id",
      "kind",
      "localizations",
      "player",
      "snippet",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/playlists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "description": "Updates an existing resource.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for mutable properties that are contained in any parts that the request body specifies. For example, a playlist's description is contained in the snippet part, which must be included in the request body. If the request does not specify a value for the snippet.description property, the playlist's existing description will be deleted.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.search.list": {
    "accessPath": [
      "youtubeSearchList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "channelId",
      "channelType",
      "eventType",
      "forContentOwner",
      "forDeveloper",
      "forMine",
      "location",
      "locationRadius",
      "maxResults",
      "onBehalfOfContentOwner",
      "order",
      "pageToken",
      "publishedAfter",
      "publishedBefore",
      "q",
      "regionCode",
      "relatedToVideoId",
      "relevanceLanguage",
      "safeSearch",
      "topicId",
      "type",
      "videoCaption",
      "videoCategoryId",
      "videoDefinition",
      "videoDimension",
      "videoDuration",
      "videoEmbeddable",
      "videoLicense",
      "videoSyndicated",
      "videoType"
    ],
    "description": "Retrieves a list of search resources",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet.",
      "channelId": "Filter on resources belonging to this channelId.",
      "channelType": "Add a filter on the channel search.",
      "eventType": "Filter on the livestream status of the videos.",
      "forContentOwner": "Search owned by a content owner.",
      "forDeveloper": "Restrict the search to only retrieve videos uploaded using the project id of the authenticated user.",
      "forMine": "Search for the private videos of the authenticated user.",
      "location": "Filter on location of the video",
      "locationRadius": "Filter on distance from the location (specified above).",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "order": "Sort order of the results.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.",
      "publishedAfter": "Filter on resources published after this date.",
      "publishedBefore": "Filter on resources published before this date.",
      "q": "Textual search terms to match.",
      "regionCode": "Display the content as seen by viewers in this country.",
      "relatedToVideoId": "Search related to a resource.",
      "relevanceLanguage": "Return results relevant to this language.",
      "safeSearch": "Indicates whether the search results should include restricted content as well as standard content.",
      "topicId": "Restrict results to a particular topic.",
      "type": "Restrict results to a particular set of resource types from One Platform.",
      "videoCaption": "Filter on the presence of captions on the videos.",
      "videoCategoryId": "Filter on videos in a specific category.",
      "videoDefinition": "Filter on the definition of the videos.",
      "videoDimension": "Filter on 3d videos.",
      "videoDuration": "Filter on the duration of the videos.",
      "videoEmbeddable": "Filter on embeddable videos.",
      "videoLicense": "Filter on the license of the videos.",
      "videoSyndicated": "Filter on syndicated videos.",
      "videoType": "Filter on videos of a specific type."
    }
  },
  "youtube.subscriptions.delete": {
    "accessPath": [
      "youtubeSubscriptionsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/subscriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "description": "Deletes a resource."
  },
  "youtube.subscriptions.list": {
    "accessPath": [
      "youtubeSubscriptionsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/subscriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "channelId",
      "forChannelId",
      "id",
      "maxResults",
      "mine",
      "myRecentSubscribers",
      "mySubscribers",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "order",
      "pageToken"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more subscription resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a subscription resource, the snippet property contains other properties, such as a display title for the subscription. If you set *part=snippet*, the API response will also contain all of those nested properties.",
      "channelId": "Return the subscriptions of the given channel owner.",
      "forChannelId": "Return the subscriptions to the subset of these channels that the authenticated user is subscribed to.",
      "id": "Return the subscriptions with the given IDs for Stubby or Apiary.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "mine": "Flag for returning the subscriptions of the authenticated user.",
      "mySubscribers": "Return the subscribers of the given channel owner.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
      "order": "The order of the returned subscriptions",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."
    }
  },
  "youtube.subscriptions.insert": {
    "accessPath": [
      "youtubeSubscriptionsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contentDetails",
      "etag",
      "id",
      "kind",
      "snippet",
      "subscriberSnippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/subscriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include."
    }
  },
  "youtube.superChatEvents.list": {
    "accessPath": [
      "youtubeSuperChatEventsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/superChatEvents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "hl",
      "maxResults",
      "pageToken"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the superChatEvent resource parts that the API response will include. This parameter is currently not supported.",
      "hl": "Return rendered funding amounts in specified language.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."
    }
  },
  "youtube.tests.insert": {
    "accessPath": [
      "youtubeTestsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "featuredPart",
      "gaia",
      "id",
      "snippet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/tests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "externalChannelId"
    ],
    "description": "POST method."
  },
  "youtube.thirdPartyLinks.delete": {
    "accessPath": [
      "youtubeThirdPartyLinksDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/thirdPartyLinks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "linkingToken",
      "type",
      "externalChannelId",
      "part"
    ],
    "description": "Deletes a resource.",
    "parameterDescriptions": {
      "linkingToken": "Delete the partner links with the given linking token.",
      "type": "Type of the link to be deleted.",
      "externalChannelId": "Channel ID to which changes should be applied, for delegation.",
      "part": "Do not use. Required for compatibility."
    }
  },
  "youtube.thirdPartyLinks.list": {
    "accessPath": [
      "youtubeThirdPartyLinksList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/thirdPartyLinks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "externalChannelId",
      "linkingToken",
      "type"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the thirdPartyLink resource parts that the API response will include. Supported values are linkingToken, status, and snippet.",
      "externalChannelId": "Channel ID to which changes should be applied, for delegation.",
      "linkingToken": "Get a third party link with the given linking token.",
      "type": "Get a third party link of the given type."
    }
  },
  "youtube.thirdPartyLinks.insert": {
    "accessPath": [
      "youtubeThirdPartyLinksInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "kind",
      "linkingToken",
      "snippet",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/thirdPartyLinks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "externalChannelId"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet.",
      "externalChannelId": "Channel ID to which changes should be applied, for delegation."
    }
  },
  "youtube.thirdPartyLinks.update": {
    "accessPath": [
      "youtubeThirdPartyLinksUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "kind",
      "linkingToken",
      "snippet",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/thirdPartyLinks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "externalChannelId"
    ],
    "description": "Updates an existing resource.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet.",
      "externalChannelId": "Channel ID to which changes should be applied, for delegation."
    }
  },
  "youtube.thumbnails.set": {
    "accessPath": [
      "youtubeThumbnailsSet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/thumbnails/set",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "videoId",
      "onBehalfOfContentOwner"
    ],
    "description": "As this is not an insert in a strict sense (it supports uploading/setting of a thumbnail for multiple videos, which doesn't result in creation of a single resource), I use a custom verb here.",
    "parameterDescriptions": {
      "videoId": "Returns the Thumbnail with the given video IDs for Stubby or Apiary.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.videoAbuseReportReasons.list": {
    "accessPath": [
      "youtubeVideoAbuseReportReasonsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/videoAbuseReportReasons",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "hl"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the videoCategory resource parts that the API response will include. Supported values are id and snippet."
    }
  },
  "youtube.videoCategories.list": {
    "accessPath": [
      "youtubeVideoCategoriesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/videoCategories",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "hl",
      "id",
      "regionCode"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies the videoCategory resource properties that the API response will include. Set the parameter value to snippet.",
      "id": "Returns the video categories with the given IDs for Stubby or Apiary."
    }
  },
  "youtube.videos.delete": {
    "accessPath": [
      "youtubeVideosDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/youtube/v3/videos",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner"
    ],
    "description": "Deletes a resource.",
    "parameterDescriptions": {
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.videos.list": {
    "accessPath": [
      "youtubeVideosList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/videos",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "chart",
      "hl",
      "id",
      "locale",
      "maxHeight",
      "maxResults",
      "maxWidth",
      "myRating",
      "onBehalfOfContentOwner",
      "pageToken",
      "regionCode",
      "videoCategoryId"
    ],
    "description": "Retrieves a list of resources, possibly filtered.",
    "parameterDescriptions": {
      "part": "The *part* parameter specifies a comma-separated list of one or more video resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a video resource, the snippet property contains the channelId, title, description, tags, and categoryId properties. As such, if you set *part=snippet*, the API response will contain all of those properties.",
      "chart": "Return the videos that are in the specified chart.",
      "hl": "Stands for \"host language\". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX).",
      "id": "Return videos with the given ids.",
      "maxResults": "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. *Note:* This parameter is supported for use in conjunction with the myRating and chart parameters, but it is not supported for use in conjunction with the id parameter.",
      "maxWidth": "Return the player with maximum height specified in",
      "myRating": "Return videos liked/disliked by the authenticated user. Does not support RateType.RATED_TYPE_NONE.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "pageToken": "The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. *Note:* This parameter is supported for use in conjunction with the myRating and chart parameters, but it is not supported for use in conjunction with the id parameter.",
      "regionCode": "Use a chart that is specific to the specified region",
      "videoCategoryId": "Use chart that is specific to the specified video category"
    }
  },
  "youtube.videos.insert": {
    "accessPath": [
      "youtubeVideosInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ageGating",
      "contentDetails",
      "etag",
      "fileDetails",
      "id",
      "kind",
      "liveStreamingDetails",
      "localizations",
      "monetizationDetails",
      "player",
      "processingDetails",
      "projectDetails",
      "recordingDetails",
      "snippet",
      "statistics",
      "status",
      "suggestions",
      "topicDetails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/videos",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "autoLevels",
      "notifySubscribers",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "stabilize"
    ],
    "description": "Inserts a new resource into this collection.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still be included in the API response.",
      "autoLevels": "Should auto-levels be applied to the upload.",
      "notifySubscribers": "Notify the channel subscribers about the new video. As default, the notification is enabled.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
      "onBehalfOfContentOwnerChannel": "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
      "stabilize": "Should stabilize be applied to the upload."
    }
  },
  "youtube.videos.update": {
    "accessPath": [
      "youtubeVideosUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ageGating",
      "contentDetails",
      "etag",
      "fileDetails",
      "id",
      "kind",
      "liveStreamingDetails",
      "localizations",
      "monetizationDetails",
      "player",
      "processingDetails",
      "projectDetails",
      "recordingDetails",
      "snippet",
      "statistics",
      "status",
      "suggestions",
      "topicDetails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/youtube/v3/videos",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "description": "Updates an existing resource.",
    "parameterDescriptions": {
      "part": "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a video's privacy setting is contained in the status part. As such, if your request is updating a private video, and the request's part parameter value includes the status part, the video's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the video will revert to the default privacy setting. In addition, not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still be included in the API response.",
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.videos.getRating": {
    "accessPath": [
      "youtubeVideosGetRating"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/youtube/v3/videos/getRating",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner"
    ],
    "description": "Retrieves the ratings that the authorized user gave to a list of specified videos.",
    "parameterDescriptions": {
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.videos.rate": {
    "accessPath": [
      "youtubeVideosRate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/videos/rate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "rating"
    ],
    "description": "Adds a like or dislike rating to a video or removes a rating from a video."
  },
  "youtube.videos.reportAbuse": {
    "accessPath": [
      "youtubeVideosReportAbuse"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comments",
      "language",
      "reasonId",
      "secondaryReasonId",
      "videoId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/videos/reportAbuse",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "onBehalfOfContentOwner"
    ],
    "description": "Report abuse for a video.",
    "parameterDescriptions": {
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.watermarks.set": {
    "accessPath": [
      "youtubeWatermarksSet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "imageBytes",
      "imageUrl",
      "position",
      "targetChannelId",
      "timing"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/watermarks/set",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "channelId",
      "onBehalfOfContentOwner"
    ],
    "description": "Allows upload of watermark image and setting it for a channel.",
    "parameterDescriptions": {
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  },
  "youtube.watermarks.unset": {
    "accessPath": [
      "youtubeWatermarksUnset"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/youtube/v3/watermarks/unset",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "channelId",
      "onBehalfOfContentOwner"
    ],
    "description": "Allows removal of channel watermark.",
    "parameterDescriptions": {
      "onBehalfOfContentOwner": "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."
    }
  }
} satisfies ToolRuntimeMetadataMap;
