export type Datetime = string | number;

/** Activities performed by Admins. */
export type ActivityLog = {
  /** The id representing the activity. */
  id?: string;
  /** Details about the Admin involved in the activity. */
  performed_by?: { type?: string; id?: string; email?: string; ip?: string };
  metadata?: ActivityLogMetadata;
  /** The time the activity was created. */
  created_at?: number;
  activity_type?: "admin_conversation_assignment_limit_change" | "admin_ticket_assignment_limit_change" | "admin_away_mode_change" | "admin_deletion" | "admin_deprovisioned" | "admin_impersonation_end" | "admin_impersonation_start" | "admin_impersonation_consent_approved" | "admin_impersonation_consent_revoked" | "admin_invite_change" | "admin_invite_creation" | "admin_invite_deletion" | "admin_login_failure" | "admin_login_success" | "admin_logout" | "admin_password_reset_request" | "admin_password_reset_success" | "admin_permission_change" | "admin_provisioned" | "admin_two_factor_auth_change" | "admin_unauthorized_sign_in_method" | "app_admin_join" | "app_authentication_method_change" | "app_data_deletion" | "app_data_export" | "app_google_sso_domain_change" | "app_identity_verification_change" | "app_name_change" | "app_outbound_address_change" | "app_package_installation" | "app_package_token_regeneration" | "app_package_uninstallation" | "app_team_creation" | "app_team_deletion" | "app_team_membership_modification" | "app_timezone_change" | "app_webhook_creation" | "app_webhook_deletion" | "articles_in_messenger_enabled_change" | "automatic_away_mode_setting_change" | "bulk_delete" | "bulk_export" | "campaign_deletion" | "campaign_state_change" | "conversation_deletion_schedule_creation" | "conversation_deletion_schedule_deletion" | "conversation_deletion_schedule_state_change" | "conversation_deletion_schedule_update" | "conversation_part_deletion" | "conversation_topic_change" | "conversation_topic_creation" | "conversation_topic_deletion" | "content_redaction_rule_creation" | "content_redaction_rule_deletion" | "content_redaction_rule_update" | "csv_import_completion" | "csv_import_creation" | "custom_authentication_token_creation" | "help_center_settings_change" | "inbound_conversations_change" | "inbox_access_change" | "macro_creation" | "macro_deletion" | "macro_update" | "malicious_domains_setting_change" | "message_deletion" | "message_state_change" | "messenger_api_secret_creation" | "messenger_api_secret_deletion" | "messenger_look_and_feel_change" | "messenger_search_required_change" | "messenger_spaces_change" | "oauth_token_revocation" | "office_hours_change" | "role_change" | "role_creation" | "role_deletion" | "ruleset_activation_title_preview" | "ruleset_creation" | "ruleset_deletion" | "search_browse_enabled_change" | "search_browse_required_change" | "seat_change" | "seat_revoke" | "security_settings_change" | "series_creation" | "series_deletion" | "series_settings_update" | "series_status_change" | "series_update" | "strip_inbound_email_links_change" | "temporary_expectation_change" | "team_assignment_limit_change" | "trusted_domains_setting_change" | "unassign_unsnoozed_at_capacity_setting_change" | "unassign_unsnoozed_when_away_setting_change" | "upfront_email_collection_change" | "allowed_attachment_filetypes_setting_change" | "attach_uploads_inline_setting_change" | "teammate_gifs_setting_change" | "user_camera_attachments_setting_change" | "user_conversation_attachments_setting_change" | "user_file_attachments_setting_change" | "user_gifs_setting_change" | "user_media_attachments_setting_change" | "user_voice_notes_setting_change" | "welcome_message_change" | "workspace_deletion_request" | "hide_csat_from_agents_setting_change";
  /** A sentence or two describing the activity. */
  activity_description?: string;
};

/** A paginated list of activity logs. */
export type ActivityLogList = {
  /** String representing the object's type. Always has the value `activity_log.list`. */
  type?: string;
  pages?: CursorPages;
  /** An array of activity logs */
  activity_logs?: (ActivityLog)[];
};

/** Additional data provided about Admin activity. */
export type ActivityLogMetadata = {
  /** The way the admin signed in. */
  sign_in_method?: string | null;
  /** The unique identifier for the contact which is provided by the Client. */
  external_id?: string | null;
  /** The away mode status which is set to true when away and false when returned. */
  away_mode?: boolean | null;
  /** The reason the Admin is away. */
  away_status_reason?: string | null;
  /** Indicates if conversations should be reassigned while an Admin is away. */
  reassign_conversations?: boolean | null;
  /** The action that initiated the status change. */
  source?: string | null;
  /** Indicates if the status was changed automatically or manually. */
  auto_changed?: string | null;
  /** The ID of the Admin who initiated the activity. */
  update_by?: number | null;
  /** The name of the Admin who initiated the activity. */
  update_by_name?: string | null;
  /** The conversation assignment limit value for an admin. */
  conversation_assignment_limit?: number | null;
  /** The ticket assignment limit value for an admin. */
  ticket_assignment_limit?: number | null;
  /** Details about the team whose assignment limit was changed. */
  team?: { id?: number; name?: string } | null;
  /** The team assignment limit value (null if limit was removed). */
  team_assignment_limit?: number | null;
  /** Indicates if the setting is enabled or disabled. */
  enabled?: boolean | null;
  /** The mode of the setting (e.g., when_away_only, when_away_and_reassign). */
  mode?: string | null;
  /** The ID of the impersonation consent. */
  consent_id?: number | null;
  /** The timestamp when the impersonation consent expires. */
  expired_at?: string | null;
  /** The state of settings or values before the change. Structure varies by activity type. */
  before?: { [key: string]: unknown } | null;
  /** The state of settings or values after the change. Structure varies by activity type. */
  after?: { [key: string]: unknown } | null;
};

/** A list used to access other resources from a parent model. */
export type AddressableList = {
  /** The addressable object type */
  type?: string;
  /** The id of the addressable object */
  id?: string;
  /** Url to get more company resources for this contact */
  url?: string;
};

/** Admins are teammate accounts that have access to a workspace. */
export type Admin = {
  /** String representing the object's type. Always has the value `admin`. */
  type?: string;
  /** The id representing the admin. */
  id?: string;
  /** The name of the admin. */
  name?: string;
  /** The email of the admin. */
  email?: string;
  /** The job title of the admin. */
  job_title?: string;
  /** Identifies if this admin is currently set in away mode. */
  away_mode_enabled?: boolean;
  /** Identifies if this admin is set to automatically reassign new conversations to the apps default inbox. */
  away_mode_reassign?: boolean;
  /** The unique identifier of the away status reason */
  away_status_reason_id?: number | null;
  /** Identifies if this admin has a paid inbox seat to restrict/allow features that require them. */
  has_inbox_seat?: boolean;
  /** This object represents the avatar associated with the admin. */
  team_ids?: (number)[];
  /** Image for the associated team or teammate */
  avatar?: string | null;
  team_priority_level?: TeamPriorityLevel;
};

/** A list of admins associated with a given workspace. */
export type AdminList = {
  /** String representing the object's type. Always has the value `admin.list`. */
  type?: string;
  /** A list of admins associated with a given workspace. */
  admins?: (Admin)[];
};

/** Admin priority levels for the team */
export type AdminPriorityLevel = {
  /** The primary admin ids for the team */
  primary_admin_ids?: (number)[] | null;
  /** The secondary admin ids for the team */
  secondary_admin_ids?: (number)[] | null;
};

/** Payload of the request to reply on behalf of an admin */
export type AdminReplyConversationRequest = {
  message_type: "comment" | "note" | "quick_reply";
  type: "admin";
  /** The text body of the reply. Notes accept some HTML formatting. Must be present for comment and note message types. */
  body?: string;
  /** The id of the admin who is authoring the comment. */
  admin_id: string;
  /** The time the reply was created. If not provided, the current time will be used. */
  created_at?: number;
  /** The quick reply options to display to the end user. Must be present for quick_reply message types. */
  reply_options?: (QuickReplyOption)[];
  /** A list of image URLs that will be added as attachments. You can include up to 10 URLs. */
  attachment_urls?: (string)[];
  /** A list of files that will be added as attachments. You can include up to 10 files */
  attachment_files?: (ConversationAttachmentFiles)[];
  /** Option to disable notifications when replying to a conversation. */
  skip_notifications?: boolean;
};

/** Payload of the request to reply on behalf of an admin */
export type AdminReplyTicketRequest = {
  message_type: "comment" | "note" | "quick_reply";
  type: "admin";
  /** The text body of the reply. Notes accept some HTML formatting. Must be present for comment and note message types. */
  body?: string;
  /** The id of the admin who is authoring the comment. */
  admin_id: string;
  /** The time the reply was created. If not provided, the current time will be used. */
  created_at?: number;
  /** The quick reply options to display. Must be present for quick_reply message types. */
  reply_options?: ({ text: string; uuid: string })[];
  /** A list of image URLs that will be added as attachments. You can include up to 10 URLs. */
  attachment_urls?: (string)[];
  /** If set to true, the note will be cross-posted to all linked conversations. Only applicable to note message types on back-office tickets. */
  cross_post?: boolean;
};

/** Admins are the teammate accounts that have access to a workspace */
export type AdminWithApp = {
  /** String representing the object's type. Always has the value `admin`. */
  type?: string;
  /** The id representing the admin. */
  id?: string;
  /** The name of the admin. */
  name?: string;
  /** The email of the admin. */
  email?: string;
  /** The job title of the admin. */
  job_title?: string;
  /** Identifies if this admin is currently set in away mode. */
  away_mode_enabled?: boolean;
  /** Identifies if this admin is set to automatically reassign new conversations to the apps default inbox. */
  away_mode_reassign?: boolean;
  /** Identifies if this admin has a paid inbox seat to restrict/allow features that require them. */
  has_inbox_seat?: boolean;
  /** This is a list of ids of the teams that this admin is part of. */
  team_ids?: (number)[];
  /** This object represents the avatar associated with the admin. */
  avatar?: { type?: string; image_url?: string | null };
  /** Identifies if this admin's email is verified. */
  email_verified?: boolean | null;
  /** App that the admin belongs to. */
  app?: App;
};

/** Data related to AI Agent involvement in the conversation. */
export type AiAgent = {
  /** The type of the source that triggered AI Agent involvement in the conversation. */
  source_type?: "essentials_plan_setup" | "profile" | "workflow" | "workflow_preview" | "fin_preview" | null;
  /** The title of the source that triggered AI Agent involvement in the conversation. If this is `essentials_plan_setup` then it will return `null`. */
  source_title?: string | null;
  /** The type of the last answer delivered by AI Agent. If no answer was delivered then this will return `null` */
  last_answer_type?: null | "ai_answer" | "custom_answer" | null;
  /** The resolution state of AI Agent. If no AI or custom answer has been delivered then this will return `null`. */
  resolution_state?: "assumed_resolution" | "confirmed_resolution" | "escalated" | "negative_feedback" | "procedure_handoff" | null | null;
  /** The customer satisfaction rating given to AI Agent, from 1-5. */
  rating?: number | null;
  /** The customer satisfaction rating remark given to AI Agent. */
  rating_remark?: string | null;
  /** The time when the AI agent rating was created. */
  created_at?: number | null;
  /** The time when the AI agent rating was last updated. */
  updated_at?: number | null;
  content_sources?: ContentSourcesList;
};

/** Response containing information about a Fin Voice call */
export type AiCallResponse = {
  /** The unique identifier for the external reference */
  id?: number;
  /** The workspace identifier */
  app_id?: number;
  /** Phone number in E.164 format for the call */
  user_phone_number?: string;
  /** Status of the call. Can be "registered", "in-progress", or a resolution state */
  status?: string;
  /** The Intercom call identifier, if the call has been matched */
  intercom_call_id?: string | null;
  /** The external call identifier from the call provider */
  external_call_id?: string;
  /** The Intercom conversation identifier, if a conversation has been created */
  intercom_conversation_id?: string | null;
  /** Array of transcript entries for the call */
  call_transcript?: ({ [key: string]: unknown })[];
  /** Summary of the call conversation, truncated to 256 characters. Empty string if no summary available. */
  call_summary?: string;
  /** Array of intent classifications for the call */
  intent?: ({ [key: string]: unknown })[];
};

/** App is a workspace on Intercom */
export type App = {
  type?: string;
  /** The id of the app. */
  id_code?: string;
  /** The name of the app. */
  name?: string;
  /** The Intercom region the app is located in. */
  region?: string;
  /** The timezone of the region where the app is located. */
  timezone?: string;
  /** When the app was created. */
  created_at?: number;
  /** Whether or not the app uses identity verification. */
  identity_verification?: boolean;
};

/** The Articles API is a central place to gather all information and take actions on your articles. Articles can live within collections and sections, or alternatively they can stand alone. */
export type Article = {
  statistics?: ArticleStatistics;
};

/** The Internal Articles API is a central place to gather all information and take actions on your internal articles. */
export type InternalArticle = InternalArticleListItem;

/** The Content of an Article. */
export type ArticleContent = {
  /** The type of object - `article_content` . */
  type?: null | "article_content" | null;
  /** The title of the article. */
  title?: string;
  /** The description of the article. */
  description?: string;
  /** The body of the article. */
  body?: string;
  /** The ID of the author of the article. */
  author_id?: number;
  /** Whether the article is `published` or is a `draft` . */
  state?: "published" | "draft";
  /** The time when the article was created (seconds). */
  created_at?: number;
  /** The time when the article was last updated (seconds). */
  updated_at?: number;
  /** The URL of the article. */
  url?: string;
};

/** This will return a list of internal articles for the App. */
export type InternalArticleList = {
  /** The type of the object - `list`. */
  type?: "list";
  pages?: CursorPages;
  /** A count of the total number of internal articles. */
  total_count?: number;
  /** An array of Internal Article objects */
  data?: (InternalArticleListItem)[];
};

/** This will return a list of articles for the App. */
export type ArticleList = {
  /** The type of the object - `list`. */
  type?: "list";
  pages?: CursorPages;
  /** A count of the total number of articles. */
  total_count?: number;
  /** An array of Article objects */
  data?: (ArticleListItem)[];
};

/** The data returned about your articles when you list them. */
export type ArticleListItem = {
  /** The type of object - `article`. */
  type?: "article";
  /** The unique identifier for the article which is given by Intercom. */
  id?: string;
  /** The id of the workspace which the article belongs to. */
  workspace_id?: string;
  /** The title of the article. For multilingual articles, this will be the title of the default language's content. */
  title?: string;
  /** The description of the article. For multilingual articles, this will be the description of the default language's content. */
  description?: string | null;
  /** The body of the article in HTML. For multilingual articles, this will be the body of the default language's content. */
  body?: string | null;
  /** The id of the author of the article. For multilingual articles, this will be the id of the author of the default language's content. Must be a teammate on the help center's workspace. */
  author_id?: number;
  /** Whether the article is `published` or is a `draft`. For multilingual articles, this will be the state of the default language's content. */
  state?: "published" | "draft";
  /** The time when the article was created. For multilingual articles, this will be the timestamp of creation of the default language's content in seconds. */
  created_at?: number;
  /** The time when the article was last updated. For multilingual articles, this will be the timestamp of last update of the default language's content in seconds. */
  updated_at?: number;
  /** The URL of the article. For multilingual articles, this will be the URL of the default language's content. */
  url?: string | null;
  /** The id of the article's parent collection or section. An article without this field stands alone. */
  parent_id?: number | null;
  /** The ids of the article's parent collections or sections. An article without this field stands alone. */
  parent_ids?: (number)[];
  /** The type of parent, which can either be a `collection` or `section`. */
  parent_type?: string | null;
  /** The default locale of the help center. This field is only returned for multilingual help centers. */
  default_locale?: string;
  translated_content?: ArticleTranslatedContent;
  tags?: Tags;
};

/** The data returned about your internal articles when you list them. */
export type InternalArticleListItem = {
  /** The type of object - `internal_article`. */
  type?: "internal_article";
  /** The unique identifier for the article which is given by Intercom. */
  id?: string;
  /** The title of the article. */
  title?: string;
  /** The body of the article in HTML. */
  body?: string | null;
  /** The id of the owner of the article. */
  owner_id?: number;
  /** The id of the author of the article. */
  author_id?: number;
  /** The time when the article was created. */
  created_at?: number;
  /** The time when the article was last updated. */
  updated_at?: number;
  /** The default locale of the article. */
  locale?: string;
};

