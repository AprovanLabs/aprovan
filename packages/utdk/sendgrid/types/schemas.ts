export type TneSenderId = { id?: number } & SendersIdRequestBody & { created_at?: number; locked?: boolean; updated_at?: number; verified?: { reason?: string | null; status?: boolean } };

export type Metadata = {
  count?: number;
  next?: string;
  prev?: string;
  self?: string;
};

export type AbbvMessage = {
  clicks_count: number;
  from_email: string;
  /** iso 8601 format */
  last_event_time: string;
  msg_id: string;
  opens_count: number;
  status: "processed" | "delivered" | "not_delivered";
  subject: string;
  to_email: string;
};

export type AbtestSummary = {
  /** How long the A/B Testing will last */
  duration: string;
  /** Last day to select an A/B Test Winner */
  expiration_date: string | null;
  /** What percentage of your recipient will be included in your A/B testing */
  test_percentage: number;
  /** What differs between the A/B tests */
  type: "subject" | "content";
  /** How the winner will be decided */
  winner_criteria: "open" | "click" | "manual";
  /** When the winner was selected */
  winner_selected_at: string | null;
  /** Winner of the A/B Test */
  winning_template_id: string;
};

/** The individual events and their stats. */
export type AdvancedStatsClicks = {
  /** The number of links that were clicked in your emails. */
  clicks?: number;
  /** The number of unique recipients who clicked links in your emails. */
  unique_clicks?: number;
};

/** The individual events and their stats. */
export type AdvancedStatsClicksOpens = AdvancedStatsClicks & AdvancedStatsOpens;

/** The individual events and their stats. */
export type AdvancedStatsMailboxProvider = AdvancedStatsClicksOpens & { blocks?: number; bounces?: number; deferred?: number; delivered?: number; drops?: number; processed?: number; requests?: number; spam_reports?: number };

/** The individual events and their stats. */
export type AdvancedStatsOpens = {
  /** The total number of times your emails were opened by recipients. */
  opens?: number;
  /** The number of unique recipients who opened your emails. */
  unique_opens?: number;
};

export type AllSegmentsResponse = {
  _metadata?: Metadata;
  /** Total number of contacts present in the segment */
  contacts_count: number;
  /** ISO8601 timestamp of when the object was created */
  created_at: string;
  /** ID assigned to the segment when created. */
  id: string;
  /** Name of the segment. */
  name: string;
  /** ISO8601 timestamp of when the samples will be next updated */
  next_sample_update: string;
  /** The array of list ids to filter contacts on when building this segment. It allows only one such list id for now. We will support more in future */
  parent_list_ids: (string)[];
  /** If not set, segment contains a query for use with Segment v1 APIs. If set to '2', segment contains a SQL query for use in v2. */
  query_version: string;
  /** ISO8601 timestamp of when the samples were last updated */
  sample_updated_at: string;
  status: SegmentStatusResponse;
  /** ISO8601 timestamp of when the object was last updated */
  updated_at: string;
};

export type ApiError = {
  error_id: string;
  field: string;
  message: string;
};

export type ApiErrors = {
  errors?: (ApiError)[];
};

export type ApiKeyNameId = {
  /** The ID of your API Key.  */
  api_key_id?: string;
  /** The name of your API Key. */
  name?: string;
};

export type ApiKeyNameIdScopes = { scopes?: (string)[] } & ApiKeyNameId;

export type AuthenticationDomain = {
  /** Indicates if this authenticated domain uses automated security. */
  automatic_security: boolean;
  /** Indicates whether this authenticated domain uses custom SPF. */
  custom_spf: boolean;
  /** Indicates if this is the default authenticated domain. */
  default: boolean;
  /** The DNS records used to authenticate the sending domain. */
  dns: { dkim1: { data: string; host: string; type: string; valid: boolean }; dkim2: { data: string; host: string; type: string; valid: boolean }; mail_cname: { data: string; host: string; type: string; valid: boolean } };
  /** The domain to be authenticated. */
  domain: string;
  /** The ID of the authenticated domain. */
  id: number;
  /** The IPs to be included in the custom SPF record for this authenticated domain. */
  ips: (string)[];
  /** Indicates if this authenticated domain was created using the legacy whitelabel tool. If it is a legacy whitelabel, it will still function, but you'll need to create a new authenticated domain if you need to update it. */
  legacy: boolean;
  /** The subdomain to use for this authenticated domain. */
  subdomain: string;
  /** The ID of the user that this domain is associated with. */
  user_id: number;
  /** The username that this domain will be associated with. */
  username: string;
  /** Indicates if this is a valid authenticated domain. */
  valid: boolean;
};

export type AutomationsLinkStatsResponse = {
  _metadata: LinkTrackingMetadata;
  results: ({ clicks: number; step_id: string; url: string; url_location?: number })[];
  total_clicks: number;
};

export type AutomationsResponse = {
  _metadata?: Metadata2;
  results: ({ aggregation: string; id: string; stats?: Metrics; step_id: string })[];
};

export type BlocksResponse = ({ created: number; email: string; reason: string; status: string })[];

