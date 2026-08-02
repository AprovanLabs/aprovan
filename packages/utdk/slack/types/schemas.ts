/** This is a very loose definition, in the future, we'll populate this with deeper schema in this definition namespace. */
export type Blocks = ({ type: string; [key: string]: unknown })[];

export type DefsAppId = string;

export type DefsBotId = string;

export type DefsChannel = string;

export type DefsChannelId = string;

export type DefsChannelName = string;

export type DefsCommentId = string;

export type DefsDmId = string;

export type DefsEnterpriseId = string;

export type DefsEnterpriseName = string;

export type DefsEnterpriseUserId = string;

export type DefsFileId = string;

export type DefsGroupId = string;

export type DefsOkFalse = false;

export type DefsOkTrue = true;

export type DefsOptionalAppId = string;

export type DefsPinnedInfo = { [key: string]: unknown };

export type DefsReminderId = string;

export type DefsSubteamId = string;

export type DefsTeam = string;

export type DefsTopicPurposeCreator = string;

export type DefsTs = string;

export type DefsUserId = string;

export type DefsWorkspaceId = string;

export type ObjsBotProfile = {
  app_id: DefsAppId;
  deleted: boolean;
  icons: { image_36: string; image_48: string; image_72: string };
  id: DefsBotId;
  name: string;
  team_id: DefsTeam;
  updated: number;
};

export type ObjsChannel = {
  accepted_user?: DefsUserId;
  created: number;
  creator: DefsUserId;
  id: DefsChannelId;
  is_archived?: boolean;
  is_channel: boolean;
  is_frozen?: boolean;
  is_general?: boolean;
  is_member?: boolean;
  is_moved?: number;
  is_mpim: boolean;
  is_non_threadable?: boolean;
  is_org_shared: boolean;
  is_pending_ext_shared?: boolean;
  is_private: boolean;
  is_read_only?: boolean;
  is_shared: boolean;
  is_thread_only?: boolean;
  last_read?: DefsTs;
  latest?: unknown;
  members: (DefsUserId)[];
  name: string;
  name_normalized: string;
  num_members?: number;
  pending_shared?: (DefsTeam)[];
  previous_names?: (DefsChannelName)[];
  priority?: number;
  purpose: { creator: DefsTopicPurposeCreator; last_set: number; value: string };
  topic: { creator: DefsTopicPurposeCreator; last_set: number; value: string };
  unlinked?: number;
  unread_count?: number;
  unread_count_display?: number;
};

export type ObjsComment = {
  comment: string;
  created: number;
  id: DefsCommentId;
  is_intro: boolean;
  is_starred?: boolean;
  num_stars?: number;
  pinned_info?: DefsPinnedInfo;
  pinned_to?: (DefsChannel)[];
  reactions?: (ObjsReaction)[];
  timestamp: number;
  user: DefsUserId;
};

export type ObjsComments = (unknown)[];

export type ObjsConversation = unknown;

export type ObjsEnterpriseUser = {
  enterprise_id: DefsEnterpriseId;
  enterprise_name: DefsEnterpriseName;
  id: DefsEnterpriseUserId;
  is_admin: boolean;
  is_owner: boolean;
  teams: (DefsTeam)[];
};

export type ObjsExternalOrgMigrations = {
  current: ({ date_started: number; team_id: string })[];
  date_updated: number;
};

