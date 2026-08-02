import type { AdvancedStatsClicks, AdvancedStatsClicksOpens, AdvancedStatsMailboxProvider, AdvancedStatsOpens, AllSegmentsResponse, ApiKeyNameId, ApiKeyNameIdScopes, AuthenticationDomain, AutomationsLinkStatsResponse, AutomationsResponse, BlocksResponse, BounceResponse, CampaignResponse, CategoryStats, CcBccEmailObject, ClickTracking, ContactDetails2, ContactDetails3, ContactExport, ContactImport, ContactRequest, ContactdbCustomFieldWithId, ContactdbList, ContactdbRecipient, ContactdbRecipientCount, ContactdbRecipientResponse, ContactdbSegments, ContactdbSegmentsConditions, ContactdbSegmentsWithId, CustomFieldDefinitionsResponse, DesignOutput, DesignOutputSummary, DomainAuthentication200Response, DomainAuthenticationDomainSpf, EmailActivityResponseCommonFields, EnforcedTlsRequestResponse, Error, ErrorsSegV2, EventWebhookResponse, FromEmailObject, FullSegment, GlobalErrorResponseSchema, GoogleAnalyticsSettings, InvalidEmail, IpAccessResponse, IpPoolResponse, IpWarmupResponse, LinkBranding200Response, List, MailBatchId, MailSettingsAddressWhitelabel, MailSettingsBouncePurge, MailSettingsFooter, MailSettingsForwardBounce, MailSettingsForwardSpam, MailSettingsTemplate, Metadata, Metadata2, Monitor, ParseSetting, PartnerSettingsNewRelic, ReplyToEmailObject, ReservedFieldDefinitionsResponse, ReverseDns, SegmentResponse, SegmentSummary, Selfmetadata, SenderId, SinglesendResponse, SinglesendResponseShort, SinglesendSchedule, SinglesendsLinkStatsResponse, SinglesendsResponse, SpamReportsResponse, SsoCertificateBody, SsoErrorResponse, SsoIntegration, SsoTeammateResponse, SsoTeammatesPatchResponse, StatsAdvancedGlobalStats, SubscriptionTrackingSettings, Subuser, SubuserPost, SubuserStats, SuppressionGroup, SuppressionGroupRequestBase, ToEmailArray, TransactionalTemplate, TransactionalTemplateVersionOutput, TransactionalTemplatesTemplateLean, UserProfile, UserScheduledSendStatus, VerifiedSenderResponseSchema } from "./schemas.js";