/** The highlighted results of an Article search. In the examples provided my search query is always "my query". */
export type ArticleSearchHighlights = {
  /** The ID of the corresponding article. */
  article_id?: string;
  /** An Article title highlighted. */
  highlighted_title?: ({ type?: "highlight" | "plain"; text?: string })[];
  /** An Article description and body text highlighted. */
  highlighted_summary?: (({ type?: "highlight" | "plain"; text?: string })[])[];
};

/** The results of an Article search */
export type ArticleSearchResponse = {
  /** The type of the object - `list`. */
  type?: "list";
  /** The total number of Articles matching the search query */
  total_count?: number;
  /** An object containing the results of the search. */
  data?: { articles?: (Article)[]; highlights?: (ArticleSearchHighlights)[] };
  pages?: CursorPages;
};

/** The results of an Internal Article search */
export type InternalArticleSearchResponse = {
  /** The type of the object - `list`. */
  type?: "list";
  /** The total number of Internal Articles matching the search query */
  total_count?: number;
  /** An object containing the results of the search. */
  data?: { internal_articles?: (InternalArticle)[] };
  pages?: CursorPages;
};

/** The statistics of an article. */
export type ArticleStatistics = {
  /** The type of object - `article_statistics`. */
  type?: "article_statistics";
  /** The number of total views the article has received. */
  views?: number;
  /** The number of conversations started from the article. */
  conversions?: number;
  /** The number of total reactions the article has received. */
  reactions?: number;
  /** The percentage of happy reactions the article has received against other types of reaction. */
  happy_reaction_percentage?: number;
  /** The percentage of neutral reactions the article has received against other types of reaction. */
  neutral_reaction_percentage?: number;
  /** The percentage of sad reactions the article has received against other types of reaction. */
  sad_reaction_percentage?: number;
};

/** The Translated Content of an Article. The keys are the locale codes and the values are the translated content of the article. */
export type ArticleTranslatedContent = {
  /** The type of object - article_translated_content. */
  type?: null | "article_translated_content" | null;
  /** The content of the article in Arabic */
  ar?: ArticleContent;
  /** The content of the article in Bulgarian */
  bg?: ArticleContent;
  /** The content of the article in Bosnian */
  bs?: ArticleContent;
  /** The content of the article in Catalan */
  ca?: ArticleContent;
  /** The content of the article in Czech */
  cs?: ArticleContent;
  /** The content of the article in Danish */
  da?: ArticleContent;
  /** The content of the article in German */
  de?: ArticleContent;
  /** The content of the article in Greek */
  el?: ArticleContent;
  /** The content of the article in English */
  en?: ArticleContent;
  /** The content of the article in Spanish */
  es?: ArticleContent;
  /** The content of the article in Estonian */
  et?: ArticleContent;
  /** The content of the article in Finnish */
  fi?: ArticleContent;
  /** The content of the article in French */
  fr?: ArticleContent;
  /** The content of the article in Hebrew */
  he?: ArticleContent;
  /** The content of the article in Croatian */
  hr?: ArticleContent;
  /** The content of the article in Hungarian */
  hu?: ArticleContent;
  /** The content of the article in Indonesian */
  id?: ArticleContent;
  /** The content of the article in Italian */
  it?: ArticleContent;
  /** The content of the article in Japanese */
  ja?: ArticleContent;
  /** The content of the article in Korean */
  ko?: ArticleContent;
  /** The content of the article in Lithuanian */
  lt?: ArticleContent;
  /** The content of the article in Latvian */
  lv?: ArticleContent;
  /** The content of the article in Mongolian */
  mn?: ArticleContent;
  /** The content of the article in Norwegian */
  nb?: ArticleContent;
  /** The content of the article in Dutch */
  nl?: ArticleContent;
  /** The content of the article in Polish */
  pl?: ArticleContent;
  /** The content of the article in Portuguese (Portugal) */
  pt?: ArticleContent;
  /** The content of the article in Romanian */
  ro?: ArticleContent;
  /** The content of the article in Russian */
  ru?: ArticleContent;
  /** The content of the article in Slovenian */
  sl?: ArticleContent;
  /** The content of the article in Serbian */
  sr?: ArticleContent;
  /** The content of the article in Swedish */
  sv?: ArticleContent;
  /** The content of the article in Turkish */
  tr?: ArticleContent;
  /** The content of the article in Vietnamese */
  vi?: ArticleContent;
  /** The content of the article in Portuguese (Brazil) */
  "pt-BR"?: ArticleContent;
  /** The content of the article in Chinese (China) */
  "zh-CN"?: ArticleContent;
  /** The content of the article in Chinese (Taiwan) */
  "zh-TW"?: ArticleContent;
};

/** Payload of the request to assign a conversation */
export type AssignConversationRequest = {
  message_type: "assignment";
  type: "admin" | "team";
  /** The id of the admin who is performing the action. */
  admin_id: string;
  /** The `id` of the `admin` or `team` which will be assigned the conversation. A conversation can be assigned both an admin and a team.\nSet `0` if you want this assign to no admin or team (ie. Unassigned). */
  assignee_id: string;
  /** Optionally you can send a response in the conversation when it is assigned. */
  body?: string;
};

/** Payload of the request to assign a conversation */
export type AttachContactToConversationRequest = {
  /** The `id` of the admin who is adding the new participant. */
  admin_id?: string;
  customer?: { intercom_user_id: string; customer?: CustomerRequest } | { user_id: string; customer?: CustomerRequest } | { email: string; customer?: CustomerRequest };
};

/** Represents a branding configuration for the workspace */
export type Brand = {
  /** The type of object */
  type?: string;
  /** Unique brand identifier. For default brand, matches the workspace ID */
  id?: string;
  /** Display name of the brand */
  name?: string;
  /** Whether this is the workspace's default brand */
  is_default?: boolean;
  /** Unix timestamp of brand creation */
  created_at?: number;
  /** Unix timestamp of last modification */
  updated_at?: number;
  /** Associated help center identifier */
  help_center_id?: string;
  /** Default email settings ID for this brand */
  default_address_settings_id?: string;
};

/** A list of brands */
export type BrandList = {
  /** The type of object */
  type?: string;
  data?: (Brand)[];
};

export type AwayStatusReason = {
  type?: string;
  /** The unique identifier for the away status reason */
  id?: string;
  /** The display text for the away status reason */
  label?: string;
  /** The emoji associated with the status reason */
  emoji?: string;
  /** The display order of the status reason */
  order?: number;
  /** Whether the status reason has been soft deleted */
  deleted?: boolean;
  /** The Unix timestamp when the status reason was created */
  created_at?: number;
  /** The Unix timestamp when the status reason was last updated */
  updated_at?: number;
};

/** Payload of the request to close a conversation */
export type CloseConversationRequest = {
  message_type: "close";
  type: "admin";
  /** The id of the admin who is performing the action. */
  admin_id: string;
  /** Optionally you can leave a message in the conversation to provide additional context to the user and other teammates. */
  body?: string;
};

/** Collections are top level containers for Articles within the Help Center. */
export type Collection = {
  /** The unique identifier for the collection which is given by Intercom. */
  id?: string;
  /** The id of the workspace which the collection belongs to. */
  workspace_id?: string;
  /** The name of the collection. For multilingual collections, this will be the name of the default language's content. */
  name?: string;
  /** The description of the collection. For multilingual help centers, this will be the description of the collection for the default language. */
  description?: string | null;
  /** The time when the article was created (seconds). For multilingual articles, this will be the timestamp of creation of the default language's content. */
  created_at?: number;
  /** The time when the article was last updated (seconds). For multilingual articles, this will be the timestamp of last update of the default language's content. */
  updated_at?: number;
  /** The URL of the collection. For multilingual help centers, this will be the URL of the collection for the default language. */
  url?: string | null;
  /** The icon of the collection. */
  icon?: string | null;
  /** The order of the section in relation to others sections within a collection. Values go from `0` upwards. `0` is the default if there's no order. */
  order?: number;
  /** The default locale of the help center. This field is only returned for multilingual help centers. */
  default_locale?: string;
  translated_content?: GroupTranslatedContent;
  /** The id of the parent collection. If `null` then it is the first level collection. */
  parent_id?: string | null;
  /** The id of the help center the collection is in. */
  help_center_id?: number | null;
};

/** This will return a list of Collections for the App. */
export type CollectionList = {
  /** The type of the object - `list`. */
  type?: "list";
  pages?: CursorPages;
  /** A count of the total number of collections. */
  total_count?: number;
  /** An array of collection objects */
  data?: (Collection)[];
};

/** Companies allow you to represent organizations using your product. Each company will have its own description and be associated with contacts. You can fetch, create, update and list companies. */
export type Company = {
  /** Value is `company` */
  type?: "company";
  /** The Intercom defined id representing the company. */
  id?: string;
  /** The name of the company. */
  name?: string;
  /** The Intercom defined code of the workspace the company is associated to. */
  app_id?: string;
  plan?: { type?: string; id?: string; name?: string };
  /** The company id you have defined for the company. */
  company_id?: string;
  /** The time the company was created by you. */
  remote_created_at?: number;
  /** The time the company was added in Intercom. */
  created_at?: number;
  /** The last time the company was updated. */
  updated_at?: number;
  /** The time the company last recorded making a request. */
  last_request_at?: number;
  /** The number of employees in the company. */
  size?: number;
  /** The URL for the company website. */
  website?: string;
  /** The industry that the company operates in. */
  industry?: string;
  /** How much revenue the company generates for your business. */
  monthly_spend?: number;
  /** How many sessions the company has recorded. */
  session_count?: number;
  /** The number of users in the company. */
  user_count?: number;
  /** The custom attributes you have set on the company. */
  custom_attributes?: { [key: string]: string | undefined };
  /** The list of tags associated with the company */
  tags?: { type?: "tag.list"; tags?: (TagBasic)[] };
  /** The list of segments associated with the company */
  segments?: { type?: "segment.list"; segments?: (Segment)[] };
};

/** A list of Contact Objects */
export type CompanyAttachedContacts = {
  /** The type of object - `list` */
  type?: "list";
  /** An array containing Contact Objects */
  data?: (Contact)[];
  /** The total number of contacts */
  total_count?: number;
  pages?: CursorPages;
};

/** A list of Segment Objects */
export type CompanyAttachedSegments = {
  /** The type of object - `list` */
  type?: "list";
  /** An array containing Segment Objects */
  data?: (Segment)[];
};

/** Notes allow you to annotate and comment on companies. */
export type CompanyNote = {
  /** String representing the object's type. Always has the value `note`. */
  type?: string;
  /** The id of the note. */
  id?: string;
  /** The time the note was created. */
  created_at?: number;
  /** Represents the company that the note was created about. */
  company?: { type?: string; id?: string } | null;
  /** Optional. Represents the Admin that created the note. */
  author?: Admin;
  /** The body text of the note. */
  body?: string;
};

/** This will return a list of companies for the App. */
export type CompanyList = {
  /** The type of object - `list`. */
  type?: "list";
  pages?: CursorPages;
  /** The total number of companies. */
  total_count?: number;
  /** An array containing Company Objects. */
  data?: (Company)[];
};

/** Companies allow you to represent organizations using your product. Each company will have its own description and be associated with contacts. You can fetch, create, update and list companies. */
export type CompanyScroll = {
  /** The type of object - `list` */
  type?: "list";
  data?: (Company)[];
  pages?: CursorPages;
  /** The total number of companies */
  total_count?: number | null;
  /** The scroll parameter to use in the next request to fetch the next page of results. */
  scroll_param?: string;
};

/** Contacts represent your leads and users in Intercom. */
export type Contact = {
  /** The type of object. */
  type?: string;
  /** The unique identifier for the contact which is given by Intercom. */
  id?: string;
  /** The unique identifier for the contact which is provided by the Client. */
  external_id?: string | null;
  /** The id of the workspace which the contact belongs to. */
  workspace_id?: string;
  /** The role of the contact. */
  role?: string;
  /** The contact's email. */
  email?: string;
  /** The contact's email domain. */
  email_domain?: string;
  /** The contacts phone. */
  phone?: string | null;
  /** The contacts name. */
  name?: string | null;
  /** The id of an admin that has been assigned account ownership of the contact. */
  owner_id?: number | null;
  /** Whether the contact has had an email sent to them hard bounce. */
  has_hard_bounced?: boolean;
  /** Whether the contact has marked an email sent to them as spam. */
  marked_email_as_spam?: boolean;
  /** Whether the contact is unsubscribed from emails. */
  unsubscribed_from_emails?: boolean;
  /** (Unix timestamp in seconds) The time when the contact was created. */
  created_at?: number;
  /** (Unix timestamp in seconds) The time when the contact was last updated. */
  updated_at?: number;
  /** (Unix timestamp in seconds) The time specified for when a contact signed up. */
  signed_up_at?: number | null;
  /** (Unix timestamp in seconds) The time when the contact was last seen (either where the Intercom Messenger was installed or when specified manually). */
  last_seen_at?: number | null;
  /** (Unix timestamp in seconds) The time when the contact last messaged in. */
  last_replied_at?: number | null;
  /** (Unix timestamp in seconds) The time when the contact was last messaged. */
  last_contacted_at?: number | null;
  /** (Unix timestamp in seconds) The time when the contact last opened an email. */
  last_email_opened_at?: number | null;
  /** (Unix timestamp in seconds) The time when the contact last clicked a link in an email. */
  last_email_clicked_at?: number | null;
  /** A preferred language setting for the contact, used by the Intercom Messenger even if their browser settings change. */
  language_override?: string | null;
  /** The name of the browser which the contact is using. */
  browser?: string | null;
  /** The version of the browser which the contact is using. */
  browser_version?: string | null;
  /** The language set by the browser which the contact is using. */
  browser_language?: string | null;
  /** The operating system which the contact is using. */
  os?: string | null;
  /** The name of the Android app which the contact is using. */
  android_app_name?: string | null;
  /** The version of the Android app which the contact is using. */
  android_app_version?: string | null;
  /** The Android device which the contact is using. */
  android_device?: string | null;
  /** The version of the Android OS which the contact is using. */
  android_os_version?: string | null;
  /** The version of the Android SDK which the contact is using. */
  android_sdk_version?: string | null;
  /** (Unix timestamp in seconds) The time when the contact was last seen on an Android device. */
  android_last_seen_at?: number | null;
  /** The name of the iOS app which the contact is using. */
  ios_app_name?: string | null;
  /** The version of the iOS app which the contact is using. */
  ios_app_version?: string | null;
  /** The iOS device which the contact is using. */
  ios_device?: string | null;
  /** The version of iOS which the contact is using. */
  ios_os_version?: string | null;
  /** The version of the iOS SDK which the contact is using. */
  ios_sdk_version?: string | null;
  /** (Unix timestamp in seconds) The last time the contact used the iOS app. */
  ios_last_seen_at?: number | null;
  /** The custom attributes which are set for the contact. */
  custom_attributes?: { [key: string]: unknown };
  avatar?: { type?: string; image_url?: string | null } | null;
  tags?: ContactTags;
  notes?: ContactNotes;
  companies?: ContactCompanies;
  location?: ContactLocation;
  social_profiles?: ContactSocialProfiles;
};

/** A list of Company Objects */
export type ContactAttachedCompanies = {
  /** The type of object */
  type?: "list";
  /** An array containing Company Objects */
  companies?: (Company)[];
  /** The total number of companies associated to this contact */
  total_count?: number;
  pages?: PagesLink;
};

/** An object with metadata about companies attached to a contact . Up to 10 will be displayed here. Use the url to get more. */
export type ContactCompanies = {
  /** An array of company data objects attached to the contact. */
  data?: (CompanyData)[];
  /** Url to get more company resources for this contact */
  url?: string;
  /** Integer representing the total number of companies attached to this contact */
  total_count?: number;
  /** Whether there's more Addressable Objects to be viewed. If true, use the url to view all */
  has_more?: boolean;
};

/** An object containing data about the companies that a contact is associated with. */
export type CompanyData = {
  /** The unique identifier for the company which is given by Intercom. */
  id?: string;
  /** The type of the object. Always company. */
  type?: "company";
  /** The relative URL of the company. */
  url?: string;
};

/** deleted contact object */
export type ContactDeleted = {
  /** Whether the contact is deleted or not. */
  deleted?: boolean;
};

/** Contacts are your users in Intercom. */
export type ContactList = {
  /** Always list */
  type?: "list";
  /** The list of contact objects */
  data?: (Contact)[];
  /** A count of the total number of objects. */
  total_count?: number;
  pages?: CursorPages;
};

