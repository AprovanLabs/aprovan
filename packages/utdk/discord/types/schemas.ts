export type AccountResponse = {
  id: string;
  name: string | null;
};

export type ActionRowComponentForMessageRequest = {
  type: 1;
  id?: number | null;
  components: (ButtonComponentForMessageRequest | ChannelSelectComponentForMessageRequest | MentionableSelectComponentForMessageRequest | RoleSelectComponentForMessageRequest | StringSelectComponentForMessageRequest | UserSelectComponentForMessageRequest)[];
};

export type ActionRowComponentForModalRequest = {
  type: 1;
  id?: number | null;
  components: (TextInputComponentForModalRequest)[];
};

export type ActionRowComponentResponse = {
  type: 1;
  id: number;
  components: (ButtonComponentResponse | ChannelSelectComponentResponse | MentionableSelectComponentResponse | RoleSelectComponentResponse | StringSelectComponentResponse | TextInputComponentResponse | UserSelectComponentResponse)[];
};

export type ActionTypes = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type ActivitiesAttachmentResponse = {
  attachment: AttachmentResponse;
};

export type ActivityActionTypes = unknown | unknown | unknown | unknown | unknown;

export type AfkTimeouts = unknown | unknown | unknown | unknown | unknown;

export type AllowedMentionTypes = unknown | unknown | unknown;

export type ApplicationCommandAttachmentOption = {
  type: 11;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
};

export type ApplicationCommandAttachmentOptionResponse = {
  type: 11;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
};

export type ApplicationCommandAutocompleteCallbackRequest = {
  type: 8;
  data: InteractionApplicationCommandAutocompleteCallbackIntegerData | InteractionApplicationCommandAutocompleteCallbackNumberData | InteractionApplicationCommandAutocompleteCallbackStringData;
};

export type ApplicationCommandBooleanOption = {
  type: 5;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
};

export type ApplicationCommandBooleanOptionResponse = {
  type: 5;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
};

export type ApplicationCommandChannelOption = {
  type: 7;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
  channel_types?: unknown[] | null;
};

export type ApplicationCommandChannelOptionResponse = {
  type: 7;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
  channel_types?: (ChannelTypes)[];
};

export type ApplicationCommandCreateRequest = {
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description?: string | null;
  description_localizations?: { [key: string]: unknown } | null;
  options?: unknown[] | null;
  default_member_permissions?: number | null;
  dm_permission?: boolean | null;
  contexts?: unknown[] | null;
  integration_types?: unknown[] | null;
  handler?: null | ApplicationCommandHandler;
  type?: null | ApplicationCommandType;
};

export type ApplicationCommandHandler = number;

export type ApplicationCommandIntegerOption = {
  type: 4;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
  autocomplete?: boolean | null;
  choices?: unknown[] | null;
  min_value?: null | Int53Type;
  max_value?: null | Int53Type;
};

export type ApplicationCommandIntegerOptionResponse = {
  type: 4;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
  autocomplete?: boolean;
  choices?: (ApplicationCommandOptionIntegerChoiceResponse)[];
  min_value?: Int53Type;
  max_value?: Int53Type;
};

export type ApplicationCommandInteractionMetadataResponse = {
  id: SnowflakeType;
  type: 2;
  user?: UserResponse;
  authorizing_integration_owners: { [key: string]: SnowflakeType | undefined };
  original_response_message_id?: SnowflakeType;
  target_user?: UserResponse;
  target_message_id?: SnowflakeType;
};

export type ApplicationCommandMentionableOption = {
  type: 9;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
};

export type ApplicationCommandMentionableOptionResponse = {
  type: 9;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
};

export type ApplicationCommandNumberOption = {
  type: 10;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
  autocomplete?: boolean | null;
  choices?: unknown[] | null;
  min_value?: number | null;
  max_value?: number | null;
};

export type ApplicationCommandNumberOptionResponse = {
  type: 10;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
  autocomplete?: boolean;
  choices?: (ApplicationCommandOptionNumberChoiceResponse)[];
  min_value?: number;
  max_value?: number;
};

export type ApplicationCommandOptionIntegerChoice = {
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  value: Int53Type;
};

export type ApplicationCommandOptionIntegerChoiceResponse = {
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  value: Int53Type;
};

export type ApplicationCommandOptionNumberChoice = {
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  value: number;
};

export type ApplicationCommandOptionNumberChoiceResponse = {
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  value: number;
};

export type ApplicationCommandOptionStringChoice = {
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  value: string;
};

export type ApplicationCommandOptionStringChoiceResponse = {
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  value: string;
};

export type ApplicationCommandOptionType = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type ApplicationCommandPatchRequestPartial = {
  name?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description?: string | null;
  description_localizations?: { [key: string]: unknown } | null;
  options?: unknown[] | null;
  default_member_permissions?: number | null;
  dm_permission?: boolean | null;
  contexts?: unknown[] | null;
  integration_types?: unknown[] | null;
  handler?: null | ApplicationCommandHandler;
};

export type ApplicationCommandPermission = {
  id: SnowflakeType;
  type: ApplicationCommandPermissionType;
  permission: boolean;
};

export type ApplicationCommandPermissionType = unknown | unknown | unknown;

export type ApplicationCommandResponse = {
  id: SnowflakeType;
  application_id: SnowflakeType;
  version: SnowflakeType;
  default_member_permissions: string | null;
  type: ApplicationCommandType;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  guild_id?: SnowflakeType;
  dm_permission?: boolean;
  contexts?: unknown[] | null;
  integration_types?: (ApplicationIntegrationType)[];
  options?: (ApplicationCommandAttachmentOptionResponse | ApplicationCommandBooleanOptionResponse | ApplicationCommandChannelOptionResponse | ApplicationCommandIntegerOptionResponse | ApplicationCommandMentionableOptionResponse | ApplicationCommandNumberOptionResponse | ApplicationCommandRoleOptionResponse | ApplicationCommandStringOptionResponse | ApplicationCommandSubcommandGroupOptionResponse | ApplicationCommandSubcommandOptionResponse | ApplicationCommandUserOptionResponse)[];
  nsfw?: boolean;
};

export type ApplicationCommandRoleOption = {
  type: 8;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
};

export type ApplicationCommandRoleOptionResponse = {
  type: 8;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
};

export type ApplicationCommandStringOption = {
  type: 3;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
  autocomplete?: boolean | null;
  min_length?: number | null;
  max_length?: number | null;
  choices?: unknown[] | null;
};

export type ApplicationCommandStringOptionResponse = {
  type: 3;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
  autocomplete?: boolean;
  choices?: (ApplicationCommandOptionStringChoiceResponse)[];
  min_length?: number;
  max_length?: number;
};

export type ApplicationCommandSubcommandGroupOption = {
  type: 2;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
  options?: unknown[] | null;
};

export type ApplicationCommandSubcommandGroupOptionResponse = {
  type: 2;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
  options?: (ApplicationCommandSubcommandOptionResponse)[];
};

export type ApplicationCommandSubcommandOption = {
  type: 1;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
  options?: unknown[] | null;
};

export type ApplicationCommandSubcommandOptionResponse = {
  type: 1;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
  options?: (ApplicationCommandAttachmentOptionResponse | ApplicationCommandBooleanOptionResponse | ApplicationCommandChannelOptionResponse | ApplicationCommandIntegerOptionResponse | ApplicationCommandMentionableOptionResponse | ApplicationCommandNumberOptionResponse | ApplicationCommandRoleOptionResponse | ApplicationCommandStringOptionResponse | ApplicationCommandUserOptionResponse)[];
};

export type ApplicationCommandType = unknown | unknown | unknown | unknown;

export type ApplicationCommandUpdateRequest = {
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description?: string | null;
  description_localizations?: { [key: string]: unknown } | null;
  options?: unknown[] | null;
  default_member_permissions?: number | null;
  dm_permission?: boolean | null;
  contexts?: unknown[] | null;
  integration_types?: unknown[] | null;
  handler?: null | ApplicationCommandHandler;
  type?: null | ApplicationCommandType;
  id?: null | SnowflakeType;
};

export type ApplicationCommandUserOption = {
  type: 6;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean | null;
};

export type ApplicationCommandUserOptionResponse = {
  type: 6;
  name: string;
  name_localized?: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localized?: string;
  description_localizations?: { [key: string]: unknown } | null;
  required?: boolean;
};

export type ApplicationEventWebhooksStatus = unknown | unknown | unknown;

export type ApplicationExplicitContentFilterTypes = unknown | unknown;

export type ApplicationFormPartial = {
  description?: { [key: string]: unknown } | null;
  icon?: string | null;
  cover_image?: string | null;
  team_id?: null | SnowflakeType;
  flags?: number | null;
  interactions_endpoint_url?: string | null;
  explicit_content_filter?: null | ApplicationExplicitContentFilterTypes;
  max_participants?: number | null;
  type?: null | ApplicationTypes;
  tags?: unknown[] | null;
  custom_install_url?: string | null;
  install_params?: null | ApplicationOAuth2InstallParams;
  role_connections_verification_url?: string | null;
  integration_types_config?: { [key: string]: unknown } | null;
  event_webhooks_status?: null | 1 | 2;
  event_webhooks_url?: string | null;
  event_webhooks_types?: unknown[] | null;
};

export type ApplicationIdentityProviderAuthType = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type ApplicationIncomingWebhookResponse = {
  application_id: null | SnowflakeType;
  avatar: string | null;
  channel_id: null | SnowflakeType;
  guild_id?: null | SnowflakeType;
  id: SnowflakeType;
  name: string;
  type: 3;
  user?: UserResponse;
};

export type ApplicationIntegrationType = unknown | unknown;

export type ApplicationIntegrationTypeConfiguration = {
  oauth2_install_params?: null | ApplicationOAuth2InstallParams;
};

export type ApplicationIntegrationTypeConfigurationResponse = {
  oauth2_install_params?: ApplicationOAuth2InstallParamsResponse;
};

export type ApplicationOAuth2InstallParams = {
  scopes?: unknown[] | null;
  permissions?: number | null;
};

export type ApplicationOAuth2InstallParamsResponse = {
  scopes: ("applications.commands" | "bot")[];
  permissions: string;
};

export type ApplicationResponse = {
  id: SnowflakeType;
  name: string;
  icon: string | null;
  description: string;
  type: null | ApplicationTypes;
  cover_image?: string;
  primary_sku_id?: SnowflakeType;
  bot?: UserResponse;
  slug?: string;
  guild_id?: SnowflakeType;
  rpc_origins?: (string)[];
  bot_public?: boolean;
  bot_require_code_grant?: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  custom_install_url?: string;
  install_params?: ApplicationOAuth2InstallParamsResponse;
  integration_types_config?: { [key: string]: ApplicationIntegrationTypeConfigurationResponse | undefined };
  verify_key: string;
  flags: number;
  flags_new: string;
  max_participants?: number | null;
  tags?: (string)[];
};

export type ApplicationRoleConnectionsMetadataItemRequest = {
  type: MetadataItemTypes;
  key: string;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
};

export type ApplicationRoleConnectionsMetadataItemResponse = {
  type: MetadataItemTypes;
  key: string;
  name: string;
  name_localizations?: { [key: string]: unknown } | null;
  description: string;
  description_localizations?: { [key: string]: unknown } | null;
};

export type ApplicationTypes = unknown;

export type ApplicationUserRoleConnectionResponse = {
  platform_name?: string;
  platform_username?: string | null;
  metadata?: { [key: string]: string | undefined };
};

export type AttachmentResponse = {
  id: SnowflakeType;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  width?: number;
  height?: number;
  duration_secs?: number;
  waveform?: string;
  description?: string;
  content_type?: string;
  ephemeral?: boolean;
  flags?: number;
  placeholder?: string;
  placeholder_version?: number;
  title?: string | null;
  application?: ApplicationResponse;
  clip_created_at?: string;
  clip_participants?: (UserResponse)[];
};

export type AuditLogActionTypes = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type AuditLogEntryResponse = {
  id: SnowflakeType;
  action_type: AuditLogActionTypes;
  user_id: null | SnowflakeType;
  target_id: null | SnowflakeType;
  changes?: (AuditLogObjectChangeResponse)[];
  options?: { [key: string]: string | undefined };
  reason?: string;
};

export type AuditLogObjectChangeResponse = {
  key: string | null;
  new_value?: unknown;
  old_value?: unknown;
};

export type AuthorType = unknown | unknown | unknown | unknown | unknown | unknown;

export type AutomodActionType = unknown | unknown | unknown | unknown;

export type AutomodEventType = unknown | unknown;

export type AutomodKeywordPresetType = unknown | unknown | unknown;

export type AutomodTriggerType = unknown | unknown | unknown | unknown | unknown;

export type AvailableLocalesEnum = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type BanUserFromGuildRequest = {
  delete_message_seconds?: number | null;
  delete_message_days?: number | null;
};

export type BaseCreateMessageCreateRequest = {
  content?: string | null;
  embeds?: unknown[] | null;
  allowed_mentions?: null | MessageAllowedMentionsRequest;
  sticker_ids?: unknown[] | null;
  components?: unknown[] | null;
  flags?: number | null;
  attachments?: unknown[] | null;
  poll?: null | PollCreateRequest;
  shared_client_theme?: null | CustomClientThemeShareRequest;
};

export type BasicApplicationResponse = {
  id: SnowflakeType;
  name: string;
  icon: string | null;
  description: string;
  type: null | ApplicationTypes;
  cover_image?: string;
  primary_sku_id?: SnowflakeType;
  bot?: UserResponse;
};

export type BasicGuildMemberResponse = {
  avatar: string | null;
  avatar_decoration_data?: null | UserAvatarDecorationResponse;
  banner: string | null;
  communication_disabled_until: string | null;
  flags: number;
  joined_at: string;
  nick: string | null;
  pending: boolean;
  premium_since: string | null;
  roles: (SnowflakeType)[];
  collectibles?: null | UserCollectiblesResponse;
};