export type SendgridClient = {
  /**
   * Retrieve all recent access attempts
   */
  getAccessSettingsActivity: (input: {
    /** Limits the number of IPs to return. */
    limit?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result: ({ allowed: boolean; auth_method: string; first_at: number; ip: string; last_at: number; location: string })[] }>;

  /**
   * Remove one or more IPs from the allow list
   */
  deleteAccessSettingsWhitelist: (input: {
    /** An array of the IDs of the IP address that you want to remove from your allow list. */
    ids?: (number)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a list of currently allowed IPs
   */
  getAccessSettingsWhitelist: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<IpAccessResponse>;

  /**
   * Add one or more IPs to the allow list
   */
  postAccessSettingsWhitelist: (input: {
    /** An array containing the IP(s) you want to allow. */
    ips: ({ ip: string })[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<IpAccessResponse>;

  /**
   * Remove a specific IP from the allowed list
   */
  deleteAccessSettingsWhitelistRuleId: (input: {
    /** The ID of the allowed IP address that you want to retrieve. */
    rule_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a specific allowed IP
   */
  getAccessSettingsWhitelistRuleId: (input: {
    /** The ID of the allowed IP address that you want to retrieve. */
    rule_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<IpAccessResponse>;

  /**
   * Retrieve all alerts
   */
  getAlerts: (options?: { headers?: { Authorization?: string; "on-behalf-of"?: string } }) => Promise<({ created_at: number; email_to: string; frequency?: string; id: number; percentage?: number; type: "usage_limit" | "stats_notification"; updated_at?: number })[]>;

  /**
   * Create a new Alert
   */
  postAlerts: (input: {
    /** The email address the alert will be sent to. Example: test@example.com */
    email_to: string | null;
    /** Required for stats_notification. How frequently the alert will be sent. Example: daily */
    frequency?: string;
    /** Required for usage_alert. When this usage threshold is reached, the alert will be sent. Example: 90 */
    percentage?: number;
    /** The type of alert you want to create. Can be either usage_limit or stats_notification. Example: usage_limit */
    type: "stats_notification" | "usage_limit";
  }, options?: { headers?: { Authorization?: string; "on-behalf-of"?: string } }) => Promise<{ created_at: number; email_to: string; frequency?: string; id: number; percentage?: number; type: string; updated_at: number }>;

  /**
   * Delete an alert
   */
  deleteAlertsAlertId: (input: {
    /** The ID of the alert you would like to retrieve. */
    alert_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a specific alert
   */
  getAlertsAlertId: (input: {
    /** The ID of the alert you would like to retrieve. */
    alert_id: number;
  }, options?: { headers?: { Authorization?: string; "on-behalf-of"?: string } }) => Promise<{ created_at: number; email_to: string; frequency?: string; id: number; percentage?: number; type: "usage_alert" | "stats_notification"; updated_at: number }>;

  /**
   * Update an alert
   */
  patchAlertsAlertId: (input: {
    /** The new email address you want your alert to be sent to. Example: test@example.com */
    email_to?: string;
    /** The new frequency at which to send the stats_notification alert. Example: monthly */
    frequency?: string;
    /** The new percentage threshold at which the usage_limit alert will be sent. Example: 90 */
    percentage?: number;
    /** The ID of the alert you would like to retrieve. */
    alert_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ created_at: number; email_to: string; frequency?: string; id: number; percentage?: number; type: "usage_alert" | "stats_notification"; updated_at: number }>;

  /**
   * Retrieve all API Keys belonging to the authenticated user
   */
  getApiKeys: (input: {
    limit?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result?: (ApiKeyNameId)[] }>;

  /**
   * Create API keys
   */
  createApiKeys: (input: {
    /** The name you will use to describe this API Key. */
    name: string;
    /** The individual permissions that you are giving to this API Key. */
    scopes?: (string)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ api_key?: string; api_key_id?: string; name?: string; scopes?: (string)[] }>;

  /**
   * Delete API keys
   */
  deleteApiKeysApiKeyId: (input: {
    api_key_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<GlobalErrorResponseSchema>;

  /**
   * Retrieve an existing API Key
   */
  getApiKeysApiKeyId: (input: {
    api_key_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result?: (ApiKeyNameIdScopes)[] }>;

  /**
   * Update API key name
   */
  patchApiKeysApiKeyId: (input: {
    /** The new name of the API Key. */
    name: string;
    api_key_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ApiKeyNameId>;

  /**
   * Update API key name and scopes
   */
  putApiKeysApiKeyId: (input: {
    name: string;
    scopes?: (string)[];
    api_key_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ApiKeyNameIdScopes>;

  /**
   * Retrieve all suppression groups associated with the user.
   */
  getAsmGroups: (input: {
    id?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(SuppressionGroup)[]>;

  /**
   * Create a new suppression group
   */
  postAsmGroups: (input: {
    /** A brief description of your suppression group. Required when creating a group. */
    description?: string;
    /** Indicates if you would like this to be your default suppression group. */
    is_default?: boolean;
    /** The name of your suppression group. Required when creating a group. */
    name?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ description: string; id: number; is_default: boolean; name: string }>;

  /**
   * Delete a Suppression Group
   */
  deleteAsmGroupsGroupId: (input: {
    /** The ID of the suppression group you would like to retrieve. */
    group_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Get information on a single suppression group.
   */
  getAsmGroupsGroupId: (input: {
    /** The ID of the suppression group you would like to retrieve. */
    group_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<SuppressionGroupRequestBase & { id: number; last_email_sent_at?: string | null; unsubscribes?: number }>;

  /**
   * Update a suppression group.
   */
  patchAsmGroupsGroupId: (input: {
    /** A brief description of your suppression group. Required when creating a group. */
    description?: string;
    /** Indicates if you would like this to be your default suppression group. */
    is_default?: boolean;
    /** The name of your suppression group. Required when creating a group. */
    name?: string;
    /** The ID of the suppression group you would like to retrieve. */
    group_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<SuppressionGroup>;

  /**
   * Retrieve all suppressions for a suppression group
   */
  getAsmGroupsGroupIdSuppressions: (input: {
    /** The id of the unsubscribe group that you are adding suppressions to. */
    group_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(string)[]>;

  /**
   * Add suppressions to a suppression group
   */
  postAsmGroupsGroupIdSuppressions: (input: {
    /** The array of email addresses to add or find. */
    recipient_emails: (string)[];
    /** The id of the unsubscribe group that you are adding suppressions to. */
    group_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ recipient_emails?: (string)[] }>;

  /**
   * Search for suppressions within a group
   */
  postAsmGroupsGroupIdSuppressionsSearch: (input: {
    /** The array of email addresses to add or find. */
    recipient_emails: (string)[];
    /** The ID of the suppression group that you would like to search. */
    group_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(string)[]>;

  /**
   * Delete a suppression from a suppression group
   */
  deleteAsmGroupsGroupIdSuppressionsEmail: (input: {
    /** The id of the suppression group that you are removing an email address from. */
    group_id: string;
    /** The email address that you want to remove from the suppression group. */
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Retrieve all suppressions
   */
  getAsmSuppressions: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ created_at: number; email: string; group_id: number; group_name: string })[]>;

  /**
   * Add recipient addresses to the global suppression group.
   */
  postAsmSuppressionsGlobal: (input: {
    /** The array of email addresses to add or find. */
    recipient_emails: (string)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ recipient_emails: (string)[] }>;

  /**
   * Delete a Global Suppression
   */
  deleteAsmSuppressionsGlobalEmail: (input: {
    /** The email address of the global suppression you want to retrieve. Or, if you want to check if an email address is on the global suppressions list, enter that email address here. */
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a Global Suppression
   */
  getAsmSuppressionsGlobalEmail: (input: {
    /** The email address of the global suppression you want to retrieve. Or, if you want to check if an email address is on the global suppressions list, enter that email address here. */
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ recipient_email: string }>;

  /**
   * Retrieve all suppression groups for an email address
   */
  getAsmSuppressionsEmail: (input: {
    /** The email address that you want to search suppression groups for. */
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ suppressions: ({ description: string; id: number; is_default: boolean; name: string; suppressed: boolean })[] }>;

  /**
   * Retrieve email statistics by browser.
   */
  getBrowsersStats: (input: {
    /** The browsers to get statistics for. You can include up to 10 different browsers by including this parameter multiple times. */
    browsers?: string;
    /** The number of results to return. */
    limit?: number;
    /** The point in the list to begin retrieving results. */
    offset?: number;
    /** How to group the statistics. Must be either "day", "week", or "month". */
    aggregated_by?: "day" | "week" | "month";
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD. */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD. */
    end_date?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ date?: string; stats?: ({ metrics?: AdvancedStatsClicks; name?: string; type?: string })[] })[]>;

  /**
   * Retrieve all Campaigns
   */
  getCampaigns: (input: {
    /** The number of results you would like to receive at a time. */
    limit?: number;
    /** The index of the first campaign to return, where 0 is the first campaign. */
    offset?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result?: (CampaignResponse)[] }>;

  /**
   * Create a Campaign
   */
  postCampaigns: (input: {
    /** The categories you would like associated to this campaign. */
    categories?: (string)[] | null;
    /** This is the url of the custom unsubscribe page that you provide for customers to unsubscribe from your suppression groups. */
    custom_unsubscribe_url?: string | null;
    /** The editor used in the UI. */
    editor?: "code" | "design";
    /** The HTML of your marketing email. */
    html_content?: string | null;
    /** The pool of IPs that you would like to send this email from. */
    ip_pool?: string | null;
    /** The IDs of the lists you are sending this campaign to. You can have both segment IDs and list IDs */
    list_ids?: (number)[] | null;
    /** The plain text content of your emails. */
    plain_content?: string | null;
    /** The segment IDs that you are sending this list to. You can have both segment IDs and list IDs. Segments are limited to 10 segment IDs. */
    segment_ids?: (number)[] | null;
    /** The ID of the "sender" identity that you have created. Your recipients will see this as the "from" on your marketing emails. */
    sender_id?: number | null;
    /** The subject of your campaign that your recipients will see. */
    subject?: string | null;
    /** The suppression group that this marketing email belongs to, allowing recipients to opt-out of emails of this type. */
    suppression_group_id?: number | null;
    /** The display title of your campaign. This will be viewable by you in the Marketing Campaigns UI. */
    title: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<CampaignResponse>;

  /**
   * Delete a Campaign
   */
  deleteCampaignsCampaignId: (input: {
    /** The id of the campaign you would like to retrieve. */
    campaign_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Retrieve a single campaign
   */
  getCampaignsCampaignId: (input: {
    /** The id of the campaign you would like to retrieve. */
    campaign_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ categories?: (string)[]; custom_unsubscribe_url?: string; html_content?: string; id?: number; ip_pool?: string; list_ids?: (number)[]; plain_content?: string; segment_ids?: (number)[]; sender_id?: number; status?: string; subject?: string; suppression_group_id?: number; title?: string }>;

  /**
   * Update a Campaign
   */
  patchCampaignsCampaignId: (input: {
    /** The categories you want to tag on this campaign. */
    categories: (string)[];
    /** The HTML content of this campaign. */
    html_content: string;
    /** The plain content of this campaign. */
    plain_content: string;
    /** The subject line for your campaign. */
    subject: string;
    /** The title of the campaign. */
    title: string;
    /** The id of the campaign you would like to retrieve. */
    campaign_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<CampaignResponse>;

  /**
   * Unschedule a Scheduled Campaign
   */
  deleteCampaignsCampaignIdSchedules: (input: {
    campaign_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * View Scheduled Time of a Campaign
   */
  getCampaignsCampaignIdSchedules: (input: {
    campaign_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ send_at: number }>;

  /**
   * Update a Scheduled Campaign
   */
  patchCampaignsCampaignIdSchedules: (input: {
    send_at: number;
    campaign_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ id: number; send_at: number; status: string }>;

  /**
   * Schedule a Campaign
   */
  postCampaignsCampaignIdSchedules: (input: {
    /** The unix timestamp for the date and time you would like your campaign to be sent out. */
    send_at: number;
    campaign_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ id: number; send_at: number; status: "Scheduled" }>;

  /**
   * Send a Campaign
   */
  postCampaignsCampaignIdSchedulesNow: (input: {
    campaign_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ id: number; status: string }>;

  /**
   * Send a Test Campaign
   */
  postCampaignsCampaignIdSchedulesTest: (input: {
    /** The email address that should receive the test campaign. */
    to: string;
    campaign_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ to: string }>;

  /**
   * Retrieve all categories
   */
  getCategories: (input: {
    /** The number of categories to display per page. */
    limit?: number;
    /** Allows you to perform a prefix search on this particular category. */
    category?: string;
    /** The point in the list that you would like to begin displaying results. */
    offset?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ category: string })[]>;

  /**
   * Retrieve Email Statistics for Categories
   */
  getCategoriesStats: (input: {
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD. */
    end_date?: string;
    /** The individual categories that you want to retrieve statistics for. You may include up to 10 different categories. */
    categories: string;
    /** The number of results to include. */
    limit?: number;
    /** The number of results to skip. */
    offset?: number;
    /** How to group the statistics. Must be either "day", "week", or "month". */
    aggregated_by?: "day" | "week" | "month";
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(CategoryStats)[]>;

  /**
   * Retrieve sums of email stats for each category [Needs: Stats object defined, has category ID?]
   */
  getCategoriesStatsSums: (input: {
    /** The metric that you want to sort by.  Must be a single metric. */
    sort_by_metric?: string;
    /** The direction you want to sort. */
    sort_by_direction?: "desc" | "asc";
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD. */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD. */
    end_date?: string;
    /** Limits the number of results returned. */
    limit?: number;
    /** The point in the list to begin retrieving results. */
    offset?: number;
    /** How to group the statistics. Must be either "day", "week", or "month". */
    aggregated_by?: "day" | "week" | "month";
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<CategoryStats>;

  /**
   * Retrieve email statistics by client type.
   */
  getClientsStats: (input: {
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD. */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD. */
    end_date?: string;
    /** How to group the statistics. Must be either "day", "week", or "month". */
    aggregated_by?: "day" | "week" | "month";
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ date?: string; stats?: ({ metrics?: AdvancedStatsOpens; name?: string; type?: string })[] })[]>;

  /**
   * Retrieve stats by a specific client type.
   */
  getClientsClientTypeStats: (input: {
    /** Specifies the type of client to retrieve stats for. Must be either "phone", "tablet", "webmail", or "desktop". */
    client_type: "phone" | "tablet" | "webmail" | "desktop";
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD. */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD. */
    end_date?: string;
    /** How to group the statistics. Must be either "day", "week", or "month". */
    aggregated_by?: "day" | "week" | "month";
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ date?: string; stats?: ({ metrics?: AdvancedStatsOpens; name?: string; type?: string })[] })[]>;

  /**
   * Retrieve all custom fields
   */
  getContactdbCustomFields: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ custom_fields: (ContactdbCustomFieldWithId)[] }>;

  /**
   * Create a Custom Field
   */
  postContactdbCustomFields: (input: {
    name?: string;
    type?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbCustomFieldWithId>;

  /**
   * Delete a Custom Field
   */
  deleteContactdbCustomFieldsCustomFieldId: (input: {
    /** The ID of the custom field that you want to retrieve. */
    custom_field_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<GlobalErrorResponseSchema>;

  /**
   * Retrieve a Custom Field
   */
  getContactdbCustomFieldsCustomFieldId: (input: {
    /** The ID of the custom field that you want to retrieve. */
    custom_field_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbCustomFieldWithId>;

  /**
   * Delete Multiple lists
   */
  deleteContactdbLists: (input: {
    body?: (number)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Retrieve all lists
   */
  getContactdbLists: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ lists: (ContactdbList)[] }>;

  /**
   * Create a List
   */
  postContactdbLists: (input: {
    name: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbList>;

  /**
   * Delete a List
   */
  deleteContactdbListsListId: (input: {
    body?: unknown;
    list_id: string;
    /** Adds the ability to delete all contacts on the list in addition to deleting the list. */
    delete_contacts?: true | false;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Retrieve a single list
   */
  getContactdbListsListId: (input: {
    /** The ID of the list to retrieve. */
    list_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbList>;

  /**
   * Update a List
   */
  patchContactdbListsListId: (input: {
    /** The new name for your list.  */
    name: string;
    /** The ID of the list you are updating. */
    list_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ id?: number; name?: string; recipient_count?: number }>;

  /**
   * Retrieve all recipients on a List
   */
  getContactdbListsListIdRecipients: (input: {
    /** The ID of the list whose recipients you are requesting. */
    list_id: number;
    /** Page index of first recipient to return (must be a positive integer) */
    page?: number;
    /** Number of recipients to return at a time (must be a positive integer between 1 and 1000) */
    page_size?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ recipients?: (ContactdbRecipient)[] }>;

  /**
   * Add Multiple Recipients to a List
   */
  postContactdbListsListIdRecipients: (input: {
    body?: (number)[];
    /** The id of the list of recipients you want to retrieve. */
    list_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Delete a Single Recipient from a Single List
   */
  deleteContactdbListsListIdRecipientsRecipientId: (input: {
    body?: unknown;
    /** The ID of the list you are taking this recipient away from. */
    list_id: number;
    /** The ID of the recipient to take off the list. */
    recipient_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Add a Single Recipient to a List
   */
  postContactdbListsListIdRecipientsRecipientId: (input: {
    /** The ID of the list that you want to add the recipient to. */
    list_id: number;
    /** The ID of the recipient you are adding to the list. */
    recipient_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Delete Recipients
   */
  deleteContactdbRecipients: (input: {
    body?: (string)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve recipients
   */
  getContactdbRecipients: (input: {
    /** Page index of first recipients to return (must be a positive integer) */
    page?: number;
    /** Number of recipients to return at a time (must be a positive integer between 1 and 1000) */
    page_size?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ recipients: ({ [key: string]: unknown })[] }>;

  /**
   * Update Recipient
   */
  patchContactdbRecipients: (input: {
    body?: ({ email: string; first_name?: string; last_name?: string })[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbRecipientResponse>;

  /**
   * Add recipients
   */
  postContactdbRecipients: (input: {
    body?: ({ age?: number; email: string; first_name?: string; last_name?: string })[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbRecipientResponse>;

  /**
   * Retrieve the count of billable recipients
   */
  getContactdbRecipientsBillableCount: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbRecipientCount>;

  /**
   * Retrieve a Count of Recipients
   */
  getContactdbRecipientsCount: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbRecipientCount>;

  /**
   * Search recipients
   */
  getContactdbRecipientsSearch: (input: {
    "{field_name}"?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ recipients?: (ContactdbRecipient)[] }>;

  /**
   * Search recipients
   */
  postContactdbRecipientsSearch: (input: {
    conditions: (unknown)[];
    list_id: number;
  }) => Promise<{ recipient_count?: number; recipients?: ({ created_at?: number; custom_fields?: ({ id?: number; name?: string; type?: string; value?: number | string })[]; email?: string; first_name?: string; id?: string; last_clicked?: number; last_emailed?: number; last_opened?: number; updated_at?: number })[] }>;

  /**
   * Delete a Recipient
   */
  deleteContactdbRecipientsRecipientId: (input: {
    /** The ID of the recipient that you want to retrieve. */
    recipient_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a single recipient
   */
  getContactdbRecipientsRecipientId: (input: {
    /** The ID of the recipient that you want to retrieve. */
    recipient_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbRecipient>;

  /**
   * Retrieve the lists that a recipient is on
   */
  getContactdbRecipientsRecipientIdLists: (input: {
    /** The ID of the recipient for whom you are retrieving lists. */
    recipient_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ lists?: (ContactdbList)[] }>;

  /**
   * Retrieve reserved fields
   */
  getContactdbReservedFields: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ reserved_fields?: ({ name?: string; type?: string })[] }>;

  /**
   * Retrieve all segments
   */
  getContactdbSegments: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ segments: (ContactdbSegments)[] }>;

  /**
   * Create a Segment
   */
  postContactdbSegments: (input: {
    /** The conditions for a recipient to be included in this segment. */
    conditions: (ContactdbSegmentsConditions)[];
    /** The list id from which to make this segment. Not including this ID will mean your segment is created from the main contactdb rather than a list. */
    list_id?: number;
    /** The name of this segment. */
    name: string;
    /** The count of recipients in this list. This is not included on creation of segments. */
    recipient_count?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbSegmentsWithId>;

  /**
   * Delete a segment
   */
  deleteContactdbSegmentsSegmentId: (input: {
    body?: unknown;
    segment_id: string;
    /** True to delete all contacts matching the segment in addition to deleting the segment */
    delete_contacts?: boolean;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Retrieve a segment
   */
  getContactdbSegmentsSegmentId: (input: {
    /** The ID of the segment you want to request. */
    segment_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbSegments>;

  /**
   * Update a segment
   */
  patchContactdbSegmentsSegmentId: (input: {
    /** The conditions by which this segment should be created. */
    conditions?: (ContactdbSegmentsConditions)[];
    /** The list ID you would like this segment to be built from. */
    list_id?: number;
    name: string;
    /** The ID of the segment you are updating. */
    segment_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ContactdbSegments>;

  /**
   * Retrieve recipients on a segment
   */
  getContactdbSegmentsSegmentIdRecipients: (input: {
    /** The ID of the segment from which you want to retrieve recipients. */
    segment_id: number;
    page?: number;
    page_size?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ recipients: (ContactdbRecipient)[] }>;

  /**
   * Get Recipient Upload Status
   */
  getContactdbStatus: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ status?: ({ ""?: string; id?: string; value?: string })[] }>;

  /**
   * List Designs
   */
  listDesigns: (input: {
    /** number of results to return */
    page_size?: number;
    /** token corresponding to a specific page of results, as provided by metadata */
    page_token?: string;
    /** set to false to return all fields */
    summary?: boolean;
  }) => Promise<{ _metadata?: Metadata; result?: (DesignOutputSummary)[] }>;

  /**
   * Create Design
   */
  postDesigns: (input: {
    /** The editor used in the UI. */
    editor?: "code" | "design";
    /** The name of the new design. */
    name?: string;
    /** The list of categories applied to the design */
    categories?: (string)[];
    /** If true, plain_content is always generated from html_content. If false, plain_content is not altered. */
    generate_plain_content?: boolean;
    /** Subject of the Design. */
    subject?: string;
    /** The HTML content of the Design. */
    html_content: string;
    /** Plain text content of the Design. */
    plain_content?: string;
  }) => Promise<DesignOutput>;

  /**
   * List SendGrid Pre-built Designs
   */
  listSendgridPreBuiltDesigns: (input: {
    /** number of results to return */
    page_size?: number;
    /** token corresponding to a specific page of results, as provided by metadata */
    page_token?: string;
    /** set to false to return all fields */
    summary?: boolean;
  }) => Promise<{ _metadata?: Metadata; result?: (DesignOutputSummary)[] }>;

  /**
   * Get SendGrid Pre-built Design
   */
  getSendgridPreBuiltDesign: (input: {
    /** The ID of the pre-built Design you want to duplicate. */
    id: string;
  }) => Promise<DesignOutput>;

  /**
   * Duplicate SendGrid Pre-built Design
   */
  postSendgridPreBuiltDesign: (input: {
    /** The editor used in the UI. */
    editor?: "code" | "design";
    /** The name of the new design. */
    name?: string;
    /** The ID of the pre-built Design you want to duplicate. */
    id: string;
  }) => Promise<DesignOutput>;

  /**
   * Delete Design
   */
  deleteDesign: (input: {
    /** The ID of the Design you want to duplicate. */
    id: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Get Design
   */
  getDesign: (input: {
    /** The ID of the Design you want to duplicate. */
    id: string;
  }) => Promise<DesignOutput>;

  /**
   * Update Design
   */
  putDesign: (input: {
    /** The list of categories applied to the design */
    categories?: (string)[];
    /** If true, plain_content is always generated from html_content. If false, plain_content is not altered. */
    generate_plain_content?: boolean;
    /** The HTML content of the Design. */
    html_content?: string;
    /** Name of the Design. */
    name?: string;
    /** Plain text content of the Design. */
    plain_content?: string;
    /** Subject of the Design. */
    subject?: string;
    /** The ID of the Design you want to duplicate. */
    id: string;
  }) => Promise<DesignOutput>;

  /**
   * Duplicate Design
   */
  postDesign: (input: {
    /** The editor used in the UI. */
    editor?: "code" | "design";
    /** The name of the new design. */
    name?: string;
    /** The ID of the Design you want to duplicate. */
    id: string;
  }) => Promise<DesignOutput>;

  /**
   * Retrieve email statistics by device type.
   */
  getDevicesStats: (input: {
    /** The number of results to return. */
    limit?: number;
    /** The point in the list to begin retrieving results. */
    offset?: number;
    /** How to group the statistics. Must be either "day", "week", or "month". */
    aggregated_by?: "day" | "week" | "month";
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD. */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD. */
    end_date?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ date?: string; stats?: ({ metrics?: AdvancedStatsOpens; name?: string; type?: string })[] })[]>;

  /**
   * Retrieve email statistics by country and state/province.
   */
  getGeoStats: (input: {
    /** The country you would like to see statistics for. Currently only supported for US and CA. */
    country?: "US" | "CA";
    /** The number of results to return. */
    limit?: number;
    /** The point in the list to begin retrieving results. */
    offset?: number;
    /** How to group the statistics. Must be either "day", "week", or "month". */
    aggregated_by?: "day" | "week" | "month";
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD. */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD. */
    end_date?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ date?: string; stats?: ({ metrics?: AdvancedStatsClicksOpens; name?: string; type?: string })[] })[]>;

  /**
   * Retrieve all IP addresses
   */
  getIps: (input: {
    /** The IP address to get */
    ip?: string;
    /** Should we exclude reverse DNS records (whitelabels)? */
    exclude_whitelabels?: boolean;
    /** The number of IPs you want returned at the same time. */
    limit?: number;
    /** The offset for the number of IPs that you are requesting. */
    offset?: number;
    /** The subuser you are requesting for. */
    subuser?: string;
    /** The direction to sort the results. */
    sort_by_direction?: "desc" | "asc";
  }) => Promise<({ assigned_at: number | null; ip: string; pools: (string)[]; rdns?: string; start_date: number | null; subusers: (string)[]; warmup: boolean; whitelabeled: boolean })[]>;

  /**
   * Add IPs
   */
  postIps: (input: {
    /** The amount of IPs to add to the account. */
    count: number;
    /** Array of usernames to be assigned a send IP. */
    subusers?: (string)[];
    /** Whether or not to warmup the IPs being added. */
    warmup?: boolean;
  }) => Promise<{ ips: ({ ip: string; subusers: (string)[] })[]; remaining_ips: number; warmup: boolean }>;

  /**
   * Retrieve all assigned IPs
   */
  getIpsAssigned: () => Promise<({ ip: string; pools: (string)[]; start_date: number; warmup: boolean })[]>;

  /**
   * Retrieve all IP pools
   */
  getIpsPools: () => Promise<(IpPoolResponse)[]>;

  /**
   * Create an IP pool
   */
  postIpsPools: (input: {
    /** The name of your new IP pool. */
    name: string;
  }) => Promise<IpPoolResponse>;

  /**
   * Delete an IP pool
   */
  deleteIpsPoolsPoolName: (input: {
    /** The name of the IP pool that you want to retrieve the IP addresses for. */
    pool_name: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve all the IPs in a specified pool
   */
  getIpsPoolsPoolName: (input: {
    /** The name of the IP pool that you want to retrieve the IP addresses for. */
    pool_name: string;
  }) => Promise<{ ips?: (string)[]; pool_name?: string }>;

  /**
   * Rename an IP pool
   */
  putIpsPoolsPoolName: (input: {
    /** The new name for your IP pool. */
    name?: string;
    /** The name of the IP pool that you want to retrieve the IP addresses for. */
    pool_name: string;
  }) => Promise<IpPoolResponse>;

  /**
   * Add an IP address to a pool
   */
  postIpsPoolsPoolNameIps: (input: {
    /** The IP address that you want to add to the named pool. */
    ip?: string;
    /** The name of the IP pool you want to add the address to. If the name contains spaces, they must be URL encoded (e.g., "Test Pool" becomes "Test%20Pool"). */
    pool_name: string;
  }) => Promise<{ ip: string; pools: (string)[]; start_date: number; warmup: boolean }>;

  /**
   * Remove an IP address from a pool
   */
  deleteIpsPoolsPoolNameIpsIp: (input: {
    /** The name of the IP pool that you are removing the IP address from. */
    pool_name: string;
    /** The IP address that you wish to remove. */
    ip: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Get remaining IPs count
   */
  getIpsRemaining: () => Promise<{ results: ({ period: string; price_per_ip: number; remaining: number })[] }>;

  /**
   * Retrieve all IPs currently in warmup
   */
  getIpsWarmup: () => Promise<IpWarmupResponse>;

  /**
   * Start warming up an IP address
   */
  postIpsWarmup: (input: {
    /** The IP address that you want to begin warming up. */
    ip?: string;
  }) => Promise<IpWarmupResponse>;

  /**
   * Stop warming up an IP address
   */
  deleteIpsWarmupIpAddress: (input: {
    /** The IP address that you want to retrieve the warmup status for. */
    ip_address: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve the warmup status for a specific IP address
   */
  getIpsWarmupIpAddress: (input: {
    /** The IP address that you want to retrieve the warmup status for. */
    ip_address: string;
  }) => Promise<IpWarmupResponse>;

  /**
   * Retrieve all IP pools an IP address belongs to
   */
  getIpsIpAddress: (input: {
    /** The IP address you are retrieving the IP pools for. */
    ip_address: string;
  }) => Promise<{ ip: string; pools: (string)[]; rdns: string; start_date: number | null; subusers: (string)[]; warmup: boolean; whitelabeled: boolean }>;

  /**
   * Create a batch ID
   */
  postMailBatch: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailBatchId>;

  /**
   * Validate batch ID
   */
  getMailBatchBatchId: (input: {
    batch_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailBatchId>;

  /**
   * v3 Mail Send
   */
  postMailSend: (input: {
    /** An object allowing you to specify how to handle unsubscribes. */
    asm?: { group_id: number; groups_to_display?: (number)[] };
    /** An array of objects where you can specify any attachments you want to include. */
    attachments?: ({ content: string; content_id?: string; disposition?: "inline" | "attachment"; filename: string; type?: string })[];
    /** An ID representing a batch of emails to be sent at the same time. Including a `batch_id` in your request allows you include this email in that batch. It also enables you to cancel or pause the delivery of that batch. For more information, see the [Cancel Scheduled Sends API](https://sendgrid.com/docs/api-reference/). */
    batch_id?: string;
    /** An array of category names for this message. Each category name may not exceed 255 characters.  */
    categories?: (string)[];
    /** An array where you can specify the content of your email. You can include multiple [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of content, but you must specify at least one MIME type. To include more than one MIME type, add another object to the array containing the `type` and `value` parameters. */
    content: ({ type: string; value: string })[];
    /** Values that are specific to the entire send that will be carried along with the email and its activity data.  Key/value pairs must be strings. Substitutions will not be made on custom arguments, so any string that is entered into this parameter will be assumed to be the custom argument that you would like to be used. This parameter is overridden by `custom_args` set at the personalizations level. Total `custom_args` size may not exceed 10,000 bytes. */
    custom_args?: string;
    from: FromEmailObject;
    /** An object containing key/value pairs of header names and the value to substitute for them. The key/value pairs must be strings. You must ensure these are properly encoded if they contain unicode characters. These headers cannot be one of the reserved headers. */
    headers?: { [key: string]: unknown };
    /** The IP Pool that you would like to send this email from. */
    ip_pool_name?: string;
    /** A collection of different mail settings that you can use to specify how you would like this email to be handled. */
    mail_settings?: { bypass_bounce_management?: { enable?: boolean }; bypass_list_management?: { enable?: boolean }; bypass_spam_management?: { enable?: boolean }; bypass_unsubscribe_management?: { enable?: boolean }; footer?: { enable?: boolean; html?: string; text?: string }; sandbox_mode?: { enable?: boolean } };
    /** An array of messages and their metadata. Each object within personalizations can be thought of as an envelope - it defines who should receive an individual message and how that message should be handled. See our [Personalizations documentation](https://sendgrid.com/docs/for-developers/sending-email/personalizations/) for examples. */
    personalizations: ({ bcc?: (CcBccEmailObject)[]; cc?: (CcBccEmailObject)[]; custom_args?: { [key: string]: unknown }; dynamic_template_data?: { [key: string]: unknown }; from?: FromEmailObject; headers?: { [key: string]: unknown }; send_at?: number; subject?: string; substitutions?: { [key: string]: unknown }; to: ToEmailArray })[];
    reply_to?: ReplyToEmailObject;
    /** An array of recipients who will receive replies and/or bounces. Each object in this array must contain the recipient's email address. Each object in the array may optionally contain the recipient's name. You can either choose to use “reply_to” field or “reply_to_list” but not both. */
    reply_to_list?: ({ email: string; name?: string })[];
    /** A unix timestamp allowing you to specify when you want your email to be delivered. This may be overridden by the `send_at` parameter set at the personalizations level. Delivery cannot be scheduled more than 72 hours in advance. If you have the flexibility, it's better to schedule mail for off-peak times. Most emails are scheduled and sent at the top of the hour or half hour. Scheduling email to avoid peak times — for example, scheduling at 10:53 — can result in lower deferral rates due to the reduced traffic during off-peak times. */
    send_at?: number;
    /** The global or 'message level' subject of your email. This may be overridden by subject lines set in personalizations. */
    subject: string;
    /** An email template ID. A template that contains a subject and content — either text or html — will override any subject and content values specified at the personalizations or message level. */
    template_id?: string;
    /** Settings to determine how you would like to track the metrics of how your recipients interact with your email. */
    tracking_settings?: { click_tracking?: { enable?: boolean; enable_text?: boolean }; ganalytics?: { enable?: boolean; utm_campaign?: string; utm_content?: string; utm_medium?: string; utm_source?: string; utm_term?: string }; open_tracking?: { enable?: boolean; substitution_tag?: string }; subscription_tracking?: { enable?: boolean; html?: string; substitution_tag?: string; text?: string } };
  }) => Promise<GlobalErrorResponseSchema>;

  /**
   * Retrieve all mail settings
   */
  getMailSettings: (input: {
    /** The number of settings to return. */
    limit?: number;
    /** Where in the list of results to begin displaying settings. */
    offset?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result: ({ description: string; enabled: boolean; name: string; title: string })[] }>;

  /**
   * Retrieve address whitelist mail settings
   */
  getMailSettingsAddressWhitelist: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsAddressWhitelabel>;

  /**
   * Update address whitelist mail settings
   */
  patchMailSettingsAddressWhitelist: (input: {
    /** Indicates if your email address whitelist is enabled. */
    enabled?: boolean;
    /** Either a single email address that you want whitelisted or a domain, for which all email addresses belonging to this domain will be whitelisted. */
    list?: (string)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsAddressWhitelabel>;

  /**
   * Retrieve bounce purge mail settings
   */
  getMailSettingsBouncePurge: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsBouncePurge>;

  /**
   * Update bounce purge mail settings
   */
  patchMailSettingsBouncePurge: (input: {
    /** Indicates if the bounce purge mail setting is enabled. */
    enabled?: boolean;
    /** The number of days after which SendGrid will purge all contacts from your hard bounces suppression lists. */
    hard_bounces?: number | null;
    /** The number of days after which SendGrid will purge all contacts from your soft bounces suppression lists. */
    soft_bounces?: number | null;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsBouncePurge>;

  /**
   * Retrieve footer mail settings
   */
  getMailSettingsFooter: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsFooter>;

  /**
   * Update footer mail settings
   */
  patchMailSettingsFooter: (input: {
    /** Indicates if the Footer mail setting is currently enabled. */
    enabled?: boolean;
    /** The custom HTML content of your email footer. */
    html_content?: string;
    /** The plain text content of your email footer. */
    plain_content?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsFooter>;

  /**
   * Retrieve forward bounce mail settings
   */
  getMailSettingsForwardBounce: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsForwardBounce>;

  /**
   * Update forward bounce mail settings
   */
  patchMailSettingsForwardBounce: (input: {
    /** The email address that you would like your bounce reports forwarded to. */
    email?: string | null;
    /** Indicates if the bounce forwarding mail setting is enabled. */
    enabled?: boolean;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsForwardBounce>;

  /**
   * Retrieve forward spam mail settings
   */
  getMailSettingsForwardSpam: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsForwardSpam>;

  /**
   * Update forward spam mail settings
   */
  patchMailSettingsForwardSpam: (input: {
    /** The email address where you would like the spam reports to be forwarded. */
    email?: string;
    /** Indicates if the Forward Spam setting is enabled. */
    enabled?: boolean;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsForwardSpam>;

  /**
   * Retrieve legacy template mail settings
   */
  getMailSettingsTemplate: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<MailSettingsTemplate>;

  /**
   * Update template mail settings
   */
  patchMailSettingsTemplate: (input: {
    /** Indicates if you want to enable the legacy email template mail setting. */
    enabled?: boolean;
    /** The new HTML content for your legacy email template. */
    html_content?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ enabled: boolean; html_content: string }>;

  /**
   * Retrieve email statistics by mailbox provider.
   */
  getMailboxProvidersStats: (input: {
    /** The mail box providers to get statistics for. You can include up to 10 by including this parameter multiple times. */
    mailbox_providers?: string;
    /** The number of results to return. */
    limit?: number;
    /** The point in the list to begin retrieving results. */
    offset?: number;
    /** How to group the statistics. Must be either "day", "week", or "month". */
    aggregated_by?: "day" | "week" | "month";
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD. */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD. */
    end_date?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ date?: string; stats?: ({ metrics?: AdvancedStatsMailboxProvider; name?: string; type?: string })[] })[]>;

  /**
   * Delete Contacts
   */
  deleteMcContacts: (input: {
    /** Must be set to `"true"` to delete all contacts. */
    delete_all_contacts?: string;
    /** A comma-separated list of contact IDs. */
    ids?: string;
  }) => Promise<{ job_id: { [key: string]: unknown } }>;

  /**
   * Get Sample Contacts
   */
  getMcContats: () => Promise<{ _metadata?: Selfmetadata; contact_count?: number; result?: (ContactDetails3)[] }>;

  /**
   * Add or Update a Contact
   */
  putMcContacts: (input: {
    /** One or more contacts objects that you intend to upsert. The available fields for a contact, including the required `email` field are described below. */
    contacts: (ContactRequest)[];
    /** An array of List ID strings that this contact will be added to. */
    list_ids?: (string)[];
  }) => Promise<{ job_id?: string }>;

  /**
   * Get Batched Contacts by IDs
   */
  postMarketingContactsBatch: (input: {
    ids: (string)[];
  }) => Promise<{ result?: (ContactDetails3)[] }>;

  /**
   * Get Total Contact Count
   */
  getMcContactsCount: () => Promise<{ billable_breakdown?: { breakdown?: { [key: string]: unknown }; total?: number }; billable_count?: number; contact_count: number }>;

  /**
   * Get All Existing Exports
   */
  getMarketingContactsExports: () => Promise<{ _metadata?: { next?: string; prev?: string; self?: string }; result?: ({ _metadata?: { next?: string; prev?: string; self?: string }; completed_at?: string; created_at?: string; expires_at?: string; export_type?: string; id?: string; lists?: ({ ID?: string; Name?: string })[]; segments?: ({ ID?: string; Name?: string })[]; status?: string; urls?: (string)[]; user_id?: string })[] }>;

  /**
   * Export Contacts
   */
  postMcContactsExports: (input: {
    /** File type for export file. Choose from `json` or `csv`. */
    file_type?: "csv" | "json";
    /** IDs of the contact lists you want to export. */
    list_ids?: (string)[];
    /** The maximum size of an export file in MB. Note that when this option is specified, multiple output files may be returned from the export. */
    max_file_size?: number;
    notifications?: { email?: boolean };
    /** IDs of the contact segments you want to export. */
    segment_ids?: (string)[];
  }) => Promise<{ _metadata: Metadata2; id?: string }>;

  /**
   * Export Contacts Status
   */
  getMcContactsExportsId: (input: {
    id: string;
  }) => Promise<ContactExport>;

  /**
   * Import Contacts
   */
  putMcContactsImports: (input: {
    /** Import file header to reserved/custom field mapping. */
    field_mappings: (string | unknown)[];
    /** Upload file type. */
    file_type: "csv";
    /** All contacts will be added to each of the specified lists. */
    list_ids?: (string)[];
  }) => Promise<{ job_id?: string; upload_headers?: ({ header: string; value: string })[]; upload_uri?: string }>;

  /**
   * Import Contacts Status
   */
  getMarketingContactsImportsId: (input: {
    id: string;
  }) => Promise<ContactImport>;

  /**
   * Search Contacts
   */
  postMcContactsSearch: (input: {
    query: string;
  }) => Promise<{ _metadata?: Selfmetadata; contact_count: number; result?: (ContactDetails3)[] }>;

  /**
   * Get Contacts by Emails
   */
  postMarketingContactsSearchEmails: (input: {
    /** One or more primary emails and/or alternate emails to search through your contacts for. */
    emails: (string)[];
  }) => Promise<{ result?: { [key: string]: unknown } }>;

  /**
   * Get a Contact by ID
   */
  getMcContactsId: (input: {
    id: string;
  }) => Promise<ContactDetails3>;

  /**
   * Get All Field Definitions
   */
  getMcFieldDefinitions: () => Promise<{ _metadata?: Metadata; custom_fields: (CustomFieldDefinitionsResponse)[]; reserved_fields: ReservedFieldDefinitionsResponse }>;

  /**
   * Create Custom Field Definition
   */
  postMcFieldDefinitions: (input: {
    field_type: "Text" | "Number" | "Date";
    name: string;
  }) => Promise<CustomFieldDefinitionsResponse & { _metadata?: Metadata }>;

  /**
   * Delete Custom Field Definition
   */
  deleteMcFieldDefinitionsCustomFieldId: (input: {
    custom_field_id: string;
  }) => Promise<{ errors: (Error)[] }>;

  /**
   * Update Custom Field Definition
   */
  patchMcFieldDefinitionsCustomFieldId: (input: {
    name: string;
    custom_field_id: string;
  }) => Promise<CustomFieldDefinitionsResponse & { _metadata?: Metadata }>;

  /**
   * Get All Lists
   */
  getMcLists: (input: {
    /** Maximum number of elements to return. Defaults to 100, returns 1000 max */
    page_size?: number;
    page_token?: string;
  }) => Promise<{ _metadata?: Metadata2; result?: (List)[] }>;

  /**
   * Create List
   */
  postMcLists: (input: {
    /** Your name for your list */
    name: string;
  }) => Promise<List>;

  /**
   * Delete a list
   */
  deleteListsId: (input: {
    id: string;
    /** Flag indicates that all contacts on the list are also to be deleted. */
    delete_contacts?: boolean;
  }) => Promise<{ job_id?: string }>;

  /**
   * Get a List by ID
   */
  getMcListsId: (input: {
    id: string;
    /** Setting this parameter to the true  will cause the contact_sample to be returned */
    contact_sample?: boolean;
  }) => Promise<List & { contact_sample?: ContactDetails2 }>;

  /**
   * Update List
   */
  patchMcListsId: (input: {
    /** Your name for your list. */
    name?: string;
    id: string;
  }) => Promise<List>;

  /**
   * Remove Contacts from a List
   */
  deleteMcListsIdContacts: (input: {
    id: string;
    /** comma separated list of contact ids */
    contact_ids: string;
  }) => Promise<{ job_id?: string }>;

  /**
   * Get List Contact Count
   */
  getMcListsIdContactsCount: (input: {
    id: string;
  }) => Promise<{ billable_count?: number; contact_count?: number }>;

  /**
   * Get List of Segments
   */
  getMarketingSegments: (input: {
    /** A comma separated list of list ids to be used when searching for segments with the specified parent_list_id, no more than 50 is allowed */
    parent_list_ids?: string;
    /** If set to `true` segments with an empty value of `parent_list_id` will be returned in the filter.  If the value is not present it defaults to 'false'. */
    no_parent_list_id?: boolean;
  }) => Promise<{ results: (SegmentSummary)[] }>;

  /**
   * Create Segment
   */
  postMarketingSegments: (input: {
    /** Name of the segment. */
    name: string;
    /** The array of list ids to filter contacts on when building this segment. It allows only one such list id for now. We will support more in future */
    parent_list_ids?: (string)[];
    /** SQL query which will filter contacts based on the conditions provided */
    query_dsl: string;
    /** The id of the list if this segment is a child of a list.  This implies the query is rewritten as `(${query_dsl}) AND CONTAINS(list_ids, ${parent_list_id})` */
    parent_list_id?: string;
  }) => Promise<FullSegment>;

  /**
   * Get List of Segments
   */
  getSegments: (input: {
    /** A comma separated list up to 50 in size, to filter segments on.  Only segments that have any of these list ids as the parent list will be retrieved. This is different from the parameter of the same name used when creating a segment. */
    parent_list_ids?: string;
    /** If set to `true` segments with an empty value of `parent_list_id` will be returned in the filter.  If the value is not present it defaults to 'false'. */
    no_parent_list_id?: boolean;
  }) => Promise<AllSegmentsResponse>;

  /**
   * Create Segment
   */
  postSegments: (input: {
    /** Name of the segment. */
    name: string;
    /** The array of list ids to filter contacts on when building this segment. It allows only one such list id for now. We will support more in future */
    parent_list_ids?: (string)[];
    /** SQL query which will filter contacts based on the conditions provided */
    query_dsl: string;
  }) => Promise<SegmentResponse>;

  /**
   * Delete segment
   */
  deleteSegmentsSegmentId: (input: {
    segment_id: string;
  }) => Promise<ErrorsSegV2>;

  /**
   * Get Segment by ID
   */
  getSegmentsSegmentId: (input: {
    segment_id: string;
    /** Defaults to `true`. Set to `false` to exclude the contacts_sample in the response. */
    contacts_sample?: boolean;
  }) => Promise<SegmentResponse>;

  /**
   * Update Segment
   */
  patchSegmentsSegmentId: (input: {
    /** Name of the segment. */
    name?: string;
    /** SQL query which will filter contacts based on the conditions provided */
    query_dsl?: string;
    segment_id: string;
  }) => Promise<SegmentResponse>;

  /**
   * Bulk Delete Segments
   */
  postMarketingSegmentsDelete: (input: {
    ids?: (string)[];
  }) => Promise<{ errors?: ({ error?: string; id?: string; resources?: { ids?: (string)[]; type?: string } })[] }>;

  /**
   * Delete Segment
   */
  deleteMarketingSegmentsSegmentId: (input: {
    segment_id: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Get Segment by ID
   */
  getMarketingSegmentsSegmentId: (input: {
    segment_id: string;
    /** Defaults to `false`.  Set to `true` to return the parsed SQL AST as a JSON object in the field `query_json` */
    query_json?: boolean;
  }) => Promise<FullSegment>;

  /**
   * Update Segment
   */
  patchMarketingSegmentsSegmentId: (input: {
    /** Name of the segment. */
    name: string;
    /** The array of list ids to filter contacts on when building this segment. It allows only one such list id for now. We will support more in future */
    parent_list_ids?: (string)[];
    /** SQL query which will filter contacts based on the conditions provided */
    query_dsl: string;
    segment_id: string;
  }) => Promise<FullSegment>;

  /**
   * Create a Sender Identity
   */
  postMarketingSenders: (input: {
    /** The physical address of the sender identity. */
    address: string;
    /** Additional sender identity address information. */
    address_2?: string;
    /** The city of the sender identity. */
    city: string;
    /** The country of the sender identity. */
    country: string;
    from: { email: string; name: string };
    /** A nickname for the sender identity. Not used for sending. */
    nickname: string;
    reply_to?: { email: string; name?: string };
    /** The state of the sender identity. */
    state?: string;
    /** The zipcode of the sender identity. */
    zip?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<SenderId>;

  /**
   * Bulk Delete Single Sends
   */
  deleteMarketingSinglesends: (input: {
    /** Single Send IDs to delete */
    ids?: (string)[];
  }) => Promise<{ errors?: ({ error_id?: string; field?: string; message?: string })[] }>;

  /**
   * Get All Single Sends
   */
  getMarketingSinglesends: (input: {
    page_size?: number;
    page_token?: string;
  }) => Promise<{ _metadata?: Metadata; result?: (SinglesendResponseShort)[] }>;

  /**
   * Create Single Send
   */
  postMarketingSinglesends: (input: {
    /** The categories to associate with this Single Send. */
    categories?: (string)[];
    email_config?: { custom_unsubscribe_url?: string | null; design_id?: string; editor?: "code" | "design"; generate_plain_content?: boolean; html_content?: string; ip_pool?: string | null; plain_content?: string; sender_id?: number | null; subject?: string; suppression_group_id?: number | null };
    /** The name of the Single Send. */
    name: string;
    /** The ISO 8601 time at which to send the Single Send — this must be set for a future time. */
    send_at?: string;
    send_to?: { all?: boolean; list_ids?: (string)[]; segment_ids?: (string)[] };
  }) => Promise<SinglesendResponse>;

  /**
   * Get All Categories
   */
  getMarketingSinglesendsCategories: () => Promise<{ categories?: (string)[] }>;

  /**
   * Get Single Sends Search
   */
  postMarketingSinglesendsSearch: (input: {
    /** categories to associate with this Single Send, match any single send that has at least one of the categories */
    categories?: (string)[];
    /** leading and trailing wildcard search on name of the Single Send */
    name?: string;
    /** current status of the Single Send */
    status?: ("draft" | "scheduled" | "triggered")[];
    page_size?: number;
    page_token?: string;
  }) => Promise<{ _metadata?: Metadata; result?: (SinglesendResponseShort)[] }>;

  /**
   * Delete Single Send by ID
   */
  deleteMarketingSinglesendsId: (input: {
    id: string;
  }) => Promise<{ errors?: ({ error_id?: string; field?: string; message?: string })[] }>;

  /**
   * Get Single Send by ID
   */
  getMarketingSinglesendsId: (input: {
    id: string;
  }) => Promise<SinglesendResponse>;

  /**
   * Update Single Send
   */
  patchMarketingSinglesendsId: (input: {
    /** The categories to associate with this Single Send. */
    categories?: (string)[];
    email_config?: { custom_unsubscribe_url?: string | null; design_id?: string; editor?: "code" | "design"; generate_plain_content?: boolean; html_content?: string; ip_pool?: string | null; plain_content?: string; sender_id?: number | null; subject?: string; suppression_group_id?: number | null };
    /** The name of the Single Send. */
    name: string;
    /** The ISO 8601 time at which to send the Single Send — this must be set for a future time. */
    send_at?: string;
    send_to?: { all?: boolean; list_ids?: (string)[]; segment_ids?: (string)[] };
    id: string;
  }) => Promise<SinglesendResponse>;

  /**
   * Duplicate Single Send
   */
  postMarketingSinglesendsId: (input: {
    /** The name of the duplicate Single Send. If you choose to leave the name field blank, your duplicate will be assigned the name of the Single Send it was copied from with the text 'Copy of ' prepended to it. The end of the new Single Send name, including 'Copy of ', will be trimmed if the name exceeds the character limit. */
    name?: string;
    id: string;
  }) => Promise<SinglesendResponse>;

  /**
   * Delete Single Send Schedule
   */
  deleteMarketingSinglesendsIdSchedule: (input: {
    id: string;
  }) => Promise<SinglesendSchedule>;

  /**
   * Schedule Single Send
   */
  putMarketingSinglesendsIdSchedule: (input: {
    /** This is the ISO 8601 time at which to send the Single Send; must be in future, or the string "now" */
    send_at: "now";
    id: string;
  }) => Promise<{ send_at?: string; status?: "scheduled" }>;

  /**
   * Get All Automation Stats
   */
  getallAutomationStats: (input: {
    /** This endpoint returns all automation IDs if no `automation_ids` are specified. */
    automation_ids?: (string)[];
    /** The number of elements you want returned on each page. */
    page_size?: number;
    /** The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page. */
    page_token?: string;
  }) => Promise<AutomationsResponse>;

  /**
   * Export Automation Stats
   */
  getAutomationsStatsExport: (input: {
    /** The IDs of Automations for which to export stats. */
    ids?: (string)[];
    /** The [IANA Area/Region](https://en.wikipedia.org/wiki/Tz_database#Names_of_time_zones) string representing the timezone in which the stats are to be presented; i.e. `"America/Chicago"`. This parameter changes the timezone format only; it does not alter which stats are returned. */
    timezone?: string;
  }) => Promise<string>;

  /**
   * Get Automation Stats by ID
   */
  getAutomationStat: (input: {
    id: string;
    /** Automations can have multiple steps. Including `step_id` as a `group_by` metric allows further granularity of stats. */
    group_by?: ("step_id")[];
    /** Comma-separated list of `step_ids` that you want the link stats for. */
    step_ids?: (string)[];
    /** Dictates how the stats are time-sliced. Currently, `"total"` and `"day"` are supported. */
    aggregated_by?: "day" | "total";
    /** Format: `YYYY-MM-DD`. If this parameter is included, the stats' start date is included in the search. */
    start_date?: string;
    /** Format: `YYYY-MM-DD`.If this parameter is included, the stats' end date is included in the search. */
    end_date?: string;
    /** [IANA Area/Region](https://en.wikipedia.org/wiki/Tz_database#Names_of_time_zones) string representing the timezone in which the stats are to be presented, e.g., "America/Chicago". */
    timezone?: string;
    /** The number of elements you want returned on each page. */
    page_size?: number;
    /** The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page. */
    page_token?: string;
  }) => Promise<AutomationsResponse>;

  /**
   * Get Automation Click Tracking Stats by ID
   */
  getAutomationLinkStat: (input: {
    /** The ID of the Automation you want to get click tracking stats for.  */
    id: string;
    /** Automations can have multiple steps. Including `step_id` as a `group_by` metric allows further granularity of stats. */
    group_by?: ("step_id")[];
    /** Comma-separated list of `step_ids` that you want the link stats for. */
    step_ids?: (string)[];
    /** The number of elements you want returned on each page. */
    page_size?: number;
    /** The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page. */
    page_token?: string;
  }) => Promise<AutomationsLinkStatsResponse>;

  /**
   * Get All Single Sends Stats
   */
  getallSinglesendStats: (input: {
    /** This endpoint returns all Single Send IDs if no IDs are included in `singlesend_ids`. */
    singlesend_ids?: (string)[];
    /** The number of elements you want returned on each page. */
    page_size?: number;
    /** The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page. */
    page_token?: string;
  }) => Promise<SinglesendsResponse>;

  /**
   * Export Single Send Stats
   */
  getSinglesendStatsExport: (input: {
    /** The IDs of Single Sends for which to export stats. */
    ids?: (string)[];
    /** The [IANA Area/Region](https://en.wikipedia.org/wiki/Tz_database#Names_of_time_zones) string representing the timezone in which the stats are to be presented; i.e. `"America/Chicago"`. This parameter changes the timezone format only; it does not alter which stats are returned. */
    timezone?: string;
  }) => Promise<string>;

  /**
   * Get Single Send Stats by ID
   */
  getSinglesendStat: (input: {
    id: string;
    /** Dictates how the stats are time-sliced. Currently, `"total"` and `"day"` are supported. */
    aggregated_by?: "day" | "total";
    /** Format: `YYYY-MM-DD`. If this parameter is included, the stats' start date is included in the search. */
    start_date?: string;
    /** Format: `YYYY-MM-DD`.If this parameter is included, the stats' end date is included in the search. */
    end_date?: string;
    /** [IANA Area/Region](https://en.wikipedia.org/wiki/Tz_database#Names_of_time_zones) string representing the timezone in which the stats are to be presented, e.g., "America/Chicago". */
    timezone?: string;
    /** The number of elements you want returned on each page. */
    page_size?: number;
    /** The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page. */
    page_token?: string;
    /** A/B Single Sends have multiple variation IDs and phase IDs. Including these additional fields allows further granularity of stats by these fields. */
    group_by?: ("ab_variation" | "ab_phase")[];
  }) => Promise<SinglesendsResponse>;

  /**
   * Get Single Send Click Tracking Stats by ID
   */
  getSinglesendLinkStat: (input: {
    id: string;
    /** The number of elements you want returned on each page. */
    page_size?: number;
    /** The stats endpoints are paginated. To get the next page, call the passed `_metadata.next` URL. If `_metadata.prev` doesn't exist, you're at the first page. Similarly, if `_metadata.next` is not present, you're at the last page. */
    page_token?: string;
    /** A/B Single Sends have multiple variation IDs and phase IDs. Including these additional fields allows further granularity of stats by these fields. */
    group_by?: ("ab_variation" | "ab_phase")[];
    ab_variation_id?: string;
    ab_phase_id?: "test" | "send";
  }) => Promise<SinglesendsLinkStatsResponse>;

  /**
   * Send a Test Marketing Email
   */
  postMarketingTestSendEmail: (input: {
    /** A custom unsubscribe URL. */
    custom_unsubscribe_url?: string;
    /** An array of email addresses you want to send the test message to. */
    emails: (string)[];
    /** You can either specify this address or specify a verified sender ID. */
    from_address?: string;
    /** This ID must belong to a verified sender. Alternatively, you may supply a `from_address` email. */
    sender_id?: number;
    suppression_group_id?: number;
    /** The ID of the template that you would like to use. If you use a template that contains a subject and content (either text or HTML), then those values specified at the personalizations or message level will not be used. */
    template_id: string;
    /**  You can override the active template with an alternative template version by passing the version ID in this field. If this field is blank, the active template version will be used. */
    version_id_override?: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Filter all messages
   */
  getMessages: (input: {
    /** Use the query syntax  to filter your email activity. */
    query: string;
    /** The number of messages returned. This parameter must be greater than 0 and less than or equal to 1000 */
    limit?: number;
  }, options: { headers: { "X-Query-Id"?: string; "X-Cursor"?: string; Authorization: string } }) => Promise<{ messages?: (EmailActivityResponseCommonFields & { clicks_count?: number; last_event_time?: number; opens_count?: number })[] }>;

  /**
   * Request CSV
   */
  postV3MessagesDownload: (input: {
    /** Uses a SQL like syntax to indicate which messages to include in the CSV */
    query?: string;
  }, options: { headers: { Authorization: string } }) => Promise<{ message?: string; status?: "pending" }>;

  /**
   * Download CSV
   */
  getV3MessagesDownloadDownloadUuid: (input: {
    /** UUID used to locate the download csv request entry in the DB.  This is the UUID provided in the email sent to the user when their csv file is ready to download */
    download_uuid: string;
  }, options: { headers: { Authorization: string } }) => Promise<{ csv: string; presigned_url?: string }>;

  /**
   * Filter messages by message ID
   */
  getV3MessagesMsgId: (input: {
    /** The ID of the message you are requesting details for. */
    msg_id: string;
  }, options: { headers: { Authorization: string } }) => Promise<EmailActivityResponseCommonFields & { api_key_id: string; asm_group_id: number; categories: (string)[]; events: ({ attempt_num?: number; bounce_type: "soft" | "hard"; event_name: "bounced" | "opened" | "clicked" | "processed" | "dropped" | "delivered" | "deferred" | "spam_report" | "unsubscribe" | "group_unsubscribe" | "group_resubscribe"; http_user_agent: string; mx_server: string; processed: string; reason?: string; url?: string })[]; originating_ip: string; outbound_ip: string; outbound_ip_type: "dedicated" | "shared"; teammate: string; template_id: string; unique_args: string }>;

  /**
   * Returns a list of all partner settings.
   */
  getPartnerSettings: (input: {
    /** The number of settings to return per page. */
    limit?: number;
    /** The paging offset. */
    offset?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result?: ({ description: string; enabled: boolean; name: string; title: string })[] }>;

  /**
   * Returns all New Relic partner settings.
   */
  getPartnerSettingsNewRelic: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<PartnerSettingsNewRelic>;

  /**
   * Updates New Relic partner settings.
   */
  patchPartnerSettingsNewRelic: (input: {
    /** Indicates if your subuser statistics will be sent to your New Relic Dashboard. */
    enable_subuser_statistics?: boolean;
    /** Indicates if this partner setting is enabled. */
    enabled?: boolean;
    /** The license key for your New Relic account. */
    license_key?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<PartnerSettingsNewRelic>;

  /**
   * Retrieve a list of scopes for which this user has access.
   */
  getScopes: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ scopes: (string)[] }>;

  /**
   * Retrieve access requests
   */
  getV3ScopesRequests: (input: {
    /** Optional field to limit the number of results returned. */
    limit?: number;
    /** Optional beginning point in the list to retrieve from. */
    offset?: number;
  }) => Promise<({ email?: string; first_name?: string; id?: number; last_name?: string; scope_group_name?: string; username?: string })[]>;

  /**
   * Deny access request
   */
  deleteV3ScopesRequestsRequestId: (input: {
    /** The ID of the request that you want to deny. */
    request_id: string;
  }) => Promise<{ errors?: ({ field?: string; message?: string })[] }>;

  /**
   * Approve access request
   */
  patchV3ScopesRequestsApproveId: (input: {
    /** The ID of the request that you want to approve. */
    request_id: string;
  }) => Promise<{ scope_group_name?: string }>;

  /**
   * Get all Sender Identities
   */
  getV3Senders: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result?: (SenderId)[] }>;

  /**
   * Create a Sender Identity
   */
  postSenders: (input: {
    /** The physical address of the sender identity. */
    address: string;
    /** Additional sender identity address information. */
    address_2?: string;
    /** The city of the sender identity. */
    city: string;
    /** The country of the sender identity. */
    country: string;
    from?: { [key: string]: unknown };
    /** A nickname for the sender identity. Not used for sending. */
    nickname: string;
    reply_to?: { [key: string]: unknown };
    /** The state of the sender identity. */
    state?: string;
    /** The zipcode of the sender identity. */
    zip?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<SenderId>;

  /**
   * Delete a Sender Identity
   */
  deleteV3SendersSenderId: (input: {
    /** The ID of the sender identity that you want to retrieve. */
    sender_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * View a Sender Identity
   */
  getV3SendersSenderId: (input: {
    /** The ID of the sender identity that you want to retrieve. */
    sender_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<SenderId>;

  /**
   * Update a Sender Identity
   */
  patchV3SendersSenderId: (input: {
    /** The physical address of the sender identity. */
    address?: string;
    /** Additional sender identity address information. */
    address_2?: string;
    /** The city of the sender identity. */
    city?: string;
    /** The country of the sender identity. */
    country?: string;
    from?: { email?: string; name?: string };
    /** A nickname for the sender identity. Not used for sending. */
    nickname?: string;
    reply_to?: { email?: string; name?: string };
    /** The state of the sender identity. */
    state?: string;
    /** The zipcode of the sender identity. */
    zip?: string;
    /** The ID of the sender identity that you want to retrieve. */
    sender_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<SenderId>;

  /**
   * Resend Sender Identity Verification
   */
  postV3SendersSenderIdResendVerification: (input: {
    /** The ID of the sender identity for which you would like to resend a verification email. */
    sender_id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Create an SSO Certificate
   */
  postSsoCertificates: (input: {
    /** Indicates if the certificate is enabled. */
    enabled?: boolean;
    /** An ID that matches a certificate to a specific IdP integration. This is the `id` returned by the "Get All SSO Integrations" endpoint. */
    integration_id: string;
    /** This public certificate allows SendGrid to verify that SAML requests it receives are signed by an IdP that it recognizes. */
    public_certificate: string;
  }) => Promise<SsoCertificateBody>;

  /**
   * Delete an SSO Certificate
   */
  deleteSsoCertificatesCertId: (input: {
    cert_id: string;
  }) => Promise<SsoCertificateBody>;

  /**
   * Get an SSO Certificate
   */
  getSsoCertificatesCertId: (input: {
    cert_id: string;
  }) => Promise<SsoCertificateBody>;

  /**
   * Update SSO Certificate
   */
  patchSsoCertificatesCertId: (input: {
    /** Indicates whether or not the certificate is enabled. */
    enabled?: boolean;
    /** An ID that matches a certificate to a specific IdP integration. */
    integration_id?: string;
    /** This public certificate allows SendGrid to verify that SAML requests it receives are signed by an IdP that it recognizes. */
    public_certificate?: string;
    cert_id: string;
  }) => Promise<SsoErrorResponse>;

  /**
   * Get All SSO Integrations
   */
  getSsoIntegrations: (input: {
    /** If this parameter is set to `true`, the response will include the `completed_integration` field. */
    si?: boolean;
  }) => Promise<(SsoIntegration)[]>;

  /**
   * Create an SSO Integration
   */
  postSsoIntegrations: (input: {
    /** Indicates if the integration is complete. */
    completed_integration?: boolean;
    /** Indicates if the integration is enabled. */
    enabled: boolean;
    /** An identifier provided by your IdP to identify Twilio SendGrid in the SAML interaction. This is called the "SAML Issuer ID" in the Twilio SendGrid UI. */
    entity_id: string;
    /** The name of your integration. This name can be anything that makes sense for your organization (eg. Twilio SendGrid) */
    name: string;
    /** The IdP's SAML POST endpoint. This endpoint should receive requests and initiate an SSO login flow. This is called the "Embed Link" in the Twilio SendGrid UI. */
    signin_url: string;
    /** This URL is relevant only for an IdP-initiated authentication flow. If a user authenticates from their IdP, this URL will return them to their IdP when logging out. */
    signout_url: string;
  }) => Promise<SsoIntegration>;

  /**
   * Delete an SSO Integration
   */
  deleteSsoIntegrationsId: (input: {
    id: string;
  }) => Promise<SsoErrorResponse>;

  /**
   * Get an SSO Integration
   */
  getSsoIntegrationsId: (input: {
    id: string;
    /** If this parameter is set to `true`, the response will include the `completed_integration` field. */
    si?: boolean;
  }) => Promise<SsoIntegration>;

  /**
   * Update an SSO Integration
   */
  patchSsoIntegrationsId: (input: {
    /** Indicates if the integration is complete. */
    completed_integration?: boolean;
    /** Indicates if the integration is enabled. */
    enabled: boolean;
    /** An identifier provided by your IdP to identify Twilio SendGrid in the SAML interaction. This is called the "SAML Issuer ID" in the Twilio SendGrid UI. */
    entity_id: string;
    /** The name of your integration. This name can be anything that makes sense for your organization (eg. Twilio SendGrid) */
    name: string;
    /** The IdP's SAML POST endpoint. This endpoint should receive requests and initiate an SSO login flow. This is called the "Embed Link" in the Twilio SendGrid UI. */
    signin_url: string;
    /** This URL is relevant only for an IdP-initiated authentication flow. If a user authenticates from their IdP, this URL will return them to their IdP when logging out. */
    signout_url: string;
    id: string;
    /** If this parameter is set to `true`, the response will include the `completed_integration` field. */
    si?: boolean;
  }) => Promise<SsoIntegration>;

  /**
   * Get All SSO Certificates by Integration
   */
  getSsoIntegrationsIntegrationIdCertificates: (input: {
    /** An ID that matches a certificate to a specific IdP integration. */
    integration_id: string;
  }) => Promise<(SsoCertificateBody)[]>;

  /**
   * Create SSO Teammate
   */
  postSsoTeammates: (input: {
    /** The Teammate’s email address. This email address will also function as the Teammate’s username and must match the address assigned to the user in your IdP. This address cannot be changed after the Teammate is created. */
    email: string;
    /** The Teammate’s first name. */
    first_name: string;
    /** Indicates if the Teammate has admin permissions. */
    is_admin?: boolean;
    /** Indicates if the Teammate has read_only permissions. */
    is_read_only?: boolean;
    /** The Teammate’s last name. */
    last_name: string;
    /** The permission scopes assigned to the Teammate. */
    scopes: (string)[];
  }) => Promise<SsoTeammateResponse>;

  /**
   * Edit an SSO Teammate
   */
  patchSsoTeammatesUsername: (input: {
    first_name?: string;
    is_admin?: boolean;
    last_name?: string;
    scopes?: (string)[];
    /** This email address must be the same address assigned to the teammate in your IdP */
    username: string;
  }) => Promise<SsoTeammatesPatchResponse>;

  /**
   * Retrieve global email statistics
   */
  getStats: (input: {
    /** The number of results to return. */
    limit?: number;
    /** The point in the list to begin retrieving results. */
    offset?: number;
    /** How to group the statistics. Must be either "day", "week", or "month". */
    aggregated_by?: "day" | "week" | "month";
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD. */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD. */
    end_date?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ date: string; stats: ({ metrics?: StatsAdvancedGlobalStats })[] })[]>;

  /**
   * List all Subusers
   */
  getSubusers: (input: {
    /** The username of this subuser. */
    username?: string;
    /** The number of results you would like to get in each request. */
    limit?: number;
    /** The number of subusers to skip. */
    offset?: number;
  }) => Promise<(Subuser)[]>;

  /**
   * Create Subuser
   */
  postSubusers: (input: {
    /** The email address of the subuser. */
    email: string;
    /** The IP addresses that should be assigned to this subuser. */
    ips: (string)[];
    /** The password this subuser will use when logging into SendGrid. */
    password: string;
    /** The username for this subuser. */
    username: string;
  }) => Promise<SubuserPost>;

  /**
   * Retrieve Subuser Reputations
   */
  getSubusersReputations: (input: {
    usernames?: string;
  }) => Promise<({ reputation: number; username: string })[]>;

  /**
   * Retrieve email statistics for your subusers.
   */
  getSubusersStats: (input: {
    /** Limits the number of results returned per page. */
    limit?: number;
    /** The point in the list to begin retrieving results from. */
    offset?: number;
    /** How to group the statistics. Must be either "day", "week", or "month". */
    aggregated_by?: "day" | "week" | "month";
    /** The subuser you want to retrieve statistics for. You may include this parameter up to 10 times to retrieve statistics for multiple subusers. */
    subusers: string;
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD. */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. */
    end_date?: string;
  }) => Promise<CategoryStats>;

  /**
   * Retrieve monthly stats for all subusers
   */
  getSubusersStatsMonthly: (input: {
    /** The date of the month to retrieve statistics for. Must be formatted YYYY-MM-DD */
    date: string;
    /** A substring search of your subusers. */
    subuser?: string;
    /** The metric that you want to sort by. Metrics that you can sort by are: `blocks`, `bounces`, `clicks`, `delivered`, `opens`, `requests`, `unique_clicks`, `unique_opens`, and `unsubscribes`.' */
    sort_by_metric?: "blocks" | "bounces" | "clicks" | "delivered" | "opens" | "requests" | "unique_clicks" | "unique_opens" | "unsubscribes";
    /** The direction you want to sort. */
    sort_by_direction?: "desc" | "asc";
    /** Optional field to limit the number of results returned. */
    limit?: number;
    /** Optional beginning point in the list to retrieve from. */
    offset?: number;
  }) => Promise<SubuserStats>;

  /**
   * Retrieve the totals for each email statistic metric for all subusers.
   */
  getSubusersStatsSums: (input: {
    /** The direction you want to sort.  */
    sort_by_direction?: "desc" | "asc";
    /** The starting date of the statistics to retrieve. Must follow format YYYY-MM-DD. */
    start_date: string;
    /** The end date of the statistics to retrieve. Defaults to today. Must follow format YYYY-MM-DD. */
    end_date?: string;
    /** Limits the number of results returned per page. */
    limit?: number;
    /** The point in the list to begin retrieving results from. */
    offset?: number;
    /** How to group the statistics. Defaults to today. Must follow format YYYY-MM-DD. */
    aggregated_by?: string;
    /** The metric that you want to sort by.  Must be a single metric. */
    sort_by_metric?: string;
  }) => Promise<CategoryStats>;

  /**
   * Delete a subuser
   */
  deleteSubusersSubuserName: (input: {
    subuser_name: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Enable/disable a subuser
   */
  patchSubusersSubuserName: (input: {
    /** Whether or not this subuser is disabled. True means disabled, False means enabled. */
    disabled?: boolean;
    subuser_name: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Update IPs assigned to a subuser
   */
  putSubusersSubuserNameIps: (input: {
    /** The IP addresses you would like to assign to the subuser. */
    body?: (string)[];
    subuser_name: string;
  }) => Promise<{ ips?: (string)[] }>;

  /**
   * Delete monitor settings
   */
  deleteSubusersSubuserNameMonitor: (input: {
    /** The name of the subuser for which to retrieve monitor settings. */
    subuser_name: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve monitor settings for a subuser
   */
  getSubusersSubuserNameMonitor: (input: {
    /** The name of the subuser for which to retrieve monitor settings. */
    subuser_name: string;
  }) => Promise<Monitor>;

  /**
   * Create monitor settings
   */
  postSubusersSubuserNameMonitor: (input: {
    /** The email address to which Sendgrid should send emails for monitoring. */
    email: string;
    /** The frequency at which to forward monitoring emails. An email will be sent when your subuser sends this many (e.g., 1,000) emails. */
    frequency: number;
    /** The name of the subuser for which to retrieve monitor settings. */
    subuser_name: string;
  }) => Promise<Monitor>;

  /**
   * Update Monitor Settings for a subuser
   */
  putSubusersSubuserNameMonitor: (input: {
    /** The email address to which Sendgrid should send emails for monitoring. */
    email: string;
    /** The frequency at which to forward monitoring emails. An email will be sent when your subuser sends this many (e.g., 1,000) emails. */
    frequency: number;
    /** The name of the subuser for which to retrieve monitor settings. */
    subuser_name: string;
  }) => Promise<Monitor>;

  /**
   * Retrieve the monthly email statistics for a single subuser
   */
  getSubusersSubuserNameStatsMonthly: (input: {
    subuser_name: string;
    /** The date of the month to retrieve statistics for. Must be formatted YYYY-MM-DD */
    date: string;
    /** The metric that you want to sort by. Metrics that you can sort by are: `blocks`, `bounces`, `clicks`, `delivered`, `opens`, `requests`, `unique_clicks`, `unique_opens`, and `unsubscribes`.' */
    sort_by_metric?: string;
    /** The direction you want to sort. */
    sort_by_direction?: "desc" | "asc";
    /** Optional field to limit the number of results returned. */
    limit?: number;
    /** Optional beginning point in the list to retrieve from. */
    offset?: number;
  }) => Promise<SubuserStats>;

  /**
   * Delete blocks
   */
  deleteSuppressionBlocks: (input: {
    /** Indicates if you want to delete all blocked email addresses. */
    delete_all?: boolean;
    /** The specific blocked email addresses that you want to delete. */
    emails?: (string)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve all blocks
   */
  getSuppressionBlocks: (input: {
    /** The start of the time range when a blocked email was created (inclusive). This is a unix timestamp. */
    start_time?: number;
    /** The end of the time range when a blocked email was created (inclusive). This is a unix timestamp. */
    end_time?: number;
    /** Limit the number of results to be displayed per page. */
    limit?: number;
    /** The point in the list to begin displaying results. */
    offset?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<BlocksResponse>;

  /**
   * Delete a specific block
   */
  deleteSuppressionBlocksEmail: (input: {
    /** The email address of the specific block. */
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a specific block
   */
  getSuppressionBlocksEmail: (input: {
    /** The email address of the specific block. */
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<BlocksResponse>;

  /**
   * Delete bounces
   */
  deleteSuppressionBounces: (input: {
    /** This parameter allows you to delete **every** email in your bounce list. This should not be used with the emails parameter. */
    delete_all?: boolean;
    /** Delete multiple emails from your bounce list at the same time. This should not be used with the delete_all parameter. */
    emails?: (string)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Retrieve all bounces
   */
  getSuppressionBounces: (input: {
    /** Refers start of the time range in unix timestamp when a bounce was created (inclusive). */
    start_time?: number;
    /** Refers end of the time range in unix timestamp when a bounce was created (inclusive). */
    end_time?: number;
  }, options: { headers: { Accept: string; "on-behalf-of"?: string } }) => Promise<(BounceResponse)[]>;

  /**
   * Delete a bounce
   */
  deleteSuppressionBouncesEmail: (input: {
    body?: unknown;
    email: string;
    /** The email address you would like to remove from the bounce list. */
    email_address: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a Bounce
   */
  getSuppressionBouncesEmail: (input: {
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(BounceResponse)[]>;

  /**
   * Delete invalid emails
   */
  deleteSuppressionInvalidEmails: (input: {
    /** Indicates if you want to remove all email address from the invalid emails list. */
    delete_all?: boolean;
    /** The list of specific email addresses that you want to remove. */
    emails?: (string)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve all invalid emails
   */
  getSuppressionInvalidEmails: (input: {
    /** Refers start of the time range in unix timestamp when an invalid email was created (inclusive). */
    start_time?: number;
    /** Refers end of the time range in unix timestamp when an invalid email was created (inclusive). */
    end_time?: number;
    /** Limit the number of results to be displayed per page. */
    limit?: number;
    /** Paging offset. The point in the list to begin displaying results. */
    offset?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(InvalidEmail)[]>;

  /**
   * Delete a specific invalid email
   */
  deleteSuppressionInvalidEmailsEmail: (input: {
    /** The specific email address of the invalid email entry that you want to retrieve. */
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a specific invalid email
   */
  getSuppressionInvalidEmailsEmail: (input: {
    /** The specific email address of the invalid email entry that you want to retrieve. */
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(InvalidEmail)[]>;

  /**
   * Delete spam reports
   */
  deleteSuppressionSpamReports: (input: {
    /** Indicates if you want to delete all email addresses on the spam report list. */
    delete_all?: boolean;
    /** A list of specific email addresses that you want to remove from the spam report list. */
    emails?: (string)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve all spam reports
   */
  getSuppressionSpamReports: (input: {
    /** The start of the time range when a spam report was created (inclusive). This is a unix timestamp. */
    start_time?: number;
    /** The end of the time range when a spam report was created (inclusive). This is a unix timestamp. */
    end_time?: number;
    /** Limit the number of results to be displayed per page. */
    limit?: number;
    /** Paging offset. The point in the list to begin displaying results. */
    offset?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<SpamReportsResponse>;

  /**
   * Delete a specific spam report
   */
  deleteSuppressionSpamReportsEmail: (input: {
    /** The email address of a specific spam report that you want to retrieve. */
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a specific spam report
   */
  getSuppressionSpamReportsEmail: (input: {
    /** The email address of a specific spam report that you want to retrieve. */
    email: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<SpamReportsResponse>;

  /**
   * Retrieve all global suppressions
   */
  getSuppressionUnsubscribes: (input: {
    /** Refers start of the time range in unix timestamp when an unsubscribe email was created (inclusive). */
    start_time?: number;
    /** Refers end of the time range in unix timestamp when an unsubscribe email was created (inclusive). */
    end_time?: number;
    /** The number of results to display on each page. */
    limit?: number;
    /** The point in the list of results to begin displaying global suppressions. */
    offset?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ created: number; email: string })[]>;

  /**
   * Retrieve all teammates
   */
  getV3Teammates: (input: {
    /** Number of items to return */
    limit?: number;
    /** Paging offset */
    offset?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result?: ({ address?: string; address2?: string; city?: string; country?: string; email?: string; first_name?: string; is_admin?: boolean; last_name?: string; phone?: string; state?: string; user_type?: "admin" | "owner" | "teammate"; username?: string; website?: string; zip?: string })[] }>;

  /**
   * Invite teammate
   */
  postV3Teammates: (input: {
    /** New teammate's email */
    email: string;
    /** Set to true if teammate should be an admin user */
    is_admin: boolean;
    /** Set to specify list of scopes that teammate should have. Should be empty if teammate is an admin. */
    scopes: (string)[];
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ email?: string; is_admin?: boolean; scopes?: (unknown)[]; token?: string }>;

  /**
   * Retrieve all pending teammates
   */
  getV3TeammatesPending: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result?: ({ email?: string; expiration_date?: number; is_admin?: boolean; scopes?: (string)[]; token?: string })[] }>;

  /**
   * Delete pending teammate
   */
  deleteV3TeammatesPendingToken: (input: {
    /** The token for the invite you want to delete. */
    token: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ errors?: ({ field?: string; message?: string })[] }>;

  /**
   * Resend teammate invite
   */
  postV3TeammatesPendingTokenResend: (input: {
    /** The token for the invite that you want to resend. */
    token: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ email?: string; is_admin?: boolean; scopes?: (string)[]; token?: string }>;

  /**
   * Delete teammate
   */
  deleteV3TeammatesUsername: (input: {
    /** The username of the teammate that you want to retrieve. */
    username: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ errors?: ({ field?: string; message?: string })[] }>;

  /**
   * Retrieve specific teammate
   */
  getV3TeammatesUsername: (input: {
    /** The username of the teammate that you want to retrieve. */
    username: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ address?: string; address2?: string; city?: string; country?: string; email?: string; first_name?: string; is_admin?: boolean; last_name?: string; phone?: string; scopes?: (unknown)[]; state?: string; user_type?: "admin" | "owner" | "teammate"; username?: string; website?: string; zip?: string }>;

  /**
   * Update teammate's permissions
   */
  patchV3TeammatesUsername: (input: {
    /** Set to True if this teammate should be promoted to an admin user. If True, scopes should be an empty array. */
    is_admin: boolean;
    /** Provide list of scopes that should be given to teammate. If specifying list of scopes, is_admin should be set to False. */
    scopes: (string)[];
    /** The username of the teammate that you want to retrieve. */
    username: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ address?: string; address2?: string; city?: string; country?: string; email?: string; first_name?: string; is_admin?: boolean; last_name?: string; phone?: string; scopes?: (string)[]; state?: string; user_type?: "admin" | "owner" | "teammate"; username?: string; website?: string; zip?: string }>;

  /**
   * Retrieve paged transactional templates.
   */
  getTemplates: (input: {
    /** Comma-delimited list specifying which generations of templates to return. Options are `legacy`, `dynamic` or `legacy,dynamic`. */
    generations?: "legacy" | "dynamic" | "legacy,dynamic";
    /** The number of templates to be returned in each page of results */
    page_size: number;
    /** A token corresponding to a specific page of results, as provided by metadata */
    page_token?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ _metadata?: Metadata; result?: (TransactionalTemplatesTemplateLean)[] }>;

  /**
   * Create a transactional template.
   */
  postTemplates: (input: {
    /** Defines whether the template supports dynamic replacement. */
    generation?: "legacy" | "dynamic";
    /** The name for the new transactional template. */
    name: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<TransactionalTemplate>;

  /**
   * Delete a template.
   */
  deleteTemplatesTemplateId: (input: {
    template_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a single transactional template.
   */
  getTemplatesTemplateId: (input: {
    template_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<TransactionalTemplate>;

  /**
   * Edit a transactional template.
   */
  patchTemplatesTemplateId: (input: {
    /** The name of the transactional template. */
    name?: string;
    template_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<TransactionalTemplate>;

  /**
   * Duplicate a transactional template.
   */
  postTemplatesTemplateId: (input: {
    /** The name for the new transactional template. */
    name?: string;
    template_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<TransactionalTemplate>;

  /**
   * Create a new transactional template version.
   */
  postTemplatesTemplateIdVersions: (input: {
    /** Set the version as the active version associated with the template (0 is inactive, 1 is active). Only one version of a template can be active. The first version created for a template will automatically be set to Active. */
    active?: 0 | 1;
    /** The editor used in the UI. */
    editor?: "code" | "design";
    /** If true, plain_content is always generated from html_content. If false, plain_content is not altered. */
    generate_plain_content?: boolean;
    /** The HTML content of the version. Maximum of 1048576 bytes allowed. */
    html_content?: string;
    /** Name of the transactional template version. */
    name: string;
    /** Text/plain content of the transactional template version. Maximum of 1048576 bytes allowed. */
    plain_content?: string;
    /** Subject of the new transactional template version. */
    subject: string;
    /** For dynamic templates only, the mock json data that will be used for template preview and test sends. */
    test_data?: string;
    template_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<TransactionalTemplateVersionOutput>;

  /**
   * Delete a transactional template version.
   */
  deleteTemplatesTemplateIdVersionsVersionId: (input: {
    /**  The ID of the original template */
    template_id: string;
    /** The ID of the template version */
    version_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Retrieve a specific transactional template version.
   */
  getTemplatesTemplateIdVersionsVersionId: (input: {
    /**  The ID of the original template */
    template_id: string;
    /** The ID of the template version */
    version_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<TransactionalTemplateVersionOutput>;

  /**
   * Edit a transactional template version.
   */
  patchTemplatesTemplateIdVersionsVersionId: (input: {
    /** Set the version as the active version associated with the template (0 is inactive, 1 is active). Only one version of a template can be active. The first version created for a template will automatically be set to Active. */
    active?: 0 | 1;
    /** The editor used in the UI. */
    editor?: "code" | "design";
    /** If true, plain_content is always generated from html_content. If false, plain_content is not altered. */
    generate_plain_content?: boolean;
    /** The HTML content of the version. Maximum of 1048576 bytes allowed. */
    html_content?: string;
    /** Name of the transactional template version. */
    name: string;
    /** Text/plain content of the transactional template version. Maximum of 1048576 bytes allowed. */
    plain_content?: string;
    /** Subject of the new transactional template version. */
    subject: string;
    /** For dynamic templates only, the mock json data that will be used for template preview and test sends. */
    test_data?: string;
    /**  The ID of the original template */
    template_id: string;
    /** The ID of the template version */
    version_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<TransactionalTemplateVersionOutput>;

  /**
   * Activate a transactional template version.
   */
  postTemplatesTemplateIdVersionsVersionIdActivate: (input: {
    /** The ID of the original template */
    template_id: string;
    /** The ID of the template version */
    version_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<TransactionalTemplateVersionOutput>;

  /**
   * Retrieve Tracking Settings
   */
  getTrackingSettings: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result?: ({ description?: string; enabled?: boolean; name?: string; title?: string })[] }>;

  /**
   * Retrieve Click Track Settings
   */
  getTrackingSettingsClick: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ClickTracking>;

  /**
   * Update Click Tracking Settings
   */
  patchTrackingSettingsClick: (input: {
    /** The setting you want to use for click tracking. */
    enabled?: boolean;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ClickTracking>;

  /**
   * Retrieve Google Analytics Settings
   */
  getTrackingSettingsGoogleAnalytics: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<GoogleAnalyticsSettings>;

  /**
   * Update Google Analytics Settings
   */
  patchTrackingSettingsGoogleAnalytics: (input: {
    /** Indicates if Google Analytics is enabled. */
    enabled?: boolean;
    /** The name of the campaign. */
    utm_campaign?: string;
    /** Used to differentiate ads */
    utm_content?: string;
    /** Name of the marketing medium (e.g. "Email"). */
    utm_medium?: string;
    /** Name of the referrer source.  */
    utm_source?: string;
    /** Any paid keywords. */
    utm_term?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<GoogleAnalyticsSettings>;

  /**
   * Get Open Tracking Settings
   */
  getTrackingSettingsOpen: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ enabled: boolean }>;

  /**
   * Update Open Tracking Settings
   */
  patchTrackingSettingsOpen: (input: {
    /** The new status that you want to set for open tracking. */
    enabled?: boolean;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ enabled: boolean }>;

  /**
   * Retrieve Subscription Tracking Settings
   */
  getTrackingSettingsSubscription: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<SubscriptionTrackingSettings>;

  /**
   * Update Subscription Tracking Settings
   */
  patchTrackingSettingsSubscription: (input: {
    /** Indicates if subscription tracking is enabled. */
    enabled?: boolean;
    /** The information and HTML for your unsubscribe link.  */
    html_content?: string;
    /** The HTML that will be displayed on the page that your customers will see after clicking unsubscribe, hosted on SendGrid’s server. */
    landing?: string;
    /** The information in plain text for your unsubscribe link. You should have the “<% %>” tag in your content, otherwise the user will have no URL for unsubscribing. */
    plain_content?: string;
    /** Your custom defined replacement tag for your templates. Use this tag to place your unsubscribe content anywhere in your emailtemplate. */
    replace?: string;
    /** The URL where you would like your users sent to unsubscribe. */
    url?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<SubscriptionTrackingSettings>;

  /**
   * Get a user's account information.
   */
  getUserAccount: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ reputation: number; type: "free" | "paid" }>;

  /**
   * Retrieve your credit balance
   */
  getUserCredits: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ last_reset: string; next_reset: string; overage: number; remain: number; reset_frequency: string; total: number; used: number }>;

  /**
   * Retrieve your account email address
   */
  getUserEmail: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ email: string }>;

  /**
   * Update your account email address
   */
  putUserEmail: (input: {
    /** The new email address that you would like to use for your account. */
    email?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ email: string }>;

  /**
   * Update your password
   */
  putUserPassword: (input: {
    /** The new password you would like to use for your account. */
    new_password: string;
    /** The old password for your account. */
    old_password: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Get a user's profile
   */
  getUserProfile: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ address: string; address2?: string; city: string; company: string; country: string; first_name: string; last_name: string; phone: string; state: string; website: string; zip: string }>;

  /**
   * Update a user's profile
   */
  patchUserProfile: (input: {
    /** The street address for this user profile. */
    address?: string;
    /** An optional second line for the street address of this user profile. */
    address2?: string;
    /** The city for the user profile. */
    city?: string;
    /** That company that this user profile is associated with. */
    company?: string;
    /** Th country of this user profile. */
    country?: string;
    /** The first name of the user. */
    first_name?: string;
    /** The last name of the user. */
    last_name?: string;
    /** The phone number for the user. */
    phone?: string;
    /** The state for this user. */
    state?: string;
    /** The website associated with this user. */
    website?: string;
    /** The zip code for this user. */
    zip?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<UserProfile>;

  /**
   * Retrieve all scheduled sends
   */
  getUserScheduledSends: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(UserScheduledSendStatus)[]>;

  /**
   * Cancel or pause a scheduled send
   */
  postUserScheduledSends: (input: {
    /** The batch ID is the identifier that your scheduled mail sends share. */
    batch_id: string;
    /** The status of the send you would like to implement. This can be pause or cancel. To delete a pause or cancel status see DELETE /v3/user/scheduled_sends/{batch_id} */
    status: "pause" | "cancel";
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<UserScheduledSendStatus>;

  /**
   * Delete a cancellation or pause from a scheduled send
   */
  deleteUserScheduledSendsBatchId: (input: {
    batch_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ errors?: ({ field?: string; help?: { [key: string]: unknown }; message?: string })[]; id?: string }>;

  /**
   * Retrieve scheduled send
   */
  getUserScheduledSendsBatchId: (input: {
    batch_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(UserScheduledSendStatus)[]>;

  /**
   * Update a scheduled send
   */
  patchUserScheduledSendsBatchId: (input: {
    /** The status you would like the scheduled send to have. */
    status: "cancel" | "pause";
    batch_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Retrieve current Enforced TLS settings.
   */
  getUserSettingsEnforcedTls: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<EnforcedTlsRequestResponse>;

  /**
   * Update Enforced TLS settings
   */
  patchUserSettingsEnforcedTls: (input: {
    /** Indicates if you want to require your recipients to support TLS.  */
    require_tls?: boolean;
    /** Indicates if you want to require your recipients to have a valid certificate. */
    require_valid_cert?: boolean;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<EnforcedTlsRequestResponse>;

  /**
   * Retrieve your username
   */
  getUserUsername: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ user_id: number; username: string }>;

  /**
   * Update your username
   */
  putUserUsername: (input: {
    /** The new username you would like to use for your account. */
    username?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ username: string }>;

  /**
   * Retrieve Event Webhook settings
   */
  getUserWebhooksEventSettings: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<EventWebhookResponse>;

  /**
   * Update Event Notification Settings
   */
  patchUserWebhooksEventSettings: (input: {
    /** Receiving server could not or would not accept message. */
    bounce: boolean;
    /** Recipient clicked on a link within the message. You need to enable Click Tracking for getting this type of event. */
    click: boolean;
    /** Recipient's email server temporarily rejected message. */
    deferred: boolean;
    /** Message has been successfully delivered to the receiving server. */
    delivered: boolean;
    /** You may see the following drop reasons: Invalid SMTPAPI header, Spam Content (if spam checker app enabled), Unsubscribed Address, Bounced Address, Spam Reporting Address, Invalid, Recipient List over Package Quota */
    dropped: boolean;
    /** Indicates if the event webhook is enabled. */
    enabled: boolean;
    /** Recipient resubscribes to specific group by updating preferences. You need to enable Subscription Tracking for getting this type of event. */
    group_resubscribe: boolean;
    /** Recipient unsubscribe from specific group, by either direct link or updating preferences. You need to enable Subscription Tracking for getting this type of event. */
    group_unsubscribe: boolean;
    /** The client ID Twilio SendGrid sends to your OAuth server or service provider to generate an OAuth access token. When passing data in this field, you must also include the oauth_token_url field. */
    oauth_client_id?: string;
    /** This secret is needed only once to create an access token. SendGrid will store this secret, allowing you to update your Client ID and Token URL without passing the secret to SendGrid again.  When passing data in this field, you must also include the oauth_client_id and oauth_token_url fields. */
    oauth_client_secret?: string;
    /** The URL where Twilio SendGrid sends the Client ID and Client Secret to generate an access token. This should be your OAuth server or service provider. When passing data in this field, you must also include the oauth_client_id field. */
    oauth_token_url?: string;
    /** Recipient has opened the HTML message. You need to enable Open Tracking for getting this type of event. */
    open: boolean;
    /** Message has been received and is ready to be delivered. */
    processed: boolean;
    /** Recipient marked a message as spam. */
    spam_report: boolean;
    /** Recipient clicked on message's subscription management link. You need to enable Subscription Tracking for getting this type of event. */
    unsubscribe: boolean;
    /** The URL that you want the event webhook to POST to. */
    url: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<EventWebhookResponse>;

  /**
   * Retrieve Signed Webhook Public Key
   */
  getUserWebhooksEventSettingsSigned: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ public_key: string }>;

  /**
   * Enable/Disable Signed Webhook
   */
  patchUserWebhooksEventSettingsSigned: (input: {
    enabled: boolean;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ public_key: string }>;

  /**
   * Test Event Notification Settings
   */
  postUserWebhooksEventTest: (input: {
    /** The client ID Twilio SendGrid sends to your OAuth server or service provider to generate an OAuth access token. When passing data in this field, you must also include the oauth_client_secret and oauth_token_url fields. */
    oauth_client_id?: string;
    /** This secret is needed only once to create an access token. SendGrid will store this secret, allowing you to update your Client ID and Token URL without passing the secret to SendGrid again.  When passing data in this field, you must also include the oauth_client_id and oauth_token_url fields. */
    oauth_client_secret?: string;
    /** The URL where Twilio SendGrid sends the Client ID and Client Secret to generate an access token. This should be your OAuth server or service provider.  When passing data in this field, you must also include the oauth_client_id and oauth_client_secret fields. */
    oauth_token_url?: string;
    /** The URL where you would like the test notification to be sent. */
    url?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<unknown>;

  /**
   * Retrieve all parse settings
   */
  getUserWebhooksParseSettings: (options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ result?: (ParseSetting)[] }>;

  /**
   * Create a parse setting
   */
  postUserWebhooksParseSettings: (input: {
    /** A specific and unique domain or subdomain that you have created to use exclusively to parse your incoming email. For example, `parse.yourdomain.com`. */
    hostname?: string;
    /** Indicates if you would like SendGrid to post the original MIME-type content of your parsed email. When this parameter is set to `true`, SendGrid will send a JSON payload of the content of your email. */
    send_raw?: boolean;
    /** Indicates if you would like SendGrid to check the content parsed from your emails for spam before POSTing them to your domain. */
    spam_check?: boolean;
    /** The public URL where you would like SendGrid to POST the data parsed from your email. Any emails sent with the given hostname provided (whose MX records have been updated to point to SendGrid) will be parsed and POSTed to this URL. */
    url?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ParseSetting>;

  /**
   * Delete a parse setting
   */
  deleteUserWebhooksParseSettingsHostname: (input: {
    /** The hostname associated with the inbound parse setting that you would like to retrieve. */
    hostname: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a specific parse setting
   */
  getUserWebhooksParseSettingsHostname: (input: {
    /** The hostname associated with the inbound parse setting that you would like to retrieve. */
    hostname: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ParseSetting>;

  /**
   * Update a parse setting
   */
  patchUserWebhooksParseSettingsHostname: (input: {
    /** A specific and unique domain or subdomain that you have created to use exclusively to parse your incoming email. For example, `parse.yourdomain.com`. */
    hostname?: string;
    /** Indicates if you would like SendGrid to post the original MIME-type content of your parsed email. When this parameter is set to `true`, SendGrid will send a JSON payload of the content of your email. */
    send_raw?: boolean;
    /** Indicates if you would like SendGrid to check the content parsed from your emails for spam before POSTing them to your domain. */
    spam_check?: boolean;
    /** The public URL where you would like SendGrid to POST the data parsed from your email. Any emails sent with the given hostname provided (whose MX records have been updated to point to SendGrid) will be parsed and POSTed to this URL. */
    url?: string;
  }, options: { params: { hostname: string }; headers?: { "on-behalf-of"?: string } }) => Promise<ParseSetting>;

  /**
   * Retrieves Inbound Parse Webhook statistics.
   */
  getUserWebhooksParseStats: (input: {
    /** The number of statistics to return on each page. */
    limit?: string;
    /** The number of statistics to skip. */
    offset?: string;
    /** How you would like the statistics to by grouped.  */
    aggregated_by?: "day" | "week" | "month";
    /** The starting date of the statistics you want to retrieve. Must be in the format YYYY-MM-DD */
    start_date: string;
    /** The end date of the statistics you want to retrieve. Must be in the format YYYY-MM-DD */
    end_date?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<({ date: string; stats: ({ metrics?: { received: number } })[] })[]>;

  /**
   * Validate an email
   */
  postValidationsEmail: (input: {
    /** The email address that you want to validate. */
    email: string;
    /** A one-word classifier for where this validation originated. */
    source?: string;
  }) => Promise<{ result: { checks: { additional: { has_known_bounces: boolean; has_suspected_bounces: boolean }; domain: { has_mx_or_a_record: boolean; has_valid_address_syntax: boolean; is_suspected_disposable_address: boolean }; local_part: { is_suspected_role_address: boolean } }; email: string; host: string; ip_address: string; local: string; score: number; source?: string; suggestion?: string; verdict: "Valid" | "Risky" | "Invalid" } }>;

  /**
   * Get All Verified Senders
   */
  getVerifiedSenders: (input: {
    limit?: number;
    lastSeenID?: number;
    id?: number;
  }) => Promise<{ results?: (VerifiedSenderResponseSchema)[] }>;

  /**
   * Create Verified Sender Request
   */
  postVerifiedSenders: (input: {
    address?: string;
    address2?: string;
    city?: string;
    country?: string;
    from_email: string;
    from_name?: string;
    nickname: string;
    reply_to: string;
    reply_to_name?: string;
    state?: string;
    zip?: string;
  }) => Promise<VerifiedSenderResponseSchema>;

  /**
   * Domain Warn List
   */
  getVerifiedSendersDomains: () => Promise<{ results: { hard_failures: (string)[]; soft_failures: (string)[] } }>;

  /**
   * Resend Verified Sender Request
   */
  postVerifiedSendersResendId: (input: {
    id: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Completed Steps
   */
  getVerifiedSendersStepsCompleted: () => Promise<{ results?: { domain_verified?: boolean; sender_verified?: boolean } }>;

  /**
   * Verify Sender Request
   */
  getVerifiedSendersVerifyToken: (input: {
    token: string;
  }) => Promise<GlobalErrorResponseSchema>;

  /**
   * Delete Verified Sender
   */
  deleteVerifiedSendersId: (input: {
    id: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Edit Verified Sender
   */
  patchVerifiedSendersId: (input: {
    address?: string;
    address2?: string;
    city?: string;
    country?: string;
    from_email: string;
    from_name?: string;
    nickname: string;
    reply_to: string;
    reply_to_name?: string;
    state?: string;
    zip?: string;
    id: string;
  }) => Promise<VerifiedSenderResponseSchema>;

  /**
   * Email DNS records to a co-worker
   */
  postWhitelabelDnsEmail: (input: {
    /** The ID of your SendGrid domain record. */
    domain_id: number;
    /** The email address to send the DNS information to. */
    email: string;
    link_id: number;
    /** A custom text block to include in the email body sent with the records. */
    message?: string;
  }) => Promise<{ errors?: { error?: string; field?: string } }>;

  /**
   * List all authenticated domains
   */
  getWhitelabelDomains: (input: {
    /** Number of domains to return. */
    limit?: number;
    /** Paging offset. */
    offset?: number;
    /** Exclude subuser domains from the result. */
    exclude_subusers?: boolean;
    /** The username associated with an authenticated domain. */
    username?: string;
    /** Search for authenticated domains. */
    domain?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<DomainAuthentication200Response>;

  /**
   * Authenticate a domain
   */
  postWhitelabelDomains: (input: {
    /** Whether to allow SendGrid to manage your SPF records, DKIM keys, and DKIM key rotation. */
    automatic_security?: boolean;
    /** Add a custom DKIM selector. Accepts three letters or numbers. */
    custom_dkim_selector?: string;
    /** Specify whether to use a custom SPF or allow SendGrid to manage your SPF. This option is only available to authenticated domains set up for manual security. */
    custom_spf?: boolean;
    /** Whether to use this authenticated domain as the fallback if no authenticated domains match the sender's domain. */
    default?: boolean;
    /** Domain being authenticated. */
    domain: string;
    /** The IP addresses that will be included in the custom SPF record for this authenticated domain. */
    ips?: (string)[];
    /** The subdomain to use for this authenticated domain. */
    subdomain?: string;
    /** The username associated with this domain. */
    username?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<AuthenticationDomain>;

  /**
   * Get the default authentication
   */
  getWhitelabelDomainsDefault: (input: {
    /** The domain to find a default authentication. */
    domain?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<DomainAuthentication200Response>;

  /**
   * Disassociate an authenticated domain from a given user.
   */
  deleteWhitelabelDomainsSubuser: (input: {
    /** Username for the subuser to find associated authenticated domain. */
    username?: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * List the authenticated domain associated with the given user.
   */
  getWhitelabelDomainsSubuser: (input: {
    /** Username for the subuser to find associated authenticated domain. */
    username: string;
  }) => Promise<DomainAuthenticationDomainSpf>;

  /**
   * Delete an authenticated domain.
   */
  deleteWhitelabelDomainsDomainId: (input: {
    domain_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve an authenticated domain
   */
  getWhitelabelDomainsDomainId: (input: {
    domain_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<AuthenticationDomain>;

  /**
   * Update an authenticated domain
   */
  patchWhitelabelDomainsDomainId: (input: {
    /** Indicates whether to generate a custom SPF record for manual security. */
    custom_spf?: boolean;
    /** Indicates whether this is the default authenticated domain. */
    default?: boolean;
    domain_id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<DomainAuthentication200Response>;

  /**
   * Associate an authenticated domain with a given user.
   */
  postWhitelabelDomainsDomainIdSubuser: (input: {
    /** Username to associate with the authenticated domain. */
    username: string;
    /** ID of the authenticated domain to associate with the subuser */
    domain_id: number;
  }) => Promise<DomainAuthenticationDomainSpf>;

  /**
   * Add an IP to an authenticated domain
   */
  postWhitelabelDomainsIdIps: (input: {
    /** IP to associate with the domain. Used for manually specifying IPs for custom SPF. */
    ip: string;
    /** ID of the domain to which you are adding an IP */
    id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<DomainAuthenticationDomainSpf>;

  /**
   * Remove an IP from an authenticated domain.
   */
  deleteWhitelabelDomainsIdIpsIp: (input: {
    /** ID of the domain to delete the IP from. */
    id: number;
    /** IP to remove from the domain. */
    ip: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<DomainAuthenticationDomainSpf>;

  /**
   * Validate a domain authentication.
   */
  postWhitelabelDomainsIdValidate: (input: {
    /** ID of the domain to validate. */
    id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ id?: number; valid?: boolean; validation_results?: { dkim1?: { reason?: string | null; valid?: boolean }; dkim2?: { reason?: string | null; valid?: boolean }; mail_cname?: { reason?: string | null; valid?: boolean }; spf?: { reason?: string | null; valid?: boolean } } }>;

  /**
   * Retrieve all reverse DNS records
   */
  getWhitelabelIps: (input: {
    /** The maximum number of results to retrieve. */
    limit?: number;
    /** The point in the list of results to begin retrieving IP addresses from. */
    offset?: number;
    /** The IP address segment that you'd like to use in a prefix search. */
    ip?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(ReverseDns)[]>;

  /**
   * Set up reverse DNS
   */
  postWhitelabelIps: (input: {
    /** The root, or sending, domain that will be used to send message from the IP address. */
    domain: string;
    /** The IP address for which you want to set up reverse DNS. */
    ip: string;
    /** The subdomain that will be used to send emails from the IP address. This should be the same as the subdomain used to set up an authenticated domain. */
    subdomain?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ReverseDns>;

  /**
   * Delete a reverse DNS record
   */
  deleteWhitelabelIpsId: (input: {
    /** The ID of the reverse DNS record that you would like to retrieve. */
    id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a reverse DNS record
   */
  getWhitelabelIpsId: (input: {
    /** The ID of the reverse DNS record that you would like to retrieve. */
    id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<ReverseDns>;

  /**
   * Validate a reverse DNS record
   */
  postWhitelabelIpsIdValidate: (input: {
    /** The ID of the reverse DNS record that you would like to validate. */
    id: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ id: number; valid: true | false; validation_results: { a_record?: { reason: string | null; valid: true | false } } }>;

  /**
   * Retrieve all branded links
   */
  getWhitelabelLinks: (input: {
    /** Limits the number of results returned per page. */
    limit?: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<(LinkBranding200Response)[]>;

  /**
   * Create a branded link
   */
  postWhitelabelLinks: (input: {
    /** Indicates if you want to use this link branding as the default or fallback. When setting a new default, the existing default link branding will have its default status removed automatically. */
    default?: true | false;
    /** The root domain for the subdomain that you are creating the link branding for. This should match your FROM email address. */
    domain: string;
    /** The subdomain to create the link branding for. Must be different from the subdomain you used for authenticating your domain. */
    subdomain?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<LinkBranding200Response>;

  /**
   * Retrieve the default branded link
   */
  getWhitelabelLinksDefault: (input: {
    /** The domain to match against when finding the default branded link. */
    domain?: string;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<LinkBranding200Response>;

  /**
   * Disassociate a branded link from a subuser
   */
  deleteWhitelabelLinksSubuser: (input: {
    /** The username of the subuser account that you want to disassociate a branded link from. */
    username: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a subuser's branded link
   */
  getWhitelabelLinksSubuser: (input: {
    /** The username of the subuser to retrieve associated branded links for. */
    username: string;
  }) => Promise<LinkBranding200Response>;

  /**
   * Delete a branded link
   */
  deleteWhitelabelLinksId: (input: {
    /** The ID of the branded link you want to retrieve. */
    id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ [key: string]: unknown }>;

  /**
   * Retrieve a branded link
   */
  getWhitelabelLinksId: (input: {
    /** The ID of the branded link you want to retrieve. */
    id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<LinkBranding200Response>;

  /**
   * Update a branded link
   */
  patchWhitelabelLinksId: (input: {
    /** Indicates if the branded link is set as the default. When setting a new default, the existing default link branding will have its default status removed automatically. */
    default?: true | false;
    /** The ID of the branded link you want to retrieve. */
    id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<LinkBranding200Response>;

  /**
   * Validate a branded link
   */
  postWhitelabelLinksIdValidate: (input: {
    /** The ID of the branded link that you want to validate. */
    id: number;
  }, options?: { headers?: { "on-behalf-of"?: string } }) => Promise<{ id: number; valid: true | false; validation_results: { domain_cname: { reason: string | null; valid: true | false }; owner_cname?: { reason: string | null; valid: true | false } } }>;

  /**
   * Associate a branded link with a subuser
   */
  postWhitelabelLinksLinkIdSubuser: (input: {
    /** The username of the subuser account that you want to associate the branded link with. */
    username?: string;
    /** The ID of the branded link you want to associate. */
    link_id: number;
  }) => Promise<LinkBranding200Response>;
};

export * from "./schemas.js";
