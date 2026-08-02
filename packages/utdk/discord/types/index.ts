import type { ActivitiesAttachmentResponse, AfkTimeouts, ApplicationCommandAutocompleteCallbackRequest, ApplicationCommandHandler, ApplicationCommandResponse, ApplicationCommandType, ApplicationExplicitContentFilterTypes, ApplicationIdentityProviderAuthType, ApplicationIncomingWebhookResponse, ApplicationOAuth2InstallParams, ApplicationTypes, ApplicationUserRoleConnectionResponse, AuditLogActionTypes, AuthorType, AvailableLocalesEnum, BulkBanUsersResponse, ChannelFollowerResponse, ChannelFollowerWebhookResponse, ChannelPermissionOverwrites, CommandPermissionsResponse, CreateForumThreadRequest, CreateGroupDmInviteRequest, CreateGuildInviteRequest, CreateMessageInteractionCallbackRequest, CreateTextThreadWithoutMessageRequest, CreatedThreadResponse, CustomClientThemeShareRequest, DefaultKeywordListUpsertRequest, DefaultKeywordListUpsertRequestPartial, DefaultKeywordRuleResponse, EmbeddedActivityInstance, EmojiResponse, EntitlementOwnerTypes, EntitlementResponse, ExternalScheduledEventCreateRequest, ExternalScheduledEventPatchRequestPartial, ExternalScheduledEventResponse, ForumLayout, FriendInviteResponse, GatewayBotResponse, GatewayResponse, GithubCheckRun, GithubCheckSuite, GithubComment, GithubCommit, GithubDiscussion, GithubIssue, GithubRelease, GithubRepository, GithubReview, GithubUser, GroupDmInviteResponse, GuildAuditLogResponse, GuildBanResponse, GuildChannelResponse, GuildExplicitContentFilterTypes, GuildHomeSettingsResponse, GuildIncomingWebhookResponse, GuildInviteResponse, GuildJoinRequestApplicationStatus, GuildJoinRequestResponse, GuildJoinRequestsListResponse, GuildMemberResponse, GuildOnboardingMode, GuildOnboardingResponse, GuildPreviewResponse, GuildPruneResponse, GuildResponse, GuildRoleResponse, GuildSearchResponse, GuildStickerResponse, GuildTemplateResponse, GuildWelcomeScreenResponse, GuildWithCountsResponse, HasOption, IncomingWebhookRequestPartial, IncomingWebhookUpdateRequestPartial, InteractionCallbackResponse, KeywordRuleResponse, KeywordUpsertRequest, KeywordUpsertRequestPartial, LaunchActivityInteractionCallbackRequest, ListApplicationEmojisResponse, ListGuildSoundboardSoundsResponse, LobbyGuildInviteResponse, LobbyMemberResponse, LobbyMessageResponse, LobbyResponse, MentionSpamRuleResponse, MentionSpamUpsertRequest, MentionSpamUpsertRequestPartial, MessageAllowedMentionsRequest, MessageReferenceRequest, MessageResponse, MlSpamRuleResponse, MlSpamUpsertRequest, MlSpamUpsertRequestPartial, ModalInteractionCallbackRequest, OAuth2GetAuthorizationResponse, OAuth2GetKeys, OAuth2GetOpenIdConnectUserInfoResponse, PinnedMessagesResponse, PollAnswerDetailsResponse, PollCreateRequest, PongInteractionCallbackRequest, PrivateApplicationResponse, PrivateChannelResponse, PrivateGroupChannelResponse, PrivateGuildMemberResponse, ProvisionalTokenResponse, RatelimitedResponse, ReactionTypes, RoleColors, SearchableEmbedType, SnowflakeType, SocialLayerSkuPurchaseEligibilityInteractionCallbackRequest, SortingMode, SortingOrder, SoundboardSoundResponse, SpamLinkRuleResponse, StageInstanceResponse, StageInstancesPrivacyLevels, StageScheduledEventCreateRequest, StageScheduledEventPatchRequestPartial, StageScheduledEventResponse, StandardStickerResponse, StickerPackCollectionResponse, StickerPackResponse, TargetUsersJobStatusResponse, ThreadAutoArchiveDuration, ThreadMemberResponse, ThreadResponse, ThreadSearchResponse, ThreadSearchTagSetting, ThreadSortOrder, ThreadSortingMode, ThreadsResponse, TypingIndicatorResponse, UnbanUserFromGuildRequest, UpdateDefaultReactionEmojiRequest, UpdateDmRequestPartial, UpdateGroupDmRequestPartial, UpdateGuildChannelRequestPartial, UpdateMessageInteractionCallbackRequest, UpdateRolePositionsRequest, UpdateThreadRequestPartial, UserGuildOnboardingResponse, UserNotificationSettings, UserPiiResponse, UserResponse, VanityUrlResponse, VerificationLevels, VideoQualityModes, VoiceScheduledEventCreateRequest, VoiceScheduledEventPatchRequestPartial, VoiceScheduledEventResponse, VoiceStateResponse, WidgetImageStyles, WidgetResponse, WidgetSettingsResponse } from "./schemas.js";