/** An object containing location meta data about a Intercom contact. */
export type ContactLocation = {
  /** Always location */
  type?: string | null;
  /** The country that the contact is located in */
  country?: string | null;
  /** The overal region that the contact is located in */
  region?: string | null;
  /** The city that the contact is located in */
  city?: string | null;
};

/** An object containing notes meta data about the notes that a contact has. Up to 10 will be displayed here. Use the url to get more. */
export type ContactNotes = {
  /** This object represents the notes attached to a contact. */
  data?: (AddressableList)[];
  /** Url to get more company resources for this contact */
  url?: string;
  /** Int representing the total number of companyies attached to this contact */
  total_count?: number;
  /** Whether there's more Addressable Objects to be viewed. If true, use the url to view all */
  has_more?: boolean;
};

/** reference to contact object */
export type ContactReference = {
  /** always contact */
  type?: "contact";
  /** The unique identifier for the contact which is given by Intercom. */
  id?: string;
  /** The unique identifier for the contact which is provided by the Client. */
  external_id?: string | null;
};

export type ContactReplyBaseRequest = {
  message_type: "comment";
  type: "user";
  /** The text body of the comment. */
  body: string;
  /** The time the reply was created. If not provided, the current time will be used. */
  created_at?: number;
  /** A list of image URLs that will be added as attachments. You can include up to 10 URLs. */
  attachment_urls?: (string)[];
  /** The quick reply selection the contact wishes to respond with. These map to buttons displayed in the Messenger UI if sent by a bot, or the reply options sent by an Admin via the API. */
  reply_options?: ({ text: string; uuid: string })[];
};

export type ContactReplyConversationRequest = ContactReplyIntercomUserIdRequest | ContactReplyEmailRequest | ContactReplyUserIdRequest;

/** Payload of the request to reply on behalf of a contact using their `email` */
export type ContactReplyEmailRequest = {
  /** The email you have defined for the user. */
  email: string;
  /** A list of files that will be added as attachments. */
  attachment_files?: (ConversationAttachmentFiles)[];
};

/** Payload of the request to reply on behalf of a contact using their `intercom_user_id` */
export type ContactReplyIntercomUserIdRequest = {
  /** The identifier for the contact as given by Intercom. */
  intercom_user_id: string;
  /** A list of files that will be added as attachments. */
  attachment_files?: (ConversationAttachmentFiles)[];
};

/** Payload of the request to reply on behalf of a contact using their `email` */
export type ContactReplyTicketEmailRequest = {
  /** The email you have defined for the user. */
  email: string;
};

/** Payload of the request to reply on behalf of a contact using their `intercom_user_id` */
export type ContactReplyTicketIntercomUserIdRequest = {
  /** The identifier for the contact as given by Intercom. */
  intercom_user_id: string;
};

export type ContactReplyTicketRequest = ContactReplyTicketIntercomUserIdRequest | ContactReplyTicketUserIdRequest | ContactReplyTicketEmailRequest;

/** Payload of the request to reply on behalf of a contact using their `user_id` */
export type ContactReplyTicketUserIdRequest = {
  /** The external_id you have defined for the contact. */
  user_id: string;
};

/** Payload of the request to reply on behalf of a contact using their `user_id` */
export type ContactReplyUserIdRequest = {
  /** The external_id you have defined for the contact. */
  user_id: string;
  /** A list of files that will be added as attachments. You can include up to 10 files. */
  attachment_files?: (ConversationAttachmentFiles)[];
};

/** A list of segments objects attached to a specific contact. */
export type ContactSegments = {
  /** The type of the object */
  type?: "list";
  /** Segment objects associated with the contact. */
  data?: (Segment)[];
};

/** An object containing social profiles that a contact has. */
export type ContactSocialProfiles = {
  /** A list of social profiles objects associated with the contact. */
  data?: (SocialProfile)[];
};

/** An object containing Subscription Types meta data about the SubscriptionTypes that a contact has. */
export type ContactSubscriptionTypes = {
  /** This object represents the subscriptions attached to a contact. */
  data?: (AddressableList)[];
  /** Url to get more subscription type resources for this contact */
  url?: string;
  /** Int representing the total number of subscription types attached to this contact */
  total_count?: number;
  /** Whether there's more Addressable Objects to be viewed. If true, use the url to view all */
  has_more?: boolean;
};

/** An object containing tags meta data about the tags that a contact has. Up to 10 will be displayed here. Use the url to get more. */
export type ContactTags = {
  /** This object represents the tags attached to a contact. */
  data?: (AddressableList)[];
  /** url to get more tag resources for this contact */
  url?: string;
  /** Int representing the total number of tags attached to this contact */
  total_count?: number;
  /** Whether there's more Addressable Objects to be viewed. If true, use the url to view all */
  has_more?: boolean;
};

/** archived contact object */
export type ContactArchived = {
  /** Whether the contact is archived or not. */
  archived?: boolean;
};

/** unarchived contact object */
export type ContactUnarchived = {
  /** Whether the contact is archived or not. */
  archived?: boolean;
};

/** blocked contact object */
export type ContactBlocked = {
  /** Always true. */
  blocked?: boolean;
};

/** An external source for External Pages that you add to your Fin Content Library. */
export type ContentImportSource = {
  /** Always external_page */
  type: "content_import_source";
  /** The unique identifier for the content import source which is given by Intercom. */
  id: number;
  /** The time when the content import source was last synced. */
  last_synced_at: number;
  /** If you intend to create or update External Pages via the API, this should be set to `api`. */
  sync_behavior: "api" | "automatic" | "manual";
  /** The status of the content import source. */
  status: "active" | "deactivated";
  /** The URL of the root of the external source. */
  url: string;
  /** The time when the content import source was created. */
  created_at: number;
  /** The time when the content import source was last updated. */
  updated_at: number;
};

/** This will return a list of the content import sources for the App. */
export type ContentImportSourcesList = {
  /** The type of the object - `list`. */
  type?: "list";
  pages?: PagesLink;
  /** A count of the total number of content import sources. */
  total_count?: number;
  /** An array of Content Import Source objects */
  data?: (ContentImportSource)[];
};

/** The content source used by AI Agent in the conversation. */
export type ContentSource = {
  /** The type of the content source. */
  content_type?: "file" | "article" | "external_content" | "content_snippet" | "workflow_connector_action";
  /** The internal URL linking to the content source for teammates. */
  url?: string;
  /** The title of the content source. */
  title?: string;
  /** The ISO 639 language code of the content source. */
  locale?: string;
};

export type ContentSourcesList = {
  type?: "content_source.list";
  /** The total number of content sources used by AI Agent in the conversation. */
  total_count?: number;
  /** The content sources used by AI Agent in the conversation. */
  content_sources?: (ContentSource)[];
};

/** The data returned about your conversations when you list or search them. */
export type ConversationListItem = {
  /** Always conversation. */
  type?: string;
  /** The id representing the conversation. */
  id?: string;
  /** The title given to the conversation. */
  title?: string | null;
  /** The time the conversation was created. */
  created_at?: number;
  /** The last time the conversation was updated. */
  updated_at?: number;
  /** The last time a Contact responded to an Admin. In other words, the time a customer started waiting for a response. Set to null if last reply is from an Admin. */
  waiting_since?: number | null;
  /** If set this is the time in the future when this conversation will be marked as open. i.e. it will be in a snoozed state until this time. i.e. it will be in a snoozed state until this time. */
  snoozed_until?: number | null;
  /** Indicates whether a conversation is open (true) or closed (false). */
  open?: boolean;
  /** Can be set to "open", "closed" or "snoozed". */
  state?: "open" | "closed" | "snoozed";
  /** Indicates whether a conversation has been read. */
  read?: boolean;
  /** If marked as priority, it will return priority or else not_priority. */
  priority?: "priority" | "not_priority";
  /** The id of the admin assigned to the conversation. If it's not assigned to an admin it will return null. */
  admin_assignee_id?: number | null;
  /** The id of the team assigned to the conversation. If it's not assigned to a team it will return null. */
  team_assignee_id?: number | null;
  /** The company associated with the conversation. */
  company?: Company;
  tags?: Tags;
  conversation_rating?: ConversationRating;
  source?: ConversationSource;
  contacts?: ConversationContacts;
  teammates?: ConversationTeammates;
  custom_attributes?: CustomAttributes;
  first_contact_reply?: ConversationFirstContactReply;
  sla_applied?: SlaApplied;
  statistics?: ConversationStatistics;
  linked_objects?: LinkedObjectList;
  /** Indicates whether the AI Agent participated in the conversation. */
  ai_agent_participated?: boolean;
  ai_agent?: AiAgent;
};

/** Conversations are how you can communicate with users in Intercom. They are created when a contact replies to an outbound message, or when one admin directly sends a message to a single contact. */
export type Conversation = {
  /** Always conversation. */
  type?: string;
  /** The id representing the conversation. */
  id?: string;
  /** The title given to the conversation. */
  title?: string | null;
  /** The time the conversation was created. */
  created_at?: number;
  /** The last time the conversation was updated. */
  updated_at?: number;
  /** The last time a Contact responded to an Admin. In other words, the time a customer started waiting for a response. Set to null if last reply is from an Admin. */
  waiting_since?: number | null;
  /** If set this is the time in the future when this conversation will be marked as open. i.e. it will be in a snoozed state until this time. i.e. it will be in a snoozed state until this time. */
  snoozed_until?: number | null;
  /** Indicates whether a conversation is open (true) or closed (false). */
  open?: boolean;
  /** Can be set to "open", "closed" or "snoozed". */
  state?: "open" | "closed" | "snoozed";
  /** Indicates whether a conversation has been read. */
  read?: boolean;
  /** If marked as priority, it will return priority or else not_priority. */
  priority?: "priority" | "not_priority";
  /** The id of the admin assigned to the conversation. If it's not assigned to an admin it will return null. */
  admin_assignee_id?: number | null;
  /** The id of the team assigned to the conversation. If it's not assigned to a team it will return null. */
  team_assignee_id?: number | null;
  /** The company associated with the conversation. */
  company?: Company;
  tags?: Tags;
  conversation_rating?: ConversationRating;
  source?: ConversationSource;
  contacts?: ConversationContacts;
  teammates?: ConversationTeammates;
  custom_attributes?: CustomAttributes;
  first_contact_reply?: ConversationFirstContactReply;
  sla_applied?: SlaApplied;
  statistics?: ConversationStatistics;
  conversation_parts?: ConversationParts;
  linked_objects?: LinkedObjectList;
  /** Indicates whether the AI Agent participated in the conversation. */
  ai_agent_participated?: boolean;
  ai_agent?: AiAgent;
};

/** Properties of the attachment files in a conversation part */
export type ConversationAttachmentFiles = {
  /** The content type of the file */
  content_type?: string;
  /** The base64 encoded file data. */
  data?: string;
  /** The name of the file. */
  name?: string;
};

/** The list of contacts (users or leads) involved in this conversation. This will only contain one customer unless more were added via the group conversation feature. */
export type ConversationContacts = {
  type?: "contact.list";
  /** The list of contacts (users or leads) involved in this conversation. This will only contain one customer unless more were added via the group conversation feature. */
  contacts?: (ContactReference)[];
};

/** deleted conversation object */
export type ConversationDeleted = {
  /** The unique identifier for the conversation. */
  id?: string;
  /** always conversation */
  object?: "conversation";
  /** Whether the conversation is deleted or not. */
  deleted?: boolean;
};

/** An object containing information on the first users message. For a contact initiated message this will represent the users original message. */
export type ConversationFirstContactReply = {
  created_at?: number;
  type?: string;
  url?: string | null;
};

/** Conversations are how you can communicate with users in Intercom. They are created when a contact replies to an outbound message, or when one admin directly sends a message to a single contact. */
export type ConversationList = {
  /** Always conversation.list */
  type?: "conversation.list";
  /** The list of conversation objects */
  conversations?: (ConversationListItem)[];
  /** A count of the total number of objects. */
  total_count?: number;
  pages?: CursorPages;
};

/** A Conversation Part represents a message in the conversation. */
export type ConversationPart = {
  /** Always conversation_part */
  type?: string;
  /** The id representing the conversation part. */
  id?: string;
  /** The type of conversation part. */
  part_type?: string;
  /** The message body, which may contain HTML. For Twitter, this will show a generic message regarding why the body is obscured. In webhook payloads for API version 2.15+, this field returns plain text. */
  body?: string | null;
  /** The time the conversation part was created. */
  created_at?: number;
  /** The last time the conversation part was updated. */
  updated_at?: number;
  /** The time the user was notified with the conversation part. */
  notified_at?: number;
  /** The id of the admin that was assigned the conversation by this conversation_part (null if there has been no change in assignment.) */
  assigned_to?: Reference;
  author?: ConversationPartAuthor;
  /** A list of attachments for the part. */
  attachments?: (PartAttachment)[];
  /** The external id of the conversation part */
  external_id?: string | null;
  /** Whether or not the conversation part has been redacted. */
  redacted?: boolean;
  email_message_metadata?: EmailMessageMetadata;
  metadata?: ConversationPartMetadata;
  /** Indicates the current state of conversation when the conversation part was created. */
  state?: "open" | "closed" | "snoozed";
  /** A list of tags objects associated with the conversation part. */
  tags?: (TagBasic)[] | null;
  event_details?: EventDetails;
  /** The app package code if this part was created via API. null if the part was not created via API. */
  app_package_code?: string | null;
};

/** The object who initiated the conversation, which can be a Contact, Admin or Team. Bots and campaigns send messages on behalf of Admins or Teams. For Twitter, this will be blank. */
export type ConversationPartAuthor = {
  /** The type of the author */
  type?: string;
  /** The id of the author */
  id?: string;
  /** The name of the author */
  name?: string | null;
  /** The email of the author */
  email?: string;
  /** If this conversation part was sent by the AI Agent */
  from_ai_agent?: boolean;
  /** If this conversation part body was generated by the AI Agent */
  is_ai_answer?: boolean;
};

/** A list of Conversation Part objects for each part message in the conversation. This is only returned when Retrieving a Conversation, and ignored when Listing all Conversations. There is a limit of 500 parts. */
export type ConversationParts = {
  type?: "conversation_part.list";
  /** A list of Conversation Part objects for each part message in the conversation. This is only returned when Retrieving a Conversation, and ignored when Listing all Conversations. There is a limit of 500 parts. */
  conversation_parts?: (ConversationPart)[];
  total_count?: number;
};

/** Metadata for a conversation part */
export type ConversationPartMetadata = {
  /** The quick reply options sent by the Admin or bot, presented in this conversation part. */
  quick_reply_options?: (QuickReplyOption)[];
  /** The unique identifier for the quick reply option that was clicked by the end user. */
  quick_reply_uuid?: string;
};

/** The Conversation Rating object which contains information on the rating and/or remark added by a Contact and the Admin assigned to the conversation. */
export type ConversationRating = {
  /** The rating, between 1 and 5, for the conversation. */
  rating?: number;
  /** An optional field to add a remark to correspond to the number rating */
  remark?: string;
  /** The time the rating was requested in the conversation being rated. */
  created_at?: number;
  /** The time the rating was last updated. */
  updated_at?: number;
  contact?: ContactReference;
  teammate?: Reference;
};

/** Details of first response time of assigned team in seconds. */
export type ConversationResponseTime = {
  /** Id of the assigned team. */
  team_id?: number;
  /** Name of the assigned Team, null if team does not exist, Unassigned if no team is assigned. */
  team_name?: string;
  /** First response time of assigned team in seconds. */
  response_time?: number;
};

/** The type of the conversation part that started this conversation. Can be Contact, Admin, Campaign, Automated or Operator initiated. */
export type ConversationSource = {
  /** This includes conversation, email, facebook, instagram, phone_call, phone_switch, push, sms, twitter and whatsapp. */
  type?: "conversation" | "email" | "facebook" | "instagram" | "phone_call" | "phone_switch" | "push" | "sms" | "twitter" | "whatsapp";
  /** The id representing the message. */
  id?: string;
  /** The conversation's initiation type. Possible values are customer_initiated, campaigns_initiated (legacy campaigns), operator_initiated (Custom bot), automated (Series and other outbounds with dynamic audience message) and admin_initiated (fixed audience message, ticket initiated by an admin, group email). */
  delivered_as?: string;
  /** Optional. The message subject. For Twitter, this will show a generic message regarding why the subject is obscured. In webhook payloads for API version 2.15+, this field returns plain text. */
  subject?: string;
  /** The message body, which may contain HTML. For Twitter, this will show a generic message regarding why the body is obscured. In webhook payloads for API version 2.15+, this field returns plain text. */
  body?: string;
  author?: ConversationPartAuthor;
  /** A list of attachments for the part. */
  attachments?: (PartAttachment)[];
  /** The URL where the conversation was started. For Twitter, Email, and Bots, this will be blank. */
  url?: string | null;
  /** Whether or not the source message has been redacted. Only applicable for contact initiated messages. */
  redacted?: boolean;
};