export type BasicMessageResponse = {
  type: MessageType;
  content: string;
  mentions: (UserResponse)[];
  mention_roles: (SnowflakeType)[];
  attachments: (MessageAttachmentResponse)[];
  embeds: (MessageEmbedResponse)[];
  timestamp: string;
  edited_timestamp: string | null;
  flags: number;
  components: (ActionRowComponentResponse | ContainerComponentResponse | FileComponentResponse | MediaGalleryComponentResponse | SectionComponentResponse | SeparatorComponentResponse | TextDisplayComponentResponse)[];
  stickers?: (GuildStickerResponse | StandardStickerResponse)[];
  sticker_items?: (MessageStickerItemResponse)[];
  id: SnowflakeType;
  channel_id: SnowflakeType;
  author: UserResponse;
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  call?: MessageCallResponse;
  activity?: MessageActivityResponse;
  application?: BasicApplicationResponse;
  application_id?: SnowflakeType;
  interaction?: MessageInteractionResponse;
  nonce?: number | string;
  webhook_id?: SnowflakeType;
  message_reference?: MessageReferenceResponse;
  thread?: ThreadResponse;
  mention_channels?: (MessageMentionChannelResponse)[];
  role_subscription_data?: MessageRoleSubscriptionDataResponse;
  purchase_notification?: PurchaseNotificationResponse;
  position?: number;
  resolved?: ResolvedObjectsResponse;
  poll?: PollResponse;
  shared_client_theme?: CustomClientThemeResponse;
  interaction_metadata?: ApplicationCommandInteractionMetadataResponse | MessageComponentInteractionMetadataResponse | ModalSubmitInteractionMetadataResponse;
  message_snapshots?: (MessageSnapshotResponse)[];
};

export type BlockMessageAction = {
  type: 1;
  metadata?: null | BlockMessageActionMetadata;
};

export type BlockMessageActionMetadata = {
  custom_message?: string | null;
};

export type BlockMessageActionMetadataResponse = {
  custom_message?: string;
};

export type BlockMessageActionResponse = {
  type: 1;
  metadata: BlockMessageActionMetadataResponse;
};

export type BotAccountPatchRequest = {
  username: string;
  avatar?: string | null;
  banner?: string | null;
};

export type BotAddGuildMemberRequest = {
  nick?: string | null;
  roles?: unknown[] | null;
  mute?: boolean | null;
  deaf?: boolean | null;
  access_token: string;
  flags?: number | null;
};

export type BulkBanUsersRequest = {
  user_ids: (SnowflakeType)[];
  delete_message_seconds?: number | null;
};

export type BulkBanUsersResponse = {
  banned_users: (SnowflakeType)[];
  failed_users: (SnowflakeType)[];
};

export type BulkLobbyMemberRequest = {
  id: SnowflakeType;
  metadata?: { [key: string]: unknown } | null;
  flags?: null | 1;
  remove_member?: boolean | null;
};

export type ButtonComponentForMessageRequest = {
  type: 2;
  id?: number | null;
  custom_id?: string | null;
  style: ButtonStyleTypes;
  label?: string | null;
  disabled?: boolean | null;
  url?: string | null;
  sku_id?: null | SnowflakeType;
  emoji?: null | ComponentEmojiForRequest;
};

export type ButtonComponentResponse = {
  type: 2;
  id: number;
  custom_id?: string;
  style: ButtonStyleTypes;
  label?: string;
  disabled?: boolean;
  emoji?: ComponentEmojiResponse;
  url?: string | null;
  sku_id?: SnowflakeType;
};

export type ButtonStyleTypes = unknown | unknown | unknown | unknown | unknown | unknown;

export type ChannelFollowerResponse = {
  channel_id: SnowflakeType;
  webhook_id: SnowflakeType;
};

export type ChannelFollowerWebhookResponse = {
  application_id: null | SnowflakeType;
  avatar: string | null;
  channel_id: null | SnowflakeType;
  guild_id?: null | SnowflakeType;
  id: SnowflakeType;
  name: string;
  type: 2;
  user?: UserResponse;
  source_guild?: WebhookSourceGuildResponse;
  source_channel?: WebhookSourceChannelResponse;
};

export type ChannelPermissionOverwriteRequest = {
  id: SnowflakeType;
  type?: null | ChannelPermissionOverwrites;
  allow?: number | null;
  deny?: number | null;
};

export type ChannelPermissionOverwriteResponse = {
  id: SnowflakeType;
  type: ChannelPermissionOverwrites;
  allow: string;
  deny: string;
};

export type ChannelPermissionOverwrites = unknown | unknown;

export type ChannelSelectComponentForMessageRequest = {
  type: 8;
  id?: number | null;
  custom_id: string;
  placeholder?: string | null;
  min_values?: number | null;
  max_values?: number | null;
  disabled?: boolean | null;
  required?: boolean | null;
  default_values?: unknown[] | null;
  channel_types?: unknown[] | null;
};

export type ChannelSelectComponentForModalRequest = {
  type: 8;
  id?: number | null;
  custom_id: string;
  placeholder?: string | null;
  min_values?: number | null;
  max_values?: number | null;
  disabled?: boolean | null;
  required?: boolean | null;
  default_values?: unknown[] | null;
  channel_types?: unknown[] | null;
};

export type ChannelSelectComponentResponse = {
  type: 8;
  id: number;
  custom_id: string;
  placeholder?: string;
  min_values: number;
  max_values: number;
  disabled?: boolean;
  channel_types?: (ChannelTypes)[];
  default_values?: (ChannelSelectDefaultValueResponse)[];
};

export type ChannelSelectDefaultValue = {
  type: "channel";
  id: SnowflakeType;
};

export type ChannelSelectDefaultValueResponse = {
  type: "channel";
  id: SnowflakeType;
};

export type ChannelTypes = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type CheckboxComponentForModalRequest = {
  type: 23;
  id?: number | null;
  custom_id: string;
  default?: boolean | null;
};

export type CheckboxGroupComponentForModalRequest = {
  type: 22;
  id?: number | null;
  custom_id: string;
  min_values?: number | null;
  max_values?: number | null;
  required?: boolean | null;
  options: (CheckboxGroupOptionForRequest)[];
};

export type CheckboxGroupOptionForRequest = {
  label: string;
  value: string;
  description?: string | null;
  default?: boolean | null;
};

export type CommandPermissionResponse = {
  id: SnowflakeType;
  type: ApplicationCommandPermissionType;
  permission: boolean;
};

export type CommandPermissionsResponse = {
  id: SnowflakeType;
  application_id: SnowflakeType;
  guild_id: SnowflakeType;
  permissions: (CommandPermissionResponse)[];
};

export type ComponentEmojiForRequest = {
  id?: null | SnowflakeType;
  name: string;
};

export type ComponentEmojiResponse = {
  id?: SnowflakeType;
  name: string;
  animated?: boolean;
};

export type ConnectedAccountGuildResponse = {
  id: SnowflakeType;
  name: string;
  icon: string | null;
};

export type ConnectedAccountIntegrationResponse = {
  id: string;
  type: IntegrationTypes;
  account: AccountResponse;
  guild: ConnectedAccountGuildResponse;
};

export type ConnectedAccountProviders = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type ConnectedAccountResponse = {
  id: string;
  name: string | null;
  type: ConnectedAccountProviders;
  friend_sync: boolean;
  integrations?: (ConnectedAccountIntegrationResponse)[];
  show_activity: boolean;
  two_way_link: boolean;
  verified: boolean;
  visibility: ConnectedAccountVisibility;
  revoked?: boolean;
};

export type ConnectedAccountVisibility = unknown | unknown;

export type ContainerComponentForMessageRequest = {
  type: 17;
  id?: number | null;
  accent_color?: number | null;
  components: (ActionRowComponentForMessageRequest | FileComponentForMessageRequest | MediaGalleryComponentForMessageRequest | SectionComponentForMessageRequest | SeparatorComponentForMessageRequest | TextDisplayComponentForMessageRequest)[];
  spoiler?: boolean | null;
};

export type ContainerComponentResponse = {
  type: 17;
  id: number;
  accent_color: number | null;
  components: (ActionRowComponentResponse | FileComponentResponse | MediaGalleryComponentResponse | SectionComponentResponse | SeparatorComponentResponse | TextDisplayComponentResponse)[];
  spoiler: boolean;
};

export type CreateEntitlementRequestData = {
  sku_id: SnowflakeType;
  owner_id: SnowflakeType;
  owner_type: EntitlementOwnerTypes;
};

export type CreateForumThreadRequest = {
  name: string;
  auto_archive_duration?: null | ThreadAutoArchiveDuration;
  rate_limit_per_user?: number | null;
  applied_tags?: unknown[] | null;
  message: BaseCreateMessageCreateRequest;
};

export type CreateGroupDmInviteRequest = {
  max_age?: number | null;
};

export type CreateGuildChannelRequest = {
  type?: null | 0 | 2 | 4 | 5 | 13 | 14 | 15;
  name: string;
  position?: number | null;
  topic?: string | null;
  bitrate?: number | null;
  user_limit?: number | null;
  nsfw?: boolean | null;
  rate_limit_per_user?: number | null;
  parent_id?: null | SnowflakeType;
  permission_overwrites?: unknown[] | null;
  rtc_region?: string | null;
  video_quality_mode?: null | VideoQualityModes;
  default_auto_archive_duration?: null | ThreadAutoArchiveDuration;
  default_reaction_emoji?: null | UpdateDefaultReactionEmojiRequest;
  default_thread_rate_limit_per_user?: number | null;
  default_sort_order?: null | ThreadSortOrder;
  default_forum_layout?: null | ForumLayout;
  default_tag_setting?: null | ThreadSearchTagSetting;
  available_tags?: unknown[] | null;
};

export type CreateGuildInviteRequest = {
  max_age?: number | null;
  temporary?: boolean | null;
  max_uses?: number | null;
  unique?: boolean | null;
  target_user_id?: null | SnowflakeType;
  target_application_id?: null | SnowflakeType;
  target_type?: null | 1 | 2;
};

export type CreateMessageInteractionCallbackRequest = {
  type: 4 | 5;
  data?: null | IncomingWebhookInteractionRequest;
};

export type CreateMessageInteractionCallbackResponse = {
  type: 4;
  message: MessageResponse;
};

export type CreateOrUpdateThreadTagRequest = {
  name: string;
  emoji_id?: null | SnowflakeType;
  emoji_name?: string | null;
  moderated?: boolean | null;
};

export type CreatePrivateChannelRequest = {
  recipient_id?: null | SnowflakeType;
  access_tokens?: unknown[] | null;
  nicks?: { [key: string]: unknown } | null;
};

export type CreateRoleRequest = {
  name?: string | null;
  permissions?: number | null;
  color?: number | null;
  colors?: null | RoleColors;
  hoist?: boolean | null;
  mentionable?: boolean | null;
  icon?: string | null;
  unicode_emoji?: string | null;
};

export type CreateTextThreadWithMessageRequest = {
  name: string;
  auto_archive_duration?: null | ThreadAutoArchiveDuration;
  rate_limit_per_user?: number | null;
};

export type CreateTextThreadWithoutMessageRequest = {
  name: string;
  auto_archive_duration?: null | ThreadAutoArchiveDuration;
  rate_limit_per_user?: number | null;
  type?: null | 10 | 11 | 12;
  invitable?: boolean | null;
};

export type CreatedThreadResponse = {
  id: SnowflakeType;
  type: 10 | 11 | 12;
  last_message_id?: null | SnowflakeType;
  flags: number;
  last_pin_timestamp?: string | null;
  guild_id: SnowflakeType;
  name: string;
  parent_id?: null | SnowflakeType;
  rate_limit_per_user?: number;
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string | null;
  video_quality_mode?: VideoQualityModes;
  permissions?: string;
  owner_id: SnowflakeType;
  thread_metadata: ThreadMetadataResponse;
  message_count: number;
  member_count: number;
  total_message_sent: number;
  applied_tags?: (SnowflakeType)[];
  member?: ThreadMemberResponse;
};

export type CustomClientThemeResponse = {
  colors: (string)[];
  gradient_angle: number;
  base_mix: number;
  base_theme: MessageShareCustomUserThemeBaseTheme;
};

export type CustomClientThemeShareRequest = {
  colors: (string)[];
  gradient_angle: number;
  base_mix: number;
  base_theme?: null | MessageShareCustomUserThemeBaseTheme;
};

export type DefaultKeywordListTriggerMetadata = {
  allow_list?: unknown[] | null;
  presets?: unknown[] | null;
};

export type DefaultKeywordListTriggerMetadataResponse = {
  allow_list: (string)[];
  presets: (AutomodKeywordPresetType)[];
};

export type DefaultKeywordListUpsertRequest = {
  name: string;
  event_type: AutomodEventType;
  actions?: unknown[] | null;
  enabled?: boolean | null;
  exempt_roles?: unknown[] | null;
  exempt_channels?: unknown[] | null;
  trigger_type: 4;
  trigger_metadata: DefaultKeywordListTriggerMetadata;
};

export type DefaultKeywordListUpsertRequestPartial = {
  name?: string;
  event_type?: AutomodEventType;
  actions?: unknown[] | null;
  enabled?: boolean | null;
  exempt_roles?: unknown[] | null;
  exempt_channels?: unknown[] | null;
  trigger_type?: 4;
  trigger_metadata?: DefaultKeywordListTriggerMetadata;
};

export type DefaultKeywordRuleResponse = {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  creator_id: SnowflakeType;
  name: string;
  event_type: AutomodEventType;
  actions: (BlockMessageActionResponse | FlagToChannelActionResponse | QuarantineUserActionResponse | UserCommunicationDisabledActionResponse)[];
  trigger_type: 4;
  enabled: boolean;
  exempt_roles: (SnowflakeType)[];
  exempt_channels: (SnowflakeType)[];
  trigger_metadata: DefaultKeywordListTriggerMetadataResponse;
};

export type DefaultReactionEmojiResponse = {
  emoji_id: null | SnowflakeType;
  emoji_name: string | null;
};

export type DiscordIntegrationResponse = {
  type: "discord";
  name: string | null;
  account: AccountResponse;
  enabled: boolean;
  id: SnowflakeType;
  application: IntegrationApplicationResponse;
  scopes: ("applications.commands" | "bot" | "webhook.incoming")[];
  user?: UserResponse;
};

