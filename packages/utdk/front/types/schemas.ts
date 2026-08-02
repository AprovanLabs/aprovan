export type Account = {
  /** Name of the Account */
  name?: string;
  /** Account description */
  description?: string;
  /** List of domains associated with the Account */
  domains?: (string)[];
  /** ID of the Account in an external system */
  external_id?: string;
  /** Custom fields for this account */
  custom_fields?: CustomFieldParameter;
};

export type AccountIds = {
  account_ids: (ResourceId)[];
};

export type AccountPatch = {
  /** Name of the Account */
  name?: string;
  /** Account description */
  description?: string;
  /** List of domains associated with the Account */
  domains?: (string)[];
  /** Custom fields for this account. If you want to keep all custom fields the same when updating this resource, do not include any custom fields in the update. If you want to update custom fields, make sure to include all custom fields, not just the fields you want to add or update. If you send only the custom fields you want to update, the other custom fields will be erased. You can retrieve the existing custom fields before making the update to note the current fields. */
  custom_fields?: CustomFieldParameter;
};

export type AccountResponse = {
  _links: { self?: string; related?: { contacts?: string } };
  /** Unique identifier of the account */
  id: string;
  /** Account name */
  name: string;
  /** URL of the Account's logo */
  logo_url: string | null;
  /** Account Description */
  description: string | null;
  /** List of domains associated to the Account */
  domains: (string)[];
  /** ID of the Account in an External system, such as your backoffice system or CRM */
  external_id: string | null;
  /** Custom fields for this account */
  custom_fields: CustomFieldParameter;
  /** Timestamp when the account was created */
  created_at?: number;
  /** Timestamp when the account was updated */
  updated_at?: number;
};

export type AddContactsToList = {
  /** List of IDs of the contacts to add in the requested contact list. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  contact_ids: (ResourceId)[];
};

export type AnalyticsActivitiesColumns = "Activity ID" | "Type" | "Source" | "Message ID" | "Segment ID" | "Conversation ID" | "Ticket IDs" | "Segment" | "Segment start" | "Segment end" | "Direction" | "Status" | "Status at activity time" | "Inbox" | "Inbox API ID" | "Inbox at activity time" | "Inbox API IDs at activity time" | "Previous inbox IDs" | "Message date" | "Autoreply" | "Reaction time" | "Total reply time" | "Handle time" | "Response time" | "Stage resolution time" | "Replies to resolution" | "Ticket resolution time" | "Ticket replies to resolution" | "Attributed to" | "Assignee" | "Author" | "Contact name" | "Contact handle" | "Account names" | "From" | "To" | "Cc" | "Bcc" | "Extract" | "Tags" | "Tag API IDs" | "Tags at activity time" | "Tag API IDs at activity time" | "Tag application duration" | "Activity API ID" | "Message API ID" | "Comment API ID" | "Conversation API ID" | "Message original ID" | "New Conversation" | "First response" | "Business hours" | "Subject" | "Account name" | "Survey rating" | "Survey comment" | "Segment closed" | "Segment contains messages" | "Last segment activity" | "Added tag" | "Added tag API ID" | "Removed tag" | "Removed tag API ID" | "Segment cumulative teammates" | "Ticket status name" | "Ticket status category" | "Time spent in Ticket Status" | "Transitions to Ticket Status" | "Smart QA score" | "Custom Field" | "Updated Custom Field";

export type AnalyticsActivitiesExportsColumns = {
  /** List of the columns to include in the export. In addition to the predefined columns, you can also include parameterized columns by appending the parameter value to the column name, separated by a colon (`:`). List of supported prefixes:   - `Time spent in Ticket Status` (e.g., "Time spent in Ticket Status:sts_123", where sts_123 is the ticket status tag ID)   - `Transitions to Ticket Status` (e.g., "Transitions to Ticket Status:sts_123", where sts_123 is the ticket status tag ID)   - `Smart QA score` (e.g., "Smart QA score:Comprehension", where "Comprehension" is the Smart QA criteria ID)   - `Custom Field` (e.g., "Custom Field:fld_456", where fld_456 is the custom field ID)   - `Updated Custom Field` (e.g., "Updated Custom Field:fld_456", where fld_456 is the custom field ID)  Example: `["Message ID", "Time spent in Ticket Status:sts_123", "Smart QA score:Comprehension"]`  */
  columns: (AnalyticsActivitiesColumns | AnalyticsActivitiesParameterizedColumns | AnalyticsActivitiesSmartQaParameterizedColumn | AnalyticsActivitiesNumericParameterizedColumn)[];
};

export type AnalyticsActivitiesNumericParameterizedColumn = {
  name: "Time spent in Ticket Status" | "Transitions to Ticket Status" | "Custom Field" | "Updated Custom Field";
  id: number;
};

export type AnalyticsActivitiesParameterizedColumns = string | string | string | string | string;

export type AnalyticsActivitiesSmartQaParameterizedColumn = {
  name: "Smart QA score";
  id: AnalyticsActivitiesSmartQaScoreParameters;
};

export type AnalyticsActivitiesSmartQaScoreParameters = "Comprehension" | "Solution_Offered" | "Professionalism" | "Professional_Behavior" | "Professional_Relationship" | "Readability" | "Grammar_Spelling" | "General_Empathy" | "Cognitive_Empathy" | "Emotional_Empathy" | "Compassionate_Empathy" | "Tone" | "Adaptive_Tone" | "Neutral_Tone" | "Positive_Tone" | "Brevity" | "Demo_Offered" | "Information_Gathering" | "Upsell" | "Friendly" | "Greeting_Offered" | "Personalisation" | "Adaptability";

export type AnalyticsExportRequest = {
  /** The type of export to create. The type you specify determines which columns are available for the export. */
  type: "messages" | "events";
  /** Start time of the data to include in the export (seconds since 1970-01-01T00:00:00+00). Will be rounded down to the start of the day. */
  start: number;
  /** End time of the data to include in the export (seconds since 1970-01-01T00:00:00+00). Will be rounded up to the end of the day. */
  end: number;
  /** [IANA name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) of the timezone to format the dates with. If omitted, the export will use Etc/UTC. */
  timezone?: string;
  filters?: AnalyticsFilters;
};

export type AnalyticsExportResponse = {
  _links: { self?: string };
  /** The public ID of the analytics export */
  id: string;
  /** Status of the analytics */
  status: "running" | "done" | "too_big" | "failed";
  /** Number ranging from 0 to 100 corresponding to the percentage of the analytics processed. */
  progress: number;
  /** The URL from which the export data can be downloaded. Only displays after you make a GET request to the link included in the POST response. */
  url?: string;
  /** The filename of the export with extension included. Only displays after you make a GET request to the link included in the POST response. */
  filename?: string;
  /** Size (in bytes) of the export data. Only displays after you make a GET request to the link included in the POST response. */
  size?: number | null;
  /** Timestamp (in seconds) at which the export was requested. */
  created_at?: number;
  filters: AnalyticsFilters;
};

/** Resources to compute the analytics for. Defaults to all. */
export type AnalyticsFilters = TagIds | TeammateIds | ChannelIds | InboxIds | TeamIds | AccountIds;