export type BounceResponse = {
  /** The unix timestamp for when the bounce record was created at SendGrid. */
  created?: number;
  /** The email address that was added to the bounce list. */
  email?: string;
  /** The reason for the bounce. This typically will be a bounce code, an enhanced code, and a description. */
  reason?: string;
  /** Enhanced SMTP bounce response */
  status?: string;
};

export type CampaignRequest = {
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
};

export type CampaignResponse = CampaignRequest & { id?: number; status: string };

export type CategoryStats = {
  /** The date the statistics were gathered. */
  date: string;
  stats?: ({ metrics?: { blocks: number; bounce_drops: number; bounces: number; clicks: number; deferred: number; delivered: number; invalid_emails: number; opens: number; processed: number; requests: number; spam_report_drops: number; spam_reports: number; unique_clicks: number; unique_opens: number; unsubscribe_drops: number; unsubscribes: number }; name?: string; type: string })[];
};

export type CcBccEmailObject = {
  /** The intended recipient's email address. */
  email: string;
  /** The intended recipient's name. */
  name?: string;
};

export type ClickTracking = {
  /** Indicates if click tracking is enabled for plain text emails. */
  enable_text: boolean;
  /** Indicates if click tracking is enabled or disabled. */
  enabled: boolean;
};

export type ContactDetails = {
  _metadata?: Selfmetadata;
  address_line_1?: string;
  address_line_2?: string;
  alternate_emails?: (string)[];
  city?: string;
  country?: string;
  /** The ISO8601 timestamp when the contact was created. */
  created_at: string;
  custom_fields?: CustomFieldsByName;
  email?: string;
  first_name?: string;
  id: string;
  last_name?: string;
  list_ids: (string)[];
  postal_code?: string;
  state_province_region?: string;
  /** The ISO8601 timestamp when the contact was updated. */
  updated_at: string;
};

export type ContactDetails2 = {
  _metadata?: Selfmetadata;
  address_line_1?: string;
  address_line_2?: string;
  alternate_emails?: (string)[] | null;
  city?: string;
  country?: string;
  created_at: string;
  custom_fields?: { [key: string]: unknown };
  email?: string;
  facebook?: string;
  first_name?: string;
  id: string;
  last_name?: string;
  line?: string;
  list_ids: (string)[];
  phone_number?: string;
  postal_code?: string;
  segment_ids?: (string)[];
  state_province_region?: string;
  unique_name?: string;
  updated_at: string;
  whatsapp?: string;
};

export type ContactDetails3 = {
  _metadata?: Selfmetadata;
  address_line_1?: string;
  address_line_2?: string;
  alternate_emails?: (string)[];
  city?: string;
  country?: string;
  created_at: string;
  custom_fields?: { [key: string]: unknown };
  email?: string;
  facebook?: string;
  first_name?: string;
  id: string;
  last_name?: string;
  line?: string;
  list_ids: (string)[];
  phone_number?: string;
  postal_code?: string;
  segment_ids: (string)[];
  state_province_region?: string;
  unique_name?: string;
  updated_at: string;
  whatsapp?: string;
};

export type ContactExport = {
  _metadata?: Metadata2;
  /** The ISO8601 timestamp when the export was completed. */
  completed_at?: string;
  /** The total number of exported contacts. */
  contact_count?: number;
  /** The ISO8601 timestamp when the export was begun. */
  created_at: string;
  /** The ISO8601 timestamp when the exported file on S3 will expire. */
  expires_at: string;
  id: string;
  /** A human readable message if the status is `failure`. */
  message?: string;
  /** The export job's status. Allowed values: `pending`, `ready`, or `failure`. */
  status: "pending" | "ready" | "failure";
  /** The ISO8601 timestamp when the export was updated. */
  updated_at: string;
  /** One or more download URLs for the contact file if the status is `ready`. */
  urls?: (string)[];
};

export type ContactImport = {
  /** The ISO8601 timestamp when the job was finished. */
  finished_at?: string;
  /** The job ID. */
  id?: string;
  /** The job type. Allowed values: `upsert`, or `delete`. */
  job_type?: string;
  /** Result map of the import job. */
  results?: { created_count?: number; deleted_count?: number; errored_count?: number; errors_url?: string; requested_count?: number; updated_count?: number };
  /** The ISO8601 timestamp when the job was created. */
  started_at?: string;
  /** The job state. Allowed values: `pending`, `completed`, `errored`, or `failed`. */
  status?: string;
};

export type ContactRequest = {
  /** The first line of the address. */
  address_line_1?: string;
  /** An optional second line for the address. */
  address_line_2?: string;
  /** Additional emails associated with the contact. */
  alternate_emails?: (string)[];
  /** The contact's city. */
  city?: string;
  /** The contact's country. Can be a full name or an abbreviation. */
  country?: string;
  custom_fields?: CustomFieldsById;
  /** The contact's primary email. This is required to be a valid email. */
  email: string;
  /** The contact's personal name. */
  first_name?: string;
  /** The contact's family name. */
  last_name?: string;
  /** The contact's ZIP code or other postal code. */
  postal_code?: string;
  /** The contact's state, province, or region. */
  state_province_region?: string;
};

