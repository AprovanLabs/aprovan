import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "get_my_application": {
    "accessPath": [
      "getMyApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_my_application": {
    "accessPath": [
      "updateMyApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "icon",
      "cover_image",
      "team_id",
      "flags",
      "interactions_endpoint_url",
      "explicit_content_filter",
      "max_participants",
      "type",
      "tags",
      "custom_install_url",
      "install_params",
      "role_connections_verification_url",
      "integration_types_config",
      "event_webhooks_status",
      "event_webhooks_url",
      "event_webhooks_types"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/applications/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_application": {
    "accessPath": [
      "getApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_application": {
    "accessPath": [
      "updateApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "icon",
      "cover_image",
      "team_id",
      "flags",
      "interactions_endpoint_url",
      "explicit_content_filter",
      "max_participants",
      "type",
      "tags",
      "custom_install_url",
      "install_params",
      "role_connections_verification_url",
      "integration_types_config",
      "event_webhooks_status",
      "event_webhooks_url",
      "event_webhooks_types"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/applications/{application_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "applications_get_activity_instance": {
    "accessPath": [
      "applicationsGetActivityInstance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/activity-instances/{instance_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "instance_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "upload_application_attachment": {
    "accessPath": [
      "uploadApplicationAttachment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/applications/{application_id}/attachment",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_application_commands": {
    "accessPath": [
      "listApplicationCommands"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/commands",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_localizations"
    ]
  },
  "bulk_set_application_commands": {
    "accessPath": [
      "bulkSetApplicationCommands"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/applications/{application_id}/commands",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_application_command": {
    "accessPath": [
      "createApplicationCommand"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "name_localizations",
      "description",
      "description_localizations",
      "options",
      "default_member_permissions",
      "dm_permission",
      "contexts",
      "integration_types",
      "handler",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/applications/{application_id}/commands",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_application_command": {
    "accessPath": [
      "getApplicationCommand"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/commands/{command_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "command_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_application_command": {
    "accessPath": [
      "deleteApplicationCommand"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/applications/{application_id}/commands/{command_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "command_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_application_command": {
    "accessPath": [
      "updateApplicationCommand"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "name_localizations",
      "description",
      "description_localizations",
      "options",
      "default_member_permissions",
      "dm_permission",
      "contexts",
      "integration_types",
      "handler"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/applications/{application_id}/commands/{command_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "command_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_application_emojis": {
    "accessPath": [
      "listApplicationEmojis"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/emojis",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_application_emoji": {
    "accessPath": [
      "createApplicationEmoji"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "image"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/applications/{application_id}/emojis",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_application_emoji": {
    "accessPath": [
      "getApplicationEmoji"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/emojis/{emoji_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "emoji_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_application_emoji": {
    "accessPath": [
      "deleteApplicationEmoji"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/applications/{application_id}/emojis/{emoji_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "emoji_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_application_emoji": {
    "accessPath": [
      "updateApplicationEmoji"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/applications/{application_id}/emojis/{emoji_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "emoji_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_entitlements": {
    "accessPath": [
      "getEntitlements"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/entitlements",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user_id",
      "sku_ids",
      "guild_id",
      "before",
      "after",
      "limit",
      "exclude_ended",
      "exclude_deleted",
      "only_active"
    ]
  },
  "create_entitlement": {
    "accessPath": [
      "createEntitlement"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "sku_id",
      "owner_id",
      "owner_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/applications/{application_id}/entitlements",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_entitlement": {
    "accessPath": [
      "getEntitlement"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/entitlements/{entitlement_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "entitlement_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_entitlement": {
    "accessPath": [
      "deleteEntitlement"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/applications/{application_id}/entitlements/{entitlement_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "entitlement_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "consume_entitlement": {
    "accessPath": [
      "consumeEntitlement"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/applications/{application_id}/entitlements/{entitlement_id}/consume",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "entitlement_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_application_commands": {
    "accessPath": [
      "listGuildApplicationCommands"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/guilds/{guild_id}/commands",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_localizations"
    ]
  },
  "bulk_set_guild_application_commands": {
    "accessPath": [
      "bulkSetGuildApplicationCommands"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/applications/{application_id}/guilds/{guild_id}/commands",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_guild_application_command": {
    "accessPath": [
      "createGuildApplicationCommand"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "name_localizations",
      "description",
      "description_localizations",
      "options",
      "default_member_permissions",
      "dm_permission",
      "contexts",
      "integration_types",
      "handler",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/applications/{application_id}/guilds/{guild_id}/commands",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_application_command_permissions": {
    "accessPath": [
      "listGuildApplicationCommandPermissions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/guilds/{guild_id}/commands/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_application_command": {
    "accessPath": [
      "getGuildApplicationCommand"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/guilds/{guild_id}/commands/{command_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "guild_id",
      "command_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_guild_application_command": {
    "accessPath": [
      "deleteGuildApplicationCommand"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/applications/{application_id}/guilds/{guild_id}/commands/{command_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "guild_id",
      "command_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_guild_application_command": {
    "accessPath": [
      "updateGuildApplicationCommand"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "name_localizations",
      "description",
      "description_localizations",
      "options",
      "default_member_permissions",
      "dm_permission",
      "contexts",
      "integration_types",
      "handler"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/applications/{application_id}/guilds/{guild_id}/commands/{command_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "guild_id",
      "command_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_application_command_permissions": {
    "accessPath": [
      "getGuildApplicationCommandPermissions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "guild_id",
      "command_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "set_guild_application_command_permissions": {
    "accessPath": [
      "setGuildApplicationCommandPermissions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "permissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id",
      "guild_id",
      "command_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_application_role_connections_metadata": {
    "accessPath": [
      "getApplicationRoleConnectionsMetadata"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/applications/{application_id}/role-connections/metadata",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_application_role_connections_metadata": {
    "accessPath": [
      "updateApplicationRoleConnectionsMetadata"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/applications/{application_id}/role-connections/metadata",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_channel": {
    "accessPath": [
      "getChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_channel": {
    "accessPath": [
      "deleteChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_channel": {
    "accessPath": [
      "updateChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/channels/{channel_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "follow_channel": {
    "accessPath": [
      "followChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "webhook_channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_channel_invites": {
    "accessPath": [
      "listChannelInvites"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/invites",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_channel_invite": {
    "accessPath": [
      "createChannelInvite"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/invites",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_messages": {
    "accessPath": [
      "listMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "around",
      "before",
      "after",
      "limit"
    ]
  },
  "create_message": {
    "accessPath": [
      "createMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "content",
      "embeds",
      "allowed_mentions",
      "sticker_ids",
      "components",
      "flags",
      "attachments",
      "poll",
      "shared_client_theme",
      "message_reference",
      "nonce",
      "enforce_nonce",
      "tts"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "bulk_delete_messages": {
    "accessPath": [
      "bulkDeleteMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "messages"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/bulk-delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_pins": {
    "accessPath": [
      "listPins"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/pins",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "before",
      "limit"
    ]
  },
  "create_pin": {
    "accessPath": [
      "createPin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/pins/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_pin": {
    "accessPath": [
      "deletePin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/pins/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_message": {
    "accessPath": [
      "getMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_message": {
    "accessPath": [
      "deleteMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_message": {
    "accessPath": [
      "updateMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "content",
      "embeds",
      "flags",
      "allowed_mentions",
      "sticker_ids",
      "components",
      "attachments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "crosspost_message": {
    "accessPath": [
      "crosspostMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}/crosspost",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_all_message_reactions": {
    "accessPath": [
      "deleteAllMessageReactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}/reactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_message_reactions_by_emoji": {
    "accessPath": [
      "listMessageReactionsByEmoji"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id",
      "emoji_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "limit",
      "type"
    ]
  },
  "delete_all_message_reactions_by_emoji": {
    "accessPath": [
      "deleteAllMessageReactionsByEmoji"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id",
      "emoji_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "add_my_message_reaction": {
    "accessPath": [
      "addMyMessageReaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id",
      "emoji_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_my_message_reaction": {
    "accessPath": [
      "deleteMyMessageReaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id",
      "emoji_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_user_message_reaction": {
    "accessPath": [
      "deleteUserMessageReaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id",
      "emoji_name",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_thread_from_message": {
    "accessPath": [
      "createThreadFromMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "auto_archive_duration",
      "rate_limit_per_user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/messages/{message_id}/threads",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "set_channel_permission_overwrite": {
    "accessPath": [
      "setChannelPermissionOverwrite"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "type",
      "allow",
      "deny"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/channels/{channel_id}/permissions/{overwrite_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "overwrite_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_channel_permission_overwrite": {
    "accessPath": [
      "deleteChannelPermissionOverwrite"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/permissions/{overwrite_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "overwrite_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deprecated_list_pins": {
    "accessPath": [
      "deprecatedListPins"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/pins",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deprecated_create_pin": {
    "accessPath": [
      "deprecatedCreatePin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/channels/{channel_id}/pins/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deprecated_delete_pin": {
    "accessPath": [
      "deprecatedDeletePin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/pins/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_answer_voters": {
    "accessPath": [
      "getAnswerVoters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/polls/{message_id}/answers/{answer_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id",
      "answer_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "limit"
    ]
  },
  "poll_expire": {
    "accessPath": [
      "pollExpire"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/polls/{message_id}/expire",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "add_group_dm_user": {
    "accessPath": [
      "addGroupDmUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "access_token",
      "nick"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/channels/{channel_id}/recipients/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_group_dm_user": {
    "accessPath": [
      "deleteGroupDmUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/recipients/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "send_soundboard_sound": {
    "accessPath": [
      "sendSoundboardSound"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "sound_id",
      "source_guild_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/send-soundboard-sound",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_thread_members": {
    "accessPath": [
      "listThreadMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/thread-members",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_member",
      "limit",
      "after"
    ]
  },
  "join_thread": {
    "accessPath": [
      "joinThread"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/channels/{channel_id}/thread-members/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "leave_thread": {
    "accessPath": [
      "leaveThread"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/thread-members/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_thread_member": {
    "accessPath": [
      "getThreadMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/thread-members/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_member"
    ]
  },
  "add_thread_member": {
    "accessPath": [
      "addThreadMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/channels/{channel_id}/thread-members/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_thread_member": {
    "accessPath": [
      "deleteThreadMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/channels/{channel_id}/thread-members/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_thread": {
    "accessPath": [
      "createThread"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/threads",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_private_archived_threads": {
    "accessPath": [
      "listPrivateArchivedThreads"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/threads/archived/private",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "before",
      "limit"
    ]
  },
  "list_public_archived_threads": {
    "accessPath": [
      "listPublicArchivedThreads"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/threads/archived/public",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "before",
      "limit"
    ]
  },
  "thread_search": {
    "accessPath": [
      "threadSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/threads/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "name",
      "slop",
      "min_id",
      "max_id",
      "tag",
      "tag_setting",
      "archived",
      "sort_by",
      "sort_order",
      "limit",
      "offset"
    ]
  },
  "trigger_typing_indicator": {
    "accessPath": [
      "triggerTypingIndicator"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/typing",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_my_private_archived_threads": {
    "accessPath": [
      "listMyPrivateArchivedThreads"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/users/@me/threads/archived/private",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "before",
      "limit"
    ]
  },
  "update_voice_channel_status": {
    "accessPath": [
      "updateVoiceChannelStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/channels/{channel_id}/voice-status",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set a voice channel's status."
  },
  "list_channel_webhooks": {
    "accessPath": [
      "listChannelWebhooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/channels/{channel_id}/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_webhook": {
    "accessPath": [
      "createWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "avatar"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/channels/{channel_id}/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_gateway": {
    "accessPath": [
      "getGateway"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/gateway",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_bot_gateway": {
    "accessPath": [
      "getBotGateway"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/gateway/bot",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_template": {
    "accessPath": [
      "getGuildTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/templates/{code}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild": {
    "accessPath": [
      "getGuild"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_counts"
    ]
  },
  "update_guild": {
    "accessPath": [
      "updateGuild"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "region",
      "icon",
      "verification_level",
      "default_message_notifications",
      "explicit_content_filter",
      "preferred_locale",
      "afk_timeout",
      "afk_channel_id",
      "system_channel_id",
      "splash",
      "banner",
      "system_channel_flags",
      "features",
      "discovery_splash",
      "home_header",
      "rules_channel_id",
      "safety_alerts_channel_id",
      "public_updates_channel_id",
      "premium_progress_bar_enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_audit_log_entries": {
    "accessPath": [
      "listGuildAuditLogEntries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/audit-logs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user_id",
      "target_id",
      "action_type",
      "before",
      "after",
      "limit"
    ]
  },
  "list_auto_moderation_rules": {
    "accessPath": [
      "listAutoModerationRules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/auto-moderation/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_auto_moderation_rule": {
    "accessPath": [
      "createAutoModerationRule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/guilds/{guild_id}/auto-moderation/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_auto_moderation_rule": {
    "accessPath": [
      "getAutoModerationRule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/auto-moderation/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_auto_moderation_rule": {
    "accessPath": [
      "deleteAutoModerationRule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/auto-moderation/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_auto_moderation_rule": {
    "accessPath": [
      "updateAutoModerationRule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/auto-moderation/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_bans": {
    "accessPath": [
      "listGuildBans"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/bans",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "before",
      "after"
    ]
  },
  "get_guild_ban": {
    "accessPath": [
      "getGuildBan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/bans/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ban_user_from_guild": {
    "accessPath": [
      "banUserFromGuild"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "delete_message_seconds",
      "delete_message_days"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/guilds/{guild_id}/bans/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "unban_user_from_guild": {
    "accessPath": [
      "unbanUserFromGuild"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/bans/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "bulk_ban_users_from_guild": {
    "accessPath": [
      "bulkBanUsersFromGuild"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_ids",
      "delete_message_seconds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/guilds/{guild_id}/bulk-ban",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_channels": {
    "accessPath": [
      "listGuildChannels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_guild_channel": {
    "accessPath": [
      "createGuildChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "type",
      "name",
      "position",
      "topic",
      "bitrate",
      "user_limit",
      "nsfw",
      "rate_limit_per_user",
      "parent_id",
      "permission_overwrites",
      "rtc_region",
      "video_quality_mode",
      "default_auto_archive_duration",
      "default_reaction_emoji",
      "default_thread_rate_limit_per_user",
      "default_sort_order",
      "default_forum_layout",
      "default_tag_setting",
      "available_tags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/guilds/{guild_id}/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "bulk_update_guild_channels": {
    "accessPath": [
      "bulkUpdateGuildChannels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_emojis": {
    "accessPath": [
      "listGuildEmojis"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/emojis",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_guild_emoji": {
    "accessPath": [
      "createGuildEmoji"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "image",
      "roles"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/guilds/{guild_id}/emojis",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_emoji": {
    "accessPath": [
      "getGuildEmoji"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/emojis/{emoji_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "emoji_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_guild_emoji": {
    "accessPath": [
      "deleteGuildEmoji"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/emojis/{emoji_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "emoji_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_guild_emoji": {
    "accessPath": [
      "updateGuildEmoji"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "roles"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/emojis/{emoji_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "emoji_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_integrations": {
    "accessPath": [
      "listGuildIntegrations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/integrations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_guild_integration": {
    "accessPath": [
      "deleteGuildIntegration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/integrations/{integration_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "integration_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_invites": {
    "accessPath": [
      "listGuildInvites"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/invites",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_members": {
    "accessPath": [
      "listGuildMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/members",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "after"
    ]
  },
  "update_my_guild_member": {
    "accessPath": [
      "updateMyGuildMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "nick",
      "avatar",
      "bio",
      "banner"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/members/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "search_guild_members": {
    "accessPath": [
      "searchGuildMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/members/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "query"
    ]
  },
  "get_guild_member": {
    "accessPath": [
      "getGuildMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/members/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "add_guild_member": {
    "accessPath": [
      "addGuildMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "nick",
      "roles",
      "mute",
      "deaf",
      "access_token",
      "flags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/guilds/{guild_id}/members/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_guild_member": {
    "accessPath": [
      "deleteGuildMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/members/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_guild_member": {
    "accessPath": [
      "updateGuildMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "nick",
      "roles",
      "mute",
      "deaf",
      "channel_id",
      "communication_disabled_until",
      "flags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/members/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "add_guild_member_role": {
    "accessPath": [
      "addGuildMemberRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/guilds/{guild_id}/members/{user_id}/roles/{role_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id",
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_guild_member_role": {
    "accessPath": [
      "deleteGuildMemberRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/members/{user_id}/roles/{role_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id",
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "guild_search": {
    "accessPath": [
      "guildSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/messages/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort_by",
      "sort_order",
      "content",
      "slop",
      "author_id",
      "author_type",
      "mentions",
      "mentions_role_id",
      "replied_to_user_id",
      "replied_to_message_id",
      "mention_everyone",
      "min_id",
      "max_id",
      "limit",
      "offset",
      "has",
      "link_hostname",
      "embed_provider",
      "embed_type",
      "attachment_extension",
      "attachment_filename",
      "pinned",
      "include_nsfw",
      "channel_id"
    ]
  },
  "get_guild_new_member_welcome": {
    "accessPath": [
      "getGuildNewMemberWelcome"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/new-member-welcome",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guilds_onboarding": {
    "accessPath": [
      "getGuildsOnboarding"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/onboarding",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "put_guilds_onboarding": {
    "accessPath": [
      "putGuildsOnboarding"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "prompts",
      "enabled",
      "default_channel_ids",
      "mode"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/guilds/{guild_id}/onboarding",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_preview": {
    "accessPath": [
      "getGuildPreview"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/preview",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "preview_prune_guild": {
    "accessPath": [
      "previewPruneGuild"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/prune",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "days",
      "include_roles"
    ]
  },
  "prune_guild": {
    "accessPath": [
      "pruneGuild"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "days",
      "compute_prune_count",
      "include_roles"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/guilds/{guild_id}/prune",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_voice_regions": {
    "accessPath": [
      "listGuildVoiceRegions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/regions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_join_requests": {
    "accessPath": [
      "getGuildJoinRequests"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "status",
      "limit",
      "before",
      "after"
    ],
    "description": "List join requests for guild, optionally filtered by application status"
  },
  "action_guild_join_request": {
    "accessPath": [
      "actionGuildJoinRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "action",
      "rejection_reason"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/requests/{request_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "request_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Approve or reject guild join request"
  },
  "list_guild_roles": {
    "accessPath": [
      "listGuildRoles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_guild_role": {
    "accessPath": [
      "createGuildRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "permissions",
      "color",
      "colors",
      "hoist",
      "mentionable",
      "icon",
      "unicode_emoji"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/guilds/{guild_id}/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "bulk_update_guild_roles": {
    "accessPath": [
      "bulkUpdateGuildRoles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "guild_role_member_counts": {
    "accessPath": [
      "guildRoleMemberCounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/roles/member-counts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_role": {
    "accessPath": [
      "getGuildRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/roles/{role_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_guild_role": {
    "accessPath": [
      "deleteGuildRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/roles/{role_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_guild_role": {
    "accessPath": [
      "updateGuildRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "permissions",
      "color",
      "colors",
      "hoist",
      "mentionable",
      "icon",
      "unicode_emoji"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/roles/{role_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_scheduled_events": {
    "accessPath": [
      "listGuildScheduledEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/scheduled-events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_user_count"
    ]
  },
  "create_guild_scheduled_event": {
    "accessPath": [
      "createGuildScheduledEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/guilds/{guild_id}/scheduled-events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_scheduled_event": {
    "accessPath": [
      "getGuildScheduledEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "guild_scheduled_event_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_user_count"
    ]
  },
  "delete_guild_scheduled_event": {
    "accessPath": [
      "deleteGuildScheduledEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "guild_scheduled_event_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_guild_scheduled_event": {
    "accessPath": [
      "updateGuildScheduledEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "guild_scheduled_event_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_scheduled_event_users": {
    "accessPath": [
      "listGuildScheduledEventUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "guild_scheduled_event_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_member",
      "limit",
      "before",
      "after"
    ]
  },
  "list_guild_soundboard_sounds": {
    "accessPath": [
      "listGuildSoundboardSounds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/soundboard-sounds",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_guild_soundboard_sound": {
    "accessPath": [
      "createGuildSoundboardSound"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "volume",
      "emoji_id",
      "emoji_name",
      "sound"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/guilds/{guild_id}/soundboard-sounds",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_soundboard_sound": {
    "accessPath": [
      "getGuildSoundboardSound"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/soundboard-sounds/{sound_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "sound_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_guild_soundboard_sound": {
    "accessPath": [
      "deleteGuildSoundboardSound"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/soundboard-sounds/{sound_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "sound_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_guild_soundboard_sound": {
    "accessPath": [
      "updateGuildSoundboardSound"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "volume",
      "emoji_id",
      "emoji_name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/soundboard-sounds/{sound_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "sound_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_stickers": {
    "accessPath": [
      "listGuildStickers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/stickers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_guild_sticker": {
    "accessPath": [
      "createGuildSticker"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "tags",
      "description",
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/guilds/{guild_id}/stickers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_sticker": {
    "accessPath": [
      "getGuildSticker"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/stickers/{sticker_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "sticker_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_guild_sticker": {
    "accessPath": [
      "deleteGuildSticker"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/stickers/{sticker_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "sticker_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_guild_sticker": {
    "accessPath": [
      "updateGuildSticker"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "tags",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/stickers/{sticker_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "sticker_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_guild_templates": {
    "accessPath": [
      "listGuildTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_guild_template": {
    "accessPath": [
      "createGuildTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/guilds/{guild_id}/templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "sync_guild_template": {
    "accessPath": [
      "syncGuildTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/guilds/{guild_id}/templates/{code}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_guild_template": {
    "accessPath": [
      "deleteGuildTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/guilds/{guild_id}/templates/{code}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_guild_template": {
    "accessPath": [
      "updateGuildTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/templates/{code}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_active_guild_threads": {
    "accessPath": [
      "getActiveGuildThreads"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/threads/active",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_vanity_url": {
    "accessPath": [
      "getGuildVanityUrl"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/vanity-url",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_self_voice_state": {
    "accessPath": [
      "getSelfVoiceState"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/voice-states/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_self_voice_state": {
    "accessPath": [
      "updateSelfVoiceState"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "request_to_speak_timestamp",
      "suppress",
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/voice-states/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_voice_state": {
    "accessPath": [
      "getVoiceState"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/voice-states/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_voice_state": {
    "accessPath": [
      "updateVoiceState"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "suppress",
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/voice-states/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_webhooks": {
    "accessPath": [
      "getGuildWebhooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_welcome_screen": {
    "accessPath": [
      "getGuildWelcomeScreen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/welcome-screen",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_guild_welcome_screen": {
    "accessPath": [
      "updateGuildWelcomeScreen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "welcome_channels",
      "enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/welcome-screen",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_widget_settings": {
    "accessPath": [
      "getGuildWidgetSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/widget",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_guild_widget_settings": {
    "accessPath": [
      "updateGuildWidgetSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id",
      "enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/guilds/{guild_id}/widget",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_widget": {
    "accessPath": [
      "getGuildWidget"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/widget.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_guild_widget_png": {
    "accessPath": [
      "getGuildWidgetPng"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/guilds/{guild_id}/widget.png",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "style"
    ]
  },
  "create_interaction_response": {
    "accessPath": [
      "createInteractionResponse"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/interactions/{interaction_id}/{interaction_token}/callback",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "interaction_id",
      "interaction_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_response"
    ]
  },
  "invite_resolve": {
    "accessPath": [
      "inviteResolve"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/invites/{code}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_counts",
      "guild_scheduled_event_id"
    ]
  },
  "invite_revoke": {
    "accessPath": [
      "inviteRevoke"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/invites/{code}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_invite_target_users": {
    "accessPath": [
      "getInviteTargetUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/invites/{code}/target-users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get the target users for an invite."
  },
  "update_invite_target_users": {
    "accessPath": [
      "updateInviteTargetUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "target_users_file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/invites/{code}/target-users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the target users for an existing invite."
  },
  "get_invite_target_users_job_status": {
    "accessPath": [
      "getInviteTargetUsersJobStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/invites/{code}/target-users/job-status",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get the target users job status for an invite."
  },
  "create_or_join_lobby": {
    "accessPath": [
      "createOrJoinLobby"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "idle_timeout_seconds",
      "lobby_metadata",
      "member_metadata",
      "secret",
      "flags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/lobbies",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_lobby": {
    "accessPath": [
      "createLobby"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "idle_timeout_seconds",
      "members",
      "metadata",
      "flags",
      "override_event_webhooks_url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/lobbies",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_lobby": {
    "accessPath": [
      "getLobby"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "edit_lobby": {
    "accessPath": [
      "editLobby"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "idle_timeout_seconds",
      "metadata",
      "members",
      "flags",
      "override_event_webhooks_url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "edit_lobby_channel_link": {
    "accessPath": [
      "editLobbyChannelLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}/channel-linking",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "leave_lobby": {
    "accessPath": [
      "leaveLobby"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}/members/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_linked_lobby_guild_invite_for_self": {
    "accessPath": [
      "createLinkedLobbyGuildInviteForSelf"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}/members/@me/invites",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "bulk_update_lobby_members": {
    "accessPath": [
      "bulkUpdateLobbyMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}/members/bulk",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "add_lobby_member": {
    "accessPath": [
      "addLobbyMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "metadata",
      "flags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}/members/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_lobby_member": {
    "accessPath": [
      "deleteLobbyMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}/members/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_linked_lobby_guild_invite_for_user": {
    "accessPath": [
      "createLinkedLobbyGuildInviteForUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}/members/{user_id}/invites",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_lobby_messages": {
    "accessPath": [
      "getLobbyMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit"
    ]
  },
  "create_lobby_message": {
    "accessPath": [
      "createLobbyMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "content",
      "embeds",
      "allowed_mentions",
      "sticker_ids",
      "components",
      "flags",
      "attachments",
      "poll",
      "shared_client_theme",
      "message_reference",
      "nonce",
      "enforce_nonce",
      "tts"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_lobby_message_external_moderation_metadata": {
    "accessPath": [
      "updateLobbyMessageExternalModerationMetadata"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/lobbies/{lobby_id}/messages/{message_id}/moderation-metadata",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "lobby_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the external moderation metadata for a lobby message."
  },
  "get_my_oauth2_authorization": {
    "accessPath": [
      "getMyOauth2Authorization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/oauth2/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_my_oauth2_application": {
    "accessPath": [
      "getMyOauth2Application"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/oauth2/applications/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_public_keys": {
    "accessPath": [
      "getPublicKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/oauth2/keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_openid_connect_userinfo": {
    "accessPath": [
      "getOpenidConnectUserinfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/oauth2/userinfo",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_user_message_external_moderation_metadata": {
    "accessPath": [
      "updateUserMessageExternalModerationMetadata"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/partner-sdk/dms/{user_id_1}/{user_id_2}/messages/{message_id}/moderation-metadata",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id_1",
      "user_id_2",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the external moderation metadata for a user message (DM)."
  },
  "partner_sdk_unmerge_provisional_account": {
    "accessPath": [
      "partnerSdkUnmergeProvisionalAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "client_secret",
      "external_auth_token",
      "external_auth_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/partner-sdk/provisional-accounts/unmerge",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "bot_partner_sdk_unmerge_provisional_account": {
    "accessPath": [
      "botPartnerSdkUnmergeProvisionalAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "external_user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/partner-sdk/provisional-accounts/unmerge/bot",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "partner_sdk_token": {
    "accessPath": [
      "partnerSdkToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "client_secret",
      "external_auth_token",
      "external_auth_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/partner-sdk/token",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "bot_partner_sdk_token": {
    "accessPath": [
      "botPartnerSdkToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "provisional_user_id",
      "external_user_id",
      "preferred_global_name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/partner-sdk/token/bot",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_soundboard_default_sounds": {
    "accessPath": [
      "getSoundboardDefaultSounds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/soundboard-default-sounds",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_stage_instance": {
    "accessPath": [
      "createStageInstance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "topic",
      "channel_id",
      "privacy_level",
      "guild_scheduled_event_id",
      "send_start_notification"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/stage-instances",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_stage_instance": {
    "accessPath": [
      "getStageInstance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/stage-instances/{channel_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_stage_instance": {
    "accessPath": [
      "deleteStageInstance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/stage-instances/{channel_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_stage_instance": {
    "accessPath": [
      "updateStageInstance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "topic",
      "privacy_level"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/stage-instances/{channel_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_sticker_packs": {
    "accessPath": [
      "listStickerPacks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/sticker-packs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_sticker_pack": {
    "accessPath": [
      "getStickerPack"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/sticker-packs/{pack_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pack_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_sticker": {
    "accessPath": [
      "getSticker"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/stickers/{sticker_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "sticker_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_my_user": {
    "accessPath": [
      "getMyUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/users/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_my_user": {
    "accessPath": [
      "updateMyUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "username",
      "avatar",
      "banner"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/users/@me",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_current_user_application_entitlements": {
    "accessPath": [
      "getCurrentUserApplicationEntitlements"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/users/@me/applications/{application_id}/entitlements",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sku_ids",
      "exclude_consumed"
    ]
  },
  "get_application_user_role_connection": {
    "accessPath": [
      "getApplicationUserRoleConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/users/@me/applications/{application_id}/role-connection",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_application_user_role_connection": {
    "accessPath": [
      "updateApplicationUserRoleConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "platform_name",
      "platform_username",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v10/users/@me/applications/{application_id}/role-connection",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_application_user_role_connection": {
    "accessPath": [
      "deleteApplicationUserRoleConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/users/@me/applications/{application_id}/role-connection",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create_dm": {
    "accessPath": [
      "createDm"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "recipient_id",
      "access_tokens",
      "nicks"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/users/@me/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_my_connections": {
    "accessPath": [
      "listMyConnections"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/users/@me/connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_my_guilds": {
    "accessPath": [
      "listMyGuilds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/users/@me/guilds",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "before",
      "after",
      "limit",
      "with_counts"
    ]
  },
  "leave_guild": {
    "accessPath": [
      "leaveGuild"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/users/@me/guilds/{guild_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_my_guild_member": {
    "accessPath": [
      "getMyGuildMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/users/@me/guilds/{guild_id}/member",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "guild_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_user": {
    "accessPath": [
      "getUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list_voice_regions": {
    "accessPath": [
      "listVoiceRegions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/voice/regions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_webhook": {
    "accessPath": [
      "getWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete_webhook": {
    "accessPath": [
      "deleteWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_webhook": {
    "accessPath": [
      "updateWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "avatar",
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "get_webhook_by_token": {
    "accessPath": [
      "getWebhookByToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "execute_webhook": {
    "accessPath": [
      "executeWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "wait",
      "thread_id",
      "with_components"
    ]
  },
  "delete_webhook_by_token": {
    "accessPath": [
      "deleteWebhookByToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "update_webhook_by_token": {
    "accessPath": [
      "updateWebhookByToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "avatar"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "execute_github_compatible_webhook": {
    "accessPath": [
      "executeGithubCompatibleWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "action",
      "ref",
      "ref_type",
      "comment",
      "issue",
      "pull_request",
      "repository",
      "forkee",
      "sender",
      "member",
      "release",
      "head_commit",
      "commits",
      "forced",
      "compare",
      "review",
      "check_run",
      "check_suite",
      "discussion",
      "answer"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}/github",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "wait",
      "thread_id"
    ]
  },
  "get_original_webhook_message": {
    "accessPath": [
      "getOriginalWebhookMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}/messages/@original",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "thread_id"
    ]
  },
  "delete_original_webhook_message": {
    "accessPath": [
      "deleteOriginalWebhookMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}/messages/@original",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "thread_id"
    ]
  },
  "update_original_webhook_message": {
    "accessPath": [
      "updateOriginalWebhookMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "content",
      "embeds",
      "allowed_mentions",
      "components",
      "attachments",
      "poll",
      "flags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}/messages/@original",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "thread_id",
      "with_components"
    ]
  },
  "get_webhook_message": {
    "accessPath": [
      "getWebhookMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "thread_id"
    ]
  },
  "delete_webhook_message": {
    "accessPath": [
      "deleteWebhookMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "thread_id"
    ]
  },
  "update_webhook_message": {
    "accessPath": [
      "updateWebhookMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "content",
      "embeds",
      "allowed_mentions",
      "components",
      "attachments",
      "poll",
      "flags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "thread_id",
      "with_components"
    ]
  },
  "execute_slack_compatible_webhook": {
    "accessPath": [
      "executeSlackCompatibleWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "text",
      "username",
      "icon_url",
      "attachments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v10/webhooks/{webhook_id}/{webhook_token}/slack",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id",
      "webhook_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "wait",
      "thread_id"
    ]
  }
} satisfies ToolRuntimeMetadataMap;