/** A Statistics object containing all information required for reporting, with timestamps and calculated metrics. */
export type ConversationStatistics = {
  type?: string;
  /** Duration until last assignment before first admin reply. In seconds. */
  time_to_assignment?: number;
  /** Duration until first admin reply. Subtracts out of business hours. In seconds. */
  time_to_admin_reply?: number;
  /** Duration until conversation was closed first time. Subtracts out of business hours. In seconds. */
  time_to_first_close?: number;
  /** Duration until conversation was closed last time. Subtracts out of business hours. In seconds. */
  time_to_last_close?: number;
  /** Median based on all admin replies after a contact reply. Subtracts out of business hours. In seconds. */
  median_time_to_reply?: number;
  /** Time of first text conversation part from a contact. */
  first_contact_reply_at?: number;
  /** Time of first assignment after first_contact_reply_at. */
  first_assignment_at?: number;
  /** Time of first admin reply after first_contact_reply_at. */
  first_admin_reply_at?: number;
  /** Time of first close after first_contact_reply_at. */
  first_close_at?: number;
  /** Time of last assignment after first_contact_reply_at. */
  last_assignment_at?: number;
  /** Time of first admin reply since most recent assignment. */
  last_assignment_admin_reply_at?: number;
  /** Time of the last conversation part from a contact. */
  last_contact_reply_at?: number;
  /** Time of the last conversation part from an admin. */
  last_admin_reply_at?: number;
  /** Time of the last conversation close. */
  last_close_at?: number;
  /** The last admin who closed the conversation. Returns a reference to an Admin object. */
  last_closed_by_id?: string;
  /** Number of reopens after first_contact_reply_at. */
  count_reopens?: number;
  /** Number of assignments after first_contact_reply_at. */
  count_assignments?: number;
  /** Total number of conversation parts. */
  count_conversation_parts?: number;
  /** An array of conversation response time objects */
  assigned_team_first_response_time?: (ConversationResponseTime)[];
  /** An array of conversation response time objects within office hours */
  assigned_team_first_response_time_in_office_hours?: (ConversationResponseTime)[];
  /** Time from conversation assignment to conversation close in seconds. */
  handling_time?: number;
  /** Adjusted handling time for conversation in seconds. This is the active handling time excluding idle periods when teammates are not actively working on the conversation. */
  adjusted_handling_time?: number | null;
};

/** The list of teammates who participated in the conversation (wrote at least one conversation part). */
export type ConversationTeammates = {
  /** The type of the object - `admin.list`. */
  type?: string;
  /** The list of teammates who participated in the conversation (wrote at least one conversation part). */
  teammates?: (Reference)[];
};

/** You can convert a Conversation to a Ticket */
export type ConvertConversationToTicketRequest = {
  /** The ID of the type of ticket you want to convert the conversation to */
  ticket_type_id: string;
  attributes?: TicketRequestCustomAttributes;
};

/** You can merge a Visitor to a Contact of role type lead or user. */
export type ConvertVisitorRequest = {
  /** Represents the role of the Contact model. Accepts `lead` or `user`. */
  type: string;
  /** The unique identifiers retained after converting or merging. */
  user: unknown | unknown;
  /** The unique identifiers to convert a single Visitor. */
  visitor: unknown | unknown | unknown;
};

/** You can create an Article */
export type CreateArticleRequest = {
  /** The title of the article.For multilingual articles, this will be the title of the default language's content. */
  title: string;
  /** The description of the article. For multilingual articles, this will be the description of the default language's content. */
  description?: string;
  /** The content of the article. For multilingual articles, this will be the body of the default language's content. */
  body?: string;
  /** The id of the author of the article. For multilingual articles, this will be the id of the author of the default language's content. Must be a teammate on the help center's workspace. */
  author_id: number;
  /** Whether the article will be `published` or will be a `draft`. Defaults to draft. For multilingual articles, this will be the state of the default language's content. */
  state?: "published" | "draft";
  /** The id of the article's parent collection or section. An article without this field stands alone. */
  parent_id?: number;
  /** The type of parent, which can either be a `collection` or `section`. */
  parent_type?: string;
  translated_content?: ArticleTranslatedContent;
};

/** You can create an Internal Article */
export type CreateInternalArticleRequest = {
  /** The title of the article. */
  title: string;
  /** The content of the article. */
  body?: string;
  /** The id of the author of the article. */
  author_id: number;
  /** The id of the owner of the article. */
  owner_id: number;
};

/** You can create a collection */
export type CreateCollectionRequest = {
  /** The name of the collection. For multilingual collections, this will be the name of the default language's content. */
  name: string;
  /** The description of the collection. For multilingual collections, this will be the description of the default language's content. */
  description?: string;
  translated_content?: GroupTranslatedContent;
  /** The id of the parent collection. If `null` then it will be created as the first level collection. */
  parent_id?: string | null;
  /** The id of the help center where the collection will be created. If `null` then it will be created in the default help center. */
  help_center_id?: number | null;
};

/** Payload to create a contact */
export type CreateContactRequest = {
  /** The role of the contact. */
  role?: string;
  /** A unique identifier for the contact which is given to Intercom */
  external_id?: string;
  /** The contacts email */
  email?: string;
  /** The contacts phone */
  phone?: string | null;
  /** The contacts name */
  name?: string | null;
  /** An image URL containing the avatar of a contact */
  avatar?: string | null;
  /** (Unix timestamp in seconds) The time specified for when a contact signed up. */
  signed_up_at?: number | null;
  /** (Unix timestamp in seconds) The time when the contact was last seen (either where the Intercom Messenger was installed or when specified manually). */
  last_seen_at?: number | null;
  /** The id of an admin that has been assigned account ownership of the contact */
  owner_id?: number | null;
  /** Whether the contact is unsubscribed from emails */
  unsubscribed_from_emails?: boolean | null;
  /** The custom attributes which are set for the contact */
  custom_attributes?: { [key: string]: unknown } | null;
};

/** You can add an Content Import Source to your Fin Content Library. */
export type CreateContentImportSourceRequest = {
  /** If you intend to create or update External Pages via the API, this should be set to `api`. */
  sync_behavior: "api";
  /** The status of the content import source. */
  status?: "active" | "deactivated";
  /** The URL of the content import source. */
  url: string;
};

/** Conversations are how you can communicate with users in Intercom. They are created when a contact replies to an outbound message, or when one admin directly sends a message to a single contact. */
export type CreateConversationRequest = {
  from: { type: "lead" | "user" | "contact"; id: string };
  /** The content of the message. HTML is not supported. */
  body: string;
  /** The title of the email. Only applicable if the message type is email. */
  subject?: string;
  /** A list of image URLs that will be added as attachments. You can include up to 10 URLs. */
  attachment_urls?: (string)[];
  /** The time the conversation was created as a UTC Unix timestamp. If not provided, the current time will be used. This field is only recommneded for migrating past conversations from another source into Intercom. */
  created_at?: number;
};

export type CreateDataAttributeRequest = {
  /** The name of the data attribute. */
  name: string;
  /** The model that the data attribute belongs to. */
  model: "contact" | "company";
  /** The readable description you see in the UI for the attribute. */
  description?: string;
  /** Can this attribute be updated by the Messenger */
  messenger_writable?: boolean;
};

export type CreateDataEventRequest = {
  /** The name of the event that occurred. This is presented to your App's admins when filtering and creating segments - a good event name is typically a past tense 'verb-noun' combination, to improve readability, for example `updated-plan`. */
  event_name?: string;
  /** The time the event occurred as a UTC Unix timestamp */
  created_at?: number;
  /** Your identifier for the user. */
  user_id?: string;
  /** The unique identifier for the contact (lead or user) which is given by Intercom. */
  id?: string;
  /** An email address for your user. An email should only be used where your application uses email to uniquely identify users. */
  email?: string;
  /** Optional metadata about the event. */
  metadata?: { [key: string]: string | undefined };
};

/** You can send a list of event summaries for a user. Each event summary should contain the event name, the time the event occurred, and the number of times the event occurred. The event name should be a past tense "verb-noun" combination, to improve readability, for example `updated-plan`. */
export type CreateDataEventSummariesRequest = {
  /** Your identifier for the user. */
  user_id?: string;
  /** A list of event summaries for the user. Each event summary should contain the event name, the time the event occurred, and the number of times the event occurred. The event name should be a past tense 'verb-noun' combination, to improve readability, for example `updated-plan`. */
  event_summaries?: { event_name?: string; count?: number; first?: number; last?: number };
};

/** Request for creating a data export */
export type CreateDataExportsRequest = {
  /** The start date that you request data for. It must be formatted as a unix timestamp. */
  created_at_after: number;
  /** The end date that you request data for. It must be formatted as a unix timestamp. */
  created_at_before: number;
};

/** You can add an External Page to your Fin Content Library. */
export type CreateExternalPageRequest = {
  /** The title of the external page. */
  title: string;
  /** The body of the external page in HTML. */
  html: string;
  /** The URL of the external page. This will be used by Fin to link end users to the page it based its answer on. When a URL is not present, Fin will not reference the source. */
  url?: string;
  /** Whether the external page should be used to answer questions by AI Agent. Will not default when updating an existing external page. */
  ai_agent_availability?: boolean;
  /** Whether the external page should be used to answer questions by AI Copilot. Will not default when updating an existing external page. */
  ai_copilot_availability?: boolean;
  /** Always en */
  locale: "en";
  /** The unique identifier for the source of the external page which was given by Intercom. Every external page must be associated with a Content Import Source which represents the place it comes from and from which it inherits a default audience (configured in the UI). For a new source, make a POST request to the Content Import Source endpoint and an ID for the source will be returned in the response. */
  source_id: number;
  /** The identifier for the external page which was given by the source. Must be unique for the source. */
  external_id: string;
};

/** You can create a message */
export type CreateMessageRequest = {
  /** The kind of message being created. Values: `in_app` or `email`. */
  message_type?: "in_app" | "email";
  /** The title of the email. */
  subject?: string;
  /** The content of the message. HTML and plaintext are supported. */
  body?: string;
  /** The style of the outgoing message. Possible values `plain` or `personal`. */
  template?: string;
  /** The sender of the message. If not provided, the default sender will be used. */
  from?: { type: "admin"; id: number };
  to?: Recipient | (Recipient)[];
  cc?: Recipient | (Recipient)[];
  bcc?: Recipient | (Recipient)[];
  /** The time the message was created. If not provided, the current time will be used. */
  created_at?: number;
  /** Whether a conversation should be opened in the inbox for the message without the contact replying. Defaults to false if not provided. */
  create_conversation_without_contact_reply?: boolean;
};

/** A recipient of a message */
export type Recipient = {
  /** The role associated to the contact - `user` or `lead`. */
  type: "user" | "lead";
  /** The identifier for the contact which is given by Intercom. */
  id: string;
};

/** You can create or update a Company */
export type CreateOrUpdateCompanyRequest = {
  /** The name of the Company */
  name?: string;
  /** The company id you have defined for the company. Can't be updated */
  company_id?: string;
  /** The name of the plan you have associated with the company. */
  plan?: string;
  /** The number of employees in this company. */
  size?: number;
  /** The URL for this company's website. Please note that the value specified here is not validated. Accepts any string. */
  website?: string;
  /** The industry that this company operates in. */
  industry?: string;
  /** A hash of key/value pairs containing any other data about the company you want Intercom to store. */
  custom_attributes?: { [key: string]: string | undefined };
  /** The time the company was created by you. */
  remote_created_at?: number;
  /** How much revenue the company generates for your business. Note that this will truncate floats. i.e. it only allow for whole integers, 155.98 will be truncated to 155. Note that this has an upper limit of 2**31-1 or 2147483647.. */
  monthly_spend?: number;
};

/** You can update a Company */
export type UpdateCompanyRequest = {
  /** The name of the Company */
  name?: string;
  /** The name of the plan you have associated with the company. */
  plan?: string;
  /** The number of employees in this company. */
  size?: number;
  /** The URL for this company's website. Please note that the value specified here is not validated. Accepts any string. */
  website?: string;
  /** The industry that this company operates in. */
  industry?: string;
  /** A hash of key/value pairs containing any other data about the company you want Intercom to store. */
  custom_attributes?: { [key: string]: string | undefined };
  /** How much revenue the company generates for your business. Note that this will truncate floats. i.e. it only allow for whole integers, 155.98 will be truncated to 155. Note that this has an upper limit of 2**31-1 or 2147483647.. */
  monthly_spend?: number;
};

/** Payload to create or update a Custom Object instance */
export type CreateOrUpdateCustomObjectInstanceRequest = {
  /** A unique identifier for the Custom Object instance in the external system it originated from. */
  external_id?: string;
  /** The time when the Custom Object instance was created in the external system it originated from. */
  external_created_at?: number | null;
  /** The time when the Custom Object instance was last updated in the external system it originated from. */
  external_updated_at?: number | null;
  /** The custom attributes which are set for the Custom Object instance. */
  custom_attributes?: { [key: string]: string | undefined } | null;
};

/** You can create or update an existing tag. */
export type CreateOrUpdateTagRequest = {
  /** The name of the tag, which will be created if not found, or the new name for the tag if this is an update request. Names are case insensitive. */
  name: string;
  /** The id of tag to updates. */
  id?: string;
};

/** You can create an phone switch */
export type CreatePhoneSwitchRequest = {
  /** Phone number in E.164 format, that will receive the SMS to continue the conversation in the Messenger. */
  phone: string;
  custom_attributes?: CustomAttributes;
};

export type CreateTicketReplyWithCommentRequest = ContactReplyTicketRequest | AdminReplyTicketRequest;

/** You can create a Ticket */
export type CreateTicketRequest = {
  /** The ID of the type of ticket you want to create */
  ticket_type_id: string;
  /** The list of contacts (users or leads) affected by this ticket. Currently only one is allowed */
  contacts: ({ id: string } | { external_id: string } | { email: string })[];
  /** The ID of the conversation you want to link to the ticket. Here are the valid ways of linking two tickets:  - conversation | back-office ticket  - customer tickets | non-shared back-office ticket  - conversation | tracker ticket  - customer ticket | tracker ticket */
  conversation_to_link_id?: string;
  /** The ID of the company that the ticket is associated with. The unique identifier for the company which is given by Intercom */
  company_id?: string;
  /** The time the ticket was created. If not provided, the current time will be used. */
  created_at?: number;
  ticket_attributes?: TicketRequestCustomAttributes;
  assignment?: { admin_assignee_id?: string; team_assignee_id?: string };
};

/** You can create a Ticket Type Attribute */
export type CreateTicketTypeAttributeRequest = {
  /** The name of the ticket type attribute */
  name: string;
  /** The description of the attribute presented to the teammate or contact */
  description: string;
  /** The data type of the attribute */
  data_type: "string" | "list" | "integer" | "decimal" | "boolean" | "datetime" | "files";
  /** Whether the attribute is required to be filled in when teammates are creating the ticket in Inbox. */
  required_to_create?: boolean;
  /** Whether the attribute is required to be filled in when contacts are creating the ticket in Messenger. */
  required_to_create_for_contacts?: boolean;
  /** Whether the attribute is visible to teammates when creating a ticket in Inbox. */
  visible_on_create?: boolean;
  /** Whether the attribute is visible to contacts when creating a ticket in Messenger. */
  visible_to_contacts?: boolean;
  /** Whether the attribute allows multiple lines of text (only applicable to string attributes) */
  multiline?: boolean;
  /** A comma delimited list of items for the attribute value (only applicable to list attributes) */
  list_items?: string;
  /** Whether the attribute allows multiple files to be attached to it (only applicable to file attributes) */
  allow_multiple_values?: boolean;
};

/** The request payload for creating a ticket type.   You can copy the `icon` property for your ticket type from [Twemoji Cheatsheet](https://twemoji-cheatsheet.vercel.app/) */
export type CreateTicketTypeRequest = {
  /** The name of the ticket type. */
  name: string;
  /** The description of the ticket type. */
  description?: string;
  /** Category of the Ticket Type. */
  category?: "Customer" | "Back-office" | "Tracker";
  /** The icon of the ticket type. */
  icon?: string;
  /** Whether the tickets associated with this ticket type are intended for internal use only or will be shared with customers. This is currently a limited attribute. */
  is_internal?: boolean;
};