export type ContactSummary = {
  _metadata?: Selfmetadata;
  /** Unix Epoch Timestamp. */
  created_at: number;
  /** Primary email address. */
  email?: string;
  first_name?: string;
  /** Contact UUID. */
  id: string;
  last_name?: string;
  /** List UUID linked with this contact. */
  list_ids: (string)[];
  /** Unix Epoch Timestamp. */
  updated_at: number;
};

export type ContactResponse = {
  /** First line of address of the contact. This is a reserved field. */
  address_line_1: string;
  /** Second line of address of the contact. This is a reserved field. */
  address_line_2: string;
  /** Alternate emails of the contact. This is a reserved field. */
  alternate_emails: (string)[];
  /** City associated with the contact. This is a reserved field. */
  city: string;
  /** Country associated with the address of the contact. This is a reserved field. */
  country: string;
  /** The user may choose to create up to 120 custom fields or none at all. This is not a reserved field. */
  custom_fields: { ""?: string; custom_field_name1?: string; custom_field_name2?: string };
  /** Email of the contact. This is a reserved field. */
  email: string;
  /** First name of the contact. This is a reserved field. */
  first_name: string;
  /** ID assigned to a contact when added to the system. */
  id: string;
  /** Last name of the contact. This is a reserved field. */
  last_name: string;
  /** IDs of all lists the contact is part of */
  list_ids?: (string)[];
  /** Zipcode associated with the address of the contact. This is a reserved field. */
  postal_code: number;
  /** IDs of all segments the contact is part of */
  segment_ids?: (string)[];
  /** State associated with the contact. This is a reserved field. */
  state_province_region: string;
};

export type ContactdbCustomField = {
  /** The name of the field */
  name?: string;
  /** The type of the field. */
  type?: "date" | "text" | "number";
};

export type ContactdbCustomFieldWithId = ContactdbCustomField & { id?: number };

export type ContactdbCustomFieldWithIdValue = ContactdbCustomFieldWithId & { value?: string | null };

export type ContactdbList = {
  /** The reference ID of your list. */
  id: number;
  /** The name of your list. Must be unique against all other list and segment names. */
  name: string;
  /** The count of recipients currently in the list. */
  recipient_count: number;
};

export type ContactdbRecipient = {
  recipients?: ({ created_at?: number; custom_fields?: (ContactdbCustomFieldWithIdValue)[]; email: string; first_name?: string | null; id?: string; last_clicked?: number | null; last_emailed?: number | null; last_name?: string | null; last_opened?: number | null; updated_at?: number })[];
};

export type ContactdbRecipientCount = {
  /** The count of recipients. */
  recipient_count: number;
};

export type ContactdbRecipientResponse = {
  /** The number of errors found while adding recipients. */
  error_count: number;
  /** The indices of the recipient(s) sent that caused the error.  */
  error_indices?: (number)[];
  errors?: ({ error_indices?: (number)[]; message?: string })[];
  /** The count of new recipients added to the contactdb. */
  new_count: number;
  /** The recipient IDs of the recipients that already existed from this request. */
  persisted_recipients: (string)[];
  /** The recipients who were updated from this request. */
  updated_count: number;
};

export type ContactdbSegments = {
  /** The conditions for a recipient to be included in this segment. */
  conditions: (ContactdbSegmentsConditions)[];
  /** The list id from which to make this segment. Not including this ID will mean your segment is created from the main contactdb rather than a list. */
  list_id?: number;
  /** The name of this segment. */
  name: string;
  /** The count of recipients in this list. This is not included on creation of segments. */
  recipient_count?: number;
};

export type ContactdbSegmentsConditions = {
  and_or?: "and" | "or" | "";
  field: string;
  operator: "eq" | "ne" | "lt" | "gt" | "contains";
  value: string;
};

export type ContactdbSegmentsWithId = { id: number } & ContactdbSegments;

export type Contacts = {
  address?: string;
  address2?: { [key: string]: unknown };
  city?: string;
  company?: string;
  country?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  state?: string;
  zip?: string;
};

export type CreateIntegrationRequest = {
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
};

export type Credentials = {
  permissions?: { api?: string; mail?: string; web?: string };
  username?: string;
};

export type CustomFieldsById = { [key: string]: unknown };

export type CustomFieldsByName = { [key: string]: unknown };

export type CustomFieldDefinitionsResponse = {
  field_type: "Text" | "Number" | "Date";
  id: string;
  name: string;
};

export type DesignCommonFields = DesignDuplicateInput & { categories?: (string)[]; generate_plain_content?: boolean; subject?: string };

export type DesignDuplicateInput = {
  /** The editor used in the UI. */
  editor?: "code" | "design";
  /** The name of the new design. */
  name?: string;
};

export type DesignInput = DesignDuplicateInput & DesignCommonFields & { html_content: string; plain_content?: string };

export type DesignOutput = DesignOutputSummary & DesignInput;

export type DesignOutputSummary = { created_at?: string; id?: string; thumbnail_url?: string; updated_at?: string } & DesignDuplicateInput & DesignCommonFields;

export type DomainAuthentication200Response = (AuthenticationDomain & { last_validation_attempt_at?: number; subusers?: ({ user_id?: number; username?: string })[] })[];