export type DiscordClient = {
  getMyApplication: () => Promise<PrivateApplicationResponse>;

  updateMyApplication: (input: {
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
  }) => Promise<PrivateApplicationResponse>;

  getApplication: (input: {
    application_id: SnowflakeType;
  }) => Promise<PrivateApplicationResponse>;

  updateApplication: (input: {
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
    application_id: SnowflakeType;
  }) => Promise<PrivateApplicationResponse>;

  applicationsGetActivityInstance: (input: {
    application_id: SnowflakeType;
    instance_id: string;
  }) => Promise<EmbeddedActivityInstance>;

  uploadApplicationAttachment: (input: {
    file: string;
    application_id: SnowflakeType;
  }) => Promise<ActivitiesAttachmentResponse>;

  listApplicationCommands: (input: {
    application_id: SnowflakeType;
    with_localizations?: boolean;
  }) => Promise<unknown[] | null>;

  bulkSetApplicationCommands: (input: {
    body: unknown[] | null;
    application_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  createApplicationCommand: (input: {
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
    application_id: SnowflakeType;
  }) => Promise<ApplicationCommandResponse>;

  getApplicationCommand: (input: {
    application_id: SnowflakeType;
    command_id: SnowflakeType;
  }) => Promise<ApplicationCommandResponse>;

  deleteApplicationCommand: (input: {
    application_id: SnowflakeType;
    command_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateApplicationCommand: (input: {
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
    application_id: SnowflakeType;
    command_id: SnowflakeType;
  }) => Promise<ApplicationCommandResponse>;

  listApplicationEmojis: (input: {
    application_id: SnowflakeType;
  }) => Promise<ListApplicationEmojisResponse>;

  createApplicationEmoji: (input: {
    name: string;
    image: string;
    application_id: SnowflakeType;
  }) => Promise<EmojiResponse>;

  getApplicationEmoji: (input: {
    application_id: SnowflakeType;
    emoji_id: SnowflakeType;
  }) => Promise<EmojiResponse>;

  deleteApplicationEmoji: (input: {
    application_id: SnowflakeType;
    emoji_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateApplicationEmoji: (input: {
    name?: string;
    application_id: SnowflakeType;
    emoji_id: SnowflakeType;
  }) => Promise<EmojiResponse>;

  getEntitlements: (input: {
    application_id: SnowflakeType;
    user_id?: SnowflakeType;
    sku_ids?: string | (null | SnowflakeType)[];
    guild_id?: SnowflakeType;
    before?: SnowflakeType;
    after?: SnowflakeType;
    limit?: number;
    exclude_ended?: boolean;
    exclude_deleted?: boolean;
    only_active?: boolean;
  }) => Promise<(EntitlementResponse)[]>;

  createEntitlement: (input: {
    sku_id: SnowflakeType;
    owner_id: SnowflakeType;
    owner_type: EntitlementOwnerTypes;
    application_id: SnowflakeType;
  }) => Promise<EntitlementResponse>;

  getEntitlement: (input: {
    application_id: SnowflakeType;
    entitlement_id: SnowflakeType;
  }) => Promise<EntitlementResponse>;

  deleteEntitlement: (input: {
    application_id: SnowflakeType;
    entitlement_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  consumeEntitlement: (input: {
    application_id: SnowflakeType;
    entitlement_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  listGuildApplicationCommands: (input: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    with_localizations?: boolean;
  }) => Promise<unknown[] | null>;

  bulkSetGuildApplicationCommands: (input: {
    body: unknown[] | null;
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  createGuildApplicationCommand: (input: {
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
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
  }) => Promise<ApplicationCommandResponse>;

  listGuildApplicationCommandPermissions: (input: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
  }) => Promise<(CommandPermissionsResponse)[]>;

  getGuildApplicationCommand: (input: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    command_id: SnowflakeType;
  }) => Promise<ApplicationCommandResponse>;

  deleteGuildApplicationCommand: (input: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    command_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateGuildApplicationCommand: (input: {
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
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    command_id: SnowflakeType;
  }) => Promise<ApplicationCommandResponse>;

  getGuildApplicationCommandPermissions: (input: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    command_id: SnowflakeType;
  }) => Promise<CommandPermissionsResponse>;

  setGuildApplicationCommandPermissions: (input: {
    permissions?: unknown[] | null;
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    command_id: SnowflakeType;
  }) => Promise<CommandPermissionsResponse>;

  getApplicationRoleConnectionsMetadata: (input: {
    application_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  updateApplicationRoleConnectionsMetadata: (input: {
    body: unknown[] | null;
    application_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  getChannel: (input: {
    channel_id: SnowflakeType;
  }) => Promise<GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse>;

  deleteChannel: (input: {
    channel_id: SnowflakeType;
  }) => Promise<GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse>;

  updateChannel: (input: {
    body: UpdateDmRequestPartial | UpdateGroupDmRequestPartial | UpdateGuildChannelRequestPartial | UpdateThreadRequestPartial;
    channel_id: SnowflakeType;
  }) => Promise<GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse>;

  followChannel: (input: {
    webhook_channel_id: SnowflakeType;
    channel_id: SnowflakeType;
  }) => Promise<ChannelFollowerResponse>;

  listChannelInvites: (input: {
    channel_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  createChannelInvite: (input: {
    body: CreateGroupDmInviteRequest | CreateGuildInviteRequest;
    channel_id: SnowflakeType;
  }) => Promise<FriendInviteResponse | GroupDmInviteResponse | GuildInviteResponse>;

  listMessages: (input: {
    channel_id: SnowflakeType;
    around?: SnowflakeType;
    before?: SnowflakeType;
    after?: SnowflakeType;
    limit?: number;
  }) => Promise<unknown[] | null>;

  createMessage: (input: {
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
    channel_id: SnowflakeType;
  }) => Promise<MessageResponse>;

  bulkDeleteMessages: (input: {
    messages: (SnowflakeType)[];
    channel_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  listPins: (input: {
    channel_id: SnowflakeType;
    before?: string;
    limit?: number;
  }) => Promise<PinnedMessagesResponse>;

  createPin: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  deletePin: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  getMessage: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<MessageResponse>;

  deleteMessage: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateMessage: (input: {
    content?: string | null;
    embeds?: unknown[] | null;
    flags?: number | null;
    allowed_mentions?: null | MessageAllowedMentionsRequest;
    sticker_ids?: unknown[] | null;
    components?: unknown[] | null;
    attachments?: unknown[] | null;
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<MessageResponse>;

  crosspostMessage: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<MessageResponse>;

  deleteAllMessageReactions: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  listMessageReactionsByEmoji: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    emoji_name: string;
    after?: SnowflakeType;
    limit?: number;
    type?: ReactionTypes;
  }) => Promise<(UserResponse)[]>;

  deleteAllMessageReactionsByEmoji: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    emoji_name: string;
  }) => Promise<RatelimitedResponse>;

  addMyMessageReaction: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    emoji_name: string;
  }) => Promise<RatelimitedResponse>;

  deleteMyMessageReaction: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    emoji_name: string;
  }) => Promise<RatelimitedResponse>;

  deleteUserMessageReaction: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    emoji_name: string;
    user_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  createThreadFromMessage: (input: {
    name: string;
    auto_archive_duration?: null | ThreadAutoArchiveDuration;
    rate_limit_per_user?: number | null;
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<ThreadResponse>;

  setChannelPermissionOverwrite: (input: {
    type?: null | ChannelPermissionOverwrites;
    allow?: number | null;
    deny?: number | null;
    channel_id: SnowflakeType;
    overwrite_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  deleteChannelPermissionOverwrite: (input: {
    channel_id: SnowflakeType;
    overwrite_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  deprecatedListPins: (input: {
    channel_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  deprecatedCreatePin: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  deprecatedDeletePin: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  getAnswerVoters: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    answer_id: number;
    after?: SnowflakeType;
    limit?: number;
  }) => Promise<PollAnswerDetailsResponse>;

  pollExpire: (input: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<MessageResponse>;

  addGroupDmUser: (input: {
    access_token?: string | null;
    nick?: string | null;
    channel_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<PrivateChannelResponse | PrivateGroupChannelResponse>;

  deleteGroupDmUser: (input: {
    channel_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  sendSoundboardSound: (input: {
    sound_id: SnowflakeType;
    source_guild_id?: null | SnowflakeType;
    channel_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  listThreadMembers: (input: {
    channel_id: SnowflakeType;
    with_member?: boolean;
    limit?: number;
    after?: SnowflakeType;
  }) => Promise<(ThreadMemberResponse)[]>;

  joinThread: (input: {
    channel_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  leaveThread: (input: {
    channel_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  getThreadMember: (input: {
    channel_id: SnowflakeType;
    user_id: SnowflakeType;
    with_member?: boolean;
  }) => Promise<ThreadMemberResponse>;

  addThreadMember: (input: {
    channel_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  deleteThreadMember: (input: {
    channel_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  createThread: (input: {
    body: CreateForumThreadRequest | CreateTextThreadWithoutMessageRequest;
    channel_id: SnowflakeType;
  }) => Promise<CreatedThreadResponse>;

  listPrivateArchivedThreads: (input: {
    channel_id: SnowflakeType;
    before?: string;
    limit?: number;
  }) => Promise<ThreadsResponse>;

  listPublicArchivedThreads: (input: {
    channel_id: SnowflakeType;
    before?: string;
    limit?: number;
  }) => Promise<ThreadsResponse>;

  threadSearch: (input: {
    channel_id: SnowflakeType;
    name?: string;
    slop?: number;
    min_id?: SnowflakeType;
    max_id?: SnowflakeType;
    tag?: string | (SnowflakeType)[];
    tag_setting?: ThreadSearchTagSetting;
    archived?: boolean;
    sort_by?: ThreadSortingMode;
    sort_order?: SortingOrder;
    limit?: number;
    offset?: number;
  }) => Promise<ThreadSearchResponse>;

  triggerTypingIndicator: (input: {
    channel_id: SnowflakeType;
  }) => Promise<TypingIndicatorResponse>;

  listMyPrivateArchivedThreads: (input: {
    channel_id: SnowflakeType;
    before?: SnowflakeType;
    limit?: number;
  }) => Promise<ThreadsResponse>;

  /**
   * Set a voice channel's status.
   */
  updateVoiceChannelStatus: (input: {
    /** The new voice channel status */
    status?: string | null;
    channel_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  listChannelWebhooks: (input: {
    channel_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  createWebhook: (input: {
    name: string;
    avatar?: string | null;
    channel_id: SnowflakeType;
  }) => Promise<GuildIncomingWebhookResponse>;

  getGateway: () => Promise<GatewayResponse>;

  getBotGateway: () => Promise<GatewayBotResponse>;

  getGuildTemplate: (input: {
    code: string;
  }) => Promise<GuildTemplateResponse>;

  getGuild: (input: {
    guild_id: SnowflakeType;
    with_counts?: boolean;
  }) => Promise<GuildWithCountsResponse>;

  updateGuild: (input: {
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
    guild_id: SnowflakeType;
  }) => Promise<GuildResponse>;

  listGuildAuditLogEntries: (input: {
    guild_id: SnowflakeType;
    user_id?: SnowflakeType;
    target_id?: SnowflakeType;
    action_type?: AuditLogActionTypes;
    before?: SnowflakeType;
    after?: SnowflakeType;
    limit?: number;
  }) => Promise<GuildAuditLogResponse>;

  listAutoModerationRules: (input: {
    guild_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  createAutoModerationRule: (input: {
    body: DefaultKeywordListUpsertRequest | KeywordUpsertRequest | MlSpamUpsertRequest | MentionSpamUpsertRequest;
    guild_id: SnowflakeType;
  }) => Promise<DefaultKeywordRuleResponse | KeywordRuleResponse | MlSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse>;

  getAutoModerationRule: (input: {
    guild_id: SnowflakeType;
    rule_id: SnowflakeType;
  }) => Promise<DefaultKeywordRuleResponse | KeywordRuleResponse | MlSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse>;

  deleteAutoModerationRule: (input: {
    guild_id: SnowflakeType;
    rule_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateAutoModerationRule: (input: {
    body: DefaultKeywordListUpsertRequestPartial | KeywordUpsertRequestPartial | MlSpamUpsertRequestPartial | MentionSpamUpsertRequestPartial;
    guild_id: SnowflakeType;
    rule_id: SnowflakeType;
  }) => Promise<DefaultKeywordRuleResponse | KeywordRuleResponse | MlSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse>;

  listGuildBans: (input: {
    guild_id: SnowflakeType;
    limit?: number;
    before?: SnowflakeType;
    after?: SnowflakeType;
  }) => Promise<unknown[] | null>;

  getGuildBan: (input: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<GuildBanResponse>;

  banUserFromGuild: (input: {
    delete_message_seconds?: number | null;
    delete_message_days?: number | null;
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  unbanUserFromGuild: (input: {
    body: UnbanUserFromGuildRequest;
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  bulkBanUsersFromGuild: (input: {
    user_ids: (SnowflakeType)[];
    delete_message_seconds?: number | null;
    guild_id: SnowflakeType;
  }) => Promise<BulkBanUsersResponse>;

  listGuildChannels: (input: {
    guild_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  createGuildChannel: (input: {
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
    guild_id: SnowflakeType;
  }) => Promise<GuildChannelResponse>;

  bulkUpdateGuildChannels: (input: {
    body: ({ id?: null | SnowflakeType; position?: number | null; parent_id?: null | SnowflakeType; lock_permissions?: boolean | null })[];
    guild_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  listGuildEmojis: (input: {
    guild_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  createGuildEmoji: (input: {
    name: string;
    image: string;
    roles?: unknown[] | null;
    guild_id: SnowflakeType;
  }) => Promise<EmojiResponse>;

  getGuildEmoji: (input: {
    guild_id: SnowflakeType;
    emoji_id: SnowflakeType;
  }) => Promise<EmojiResponse>;

  deleteGuildEmoji: (input: {
    guild_id: SnowflakeType;
    emoji_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateGuildEmoji: (input: {
    name?: string;
    roles?: unknown[] | null;
    guild_id: SnowflakeType;
    emoji_id: SnowflakeType;
  }) => Promise<EmojiResponse>;

  listGuildIntegrations: (input: {
    guild_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  deleteGuildIntegration: (input: {
    guild_id: SnowflakeType;
    integration_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  listGuildInvites: (input: {
    guild_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  listGuildMembers: (input: {
    guild_id: SnowflakeType;
    limit?: number;
    after?: number;
  }) => Promise<(GuildMemberResponse)[]>;

  updateMyGuildMember: (input: {
    nick?: string | null;
    avatar?: string | null;
    bio?: string | null;
    banner?: string | null;
    guild_id: SnowflakeType;
  }) => Promise<PrivateGuildMemberResponse>;

  searchGuildMembers: (input: {
    guild_id: SnowflakeType;
    limit?: number;
    query: string;
  }) => Promise<(GuildMemberResponse)[]>;

  getGuildMember: (input: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<GuildMemberResponse>;

  addGuildMember: (input: {
    nick?: string | null;
    roles?: unknown[] | null;
    mute?: boolean | null;
    deaf?: boolean | null;
    access_token: string;
    flags?: number | null;
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<GuildMemberResponse>;

  deleteGuildMember: (input: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateGuildMember: (input: {
    nick?: string | null;
    roles?: unknown[] | null;
    mute?: boolean | null;
    deaf?: boolean | null;
    channel_id?: null | SnowflakeType;
    communication_disabled_until?: string | null;
    flags?: number | null;
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<GuildMemberResponse>;

  addGuildMemberRole: (input: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
    role_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  deleteGuildMemberRole: (input: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
    role_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  guildSearch: (input: {
    guild_id: SnowflakeType;
    sort_by?: SortingMode;
    sort_order?: SortingOrder;
    content?: string;
    slop?: number;
    author_id?: (SnowflakeType)[];
    author_type?: (AuthorType)[];
    mentions?: (SnowflakeType)[];
    mentions_role_id?: (SnowflakeType)[];
    replied_to_user_id?: (SnowflakeType)[];
    replied_to_message_id?: (SnowflakeType)[];
    mention_everyone?: boolean;
    min_id?: SnowflakeType;
    max_id?: SnowflakeType;
    limit?: number;
    offset?: number;
    has?: (HasOption)[];
    link_hostname?: (string)[];
    embed_provider?: (string)[];
    embed_type?: (SearchableEmbedType)[];
    attachment_extension?: (string)[];
    attachment_filename?: (string)[];
    pinned?: boolean;
    include_nsfw?: boolean;
    channel_id?: (SnowflakeType)[];
  }) => Promise<GuildSearchResponse>;

  getGuildNewMemberWelcome: (input: {
    guild_id: SnowflakeType;
  }) => Promise<GuildHomeSettingsResponse>;

  getGuildsOnboarding: (input: {
    guild_id: SnowflakeType;
  }) => Promise<UserGuildOnboardingResponse>;

  putGuildsOnboarding: (input: {
    prompts?: unknown[] | null;
    enabled?: boolean | null;
    default_channel_ids?: unknown[] | null;
    mode?: null | GuildOnboardingMode;
    guild_id: SnowflakeType;
  }) => Promise<GuildOnboardingResponse>;

  getGuildPreview: (input: {
    guild_id: SnowflakeType;
  }) => Promise<GuildPreviewResponse>;

  previewPruneGuild: (input: {
    guild_id: SnowflakeType;
    days?: number;
    include_roles?: string | (null | SnowflakeType)[];
  }) => Promise<GuildPruneResponse>;

  pruneGuild: (input: {
    days?: number | null;
    compute_prune_count?: boolean | null;
    include_roles?: string | (SnowflakeType)[] | null;
    guild_id: SnowflakeType;
  }) => Promise<GuildPruneResponse>;

  listGuildVoiceRegions: (input: {
    guild_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  /**
   * List join requests for guild, optionally filtered by application status
   */
  getGuildJoinRequests: (input: {
    guild_id: SnowflakeType;
    status?: GuildJoinRequestApplicationStatus;
    limit?: number;
    before?: SnowflakeType;
    after?: SnowflakeType;
  }) => Promise<GuildJoinRequestsListResponse>;

  /**
   * Approve or reject guild join request
   */
  actionGuildJoinRequest: (input: {
    /** Whether to approve or reject the join request */
    action?: GuildJoinRequestApplicationStatus;
    /** Reason for rejection. Only used when action is REJECTED */
    rejection_reason?: string | null;
    guild_id: SnowflakeType;
    request_id: SnowflakeType;
  }) => Promise<GuildJoinRequestResponse>;

  listGuildRoles: (input: {
    guild_id: SnowflakeType;
  }) => Promise<(GuildRoleResponse)[]>;

  createGuildRole: (input: {
    name?: string | null;
    permissions?: number | null;
    color?: number | null;
    colors?: null | RoleColors;
    hoist?: boolean | null;
    mentionable?: boolean | null;
    icon?: string | null;
    unicode_emoji?: string | null;
    guild_id: SnowflakeType;
  }) => Promise<GuildRoleResponse>;

  bulkUpdateGuildRoles: (input: {
    body: (UpdateRolePositionsRequest)[];
    guild_id: SnowflakeType;
  }) => Promise<(GuildRoleResponse)[]>;

  guildRoleMemberCounts: (input: {
    guild_id: SnowflakeType;
  }) => Promise<{ [key: string]: number | undefined }>;

  getGuildRole: (input: {
    guild_id: SnowflakeType;
    role_id: SnowflakeType;
  }) => Promise<GuildRoleResponse>;

  deleteGuildRole: (input: {
    guild_id: SnowflakeType;
    role_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateGuildRole: (input: {
    name?: string | null;
    permissions?: number | null;
    color?: number | null;
    colors?: null | RoleColors;
    hoist?: boolean | null;
    mentionable?: boolean | null;
    icon?: string | null;
    unicode_emoji?: string | null;
    guild_id: SnowflakeType;
    role_id: SnowflakeType;
  }) => Promise<GuildRoleResponse>;

  listGuildScheduledEvents: (input: {
    guild_id: SnowflakeType;
    with_user_count?: boolean;
  }) => Promise<unknown[] | null>;

  createGuildScheduledEvent: (input: {
    body: ExternalScheduledEventCreateRequest | StageScheduledEventCreateRequest | VoiceScheduledEventCreateRequest;
    guild_id: SnowflakeType;
  }) => Promise<ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse>;

  getGuildScheduledEvent: (input: {
    guild_id: SnowflakeType;
    guild_scheduled_event_id: SnowflakeType;
    with_user_count?: boolean;
  }) => Promise<ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse>;

  deleteGuildScheduledEvent: (input: {
    guild_id: SnowflakeType;
    guild_scheduled_event_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateGuildScheduledEvent: (input: {
    body: ExternalScheduledEventPatchRequestPartial | StageScheduledEventPatchRequestPartial | VoiceScheduledEventPatchRequestPartial;
    guild_id: SnowflakeType;
    guild_scheduled_event_id: SnowflakeType;
  }) => Promise<ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse>;

  listGuildScheduledEventUsers: (input: {
    guild_id: SnowflakeType;
    guild_scheduled_event_id: SnowflakeType;
    with_member?: boolean;
    limit?: number;
    before?: SnowflakeType;
    after?: SnowflakeType;
  }) => Promise<unknown[] | null>;

  listGuildSoundboardSounds: (input: {
    guild_id: SnowflakeType;
  }) => Promise<ListGuildSoundboardSoundsResponse>;

  createGuildSoundboardSound: (input: {
    name: string;
    volume?: number | null;
    emoji_id?: null | SnowflakeType;
    emoji_name?: string | null;
    sound: string;
    guild_id: SnowflakeType;
  }) => Promise<SoundboardSoundResponse>;

  getGuildSoundboardSound: (input: {
    guild_id: SnowflakeType;
    sound_id: SnowflakeType;
  }) => Promise<SoundboardSoundResponse>;

  deleteGuildSoundboardSound: (input: {
    guild_id: SnowflakeType;
    sound_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateGuildSoundboardSound: (input: {
    name?: string;
    volume?: number | null;
    emoji_id?: null | SnowflakeType;
    emoji_name?: string | null;
    guild_id: SnowflakeType;
    sound_id: SnowflakeType;
  }) => Promise<SoundboardSoundResponse>;

  listGuildStickers: (input: {
    guild_id: SnowflakeType;
  }) => Promise<(GuildStickerResponse)[]>;

  createGuildSticker: (input: {
    name: string;
    tags: string;
    description?: string | null;
    file: string;
    guild_id: SnowflakeType;
  }) => Promise<GuildStickerResponse>;

  getGuildSticker: (input: {
    guild_id: SnowflakeType;
    sticker_id: SnowflakeType;
  }) => Promise<GuildStickerResponse>;

  deleteGuildSticker: (input: {
    guild_id: SnowflakeType;
    sticker_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateGuildSticker: (input: {
    name?: string;
    tags?: string;
    description?: string | null;
    guild_id: SnowflakeType;
    sticker_id: SnowflakeType;
  }) => Promise<GuildStickerResponse>;

  listGuildTemplates: (input: {
    guild_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  createGuildTemplate: (input: {
    name: string;
    description?: string | null;
    guild_id: SnowflakeType;
  }) => Promise<GuildTemplateResponse>;

  syncGuildTemplate: (input: {
    guild_id: SnowflakeType;
    code: string;
  }) => Promise<GuildTemplateResponse>;

  deleteGuildTemplate: (input: {
    guild_id: SnowflakeType;
    code: string;
  }) => Promise<GuildTemplateResponse>;

  updateGuildTemplate: (input: {
    name?: string;
    description?: string | null;
    guild_id: SnowflakeType;
    code: string;
  }) => Promise<GuildTemplateResponse>;

  getActiveGuildThreads: (input: {
    guild_id: SnowflakeType;
  }) => Promise<ThreadsResponse>;

  getGuildVanityUrl: (input: {
    guild_id: SnowflakeType;
  }) => Promise<VanityUrlResponse>;

  getSelfVoiceState: (input: {
    guild_id: SnowflakeType;
  }) => Promise<VoiceStateResponse>;

  updateSelfVoiceState: (input: {
    request_to_speak_timestamp?: string | null;
    suppress?: boolean | null;
    channel_id?: null | SnowflakeType;
    guild_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  getVoiceState: (input: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<VoiceStateResponse>;

  updateVoiceState: (input: {
    suppress?: boolean | null;
    channel_id?: null | SnowflakeType;
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  getGuildWebhooks: (input: {
    guild_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  getGuildWelcomeScreen: (input: {
    guild_id: SnowflakeType;
  }) => Promise<GuildWelcomeScreenResponse>;

  updateGuildWelcomeScreen: (input: {
    description?: string | null;
    welcome_channels?: unknown[] | null;
    enabled?: boolean | null;
    guild_id: SnowflakeType;
  }) => Promise<GuildWelcomeScreenResponse>;

  getGuildWidgetSettings: (input: {
    guild_id: SnowflakeType;
  }) => Promise<WidgetSettingsResponse>;

  updateGuildWidgetSettings: (input: {
    channel_id?: null | SnowflakeType;
    enabled?: boolean | null;
    guild_id: SnowflakeType;
  }) => Promise<WidgetSettingsResponse>;

  getGuildWidget: (input: {
    guild_id: SnowflakeType;
  }) => Promise<WidgetResponse>;

  getGuildWidgetPng: (input: {
    guild_id: SnowflakeType;
    style?: WidgetImageStyles;
  }) => Promise<string>;

  createInteractionResponse: (input: {
    body: ApplicationCommandAutocompleteCallbackRequest | CreateMessageInteractionCallbackRequest | LaunchActivityInteractionCallbackRequest | ModalInteractionCallbackRequest | PongInteractionCallbackRequest | SocialLayerSkuPurchaseEligibilityInteractionCallbackRequest | UpdateMessageInteractionCallbackRequest;
    interaction_id: SnowflakeType;
    interaction_token: string;
    with_response?: boolean;
  }) => Promise<InteractionCallbackResponse>;

  inviteResolve: (input: {
    code: string;
    with_counts?: boolean;
    guild_scheduled_event_id?: SnowflakeType;
  }) => Promise<FriendInviteResponse | GroupDmInviteResponse | GuildInviteResponse>;

  inviteRevoke: (input: {
    code: string;
  }) => Promise<FriendInviteResponse | GroupDmInviteResponse | GuildInviteResponse>;

  /**
   * Get the target users for an invite.
   */
  getInviteTargetUsers: (input: {
    code: string;
  }) => Promise<string>;

  /**
   * Update the target users for an existing invite.
   */
  updateInviteTargetUsers: (input: {
    target_users_file: string;
    code: string;
  }) => Promise<RatelimitedResponse>;

  /**
   * Get the target users job status for an invite.
   */
  getInviteTargetUsersJobStatus: (input: {
    code: string;
  }) => Promise<TargetUsersJobStatusResponse>;

  createOrJoinLobby: (input: {
    idle_timeout_seconds?: number | null;
    lobby_metadata?: { [key: string]: unknown } | null;
    member_metadata?: { [key: string]: unknown } | null;
    secret: string;
    flags?: null | 1;
  }) => Promise<LobbyResponse>;

  createLobby: (input: {
    idle_timeout_seconds?: number | null;
    members?: unknown[] | null;
    metadata?: { [key: string]: unknown } | null;
    flags?: null | 1;
    override_event_webhooks_url?: string | null;
  }) => Promise<LobbyResponse>;

  getLobby: (input: {
    lobby_id: SnowflakeType;
  }) => Promise<LobbyResponse>;

  editLobby: (input: {
    idle_timeout_seconds?: number | null;
    metadata?: { [key: string]: unknown } | null;
    members?: unknown[] | null;
    flags?: null | 1;
    override_event_webhooks_url?: string | null;
    lobby_id: SnowflakeType;
  }) => Promise<LobbyResponse>;

  editLobbyChannelLink: (input: {
    channel_id?: null | SnowflakeType;
    lobby_id: SnowflakeType;
  }) => Promise<LobbyResponse>;

  leaveLobby: (input: {
    lobby_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  createLinkedLobbyGuildInviteForSelf: (input: {
    lobby_id: SnowflakeType;
  }) => Promise<LobbyGuildInviteResponse>;

  bulkUpdateLobbyMembers: (input: {
    body: unknown[] | null;
    lobby_id: SnowflakeType;
  }) => Promise<unknown[] | null>;

  addLobbyMember: (input: {
    metadata?: { [key: string]: unknown } | null;
    flags?: null | 1;
    lobby_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<LobbyMemberResponse>;

  deleteLobbyMember: (input: {
    lobby_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  createLinkedLobbyGuildInviteForUser: (input: {
    lobby_id: SnowflakeType;
    user_id: SnowflakeType;
  }) => Promise<LobbyGuildInviteResponse>;

  getLobbyMessages: (input: {
    lobby_id: SnowflakeType;
    limit?: number;
  }) => Promise<unknown[] | null>;

  createLobbyMessage: (input: {
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
    lobby_id: SnowflakeType;
  }) => Promise<LobbyMessageResponse>;

  /**
   * Update the external moderation metadata for a lobby message.
   */
  updateLobbyMessageExternalModerationMetadata: (input: {
    /** The moderation metadata attached to the message */
    body: { [key: string]: string | undefined };
    lobby_id: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  getMyOauth2Authorization: () => Promise<OAuth2GetAuthorizationResponse>;

  getMyOauth2Application: () => Promise<PrivateApplicationResponse>;

  getPublicKeys: () => Promise<OAuth2GetKeys>;

  getOpenidConnectUserinfo: () => Promise<OAuth2GetOpenIdConnectUserInfoResponse>;

  /**
   * Update the external moderation metadata for a user message (DM).
   */
  updateUserMessageExternalModerationMetadata: (input: {
    /** The moderation metadata attached to the message */
    body: { [key: string]: string | undefined };
    user_id_1: SnowflakeType;
    user_id_2: SnowflakeType;
    message_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  partnerSdkUnmergeProvisionalAccount: (input: {
    client_id: SnowflakeType;
    client_secret?: string | null;
    external_auth_token: string;
    external_auth_type: ApplicationIdentityProviderAuthType;
  }) => Promise<RatelimitedResponse>;

  botPartnerSdkUnmergeProvisionalAccount: (input: {
    external_user_id: string;
  }) => Promise<RatelimitedResponse>;

  partnerSdkToken: (input: {
    client_id: SnowflakeType;
    client_secret?: string | null;
    external_auth_token: string;
    external_auth_type: ApplicationIdentityProviderAuthType;
  }) => Promise<ProvisionalTokenResponse>;

  botPartnerSdkToken: (input: {
    provisional_user_id?: null | SnowflakeType;
    external_user_id: string;
    preferred_global_name?: string | null;
  }) => Promise<ProvisionalTokenResponse>;

  getSoundboardDefaultSounds: () => Promise<(SoundboardSoundResponse)[]>;

  createStageInstance: (input: {
    topic: string;
    channel_id: SnowflakeType;
    privacy_level?: null | StageInstancesPrivacyLevels;
    guild_scheduled_event_id?: null | SnowflakeType;
    send_start_notification?: boolean | null;
  }) => Promise<StageInstanceResponse>;

  getStageInstance: (input: {
    channel_id: SnowflakeType;
  }) => Promise<StageInstanceResponse>;

  deleteStageInstance: (input: {
    channel_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateStageInstance: (input: {
    topic?: string;
    privacy_level?: StageInstancesPrivacyLevels;
    channel_id: SnowflakeType;
  }) => Promise<StageInstanceResponse>;

  listStickerPacks: () => Promise<StickerPackCollectionResponse>;

  getStickerPack: (input: {
    pack_id: SnowflakeType;
  }) => Promise<StickerPackResponse>;

  getSticker: (input: {
    sticker_id: SnowflakeType;
  }) => Promise<GuildStickerResponse | StandardStickerResponse>;

  getMyUser: () => Promise<UserPiiResponse>;

  updateMyUser: (input: {
    username: string;
    avatar?: string | null;
    banner?: string | null;
  }) => Promise<UserPiiResponse>;

  getCurrentUserApplicationEntitlements: (input: {
    application_id: SnowflakeType;
    sku_ids?: string | (null | SnowflakeType)[];
    exclude_consumed?: boolean;
  }) => Promise<(EntitlementResponse)[]>;

  getApplicationUserRoleConnection: (input: {
    application_id: SnowflakeType;
  }) => Promise<ApplicationUserRoleConnectionResponse>;

  updateApplicationUserRoleConnection: (input: {
    platform_name?: string | null;
    platform_username?: string | null;
    metadata?: { [key: string]: unknown } | null;
    application_id: SnowflakeType;
  }) => Promise<ApplicationUserRoleConnectionResponse>;

  deleteApplicationUserRoleConnection: (input: {
    application_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  createDm: (input: {
    recipient_id?: null | SnowflakeType;
    access_tokens?: unknown[] | null;
    nicks?: { [key: string]: unknown } | null;
  }) => Promise<PrivateChannelResponse | PrivateGroupChannelResponse>;

  listMyConnections: () => Promise<unknown[] | null>;

  listMyGuilds: (input: {
    before?: SnowflakeType;
    after?: SnowflakeType;
    limit?: number;
    with_counts?: boolean;
  }) => Promise<unknown[] | null>;

  leaveGuild: (input: {
    guild_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  getMyGuildMember: (input: {
    guild_id: SnowflakeType;
  }) => Promise<PrivateGuildMemberResponse>;

  getUser: (input: {
    user_id: SnowflakeType;
  }) => Promise<UserResponse>;

  listVoiceRegions: () => Promise<unknown[] | null>;

  getWebhook: (input: {
    webhook_id: SnowflakeType;
  }) => Promise<ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse>;

  deleteWebhook: (input: {
    webhook_id: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateWebhook: (input: {
    name?: string;
    avatar?: string | null;
    channel_id?: null | SnowflakeType;
    webhook_id: SnowflakeType;
  }) => Promise<ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse>;

  getWebhookByToken: (input: {
    webhook_id: SnowflakeType;
    webhook_token: string;
  }) => Promise<ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse>;

  executeWebhook: (input: {
    body: IncomingWebhookRequestPartial | IncomingWebhookUpdateRequestPartial;
    webhook_id: SnowflakeType;
    webhook_token: string;
    wait?: boolean;
    thread_id?: SnowflakeType;
    with_components?: boolean;
  }) => Promise<MessageResponse>;

  deleteWebhookByToken: (input: {
    webhook_id: SnowflakeType;
    webhook_token: string;
  }) => Promise<RatelimitedResponse>;

  updateWebhookByToken: (input: {
    name?: string;
    avatar?: string | null;
    webhook_id: SnowflakeType;
    webhook_token: string;
  }) => Promise<ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse>;

  executeGithubCompatibleWebhook: (input: {
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
    webhook_id: SnowflakeType;
    webhook_token: string;
    wait?: boolean;
    thread_id?: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  getOriginalWebhookMessage: (input: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    thread_id?: SnowflakeType;
  }) => Promise<MessageResponse>;

  deleteOriginalWebhookMessage: (input: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    thread_id?: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateOriginalWebhookMessage: (input: {
    content?: string | null;
    embeds?: unknown[] | null;
    allowed_mentions?: null | MessageAllowedMentionsRequest;
    components?: unknown[] | null;
    attachments?: unknown[] | null;
    poll?: null | PollCreateRequest;
    flags?: number | null;
    webhook_id: SnowflakeType;
    webhook_token: string;
    thread_id?: SnowflakeType;
    with_components?: boolean;
  }) => Promise<MessageResponse>;

  getWebhookMessage: (input: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    message_id: SnowflakeType;
    thread_id?: SnowflakeType;
  }) => Promise<MessageResponse>;

  deleteWebhookMessage: (input: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    message_id: SnowflakeType;
    thread_id?: SnowflakeType;
  }) => Promise<RatelimitedResponse>;

  updateWebhookMessage: (input: {
    content?: string | null;
    embeds?: unknown[] | null;
    allowed_mentions?: null | MessageAllowedMentionsRequest;
    components?: unknown[] | null;
    attachments?: unknown[] | null;
    poll?: null | PollCreateRequest;
    flags?: number | null;
    webhook_id: SnowflakeType;
    webhook_token: string;
    message_id: SnowflakeType;
    thread_id?: SnowflakeType;
    with_components?: boolean;
  }) => Promise<MessageResponse>;

  executeSlackCompatibleWebhook: (input: {
    text?: string | null;
    username?: string | null;
    icon_url?: string | null;
    attachments?: unknown[] | null;
    webhook_id: SnowflakeType;
    webhook_token: string;
    wait?: boolean;
    thread_id?: SnowflakeType;
  }) => Promise<string | null>;
};

export * from "./schemas.js";