export type EmbeddedActivityInstance = {
  application_id: SnowflakeType;
  instance_id: string;
  launch_id: string;
  location: GuildChannelLocation | PrivateChannelLocation;
  users: (SnowflakeType)[];
};

export type EmbeddedActivityLocationKind = unknown | unknown | unknown;

export type EmojiResponse = {
  id: SnowflakeType;
  name: string;
  user?: UserResponse;
  roles: (SnowflakeType)[];
  require_colons: boolean;
  managed: boolean;
  animated: boolean;
  available: boolean;
};

export type EntitlementOwnerTypes = number;

export type EntitlementResponse = {
  id: SnowflakeType;
  sku_id: SnowflakeType;
  application_id: SnowflakeType;
  user_id: SnowflakeType;
  guild_id?: null | SnowflakeType;
  deleted: boolean;
  starts_at: string | null;
  ends_at: string | null;
  type: EntitlementTypes;
  fulfilled_at?: string | null;
  fulfillment_status?: null | EntitlementTenantFulfillmentStatusResponse;
  consumed?: boolean;
  gifter_user_id?: null | SnowflakeType;
  parent_id?: null | SnowflakeType;
};

export type EntitlementTenantFulfillmentStatusResponse = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type EntitlementTypes = unknown | unknown;

export type EntityMetadataExternal = {
  location: string;
};

export type EntityMetadataExternalResponse = {
  location: string;
};

export type EntityMetadataStageInstance = { [key: string]: unknown };

export type EntityMetadataStageInstanceResponse = { [key: string]: unknown };

export type EntityMetadataVoice = { [key: string]: unknown };

export type EntityMetadataVoiceResponse = { [key: string]: unknown };

export type ExternalConnectionIntegrationResponse = {
  type: "twitch" | "youtube";
  name: string | null;
  account: AccountResponse;
  enabled: boolean;
  id: string;
  user: UserResponse;
  revoked?: boolean;
  expire_behavior?: IntegrationExpireBehaviorTypes;
  expire_grace_period?: IntegrationExpireGracePeriodTypes;
  subscriber_count?: number;
  synced_at?: string;
  role_id?: null | SnowflakeType;
  syncing?: boolean;
  enable_emoticons?: boolean;
};

export type ExternalScheduledEventCreateRequest = {
  name: string;
  description?: string | null;
  image?: string | null;
  scheduled_start_time: string;
  scheduled_end_time?: string | null;
  privacy_level: GuildScheduledEventPrivacyLevels;
  entity_type: 3;
  channel_id?: null | SnowflakeType;
  entity_metadata: EntityMetadataExternal;
};

export type ExternalScheduledEventPatchRequestPartial = {
  status?: null | GuildScheduledEventStatuses;
  name?: string;
  description?: string | null;
  image?: string | null;
  scheduled_start_time?: string;
  scheduled_end_time?: string | null;
  entity_type?: null | 3;
  privacy_level?: GuildScheduledEventPrivacyLevels;
  channel_id?: null | SnowflakeType;
  entity_metadata?: EntityMetadataExternal;
};

export type ExternalScheduledEventResponse = {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  name: string;
  description: string | null;
  channel_id: null | SnowflakeType;
  creator_id: null | SnowflakeType;
  creator?: UserResponse;
  image: string | null;
  scheduled_start_time: string;
  scheduled_end_time: string | null;
  status: GuildScheduledEventStatuses;
  entity_type: 3;
  entity_id: null | SnowflakeType;
  user_count?: number;
  privacy_level: GuildScheduledEventPrivacyLevels;
  user_rsvp?: null | ScheduledEventUserResponse;
  entity_metadata: EntityMetadataExternalResponse;
};

export type FileComponentForMessageRequest = {
  type: 13;
  id?: number | null;
  spoiler?: boolean | null;
  file: UnfurledMediaRequestWithAttachmentReferenceRequired;
};

export type FileComponentResponse = {
  type: 13;
  id: number;
  file: UnfurledMediaResponse;
  name: string | null;
  size: number | null;
  spoiler: boolean;
};

export type FileUploadComponentForModalRequest = {
  type: 19;
  id?: number | null;
  custom_id: string;
  min_values?: number | null;
  max_values?: number | null;
  required?: boolean | null;
};

export type FlagToChannelAction = {
  type: 2;
  metadata: FlagToChannelActionMetadata;
};

export type FlagToChannelActionMetadata = {
  channel_id: SnowflakeType;
};

export type FlagToChannelActionMetadataResponse = {
  channel_id: SnowflakeType;
};

export type FlagToChannelActionResponse = {
  type: 2;
  metadata: FlagToChannelActionMetadataResponse;
};

export type ForumLayout = unknown | unknown | unknown;

export type ForumTagResponse = {
  id: SnowflakeType;
  name: string;
  moderated: boolean;
  emoji_id: null | SnowflakeType;
  emoji_name: string | null;
};

export type FriendInviteResponse = {
  type: 2;
  code: string;
  inviter?: UserResponse;
  max_age?: number;
  created_at?: string;
  expires_at: string | null;
  friends_count?: number;
  channel: null | InviteChannelResponse;
  is_contact?: boolean;
  uses?: number;
  max_uses?: number;
  flags?: number;
};

export type GatewayBotResponse = {
  url: string;
  session_start_limit: GatewayBotSessionStartLimitResponse;
  shards: number;
};

export type GatewayBotSessionStartLimitResponse = {
  max_concurrency: number;
  remaining: number;
  reset_after: number;
  total: number;
};

export type GatewayResponse = {
  url: string;
};

export type GithubAuthor = {
  username?: string | null;
  name: string;
};

export type GithubCheckApp = {
  name: string;
};

export type GithubCheckPullRequest = {
  number: number;
};

export type GithubCheckRun = {
  conclusion?: string | null;
  name: string;
  html_url: string;
  check_suite: GithubCheckSuite;
  details_url?: string | null;
  output?: null | GithubCheckRunOutput;
  pull_requests?: unknown[] | null;
};

export type GithubCheckRunOutput = {
  title?: string | null;
  summary?: string | null;
};

export type GithubCheckSuite = {
  conclusion?: string | null;
  head_branch?: string | null;
  head_sha: string;
  pull_requests?: unknown[] | null;
  app: GithubCheckApp;
};

export type GithubComment = {
  id: number;
  html_url: string;
  user: GithubUser;
  commit_id?: string | null;
  body: string;
};

export type GithubCommit = {
  id: string;
  url: string;
  message: string;
  author: GithubAuthor;
};

export type GithubDiscussion = {
  title: string;
  number: number;
  html_url: string;
  answer_html_url?: string | null;
  body?: string | null;
  user: GithubUser;
};

export type GithubIssue = {
  id: number;
  number: number;
  html_url: string;
  user: GithubUser;
  title: string;
  body?: string | null;
  pull_request?: unknown;
};

export type GithubRelease = {
  id: number;
  tag_name: string;
  html_url: string;
  author: GithubUser;
};

export type GithubRepository = {
  id: number;
  html_url: string;
  name: string;
  full_name: string;
};

export type GithubReview = {
  user: GithubUser;
  body?: string | null;
  html_url: string;
  state: string;
};

export type GithubUser = {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
};

export type GithubWebhook = {
  action?: string | null;
  ref?: string | null;
  ref_type?: string | null;
  comment?: null | GithubComment;
  issue?: null | GithubIssue;
  pull_request?: null | GithubIssue;
  repository?: null | GithubRepository;
  forkee?: null | GithubRepository;
  sender: GithubUser;
  member?: null | GithubUser;
  release?: null | GithubRelease;
  head_commit?: null | GithubCommit;
  commits?: unknown[] | null;
  forced?: boolean | null;
  compare?: string | null;
  review?: null | GithubReview;
  check_run?: null | GithubCheckRun;
  check_suite?: null | GithubCheckSuite;
  discussion?: null | GithubDiscussion;
  answer?: null | GithubComment;
};

export type GroupDmInviteResponse = {
  type: 1;
  code: string;
  inviter?: UserResponse;
  max_age?: number;
  created_at?: string;
  expires_at: string | null;
  channel: InviteChannelResponse;
  approximate_member_count?: number | null;
};

export type GuildAuditLogResponse = {
  audit_log_entries: (AuditLogEntryResponse)[];
  users: (UserResponse)[];
  integrations: (PartialDiscordIntegrationResponse | PartialExternalConnectionIntegrationResponse | PartialGuildSubscriptionIntegrationResponse)[];
  webhooks: (ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse)[];
  guild_scheduled_events: (ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse)[];
  threads: (ThreadResponse)[];
  application_commands: (ApplicationCommandResponse)[];
  auto_moderation_rules: (DefaultKeywordRuleResponse | KeywordRuleResponse | MlSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse | null)[];
};

export type GuildBanResponse = {
  user: UserResponse;
  reason: string | null;
};

export type GuildChannelLocation = {
  id: string;
  kind: "gc";
  channel_id: SnowflakeType;
  guild_id: SnowflakeType;
};

export type GuildChannelResponse = {
  id: SnowflakeType;
  type: 0 | 2 | 4 | 5 | 13 | 14 | 15;
  last_message_id?: null | SnowflakeType;
  flags: number;
  last_pin_timestamp?: string | null;
  guild_id: SnowflakeType;
  name: string;
  parent_id?: null | SnowflakeType;
  rate_limit_per_user?: number;
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string | null;
  video_quality_mode?: VideoQualityModes;
  permissions?: string;
  topic?: string | null;
  default_auto_archive_duration?: ThreadAutoArchiveDuration;
  default_thread_rate_limit_per_user?: number;
  position: number;
  permission_overwrites?: (ChannelPermissionOverwriteResponse)[];
  nsfw?: boolean;
  available_tags?: (ForumTagResponse)[];
  default_reaction_emoji?: null | DefaultReactionEmojiResponse;
  default_sort_order?: null | ThreadSortOrder;
  default_forum_layout?: ForumLayout;
  default_tag_setting?: null | ThreadSearchTagSetting;
  hd_streaming_until?: string;
  hd_streaming_buyer_id?: SnowflakeType;
};

export type GuildExplicitContentFilterTypes = unknown | unknown | unknown;

export type GuildFeatures = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type GuildHomeSettingsResponse = {
  guild_id: SnowflakeType;
  enabled: boolean;
  welcome_message?: WelcomeMessageResponse;
  new_member_actions: (NewMemberActionResponse)[];
  resource_channels: (ResourceChannelResponse)[];
};

export type GuildIncidentsDataResponse = {
  invites_disabled_until: string | null;
  dms_disabled_until: string | null;
};

export type GuildIncomingWebhookResponse = {
  application_id: null | SnowflakeType;
  avatar: string | null;
  channel_id: null | SnowflakeType;
  guild_id?: null | SnowflakeType;
  id: SnowflakeType;
  name: string;
  type: 1;
  user?: UserResponse;
  token?: string;
  url?: string;
};

export type GuildInviteResponse = {
  type: 0;
  code: string;
  inviter?: UserResponse;
  max_age?: number;
  created_at?: string;
  expires_at: string | null;
  is_contact?: boolean;
  flags?: number;
  guild: InviteGuildResponse;
  guild_id: SnowflakeType;
  channel: InviteChannelResponse;
  target_type?: InviteTargetTypes;
  target_user?: UserResponse;
  target_application?: InviteApplicationResponse;
  guild_scheduled_event?: ScheduledEventResponse;
  uses?: number;
  max_uses?: number;
  temporary?: boolean;
  approximate_member_count?: number | null;
  approximate_presence_count?: number | null;
  is_nickname_changeable?: boolean;
  roles?: unknown[] | null;
};

export type GuildJoinRequestApplicationStatus = unknown | unknown | unknown | unknown;

export type GuildJoinRequestResponse = {
  id: SnowflakeType;
  created_at: string;
  reviewed_at: string | null;
  application_status: null | GuildJoinRequestApplicationStatus;
  /** Reason request was rejected. Only set when application_status is REJECTED */
  rejection_reason: string | null;
  guild_id: SnowflakeType;
  user_id: SnowflakeType;
  user?: null | UserResponse;
  /** Applicant's responses on join request form */
  form_responses?: unknown[] | null;
  actioned_by_user?: null | UserResponse;
};

export type GuildJoinRequestsListResponse = {
  total?: number;
  guild_join_requests?: (GuildJoinRequestResponse)[];
};

export type GuildMfaLevel = unknown | unknown;

export type GuildMemberResponse = {
  avatar: string | null;
  avatar_decoration_data?: null | UserAvatarDecorationResponse;
  banner: string | null;
  communication_disabled_until: string | null;
  flags: number;
  joined_at: string;
  nick: string | null;
  pending: boolean;
  premium_since: string | null;
  roles: (SnowflakeType)[];
  collectibles?: null | UserCollectiblesResponse;
  user: UserResponse;
  mute: boolean;
  deaf: boolean;
};

export type GuildMemberVerificationFormFieldType = unknown | unknown | unknown | unknown;

export type GuildNsfwContentLevel = unknown | unknown | unknown | unknown;

export type GuildOnboardingMode = unknown | unknown;

export type GuildOnboardingResponse = {
  guild_id: SnowflakeType;
  prompts: (OnboardingPromptResponse)[];
  default_channel_ids: (SnowflakeType)[];
  enabled: boolean;
  mode: GuildOnboardingMode;
};

export type GuildPatchRequestPartial = {
  name?: string;
  description?: string | null;
  region?: string | null;
  icon?: string | null;
  verification_level?: null | VerificationLevels;
  default_message_notifications?: null | UserNotificationSettings;
  explicit_content_filter?: null | GuildExplicitContentFilterTypes;
  preferred_locale?: null | AvailableLocalesEnum;
  afk_timeout?: null | AfkTimeouts;
  afk_channel_id?: null | SnowflakeType;
  system_channel_id?: null | SnowflakeType;
  splash?: string | null;
  banner?: string | null;
  system_channel_flags?: number | null;
  features?: unknown[] | null;
  discovery_splash?: string | null;
  home_header?: string | null;
  rules_channel_id?: null | SnowflakeType;
  safety_alerts_channel_id?: null | SnowflakeType;
  public_updates_channel_id?: null | SnowflakeType;
  premium_progress_bar_enabled?: boolean | null;
};