export type DomainAuthenticationDomainSpf = {
  /** Indicates if this authenticated domain uses automated security. */
  automatic_security: boolean;
  /** Indicates if this authenticated domain uses custom SPF. */
  custom_spf: boolean;
  /** Indicates if this is the default domain. */
  default: boolean;
  /** The DNS records for this authenticated domain. */
  dns: { dkim: { data: string; host: string; type: string; valid: boolean }; domain_spf: { data: string; host: string; type: string; valid: boolean }; mail_server: { data: string; host: string; type: string; valid: boolean }; subdomain_spf: { data: string; host: string; type: string; valid: boolean } };
  /** The domain authenticated. */
  domain: string;
  /** The ID of the authenticated domain. */
  id: number;
  /** The IP addresses that are included in the SPF record for this authenticated domain. */
  ips: (unknown)[];
  /** Indicates if this authenticated domain was created using the legacy whitelabel tool. If it is a legacy whitelabel, it will still function, but you'll need to create a new authenticated domain if you need to update it. */
  legacy: boolean;
  /** The subdomain that was used to create this authenticated domain. */
  subdomain?: string;
  /** The user_id of the account that this authenticated domain is associated with. */
  user_id: number;
  /** The username of the account that this authenticated domain is associated with. */
  username: string;
  /** Indicates if this is a valid authenticated domain . */
  valid: boolean;
};

export type EmailActivityResponseCommonFields = {
  /** The 'From' email address used to deliver the message. This address should be a verified sender in your Twilio SendGrid account. */
  from_email?: string;
  /** A unique ID assigned to the message. This ID can be used to retrieve activity data for the specific message. */
  msg_id?: string;
  /** The message's status. */
  status?: "processed" | "delivered" | "not delivered";
  /** The email's subject line. */
  subject?: string;
  /** The intended recipient's email address. */
  to_email?: string;
};

export type EnforcedTlsRequestResponse = {
  /** Indicates if you want to require your recipients to support TLS.  */
  require_tls?: boolean;
  /** Indicates if you want to require your recipients to have a valid certificate. */
  require_valid_cert?: boolean;
};

export type Error = {
  error_id?: string;
  field?: string;
  message: string;
  parameter?: string;
};

/** If the request is incorrect, an array of errors will be returned. */
export type Errors = {
  errors: ({ field?: string | null; message: string | null; parameter: string })[];
};

/** If the request is incorrect, an array of errors will be returned. */
export type ErrorsSegV2 = {
  errors: ({ field: string; message: string })[];
};

export type EventWebhookResponse = {
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
  /** The client ID Twilio SendGrid sends to your OAuth server or service provider to generate an OAuth access token. */
  oauth_client_id?: string;
  /** The URL where Twilio SendGrid sends the Client ID and Client Secret to generate an access token. This should be your OAuth server or service provider. */
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
};

export type EventWebhookUpdateOauthRequest = {
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
};

export type FromEmailObject = {
  /** The 'From' email address used to deliver the message. This address should be a verified sender in your Twilio SendGrid account. */
  email: string;
  /** A name or title associated with the sending email address. */
  name?: string;
};

export type FullSegment = SegmentSummary & { contacts_sample: (ContactResponse)[]; query_json?: { [key: string]: unknown } } & SegmentWriteV2;

export type GlobalEmptyRequest = unknown;

export type GlobalErrorResponseSchema = {
  errors?: ({ field?: string | null; help?: { [key: string]: unknown }; message: string })[];
  id?: string;
};

export type GlobalId = number;

export type GoogleAnalyticsSettings = {
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
};

export type InvalidEmail = {
  /** A Unix timestamp indicating when the email address was added to the invalid emails list. */
  created?: number;
  /** The email address that was marked as invalid. */
  email?: string;
  /** The reason that the email address was marked as invalid. */
  reason?: string;
};

export type IpAccessResponse = {
  /** An array listing all of your allowed IPs. */
  result?: ({ created_at?: number; id?: number; ip?: string; updated_at?: number })[];
};

export type IpPool = {
  /** The name of the IP pool. */
  name: string;
};

export type IpPoolResponse = {
  /** The name of the IP pool. */
  name?: string;
};

export type IpWarmupResponse = ({ ip: string; start_date: number })[];

export type Link = {
  href?: string;
  rel?: string;
};

export type LinkTrackingMetadata = {
  /** The number of items in the entire list, i.e., across all pages. */
  count?: number;
  /** The URL of the next page of results. If this field isn't present, you're at the end of the list. */
  next?: string;
  /** The URL of the previous page of results. If this field isn't present, you're at the start of the list. */
  prev?: string;
  /** The URL of the current page of results. */
  self?: string;
};

export type LinkBranding200Response = {
  /** Indicates if this is the default link branding. */
  default: true | false;
  /** The DNS records generated for this link branding. */
  dns: { domain_cname: { data: string; host: string; type: "cname" | "txt" | "mx"; valid: true | false }; owner_cname?: { data: string; host: string; type?: "cname" | "txt" | "mx"; valid: true | false } };
  /** The root domain of the branded link. */
  domain: string;
  /** The ID of the branded link. */
  id: number;
  /** Indicates if this link branding was created using the legacy whitelabel tool. If it is a legacy whitelabel, it will still function, but you'll need to create new link branding if you need to update it. */
  legacy: true | false;
  /** The subdomain used to generate the DNS records for this link branding. This subdomain must be different from the subdomain used for your authenticated domain. */
  subdomain?: string;
  /** The ID of the user that this link branding is associated with. */
  user_id: number;
  /** The username of the account that this link branding is associated with. */
  username: string;
  /** Indicates if this link branding is valid. */
  valid: true | false;
};

