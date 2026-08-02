export type AsrConversationalConfig = {
  /** The quality of the transcription */
  quality?: AsrQuality;
  /** The provider of the transcription service */
  provider?: AsrProvider;
  /** The format of the audio to be transcribed */
  user_input_audio_format?: AsrInputFormat;
  /** Keywords to boost prediction probability for */
  keywords?: (string)[];
};

export type AsrConversationalConfigOverride = {
  /** Keywords to boost prediction probability for */
  keywords?: (string)[] | null;
};

export type AsrConversationalConfigOverrideConfig = {
  /** Whether to allow overriding the keywords field. */
  keywords?: boolean;
};

export type AsrConversationalConfigWorkflowOverride = {
  /** The quality of the transcription */
  quality?: AsrQuality | null;
  /** The provider of the transcription service */
  provider?: AsrProvider | null;
  /** The format of the audio to be transcribed */
  user_input_audio_format?: AsrInputFormat | null;
  /** Keywords to boost prediction probability for */
  keywords?: (string)[] | null;
};

export type AsrInputFormat = "pcm_8000" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_44100" | "pcm_48000" | "ulaw_8000";

export type AsrProvider = "elevenlabs" | "scribe_realtime";

export type AsrQuality = "high";

export type AstAdditionOperatorNodeInput = {
  type?: string;
  /** Left operand of the binary operator. */
  left: AstNodeInput;
  /** Right operand of the binary operator. */
  right: AstNodeInput;
};

export type AstAdditionOperatorNodeOutput = {
  type: string;
  /** Left operand of the binary operator. */
  left: AstNodeOutput;
  /** Right operand of the binary operator. */
  right: AstNodeOutput;
};

export type AstAndOperatorNodeInput = {
  type?: string;
  /** Child nodes of the logical operator. */
  children: (AstNodeInput)[];
};

export type AstAndOperatorNodeOutput = {
  type: string;
  /** Child nodes of the logical operator. */
  children: (AstNodeOutput)[];
};

export type AstBooleanNodeInput = {
  type?: string;
  /** Value of this literal. */
  value: boolean;
};

export type AstBooleanNodeOutput = {
  type: string;
  /** Value of this literal. */
  value: boolean;
};

export type AstConditionalOperatorNodeInput = {
  type?: string;
  /** Condition deciding which expression should be selected. */
  condition: AstNodeInput;
  /** Expression selected if the condition is true. */
  trueExpression: AstNodeInput;
  /** Expression selected if the condition is false. */
  falseExpression: AstNodeInput;
};

export type AstConditionalOperatorNodeOutput = {
  type: string;
  /** Condition deciding which expression should be selected. */
  condition: AstNodeOutput;
  /** Expression selected if the condition is true. */
  trueExpression: AstNodeOutput;
  /** Expression selected if the condition is false. */
  falseExpression: AstNodeOutput;
};

export type AstDivisionOperatorNodeInput = {
  type?: string;
  /** Left operand of the binary operator. */
  left: AstNodeInput;
  /** Right operand of the binary operator. */
  right: AstNodeInput;
};

export type AstDivisionOperatorNodeOutput = {
  type: string;
  /** Left operand of the binary operator. */
  left: AstNodeOutput;
  /** Right operand of the binary operator. */
  right: AstNodeOutput;
};

export type AstDynamicVariableNodeInput = {
  type?: string;
  /** The name of the dynamic variable. */
  name: string;
};

export type AstDynamicVariableNodeOutput = {
  type: string;
  /** The name of the dynamic variable. */
  name: string;
};

export type AstEqualsOperatorNodeInput = {
  type?: string;
  /** Left operand of the binary operator. */
  left: AstNodeInput;
  /** Right operand of the binary operator. */
  right: AstNodeInput;
};

export type AstEqualsOperatorNodeOutput = {
  type: string;
  /** Left operand of the binary operator. */
  left: AstNodeOutput;
  /** Right operand of the binary operator. */
  right: AstNodeOutput;
};

export type AstGreaterThanOperatorNodeInput = {
  type?: string;
  /** Left operand of the binary operator. */
  left: AstNodeInput;
  /** Right operand of the binary operator. */
  right: AstNodeInput;
};

export type AstGreaterThanOperatorNodeOutput = {
  type: string;
  /** Left operand of the binary operator. */
  left: AstNodeOutput;
  /** Right operand of the binary operator. */
  right: AstNodeOutput;
};

export type AstGreaterThanOrEqualsOperatorNodeInput = {
  type?: string;
  /** Left operand of the binary operator. */
  left: AstNodeInput;
  /** Right operand of the binary operator. */
  right: AstNodeInput;
};

export type AstGreaterThanOrEqualsOperatorNodeOutput = {
  type: string;
  /** Left operand of the binary operator. */
  left: AstNodeOutput;
  /** Right operand of the binary operator. */
  right: AstNodeOutput;
};

export type AstllmNodeInput = { type?: string; value_schema: LlmLiteralJsonSchemaProperty } | { type?: string; prompt: string };

export type AstllmNodeOutput = {
  type: string;
  /** JSON schema describing the value that the LLM should extract. */
  value_schema: LlmLiteralJsonSchemaProperty;
  /** The prompt to evaluate to a boolean value. Deprecated. Use a boolean schema instead. */
  prompt: string;
};

export type AstLessThanOperatorNodeInput = {
  type?: string;
  /** Left operand of the binary operator. */
  left: AstNodeInput;
  /** Right operand of the binary operator. */
  right: AstNodeInput;
};

export type AstLessThanOperatorNodeOutput = {
  type: string;
  /** Left operand of the binary operator. */
  left: AstNodeOutput;
  /** Right operand of the binary operator. */
  right: AstNodeOutput;
};

export type AstLessThanOrEqualsOperatorNodeInput = {
  type?: string;
  /** Left operand of the binary operator. */
  left: AstNodeInput;
  /** Right operand of the binary operator. */
  right: AstNodeInput;
};

export type AstLessThanOrEqualsOperatorNodeOutput = {
  type: string;
  /** Left operand of the binary operator. */
  left: AstNodeOutput;
  /** Right operand of the binary operator. */
  right: AstNodeOutput;
};

export type AstMultiplicationOperatorNodeInput = {
  type?: string;
  /** Left operand of the binary operator. */
  left: AstNodeInput;
  /** Right operand of the binary operator. */
  right: AstNodeInput;
};

export type AstMultiplicationOperatorNodeOutput = {
  type: string;
  /** Left operand of the binary operator. */
  left: AstNodeOutput;
  /** Right operand of the binary operator. */
  right: AstNodeOutput;
};

export type AstNodeInput = AstStringNodeInput | AstNumberNodeInput | AstBooleanNodeInput | AstNullNodeInput | AstllmNodeInput | AstDynamicVariableNodeInput | AstOrOperatorNodeInput | AstAndOperatorNodeInput | AstEqualsOperatorNodeInput | AstNotEqualsOperatorNodeInput | AstGreaterThanOperatorNodeInput | AstLessThanOperatorNodeInput | AstGreaterThanOrEqualsOperatorNodeInput | AstLessThanOrEqualsOperatorNodeInput | AstAdditionOperatorNodeInput | AstSubtractionOperatorNodeInput | AstMultiplicationOperatorNodeInput | AstDivisionOperatorNodeInput | AstConditionalOperatorNodeInput;

export type AstNodeOutput = AstStringNodeOutput | AstNumberNodeOutput | AstBooleanNodeOutput | AstNullNodeOutput | AstllmNodeOutput | AstDynamicVariableNodeOutput | AstOrOperatorNodeOutput | AstAndOperatorNodeOutput | AstEqualsOperatorNodeOutput | AstNotEqualsOperatorNodeOutput | AstGreaterThanOperatorNodeOutput | AstLessThanOperatorNodeOutput | AstGreaterThanOrEqualsOperatorNodeOutput | AstLessThanOrEqualsOperatorNodeOutput | AstAdditionOperatorNodeOutput | AstSubtractionOperatorNodeOutput | AstMultiplicationOperatorNodeOutput | AstDivisionOperatorNodeOutput | AstConditionalOperatorNodeOutput;

export type AstNotEqualsOperatorNodeInput = {
  type?: string;
  /** Left operand of the binary operator. */
  left: AstNodeInput;
  /** Right operand of the binary operator. */
  right: AstNodeInput;
};

export type AstNotEqualsOperatorNodeOutput = {
  type: string;
  /** Left operand of the binary operator. */
  left: AstNodeOutput;
  /** Right operand of the binary operator. */
  right: AstNodeOutput;
};

export type AstNullNodeInput = {
  type?: string;
};

export type AstNullNodeOutput = {
  type: string;
};

export type AstNumberNodeInput = {
  type?: string;
  /** Value of this literal. */
  value: number;
};

export type AstNumberNodeOutput = {
  type: string;
  /** Value of this literal. */
  value: number;
};

export type AstOrOperatorNodeInput = {
  type?: string;
  /** Child nodes of the logical operator. */
  children: (AstNodeInput)[];
};

export type AstOrOperatorNodeOutput = {
  type: string;
  /** Child nodes of the logical operator. */
  children: (AstNodeOutput)[];
};

export type AstStringNodeInput = {
  type?: string;
  /** Value of this literal. */
  value: string;
};

export type AstStringNodeOutput = {
  type: string;
  /** Value of this literal. */
  value: string;
};

export type AstSubtractionOperatorNodeInput = {
  type?: string;
  /** Left operand of the binary operator. */
  left: AstNodeInput;
  /** Right operand of the binary operator. */
  right: AstNodeInput;
};

export type AstSubtractionOperatorNodeOutput = {
  type: string;
  /** Left operand of the binary operator. */
  left: AstNodeOutput;
  /** Right operand of the binary operator. */
  right: AstNodeOutput;
};

/** OCSF Activity IDs for Account Change [3001] events.  Spec: https://schema.ocsf.io/1.6.0/classes/account_change */
export type AccountChangeActivityId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 99;

/** OCSF Actor object - describes the entity that performed the action.  Spec: https://schema.ocsf.io/1.6.0/objects/actor */
export type ActorModel = {
  /** User who performed the action */
  user: UserModel;
  /** Client application or service name */
  app_name?: string | null;
  /** Client application unique identifier */
  app_uid?: string | null;
  /** Session information */
  session?: { [key: string]: unknown } | null;
};

export type AddChapterResponseModel = {
  chapter: ChapterWithContentResponseModel;
};

export type AddKnowledgeBaseResponseModel = {
  id: string;
  name: string;
  /** The folder path segments leading to this entity, from root to parent folder. */
  folder_path?: (KnowledgeBaseFolderPathSegmentSummaryResponseModel)[];
};

export type AddProjectResponseModel = {
  project: ProjectResponseModel;
};

export type AddPronunciationDictionaryResponseModel = {
  /** The ID of the created pronunciation dictionary. */
  id: string;
  /** The name of the created pronunciation dictionary. */
  name: string;
  /** The user ID of the creator of the pronunciation dictionary. */
  created_by: string;
  /** The creation time of the pronunciation dictionary in Unix timestamp. */
  creation_time_unix: number;
  /** The ID of the created pronunciation dictionary version. */
  version_id: string;
  /** The number of rules in the version of the pronunciation dictionary. */
  version_rules_num: number;
  /** The description of the pronunciation dictionary. */
  description?: string | null;
  /** The permission on the resource of the pronunciation dictionary. */
  permission_on_resource: "admin" | "editor" | "commenter" | "viewer" | null;
};

export type AddVoiceIvcResponseModel = {
  /** The ID of the newly created voice. */
  voice_id: string;
  /** Whether the voice requires verification */
  requires_verification: boolean;
};

export type AddVoiceResponseModel = {
  /** The ID of the voice. */
  voice_id: string;
};

export type AddWorkspaceGroupMemberResponseModel = {
  /** The status of the workspace group member addition request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type AddWorkspaceInviteResponseModel = {
  /** The status of the workspace invite request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type AdditionalFormatResponseModel = {
  /** The requested format. */
  requested_format: string;
  /** The file extension of the additional format. */
  file_extension: string;
  /** The content type of the additional format. */
  content_type: string;
  /** Whether the content is base64 encoded. */
  is_base64_encoded: boolean;
  /** The content of the additional format. */
  content: string;
};

export type AdditionalFormats = (ExportOptions)[];

export type AdhocAgentConfigOverrideForTestRequestModel = {
  conversation_config: ConversationalConfigApiModelInput;
  platform_settings: AgentPlatformSettingsRequestModel;
  workflow?: AgentWorkflowRequestModel | null;
};

export type AgentAlertingMonitorConfig = {
  /** Failure rate threshold at which this monitor can notify. */
  threshold?: number;
  /** How many minutes an alert can stay inactive before it is auto-resolved. */
  auto_resolve_after_inactive_minutes?: number | null;
};

export type AgentAlertingSettings = {
  /** Alerting configuration keyed by monitor. */
  monitor_configs?: { [key: string]: AgentAlertingMonitorConfig | undefined };
  /** How many minutes an alert can stay inactive before it is auto-resolved. */
  auto_resolve_after_inactive_minutes?: number;
  /** Delivery channels for alert lifecycle notifications. Currently supports webhook notifiers. */
  notifiers?: (AgentAlertingWebhookNotifier)[];
};

export type AgentAlertingWebhookNotifier = {
  type?: string;
  /** The URL to send alert lifecycle notifications to. */
  url: string;
  /** Optional static request headers sent with each alert webhook call, for example to authenticate with the receiving endpoint. */
  request_headers?: { [key: string]: string | undefined } | null;
};

export type AgentBranchBasicInfo = {
  id: string;
  name: string;
};

export type AgentBranchResponse = {
  id: string;
  name: string;
  agent_id: string;
  description: string;
  created_at: number;
  last_committed_at: number;
  is_archived: boolean;
  protection_status?: BranchProtectionStatus;
  /** Access information for the branch */
  access_info?: ResourceAccessInfo | null;
  /** Percentage of traffic live on the branch */
  current_live_percentage?: number;
  /** Parent branch of the branch */
  parent_branch?: AgentBranchBasicInfo | null;
  /** Most recent versions on the branch */
  most_recent_versions?: (AgentVersionMetadata)[];
};

export type AgentBranchSummary = {
  id: string;
  name: string;
  agent_id: string;
  description: string;
  created_at: number;
  last_committed_at: number;
  is_archived: boolean;
  protection_status?: BranchProtectionStatus;
  /** Access information for the branch */
  access_info?: ResourceAccessInfo | null;
  /** Percentage of traffic live on the branch */
  current_live_percentage?: number;
  /** ID of the parent branch */
  parent_branch_id?: string | null;
  /** Whether a draft exists for the branch */
  draft_exists?: boolean;
};

export type AgentCallLimits = {
  /** The maximum number of concurrent conversations. -1 indicates that there is no maximum */
  agent_concurrency_limit?: number;
  /** The maximum number of conversations per day */
  daily_limit?: number;
  /** Whether to enable bursting. If true, exceeding workspace concurrency limit will be allowed up to 3 times the limit. Calls will be charged at double rate when exceeding the limit. */
  bursting_enabled?: boolean;
};

export type AgentConfigApiModelInput = {
  /** If non-empty, the first message the agent will say. If empty, the agent waits for the user to start the discussion. */
  first_message?: string;
  /** Language of the agent - used for ASR and TTS */
  language?: string;
  /** When enabled and language is Hindi, the agent will respond in Hinglish */
  hinglish_mode?: boolean;
  /** Configuration for dynamic variables */
  dynamic_variables?: DynamicVariablesConfigInput;
  /** If true, the user will not be able to interrupt the agent while the first message is being delivered. */
  disable_first_message_interruptions?: boolean;
  /** If non-empty, the message the agent will send when max conversation duration is reached. */
  max_conversation_duration_message?: string;
  /** Per-channel response behavior overrides for text conversations. Built-in channel defaults apply when unset. */
  text_behavior_overrides?: { [key: string]: BehaviorOverride | undefined } | null;
  /** The prompt for the agent */
  prompt?: PromptAgentApiModelInput;
};

export type AgentConfigApiModelOutput = {
  /** If non-empty, the first message the agent will say. If empty, the agent waits for the user to start the discussion. */
  first_message?: string;
  /** Language of the agent - used for ASR and TTS */
  language?: string;
  /** When enabled and language is Hindi, the agent will respond in Hinglish */
  hinglish_mode?: boolean;
  /** Configuration for dynamic variables */
  dynamic_variables?: DynamicVariablesConfigOutput;
  /** If true, the user will not be able to interrupt the agent while the first message is being delivered. */
  disable_first_message_interruptions?: boolean;
  /** If non-empty, the message the agent will send when max conversation duration is reached. */
  max_conversation_duration_message?: string;
  /** Per-channel response behavior overrides for text conversations. Built-in channel defaults apply when unset. */
  text_behavior_overrides?: { [key: string]: BehaviorOverride | undefined } | null;
  /** The prompt for the agent */
  prompt?: PromptAgentApiModelOutput;
};

export type AgentConfigApiModelWorkflowOverrideInput = {
  /** If non-empty, the first message the agent will say. If empty, the agent waits for the user to start the discussion. */
  first_message?: string | null;
  /** Language of the agent - used for ASR and TTS */
  language?: string | null;
  /** When enabled and language is Hindi, the agent will respond in Hinglish */
  hinglish_mode?: boolean | null;
  /** Configuration for dynamic variables */
  dynamic_variables?: DynamicVariablesConfigWorkflowOverrideInput | null;
  /** If true, the user will not be able to interrupt the agent while the first message is being delivered. */
  disable_first_message_interruptions?: boolean | null;
  /** If non-empty, the message the agent will send when max conversation duration is reached. */
  max_conversation_duration_message?: string | null;
  /** Per-channel response behavior overrides for text conversations. Built-in channel defaults apply when unset. */
  text_behavior_overrides?: { [key: string]: BehaviorOverride | undefined } | null;
  /** The prompt for the agent */
  prompt?: PromptAgentApiModelWorkflowOverrideInput | null;
};

export type AgentConfigApiModelWorkflowOverrideOutput = {
  /** If non-empty, the first message the agent will say. If empty, the agent waits for the user to start the discussion. */
  first_message?: string | null;
  /** Language of the agent - used for ASR and TTS */
  language?: string | null;
  /** When enabled and language is Hindi, the agent will respond in Hinglish */
  hinglish_mode?: boolean | null;
  /** Configuration for dynamic variables */
  dynamic_variables?: DynamicVariablesConfigWorkflowOverrideOutput | null;
  /** If true, the user will not be able to interrupt the agent while the first message is being delivered. */
  disable_first_message_interruptions?: boolean | null;
  /** If non-empty, the message the agent will send when max conversation duration is reached. */
  max_conversation_duration_message?: string | null;
  /** Per-channel response behavior overrides for text conversations. Built-in channel defaults apply when unset. */
  text_behavior_overrides?: { [key: string]: BehaviorOverride | undefined } | null;
  /** The prompt for the agent */
  prompt?: PromptAgentApiModelWorkflowOverrideOutput | null;
};

export type AgentConfigOverrideInput = {
  /** If non-empty, the first message the agent will say. If empty, the agent waits for the user to start the discussion. */
  first_message?: string | null;
  /** Language of the agent - used for ASR and TTS */
  language?: string | null;
  /** If non-empty, the message the agent will send when max conversation duration is reached. */
  max_conversation_duration_message?: string | null;
  /** The prompt for the agent */
  prompt?: PromptAgentApiModelOverrideInput | null;
};

export type AgentConfigOverrideOutput = {
  /** If non-empty, the first message the agent will say. If empty, the agent waits for the user to start the discussion. */
  first_message?: string | null;
  /** Language of the agent - used for ASR and TTS */
  language?: string | null;
  /** If non-empty, the message the agent will send when max conversation duration is reached. */
  max_conversation_duration_message?: string | null;
  /** The prompt for the agent */
  prompt?: PromptAgentApiModelOverrideOutput | null;
};

export type AgentConfigOverrideConfig = {
  /** Whether to allow overriding the first_message field. */
  first_message?: boolean;
  /** Whether to allow overriding the language field. */
  language?: boolean;
  /** Whether to allow overriding the max_conversation_duration_message field. */
  max_conversation_duration_message?: boolean;
  /** Configures overrides for nested fields. */
  prompt?: PromptAgentApiModelOverrideConfig;
};

export type AgentDefinitionSource = "cli" | "ui" | "api" | "template" | "unknown";

export type AgentDeploymentPercentageStrategy = {
  type?: string;
  /** Traffic percentage to deploy */
  traffic_percentage: number;
};

export type AgentDeploymentRequest = {
  /** List of deployment requests */
  requests: (AgentDeploymentRequestItem)[];
};

export type AgentDeploymentRequestItem = {
  /** ID of the branch to deploy */
  branch_id: string;
  deployment_strategy: AgentDeploymentPercentageStrategy;
};

export type AgentDeploymentResponse = {
  /** Map of branch IDs to traffic percentages */
  traffic_percentage_branch_id_map?: { [key: string]: number | undefined };
};

export type AgentFailureResponseExample = {
  response: string;
  type: string;
};

export type AgentMetadata = {
  agent_id: string;
  branch_id?: string | null;
  workflow_node_id?: string | null;
  version_id?: string | null;
};

export type AgentMetadataDbModel = {
  created_at_unix_secs: number;
  updated_at_unix_secs: number;
  created_from?: AgentDefinitionSource;
  last_updated_from?: AgentDefinitionSource;
};

export type AgentMetadataResponseModel = {
  /** The creation time of the agent in unix seconds */
  created_at_unix_secs: number;
  /** The last update time of the agent in unix seconds */
  updated_at_unix_secs: number;
};

export type AgentPlatformSettingsRequestModel = {
  /** Settings for evaluation */
  evaluation?: EvaluationSettingsInput;
  /** Configuration for the widget */
  widget?: WidgetConfigInput;
  /** Data collection settings */
  data_collection?: { [key: string]: AnalysisProperty | undefined };
  /** Scope per data collection item ID. Missing keys default to conversation scope. */
  data_collection_scopes?: { [key: string]: AnalysisScope | undefined };
  /** Additional overrides for the agent during conversation initiation */
  overrides?: ConversationInitiationClientDataConfigInput;
  /** Workspace overrides for the agent */
  workspace_overrides?: AgentWorkspaceOverridesInput;
  /** Testing configuration for the agent */
  testing?: AgentTestingSettings;
  /** Whether the agent is archived */
  archived?: boolean;
  /** Guardrails configuration for the agent */
  guardrails?: GuardrailsV1Input;
  /** Language for all conversation analysis outputs (summaries, titles, evaluation rationales, data collection rationales). If not set, the language will be inferred from the conversation. Must be one of the supported conversation languages. */
  summary_language?: string | null;
  /** Settings for authentication */
  auth?: AuthSettings;
  /** Call limits for the agent */
  call_limits?: AgentCallLimits;
  /** Privacy settings for the agent */
  privacy?: PrivacyConfigInput;
  /** The trust context in which the agent operates. */
  trust_context?: AgentTrustContext;
  /** Default LLM model for post-call analysis (evaluation and data collection) */
  analysis_llm?: Llm;
};

export type AgentPlatformSettingsResponseModel = {
  /** Settings for evaluation */
  evaluation?: EvaluationSettingsOutput;
  /** Configuration for the widget */
  widget?: WidgetConfigOutput;
  /** Data collection settings */
  data_collection?: { [key: string]: AnalysisProperty | undefined };
  /** Scope per data collection item ID. Missing keys default to conversation scope. */
  data_collection_scopes?: { [key: string]: AnalysisScope | undefined };
  /** Additional overrides for the agent during conversation initiation */
  overrides?: ConversationInitiationClientDataConfigOutput;
  /** Workspace overrides for the agent */
  workspace_overrides?: AgentWorkspaceOverridesOutput;
  /** Testing configuration for the agent */
  testing?: AgentTestingSettings;
  /** Whether the agent is archived */
  archived?: boolean;
  /** Guardrails configuration for the agent */
  guardrails?: GuardrailsV1Output;
  /** Language for all conversation analysis outputs (summaries, titles, evaluation rationales, data collection rationales). If not set, the language will be inferred from the conversation. Must be one of the supported conversation languages. */
  summary_language?: string | null;
  /** Settings for authentication */
  auth?: AuthSettings;
  /** Call limits for the agent */
  call_limits?: AgentCallLimits;
  /** Privacy settings for the agent */
  privacy?: PrivacyConfigOutput;
  /** The trust context in which the agent operates. */
  trust_context?: AgentTrustContext;
  /** Default LLM model for post-call analysis (evaluation and data collection) */
  analysis_llm?: Llm;
  safety?: SafetyResponseModel;
};

export type AgentSimulatedChatTestResponseModel = {
  simulated_conversation: (ConversationHistoryTranscriptResponseModel)[];
  analysis: ConversationHistoryAnalysisCommonModel;
};

export type AgentSortBy = "name" | "created_at" | "call_count_7d";

export type AgentSuccessfulResponseExample = {
  response: string;
  type: string;
};

export type AgentSummaryBatchSuccessfulResponseModel = {
  status: string;
  data: AgentSummaryResponseModel;
};

export type AgentSummaryResponseModel = {
  /** The ID of the agent */
  agent_id: string;
  /** The name of the agent */
  name: string;
  /** Agent tags used to categorize the agent */
  tags: (string)[];
  /** The creation time of the agent in unix seconds */
  created_at_unix_secs: number;
  /** The access information of the agent */
  access_info: ResourceAccessInfo;
  /** The time of the most recent call in unix seconds, null if no calls have been made */
  last_call_time_unix_secs?: number | null;
  /** Whether the agent is archived */
  archived?: boolean;
};

export type AgentTestEntityType = "test" | "folder";

export type AgentTestFolderPathSegmentResponseModel = {
  id: string;
  name?: string;
};

/** Settings for agent testing configuration. */
export type AgentTestingSettings = {
  /** List of test IDs that should be run for this agent */
  attached_tests?: (AttachedTestModel)[];
};

export type AgentTopicResponseModel = {
  topic_id: string;
  label: string;
  description: string;
  conversation_count: number;
  parent_topic_id?: string | null;
  x_2d?: number | null;
  y_2d?: number | null;
};

export type AgentTransfer = {
  agent_id?: string | null;
  node_id?: string | null;
  condition: string;
  delay_ms?: number;
  transfer_message?: string | null;
  enable_transferred_agent_first_message?: boolean;
  is_workflow_node_transfer?: boolean;
};

/** The trust context in which the agent operates.  UNKNOWN: not yet classified (existing agents created before this feature). LOW: serves untrusted external participants (e.g. customer support, sales) —      outputs should be vetted and tool access scoped. HIGH: serves the owner (e.g. personal assistant) — full tool access is appropriate. */
export type AgentTrustContext = "unknown" | "low" | "high";

export type AgentVersionMetadata = {
  id: string;
  agent_id: string;
  branch_id: string;
  version_description: string;
  seq_no_in_branch: number;
  time_committed_secs: number;
  parents: AgentVersionParents;
  access_info?: ResourceAccessInfo | null;
};

export type AgentVersionParents = {
  in_branch_parent_id?: string | null;
  out_of_branch_parent_id?: string | null;
  merged_into_branch_id?: string | null;
  merged_from_branch_id?: string | null;
  merged_from_version_id?: string | null;
};

export type AgentWorkflowRequestModel = {
  edges?: { [key: string]: WorkflowEdgeModelInput | undefined };
  nodes?: { [key: string]: WorkflowStartNodeModelInput | WorkflowEndNodeModelInput | WorkflowPhoneNumberNodeModelInput | WorkflowOverrideAgentNodeModelInput | WorkflowStandaloneAgentNodeModelInput | WorkflowToolNodeModelInput | undefined };
  /** Whether to prevent loops in the workflow execution. */
  prevent_subagent_loops?: boolean;
};

export type AgentWorkflowResponseModel = {
  edges: { [key: string]: WorkflowEdgeModelOutput | undefined };
  nodes: { [key: string]: WorkflowStartNodeModelOutput | WorkflowEndNodeModelOutput | WorkflowPhoneNumberNodeModelOutput | WorkflowOverrideAgentNodeModelOutput | WorkflowStandaloneAgentNodeModelOutput | WorkflowToolNodeModelOutput | undefined };
  /** Whether to prevent loops in the workflow execution. */
  prevent_subagent_loops: boolean;
};

export type AgentWorkspaceOverridesInput = {
  /** The webhook to send conversation initiation client data to */
  conversation_initiation_client_data_webhook?: ConversationInitiationClientDataWebhook | null;
  webhooks?: ConvAiWebhooks;
};

export type AgentWorkspaceOverridesOutput = {
  /** The webhook to send conversation initiation client data to */
  conversation_initiation_client_data_webhook?: ConversationInitiationClientDataWebhook | null;
  webhooks?: ConvAiWebhooks;
};

export type AllowedOutputFormats = "mp3_22050_32" | "mp3_24000_48" | "mp3_44100_32" | "mp3_44100_64" | "mp3_44100_96" | "mp3_44100_128" | "mp3_44100_192" | "pcm_8000" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_32000" | "pcm_44100" | "pcm_48000" | "ulaw_8000" | "alaw_8000" | "opus_48000_32" | "opus_48000_64" | "opus_48000_96" | "opus_48000_128" | "opus_48000_192";

export type AllowlistItem = {
  /** The hostname of the allowed origin */
  hostname: string;
};

/** Data collection property with optional per-item LLM override for post-call analysis.  TODO: migrate to composition (value_schema: LiteralJsonSchemaProperty + llm) instead of inheritance, so this generalizes cleanly to object/array schemas in the future. */
export type AnalysisProperty = {
  type: "boolean" | "string" | "integer" | "number";
  /** The description of the property. When set, the LLM will provide the value based on this description. Mutually exclusive with dynamic_variable, is_system_provided, and constant_value. */
  description?: string;
  /** List of allowed string values for string type parameters */
  enum?: (string)[] | null;
  /** If true, the value will be populated by the system at runtime. Used by API Integration Webhook tools for templating. Mutually exclusive with description, dynamic_variable, and constant_value. */
  is_system_provided?: boolean;
  /** The name of the dynamic variable to use for this property's value. Mutually exclusive with description, is_system_provided, and constant_value. */
  dynamic_variable?: string;
  /** A constant value to use for this property. Mutually exclusive with description, dynamic_variable, and is_system_provided. */
  constant_value?: string | number | number | boolean;
  /** LLM model to use for this analysis item. If not set, uses agent's analysis_llm default. */
  llm?: Llm | null;
};

export type AnalysisScope = "conversation" | "agent";

/** Response model for integration-managed OAuth2 Auth Code auth connections */
export type ApiIntegrationOAuth2AuthCodeResponse = {
  name: string;
  auth_type?: string;
  provider: string;
  token_url: string;
  scopes?: (string)[];
  /** Separator for scopes */
  scope_separator?: " " | ",";
  /** ISO 8601 timestamp of when the access token expires */
  expires_at: string;
  integration_id: string;
  credential_id: string;
  /** Current health status of the OAuth connection */
  status?: OAuthConnectionStatus;
  /** Human-readable detail about the current status, e.g. the error message on refresh failure */
  status_detail?: string | null;
  /** ISO 8601 timestamp of the last status change */
  status_updated_at?: string;
  id: string;
  used_by?: AuthConnectionDependencies | null;
};

/** Response model for user-owned OAuth2 Custom App auth connections */
export type ApiIntegrationOAuth2CustomAppResponse = {
  name: string;
  auth_type?: string;
  provider: string;
  token_url: string;
  scopes?: (string)[];
  /** Separator for scopes */
  scope_separator?: " " | ",";
  /** ISO 8601 timestamp of when the access token expires */
  expires_at: string;
  integration_id: string;
  credential_id: string;
  /** Current health status of the OAuth connection */
  status?: OAuthConnectionStatus;
  /** Human-readable detail about the current status, e.g. the error message on refresh failure */
  status_detail?: string | null;
  /** ISO 8601 timestamp of the last status change */
  status_updated_at?: string;
  /** OAuth client ID (rendered from template if credential uses templated credentials, None for legacy connections) */
  client_id: string;
  id: string;
  used_by?: AuthConnectionDependencies | null;
};

/** A whitelist of fields that can be overridden by users when configuring an API Integration Webhook Tool. */
export type ApiIntegrationWebhookOverrides = {
  schema_overrides?: { [key: string]: ConstantSchemaOverride | DynamicVariableSchemaOverride | LlmSchemaOverride | undefined } | null;
  request_headers?: { [key: string]: string | ConvAiDynamicVariable | undefined } | null;
  response_filter_mode?: ResponseFilterMode | null;
  response_filters?: (string)[] | null;
};

export type ApiIntegrationWebhookToolConfigInput = {
  type?: string;
  name: string;
  /** Description of when the tool should be used and what it does. */
  description: string;
  /** The maximum time in seconds to wait for the tool call to complete. Must be between 5 and 120 seconds (inclusive). */
  response_timeout_secs?: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions?: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech?: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments?: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode?: ToolErrorHandlingMode;
  /** Configuration for dynamic variables */
  dynamic_variables?: DynamicVariablesConfigInput;
  /** Determines when and how the tool executes: 'immediate' executes the tool right away when requested by the LLM, 'post_tool_speech' waits for the agent to finish speaking before executing, 'async' runs the tool in the background without blocking - best for long-running operations. */
  execution_mode?: ToolExecutionMode;
  /** The version of the API integration tool */
  tool_version?: string;
  api_integration_id: string;
  api_integration_connection_id: string;
  /** User overrides applied on top of the base api_schema */
  api_schema_overrides?: ApiIntegrationWebhookOverrides | null;
};

export type ApiIntegrationWebhookToolConfigOutput = {
  type: string;
  name: string;
  /** Description of when the tool should be used and what it does. */
  description: string;
  /** The maximum time in seconds to wait for the tool call to complete. Must be between 5 and 120 seconds (inclusive). */
  response_timeout_secs: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode: ToolErrorHandlingMode;
  /** Configuration for dynamic variables */
  dynamic_variables: DynamicVariablesConfigOutput;
  /** Determines when and how the tool executes: 'immediate' executes the tool right away when requested by the LLM, 'post_tool_speech' waits for the agent to finish speaking before executing, 'async' runs the tool in the background without blocking - best for long-running operations. */
  execution_mode: ToolExecutionMode;
  /** The version of the API integration tool */
  tool_version: string;
  api_integration_id: string;
  api_integration_connection_id: string;
  /** User overrides applied on top of the base api_schema */
  api_schema_overrides: ApiIntegrationWebhookOverrides | null;
};

export type ArrayJsonSchemaPropertyInput = {
  type?: string;
  description?: string;
  /** Schema for array elements. */
  items?: LiteralJsonSchemaProperty | ObjectJsonSchemaPropertyInput | ArrayJsonSchemaPropertyInput;
  /** When set, the entire array is populated from this dynamic variable at runtime. Mutually exclusive with description (LLM-provided array) and constant_value. */
  dynamic_variable?: string;
  /** When set, the entire array uses this constant value at runtime. Mutually exclusive with description (LLM-provided array) and dynamic_variable. */
  constant_value?: (string | number | number | boolean)[] | null;
};

export type ArrayJsonSchemaPropertyOutput = {
  type?: string;
  description?: string;
  /** Schema for array elements. */
  items?: LiteralJsonSchemaProperty | ObjectJsonSchemaPropertyOutput | ArrayJsonSchemaPropertyOutput;
  /** When set, the entire array is populated from this dynamic variable at runtime. Mutually exclusive with description (LLM-provided array) and constant_value. */
  dynamic_variable?: string;
  /** When set, the entire array uses this constant value at runtime. Mutually exclusive with description (LLM-provided array) and dynamic_variable. */
  constant_value?: (string | number | number | boolean)[] | null;
};

export type AssetTranscription = {
  status: "processing" | "completed" | "failed";
  data: AssetTranscriptionData | null;
  updated_at_ms?: number;
};

export type AssetTranscriptionData = {
  language_code: string;
  text: string;
  words: (string)[];
  word_start_times_ms: (number)[];
  word_end_times_ms: (number)[];
  word_speaker_ids: (string | null)[];
};

export type AssignConversationTagsRequestModel = {
  /** Tag IDs to add to the conversation. Re-assigning an existing tag is a no-op. */
  tag_ids: (string)[];
};

/** Metadata for async conversation delivery (Zendesk, Slack, etc.). */
export type AsyncConversationMetadata = {
  delivery_status: "pending" | "success" | "failed";
  delivery_timestamp: number;
  delivery_error?: string | null;
  external_system: string;
  external_id: string;
  external_link?: string | null;
  retry_count?: number;
  last_retry_timestamp?: number | null;
  last_processed_external_message_id?: string | null;
};

export type AttachedTestModel = {
  test_id: string;
  workflow_node_id?: string | null;
};

export type AudioAnalysis = {
  status: "processing" | "completed" | "failed";
  data: AudioAnalysisResult | null;
  updated_at_ms?: number;
};

export type AudioAnalysisResult = {
  title: string;
  description: string;
  content_type?: string | null;
  overall_pacing?: string | null;
  segments?: (AudioSegment)[];
  key_moments?: (AudioKeyMoment)[];
};

export type AudioIsolationHistoryItemResponseModel = {
  id: string;
  title: string | null;
  created_at_unix: number;
  format: string;
  duration_seconds: number | null;
  download_url: string | null;
  icon_url: string | null;
  source_video_url: string | null;
  supports_video: boolean;
  processing: boolean;
  video_processing_failed: boolean;
  preview_b64: string | null;
};

export type AudioKeyMoment = {
  timestamp_ms: number;
  type: string;
  description: string;
};

export type AudioNativeCreateProjectResponseModel = {
  /** The ID of the created Audio Native project. */
  project_id: string;
  /** Whether the project is currently being converted. */
  converting: boolean;
  /** The HTML snippet to embed the Audio Native player. */
  html_snippet: string;
};

export type AudioNativeEditContentResponseModel = {
  /** The ID of the project. */
  project_id: string;
  /** Whether the project is currently being converted. */
  converting: boolean;
  /** Whether the project is currently being published. */
  publishing: boolean;
  /** The HTML snippet to embed the Audio Native player. */
  html_snippet: string;
};

export type AudioNativeProjectSettingsResponseModel = {
  /** The title of the project. */
  title: string;
  /** The image of the project. */
  image: string;
  /** The author of the project. */
  author: string;
  /** Whether the project is small. */
  small: boolean;
  /** The text color of the project. */
  text_color: string;
  /** The background color of the project. */
  background_color: string;
  /** The sessionization of the project. Specifies for how many minutes to persist the session across page reloads. */
  sessionization: number;
  /** The path of the audio file. */
  audio_path?: string | null;
  /** The URL of the audio file. */
  audio_url?: string | null;
  /** Current state of the project */
  status?: "processing" | "ready";
};

export type AudioSegment = {
  start_ms: number;
  end_ms: number;
  description: string;
  segment_type?: string | null;
  has_speech?: boolean;
  has_music?: boolean;
  pacing?: string | null;
};

export type AudioWithTimestampsAndVoiceSegmentsResponseModel = {
  /** Base64 encoded audio data */
  audio_base64: string;
  /** Timestamp information for each character in the original text */
  alignment?: CharacterAlignmentResponseModel | null;
  /** Timestamp information for each character in the normalized text */
  normalized_alignment?: CharacterAlignmentResponseModel | null;
  /** Voice segments for the audio */
  voice_segments: (VoiceSegment)[];
};

export type AudioWithTimestampsResponseModel = {
  /** Base64 encoded audio data */
  audio_base64: string;
  /** Timestamp information for each character in the original text */
  alignment?: CharacterAlignmentResponseModel | null;
  /** Timestamp information for each character in the normalized text */
  normalized_alignment?: CharacterAlignmentResponseModel | null;
};

/** Dependencies that use an auth connection */
export type AuthConnectionDependencies = {
  tools?: (DependentAvailableToolIdentifier | DependentUnknownToolIdentifier)[];
  mcp_servers?: (DependentAvailableMcpServerIdentifier | DependentUnknownMcpServerIdentifier)[];
  integration_connections?: (DependentIntegrationConnectionIdentifier)[];
};

/** Used to reference an auth connection from the workspace's auth connection store. */
export type AuthConnectionLocator = {
  auth_connection_id: string;
};

export type AuthSettings = {
  /** If set to true, starting a conversation with an agent will require a signed token */
  enable_auth?: boolean;
  /** A list of hosts that are allowed to start conversations with the agent */
  allowlist?: (AllowlistItem)[];
  /** When enabled, connections with no origin header will be rejected. If the allowlist is empty, this option has no effect. */
  require_origin_header?: boolean;
  /** A shareable token that can be used to start a conversation with the agent */
  shareable_token?: string | null;
};

/** OCSF Activity IDs for Authentication [3002] events.  Spec: https://schema.ocsf.io/1.6.0/classes/authentication */
export type AuthenticationActivityId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;

export type AuthorizationMethod = "invalid" | "public" | "authorization_header" | "signed_url" | "shareable_link" | "livekit_token" | "livekit_token_website" | "genesys_api_key" | "whatsapp" | "sms";

export type AutoSyncInfo = {
  /** Maximum number of days between automatic syncs */
  minimum_frequency_days?: number;
  /** Whether to remove the document if the URL becomes unavailable */
  auto_remove?: boolean;
  /** Number of consecutive sync failures */
  consec_failures?: number;
  /** Unix timestamp for the next scheduled sync or None (in case of folders) */
  next_refresh_by?: number | null;
};

export type BackgroundMusicConfig = {
  /** The type of background music source. */
  source_type?: BackgroundMusicSourceType | null;
  /** Identifier for the music source. */
  source_id?: BackgroundMusicPresetId | null;
  /** Volume level for background music (0.01 to 1.0). */
  volume?: number;
  /** Apply a crossfade at the loop boundary to avoid audible pops when the music loops. */
  crossfade_loop?: boolean;
};

export type BackgroundMusicConfigWorkflowOverride = {
  /** The type of background music source. */
  source_type?: BackgroundMusicSourceType | null;
  /** Identifier for the music source. */
  source_id?: BackgroundMusicPresetId | null;
  /** Volume level for background music (0.01 to 1.0). */
  volume?: number | null;
  /** Apply a crossfade at the loop boundary to avoid audible pops when the music loops. */
  crossfade_loop?: boolean | null;
};

/** Predefined background music preset identifiers. */
export type BackgroundMusicPresetId = "office2" | "office1" | "restaurant" | "city" | "typing" | "elevator1" | "elevator2" | "elevator3" | "elevator4";

/** The type of background music source. */
export type BackgroundMusicSourceType = "preset";

export type BackupLlmDefault = {
  preference?: string;
};

export type BackupLlmDisabled = {
  preference?: string;
};

export type BackupLlmOverride = {
  preference?: string;
  order: (Llm)[];
};

export type BaseTurnConfig = {
  /** Maximum wait time for the user's reply before re-engaging the user */
  turn_timeout?: number;
  /** How long the agent will wait for the user to start the conversation if the first message is empty. If not set, uses the regular turn_timeout. */
  initial_wait_time?: number | null;
  /** Maximum wait time since the user last spoke before terminating the call */
  silence_end_call_timeout?: number;
  /** The mode of turn detection */
  mode?: TurnMode;
  /** Controls how eager the agent is to respond. Low = less eager (waits longer), Standard = default eagerness, High = more eager (responds sooner) */
  turn_eagerness?: TurnEagerness;
  /** Controls if the agent should be more patient when user is spelling numbers and named entities. Auto = model based, Off = never wait extra */
  spelling_patience?: SpellingPatience;
  /** When enabled, starts generating LLM responses during silence before full turn confidence is reached, reducing perceived latency. May increase LLM costs. */
  speculative_turn?: boolean;
  /** When enabled, if VAD detects no speech, attempts to re-transcribe accumulated audio at turn timeout. Disables silence discount billing for affected turns. */
  retranscribe_on_turn_timeout?: boolean;
};

/** Response model for basic auth */
export type BasicAuthResponse = {
  name: string;
  auth_type?: string;
  provider: string;
  username: string;
  id: string;
  used_by?: AuthConnectionDependencies | null;
};

/** Detailed response model for a batch call including all recipients. */
export type BatchCallDetailedResponse = {
  id: string;
  phone_number_id: string | null;
  phone_provider: TelephonyProvider | null;
  whatsapp_params: BatchCallWhatsAppParams | null;
  name: string;
  agent_id: string;
  branch_id: string | null;
  environment: string | null;
  created_at_unix: number;
  scheduled_time_unix: number;
  timezone: string | null;
  total_calls_dispatched: number;
  total_calls_scheduled: number;
  total_calls_finished: number;
  last_updated_at_unix: number;
  status: BatchCallStatus;
  retry_count: number;
  telephony_call_config: TelephonyCallConfig;
  /** Maximum number of simultaneous calls for this batch. When set, dispatch is governed by this limit rather than workspace/agent capacity percentages. */
  target_concurrency_limit: number | null;
  agent_name: string;
  branch_name: string | null;
  recipients: (OutboundCallRecipientResponseModel)[];
};

export type BatchCallRecipientStatus = "pending" | "dispatched" | "initiated" | "in_progress" | "completed" | "failed" | "cancelled" | "voicemail";

export type BatchCallResponse = {
  id: string;
  phone_number_id: string | null;
  phone_provider: TelephonyProvider | null;
  whatsapp_params: BatchCallWhatsAppParams | null;
  name: string;
  agent_id: string;
  branch_id: string | null;
  environment: string | null;
  created_at_unix: number;
  scheduled_time_unix: number;
  timezone: string | null;
  total_calls_dispatched: number;
  total_calls_scheduled: number;
  total_calls_finished: number;
  last_updated_at_unix: number;
  status: BatchCallStatus;
  retry_count: number;
  telephony_call_config: TelephonyCallConfig;
  /** Maximum number of simultaneous calls for this batch. When set, dispatch is governed by this limit rather than workspace/agent capacity percentages. */
  target_concurrency_limit: number | null;
  agent_name: string;
  branch_name: string | null;
};

export type BatchCallStatus = "pending" | "in_progress" | "completed" | "failed" | "cancelled";

export type BatchCallWhatsAppParams = {
  whatsapp_phone_number_id?: string | null;
  whatsapp_call_permission_request_template_name: string;
  whatsapp_call_permission_request_template_language_code: string;
};

export type BatchFailureResponseModel = {
  status: string;
  error_code: number;
  error_status: string;
  error_message: string;
};

/** Response model for bearer auth */
export type BearerAuthResponse = {
  name: string;
  auth_type?: string;
  provider: string;
  id: string;
  used_by?: AuthConnectionDependencies | null;
};

export type BehaviorOverride = {
  /** Verbosity override. Underlying default applies when unset. */
  verbosity?: Verbosity | null;
  /** Output format override. Underlying default applies when unset. */
  output_format?: OutputFormat | null;
  /** Interaction budget override. Underlying default applies when unset. */
  interaction_budget?: InteractionBudget | null;
};

export type BillingPeriod = "monthly_period" | "3_month_period" | "6_month_period" | "annual_period";

export type BodyAddALanguageToTheResourceV1DubbingResourceDubbingIdLanguagePost = {
  /** The Target language. */
  language: string | null;
};

export type BodyAddAPronunciationDictionaryV1PronunciationDictionariesAddFromFilePost = {
  /** The name of the pronunciation dictionary, used for identification only. */
  name: string;
  /** A lexicon .pls file which we will use to initialize the project with. */
  file?: string | null;
  /** A description of the pronunciation dictionary, used for identification only. */
  description?: string | null;
  /** Should be one of 'admin', 'editor' or 'viewer'. If not provided, defaults to no access. */
  workspace_access?: "admin" | "editor" | "commenter" | "viewer" | null;
};

export type BodyAddAPronunciationDictionaryV1PronunciationDictionariesAddFromRulesPost = {
  /** List of pronunciation rules. Rule can be either:     an alias rule: {'string_to_replace': 'a', 'type': 'alias', 'alias': 'b', }     or a phoneme rule: {'string_to_replace': 'a', 'type': 'phoneme', 'phoneme': 'b', 'alphabet': 'ipa' } */
  rules: (PronunciationDictionaryAliasRuleRequestModel | PronunciationDictionaryPhonemeRuleRequestModel)[];
  /** The name of the pronunciation dictionary, used for identification only. */
  name: string;
  /** A description of the pronunciation dictionary, used for identification only. */
  description?: string | null;
  /** Should be one of 'admin', 'editor' or 'viewer'. If not provided, defaults to no access. */
  workspace_access?: "admin" | "editor" | "commenter" | "viewer" | null;
};

export type BodyAddMemberToUserGroupV1WorkspaceGroupsGroupIdMembersPost = {
  /** The email of the target workspace member. */
  email: string;
};

export type BodyAddRulesToThePronunciationDictionaryV1PronunciationDictionariesPronunciationDictionaryIdAddRulesPost = {
  /** List of pronunciation rules. Rule can be either:     an alias rule: {'string_to_replace': 'a', 'type': 'alias', 'alias': 'b', }     or a phoneme rule: {'string_to_replace': 'a', 'type': 'phoneme', 'phoneme': 'b', 'alphabet': 'ipa' } */
  rules: (PronunciationDictionaryAliasRuleRequestModel | PronunciationDictionaryPhonemeRuleRequestModel)[];
};

export type BodyAddSamplesToPvcVoiceV1VoicesPvcVoiceIdSamplesPost = {
  /** Audio files used to create the voice. */
  files: (string)[];
  /** If set will remove background noise for voice samples using our audio isolation model. If the samples do not include background noise, it can make the quality worse. */
  remove_background_noise?: boolean;
};

export type BodyAddSharedVoiceV1VoicesAddPublicUserIdVoiceIdPost = {
  /** The name that identifies this voice. This will be displayed in the dropdown of the website. */
  new_name: string;
  bookmarked?: boolean;
};

export type BodyAddToKnowledgeBaseV1ConvaiKnowledgeBasePost = {
  /** A custom, human-readable name for the document. */
  name?: string | null;
  /** URL to a page of documentation that the agent will have access to in order to interact with users. */
  url?: string;
  /** Documentation that the agent will have access to in order to interact with users. */
  file?: string;
};

export type BodyAddVoiceV1VoicesAddPost = {
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
};

export type BodyAudioIsolationStreamV1AudioIsolationStreamPost = {
  /** The audio file from which vocals/speech will be isolated from. */
  audio: string;
  /** The format of input audio. Options are 'pcm_s16le_16' or 'other' For `pcm_s16le_16`, the input audio must be 16-bit PCM at a 16kHz sample rate, single channel (mono), and little-endian byte order. Latency will be lower than with passing an encoded waveform. */
  file_format?: "pcm_s16le_16" | "other" | null;
};

export type BodyAudioIsolationV1AudioIsolationPost = {
  /** The audio file from which vocals/speech will be isolated from. */
  audio: string;
  /** The format of input audio. Options are 'pcm_s16le_16' or 'other' For `pcm_s16le_16`, the input audio must be 16-bit PCM at a 16kHz sample rate, single channel (mono), and little-endian byte order. Latency will be lower than with passing an encoded waveform. */
  file_format?: "pcm_s16le_16" | "other" | null;
  /** Optional preview image base64 for tracking this generation. */
  preview_b64?: string | null;
};

export type BodyBulkMoveEntitiesToFolderV1ConvaiKnowledgeBaseBulkMovePost = {
  /** The ids of documents or folders from the knowledge base. */
  document_ids: (string)[];
  /** The folder to move the entities to. If not set, the entities will be moved to the root folder. */
  move_to?: string | null;
};

export type BodyBulkMoveTestsToFolderV1ConvaiAgentTestingBulkMovePost = {
  /** The IDs of tests or folders to move. */
  entity_ids: (string)[];
  /** The folder to move the entities to. If not set, the entities will be moved to the root folder. */
  move_to?: string | null;
};

export type BodyComposeMusicWithADetailedResponseV1MusicDetailedPost = {
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
};

export type BodyComposeMusicV1MusicPost = {
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
};

export type BodyComputeRagIndexesInBatchV1ConvaiKnowledgeBaseRagIndexPost = {
  /** List of requested RAG indexes. Minimum 1, maximum 100 items. */
  items: (GetOrCreateRagIndexRequestModel)[];
};

export type BodyCreateAgentV1ConvaiAgentsCreatePost = {
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
};

export type BodyCreatePvcVoiceV1VoicesPvcPost = {
  /** The name that identifies this voice. This will be displayed in the dropdown of the website. */
  name: string;
  /** Language used in the samples. */
  language: string;
  /** Description to use for the created voice. */
  description?: string | null;
  /** Labels for the voice. Keys can be language, accent, gender, or age. */
  labels?: { [key: string]: string | undefined } | null;
};

export type BodyCreatePronunciationDictionariesV1StudioProjectsProjectIdPronunciationDictionariesPost = {
  /** A list of pronunciation dictionary locators (pronunciation_dictionary_id, version_id) encoded as a list of JSON strings for pronunciation dictionaries to be applied to the text. A list of json encoded strings is required as adding projects may occur through formData as opposed to jsonBody. To specify multiple dictionaries use multiple --form lines in your curl, such as --form 'pronunciation_dictionary_locators="{\"pronunciation_dictionary_id\":\"Vmd4Zor6fplcA7WrINey\",\"version_id\":\"hRPaxjlTdR7wFMhV4w0b\"}"' --form 'pronunciation_dictionary_locators="{\"pronunciation_dictionary_id\":\"JzWtcGQMJ6bnlWwyMo7e\",\"version_id\":\"lbmwxiLu4q6txYxgdZqn\"}"'. */
  pronunciation_dictionary_locators: (PronunciationDictionaryVersionLocatorDbModel)[];
  /** This will automatically mark text in this project for reconversion when the new dictionary applies or the old one no longer does. */
  invalidate_affected_text?: boolean;
};

export type BodyCreateStudioProjectV1StudioProjectsPost = {
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
};

export type BodyCreateUrlDocumentV1ConvaiKnowledgeBaseUrlPost = {
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
};

export type BodyCreateANewBranchV1ConvaiAgentsAgentIdBranchesPost = {
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
};

export type BodyCreateANewSpeakerV1DubbingResourceDubbingIdSpeakerPost = {
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
};

export type BodyCreateANewVoiceFromVoicePreviewV1TextToVoicePost = {
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
};

export type BodyCreateAgentDraftV1ConvaiAgentsAgentIdDraftsPost = {
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
};

export type BodyCreateAgentTestFolderV1ConvaiAgentTestingFoldersPost = {
  /** The name of the folder to create */
  name: string;
  /** The ID of the parent folder. If not provided, the folder will be created at the root level. */
  parent_folder_id?: string | null;
};

export type BodyCreateChapterV1StudioProjectsProjectIdChaptersPost = {
  /** The name of the chapter, used for identification only. */
  name: string;
  /** An optional URL from which we will extract content to initialize the Studio project. If this is set, 'from_url' and 'from_content' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank. */
  from_url?: string | null;
};

export type BodyCreateFileDocumentV1ConvaiKnowledgeBaseFilePost = {
  /** Documentation that the agent will have access to in order to interact with users. */
  file: string;
  /** A custom, human-readable name for the document. */
  name?: string | null;
  /** If set, the created document or folder will be placed inside the given folder. */
  parent_folder_id?: string | null;
};

export type BodyCreateFolderV1ConvaiKnowledgeBaseFolderPost = {
  /** A custom, human-readable name for the document. */
  name: string;
  /** If set, the created document or folder will be placed inside the given folder. */
  parent_folder_id?: string | null;
  /** Whether to enable auto-sync for this URL document. */
  enable_auto_sync?: boolean;
  /** Whether to automatically remove the document if the URL becomes unavailable. Only applicable when auto-sync is enabled. */
  auto_remove?: boolean;
};

export type BodyCreateForcedAlignmentV1ForcedAlignmentPost = {
  /** The file to align. All major audio formats are supported. The file size must be less than 1GB. */
  file: string;
  /** The text to align with the audio. The input text can be in any format, however diarization is not supported at this time. */
  text: string;
};

export type BodyCreateOrUpdateDeploymentsV1ConvaiAgentsAgentIdDeploymentsPost = {
  /** Request to create a new deployment */
  deployment_request: AgentDeploymentRequest;
};

export type BodyCreatePodcastV1StudioPodcastsPost = {
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
};

export type BodyCreateTextDocumentV1ConvaiKnowledgeBaseTextPost = {
  /** Text content to be added to the knowledge base. */
  text: string;
  /** A custom, human-readable name for the document. */
  name?: string | null;
  /** If set, the created document or folder will be placed inside the given folder. */
  parent_folder_id?: string | null;
};

export type BodyCreateWorkspaceWebhookV1WorkspaceWebhooksPost = {
  /** Webhook settings object containing auth_type and corresponding configuration */
  settings: WebhookHmacSettings;
};

export type BodyCreatesAudioNativeEnabledProjectV1AudioNativePost = {
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
};

export type BodyDeleteExistingInvitationV1WorkspaceInvitesDelete = {
  /** The email of the customer */
  email: string;
};

export type BodyDeleteMemberFromUserGroupV1WorkspaceGroupsGroupIdMembersRemovePost = {
  /** The email of the target workspace member. */
  email: string;
};

export type BodyDownloadHistoryItemsV1HistoryDownloadPost = {
  /** A list of history items to download, you can get IDs of history items and other metadata using the GET https://api.elevenlabs.io/v1/history endpoint. */
  history_item_ids: (string)[];
  /** Output format to transcode the audio file, can be wav or default. */
  output_format?: string | null;
};

export type BodyDubAVideoOrAnAudioFileV1DubbingPost = {
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
};

export type BodyDubsAllOrSomeSegmentsAndLanguagesV1DubbingResourceDubbingIdDubPost = {
  /** Dub only this list of segments. */
  segments: (string)[];
  /** Dub only these languages for each segment. */
  languages: (string)[] | null;
};

export type BodyDuplicateAgentV1ConvaiAgentsAgentIdDuplicatePost = {
  /** A name to make the agent easier to find */
  name?: string | null;
};

export type BodyEditPvcVoiceV1VoicesPvcVoiceIdPost = {
  /** The name that identifies this voice. This will be displayed in the dropdown of the website. */
  name?: string;
  /** Language used in the samples. */
  language?: string;
  /** Description to use for the created voice. */
  description?: string | null;
  /** Labels for the voice. Keys can be language, accent, gender, or age. */
  labels?: { [key: string]: string | undefined } | null;
};

export type BodyEditVoiceV1VoicesVoiceIdEditPost = {
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
};

export type BodyGenerateCompositionPlanV1MusicPlanPost = {
  /** A simple text prompt to compose a plan from. */
  prompt: string;
  /** The length of the composition plan to generate in milliseconds. Must be between 3000ms and 600000ms. Optional - if not provided, the model will choose a length based on the prompt. */
  music_length_ms?: number | null;
  /** An optional composition plan to use as a source for the new composition plan. */
  source_composition_plan?: MusicPrompt | null;
  /** The model to use for the generation. */
  model_id?: "music_v1";
};

export type BodyGetWorkspaceUsageV1WorkspaceAnalyticsQueryUsageByProductOverTimePost = {
  /** Start of the time range as a Unix timestamp in milliseconds. Must be at least 2020-01-01. */
  start_time: number;
  /** End of the time range as a Unix timestamp in milliseconds. Must be at least 2020-01-01. */
  end_time: number;
  /** Bucket size in seconds. Each row in the response covers this many seconds of usage. For example, pass 3600 for hourly buckets or 86400 for daily buckets. */
  interval_seconds?: number;
  group_by?: ("product_type" | "model" | "voice_id" | "user_id" | "fiat_currency" | "fiat_charge_type" | "region" | "reporting_workspace_id" | "request_source" | "resource_id" | "subresource_id" | "request_queue_type" | "voice_multiplier" | "hashed_xi_api_key" | "billing_group_id")[] | null;
  filters?: (ColumnFilter)[] | null;
};

export type BodyGetSimilarLibraryVoicesV1SimilarVoicesPost = {
  audio_file?: string;
  /** Threshold for voice similarity between provided sample and library voices. Values range from 0 to 2. The smaller the value the more similar voices will be returned. */
  similarity_threshold?: number | null;
  /** Number of most similar voices to return. If similarity_threshold is provided, less than this number of voices may be returned. Values range from 1 to 100. */
  top_k?: number | null;
};

export type BodyHandleAnOutboundCallViaExotelV1ConvaiExotelOutboundCallPost = {
  agent_id: string;
  agent_phone_number_id: string;
  to_number: string;
  conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
  telephony_call_config?: TelephonyCallConfig;
};

export type BodyHandleAnOutboundCallViaSipTrunkV1ConvaiSipTrunkOutboundCallPost = {
  agent_id: string;
  agent_phone_number_id: string;
  to_number: string;
  conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
  telephony_call_config?: TelephonyCallConfig;
};

export type BodyHandleAnOutboundCallViaTwilioV1ConvaiTwilioOutboundCallPost = {
  agent_id: string;
  agent_phone_number_id: string;
  to_number: string;
  conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
  /** Whether let Twilio record the call. */
  call_recording_enabled?: boolean | null;
  telephony_call_config?: TelephonyCallConfig;
};

export type BodyInviteMultipleUsersV1WorkspaceInvitesAddBulkPost = {
  /** The email of the customer */
  emails: (string)[];
  /** The seat type of the user */
  seat_type?: SeatType | null;
  /** The group ids of the user */
  group_ids?: (string)[] | null;
};

export type BodyInviteUserV1WorkspaceInvitesAddPost = {
  /** The email of the customer */
  email: string;
  /** The workspace permission of the user. This is deprecated, use `seat_type` instead. */
  workspace_permission?: string | null;
  /** The seat type of the user */
  seat_type?: SeatType | null;
  /** The group ids of the user */
  group_ids?: (string)[] | null;
};

export type BodyListApiRequestsV1WorkspaceAnalyticsRequestsPost = {
  /** Start of the time range as a Unix timestamp in milliseconds. */
  start_time?: number | null;
  /** End of the time range as a Unix timestamp in milliseconds. */
  end_time?: number | null;
  limit?: number;
  /** Optional timestamp sort direction. If omitted, defaults to desc when end_time is provided, otherwise asc. */
  sort?: "asc" | "desc" | null;
  filters?: (ColumnFilter)[] | null;
  search?: string | null;
};

export type BodyMakeAnOutboundCallViaWhatsAppV1ConvaiWhatsappOutboundCallPost = {
  whatsapp_phone_number_id: string;
  whatsapp_user_id: string;
  whatsapp_call_permission_request_template_name: string;
  whatsapp_call_permission_request_template_language_code: string;
  agent_id: string;
  conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
};

export type BodyMergeABranchIntoATargetBranchV1ConvaiAgentsAgentIdBranchesSourceBranchIdMergePost = {
  /** Whether to archive the source branch after merging */
  archive_source_branch?: boolean;
  /** Force source branch changes onto the target, overriding timestamp-based conflict resolution */
  force?: boolean;
};

export type BodyMoveEntityToFolderV1ConvaiKnowledgeBaseDocumentIdMovePost = {
  /** The folder to move the entities to. If not set, the entities will be moved to the root folder. */
  move_to?: string | null;
};

export type BodyMoveSegmentsBetweenSpeakersV1DubbingResourceDubbingIdMigrateSegmentsPost = {
  segment_ids: (string)[];
  speaker_id: string;
};

export type BodyPatchesAnAgentSettingsV1ConvaiAgentsAgentIdPatch = {
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
};

export type BodyPostAgentAvatarV1ConvaiAgentsAgentIdAvatarPost = {
  /** An image file to be used as the agent's avatar. */
  avatar_file: string;
};

export type BodyRegisterATwilioCallAndReturnTwiMlV1ConvaiTwilioRegisterCallPost = {
  agent_id: string;
  from_number: string;
  to_number: string;
  direction?: TelephonyDirection;
  conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
};

export type BodyRegisterMediaV1ProductionsOrdersOrderIdMediaPost = {
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
};

export type BodyRemoveRulesFromThePronunciationDictionaryV1PronunciationDictionariesPronunciationDictionaryIdRemoveRulesPost = {
  /** List of strings to remove from the pronunciation dictionary. */
  rule_strings: (string)[];
};

export type BodyRenderAudioOrVideoForTheGivenLanguageV1DubbingResourceDubbingIdRenderLanguagePost = {
  /** The type of the render. One of ['mp4', 'aac', 'mp3', 'wav', 'aaf', 'tracks_zip', 'clips_zip'] */
  render_type: RenderType;
  /** Whether to normalize the volume of the rendered audio. */
  normalize_volume?: boolean | null;
};

export type BodyRequestManualVerificationV1VoicesPvcVoiceIdVerificationPost = {
  /** Verification documents */
  files: (string)[];
  /** Extra text to be used in the manual verification process. */
  extra_text?: string | null;
};

export type BodyRunPvcTrainingV1VoicesPvcVoiceIdTrainPost = {
  /** The model ID to use for the conversion. */
  model_id?: string | null;
};

export type BodySendAnOutboundMessageViaWhatsAppV1ConvaiWhatsappOutboundMessagePost = {
  whatsapp_phone_number_id: string;
  whatsapp_user_id: string;
  template_name: string;
  template_language_code: string;
  template_params: (WhatsAppTemplateHeaderComponentParams | WhatsAppTemplateBodyComponentParams | WhatsAppTemplateButtonComponentParams)[];
  agent_id: string;
  conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
};

export type BodySetRulesOnThePronunciationDictionaryV1PronunciationDictionariesPronunciationDictionaryIdSetRulesPost = {
  /** List of pronunciation rules. Rule can be either:     an alias rule: {'string_to_replace': 'a', 'type': 'alias', 'alias': 'b', }     or a phoneme rule: {'string_to_replace': 'a', 'type': 'phoneme', 'phoneme': 'b', 'alphabet': 'ipa' } */
  rules: (PronunciationDictionaryAliasRuleRequestModel | PronunciationDictionaryPhonemeRuleRequestModel)[];
};

export type BodyShareWorkspaceResourceV1WorkspaceResourcesResourceIdSharePost = {
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
};

export type BodySimulatesAConversationStreamV1ConvaiAgentsAgentIdSimulateConversationStreamPost = {
  /** A specification detailing how the conversation should be simulated */
  simulation_specification: ConversationSimulationSpecification;
  /** A list of evaluation criteria to test */
  extra_evaluation_criteria?: (PromptEvaluationCriteria)[] | null;
  /** Maximum number of new turns to generate in the conversation simulation */
  new_turns_limit?: number;
};

export type BodySimulatesAConversationV1ConvaiAgentsAgentIdSimulateConversationPost = {
  /** A specification detailing how the conversation should be simulated */
  simulation_specification: ConversationSimulationSpecification;
  /** A list of evaluation criteria to test */
  extra_evaluation_criteria?: (PromptEvaluationCriteria)[] | null;
  /** Maximum number of new turns to generate in the conversation simulation */
  new_turns_limit?: number;
};

export type BodySoundGenerationV1SoundGenerationPost = {
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
};

export type BodySpeechToSpeechStreamingV1SpeechToSpeechVoiceIdStreamPost = {
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
};

export type BodySpeechToSpeechV1SpeechToSpeechVoiceIdPost = {
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
};

export type BodySpeechToTextV1SpeechToTextPost = {
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
};

export type BodyStemSeparationV1MusicStemSeparationPost = {
  /** The audio file to separate into stems. */
  file: string;
  /** The id of the stem variation to use. */
  stem_variation_id?: "two_stems_v1" | "six_stems_v1";
  /** Whether to sign the generated song with C2PA. Applicable only for mp3 files. */
  sign_with_c2pa?: boolean;
};

export type BodyStreamStudioProjectAudioV1StudioProjectsProjectIdSnapshotsProjectSnapshotIdStreamPost = {
  /** Whether to convert the audio to mpeg format. */
  convert_to_mpeg?: boolean;
};

export type BodyStreamChapterAudioV1StudioProjectsProjectIdChaptersChapterIdSnapshotsChapterSnapshotIdStreamPost = {
  /** Whether to convert the audio to mpeg format. */
  convert_to_mpeg?: boolean;
};

export type BodyStreamComposedMusicV1MusicStreamPost = {
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
};

export type BodySubmitABatchCallRequestV1ConvaiBatchCallingSubmitPost = {
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
};

export type BodyTextToDialogueMultiVoiceStreamingV1TextToDialogueStreamPost = {
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
};

export type BodyTextToDialogueMultiVoiceV1TextToDialoguePost = {
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
};

export type BodyTranscribesSegmentsV1DubbingResourceDubbingIdTranscribePost = {
  /** Transcribe this specific list of segments. */
  segments: (string)[];
};

export type BodyTranslatesAllOrSomeSegmentsAndLanguagesV1DubbingResourceDubbingIdTranslatePost = {
  /** Translate only this list of segments. */
  segments: (string)[];
  /** Translate only these languages for each segment. */
  languages: (string)[] | null;
};

export type BodyUnshareWorkspaceResourceV1WorkspaceResourcesResourceIdUnsharePost = {
  /** Resource type of the target resource. */
  resource_type: WorkspaceResourceType;
  /** The email of the user or service account. */
  user_email?: string | null;
  /** The ID of the target group. Use 'default' to set the resource's baseline role — every workspace member receives this role unless they hold a higher one through a direct user grant, group membership, or workspace (service account) API key. */
  group_id?: string | null;
  /** The ID of the target workspace (service account) API key. This is not the API key string itself that you pass in the header for authentication — it is the key's ID, which workspace admins can find under Developers → Service Accounts. */
  workspace_api_key_id?: string | null;
};

export type BodyUpdatePvcVoiceSampleV1VoicesPvcVoiceIdSamplesSampleIdPost = {
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
};

export type BodyUpdateStudioProjectContentV1StudioProjectsProjectIdContentPost = {
  /** An optional URL from which we will extract content to initialize the Studio project. If this is set, 'from_url' and 'from_content' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank. */
  from_url?: string | null;
  /** An optional .epub, .pdf, .txt or similar file can be provided. If provided, we will initialize the Studio project with its content. If this is set, 'from_url' and 'from_content' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank. */
  from_document?: string | null;
  /**      An optional content to initialize the Studio project with. If this is set, 'from_url' and 'from_document' must be null. If neither 'from_url', 'from_document', 'from_content' are provided we will initialize the Studio project as blank.      Example:     [{"name": "Chapter A", "blocks": [{"sub_type": "p", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "A", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "B", "type": "tts_node"}]}, {"sub_type": "h1", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "C", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "D", "type": "tts_node"}]}]}, {"name": "Chapter B", "blocks": [{"sub_type": "p", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "E", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "F", "type": "tts_node"}]}, {"sub_type": "h2", "nodes": [{"voice_id": "6lCwbsX1yVjD49QmpkT0", "text": "G", "type": "tts_node"}, {"voice_id": "6lCwbsX1yVjD49QmpkT1", "text": "H", "type": "tts_node"}]}]}]      */
  from_content_json?: string;
  /** Whether to auto convert the Studio project to audio or not. */
  auto_convert?: boolean;
};

export type BodyUpdateStudioProjectV1StudioProjectsProjectIdPost = {
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
};

export type BodyUpdateAgentBranchV1ConvaiAgentsAgentIdBranchesBranchIdPatch = {
  /** New name for the branch. Must be unique within the agent. */
  name?: string | null;
  /** Whether the branch should be archived */
  is_archived?: boolean | null;
  /** The protection level for the branch */
  protection_status?: BranchProtectionStatus | null;
};

export type BodyUpdateAgentTestFolderV1ConvaiAgentTestingFoldersFolderIdPatch = {
  /** The new name for the folder */
  name: string;
};

export type BodyUpdateAudioNativeProjectContentV1AudioNativeProjectIdContentPost = {
  /** Either txt or HTML input file containing the article content. HTML should be formatted as follows '&lt;html&gt;&lt;body&gt;&lt;div&gt;&lt;p&gt;Your content&lt;/p&gt;&lt;h5&gt;More of your content&lt;/h5&gt;&lt;p&gt;Some more of your content&lt;/p&gt;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;' */
  file?: string;
  /** Whether to auto convert the project to audio or not. */
  auto_convert?: boolean;
  /** Whether to auto publish the new project snapshot after it's converted. */
  auto_publish?: boolean;
};

export type BodyUpdateAudioNativeContentFromUrlV1AudioNativeContentPost = {
  /** URL of the page to extract content from. */
  url: string;
  /** Author used in the player and inserted at the start of the uploaded article. If not provided, the default author set in the Player settings is used. */
  author?: string | null;
  /** Title used in the player and inserted at the top of the uploaded article. If not provided, the default title set in the Player settings is used. */
  title?: string | null;
};

export type BodyUpdateChapterV1StudioProjectsProjectIdChaptersChapterIdPost = {
  /** The name of the chapter, used for identification only. */
  name?: string | null;
  /** The chapter content to use. */
  content?: ChapterContentInputModel | null;
};

export type BodyUpdateDocumentV1ConvaiKnowledgeBaseDocumentationIdPatch = {
  /** A custom, human-readable name for the document. */
  name?: string | null;
  /** Updated content for the document. Only supported for text documents, URL documents with auto-sync disabled, and file documents. */
  content?: string | null;
};

export type BodyUpdateFileDocumentV1ConvaiKnowledgeBaseDocumentationIdUpdateFilePatch = {
  /** Documentation that the agent will have access to in order to interact with users. */
  file: string;
};

export type BodyUpdateMemberV1WorkspaceMembersPost = {
  /** Email of the target user. */
  email: string;
  /** Whether to lock or unlock the user account. */
  is_locked?: boolean | null;
  /** The workspace role of the user. This is deprecated, use `workspace_seat_type` instead. */
  workspace_role?: SeatType | null;
  /** The workspace seat type */
  workspace_seat_type?: SeatType | null;
};

export type BodyUpdateMetadataForASpeakerV1DubbingResourceDubbingIdSpeakerSpeakerIdPatch = {
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
};

export type BodyUpdateOrderV1ProductionsOrdersOrderIdPatch = {
  request: UpdateOrderRequest;
};

export type BodyUpdatePronunciationDictionaryV1PronunciationDictionariesPronunciationDictionaryIdPatch = {
  /** Whether to archive the pronunciation dictionary. */
  archived?: boolean;
  /** The name of the pronunciation dictionary, used for identification only. */
  name?: string;
};

export type BodyUpdateWorkspaceWebhookV1WorkspaceWebhooksWebhookIdPatch = {
  /** Whether to disable or enable the webhook */
  is_disabled: boolean;
  /** The display name of the webhook (used for display purposes only). */
  name: string;
  /** Whether to enable automatic retries for transient failures (5xx, 429, timeout) */
  retry_enabled?: boolean | null;
  /** A list of request headers to include with the webhook delivery (optional) */
  request_headers?: { [key: string]: string | undefined } | null;
};

export type BodyUploadFileV1ConvaiConversationsConversationIdFilesPost = {
  /** Image or PDF file to upload */
  file: string;
};

export type BodyUploadMusicV1MusicUploadPost = {
  /** The audio file to upload. */
  file: string;
  /** Whether to generate and return the composition plan for the uploaded song. If True, the response will include the composition_plan but will increase the latency. */
  extract_composition_plan?: boolean;
};

export type BodyUpsertOrderItemV1ProductionsOrdersOrderIdItemsPost = {
  request: UpsertOrderItemRequest;
};

export type BodyVerifyPvcVoiceCaptchaV1VoicesPvcVoiceIdCaptchaPost = {
  /** Audio recording of the user */
  recording: string;
};

export type BodyVideoToMusicV1MusicVideoToMusicPost = {
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
};

export type BodyCreateServiceAccountApiKeyV1ServiceAccountsServiceAccountUserIdApiKeysPost = {
  name: string;
  /** The permissions of the XI API. */
  permissions: (PermissionType)[] | string;
  /** The character limit of the XI API key. If provided this will limit the usage of this api key to n characters per month where n is the chosen value. Requests that incur charges will fail after reaching this monthly limit. */
  character_limit?: number | null;
  /** List of IP addresses or CIDR ranges allowed to use this API key. Each entry may be a CIDR range (e.g. '10.0.0.0/24') or a bare IP address (normalized to /32 or /128). On create, omit or pass null to allow all IPs. On update, omit to leave the whitelist unchanged, or pass "clear" to remove it. */
  allowed_ips?: (string)[] | null;
};

export type BodyEditServiceAccountApiKeyV1ServiceAccountsServiceAccountUserIdApiKeysApiKeyIdPatch = {
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
};

export type BodyTextToDialogueFullWithTimestamps = {
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
};

export type BodyTextToDialogueStreamWithTimestamps = {
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
};

export type BodyTextToSpeechFull = {
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
};

export type BodyTextToSpeechFullWithTimestamps = {
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
};

export type BodyTextToSpeechStream = {
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
};

export type BodyTextToSpeechStreamWithTimestamps = {
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
};

export type BranchProtectionStatus = "writer_perms_required" | "admin_perms_required";

/** How to break down the information. Cannot be "user" or "api_key" if include_workspace_metrics is False. */
export type BreakdownTypes = "none" | "voice" | "voice_multiplier" | "user" | "groups" | "api_keys" | "all_api_keys" | "product_type" | "model" | "resource" | "request_queue" | "region" | "subresource_id" | "reporting_workspace_id" | "has_api_key" | "request_source";

export type BucketingStatus = "pending" | "completed" | "failed";

export type BuiltInToolsInput = {
  /** The end call tool */
  end_call?: SystemToolConfigInput | null;
  /** The language detection tool */
  language_detection?: SystemToolConfigInput | null;
  /** The transfer to agent tool */
  transfer_to_agent?: SystemToolConfigInput | null;
  /** The transfer to number tool */
  transfer_to_number?: SystemToolConfigInput | null;
  /** The skip turn tool */
  skip_turn?: SystemToolConfigInput | null;
  /** The play DTMF tool */
  play_keypad_touch_tone?: SystemToolConfigInput | null;
  /** The voicemail detection tool */
  voicemail_detection?: SystemToolConfigInput | null;
};

export type BuiltInToolsOutput = {
  /** The end call tool */
  end_call?: SystemToolConfigOutput | null;
  /** The language detection tool */
  language_detection?: SystemToolConfigOutput | null;
  /** The transfer to agent tool */
  transfer_to_agent?: SystemToolConfigOutput | null;
  /** The transfer to number tool */
  transfer_to_number?: SystemToolConfigOutput | null;
  /** The skip turn tool */
  skip_turn?: SystemToolConfigOutput | null;
  /** The play DTMF tool */
  play_keypad_touch_tone?: SystemToolConfigOutput | null;
  /** The voicemail detection tool */
  voicemail_detection?: SystemToolConfigOutput | null;
};

export type BuiltInToolsWorkflowOverrideInput = {
  /** The end call tool */
  end_call?: SystemToolConfigInput | null;
  /** The language detection tool */
  language_detection?: SystemToolConfigInput | null;
  /** The transfer to agent tool */
  transfer_to_agent?: SystemToolConfigInput | null;
  /** The transfer to number tool */
  transfer_to_number?: SystemToolConfigInput | null;
  /** The skip turn tool */
  skip_turn?: SystemToolConfigInput | null;
  /** The play DTMF tool */
  play_keypad_touch_tone?: SystemToolConfigInput | null;
  /** The voicemail detection tool */
  voicemail_detection?: SystemToolConfigInput | null;
};

export type BuiltInToolsWorkflowOverrideOutput = {
  /** The end call tool */
  end_call?: SystemToolConfigOutput | null;
  /** The language detection tool */
  language_detection?: SystemToolConfigOutput | null;
  /** The transfer to agent tool */
  transfer_to_agent?: SystemToolConfigOutput | null;
  /** The transfer to number tool */
  transfer_to_number?: SystemToolConfigOutput | null;
  /** The skip turn tool */
  skip_turn?: SystemToolConfigOutput | null;
  /** The play DTMF tool */
  play_keypad_touch_tone?: SystemToolConfigOutput | null;
  /** The voicemail detection tool */
  voicemail_detection?: SystemToolConfigOutput | null;
};

export type CancelCalendarEventParams = {
  smb_tool_type?: string;
};

/** Cancel an entire group session and notify every registered participant. Destructive -- prefer ``cancel_group_session_registration`` for cancelling a single attendee. */
export type CancelGroupSessionForAllParams = {
  smb_tool_type?: string;
};

/** Cancel a single client's registration for a group session. */
export type CancelGroupSessionRegistrationParams = {
  smb_tool_type?: string;
};

/** Defines asset positioning and transformation on canvas. */
export type CanvasPlacement = {
  x_relative?: number;
  y_relative?: number;
  scale_x?: number;
  scale_y?: number;
  pivot_x?: number;
  pivot_y?: number;
  skew_x?: number;
  skew_y?: number;
  crop_top?: number;
  crop_right?: number;
  crop_bottom?: number;
  crop_left?: number;
  flip_x?: boolean;
  flip_y?: boolean;
};

export type CaptionStyleCharacterAnimationModel = {
  enter_type: "none" | "fade";
  exit_type: "none" | "fade";
};

export type CaptionStyleHorizontalPlacementModel = {
  align: "left" | "center" | "right";
  translate_pct: number;
};

export type CaptionStyleModel = {
  template?: CaptionStyleTemplateModel | null;
  text_font?: string | null;
  text_scale?: number | null;
  text_color?: string | null;
  text_align?: "start" | "center" | "end" | null;
  text_style?: "normal" | "italic" | null;
  text_weight?: "normal" | "bold" | "900" | null;
  text_transform?: "none" | "uppercase" | null;
  text_blend_mode?: "normal" | "difference" | "multiply" | null;
  text_shadow?: StudioTextStyleShadowModel | null;
  text_outline?: StudioTextStyleOutlineModel | null;
  background_enabled?: boolean | null;
  background_color?: string | null;
  background_opacity?: number | null;
  word_highlights_enabled?: boolean | null;
  word_highlights_color?: string | null;
  word_highlights_background_color?: string | null;
  word_highlights_opacity?: number | null;
  section_animation?: CaptionStyleSectionAnimationModel | null;
  word_animation?: CaptionStyleWordAnimationModel | null;
  character_animation?: CaptionStyleCharacterAnimationModel | null;
  width_pct?: number | null;
  horizontal_placement?: CaptionStyleHorizontalPlacementModel | null;
  vertical_placement?: CaptionStyleVerticalPlacementModel | null;
  auto_break_enabled?: boolean | null;
  max_lines_per_section?: number | null;
  max_words_per_line?: number | null;
};

export type CaptionStyleSectionAnimationModel = {
  enter_type: "none" | "fade" | "scale";
  exit_type: "none" | "fade" | "scale";
};

export type CaptionStyleTemplateModel = {
  key: string;
  label: string;
  requires_high_fps?: boolean;
};

export type CaptionStyleVerticalPlacementModel = {
  align: "top" | "center" | "bottom";
  translate_pct: number;
};

export type CaptionStyleWordAnimationModel = {
  enter_type: "none" | "fade" | "scale";
  exit_type: "none" | "fade" | "scale";
};

/** Not used. Make sure you anticipate new types in the future. */
export type ChapterContentBlockExtendableNodeResponseModel = {
  type: string;
};

export type ChapterContentBlockInputModel = {
  sub_type?: "p" | "h1" | "h2" | "h3" | null;
  nodes: (ChapterContentParagraphTtsNodeInputModel)[];
  block_id?: string | null;
};

export type ChapterContentBlockResponseModel = {
  block_id: string;
  nodes: (ChapterContentBlockTtsNodeResponseModel | ChapterContentBlockExtendableNodeResponseModel)[];
};

export type ChapterContentBlockTtsNodeResponseModel = {
  type: string;
  voice_id: string;
  text: string;
};

export type ChapterContentInputModel = {
  blocks: (ChapterContentBlockInputModel)[];
};

export type ChapterContentParagraphTtsNodeInputModel = {
  type: string;
  text: string;
  voice_id: string;
};

export type ChapterContentResponseModel = {
  blocks: (ChapterContentBlockResponseModel)[];
};

export type ChapterResponseModel = {
  /** The ID of the chapter. */
  chapter_id: string;
  /** The name of the chapter. */
  name: string;
  /** The last conversion date of the chapter. */
  last_conversion_date_unix?: number | null;
  /** The conversion progress of the chapter. */
  conversion_progress?: number | null;
  /** Whether the chapter can be downloaded. */
  can_be_downloaded: boolean;
  /** The state of the chapter. */
  state: "default" | "converting";
  /** Whether the chapter has a video. */
  has_video?: boolean | null;
  /** Whether the chapter has any visual content (video, image, or text clips). */
  has_visual_content?: boolean | null;
  /** List of voice ids used by the chapter */
  voice_ids?: (string)[] | null;
  /** The statistics of the chapter. */
  statistics?: ChapterStatisticsResponseModel | null;
  /** The last conversion error of the chapter. */
  last_conversion_error?: string | null;
};

export type ChapterSnapshotExtendedResponseModel = {
  /** The ID of the chapter snapshot. */
  chapter_snapshot_id: string;
  /** The ID of the project. */
  project_id: string;
  /** The ID of the chapter. */
  chapter_id: string;
  /** The creation date of the chapter snapshot. */
  created_at_unix: number;
  /** The name of the chapter snapshot. */
  name: string;
  character_alignments: (CharacterAlignmentModel)[];
};

export type ChapterSnapshotResponseModel = {
  /** The ID of the chapter snapshot. */
  chapter_snapshot_id: string;
  /** The ID of the project. */
  project_id: string;
  /** The ID of the chapter. */
  chapter_id: string;
  /** The creation date of the chapter snapshot. */
  created_at_unix: number;
  /** The name of the chapter snapshot. */
  name: string;
};

export type ChapterSnapshotsResponseModel = {
  /** List of chapter snapshots. */
  snapshots: (ChapterSnapshotResponseModel)[];
};

export type ChapterStatisticsResponseModel = {
  /** The number of unconverted characters. */
  characters_unconverted: number;
  /** The number of converted characters. */
  characters_converted: number;
  /** The number of converted paragraphs. */
  paragraphs_converted: number;
  /** The number of unconverted paragraphs. */
  paragraphs_unconverted: number;
  /** The number of credits needed to convert the remaining paragraphs. */
  credits_needed_to_convert?: number | null;
  /** Per-voice breakdown of character counts. */
  voice_statistics?: (VoiceStatisticsResponseModel)[] | null;
};

export type ChapterWithContentResponseModel = {
  /** The ID of the chapter. */
  chapter_id: string;
  /** The name of the chapter. */
  name: string;
  /** The last conversion date of the chapter. */
  last_conversion_date_unix?: number | null;
  /** The conversion progress of the chapter. */
  conversion_progress?: number | null;
  /** Whether the chapter can be downloaded. */
  can_be_downloaded: boolean;
  /** The state of the chapter. */
  state: "default" | "converting";
  /** Whether the chapter has a video. */
  has_video?: boolean | null;
  /** Whether the chapter has any visual content (video, image, or text clips). */
  has_visual_content?: boolean | null;
  /** List of voice ids used by the chapter */
  voice_ids?: (string)[] | null;
  /** The statistics of the chapter. */
  statistics?: ChapterStatisticsResponseModel | null;
  /** The last conversion error of the chapter. */
  last_conversion_error?: string | null;
  content: ChapterContentResponseModel;
};

export type CharacterAlignmentModel = {
  characters: (string)[];
  character_start_times_seconds: (number)[];
  character_end_times_seconds: (number)[];
};

export type CharacterAlignmentResponseModel = {
  characters: (string)[];
  character_start_times_seconds: (number)[];
  character_end_times_seconds: (number)[];
};

export type CharacterRefreshPeriod = "monthly_period" | "3_month_period" | "6_month_period" | "annual_period";

export type ChatSourceMedium = "audio" | "text" | "image" | "file";

export type CheckServiceAvailabilityParams = {
  smb_tool_type?: string;
};

export type ClientEvent = "conversation_initiation_metadata" | "asr_initiation_metadata" | "ping" | "audio" | "interruption" | "user_transcript" | "tentative_user_transcript" | "agent_response" | "agent_response_correction" | "client_tool_call" | "mcp_tool_call" | "mcp_connection_status" | "agent_tool_request" | "agent_tool_response" | "agent_tool_response_full_payload" | "agent_response_metadata" | "vad_score" | "agent_chat_response_part" | "client_error" | "guardrail_triggered" | "dtmf_request" | "agent_response_complete" | "internal_turn_probability" | "internal_tentative_agent_response";

/** A client tool is one that sends an event to the user's client to trigger something client side */
export type ClientToolConfigInput = {
  /** The type of tool */
  type?: string;
  name: string;
  /** Description of when the tool should be used and what it does. */
  description: string;
  /** The maximum time in seconds to wait for the tool call to complete. Must be between 1 and 120 seconds (inclusive). */
  response_timeout_secs?: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions?: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech?: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments?: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode?: ToolErrorHandlingMode;
  /** Schema for any parameters to pass to the client */
  parameters?: ObjectJsonSchemaPropertyInput | null;
  /** If true, calling this tool should block the conversation until the client responds with some response which is passed to the llm. If false then we will continue the conversation without waiting for the client to respond, this is useful to show content to a user but not block the conversation */
  expects_response?: boolean;
  /** Configuration for dynamic variables */
  dynamic_variables?: DynamicVariablesConfigInput;
  /** Determines when and how the tool executes: 'immediate' executes the tool right away when requested by the LLM, 'post_tool_speech' waits for the agent to finish speaking before executing, 'async' runs the tool in the background without blocking - best for long-running operations. */
  execution_mode?: ToolExecutionMode;
};

/** A client tool is one that sends an event to the user's client to trigger something client side */
export type ClientToolConfigOutput = {
  /** The type of tool */
  type?: string;
  name: string;
  /** Description of when the tool should be used and what it does. */
  description: string;
  /** The maximum time in seconds to wait for the tool call to complete. Must be between 1 and 120 seconds (inclusive). */
  response_timeout_secs?: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions?: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech?: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments?: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode?: ToolErrorHandlingMode;
  /** Schema for any parameters to pass to the client */
  parameters?: ObjectJsonSchemaPropertyOutput | null;
  /** If true, calling this tool should block the conversation until the client responds with some response which is passed to the llm. If false then we will continue the conversation without waiting for the client to respond, this is useful to show content to a user but not block the conversation */
  expects_response?: boolean;
  /** Configuration for dynamic variables */
  dynamic_variables?: DynamicVariablesConfigOutput;
  /** Determines when and how the tool executes: 'immediate' executes the tool right away when requested by the LLM, 'post_tool_speech' waits for the agent to finish speaking before executing, 'async' runs the tool in the background without blocking - best for long-running operations. */
  execution_mode?: ToolExecutionMode;
};

export type ClipAnimation = {
  enter_effect?: "none" | "fade" | "float" | "gentle_float" | "zoom_in" | "drop" | "slide_left" | "slide_right" | "slide_up" | "slide_down" | "pop" | "bounce" | "spin" | "slide_bounce";
  enter_duration_ms?: number;
  exit_effect?: "none" | "fade" | "float" | "gentle_float" | "zoom_in" | "drop" | "slide_left" | "slide_right" | "slide_up" | "slide_down" | "pop" | "bounce" | "spin" | "slide_bounce";
  exit_duration_ms?: number;
};

export type CoachedAgentSettings = {
  type?: string;
  memory_base_id?: string | null;
};

/** Runtime-only settings for the virtual coach. Not stored in the database. */
export type CoachingAgentSettings = {
  type?: string;
  coached_agent_id: string;
  memory_base_id?: string | null;
};

export type CodeToolAllowedDomain = {
  /** Domain pattern that code tools can access. Must be a valid domain (e.g. api.github.com), optionally with a subdomain wildcard (*.example.com) or path glob (api.example.com/v1/*). */
  domain: string;
  /** Human-readable label for this domain entry */
  name: string;
};

export type ColumnFilter = {
  column: string;
  operation: "in" | "not_in" | "le" | "ge" | "lt" | "gt" | "eq" | "neq";
  values: (string | number | number | string | boolean | null)[];
};

export type ColumnUnit = "ms" | "s" | "min" | "duration" | "credits" | "usd" | "eur" | "inr" | "pln" | "ratio" | "rating";

/** Entity types for the API configuration.  This enum contains all valid entity type configurations that users can specify: - Parent types (e.g., "name", "financial_id") that expand to all subtypes - Specific subtypes using dot notation (e.g., "name.full_name") - Standalone terminal types (e.g., "email_address")  When converted for service use, parent types expand to all their terminal subtypes. */
export type ConfigEntityType = "name" | "name.name_given" | "name.name_family" | "name.name_other" | "email_address" | "contact_number" | "dob" | "age" | "religious_belief" | "political_opinion" | "sexual_orientation" | "ethnicity_race" | "marital_status" | "occupation" | "physical_attribute" | "language" | "username" | "password" | "url" | "organization" | "financial_id" | "financial_id.payment_card" | "financial_id.payment_card.payment_card_number" | "financial_id.payment_card.payment_card_expiration_date" | "financial_id.payment_card.payment_card_cvv" | "financial_id.bank_account" | "financial_id.bank_account.bank_account_number" | "financial_id.bank_account.bank_routing_number" | "financial_id.bank_account.swift_bic_code" | "financial_id.financial_id_other" | "location" | "location.location_address" | "location.location_city" | "location.location_postal_code" | "location.location_coordinate" | "location.location_state" | "location.location_country" | "location.location_other" | "date" | "date_interval" | "unique_id" | "unique_id.government_issued_id" | "unique_id.account_number" | "unique_id.vehicle_id" | "unique_id.healthcare_number" | "unique_id.healthcare_number.medical_record_number" | "unique_id.healthcare_number.health_plan_beneficiary_number" | "unique_id.device_id" | "unique_id.unique_id_other" | "medical" | "medical.medical_condition" | "medical.medication" | "medical.medical_procedure" | "medical.medical_measurement" | "medical.medical_other";

export type ConstantSchemaOverride = {
  source?: string;
  /** The constant value to use */
  constant_value: string | number | number | boolean;
};

export type ContentConfig = {
  sexual?: ContentThresholdGuardrail;
  violence?: ContentThresholdGuardrail;
  harassment?: ContentThresholdGuardrail;
  self_harm?: ContentThresholdGuardrail;
  profanity?: ContentThresholdGuardrail;
  religion_or_politics?: ContentThresholdGuardrail;
  medical_and_legal_information?: ContentThresholdGuardrail;
};

export type ContentGuardrailInput = {
  execution_mode?: GuardrailExecutionMode;
  config?: ContentConfig;
  trigger_action?: EndCallTriggerAction | RetryTriggerAction;
};

export type ContentGuardrailOutput = {
  execution_mode?: GuardrailExecutionMode;
  config?: ContentConfig;
  trigger_action?: EndCallTriggerAction | RetryTriggerAction;
};

export type ContentThresholdGuardrail = {
  is_enabled?: boolean;
  threshold?: number | "low" | "medium" | "high";
};

export type ContextualUpdateInfo = {
  /** Client-supplied identifier grouping related contextual updates. */
  context_id: string;
  /** True when this contextual update has been replaced by a newer update with the same context_id. */
  is_superseded?: boolean;
};

export type Contributor = {
  name: string;
  role: string;
  bio?: string | null;
  profile_id?: string | null;
};

/** Used to reference a dynamic variable. */
export type ConvAiDynamicVariable = {
  variable_name: string;
};

/** Used to reference an environment variable by label. */
export type ConvAiEnvVarLocator = {
  env_var_label: string;
};

export type ConvAiFileUploadResponseModel = {
  file_id: string;
};

/** Used to reference a secret from the agent's secret store. */
export type ConvAiSecretLocator = {
  secret_id: string;
};

export type ConvAiStoredSecretDependencies = {
  tools: (DependentAvailableToolIdentifier | DependentUnknownToolIdentifier)[];
  /** Whether there are more tool dependents beyond the returned preview */
  tools_has_more?: boolean;
  agents: (DependentAvailableAgentIdentifier | DependentUnknownAgentIdentifier)[];
  /** Whether there are more agent dependents beyond the returned preview */
  agents_has_more?: boolean;
  phone_numbers?: (DependentPhoneNumberIdentifier)[];
  /** Whether there are more phone number dependents beyond the returned preview */
  phone_numbers_has_more?: boolean;
  mcp_servers?: (DependentAvailableMcpServerIdentifier | DependentUnknownMcpServerIdentifier)[];
  others: (SecretDependencyType)[];
};

/** User-specific secret model that are not shared with other users in a workspace. */
export type ConvAiUserSecretDbModel = {
  id: string;
  name: string;
  encrypted_value: string;
  nonce: string;
};

export type ConvAiWebhooks = {
  post_call_webhook_id?: string | null;
  /** List of event types to send via webhook. Options: transcript, audio, call_initiation_failure. */
  events?: (WebhookEventType)[];
  /** Format for transcript webhooks. */
  transcript_format?: WebhookTranscriptFormat;
  /** DEPRECATED: Use 'events' field instead. Whether to send audio data with post-call webhooks for ConvAI conversations */
  send_audio?: boolean | null;
};

export type ConvAiWorkspaceStoredSecretConfig = {
  type: string;
  secret_id: string;
  name: string;
  used_by: ConvAiStoredSecretDependencies;
};

/** Aggregated ASR usage for a conversation (analytics-only, not billing). */
export type ConversationAsrUsageModel = {
  asr_model?: string | null;
  total_transcription_calls?: number;
  total_audio_input_seconds?: number;
};

export type ConversationChargingCommonModel = {
  dev_discount?: boolean;
  is_burst?: boolean;
  tier?: string | null;
  llm_usage?: LlmCategoryUsage;
  llm_price?: number | null;
  llm_charge?: number | null;
  call_charge?: number | null;
  free_minutes_consumed?: number;
  free_llm_dollars_consumed?: number;
  tts_usage?: ConversationTtsUsageModel | null;
  asr_usage?: ConversationAsrUsageModel | null;
};

export type ConversationConfigInput = {
  /** If enabled audio will not be processed and only text will be used, use to avoid audio pricing. */
  text_only?: boolean;
  /** The maximum duration of a conversation in seconds */
  max_duration_seconds?: number;
  /** The events that will be sent to the client */
  client_events?: (ClientEvent)[];
  /** Configuration for file input (image/PDF uploads) during conversations. */
  file_input?: FileInputConfig;
  /** Enable real-time monitoring of conversations via WebSocket */
  monitoring_enabled?: boolean;
  /** The events that will be sent to monitoring connections. */
  monitoring_events?: (ClientEvent)[];
  /** When enabled and knowledge base content is present, the LLM is instructed to report which sources it used. */
  source_attribution?: boolean;
};

export type ConversationConfigOutput = {
  /** If enabled audio will not be processed and only text will be used, use to avoid audio pricing. */
  text_only?: boolean;
  /** The maximum duration of a conversation in seconds */
  max_duration_seconds?: number;
  /** The events that will be sent to the client */
  client_events?: (ClientEvent)[];
  /** Configuration for file input (image/PDF uploads) during conversations. */
  file_input?: FileInputConfig;
  /** Enable real-time monitoring of conversations via WebSocket */
  monitoring_enabled?: boolean;
  /** The events that will be sent to monitoring connections. */
  monitoring_events?: (ClientEvent)[];
  /** When enabled and knowledge base content is present, the LLM is instructed to report which sources it used. */
  source_attribution?: boolean;
};

export type ConversationConfigClientOverrideInput = {
  /** Configuration for conversational transcription */
  asr?: AsrConversationalConfigOverride | null;
  /** Configuration for turn detection */
  turn?: TurnConfigOverride | null;
  /** Configuration for conversational text to speech */
  tts?: TtsConversationalConfigOverride | null;
  /** Configuration for conversational events */
  conversation?: ConversationConfigOverride | null;
  /** Agent specific configuration */
  agent?: AgentConfigOverrideInput | null;
};

export type ConversationConfigClientOverrideOutput = {
  /** Configuration for conversational transcription */
  asr?: AsrConversationalConfigOverride | null;
  /** Configuration for turn detection */
  turn?: TurnConfigOverride | null;
  /** Configuration for conversational text to speech */
  tts?: TtsConversationalConfigOverride | null;
  /** Configuration for conversational events */
  conversation?: ConversationConfigOverride | null;
  /** Agent specific configuration */
  agent?: AgentConfigOverrideOutput | null;
};

export type ConversationConfigClientOverrideConfigInput = {
  /** Configures overrides for nested fields. */
  asr?: AsrConversationalConfigOverrideConfig;
  /** Configures overrides for nested fields. */
  turn?: TurnConfigOverrideConfig;
  /** Configures overrides for nested fields. */
  tts?: TtsConversationalConfigOverrideConfig;
  /** Configures overrides for nested fields. */
  conversation?: ConversationConfigOverrideConfig;
  /** Configures overrides for nested fields. */
  agent?: AgentConfigOverrideConfig;
};

export type ConversationConfigClientOverrideConfigOutput = {
  /** Configures overrides for nested fields. */
  asr?: AsrConversationalConfigOverrideConfig;
  /** Configures overrides for nested fields. */
  turn?: TurnConfigOverrideConfig;
  /** Configures overrides for nested fields. */
  tts?: TtsConversationalConfigOverrideConfig;
  /** Configures overrides for nested fields. */
  conversation?: ConversationConfigOverrideConfig;
  /** Configures overrides for nested fields. */
  agent?: AgentConfigOverrideConfig;
};

export type ConversationConfigOverride = {
  /** If enabled audio will not be processed and only text will be used, use to avoid audio pricing. */
  text_only?: boolean | null;
};

export type ConversationConfigOverrideConfig = {
  /** Whether to allow overriding the text_only field. */
  text_only?: boolean;
};

export type ConversationConfigWorkflowOverrideInput = {
  /** If enabled audio will not be processed and only text will be used, use to avoid audio pricing. */
  text_only?: boolean | null;
  /** The maximum duration of a conversation in seconds */
  max_duration_seconds?: number | null;
  /** The events that will be sent to the client */
  client_events?: (ClientEvent)[] | null;
  /** Configuration for file input (image/PDF uploads) during conversations. */
  file_input?: FileInputConfigWorkflowOverride | null;
  /** Enable real-time monitoring of conversations via WebSocket */
  monitoring_enabled?: boolean | null;
  /** The events that will be sent to monitoring connections. */
  monitoring_events?: (ClientEvent)[] | null;
  /** When enabled and knowledge base content is present, the LLM is instructed to report which sources it used. */
  source_attribution?: boolean | null;
};

export type ConversationConfigWorkflowOverrideOutput = {
  /** If enabled audio will not be processed and only text will be used, use to avoid audio pricing. */
  text_only?: boolean | null;
  /** The maximum duration of a conversation in seconds */
  max_duration_seconds?: number | null;
  /** The events that will be sent to the client */
  client_events?: (ClientEvent)[] | null;
  /** Configuration for file input (image/PDF uploads) during conversations. */
  file_input?: FileInputConfigWorkflowOverride | null;
  /** Enable real-time monitoring of conversations via WebSocket */
  monitoring_enabled?: boolean | null;
  /** The events that will be sent to monitoring connections. */
  monitoring_events?: (ClientEvent)[] | null;
  /** When enabled and knowledge base content is present, the LLM is instructed to report which sources it used. */
  source_attribution?: boolean | null;
};

export type ConversationDeletionSettings = {
  deletion_time_unix_secs?: number | null;
  deleted_logs_at_time_unix_secs?: number | null;
  deleted_audio_at_time_unix_secs?: number | null;
  deleted_transcript_at_time_unix_secs?: number | null;
  delete_transcript_and_pii?: boolean;
  delete_audio?: boolean;
};

export type ConversationFeedbackRequestModel = {
  /** Either 'like' or 'dislike' to indicate the feedback for the conversation. */
  feedback?: UserFeedbackScore | null;
};

export type ConversationFeedbackType = "thumbs" | "rating";

export type ConversationHistoryAnalysisCommonModel = {
  evaluation_criteria_results?: { [key: string]: ConversationHistoryEvaluationCriteriaResultCommonModel | undefined };
  data_collection_results?: { [key: string]: DataCollectionResultCommonModel | undefined };
  evaluation_criteria_results_list?: (ConversationHistoryEvaluationCriteriaResultCommonModel)[];
  data_collection_results_list?: (DataCollectionResultCommonModel)[];
  call_successful: EvaluationSuccessResult;
  transcript_summary: string;
  call_summary_title?: string | null;
  scoped?: (ScopedAnalysisResult)[];
};

export type ConversationHistoryBatchCallModel = {
  batch_call_id: string;
  batch_call_recipient_id: string;
};

export type ConversationHistoryElevenAssistantCommonModel = {
  is_eleven_assistant?: boolean;
};

export type ConversationHistoryErrorCommonModel = {
  code: number;
  reason?: string | null;
};

export type ConversationHistoryEvaluationCriteriaResultCommonModel = {
  criteria_id: string;
  result: EvaluationSuccessResult;
  rationale: string;
};

export type ConversationHistoryExotelPhoneCallModel = {
  direction: TelephonyDirection;
  phone_number_id: string;
  agent_number: string;
  external_number: string;
  type?: string;
  stream_sid: string;
  call_sid: string;
};

export type ConversationHistoryFeedbackCommonModel = {
  type?: ConversationFeedbackType | null;
  overall_score?: UserFeedbackScore | null;
  likes?: number;
  dislikes?: number;
  rating?: number | null;
  comment?: string | null;
};

export type ConversationHistoryMetadataCommonModel = {
  start_time_unix_secs: number;
  accepted_time_unix_secs?: number | null;
  call_duration_secs: number;
  cost?: number | null;
  deletion_settings?: ConversationDeletionSettings;
  feedback?: ConversationHistoryFeedbackCommonModel;
  authorization_method?: AuthorizationMethod;
  charging?: ConversationChargingCommonModel;
  phone_call?: ConversationHistoryTwilioPhoneCallModel | ConversationHistoryExotelPhoneCallModel | ConversationHistorySipTrunkingPhoneCallModel | null;
  batch_call?: ConversationHistoryBatchCallModel | null;
  termination_reason?: string;
  error?: ConversationHistoryErrorCommonModel | null;
  warnings?: (string)[];
  main_language?: string | null;
  rag_usage?: ConversationHistoryRagUsageCommonModel | null;
  text_only?: boolean;
  features_usage?: FeaturesUsageCommonModel;
  eleven_assistant?: ConversationHistoryElevenAssistantCommonModel;
  initiator_id?: string | null;
  conversation_initiation_source?: ConversationInitiationSource;
  conversation_initiation_source_version?: string | null;
  timezone?: string | null;
  async_metadata?: AsyncConversationMetadata | null;
  whatsapp?: WhatsAppConversationInfo | null;
  sms?: SmsConversationInfo | null;
  agent_created_from?: AgentDefinitionSource;
  agent_last_updated_from?: AgentDefinitionSource;
  voice_rewards?: (ConversationVoiceRewardModel)[];
};

/** Represents a message from a multi-voice agent. */
export type ConversationHistoryMultivoiceMessageModel = {
  parts: (ConversationHistoryMultivoiceMessagePartModel)[];
};

/** Represents a single voice part of a multi-voice message. */
export type ConversationHistoryMultivoiceMessagePartModel = {
  text: string;
  voice_label: string | null;
  time_in_call_secs: number | null;
};

export type ConversationHistoryRagUsageCommonModel = {
  usage_count: number;
  embedding_model: string;
};

export type ConversationHistoryRedactionConfig = {
  /** Whether conversation history redaction is enabled */
  enabled?: boolean;
  /** The entities to redact from the conversation transcript, audio and analysis. Use top-level types like 'name', 'email_address', or dot notation for specific subtypes like 'name.full_name'. */
  entities?: (ConfigEntityType)[];
};

export type ConversationHistorySipTrunkingPhoneCallModel = {
  direction: TelephonyDirection;
  phone_number_id: string;
  agent_number: string;
  external_number: string;
  type: string;
  call_id?: string | null;
  call_sid: string;
  sip_header_dynamic_variables?: { [key: string]: string | undefined };
};

export type ConversationHistoryTranscriptApiIntegrationWebhookToolsResultCommonModelInput = {
  request_id: string;
  tool_name: string;
  result_value: string;
  is_error: boolean;
  is_blocked?: boolean;
  tool_has_been_called: boolean;
  tool_latency_secs?: number;
  error_type?: string;
  raw_error_message?: string;
  dynamic_variable_updates?: (DynamicVariableUpdateCommonModel)[];
  type: string;
  integration_id?: string;
  credential_id?: string;
  integration_connection_id?: string;
};

export type ConversationHistoryTranscriptApiIntegrationWebhookToolsResultCommonModelOutput = {
  request_id: string;
  tool_name: string;
  result_value: string;
  is_error: boolean;
  is_blocked: boolean;
  tool_has_been_called: boolean;
  tool_latency_secs: number;
  error_type: string;
  raw_error_message: string;
  dynamic_variable_updates: (DynamicVariableUpdateCommonModel)[];
  type: string;
  integration_id: string;
  credential_id: string;
  integration_connection_id: string;
};

export type ConversationHistoryTranscriptCommonModelInput = {
  role: "user" | "agent";
  agent_metadata?: AgentMetadata | null;
  message?: string | null;
  multivoice_message?: ConversationHistoryMultivoiceMessageModel | null;
  tool_calls?: (ConversationHistoryTranscriptToolCallCommonModelInput)[];
  tool_results?: (ConversationHistoryTranscriptOtherToolsResultCommonModel | ConversationHistoryTranscriptSystemToolResultCommonModelInput | ConversationHistoryTranscriptApiIntegrationWebhookToolsResultCommonModelInput | ConversationHistoryTranscriptWorkflowToolsResultCommonModelInput)[];
  feedback?: UserFeedback | null;
  llm_override?: string | null;
  time_in_call_secs: number;
  conversation_turn_metrics?: ConversationTurnMetrics | null;
  rag_retrieval_info?: RagRetrievalInfo | null;
  llm_usage?: LlmUsageInput | null;
  interrupted?: boolean;
  original_message?: string | null;
  source_medium?: ChatSourceMedium | null;
  source_event_id?: number | null;
  used_static_kb_document_ids?: (string)[];
};

export type ConversationHistoryTranscriptCommonModelOutput = {
  role: "user" | "agent";
  agent_metadata?: AgentMetadata | null;
  message?: string | null;
  multivoice_message?: ConversationHistoryMultivoiceMessageModel | null;
  tool_calls?: (ConversationHistoryTranscriptToolCallCommonModelOutput)[];
  tool_results?: (ConversationHistoryTranscriptOtherToolsResultCommonModel | ConversationHistoryTranscriptSystemToolResultCommonModelOutput | ConversationHistoryTranscriptApiIntegrationWebhookToolsResultCommonModelOutput | ConversationHistoryTranscriptWorkflowToolsResultCommonModelOutput)[];
  feedback?: UserFeedback | null;
  llm_override?: string | null;
  time_in_call_secs: number;
  conversation_turn_metrics?: ConversationTurnMetrics | null;
  rag_retrieval_info?: RagRetrievalInfo | null;
  llm_usage?: LlmUsageOutput | null;
  interrupted?: boolean;
  original_message?: string | null;
  source_medium?: ChatSourceMedium | null;
  source_event_id?: number | null;
  used_static_kb_document_ids?: (string)[];
};

export type ConversationHistoryTranscriptFileInputResponseModel = {
  file_id: string;
  original_filename: string;
  mime_type: string;
  file_url: string;
};

export type ConversationHistoryTranscriptOtherToolsResultCommonModel = {
  request_id: string;
  tool_name: string;
  result_value: string;
  is_error: boolean;
  is_blocked?: boolean;
  tool_has_been_called: boolean;
  tool_latency_secs?: number;
  error_type?: string;
  raw_error_message?: string;
  dynamic_variable_updates?: (DynamicVariableUpdateCommonModel)[];
  type?: "client" | "webhook" | "mcp" | "code" | null;
};

export type ConversationHistoryTranscriptResponseModel = {
  role: "user" | "agent";
  agent_metadata?: AgentMetadata | null;
  message?: string | null;
  multivoice_message?: ConversationHistoryMultivoiceMessageModel | null;
  tool_calls?: (ConversationHistoryTranscriptToolCallCommonModelOutput)[];
  tool_results?: (ConversationHistoryTranscriptOtherToolsResultCommonModel | ConversationHistoryTranscriptSystemToolResultCommonModelOutput | ConversationHistoryTranscriptApiIntegrationWebhookToolsResultCommonModelOutput | ConversationHistoryTranscriptWorkflowToolsResultCommonModelOutput)[];
  feedback?: UserFeedback | null;
  llm_override?: string | null;
  time_in_call_secs: number;
  conversation_turn_metrics?: ConversationTurnMetrics | null;
  rag_retrieval_info?: RagRetrievalInfo | null;
  llm_usage?: LlmUsageOutput | null;
  interrupted?: boolean;
  original_message?: string | null;
  source_medium?: ChatSourceMedium | null;
  source_event_id?: number | null;
  used_static_kb_document_ids?: (string)[];
  file_input?: ConversationHistoryTranscriptFileInputResponseModel | null;
  contextual_update_info?: ContextualUpdateInfo | null;
};

export type ConversationHistoryTranscriptSystemToolResultCommonModelInput = {
  request_id: string;
  tool_name: string;
  result_value: string;
  is_error: boolean;
  is_blocked?: boolean;
  tool_has_been_called: boolean;
  tool_latency_secs?: number;
  error_type?: string;
  raw_error_message?: string;
  dynamic_variable_updates?: (DynamicVariableUpdateCommonModel)[];
  type: string;
  result?: EndCallToolResultModel | LanguageDetectionToolResultModel | TransferToAgentToolResultSuccessModel | TransferToAgentToolResultErrorModel | TransferToNumberResultTwilioSuccessModel | TransferToNumberResultSipSuccessModel | TransferToNumberResultExotelSuccessModel | TransferToNumberResultErrorModel | SkipTurnToolResponseModel | PlayDtmfResultSuccessModel | PlayDtmfResultErrorModel | VoiceMailDetectionResultSuccessModel | TestToolResultModel | KnowledgeBaseRagToolResultModel | null;
};

export type ConversationHistoryTranscriptSystemToolResultCommonModelOutput = {
  request_id: string;
  tool_name: string;
  result_value: string;
  is_error: boolean;
  is_blocked?: boolean;
  tool_has_been_called: boolean;
  tool_latency_secs?: number;
  error_type?: string;
  raw_error_message?: string;
  dynamic_variable_updates?: (DynamicVariableUpdateCommonModel)[];
  type: string;
  result?: EndCallToolResultModel | LanguageDetectionToolResultModel | TransferToAgentToolResultSuccessModel | TransferToAgentToolResultErrorModel | TransferToNumberResultTwilioSuccessModel | TransferToNumberResultSipSuccessModel | TransferToNumberResultExotelSuccessModel | TransferToNumberResultErrorModel | SkipTurnToolResponseModel | PlayDtmfResultSuccessModel | PlayDtmfResultErrorModel | VoiceMailDetectionResultSuccessModel | TestToolResultModel | KnowledgeBaseRagToolResultModel | null;
};

export type ConversationHistoryTranscriptToolCallApiIntegrationWebhookDetailsInput = {
  type?: string;
  integration_id?: string;
  credential_id?: string;
  integration_connection_id?: string;
  webhook_details: ConversationHistoryTranscriptToolCallWebhookDetails;
};

export type ConversationHistoryTranscriptToolCallApiIntegrationWebhookDetailsOutput = {
  type: string;
  integration_id: string;
  credential_id: string;
  integration_connection_id: string;
  webhook_details: ConversationHistoryTranscriptToolCallWebhookDetails;
};

export type ConversationHistoryTranscriptToolCallClientDetails = {
  type?: string;
  parameters: string;
};

export type ConversationHistoryTranscriptToolCallCommonModelInput = {
  type?: ToolType | null;
  request_id: string;
  tool_name: string;
  params_as_json: string;
  tool_has_been_called: boolean;
  tool_details?: ConversationHistoryTranscriptToolCallWebhookDetails | ConversationHistoryTranscriptToolCallClientDetails | ConversationHistoryTranscriptToolCallMcpDetails | ConversationHistoryTranscriptToolCallApiIntegrationWebhookDetailsInput | null;
};

export type ConversationHistoryTranscriptToolCallCommonModelOutput = {
  type?: ToolType | null;
  request_id: string;
  tool_name: string;
  params_as_json: string;
  tool_has_been_called: boolean;
  tool_details?: ConversationHistoryTranscriptToolCallWebhookDetails | ConversationHistoryTranscriptToolCallClientDetails | ConversationHistoryTranscriptToolCallMcpDetails | ConversationHistoryTranscriptToolCallApiIntegrationWebhookDetailsOutput | null;
};

export type ConversationHistoryTranscriptToolCallMcpDetails = {
  type?: string;
  mcp_server_id: string;
  mcp_server_name: string;
  integration_type: string;
  parameters?: { [key: string]: string | undefined };
  approval_policy: string;
  requires_approval?: boolean;
  mcp_tool_name?: string;
  mcp_tool_description?: string;
};

export type ConversationHistoryTranscriptToolCallWebhookDetails = {
  type?: string;
  method: string;
  url: string;
  headers?: { [key: string]: string | undefined };
  path_params?: { [key: string]: string | undefined };
  query_params?: { [key: string]: string | undefined };
  body?: string | null;
};

export type ConversationHistoryTranscriptWorkflowToolsResultCommonModelInput = {
  request_id: string;
  tool_name: string;
  result_value: string;
  is_error: boolean;
  is_blocked?: boolean;
  tool_has_been_called: boolean;
  tool_latency_secs?: number;
  error_type?: string;
  raw_error_message?: string;
  dynamic_variable_updates?: (DynamicVariableUpdateCommonModel)[];
  type: string;
  result?: WorkflowToolResponseModelInput | null;
};

export type ConversationHistoryTranscriptWorkflowToolsResultCommonModelOutput = {
  request_id: string;
  tool_name: string;
  result_value: string;
  is_error: boolean;
  is_blocked?: boolean;
  tool_has_been_called: boolean;
  tool_latency_secs?: number;
  error_type?: string;
  raw_error_message?: string;
  dynamic_variable_updates?: (DynamicVariableUpdateCommonModel)[];
  type: string;
  result?: WorkflowToolResponseModelOutput | null;
};

export type ConversationHistoryTwilioPhoneCallModel = {
  direction: TelephonyDirection;
  phone_number_id: string;
  agent_number: string;
  external_number: string;
  type: string;
  stream_sid: string;
  call_sid: string;
};

export type ConversationInitiationClientDataConfigInput = {
  /** Overrides for the conversation configuration */
  conversation_config_override?: ConversationConfigClientOverrideConfigInput;
  /** Whether to include custom LLM extra body */
  custom_llm_extra_body?: boolean;
  /** Whether to enable conversation initiation client data from webhooks */
  enable_conversation_initiation_client_data_from_webhook?: boolean;
  /** Whether clients may pass starting_workflow_node_id in initiation client data; if false, sending it fails conversation start. */
  enable_starting_workflow_node_id_from_client?: boolean;
};

export type ConversationInitiationClientDataConfigOutput = {
  /** Overrides for the conversation configuration */
  conversation_config_override?: ConversationConfigClientOverrideConfigOutput;
  /** Whether to include custom LLM extra body */
  custom_llm_extra_body?: boolean;
  /** Whether to enable conversation initiation client data from webhooks */
  enable_conversation_initiation_client_data_from_webhook?: boolean;
  /** Whether clients may pass starting_workflow_node_id in initiation client data; if false, sending it fails conversation start. */
  enable_starting_workflow_node_id_from_client?: boolean;
};

export type ConversationInitiationClientDataInternal = {
  conversation_config_override?: ConversationConfigClientOverrideOutput;
  custom_llm_extra_body?: { [key: string]: unknown };
  /** ID of the end user participating in this conversation (for agent owner's user identification) */
  user_id?: string | null;
  source_info?: ConversationInitiationSourceInfo;
  /** ID of the agent branch to use for this conversation */
  branch_id?: string | null;
  /** Environment to use for resolving environment variables */
  environment?: string | null;
  /** If set, start the workflow at this node id instead of the default entry */
  starting_workflow_node_id?: string | null;
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeOutput | undefined };
  /** Configuration for which tools to mock and fallback behavior */
  tool_mock_config?: OrchestratorToolMockBehaviorConfig;
};

export type ConversationInitiationClientDataRequestInput = {
  conversation_config_override?: ConversationConfigClientOverrideInput;
  custom_llm_extra_body?: { [key: string]: unknown };
  /** ID of the end user participating in this conversation (for agent owner's user identification) */
  user_id?: string | null;
  source_info?: ConversationInitiationSourceInfo;
  /** ID of the agent branch to use for this conversation */
  branch_id?: string | null;
  /** Environment to use for resolving environment variables */
  environment?: string | null;
  /** If set, start the workflow at this node id instead of the default entry */
  starting_workflow_node_id?: string | null;
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeInput | undefined };
};

export type ConversationInitiationClientDataRequestOutput = {
  conversation_config_override?: ConversationConfigClientOverrideOutput;
  custom_llm_extra_body?: { [key: string]: unknown };
  /** ID of the end user participating in this conversation (for agent owner's user identification) */
  user_id?: string | null;
  source_info?: ConversationInitiationSourceInfo;
  /** ID of the agent branch to use for this conversation */
  branch_id?: string | null;
  /** Environment to use for resolving environment variables */
  environment?: string | null;
  /** If set, start the workflow at this node id instead of the default entry */
  starting_workflow_node_id?: string | null;
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeOutput | undefined };
};

export type ConversationInitiationClientDataWebhook = {
  /** The URL to send the webhook to */
  url: string;
  /** The headers to send with the webhook request */
  request_headers: { [key: string]: string | ConvAiSecretLocator | undefined };
};

/** Enum representing the possible sources for conversation initiation. */
export type ConversationInitiationSource = "unknown" | "android_sdk" | "node_js_sdk" | "react_native_sdk" | "react_sdk" | "js_sdk" | "python_sdk" | "widget" | "sip_trunk" | "twilio" | "exotel" | "genesys" | "swift_sdk" | "whatsapp" | "twilio_sms" | "flutter_sdk" | "zendesk_integration" | "slack_integration" | "telegram_integration" | "intercom_integration" | "freshdesk_integration" | "template_preview" | "genesys_bot_connector";

/** Information about the source of conversation initiation */
export type ConversationInitiationSourceInfo = {
  /** Source of the conversation initiation */
  source?: ConversationInitiationSource | null;
  /** The SDK version number */
  version?: string | null;
};

export type ConversationSentimentAnalysis = {
  overall_label: "positive" | "neutral" | "negative";
  overall_sentiment_score: number;
  overall_frustration_score: number;
  min_user_sentiment_score: number;
  max_user_frustration_score: number;
  num_scored_user_turns: number;
};

export type ConversationSignedUrlResponseModel = {
  signed_url: string;
};

/** A specification that will be used to simulate a conversation between an agent and an AI user. */
export type ConversationSimulationSpecification = {
  simulated_user_config: AgentConfigApiModelInput;
  tool_mock_config?: { [key: string]: ToolMockConfig | undefined };
  /** A partial conversation history to start the simulation from. If empty, simulation starts fresh. */
  partial_conversation_history?: (ConversationHistoryTranscriptCommonModelInput)[];
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeInput | undefined };
};

export type ConversationSource = {
  type?: string;
  conversation_id: string;
};

export type ConversationSummaryResponseModel = {
  agent_id: string;
  branch_id?: string | null;
  version_id?: string | null;
  agent_name?: string | null;
  conversation_id: string;
  start_time_unix_secs: number;
  call_duration_secs: number;
  message_count: number;
  status: "initiated" | "in-progress" | "processing" | "done" | "failed";
  termination_reason?: string;
  call_successful: EvaluationSuccessResult;
  transcript_summary?: string | null;
  call_summary_title?: string | null;
  main_language?: string | null;
  conversation_initiation_source?: ConversationInitiationSource | null;
  tool_names?: (string)[] | null;
  direction?: TelephonyDirection | null;
  rating?: number | null;
};

/** Aggregated TTS usage for a conversation (analytics-only, not billing). */
export type ConversationTtsUsageModel = {
  primary_tts_model?: string | null;
  total_audio_output_seconds?: number;
  total_characters?: number;
  per_voice_usage?: (ConversationVoiceUsageModel)[];
};

export type ConversationTagResponseModel = {
  tag_id: string;
  workspace_id: string;
  owner_user_id: string;
  title: string;
  description: string | null;
  created_at_unix_secs: number;
};

export type ConversationTokenPurpose = "signed_url" | "shareable_link";

export type ConversationTokenResponseModel = {
  /** The ID of the agent */
  agent_id: string;
  /** The token for the agent */
  conversation_token: string;
  /** The expiration time of the token in unix seconds */
  expiration_time_unix_secs?: number | null;
  /** The ID of the conversation */
  conversation_id?: string | null;
  /** The purpose of the token */
  purpose: ConversationTokenPurpose;
  /** The user ID of the entity who requested the token */
  token_requester_user_id?: string | null;
};

export type ConversationTurnMetrics = {
  metrics?: { [key: string]: MetricRecord | undefined };
  convai_asr_provider?: string | null;
  convai_tts_model?: string | null;
  convai_tts_cascade?: string | null;
};

export type ConversationUserResponseModel = {
  user_id: string;
  last_contact_unix_secs: number;
  first_contact_unix_secs: number;
  conversation_count: number;
  last_contact_agent_id?: string | null;
  last_contact_conversation_id: string;
  last_contact_agent_name?: string | null;
};

export type ConversationVoiceRewardModel = {
  voice_id: string;
  reward_usd_cents: number;
};

export type ConversationVoiceUsageModel = {
  voice_id: string;
  audio_output_seconds?: number;
};

export type ConversationalConfigApiModelInput = {
  /** Configuration for conversational transcription */
  asr?: AsrConversationalConfig;
  /** Configuration for turn detection */
  turn?: TurnConfig;
  /** Configuration for conversational text to speech */
  tts?: TtsConversationalConfigInput;
  /** Configuration for conversational events */
  conversation?: ConversationConfigInput;
  /** Language presets for conversations */
  language_presets?: { [key: string]: LanguagePresetInput | undefined };
  /** Configuration for voice activity detection */
  vad?: VadConfig;
  /** Agent specific configuration */
  agent?: AgentConfigApiModelInput;
};

export type ConversationalConfigApiModelOutput = {
  /** Configuration for conversational transcription */
  asr?: AsrConversationalConfig;
  /** Configuration for turn detection */
  turn?: TurnConfig;
  /** Configuration for conversational text to speech */
  tts?: TtsConversationalConfigOutput;
  /** Configuration for conversational events */
  conversation?: ConversationConfigOutput;
  /** Language presets for conversations */
  language_presets?: { [key: string]: LanguagePresetOutput | undefined };
  /** Configuration for voice activity detection */
  vad?: VadConfig;
  /** Agent specific configuration */
  agent?: AgentConfigApiModelOutput;
};

export type ConversationalConfigApiModelWorkflowOverrideInput = {
  /** Configuration for conversational transcription */
  asr?: AsrConversationalConfigWorkflowOverride | null;
  /** Configuration for turn detection */
  turn?: TurnConfigWorkflowOverride | null;
  /** Configuration for conversational text to speech */
  tts?: TtsConversationalConfigWorkflowOverrideInput | null;
  /** Configuration for conversational events */
  conversation?: ConversationConfigWorkflowOverrideInput | null;
  /** Language presets for conversations */
  language_presets?: { [key: string]: LanguagePresetInput | undefined } | null;
  /** Configuration for voice activity detection */
  vad?: VadConfigWorkflowOverride | null;
  /** Agent specific configuration */
  agent?: AgentConfigApiModelWorkflowOverrideInput | null;
};

export type ConversationalConfigApiModelWorkflowOverrideOutput = {
  /** Configuration for conversational transcription */
  asr?: AsrConversationalConfigWorkflowOverride | null;
  /** Configuration for turn detection */
  turn?: TurnConfigWorkflowOverride | null;
  /** Configuration for conversational text to speech */
  tts?: TtsConversationalConfigWorkflowOverrideOutput | null;
  /** Configuration for conversational events */
  conversation?: ConversationConfigWorkflowOverrideOutput | null;
  /** Language presets for conversations */
  language_presets?: { [key: string]: LanguagePresetOutput | undefined } | null;
  /** Configuration for voice activity detection */
  vad?: VadConfigWorkflowOverride | null;
  /** Agent specific configuration */
  agent?: AgentConfigApiModelWorkflowOverrideOutput | null;
};

export type ConvertChapterResponseModel = {
  /** The status of the studio chapter conversion request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type ConvertProjectResponseModel = {
  /** The status of the studio project conversion request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type CreateAgentBranchResponseModel = {
  /** ID of the created branch */
  created_branch_id: string;
  /** ID of the first version on the created branch */
  created_version_id: string;
};

export type CreateAgentResponseModel = {
  /** ID of the created agent */
  agent_id: string;
};

export type CreateAgentRuleParams = {
  smb_tool_type?: string;
};

export type CreateAgentTestFolderResponseModel = {
  id: string;
  name: string;
};

export type CreateAgentTestResponseModel = {
  id: string;
};

export type CreateAssetParams = {
  smb_tool_type?: string;
};

export type CreateAuthConnectionEnvironmentVariableRequest = {
  type: string;
  /** Unique label for the environment variable. */
  label: string;
  /** Environment-specific auth connection references. Must include 'production' key. */
  values: { [key: string]: EnvironmentVariableAuthConnectionValueRequest | undefined };
};

/** Request model for creating Basic Auth connections - inherits common settings and includes sensitive fields */
export type CreateBasicAuthRequest = {
  name: string;
  auth_type?: string;
  provider: string;
  username: string;
  password: string;
};

/** Request model for creating Bearer Auth connections - inherits common settings and includes sensitive fields */
export type CreateBearerAuthRequest = {
  name: string;
  auth_type?: string;
  provider: string;
  token: string;
};

export type CreateClientAppointmentParams = {
  smb_tool_type?: string;
};

export type CreateClientInteractionParams = {
  smb_tool_type?: string;
};

/** Create a new client in the system. */
export type CreateClientParams = {
  smb_tool_type?: string;
};

export type CreateConversationTagRequestModel = {
  /** Display title of the tag. */
  title: string;
  /** Optional free-text description. */
  description?: string | null;
};

export type CreateCustomHeaderAuthRequest = {
  name: string;
  auth_type?: string;
  provider: string;
  /** The name of the header to use for authentication (e.g., 'x-api-key') */
  header_name: string;
  token: string;
};

export type CreateExotelPhoneNumberRequest = {
  /** Phone number */
  phone_number: string;
  /** Label for the phone number */
  label: string;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports inbound calls */
  supports_inbound?: boolean;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports outbound calls */
  supports_outbound?: boolean;
  provider?: string;
  /** Exotel Account SID */
  account_sid: string;
  /** Exotel API Key */
  api_key: string;
  /** Exotel API Token */
  api_token: string;
  /** Exotel region-specific API host */
  api_subdomain: ExotelApiSubdomain;
  /** Exotel applet identifier used in Calls/connect */
  app_id: string;
  /** Optional full applet URL override. Defaults to Exotel start_voice URL derived from account SID and app ID. */
  applet_url?: string | null;
};

export type CreateHolidayParams = {
  smb_tool_type?: string;
};

export type CreateLocationParams = {
  smb_tool_type?: string;
};

/** Request model for creating mTLS auth connections. */
export type CreateMtlsAuthRequest = {
  name: string;
  auth_type?: string;
  provider: string;
  client_certificate: string;
  client_key: string;
  ca_certificate?: string | null;
  key_passphrase?: string | null;
};

/** Request model for creating auth connections - inherits common settings and includes sensitive fields */
export type CreateOAuth2ClientCredsRequest = {
  name: string;
  auth_type?: string;
  provider: string;
  client_id: string;
  token_url: string;
  scopes?: (string)[];
  extra_params?: { [key: string]: string | undefined };
  /** If True, send client credentials in Authorization header as Basic Auth instead of request body */
  basic_auth_in_header?: boolean;
  client_secret: string;
  custom_headers?: { [key: string]: string | undefined };
};

/** Request model for creating OAuth2 JWT auth connections - inherits common settings and includes sensitive fields */
export type CreateOAuth2JwtRequest = {
  name: string;
  auth_type?: string;
  provider: string;
  /** JWT signing algorithm */
  algorithm?: "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512";
  /** Key ID (kid) for JWT header - useful for key rotation */
  key_id?: string | null;
  /** JWT issuer (iss claim) */
  issuer: string;
  /** JWT audience (aud claim) */
  audience: string;
  /** JWT subject (sub claim) */
  subject: string;
  /** Token expiration time in seconds */
  expiration_seconds?: number;
  /** Additional custom claims to include in the JWT */
  extra_params?: { [key: string]: string | undefined };
  /** Token endpoint URL for exchanging JWT for access token */
  token_url: string;
  /** OAuth2 scopes to request when exchanging JWT for access token */
  scopes?: (string)[];
  /** Token field to extract from the token endpoint response. */
  token_response_field?: "access_token" | "id_token";
  secret_key: string;
};

export type CreateOrderRequest = {
  /** When true, creates a sandbox order that auto-progresses without producer intervention. */
  sandbox?: boolean;
};

export type CreateOrderResponse = {
  /** The ID of the newly created order. */
  order_id: OrderId;
  /** Whether this is a sandbox order. */
  sandbox?: boolean;
};

export type CreatePhoneNumberResponseModel = {
  /** Phone entity ID */
  phone_number_id: string;
};

/** Request model for creating Private Key JWT auth connections - inherits common settings and includes sensitive fields */
export type CreatePrivateKeyJwtRequest = {
  name: string;
  auth_type?: string;
  provider: string;
  /** JWT signing algorithm */
  algorithm?: "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512";
  /** Key ID (kid) for JWT header - useful for key rotation */
  key_id?: string | null;
  /** JWT issuer (iss claim) */
  issuer: string;
  /** JWT audience (aud claim) */
  audience: string;
  /** JWT subject (sub claim) */
  subject: string;
  /** Token expiration time in seconds */
  expiration_seconds?: number;
  /** Additional custom claims to include in the JWT */
  extra_params?: { [key: string]: string | undefined };
  secret_key: string;
};

export type CreateProductParams = {
  smb_tool_type?: string;
};

export type CreatePronunciationDictionaryResponseModel = {
  /** The status of the create pronunciation dictionary request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type CreateResponseUnitTestRequest = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataInput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeInput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelInput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** A prompt that evaluates whether the agent's response is successful. Should return True or False. */
  success_condition?: string;
  /** Non-empty list of example responses that should be considered successful */
  success_examples?: (AgentSuccessfulResponseExample)[];
  /** Non-empty list of example responses that should be considered failures */
  failure_examples?: (AgentFailureResponseExample)[];
  name: string;
  /** The ID of the parent folder. If not provided, the test will be created at the root level. */
  parent_folder_id?: string | null;
};

export type CreateSipTrunkPhoneNumberRequestV2 = {
  /** Phone number */
  phone_number: string;
  /** Label for the phone number */
  label: string;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports inbound calls */
  supports_inbound?: boolean;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports outbound calls */
  supports_outbound?: boolean;
  provider?: string;
  inbound_trunk_config?: InboundSipTrunkConfigRequestModel | null;
  outbound_trunk_config?: OutboundSipTrunkConfigRequestModel | null;
};

export type CreateSecretEnvironmentVariableRequest = {
  type: string;
  /** Unique label for the environment variable. */
  label: string;
  /** Environment-specific secret references. Must include 'production' key. */
  values: { [key: string]: EnvironmentVariableSecretValueRequest | undefined };
};

/** Create a new service (classic, rental, or group) in the system. */
export type CreateServiceParams = {
  smb_tool_type?: string;
};

export type CreateSimulationTestRequest = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataInput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeInput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelInput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** A prompt that evaluates whether the agent's response is successful. Should return True or False. */
  success_condition?: string;
  /** Description of the simulation scenario and user persona for simulation tests. */
  simulation_scenario?: string;
  /** Maximum number of conversation turns for simulation tests. */
  simulation_max_turns?: number;
  /** The environment to use when running this simulation test. If not provided, defaults to 'production'. */
  simulation_environment?: string | null;
  /** Configuration for which tools to mock and fallback behavior. */
  tool_mock_config?: SimulationToolMockBehaviorConfig;
  /** LLM model to use for evaluating simulation results. Defaults to Claude Sonnet 4.6. */
  evaluation_model?: Llm | null;
  /** LLM model for the simulated user. Defaults to Claude Sonnet 4.6. */
  simulated_user_model?: Llm | null;
  name: string;
  /** The ID of the parent folder. If not provided, the test will be created at the root level. */
  parent_folder_id?: string | null;
};

export type CreateSpeechEngineRequest = {
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
};

/** Create a new staff member in the system. */
export type CreateStaffParams = {
  smb_tool_type?: string;
};

export type CreateStringEnvironmentVariableRequest = {
  type: string;
  /** Unique label for the environment variable. */
  label: string;
  /** Environment-specific values. Must include 'production' key. */
  values: { [key: string]: string | undefined };
};

export type CreateToolCallUnitTestRequest = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataInput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeInput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelInput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** How to evaluate the agent's tool call (if any). If empty, the tool call is not evaluated. */
  tool_call_parameters?: UnitTestToolCallEvaluationModelInput | null;
  /** If set to True this test will pass if any tool call returned by the LLM matches the criteria. Otherwise it will fail if more than one tool is returned by the agent. */
  check_any_tool_matches?: boolean | null;
  name: string;
  /** The ID of the parent folder. If not provided, the test will be created at the root level. */
  parent_folder_id?: string | null;
};

export type CreateTwilioPhoneNumberRequest = {
  /** Phone number */
  phone_number: string;
  /** Label for the phone number */
  label: string;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports inbound calls */
  supports_inbound?: boolean;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports outbound calls */
  supports_outbound?: boolean;
  provider?: string;
  /** Twilio Account SID */
  sid: string;
  /** Twilio Auth Token */
  token: string;
  /** Twilio Additional Region Configuration */
  region_config?: RegionConfigRequest | null;
};

export type CueOptionsRequest = {
  /** Minimum duration of each cue in milliseconds. */
  min_duration_ms?: number;
  /** Maximum duration of each cue in milliseconds. */
  max_duration_ms?: number;
  /** Maximum number of lines per cue. */
  max_lines_per_cue?: number;
  /** Maximum number of characters per line in a cue. */
  max_chars_per_line?: number;
  /** Maximum characters per second reading speed. If not set, no reading speed limit is applied. */
  max_chars_per_s?: number | null;
  /** Minimum gap between consecutive cues in frames. If not set, no minimum gap is enforced. */
  min_gap_between_cues_frames?: number | null;
};

export type Currency = "usd" | "eur" | "inr" | "pln";

/** Container for custom guardrails, matching ModerationGuardrail pattern */
export type CustomGuardrailInput = {
  config?: CustomGuardrailsConfigInput;
};

/** Container for custom guardrails, matching ModerationGuardrail pattern */
export type CustomGuardrailOutput = {
  config?: CustomGuardrailsConfigOutput;
};

/** Single custom guardrail configuration */
export type CustomGuardrailConfig = {
  is_enabled?: boolean;
  /** User-facing name for this guardrail */
  name: string;
  /** Instruction describing what to block, e.g. 'don't talk about politics' */
  prompt: string;
  execution_mode?: GuardrailExecutionMode;
  trigger_action?: EndCallTriggerAction | RetryTriggerAction;
};

/** Config container for custom guardrails list */
export type CustomGuardrailsConfigInput = {
  configs?: (CustomGuardrailConfig)[];
};

/** Config container for custom guardrails list */
export type CustomGuardrailsConfigOutput = {
  configs?: (CustomGuardrailConfig)[];
};

/** Response model for Custom Header Auth auth connections */
export type CustomHeaderAuthResponse = {
  name: string;
  auth_type?: string;
  provider: string;
  /** The name of the header to use for authentication (e.g., 'x-api-key') */
  header_name: string;
  id: string;
  used_by?: AuthConnectionDependencies | null;
};

export type CustomLlm = {
  /** The URL of the Chat Completions compatible endpoint */
  url: string;
  /** The model ID to be used if URL serves multiple models */
  model_id?: string | null;
  /** The API key for authentication. Either a workspace secret reference {'secret_id': '...'} or an environment variable reference {'env_var_label': '...'}. */
  api_key?: ConvAiSecretLocator | ConvAiEnvVarLocator | null;
  /** Optional workspace auth connection for authentication. Only auth connections that produce an Authorization Bearer token are supported; Basic auth, mTLS, custom header, and URL secret auth connections are not supported. */
  auth_connection?: AuthConnectionLocator | EnvironmentAuthConnectionLocator | null;
  /** Headers that should be included in the request */
  request_headers?: { [key: string]: string | ConvAiSecretLocator | ConvAiDynamicVariable | ConvAiEnvVarLocator | undefined };
  /** The API version to use for the request */
  api_version?: string | null;
  /** The API type to use (chat_completions or responses) */
  api_type?: CustomLlmapiType;
};

export type CustomLlmapiType = "chat_completions" | "responses";

/** Custom SIP header for phone transfers with a static (validated) value. */
export type CustomSipHeader = {
  type?: string;
  /** The SIP header name (e.g., 'X-Customer-ID') */
  key: string;
  /** The header value */
  value: string;
};

/** Custom SIP header for phone transfers with a dynamic variable reference. The value is a variable name that will be resolved at runtime. Value is not validated here since it will be substituted with actual value later. */
export type CustomSipHeaderWithDynamicVariable = {
  type: string;
  /** The SIP header name (e.g., 'X-Customer-ID') */
  key: string;
  /** The dynamic variable name to resolve */
  value: string;
};

/** Configuration for DTMF (keypad) input collection during phone calls. */
export type DtmfInputConfig = {
  /** Timeout in seconds to wait for additional DTMF digits */
  dtmf_input_timeout?: number;
  /** If true, pressing # immediately completes DTMF input */
  hash_terminator?: boolean;
};

export type DashboardCallSuccessChartModel = {
  name: string;
  type?: string;
};

export type DashboardCriteriaChartModel = {
  name: string;
  type?: string;
  criteria_id: string;
};

export type DashboardDataCollectionChartModel = {
  name: string;
  type?: string;
  data_collection_id: string;
};

export type DataCollectionResultCommonModel = {
  data_collection_id: string;
  value?: unknown;
  json_schema?: LiteralJsonSchemaProperty | null;
  rationale: string;
};

export type DefaultSharingGroupResponseModel = {
  /** The group to share with by default */
  group: WorkspaceGroupResponseModel;
  /** The permission level to grant to the group */
  permission_level: "admin" | "editor" | "viewer";
};

export type DeleteAgentRuleParams = {
  smb_tool_type?: string;
};

export type DeleteAssetParams = {
  smb_tool_type?: string;
};

/** Permanently remove a previously-cancelled calendar event.  This delete tool is the irreversible follow-up to cancel_calendar_event. The backend rejects the call (422) if the event hasn't been cancelled yet, so the only safe path is cancel-then-delete. */
export type DeleteCalendarEventParams = {
  smb_tool_type?: string;
};

export type DeleteChapterResponseModel = {
  /** The status of the studio chapter deletion request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type DeleteClientInteractionParams = {
  smb_tool_type?: string;
};

/** Delete a client, cascading deletion of all their appointments first. */
export type DeleteClientParams = {
  smb_tool_type?: string;
};

export type DeleteDubbingResponseModel = {
  /** The status of the dubbing project. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

/** Permanently remove a previously-cancelled group session.  Group analogue of ``delete_calendar_event``: cancel (``cancel_group_session_for_all``) is the soft, history-preserving step; this tool is the irreversible follow-up that drops the row from Mongo and the staff Google Calendar entirely. The backend rejects the call (422) if the session hasn't been cancelled yet, so the only safe path is cancel-then-delete. */
export type DeleteGroupSessionParams = {
  smb_tool_type?: string;
};

export type DeleteHistoryItemResponse = {
  /** The status of the deletion request. If the request was successful, the status will be 'ok'. Otherwise an error message with http code 500 will be returned. */
  status: string;
};

export type DeleteHolidayParams = {
  smb_tool_type?: string;
};

export type DeleteLocationParams = {
  smb_tool_type?: string;
};

export type DeleteProductParams = {
  smb_tool_type?: string;
};

export type DeleteProjectResponseModel = {
  /** The status of the studio project deletion request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type DeleteSampleResponseModel = {
  /** The status of the sample deletion request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

/** Delete an existing service from the system. */
export type DeleteServiceParams = {
  smb_tool_type?: string;
};

/** Delete an existing staff member from the system. */
export type DeleteStaffParams = {
  smb_tool_type?: string;
};

export type DeleteVoiceResponseModel = {
  /** The status of the voice deletion request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type DeleteVoiceSampleResponseModel = {
  /** The status of the voice sample deletion request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type DeleteWorkspaceGroupMemberResponseModel = {
  /** The status of the workspace group member deletion request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type DeleteWorkspaceInviteResponseModel = {
  /** The status of the workspace invite deletion request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type DeleteWorkspaceWebhookResponseModel = {
  /** The status of the workspace webhook deletion request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type DeliverableInfo = {
  /** A time-limited URL to download the delivered file. */
  signed_url: string;
  /** The MIME type of the delivered file (e.g. 'video/mp4'). */
  content_type: string;
  /** The name of the delivered file. */
  name: string;
  /** The version number of the deliverable. */
  version?: number;
};

export type DependentAvailableAgentIdentifier = {
  /** If the agent is a transitive dependent, contains IDs of the resources that the agent depends on directly. */
  referenced_resource_ids?: (string)[];
  id: string;
  name: string;
  type?: string;
  created_at_unix_secs: number;
  access_level: "admin" | "editor" | "commenter" | "viewer";
};

export type DependentAvailableMcpServerIdentifier = {
  id: string;
  name: string;
  type?: string;
  created_at_unix_secs: number;
  access_level: "admin" | "editor" | "commenter" | "viewer";
};

export type DependentAvailableToolIdentifier = {
  id: string;
  name: string;
  type?: string;
  created_at_unix_secs: number;
  access_level: "admin" | "editor" | "commenter" | "viewer";
};

export type DependentBranchInfo = {
  agent_id: string;
  agent_name: string;
  branch_id: string;
  branch_name: string;
  is_main: boolean;
};

/** Identifier for an integration connection that depends on an auth connection */
export type DependentIntegrationConnectionIdentifier = {
  id: string;
  name: string;
};

export type DependentPhoneNumberIdentifier = {
  phone_number_id: string;
  phone_number: string;
  label: string;
  provider: TelephonyProvider;
};

/** A model that represents an agent dependent on a knowledge base/tools to which the user has no direct access. */
export type DependentUnknownAgentIdentifier = {
  /** If the agent is a transitive dependent, contains IDs of the resources that the agent depends on directly. */
  referenced_resource_ids?: (string)[];
  id: string;
  type?: string;
};

export type DependentUnknownMcpServerIdentifier = {
  id: string;
  type?: string;
};

/** A model that represents an tool dependent on a knowledge base/tools to which the user has no direct access. */
export type DependentUnknownToolIdentifier = {
  type?: string;
  id: string;
};

/** Response model for structured music generation endpoint */
export type DetailedMusicResponse = {
  /** The composition plan used to generate the song */
  composition_plan: MusicPrompt;
  /** The metadata of the generated song */
  song_metadata: SongMetadata;
  /** The timestamps of the words in the generated song */
  words_timestamps: (WordTimestamp)[] | null;
};

export type DetectedEntity = {
  /** The text that was identified as an entity. */
  text: string;
  /** The type of entity detected (e.g., 'credit_card', 'email_address', 'person_name'). */
  entity_type: string;
  /** Start character position in the transcript text. */
  start_char: number;
  /** End character position in the transcript text. */
  end_char: number;
};

/** Device information.  Spec: https://schema.ocsf.io/1.6.0/objects/device */
export type DeviceModel = {
  /** IP address */
  ip?: string | null;
  /** Device hostname */
  hostname?: string | null;
  /** Device type ID (99 = Unknown) */
  type_id?: number;
};

export type DialogueInput = {
  /** The text to be converted into speech. */
  text: string;
  /** The ID of the voice to be used for the generation. */
  voice_id: string;
};

export type DialogueInputResponseModel = {
  /** The text of the dialogue input line. */
  text: string;
  /** The ID of the voice used for this dialogue input line. */
  voice_id: string;
  /** The name of the voice used for this dialogue input line. */
  voice_name: string;
};

export type DirectPublishingReadResponseModel = {
  read_id: string;
  created_at_unix: number;
  updated_at_unix: number;
  word_count: number;
  char_count: number;
  chapters: (ReadMetadataChapterDbModel)[];
  title?: string | null;
  author?: string | null;
  description?: string | null;
  article_image_url?: string | null;
  language?: string | null;
  locale?: string | null;
  display_mode?: "text" | "audio-only" | "text-with-audio" | null;
  genre?: ("Fantasy" | "Romance" | "Science Fiction" | "Mystery and Thriller" | "Action and Adventure" | "Dystopia" | "Business and Economics" | "Technology" | "Christian & Inspirational" | "Horror" | "Biography and Memoir" | "Education and Learning" | "History" | "Children's Literature" | "Young Adult" | "Fairy Tales and Folklore" | "Fan Fiction" | "General Fiction" | "Health and Wellness" | "Historical Fiction" | "Humor" | "Literary Classics" | "Philosophy" | "Poetry" | "Politics and Government" | "Psychology" | "Science and Nature" | "Self-Help" | "Spirituality and Religion" | "Travel" | "True Crime" | "Other")[] | null;
  fiction?: string | null;
  content_type?: string | null;
  original_file_type?: string | null;
  target_audience?: "children" | "young adult" | "adult" | "all ages" | null;
  mature_content?: boolean | null;
  origin?: string | null;
  publication_date?: string | null;
  isbn?: string | null;
  ean?: string | null;
  legal_terms?: ReadLegalTerms | null;
  content_guidelines_terms?: ReadLegalTerms | null;
  last_updated_from_project_unix?: number | null;
  publishing_project_id?: string | null;
  publishing_state?: string;
  publisher_profile_id?: string | null;
  quality_score?: number | null;
  publisher?: string | null;
  copyright?: string | null;
  subtitle?: string | null;
  distribution_territories?: (string)[] | null;
  edition?: string | null;
  contributors?: (Contributor)[] | null;
  payout_type?: "none" | "engagement_based" | "fixed_payout" | null;
  list_price?: number | null;
  currency?: string | null;
  original_audio_project_export_id?: string | null;
  original_audio_document_id?: string | null;
  series_id?: string | null;
  volume?: number | null;
  published_at_unix?: number | null;
  read_slug?: string | null;
  preview_audio_object?: PreviewAudioDbModel | null;
  sample_config?: SampleConfigDbModel | null;
  review?: ReviewResponseModel | null;
  voice_id?: string | null;
  can_use_assistant?: boolean;
  is_voice_changer_on?: boolean;
};

export type DiscountResponseModel = {
  /** The discount applied to the invoice. E.g. [20.0f] for 20% off. */
  discount_percent_off?: number | null;
  /** The discount applied to the invoice. E.g. [20.0f] for 20 cents off. */
  discount_amount_off?: number | null;
};

export type DoDubbingResponseModel = {
  /** The ID of the dubbing project. */
  dubbing_id: string;
  /** The expected duration of the dubbing project in seconds. */
  expected_duration_sec: number;
};

export type DocumentUsageModeEnum = "prompt" | "auto";

export type DocxExportOptions = {
  include_speakers?: boolean;
  include_timestamps?: boolean;
  format: string;
  segment_on_silence_longer_than_s?: number | null;
  max_segment_duration_s?: number | null;
  max_segment_chars?: number | null;
};

export type DubOrderItemRequest = {
  /** The type of order item. */
  kind?: string;
  /** The ID of the uploaded media file to dub. */
  media_id: MediaId;
  /** The language code of the source media (e.g. 'en', 'es'). */
  source_language: string;
  /** List of target language codes to dub the media into. */
  destination_languages: (string)[];
  /** Whether to generate captions for the dubbed outputs. */
  include_captions: boolean;
  /** Whether to generate captions for the source language. */
  include_source_captions: boolean;
  /** Optional free-text instructions for the dubbing team. */
  instructions?: string | null;
  /** Whether captions should use SDH format, which includes descriptions for deaf and hard-of-hearing viewers. */
  captions_sdh?: boolean | null;
};

export type DubbedSegment = {
  start_time: number;
  end_time: number;
  text: string | null;
  subtitles: (SegmentSubtitleFrame)[];
  audio_stale: boolean;
  media_ref: DubbingMediaReference | null;
};

export type DubbingMediaMetadata = {
  /** The content type of the media. */
  content_type: string;
  /** The duration of the media in seconds. */
  duration: number;
};

export type DubbingMediaReference = {
  src: string;
  content_type: string;
  bucket_name: string;
  random_path_slug: string;
  duration_secs: number;
  is_audio: boolean;
  url: string;
};

export type DubbingMetadataPageResponseModel = {
  dubs: (DubbingMetadataResponse)[];
  next_cursor: string | null;
  has_more: boolean;
};

export type DubbingMetadataResponse = {
  /** The ID of the dubbing project. */
  dubbing_id: string;
  /** The name of the dubbing project. */
  name: string;
  /** The state this dub is in. */
  status: string;
  /** Once dubbing has completed, the ISO-639-1 code of the original media's source language. */
  source_language: string | null;
  /** The ISO-639-1 code of the languages this media has been dubbed into. */
  target_languages: (string)[];
  /** Whether this dubbing project is editable in Dubbing Studio. */
  editable?: boolean;
  /** Timestamp this dub was created. */
  created_at: string;
  /** Metadata, such as the length in seconds and content type, of the dubbed content. */
  media_metadata?: DubbingMediaMetadata | null;
  /** Error message indicate, if this dub has failed, what happened. */
  error?: string | null;
};

export type DubbingRenderResponseModel = {
  version: number;
  render_id: string;
};

export type DubbingResource = {
  id: string;
  version: number;
  source_language: string;
  target_languages: (string)[];
  input: DubbingMediaReference;
  background: DubbingMediaReference | null;
  foreground: DubbingMediaReference | null;
  speaker_tracks: { [key: string]: SpeakerTrack | undefined };
  speaker_segments: { [key: string]: SpeakerSegment | undefined };
  renders: { [key: string]: Render | undefined };
};

export type DubbingTranscript = {
  language: string;
  utterances: (DubbingTranscriptUtterance)[];
};

export type DubbingTranscriptCharacter = {
  text?: string;
  start_s?: number;
  end_s?: number;
};

export type DubbingTranscriptResponseModel = {
  language: string;
  utterances: (DubbingTranscriptUtterance)[];
};

export type DubbingTranscriptUtterance = {
  text?: string;
  speaker_id?: string;
  start_s?: number;
  end_s?: number;
  words?: (DubbingTranscriptWord)[];
};

export type DubbingTranscriptWord = {
  text?: string;
  word_type?: string;
  start_s?: number;
  end_s?: number;
  characters?: (DubbingTranscriptCharacter)[];
};

export type DubbingTranscriptsResponseModel = {
  transcript_format: "srt" | "webvtt" | "json";
  srt?: string | null;
  webvtt?: string | null;
  json?: DubbingTranscript | null;
};

/** Configuration for extracting values from tool responses and assigning them to dynamic variables. */
export type DynamicVariableAssignment = {
  /** The source to extract the value from. Currently only 'response' is supported. */
  source?: string;
  /** The name of the dynamic variable to assign the extracted value to */
  dynamic_variable: string;
  /** Dot notation path to extract the value from the source (e.g., 'user.name' or 'data.0.id') */
  value_path: string;
  /** If true, this assignment's value will be removed from the tool response before sending to the LLM and transcript, but still processed for variable assignment. */
  sanitize?: boolean;
  /** If true, non-scalar values (lists, objects) extracted from the tool response are stored as their native type instead of being stringified to JSON. Enable this to use extracted arrays directly as list dynamic variables. */
  preserve_native_type?: boolean;
};

export type DynamicVariableNestedValueTypeInput = string | number | number | boolean | (DynamicVariableNestedValueTypeInput)[] | null;

export type DynamicVariableNestedValueTypeOutput = string | number | number | boolean | (DynamicVariableNestedValueTypeOutput)[] | null;

export type DynamicVariableSchemaOverride = {
  source?: string;
  /** The name of the dynamic variable to use */
  dynamic_variable: string;
};

/** Tracks a dynamic variable update that occurred during tool execution. */
export type DynamicVariableUpdateCommonModel = {
  variable_name: string;
  old_value: string | null;
  new_value: string;
  updated_at: number;
  tool_name: string;
  tool_request_id: string;
};

export type DynamicVariableValueTypeInput = string | number | number | boolean | (DynamicVariableNestedValueTypeInput)[] | null;

export type DynamicVariableValueTypeOutput = string | number | number | boolean | (DynamicVariableNestedValueTypeOutput)[] | null;

export type DynamicVariablesConfigInput = {
  /** A dictionary of dynamic variable placeholders and their values */
  dynamic_variable_placeholders?: { [key: string]: DynamicVariableValueTypeInput | undefined };
};

export type DynamicVariablesConfigOutput = {
  /** A dictionary of dynamic variable placeholders and their values */
  dynamic_variable_placeholders?: { [key: string]: DynamicVariableValueTypeOutput | undefined };
};

export type DynamicVariablesConfigWorkflowOverrideInput = {
  /** A dictionary of dynamic variable placeholders and their values */
  dynamic_variable_placeholders?: { [key: string]: DynamicVariableValueTypeInput | undefined } | null;
};

export type DynamicVariablesConfigWorkflowOverrideOutput = {
  /** A dictionary of dynamic variable placeholders and their values */
  dynamic_variable_placeholders?: { [key: string]: DynamicVariableValueTypeOutput | undefined } | null;
};

export type EditChapterResponseModel = {
  chapter: ChapterWithContentResponseModel;
};

export type EditProjectResponseModel = {
  project: ProjectResponseModel;
};

export type EditVoiceResponseModel = {
  /** The status of the voice edit request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type EditVoiceSettingsResponseModel = {
  /** The status of the voice settings edit request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type EmbedVariant = "tiny" | "compact" | "full" | "expandable";

export type EmbeddingModelEnum = "e5_mistral_7b_instruct" | "multilingual_e5_large_instruct";

export type EndCallToolConfig = {
  system_tool_type?: string;
};

export type EndCallToolResultModel = {
  result_type?: string;
  status?: string;
  reason?: string | null;
  message?: string | null;
};

export type EndCallTriggerAction = {
  type?: string;
};

/** OCSF Activity IDs for Entity Management [3004] events.  Spec: https://schema.ocsf.io/1.6.0/classes/entity_management */
export type EntityManagementActivityId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 99;

/** References an environment variable of type 'auth_connection' by label. At runtime, resolves to the auth connection for the current environment, falling back to the default environment. */
export type EnvironmentAuthConnectionLocator = {
  env_var_label: string;
};

export type EnvironmentVariableAuthConnectionValue = {
  auth_connection_id: string;
};

export type EnvironmentVariableAuthConnectionValueRequest = {
  auth_connection_id: string;
};

export type EnvironmentVariableResponse = {
  label: string;
  created_at_unix_secs: number;
  updated_at_unix_secs: number;
  created_by_user_id?: string | null;
  type: "string" | "secret" | "auth_connection";
  id: string;
  workspace_id: string;
  values: { [key: string]: string | undefined } | { [key: string]: EnvironmentVariableSecretValue | undefined } | { [key: string]: EnvironmentVariableAuthConnectionValue | undefined };
};

export type EnvironmentVariableSecretValue = {
  secret_id: string;
};

export type EnvironmentVariableSecretValueRequest = {
  secret_id: string;
};

export type EnvironmentVariablesListResponse = {
  environment_variables: (EnvironmentVariableResponse)[];
  next_cursor?: string | null;
  has_more: boolean;
};

/** Settings to evaluate an agent's performance. Agents are evaluated against a set of criteria, with success being defined as meeting some combination of those criteria. */
export type EvaluationSettingsInput = {
  /** Individual criteria that the agent should be evaluated against */
  criteria?: (PromptEvaluationCriteria)[];
};

/** Settings to evaluate an agent's performance. Agents are evaluated against a set of criteria, with success being defined as meeting some combination of those criteria. */
export type EvaluationSettingsOutput = {
  /** Individual criteria that the agent should be evaluated against */
  criteria?: (PromptEvaluationCriteria)[];
};

export type EvaluationSuccessResult = "success" | "failure" | "unknown";

export type ExactParameterEvaluationStrategy = {
  type: string;
  /** The exact string value that the parameter must match. */
  expected_value: string;
};

export type ExotelApiSubdomain = "api.in.exotel.com" | "api.exotel.com";

export type ExotelOutboundCallResponse = {
  success: boolean;
  message: string;
  conversation_id: string | null;
  /** Exotel CallSid for the originated call */
  callSid: string | null;
};

export type ExportOptions = SegmentedJsonExportOptions | DocxExportOptions | PdfExportOptions | TxtExportOptions | HtmlExportOptions | SrtExportOptions;

export type ExtendedSubscriptionResponseModel = {
  /** The tier of the user's subscription. */
  tier: string;
  /** The number of characters used by the user. */
  character_count: number;
  /** The maximum number of characters allowed in the current billing period. */
  character_limit: number;
  /** Deprecated: use `max_credit_limit_extension`. Maximum number of characters that the character limit can be exceeded by. Managed by the workspace admin. */
  max_character_limit_extension: number | null;
  /** Maximum number of credits that the credit limit can be exceeded by. Managed by the workspace admin. `"unlimited"` means no cap, `0` means usage-based billing is disabled. */
  max_credit_limit_extension: number | string;
  /** Whether the workspace is entitled to enter overages (usage-based billing). */
  can_extend_character_limit: boolean;
  /** Deprecated: use `max_credit_limit_extension != 0`. Whether the user is allowed to extend their character limit. */
  allowed_to_extend_character_limit: boolean;
  /** The Unix timestamp of the next character count reset. */
  next_character_count_reset_unix?: number | null;
  /** The number of voice slots used by the user. */
  voice_slots_used: number;
  /** The number of professional voice slots used by the workspace/user if single seat. */
  professional_voice_slots_used: number;
  /** The maximum number of voice slots allowed for the user. */
  voice_limit: number;
  /** The maximum number of voice add/edits allowed for the user. */
  max_voice_add_edits?: number | null;
  /** The number of voice add/edits used by the user. */
  voice_add_edit_counter: number;
  /** The maximum number of professional voices allowed for the user. */
  professional_voice_limit: number;
  /** Whether the user can extend their voice limit. */
  can_extend_voice_limit: boolean;
  /** Whether the user can use instant voice cloning. */
  can_use_instant_voice_cloning: boolean;
  /** Whether the user can use professional voice cloning. */
  can_use_professional_voice_cloning: boolean;
  /** The currency of the user's subscription. */
  currency?: Currency | null;
  /** The current usage-based overage cost. */
  current_overage: Price;
  /** The status of the user's subscription. */
  status: SubscriptionStatusType;
  /** The billing period of the user's subscription. */
  billing_period?: BillingPeriod | null;
  /** The character refresh period of the user's subscription. */
  character_refresh_period?: CharacterRefreshPeriod | null;
  /** The next invoice for the user. */
  next_invoice?: InvoiceResponseModel | null;
  /** The open invoices for the user. */
  open_invoices: (InvoiceResponseModel)[];
  /** Whether the user has open invoices. */
  has_open_invoices: boolean;
  /** The pending change for the user. */
  pending_change?: PendingSubscriptionSwitchResponseModel | PendingCancellationResponseModel | null;
  /** True if any workspace owned by this user's auth account has redeemed the starter first-month discount coupon. */
  has_used_starter_coupon_on_account?: boolean;
  /** True if any workspace owned by this user's auth account has redeemed the creator first-month discount coupon. */
  has_used_creator_coupon_on_account?: boolean;
};

export type FeatureStatusCommonModel = {
  enabled?: boolean;
  used?: boolean;
};

export type FeaturesUsageCommonModel = {
  language_detection?: FeatureStatusCommonModel;
  transfer_to_agent?: FeatureStatusCommonModel;
  transfer_to_number?: FeatureStatusCommonModel;
  multivoice?: FeatureStatusCommonModel;
  dtmf_tones?: FeatureStatusCommonModel;
  external_mcp_servers?: FeatureStatusCommonModel;
  pii_zrm_workspace?: boolean;
  pii_zrm_agent?: boolean;
  tool_dynamic_variable_updates?: FeatureStatusCommonModel;
  is_livekit?: boolean;
  voicemail_detection?: FeatureStatusCommonModel;
  dtmf_input?: FeatureStatusCommonModel;
  workflow?: WorkflowFeaturesUsageCommonModel;
  agent_testing?: TestsFeatureUsageCommonModel;
  versioning?: FeatureStatusCommonModel;
  file_input?: FeatureStatusCommonModel;
};

export type FeedbackResponseModel = {
  /** Whether the user liked the generated item. */
  thumbs_up: boolean;
  /** The feedback text provided by the user. */
  feedback: string;
  /** Whether the user provided emotions. */
  emotions: boolean;
  /** Whether the user thinks the clone is inaccurate. */
  inaccurate_clone: boolean;
  /** Whether the user thinks there are glitches in the audio. */
  glitches: boolean;
  /** Whether the user thinks the audio quality is good. */
  audio_quality: boolean;
  /** Whether the user provided other feedback. */
  other: boolean;
  /** The review status of the item. Defaults to 'not_reviewed'. */
  review_status?: string;
};

export type FileInputConfig = {
  /** When enabled, users may attach images or PDFs in chat when the LLM supports multimodal input. */
  enabled?: boolean;
  /** Maximum number of files that can be uploaded per conversation. */
  max_files_per_conversation?: number;
};

export type FileInputConfigWorkflowOverride = {
  /** When enabled, users may attach images or PDFs in chat when the LLM supports multimodal input. */
  enabled?: boolean | null;
  /** Maximum number of files that can be uploaded per conversation. */
  max_files_per_conversation?: number | null;
};

export type FineTuningResponseModel = {
  /** Whether the user is allowed to fine-tune the voice. */
  is_allowed_to_fine_tune: boolean;
  /** The state of the fine-tuning process for each model. */
  state: { [key: string]: "not_started" | "queued" | "fine_tuning" | "fine_tuned" | "failed" | "delayed" | undefined };
  /** List of verification failures in the fine-tuning process. */
  verification_failures: (string)[];
  /** The number of verification attempts in the fine-tuning process. */
  verification_attempts_count: number;
  /** Whether a manual verification was requested for the fine-tuning process. */
  manual_verification_requested: boolean;
  /** The language of the fine-tuning process. */
  language?: string | null;
  /** The progress of the fine-tuning process. */
  progress?: { [key: string]: number | undefined } | null;
  /** The message of the fine-tuning process. */
  message?: { [key: string]: string | undefined } | null;
  /** The duration of the dataset in seconds. */
  dataset_duration_seconds?: number | null;
  /** The number of verification attempts. */
  verification_attempts?: (VerificationAttemptResponseModel)[] | null;
  /** List of slice IDs. */
  slice_ids?: (string)[] | null;
  /** The manual verification of the fine-tuning process. */
  manual_verification?: ManualVerificationResponseModel | null;
  /** The maximum number of verification attempts. */
  max_verification_attempts?: number | null;
  /** The next maximum verification attempts reset time in Unix milliseconds. */
  next_max_verification_attempts_reset_unix_ms?: number | null;
};

export type FocusGuardrail = {
  is_enabled?: boolean;
};

/** Model representing a single character with its timing information from the aligner. */
export type ForcedAlignmentCharacterResponseModel = {
  /** The character that was transcribed. */
  text: string;
  /** The start time of the character in seconds. */
  start: number;
  /** The end time of the character in seconds. */
  end: number;
};

/** Model representing the response from the aligner service. */
export type ForcedAlignmentResponseModel = {
  /** List of characters with their timing information. */
  characters: (ForcedAlignmentCharacterResponseModel)[];
  /** List of words with their timing information. */
  words: (ForcedAlignmentWordResponseModel)[];
  /** The average alignment loss/confidence score for the entire transcript, calculated from all characters. */
  loss: number;
};

/** Model representing a single word with its timing information from the aligner. */
export type ForcedAlignmentWordResponseModel = {
  /** The word that was transcribed. */
  text: string;
  /** The start time of the word in seconds. */
  start: number;
  /** The end time of the word in seconds. */
  end: number;
  /** The average alignment loss/confidence score for this word, calculated from its constituent characters. */
  loss: number;
};

export type GenerationSourceContext = {
  source_type?: string;
  generation_id: string;
  prompt?: string | null;
  model_id: string;
  model_provider?: string | null;
  generation_session_id?: string | null;
  session_iteration_id?: string | null;
  model_parameters?: { [key: string]: unknown } | null;
  extend_video?: ReferenceVideo | null;
};

export type GenesysRegion = "us_east_1" | "eu_west_1" | "ap_southeast_2" | "ap_northeast_1" | "eu_central_1" | "us_west_2" | "ca_central_1" | "ap_northeast_2" | "eu_west_2" | "ap_south_1" | "us_east_2" | "sa_east_1" | "me_central_1" | "ap_northeast_3" | "eu_central_2" | "mx_central_1" | "ap_southeast_1";

export type GetAgentEmbedResponseModel = {
  agent_id: string;
  widget_config: WidgetConfigResponseModel;
};

export type GetAgentKnowledgebaseSizeResponseModel = {
  number_of_pages: number;
};

export type GetAgentLinkResponseModel = {
  /** The ID of the agent */
  agent_id: string;
  /** The token data for the agent */
  token?: ConversationTokenResponseModel | null;
};

export type GetAgentResponseModel = {
  /** The ID of the agent */
  agent_id: string;
  /** The name of the agent */
  name: string;
  /** The conversation configuration of the agent */
  conversation_config: ConversationalConfigApiModelOutput;
  /** The metadata of the agent */
  metadata: AgentMetadataResponseModel;
  /** The platform settings of the agent */
  platform_settings?: AgentPlatformSettingsResponseModel;
  /** The phone numbers of the agent */
  phone_numbers?: (GetPhoneNumberTwilioResponseModel | GetPhoneNumberExotelResponseModel | GetPhoneNumberSipTrunkResponseModel)[];
  /** WhatsApp accounts assigned to the agent */
  whatsapp_accounts?: (GetWhatsAppAccountResponse)[];
  /** The workflow of the agent */
  workflow?: AgentWorkflowResponseModel;
  /** The access information of the agent for the user */
  access_info?: ResourceAccessInfo | null;
  /** Agent tags used to categorize the agent */
  tags?: (string)[];
  /** The ID of the version the agent is on */
  version_id?: string | null;
  /** The ID of the branch the agent is on */
  branch_id?: string | null;
  /** The ID of the main branch for this agent */
  main_branch_id?: string | null;
};

export type GetAgentTestFolderResponseModel = {
  id: string;
  name: string;
  /** The path from the root folder to the current folder. */
  folder_path?: (AgentTestFolderPathSegmentResponseModel)[];
  /** The number of direct children (tests and subfolders) in this folder */
  children_count?: number;
};

export type GetAgentTopicsResponseModel = {
  topics: (AgentTopicResponseModel)[];
  window_start_unix_secs: number;
  window_end_unix_secs: number;
};

export type GetAgentsPageResponseModel = {
  /** A list of agents and their metadata */
  agents: (AgentSummaryResponseModel)[];
  /** The next cursor to paginate through the agents */
  next_cursor?: string | null;
  /** Whether there are more agents to paginate through */
  has_more: boolean;
};

/** Get a summary of key business analytics for a time period. */
export type GetAnalyticsSummaryParams = {
  smb_tool_type?: string;
};

/** Look up an appointment by the booking confirmation number the caller quotes.  The confirmation number is the 8-character code shown on the booking confirmation page (e.g. ``#01ABCDEF``). Callers may read it back with or without the leading ``#`` and with varied spacing; the tool normalizes the input and does a prefix match on the stored calendar item id. */
export type GetAppointmentByConfirmationNumberParams = {
  smb_tool_type?: string;
};

export type GetAudioIsolationHistoryResponseModel = {
  items: (AudioIsolationHistoryItemResponseModel)[];
  has_more: boolean;
};

export type GetAudioNativeProjectSettingsResponseModel = {
  /** Whether the project is enabled. */
  enabled: boolean;
  /** The ID of the latest snapshot of the project. */
  snapshot_id?: string | null;
  /** The settings of the project. */
  settings?: AudioNativeProjectSettingsResponseModel | null;
};

export type GetBookingPageSettingsParams = {
  smb_tool_type?: string;
};

export type GetBookingSlugStatusParams = {
  smb_tool_type?: string;
};

export type GetChaptersResponseModel = {
  chapters: (ChapterResponseModel)[];
};

export type GetClientAppointmentsParams = {
  smb_tool_type?: string;
  include_cancelled?: boolean;
};

/** Look up a client by their exact phone number. */
export type GetClientByPhoneParams = {
  smb_tool_type?: string;
};

export type GetConvAiDashboardSettingsResponseModel = {
  charts?: (DashboardCallSuccessChartModel | DashboardCriteriaChartModel | DashboardDataCollectionChartModel)[];
};

export type GetConvAiSettingsResponseModel = {
  conversation_initiation_client_data_webhook?: ConversationInitiationClientDataWebhook | null;
  webhooks?: ConvAiWebhooks;
  /** Whether the workspace can use MCP servers */
  can_use_mcp_servers?: boolean;
  rag_retention_period_days?: number;
  /** Days to retain conversation embeddings. None means use the system default (30 days). */
  conversation_embedding_retention_days?: number | null;
  default_livekit_stack?: LivekitStackType;
};

export type GetConversationResponseModel = {
  agent_id: string;
  agent_name?: string | null;
  status: "initiated" | "in-progress" | "processing" | "done" | "failed";
  user_id?: string | null;
  branch_id?: string | null;
  /** The ID of the agent version used for this conversation */
  version_id?: string | null;
  metadata: ConversationHistoryMetadataCommonModel;
  analysis?: ConversationHistoryAnalysisCommonModel | null;
  visited_agents?: (VisitedAgentRef)[];
  conversation_initiation_client_data?: ConversationInitiationClientDataRequestOutput;
  environment?: string;
  conversation_id: string;
  has_audio: boolean;
  has_user_audio: boolean;
  has_response_audio: boolean;
  transcript: (ConversationHistoryTranscriptResponseModel)[];
  /** Conversation tag ids assigned to this conversation. */
  tag_ids?: (string)[];
  /** OpenTelemetry trace payload when the request uses format=opentelemetry; otherwise omitted. */
  otlp_traces?: { [key: string]: unknown } | null;
};

export type GetConversationTagsPageResponseModel = {
  conversation_tags: (ConversationTagResponseModel)[];
  next_cursor?: string | null;
  has_more: boolean;
};

export type GetConversationUsersPageResponseModel = {
  users: (ConversationUserResponseModel)[];
  next_cursor?: string | null;
  has_more: boolean;
};

export type GetConversationsPageResponseModel = {
  conversations: (ConversationSummaryResponseModel)[];
  next_cursor?: string | null;
  has_more: boolean;
};

export type GetKnowledgeBaseDependentAgentsResponseModel = {
  agents: (DependentAvailableAgentIdentifier | DependentUnknownAgentIdentifier)[];
  branches?: (DependentBranchInfo)[];
  next_cursor?: string | null;
  has_more: boolean;
};

export type GetKnowledgeBaseFileResponseModel = {
  id: string;
  name: string;
  metadata: KnowledgeBaseDocumentMetadataResponseModel;
  supported_usages: (DocumentUsageModeEnum)[];
  access_info: ResourceAccessInfo;
  /** The ID of the parent folder, or null if the document is at the root level. */
  folder_parent_id?: string | null;
  /** The folder path segments leading to this entity, from root to parent folder. */
  folder_path?: (KnowledgeBaseFolderPathSegmentResponseModel)[];
  type: string;
  extracted_inner_html: string;
  filename: string;
};

export type GetKnowledgeBaseFolderResponseModel = {
  id: string;
  name: string;
  metadata: KnowledgeBaseDocumentMetadataResponseModel;
  supported_usages: (DocumentUsageModeEnum)[];
  access_info: ResourceAccessInfo;
  /** The ID of the parent folder, or null if the document is at the root level. */
  folder_parent_id?: string | null;
  /** The folder path segments leading to this entity, from root to parent folder. */
  folder_path?: (KnowledgeBaseFolderPathSegmentResponseModel)[];
  type: string;
  children_count: number;
  auto_sync_info?: AutoSyncInfo | null;
};

export type GetKnowledgeBaseListResponseModel = {
  documents: (GetKnowledgeBaseSummaryUrlResponseModel | GetKnowledgeBaseSummaryFileResponseModel | GetKnowledgeBaseSummaryTextResponseModel | GetKnowledgeBaseSummaryFolderResponseModel)[];
  next_cursor?: string | null;
  has_more: boolean;
};

export type GetKnowledgeBaseSummaryFileResponseModel = {
  id: string;
  name: string;
  metadata: KnowledgeBaseDocumentMetadataResponseModel;
  supported_usages: (DocumentUsageModeEnum)[];
  access_info: ResourceAccessInfo;
  /** The ID of the parent folder, or null if the document is at the root level. */
  folder_parent_id?: string | null;
  /** The folder path segments leading to this entity, from root to parent folder. */
  folder_path?: (KnowledgeBaseFolderPathSegmentSummaryResponseModel)[];
  /** This field is deprecated and will be removed in the future, use the separate endpoint to get dependent agents instead. */
  dependent_agents: (DependentAvailableAgentIdentifier | DependentUnknownAgentIdentifier)[];
  type: string;
};

export type GetKnowledgeBaseSummaryFolderResponseModel = {
  id: string;
  name: string;
  metadata: KnowledgeBaseDocumentMetadataResponseModel;
  supported_usages: (DocumentUsageModeEnum)[];
  access_info: ResourceAccessInfo;
  /** The ID of the parent folder, or null if the document is at the root level. */
  folder_parent_id?: string | null;
  /** The folder path segments leading to this entity, from root to parent folder. */
  folder_path?: (KnowledgeBaseFolderPathSegmentSummaryResponseModel)[];
  /** This field is deprecated and will be removed in the future, use the separate endpoint to get dependent agents instead. */
  dependent_agents: (DependentAvailableAgentIdentifier | DependentUnknownAgentIdentifier)[];
  type: string;
  children_count: number;
  auto_sync_info?: AutoSyncInfo | null;
};

export type GetKnowledgeBaseSummaryTextResponseModel = {
  id: string;
  name: string;
  metadata: KnowledgeBaseDocumentMetadataResponseModel;
  supported_usages: (DocumentUsageModeEnum)[];
  access_info: ResourceAccessInfo;
  /** The ID of the parent folder, or null if the document is at the root level. */
  folder_parent_id?: string | null;
  /** The folder path segments leading to this entity, from root to parent folder. */
  folder_path?: (KnowledgeBaseFolderPathSegmentSummaryResponseModel)[];
  /** This field is deprecated and will be removed in the future, use the separate endpoint to get dependent agents instead. */
  dependent_agents: (DependentAvailableAgentIdentifier | DependentUnknownAgentIdentifier)[];
  type: string;
};

export type GetKnowledgeBaseSummaryUrlResponseModel = {
  id: string;
  name: string;
  metadata: KnowledgeBaseDocumentMetadataResponseModel;
  supported_usages: (DocumentUsageModeEnum)[];
  access_info: ResourceAccessInfo;
  /** The ID of the parent folder, or null if the document is at the root level. */
  folder_parent_id?: string | null;
  /** The folder path segments leading to this entity, from root to parent folder. */
  folder_path?: (KnowledgeBaseFolderPathSegmentSummaryResponseModel)[];
  /** This field is deprecated and will be removed in the future, use the separate endpoint to get dependent agents instead. */
  dependent_agents: (DependentAvailableAgentIdentifier | DependentUnknownAgentIdentifier)[];
  type: string;
  url: string;
  auto_sync_info?: AutoSyncInfo | null;
};

export type GetKnowledgeBaseTextResponseModel = {
  id: string;
  name: string;
  metadata: KnowledgeBaseDocumentMetadataResponseModel;
  supported_usages: (DocumentUsageModeEnum)[];
  access_info: ResourceAccessInfo;
  /** The ID of the parent folder, or null if the document is at the root level. */
  folder_parent_id?: string | null;
  /** The folder path segments leading to this entity, from root to parent folder. */
  folder_path?: (KnowledgeBaseFolderPathSegmentResponseModel)[];
  type: string;
  extracted_inner_html: string;
};

export type GetKnowledgeBaseUrlResponseModel = {
  id: string;
  name: string;
  metadata: KnowledgeBaseDocumentMetadataResponseModel;
  supported_usages: (DocumentUsageModeEnum)[];
  access_info: ResourceAccessInfo;
  /** The ID of the parent folder, or null if the document is at the root level. */
  folder_parent_id?: string | null;
  /** The folder path segments leading to this entity, from root to parent folder. */
  folder_path?: (KnowledgeBaseFolderPathSegmentResponseModel)[];
  type: string;
  url: string;
  extracted_inner_html: string;
  auto_sync_info?: AutoSyncInfo | null;
};

export type GetLibraryVoicesResponseModel = {
  /** The list of shared voices */
  voices: (LibraryVoiceResponseModel)[];
  /** Whether there are more shared voices in subsequent pages. */
  has_more: boolean;
  /** The total number of shared voices matching the query. */
  total_count?: number;
  last_sort_id?: string | null;
};

export type GetLiveCountResponse = {
  /** The number of active ongoing conversations. */
  count: number;
};

export type GetOrCreateRagIndexRequestModel = {
  /** ID of the knowledgebase document for which to retrieve the index */
  document_id: string;
  /** Whether to create the RAG index if it does not exist */
  create_if_missing: boolean;
  /** Embedding model to use for the RAG index */
  model: EmbeddingModelEnum;
};

export type GetPhoneNumberExotelResponseModel = {
  /** Phone number */
  phone_number: string;
  /** Label for the phone number */
  label: string;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports inbound calls */
  supports_inbound?: boolean;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports outbound calls */
  supports_outbound?: boolean;
  /** The ID of the phone number */
  phone_number_id: string;
  /** The agent that is assigned to the phone number */
  assigned_agent?: PhoneNumberAgentInfo | null;
  /** Phone provider */
  provider?: string;
};

export type GetPhoneNumberInboundSipTrunkConfigResponseModel = {
  /** List of IP addresses that are allowed to use the trunk. Each item in the list can be an individual IP address or a Classless Inter-Domain Routing notation representing a CIDR block. */
  allowed_addresses: (string)[];
  /** List of phone numbers that are allowed to use the trunk. */
  allowed_numbers: (string)[] | null;
  media_encryption: SipMediaEncryptionEnum;
  /** Whether authentication credentials are configured */
  has_auth_credentials: boolean;
  /** SIP trunk username (if available) */
  username?: string | null;
  /** Domains of remote SIP servers used to validate TLS certificates. */
  remote_domains?: (string)[] | null;
  /** Map of dynamic variable name to header name for attributes_to_headers */
  attributes_to_headers?: { [key: string]: string | undefined };
};

/** SIP Trunk configuration details for a phone number */
export type GetPhoneNumberOutboundSipTrunkConfigResponseModel = {
  /** Hostname or IP the SIP INVITE is sent to */
  address: string;
  /** Protocol to use for SIP transport */
  transport: SipTrunkTransportEnum;
  /** Whether or not to encrypt media (data layer). */
  media_encryption: SipMediaEncryptionEnum;
  /** SIP headers for INVITE request */
  headers?: { [key: string]: string | undefined };
  /** Map of dynamic variable name to header name for attributes_to_headers */
  attributes_to_headers?: { [key: string]: string | undefined };
  /** Whether authentication credentials are configured */
  has_auth_credentials: boolean;
  /** SIP trunk username (if available) */
  username?: string | null;
  /** Whether a LiveKit SIP outbound trunk is configured */
  has_outbound_trunk?: boolean;
};

export type GetPhoneNumberSipTrunkResponseModel = {
  /** Phone number */
  phone_number: string;
  /** Label for the phone number */
  label: string;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports inbound calls */
  supports_inbound?: boolean;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports outbound calls */
  supports_outbound?: boolean;
  /** The ID of the phone number */
  phone_number_id: string;
  /** The agent that is assigned to the phone number */
  assigned_agent?: PhoneNumberAgentInfo | null;
  /** Phone provider */
  provider?: string;
  provider_config?: GetPhoneNumberOutboundSipTrunkConfigResponseModel | null;
  /** Configuration of the Outbound SIP trunk - if configured. */
  outbound_trunk?: GetPhoneNumberOutboundSipTrunkConfigResponseModel | null;
  /** Configuration of the Inbound SIP trunk - if configured. */
  inbound_trunk?: GetPhoneNumberInboundSipTrunkConfigResponseModel | null;
  /** Type of Livekit stack used for this number. */
  livekit_stack: LivekitStackType;
  /** Whether to store SIP messages for this phone number. */
  store_sip_messages?: boolean;
};

export type GetPhoneNumberTwilioResponseModel = {
  /** Phone number */
  phone_number: string;
  /** Label for the phone number */
  label: string;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports inbound calls */
  supports_inbound?: boolean;
  /** This field is deprecated and will be removed in the future. Whether this phone number supports outbound calls */
  supports_outbound?: boolean;
  /** The ID of the phone number */
  phone_number_id: string;
  /** The agent that is assigned to the phone number */
  assigned_agent?: PhoneNumberAgentInfo | null;
  /** Phone provider */
  provider?: string;
};

export type GetProjectsResponseModel = {
  /** A list of projects with their metadata. */
  projects: (ProjectResponseModel)[];
};

export type GetPronunciationDictionariesMetadataResponseModel = {
  /** A list of pronunciation dictionaries and their metadata. */
  pronunciation_dictionaries: (GetPronunciationDictionaryMetadataResponseModel)[];
  /** The next cursor to use for pagination. */
  next_cursor?: string | null;
  /** Whether there are more pronunciation dictionaries to fetch. */
  has_more: boolean;
};

export type GetPronunciationDictionaryMetadataResponseModel = {
  /** The ID of the pronunciation dictionary. */
  id: string;
  /** The ID of the latest version of the pronunciation dictionary. */
  latest_version_id: string;
  /** The number of rules in the latest version of the pronunciation dictionary. */
  latest_version_rules_num: number;
  /** The name of the pronunciation dictionary. */
  name: string;
  /** The permission on the resource of the pronunciation dictionary. */
  permission_on_resource: "admin" | "editor" | "commenter" | "viewer" | null;
  /** The user ID of the creator of the pronunciation dictionary. */
  created_by: string;
  /** The creation time of the pronunciation dictionary in Unix timestamp. */
  creation_time_unix: number;
  /** The archive time of the pronunciation dictionary in Unix timestamp. */
  archived_time_unix?: number | null;
  /** The description of the pronunciation dictionary. */
  description?: string | null;
};

export type GetPronunciationDictionaryWithRulesResponseModel = {
  /** The ID of the pronunciation dictionary. */
  id: string;
  /** The ID of the latest version of the pronunciation dictionary. */
  latest_version_id: string;
  /** The number of rules in the latest version of the pronunciation dictionary. */
  latest_version_rules_num: number;
  /** The name of the pronunciation dictionary. */
  name: string;
  /** The permission on the resource of the pronunciation dictionary. */
  permission_on_resource: "admin" | "editor" | "commenter" | "viewer" | null;
  /** The user ID of the creator of the pronunciation dictionary. */
  created_by: string;
  /** The creation time of the pronunciation dictionary in Unix timestamp. */
  creation_time_unix: number;
  /** The archive time of the pronunciation dictionary in Unix timestamp. */
  archived_time_unix?: number | null;
  /** The description of the pronunciation dictionary. */
  description?: string | null;
  /** The rules in the latest version of the pronunciation dictionary. */
  rules: (PronunciationDictionaryAliasRuleResponseModel | PronunciationDictionaryPhonemeRuleResponseModel)[];
};

export type GetResponseUnitTestResponseModel = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataOutput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeOutput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelOutput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** A prompt that evaluates whether the agent's response is successful. Should return True or False. */
  success_condition?: string;
  /** Non-empty list of example responses that should be considered successful */
  success_examples?: (AgentSuccessfulResponseExample)[];
  /** Non-empty list of example responses that should be considered failures */
  failure_examples?: (AgentFailureResponseExample)[];
  id: string;
  name: string;
};

export type GetSipLogMessagesResponse = {
  sip_messages: (SipLogMessage)[];
  next_cursor?: string | null;
  has_more?: boolean;
};

export type GetScheduleParams = {
  smb_tool_type?: string;
  include_location_filter?: boolean;
};

export type GetSecretDependenciesResponseModel = {
  dependencies: (DependentAvailableToolIdentifier | DependentUnknownToolIdentifier)[] | (DependentAvailableAgentIdentifier | DependentUnknownAgentIdentifier)[] | (DependentPhoneNumberIdentifier)[];
  /** Cursor for fetching the next page of dependencies */
  next_cursor?: string | null;
};

export type GetSimulationTestResponseModel = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataOutput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeOutput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelOutput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** A prompt that evaluates whether the agent's response is successful. Should return True or False. */
  success_condition?: string;
  /** Description of the simulation scenario and user persona for simulation tests. */
  simulation_scenario?: string;
  /** Maximum number of conversation turns for simulation tests. */
  simulation_max_turns?: number;
  /** The environment to use when running this simulation test. If not provided, defaults to 'production'. */
  simulation_environment?: string | null;
  /** Configuration for which tools to mock and fallback behavior. */
  tool_mock_config?: SimulationToolMockBehaviorConfig;
  /** LLM model to use for evaluating simulation results. Defaults to Claude Sonnet 4.6. */
  evaluation_model?: Llm | null;
  /** LLM model for the simulated user. Defaults to Claude Sonnet 4.6. */
  simulated_user_model?: Llm | null;
  id: string;
  name: string;
};

export type GetSpeechHistoryResponseModel = {
  /** A list of speech history items. */
  history: (SpeechHistoryItemResponseModel)[];
  /** The ID of the last history item. */
  last_history_item_id?: string | null;
  /** Whether there are more history items to fetch. */
  has_more: boolean;
  /** The timestamp of the last history item. */
  scanned_until?: number | null;
};

export type GetTestInvocationsPageResponseModel = {
  meta?: ListResponseMeta;
  results: (TestInvocationSummaryResponseModel)[];
  /** Cursor for the next page of results */
  next_cursor?: string | null;
  /** Whether there are more results available */
  has_more: boolean;
};

export type GetTestSuiteInvocationResponseModel = {
  id: string;
  agent_id?: string | null;
  branch_id?: string | null;
  created_at?: number;
  folder_id?: string | null;
  repeat_count?: number;
  /** None when repeat_count==1 (no bucketing). Otherwise tracks bucketing lifecycle. */
  bucketing_status?: BucketingStatus | null;
  result_groups?: (TestRunResultSummary)[];
  test_runs: (UnitTestRunResponseModel)[];
};

export type GetTestsPageResponseModel = {
  tests: (UnitTestSummaryResponseModel)[];
  next_cursor?: string | null;
  has_more: boolean;
};

export type GetTestsSummariesByIdsResponseModel = {
  /** Dictionary mapping test IDs to their summary information */
  tests: { [key: string]: UnitTestSummaryResponseModel | undefined };
};

export type GetToolCallUnitTestResponseModel = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataOutput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeOutput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelOutput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** How to evaluate the agent's tool call (if any). If empty, the tool call is not evaluated. */
  tool_call_parameters?: UnitTestToolCallEvaluationModelOutput | null;
  /** If set to True this test will pass if any tool call returned by the LLM matches the criteria. Otherwise it will fail if more than one tool is returned by the agent. */
  check_any_tool_matches?: boolean | null;
  id: string;
  name: string;
};

export type GetToolDependentAgentsResponseModel = {
  agents: (DependentAvailableAgentIdentifier | DependentUnknownAgentIdentifier)[];
  branches?: (DependentBranchInfo)[];
  next_cursor?: string | null;
  has_more: boolean;
};

export type GetToolExecutionsPageResponseModel = {
  executions: (ToolExecutionResponseModel)[];
  next_cursor?: string | null;
  has_more: boolean;
};

export type GetVoicesResponseModel = {
  /** A list of available voices. */
  voices: (VoiceResponseModel)[];
};

export type GetVoicesV2ResponseModel = {
  /** The list of voices matching the query. */
  voices: (VoiceResponseModel)[];
  /** Indicates whether there are more voices available in subsequent pages. Use this flag (and next_page_token) for reliable pagination instead of relying on total_count. */
  has_more: boolean;
  /** The total count of voices matching the query. This value is a live snapshot that reflects the current state of the database and may change between requests as users create, modify, or delete voices. For reliable pagination, use the has_more flag instead of relying on this value. Only request this field when you actually need the total count (e.g., for display purposes), as calculating it incurs a performance cost. */
  total_count: number;
  /** Token to retrieve the next page of results. Pass this value to the next request to continue pagination. Null if there are no more results. */
  next_page_token?: string | null;
};

export type GetWhatsAppAccountResponse = {
  business_account_id: string;
  phone_number_id: string;
  business_account_name: string;
  phone_number_name: string;
  phone_number: string;
  assigned_agent_id?: string | null;
  enable_messaging?: boolean;
  enable_audio_message_response?: boolean;
  assigned_agent_name: string | null;
  is_token_expired?: boolean;
};

export type GetWorkspaceSecretsResponseModel = {
  secrets: (ConvAiWorkspaceStoredSecretConfig)[];
  /** Cursor for fetching the next page of secrets */
  next_cursor?: string | null;
};

/** OCSF Activity IDs for Group Management [3006] events.  Spec: https://schema.ocsf.io/1.6.0/classes/group_management */
export type GroupManagementActivityId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 99;

export type GuardrailExecutionMode = "streaming" | "blocking";

export type GuardrailsV1Input = {
  version?: string;
  focus?: FocusGuardrail;
  prompt_injection?: PromptInjectionGuardrail;
  content?: ContentGuardrailInput;
  moderation?: ModerationGuardrailInput | null;
  custom?: CustomGuardrailInput;
};

export type GuardrailsV1Output = {
  version?: string;
  focus?: FocusGuardrail;
  prompt_injection?: PromptInjectionGuardrail;
  content?: ContentGuardrailOutput;
  moderation?: ModerationGuardrailOutput | null;
  custom?: CustomGuardrailOutput;
};

export type HttpValidationError = {
  detail?: (ValidationError)[];
};

export type HistoryAlignmentResponseModel = {
  /** The characters in the alignment. */
  characters: (string)[];
  /** The start times of the characters in seconds. */
  character_start_times_seconds: (number)[];
  /** The end times of the characters in seconds. */
  character_end_times_seconds: (number)[];
};

export type HistoryAlignmentsResponseModel = {
  /** The alignment of the text. */
  alignment: HistoryAlignmentResponseModel;
  /** The normalized alignment of the text. */
  normalized_alignment: HistoryAlignmentResponseModel;
};

export type HtmlExportOptions = {
  include_speakers?: boolean;
  include_timestamps?: boolean;
  format: string;
  segment_on_silence_longer_than_s?: number | null;
  max_segment_duration_s?: number | null;
  max_segment_chars?: number | null;
};

/** HTTP request details.  Spec: https://schema.ocsf.io/1.6.0/objects/http_request */
export type HttpRequestModel = {
  /** HTTP method (GET, POST, etc.) */
  http_method: string;
  /** Request URL object */
  url: UrlModel;
  /** User agent string */
  user_agent?: string | null;
  /** X-Forwarded-For header as a list */
  x_forwarded_for?: (string)[] | null;
};

/** An icon for display in user interfaces. */
export type Icon = {
  src: string;
  mimeType?: string | null;
  sizes?: (string)[] | null;
  [key: string]: unknown;
};

export type ImageAnalysis = {
  status: "processing" | "completed" | "failed";
  data: ImageAnalysisResult | null;
  updated_at_ms?: number;
};

export type ImageAnalysisResult = {
  title: string;
  description: string;
  content_type?: string | null;
  mood_and_style?: string | null;
  composition_notes?: string | null;
  /** Readable text overlaid or shown in the image, if any. */
  visible_text?: string | null;
  subjects?: (ImageSubject)[];
};

export type ImageAvatar = {
  /** The type of the avatar */
  type?: string;
  /** The URL of the avatar */
  url?: string;
};

export type ImageSubject = {
  name: string;
  description: string;
};

export type InboundSipTrunkConfigRequestModel = {
  /** List of IP addresses that are allowed to use the trunk. Each item in the list can be an individual IP address or a Classless Inter-Domain Routing notation representing a CIDR block. */
  allowed_addresses?: (string)[] | null;
  /** List of phone numbers that are allowed to use the trunk. */
  allowed_numbers?: (string)[] | null;
  /** Whether or not to encrypt media (data layer). */
  media_encryption?: SipMediaEncryptionEnum;
  /** Optional digest authentication credentials (username/password). */
  credentials?: SipTrunkCredentialsRequestModel | null;
  /** Domains of remote SIP servers used to validate TLS certificates. */
  remote_domains?: (string)[] | null;
  /** Map of dynamic variable name to header name for attributes_to_headers */
  attributes_to_headers?: { [key: string]: string | undefined };
};

export type IntegrationType = "mcp_server" | "mcp_integration";

export type InteractionBudget = "realtime" | "async";

export type InvoiceResponseModel = {
  /** The amount due in cents. */
  amount_due_cents: number;
  /** The subtotal amount in cents before tax (exclusive of tax and discounts). */
  subtotal_cents?: number | null;
  /** The tax amount in cents. */
  tax_cents?: number | null;
  /** Deprecated. Use [discounts] instead. The discount applied to the invoice. E.g. [20.0f] for 20% off. */
  discount_percent_off?: number | null;
  /** Deprecated. Use [discounts] instead. The discount applied to the invoice. E.g. [20.0f] for 20 cents off. */
  discount_amount_off?: number | null;
  /** The discounts applied to the invoice. */
  discounts: (DiscountResponseModel)[];
  /** The Unix timestamp of the next payment attempt. -1 when there is no next payment attempt. */
  next_payment_attempt_unix: number;
  /** Deprecated. Use [payment_intent_statusses] instead. The status of this invoice's first payment intent. None when there is no payment intent. */
  payment_intent_status: "canceled" | "processing" | "requires_action" | "requires_capture" | "requires_confirmation" | "requires_payment_method" | "succeeded" | null;
  /** The statuses of this invoice's payment intents. Empty list when there are no payment intents. */
  payment_intent_statusses: ("canceled" | "processing" | "requires_action" | "requires_capture" | "requires_confirmation" | "requires_payment_method" | "succeeded")[];
};

export type ItemId = string;

export type KnowledgeBaseContentSearchResponseModel = {
  results: (KnowledgeBaseContentSearchResult)[];
  next_cursor?: string | null;
};

export type KnowledgeBaseContentSearchResult = {
  document: GetKnowledgeBaseSummaryUrlResponseModel | GetKnowledgeBaseSummaryFileResponseModel | GetKnowledgeBaseSummaryTextResponseModel | GetKnowledgeBaseSummaryFolderResponseModel;
  search_snippet?: (SearchHighlightSegment)[] | null;
  score: number;
};

export type KnowledgeBaseDependentType = "direct" | "transitive" | "all";

export type KnowledgeBaseDocumentChunkResponseModel = {
  id: string;
  name: string;
  content: string;
};

export type KnowledgeBaseDocumentChunksResponseModel = {
  chunks: (KnowledgeBaseDocumentChunkResponseModel)[];
  next_cursor?: string | null;
};

export type KnowledgeBaseDocumentMetadataResponseModel = {
  created_at_unix_secs: number;
  last_updated_at_unix_secs: number;
  size_bytes: number;
};

export type KnowledgeBaseDocumentType = "file" | "url" | "text" | "folder";

export type KnowledgeBaseFolderPathSegmentResponseModel = {
  id: string;
  name: string | null;
};

export type KnowledgeBaseFolderPathSegmentSummaryResponseModel = {
  id: string;
};

export type KnowledgeBaseLocator = {
  /** The type of the knowledge base */
  type: KnowledgeBaseDocumentType;
  /** The name of the knowledge base */
  name: string;
  /** The ID of the knowledge base */
  id: string;
  /** The usage mode of the knowledge base */
  usage_mode?: DocumentUsageModeEnum;
};

export type KnowledgeBaseRagToolConfig = {
  system_tool_type?: string;
};

export type KnowledgeBaseRagToolResultModel = {
  result_type?: string;
  status?: KnowledgeBaseRagToolStatus;
  /** Number of relevant chunks retrieved */
  chunk_count?: number;
  /** Human-readable status for the LLM about the search results */
  message?: string;
};

export type KnowledgeBaseRagToolStatus = "success" | "no_documents" | "no_results";

export type KnowledgeBaseSortBy = "name" | "created_at" | "updated_at" | "size";

export type KnowledgeBaseSourceFileUrlResponseModel = {
  /** Signed URL to download the source file directly */
  signed_url: string;
};

export type KnowledgeBaseSummaryBatchSuccessfulResponseModel = {
  status: string;
  data: GetKnowledgeBaseSummaryUrlResponseModel | GetKnowledgeBaseSummaryFileResponseModel | GetKnowledgeBaseSummaryTextResponseModel | GetKnowledgeBaseSummaryFolderResponseModel;
};

export type Llm = "gpt-4o-mini" | "gpt-4o" | "gpt-4" | "gpt-4-turbo" | "gpt-4.1" | "gpt-4.1-mini" | "gpt-4.1-nano" | "gpt-5" | "gpt-5.1" | "gpt-5.2" | "gpt-5.2-chat-latest" | "gpt-5.4" | "gpt-5.4-mini" | "gpt-5.4-nano" | "gpt-5.5" | "gpt-5-mini" | "gpt-5-nano" | "gpt-3.5-turbo" | "gemini-1.5-pro" | "gemini-1.5-flash" | "gemini-2.0-flash" | "gemini-2.0-flash-lite" | "gemini-2.5-flash-lite" | "gemini-2.5-flash" | "gemini-3-pro-preview" | "gemini-3-flash-preview" | "gemini-3.1-pro-preview" | "gemini-3.1-flash-lite-preview" | "gemini-3.1-flash-lite" | "gemini-3.5-flash" | "claude-sonnet-4-5" | "claude-opus-4-7" | "claude-sonnet-4-6" | "claude-sonnet-4" | "claude-haiku-4-5" | "claude-3-7-sonnet" | "claude-3-5-sonnet" | "claude-3-5-sonnet-v1" | "claude-3-haiku" | "grok-beta" | "custom-llm" | "qwen3-4b" | "qwen3-30b-a3b" | "qwen36-35b-a3b" | "qwen35-397b-a17b" | "gpt-oss-20b" | "gpt-oss-120b" | "glm-45-air-fp8" | "gemini-2.5-flash-preview-09-2025" | "gemini-2.5-flash-lite-preview-09-2025" | "gemini-2.5-flash-preview-05-20" | "gemini-2.5-flash-preview-04-17" | "gemini-2.5-flash-lite-preview-06-17" | "gemini-2.0-flash-lite-001" | "gemini-2.0-flash-001" | "gemini-1.5-flash-002" | "gemini-1.5-flash-001" | "gemini-1.5-pro-002" | "gemini-1.5-pro-001" | "claude-sonnet-4@20250514" | "claude-sonnet-4-5@20250929" | "claude-haiku-4-5@20251001" | "claude-3-7-sonnet@20250219" | "claude-3-5-sonnet@20240620" | "claude-3-5-sonnet-v2@20241022" | "claude-3-haiku@20240307" | "gpt-5-2025-08-07" | "gpt-5.1-2025-11-13" | "gpt-5.2-2025-12-11" | "gpt-5.4-2026-03-05" | "gpt-5.4-mini-2026-03-17" | "gpt-5.4-nano-2026-03-17" | "gpt-5.5-2026-04-23" | "gpt-5-mini-2025-08-07" | "gpt-5-nano-2025-08-07" | "gpt-4.1-2025-04-14" | "gpt-4.1-mini-2025-04-14" | "gpt-4.1-nano-2025-04-14" | "gpt-4o-mini-2024-07-18" | "gpt-4o-2024-11-20" | "gpt-4o-2024-08-06" | "gpt-4o-2024-05-13" | "gpt-4-0613" | "gpt-4-0314" | "gpt-4-turbo-2024-04-09" | "gpt-3.5-turbo-0125" | "gpt-3.5-turbo-1106" | "watt-tool-8b" | "watt-tool-70b";

export type LlmCategoryUsage = {
  irreversible_generation?: LlmUsageOutput;
  initiated_generation?: LlmUsageOutput;
};

export type LlmDeprecationConfigModel = {
  /** Number of days before the provider deprecation date when warnings start being shown. */
  warning_start_days: number;
  /** Number of days before the provider deprecation date when traffic starts being routed to the replacement model. */
  fallback_start_days: number;
  /** Number of days before the provider deprecation date when all traffic is routed to the replacement model. */
  fallback_complete_days: number;
  /** Percentage of traffic routed to the replacement model when fallback begins. */
  fallback_start_percentage: number;
  /** Percentage of traffic routed to the replacement model when fallback is complete. */
  fallback_complete_percentage: number;
};

export type LlmDeprecationInfoModel = {
  /** The identifier of the deprecated LLM model. */
  llm: Llm;
  /** Whether this model is currently deprecated. True if the model is immediately deprecated or within the warning period. */
  is_deprecated: boolean;
  /** Whether this model is currently in the warning period before deprecation. */
  is_in_warning_period?: boolean;
  /** Whether traffic is currently being progressively routed to the replacement model. */
  is_in_fallback_period?: boolean;
  /** Current percentage of traffic being routed to the replacement model (0-100). */
  fallback_percentage?: number;
  /** The date when the model provider will deprecate this model. Null for immediately deprecated models. */
  provider_deprecation_date?: string | null;
  /** The model that replaces this deprecated model. Traffic will be automatically routed to this model. */
  replacement_model?: Llm | null;
  /** Custom deprecation timing configuration for this model. Null if using the default configuration. */
  deprecation_config?: LlmDeprecationConfigModel | null;
};

export type LlmInfoModelInput = {
  /** The model identifier. */
  llm: Llm;
  /** Whether this is a pinned checkpoint version of a model rather than a top-level alias. */
  is_checkpoint: boolean;
  /** Maximum number of output tokens the model can generate. */
  max_tokens_limit: number;
  /** Maximum number of input context tokens the model supports. */
  max_context_limit: number;
  /** Whether the model supports image file inputs during conversations. */
  supports_image_input: boolean;
  /** Whether the model supports document (PDF) file inputs during conversations. */
  supports_document_input: boolean;
  /** Whether the model supports calling multiple tools in parallel. */
  supports_parallel_tool_calls: boolean;
  /** Available reasoning effort levels for this model. Null if the model does not support configurable reasoning. */
  available_reasoning_efforts?: (LlmReasoningEffort)[] | null;
  /** Deprecation information if this model is deprecated or scheduled for deprecation. Null if the model is not affected. */
  deprecation_info?: LlmDeprecationInfoModel | null;
  /** Regional processing surcharge details if this model has additional costs in the current deployment region. Null if no surcharge applies. */
  regional_processing_surcharge?: RegionalProcessingSurchargeInfo | null;
};

export type LlmInfoModelOutput = {
  /** The model identifier. */
  llm: Llm;
  /** Whether this is a pinned checkpoint version of a model rather than a top-level alias. */
  is_checkpoint: boolean;
  /** Maximum number of output tokens the model can generate. */
  max_tokens_limit: number;
  /** Maximum number of input context tokens the model supports. */
  max_context_limit: number;
  /** Whether the model supports image file inputs during conversations. */
  supports_image_input: boolean;
  /** Whether the model supports document (PDF) file inputs during conversations. */
  supports_document_input: boolean;
  /** Whether the model supports calling multiple tools in parallel. */
  supports_parallel_tool_calls: boolean;
  /** Available reasoning effort levels for this model. Null if the model does not support configurable reasoning. */
  available_reasoning_efforts?: (LlmReasoningEffort)[] | null;
  /** Deprecation information if this model is deprecated or scheduled for deprecation. Null if the model is not affected. */
  deprecation_info?: LlmDeprecationInfoModel | null;
  /** Regional processing surcharge details if this model has additional costs in the current deployment region. Null if no surcharge applies. */
  regional_processing_surcharge?: RegionalProcessingSurchargeInfo | null;
};

export type LlmInputOutputTokensUsage = {
  input?: LlmTokensCategoryUsage;
  input_cache_read?: LlmTokensCategoryUsage;
  input_cache_write?: LlmTokensCategoryUsage;
  output_total?: LlmTokensCategoryUsage;
};

export type LlmListResponseModelInput = {
  /** List of all available LLM models that can be used with agents. */
  llms: (LlmInfoModelInput)[];
  /** The default deprecation timing configuration used for models without a custom override. */
  default_deprecation_config: LlmDeprecationConfigModel;
};

export type LlmListResponseModelOutput = {
  /** List of all available LLM models that can be used with agents. */
  llms: (LlmInfoModelOutput)[];
  /** The default deprecation timing configuration used for models without a custom override. */
  default_deprecation_config: LlmDeprecationConfigModel;
};

export type LlmLiteralJsonSchemaProperty = {
  type: "boolean" | "string" | "integer" | "number";
  description: string;
  /** List of allowed string values for string type parameters */
  enum?: (string)[] | null;
};

export type LlmParameterEvaluationStrategy = {
  type: string;
  /** A description of the evaluation strategy to use for the test. */
  description: string;
};

export type LlmReasoningEffort = "none" | "minimal" | "low" | "medium" | "high" | "xhigh";

export type LlmSchemaOverride = {
  source?: string;
  /** Prompt override for the LLM. If not provided, the original schema description is used. */
  prompt?: string | null;
};

export type LlmTokensCategoryUsage = {
  tokens?: number;
  price?: number;
};

export type LlmUsageInput = {
  model_usage?: { [key: string]: LlmInputOutputTokensUsage | undefined };
};

export type LlmUsageOutput = {
  model_usage?: { [key: string]: LlmInputOutputTokensUsage | undefined };
};

export type LlmUsageCalculatorLlmResponseModel = {
  llm: Llm;
  price_per_minute: number;
};

export type LlmUsageCalculatorPublicRequestModel = {
  /** Length of the prompt in characters. */
  prompt_length: number;
  /** Pages of content in PDF documents or URLs in the agent's knowledge base. */
  number_of_pages: number;
  /** Whether RAG is enabled. */
  rag_enabled: boolean;
};

export type LlmUsageCalculatorRequestModel = {
  /** Length of the prompt in characters. */
  prompt_length?: number | null;
  /** Pages of content in pdf documents OR urls in agent's Knowledge Base. */
  number_of_pages?: number | null;
  /** Whether RAG is enabled. */
  rag_enabled?: boolean | null;
};

export type LlmUsageCalculatorResponseModel = {
  llm_prices: (LlmUsageCalculatorLlmResponseModel)[];
};

export type LanguageAddedResponse = {
  version: number;
};

export type LanguageDetectionToolConfig = {
  system_tool_type?: string;
};

export type LanguageDetectionToolResultModel = {
  result_type?: string;
  status?: string;
  reason?: string | null;
  language?: string | null;
};

export type LanguageInfo = {
  /** The language code (e.g. 'en', 'fr', 'es-ES'). */
  code: string;
  /** The human-readable language name (e.g. 'English', 'French', 'Spanish (Spain)'). */
  label: string;
};

export type LanguagePairInfo = {
  /** The source language. */
  source_language: LanguageInfo;
  /** The available destination languages for this source language. */
  destination_languages: (LanguageInfo)[];
};

export type LanguagePresetInput = {
  /** The overrides for the language preset */
  overrides: ConversationConfigClientOverrideInput;
  /** The translation of the first message */
  first_message_translation?: LanguagePresetTranslation | null;
  /** The translation of the soft timeout message */
  soft_timeout_translation?: LanguagePresetTranslation | null;
};

export type LanguagePresetOutput = {
  /** The overrides for the language preset */
  overrides: ConversationConfigClientOverrideOutput;
  /** The translation of the first message */
  first_message_translation?: LanguagePresetTranslation | null;
  /** The translation of the soft timeout message */
  soft_timeout_translation?: LanguagePresetTranslation | null;
};

export type LanguagePresetTranslation = {
  source_hash: string;
  text: string;
};

export type LanguageResponseModel = {
  /** The unique identifier of the language. */
  language_id: string;
  /** The name of the language. */
  name: string;
};

export type LanguagesResponse = PairedLanguagesResponse | SingleLanguagesResponse;

export type LeaveMessageParams = {
  smb_tool_type?: string;
};

export type LibraryVoiceResponseModel = {
  /** The public owner id of the voice. */
  public_owner_id: string;
  /** The id of the voice. */
  voice_id: string;
  /** The date the voice was added to the library in Unix time. */
  date_unix: number;
  /** The name of the voice. */
  name: string;
  /** The accent of the voice. */
  accent: string;
  /** The gender of the voice. */
  gender: string;
  /** The age of the voice. */
  age: string;
  /** The descriptive of the voice. */
  descriptive: string;
  /** The use case of the voice. */
  use_case: string;
  /** The category of the voice. */
  category: "generated" | "cloned" | "premade" | "professional" | "famous" | "high_quality";
  /** The language of the voice. */
  language?: string | null;
  /** The locale of the voice. */
  locale?: string | null;
  /** The description of the voice. */
  description?: string | null;
  /** The preview URL of the voice. */
  preview_url?: string | null;
  /** The usage character count of the voice in the last year. */
  usage_character_count_1y: number;
  /** The usage character count of the voice in the last 7 days. */
  usage_character_count_7d: number;
  /** The play API usage character count of the voice in the last year. */
  play_api_usage_character_count_1y: number;
  /** The number of times the voice has been cloned. */
  cloned_by_count: number;
  /** The rate multiplier of the voice. */
  rate?: number | null;
  /** The rate of the voice in USD per 1000 credits. null if default */
  fiat_rate?: number | null;
  /** Whether free users are allowed to use the voice. */
  free_users_allowed: boolean;
  /** Whether live moderation is enabled for the voice. */
  live_moderation_enabled: boolean;
  /** Whether the voice is featured. */
  featured: boolean;
  /** The verified languages of the voice. */
  verified_languages?: (VerifiedVoiceLanguageResponseModel)[] | null;
  /** The notice period of the voice. */
  notice_period?: number | null;
  /** The Instagram username of the voice. */
  instagram_username?: string | null;
  /** The Twitter username of the voice. */
  twitter_username?: string | null;
  /** The YouTube username of the voice. */
  youtube_username?: string | null;
  /** The TikTok username of the voice. */
  tiktok_username?: string | null;
  /** The image URL of the voice. */
  image_url?: string | null;
  /** Whether the voice was added by the user. */
  is_added_by_user?: boolean | null;
  /** Whether the voice is bookmarked by the current user. Only relevant when is_added_by_user is True. */
  is_bookmarked?: boolean | null;
};

export type ListAgentRulesParams = {
  smb_tool_type?: string;
};

export type ListAssetsParams = {
  list_kwargs?: { [key: string]: unknown };
  smb_tool_type?: string;
};

export type ListAuthConnectionsResponse = {
  auth_connections: (OAuth2ClientCredsResponse | BasicAuthResponse | BearerAuthResponse | OAuth2JwtResponse | PrivateKeyJwtResponse | MtlsAuthResponse | CustomHeaderAuthResponse | ApiIntegrationOAuth2AuthCodeResponse | ApiIntegrationOAuth2CustomAppResponse | WhatsAppAuthResponse | SlackBotAuthResponse)[];
};

export type ListCalendarEventsParams = {
  smb_tool_type?: string;
  include_cancelled?: boolean;
};

export type ListClientInteractionsParams = {
  smb_tool_type?: string;
};

/** List clients ordered by most recently updated, with an optional limit. */
export type ListClientsParams = {
  smb_tool_type?: string;
};

/** List every customer-facing agent on the workspace.  The assistant uses this whenever it needs to act on a specific customer-facing agent (rules, config edits, etc.) so it can pick the right ``agent_id`` to pass to mutating tools. Mirrors the ``list_services`` / ``list_clients`` pattern: read once, then mutate by id. */
export type ListCustomerFacingAgentsParams = {
  smb_tool_type?: string;
};

/** List scheduled group sessions for a group service in a date range.  Group services are scheduled in advance (e.g. yoga classes, workshops) and callers register against an existing session. Use this for group services; use ``check_service_availability`` for appointment / rental services. */
export type ListGroupSessionsParams = {
  smb_tool_type?: string;
};

export type ListHolidaysParams = {
  smb_tool_type?: string;
};

export type ListLocationsParams = {
  smb_tool_type?: string;
};

/** Response model for testing tools available on an MCP server. */
export type ListMcpToolsResponseModel = {
  /** Indicates if the operation was successful. */
  success: boolean;
  /** A list of tools available on the MCP server. */
  tools: (Tool)[];
  /** Error message if the operation was not successful. */
  error_message?: string | null;
};

export type ListOrdersResponse = {
  /** The list of orders matching the query. */
  orders: (OrderSummary)[];
};

export type ListProductsParams = {
  list_kwargs?: { [key: string]: unknown };
  smb_tool_type?: string;
};

export type ListResponseMeta = {
  total?: number | null;
  page?: number | null;
  page_size?: number | null;
};

export type ListResponseAgentBranchSummary = {
  meta?: ListResponseMeta;
  results: (AgentBranchSummary)[];
};

export type ListServicesParams = {
  list_kwargs?: { [key: string]: unknown };
  smb_tool_type?: string;
};

export type ListSpeechEnginesResponse = {
  /** The speech engines matching the query */
  speech_engines: (SpeechEngineSummaryResponse)[];
  /** Cursor for fetching the next page */
  next_cursor?: string | null;
  /** Whether there are more results */
  has_more: boolean;
};

export type ListStaffParams = {
  list_kwargs?: { [key: string]: unknown };
  smb_tool_type?: string;
};

export type ListTestsByIdsRequestModel = {
  /** List of test IDs to fetch. No duplicates allowed. */
  test_ids: (string)[];
};

export type ListWhatsAppAccountsResponse = {
  items: (GetWhatsAppAccountResponse)[];
};

/** Schema property for literal JSON types. IMPORTANT: Only ONE of the following fields can be set: description (LLM provides value), dynamic_variable (value from variable), is_system_provided (system provides value), or constant_value (fixed value). These are mutually exclusive. */
export type LiteralJsonSchemaProperty = {
  type: "boolean" | "string" | "integer" | "number";
  /** The description of the property. When set, the LLM will provide the value based on this description. Mutually exclusive with dynamic_variable, is_system_provided, and constant_value. */
  description?: string;
  /** List of allowed string values for string type parameters */
  enum?: (string)[] | null;
  /** If true, the value will be populated by the system at runtime. Used by API Integration Webhook tools for templating. Mutually exclusive with description, dynamic_variable, and constant_value. */
  is_system_provided?: boolean;
  /** The name of the dynamic variable to use for this property's value. Mutually exclusive with description, is_system_provided, and constant_value. */
  dynamic_variable?: string;
  /** A constant value to use for this property. Mutually exclusive with description, dynamic_variable, and is_system_provided. */
  constant_value?: string | number | number | boolean;
};

export type LivekitStackType = "standard" | "static";

export type LoadProcedureToolConfigInput = {
  system_tool_type?: string;
  procedures?: { [key: string]: ProcedureAtVersion | undefined };
};

export type LoadProcedureToolConfigOutput = {
  system_tool_type?: string;
  procedures?: { [key: string]: ProcedureAtVersion | undefined };
};

export type LoadProcedureToolErrorStatus = "not_found" | "invalid_name";

/** Defines the MCP server-level approval policy for tool execution. */
export type McpApprovalPolicy = "auto_approve_all" | "require_approval_all" | "require_approval_per_tool";

/** Request model for updating MCP Server approval mode. */
export type McpApprovalPolicyUpdateRequestModel = {
  /** The approval mode to set for the MCP server */
  approval_policy: McpApprovalPolicy;
};

export type McpServerConfigInput = {
  approval_policy?: McpApprovalPolicy;
  /** List of tool approval hashes for per-tool approval when approval_policy is REQUIRE_APPROVAL_PER_TOOL */
  tool_approval_hashes?: (McpToolApprovalHash)[];
  /** The transport type used to connect to the MCP server */
  transport?: McpServerTransport;
  /** The URL of the MCP server, if this contains a secret please store as a workspace secret, otherwise store as a plain string. Must use https */
  url: string | ConvAiSecretLocator;
  /** The secret token (Authorization header) stored as a workspace secret or in-place secret */
  secret_token?: ConvAiSecretLocator | ConvAiUserSecretDbModel | null;
  /** The headers included in the request */
  request_headers?: { [key: string]: string | ConvAiSecretLocator | ConvAiDynamicVariable | ConvAiEnvVarLocator | undefined };
  /** Optional auth connection to use for authentication with this MCP server */
  auth_connection?: AuthConnectionLocator | EnvironmentAuthConnectionLocator | null;
  name: string;
  description?: string;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, all tools from this MCP server will require pre-tool execution speech. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. Applies to every tool from this MCP server unless overridden per tool. */
  pre_tool_speech?: PreToolSpeechMode;
  /** If true, the user will not be able to interrupt the agent while any tool from this MCP server is running. */
  disable_interruptions?: boolean;
  /** Predefined tool call sound type to play during tool execution for all tools from this MCP server */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play for all tools from this MCP server */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Determines when and how all tools from this MCP server execute: 'immediate' executes the tool right away when requested by the LLM, 'post_tool_speech' waits for the agent to finish speaking before executing, 'async' runs the tool in the background without blocking - best for long-running operations. */
  execution_mode?: ToolExecutionMode;
  /** The maximum time in seconds to wait for each MCP tool call to complete. Must be between 5 and 300 seconds (inclusive). */
  response_timeout_secs?: number;
  /** List of per-tool configuration overrides that override the server-level defaults for specific tools */
  tool_config_overrides?: (McpToolConfigOverrideInput)[];
  /** Whether to disable HTTP compression for this MCP server. Enable this if the server does not support compressed responses. */
  disable_compression?: boolean;
};

export type McpServerConfigOutput = {
  approval_policy?: McpApprovalPolicy;
  /** List of tool approval hashes for per-tool approval when approval_policy is REQUIRE_APPROVAL_PER_TOOL */
  tool_approval_hashes?: (McpToolApprovalHash)[];
  /** The transport type used to connect to the MCP server */
  transport?: McpServerTransport;
  /** The URL of the MCP server, if this contains a secret please store as a workspace secret, otherwise store as a plain string. Must use https */
  url: string | ConvAiSecretLocator;
  /** The secret token (Authorization header) stored as a workspace secret or in-place secret */
  secret_token?: ConvAiSecretLocator | ConvAiUserSecretDbModel | null;
  /** The headers included in the request */
  request_headers?: { [key: string]: string | ConvAiSecretLocator | ConvAiDynamicVariable | ConvAiEnvVarLocator | undefined };
  /** Optional auth connection to use for authentication with this MCP server */
  auth_connection?: AuthConnectionLocator | EnvironmentAuthConnectionLocator | null;
  name: string;
  description?: string;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, all tools from this MCP server will require pre-tool execution speech. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. Applies to every tool from this MCP server unless overridden per tool. */
  pre_tool_speech?: PreToolSpeechMode;
  /** If true, the user will not be able to interrupt the agent while any tool from this MCP server is running. */
  disable_interruptions?: boolean;
  /** Predefined tool call sound type to play during tool execution for all tools from this MCP server */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play for all tools from this MCP server */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Determines when and how all tools from this MCP server execute: 'immediate' executes the tool right away when requested by the LLM, 'post_tool_speech' waits for the agent to finish speaking before executing, 'async' runs the tool in the background without blocking - best for long-running operations. */
  execution_mode?: ToolExecutionMode;
  /** The maximum time in seconds to wait for each MCP tool call to complete. Must be between 5 and 300 seconds (inclusive). */
  response_timeout_secs?: number;
  /** List of per-tool configuration overrides that override the server-level defaults for specific tools */
  tool_config_overrides?: (McpToolConfigOverrideOutput)[];
  /** Whether to disable HTTP compression for this MCP server. Enable this if the server does not support compressed responses. */
  disable_compression?: boolean;
};

/** Unified request model for updating MCP Server configuration. */
export type McpServerConfigUpdateRequestModel = {
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
};

export type McpServerMetadataResponseModel = {
  created_at: number;
  owner_user_id?: string | null;
};

/** Request model for creating/updating an MCP Server configuration. */
export type McpServerRequestModel = {
  /** Configuration details for the MCP Server. */
  config: McpServerConfigInput;
};

/** Response model representing an MCP Server configuration. */
export type McpServerResponseModel = {
  id: string;
  config: McpServerConfigOutput;
  /** The access information of the MCP Server */
  access_info?: ResourceAccessInfo | null;
  /** List of agents that depend on this MCP Server. */
  dependent_agents?: (DependentAvailableAgentIdentifier | DependentUnknownAgentIdentifier)[];
  /** The metadata of the MCP Server */
  metadata: McpServerMetadataResponseModel;
};

/** Supported MCP server transport types. */
export type McpServerTransport = "SSE" | "STREAMABLE_HTTP";

/** Response model for a list of MCP Server configurations. */
export type McpServersResponseModel = {
  mcp_servers: (McpServerResponseModel)[];
};

/** Request model for adding approval for a single MCP tool. */
export type McpToolAddApprovalRequestModel = {
  /** The name of the MCP tool */
  tool_name: string;
  /** The description of the MCP tool */
  tool_description: string;
  /** The input schema of the MCP tool (the schema defined on the MCP server before ElevenLabs does any extra processing) */
  input_schema?: { [key: string]: unknown };
  /** The tool-level approval policy */
  approval_policy?: McpToolApprovalPolicy;
};

/** Model for storing tool approval hashes for per-tool approval. */
export type McpToolApprovalHash = {
  /** The name of the MCP tool */
  tool_name: string;
  /** SHA256 hash of the tool's parameters and description */
  tool_hash: string;
  /** The approval policy for this tool */
  approval_policy?: McpToolApprovalPolicy;
};

/** Defines the tool-level approval policy. */
export type McpToolApprovalPolicy = "auto_approved" | "requires_approval";

/** An MCP tool configuration that can be used to call MCP servers */
export type McpToolConfigInput = {
  type?: string;
  name: string;
  /** Description of when the tool should be used and what it does. */
  description: string;
  /** The maximum time in seconds to wait for the MCP tool call to complete. Must be between 5 and 300 seconds (inclusive). */
  response_timeout_secs?: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions?: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech?: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments?: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode?: ToolErrorHandlingMode;
  /** The type of MCP tool */
  integration_type: IntegrationType;
  /** Schema for any parameters the LLM needs to provide to the MCP tool. */
  parameters?: ObjectJsonSchemaPropertyInput | null;
  /** The approval policy for the MCP tool */
  approval_policy?: McpApprovalPolicy;
  /** The name of the MCP tool to call */
  mcp_tool_name: string;
  /** The description of the MCP tool to call */
  mcp_tool_description: string;
  /** The id of the MCP server to call */
  mcp_server_id: string;
  /** The name of the MCP server to call */
  mcp_server_name: string;
  /** Original inputSchema dict for consistent hashing */
  mcp_input_schema?: { [key: string]: unknown } | null;
  /** Determines when and how the tool executes: 'immediate' executes the tool right away when requested by the LLM, 'post_tool_speech' waits for the agent to finish speaking before executing, 'async' runs the tool in the background without blocking - best for long-running operations. */
  execution_mode?: ToolExecutionMode;
  /** Input parameter overrides for this tool */
  input_overrides?: { [key: string]: ConstantSchemaOverride | DynamicVariableSchemaOverride | LlmSchemaOverride | undefined } | null;
};

/** An MCP tool configuration that can be used to call MCP servers */
export type McpToolConfigOutput = {
  type?: string;
  name: string;
  /** Description of when the tool should be used and what it does. */
  description: string;
  /** The maximum time in seconds to wait for the MCP tool call to complete. Must be between 5 and 300 seconds (inclusive). */
  response_timeout_secs?: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions?: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech?: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments?: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode?: ToolErrorHandlingMode;
  /** The type of MCP tool */
  integration_type: IntegrationType;
  /** Schema for any parameters the LLM needs to provide to the MCP tool. */
  parameters?: ObjectJsonSchemaPropertyOutput | null;
  /** The approval policy for the MCP tool */
  approval_policy?: McpApprovalPolicy;
  /** The name of the MCP tool to call */
  mcp_tool_name: string;
  /** The description of the MCP tool to call */
  mcp_tool_description: string;
  /** The id of the MCP server to call */
  mcp_server_id: string;
  /** The name of the MCP server to call */
  mcp_server_name: string;
  /** Original inputSchema dict for consistent hashing */
  mcp_input_schema?: { [key: string]: unknown } | null;
  /** Determines when and how the tool executes: 'immediate' executes the tool right away when requested by the LLM, 'post_tool_speech' waits for the agent to finish speaking before executing, 'async' runs the tool in the background without blocking - best for long-running operations. */
  execution_mode?: ToolExecutionMode;
  /** Input parameter overrides for this tool */
  input_overrides?: { [key: string]: ConstantSchemaOverride | DynamicVariableSchemaOverride | LlmSchemaOverride | undefined } | null;
};

export type McpToolConfigOverrideInput = {
  /** The name of the MCP tool */
  tool_name: string;
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
  /** If set, overrides the server's response timeout for this MCP tool (seconds). */
  response_timeout_secs?: number | null;
  /** Dynamic variable assignments for this MCP tool */
  assignments?: (DynamicVariableAssignment)[];
  /** Mapping of json path to input override configuration */
  input_overrides?: { [key: string]: ConstantSchemaOverride | DynamicVariableSchemaOverride | LlmSchemaOverride | undefined } | null;
  /** Mock responses with optional parameter conditions. Evaluated top-to-bottom; first match wins. */
  response_mocks?: (ToolResponseMockConfigInput)[] | null;
};

export type McpToolConfigOverrideOutput = {
  /** The name of the MCP tool */
  tool_name: string;
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
  /** If set, overrides the server's response timeout for this MCP tool (seconds). */
  response_timeout_secs?: number | null;
  /** Dynamic variable assignments for this MCP tool */
  assignments?: (DynamicVariableAssignment)[];
  /** Mapping of json path to input override configuration */
  input_overrides?: { [key: string]: ConstantSchemaOverride | DynamicVariableSchemaOverride | LlmSchemaOverride | undefined } | null;
  /** Mock responses with optional parameter conditions. Evaluated top-to-bottom; first match wins. */
  response_mocks?: (ToolResponseMockConfigOutput)[] | null;
};

export type McpToolConfigOverrideCreateRequestModel = {
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
};

export type McpToolConfigOverrideUpdateRequestModel = {
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
};

/** Response model for mTLS auth connections. */
export type MtlsAuthResponse = {
  name: string;
  auth_type?: string;
  provider: string;
  id: string;
  used_by?: AuthConnectionDependencies | null;
};

export type ManualSource = {
  type?: string;
  created_by_user_id: string;
  notes?: string | null;
};

export type ManualVerificationFileResponseModel = {
  /** The ID of the file. */
  file_id: string;
  /** The name of the file. */
  file_name: string;
  /** The MIME type of the file. */
  mime_type: string;
  /** The size of the file in bytes. */
  size_bytes: number;
  /** The date of the file in Unix time. */
  upload_date_unix: number;
};

export type ManualVerificationResponseModel = {
  /** The extra text of the manual verification. */
  extra_text: string;
  /** The date of the manual verification in Unix time. */
  request_time_unix: number;
  /** The files of the manual verification. */
  files: (ManualVerificationFileResponseModel)[];
};

export type MatchAnythingParameterEvaluationStrategy = {
  type: string;
};

export type MediaId = string;

export type MemoryEntrySearchResult = {
  entry_id: string;
  version: number;
  summary?: string | null;
  text?: string | null;
  source?: ConversationSource | ManualSource | null;
};

export type MessageSearchSortBy = "search_score" | "created_at";

export type MessagesSearchResponse = {
  meta?: ListResponseMeta;
  results: (MessagesSearchResult)[];
  /** Cursor for the next page of results */
  next_cursor?: string | null;
  /** Whether there are more results available */
  has_more: boolean;
};

/** transcript_index: index of the message in the conversation transcript chunk_text: text of the transcript; transcript messages if very long could have several chunks. chunk_highlights: chunk_text split into matched/unmatched segments for highlighting.     Only populated for keyword/text search, not semantic search. score: similarity score of the message to the search query */
export type MessagesSearchResult = {
  conversation_id: string;
  agent_id: string;
  agent_name?: string | null;
  transcript_index: number;
  chunk_text: string;
  chunk_highlights?: (SearchHighlightSegment)[] | null;
  score: number;
  conversation_start_time_unix_secs: number;
};

export type MetricRecord = {
  elapsed_time: number;
};

export type MetricType = "credits" | "tts_characters" | "minutes_used" | "request_count" | "ttfb_avg" | "ttfb_p95" | "fiat_units_spent" | "concurrency" | "concurrency_average";

export type MockNoMatchBehavior = "call_real_tool" | "raise_error";

export type MockingStrategy = "all" | "selected" | "none";

export type ModelRatesResponseModel = {
  /** The cost multiplier for characters. */
  character_cost_multiplier: number;
  /** Discount multiplier applied to cost estimates. Defaults to 1.0 (no discount). */
  cost_discount_multiplier?: number;
};

export type ModelResponseModel = {
  /** The unique identifier of the model. */
  model_id: string;
  /** The name of the model. */
  name: string;
  /** Whether the model can be finetuned. */
  can_be_finetuned: boolean;
  /** Whether the model can do text-to-speech. */
  can_do_text_to_speech: boolean;
  /** Whether the model can do voice conversion. */
  can_do_voice_conversion: boolean;
  /** Whether the model can use style. */
  can_use_style: boolean;
  /** Whether the model can use speaker boost. */
  can_use_speaker_boost: boolean;
  /** Whether the model serves pro voices. */
  serves_pro_voices: boolean;
  /** The cost factor for the model. */
  token_cost_factor: number;
  /** The description of the model. */
  description: string;
  /** Whether the model requires alpha access. */
  requires_alpha_access: boolean;
  /** The maximum number of characters that can be requested by a free user. */
  max_characters_request_free_user: number;
  /** The maximum number of characters that can be requested by a subscribed user. */
  max_characters_request_subscribed_user: number;
  /** The maximum length of text that can be requested for this model. */
  maximum_text_length_per_request: number;
  /** The languages supported by the model. */
  languages: (LanguageResponseModel)[];
  /** The rates for the model. */
  model_rates: ModelRatesResponseModel;
  /** The concurrency group for the model. */
  concurrency_group: string;
};

export type ModelSettingsResponseModel = {
  /** Determines how stable the voice is and the randomness between each generation. Lower values introduce broader emotional range for the voice. Higher values can result in a monotonous voice with limited emotion. */
  stability?: number | null;
};

export type ModerationConfig = {
  sexual?: ThresholdGuardrail;
  violence?: ThresholdGuardrail;
  violence_graphic?: ThresholdGuardrail;
  harassment?: ThresholdGuardrail;
  harassment_threatening?: ThresholdGuardrail;
  hate?: ThresholdGuardrail;
  hate_threatening?: ThresholdGuardrail;
  self_harm_instructions?: ThresholdGuardrail;
  self_harm?: ThresholdGuardrail;
  self_harm_intent?: ThresholdGuardrail;
  sexual_minors?: ThresholdGuardrail;
};

export type ModerationGuardrailInput = {
  execution_mode?: GuardrailExecutionMode;
  config?: ModerationConfig;
};

export type ModerationGuardrailOutput = {
  execution_mode?: GuardrailExecutionMode;
  config?: ModerationConfig;
};

export type Monitor = "elevated_conversation_failure_rate" | "elevated_tool_failure_rate" | "webhook_error_spike";

/** Response model for multichannel speech-to-text transcription. */
export type MultichannelSpeechToTextResponseModel = {
  /** List of transcripts, one for each audio channel. Each transcript contains the text and word-level details for its respective channel. */
  transcripts: (SpeechToTextChunkResponseModel)[];
  /** The transcription ID of the response. */
  transcription_id?: string | null;
  /** The duration of the audio that was transcribed across all channels in seconds. */
  audio_duration_secs?: number | null;
};

/** Multipart response structure with JSON metadata and binary audio */
export type MultipartMusicResponse = {
  /** JSON metadata about the generated audio */
  metadata: DetailedMusicResponse;
  /** Binary audio data in the requested format */
  audio: string;
};

export type MusicExploreSongSourceContext = {
  source_type?: string;
  music_explore_song_id: string;
  title?: string | null;
  description?: string | null;
  bpm?: number | null;
  vocals?: string | null;
  lyrics?: string | null;
};

export type MusicGenerationMode = "track" | "loop" | "ambience" | "video_to_music";

export type MusicPrompt = {
  /** The styles and musical directions that should be present in the entire song. Use English language for best result. */
  positive_global_styles: (string)[];
  /** The styles and musical directions that should not be present in the entire song. Use English language for best result. */
  negative_global_styles: (string)[];
  /** The sections of the song. */
  sections: (SongSection)[];
};

/** Response model for music upload endpoint. */
export type MusicUploadResponse = {
  /** Unique identifier for the uploaded song */
  song_id: string;
  /** The composition plan extracted from the uploaded song. Only present if `extract_composition_plan` was True in the request body */
  composition_plan?: MusicPrompt | null;
};

export type NoCoachingSettings = {
  type?: string;
  memory_base_id?: string | null;
};

export type NonStreamingOutputFormats = "wav_8000" | "wav_16000" | "wav_22050" | "wav_24000" | "wav_32000" | "wav_44100" | "wav_48000";

/** Response model for oauth2 client creds */
export type OAuth2ClientCredsResponse = {
  name: string;
  auth_type?: string;
  provider: string;
  client_id: string;
  token_url: string;
  scopes?: (string)[];
  extra_params?: { [key: string]: string | undefined };
  /** If True, send client credentials in Authorization header as Basic Auth instead of request body */
  basic_auth_in_header?: boolean;
  id: string;
  used_by?: AuthConnectionDependencies | null;
  /** Custom headers configured for OAuth2 token requests */
  custom_headers?: { [key: string]: string | undefined };
};

/** Response model for OAuth2 JWT auth connections */
export type OAuth2JwtResponse = {
  name: string;
  auth_type?: string;
  provider: string;
  /** JWT signing algorithm */
  algorithm?: "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512";
  /** Key ID (kid) for JWT header - useful for key rotation */
  key_id?: string | null;
  /** JWT issuer (iss claim) */
  issuer: string;
  /** JWT audience (aud claim) */
  audience: string;
  /** JWT subject (sub claim) */
  subject: string;
  /** Token expiration time in seconds */
  expiration_seconds?: number;
  /** Additional custom claims to include in the JWT */
  extra_params?: { [key: string]: string | undefined };
  /** Token endpoint URL for exchanging JWT for access token */
  token_url: string;
  /** OAuth2 scopes to request when exchanging JWT for access token */
  scopes?: (string)[];
  /** Token field to extract from the token endpoint response. */
  token_response_field?: "access_token" | "id_token";
  id: string;
  used_by?: AuthConnectionDependencies | null;
};

export type OAuthConnectionStatus = "active" | "refresh_failed" | "revoked";

export type ObjectJsonSchemaPropertyInput = {
  type?: string;
  required?: (string)[];
  description?: string;
  properties?: { [key: string]: LiteralJsonSchemaProperty | ObjectJsonSchemaPropertyInput | ArrayJsonSchemaPropertyInput | undefined };
  required_constraints?: RequiredConstraints | null;
};

export type ObjectJsonSchemaPropertyOutput = {
  type?: string;
  required?: (string)[];
  description?: string;
  properties?: { [key: string]: LiteralJsonSchemaProperty | ObjectJsonSchemaPropertyOutput | ArrayJsonSchemaPropertyOutput | undefined };
  required_constraints?: RequiredConstraints | null;
};

export type OptInSmsReminderParams = {
  smb_tool_type?: string;
};

export type OptOutSmsReminderParams = {
  smb_tool_type?: string;
};

export type OrbAvatar = {
  /** The type of the avatar */
  type?: string;
  /** The first color of the avatar */
  color_1?: string;
  /** The second color of the avatar */
  color_2?: string;
};

/** Orchestrator-side config: tools are identified by resolved names. */
export type OrchestratorToolMockBehaviorConfig = {
  /** Which tools to mock: 'all' mocks every mockable tool, 'selected' mocks only those in mocked_tool_names/mocked_tool_ids, 'none' disables mocking. */
  mocking_strategy?: MockingStrategy;
  /** Behavior when no mock matches a tool call. */
  fallback_strategy?: MockNoMatchBehavior;
  /** Tool names to mock. Only used when mocking_strategy is 'selected'. */
  mocked_tool_names?: (string)[];
};

export type OrderDeliverablesResponse = {
  /** The list of delivered files for the order. Empty if the order is not yet completed. */
  deliverables: (DeliverableInfo)[];
};

export type OrderId = string;

export type OrderItemInfo = {
  /** The ID of the order item. */
  item_id: ItemId;
  /** The item configuration details. */
  item: OrderItemRequestOutput;
  /** The quoted price for this item. */
  quote?: QuoteInfo | null;
};

export type OrderItemKind = "dub" | "subtitles";

export type OrderItemRequestInput = DubOrderItemRequest | SubtitleOrderItemRequest;

export type OrderItemRequestOutput = DubOrderItemRequest | SubtitleOrderItemRequest;

export type OrderMediaResponse = {
  /** The ID of the media file. */
  media_id: MediaId;
  /** The original filename of the uploaded media. */
  name: string;
  /** The MIME type of the media file (e.g. 'video/mp4'). */
  content_type: string;
  /** The detected or declared language of the media, if available. */
  language?: string | null;
  /** A time-limited URL to download the media file. */
  signed_url: string;
};

export type OrderRequestState = "open" | "submitted" | "paid" | "accepted" | "rejected" | "done";

export type OrderResponse = {
  /** The ID of the order. */
  order_id: OrderId;
  /** The display name of the order. */
  name: string;
  /** The current state of the order. */
  state: OrderState;
  /** The list of items in this order with their quotes. */
  items: (OrderItemInfo)[];
  /** The total price for all items in USD. Excluded from response until quotes are available. */
  total_amount_usd?: number | null;
  /** Whether this is a sandbox order that auto-progresses without producer intervention. */
  sandbox?: boolean;
  /** The timestamp when the order was created. */
  created_at: string;
  /** The timestamp when the order was submitted, if applicable. */
  submitted_at?: string | null;
  /** The timestamp when payment was received, if applicable. */
  paid_at?: string | null;
  /** The timestamp when the order was accepted for production, if applicable. */
  accepted_at?: string | null;
  /** The timestamp when the order was completed, if applicable. */
  completed_at?: string | null;
};

export type OrderState = "open" | "submitted" | "paid" | "accepted" | "rejected" | "done";

export type OrderSummary = {
  /** The ID of the order. */
  order_id: OrderId;
  /** The display name of the order. */
  name: string;
  /** The current state of the order. */
  state: OrderState;
  /** The total price for all items in USD. Excluded from response until quotes are available. */
  total_amount_usd?: number | null;
  /** Whether this is a sandbox order that auto-progresses without producer intervention. */
  sandbox?: boolean;
  /** The timestamp when the order was submitted, if applicable. */
  submitted_at?: string | null;
  /** The timestamp when the order was last modified, if applicable. */
  updated_at?: string | null;
};

export type OutboundCallRecipient = {
  id?: string | null;
  phone_number?: string | null;
  whatsapp_user_id?: string | null;
  conversation_initiation_client_data?: ConversationInitiationClientDataRequestInput | null;
};

export type OutboundCallRecipientResponseModel = {
  id: string;
  phone_number?: string | null;
  whatsapp_user_id?: string | null;
  status: BatchCallRecipientStatus;
  created_at_unix: number;
  updated_at_unix: number;
  conversation_id: string | null;
  conversation_initiation_client_data?: ConversationInitiationClientDataInternal | null;
};

export type OutboundSipTrunkConfigRequestModel = {
  /** Hostname or IP the SIP INVITE is sent to. */
  address: string;
  /** Protocol to use for SIP transport (signalling layer). */
  transport?: SipTrunkTransportEnum;
  /** Whether or not to encrypt media (data layer). */
  media_encryption?: SipMediaEncryptionEnum;
  /** SIP X-* headers for INVITE request. These headers are sent as-is and may help identify this call. */
  headers?: { [key: string]: string | undefined };
  /** Map of dynamic variable name to header name for attributes_to_headers */
  attributes_to_headers?: { [key: string]: string | undefined };
  /** Optional digest authentication credentials (username/password). If not provided, ACL authentication is assumed. */
  credentials?: SipTrunkCredentialsRequestModel | null;
};

export type OutputFormat = "plain_text" | "markdown";

export type PairedLanguagesResponse = {
  /** Indicates this response contains source-to-destination language pairs. */
  kind?: string;
  /** The list of available source-to-destination language mappings. */
  language_pairs: (LanguagePairInfo)[];
};

export type PatchConvAiDashboardSettingsRequest = {
  charts?: (DashboardCallSuccessChartModel | DashboardCriteriaChartModel | DashboardDataCollectionChartModel)[];
};

export type PatchConvAiSettingsRequest = {
  conversation_initiation_client_data_webhook?: ConversationInitiationClientDataWebhook | null;
  webhooks?: ConvAiWebhooks;
  /** Whether the workspace can use MCP servers */
  can_use_mcp_servers?: boolean;
  rag_retention_period_days?: number;
  /** Days to retain conversation embeddings. None means use the system default (30 days). */
  conversation_embedding_retention_days?: number | null;
  default_livekit_stack?: LivekitStackType;
};

export type PatchConversationTagRequestModel = {
  /** If provided, replaces the tag title. Omit to leave unchanged. */
  title?: string | null;
  /** If provided, replaces the tag description. Omit to leave unchanged. */
  description?: string | null;
};

export type PatchWorkspaceSecretRequest = {
  type: string;
  name: string;
  value: string;
};

export type PatchWorkspaceWebhookResponseModel = {
  /** The status of the workspace webhook patch request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type PdfExportOptions = {
  include_speakers?: boolean;
  include_timestamps?: boolean;
  format: string;
  segment_on_silence_longer_than_s?: number | null;
  max_segment_duration_s?: number | null;
  max_segment_chars?: number | null;
};

export type PendingBlocksMetadataModel = {
  target_global_offset_ms: number | null;
  block_ids: (string)[];
};

export type PendingCancellationResponseModel = {
  kind?: string;
  /** The timestamp of the cancellation. */
  timestamp_seconds: number;
};

export type PendingClipTask = {
  type: "preprocessing" | "speech_import" | "dubbing" | "video_to_music" | "media_generation";
  progress?: number;
  started_at_ms?: number;
  updated_at_ms?: number;
  metadata?: { [key: string]: unknown };
};

export type PendingExternalAudiosMetadataModel = {
  target_global_offset_ms: number | null;
  external_audio_ids: (string)[];
};

export type PendingSubscriptionSwitchResponseModel = {
  kind?: string;
  /** The tier to change to. */
  next_tier: "free" | "starter" | "creator" | "pro" | "growing_business" | "scale_2024_08_10" | "grant_tier_1_2025_07_23" | "grant_tier_2_2025_07_23" | "trial" | "enterprise";
  /** The billing period to change to. */
  next_billing_period: BillingPeriod;
  /** The timestamp of the change. */
  timestamp_seconds: number;
};

export type PermissionType = "text_to_speech" | "speech_to_speech" | "speech_to_text" | "models_read" | "models_write" | "voices_read" | "voices_write" | "speech_history_read" | "speech_history_write" | "sound_generation" | "audio_isolation" | "voice_generation" | "dubbing_read" | "dubbing_write" | "pronunciation_dictionaries_read" | "pronunciation_dictionaries_write" | "user_read" | "user_write" | "projects_read" | "projects_write" | "audio_native_read" | "audio_native_write" | "workspace_read" | "workspace_write" | "forced_alignment" | "convai_read" | "convai_write" | "music_generation" | "image_video_generation" | "add_voice_from_voice_library" | "create_instant_voice_clone" | "create_professional_voice_clone" | "publish_voice_to_voice_library" | "share_voice_externally" | "create_user_api_key" | "workspace_analytics_full_read" | "webhooks_write" | "service_account_write" | "group_members_manage" | "workspace_members_read" | "workspace_members_invite" | "workspace_members_remove" | "terms_of_service_accept" | "audit_log_read" | "copy_resources_cross_workspace";

export type PhoneNumberAgentInfo = {
  /** The ID of the agent */
  agent_id: string;
  /** The name of the agent */
  agent_name: string;
  /** Environment to use for resolving environment variables on calls to this number. */
  environment?: string | null;
  /** Agent branch to use for calls to this number. */
  branch_id?: string | null;
};

export type PhoneNumberDynamicVariableTransferDestination = {
  type?: string;
  phone_number: string;
};

export type PhoneNumberTransfer = {
  /** Custom SIP headers to include when transferring the call. Each header can be either a static value or a dynamic variable reference. */
  custom_sip_headers?: (CustomSipHeader | CustomSipHeaderWithDynamicVariable)[];
  transfer_destination: PhoneNumberTransferDestination | SipUriTransferDestination | PhoneNumberDynamicVariableTransferDestination | SipUriDynamicVariableTransferDestination;
  transfer_type?: TransferTypeEnum;
  /** DTMF digits to send after call connects (e.g., 'ww1234' for extension). Can be either a static value or a dynamic variable reference. Use 'w' for 0.5s pause. Only supported for Twilio transfers. */
  post_dial_digits?: PostDialDigitsStatic | PostDialDigitsDynamicVariable | null;
  phone_number?: string | null;
  condition: string;
};

export type PhoneNumberTransferDestination = {
  type?: string;
  phone_number: string;
};

export type PlayDtmfResultErrorModel = {
  result_type?: string;
  status?: string;
  error: string;
  details?: string | null;
};

export type PlayDtmfResultSuccessModel = {
  result_type?: string;
  status?: string;
  dtmf_tones: string;
  reason?: string | null;
};

/** Allows the agent to play DTMF tones during a phone call.  This tool can be used to interact with automated phone systems, such as navigating phone menus, entering extensions, or inputting numeric codes. */
export type PlayDtmfToolConfig = {
  system_tool_type?: string;
  /** Send DTMF tones as out-of-band RTP events (RFC 4733) instead of in-band audio. Only effective for SIP trunk imported numbers. */
  use_out_of_band_dtmf?: boolean;
  /** If true, the agent will not generate further speech after playing DTMF tones. This prevents the agent's speech from interfering with IVR systems. */
  suppress_turn_after_dtmf?: boolean;
};

export type PodcastBulletinMode = {
  /** The type of podcast to create. */
  type: string;
  /** The voice settings for the bulletin. */
  bulletin: PodcastBulletinModeData;
};

export type PodcastBulletinModeData = {
  /** The ID of the host voice. */
  host_voice_id: string;
};

export type PodcastConversationMode = {
  /** The type of podcast to create. */
  type: string;
  /** The voice settings for the conversation. */
  conversation: PodcastConversationModeData;
};

export type PodcastConversationModeData = {
  /** The ID of the host voice. */
  host_voice_id: string;
  /** The ID of the guest voice. */
  guest_voice_id: string;
};

export type PodcastProjectResponseModel = {
  /** The project associated with the created podcast. */
  project: ProjectResponseModel;
};

export type PodcastTextSource = {
  /** The type of source to create. */
  type: string;
  /** The text to create the podcast from. */
  text: string;
};

export type PodcastUrlSource = {
  /** The type of source to create. */
  type: string;
  /** The URL to create the podcast from. */
  url: string;
};

export type PositionInput = {
  x?: number;
  y?: number;
};

export type PositionOutput = {
  x: number;
  y: number;
};

export type PostAgentAvatarResponseModel = {
  agent_id: string;
  avatar_url?: string | null;
};

export type PostDialDigitsDynamicVariable = {
  type?: string;
  /** The dynamic variable name to resolve */
  value: string;
};

export type PostDialDigitsStatic = {
  type?: string;
  /** DTMF digits to send after call connects (e.g., 'ww1234' for extension) */
  value: string;
};

export type PostWorkspaceSecretRequest = {
  type: string;
  name: string;
  value: string;
};

export type PostWorkspaceSecretResponseModel = {
  type: string;
  secret_id: string;
  name: string;
};

export type PreToolSpeechMode = "auto" | "force" | "off";

export type PreviewAudioDbModel = {
  voice_id?: string | null;
  text?: string | null;
  audio_url: string;
  hls_manifest_url?: string | null;
  dash_manifest_url?: string | null;
  is_auto_generated?: boolean | null;
  generated_at_unix?: number | null;
};

/** Currency/amount pair. */
export type Price = {
  amount: string;
  currency: Currency;
};

export type PrivacyConfigInput = {
  /** Whether to record the conversation */
  record_voice?: boolean;
  /** The number of days to retain the conversation. -1 indicates there is no retention limit */
  retention_days?: number;
  /** Whether to delete the transcript and PII */
  delete_transcript_and_pii?: boolean;
  /** Whether to delete the audio */
  delete_audio?: boolean;
  /** Whether to apply the privacy settings to existing conversations */
  apply_to_existing_conversations?: boolean;
  /** Whether to enable zero retention mode - no PII data is stored */
  zero_retention_mode?: boolean;
  /** Config for PII redaction in the conversation history */
  conversation_history_redaction?: ConversationHistoryRedactionConfig;
};

export type PrivacyConfigOutput = {
  /** Whether to record the conversation */
  record_voice?: boolean;
  /** The number of days to retain the conversation. -1 indicates there is no retention limit */
  retention_days?: number;
  /** Whether to delete the transcript and PII */
  delete_transcript_and_pii?: boolean;
  /** Whether to delete the audio */
  delete_audio?: boolean;
  /** Whether to apply the privacy settings to existing conversations */
  apply_to_existing_conversations?: boolean;
  /** Whether to enable zero retention mode - no PII data is stored */
  zero_retention_mode?: boolean;
  /** Config for PII redaction in the conversation history */
  conversation_history_redaction?: ConversationHistoryRedactionConfig;
};

/** Response model for Private Key JWT auth connections */
export type PrivateKeyJwtResponse = {
  name: string;
  auth_type?: string;
  provider: string;
  /** JWT signing algorithm */
  algorithm?: "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512";
  /** Key ID (kid) for JWT header - useful for key rotation */
  key_id?: string | null;
  /** JWT issuer (iss claim) */
  issuer: string;
  /** JWT audience (aud claim) */
  audience: string;
  /** JWT subject (sub claim) */
  subject: string;
  /** Token expiration time in seconds */
  expiration_seconds?: number;
  /** Additional custom claims to include in the JWT */
  extra_params?: { [key: string]: string | undefined };
  id: string;
  used_by?: AuthConnectionDependencies | null;
};

export type ProcedureAtVersion = {
  /** Procedure ID */
  procedure_id: string;
  /** Procedure name */
  name: string;
  /** Procedure content */
  content: string;
  type?: ProcedureType;
  /** Agent ID of the procedure */
  agent_id: string;
  /** Version ID of a version of the procedure. None for a procedure never versioned. */
  version_id?: string | null;
};

export type ProcedureCompilerMode = "skills";

export type ProcedureRefResponseModel = {
  /** Procedure ID */
  procedure_id: string;
  /** Version ID of a version of the procedure. None for a procedure never versioned. */
  version_id?: string | null;
  /** Procedure name */
  name?: string;
  /** Procedure type */
  type?: ProcedureType;
};

export type ProcedureSettings = {
  compiler_mode?: ProcedureCompilerMode;
};

export type ProcedureType = "free_form" | "deterministic";

export type ProjectCreationMetaResponseModel = {
  /** The progress of the project creation. */
  creation_progress: number;
  /** The status of the project creation action. */
  status: "pending" | "creating" | "finished" | "failed";
  /** The type of the project creation action. */
  type: "blank" | "generate_podcast" | "auto_assign_voices" | "dub_video" | "import_speech";
};

export type ProjectExtendedResponseModel = {
  /** The ID of the project. */
  project_id: string;
  /** The name of the project. */
  name: string;
  /** The creation date of the project. */
  create_date_unix: number;
  /** The user ID who created the project. */
  created_by_user_id: string | null;
  /** The default title voice ID. */
  default_title_voice_id: string;
  /** The default paragraph voice ID. */
  default_paragraph_voice_id: string;
  /** The default model ID. */
  default_model_id: string;
  /** The last conversion date of the project. */
  last_conversion_date_unix?: number | null;
  /** Whether the project can be downloaded. */
  can_be_downloaded: boolean;
  /** The title of the project. */
  title?: string | null;
  /** The author of the project. */
  author?: string | null;
  /** The description of the project. */
  description?: string | null;
  /** List of genres of the project. */
  genres?: (string)[] | null;
  /** The cover image URL of the project. */
  cover_image_url?: string | null;
  /** The target audience of the project. */
  target_audience?: "children" | "young adult" | "adult" | "all ages" | null;
  /** Two-letter language code (ISO 639-1) of the language of the project. */
  language?: string | null;
  /** The content type of the project, e.g. 'Novel' or 'Short Story' */
  content_type?: string | null;
  /** The original publication date of the project. */
  original_publication_date?: string | null;
  /** Whether the project contains mature content. */
  mature_content?: boolean | null;
  /** The ISBN number of the project. */
  isbn_number?: string | null;
  /** Whether the project uses volume normalization. */
  volume_normalization: boolean;
  /** The state of the project. */
  state: "creating" | "default" | "converting" | "in_queue";
  /** The access level of the project. */
  access_level: "admin" | "editor" | "commenter" | "viewer";
  /** Whether the project is fiction. */
  fiction?: "fiction" | "non-fiction" | null;
  /** Whether quality check is enabled for this project. */
  quality_check_on: boolean;
  /** Whether quality check is enabled on the project when bulk converting. */
  quality_check_on_when_bulk_convert: boolean;
  /** The creation meta of the project. */
  creation_meta?: ProjectCreationMetaResponseModel | null;
  /** The source type of the project. */
  source_type?: "blank" | "book" | "article" | "genfm" | "video" | "screenplay" | null;
  /** Whether chapters are enabled for the project. */
  chapters_enabled?: boolean | null;
  /** Whether captions are enabled for the project. */
  captions_enabled?: boolean | null;
  /** Global styling to be applied to all captions */
  caption_style?: CaptionStyleModel | null;
  /** Styling changes that have been made to the provided templates */
  caption_style_template_overrides?: { [key: string]: CaptionStyleModel | undefined } | null;
  /** The public share ID of the project. */
  public_share_id?: string | null;
  /** The aspect ratio of the project. */
  aspect_ratio?: "16:9" | "9:16" | "4:5" | "1:1" | null;
  /** Agent-related settings for the project */
  agent_settings?: StudioAgentSettingsModel | null;
  /** The quality preset level of the project. */
  quality_preset: QualityPresetType;
  /** List of chapters of the project and their metadata. */
  chapters: (ChapterResponseModel)[];
  /** List of pronunciation dictionary versions of the project and their metadata. */
  pronunciation_dictionary_versions: (PronunciationDictionaryVersionResponseModel)[];
  /** List of pronunciation dictionary locators. */
  pronunciation_dictionary_locators: (PronunciationDictionaryLocatorResponseModel)[];
  /** Whether text normalization is applied to the project. */
  apply_text_normalization: "auto" | "on" | "off" | "apply_english";
  /** Experimental features for the project. */
  experimental?: { [key: string]: unknown };
  /** List of uploaded assets e.g. videos, audios. */
  assets: (ProjectVideoResponseModel | ProjectExternalAudioResponseModel | ProjectImageResponseModel)[];
  /** List of configured project voices. */
  voices: (ProjectVoiceResponseModel)[];
  /** List of voices used by the project. */
  base_voices?: (VoiceResponseModel)[] | null;
  /** The ElevenReader data if the book was published. */
  publishing_read?: DirectPublishingReadResponseModel | null;
};

export type ProjectExternalAudioResponseModel = {
  external_audio_id: string;
  filename: string;
  signed_url: string | null;
  offset_ms: number;
  duration_ms: number;
  start_time_ms: number;
  end_time_ms: number | null;
  order: string;
  track_id: string;
  created_at_ms: number;
  updated_at_ms: number;
  volume_gain_db?: number;
  muted?: boolean;
  fade_in_ms?: number;
  fade_out_ms?: number;
  source_external_audio_id?: string | null;
  source_asset_id?: string | null;
  source_platform_asset_id?: string | null;
  pending_blocks_metadata?: PendingBlocksMetadataModel | null;
  pending_external_audios_metadata?: PendingExternalAudiosMetadataModel | null;
  speech_imported?: boolean;
  pending_task?: PendingClipTask | null;
  error?: string | null;
  current_snapshot_id?: string | null;
  source_context?: SongSourceContext | MusicExploreSongSourceContext | SfxSourceContext | null;
  analysis?: AudioAnalysis | null;
  transcription?: AssetTranscription | null;
  type?: string;
  import_speech_progress: number | null;
};

export type ProjectImageResponseModel = {
  image_id: string;
  filename: string;
  signed_url?: string | null;
  thumbnail_signed_url?: string | null;
  type?: string;
  source?: string;
  file_size_bytes: number;
  width: number;
  height: number;
  track_id?: string;
  offset_ms: number;
  duration_ms: number;
  order: string;
  canvas_placement: CanvasPlacement;
  animation?: ClipAnimation;
  opacity?: number;
  created_at_ms: number;
  updated_at_ms: number;
  current_snapshot_id?: string | null;
  source_asset_id?: string | null;
  source_platform_asset_id?: string | null;
  error?: string | null;
  pending_task?: PendingClipTask | null;
  analysis?: ImageAnalysis | null;
};

export type ProjectMutedTracksResponseModel = {
  /** List of chapter IDs that have muted tracks. */
  chapter_ids: (string)[];
};

export type ProjectResponseModel = {
  /** The ID of the project. */
  project_id: string;
  /** The name of the project. */
  name: string;
  /** The creation date of the project. */
  create_date_unix: number;
  /** The user ID who created the project. */
  created_by_user_id: string | null;
  /** The default title voice ID. */
  default_title_voice_id: string;
  /** The default paragraph voice ID. */
  default_paragraph_voice_id: string;
  /** The default model ID. */
  default_model_id: string;
  /** The last conversion date of the project. */
  last_conversion_date_unix?: number | null;
  /** Whether the project can be downloaded. */
  can_be_downloaded: boolean;
  /** The title of the project. */
  title?: string | null;
  /** The author of the project. */
  author?: string | null;
  /** The description of the project. */
  description?: string | null;
  /** List of genres of the project. */
  genres?: (string)[] | null;
  /** The cover image URL of the project. */
  cover_image_url?: string | null;
  /** The target audience of the project. */
  target_audience?: "children" | "young adult" | "adult" | "all ages" | null;
  /** Two-letter language code (ISO 639-1) of the language of the project. */
  language?: string | null;
  /** The content type of the project, e.g. 'Novel' or 'Short Story' */
  content_type?: string | null;
  /** The original publication date of the project. */
  original_publication_date?: string | null;
  /** Whether the project contains mature content. */
  mature_content?: boolean | null;
  /** The ISBN number of the project. */
  isbn_number?: string | null;
  /** Whether the project uses volume normalization. */
  volume_normalization: boolean;
  /** The state of the project. */
  state: "creating" | "default" | "converting" | "in_queue";
  /** The access level of the project. */
  access_level: "admin" | "editor" | "commenter" | "viewer";
  /** Whether the project is fiction. */
  fiction?: "fiction" | "non-fiction" | null;
  /** Whether quality check is enabled for this project. */
  quality_check_on: boolean;
  /** Whether quality check is enabled on the project when bulk converting. */
  quality_check_on_when_bulk_convert: boolean;
  /** The creation meta of the project. */
  creation_meta?: ProjectCreationMetaResponseModel | null;
  /** The source type of the project. */
  source_type?: "blank" | "book" | "article" | "genfm" | "video" | "screenplay" | null;
  /** Whether chapters are enabled for the project. */
  chapters_enabled?: boolean | null;
  /** Whether captions are enabled for the project. */
  captions_enabled?: boolean | null;
  /** Global styling to be applied to all captions */
  caption_style?: CaptionStyleModel | null;
  /** Styling changes that have been made to the provided templates */
  caption_style_template_overrides?: { [key: string]: CaptionStyleModel | undefined } | null;
  /** The public share ID of the project. */
  public_share_id?: string | null;
  /** The aspect ratio of the project. */
  aspect_ratio?: "16:9" | "9:16" | "4:5" | "1:1" | null;
  /** Agent-related settings for the project */
  agent_settings?: StudioAgentSettingsModel | null;
};

export type ProjectSnapshotExtendedResponseModel = {
  /** The ID of the project snapshot. */
  project_snapshot_id: string;
  /** The ID of the project. */
  project_id: string;
  /** The creation date of the project snapshot. */
  created_at_unix: number;
  /** The name of the project snapshot. */
  name: string;
  /** (Deprecated) */
  audio_upload?: { [key: string]: unknown } | null;
  /** (Deprecated) */
  zip_upload?: { [key: string]: unknown } | null;
  character_alignments: (CharacterAlignmentModel)[];
  /** The total duration of the audio in seconds. */
  audio_duration_secs: number;
};

export type ProjectSnapshotResponseModel = {
  /** The ID of the project snapshot. */
  project_snapshot_id: string;
  /** The ID of the project. */
  project_id: string;
  /** The creation date of the project snapshot. */
  created_at_unix: number;
  /** The name of the project snapshot. */
  name: string;
  /** (Deprecated) */
  audio_upload?: { [key: string]: unknown } | null;
  /** (Deprecated) */
  zip_upload?: { [key: string]: unknown } | null;
};

export type ProjectSnapshotsResponseModel = {
  /** List of project snapshots. */
  snapshots: (ProjectSnapshotResponseModel)[];
};

export type ProjectVideoResponseModel = {
  video_id: string;
  filename: string;
  signed_url: string | null;
  signed_preview_url: string | null;
  offset_ms: number;
  duration_ms: number;
  volume_gain_db: number;
  muted: boolean;
  fade_in_ms?: number;
  fade_out_ms?: number;
  width: number;
  height: number;
  codec: string;
  order: string;
  created_at_ms: number;
  updated_at_ms: number;
  error?: string | null;
  thumbnail_interval_seconds: number;
  thumbnail_size: (number)[];
  thumbnail_sheets: (ProjectVideoThumbnailSheetResponseModel)[];
  start_time_ms: number;
  end_time_ms: number | null;
  asset_preview_signed_url?: string | null;
  source_video_id?: string | null;
  source_asset_id?: string | null;
  source_platform_asset_id?: string | null;
  pending_blocks_metadata?: PendingBlocksMetadataModel | null;
  pending_external_audios_metadata?: PendingExternalAudiosMetadataModel | null;
  speech_imported?: boolean;
  pending_task?: PendingClipTask | null;
  audio_track_ready?: boolean;
  export_format_ready?: boolean;
  current_snapshot_id?: string | null;
  source_context?: GenerationSourceContext | null;
  analysis?: VideoAnalysis | null;
  transcription?: AssetTranscription | null;
  type?: string;
  canvas_placement?: CanvasPlacement;
  animation?: ClipAnimation;
  playback_speed?: number;
  opacity?: number;
  track_id?: string;
  preview_job_progress: number;
  import_speech_progress: number | null;
};

export type ProjectVideoThumbnailSheetResponseModel = {
  start_thumbnail_index: number;
  thumbnail_count: number;
  signed_cloud_url: string;
};

export type ProjectVoiceResponseModel = {
  voice_id: string;
  alias: string;
  stability: number;
  similarity_boost: number;
  style: number;
  is_pinned: boolean;
  use_speaker_boost: boolean;
  volume_gain: number;
  speed: number;
};

export type PromptAgentApiModelInput = {
  /** The prompt for the agent */
  prompt?: string;
  /** The LLM to query with the prompt and the chat history. If using data residency, the LLM must be supported in the data residency environment */
  llm?: Llm;
  /** Reasoning effort of the model. Only available for some models. */
  reasoning_effort?: LlmReasoningEffort | null;
  /** Max number of tokens used for thinking. Use 0 to turn off if supported by the model. */
  thinking_budget?: number | null;
  /** The temperature for the LLM. Defaults to 0. Set to null to omit the parameter from the LLM request entirely (useful for custom LLMs that reject the temperature field). */
  temperature?: number | null;
  /** If greater than 0, maximum number of tokens the LLM can predict */
  max_tokens?: number;
  /** A list of IDs of tools used by the agent */
  tool_ids?: (string)[];
  /** Built-in system tools to be used by the agent */
  built_in_tools?: BuiltInToolsInput;
  /** A list of MCP server ids to be used by the agent */
  mcp_server_ids?: (string)[];
  /** A list of Native MCP server ids to be used by the agent */
  native_mcp_server_ids?: (string)[];
  /** A list of knowledge bases to be used by the agent */
  knowledge_base?: (KnowledgeBaseLocator)[];
  /** Definition for a custom LLM if LLM field is set to 'CUSTOM_LLM' */
  custom_llm?: CustomLlm | null;
  /** Whether to remove the default personality lines from the system prompt */
  ignore_default_personality?: boolean | null;
  /** Configuration for RAG */
  rag?: RagConfig;
  /** Timezone for displaying current time in system prompt. If set, the current time will be included in the system prompt using this timezone. Must be a valid timezone name (e.g., 'America/New_York', 'Europe/London', 'UTC'). Recommended for accurate time-aware responses; without this, the agent has no knowledge of the current date/time unless you provide it via dynamic variables or tools, which can lead to incorrect or hallucinated time references. */
  timezone?: string | null;
  /** Configuration for backup LLM cascading. Can be disabled, use system defaults, or specify custom order. */
  backup_llm_config?: BackupLlmDefault | BackupLlmDisabled | BackupLlmOverride;
  /** Time in seconds before cascading to backup LLM. Must be between 2 and 15 seconds. */
  cascade_timeout_seconds?: number;
  /** A list of tools that the agent can use over the course of the conversation, use tool_ids instead */
  tools?: (WebhookToolConfigInput | ClientToolConfigInput | SystemToolConfigInput | McpToolConfigInput | ApiIntegrationWebhookToolConfigInput | SmbToolConfig)[];
};

export type PromptAgentApiModelOutput = {
  /** The prompt for the agent */
  prompt?: string;
  /** The LLM to query with the prompt and the chat history. If using data residency, the LLM must be supported in the data residency environment */
  llm?: Llm;
  /** Reasoning effort of the model. Only available for some models. */
  reasoning_effort?: LlmReasoningEffort | null;
  /** Max number of tokens used for thinking. Use 0 to turn off if supported by the model. */
  thinking_budget?: number | null;
  /** The temperature for the LLM. Defaults to 0. Set to null to omit the parameter from the LLM request entirely (useful for custom LLMs that reject the temperature field). */
  temperature?: number | null;
  /** If greater than 0, maximum number of tokens the LLM can predict */
  max_tokens?: number;
  /** A list of IDs of tools used by the agent */
  tool_ids?: (string)[];
  /** Built-in system tools to be used by the agent */
  built_in_tools?: BuiltInToolsOutput;
  /** A list of MCP server ids to be used by the agent */
  mcp_server_ids?: (string)[];
  /** A list of Native MCP server ids to be used by the agent */
  native_mcp_server_ids?: (string)[];
  /** A list of knowledge bases to be used by the agent */
  knowledge_base?: (KnowledgeBaseLocator)[];
  /** Definition for a custom LLM if LLM field is set to 'CUSTOM_LLM' */
  custom_llm?: CustomLlm | null;
  /** Whether to remove the default personality lines from the system prompt */
  ignore_default_personality?: boolean | null;
  /** Configuration for RAG */
  rag?: RagConfig;
  /** Timezone for displaying current time in system prompt. If set, the current time will be included in the system prompt using this timezone. Must be a valid timezone name (e.g., 'America/New_York', 'Europe/London', 'UTC'). Recommended for accurate time-aware responses; without this, the agent has no knowledge of the current date/time unless you provide it via dynamic variables or tools, which can lead to incorrect or hallucinated time references. */
  timezone?: string | null;
  /** Configuration for backup LLM cascading. Can be disabled, use system defaults, or specify custom order. */
  backup_llm_config?: BackupLlmDefault | BackupLlmDisabled | BackupLlmOverride;
  /** Time in seconds before cascading to backup LLM. Must be between 2 and 15 seconds. */
  cascade_timeout_seconds?: number;
  /** A list of tools that the agent can use over the course of the conversation, use tool_ids instead */
  tools?: (WebhookToolConfigOutput | ClientToolConfigOutput | SystemToolConfigOutput | McpToolConfigOutput | ApiIntegrationWebhookToolConfigOutput | SmbToolConfig)[];
};

export type PromptAgentApiModelOverrideInput = {
  /** The prompt for the agent */
  prompt?: string | null;
  /** The LLM to query with the prompt and the chat history. If using data residency, the LLM must be supported in the data residency environment */
  llm?: Llm | null;
  /** A list of IDs of tools used by the agent */
  tool_ids?: (string)[] | null;
  /** A list of Native MCP server ids to be used by the agent */
  native_mcp_server_ids?: (string)[] | null;
  /** A list of knowledge bases to be used by the agent */
  knowledge_base?: (KnowledgeBaseLocator)[] | null;
};

export type PromptAgentApiModelOverrideOutput = {
  /** The prompt for the agent */
  prompt?: string | null;
  /** The LLM to query with the prompt and the chat history. If using data residency, the LLM must be supported in the data residency environment */
  llm?: Llm | null;
  /** A list of IDs of tools used by the agent */
  tool_ids?: (string)[] | null;
  /** A list of Native MCP server ids to be used by the agent */
  native_mcp_server_ids?: (string)[] | null;
  /** A list of knowledge bases to be used by the agent */
  knowledge_base?: (KnowledgeBaseLocator)[] | null;
};

export type PromptAgentApiModelOverrideConfig = {
  /** Whether to allow overriding the prompt field. */
  prompt?: boolean;
  /** Whether to allow overriding the llm field. */
  llm?: boolean;
  /** Whether to allow overriding the tool_ids field. */
  tool_ids?: boolean;
  /** Whether to allow overriding the native_mcp_server_ids field. */
  native_mcp_server_ids?: boolean;
  /** Whether to allow overriding the knowledge_base field. */
  knowledge_base?: boolean;
};

export type PromptAgentApiModelWorkflowOverrideInput = {
  /** The prompt for the agent */
  prompt?: string | null;
  /** The LLM to query with the prompt and the chat history. If using data residency, the LLM must be supported in the data residency environment */
  llm?: Llm | null;
  /** Reasoning effort of the model. Only available for some models. */
  reasoning_effort?: LlmReasoningEffort | null;
  /** Max number of tokens used for thinking. Use 0 to turn off if supported by the model. */
  thinking_budget?: number | null;
  /** The temperature for the LLM. Defaults to 0. Set to null to omit the parameter from the LLM request entirely (useful for custom LLMs that reject the temperature field). */
  temperature?: number | null;
  /** If greater than 0, maximum number of tokens the LLM can predict */
  max_tokens?: number | null;
  /** A list of IDs of tools used by the agent */
  tool_ids?: (string)[] | null;
  /** Built-in system tools to be used by the agent */
  built_in_tools?: BuiltInToolsWorkflowOverrideInput | null;
  /** A list of MCP server ids to be used by the agent */
  mcp_server_ids?: (string)[] | null;
  /** A list of Native MCP server ids to be used by the agent */
  native_mcp_server_ids?: (string)[] | null;
  /** A list of knowledge bases to be used by the agent */
  knowledge_base?: (KnowledgeBaseLocator)[] | null;
  /** Definition for a custom LLM if LLM field is set to 'CUSTOM_LLM' */
  custom_llm?: CustomLlm | null;
  /** Whether to remove the default personality lines from the system prompt */
  ignore_default_personality?: boolean | null;
  /** Configuration for RAG */
  rag?: RagConfigWorkflowOverride | null;
  /** Timezone for displaying current time in system prompt. If set, the current time will be included in the system prompt using this timezone. Must be a valid timezone name (e.g., 'America/New_York', 'Europe/London', 'UTC'). Recommended for accurate time-aware responses; without this, the agent has no knowledge of the current date/time unless you provide it via dynamic variables or tools, which can lead to incorrect or hallucinated time references. */
  timezone?: string | null;
  /** Configuration for backup LLM cascading. Can be disabled, use system defaults, or specify custom order. */
  backup_llm_config?: BackupLlmDefault | BackupLlmDisabled | BackupLlmOverride | null;
  /** Time in seconds before cascading to backup LLM. Must be between 2 and 15 seconds. */
  cascade_timeout_seconds?: number | null;
  /** A list of tools that the agent can use over the course of the conversation, use tool_ids instead */
  tools?: (WebhookToolConfigInput | ClientToolConfigInput | SystemToolConfigInput | McpToolConfigInput | ApiIntegrationWebhookToolConfigInput | SmbToolConfig)[] | null;
};

export type PromptAgentApiModelWorkflowOverrideOutput = {
  /** The prompt for the agent */
  prompt?: string | null;
  /** The LLM to query with the prompt and the chat history. If using data residency, the LLM must be supported in the data residency environment */
  llm?: Llm | null;
  /** Reasoning effort of the model. Only available for some models. */
  reasoning_effort?: LlmReasoningEffort | null;
  /** Max number of tokens used for thinking. Use 0 to turn off if supported by the model. */
  thinking_budget?: number | null;
  /** The temperature for the LLM. Defaults to 0. Set to null to omit the parameter from the LLM request entirely (useful for custom LLMs that reject the temperature field). */
  temperature?: number | null;
  /** If greater than 0, maximum number of tokens the LLM can predict */
  max_tokens?: number | null;
  /** A list of IDs of tools used by the agent */
  tool_ids?: (string)[] | null;
  /** Built-in system tools to be used by the agent */
  built_in_tools?: BuiltInToolsWorkflowOverrideOutput | null;
  /** A list of MCP server ids to be used by the agent */
  mcp_server_ids?: (string)[] | null;
  /** A list of Native MCP server ids to be used by the agent */
  native_mcp_server_ids?: (string)[] | null;
  /** A list of knowledge bases to be used by the agent */
  knowledge_base?: (KnowledgeBaseLocator)[] | null;
  /** Definition for a custom LLM if LLM field is set to 'CUSTOM_LLM' */
  custom_llm?: CustomLlm | null;
  /** Whether to remove the default personality lines from the system prompt */
  ignore_default_personality?: boolean | null;
  /** Configuration for RAG */
  rag?: RagConfigWorkflowOverride | null;
  /** Timezone for displaying current time in system prompt. If set, the current time will be included in the system prompt using this timezone. Must be a valid timezone name (e.g., 'America/New_York', 'Europe/London', 'UTC'). Recommended for accurate time-aware responses; without this, the agent has no knowledge of the current date/time unless you provide it via dynamic variables or tools, which can lead to incorrect or hallucinated time references. */
  timezone?: string | null;
  /** Configuration for backup LLM cascading. Can be disabled, use system defaults, or specify custom order. */
  backup_llm_config?: BackupLlmDefault | BackupLlmDisabled | BackupLlmOverride | null;
  /** Time in seconds before cascading to backup LLM. Must be between 2 and 15 seconds. */
  cascade_timeout_seconds?: number | null;
  /** A list of tools that the agent can use over the course of the conversation, use tool_ids instead */
  tools?: (WebhookToolConfigOutput | ClientToolConfigOutput | SystemToolConfigOutput | McpToolConfigOutput | ApiIntegrationWebhookToolConfigOutput | SmbToolConfig)[] | null;
};

/** An evaluation using the transcript and a prompt for a yes/no achieved answer */
export type PromptEvaluationCriteria = {
  /** The unique identifier for the evaluation criteria */
  id: string;
  name: string;
  /** The type of evaluation criteria */
  type?: string;
  /** The prompt that the agent should use to evaluate the conversation */
  conversation_goal_prompt: string;
  /** When evaluating the prompt, should the agent's knowledge base be used. */
  use_knowledge_base?: boolean;
  /** The scope of transcript context used when evaluating this criterion. 'conversation' uses the full transcript; 'agent' uses only the portion where the defining agent was active. */
  scope?: AnalysisScope;
  /** LLM model to use for this evaluation criteria. If not set, uses agent's analysis_llm default. */
  llm?: Llm | null;
};

export type PromptInjectionGuardrail = {
  is_enabled?: boolean;
};

export type PronunciationDictionaryAliasRuleRequestModel = {
  /** The string to replace. Must be a non-empty string. */
  string_to_replace: string;
  /** Whether the rule should match case-sensitively. */
  case_sensitive?: boolean;
  /** Whether the rule should only match at word boundaries. */
  word_boundaries?: boolean;
  /** The type of the rule. */
  type: string;
  /** The alias for the string to be replaced. */
  alias: string;
};

export type PronunciationDictionaryAliasRuleResponseModel = {
  string_to_replace: string;
  /** Whether the rule matches case-sensitively. */
  case_sensitive?: boolean;
  /** Whether the rule only matches at word boundaries. */
  word_boundaries?: boolean;
  type: string;
  alias: string;
};

export type PronunciationDictionaryLocatorResponseModel = {
  pronunciation_dictionary_id: string;
  version_id: string | null;
};

export type PronunciationDictionaryPhonemeRuleRequestModel = {
  /** The string to replace. Must be a non-empty string. */
  string_to_replace: string;
  /** Whether the rule should match case-sensitively. */
  case_sensitive?: boolean;
  /** Whether the rule should only match at word boundaries. */
  word_boundaries?: boolean;
  /** The type of the rule. */
  type: string;
  /** The phoneme rule. */
  phoneme: string;
  /** The alphabet to use with the phoneme rule. */
  alphabet: string;
};

export type PronunciationDictionaryPhonemeRuleResponseModel = {
  string_to_replace: string;
  /** Whether the rule matches case-sensitively. */
  case_sensitive?: boolean;
  /** Whether the rule only matches at word boundaries. */
  word_boundaries?: boolean;
  type: string;
  phoneme: string;
  alphabet: string;
};

export type PronunciationDictionaryRulesResponseModel = {
  /** The ID of the pronunciation dictionary. */
  id: string;
  /** The version ID of the pronunciation dictionary. */
  version_id: string;
  /** The number of rules in the version of the pronunciation dictionary. */
  version_rules_num: number;
};

export type PronunciationDictionaryVersionLocatorDbModel = {
  pronunciation_dictionary_id: string;
  version_id: string | null;
};

export type PronunciationDictionaryVersionLocatorRequestModel = {
  /** The ID of the pronunciation dictionary. */
  pronunciation_dictionary_id: string;
  /** The ID of the version of the pronunciation dictionary. If not provided, the latest version will be used. */
  version_id?: string | null;
};

export type PronunciationDictionaryVersionResponseModel = {
  version_id: string;
  version_rules_num: number;
  pronunciation_dictionary_id: string;
  dictionary_name: string;
  version_name: string;
  permission_on_resource: "admin" | "editor" | "commenter" | "viewer" | null;
  created_by: string;
  creation_time_unix: number;
  archived_time_unix?: number | null;
};

/** A locator for other documents to be able to reference a specific dictionary and it's version. This is a pydantic version of PronunciationDictionaryVersionLocatorDBModel. Required to ensure compat with the rest of the agent data models. */
export type PydanticPronunciationDictionaryVersionLocator = {
  /** The ID of the pronunciation dictionary */
  pronunciation_dictionary_id: string;
  /** The ID of the version of the pronunciation dictionary */
  version_id: string | null;
};

export type QualityPresetType = "standard" | "high" | "ultra" | "ultra_lossless";

export type QueryParamsJsonSchema = {
  properties: { [key: string]: LiteralJsonSchemaProperty | undefined };
  required?: (string)[];
};

export type QuoteInfo = {
  /** The quoted price for this item in USD. Use the order's total_amount_usd for the combined order total. */
  amount_usd: number;
};

export type RagDocumentIndexResponseModel = {
  id: string;
  model: EmbeddingModelEnum;
  status: RagIndexStatus;
  progress_percentage: number;
  document_model_index_usage: RagDocumentIndexUsage;
};

export type RagDocumentIndexUsage = {
  used_bytes: number;
};

export type RagDocumentIndexesResponseModel = {
  indexes: (RagDocumentIndexResponseModel)[];
};

export type RagIndexBatchSuccessfulResponseModel = {
  status: string;
  data: RagDocumentIndexResponseModel;
};

export type RagIndexOverviewEmbeddingModelResponseModel = {
  model: EmbeddingModelEnum;
  used_bytes: number;
};

export type RagIndexOverviewResponseModel = {
  total_used_bytes: number;
  total_max_bytes: number;
  models: (RagIndexOverviewEmbeddingModelResponseModel)[];
};

export type RagIndexRequestModel = {
  model: EmbeddingModelEnum;
};

export type RagIndexStatus = "new" | "created" | "processing" | "failed" | "succeeded" | "rag_limit_exceeded" | "document_too_small" | "cannot_index_folder";

export type RagChunkMetadata = {
  document_id: string;
  chunk_id: string;
  vector_distance: number;
};

export type RagConfig = {
  enabled?: boolean;
  embedding_model?: EmbeddingModelEnum;
  /** Maximum vector distance of retrieved chunks. */
  max_vector_distance?: number;
  /** Maximum total length of document chunks retrieved from RAG. */
  max_documents_length?: number;
  /** Maximum number of RAG document chunks to initially retrieve from the vector store. These are then further filtered by vector distance and total length. */
  max_retrieved_rag_chunks_count?: number;
  /** Number of candidates evaluated in ANN vector search. Higher number means better results, but higher latency. Minimum recommended value is 100. If disabled, the default value is used. */
  num_candidates?: number | null;
  /** Custom prompt for rewriting user queries before RAG retrieval. The conversation history will be automatically appended at the end. If not set, the default prompt will be used. */
  query_rewrite_prompt_override?: string | null;
};

export type RagConfigWorkflowOverride = {
  enabled?: boolean | null;
  embedding_model?: EmbeddingModelEnum | null;
  /** Maximum vector distance of retrieved chunks. */
  max_vector_distance?: number | null;
  /** Maximum total length of document chunks retrieved from RAG. */
  max_documents_length?: number | null;
  /** Maximum number of RAG document chunks to initially retrieve from the vector store. These are then further filtered by vector distance and total length. */
  max_retrieved_rag_chunks_count?: number | null;
  /** Number of candidates evaluated in ANN vector search. Higher number means better results, but higher latency. Minimum recommended value is 100. If disabled, the default value is used. */
  num_candidates?: number | null;
  /** Custom prompt for rewriting user queries before RAG retrieval. The conversation history will be automatically appended at the end. If not set, the default prompt will be used. */
  query_rewrite_prompt_override?: string | null;
};

export type RagRetrievalInfo = {
  chunks: (RagChunkMetadata)[];
  embedding_model: EmbeddingModelEnum;
  retrieval_query: string;
  rag_latency_secs: number;
  used_chunk_ids?: (string)[];
};

export type ReadLegalTerms = {
  terms?: string | null;
  start_date?: string | null;
  end_date?: string | null;
};

export type ReadMetadataChapterDbModel = {
  chapter_name: string;
  word_count: number;
  char_count: number;
  starting_char_offset: number;
  has_parsed_html?: boolean;
  has_summary?: boolean;
  duration_seconds?: number | null;
  file_number?: string | null;
  is_fallback_name?: boolean;
};

export type ReaderResourceResponseModel = {
  /** The type of resource. */
  resource_type: "read" | "collection";
  /** The ID of the resource. */
  resource_id: string;
};

export type RecordingResponseModel = {
  /** The ID of the recording. */
  recording_id: string;
  /** The MIME type of the recording. */
  mime_type: string;
  /** The size of the recording in bytes. */
  size_bytes: number;
  /** The date of the recording in Unix time. */
  upload_date_unix: number;
  /** The transcription of the recording. */
  transcription: string;
};

export type ReferenceVideo = {
  generation_id?: string | null;
  content_asset_id?: string | null;
  template_node_id?: string | null;
  studio_clip?: StudioClipReference | null;
};

/** Reference to a tool for unit test evaluation. */
export type ReferencedToolCommonModel = {
  /** The ID of the tool */
  id: string;
  /** The type of the tool */
  type: "system" | "webhook" | "client" | "workflow" | "api_integration_webhook" | "mcp" | "code";
};

export type RegexParameterEvaluationStrategy = {
  type: string;
  /** A regex pattern to match the agent's response against. */
  pattern: string;
};

export type RegionConfigRequest = {
  /** Region ID */
  region_id: TwilioRegionId;
  /** Auth Token for this region */
  token: string;
  /** Edge location for this region */
  edge_location: TwilioEdgeLocation;
};

export type RegionalProcessingSurchargeInfo = {
  /** The surcharge multiplier applied to this model's pricing (e.g. 1.1 for a 10% surcharge). */
  multiplier: number;
};

/** Register a client for a scheduled group session. */
export type RegisterForGroupSessionParams = {
  smb_tool_type?: string;
};

export type RegisterMediaResponse = {
  /** The ID of the uploaded media file. */
  media_id: MediaId;
};

export type RemoveOrderItemResponse = {
  /** Whether the item was successfully removed. */
  success: boolean;
};

export type Render = {
  id: string;
  version: number;
  language: string | null;
  type: RenderType | null;
  media_ref: DubbingMediaReference | null;
  status: "complete" | "processing" | "failed";
};

export type RenderType = "mp4" | "aac" | "mp3" | "wav" | "aaf" | "tracks_zip" | "clips_zip" | "zip";

export type ReportKnowledgeGapParams = {
  smb_tool_type?: string;
};

export type RequestPvcManualVerificationResponseModel = {
  /** The status of the request PVC manual verification request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

/** A set of fields that must all be present to satisfy this constraint. */
export type RequiredConstraint = {
  required: (string)[];
};

/** Wrapper for anyOf/allOf composition constraints scoped to required fields. */
export type RequiredConstraints = {
  any_of?: (RequiredConstraint)[];
  all_of?: (RequiredConstraint)[];
};

export type ResourceAccessInfo = {
  /** Whether the user making the request is the creator of the agent */
  is_creator: boolean;
  /** Name of the agent's creator */
  creator_name: string;
  /** Email of the agent's creator */
  creator_email: string;
  /** The role of the user making the request */
  role: "admin" | "editor" | "commenter" | "viewer";
  /** The access level for anonymous users. If None, the resource is not shared publicly. */
  anonymous_access_level_override?: "admin" | "editor" | "commenter" | "viewer" | null;
  /** Why the requesting user has access to this resource. 'creator' = caller is the owner. 'explicit' = caller (or one of their workspace groups) is listed in role_to_group_ids beyond the workspace-wide everyone group. 'workspace_default' = the workspace-wide everyone group is listed in role_to_group_ids (every non-anon workspace member, including admins, sees this resource). 'workspace_admin' = caller is a workspace admin and the admin seat is the *only* path to access; reserved for docs nobody else can see. Lets the UI disclose why an admin-bypass viewer sees a doc that wasn't explicitly shared with them. */
  access_source?: "creator" | "explicit" | "workspace_admin" | "workspace_default" | null;
};

export type ResourceMetadataResponseModel = {
  /** The ID of the resource. */
  resource_id: string;
  /** The name of the resource, if available. */
  resource_name: string | null;
  /** The type of the resource. */
  resource_type: WorkspaceResourceType;
  /** The ID of the user who created the resource. */
  creator_user_id: string | null;
  /** The access level for anonymous users. If None, the resource is not shared publicly. */
  anonymous_access_level_override: "admin" | "editor" | "commenter" | "viewer" | null;
  /** A mapping of roles to group IDs. When the resource is shared with a user, the group id is the user's id. */
  role_to_group_ids: { [key: string]: (string)[] | undefined };
  /** List of options for sharing the resource further in the workspace. These are users who don't have access to the resource yet. */
  share_options: (ShareOptionResponseModel)[];
};

/** Configuration for filtering tool responses before they are visible to the agent. */
export type ResponseFilter = {
  /** Controls how tool responses are filtered. 'all' returns entire response, 'allow' returns only specified paths, 'hide_all' hides the entire response. */
  mode?: ResponseFilterMode;
  /** Dot notation paths to include when mode is 'allow' (e.g., ['ticket.id', 'ticket.status']). */
  filters?: (string)[];
  /** Content type for response filtering. Only 'application/json' responses are filtered. */
  content_type?: string;
};

/** Controls how tool responses are filtered before being visible to the agent. */
export type ResponseFilterMode = "all" | "allow" | "hide_all";

export type ResponseUnitTestModel = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataOutput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeOutput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelOutput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** A prompt that evaluates whether the agent's response is successful. Should return True or False. */
  success_condition?: string;
  /** Non-empty list of example responses that should be considered successful */
  success_examples?: (AgentSuccessfulResponseExample)[];
  /** Non-empty list of example responses that should be considered failures */
  failure_examples?: (AgentFailureResponseExample)[];
};

export type RestoreCalendarEventParams = {
  smb_tool_type?: string;
};

export type ResubmitTestsRequestModel = {
  /** List of test run IDs to resubmit */
  test_run_ids: (string)[];
  /** Configuration overrides to use for testing. If not provided, the agent's default configuration will be used. */
  agent_config_override?: AdhocAgentConfigOverrideForTestRequestModel | null;
  /** Agent ID to resubmit tests for */
  agent_id: string;
  /** ID of the branch to run the tests on. If not provided, the tests will be run on the agent default configuration. */
  branch_id?: string | null;
};

export type RetryTriggerAction = {
  type?: string;
  /** Custom feedback to inject into the agent when retrying after guardrail trigger. */
  feedback?: string;
};

export type ReviewResponseModel = {
  review_status: "approved" | "edits_required" | "rejected";
  reviewed_at_unix: number;
  reviewed_by?: string | null;
  reject_reasons?: ("lacks_structure" | "doesnt_open" | "not_literary_work" | "language_not_supported" | "too_short" | "duplicate" | "promotional" | "formatting_issues" | "low_quality" | "metadata_incomplete" | "metadata_inaccurate" | "typos" | "review_error" | "spam" | "legal_violation" | "content_policy" | "public_domain" | "other")[] | null;
  scores_breakdown?: { [key: string]: number | undefined } | null;
  rejected_details?: string | null;
  explanation?: string | null;
};

export type RunAgentTestsRequestModel = {
  /** List of tests to run on the agent */
  tests: (SingleTestRunRequestModel)[];
  /** Configuration overrides to use for testing. If not provided, the agent's default configuration will be used. */
  agent_config_override?: AdhocAgentConfigOverrideForTestRequestModel | null;
  /** ID of the branch to run the tests on. If not provided, the tests will be run on the agent default configuration. */
  branch_id?: string | null;
  /** Number of times to run each test. When greater than 1, results are grouped and summarized. */
  repeat_count?: number;
};

export type SipLogMessage = {
  call_id: string;
  phone_numbers: (string)[];
  local_address: string;
  remote_address: string;
  transport: string;
  raw_message: string;
  error_message: string;
  direction: SipLogMessageDirection;
  created_at_unix_micro: number;
};

export type SipLogMessageDirection = "in" | "out";

export type SipMediaEncryptionEnum = "disabled" | "allowed" | "required";

export type SipTrunkCredentialsRequestModel = {
  /** SIP trunk username */
  username: string;
  /** SIP trunk password - if not specified, then remain unchanged */
  password?: string | null;
};

export type SipTrunkOutboundCallResponse = {
  success: boolean;
  message: string;
  conversation_id: string | null;
  sip_call_id: string | null;
};

export type SipTrunkTransportEnum = "auto" | "udp" | "tcp" | "tls";

export type SipUriDynamicVariableTransferDestination = {
  type?: string;
  sip_uri: string;
};

export type SipUriTransferDestination = {
  type?: string;
  sip_uri: string;
};

/** SMB tool configuration that wraps SMB tool parameters. */
export type SmbToolConfig = {
  /** Tool type identifier */
  type?: string;
  name: string;
  /** Description of when the tool should be used and what it does. */
  description?: string;
  /** The maximum time in seconds to wait for the tool call to complete. */
  response_timeout_secs?: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions?: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech?: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments?: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode?: ToolErrorHandlingMode;
  /** Whether this tool is enabled for the agent */
  enabled?: boolean;
  params: SearchClientsParams | ListClientsParams | GetClientByPhoneParams | CreateClientParams | UpdateClientParams | DeleteClientParams | ListStaffParams | CreateStaffParams | UpdateStaffParams | DeleteStaffParams | ListAssetsParams | CreateAssetParams | UpdateAssetParams | DeleteAssetParams | ListServicesParams | CreateServiceParams | UpdateServiceParams | DeleteServiceParams | ListProductsParams | CreateProductParams | UpdateProductParams | DeleteProductParams | CheckServiceAvailabilityParams | CreateClientAppointmentParams | GetClientAppointmentsParams | GetAppointmentByConfirmationNumberParams | ListGroupSessionsParams | ScheduleGroupSessionParams | RegisterForGroupSessionParams | CancelGroupSessionRegistrationParams | UpdateGroupSessionSeatsParams | CancelGroupSessionForAllParams | DeleteGroupSessionParams | ListCalendarEventsParams | UpdateCalendarEventParams | CancelCalendarEventParams | RestoreCalendarEventParams | DeleteCalendarEventParams | ListCustomerFacingAgentsParams | ListAgentRulesParams | CreateAgentRuleParams | UpdateAgentRuleParams | DeleteAgentRuleParams | ListHolidaysParams | CreateHolidayParams | UpdateHolidayParams | DeleteHolidayParams | GetScheduleParams | UpdateBusinessInfoParams | UpdateCustomerFacingConfigParams | GetAnalyticsSummaryParams | GetBookingPageSettingsParams | UpdateBookingPageSettingsParams | GetBookingSlugStatusParams | SetBookingSlugParams | ListClientInteractionsParams | CreateClientInteractionParams | DeleteClientInteractionParams | ListLocationsParams | CreateLocationParams | UpdateLocationParams | DeleteLocationParams | LeaveMessageParams | ReportKnowledgeGapParams | OptInSmsReminderParams | OptOutSmsReminderParams;
};

export type SmsConversationInfo = {
  direction: "inbound" | "outbound";
  phone_number_id?: string | null;
  sms_user_phone_number: string;
  agent_phone_number?: string | null;
};

/** Safety object that has the information of safety evaluations based on used voice. */
export type SafetyCommonModel = {
  ivc?: SafetyEvaluation;
  non_ivc?: SafetyEvaluation;
};

/** Safety evaluation of the agent. Prompt and first message is taken into account. The unsafe reason is provided from the evaluation */
export type SafetyEvaluation = {
  is_unsafe?: boolean;
  llm_reason?: string;
  safety_prompt_version?: number;
  matched_rule_id?: (SafetyRule)[];
};

export type SafetyResponseModel = {
  is_blocked_ivc?: boolean;
  is_blocked_non_ivc?: boolean;
  ignore_safety_evaluation?: boolean;
};

export type SafetyRule = "sexual_minors" | "forget_moderation" | "extremism" | "scam_fraud" | "political" | "self_harm" | "illegal_distribution_medical" | "sexual_adults" | "unknown";

export type SampleConfigDbModel = {
  is_sample?: boolean;
  parent_id?: string | null;
  parent_type?: "read" | "collection" | null;
  chapter_ids?: (string)[] | null;
};

export type SampleResponseModel = {
  /** The ID of the sample. */
  sample_id: string;
  /** The name of the sample file. */
  file_name: string;
  /** The MIME type of the sample file. */
  mime_type: string;
  /** The size of the sample file in bytes. */
  size_bytes: number;
  /** The hash of the sample file. */
  hash: string;
  duration_secs?: number | null;
  remove_background_noise?: boolean | null;
  has_isolated_audio?: boolean | null;
  has_isolated_audio_preview?: boolean | null;
  speaker_separation?: SpeakerSeparationResponseModel | null;
  trim_start?: number | null;
  trim_end?: number | null;
};

export type SayNodeLiteralMessageInput = {
  type?: string;
  /** Literal text message to be spoken by the agent. */
  text: string;
};

export type SayNodeLiteralMessageOutput = {
  type: string;
  /** Literal text message to be spoken by the agent. */
  text: string;
};

export type SayNodePromptMessageInput = {
  type?: string;
  /** LLM prompt describing what message should be generated. */
  prompt: string;
};

export type SayNodePromptMessageOutput = {
  type: string;
  /** LLM prompt describing what message should be generated. */
  prompt: string;
};

/** Schedule a single instance of a group service.  The session's duration is derived from the parent service so the assistant only has to pin start time, the (optional) instructor / room, and the location. Participants register separately via ``register_for_group_session``. */
export type ScheduleGroupSessionParams = {
  smb_tool_type?: string;
};

export type ScopedAnalysisResult = {
  /** The scope of the analysis. 'conversation' uses the full transcript; 'agent' uses only the portion where the defining agent was active. */
  scope: AnalysisScope;
  source_agent_id: string;
  /** Branch of the agent for this scoped block; disambiguates repeated agent_id. */
  source_branch_id?: string | null;
  evaluation_criteria_results?: { [key: string]: ConversationHistoryEvaluationCriteriaResultCommonModel | undefined };
  data_collection_results?: { [key: string]: DataCollectionResultCommonModel | undefined };
  successful: EvaluationSuccessResult;
};

/** Search for clients by name, phone number, or email. */
export type SearchClientsParams = {
  smb_tool_type?: string;
};

export type SearchHighlightSegment = {
  value: string;
  is_hit: boolean;
};

/** Seat types for workspace members. */
export type SeatType = "workspace_admin" | "workspace_member" | "workspace_lite_member";

export type SecretDependencyResourceType = "tools" | "agents" | "phone_numbers";

export type SecretDependencyType = "conversation_initiation_webhook";

export type SectionSource = {
  /** The ID of the song to source the section from. You can find the song ID in the response headers when you generate a song. */
  song_id: string;
  /** The range to extract from the source song. */
  range: TimeRange;
  /** The ranges to exclude from the 'range'. */
  negative_ranges?: (TimeRange)[];
};

export type SegmentCreatePayload = {
  start_time: number;
  end_time: number;
  text?: string | null;
  translations?: { [key: string]: string | undefined } | null;
};

export type SegmentCreateResponse = {
  version: number;
  new_segment: string;
};

export type SegmentDeleteResponse = {
  version: number;
};

export type SegmentDubResponse = {
  version: number;
};

export type SegmentMigrationResponse = {
  version: number;
};

export type SegmentSubtitleFrame = {
  start_time: number;
  end_time: number;
  lines: (string)[];
};

export type SegmentTranscriptionResponse = {
  version: number;
};

export type SegmentTranslationResponse = {
  version: number;
};

export type SegmentUpdatePayload = {
  start_time?: number | null;
  end_time?: number | null;
  text?: string | null;
};

export type SegmentUpdateResponse = {
  version: number;
};

export type SegmentedJsonExportOptions = {
  include_speakers?: boolean;
  include_timestamps?: boolean;
  format: string;
  segment_on_silence_longer_than_s?: number | null;
  max_segment_duration_s?: number | null;
  max_segment_chars?: number | null;
};

export type SetBookingSlugParams = {
  smb_tool_type?: string;
};

/** OCSF Severity levels.  Spec: https://schema.ocsf.io/1.6.0/objects/severity_id */
export type SeverityId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;

/** Context for sound effect clips. */
export type SfxSourceContext = {
  source_type?: string;
  sound_generation_history_item_id?: string | null;
  text?: string | null;
  generation_config?: { [key: string]: unknown } | null;
};

export type ShareOptionResponseModel = {
  /** The name of the principal. */
  name: string;
  /** The ID of the principal. */
  id: string;
  /** The type of the principal: user, group, or service account (under 'key'). */
  type: "user" | "group" | "key";
};

export type SimilarVoice = {
  voice_id: string;
  name: string;
  category: VoiceCategory;
  description?: string | null;
  preview_url?: string | null;
};

export type SimilarVoicesForSpeakerResponse = {
  voices: (SimilarVoice)[];
};

export type SimulationTestModel = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataOutput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeOutput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelOutput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** A prompt that evaluates whether the agent's response is successful. Should return True or False. */
  success_condition?: string;
  /** Description of the simulation scenario and user persona for simulation tests. */
  simulation_scenario?: string;
  /** Maximum number of conversation turns for simulation tests. */
  simulation_max_turns?: number;
  /** The environment to use when running this simulation test. If not provided, defaults to 'production'. */
  simulation_environment?: string | null;
  /** Configuration for which tools to mock and fallback behavior. */
  tool_mock_config?: SimulationToolMockBehaviorConfig;
  /** LLM model to use for evaluating simulation results. Defaults to Claude Sonnet 4.6. */
  evaluation_model?: Llm | null;
  /** LLM model for the simulated user. Defaults to Claude Sonnet 4.6. */
  simulated_user_model?: Llm | null;
};

/** Simulation/preview-side config: tools are identified by IDs, resolved to names at runtime. */
export type SimulationToolMockBehaviorConfig = {
  /** Which tools to mock: 'all' mocks every mockable tool, 'selected' mocks only those in mocked_tool_names/mocked_tool_ids, 'none' disables mocking. */
  mocking_strategy?: MockingStrategy;
  /** Behavior when no mock matches a tool call. */
  fallback_strategy?: MockNoMatchBehavior;
  /** Tool IDs to mock. Resolved to tool names before being passed to the orchestrator. */
  mocked_tool_ids?: (string)[];
};

export type SingleLanguagesResponse = {
  /** Indicates this response contains single languages (not source-to-destination pairs). */
  kind?: string;
  /** The list of available languages. */
  languages: (LanguageInfo)[];
};

export type SingleTestRunRequestModel = {
  /** ID of the test to run */
  test_id: string;
  /** ID of the workflow node to run the test on. If not provided, the test will be run on the agent's default workflow node. */
  workflow_node_id?: string | null;
  /** ID of the root folder to run the test on. If not provided, the test will be run on the agent's default folder. */
  root_folder_id?: string | null;
  /** Name of the root folder to run the test on. If not provided, the test will be run on the agent's default folder. */
  root_folder_name?: string | null;
};

export type SingleUseTokenResponseModel = {
  /** A time bound single use token that expires after 15 minutes. Will be consumed on use. */
  token: string;
};

export type SingleUseTokenType = "realtime_scribe" | "tts_websocket";

/** Allows the agent to explicitly skip its turn.  This tool should be invoked by the LLM when the user indicates they would like to think or take a short pause before continuing the conversation—e.g. when they say: "Give me a second", "Let me think", or "One moment please".  After calling this tool, the assistant should not speak until the user speaks again, or another normal turn-taking condition is met.  The tool itself has no parameters and performs no side-effects other than informing the backend that the current turn generation is complete. */
export type SkipTurnToolConfig = {
  system_tool_type?: string;
};

export type SkipTurnToolResponseModel = {
  result_type?: string;
  status?: string;
  reason?: string | null;
};

/** Response model for the internal Slack BYO bot auth connection. */
export type SlackBotAuthResponse = {
  name: string;
  auth_type?: string;
  provider?: string;
  id: string;
  used_by?: AuthConnectionDependencies | null;
};

/** Configuration for soft timeout functionality during LLM response generation. */
export type SoftTimeoutConfig = {
  /** Time in seconds before showing the predefined message while waiting for LLM response. Set to -1 to disable. */
  timeout_seconds?: number;
  /** Message to show when soft timeout is reached while waiting for LLM response */
  message?: string;
  /** If enabled, the soft timeout message will be generated dynamically instead of using the static message. */
  use_llm_generated_message?: boolean;
  /** Custom prompt for generating the soft timeout filler message when use_llm_generated_message is enabled. Recent conversation context is provided as a separate user message. If not set, the default prompt will be used. */
  llm_generated_message_prompt_override?: string | null;
};

export type SoftTimeoutConfigOverride = {
  /** Message to show when soft timeout is reached while waiting for LLM response */
  message?: string | null;
};

export type SoftTimeoutConfigOverrideConfig = {
  /** Whether to allow overriding the message field. */
  message?: boolean;
};

export type SoftTimeoutConfigWorkflowOverride = {
  /** Time in seconds before showing the predefined message while waiting for LLM response. Set to -1 to disable. */
  timeout_seconds?: number | null;
  /** Message to show when soft timeout is reached while waiting for LLM response */
  message?: string | null;
  /** If enabled, the soft timeout message will be generated dynamically instead of using the static message. */
  use_llm_generated_message?: boolean | null;
  /** Custom prompt for generating the soft timeout filler message when use_llm_generated_message is enabled. Recent conversation context is provided as a separate user message. If not set, the default prompt will be used. */
  llm_generated_message_prompt_override?: string | null;
};

export type SongMetadata = {
  /** The title of the song */
  title: string | null;
  /** The description of the song */
  description: string | null;
  /** The genres of the song */
  genres: (string)[];
  /** The languages of the song */
  languages: (string)[];
  /** Whether the song is explicit */
  is_explicit: boolean | null;
};

export type SongSection = {
  /** The name of the section. Must be between 1 and 100 characters. */
  section_name: string;
  /** The styles and musical directions that should be present in this section. Use English language for best result. */
  positive_local_styles: (string)[];
  /** The styles and musical directions that should not be present in this section. Use English language for best result. */
  negative_local_styles: (string)[];
  /** The duration of the section in milliseconds. Must be between 3000ms and 120000ms. */
  duration_ms: number;
  /** The lyrics of the section. Max 200 characters per line. */
  lines: (string)[];
  /** Optional source to extract the section from. Used for inpainting. Only available to enterprise clients with access to the inpainting feature. */
  source_from?: SectionSource | null;
};

export type SongSourceContext = {
  source_type?: string;
  song_id: string;
  title?: string | null;
  description?: string | null;
  genres?: (string)[];
  languages?: (string)[];
  is_explicit?: boolean | null;
  bpm?: number | null;
  generation_settings?: { [key: string]: unknown } | null;
};

export type SortDirection = "asc" | "desc";

export type SpeakerAudioResponseModel = {
  /** The base64 encoded audio. */
  audio_base_64: string;
  /** The media type of the audio. */
  media_type: string;
  /** The duration of the audio in seconds. */
  duration_secs: number;
};

export type SpeakerCreatedResponse = {
  version: number;
  speaker_id: string;
};

export type SpeakerResponseModel = {
  /** The ID of the speaker. */
  speaker_id: string;
  /** The duration of the speaker segment in seconds. */
  duration_secs: number;
  /** The utterances of the speaker. */
  utterances?: (UtteranceResponseModel)[] | null;
};

export type SpeakerSegment = {
  id: string;
  start_time: number;
  end_time: number;
  text: string;
  subtitles: (SegmentSubtitleFrame)[];
  dubs: { [key: string]: DubbedSegment | undefined };
};

export type SpeakerSeparationResponseModel = {
  /** The ID of the voice. */
  voice_id: string;
  /** The ID of the sample. */
  sample_id: string;
  /** The status of the speaker separation. */
  status: "not_started" | "pending" | "completed" | "failed";
  /** The speakers of the sample. */
  speakers?: { [key: string]: SpeakerResponseModel | undefined } | null;
  /** The IDs of the selected speakers. */
  selected_speaker_ids?: (string)[] | null;
};

export type SpeakerTrack = {
  id: string;
  media_ref: DubbingMediaReference;
  speaker_name: string;
  voices: { [key: string]: string | undefined };
  segments: (string)[];
};

export type SpeakerUpdatedResponse = {
  version: number;
};

export type SpeechEngineConfig = {
  /** The WebSocket URL for the transcript server */
  ws_url: string;
  /** Headers to include in the WebSocket connection request */
  request_headers?: { [key: string]: string | ConvAiSecretLocator | ConvAiDynamicVariable | undefined };
};

export type SpeechEngineConversationInitiationClientDataConfig = {
  /** Whether the first message can be overridden by the client */
  first_message?: boolean;
};

export type SpeechEngineResponse = {
  /** The speech engine resource ID */
  speech_engine_id: string;
  /** Human-readable name for the speech engine */
  name: string;
  /** WebSocket connection settings for the upstream transcript server */
  speech_engine: SpeechEngineConfig;
  /** Automatic speech recognition configuration */
  asr: AsrConversationalConfig;
  /** Text-to-speech output configuration */
  tts: TtsConversationalConfigOutput;
  /** Turn detection configuration */
  turn: BaseTurnConfig;
  /** Conversation-level settings including client events and duration limits */
  conversation: ConversationConfigOutput;
  /** Privacy settings controlling recording, retention, and PII handling */
  privacy: PrivacyConfigOutput;
  /** Concurrency and daily conversation limits for this speech engine */
  call_limits: AgentCallLimits;
  /** ISO language code used by the speech engine (e.g. 'en') */
  language: string;
  /** Arbitrary tags for categorization and filtering */
  tags: (string)[];
  /** Override settings the client may set during conversation initiation */
  overrides: SpeechEngineConversationInitiationClientDataConfig;
  /** Creation and update timestamps with source information */
  metadata: AgentMetadataDbModel;
  /** The access information of the speech engine for the user */
  access_info?: ResourceAccessInfo | null;
};

export type SpeechEngineSummaryResponse = {
  /** The speech engine resource ID */
  speech_engine_id: string;
  /** Human-readable name for the speech engine */
  name: string;
  /** Creation time in Unix seconds */
  created_at_unix_secs: number;
  /** Arbitrary tags for categorization and filtering */
  tags: (string)[];
  /** The access information of the speech engine for the user */
  access_info: ResourceAccessInfo;
};

export type SpeechHistoryItemResponseModel = {
  /** The ID of the history item. */
  history_item_id: string;
  /** The ID of the request. */
  request_id?: string | null;
  /** The ID of the voice used. */
  voice_id?: string | null;
  /** The ID of the model. */
  model_id?: string | null;
  /** The name of the voice. */
  voice_name?: string | null;
  /** The category of the voice. Either 'premade', 'cloned', 'generated' or 'professional'. */
  voice_category?: "premade" | "cloned" | "generated" | "professional" | null;
  /** The text used to generate the audio item. */
  text?: string | null;
  /** Unix timestamp of when the item was created. */
  date_unix: number;
  /** The character count change from. */
  character_count_change_from: number;
  /** The character count change to. */
  character_count_change_to: number;
  /** The content type of the generated item. */
  content_type: string;
  /** The state of the history item. */
  state: "created" | "deleted" | "processing";
  /** The settings of the history item. */
  settings?: { [key: string]: unknown } | null;
  /** Feedback associated with the generated item. Returns null if no feedback has been provided. */
  feedback?: FeedbackResponseModel | null;
  /** The ID of the share link. */
  share_link_id?: string | null;
  /** The source of the history item. Either TTS (text to speech), STS (speech to text), AN (audio native), Projects, Dubbing, PlayAPI, PD (pronunciation dictionary) or ConvAI (Agents Platform). */
  source?: "TTS" | "STS" | "Projects" | "PD" | "AN" | "Dubbing" | "PlayAPI" | "ConvAI" | "VoiceGeneration" | "InVPC" | null;
  /** The alignments of the history item. */
  alignments?: HistoryAlignmentsResponseModel | null;
  /** The dialogue (voice and text pairs) used to generate the audio item. If this is set then the top level `text` and `voice_id` fields will be empty. */
  dialogue?: (DialogueInputResponseModel)[] | null;
  /** The output format the audio was originally generated in. */
  output_format?: string | null;
};

export type SpeechToTextCharacterResponseModel = {
  /** The character that was transcribed. */
  text: string;
  /** The start time of the character in seconds. */
  start?: number | null;
  /** The end time of the character in seconds. */
  end?: number | null;
};

/** Chunk-level detail of the transcription with timing information. */
export type SpeechToTextChunkResponseModel = {
  /** The detected language code (e.g. 'eng' for English). */
  language_code: string;
  /** The confidence score of the language detection (0 to 1). */
  language_probability: number;
  /** The raw text of the transcription. */
  text: string;
  /** List of words with their timing information. */
  words: (SpeechToTextWordResponseModel)[];
  /** The channel index this transcript belongs to (for multichannel audio). */
  channel_index?: number | null;
  /** Requested additional formats of the transcript. */
  additional_formats?: (AdditionalFormatResponseModel | null)[] | null;
  /** The transcription ID of the response. */
  transcription_id?: string | null;
  /** List of detected entities with their text, type, and character positions in the transcript. */
  entities?: (DetectedEntity)[] | null;
  /** The duration of the audio that was transcribed in seconds. */
  audio_duration_secs?: number | null;
};

export type SpeechToTextWebhookResponseModel = {
  /** The message of the webhook response. */
  message: string;
  /** The request ID of the webhook response. */
  request_id: string;
  /** The transcription ID of the webhook response. */
  transcription_id?: string | null;
};

/** Word-level detail of the transcription with timing information. */
export type SpeechToTextWordResponseModel = {
  /** The word or sound that was transcribed. */
  text: string;
  /** The start time of the word or sound in seconds. */
  start?: number | null;
  /** The end time of the word or sound in seconds. */
  end?: number | null;
  /** The type of the word or sound. 'audio_event' is used for non-word sounds like laughter or footsteps. */
  type: "word" | "spacing" | "audio_event";
  /** Unique identifier for the speaker of this word. */
  speaker_id?: string | null;
  /** The log of the probability with which this word was predicted. Logprobs are in range [-infinity, 0], higher logprobs indicate a higher confidence the model has in its predictions. */
  logprob: number;
  /** The characters that make up the word and their timing information. */
  characters?: (SpeechToTextCharacterResponseModel)[] | null;
};

/** Controls if the agent should be more patient when user is spelling numbers and named entities. */
export type SpellingPatience = "auto" | "off";

export type SrtExportOptions = {
  max_characters_per_line?: number | null;
  include_speakers?: boolean;
  include_timestamps?: boolean;
  format: string;
  segment_on_silence_longer_than_s?: number | null;
  max_segment_duration_s?: number | null;
  max_segment_chars?: number | null;
};

export type StartPvcVoiceTrainingResponseModel = {
  /** The status of the start PVC voice training request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type StartSpeakerSeparationResponseModel = {
  /** The status of the start speaker seperation request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

/** OCSF Status levels.  Spec: https://schema.ocsf.io/1.6.0/objects/status_id */
export type StatusId = 0 | 1 | 2 | 99;

export type StreamingAudioChunkWithTimestampsAndVoiceSegmentsResponseModel = {
  /** Base64 encoded audio data */
  audio_base64: string;
  /** Timestamp information for each character in the original text */
  alignment?: CharacterAlignmentResponseModel | null;
  /** Timestamp information for each character in the normalized text */
  normalized_alignment?: CharacterAlignmentResponseModel | null;
  /** Voice segments for the audio */
  voice_segments: (VoiceSegment)[];
};

export type StreamingAudioChunkWithTimestampsResponseModel = {
  /** Base64 encoded audio data */
  audio_base64: string;
  /** Timestamp information for each character in the original text */
  alignment?: CharacterAlignmentResponseModel | null;
  /** Timestamp information for each character in the normalized text */
  normalized_alignment?: CharacterAlignmentResponseModel | null;
};

export type StudioAgentSettingsModel = {
  tool_settings?: { [key: string]: StudioAgentToolSettingsModel | undefined };
};

export type StudioAgentToolSettingsModel = {
  skip_confirmation?: boolean;
};

export type StudioClipReference = {
  project_id: string;
  chapter_id: string;
  clip_type: "video" | "image" | "external_audio" | "tts_node";
  clip_id: string;
  block_id?: string | null;
  preview_url?: string | null;
};

export type StudioTextStyleOutlineModel = {
  enabled: boolean;
  color: string;
  opacity: number;
  width: number;
};

export type StudioTextStyleShadowModel = {
  enabled: boolean;
  color: string;
  opacity: number;
  blur: number;
  offset_x: number;
  offset_y: number;
};

export type SubmitOrderResponse = {
  /** The ID of the submitted order. */
  order_id: OrderId;
  /** The current state of the order after submission. */
  state: OrderState;
  /** The timestamp when the order was submitted. */
  submitted_at: string;
};

export type SubscriptionResponseModel = {
  /** The tier of the user's subscription. */
  tier: string;
  /** The number of characters used by the user. */
  character_count: number;
  /** The maximum number of characters allowed in the current billing period. */
  character_limit: number;
  /** Deprecated: use `max_credit_limit_extension`. Maximum number of characters that the character limit can be exceeded by. Managed by the workspace admin. */
  max_character_limit_extension: number | null;
  /** Maximum number of credits that the credit limit can be exceeded by. Managed by the workspace admin. `"unlimited"` means no cap, `0` means usage-based billing is disabled. */
  max_credit_limit_extension: number | string;
  /** Whether the workspace is entitled to enter overages (usage-based billing). */
  can_extend_character_limit: boolean;
  /** Deprecated: use `max_credit_limit_extension != 0`. Whether the user is allowed to extend their character limit. */
  allowed_to_extend_character_limit: boolean;
  /** The Unix timestamp of the next character count reset. */
  next_character_count_reset_unix?: number | null;
  /** The number of voice slots used by the user. */
  voice_slots_used: number;
  /** The number of professional voice slots used by the workspace/user if single seat. */
  professional_voice_slots_used: number;
  /** The maximum number of voice slots allowed for the user. */
  voice_limit: number;
  /** The maximum number of voice add/edits allowed for the user. */
  max_voice_add_edits?: number | null;
  /** The number of voice add/edits used by the user. */
  voice_add_edit_counter: number;
  /** The maximum number of professional voices allowed for the user. */
  professional_voice_limit: number;
  /** Whether the user can extend their voice limit. */
  can_extend_voice_limit: boolean;
  /** Whether the user can use instant voice cloning. */
  can_use_instant_voice_cloning: boolean;
  /** Whether the user can use professional voice cloning. */
  can_use_professional_voice_cloning: boolean;
  /** The currency of the user's subscription. */
  currency?: Currency | null;
  /** The current usage-based overage cost. */
  current_overage: Price;
  /** The status of the user's subscription. */
  status: SubscriptionStatusType;
  /** The billing period of the user's subscription. */
  billing_period?: BillingPeriod | null;
  /** The character refresh period of the user's subscription. */
  character_refresh_period?: CharacterRefreshPeriod | null;
};

export type SubscriptionStatusType = "trialing" | "active" | "incomplete" | "past_due" | "free" | "free_disabled";

export type SubtitleOrderItemRequest = {
  /** The type of order item. */
  kind?: string;
  /** The IDs of the uploaded media files to generate subtitles for. */
  media_ids: (MediaId)[];
  /** The language code of the source media (e.g. 'en', 'es'). */
  source_language: string;
  /** List of target language codes. Subtitles will be generated for each media file in each destination language. */
  destination_languages: (string)[];
  /** Formatting options for subtitle cues such as duration, line count, and character limits. */
  cue_options?: CueOptionsRequest;
  /** Whether subtitles should use SDH format, which includes descriptions for deaf and hard-of-hearing viewers. */
  sdh?: boolean;
  /** Optional free-text instructions for the subtitling team. */
  instructions?: string | null;
};

export type SuggestedAudioTag = {
  /** Audio tag to use (for best performance, 1-2 words, e.g., 'happy', 'excited') */
  tag: string;
  /** Optional description of when to use this tag */
  description?: string | null;
};

export type SupportedVoice = {
  label: string;
  voice_id: string;
  description?: string | null;
  language?: string | null;
  model_family?: TtsModelFamily | null;
  optimize_streaming_latency?: TtsOptimizeStreamingLatency | null;
  stability?: number | null;
  speed?: number | null;
  similarity_boost?: number | null;
};

export type SystemEvaluationCriteria = {
  user_sentiment_score: number;
  user_frustration_score: number;
};

/** A system tool is a tool that is used to call a system method in the server */
export type SystemToolConfigInput = {
  /** The type of tool */
  type?: string;
  name: string;
  /** Description of when the tool should be used and what it does. Leave empty to use the default description that's optimized for the specific tool type. */
  description?: string;
  /** The maximum time in seconds to wait for the tool call to complete. */
  response_timeout_secs?: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions?: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech?: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments?: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode?: ToolErrorHandlingMode;
  params: EndCallToolConfig | LanguageDetectionToolConfig | TransferToAgentToolConfig | TransferToNumberToolConfigInput | SkipTurnToolConfig | PlayDtmfToolConfig | VoicemailDetectionToolConfig | KnowledgeBaseRagToolConfig | LoadProcedureToolConfigInput;
};

/** A system tool is a tool that is used to call a system method in the server */
export type SystemToolConfigOutput = {
  /** The type of tool */
  type?: string;
  name: string;
  /** Description of when the tool should be used and what it does. Leave empty to use the default description that's optimized for the specific tool type. */
  description?: string;
  /** The maximum time in seconds to wait for the tool call to complete. */
  response_timeout_secs?: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions?: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech?: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments?: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode?: ToolErrorHandlingMode;
  params: EndCallToolConfig | LanguageDetectionToolConfig | TransferToAgentToolConfig | TransferToNumberToolConfigOutput | SkipTurnToolConfig | PlayDtmfToolConfig | VoicemailDetectionToolConfig | KnowledgeBaseRagToolConfig | LoadProcedureToolConfigOutput;
};

export type TtsConversationalConfigInput = {
  /** The model to use for TTS */
  model_id?: TtsConversationalModel;
  /** The voice ID to use for TTS */
  voice_id?: string;
  /** Additional supported voices for the agent */
  supported_voices?: (SupportedVoice)[];
  /** When enabled, applies expressive audio tags prompt. Automatically disabled for non-v3 models. */
  expressive_mode?: boolean;
  /** Suggested audio tags to boost expressive speech (for eleven_v3 and eleven_v3_conversational models). The agent can still use other tags not listed here. */
  suggested_audio_tags?: (SuggestedAudioTag)[];
  /** The audio format to use for TTS */
  agent_output_audio_format?: TtsOutputFormat;
  /** The optimization for streaming latency */
  optimize_streaming_latency?: TtsOptimizeStreamingLatency;
  /** The stability of generated speech */
  stability?: number;
  /** The speed of generated speech */
  speed?: number;
  /** The similarity boost for generated speech */
  similarity_boost?: number;
  /** Method for converting numbers to words before converting text to speech. If set to SYSTEM_PROMPT, the system prompt will be updated to include normalization instructions. If set to ELEVENLABS, the text will be normalized after generation, incurring slight additional latency. */
  text_normalisation_type?: TextNormalisationType;
  /** The pronunciation dictionary locators */
  pronunciation_dictionary_locators?: (PydanticPronunciationDictionaryVersionLocator)[];
};

export type TtsConversationalConfigOutput = {
  /** The model to use for TTS */
  model_id?: TtsConversationalModel;
  /** The voice ID to use for TTS */
  voice_id?: string;
  /** Additional supported voices for the agent */
  supported_voices?: (SupportedVoice)[];
  /** When enabled, applies expressive audio tags prompt. Automatically disabled for non-v3 models. */
  expressive_mode?: boolean;
  /** Suggested audio tags to boost expressive speech (for eleven_v3 and eleven_v3_conversational models). The agent can still use other tags not listed here. */
  suggested_audio_tags?: (SuggestedAudioTag)[];
  /** The audio format to use for TTS */
  agent_output_audio_format?: TtsOutputFormat;
  /** The optimization for streaming latency */
  optimize_streaming_latency?: TtsOptimizeStreamingLatency;
  /** The stability of generated speech */
  stability?: number;
  /** The speed of generated speech */
  speed?: number;
  /** The similarity boost for generated speech */
  similarity_boost?: number;
  /** Method for converting numbers to words before converting text to speech. If set to SYSTEM_PROMPT, the system prompt will be updated to include normalization instructions. If set to ELEVENLABS, the text will be normalized after generation, incurring slight additional latency. */
  text_normalisation_type?: TextNormalisationType;
  /** The pronunciation dictionary locators */
  pronunciation_dictionary_locators?: (PydanticPronunciationDictionaryVersionLocator)[];
};

export type TtsConversationalConfigOverride = {
  /** The voice ID to use for TTS */
  voice_id?: string | null;
  /** The stability of generated speech */
  stability?: number | null;
  /** The speed of generated speech */
  speed?: number | null;
  /** The similarity boost for generated speech */
  similarity_boost?: number | null;
};

export type TtsConversationalConfigOverrideConfig = {
  /** Whether to allow overriding the voice_id field. */
  voice_id?: boolean;
  /** Whether to allow overriding the stability field. */
  stability?: boolean;
  /** Whether to allow overriding the speed field. */
  speed?: boolean;
  /** Whether to allow overriding the similarity_boost field. */
  similarity_boost?: boolean;
};

export type TtsConversationalConfigWorkflowOverrideInput = {
  /** The model to use for TTS */
  model_id?: TtsConversationalModel | null;
  /** The voice ID to use for TTS */
  voice_id?: string | null;
  /** Additional supported voices for the agent */
  supported_voices?: (SupportedVoice)[] | null;
  /** When enabled, applies expressive audio tags prompt. Automatically disabled for non-v3 models. */
  expressive_mode?: boolean | null;
  /** Suggested audio tags to boost expressive speech (for eleven_v3 and eleven_v3_conversational models). The agent can still use other tags not listed here. */
  suggested_audio_tags?: (SuggestedAudioTag)[] | null;
  /** The audio format to use for TTS */
  agent_output_audio_format?: TtsOutputFormat | null;
  /** The optimization for streaming latency */
  optimize_streaming_latency?: TtsOptimizeStreamingLatency | null;
  /** The stability of generated speech */
  stability?: number | null;
  /** The speed of generated speech */
  speed?: number | null;
  /** The similarity boost for generated speech */
  similarity_boost?: number | null;
  /** Method for converting numbers to words before converting text to speech. If set to SYSTEM_PROMPT, the system prompt will be updated to include normalization instructions. If set to ELEVENLABS, the text will be normalized after generation, incurring slight additional latency. */
  text_normalisation_type?: TextNormalisationType | null;
  /** The pronunciation dictionary locators */
  pronunciation_dictionary_locators?: (PydanticPronunciationDictionaryVersionLocator)[] | null;
};

export type TtsConversationalConfigWorkflowOverrideOutput = {
  /** The model to use for TTS */
  model_id?: TtsConversationalModel | null;
  /** The voice ID to use for TTS */
  voice_id?: string | null;
  /** Additional supported voices for the agent */
  supported_voices?: (SupportedVoice)[] | null;
  /** When enabled, applies expressive audio tags prompt. Automatically disabled for non-v3 models. */
  expressive_mode?: boolean | null;
  /** Suggested audio tags to boost expressive speech (for eleven_v3 and eleven_v3_conversational models). The agent can still use other tags not listed here. */
  suggested_audio_tags?: (SuggestedAudioTag)[] | null;
  /** The audio format to use for TTS */
  agent_output_audio_format?: TtsOutputFormat | null;
  /** The optimization for streaming latency */
  optimize_streaming_latency?: TtsOptimizeStreamingLatency | null;
  /** The stability of generated speech */
  stability?: number | null;
  /** The speed of generated speech */
  speed?: number | null;
  /** The similarity boost for generated speech */
  similarity_boost?: number | null;
  /** Method for converting numbers to words before converting text to speech. If set to SYSTEM_PROMPT, the system prompt will be updated to include normalization instructions. If set to ELEVENLABS, the text will be normalized after generation, incurring slight additional latency. */
  text_normalisation_type?: TextNormalisationType | null;
  /** The pronunciation dictionary locators */
  pronunciation_dictionary_locators?: (PydanticPronunciationDictionaryVersionLocator)[] | null;
};

export type TtsConversationalModel = "eleven_turbo_v2" | "eleven_turbo_v2_5" | "eleven_flash_v2" | "eleven_flash_v2_5" | "eleven_multilingual_v2" | "eleven_v3_conversational";

export type TtsModelFamily = "turbo" | "flash" | "multilingual" | "v3_conversational";

export type TtsOptimizeStreamingLatency = 0 | 1 | 2 | 3 | 4;

export type TtsOutputFormat = "pcm_8000" | "pcm_16000" | "pcm_22050" | "pcm_24000" | "pcm_44100" | "pcm_48000" | "ulaw_8000";

export type TelephonyCallConfig = {
  /** How long to ring the recipient before giving up, in seconds. Note that this will also be limited by the provider's own constraints. */
  ringing_timeout_secs?: number;
};

export type TelephonyDirection = "inbound" | "outbound";

export type TelephonyProvider = "twilio" | "sip_trunk" | "exotel";

/** Structured rationale for test condition results containing individual failure/success reasons. */
export type TestConditionRationaleCommonModel = {
  /** List of individual parameter evaluation messages or reasons */
  messages?: (string)[];
  /** High-level summary of the evaluation result */
  summary?: string;
};

export type TestConditionResultCommonModel = {
  result: EvaluationSuccessResult;
  rationale?: TestConditionRationaleCommonModel | null;
};

export type TestFromConversationMetadataInput = {
  conversation_id: string;
  agent_id: string;
  branch_id?: string | null;
  workflow_node_id?: string | null;
  original_agent_reply?: (ConversationHistoryTranscriptCommonModelInput)[];
};

export type TestFromConversationMetadataOutput = {
  conversation_id: string;
  agent_id: string;
  branch_id?: string | null;
  workflow_node_id?: string | null;
  original_agent_reply?: (ConversationHistoryTranscriptCommonModelOutput)[];
};

export type TestInvocationSummaryResponseModel = {
  /** The ID of the test invocation */
  id: string;
  /** The ID of the agent this test invocation belongs to */
  agent_id?: string | null;
  /** The ID of the branch this test invocation was run on */
  branch_id?: string | null;
  /** Creation time of the test invocation in unix seconds */
  created_at_unix_secs: number;
  /** Number of test runs in this invocation */
  test_run_count: number;
  /** Number of test runs that passed */
  passed_count: number;
  /** Number of test runs that failed */
  failed_count: number;
  /** Number of test runs that are pending */
  pending_count: number;
  /** Title of the test invocation - either the single test name or count of tests */
  title: string;
  /** The access information of the test invocation */
  access_info?: ResourceAccessInfo | null;
  /** Number of times each test was repeated in this invocation */
  repeat_count?: number;
};

export type TestRunMetadata = {
  workspace_id: string;
  test_name: string;
  ran_by_user_email: string;
  test_type?: "llm" | "tool_call" | "simulation";
};

export type TestRunResultBucket = {
  test_run_ids: (string)[];
  /** Short one-line title for this bucket */
  title: string;
  /** Short summary of why the test runs in this bucket passed or failed */
  reason: string;
  status: TestRunStatus;
};

export type TestRunResultSummary = {
  test_id: string;
  test_name: string;
  workflow_node_id?: string | null;
  buckets: (TestRunResultBucket)[];
};

export type TestRunStatus = "pending" | "passed" | "failed";

export type TestSharingMode = "all" | "shared_with_me";

export type TestToolResultModel = {
  result_type?: string;
  status?: string;
  reason?: string;
};

export type TestType = "llm" | "tool" | "simulation" | "folder";

export type TestsFeatureUsageCommonModel = {
  enabled?: boolean;
  tests_ran_after_last_modification?: boolean;
  tests_ran_in_last_7_days?: boolean;
};

/** Method for converting numbers to words before sending to TTS */
export type TextNormalisationType = "system_prompt" | "elevenlabs";

export type ThresholdGuardrail = {
  is_enabled?: boolean;
  threshold?: number;
};

export type TimeRange = {
  start_ms: number;
  end_ms: number;
};

export type ToDialogueSettingsResponseModel = {
  /** Determines how stable the voice is and the randomness between each generation. Lower values introduce broader emotional range for the voice. Higher values can result in a monotonous voice with limited emotion. */
  stability?: number | null;
  speed?: number | null;
};

export type TokenResponseModel = {
  token: string;
};

/** Definition for a tool the client can call. */
export type Tool = {
  name: string;
  title?: string | null;
  description?: string | null;
  inputSchema: { [key: string]: unknown };
  outputSchema?: { [key: string]: unknown } | null;
  icons?: (Icon)[] | null;
  annotations?: ToolAnnotations | null;
  _meta?: { [key: string]: unknown } | null;
  execution?: ToolExecution | null;
  [key: string]: unknown;
};

/** Additional properties describing a Tool to clients.  NOTE: all properties in ToolAnnotations are **hints**. They are not guaranteed to provide a faithful description of tool behavior (including descriptive properties like `title`).  Clients should never make tool use decisions based on ToolAnnotations received from untrusted servers. */
export type ToolAnnotations = {
  title?: string | null;
  readOnlyHint?: boolean | null;
  destructiveHint?: boolean | null;
  idempotentHint?: boolean | null;
  openWorldHint?: boolean | null;
  [key: string]: unknown;
};

/** Determines how the tool call sound should be played. */
export type ToolCallSoundBehavior = "auto" | "always";

/** Predefined tool call sound types. */
export type ToolCallSoundType = "typing" | "elevator1" | "elevator2" | "elevator3" | "elevator4";

export type ToolCallUnitTestModel = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataOutput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeOutput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelOutput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** How to evaluate the agent's tool call (if any). If empty, the tool call is not evaluated. */
  tool_call_parameters?: UnitTestToolCallEvaluationModelOutput | null;
  /** If set to True this test will pass if any tool call returned by the LLM matches the criteria. Otherwise it will fail if more than one tool is returned by the agent. */
  check_any_tool_matches?: boolean | null;
};

/** Controls how tool errors are processed before being shared with the agent. */
export type ToolErrorHandlingMode = "auto" | "summarized" | "passthrough" | "hide";

/** Execution-related properties for a tool. */
export type ToolExecution = {
  taskSupport?: "forbidden" | "optional" | "required" | null;
  [key: string]: unknown;
};

export type ToolExecutionMode = "immediate" | "post_tool_speech" | "async";

export type ToolExecutionResponseModel = {
  /** The ID of the tool that was executed */
  tool_id: string;
  /** The request/call ID associated with this tool execution */
  tool_request_id: string;
  /** The ID of the conversation where the tool was executed */
  conversation_id: string;
  /** The ID of the agent that ran the tool */
  agent_id: string;
  /** The branch ID if the agent has branches */
  branch_id?: string | null;
  /** Unix timestamp when the tool was executed */
  timestamp: number;
  /** How long the tool execution took */
  latency_secs: number;
  /** Whether the tool execution failed */
  is_error?: boolean;
  /** LLM-extracted parameters sent to the tool (JSON string) */
  request_payload?: string | null;
  /** Response returned by the tool */
  response_payload?: string | null;
  /** Error message if the tool execution failed */
  error_message?: string | null;
  /** Error category (internal, customer_config, customer_auth, external_server, external_client, client_timeout, unknown) */
  error_type?: string | null;
  id: string;
  tool_call_details?: ConversationHistoryTranscriptToolCallWebhookDetails | ConversationHistoryTranscriptToolCallClientDetails | ConversationHistoryTranscriptToolCallMcpDetails | ConversationHistoryTranscriptToolCallApiIntegrationWebhookDetailsOutput | null;
};

export type ToolMockConfig = {
  default_return_value?: string;
  default_is_error?: boolean;
};

export type ToolRequestModel = {
  /** Configuration for the tool */
  tool_config: WebhookToolConfigInput | ClientToolConfigInput | SystemToolConfigInput | McpToolConfigInput;
  /** Mock responses with optional parameter conditions. Evaluated top-to-bottom; first match wins. */
  response_mocks?: (ToolResponseMockConfigInput)[] | null;
};

export type ToolResponseMockConfigInput = {
  /** If the list is empty, the mock will always activate. */
  parameter_conditions?: (UnitTestToolCallParameter)[];
  /** The return value the LLM sees when this mock is active. */
  mock_result: string;
};

export type ToolResponseMockConfigOutput = {
  /** If the list is empty, the mock will always activate. */
  parameter_conditions?: (UnitTestToolCallParameter)[];
  /** The return value the LLM sees when this mock is active. */
  mock_result: string;
};

export type ToolResponseModel = {
  id: string;
  /** The type of tool */
  tool_config: WebhookToolConfigOutput | ClientToolConfigOutput | SystemToolConfigOutput | McpToolConfigOutput;
  access_info: ResourceAccessInfo;
  usage_stats: ToolUsageStatsResponseModel;
  /** Mock responses with optional parameter conditions. Evaluated top-to-bottom; first match wins. */
  response_mocks?: (ToolResponseMockConfigOutput)[] | null;
};

export type ToolSortBy = "name" | "created_at";

export type ToolType = "system" | "webhook" | "client" | "mcp" | "workflow" | "api_integration_webhook" | "api_integration_mcp" | "smb";

export type ToolTypeFilter = "webhook" | "client" | "api_integration_webhook";

export type ToolUsageStatsResponseModel = {
  /** The total number of calls to the tool */
  total_calls?: number;
  avg_latency_secs: number;
};

export type ToolsResponseModel = {
  tools: (ToolResponseModel)[];
  next_cursor?: string | null;
  has_more: boolean;
};

export type TransferBranchInfoDefaultingToMain = {
  branch_reason: string;
  branch_id: string;
};

export type TransferBranchInfoTrafficSplit = {
  branch_reason: string;
  branch_id: string;
  traffic_percentage: number;
};

export type TransferToAgentToolConfig = {
  system_tool_type?: string;
  transfers: (AgentTransfer)[];
};

export type TransferToAgentToolResultErrorModel = {
  result_type?: string;
  status?: string;
  from_agent: string;
  error: string;
};

export type TransferToAgentToolResultSuccessModel = {
  result_type?: string;
  status?: string;
  from_agent: string;
  to_agent: string;
  to_node?: string | null;
  condition: string;
  delay_ms?: number;
  transfer_message?: string | null;
  enable_transferred_agent_first_message?: boolean;
  branch_info?: TransferBranchInfoTrafficSplit | TransferBranchInfoDefaultingToMain | null;
};

export type TransferToNumberResultErrorModel = {
  result_type?: string;
  status?: string;
  error: string;
  details?: string | null;
};

export type TransferToNumberResultExotelSuccessModel = {
  result_type?: string;
  status?: string;
  transfer_number: string;
  reason?: string | null;
  note?: string | null;
};

export type TransferToNumberResultSipSuccessModel = {
  result_type?: string;
  status?: string;
  transfer_number: string;
  reason?: string | null;
  note?: string | null;
};

export type TransferToNumberResultTwilioSuccessModel = {
  result_type?: string;
  status?: string;
  transfer_number: string;
  reason?: string | null;
  client_message?: string | null;
  agent_message: string;
  conference_name: string;
  post_dial_digits?: string | null;
  note?: string | null;
};

export type TransferToNumberToolConfigInput = {
  system_tool_type?: string;
  transfers: (PhoneNumberTransfer)[];
  /** Whether to play a message to the client while they wait for transfer. Defaults to true for backward compatibility. */
  enable_client_message?: boolean;
};

export type TransferToNumberToolConfigOutput = {
  system_tool_type?: string;
  transfers: (PhoneNumberTransfer)[];
  /** Whether to play a message to the client while they wait for transfer. Defaults to true for backward compatibility. */
  enable_client_message?: boolean;
};

export type TransferTypeEnum = "blind" | "conference" | "sip_refer";

export type TurnConfig = {
  /** Maximum wait time for the user's reply before re-engaging the user */
  turn_timeout?: number;
  /** How long the agent will wait for the user to start the conversation if the first message is empty. If not set, uses the regular turn_timeout. */
  initial_wait_time?: number | null;
  /** Maximum wait time since the user last spoke before terminating the call */
  silence_end_call_timeout?: number;
  /** The mode of turn detection */
  mode?: TurnMode;
  /** Controls how eager the agent is to respond. Low = less eager (waits longer), Standard = default eagerness, High = more eager (responds sooner) */
  turn_eagerness?: TurnEagerness;
  /** Controls if the agent should be more patient when user is spelling numbers and named entities. Auto = model based, Off = never wait extra */
  spelling_patience?: SpellingPatience;
  /** When enabled, starts generating LLM responses during silence before full turn confidence is reached, reducing perceived latency. May increase LLM costs. */
  speculative_turn?: boolean;
  /** When enabled, if VAD detects no speech, attempts to re-transcribe accumulated audio at turn timeout. Disables silence discount billing for affected turns. */
  retranscribe_on_turn_timeout?: boolean;
  /** Configuration for soft timeout functionality. Provides immediate feedback during longer LLM responses. */
  soft_timeout_config?: SoftTimeoutConfig;
};

export type TurnConfigOverride = {
  /** Configuration for soft timeout functionality. Provides immediate feedback during longer LLM responses. */
  soft_timeout_config?: SoftTimeoutConfigOverride | null;
};

export type TurnConfigOverrideConfig = {
  /** Configures overrides for nested fields. */
  soft_timeout_config?: SoftTimeoutConfigOverrideConfig;
};

export type TurnConfigWorkflowOverride = {
  /** Maximum wait time for the user's reply before re-engaging the user */
  turn_timeout?: number | null;
  /** How long the agent will wait for the user to start the conversation if the first message is empty. If not set, uses the regular turn_timeout. */
  initial_wait_time?: number | null;
  /** Maximum wait time since the user last spoke before terminating the call */
  silence_end_call_timeout?: number | null;
  /** The mode of turn detection */
  mode?: TurnMode | null;
  /** Controls how eager the agent is to respond. Low = less eager (waits longer), Standard = default eagerness, High = more eager (responds sooner) */
  turn_eagerness?: TurnEagerness | null;
  /** Controls if the agent should be more patient when user is spelling numbers and named entities. Auto = model based, Off = never wait extra */
  spelling_patience?: SpellingPatience | null;
  /** When enabled, starts generating LLM responses during silence before full turn confidence is reached, reducing perceived latency. May increase LLM costs. */
  speculative_turn?: boolean | null;
  /** When enabled, if VAD detects no speech, attempts to re-transcribe accumulated audio at turn timeout. Disables silence discount billing for affected turns. */
  retranscribe_on_turn_timeout?: boolean | null;
  /** Configuration for soft timeout functionality. Provides immediate feedback during longer LLM responses. */
  soft_timeout_config?: SoftTimeoutConfigWorkflowOverride | null;
};

/** Agent's eagerness to respond. Higher values make agent wait for higher turn probability. */
export type TurnEagerness = "patient" | "normal" | "eager";

export type TurnMode = "silence" | "turn";

/** Version of the turn detection model to use. */
export type TurnModel = "turn_v2" | "turn_v3";

/** Valid Twilio edge locations. */
export type TwilioEdgeLocation = "ashburn" | "dublin" | "frankfurt" | "sao-paulo" | "singapore" | "sydney" | "tokyo" | "umatilla" | "roaming";

export type TwilioOutboundCallResponse = {
  success: boolean;
  message: string;
  conversation_id: string | null;
  callSid: string | null;
};

/** Valid Twilio region IDs. */
export type TwilioRegionId = "us1" | "ie1" | "au1";

export type TxtExportOptions = {
  max_characters_per_line?: number | null;
  include_speakers?: boolean;
  include_timestamps?: boolean;
  format: string;
  segment_on_silence_longer_than_s?: number | null;
  max_segment_duration_s?: number | null;
  max_segment_chars?: number | null;
};

export type UrlAvatar = {
  /** The type of the avatar */
  type?: string;
  /** The custom URL of the avatar */
  custom_url?: string;
};

export type UnitTestRunResponseModel = {
  test_run_id: string;
  test_info?: ResponseUnitTestModel | ToolCallUnitTestModel | SimulationTestModel | null;
  test_invocation_id: string;
  agent_id: string;
  branch_id?: string | null;
  workflow_node_id?: string | null;
  status: TestRunStatus;
  agent_responses?: (ConversationHistoryTranscriptCommonModelOutput)[] | null;
  test_id: string;
  test_name?: string;
  condition_result?: TestConditionResultCommonModel | null;
  last_updated_at_unix?: number;
  metadata?: TestRunMetadata | null;
  root_folder_id?: string | null;
  root_folder_name?: string | null;
  environment?: string | null;
};

export type UnitTestSummaryResponseModel = {
  /** The ID of the test */
  id: string;
  /** Name of the test */
  name: string;
  /** The access information of the test */
  access_info?: ResourceAccessInfo | null;
  /** Creation time of the test in unix seconds */
  created_at_unix_secs: number;
  /** Last update time of the test in unix seconds */
  last_updated_at_unix_secs: number;
  /** Type of the test or entity */
  type: TestType;
  /** The type of entity (test or folder) */
  entity_type?: AgentTestEntityType;
  /** The ID of the parent folder */
  folder_parent_id?: string | null;
  /** The folder path segments from root to this entity */
  folder_path?: (AgentTestFolderPathSegmentResponseModel)[];
  /** Number of direct children (tests and subfolders) for folders only */
  children_count?: number | null;
  /** Channel the test simulates the conversation as. Null for folders or default behavior. */
  conversation_initiation_source?: ConversationInitiationSource | null;
};

export type UnitTestToolCallEvaluationModelInput = {
  /** Parameters to evaluate for the agent's tool call. If empty, the tool call parameters are not evaluated. */
  parameters?: (UnitTestToolCallParameter)[];
  /** The tool to evaluate a call against. */
  referenced_tool?: ReferencedToolCommonModel | null;
  /** Whether to verify that the tool was NOT called. */
  verify_absence?: boolean;
  /** Configuration for testing workflow node transitions. When set, the test will verify the agent transitions to the specified workflow node. */
  workflow_node_transition?: UnitTestWorkflowNodeTransitionEvaluationNodeId | null;
};

export type UnitTestToolCallEvaluationModelOutput = {
  /** Parameters to evaluate for the agent's tool call. If empty, the tool call parameters are not evaluated. */
  parameters?: (UnitTestToolCallParameter)[];
  /** The tool to evaluate a call against. */
  referenced_tool?: ReferencedToolCommonModel | null;
  /** Whether to verify that the tool was NOT called. */
  verify_absence?: boolean;
  /** Configuration for testing workflow node transitions. When set, the test will verify the agent transitions to the specified workflow node. */
  workflow_node_transition?: UnitTestWorkflowNodeTransitionEvaluationNodeId | null;
};

export type UnitTestToolCallParameter = {
  eval: LlmParameterEvaluationStrategy | RegexParameterEvaluationStrategy | ExactParameterEvaluationStrategy | MatchAnythingParameterEvaluationStrategy;
  path: string;
};

export type UnitTestWorkflowNodeTransitionEvaluationNodeId = {
  type?: string;
  /** The ID of the agent whose workflow contains the target node. */
  agent_id: string;
  /** The ID of the workflow node that the agent should transition to. */
  target_node_id: string;
};

export type UpdateAgentRuleParams = {
  smb_tool_type?: string;
};

export type UpdateAssetParams = {
  smb_tool_type?: string;
};

export type UpdateBasicAuthRequest = {
  auth_type?: string;
  provider?: string | null;
  username?: string | null;
  password?: string | null;
};

export type UpdateBookingPageSettingsParams = {
  smb_tool_type?: string;
};

export type UpdateBusinessInfoParams = {
  smb_tool_type?: string;
};

export type UpdateCalendarEventParams = {
  smb_tool_type?: string;
};

/** Update an existing client's information. */
export type UpdateClientParams = {
  smb_tool_type?: string;
};

export type UpdateCustomerFacingConfigParams = {
  smb_tool_type?: string;
};

export type UpdateEnvironmentVariableRequest = {
  /** Values to replace. Set to null to remove an environment (except 'production'). */
  values: { [key: string]: string | EnvironmentVariableSecretValueRequest | EnvironmentVariableAuthConnectionValueRequest | null | undefined };
};

/** Change the seat count of an existing group session registration. */
export type UpdateGroupSessionSeatsParams = {
  smb_tool_type?: string;
};

export type UpdateHolidayParams = {
  smb_tool_type?: string;
};

export type UpdateLocationParams = {
  smb_tool_type?: string;
};

export type UpdateOAuth2ClientCredsRequest = {
  auth_type?: string;
  provider?: string | null;
  client_id?: string | null;
  scopes?: (string)[] | null;
  extra_params?: { [key: string]: string | undefined } | null;
  basic_auth_in_header?: boolean | null;
  client_secret?: string | null;
  custom_headers?: { [key: string]: string | undefined } | null;
};

export type UpdateOAuth2JwtRequest = {
  auth_type?: string;
  provider?: string | null;
  algorithm?: "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" | null;
  key_id?: string | null;
  issuer?: string | null;
  audience?: string | null;
  subject?: string | null;
  expiration_seconds?: number | null;
  extra_params?: { [key: string]: string | undefined } | null;
  scopes?: (string)[] | null;
  token_response_field?: "access_token" | "id_token" | null;
  secret_key?: string | null;
};

export type UpdateOrderRequest = {
  /** The new name for the order. */
  name: string;
};

export type UpdateOrderResponse = {
  /** The updated order name. */
  name: string;
};

export type UpdatePhoneNumberRequest = {
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
};

export type UpdateProductParams = {
  smb_tool_type?: string;
};

export type UpdateResponseUnitTestRequest = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataInput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeInput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelInput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** A prompt that evaluates whether the agent's response is successful. Should return True or False. */
  success_condition?: string;
  /** Non-empty list of example responses that should be considered successful */
  success_examples?: (AgentSuccessfulResponseExample)[];
  /** Non-empty list of example responses that should be considered failures */
  failure_examples?: (AgentFailureResponseExample)[];
  name: string;
  /** The ID of the parent folder. If not provided, the test will be moved to the root level. */
  parent_folder_id?: string | null;
};

/** Update an existing service's information. */
export type UpdateServiceParams = {
  smb_tool_type?: string;
};

export type UpdateSimulationTestRequest = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataInput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeInput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelInput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** A prompt that evaluates whether the agent's response is successful. Should return True or False. */
  success_condition?: string;
  /** Description of the simulation scenario and user persona for simulation tests. */
  simulation_scenario?: string;
  /** Maximum number of conversation turns for simulation tests. */
  simulation_max_turns?: number;
  /** The environment to use when running this simulation test. If not provided, defaults to 'production'. */
  simulation_environment?: string | null;
  /** Configuration for which tools to mock and fallback behavior. */
  tool_mock_config?: SimulationToolMockBehaviorConfig;
  /** LLM model to use for evaluating simulation results. Defaults to Claude Sonnet 4.6. */
  evaluation_model?: Llm | null;
  /** LLM model for the simulated user. Defaults to Claude Sonnet 4.6. */
  simulated_user_model?: Llm | null;
  name: string;
  /** The ID of the parent folder. If not provided, the test will be moved to the root level. */
  parent_folder_id?: string | null;
};

export type UpdateSpeechEngineRequest = {
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
};

/** Update an existing staff member's information. */
export type UpdateStaffParams = {
  smb_tool_type?: string;
};

export type UpdateToolCallUnitTestRequest = {
  /** Metadata of a conversation this test was created from (if applicable). */
  from_conversation_metadata?: TestFromConversationMetadataInput | null;
  /** Dynamic variables to replace in the agent config during testing */
  dynamic_variables?: { [key: string]: DynamicVariableValueTypeInput | undefined };
  chat_history?: (ConversationHistoryTranscriptCommonModelInput)[];
  /** Simulate the test as if the conversation originated from this channel. */
  conversation_initiation_source?: ConversationInitiationSource | null;
  type?: string;
  /** How to evaluate the agent's tool call (if any). If empty, the tool call is not evaluated. */
  tool_call_parameters?: UnitTestToolCallEvaluationModelInput | null;
  /** If set to True this test will pass if any tool call returned by the LLM matches the criteria. Otherwise it will fail if more than one tool is returned by the agent. */
  check_any_tool_matches?: boolean | null;
  name: string;
  /** The ID of the parent folder. If not provided, the test will be moved to the root level. */
  parent_folder_id?: string | null;
};

export type UpdateWhatsAppAccountRequest = {
  assigned_agent_id?: string | null;
  enable_messaging?: boolean | null;
  enable_audio_message_response?: boolean | null;
};

export type UpdateWorkspaceMemberResponseModel = {
  /** The status of the workspace member update request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type UpsertOrderItemRequest = {
  /** The order item to add or update. */
  item: OrderItemRequestInput;
  /** The ID of an existing item to update. Omit to create a new item. */
  item_id?: ItemId | null;
};

export type UpsertOrderItemResponse = {
  /** The ID of the upserted order item. */
  item_id: ItemId;
  /** The quoted price for this item. */
  quote?: QuoteInfo | null;
};

/** OCSF URL object.  Spec: https://schema.ocsf.io/1.6.0/objects/url */
export type UrlModel = {
  /** Full URL string */
  url_string?: string | null;
  /** URL scheme (e.g., https) */
  scheme?: string | null;
  /** URL hostname */
  hostname?: string | null;
  /** URL port */
  port?: number | null;
  /** URL path */
  path?: string | null;
  /** URL query string */
  query_string?: string | null;
};

/** The time interval over which to aggregate the usage data. */
export type UsageAggregationInterval = "hour" | "day" | "week" | "month" | "cumulative";

export type UsageCharactersResponseModel = {
  /** The time axis with unix timestamps for each day. */
  time: (number)[];
  /** The usage of each breakdown type along the time axis. */
  usage: { [key: string]: (number)[] | undefined };
};

/** OCSF Activity IDs for User Access Management [3005] events.  Spec: https://schema.ocsf.io/1.6.0/classes/user_access_management */
export type UserAccessManagementActivityId = 0 | 1 | 2 | 99;

export type UserFeedback = {
  score: UserFeedbackScore;
  time_in_call_secs: number;
};

export type UserFeedbackScore = "like" | "dislike";

/** OCSF User object.  Spec: https://schema.ocsf.io/1.6.0/objects/user */
export type UserModel = {
  /** Username */
  name?: string | null;
  /** Unique user identifier */
  uid?: string | null;
  /** Account type identifier */
  type_id?: UserTypeId;
  /** Account type description */
  type?: string | null;
  /** User email address */
  email_addr?: string | null;
  /** Full name of the user */
  full_name?: string | null;
  /** User's domain */
  domain?: string | null;
};

export type UserResponseModel = {
  /** The unique identifier of the user. */
  user_id: string;
  /** Details of the user's subscription. */
  subscription: SubscriptionResponseModel;
  /** Whether the user is new. This field is deprecated and will be removed in the future. Use 'created_at' instead. */
  is_new_user: boolean;
  /** The API key of the user. */
  xi_api_key?: string | null;
  /** This field is deprecated and will be removed in a future major version. Instead use subscription.trust_on_invoice_creation. */
  can_use_delayed_payment_methods: boolean;
  /** Whether the user's onboarding is completed. */
  is_onboarding_completed: boolean;
  /** Whether the user's onboarding checklist is completed. */
  is_onboarding_checklist_completed: boolean;
  /** Whether to show compliance terms (ToS, Privacy Policy, biometric consent) during onboarding. Set for users signing up from the marketing site. */
  show_compliance_terms?: boolean;
  /** First name of the user. */
  first_name?: string | null;
  /** Whether the user's API key is hashed. */
  is_api_key_hashed?: boolean;
  /** The preview of the user's API key. */
  xi_api_key_preview?: string | null;
  /** The referral link code of the user. */
  referral_link_code?: string | null;
  /** The Partnerstack partner default link of the user. */
  partnerstack_partner_default_link?: string | null;
  /** The unix timestamp of the user's creation. 0 if the user was created before the unix timestamp was added. */
  created_at: number;
  /** The seat type of the user. */
  seat_type: SeatType;
};

/** OCSF User type IDs.  Spec: https://schema.ocsf.io/1.6.0/objects/user */
export type UserTypeId = 0 | 1 | 2 | 3 | 4 | 99;

export type UsersSortBy = "last_contact_unix_secs" | "conversation_count";

export type UtteranceResponseModel = {
  /** The start time of the utterance in seconds. */
  start: number;
  /** The end time of the utterance in seconds. */
  end: number;
};

export type VadConfig = {
  /** Whether to use background voice filtering */
  background_voice_detection?: boolean;
};

export type VadConfigWorkflowOverride = {
  /** Whether to use background voice filtering */
  background_voice_detection?: boolean | null;
};

export type VoiceCategory = "premade" | "cloned" | "generated" | "professional" | "famous";

export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};

export type Verbosity = "auto" | "concise" | "thorough";

export type VerificationAttemptResponseModel = {
  /** The text of the verification attempt. */
  text: string;
  /** The date of the verification attempt in Unix time. */
  date_unix: number;
  /** Whether the verification attempt was accepted. */
  accepted: boolean;
  /** The similarity of the verification attempt. */
  similarity: number;
  /** The Levenshtein distance of the verification attempt. */
  levenshtein_distance: number;
  /** The recording of the verification attempt. */
  recording?: RecordingResponseModel | null;
};

export type VerifiedVoiceLanguageResponseModel = {
  /** The language of the voice. */
  language: string;
  /** The voice's model ID. */
  model_id: string;
  /** The voice's accent, if applicable. */
  accent?: string | null;
  /** The voice's locale, if applicable. */
  locale?: string | null;
  /** The voice's preview URL, if applicable. */
  preview_url?: string | null;
};

export type VerifyPvcVoiceCaptchaResponseModel = {
  /** The status of the verify PVC captcha request. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned. */
  status: string;
};

export type VideoAnalysis = {
  status: "processing" | "completed" | "failed";
  data: VideoAnalysisResult | null;
  updated_at_ms?: number;
};

export type VideoAnalysisResult = {
  title: string;
  description: string;
  content_type?: string | null;
  overall_pacing?: string | null;
  subjects?: (VideoSubject)[];
  segments?: (VideoSegment)[];
  key_moments?: (VideoKeyMoment)[];
};

export type VideoKeyMoment = {
  timestamp_ms: number;
  type: string;
  description: string;
};

export type VideoSegment = {
  start_ms: number;
  end_ms: number;
  description: string;
  subjects?: (string)[];
  shot_type?: string | null;
  camera_movement?: string | null;
  transition_in?: string | null;
  has_speech?: boolean;
  has_music?: boolean;
  pacing?: string | null;
};

export type VideoSubject = {
  name: string;
  description: string;
};

/** An agent (and optional branch) that participated in the call, in first-seen transcript order. */
export type VisitedAgentRef = {
  agent_id: string;
  branch_id?: string | null;
};

export type VoiceDesignRequestModel = {
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
};

export type VoiceMailDetectionResultSuccessModel = {
  result_type?: string;
  status?: string;
  voicemail_message?: string | null;
  reason?: string | null;
};

export type VoicePreviewResponseModel = {
  /** The base64 encoded audio of the preview. */
  audio_base_64: string;
  /** The ID of the generated voice. Use it to create a voice from the preview. */
  generated_voice_id: string;
  /** The media type of the preview. */
  media_type: string;
  /** The duration of the preview in seconds. */
  duration_secs: number;
  /** The language of the preview. */
  language: string | null;
};

export type VoicePreviewsRequestModel = {
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
};

export type VoicePreviewsResponseModel = {
  /** The previews of the generated voices. */
  previews: (VoicePreviewResponseModel)[];
  /** The text used to preview the voices. */
  text: string;
};

export type VoiceRemixRequestModel = {
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
};

export type VoiceResponseModel = {
  /** The ID of the voice. */
  voice_id: string;
  /** The name of the voice. */
  name: string;
  /** List of samples associated with the voice. */
  samples?: (SampleResponseModel)[] | null;
  /** The category of the voice. */
  category: "generated" | "cloned" | "premade" | "professional" | "famous" | "high_quality";
  /** Fine-tuning information for the voice. */
  fine_tuning?: FineTuningResponseModel | null;
  /** Labels associated with the voice. */
  labels: { [key: string]: string | undefined };
  /** The description of the voice. */
  description?: string | null;
  /** The preview URL of the voice. */
  preview_url?: string | null;
  /** The tiers the voice is available for. */
  available_for_tiers: (string)[];
  /** The settings of the voice. */
  settings?: VoiceSettingsResponseModel | null;
  /** The sharing information of the voice. */
  sharing?: VoiceSharingResponseModel | null;
  /** The base model IDs for high-quality voices. */
  high_quality_base_model_ids: (string)[];
  /** The verified languages of the voice. */
  verified_languages?: (VerifiedVoiceLanguageResponseModel)[] | null;
  /** The IDs of collections this voice belongs to. */
  collection_ids?: (string)[] | null;
  /** The safety controls of the voice. */
  safety_control?: "NONE" | "BAN" | "CAPTCHA" | "ENTERPRISE_BAN" | "ENTERPRISE_CAPTCHA" | null;
  /** The voice verification of the voice. */
  voice_verification?: VoiceVerificationResponseModel | null;
  /** The permission on the resource of the voice. */
  permission_on_resource?: string | null;
  /** Whether the voice is owned by the user. */
  is_owner?: boolean | null;
  /** Whether the voice is legacy. */
  is_legacy?: boolean;
  /** Whether the voice is mixed. */
  is_mixed?: boolean;
  /** Timestamp when the voice was marked as favorite in Unix time. */
  favorited_at_unix?: number | null;
  /** The creation time of the voice in Unix time. */
  created_at_unix?: number | null;
  /** Whether the voice is bookmarked by the current user. Only relevant for community (library-copied) voices. */
  is_bookmarked?: boolean | null;
  /** The recording quality of the voice as determined by the review pipeline. */
  recording_quality?: "studio" | "good" | "ok" | "poor" | "bad" | null;
  /** The review pipeline status of the voice. */
  labelling_status?: "in_review" | "review_complete" | null;
  /** The reason for the recording quality assessment, as determined by the review pipeline. */
  recording_quality_reason?: string | null;
};

export type VoiceSamplePreviewResponseModel = {
  /** The base64 encoded audio. */
  audio_base_64: string;
  /** The ID of the voice. */
  voice_id: string;
  /** The ID of the sample. */
  sample_id: string;
  /** The media type of the audio. */
  media_type: string;
  /** The duration of the audio in seconds. */
  duration_secs?: number | null;
};

export type VoiceSampleVisualWaveformResponseModel = {
  /** The ID of the sample. */
  sample_id: string;
  /** The visual waveform of the sample, represented as a list of floats. */
  visual_waveform: (number)[];
};

export type VoiceSegment = {
  /** The voice ID used for this segment */
  voice_id: string;
  /** Start time of this voice segment */
  start_time_seconds: number;
  /** End time of this voice segment */
  end_time_seconds: number;
  /** Start index in the characters array */
  character_start_index: number;
  /** End index in the characters array (exclusive) */
  character_end_index: number;
  /** Line of the dialogue (script) that this segment is a part of. */
  dialogue_input_index: number;
};

export type VoiceSettingsResponseModel = {
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
};

export type VoiceSharingModerationCheckResponseModel = {
  /** The date the moderation check was made in Unix time. */
  date_checked_unix?: number | null;
  /** The name value of the voice. */
  name_value?: string | null;
  /** Whether the name check was successful. */
  name_check?: boolean | null;
  /** The description value of the voice. */
  description_value?: string | null;
  /** Whether the description check was successful. */
  description_check?: boolean | null;
  /** A list of sample IDs. */
  sample_ids?: (string)[] | null;
  /** A list of sample checks. */
  sample_checks?: (number)[] | null;
  /** A list of captcha IDs. */
  captcha_ids?: (string)[] | null;
  /** A list of CAPTCHA check values. */
  captcha_checks?: (number)[] | null;
};

export type VoiceSharingResponseModel = {
  /** The status of the voice sharing. */
  status: "enabled" | "disabled" | "copied" | "copied_disabled";
  /** The sample ID of the history item. */
  history_item_sample_id?: string | null;
  /** The date of the voice sharing in Unix time. */
  date_unix: number;
  /** A list of whitelisted emails. */
  whitelisted_emails: (string)[];
  /** The ID of the public owner. */
  public_owner_id: string;
  /** The ID of the original voice. */
  original_voice_id: string;
  /** Whether financial rewards are enabled. */
  financial_rewards_enabled: boolean;
  /** Whether free users are allowed. */
  free_users_allowed: boolean;
  /** Whether live moderation is enabled. */
  live_moderation_enabled: boolean;
  /** The rate of the voice sharing. */
  rate?: number | null;
  /** The rate of the voice sharing in USD per 1000 credits. */
  fiat_rate?: number | null;
  /** The notice period of the voice sharing. */
  notice_period: number;
  /** The date of the voice sharing in Unix time. */
  disable_at_unix?: number | null;
  /** Whether voice mixing is allowed. */
  voice_mixing_allowed: boolean;
  /** Whether the voice is featured. */
  featured: boolean;
  /** The category of the voice. */
  category: "generated" | "cloned" | "premade" | "professional" | "famous" | "high_quality";
  /** Whether the reader app is enabled. */
  reader_app_enabled?: boolean | null;
  /** The image URL of the voice. */
  image_url?: string | null;
  /** The ban reason of the voice. */
  ban_reason?: string | null;
  /** The number of likes on the voice. */
  liked_by_count: number;
  /** The number of clones on the voice. */
  cloned_by_count: number;
  /** The name of the voice. */
  name: string;
  /** The description of the voice. */
  description?: string | null;
  /** The labels of the voice. */
  labels: { [key: string]: string | undefined };
  /** The review status of the voice. */
  review_status: "not_requested" | "pending" | "declined" | "allowed" | "allowed_with_changes";
  /** The review message of the voice. */
  review_message?: string | null;
  /** Whether the voice is enabled in the library. */
  enabled_in_library: boolean;
  /** The Instagram username of the voice. */
  instagram_username?: string | null;
  /** The Twitter/X username of the voice. */
  twitter_username?: string | null;
  /** The YouTube username of the voice. */
  youtube_username?: string | null;
  /** The TikTok username of the voice. */
  tiktok_username?: string | null;
  /** The moderation check of the voice. */
  moderation_check?: VoiceSharingModerationCheckResponseModel | null;
  /** The reader restricted on of the voice. */
  reader_restricted_on?: (ReaderResourceResponseModel)[] | null;
};

export type VoiceStatisticsResponseModel = {
  /** The voice ID. */
  voice_id: string;
  /** The number of unconverted characters for this voice. */
  characters_unconverted: number;
  /** The number of converted characters for this voice. */
  characters_converted: number;
  /** The number of credits needed to convert the remaining audio for this voice. */
  credits_needed_to_convert?: number | null;
};

export type VoiceVerificationResponseModel = {
  /** Whether the voice requires verification. */
  requires_verification: boolean;
  /** Whether the voice has been verified. */
  is_verified: boolean;
  /** List of verification failures. */
  verification_failures: (string)[];
  /** The number of verification attempts. */
  verification_attempts_count: number;
  /** The language of the voice. */
  language?: string | null;
  /** Number of times a verification was attempted. */
  verification_attempts?: (VerificationAttemptResponseModel)[] | null;
};

/** Allows the agent to detect when a voicemail system is encountered.  This tool should be invoked by the LLM when it detects that the call has been answered by a voicemail system rather than a human. If a voicemail message is configured, it will be played; otherwise the call will end immediately. */
export type VoicemailDetectionToolConfig = {
  system_tool_type?: string;
  /** Optional message to leave on voicemail when detected. If not provided, the call will end immediately when voicemail is detected. Supports dynamic variables (e.g., {{system__time}}, {{system__call_duration_secs}}, {{custom_variable}}). */
  voicemail_message?: string | null;
};

export type WebhookAuthMethodType = "hmac" | "oauth2" | "mtls";

export type WebhookEventType = "transcript" | "audio" | "call_initiation_failure";

/** Settings for creating an HMAC-authenticated webhook */
export type WebhookHmacSettings = {
  /** The authentication type for this webhook */
  auth_type: string;
  /** The display name for this webhook */
  name: string;
  /** The HTTPS callback URL that will be called when this webhook is triggered */
  webhook_url: string;
  /** Optional custom request headers to include with each webhook delivery */
  request_headers?: { [key: string]: string | undefined } | null;
};

export type WebhookToolApiSchemaConfigInput = {
  /** Headers that should be included in the request */
  request_headers?: { [key: string]: string | ConvAiSecretLocator | ConvAiDynamicVariable | ConvAiEnvVarLocator | undefined };
  /** The URL that the webhook will be sent to. May include path parameters, e.g. https://example.com/agents/{agent_id} */
  url: string;
  /** The HTTP method to use for the webhook */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** Schema for path parameters, if any. The keys should match the placeholders in the URL. */
  path_params_schema?: { [key: string]: LiteralJsonSchemaProperty | undefined };
  /** Schema for any query params, if any. These will be added to end of the URL as query params. Note: properties in a query param must all be literal types */
  query_params_schema?: QueryParamsJsonSchema | null;
  /** Schema for the body parameters, if any. Used for POST/PATCH/PUT requests. The schema should be an object which will be sent as the json body */
  request_body_schema?: ObjectJsonSchemaPropertyInput | null;
  /** Schema describing the expected response body structure. For documentation only; not surfaced to the LLM. */
  response_body_schema?: ObjectJsonSchemaPropertyInput | null;
  /** Content type for the request body. Only applies to POST/PUT/PATCH requests. */
  content_type?: "application/json" | "application/x-www-form-urlencoded";
  /** URL placeholders resolved from the auth connection (e.g. secrets injected via UrlSecretAuthConnection) rather than from path_params_schema. */
  auth_resolved_params?: (string)[];
  /** Optional auth connection to use for authentication with this webhook */
  auth_connection?: AuthConnectionLocator | EnvironmentAuthConnectionLocator | null;
};

export type WebhookToolApiSchemaConfigOutput = {
  /** Headers that should be included in the request */
  request_headers?: { [key: string]: string | ConvAiSecretLocator | ConvAiDynamicVariable | ConvAiEnvVarLocator | undefined };
  /** The URL that the webhook will be sent to. May include path parameters, e.g. https://example.com/agents/{agent_id} */
  url: string;
  /** The HTTP method to use for the webhook */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** Schema for path parameters, if any. The keys should match the placeholders in the URL. */
  path_params_schema?: { [key: string]: LiteralJsonSchemaProperty | undefined };
  /** Schema for any query params, if any. These will be added to end of the URL as query params. Note: properties in a query param must all be literal types */
  query_params_schema?: QueryParamsJsonSchema | null;
  /** Schema for the body parameters, if any. Used for POST/PATCH/PUT requests. The schema should be an object which will be sent as the json body */
  request_body_schema?: ObjectJsonSchemaPropertyOutput | null;
  /** Schema describing the expected response body structure. For documentation only; not surfaced to the LLM. */
  response_body_schema?: ObjectJsonSchemaPropertyOutput | null;
  /** Content type for the request body. Only applies to POST/PUT/PATCH requests. */
  content_type?: "application/json" | "application/x-www-form-urlencoded";
  /** URL placeholders resolved from the auth connection (e.g. secrets injected via UrlSecretAuthConnection) rather than from path_params_schema. */
  auth_resolved_params?: (string)[];
  /** Optional auth connection to use for authentication with this webhook */
  auth_connection?: AuthConnectionLocator | EnvironmentAuthConnectionLocator | null;
};

/** A webhook tool is a tool that calls an external webhook from our server */
export type WebhookToolConfigInput = {
  /** The type of tool */
  type?: string;
  name: string;
  /** Description of when the tool should be used and what it does. */
  description: string;
  /** The maximum time in seconds to wait for the tool call to complete. Must be between 5 and 120 seconds (inclusive). */
  response_timeout_secs?: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions?: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech?: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments?: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode?: ToolErrorHandlingMode;
  /** Configuration for dynamic variables */
  dynamic_variables?: DynamicVariablesConfigInput;
  /** Determines when and how the tool executes: 'immediate' executes the tool right away when requested by the LLM, 'post_tool_speech' waits for the agent to finish speaking before executing, 'async' runs the tool in the background without blocking - best for long-running operations. */
  execution_mode?: ToolExecutionMode;
  /** The schema for the outgoing webhoook, including parameters and URL specification */
  api_schema: WebhookToolApiSchemaConfigInput;
};

/** A webhook tool is a tool that calls an external webhook from our server */
export type WebhookToolConfigOutput = {
  /** The type of tool */
  type?: string;
  name: string;
  /** Description of when the tool should be used and what it does. */
  description: string;
  /** The maximum time in seconds to wait for the tool call to complete. Must be between 5 and 120 seconds (inclusive). */
  response_timeout_secs?: number;
  /** If true, the user will not be able to interrupt the agent while this tool is running. */
  disable_interruptions?: boolean;
  /** DEPRECATED: use `pre_tool_speech` instead. If true, the agent will speak before the tool call. */
  force_pre_tool_speech?: boolean;
  /** Controls whether the agent speaks before this tool is called. 'auto' (default) decides based on recent tool latency, 'force' always asks the agent to speak, 'off' fully opts out regardless of latency. */
  pre_tool_speech?: PreToolSpeechMode;
  /** Configuration for extracting values from tool responses and assigning them to dynamic variables */
  assignments?: (DynamicVariableAssignment)[];
  /** Predefined tool call sound type to play during tool execution. If not specified, no tool call sound will be played. */
  tool_call_sound?: ToolCallSoundType | null;
  /** Determines when the tool call sound should play. 'auto' only plays when there's pre-tool speech, 'always' plays for every tool call. */
  tool_call_sound_behavior?: ToolCallSoundBehavior;
  /** Controls how tool errors are processed before being shared with the agent. 'auto' determines handling based on tool type (summarized for native integrations, hide for others), 'summarized' sends an LLM-generated summary, 'passthrough' sends the raw error, 'hide' does not share the error with the agent. */
  tool_error_handling_mode?: ToolErrorHandlingMode;
  /** Configuration for dynamic variables */
  dynamic_variables?: DynamicVariablesConfigOutput;
  /** Determines when and how the tool executes: 'immediate' executes the tool right away when requested by the LLM, 'post_tool_speech' waits for the agent to finish speaking before executing, 'async' runs the tool in the background without blocking - best for long-running operations. */
  execution_mode?: ToolExecutionMode;
  /** The schema for the outgoing webhoook, including parameters and URL specification */
  api_schema: WebhookToolApiSchemaConfigOutput;
};

export type WebhookTranscriptFormat = "json" | "opentelemetry";

export type WebhookUsageType = "ConvAI Agent Settings" | "ConvAI Settings" | "Voice Library Removal Notices" | "Speech to Text";

export type WhatsAppAuthResponse = {
  name: string;
  auth_type?: string;
  provider?: string;
  phone_number_id: string;
  id: string;
  used_by?: AuthConnectionDependencies | null;
};

export type WhatsAppConversationInfo = {
  direction?: "inbound" | "outbound" | "unknown";
  whatsapp_phone_number_id?: string | null;
  whatsapp_user_id: string;
  awaiting_first_user_message?: boolean | null;
};

export type WhatsAppOutboundCallResponse = {
  success: boolean;
  message: string;
  conversation_id: string | null;
};

export type WhatsAppOutboundMessageResponse = {
  conversation_id: string;
};

export type WhatsAppTemplateBodyComponentParams = {
  type?: string;
  parameters: (WhatsAppTemplateTextParam)[];
};

export type WhatsAppTemplateButtonComponentParams = {
  type?: string;
  parameters: (WhatsAppTemplateTextParam)[];
  index: number;
  sub_type: string;
};

export type WhatsAppTemplateDocumentParam = {
  type?: string;
  document: WhatsAppTemplateDocumentParamDetails;
};

export type WhatsAppTemplateDocumentParamDetails = {
  link: string;
  filename?: string | null;
};

export type WhatsAppTemplateHeaderComponentParams = {
  type?: string;
  parameters: (WhatsAppTemplateTextParam | WhatsAppTemplateImageParam | WhatsAppTemplateDocumentParam | WhatsAppTemplateLocationParam)[];
};

export type WhatsAppTemplateImageParam = {
  type?: string;
  image: WhatsAppTemplateImageParamDetails;
};

export type WhatsAppTemplateImageParamDetails = {
  link: string;
};

export type WhatsAppTemplateLocationParam = {
  type?: string;
  location: WhatsAppTemplateLocationParamDetails;
};

export type WhatsAppTemplateLocationParamDetails = {
  latitude: string;
  longitude: string;
  name: string;
  address: string;
};

export type WhatsAppTemplateTextParam = {
  parameter_name?: string | null;
  type?: string;
  text: string;
};

export type WidgetConfigInput = {
  /** The variant of the widget */
  variant?: EmbedVariant;
  /** The placement of the widget on the screen */
  placement?: WidgetPlacement;
  /** Whether the widget is expandable */
  expandable?: WidgetExpandable;
  /** The avatar of the widget */
  avatar?: OrbAvatar | UrlAvatar | ImageAvatar;
  /** The feedback mode of the widget */
  feedback_mode?: WidgetFeedbackMode;
  /** Configuration for feedback collected at the end of the conversation */
  end_feedback?: WidgetEndFeedbackConfig | null;
  /** The background color of the widget */
  bg_color?: string;
  /** The text color of the widget */
  text_color?: string;
  /** The button color of the widget */
  btn_color?: string;
  /** The button text color of the widget */
  btn_text_color?: string;
  /** The border color of the widget */
  border_color?: string;
  /** The focus color of the widget */
  focus_color?: string;
  /** The border radius of the widget */
  border_radius?: number | null;
  /** The button radius of the widget */
  btn_radius?: number | null;
  /** The action text of the widget */
  action_text?: string | null;
  /** The start call text of the widget */
  start_call_text?: string | null;
  /** The end call text of the widget */
  end_call_text?: string | null;
  /** The expand text of the widget */
  expand_text?: string | null;
  /** The text to display when the agent is listening */
  listening_text?: string | null;
  /** The text to display when the agent is speaking */
  speaking_text?: string | null;
  /** The text to display when sharing */
  shareable_page_text?: string | null;
  /** Whether to show terms and conditions on the shareable page */
  shareable_page_show_terms?: boolean;
  /** The text to display for terms and conditions */
  terms_text?: string | null;
  /** The HTML to display for terms and conditions */
  terms_html?: string | null;
  /** The key to display for terms and conditions */
  terms_key?: string | null;
  /** Whether to show the avatar when the widget is collapsed */
  show_avatar_when_collapsed?: boolean | null;
  /** Whether to disable the banner */
  disable_banner?: boolean;
  /** The override link for the widget */
  override_link?: string | null;
  /** List of allowed hostnames for clickable markdown links. Use { hostname: '*' } to allow any domain. Empty means no links are allowed. */
  markdown_link_allowed_hosts?: (AllowlistItem)[];
  /** Whether to automatically include www. variants of allowed hosts */
  markdown_link_include_www?: boolean;
  /** Whether to allow http:// in addition to https:// for allowed hosts */
  markdown_link_allow_http?: boolean;
  /** Whether to enable mic muting */
  mic_muting_enabled?: boolean;
  /** Whether the widget should show the conversation transcript as it goes on */
  transcript_enabled?: boolean;
  /** Whether the user should be able to send text messages */
  text_input_enabled?: boolean;
  /** Whether to enable the conversation mode toggle in the widget */
  conversation_mode_toggle_enabled?: boolean;
  /** Whether the widget should be expanded by default */
  default_expanded?: boolean;
  /** Whether the widget should always be expanded */
  always_expanded?: boolean;
  /** Whether the widget can be dismissed by the user */
  dismissible?: boolean;
  /** Whether to show agent working/done/error status during tool use */
  show_agent_status?: boolean;
  /** Whether to show the conversation ID after disconnection. */
  show_conversation_id?: boolean;
  /** Whether to strip audio markup from messages. */
  strip_audio_tags?: boolean;
  /** Theme for code block syntax highlighting. Defaults to auto-detection by the widget when not set. */
  syntax_highlight_theme?: "light" | "dark" | null;
  /** Text contents of the widget */
  text_contents?: WidgetTextContents;
  /** Styles for the widget */
  styles?: WidgetStyles;
  /** Whether to show the language selector */
  language_selector?: boolean;
  /** Whether the widget can switch to text only mode */
  supports_text_only?: boolean;
  /** The custom avatar path */
  custom_avatar_path?: string | null;
  /** Language presets for the widget */
  language_presets?: { [key: string]: WidgetLanguagePreset | undefined };
};

export type WidgetConfigOutput = {
  /** The variant of the widget */
  variant?: EmbedVariant;
  /** The placement of the widget on the screen */
  placement?: WidgetPlacement;
  /** Whether the widget is expandable */
  expandable?: WidgetExpandable;
  /** The avatar of the widget */
  avatar?: OrbAvatar | UrlAvatar | ImageAvatar;
  /** The feedback mode of the widget */
  feedback_mode?: WidgetFeedbackMode;
  /** Configuration for feedback collected at the end of the conversation */
  end_feedback?: WidgetEndFeedbackConfig | null;
  /** The background color of the widget */
  bg_color?: string;
  /** The text color of the widget */
  text_color?: string;
  /** The button color of the widget */
  btn_color?: string;
  /** The button text color of the widget */
  btn_text_color?: string;
  /** The border color of the widget */
  border_color?: string;
  /** The focus color of the widget */
  focus_color?: string;
  /** The border radius of the widget */
  border_radius?: number | null;
  /** The button radius of the widget */
  btn_radius?: number | null;
  /** The action text of the widget */
  action_text?: string | null;
  /** The start call text of the widget */
  start_call_text?: string | null;
  /** The end call text of the widget */
  end_call_text?: string | null;
  /** The expand text of the widget */
  expand_text?: string | null;
  /** The text to display when the agent is listening */
  listening_text?: string | null;
  /** The text to display when the agent is speaking */
  speaking_text?: string | null;
  /** The text to display when sharing */
  shareable_page_text?: string | null;
  /** Whether to show terms and conditions on the shareable page */
  shareable_page_show_terms?: boolean;
  /** The text to display for terms and conditions */
  terms_text?: string | null;
  /** The HTML to display for terms and conditions */
  terms_html?: string | null;
  /** The key to display for terms and conditions */
  terms_key?: string | null;
  /** Whether to show the avatar when the widget is collapsed */
  show_avatar_when_collapsed?: boolean | null;
  /** Whether to disable the banner */
  disable_banner?: boolean;
  /** The override link for the widget */
  override_link?: string | null;
  /** List of allowed hostnames for clickable markdown links. Use { hostname: '*' } to allow any domain. Empty means no links are allowed. */
  markdown_link_allowed_hosts?: (AllowlistItem)[];
  /** Whether to automatically include www. variants of allowed hosts */
  markdown_link_include_www?: boolean;
  /** Whether to allow http:// in addition to https:// for allowed hosts */
  markdown_link_allow_http?: boolean;
  /** Whether to enable mic muting */
  mic_muting_enabled?: boolean;
  /** Whether the widget should show the conversation transcript as it goes on */
  transcript_enabled?: boolean;
  /** Whether the user should be able to send text messages */
  text_input_enabled?: boolean;
  /** Whether to enable the conversation mode toggle in the widget */
  conversation_mode_toggle_enabled?: boolean;
  /** Whether the widget should be expanded by default */
  default_expanded?: boolean;
  /** Whether the widget should always be expanded */
  always_expanded?: boolean;
  /** Whether the widget can be dismissed by the user */
  dismissible?: boolean;
  /** Whether to show agent working/done/error status during tool use */
  show_agent_status?: boolean;
  /** Whether to show the conversation ID after disconnection. */
  show_conversation_id?: boolean;
  /** Whether to strip audio markup from messages. */
  strip_audio_tags?: boolean;
  /** Theme for code block syntax highlighting. Defaults to auto-detection by the widget when not set. */
  syntax_highlight_theme?: "light" | "dark" | null;
  /** Text contents of the widget */
  text_contents?: WidgetTextContents;
  /** Styles for the widget */
  styles?: WidgetStyles;
  /** Whether to show the language selector */
  language_selector?: boolean;
  /** Whether the widget can switch to text only mode */
  supports_text_only?: boolean;
  /** The custom avatar path */
  custom_avatar_path?: string | null;
  /** Language presets for the widget */
  language_presets?: { [key: string]: WidgetLanguagePreset | undefined };
};

export type WidgetConfigResponseModel = {
  /** The variant of the widget */
  variant?: EmbedVariant;
  /** The placement of the widget on the screen */
  placement?: WidgetPlacement;
  /** Whether the widget is expandable */
  expandable?: WidgetExpandable;
  /** The avatar of the widget */
  avatar?: OrbAvatar | UrlAvatar | ImageAvatar;
  /** The feedback mode of the widget */
  feedback_mode?: WidgetFeedbackMode;
  /** Configuration for feedback collected at the end of the conversation */
  end_feedback?: WidgetEndFeedbackConfig | null;
  /** The background color of the widget */
  bg_color?: string;
  /** The text color of the widget */
  text_color?: string;
  /** The button color of the widget */
  btn_color?: string;
  /** The button text color of the widget */
  btn_text_color?: string;
  /** The border color of the widget */
  border_color?: string;
  /** The focus color of the widget */
  focus_color?: string;
  /** The border radius of the widget */
  border_radius?: number | null;
  /** The button radius of the widget */
  btn_radius?: number | null;
  /** The action text of the widget */
  action_text?: string | null;
  /** The start call text of the widget */
  start_call_text?: string | null;
  /** The end call text of the widget */
  end_call_text?: string | null;
  /** The expand text of the widget */
  expand_text?: string | null;
  /** The text to display when the agent is listening */
  listening_text?: string | null;
  /** The text to display when the agent is speaking */
  speaking_text?: string | null;
  /** The text to display when sharing */
  shareable_page_text?: string | null;
  /** Whether to show terms and conditions on the shareable page */
  shareable_page_show_terms?: boolean;
  /** The text to display for terms and conditions */
  terms_text?: string | null;
  /** The HTML to display for terms and conditions */
  terms_html?: string | null;
  /** The key to display for terms and conditions */
  terms_key?: string | null;
  /** Whether to show the avatar when the widget is collapsed */
  show_avatar_when_collapsed?: boolean | null;
  /** Whether to disable the banner */
  disable_banner?: boolean;
  /** The override link for the widget */
  override_link?: string | null;
  /** List of allowed hostnames for clickable markdown links. Use { hostname: '*' } to allow any domain. Empty means no links are allowed. */
  markdown_link_allowed_hosts?: (AllowlistItem)[];
  /** Whether to automatically include www. variants of allowed hosts */
  markdown_link_include_www?: boolean;
  /** Whether to allow http:// in addition to https:// for allowed hosts */
  markdown_link_allow_http?: boolean;
  /** Whether to enable mic muting */
  mic_muting_enabled?: boolean;
  /** Whether the widget should show the conversation transcript as it goes on */
  transcript_enabled?: boolean;
  /** Whether the user should be able to send text messages */
  text_input_enabled?: boolean;
  /** Whether to enable the conversation mode toggle in the widget */
  conversation_mode_toggle_enabled?: boolean;
  /** Whether the widget should be expanded by default */
  default_expanded?: boolean;
  /** Whether the widget should always be expanded */
  always_expanded?: boolean;
  /** Whether the widget can be dismissed by the user */
  dismissible?: boolean;
  /** Whether to show agent working/done/error status during tool use */
  show_agent_status?: boolean;
  /** Whether to show the conversation ID after disconnection. */
  show_conversation_id?: boolean;
  /** Whether to strip audio markup from messages. */
  strip_audio_tags?: boolean;
  /** Theme for code block syntax highlighting. Defaults to auto-detection by the widget when not set. */
  syntax_highlight_theme?: "light" | "dark" | null;
  /** Text contents of the widget */
  text_contents?: WidgetTextContents;
  /** Styles for the widget */
  styles?: WidgetStyles;
  language: string;
  supported_language_overrides?: (string)[] | null;
  /** Language presets for the widget */
  language_presets?: { [key: string]: WidgetLanguagePresetResponse | undefined };
  /** Whether the agent uses text-only mode */
  text_only?: boolean;
  /** Whether the agent can be switched to text-only mode */
  supports_text_only?: boolean;
  first_message?: string | null;
  /** Whether to use WebRTC for conversation connections */
  use_rtc?: boolean | null;
  /** Configuration for file upload in the widget */
  file_input_config?: FileInputConfig;
};

export type WidgetEndFeedbackConfig = {
  /** The type of feedback to collect at the end of the conversation */
  type?: WidgetEndFeedbackType;
};

export type WidgetEndFeedbackType = "rating";

export type WidgetExpandable = "never" | "mobile" | "desktop" | "always";

export type WidgetFeedbackMode = "none" | "during" | "end";

export type WidgetLanguagePreset = {
  /** The text contents for the selected language */
  text_contents?: WidgetTextContents | null;
  /** The text to display for terms and conditions in this language */
  terms_text?: string | null;
  /** The HTML to display for terms and conditions in this language */
  terms_html?: string | null;
  /** The key to display for terms and conditions in this language */
  terms_key?: string | null;
  /** The translation cache for the terms */
  terms_translation?: WidgetTermsTranslation | null;
};

export type WidgetLanguagePresetResponse = {
  first_message?: string | null;
  /** The text contents for the selected language */
  text_contents?: WidgetTextContents | null;
  /** The text to display for terms and conditions in this language */
  terms_text?: string | null;
  /** The HTML to display for terms and conditions in this language */
  terms_html?: string | null;
  /** The key to display for terms and conditions in this language */
  terms_key?: string | null;
};

export type WidgetPlacement = "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right";

export type WidgetStyles = {
  /** The base background color. */
  base?: string | null;
  /** The color of the base background when hovered. */
  base_hover?: string | null;
  /** The color of the base background when active (clicked). */
  base_active?: string | null;
  /** The color of the border against the base background. */
  base_border?: string | null;
  /** The color of subtle text against the base background. */
  base_subtle?: string | null;
  /** The color of primary text against the base background. */
  base_primary?: string | null;
  /** The color of error text against the base background. */
  base_error?: string | null;
  /** The accent background color. */
  accent?: string | null;
  /** The color of the accent background when hovered. */
  accent_hover?: string | null;
  /** The color of the accent background when active (clicked). */
  accent_active?: string | null;
  /** The color of the border against the accent background. */
  accent_border?: string | null;
  /** The color of subtle text against the accent background. */
  accent_subtle?: string | null;
  /** The color of primary text against the accent background. */
  accent_primary?: string | null;
  /** The padding around the edges of the viewport. */
  overlay_padding?: number | null;
  /** The radius of the buttons. */
  button_radius?: number | null;
  /** The radius of the input fields. */
  input_radius?: number | null;
  /** The radius of the chat bubbles. */
  bubble_radius?: number | null;
  /** The default radius of sheets. */
  sheet_radius?: number | null;
  /** The radius of the sheet in compact mode. */
  compact_sheet_radius?: number | null;
  /** The radius of the dropdown sheet. */
  dropdown_sheet_radius?: number | null;
};

export type WidgetTermsTranslation = {
  source_hash: string;
  text: string;
};

export type WidgetTextContents = {
  /** Call to action displayed inside the compact and full variants. */
  main_label?: string | null;
  /** Text and ARIA label for the start call button. */
  start_call?: string | null;
  /** Text and ARIA label for the start chat button (text only) */
  start_chat?: string | null;
  /** Text and ARIA label for the new call button. Displayed when the caller already finished at least one call in order ot start the next one. */
  new_call?: string | null;
  /** Text and ARIA label for the end call button. */
  end_call?: string | null;
  /** ARIA label for the mute microphone button. */
  mute_microphone?: string | null;
  /** ARIA label for the change language dropdown. */
  change_language?: string | null;
  /** ARIA label for the collapse button. */
  collapse?: string | null;
  /** ARIA label for the expand button. */
  expand?: string | null;
  /** Text displayed when the user copies a value using the copy button. */
  copied?: string | null;
  /** Text and ARIA label for the accept terms button. */
  accept_terms?: string | null;
  /** Text and ARIA label for the cancel terms button. */
  dismiss_terms?: string | null;
  /** Status displayed when the agent is listening. */
  listening_status?: string | null;
  /** Status displayed when the agent is speaking. */
  speaking_status?: string | null;
  /** Status displayed when the agent is connecting. */
  connecting_status?: string | null;
  /** Status displayed when the agent is chatting (text only) */
  chatting_status?: string | null;
  /** ARIA label for the text message input. */
  input_label?: string | null;
  /** Placeholder text for the text message input. */
  input_placeholder?: string | null;
  /** Placeholder text for the text message input (text only) */
  input_placeholder_text_only?: string | null;
  /** Placeholder text for the text message input when starting a new conversation (text only) */
  input_placeholder_new_conversation?: string | null;
  /** Information message displayed when the user ends the conversation. */
  user_ended_conversation?: string | null;
  /** Information message displayed when the agent ends the conversation. */
  agent_ended_conversation?: string | null;
  /** Text label used next to the conversation ID. */
  conversation_id?: string | null;
  /** Text label used when an error occurs. */
  error_occurred?: string | null;
  /** Text and ARIA label used for the copy ID button. */
  copy_id?: string | null;
  /** Text displayed to prompt the user for feedback. */
  initiate_feedback?: string | null;
  /** Text displayed to request additional feedback details. */
  request_follow_up_feedback?: string | null;
  /** Text displayed to thank the user for providing feedback. */
  thanks_for_feedback?: string | null;
  /** Additional text displayed explaining the value of user feedback. */
  thanks_for_feedback_details?: string | null;
  /** Placeholder text for the follow-up feedback input field. */
  follow_up_feedback_placeholder?: string | null;
  /** Text and ARIA label for the submit button. */
  submit?: string | null;
  /** Text and ARIA label for the go back button. */
  go_back?: string | null;
  /** Text and ARIA label for the send message button. */
  send_message?: string | null;
  /** Text and ARIA label for the switch to text mode button. */
  text_mode?: string | null;
  /** Text and ARIA label for the switch to voice mode button. */
  voice_mode?: string | null;
  /** Toast notification displayed when switching to text mode. */
  switched_to_text_mode?: string | null;
  /** Toast notification displayed when switching to voice mode. */
  switched_to_voice_mode?: string | null;
  /** Text and ARIA label for the copy button. */
  copy?: string | null;
  /** Text and ARIA label for the download button. */
  download?: string | null;
  /** Text and ARIA label for the wrap toggle button. */
  wrap?: string | null;
  /** Status text displayed when the agent is processing a tool call. */
  agent_working?: string | null;
  /** Status text displayed when the agent finishes processing a tool call. */
  agent_done?: string | null;
  /** Status text displayed when the agent encounters an error during a tool call. */
  agent_error?: string | null;
};

export type WordTimestamp = {
  word: string;
  start_ms: number;
  end_ms: number;
};

export type WorkflowEdgeModelInput = {
  /** ID of the source node. */
  source: string;
  /** ID of the target node. */
  target: string;
  /** Condition that must be met for the edge to be traversed in the forward direction (source to target). */
  forward_condition?: WorkflowUnconditionalModelInput | WorkflowLlmConditionModelInput | WorkflowResultConditionModelInput | WorkflowExpressionConditionModelInput | null;
  /** Condition that must be met for the edge to be traversed in the backward direction (target to source). */
  backward_condition?: WorkflowUnconditionalModelInput | WorkflowLlmConditionModelInput | WorkflowResultConditionModelInput | WorkflowExpressionConditionModelInput | null;
};

export type WorkflowEdgeModelOutput = {
  /** ID of the source node. */
  source: string;
  /** ID of the target node. */
  target: string;
  /** Condition that must be met for the edge to be traversed in the forward direction (source to target). */
  forward_condition: WorkflowUnconditionalModelOutput | WorkflowLlmConditionModelOutput | WorkflowResultConditionModelOutput | WorkflowExpressionConditionModelOutput | null;
  /** Condition that must be met for the edge to be traversed in the backward direction (target to source). */
  backward_condition: WorkflowUnconditionalModelOutput | WorkflowLlmConditionModelOutput | WorkflowResultConditionModelOutput | WorkflowExpressionConditionModelOutput | null;
};

export type WorkflowEndNodeModelInput = {
  type?: string;
  /** Position of the node in the workflow. */
  position?: PositionInput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order?: (string)[];
};

export type WorkflowEndNodeModelOutput = {
  type: string;
  /** Position of the node in the workflow. */
  position: PositionOutput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order: (string)[];
};

export type WorkflowExpressionConditionModelInput = {
  /** Optional human-readable label for the condition used throughout the UI. */
  label?: string | null;
  type?: string;
  /** Expression to evaluate. */
  expression: AstNodeInput;
};

export type WorkflowExpressionConditionModelOutput = {
  /** Optional human-readable label for the condition used throughout the UI. */
  label: string | null;
  type: string;
  /** Expression to evaluate. */
  expression: AstNodeOutput;
};

export type WorkflowFeaturesUsageCommonModel = {
  enabled?: boolean;
  tool_node?: FeatureStatusCommonModel;
  standalone_agent_node?: FeatureStatusCommonModel;
  phone_number_node?: FeatureStatusCommonModel;
  end_node?: FeatureStatusCommonModel;
};

export type WorkflowLlmConditionModelInput = {
  /** Optional human-readable label for the condition used throughout the UI. */
  label?: string | null;
  type?: string;
  /** Condition to evaluate */
  condition: string;
};

export type WorkflowLlmConditionModelOutput = {
  /** Optional human-readable label for the condition used throughout the UI. */
  label: string | null;
  type: string;
  /** Condition to evaluate */
  condition: string;
};

export type WorkflowOverrideAgentNodeModelInput = {
  /** Configuration overrides applied while the subagent is conducting the conversation. */
  conversation_config?: ConversationalConfigApiModelWorkflowOverrideInput;
  /** Specific goal for this subagent. It will be added to the system prompt and can be used to further refine the agent's behavior in this specific context. */
  additional_prompt?: string;
  /** Additional knowledge base documents that the subagent has access to. These will be used in addition to the main agent's documents. */
  additional_knowledge_base?: (KnowledgeBaseLocator)[];
  /** IDs of additional tools that the subagent has access to. These will be used in addition to the main agent's tools. */
  additional_tool_ids?: (string)[];
  type?: string;
  /** Position of the node in the workflow. */
  position?: PositionInput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order?: (string)[];
  /** Human-readable label for the node used throughout the UI. */
  label: string;
};

export type WorkflowOverrideAgentNodeModelOutput = {
  /** Configuration overrides applied while the subagent is conducting the conversation. */
  conversation_config: ConversationalConfigApiModelWorkflowOverrideOutput;
  /** Specific goal for this subagent. It will be added to the system prompt and can be used to further refine the agent's behavior in this specific context. */
  additional_prompt: string;
  /** Additional knowledge base documents that the subagent has access to. These will be used in addition to the main agent's documents. */
  additional_knowledge_base: (KnowledgeBaseLocator)[];
  /** IDs of additional tools that the subagent has access to. These will be used in addition to the main agent's tools. */
  additional_tool_ids: (string)[];
  type: string;
  /** Position of the node in the workflow. */
  position: PositionOutput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order: (string)[];
  /** Human-readable label for the node used throughout the UI. */
  label: string;
};

export type WorkflowPhoneNumberNodeModelInput = {
  /** Custom SIP headers to include when transferring the call. Each header can be either a static value or a dynamic variable reference. */
  custom_sip_headers?: (CustomSipHeader | CustomSipHeaderWithDynamicVariable)[];
  transfer_destination: PhoneNumberTransferDestination | SipUriTransferDestination | PhoneNumberDynamicVariableTransferDestination | SipUriDynamicVariableTransferDestination;
  transfer_type?: TransferTypeEnum;
  /** DTMF digits to send after call connects (e.g., 'ww1234' for extension). Can be either a static value or a dynamic variable reference. Use 'w' for 0.5s pause. Only supported for Twilio transfers. */
  post_dial_digits?: PostDialDigitsStatic | PostDialDigitsDynamicVariable | null;
  type?: string;
  /** Position of the node in the workflow. */
  position?: PositionInput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order?: (string)[];
};

export type WorkflowPhoneNumberNodeModelOutput = {
  /** Custom SIP headers to include when transferring the call. Each header can be either a static value or a dynamic variable reference. */
  custom_sip_headers: (CustomSipHeader | CustomSipHeaderWithDynamicVariable)[];
  transfer_destination: PhoneNumberTransferDestination | SipUriTransferDestination | PhoneNumberDynamicVariableTransferDestination | SipUriDynamicVariableTransferDestination;
  transfer_type: TransferTypeEnum;
  /** DTMF digits to send after call connects (e.g., 'ww1234' for extension). Can be either a static value or a dynamic variable reference. Use 'w' for 0.5s pause. Only supported for Twilio transfers. */
  post_dial_digits: PostDialDigitsStatic | PostDialDigitsDynamicVariable | null;
  type: string;
  /** Position of the node in the workflow. */
  position: PositionOutput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order: (string)[];
};

export type WorkflowResultConditionModelInput = {
  /** Optional human-readable label for the condition used throughout the UI. */
  label?: string | null;
  type?: string;
  /** Whether all tools in the previously executed tool node were executed successfully. */
  successful: boolean;
};

export type WorkflowResultConditionModelOutput = {
  /** Optional human-readable label for the condition used throughout the UI. */
  label: string | null;
  type: string;
  /** Whether all tools in the previously executed tool node were executed successfully. */
  successful: boolean;
};

export type WorkflowStandaloneAgentNodeModelInput = {
  type?: string;
  /** Position of the node in the workflow. */
  position?: PositionInput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order?: (string)[];
  /** The ID of the agent to transfer the conversation to. None means transfer within the current agent. */
  agent_id?: string | null;
  /** Optional target node ID in the destination agent's workflow. When set, the transfer starts at this node instead of the default entry node. */
  node_id?: string | null;
  /** Artificial delay in milliseconds applied before transferring the conversation. */
  delay_ms?: number;
  /** Optional message sent to the user before the transfer is initiated. */
  transfer_message?: string | null;
  /** Whether to enable the transferred agent to send its configured first message after the transfer. */
  enable_transferred_agent_first_message?: boolean;
};

export type WorkflowStandaloneAgentNodeModelOutput = {
  type: string;
  /** Position of the node in the workflow. */
  position: PositionOutput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order: (string)[];
  /** The ID of the agent to transfer the conversation to. None means transfer within the current agent. */
  agent_id: string | null;
  /** Optional target node ID in the destination agent's workflow. When set, the transfer starts at this node instead of the default entry node. */
  node_id: string | null;
  /** Artificial delay in milliseconds applied before transferring the conversation. */
  delay_ms: number;
  /** Optional message sent to the user before the transfer is initiated. */
  transfer_message: string | null;
  /** Whether to enable the transferred agent to send its configured first message after the transfer. */
  enable_transferred_agent_first_message: boolean;
};

export type WorkflowStartNodeModelInput = {
  type?: string;
  /** Position of the node in the workflow. */
  position?: PositionInput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order?: (string)[];
};

export type WorkflowStartNodeModelOutput = {
  type: string;
  /** Position of the node in the workflow. */
  position: PositionOutput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order: (string)[];
};

export type WorkflowToolEdgeStepModel = {
  step_latency_secs: number;
  type?: string;
  edge_id: string;
  target_node_id: string;
};

export type WorkflowToolLocator = {
  tool_id: string;
};

export type WorkflowToolMaxIterationsExceededStepModel = {
  step_latency_secs: number;
  type?: string;
  max_iterations: number;
};

export type WorkflowToolNestedToolsStepModelInput = {
  step_latency_secs: number;
  type?: string;
  node_id: string;
  requests: (ConversationHistoryTranscriptToolCallCommonModelInput)[];
  results: (ConversationHistoryTranscriptOtherToolsResultCommonModel | ConversationHistoryTranscriptSystemToolResultCommonModelInput | ConversationHistoryTranscriptApiIntegrationWebhookToolsResultCommonModelInput | ConversationHistoryTranscriptWorkflowToolsResultCommonModelInput)[];
  is_successful: boolean;
};

export type WorkflowToolNestedToolsStepModelOutput = {
  step_latency_secs: number;
  type?: string;
  node_id: string;
  requests: (ConversationHistoryTranscriptToolCallCommonModelOutput)[];
  results: (ConversationHistoryTranscriptOtherToolsResultCommonModel | ConversationHistoryTranscriptSystemToolResultCommonModelOutput | ConversationHistoryTranscriptApiIntegrationWebhookToolsResultCommonModelOutput | ConversationHistoryTranscriptWorkflowToolsResultCommonModelOutput)[];
  is_successful: boolean;
};

export type WorkflowToolNodeModelInput = {
  type?: string;
  /** Position of the node in the workflow. */
  position?: PositionInput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order?: (string)[];
  /** List of tools to execute in parallel. The entire node is considered successful if all tools are executed successfully. */
  tools?: (WorkflowToolLocator)[];
};

export type WorkflowToolNodeModelOutput = {
  type: string;
  /** Position of the node in the workflow. */
  position: PositionOutput;
  /** The ids of outgoing edges in the order they should be evaluated. */
  edge_order: (string)[];
  /** List of tools to execute in parallel. The entire node is considered successful if all tools are executed successfully. */
  tools: (WorkflowToolLocator)[];
};

/** A common model for workflow tool responses. */
export type WorkflowToolResponseModelInput = {
  steps?: (WorkflowToolEdgeStepModel | WorkflowToolNestedToolsStepModelInput | WorkflowToolMaxIterationsExceededStepModel)[];
};

/** A common model for workflow tool responses. */
export type WorkflowToolResponseModelOutput = {
  steps?: (WorkflowToolEdgeStepModel | WorkflowToolNestedToolsStepModelOutput | WorkflowToolMaxIterationsExceededStepModel)[];
};

export type WorkflowUnconditionalModelInput = {
  /** Optional human-readable label for the condition used throughout the UI. */
  label?: string | null;
  type?: string;
};

export type WorkflowUnconditionalModelOutput = {
  /** Optional human-readable label for the condition used throughout the UI. */
  label: string | null;
  type: string;
};

export type WorkspaceAnalyticsQueryResponseModel = {
  columns: (string)[];
  column_types: ("String" | "Float" | "DateTime" | "Int" | "Bool" | "JSON" | "Map")[];
  rows: ((string | number | number | boolean | string | null)[])[];
  column_units: (ColumnUnit | null)[];
};

export type WorkspaceApiKeyListResponseModel = {
  "api-keys": (WorkspaceApiKeyResponseModel)[];
};

export type WorkspaceApiKeyResponseModel = {
  name: string;
  hint: string;
  key_id: string;
  service_account_user_id: string;
  created_at_unix?: number | null;
  is_disabled?: boolean;
  permissions?: (PermissionType)[] | null;
  character_limit?: number | null;
  character_count?: number | null;
  hashed_xi_api_key: string;
  allowed_ips?: (string)[] | null;
};

/** Audit log entry with Firestore document ID for API responses. */
export type WorkspaceAuditLogEntryResponse = {
  /** Event metadata */
  metadata?: { [key: string]: unknown };
  /** Event time in milliseconds since epoch */
  time?: number;
  /** Activity ID */
  activity_id: AccountChangeActivityId | AuthenticationActivityId | EntityManagementActivityId | UserAccessManagementActivityId | GroupManagementActivityId;
  /** Activity name */
  activity_name: string;
  /** Event category */
  category_name?: string;
  /** Category UID for IAM */
  category_uid?: number;
  /** Event class name */
  class_name?: string;
  /** Event class UID */
  class_uid?: number;
  /** Severity level */
  severity_id?: SeverityId;
  /** Status of the action */
  status_id: StatusId;
  /** Actor performing the action */
  actor: ActorModel;
  /** Device information */
  device?: DeviceModel | null;
  /** HTTP request details */
  http_request?: HttpRequestModel | null;
  /** Human-readable event description */
  message: string;
  /** Attributes not mapped to OCSF */
  unmapped?: { [key: string]: unknown };
  /** Firestore document ID */
  id: string;
  /** Event time in human-readable RFC 3339 format, derived from 'time'. */
  time_dt: string;
  /** OCSF type_uid is class_uid * 100 + activity_id. */
  type_uid: number;
  /** OCSF type_name combines class_name and activity_name. */
  type_name: string;
};

/** Paginated workspace audit log response. */
export type WorkspaceAuditLogsPageResponse = {
  entries: (WorkspaceAuditLogEntryResponse)[];
  has_more: boolean;
  next_cursor: string | null;
};

export type WorkspaceBatchCallsResponse = {
  batch_calls: (BatchCallResponse)[];
  /** The next document, used to paginate through the batch calls */
  next_doc?: string | null;
  /** Whether there are more batch calls to paginate through */
  has_more?: boolean;
};

export type WorkspaceCreateApiKeyResponseModel = {
  "xi-api-key": string;
  key_id: string;
};

export type WorkspaceCreateWebhookResponseModel = {
  webhook_id: string;
  webhook_secret?: string | null;
};

export type WorkspaceGroupByNameResponseModel = {
  /** The name of the workspace group. */
  name: string;
  /** The ID of the workspace group. */
  id: string;
  /** The emails of the members of the workspace group. */
  members_emails: (string)[];
};

export type WorkspaceGroupPermission = "text_to_speech" | "speech_to_speech" | "speech_to_text" | "voice_lab" | "sound_effects" | "projects" | "voiceover_studio" | "dubbing" | "audio_native" | "conversational_ai" | "conversational_ai_read" | "voice_isolator" | "ai_speech_classifier" | "add_voice_from_voice_library" | "create_instant_voice_clone" | "create_professional_voice_clone" | "create_user_api_key" | "publish_studio_project" | "music" | "image_video_generation" | "share_voice_externally" | "publish_voice_to_voice_library" | "view_fiat_balance" | "workspace_analytics_full_read" | "service_accounts_manage" | "webhooks_manage" | "group_members_manage" | "workspace_members_invite" | "workspace_members_remove" | "terms_of_service_accept" | "audit_log_read" | "copy_resources_cross_workspace" | "voice_design";

export type WorkspaceGroupResponseModel = {
  name: string;
  id: string;
  members: (string)[];
  permissions: (WorkspaceGroupPermission)[] | null;
  group_usage_limit?: number | string | null;
  group_pvc_limit?: number | string | null;
  character_count?: number | null;
  scim_external_id?: string | null;
  is_scim_synced?: boolean;
};

/** Resource types that can be shared in the workspace. The name always need to match the collection names */
export type WorkspaceResourceType = "voice" | "voice_collection" | "pronunciation_dictionary" | "dubbing" | "project" | "convai_agents" | "convai_knowledge_base_documents" | "convai_tools" | "convai_settings" | "convai_secrets" | "workspace_auth_connections" | "convai_phone_numbers" | "convai_mcp_servers" | "convai_api_integration_connections" | "convai_api_integration_trigger_connections" | "convai_batch_calls" | "convai_agent_response_tests" | "convai_test_suite_invocations" | "convai_crawl_jobs" | "convai_crawl_tasks" | "convai_whatsapp_accounts" | "convai_agent_versions" | "convai_agent_branches" | "convai_agent_versions_deployments" | "convai_memory_entries" | "convai_coaching_proposals" | "convai_templates" | "dashboard" | "dashboard_configuration" | "convai_agent_drafts" | "resource_locators" | "assets" | "content_generations" | "content_templates" | "songs" | "transcription_tasks" | "avatars" | "avatar_video_generations" | "resource_collection" | "studio_projects";

export type WorkspaceServiceAccountListResponseModel = {
  "service-accounts": (WorkspaceServiceAccountResponseModel)[];
};

export type WorkspaceServiceAccountResponseModel = {
  service_account_user_id: string;
  name: string;
  created_at_unix?: number | null;
  "api-keys": (WorkspaceApiKeyResponseModel)[];
  default_sharing_groups?: (DefaultSharingGroupResponseModel)[];
};

export type WorkspaceWebhookListResponseModel = {
  /** List of webhooks currently configured for the workspace */
  webhooks: (WorkspaceWebhookResponseModel)[];
};

export type WorkspaceWebhookResponseModel = {
  /** The display name for this webhook. */
  name: string;
  /** The unique ID for this webhook. */
  webhook_id: string;
  /** The HTTPS callback URL that is called when this webhook is triggered in the platform. */
  webhook_url: string;
  /** Whether the webhook has been manually disabled by a user. */
  is_disabled: boolean;
  /** Whether the webhook has been automatically disabled due to repeated consecutive failures over a long period of time. */
  is_auto_disabled: boolean;
  /** Original creation time of the webhook. */
  created_at_unix: number;
  /** The authentication mode used to secure the webhook. */
  auth_type: WebhookAuthMethodType;
  /** The list of products that are currently configured to trigger this webhook. */
  usage?: (WorkspaceWebhookUsageResponseModel)[] | null;
  /** The most recent error code returned from the callback URL. */
  most_recent_failure_error_code?: number | null;
  /** The most recent time the webhook failed, failures are any non-200 codes returned by the callback URL. */
  most_recent_failure_timestamp?: number | null;
};

export type WorkspaceWebhookUsageResponseModel = {
  usage_type: WebhookUsageType;
};