export type ObjsFile = {
  channels?: (DefsChannelId)[];
  comments_count?: number;
  created?: number;
  date_delete?: number;
  display_as_bot?: boolean;
  editable?: boolean;
  editor?: DefsUserId;
  external_id?: string;
  external_type?: string;
  external_url?: string;
  filetype?: string;
  groups?: (DefsGroupId)[];
  has_rich_preview?: boolean;
  id?: DefsFileId;
  image_exif_rotation?: number;
  ims?: (DefsDmId)[];
  is_external?: boolean;
  is_public?: boolean;
  is_starred?: boolean;
  is_tombstoned?: boolean;
  last_editor?: DefsUserId;
  mimetype?: string;
  mode?: string;
  name?: string;
  non_owner_editable?: boolean;
  num_stars?: number;
  original_h?: number;
  original_w?: number;
  permalink?: string;
  permalink_public?: string;
  pinned_info?: DefsPinnedInfo;
  pinned_to?: (DefsChannel)[];
  pretty_type?: string;
  preview?: string;
  public_url_shared?: boolean;
  reactions?: (ObjsReaction)[];
  shares?: { private?: unknown; public?: unknown };
  size?: number;
  source_team?: DefsTeam;
  state?: string;
  thumb_1024?: string;
  thumb_1024_h?: number;
  thumb_1024_w?: number;
  thumb_160?: string;
  thumb_360?: string;
  thumb_360_h?: number;
  thumb_360_w?: number;
  thumb_480?: string;
  thumb_480_h?: number;
  thumb_480_w?: number;
  thumb_64?: string;
  thumb_720?: string;
  thumb_720_h?: number;
  thumb_720_w?: number;
  thumb_80?: string;
  thumb_800?: string;
  thumb_800_h?: number;
  thumb_800_w?: number;
  thumb_960?: string;
  thumb_960_h?: number;
  thumb_960_w?: number;
  thumb_tiny?: string;
  timestamp?: number;
  title?: string;
  updated?: number;
  url_private?: string;
  url_private_download?: string;
  user?: string;
  user_team?: DefsTeam;
  username?: string;
};

export type ObjsIcon = {
  image_102?: string;
  image_132?: string;
  image_230?: string;
  image_34?: string;
  image_44?: string;
  image_68?: string;
  image_88?: string;
  image_default?: boolean;
};

export type ObjsMessage = {
  attachments?: ({ fallback?: string; id: number; image_bytes?: number; image_height?: number; image_url?: string; image_width?: number })[];
  blocks?: Blocks;
  bot_id?: unknown;
  bot_profile?: ObjsBotProfile;
  client_msg_id?: string;
  comment?: ObjsComment;
  display_as_bot?: boolean;
  file?: ObjsFile;
  files?: (ObjsFile)[];
  icons?: { emoji?: string; image_64?: string };
  inviter?: DefsUserId;
  is_delayed_message?: boolean;
  is_intro?: boolean;
  is_starred?: boolean;
  last_read?: DefsTs;
  latest_reply?: DefsTs;
  name?: string;
  old_name?: string;
  parent_user_id?: DefsUserId;
  permalink?: string;
  pinned_to?: (DefsChannel)[];
  purpose?: string;
  reactions?: (ObjsReaction)[];
  reply_count?: number;
  reply_users?: (DefsUserId)[];
  reply_users_count?: number;
  source_team?: DefsWorkspaceId;
  subscribed?: boolean;
  subtype?: string;
  team?: DefsWorkspaceId;
  text: string;
  thread_ts?: DefsTs;
  topic?: string;
  ts: DefsTs;
  type: string;
  unread_count?: number;
  upload?: boolean;
  user?: DefsUserId;
  user_profile?: ObjsUserProfileShort;
  user_team?: DefsWorkspaceId;
  username?: string;
};

export type ObjsPaging = {
  count?: number;
  page: number;
  pages?: number;
  per_page?: number;
  spill?: number;
  total: number;
};

export type ObjsPrimaryOwner = {
  email: string;
  id: string;
};

export type ObjsReaction = {
  count: number;
  name: string;
  users: (DefsUserId)[];
  [key: string]: unknown;
};

export type ObjsReminder = {
  complete_ts?: number;
  creator: DefsUserId;
  id: DefsReminderId;
  recurring: boolean;
  text: string;
  time?: number;
  user: DefsUserId;
};

export type ObjsResources = {
  excluded_ids?: (unknown)[];
  ids: (unknown)[];
  wildcard?: boolean;
};

export type ObjsResponseMetadata = unknown;

export type ObjsScopes = (string)[];