export type List = {
  _metadata?: Selfmetadata;
  /** The number of contacts currently stored on the list. */
  contact_count?: number;
  /** The generated ID for your list. */
  id?: string;
  /** The name you gave your list. */
  name?: string;
};

export type MailBatchId = {
  batch_id: string;
};

export type MailSettingsAddressWhitelabel = {
  /** Indicates if you have an email address whitelist enabled.  */
  enabled?: boolean;
  /** All email addresses that are currently on the whitelist. */
  list?: (string)[];
};

export type MailSettingsBouncePurge = {
  /** Indicates if the bounce purge mail setting is enabled. */
  enabled?: boolean;
  /** The number of days after which SendGrid will purge all contacts from your hard bounces suppression lists. */
  hard_bounces?: number | null;
  /** The number of days after which SendGrid will purge all contacts from your soft bounces suppression lists. */
  soft_bounces?: number | null;
};

export type MailSettingsFooter = {
  /** Indicates if the Footer mail setting is currently enabled. */
  enabled?: boolean;
  /** The custom HTML content of your email footer. */
  html_content?: string;
  /** The plain text content of your email footer. */
  plain_content?: string;
};

export type MailSettingsForwardBounce = {
  /** The email address that you would like your bounce reports forwarded to. */
  email?: string | null;
  /** Indicates if the bounce forwarding mail setting is enabled. */
  enabled?: boolean;
};

export type MailSettingsForwardSpam = {
  /** The email address where you would like the spam reports to be forwarded. */
  email?: string;
  /** Indicates if the Forward Spam setting is enabled. */
  enabled?: boolean;
};

export type MailSettingsPatch = {
  /** The email address of the recipient. */
  email?: string;
  /** Indicates if the mail setting is enabled. */
  enabled?: boolean;
};

export type MailSettingsTemplate = {
  /** Indicates if the legacy email template setting is enabled. */
  enabled?: boolean;
  /** The HTML content that you want to use for your legacy email template. */
  html_content?: string;
};

export type MakoEvent = {
  /** Used with "deferred" events to indicate the attempt number out of 10. One "deferred" entry will exists under events array for each time a message was deferred with error message from the server.  */
  attempt_num?: number;
  /** Use to distinguish between types of bounces */
  bounce_type: "bounced" | "blocked" | "expired";
  /** Name of event */
  event_name: "bounced" | "opened" | "clicked" | "processed" | "dropped" | "delivered" | "deferred" | "spam_report" | "unsubscribe" | "group_unsubscribe" | "group_resubscribe";
  /** Client recipient used to click or open message */
  http_user_agent: string;
  /** For example mx.gmail.com */
  mx_server: string;
  /** Date of when event occurred */
  processed: string;
  /** Explanation of what caused "bounced", "deferred", or "blocked". Usually contains error message from the server - e.g. message from gmail why mail was deferred */
  reason?: string;
  /** Used with "clicked" event to indicate which url the user clicked. */
  url: string;
};

export type Message = {
  api_key_id: string;
  asm_group_id: number;
  /** Categories users associated to the message */
  categories: (string)[];
  /** List of events related to email message */
  events: ({ attempt_num?: number; bounce_type: "bounced" | "blocked" | "expired"; event_name: "bounced" | "opened" | "clicked" | "processed" | "dropped" | "delivered" | "deferred" | "spam_report" | "unsubscribe" | "group_unsubscribe" | "group_resubscribe"; http_user_agent: string; mx_server: string; processed: string; reason?: string; url: string })[];
  from_email: string;
  msg_id: string;
  /** This is the IP of the user who sent the message. */
  originating_ip: string;
  /** IP used to send to the remote MTA. Used by UI to display IP in detailed view */
  outbound_ip: string;
  /** Whether or not the outbound IP is dedicated vs shared */
  outbound_ip_type: "dedicated" | "shared";
  /** Quick summary of the status of a message */
  status: "processed" | "not delivered" | "delivered";
  subject: string;
  /** Teammate's username */
  teammate: string;
  template_id: string;
  to_email: string;
  /** JSON hash of arbitrary key-value pairs */
  unique_args: string;
};

export type Metadata2 = {
  /** The number of items in the entire list, i.e., across all pages. */
  count?: number;
  /** The URL of the next page of results. If this field isn't present, you're at the end of the list. */
  next?: string;
  /** The URL of the previous page of results. If this field isn't present, you're at the start of the list. */
  prev?: string;
  /** The URL of the current page of results. */
  self?: string;
};

export type Metrics = {
  bounce_drops: number;
  bounces: number;
  clicks: number;
  delivered: number;
  invalid_emails: number;
  opens: number;
  requests: number;
  spam_report_drops: number;
  spam_reports: number;
  unique_clicks: number;
  unique_opens: number;
  unsubscribes: number;
};