export type AnalyticsMessagesColumns = "Message ID" | "Segment ID" | "Conversation ID" | "Ticket IDs" | "Segment" | "Direction" | "Status" | "Inbox" | "Inbox API ID" | "Inbox at activity time" | "Inbox API IDs at activity time" | "Message date" | "Autoreply" | "Reaction time" | "Total reply time" | "Handle time" | "Response time" | "Attributed to" | "Assignee" | "Author" | "Contact name" | "Contact handle" | "Account names" | "From" | "To" | "Cc" | "Bcc" | "Extract" | "Tags" | "Tag API IDs" | "Message API ID" | "Conversation API ID" | "New Conversation" | "First response" | "Business hours" | "Subject" | "Segment start" | "Segment end" | "Segment closed" | "Last segment activity" | "Segment cumulative teammates" | "Ticket status name" | "Ticket status category" | "Custom Field";

export type AnalyticsMessagesExportColumns = {
  /** List of the columns to include in the export.  */
  columns: (AnalyticsMessagesColumns)[];
};

export type AnalyticsMetricId = "avg_csat_survey_response" | "avg_first_response_time" | "avg_handle_time" | "avg_replies_to_resolution" | "avg_resolution_time" | "avg_response_time" | "avg_sla_breach_time" | "avg_total_reply_time" | "new_segments_count" | "num_active_segments_full" | "num_archived_segments" | "num_archived_segments_with_reply" | "num_csat_survey_response" | "num_messages_received" | "num_messages_sent" | "num_sla_breach" | "pct_csat_survey_satisfaction" | "pct_resolved_on_first_reply" | "pct_tagged_conversations" | "num_closed_segments" | "num_open_segments_start" | "num_open_segments_end" | "num_resolved_segments" | "num_unresolved_active_segments" | "num_workload_segments";

export type AnalyticsReportRequest = {
  /** Start time of the data to include in the export (seconds since 1970-01-01T00:00:00+00). Will be rounded down to the start of the day. */
  start: number;
  /** End time of the data to include in the export (seconds since 1970-01-01T00:00:00+00). Will be rounded up to the end of the day. */
  end: number;
  /** [IANA name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) of the timezone to format the dates with. If omitted, the export will use Etc/UTC. */
  timezone?: string;
  filters?: AnalyticsFilters;
  /** List of the metrics required. */
  metrics: (AnalyticsMetricId)[];
};

export type AnalyticsReportResponse = {
  _links: { self?: string };
  /** The UID of the analytics report */
  uid: string;
  /** Status of the report. */
  status: "running" | "done" | "failed";
  /** Number ranging from 0 to 100 corresponding to the percentage of the analytics processed. */
  progress: number;
  /** The metrics computed for the report. */
  metrics: (AnalyticsScalar)[];
};

export type AnalyticsScalar = {
  id: AnalyticsMetricId;
  type: AnalyticsScalarType;
  value: AnalyticsScalarValue;
};

export type AnalyticsScalarType = "number" | "percentage" | "string" | "duration" | "resource";

/** The value of a scalar metric. */
export type AnalyticsScalarValue = number | string | { label?: string; resource?: { id: string; _links: { self?: string } } } | null;

export type AppEvent = {
  /** The type of event this application should handle */
  event_type: string;
  /** Identifier for the app object to which the event is related. Either an ID or an external link is required. If both are provided, the ID will be favored.  */
  app_object: { id?: string; ext_link?: string };
};

export type Attachment = {
  /** The unique identifier of the attachment. */
  id: string;
  /** Name of the attached file */
  filename: string;
  /** URL to download the attached file */
  url: string;
  /** Content type of the attached file in [MIME format](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types). Note that some attachments types may not be supported. */
  content_type: string;
  /** Size (in byte) of the attached file */
  size: number;
  /** Attachment metadata */
  metadata: { is_inline?: boolean; cid?: string };
};

export type ChannelIds = {
  channel_ids: (ResourceId)[];
};

export type ChannelResponse = {
  _links: { self?: string; related?: { inbox?: string | null; owner?: string } };
  /** Unique identifier for the channel */
  id: string;
  /** The name of the channel */
  name?: string;
  /** Address receiving the messages */
  address?: string;
  /** Type of the channel */
  type: "custom" | "facebook" | "gmail" | "google_play" | "imap" | "intercom" | "form" | "office365" | "layer_anon" | "smtp" | "talkdesk" | "truly" | "twilio" | "twilio_whatsapp" | "twitter" | "twitter_dm" | "yalo_wha" | "front_chat" | "front_mail";
  /** Address which appears as the sender for messages sent from Front */
  send_as?: string;
  /** Channel settings */
  settings: { undo_send_time?: 0 | 5 | 10 | 15 | 30 | 60; all_teammates_can_reply?: boolean };
  /** Whether or not the channel is individual */
  is_private: boolean;
  /** Whether or not the channel configuration is valid */
  is_valid: boolean;
};

export type CommentResponse = {
  _links: { self?: string; related?: { conversation?: string; mentions?: string; comment_replied_to?: string | null } };
  /** Unique identifier of the comment */
  id: string;
  /** Teammate who wrote the comment */
  author: TeammateResponse;
  /** Content of the comment */
  body: string;
  /** The timestamp when the comment was posted */
  posted_at?: number;
  /** List of files attached to the comment */
  attachments: (Attachment)[];
  /** Whether or not the comment is pinned in its conversation */
  is_pinned: boolean;
};

export type Contact = {
  /** Contact name */
  name?: string;
  /** Contact description */
  description?: string;
  /** Binary data of avatar. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB. */
  avatar?: string;
  /** List of all the links of the contact */
  links?: (string)[];
  /** List of all the group names the contact belongs to. It will automatically create missing groups. ⚠️ Deprecated. Use `list_names` instead. */
  group_names?: (string)[];
  /** List of all the contact list names the contact belongs to. It will automatically create missing groups */
  list_names?: (string)[];
  /** Custom fields for this contact. If you want to keep all custom fields the same when updating this resource, do not include any custom fields in the update. If you want to update custom fields, make sure to include all custom fields, not just the fields you want to add or update. If you send only the custom fields you want to update, the other custom fields will be erased. You can retrieve the existing custom fields before making the update to note the current fields. */
  custom_fields?: CustomFieldParameter;
};

export type ContactHandle = {
  /** Handle used to reach the contact. */
  handle: string;
  /** Source of the handle. Can be `email`, `phone`, `twitter`, `facebook`, `intercom`, `front_chat`, or `custom`. */
  source: "twitter" | "email" | "phone" | "facebook" | "intercom" | "front_chat" | "custom";
};

export type ContactIds = {
  /** The contact IDs to include. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  contact_ids: (ResourceId)[];
};

export type ContactListResponses = {
  _links?: { self?: string; related?: { contacts?: string; owner?: string } };
  /** Unique identifier of the list */
  id?: string;
  /** Name of the list */
  name?: string;
  /** Whether or not the contact is individual */
  is_private?: boolean;
};

export type ContactNoteResponses = {
  _links: { related?: { author?: string; owner?: string | null } };
  /** Teammate who wrote the note */
  author: TeammateResponse;
  /** Content of the note */
  body: string;
  /** The timestamp when the note was created */
  created_at?: number;
};

