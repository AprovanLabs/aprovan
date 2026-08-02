import type { AccountResponse, AnalyticsExportRequest, AnalyticsExportResponse, AnalyticsFilters, AnalyticsMetricId, AnalyticsReportResponse, ChannelResponse, CommentResponse, ContactHandle, ContactListResponses, ContactNoteResponses, ContactResponse, ConversationResponse, CustomFieldParameter, CustomFieldResponse, EventResponse, IdentityResponse, InboxResponse, KnowledgeBaseArticleResponse, KnowledgeBaseArticleSlimResponse, KnowledgeBaseCategoryResponse, KnowledgeBaseCategorySlimResponse, KnowledgeBaseResponse, KnowledgeBaseSlimResponse, LinkResponse, MessageResponse, MessageTemplateFolderResponse, MessageTemplateResponse, ResourceId, RuleResponse, SeenReceiptResponse, SharedViewResponse, ShiftIntervals, ShiftResponse, SignatureResponse, StatusResponse, TagResponse, TeamPreviewResponse, TeamResponse, TeammateGroupResponse, TeammateResponse, TimeOffResponse } from "./schemas.js";

export type FrontClient = {
  /**
   * List Accounts
   */
  listAccounts: (input: {
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the accounts. Either `created_at` or `updated_at`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (AccountResponse)[] }>;

  /**
   * Create account
   */
  createAccount: (input: {
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
  }) => Promise<AccountResponse>;

  /**
   * List Account's custom fields
   */
  listAccountCustomFields: () => Promise<{ _links?: { self?: string }; _results?: (CustomFieldResponse)[] }>;

  /**
   * Fetch an account
   */
  fetchAnAccount: (input: {
    /** The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    account_id: string;
  }) => Promise<AccountResponse>;

  /**
   * Update account
   */
  updateAccount: (input: {
    /** Name of the Account */
    name?: string;
    /** Account description */
    description?: string;
    /** List of domains associated with the Account */
    domains?: (string)[];
    /** Custom fields for this account. If you want to keep all custom fields the same when updating this resource, do not include any custom fields in the update. If you want to update custom fields, make sure to include all custom fields, not just the fields you want to add or update. If you send only the custom fields you want to update, the other custom fields will be erased. You can retrieve the existing custom fields before making the update to note the current fields. */
    custom_fields?: CustomFieldParameter;
    /** The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    account_id: string;
  }) => Promise<AccountResponse>;

  /**
   * Delete an account
   */
  deleteAnAccount: (input: {
    /** The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    account_id: string;
  }) => Promise<unknown>;

  /**
   * List account contacts
   */
  listAccountContacts: (input: {
    /** The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    account_id: string;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Field used to sort the contacts. Either `created_at` or `updated_at`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ContactResponse)[] }>;

  /**
   * Add contact to Account
   */
  addContactToAccount: (input: {
    /** The contact IDs to include. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_ids: (ResourceId)[];
    /** The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    account_id: string;
  }) => Promise<unknown>;

  /**
   * Remove contact from Account
   */
  removeContactFromAccount: (input: {
    /** The contact IDs to include. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_ids: (ResourceId)[];
    /** The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    account_id: string;
  }) => Promise<unknown>;

  /**
   * Create a new analytics export
   */
  createAnalyticsExport: (input: {
    body?: AnalyticsExportRequest;
  }) => Promise<AnalyticsExportResponse>;

  /**
   * Fetch an analytics export
   */
  getAnalyticsExport: (input: {
    /** The export ID. */
    export_id: string;
  }) => Promise<AnalyticsExportResponse>;

  /**
   * Create a new analytics report
   */
  createAnalyticsReport: (input: {
    /** Start time of the data to include in the export (seconds since 1970-01-01T00:00:00+00). Will be rounded down to the start of the day. */
    start: number;
    /** End time of the data to include in the export (seconds since 1970-01-01T00:00:00+00). Will be rounded up to the end of the day. */
    end: number;
    /** [IANA name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) of the timezone to format the dates with. If omitted, the export will use Etc/UTC. */
    timezone?: string;
    filters?: AnalyticsFilters;
    /** List of the metrics required. */
    metrics: (AnalyticsMetricId)[];
  }) => Promise<AnalyticsReportResponse>;

  /**
   * Fetch an analytics report
   */
  getAnalyticsReport: (input: {
    /** The report UID. */
    report_uid: string;
  }) => Promise<AnalyticsReportResponse>;

  /**
   * Trigger application event
   */
  triggerAppEvent: (input: {
    /** The type of event this application should handle */
    event_type: string;
    /** Identifier for the app object to which the event is related. Either an ID or an external link is required. If both are provided, the ID will be favored.  */
    app_object: { id?: string; ext_link?: string };
    /** The application UID */
    application_uid: string;
  }) => Promise<unknown>;

  /**
   * List channels
   */
  listChannels: () => Promise<{ _links?: { self?: string }; _results?: (ChannelResponse)[] }>;

  /**
   * Get channel
   */
  getChannel: (input: {
    /** The Channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    channel_id: string;
  }) => Promise<ChannelResponse>;

  /**
   * Update Channel
   */
  updateChannel: (input: {
    /** Name of the channel */
    name?: string;
    /** ID of the inbox to move this channel to. Will also move corresponding conversations. */
    inbox_id?: string;
    /** Settings to replace. For custom channels, all settings may be replaced. For all other channels, only `undo_send_time` and `all_teammates_can_reply` may be replaced.  */
    settings?: { undo_send_time?: 0 | 5 | 10 | 15 | 30 | 60; all_teammates_can_reply?: boolean; webhook_url?: string };
    /** The Channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    channel_id: string;
  }) => Promise<unknown>;

  /**
   * Create draft
   */
  createDraft: (input: {
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
    /** The channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    channel_id: string;
  }) => Promise<MessageResponse>;

  /**
   * Receive custom messages
   */
  receiveCustomMessages: (input: {
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
    /** The channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    channel_id: string;
  }) => Promise<{ status?: string; message_uid?: string }>;

  /**
   * Create message
   */
  createMessage: (input: {
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
    /** The sending channel ID. Alternatively, you can supply the sending channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    channel_id: string;
  }) => Promise<{ status?: string; message_uid?: string }>;

  /**
   * Validate channel
   */
  validateChannel: (input: {
    /** The Channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    channel_id: string;
  }) => Promise<{ status?: string }>;

  /**
   * Get comment
   */
  getComment: (input: {
    /** The Comment ID */
    comment_id: string;
  }) => Promise<CommentResponse>;

  /**
   * Update comment
   */
  updateComment: () => Promise<{ _links: { self?: string; related?: { conversation?: string; mentions?: string; comment_replied_to?: string | null } }; id: string; author: { _links: { self?: string; related?: { inboxes?: string; conversations?: string; botSource?: string } }; id: string; email: string; username: string; first_name: string; last_name: string; is_admin: boolean; is_available: boolean; is_blocked: boolean; type: "user" | "visitor" | "ai" | "api" | "application" | "bulk_reply" | "csat" | "integration" | "macro" | "rule" | "smart_csat"; custom_fields: { [key: string]: unknown } }; body: string; posted_at?: number; attachments: ({ id: string; filename: string; url: string; content_type: string; size: number; metadata: { is_inline?: boolean; cid?: string } })[]; is_pinned: boolean }>;

  /**
   * Download attachment for a comment
   */
  downloadAttachmentForAComment: (input: {
    /** The Comment ID */
    comment_id: string;
    /** The Attachment ID */
    attachment_link_id: string;
  }) => Promise<string>;

  /**
   * List comment mentions
   */
  listCommentMentions: (input: {
    /** The Comment ID */
    comment_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (TeammateResponse)[] }>;

  /**
   * Add comment reply
   */
  addCommentReply: (input: {
    /** ID of the teammate creating the comment. Alternatively, you can supply the author as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). If omitted, will post as the API Token or OAuth client of the requester. */
    author_id?: string;
    /** Content of the comment. Can include markdown formatting. */
    body: string;
    /** Whether or not the comment is pinned in its conversation. */
    is_pinned?: boolean;
    /** Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB. */
    attachments?: (string)[];
    /** The comment ID to reply to */
    comment_id: string;
  }) => Promise<CommentResponse>;

  /**
   * List all company rules
   */
  listAllCompanyRules: () => Promise<{ _links?: { self?: string }; _results?: (RuleResponse)[] }>;

  /**
   * List company ticket statuses
   */
  listCompanyTicketStatuses: () => Promise<{ _links?: { self?: string }; _results?: (StatusResponse)[] }>;

  /**
   * Get ticket status
   */
  getTicketStatusById: (input: {
    /** The ticket status ID */
    status_id: string;
  }) => Promise<StatusResponse>;

  /**
   * List company tags
   */
  listCompanyTags: (input: {
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the tags. Only supports `id`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _links?: { self?: string }; _results?: (TagResponse)[] }>;

  /**
   * Create company tag
   */
  createCompanyTag: (input: {
    /** Name of the tag */
    name: string;
    /** Description of the tag */
    description?: string;
    /** Highlight color of the tag. */
    highlight?: "grey" | "pink" | "red" | "orange" | "yellow" | "green" | "light-blue" | "blue" | "purple";
    /** Whether the tag is visible in conversation lists. */
    is_visible_in_conversation_lists?: boolean;
  }) => Promise<TagResponse>;

  /**
   * List groups
   */
  listGroups: () => Promise<{ _links?: { self?: string }; _results?: (ContactListResponses)[] }>;

  /**
   * Create group
   */
  createGroup: (input: {
    /** Name of the contact list */
    name: string;
  }) => Promise<unknown>;

  /**
   * Delete group
   */
  deleteGroup: (input: {
    /** The contact group ID */
    contact_group_id: string;
  }) => Promise<unknown>;

  /**
   * List contacts in group
   */
  listContactsInGroup: (input: {
    /** The contact group ID */
    contact_group_id: string;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ContactResponse)[] }>;

  /**
   * Add contacts to group
   */
  addContactsToGroup: (input: {
    /** List of IDs of the contacts to add in the requested contact list. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_ids: (ResourceId)[];
    /** The contact group ID */
    contact_group_id: string;
  }) => Promise<unknown>;

  /**
   * Remove contacts from group
   */
  removeContactsFromGroup: (input: {
    /** List of IDs of the contacts to remove from the requested contact list. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_ids: (ResourceId)[];
    /** The contact group ID */
    contact_group_id: string;
  }) => Promise<unknown>;

  /**
   * List contact lists
   */
  listContactLists: () => Promise<{ _links?: { self?: string }; _results?: (ContactListResponses)[] }>;

  /**
   * Create contact list
   */
  createContactList: (input: {
    /** Name of the contact list */
    name: string;
  }) => Promise<unknown>;

  /**
   * Delete contact list
   */
  deleteContactList: (input: {
    /** The contact list ID */
    contact_list_id: string;
  }) => Promise<unknown>;

  /**
   * List contacts in contact list
   */
  listContactsInContactList: (input: {
    /** The contact list ID */
    contact_list_id: string;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ContactResponse)[] }>;

  /**
   * Add contacts to contact list
   */
  addContactsToContactList: (input: {
    /** List of IDs of the contacts to add in the requested contact list. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_ids: (ResourceId)[];
    /** The contact list ID */
    contact_list_id: string;
  }) => Promise<unknown>;

  /**
   * Remove contacts from contact list
   */
  removeContactsFromContactList: (input: {
    /** List of IDs of the contacts to remove from the requested contact list. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_ids: (ResourceId)[];
    /** The contact list ID */
    contact_list_id: string;
  }) => Promise<unknown>;

  /**
   * List contacts
   */
  listContacts: (input: {
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with the optional properties `updated_after` and `updated_before`, whose value should be a timestamp in seconds with up to 3 decimal places. */
    q?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the contacts. Either `created_at` or `updated_at`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ContactResponse)[] }>;

  /**
   * Create contact
   */
  createContact: (input: {
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
    /** List of the handles for this contact. Each handle object should include `handle` and `source` fields. */
    handles: (ContactHandle)[];
  }) => Promise<ContactResponse>;

  /**
   * List Contact's custom fields
   */
  listContactCustomFields: () => Promise<{ _links?: { self?: string }; _results?: (CustomFieldResponse)[] }>;

  /**
   * Merge contacts
   */
  mergeContacts: (input: {
    /** Optional contact ID to merge the other contacts into. */
    target_contact_id?: string;
    /** Array of all the contact IDs of the contacts to be merged.  If a target contact id is provided and that contact id is not in this array, the length of this array must be between 1 and 49.  If no target contact id is provided or it is contained in this array, the length must be between 2 and 50. */
    contact_ids: (string)[];
  }) => Promise<ContactResponse>;

  /**
   * Get contact
   */
  getContact: (input: {
    /** The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_id: string;
  }) => Promise<ContactResponse>;

  /**
   * Update a contact
   */
  updateAContact: (input: {
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
    /** The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_id: string;
  }) => Promise<unknown>;

  /**
   * Delete a contact
   */
  deleteAContact: (input: {
    /** The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_id: string;
  }) => Promise<unknown>;

  /**
   * List contact conversations
   */
  listContactConversations: (input: {
    /** The Contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_id: string;
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative. */
    q?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ConversationResponse)[] }>;

  /**
   * Add contact handle
   */
  addContactHandle: (input: {
    /** Handle used to reach the contact. */
    handle: string;
    /** Source of the handle. Can be `email`, `phone`, `twitter`, `facebook`, `intercom`, `front_chat`, or `custom`. */
    source: "twitter" | "email" | "phone" | "facebook" | "intercom" | "front_chat" | "custom";
    /** The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_id: string;
  }) => Promise<unknown>;

  /**
   * Delete contact handle
   */
  deleteContactHandle: (input: {
    /** Handle used to reach the contact. */
    handle: string;
    /** Source of the handle. Can be `email`, `phone`, `twitter`, `facebook`, `intercom`, `front_chat`, or `custom`. */
    source: "twitter" | "email" | "phone" | "facebook" | "intercom" | "front_chat" | "custom";
    /** Force the deletetion of the contact if the handle is the last one */
    force?: boolean;
    /** The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_id: string;
  }) => Promise<unknown>;

  /**
   * List notes
   */
  listNotes: (input: {
    /** The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (ContactNoteResponses)[] }>;

  /**
   * Add note
   */
  addNote: (input: {
    /** ID of teammate creating the note */
    author_id: string;
    /** Content of the note */
    body: string;
    /** The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    contact_id: string;
  }) => Promise<ContactNoteResponses>;

  /**
   * List conversations
   */
  listConversations: (input: {
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative. */
    q?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the conversations. Only supports `date`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ConversationResponse)[] }>;

  /**
   * Create discussion conversation
   */
  createConversation: (input: {
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
  }) => Promise<ConversationResponse>;

  /**
   * List Conversation's custom fields
   */
  listConversationCustomFields: () => Promise<{ _links?: { self?: string }; _results?: (CustomFieldResponse)[] }>;

  /**
   * Search conversations
   */
  searchConversations: (input: {
    /** Search query string. See [Search](https://dev.frontapp.com/docs/search-1) topic for usage details. */
    query: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _total?: number; _results?: (ConversationResponse)[] }>;

  /**
   * Get conversation
   */
  getConversationById: (input: {
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<ConversationResponse>;

  /**
   * Update conversation
   */
  updateConversation: (input: {
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
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<unknown>;

  /**
   * Delete conversation
   */
  deleteConversation: (input: {
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<unknown>;

  /**
   * Update conversation assignee
   */
  updateConversationAssignee: (input: {
    /** ID of the teammate to assign the conversation to. Set it to null to unassign. */
    assignee_id: string;
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<unknown>;

  /**
   * List conversation comments
   */
  listConversationComments: (input: {
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (CommentResponse)[] }>;

  /**
   * Add comment
   */
  addComment: (input: {
    /** ID of the teammate creating the comment. Alternatively, you can supply the author as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). If omitted, will post as the API Token or OAuth client of the requester. */
    author_id?: string;
    /** Content of the comment. Can include markdown formatting. */
    body: string;
    /** Whether or not the comment is pinned in its conversation. */
    is_pinned?: boolean;
    /** Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB. */
    attachments?: (string)[];
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<CommentResponse>;

  /**
   * List conversation drafts
   */
  listConversationDrafts: (input: {
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (MessageResponse)[] }>;

  /**
   * Create draft reply
   */
  createDraftReply: (input: {
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
    /** ID of the channel from which the draft will be sent. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    channel_id: string;
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<MessageResponse>;

  /**
   * List conversation events
   */
  listConversationEvents: (input: {
    /** The conversation ID */
    conversation_id: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (EventResponse)[] }>;

  /**
   * List conversation followers
   */
  listConversationFollowers: (input: {
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (TeammateResponse)[] }>;

  /**
   * Add conversation followers
   */
  addConversationFollowers: (input: {
    /** IDs of the teammate to add to the followers list. Alternatively, you can supply the teammates as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_ids: (string)[];
    /** The conversation ID */
    conversation_id: string;
    /** Whether to ignore invalid teammate IDs and continue adding valid ones. */
    ignore_errors?: boolean;
  }) => Promise<unknown>;

  /**
   * Delete conversation followers
   */
  deleteConversationFollowers: (input: {
    /** IDs of the teammate to remove from the followers list. Alternatively, you can supply the teammates as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_ids: (string)[];
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<unknown>;

  /**
   * List conversation inboxes
   */
  listConversationInboxes: (input: {
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (InboxResponse)[] }>;

  /**
   * Add conversation link
   */
  addConversationLink: (input: {
    /** Link IDs to add. Either link_ids or link_external_urls must be specified but not both */
    link_ids?: (string)[];
    /** Link external URLs to add. Creates links if necessary. Either link_ids or link_external_urls must be specified but not both */
    link_external_urls?: (string)[];
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<unknown>;

  /**
   * Remove conversation links
   */
  removeConversationLinks: (input: {
    /** Link IDs to remove. */
    link_ids: (string)[];
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<unknown>;

  /**
   * List conversation messages
   */
  listConversationMessages: (input: {
    /** The conversation ID */
    conversation_id: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the messages. Only supports `created_at`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (MessageResponse)[] }>;

  /**
   * Create message reply
   */
  createMessageReply: (input: {
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
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<{ status?: string; message_uid?: string }>;

  /**
   * Update conversation reminders
   */
  updateConversationReminders: (input: {
    /** ID of the teammate to create a reminder for. For a private conversation, specify the id of the teammate that owns the conversation. For a shared conversation, use the id of any teammate that has access to the conversation's shared inbox. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
    /** Unix timestamp in seconds to schedule the reminder for. Must be in the future and within 50 years. Set to null to cancel. */
    scheduled_at: number;
    /** ID of the waiting status to which the conversation will be set. Ticketing must be enabled for the company to use this field. If no status is supplied and ticket is enabled, the default waiting status will be used. */
    status_id?: string;
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<unknown>;

  /**
   * Add conversation tag
   */
  addConversationTag: (input: {
    tag_ids: (ResourceId)[];
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<unknown>;

  /**
   * Remove conversation tag
   */
  removeConversationTag: (input: {
    tag_ids: (ResourceId)[];
    /** The conversation ID */
    conversation_id: string;
  }) => Promise<unknown>;

  /**
   * List Contact's custom fields
   */
  listCustomFields: () => Promise<{ _links?: { self?: string }; _results?: (CustomFieldResponse)[] }>;

  /**
   * Download attachment
   */
  downloadAttachment: (input: {
    /** The Attachment ID */
    attachment_link_id: string;
  }) => Promise<string>;

  /**
   * Delete draft
   */
  deleteDraft: (input: {
    /** Version of the draft */
    version: string;
    /** The draft ID */
    draft_id: string;
  }) => Promise<unknown>;

  /**
   * Edit draft
   */
  editDraft: () => Promise<{ _links?: { self?: string; related?: { conversation?: string; message_replied_to?: string; message_seen?: string } }; id?: string; message_uid?: string; type?: "call" | "custom" | "email" | "facebook" | "front_chat" | "googleplay" | "intercom" | "internal" | "phone-call" | "sms" | "tweet" | "tweet_dm" | "whatsapp" | "yalo_wha"; is_inbound?: boolean; draft_mode?: "shared" | "private" | null; error_type?: string; version?: string; created_at?: number; subject?: string; blurb?: string; author?: { _links: { self?: string; related?: { inboxes?: string; conversations?: string; botSource?: string } }; id: string; email: string; username: string; first_name: string; last_name: string; is_admin: boolean; is_available: boolean; is_blocked: boolean; type: "user" | "visitor" | "ai" | "api" | "application" | "bulk_reply" | "csat" | "integration" | "macro" | "rule" | "smart_csat"; custom_fields: { [key: string]: unknown } }; recipients?: ({ _links: { related?: { contact?: string | null } }; name: string | null; handle: string; role: "from" | "to" | "cc" | "bcc" | "reply-to" })[]; body?: string; text?: string; attachments?: ({ id: string; filename: string; url: string; content_type: string; size: number; metadata: { is_inline?: boolean; cid?: string } })[]; signature?: { _links: { self?: string; related?: { owner?: string } }; id: string; name: string | null; body: string; sender_info: string | null; is_visible_for_all_teammate_channels: boolean; is_default: boolean; is_private: boolean; channel_ids: (string)[] | null }; metadata?: { intercom_url?: string; duration?: number; have_been_answered?: boolean; external_id?: string; twitter_url?: string; is_retweet?: boolean; have_been_retweeted?: boolean; have_been_favorited?: boolean; thread_ref?: string; headers?: { [key: string]: unknown }; chat_visitor_url?: string } }>;

  /**
   * List events
   */
  listEvents: (input: {
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with optional properties `before`, `after`, `types`, or `inboxes`. `before` and `after` should be a timestamp in seconds with up to 3 decimal places. `types` should be a list of [event types](https://dev.frontapp.com/reference/events). `inboxes` should be a list of inbox IDs. */
    q?: string;
    /** Max number of results per page (max 15) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the events. Only supports `created_at`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (EventResponse)[] }>;

  /**
   * Get event
   */
  getEvent: (input: {
    /** The event ID */
    event_id: string;
  }) => Promise<EventResponse>;

  /**
   * List inboxes
   */
  listInboxes: () => Promise<{ _links?: { self?: string }; _results?: (InboxResponse)[] }>;

  /**
   * Create inbox
   */
  createInbox: (input: {
    /** The name of the inbox */
    name: string;
    /** An array of teammate IDs that should have access to the inbox. Alternatively, you can supply teammate emails as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_ids?: (ResourceId)[];
    /** Whether the inbox is public or not */
    is_public?: boolean;
    /** Custom fields for this inbox */
    custom_fields?: CustomFieldParameter;
  }) => Promise<InboxResponse>;

  /**
   * List Inbox's custom fields
   */
  listInboxCustomFields: () => Promise<{ _links?: { self?: string }; _results?: (CustomFieldResponse)[] }>;

  /**
   * Get inbox
   */
  getInbox: (input: {
    /** The Inbox ID */
    inbox_id: string;
  }) => Promise<InboxResponse>;

  /**
   * List inbox channels
   */
  listInboxChannels: (input: {
    /** The Inbox ID */
    inbox_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (ChannelResponse)[] }>;

  /**
   * Create a channel
   */
  createAChannel: (input: {
    /** Name of the channel */
    name?: string;
    /** Settings of the channel */
    settings?: { undo_send_time?: 0 | 5 | 10 | 15 | 30 | 60; all_teammates_can_reply?: boolean; webhook_url?: string; sid?: string; auth_token?: string };
    /** Type of the channel */
    type: "custom" | "smtp" | "twilio";
    /** Sending address of your channel. Required for SMTP and Twilio channels. */
    send_as?: string;
    /** The Inbox ID */
    inbox_id: string;
  }) => Promise<unknown>;

  /**
   * List inbox conversations
   */
  listInboxConversations: (input: {
    /** The Inbox ID */
    inbox_id: string;
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative. */
    q?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ConversationResponse)[] }>;

  /**
   * Import message
   */
  importInboxMessage: (input: {
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
    /** The Inbox ID */
    inbox_id: string;
  }) => Promise<{ status?: string; message_uid?: string }>;

  /**
   * List inbox access
   */
  listInboxAccess: (input: {
    /** The Inbox ID */
    inbox_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (TeammateResponse)[] }>;

  /**
   * Add inbox access
   */
  addInboxAccess: (input: {
    teammate_ids: (ResourceId)[];
    /** The Inbox ID */
    inbox_id: string;
  }) => Promise<unknown>;

  /**
   * Removes inbox access
   */
  removesInboxAccess: (input: {
    teammate_ids: (ResourceId)[];
    /** The Inbox ID */
    inbox_id: string;
  }) => Promise<unknown>;

  /**
   * Get a knowledge base article
   */
  getAKnowledgeBaseArticle: (input: {
    /** The ID of the article to fetch */
    article_id: string;
  }) => Promise<KnowledgeBaseArticleSlimResponse>;

  /**
   * Delete an article
   */
  deleteAnArticle: (input: {
    /** The ID of the article to delete */
    article_id: string;
  }) => Promise<KnowledgeBaseArticleSlimResponse>;

  /**
   * Get knowledge base article with content in default locale
   */
  getKnowledgeBaseArticleWithContentInDefaultLocale: (input: {
    /** The ID of the article to fetch */
    article_id: string;
  }) => Promise<KnowledgeBaseArticleResponse>;

  /**
   * Update article content in default locale.
   */
  updateArticleContentInDefaultLocale: (input: {
    /** Teammate ID of the article author */
    author_id?: string;
    /** Subject of the article */
    subject?: string;
    /** HTML content of the article */
    content?: string;
    /** Article status */
    status?: "draft" | "published";
    /** The ID of the article to update */
    article_id: string;
  }) => Promise<KnowledgeBaseArticleResponse>;

  /**
   * Download attachment from an article
   */
  downloadAttachmentFromAnArticle: (input: {
    /** The ID of the article */
    article_id: string;
    /** The ID of the file to download */
    attachment_id: string;
  }) => Promise<string>;

  /**
   * Get knowledge base article with content in specified locale
   */
  getKnowledgeBaseArticleWithContentInSpecifiedLocale: (input: {
    /** The ID of the article to fetch */
    article_id: string;
    /** The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the content to fetch */
    locale: string;
  }) => Promise<KnowledgeBaseArticleResponse>;

  /**
   * Update article content in specified locale
   */
  updateArticleContentInSpecifiedLocale: (input: {
    /** Teammate ID of the article author */
    author_id?: string;
    /** Subject of the article */
    subject?: string;
    /** HTML content of the article */
    content?: string;
    /** Article status */
    status?: "draft" | "published";
    /** The ID of the article to update */
    article_id: string;
    /** The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the updated content */
    locale: string;
  }) => Promise<KnowledgeBaseArticleResponse>;

  /**
   * Get a knowledge base category
   */
  getAKnowledgeBaseCategory: (input: {
    /** The ID of the category to fetch */
    category_id: string;
  }) => Promise<KnowledgeBaseCategorySlimResponse>;

  /**
   * Delete a knowledge base category
   */
  deleteAKnowledgeBaseCategory: (input: {
    /** The ID of the category to delete */
    category_id: string;
  }) => Promise<unknown>;

  /**
   * List articles in a category
   */
  listArticlesInACategory: (input: {
    /** The ID of the category */
    category_id: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (KnowledgeBaseArticleSlimResponse)[] }>;

  /**
   * Get knowledge base category content in default locale
   */
  getKnowledgeBaseCategoryContentInDefaultLocale: (input: {
    /** The ID of the category to fetch */
    category_id: string;
  }) => Promise<KnowledgeBaseCategoryResponse>;

  /**
   * Update knowledge base category in default locale
   */
  updateKnowledgeBaseCategoryInDefaultLocale: (input: {
    /** Name of the knowledge base category */
    name?: string;
    /** Description of the knowledge base category */
    description?: string;
    /** The ID of the category to update */
    category_id: string;
  }) => Promise<KnowledgeBaseCategoryResponse>;

  /**
   * Get knowledge base category with content in specified locale
   */
  getKnowledgeBaseCategoryWithContentInSpecifiedLocale: (input: {
    /** The ID of the category to fetch */
    category_id: string;
    /** The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the content to fetch */
    locale: string;
  }) => Promise<KnowledgeBaseCategoryResponse>;

  /**
   * Update knowledge base category in specified locale
   */
  updateKnowledgeBaseCategoryInSpecifiedLocale: (input: {
    /** Name of the knowledge base category */
    name?: string;
    /** Description of the knowledge base category */
    description?: string;
    /** The ID of the category to update */
    category_id: string;
    /** The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the updated content */
    locale: string;
  }) => Promise<KnowledgeBaseCategoryResponse>;

  /**
   * List knowledge bases
   */
  listKnowledgeBases: () => Promise<{ _links?: { self?: string }; _results?: (KnowledgeBaseSlimResponse)[] }>;

  /**
   * Create a knowledge base
   */
  createAKnowledgeBase: (input: {
    /** Name of the knowledge base */
    name: string;
    /** Determines if the knowledge base is publicly available or private only to your company */
    type?: "internal" | "external";
  }) => Promise<KnowledgeBaseResponse>;

  /**
   * Get a knowledge base
   */
  getAKnowledgeBase: (input: {
    /** The ID of the knowledge base to fetch */
    knowledge_base_id: string;
  }) => Promise<KnowledgeBaseSlimResponse>;

  /**
   * List articles in a knowledge base
   */
  listArticlesInAKnowledgeBase: (input: {
    /** The ID of the knowledge base */
    knowledge_base_id: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (KnowledgeBaseArticleSlimResponse)[] }>;

  /**
   * Create article in a knowledge base in default locale
   */
  createArticleInAKnowledgeBaseInDefaultLocale: (input: {
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
    /** The ID of the knowledge base to create the article in */
    knowledge_base_id: string;
  }) => Promise<KnowledgeBaseArticleResponse>;

  /**
   * List categories in a knowledge base
   */
  listCategoriesInAKnowledgeBase: (input: {
    /** The ID of the knowledge base */
    knowledge_base_id: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (KnowledgeBaseCategorySlimResponse)[] }>;

  /**
   * Create knowledge base category in default locale
   */
  createKnowledgeBaseCategoryInDefaultLocale: (input: {
    /** ID of the parent category */
    parent_category_id?: string;
    /** Name of the knowledge base category */
    name: string;
    /** Description of the knowledge base category */
    description?: string;
    /** The ID of the knowledge base to create the category in */
    knowledge_base_id: string;
  }) => Promise<KnowledgeBaseCategoryResponse>;

  /**
   * Get a knowledge base with content in default locale
   */
  getAKnowledgeBaseWithContentInDefaultLocale: (input: {
    /** The ID of the knowledge base to fetch */
    knowledge_base_id: string;
  }) => Promise<KnowledgeBaseResponse>;

  /**
   * Update knowledge base in default locale
   */
  updateKnowledgeBaseInDefaultLocale: (input: {
    /** Name of the knowledge base */
    name?: string;
    /** The ID of the knowledge base to update */
    knowledge_base_id: string;
  }) => Promise<KnowledgeBaseResponse>;

  /**
   * Create article in a knowledge base in specified locale
   */
  createArticleInAKnowledgeBaseInSpecifiedLocale: (input: {
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
    /** The ID of the knowledge base to create the article in */
    knowledge_base_id: string;
    /** The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the article's content */
    locale: string;
  }) => Promise<KnowledgeBaseArticleResponse>;

  /**
   * Create knowledge base category in specified locale
   */
  createKnowledgeBaseCategoryInSpecifiedLocale: (input: {
    /** ID of the parent category */
    parent_category_id?: string;
    /** Name of the knowledge base category */
    name: string;
    /** Description of the knowledge base category */
    description?: string;
    /** The ID of the knowledge base to create the category in */
    knowledge_base_id: string;
    /** The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the category's content */
    locale: string;
  }) => Promise<KnowledgeBaseCategoryResponse>;

  /**
   * Get a knowledge base with content in specified locale
   */
  getAKnowledgeBaseWithContentInSpecifiedLocale: (input: {
    /** The ID of the knowledge base to fetch */
    knowledge_base_id: string;
    /** The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the content to fetch */
    locale: string;
  }) => Promise<KnowledgeBaseResponse>;

  /**
   * Update knowledge base in specified locale
   */
  updateKnowledgeBaseInSpecifiedLocale: (input: {
    /** Name of the knowledge base */
    name?: string;
    /** The ID of the knowledge base to update */
    knowledge_base_id: string;
    /** The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the updated content */
    locale: string;
  }) => Promise<KnowledgeBaseResponse>;

  /**
   * List links
   */
  listLinks: (input: {
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `types`, whose value should be a list of link types. Links created via the API have type `web` and links created by application objects have type `app_<uid>`, matching the app UID where the object is configured. There are also types `jira`, `asana`, `monday`, `trello`, and `github`, which correspond to the integrations built by Front. */
    q?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the links. Only supports `id`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (LinkResponse)[] }>;

  /**
   * Create link
   */
  createLink: (input: {
    /** Name of the link. If none is specified, the external_url is used as a default */
    name?: string;
    /** Underlying identifying url of the link */
    external_url?: string;
    /** The string that application object configurations will match on to update a specific application object. For example, if you've configured an application object to match on ORDER-{Digits}, and you want to specifically update the application objects for ORDER-777 to retrieve the latest information from external systems, send "ORDER-777". Repeat for other specific identifiers, such as "ORDER-435". */
    pattern?: string;
  }) => Promise<LinkResponse>;

  /**
   * List Link's custom fields
   */
  listLinkCustomFields: () => Promise<{ _links?: { self?: string }; _results?: (CustomFieldResponse)[] }>;

  /**
   * Get link
   */
  getLink: (input: {
    /** The link ID */
    link_id: string;
  }) => Promise<LinkResponse>;

  /**
   * Update a link
   */
  updateALink: (input: {
    /** Name of the link */
    name?: string;
    /** The Link ID */
    link_id: string;
  }) => Promise<unknown>;

  /**
   * List link conversations
   */
  listLinkConversations: (input: {
    /** The Link ID */
    link_id: string;
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative. */
    q?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the conversations. Only supports `date`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ConversationResponse)[] }>;

  /**
   * API Token details
   */
  apiTokenDetails: () => Promise<IdentityResponse>;

  /**
   * List folders
   */
  listFolders: (input: {
    /** Field used to sort the message template folders. Either `created_at` or `updated_at`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (MessageTemplateFolderResponse)[] }>;

  /**
   * Create folder
   */
  createFolder: (input: {
    /** Name of the message template folder */
    name: string;
    /** ID of the parent folder to be placed into. Goes into the root folder if unspecified or if null. */
    parent_folder_id?: string;
  }) => Promise<MessageTemplateFolderResponse>;

  /**
   * Get folder
   */
  getFolder: (input: {
    /** The message template folder ID */
    message_template_folder_id: string;
  }) => Promise<MessageTemplateFolderResponse>;

  /**
   * Update folder
   */
  updateFolder: (input: {
    /** Name of the message template folder */
    name?: string;
    /** ID of the parent folder to be placed into. Goes into the root folder if unspecified or if null. */
    parent_folder_id?: string;
    /** The message template folder ID */
    message_template_folder_id: string;
  }) => Promise<MessageTemplateFolderResponse>;

  /**
   * Delete folder
   */
  deleteFolder: (input: {
    /** The message template folder id */
    message_template_folder_id: string;
  }) => Promise<{ status?: string; message_template_folder_id?: string }>;

  /**
   * Get child folders
   */
  getChildFolders: (input: {
    /** The message template folder ID */
    message_template_folder_id: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (MessageTemplateFolderResponse)[] }>;

  /**
   * Create child folder
   */
  createChildFolder: (input: {
    /** Name of the message template folder */
    name: string;
    /** The parent message template folder ID */
    message_template_folder_id: string;
  }) => Promise<MessageTemplateFolderResponse>;

  /**
   * Get child templates
   */
  getChildTemplates: (input: {
    /** The message template folder ID */
    message_template_folder_id: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (MessageTemplateFolderResponse)[] }>;

  /**
   * Create child template
   */
  createChildTemplate: (input: {
    /** Name of the message template */
    name: string;
    /** Subject of the message template. */
    subject?: string;
    /** Body of the message template. You can supply HTML with inline CSS to structure and style your template. */
    body: string;
    /** The specific inboxes this template is available in. If unspecified or null, then it will be available in all inboxes. Array should be non-empty. */
    inbox_ids?: (string)[];
    /** The parent message template folder ID */
    message_template_folder_id: string;
  }) => Promise<MessageTemplateResponse>;

  /**
   * List message templates
   */
  listMessageTemplates: (input: {
    /** Field used to sort the message templates. Either `created_at`, `updated_at`, or `sort_order`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (MessageTemplateResponse)[] }>;

  /**
   * Create message template
   */
  createMessageTemplate: (input: {
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
  }) => Promise<MessageTemplateResponse>;

  /**
   * Get message template
   */
  getMessageTemplate: (input: {
    /** The message template ID */
    message_template_id: string;
  }) => Promise<MessageTemplateResponse>;

  /**
   * Update message template
   */
  updateMessageTemplate: (input: {
    /** The message template ID */
    message_template_id: string;
  }) => Promise<MessageTemplateResponse>;

  /**
   * Delete message template
   */
  deleteMessageTemplate: (input: {
    /** The message template ID */
    message_template_id: string;
  }) => Promise<unknown>;

  /**
   * Download attachment for a message template
   */
  downloadAttachmentForAMessageTemplate: (input: {
    /** The Message Template ID */
    message_template_id: string;
    /** The Attachment ID */
    attachment_link_id: string;
  }) => Promise<string>;

  /**
   * Get message
   */
  getMessage: (input: {
    /** The message ID */
    message_id: string;
  }) => Promise<MessageResponse>;

  /**
   * Download attachment for a message
   */
  downloadAttachmentForAMessage: (input: {
    /** The Message ID */
    message_id: string;
    /** The Attachment ID */
    attachment_link_id: string;
  }) => Promise<string>;

  /**
   * Get message seen status
   */
  getMessageSeenStatus: (input: {
    /** The message ID */
    message_id: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (SeenReceiptResponse)[] }>;

  /**
   * Mark message seen
   */
  markMessageSeen: (input: {
    body?: { [key: string]: unknown };
    /** The message ID */
    message_id: string;
  }) => Promise<unknown>;

  /**
   * List rules
   */
  listRules: () => Promise<{ _links?: { self?: string }; _results?: (RuleResponse)[] }>;

  /**
   * Get rule
   */
  getRule: (input: {
    /** The Rule ID */
    rule_id: string;
  }) => Promise<RuleResponse>;

  /**
   * List Shifts
   */
  listShifts: () => Promise<{ _links?: { self?: string }; _results?: (ShiftResponse)[] }>;

  /**
   * Create shift
   */
  createShift: (input: {
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
  }) => Promise<ShiftResponse>;

  /**
   * Get shift
   */
  getShift: (input: {
    /** The Shift ID */
    shift_id: string;
  }) => Promise<ShiftResponse>;

  /**
   * Update shift
   */
  updateShift: (input: {
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
    /** The Shift ID */
    shift_id: string;
  }) => Promise<unknown>;

  /**
   * List shift's teammates
   */
  listShiftsTeammates: (input: {
    /** The Shift ID */
    shift_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (TeammateResponse)[] }>;

  /**
   * Add teammates to shift
   */
  addTeammatesToShift: (input: {
    teammate_ids: (ResourceId)[];
    /** The Shift ID */
    shift_id: string;
  }) => Promise<unknown>;

  /**
   * Remove teammates from shift
   */
  removeTeammatesFromShift: (input: {
    teammate_ids: (ResourceId)[];
    /** The Shift ID */
    shift_id: string;
  }) => Promise<unknown>;

  /**
   * Get signatures
   */
  getSignatures: (input: {
    /** The signature ID */
    signature_id: string;
  }) => Promise<SignatureResponse>;

  /**
   * Update signature
   */
  updateSignature: (input: {
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
    /** The signature ID */
    signature_id: string;
  }) => Promise<SignatureResponse>;

  /**
   * Delete signature
   */
  deleteSignature: (input: {
    /** The signature ID */
    signature_id: string;
  }) => Promise<unknown>;

  /**
   * List tags
   */
  listTags: (input: {
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the tags. Only supports `id`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _links?: { self?: string }; _results?: (TagResponse)[] }>;

  /**
   * Create tag
   */
  createTag: (input: {
    /** Name of the tag */
    name: string;
    /** Description of the tag */
    description?: string;
    /** Highlight color of the tag. */
    highlight?: "grey" | "pink" | "red" | "orange" | "yellow" | "green" | "light-blue" | "blue" | "purple";
    /** Whether the tag is visible in conversation lists. */
    is_visible_in_conversation_lists?: boolean;
  }) => Promise<TagResponse>;

  /**
   * Get tag
   */
  getTag: (input: {
    /** The tag ID */
    tag_id: string;
  }) => Promise<TagResponse>;

  /**
   * Update a tag
   */
  updateATag: (input: {
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
    /** The tag ID */
    tag_id: string;
  }) => Promise<unknown>;

  /**
   * Delete tag
   */
  deleteTag: (input: {
    /** The ID of the tag to delete */
    tag_id: string;
  }) => Promise<unknown>;

  /**
   * List tag children
   */
  listTagChildren: (input: {
    /** The tag ID */
    tag_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (TagResponse)[] }>;

  /**
   * Create child tag
   */
  createChildTag: (input: {
    /** Name of the tag */
    name: string;
    /** Description of the tag */
    description?: string;
    /** Highlight color of the tag. */
    highlight?: "grey" | "pink" | "red" | "orange" | "yellow" | "green" | "light-blue" | "blue" | "purple";
    /** Whether the tag is visible in conversation lists. */
    is_visible_in_conversation_lists?: boolean;
    /** The tag ID */
    tag_id: string;
  }) => Promise<TagResponse>;

  /**
   * List tagged conversations
   */
  listTaggedConversations: (input: {
    /** The ID of the tag */
    tag_id: string;
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative. */
    q?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ConversationResponse)[] }>;

  /**
   * List teammate groups
   */
  listCompanyTeammateGroups: () => Promise<{ _links?: { self?: string }; _results?: (TeammateGroupResponse)[] }>;

  /**
   * Create teammate group
   */
  createCompanyTeammateGroup: (input: {
    /** Name of the teammate group */
    name: string;
    /** Description of the teammate group */
    description?: string;
    /** Permissions for the teammate group */
    permissions?: { contacts?: { access: string; contact_group_ids?: (string)[]; contact_list_ids?: (string)[] } };
  }) => Promise<TeammateGroupResponse>;

  /**
   * Get teammate group
   */
  getCompanyTeammateGroup: (input: {
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<TeammateGroupResponse>;

  /**
   * Update a teammate group
   */
  updateACompanyTeammateGroup: (input: {
    /** Name of the teammate group */
    name?: string;
    /** Description of the teammate group */
    description?: string;
    /** Permissions for the teammate group */
    permissions?: { contacts?: { access: string; contact_group_ids?: (string)[]; contact_list_ids?: (string)[] } };
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<unknown>;

  /**
   * Delete teammate group
   */
  deleteCompanyTeammateGroup: (input: {
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<unknown>;

  /**
   * List teammate group team inboxes
   */
  listCompanyTeammateGroupTeamInboxes: (input: {
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (InboxResponse)[] }>;

  /**
   * Add teammate group team inboxes
   */
  addCompanyTeammateGroupTeamInboxes: (input: {
    inbox_ids: (ResourceId)[];
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<unknown>;

  /**
   * Remove teammate group team inboxes
   */
  removeCompanyTeammateGroupTeamInboxes: (input: {
    inbox_ids: (ResourceId)[];
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<unknown>;

  /**
   * List teammate group teammates
   */
  listCompanyTeammateGroupTeammates: (input: {
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (TeammateResponse)[] }>;

  /**
   * Add teammate group teammates
   */
  addCompanyTeammateGroupTeammates: (input: {
    teammate_ids: (ResourceId)[];
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<unknown>;

  /**
   * Remove teammate group teammates
   */
  removeCompanyTeammateGroupTeammates: (input: {
    teammate_ids: (ResourceId)[];
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<unknown>;

  /**
   * List teammate group teams
   */
  listCompanyTeammateGroupTeams: (input: {
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (TeamPreviewResponse)[] }>;

  /**
   * Add teammate group teams
   */
  addCompanyTeammateGroupTeams: (input: {
    team_ids: (ResourceId)[];
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<unknown>;

  /**
   * Remove teammate group teams
   */
  removeCompanyTeammateGroupTeams: (input: {
    team_ids: (ResourceId)[];
    /** The teammate group ID. */
    teammate_group_id: string;
  }) => Promise<unknown>;

  /**
   * List teammates
   */
  listTeammates: () => Promise<{ _links?: { self?: string }; _results?: (TeammateResponse)[] }>;

  /**
   * List Teammate's custom fields
   */
  listTeammateCustomFields: () => Promise<{ _links?: { self?: string }; _results?: (CustomFieldResponse)[] }>;

  /**
   * Get teammate
   */
  getTeammate: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<TeammateResponse>;

  /**
   * Update teammate
   */
  updateTeammate: (input: {
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
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<unknown>;

  /**
   * List teammate channels
   */
  listTeammateChannels: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (ChannelResponse)[] }>;

  /**
   * List teammate groups
   */
  listTeammateGroups: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (ContactListResponses)[] }>;

  /**
   * Create teammate group
   */
  createTeammateGroup: (input: {
    /** Name of the contact list */
    name: string;
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<unknown>;

  /**
   * List teammate contact lists
   */
  listTeammateContactLists: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (ContactListResponses)[] }>;

  /**
   * Create teammate contact list
   */
  createTeammateContactList: (input: {
    /** Name of the contact list */
    name: string;
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<unknown>;

  /**
   * List teammate contacts
   */
  listTeammateContacts: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with the optional properties `updated_after` and `updated_before`, whose value should be a timestamp in seconds with up to 3 decimal places. */
    q?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the contacts. Either `created_at` or `updated_at`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ContactResponse)[] }>;

  /**
   * Create teammate contact
   */
  createTeammateContact: (input: {
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
    /** List of the handles for this contact. Each handle object should include `handle` and `source` fields. */
    handles: (ContactHandle)[];
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<ContactResponse>;

  /**
   * List assigned conversations
   */
  listAssignedConversations: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative. */
    q?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ConversationResponse)[] }>;

  /**
   * List teammate inboxes
   */
  listTeammateInboxes: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (InboxResponse)[] }>;

  /**
   * List teammate folders
   */
  listTeammateFolders: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
    /** Field used to sort the message template folders. Either `created_at` or `updated_at`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (MessageTemplateFolderResponse)[] }>;

  /**
   * Create teammate folder
   */
  createTeammateFolder: (input: {
    /** Name of the message template folder */
    name: string;
    /** ID of the parent folder to be placed into. Goes into the root folder if unspecified or if null. */
    parent_folder_id?: string;
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<MessageTemplateFolderResponse>;

  /**
   * List teammate message templates
   */
  listTeammateMessageTemplates: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
    /** Field used to sort the message templates. Either `created_at`, `updated_at`, or `sort_order`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (MessageTemplateResponse)[] }>;

  /**
   * Create teammate message template
   */
  createTeammateMessageTemplate: (input: {
    /** Name of the message template */
    name: string;
    /** Subject of the message template. */
    subject?: string;
    /** Body of the message template. You can supply HTML with inline CSS to structure and style your template. */
    body: string;
    /** ID of the message template folder to place this message template in */
    folder_id?: string;
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<MessageTemplateResponse>;

  /**
   * List teammate private inboxes
   */
  listTeammatePrivateInboxes: (input: {
    /** The teammate ID */
    teammate_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (InboxResponse)[] }>;

  /**
   * Create teammate private inbox
   */
  createTeammatePrivateInbox: (input: {
    /** The name of the inbox */
    name: string;
    /** Custom fields for this inbox */
    custom_fields?: CustomFieldParameter;
    /** The teammate ID */
    teammate_id: string;
  }) => Promise<InboxResponse>;

  /**
   * List teammate rules
   */
  listTeammateRules: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (RuleResponse)[] }>;

  /**
   * List Teammate Shifts
   */
  listTeammateShifts: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (ShiftResponse)[] }>;

  /**
   * List teammate signatures
   */
  listTeammateSignatures: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (SignatureResponse)[] }>;

  /**
   * Create teammate signature
   */
  createTeammateSignature: (input: {
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
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<SignatureResponse>;

  /**
   * List teammate tags
   */
  listTeammateTags: (input: {
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the tags. Only supports `id`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _links?: { self?: string }; _results?: (TagResponse)[] }>;

  /**
   * Create teammate tag
   */
  createTeammateTag: (input: {
    /** Name of the tag */
    name: string;
    /** Description of the tag */
    description?: string;
    /** Highlight color of the tag. */
    highlight?: "grey" | "pink" | "red" | "orange" | "yellow" | "green" | "light-blue" | "blue" | "purple";
    /** Whether the tag is visible in conversation lists. */
    is_visible_in_conversation_lists?: boolean;
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<TagResponse>;

  /**
   * List teammate time offs
   */
  listTeammateTimeOffs: (input: {
    /** The teammate ID */
    teammate_id: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with the optional properties `active_from` and `active_until`, whose value should be a timestamp in seconds with up to 3 decimal places. */
    q?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (TimeOffResponse)[] }>;

  /**
   * Create time off
   */
  createTimeOff: (input: {
    /** Name of the time off */
    name: string;
    /** Timestamp when the time off starts (in seconds) */
    start_at: number;
    /** Timestamp when the time off ends (in seconds), or null if open-ended */
    end_at?: number | null;
    auto_responder?: { body?: string; is_enabled?: boolean; is_contacts_only?: boolean; channel_ids?: (ResourceId)[] };
    /** The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_id: string;
  }) => Promise<TimeOffResponse>;

  /**
   * List teams
   */
  listTeams: () => Promise<{ _links?: { self?: string }; _results?: (TeamPreviewResponse)[] }>;

  /**
   * Get team
   */
  getTeam: (input: {
    /** The Team ID */
    team_id: string;
  }) => Promise<TeamResponse>;

  /**
   * List team channels
   */
  listTeamChannels: (input: {
    /** The team ID */
    team_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (ChannelResponse)[] }>;

  /**
   * List team groups
   */
  listTeamGroups: (input: {
    /** The team ID */
    team_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (ContactListResponses)[] }>;

  /**
   * Create team group
   */
  createTeamGroup: (input: {
    /** Name of the contact list */
    name: string;
    /** The team ID */
    team_id: string;
  }) => Promise<unknown>;

  /**
   * List team contact lists
   */
  listTeamContactLists: (input: {
    /** The team ID */
    team_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (ContactListResponses)[] }>;

  /**
   * Create team contact list
   */
  createTeamContactList: (input: {
    /** Name of the contact list */
    name: string;
    /** The team ID */
    team_id: string;
  }) => Promise<unknown>;

  /**
   * List team contacts
   */
  listTeamContacts: (input: {
    /** The team ID */
    team_id: string;
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with the optional properties `updated_after` and `updated_before`, whose value should be a timestamp in seconds with up to 3 decimal places. */
    q?: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the contacts. Either `created_at` or `updated_at`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (ContactResponse)[] }>;

  /**
   * Create team contact
   */
  createTeamContact: (input: {
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
    /** List of the handles for this contact. Each handle object should include `handle` and `source` fields. */
    handles: (ContactHandle)[];
    /** The team ID */
    team_id: string;
  }) => Promise<ContactResponse>;

  /**
   * List team inboxes
   */
  listTeamInboxes: (input: {
    /** The team ID */
    team_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (InboxResponse)[] }>;

  /**
   * Create team inbox
   */
  createTeamInbox: (input: {
    /** The name of the inbox */
    name: string;
    /** An array of teammate IDs that should have access to the inbox. Alternatively, you can supply teammate emails as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). */
    teammate_ids?: (ResourceId)[];
    /** Whether the inbox is public or not */
    is_public?: boolean;
    /** Custom fields for this inbox */
    custom_fields?: CustomFieldParameter;
    /** The team ID */
    team_id: string;
  }) => Promise<InboxResponse>;

  /**
   * List team folders
   */
  listTeamFolders: (input: {
    /** The team ID */
    team_id: string;
    /** Field used to sort the message template folders. Either `created_at` or `updated_at`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (MessageTemplateFolderResponse)[] }>;

  /**
   * Create team folder
   */
  createTeamFolder: (input: {
    /** Name of the message template folder */
    name: string;
    /** ID of the parent folder to be placed into. Goes into the root folder if unspecified or if null. */
    parent_folder_id?: string;
    /** The team ID */
    team_id: string;
  }) => Promise<MessageTemplateFolderResponse>;

  /**
   * List team message templates
   */
  listTeamMessageTemplates: (input: {
    /** The team ID */
    team_id: string;
    /** Field used to sort the message templates. Either `created_at`, `updated_at`, or `sort_order`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (MessageTemplateResponse)[] }>;

  /**
   * Create team message template
   */
  createTeamMessageTemplate: (input: {
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
    /** The team ID */
    team_id: string;
  }) => Promise<MessageTemplateResponse>;

  /**
   * List team rules
   */
  listTeamRules: (input: {
    /** The team ID */
    team_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (RuleResponse)[] }>;

  /**
   * List team Shifts
   */
  listTeamShifts: (input: {
    /** The team ID */
    team_id: string;
  }) => Promise<{ _links?: { self?: string }; _results?: (ShiftResponse)[] }>;

  /**
   * Create team shift
   */
  createTeamShift: (input: {
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
    /** The Team ID */
    team_id: string;
  }) => Promise<ShiftResponse>;

  /**
   * List team signatures
   */
  listTeamSignatures: (input: {
    /** The team ID */
    team_id: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (SignatureResponse)[] }>;

  /**
   * Create team signature
   */
  createTeamSignature: (input: {
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
    /** The team ID */
    team_id: string;
  }) => Promise<SignatureResponse>;

  /**
   * List team tags
   */
  listTeamTags: (input: {
    /** The team ID */
    team_id: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** Field used to sort the tags. Only supports `id`. */
    sort_by?: string;
    /** Order by which results should be sorted */
    sort_order?: "asc" | "desc";
  }) => Promise<{ _links?: { self?: string }; _results?: (TagResponse)[] }>;

  /**
   * Create team tag
   */
  createTeamTag: (input: {
    /** Name of the tag */
    name: string;
    /** Description of the tag */
    description?: string;
    /** Highlight color of the tag. */
    highlight?: "grey" | "pink" | "red" | "orange" | "yellow" | "green" | "light-blue" | "blue" | "purple";
    /** Whether the tag is visible in conversation lists. */
    is_visible_in_conversation_lists?: boolean;
    /** The team ID */
    team_id: string;
  }) => Promise<TagResponse>;

  /**
   * Add teammates to team
   */
  addTeammatesToTeam: (input: {
    teammate_ids: (ResourceId)[];
    /** The Team ID */
    team_id: string;
  }) => Promise<unknown>;

  /**
   * Remove teammates from team
   */
  removeTeammatesFromTeam: (input: {
    teammate_ids: (ResourceId)[];
    /** The Team ID */
    team_id: string;
  }) => Promise<unknown>;

  /**
   * List team time offs
   */
  listTeamTimeOffs: (input: {
    /** The team ID */
    team_id: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
    /** [Search query object](https://dev.frontapp.com/docs/query-object-q) with the optional properties `active_from` and `active_until`, whose value should be a timestamp in seconds with up to 3 decimal places. */
    q?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (TimeOffResponse)[] }>;

  /**
   * List team views
   */
  listTeamViews: (input: {
    /** The team ID */
    team_id: string;
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (SharedViewResponse)[] }>;

  /**
   * Create team view
   */
  createTeamView: (input: {
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
    /** The team ID */
    team_id: string;
  }) => Promise<SharedViewResponse>;

  /**
   * Get time off
   */
  getTimeOff: (input: {
    /** The time off ID */
    time_off_id: string;
  }) => Promise<TimeOffResponse>;

  /**
   * Update time off
   */
  updateTimeOff: (input: {
    /** Name of the time off */
    name?: string;
    /** Timestamp when the time off starts (in seconds) */
    start_at?: number;
    /** Timestamp when the time off ends (in seconds), or null to clear it */
    end_at?: number | null;
    auto_responder?: { body?: string; is_enabled?: boolean; is_contacts_only?: boolean; channel_ids?: (ResourceId)[] };
    /** The time off ID */
    time_off_id: string;
  }) => Promise<unknown>;

  /**
   * Delete time off
   */
  deleteTimeOff: (input: {
    /** The time off ID */
    time_off_id: string;
  }) => Promise<unknown>;

  /**
   * List views
   */
  listViews: (input: {
    /** Max number of results per [page](https://dev.frontapp.com/docs/pagination) */
    limit?: number;
    /** Token to use to request the [next page](https://dev.frontapp.com/docs/pagination) */
    page_token?: string;
  }) => Promise<{ _pagination?: { next?: string | null }; _links?: { self?: string }; _results?: (SharedViewResponse)[] }>;

  /**
   * Get view
   */
  getView: (input: {
    /** The view ID */
    view_id: string;
  }) => Promise<SharedViewResponse>;

  /**
   * Update view
   */
  updateView: (input: {
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
    /** The view ID */
    view_id: string;
  }) => Promise<unknown>;

  /**
   * Add view to teammate sidebars
   */
  addViewTeammates: (input: {
    teammate_ids: (string)[];
    /** The view ID */
    view_id: string;
  }) => Promise<unknown>;
};

export * from "./schemas.js";
