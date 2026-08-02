import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "GET_access_settings-activity": {
    "accessPath": [
      "getAccessSettingsActivity"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/access_settings/activity",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit"
    ],
    "description": "Retrieve all recent access attempts",
    "parameterDescriptions": {
      "limit": "Limits the number of IPs to return."
    }
  },
  "DELETE_access_settings-whitelist": {
    "accessPath": [
      "deleteAccessSettingsWhitelist"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/access_settings/whitelist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove one or more IPs from the allow list"
  },
  "GET_access_settings-whitelist": {
    "accessPath": [
      "getAccessSettingsWhitelist"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/access_settings/whitelist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a list of currently allowed IPs"
  },
  "POST_access_settings-whitelist": {
    "accessPath": [
      "postAccessSettingsWhitelist"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ips"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/access_settings/whitelist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add one or more IPs to the allow list"
  },
  "DELETE_access_settings-whitelist-rule_id": {
    "accessPath": [
      "deleteAccessSettingsWhitelistRuleId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/access_settings/whitelist/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove a specific IP from the allowed list"
  },
  "GET_access_settings-whitelist-rule_id": {
    "accessPath": [
      "getAccessSettingsWhitelistRuleId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/access_settings/whitelist/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a specific allowed IP"
  },
  "GET_alerts": {
    "accessPath": [
      "getAlerts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Authorization",
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/alerts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all alerts"
  },
  "POST_alerts": {
    "accessPath": [
      "postAlerts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_to",
      "frequency",
      "percentage",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Authorization",
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/alerts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new Alert"
  },
  "DELETE_alerts-alert_id": {
    "accessPath": [
      "deleteAlertsAlertId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/alerts/{alert_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "alert_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an alert"
  },
  "GET_alerts-alert_id": {
    "accessPath": [
      "getAlertsAlertId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Authorization",
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/alerts/{alert_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "alert_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a specific alert"
  },
  "PATCH_alerts-alert_id": {
    "accessPath": [
      "patchAlertsAlertId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_to",
      "frequency",
      "percentage"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/alerts/{alert_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "alert_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an alert"
  },
  "GET_api_keys": {
    "accessPath": [
      "getApiKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/api_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit"
    ],
    "description": "Retrieve all API Keys belonging to the authenticated user"
  },
  "create-api-keys": {
    "accessPath": [
      "createApiKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "scopes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/api_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create API keys"
  },
  "DELETE_api_keys-api_key_id": {
    "accessPath": [
      "deleteApiKeysApiKeyId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/api_keys/{api_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "api_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete API keys"
  },
  "GET_api_keys-api_key_id": {
    "accessPath": [
      "getApiKeysApiKeyId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/api_keys/{api_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "api_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an existing API Key"
  },
  "PATCH_api_keys-api_key_id": {
    "accessPath": [
      "patchApiKeysApiKeyId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/api_keys/{api_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "api_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update API key name"
  },
  "PUT_api_keys-api_key_id": {
    "accessPath": [
      "putApiKeysApiKeyId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "scopes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PUT",
    "routeTemplate": "/v3/api_keys/{api_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "api_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update API key name and scopes"
  },
  "GET_asm-groups": {
    "accessPath": [
      "getAsmGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/asm/groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "id"
    ],
    "description": "Retrieve all suppression groups associated with the user."
  },
  "POST_asm-groups": {
    "accessPath": [
      "postAsmGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "is_default",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/asm/groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new suppression group"
  },
  "DELETE_asm-groups-group_id": {
    "accessPath": [
      "deleteAsmGroupsGroupId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/asm/groups/{group_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Suppression Group"
  },
  "GET_asm-groups-group_id": {
    "accessPath": [
      "getAsmGroupsGroupId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/asm/groups/{group_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get information on a single suppression group."
  },
  "PATCH_asm-groups-group_id": {
    "accessPath": [
      "patchAsmGroupsGroupId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "is_default",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/asm/groups/{group_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a suppression group."
  },
  "GET_asm-groups-group_id-suppressions": {
    "accessPath": [
      "getAsmGroupsGroupIdSuppressions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/asm/groups/{group_id}/suppressions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all suppressions for a suppression group"
  },
  "POST_asm-groups-group_id-suppressions": {
    "accessPath": [
      "postAsmGroupsGroupIdSuppressions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "recipient_emails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/asm/groups/{group_id}/suppressions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add suppressions to a suppression group"
  },
  "POST_asm-groups-group_id-suppressions-search": {
    "accessPath": [
      "postAsmGroupsGroupIdSuppressionsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "recipient_emails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/asm/groups/{group_id}/suppressions/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search for suppressions within a group"
  },
  "DELETE_asm-groups-group_id-suppressions-email": {
    "accessPath": [
      "deleteAsmGroupsGroupIdSuppressionsEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/asm/groups/{group_id}/suppressions/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id",
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a suppression from a suppression group"
  },
  "GET_asm-suppressions": {
    "accessPath": [
      "getAsmSuppressions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/asm/suppressions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all suppressions"
  },
  "POST_asm-suppressions-global": {
    "accessPath": [
      "postAsmSuppressionsGlobal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "recipient_emails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/asm/suppressions/global",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add recipient addresses to the global suppression group."
  },
  "DELETE_asm-suppressions-global-email": {
    "accessPath": [
      "deleteAsmSuppressionsGlobalEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/asm/suppressions/global/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Global Suppression"
  },
  "GET_asm-suppressions-global-email": {
    "accessPath": [
      "getAsmSuppressionsGlobalEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/asm/suppressions/global/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a Global Suppression"
  },
  "GET_asm-suppressions-email": {
    "accessPath": [
      "getAsmSuppressionsEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/asm/suppressions/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all suppression groups for an email address"
  },
  "GET_browsers-stats": {
    "accessPath": [
      "getBrowsersStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/browsers/stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "browsers",
      "limit",
      "offset",
      "aggregated_by",
      "start_date",
      "end_date"
    ],
    "description": "Retrieve email statistics by browser.",
    "parameterDescriptions": {
      "browsers": "The browsers to get statistics for. You can include up to 10 different browsers by including this parameter multiple times.",
      "limit": "The number of results to return.",
      "offset": "The point in the list to begin retrieving results.",
      "aggregated_by": "How to group the statistics. Must be either \"day\", \"week\", or \"month\".",
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.",
      "end_date": "The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD."
    }
  },
  "GET_campaigns": {
    "accessPath": [
      "getCampaigns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/campaigns",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "Retrieve all Campaigns",
    "parameterDescriptions": {
      "limit": "The number of results you would like to receive at a time.",
      "offset": "The index of the first campaign to return, where 0 is the first campaign."
    }
  },
  "POST_campaigns": {
    "accessPath": [
      "postCampaigns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "categories",
      "custom_unsubscribe_url",
      "editor",
      "html_content",
      "ip_pool",
      "list_ids",
      "plain_content",
      "segment_ids",
      "sender_id",
      "subject",
      "suppression_group_id",
      "title"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/campaigns",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Campaign"
  },
  "DELETE_campaigns-campaign_id": {
    "accessPath": [
      "deleteCampaignsCampaignId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/campaigns/{campaign_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "campaign_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Campaign"
  },
  "GET_campaigns-campaign_id": {
    "accessPath": [
      "getCampaignsCampaignId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/campaigns/{campaign_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "campaign_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a single campaign"
  },
  "PATCH_campaigns-campaign_id": {
    "accessPath": [
      "patchCampaignsCampaignId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "categories",
      "html_content",
      "plain_content",
      "subject",
      "title"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/campaigns/{campaign_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "campaign_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Campaign"
  },
  "DELETE_campaigns-campaign_id-schedules": {
    "accessPath": [
      "deleteCampaignsCampaignIdSchedules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/campaigns/{campaign_id}/schedules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "campaign_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unschedule a Scheduled Campaign"
  },
  "GET_campaigns-campaign_id-schedules": {
    "accessPath": [
      "getCampaignsCampaignIdSchedules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/campaigns/{campaign_id}/schedules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "campaign_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "View Scheduled Time of a Campaign"
  },
  "PATCH_campaigns-campaign_id-schedules": {
    "accessPath": [
      "patchCampaignsCampaignIdSchedules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "send_at"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/campaigns/{campaign_id}/schedules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "campaign_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Scheduled Campaign"
  },
  "POST_campaigns-campaign_id-schedules": {
    "accessPath": [
      "postCampaignsCampaignIdSchedules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "send_at"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/campaigns/{campaign_id}/schedules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "campaign_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Schedule a Campaign"
  },
  "POST_campaigns-campaign_id-schedules-now": {
    "accessPath": [
      "postCampaignsCampaignIdSchedulesNow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/campaigns/{campaign_id}/schedules/now",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "campaign_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send a Campaign"
  },
  "POST_campaigns-campaign_id-schedules-test": {
    "accessPath": [
      "postCampaignsCampaignIdSchedulesTest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "to"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/campaigns/{campaign_id}/schedules/test",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "campaign_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send a Test Campaign"
  },
  "GET_categories": {
    "accessPath": [
      "getCategories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/categories",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "category",
      "offset"
    ],
    "description": "Retrieve all categories",
    "parameterDescriptions": {
      "limit": "The number of categories to display per page.",
      "category": "Allows you to perform a prefix search on this particular category.",
      "offset": "The point in the list that you would like to begin displaying results."
    }
  },
  "GET_categories-stats": {
    "accessPath": [
      "getCategoriesStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/categories/stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_date",
      "end_date",
      "categories",
      "limit",
      "offset",
      "aggregated_by"
    ],
    "description": "Retrieve Email Statistics for Categories",
    "parameterDescriptions": {
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD",
      "end_date": "The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.",
      "categories": "The individual categories that you want to retrieve statistics for. You may include up to 10 different categories.",
      "limit": "The number of results to include.",
      "offset": "The number of results to skip.",
      "aggregated_by": "How to group the statistics. Must be either \"day\", \"week\", or \"month\"."
    }
  },
  "GET_categories-stats-sums": {
    "accessPath": [
      "getCategoriesStatsSums"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/categories/stats/sums",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort_by_metric",
      "sort_by_direction",
      "start_date",
      "end_date",
      "limit",
      "offset",
      "aggregated_by"
    ],
    "description": "Retrieve sums of email stats for each category [Needs: Stats object defined, has category ID?]",
    "parameterDescriptions": {
      "sort_by_metric": "The metric that you want to sort by.  Must be a single metric.",
      "sort_by_direction": "The direction you want to sort.",
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.",
      "end_date": "The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.",
      "limit": "Limits the number of results returned.",
      "offset": "The point in the list to begin retrieving results.",
      "aggregated_by": "How to group the statistics. Must be either \"day\", \"week\", or \"month\"."
    }
  },
  "GET_clients-stats": {
    "accessPath": [
      "getClientsStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/clients/stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_date",
      "end_date",
      "aggregated_by"
    ],
    "description": "Retrieve email statistics by client type.",
    "parameterDescriptions": {
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.",
      "end_date": "The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.",
      "aggregated_by": "How to group the statistics. Must be either \"day\", \"week\", or \"month\"."
    }
  },
  "GET_clients-client_type-stats": {
    "accessPath": [
      "getClientsClientTypeStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/clients/{client_type}/stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_date",
      "end_date",
      "aggregated_by"
    ],
    "description": "Retrieve stats by a specific client type.",
    "parameterDescriptions": {
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.",
      "end_date": "The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.",
      "aggregated_by": "How to group the statistics. Must be either \"day\", \"week\", or \"month\"."
    }
  },
  "GET_contactdb-custom_fields": {
    "accessPath": [
      "getContactdbCustomFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all custom fields"
  },
  "POST_contactdb-custom_fields": {
    "accessPath": [
      "postContactdbCustomFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/contactdb/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Custom Field"
  },
  "DELETE_contactdb-custom_fields-custom_field_id": {
    "accessPath": [
      "deleteContactdbCustomFieldsCustomFieldId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/contactdb/custom_fields/{custom_field_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_field_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Custom Field"
  },
  "GET_contactdb-custom_fields-custom_field_id": {
    "accessPath": [
      "getContactdbCustomFieldsCustomFieldId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/custom_fields/{custom_field_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_field_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a Custom Field"
  },
  "DELETE_contactdb-lists": {
    "accessPath": [
      "deleteContactdbLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/contactdb/lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Multiple lists"
  },
  "GET_contactdb-lists": {
    "accessPath": [
      "getContactdbLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all lists"
  },
  "POST_contactdb-lists": {
    "accessPath": [
      "postContactdbLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/contactdb/lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a List"
  },
  "DELETE_contactdb-lists-list_id": {
    "accessPath": [
      "deleteContactdbListsListId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/contactdb/lists/{list_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "delete_contacts"
    ],
    "description": "Delete a List",
    "parameterDescriptions": {
      "delete_contacts": "Adds the ability to delete all contacts on the list in addition to deleting the list."
    }
  },
  "GET_contactdb-lists-list_id": {
    "accessPath": [
      "getContactdbListsListId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/lists/{list_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "list_id"
    ],
    "description": "Retrieve a single list",
    "parameterDescriptions": {
      "list_id": "The ID of the list to retrieve."
    }
  },
  "PATCH_contactdb-lists-list_id": {
    "accessPath": [
      "patchContactdbListsListId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/contactdb/lists/{list_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "list_id"
    ],
    "description": "Update a List",
    "parameterDescriptions": {
      "list_id": "The ID of the list you are updating."
    }
  },
  "GET_contactdb-lists-list_id-recipients": {
    "accessPath": [
      "getContactdbListsListIdRecipients"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/lists/{list_id}/recipients",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "page_size",
      "list_id"
    ],
    "description": "Retrieve all recipients on a List",
    "parameterDescriptions": {
      "page": "Page index of first recipient to return (must be a positive integer)",
      "page_size": "Number of recipients to return at a time (must be a positive integer between 1 and 1000)",
      "list_id": "The ID of the list whose recipients you are requesting."
    }
  },
  "POST_contactdb-lists-list_id-recipients": {
    "accessPath": [
      "postContactdbListsListIdRecipients"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/contactdb/lists/{list_id}/recipients",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add Multiple Recipients to a List"
  },
  "DELETE_contactdb-lists-list_id-recipients-recipient_id": {
    "accessPath": [
      "deleteContactdbListsListIdRecipientsRecipientId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/contactdb/lists/{list_id}/recipients/{recipient_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "list_id",
      "recipient_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "list_id",
      "recipient_id"
    ],
    "description": "Delete a Single Recipient from a Single List",
    "parameterDescriptions": {
      "list_id": "The ID of the list you are taking this recipient away from.",
      "recipient_id": "The ID of the recipient to take off the list."
    }
  },
  "POST_contactdb-lists-list_id-recipients-recipient_id": {
    "accessPath": [
      "postContactdbListsListIdRecipientsRecipientId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/contactdb/lists/{list_id}/recipients/{recipient_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "list_id",
      "recipient_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a Single Recipient to a List"
  },
  "DELETE_contactdb-recipients": {
    "accessPath": [
      "deleteContactdbRecipients"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/contactdb/recipients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Recipients"
  },
  "GET_contactdb-recipients": {
    "accessPath": [
      "getContactdbRecipients"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/recipients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "page_size"
    ],
    "description": "Retrieve recipients",
    "parameterDescriptions": {
      "page": "Page index of first recipients to return (must be a positive integer)",
      "page_size": "Number of recipients to return at a time (must be a positive integer between 1 and 1000)"
    }
  },
  "PATCH_contactdb-recipients": {
    "accessPath": [
      "patchContactdbRecipients"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/contactdb/recipients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Recipient"
  },
  "POST_contactdb-recipients": {
    "accessPath": [
      "postContactdbRecipients"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/contactdb/recipients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add recipients"
  },
  "GET_contactdb-recipients-billable_count": {
    "accessPath": [
      "getContactdbRecipientsBillableCount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/recipients/billable_count",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the count of billable recipients"
  },
  "GET_contactdb-recipients-count": {
    "accessPath": [
      "getContactdbRecipientsCount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/recipients/count",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a Count of Recipients"
  },
  "GET_contactdb-recipients-search": {
    "accessPath": [
      "getContactdbRecipientsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/recipients/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "{field_name}"
    ],
    "description": "Search recipients"
  },
  "POST_contactdb-recipients-search": {
    "accessPath": [
      "postContactdbRecipientsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conditions",
      "list_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/contactdb/recipients/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search recipients"
  },
  "DELETE_contactdb-recipients-recipient_id": {
    "accessPath": [
      "deleteContactdbRecipientsRecipientId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/contactdb/recipients/{recipient_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "recipient_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Recipient"
  },
  "GET_contactdb-recipients-recipient_id": {
    "accessPath": [
      "getContactdbRecipientsRecipientId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/recipients/{recipient_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "recipient_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a single recipient"
  },
  "GET_contactdb-recipients-recipient_id-lists": {
    "accessPath": [
      "getContactdbRecipientsRecipientIdLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/recipients/{recipient_id}/lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "recipient_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the lists that a recipient is on"
  },
  "GET_contactdb-reserved_fields": {
    "accessPath": [
      "getContactdbReservedFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/reserved_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve reserved fields"
  },
  "GET_contactdb-segments": {
    "accessPath": [
      "getContactdbSegments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/segments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all segments"
  },
  "POST_contactdb-segments": {
    "accessPath": [
      "postContactdbSegments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conditions",
      "list_id",
      "name",
      "recipient_count"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/contactdb/segments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Segment"
  },
  "DELETE_contactdb-segments-segment_id": {
    "accessPath": [
      "deleteContactdbSegmentsSegmentId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/contactdb/segments/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "delete_contacts"
    ],
    "description": "Delete a segment",
    "parameterDescriptions": {
      "delete_contacts": "True to delete all contacts matching the segment in addition to deleting the segment"
    }
  },
  "GET_contactdb-segments-segment_id": {
    "accessPath": [
      "getContactdbSegmentsSegmentId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/segments/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "segment_id"
    ],
    "description": "Retrieve a segment",
    "parameterDescriptions": {
      "segment_id": "The ID of the segment you want to request."
    }
  },
  "PATCH_contactdb-segments-segment_id": {
    "accessPath": [
      "patchContactdbSegmentsSegmentId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conditions",
      "list_id",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/contactdb/segments/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "segment_id"
    ],
    "description": "Update a segment",
    "parameterDescriptions": {
      "segment_id": "The ID of the segment you are updating."
    }
  },
  "GET_contactdb-segments-segment_id-recipients": {
    "accessPath": [
      "getContactdbSegmentsSegmentIdRecipients"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/segments/{segment_id}/recipients",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "page_size"
    ],
    "description": "Retrieve recipients on a segment"
  },
  "GET_contactdb-status": {
    "accessPath": [
      "getContactdbStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/contactdb/status",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Recipient Upload Status"
  },
  "LIST-designs": {
    "accessPath": [
      "listDesigns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/designs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "page_token",
      "summary"
    ],
    "description": "List Designs",
    "parameterDescriptions": {
      "page_size": "number of results to return",
      "page_token": "token corresponding to a specific page of results, as provided by metadata",
      "summary": "set to false to return all fields"
    }
  },
  "post_designs": {
    "accessPath": [
      "postDesigns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "editor",
      "name",
      "categories",
      "generate_plain_content",
      "subject",
      "html_content",
      "plain_content"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/designs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Design"
  },
  "LIST-Sendgrid-Pre-built-designs": {
    "accessPath": [
      "listSendgridPreBuiltDesigns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/designs/pre-builts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "page_token",
      "summary"
    ],
    "description": "List SendGrid Pre-built Designs",
    "parameterDescriptions": {
      "page_size": "number of results to return",
      "page_token": "token corresponding to a specific page of results, as provided by metadata",
      "summary": "set to false to return all fields"
    }
  },
  "GET-sendgrid-pre-built-design": {
    "accessPath": [
      "getSendgridPreBuiltDesign"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/designs/pre-builts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get SendGrid Pre-built Design"
  },
  "POST-sendgrid-pre-built-design": {
    "accessPath": [
      "postSendgridPreBuiltDesign"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "editor",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/designs/pre-builts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Duplicate SendGrid Pre-built Design"
  },
  "DELETE-design": {
    "accessPath": [
      "deleteDesign"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/designs/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Design"
  },
  "GET-design": {
    "accessPath": [
      "getDesign"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/designs/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Design"
  },
  "PUT-design": {
    "accessPath": [
      "putDesign"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "categories",
      "generate_plain_content",
      "html_content",
      "name",
      "plain_content",
      "subject"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/designs/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Design"
  },
  "POST-design": {
    "accessPath": [
      "postDesign"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "editor",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/designs/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Duplicate Design"
  },
  "GET_devices-stats": {
    "accessPath": [
      "getDevicesStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/devices/stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "aggregated_by",
      "start_date",
      "end_date"
    ],
    "description": "Retrieve email statistics by device type.",
    "parameterDescriptions": {
      "limit": "The number of results to return.",
      "offset": "The point in the list to begin retrieving results.",
      "aggregated_by": "How to group the statistics. Must be either \"day\", \"week\", or \"month\".",
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.",
      "end_date": "The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD."
    }
  },
  "GET_geo-stats": {
    "accessPath": [
      "getGeoStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/geo/stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "country",
      "limit",
      "offset",
      "aggregated_by",
      "start_date",
      "end_date"
    ],
    "description": "Retrieve email statistics by country and state/province.",
    "parameterDescriptions": {
      "country": "The country you would like to see statistics for. Currently only supported for US and CA.",
      "limit": "The number of results to return.",
      "offset": "The point in the list to begin retrieving results.",
      "aggregated_by": "How to group the statistics. Must be either \"day\", \"week\", or \"month\".",
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.",
      "end_date": "The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD."
    }
  },
  "GET_ips": {
    "accessPath": [
      "getIps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/ips",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ip",
      "exclude_whitelabels",
      "limit",
      "offset",
      "subuser",
      "sort_by_direction"
    ],
    "description": "Retrieve all IP addresses",
    "parameterDescriptions": {
      "ip": "The IP address to get",
      "exclude_whitelabels": "Should we exclude reverse DNS records (whitelabels)?",
      "limit": "The number of IPs you want returned at the same time.",
      "offset": "The offset for the number of IPs that you are requesting.",
      "subuser": "The subuser you are requesting for.",
      "sort_by_direction": "The direction to sort the results."
    }
  },
  "POST_ips": {
    "accessPath": [
      "postIps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "count",
      "subusers",
      "warmup"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/ips",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add IPs"
  },
  "GET_ips-assigned": {
    "accessPath": [
      "getIpsAssigned"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/ips/assigned",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all assigned IPs"
  },
  "GET_ips-pools": {
    "accessPath": [
      "getIpsPools"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/ips/pools",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all IP pools"
  },
  "POST_ips-pools": {
    "accessPath": [
      "postIpsPools"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/ips/pools",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an IP pool"
  },
  "DELETE_ips-pools-pool_name": {
    "accessPath": [
      "deleteIpsPoolsPoolName"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/ips/pools/{pool_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pool_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an IP pool"
  },
  "GET_ips-pools-pool_name": {
    "accessPath": [
      "getIpsPoolsPoolName"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/ips/pools/{pool_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pool_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all the IPs in a specified pool"
  },
  "PUT_ips-pools-pool_name": {
    "accessPath": [
      "putIpsPoolsPoolName"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v3/ips/pools/{pool_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pool_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rename an IP pool"
  },
  "POST_ips-pools-pool_name-ips": {
    "accessPath": [
      "postIpsPoolsPoolNameIps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/ips/pools/{pool_name}/ips",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pool_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add an IP address to a pool"
  },
  "DELETE_ips-pools-pool_name-ips-ip": {
    "accessPath": [
      "deleteIpsPoolsPoolNameIpsIp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/ips/pools/{pool_name}/ips/{ip}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pool_name",
      "ip"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove an IP address from a pool"
  },
  "GET_ips-remaining": {
    "accessPath": [
      "getIpsRemaining"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/ips/remaining",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get remaining IPs count"
  },
  "GET_ips-warmup": {
    "accessPath": [
      "getIpsWarmup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/ips/warmup",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all IPs currently in warmup"
  },
  "POST_ips-warmup": {
    "accessPath": [
      "postIpsWarmup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/ips/warmup",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Start warming up an IP address"
  },
  "DELETE_ips-warmup-ip_address": {
    "accessPath": [
      "deleteIpsWarmupIpAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/ips/warmup/{ip_address}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ip_address"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Stop warming up an IP address"
  },
  "GET_ips-warmup-ip_address": {
    "accessPath": [
      "getIpsWarmupIpAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/ips/warmup/{ip_address}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ip_address"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the warmup status for a specific IP address"
  },
  "GET_ips-ip_address": {
    "accessPath": [
      "getIpsIpAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/ips/{ip_address}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ip_address"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all IP pools an IP address belongs to"
  },
  "POST_mail-batch": {
    "accessPath": [
      "postMailBatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/mail/batch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a batch ID"
  },
  "GET_mail-batch-batch_id": {
    "accessPath": [
      "getMailBatchBatchId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/mail/batch/{batch_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Validate batch ID"
  },
  "POST_mail-send": {
    "accessPath": [
      "postMailSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "asm",
      "attachments",
      "batch_id",
      "categories",
      "content",
      "custom_args",
      "from",
      "headers",
      "ip_pool_name",
      "mail_settings",
      "personalizations",
      "reply_to",
      "reply_to_list",
      "send_at",
      "subject",
      "template_id",
      "tracking_settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/mail/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "v3 Mail Send"
  },
  "GET_mail_settings": {
    "accessPath": [
      "getMailSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/mail_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "Retrieve all mail settings",
    "parameterDescriptions": {
      "limit": "The number of settings to return.",
      "offset": "Where in the list of results to begin displaying settings."
    }
  },
  "GET_mail_settings-address_whitelist": {
    "accessPath": [
      "getMailSettingsAddressWhitelist"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/mail_settings/address_whitelist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve address whitelist mail settings"
  },
  "PATCH_mail_settings-address_whitelist": {
    "accessPath": [
      "patchMailSettingsAddressWhitelist"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled",
      "list"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/mail_settings/address_whitelist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update address whitelist mail settings"
  },
  "GET_mail_settings-bounce_purge": {
    "accessPath": [
      "getMailSettingsBouncePurge"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/mail_settings/bounce_purge",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve bounce purge mail settings"
  },
  "PATCH_mail_settings-bounce_purge": {
    "accessPath": [
      "patchMailSettingsBouncePurge"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled",
      "hard_bounces",
      "soft_bounces"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/mail_settings/bounce_purge",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update bounce purge mail settings"
  },
  "GET_mail_settings-footer": {
    "accessPath": [
      "getMailSettingsFooter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/mail_settings/footer",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve footer mail settings"
  },
  "PATCH_mail_settings-footer": {
    "accessPath": [
      "patchMailSettingsFooter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled",
      "html_content",
      "plain_content"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/mail_settings/footer",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update footer mail settings"
  },
  "GET_mail_settings-forward_bounce": {
    "accessPath": [
      "getMailSettingsForwardBounce"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/mail_settings/forward_bounce",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve forward bounce mail settings"
  },
  "PATCH_mail_settings-forward_bounce": {
    "accessPath": [
      "patchMailSettingsForwardBounce"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/mail_settings/forward_bounce",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update forward bounce mail settings"
  },
  "GET_mail_settings-forward_spam": {
    "accessPath": [
      "getMailSettingsForwardSpam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/mail_settings/forward_spam",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve forward spam mail settings"
  },
  "PATCH_mail_settings-forward_spam": {
    "accessPath": [
      "patchMailSettingsForwardSpam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/mail_settings/forward_spam",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update forward spam mail settings"
  },
  "GET_mail_settings-template": {
    "accessPath": [
      "getMailSettingsTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/mail_settings/template",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve legacy template mail settings"
  },
  "PATCH_mail_settings-template": {
    "accessPath": [
      "patchMailSettingsTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled",
      "html_content"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/mail_settings/template",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update template mail settings"
  },
  "GET_mailbox_providers-stats": {
    "accessPath": [
      "getMailboxProvidersStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/mailbox_providers/stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "mailbox_providers",
      "limit",
      "offset",
      "aggregated_by",
      "start_date",
      "end_date"
    ],
    "description": "Retrieve email statistics by mailbox provider.",
    "parameterDescriptions": {
      "mailbox_providers": "The mail box providers to get statistics for. You can include up to 10 by including this parameter multiple times.",
      "limit": "The number of results to return.",
      "offset": "The point in the list to begin retrieving results.",
      "aggregated_by": "How to group the statistics. Must be either \"day\", \"week\", or \"month\".",
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.",
      "end_date": "The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD."
    }
  },
  "DELETE_mc-contacts": {
    "accessPath": [
      "deleteMcContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/marketing/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "delete_all_contacts",
      "ids"
    ],
    "description": "Delete Contacts",
    "parameterDescriptions": {
      "delete_all_contacts": "Must be set to `\"true\"` to delete all contacts.",
      "ids": "A comma-separated list of contact IDs."
    }
  },
  "GET_mc-contats": {
    "accessPath": [
      "getMcContats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Sample Contacts"
  },
  "PUT_mc-contacts": {
    "accessPath": [
      "putMcContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contacts",
      "list_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v3/marketing/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add or Update a Contact"
  },
  "POST_marketing-contacts-batch": {
    "accessPath": [
      "postMarketingContactsBatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/contacts/batch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Batched Contacts by IDs"
  },
  "GET_mc-contacts-count": {
    "accessPath": [
      "getMcContactsCount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/contacts/count",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Total Contact Count"
  },
  "GET_marketing-contacts-exports": {
    "accessPath": [
      "getMarketingContactsExports"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/contacts/exports",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get All Existing Exports"
  },
  "POST_mc-contacts-exports": {
    "accessPath": [
      "postMcContactsExports"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file_type",
      "list_ids",
      "max_file_size",
      "notifications",
      "segment_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/contacts/exports",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Export Contacts"
  },
  "GET_mc-contacts-exports-id": {
    "accessPath": [
      "getMcContactsExportsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/contacts/exports/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Export Contacts Status"
  },
  "PUT_mc-contacts-imports": {
    "accessPath": [
      "putMcContactsImports"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "field_mappings",
      "file_type",
      "list_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v3/marketing/contacts/imports",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Import Contacts"
  },
  "GET_marketing-contacts-imports-id": {
    "accessPath": [
      "getMarketingContactsImportsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/contacts/imports/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Import Contacts Status"
  },
  "POST_mc-contacts-search": {
    "accessPath": [
      "postMcContactsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "query"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/contacts/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search Contacts"
  },
  "POST_marketing-contacts-search-emails": {
    "accessPath": [
      "postMarketingContactsSearchEmails"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "emails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/contacts/search/emails",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Contacts by Emails"
  },
  "GET_mc-contacts-id": {
    "accessPath": [
      "getMcContactsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/contacts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a Contact by ID"
  },
  "GET_mc-field_definitions": {
    "accessPath": [
      "getMcFieldDefinitions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/field_definitions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get All Field Definitions"
  },
  "POST_mc-field_definitions": {
    "accessPath": [
      "postMcFieldDefinitions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "field_type",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/field_definitions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Custom Field Definition"
  },
  "DELETE_mc-field_definitions-custom_field_id": {
    "accessPath": [
      "deleteMcFieldDefinitionsCustomFieldId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/marketing/field_definitions/{custom_field_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_field_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Custom Field Definition"
  },
  "PATCH_mc-field_definitions-custom_field_id": {
    "accessPath": [
      "patchMcFieldDefinitionsCustomFieldId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/marketing/field_definitions/{custom_field_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_field_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Custom Field Definition"
  },
  "GET_mc-lists": {
    "accessPath": [
      "getMcLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "page_token"
    ],
    "description": "Get All Lists",
    "parameterDescriptions": {
      "page_size": "Maximum number of elements to return. Defaults to 100, returns 1000 max"
    }
  },
  "POST_mc-lists": {
    "accessPath": [
      "postMcLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create List"
  },
  "DELETE_lists-id": {
    "accessPath": [
      "deleteListsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/marketing/lists/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "delete_contacts"
    ],
    "description": "Delete a list",
    "parameterDescriptions": {
      "delete_contacts": "Flag indicates that all contacts on the list are also to be deleted."
    }
  },
  "GET_mc-lists-id": {
    "accessPath": [
      "getMcListsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/lists/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "contact_sample"
    ],
    "description": "Get a List by ID",
    "parameterDescriptions": {
      "contact_sample": "Setting this parameter to the true  will cause the contact_sample to be returned"
    }
  },
  "PATCH_mc-lists-id": {
    "accessPath": [
      "patchMcListsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/marketing/lists/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update List"
  },
  "DELETE_mc-lists-id-contacts": {
    "accessPath": [
      "deleteMcListsIdContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/marketing/lists/{id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "contact_ids"
    ],
    "description": "Remove Contacts from a List",
    "parameterDescriptions": {
      "contact_ids": "comma separated list of contact ids"
    }
  },
  "GET_mc-lists-id-contacts-count": {
    "accessPath": [
      "getMcListsIdContactsCount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/lists/{id}/contacts/count",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get List Contact Count"
  },
  "GET_marketing-segments": {
    "accessPath": [
      "getMarketingSegments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/segments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "parent_list_ids",
      "no_parent_list_id"
    ],
    "description": "Get List of Segments",
    "parameterDescriptions": {
      "parent_list_ids": "A comma separated list of list ids to be used when searching for segments with the specified parent_list_id, no more than 50 is allowed",
      "no_parent_list_id": "If set to `true` segments with an empty value of `parent_list_id` will be returned in the filter.  If the value is not present it defaults to 'false'."
    }
  },
  "POST_marketing-segments": {
    "accessPath": [
      "postMarketingSegments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "parent_list_ids",
      "query_dsl",
      "parent_list_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/segments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Segment"
  },
  "GET_segments": {
    "accessPath": [
      "getSegments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/segments/2.0",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "parent_list_ids",
      "no_parent_list_id"
    ],
    "description": "Get List of Segments",
    "parameterDescriptions": {
      "parent_list_ids": "A comma separated list up to 50 in size, to filter segments on.  Only segments that have any of these list ids as the parent list will be retrieved. This is different from the parameter of the same name used when creating a segment.",
      "no_parent_list_id": "If set to `true` segments with an empty value of `parent_list_id` will be returned in the filter.  If the value is not present it defaults to 'false'."
    }
  },
  "POST_segments": {
    "accessPath": [
      "postSegments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "parent_list_ids",
      "query_dsl"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/segments/2.0",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Segment"
  },
  "DELETE_segments-segment_id": {
    "accessPath": [
      "deleteSegmentsSegmentId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/marketing/segments/2.0/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete segment"
  },
  "GET_segments-segment_id": {
    "accessPath": [
      "getSegmentsSegmentId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/segments/2.0/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "contacts_sample"
    ],
    "description": "Get Segment by ID",
    "parameterDescriptions": {
      "contacts_sample": "Defaults to `true`. Set to `false` to exclude the contacts_sample in the response."
    }
  },
  "PATCH_segments-segment_id": {
    "accessPath": [
      "patchSegmentsSegmentId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "query_dsl"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/marketing/segments/2.0/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Segment"
  },
  "POST_marketing-segments-delete": {
    "accessPath": [
      "postMarketingSegmentsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/segments/delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk Delete Segments"
  },
  "DELETE_marketing-segments-segment_id": {
    "accessPath": [
      "deleteMarketingSegmentsSegmentId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/marketing/segments/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Segment"
  },
  "GET_marketing-segments-segment_id": {
    "accessPath": [
      "getMarketingSegmentsSegmentId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/segments/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query_json"
    ],
    "description": "Get Segment by ID",
    "parameterDescriptions": {
      "query_json": "Defaults to `false`.  Set to `true` to return the parsed SQL AST as a JSON object in the field `query_json`"
    }
  },
  "PATCH_marketing-segments-segment_id": {
    "accessPath": [
      "patchMarketingSegmentsSegmentId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "parent_list_ids",
      "query_dsl"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/marketing/segments/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Segment"
  },
  "POST_marketing-senders": {
    "accessPath": [
      "postMarketingSenders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "address_2",
      "city",
      "country",
      "from",
      "nickname",
      "reply_to",
      "state",
      "zip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/marketing/senders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Sender Identity"
  },
  "DELETE_marketing-singlesends": {
    "accessPath": [
      "deleteMarketingSinglesends"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/marketing/singlesends",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids"
    ],
    "description": "Bulk Delete Single Sends",
    "parameterDescriptions": {
      "ids": "Single Send IDs to delete"
    }
  },
  "GET_marketing-singlesends": {
    "accessPath": [
      "getMarketingSinglesends"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/singlesends",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "page_token"
    ],
    "description": "Get All Single Sends"
  },
  "POST_marketing-singlesends": {
    "accessPath": [
      "postMarketingSinglesends"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "categories",
      "email_config",
      "name",
      "send_at",
      "send_to"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/singlesends",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Single Send"
  },
  "GET_marketing-singlesends-categories": {
    "accessPath": [
      "getMarketingSinglesendsCategories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/singlesends/categories",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get All Categories"
  },
  "POST_marketing-singlesends-search": {
    "accessPath": [
      "postMarketingSinglesendsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "categories",
      "name",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/singlesends/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "page_token"
    ],
    "description": "Get Single Sends Search"
  },
  "DELETE_marketing-singlesends-id": {
    "accessPath": [
      "deleteMarketingSinglesendsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/marketing/singlesends/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Single Send by ID"
  },
  "GET_marketing-singlesends-id": {
    "accessPath": [
      "getMarketingSinglesendsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/singlesends/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Single Send by ID"
  },
  "PATCH_marketing-singlesends-id": {
    "accessPath": [
      "patchMarketingSinglesendsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "categories",
      "email_config",
      "name",
      "send_at",
      "send_to"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/marketing/singlesends/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Single Send"
  },
  "POST_marketing-singlesends-id": {
    "accessPath": [
      "postMarketingSinglesendsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/singlesends/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Duplicate Single Send"
  },
  "DELETE_marketing-singlesends-id-schedule": {
    "accessPath": [
      "deleteMarketingSinglesendsIdSchedule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/marketing/singlesends/{id}/schedule",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Single Send Schedule"
  },
  "PUT_marketing-singlesends-id-schedule": {
    "accessPath": [
      "putMarketingSinglesendsIdSchedule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "send_at"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v3/marketing/singlesends/{id}/schedule",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Schedule Single Send"
  },
  "getall-automation-stats": {
    "accessPath": [
      "getallAutomationStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/stats/automations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "automation_ids",
      "page_size",
      "page_token"
    ],
    "description": "Get All Automation Stats",
    "parameterDescriptions": {
      "automation_ids": "This endpoint returns all automation IDs if no `automation_ids` are specified.",
      "page_size": "The number of elements you want returned on each page.",
      "page_token": "The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page."
    }
  },
  "get-automations-stats-export": {
    "accessPath": [
      "getAutomationsStatsExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/stats/automations/export",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids",
      "timezone"
    ],
    "description": "Export Automation Stats",
    "parameterDescriptions": {
      "ids": "The IDs of Automations for which to export stats.",
      "timezone": "The [IANA Area/Region](https://en.wikipedia.org/wiki/Tz_database#Names_of_time_zones) string representing the timezone in which the stats are to be presented; i.e. `\"America/Chicago\"`. This parameter changes the timezone format only; it does not alter which stats are returned."
    }
  },
  "get-automation-stat": {
    "accessPath": [
      "getAutomationStat"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/stats/automations/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "group_by",
      "step_ids",
      "aggregated_by",
      "start_date",
      "end_date",
      "timezone",
      "page_size",
      "page_token"
    ],
    "description": "Get Automation Stats by ID",
    "parameterDescriptions": {
      "group_by": "Automations can have multiple steps. Including `step_id` as a `group_by` metric allows further granularity of stats.",
      "step_ids": "Comma-separated list of `step_ids` that you want the link stats for.",
      "aggregated_by": "Dictates how the stats are time-sliced. Currently, `\"total\"` and `\"day\"` are supported.",
      "start_date": "Format: `YYYY-MM-DD`. If this parameter is included, the stats' start date is included in the search.",
      "end_date": "Format: `YYYY-MM-DD`.If this parameter is included, the stats' end date is included in the search.",
      "timezone": "[IANA Area/Region](https://en.wikipedia.org/wiki/Tz_database#Names_of_time_zones) string representing the timezone in which the stats are to be presented, e.g., \"America/Chicago\".",
      "page_size": "The number of elements you want returned on each page.",
      "page_token": "The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page."
    }
  },
  "get-automation-link-stat": {
    "accessPath": [
      "getAutomationLinkStat"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/stats/automations/{id}/links",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "group_by",
      "step_ids",
      "page_size",
      "page_token"
    ],
    "description": "Get Automation Click Tracking Stats by ID",
    "parameterDescriptions": {
      "group_by": "Automations can have multiple steps. Including `step_id` as a `group_by` metric allows further granularity of stats.",
      "step_ids": "Comma-separated list of `step_ids` that you want the link stats for.",
      "page_size": "The number of elements you want returned on each page.",
      "page_token": "The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page."
    }
  },
  "getall-singlesend-stats": {
    "accessPath": [
      "getallSinglesendStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/stats/singlesends",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "singlesend_ids",
      "page_size",
      "page_token"
    ],
    "description": "Get All Single Sends Stats",
    "parameterDescriptions": {
      "singlesend_ids": "This endpoint returns all Single Send IDs if no IDs are included in `singlesend_ids`.",
      "page_size": "The number of elements you want returned on each page.",
      "page_token": "The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page."
    }
  },
  "get-singlesend-stats-export": {
    "accessPath": [
      "getSinglesendStatsExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/stats/singlesends/export",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids",
      "timezone"
    ],
    "description": "Export Single Send Stats",
    "parameterDescriptions": {
      "ids": "The IDs of Single Sends for which to export stats.",
      "timezone": "The [IANA Area/Region](https://en.wikipedia.org/wiki/Tz_database#Names_of_time_zones) string representing the timezone in which the stats are to be presented; i.e. `\"America/Chicago\"`. This parameter changes the timezone format only; it does not alter which stats are returned."
    }
  },
  "get-singlesend-stat": {
    "accessPath": [
      "getSinglesendStat"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/stats/singlesends/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "aggregated_by",
      "start_date",
      "end_date",
      "timezone",
      "page_size",
      "page_token",
      "group_by"
    ],
    "description": "Get Single Send Stats by ID",
    "parameterDescriptions": {
      "aggregated_by": "Dictates how the stats are time-sliced. Currently, `\"total\"` and `\"day\"` are supported.",
      "start_date": "Format: `YYYY-MM-DD`. If this parameter is included, the stats' start date is included in the search.",
      "end_date": "Format: `YYYY-MM-DD`.If this parameter is included, the stats' end date is included in the search.",
      "timezone": "[IANA Area/Region](https://en.wikipedia.org/wiki/Tz_database#Names_of_time_zones) string representing the timezone in which the stats are to be presented, e.g., \"America/Chicago\".",
      "page_size": "The number of elements you want returned on each page.",
      "page_token": "The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page.",
      "group_by": "A/B Single Sends have multiple variation IDs and phase IDs. Including these additional fields allows further granularity of stats by these fields."
    }
  },
  "get-singlesend-link-stat": {
    "accessPath": [
      "getSinglesendLinkStat"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/marketing/stats/singlesends/{id}/links",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "page_token",
      "group_by",
      "ab_variation_id",
      "ab_phase_id"
    ],
    "description": "Get Single Send Click Tracking Stats by ID",
    "parameterDescriptions": {
      "page_size": "The number of elements you want returned on each page.",
      "page_token": "The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page.",
      "group_by": "A/B Single Sends have multiple variation IDs and phase IDs. Including these additional fields allows further granularity of stats by these fields."
    }
  },
  "POST_marketing-test-send_email": {
    "accessPath": [
      "postMarketingTestSendEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "custom_unsubscribe_url",
      "emails",
      "from_address",
      "sender_id",
      "suppression_group_id",
      "template_id",
      "version_id_override"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/marketing/test/send_email",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send a Test Marketing Email"
  },
  "GET-messages": {
    "accessPath": [
      "getMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Query-Id",
      "X-Cursor",
      "Authorization"
    ],
    "method": "GET",
    "routeTemplate": "/v3/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "limit"
    ],
    "description": "Filter all messages",
    "parameterDescriptions": {
      "query": "Use the query syntax  to filter your email activity.",
      "limit": "The number of messages returned. This parameter must be greater than 0 and less than or equal to 1000"
    }
  },
  "POST_v3-messages-download": {
    "accessPath": [
      "postV3MessagesDownload"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Authorization"
    ],
    "method": "POST",
    "routeTemplate": "/v3/messages/download",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query"
    ],
    "description": "Request CSV",
    "parameterDescriptions": {
      "query": "Uses a SQL like syntax to indicate which messages to include in the CSV"
    }
  },
  "GET_v3-messages-download-download_uuid": {
    "accessPath": [
      "getV3MessagesDownloadDownloadUuid"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Authorization"
    ],
    "method": "GET",
    "routeTemplate": "/v3/messages/download/{download_uuid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "download_uuid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download CSV"
  },
  "GET-v3-messages-msg_id": {
    "accessPath": [
      "getV3MessagesMsgId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Authorization"
    ],
    "method": "GET",
    "routeTemplate": "/v3/messages/{msg_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "msg_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Filter messages by message ID"
  },
  "GET_partner_settings": {
    "accessPath": [
      "getPartnerSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/partner_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "Returns a list of all partner settings.",
    "parameterDescriptions": {
      "limit": "The number of settings to return per page.",
      "offset": "The paging offset."
    }
  },
  "GET_partner_settings-new_relic": {
    "accessPath": [
      "getPartnerSettingsNewRelic"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/partner_settings/new_relic",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns all New Relic partner settings."
  },
  "PATCH_partner_settings-new_relic": {
    "accessPath": [
      "patchPartnerSettingsNewRelic"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enable_subuser_statistics",
      "enabled",
      "license_key"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/partner_settings/new_relic",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates New Relic partner settings."
  },
  "GET_scopes": {
    "accessPath": [
      "getScopes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/scopes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a list of scopes for which this user has access."
  },
  "GET_v3-scopes-requests": {
    "accessPath": [
      "getV3ScopesRequests"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/scopes/requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "Retrieve access requests",
    "parameterDescriptions": {
      "limit": "Optional field to limit the number of results returned.",
      "offset": "Optional beginning point in the list to retrieve from."
    }
  },
  "DELETE_v3-scopes-requests-request_id": {
    "accessPath": [
      "deleteV3ScopesRequestsRequestId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/scopes/requests/{request_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "request_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deny access request"
  },
  "PATCH_v3-scopes-requests-approve-id": {
    "accessPath": [
      "patchV3ScopesRequestsApproveId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/scopes/requests/{request_id}/approve",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "request_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Approve access request"
  },
  "GET_v3-senders": {
    "accessPath": [
      "getV3Senders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/senders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all Sender Identities"
  },
  "POST_senders": {
    "accessPath": [
      "postSenders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "address_2",
      "city",
      "country",
      "from",
      "nickname",
      "reply_to",
      "state",
      "zip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/senders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Sender Identity"
  },
  "DELETE_v3-senders-sender_id": {
    "accessPath": [
      "deleteV3SendersSenderId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/senders/{sender_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "sender_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Sender Identity"
  },
  "GET_v3-senders-sender_id": {
    "accessPath": [
      "getV3SendersSenderId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/senders/{sender_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "sender_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "View a Sender Identity"
  },
  "PATCH_v3-senders-sender_id": {
    "accessPath": [
      "patchV3SendersSenderId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "address_2",
      "city",
      "country",
      "from",
      "nickname",
      "reply_to",
      "state",
      "zip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/senders/{sender_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "sender_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Sender Identity"
  },
  "POST_v3-senders-sender_id-resend_verification": {
    "accessPath": [
      "postV3SendersSenderIdResendVerification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/senders/{sender_id}/resend_verification",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "sender_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Resend Sender Identity Verification"
  },
  "POST_sso-certificates": {
    "accessPath": [
      "postSsoCertificates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled",
      "integration_id",
      "public_certificate"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/sso/certificates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an SSO Certificate"
  },
  "DELETE_sso-certificates-cert_id": {
    "accessPath": [
      "deleteSsoCertificatesCertId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/sso/certificates/{cert_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cert_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an SSO Certificate"
  },
  "GET_sso-certificates-cert_id": {
    "accessPath": [
      "getSsoCertificatesCertId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/sso/certificates/{cert_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cert_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get an SSO Certificate"
  },
  "PATCH_sso-certificates-cert_id": {
    "accessPath": [
      "patchSsoCertificatesCertId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled",
      "integration_id",
      "public_certificate"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/sso/certificates/{cert_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cert_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update SSO Certificate"
  },
  "GET_sso-integrations": {
    "accessPath": [
      "getSsoIntegrations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/sso/integrations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "si"
    ],
    "description": "Get All SSO Integrations",
    "parameterDescriptions": {
      "si": "If this parameter is set to `true`, the response will include the `completed_integration` field."
    }
  },
  "POST_sso-integrations": {
    "accessPath": [
      "postSsoIntegrations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "completed_integration",
      "enabled",
      "entity_id",
      "name",
      "signin_url",
      "signout_url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/sso/integrations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an SSO Integration"
  },
  "DELETE_sso-integrations-id": {
    "accessPath": [
      "deleteSsoIntegrationsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/sso/integrations/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an SSO Integration"
  },
  "GET_sso-integrations-id": {
    "accessPath": [
      "getSsoIntegrationsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/sso/integrations/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "si"
    ],
    "description": "Get an SSO Integration",
    "parameterDescriptions": {
      "si": "If this parameter is set to `true`, the response will include the `completed_integration` field."
    }
  },
  "PATCH_sso-integrations-id": {
    "accessPath": [
      "patchSsoIntegrationsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "completed_integration",
      "enabled",
      "entity_id",
      "name",
      "signin_url",
      "signout_url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/sso/integrations/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "si"
    ],
    "description": "Update an SSO Integration",
    "parameterDescriptions": {
      "si": "If this parameter is set to `true`, the response will include the `completed_integration` field."
    }
  },
  "GET_sso-integrations-integration_id-certificates": {
    "accessPath": [
      "getSsoIntegrationsIntegrationIdCertificates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/sso/integrations/{integration_id}/certificates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integration_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get All SSO Certificates by Integration"
  },
  "POST_sso-teammates": {
    "accessPath": [
      "postSsoTeammates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "first_name",
      "is_admin",
      "is_read_only",
      "last_name",
      "scopes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/sso/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create SSO Teammate"
  },
  "PATCH_sso-teammates-username": {
    "accessPath": [
      "patchSsoTeammatesUsername"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "first_name",
      "is_admin",
      "last_name",
      "scopes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/sso/teammates/{username}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "username"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit an SSO Teammate"
  },
  "GET_stats": {
    "accessPath": [
      "getStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "aggregated_by",
      "start_date",
      "end_date"
    ],
    "description": "Retrieve global email statistics",
    "parameterDescriptions": {
      "limit": "The number of results to return.",
      "offset": "The point in the list to begin retrieving results.",
      "aggregated_by": "How to group the statistics. Must be either \"day\", \"week\", or \"month\".",
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.",
      "end_date": "The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD."
    }
  },
  "GET_subusers": {
    "accessPath": [
      "getSubusers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/subusers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "username",
      "limit",
      "offset"
    ],
    "description": "List all Subusers",
    "parameterDescriptions": {
      "username": "The username of this subuser.",
      "limit": "The number of results you would like to get in each request.",
      "offset": "The number of subusers to skip."
    }
  },
  "POST_subusers": {
    "accessPath": [
      "postSubusers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "ips",
      "password",
      "username"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/subusers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Subuser"
  },
  "GET_subusers-reputations": {
    "accessPath": [
      "getSubusersReputations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/subusers/reputations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "usernames"
    ],
    "description": "Retrieve Subuser Reputations"
  },
  "GET_subusers-stats": {
    "accessPath": [
      "getSubusersStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/subusers/stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "aggregated_by",
      "subusers",
      "start_date",
      "end_date"
    ],
    "description": "Retrieve email statistics for your subusers.",
    "parameterDescriptions": {
      "limit": "Limits the number of results returned per page.",
      "offset": "The point in the list to begin retrieving results from.",
      "aggregated_by": "How to group the statistics. Must be either \"day\", \"week\", or \"month\".",
      "subusers": "The subuser you want to retrieve statistics for. You may include this parameter up to 10 times to retrieve statistics for multiple subusers.",
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.",
      "end_date": "The end date of the statistics to retrieve. Defaults to today."
    }
  },
  "GET_subusers-stats-monthly": {
    "accessPath": [
      "getSubusersStatsMonthly"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/subusers/stats/monthly",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "date",
      "subuser",
      "sort_by_metric",
      "sort_by_direction",
      "limit",
      "offset"
    ],
    "description": "Retrieve monthly stats for all subusers",
    "parameterDescriptions": {
      "date": "The date of the month to retrieve statistics for. Must be formatted YYYY-MM-DD",
      "subuser": "A substring search of your subusers.",
      "sort_by_metric": "The metric that you want to sort by. Metrics that you can sort by are: `blocks`, `bounces`, `clicks`, `delivered`, `opens`, `requests`, `unique_clicks`, `unique_opens`, and `unsubscribes`.'",
      "sort_by_direction": "The direction you want to sort.",
      "limit": "Optional field to limit the number of results returned.",
      "offset": "Optional beginning point in the list to retrieve from."
    }
  },
  "GET_subusers-stats-sums": {
    "accessPath": [
      "getSubusersStatsSums"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/subusers/stats/sums",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort_by_direction",
      "start_date",
      "end_date",
      "limit",
      "offset",
      "aggregated_by",
      "sort_by_metric"
    ],
    "description": "Retrieve the totals for each email statistic metric for all subusers.",
    "parameterDescriptions": {
      "sort_by_direction": "The direction you want to sort. ",
      "start_date": "The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD.",
      "end_date": "The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD.",
      "limit": "Limits the number of results returned per page.",
      "offset": "The point in the list to begin retrieving results from.",
      "aggregated_by": "How to group the statistics. Defaults to today. Must follow format YYYY-MM-DD.",
      "sort_by_metric": "The metric that you want to sort by.  Must be a single metric."
    }
  },
  "DELETE_subusers-subuser_name": {
    "accessPath": [
      "deleteSubusersSubuserName"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/subusers/{subuser_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subuser_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a subuser"
  },
  "PATCH_subusers-subuser_name": {
    "accessPath": [
      "patchSubusersSubuserName"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "disabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/subusers/{subuser_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subuser_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Enable/disable a subuser"
  },
  "PUT_subusers-subuser_name-ips": {
    "accessPath": [
      "putSubusersSubuserNameIps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v3/subusers/{subuser_name}/ips",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subuser_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update IPs assigned to a subuser"
  },
  "DELETE_subusers-subuser_name-monitor": {
    "accessPath": [
      "deleteSubusersSubuserNameMonitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/subusers/{subuser_name}/monitor",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subuser_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete monitor settings"
  },
  "GET_subusers-subuser_name-monitor": {
    "accessPath": [
      "getSubusersSubuserNameMonitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/subusers/{subuser_name}/monitor",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subuser_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve monitor settings for a subuser"
  },
  "POST_subusers-subuser_name-monitor": {
    "accessPath": [
      "postSubusersSubuserNameMonitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "frequency"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/subusers/{subuser_name}/monitor",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subuser_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create monitor settings"
  },
  "PUT_subusers-subuser_name-monitor": {
    "accessPath": [
      "putSubusersSubuserNameMonitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "frequency"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v3/subusers/{subuser_name}/monitor",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subuser_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Monitor Settings for a subuser"
  },
  "GET_subusers-subuser_name-stats-monthly": {
    "accessPath": [
      "getSubusersSubuserNameStatsMonthly"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/subusers/{subuser_name}/stats/monthly",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subuser_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "date",
      "sort_by_metric",
      "sort_by_direction",
      "limit",
      "offset"
    ],
    "description": "Retrieve the monthly email statistics for a single subuser",
    "parameterDescriptions": {
      "date": "The date of the month to retrieve statistics for. Must be formatted YYYY-MM-DD",
      "sort_by_metric": "The metric that you want to sort by. Metrics that you can sort by are: `blocks`, `bounces`, `clicks`, `delivered`, `opens`, `requests`, `unique_clicks`, `unique_opens`, and `unsubscribes`.'",
      "sort_by_direction": "The direction you want to sort.",
      "limit": "Optional field to limit the number of results returned.",
      "offset": "Optional beginning point in the list to retrieve from."
    }
  },
  "DELETE_suppression-blocks": {
    "accessPath": [
      "deleteSuppressionBlocks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "delete_all",
      "emails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/suppression/blocks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete blocks"
  },
  "GET_suppression-blocks": {
    "accessPath": [
      "getSuppressionBlocks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/suppression/blocks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "limit",
      "offset"
    ],
    "description": "Retrieve all blocks",
    "parameterDescriptions": {
      "start_time": "The start of the time range when a blocked email was created (inclusive). This is a unix timestamp.",
      "end_time": "The end of the time range when a blocked email was created (inclusive). This is a unix timestamp.",
      "limit": "Limit the number of results to be displayed per page.",
      "offset": "The point in the list to begin displaying results."
    }
  },
  "DELETE_suppression-blocks-email": {
    "accessPath": [
      "deleteSuppressionBlocksEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/suppression/blocks/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a specific block"
  },
  "GET_suppression-blocks-email": {
    "accessPath": [
      "getSuppressionBlocksEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/suppression/blocks/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a specific block"
  },
  "DELETE_suppression-bounces": {
    "accessPath": [
      "deleteSuppressionBounces"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "delete_all",
      "emails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/suppression/bounces",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete bounces"
  },
  "GET_suppression-bounces": {
    "accessPath": [
      "getSuppressionBounces"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Accept",
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/suppression/bounces",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time"
    ],
    "description": "Retrieve all bounces",
    "parameterDescriptions": {
      "start_time": "Refers start of the time range in unix timestamp when a bounce was created (inclusive).",
      "end_time": "Refers end of the time range in unix timestamp when a bounce was created (inclusive)."
    }
  },
  "DELETE_suppression-bounces-email": {
    "accessPath": [
      "deleteSuppressionBouncesEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/suppression/bounces/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "email_address"
    ],
    "description": "Delete a bounce",
    "parameterDescriptions": {
      "email_address": "The email address you would like to remove from the bounce list."
    }
  },
  "GET_suppression-bounces-email": {
    "accessPath": [
      "getSuppressionBouncesEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/suppression/bounces/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a Bounce"
  },
  "DELETE_suppression-invalid_emails": {
    "accessPath": [
      "deleteSuppressionInvalidEmails"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "delete_all",
      "emails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/suppression/invalid_emails",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete invalid emails"
  },
  "GET_suppression-invalid_emails": {
    "accessPath": [
      "getSuppressionInvalidEmails"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/suppression/invalid_emails",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "limit",
      "offset"
    ],
    "description": "Retrieve all invalid emails",
    "parameterDescriptions": {
      "start_time": "Refers start of the time range in unix timestamp when an invalid email was created (inclusive).",
      "end_time": "Refers end of the time range in unix timestamp when an invalid email was created (inclusive).",
      "limit": "Limit the number of results to be displayed per page.",
      "offset": "Paging offset. The point in the list to begin displaying results."
    }
  },
  "DELETE_suppression-invalid_emails-email": {
    "accessPath": [
      "deleteSuppressionInvalidEmailsEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/suppression/invalid_emails/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a specific invalid email"
  },
  "GET_suppression-invalid_emails-email": {
    "accessPath": [
      "getSuppressionInvalidEmailsEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/suppression/invalid_emails/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a specific invalid email"
  },
  "DELETE_suppression-spam_reports": {
    "accessPath": [
      "deleteSuppressionSpamReports"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "delete_all",
      "emails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/suppression/spam_reports",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete spam reports"
  },
  "GET_suppression-spam_reports": {
    "accessPath": [
      "getSuppressionSpamReports"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/suppression/spam_reports",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "limit",
      "offset"
    ],
    "description": "Retrieve all spam reports",
    "parameterDescriptions": {
      "start_time": "The start of the time range when a spam report was created (inclusive). This is a unix timestamp.",
      "end_time": "The end of the time range when a spam report was created (inclusive). This is a unix timestamp.",
      "limit": "Limit the number of results to be displayed per page.",
      "offset": "Paging offset. The point in the list to begin displaying results."
    }
  },
  "DELETE_suppression-spam_reports-email": {
    "accessPath": [
      "deleteSuppressionSpamReportsEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/suppression/spam_reports/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a specific spam report"
  },
  "GET_suppression-spam_reports-email": {
    "accessPath": [
      "getSuppressionSpamReportsEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/suppression/spam_reports/{email}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a specific spam report"
  },
  "GET_suppression-unsubscribes": {
    "accessPath": [
      "getSuppressionUnsubscribes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/suppression/unsubscribes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "limit",
      "offset"
    ],
    "description": "Retrieve all global suppressions",
    "parameterDescriptions": {
      "start_time": "Refers start of the time range in unix timestamp when an unsubscribe email was created (inclusive).",
      "end_time": "Refers end of the time range in unix timestamp when an unsubscribe email was created (inclusive).",
      "limit": "The number of results to display on each page.",
      "offset": "The point in the list of results to begin displaying global suppressions."
    }
  },
  "GET_v3-teammates": {
    "accessPath": [
      "getV3Teammates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "Retrieve all teammates",
    "parameterDescriptions": {
      "limit": "Number of items to return",
      "offset": "Paging offset"
    }
  },
  "POST_v3-teammates": {
    "accessPath": [
      "postV3Teammates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "is_admin",
      "scopes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invite teammate"
  },
  "GET_v3-teammates-pending": {
    "accessPath": [
      "getV3TeammatesPending"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/teammates/pending",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all pending teammates"
  },
  "DELETE_v3-teammates-pending-token": {
    "accessPath": [
      "deleteV3TeammatesPendingToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/teammates/pending/{token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete pending teammate"
  },
  "POST_v3-teammates-pending-token-resend": {
    "accessPath": [
      "postV3TeammatesPendingTokenResend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/teammates/pending/{token}/resend",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Resend teammate invite"
  },
  "DELETE_v3-teammates-username": {
    "accessPath": [
      "deleteV3TeammatesUsername"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/teammates/{username}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "username"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete teammate"
  },
  "GET_v3-teammates-username": {
    "accessPath": [
      "getV3TeammatesUsername"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/teammates/{username}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "username"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve specific teammate"
  },
  "PATCH_v3-teammates-username": {
    "accessPath": [
      "patchV3TeammatesUsername"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "is_admin",
      "scopes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/teammates/{username}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "username"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update teammate's permissions"
  },
  "GET_templates": {
    "accessPath": [
      "getTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "generations",
      "page_size",
      "page_token"
    ],
    "description": "Retrieve paged transactional templates.",
    "parameterDescriptions": {
      "generations": "Comma-delimited list specifying which generations of templates to return. Options are `legacy`, `dynamic` or `legacy,dynamic`.",
      "page_size": "The number of templates to be returned in each page of results",
      "page_token": "A token corresponding to a specific page of results, as provided by metadata"
    }
  },
  "POST_templates": {
    "accessPath": [
      "postTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "generation",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a transactional template."
  },
  "DELETE_templates-template_id": {
    "accessPath": [
      "deleteTemplatesTemplateId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/templates/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a template."
  },
  "GET_templates-template_id": {
    "accessPath": [
      "getTemplatesTemplateId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/templates/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a single transactional template."
  },
  "PATCH_templates-template_id": {
    "accessPath": [
      "patchTemplatesTemplateId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/templates/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit a transactional template."
  },
  "POST_templates-template_id": {
    "accessPath": [
      "postTemplatesTemplateId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/templates/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Duplicate a transactional template."
  },
  "POST_templates-template_id-versions": {
    "accessPath": [
      "postTemplatesTemplateIdVersions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "editor",
      "generate_plain_content",
      "html_content",
      "name",
      "plain_content",
      "subject",
      "test_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/templates/{template_id}/versions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new transactional template version."
  },
  "DELETE_templates-template_id-versions-version_id": {
    "accessPath": [
      "deleteTemplatesTemplateIdVersionsVersionId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/templates/{template_id}/versions/{version_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id",
      "version_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a transactional template version."
  },
  "GET_templates-template_id-versions-version_id": {
    "accessPath": [
      "getTemplatesTemplateIdVersionsVersionId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/templates/{template_id}/versions/{version_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id",
      "version_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a specific transactional template version."
  },
  "PATCH_templates-template_id-versions-version_id": {
    "accessPath": [
      "patchTemplatesTemplateIdVersionsVersionId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "editor",
      "generate_plain_content",
      "html_content",
      "name",
      "plain_content",
      "subject",
      "test_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/templates/{template_id}/versions/{version_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id",
      "version_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit a transactional template version."
  },
  "POST_templates-template_id-versions-version_id-activate": {
    "accessPath": [
      "postTemplatesTemplateIdVersionsVersionIdActivate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/templates/{template_id}/versions/{version_id}/activate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id",
      "version_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Activate a transactional template version."
  },
  "GET_tracking_settings": {
    "accessPath": [
      "getTrackingSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/tracking_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Tracking Settings"
  },
  "GET_tracking_settings-click": {
    "accessPath": [
      "getTrackingSettingsClick"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/tracking_settings/click",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Click Track Settings"
  },
  "PATCH_tracking_settings-click": {
    "accessPath": [
      "patchTrackingSettingsClick"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/tracking_settings/click",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Click Tracking Settings"
  },
  "GET_tracking_settings-google_analytics": {
    "accessPath": [
      "getTrackingSettingsGoogleAnalytics"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/tracking_settings/google_analytics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Google Analytics Settings"
  },
  "PATCH_tracking_settings-google_analytics": {
    "accessPath": [
      "patchTrackingSettingsGoogleAnalytics"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled",
      "utm_campaign",
      "utm_content",
      "utm_medium",
      "utm_source",
      "utm_term"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/tracking_settings/google_analytics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Google Analytics Settings"
  },
  "GET_tracking_settings-open": {
    "accessPath": [
      "getTrackingSettingsOpen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/tracking_settings/open",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Open Tracking Settings"
  },
  "PATCH_tracking_settings-open": {
    "accessPath": [
      "patchTrackingSettingsOpen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/tracking_settings/open",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Open Tracking Settings"
  },
  "GET_tracking_settings-subscription": {
    "accessPath": [
      "getTrackingSettingsSubscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/tracking_settings/subscription",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Subscription Tracking Settings"
  },
  "PATCH_tracking_settings-subscription": {
    "accessPath": [
      "patchTrackingSettingsSubscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled",
      "html_content",
      "landing",
      "plain_content",
      "replace",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/tracking_settings/subscription",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Subscription Tracking Settings"
  },
  "GET_user-account": {
    "accessPath": [
      "getUserAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/account",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a user's account information."
  },
  "GET_user-credits": {
    "accessPath": [
      "getUserCredits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/credits",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve your credit balance"
  },
  "GET_user-email": {
    "accessPath": [
      "getUserEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/email",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve your account email address"
  },
  "PUT_user-email": {
    "accessPath": [
      "putUserEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PUT",
    "routeTemplate": "/v3/user/email",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update your account email address"
  },
  "PUT_user-password": {
    "accessPath": [
      "putUserPassword"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "new_password",
      "old_password"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PUT",
    "routeTemplate": "/v3/user/password",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update your password"
  },
  "GET_user-profile": {
    "accessPath": [
      "getUserProfile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/profile",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a user's profile"
  },
  "PATCH_user-profile": {
    "accessPath": [
      "patchUserProfile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "address2",
      "city",
      "company",
      "country",
      "first_name",
      "last_name",
      "phone",
      "state",
      "website",
      "zip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/user/profile",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a user's profile"
  },
  "GET_user-scheduled_sends": {
    "accessPath": [
      "getUserScheduledSends"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/scheduled_sends",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all scheduled sends"
  },
  "POST_user-scheduled_sends": {
    "accessPath": [
      "postUserScheduledSends"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "batch_id",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/user/scheduled_sends",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel or pause a scheduled send"
  },
  "DELETE_user-scheduled_sends-batch_id": {
    "accessPath": [
      "deleteUserScheduledSendsBatchId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/user/scheduled_sends/{batch_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a cancellation or pause from a scheduled send"
  },
  "GET_user-scheduled_sends-batch_id": {
    "accessPath": [
      "getUserScheduledSendsBatchId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/scheduled_sends/{batch_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve scheduled send"
  },
  "PATCH_user-scheduled_sends-batch_id": {
    "accessPath": [
      "patchUserScheduledSendsBatchId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/user/scheduled_sends/{batch_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a scheduled send"
  },
  "GET_user-settings-enforced_tls": {
    "accessPath": [
      "getUserSettingsEnforcedTls"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/settings/enforced_tls",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve current Enforced TLS settings."
  },
  "PATCH_user-settings-enforced_tls": {
    "accessPath": [
      "patchUserSettingsEnforcedTls"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "require_tls",
      "require_valid_cert"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/user/settings/enforced_tls",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Enforced TLS settings"
  },
  "GET_user-username": {
    "accessPath": [
      "getUserUsername"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/username",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve your username"
  },
  "PUT_user-username": {
    "accessPath": [
      "putUserUsername"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "username"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PUT",
    "routeTemplate": "/v3/user/username",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update your username"
  },
  "GET_user-webhooks-event-settings": {
    "accessPath": [
      "getUserWebhooksEventSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/webhooks/event/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Event Webhook settings"
  },
  "PATCH_user-webhooks-event-settings": {
    "accessPath": [
      "patchUserWebhooksEventSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "bounce",
      "click",
      "deferred",
      "delivered",
      "dropped",
      "enabled",
      "group_resubscribe",
      "group_unsubscribe",
      "oauth_client_id",
      "oauth_client_secret",
      "oauth_token_url",
      "open",
      "processed",
      "spam_report",
      "unsubscribe",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/user/webhooks/event/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Event Notification Settings"
  },
  "GET_user-webhooks-event-settings-signed": {
    "accessPath": [
      "getUserWebhooksEventSettingsSigned"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/webhooks/event/settings/signed",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Signed Webhook Public Key"
  },
  "PATCH_user-webhooks-event-settings-signed": {
    "accessPath": [
      "patchUserWebhooksEventSettingsSigned"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/user/webhooks/event/settings/signed",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Enable/Disable Signed Webhook"
  },
  "POST_user-webhooks-event-test": {
    "accessPath": [
      "postUserWebhooksEventTest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "oauth_client_id",
      "oauth_client_secret",
      "oauth_token_url",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/user/webhooks/event/test",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test Event Notification Settings"
  },
  "GET_user-webhooks-parse-settings": {
    "accessPath": [
      "getUserWebhooksParseSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/webhooks/parse/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve all parse settings"
  },
  "POST_user-webhooks-parse-settings": {
    "accessPath": [
      "postUserWebhooksParseSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "hostname",
      "send_raw",
      "spam_check",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/user/webhooks/parse/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a parse setting"
  },
  "DELETE_user-webhooks-parse-settings-hostname": {
    "accessPath": [
      "deleteUserWebhooksParseSettingsHostname"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/user/webhooks/parse/settings/{hostname}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "hostname"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a parse setting"
  },
  "GET_user-webhooks-parse-settings-hostname": {
    "accessPath": [
      "getUserWebhooksParseSettingsHostname"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/webhooks/parse/settings/{hostname}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "hostname"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a specific parse setting"
  },
  "PATCH_user-webhooks-parse-settings-hostname": {
    "accessPath": [
      "patchUserWebhooksParseSettingsHostname"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "hostname",
      "send_raw",
      "spam_check",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/user/webhooks/parse/settings/{hostname}",
    "pathConflictKeys": [
      "hostname"
    ],
    "pathParameterKeys": [
      "hostname"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a parse setting"
  },
  "GET_user-webhooks-parse-stats": {
    "accessPath": [
      "getUserWebhooksParseStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/user/webhooks/parse/stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "aggregated_by",
      "start_date",
      "end_date"
    ],
    "description": "Retrieves Inbound Parse Webhook statistics.",
    "parameterDescriptions": {
      "limit": "The number of statistics to return on each page.",
      "offset": "The number of statistics to skip.",
      "aggregated_by": "How you would like the statistics to by grouped. ",
      "start_date": "The starting date of the statistics you want to retrieve. Must be in the format YYYY-MM-DD",
      "end_date": "The end date of the statistics you want to retrieve. Must be in the format YYYY-MM-DD"
    }
  },
  "POST_validations-email": {
    "accessPath": [
      "postValidationsEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "source"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/validations/email",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Validate an email"
  },
  "GET_verified_senders": {
    "accessPath": [
      "getVerifiedSenders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/verified_senders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "lastSeenID",
      "id"
    ],
    "description": "Get All Verified Senders"
  },
  "POST_verified_senders": {
    "accessPath": [
      "postVerifiedSenders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "address2",
      "city",
      "country",
      "from_email",
      "from_name",
      "nickname",
      "reply_to",
      "reply_to_name",
      "state",
      "zip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/verified_senders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Verified Sender Request"
  },
  "GET_verified_senders-domains": {
    "accessPath": [
      "getVerifiedSendersDomains"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/verified_senders/domains",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Domain Warn List"
  },
  "POST_verified_senders-resend-id": {
    "accessPath": [
      "postVerifiedSendersResendId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/verified_senders/resend/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Resend Verified Sender Request"
  },
  "GET_verified_senders-steps_completed": {
    "accessPath": [
      "getVerifiedSendersStepsCompleted"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/verified_senders/steps_completed",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Completed Steps"
  },
  "GET_verified_senders-verify-token": {
    "accessPath": [
      "getVerifiedSendersVerifyToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/verified_senders/verify/{token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Verify Sender Request"
  },
  "DELETE_verified_senders-id": {
    "accessPath": [
      "deleteVerifiedSendersId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/verified_senders/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Verified Sender"
  },
  "PATCH_verified_senders-id": {
    "accessPath": [
      "patchVerifiedSendersId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "address2",
      "city",
      "country",
      "from_email",
      "from_name",
      "nickname",
      "reply_to",
      "reply_to_name",
      "state",
      "zip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v3/verified_senders/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit Verified Sender"
  },
  "POST_whitelabel-dns-email": {
    "accessPath": [
      "postWhitelabelDnsEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "domain_id",
      "email",
      "link_id",
      "message"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/whitelabel/dns/email",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Email DNS records to a co-worker"
  },
  "GET_whitelabel-domains": {
    "accessPath": [
      "getWhitelabelDomains"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/whitelabel/domains",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "exclude_subusers",
      "username",
      "domain"
    ],
    "description": "List all authenticated domains",
    "parameterDescriptions": {
      "limit": "Number of domains to return.",
      "offset": "Paging offset.",
      "exclude_subusers": "Exclude subuser domains from the result.",
      "username": "The username associated with an authenticated domain.",
      "domain": "Search for authenticated domains."
    }
  },
  "POST_whitelabel-domains": {
    "accessPath": [
      "postWhitelabelDomains"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "automatic_security",
      "custom_dkim_selector",
      "custom_spf",
      "default",
      "domain",
      "ips",
      "subdomain",
      "username"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/whitelabel/domains",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate a domain"
  },
  "GET_whitelabel-domains-default": {
    "accessPath": [
      "getWhitelabelDomainsDefault"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/whitelabel/domains/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "domain"
    ],
    "description": "Get the default authentication",
    "parameterDescriptions": {
      "domain": "The domain to find a default authentication."
    }
  },
  "DELETE_whitelabel-domains-subuser": {
    "accessPath": [
      "deleteWhitelabelDomainsSubuser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/whitelabel/domains/subuser",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "username"
    ],
    "description": "Disassociate an authenticated domain from a given user.",
    "parameterDescriptions": {
      "username": "Username for the subuser to find associated authenticated domain."
    }
  },
  "GET_whitelabel-domains-subuser": {
    "accessPath": [
      "getWhitelabelDomainsSubuser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/whitelabel/domains/subuser",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "username"
    ],
    "description": "List the authenticated domain associated with the given user.",
    "parameterDescriptions": {
      "username": "Username for the subuser to find associated authenticated domain."
    }
  },
  "DELETE_whitelabel-domains-domain_id": {
    "accessPath": [
      "deleteWhitelabelDomainsDomainId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/whitelabel/domains/{domain_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "domain_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an authenticated domain."
  },
  "GET_whitelabel-domains-domain_id": {
    "accessPath": [
      "getWhitelabelDomainsDomainId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/whitelabel/domains/{domain_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "domain_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an authenticated domain"
  },
  "PATCH_whitelabel-domains-domain_id": {
    "accessPath": [
      "patchWhitelabelDomainsDomainId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "custom_spf",
      "default"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/whitelabel/domains/{domain_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "domain_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an authenticated domain"
  },
  "POST_whitelabel-domains-domain_id-subuser": {
    "accessPath": [
      "postWhitelabelDomainsDomainIdSubuser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "username"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/whitelabel/domains/{domain_id}/subuser",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "domain_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Associate an authenticated domain with a given user."
  },
  "POST_whitelabel-domains-id-ips": {
    "accessPath": [
      "postWhitelabelDomainsIdIps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/whitelabel/domains/{id}/ips",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add an IP to an authenticated domain"
  },
  "DELETE_whitelabel-domains-id-ips-ip": {
    "accessPath": [
      "deleteWhitelabelDomainsIdIpsIp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/whitelabel/domains/{id}/ips/{ip}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "ip"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove an IP from an authenticated domain."
  },
  "POST_whitelabel-domains-id-validate": {
    "accessPath": [
      "postWhitelabelDomainsIdValidate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/whitelabel/domains/{id}/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Validate a domain authentication."
  },
  "GET_whitelabel-ips": {
    "accessPath": [
      "getWhitelabelIps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/whitelabel/ips",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "ip"
    ],
    "description": "Retrieve all reverse DNS records",
    "parameterDescriptions": {
      "limit": "The maximum number of results to retrieve.",
      "offset": "The point in the list of results to begin retrieving IP addresses from.",
      "ip": "The IP address segment that you'd like to use in a prefix search."
    }
  },
  "POST_whitelabel-ips": {
    "accessPath": [
      "postWhitelabelIps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "domain",
      "ip",
      "subdomain"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/whitelabel/ips",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set up reverse DNS"
  },
  "DELETE_whitelabel-ips-id": {
    "accessPath": [
      "deleteWhitelabelIpsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/whitelabel/ips/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a reverse DNS record"
  },
  "GET_whitelabel-ips-id": {
    "accessPath": [
      "getWhitelabelIpsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/whitelabel/ips/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a reverse DNS record"
  },
  "POST_whitelabel-ips-id-validate": {
    "accessPath": [
      "postWhitelabelIpsIdValidate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/whitelabel/ips/{id}/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Validate a reverse DNS record"
  },
  "GET_whitelabel-links": {
    "accessPath": [
      "getWhitelabelLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/whitelabel/links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit"
    ],
    "description": "Retrieve all branded links",
    "parameterDescriptions": {
      "limit": "Limits the number of results returned per page."
    }
  },
  "POST_whitelabel-links": {
    "accessPath": [
      "postWhitelabelLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "default",
      "domain",
      "subdomain"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/whitelabel/links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a branded link"
  },
  "GET_whitelabel-links-default": {
    "accessPath": [
      "getWhitelabelLinksDefault"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/whitelabel/links/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "domain"
    ],
    "description": "Retrieve the default branded link",
    "parameterDescriptions": {
      "domain": "The domain to match against when finding the default branded link."
    }
  },
  "DELETE_whitelabel-links-subuser": {
    "accessPath": [
      "deleteWhitelabelLinksSubuser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v3/whitelabel/links/subuser",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "username"
    ],
    "description": "Disassociate a branded link from a subuser",
    "parameterDescriptions": {
      "username": "The username of the subuser account that you want to disassociate a branded link from."
    }
  },
  "GET_whitelabel-links-subuser": {
    "accessPath": [
      "getWhitelabelLinksSubuser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v3/whitelabel/links/subuser",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "username"
    ],
    "description": "Retrieve a subuser's branded link",
    "parameterDescriptions": {
      "username": "The username of the subuser to retrieve associated branded links for."
    }
  },
  "DELETE_whitelabel-links-id": {
    "accessPath": [
      "deleteWhitelabelLinksId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "DELETE",
    "routeTemplate": "/v3/whitelabel/links/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a branded link"
  },
  "GET_whitelabel-links-id": {
    "accessPath": [
      "getWhitelabelLinksId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "GET",
    "routeTemplate": "/v3/whitelabel/links/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a branded link"
  },
  "PATCH_whitelabel-links-id": {
    "accessPath": [
      "patchWhitelabelLinksId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "default"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "PATCH",
    "routeTemplate": "/v3/whitelabel/links/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a branded link"
  },
  "POST_whitelabel-links-id-validate": {
    "accessPath": [
      "postWhitelabelLinksIdValidate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "on-behalf-of"
    ],
    "method": "POST",
    "routeTemplate": "/v3/whitelabel/links/{id}/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Validate a branded link"
  },
  "POST_whitelabel-links-link_id-subuser": {
    "accessPath": [
      "postWhitelabelLinksLinkIdSubuser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "username"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v3/whitelabel/links/{link_id}/subuser",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Associate a branded link with a subuser"
  }
} satisfies ToolRuntimeMetadataMap;