export type Monitor = {
  /** The email address to which Sendgrid should send emails for monitoring. */
  email: string;
  /** The frequency at which to forward monitoring emails. An email will be sent when your subuser sends this many (e.g., 1,000) emails. */
  frequency: number;
};

export type ParseSetting = {
  /** A specific and unique domain or subdomain that you have created to use exclusively to parse your incoming email. For example, `parse.yourdomain.com`. */
  hostname?: string;
  /** Indicates if you would like SendGrid to post the original MIME-type content of your parsed email. When this parameter is set to `true`, SendGrid will send a JSON payload of the content of your email. */
  send_raw?: boolean;
  /** Indicates if you would like SendGrid to check the content parsed from your emails for spam before POSTing them to your domain. */
  spam_check?: boolean;
  /** The public URL where you would like SendGrid to POST the data parsed from your email. Any emails sent with the given hostname provided (whose MX records have been updated to point to SendGrid) will be parsed and POSTed to this URL. */
  url?: string;
};

export type PartnerSettingsNewRelic = {
  /** Indicates if your subuser statistics will be sent to your New Relic Dashboard. */
  enable_subuser_statistics?: boolean;
  /** Indicates if this setting is enabled.  */
  enabled: boolean;
  /** The license key provided with your New Relic account. */
  license_key: string;
};

export type ReplyToEmailObject = {
  /** The email address where any replies or bounces will be returned. */
  email: string;
  /** A name or title associated with the `reply_to` email address. */
  name?: string;
};

export type ReservedFieldDefinitionsResponse = ({ field_type?: "Text" | "Number" | "Date"; name?: string; read_only?: boolean })[];

export type ReverseDns = {
  a_record: { data: string; host: string; type: string; valid: boolean };
  /** The root, or sending, domain. */
  domain: string;
  /** The ID of the Reverse DNS. */
  id: number;
  /** The IP address that this Reverse DNS was created for. */
  ip: string;
  /** A Unix epoch timestamp representing the last time of a validation attempt. */
  last_validation_attempt_at?: number;
  /** Indicates if this Reverse DNS was created using the legacy whitelabel tool. If it is a legacy whitelabel, it will still function, but you'll need to create a new Reverse DNS if you need to update it. */
  legacy: boolean;
  /** The reverse DNS record for the IP address. This points to the Reverse DNS subdomain. */
  rdns: string;
  /** The subdomain created for this reverse DNS. This is where the rDNS record points. */
  subdomain?: string;
  /** The users who are able to send mail from the IP address. */
  users: ({ user_id: number; username: string })[];
  /** Indicates if this is a valid Reverse DNS. */
  valid: boolean;
};

export type SegmentQueryJson = {
  contacts?: { l?: { l?: { l?: { t?: string; v?: string }; op?: string; r?: { t?: string; v?: string } }; op?: string; r?: { l?: { args?: ({ t?: string; v?: string })[]; t?: string; v?: string }; op?: string; r?: { t?: string; v?: string } } }; op?: string; r?: { l?: { t?: string; v?: string }; op?: string; r?: { t?: string; v?: (string)[] } } };
};

export type SegmentResponse = {
  /** Total number of contacts present in the segment */
  contacts_count: number;
  /** A subset of all contacts that are in this segment */
  contacts_sample: (ContactResponse)[];
  /** ISO8601 timestamp of when the object was created */
  created_at: string;
  /** ID assigned to the segment when created. */
  id: string;
  /** Name of the segment. */
  name: string;
  /** ISO8601 timestamp of when the samples will be next updated */
  next_sample_update: string;
  /** The array of list ids to filter contacts on when building this segment. It allows only one such list id for now. We will support more in future */
  parent_list_ids: (string)[];
  /** SQL query which will filter contacts based on the conditions provided */
  query_dsl: string;
  /** If not set, segment contains a Query for use with Segment v1 APIs. If set to '2', segment contains a SQL query for use in v2. */
  query_version: string;
  /** ISO8601 timestamp of when the samples were last updated */
  sample_updated_at: string;
  status: SegmentStatusResponse;
  /** ISO8601 timestamp of when the object was last updated */
  updated_at: string;
};

/** Segment status indicates whether the segment's contacts will be updated periodically */
export type SegmentStatusResponse = {
  /** Describes any errors that were encountered during query validation */
  error_message?: string;
  /** Status of query validation. PENDING, VALID, or INVALID */
  query_validation: string;
};

export type SegmentSummary = {
  contacts_count: number;
  /** ISO8601 of created timestamp  */
  created_at: string;
  id: string;
  name?: string;
  /** ISO8601 string that is equal to `sample_updated_at` plus an internally calculated offset that depends on how often contacts enter or exit segments as the scheduled pipeline updates the samples. */
  next_sample_update?: string;
  /** The id of the list if this segment is a child of a list.  This implies the query `AND CONTAINS(list_ids, ${parent_list_id})` */
  parent_list_id?: string;
  /** ISO8601 timestamp the sample was last updated */
  sample_updated_at: string;
  /** ISO8601 timestamp the object was last updated */
  updated_at: string;
};

export type SegmentSummaryV2 = {
  results?: (SegmentSummary)[];
};

export type SegmentUpdate = {
  /** Name of the segment. */
  name?: string;
  /** SQL query which will filter contacts based on the conditions provided */
  query_dsl?: string;
};

