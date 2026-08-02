import type { DefsAppId, DefsBotId, DefsChannel, DefsChannelId, DefsOkTrue, DefsTeam, DefsTs, DefsUserId, ObjsBotProfile, ObjsChannel, ObjsComments, ObjsConversation, ObjsFile, ObjsMessage, ObjsPaging, ObjsReminder, ObjsResources, ObjsResponseMetadata, ObjsScopes, ObjsSubteam, ObjsTeam, ObjsTeamProfileField, ObjsUser, ObjsUserProfile } from "./schemas.js";

export type SlackClient = {
  /**
   * Approve an app for installation on a workspace.
   * @see https://api.slack.com/methods/admin.apps.approve
   */
  adminAppsApprove: (input: {
    /** The id of the app to approve. */
    app_id?: string;
    /** The id of the request to approve. */
    request_id?: string;
    team_id?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List approved apps for an org or workspace.
   * @see https://api.slack.com/methods/admin.apps.approved.list
   */
  adminAppsApprovedList: (input: {
    /** Authentication token. Requires scope: `admin.apps:read` */
    token: string;
    /** The maximum number of items to return. Must be between 1 - 1000 both inclusive. */
    limit?: number;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page */
    cursor?: string;
    team_id?: string;
    enterprise_id?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List app requests for a team/workspace.
   * @see https://api.slack.com/methods/admin.apps.requests.list
   */
  adminAppsRequestsList: (input: {
    /** Authentication token. Requires scope: `admin.apps:read` */
    token: string;
    /** The maximum number of items to return. Must be between 1 - 1000 both inclusive. */
    limit?: number;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page */
    cursor?: string;
    team_id?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Restrict an app for installation on a workspace.
   * @see https://api.slack.com/methods/admin.apps.restrict
   */
  adminAppsRestrict: (input: {
    /** The id of the app to restrict. */
    app_id?: string;
    /** The id of the request to restrict. */
    request_id?: string;
    team_id?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List restricted apps for an org or workspace.
   * @see https://api.slack.com/methods/admin.apps.restricted.list
   */
  adminAppsRestrictedList: (input: {
    /** Authentication token. Requires scope: `admin.apps:read` */
    token: string;
    /** The maximum number of items to return. Must be between 1 - 1000 both inclusive. */
    limit?: number;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page */
    cursor?: string;
    team_id?: string;
    enterprise_id?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Archive a public or private channel.
   * @see https://api.slack.com/methods/admin.conversations.archive
   */
  adminConversationsArchive: (input: {
    /** The channel to archive. */
    channel_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Convert a public channel to a private channel.
   * @see https://api.slack.com/methods/admin.conversations.convertToPrivate
   */
  adminConversationsConvertToPrivate: (input: {
    /** The channel to convert to private. */
    channel_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Create a public or private channel-based conversation.
   * @see https://api.slack.com/methods/admin.conversations.create
   */
  adminConversationsCreate: (input: {
    /** Description of the public or private channel to create. */
    description?: string;
    /** When `true`, creates a private channel instead of a public channel */
    is_private: boolean;
    /** Name of the public or private channel to create. */
    name: string;
    /** When `true`, the channel will be available org-wide. Note: if the channel is not `org_wide=true`, you must specify a `team_id` for this channel */
    org_wide?: boolean;
    /** The workspace to create the channel in. Note: this argument is required unless you set `org_wide=true`. */
    team_id?: string;
  }, options: { headers: { token: string } }) => Promise<{ channel_id?: DefsChannelId; ok: DefsOkTrue }>;

  /**
   * Delete a public or private channel.
   * @see https://api.slack.com/methods/admin.conversations.delete
   */
  adminConversationsDelete: (input: {
    /** The channel to delete. */
    channel_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Disconnect a connected channel from one or more workspaces.
   * @see https://api.slack.com/methods/admin.conversations.disconnectShared
   */
  adminConversationsDisconnectShared: (input: {
    /** The channel to be disconnected from some workspaces. */
    channel_id: string;
    /** The team to be removed from the channel. Currently only a single team id can be specified. */
    leaving_team_ids?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * List all disconnected channels—i.e., channels that were once connected to other workspaces and then disconnected—and the corresponding original channel IDs for key revocation with EKM.
   * @see https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo
   */
  adminConversationsEkmListOriginalConnectedChannelInfo: (input: {
    /** Authentication token. Requires scope: `admin.conversations:read` */
    token: string;
    /** A comma-separated list of channels to filter to. */
    channel_ids?: string;
    /** A comma-separated list of the workspaces to which the channels you would like returned belong. */
    team_ids?: string;
    /** The maximum number of items to return. Must be between 1 - 1000 both inclusive. */
    limit?: number;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. */
    cursor?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Get conversation preferences for a public or private channel.
   * @see https://api.slack.com/methods/admin.conversations.getConversationPrefs
   */
  adminConversationsGetConversationPrefs: (input: {
    /** The channel to get preferences for. */
    channel_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; prefs?: { can_thread?: { type?: (string)[]; user?: (string)[] }; who_can_post?: { type?: (string)[]; user?: (string)[] } } }>;

  /**
   * Get all the workspaces a given public or private channel is connected to within this Enterprise org.
   * @see https://api.slack.com/methods/admin.conversations.getTeams
   */
  adminConversationsGetTeams: (input: {
    /** The channel to determine connected workspaces within the organization for. */
    channel_id: string;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page */
    cursor?: string;
    /** The maximum number of items to return. Must be between 1 - 1000 both inclusive. */
    limit?: number;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; response_metadata?: { next_cursor: string }; team_ids: (DefsTeam)[] }>;

  /**
   * Invite a user to a public or private channel.
   * @see https://api.slack.com/methods/admin.conversations.invite
   */
  adminConversationsInvite: (input: {
    /** The channel that the users will be invited to. */
    channel_id: string;
    /** The users to invite. */
    user_ids: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Rename a public or private channel.
   * @see https://api.slack.com/methods/admin.conversations.rename
   */
  adminConversationsRename: (input: {
    /** The channel to rename. */
    channel_id: string;
    name: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Add an allowlist of IDP groups for accessing a channel
   * @see https://api.slack.com/methods/admin.conversations.restrictAccess.addGroup
   */
  adminConversationsRestrictAccessAddGroup: (input: {
    /** The channel to link this group to. */
    channel_id: string;
    /** The [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) ID to be an allowlist for the private channel. */
    group_id: string;
    /** The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization. */
    team_id?: string;
    /** Authentication token. Requires scope: `admin.conversations:write` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List all IDP Groups linked to a channel
   * @see https://api.slack.com/methods/admin.conversations.restrictAccess.listGroups
   */
  adminConversationsRestrictAccessListGroups: (input: {
    /** Authentication token. Requires scope: `admin.conversations:read` */
    token: string;
    channel_id: string;
    /** The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization. */
    team_id?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Remove a linked IDP group linked from a private channel
   * @see https://api.slack.com/methods/admin.conversations.restrictAccess.removeGroup
   */
  adminConversationsRestrictAccessRemoveGroup: (input: {
    /** The channel to remove the linked group from. */
    channel_id: string;
    /** The [IDP Group](https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org) ID to remove from the private channel. */
    group_id: string;
    /** The workspace where the channel exists. This argument is required for channels only tied to one workspace, and optional for channels that are shared across an organization. */
    team_id: string;
    /** Authentication token. Requires scope: `admin.conversations:write` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Search for public or private channels in an Enterprise organization.
   * @see https://api.slack.com/methods/admin.conversations.search
   */
  adminConversationsSearch: (input: {
    /** Comma separated string of team IDs, signifying the workspaces to search through. */
    team_ids?: string;
    /** Name of the the channel to query by. */
    query?: string;
    /** Maximum number of items to be returned. Must be between 1 - 20 both inclusive. Default is 10. */
    limit?: number;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. */
    cursor?: string;
    /** The type of channel to include or exclude in the search. For example `private` will search private channels, while `private_exclude` will exclude them. For a full list of types, check the [Types section](#types). */
    search_channel_types?: string;
    /** Possible values are `relevant` (search ranking based on what we think is closest), `name` (alphabetical), `member_count` (number of users in the channel), and `created` (date channel was created). You can optionally pair this with the `sort_dir` arg to change how it is sorted  */
    sort?: string;
    /** Sort direction. Possible values are `asc` for ascending order like (1, 2, 3) or (a, b, c), and `desc` for descending order like (3, 2, 1) or (c, b, a) */
    sort_dir?: string;
  }, options: { headers: { token: string } }) => Promise<{ channels: (ObjsChannel)[]; next_cursor: string }>;

  /**
   * Set the posting permissions for a public or private channel.
   * @see https://api.slack.com/methods/admin.conversations.setConversationPrefs
   */
  adminConversationsSetConversationPrefs: (input: {
    /** The channel to set the prefs for */
    channel_id: string;
    /** The prefs for this channel in a stringified JSON format. */
    prefs: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Set the workspaces in an Enterprise grid org that connect to a public or private channel.
   * @see https://api.slack.com/methods/admin.conversations.setTeams
   */
  adminConversationsSetTeams: (input: {
    /** The encoded `channel_id` to add or remove to workspaces. */
    channel_id: string;
    /** True if channel has to be converted to an org channel */
    org_channel?: boolean;
    /** A comma-separated list of workspaces to which the channel should be shared. Not required if the channel is being shared org-wide. */
    target_team_ids?: string;
    /** The workspace to which the channel belongs. Omit this argument if the channel is a cross-workspace shared channel. */
    team_id?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Unarchive a public or private channel.
   * @see https://api.slack.com/methods/admin.conversations.unarchive
   */
  adminConversationsUnarchive: (input: {
    /** The channel to unarchive. */
    channel_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Add an emoji.
   * @see https://api.slack.com/methods/admin.emoji.add
   */
  adminEmojiAdd: (input: {
    /** The name of the emoji to be removed. Colons (`:myemoji:`) around the value are not required, although they may be included. */
    name: string;
    /** Authentication token. Requires scope: `admin.teams:write` */
    token: string;
    /** The URL of a file to use as an image for the emoji. Square images under 128KB and with transparent backgrounds work best. */
    url: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Add an emoji alias.
   * @see https://api.slack.com/methods/admin.emoji.addAlias
   */
  adminEmojiAddAlias: (input: {
    /** The alias of the emoji. */
    alias_for: string;
    /** The name of the emoji to be aliased. Colons (`:myemoji:`) around the value are not required, although they may be included. */
    name: string;
    /** Authentication token. Requires scope: `admin.teams:write` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List emoji for an Enterprise Grid organization.
   * @see https://api.slack.com/methods/admin.emoji.list
   */
  adminEmojiList: (input: {
    /** Authentication token. Requires scope: `admin.teams:read` */
    token: string;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page */
    cursor?: string;
    /** The maximum number of items to return. Must be between 1 - 1000 both inclusive. */
    limit?: number;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Remove an emoji across an Enterprise Grid organization
   * @see https://api.slack.com/methods/admin.emoji.remove
   */
  adminEmojiRemove: (input: {
    /** The name of the emoji to be removed. Colons (`:myemoji:`) around the value are not required, although they may be included. */
    name: string;
    /** Authentication token. Requires scope: `admin.teams:write` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Rename an emoji.
   * @see https://api.slack.com/methods/admin.emoji.rename
   */
  adminEmojiRename: (input: {
    /** The name of the emoji to be renamed. Colons (`:myemoji:`) around the value are not required, although they may be included. */
    name: string;
    /** The new name of the emoji. */
    new_name: string;
    /** Authentication token. Requires scope: `admin.teams:write` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Approve a workspace invite request.
   * @see https://api.slack.com/methods/admin.inviteRequests.approve
   */
  adminInviteRequestsApprove: (input: {
    /** ID of the request to invite. */
    invite_request_id: string;
    /** ID for the workspace where the invite request was made. */
    team_id?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List all approved workspace invite requests.
   * @see https://api.slack.com/methods/admin.inviteRequests.approved.list
   */
  adminInviteRequestsApprovedList: (input: {
    /** ID for the workspace where the invite requests were made. */
    team_id?: string;
    /** Value of the `next_cursor` field sent as part of the previous API response */
    cursor?: string;
    /** The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive */
    limit?: number;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List all denied workspace invite requests.
   * @see https://api.slack.com/methods/admin.inviteRequests.denied.list
   */
  adminInviteRequestsDeniedList: (input: {
    /** ID for the workspace where the invite requests were made. */
    team_id?: string;
    /** Value of the `next_cursor` field sent as part of the previous api response */
    cursor?: string;
    /** The number of results that will be returned by the API on each invocation. Must be between 1 - 1000 both inclusive */
    limit?: number;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Deny a workspace invite request.
   * @see https://api.slack.com/methods/admin.inviteRequests.deny
   */
  adminInviteRequestsDeny: (input: {
    /** ID of the request to invite. */
    invite_request_id: string;
    /** ID for the workspace where the invite request was made. */
    team_id?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List all pending workspace invite requests.
   * @see https://api.slack.com/methods/admin.inviteRequests.list
   */
  adminInviteRequestsList: (input: {
    /** ID for the workspace where the invite requests were made. */
    team_id?: string;
    /** Value of the `next_cursor` field sent as part of the previous API response */
    cursor?: string;
    /** The number of results that will be returned by the API on each invocation. Must be between 1 - 1000, both inclusive */
    limit?: number;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List all of the admins on a given workspace.
   * @see https://api.slack.com/methods/admin.teams.admins.list
   */
  adminTeamsAdminsList: (input: {
    /** Authentication token. Requires scope: `admin.teams:read` */
    token: string;
    /** The maximum number of items to return. */
    limit?: number;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. */
    cursor?: string;
    team_id: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Create an Enterprise team.
   * @see https://api.slack.com/methods/admin.teams.create
   */
  adminTeamsCreate: (input: {
    /** Description for the team. */
    team_description?: string;
    /** Who can join the team. A team's discoverability can be `open`, `closed`, `invite_only`, or `unlisted`. */
    team_discoverability?: string;
    /** Team domain (for example, slacksoftballteam). */
    team_domain: string;
    /** Team name (for example, Slack Softball Team). */
    team_name: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List all teams on an Enterprise organization
   * @see https://api.slack.com/methods/admin.teams.list
   */
  adminTeamsList: (input: {
    /** The maximum number of items to return. Must be between 1 - 100 both inclusive. */
    limit?: number;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. */
    cursor?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List all of the owners on a given workspace.
   * @see https://api.slack.com/methods/admin.teams.owners.list
   */
  adminTeamsOwnersList: (input: {
    /** Authentication token. Requires scope: `admin.teams:read` */
    token: string;
    team_id: string;
    /** The maximum number of items to return. Must be between 1 - 1000 both inclusive. */
    limit?: number;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. */
    cursor?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Fetch information about settings in a workspace
   * @see https://api.slack.com/methods/admin.teams.settings.info
   */
  adminTeamsSettingsInfo: (input: {
    team_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Set the default channels of a workspace.
   * @see https://api.slack.com/methods/admin.teams.settings.setDefaultChannels
   */
  adminTeamsSettingsSetDefaultChannels: (input: {
    /** An array of channel IDs. */
    channel_ids: string;
    /** ID for the workspace to set the default channel for. */
    team_id: string;
    /** Authentication token. Requires scope: `admin.teams:write` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Set the description of a given workspace.
   * @see https://api.slack.com/methods/admin.teams.settings.setDescription
   */
  adminTeamsSettingsSetDescription: (input: {
    /** The new description for the workspace. */
    description: string;
    /** ID for the workspace to set the description for. */
    team_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * An API method that allows admins to set the discoverability of a given workspace
   * @see https://api.slack.com/methods/admin.teams.settings.setDiscoverability
   */
  adminTeamsSettingsSetDiscoverability: (input: {
    /** This workspace's discovery setting. It must be set to one of `open`, `invite_only`, `closed`, or `unlisted`. */
    discoverability: string;
    /** The ID of the workspace to set discoverability on. */
    team_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Sets the icon of a workspace.
   * @see https://api.slack.com/methods/admin.teams.settings.setIcon
   */
  adminTeamsSettingsSetIcon: (input: {
    /** Image URL for the icon */
    image_url: string;
    /** ID for the workspace to set the icon for. */
    team_id: string;
    /** Authentication token. Requires scope: `admin.teams:write` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Set the name of a given workspace.
   * @see https://api.slack.com/methods/admin.teams.settings.setName
   */
  adminTeamsSettingsSetName: (input: {
    /** The new name of the workspace. */
    name: string;
    /** ID for the workspace to set the name for. */
    team_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Add one or more default channels to an IDP group.
   * @see https://api.slack.com/methods/admin.usergroups.addChannels
   */
  adminUsergroupsAddChannels: (input: {
    /** Comma separated string of channel IDs. */
    channel_ids: string;
    /** The workspace to add default channels in. */
    team_id?: string;
    /** ID of the IDP group to add default channels for. */
    usergroup_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Associate one or more default workspaces with an organization-wide IDP group.
   * @see https://api.slack.com/methods/admin.usergroups.addTeams
   */
  adminUsergroupsAddTeams: (input: {
    /** When `true`, this method automatically creates new workspace accounts for the IDP group members. */
    auto_provision?: boolean;
    /** A comma separated list of encoded team (workspace) IDs. Each workspace *MUST* belong to the organization associated with the token. */
    team_ids: string;
    /** An encoded usergroup (IDP Group) ID. */
    usergroup_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List the channels linked to an org-level IDP group (user group).
   * @see https://api.slack.com/methods/admin.usergroups.listChannels
   */
  adminUsergroupsListChannels: (input: {
    /** ID of the IDP group to list default channels for. */
    usergroup_id: string;
    /** ID of the the workspace. */
    team_id?: string;
    /** Flag to include or exclude the count of members per channel. */
    include_num_members?: boolean;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Remove one or more default channels from an org-level IDP group (user group).
   * @see https://api.slack.com/methods/admin.usergroups.removeChannels
   */
  adminUsergroupsRemoveChannels: (input: {
    /** Comma-separated string of channel IDs */
    channel_ids: string;
    /** ID of the IDP Group */
    usergroup_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Add an Enterprise user to a workspace.
   * @see https://api.slack.com/methods/admin.users.assign
   */
  adminUsersAssign: (input: {
    /** Comma separated values of channel IDs to add user in the new workspace. */
    channel_ids?: string;
    /** True if user should be added to the workspace as a guest. */
    is_restricted?: boolean;
    /** True if user should be added to the workspace as a single-channel guest. */
    is_ultra_restricted?: boolean;
    /** The ID (`T1234`) of the workspace. */
    team_id: string;
    /** The ID of the user to add to the workspace. */
    user_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Invite a user to a workspace.
   * @see https://api.slack.com/methods/admin.users.invite
   */
  adminUsersInvite: (input: {
    /** A comma-separated list of `channel_id`s for this user to join. At least one channel is required. */
    channel_ids: string;
    /** An optional message to send to the user in the invite email. */
    custom_message?: string;
    /** The email address of the person to invite. */
    email: string;
    /** Timestamp when guest account should be disabled. Only include this timestamp if you are inviting a guest user and you want their account to expire on a certain date. */
    guest_expiration_ts?: string;
    /** Is this user a multi-channel guest user? (default: false) */
    is_restricted?: boolean;
    /** Is this user a single channel guest user? (default: false) */
    is_ultra_restricted?: boolean;
    /** Full name of the user. */
    real_name?: string;
    /** Allow this invite to be resent in the future if a user has not signed up yet. (default: false) */
    resend?: boolean;
    /** The ID (`T1234`) of the workspace. */
    team_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * List users on a workspace
   * @see https://api.slack.com/methods/admin.users.list
   */
  adminUsersList: (input: {
    /** The ID (`T1234`) of the workspace. */
    team_id: string;
    /** Set `cursor` to `next_cursor` returned by the previous call to list items in the next page. */
    cursor?: string;
    /** Limit for how many users to be retrieved per page */
    limit?: number;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Remove a user from a workspace.
   * @see https://api.slack.com/methods/admin.users.remove
   */
  adminUsersRemove: (input: {
    /** The ID (`T1234`) of the workspace. */
    team_id: string;
    /** The ID of the user to remove. */
    user_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Invalidate a single session for a user by session_id
   * @see https://api.slack.com/methods/admin.users.session.invalidate
   */
  adminUsersSessionInvalidate: (input: {
    session_id: number;
    /** ID of the team that the session belongs to */
    team_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Wipes all valid sessions on all devices for a given user
   * @see https://api.slack.com/methods/admin.users.session.reset
   */
  adminUsersSessionReset: (input: {
    /** Only expire mobile sessions (default: false) */
    mobile_only?: boolean;
    /** The ID of the user to wipe sessions for */
    user_id: string;
    /** Only expire web sessions (default: false) */
    web_only?: boolean;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Set an existing guest, regular user, or owner to be an admin user.
   * @see https://api.slack.com/methods/admin.users.setAdmin
   */
  adminUsersSetAdmin: (input: {
    /** The ID (`T1234`) of the workspace. */
    team_id: string;
    /** The ID of the user to designate as an admin. */
    user_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Set an expiration for a guest user
   * @see https://api.slack.com/methods/admin.users.setExpiration
   */
  adminUsersSetExpiration: (input: {
    /** Timestamp when guest account should be disabled. */
    expiration_ts: number;
    /** The ID (`T1234`) of the workspace. */
    team_id: string;
    /** The ID of the user to set an expiration for. */
    user_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Set an existing guest, regular user, or admin user to be a workspace owner.
   * @see https://api.slack.com/methods/admin.users.setOwner
   */
  adminUsersSetOwner: (input: {
    /** The ID (`T1234`) of the workspace. */
    team_id: string;
    /** Id of the user to promote to owner. */
    user_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Set an existing guest user, admin user, or owner to be a regular user.
   * @see https://api.slack.com/methods/admin.users.setRegular
   */
  adminUsersSetRegular: (input: {
    /** The ID (`T1234`) of the workspace. */
    team_id: string;
    /** The ID of the user to designate as a regular user. */
    user_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Checks API calling code.
   * @see https://api.slack.com/methods/api.test
   */
  apiTest: (input: {
    /** Error response to return */
    error?: string;
    /** example property to return */
    foo?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Get a list of authorizations for the given event context. Each authorization represents an app installation that the event is visible to.
   * @see https://api.slack.com/methods/apps.event.authorizations.list
   */
  appsEventAuthorizationsList: (input: {
    event_context: string;
    cursor?: string;
    limit?: number;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Returns list of permissions this app has on a team.
   * @see https://api.slack.com/methods/apps.permissions.info
   */
  appsPermissionsInfo: (input: {
    /** Authentication token. Requires scope: `none` */
    token?: string;
  }) => Promise<{ info: { app_home: { resources?: ObjsResources; scopes?: ObjsScopes }; channel: { resources?: ObjsResources; scopes?: ObjsScopes }; group: { resources?: ObjsResources; scopes?: ObjsScopes }; im: { resources?: ObjsResources; scopes?: ObjsScopes }; mpim: { resources?: ObjsResources; scopes?: ObjsScopes }; team: { resources: ObjsResources; scopes: ObjsScopes } }; ok: DefsOkTrue }>;

  /**
   * Allows an app to request additional scopes
   * @see https://api.slack.com/methods/apps.permissions.request
   */
  appsPermissionsRequest: (input: {
    /** Authentication token. Requires scope: `none` */
    token: string;
    /** A comma separated list of scopes to request for */
    scopes: string;
    /** Token used to trigger the permissions API */
    trigger_id: string;
  }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Returns list of resource grants this app has on a team.
   * @see https://api.slack.com/methods/apps.permissions.resources.list
   */
  appsPermissionsResourcesList: (input: {
    /** Authentication token. Requires scope: `none` */
    token: string;
    /** Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. */
    cursor?: string;
    /** The maximum number of items to return. */
    limit?: number;
  }) => Promise<{ ok: DefsOkTrue; resources: ({ id?: string; type?: string })[]; response_metadata?: { next_cursor: string }; [key: string]: unknown }>;

  /**
   * Returns list of scopes this app has on a team.
   * @see https://api.slack.com/methods/apps.permissions.scopes.list
   */
  appsPermissionsScopesList: (input: {
    /** Authentication token. Requires scope: `none` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; scopes: { app_home?: ObjsScopes; channel?: ObjsScopes; group?: ObjsScopes; im?: ObjsScopes; mpim?: ObjsScopes; team?: ObjsScopes; user?: ObjsScopes; [key: string]: unknown }; [key: string]: unknown }>;

  /**
   * Returns list of user grants and corresponding scopes this app has on a team.
   * @see https://api.slack.com/methods/apps.permissions.users.list
   */
  appsPermissionsUsersList: (input: {
    /** Authentication token. Requires scope: `none` */
    token: string;
    /** Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. */
    cursor?: string;
    /** The maximum number of items to return. */
    limit?: number;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Enables an app to trigger a permissions modal to grant an app access to a user access scope.
   * @see https://api.slack.com/methods/apps.permissions.users.request
   */
  appsPermissionsUsersRequest: (input: {
    /** Authentication token. Requires scope: `none` */
    token: string;
    /** A comma separated list of user scopes to request for */
    scopes: string;
    /** Token used to trigger the request */
    trigger_id: string;
    /** The user this scope is being requested for */
    user: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Uninstalls your app from a workspace.
   * @see https://api.slack.com/methods/apps.uninstall
   */
  appsUninstall: (input: {
    /** Authentication token. Requires scope: `none` */
    token?: string;
    /** Issued when you created your application. */
    client_id?: string;
    /** Issued when you created your application. */
    client_secret?: string;
  }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Revokes a token.
   * @see https://api.slack.com/methods/auth.revoke
   */
  authRevoke: (input: {
    /** Authentication token. Requires scope: `none` */
    token: string;
    /** Setting this parameter to `1` triggers a _testing mode_ where the specified token will not actually be revoked. */
    test?: boolean;
  }) => Promise<{ ok: DefsOkTrue; revoked: boolean }>;

  /**
   * Checks authentication & identity.
   * @see https://api.slack.com/methods/auth.test
   */
  authTest: (options: { headers: { token: string } }) => Promise<{ bot_id?: DefsBotId; is_enterprise_install?: boolean; ok: DefsOkTrue; team: string; team_id: DefsTeam; url: string; user: string; user_id: DefsUserId }>;

  /**
   * Gets information about a bot user.
   * @see https://api.slack.com/methods/bots.info
   */
  botsInfo: (input: {
    /** Authentication token. Requires scope: `users:read` */
    token: string;
    /** Bot user to get info on */
    bot?: string;
  }) => Promise<{ bot: { app_id: DefsAppId; deleted: boolean; icons: { image_36: string; image_48: string; image_72: string }; id: DefsBotId; name: string; updated: number; user_id?: DefsUserId }; ok: DefsOkTrue }>;

  /**
   * Registers a new Call.
   * @see https://api.slack.com/methods/calls.add
   */
  callsAdd: (input: {
    /** The valid Slack user ID of the user who created this Call. When this method is called with a user token, the `created_by` field is optional and defaults to the authed user of the token. Otherwise, the field is required. */
    created_by?: string;
    /** Call start time in UTC UNIX timestamp format */
    date_start?: number;
    /** When supplied, available Slack clients will attempt to directly launch the 3rd-party Call with this URL. */
    desktop_app_join_url?: string;
    /** An optional, human-readable ID supplied by the 3rd-party Call provider. If supplied, this ID will be displayed in the Call object. */
    external_display_id?: string;
    /** An ID supplied by the 3rd-party Call provider. It must be unique across all Calls from that service. */
    external_unique_id: string;
    /** The URL required for a client to join the Call. */
    join_url: string;
    /** The name of the Call. */
    title?: string;
    /** The list of users to register as participants in the Call. [Read more on how to specify users here](/apis/calls#users). */
    users?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Ends a Call.
   * @see https://api.slack.com/methods/calls.end
   */
  callsEnd: (input: {
    /** Call duration in seconds */
    duration?: number;
    /** `id` returned when registering the call using the [`calls.add`](/methods/calls.add) method. */
    id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Returns information about a Call.
   * @see https://api.slack.com/methods/calls.info
   */
  callsInfo: (input: {
    /** `id` of the Call returned by the [`calls.add`](/methods/calls.add) method. */
    id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Registers new participants added to a Call.
   * @see https://api.slack.com/methods/calls.participants.add
   */
  callsParticipantsAdd: (input: {
    /** `id` returned by the [`calls.add`](/methods/calls.add) method. */
    id: string;
    /** The list of users to add as participants in the Call. [Read more on how to specify users here](/apis/calls#users). */
    users: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Registers participants removed from a Call.
   * @see https://api.slack.com/methods/calls.participants.remove
   */
  callsParticipantsRemove: (input: {
    /** `id` returned by the [`calls.add`](/methods/calls.add) method. */
    id: string;
    /** The list of users to remove as participants in the Call. [Read more on how to specify users here](/apis/calls#users). */
    users: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Updates information about a Call.
   * @see https://api.slack.com/methods/calls.update
   */
  callsUpdate: (input: {
    /** When supplied, available Slack clients will attempt to directly launch the 3rd-party Call with this URL. */
    desktop_app_join_url?: string;
    /** `id` returned by the [`calls.add`](/methods/calls.add) method. */
    id: string;
    /** The URL required for a client to join the Call. */
    join_url?: string;
    /** The name of the Call. */
    title?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Deletes a message.
   * @see https://api.slack.com/methods/chat.delete
   */
  chatDelete: (input: {
    /** Pass true to delete the message as the authed user with `chat:write:user` scope. [Bot users](/bot-users) in this context are considered authed users. If unused or false, the message will be deleted with `chat:write:bot` scope. */
    as_user?: boolean;
    /** Channel containing the message to be deleted. */
    channel?: string;
    /** Timestamp of the message to be deleted. */
    ts?: number;
  }, options?: { headers?: { token?: string } }) => Promise<{ channel: DefsChannel; ok: DefsOkTrue; ts: DefsTs }>;

  /**
   * Deletes a pending scheduled message from the queue.
   * @see https://api.slack.com/methods/chat.deleteScheduledMessage
   */
  chatDeleteScheduledMessage: (input: {
    /** Pass true to delete the message as the authed user with `chat:write:user` scope. [Bot users](/bot-users) in this context are considered authed users. If unused or false, the message will be deleted with `chat:write:bot` scope. */
    as_user?: boolean;
    /** The channel the scheduled_message is posting to */
    channel: string;
    /** `scheduled_message_id` returned from call to chat.scheduleMessage */
    scheduled_message_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Retrieve a permalink URL for a specific extant message
   * @see https://api.slack.com/methods/chat.getPermalink
   */
  chatGetPermalink: (input: {
    /** Authentication token. Requires scope: `none` */
    token: string;
    /** The ID of the conversation or channel containing the message */
    channel: string;
    /** A message's `ts` value, uniquely identifying it within a channel */
    message_ts: string;
  }) => Promise<{ channel: DefsChannel; ok: DefsOkTrue; permalink: string }>;

  /**
   * Share a me message into a channel.
   * @see https://api.slack.com/methods/chat.meMessage
   */
  chatMeMessage: (input: {
    /** Channel to send message to. Can be a public channel, private group or IM channel. Can be an encoded ID, or a name. */
    channel?: string;
    /** Text of the message to send. */
    text?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ channel?: DefsChannel; ok: DefsOkTrue; ts?: DefsTs }>;

  /**
   * Sends an ephemeral message to a user in a channel.
   * @see https://api.slack.com/methods/chat.postEphemeral
   */
  chatPostEphemeral: (input: {
    /** Pass true to post the message as the authed user. Defaults to true if the chat:write:bot scope is not included. Otherwise, defaults to false. */
    as_user?: boolean;
    /** A JSON-based array of structured attachments, presented as a URL-encoded string. */
    attachments?: string;
    /** A JSON-based array of structured blocks, presented as a URL-encoded string. */
    blocks?: string;
    /** Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name. */
    channel: string;
    /** Emoji to use as the icon for this message. Overrides `icon_url`. Must be used in conjunction with `as_user` set to `false`, otherwise ignored. See [authorship](#authorship) below. */
    icon_emoji?: string;
    /** URL to an image to use as the icon for this message. Must be used in conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship) below. */
    icon_url?: string;
    /** Find and link channel names and usernames. */
    link_names?: boolean;
    /** Change how messages are treated. Defaults to `none`. See [below](#formatting). */
    parse?: string;
    /** How this field works and whether it is required depends on other fields you use in your API call. [See below](#text_usage) for more detail. */
    text?: string;
    /** Provide another message's `ts` value to post this message in a thread. Avoid using a reply's `ts` value; use its parent's value instead. Ephemeral messages in threads are only shown if there is already an active thread. */
    thread_ts?: string;
    /** `id` of the user who will receive the ephemeral message. The user should be in the channel specified by the `channel` argument. */
    user: string;
    /** Set your bot's user name. Must be used in conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship) below. */
    username?: string;
  }, options: { headers: { token: string } }) => Promise<{ message_ts: DefsTs; ok: DefsOkTrue }>;

  /**
   * Sends a message to a channel.
   * @see https://api.slack.com/methods/chat.postMessage
   */
  chatPostMessage: (input: {
    /** Pass true to post the message as the authed user, instead of as a bot. Defaults to false. See [authorship](#authorship) below. */
    as_user?: string;
    /** A JSON-based array of structured attachments, presented as a URL-encoded string. */
    attachments?: string;
    /** A JSON-based array of structured blocks, presented as a URL-encoded string. */
    blocks?: string;
    /** Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name. See [below](#channels) for more details. */
    channel: string;
    /** Emoji to use as the icon for this message. Overrides `icon_url`. Must be used in conjunction with `as_user` set to `false`, otherwise ignored. See [authorship](#authorship) below. */
    icon_emoji?: string;
    /** URL to an image to use as the icon for this message. Must be used in conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship) below. */
    icon_url?: string;
    /** Find and link channel names and usernames. */
    link_names?: boolean;
    /** Disable Slack markup parsing by setting to `false`. Enabled by default. */
    mrkdwn?: boolean;
    /** Change how messages are treated. Defaults to `none`. See [below](#formatting). */
    parse?: string;
    /** Used in conjunction with `thread_ts` and indicates whether reply should be made visible to everyone in the channel or conversation. Defaults to `false`. */
    reply_broadcast?: boolean;
    /** How this field works and whether it is required depends on other fields you use in your API call. [See below](#text_usage) for more detail. */
    text?: string;
    /** Provide another message's `ts` value to make this message a reply. Avoid using a reply's `ts` value; use its parent instead. */
    thread_ts?: string;
    /** Pass true to enable unfurling of primarily text-based content. */
    unfurl_links?: boolean;
    /** Pass false to disable unfurling of media content. */
    unfurl_media?: boolean;
    /** Set your bot's user name. Must be used in conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship) below. */
    username?: string;
  }, options: { headers: { token: string } }) => Promise<{ channel: DefsChannel; message: ObjsMessage; ok: DefsOkTrue; ts: DefsTs }>;

  /**
   * Schedules a message to be sent to a channel.
   * @see https://api.slack.com/methods/chat.scheduleMessage
   */
  chatScheduleMessage: (input: {
    /** Pass true to post the message as the authed user, instead of as a bot. Defaults to false. See [chat.postMessage](chat.postMessage#authorship). */
    as_user?: boolean;
    /** A JSON-based array of structured attachments, presented as a URL-encoded string. */
    attachments?: string;
    /** A JSON-based array of structured blocks, presented as a URL-encoded string. */
    blocks?: string;
    /** Channel, private group, or DM channel to send message to. Can be an encoded ID, or a name. See [below](#channels) for more details. */
    channel?: string;
    /** Find and link channel names and usernames. */
    link_names?: boolean;
    /** Change how messages are treated. Defaults to `none`. See [chat.postMessage](chat.postMessage#formatting). */
    parse?: string;
    /** Unix EPOCH timestamp of time in future to send the message. */
    post_at?: string;
    /** Used in conjunction with `thread_ts` and indicates whether reply should be made visible to everyone in the channel or conversation. Defaults to `false`. */
    reply_broadcast?: boolean;
    /** How this field works and whether it is required depends on other fields you use in your API call. [See below](#text_usage) for more detail. */
    text?: string;
    /** Provide another message's `ts` value to make this message a reply. Avoid using a reply's `ts` value; use its parent instead. */
    thread_ts?: number;
    /** Pass true to enable unfurling of primarily text-based content. */
    unfurl_links?: boolean;
    /** Pass false to disable unfurling of media content. */
    unfurl_media?: boolean;
  }, options?: { headers?: { token?: string } }) => Promise<{ channel: DefsChannel; message: { bot_id: DefsBotId; bot_profile?: ObjsBotProfile; team: DefsTeam; text: string; type: string; user: DefsUserId; username?: string }; ok: DefsOkTrue; post_at: number; scheduled_message_id: string }>;

  /**
   * Returns a list of scheduled messages.
   * @see https://api.slack.com/methods/chat.scheduledMessages.list
   */
  chatScheduledMessagesList: (input: {
    /** The channel of the scheduled messages */
    channel?: string;
    /** A UNIX timestamp of the latest value in the time range */
    latest?: number;
    /** A UNIX timestamp of the oldest value in the time range */
    oldest?: number;
    /** Maximum number of original entries to return. */
    limit?: number;
    /** For pagination purposes, this is the `cursor` value returned from a previous call to `chat.scheduledmessages.list` indicating where you want to start this call from. */
    cursor?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ ok: DefsOkTrue; response_metadata: { next_cursor: string }; scheduled_messages: ({ channel_id: DefsChannelId; date_created: number; id: string; post_at: number; text?: string })[] }>;

  /**
   * Provide custom unfurl behavior for user-posted URLs
   * @see https://api.slack.com/methods/chat.unfurl
   */
  chatUnfurl: (input: {
    /** Channel ID of the message */
    channel: string;
    /** Timestamp of the message to add unfurl behavior to. */
    ts: string;
    /** URL-encoded JSON map with keys set to URLs featured in the the message, pointing to their unfurl blocks or message attachments. */
    unfurls?: string;
    /** Provide a simply-formatted string to send as an ephemeral message to the user as invitation to authenticate further and enable full unfurling behavior */
    user_auth_message?: string;
    /** Set to `true` or `1` to indicate the user must install your Slack app to trigger unfurls for this domain */
    user_auth_required?: boolean;
    /** Send users to this custom URL where they will complete authentication in your app to fully trigger unfurling. Value should be properly URL-encoded. */
    user_auth_url?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Updates a message.
   * @see https://api.slack.com/methods/chat.update
   */
  chatUpdate: (input: {
    /** Pass true to update the message as the authed user. [Bot users](/bot-users) in this context are considered authed users. */
    as_user?: string;
    /** A JSON-based array of structured attachments, presented as a URL-encoded string. This field is required when not presenting `text`. If you don't include this field, the message's previous `attachments` will be retained. To remove previous `attachments`, include an empty array for this field. */
    attachments?: string;
    /** A JSON-based array of [structured blocks](/block-kit/building), presented as a URL-encoded string. If you don't include this field, the message's previous `blocks` will be retained. To remove previous `blocks`, include an empty array for this field. */
    blocks?: string;
    /** Channel containing the message to be updated. */
    channel: string;
    /** Find and link channel names and usernames. Defaults to `none`. If you do not specify a value for this field, the original value set for the message will be overwritten with the default, `none`. */
    link_names?: string;
    /** Change how messages are treated. Defaults to `client`, unlike `chat.postMessage`. Accepts either `none` or `full`. If you do not specify a value for this field, the original value set for the message will be overwritten with the default, `client`. */
    parse?: string;
    /** New text for the message, using the [default formatting rules](/reference/surfaces/formatting). It's not required when presenting `blocks` or `attachments`. */
    text?: string;
    /** Timestamp of the message to be updated. */
    ts: string;
  }, options: { headers: { token: string } }) => Promise<{ channel: string; message: { attachments?: ({ [key: string]: unknown })[]; blocks?: { [key: string]: unknown }; text: string }; ok: DefsOkTrue; text: string; ts: string }>;

  /**
   * Archives a conversation.
   * @see https://api.slack.com/methods/conversations.archive
   */
  conversationsArchive: (input: {
    /** ID of conversation to archive */
    channel?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Closes a direct message or multi-person direct message.
   * @see https://api.slack.com/methods/conversations.close
   */
  conversationsClose: (input: {
    /** Conversation to close. */
    channel?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ already_closed?: boolean; no_op?: boolean; ok: DefsOkTrue }>;

  /**
   * Initiates a public or private channel-based conversation
   * @see https://api.slack.com/methods/conversations.create
   */
  conversationsCreate: (input: {
    /** Create a private channel instead of a public one */
    is_private?: boolean;
    /** Name of the public or private channel to create */
    name?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ channel: ObjsConversation; ok: DefsOkTrue }>;

  /**
   * Fetches a conversation's history of messages and events.
   * @see https://api.slack.com/methods/conversations.history
   */
  conversationsHistory: (input: {
    /** Authentication token. Requires scope: `conversations:history` */
    token?: string;
    /** Conversation ID to fetch history for. */
    channel?: string;
    /** End of time range of messages to include in results. */
    latest?: number;
    /** Start of time range of messages to include in results. */
    oldest?: number;
    /** Include messages with latest or oldest timestamp in results only when either timestamp is specified. */
    inclusive?: boolean;
    /** The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. */
    limit?: number;
    /** Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. */
    cursor?: string;
  }) => Promise<{ channel_actions_count: number; channel_actions_ts: unknown; has_more: boolean; messages: (ObjsMessage)[]; ok: DefsOkTrue; pin_count: number }>;

  /**
   * Retrieve information about a conversation.
   * @see https://api.slack.com/methods/conversations.info
   */
  conversationsInfo: (input: {
    /** Authentication token. Requires scope: `conversations:read` */
    token?: string;
    /** Conversation ID to learn more about */
    channel?: string;
    /** Set this to `true` to receive the locale for this conversation. Defaults to `false` */
    include_locale?: boolean;
    /** Set to `true` to include the member count for the specified conversation. Defaults to `false` */
    include_num_members?: boolean;
  }) => Promise<{ channel: ObjsConversation; ok: DefsOkTrue }>;

  /**
   * Invites users to a channel.
   * @see https://api.slack.com/methods/conversations.invite
   */
  conversationsInvite: (input: {
    /** The ID of the public or private channel to invite user(s) to. */
    channel?: string;
    /** A comma separated list of user IDs. Up to 1000 users may be listed. */
    users?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ channel: ObjsConversation; ok: DefsOkTrue }>;

  /**
   * Joins an existing conversation.
   * @see https://api.slack.com/methods/conversations.join
   */
  conversationsJoin: (input: {
    /** ID of conversation to join */
    channel?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ channel: ObjsConversation; ok: DefsOkTrue; response_metadata?: { warnings?: (string)[] }; warning?: string }>;

  /**
   * Removes a user from a conversation.
   * @see https://api.slack.com/methods/conversations.kick
   */
  conversationsKick: (input: {
    /** ID of conversation to remove user from. */
    channel?: string;
    /** User ID to be removed. */
    user?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Leaves a conversation.
   * @see https://api.slack.com/methods/conversations.leave
   */
  conversationsLeave: (input: {
    /** Conversation to leave */
    channel?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ not_in_channel?: true; ok: DefsOkTrue }>;

  /**
   * Lists all channels in a Slack team.
   * @see https://api.slack.com/methods/conversations.list
   */
  conversationsList: (input: {
    /** Authentication token. Requires scope: `conversations:read` */
    token?: string;
    /** Set to `true` to exclude archived channels from the list */
    exclude_archived?: boolean;
    /** Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im` */
    types?: string;
    /** The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000. */
    limit?: number;
    /** Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. */
    cursor?: string;
  }) => Promise<{ channels: (ObjsConversation)[]; ok: DefsOkTrue; response_metadata?: { next_cursor: string } }>;

  /**
   * Sets the read cursor in a channel.
   * @see https://api.slack.com/methods/conversations.mark
   */
  conversationsMark: (input: {
    /** Channel or conversation to set the read cursor for. */
    channel?: string;
    /** Unique identifier of message you want marked as most recently seen in this conversation. */
    ts?: number;
  }, options?: { headers?: { token?: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Retrieve members of a conversation.
   * @see https://api.slack.com/methods/conversations.members
   */
  conversationsMembers: (input: {
    /** Authentication token. Requires scope: `conversations:read` */
    token?: string;
    /** ID of the conversation to retrieve members for */
    channel?: string;
    /** The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. */
    limit?: number;
    /** Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. */
    cursor?: string;
  }) => Promise<{ members: (DefsUserId)[]; ok: DefsOkTrue; response_metadata: { next_cursor: string } }>;

  /**
   * Opens or resumes a direct message or multi-person direct message.
   * @see https://api.slack.com/methods/conversations.open
   */
  conversationsOpen: (input: {
    /** Resume a conversation by supplying an `im` or `mpim`'s ID. Or provide the `users` field instead. */
    channel?: string;
    /** Boolean, indicates you want the full IM channel definition in the response. */
    return_im?: boolean;
    /** Comma separated lists of users. If only one user is included, this creates a 1:1 DM.  The ordering of the users is preserved whenever a multi-person direct message is returned. Supply a `channel` when not supplying `users`. */
    users?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ already_open?: boolean; channel: unknown; no_op?: boolean; ok: DefsOkTrue }>;

  /**
   * Renames a conversation.
   * @see https://api.slack.com/methods/conversations.rename
   */
  conversationsRename: (input: {
    /** ID of conversation to rename */
    channel?: string;
    /** New name for conversation. */
    name?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ channel: ObjsConversation; ok: DefsOkTrue }>;

  /**
   * Retrieve a thread of messages posted to a conversation
   * @see https://api.slack.com/methods/conversations.replies
   */
  conversationsReplies: (input: {
    /** Authentication token. Requires scope: `conversations:history` */
    token?: string;
    /** Conversation ID to fetch thread from. */
    channel?: string;
    /** Unique identifier of a thread's parent message. `ts` must be the timestamp of an existing message with 0 or more replies. If there are no replies then just the single message referenced by `ts` will return - it is just an ordinary, unthreaded message. */
    ts?: number;
    /** End of time range of messages to include in results. */
    latest?: number;
    /** Start of time range of messages to include in results. */
    oldest?: number;
    /** Include messages with latest or oldest timestamp in results only when either timestamp is specified. */
    inclusive?: boolean;
    /** The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. */
    limit?: number;
    /** Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. */
    cursor?: string;
  }) => Promise<{ has_more?: boolean; messages: (unknown)[]; ok: DefsOkTrue }>;

  /**
   * Sets the purpose for a conversation.
   * @see https://api.slack.com/methods/conversations.setPurpose
   */
  conversationsSetPurpose: (input: {
    /** Conversation to set the purpose of */
    channel?: string;
    /** A new, specialer purpose */
    purpose?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ channel: ObjsConversation; ok: DefsOkTrue }>;

  /**
   * Sets the topic for a conversation.
   * @see https://api.slack.com/methods/conversations.setTopic
   */
  conversationsSetTopic: (input: {
    /** Conversation to set the topic of */
    channel?: string;
    /** The new topic string. Does not support formatting or linkification. */
    topic?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ channel: ObjsConversation; ok: DefsOkTrue }>;

  /**
   * Reverses conversation archival.
   * @see https://api.slack.com/methods/conversations.unarchive
   */
  conversationsUnarchive: (input: {
    /** ID of conversation to unarchive */
    channel?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Open a dialog with a user
   * @see https://api.slack.com/methods/dialog.open
   */
  dialogOpen: (input: {
    /** The dialog definition. This must be a JSON-encoded string. */
    dialog: string;
    /** Exchange a trigger to post to the user. */
    trigger_id: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Ends the current user's Do Not Disturb session immediately.
   * @see https://api.slack.com/methods/dnd.endDnd
   */
  dndEndDnd: (options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Ends the current user's snooze mode immediately.
   * @see https://api.slack.com/methods/dnd.endSnooze
   */
  dndEndSnooze: (options: { headers: { token: string } }) => Promise<{ dnd_enabled: boolean; next_dnd_end_ts: number; next_dnd_start_ts: number; ok: DefsOkTrue; snooze_enabled: boolean }>;

  /**
   * Retrieves a user's current Do Not Disturb status.
   * @see https://api.slack.com/methods/dnd.info
   */
  dndInfo: (input: {
    /** Authentication token. Requires scope: `dnd:read` */
    token?: string;
    /** User to fetch status for (defaults to current user) */
    user?: string;
  }) => Promise<{ dnd_enabled: boolean; next_dnd_end_ts: number; next_dnd_start_ts: number; ok: DefsOkTrue; snooze_enabled?: boolean; snooze_endtime?: number; snooze_remaining?: number }>;

  /**
   * Turns on Do Not Disturb mode for the current user, or changes its duration.
   * @see https://api.slack.com/methods/dnd.setSnooze
   */
  dndSetSnooze: (input: {
    /** Number of minutes, from now, to snooze until. */
    num_minutes: string;
    /** Authentication token. Requires scope: `dnd:write` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; snooze_enabled: boolean; snooze_endtime: number; snooze_remaining: number }>;

  /**
   * Retrieves the Do Not Disturb status for up to 50 users on a team.
   * @see https://api.slack.com/methods/dnd.teamInfo
   */
  dndTeamInfo: (input: {
    /** Authentication token. Requires scope: `dnd:read` */
    token?: string;
    /** Comma-separated list of users to fetch Do Not Disturb status for */
    users?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Lists custom emoji for a team.
   * @see https://api.slack.com/methods/emoji.list
   */
  emojiList: (input: {
    /** Authentication token. Requires scope: `emoji:read` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Deletes an existing comment on a file.
   * @see https://api.slack.com/methods/files.comments.delete
   */
  filesCommentsDelete: (input: {
    /** File to delete a comment from. */
    file?: string;
    /** The comment to delete. */
    id?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Deletes a file.
   * @see https://api.slack.com/methods/files.delete
   */
  filesDelete: (input: {
    /** ID of file to delete. */
    file?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Gets information about a file.
   * @see https://api.slack.com/methods/files.info
   */
  filesInfo: (input: {
    /** Authentication token. Requires scope: `files:read` */
    token?: string;
    /** Specify a file by providing its ID. */
    file?: string;
    count?: string;
    page?: string;
    /** The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. */
    limit?: number;
    /** Parameter for pagination. File comments are paginated for a single file. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection of comments. See [pagination](/docs/pagination) for more details. */
    cursor?: string;
  }) => Promise<{ comments: ObjsComments; content_html?: unknown; editor?: DefsUserId; file: ObjsFile; ok: DefsOkTrue; paging?: ObjsPaging; response_metadata?: ObjsResponseMetadata }>;

  /**
   * List for a team, in a channel, or from a user with applied filters.
   * @see https://api.slack.com/methods/files.list
   */
  filesList: (input: {
    /** Authentication token. Requires scope: `files:read` */
    token?: string;
    /** Filter files created by a single user. */
    user?: string;
    /** Filter files appearing in a specific channel, indicated by its ID. */
    channel?: string;
    /** Filter files created after this timestamp (inclusive). */
    ts_from?: number;
    /** Filter files created before this timestamp (inclusive). */
    ts_to?: number;
    /** Filter files by type ([see below](#file_types)). You can pass multiple values in the types argument, like `types=spaces,snippets`.The default value is `all`, which does not filter the list. */
    types?: string;
    count?: string;
    page?: string;
    /** Show truncated file info for files hidden due to being too old, and the team who owns the file being over the file limit. */
    show_files_hidden_by_limit?: boolean;
  }) => Promise<{ files: (ObjsFile)[]; ok: DefsOkTrue; paging: ObjsPaging }>;

  /**
   * Adds a file from a remote service
   * @see https://api.slack.com/methods/files.remote.add
   */
  filesRemoteAdd: (input: {
    /** Creator defined GUID for the file. */
    external_id?: string;
    /** URL of the remote file. */
    external_url?: string;
    /** type of file */
    filetype?: string;
    /** A text file (txt, pdf, doc, etc.) containing textual search terms that are used to improve discovery of the remote file. */
    indexable_file_contents?: string;
    /** Preview of the document via `multipart/form-data`. */
    preview_image?: string;
    /** Title of the file being shared. */
    title?: string;
    /** Authentication token. Requires scope: `remote_files:write` */
    token?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Retrieve information about a remote file added to Slack
   * @see https://api.slack.com/methods/files.remote.info
   */
  filesRemoteInfo: (input: {
    /** Authentication token. Requires scope: `remote_files:read` */
    token?: string;
    /** Specify a file by providing its ID. */
    file?: string;
    /** Creator defined GUID for the file. */
    external_id?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Retrieve information about a remote file added to Slack
   * @see https://api.slack.com/methods/files.remote.list
   */
  filesRemoteList: (input: {
    /** Authentication token. Requires scope: `remote_files:read` */
    token?: string;
    /** Filter files appearing in a specific channel, indicated by its ID. */
    channel?: string;
    /** Filter files created after this timestamp (inclusive). */
    ts_from?: number;
    /** Filter files created before this timestamp (inclusive). */
    ts_to?: number;
    /** The maximum number of items to return. */
    limit?: number;
    /** Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. */
    cursor?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Remove a remote file.
   * @see https://api.slack.com/methods/files.remote.remove
   */
  filesRemoteRemove: (input: {
    /** Creator defined GUID for the file. */
    external_id?: string;
    /** Specify a file by providing its ID. */
    file?: string;
    /** Authentication token. Requires scope: `remote_files:write` */
    token?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Share a remote file into a channel.
   * @see https://api.slack.com/methods/files.remote.share
   */
  filesRemoteShare: (input: {
    /** Authentication token. Requires scope: `remote_files:share` */
    token?: string;
    /** Specify a file registered with Slack by providing its ID. Either this field or `external_id` or both are required. */
    file?: string;
    /** The globally unique identifier (GUID) for the file, as set by the app registering the file with Slack.  Either this field or `file` or both are required. */
    external_id?: string;
    /** Comma-separated list of channel IDs where the file will be shared. */
    channels?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Updates an existing remote file.
   * @see https://api.slack.com/methods/files.remote.update
   */
  filesRemoteUpdate: (input: {
    /** Creator defined GUID for the file. */
    external_id?: string;
    /** URL of the remote file. */
    external_url?: string;
    /** Specify a file by providing its ID. */
    file?: string;
    /** type of file */
    filetype?: string;
    /** File containing contents that can be used to improve searchability for the remote file. */
    indexable_file_contents?: string;
    /** Preview of the document via `multipart/form-data`. */
    preview_image?: string;
    /** Title of the file being shared. */
    title?: string;
    /** Authentication token. Requires scope: `remote_files:write` */
    token?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Revokes public/external sharing access for a file
   * @see https://api.slack.com/methods/files.revokePublicURL
   */
  filesRevokePublicUrl: (input: {
    /** File to revoke */
    file?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ file: ObjsFile; ok: DefsOkTrue }>;

  /**
   * Enables a file for public/external sharing.
   * @see https://api.slack.com/methods/files.sharedPublicURL
   */
  filesSharedPublicUrl: (input: {
    /** File to share */
    file?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ file: ObjsFile; ok: DefsOkTrue }>;

  /**
   * Uploads or creates a file.
   * @see https://api.slack.com/methods/files.upload
   */
  filesUpload: (input: {
    /** Comma-separated list of channel names or IDs where the file will be shared. */
    channels?: string;
    /** File contents via a POST variable. If omitting this parameter, you must provide a `file`. */
    content?: string;
    /** File contents via `multipart/form-data`. If omitting this parameter, you must submit `content`. */
    file?: string;
    /** Filename of file. */
    filename?: string;
    /** A [file type](/types/file#file_types) identifier. */
    filetype?: string;
    /** The message text introducing the file in specified `channels`. */
    initial_comment?: string;
    /** Provide another message's `ts` value to upload this file as a reply. Never use a reply's `ts` value; use its parent instead. */
    thread_ts?: number;
    /** Title of file. */
    title?: string;
    /** Authentication token. Requires scope: `files:write:user` */
    token?: string;
  }) => Promise<{ file: ObjsFile; ok: DefsOkTrue }>;

  /**
   * For Enterprise Grid workspaces, map local user IDs to global user IDs
   * @see https://api.slack.com/methods/migration.exchange
   */
  migrationExchange: (input: {
    /** Authentication token. Requires scope: `tokens.basic` */
    token: string;
    /** A comma-separated list of user ids, up to 400 per request */
    users: string;
    /** Specify team_id starts with `T` in case of Org Token */
    team_id?: string;
    /** Specify `true` to convert `W` global user IDs to workspace-specific `U` IDs. Defaults to `false`. */
    to_old?: boolean;
  }) => Promise<{ enterprise_id: string; invalid_user_ids?: (string)[]; ok: DefsOkTrue; team_id: DefsTeam; user_id_map?: { [key: string]: unknown }; [key: string]: unknown }>;

  /**
   * Exchanges a temporary OAuth verifier code for an access token.
   * @see https://api.slack.com/methods/oauth.access
   */
  oauthAccess: (input: {
    /** Issued when you created your application. */
    client_id?: string;
    /** Issued when you created your application. */
    client_secret?: string;
    /** The `code` param returned via the OAuth callback. */
    code?: string;
    /** This must match the originally submitted URI (if one was sent). */
    redirect_uri?: string;
    /** Request the user to add your app only to a single channel. Only valid with a [legacy workspace app](https://api.slack.com/legacy-workspace-apps). */
    single_channel?: boolean;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Exchanges a temporary OAuth verifier code for a workspace token.
   * @see https://api.slack.com/methods/oauth.token
   */
  oauthToken: (input: {
    /** Issued when you created your application. */
    client_id?: string;
    /** Issued when you created your application. */
    client_secret?: string;
    /** The `code` param returned via the OAuth callback. */
    code?: string;
    /** This must match the originally submitted URI (if one was sent). */
    redirect_uri?: string;
    /** Request the user to add your app only to a single channel. */
    single_channel?: boolean;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Exchanges a temporary OAuth verifier code for an access token.
   * @see https://api.slack.com/methods/oauth.v2.access
   */
  oauthV2Access: (input: {
    /** Issued when you created your application. */
    client_id?: string;
    /** Issued when you created your application. */
    client_secret?: string;
    /** The `code` param returned via the OAuth callback. */
    code: string;
    /** This must match the originally submitted URI (if one was sent). */
    redirect_uri?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Pins an item to a channel.
   * @see https://api.slack.com/methods/pins.add
   */
  pinsAdd: (input: {
    /** Channel to pin the item in. */
    channel: string;
    /** Timestamp of the message to pin. */
    timestamp?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Lists items pinned to a channel.
   * @see https://api.slack.com/methods/pins.list
   */
  pinsList: (input: {
    /** Authentication token. Requires scope: `pins:read` */
    token: string;
    /** Channel to get pinned items for. */
    channel: string;
  }) => Promise<unknown>;

  /**
   * Un-pins an item from a channel.
   * @see https://api.slack.com/methods/pins.remove
   */
  pinsRemove: (input: {
    /** Channel where the item is pinned to. */
    channel: string;
    /** Timestamp of the message to un-pin. */
    timestamp?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Adds a reaction to an item.
   * @see https://api.slack.com/methods/reactions.add
   */
  reactionsAdd: (input: {
    /** Channel where the message to add reaction to was posted. */
    channel: string;
    /** Reaction (emoji) name. */
    name: string;
    /** Timestamp of the message to add reaction to. */
    timestamp: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Gets reactions for an item.
   * @see https://api.slack.com/methods/reactions.get
   */
  reactionsGet: (input: {
    /** Authentication token. Requires scope: `reactions:read` */
    token: string;
    /** Channel where the message to get reactions for was posted. */
    channel?: string;
    /** File to get reactions for. */
    file?: string;
    /** File comment to get reactions for. */
    file_comment?: string;
    /** If true always return the complete reaction list. */
    full?: boolean;
    /** Timestamp of the message to get reactions for. */
    timestamp?: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Lists reactions made by a user.
   * @see https://api.slack.com/methods/reactions.list
   */
  reactionsList: (input: {
    /** Authentication token. Requires scope: `reactions:read` */
    token: string;
    /** Show reactions made by this user. Defaults to the authed user. */
    user?: string;
    /** If true always return the complete reaction list. */
    full?: boolean;
    count?: number;
    page?: number;
    /** Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection. See [pagination](/docs/pagination) for more details. */
    cursor?: string;
    /** The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. */
    limit?: number;
  }) => Promise<{ items: (unknown)[]; ok: DefsOkTrue; paging?: ObjsPaging; response_metadata?: ObjsResponseMetadata }>;

  /**
   * Removes a reaction from an item.
   * @see https://api.slack.com/methods/reactions.remove
   */
  reactionsRemove: (input: {
    /** Channel where the message to remove reaction from was posted. */
    channel?: string;
    /** File to remove reaction from. */
    file?: string;
    /** File comment to remove reaction from. */
    file_comment?: string;
    /** Reaction (emoji) name. */
    name: string;
    /** Timestamp of the message to remove reaction from. */
    timestamp?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Creates a reminder.
   * @see https://api.slack.com/methods/reminders.add
   */
  remindersAdd: (input: {
    /** The content of the reminder */
    text: string;
    /** When this reminder should happen: the Unix timestamp (up to five years from now), the number of seconds until the reminder (if within 24 hours), or a natural language description (Ex. "in 15 minutes," or "every Thursday") */
    time: string;
    /** The user who will receive the reminder. If no user is specified, the reminder will go to user who created it. */
    user?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; reminder: ObjsReminder }>;

  /**
   * Marks a reminder as complete.
   * @see https://api.slack.com/methods/reminders.complete
   */
  remindersComplete: (input: {
    /** The ID of the reminder to be marked as complete */
    reminder?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Deletes a reminder.
   * @see https://api.slack.com/methods/reminders.delete
   */
  remindersDelete: (input: {
    /** The ID of the reminder */
    reminder?: string;
  }, options?: { headers?: { token?: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Gets information about a reminder.
   * @see https://api.slack.com/methods/reminders.info
   */
  remindersInfo: (input: {
    /** Authentication token. Requires scope: `reminders:read` */
    token?: string;
    /** The ID of the reminder */
    reminder?: string;
  }) => Promise<{ ok: DefsOkTrue; reminder: ObjsReminder }>;

  /**
   * Lists all reminders created by or for a given user.
   * @see https://api.slack.com/methods/reminders.list
   */
  remindersList: (input: {
    /** Authentication token. Requires scope: `reminders:read` */
    token?: string;
  }) => Promise<{ ok: DefsOkTrue; reminders: (ObjsReminder)[] }>;

  /**
   * Starts a Real Time Messaging session.
   * @see https://api.slack.com/methods/rtm.connect
   */
  rtmConnect: (input: {
    /** Authentication token. Requires scope: `rtm:stream` */
    token: string;
    /** Batch presence deliveries via subscription. Enabling changes the shape of `presence_change` events. See [batch presence](/docs/presence-and-status#batching). */
    batch_presence_aware?: boolean;
    /** Only deliver presence events when requested by subscription. See [presence subscriptions](/docs/presence-and-status#subscriptions). */
    presence_sub?: boolean;
  }) => Promise<{ ok: DefsOkTrue; self: { id: DefsUserId; name: string }; team: { domain: string; id: DefsTeam; name: string }; url: string }>;

  /**
   * Searches for messages matching a query.
   * @see https://api.slack.com/methods/search.messages
   */
  searchMessages: (input: {
    /** Authentication token. Requires scope: `search:read` */
    token: string;
    /** Pass the number of results you want per "page". Maximum of `100`. */
    count?: number;
    /** Pass a value of `true` to enable query highlight markers (see below). */
    highlight?: boolean;
    page?: number;
    /** Search query. */
    query: string;
    /** Return matches sorted by either `score` or `timestamp`. */
    sort?: string;
    /** Change sort direction to ascending (`asc`) or descending (`desc`). */
    sort_dir?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Adds a star to an item.
   * @see https://api.slack.com/methods/stars.add
   */
  starsAdd: (input: {
    /** Channel to add star to, or channel where the message to add star to was posted (used with `timestamp`). */
    channel?: string;
    /** File to add star to. */
    file?: string;
    /** File comment to add star to. */
    file_comment?: string;
    /** Timestamp of the message to add star to. */
    timestamp?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Lists stars for a user.
   * @see https://api.slack.com/methods/stars.list
   */
  starsList: (input: {
    /** Authentication token. Requires scope: `stars:read` */
    token?: string;
    count?: string;
    page?: string;
    /** Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first "page" of the collection. See [pagination](/docs/pagination) for more details. */
    cursor?: string;
    /** The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. */
    limit?: number;
  }) => Promise<{ items: (unknown)[]; ok: DefsOkTrue; paging?: ObjsPaging }>;

  /**
   * Removes a star from an item.
   * @see https://api.slack.com/methods/stars.remove
   */
  starsRemove: (input: {
    /** Channel to remove star from, or channel where the message to remove star from was posted (used with `timestamp`). */
    channel?: string;
    /** File to remove star from. */
    file?: string;
    /** File comment to remove star from. */
    file_comment?: string;
    /** Timestamp of the message to remove star from. */
    timestamp?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Gets the access logs for the current team.
   * @see https://api.slack.com/methods/team.accessLogs
   */
  teamAccessLogs: (input: {
    /** Authentication token. Requires scope: `admin` */
    token: string;
    /** End of time range of logs to include in results (inclusive). */
    before?: string;
    count?: string;
    page?: string;
  }) => Promise<{ logins: ({ count: number; country: string | null; date_first: number; date_last: number; ip: string | null; isp: string | null; region: string | null; user_agent: string; user_id: DefsUserId; username: string })[]; ok: DefsOkTrue; paging: ObjsPaging }>;

  /**
   * Gets billable users information for the current team.
   * @see https://api.slack.com/methods/team.billableInfo
   */
  teamBillableInfo: (input: {
    /** Authentication token. Requires scope: `admin` */
    token: string;
    /** A user to retrieve the billable information for. Defaults to all users. */
    user?: string;
  }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Gets information about the current team.
   * @see https://api.slack.com/methods/team.info
   */
  teamInfo: (input: {
    /** Authentication token. Requires scope: `team:read` */
    token: string;
    /** Team to get info on, if omitted, will return information about the current team. Will only return team that the authenticated token is allowed to see through external shared channels */
    team?: string;
  }) => Promise<{ ok: DefsOkTrue; team: ObjsTeam }>;

  /**
   * Gets the integration logs for the current team.
   * @see https://api.slack.com/methods/team.integrationLogs
   */
  teamIntegrationLogs: (input: {
    /** Authentication token. Requires scope: `admin` */
    token: string;
    /** Filter logs to this Slack app. Defaults to all logs. */
    app_id?: string;
    /** Filter logs with this change type. Defaults to all logs. */
    change_type?: string;
    count?: string;
    page?: string;
    /** Filter logs to this service. Defaults to all logs. */
    service_id?: string;
    /** Filter logs generated by this user’s actions. Defaults to all logs. */
    user?: string;
  }) => Promise<{ logs: ({ admin_app_id?: DefsAppId; app_id: DefsAppId; app_type: string; change_type: string; channel?: DefsChannel; date: string; scope: string; service_id?: string; service_type?: string; user_id: DefsUserId; user_name: string })[]; ok: DefsOkTrue; paging: ObjsPaging }>;

  /**
   * Retrieve a team's profile.
   * @see https://api.slack.com/methods/team.profile.get
   */
  teamProfileGet: (input: {
    /** Authentication token. Requires scope: `users.profile:read` */
    token: string;
    /** Filter by visibility. */
    visibility?: string;
  }) => Promise<{ ok: DefsOkTrue; profile: { fields: (ObjsTeamProfileField)[] } }>;

  /**
   * Create a User Group
   * @see https://api.slack.com/methods/usergroups.create
   */
  usergroupsCreate: (input: {
    /** A comma separated string of encoded channel IDs for which the User Group uses as a default. */
    channels?: string;
    /** A short description of the User Group. */
    description?: string;
    /** A mention handle. Must be unique among channels, users and User Groups. */
    handle?: string;
    /** Include the number of users in each User Group. */
    include_count?: boolean;
    /** A name for the User Group. Must be unique among User Groups. */
    name: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; usergroup: ObjsSubteam }>;

  /**
   * Disable an existing User Group
   * @see https://api.slack.com/methods/usergroups.disable
   */
  usergroupsDisable: (input: {
    /** Include the number of users in the User Group. */
    include_count?: boolean;
    /** The encoded ID of the User Group to disable. */
    usergroup: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; usergroup: ObjsSubteam }>;

  /**
   * Enable a User Group
   * @see https://api.slack.com/methods/usergroups.enable
   */
  usergroupsEnable: (input: {
    /** Include the number of users in the User Group. */
    include_count?: boolean;
    /** The encoded ID of the User Group to enable. */
    usergroup: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; usergroup: ObjsSubteam }>;

  /**
   * List all User Groups for a team
   * @see https://api.slack.com/methods/usergroups.list
   */
  usergroupsList: (input: {
    /** Include the list of users for each User Group. */
    include_users?: boolean;
    /** Authentication token. Requires scope: `usergroups:read` */
    token: string;
    /** Include the number of users in each User Group. */
    include_count?: boolean;
    /** Include disabled User Groups. */
    include_disabled?: boolean;
  }) => Promise<{ ok: DefsOkTrue; usergroups: (ObjsSubteam)[] }>;

  /**
   * Update an existing User Group
   * @see https://api.slack.com/methods/usergroups.update
   */
  usergroupsUpdate: (input: {
    /** A comma separated string of encoded channel IDs for which the User Group uses as a default. */
    channels?: string;
    /** A short description of the User Group. */
    description?: string;
    /** A mention handle. Must be unique among channels, users and User Groups. */
    handle?: string;
    /** Include the number of users in the User Group. */
    include_count?: boolean;
    /** A name for the User Group. Must be unique among User Groups. */
    name?: string;
    /** The encoded ID of the User Group to update. */
    usergroup: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; usergroup: ObjsSubteam }>;

  /**
   * List all users in a User Group
   * @see https://api.slack.com/methods/usergroups.users.list
   */
  usergroupsUsersList: (input: {
    /** Authentication token. Requires scope: `usergroups:read` */
    token: string;
    /** Allow results that involve disabled User Groups. */
    include_disabled?: boolean;
    /** The encoded ID of the User Group to update. */
    usergroup: string;
  }) => Promise<{ ok: DefsOkTrue; users: (DefsUserId)[] }>;

  /**
   * Update the list of users for a User Group
   * @see https://api.slack.com/methods/usergroups.users.update
   */
  usergroupsUsersUpdate: (input: {
    /** Include the number of users in the User Group. */
    include_count?: boolean;
    /** The encoded ID of the User Group to update. */
    usergroup: string;
    /** A comma separated string of encoded user IDs that represent the entire list of users for the User Group. */
    users: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; usergroup: ObjsSubteam }>;

  /**
   * List conversations the calling user may access.
   * @see https://api.slack.com/methods/users.conversations
   */
  usersConversations: (input: {
    /** Authentication token. Requires scope: `conversations:read` */
    token?: string;
    /** Browse conversations by a specific user ID's membership. Non-public channels are restricted to those where the calling user shares membership. */
    user?: string;
    /** Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im` */
    types?: string;
    /** Set to `true` to exclude archived channels from the list */
    exclude_archived?: boolean;
    /** The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000. */
    limit?: number;
    /** Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. */
    cursor?: string;
  }) => Promise<{ channels: (ObjsConversation)[]; ok: DefsOkTrue; response_metadata?: { next_cursor: string }; [key: string]: unknown }>;

  /**
   * Delete the user profile photo
   * @see https://api.slack.com/methods/users.deletePhoto
   */
  usersDeletePhoto: (input: {
    /** Authentication token. Requires scope: `users.profile:write` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Gets user presence information.
   * @see https://api.slack.com/methods/users.getPresence
   */
  usersGetPresence: (input: {
    /** Authentication token. Requires scope: `users:read` */
    token: string;
    /** User to get presence info on. Defaults to the authed user. */
    user?: string;
  }) => Promise<{ auto_away?: boolean; connection_count?: number; last_activity?: number; manual_away?: boolean; ok: DefsOkTrue; online?: boolean; presence: string; [key: string]: unknown }>;

  /**
   * Get a user's identity.
   * @see https://api.slack.com/methods/users.identity
   */
  usersIdentity: (input: {
    /** Authentication token. Requires scope: `identity.basic` */
    token?: string;
  }) => Promise<unknown>;

  /**
   * Gets information about a user.
   * @see https://api.slack.com/methods/users.info
   */
  usersInfo: (input: {
    /** Authentication token. Requires scope: `users:read` */
    token: string;
    /** Set this to `true` to receive the locale for this user. Defaults to `false` */
    include_locale?: boolean;
    /** User to get info on */
    user?: string;
  }) => Promise<{ ok: DefsOkTrue; user: ObjsUser; [key: string]: unknown }>;

  /**
   * Lists all users in a Slack team.
   * @see https://api.slack.com/methods/users.list
   */
  usersList: (input: {
    /** Authentication token. Requires scope: `users:read` */
    token?: string;
    /** The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. Providing no `limit` value will result in Slack attempting to deliver you the entire result set. If the collection is too large you may experience `limit_required` or HTTP 500 errors. */
    limit?: number;
    /** Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first "page" of the collection. See [pagination](/docs/pagination) for more detail. */
    cursor?: string;
    /** Set this to `true` to receive the locale for users. Defaults to `false` */
    include_locale?: boolean;
  }) => Promise<{ cache_ts: number; members: (ObjsUser)[]; ok: DefsOkTrue; response_metadata?: ObjsResponseMetadata }>;

  /**
   * Find a user with an email address.
   * @see https://api.slack.com/methods/users.lookupByEmail
   */
  usersLookupByEmail: (input: {
    /** Authentication token. Requires scope: `users:read.email` */
    token: string;
    /** An email address belonging to a user in the workspace */
    email: string;
  }) => Promise<{ ok: DefsOkTrue; user: ObjsUser; [key: string]: unknown }>;

  /**
   * Retrieves a user's profile information.
   * @see https://api.slack.com/methods/users.profile.get
   */
  usersProfileGet: (input: {
    /** Authentication token. Requires scope: `users.profile:read` */
    token: string;
    /** Include labels for each ID in custom profile fields */
    include_labels?: boolean;
    /** User to retrieve profile info for */
    user?: string;
  }) => Promise<{ ok: DefsOkTrue; profile: ObjsUserProfile }>;

  /**
   * Set the profile information for a user.
   * @see https://api.slack.com/methods/users.profile.set
   */
  usersProfileSet: (input: {
    /** Name of a single key to set. Usable only if `profile` is not passed. */
    name?: string;
    /** Collection of key:value pairs presented as a URL-encoded JSON hash. At most 50 fields may be set. Each field name is limited to 255 characters. */
    profile?: string;
    /** ID of user to change. This argument may only be specified by team admins on paid teams. */
    user?: string;
    /** Value to set a single key to. Usable only if `profile` is not passed. */
    value?: string;
  }, options: { headers: { token: string } }) => Promise<{ email_pending?: string; ok: DefsOkTrue; profile: ObjsUserProfile; username: string }>;

  /**
   * Marked a user as active. Deprecated and non-functional.
   * @see https://api.slack.com/methods/users.setActive
   */
  usersSetActive: (options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Set the user profile photo
   * @see https://api.slack.com/methods/users.setPhoto
   */
  usersSetPhoto: (input: {
    /** Width/height of crop box (always square) */
    crop_w?: string;
    /** X coordinate of top-left corner of crop box */
    crop_x?: string;
    /** Y coordinate of top-left corner of crop box */
    crop_y?: string;
    /** File contents via `multipart/form-data`. */
    image?: string;
    /** Authentication token. Requires scope: `users.profile:write` */
    token: string;
  }) => Promise<{ ok: DefsOkTrue; profile: { avatar_hash: string; image_1024: string; image_192: string; image_24: string; image_32: string; image_48: string; image_512: string; image_72: string; image_original: string } }>;

  /**
   * Manually sets user presence.
   * @see https://api.slack.com/methods/users.setPresence
   */
  usersSetPresence: (input: {
    /** Either `auto` or `away` */
    presence: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue }>;

  /**
   * Open a view for a user.
   * @see https://api.slack.com/methods/views.open
   */
  viewsOpen: (input: {
    /** Exchange a trigger to post to the user. */
    trigger_id: string;
    /** A [view payload](/reference/surfaces/views). This must be a JSON-encoded string. */
    view: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Publish a static view for a User.
   * @see https://api.slack.com/methods/views.publish
   */
  viewsPublish: (input: {
    /** `id` of the user you want publish a view to. */
    user_id: string;
    /** A [view payload](/reference/surfaces/views). This must be a JSON-encoded string. */
    view: string;
    /** A string that represents view state to protect against possible race conditions. */
    hash?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Push a view onto the stack of a root view.
   * @see https://api.slack.com/methods/views.push
   */
  viewsPush: (input: {
    /** Exchange a trigger to post to the user. */
    trigger_id: string;
    /** A [view payload](/reference/surfaces/views). This must be a JSON-encoded string. */
    view: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Update an existing view.
   * @see https://api.slack.com/methods/views.update
   */
  viewsUpdate: (input: {
    /** A unique identifier of the view to be updated. Either `view_id` or `external_id` is required. */
    view_id?: string;
    /** A unique identifier of the view set by the developer. Must be unique for all views on a team. Max length of 255 characters. Either `view_id` or `external_id` is required. */
    external_id?: string;
    /** A [view object](/reference/surfaces/views). This must be a JSON-encoded string. */
    view?: string;
    /** A string that represents view state to protect against possible race conditions. */
    hash?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Indicate that an app's step in a workflow completed execution.
   * @see https://api.slack.com/methods/workflows.stepCompleted
   */
  workflowsStepCompleted: (input: {
    /** Context identifier that maps to the correct workflow step execution. */
    workflow_step_execute_id: string;
    /** Key-value object of outputs from your step. Keys of this object reflect the configured `key` properties of your [`outputs`](/reference/workflows/workflow_step#output) array from your `workflow_step` object. */
    outputs?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Indicate that an app's step in a workflow failed to execute.
   * @see https://api.slack.com/methods/workflows.stepFailed
   */
  workflowsStepFailed: (input: {
    /** Context identifier that maps to the correct workflow step execution. */
    workflow_step_execute_id: string;
    /** A JSON-based object with a `message` property that should contain a human readable error message. */
    error: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;

  /**
   * Update the configuration for a workflow extension step.
   * @see https://api.slack.com/methods/workflows.updateStep
   */
  workflowsUpdateStep: (input: {
    /** A context identifier provided with `view_submission` payloads used to call back to `workflows.updateStep`. */
    workflow_step_edit_id: string;
    /** A JSON key-value map of inputs required from a user during configuration. This is the data your app expects to receive when the workflow step starts. **Please note**: the embedded variable format is set and replaced by the workflow system. You cannot create custom variables that will be replaced at runtime. [Read more about variables in workflow steps here](/workflows/steps#variables). */
    inputs?: string;
    /** An JSON array of output objects used during step execution. This is the data your app agrees to provide when your workflow step was executed. */
    outputs?: string;
    /** An optional field that can be used to override the step name that is shown in the Workflow Builder. */
    step_name?: string;
    /** An optional field that can be used to override app image that is shown in the Workflow Builder. */
    step_image_url?: string;
  }, options: { headers: { token: string } }) => Promise<{ ok: DefsOkTrue; [key: string]: unknown }>;
};

export * from "./schemas.js";