/** Cursor-based pagination is a technique used in the Intercom API to navigate through large amounts of data. A "cursor" or pointer is used to keep track of the current position in the result set, allowing the API to return the data in small chunks or "pages" as needed. */
export type CursorPages = {
  /** the type of object `pages`. */
  type?: "pages";
  /** The current page */
  page?: number;
  next?: StartingAfterPaging;
  /** Number of results per page */
  per_page?: number;
  /** Total number of pages */
  total_pages?: number;
};

/** Represents a phone call in Intercom */
export type Call = {
  /** String representing the object's type. Always has the value `call`. */
  type?: string;
  /** The id of the call. */
  id?: string;
  /** The id of the conversation associated with the call, if any. */
  conversation_id?: string | null;
  /** The id of the admin associated with the call, if any. */
  admin_id?: string | null;
  /** The id of the contact associated with the call, if any. */
  contact_id?: string | null;
  /** The current state of the call. */
  state?: string;
  initiated_at?: Datetime;
  answered_at?: Datetime;
  ended_at?: Datetime;
  created_at?: Datetime;
  updated_at?: Datetime;
  /** API URL to download or redirect to the call recording if available. */
  recording_url?: string | null;
  /** API URL to download or redirect to the call transcript if available. */
  transcription_url?: string | null;
  /** The type of call. */
  call_type?: string;
  /** The direction of the call. */
  direction?: string;
  /** The reason for the call end, if applicable. */
  ended_reason?: string | null;
  /** The phone number involved in the call, in E.164 format. */
  phone?: string | null;
  /** API URL to the AI Agent (Fin) call recording if available. */
  fin_recording_url?: string | null;
  /** API URL to the AI Agent (Fin) call transcript if available. */
  fin_transcription_url?: string | null;
};

/** A paginated list of calls. */
export type CallList = {
  /** String representing the object's type. Always has the value `list`. */
  type?: string;
  /** A list of calls. */
  data?: (Call)[];
  /** Total number of items available. */
  total_count?: number;
  pages?: CursorPages;
};

/** An object containing the different custom attributes associated to the conversation as key-value pairs. For relationship attributes the value will be a list of custom object instance models. System-defined attributes such as "CX Score rating" and "CX Score explanation" may also be included. */
export type CustomAttributes = { [key: string]: string | number | Datetime | CustomObjectInstanceList | undefined };

/** A Custom Object Instance represents an instance of a custom object type. This allows you to create and set custom attributes to store data about your customers that is not already captured by Intercom. The parent object includes recommended default attributes and you can add your own custom attributes. */
export type CustomObjectInstance = {
  /** The Intercom defined id representing the custom object instance. */
  id?: string;
  /** The id you have defined for the custom object instance. */
  external_id?: string;
  /** The time when the Custom Object instance was created in the external system it originated from. */
  external_created_at?: number | null;
  /** The time when the Custom Object instance was last updated in the external system it originated from. */
  external_updated_at?: number | null;
  /** The time the attribute was created as a UTC Unix timestamp */
  created_at?: number;
  /** The time the attribute was last updated as a UTC Unix timestamp */
  updated_at?: number;
  /** The identifier of the custom object type that defines the structure of the custom object instance. */
  type?: string;
  /** The custom attributes you have set on the custom object instance. */
  custom_attributes?: { [key: string]: string | undefined };
};

/** deleted custom object instance object */
export type CustomObjectInstanceDeleted = {
  /** The unique identifier of the Custom Object type that defines the structure of the Custom Object instance. */
  object?: string;
  /** The Intercom defined id representing the Custom Object instance. */
  id?: string;
  /** Whether the Custom Object instance is deleted or not. */
  deleted?: boolean;
};

/** The list of associated custom object instances for a given reference attribute on the parent object. */
export type CustomObjectInstanceList = {
  type?: string;
  /** The list of associated custom object instances for a given reference attribute on the parent object. */
  instances?: (CustomObjectInstance)[];
};

export type CustomerRequest = { intercom_user_id: string } | { user_id: string } | { email: string } | null;

/** Data Attributes are metadata used to describe your contact, company and conversation models. These include standard and custom attributes. By using the data attributes endpoint, you can get the global list of attributes for your workspace, as well as create and archive custom attributes. */
export type DataAttribute = {
  /** Value is `data_attribute`. */
  type?: "data_attribute";
  /** The unique identifier for the data attribute which is given by Intercom. Only available for custom attributes. */
  id?: number;
  /** Value is `contact` for user/lead attributes and `company` for company attributes. */
  model?: "contact" | "company";
  /** Name of the attribute. */
  name?: string;
  /** Full name of the attribute. Should match the name unless it's a nested attribute. We can split full_name on `.` to access nested user object values. */
  full_name?: string;
  /** Readable name of the attribute (i.e. name you see in the UI) */
  label?: string;
  /** Readable description of the attribute. */
  description?: string;
  /** The data type of the attribute. */
  data_type?: "string" | "integer" | "float" | "boolean" | "date";
  /** List of predefined options for attribute value. */
  options?: (string)[];
  /** Can this attribute be updated through API */
  api_writable?: boolean;
  /** Can this attribute be updated by the Messenger */
  messenger_writable?: boolean;
  /** Can this attribute be updated in the UI */
  ui_writable?: boolean;
  /** Set to true if this is a CDA */
  custom?: boolean;
  /** Is this attribute archived. (Only applicable to CDAs) */
  archived?: boolean;
  /** The time the attribute was created as a UTC Unix timestamp */
  created_at?: number;
  /** The time the attribute was last updated as a UTC Unix timestamp */
  updated_at?: number;
  /** Teammate who created the attribute. Only applicable to CDAs */
  admin_id?: string;
};

/** A list of all data attributes belonging to a workspace for contacts, companies or conversations. */
export type DataAttributeList = {
  /** The type of the object */
  type?: "list";
  /** A list of data attributes */
  data?: (DataAttribute)[];
};

/** Data events are used to notify Intercom of changes to your data. */
export type DataEvent = {
  /** The type of the object */
  type?: "event";
  /** The name of the event that occurred. This is presented to your App's admins when filtering and creating segments - a good event name is typically a past tense 'verb-noun' combination, to improve readability, for example `updated-plan`. */
  event_name: string;
  /** The time the event occurred as a UTC Unix timestamp */
  created_at: number;
  /** Your identifier for the user. */
  user_id?: string;
  /** Your identifier for a lead or a user. */
  id?: string;
  /** The Intercom identifier for the user. */
  intercom_user_id?: string;
  /** An email address for your user. An email should only be used where your application uses email to uniquely identify users. */
  email?: string;
  /** Optional metadata about the event. */
  metadata?: { [key: string]: string | undefined };
};

/** This will return a list of data events for the App. */
export type DataEventList = {
  /** The type of the object */
  type?: "event.list";
  /** A list of data events */
  events?: (DataEvent)[];
  /** Pagination */
  pages?: { next?: string; since?: string };
};

/** This will return a summary of data events for the App. */
export type DataEventSummary = {
  /** The type of the object */
  type?: "event.summary";
  /** The email address of the user */
  email?: string;
  /** The Intercom user ID of the user */
  intercom_user_id?: string;
  /** The user ID of the user */
  user_id?: string;
  /** A summary of data events */
  events?: (DataEventSummaryItem)[];
};

/** This will return a summary of a data event for the App. */
export type DataEventSummaryItem = {
  /** The name of the event */
  name?: string;
  /** The first time the event was sent */
  first?: string;
  /** The last time the event was sent */
  last?: string;
  /** The number of times the event was sent */
  count?: number;
  /** The description of the event */
  description?: string;
};

/** The data export API is used to export message delivery and engagement statistics for outbound content (Emails, Posts, Custom Bots, Surveys, Tours, Series, and more) sent in a given timeframe. The exported data includes who received each message, when they received it, and how they engaged with it (opens, clicks, replies, completions, dismissals, unsubscribes, and bounces). */
export type DataExport = {
  /** The identifier for your job. */
  job_identifier?: string;
  /** The current state of your job. */
  status?: "pending" | "in_progress" | "failed" | "completed" | "no_data" | "canceled";
  /** The time after which you will not be able to access the data. */
  download_expires_at?: string;
  /** The location where you can download your data. */
  download_url?: string;
};

/** A CSV output file */
export type DataExportCsv = {
  /** The user_id of the user who was sent the message. */
  user_id?: string;
  /** The external_user_id of the user who was sent the message */
  user_external_id?: string;
  /** The company ID of the user in relation to the message that was sent. Will return -1 if no company is present. */
  company_id?: string;
  /** The users email who was sent the message. */
  email?: string;
  /** The full name of the user receiving the message */
  name?: string;
  /** The id of the message. */
  ruleset_id?: string;
  /** The specific content that was received. In an A/B test each version has its own Content ID. */
  content_id?: string;
  /** Email, Chat, Post etc. */
  content_type?: string;
  /** The title of the content you see in your Intercom workspace. */
  content_title?: string;
  /** As you edit content we record new versions. This ID can help you determine which version of a piece of content that was received. */
  ruleset_version_id?: string;
  /** ID for this receipt. Will be included with any related stats in other files to identify this specific delivery of a message. */
  receipt_id?: string;
  /** Timestamp for when the receipt was recorded. */
  received_at?: number;
  /** The id of the series that this content is part of. Will return -1 if not part of a series. */
  series_id?: string;
  /** The title of the series that this content is part of. */
  series_title?: string;
  /** The id of the series node that this ruleset is associated with. Each block in a series has a corresponding node_id. */
  node_id?: string;
  /** The first time a user replied to this message if the content was able to receive replies. */
  first_reply?: number;
  /** The first time a user completed this message if the content was able to be completed e.g. Tours, Surveys. */
  first_completion?: number;
  /** The first time the series this message was a part of was completed by the user. */
  first_series_completion?: number;
  /** The first time the series this message was a part of was disengaged by the user. */
  first_series_disengagement?: number;
  /** The first time the series this message was a part of was exited by the user. */
  first_series_exit?: number;
  /** The first time the user met this messages associated goal if one exists. */
  first_goal_success?: number;
  /** The first time the user opened this message. */
  first_open?: number;
  /** The first time the series the user clicked on a link within this message. */
  first_click?: number;
  /** The first time the series the user dismissed this message. */
  first_dismisall?: number;
  /** The first time the user unsubscribed from this message. */
  first_unsubscribe?: number;
  /** The first time this message hard bounced for this user */
  first_hard_bounce?: number;
};

/** Response returned when an object is deleted */
export type DeletedArticleObject = {
  /** The unique identifier for the article which you provided in the URL. */
  id?: string;
  /** The type of object which was deleted. - article */
  object?: "article";
  /** Whether the article was deleted successfully or not. */
  deleted?: boolean;
};

/** Response returned when an object is deleted */
export type DeletedInternalArticleObject = {
  /** The unique identifier for the internal article which you provided in the URL. */
  id?: string;
  /** The type of object which was deleted. - internal_article */
  object?: "internal_article";
  /** Whether the internal article was deleted successfully or not. */
  deleted?: boolean;
};

/** Response returned when an object is deleted */
export type DeletedCollectionObject = {
  /** The unique identifier for the collection which you provided in the URL. */
  id?: string;
  /** The type of object which was deleted. - `collection` */
  object?: "collection";
  /** Whether the collection was deleted successfully or not. */
  deleted?: boolean;
};

/** Response returned when an object is deleted */
export type DeletedCompanyObject = {
  /** The unique identifier for the company which is given by Intercom. */
  id?: string;
  /** The type of object which was deleted. - `company` */
  object?: "company";
  /** Whether the company was deleted successfully or not. */
  deleted?: boolean;
};

/** Response returned when an object is deleted */
export type DeletedObject = {
  /** The unique identifier for the news item which you provided in the URL. */
  id?: string;
  /** The type of object which was deleted - news-item. */
  object?: "news-item";
  /** Whether the news item was deleted successfully or not. */
  deleted?: boolean;
};

export type DetachContactFromConversationRequest = {
  /** The `id` of the admin who is performing the action. */
  admin_id: string;
};

/** Contains data for an email address header for a conversation part that was sent as an email. */
export type EmailAddressHeader = {
  /** The type of email address header */
  type?: string;
  /** The email address */
  email_address?: string;
  /** The name associated with the email address */
  name?: string | null;
};

/** Contains metadata if the message was sent as an email */
export type EmailMessageMetadata = {
  /** The subject of the email */
  subject?: string;
  /** A list of an email address headers. */
  email_address_headers?: (EmailAddressHeader)[];
  /** The unique identifier for the email message as specified in the Message-ID header */
  message_id?: string | null;
};

/** Represents a sender email address configuration */
export type EmailSetting = {
  /** The type of object */
  type?: string;
  /** Unique email setting identifier */
  id?: string;
  /** Full sender email address */
  email?: string;
  /** Whether the email address has been verified */
  verified?: boolean;
  /** Domain portion of the email address */
  domain?: string;
  /** Associated brand identifier */
  brand_id?: string;
  /** Whether email forwarding is active */
  forwarding_enabled?: boolean;
  /** Unix timestamp of last forwarded email received (null if never) */
  forwarded_email_last_received_at?: number | null;
  /** Unix timestamp of creation */
  created_at?: number;
  /** Unix timestamp of last modification */
  updated_at?: number;
};

/** A list of email settings */
export type EmailList = {
  /** The type of object */
  type?: string;
  data?: (EmailSetting)[];
};

export type Metadata = ConversationPartMetadata;

/** Contains details about the workflow that was triggered and any Custom Data Attributes (CDAs) that were modified during the workflow execution for conversation part type <code>conversation_attribute_updated_by_workflow</code>. */
export type ConversationAttributeUpdatedByWorkflow = {
  workflow?: { name?: string };
  attribute?: { name?: string };
  value?: { name?: string };
};

/** Contains details about Custom Data Attributes (CDAs) that were modified by an admin (operator) for conversation part type <code>conversation_attribute_updated_by_admin</code>. */
export type ConversationAttributeUpdatedByAdmin = {
  attribute?: { name?: string };
  value?: { name?: string; previous?: string | null };
};

/** Contains details about Custom Data Attributes (CDAs) that were modified by a user for conversation part type <code>conversation_attribute_updated_by_user</code>. */
export type ConversationAttributeUpdatedByUser = {
  attribute?: { name?: string };
  value?: { name?: string; previous?: string | null };
};

/** Contains details about name of the action that was initiated for conversation part type <code>custom_action_started</code>. */
export type CustomActionStarted = {
  action?: { name?: string };
};

/** Contains details about final status of the completed action for conversation part type <code>custom_action_finished</code>. */
export type CustomActionFinished = {
  action?: { name?: string; result?: "success" | "failed" };
};

/** Contains details about name of the workflow for conversation part type <code>operator_workflow_event</code>. */
export type OperatorWorkflowEvent = {
  workflow?: { name?: string };
  event?: { type?: string; result?: string };
};

export type EventDetails = ConversationAttributeUpdatedByWorkflow | ConversationAttributeUpdatedByAdmin | ConversationAttributeUpdatedByUser | CustomActionStarted | CustomActionFinished | OperatorWorkflowEvent;

/** The API will return an Error List for a failed request, which will contain one or more Error objects. */
export type Error = {
  /** The type is error.list */
  type: string;
  request_id?: string | null;
  /** An array of one or more error objects */
  errors: ({ code: string; message?: string | null; field?: string | null })[];
};

/** External pages that you have added to your Fin Content Library. */
export type ExternalPage = {
  /** Always external_page */
  type: "external_page";
  /** The unique identifier for the external page which is given by Intercom. */
  id: string;
  /** The title of the external page. */
  title: string;
  /** The body of the external page in HTML. */
  html: string;
  /** The URL of the external page. This will be used by Fin to link end users to the page it based its answer on. */
  url?: string;
  /** Whether the external page should be used to answer questions by AI Agent. */
  ai_agent_availability: boolean;
  /** Whether the external page should be used to answer questions by AI Copilot. */
  ai_copilot_availability: boolean;
  /** Whether the external page should be used to answer questions by AI Sales Agent. */
  ai_sales_agent_availability?: boolean;
  /** Deprecated. Use ai_agent_availability and ai_copilot_availability instead. */
  fin_availability?: boolean;
  /** Always en */
  locale: "en";
  /** The unique identifier for the source of the external page which was given by Intercom. Every external page must be associated with a Content Import Source which represents the place it comes from and from which it inherits a default audience (configured in the UI). For a new source, make a POST request to the Content Import Source endpoint and an ID for the source will be returned in the response. */
  source_id: number;
  /** The identifier for the external page which was given by the source. Must be unique for the source. */
  external_id: string;
  /** The time when the external page was created. */
  created_at: number;
  /** The time when the external page was last updated. */
  updated_at: number;
  /** The time when the external page was last ingested. */
  last_ingested_at: number;
};