export type GuildPreviewResponse = {
  id: SnowflakeType;
  name: string;
  icon: string | null;
  description: string | null;
  home_header: string | null;
  splash: string | null;
  discovery_splash: string | null;
  features: (GuildFeatures)[];
  approximate_member_count: number;
  approximate_presence_count: number;
  emojis: (EmojiResponse)[];
  stickers: (GuildStickerResponse)[];
};

export type GuildProductPurchaseResponse = {
  listing_id: SnowflakeType;
  product_name: string;
};

export type GuildPruneResponse = {
  pruned: number | null;
};

export type GuildResponse = {
  id: SnowflakeType;
  name: string;
  icon: string | null;
  description: string | null;
  home_header: string | null;
  splash: string | null;
  discovery_splash: string | null;
  features: (GuildFeatures)[];
  banner: string | null;
  owner_id: SnowflakeType;
  application_id: null | SnowflakeType;
  region: string;
  afk_channel_id: null | SnowflakeType;
  afk_timeout: AfkTimeouts;
  system_channel_id: null | SnowflakeType;
  system_channel_flags: number;
  widget_enabled: boolean;
  widget_channel_id: null | SnowflakeType;
  verification_level: VerificationLevels;
  roles: (GuildRoleResponse)[];
  default_message_notifications: UserNotificationSettings;
  mfa_level: GuildMfaLevel;
  explicit_content_filter: GuildExplicitContentFilterTypes;
  max_presences: number | null;
  max_members: number;
  max_stage_video_channel_users: number;
  max_video_channel_users: number;
  vanity_url_code: string | null;
  premium_tier: PremiumGuildTiers;
  premium_subscription_count: number;
  preferred_locale: AvailableLocalesEnum;
  rules_channel_id: null | SnowflakeType;
  safety_alerts_channel_id: null | SnowflakeType;
  public_updates_channel_id: null | SnowflakeType;
  premium_progress_bar_enabled: boolean;
  premium_progress_bar_enabled_user_updated_at?: string | null;
  nsfw: boolean;
  nsfw_level: GuildNsfwContentLevel;
  emojis: (EmojiResponse)[];
  stickers: (GuildStickerResponse)[];
  incidents_data: null | GuildIncidentsDataResponse;
};

export type GuildRoleColorsResponse = {
  primary_color: number;
  secondary_color: number | null;
  tertiary_color: number | null;
};

export type GuildRoleResponse = {
  id: SnowflakeType;
  name: string;
  description: string | null;
  permissions: string;
  position: number;
  color: number;
  colors: GuildRoleColorsResponse;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
  icon: string | null;
  unicode_emoji: string | null;
  tags?: GuildRoleTagsResponse;
  flags: number;
};

export type GuildRoleTagsResponse = {
  premium_subscriber?: null;
  bot_id?: SnowflakeType;
  integration_id?: SnowflakeType;
  subscription_listing_id?: SnowflakeType;
  available_for_purchase?: null;
  guild_connections?: null;
};

export type GuildScheduledEventEntityTypes = unknown | unknown | unknown | unknown;

export type GuildScheduledEventPrivacyLevels = unknown;

export type GuildScheduledEventStatuses = unknown | unknown | unknown | unknown;

export type GuildSearchResponse = {
  messages: ((SearchMessageResponse)[])[];
  doing_deep_historical_index: boolean;
  total_results: number;
  threads?: unknown[] | null;
  members?: unknown[] | null;
  documents_indexed?: number | null;
};

export type GuildStickerResponse = {
  id: SnowflakeType;
  name: string;
  tags: string;
  type: 2;
  format_type: null | StickerFormatTypes;
  description: string | null;
  available: boolean;
  guild_id: SnowflakeType;
  user?: UserResponse;
};

export type GuildSubscriptionIntegrationResponse = {
  type: "guild_subscription";
  name: string | null;
  account: AccountResponse;
  enabled: boolean;
  id: SnowflakeType;
};

export type GuildTemplateChannelResponse = {
  id: number | null;
  type: 0 | 2 | 4 | 15;
  name: string | null;
  position: number | null;
  topic: string | null;
  bitrate: number;
  user_limit: number;
  nsfw: boolean;
  rate_limit_per_user: number;
  parent_id: null | SnowflakeType;
  default_auto_archive_duration: null | ThreadAutoArchiveDuration;
  permission_overwrites: (ChannelPermissionOverwriteResponse)[];
  available_tags: unknown[] | null;
  template: string;
  default_reaction_emoji: null | DefaultReactionEmojiResponse;
  default_thread_rate_limit_per_user: number | null;
  default_sort_order: null | ThreadSortOrder;
  default_forum_layout: null | ForumLayout;
  default_tag_setting: null | ThreadSearchTagSetting;
  icon_emoji: null | IconEmojiResponse;
  theme_color: number | null;
};

export type GuildTemplateChannelTags = {
  id: number | null;
  name: string;
  emoji_id: null | SnowflakeType;
  emoji_name: string | null;
  moderated: boolean | null;
};

export type GuildTemplateResponse = {
  code: string;
  name: string;
  description: string | null;
  usage_count: number;
  creator_id: SnowflakeType;
  creator: null | UserResponse;
  created_at: string;
  updated_at: string;
  source_guild_id: SnowflakeType;
  serialized_source_guild: GuildTemplateSnapshotResponse;
  is_dirty: boolean | null;
};

export type GuildTemplateRoleColorsResponse = {
  primary_color: number;
  secondary_color: number | null;
  tertiary_color: number | null;
};

export type GuildTemplateRoleResponse = {
  id: number;
  name: string;
  permissions: string;
  color: number;
  colors: null | GuildTemplateRoleColorsResponse;
  hoist: boolean;
  mentionable: boolean;
  icon: string | null;
  unicode_emoji: string | null;
};

export type GuildTemplateSnapshotResponse = {
  name: string;
  description: string | null;
  region: string | null;
  verification_level: VerificationLevels;
  default_message_notifications: UserNotificationSettings;
  explicit_content_filter: GuildExplicitContentFilterTypes;
  preferred_locale: AvailableLocalesEnum;
  afk_channel_id: null | SnowflakeType;
  afk_timeout: AfkTimeouts;
  system_channel_id: null | SnowflakeType;
  system_channel_flags: number;
  roles: (GuildTemplateRoleResponse)[];
  channels: (GuildTemplateChannelResponse)[];
};

export type GuildWelcomeChannel = {
  channel_id: SnowflakeType;
  description: string;
  emoji_id?: null | SnowflakeType;
  emoji_name?: string | null;
};

export type GuildWelcomeScreenChannelResponse = {
  channel_id: SnowflakeType;
  description: string;
  emoji_id: null | SnowflakeType;
  emoji_name: string | null;
};

export type GuildWelcomeScreenResponse = {
  description: string | null;
  welcome_channels: (GuildWelcomeScreenChannelResponse)[];
};

export type GuildWithCountsResponse = {
  id: SnowflakeType;
  name: string;
  icon: string | null;
  description: string | null;
  home_header: string | null;
  splash: string | null;
  discovery_splash: string | null;
  features: (GuildFeatures)[];
  banner: string | null;
  owner_id: SnowflakeType;
  application_id: null | SnowflakeType;
  region: string;
  afk_channel_id: null | SnowflakeType;
  afk_timeout: AfkTimeouts;
  system_channel_id: null | SnowflakeType;
  system_channel_flags: number;
  widget_enabled: boolean;
  widget_channel_id: null | SnowflakeType;
  verification_level: VerificationLevels;
  roles: (GuildRoleResponse)[];
  default_message_notifications: UserNotificationSettings;
  mfa_level: GuildMfaLevel;
  explicit_content_filter: GuildExplicitContentFilterTypes;
  max_presences: number | null;
  max_members: number;
  max_stage_video_channel_users: number;
  max_video_channel_users: number;
  vanity_url_code: string | null;
  premium_tier: PremiumGuildTiers;
  premium_subscription_count: number;
  preferred_locale: AvailableLocalesEnum;
  rules_channel_id: null | SnowflakeType;
  safety_alerts_channel_id: null | SnowflakeType;
  public_updates_channel_id: null | SnowflakeType;
  premium_progress_bar_enabled: boolean;
  premium_progress_bar_enabled_user_updated_at?: string | null;
  nsfw: boolean;
  nsfw_level: GuildNsfwContentLevel;
  emojis: (EmojiResponse)[];
  stickers: (GuildStickerResponse)[];
  incidents_data: null | GuildIncidentsDataResponse;
  approximate_member_count?: number | null;
  approximate_presence_count?: number | null;
};

export type HasOption = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type IconEmojiResponse = { [key: string]: unknown };

export type IncomingWebhookInteractionRequest = {
  content?: string | null;
  embeds?: unknown[] | null;
  allowed_mentions?: null | MessageAllowedMentionsRequest;
  components?: unknown[] | null;
  attachments?: unknown[] | null;
  poll?: null | PollCreateRequest;
  tts?: boolean | null;
  flags?: number | null;
};

export type IncomingWebhookRequestPartial = {
  content?: string | null;
  embeds?: unknown[] | null;
  allowed_mentions?: null | MessageAllowedMentionsRequest;
  components?: unknown[] | null;
  attachments?: unknown[] | null;
  poll?: null | PollCreateRequest;
  tts?: boolean | null;
  flags?: number | null;
  username?: string | null;
  avatar_url?: string | null;
  thread_name?: string | null;
  applied_tags?: unknown[] | null;
};

export type IncomingWebhookUpdateForInteractionCallbackRequestPartial = {
  content?: string | null;
  embeds?: unknown[] | null;
  allowed_mentions?: null | MessageAllowedMentionsRequest;
  components?: unknown[] | null;
  attachments?: unknown[] | null;
  flags?: number | null;
};

export type IncomingWebhookUpdateRequestPartial = {
  content?: string | null;
  embeds?: unknown[] | null;
  allowed_mentions?: null | MessageAllowedMentionsRequest;
  components?: unknown[] | null;
  attachments?: unknown[] | null;
  poll?: null | PollCreateRequest;
  flags?: number | null;
};

export type Int53Type = number;

export type IntegrationApplicationResponse = {
  id: SnowflakeType;
  name: string;
  icon: string | null;
  description: string;
  type: null | ApplicationTypes;
  cover_image?: string;
  primary_sku_id?: SnowflakeType;
  bot?: UserResponse;
};

export type IntegrationExpireBehaviorTypes = unknown | unknown;

export type IntegrationExpireGracePeriodTypes = unknown | unknown | unknown | unknown | unknown;

export type IntegrationTypes = unknown | unknown | unknown | unknown;

export type InteractionApplicationCommandAutocompleteCallbackIntegerData = {
  choices?: unknown[] | null;
};

export type InteractionApplicationCommandAutocompleteCallbackNumberData = {
  choices?: unknown[] | null;
};

export type InteractionApplicationCommandAutocompleteCallbackStringData = {
  choices?: unknown[] | null;
};

export type InteractionCallbackResponse = {
  interaction: InteractionResponse;
  resource?: CreateMessageInteractionCallbackResponse | LaunchActivityInteractionCallbackResponse | UpdateMessageInteractionCallbackResponse;
};

export type InteractionCallbackTypes = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type InteractionContextType = unknown | unknown | unknown;

export type InteractionResponse = {
  id: SnowflakeType;
  type: InteractionTypes;
  response_message_id?: SnowflakeType;
  response_message_loading?: boolean;
  response_message_ephemeral?: boolean;
  channel_id?: SnowflakeType;
  guild_id?: SnowflakeType;
};

export type InteractionTypes = unknown | unknown | unknown | unknown | unknown | unknown;

export type InviteApplicationResponse = {
  id: SnowflakeType;
  name: string;
  icon: string | null;
  description: string;
  type: null | ApplicationTypes;
  cover_image?: string;
  primary_sku_id?: SnowflakeType;
  bot?: UserResponse;
  slug?: string;
  guild_id?: SnowflakeType;
  rpc_origins?: (string)[];
  bot_public?: boolean;
  bot_require_code_grant?: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  custom_install_url?: string;
  install_params?: ApplicationOAuth2InstallParamsResponse;
  integration_types_config?: { [key: string]: ApplicationIntegrationTypeConfigurationResponse | undefined };
  verify_key: string;
  flags: number;
  flags_new: string;
  max_participants?: number | null;
  tags?: (string)[];
};

export type InviteChannelRecipientResponse = {
  username: string;
};

export type InviteChannelResponse = {
  id: SnowflakeType;
  type: ChannelTypes;
  name: string | null;
  icon?: string;
  recipients?: (InviteChannelRecipientResponse)[];
};

export type InviteGuildResponse = {
  id: SnowflakeType;
  name: string;
  splash: string | null;
  banner: string | null;
  description: string | null;
  icon: string | null;
  features: (GuildFeatures)[];
  verification_level: null | VerificationLevels;
  vanity_url_code: string | null;
  nsfw_level: null | GuildNsfwContentLevel;
  nsfw: boolean | null;
  premium_subscription_count: number;
};

export type InviteGuildRoleResponse = {
  id: SnowflakeType;
  name: string;
  position: number;
  color: number;
  colors: GuildRoleColorsResponse;
  icon: string | null;
  unicode_emoji: string | null;
  permissions?: string;
};

export type InviteTargetTypes = unknown | unknown | unknown;

export type InviteTypes = unknown | unknown | unknown;

export type KeywordRuleResponse = {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  creator_id: SnowflakeType;
  name: string;
  event_type: AutomodEventType;
  actions: (BlockMessageActionResponse | FlagToChannelActionResponse | QuarantineUserActionResponse | UserCommunicationDisabledActionResponse)[];
  trigger_type: 1;
  enabled: boolean;
  exempt_roles: (SnowflakeType)[];
  exempt_channels: (SnowflakeType)[];
  trigger_metadata: KeywordTriggerMetadataResponse;
};

