import type { AddChapterResponseModel, AddKnowledgeBaseResponseModel, AddProjectResponseModel, AddPronunciationDictionaryResponseModel, AddVoiceIvcResponseModel, AddVoiceResponseModel, AddWorkspaceGroupMemberResponseModel, AddWorkspaceInviteResponseModel, AdditionalFormats, AdhocAgentConfigOverrideForTestRequestModel, AgentBranchResponse, AgentCallLimits, AgentDeploymentRequest, AgentDeploymentResponse, AgentPlatformSettingsRequestModel, AgentSimulatedChatTestResponseModel, AgentSortBy, AgentSummaryBatchSuccessfulResponseModel, AgentVersionMetadata, AgentWorkflowRequestModel, AllowedOutputFormats, ApiIntegrationOAuth2AuthCodeResponse, ApiIntegrationOAuth2CustomAppResponse, AsrConversationalConfig, AudioNativeCreateProjectResponseModel, AudioNativeEditContentResponseModel, AudioWithTimestampsAndVoiceSegmentsResponseModel, AudioWithTimestampsResponseModel, AuthConnectionLocator, BaseTurnConfig, BasicAuthResponse, BatchCallDetailedResponse, BatchCallResponse, BatchCallWhatsAppParams, BatchFailureResponseModel, BearerAuthResponse, BranchProtectionStatus, BreakdownTypes, ChapterContentInputModel, ChapterSnapshotExtendedResponseModel, ChapterSnapshotsResponseModel, ChapterWithContentResponseModel, ClientToolConfigInput, ColumnFilter, ConstantSchemaOverride, ConvAiDynamicVariable, ConvAiEnvVarLocator, ConvAiFileUploadResponseModel, ConvAiSecretLocator, ConvAiWebhooks, ConvAiWorkspaceStoredSecretConfig, ConversationConfigInput, ConversationInitiationClientDataRequestInput, ConversationInitiationClientDataWebhook, ConversationInitiationSource, ConversationSignedUrlResponseModel, ConversationSimulationSpecification, ConversationTagResponseModel, ConversationalConfigApiModelInput, ConvertChapterResponseModel, ConvertProjectResponseModel, CreateAgentBranchResponseModel, CreateAgentResponseModel, CreateAgentTestFolderResponseModel, CreateAgentTestResponseModel, CreateAuthConnectionEnvironmentVariableRequest, CreateBasicAuthRequest, CreateBearerAuthRequest, CreateCustomHeaderAuthRequest, CreateExotelPhoneNumberRequest, CreateMtlsAuthRequest, CreateOAuth2ClientCredsRequest, CreateOAuth2JwtRequest, CreateOrderRequest, CreateOrderResponse, CreatePhoneNumberResponseModel, CreatePrivateKeyJwtRequest, CreatePronunciationDictionaryResponseModel, CreateResponseUnitTestRequest, CreateSecretEnvironmentVariableRequest, CreateSimulationTestRequest, CreateSipTrunkPhoneNumberRequestV2, CreateStringEnvironmentVariableRequest, CreateToolCallUnitTestRequest, CreateTwilioPhoneNumberRequest, CustomHeaderAuthResponse, DashboardCallSuccessChartModel, DashboardCriteriaChartModel, DashboardDataCollectionChartModel, DeleteChapterResponseModel, DeleteDubbingResponseModel, DeleteHistoryItemResponse, DeleteProjectResponseModel, DeleteSampleResponseModel, DeleteVoiceResponseModel, DeleteVoiceSampleResponseModel, DeleteWorkspaceGroupMemberResponseModel, DeleteWorkspaceInviteResponseModel, DeleteWorkspaceWebhookResponseModel, DialogueInput, DoDubbingResponseModel, DubbingMetadataPageResponseModel, DubbingMetadataResponse, DubbingRenderResponseModel, DubbingResource, DubbingTranscriptResponseModel, DubbingTranscriptsResponseModel, DynamicVariableAssignment, DynamicVariableSchemaOverride, EditChapterResponseModel, EditProjectResponseModel, EditVoiceResponseModel, EditVoiceSettingsResponseModel, EmbeddingModelEnum, EnvironmentAuthConnectionLocator, EnvironmentVariableAuthConnectionValueRequest, EnvironmentVariableResponse, EnvironmentVariableSecretValueRequest, EnvironmentVariablesListResponse, EvaluationSuccessResult, ExotelOutboundCallResponse, ExtendedSubscriptionResponseModel, ForcedAlignmentResponseModel, GetAgentEmbedResponseModel, GetAgentKnowledgebaseSizeResponseModel, GetAgentLinkResponseModel, GetAgentResponseModel, GetAgentTestFolderResponseModel, GetAgentTopicsResponseModel, GetAgentsPageResponseModel, GetAudioIsolationHistoryResponseModel, GetAudioNativeProjectSettingsResponseModel, GetChaptersResponseModel, GetConvAiDashboardSettingsResponseModel, GetConvAiSettingsResponseModel, GetConversationResponseModel, GetConversationTagsPageResponseModel, GetConversationUsersPageResponseModel, GetConversationsPageResponseModel, GetKnowledgeBaseDependentAgentsResponseModel, GetKnowledgeBaseFileResponseModel, GetKnowledgeBaseFolderResponseModel, GetKnowledgeBaseListResponseModel, GetKnowledgeBaseTextResponseModel, GetKnowledgeBaseUrlResponseModel, GetLibraryVoicesResponseModel, GetLiveCountResponse, GetOrCreateRagIndexRequestModel, GetPhoneNumberExotelResponseModel, GetPhoneNumberSipTrunkResponseModel, GetPhoneNumberTwilioResponseModel, GetProjectsResponseModel, GetPronunciationDictionariesMetadataResponseModel, GetPronunciationDictionaryMetadataResponseModel, GetPronunciationDictionaryWithRulesResponseModel, GetResponseUnitTestResponseModel, GetSecretDependenciesResponseModel, GetSimulationTestResponseModel, GetSipLogMessagesResponse, GetSpeechHistoryResponseModel, GetTestInvocationsPageResponseModel, GetTestSuiteInvocationResponseModel, GetTestsPageResponseModel, GetTestsSummariesByIdsResponseModel, GetToolCallUnitTestResponseModel, GetToolDependentAgentsResponseModel, GetToolExecutionsPageResponseModel, GetVoicesResponseModel, GetVoicesV2ResponseModel, GetWhatsAppAccountResponse, GetWorkspaceSecretsResponseModel, HttpValidationError, InboundSipTrunkConfigRequestModel, ItemId, KnowledgeBaseContentSearchResponseModel, KnowledgeBaseDependentType, KnowledgeBaseDocumentChunkResponseModel, KnowledgeBaseDocumentChunksResponseModel, KnowledgeBaseDocumentType, KnowledgeBaseSortBy, KnowledgeBaseSourceFileUrlResponseModel, KnowledgeBaseSummaryBatchSuccessfulResponseModel, LanguageAddedResponse, LanguagesResponse, ListAuthConnectionsResponse, ListMcpToolsResponseModel, ListOrdersResponse, ListResponseAgentBranchSummary, ListSpeechEnginesResponse, ListWhatsAppAccountsResponse, LivekitStackType, LlmListResponseModelInput, LlmSchemaOverride, LlmUsageCalculatorResponseModel, McpApprovalPolicy, McpServerConfigInput, McpServerResponseModel, McpServersResponseModel, McpToolApprovalPolicy, McpToolConfigInput, McpToolConfigOverrideOutput, MediaId, MessageSearchSortBy, MessagesSearchResponse, MetricType, ModelResponseModel, ModelSettingsResponseModel, MtlsAuthResponse, MultichannelSpeechToTextResponseModel, MusicGenerationMode, MusicPrompt, MusicUploadResponse, OAuth2ClientCredsResponse, OAuth2JwtResponse, OrderDeliverablesResponse, OrderId, OrderItemKind, OrderMediaResponse, OrderRequestState, OrderResponse, OutboundCallRecipient, OutboundSipTrunkConfigRequestModel, PatchWorkspaceWebhookResponseModel, PermissionType, PodcastBulletinMode, PodcastConversationMode, PodcastProjectResponseModel, PodcastTextSource, PodcastUrlSource, PostAgentAvatarResponseModel, PostWorkspaceSecretResponseModel, PreToolSpeechMode, PrivacyConfigInput, PrivateKeyJwtResponse, ProjectExtendedResponseModel, ProjectMutedTracksResponseModel, ProjectSnapshotExtendedResponseModel, ProjectSnapshotsResponseModel, PromptEvaluationCriteria, PronunciationDictionaryAliasRuleRequestModel, PronunciationDictionaryPhonemeRuleRequestModel, PronunciationDictionaryRulesResponseModel, PronunciationDictionaryVersionLocatorDbModel, PronunciationDictionaryVersionLocatorRequestModel, QualityPresetType, RagDocumentIndexResponseModel, RagDocumentIndexesResponseModel, RagIndexBatchSuccessfulResponseModel, RagIndexOverviewResponseModel, RegisterMediaResponse, RemoveOrderItemResponse, RenderType, RequestPvcManualVerificationResponseModel, ResourceMetadataResponseModel, SampleResponseModel, SeatType, SecretDependencyResourceType, SegmentCreateResponse, SegmentDeleteResponse, SegmentDubResponse, SegmentMigrationResponse, SegmentTranscriptionResponse, SegmentTranslationResponse, SegmentUpdateResponse, SimilarVoicesForSpeakerResponse, SingleTestRunRequestModel, SingleUseTokenResponseModel, SingleUseTokenType, SipTrunkOutboundCallResponse, SlackBotAuthResponse, SortDirection, SpeakerAudioResponseModel, SpeakerCreatedResponse, SpeakerSeparationResponseModel, SpeakerUpdatedResponse, SpeechEngineConfig, SpeechEngineConversationInitiationClientDataConfig, SpeechEngineResponse, SpeechHistoryItemResponseModel, SpeechToTextChunkResponseModel, StartPvcVoiceTrainingResponseModel, StartSpeakerSeparationResponseModel, StreamingAudioChunkWithTimestampsAndVoiceSegmentsResponseModel, StreamingAudioChunkWithTimestampsResponseModel, SubmitOrderResponse, SystemToolConfigInput, TelephonyCallConfig, TelephonyDirection, TestSharingMode, TestType, TokenResponseModel, ToolCallSoundBehavior, ToolCallSoundType, ToolExecutionMode, ToolResponseMockConfigInput, ToolResponseModel, ToolSortBy, ToolTypeFilter, ToolsResponseModel, TtsConversationalConfigInput, TwilioOutboundCallResponse, UpdateBasicAuthRequest, UpdateOAuth2ClientCredsRequest, UpdateOAuth2JwtRequest, UpdateOrderRequest, UpdateOrderResponse, UpdateResponseUnitTestRequest, UpdateSimulationTestRequest, UpdateToolCallUnitTestRequest, UpdateWorkspaceMemberResponseModel, UpsertOrderItemRequest, UpsertOrderItemResponse, UsageAggregationInterval, UsageCharactersResponseModel, UserFeedbackScore, UserResponseModel, UsersSortBy, VerifyPvcVoiceCaptchaResponseModel, VoicePreviewsResponseModel, VoiceResponseModel, VoiceSamplePreviewResponseModel, VoiceSampleVisualWaveformResponseModel, VoiceSettingsResponseModel, WebhookHmacSettings, WebhookToolConfigInput, WhatsAppAuthResponse, WhatsAppOutboundCallResponse, WhatsAppOutboundMessageResponse, WhatsAppTemplateBodyComponentParams, WhatsAppTemplateButtonComponentParams, WhatsAppTemplateHeaderComponentParams, WorkspaceAnalyticsQueryResponseModel, WorkspaceApiKeyListResponseModel, WorkspaceAuditLogsPageResponse, WorkspaceBatchCallsResponse, WorkspaceCreateApiKeyResponseModel, WorkspaceCreateWebhookResponseModel, WorkspaceGroupByNameResponseModel, WorkspaceGroupResponseModel, WorkspaceResourceType, WorkspaceServiceAccountListResponseModel, WorkspaceWebhookListResponseModel } from "./schemas.js";

