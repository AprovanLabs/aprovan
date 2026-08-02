import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "admin_apps_approve": {
    "accessPath": [
      "adminAppsApprove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "app_id",
      "request_id",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.apps.approve",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Approve an app for installation on a workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.apps:write`"
    }
  },
  "admin_apps_approved_list": {
    "accessPath": [
      "adminAppsApprovedList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/admin.apps.approved.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "limit",
      "cursor",
      "team_id",
      "enterprise_id"
    ],
    "description": "List approved apps for an org or workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.apps:read`",
      "limit": "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page"
    }
  },
  "admin_apps_requests_list": {
    "accessPath": [
      "adminAppsRequestsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/admin.apps.requests.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "limit",
      "cursor",
      "team_id"
    ],
    "description": "List app requests for a team/workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.apps:read`",
      "limit": "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page"
    }
  },
  "admin_apps_restrict": {
    "accessPath": [
      "adminAppsRestrict"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "app_id",
      "request_id",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.apps.restrict",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Restrict an app for installation on a workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.apps:write`"
    }
  },
  "admin_apps_restricted_list": {
    "accessPath": [
      "adminAppsRestrictedList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/admin.apps.restricted.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "limit",
      "cursor",
      "team_id",
      "enterprise_id"
    ],
    "description": "List restricted apps for an org or workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.apps:read`",
      "limit": "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page"
    }
  },
  "admin_conversations_archive": {
    "accessPath": [
      "adminConversationsArchive"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive a public or private channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:write`"
    }
  },
  "admin_conversations_convertToPrivate": {
    "accessPath": [
      "adminConversationsConvertToPrivate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.convertToPrivate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Convert a public channel to a private channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:write`"
    }
  },
  "admin_conversations_create": {
    "accessPath": [
      "adminConversationsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "is_private",
      "name",
      "org_wide",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a public or private channel-based conversation.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:write`"
    }
  },
  "admin_conversations_delete": {
    "accessPath": [
      "adminConversationsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a public or private channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:write`"
    }
  },
  "admin_conversations_disconnectShared": {
    "accessPath": [
      "adminConversationsDisconnectShared"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id",
      "leaving_team_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.disconnectShared",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Disconnect a connected channel from one or more workspaces.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:write`"
    }
  },
  "admin_conversations_ekm_listOriginalConnectedChannelInfo": {
    "accessPath": [
      "adminConversationsEkmListOriginalConnectedChannelInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/admin.conversations.ekm.listOriginalConnectedChannelInfo",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "channel_ids",
      "team_ids",
      "limit",
      "cursor"
    ],
    "description": "List all disconnected channels—i.e., channels that were once connected to other workspaces and then disconnected—and the corresponding original channel IDs for key revocation with EKM.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:read`",
      "channel_ids": "A comma-separated list of channels to filter to.",
      "team_ids": "A comma-separated list of the workspaces to which the channels you would like returned belong.",
      "limit": "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page."
    }
  },
  "admin_conversations_getConversationPrefs": {
    "accessPath": [
      "adminConversationsGetConversationPrefs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/admin.conversations.getConversationPrefs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "channel_id"
    ],
    "description": "Get conversation preferences for a public or private channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:read`",
      "channel_id": "The channel to get preferences for."
    }
  },
  "admin_conversations_getTeams": {
    "accessPath": [
      "adminConversationsGetTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/admin.conversations.getTeams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "channel_id",
      "cursor",
      "limit"
    ],
    "description": "Get all the workspaces a given public or private channel is connected to within this Enterprise org.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:read`",
      "channel_id": "The channel to determine connected workspaces within the organization for.",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page",
      "limit": "The maximum number of items to return. Must be between 1 - 1000 both inclusive."
    }
  },
  "admin_conversations_invite": {
    "accessPath": [
      "adminConversationsInvite"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id",
      "user_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.invite",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invite a user to a public or private channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:write`"
    }
  },
  "admin_conversations_rename": {
    "accessPath": [
      "adminConversationsRename"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.rename",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rename a public or private channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:write`"
    }
  },
  "admin_conversations_restrictAccess_addGroup": {
    "accessPath": [
      "adminConversationsRestrictAccessAddGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id",
      "group_id",
      "team_id",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.restrictAccess.addGroup",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add an allowlist of IDP groups for accessing a channel"
  },
  "admin_conversations_restrictAccess_listGroups": {
    "accessPath": [
      "adminConversationsRestrictAccessListGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/admin.conversations.restrictAccess.listGroups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "channel_id",
      "team_id"
    ],
    "description": "List all IDP Groups linked to a channel",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:read`",
      "team_id": "The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization."
    }
  },
  "admin_conversations_restrictAccess_removeGroup": {
    "accessPath": [
      "adminConversationsRestrictAccessRemoveGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id",
      "group_id",
      "team_id",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.restrictAccess.removeGroup",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove a linked IDP group linked from a private channel"
  },
  "admin_conversations_search": {
    "accessPath": [
      "adminConversationsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/admin.conversations.search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "team_ids",
      "query",
      "limit",
      "cursor",
      "search_channel_types",
      "sort",
      "sort_dir"
    ],
    "description": "Search for public or private channels in an Enterprise organization.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:read`",
      "team_ids": "Comma separated string of team IDs, signifying the workspaces to search through.",
      "query": "Name of the the channel to query by.",
      "limit": "Maximum number of items to be returned. Must be between 1 - 20 both inclusive. Default is 10.",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page.",
      "search_channel_types": "The type of channel to include or exclude in the search. For example `private` will search private channels, while `private_exclude` will exclude them. For a full list of types, check the [Types section](#types).",
      "sort": "Possible values are `relevant` (search ranking based on what we think is closest), `name` (alphabetical), `member_count` (number of users in the channel), and `created` (date channel was created). You can optionally pair this with the `sort_dir` arg to change how it is sorted ",
      "sort_dir": "Sort direction. Possible values are `asc` for ascending order like (1, 2, 3) or (a, b, c), and `desc` for descending order like (3, 2, 1) or (c, b, a)"
    }
  },
  "admin_conversations_setConversationPrefs": {
    "accessPath": [
      "adminConversationsSetConversationPrefs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id",
      "prefs"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.setConversationPrefs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set the posting permissions for a public or private channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:write`"
    }
  },
  "admin_conversations_setTeams": {
    "accessPath": [
      "adminConversationsSetTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id",
      "org_channel",
      "target_team_ids",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.setTeams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set the workspaces in an Enterprise grid org that connect to a public or private channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:write`"
    }
  },
  "admin_conversations_unarchive": {
    "accessPath": [
      "adminConversationsUnarchive"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.conversations.unarchive",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unarchive a public or private channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.conversations:write`"
    }
  },
  "admin_emoji_add": {
    "accessPath": [
      "adminEmojiAdd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "token",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/admin.emoji.add",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add an emoji."
  },
  "admin_emoji_addAlias": {
    "accessPath": [
      "adminEmojiAddAlias"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "alias_for",
      "name",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/admin.emoji.addAlias",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add an emoji alias."
  },
  "admin_emoji_list": {
    "accessPath": [
      "adminEmojiList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/admin.emoji.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "cursor",
      "limit"
    ],
    "description": "List emoji for an Enterprise Grid organization.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.teams:read`",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page",
      "limit": "The maximum number of items to return. Must be between 1 - 1000 both inclusive."
    }
  },
  "admin_emoji_remove": {
    "accessPath": [
      "adminEmojiRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/admin.emoji.remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove an emoji across an Enterprise Grid organization"
  },
  "admin_emoji_rename": {
    "accessPath": [
      "adminEmojiRename"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "new_name",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/admin.emoji.rename",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rename an emoji."
  },
  "admin_inviteRequests_approve": {
    "accessPath": [
      "adminInviteRequestsApprove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "invite_request_id",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.inviteRequests.approve",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Approve a workspace invite request.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.invites:write`"
    }
  },
  "admin_inviteRequests_approved_list": {
    "accessPath": [
      "adminInviteRequestsApprovedList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/admin.inviteRequests.approved.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "team_id",
      "cursor",
      "limit"
    ],
    "description": "List all approved workspace invite requests.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.invites:read`",
      "team_id": "ID for the workspace where the invite requests were made.",
      "cursor": "Value of the `next_cursor` field sent as part of the previous API response",
      "limit": "The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive"
    }
  },
  "admin_inviteRequests_denied_list": {
    "accessPath": [
      "adminInviteRequestsDeniedList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/admin.inviteRequests.denied.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "team_id",
      "cursor",
      "limit"
    ],
    "description": "List all denied workspace invite requests.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.invites:read`",
      "team_id": "ID for the workspace where the invite requests were made.",
      "cursor": "Value of the `next_cursor` field sent as part of the previous api response",
      "limit": "The number of results that will be returned by the API on each invocation. Must be between 1 - 1000 both inclusive"
    }
  },
  "admin_inviteRequests_deny": {
    "accessPath": [
      "adminInviteRequestsDeny"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "invite_request_id",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.inviteRequests.deny",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deny a workspace invite request.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.invites:write`"
    }
  },
  "admin_inviteRequests_list": {
    "accessPath": [
      "adminInviteRequestsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/admin.inviteRequests.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "team_id",
      "cursor",
      "limit"
    ],
    "description": "List all pending workspace invite requests.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.invites:read`",
      "team_id": "ID for the workspace where the invite requests were made.",
      "cursor": "Value of the `next_cursor` field sent as part of the previous API response",
      "limit": "The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive"
    }
  },
  "admin_teams_admins_list": {
    "accessPath": [
      "adminTeamsAdminsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/admin.teams.admins.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "limit",
      "cursor",
      "team_id"
    ],
    "description": "List all of the admins on a given workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.teams:read`",
      "limit": "The maximum number of items to return.",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page."
    }
  },
  "admin_teams_create": {
    "accessPath": [
      "adminTeamsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "team_description",
      "team_discoverability",
      "team_domain",
      "team_name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.teams.create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an Enterprise team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.teams:write`"
    }
  },
  "admin_teams_list": {
    "accessPath": [
      "adminTeamsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/admin.teams.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "cursor"
    ],
    "description": "List all teams on an Enterprise organization",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.teams:read`",
      "limit": "The maximum number of items to return. Must be between 1 - 100 both inclusive.",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page."
    }
  },
  "admin_teams_owners_list": {
    "accessPath": [
      "adminTeamsOwnersList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/admin.teams.owners.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "team_id",
      "limit",
      "cursor"
    ],
    "description": "List all of the owners on a given workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.teams:read`",
      "limit": "The maximum number of items to return. Must be between 1 - 1000 both inclusive.",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page."
    }
  },
  "admin_teams_settings_info": {
    "accessPath": [
      "adminTeamsSettingsInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/admin.teams.settings.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "team_id"
    ],
    "description": "Fetch information about settings in a workspace",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.teams:read`"
    }
  },
  "admin_teams_settings_setDefaultChannels": {
    "accessPath": [
      "adminTeamsSettingsSetDefaultChannels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_ids",
      "team_id",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/admin.teams.settings.setDefaultChannels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set the default channels of a workspace."
  },
  "admin_teams_settings_setDescription": {
    "accessPath": [
      "adminTeamsSettingsSetDescription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.teams.settings.setDescription",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set the description of a given workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.teams:write`"
    }
  },
  "admin_teams_settings_setDiscoverability": {
    "accessPath": [
      "adminTeamsSettingsSetDiscoverability"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "discoverability",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.teams.settings.setDiscoverability",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "An API method that allows admins to set the discoverability of a given workspace",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.teams:write`"
    }
  },
  "admin_teams_settings_setIcon": {
    "accessPath": [
      "adminTeamsSettingsSetIcon"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "image_url",
      "team_id",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/admin.teams.settings.setIcon",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Sets the icon of a workspace."
  },
  "admin_teams_settings_setName": {
    "accessPath": [
      "adminTeamsSettingsSetName"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.teams.settings.setName",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set the name of a given workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.teams:write`"
    }
  },
  "admin_usergroups_addChannels": {
    "accessPath": [
      "adminUsergroupsAddChannels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_ids",
      "team_id",
      "usergroup_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.usergroups.addChannels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add one or more default channels to an IDP group.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.usergroups:write`"
    }
  },
  "admin_usergroups_addTeams": {
    "accessPath": [
      "adminUsergroupsAddTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "auto_provision",
      "team_ids",
      "usergroup_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.usergroups.addTeams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Associate one or more default workspaces with an organization-wide IDP group.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.teams:write`"
    }
  },
  "admin_usergroups_listChannels": {
    "accessPath": [
      "adminUsergroupsListChannels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/admin.usergroups.listChannels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "usergroup_id",
      "team_id",
      "include_num_members"
    ],
    "description": "List the channels linked to an org-level IDP group (user group).",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.usergroups:read`",
      "usergroup_id": "ID of the IDP group to list default channels for.",
      "team_id": "ID of the the workspace.",
      "include_num_members": "Flag to include or exclude the count of members per channel."
    }
  },
  "admin_usergroups_removeChannels": {
    "accessPath": [
      "adminUsergroupsRemoveChannels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_ids",
      "usergroup_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.usergroups.removeChannels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove one or more default channels from an org-level IDP group (user group).",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.usergroups:write`"
    }
  },
  "admin_users_assign": {
    "accessPath": [
      "adminUsersAssign"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_ids",
      "is_restricted",
      "is_ultra_restricted",
      "team_id",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.users.assign",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add an Enterprise user to a workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.users:write`"
    }
  },
  "admin_users_invite": {
    "accessPath": [
      "adminUsersInvite"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_ids",
      "custom_message",
      "email",
      "guest_expiration_ts",
      "is_restricted",
      "is_ultra_restricted",
      "real_name",
      "resend",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.users.invite",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invite a user to a workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.users:write`"
    }
  },
  "admin_users_list": {
    "accessPath": [
      "adminUsersList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/admin.users.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "team_id",
      "cursor",
      "limit"
    ],
    "description": "List users on a workspace",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.users:read`",
      "team_id": "The ID (`T1234`) of the workspace.",
      "cursor": "Set `cursor` to `next_cursor` returned by the previous call to list items in the next page.",
      "limit": "Limit for how many users to be retrieved per page"
    }
  },
  "admin_users_remove": {
    "accessPath": [
      "adminUsersRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "team_id",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.users.remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove a user from a workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.users:write`"
    }
  },
  "admin_users_session_invalidate": {
    "accessPath": [
      "adminUsersSessionInvalidate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "session_id",
      "team_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.users.session.invalidate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invalidate a single session for a user by session_id",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.users:write`"
    }
  },
  "admin_users_session_reset": {
    "accessPath": [
      "adminUsersSessionReset"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "mobile_only",
      "user_id",
      "web_only"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.users.session.reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Wipes all valid sessions on all devices for a given user",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.users:write`"
    }
  },
  "admin_users_setAdmin": {
    "accessPath": [
      "adminUsersSetAdmin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "team_id",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.users.setAdmin",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set an existing guest, regular user, or owner to be an admin user.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.users:write`"
    }
  },
  "admin_users_setExpiration": {
    "accessPath": [
      "adminUsersSetExpiration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expiration_ts",
      "team_id",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.users.setExpiration",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set an expiration for a guest user",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.users:write`"
    }
  },
  "admin_users_setOwner": {
    "accessPath": [
      "adminUsersSetOwner"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "team_id",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.users.setOwner",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set an existing guest, regular user, or admin user to be a workspace owner.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.users:write`"
    }
  },
  "admin_users_setRegular": {
    "accessPath": [
      "adminUsersSetRegular"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "team_id",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/admin.users.setRegular",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set an existing guest user, admin user, or owner to be a regular user.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin.users:write`"
    }
  },
  "api_test": {
    "accessPath": [
      "apiTest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/api.test",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "error",
      "foo"
    ],
    "description": "Checks API calling code.",
    "parameterDescriptions": {
      "error": "Error response to return",
      "foo": "example property to return"
    }
  },
  "apps_event_authorizations_list": {
    "accessPath": [
      "appsEventAuthorizationsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/apps.event.authorizations.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "event_context",
      "cursor",
      "limit"
    ],
    "description": "Get a list of authorizations for the given event context. Each authorization represents an app installation that the event is visible to.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `authorizations:read`"
    }
  },
  "apps_permissions_info": {
    "accessPath": [
      "appsPermissionsInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/apps.permissions.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token"
    ],
    "description": "Returns list of permissions this app has on a team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`"
    }
  },
  "apps_permissions_request": {
    "accessPath": [
      "appsPermissionsRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/apps.permissions.request",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "scopes",
      "trigger_id"
    ],
    "description": "Allows an app to request additional scopes",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "scopes": "A comma separated list of scopes to request for",
      "trigger_id": "Token used to trigger the permissions API"
    }
  },
  "apps_permissions_resources_list": {
    "accessPath": [
      "appsPermissionsResourcesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/apps.permissions.resources.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "cursor",
      "limit"
    ],
    "description": "Returns list of resource grants this app has on a team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "cursor": "Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail.",
      "limit": "The maximum number of items to return."
    }
  },
  "apps_permissions_scopes_list": {
    "accessPath": [
      "appsPermissionsScopesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/apps.permissions.scopes.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token"
    ],
    "description": "Returns list of scopes this app has on a team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`"
    }
  },
  "apps_permissions_users_list": {
    "accessPath": [
      "appsPermissionsUsersList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/apps.permissions.users.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "cursor",
      "limit"
    ],
    "description": "Returns list of user grants and corresponding scopes this app has on a team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "cursor": "Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail.",
      "limit": "The maximum number of items to return."
    }
  },
  "apps_permissions_users_request": {
    "accessPath": [
      "appsPermissionsUsersRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/apps.permissions.users.request",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "scopes",
      "trigger_id",
      "user"
    ],
    "description": "Enables an app to trigger a permissions modal to grant an app access to a user access scope.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "scopes": "A comma separated list of user scopes to request for",
      "trigger_id": "Token used to trigger the request",
      "user": "The user this scope is being requested for"
    }
  },
  "apps_uninstall": {
    "accessPath": [
      "appsUninstall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/apps.uninstall",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "client_id",
      "client_secret"
    ],
    "description": "Uninstalls your app from a workspace.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "client_id": "Issued when you created your application.",
      "client_secret": "Issued when you created your application."
    }
  },
  "auth_revoke": {
    "accessPath": [
      "authRevoke"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/auth.revoke",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "test"
    ],
    "description": "Revokes a token.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "test": "Setting this parameter to `1` triggers a _testing mode_ where the specified token will not actually be revoked."
    }
  },
  "auth_test": {
    "accessPath": [
      "authTest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/auth.test",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Checks authentication & identity.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`"
    }
  },
  "bots_info": {
    "accessPath": [
      "botsInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/bots.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "bot"
    ],
    "description": "Gets information about a bot user.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `users:read`",
      "bot": "Bot user to get info on"
    }
  },
  "calls_add": {
    "accessPath": [
      "callsAdd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "created_by",
      "date_start",
      "desktop_app_join_url",
      "external_display_id",
      "external_unique_id",
      "join_url",
      "title",
      "users"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/calls.add",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Registers a new Call.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `calls:write`"
    }
  },
  "calls_end": {
    "accessPath": [
      "callsEnd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "duration",
      "id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/calls.end",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Ends a Call.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `calls:write`"
    }
  },
  "calls_info": {
    "accessPath": [
      "callsInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/calls.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "id"
    ],
    "description": "Returns information about a Call.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `calls:read`",
      "id": "`id` of the Call returned by the [`calls.add`](/methods/calls.add) method."
    }
  },
  "calls_participants_add": {
    "accessPath": [
      "callsParticipantsAdd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "users"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/calls.participants.add",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Registers new participants added to a Call.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `calls:write`"
    }
  },
  "calls_participants_remove": {
    "accessPath": [
      "callsParticipantsRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "users"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/calls.participants.remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Registers participants removed from a Call.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `calls:write`"
    }
  },
  "calls_update": {
    "accessPath": [
      "callsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "desktop_app_join_url",
      "id",
      "join_url",
      "title"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/calls.update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates information about a Call.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `calls:write`"
    }
  },
  "chat_delete": {
    "accessPath": [
      "chatDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "as_user",
      "channel",
      "ts"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/chat.delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes a message.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `chat:write`"
    }
  },
  "chat_deleteScheduledMessage": {
    "accessPath": [
      "chatDeleteScheduledMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "as_user",
      "channel",
      "scheduled_message_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/chat.deleteScheduledMessage",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes a pending scheduled message from the queue.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `chat:write`"
    }
  },
  "chat_getPermalink": {
    "accessPath": [
      "chatGetPermalink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/chat.getPermalink",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "channel",
      "message_ts"
    ],
    "description": "Retrieve a permalink URL for a specific extant message",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "channel": "The ID of the conversation or channel containing the message",
      "message_ts": "A message's `ts` value, uniquely identifying it within a channel"
    }
  },
  "chat_meMessage": {
    "accessPath": [
      "chatMeMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "text"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/chat.meMessage",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Share a me message into a channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `chat:write`"
    }
  },
  "chat_postEphemeral": {
    "accessPath": [
      "chatPostEphemeral"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "as_user",
      "attachments",
      "blocks",
      "channel",
      "icon_emoji",
      "icon_url",
      "link_names",
      "parse",
      "text",
      "thread_ts",
      "user",
      "username"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/chat.postEphemeral",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Sends an ephemeral message to a user in a channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `chat:write`"
    }
  },
  "chat_postMessage": {
    "accessPath": [
      "chatPostMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "as_user",
      "attachments",
      "blocks",
      "channel",
      "icon_emoji",
      "icon_url",
      "link_names",
      "mrkdwn",
      "parse",
      "reply_broadcast",
      "text",
      "thread_ts",
      "unfurl_links",
      "unfurl_media",
      "username"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/chat.postMessage",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Sends a message to a channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `chat:write`"
    }
  },
  "chat_scheduleMessage": {
    "accessPath": [
      "chatScheduleMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "as_user",
      "attachments",
      "blocks",
      "channel",
      "link_names",
      "parse",
      "post_at",
      "reply_broadcast",
      "text",
      "thread_ts",
      "unfurl_links",
      "unfurl_media"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/chat.scheduleMessage",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Schedules a message to be sent to a channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `chat:write`"
    }
  },
  "chat_scheduledMessages_list": {
    "accessPath": [
      "chatScheduledMessagesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/chat.scheduledMessages.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "channel",
      "latest",
      "oldest",
      "limit",
      "cursor"
    ],
    "description": "Returns a list of scheduled messages.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "channel": "The channel of the scheduled messages",
      "latest": "A UNIX timestamp of the latest value in the time range",
      "oldest": "A UNIX timestamp of the oldest value in the time range",
      "limit": "Maximum number of original entries to return.",
      "cursor": "For pagination purposes, this is the `cursor` value returned from a previous call to `chat.scheduledmessages.list` indicating where you want to start this call from."
    }
  },
  "chat_unfurl": {
    "accessPath": [
      "chatUnfurl"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "ts",
      "unfurls",
      "user_auth_message",
      "user_auth_required",
      "user_auth_url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/chat.unfurl",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Provide custom unfurl behavior for user-posted URLs",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `links:write`"
    }
  },
  "chat_update": {
    "accessPath": [
      "chatUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "as_user",
      "attachments",
      "blocks",
      "channel",
      "link_names",
      "parse",
      "text",
      "ts"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/chat.update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates a message.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `chat:write`"
    }
  },
  "conversations_archive": {
    "accessPath": [
      "conversationsArchive"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archives a conversation.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_close": {
    "accessPath": [
      "conversationsClose"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.close",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Closes a direct message or multi-person direct message.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_create": {
    "accessPath": [
      "conversationsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "is_private",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Initiates a public or private channel-based conversation",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_history": {
    "accessPath": [
      "conversationsHistory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/conversations.history",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "channel",
      "latest",
      "oldest",
      "inclusive",
      "limit",
      "cursor"
    ],
    "description": "Fetches a conversation's history of messages and events.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:history`",
      "channel": "Conversation ID to fetch history for.",
      "latest": "End of time range of messages to include in results.",
      "oldest": "Start of time range of messages to include in results.",
      "inclusive": "Include messages with latest or oldest timestamp in results only when either timestamp is specified.",
      "limit": "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached.",
      "cursor": "Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."
    }
  },
  "conversations_info": {
    "accessPath": [
      "conversationsInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/conversations.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "channel",
      "include_locale",
      "include_num_members"
    ],
    "description": "Retrieve information about a conversation.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:read`",
      "channel": "Conversation ID to learn more about",
      "include_locale": "Set this to `true` to receive the locale for this conversation. Defaults to `false`",
      "include_num_members": "Set to `true` to include the member count for the specified conversation. Defaults to `false`"
    }
  },
  "conversations_invite": {
    "accessPath": [
      "conversationsInvite"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "users"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.invite",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invites users to a channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_join": {
    "accessPath": [
      "conversationsJoin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.join",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Joins an existing conversation.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `channels:write`"
    }
  },
  "conversations_kick": {
    "accessPath": [
      "conversationsKick"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.kick",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Removes a user from a conversation.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_leave": {
    "accessPath": [
      "conversationsLeave"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.leave",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Leaves a conversation.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_list": {
    "accessPath": [
      "conversationsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/conversations.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "exclude_archived",
      "types",
      "limit",
      "cursor"
    ],
    "description": "Lists all channels in a Slack team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:read`",
      "exclude_archived": "Set to `true` to exclude archived channels from the list",
      "types": "Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im`",
      "limit": "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000.",
      "cursor": "Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."
    }
  },
  "conversations_mark": {
    "accessPath": [
      "conversationsMark"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "ts"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.mark",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Sets the read cursor in a channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_members": {
    "accessPath": [
      "conversationsMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/conversations.members",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "channel",
      "limit",
      "cursor"
    ],
    "description": "Retrieve members of a conversation.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:read`",
      "channel": "ID of the conversation to retrieve members for",
      "limit": "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached.",
      "cursor": "Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."
    }
  },
  "conversations_open": {
    "accessPath": [
      "conversationsOpen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "return_im",
      "users"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.open",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Opens or resumes a direct message or multi-person direct message.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_rename": {
    "accessPath": [
      "conversationsRename"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.rename",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Renames a conversation.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_replies": {
    "accessPath": [
      "conversationsReplies"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/conversations.replies",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "channel",
      "ts",
      "latest",
      "oldest",
      "inclusive",
      "limit",
      "cursor"
    ],
    "description": "Retrieve a thread of messages posted to a conversation",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:history`",
      "channel": "Conversation ID to fetch thread from.",
      "ts": "Unique identifier of a thread's parent message. `ts` must be the timestamp of an existing message with 0 or more replies. If there are no replies then just the single message referenced by `ts` will return - it is just an ordinary, unthreaded message.",
      "latest": "End of time range of messages to include in results.",
      "oldest": "Start of time range of messages to include in results.",
      "inclusive": "Include messages with latest or oldest timestamp in results only when either timestamp is specified.",
      "limit": "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached.",
      "cursor": "Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."
    }
  },
  "conversations_setPurpose": {
    "accessPath": [
      "conversationsSetPurpose"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "purpose"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.setPurpose",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Sets the purpose for a conversation.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_setTopic": {
    "accessPath": [
      "conversationsSetTopic"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "topic"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.setTopic",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Sets the topic for a conversation.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "conversations_unarchive": {
    "accessPath": [
      "conversationsUnarchive"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/conversations.unarchive",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reverses conversation archival.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:write`"
    }
  },
  "dialog_open": {
    "accessPath": [
      "dialogOpen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/dialog.open",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "dialog",
      "trigger_id"
    ],
    "description": "Open a dialog with a user",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "dialog": "The dialog definition. This must be a JSON-encoded string.",
      "trigger_id": "Exchange a trigger to post to the user."
    }
  },
  "dnd_endDnd": {
    "accessPath": [
      "dndEndDnd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/dnd.endDnd",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Ends the current user's Do Not Disturb session immediately.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `dnd:write`"
    }
  },
  "dnd_endSnooze": {
    "accessPath": [
      "dndEndSnooze"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/dnd.endSnooze",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Ends the current user's snooze mode immediately.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `dnd:write`"
    }
  },
  "dnd_info": {
    "accessPath": [
      "dndInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/dnd.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "user"
    ],
    "description": "Retrieves a user's current Do Not Disturb status.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `dnd:read`",
      "user": "User to fetch status for (defaults to current user)"
    }
  },
  "dnd_setSnooze": {
    "accessPath": [
      "dndSetSnooze"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "num_minutes",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/dnd.setSnooze",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Turns on Do Not Disturb mode for the current user, or changes its duration."
  },
  "dnd_teamInfo": {
    "accessPath": [
      "dndTeamInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/dnd.teamInfo",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "users"
    ],
    "description": "Retrieves the Do Not Disturb status for up to 50 users on a team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `dnd:read`",
      "users": "Comma-separated list of users to fetch Do Not Disturb status for"
    }
  },
  "emoji_list": {
    "accessPath": [
      "emojiList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/emoji.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token"
    ],
    "description": "Lists custom emoji for a team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `emoji:read`"
    }
  },
  "files_comments_delete": {
    "accessPath": [
      "filesCommentsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/files.comments.delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes an existing comment on a file.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `files:write:user`"
    }
  },
  "files_delete": {
    "accessPath": [
      "filesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/files.delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes a file.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `files:write:user`"
    }
  },
  "files_info": {
    "accessPath": [
      "filesInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/files.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "file",
      "count",
      "page",
      "limit",
      "cursor"
    ],
    "description": "Gets information about a file.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `files:read`",
      "file": "Specify a file by providing its ID.",
      "limit": "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached.",
      "cursor": "Parameter for pagination. File comments are paginated for a single file. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first \"page\" of the collection of comments. See [pagination](/docs/pagination) for more details."
    }
  },
  "files_list": {
    "accessPath": [
      "filesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/files.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "user",
      "channel",
      "ts_from",
      "ts_to",
      "types",
      "count",
      "page",
      "show_files_hidden_by_limit"
    ],
    "description": "List for a team, in a channel, or from a user with applied filters.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `files:read`",
      "user": "Filter files created by a single user.",
      "channel": "Filter files appearing in a specific channel, indicated by its ID.",
      "ts_from": "Filter files created after this timestamp (inclusive).",
      "ts_to": "Filter files created before this timestamp (inclusive).",
      "types": "Filter files by type ([see below](#file_types)). You can pass multiple values in the types argument, like `types=spaces,snippets`.The default value is `all`, which does not filter the list.",
      "show_files_hidden_by_limit": "Show truncated file info for files hidden due to being too old, and the team who owns the file being over the file limit."
    }
  },
  "files_remote_add": {
    "accessPath": [
      "filesRemoteAdd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "external_id",
      "external_url",
      "filetype",
      "indexable_file_contents",
      "preview_image",
      "title",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/files.remote.add",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Adds a file from a remote service"
  },
  "files_remote_info": {
    "accessPath": [
      "filesRemoteInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/files.remote.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "file",
      "external_id"
    ],
    "description": "Retrieve information about a remote file added to Slack",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `remote_files:read`",
      "file": "Specify a file by providing its ID.",
      "external_id": "Creator defined GUID for the file."
    }
  },
  "files_remote_list": {
    "accessPath": [
      "filesRemoteList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/files.remote.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "channel",
      "ts_from",
      "ts_to",
      "limit",
      "cursor"
    ],
    "description": "Retrieve information about a remote file added to Slack",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `remote_files:read`",
      "channel": "Filter files appearing in a specific channel, indicated by its ID.",
      "ts_from": "Filter files created after this timestamp (inclusive).",
      "ts_to": "Filter files created before this timestamp (inclusive).",
      "limit": "The maximum number of items to return.",
      "cursor": "Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."
    }
  },
  "files_remote_remove": {
    "accessPath": [
      "filesRemoteRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "external_id",
      "file",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/files.remote.remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove a remote file."
  },
  "files_remote_share": {
    "accessPath": [
      "filesRemoteShare"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/files.remote.share",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "file",
      "external_id",
      "channels"
    ],
    "description": "Share a remote file into a channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `remote_files:share`",
      "file": "Specify a file registered with Slack by providing its ID. Either this field or `external_id` or both are required.",
      "external_id": "The globally unique identifier (GUID) for the file, as set by the app registering the file with Slack.  Either this field or `file` or both are required.",
      "channels": "Comma-separated list of channel IDs where the file will be shared."
    }
  },
  "files_remote_update": {
    "accessPath": [
      "filesRemoteUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "external_id",
      "external_url",
      "file",
      "filetype",
      "indexable_file_contents",
      "preview_image",
      "title",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/files.remote.update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates an existing remote file."
  },
  "files_revokePublicURL": {
    "accessPath": [
      "filesRevokePublicUrl"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/files.revokePublicURL",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Revokes public/external sharing access for a file",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `files:write:user`"
    }
  },
  "files_sharedPublicURL": {
    "accessPath": [
      "filesSharedPublicUrl"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/files.sharedPublicURL",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Enables a file for public/external sharing.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `files:write:user`"
    }
  },
  "files_upload": {
    "accessPath": [
      "filesUpload"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channels",
      "content",
      "file",
      "filename",
      "filetype",
      "initial_comment",
      "thread_ts",
      "title",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/files.upload",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Uploads or creates a file."
  },
  "migration_exchange": {
    "accessPath": [
      "migrationExchange"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/migration.exchange",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "users",
      "team_id",
      "to_old"
    ],
    "description": "For Enterprise Grid workspaces, map local user IDs to global user IDs",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `tokens.basic`",
      "users": "A comma-separated list of user ids, up to 400 per request",
      "team_id": "Specify team_id starts with `T` in case of Org Token",
      "to_old": "Specify `true` to convert `W` global user IDs to workspace-specific `U` IDs. Defaults to `false`."
    }
  },
  "oauth_access": {
    "accessPath": [
      "oauthAccess"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/oauth.access",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "client_id",
      "client_secret",
      "code",
      "redirect_uri",
      "single_channel"
    ],
    "description": "Exchanges a temporary OAuth verifier code for an access token.",
    "parameterDescriptions": {
      "client_id": "Issued when you created your application.",
      "client_secret": "Issued when you created your application.",
      "code": "The `code` param returned via the OAuth callback.",
      "redirect_uri": "This must match the originally submitted URI (if one was sent).",
      "single_channel": "Request the user to add your app only to a single channel. Only valid with a [legacy workspace app](https://api.slack.com/legacy-workspace-apps)."
    }
  },
  "oauth_token": {
    "accessPath": [
      "oauthToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/oauth.token",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "client_id",
      "client_secret",
      "code",
      "redirect_uri",
      "single_channel"
    ],
    "description": "Exchanges a temporary OAuth verifier code for a workspace token.",
    "parameterDescriptions": {
      "client_id": "Issued when you created your application.",
      "client_secret": "Issued when you created your application.",
      "code": "The `code` param returned via the OAuth callback.",
      "redirect_uri": "This must match the originally submitted URI (if one was sent).",
      "single_channel": "Request the user to add your app only to a single channel."
    }
  },
  "oauth_v2_access": {
    "accessPath": [
      "oauthV2Access"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/oauth.v2.access",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "client_id",
      "client_secret",
      "code",
      "redirect_uri"
    ],
    "description": "Exchanges a temporary OAuth verifier code for an access token.",
    "parameterDescriptions": {
      "client_id": "Issued when you created your application.",
      "client_secret": "Issued when you created your application.",
      "code": "The `code` param returned via the OAuth callback.",
      "redirect_uri": "This must match the originally submitted URI (if one was sent)."
    }
  },
  "pins_add": {
    "accessPath": [
      "pinsAdd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "timestamp"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/pins.add",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Pins an item to a channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `pins:write`"
    }
  },
  "pins_list": {
    "accessPath": [
      "pinsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/pins.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "channel"
    ],
    "description": "Lists items pinned to a channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `pins:read`",
      "channel": "Channel to get pinned items for."
    }
  },
  "pins_remove": {
    "accessPath": [
      "pinsRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "timestamp"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/pins.remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Un-pins an item from a channel.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `pins:write`"
    }
  },
  "reactions_add": {
    "accessPath": [
      "reactionsAdd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "name",
      "timestamp"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/reactions.add",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Adds a reaction to an item.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `reactions:write`"
    }
  },
  "reactions_get": {
    "accessPath": [
      "reactionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/reactions.get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "channel",
      "file",
      "file_comment",
      "full",
      "timestamp"
    ],
    "description": "Gets reactions for an item.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `reactions:read`",
      "channel": "Channel where the message to get reactions for was posted.",
      "file": "File to get reactions for.",
      "file_comment": "File comment to get reactions for.",
      "full": "If true always return the complete reaction list.",
      "timestamp": "Timestamp of the message to get reactions for."
    }
  },
  "reactions_list": {
    "accessPath": [
      "reactionsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/reactions.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "user",
      "full",
      "count",
      "page",
      "cursor",
      "limit"
    ],
    "description": "Lists reactions made by a user.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `reactions:read`",
      "user": "Show reactions made by this user. Defaults to the authed user.",
      "full": "If true always return the complete reaction list.",
      "cursor": "Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more details.",
      "limit": "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached."
    }
  },
  "reactions_remove": {
    "accessPath": [
      "reactionsRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "file",
      "file_comment",
      "name",
      "timestamp"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/reactions.remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Removes a reaction from an item.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `reactions:write`"
    }
  },
  "reminders_add": {
    "accessPath": [
      "remindersAdd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "text",
      "time",
      "user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/reminders.add",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Creates a reminder.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `reminders:write`"
    }
  },
  "reminders_complete": {
    "accessPath": [
      "remindersComplete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "reminder"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/reminders.complete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Marks a reminder as complete.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `reminders:write`"
    }
  },
  "reminders_delete": {
    "accessPath": [
      "remindersDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "reminder"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/reminders.delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes a reminder.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `reminders:write`"
    }
  },
  "reminders_info": {
    "accessPath": [
      "remindersInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/reminders.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "reminder"
    ],
    "description": "Gets information about a reminder.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `reminders:read`",
      "reminder": "The ID of the reminder"
    }
  },
  "reminders_list": {
    "accessPath": [
      "remindersList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/reminders.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token"
    ],
    "description": "Lists all reminders created by or for a given user.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `reminders:read`"
    }
  },
  "rtm_connect": {
    "accessPath": [
      "rtmConnect"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/rtm.connect",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "batch_presence_aware",
      "presence_sub"
    ],
    "description": "Starts a Real Time Messaging session.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `rtm:stream`",
      "batch_presence_aware": "Batch presence deliveries via subscription. Enabling changes the shape of `presence_change` events. See [batch presence](/docs/presence-and-status#batching).",
      "presence_sub": "Only deliver presence events when requested by subscription. See [presence subscriptions](/docs/presence-and-status#subscriptions)."
    }
  },
  "search_messages": {
    "accessPath": [
      "searchMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/search.messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "count",
      "highlight",
      "page",
      "query",
      "sort",
      "sort_dir"
    ],
    "description": "Searches for messages matching a query.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `search:read`",
      "count": "Pass the number of results you want per \"page\". Maximum of `100`.",
      "highlight": "Pass a value of `true` to enable query highlight markers (see below).",
      "query": "Search query.",
      "sort": "Return matches sorted by either `score` or `timestamp`.",
      "sort_dir": "Change sort direction to ascending (`asc`) or descending (`desc`)."
    }
  },
  "stars_add": {
    "accessPath": [
      "starsAdd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "file",
      "file_comment",
      "timestamp"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/stars.add",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Adds a star to an item.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `stars:write`"
    }
  },
  "stars_list": {
    "accessPath": [
      "starsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/stars.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "count",
      "page",
      "cursor",
      "limit"
    ],
    "description": "Lists stars for a user.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `stars:read`",
      "cursor": "Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more details.",
      "limit": "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached."
    }
  },
  "stars_remove": {
    "accessPath": [
      "starsRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel",
      "file",
      "file_comment",
      "timestamp"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/stars.remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Removes a star from an item.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `stars:write`"
    }
  },
  "team_accessLogs": {
    "accessPath": [
      "teamAccessLogs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/team.accessLogs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "before",
      "count",
      "page"
    ],
    "description": "Gets the access logs for the current team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin`",
      "before": "End of time range of logs to include in results (inclusive)."
    }
  },
  "team_billableInfo": {
    "accessPath": [
      "teamBillableInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/team.billableInfo",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "user"
    ],
    "description": "Gets billable users information for the current team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin`",
      "user": "A user to retrieve the billable information for. Defaults to all users."
    }
  },
  "team_info": {
    "accessPath": [
      "teamInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/team.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "team"
    ],
    "description": "Gets information about the current team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `team:read`",
      "team": "Team to get info on, if omitted, will return information about the current team. Will only return team that the authenticated token is allowed to see through external shared channels"
    }
  },
  "team_integrationLogs": {
    "accessPath": [
      "teamIntegrationLogs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/team.integrationLogs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "app_id",
      "change_type",
      "count",
      "page",
      "service_id",
      "user"
    ],
    "description": "Gets the integration logs for the current team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `admin`",
      "app_id": "Filter logs to this Slack app. Defaults to all logs.",
      "change_type": "Filter logs with this change type. Defaults to all logs.",
      "service_id": "Filter logs to this service. Defaults to all logs.",
      "user": "Filter logs generated by this user’s actions. Defaults to all logs."
    }
  },
  "team_profile_get": {
    "accessPath": [
      "teamProfileGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/team.profile.get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "visibility"
    ],
    "description": "Retrieve a team's profile.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `users.profile:read`",
      "visibility": "Filter by visibility."
    }
  },
  "usergroups_create": {
    "accessPath": [
      "usergroupsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channels",
      "description",
      "handle",
      "include_count",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/usergroups.create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a User Group",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `usergroups:write`"
    }
  },
  "usergroups_disable": {
    "accessPath": [
      "usergroupsDisable"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "include_count",
      "usergroup"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/usergroups.disable",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Disable an existing User Group",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `usergroups:write`"
    }
  },
  "usergroups_enable": {
    "accessPath": [
      "usergroupsEnable"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "include_count",
      "usergroup"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/usergroups.enable",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Enable a User Group",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `usergroups:write`"
    }
  },
  "usergroups_list": {
    "accessPath": [
      "usergroupsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/usergroups.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_users",
      "token",
      "include_count",
      "include_disabled"
    ],
    "description": "List all User Groups for a team",
    "parameterDescriptions": {
      "include_users": "Include the list of users for each User Group.",
      "token": "Authentication token. Requires scope: `usergroups:read`",
      "include_count": "Include the number of users in each User Group.",
      "include_disabled": "Include disabled User Groups."
    }
  },
  "usergroups_update": {
    "accessPath": [
      "usergroupsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channels",
      "description",
      "handle",
      "include_count",
      "name",
      "usergroup"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/usergroups.update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an existing User Group",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `usergroups:write`"
    }
  },
  "usergroups_users_list": {
    "accessPath": [
      "usergroupsUsersList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/usergroups.users.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "include_disabled",
      "usergroup"
    ],
    "description": "List all users in a User Group",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `usergroups:read`",
      "include_disabled": "Allow results that involve disabled User Groups.",
      "usergroup": "The encoded ID of the User Group to update."
    }
  },
  "usergroups_users_update": {
    "accessPath": [
      "usergroupsUsersUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "include_count",
      "usergroup",
      "users"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/usergroups.users.update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the list of users for a User Group",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `usergroups:write`"
    }
  },
  "users_conversations": {
    "accessPath": [
      "usersConversations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/users.conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "user",
      "types",
      "exclude_archived",
      "limit",
      "cursor"
    ],
    "description": "List conversations the calling user may access.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `conversations:read`",
      "user": "Browse conversations by a specific user ID's membership. Non-public channels are restricted to those where the calling user shares membership.",
      "types": "Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im`",
      "exclude_archived": "Set to `true` to exclude archived channels from the list",
      "limit": "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000.",
      "cursor": "Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."
    }
  },
  "users_deletePhoto": {
    "accessPath": [
      "usersDeletePhoto"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/users.deletePhoto",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete the user profile photo"
  },
  "users_getPresence": {
    "accessPath": [
      "usersGetPresence"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/users.getPresence",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "user"
    ],
    "description": "Gets user presence information.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `users:read`",
      "user": "User to get presence info on. Defaults to the authed user."
    }
  },
  "users_identity": {
    "accessPath": [
      "usersIdentity"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/users.identity",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token"
    ],
    "description": "Get a user's identity.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `identity.basic`"
    }
  },
  "users_info": {
    "accessPath": [
      "usersInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/users.info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "include_locale",
      "user"
    ],
    "description": "Gets information about a user.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `users:read`",
      "include_locale": "Set this to `true` to receive the locale for this user. Defaults to `false`",
      "user": "User to get info on"
    }
  },
  "users_list": {
    "accessPath": [
      "usersList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/users.list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "limit",
      "cursor",
      "include_locale"
    ],
    "description": "Lists all users in a Slack team.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `users:read`",
      "limit": "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. Providing no `limit` value will result in Slack attempting to deliver you the entire result set. If the collection is too large you may experience `limit_required` or HTTP 500 errors.",
      "cursor": "Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail.",
      "include_locale": "Set this to `true` to receive the locale for users. Defaults to `false`"
    }
  },
  "users_lookupByEmail": {
    "accessPath": [
      "usersLookupByEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/users.lookupByEmail",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "email"
    ],
    "description": "Find a user with an email address.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `users:read.email`",
      "email": "An email address belonging to a user in the workspace"
    }
  },
  "users_profile_get": {
    "accessPath": [
      "usersProfileGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/users.profile.get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "token",
      "include_labels",
      "user"
    ],
    "description": "Retrieves a user's profile information.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `users.profile:read`",
      "include_labels": "Include labels for each ID in custom profile fields",
      "user": "User to retrieve profile info for"
    }
  },
  "users_profile_set": {
    "accessPath": [
      "usersProfileSet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "profile",
      "user",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/users.profile.set",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set the profile information for a user.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `users.profile:write`"
    }
  },
  "users_setActive": {
    "accessPath": [
      "usersSetActive"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/users.setActive",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Marked a user as active. Deprecated and non-functional.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `users:write`"
    }
  },
  "users_setPhoto": {
    "accessPath": [
      "usersSetPhoto"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "crop_w",
      "crop_x",
      "crop_y",
      "image",
      "token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/users.setPhoto",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set the user profile photo"
  },
  "users_setPresence": {
    "accessPath": [
      "usersSetPresence"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "presence"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "POST",
    "routeTemplate": "/api/users.setPresence",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Manually sets user presence.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `users:write`"
    }
  },
  "views_open": {
    "accessPath": [
      "viewsOpen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/views.open",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "trigger_id",
      "view"
    ],
    "description": "Open a view for a user.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "trigger_id": "Exchange a trigger to post to the user.",
      "view": "A [view payload](/reference/surfaces/views). This must be a JSON-encoded string."
    }
  },
  "views_publish": {
    "accessPath": [
      "viewsPublish"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/views.publish",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user_id",
      "view",
      "hash"
    ],
    "description": "Publish a static view for a User.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "user_id": "`id` of the user you want publish a view to.",
      "view": "A [view payload](/reference/surfaces/views). This must be a JSON-encoded string.",
      "hash": "A string that represents view state to protect against possible race conditions."
    }
  },
  "views_push": {
    "accessPath": [
      "viewsPush"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/views.push",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "trigger_id",
      "view"
    ],
    "description": "Push a view onto the stack of a root view.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "trigger_id": "Exchange a trigger to post to the user.",
      "view": "A [view payload](/reference/surfaces/views). This must be a JSON-encoded string."
    }
  },
  "views_update": {
    "accessPath": [
      "viewsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/views.update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "view_id",
      "external_id",
      "view",
      "hash"
    ],
    "description": "Update an existing view.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `none`",
      "view_id": "A unique identifier of the view to be updated. Either `view_id` or `external_id` is required.",
      "external_id": "A unique identifier of the view set by the developer. Must be unique for all views on a team. Max length of 255 characters. Either `view_id` or `external_id` is required.",
      "view": "A [view object](/reference/surfaces/views). This must be a JSON-encoded string.",
      "hash": "A string that represents view state to protect against possible race conditions."
    }
  },
  "workflows_stepCompleted": {
    "accessPath": [
      "workflowsStepCompleted"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/workflows.stepCompleted",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workflow_step_execute_id",
      "outputs"
    ],
    "description": "Indicate that an app's step in a workflow completed execution.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `workflow.steps:execute`",
      "workflow_step_execute_id": "Context identifier that maps to the correct workflow step execution.",
      "outputs": "Key-value object of outputs from your step. Keys of this object reflect the configured `key` properties of your [`outputs`](/reference/workflows/workflow_step#output) array from your `workflow_step` object."
    }
  },
  "workflows_stepFailed": {
    "accessPath": [
      "workflowsStepFailed"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/workflows.stepFailed",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workflow_step_execute_id",
      "error"
    ],
    "description": "Indicate that an app's step in a workflow failed to execute.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `workflow.steps:execute`",
      "workflow_step_execute_id": "Context identifier that maps to the correct workflow step execution.",
      "error": "A JSON-based object with a `message` property that should contain a human readable error message."
    }
  },
  "workflows_updateStep": {
    "accessPath": [
      "workflowsUpdateStep"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "token"
    ],
    "method": "GET",
    "routeTemplate": "/api/workflows.updateStep",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workflow_step_edit_id",
      "inputs",
      "outputs",
      "step_name",
      "step_image_url"
    ],
    "description": "Update the configuration for a workflow extension step.",
    "parameterDescriptions": {
      "token": "Authentication token. Requires scope: `workflow.steps:execute`",
      "workflow_step_edit_id": "A context identifier provided with `view_submission` payloads used to call back to `workflows.updateStep`.",
      "inputs": "A JSON key-value map of inputs required from a user during configuration. This is the data your app expects to receive when the workflow step starts. **Please note**: the embedded variable format is set and replaced by the workflow system. You cannot create custom variables that will be replaced at runtime. [Read more about variables in workflow steps here](/workflows/steps#variables).",
      "outputs": "An JSON array of output objects used during step execution. This is the data your app agrees to provide when your workflow step was executed.",
      "step_name": "An optional field that can be used to override the step name that is shown in the Workflow Builder.",
      "step_image_url": "An optional field that can be used to override app image that is shown in the Workflow Builder."
    }
  }
} satisfies ToolRuntimeMetadataMap;