export type KeywordTriggerMetadata = {
  keyword_filter?: unknown[] | null;
  regex_patterns?: unknown[] | null;
  allow_list?: unknown[] | null;
};

export type KeywordTriggerMetadataResponse = {
  keyword_filter: (string)[];
  regex_patterns: (string)[];
  allow_list: (string)[];
};

export type KeywordUpsertRequest = {
  name: string;
  event_type: AutomodEventType;
  actions?: unknown[] | null;
  enabled?: boolean | null;
  exempt_roles?: unknown[] | null;
  exempt_channels?: unknown[] | null;
  trigger_type: 1;
  trigger_metadata?: null | KeywordTriggerMetadata;
};

export type KeywordUpsertRequestPartial = {
  name?: string;
  event_type?: AutomodEventType;
  actions?: unknown[] | null;
  enabled?: boolean | null;
  exempt_roles?: unknown[] | null;
  exempt_channels?: unknown[] | null;
  trigger_type?: 1;
  trigger_metadata?: null | KeywordTriggerMetadata;
};

export type LabelComponentForModalRequest = {
  type: 18;
  id?: number | null;
  label: string;
  description?: string | null;
  component: ChannelSelectComponentForModalRequest | CheckboxComponentForModalRequest | CheckboxGroupComponentForModalRequest | FileUploadComponentForModalRequest | MentionableSelectComponentForModalRequest | RadioGroupComponentForModalRequest | RoleSelectComponentForModalRequest | StringSelectComponentForModalRequest | TextInputComponentForModalRequest | UserSelectComponentForModalRequest;
};

export type LaunchActivityInteractionCallbackRequest = {
  type: 12;
};

export type LaunchActivityInteractionCallbackResponse = {
  type: 12;
};

export type ListApplicationEmojisResponse = {
  items: (EmojiResponse)[];
};

export type ListGuildSoundboardSoundsResponse = {
  items: (SoundboardSoundResponse)[];
};

export type LobbyGuildInviteResponse = {
  code: string;
};

export type LobbyMemberRequest = {
  id: SnowflakeType;
  metadata?: { [key: string]: unknown } | null;
  flags?: null | 1;
};

export type LobbyMemberResponse = {
  id: SnowflakeType;
  metadata: { [key: string]: unknown } | null;
  flags: number;
};

export type LobbyMessageResponse = {
  id: SnowflakeType;
  type: MessageType;
  content: string;
  lobby_id: SnowflakeType;
  channel_id: SnowflakeType;
  author: UserResponse;
  metadata?: { [key: string]: string | undefined };
  moderation_metadata?: { [key: string]: string | undefined };
  flags: number;
  application_id?: SnowflakeType;
};

export type LobbyResponse = {
  id: SnowflakeType;
  application_id: SnowflakeType;
  metadata: { [key: string]: unknown } | null;
  members: (LobbyMemberResponse)[];
  linked_channel?: GuildChannelResponse;
  flags: UInt32Type;
  override_event_webhooks_url?: string | null;
};

export type MlSpamRuleResponse = {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  creator_id: SnowflakeType;
  name: string;
  event_type: AutomodEventType;
  actions: (BlockMessageActionResponse | FlagToChannelActionResponse | QuarantineUserActionResponse | UserCommunicationDisabledActionResponse)[];
  trigger_type: 3;
  enabled: boolean;
  exempt_roles: (SnowflakeType)[];
  exempt_channels: (SnowflakeType)[];
  trigger_metadata: MlSpamTriggerMetadataResponse;
};

export type MlSpamTriggerMetadata = { [key: string]: unknown };

export type MlSpamTriggerMetadataResponse = { [key: string]: unknown };

export type MlSpamUpsertRequest = {
  name: string;
  event_type: AutomodEventType;
  actions?: unknown[] | null;
  enabled?: boolean | null;
  exempt_roles?: unknown[] | null;
  exempt_channels?: unknown[] | null;
  trigger_type: 3;
  trigger_metadata?: null | MlSpamTriggerMetadata;
};

export type MlSpamUpsertRequestPartial = {
  name?: string;
  event_type?: AutomodEventType;
  actions?: unknown[] | null;
  enabled?: boolean | null;
  exempt_roles?: unknown[] | null;
  exempt_channels?: unknown[] | null;
  trigger_type?: 3;
  trigger_metadata?: null | MlSpamTriggerMetadata;
};

export type MediaGalleryComponentForMessageRequest = {
  type: 12;
  id?: number | null;
  items: (MediaGalleryItemRequest)[];
};

export type MediaGalleryComponentResponse = {
  type: 12;
  id: number;
  items: (MediaGalleryItemResponse)[];
};

export type MediaGalleryItemRequest = {
  description?: string | null;
  spoiler?: boolean | null;
  media: UnfurledMediaRequest;
};

export type MediaGalleryItemResponse = {
  media: UnfurledMediaResponse;
  description: string | null;
  spoiler: boolean;
};

export type MentionSpamRuleResponse = {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  creator_id: SnowflakeType;
  name: string;
  event_type: AutomodEventType;
  actions: (BlockMessageActionResponse | FlagToChannelActionResponse | QuarantineUserActionResponse | UserCommunicationDisabledActionResponse)[];
  trigger_type: 5;
  enabled: boolean;
  exempt_roles: (SnowflakeType)[];
  exempt_channels: (SnowflakeType)[];
  trigger_metadata: MentionSpamTriggerMetadataResponse;
};

export type MentionSpamTriggerMetadata = {
  mention_total_limit?: number | null;
  mention_raid_protection_enabled?: boolean | null;
};

export type MentionSpamTriggerMetadataResponse = {
  mention_total_limit: number;
  mention_raid_protection_enabled: boolean;
};

export type MentionSpamUpsertRequest = {
  name: string;
  event_type: AutomodEventType;
  actions?: unknown[] | null;
  enabled?: boolean | null;
  exempt_roles?: unknown[] | null;
  exempt_channels?: unknown[] | null;
  trigger_type: 5;
  trigger_metadata?: null | MentionSpamTriggerMetadata;
};

export type MentionSpamUpsertRequestPartial = {
  name?: string;
  event_type?: AutomodEventType;
  actions?: unknown[] | null;
  enabled?: boolean | null;
  exempt_roles?: unknown[] | null;
  exempt_channels?: unknown[] | null;
  trigger_type?: 5;
  trigger_metadata?: null | MentionSpamTriggerMetadata;
};

export type MentionableSelectComponentForMessageRequest = {
  type: 7;
  id?: number | null;
  custom_id: string;
  placeholder?: string | null;
  min_values?: number | null;
  max_values?: number | null;
  disabled?: boolean | null;
  required?: boolean | null;
  default_values?: unknown[] | null;
};

export type MentionableSelectComponentForModalRequest = {
  type: 7;
  id?: number | null;
  custom_id: string;
  placeholder?: string | null;
  min_values?: number | null;
  max_values?: number | null;
  disabled?: boolean | null;
  required?: boolean | null;
  default_values?: unknown[] | null;
};

export type MentionableSelectComponentResponse = {
  type: 7;
  id: number;
  custom_id: string;
  placeholder?: string;
  min_values: number;
  max_values: number;
  disabled?: boolean;
  default_values?: (RoleSelectDefaultValueResponse | UserSelectDefaultValueResponse)[];
};

export type MessageActivityResponse = {
  type: ActivityActionTypes;
  party_id?: string;
};

export type MessageAllowedMentionsRequest = {
  parse?: unknown[] | null;
  users?: unknown[] | null;
  roles?: unknown[] | null;
  replied_user?: boolean | null;
};

export type MessageAttachmentRequest = {
  id: SnowflakeType;
  filename?: string | null;
  description?: string | null;
  duration_secs?: number | null;
  waveform?: string | null;
  title?: string | null;
  is_remix?: boolean | null;
};

export type MessageAttachmentResponse = {
  id: SnowflakeType;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  width?: number;
  height?: number;
  duration_secs?: number;
  waveform?: string;
  description?: string;
  content_type?: string;
  ephemeral?: boolean;
  flags?: number;
  placeholder?: string;
  placeholder_version?: number;
  title?: string | null;
  application?: ApplicationResponse;
  clip_created_at?: string;
  clip_participants?: (UserResponse)[];
};

export type MessageCallResponse = {
  ended_timestamp?: string | null;
  participants: (SnowflakeType)[];
};

export type MessageComponentInteractionMetadataResponse = {
  id: SnowflakeType;
  type: 3;
  user?: UserResponse;
  authorizing_integration_owners: { [key: string]: SnowflakeType | undefined };
  original_response_message_id?: SnowflakeType;
  interacted_message_id: SnowflakeType;
};

export type MessageComponentSeparatorSpacingSize = unknown | unknown;

export type MessageComponentTypes = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type MessageCreateRequest = {
  content?: string | null;
  embeds?: unknown[] | null;
  allowed_mentions?: null | MessageAllowedMentionsRequest;
  sticker_ids?: unknown[] | null;
  components?: unknown[] | null;
  flags?: number | null;
  attachments?: unknown[] | null;
  poll?: null | PollCreateRequest;
  shared_client_theme?: null | CustomClientThemeShareRequest;
  message_reference?: null | MessageReferenceRequest;
  nonce?: number | string | null;
  enforce_nonce?: boolean | null;
  tts?: boolean | null;
};

export type MessageEditRequestPartial = {
  content?: string | null;
  embeds?: unknown[] | null;
  flags?: number | null;
  allowed_mentions?: null | MessageAllowedMentionsRequest;
  sticker_ids?: unknown[] | null;
  components?: unknown[] | null;
  attachments?: unknown[] | null;
};

export type MessageEmbedAuthorResponse = {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
};

export type MessageEmbedFieldResponse = {
  name: string;
  value: string;
  inline: boolean;
};

export type MessageEmbedFooterResponse = {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
};

export type MessageEmbedImageResponse = {
  url?: string;
  proxy_url?: string;
  width?: UInt32Type;
  height?: UInt32Type;
  content_type?: string;
  placeholder?: string;
  placeholder_version?: UInt32Type;
  description?: string;
  flags?: UInt32Type;
};

export type MessageEmbedProviderResponse = {
  name: string;
  url?: string;
};

export type MessageEmbedResponse = {
  type: string;
  url?: string;
  title?: string;
  description?: string;
  color?: number;
  timestamp?: string;
  fields?: (MessageEmbedFieldResponse)[];
  author?: MessageEmbedAuthorResponse;
  provider?: MessageEmbedProviderResponse;
  image?: MessageEmbedImageResponse;
  thumbnail?: MessageEmbedImageResponse;
  video?: MessageEmbedVideoResponse;
  footer?: MessageEmbedFooterResponse;
  flags?: number | null;
  components?: (ContainerComponentResponse)[];
};

export type MessageEmbedVideoResponse = {
  url?: string;
  proxy_url?: string;
  width?: UInt32Type;
  height?: UInt32Type;
  content_type?: string;
  placeholder?: string;
  placeholder_version?: UInt32Type;
  description?: string;
  flags?: UInt32Type;
};

export type MessageInteractionResponse = {
  id: SnowflakeType;
  type: InteractionTypes;
  name: string;
  user?: UserResponse;
  name_localized?: string;
};

export type MessageMentionChannelResponse = {
  id: SnowflakeType;
  name: string;
  type: ChannelTypes;
  guild_id: SnowflakeType;
};

export type MessageReactionCountDetailsResponse = {
  burst: number;
  normal: number;
};

export type MessageReactionEmojiResponse = {
  id: null | SnowflakeType;
  name: string | null;
  animated?: boolean;
};

export type MessageReactionResponse = {
  emoji: MessageReactionEmojiResponse;
  count: number;
  count_details: MessageReactionCountDetailsResponse;
  burst_colors: (string)[];
  me_burst: boolean;
  me: boolean;
};

export type MessageReferenceRequest = {
  guild_id?: null | SnowflakeType;
  channel_id?: null | SnowflakeType;
  message_id: SnowflakeType;
  fail_if_not_exists?: boolean | null;
  type?: null | MessageReferenceType;
};

export type MessageReferenceResponse = {
  type: MessageReferenceType;
  channel_id: SnowflakeType;
  message_id?: SnowflakeType;
  guild_id?: SnowflakeType;
};

export type MessageReferenceType = unknown;

export type MessageResponse = {
  type: MessageType;
  content: string;
  mentions: (UserResponse)[];
  mention_roles: (SnowflakeType)[];
  attachments: (MessageAttachmentResponse)[];
  embeds: (MessageEmbedResponse)[];
  timestamp: string;
  edited_timestamp: string | null;
  flags: number;
  components: (ActionRowComponentResponse | ContainerComponentResponse | FileComponentResponse | MediaGalleryComponentResponse | SectionComponentResponse | SeparatorComponentResponse | TextDisplayComponentResponse)[];
  stickers?: (GuildStickerResponse | StandardStickerResponse)[];
  sticker_items?: (MessageStickerItemResponse)[];
  id: SnowflakeType;
  channel_id: SnowflakeType;
  author: UserResponse;
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  call?: MessageCallResponse;
  activity?: MessageActivityResponse;
  application?: BasicApplicationResponse;
  application_id?: SnowflakeType;
  interaction?: MessageInteractionResponse;
  nonce?: number | string;
  webhook_id?: SnowflakeType;
  message_reference?: MessageReferenceResponse;
  thread?: ThreadResponse;
  mention_channels?: (MessageMentionChannelResponse)[];
  role_subscription_data?: MessageRoleSubscriptionDataResponse;
  purchase_notification?: PurchaseNotificationResponse;
  position?: number;
  resolved?: ResolvedObjectsResponse;
  poll?: PollResponse;
  shared_client_theme?: CustomClientThemeResponse;
  interaction_metadata?: ApplicationCommandInteractionMetadataResponse | MessageComponentInteractionMetadataResponse | ModalSubmitInteractionMetadataResponse;
  message_snapshots?: (MessageSnapshotResponse)[];
  reactions?: (MessageReactionResponse)[];
  referenced_message?: null | BasicMessageResponse;
};