export type ContactResponse = {
  _links?: { self?: string; related?: { notes?: string; conversations?: string; owner?: string } };
  /** Unique identifier of the contact */
  id?: string;
  /** Contact name */
  name?: string;
  /** Contact description */
  description?: string;
  /** URL of the contact's avatar */
  avatar_url?: string;
  /** List of all the links of the contact */
  links?: (string)[];
  /** List of the groups the contact belongs to. ⚠️ Deprecated. use `lists` instead. */
  groups?: (ContactListResponses)[];
  /** List of the contact lists the contact belongs to. */
  lists?: (ContactListResponses)[];
  /** List of the handles and sources with which the contact is reachable. */
  handles?: (ContactHandle)[];
  /** Custom fields for this contact. */
  custom_fields?: CustomFieldParameter;
  /** Whether or not the contact is individual */
  is_private?: boolean;
};

export type ConversationResponse = {
  _links: { self?: string; related?: { events?: string; followers?: string; messages?: string; comments?: string; inboxes?: string; last_message?: string } };
  /** Unique identifier of the conversation */
  id: string;
  /** Subject of the message for email message */
  subject: string;
  /** Status of the conversation */
  status: "archived" | "unassigned" | "deleted" | "assigned";
  /** Unique identifier of the conversation status category, only present if ticketing is enabled */
  status_id?: string;
  /** Status category of the conversation */
  status_category?: "open" | "waiting" | "resolved";
  /** List of ticket ids associated with the conversation */
  ticket_ids: (string)[];
  /** Partial representation of the teammate assigned to the conversation */
  assignee: TeammateResponse;
  /** Main recipient of the conversation */
  recipient: RecipientResponse;
  /** List of the tags for this conversation */
  tags: (TagResponse)[];
  /** List of the links for this conversation */
  links: (LinkResponse)[];
  /** Custom fields for this conversation */
  custom_fields: CustomFieldParameter;
  /** Timestamp at which the conversation was created. */
  created_at?: number;
  /** Timestamp at which the conversation was last updated. */
  updated_at?: number;
  /** Timestamp of the oldest unreplied message. */
  waiting_since?: number;
  /** Whether or not the conversation is private */
  is_private: boolean;
  /** List of scheduled (non-expired and non-canceled) reminders for this conversation */
  scheduled_reminders: (Reminder)[];
  /** Optional metadata about the conversation */
  metadata: { external_conversation_ids?: (string)[] };
};

export type CreateChannel = {
  /** Name of the channel */
  name?: string;
  /** Settings of the channel */
  settings?: { undo_send_time?: 0 | 5 | 10 | 15 | 30 | 60; all_teammates_can_reply?: boolean; webhook_url?: string; sid?: string; auth_token?: string };
  /** Type of the channel */
  type: "custom" | "smtp" | "twilio";
  /** Sending address of your channel. Required for SMTP and Twilio channels. */
  send_as?: string;
};

export type CreateComment = {
  /** ID of the teammate creating the comment. Alternatively, you can supply the author as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). If omitted, will post as the API Token or OAuth client of the requester. */
  author_id?: string;
  /** Content of the comment. Can include markdown formatting. */
  body: string;
  /** Whether or not the comment is pinned in its conversation. */
  is_pinned?: boolean;
  /** Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB. */
  attachments?: (string)[];
};

export type CreateContact = Contact & { handles?: (ContactHandle)[] };

export type CreateContactList = {
  /** Name of the contact list */
  name: string;
};

export type CreateContactNote = {
  /** ID of teammate creating the note */
  author_id: string;
  /** Content of the note */
  body: string;
};

export type CreateConversation = {
  /** Conversation type */
  type: "discussion";
  /** Inbox ID for the conversation. Either `inbox_id` OR `teammate_ids` must be provided (not both). */
  inbox_id?: string;
  /** Teammates to add to the conversation. Either `inbox_id` OR `teammate_ids` must be provided (not both). */
  teammate_ids?: (string)[];
  /** Subject of the conversation */
  subject: string;
  /** Details for the starter comment */
  comment: { author_id?: string; body: string; attachments?: (string)[] };
  /** Custom fields for this conversation */
  custom_fields?: CustomFieldParameter;
};

export type CreateDraft = {
  /** ID of the teammate on behalf of whom the draft will be created. Alternatively, you can supply the author ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). If omitted, will post as the API Token or Application making the request. */
  author_id?: string;
  /** List of recipient handles who will receive the message once the draft is sent */
  to?: (string)[];
  /** List of recipient handles who will receive a copy of the message once the draft is sent */
  cc?: (string)[];
  /** List of the recipient handles who will receive a blind copy of the message once the draft is sent */
  bcc?: (string)[];
  /** Subject of the draft. */
  subject?: string;
  /** Body of the draft */
  body: string;
  /** Body for the quote that the message is referencing. Only available on email channels. */
  quote_body?: string;
  /** Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1). Max 25 MB. */
  attachments?: (string)[];
  /** Mode of the draft to create. Can be 'private' (draft is visible to the author only) or 'shared' (draft is visible to all teammates with access to the conversation). */
  mode?: "private" | "shared";
  /** ID of the signature to attach to this draft. If null, no signature is attached. */
  signature_id?: string;
  /** Whether or not Front should try to resolve a signature for the message. Is ignored if signature_id is included. Default false; */
  should_add_default_signature?: boolean;
};

export type CreateInbox = {
  /** The name of the inbox */
  name: string;
  /** An array of teammate IDs that should have access to the inbox. Alternatively, you can supply teammate emails as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  teammate_ids?: (ResourceId)[];
  /** Whether the inbox is public or not */
  is_public?: boolean;
  /** Custom fields for this inbox */
  custom_fields?: CustomFieldParameter;
};

/** A link is used to connect a Front conversation to an external resource. */
export type CreateLink = {
  /** Name of the link. If none is specified, the external_url is used as a default */
  name?: string;
  /** Underlying identifying url of the link */
  external_url?: string;
  /** The string that application object configurations will match on to update a specific application object. For example, if you've configured an application object to match on ORDER-{Digits}, and you want to specifically update the application objects for ORDER-777 to retrieve the latest information from external systems, send "ORDER-777". Repeat for other specific identifiers, such as "ORDER-435". */
  pattern?: string;
};

/** A message template that is used for pre-written responses */
export type CreateMessageTemplateAsChild = {
  /** Name of the message template */
  name: string;
  /** Subject of the message template. */
  subject?: string;
  /** Body of the message template. You can supply HTML with inline CSS to structure and style your template. */
  body: string;
  /** The specific inboxes this template is available in. If unspecified or null, then it will be available in all inboxes. Array should be non-empty. */
  inbox_ids?: (string)[];
};

/** A message template folder that is used to store message templates or other folders. */
export type CreateMessageTemplateFolder = {
  /** Name of the message template folder */
  name: string;
  /** ID of the parent folder to be placed into. Goes into the root folder if unspecified or if null. */
  parent_folder_id?: string;
};

/** A message template folder that is used to store message templates or other folders. */
export type CreateMessageTemplateFolderAsChild = {
  /** Name of the message template folder */
  name: string;
};

export type CreatePrivateInbox = {
  /** The name of the inbox */
  name: string;
  /** Custom fields for this inbox */
  custom_fields?: CustomFieldParameter;
};

/** A message template that is used for pre-written responses */
export type CreatePrivateMessageTemplate = {
  /** Name of the message template */
  name: string;
  /** Subject of the message template. */
  subject?: string;
  /** Body of the message template. You can supply HTML with inline CSS to structure and style your template. */
  body: string;
  /** ID of the message template folder to place this message template in */
  folder_id?: string;
};

