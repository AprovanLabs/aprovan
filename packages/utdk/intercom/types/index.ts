import type { ActivityLogList, Admin, AdminList, AdminReplyTicketRequest, AdminWithApp, AiCallResponse, Article, ArticleList, ArticleSearchResponse, ArticleTranslatedContent, AssignConversationRequest, AwayStatusReason, Brand, BrandList, Call, CallList, CloseConversationRequest, Collection, CollectionList, Company, CompanyAttachedContacts, CompanyAttachedSegments, CompanyList, CompanyScroll, Contact, ContactArchived, ContactAttachedCompanies, ContactBlocked, ContactDeleted, ContactList, ContactReplyTicketRequest, ContactSegments, ContactUnarchived, ContentImportSource, ContentImportSourcesList, Conversation, ConversationDeleted, ConversationList, CreateContactRequest, CreateDataAttributeRequest, CreateDataEventRequest, CreateMessageRequest, CreateOrUpdateTagRequest, CustomAttributes, CustomObjectInstance, CustomObjectInstanceDeleted, CustomerRequest, DataAttribute, DataAttributeList, DataEventSummary, DataExport, DeletedArticleObject, DeletedCollectionObject, DeletedCompanyObject, DeletedInternalArticleObject, DeletedObject, EmailList, EmailSetting, Error, ExternalPage, ExternalPagesList, FinAgentAttachment, FinAgentAttributeErrors, FinAgentConversationMetadata, FinAgentMessage, FinAgentUser, GroupTranslatedContent, HelpCenter, HelpCenterList, InternalArticle, InternalArticleList, InternalArticleSearchResponse, IpAllowlist, Jobs, Message, MultipleFilterSearchRequest, NewsItem, Newsfeed, NewsfeedAssignment, Note, NoteList, OpenConversationRequest, PaginatedResponse, PhoneSwitch, RedactConversationRequest, ReplyConversationRequest, Segment, SegmentList, SingleFilterSearchRequest, SnoozeConversationRequest, StartingAfterPaging, SubscriptionType, SubscriptionTypeList, Tag, TagBasic, TagCompanyRequest, TagList, TagMultipleUsersRequest, Team, TeamList, Ticket, TicketDeleted, TicketList, TicketReply, TicketRequestCustomAttributes, TicketStateList, TicketType, TicketTypeAttribute, TicketTypeList, UntagCompanyRequest, UpdateContactRequest, UpdateDataAttributeRequest, UpdateVisitorRequest, Visitor, WorkflowExport } from "./schemas.js";