export type ObjsSubteam = {
  auto_provision: boolean;
  auto_type: unknown;
  channel_count?: number;
  created_by: DefsUserId;
  date_create: number;
  date_delete: number;
  date_update: number;
  deleted_by: unknown;
  description: string;
  enterprise_subteam_id: string;
  handle: string;
  id: DefsSubteamId;
  is_external: boolean;
  is_subteam: boolean;
  is_usergroup: boolean;
  name: string;
  prefs: { channels: (DefsChannelId)[]; groups: (DefsGroupId)[] };
  team_id: DefsTeam;
  updated_by: DefsUserId;
  user_count?: number;
  users?: (DefsUserId)[];
};

export type ObjsTeam = {
  archived?: boolean;
  avatar_base_url?: string;
  created?: number;
  date_create?: number;
  deleted?: boolean;
  description?: string | null;
  discoverable?: unknown;
  domain: string;
  email_domain: string;
  enterprise_id?: DefsEnterpriseId;
  enterprise_name?: DefsEnterpriseName;
  external_org_migrations?: ObjsExternalOrgMigrations;
  has_compliance_export?: boolean;
  icon: ObjsIcon;
  id: DefsWorkspaceId;
  is_assigned?: boolean;
  is_enterprise?: number;
  is_over_storage_limit?: boolean;
  limit_ts?: number;
  locale?: string;
  messages_count?: number;
  msg_edit_window_mins?: number;
  name: string;
  over_integrations_limit?: boolean;
  over_storage_limit?: boolean;
  pay_prod_cur?: string;
  plan?: "" | "std" | "plus" | "compliance" | "enterprise";
  primary_owner?: ObjsPrimaryOwner;
  sso_provider?: { label?: string; name?: string; type?: string };
};

export type ObjsTeamProfileField = {
  field_name?: string | null;
  hint: string;
  id: string;
  is_hidden?: boolean;
  label: string;
  options?: unknown;
  ordering: number;
  possible_values?: (string)[] | null;
  type: "text" | "date" | "link" | "mailto" | "options_list" | "user";
};

export type ObjsTeamProfileFieldOption = {
  is_custom?: boolean | null;
  is_multiple_entry?: boolean | null;
  is_protected?: boolean | null;
  is_scim?: boolean | null;
};

export type ObjsUser = unknown;

export type ObjsUserProfile = {
  always_active?: boolean;
  api_app_id?: DefsOptionalAppId;
  avatar_hash: string;
  bot_id?: DefsBotId;
  display_name: string;
  display_name_normalized: string;
  email?: string | null;
  fields: { [key: string]: unknown } | (unknown)[] | null;
  first_name?: string | null;
  guest_expiration_ts?: number | null;
  guest_invited_by?: string | null;
  image_1024?: string | null;
  image_192?: string | null;
  image_24?: string | null;
  image_32?: string | null;
  image_48?: string | null;
  image_512?: string | null;
  image_72?: string | null;
  image_original?: string | null;
  is_app_user?: boolean;
  is_custom_image?: boolean;
  is_restricted?: boolean | null;
  is_ultra_restricted?: boolean | null;
  last_avatar_image_hash?: string;
  last_name?: string | null;
  memberships_count?: number;
  name?: string | null;
  phone: string;
  pronouns?: string;
  real_name: string;
  real_name_normalized: string;
  skype: string;
  status_default_emoji?: string;
  status_default_text?: string;
  status_default_text_canonical?: string | null;
  status_emoji: string;
  status_expiration?: number;
  status_text: string;
  status_text_canonical?: string | null;
  team?: DefsWorkspaceId;
  title: string;
  updated?: number;
  user_id?: string;
  username?: string | null;
};

export type ObjsUserProfileShort = {
  avatar_hash: string;
  display_name: string;
  display_name_normalized?: string;
  first_name: string | null;
  image_72: string;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
  name: string;
  real_name: string;
  real_name_normalized?: string;
  team: DefsWorkspaceId;
};