export type MessageRoleSubscriptionDataResponse = {
  role_subscription_listing_id: SnowflakeType;
  tier_name: string;
  total_months_subscribed: number;
  is_renewal: boolean;
};

export type MessageShareCustomUserThemeBaseTheme = unknown | unknown | unknown | unknown | unknown;

export type MessageSnapshotResponse = {
  message: MinimalContentMessageResponse;
};

export type MessageStickerItemResponse = {
  id: SnowflakeType;
  name: string;
  format_type: StickerFormatTypes;
};

export type MessageType = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type MetadataItemTypes = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type MinimalContentMessageResponse = {
  type: MessageType;
  content: string;
  mentions: (UserResponse)[];
  mention_roles: (SnowflakeType)[];
  attachments: (MessageAttachmentResponse)[];
  embeds: (MessageEmbedResponse)[];
  timestamp: string;
  edited_timestamp: string | null;
  flags: number;
  components: (ActionRowComponentResponse | ContainerComponentResponse | FileComponentResponse | MediaGalleryComponentResponse | SectionComponentResponse | SeparatorComponentResponse | TextDisplayComponentResponse)[];
  stickers?: (GuildStickerResponse | StandardStickerResponse)[];
  sticker_items?: (MessageStickerItemResponse)[];
};

export type ModalInteractionCallbackRequest = {
  type: 9;
  data: ModalInteractionCallbackRequestData;
};

export type ModalInteractionCallbackRequestData = {
  custom_id: string;
  title: string;
  components: (ActionRowComponentForModalRequest | LabelComponentForModalRequest | TextDisplayComponentForModalRequest)[];
};

export type ModalSubmitInteractionMetadataResponse = {
  id: SnowflakeType;
  type: 5;
  user?: UserResponse;
  authorizing_integration_owners: { [key: string]: SnowflakeType | undefined };
  original_response_message_id?: SnowflakeType;
  triggering_interaction_metadata: ApplicationCommandInteractionMetadataResponse | MessageComponentInteractionMetadataResponse;
};

export type MultipleChoiceFormFieldResponse = {
  /** Type of form field */
  field_type: "MULTIPLE_CHOICE";
  /** Label shown above field */
  label?: string;
  /** Optional helper text shown below label */
  description?: string;
  /** Whether applicant must fill in field */
  required?: boolean;
  /** Choices applicant can select from */
  choices: (string)[];
  /** Index of choice selected by applicant */
  response?: number;
};

export type MyGuildResponse = {
  id: SnowflakeType;
  name: string;
  icon: string | null;
  banner: string | null;
  owner: boolean;
  permissions: string;
  features: (GuildFeatures)[];
  approximate_member_count?: number | null;
  approximate_presence_count?: number | null;
};

export type NameplatePalette = string;

export type NewMemberActionResponse = {
  channel_id: SnowflakeType;
  action_type: NewMemberActionType;
  title: string;
  description: string;
  emoji?: SettingsEmojiResponse;
  icon?: string;
};

export type NewMemberActionType = unknown | unknown;

export type OAuth2GetAuthorizationResponse = {
  application: ApplicationResponse;
  expires: string;
  scopes: (OAuth2Scopes)[];
  user?: UserResponse;
};

export type OAuth2GetKeys = {
  keys: (OAuth2Key)[];
};

export type OAuth2GetOpenIdConnectUserInfoResponse = {
  sub: string;
  email?: string | null;
  email_verified?: boolean;
  preferred_username?: string;
  nickname?: string | null;
  picture?: string;
  locale?: string;
};

export type OAuth2Key = {
  kty: string;
  use: string;
  kid: string;
  n: string;
  e: string;
  alg: string;
};

export type OAuth2Scopes = unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown;

export type OnboardingPromptOptionRequest = {
  id?: null | SnowflakeType;
  title: string;
  description?: string | null;
  emoji_id?: null | SnowflakeType;
  emoji_name?: string | null;
  emoji_animated?: boolean | null;
  role_ids?: unknown[] | null;
  channel_ids?: unknown[] | null;
};

export type OnboardingPromptOptionResponse = {
  id: SnowflakeType;
  title: string;
  description: string;
  emoji: SettingsEmojiResponse;
  role_ids: (SnowflakeType)[];
  channel_ids: (SnowflakeType)[];
};

export type OnboardingPromptResponse = {
  id: SnowflakeType;
  title: string;
  options: (OnboardingPromptOptionResponse)[];
  single_select: boolean;
  required: boolean;
  in_onboarding: boolean;
  type: OnboardingPromptType;
};

export type OnboardingPromptType = unknown | unknown;

export type ParagraphFormFieldResponse = {
  /** Type of form field */
  field_type: "PARAGRAPH";
  /** Label shown above field */
  label?: string;
  /** Optional helper text shown below label */
  description?: string;
  /** Whether applicant must fill in field */
  required?: boolean;
  /** Placeholder text shown in empty input */
  placeholder?: string;
  /** Applicant's text response */
  response?: string;
};

export type PartialDiscordIntegrationResponse = {
  id: SnowflakeType;
  type: "discord";
  name: string | null;
  account: AccountResponse;
  application_id: SnowflakeType;
};

export type PartialExternalConnectionIntegrationResponse = {
  id: SnowflakeType;
  type: "twitch" | "youtube";
  name: string | null;
  account: AccountResponse;
};

export type PartialGuildSubscriptionIntegrationResponse = {
  id: SnowflakeType;
  type: "guild_subscription";
  name: string | null;
  account: AccountResponse;
};

export type PinnedMessageResponse = {
  pinned_at: string;
  message: MessageResponse;
};

export type PinnedMessagesResponse = {
  items: (PinnedMessageResponse)[];
  has_more: boolean;
};

export type PollAnswerCreateRequest = {
  poll_media: PollMediaCreateRequest;
};

export type PollAnswerDetailsResponse = {
  users: (UserResponse)[];
};

export type PollAnswerResponse = {
  answer_id: number;
  poll_media: PollMediaResponse;
};

export type PollCreateRequest = {
  question: PollMedia;
  answers: (PollAnswerCreateRequest)[];
  allow_multiselect?: boolean | null;
  layout_type?: null | PollLayoutTypes;
  duration?: number | null;
};

export type PollEmoji = {
  id?: null | SnowflakeType;
  name?: string | null;
  animated?: boolean | null;
};

export type PollEmojiCreateRequest = {
  id?: null | SnowflakeType;
  name?: string | null;
  animated?: boolean | null;
};

export type PollLayoutTypes = number;

export type PollMedia = {
  text?: string | null;
  emoji?: null | PollEmoji;
};

export type PollMediaCreateRequest = {
  text?: string | null;
  emoji?: null | PollEmojiCreateRequest;
};

export type PollMediaResponse = {
  text?: string;
  emoji?: MessageReactionEmojiResponse;
};

export type PollResponse = {
  question: PollMediaResponse;
  answers: (PollAnswerResponse)[];
  expiry: string;
  allow_multiselect: boolean;
  layout_type: PollLayoutTypes;
  results: PollResultsResponse;
};

export type PollResultsEntryResponse = {
  id: number;
  count: number;
  me_voted: boolean;
};

export type PollResultsResponse = {
  answer_counts: (PollResultsEntryResponse)[];
  is_finalized: boolean;
};

export type PongInteractionCallbackRequest = {
  type: 1;
};

export type PremiumGuildTiers = unknown | unknown | unknown | unknown;

export type PremiumTypes = unknown | unknown | unknown | unknown;

export type PrivateApplicationResponse = {
  id: SnowflakeType;
  name: string;
  icon: string | null;
  description: string;
  type: null | ApplicationTypes;
  cover_image?: string;
  primary_sku_id?: SnowflakeType;
  bot?: UserResponse;
  slug?: string;
  guild_id?: SnowflakeType;
  rpc_origins?: (string)[];
  bot_public?: boolean;
  bot_require_code_grant?: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  custom_install_url?: string;
  install_params?: ApplicationOAuth2InstallParamsResponse;
  integration_types_config?: { [key: string]: ApplicationIntegrationTypeConfigurationResponse | undefined };
  verify_key: string;
  flags: number;
  flags_new: string;
  max_participants?: number | null;
  tags?: (string)[];
  redirect_uris: (string)[];
  interactions_endpoint_url: string | null;
  role_connections_verification_url: string | null;
  owner: UserResponse;
  approximate_guild_count: number;
  approximate_user_install_count: number;
  approximate_user_authorization_count: number;
  event_webhooks_url?: string | null;
  event_webhooks_status?: ApplicationEventWebhooksStatus;
  event_webhooks_types?: ("APPLICATION_AUTHORIZED" | "APPLICATION_DEAUTHORIZED" | "ENTITLEMENT_CREATE" | "ENTITLEMENT_DELETE" | "ENTITLEMENT_UPDATE" | "GAME_DIRECT_MESSAGE_CREATE" | "GAME_DIRECT_MESSAGE_DELETE" | "GAME_DIRECT_MESSAGE_UPDATE" | "LOBBY_MESSAGE_CREATE" | "LOBBY_MESSAGE_DELETE" | "LOBBY_MESSAGE_UPDATE" | "QUEST_USER_ENROLLMENT")[];
  explicit_content_filter: ApplicationExplicitContentFilterTypes;
  team: null | TeamResponse;
};

export type PrivateChannelLocation = {
  id: string;
  kind: "pc";
  channel_id: SnowflakeType;
};

export type PrivateChannelResponse = {
  id: SnowflakeType;
  type: 1;
  last_message_id?: null | SnowflakeType;
  flags: number;
  last_pin_timestamp?: string | null;
  recipients: (UserResponse)[];
};

export type PrivateGroupChannelResponse = {
  id: SnowflakeType;
  type: 3;
  last_message_id?: null | SnowflakeType;
  flags: number;
  last_pin_timestamp?: string | null;
  recipients: (UserResponse)[];
  name: string | null;
  icon: string | null;
  owner_id: SnowflakeType;
  managed?: boolean;
  application_id?: SnowflakeType;
};

export type PrivateGuildMemberResponse = {
  avatar: string | null;
  avatar_decoration_data?: null | UserAvatarDecorationResponse;
  banner: string | null;
  communication_disabled_until: string | null;
  flags: number;
  joined_at: string;
  nick: string | null;
  pending: boolean;
  premium_since: string | null;
  roles: (SnowflakeType)[];
  collectibles?: null | UserCollectiblesResponse;
  user: UserResponse;
  mute: boolean;
  deaf: boolean;
  permissions?: string;
};

export type ProvisionalTokenResponse = {
  token_type: string;
  access_token: string;
  expires_in: number;
  scope: string;
  id_token: string;
  refresh_token?: string | null;
  scopes?: unknown[] | null;
  expires_at_s?: number | null;
};

export type PruneGuildRequest = {
  days?: number | null;
  compute_prune_count?: boolean | null;
  include_roles?: string | (SnowflakeType)[] | null;
};

export type PurchaseNotificationResponse = {
  type: PurchaseType;
  guild_product_purchase?: GuildProductPurchaseResponse;
};

export type PurchaseType = unknown;

export type QuarantineUserAction = {
  type: 4;
  metadata?: null | QuarantineUserActionMetadata;
};

export type QuarantineUserActionMetadata = { [key: string]: unknown };

export type QuarantineUserActionMetadataResponse = { [key: string]: unknown };

export type QuarantineUserActionResponse = {
  type: 4;
  metadata: QuarantineUserActionMetadataResponse;
};

export type RadioGroupComponentForModalRequest = {
  type: 21;
  id?: number | null;
  custom_id: string;
  required?: boolean | null;
  options: (RadioGroupOptionForRequest)[];
};

export type RadioGroupOptionForRequest = {
  label: string;
  value: string;
  description?: string | null;
  default?: boolean | null;
};

export type ReactionTypes = unknown | unknown;

export type ResolvedObjectsResponse = {
  users?: { [key: string]: unknown } | null;
  members?: { [key: string]: unknown } | null;
  channels?: { [key: string]: unknown } | null;
  roles?: { [key: string]: unknown } | null;
};

export type ResourceChannelResponse = {
  channel_id: SnowflakeType;
  title: string;
  emoji?: SettingsEmojiResponse;
  icon?: string;
  description: string;
};

export type RichEmbed = {
  type?: string | null;
  url?: string | null;
  title?: string | null;
  color?: number | null;
  timestamp?: string | null;
  description?: string | null;
  author?: null | RichEmbedAuthor;
  image?: null | RichEmbedImage;
  thumbnail?: null | RichEmbedThumbnail;
  footer?: null | RichEmbedFooter;
  fields?: unknown[] | null;
  provider?: null | RichEmbedProvider;
  video?: null | RichEmbedVideo;
};

export type RichEmbedAuthor = {
  name?: string | null;
  url?: string | null;
  icon_url?: string | null;
};

export type RichEmbedField = {
  name: string;
  value: string;
  inline?: boolean | null;
};

export type RichEmbedFooter = {
  text?: string | null;
  icon_url?: string | null;
};

export type RichEmbedImage = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  placeholder?: string | null;
  placeholder_version?: number | null;
  is_animated?: boolean | null;
  description?: string | null;
};

export type RichEmbedProvider = {
  name?: string | null;
  url?: string | null;
};

export type RichEmbedThumbnail = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  placeholder?: string | null;
  placeholder_version?: number | null;
  is_animated?: boolean | null;
  description?: string | null;
};

export type RichEmbedVideo = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  placeholder?: string | null;
  placeholder_version?: number | null;
  is_animated?: boolean | null;
  description?: string | null;
};

export type RoleColors = {
  primary_color?: number | null;
  secondary_color?: number | null;
  tertiary_color?: number | null;
};

export type RoleSelectComponentForMessageRequest = {
  type: 6;
  id?: number | null;
  custom_id: string;
  placeholder?: string | null;
  min_values?: number | null;
  max_values?: number | null;
  disabled?: boolean | null;
  required?: boolean | null;
  default_values?: unknown[] | null;
};

export type RoleSelectComponentForModalRequest = {
  type: 6;
  id?: number | null;
  custom_id: string;
  placeholder?: string | null;
  min_values?: number | null;
  max_values?: number | null;
  disabled?: boolean | null;
  required?: boolean | null;
  default_values?: unknown[] | null;
};