export type IntercomClient = {
  /**
   * Identify an admin
   */
  identifyAdmin: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<AdminWithApp>;

  /**
   * Set an admin to away
   */
  setAwayAdmin: (input: {
    /** Set to "true" to change the status of the admin to away. */
    away_mode_enabled: boolean;
    /** Set to "true" to assign any new conversation replies to your default inbox. */
    away_mode_reassign: boolean;
    /** The unique identifier of the away status reason */
    away_status_reason_id?: number;
    /** The unique identifier of a given admin */
    admin_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Admin>;

  /**
   * List all activity logs
   */
  listActivityLogs: (input: {
    /** The start date that you request data for. It must be formatted as a UNIX timestamp. */
    created_at_after: string;
    /** The end date that you request data for. It must be formatted as a UNIX timestamp. */
    created_at_before?: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ActivityLogList>;

  /**
   * List all admins
   */
  listAdmins: (input: {
    /** If set to true, the response will include the admin's avatar object containing the image URL. Defaults to false. */
    display_avatar?: boolean;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<AdminList>;

  /**
   * Retrieve an admin
   */
  retrieveAdmin: (input: {
    /** The unique identifier of a given admin */
    admin_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Admin>;

  /**
   * List content import sources
   */
  listContentImportSources: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContentImportSourcesList>;

  /**
   * Create a content import source
   */
  createContentImportSource: (input: {
    /** If you intend to create or update External Pages via the API, this should be set to `api`. */
    sync_behavior: "api";
    /** The status of the content import source. */
    status?: "active" | "deactivated";
    /** The URL of the content import source. */
    url: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContentImportSource>;

  /**
   * Delete a content import source
   */
  deleteContentImportSource: (input: {
    /** The unique identifier for the content import source which is given by Intercom. */
    source_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Error>;

  /**
   * Retrieve a content import source
   */
  getContentImportSource: (input: {
    /** The unique identifier for the content import source which is given by Intercom. */
    source_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContentImportSource>;

  /**
   * Update a content import source
   */
  updateContentImportSource: (input: {
    /** If you intend to create or update External Pages via the API, this should be set to `api`. You can not change the value to or from api. */
    sync_behavior: "api" | "automated" | "manual";
    /** The status of the content import source. */
    status?: "active" | "deactivated";
    /** The URL of the content import source. This may only be different from the existing value if the sync behavior is API. */
    url: string;
    /** The unique identifier for the content import source which is given by Intercom. */
    source_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContentImportSource>;

  /**
   * List external pages
   */
  listExternalPages: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ExternalPagesList>;

  /**
   * Create an external page (or update an external page by external ID)
   */
  createExternalPage: (input: {
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
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ExternalPage>;

  /**
   * Delete an external page
   */
  deleteExternalPage: (input: {
    /** The unique identifier for the external page which is given by Intercom. */
    page_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ExternalPage>;

  /**
   * Retrieve an external page
   */
  getExternalPage: (input: {
    /** The unique identifier for the external page which is given by Intercom. */
    page_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ExternalPage>;

  /**
   * Update an external page
   */
  updateExternalPage: (input: {
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
    /** The unique identifier for the external page which is given by Intercom. */
    page_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ExternalPage>;

  /**
   * List all articles
   */
  listArticles: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ArticleList>;

  /**
   * Create an article
   */
  createArticle: (input: {
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
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Article>;

  /**
   * Retrieve an article
   */
  retrieveArticle: (input: {
    /** The unique identifier for the article which is given by Intercom. */
    article_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Article>;

  /**
   * Update an article
   */
  updateArticle: (input: {
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
    /** The unique identifier for the article which is given by Intercom. */
    article_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Article>;

  /**
   * Delete an article
   */
  deleteArticle: (input: {
    /** The unique identifier for the article which is given by Intercom. */
    article_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DeletedArticleObject>;

  /**
   * Search for articles
   */
  searchArticles: (input: {
    /** The phrase within your articles to search for. */
    phrase?: string;
    /** The state of the Articles returned. One of `published`, `draft` or `all`. */
    state?: string;
    /** The ID of the Help Center to search in. */
    help_center_id?: number;
    /** Return a highlighted version of the matching content within your articles. Refer to the response schema for more details. */
    highlight?: boolean;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ArticleSearchResponse>;

  /**
   * List all away status reasons
   */
  listAwayStatusReasons: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<(AwayStatusReason)[]>;

  /**
   * Enqueue a new reporting data export job
   */
  postExportReportingDataEnqueue: (input: {
    dataset_id: string;
    attribute_ids: (string)[];
    start_time: number;
    end_time: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<{ job_identifier?: string; status?: string; download_url?: string; download_expires_at?: string }>;

  /**
   * Get export job status
   */
  getExportReportingDataJobIdentifier: (input: {
    /** The Intercom defined code of the workspace the company is associated to. */
    app_id: string;
    client_id: string;
    /** Unique identifier of the job. */
    job_identifier: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<{ job_identifier?: string; status?: string; download_url?: string; download_expires_at?: string }>;

  /**
   * List available datasets and attributes
   */
  getExportReportingDataGetDatasets: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<{ type?: string; data?: ({ id?: string; name?: string; description?: string; default_time_attribute_id?: string; attributes?: ({ id?: string; name?: string })[] })[] }>;

  /**
   * Download completed export job data
   */
  getDownloadReportingDataJobIdentifier: (input: {
    app_id: string;
    job_identifier: string;
  }, options: { headers: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14"; Accept: "application/octet-stream" } }) => Promise<Error>;

  /**
   * Start a conversation with Fin
   */
  startFinConversation: (input: {
    /** The ID of the conversation that is calling Fin via this API. */
    conversation_id: string;
    message: FinAgentMessage;
    user: FinAgentUser;
    /** An array of attachments to include with the message. Maximum of 10 attachments. */
    attachments?: (FinAgentAttachment)[];
    conversation_metadata?: FinAgentConversationMetadata;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<{ conversation_id?: string; user_id?: string; status?: "thinking" | "awaiting_user_reply" | "escalated" | "resolved" | "complete"; created_at_ms?: string; errors?: FinAgentAttributeErrors; sse_subscription_url?: string }>;

  /**
   * Reply to Fin
   */
  replyToFin: (input: {
    /** The ID of the conversation. */
    conversation_id: string;
    message: FinAgentMessage;
    user: FinAgentUser;
    /** An array of attachments to include with the message. Maximum of 10 attachments. */
    attachments?: (FinAgentAttachment)[];
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<{ conversation_id?: string; user_id?: string; status?: "thinking" | "awaiting_user_reply" | "escalated" | "resolved" | "complete"; created_at_ms?: string; errors?: FinAgentAttributeErrors; sse_subscription_url?: string }>;

  /**
   * List all collections
   */
  listAllCollections: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CollectionList>;

  /**
   * Create a collection
   */
  createCollection: (input: {
    /** The name of the collection. For multilingual collections, this will be the name of the default language's content. */
    name: string;
    /** The description of the collection. For multilingual collections, this will be the description of the default language's content. */
    description?: string;
    translated_content?: GroupTranslatedContent;
    /** The id of the parent collection. If `null` then it will be created as the first level collection. */
    parent_id?: string | null;
    /** The id of the help center where the collection will be created. If `null` then it will be created in the default help center. */
    help_center_id?: number | null;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Collection>;

  /**
   * Retrieve a collection
   */
  retrieveCollection: (input: {
    /** The unique identifier for the collection which is given by Intercom. */
    collection_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Collection>;

  /**
   * Update a collection
   */
  updateCollection: (input: {
    /** The name of the collection. For multilingual collections, this will be the name of the default language's content. */
    name?: string;
    /** The description of the collection. For multilingual collections, this will be the description of the default language's content. */
    description?: string;
    translated_content?: GroupTranslatedContent;
    /** The id of the parent collection. If `null` then it will be updated as the first level collection. */
    parent_id?: string | null;
    /** The unique identifier for the collection which is given by Intercom. */
    collection_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Collection>;

  /**
   * Delete a collection
   */
  deleteCollection: (input: {
    /** The unique identifier for the collection which is given by Intercom. */
    collection_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DeletedCollectionObject>;

  /**
   * Retrieve a Help Center
   */
  retrieveHelpCenter: (input: {
    /** The unique identifier for the collection which is given by Intercom. */
    help_center_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<HelpCenter>;

  /**
   * List all Help Centers
   */
  listHelpCenters: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<HelpCenterList>;

  /**
   * List all articles
   */
  listInternalArticles: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<InternalArticleList>;

  /**
   * Create an internal article
   */
  createInternalArticle: (input: {
    /** The title of the article. */
    title: string;
    /** The content of the article. */
    body?: string;
    /** The id of the author of the article. */
    author_id: number;
    /** The id of the owner of the article. */
    owner_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<InternalArticle>;

  /**
   * Retrieve an internal article
   */
  retrieveInternalArticle: (input: {
    /** The unique identifier for the article which is given by Intercom. */
    internal_article_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<InternalArticle>;

  /**
   * Update an internal article
   */
  updateInternalArticle: (input: {
    /** The title of the article. */
    title?: string;
    /** The content of the article. */
    body?: string;
    /** The id of the author of the article. */
    author_id?: number;
    /** The id of the author of the article. */
    owner_id?: number;
    /** The unique identifier for the internal article which is given by Intercom. */
    internal_article_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<InternalArticle>;

  /**
   * Delete an internal article
   */
  deleteInternalArticle: (input: {
    /** The unique identifier for the internal article which is given by Intercom. */
    internal_article_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DeletedInternalArticleObject>;

  /**
   * Search for internal articles
   */
  searchInternalArticles: (input: {
    /** The ID of the folder to search in. */
    folder_id?: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<InternalArticleSearchResponse>;

  /**
   * Get IP allowlist settings
   */
  getIpAllowlist: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<IpAllowlist>;

  /**
   * Update IP allowlist settings
   */
  updateIpAllowlist: (input: {
    /** String representing the object's type. Always has the value `ip_allowlist`. */
    type?: string;
    /** Whether the IP allowlist is enabled for the workspace. */
    enabled?: boolean;
    /** List of allowed IP addresses and/or IP ranges in CIDR notation. Examples: - Single IP: `192.168.0.1` - IP range: `192.168.0.1/24` (allows 192.168.0.0 - 192.168.0.255)  */
    ip_allowlist?: (string)[];
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<IpAllowlist>;

  /**
   * Create or Update a company
   */
  createOrUpdateCompany: (input: {
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
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Company>;

  /**
   * Retrieve companies
   */
  retrieveCompany: (input: {
    /** The `name` of the company to filter by. */
    name?: string;
    /** The `company_id` of the company to filter by. */
    company_id?: string;
    /** The `tag_id` of the company to filter by. */
    tag_id?: string;
    /** The `segment_id` of the company to filter by. */
    segment_id?: string;
    /** The page of results to fetch. Defaults to first page */
    page?: number;
    /** How many results to display per page. Defaults to 15 */
    per_page?: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CompanyList>;

  /**
   * Retrieve a company by ID
   */
  retrieveACompanyById: (input: {
    /** The unique identifier for the company which is given by Intercom */
    company_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Company>;

  /**
   * Update a company
   */
  updateCompany: (input: {
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
    /** The unique identifier for the company which is given by Intercom */
    company_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Company>;

  /**
   * Delete a company
   */
  deleteCompany: (input: {
    /** The unique identifier for the company which is given by Intercom */
    company_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DeletedCompanyObject>;

  /**
   * List attached contacts
   */
  listAttachedContacts: (input: {
    /** The unique identifier for the company which is given by Intercom */
    company_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CompanyAttachedContacts>;

  /**
   * List attached segments for companies
   */
  listAttachedSegmentsForCompanies: (input: {
    /** The unique identifier for the company which is given by Intercom */
    company_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CompanyAttachedSegments>;

  /**
   * List all company notes
   */
  listCompanyNotes: (input: {
    /** The unique identifier for the company which is given by Intercom */
    company_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<NoteList>;

  /**
   * List all companies
   */
  listAllCompanies: (input: {
    /** The page of results to fetch. Defaults to first page */
    page?: number;
    /** How many results to return per page. Defaults to 15 */
    per_page?: number;
    /** `asc` or `desc`. Return the companies in ascending or descending order. Defaults to desc */
    order?: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CompanyList>;

  /**
   * Scroll over all companies
   */
  scrollOverAllCompanies: (input: {
    scroll_param?: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CompanyScroll>;

  /**
   * Attach a Contact to a Company
   */
  attachContactToACompany: (input: {
    /** The unique identifier for the company which is given by Intercom */
    id: string;
    /** The unique identifier for the contact which is given by Intercom */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Company>;

  /**
   * List attached companies for contact
   */
  listCompaniesForAContact: (input: {
    /** The unique identifier for the contact which is given by Intercom */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContactAttachedCompanies>;

  /**
   * Detach a contact from a company
   */
  detachContactFromACompany: (input: {
    /** The unique identifier for the contact which is given by Intercom */
    contact_id: string;
    /** The unique identifier for the company which is given by Intercom */
    company_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Company>;

  /**
   * List all notes
   */
  listNotes: (input: {
    /** The unique identifier of a contact. */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<NoteList>;

  /**
   * Create a note
   */
  createNote: (input: {
    /** The text of the note. */
    body: string;
    /** The unique identifier of a given admin. */
    admin_id?: string;
    /** The unique identifier of a given contact. */
    contact_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Note>;

  /**
   * List attached segments for contact
   */
  listSegmentsForAContact: (input: {
    /** The unique identifier for the contact which is given by Intercom */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContactSegments>;

  /**
   * List subscriptions for a contact
   */
  listSubscriptionsForAContact: (input: {
    /** The unique identifier for the contact which is given by Intercom */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<SubscriptionTypeList>;

  /**
   * Add subscription to a contact
   */
  attachSubscriptionTypeToContact: (input: {
    /** The unique identifier for the subscription which is given by Intercom */
    id: string;
    /** The consent_type of a subscription, opt_out or opt_in. */
    consent_type: string;
    /** The unique identifier for the contact which is given by Intercom */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<SubscriptionType>;

  /**
   * Remove subscription from a contact
   */
  detachSubscriptionTypeToContact: (input: {
    /** The unique identifier for the contact which is given by Intercom */
    contact_id: string;
    /** The unique identifier for the subscription type which is given by Intercom */
    subscription_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<SubscriptionType>;

  /**
   * List tags attached to a contact
   */
  listTagsForAContact: (input: {
    /** The unique identifier for the contact which is given by Intercom */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TagList>;

  /**
   * Add tag to a contact
   */
  attachTagToContact: (input: {
    /** The unique identifier for the tag which is given by Intercom */
    id: string;
    /** The unique identifier for the contact which is given by Intercom */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Tag>;

  /**
   * Remove tag from a contact
   */
  detachTagFromContact: (input: {
    /** The unique identifier for the contact which is given by Intercom */
    contact_id: string;
    /** The unique identifier for the tag which is given by Intercom */
    tag_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Tag>;

  /**
   * Update a contact
   */
  updateContact: (input: {
    body?: UpdateContactRequest;
    /** id */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Contact>;

  /**
   * Get a contact
   */
  showContact: (input: {
    /** contact_id */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Contact>;

  /**
   * Delete a contact
   */
  deleteContact: (input: {
    /** contact_id */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContactDeleted>;

  /**
   * Merge a lead and a user
   */
  mergeContact: (input: {
    /** The unique identifier for the contact to merge away from. Must be a lead. */
    from?: string;
    /** The unique identifier for the contact to merge into. Must be a user. */
    into?: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Contact>;

  /**
   * Search contacts
   */
  searchContacts: (input: {
    query: SingleFilterSearchRequest | MultipleFilterSearchRequest;
    pagination?: StartingAfterPaging;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContactList>;

  /**
   * List all contacts
   */
  listContacts: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContactList>;

  /**
   * Create contact
   */
  createContact: (input: {
    body?: CreateContactRequest;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Contact>;

  /**
   * Get a contact by External ID
   */
  showContactByExternalId: (input: {
    /** The external ID of the user that you want to retrieve */
    external_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Contact>;

  /**
   * Archive contact
   */
  archiveContact: (input: {
    /** contact_id */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContactArchived>;

  /**
   * Unarchive contact
   */
  unarchiveContact: (input: {
    /** contact_id */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContactUnarchived>;

  /**
   * Block contact
   */
  blockContact: (input: {
    /** contact_id */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ContactBlocked>;

  /**
   * Add tag to a conversation
   */
  attachTagToConversation: (input: {
    /** The unique identifier for the tag which is given by Intercom */
    id: string;
    /** The unique identifier for the admin which is given by Intercom. */
    admin_id: string;
    /** conversation_id */
    conversation_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Tag>;

  /**
   * Remove tag from a conversation
   */
  detachTagFromConversation: (input: {
    /** The unique identifier for the admin which is given by Intercom. */
    admin_id: string;
    /** conversation_id */
    conversation_id: string;
    /** tag_id */
    tag_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Tag>;

  /**
   * List all conversations
   */
  listConversations: (input: {
    /** How many results per page */
    per_page?: number;
    /** String used to get the next page of conversations. */
    starting_after?: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ConversationList>;

  /**
   * Creates a conversation
   */
  createConversation: (input: {
    from: { type: "lead" | "user" | "contact"; id: string };
    /** The content of the message. HTML is not supported. */
    body: string;
    /** The title of the email. Only applicable if the message type is email. */
    subject?: string;
    /** A list of image URLs that will be added as attachments. You can include up to 10 URLs. */
    attachment_urls?: (string)[];
    /** The time the conversation was created as a UTC Unix timestamp. If not provided, the current time will be used. This field is only recommneded for migrating past conversations from another source into Intercom. */
    created_at?: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Message>;

  /**
   * Retrieve a conversation
   */
  retrieveConversation: (input: {
    /** The id of the conversation to target */
    conversation_id: number;
    /** Set to plaintext to retrieve conversation messages in plain text. */
    display_as?: string;
    /** If set to true, conversation parts will be translated to the detected language of the conversation. */
    include_translations?: boolean;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Conversation>;

  /**
   * Update a conversation
   */
  updateConversation: (input: {
    /** Mark a conversation as read within Intercom. */
    read?: boolean;
    /** The title given to the conversation */
    title?: string;
    custom_attributes?: CustomAttributes;
    /** The ID of the company that the conversation is associated with. The unique identifier for the company which is given by Intercom. Set to nil to remove company. */
    company_id?: string;
    /** The id of the conversation to target */
    conversation_id: number;
    /** Set to plaintext to retrieve conversation messages in plain text. */
    display_as?: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Conversation>;

  /**
   * Delete a conversation
   */
  deleteConversation: (input: {
    /** id */
    conversation_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ConversationDeleted>;

  /**
   * Search conversations
   */
  searchConversations: (input: {
    query: SingleFilterSearchRequest | MultipleFilterSearchRequest;
    pagination?: StartingAfterPaging;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<ConversationList>;

  /**
   * Reply to a conversation
   */
  replyConversation: (input: {
    body?: ReplyConversationRequest;
    /** The Intercom provisioned identifier for the conversation or the string "last" to reply to the last part of the conversation */
    conversation_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Conversation>;

  /**
   * Manage a conversation
   */
  manageConversation: (input: {
    body?: CloseConversationRequest | SnoozeConversationRequest | OpenConversationRequest | AssignConversationRequest;
    /** The identifier for the conversation as given by Intercom. */
    conversation_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Conversation>;

  /**
   * Attach a contact to a conversation
   */
  attachContactToConversation: (input: {
    /** The `id` of the admin who is adding the new participant. */
    admin_id?: string;
    customer?: { intercom_user_id: string; customer?: CustomerRequest } | { user_id: string; customer?: CustomerRequest } | { email: string; customer?: CustomerRequest };
    /** The identifier for the conversation as given by Intercom. */
    conversation_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Conversation>;

  /**
   * Detach a contact from a group conversation
   */
  detachContactFromConversation: (input: {
    /** The `id` of the admin who is performing the action. */
    admin_id: string;
    /** The identifier for the conversation as given by Intercom. */
    conversation_id: string;
    /** The identifier for the contact as given by Intercom. */
    contact_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Conversation>;

  /**
   * Redact a conversation part
   */
  redactConversation: (input: {
    body?: RedactConversationRequest;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Conversation>;

  /**
   * Convert a conversation to a ticket
   */
  convertConversationToTicket: (input: {
    /** The ID of the type of ticket you want to convert the conversation to */
    ticket_type_id: string;
    attributes?: TicketRequestCustomAttributes;
    /** The id of the conversation to target */
    conversation_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Ticket>;

  /**
   * Create or Update a Custom Object Instance
   */
  createCustomObjectInstances: (input: {
    /** A unique identifier for the Custom Object instance in the external system it originated from. */
    external_id?: string;
    /** The time when the Custom Object instance was created in the external system it originated from. */
    external_created_at?: number | null;
    /** The time when the Custom Object instance was last updated in the external system it originated from. */
    external_updated_at?: number | null;
    /** The custom attributes which are set for the Custom Object instance. */
    custom_attributes?: { [key: string]: string | undefined } | null;
    /** The unique identifier of the custom object type that defines the structure of the custom object instance. */
    custom_object_type_identifier: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CustomObjectInstance>;

  /**
   * Get Custom Object Instance by External ID
   */
  getCustomObjectInstancesByExternalId: (input: {
    /** The unique identifier of the custom object type that defines the structure of the custom object instance. */
    custom_object_type_identifier: string;
    /** The unique identifier for the instance in the external system it originated from. */
    external_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CustomObjectInstance>;

  /**
   * Delete a Custom Object Instance by External ID
   */
  deleteCustomObjectInstancesById: (input: {
    /** The unique identifier of the custom object type that defines the structure of the custom object instance. */
    custom_object_type_identifier: string;
    /** The unique identifier for the instance in the external system it originated from. */
    external_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CustomObjectInstanceDeleted>;

  /**
   * Get Custom Object Instance by ID
   */
  getCustomObjectInstancesById: (input: {
    /** The unique identifier of the custom object type that defines the structure of the custom object instance. */
    custom_object_type_identifier: string;
    /** The id or external_id of the custom object instance */
    custom_object_instance_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CustomObjectInstance>;

  /**
   * Delete a Custom Object Instance by ID
   */
  deleteCustomObjectInstancesByExternalId: (input: {
    /** The unique identifier of the custom object type that defines the structure of the custom object instance. */
    custom_object_type_identifier: string;
    /** The Intercom defined id of the custom object instance */
    custom_object_instance_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CustomObjectInstanceDeleted>;

  /**
   * List all data attributes
   */
  lisDataAttributes: (input: {
    /** Specify the data attribute model to return. */
    model?: "contact" | "company" | "conversation";
    /** Include archived attributes in the list. By default we return only non archived data attributes. */
    include_archived?: boolean;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DataAttributeList>;

  /**
   * Create a data attribute
   */
  createDataAttribute: (input: {
    body?: CreateDataAttributeRequest;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DataAttribute>;

  /**
   * Update a data attribute
   */
  updateDataAttribute: (input: {
    body?: UpdateDataAttributeRequest;
    /** The data attribute id */
    data_attribute_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DataAttribute>;

  /**
   * Submit a data event
   */
  createDataEvent: (input: {
    body?: CreateDataEventRequest;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Error>;

  /**
   * List all data events
   */
  lisDataEvents: (input: {
    filter: { user_id: string } | { intercom_user_id: string } | { email: string };
    /** The value must be user */
    type: string;
    /** summary flag */
    summary?: boolean;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DataEventSummary>;

  /**
   * Create event summaries
   */
  dataEventSummaries: (input: {
    /** Your identifier for the user. */
    user_id?: string;
    /** A list of event summaries for the user. Each event summary should contain the event name, the time the event occurred, and the number of times the event occurred. The event name should be a past tense 'verb-noun' combination, to improve readability, for example `updated-plan`. */
    event_summaries?: { event_name?: string; count?: number; first?: number; last?: number };
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Error>;

  /**
   * Create content data export
   */
  createDataExport: (input: {
    /** The start date that you request data for. It must be formatted as a unix timestamp. */
    created_at_after: number;
    /** The end date that you request data for. It must be formatted as a unix timestamp. */
    created_at_before: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DataExport>;

  /**
   * Show content data export
   */
  getDataExport: (input: {
    /** job_identifier */
    job_identifier: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DataExport>;

  /**
   * Cancel content data export
   */
  cancelDataExport: (input: {
    /** job_identifier */
    job_identifier: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DataExport>;

  /**
   * Download content data export
   */
  downloadDataExport: (input: {
    /** job_identifier */
    job_identifier: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<unknown>;

  /**
   * Retrieve job status
   */
  jobsStatus: (input: {
    /** The unique identifier for the job which is given by Intercom */
    job_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Jobs>;

  /**
   * Create a message
   */
  createMessage: (input: {
    body?: CreateMessageRequest;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Message>;

  /**
   * List all news items
   */
  listNewsItems: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<PaginatedResponse>;

  /**
   * Create a news item
   */
  createNewsItem: (input: {
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
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<NewsItem>;

  /**
   * Retrieve a news item
   */
  retrieveNewsItem: (input: {
    /** The unique identifier for the news item which is given by Intercom. */
    news_item_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<NewsItem>;

  /**
   * Update a news item
   */
  updateNewsItem: (input: {
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
    /** The unique identifier for the news item which is given by Intercom. */
    news_item_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<NewsItem>;

  /**
   * Delete a news item
   */
  deleteNewsItem: (input: {
    /** The unique identifier for the news item which is given by Intercom. */
    news_item_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<DeletedObject>;

  /**
   * List all live newsfeed items
   */
  listLiveNewsfeedItems: (input: {
    /** The unique identifier for the news feed item which is given by Intercom. */
    newsfeed_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<PaginatedResponse>;

  /**
   * List all newsfeeds
   */
  listNewsfeeds: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<PaginatedResponse>;

  /**
   * Retrieve a newsfeed
   */
  retrieveNewsfeed: (input: {
    /** The unique identifier for the news feed item which is given by Intercom. */
    newsfeed_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Newsfeed>;

  /**
   * Retrieve a note
   */
  retrieveNote: (input: {
    /** The unique identifier of a given note */
    note_id: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Note>;

  /**
   * List all segments
   */
  listSegments: (input: {
    /** It includes the count of contacts that belong to each segment. */
    include_count?: boolean;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<SegmentList>;

  /**
   * Retrieve a segment
   */
  retrieveSegment: (input: {
    /** The unique identified of a given segment. */
    segment_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Segment>;

  /**
   * List subscription types
   */
  listSubscriptionTypes: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<SubscriptionTypeList>;

  /**
   * Create a phone Switch
   */
  createPhoneSwitch: (input: {
    /** Phone number in E.164 format, that will receive the SMS to continue the conversation in the Messenger. */
    phone: string;
    custom_attributes?: CustomAttributes;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<PhoneSwitch>;

  /**
   * List all calls
   */
  listCalls: (input: {
    /** The page of results to fetch. Defaults to first page */
    page?: number;
    /** How many results to display per page. Defaults to 25. Max 25. */
    per_page?: number;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<CallList>;

  /**
   * Get a call
   */
  showCall: (input: {
    /** The id of the call to retrieve */
    call_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Call>;

  /**
   * Get call recording by call id
   */
  showCallRecording: (input: {
    /** The id of the call */
    call_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Error>;

  /**
   * Get call transcript by call id
   */
  showCallTranscript: (input: {
    /** The id of the call */
    call_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<string>;

  /**
   * List calls with transcripts
   */
  listCallsWithTranscripts: (input: {
    /** A list of conversation ids to fetch calls for. Maximum 20. */
    conversation_ids: (string)[];
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<{ type?: string; data?: (Call & { transcript?: ({ [key: string]: unknown })[]; transcript_status?: string | null })[] }>;

  /**
   * List all tags
   */
  listTags: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TagList>;

  /**
   * Create or update a tag, Tag or untag companies, Tag contacts
   */
  createTag: (input: {
    body?: CreateOrUpdateTagRequest | TagCompanyRequest | UntagCompanyRequest | TagMultipleUsersRequest;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TagBasic>;

  /**
   * Find a specific tag
   */
  findTag: (input: {
    /** The unique identifier of a given tag */
    tag_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TagBasic>;

  /**
   * Delete tag
   */
  deleteTag: (input: {
    /** The unique identifier of a given tag */
    tag_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Error>;

  /**
   * List all teams
   */
  listTeams: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TeamList>;

  /**
   * Retrieve a team
   */
  retrieveTeam: (input: {
    /** The unique identifier of a given team. */
    team_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Team>;

  /**
   * List all ticket states
   */
  listTicketStates: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TicketStateList>;

  /**
   * Create a new attribute for a ticket type
   */
  createTicketTypeAttribute: (input: {
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
    /** The unique identifier for the ticket type which is given by Intercom. */
    ticket_type_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TicketTypeAttribute>;

  /**
   * Update an existing attribute for a ticket type
   */
  updateTicketTypeAttribute: (input: {
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
    /** The unique identifier for the ticket type which is given by Intercom. */
    ticket_type_id: string;
    /** The unique identifier for the ticket type attribute which is given by Intercom. */
    attribute_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TicketTypeAttribute>;

  /**
   * List all ticket types
   */
  listTicketTypes: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TicketTypeList>;

  /**
   * Create a ticket type
   */
  createTicketType: (input: {
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
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TicketType>;

  /**
   * Retrieve a ticket type
   */
  getTicketType: (input: {
    /** The unique identifier for the ticket type which is given by Intercom. */
    ticket_type_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TicketType>;

  /**
   * Update a ticket type
   */
  updateTicketType: (input: {
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
    /** The unique identifier for the ticket type which is given by Intercom. */
    ticket_type_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TicketType>;

  /**
   * Reply to a ticket
   */
  replyTicket: (input: {
    body?: ContactReplyTicketRequest | AdminReplyTicketRequest;
    /** The id of the ticket to target. {% admonition type="info" name="Not the Inbox ticket ID" %} This is the internal `id` field from the API response, not the `ticket_id` displayed in the Intercom Inbox (e.g., #12345). Use the `id` value from the ticket object returned by the API. {% /admonition %}  */
    ticket_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TicketReply>;

  /**
   * Add tag to a ticket
   */
  attachTagToTicket: (input: {
    /** The unique identifier for the tag which is given by Intercom */
    id: string;
    /** The unique identifier for the admin which is given by Intercom. */
    admin_id: string;
    /** ticket_id */
    ticket_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Tag>;

  /**
   * Remove tag from a ticket
   */
  detachTagFromTicket: (input: {
    /** The unique identifier for the admin which is given by Intercom. */
    admin_id: string;
    /** ticket_id */
    ticket_id: string;
    /** The unique identifier for the tag which is given by Intercom */
    tag_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Tag>;

  /**
   * Create a ticket
   */
  createTicket: (input: {
    /** Option to disable notifications when a Ticket is created. */
    skip_notifications?: boolean;
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
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Ticket>;

  /**
   * Enqueue create ticket
   */
  enqueueCreateTicket: (input: {
    /** Option to disable notifications when a Ticket is created. */
    skip_notifications?: boolean;
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
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Jobs>;

  /**
   * Update a ticket
   */
  updateTicket: (input: {
    /** Option to disable notifications when a Ticket is updated. */
    skip_notifications?: boolean;
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
    /** The unique identifier for the ticket which is given by Intercom. {% admonition type="info" name="Not the Inbox ticket ID" %} This is the internal `id` field from the API response, not the `ticket_id` displayed in the Intercom Inbox (e.g., #12345). Use the `id` value from the ticket object returned by the API. {% /admonition %}  */
    ticket_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Ticket>;

  /**
   * Retrieve a ticket
   */
  getTicket: (input: {
    /** The unique identifier for the ticket which is given by Intercom. {% admonition type="info" name="Not the Inbox ticket ID" %} This is the internal `id` field from the API response, not the `ticket_id` displayed in the Intercom Inbox (e.g., #12345). Use the `id` value from the ticket object returned by the API. {% /admonition %}  */
    ticket_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Ticket>;

  /**
   * Delete a ticket
   */
  deleteTicket: (input: {
    /** The unique identifier for the ticket which is given by Intercom. {% admonition type="info" name="Not the Inbox ticket ID" %} This is the internal `id` field from the API response, not the `ticket_id` displayed in the Intercom Inbox (e.g., #12345). Use the `id` value from the ticket object returned by the API. {% /admonition %}  */
    ticket_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TicketDeleted>;

  /**
   * Search tickets
   */
  searchTickets: (input: {
    query: SingleFilterSearchRequest | MultipleFilterSearchRequest;
    pagination?: StartingAfterPaging;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<TicketList>;

  /**
   * Update a visitor
   */
  updateVisitor: (input: {
    body?: UpdateVisitorRequest;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Visitor>;

  /**
   * Retrieve a visitor with User ID
   */
  retrieveVisitorWithUserId: (input: {
    /** The user_id of the Visitor you want to retrieve. */
    user_id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Visitor>;

  /**
   * Convert a visitor
   */
  convertVisitor: (input: {
    /** Represents the role of the Contact model. Accepts `lead` or `user`. */
    type: string;
    /** The unique identifiers retained after converting or merging. */
    user: unknown | unknown;
    /** The unique identifiers to convert a single Visitor. */
    visitor: unknown | unknown | unknown;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Contact>;

  /**
   * List all brands
   */
  listBrands: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<BrandList>;

  /**
   * Retrieve a brand
   */
  retrieveBrand: (input: {
    /** The unique identifier of the brand */
    id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<Brand>;

  /**
   * List all email settings
   */
  listEmails: (options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<EmailList>;

  /**
   * Retrieve an email setting
   */
  retrieveEmail: (input: {
    /** The unique identifier of the email setting */
    id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<EmailSetting>;

  /**
   * Register a Fin Voice call
   */
  registerFinVoiceCall: (input: {
    /** Phone number in E.164 format for the call */
    phone_number: string;
    /** External call identifier from the call provider */
    call_id: string;
    /** Source of the call. Can be "five9", "zoom_phone", or defaults to "aws_connect" */
    source?: "five9" | "zoom_phone" | "aws_connect";
    /** Additional metadata about the call */
    data?: { [key: string]: unknown } | null;
  }) => Promise<AiCallResponse>;

  /**
   * Collect Fin Voice call by ID
   */
  collectFinVoiceCallById: (input: {
    /** The external reference ID */
    id: number;
  }) => Promise<AiCallResponse>;

  /**
   * Collect Fin Voice call by external ID
   */
  collectFinVoiceCallByExternalId: (input: {
    /** The external call identifier from the call provider */
    external_id: string;
  }) => Promise<AiCallResponse>;

  /**
   * Collect Fin Voice call by phone number
   */
  collectFinVoiceCallByPhoneNumber: (input: {
    /** Phone number in E.164 format */
    phone_number: string;
  }) => Promise<Error>;

  /**
   * Collect Fin Voice calls by conversation ID
   */
  collectFinVoiceCallsByConversationId: (input: {
    /** The Intercom conversation identifier */
    conversation_id: string;
  }) => Promise<(AiCallResponse)[]>;

  /**
   * Export a workflow
   */
  exportWorkflow: (input: {
    /** The unique identifier for the workflow */
    id: string;
  }, options?: { headers?: { "Intercom-Version"?: "1.0" | "1.1" | "1.2" | "1.3" | "1.4" | "2.0" | "2.1" | "2.2" | "2.3" | "2.4" | "2.5" | "2.6" | "2.7" | "2.8" | "2.9" | "2.10" | "2.11" | "2.12" | "2.13" | "2.14" } }) => Promise<WorkflowExport>;
};

export * from "./schemas.js";