export type ElevenlabsClient = {
  /**
   * List Generated Items
   */
  getSpeechHistory: (input: {
    /** How many history items to return at maximum. Can not exceed 1000, defaults to 100. */
    page_size?: number;
    /** After which ID to start fetching, use this parameter to paginate across a large collection of history items. In case this parameter is not provided history items will be fetched starting from the most recently created one ordered descending by their creation date. */
    start_after_history_item_id?: string | null;
    /** Voice ID to be filtered for, you can use GET https://api.elevenlabs.io/v1/voices to receive a list of voices and their IDs. */
    voice_id?: string | null;
    /** Model ID to filter history items by. */
    model_id?: string | null;
    /** Unix timestamp to filter history items before this date (exclusive). */
    date_before_unix?: number | null;
    /** Unix timestamp to filter history items after this date (inclusive). */
    date_after_unix?: number | null;
    /** Sort direction for the results. */
    sort_direction?: "asc" | "desc" | null;
    /** search term used for filtering */
    search?: string | null;
    /** Source of the generated history item */
    source?: "TTS" | "STS" | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetSpeechHistoryResponseModel>;

  /**
   * Get History Item
   */
  getSpeechHistoryItemById: (input: {
    /** History item ID to be used, you can use GET https://api.elevenlabs.io/v1/history to receive a list of history items and their IDs. */
    history_item_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SpeechHistoryItemResponseModel>;

  /**
   * Delete History Item
   */
  deleteSpeechHistoryItem: (input: {
    /** History item ID to be used, you can use GET https://api.elevenlabs.io/v1/history to receive a list of history items and their IDs. */
    history_item_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DeleteHistoryItemResponse>;

  /**
   * Get Audio From History Item
   */
  getAudioFullFromSpeechHistoryItem: (input: {
    /** History item ID to be used, you can use GET https://api.elevenlabs.io/v1/history to receive a list of history items and their IDs. */
    history_item_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Download History Items
   */
  downloadSpeechHistoryItems: (input: {
    /** A list of history items to download, you can get IDs of history items and other metadata using the GET https://api.elevenlabs.io/v1/history endpoint. */
    history_item_ids: (string)[];
    /** Output format to transcode the audio file, can be wav or default. */
    output_format?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Sound Generation
   */
  soundGeneration: (input: {
    /** The text that will get converted into a sound effect. */
    text: string;
    /** Whether to create a sound effect that loops smoothly. Only available for the 'eleven_text_to_sound_v2 model'. */
    loop?: boolean;
    /** The duration of the sound which will be generated in seconds. Must be at least 0.5 and at most 30. If set to None we will guess the optimal duration using the prompt. Defaults to None. */
    duration_seconds?: number | null;
    /** A higher prompt influence makes your generation follow the prompt more closely while also making generations less variable. Must be a value between 0 and 1. Defaults to 0.3. */
    prompt_influence?: number | null;
    /** The model ID to use for the sound generation. */
    model_id?: string;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Audio Isolation
   */
  audioIsolation: (input: {
    /** The audio file from which vocals/speech will be isolated from. */
    audio: string;
    /** The format of input audio. Options are 'pcm_s16le_16' or 'other' For `pcm_s16le_16`, the input audio must be 16-bit PCM at a 16kHz sample rate, single channel (mono), and little-endian byte order. Latency will be lower than with passing an encoded waveform. */
    file_format?: "pcm_s16le_16" | "other" | null;
    /** Optional preview image base64 for tracking this generation. */
    preview_b64?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Get Audio Isolation History
   */
  getAudioIsolationHistory: (input: {
    /** How many history items to return at maximum. Defaults to 100. */
    page_size?: number;
    /** Page number for search pagination (1-based). Only used when search is provided. */
    page?: number;
    /** Optional search term used for filtering audio isolation history (title/text). */
    search?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAudioIsolationHistoryResponseModel>;

  /**
   * Delete Audio Isolation History Item
   */
  deleteAudioIsolationHistoryItem: (input: {
    /** Identifier of the audio isolation history item. */
    history_item_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Audio Isolation Stream
   */
  audioIsolationStream: (input: {
    /** The audio file from which vocals/speech will be isolated from. */
    audio: string;
    /** The format of input audio. Options are 'pcm_s16le_16' or 'other' For `pcm_s16le_16`, the input audio must be 16-bit PCM at a 16kHz sample rate, single channel (mono), and little-endian byte order. Latency will be lower than with passing an encoded waveform. */
    file_format?: "pcm_s16le_16" | "other" | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Delete Sample
   */
  deleteSample: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** Sample ID to be used, you can use GET https://api.elevenlabs.io/v1/voices/{voice_id} to list all the available samples for a voice. */
    sample_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DeleteSampleResponseModel>;

  /**
   * Get Audio From Sample
   */
  getAudioFromSample: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** Sample ID to be used, you can use GET https://api.elevenlabs.io/v1/voices/{voice_id} to list all the available samples for a voice. */
    sample_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Text To Speech
   */
  textToSpeechFull: (input: {
    /** The text that will get converted into speech. */
    text: string;
    /** Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for text to speech, you can check this using the can_do_text_to_speech property. */
    model_id?: string;
    /** Language code (ISO 639-1) used to enforce a language for the model and text normalization. If the model does not support provided language code, an error will be returned. */
    language_code?: string | null;
    /** Voice settings overriding stored settings for the given voice. They are applied only on the given request. */
    voice_settings?: VoiceSettingsResponseModel | null;
    /** A list of pronunciation dictionary locators (id, version_id) to be applied to the text. They will be applied in order. You may have up to 3 locators per request */
    pronunciation_dictionary_locators?: (PronunciationDictionaryVersionLocatorRequestModel)[] | null;
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295. */
    seed?: number | null;
    /** The text that came before the text of the current request. Can be used to improve the speech's continuity when concatenating together multiple generations or to influence the speech's continuity in the current generation. */
    previous_text?: string | null;
    /** The text that comes after the text of the current request. Can be used to improve the speech's continuity when concatenating together multiple generations or to influence the speech's continuity in the current generation. */
    next_text?: string | null;
    /** A list of request_id of the samples that were generated before this generation. Can be used to improve the speech's continuity when splitting up a large task into multiple requests. The results will be best when the same model is used across the generations. In case both previous_text and previous_request_ids is send, previous_text will be ignored. A maximum of 3 request_ids can be send. */
    previous_request_ids?: (string)[] | null;
    /** A list of request_id of the samples that come after this generation. next_request_ids is especially useful for maintaining the speech's continuity when regenerating a sample that has had some audio quality issues. For example, if you have generated 3 speech clips, and you want to improve clip 2, passing the request id of clip 3 as a next_request_id (and that of clip 1 as a previous_request_id) will help maintain natural flow in the combined speech. The results will be best when the same model is used across the generations. In case both next_text and next_request_ids is send, next_text will be ignored. A maximum of 3 request_ids can be send. */
    next_request_ids?: (string)[] | null;
    /** If true, we won't use PVC version of the voice for the generation but the IVC version. This is a temporary workaround for higher latency in PVC versions. */
    use_pvc_as_ivc?: boolean;
    /** This parameter controls text normalization with three modes: 'auto', 'on', and 'off'. When set to 'auto', the system will automatically decide whether to apply text normalization (e.g., spelling out numbers). With 'on', text normalization will always be applied, while with 'off', it will be skipped. */
    apply_text_normalization?: "auto" | "on" | "off";
    /** This parameter controls language text normalization. This helps with proper pronunciation of text in some supported languages. WARNING: This parameter can heavily increase the latency of the request. Currently only supported for Japanese. */
    apply_language_text_normalization?: boolean;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers. */
    enable_logging?: boolean;
    /** You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values: 0 - default mode (no latency optimizations) 1 - normal latency optimizations (about 50% of possible latency improvement of option 3) 2 - strong latency optimizations (about 75% of possible latency improvement of option 3) 3 - max latency optimizations 4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).  Defaults to None.  */
    optimize_streaming_latency?: number | null;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: "alaw_8000" | "mp3_22050_32" | "mp3_24000_48" | "mp3_44100_128" | "mp3_44100_192" | "mp3_44100_32" | "mp3_44100_64" | "mp3_44100_96" | "opus_48000_128" | "opus_48000_192" | "opus_48000_32" | "opus_48000_64" | "opus_48000_96" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_32000" | "pcm_44100" | "pcm_48000" | "pcm_8000" | "ulaw_8000" | "wav_16000" | "wav_22050" | "wav_24000" | "wav_32000" | "wav_44100" | "wav_48000" | "wav_8000";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Text To Speech With Timestamps
   */
  textToSpeechFullWithTimestamps: (input: {
    /** The text that will get converted into speech. */
    text: string;
    /** Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for text to speech, you can check this using the can_do_text_to_speech property. */
    model_id?: string;
    /** Language code (ISO 639-1) used to enforce a language for the model and text normalization. If the model does not support provided language code, an error will be returned. */
    language_code?: string | null;
    /** Voice settings overriding stored settings for the given voice. They are applied only on the given request. */
    voice_settings?: VoiceSettingsResponseModel | null;
    /** A list of pronunciation dictionary locators (id, version_id) to be applied to the text. They will be applied in order. You may have up to 3 locators per request */
    pronunciation_dictionary_locators?: (PronunciationDictionaryVersionLocatorRequestModel)[];
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295. */
    seed?: number | null;
    /** The text that came before the text of the current request. Can be used to improve the speech's continuity when concatenating together multiple generations or to influence the speech's continuity in the current generation. */
    previous_text?: string | null;
    /** The text that comes after the text of the current request. Can be used to improve the speech's continuity when concatenating together multiple generations or to influence the speech's continuity in the current generation. */
    next_text?: string | null;
    /** A list of request_id of the samples that were generated before this generation. Can be used to improve the speech's continuity when splitting up a large task into multiple requests. The results will be best when the same model is used across the generations. In case both previous_text and previous_request_ids is send, previous_text will be ignored. A maximum of 3 request_ids can be send. */
    previous_request_ids?: (string)[];
    /** A list of request_id of the samples that come after this generation. next_request_ids is especially useful for maintaining the speech's continuity when regenerating a sample that has had some audio quality issues. For example, if you have generated 3 speech clips, and you want to improve clip 2, passing the request id of clip 3 as a next_request_id (and that of clip 1 as a previous_request_id) will help maintain natural flow in the combined speech. The results will be best when the same model is used across the generations. In case both next_text and next_request_ids is send, next_text will be ignored. A maximum of 3 request_ids can be send. */
    next_request_ids?: (string)[];
    /** If true, we won't use PVC version of the voice for the generation but the IVC version. This is a temporary workaround for higher latency in PVC versions. */
    use_pvc_as_ivc?: boolean;
    /** This parameter controls text normalization with three modes: 'auto', 'on', and 'off'. When set to 'auto', the system will automatically decide whether to apply text normalization (e.g., spelling out numbers). With 'on', text normalization will always be applied, while with 'off', it will be skipped. */
    apply_text_normalization?: "auto" | "on" | "off";
    /** This parameter controls language text normalization. This helps with proper pronunciation of text in some supported languages. WARNING: This parameter can heavily increase the latency of the request. Currently only supported for Japanese. */
    apply_language_text_normalization?: boolean;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers. */
    enable_logging?: boolean;
    /** You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values: 0 - default mode (no latency optimizations) 1 - normal latency optimizations (about 50% of possible latency improvement of option 3) 2 - strong latency optimizations (about 75% of possible latency improvement of option 3) 3 - max latency optimizations 4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).  Defaults to None.  */
    optimize_streaming_latency?: number | null;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: "alaw_8000" | "mp3_22050_32" | "mp3_24000_48" | "mp3_44100_128" | "mp3_44100_192" | "mp3_44100_32" | "mp3_44100_64" | "mp3_44100_96" | "opus_48000_128" | "opus_48000_192" | "opus_48000_32" | "opus_48000_64" | "opus_48000_96" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_32000" | "pcm_44100" | "pcm_48000" | "pcm_8000" | "ulaw_8000" | "wav_16000" | "wav_22050" | "wav_24000" | "wav_32000" | "wav_44100" | "wav_48000" | "wav_8000";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AudioWithTimestampsResponseModel>;

  /**
   * Text To Speech Streaming
   */
  textToSpeechStream: (input: {
    /** The text that will get converted into speech. */
    text: string;
    /** Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for text to speech, you can check this using the can_do_text_to_speech property. */
    model_id?: string;
    /** Language code (ISO 639-1) used to enforce a language for the model and text normalization. If the model does not support provided language code, an error will be returned. */
    language_code?: string | null;
    /** Voice settings overriding stored settings for the given voice. They are applied only on the given request. */
    voice_settings?: VoiceSettingsResponseModel | null;
    /** A list of pronunciation dictionary locators (id, version_id) to be applied to the text. They will be applied in order. You may have up to 3 locators per request */
    pronunciation_dictionary_locators?: (PronunciationDictionaryVersionLocatorRequestModel)[] | null;
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295. */
    seed?: number | null;
    /** The text that came before the text of the current request. Can be used to improve the speech's continuity when concatenating together multiple generations or to influence the speech's continuity in the current generation. */
    previous_text?: string | null;
    /** The text that comes after the text of the current request. Can be used to improve the speech's continuity when concatenating together multiple generations or to influence the speech's continuity in the current generation. */
    next_text?: string | null;
    /** A list of request_id of the samples that were generated before this generation. Can be used to improve the speech's continuity when splitting up a large task into multiple requests. The results will be best when the same model is used across the generations. In case both previous_text and previous_request_ids is send, previous_text will be ignored. A maximum of 3 request_ids can be send. */
    previous_request_ids?: (string)[] | null;
    /** A list of request_id of the samples that come after this generation. next_request_ids is especially useful for maintaining the speech's continuity when regenerating a sample that has had some audio quality issues. For example, if you have generated 3 speech clips, and you want to improve clip 2, passing the request id of clip 3 as a next_request_id (and that of clip 1 as a previous_request_id) will help maintain natural flow in the combined speech. The results will be best when the same model is used across the generations. In case both next_text and next_request_ids is send, next_text will be ignored. A maximum of 3 request_ids can be send. */
    next_request_ids?: (string)[] | null;
    /** If true, we won't use PVC version of the voice for the generation but the IVC version. This is a temporary workaround for higher latency in PVC versions. */
    use_pvc_as_ivc?: boolean;
    /** This parameter controls text normalization with three modes: 'auto', 'on', and 'off'. When set to 'auto', the system will automatically decide whether to apply text normalization (e.g., spelling out numbers). With 'on', text normalization will always be applied, while with 'off', it will be skipped. */
    apply_text_normalization?: "auto" | "on" | "off";
    /** This parameter controls language text normalization. This helps with proper pronunciation of text in some supported languages. WARNING: This parameter can heavily increase the latency of the request. Currently only supported for Japanese. */
    apply_language_text_normalization?: boolean;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers. */
    enable_logging?: boolean;
    /** You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values: 0 - default mode (no latency optimizations) 1 - normal latency optimizations (about 50% of possible latency improvement of option 3) 2 - strong latency optimizations (about 75% of possible latency improvement of option 3) 3 - max latency optimizations 4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).  Defaults to None.  */
    optimize_streaming_latency?: number | null;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: "mp3_22050_32" | "mp3_24000_48" | "mp3_44100_32" | "mp3_44100_64" | "mp3_44100_96" | "mp3_44100_128" | "mp3_44100_192" | "pcm_8000" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_32000" | "pcm_44100" | "pcm_48000" | "ulaw_8000" | "alaw_8000" | "opus_48000_32" | "opus_48000_64" | "opus_48000_96" | "opus_48000_128" | "opus_48000_192";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Text To Speech Streaming With Timestamps
   */
  textToSpeechStreamWithTimestamps: (input: {
    /** The text that will get converted into speech. */
    text: string;
    /** Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for text to speech, you can check this using the can_do_text_to_speech property. */
    model_id?: string;
    /** Language code (ISO 639-1) used to enforce a language for the model and text normalization. If the model does not support provided language code, an error will be returned. */
    language_code?: string | null;
    /** Voice settings overriding stored settings for the given voice. They are applied only on the given request. */
    voice_settings?: VoiceSettingsResponseModel | null;
    /** A list of pronunciation dictionary locators (id, version_id) to be applied to the text. They will be applied in order. You may have up to 3 locators per request */
    pronunciation_dictionary_locators?: (PronunciationDictionaryVersionLocatorRequestModel)[] | null;
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295. */
    seed?: number | null;
    /** The text that came before the text of the current request. Can be used to improve the speech's continuity when concatenating together multiple generations or to influence the speech's continuity in the current generation. */
    previous_text?: string | null;
    /** The text that comes after the text of the current request. Can be used to improve the speech's continuity when concatenating together multiple generations or to influence the speech's continuity in the current generation. */
    next_text?: string | null;
    /** A list of request_id of the samples that were generated before this generation. Can be used to improve the speech's continuity when splitting up a large task into multiple requests. The results will be best when the same model is used across the generations. In case both previous_text and previous_request_ids is send, previous_text will be ignored. A maximum of 3 request_ids can be send. */
    previous_request_ids?: (string)[] | null;
    /** A list of request_id of the samples that come after this generation. next_request_ids is especially useful for maintaining the speech's continuity when regenerating a sample that has had some audio quality issues. For example, if you have generated 3 speech clips, and you want to improve clip 2, passing the request id of clip 3 as a next_request_id (and that of clip 1 as a previous_request_id) will help maintain natural flow in the combined speech. The results will be best when the same model is used across the generations. In case both next_text and next_request_ids is send, next_text will be ignored. A maximum of 3 request_ids can be send. */
    next_request_ids?: (string)[] | null;
    /** If true, we won't use PVC version of the voice for the generation but the IVC version. This is a temporary workaround for higher latency in PVC versions. */
    use_pvc_as_ivc?: boolean;
    /** This parameter controls text normalization with three modes: 'auto', 'on', and 'off'. When set to 'auto', the system will automatically decide whether to apply text normalization (e.g., spelling out numbers). With 'on', text normalization will always be applied, while with 'off', it will be skipped. */
    apply_text_normalization?: "auto" | "on" | "off";
    /** This parameter controls language text normalization. This helps with proper pronunciation of text in some supported languages. WARNING: This parameter can heavily increase the latency of the request. Currently only supported for Japanese. */
    apply_language_text_normalization?: boolean;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers. */
    enable_logging?: boolean;
    /** You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values: 0 - default mode (no latency optimizations) 1 - normal latency optimizations (about 50% of possible latency improvement of option 3) 2 - strong latency optimizations (about 75% of possible latency improvement of option 3) 3 - max latency optimizations 4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).  Defaults to None.  */
    optimize_streaming_latency?: number | null;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: "mp3_22050_32" | "mp3_24000_48" | "mp3_44100_32" | "mp3_44100_64" | "mp3_44100_96" | "mp3_44100_128" | "mp3_44100_192" | "pcm_8000" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_32000" | "pcm_44100" | "pcm_48000" | "ulaw_8000" | "alaw_8000" | "opus_48000_32" | "opus_48000_64" | "opus_48000_96" | "opus_48000_128" | "opus_48000_192";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<StreamingAudioChunkWithTimestampsResponseModel>;

  /**
   * Text To Dialogue (Multi-Voice)
   */
  textToDialogue: (input: {
    /** A list of dialogue inputs, each containing text and a voice ID which will be converted into speech. The maximum number of unique voice IDs is 10. For reliable generation, keep the total character count across all `inputs[].text` values at or below 2,000 characters per request. Longer requests can terminate early in streaming responses or return a validation error. */
    inputs: (DialogueInput)[];
    /** Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for text to speech, you can check this using the can_do_text_to_speech property. */
    model_id?: string;
    /** Language code (ISO 639-1) used to enforce a language for the model and text normalization. If the model does not support provided language code, an error will be returned. */
    language_code?: string | null;
    /** Settings controlling the dialogue generation. */
    settings?: ModelSettingsResponseModel | null;
    /** A list of pronunciation dictionary locators (id, version_id) to be applied to the text. They will be applied in order. You may have up to 3 locators per request */
    pronunciation_dictionary_locators?: (PronunciationDictionaryVersionLocatorRequestModel)[] | null;
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295. */
    seed?: number | null;
    /** This parameter controls text normalization with three modes: 'auto', 'on', and 'off'. When set to 'auto', the system will automatically decide whether to apply text normalization (e.g., spelling out numbers). With 'on', text normalization will always be applied, while with 'off', it will be skipped. */
    apply_text_normalization?: "auto" | "on" | "off";
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: "alaw_8000" | "mp3_22050_32" | "mp3_24000_48" | "mp3_44100_128" | "mp3_44100_192" | "mp3_44100_32" | "mp3_44100_64" | "mp3_44100_96" | "opus_48000_128" | "opus_48000_192" | "opus_48000_32" | "opus_48000_64" | "opus_48000_96" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_32000" | "pcm_44100" | "pcm_48000" | "pcm_8000" | "ulaw_8000" | "wav_16000" | "wav_22050" | "wav_24000" | "wav_32000" | "wav_44100" | "wav_48000" | "wav_8000";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Text To Dialogue (Multi-Voice) Streaming
   */
  textToDialogueStream: (input: {
    /** A list of dialogue inputs, each containing text and a voice ID which will be converted into speech. The maximum number of unique voice IDs is 10. For reliable generation, keep the total character count across all `inputs[].text` values at or below 2,000 characters per request. Longer requests can terminate early in streaming responses or return a validation error. */
    inputs: (DialogueInput)[];
    /** Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for text to speech, you can check this using the can_do_text_to_speech property. */
    model_id?: string;
    /** Language code (ISO 639-1) used to enforce a language for the model and text normalization. If the model does not support provided language code, an error will be returned. */
    language_code?: string | null;
    /** Settings controlling the dialogue generation. */
    settings?: ModelSettingsResponseModel | null;
    /** A list of pronunciation dictionary locators (id, version_id) to be applied to the text. They will be applied in order. You may have up to 3 locators per request */
    pronunciation_dictionary_locators?: (PronunciationDictionaryVersionLocatorRequestModel)[] | null;
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295. */
    seed?: number | null;
    /** This parameter controls text normalization with three modes: 'auto', 'on', and 'off'. When set to 'auto', the system will automatically decide whether to apply text normalization (e.g., spelling out numbers). With 'on', text normalization will always be applied, while with 'off', it will be skipped. */
    apply_text_normalization?: "auto" | "on" | "off";
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Text To Dialogue Streaming With Timestamps
   */
  textToDialogueStreamWithTimestamps: (input: {
    /** A list of dialogue inputs, each containing text and a voice ID which will be converted into speech. The maximum number of unique voice IDs is 10. For reliable generation, keep the total character count across all `inputs[].text` values at or below 2,000 characters per request. Longer requests can terminate early in streaming responses or return a validation error. */
    inputs: (DialogueInput)[];
    /** Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for text to speech, you can check this using the can_do_text_to_speech property. */
    model_id?: string;
    /** Language code (ISO 639-1) used to enforce a language for the model and text normalization. If the model does not support provided language code, an error will be returned. */
    language_code?: string | null;
    /** Settings controlling the dialogue generation. */
    settings?: ModelSettingsResponseModel | null;
    /** A list of pronunciation dictionary locators (id, version_id) to be applied to the text. They will be applied in order. You may have up to 3 locators per request */
    pronunciation_dictionary_locators?: (PronunciationDictionaryVersionLocatorRequestModel)[] | null;
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295. */
    seed?: number | null;
    /** This parameter controls text normalization with three modes: 'auto', 'on', and 'off'. When set to 'auto', the system will automatically decide whether to apply text normalization (e.g., spelling out numbers). With 'on', text normalization will always be applied, while with 'off', it will be skipped. */
    apply_text_normalization?: "auto" | "on" | "off";
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<StreamingAudioChunkWithTimestampsAndVoiceSegmentsResponseModel>;

  /**
   * Text To Dialogue With Timestamps
   */
  textToDialogueFullWithTimestamps: (input: {
    /** A list of dialogue inputs, each containing text and a voice ID which will be converted into speech. The maximum number of unique voice IDs is 10. For reliable generation, keep the total character count across all `inputs[].text` values at or below 2,000 characters per request. Longer requests can terminate early in streaming responses or return a validation error. */
    inputs: (DialogueInput)[];
    /** Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for text to speech, you can check this using the can_do_text_to_speech property. */
    model_id?: string;
    /** Language code (ISO 639-1) used to enforce a language for the model and text normalization. If the model does not support provided language code, an error will be returned. */
    language_code?: string | null;
    /** Settings controlling the dialogue generation. */
    settings?: ModelSettingsResponseModel | null;
    /** A list of pronunciation dictionary locators (id, version_id) to be applied to the text. They will be applied in order. You may have up to 3 locators per request */
    pronunciation_dictionary_locators?: (PronunciationDictionaryVersionLocatorRequestModel)[] | null;
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295. */
    seed?: number | null;
    /** This parameter controls text normalization with three modes: 'auto', 'on', and 'off'. When set to 'auto', the system will automatically decide whether to apply text normalization (e.g., spelling out numbers). With 'on', text normalization will always be applied, while with 'off', it will be skipped. */
    apply_text_normalization?: "auto" | "on" | "off";
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: "alaw_8000" | "mp3_22050_32" | "mp3_24000_48" | "mp3_44100_128" | "mp3_44100_192" | "mp3_44100_32" | "mp3_44100_64" | "mp3_44100_96" | "opus_48000_128" | "opus_48000_192" | "opus_48000_32" | "opus_48000_64" | "opus_48000_96" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_32000" | "pcm_44100" | "pcm_48000" | "pcm_8000" | "ulaw_8000" | "wav_16000" | "wav_22050" | "wav_24000" | "wav_32000" | "wav_44100" | "wav_48000" | "wav_8000";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AudioWithTimestampsAndVoiceSegmentsResponseModel>;

  /**
   * Speech To Speech
   */
  speechToSpeechFull: (input: {
    /** The audio file which holds the content and emotion that will control the generated speech. */
    audio: string;
    /** Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for speech to speech, you can check this using the can_do_voice_conversion property. */
    model_id?: string;
    /** Voice settings overriding stored settings for the given voice. They are applied only on the given request. Needs to be send as a JSON encoded string. */
    voice_settings?: string | null;
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295. */
    seed?: number | null;
    /** If set, will remove the background noise from your audio input using our audio isolation model. Only applies to Voice Changer. */
    remove_background_noise?: boolean;
    /** The format of input audio. Options are 'pcm_s16le_16' or 'other' For `pcm_s16le_16`, the input audio must be 16-bit PCM at a 16kHz sample rate, single channel (mono), and little-endian byte order. Latency will be lower than with passing an encoded waveform. */
    file_format?: "pcm_s16le_16" | "other" | null;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers. */
    enable_logging?: boolean;
    /** You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values: 0 - default mode (no latency optimizations) 1 - normal latency optimizations (about 50% of possible latency improvement of option 3) 2 - strong latency optimizations (about 75% of possible latency improvement of option 3) 3 - max latency optimizations 4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).  Defaults to None.  */
    optimize_streaming_latency?: number | null;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: "alaw_8000" | "mp3_22050_32" | "mp3_24000_48" | "mp3_44100_128" | "mp3_44100_192" | "mp3_44100_32" | "mp3_44100_64" | "mp3_44100_96" | "opus_48000_128" | "opus_48000_192" | "opus_48000_32" | "opus_48000_64" | "opus_48000_96" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_32000" | "pcm_44100" | "pcm_48000" | "pcm_8000" | "ulaw_8000" | "wav_16000" | "wav_22050" | "wav_24000" | "wav_32000" | "wav_44100" | "wav_48000" | "wav_8000";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Speech To Speech Streaming
   */
  speechToSpeechStream: (input: {
    /** The audio file which holds the content and emotion that will control the generated speech. */
    audio: string;
    /** Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for speech to speech, you can check this using the can_do_voice_conversion property. */
    model_id?: string;
    /** Voice settings overriding stored settings for the given voice. They are applied only on the given request. Needs to be send as a JSON encoded string. */
    voice_settings?: string | null;
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295. */
    seed?: number | null;
    /** If set, will remove the background noise from your audio input using our audio isolation model. Only applies to Voice Changer. */
    remove_background_noise?: boolean;
    /** The format of input audio. Options are 'pcm_s16le_16' or 'other' For `pcm_s16le_16`, the input audio must be 16-bit PCM at a 16kHz sample rate, single channel (mono), and little-endian byte order. Latency will be lower than with passing an encoded waveform. */
    file_format?: "pcm_s16le_16" | "other" | null;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers. */
    enable_logging?: boolean;
    /** You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values: 0 - default mode (no latency optimizations) 1 - normal latency optimizations (about 50% of possible latency improvement of option 3) 2 - strong latency optimizations (about 75% of possible latency improvement of option 3) 3 - max latency optimizations 4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).  Defaults to None.  */
    optimize_streaming_latency?: number | null;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: "mp3_22050_32" | "mp3_24000_48" | "mp3_44100_32" | "mp3_44100_64" | "mp3_44100_96" | "mp3_44100_128" | "mp3_44100_192" | "pcm_8000" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_32000" | "pcm_44100" | "pcm_48000" | "ulaw_8000" | "alaw_8000" | "opus_48000_32" | "opus_48000_64" | "opus_48000_96" | "opus_48000_128" | "opus_48000_192";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * [Deprecated] Generate A Voice Preview From Description
   */
  textToVoice: (input: {
    /** Description to use for the created voice. */
    voice_description: string;
    /** Text to generate, text length has to be between 100 and 1000. */
    text?: string | null;
    /** Whether to automatically generate a text suitable for the voice description. */
    auto_generate_text?: boolean;
    /** Controls the volume level of the generated voice. -1 is quietest, 1 is loudest, 0 corresponds to roughly -24 LUFS. */
    loudness?: number;
    /** Higher quality results in better voice output but less variety. */
    quality?: number;
    /** Random number that controls the voice generation. Same seed with same inputs produces same voice. */
    seed?: number | null;
    /** Controls how closely the AI follows the prompt. Lower numbers give the AI more freedom to be creative, while higher numbers force it to stick more to the prompt. High numbers can cause voice to sound artificial or robotic. We recommend to use longer, more detailed prompts at lower Guidance Scale. */
    guidance_scale?: number;
    /** Whether to enhance the voice description using AI to add more detail and improve voice generation quality. When enabled, the system will automatically expand simple prompts into more detailed voice descriptions. Defaults to False */
    should_enhance?: boolean;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<VoicePreviewsResponseModel>;

  /**
   * Create A New Voice From Voice Preview
   */
  createVoice: (input: {
    /** Name to use for the created voice. */
    voice_name: string;
    /** Description to use for the created voice. */
    voice_description: string;
    /** The generated_voice_id to create; obtain it from POST /v1/text-to-voice/design, POST /v1/text-to-voice/:voice_id/remix, or the response headers when generating previews. */
    generated_voice_id: string;
    /** Optional, metadata to add to the created voice. Defaults to None. */
    labels?: { [key: string]: string | undefined } | null;
    /** List of voice ids that the user has played but not selected. Used for RLHF. */
    played_not_selected_voice_ids?: (string)[] | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<VoiceResponseModel>;

  /**
   * Design A Voice.
   */
  textToVoiceDesign: (input: {
    /** Description to use for the created voice. */
    voice_description: string;
    /** Model to use for the voice generation. Possible values: eleven_multilingual_ttv_v2, eleven_ttv_v3. */
    model_id?: "eleven_multilingual_ttv_v2" | "eleven_ttv_v3";
    /** Text to generate, text length has to be between 100 and 1000. */
    text?: string | null;
    /** Whether to automatically generate a text suitable for the voice description. */
    auto_generate_text?: boolean;
    /** Controls the volume level of the generated voice. -1 is quietest, 1 is loudest, 0 corresponds to roughly -24 LUFS. */
    loudness?: number;
    /** Random number that controls the voice generation. Same seed with same inputs produces same voice. */
    seed?: number | null;
    /** Controls how closely the AI follows the prompt. Lower numbers give the AI more freedom to be creative, while higher numbers force it to stick more to the prompt. High numbers can cause voice to sound artificial or robotic. We recommend to use longer, more detailed prompts at lower Guidance Scale. */
    guidance_scale?: number;
    /** Determines whether the Text to Voice previews should be included in the response. If true, only the generated IDs will be returned which can then be streamed via the /v1/text-to-voice/:generated_voice_id/stream endpoint. */
    stream_previews?: boolean;
    /** Whether to enhance the voice description using AI to add more detail and improve voice generation quality. When enabled, the system will automatically expand simple prompts into more detailed voice descriptions. Defaults to False */
    should_enhance?: boolean;
    /** The remixing session id. */
    remixing_session_id?: string | null;
    /** The id of the remixing session iteration where these generations should be attached to. If not provided, a new iteration will be created. */
    remixing_session_iteration_id?: string | null;
    /** Higher quality results in better voice output but less variety. */
    quality?: number | null;
    /** Reference audio to use for the voice generation. The audio should be base64 encoded. Only supported when using the  eleven_ttv_v3 model. */
    reference_audio_base64?: string | null;
    /** Controls the balance of prompt versus reference audio when generating voice samples. 0 means almost no prompt influence, 1 means almost no reference audio influence. Only supported when using the eleven_ttv_v3 model. */
    prompt_strength?: number | null;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<VoicePreviewsResponseModel>;

  /**
   * Remix A Voice.
   */
  textToVoiceRemix: (input: {
    /** Description of the changes to make to the voice. */
    voice_description: string;
    /** Text to generate, text length has to be between 100 and 1000. */
    text?: string | null;
    /** Whether to automatically generate a text suitable for the voice description. */
    auto_generate_text?: boolean;
    /** Controls the volume level of the generated voice. -1 is quietest, 1 is loudest, 0 corresponds to roughly -24 LUFS. */
    loudness?: number;
    /** Random number that controls the voice generation. Same seed with same inputs produces same voice. */
    seed?: number | null;
    /** Controls how closely the AI follows the prompt. Lower numbers give the AI more freedom to be creative, while higher numbers force it to stick more to the prompt. High numbers can cause voice to sound artificial or robotic. We recommend to use longer, more detailed prompts at lower Guidance Scale. */
    guidance_scale?: number;
    /** Determines whether the Text to Voice previews should be included in the response. If true, only the generated IDs will be returned which can then be streamed via the /v1/text-to-voice/:generated_voice_id/stream endpoint. */
    stream_previews?: boolean;
    /** The remixing session id. */
    remixing_session_id?: string | null;
    /** The id of the remixing session iteration where these generations should be attached to. If not provided, a new iteration will be created. */
    remixing_session_iteration_id?: string | null;
    /** Controls the balance of prompt versus reference audio when generating voice samples. 0 means almost no prompt influence, 1 means almost no reference audio influence. Only supported when using the eleven_ttv_v3 model. */
    prompt_strength?: number | null;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<VoicePreviewsResponseModel>;

  /**
   * Text To Voice Preview Streaming
   */
  textToVoicePreviewStream: (input: {
    /** The generated_voice_id to stream. */
    generated_voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Get User Info
   */
  getUserInfo: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<UserResponseModel>;

  /**
   * Get User Subscription Info
   */
  getUserSubscriptionInfo: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ExtendedSubscriptionResponseModel>;

  /**
   * Get Default Voice Settings.
   */
  getVoiceSettingsDefault: () => Promise<VoiceSettingsResponseModel>;

  /**
   * Get Voice Settings
   */
  getVoiceSettings: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<VoiceSettingsResponseModel>;

  /**
   * Edit Voice Settings
   */
  editVoiceSettings: (input: {
    /** Determines how stable the voice is and the randomness between each generation. Lower values introduce broader emotional range for the voice. Higher values can result in a monotonous voice with limited emotion. */
    stability?: number | null;
    /** This setting boosts the similarity to the original speaker. Using this setting requires a slightly higher computational load, which in turn increases latency. */
    use_speaker_boost?: boolean | null;
    /** Determines how closely the AI should adhere to the original voice when attempting to replicate it. */
    similarity_boost?: number | null;
    /** Determines the style exaggeration of the voice. This setting attempts to amplify the style of the original speaker. It does consume additional computational resources and might increase latency if set to anything other than 0. */
    style?: number | null;
    /** Adjusts the speed of the voice. A value of 1.0 is the default speed, while values less than 1.0 slow down the speech, and values greater than 1.0 speed it up. */
    speed?: number | null;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<EditVoiceSettingsResponseModel>;

  /**
   * List Voices
   */
  getVoices: (input: {
    /** If set to true, legacy premade voices will be included in responses from /v1/voices */
    show_legacy?: boolean | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetVoicesResponseModel>;

  /**
   * Get Voices V2
   */
  getUserVoicesV2: (input: {
    /** The next page token to use for pagination. Returned from the previous request. Use this in combination with the has_more flag for reliable pagination. */
    next_page_token?: string | null;
    /** How many voices to return at maximum. Can not exceed 100, defaults to 10. Page 0 may include more voices due to default voices being included. */
    page_size?: number;
    /** Search term to filter voices by. Searches in name, description, labels, category. */
    search?: string | null;
    /** Which field to sort by, one of 'created_at_unix' or 'name'. 'created_at_unix' may not be available for older voices. */
    sort?: string | null;
    /** Which direction to sort the voices in. 'asc' or 'desc'. */
    sort_direction?: string | null;
    /** Type of the voice to filter by. One of 'personal', 'community', 'default', 'workspace', 'non-default', 'non-community', 'saved'. 'non-default' is equal to all but 'default'. 'non-community' is equal to 'personal' and 'workspace' combined (excludes library copies). 'saved' is equal to non-default, but includes default voices if they have been added to a collection. */
    voice_type?: string | null;
    /** Category of the voice to filter by. One of 'premade', 'cloned', 'generated', 'professional' */
    category?: string | null;
    /** State of the voice's fine tuning to filter by. Applicable only to professional voices clones. One of 'draft', 'not_verified', 'not_started', 'queued', 'fine_tuning', 'fine_tuned', 'failed', 'delayed' */
    fine_tuning_state?: string | null;
    /** Collection ID to filter voices by. */
    collection_id?: string | null;
    /** Whether to include the total count of voices found in the response. NOTE: The total_count value is a live snapshot and may change between requests as users create, modify, or delete voices. For pagination, rely on the has_more flag instead. Only enable this when you actually need the total count (e.g., for display purposes), as it incurs a performance cost. */
    include_total_count?: boolean;
    /** Voice IDs to lookup by. Maximum 100 voice IDs. */
    voice_ids?: (string)[] | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetVoicesV2ResponseModel>;

  /**
   * Get Voice
   */
  getVoiceById: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** This parameter is now deprecated. It is ignored and will be removed in a future version. */
    with_settings?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<VoiceResponseModel>;

  /**
   * Delete Voice
   */
  deleteVoice: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DeleteVoiceResponseModel>;

  /**
   * Add Voice
   */
  addVoice: (input: {
    /** The name that identifies this voice. This will be displayed in the dropdown of the website. */
    name: string;
    /** A list of file paths to audio recordings intended for voice cloning. */
    files: (string)[];
    /** If set will remove background noise for voice samples using our audio isolation model. If the samples do not include background noise, it can make the quality worse. */
    remove_background_noise?: boolean;
    /** A description of the voice. */
    description?: string | null;
    /** Labels for the voice. Keys can be language, accent, gender, or age. */
    labels?: { [key: string]: string | undefined } | string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddVoiceIvcResponseModel>;

  /**
   * Edit Voice
   */
  editVoice: (input: {
    /** The name that identifies this voice. This will be displayed in the dropdown of the website. */
    name: string;
    /** Audio files to add to the voice */
    files?: (string)[];
    /** If set will remove background noise for voice samples using our audio isolation model. If the samples do not include background noise, it can make the quality worse. */
    remove_background_noise?: boolean;
    /** A description of the voice. */
    description?: string | null;
    /** Labels for the voice. Keys can be language, accent, gender, or age. */
    labels?: { [key: string]: string | undefined } | string | null;
    /** Run synchronous LLM moderation over the voice name and description when they change. Has no effect unless the voice_library_metadata_moderation feature flag is enabled for the user. */
    moderate_metadata?: boolean;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<EditVoiceResponseModel>;

  /**
   * Add Shared Voice
   */
  addSharingVoice: (input: {
    /** The name that identifies this voice. This will be displayed in the dropdown of the website. */
    new_name: string;
    bookmarked?: boolean;
    /** Public user ID used to publicly identify ElevenLabs users. */
    public_user_id: string;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddVoiceResponseModel>;

  /**
   * Create Podcast
   */
  createPodcast: (input: {
    /** The ID of the model to be used for this Studio project, you can query GET /v1/models to list all available models. */
    model_id: string;
    /** The type of podcast to generate. Can be 'conversation', an interaction between two voices, or 'bulletin', a monologue. */
    mode: PodcastConversationMode | PodcastBulletinMode;
    /** The source content for the Podcast. */
    source: PodcastTextSource | PodcastUrlSource | (PodcastTextSource | PodcastUrlSource)[];
    /** Output quality of the generated audio. Must be one of: 'standard' - standard output format, 128kbps with 44.1kHz sample rate. 'high' - high quality output format, 192kbps with 44.1kHz sample rate and major improvements on our side. 'ultra' - ultra quality output format, 192kbps with 44.1kHz sample rate and highest improvements on our side. 'ultra_lossless' - ultra quality output format, 705.6kbps with 44.1kHz sample rate and highest improvements on our side in a fully lossless format.  */
    quality_preset?: QualityPresetType;
    /** Duration of the generated podcast. Must be one of: short - produces podcasts shorter than 3 minutes. default - produces podcasts roughly between 3-7 minutes. long - produces podcasts longer than 7 minutes.  */
    duration_scale?: "short" | "default" | "long";
    /** An optional language of the Studio project. Two-letter language code (ISO 639-1). */
    language?: string | null;
    /** The intro text that will always be added to the beginning of the podcast. */
    intro?: string | null;
    /** The outro text that will always be added to the end of the podcast. */
    outro?: string | null;
    /** Additional instructions prompt for the podcast generation used to adjust the podcast's style and tone. */
    instructions_prompt?: string | null;
    /** A brief summary or highlights of the Studio project's content, providing key points or themes. This should be between 10 and 70 characters. */
    highlights?: (string)[] | null;
    /**      A url that will be called by our service when the Studio project is converted. Request will contain a json blob containing the status of the conversion     Messages:     1. When project was converted successfully:     {       type: "project_conversion_status",       event_timestamp: 1234567890,       data: {         request_id: "1234567890",         project_id: "21m00Tcm4TlvDq8ikWAM",         conversion_status: "success",         project_snapshot_id: "22m00Tcm4TlvDq8ikMAT",         error_details: None,       }     }     2. When project conversion failed:     {       type: "project_conversion_status",       event_timestamp: 1234567890,       data: {         request_id: "1234567890",         project_id: "21m00Tcm4TlvDq8ikWAM",         conversion_status: "error",         project_snapshot_id: None,         error_details: "Error details if conversion failed"       }     }      3. When chapter was converted successfully:     {       type: "chapter_conversion_status",       event_timestamp: 1234567890,       data: {         request_id: "1234567890",         project_id: "21m00Tcm4TlvDq8ikWAM",         chapter_id: "22m00Tcm4TlvDq8ikMAT",         conversion_status: "success",         chapter_snapshot_id: "23m00Tcm4TlvDq8ikMAV",         error_details: None,       }     }     4. When chapter conversion failed:     {       type: "chapter_conversion_status",       event_timestamp: 1234567890,       data: {         request_id: "1234567890",         project_id: "21m00Tcm4TlvDq8ikWAM",         chapter_id: "22m00Tcm4TlvDq8ikMAT",         conversion_status: "error",         chapter_snapshot_id: None,         error_details: "Error details if conversion failed"       }     }      */
    callback_url?: string | null;
    /**      This parameter controls text normalization with four modes: 'auto', 'on', 'apply_english' and 'off'.     When set to 'auto', the system will automatically decide whether to apply text normalization     (e.g., spelling out numbers). With 'on', text normalization will always be applied, while     with 'off', it will be skipped. 'apply_english' is the same as 'on' but will assume that text is in English.      */
    apply_text_normalization?: "auto" | "on" | "off" | "apply_english" | null;
  }, options?: { headers?: { "safety-identifier"?: string | null; "xi-api-key"?: string | null } }) => Promise<PodcastProjectResponseModel>;

  /**
   * Video To Music
   */
  videoToMusic: (input: {
    /**              One or more video files sent via FormData array (multipart/form-data). They will be combined into one codec in order.             A maximum of 10 videos is allowed, where the total size of the combined video is limited to 200MB.             In total, the video can be up to 600 seconds long. Note that combining multiple videos may increase the request duration significantly. If possible, combine the videos beforehand.              */
    videos: (string)[];
    /** Optional text description of the music you want. A maximum of 1000 characters is allowed. */
    description?: string | null;
    /** Optional list of style tags (e.g. ['upbeat', 'cinematic']). A maximum of 10 tags is allowed. */
    tags?: (string)[];
    /** The model to use for the generation. */
    model_id?: "music_v1";
    /** Whether to sign the generated song with C2PA. Applicable only for mp3 files. */
    sign_with_c2pa?: boolean;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Create Pronunciation Dictionaries
   */
  updatePronunciationDictionaries: (input: {
    /** A list of pronunciation dictionary locators (pronunciation_dictionary_id, version_id) encoded as a list of JSON strings for pronunciation dictionaries to be applied to the text. A list of json encoded strings is required as adding projects may occur through formData as opposed to jsonBody. To specify multiple dictionaries use multiple --form lines in your curl, such as --form 'pronunciation_dictionary_locators="{\"pronunciation_dictionary_id\":\"Vmd4Zor6fplcA7WrINey\",\"version_id\":\"hRPaxjlTdR7wFMhV4w0b\"}"' --form 'pronunciation_dictionary_locators="{\"pronunciation_dictionary_id\":\"JzWtcGQMJ6bnlWwyMo7e\",\"version_id\":\"lbmwxiLu4q6txYxgdZqn\"}"'. */
    pronunciation_dictionary_locators: (PronunciationDictionaryVersionLocatorDbModel)[];
    /** This will automatically mark text in this project for reconversion when the new dictionary applies or the old one no longer does. */
    invalidate_affected_text?: boolean;
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<CreatePronunciationDictionaryResponseModel>;

  /**
   * List Studio Projects
   */
  getProjects: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetProjectsResponseModel>;

  /**
   * Create Studio Project
   */
  addProject: (input: {
    /** The name of the Studio project, used for identification only. */
    name: string;
    /** The voice_id that corresponds to the default voice used for new titles. */
    default_title_voice_id?: string | null;
    /** The voice_id that corresponds to the default voice used for new paragraphs. */
    default_paragraph_voice_id?: string | null;
    /** The ID of the model to be used for this Studio project, you can query GET /v1/models to list all available models. */
    default_model_id?: string | null;
    /** An optional URL from which we will extract content to initialize the Studio project. If this is set, 'from_url' and 'from_content' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank. */
    from_url?: string | null;
    /** An optional .epub, .pdf, .txt or similar file can be provided. If provided, we will initialize the Studio project with its content. If this is set, 'from_url' and 'from_content' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank. */
    from_document?: string | null;
    /**      An optional content to initialize the Studio project with. If this is set, 'from_url' and 'from_document' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank.      Example:     [{"name": "Chapter A", "blocks": [{"sub_type": "p", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "A", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "B", "type": "tts_node"}]}, {"sub_type": "h1", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "C", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "D", "type": "tts_node"}]}]}, {"name": "Chapter B", "blocks": [{"sub_type": "p", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "E", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "F", "type": "tts_node"}]}, {"sub_type": "h2", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "G", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "H", "type": "tts_node"}]}]}]      */
    from_content_json?: string;
    /** Output quality of the generated audio. Must be one of: 'standard' - standard output format, 128kbps with 44.1kHz sample rate. 'high' - high quality output format, 192kbps with 44.1kHz sample rate and major improvements on our side. 'ultra' - ultra quality output format, 192kbps with 44.1kHz sample rate and highest improvements on our side. 'ultra_lossless' - ultra quality output format, 705.6kbps with 44.1kHz sample rate and highest improvements on our side in a fully lossless format.  */
    quality_preset?: QualityPresetType;
    /** An optional name of the author of the Studio project, this will be added as metadata to the mp3 file on Studio project or chapter download. */
    title?: string | null;
    /** An optional name of the author of the Studio project, this will be added as metadata to the mp3 file on Studio project or chapter download. */
    author?: string | null;
    /** An optional description of the Studio project. */
    description?: string | null;
    /** An optional list of genres associated with the Studio project. */
    genres?: (string)[];
    /** An optional target audience of the Studio project. */
    target_audience?: "children" | "young adult" | "adult" | "all ages" | null;
    /** An optional language of the Studio project. Two-letter language code (ISO 639-1). */
    language?: string | null;
    /** An optional content type of the Studio project. */
    content_type?: string | null;
    /** An optional original publication date of the Studio project, in the format YYYY-MM-DD or YYYY. */
    original_publication_date?: string | null;
    /** An optional specification of whether this Studio project contains mature content. */
    mature_content?: boolean | null;
    /** An optional ISBN number of the Studio project you want to create, this will be added as metadata to the mp3 file on Studio project or chapter download. */
    isbn_number?: string | null;
    /** [Deprecated] When the Studio project is downloaded, should the returned audio have postprocessing in order to make it compliant with audiobook normalized volume requirements */
    acx_volume_normalization?: boolean;
    /** When the Studio project is downloaded, should the returned audio have postprocessing in order to make it compliant with audiobook normalized volume requirements */
    volume_normalization?: boolean;
    /** A list of pronunciation dictionary locators (pronunciation_dictionary_id, version_id) encoded as a list of JSON strings for pronunciation dictionaries to be applied to the text. A list of json encoded strings is required as adding projects may occur through formData as opposed to jsonBody. To specify multiple dictionaries use multiple --form lines in your curl, such as --form 'pronunciation_dictionary_locators="{\"pronunciation_dictionary_id\":\"Vmd4Zor6fplcA7WrINey\",\"version_id\":\"hRPaxjlTdR7wFMhV4w0b\"}"' --form 'pronunciation_dictionary_locators="{\"pronunciation_dictionary_id\":\"JzWtcGQMJ6bnlWwyMo7e\",\"version_id\":\"lbmwxiLu4q6txYxgdZqn\"}"'. */
    pronunciation_dictionary_locators?: (string)[];
    /**      A url that will be called by our service when the Studio project is converted. Request will contain a json blob containing the status of the conversion     Messages:     1. When project was converted successfully:     {       type: "project_conversion_status",       event_timestamp: 1234567890,       data: {         request_id: "1234567890",         project_id: "21m00Tcm4TlvDq8ikWAM",         conversion_status: "success",         project_snapshot_id: "22m00Tcm4TlvDq8ikMAT",         error_details: None,       }     }     2. When project conversion failed:     {       type: "project_conversion_status",       event_timestamp: 1234567890,       data: {         request_id: "1234567890",         project_id: "21m00Tcm4TlvDq8ikWAM",         conversion_status: "error",         project_snapshot_id: None,         error_details: "Error details if conversion failed"       }     }      3. When chapter was converted successfully:     {       type: "chapter_conversion_status",       event_timestamp: 1234567890,       data: {         request_id: "1234567890",         project_id: "21m00Tcm4TlvDq8ikWAM",         chapter_id: "22m00Tcm4TlvDq8ikMAT",         conversion_status: "success",         chapter_snapshot_id: "23m00Tcm4TlvDq8ikMAV",         error_details: None,       }     }     4. When chapter conversion failed:     {       type: "chapter_conversion_status",       event_timestamp: 1234567890,       data: {         request_id: "1234567890",         project_id: "21m00Tcm4TlvDq8ikWAM",         chapter_id: "22m00Tcm4TlvDq8ikMAT",         conversion_status: "error",         chapter_snapshot_id: None,         error_details: "Error details if conversion failed"       }     }      */
    callback_url?: string | null;
    /** An optional specification of whether the content of this Studio project is fiction. */
    fiction?: "fiction" | "non-fiction" | null;
    /**      This parameter controls text normalization with four modes: 'auto', 'on', 'apply_english' and 'off'.     When set to 'auto', the system will automatically decide whether to apply text normalization     (e.g., spelling out numbers). With 'on', text normalization will always be applied, while     with 'off', it will be skipped. 'apply_english' is the same as 'on' but will assume that text is in English.      */
    apply_text_normalization?: "auto" | "on" | "off" | "apply_english" | null;
    /** Whether to auto convert the Studio project to audio or not. */
    auto_convert?: boolean;
    /** [Alpha Feature] Whether automatically assign voices to phrases in the create Project. */
    auto_assign_voices?: boolean | null;
    /** The type of Studio project to create. */
    source_type?: "blank" | "book" | "article" | "genfm" | "video" | "screenplay" | null;
    /**     Optional voice settings overrides for the project, encoded as a list of JSON strings.      Example:     ["{\"voice_id\": \"21m00Tcm4TlvDq8ikWAM\", \"stability\": 0.7, \"similarity_boost\": 0.8, \"style\": 0.5, \"speed\": 1.0, \"use_speaker_boost\": true}"]      */
    voice_settings?: (string)[];
    /** If true, creates a corresponding read for direct publishing in draft state */
    create_publishing_read?: boolean | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddProjectResponseModel>;

  /**
   * Update Studio Project
   */
  editProject: (input: {
    /** The name of the Studio project, used for identification only. */
    name: string;
    /** The voice_id that corresponds to the default voice used for new titles. */
    default_title_voice_id: string;
    /** The voice_id that corresponds to the default voice used for new paragraphs. */
    default_paragraph_voice_id: string;
    /** An optional name of the author of the Studio project, this will be added as metadata to the mp3 file on Studio project or chapter download. */
    title?: string | null;
    /** An optional name of the author of the Studio project, this will be added as metadata to the mp3 file on Studio project or chapter download. */
    author?: string | null;
    /** An optional ISBN number of the Studio project you want to create, this will be added as metadata to the mp3 file on Studio project or chapter download. */
    isbn_number?: string | null;
    /** When the Studio project is downloaded, should the returned audio have postprocessing in order to make it compliant with audiobook normalized volume requirements */
    volume_normalization?: boolean;
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<EditProjectResponseModel>;

  /**
   * Get Studio Project
   */
  getProjectById: (input: {
    /** The ID of the Studio project. */
    project_id: string;
    /** The share ID of the project */
    share_id?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ProjectExtendedResponseModel>;

  /**
   * Delete Studio Project
   */
  deleteProject: (input: {
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DeleteProjectResponseModel>;

  /**
   * Update Studio Project Content
   */
  editProjectContent: (input: {
    /** An optional URL from which we will extract content to initialize the Studio project. If this is set, 'from_url' and 'from_content' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank. */
    from_url?: string | null;
    /** An optional .epub, .pdf, .txt or similar file can be provided. If provided, we will initialize the Studio project with its content. If this is set, 'from_url' and 'from_content' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank. */
    from_document?: string | null;
    /**      An optional content to initialize the Studio project with. If this is set, 'from_url' and 'from_document' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank.      Example:     [{"name": "Chapter A", "blocks": [{"sub_type": "p", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "A", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "B", "type": "tts_node"}]}, {"sub_type": "h1", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "C", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "D", "type": "tts_node"}]}]}, {"name": "Chapter B", "blocks": [{"sub_type": "p", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "E", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "F", "type": "tts_node"}]}, {"sub_type": "h2", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "G", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "H", "type": "tts_node"}]}]}]      */
    from_content_json?: string;
    /** Whether to auto convert the Studio project to audio or not. */
    auto_convert?: boolean;
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<EditProjectResponseModel>;

  /**
   * Convert Studio Project
   */
  convertProjectEndpoint: (input: {
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ConvertProjectResponseModel>;

  /**
   * List Studio Project Snapshots
   */
  getProjectSnapshots: (input: {
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ProjectSnapshotsResponseModel>;

  /**
   * Get Project Snapshot
   */
  getProjectSnapshotEndpoint: (input: {
    /** The ID of the Studio project. */
    project_id: string;
    /** The ID of the Studio project snapshot. */
    project_snapshot_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ProjectSnapshotExtendedResponseModel>;

  /**
   * Stream Studio Project Audio
   */
  streamProjectSnapshotAudioEndpoint: (input: {
    /** Whether to convert the audio to mpeg format. */
    convert_to_mpeg?: boolean;
    /** The ID of the Studio project. */
    project_id: string;
    /** The ID of the Studio project snapshot. */
    project_snapshot_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Stream Archive With Studio Project Audio
   */
  streamProjectSnapshotArchiveEndpoint: (input: {
    /** The ID of the Studio project. */
    project_id: string;
    /** The ID of the Studio project snapshot. */
    project_snapshot_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * List Chapters
   */
  getChapters: (input: {
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetChaptersResponseModel>;

  /**
   * Create Chapter
   */
  addChapter: (input: {
    /** The name of the chapter, used for identification only. */
    name: string;
    /** An optional URL from which we will extract content to initialize the Studio project. If this is set, 'from_url' and 'from_content' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank. */
    from_url?: string | null;
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddChapterResponseModel>;

  /**
   * Get Chapter
   */
  getChapterByIdEndpoint: (input: {
    /** The ID of the Studio project. */
    project_id: string;
    /** The ID of the chapter. */
    chapter_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ChapterWithContentResponseModel>;

  /**
   * Update Chapter
   */
  editChapter: (input: {
    /** The name of the chapter, used for identification only. */
    name?: string | null;
    /** The chapter content to use. */
    content?: ChapterContentInputModel | null;
    /** The ID of the Studio project. */
    project_id: string;
    /** The ID of the chapter. */
    chapter_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<EditChapterResponseModel>;

  /**
   * Delete Chapter
   */
  deleteChapterEndpoint: (input: {
    /** The ID of the Studio project. */
    project_id: string;
    /** The ID of the chapter. */
    chapter_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DeleteChapterResponseModel>;

  /**
   * Convert Chapter
   */
  convertChapterEndpoint: (input: {
    /** The ID of the Studio project. */
    project_id: string;
    /** The ID of the chapter. */
    chapter_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ConvertChapterResponseModel>;

  /**
   * List Chapter Snapshots
   */
  getChapterSnapshots: (input: {
    /** The ID of the Studio project. */
    project_id: string;
    /** The ID of the chapter. */
    chapter_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ChapterSnapshotsResponseModel>;

  /**
   * Get Chapter Snapshot
   */
  getChapterSnapshotEndpoint: (input: {
    /** The ID of the Studio project. */
    project_id: string;
    /** The ID of the chapter. */
    chapter_id: string;
    /** The ID of the chapter snapshot. */
    chapter_snapshot_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ChapterSnapshotExtendedResponseModel>;

  /**
   * Stream Chapter Audio
   */
  streamChapterSnapshotAudio: (input: {
    /** Whether to convert the audio to mpeg format. */
    convert_to_mpeg?: boolean;
    /** The ID of the Studio project. */
    project_id: string;
    /** The ID of the chapter. */
    chapter_id: string;
    /** The ID of the chapter snapshot. */
    chapter_snapshot_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Get Project Muted Tracks
   */
  getProjectMutedTracksEndpoint: (input: {
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ProjectMutedTracksResponseModel>;

  /**
   * Get The Dubbing Resource For An Id.
   */
  getDubbingResource: (input: {
    /** ID of the dubbing project. */
    dubbing_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DubbingResource>;

  /**
   * Add A Language To The Resource
   */
  addLanguage: (input: {
    /** The Target language. */
    language: string | null;
    /** ID of the dubbing project. */
    dubbing_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<LanguageAddedResponse>;

  /**
   * Create A Segment For The Speaker
   */
  createClip: (input: {
    start_time: number;
    end_time: number;
    text?: string | null;
    translations?: { [key: string]: string | undefined } | null;
    /** ID of the dubbing project. */
    dubbing_id: string;
    /** ID of the speaker. */
    speaker_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SegmentCreateResponse>;

  /**
   * Modify A Single Segment
   */
  updateSegmentLanguage: (input: {
    start_time?: number | null;
    end_time?: number | null;
    text?: string | null;
    /** ID of the dubbing project. */
    dubbing_id: string;
    /** ID of the segment */
    segment_id: string;
    /** ID of the language. */
    language: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SegmentUpdateResponse>;

  /**
   * Move Segments Between Speakers
   */
  migrateSegments: (input: {
    segment_ids: (string)[];
    speaker_id: string;
    /** ID of the dubbing project. */
    dubbing_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SegmentMigrationResponse>;

  /**
   * Deletes A Single Segment
   */
  deleteSegment: (input: {
    /** ID of the dubbing project. */
    dubbing_id: string;
    /** ID of the segment */
    segment_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SegmentDeleteResponse>;

  /**
   * Transcribes Segments
   */
  transcribe: (input: {
    /** Transcribe this specific list of segments. */
    segments: (string)[];
    /** ID of the dubbing project. */
    dubbing_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SegmentTranscriptionResponse>;

  /**
   * Translates All Or Some Segments And Languages
   */
  translate: (input: {
    /** Translate only this list of segments. */
    segments: (string)[];
    /** Translate only these languages for each segment. */
    languages: (string)[] | null;
    /** ID of the dubbing project. */
    dubbing_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SegmentTranslationResponse>;

  /**
   * Dubs All Or Some Segments And Languages
   */
  dub: (input: {
    /** Dub only this list of segments. */
    segments: (string)[];
    /** Dub only these languages for each segment. */
    languages: (string)[] | null;
    /** ID of the dubbing project. */
    dubbing_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SegmentDubResponse>;

  /**
   * Update Metadata For A Speaker
   */
  updateSpeaker: (input: {
    /** Name to attribute to this speaker. */
    speaker_name?: string | null;
    /** Either the identifier of a voice from the ElevenLabs voice library, or one of ['track-clone', 'clip-clone']. */
    voice_id?: string | null;
    /** For models that support it, the voice similarity value to use. This will default to 0.65, with a valid range of [0.0, 1.0]. */
    voice_stability?: number | null;
    /** For models that support it, the voice similarity value to use. This will default to 1.0, with a valid range of [0.0, 1.0]. */
    voice_similarity?: number | null;
    /** For models that support it, the voice style value to use. This will default to 1.0, with a valid range of [0.0, 1.0]. */
    voice_style?: number | null;
    /** Languages to apply these changes to. If empty, will apply to all languages. */
    languages?: (string)[] | null;
    /** ID of the dubbing project. */
    dubbing_id: string;
    /** ID of the speaker. */
    speaker_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SpeakerUpdatedResponse>;

  /**
   * Create A New Speaker
   */
  createSpeaker: (input: {
    /** Name to attribute to this speaker. */
    speaker_name?: string | null;
    /** Either the identifier of a voice from the ElevenLabs voice library, or one of ['track-clone', 'clip-clone']. */
    voice_id?: string | null;
    /** For models that support it, the voice similarity value to use. This will default to 0.65, with a valid range of [0.0, 1.0]. */
    voice_stability?: number | null;
    /** For models that support it, the voice similarity value to use. This will default to 1.0, with a valid range of [0.0, 1.0]. */
    voice_similarity?: number | null;
    /** For models that support it, the voice style value to use. This will default to 1.0, with a valid range of [0.0, 1.0]. */
    voice_style?: number | null;
    /** ID of the dubbing project. */
    dubbing_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SpeakerCreatedResponse>;

  /**
   * Search The Elevenlabs Library For Voices Similar To A Speaker.
   */
  getSimilarVoicesForSpeaker: (input: {
    /** ID of the dubbing project. */
    dubbing_id: string;
    /** ID of the speaker. */
    speaker_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SimilarVoicesForSpeakerResponse>;

  /**
   * Render Audio Or Video For The Given Language
   */
  render: (input: {
    /** The type of the render. One of ['mp4', 'aac', 'mp3', 'wav', 'aaf', 'tracks_zip', 'clips_zip'] */
    render_type: RenderType;
    /** Whether to normalize the volume of the rendered audio. */
    normalize_volume?: boolean | null;
    /** ID of the dubbing project. */
    dubbing_id: string;
    /** The target language code to render, eg. 'es'. To render the source track use 'original'. */
    language: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DubbingRenderResponseModel>;

  /**
   * List Dubs
   */
  listDubs: (input: {
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
    /** How many dubs to return at maximum. Can not exceed 200, defaults to 100. */
    page_size?: number;
    /** What state the dub is currently in. */
    dubbing_status?: "dubbing" | "dubbed" | "failed";
    /** Filters who created the resources being listed, whether it was the user running the request or someone else that shared the resource with them. */
    filter_by_creator?: "personal" | "others" | "all";
    /** The field to use for ordering results from this query. */
    order_by?: string;
    /** The order direction to use for results from this query. */
    order_direction?: "DESCENDING" | "ASCENDING";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DubbingMetadataPageResponseModel>;

  /**
   * Dub A Video Or An Audio File
   */
  createDubbing: (input: {
    /** A list of file paths to audio recordings intended for voice cloning */
    file?: string | null;
    /** CSV file containing transcription/translation metadata */
    csv_file?: string | null;
    /** For use only with csv input */
    foreground_audio_file?: string | null;
    /** For use only with csv input */
    background_audio_file?: string | null;
    /** Name of the dubbing project. */
    name?: string | null;
    /** URL of the source video/audio file. */
    source_url?: string | null;
    /** Source language. Expects a valid iso639-1 or iso639-3 language code. */
    source_lang?: string;
    /** The Target language to dub the content into. Expects a valid iso639-1 or iso639-3 language code. */
    target_lang?: string | null;
    /** [Experimental] An accent to apply when selecting voices from the library and to use to inform translation of the dialect to prefer. */
    target_accent?: string | null;
    /** Number of speakers to use for the dubbing. Set to 0 to automatically detect the number of speakers */
    num_speakers?: number;
    /** Whether to apply watermark to the output video. */
    watermark?: boolean;
    /** Start time of the source video/audio file. */
    start_time?: number | null;
    /** End time of the source video/audio file. */
    end_time?: number | null;
    /** Whether to use the highest resolution available. */
    highest_resolution?: boolean;
    /** An advanced setting. Whether to drop background audio from the final dub. This can improve dub quality where it's known that audio shouldn't have a background track such as for speeches or monologues. */
    drop_background_audio?: boolean;
    /** [BETA] Whether transcripts should have profanities censored with the words '[censored]' */
    use_profanity_filter?: boolean | null;
    /** Whether to prepare dub for edits in dubbing studio or edits as a dubbing resource. */
    dubbing_studio?: boolean;
    /** Instead of using a voice clone in dubbing, use a similar voice from the ElevenLabs Voice Library. Voices used from the library will contribute towards a workspace's custom voices limit, and if there aren't enough available slots the dub will fail. Using this feature requires the caller to have the 'add_voice_from_voice_library' permission on their workspace to access new voices. */
    disable_voice_cloning?: boolean;
    /** The mode in which to run this Dubbing job. Defaults to automatic, use manual if specifically providing a CSV transcript to use. Note that manual mode is experimental and production use is strongly discouraged. */
    mode?: "automatic" | "manual";
    /** Frames per second to use when parsing a CSV file for dubbing. If not provided, FPS will be inferred from timecodes. */
    csv_fps?: number | null;
    /** HCaptcha token used to prevent spam, generated on the frontend either automatically or when the client solves the hCaptcha challenge.  */
    hcaptcha_token?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DoDubbingResponseModel>;

  /**
   * Get Dubbing
   */
  getDubbedMetadata: (input: {
    /** ID of the dubbing project. */
    dubbing_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DubbingMetadataResponse>;

  /**
   * Delete Dubbing
   */
  deleteDubbing: (input: {
    /** ID of the dubbing project. */
    dubbing_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DeleteDubbingResponseModel>;

  /**
   * Get Dubbed File
   */
  getDubbedFile: (input: {
    /** ID of the dubbing project. */
    dubbing_id: string;
    /** ID of the language. */
    language_code: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Get Dubbed Transcript
   */
  getDubbedTranscriptFile: (input: {
    /** ID of the dubbing project. */
    dubbing_id: string;
    /** ISO-693 language code to retrieve the transcript for. Use 'source' to fetch the transcript of the original media. */
    language_code: string;
    /** Format to return transcript in. For subtitles use either 'srt' or 'webvtt', and for a full transcript use 'json'. The 'json' format is not yet supported for Dubbing Studio. */
    format_type?: "srt" | "webvtt" | "json";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DubbingTranscriptResponseModel | string>;

  /**
   * Retrieve A Transcript
   */
  getDubbingTranscripts: (input: {
    /** ID of the dubbing project. */
    dubbing_id: string;
    /** ISO-693 language code to retrieve the transcript for. Use 'source' to fetch the transcript of the original media. */
    language_code: string;
    /** Format to return transcript in. For subtitles use either 'srt' or 'webvtt', and for a full transcript use 'json'. The 'json' format is not yet supported for Dubbing Studio. */
    format_type: "srt" | "webvtt" | "json";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DubbingTranscriptsResponseModel>;

  /**
   * Get Models
   */
  getModels: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<(ModelResponseModel)[]>;

  /**
   * Creates Audio Native Enabled Project.
   */
  createAudioNativeProject: (input: {
    /** Project name. */
    name: string;
    /** (Deprecated) Image URL used in the player. If not provided, default image set in the Player settings is used. */
    image?: string | null;
    /** Author used in the player and inserted at the start of the uploaded article. If not provided, the default author set in the Player settings is used. */
    author?: string | null;
    /** Title used in the player and inserted at the top of the uploaded article. If not provided, the default title set in the Player settings is used. */
    title?: string | null;
    /** (Deprecated) Whether to use small player or not. If not provided, default value set in the Player settings is used. */
    small?: boolean;
    /** Text color used in the player. If not provided, default text color set in the Player settings is used. */
    text_color?: string | null;
    /** Background color used in the player. If not provided, default background color set in the Player settings is used. */
    background_color?: string | null;
    /** (Deprecated) Specifies for how many minutes to persist the session across page reloads. If not provided, default sessionization set in the Player settings is used. */
    sessionization?: number;
    /** Voice ID used to voice the content. If not provided, default voice ID set in the Player settings is used. */
    voice_id?: string | null;
    /** TTS Model ID used in the player. If not provided, default model ID set in the Player settings is used. */
    model_id?: string | null;
    /** Either txt or HTML input file containing the article content. HTML should be formatted as follows '&lt;html&gt;&lt;body&gt;&lt;div&gt;&lt;p&gt;Your content&lt;/p&gt;&lt;h3&gt;More of your content&lt;/h3&gt;&lt;p&gt;Some more of your content&lt;/p&gt;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;' */
    file?: string;
    /** Whether to auto convert the project to audio or not. */
    auto_convert?: boolean;
    /**      This parameter controls text normalization with four modes: 'auto', 'on', 'apply_english' and 'off'.     When set to 'auto', the system will automatically decide whether to apply text normalization     (e.g., spelling out numbers). With 'on', text normalization will always be applied, while     with 'off', it will be skipped. 'apply_english' is the same as 'on' but will assume that text is in English.      */
    apply_text_normalization?: "auto" | "on" | "off" | "apply_english" | null;
    /** A list of pronunciation dictionary locators (pronunciation_dictionary_id, version_id) encoded as a list of JSON strings for pronunciation dictionaries to be applied to the text. A list of json encoded strings is required as adding projects may occur through formData as opposed to jsonBody. To specify multiple dictionaries use multiple --form lines in your curl, such as --form 'pronunciation_dictionary_locators="{\"pronunciation_dictionary_id\":\"Vmd4Zor6fplcA7WrINey\",\"version_id\":\"hRPaxjlTdR7wFMhV4w0b\"}"' --form 'pronunciation_dictionary_locators="{\"pronunciation_dictionary_id\":\"JzWtcGQMJ6bnlWwyMo7e\",\"version_id\":\"lbmwxiLu4q6txYxgdZqn\"}"'. */
    pronunciation_dictionary_locators?: (string)[];
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AudioNativeCreateProjectResponseModel>;

  /**
   * Get Audio Native Project Settings
   */
  getAudioNativeProjectSettingsEndpoint: (input: {
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAudioNativeProjectSettingsResponseModel>;

  /**
   * Update Audio-Native Project Content
   */
  audioNativeProjectUpdateContentEndpoint: (input: {
    /** Either txt or HTML input file containing the article content. HTML should be formatted as follows '&lt;html&gt;&lt;body&gt;&lt;div&gt;&lt;p&gt;Your content&lt;/p&gt;&lt;h5&gt;More of your content&lt;/h5&gt;&lt;p&gt;Some more of your content&lt;/p&gt;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;' */
    file?: string;
    /** Whether to auto convert the project to audio or not. */
    auto_convert?: boolean;
    /** Whether to auto publish the new project snapshot after it's converted. */
    auto_publish?: boolean;
    /** The ID of the Studio project. */
    project_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AudioNativeEditContentResponseModel>;

  /**
   * Update Audio-Native Content From Url
   */
  audioNativeUpdateContentFromUrl: (input: {
    /** URL of the page to extract content from. */
    url: string;
    /** Author used in the player and inserted at the start of the uploaded article. If not provided, the default author set in the Player settings is used. */
    author?: string | null;
    /** Title used in the player and inserted at the top of the uploaded article. If not provided, the default title set in the Player settings is used. */
    title?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AudioNativeEditContentResponseModel>;

  /**
   * Get Voices
   */
  getLibraryVoices: (input: {
    /** How many shared voices to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** Voice category used for filtering */
    category?: "professional" | "famous" | "high_quality";
    /** Gender used for filtering */
    gender?: string | null;
    /** Age used for filtering */
    age?: string | null;
    /** Accent used for filtering */
    accent?: string | null;
    /** Language used for filtering */
    language?: string | null;
    /** Locale used for filtering */
    locale?: string | null;
    /** Search term used for filtering */
    search?: string | null;
    /** Use-case used for filtering */
    use_cases?: (string)[] | null;
    /** Search term used for filtering */
    descriptives?: (string)[] | null;
    /** Filter featured voices */
    featured?: boolean;
    /** Filter voices with a minimum notice period of the given number of days. */
    min_notice_period_days?: number | null;
    /** Include/exclude voices with custom rates */
    include_custom_rates?: boolean | null;
    /** Include/exclude voices that are live moderated */
    include_live_moderated?: boolean | null;
    /** Filter voices that are enabled for the reader app */
    reader_app_enabled?: boolean;
    /** Filter voices by public owner ID */
    owner_id?: string | null;
    /** Sort criteria */
    sort?: string | null;
    page?: number;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetLibraryVoicesResponseModel>;

  /**
   * Get Similar Library Voices
   */
  getSimilarLibraryVoices: (input: {
    audio_file?: string;
    /** Threshold for voice similarity between provided sample and library voices. Values range from 0 to 2. The smaller the value the more similar voices will be returned. */
    similarity_threshold?: number | null;
    /** Number of most similar voices to return. If similarity_threshold is provided, less than this number of voices may be returned. Values range from 1 to 100. */
    top_k?: number | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetLibraryVoicesResponseModel>;

  /**
   * Get Characters Usage Metrics (Deprecated)
   */
  usageCharacters: (input: {
    /** UTC Unix timestamp for the start of the usage window, in milliseconds. To include the first day of the window, the timestamp should be at 00:00:00 of that day. */
    start_unix: number;
    /** UTC Unix timestamp for the end of the usage window, in milliseconds. To include the last day of the window, the timestamp should be at 23:59:59 of that day. */
    end_unix: number;
    /** Whether or not to include the statistics of the entire workspace. */
    include_workspace_metrics?: boolean;
    /** How to break down the information. Cannot be "user" if include_workspace_metrics is False. */
    breakdown_type?: BreakdownTypes;
    /** How to aggregate usage data over time. Can be "hour", "day", "week", "month", or "cumulative". */
    aggregation_interval?: UsageAggregationInterval;
    /** Aggregation bucket size in seconds. Overrides the aggregation interval. */
    aggregation_bucket_size?: number | null;
    /** Which metric to aggregate. */
    metric?: MetricType;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<UsageCharactersResponseModel>;

  /**
   * Add A Pronunciation Dictionary
   */
  addFromFile: (input: {
    /** The name of the pronunciation dictionary, used for identification only. */
    name: string;
    /** A lexicon .pls file which we will use to initialize the project with. */
    file?: string | null;
    /** A description of the pronunciation dictionary, used for identification only. */
    description?: string | null;
    /** Should be one of 'admin', 'editor' or 'viewer'. If not provided, defaults to no access. */
    workspace_access?: "admin" | "editor" | "commenter" | "viewer" | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddPronunciationDictionaryResponseModel>;

  /**
   * Add A Pronunciation Dictionary
   */
  addFromRules: (input: {
    /** List of pronunciation rules. Rule can be either:     an alias rule: {'string_to_replace': 'a', 'type': 'alias', 'alias': 'b', }     or a phoneme rule: {'string_to_replace': 'a', 'type': 'phoneme', 'phoneme': 'b', 'alphabet': 'ipa' } */
    rules: (PronunciationDictionaryAliasRuleRequestModel | PronunciationDictionaryPhonemeRuleRequestModel)[];
    /** The name of the pronunciation dictionary, used for identification only. */
    name: string;
    /** A description of the pronunciation dictionary, used for identification only. */
    description?: string | null;
    /** Should be one of 'admin', 'editor' or 'viewer'. If not provided, defaults to no access. */
    workspace_access?: "admin" | "editor" | "commenter" | "viewer" | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddPronunciationDictionaryResponseModel>;

  /**
   * Update Pronunciation Dictionary
   */
  patchPronunciationDictionary: (input: {
    /** Whether to archive the pronunciation dictionary. */
    archived?: boolean;
    /** The name of the pronunciation dictionary, used for identification only. */
    name?: string;
    /** The id of the pronunciation dictionary */
    pronunciation_dictionary_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetPronunciationDictionaryMetadataResponseModel>;

  /**
   * Get Metadata For A Pronunciation Dictionary
   */
  getPronunciationDictionaryMetadata: (input: {
    /** The id of the pronunciation dictionary */
    pronunciation_dictionary_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetPronunciationDictionaryWithRulesResponseModel>;

  /**
   * Set Rules On The Pronunciation Dictionary
   */
  setRules: (input: {
    /** List of pronunciation rules. Rule can be either:     an alias rule: {'string_to_replace': 'a', 'type': 'alias', 'alias': 'b', }     or a phoneme rule: {'string_to_replace': 'a', 'type': 'phoneme', 'phoneme': 'b', 'alphabet': 'ipa' } */
    rules: (PronunciationDictionaryAliasRuleRequestModel | PronunciationDictionaryPhonemeRuleRequestModel)[];
    /** The id of the pronunciation dictionary */
    pronunciation_dictionary_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<PronunciationDictionaryRulesResponseModel>;

  /**
   * Add Rules To The Pronunciation Dictionary
   */
  addRules: (input: {
    /** List of pronunciation rules. Rule can be either:     an alias rule: {'string_to_replace': 'a', 'type': 'alias', 'alias': 'b', }     or a phoneme rule: {'string_to_replace': 'a', 'type': 'phoneme', 'phoneme': 'b', 'alphabet': 'ipa' } */
    rules: (PronunciationDictionaryAliasRuleRequestModel | PronunciationDictionaryPhonemeRuleRequestModel)[];
    /** The id of the pronunciation dictionary */
    pronunciation_dictionary_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<PronunciationDictionaryRulesResponseModel>;

  /**
   * Remove Rules From The Pronunciation Dictionary
   */
  removeRules: (input: {
    /** List of strings to remove from the pronunciation dictionary. */
    rule_strings: (string)[];
    /** The id of the pronunciation dictionary */
    pronunciation_dictionary_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<PronunciationDictionaryRulesResponseModel>;

  /**
   * Get A Pls File With A Pronunciation Dictionary Version Rules
   */
  getPronunciationDictionaryVersionPls: (input: {
    /** The id of the pronunciation dictionary */
    dictionary_id: string;
    /** The id of the pronunciation dictionary version */
    version_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Get Pronunciation Dictionaries
   */
  getPronunciationDictionariesMetadata: (input: {
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
    /** How many pronunciation dictionaries to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** Which field to sort by, one of 'created_at_unix' or 'name'. */
    sort?: "creation_time_unix" | "name" | null;
    /** Which direction to sort the voices in. 'ascending' or 'descending'. */
    sort_direction?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetPronunciationDictionariesMetadataResponseModel>;

  /**
   * Revoke Api Key
   */
  revoke: (input: {
    /** Must be set to `self` to revoke the API key used to authenticate this request. Required as an explicit confirmation to avoid accidental revocation. */
    api_key_name: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Get Service Account Api Keys Route
   */
  getServiceAccountApiKeysRoute: (input: {
    service_account_user_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WorkspaceApiKeyListResponseModel>;

  /**
   * Create Service Account Api Key
   */
  createServiceAccountApiKey: (input: {
    name: string;
    /** The permissions of the XI API. */
    permissions: (PermissionType)[] | string;
    /** The character limit of the XI API key. If provided this will limit the usage of this api key to n characters per month where n is the chosen value. Requests that incur charges will fail after reaching this monthly limit. */
    character_limit?: number | null;
    /** List of IP addresses or CIDR ranges allowed to use this API key. Each entry may be a CIDR range (e.g. '10.0.0.0/24') or a bare IP address (normalized to /32 or /128). On create, omit or pass null to allow all IPs. On update, omit to leave the whitelist unchanged, or pass "clear" to remove it. */
    allowed_ips?: (string)[] | null;
    service_account_user_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WorkspaceCreateApiKeyResponseModel>;

  /**
   * Edit Service Account Api Key
   */
  editServiceAccountApiKey: (input: {
    /** Whether to enable or disable the API key. */
    is_enabled: boolean;
    /** The name of the XI API key to use (used for identification purposes only). */
    name: string;
    /** The permissions of the XI API. */
    permissions: (PermissionType)[] | string;
    /** The character limit of the XI API key. If provided this will limit the usage of this api key to n characters per month where n is the chosen value. Requests that incur charges will fail after reaching this monthly limit. */
    character_limit?: number | null;
    /** List of IP addresses or CIDR ranges allowed to use this API key. Each entry may be a CIDR range (e.g. '10.0.0.0/24') or a bare IP address (normalized to /32 or /128). On create, omit or pass null to allow all IPs. On update, omit to leave the whitelist unchanged, or pass "clear" to remove it. */
    allowed_ips?: (string)[] | "clear" | "no_update";
    service_account_user_id: string;
    api_key_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Delete Service Account Api Key
   */
  deleteServiceAccountApiKey: (input: {
    service_account_user_id: string;
    api_key_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Get Workspace Audit Logs
   */
  getWorkspaceAuditLogs: (input: {
    /** Maximum number of entries per page */
    limit?: number;
    /** Cursor for the next page (from previous response) */
    cursor?: string | null;
    /** Only include entries at or after this time (ms since epoch) */
    time_from_unix_ms?: number | null;
    /** Only include entries at or before this time (ms since epoch) */
    time_to_unix_ms?: number | null;
    /** Filter by actor user ID */
    actor_uid?: string | null;
    /** Filter by OCSF event class name (e.g. Account Change) */
    class_name?: string | null;
    /** Filter by audit activity name (e.g. Subscription Creation) */
    activity_name?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WorkspaceAuditLogsPageResponse>;

  /**
   * Create Workspace Auth Connection
   */
  createAuthConnection: (input: {
    /** Auth connection to create */
    body: CreateOAuth2ClientCredsRequest | CreateCustomHeaderAuthRequest | CreateBasicAuthRequest | CreateBearerAuthRequest | CreateOAuth2JwtRequest | CreatePrivateKeyJwtRequest | CreateMtlsAuthRequest;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<OAuth2ClientCredsResponse | BasicAuthResponse | BearerAuthResponse | OAuth2JwtResponse | PrivateKeyJwtResponse | MtlsAuthResponse | CustomHeaderAuthResponse | ApiIntegrationOAuth2AuthCodeResponse | ApiIntegrationOAuth2CustomAppResponse | WhatsAppAuthResponse | SlackBotAuthResponse>;

  /**
   * Get Workspace Auth Connections
   */
  listAuthConnections: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ListAuthConnectionsResponse>;

  /**
   * Update Workspace Auth Connection
   */
  updateAuthConnection: (input: {
    /** Updated auth connection fields */
    body: UpdateOAuth2ClientCredsRequest | UpdateBasicAuthRequest | UpdateOAuth2JwtRequest;
    auth_connection_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<OAuth2ClientCredsResponse | BasicAuthResponse | BearerAuthResponse | OAuth2JwtResponse | PrivateKeyJwtResponse | MtlsAuthResponse | CustomHeaderAuthResponse | ApiIntegrationOAuth2AuthCodeResponse | ApiIntegrationOAuth2CustomAppResponse | WhatsAppAuthResponse | SlackBotAuthResponse>;

  /**
   * Delete Workspace Auth Connection
   */
  deleteAuthConnection: (input: {
    auth_connection_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Get Workspace Service Accounts
   */
  getWorkspaceServiceAccounts: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WorkspaceServiceAccountListResponseModel>;

  /**
   * Get All Groups
   */
  getGroupsEndpoint: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<{ [key: string]: WorkspaceGroupResponseModel | undefined }>;

  /**
   * Search User Groups
   */
  searchGroups: (input: {
    /** Name of the target group. */
    name: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<(WorkspaceGroupByNameResponseModel)[]>;

  /**
   * Delete Member From User Group
   */
  removeMember: (input: {
    /** The email of the target workspace member. */
    email: string;
    /** The ID of the target group. */
    group_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DeleteWorkspaceGroupMemberResponseModel>;

  /**
   * Add Member To User Group
   */
  addMember: (input: {
    /** The email of the target workspace member. */
    email: string;
    /** The ID of the target group. */
    group_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddWorkspaceGroupMemberResponseModel>;

  /**
   * Invite User
   */
  inviteUser: (input: {
    /** The email of the customer */
    email: string;
    /** The workspace permission of the user. This is deprecated, use `seat_type` instead. */
    workspace_permission?: string | null;
    /** The seat type of the user */
    seat_type?: SeatType | null;
    /** The group ids of the user */
    group_ids?: (string)[] | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddWorkspaceInviteResponseModel>;

  /**
   * Invite Multiple Users
   */
  inviteUsersBulk: (input: {
    /** The email of the customer */
    emails: (string)[];
    /** The seat type of the user */
    seat_type?: SeatType | null;
    /** The group ids of the user */
    group_ids?: (string)[] | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddWorkspaceInviteResponseModel>;

  /**
   * Delete Existing Invitation
   */
  deleteInvite: (input: {
    /** The email of the customer */
    email: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DeleteWorkspaceInviteResponseModel>;

  /**
   * Update Member
   */
  updateWorkspaceMember: (input: {
    /** Email of the target user. */
    email: string;
    /** Whether to lock or unlock the user account. */
    is_locked?: boolean | null;
    /** The workspace role of the user. This is deprecated, use `workspace_seat_type` instead. */
    workspace_role?: SeatType | null;
    /** The workspace seat type */
    workspace_seat_type?: SeatType | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<UpdateWorkspaceMemberResponseModel>;

  /**
   * Get Resource
   */
  getResourceMetadata: (input: {
    /** The ID of the target resource. */
    resource_id: string;
    /** Resource type of the target resource. */
    resource_type: WorkspaceResourceType;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ResourceMetadataResponseModel>;

  /**
   * Share Workspace Resource
   */
  shareResourceEndpoint: (input: {
    /** Role to grant to the target: one of 'admin', 'editor', 'commenter', or 'viewer'. */
    role: "admin" | "editor" | "commenter" | "viewer";
    /** Resource type of the target resource. */
    resource_type: WorkspaceResourceType;
    /** The email of the user or service account. */
    user_email?: string | null;
    /** The ID of the target group. Use 'default' to set the resource's baseline role — every workspace member receives this role unless they hold a higher one through a direct user grant, group membership, or workspace (service account) API key. */
    group_id?: string | null;
    /** The ID of the target workspace (service account) API key. This is not the API key string itself that you pass in the header for authentication — it is the key's ID, which workspace admins can find under Developers → Service Accounts. */
    workspace_api_key_id?: string | null;
    /** The ID of the target resource. */
    resource_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Unshare Workspace Resource
   */
  unshareResourceEndpoint: (input: {
    /** Resource type of the target resource. */
    resource_type: WorkspaceResourceType;
    /** The email of the user or service account. */
    user_email?: string | null;
    /** The ID of the target group. Use 'default' to set the resource's baseline role — every workspace member receives this role unless they hold a higher one through a direct user grant, group membership, or workspace (service account) API key. */
    group_id?: string | null;
    /** The ID of the target workspace (service account) API key. This is not the API key string itself that you pass in the header for authentication — it is the key's ID, which workspace admins can find under Developers → Service Accounts. */
    workspace_api_key_id?: string | null;
    /** The ID of the target resource. */
    resource_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * List Workspace Webhooks
   */
  getWorkspaceWebhooksRoute: (input: {
    /** Whether to include active usages of the webhook, only usable by admins */
    include_usages?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WorkspaceWebhookListResponseModel>;

  /**
   * Create Workspace Webhook
   */
  createWorkspaceWebhookRoute: (input: {
    /** Webhook settings object containing auth_type and corresponding configuration */
    settings: WebhookHmacSettings;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WorkspaceCreateWebhookResponseModel>;

  /**
   * Update Workspace Webhook
   */
  editWorkspaceWebhookRoute: (input: {
    /** Whether to disable or enable the webhook */
    is_disabled: boolean;
    /** The display name of the webhook (used for display purposes only). */
    name: string;
    /** Whether to enable automatic retries for transient failures (5xx, 429, timeout) */
    retry_enabled?: boolean | null;
    /** A list of request headers to include with the webhook delivery (optional) */
    request_headers?: { [key: string]: string | undefined } | null;
    /** The unique ID for the webhook */
    webhook_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<PatchWorkspaceWebhookResponseModel>;

  /**
   * Delete Workspace Webhook
   */
  deleteWorkspaceWebhookRoute: (input: {
    /** The unique ID for the webhook */
    webhook_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DeleteWorkspaceWebhookResponseModel>;

  /**
   * Speech To Text
   */
  speechToText: (input: {
    /** The ID of the model to use for transcription. */
    model_id: "scribe_v1" | "scribe_v2";
    /** The file to transcribe (100ms minimum audio length). All major audio and video formats are supported. Exactly one of the file or cloud_storage_url parameters must be provided. The file size must be less than 5.0GB. */
    file?: string | null;
    /** An ISO-639-1 or ISO-639-3 language_code corresponding to the language of the audio file. Can sometimes improve transcription performance if known beforehand. Defaults to null, in this case the language is predicted automatically. */
    language_code?: string | null;
    /** Whether to tag audio events like (laughter), (footsteps), etc. in the transcription. */
    tag_audio_events?: boolean;
    /** The maximum amount of speakers talking in the uploaded file. Can help with predicting who speaks when. The maximum amount of speakers that can be predicted is 32. Defaults to null, in this case the amount of speakers is set to the maximum value the model supports. */
    num_speakers?: number | null;
    /** The granularity of the timestamps in the transcription. 'word' provides word-level timestamps and 'character' provides character-level timestamps per word. */
    timestamps_granularity?: "none" | "word" | "character";
    /** Whether to annotate which speaker is currently talking in the uploaded file. */
    diarize?: boolean;
    /** Diarization threshold to apply during speaker diarization. A higher value means there will be a lower chance of one speaker being diarized as two different speakers but also a higher chance of two different speakers being diarized as one speaker (less total speakers predicted). A low value means there will be a higher chance of one speaker being diarized as two different speakers but also a lower chance of two different speakers being diarized as one speaker (more total speakers predicted). Can only be set when diarize=True and num_speakers=None. Defaults to None, in which case we will choose a threshold based on the model_id (0.22 usually). */
    diarization_threshold?: number | null;
    /** A list of additional formats to export the transcript to. */
    additional_formats?: AdditionalFormats;
    /** The format of input audio. Options are 'pcm_s16le_16' or 'other' For `pcm_s16le_16`, the input audio must be 16-bit PCM at a 16kHz sample rate, single channel (mono), and little-endian byte order. Latency will be lower than with passing an encoded waveform. */
    file_format?: "pcm_s16le_16" | "other";
    /** [Deprecated] This parameter is deprecated and will be removed in the future. Use 'source_url' instead.The HTTPS URL of the file to transcribe. Exactly one of the file or cloud_storage_url parameters must be provided. The file must be accessible via HTTPS and the file size must be less than 2GB. Any valid HTTPS URL is accepted, including URLs from cloud storage providers (AWS S3, Google Cloud Storage, Cloudflare R2, etc.), CDNs, or any other HTTPS source. URLs can be pre-signed or include authentication tokens in query parameters. */
    cloud_storage_url?: string | null;
    /** The URL of an audio or video file to transcribe. Supports hosted video or audio files, YouTube video URLs, TikTok video URLs, and other video hosting services. */
    source_url?: string | null;
    /** Whether to send the transcription result to configured speech-to-text webhooks.  If set the request will return early without the transcription, which will be delivered later via webhook. */
    webhook?: boolean;
    /** Optional specific webhook ID to send the transcription result to. Only valid when webhook is set to true. If not provided, transcription will be sent to all configured speech-to-text webhooks. */
    webhook_id?: string | null;
    /** Controls the randomness of the transcription output. Accepts values between 0.0 and 2.0, where higher values result in more diverse and less deterministic results. If omitted, we will use a temperature based on the model you selected which is usually 0. */
    temperature?: number | null;
    /** If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be an integer between 0 and 2147483647. */
    seed?: number | null;
    /** Whether the audio file contains multiple channels where each channel contains a single speaker. When enabled, each channel will be transcribed independently and the results will be combined. Each word in the response will include a 'channel_index' field indicating which channel it was spoken on. A maximum of 5 channels is supported. Each channel is billed independently at the full audio duration, so cost scales linearly with the number of channels. */
    use_multi_channel?: boolean;
    /** Optional metadata to be included in the webhook response. This should be a JSON string representing an object with a maximum depth of 2 levels and maximum size of 16KB. Useful for tracking internal IDs, job references, or other contextual information. */
    webhook_metadata?: string | { [key: string]: unknown } | null;
    /** Detect entities in the transcript. Can be 'all' to detect all entities, a single entity type or category string, or a list of entity types/categories. Categories include 'pii', 'phi', 'pci', 'other', 'offensive_language'. When enabled, detected entities will be returned in the 'entities' field with their text, type, and character positions. Usage of this parameter will incur an additional 30% surcharge on the base transcription cost. */
    entity_detection?: string | (string)[] | null;
    /** If true, the transcription will not have any filler words, false starts and non-speech sounds. Only supported with scribe_v2 model. */
    no_verbatim?: boolean;
    /** Whether to detect speaker roles (agent vs customer). Requires diarize=true. Cannot be used with use_multi_channel=true. When enabled, speaker_id values will be 'agent' and 'customer' instead of 'speaker_0', 'speaker_1', etc. Usage incurs an additional 10% surcharge on base transcription cost. */
    detect_speaker_roles?: boolean;
    /** Redact entities from the transcript text. Accepts the same format as entity_detection: 'all', a category ('pii', 'phi'), or specific entity types. Must be a subset of entity_detection. When redaction is enabled, the entities field will not be returned. Usage of this parameter will incur an additional 30% surcharge on the base transcription cost. */
    entity_redaction?: string | (string)[] | null;
    /** How to format redacted entities. 'redacted' replaces with {REDACTED}, 'entity_type' replaces with {ENTITY_TYPE}, 'enumerated_entity_type' replaces with {ENTITY_TYPE_N} where N enumerates each occurrence. Only used when entity_redaction is set. */
    entity_redaction_mode?: string;
    /** A list of keyterms to bias the transcription towards.           The keyterms are words or phrases you want the model to recognise more accurately.           The number of keyterms cannot exceed 1000.           The length of each keyterm must be less than 50 characters.           Keyterms can contain at most 5 words (after normalisation).           For example ["hello", "world", "technical term"].           The following characters are not supported: `<`, `>`, `{`, `}`, `[`, `]`, `\`.           Usage of this parameter will incur an additional 20% surcharge on the base transcription cost.           When more than 100 keyterms are provided, a minimum billable duration of 20 seconds applies per request. */
    keyterms?: (string)[];
    /** When enable_logging is set to false zero retention mode will be used for the request. This will mean log and transcript storage features are unavailable for this request. Zero retention mode may only be used by enterprise customers. */
    enable_logging?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SpeechToTextChunkResponseModel | MultichannelSpeechToTextResponseModel>;

  /**
   * Get Transcript By Id
   */
  getTranscriptById: (input: {
    /** The unique ID of the transcript to retrieve */
    transcription_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SpeechToTextChunkResponseModel | MultichannelSpeechToTextResponseModel>;

  /**
   * Delete Transcript By Id
   */
  deleteTranscriptById: (input: {
    /** The unique ID of the transcript to delete */
    transcription_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Create Single Use Token
   */
  getSingleUseToken: (input: {
    token_type: SingleUseTokenType;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SingleUseTokenResponseModel>;

  /**
   * Create Forced Alignment
   */
  forcedAlignment: (input: {
    /** The file to align. All major audio formats are supported. The file size must be less than 1GB. */
    file: string;
    /** The text to align with the audio. The input text can be in any format, however diarization is not supported at this time. */
    text: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ForcedAlignmentResponseModel>;

  /**
   * Get Signed Url
   */
  getConversationSignedLink: (input: {
    /** Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource. */
    agent_id: string;
    /** Whether to include a conversation_id with the response. If included, the conversation_signature cannot be used again. */
    include_conversation_id?: boolean;
    /** The ID of the branch to use */
    branch_id?: string | null;
    /** The environment to use for resolving environment variables (e.g. 'production', 'staging'). Defaults to 'production'. */
    environment?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ConversationSignedUrlResponseModel>;

  /**
   * Get Signed Url
   */
  getSignedUrlDeprecated: (input: {
    /** Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource. */
    agent_id: string;
    /** Whether to include a conversation_id with the response. If included, the conversation_signature cannot be used again. */
    include_conversation_id?: boolean;
    /** The ID of the branch to use */
    branch_id?: string | null;
    /** The environment to use for resolving environment variables (e.g. 'production', 'staging'). Defaults to 'production'. */
    environment?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ConversationSignedUrlResponseModel>;

  /**
   * Get Webrtc Token
   */
  getLivekitToken: (input: {
    /** Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource. */
    agent_id: string;
    /** Optional custom participant name. If not provided, user ID will be used */
    participant_name?: string | null;
    /** The ID of the branch to use */
    branch_id?: string | null;
    /** The environment to use for resolving environment variables (e.g. 'production', 'staging'). Defaults to 'production'. */
    environment?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<TokenResponseModel>;

  /**
   * Handle An Outbound Call Via Twilio
   */
  handleTwilioOutboundCall: (input: {
    agent_id: string;
    agent_phone_number_id: string;
    to_number: string;
    conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
    /** Whether let Twilio record the call. */
    call_recording_enabled?: boolean | null;
    telephony_call_config?: TelephonyCallConfig;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<TwilioOutboundCallResponse>;

  /**
   * Register A Twilio Call And Return Twiml
   */
  registerTwilioCall: (input: {
    agent_id: string;
    from_number: string;
    to_number: string;
    direction?: TelephonyDirection;
    conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Handle An Outbound Call Via Exotel
   */
  handleExotelOutboundCall: (input: {
    agent_id: string;
    agent_phone_number_id: string;
    to_number: string;
    conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
    telephony_call_config?: TelephonyCallConfig;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ExotelOutboundCallResponse>;

  /**
   * Make An Outbound Call Via Whatsapp
   */
  whatsappOutboundCall: (input: {
    whatsapp_phone_number_id: string;
    whatsapp_user_id: string;
    whatsapp_call_permission_request_template_name: string;
    whatsapp_call_permission_request_template_language_code: string;
    agent_id: string;
    conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WhatsAppOutboundCallResponse>;

  /**
   * Send An Outbound Message Via Whatsapp
   */
  whatsappOutboundMessage: (input: {
    whatsapp_phone_number_id: string;
    whatsapp_user_id: string;
    template_name: string;
    template_language_code: string;
    template_params: (WhatsAppTemplateHeaderComponentParams | WhatsAppTemplateBodyComponentParams | WhatsAppTemplateButtonComponentParams)[];
    agent_id: string;
    conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WhatsAppOutboundMessageResponse>;

  /**
   * Create Agent
   */
  createAgentRoute: (input: {
    /** Conversation configuration for an agent */
    conversation_config: ConversationalConfigApiModelInput;
    /** Platform settings for the agent are all settings that aren't related to the conversation orchestration and content. */
    platform_settings?: AgentPlatformSettingsRequestModel | null;
    /** Workflow for the agent. This is used to define the flow of the conversation and how the agent interacts with tools. */
    workflow?: AgentWorkflowRequestModel;
    /** A name to make the agent easier to find */
    name?: string | null;
    /** Tags to help classify and filter the agent */
    tags?: (string)[] | null;
    /** Deprecated: all agents are versioned. This parameter is ignored. */
    enable_versioning?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<CreateAgentResponseModel>;

  /**
   * Get Agent Summaries
   */
  getAgentSummariesRoute: (input: {
    /** List of agent IDs to fetch summaries for */
    agent_ids: (string)[];
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<{ [key: string]: AgentSummaryBatchSuccessfulResponseModel | BatchFailureResponseModel | undefined }>;

  /**
   * Get Agent
   */
  getAgentRoute: (input: {
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
    /** The ID of the agent version to use */
    version_id?: string | null;
    /** The ID of the branch to use */
    branch_id?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAgentResponseModel>;

  /**
   * Patches An Agent Settings
   */
  patchAgentSettingsRoute: (input: {
    /** Conversation configuration for an agent */
    conversation_config?: { [key: string]: unknown } | null;
    /** Platform settings for the agent are all settings that aren't related to the conversation orchestration and content. */
    platform_settings?: { [key: string]: unknown } | null;
    /** Workflow for the agent. This is used to define the flow of the conversation and how the agent interacts with tools. */
    workflow?: AgentWorkflowRequestModel;
    /** A name to make the agent easier to find */
    name?: string | null;
    /** Tags to help classify and filter the agent */
    tags?: (string)[] | null;
    /** Description for this version when publishing changes (only applicable for versioned agents) */
    version_description?: string | null;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
    /** Deprecated: all agents are versioned. This parameter is ignored. */
    enable_versioning_if_not_enabled?: boolean;
    /** The ID of the branch to use */
    branch_id?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAgentResponseModel>;

  /**
   * Delete Agent
   */
  deleteAgentRoute: (input: {
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Get Agent Widget Config
   */
  getAgentWidgetRoute: (input: {
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
    /** An expiring token that enables a websocket conversation to start. These can be generated for an agent using the /v1/convai/conversation/get-signed-url endpoint */
    conversation_signature?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAgentEmbedResponseModel>;

  /**
   * Get Shareable Agent Link
   */
  getAgentLinkRoute: (input: {
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAgentLinkResponseModel>;

  /**
   * Post Agent Avatar
   */
  postAgentAvatarRoute: (input: {
    /** An image file to be used as the agent's avatar. */
    avatar_file: string;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<PostAgentAvatarResponseModel>;

  /**
   * List Agents
   */
  getAgentsRoute: (input: {
    /** How many Agents to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** Search by agents name. */
    search?: string | null;
    /** Filter agents by archived status */
    archived?: boolean | null;
    /** If set to true, the endpoint will omit any agents that were shared with you by someone else and include only the ones you own. Deprecated: use created_by_user_id instead. */
    show_only_owned_agents?: boolean;
    /** Filter agents by creator user ID. When set, only agents created by this user are returned. Takes precedence over show_only_owned_agents. Use '@me' to refer to the authenticated user. */
    created_by_user_id?: string | null;
    /** The direction to sort the results */
    sort_direction?: SortDirection;
    /** The field to sort the results by */
    sort_by?: AgentSortBy | null;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAgentsPageResponseModel>;

  /**
   * Returns The Size Of The Agent'S Knowledge Base
   */
  getAgentKnowledgeBaseSize: (input: {
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAgentKnowledgebaseSizeResponseModel>;

  /**
   * Calculate Expected Llm Usage For An Agent
   */
  getAgentLlmExpectedCostCalculation: (input: {
    /** Length of the prompt in characters. */
    prompt_length?: number | null;
    /** Pages of content in pdf documents OR urls in agent's Knowledge Base. */
    number_of_pages?: number | null;
    /** Whether RAG is enabled. */
    rag_enabled?: boolean | null;
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<LlmUsageCalculatorResponseModel>;

  /**
   * Duplicate Agent
   */
  duplicateAgentRoute: (input: {
    /** A name to make the agent easier to find */
    name?: string | null;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<CreateAgentResponseModel>;

  /**
   * Simulates A Conversation
   */
  runConversationSimulationRoute: (input: {
    /** A specification detailing how the conversation should be simulated */
    simulation_specification: ConversationSimulationSpecification;
    /** A list of evaluation criteria to test */
    extra_evaluation_criteria?: (PromptEvaluationCriteria)[] | null;
    /** Maximum number of new turns to generate in the conversation simulation */
    new_turns_limit?: number;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AgentSimulatedChatTestResponseModel>;

  /**
   * Simulates A Conversation (Stream)
   */
  runConversationSimulationRouteStream: (input: {
    /** A specification detailing how the conversation should be simulated */
    simulation_specification: ConversationSimulationSpecification;
    /** A list of evaluation criteria to test */
    extra_evaluation_criteria?: (PromptEvaluationCriteria)[] | null;
    /** Maximum number of new turns to generate in the conversation simulation */
    new_turns_limit?: number;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Create Agent Response Test
   */
  createAgentResponseTestRoute: (input: {
    /** Create Chat Response Test Request Information */
    body: CreateResponseUnitTestRequest | CreateToolCallUnitTestRequest | CreateSimulationTestRequest;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<CreateAgentTestResponseModel>;

  /**
   * Create Agent Test Folder
   */
  createAgentTestFolderRoute: (input: {
    /** The name of the folder to create */
    name: string;
    /** The ID of the parent folder. If not provided, the folder will be created at the root level. */
    parent_folder_id?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<CreateAgentTestFolderResponseModel>;

  /**
   * Get Agent Test Folder By Id
   */
  getAgentTestFolderRoute: (input: {
    /** The folder ID. */
    folder_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAgentTestFolderResponseModel>;

  /**
   * Update Agent Test Folder
   */
  updateAgentTestFolderRoute: (input: {
    /** The new name for the folder */
    name: string;
    /** The folder ID. */
    folder_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAgentTestFolderResponseModel>;

  /**
   * Delete Agent Test Folder
   */
  deleteAgentTestFolderRoute: (input: {
    /** The folder ID. */
    folder_id: string;
    /** Force delete. Required for deleting non-empty folders. */
    force?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Bulk Move Tests To Folder
   */
  agentTestingBulkMoveRoute: (input: {
    /** The IDs of tests or folders to move. */
    entity_ids: (string)[];
    /** The folder to move the entities to. If not set, the entities will be moved to the root folder. */
    move_to?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Get Agent Response Test By Id
   */
  getAgentResponseTestRoute: (input: {
    /** The id of a chat response test. This is returned on test creation. */
    test_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetResponseUnitTestResponseModel | GetToolCallUnitTestResponseModel | GetSimulationTestResponseModel>;

  /**
   * Update Agent Response Test
   */
  updateAgentResponseTestRoute: (input: {
    /** Agent test to update */
    body: UpdateResponseUnitTestRequest | UpdateToolCallUnitTestRequest | UpdateSimulationTestRequest;
    /** The id of a chat response test. This is returned on test creation. */
    test_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetResponseUnitTestResponseModel | GetToolCallUnitTestResponseModel | GetSimulationTestResponseModel>;

  /**
   * Delete Agent Response Test
   */
  deleteChatResponseTestRoute: (input: {
    /** The id of a chat response test. This is returned on test creation. */
    test_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Get Agent Response Test Summaries By Ids
   */
  getAgentResponseTestsSummariesRoute: (input: {
    /** List of test IDs to fetch. No duplicates allowed. */
    test_ids: (string)[];
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetTestsSummariesByIdsResponseModel>;

  /**
   * List Agent Response Tests
   */
  listChatResponseTestsRoute: (input: {
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
    /** How many Tests to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** Search query to filter tests by name. */
    search?: string | null;
    /** Filter by parent folder ID. Use 'root' to get items in the root folder. */
    parent_folder_id?: string | null;
    /** If present, the endpoint will return only tests/folders of the given types. */
    types?: (TestType)[] | null;
    /** Deprecated. Use the `types` query param and include `folder` instead. */
    include_folders?: boolean | null;
    /** Sort mode for listing tests. Use 'folders_first' to place folders before tests. */
    sort_mode?: "default" | "folders_first";
    /** Filter test visibility. Use `shared_with_me` to return only tests/folders shared with the current user that they did not create. */
    sharing_mode?: TestSharingMode;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetTestsPageResponseModel>;

  /**
   * List Test Invocations
   */
  listTestInvocationsRoute: (input: {
    /** Filter by agent ID */
    agent_id?: string | null;
    /** How many Tests to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetTestInvocationsPageResponseModel>;

  /**
   * Run Tests On The Agent
   */
  runAgentTestSuiteRoute: (input: {
    /** List of tests to run on the agent */
    tests: (SingleTestRunRequestModel)[];
    /** Configuration overrides to use for testing. If not provided, the agent's default configuration will be used. */
    agent_config_override?: AdhocAgentConfigOverrideForTestRequestModel | null;
    /** ID of the branch to run the tests on. If not provided, the tests will be run on the agent default configuration. */
    branch_id?: string | null;
    /** Number of times to run each test. When greater than 1, results are grouped and summarized. */
    repeat_count?: number;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetTestSuiteInvocationResponseModel>;

  /**
   * Get Test Invocation
   */
  getTestInvocationRoute: (input: {
    /** The id of a test invocation. This is returned when tests are run. */
    test_invocation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetTestSuiteInvocationResponseModel>;

  /**
   * Resubmit Tests
   */
  resubmitTestsRoute: (input: {
    /** List of test run IDs to resubmit */
    test_run_ids: (string)[];
    /** Configuration overrides to use for testing. If not provided, the agent's default configuration will be used. */
    agent_config_override?: AdhocAgentConfigOverrideForTestRequestModel | null;
    /** Agent ID to resubmit tests for */
    agent_id: string;
    /** ID of the branch to run the tests on. If not provided, the tests will be run on the agent default configuration. */
    branch_id?: string | null;
    /** The id of a test invocation. This is returned when tests are run. */
    test_invocation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Get Conversations
   */
  getConversationHistoriesRoute: (input: {
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
    /** Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource. */
    agent_id?: string | null;
    /** The result of the success evaluation */
    call_successful?: EvaluationSuccessResult | null;
    /** Unix timestamp (in seconds) to filter conversations up to this start date. */
    call_start_before_unix?: number | null;
    /** Unix timestamp (in seconds) to filter conversations after to this start date. */
    call_start_after_unix?: number | null;
    /** Minimum call duration in seconds. */
    call_duration_min_secs?: number | null;
    /** Maximum call duration in seconds. */
    call_duration_max_secs?: number | null;
    /** Maximum overall rating (1-5). */
    rating_max?: number | null;
    /** Minimum overall rating (1-5). */
    rating_min?: number | null;
    /** Filter conversations with user feedback comments. */
    has_feedback_comment?: boolean | null;
    /** Filter conversations by the user ID who initiated them. */
    user_id?: string | null;
    /** Evaluation filters. Repeat param. Format: criteria_id:result. Example: eval=value_framing:success */
    evaluation_params?: (string)[] | null;
    /** Data collection filters. Repeat param. Format: id:op:value where op is one of eq|neq|gt|gte|lt|lte|in|exists|missing. For in, pipe-delimit values. */
    data_collection_params?: (string)[] | null;
    /** Filter conversations by tool names used during the call. */
    tool_names?: (string)[] | null;
    /** Filter conversations by tool names that had successful calls. */
    tool_names_successful?: (string)[] | null;
    /** Filter conversations by tool names that had errored calls. */
    tool_names_errored?: (string)[] | null;
    /** Filter conversations by detected main language (language code). */
    main_languages?: (string)[] | null;
    /** How many conversations to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** Whether to include transcript summaries in the response. */
    summary_mode?: "exclude" | "include";
    /** Full-text or fuzzy search over transcript messages */
    search?: string | null;
    conversation_initiation_source?: ConversationInitiationSource | null;
    text_only?: boolean | null;
    /** Filter conversations by branch ID. */
    branch_id?: string | null;
    /** Filter conversations by topic IDs assigned during topic discovery. */
    topic_ids?: (string)[] | null;
    /** Exclude conversations with the given statuses. Useful for hiding in-progress / processing conversations from list views. */
    exclude_statuses?: ("initiated" | "in-progress" | "processing" | "done" | "failed")[] | null;
    /** Filter conversations by conversation tag IDs assigned via the conversation-tags endpoints. */
    tag_ids?: (string)[] | null;
    /** Filter conversations to only those that entered the given node. */
    workflow_node_entered_id?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetConversationsPageResponseModel>;

  /**
   * Get Conversation Users
   */
  getConversationUsersRoute: (input: {
    /** Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource. */
    agent_id?: string | null;
    /** Filter conversations by branch ID. */
    branch_id?: string | null;
    /** Unix timestamp (in seconds) to filter conversations up to this start date. */
    call_start_before_unix?: number | null;
    /** Unix timestamp (in seconds) to filter conversations after to this start date. */
    call_start_after_unix?: number | null;
    /** Search/filter by user ID (exact match). */
    search?: string | null;
    /** How many users to return at maximum. Defaults to 30. */
    page_size?: number;
    /** The field to sort the results by. Defaults to last_contact_unix_secs. */
    sort_by?: UsersSortBy;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetConversationUsersPageResponseModel>;

  /**
   * Get Conversation Details
   */
  getConversationHistoryRoute: (input: {
    /** The id of the conversation you're taking the action on. */
    conversation_id: string;
    /** Response format. Defaults to 'json'. Set to 'opentelemetry' for an OTLP-compatible trace payload using the same structure as the post-call webhook. */
    format?: "json" | "opentelemetry";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetConversationResponseModel>;

  /**
   * Delete Conversation
   */
  deleteConversationRoute: (input: {
    /** The id of the conversation you're taking the action on. */
    conversation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Get Sip Messages For A Conversation
   */
  getConversationSipMessages: (input: {
    /** The id of the conversation you're taking the action on. */
    conversation_id: string;
    page_size?: number;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetSipLogMessagesResponse>;

  /**
   * Get Conversation Audio
   */
  getConversationAudioRoute: (input: {
    /** The id of the conversation you're taking the action on. */
    conversation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Send Conversation Feedback
   */
  postConversationFeedbackRoute: (input: {
    /** Either 'like' or 'dislike' to indicate the feedback for the conversation. */
    feedback?: UserFeedbackScore | null;
    /** The id of the conversation you're taking the action on. */
    conversation_id: string;
  }) => Promise<unknown>;

  /**
   * Text Search Conversation Messages
   */
  textSearchConversationMessagesRoute: (input: {
    /** The search query text for full-text and fuzzy matching */
    text_query: string;
    /** Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource. */
    agent_id?: string | null;
    /** The result of the success evaluation */
    call_successful?: EvaluationSuccessResult | null;
    /** Unix timestamp (in seconds) to filter conversations up to this start date. */
    call_start_before_unix?: number | null;
    /** Unix timestamp (in seconds) to filter conversations after to this start date. */
    call_start_after_unix?: number | null;
    /** Minimum call duration in seconds. */
    call_duration_min_secs?: number | null;
    /** Maximum call duration in seconds. */
    call_duration_max_secs?: number | null;
    /** Maximum overall rating (1-5). */
    rating_max?: number | null;
    /** Minimum overall rating (1-5). */
    rating_min?: number | null;
    /** Filter conversations with user feedback comments. */
    has_feedback_comment?: boolean | null;
    /** Filter conversations by the user ID who initiated them. */
    user_id?: string | null;
    /** Evaluation filters. Repeat param. Format: criteria_id:result. Example: eval=value_framing:success */
    evaluation_params?: (string)[] | null;
    /** Data collection filters. Repeat param. Format: id:op:value where op is one of eq|neq|gt|gte|lt|lte|in|exists|missing. For in, pipe-delimit values. */
    data_collection_params?: (string)[] | null;
    /** Filter conversations by tool names used during the call. */
    tool_names?: (string)[] | null;
    /** Filter conversations by tool names that had successful calls. */
    tool_names_successful?: (string)[] | null;
    /** Filter conversations by tool names that had errored calls. */
    tool_names_errored?: (string)[] | null;
    /** Filter conversations by detected main language (language code). */
    main_languages?: (string)[] | null;
    /** Number of results per page. Max 50. */
    page_size?: number;
    /** Whether to include transcript summaries in the response. */
    summary_mode?: "exclude" | "include";
    conversation_initiation_source?: ConversationInitiationSource | null;
    text_only?: boolean | null;
    /** Filter conversations by branch ID. */
    branch_id?: string | null;
    /** Filter conversations by topic IDs assigned during topic discovery. */
    topic_ids?: (string)[] | null;
    /** Sort order for search results. 'search_score' sorts by search score, 'created_at' sorts by conversation start time. */
    sort_by?: MessageSearchSortBy;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<MessagesSearchResponse>;

  /**
   * Smart Search Conversation Messages
   */
  smartSearchConversationMessagesRoute: (input: {
    /** The search query text for semantic similarity matching */
    text_query: string;
    /** Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource. */
    agent_id?: string | null;
    /** Number of results per page. Max 50. */
    page_size?: number;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<MessagesSearchResponse>;

  /**
   * Assign Conversation Tags
   */
  assignConversationTagsRoute: (input: {
    /** Tag IDs to add to the conversation. Re-assigning an existing tag is a no-op. */
    tag_ids: (string)[];
    conversation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Unassign Conversation Tag
   */
  unassignConversationTagRoute: (input: {
    conversation_id: string;
    tag_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * List Conversation Tags
   */
  listConversationTagsRoute: (input: {
    /** How many conversation tags to return. Can not exceed 100. */
    page_size?: number;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetConversationTagsPageResponseModel>;

  /**
   * Create Conversation Tag
   */
  createConversationTagRoute: (input: {
    /** Display title of the tag. */
    title: string;
    /** Optional free-text description. */
    description?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ConversationTagResponseModel>;

  /**
   * Get Conversation Tag
   */
  getConversationTagRoute: (input: {
    tag_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ConversationTagResponseModel>;

  /**
   * Update Conversation Tag
   */
  updateConversationTagRoute: (input: {
    /** If provided, replaces the tag title. Omit to leave unchanged. */
    title?: string | null;
    /** If provided, replaces the tag description. Omit to leave unchanged. */
    description?: string | null;
    tag_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ConversationTagResponseModel>;

  /**
   * Delete Conversation Tag
   */
  deleteConversationTagRoute: (input: {
    tag_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Import Phone Number
   */
  createPhoneNumberRoute: (input: {
    /** Create Phone Request Information */
    body: CreateTwilioPhoneNumberRequest | CreateExotelPhoneNumberRequest | CreateSipTrunkPhoneNumberRequestV2;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<CreatePhoneNumberResponseModel>;

  /**
   * List Phone Numbers
   */
  listPhoneNumbersRoute: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<(GetPhoneNumberTwilioResponseModel | GetPhoneNumberExotelResponseModel | GetPhoneNumberSipTrunkResponseModel)[]>;

  /**
   * Get Phone Number
   */
  getPhoneNumberRoute: (input: {
    /** The id of an agent. This is returned on agent creation. */
    phone_number_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetPhoneNumberTwilioResponseModel | GetPhoneNumberExotelResponseModel | GetPhoneNumberSipTrunkResponseModel>;

  /**
   * Delete Phone Number
   */
  deletePhoneNumberRoute: (input: {
    /** The id of an agent. This is returned on agent creation. */
    phone_number_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Update Phone Number
   */
  updatePhoneNumberRoute: (input: {
    agent_id?: string | null;
    label?: string | null;
    inbound_trunk_config?: InboundSipTrunkConfigRequestModel | null;
    outbound_trunk_config?: OutboundSipTrunkConfigRequestModel | null;
    livekit_stack?: LivekitStackType | null;
    store_sip_messages?: boolean | null;
    /** Environment to use for resolving environment variables on calls to this number. */
    environment?: string | null;
    /** Agent branch to use for calls to this number. */
    branch_id?: string | null;
    /** The id of an agent. This is returned on agent creation. */
    phone_number_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetPhoneNumberTwilioResponseModel | GetPhoneNumberExotelResponseModel | GetPhoneNumberSipTrunkResponseModel>;

  /**
   * Get Sip Messages For A Phone Number
   */
  listSipMessages: (input: {
    /** The id of an agent. This is returned on agent creation. */
    phone_number_id: string;
    page_size?: number;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetSipLogMessagesResponse>;

  /**
   * Calculate Expected Llm Usage
   */
  getPublicLlmExpectedCostCalculation: (input: {
    /** Length of the prompt in characters. */
    prompt_length: number;
    /** Pages of content in PDF documents or URLs in the agent's knowledge base. */
    number_of_pages: number;
    /** Whether RAG is enabled. */
    rag_enabled: boolean;
  }) => Promise<LlmUsageCalculatorResponseModel>;

  /**
   * List Available Llms
   */
  listAvailableLlms: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<LlmListResponseModelInput>;

  /**
   * Upload File
   */
  uploadFileRoute: (input: {
    /** Image or PDF file to upload */
    file: string;
    conversation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ConvAiFileUploadResponseModel>;

  /**
   * Delete File Upload
   */
  cancelFileUploadRoute: (input: {
    file_id: string;
    conversation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ConvAiFileUploadResponseModel>;

  /**
   * Get Live Count
   */
  getLiveCount: (input: {
    /** The id of an agent to restrict the analytics to. */
    agent_id?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetLiveCountResponse>;

  /**
   * Get Knowledge Base Summaries By Ids
   */
  getAgentKnowledgeBaseSummariesRoute: (input: {
    /** The ids of knowledge base documents. */
    document_ids: (string)[];
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<{ [key: string]: KnowledgeBaseSummaryBatchSuccessfulResponseModel | BatchFailureResponseModel | undefined }>;

  /**
   * Add To Knowledge Base
   */
  addDocumentationToKnowledgeBase: (input: {
    /** A custom, human-readable name for the document. */
    name?: string | null;
    /** URL to a page of documentation that the agent will have access to in order to interact with users. */
    url?: string;
    /** Documentation that the agent will have access to in order to interact with users. */
    file?: string;
    agent_id?: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddKnowledgeBaseResponseModel>;

  /**
   * Get Knowledge Base List
   */
  getKnowledgeBaseListRoute: (input: {
    /** How many documents to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** If specified, the endpoint returns only such knowledge base documents whose names start with this string. */
    search?: string | null;
    /** If set to true, the endpoint will return only documents owned by you (and not shared from somebody else). Deprecated: use created_by_user_id instead. */
    show_only_owned_documents?: boolean;
    /** Filter documents by creator user ID. When set, only documents created by this user are returned. Takes precedence over show_only_owned_documents. Use '@me' to refer to the authenticated user. */
    created_by_user_id?: string | null;
    /** If present, the endpoint will return only documents of the given types. */
    types?: (KnowledgeBaseDocumentType)[] | null;
    /** If set, the endpoint will return only documents that are direct children of the given folder. */
    parent_folder_id?: string | null;
    /** If set, the endpoint will return only documents that are descendants of the given folder. */
    ancestor_folder_id?: string | null;
    /** Whether folders should be returned first in the list of documents. */
    folders_first?: boolean;
    /** The direction to sort the results */
    sort_direction?: SortDirection;
    /** The field to sort the results by */
    sort_by?: KnowledgeBaseSortBy | null;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetKnowledgeBaseListResponseModel>;

  /**
   * Create Url Document
   */
  createUrlDocumentRoute: (input: {
    /** URL to a page of documentation that the agent will have access to in order to interact with users. */
    url: string;
    /** A custom, human-readable name for the document. */
    name?: string | null;
    /** If set, the created document or folder will be placed inside the given folder. */
    parent_folder_id?: string | null;
    /** Whether to enable auto-sync for this URL document. */
    enable_auto_sync?: boolean;
    /** Whether to automatically remove the document if the URL becomes unavailable. Only applicable when auto-sync is enabled. */
    auto_remove?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddKnowledgeBaseResponseModel>;

  /**
   * Create File Document
   */
  createFileDocumentRoute: (input: {
    /** Documentation that the agent will have access to in order to interact with users. */
    file: string;
    /** A custom, human-readable name for the document. */
    name?: string | null;
    /** If set, the created document or folder will be placed inside the given folder. */
    parent_folder_id?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddKnowledgeBaseResponseModel>;

  /**
   * Create Text Document
   */
  createTextDocumentRoute: (input: {
    /** Text content to be added to the knowledge base. */
    text: string;
    /** A custom, human-readable name for the document. */
    name?: string | null;
    /** If set, the created document or folder will be placed inside the given folder. */
    parent_folder_id?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddKnowledgeBaseResponseModel>;

  /**
   * Create Folder
   */
  createFolderRoute: (input: {
    /** A custom, human-readable name for the document. */
    name: string;
    /** If set, the created document or folder will be placed inside the given folder. */
    parent_folder_id?: string | null;
    /** Whether to enable auto-sync for this URL document. */
    enable_auto_sync?: boolean;
    /** Whether to automatically remove the document if the URL becomes unavailable. Only applicable when auto-sync is enabled. */
    auto_remove?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddKnowledgeBaseResponseModel>;

  /**
   * Update Document
   */
  updateDocumentRoute: (input: {
    /** A custom, human-readable name for the document. */
    name?: string | null;
    /** Updated content for the document. Only supported for text documents, URL documents with auto-sync disabled, and file documents. */
    content?: string | null;
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetKnowledgeBaseUrlResponseModel | GetKnowledgeBaseFileResponseModel | GetKnowledgeBaseTextResponseModel | GetKnowledgeBaseFolderResponseModel>;

  /**
   * Get Documentation From Knowledge Base
   */
  getDocumentationFromKnowledgeBase: (input: {
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
    agent_id?: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetKnowledgeBaseUrlResponseModel | GetKnowledgeBaseFileResponseModel | GetKnowledgeBaseTextResponseModel | GetKnowledgeBaseFolderResponseModel>;

  /**
   * Delete Knowledge Base Document Or Folder
   */
  deleteKnowledgeBaseDocument: (input: {
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
    /** If set to true, the document or folder will be deleted regardless of whether it is used by any agents and it will be removed from the dependent agents. For non-empty folders, this will also delete all child documents and folders. */
    force?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Update File Document
   */
  updateFileDocumentRoute: (input: {
    /** Documentation that the agent will have access to in order to interact with users. */
    file: string;
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetKnowledgeBaseUrlResponseModel | GetKnowledgeBaseFileResponseModel | GetKnowledgeBaseTextResponseModel | GetKnowledgeBaseFolderResponseModel>;

  /**
   * Compute Rag Indexes In Batch
   */
  getOrCreateRagIndexes: (input: {
    /** List of requested RAG indexes. Minimum 1, maximum 100 items. */
    items: (GetOrCreateRagIndexRequestModel)[];
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<{ [key: string]: RagIndexBatchSuccessfulResponseModel | BatchFailureResponseModel | undefined }>;

  /**
   * Get Rag Index Overview.
   */
  getRagIndexOverview: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<RagIndexOverviewResponseModel>;

  /**
   * Refresh Url Document Content
   */
  refreshUrlDocumentRoute: (input: {
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetKnowledgeBaseUrlResponseModel | GetKnowledgeBaseFileResponseModel | GetKnowledgeBaseTextResponseModel | GetKnowledgeBaseFolderResponseModel>;

  /**
   * Compute Rag Index.
   */
  ragIndexStatus: (input: {
    model: EmbeddingModelEnum;
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<RagDocumentIndexResponseModel>;

  /**
   * Get Rag Indexes Of The Specified Knowledgebase Document.
   */
  getRagIndexes: (input: {
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<RagDocumentIndexesResponseModel>;

  /**
   * Delete Rag Index.
   */
  deleteRagIndex: (input: {
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
    /** The id of RAG index of document from the knowledge base. */
    rag_index_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<RagDocumentIndexResponseModel>;

  /**
   * Search Knowledge Base Content
   */
  searchKnowledgeBaseContentRoute: (input: {
    /** The search query text */
    query: string;
    /** How many documents to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** If present, the endpoint will return only documents of the given types. */
    types?: (KnowledgeBaseDocumentType)[] | null;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<KnowledgeBaseContentSearchResponseModel>;

  /**
   * Get Dependent Agents List
   */
  getKnowledgeBaseDependentAgents: (input: {
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
    /** Type of dependent agents to return. */
    dependent_type?: KnowledgeBaseDependentType;
    /** How many documents to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetKnowledgeBaseDependentAgentsResponseModel>;

  /**
   * Get Document Content
   */
  getKnowledgeBaseContent: (input: {
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Get Document Source File Url
   */
  getKnowledgeBaseSourceFileUrl: (input: {
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<KnowledgeBaseSourceFileUrlResponseModel>;

  /**
   * Get Documentation Chunk From Knowledge Base
   */
  getDocumentationChunkFromKnowledgeBase: (input: {
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
    /** The id of a document RAG chunk from the knowledge base. */
    chunk_id: string;
    /** The embedding model used to retrieve the chunk. */
    embedding_model?: EmbeddingModelEnum | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<KnowledgeBaseDocumentChunkResponseModel>;

  /**
   * Get All Rag Chunks For A Document
   */
  getDocumentationChunksFromKnowledgeBase: (input: {
    /** The id of a document from the knowledge base. This is returned on document addition. */
    documentation_id: string;
    /** The embedding model used to retrieve the chunk. */
    embedding_model: EmbeddingModelEnum;
    /** How many documents to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<KnowledgeBaseDocumentChunksResponseModel>;

  /**
   * Move Entity To Folder
   */
  postKnowledgeBaseMoveRoute: (input: {
    /** The folder to move the entities to. If not set, the entities will be moved to the root folder. */
    move_to?: string | null;
    /** The id of a document from the knowledge base. This is returned on document addition. */
    document_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Bulk Move Entities To Folder
   */
  postKnowledgeBaseBulkMoveRoute: (input: {
    /** The ids of documents or folders from the knowledge base. */
    document_ids: (string)[];
    /** The folder to move the entities to. If not set, the entities will be moved to the root folder. */
    move_to?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Get Agent Conversation Topics
   */
  getAgentTopicsRoute: (input: {
    /** ID of the agent */
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetAgentTopicsResponseModel>;

  /**
   * Add Tool
   */
  addToolRoute: (input: {
    /** Configuration for the tool */
    tool_config: WebhookToolConfigInput | ClientToolConfigInput | SystemToolConfigInput | McpToolConfigInput;
    /** Mock responses with optional parameter conditions. Evaluated top-to-bottom; first match wins. */
    response_mocks?: (ToolResponseMockConfigInput)[] | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ToolResponseModel>;

  /**
   * Get Tools
   */
  getToolsRoute: (input: {
    /** If specified, the endpoint returns only tools whose names start with this string. */
    search?: string | null;
    /** How many documents to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number | null;
    /** If set to true, the endpoint will return only tools owned by you (and not shared from somebody else). Deprecated: use created_by_user_id instead. */
    show_only_owned_documents?: boolean;
    /** Filter tools by creator user ID. When set, only tools created by this user are returned. Takes precedence over show_only_owned_documents. Use '@me' to refer to the authenticated user. */
    created_by_user_id?: string | null;
    /** If present, the endpoint will return only tools of the given types. */
    types?: (ToolTypeFilter)[] | null;
    /** The direction to sort the results */
    sort_direction?: SortDirection;
    /** The field to sort the results by */
    sort_by?: ToolSortBy | null;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ToolsResponseModel>;

  /**
   * Get Tool
   */
  getToolRoute: (input: {
    /** ID of the requested tool. */
    tool_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ToolResponseModel>;

  /**
   * Update Tool
   */
  updateToolRoute: (input: {
    /** Configuration for the tool */
    tool_config: WebhookToolConfigInput | ClientToolConfigInput | SystemToolConfigInput | McpToolConfigInput;
    /** Mock responses with optional parameter conditions. Evaluated top-to-bottom; first match wins. */
    response_mocks?: (ToolResponseMockConfigInput)[] | null;
    /** ID of the requested tool. */
    tool_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ToolResponseModel>;

  /**
   * Delete Tool
   */
  deleteToolRoute: (input: {
    /** ID of the requested tool. */
    tool_id: string;
    /** If set to true, the tool will be deleted regardless of whether it is used by any agents and it will be removed from the dependent agents and branches. */
    force?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Get Dependent Agents List
   */
  getToolDependentAgentsRoute: (input: {
    /** ID of the requested tool. */
    tool_id: string;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
    /** How many documents to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetToolDependentAgentsResponseModel>;

  /**
   * Get Tool Executions
   */
  getToolExecutionsRoute: (input: {
    /** ID of the requested tool. */
    tool_id: string;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
    /** How many documents to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** Filter by error status. If not provided, returns all executions. */
    is_error?: boolean | null;
    /** Filter by agent ID. */
    agent_id?: string | null;
    /** Filter by agent branch ID. */
    branch_id?: string | null;
    /** Filter executions from this Unix timestamp (inclusive). */
    start_time?: number | null;
    /** Filter executions until this Unix timestamp (inclusive). */
    end_time?: number | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetToolExecutionsPageResponseModel>;

  /**
   * Get Convai Settings
   */
  getSettingsRoute: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetConvAiSettingsResponseModel>;

  /**
   * Update Convai Settings
   */
  updateSettingsRoute: (input: {
    conversation_initiation_client_data_webhook?: ConversationInitiationClientDataWebhook | null;
    webhooks?: ConvAiWebhooks;
    /** Whether the workspace can use MCP servers */
    can_use_mcp_servers?: boolean;
    rag_retention_period_days?: number;
    /** Days to retain conversation embeddings. None means use the system default (30 days). */
    conversation_embedding_retention_days?: number | null;
    default_livekit_stack?: LivekitStackType;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetConvAiSettingsResponseModel>;

  /**
   * Get Convai Dashboard Settings
   */
  getDashboardSettingsRoute: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetConvAiDashboardSettingsResponseModel>;

  /**
   * Update Convai Dashboard Settings
   */
  updateDashboardSettingsRoute: (input: {
    charts?: (DashboardCallSuccessChartModel | DashboardCriteriaChartModel | DashboardDataCollectionChartModel)[];
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetConvAiDashboardSettingsResponseModel>;

  /**
   * Create Convai Workspace Secret
   */
  createSecretRoute: (input: {
    type: string;
    name: string;
    value: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<PostWorkspaceSecretResponseModel>;

  /**
   * Get Convai Workspace Secrets
   */
  getSecretsRoute: (input: {
    /** How many documents to return at maximum. Can not exceed 100. If not provided, returns all secrets. */
    page_size?: number | null;
    /** Maximum number of dependent resources (tools, agents, phone numbers) to return per secret. Can not exceed 100. */
    dependency_limit?: number | null;
    /** If specified, returns only secrets whose names start with this string. */
    search?: string | null;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetWorkspaceSecretsResponseModel>;

  /**
   * Get Convai Workspace Secret
   */
  getSecretRoute: (input: {
    secret_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ConvAiWorkspaceStoredSecretConfig>;

  /**
   * Delete Convai Workspace Secret
   */
  deleteSecretRoute: (input: {
    secret_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Update Convai Workspace Secret
   */
  updateSecretRoute: (input: {
    type: string;
    name: string;
    value: string;
    secret_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<PostWorkspaceSecretResponseModel>;

  /**
   * Get Secret Dependencies By Type
   */
  getSecretDependenciesRoute: (input: {
    secret_id: string;
    resource_type: SecretDependencyResourceType;
    /** How many dependency items to return per page. */
    page_size?: number;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetSecretDependenciesResponseModel>;

  /**
   * Submit A Batch Call Request.
   */
  createBatchCall: (input: {
    call_name: string;
    agent_id: string;
    recipients: (OutboundCallRecipient)[];
    scheduled_time_unix?: number | null;
    agent_phone_number_id?: string | null;
    whatsapp_params?: BatchCallWhatsAppParams | null;
    timezone?: string | null;
    branch_id?: string | null;
    environment?: string | null;
    telephony_call_config?: TelephonyCallConfig;
    /** Maximum number of simultaneous calls for this batch. When set, dispatch is governed by this limit rather than workspace/agent capacity percentages. */
    target_concurrency_limit?: number | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<BatchCallResponse>;

  /**
   * Get All Batch Calls For A Workspace.
   */
  getWorkspaceBatchCalls: (input: {
    limit?: number;
    last_doc?: string | null;
    /** Filter batch calls to a single agent. */
    agent_id?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WorkspaceBatchCallsResponse>;

  /**
   * Get A Batch Call By Id.
   */
  getBatchCall: (input: {
    batch_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<BatchCallDetailedResponse>;

  /**
   * Delete A Batch Call.
   */
  deleteBatchCall: (input: {
    batch_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Cancel A Batch Call.
   */
  cancelBatchCall: (input: {
    batch_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<BatchCallResponse>;

  /**
   * Retry A Batch Call.
   */
  retryBatchCall: (input: {
    batch_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<BatchCallResponse>;

  /**
   * Handle An Outbound Call Via Sip Trunk
   */
  handleSipTrunkOutboundCall: (input: {
    agent_id: string;
    agent_phone_number_id: string;
    to_number: string;
    conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
    telephony_call_config?: TelephonyCallConfig;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SipTrunkOutboundCallResponse>;

  /**
   * Create Mcp Server
   */
  createMcpServerRoute: (input: {
    /** Configuration details for the MCP Server. */
    config: McpServerConfigInput;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpServerResponseModel>;

  /**
   * List Mcp Servers
   */
  listMcpServersRoute: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpServersResponseModel>;

  /**
   * Get Mcp Server
   */
  getMcpRoute: (input: {
    /** ID of the MCP Server. */
    mcp_server_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpServerResponseModel>;

  /**
   * Delete Mcp Server
   */
  deleteMcpServerRoute: (input: {
    /** ID of the MCP Server. */
    mcp_server_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Update Mcp Server Configuration
   */
  updateMcpServerConfigRoute: (input: {
    /** The approval mode to set for the MCP server */
    approval_policy?: McpApprovalPolicy | null;
    /** DEPRECATED: use `pre_tool_speech` instead. If set, overrides the server's force_pre_tool_speech setting for this tool. */
    force_pre_tool_speech?: boolean | null;
    /** If set, overrides the server's pre_tool_speech setting for this tool. */
    pre_tool_speech?: PreToolSpeechMode | null;
    /** If set, overrides the server's disable_interruptions setting for this tool */
    disable_interruptions?: boolean | null;
    /** Predefined tool call sound type to play during tool execution for all tools from this MCP server */
    tool_call_sound?: ToolCallSoundType | null;
    /** Determines when the tool call sound should play for all tools from this MCP server */
    tool_call_sound_behavior?: ToolCallSoundBehavior | null;
    /** If set, overrides the server's execution_mode setting for this tool */
    execution_mode?: ToolExecutionMode | null;
    /** The maximum time in seconds to wait for each MCP tool call to complete. */
    response_timeout_secs?: number | null;
    /** The headers to include in requests to the MCP server */
    request_headers?: { [key: string]: string | ConvAiSecretLocator | ConvAiDynamicVariable | ConvAiEnvVarLocator | undefined } | null;
    /** Whether to disable HTTP compression for this MCP server */
    disable_compression?: boolean | null;
    /** Optional secret token for authentication with this MCP server */
    secret_token?: ConvAiSecretLocator | null;
    /** Optional auth connection to use for authentication with this MCP server */
    auth_connection?: AuthConnectionLocator | EnvironmentAuthConnectionLocator | null;
    /** ID of the MCP Server. */
    mcp_server_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpServerResponseModel>;

  /**
   * List Mcp Server Tools
   */
  listMcpServerToolsRoute: (input: {
    /** ID of the MCP Server. */
    mcp_server_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ListMcpToolsResponseModel>;

  /**
   * Update Mcp Server Approval Policy
   */
  updateMcpServerApprovalPolicyRoute: (input: {
    /** The approval mode to set for the MCP server */
    approval_policy: McpApprovalPolicy;
    /** ID of the MCP Server. */
    mcp_server_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpServerResponseModel>;

  /**
   * Create Mcp Server Tool Approval
   */
  addMcpServerToolApprovalRoute: (input: {
    /** The name of the MCP tool */
    tool_name: string;
    /** The description of the MCP tool */
    tool_description: string;
    /** The input schema of the MCP tool (the schema defined on the MCP server before ElevenLabs does any extra processing) */
    input_schema?: { [key: string]: unknown };
    /** The tool-level approval policy */
    approval_policy?: McpToolApprovalPolicy;
    /** ID of the MCP Server. */
    mcp_server_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpServerResponseModel>;

  /**
   * Delete Mcp Server Tool Approval
   */
  removeMcpServerToolApprovalRoute: (input: {
    /** ID of the MCP Server. */
    mcp_server_id: string;
    /** Name of the MCP tool to remove approval for. */
    tool_name: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpServerResponseModel>;

  /**
   * Create Mcp Tool Configuration Override
   */
  addMcpToolConfigOverrideRoute: (input: {
    /** DEPRECATED: use `pre_tool_speech` instead. If set, overrides the server's force_pre_tool_speech setting for this tool. */
    force_pre_tool_speech?: boolean | null;
    /** If set, overrides the server's pre_tool_speech setting for this tool. */
    pre_tool_speech?: PreToolSpeechMode | null;
    /** If set, overrides the server's disable_interruptions setting for this tool */
    disable_interruptions?: boolean | null;
    /** If set, overrides the server's tool_call_sound setting for this tool */
    tool_call_sound?: ToolCallSoundType | null;
    /** If set, overrides the server's tool_call_sound_behavior setting for this tool */
    tool_call_sound_behavior?: ToolCallSoundBehavior | null;
    /** If set, overrides the server's execution_mode setting for this tool */
    execution_mode?: ToolExecutionMode | null;
    /** If set, overrides the server's response timeout for this MCP tool. */
    response_timeout_secs?: number | null;
    /** Dynamic variable assignments for this MCP tool */
    assignments?: (DynamicVariableAssignment)[] | null;
    /** Mapping of json path to input override configuration */
    input_overrides?: { [key: string]: ConstantSchemaOverride | DynamicVariableSchemaOverride | LlmSchemaOverride | undefined } | null;
    /** Mock responses with optional parameter conditions. Evaluated top-to-bottom; first match wins. */
    response_mocks?: (ToolResponseMockConfigInput)[] | null;
    /** The name of the MCP tool */
    tool_name: string;
    /** ID of the MCP Server. */
    mcp_server_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpServerResponseModel>;

  /**
   * Get Mcp Tool Configuration Override
   */
  getMcpToolConfigOverrideRoute: (input: {
    /** ID of the MCP Server. */
    mcp_server_id: string;
    /** Name of the MCP tool to retrieve config overrides for. */
    tool_name: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpToolConfigOverrideOutput>;

  /**
   * Update Mcp Tool Configuration Override
   */
  updateMcpToolConfigOverrideRoute: (input: {
    /** DEPRECATED: use `pre_tool_speech` instead. If set, overrides the server's force_pre_tool_speech setting for this tool. */
    force_pre_tool_speech?: boolean | null;
    /** If set, overrides the server's pre_tool_speech setting for this tool. */
    pre_tool_speech?: PreToolSpeechMode | null;
    /** If set, overrides the server's disable_interruptions setting for this tool */
    disable_interruptions?: boolean | null;
    /** If set, overrides the server's tool_call_sound setting for this tool */
    tool_call_sound?: ToolCallSoundType | null;
    /** If set, overrides the server's tool_call_sound_behavior setting for this tool */
    tool_call_sound_behavior?: ToolCallSoundBehavior | null;
    /** If set, overrides the server's execution_mode setting for this tool */
    execution_mode?: ToolExecutionMode | null;
    /** If set, overrides the server's response timeout for this MCP tool. */
    response_timeout_secs?: number | null;
    /** Dynamic variable assignments for this MCP tool */
    assignments?: (DynamicVariableAssignment)[] | null;
    /** Mapping of json path to input override configuration */
    input_overrides?: { [key: string]: ConstantSchemaOverride | DynamicVariableSchemaOverride | LlmSchemaOverride | undefined } | null;
    /** Mock responses with optional parameter conditions. Evaluated top-to-bottom; first match wins. */
    response_mocks?: (ToolResponseMockConfigInput)[] | null;
    /** ID of the MCP Server. */
    mcp_server_id: string;
    /** Name of the MCP tool to update config overrides for. */
    tool_name: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpServerResponseModel>;

  /**
   * Delete Mcp Tool Configuration Override
   */
  removeMcpToolConfigOverrideRoute: (input: {
    /** ID of the MCP Server. */
    mcp_server_id: string;
    /** Name of the MCP tool to remove config overrides for. */
    tool_name: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<McpServerResponseModel>;

  /**
   * Get Whatsapp Account
   */
  getWhatsappAccount: (input: {
    phone_number_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetWhatsAppAccountResponse>;

  /**
   * Update Whatsapp Account
   */
  updateWhatsappAccount: (input: {
    assigned_agent_id?: string | null;
    enable_messaging?: boolean | null;
    enable_audio_message_response?: boolean | null;
    phone_number_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Delete Whatsapp Account
   */
  deleteWhatsappAccount: (input: {
    phone_number_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * List Whatsapp Accounts
   */
  listWhatsappAccounts: (options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ListWhatsAppAccountsResponse>;

  /**
   * Create A New Branch
   */
  createBranchRoute: (input: {
    /** ID of the version to branch from */
    parent_version_id: string;
    /** Name of the branch. It is unique within the agent. */
    name: string;
    /** Description for the branch */
    description: string;
    /** Changes to apply to conversation config */
    conversation_config?: { [key: string]: unknown } | null;
    /** Changes to apply to platform settings */
    platform_settings?: { [key: string]: unknown } | null;
    /** Updated workflow definition */
    workflow?: AgentWorkflowRequestModel | null;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<CreateAgentBranchResponseModel>;

  /**
   * List Agent Branches
   */
  getBranchesRoute: (input: {
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
    /** Whether archived branches should be included */
    include_archived?: boolean;
    /** How many results at most should be returned */
    limit?: number;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ListResponseAgentBranchSummary>;

  /**
   * Get Agent Branch
   */
  getBranchRoute: (input: {
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
    /** Unique identifier for the branch. */
    branch_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AgentBranchResponse>;

  /**
   * Update Agent Branch
   */
  updateBranchRoute: (input: {
    /** New name for the branch. Must be unique within the agent. */
    name?: string | null;
    /** Whether the branch should be archived */
    is_archived?: boolean | null;
    /** The protection level for the branch */
    protection_status?: BranchProtectionStatus | null;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
    /** Unique identifier for the branch. */
    branch_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AgentBranchResponse>;

  /**
   * Get Agent Version Metadata
   */
  getVersionMetadataRoute: (input: {
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
    /** Unique identifier for the version. */
    version_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AgentVersionMetadata>;

  /**
   * Merge A Branch Into A Target Branch
   */
  mergeBranchIntoTarget: (input: {
    /** Whether to archive the source branch after merging */
    archive_source_branch?: boolean;
    /** Force source branch changes onto the target, overriding timestamp-based conflict resolution */
    force?: boolean;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
    /** Unique identifier for the source branch to merge from. */
    source_branch_id: string;
    /** The ID of the target branch to merge into. */
    target_branch_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Create Or Update Deployments
   */
  createAgentDeploymentRoute: (input: {
    /** Request to create a new deployment */
    deployment_request: AgentDeploymentRequest;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AgentDeploymentResponse>;

  /**
   * Create Agent Draft
   */
  createAgentDraftRoute: (input: {
    /** Conversation config for the draft */
    conversation_config: { [key: string]: unknown };
    /** Platform settings for the draft */
    platform_settings: { [key: string]: unknown };
    /** Workflow for the draft */
    workflow: AgentWorkflowRequestModel;
    /** Name for the draft */
    name: string;
    /** Tags to help classify and filter the agent */
    tags?: (string)[] | null;
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
    /** The ID of the agent branch to use */
    branch_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * Delete Agent Draft
   */
  deleteAgentDraftRoute: (input: {
    /** The id of an agent. This is returned on agent creation. */
    agent_id: string;
    /** The ID of the agent branch to use */
    branch_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<unknown>;

  /**
   * List Speech Engines
   */
  listSpeechEngines: (input: {
    /** How many Speech Engines to return at maximum. Can not exceed 100, defaults to 30. */
    page_size?: number;
    /** Search term to filter Speech Engines by name */
    search?: string | null;
    /** The direction to sort the results */
    sort_direction?: SortDirection;
    /** The field to sort the results by */
    sort_by?: AgentSortBy | null;
    /** Used for fetching next page. Cursor is returned in the response. */
    cursor?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ListSpeechEnginesResponse>;

  /**
   * Create Speech Engine
   */
  createSpeechEngine: (input: {
    /** Name of the speech engine */
    name?: string;
    /** Speech engine WebSocket configuration */
    speech_engine: SpeechEngineConfig;
    /** ASR configuration */
    asr?: AsrConversationalConfig;
    /** TTS configuration */
    tts?: TtsConversationalConfigInput;
    /** Turn detection configuration */
    turn?: BaseTurnConfig;
    /** Conversation configuration (client events, etc.) */
    conversation?: ConversationConfigInput;
    /** Privacy settings (recording, retention, zero retention mode) */
    privacy?: PrivacyConfigInput;
    /** Concurrency and daily conversation limits for this speech engine */
    call_limits?: AgentCallLimits;
    /** Language for the speech engine */
    language?: string;
    /** Tags for categorization */
    tags?: (string)[];
    /** Override settings the client may set during conversation initiation */
    overrides?: SpeechEngineConversationInitiationClientDataConfig;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SpeechEngineResponse>;

  /**
   * Get Speech Engine
   */
  getSpeechEngine: (input: {
    /** The speech engine ID (accepts seng_ or agent_ prefix) */
    speech_engine_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SpeechEngineResponse>;

  /**
   * Update Speech Engine
   */
  updateSpeechEngine: (input: {
    name?: string | null;
    speech_engine?: SpeechEngineConfig | null;
    asr?: AsrConversationalConfig | null;
    tts?: TtsConversationalConfigInput | null;
    turn?: BaseTurnConfig | null;
    conversation?: ConversationConfigInput | null;
    privacy?: PrivacyConfigInput | null;
    call_limits?: AgentCallLimits | null;
    language?: string | null;
    tags?: (string)[] | null;
    overrides?: SpeechEngineConversationInitiationClientDataConfig | null;
    /** The speech engine ID (accepts seng_ or agent_ prefix) */
    speech_engine_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SpeechEngineResponse>;

  /**
   * Delete Speech Engine
   */
  deleteSpeechEngine: (input: {
    /** The speech engine ID (accepts seng_ or agent_ prefix) */
    speech_engine_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Run Conversation Analysis
   */
  runConversationAnalysis: (input: {
    /** ID of the conversation */
    conversation_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<GetConversationResponseModel>;

  /**
   * Create Environment Variable
   */
  createEnvironmentVariable: (input: {
    body: CreateStringEnvironmentVariableRequest | CreateSecretEnvironmentVariableRequest | CreateAuthConnectionEnvironmentVariableRequest;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<EnvironmentVariableResponse>;

  /**
   * List Environment Variables
   */
  listEnvironmentVariables: (input: {
    /** Pagination cursor from previous response */
    cursor?: string | null;
    /** Number of items to return (1-100) */
    page_size?: number;
    /** Filter by exact label match */
    label?: string | null;
    /** Filter to only return variables that have this environment. When specified, the values dict in the response will only contain this environment. */
    environment?: string | null;
    /** Filter by variable type */
    type?: "string" | "secret" | "auth_connection" | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<EnvironmentVariablesListResponse>;

  /**
   * Get Environment Variable
   */
  getEnvironmentVariable: (input: {
    env_var_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<EnvironmentVariableResponse>;

  /**
   * Update Environment Variable
   */
  updateEnvironmentVariable: (input: {
    /** Values to replace. Set to null to remove an environment (except 'production'). */
    values: { [key: string]: string | EnvironmentVariableSecretValueRequest | EnvironmentVariableAuthConnectionValueRequest | null | undefined };
    env_var_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<EnvironmentVariableResponse>;

  /**
   * Generate Composition Plan
   */
  composePlan: (input: {
    /** A simple text prompt to compose a plan from. */
    prompt: string;
    /** The length of the composition plan to generate in milliseconds. Must be between 3000ms and 600000ms. Optional - if not provided, the model will choose a length based on the prompt. */
    music_length_ms?: number | null;
    /** An optional composition plan to use as a source for the new composition plan. */
    source_composition_plan?: MusicPrompt | null;
    /** The model to use for the generation. */
    model_id?: "music_v1";
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<MusicPrompt>;

  /**
   * Compose Music
   */
  generate: (input: {
    /** A simple text prompt to generate a song from. Cannot be used in conjunction with `composition_plan`. */
    prompt?: string | null;
    /** Optional generation mode hint for prompt-based music generation. Can only be used with `prompt`. */
    generation_mode?: MusicGenerationMode | null;
    /** A music prompt. Deprecated. Use `composition_plan` instead. */
    music_prompt?: MusicPrompt | null;
    /** The lyrics text to use for the generation. */
    lyrics_text?: string | null;
    /** A detailed composition plan to guide music generation. Cannot be used in conjunction with `prompt`. */
    composition_plan?: MusicPrompt | null;
    /** The length of the song to generate in milliseconds. Used only in conjunction with `prompt`. Must be between 3000ms and 600000ms. Optional - if not provided, the model will choose a length based on the prompt. */
    music_length_ms?: number | null;
    /** The model to use for the generation. */
    model_id?: "music_v1";
    /** Random seed to initialize the music generation process. Providing the same seed with the same parameters can help achieve more consistent results, but exact reproducibility is not guaranteed and outputs may change across system updates. Cannot be used in conjunction with prompt. */
    seed?: number | null;
    /** If true, guarantees that the generated song will be instrumental. If false, the song may or may not be instrumental depending on the `prompt`. Can only be used with `prompt`. */
    force_instrumental?: boolean;
    /** The ID of the finetune to use for the generation */
    finetune_id?: string | null;
    /** How strongly the finetune influences the generation. Defaults to 1.0 (full strength). Lower values soften the influence of the finetune, leaving more room for prompt-level steering. Only meaningful when `finetune_id` is also provided. */
    finetune_strength?: number;
    /** If true, proper names in the prompt will be phonetically spelled in the lyrics for better pronunciation by the music model. The original names will be restored in word timestamps. */
    use_phonetic_names?: boolean;
    /** Controls how strictly section durations in the `composition_plan` are enforced. Only used with `composition_plan`. When set to true, the model will precisely respect each section's `duration_ms` from the plan. When set to false, the model may adjust individual section durations which will generally lead to better generation quality and improved latency, while always preserving the total song duration from the plan. */
    respect_sections_durations?: boolean;
    /** Whether to store the generated song for inpainting. Only available to enterprise clients with access to the inpainting feature. */
    store_for_inpainting?: boolean;
    /** Whether to sign the generated song with C2PA. Applicable only for mp3 files. */
    sign_with_c2pa?: boolean;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Compose Music With A Detailed Response
   */
  composeDetailed: (input: {
    /** A simple text prompt to generate a song from. Cannot be used in conjunction with `composition_plan`. */
    prompt?: string | null;
    /** Optional generation mode hint for prompt-based music generation. Can only be used with `prompt`. */
    generation_mode?: MusicGenerationMode | null;
    /** A music prompt. Deprecated. Use `composition_plan` instead. */
    music_prompt?: MusicPrompt | null;
    /** The lyrics text to use for the generation. */
    lyrics_text?: string | null;
    /** A detailed composition plan to guide music generation. Cannot be used in conjunction with `prompt`. */
    composition_plan?: MusicPrompt | null;
    /** The length of the song to generate in milliseconds. Used only in conjunction with `prompt`. Must be between 3000ms and 600000ms. Optional - if not provided, the model will choose a length based on the prompt. */
    music_length_ms?: number | null;
    /** The model to use for the generation. */
    model_id?: "music_v1";
    /** Random seed to initialize the music generation process. Providing the same seed with the same parameters can help achieve more consistent results, but exact reproducibility is not guaranteed and outputs may change across system updates. Cannot be used in conjunction with prompt. */
    seed?: number | null;
    /** If true, guarantees that the generated song will be instrumental. If false, the song may or may not be instrumental depending on the `prompt`. Can only be used with `prompt`. */
    force_instrumental?: boolean;
    /** The ID of the finetune to use for the generation */
    finetune_id?: string | null;
    /** How strongly the finetune influences the generation. Defaults to 1.0 (full strength). Lower values soften the influence of the finetune, leaving more room for prompt-level steering. Only meaningful when `finetune_id` is also provided. */
    finetune_strength?: number;
    /** If true, proper names in the prompt will be phonetically spelled in the lyrics for better pronunciation by the music model. The original names will be restored in word timestamps. */
    use_phonetic_names?: boolean;
    /** Controls how strictly section durations in the `composition_plan` are enforced. Only used with `composition_plan`. When set to true, the model will precisely respect each section's `duration_ms` from the plan. When set to false, the model may adjust individual section durations which will generally lead to better generation quality and improved latency, while always preserving the total song duration from the plan. */
    respect_sections_durations?: boolean;
    /** Whether to store the generated song for inpainting. Only available to enterprise clients with access to the inpainting feature. */
    store_for_inpainting?: boolean;
    /** Whether to return the timestamps of the words in the generated song. */
    with_timestamps?: boolean;
    /** Whether to sign the generated song with C2PA. Applicable only for mp3 files. */
    sign_with_c2pa?: boolean;
    model_style_prefix?: "music" | "sfx";
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Stream Composed Music
   */
  streamCompose: (input: {
    /** A simple text prompt to generate a song from. Cannot be used in conjunction with `composition_plan`. */
    prompt?: string | null;
    /** Optional generation mode hint for prompt-based music generation. Can only be used with `prompt`. */
    generation_mode?: MusicGenerationMode | null;
    /** A music prompt. Deprecated. Use `composition_plan` instead. */
    music_prompt?: MusicPrompt | null;
    /** The lyrics text to use for the generation. */
    lyrics_text?: string | null;
    /** A detailed composition plan to guide music generation. Cannot be used in conjunction with `prompt`. */
    composition_plan?: MusicPrompt | null;
    /** The length of the song to generate in milliseconds. Used only in conjunction with `prompt`. Must be between 3000ms and 600000ms. Optional - if not provided, the model will choose a length based on the prompt. */
    music_length_ms?: number | null;
    /** The model to use for the generation. */
    model_id?: "music_v1";
    /** Random seed to initialize the music generation process. Providing the same seed with the same parameters can help achieve more consistent results, but exact reproducibility is not guaranteed and outputs may change across system updates. Cannot be used in conjunction with prompt. */
    seed?: number | null;
    /** If true, guarantees that the generated song will be instrumental. If false, the song may or may not be instrumental depending on the `prompt`. Can only be used with `prompt`. */
    force_instrumental?: boolean;
    /** The ID of the finetune to use for the generation */
    finetune_id?: string | null;
    /** How strongly the finetune influences the generation. Defaults to 1.0 (full strength). Lower values soften the influence of the finetune, leaving more room for prompt-level steering. Only meaningful when `finetune_id` is also provided. */
    finetune_strength?: number;
    /** If true, proper names in the prompt will be phonetically spelled in the lyrics for better pronunciation by the music model. The original names will be restored in word timestamps. */
    use_phonetic_names?: boolean;
    /** Whether to store the generated song for inpainting. Only available to enterprise clients with access to the inpainting feature. */
    store_for_inpainting?: boolean;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Upload Music
   */
  uploadSong: (input: {
    /** The audio file to upload. */
    file: string;
    /** Whether to generate and return the composition plan for the uploaded song. If True, the response will include the composition_plan but will increase the latency. */
    extract_composition_plan?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<MusicUploadResponse>;

  /**
   * Stem Separation
   */
  separateSongStems: (input: {
    /** The audio file to separate into stems. */
    file: string;
    /** The id of the stem variation to use. */
    stem_variation_id?: "two_stems_v1" | "six_stems_v1";
    /** Whether to sign the generated song with C2PA. Applicable only for mp3 files. */
    sign_with_c2pa?: boolean;
    /** Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs. */
    output_format?: AllowedOutputFormats;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<string>;

  /**
   * Create Order
   */
  publicCreateOrder: (input: {
    body?: CreateOrderRequest | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<CreateOrderResponse>;

  /**
   * List Orders
   */
  publicListOrders: (input: {
    /** Maximum number of orders to return per page. */
    page_size?: number;
    /** Number of orders to skip for pagination. */
    offset?: number;
    /** Filter orders by one or more statuses. */
    status?: (OrderRequestState)[] | null;
    /** Filter orders created on or after this date. */
    start_date?: string | null;
    /** Filter orders created on or before this date. */
    end_date?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<ListOrdersResponse>;

  /**
   * Get Order
   */
  publicGetOrder: (input: {
    /** The ID of the order. */
    order_id: OrderId;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<OrderResponse>;

  /**
   * Update Order
   */
  publicUpdateOrder: (input: {
    request: UpdateOrderRequest;
    /** The ID of the order. */
    order_id: OrderId;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<UpdateOrderResponse>;

  /**
   * Register Media
   */
  publicRegisterMedia: (input: {
    /** The language code of the media content (e.g. 'en', 'es-ES'). Must be a supported source language for some order item kind. */
    declared_language: string;
    /** The media file to upload. Mutually exclusive with media_url. */
    media?: string | null;
    /** A URL to fetch the media file from. Mutually exclusive with media. */
    media_url?: string | null;
    /** The filename for URL-sourced media (e.g. 'example.mp4'). Required when using media_url. */
    media_url_filename?: string | null;
    /** The MIME type for URL-sourced media (e.g. 'video/mp4'). Required when using media_url. */
    media_url_content_type?: string | null;
    /** The ID of the order to which this media will be attached. */
    order_id: OrderId;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<RegisterMediaResponse>;

  /**
   * Get Media Info
   */
  publicGetMediaInfo: (input: {
    /** The ID of the order. */
    order_id: OrderId;
    /** The ID of the media file. */
    media_id: MediaId;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<OrderMediaResponse>;

  /**
   * Upsert Order Item
   */
  publicUpsertOrderItem: (input: {
    request: UpsertOrderItemRequest;
    /** The ID of the order. */
    order_id: OrderId;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<UpsertOrderItemResponse>;

  /**
   * Remove Order Item
   */
  publicRemoveOrderItem: (input: {
    /** The ID of the order. */
    order_id: OrderId;
    /** The ID of the order item. */
    item_id: ItemId;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<RemoveOrderItemResponse>;

  /**
   * Submit Order
   */
  publicSubmitOrder: (input: {
    /** The ID of the order. */
    order_id: OrderId;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SubmitOrderResponse>;

  /**
   * Get Order Deliverables
   */
  publicGetOrderDeliverables: (input: {
    /** The ID of the order. */
    order_id: OrderId;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<OrderDeliverablesResponse>;

  /**
   * Get Available Languages
   */
  publicGetAvailableLanguages: (input: {
    /** The kind of order item. */
    order_item_kind: OrderItemKind;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<LanguagesResponse>;

  /**
   * Create Pvc Voice
   */
  createPvcVoice: (input: {
    /** The name that identifies this voice. This will be displayed in the dropdown of the website. */
    name: string;
    /** Language used in the samples. */
    language: string;
    /** Description to use for the created voice. */
    description?: string | null;
    /** Labels for the voice. Keys can be language, accent, gender, or age. */
    labels?: { [key: string]: string | undefined } | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddVoiceResponseModel>;

  /**
   * Edit Pvc Voice
   */
  editPvcVoice: (input: {
    /** The name that identifies this voice. This will be displayed in the dropdown of the website. */
    name?: string;
    /** Language used in the samples. */
    language?: string;
    /** Description to use for the created voice. */
    description?: string | null;
    /** Labels for the voice. Keys can be language, accent, gender, or age. */
    labels?: { [key: string]: string | undefined } | null;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddVoiceResponseModel>;

  /**
   * Add Samples To Pvc Voice
   */
  addPvcVoiceSamples: (input: {
    /** Audio files used to create the voice. */
    files: (string)[];
    /** If set will remove background noise for voice samples using our audio isolation model. If the samples do not include background noise, it can make the quality worse. */
    remove_background_noise?: boolean;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<(SampleResponseModel)[]>;

  /**
   * Update Pvc Voice Sample
   */
  editPvcVoiceSample: (input: {
    /** If set will remove background noise for voice samples using our audio isolation model. If the samples do not include background noise, it can make the quality worse. */
    remove_background_noise?: boolean;
    /** Speaker IDs to be used for PVC training. Make sure you send all the speaker IDs you want to use for PVC training in one request because the last request will override the previous ones. */
    selected_speaker_ids?: (string)[] | null;
    /** The start time of the audio to be used for PVC training. Time should be in milliseconds */
    trim_start_time?: number | null;
    /** The end time of the audio to be used for PVC training. Time should be in milliseconds */
    trim_end_time?: number | null;
    /** The name of the audio file to be used for PVC training. */
    file_name?: string | null;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** Sample ID to be used */
    sample_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<AddVoiceResponseModel>;

  /**
   * Delete Pvc Voice Sample
   */
  deletePvcVoiceSample: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** Sample ID to be used */
    sample_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<DeleteVoiceSampleResponseModel>;

  /**
   * Retrieve Voice Sample Audio
   */
  getPvcSampleAudio: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** Sample ID to be used */
    sample_id: string;
    /** If set will remove background noise for voice samples using our audio isolation model. If the samples do not include background noise, it can make the quality worse. */
    remove_background_noise?: boolean;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<VoiceSamplePreviewResponseModel>;

  /**
   * Retrieve Voice Sample Visual Waveform
   */
  getPvcSampleVisualWaveform: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** Sample ID to be used */
    sample_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<VoiceSampleVisualWaveformResponseModel>;

  /**
   * Retrieve Speaker Separation Status
   */
  getPvcSampleSpeakers: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** Sample ID to be used */
    sample_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SpeakerSeparationResponseModel>;

  /**
   * Start Speaker Separation
   */
  startSpeakerSeparation: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** Sample ID to be used */
    sample_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<StartSpeakerSeparationResponseModel>;

  /**
   * Retrieve Separated Speaker Audio
   */
  getSpeakerAudio: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
    /** Sample ID to be used */
    sample_id: string;
    /** Speaker ID to be used, you can use GET https://api.elevenlabs.io/v1/voices/{voice_id}/samples/{sample_id}/speakers to list all the available speakers for a sample. */
    speaker_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<SpeakerAudioResponseModel>;

  /**
   * Get Pvc Voice Captcha
   */
  getPvcVoiceCaptcha: (input: {
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<HttpValidationError>;

  /**
   * Verify Pvc Voice Captcha
   */
  verifyPvcVoiceCaptcha: (input: {
    /** Audio recording of the user */
    recording: string;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<VerifyPvcVoiceCaptchaResponseModel>;

  /**
   * Run Pvc Training
   */
  runPvcVoiceTraining: (input: {
    /** The model ID to use for the conversion. */
    model_id?: string | null;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<StartPvcVoiceTrainingResponseModel>;

  /**
   * Request Manual Verification
   */
  requestPvcManualVerification: (input: {
    /** Verification documents */
    files: (string)[];
    /** Extra text to be used in the manual verification process. */
    extra_text?: string | null;
    /** Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices. */
    voice_id: string;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<RequestPvcManualVerificationResponseModel>;

  /**
   * Get Workspace Usage
   */
  usageByProductOverTime: (input: {
    /** Start of the time range as a Unix timestamp in milliseconds. Must be at least 2020-01-01. */
    start_time: number;
    /** End of the time range as a Unix timestamp in milliseconds. Must be at least 2020-01-01. */
    end_time: number;
    /** Bucket size in seconds. Each row in the response covers this many seconds of usage. For example, pass 3600 for hourly buckets or 86400 for daily buckets. */
    interval_seconds?: number;
    group_by?: ("product_type" | "model" | "voice_id" | "user_id" | "fiat_currency" | "fiat_charge_type" | "region" | "reporting_workspace_id" | "request_source" | "resource_id" | "subresource_id" | "request_queue_type" | "voice_multiplier" | "hashed_xi_api_key" | "billing_group_id")[] | null;
    filters?: (ColumnFilter)[] | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WorkspaceAnalyticsQueryResponseModel>;

  /**
   * List Api Requests
   */
  requestsList: (input: {
    /** Start of the time range as a Unix timestamp in milliseconds. */
    start_time?: number | null;
    /** End of the time range as a Unix timestamp in milliseconds. */
    end_time?: number | null;
    limit?: number;
    /** Optional timestamp sort direction. If omitted, defaults to desc when end_time is provided, otherwise asc. */
    sort?: "asc" | "desc" | null;
    filters?: (ColumnFilter)[] | null;
    search?: string | null;
  }, options?: { headers?: { "xi-api-key"?: string | null } }) => Promise<WorkspaceAnalyticsQueryResponseModel>;

  /**
   * Redirect To Mintlify
   */
  redirectToMintlify: () => Promise<unknown>;
};

export * from "./schemas.js";