export type RoleSelectComponentResponse = {
  type: 6;
  id: number;
  custom_id: string;
  placeholder?: string;
  min_values: number;
  max_values: number;
  disabled?: boolean;
  default_values?: (RoleSelectDefaultValueResponse)[];
};

export type RoleSelectDefaultValue = {
  type: "role";
  id: SnowflakeType;
};

export type RoleSelectDefaultValueResponse = {
  type: "role";
  id: SnowflakeType;
};

export type SdkMessageRequest = {
  content?: string | null;
  embeds?: unknown[] | null;
  allowed_mentions?: null | MessageAllowedMentionsRequest;
  sticker_ids?: unknown[] | null;
  components?: unknown[] | null;
  flags?: number | null;
  attachments?: unknown[] | null;
  poll?: null | PollCreateRequest;
  shared_client_theme?: null | CustomClientThemeShareRequest;
  message_reference?: null | MessageReferenceRequest;
  nonce?: number | string | null;
  enforce_nonce?: boolean | null;
  tts?: boolean | null;
};

export type SkuIneligibilityReason = unknown | unknown | unknown;

export type ScheduledEventResponse = {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  name: string;
  description: string | null;
  channel_id: null | SnowflakeType;
  creator_id: null | SnowflakeType;
  creator?: UserResponse;
  image: string | null;
  scheduled_start_time: string;
  scheduled_end_time: string | null;
  status: GuildScheduledEventStatuses;
  entity_type: GuildScheduledEventEntityTypes;
  entity_id: null | SnowflakeType;
  user_count?: number;
  privacy_level: GuildScheduledEventPrivacyLevels;
  user_rsvp?: null | ScheduledEventUserResponse;
};

export type ScheduledEventUserResponse = {
  guild_scheduled_event_id: SnowflakeType;
  user_id: SnowflakeType;
  user?: UserResponse;
  member?: GuildMemberResponse;
};

export type SearchIndexNotReadyResponse = {
  message: string;
  code: number;
  documents_indexed: number;
  retry_after: number;
};

export type SearchMessageResponse = {
  type: MessageType;
  content: string;
  mentions: (UserResponse)[];
  mention_roles: (SnowflakeType)[];
  attachments: (MessageAttachmentResponse)[];
  embeds: (MessageEmbedResponse)[];
  timestamp: string;
  edited_timestamp: string | null;
  flags: number;
  components: (ActionRowComponentResponse | ContainerComponentResponse | FileComponentResponse | MediaGalleryComponentResponse | SectionComponentResponse | SeparatorComponentResponse | TextDisplayComponentResponse)[];
  stickers?: (GuildStickerResponse | StandardStickerResponse)[];
  sticker_items?: (MessageStickerItemResponse)[];
  id: SnowflakeType;
  channel_id: SnowflakeType;
  author: UserResponse;
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  call?: MessageCallResponse;
  activity?: MessageActivityResponse;
  application?: BasicApplicationResponse;
  application_id?: SnowflakeType;
  interaction?: MessageInteractionResponse;
  nonce?: number | string;
  webhook_id?: SnowflakeType;
  message_reference?: MessageReferenceResponse;
  thread?: ThreadResponse;
  mention_channels?: (MessageMentionChannelResponse)[];
  role_subscription_data?: MessageRoleSubscriptionDataResponse;
  purchase_notification?: PurchaseNotificationResponse;
  position?: number;
  resolved?: ResolvedObjectsResponse;
  poll?: PollResponse;
  shared_client_theme?: CustomClientThemeResponse;
  interaction_metadata?: ApplicationCommandInteractionMetadataResponse | MessageComponentInteractionMetadataResponse | ModalSubmitInteractionMetadataResponse;
  message_snapshots?: (MessageSnapshotResponse)[];
  reactions?: (MessageReactionResponse)[];
  referenced_message?: null | BasicMessageResponse;
  hit: boolean;
};

export type SearchableEmbedType = unknown | unknown | unknown | unknown | unknown;

export type SectionComponentForMessageRequest = {
  type: 9;
  id?: number | null;
  components: (TextDisplayComponentForMessageRequest)[];
  accessory: ButtonComponentForMessageRequest | ThumbnailComponentForMessageRequest;
};

export type SectionComponentResponse = {
  type: 9;
  id: number;
  components: (TextDisplayComponentResponse)[];
  accessory: ButtonComponentResponse | ThumbnailComponentResponse;
};

export type SeparatorComponentForMessageRequest = {
  type: 14;
  id?: number | null;
  spacing?: null | MessageComponentSeparatorSpacingSize;
  divider?: boolean | null;
};

export type SeparatorComponentResponse = {
  type: 14;
  id: number;
  spacing: MessageComponentSeparatorSpacingSize;
  divider: boolean;
};

export type SettingsEmojiResponse = {
  id: null | SnowflakeType;
  name: string | null;
  animated: boolean;
};

export type SlackWebhook = {
  text?: string | null;
  username?: string | null;
  icon_url?: string | null;
  attachments?: unknown[] | null;
};

export type SnowflakeSelectDefaultValueTypes = unknown | unknown | unknown;

export type SnowflakeType = string;

export type SocialLayerSkuPurchaseEligibilityCallbackData = {
  eligible: boolean;
  ineligible_reason?: null | SkuIneligibilityReason;
  ineligible_reason_description?: string | null;
};

export type SocialLayerSkuPurchaseEligibilityInteractionCallbackRequest = {
  type: 13;
  data: SocialLayerSkuPurchaseEligibilityCallbackData;
};

export type SortingMode = unknown | unknown;

export type SortingOrder = unknown | unknown;

export type SoundboardCreateRequest = {
  name: string;
  volume?: number | null;
  emoji_id?: null | SnowflakeType;
  emoji_name?: string | null;
  sound: string;
};

export type SoundboardPatchRequestPartial = {
  name?: string;
  volume?: number | null;
  emoji_id?: null | SnowflakeType;
  emoji_name?: string | null;
};

export type SoundboardSoundResponse = {
  name: string;
  sound_id: SnowflakeType;
  volume: number;
  emoji_id: null | SnowflakeType;
  emoji_name: string | null;
  guild_id?: SnowflakeType;
  available: boolean;
  user?: UserResponse;
};

export type SoundboardSoundSendRequest = {
  sound_id: SnowflakeType;
  source_guild_id?: null | SnowflakeType;
};

export type SpamLinkRuleResponse = {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  creator_id: SnowflakeType;
  name: string;
  event_type: AutomodEventType;
  actions: (BlockMessageActionResponse | FlagToChannelActionResponse | QuarantineUserActionResponse | UserCommunicationDisabledActionResponse)[];
  trigger_type: 2;
  enabled: boolean;
  exempt_roles: (SnowflakeType)[];
  exempt_channels: (SnowflakeType)[];
  trigger_metadata: SpamLinkTriggerMetadataResponse;
};

export type SpamLinkTriggerMetadataResponse = { [key: string]: unknown };

export type StageInstanceResponse = {
  guild_id: SnowflakeType;
  channel_id: SnowflakeType;
  topic: string;
  privacy_level: StageInstancesPrivacyLevels;
  id: SnowflakeType;
  discoverable_disabled: boolean;
  guild_scheduled_event_id: null | SnowflakeType;
};

export type StageInstancesPrivacyLevels = unknown | unknown;

export type StageScheduledEventCreateRequest = {
  name: string;
  description?: string | null;
  image?: string | null;
  scheduled_start_time: string;
  scheduled_end_time?: string | null;
  privacy_level: GuildScheduledEventPrivacyLevels;
  entity_type: 1;
  channel_id?: null | SnowflakeType;
  entity_metadata?: null | EntityMetadataStageInstance;
};

export type StageScheduledEventPatchRequestPartial = {
  status?: null | GuildScheduledEventStatuses;
  name?: string;
  description?: string | null;
  image?: string | null;
  scheduled_start_time?: string;
  scheduled_end_time?: string | null;
  entity_type?: null | 1;
  privacy_level?: GuildScheduledEventPrivacyLevels;
  channel_id?: null | SnowflakeType;
  entity_metadata?: null | EntityMetadataStageInstance;
};

export type StageScheduledEventResponse = {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  name: string;
  description: string | null;
  channel_id: null | SnowflakeType;
  creator_id: null | SnowflakeType;
  creator?: UserResponse;
  image: string | null;
  scheduled_start_time: string;
  scheduled_end_time: string | null;
  status: GuildScheduledEventStatuses;
  entity_type: 1;
  entity_id: null | SnowflakeType;
  user_count?: number;
  privacy_level: GuildScheduledEventPrivacyLevels;
  user_rsvp?: null | ScheduledEventUserResponse;
  entity_metadata: null | EntityMetadataStageInstanceResponse;
};

export type StandardStickerResponse = {
  id: SnowflakeType;
  name: string;
  tags: string;
  type: 1;
  format_type: null | StickerFormatTypes;
  description: string | null;
  pack_id: SnowflakeType;
  sort_value: number;
};

export type StickerFormatTypes = unknown | unknown | unknown | unknown;

export type StickerPackCollectionResponse = {
  sticker_packs: (StickerPackResponse)[];
};

export type StickerPackResponse = {
  id: SnowflakeType;
  sku_id: SnowflakeType;
  name: string;
  description: string | null;
  stickers: (StandardStickerResponse)[];
  cover_sticker_id?: SnowflakeType;
  banner_asset_id?: SnowflakeType;
};

export type StickerTypes = unknown | unknown;

export type StringSelectComponentForMessageRequest = {
  type: 3;
  id?: number | null;
  custom_id: string;
  placeholder?: string | null;
  min_values?: number | null;
  max_values?: number | null;
  disabled?: boolean | null;
  required?: boolean | null;
  options: (StringSelectOptionForRequest)[];
};

export type StringSelectComponentForModalRequest = {
  type: 3;
  id?: number | null;
  custom_id: string;
  placeholder?: string | null;
  min_values?: number | null;
  max_values?: number | null;
  disabled?: boolean | null;
  required?: boolean | null;
  options: (StringSelectOptionForRequest)[];
};

export type StringSelectComponentResponse = {
  type: 3;
  id: number;
  custom_id: string;
  placeholder?: string;
  min_values: number;
  max_values: number;
  disabled?: boolean;
  options: (StringSelectOptionResponse)[];
};

export type StringSelectOptionForRequest = {
  label: string;
  value: string;
  description?: string | null;
  default?: boolean | null;
  emoji?: null | ComponentEmojiForRequest;
};

export type StringSelectOptionResponse = {
  label: string;
  value: string;
  description?: string;
  emoji?: ComponentEmojiResponse;
  default?: boolean;
};

export type TargetUsersJobStatusResponse = {
  /** The status of the job processing the target users. */
  status: TargetUsersJobStatusTypes;
  /** The total number of users in the provided list. */
  total_users: UInt32Type;
  /** The number of users processed so far. */
  processed_users: UInt32Type;
  /** The timestamp when the job was created. */
  created_at: string | null;
  /** The timestamp when the job was successfully completed. */
  completed_at: string | null;
  /** The error message if the job failed. */
  error_message: string | null;
};

export type TargetUsersJobStatusTypes = unknown | unknown | unknown | unknown;

export type TeamMemberResponse = {
  user: UserResponse;
  team_id: SnowflakeType;
  membership_state: TeamMembershipStates;
  role: TeamMemberRoles;
  permissions: (string)[];
};

export type TeamMemberRoles = unknown | unknown | unknown;

export type TeamMembershipStates = unknown | unknown;

export type TeamResponse = {
  id: SnowflakeType;
  icon: string | null;
  name: string;
  owner_user_id: SnowflakeType;
  members: (TeamMemberResponse)[];
};

export type TermsFormFieldResponse = {
  /** Type of form field */
  field_type: "TERMS";
  /** Label shown above field */
  label?: string;
  /** Optional helper text shown below label */
  description?: string;
  /** Whether applicant must fill in field */
  required?: boolean;
  /** Terms applicant must acknowledge */
  values: (string)[];
  /** Whether applicant accepted terms */
  response?: boolean;
};

export type TextDisplayComponentForMessageRequest = {
  type: 10;
  id?: number | null;
  content: string;
};

export type TextDisplayComponentForModalRequest = {
  type: 10;
  id?: number | null;
  content: string;
};

export type TextDisplayComponentResponse = {
  type: 10;
  id: number;
  content: string;
};

export type TextInputComponentForModalRequest = {
  type: 4;
  id?: number | null;
  custom_id: string;
  style: TextInputStyleTypes;
  label?: string | null;
  value?: string | null;
  placeholder?: string | null;
  required?: boolean | null;
  min_length?: number | null;
  max_length?: number | null;
};

export type TextInputComponentResponse = {
  type: 4;
  id: number;
  custom_id: string;
  style: TextInputStyleTypes;
  label: string | null;
  value?: string;
  placeholder?: string;
  required?: boolean;
  min_length: number | null;
  max_length: number | null;
};

export type TextInputFormFieldResponse = {
  /** Type of form field */
  field_type: "TEXT_INPUT";
  /** Label shown above field */
  label?: string;
  /** Optional helper text shown below label */
  description?: string;
  /** Whether applicant must fill in field */
  required?: boolean;
  /** Placeholder text shown in empty input */
  placeholder?: string;
  /** Applicant's text response */
  response?: string;
};

export type TextInputStyleTypes = unknown | unknown;

export type ThreadAutoArchiveDuration = unknown | unknown | unknown | unknown;

export type ThreadMemberResponse = {
  id: SnowflakeType;
  user_id: SnowflakeType;
  join_timestamp: string;
  flags: number;
  member?: GuildMemberResponse;
};

export type ThreadMetadataResponse = {
  archived: boolean;
  archive_timestamp: string | null;
  auto_archive_duration: ThreadAutoArchiveDuration;
  locked: boolean;
  create_timestamp?: string;
  invitable?: boolean;
};