/** This will return a list of external pages for the App. */
export type ExternalPagesList = {
  /** The type of the object - `list`. */
  type?: "list";
  pages?: PagesLink;
  /** A count of the total number of external pages. */
  total_count?: number;
  /** An array of External Page objects */
  data?: (ExternalPage)[];
};

/** A message exchanged within a Fin Agent conversation. */
export type FinAgentMessage = {
  /** The author that created the message. */
  author: "user" | "agent" | "fin";
  /** The body of the message. Accepts both plain text and HTML format. When sending a message to Fin, this should contain the user's message. Fin's response will be returned as HTML.  */
  body: string;
  /** The timestamp when the message was created. Used to deduplicate messages sent within a 5 minute window. Ideally should include milliseconds for higher precision.  */
  timestamp: string;
  /** The timestamp when the message was created, with millisecond precision. Only present in webhook event responses (fin_replied).  */
  timestamp_ms?: string;
};

/** A user object representing the user in a Fin Agent conversation. */
export type FinAgentUser = {
  /** The ID of the user. This value will be used to uniquely identify the user during a conversation with Fin. Maps to the user_id field on the Intercom User object.  */
  id: string;
  /** The name of the user. */
  name?: string;
  /** The email of the user. */
  email?: string;
  /** A hash of attributes associated with the user. Attributes can be used by Fin to target content and responses. Limit to 10 attributes.  */
  attributes?: { [key: string]: unknown };
};

/** An attachment object representing a file or URL attachment included with a message. Attachments can be used to provide additional context to Fin. Maximum of 10 attachments per request. */
export type FinAgentAttachment = {
  /** The type of attachment. */
  type: "url" | "file";
  /** The URL of the attachment. Required when type is 'url'. Must be publicly accessible. */
  url?: string;
  /** The name of the file. Required when type is 'file'. */
  name?: string;
  /** The MIME type of the file. Required when type is 'file'. */
  content_type?: string;
  /** Base64-encoded file data. Required when type is 'file'. */
  data?: string;
};

/** Metadata about the conversation, including history and attributes. */
export type FinAgentConversationMetadata = {
  /** An array of previous messages in the conversation before Fin is initialized. This data provides context to Fin and helps generate a better answer. Limit to the last 10 messages.  */
  history?: (FinAgentMessage)[];
  /** A hash of attributes associated with the conversation. These attributes can be used by Fin to provide more contextual responses. Limit to 10 attributes.  */
  attributes?: { [key: string]: unknown };
};

/** Contains error details if any user or conversation attribute updates failed. */
export type FinAgentAttributeErrors = {
  /** User-related attribute errors. */
  user?: { attributes?: { [key: string]: string | undefined } };
  /** Conversation-related attribute errors. */
  conversation?: { attributes?: { [key: string]: string | undefined } };
};

/** Event fired when Fin's status changes during a conversation. Delivered via webhooks or SSE. Fin will report its status to the client via this event. */
export type FinAgentStatusUpdatedEvent = {
  /** The name of the event. */
  event_name: "fin_status_updated";
  /** The ID of the conversation. */
  conversation_id: string;
  /** The ID of the user. */
  user_id: string;
  /** Fin's current status. - escalated: The conversation has been escalated to a human - resolved: The user's query has been resolved - complete: Fin has completed its workflow  */
  status: "escalated" | "resolved" | "complete";
  /** Optional. A human-readable explanation of why the conversation was escalated. Only present when status is 'escalated'. Possible values include: - "Escalation requested by user" - "Escalation rule: {rule_name}" - "Escalation rule matched" - "Routed to team" - "Conversation finished without resolution"  */
  reason?: string;
  /** The timestamp the event was created at, with millisecond precision. */
  created_at_ms: string;
};

/** Event fired when Fin replies to a user. Delivered via webhooks or SSE. The content of the response will be contained in the message object. Fin's status will update to 'awaiting_user_reply'. */
export type FinAgentRepliedEvent = {
  /** The name of the event. */
  event_name: "fin_replied";
  /** The ID of the conversation. */
  conversation_id: string;
  /** The ID of the user. */
  user_id: string;
  /** Fin's answer to the user's query. */
  message: { id?: string; author: "fin"; body: string; timestamp_ms: string };
  /** Fin's current status (always 'awaiting_user_reply' for this event). */
  status: "awaiting_user_reply";
  /** Optional. Present when the reply was generated via streaming. Correlates this event with the fin_reply_chunk events that preceded it. Use this to know when to replace streamed chunk_text with the final message body.  */
  stream_id?: string;
  /** The timestamp the event was created at, with millisecond precision. */
  created_at_ms: string;
};

/** SSE-only event fired during streaming reply generation. Each chunk contains the full accumulated plain text of Fin's answer so far (cumulative, not a delta). Only delivered over SSE when streaming is enabled. Not available via webhooks. When the fin_replied event arrives with the same stream_id, replace streamed text with the final HTML body. */
export type FinAgentReplyChunkEvent = {
  /** The name of the event. */
  event_name: "fin_reply_chunk";
  /** The ID of the conversation. */
  conversation_id: string;
  /** A unique identifier for this streaming response. Correlates chunks with each other and with the eventual fin_replied event.  */
  stream_id: string;
  /** 0-based counter for this chunk within the stream. Contiguous.  */
  chunk_index: number;
  /** The full accumulated plain text of Fin's answer so far. Each chunk supersedes the previous — replace rather than append.  */
  chunk_text: string;
  /** Fin's current status (always 'replying' for this event). */
  status?: "replying";
  /** The timestamp the event was created at, with millisecond precision. */
  created_at_ms: string;
};

/** The value describing a file upload set for a custom attribute */
export type FileAttribute = {
  type?: string;
  /** The name of the file */
  name?: string;
  /** The url of the file. This is a temporary URL and will expire after 30 minutes. */
  url?: string;
  /** The type of file */
  content_type?: string;
  /** The size of the file in bytes */
  filesize?: number;
  /** The width of the file in pixels, if applicable */
  width?: number;
  /** The height of the file in pixels, if applicable */
  height?: number;
};

/** The Content of a Group. */
export type GroupContent = {
  /** The type of object - `group_content` . */
  type?: null | "group_content" | null;
  /** The name of the collection or section. */
  name?: string;
  /** The description of the collection. Only available for collections. */
  description?: string;
};

/** The Translated Content of an Group. The keys are the locale codes and the values are the translated content of the Group. */
export type GroupTranslatedContent = {
  /** The type of object - group_translated_content. */
  type?: null | "group_translated_content" | null;
  /** The content of the group in Arabic */
  ar?: GroupContent;
  /** The content of the group in Bulgarian */
  bg?: GroupContent;
  /** The content of the group in Bosnian */
  bs?: GroupContent;
  /** The content of the group in Catalan */
  ca?: GroupContent;
  /** The content of the group in Czech */
  cs?: GroupContent;
  /** The content of the group in Danish */
  da?: GroupContent;
  /** The content of the group in German */
  de?: GroupContent;
  /** The content of the group in Greek */
  el?: GroupContent;
  /** The content of the group in English */
  en?: GroupContent;
  /** The content of the group in Spanish */
  es?: GroupContent;
  /** The content of the group in Estonian */
  et?: GroupContent;
  /** The content of the group in Finnish */
  fi?: GroupContent;
  /** The content of the group in French */
  fr?: GroupContent;
  /** The content of the group in Hebrew */
  he?: GroupContent;
  /** The content of the group in Croatian */
  hr?: GroupContent;
  /** The content of the group in Hungarian */
  hu?: GroupContent;
  /** The content of the group in Indonesian */
  id?: GroupContent;
  /** The content of the group in Italian */
  it?: GroupContent;
  /** The content of the group in Japanese */
  ja?: GroupContent;
  /** The content of the group in Korean */
  ko?: GroupContent;
  /** The content of the group in Lithuanian */
  lt?: GroupContent;
  /** The content of the group in Latvian */
  lv?: GroupContent;
  /** The content of the group in Mongolian */
  mn?: GroupContent;
  /** The content of the group in Norwegian */
  nb?: GroupContent;
  /** The content of the group in Dutch */
  nl?: GroupContent;
  /** The content of the group in Polish */
  pl?: GroupContent;
  /** The content of the group in Portuguese (Portugal) */
  pt?: GroupContent;
  /** The content of the group in Romanian */
  ro?: GroupContent;
  /** The content of the group in Russian */
  ru?: GroupContent;
  /** The content of the group in Slovenian */
  sl?: GroupContent;
  /** The content of the group in Serbian */
  sr?: GroupContent;
  /** The content of the group in Swedish */
  sv?: GroupContent;
  /** The content of the group in Turkish */
  tr?: GroupContent;
  /** The content of the group in Vietnamese */
  vi?: GroupContent;
  /** The content of the group in Portuguese (Brazil) */
  "pt-BR"?: GroupContent;
  /** The content of the group in Chinese (China) */
  "zh-CN"?: GroupContent;
  /** The content of the group in Chinese (Taiwan) */
  "zh-TW"?: GroupContent;
};

/** Help Centers contain collections */
export type HelpCenter = {
  /** The unique identifier for the Help Center which is given by Intercom. */
  id?: string;
  /** The id of the workspace which the Help Center belongs to. */
  workspace_id?: string;
  /** The time when the Help Center was created. */
  created_at?: number;
  /** The time when the Help Center was last updated. */
  updated_at?: number;
  /** The identifier of the Help Center. This is used in the URL of the Help Center. */
  identifier?: string;
  /** Whether the Help Center is turned on or not. This is controlled in your Help Center settings. */
  website_turned_on?: boolean;
  /** The display name of the Help Center only seen by teammates. */
  display_name?: string;
  /** The URL for the help center, if you have a custom domain then this will show the URL using the custom domain. */
  url?: string;
  /** Custom domain configured for the help center */
  custom_domain?: string | null;
};

/** A list of Help Centers belonging to the App */
export type HelpCenterList = {
  /** The type of the object - `list`. */
  type?: "list";
  /** An array of Help Center objects */
  data?: (HelpCenter)[];
};

/** Jobs are tasks that are processed asynchronously by the Intercom system after being enqueued via the API. This allows for efficient handling of operations that may take time to complete, such as data imports or exports. You can check the status of your jobs to monitor their progress and ensure they are completed successfully. */
export type Jobs = {
  /** The type of the object */
  type?: "job";
  /** The id of the job that's currently being processed or has completed. */
  id: string;
  /** API endpoint URL to check the job status. */
  url?: string;
  /** The status of the job execution. */
  status?: "pending" | "success" | "failed";
  /** The type of resource created during job execution. */
  resource_type?: string;
  /** The id of the resource created during job execution (e.g. ticket id) */
  resource_id?: string | null;
  /** The url of the resource created during job exeuction. Use this url to fetch the resource. */
  resource_url?: string | null;
};

/** IP allowlist settings for the workspace. */
export type IpAllowlist = {
  /** String representing the object's type. Always has the value `ip_allowlist`. */
  type?: string;
  /** Whether the IP allowlist is enabled for the workspace. */
  enabled?: boolean;
  /** List of allowed IP addresses and/or IP ranges in CIDR notation. Examples: - Single IP: `192.168.0.1` - IP range: `192.168.0.1/24` (allows 192.168.0.0 - 192.168.0.255)  */
  ip_allowlist?: (string)[];
};

/** Intercom API version.</br>By default, it's equal to the version set in the app package. */
export type IntercomVersion = "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14";

/** A linked conversation or ticket. */
export type LinkedObject = {
  /** ticket or conversation */
  type?: "ticket" | "conversation";
  /** The ID of the linked object */
  id?: string;
  /** Category of the Linked Ticket Object. */
  category?: "Customer" | "Back-office" | "Tracker" | null | null;
};

/** An object containing metadata about linked conversations and linked tickets. Up to 1000 can be returned. */
export type LinkedObjectList = {
  /** Always list. */
  type?: "list";
  /** The total number of linked objects. */
  total_count?: number;
  /** Whether or not there are more linked objects than returned. */
  has_more?: boolean;
  /** An array containing the linked conversations and linked tickets. */
  data?: (LinkedObject)[];
};

/** Merge contact data. */
export type MergeContactsRequest = {
  /** The unique identifier for the contact to merge away from. Must be a lead. */
  from?: string;
  /** The unique identifier for the contact to merge into. Must be a user. */
  into?: string;
};

/** Message are how you reach out to contacts in Intercom. They are created when an admin sends an outbound message to a contact. */
export type Message = {
  /** The type of the message */
  type: string;
  /** The id representing the message. */
  id: string;
  /** The time the conversation was created. */
  created_at: number;
  /** The subject of the message. Only present if message_type: email. */
  subject?: string;
  /** The message body, which may contain HTML. */
  body: string;
  /** The type of message that was sent. Can be email, inapp, facebook or twitter. */
  message_type: "email" | "inapp" | "facebook" | "twitter";
  /** The associated conversation_id */
  conversation_id?: string;
};

export type WhatsappMessageStatusList = {
  type: "list";
  /** The provided ruleset ID */
  ruleset_id: string;
  pages: { type: "pages"; per_page: number; total_pages: number; next?: { starting_after?: string } | null };
  /** Total number of events */
  total_count: number;
  events: ({ id: string; conversation_id: string; status: "sent" | "delivered" | "read" | "failed"; type: "broadcast_outbound"; created_at: number; updated_at: number; whatsapp_message_id: string; template_name?: string })[];
};

/** Search using Intercoms Search APIs with more than one filter. */
export type MultipleFilterSearchRequest = {
  /** An operator to allow boolean inspection between multiple fields. */
  operator?: "AND" | "OR";
  value?: (MultipleFilterSearchRequest)[] | (SingleFilterSearchRequest)[];
};

/** A News Item is a content type in Intercom enabling you to announce product updates, company news, promotions, events and more with your customers. */
export type NewsItem = {
  /** The type of object. */
  type?: "news-item";
  /** The unique identifier for the news item which is given by Intercom. */
  id?: string;
  /** The id of the workspace which the news item belongs to. */
  workspace_id?: string;
  /** The title of the news item. */
  title?: string;
  /** The news item body, which may contain HTML. */
  body?: string;
  /** The id of the sender of the news item. Must be a teammate on the workspace. */
  sender_id?: number;
  /** News items will not be visible to your users in the assigned newsfeeds until they are set live. */
  state?: "draft" | "live";
  /** A list of newsfeed_assignments to assign to the specified newsfeed. */
  newsfeed_assignments?: (NewsfeedAssignment)[];
  /** Label names displayed to users to categorize the news item. */
  labels?: (string | null)[];
  /** URL of the image used as cover. Must have .jpg or .png extension. */
  cover_image_url?: string | null;
  /** Ordered list of emoji reactions to the news item. When empty, reactions are disabled. */
  reactions?: (string | null)[];
  /** When set to true, the news item will appear in the messenger newsfeed without showing a notification badge. */
  deliver_silently?: boolean;
  /** Timestamp for when the news item was created. */
  created_at?: number;
  /** Timestamp for when the news item was last updated. */
  updated_at?: number;
};

/** A News Item is a content type in Intercom enabling you to announce product updates, company news, promotions, events and more with your customers. */
export type NewsItemRequest = {
  /** The title of the news item. */
  title: string;
  /** The news item body, which may contain HTML. */
  body?: string;
  /** The id of the sender of the news item. Must be a teammate on the workspace. */
  sender_id: number;
  /** News items will not be visible to your users in the assigned newsfeeds until they are set live. */
  state?: "draft" | "live";
  /** When set to `true`, the news item will appear in the messenger newsfeed without showing a notification badge. */
  deliver_silently?: boolean;
  /** Label names displayed to users to categorize the news item. */
  labels?: (string)[];
  /** Ordered list of emoji reactions to the news item. When empty, reactions are disabled. */
  reactions?: (string | null)[];
  /** A list of newsfeed_assignments to assign to the specified newsfeed. */
  newsfeed_assignments?: (NewsfeedAssignment)[];
};