export type SegmentWrite = {
  name: string;
  /** Use this field for adding your query string. */
  query_dsl: string;
};

export type SegmentWriteV2 = {
  /** Name of the segment. */
  name: string;
  /** The array of list ids to filter contacts on when building this segment. It allows only one such list id for now. We will support more in future */
  parent_list_ids?: (string)[];
  /** SQL query which will filter contacts based on the conditions provided */
  query_dsl: string;
};

export type Selfmetadata = {
  /** A link to this object. */
  self?: string;
};

export type SenderIdRequest = {
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
};

export type SenderId = SenderIdRequest & { created_at?: number; id?: number; locked?: boolean; updated_at?: number; verified?: boolean } & { [key: string]: unknown };

export type SendersIdRequestBody = {
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
};

export type SingleContactRequest = {
  contact?: { address_line_1?: string; address_line_2?: string; alternate_emails?: string; city?: string; country?: string; custom_fields?: { custom_field_name1?: string; custom_field_name2?: string }; first_name?: string; last_name?: string; postal_code?: string; primary_email?: string; state_province_region?: string };
  /** The contact's list IDs. */
  list_ids?: (string)[];
};

export type SinglesendRequest = {
  /** The categories to associate with this Single Send. */
  categories?: (string)[];
  email_config?: { custom_unsubscribe_url?: string | null; design_id?: string; editor?: "code" | "design"; generate_plain_content?: boolean; html_content?: string; ip_pool?: string | null; plain_content?: string; sender_id?: number | null; subject?: string; suppression_group_id?: number | null };
  /** The name of the Single Send. */
  name: string;
  /** The ISO 8601 time at which to send the Single Send — this must be set for a future time. */
  send_at?: string;
  send_to?: { all?: boolean; list_ids?: (string)[]; segment_ids?: (string)[] };
};

export type SinglesendResponse = SinglesendRequest & { created_at: string; id: string; status: "draft" | "scheduled" | "triggered"; updated_at?: string; warnings?: ({ field?: string; message?: string; warning_id?: string })[] };

export type SinglesendResponseShort = {
  abtest: AbtestSummary;
  /** categories to associate with this Single Send */
  categories: (string)[];
  /** the ISO 8601 time at which the Single Send was created */
  created_at: string;
  id: string;
  /** true if the Single Send's AB Test functionality has been toggled on */
  is_abtest: boolean;
  /** name of the Single Send */
  name: string;
  /** the ISO 8601 time at which to send the Single Send; must be in future */
  send_at?: string;
  /** current status of the Single Send */
  status: "draft" | "scheduled" | "triggered";
  /** the ISO 8601 time at which the Single Send was last updated */
  updated_at: string;
};

export type SinglesendSchedule = {
  /** This is the ISO 8601 time at which to send the Single Send; must be in future, or the string "now" */
  send_at: string;
  status?: "draft" | "scheduled" | "triggered";
};

export type SinglesendSearch = {
  /** categories to associate with this Single Send, match any single send that has at least one of the categories */
  categories?: (string)[];
  /** leading and trailing wildcard search on name of the Single Send */
  name?: string;
  /** current status of the Single Send */
  status?: ("draft" | "scheduled" | "triggered")[];
};

export type SinglesendWarning = {
  warnings?: ({ field?: string; message?: string; warning_id?: string })[];
};

export type SinglesendsLinkStatsResponse = {
  _metadata: LinkTrackingMetadata;
  /** This is the index of the link's location in the email contents. */
  results: ({ ab_phase: "send" | "test" | "all"; ab_variation: string; clicks: number; url: string; url_location?: number })[];
  total_clicks?: number;
};

export type SinglesendsResponse = {
  _metadata: Metadata2;
  results: ({ ab_phase: "send" | "test" | "all"; ab_variation: string; aggregation?: string; id: string; stats?: Metrics })[];
};

export type SpamReportsResponse = ({ created: number; email: string; ip: string })[];

export type SsoCertificateBody = {
  /** A unique ID assigned to the certificate by SendGrid. */
  id?: number;
  /** An ID that matches a certificate to a specific IdP integration. */
  intergration_id?: string;
  /** A unix timestamp (e.g., 1603915954) that indicates the time after which the certificate is no longer valid. */
  not_after?: number;
  /** A unix timestamp (e.g., 1603915954) that indicates the time before which the certificate is not valid. */
  not_before?: number;
  /** This certificate is used by Twilio SendGrid to verify that SAML requests are coming from Okta. This is called the X509 certificate in the Twilio SendGrid UI. */
  public_certificate?: string;
};

export type SsoErrorResponse = ({ error_id?: string; field?: string | null; message?: string })[];

export type SsoIntegration = CreateIntegrationRequest & { audience_url?: string; id?: string; last_updated: number; single_signon_url?: string };

export type SsoTeammateCommonFields = {
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
};

export type SsoTeammateRequest = SsoTeammateCommonFields & { scopes: (string)[] };

export type SsoTeammateResponse = SsoTeammateCommonFields & { is_sso?: boolean; username?: string };