export type ThreadResponse = {
  id: SnowflakeType;
  type: 10 | 11 | 12;
  last_message_id?: null | SnowflakeType;
  flags: number;
  last_pin_timestamp?: string | null;
  guild_id: SnowflakeType;
  name: string;
  parent_id?: null | SnowflakeType;
  rate_limit_per_user?: number;
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string | null;
  video_quality_mode?: VideoQualityModes;
  permissions?: string;
  owner_id: SnowflakeType;
  thread_metadata: ThreadMetadataResponse;
  message_count: number;
  member_count: number;
  total_message_sent: number;
  applied_tags?: (SnowflakeType)[];
  member?: ThreadMemberResponse;
};

export type ThreadSearchResponse = {
  threads: (ThreadResponse)[];
  members: (ThreadMemberResponse)[];
  has_more: boolean;
  first_messages?: (MessageResponse)[];
  total_results: number;
};

export type ThreadSearchTagSetting = unknown | unknown;

export type ThreadSortOrder = unknown | unknown;

export type ThreadSortingMode = unknown | unknown | unknown | unknown;

export type ThreadsResponse = {
  threads: (ThreadResponse)[];
  members: (ThreadMemberResponse)[];
  has_more: boolean;
  first_messages?: (MessageResponse)[];
};

export type ThumbnailComponentForMessageRequest = {
  type: 11;
  id?: number | null;
  description?: string | null;
  spoiler?: boolean | null;
  media: UnfurledMediaRequest;
};

export type ThumbnailComponentResponse = {
  type: 11;
  id: number;
  media: UnfurledMediaResponse;
  description: string | null;
  spoiler: boolean;
};

export type TypingIndicatorResponse = { [key: string]: unknown };

export type UInt32Type = number;

export type UnbanUserFromGuildRequest = { [key: string]: unknown };

export type UnfurledMediaRequest = {
  url: string;
};

export type UnfurledMediaRequestWithAttachmentReferenceRequired = {
  url: string;
};

export type UnfurledMediaResponse = {
  id: SnowflakeType;
  url: string;
  proxy_url: string;
  width?: number | null;
  height?: number | null;
  content_type?: string | null;
  attachment_id?: SnowflakeType;
};

export type UpdateApplicationUserRoleConnectionRequest = {
  platform_name?: string | null;
  platform_username?: string | null;
  metadata?: { [key: string]: unknown } | null;
};

export type UpdateDmRequestPartial = {
  name?: string | null;
};

export type UpdateDefaultReactionEmojiRequest = {
  emoji_id?: null | SnowflakeType;
  emoji_name?: string | null;
};

export type UpdateGroupDmRequestPartial = {
  name?: string | null;
  icon?: string | null;
};

export type UpdateGuildChannelRequestPartial = {
  type?: null | 0 | 2 | 4 | 5 | 13 | 14 | 15;
  name?: string;
  position?: number | null;
  topic?: string | null;
  bitrate?: number | null;
  user_limit?: number | null;
  nsfw?: boolean | null;
  rate_limit_per_user?: number | null;
  parent_id?: null | SnowflakeType;
  permission_overwrites?: unknown[] | null;
  rtc_region?: string | null;
  video_quality_mode?: null | VideoQualityModes;
  default_auto_archive_duration?: null | ThreadAutoArchiveDuration;
  default_reaction_emoji?: null | UpdateDefaultReactionEmojiRequest;
  default_thread_rate_limit_per_user?: number | null;
  default_sort_order?: null | ThreadSortOrder;
  default_forum_layout?: null | ForumLayout;
  default_tag_setting?: null | ThreadSearchTagSetting;
  flags?: number | null;
  available_tags?: unknown[] | null;
};

export type UpdateGuildOnboardingRequest = {
  prompts?: unknown[] | null;
  enabled?: boolean | null;
  default_channel_ids?: unknown[] | null;
  mode?: null | GuildOnboardingMode;
};

export type UpdateMessageInteractionCallbackRequest = {
  type: 6 | 7;
  data?: null | IncomingWebhookUpdateForInteractionCallbackRequestPartial;
};

export type UpdateMessageInteractionCallbackResponse = {
  type: 7;
  message: MessageResponse;
};

export type UpdateOnboardingPromptRequest = {
  title: string;
  options: (OnboardingPromptOptionRequest)[];
  single_select?: boolean | null;
  required?: boolean | null;
  in_onboarding?: boolean | null;
  type?: null | OnboardingPromptType;
  id: SnowflakeType;
};

export type UpdateRolePositionsRequest = {
  id?: null | SnowflakeType;
  position?: number | null;
};

export type UpdateRoleRequestPartial = {
  name?: string | null;
  permissions?: number | null;
  color?: number | null;
  colors?: null | RoleColors;
  hoist?: boolean | null;
  mentionable?: boolean | null;
  icon?: string | null;
  unicode_emoji?: string | null;
};

export type UpdateSelfVoiceStateRequestPartial = {
  request_to_speak_timestamp?: string | null;
  suppress?: boolean | null;
  channel_id?: null | SnowflakeType;
};

export type UpdateThreadRequestPartial = {
  name?: string | null;
  archived?: boolean | null;
  locked?: boolean | null;
  invitable?: boolean | null;
  auto_archive_duration?: null | ThreadAutoArchiveDuration;
  rate_limit_per_user?: number | null;
  flags?: number | null;
  applied_tags?: unknown[] | null;
  bitrate?: number | null;
  user_limit?: number | null;
  rtc_region?: string | null;
  video_quality_mode?: null | VideoQualityModes;
};

export type UpdateThreadTagRequest = {
  name: string;
  emoji_id?: null | SnowflakeType;
  emoji_name?: string | null;
  moderated?: boolean | null;
  id?: null | SnowflakeType;
};

export type UpdateVoiceStateRequestPartial = {
  suppress?: boolean | null;
  channel_id?: null | SnowflakeType;
};

export type UserAvatarDecorationResponse = {
  asset: string;
  sku_id: null | SnowflakeType;
};

export type UserCollectiblesResponse = {
  nameplate: null | UserNameplateResponse;
};

export type UserCommunicationDisabledAction = {
  type: 3;
  metadata: UserCommunicationDisabledActionMetadata;
};

export type UserCommunicationDisabledActionMetadata = {
  duration_seconds?: number | null;
};

export type UserCommunicationDisabledActionMetadataResponse = {
  duration_seconds: number;
};

export type UserCommunicationDisabledActionResponse = {
  type: 3;
  metadata: UserCommunicationDisabledActionMetadataResponse;
};

export type UserGuildOnboardingResponse = {
  guild_id: SnowflakeType;
  prompts: (OnboardingPromptResponse)[];
  default_channel_ids: (SnowflakeType)[];
  enabled: boolean;
  mode: GuildOnboardingMode;
};

export type UserNameplateResponse = {
  sku_id: null | SnowflakeType;
  asset: string;
  label: string;
  palette: NameplatePalette;
};

export type UserNotificationSettings = unknown | unknown;

export type UserPiiResponse = {
  id: SnowflakeType;
  username: string;
  avatar: string | null;
  discriminator: string;
  public_flags: number;
  flags: Int53Type;
  bot?: boolean;
  system?: boolean;
  banner?: string | null;
  accent_color?: number | null;
  global_name: string | null;
  avatar_decoration_data?: null | UserAvatarDecorationResponse;
  collectibles?: null | UserCollectiblesResponse;
  primary_guild?: null | UserPrimaryGuildResponse;
  mfa_enabled: boolean;
  locale: AvailableLocalesEnum;
  premium_type?: PremiumTypes;
  email?: string | null;
  verified?: boolean;
};

export type UserPrimaryGuildResponse = {
  identity_guild_id: null | SnowflakeType;
  identity_enabled: boolean | null;
  tag: string | null;
  badge: string | null;
};

export type UserResponse = {
  id: SnowflakeType;
  username: string;
  avatar: string | null;
  discriminator: string;
  public_flags: number;
  flags: Int53Type;
  bot?: boolean;
  system?: boolean;
  banner?: string | null;
  accent_color?: number | null;
  global_name: string | null;
  avatar_decoration_data?: null | UserAvatarDecorationResponse;
  collectibles?: null | UserCollectiblesResponse;
  primary_guild: null | UserPrimaryGuildResponse;
};

export type UserSelectComponentForMessageRequest = {
  type: 5;
  id?: number | null;
  custom_id: string;
  placeholder?: string | null;
  min_values?: number | null;
  max_values?: number | null;
  disabled?: boolean | null;
  required?: boolean | null;
  default_values?: unknown[] | null;
};

export type UserSelectComponentForModalRequest = {
  type: 5;
  id?: number | null;
  custom_id: string;
  placeholder?: string | null;
  min_values?: number | null;
  max_values?: number | null;
  disabled?: boolean | null;
  required?: boolean | null;
  default_values?: unknown[] | null;
};

export type UserSelectComponentResponse = {
  type: 5;
  id: number;
  custom_id: string;
  placeholder?: string;
  min_values: number;
  max_values: number;
  disabled?: boolean;
  default_values?: (UserSelectDefaultValueResponse)[];
};

export type UserSelectDefaultValue = {
  type: "user";
  id: SnowflakeType;
};

export type UserSelectDefaultValueResponse = {
  type: "user";
  id: SnowflakeType;
};

export type VanityUrlErrorResponse = {
  message: string;
  code: number;
};

export type VanityUrlResponse = {
  code: string | null;
  uses: number;
  error?: null | VanityUrlErrorResponse;
};

export type VerificationLevels = unknown | unknown | unknown | unknown | unknown;

export type VideoQualityModes = unknown | unknown;

export type VoiceRegionResponse = {
  id: string;
  name: string;
  custom: boolean;
  deprecated: boolean;
  optimal: boolean;
};

export type VoiceScheduledEventCreateRequest = {
  name: string;
  description?: string | null;
  image?: string | null;
  scheduled_start_time: string;
  scheduled_end_time?: string | null;
  privacy_level: GuildScheduledEventPrivacyLevels;
  entity_type: 2;
  channel_id?: null | SnowflakeType;
  entity_metadata?: null | EntityMetadataVoice;
};

export type VoiceScheduledEventPatchRequestPartial = {
  status?: null | GuildScheduledEventStatuses;
  name?: string;
  description?: string | null;
  image?: string | null;
  scheduled_start_time?: string;
  scheduled_end_time?: string | null;
  entity_type?: null | 2;
  privacy_level?: GuildScheduledEventPrivacyLevels;
  channel_id?: null | SnowflakeType;
  entity_metadata?: null | EntityMetadataVoice;
};

export type VoiceScheduledEventResponse = {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  name: string;
  description: string | null;
  channel_id: null | SnowflakeType;
  creator_id: null | SnowflakeType;
  creator?: UserResponse;
  image: string | null;
  scheduled_start_time: string;
  scheduled_end_time: string | null;
  status: GuildScheduledEventStatuses;
  entity_type: 2;
  entity_id: null | SnowflakeType;
  user_count?: number;
  privacy_level: GuildScheduledEventPrivacyLevels;
  user_rsvp?: null | ScheduledEventUserResponse;
  entity_metadata: null | EntityMetadataVoiceResponse;
};

export type VoiceStateResponse = {
  channel_id: null | SnowflakeType;
  deaf: boolean;
  guild_id: null | SnowflakeType;
  member?: GuildMemberResponse;
  mute: boolean;
  request_to_speak_timestamp: string | null;
  suppress: boolean;
  self_stream: boolean | null;
  self_deaf: boolean;
  self_mute: boolean;
  self_video: boolean;
  session_id: string;
  user_id: SnowflakeType;
};

export type WebhookSlackEmbed = {
  title?: string | null;
  title_link?: string | null;
  text?: string | null;
  color?: string | null;
  ts?: number | null;
  pretext?: string | null;
  footer?: string | null;
  footer_icon?: string | null;
  author_name?: string | null;
  author_link?: string | null;
  author_icon?: string | null;
  image_url?: string | null;
  thumb_url?: string | null;
  fields?: unknown[] | null;
};

export type WebhookSlackEmbedField = {
  name?: string | null;
  value?: string | null;
  inline?: boolean | null;
};

export type WebhookSourceChannelResponse = {
  id: SnowflakeType;
  name: string;
};

export type WebhookSourceGuildResponse = {
  id: SnowflakeType;
  icon: string | null;
  name: string;
};

export type WebhookTypes = unknown | unknown | unknown;

export type WelcomeMessageResponse = {
  author_ids: (SnowflakeType)[];
  message: string;
};

export type WelcomeScreenPatchRequestPartial = {
  description?: string | null;
  welcome_channels?: unknown[] | null;
  enabled?: boolean | null;
};

export type WidgetActivity = {
  name: string;
};

export type WidgetChannel = {
  id: SnowflakeType;
  name: string;
  position: number;
};

export type WidgetImageStyles = unknown | unknown | unknown | unknown | unknown;

export type WidgetMember = {
  id: string;
  username: string;
  discriminator: WidgetUserDiscriminator;
  avatar: null;
  status: string;
  avatar_url: string;
  activity?: WidgetActivity;
  deaf?: boolean;
  mute?: boolean;
  self_deaf?: boolean;
  self_mute?: boolean;
  suppress?: boolean;
  channel_id?: SnowflakeType;
};

export type WidgetResponse = {
  id: SnowflakeType;
  name: string;
  instant_invite: string | null;
  channels: (WidgetChannel)[];
  members: (WidgetMember)[];
  presence_count: number;
};

export type WidgetSettingsResponse = {
  enabled: boolean;
  channel_id: null | SnowflakeType;
};

export type WidgetUserDiscriminator = unknown;

/** A single error, either for an API response or a specific field. */
export type Error = {
  /** Discord internal error code. See error code reference */
  code: number;
  /** Human-readable error message */
  message: string;
};

export type InnerErrors = {
  /** The list of errors for this field */
  _errors: (Error)[];
};

export type ErrorDetails = { [key: string]: ErrorDetails | undefined } | InnerErrors;

/** Errors object returned by the Discord API */
export type ErrorResponse = Error & { errors?: ErrorDetails };

/** Ratelimit error object returned by the Discord API */
export type RatelimitedResponse = Error & { retry_after: number; global: boolean };