/** A newsfeed is a collection of news items, targeted to a specific audience.  Newsfeeds currently cannot be edited through the API, please refer to [this article](https://www.intercom.com/help/en/articles/6362267-getting-started-with-news) to set up your newsfeeds in Intercom. */
export type Newsfeed = {
  /** The unique identifier for the newsfeed which is given by Intercom. */
  id?: string;
  /** The type of object. */
  type?: "newsfeed";
  /** The name of the newsfeed. This name will never be visible to your users. */
  name?: string;
  /** Timestamp for when the newsfeed was created. */
  created_at?: number;
  /** Timestamp for when the newsfeed was last updated. */
  updated_at?: number;
};

/** Assigns a news item to a newsfeed. */
export type NewsfeedAssignment = {
  /** The unique identifier for the newsfeed which is given by Intercom. Publish dates cannot be in the future, to schedule news items use the dedicated feature in app (see this article). */
  newsfeed_id?: number;
  /** Publish date of the news item on the newsfeed, use this field if you want to set a publish date in the past (e.g. when importing existing news items). On write, this field will be ignored if the news item state is "draft". */
  published_at?: number;
};

/** Notes allow you to annotate and comment on your contacts. */
export type Note = {
  /** String representing the object's type. Always has the value `note`. */
  type?: string;
  /** The id of the note. */
  id?: string;
  /** The time the note was created. */
  created_at?: number;
  /** Represents the contact that the note was created about. */
  contact?: { type?: string; id?: string } | null;
  /** Optional. Represents the Admin that created the note. */
  author?: Admin;
  /** The body text of the note. */
  body?: string;
};

/** A paginated list of notes associated with a contact. */
export type NoteList = {
  /** String representing the object's type. Always has the value `list`. */
  type?: string;
  /** An array of notes. */
  data?: (Note)[];
  /** A count of the total number of notes. */
  total_count?: number;
  pages?: CursorPages;
};

/** Payload of the request to open a conversation */
export type OpenConversationRequest = {
  message_type: "open";
  /** The id of the admin who is performing the action. */
  admin_id: string;
};

/** The majority of list resources in the API are paginated to allow clients to traverse data over multiple requests.  Their responses are likely to contain a pages object that hosts pagination links which a client can use to paginate through the data without having to construct a query. The link relations for the pages field are as follows. */
export type PagesLink = {
  type?: "pages";
  page?: number;
  /** A link to the next page of results. A response that does not contain a next link does not have further data to fetch. */
  next?: string | null;
  per_page?: number;
  total_pages?: number;
};

/** Paginated Response */
export type PaginatedResponse = {
  /** The type of object */
  type?: "list" | "conversation.list";
  pages?: CursorPages;
  /** A count of the total number of objects. */
  total_count?: number;
  /** An array of Objects */
  data?: (NewsItem | Newsfeed)[];
};

/** The file attached to a part */
export type PartAttachment = {
  /** The type of attachment */
  type?: string;
  /** The name of the attachment */
  name?: string;
  /** The URL of the attachment */
  url?: string;
  /** The content type of the attachment */
  content_type?: string;
  /** The size of the attachment */
  filesize?: number;
  /** The width of the attachment */
  width?: number;
  /** The height of the attachment */
  height?: number;
};

/** Phone Switch Response */
export type PhoneSwitch = {
  type?: "phone_call_redirect";
  /** Phone number in E.164 format, that has received the SMS to continue the conversation in the Messenger. */
  phone?: string;
};

export type QuickReplyOption = {
  /** The text to display in this quick reply option. */
  text: string;
  /** A unique identifier for this quick reply option. This value will be available within the metadata of the comment conversation part that is created when a user clicks on this reply option. */
  uuid: string;
};

/** Register a Fin Voice call with Intercom */
export type RegisterFinVoiceCallRequest = {
  /** Phone number in E.164 format for the call */
  phone_number: string;
  /** External call identifier from the call provider */
  call_id: string;
  /** Source of the call. Can be "five9", "zoom_phone", or defaults to "aws_connect" */
  source?: "five9" | "zoom_phone" | "aws_connect";
  /** Additional metadata about the call */
  data?: { [key: string]: unknown } | null;
};

export type RedactConversationRequest = { type: "conversation_part"; conversation_id: string; conversation_part_id: string } | { type: "source"; conversation_id: string; source_id: string };

/** reference to another object */
export type Reference = {
  type?: string;
  id?: string | null;
};

export type ReplyConversationRequest = ContactReplyConversationRequest | AdminReplyConversationRequest;

/** Search using Intercoms Search APIs. */
export type SearchRequest = {
  query: SingleFilterSearchRequest | MultipleFilterSearchRequest;
  pagination?: StartingAfterPaging;
};

/** A segment is a group of your contacts defined by the rules that you set. */
export type Segment = {
  /** The type of object. */
  type?: "segment";
  /** The unique identifier representing the segment. */
  id?: string;
  /** The name of the segment. */
  name?: string;
  /** The time the segment was created. */
  created_at?: number;
  /** The time the segment was updated. */
  updated_at?: number;
  /** Type of the contact: contact (lead) or user. */
  person_type?: "contact" | "user";
  /** The number of items in the user segment. It's returned when `include_count=true` is included in the request. */
  count?: number | null;
};

/** This will return a list of Segment Objects. The result may also have a pages object if the response is paginated. */
export type SegmentList = {
  /** The type of the object */
  type?: "segment.list";
  /** A list of Segment objects */
  segments?: (Segment)[];
  /** A pagination object, which may be empty, indicating no further pages to fetch. */
  pages?: { [key: string]: unknown };
};

/** Search using Intercoms Search APIs with a single filter. */
export type SingleFilterSearchRequest = {
  /** The accepted field that you want to search on. */
  field?: string;
  /** The accepted operators you can use to define how you want to search for the value. */
  operator?: "=" | "!=" | "IN" | "NIN" | "<" | ">" | "~" | "!~" | "^" | "$";
  /** The value that you want to search on. */
  value?: string | number | (string | number)[] | null;
};

/** The SLA Applied object contains the details for which SLA has been applied to this conversation. Important: if there are any canceled sla_events for the conversation - meaning an SLA has been manually removed from a conversation, the sla_status will always be returned as null. */
export type SlaApplied = {
  /** object type */
  type?: string;
  /** The name of the SLA as given by the teammate when it was created. */
  sla_name?: string;
  /** SLA statuses:             - `hit`: If there’s at least one hit event in the underlying sla_events table, and no “missed” or “canceled” events for the conversation.             - `missed`: If there are any missed sla_events for the conversation and no canceled events. If there’s even a single missed sla event, the status will always be missed. A missed status is not applied when the SLA expires, only the next time a teammate replies.             - `active`: An SLA has been applied to a conversation, but has not yet been fulfilled. SLA status is active only if there are no “hit, “missed”, or “canceled” events. */
  sla_status?: "hit" | "missed" | "cancelled" | "active";
};

/** Payload of the request to snooze a conversation */
export type SnoozeConversationRequest = {
  message_type: "snoozed";
  /** The id of the admin who is performing the action. */
  admin_id: string;
  /** The time you want the conversation to reopen. */
  snoozed_until: number;
};

/** A Social Profile allows you to label your contacts, companies, and conversations and list them using that Social Profile. */
export type SocialProfile = {
  /** value is "social_profile" */
  type?: string;
  /** The name of the Social media profile */
  name?: string;
  /** The name of the Social media profile */
  url?: string;
};

export type StartingAfterPaging = {
  /** The number of results to fetch per page. */
  per_page?: number;
  /** The cursor to use in the next request to get the next page of results. */
  starting_after?: string | null;
};

/** A subscription type lets customers easily opt out of non-essential communications without missing what's important to them. */
export type SubscriptionType = {
  /** The type of the object - subscription */
  type?: string;
  /** The unique identifier representing the subscription type. */
  id?: string;
  /** The state of the subscription type. */
  state?: "live" | "draft" | "archived";
  default_translation?: Translation;
  /** An array of translations objects with the localised version of the subscription type in each available locale within your translation settings. */
  translations?: (Translation)[];
  /** Describes the type of consent. */
  consent_type?: "opt_out" | "opt_in";
  /** The message types that this subscription supports - can contain `email` or `sms_message`. */
  content_types?: ("email" | "sms_message")[];
};

/** A list of subscription type objects. */
export type SubscriptionTypeList = {
  /** The type of the object */
  type?: "list";
  /** A list of subscription type objects associated with the workspace . */
  data?: (SubscriptionType)[];
};

/** A tag allows you to label your contacts, companies, and conversations and list them using that tag. */
export type Tag = {
  /** value is "tag" */
  type?: string;
  /** The id of the tag */
  id?: string;
  /** The name of the tag */
  name?: string;
  /** The time when the tag was applied to the object. Only present when the tag is returned as part of a tagging operation on a contact, conversation, or ticket. */
  applied_at?: number | null;
  /** The admin who applied the tag. Only present when the tag is returned as part of a tagging operation on a contact, conversation, or ticket. */
  applied_by?: Reference | null;
};

/** A tag allows you to label your contacts, companies, and conversations and list them using that tag. */
export type TagBasic = {
  /** value is "tag" */
  type?: string;
  /** The id of the tag */
  id?: string;
  /** The name of the tag */
  name?: string;
};

/** You can tag a single company or a list of companies. */
export type TagCompanyRequest = {
  /** The name of the tag, which will be created if not found. */
  name: string;
  /** The id or company_id of the company can be passed as input parameters. */
  companies: ({ id?: string; company_id?: string })[];
};

/** A list of tags objects in the workspace. */
export type TagList = {
  /** The type of the object */
  type?: "list";
  /** A list of tags objects associated with the workspace . */
  data?: (Tag)[];
};

/** You can tag a list of users. */
export type TagMultipleUsersRequest = {
  /** The name of the tag, which will be created if not found. */
  name: string;
  users: ({ id?: string })[];
};

/** A list of tags objects associated with a conversation */
export type Tags = {
  /** The type of the object */
  type?: "tag.list";
  /** A list of tags objects associated with the conversation. */
  tags?: (Tag)[];
};

/** Teams are groups of admins in Intercom. */
export type Team = {
  /** Value is always "team" */
  type?: string;
  /** The id of the team */
  id?: string;
  /** The name of the team */
  name?: string;
  /** The list of admin IDs that are a part of the team. */
  admin_ids?: (number)[];
  admin_priority_level?: AdminPriorityLevel;
  /** The assignment limit for the team. This field is only present when the team's distribution type is load balanced. */
  assignment_limit?: number | null;
  /** Describes how assignments are distributed among the team members */
  distribution_method?: string | null;
};

/** This will return a list of team objects for the App. */
export type TeamList = {
  /** The type of the object */
  type?: "team.list";
  /** A list of team objects */
  teams?: (Team)[];
};

/** Admin priority levels for teams */
export type TeamPriorityLevel = {
  /** The primary team ids for the team */
  primary_team_ids?: (number)[] | null;
  /** The secondary team ids for the team */
  secondary_team_ids?: (number)[] | null;
};

/** Tickets are how you track requests from your users. */
export type Ticket = {
  /** Always ticket */
  type?: "ticket";
  /** The unique identifier for the ticket which is given by Intercom. */
  id?: string;
  /** The ID of the Ticket used in the Intercom Inbox and Messenger. Do not use ticket_id for API queries. */
  ticket_id?: string;
  /** Category of the Ticket. */
  category?: "Customer" | "Back-office" | "Tracker";
  ticket_attributes?: TicketCustomAttributes;
  ticket_state?: TicketState;
  ticket_type?: TicketType;
  contacts?: TicketContacts;
  /** The id representing the admin assigned to the ticket. */
  admin_assignee_id?: string;
  /** The id representing the team assigned to the ticket. */
  team_assignee_id?: string;
  /** The time the ticket was created as a UTC Unix timestamp. */
  created_at?: number;
  /** The last time the ticket was updated as a UTC Unix timestamp. */
  updated_at?: number;
  /** Whether or not the ticket is open. If false, the ticket is closed. */
  open?: boolean;
  /** The time the ticket will be snoozed until as a UTC Unix timestamp. If null, the ticket is not currently snoozed. */
  snoozed_until?: number;
  linked_objects?: LinkedObjectList;
  ticket_parts?: TicketParts;
  /** Whether or not the ticket is shared with the customer. */
  is_shared?: boolean;
};

/** deleted ticket object */
export type TicketDeleted = {
  /** The unique identifier for the ticket. */
  id?: string;
  /** always ticket */
  object?: "ticket";
  /** Whether the ticket is deleted or not. */
  deleted?: boolean;
};

/** The list of contacts affected by a ticket. */
export type TicketContacts = {
  /** always contact.list */
  type?: "contact.list";
  /** The list of contacts affected by this ticket. */
  contacts?: (ContactReference)[];
};

/** An object containing the different attributes associated to the ticket as key-value pairs. For the default title and description attributes, the keys are `_default_title_` and `_default_description_`. */
export type TicketCustomAttributes = { [key: string]: string | null | number | boolean | unknown[] | FileAttribute | undefined };

/** Tickets are how you track requests from your users. */
export type TicketList = {
  /** Always ticket.list */
  type?: "ticket.list";
  /** The list of ticket objects */
  tickets?: (Ticket)[];
  /** A count of the total number of objects. */
  total_count?: number;
  pages?: CursorPages;
};

/** A Ticket Part represents a message in the ticket. */
export type TicketPart = {
  /** Always ticket_part */
  type?: string;
  /** The id representing the ticket part. */
  id?: string;
  /** The type of ticket part. */
  part_type?: string;
  /** The message body, which may contain HTML. */
  body?: string | null;
  /** The previous state of the ticket. */
  previous_ticket_state?: "submitted" | "in_progress" | "waiting_on_customer" | "resolved";
  /** The state of the ticket. */
  ticket_state?: "submitted" | "in_progress" | "waiting_on_customer" | "resolved";
  /** The time the ticket part was created. */
  created_at?: number;
  /** The last time the ticket part was updated. */
  updated_at?: number;
  /** The id of the admin that was assigned the ticket by this ticket_part (null if there has been no change in assignment.) */
  assigned_to?: Reference;
  author?: TicketPartAuthor;
  /** A list of attachments for the part. */
  attachments?: (PartAttachment)[];
  /** The external id of the ticket part */
  external_id?: string | null;
  /** Whether or not the ticket part has been redacted. */
  redacted?: boolean;
  /** The app package code if this part was created via API. Note this field won't show if the part was not created via API. */
  app_package_code?: string;
  /** The updated attribute data of the ticket part. Only present for attribute update parts. */
  updated_attribute_data?: { attribute: { type: "attribute"; id: string; label: string }; value: { type: "value"; id: string | null | (number)[]; label: string | (string)[] } } | null;
};

/** The author that wrote or triggered the part. Can be a bot, admin, team or user. */
export type TicketPartAuthor = {
  /** The type of the author */
  type?: "admin" | "bot" | "team" | "user";
  /** The id of the author */
  id?: string;
  /** The name of the author */
  name?: string | null;
  /** The email of the author */
  email?: string;
};

/** A list of Ticket Part objects for each note and event in the ticket. There is a limit of 500 parts. */
export type TicketParts = {
  type?: "ticket_part.list";
  /** A list of Ticket Part objects for each ticket. There is a limit of 500 parts. */
  ticket_parts?: (TicketPart)[];
  total_count?: number;
};

/** A Ticket Part representing a note, comment, or quick_reply on a ticket */
export type TicketReply = {
  /** Always ticket_part */
  type?: "ticket_part";
  /** The id representing the part. */
  id?: string;
  /** Type of the part */
  part_type?: "note" | "comment" | "quick_reply";
  /** The message body, which may contain HTML. */
  body?: string | null;
  /** The time the note was created. */
  created_at?: number;
  /** The last time the note was updated. */
  updated_at?: number;
  author?: TicketPartAuthor;
  /** A list of attachments for the part. */
  attachments?: (PartAttachment)[];
  /** Whether or not the ticket part has been redacted. */
  redacted?: boolean;
};

/** The attributes set on the ticket. When setting the default title and description attributes, the attribute keys that should be used are `_default_title_` and `_default_description_`. When setting ticket type attributes of the list attribute type, the key should be the attribute name and the value of the attribute should be the list item id, obtainable by [listing the ticket type](ref:get_ticket-types). For example, if the ticket type has an attribute called `priority` of type `list`, the key should be `priority` and the value of the attribute should be the guid of the list item (e.g. `de1825a0-0164-4070-8ca6-13e22462fa7e`). */
export type TicketRequestCustomAttributes = { [key: string]: string | null | number | boolean | unknown[] | undefined };