/** A signature that can be used to sign messages. */
export type CreatePrivateSignature = {
  /** Name of the signature */
  name: string;
  /** Sender info of the signature that will appear in the From line of emails sent. */
  sender_info?: string;
  /** Body of the signature */
  body: string;
  /** If true, the signature will be set as the default signature for the teammate. */
  is_default?: boolean;
  /** The specific channels this signature is available in. If omitted or null, the signature will be available in all channels the teammate has access to. Alternatively, you can specify channels using a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  channel_ids?: (string)[];
};

/** A message template that is used for pre-written responses */
export type CreateSharedMessageTemplate = {
  /** Name of the message template */
  name: string;
  /** Subject of the message template. */
  subject?: string;
  /** Body of the message template. You can supply HTML with inline CSS to structure and style your template. */
  body: string;
  /** ID of the message template folder to place this message template in */
  folder_id?: string;
  /** The specific inboxes this template is available in. If unspecified or null, then it will be available in all inboxes. Array should be non-empty. */
  inbox_ids?: (string)[];
  /** Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB. */
  attachments?: (string)[];
};

/** A signature that can be used to sign messages. */
export type CreateSharedSignature = {
  /** Name of the signature */
  name: string;
  /** Sender info of the signature that will appear in the From line of emails sent. */
  sender_info?: string;
  /** Body of the signature */
  body: string;
  /** Whether or not the signature is visible in all individual channels for teammates in the given team. */
  is_visible_for_all_teammate_channels?: boolean;
  /** If true, the signature will be set as the default signature for the team. */
  is_default?: boolean;
  /** The specific channels this signature is available in. If omitted or null, the signature will be available in all channels the team has access to. Alternatively, you can specify channels using a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  channel_ids?: (string)[];
};

export type CreateShift = {
  /** Name of the shift */
  name: string;
  /** Color of the shift */
  color: "black" | "grey" | "pink" | "purple" | "blue" | "teal" | "green" | "yellow" | "orange" | "red";
  /** A timezone name as defined in the IANA tz database */
  timezone: string;
  /** The shift intervals per day of the week */
  times: ShiftIntervals;
  /** List of all the teammate ids who will be part of this shift. Alternatively, you can supply emails as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  teammate_ids: (ResourceId)[];
};

/** A tag is a label that can be used to classify conversations. */
export type CreateTag = {
  /** Name of the tag */
  name: string;
  /** Description of the tag */
  description?: string;
  /** Highlight color of the tag. */
  highlight?: "grey" | "pink" | "red" | "orange" | "yellow" | "green" | "light-blue" | "blue" | "purple";
  /** Whether the tag is visible in conversation lists. */
  is_visible_in_conversation_lists?: boolean;
};

export type CreateTeamInbox = {
  /** The name of the inbox */
  name: string;
  /** An array of teammate IDs that should have access to the inbox. Alternatively, you can supply teammate emails as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  teammate_ids?: (ResourceId)[];
  /** Whether the inbox is public or not */
  is_public?: boolean;
  /** Custom fields for this inbox */
  custom_fields?: CustomFieldParameter;
};

export type CreateTeammateGroup = {
  /** Name of the teammate group */
  name: string;
  /** Description of the teammate group */
  description?: string;
  /** Permissions for the teammate group */
  permissions?: { contacts?: { access: string; contact_group_ids?: (string)[]; contact_list_ids?: (string)[] } };
};

export type CreateTimeOff = {
  /** Name of the time off */
  name: string;
  /** Timestamp when the time off starts (in seconds) */
  start_at: number;
  /** Timestamp when the time off ends (in seconds), or null if open-ended */
  end_at?: number | null;
  auto_responder?: { body?: string; is_enabled?: boolean; is_contacts_only?: boolean; channel_ids?: (ResourceId)[] };
};

export type CreateView = {
  /** Name of the view */
  name: string;
  /** List of inbox IDs to filter by */
  inbox_ids: (ResourceId)[];
  /** List of tag IDs to filter by */
  tag_ids?: (ResourceId)[];
  /** List of tag IDs to exclude */
  not_tag_ids?: (ResourceId)[];
  /** Whether to filter for conversations without tags */
  no_tags?: boolean;
  /** List of assignee IDs to filter by */
  assignee_ids?: (ResourceId)[];
  /** List of assignee IDs to exclude */
  not_assignee_ids?: (ResourceId)[];
  /** Color highlight for the view */
  highlight?: string;
};

/** An object whose key is the `name` property defined for the custom field in the Front UI. The value of the key must use the same `type` specified for the custom field, as described in https://dev.frontapp.com/reference/custom-fields */
export type CustomFieldParameter = { [key: string]: unknown };

export type CustomFieldResponse = {
  _links: { self?: string };
  /** Unique identifier of the custom field */
  id: string;
  /** Name of the custom field */
  name: string;
  /** Description of the custom field */
  description: string;
  /** Type of the custom field */
  type: "string" | "boolean" | "datetime" | "number" | "teammate" | "inbox" | "enum";
  /** List of possible values for a custom field of type `enum`. */
  values?: ({ value?: string; label?: string })[];
};

export type CustomMessage = {
  /** Data of the sender */
  sender: { contact_id?: string; name?: string; handle: string };
  /** Subject of the message */
  subject?: string;
  /** Body of the message */
  body: string;
  /** Format of the message body. Can be `markdown` (default) or `html`. */
  body_format?: "html" | "markdown";
  metadata?: { thread_ref?: string; headers?: { [key: string]: unknown } };
  /** Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB. */
  attachments?: (string)[];
};

export type DeleteContactHandle = ContactHandle & { force?: boolean };

export type DeleteDraft = {
  /** Version of the draft */
  version: string;
};

export type EditDraft = ReplyDraft & { version?: string; mode?: "shared" };

/** An event is created every time something interesting is happening in Front. */
export type EventResponse = {
  _links?: { self?: string };
  /** Unique identifier of the event */
  id?: string;
  /** Type of event */
  type?: "assign" | "unassign" | "archive" | "reopen" | "trash" | "restore" | "reminder" | "comment" | "mention" | "inbound" | "outbound" | "out_reply" | "move" | "forward" | "tag" | "untag" | "sending_error" | "message_bounce_error" | "conversations_merged" | "link_added" | "link_removed" | "custom_field_updated" | "macro_triggered" | "topic_identified" | "ticket_status_update" | "call_started" | "call_abandoned" | "call_queued" | "call_on_hold" | "call_resumed" | "call_connected" | "call_missed" | "call_hangup" | "call_transferred";
  /** The timestamp when the event has been emitted */
  emitted_at?: number;
  /** Event source */
  source?: { _meta?: { type?: "api" | "oauth_client" | "rule" | "teammate" | "imap" | "gmail" | "reminder" | "inboxes" | "recipient" }; data?: RuleResponse | TeammateResponse | (InboxResponse)[] };
  /** Partial representation (type & id) of the event's target */
  target?: { _meta?: { type?: "teammate" | "inboxes" | "message" | "comment" | "tag" | "deleted_conversation_ids" | "link" | "custom_field" }; data?: TeammateResponse | InboxResponse | TagResponse | CommentResponse | MessageResponse | LinkResponse };
  /** The conversation on which the event happened */
  conversation?: ConversationResponse;
};

export type IdentityResponse = {
  _links: { self?: string };
  /** Unique ID of company */
  id: string;
  /** Name of company */
  name: string;
};

export type ImportMessage = {
  /** Data of the sender */
  sender: { author_id?: string; name?: string; handle: string };
  /** List of the recipient handles who will receive this message */
  to: (string)[];
  /** List of the recipient handles who will receive a copy of this message */
  cc?: (string)[];
  /** List of the recipient handles who will receive a blind copy of this message */
  bcc?: (string)[];
  /** Subject of the message */
  subject?: string;
  /** Body of the message */
  body: string;
  /** Format of the message body. Can be `markdown` (default) or `html`, and can only be specified for `email` type. */
  body_format?: "html" | "markdown";
  /** External identifier of the message. Front won't import two messages with the same external ID. */
  external_id: string;
  /** Date at which the message as been sent or received. */
  created_at: number;
  /** Type of the message to import. Default is `email`. */
  type?: "email" | "sms" | "intercom" | "custom";
  /** ID of the teammate who will be assigned to the conversation. */
  assignee_id?: string;
  /** List of tag names to add to the conversation */
  tags?: (string)[];
  /** If supplied, Front will thread this message into conversation with the given ID. Note that including this parameter nullifies the `thread_ref` parameter _completely_. */
  conversation_id?: string;
  metadata: { thread_ref?: string; is_inbound: boolean; is_archived?: boolean; should_skip_rules?: boolean };
  /** Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB. */
  attachments?: (string)[];
};

export type InboxIds = {
  inbox_ids: (ResourceId)[];
};

export type InboxResponse = {
  _links?: { self?: string; related?: { teammates?: string; conversations?: string; channels?: string; owner?: string } };
  /** Unique identifier for the inbox */
  id?: string;
  /** Name of the inbox */
  name?: string;
  /** Whether or not the inbox is individual */
  is_private?: boolean;
  /** Whether or not the inbox is available to all members of a team by default */
  is_public?: boolean;
  /** Custom fields for this inbox */
  custom_fields?: CustomFieldParameter;
};

export type KnowledgeBaseArticleCreate = {
  /** ID of the category this article belongs to */
  category_id?: string;
  /** Teammate ID of the article author */
  author_id?: string;
  /** Subject of the article */
  subject?: string;
  /** HTML content of the article */
  content?: string;
  /** Article status */
  status?: "draft" | "published";
};

export type KnowledgeBaseArticlePatch = {
  /** Teammate ID of the article author */
  author_id?: string;
  /** Subject of the article */
  subject?: string;
  /** HTML content of the article */
  content?: string;
  /** Article status */
  status?: "draft" | "published";
};

export type KnowledgeBaseArticleResponse = {
  _links: { self?: string; related?: { knowledge_base?: string; category?: string; last_editor?: string } };
  /** Unique identifier of the knowledge base article */
  id: string;
  /** URL slug of the article. Construct the full URL using the template of protocol/knowledge base domain/locale/slug, such as https://yourDomain.com/en/articles/5 */
  slug: string;
  /** Name of the article */
  name: string;
  /** Status of the article */
  status: string;
  /** Article keywords */
  keywords: (string)[];
  /** Article HTML content */
  content: string;
  /** Locale of the article */
  locale: string;
  /** List of files attached to the article */
  attachments: (Attachment)[];
  /** Timestamp when the article was last edited */
  last_edited_at?: number;
  /** Timestamp when the article was created */
  created_at?: number;
  /** Timestamp when the article was updated */
  updated_at?: number;
};

export type KnowledgeBaseArticleSlimResponse = {
  _links: { self?: string; related?: { knowledge_base?: string; category?: string | null; content?: string } };
  /** Unique identifier of the knowledge base article */
  id: string;
  /** URL slug of the article. Construct the full URL using the template of protocol/knowledge base domain/locale/slug, such as https://yourDomain.com/en/articles/5 */
  slug: string;
  /** List of the locales the article supports */
  locales: (string)[];
  /** Timestamp when the article was created */
  created_at?: number;
  /** Timestamp when the article was updated */
  updated_at?: number;
};

export type KnowledgeBaseCategoryCreate = {
  /** ID of the parent category */
  parent_category_id?: string;
  /** Name of the knowledge base category */
  name: string;
  /** Description of the knowledge base category */
  description?: string;
};

export type KnowledgeBaseCategoryPatch = {
  /** Name of the knowledge base category */
  name?: string;
  /** Description of the knowledge base category */
  description?: string;
};

export type KnowledgeBaseCategoryResponse = {
  _links: { self?: string; related?: { knowledge_base?: string; parent_category?: string | null; articles?: string } };
  /** Unique identifier of the knowledge base category */
  id: string;
  /** Category name */
  name: string | null;
  /** Description of the category */
  description: string | null;
  /** Is the category hidden */
  is_hidden: boolean;
  /** Locale of this category */
  locale: "fr" | "en";
  /** Timestamp when the category was created */
  created_at?: number;
  /** Timestamp when the category was updated */
  updated_at?: number;
};

export type KnowledgeBaseCategorySlimResponse = {
  _links: { self?: string; related?: { knowledge_base?: string; parent_category?: string | null; articles?: string } };
  /** Unique identifier of the knowledge base category */
  id: string;
  /** URL slug of the category. Construct the full URL using the template of protocol/knowledge base domain/locale/slug, such as https://yourDomain.com/en/categories/2 */
  slug: string;
  /** Is the category hidden from navigation and breadcrumbs (topics are accessed as direct links) */
  is_hidden: boolean;
  /** List of the locales the category supports */
  locales: (string)[];
  /** Timestamp when the category was created */
  created_at?: number;
  /** Timestamp when the category was updated */
  updated_at?: number;
};

export type KnowledgeBaseCreate = {
  /** Name of the knowledge base */
  name: string;
  /** Determines if the knowledge base is publicly available or private only to your company */
  type?: "internal" | "external";
};

export type KnowledgeBasePatch = {
  /** Name of the knowledge base */
  name?: string;
};

export type KnowledgeBaseResponse = {
  _links: { self?: string; related?: { articles?: string; categories?: string } };
  /** Unique identifier of the knowledge base */
  id: string;
  /** Knowledge base name */
  name: string;
  /** Status of the KB */
  status: "published" | "unpublished";
  /** Type of the KB */
  type: "internal" | "external";
  /** Locale of this requested KB */
  locale: "fr" | "en";
  /** Timestamp when the knowledge base was created */
  created_at?: number;
  /** Timestamp when the knowledge base was updated */
  updated_at?: number;
};

export type KnowledgeBaseSlimResponse = {
  _links: { self?: string; related?: { articles?: string; categories?: string } };
  /** Unique identifier of the knowledge base */
  id: string;
  /** Type of the KB */
  type: "internal" | "external";
  /** List of the KB's possible locales */
  locales: (string)[];
  /** Timestamp when the knowledge base was created */
  created_at?: number;
  /** Timestamp when the knowledge base was updated */
  updated_at?: number;
};

/** A link used to connect a Front conversation to an external resource. */
export type LinkResponse = {
  _links: { self?: string };
  /** Unique identifier of the link */
  id: string;
  /** Display name of the link */
  name: string;
  /** Type of the link. Typically associated with the underlying link provider (if known) */
  type: string;
  /** Underlying identifying external URL of the link */
  external_url: string;
  /** Custom fields for this link */
  custom_fields: CustomFieldParameter;
};

export type MergeContacts = {
  /** Optional contact ID to merge the other contacts into. */
  target_contact_id?: string;
  /** Array of all the contact IDs of the contacts to be merged.  If a target contact id is provided and that contact id is not in this array, the length of this array must be between 1 and 49.  If no target contact id is provided or it is contained in this array, the length must be between 2 and 50. */
  contact_ids: (string)[];
};

export type MessageResponse = {
  _links?: { self?: string; related?: { conversation?: string; message_replied_to?: string; message_seen?: string } };
  /** Unique identifier of the message */
  id?: string;
  /** Secondary unique identifier of a message. Generated by Front on message creation. Learn more at about the [message UID](https://dev.frontapp.com/reference/messages#creating-a-new-message). */
  message_uid?: string;
  /** Type of the message */
  type?: "call" | "custom" | "email" | "facebook" | "front_chat" | "googleplay" | "intercom" | "internal" | "phone-call" | "sms" | "tweet" | "tweet_dm" | "whatsapp" | "yalo_wha";
  /** Whether or not the message has been received or sent */
  is_inbound?: boolean;
  /** If the message is a draft, describes the draft mode. Can be 'private' (draft is visible to the author only) or 'shared' (draft is visible to all teammates with access to the conversation). */
  draft_mode?: "shared" | "private" | null;
  /** Type of the error when the draft failed to be sent */
  error_type?: string;
  /** The current version of the message in Front */
  version?: string;
  /** The timestamp when the message was sent or received */
  created_at?: number;
  /** Subject of the message */
  subject?: string;
  /** Preview of the message body */
  blurb?: string;
  /** Front teammate who sent this message */
  author?: TeammateResponse;
  recipients?: (RecipientResponse)[];
  /** Body of the message */
  body?: string;
  /** Text version of the body for email messages */
  text?: string;
  /** List of files attached to the message */
  attachments?: (Attachment)[];
  /** The signature attached to this message */
  signature?: SignatureResponse;
  /** Optional metadata about the message */
  metadata?: { intercom_url?: string; duration?: number; have_been_answered?: boolean; external_id?: string; twitter_url?: string; is_retweet?: boolean; have_been_retweeted?: boolean; have_been_favorited?: boolean; thread_ref?: string; headers?: { [key: string]: unknown }; chat_visitor_url?: string };
};

export type MessageTemplateFolderResponse = {
  _links: { self?: string; related?: { owner?: string | null; parent_folder?: string | null; child_folders?: string | null; child_answers?: string | null } };
  /** Unique identifier of the message template folder */
  id: string;
  /** Name of the message template folder */
  name: string;
  /** Timestamp at which the message template folder was created. */
  created_at?: number;
  /** Timestamp at which the message template folder was updated. */
  updated_at?: number;
};

export type MessageTemplateResponse = {
  _links: { self?: string; related?: { owner?: string | null; parent_folder?: string | null } };
  /** Unique identifier of the message template */
  id: string;
  /** Name of the message template */
  name: string;
  /** Subject of the message template */
  subject: string | null;
  /** Body of the message template */
  body: string;
  /** List of files attached to the response */
  attachments: (Attachment)[];
  /** Whether or not the template is available in all inboxes. */
  is_available_for_all_inboxes: boolean;
  /** List of inboxes the template is available in. Null if there are no restrictions. */
  inbox_ids: (string)[] | null;
};

export type OutboundMessage = {
  /** List of the recipient handles who will receive this message. One of `to`, `cc`, or `bcc` is required. */
  to: (string)[];
  /** List of the recipient handles who will receive a copy of this message. One of `to`, `cc`, or `bcc` is required. */
  cc?: (string)[];
  /** List of the recipient handles who will receive a blind copy of this message. One of `to`, `cc`, or `bcc` is required. */
  bcc?: (string)[];
  /** Name used for the sender info of the message */
  sender_name?: string;
  /** Subject of the message for email message */
  subject?: string;
  /** ID of the teammate on behalf of whom the answer is sent */
  author_id?: string;
  /** Body of the message */
  body: string;
  /** Text version of the body for email messages */
  text?: string;
  options?: { tag_ids?: (string)[]; archive?: boolean };
  /** Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1). Max 25 MB. */
  attachments?: (string)[];
  /** ID of the signature to attach to this draft. Only supported for email channels; using this on other channel types returns a 403 forbidden error. If null, no signature is attached. */
  signature_id?: string;
  /** Whether or not Front should try to resolve a signature for the message. Only applies to email channels and is ignored if signature_id is included or if author_id is omitted. Default false. */
  should_add_default_signature?: boolean;
};

export type OutboundReplyMessage = {
  /** List of the recipient handles who will receive this message */
  to?: (string)[];
  /** List of the recipient handles who will receive a copy of this message */
  cc?: (string)[];
  /** List of the recipient handles who will receive a copy of this message */
  bcc?: (string)[];
  /** Name used for the sender info of the message */
  sender_name?: string;
  /** Subject of the message for email message */
  subject?: string;
  /** ID of the teammate on behalf of whom the answer is sent */
  author_id?: string;
  /** Channel ID the message is sent from */
  channel_id?: string;
  /** Body of the message */
  body: string;
  /** Text version of the body for email messages */
  text?: string;
  /** Body for the quote that the message is referencing. Only available on email channels. */
  quote_body?: string;
  options?: { tag_ids?: (string)[]; archive?: boolean };
  /** Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB. */
  attachments?: (string)[];
  /** ID of the signature to attach to this draft. Only supported for email channels; using this on other channel types returns a 403 forbidden error. If null, no signature is attached. */
  signature_id?: string;
  /** Whether or not Front should try to resolve a signature for the message. Only applies to email channels and is ignored if signature_id is included or if author_id is omitted. Default false; */
  should_add_default_signature?: boolean;
};

export type RecipientResponse = {
  _links: { related?: { contact?: string | null } };
  /** Name of the recipient. */
  name: string | null;
  /** Handle of the contact. Can be any string used to uniquely identify the contact */
  handle: string;
  /** Role of the recipient */
  role: "from" | "to" | "cc" | "bcc" | "reply-to";
};

export type Reminder = {
  _links: { related?: { owner?: string } };
  /** Timestamp at which the conversation reminder has been created */
  created_at?: number;
  /** Timestamp that the conversation reminder has been scheduled for */
  scheduled_at?: number;
  /** Timestamp at which the conversation reminder has been updated */
  updated_at?: number;
};

export type RemoveContactsFromList = {
  /** List of IDs of the contacts to remove from the requested contact list. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  contact_ids: (ResourceId)[];
};

export type ReplyDraft = CreateDraft & { channel_id?: string };

export type ResourceId = string;

export type RoleResponse = {
  _links: { related?: { owner?: string } };
  /** Unique identifier of the role */
  id: string;
  /** Name of the role */
  name: string;
};

export type RuleResponse = {
  _links: { self?: string; related?: { owner?: string | null } };
  /** Unique identifier of the rule */
  id: string;
  /** Name of the rule */
  name: string;
  /** List of the rule's actions description */
  actions: (string)[];
  /** Whether or not the rule is individual */
  is_private: boolean;
};

export type SeenReceiptResponse = {
  _links: { self?: string; related?: { message?: string } };
  /** Timestamp when message was seen */
  first_seen_at: string;
  seen_by: ContactHandle;
};

export type SharedViewResponse = {
  _links: { self?: string; related?: { owner?: string | null } };
  /** Unique identifier of the shared view */
  id: string;
  /** Name of the shared view */
  name: string;
  /** Color highlight for the view */
  highlight: string | null;
  /** List of inbox IDs included in the view */
  inbox_ids: (string)[];
  /** List of tag IDs to filter by */
  tag_ids: (string)[];
  /** List of tag IDs to exclude */
  not_tag_ids: (string)[];
  /** Whether to filter for conversations without tags */
  no_tags: boolean;
  /** List of assignee IDs to filter by */
  assignee_ids: (string)[];
  /** List of assignee IDs to exclude */
  not_assignee_ids: (string)[];
};

export type ShiftInterval = {
  /** Start of shift */
  start: string;
  /** End of shift */
  end: string;
};

export type ShiftIntervals = {
  mon?: ShiftInterval;
  tue?: ShiftInterval;
  wed?: ShiftInterval;
  thu?: ShiftInterval;
  fri?: ShiftInterval;
  sat?: ShiftInterval;
  sun?: ShiftInterval;
};

export type ShiftResponse = {
  _links: { self?: string; related?: { teammates?: string; owner?: string } };
  /** Unique identifier of the shift */
  id: string;
  /** Name of the shift */
  name: string;
  /** Color of the shift */
  color: "black" | "grey" | "pink" | "purple" | "blue" | "teal" | "green" | "yellow" | "orange" | "red";
  /** A timezone name as defined in the IANA tz database */
  timezone: string;
  /** The shift intervals per day of the week */
  times: ShiftIntervals;
  /** The timestamp when the shift was created. */
  created_at?: number;
  /** The timestamp when the shift was updated. */
  updated_at?: number;
};

export type SignatureResponse = {
  _links: { self?: string; related?: { owner?: string } };
  /** Unique identifier of the signature */
  id: string;
  /** Name of the signature */
  name: string | null;
  /** Body of the signature */
  body: string;
  /** Sender info of the signature */
  sender_info: string | null;
  /** Whether or not the signature is available in teammate channels. */
  is_visible_for_all_teammate_channels: boolean;
  /** Whether the signature is the default signature for the team or teammate. */
  is_default: boolean;
  /** Whether the signature is private to the teammate. */
  is_private: boolean;
  channel_ids: (string)[] | null;
};

/** A ticket status of a conversation. */
export type StatusResponse = {
  _links: { self?: string };
  /** Unique identifier of the ticket status */
  id: string;
  /** The name of the ticket status. Default statuses match the category name. Custom statuses have a unique name. */
  name: string;
  /** Category of the ticket status. */
  category: "open" | "waiting" | "resolved" | null;
  /** Description of the ticket status */
  description: string | null;
  /** Timestamp of ticket status creation */
  created_at?: number;
  /** Timestamp of the last ticket status update */
  updated_at?: number;
};

export type TagIds = {
  tag_ids: (ResourceId)[];
};

/** A tag is a label that can be used to classify conversations. */
export type TagResponse = {
  _links: { self?: string; related?: { conversations?: string; owner?: string | null; parent_tag?: string | null; children?: string | null } };
  /** Unique identifier of the tag */
  id: string;
  /** Name of the tag */
  name: string;
  /** Description of the tag */
  description: string | null;
  /** Highlight color or emoji of the tag. Null if the tag does not have a highlight. */
  highlight: string | null;
  /** Whether or not the tag is individual */
  is_private: boolean;
  /** Whether the tag is visible in conversation lists. */
  is_visible_in_conversation_lists: boolean;
  /** Timestamp of tag create creation */
  created_at?: number;
  /** Timestamp of the last tag update */
  updated_at?: number;
};

export type TeamIds = {
  team_ids: (ResourceId)[];
};

export type TeamPreviewResponse = {
  _links: { self?: string };
  /** Unique identifier of the team */
  id: string;
  /** Name of the team */
  name: string;
};

export type TeamResponse = {
  _links: { self?: string };
  /** Unique identifier of the team */
  id: string;
  /** Name of the team */
  name: string;
  /** List of the inboxes in the team */
  inboxes: (InboxResponse)[];
  /** List of the teammates that have access to the team */
  members: (TeammateResponse)[];
};

/** A teammate group is a group of teammates in Front. */
export type TeammateGroupResponse = {
  _links: { self?: string; related?: { teammates?: string; teams?: string; inboxes?: string } };
  /** Unique identifier of the teammate group */
  id: string;
  /** The name of the teammate group */
  name: string;
  /** Description of the teammate group */
  description: string | null;
  /** Is teammate group managed by SCIM or by Front */
  is_managed_by_scim: boolean;
  /** Permissions for the teammate group */
  permissions: { contacts?: { access?: string; contact_list_ids?: (string)[] } };
};

export type TeammateIds = {
  teammate_ids: (ResourceId)[];
};

/** A teammate is a user in Front. */
export type TeammateResponse = {
  _links: { self?: string; related?: { inboxes?: string; conversations?: string; botSource?: string } };
  /** Unique identifier of the teammate */
  id: string;
  /** Email address of the teammate */
  email: string;
  /** Username of the teammate (used for "@" mentions) */
  username: string;
  /** First name of the teammate */
  first_name: string;
  /** Last name of the teammate */
  last_name: string;
  /** Whether or not the teammate is an admin in your company */
  is_admin: boolean;
  /** Whether or not the teammate is available */
  is_available: boolean;
  /** Whether or not the teammate account has been blocked */
  is_blocked: boolean;
  /** Type of the teammate, normal teammates are denoted as "user", while visitors are denoted as "visitor". Bot users are denoted by their parent resource type. The following bot types are available:   * ai: acting on behalf of an AI   * api: acting on behalf of OAuth clients   * application: acting on behalf of an Application   * bulk_reply: acting on behalf of a Bulk Reply   * csat: used for authoring CSAT response comments   * integration: acting on behalf of an Integration   * macro: acting on behalf of a Macro, author of comments and drafts   * rule: acting on behalf of a Rule, author of comments and drafts   * smart_csat: acting on behalf of a Smart CSAT  */
  type: "user" | "visitor" | "ai" | "api" | "application" | "bulk_reply" | "csat" | "integration" | "macro" | "rule" | "smart_csat";
  /** Custom fields for this teammate */
  custom_fields: CustomFieldParameter;
};

export type TimeOffResponse = {
  _links: { self?: string; related?: { teammate?: string } };
  /** Unique identifier of the time off */
  id: string;
  /** Name of the time off */
  name: string;
  /** Timestamp when the time off starts */
  start_at: number;
  /** Timestamp when the time off ends, or null if open-ended */
  end_at?: number | null;
  /** Timestamp when the time off was created */
  created_at?: number;
  /** Timestamp when the time off was last updated */
  updated_at?: number;
  auto_responder: { is_enabled?: boolean; channel_ids?: (string)[]; is_contacts_only?: boolean; body?: string };
};

export type UpdateChannel = {
  /** Name of the channel */
  name?: string;
  /** ID of the inbox to move this channel to. Will also move corresponding conversations. */
  inbox_id?: string;
  /** Settings to replace. For custom channels, all settings may be replaced. For all other channels, only `undo_send_time` and `all_teammates_can_reply` may be replaced.  */
  settings?: { undo_send_time?: 0 | 5 | 10 | 15 | 30 | 60; all_teammates_can_reply?: boolean; webhook_url?: string };
};

export type UpdateComment = {
  /** Content of the comment. Can include markdown formatting. Can only be updated if the comment was created using the same token. */
  body?: string;
  /** Whether or not the comment is pinned in its conversation. */
  is_pinned?: boolean;
};

export type UpdateConversation = {
  /** ID of the teammate to assign the conversation to. Set it to null to unassign. */
  assignee_id?: string;
  /** ID of the inbox to move the conversation to. */
  inbox_id?: string;
  /** New status of the conversation */
  status?: "archived" | "open" | "deleted" | "spam";
  /** Unique identifier of the status to set the conversation to. Only one of status and status_id should be provided. Ticketing must be enabled for the company to use this field. */
  status_id?: string;
  /** List of all the tag IDs replacing the old conversation tags */
  tag_ids?: (ResourceId)[];
  /** Custom fields for this conversation. If you want to keep all custom fields the same when updating this resource, do not include any custom fields in the update. If you want to update custom fields, make sure to include all custom fields, not just the fields you want to add or update. If you send only the custom fields you want to update, the other custom fields will be erased. You can retrieve the existing custom fields before making the update to note the current fields. Send as an object of key:value pairs where the key is the custom field name and the value is the custom field value. */
  custom_fields?: CustomFieldParameter;
};

export type UpdateConversationAssignee = {
  /** ID of the teammate to assign the conversation to. Set it to null to unassign. */
  assignee_id: string;
};

export type UpdateConversationReminders = {
  /** ID of the teammate to create a reminder for. For a private conversation, specify the id of the teammate that owns the conversation. For a shared conversation, use the id of any teammate that has access to the conversation's shared inbox. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  teammate_id: string;
  /** Unix timestamp in seconds to schedule the reminder for. Must be in the future and within 50 years. Set to null to cancel. */
  scheduled_at: number;
  /** ID of the waiting status to which the conversation will be set. Ticketing must be enabled for the company to use this field. If no status is supplied and ticket is enabled, the default waiting status will be used. */
  status_id?: string;
};

export type UpdateLink = {
  /** Name of the link */
  name?: string;
};

export type UpdateMessageTemplate = {
  /** Name of the message template */
  name?: string;
  /** Subject of the message template */
  subject?: string;
  /** Body of the message template. You can supply HTML with inline CSS to structure and style your template. */
  body?: string;
  /** ID of the parent folder to be placed into. Goes into the root folder if unspecified or if null. */
  folder_id?: string;
  /** The specific inboxes this template is available in. If null, then it will be available in all inboxes. Array should be non-empty. If unspecified, will retain previous value. */
  inbox_ids?: (string)[];
  /** Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://dev.frontapp.com/docs/attachments-1). Max 25 MB. Specify an empty array to delete all attachments from a message template. If unspecified, it will retain previous value. */
  attachments?: (string)[];
};

/** A message template folder that is used to store message templates or other folders. */
export type UpdateMessageTemplateFolder = {
  /** Name of the message template folder */
  name?: string;
  /** ID of the parent folder to be placed into. Goes into the root folder if unspecified or if null. */
  parent_folder_id?: string;
};

export type UpdateShift = {
  /** Name of the shift */
  name?: string;
  /** Color of the shift */
  color?: "black" | "grey" | "pink" | "purple" | "blue" | "teal" | "green" | "yellow" | "orange" | "red";
  /** A timezone name as defined in the IANA tz database */
  timezone?: string;
  /** The shift intervals per day of the week */
  times?: ShiftIntervals;
  /** List of all the teammate ids who will be part of this shift. Alternatively, you can supply emails as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  teammate_ids?: (ResourceId)[];
};

/** A signature that can be used to sign messages. */
export type UpdateSignature = {
  /** Name of the signature */
  name?: string;
  /** Sender info of the signature that will appear in the From line of emails sent. */
  sender_info?: string;
  /** Body of the signature */
  body?: string;
  /** Whether or not the signature is visible in all individual channels for teammates in the given team. Can only be set for shared signatures. */
  is_visible_for_all_teammate_channels?: boolean;
  /** If true, the signature will be set as the default signature for the team or teammate. */
  is_default?: boolean;
  /** The specific shared channels this signature if available in. If null, then it will be available in all channels. If unspecified, will retain previous value. Alternatively, you can specify channels using a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
  channel_ids?: (string)[];
};

export type UpdateTag = {
  /** Name of the tag */
  name?: string;
  /** Description of the tag */
  description?: string;
  /** Highlight color of the tag. */
  highlight?: "grey" | "pink" | "red" | "orange" | "yellow" | "green" | "light-blue" | "blue" | "purple";
  /** ID of the parent of this tag. Set to `null` to remove  the parent tag. */
  parent_tag_id?: string;
  /** Whether the tag is visible in conversation lists. */
  is_visible_in_conversation_lists?: boolean;
};

export type UpdateTeammate = {
  /** New username. It must be unique and can only contains lowercase letters, numbers and underscores. */
  username?: string;
  /** New first name */
  first_name?: string;
  /** New last name */
  last_name?: string;
  /** New availability status */
  is_available?: boolean;
  /** Custom fields for this teammate. If you want to keep all custom fields the same when updating this resource, do not include any custom fields in the update. If you want to update custom fields, make sure to include all custom fields, not just the fields you want to add or update. If you send only the custom fields you want to update, the other custom fields will be erased. You can retrieve the existing custom fields before making the update to note the current fields. */
  custom_fields?: CustomFieldParameter;
};

export type UpdateTeammateGroup = {
  /** Name of the teammate group */
  name?: string;
  /** Description of the teammate group */
  description?: string;
  /** Permissions for the teammate group */
  permissions?: { contacts?: { access: string; contact_group_ids?: (string)[]; contact_list_ids?: (string)[] } };
};

export type UpdateTimeOff = {
  /** Name of the time off */
  name?: string;
  /** Timestamp when the time off starts (in seconds) */
  start_at?: number;
  /** Timestamp when the time off ends (in seconds), or null to clear it */
  end_at?: number | null;
  auto_responder?: { body?: string; is_enabled?: boolean; is_contacts_only?: boolean; channel_ids?: (ResourceId)[] };
};

export type UpdateView = {
  /** Name of the view */
  name?: string;
  /** List of inbox IDs to filter by */
  inbox_ids?: (ResourceId)[];
  /** List of tag IDs to filter by */
  tag_ids?: (ResourceId)[];
  /** List of tag IDs to exclude */
  not_tag_ids?: (ResourceId)[];
  /** Whether to filter for conversations without tags */
  no_tags?: boolean;
  /** List of assignee IDs to filter by */
  assignee_ids?: (ResourceId)[];
  /** List of assignee IDs to exclude */
  not_assignee_ids?: (ResourceId)[];
  /** Color highlight for the view */
  highlight?: string;
};