export type SsoTeammatesPatchResponse = SsoTeammateResponse & { address?: string; address2?: string; city?: string; company?: string; country?: string; email?: string; phone?: string; scopes?: (string)[]; state?: string; user_type?: "admin" | "owner" | "teammate"; website?: string; zip?: string };

export type StatsAdvancedGlobalStats = AdvancedStatsClicksOpens & { blocks?: number; bounce_drops?: number; bounces?: number; deferred?: number; delivered?: number; invalid_emails?: number; processed?: number; requests?: number; spam_report_drops?: number; spam_reports?: number; unsubscribe_drops?: number; unsubscribes?: number };

export type StatsAdvancedStatsBaseSchema = ({ date?: string; stats?: ({ metrics?: { [key: string]: unknown } })[] })[];

export type SubscriptionTrackingSettings = {
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
};

export type Subuser = {
  /** Whether or not the user is enabled or disabled. */
  disabled: boolean;
  /** The email address to contact this subuser. */
  email: string;
  /** The ID of this subuser. */
  id: number;
  /** The name by which this subuser will be referred. */
  username: string;
};

export type SubuserPost = {
  authorization_token?: string;
  credit_allocation?: { type?: string };
  /** The email address for this subuser. */
  email: string;
  signup_session_token?: string;
  /** The user ID for this subuser. */
  user_id: number;
  /** The username of the subuser. */
  username: string;
};

export type SubuserStats = {
  /** The date the statistics were gathered. */
  date?: string;
  /** The list of statistics. */
  stats?: ({ first_name?: string; last_name?: string; metrics?: { blocks?: number; bounce_drops?: number; bounces?: number; clicks?: number; deferred?: number; delivered?: number; invalid_emails?: number; opens?: number; processed?: number; requests?: number; spam_report_drops?: number; spam_reports?: number; unique_clicks?: number; unique_opens?: number; unsubscribe_drops?: number; unsubscribes?: number }; name?: string; type?: string })[];
};

export type SuppressionGroupRequestBase = {
  /** A brief description of your suppression group. Required when creating a group. */
  description?: string;
  /** Indicates if you would like this to be your default suppression group. */
  is_default?: boolean;
  /** The name of your suppression group. Required when creating a group. */
  name?: string;
};

export type SuppressionGroup = {
  /** A description of the suppression group. */
  description: string;
  /** The id of the suppression group. */
  id: number;
  /** Indicates if this is the default suppression group. */
  is_default?: boolean;
  last_email_sent_at?: unknown;
  /** The name of the suppression group. Each group created by a user must have a unique name. */
  name: string;
  /** The unsubscribes associated with this group. */
  unsubscribes?: number;
};

export type SuppressionsRequest = {
  /** The array of email addresses to add or find. */
  recipient_emails: (string)[];
};

export type ToEmailArray = ({ email: string; name?: string })[];

export type TransactionalTemplateWarning = {
  /** Warning message for the user */
  message?: string;
};

export type TransactionalTemplatesTemplateLean = {
  /** Defines the generation of the template. */
  generation: "legacy" | "dynamic";
  /** The ID of the transactional template. */
  id: string;
  /** The name for the transactional template. */
  name: string;
  /** The date and time that this transactional template version was updated. */
  "updated_at ": string;
  /** The different versions of this transactional template. */
  versions?: (TransactionalTemplatesVersionOutputLean)[];
};

export type TransactionalTemplatesVersionOutputLean = {
  /** Set the version as the active version associated with the template. Only one version of a template can be active. The first version created for a template will automatically be set to Active. */
  active?: 0 | 1;
  /** The editor used in the UI. */
  editor?: "code" | "design";
  /** If true, plain_content is always generated from html_content. If false, plain_content is not altered. */
  generate_plain_content?: boolean;
  /** ID of the transactional template version. */
  id?: string;
  /** Name of the transactional template version. */
  name?: string;
  /** Subject of the new transactional template version. */
  subject?: string;
  /** ID of the transactional template. */
  template_id?: string;
  /** A Thumbnail preview of the template's html content. */
  thumbnail_url?: string;
  /** The date and time that this transactional template version was updated. */
  updated_at?: string;
};

export type TransactionalTemplate = TransactionalTemplatesTemplateLean & { warning?: TransactionalTemplateWarning };

export type TransactionalTemplateVersionCreate = {
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
};

export type TransactionalTemplateVersionOutput = { warnings?: (TransactionalTemplateWarning)[] } & TransactionalTemplateVersionCreate & TransactionalTemplatesVersionOutputLean;

export type UserProfile = {
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
};

export type UserScheduledSendStatus = MailBatchId & { status: "cancel" | "pause" };

export type VerifiedSenderRequestSchema = {
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
};

export type VerifiedSenderResponseSchema = {
  address?: string;
  address2?: string;
  city?: string;
  country?: string;
  from_email?: string;
  from_name?: string;
  id?: number;
  locked?: boolean;
  nickname?: string;
  reply_to?: string;
  reply_to_name?: string;
  state?: string;
  verified?: boolean;
  zip?: string;
};

export type Webhook = {
  /** The one time nonce to use when "signature" is "hmac-sha1" */
  nonce: string;
  /** The URL to invoke in the webhook */
  url: string;
};

export type WebhooksEventWebhookRequest = {
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
};
