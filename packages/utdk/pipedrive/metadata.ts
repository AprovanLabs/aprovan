import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "getActivityFields": {
    "accessPath": [
      "getActivityFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/activityFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all activity fields"
  },
  "getActivityTypes": {
    "accessPath": [
      "getActivityTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/activityTypes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all activity types"
  },
  "addActivityType": {
    "accessPath": [
      "addActivityType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "icon_key",
      "color"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/activityTypes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add new activity type"
  },
  "deleteActivityType": {
    "accessPath": [
      "deleteActivityType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/activityTypes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an activity type",
    "parameterDescriptions": {
      "id": "The ID of the activity type"
    }
  },
  "updateActivityType": {
    "accessPath": [
      "updateActivityType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "icon_key",
      "color",
      "order_nr"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/activityTypes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an activity type",
    "parameterDescriptions": {
      "id": "The ID of the activity type"
    }
  },
  "getCompanyAddons": {
    "accessPath": [
      "getCompanyAddons"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/subscriptions/addons",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all add-ons for a single company"
  },
  "addCallLog": {
    "accessPath": [
      "addCallLog"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "activity_id",
      "subject",
      "duration",
      "outcome",
      "from_phone_number",
      "to_phone_number",
      "start_time",
      "end_time",
      "person_id",
      "org_id",
      "deal_id",
      "lead_id",
      "note"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/callLogs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a call log"
  },
  "getUserCallLogs": {
    "accessPath": [
      "getUserCallLogs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/callLogs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "Get all call logs assigned to a particular user",
    "parameterDescriptions": {
      "start": "Pagination start",
      "limit": "For pagination, the limit of entries to be returned. The upper limit is 50."
    }
  },
  "deleteCallLog": {
    "accessPath": [
      "deleteCallLog"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/callLogs/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a call log",
    "parameterDescriptions": {
      "id": "The ID received when you create the call log"
    }
  },
  "getCallLog": {
    "accessPath": [
      "getCallLog"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/callLogs/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get details of a call log",
    "parameterDescriptions": {
      "id": "The ID received when you create the call log"
    }
  },
  "addCallLogAudioFile": {
    "accessPath": [
      "addCallLogAudioFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/callLogs/{id}/recordings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Attach an audio file to the call log",
    "parameterDescriptions": {
      "id": "The ID received when you create the call log"
    }
  },
  "addChannel": {
    "accessPath": [
      "addChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "provider_channel_id",
      "avatar_url",
      "template_support",
      "provider_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a channel"
  },
  "deleteChannel": {
    "accessPath": [
      "deleteChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/channels/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a channel",
    "parameterDescriptions": {
      "id": "The ID of the channel provided by the integration"
    }
  },
  "receiveMessage": {
    "accessPath": [
      "receiveMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "channel_id",
      "sender_id",
      "conversation_id",
      "message",
      "status",
      "created_at",
      "reply_by",
      "conversation_link",
      "attachments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/channels/messages/receive",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Receives an incoming message"
  },
  "deleteConversation": {
    "accessPath": [
      "deleteConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/channels/{channel-id}/conversations/{conversation-id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel-id",
      "conversation-id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a conversation",
    "parameterDescriptions": {
      "channel-id": "The ID of the channel provided by the integration",
      "conversation-id": "The ID of the conversation provided by the integration"
    }
  },
  "getCurrencies": {
    "accessPath": [
      "getCurrencies"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/currencies",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "term"
    ],
    "description": "Get all supported currencies",
    "parameterDescriptions": {
      "term": "Optional search term that is searched for from currency's name and/or code"
    }
  },
  "getArchivedDeals": {
    "accessPath": [
      "getArchivedDeals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/archived",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user_id",
      "filter_id",
      "person_id",
      "org_id",
      "product_id",
      "pipeline_id",
      "stage_id",
      "status",
      "start",
      "limit",
      "sort",
      "owned_by_you"
    ],
    "description": "Get all archived deals",
    "parameterDescriptions": {
      "user_id": "If supplied, only deals matching the given user will be returned. However, `filter_id` and `owned_by_you` takes precedence over `user_id` when supplied.",
      "filter_id": "The ID of the filter to use",
      "person_id": "If supplied, only deals linked to the specified person are returned. If filter_id is provided, this is ignored.",
      "org_id": "If supplied, only deals linked to the specified organization are returned. If filter_id is provided, this is ignored.",
      "product_id": "If supplied, only deals linked to the specified product are returned. If filter_id is provided, this is ignored.",
      "pipeline_id": "If supplied, only deals in the specified pipeline are returned. If filter_id is provided, this is ignored.",
      "stage_id": "If supplied, only deals in the specified stage are returned. If filter_id is provided, this is ignored.",
      "status": "Only fetch deals with a specific status. If omitted, all not deleted deals are returned. If set to deleted, deals that have been deleted up to 30 days ago will be included.",
      "start": "Pagination start",
      "limit": "Items shown per page",
      "sort": "The field names and sorting mode separated by a comma (`field_name_1 ASC`, `field_name_2 DESC`). Only first-level field keys are supported (no nested keys).",
      "owned_by_you": "When supplied, only deals owned by you are returned. However, `filter_id` takes precedence over `owned_by_you` when both are supplied."
    }
  },
  "getDealsSummary": {
    "accessPath": [
      "getDealsSummary"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/summary",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "status",
      "filter_id",
      "user_id",
      "pipeline_id",
      "stage_id"
    ],
    "description": "Get deals summary",
    "parameterDescriptions": {
      "status": "Only fetch deals with a specific status. open = Open, won = Won, lost = Lost.",
      "filter_id": "<code>user_id</code> will not be considered. Only deals matching the given filter will be returned.",
      "user_id": "Only deals matching the given user will be returned. `user_id` will not be considered if you use `filter_id`.",
      "pipeline_id": "Only deals within the given pipeline will be returned",
      "stage_id": "Only deals within the given stage will be returned"
    }
  },
  "getArchivedDealsSummary": {
    "accessPath": [
      "getArchivedDealsSummary"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/summary/archived",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "status",
      "filter_id",
      "user_id",
      "pipeline_id",
      "stage_id"
    ],
    "description": "Get archived deals summary",
    "parameterDescriptions": {
      "status": "Only fetch deals with a specific status. open = Open, won = Won, lost = Lost.",
      "filter_id": "<code>user_id</code> will not be considered. Only deals matching the given filter will be returned.",
      "user_id": "Only deals matching the given user will be returned. `user_id` will not be considered if you use `filter_id`.",
      "pipeline_id": "Only deals within the given pipeline will be returned",
      "stage_id": "Only deals within the given stage will be returned"
    }
  },
  "getDealsTimeline": {
    "accessPath": [
      "getDealsTimeline"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/timeline",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_date",
      "interval",
      "amount",
      "field_key",
      "user_id",
      "pipeline_id",
      "filter_id",
      "exclude_deals",
      "totals_convert_currency"
    ],
    "description": "Get deals timeline",
    "parameterDescriptions": {
      "start_date": "The date when the first interval starts. Format: YYYY-MM-DD.",
      "interval": "The type of the interval<table><tr><th>Value</th><th>Description</th></tr><tr><td>`day`</td><td>Day</td></tr><tr><td>`week`</td><td>A full week (7 days) starting from `start_date`</td></tr><tr><td>`month`</td><td>A full month (depending on the number of days in given month) starting from `start_date`</td></tr><tr><td>`quarter`</td><td>A full quarter (3 months) starting from `start_date`</td></tr></table>",
      "amount": "The number of given intervals, starting from `start_date`, to fetch. E.g. 3 (months).",
      "field_key": "The date field key which deals will be retrieved from",
      "user_id": "If supplied, only deals matching the given user will be returned",
      "pipeline_id": "If supplied, only deals matching the given pipeline will be returned",
      "filter_id": "If supplied, only deals matching the given filter will be returned",
      "exclude_deals": "Whether to exclude deals list (1) or not (0). Note that when deals are excluded, the timeline summary (counts and values) is still returned.",
      "totals_convert_currency": "The 3-letter currency code of any of the supported currencies. When supplied, `totals_converted` is returned per each interval which contains the currency-converted total amounts in the given currency. You may also set this parameter to `default_currency` in which case the user's default currency is used."
    }
  },
  "getArchivedDealsTimeline": {
    "accessPath": [
      "getArchivedDealsTimeline"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/timeline/archived",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_date",
      "interval",
      "amount",
      "field_key",
      "user_id",
      "pipeline_id",
      "filter_id",
      "exclude_deals",
      "totals_convert_currency"
    ],
    "description": "Get archived deals timeline",
    "parameterDescriptions": {
      "start_date": "The date when the first interval starts. Format: YYYY-MM-DD.",
      "interval": "The type of the interval<table><tr><th>Value</th><th>Description</th></tr><tr><td>`day`</td><td>Day</td></tr><tr><td>`week`</td><td>A full week (7 days) starting from `start_date`</td></tr><tr><td>`month`</td><td>A full month (depending on the number of days in given month) starting from `start_date`</td></tr><tr><td>`quarter`</td><td>A full quarter (3 months) starting from `start_date`</td></tr></table>",
      "amount": "The number of given intervals, starting from `start_date`, to fetch. E.g. 3 (months).",
      "field_key": "The date field key which deals will be retrieved from",
      "user_id": "If supplied, only deals matching the given user will be returned",
      "pipeline_id": "If supplied, only deals matching the given pipeline will be returned",
      "filter_id": "If supplied, only deals matching the given filter will be returned",
      "exclude_deals": "Whether to exclude deals list (1) or not (0). Note that when deals are excluded, the timeline summary (counts and values) is still returned.",
      "totals_convert_currency": "The 3-letter currency code of any of the supported currencies. When supplied, `totals_converted` is returned per each interval which contains the currency-converted total amounts in the given currency. You may also set this parameter to `default_currency` in which case the user's default currency is used."
    }
  },
  "getDealChangelog": {
    "accessPath": [
      "getDealChangelog"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/{id}/changelog",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "limit"
    ],
    "description": "List updates about deal field values",
    "parameterDescriptions": {
      "id": "The ID of the deal",
      "cursor": "For pagination, the marker (an opaque string value) representing the first item on the next page",
      "limit": "Items shown per page"
    }
  },
  "duplicateDeal": {
    "accessPath": [
      "duplicateDeal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/deals/{id}/duplicate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Duplicate deal",
    "parameterDescriptions": {
      "id": "The ID of the deal"
    }
  },
  "getDealFiles": {
    "accessPath": [
      "getDealFiles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/{id}/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit",
      "sort"
    ],
    "description": "List files attached to a deal",
    "parameterDescriptions": {
      "id": "The ID of the deal",
      "start": "Pagination start",
      "limit": "Items shown per page. Please note that a maximum value of 100 is allowed.",
      "sort": "Supported fields: `id`, `update_time`"
    }
  },
  "getDealUpdates": {
    "accessPath": [
      "getDealUpdates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/{id}/flow",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit",
      "all_changes",
      "items"
    ],
    "description": "List updates about a deal",
    "parameterDescriptions": {
      "id": "The ID of the deal",
      "start": "Pagination start",
      "limit": "Items shown per page",
      "all_changes": "Whether to show custom field updates or not. 1 = Include custom field changes. If omitted returns changes without custom field updates.",
      "items": "A comma-separated string for filtering out item specific updates. (Possible values - call, activity, plannedActivity, change, note, deal, file, dealChange, personChange, organizationChange, follower, dealFollower, personFollower, organizationFollower, participant, comment, mailMessage, mailMessageWithAttachment, invoice, document, marketing_campaign_stat, marketing_status_change)."
    }
  },
  "getDealParticipantsChangelog": {
    "accessPath": [
      "getDealParticipantsChangelog"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/{id}/participantsChangelog",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "cursor"
    ],
    "description": "List updates about participants of a deal",
    "parameterDescriptions": {
      "id": "The ID of the deal",
      "limit": "Items shown per page",
      "cursor": "For pagination, the marker (an opaque string value) representing the first item on the next page"
    }
  },
  "getDealFollowers": {
    "accessPath": [
      "getDealFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/{id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List followers of a deal",
    "parameterDescriptions": {
      "id": "The ID of the deal"
    }
  },
  "addDealFollower": {
    "accessPath": [
      "addDealFollower"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/deals/{id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a follower to a deal",
    "parameterDescriptions": {
      "id": "The ID of the deal"
    }
  },
  "deleteDealFollower": {
    "accessPath": [
      "deleteDealFollower"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/deals/{id}/followers/{follower_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "follower_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a follower from a deal",
    "parameterDescriptions": {
      "id": "The ID of the deal",
      "follower_id": "The ID of the relationship between the follower and the deal"
    }
  },
  "getDealMailMessages": {
    "accessPath": [
      "getDealMailMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/{id}/mailMessages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "List mail messages associated with a deal",
    "parameterDescriptions": {
      "id": "The ID of the deal",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "mergeDeals": {
    "accessPath": [
      "mergeDeals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "merge_with_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/deals/{id}/merge",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Merge two deals",
    "parameterDescriptions": {
      "id": "The ID of the deal"
    }
  },
  "getDealParticipants": {
    "accessPath": [
      "getDealParticipants"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/{id}/participants",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "List participants of a deal",
    "parameterDescriptions": {
      "id": "The ID of the deal",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "addDealParticipant": {
    "accessPath": [
      "addDealParticipant"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "person_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/deals/{id}/participants",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a participant to a deal",
    "parameterDescriptions": {
      "id": "The ID of the deal"
    }
  },
  "deleteDealParticipant": {
    "accessPath": [
      "deleteDealParticipant"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/deals/{id}/participants/{deal_participant_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "deal_participant_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a participant from a deal",
    "parameterDescriptions": {
      "id": "The ID of the deal",
      "deal_participant_id": "The ID of the participant of the deal"
    }
  },
  "getDealUsers": {
    "accessPath": [
      "getDealUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/deals/{id}/permittedUsers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List permitted users",
    "parameterDescriptions": {
      "id": "The ID of the deal"
    }
  },
  "getDealFields": {
    "accessPath": [
      "getDealFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/dealFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "Get all deal fields",
    "parameterDescriptions": {
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "addDealField": {
    "accessPath": [
      "addDealField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "options",
      "add_visible_flag",
      "field_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/dealFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a new deal field"
  },
  "deleteDealFields": {
    "accessPath": [
      "deleteDealFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/dealFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids"
    ],
    "description": "Delete multiple deal fields in bulk",
    "parameterDescriptions": {
      "ids": "The comma-separated field IDs to delete"
    }
  },
  "getDealField": {
    "accessPath": [
      "getDealField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/dealFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one deal field",
    "parameterDescriptions": {
      "id": "The ID of the field"
    }
  },
  "deleteDealField": {
    "accessPath": [
      "deleteDealField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/dealFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a deal field",
    "parameterDescriptions": {
      "id": "The ID of the field"
    }
  },
  "updateDealField": {
    "accessPath": [
      "updateDealField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "options",
      "add_visible_flag"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/dealFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a deal field",
    "parameterDescriptions": {
      "id": "The ID of the field"
    }
  },
  "getFiles": {
    "accessPath": [
      "getFiles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit",
      "sort"
    ],
    "description": "Get all files",
    "parameterDescriptions": {
      "start": "Pagination start",
      "limit": "Items shown per page. Please note that a maximum value of 100 is allowed.",
      "sort": "Supported fields: `id`, `update_time`"
    }
  },
  "addFile": {
    "accessPath": [
      "addFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "deal_id",
      "person_id",
      "org_id",
      "product_id",
      "activity_id",
      "lead_id",
      "project_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add file"
  },
  "addFileAndLinkIt": {
    "accessPath": [
      "addFileAndLinkIt"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file_type",
      "title",
      "item_type",
      "item_id",
      "remote_location"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/files/remote",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a remote file and link it to an item"
  },
  "linkFileToItem": {
    "accessPath": [
      "linkFileToItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "item_type",
      "item_id",
      "remote_id",
      "remote_location"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/files/remoteLink",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Link a remote file to an item"
  },
  "deleteFile": {
    "accessPath": [
      "deleteFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/files/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a file",
    "parameterDescriptions": {
      "id": "The ID of the file"
    }
  },
  "getFile": {
    "accessPath": [
      "getFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one file",
    "parameterDescriptions": {
      "id": "The ID of the file"
    }
  },
  "updateFile": {
    "accessPath": [
      "updateFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/files/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update file details",
    "parameterDescriptions": {
      "id": "The ID of the file"
    }
  },
  "downloadFile": {
    "accessPath": [
      "downloadFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{id}/download",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download one file",
    "parameterDescriptions": {
      "id": "The ID of the file"
    }
  },
  "deleteFilters": {
    "accessPath": [
      "deleteFilters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids"
    ],
    "description": "Delete multiple filters in bulk",
    "parameterDescriptions": {
      "ids": "The comma-separated filter IDs to delete"
    }
  },
  "getFilters": {
    "accessPath": [
      "getFilters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "type"
    ],
    "description": "Get all filters",
    "parameterDescriptions": {
      "type": "The types of filters to fetch"
    }
  },
  "addFilter": {
    "accessPath": [
      "addFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "conditions",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_field_code"
    ],
    "description": "Add a new filter",
    "parameterDescriptions": {
      "include_field_code": "If set to `true`, each condition in the response includes a `field_code` field identifying the field by its code name"
    }
  },
  "getFilterHelpers": {
    "accessPath": [
      "getFilterHelpers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/filters/helpers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all filter helpers"
  },
  "deleteFilter": {
    "accessPath": [
      "deleteFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/filters/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a filter",
    "parameterDescriptions": {
      "id": "The ID of the filter"
    }
  },
  "getFilter": {
    "accessPath": [
      "getFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/filters/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_field_code"
    ],
    "description": "Get one filter",
    "parameterDescriptions": {
      "id": "The ID of the filter",
      "include_field_code": "If set to `true`, each condition in the response includes a `field_code` field identifying the field by its code name"
    }
  },
  "updateFilter": {
    "accessPath": [
      "updateFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "conditions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/filters/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_field_code"
    ],
    "description": "Update filter",
    "parameterDescriptions": {
      "id": "The ID of the filter",
      "include_field_code": "If set to `true`, each condition in the response includes a `field_code` field identifying the field by its code name"
    }
  },
  "addGoal": {
    "accessPath": [
      "addGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "assignee",
      "type",
      "expected_outcome",
      "duration",
      "interval"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/goals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a new goal"
  },
  "getGoals": {
    "accessPath": [
      "getGoals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/goals/find",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "type.name",
      "title",
      "is_active",
      "assignee.id",
      "assignee.type",
      "expected_outcome.target",
      "expected_outcome.tracking_metric",
      "expected_outcome.currency_id",
      "type.params.pipeline_id",
      "type.params.stage_id",
      "type.params.activity_type_id",
      "period.start",
      "period.end"
    ],
    "description": "Find goals",
    "parameterDescriptions": {
      "type.name": "The type of the goal. If provided, everyone's goals will be returned.",
      "title": "The title of the goal",
      "is_active": "Whether the goal is active or not",
      "assignee.id": "The ID of the user who's goal to fetch. When omitted, only your goals will be returned.",
      "assignee.type": "The type of the goal's assignee. If provided, everyone's goals will be returned.",
      "expected_outcome.target": "The numeric value of the outcome. If provided, everyone's goals will be returned.",
      "expected_outcome.tracking_metric": "The tracking metric of the expected outcome of the goal. If provided, everyone's goals will be returned.",
      "expected_outcome.currency_id": "The numeric ID of the goal's currency. Only applicable to goals with `expected_outcome.tracking_metric` with value `sum`. If provided, everyone's goals will be returned.",
      "type.params.pipeline_id": "An array of pipeline IDs or `null` for all pipelines. If provided, everyone's goals will be returned.",
      "type.params.stage_id": "The ID of the stage. Applicable to only `deals_progressed` type of goals. If provided, everyone's goals will be returned.",
      "type.params.activity_type_id": "An array of IDs or `null` for all activity types. Only applicable for `activities_completed` and/or `activities_added` types of goals. If provided, everyone's goals will be returned.",
      "period.start": "The start date of the period for which to find goals. Date in format of YYYY-MM-DD. When `period.start` is provided, `period.end` must be provided too.",
      "period.end": "The end date of the period for which to find goals. Date in format of YYYY-MM-DD."
    }
  },
  "updateGoal": {
    "accessPath": [
      "updateGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "assignee",
      "type",
      "expected_outcome",
      "duration",
      "interval"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/goals/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update existing goal",
    "parameterDescriptions": {
      "id": "The ID of the goal"
    }
  },
  "deleteGoal": {
    "accessPath": [
      "deleteGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/goals/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete existing goal",
    "parameterDescriptions": {
      "id": "The ID of the goal"
    }
  },
  "getGoalResult": {
    "accessPath": [
      "getGoalResult"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/goals/{id}/results",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "period.start",
      "period.end"
    ],
    "description": "Get result of a goal",
    "parameterDescriptions": {
      "id": "The ID of the goal that the results are looked for",
      "period.start": "The start date of the period for which to find the goal's progress. Format: YYYY-MM-DD. This date must be the same or after the goal duration start date.\n",
      "period.end": "The end date of the period for which to find the goal's progress. Format: YYYY-MM-DD. This date must be the same or before the goal duration end date.\n"
    }
  },
  "getLeads": {
    "accessPath": [
      "getLeads"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/leads",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "start",
      "owner_id",
      "person_id",
      "organization_id",
      "filter_id",
      "updated_since",
      "sort"
    ],
    "description": "Get all leads",
    "parameterDescriptions": {
      "limit": "For pagination, the limit of entries to be returned. If not provided, 100 items will be returned.",
      "start": "For pagination, the position that represents the first result for the page",
      "owner_id": "If supplied, only leads matching the given user will be returned. However, `filter_id` takes precedence over `owner_id` when supplied.",
      "person_id": "If supplied, only leads matching the given person will be returned. However, `filter_id` takes precedence over `person_id` when supplied.",
      "organization_id": "If supplied, only leads matching the given organization will be returned. However, `filter_id` takes precedence over `organization_id` when supplied.",
      "filter_id": "The ID of the filter to use",
      "updated_since": "If set, only leads with an `update_time` later than or equal to this time are returned. In ISO 8601 format, e.g. 2025-01-01T10:20:00Z.",
      "sort": "The field names and sorting mode separated by a comma (`field_name_1 ASC`, `field_name_2 DESC`). Only first-level field keys are supported (no nested keys)."
    }
  },
  "addLead": {
    "accessPath": [
      "addLead"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "owner_id",
      "label_ids",
      "person_id",
      "organization_id",
      "value",
      "expected_close_date",
      "visible_to",
      "was_seen",
      "origin_id",
      "channel",
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/leads",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a lead"
  },
  "getArchivedLeads": {
    "accessPath": [
      "getArchivedLeads"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/leads/archived",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "start",
      "owner_id",
      "person_id",
      "organization_id",
      "filter_id",
      "sort"
    ],
    "description": "Get all archived leads",
    "parameterDescriptions": {
      "limit": "For pagination, the limit of entries to be returned. If not provided, 100 items will be returned.",
      "start": "For pagination, the position that represents the first result for the page",
      "owner_id": "If supplied, only leads matching the given user will be returned. However, `filter_id` takes precedence over `owner_id` when supplied.",
      "person_id": "If supplied, only leads matching the given person will be returned. However, `filter_id` takes precedence over `person_id` when supplied.",
      "organization_id": "If supplied, only leads matching the given organization will be returned. However, `filter_id` takes precedence over `organization_id` when supplied.",
      "filter_id": "The ID of the filter to use",
      "sort": "The field names and sorting mode separated by a comma (`field_name_1 ASC`, `field_name_2 DESC`). Only first-level field keys are supported (no nested keys)."
    }
  },
  "getLead": {
    "accessPath": [
      "getLead"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/leads/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one lead",
    "parameterDescriptions": {
      "id": "The ID of the lead"
    }
  },
  "updateLead": {
    "accessPath": [
      "updateLead"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "owner_id",
      "label_ids",
      "person_id",
      "organization_id",
      "is_archived",
      "value",
      "expected_close_date",
      "visible_to",
      "was_seen",
      "channel",
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v1/leads/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a lead",
    "parameterDescriptions": {
      "id": "The ID of the lead"
    }
  },
  "deleteLead": {
    "accessPath": [
      "deleteLead"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/leads/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a lead",
    "parameterDescriptions": {
      "id": "The ID of the lead"
    }
  },
  "getLeadUsers": {
    "accessPath": [
      "getLeadUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/leads/{id}/permittedUsers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List permitted users",
    "parameterDescriptions": {
      "id": "The ID of the lead"
    }
  },
  "searchLeads": {
    "accessPath": [
      "searchLeads"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/leads/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "term",
      "fields",
      "exact_match",
      "person_id",
      "organization_id",
      "include_fields",
      "start",
      "limit"
    ],
    "description": "Search leads",
    "parameterDescriptions": {
      "term": "The search term to look for. Minimum 2 characters (or 1 if using `exact_match`). Please note that the search term has to be URL encoded.",
      "fields": "A comma-separated string array. The fields to perform the search from. Defaults to all of them.",
      "exact_match": "When enabled, only full exact matches against the given term are returned. It is <b>not</b> case sensitive.",
      "person_id": "Will filter leads by the provided person ID. The upper limit of found leads associated with the person is 2000.",
      "organization_id": "Will filter leads by the provided organization ID. The upper limit of found leads associated with the organization is 2000.",
      "include_fields": "Supports including optional fields in the results which are not provided by default",
      "start": "Pagination start. Note that the pagination is based on main results and does not include related items when using `search_for_related_items` parameter.",
      "limit": "Items shown per page"
    }
  },
  "getLeadFields": {
    "accessPath": [
      "getLeadFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/leadFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "Get all lead fields",
    "parameterDescriptions": {
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "getLeadLabels": {
    "accessPath": [
      "getLeadLabels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/leadLabels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all lead labels"
  },
  "addLeadLabel": {
    "accessPath": [
      "addLeadLabel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "color"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/leadLabels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a lead label"
  },
  "updateLeadLabel": {
    "accessPath": [
      "updateLeadLabel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "color"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v1/leadLabels/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a lead label",
    "parameterDescriptions": {
      "id": "The ID of the lead label"
    }
  },
  "deleteLeadLabel": {
    "accessPath": [
      "deleteLeadLabel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/leadLabels/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a lead label",
    "parameterDescriptions": {
      "id": "The ID of the lead label"
    }
  },
  "getLeadSources": {
    "accessPath": [
      "getLeadSources"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/leadSources",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all lead sources"
  },
  "getTeams": {
    "accessPath": [
      "getTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/legacyTeams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "order_by",
      "skip_users"
    ],
    "description": "Get all teams",
    "parameterDescriptions": {
      "order_by": "The field name to sort returned teams by",
      "skip_users": "When enabled, the teams will not include IDs of member users"
    }
  },
  "addTeam": {
    "accessPath": [
      "addTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "manager_id",
      "users"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/legacyTeams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a new team"
  },
  "getTeam": {
    "accessPath": [
      "getTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/legacyTeams/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "skip_users"
    ],
    "description": "Get a single team",
    "parameterDescriptions": {
      "id": "The ID of the team",
      "skip_users": "When enabled, the teams will not include IDs of member users"
    }
  },
  "updateTeam": {
    "accessPath": [
      "updateTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "manager_id",
      "users",
      "active_flag",
      "deleted_flag"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/legacyTeams/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a team",
    "parameterDescriptions": {
      "id": "The ID of the team"
    }
  },
  "getTeamUsers": {
    "accessPath": [
      "getTeamUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/legacyTeams/{id}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all users in a team",
    "parameterDescriptions": {
      "id": "The ID of the team"
    }
  },
  "addTeamUser": {
    "accessPath": [
      "addTeamUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "users"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/legacyTeams/{id}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add users to a team",
    "parameterDescriptions": {
      "id": "The ID of the team"
    }
  },
  "deleteTeamUser": {
    "accessPath": [
      "deleteTeamUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "users"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/legacyTeams/{id}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete users from a team",
    "parameterDescriptions": {
      "id": "The ID of the team"
    }
  },
  "getUserTeams": {
    "accessPath": [
      "getUserTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/legacyTeams/user/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "order_by",
      "skip_users"
    ],
    "description": "Get all teams of a user",
    "parameterDescriptions": {
      "id": "The ID of the user",
      "order_by": "The field name to sort returned teams by",
      "skip_users": "When enabled, the teams will not include IDs of member users"
    }
  },
  "getMailMessage": {
    "accessPath": [
      "getMailMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/mailbox/mailMessages/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_body"
    ],
    "description": "Get one mail message",
    "parameterDescriptions": {
      "id": "The ID of the mail message to fetch",
      "include_body": "Whether to include the full message body or not. `0` = Don't include, `1` = Include."
    }
  },
  "getMailThreads": {
    "accessPath": [
      "getMailThreads"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/mailbox/mailThreads",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "folder",
      "start",
      "limit"
    ],
    "description": "Get mail threads",
    "parameterDescriptions": {
      "folder": "The type of folder to fetch",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "deleteMailThread": {
    "accessPath": [
      "deleteMailThread"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/mailbox/mailThreads/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete mail thread",
    "parameterDescriptions": {
      "id": "The ID of the mail thread"
    }
  },
  "getMailThread": {
    "accessPath": [
      "getMailThread"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/mailbox/mailThreads/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one mail thread",
    "parameterDescriptions": {
      "id": "The ID of the mail thread"
    }
  },
  "updateMailThreadDetails": {
    "accessPath": [
      "updateMailThreadDetails"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "deal_id",
      "lead_id",
      "shared_flag",
      "read_flag",
      "archived_flag"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/mailbox/mailThreads/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update mail thread details",
    "parameterDescriptions": {
      "id": "The ID of the mail thread"
    }
  },
  "getMailThreadMessages": {
    "accessPath": [
      "getMailThreadMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/mailbox/mailThreads/{id}/mailMessages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all mail messages of mail thread",
    "parameterDescriptions": {
      "id": "The ID of the mail thread"
    }
  },
  "saveUserProviderLink": {
    "accessPath": [
      "saveUserProviderLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_provider_id",
      "user_id",
      "company_id",
      "marketplace_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/meetings/userProviderLinks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Link a user with the installed video call integration"
  },
  "deleteUserProviderLink": {
    "accessPath": [
      "deleteUserProviderLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/meetings/userProviderLinks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete the link between a user and the installed video call integration",
    "parameterDescriptions": {
      "id": "Unique identifier linking a user to the installed integration"
    }
  },
  "getNotes": {
    "accessPath": [
      "getNotes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/notes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user_id",
      "lead_id",
      "deal_id",
      "person_id",
      "org_id",
      "project_id",
      "task_id",
      "start",
      "limit",
      "sort",
      "start_date",
      "end_date",
      "updated_since",
      "pinned_to_lead_flag",
      "pinned_to_deal_flag",
      "pinned_to_organization_flag",
      "pinned_to_person_flag",
      "pinned_to_project_flag",
      "pinned_to_task_flag"
    ],
    "description": "Get all notes",
    "parameterDescriptions": {
      "user_id": "The ID of the user whose notes to fetch. If omitted, notes by all users will be returned.",
      "lead_id": "The ID of the lead which notes to fetch. If omitted, notes about all leads will be returned.",
      "deal_id": "The ID of the deal which notes to fetch. If omitted, notes about all deals will be returned.",
      "person_id": "The ID of the person whose notes to fetch. If omitted, notes about all persons will be returned.",
      "org_id": "The ID of the organization which notes to fetch. If omitted, notes about all organizations will be returned.",
      "project_id": "The ID of the project which notes to fetch. If omitted, notes about all projects will be returned.",
      "task_id": "The ID of the task which notes to fetch. If omitted, notes about all tasks will be returned.",
      "start": "Pagination start",
      "limit": "Items shown per page",
      "sort": "The field names and sorting mode separated by a comma (`field_name_1 ASC`, `field_name_2 DESC`). Only first-level field keys are supported (no nested keys). Supported fields: `id`, `user_id`, `deal_id`, `person_id`, `org_id`, `content`, `add_time`, `update_time`.",
      "start_date": "The date in format of YYYY-MM-DD from which notes to fetch",
      "end_date": "The date in format of YYYY-MM-DD until which notes to fetch to",
      "updated_since": "If set, only notes with an `update_time` later than or equal to this time are returned. In RFC3339 format, e.g. 2025-01-01T10:20:00Z.",
      "pinned_to_lead_flag": "If set, the results are filtered by note to lead pinning state",
      "pinned_to_deal_flag": "If set, the results are filtered by note to deal pinning state",
      "pinned_to_organization_flag": "If set, the results are filtered by note to organization pinning state",
      "pinned_to_person_flag": "If set, the results are filtered by note to person pinning state",
      "pinned_to_project_flag": "If set, the results are filtered by note to project pinning state",
      "pinned_to_task_flag": "If set, the results are filtered by note to task pinning state"
    }
  },
  "addNote": {
    "accessPath": [
      "addNote"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "content",
      "lead_id",
      "deal_id",
      "person_id",
      "org_id",
      "project_id",
      "task_id",
      "user_id",
      "add_time",
      "pinned_to_lead_flag",
      "pinned_to_deal_flag",
      "pinned_to_organization_flag",
      "pinned_to_person_flag",
      "pinned_to_project_flag",
      "pinned_to_task_flag"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/notes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a note"
  },
  "deleteNote": {
    "accessPath": [
      "deleteNote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/notes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a note",
    "parameterDescriptions": {
      "id": "The ID of the note"
    }
  },
  "getNote": {
    "accessPath": [
      "getNote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/notes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one note",
    "parameterDescriptions": {
      "id": "The ID of the note"
    }
  },
  "updateNote": {
    "accessPath": [
      "updateNote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "content",
      "lead_id",
      "deal_id",
      "person_id",
      "org_id",
      "project_id",
      "task_id",
      "user_id",
      "add_time",
      "pinned_to_lead_flag",
      "pinned_to_deal_flag",
      "pinned_to_organization_flag",
      "pinned_to_person_flag",
      "pinned_to_project_flag",
      "pinned_to_task_flag"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/notes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a note",
    "parameterDescriptions": {
      "id": "The ID of the note"
    }
  },
  "getNoteComments": {
    "accessPath": [
      "getNoteComments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/notes/{id}/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "Get all comments for a note",
    "parameterDescriptions": {
      "id": "The ID of the note",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "addNoteComment": {
    "accessPath": [
      "addNoteComment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "content"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/notes/{id}/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a comment to a note",
    "parameterDescriptions": {
      "id": "The ID of the note"
    }
  },
  "getComment": {
    "accessPath": [
      "getComment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/notes/{id}/comments/{commentId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "commentId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one comment",
    "parameterDescriptions": {
      "id": "The ID of the note",
      "commentId": "The ID of the comment"
    }
  },
  "updateCommentForNote": {
    "accessPath": [
      "updateCommentForNote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "content"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/notes/{id}/comments/{commentId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "commentId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a comment related to a note",
    "parameterDescriptions": {
      "id": "The ID of the note",
      "commentId": "The ID of the comment"
    }
  },
  "deleteComment": {
    "accessPath": [
      "deleteComment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/notes/{id}/comments/{commentId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "commentId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a comment related to a note",
    "parameterDescriptions": {
      "id": "The ID of the note",
      "commentId": "The ID of the comment"
    }
  },
  "getNoteFields": {
    "accessPath": [
      "getNoteFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/noteFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all note fields"
  },
  "authorize": {
    "accessPath": [
      "authorize"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/oauth/authorize",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "client_id",
      "redirect_uri",
      "state"
    ],
    "description": "Requesting authorization",
    "parameterDescriptions": {
      "client_id": "The client ID provided to you by the Pipedrive Marketplace when you register your app",
      "redirect_uri": "The callback URL you provided when you registered your app. Authorization code will be sent to that URL (if it matches with the value you entered in the registration form) if a user approves the app install. Or, if a customer declines, the corresponding error will also be sent to this URL.",
      "state": "You may pass any random string as the state parameter and the same string will be returned to your app after a user authorizes access. It may be used to store the user's session ID from your app or distinguish different responses. Using state may increase security; see RFC-6749.\n"
    }
  },
  "get-tokens": {
    "accessPath": [
      "getTokens"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "grant_type",
      "code",
      "redirect_uri"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Authorization"
    ],
    "method": "POST",
    "routeTemplate": "/v1/oauth/token",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Getting the tokens",
    "parameterDescriptions": {
      "Authorization": "Base 64 encoded string containing the `client_id` and `client_secret` values. The header value should be `Basic <base64(client_id:client_secret)>`."
    }
  },
  "refresh-tokens": {
    "accessPath": [
      "refreshTokens"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "grant_type",
      "code",
      "redirect_uri"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Authorization"
    ],
    "method": "POST",
    "routeTemplate": "/v1/oauth/token/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Getting the tokens",
    "parameterDescriptions": {
      "Authorization": "Base 64 encoded string containing the `client_id` and `client_secret` values. The header value should be `Basic <base64(client_id:client_secret)>`."
    }
  },
  "getOrganizationChangelog": {
    "accessPath": [
      "getOrganizationChangelog"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organizations/{id}/changelog",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "limit"
    ],
    "description": "List updates about organization field values",
    "parameterDescriptions": {
      "id": "The ID of the organization",
      "cursor": "For pagination, the marker (an opaque string value) representing the first item on the next page",
      "limit": "Items shown per page"
    }
  },
  "getOrganizationFiles": {
    "accessPath": [
      "getOrganizationFiles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organizations/{id}/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit",
      "sort"
    ],
    "description": "List files attached to an organization",
    "parameterDescriptions": {
      "id": "The ID of the organization",
      "start": "Pagination start",
      "limit": "Items shown per page. Please note that a maximum value of 100 is allowed.",
      "sort": "Supported fields: `id`, `update_time`"
    }
  },
  "getOrganizationUpdates": {
    "accessPath": [
      "getOrganizationUpdates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organizations/{id}/flow",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit",
      "all_changes",
      "items"
    ],
    "description": "List updates about an organization",
    "parameterDescriptions": {
      "id": "The ID of the organization",
      "start": "Pagination start",
      "limit": "Items shown per page",
      "all_changes": "Whether to show custom field updates or not. 1 = Include custom field changes. If omitted, returns changes without custom field updates.",
      "items": "A comma-separated string for filtering out item specific updates. (Possible values - activity, plannedActivity, note, file, change, deal, follower, participant, mailMessage, mailMessageWithAttachment, invoice, activityFile, document)."
    }
  },
  "getOrganizationFollowers": {
    "accessPath": [
      "getOrganizationFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organizations/{id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List followers of an organization",
    "parameterDescriptions": {
      "id": "The ID of the organization"
    }
  },
  "addOrganizationFollower": {
    "accessPath": [
      "addOrganizationFollower"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organizations/{id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a follower to an organization",
    "parameterDescriptions": {
      "id": "The ID of the organization"
    }
  },
  "deleteOrganizationFollower": {
    "accessPath": [
      "deleteOrganizationFollower"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organizations/{id}/followers/{follower_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "follower_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a follower from an organization",
    "parameterDescriptions": {
      "id": "The ID of the organization",
      "follower_id": "The ID of the relationship between the follower and the organization"
    }
  },
  "getOrganizationMailMessages": {
    "accessPath": [
      "getOrganizationMailMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organizations/{id}/mailMessages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "List mail messages associated with an organization",
    "parameterDescriptions": {
      "id": "The ID of the organization",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "mergeOrganizations": {
    "accessPath": [
      "mergeOrganizations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "merge_with_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/organizations/{id}/merge",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Merge two organizations",
    "parameterDescriptions": {
      "id": "The ID of the organization"
    }
  },
  "getOrganizationUsers": {
    "accessPath": [
      "getOrganizationUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organizations/{id}/permittedUsers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List permitted users",
    "parameterDescriptions": {
      "id": "The ID of the organization"
    }
  },
  "getOrganizationFields": {
    "accessPath": [
      "getOrganizationFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organizationFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "Get all organization fields",
    "parameterDescriptions": {
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "addOrganizationField": {
    "accessPath": [
      "addOrganizationField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "options",
      "add_visible_flag",
      "field_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organizationFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a new organization field"
  },
  "deleteOrganizationFields": {
    "accessPath": [
      "deleteOrganizationFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organizationFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids"
    ],
    "description": "Delete multiple organization fields in bulk",
    "parameterDescriptions": {
      "ids": "The comma-separated field IDs to delete"
    }
  },
  "getOrganizationField": {
    "accessPath": [
      "getOrganizationField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organizationFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one organization field",
    "parameterDescriptions": {
      "id": "The ID of the field"
    }
  },
  "deleteOrganizationField": {
    "accessPath": [
      "deleteOrganizationField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organizationFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an organization field",
    "parameterDescriptions": {
      "id": "The ID of the field"
    }
  },
  "updateOrganizationField": {
    "accessPath": [
      "updateOrganizationField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "options",
      "add_visible_flag"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/organizationFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an organization field",
    "parameterDescriptions": {
      "id": "The ID of the field"
    }
  },
  "getOrganizationRelationships": {
    "accessPath": [
      "getOrganizationRelationships"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organizationRelationships",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "org_id"
    ],
    "description": "Get all relationships for organization",
    "parameterDescriptions": {
      "org_id": "The ID of the organization to get relationships for"
    }
  },
  "addOrganizationRelationship": {
    "accessPath": [
      "addOrganizationRelationship"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "org_id",
      "type",
      "rel_owner_org_id",
      "rel_linked_org_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organizationRelationships",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an organization relationship"
  },
  "deleteOrganizationRelationship": {
    "accessPath": [
      "deleteOrganizationRelationship"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organizationRelationships/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an organization relationship",
    "parameterDescriptions": {
      "id": "The ID of the organization relationship"
    }
  },
  "getOrganizationRelationship": {
    "accessPath": [
      "getOrganizationRelationship"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organizationRelationships/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "org_id"
    ],
    "description": "Get one organization relationship",
    "parameterDescriptions": {
      "id": "The ID of the organization relationship",
      "org_id": "The ID of the base organization for the returned calculated values"
    }
  },
  "updateOrganizationRelationship": {
    "accessPath": [
      "updateOrganizationRelationship"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "org_id",
      "type",
      "rel_owner_org_id",
      "rel_linked_org_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/organizationRelationships/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an organization relationship",
    "parameterDescriptions": {
      "id": "The ID of the organization relationship"
    }
  },
  "getPermissionSets": {
    "accessPath": [
      "getPermissionSets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/permissionSets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "app"
    ],
    "description": "Get all permission sets",
    "parameterDescriptions": {
      "app": "The app to filter the permission sets by"
    }
  },
  "getPermissionSet": {
    "accessPath": [
      "getPermissionSet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/permissionSets/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one permission set",
    "parameterDescriptions": {
      "id": "The ID of the permission set"
    }
  },
  "getPermissionSetAssignments": {
    "accessPath": [
      "getPermissionSetAssignments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/permissionSets/{id}/assignments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "List permission set assignments",
    "parameterDescriptions": {
      "id": "The ID of the permission set",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "getPersonChangelog": {
    "accessPath": [
      "getPersonChangelog"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/persons/{id}/changelog",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "limit"
    ],
    "description": "List updates about person field values",
    "parameterDescriptions": {
      "id": "The ID of the person",
      "cursor": "For pagination, the marker (an opaque string value) representing the first item on the next page",
      "limit": "Items shown per page"
    }
  },
  "getPersonFiles": {
    "accessPath": [
      "getPersonFiles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/persons/{id}/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit",
      "sort"
    ],
    "description": "List files attached to a person",
    "parameterDescriptions": {
      "id": "The ID of the person",
      "start": "Pagination start",
      "limit": "Items shown per page. Please note that a maximum value of 100 is allowed.",
      "sort": "Supported fields: `id`, `update_time`"
    }
  },
  "getPersonUpdates": {
    "accessPath": [
      "getPersonUpdates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/persons/{id}/flow",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit",
      "all_changes",
      "items"
    ],
    "description": "List updates about a person",
    "parameterDescriptions": {
      "id": "The ID of the person",
      "start": "Pagination start",
      "limit": "Items shown per page",
      "all_changes": "Whether to show custom field updates or not. 1 = Include custom field changes. If omitted returns changes without custom field updates.",
      "items": "A comma-separated string for filtering out item specific updates. (Possible values - call, activity, plannedActivity, change, note, deal, file, dealChange, personChange, organizationChange, follower, dealFollower, personFollower, organizationFollower, participant, comment, mailMessage, mailMessageWithAttachment, invoice, document, marketing_campaign_stat, marketing_status_change)."
    }
  },
  "getPersonFollowers": {
    "accessPath": [
      "getPersonFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/persons/{id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List followers of a person",
    "parameterDescriptions": {
      "id": "The ID of the person"
    }
  },
  "addPersonFollower": {
    "accessPath": [
      "addPersonFollower"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/persons/{id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a follower to a person",
    "parameterDescriptions": {
      "id": "The ID of the person"
    }
  },
  "deletePersonFollower": {
    "accessPath": [
      "deletePersonFollower"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/persons/{id}/followers/{follower_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "follower_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a follower from a person",
    "parameterDescriptions": {
      "id": "The ID of the person",
      "follower_id": "The ID of the relationship between the follower and the person"
    }
  },
  "getPersonMailMessages": {
    "accessPath": [
      "getPersonMailMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/persons/{id}/mailMessages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "List mail messages associated with a person",
    "parameterDescriptions": {
      "id": "The ID of the person",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "mergePersons": {
    "accessPath": [
      "mergePersons"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "merge_with_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/persons/{id}/merge",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Merge two persons",
    "parameterDescriptions": {
      "id": "The ID of the person"
    }
  },
  "getPersonUsers": {
    "accessPath": [
      "getPersonUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/persons/{id}/permittedUsers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List permitted users",
    "parameterDescriptions": {
      "id": "The ID of the person"
    }
  },
  "deletePersonPicture": {
    "accessPath": [
      "deletePersonPicture"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/persons/{id}/picture",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete person picture",
    "parameterDescriptions": {
      "id": "The ID of the person"
    }
  },
  "addPersonPicture": {
    "accessPath": [
      "addPersonPicture"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "crop_x",
      "crop_y",
      "crop_width",
      "crop_height"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/persons/{id}/picture",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add person picture",
    "parameterDescriptions": {
      "id": "The ID of the person"
    }
  },
  "getPersonProducts": {
    "accessPath": [
      "getPersonProducts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/persons/{id}/products",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "List products associated with a person",
    "parameterDescriptions": {
      "id": "The ID of the person",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "getPersonFields": {
    "accessPath": [
      "getPersonFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/personFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "Get all person fields",
    "parameterDescriptions": {
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "addPersonField": {
    "accessPath": [
      "addPersonField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "options",
      "add_visible_flag",
      "field_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/personFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a new person field"
  },
  "deletePersonFields": {
    "accessPath": [
      "deletePersonFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/personFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids"
    ],
    "description": "Delete multiple person fields in bulk",
    "parameterDescriptions": {
      "ids": "The comma-separated field IDs to delete"
    }
  },
  "getPersonField": {
    "accessPath": [
      "getPersonField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/personFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one person field",
    "parameterDescriptions": {
      "id": "The ID of the field"
    }
  },
  "deletePersonField": {
    "accessPath": [
      "deletePersonField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/personFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a person field",
    "parameterDescriptions": {
      "id": "The ID of the field"
    }
  },
  "updatePersonField": {
    "accessPath": [
      "updatePersonField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "options",
      "add_visible_flag"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/personFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a person field",
    "parameterDescriptions": {
      "id": "The ID of the field"
    }
  },
  "getPipelineConversionStatistics": {
    "accessPath": [
      "getPipelineConversionStatistics"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/pipelines/{id}/conversion_statistics",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_date",
      "end_date",
      "user_id"
    ],
    "description": "Get deals conversion rates in pipeline",
    "parameterDescriptions": {
      "id": "The ID of the pipeline",
      "start_date": "The start of the period. Date in format of YYYY-MM-DD.",
      "end_date": "The end of the period. Date in format of YYYY-MM-DD.",
      "user_id": "The ID of the user who's pipeline metrics statistics to fetch. If omitted, the authorized user will be used."
    }
  },
  "getPipelineDeals": {
    "accessPath": [
      "getPipelineDeals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/pipelines/{id}/deals",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter_id",
      "user_id",
      "everyone",
      "stage_id",
      "start",
      "limit",
      "get_summary",
      "totals_convert_currency"
    ],
    "description": "Get deals in a pipeline",
    "parameterDescriptions": {
      "id": "The ID of the pipeline",
      "filter_id": "If supplied, only deals matching the given filter will be returned",
      "user_id": "If supplied, `filter_id` will not be considered and only deals owned by the given user will be returned. If omitted, deals owned by the authorized user will be returned.",
      "everyone": "If supplied, `filter_id` and `user_id` will not be considered – instead, deals owned by everyone will be returned",
      "stage_id": "If supplied, only deals within the given stage will be returned",
      "start": "Pagination start",
      "limit": "Items shown per page",
      "get_summary": "Whether to include a summary of the pipeline in the `additional_data` or not",
      "totals_convert_currency": "The 3-letter currency code of any of the supported currencies. When supplied, `per_stages_converted` is returned inside `deals_summary` inside `additional_data` which contains the currency-converted total amounts in the given currency per each stage. You may also set this parameter to `default_currency` in which case users default currency is used. Only works when `get_summary` parameter flag is enabled."
    }
  },
  "getPipelineMovementStatistics": {
    "accessPath": [
      "getPipelineMovementStatistics"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/pipelines/{id}/movement_statistics",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_date",
      "end_date",
      "user_id"
    ],
    "description": "Get deals movements in pipeline",
    "parameterDescriptions": {
      "id": "The ID of the pipeline",
      "start_date": "The start of the period. Date in format of YYYY-MM-DD.",
      "end_date": "The end of the period. Date in format of YYYY-MM-DD.",
      "user_id": "The ID of the user who's pipeline statistics to fetch. If omitted, the authorized user will be used."
    }
  },
  "getProductDeals": {
    "accessPath": [
      "getProductDeals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/products/{id}/deals",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit",
      "status"
    ],
    "description": "Get deals where a product is attached to",
    "parameterDescriptions": {
      "id": "The ID of the product",
      "start": "Pagination start",
      "limit": "Items shown per page",
      "status": "Only fetch deals with a specific status. If omitted, all not deleted deals are returned. If set to deleted, deals that have been deleted up to 30 days ago will be included."
    }
  },
  "getProductFiles": {
    "accessPath": [
      "getProductFiles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/products/{id}/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit",
      "sort"
    ],
    "description": "List files attached to a product",
    "parameterDescriptions": {
      "id": "The ID of the product",
      "start": "Pagination start",
      "limit": "Items shown per page. Please note that a maximum value of 100 is allowed.",
      "sort": "Supported fields: `id`, `update_time`"
    }
  },
  "getProductFollowers": {
    "accessPath": [
      "getProductFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/products/{id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "List followers of a product",
    "parameterDescriptions": {
      "id": "The ID of the product",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "addProductFollower": {
    "accessPath": [
      "addProductFollower"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/products/{id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a follower to a product",
    "parameterDescriptions": {
      "id": "The ID of the product"
    }
  },
  "deleteProductFollower": {
    "accessPath": [
      "deleteProductFollower"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/products/{id}/followers/{follower_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "follower_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a follower from a product",
    "parameterDescriptions": {
      "id": "The ID of the product",
      "follower_id": "The ID of the relationship between the follower and the product"
    }
  },
  "getProductUsers": {
    "accessPath": [
      "getProductUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/products/{id}/permittedUsers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List permitted users",
    "parameterDescriptions": {
      "id": "The ID of the product"
    }
  },
  "deleteProductFields": {
    "accessPath": [
      "deleteProductFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/productFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids"
    ],
    "description": "Delete multiple product fields in bulk",
    "parameterDescriptions": {
      "ids": "The comma-separated field IDs to delete"
    }
  },
  "getProductFields": {
    "accessPath": [
      "getProductFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/productFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "Get all product fields",
    "parameterDescriptions": {
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "addProductField": {
    "accessPath": [
      "addProductField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "options",
      "field_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/productFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a new product field"
  },
  "deleteProductField": {
    "accessPath": [
      "deleteProductField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/productFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a product field",
    "parameterDescriptions": {
      "id": "The ID of the product field"
    }
  },
  "getProductField": {
    "accessPath": [
      "getProductField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/productFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one product field",
    "parameterDescriptions": {
      "id": "The ID of the product field"
    }
  },
  "updateProductField": {
    "accessPath": [
      "updateProductField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/productFields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a product field",
    "parameterDescriptions": {
      "id": "The ID of the product field"
    }
  },
  "getProjects": {
    "accessPath": [
      "getProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "limit",
      "filter_id",
      "status",
      "phase_id",
      "include_archived"
    ],
    "description": "Get all projects",
    "parameterDescriptions": {
      "cursor": "For pagination, the marker (an opaque string value) representing the first item on the next page",
      "limit": "For pagination, the limit of entries to be returned. If not provided, 100 items will be returned.",
      "filter_id": "The ID of the filter to use",
      "status": "If supplied, includes only projects with the specified statuses. Possible values are `open`, `completed`, `canceled` and `deleted`. By default `deleted` projects are not returned.",
      "phase_id": "If supplied, only projects in specified phase are returned",
      "include_archived": "If supplied with `true` then archived projects are also included in the response. By default only not archived projects are returned."
    }
  },
  "addProject": {
    "accessPath": [
      "addProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "board_id",
      "phase_id",
      "description",
      "status",
      "owner_id",
      "start_date",
      "end_date",
      "deal_ids",
      "org_id",
      "person_id",
      "labels",
      "health_status",
      "template_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a project"
  },
  "getProject": {
    "accessPath": [
      "getProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get details of a project",
    "parameterDescriptions": {
      "id": "The ID of the project"
    }
  },
  "updateProject": {
    "accessPath": [
      "updateProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "board_id",
      "phase_id",
      "description",
      "status",
      "owner_id",
      "start_date",
      "end_date",
      "deal_ids",
      "org_id",
      "person_id",
      "labels",
      "health_status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/projects/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a project",
    "parameterDescriptions": {
      "id": "The ID of the project"
    }
  },
  "deleteProject": {
    "accessPath": [
      "deleteProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/projects/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a project",
    "parameterDescriptions": {
      "id": "The ID of the project"
    }
  },
  "archiveProject": {
    "accessPath": [
      "archiveProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/projects/{id}/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive a project",
    "parameterDescriptions": {
      "id": "The ID of the project"
    }
  },
  "getProjectPlan": {
    "accessPath": [
      "getProjectPlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/{id}/plan",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns project plan",
    "parameterDescriptions": {
      "id": "The ID of the project"
    }
  },
  "putProjectPlanActivity": {
    "accessPath": [
      "putProjectPlanActivity"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "phase_id",
      "group_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/projects/{id}/plan/activities/{activityId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "activityId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update activity in project plan",
    "parameterDescriptions": {
      "id": "The ID of the project",
      "activityId": "The ID of the activity"
    }
  },
  "putProjectPlanTask": {
    "accessPath": [
      "putProjectPlanTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "phase_id",
      "group_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/projects/{id}/plan/tasks/{taskId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "taskId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update task in project plan",
    "parameterDescriptions": {
      "id": "The ID of the project",
      "taskId": "The ID of the task"
    }
  },
  "getProjectGroups": {
    "accessPath": [
      "getProjectGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/{id}/groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns project groups",
    "parameterDescriptions": {
      "id": "The ID of the project"
    }
  },
  "getProjectTasks": {
    "accessPath": [
      "getProjectTasks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/{id}/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns project tasks",
    "parameterDescriptions": {
      "id": "The ID of the project"
    }
  },
  "getProjectActivities": {
    "accessPath": [
      "getProjectActivities"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/{id}/activities",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns project activities",
    "parameterDescriptions": {
      "id": "The ID of the project"
    }
  },
  "getProjectsBoards": {
    "accessPath": [
      "getProjectsBoards"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/boards",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all project boards"
  },
  "getProjectsBoard": {
    "accessPath": [
      "getProjectsBoard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/boards/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get details of a board",
    "parameterDescriptions": {
      "id": "The ID of the project board"
    }
  },
  "getProjectsPhases": {
    "accessPath": [
      "getProjectsPhases"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/phases",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "board_id"
    ],
    "description": "Get project phases",
    "parameterDescriptions": {
      "board_id": "ID of the board for which phases are requested"
    }
  },
  "getProjectsPhase": {
    "accessPath": [
      "getProjectsPhase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/phases/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get details of a phase",
    "parameterDescriptions": {
      "id": "The ID of the project phase"
    }
  },
  "getProjectTemplates": {
    "accessPath": [
      "getProjectTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projectTemplates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "limit"
    ],
    "description": "Get all project templates",
    "parameterDescriptions": {
      "cursor": "For pagination, the marker (an opaque string value) representing the first item on the next page",
      "limit": "For pagination, the limit of entries to be returned. If not provided, up to 500 items will be returned."
    }
  },
  "getProjectTemplate": {
    "accessPath": [
      "getProjectTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projectTemplates/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get details of a template",
    "parameterDescriptions": {
      "id": "The ID of the project template"
    }
  },
  "getRecents": {
    "accessPath": [
      "getRecents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/recents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "since_timestamp",
      "items",
      "start",
      "limit"
    ],
    "description": "Get recents",
    "parameterDescriptions": {
      "since_timestamp": "The timestamp in UTC. Format: YYYY-MM-DD HH:MM:SS.",
      "items": "Multiple selection of item types to include in the query (optional)",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "getRoles": {
    "accessPath": [
      "getRoles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "Get all roles",
    "parameterDescriptions": {
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "addRole": {
    "accessPath": [
      "addRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "parent_role_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a role"
  },
  "deleteRole": {
    "accessPath": [
      "deleteRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/roles/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a role",
    "parameterDescriptions": {
      "id": "The ID of the role"
    }
  },
  "getRole": {
    "accessPath": [
      "getRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/roles/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one role",
    "parameterDescriptions": {
      "id": "The ID of the role"
    }
  },
  "updateRole": {
    "accessPath": [
      "updateRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "parent_role_id",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/roles/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update role details",
    "parameterDescriptions": {
      "id": "The ID of the role"
    }
  },
  "deleteRoleAssignment": {
    "accessPath": [
      "deleteRoleAssignment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/roles/{id}/assignments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a role assignment",
    "parameterDescriptions": {
      "id": "The ID of the role"
    }
  },
  "getRoleAssignments": {
    "accessPath": [
      "getRoleAssignments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/roles/{id}/assignments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "List role assignments",
    "parameterDescriptions": {
      "id": "The ID of the role",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "addRoleAssignment": {
    "accessPath": [
      "addRoleAssignment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/roles/{id}/assignments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add role assignment",
    "parameterDescriptions": {
      "id": "The ID of the role"
    }
  },
  "getRoleSettings": {
    "accessPath": [
      "getRoleSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/roles/{id}/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List role settings",
    "parameterDescriptions": {
      "id": "The ID of the role"
    }
  },
  "addOrUpdateRoleSetting": {
    "accessPath": [
      "addOrUpdateRoleSetting"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "setting_key",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/roles/{id}/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add or update role setting",
    "parameterDescriptions": {
      "id": "The ID of the role"
    }
  },
  "getRolePipelines": {
    "accessPath": [
      "getRolePipelines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/roles/{id}/pipelines",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "visible"
    ],
    "description": "List pipeline visibility for a role",
    "parameterDescriptions": {
      "id": "The ID of the role",
      "visible": "Whether to return the visible or hidden pipelines for the role"
    }
  },
  "updateRolePipelines": {
    "accessPath": [
      "updateRolePipelines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "visible_pipeline_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/roles/{id}/pipelines",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update pipeline visibility for a role",
    "parameterDescriptions": {
      "id": "The ID of the role"
    }
  },
  "getStageDeals": {
    "accessPath": [
      "getStageDeals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/stages/{id}/deals",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter_id",
      "user_id",
      "everyone",
      "start",
      "limit"
    ],
    "description": "Get deals in a stage",
    "parameterDescriptions": {
      "id": "The ID of the stage",
      "filter_id": "If supplied, only deals matching the given filter will be returned",
      "user_id": "If supplied, `filter_id` will not be considered and only deals owned by the given user will be returned. If omitted, deals owned by the authorized user will be returned.",
      "everyone": "If supplied, `filter_id` and `user_id` will not be considered – instead, deals owned by everyone will be returned",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "getTasks": {
    "accessPath": [
      "getTasks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "limit",
      "assignee_id",
      "project_id",
      "parent_task_id",
      "done"
    ],
    "description": "Get all tasks",
    "parameterDescriptions": {
      "cursor": "For pagination, the marker (an opaque string value) representing the first item on the next page",
      "limit": "For pagination, the limit of entries to be returned. If not provided, up to 500 items will be returned.",
      "assignee_id": "If supplied, only tasks that are assigned to this user are returned",
      "project_id": "If supplied, only tasks that are assigned to this project are returned",
      "parent_task_id": "If `null` is supplied then only parent tasks are returned. If integer is supplied then only subtasks of a specific task are returned. By default all tasks are returned.",
      "done": "Whether the task is done or not. `0` = Not done, `1` = Done. If not omitted then returns both done and not done tasks."
    }
  },
  "addTask": {
    "accessPath": [
      "addTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "project_id",
      "description",
      "parent_task_id",
      "assignee_id",
      "assignee_ids",
      "done",
      "due_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a task"
  },
  "getTask": {
    "accessPath": [
      "getTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tasks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get details of a task",
    "parameterDescriptions": {
      "id": "The ID of the task"
    }
  },
  "updateTask": {
    "accessPath": [
      "updateTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "project_id",
      "description",
      "parent_task_id",
      "assignee_id",
      "assignee_ids",
      "done",
      "due_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/tasks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a task",
    "parameterDescriptions": {
      "id": "The ID of the task"
    }
  },
  "deleteTask": {
    "accessPath": [
      "deleteTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/tasks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a task",
    "parameterDescriptions": {
      "id": "The ID of the task"
    }
  },
  "getUsers": {
    "accessPath": [
      "getUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all users"
  },
  "addUser": {
    "accessPath": [
      "addUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "access",
      "active_flag"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a new user"
  },
  "findUsersByName": {
    "accessPath": [
      "findUsersByName"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/users/find",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "term",
      "search_by_email"
    ],
    "description": "Find users by name",
    "parameterDescriptions": {
      "term": "The search term to look for",
      "search_by_email": "When enabled, the term will only be matched against email addresses of users. Default: `false`."
    }
  },
  "getCurrentUser": {
    "accessPath": [
      "getCurrentUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/users/me",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get current user data"
  },
  "getUser": {
    "accessPath": [
      "getUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/users/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get one user",
    "parameterDescriptions": {
      "id": "The ID of the user"
    }
  },
  "updateUser": {
    "accessPath": [
      "updateUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active_flag"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/users/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update user details",
    "parameterDescriptions": {
      "id": "The ID of the user"
    }
  },
  "getUserFollowers": {
    "accessPath": [
      "getUserFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/users/{id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List followers of a user",
    "parameterDescriptions": {
      "id": "The ID of the user"
    }
  },
  "getUserPermissions": {
    "accessPath": [
      "getUserPermissions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/users/{id}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List user permissions",
    "parameterDescriptions": {
      "id": "The ID of the user"
    }
  },
  "getUserRoleAssignments": {
    "accessPath": [
      "getUserRoleAssignments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/users/{id}/roleAssignments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start",
      "limit"
    ],
    "description": "List role assignments",
    "parameterDescriptions": {
      "id": "The ID of the user",
      "start": "Pagination start",
      "limit": "Items shown per page"
    }
  },
  "getUserRoleSettings": {
    "accessPath": [
      "getUserRoleSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/users/{id}/roleSettings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List user role settings",
    "parameterDescriptions": {
      "id": "The ID of the user"
    }
  },
  "getUserConnections": {
    "accessPath": [
      "getUserConnections"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/userConnections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all user connections"
  },
  "getUserSettings": {
    "accessPath": [
      "getUserSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/userSettings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List settings of an authorized user"
  },
  "getWebhooks": {
    "accessPath": [
      "getWebhooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all Webhooks"
  },
  "addWebhook": {
    "accessPath": [
      "addWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "subscription_url",
      "event_action",
      "event_object",
      "name",
      "user_id",
      "http_auth_user",
      "http_auth_password",
      "version"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new Webhook"
  },
  "deleteWebhook": {
    "accessPath": [
      "deleteWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/webhooks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete existing Webhook",
    "parameterDescriptions": {
      "id": "The ID of the Webhook to delete"
    }
  }
} satisfies ToolRuntimeMetadataMap;