/** A ticket state, used to define the state of a ticket. */
export type TicketState = {
  /** String representing the object's type. Always has the value `ticket_state`. */
  type?: string;
  /** The id of the ticket state */
  id?: string;
  /** The category of the ticket state */
  category?: "submitted" | "in_progress" | "waiting_on_customer" | "resolved";
  /** The state the ticket is currently in, in a human readable form - visible in Intercom */
  internal_label?: string;
  /** The state the ticket is currently in, in a human readable form - visible to customers, in the messenger, email and tickets portal. */
  external_label?: string;
};

/** A ticket state, used to define the state of a ticket. */
export type TicketStateDetailed = {
  /** String representing the object's type. Always has the value `ticket_state`. */
  type?: string;
  /** The id of the ticket state */
  id?: string;
  /** The category of the ticket state */
  category?: "submitted" | "in_progress" | "waiting_on_customer" | "resolved";
  /** The state the ticket is currently in, in a human readable form - visible in Intercom */
  internal_label?: string;
  /** The state the ticket is currently in, in a human readable form - visible to customers, in the messenger, email and tickets portal. */
  external_label?: string;
  /** Whether the ticket state is archived */
  archived?: boolean;
  /** A list of ticket types associated with a given ticket state. */
  ticket_types?: { type?: string; data?: (TicketType)[] };
};

/** A list of ticket states associated with a given ticket type. */
export type TicketStateList = {
  /** String representing the object's type. Always has the value `list`. */
  type?: string;
  /** A list of ticket states associated with a given ticket type. */
  data?: (TicketStateDetailed)[];
};

/** A ticket type, used to define the data fields to be captured in a ticket. */
export type TicketType = {
  /** String representing the object's type. Always has the value `ticket_type`. */
  type?: string;
  /** The id representing the ticket type. */
  id?: string;
  /** Category of the Ticket Type. */
  category?: "Customer" | "Back-office" | "Tracker";
  /** The name of the ticket type */
  name?: string;
  /** The description of the ticket type */
  description?: string;
  /** The icon of the ticket type */
  icon?: string;
  /** The id of the workspace that the ticket type belongs to. */
  workspace_id?: string;
  ticket_type_attributes?: TicketTypeAttributeList;
  /** A list of ticket states associated with a given ticket type. */
  ticket_states?: { type?: string; data?: (TicketState)[] };
  /** Whether the ticket type is archived or not. */
  archived?: boolean;
  /** The date and time the ticket type was created. */
  created_at?: number;
  /** The date and time the ticket type was last updated. */
  updated_at?: number;
};

/** Ticket type attribute, used to define each data field to be captured in a ticket. */
export type TicketTypeAttribute = {
  /** String representing the object's type. Always has the value `ticket_type_attribute`. */
  type?: string;
  /** The id representing the ticket type attribute. */
  id?: string;
  /** The id of the workspace that the ticket type attribute belongs to. */
  workspace_id?: string;
  /** The name of the ticket type attribute */
  name?: string;
  /** The description of the ticket type attribute */
  description?: string;
  /** The type of the data attribute (allowed values: "string list integer decimal boolean datetime files") */
  data_type?: string;
  /** Input options for the attribute */
  input_options?: { [key: string]: unknown };
  /** The order of the attribute against other attributes */
  order?: number;
  /** Whether the attribute is required or not for teammates. */
  required_to_create?: boolean;
  /** Whether the attribute is required or not for contacts. */
  required_to_create_for_contacts?: boolean;
  /** Whether the attribute is visible or not to teammates. */
  visible_on_create?: boolean;
  /** Whether the attribute is visible or not to contacts. */
  visible_to_contacts?: boolean;
  /** Whether the attribute is built in or not. */
  default?: boolean;
  /** The id of the ticket type that the attribute belongs to. */
  ticket_type_id?: number;
  /** Whether the ticket type attribute is archived or not. */
  archived?: boolean;
  /** The date and time the ticket type attribute was created. */
  created_at?: number;
  /** The date and time the ticket type attribute was last updated. */
  updated_at?: number;
};

/** A list of attributes associated with a given ticket type. */
export type TicketTypeAttributeList = {
  /** String representing the object's type. Always has the value `ticket_type_attributes.list`. */
  type?: string;
  /** A list of ticket type attributes associated with a given ticket type. */
  ticket_type_attributes?: (TicketTypeAttribute)[];
};

/** A list of ticket types associated with a given workspace. */
export type TicketTypeList = {
  /** String representing the object's type. Always has the value `list`. */
  type?: string;
  /** A list of ticket_types associated with a given workspace. */
  data?: (TicketType)[];
};

/** A translation object contains the localised details of a subscription type. */
export type Translation = {
  /** The localised name of the subscription type. */
  name?: string;
  /** The localised description of the subscription type. */
  description?: string;
  /** The two character identifier for the language of the translation object. */
  locale?: string;
};

/** You can tag a single company or a list of companies. */
export type UntagCompanyRequest = {
  /** The name of the tag which will be untagged from the company */
  name: string;
  /** The id or company_id of the company can be passed as input parameters. */
  companies: ({ id?: string; company_id?: string; untag?: boolean })[];
};

/** You can Update an Article */
export type UpdateArticleRequest = {
  /** The title of the article.For multilingual articles, this will be the title of the default language's content. */
  title?: string;
  /** The description of the article. For multilingual articles, this will be the description of the default language's content. */
  description?: string;
  /** The content of the article. For multilingual articles, this will be the body of the default language's content. */
  body?: string;
  /** The id of the author of the article. For multilingual articles, this will be the id of the author of the default language's content. Must be a teammate on the help center's workspace. */
  author_id?: number;
  /** Whether the article will be `published` or will be a `draft`. Defaults to draft. For multilingual articles, this will be the state of the default language's content. */
  state?: "published" | "draft";
  /** The id of the article's parent collection or section. An article without this field stands alone. */
  parent_id?: string;
  /** The type of parent, which can either be a `collection` or `section`. */
  parent_type?: string;
  translated_content?: ArticleTranslatedContent;
};

/** You can Update an Internal Article */
export type UpdateInternalArticleRequest = {
  /** The title of the article. */
  title?: string;
  /** The content of the article. */
  body?: string;
  /** The id of the author of the article. */
  author_id?: number;
  /** The id of the author of the article. */
  owner_id?: number;
};

/** You can update a collection */
export type UpdateCollectionRequest = {
  /** The name of the collection. For multilingual collections, this will be the name of the default language's content. */
  name?: string;
  /** The description of the collection. For multilingual collections, this will be the description of the default language's content. */
  description?: string;
  translated_content?: GroupTranslatedContent;
  /** The id of the parent collection. If `null` then it will be updated as the first level collection. */
  parent_id?: string | null;
};

/** You can update a contact */
export type UpdateContactRequest = {
  /** The role of the contact. */
  role?: string;
  /** A unique identifier for the contact which is given to Intercom */
  external_id?: string;
  /** The contacts email */
  email?: string;
  /** The contacts phone */
  phone?: string | null;
  /** The contacts name */
  name?: string | null;
  /** An image URL containing the avatar of a contact */
  avatar?: string | null;
  /** (Unix timestamp in seconds) The time specified for when a contact signed up. */
  signed_up_at?: number | null;
  /** (Unix timestamp in seconds) The time when the contact was last seen (either where the Intercom Messenger was installed or when specified manually). */
  last_seen_at?: number | null;
  /** The id of an admin that has been assigned account ownership of the contact */
  owner_id?: number | null;
  /** Whether the contact is unsubscribed from emails */
  unsubscribed_from_emails?: boolean | null;
  /** The custom attributes which are set for the contact */
  custom_attributes?: { [key: string]: unknown } | null;
};

/** You can modify a Content Import Source of your Fin Content Library. */
export type UpdateContentImportSourceRequest = {
  /** If you intend to create or update External Pages via the API, this should be set to `api`. You can not change the value to or from api. */
  sync_behavior: "api" | "automated" | "manual";
  /** The status of the content import source. */
  status?: "active" | "deactivated";
  /** The URL of the content import source. This may only be different from the existing value if the sync behavior is API. */
  url: string;
};

/** Payload of the request to update a conversation */
export type UpdateConversationRequest = {
  /** Mark a conversation as read within Intercom. */
  read?: boolean;
  /** The title given to the conversation */
  title?: string;
  custom_attributes?: CustomAttributes;
  /** The ID of the company that the conversation is associated with. The unique identifier for the company which is given by Intercom. Set to nil to remove company. */
  company_id?: string;
};

export type UpdateDataAttributeRequest = {
  /** Whether the attribute is to be archived or not. */
  archived?: boolean;
  /** The readable description you see in the UI for the attribute. */
  description?: string;
  /** Can this attribute be updated by the Messenger */
  messenger_writable?: boolean;
};

/** You can update an External Page in your Fin Content Library. */
export type UpdateExternalPageRequest = {
  /** The title of the external page. */
  title: string;
  /** The body of the external page in HTML. */
  html: string;
  /** The URL of the external page. This will be used by Fin to link end users to the page it based its answer on. */
  url: string;
  /** Whether the external page should be used to answer questions by Fin. */
  fin_availability?: boolean;
  /** Always en */
  locale: "en";
  /** The unique identifier for the source of the external page which was given by Intercom. Every external page must be associated with a Content Import Source which represents the place it comes from and from which it inherits a default audience (configured in the UI). For a new source, make a POST request to the Content Import Source endpoint and an ID for the source will be returned in the response. */
  source_id: number;
  /** The identifier for the external page which was given by the source. Must be unique for the source. */
  external_id?: string;
};

/** You can update a Ticket */
export type UpdateTicketRequest = {
  /** The attributes set on the ticket. */
  ticket_attributes?: { [key: string]: unknown };
  /** The ID of the ticket state associated with the ticket type. */
  ticket_state_id?: string;
  /** The ID of the company that the ticket is associated with. The unique identifier for the company which is given by Intercom. Set to nil to remove company. */
  company_id?: string;
  /** Specify if a ticket is open. Set to false to close a ticket. Closing a ticket will also unsnooze it. */
  open?: boolean;
  /** Specify whether the ticket is visible to users. */
  is_shared?: boolean;
  /** The time you want the ticket to reopen. */
  snoozed_until?: number;
  /** The ID of the admin performing ticket update. Needed for workflows execution and attributing actions to specific admins. */
  admin_id?: number;
  /** The ID of the admin or team to which the ticket is assigned. Set this 0 to unassign it. */
  assignee_id?: string;
};

/** You can update a Ticket Type Attribute */
export type UpdateTicketTypeAttributeRequest = {
  /** The name of the ticket type attribute */
  name?: string;
  /** The description of the attribute presented to the teammate or contact */
  description?: string;
  /** Whether the attribute is required to be filled in when teammates are creating the ticket in Inbox. */
  required_to_create?: boolean;
  /** Whether the attribute is required to be filled in when contacts are creating the ticket in Messenger. */
  required_to_create_for_contacts?: boolean;
  /** Whether the attribute is visible to teammates when creating a ticket in Inbox. */
  visible_on_create?: boolean;
  /** Whether the attribute is visible to contacts when creating a ticket in Messenger. */
  visible_to_contacts?: boolean;
  /** Whether the attribute allows multiple lines of text (only applicable to string attributes) */
  multiline?: boolean;
  /** A comma delimited list of items for the attribute value (only applicable to list attributes) */
  list_items?: string;
  /** Whether the attribute allows multiple files to be attached to it (only applicable to file attributes) */
  allow_multiple_values?: boolean;
  /** Whether the attribute should be archived and not shown during creation of the ticket (it will still be present on previously created tickets) */
  archived?: boolean;
};

/** The request payload for updating a ticket type. You can copy the `icon` property for your ticket type from [Twemoji Cheatsheet](https://twemoji-cheatsheet.vercel.app/) */
export type UpdateTicketTypeRequest = {
  /** The name of the ticket type. */
  name?: string;
  /** The description of the ticket type. */
  description?: string;
  /** Category of the Ticket Type. */
  category?: "Customer" | "Back-office" | "Tracker";
  /** The icon of the ticket type. */
  icon?: string;
  /** The archived status of the ticket type. */
  archived?: boolean;
  /** Whether the tickets associated with this ticket type are intended for internal use only or will be shared with customers. This is currently a limited attribute. */
  is_internal?: boolean;
};

/** Update an existing visitor. */
export type UpdateVisitorRequest = {
  /** A unique identified for the visitor which is given by Intercom. */
  id?: string;
  /** A unique identified for the visitor which is given by you. */
  user_id?: string;
  /** The visitor's name. */
  name?: string;
  /** The custom attributes which are set for the visitor. */
  custom_attributes?: { [key: string]: string | undefined };
};

/** Visitors are useful for representing anonymous people that have not yet been identified. They usually represent website visitors. Visitors are not visible in Intercom platform. The Visitors resource provides methods to fetch, update, convert and delete. */
export type Visitor = {
  /** Value is 'visitor' */
  type?: string;
  /** The Intercom defined id representing the Visitor. */
  id?: string;
  /** Automatically generated identifier for the Visitor. */
  user_id?: string;
  /** Identifies if this visitor is anonymous. */
  anonymous?: boolean;
  /** The email of the visitor. */
  email?: string;
  /** The phone number of the visitor. */
  phone?: string | null;
  /** The name of the visitor. */
  name?: string | null;
  /** The pseudonym of the visitor. */
  pseudonym?: string | null;
  avatar?: { type?: string; image_url?: string | null };
  /** The id of the app the visitor is associated with. */
  app_id?: string;
  companies?: { type?: "company.list"; companies?: (Company)[] };
  location_data?: { type?: string; city_name?: string; continent_code?: string; country_code?: string; country_name?: string; postal_code?: string; region_name?: string; timezone?: string };
  /** The time the Lead last recorded making a request. */
  las_request_at?: number;
  /** The time the Visitor was added to Intercom. */
  created_at?: number;
  /** The time the Visitor was added to Intercom. */
  remote_created_at?: number;
  /** The time the Visitor signed up for your product. */
  signed_up_at?: number;
  /** The last time the Visitor was updated. */
  updated_at?: number;
  /** The number of sessions the Visitor has had. */
  session_count?: number;
  social_profiles?: { type?: "social_profile.list"; social_profiles?: (string)[] };
  /** The id of the admin that owns the Visitor. */
  owner_id?: string | null;
  /** Whether the Visitor is unsubscribed from emails. */
  unsubscribed_from_emails?: boolean;
  /** Identifies if this visitor has marked an email as spam. */
  marked_email_as_spam?: boolean;
  /** Identifies if this visitor has had a hard bounce. */
  has_hard_bounced?: boolean;
  tags?: { type?: "tag.list"; tags?: ({ type?: "tag"; id?: string; name?: string })[] };
  segments?: { type?: "segment.list"; segments?: (string)[] };
  /** The custom attributes you have set on the Visitor. */
  custom_attributes?: { [key: string]: string | undefined };
  /** The referer of the visitor. */
  referrer?: string | null;
  /** The utm_campaign of the visitor. */
  utm_campaign?: string | null;
  /** The utm_content of the visitor. */
  utm_content?: string | null;
  /** The utm_medium of the visitor. */
  utm_medium?: string | null;
  /** The utm_source of the visitor. */
  utm_source?: string | null;
  /** The utm_term of the visitor. */
  utm_term?: string | null;
  /** Identifies if this visitor has do not track enabled. */
  do_not_track?: boolean | null;
};

/** Response returned when an object is deleted */
export type VisitorDeletedObject = {
  /** The unique identifier for the visitor which is given by Intercom. */
  id?: string;
  /** The type of object which was deleted */
  type?: "visitor";
  /** Automatically generated identifier for the Visitor. */
  user_id?: string;
};

/** A workflow export containing the complete workflow configuration. */
export type WorkflowExport = {
  /** The version of the export format. */
  export_version?: string;
  /** The timestamp when the export was generated. */
  exported_at?: string;
  /** The workspace identifier. */
  app_id?: number;
  /** The workflow configuration. */
  workflow?: { id?: string; title?: string; description?: string | null; trigger_type?: string; state?: "live" | "draft" | "paused"; target_channels?: (string)[]; preferred_devices?: (string)[]; created_at?: string; updated_at?: string; targeting?: { [key: string]: unknown } | null; snapshot?: { [key: string]: unknown } | null; attributes?: ({ [key: string]: unknown })[]; embedded_rules?: ({ [key: string]: unknown })[] };
};
