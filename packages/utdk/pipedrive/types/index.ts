

export type PipedriveClient = {
  /**
   * Get all activity fields
   */
  getActivityFields: () => Promise<{ success?: boolean } & unknown & { data?: ({ id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Get all activity types
   */
  getActivityTypes: () => Promise<{ success?: boolean } & { data?: ({ id?: number; name?: string; icon_key?: "task" | "email" | "meeting" | "deadline" | "call" | "lunch" | "calendar" | "downarrow" | "document" | "smartphone" | "camera" | "scissors" | "cogs" | "bubble" | "uparrow" | "checkbox" | "signpost" | "shuffle" | "addressbook" | "linegraph" | "picture" | "car" | "world" | "search" | "clip" | "sound" | "brush" | "key" | "padlock" | "pricetag" | "suitcase" | "finish" | "plane" | "loop" | "wifi" | "truck" | "cart" | "bulb" | "bell" | "presentation"; color?: string; order_nr?: number; key_string?: string; active_flag?: boolean; is_custom_flag?: boolean; add_time?: string; update_time?: string })[] }>;

  /**
   * Add new activity type
   */
  addActivityType: (input: {
    /** The name of the activity type */
    name: string;
    /** Icon graphic to use for representing this activity type */
    icon_key: "task" | "email" | "meeting" | "deadline" | "call" | "lunch" | "calendar" | "downarrow" | "document" | "smartphone" | "camera" | "scissors" | "cogs" | "bubble" | "uparrow" | "checkbox" | "signpost" | "shuffle" | "addressbook" | "linegraph" | "picture" | "car" | "world" | "search" | "clip" | "sound" | "brush" | "key" | "padlock" | "pricetag" | "suitcase" | "finish" | "plane" | "loop" | "wifi" | "truck" | "cart" | "bulb" | "bell" | "presentation";
    /** A designated color for the activity type in 6-character HEX format (e.g. `FFFFFF` for white, `000000` for black) */
    color?: string;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; name?: string; icon_key?: "task" | "email" | "meeting" | "deadline" | "call" | "lunch" | "calendar" | "downarrow" | "document" | "smartphone" | "camera" | "scissors" | "cogs" | "bubble" | "uparrow" | "checkbox" | "signpost" | "shuffle" | "addressbook" | "linegraph" | "picture" | "car" | "world" | "search" | "clip" | "sound" | "brush" | "key" | "padlock" | "pricetag" | "suitcase" | "finish" | "plane" | "loop" | "wifi" | "truck" | "cart" | "bulb" | "bell" | "presentation"; color?: string; order_nr?: number; key_string?: string; active_flag?: boolean; is_custom_flag?: boolean; add_time?: string; update_time?: string } }>;

  /**
   * Delete an activity type
   */
  deleteActivityType: (input: {
    /** The ID of the activity type */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; name?: string; icon_key?: "task" | "email" | "meeting" | "deadline" | "call" | "lunch" | "calendar" | "downarrow" | "document" | "smartphone" | "camera" | "scissors" | "cogs" | "bubble" | "uparrow" | "checkbox" | "signpost" | "shuffle" | "addressbook" | "linegraph" | "picture" | "car" | "world" | "search" | "clip" | "sound" | "brush" | "key" | "padlock" | "pricetag" | "suitcase" | "finish" | "plane" | "loop" | "wifi" | "truck" | "cart" | "bulb" | "bell" | "presentation"; color?: string; order_nr?: number; key_string?: string; active_flag?: boolean; is_custom_flag?: boolean; add_time?: string; update_time?: string } }>;

  /**
   * Update an activity type
   */
  updateActivityType: (input: {
    /** The name of the activity type */
    name?: string;
    /** Icon graphic to use for representing this activity type */
    icon_key?: "task" | "email" | "meeting" | "deadline" | "call" | "lunch" | "calendar" | "downarrow" | "document" | "smartphone" | "camera" | "scissors" | "cogs" | "bubble" | "uparrow" | "checkbox" | "signpost" | "shuffle" | "addressbook" | "linegraph" | "picture" | "car" | "world" | "search" | "clip" | "sound" | "brush" | "key" | "padlock" | "pricetag" | "suitcase" | "finish" | "plane" | "loop" | "wifi" | "truck" | "cart" | "bulb" | "bell" | "presentation";
    /** A designated color for the activity type in 6-character HEX format (e.g. `FFFFFF` for white, `000000` for black) */
    color?: string;
    /** An order number for this activity type. Order numbers should be used to order the types in the activity type selections. */
    order_nr?: number;
    /** The ID of the activity type */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; name?: string; icon_key?: "task" | "email" | "meeting" | "deadline" | "call" | "lunch" | "calendar" | "downarrow" | "document" | "smartphone" | "camera" | "scissors" | "cogs" | "bubble" | "uparrow" | "checkbox" | "signpost" | "shuffle" | "addressbook" | "linegraph" | "picture" | "car" | "world" | "search" | "clip" | "sound" | "brush" | "key" | "padlock" | "pricetag" | "suitcase" | "finish" | "plane" | "loop" | "wifi" | "truck" | "cart" | "bulb" | "bell" | "presentation"; color?: string; order_nr?: number; key_string?: string; active_flag?: boolean; is_custom_flag?: boolean; add_time?: string; update_time?: string } }>;

  /**
   * Get all add-ons for a single company
   */
  getCompanyAddons: () => Promise<{ success?: boolean } & { data?: ({ [key: string]: unknown })[] }>;

  /**
   * Add a call log
   */
  addCallLog: (input: {
    /** The ID of the owner of the call log. Please note that a user without account settings access cannot create call logs for other users. */
    user_id?: number;
    /** If specified, this activity will be converted into a call log, with the information provided. When this field is used, you don't need to specify `deal_id`, `person_id` or `org_id`, as they will be ignored in favor of the values already available in the activity. The `activity_id` must refer to a `call` type activity. */
    activity_id?: number;
    /** The name of the activity this call is attached to */
    subject?: string;
    /** The duration of the call in seconds */
    duration?: string;
    /** Describes the outcome of the call */
    outcome: "connected" | "no_answer" | "left_message" | "left_voicemail" | "wrong_number" | "busy";
    /** The number that made the call */
    from_phone_number?: string;
    /** The number called */
    to_phone_number: string;
    /** The date and time of the start of the call in UTC. Format: YYYY-MM-DD HH:MM:SS. */
    start_time: string;
    /** The date and time of the end of the call in UTC. Format: YYYY-MM-DD HH:MM:SS. */
    end_time: string;
    /** The ID of the person this call is associated with */
    person_id?: number;
    /** The ID of the organization this call is associated with */
    org_id?: number;
    /** The ID of the deal this call is associated with. A call log can be associated with either a deal or a lead, but not both at once. */
    deal_id?: number;
    /** The ID of the lead in the UUID format this call is associated with. A call log can be associated with either a deal or a lead, but not both at once. */
    lead_id?: string;
    /** The note for the call log in HTML format */
    note?: string;
  }) => Promise<{ success?: boolean; data?: { user_id?: number; activity_id?: number; subject?: string; duration?: string; outcome: "connected" | "no_answer" | "left_message" | "left_voicemail" | "wrong_number" | "busy"; from_phone_number?: string; to_phone_number: string; start_time: string; end_time: string; person_id?: number; org_id?: number; deal_id?: number; lead_id?: string; note?: string } & { id?: string; has_recording?: boolean; company_id?: number } }>;

  /**
   * Get all call logs assigned to a particular user
   */
  getUserCallLogs: (input: {
    /** Pagination start */
    start?: number;
    /** For pagination, the limit of entries to be returned. The upper limit is 50. */
    limit?: number;
  }) => Promise<{ success?: boolean; data?: ({ user_id?: number; activity_id?: number; subject?: string; duration?: string; outcome: "connected" | "no_answer" | "left_message" | "left_voicemail" | "wrong_number" | "busy"; from_phone_number?: string; to_phone_number: string; start_time: string; end_time: string; person_id?: number; org_id?: number; deal_id?: number; lead_id?: string; note?: string } & { id?: string; has_recording?: boolean; company_id?: number })[]; additional_data?: { pagination?: { start?: number; limit?: number; more_items_in_collection?: boolean } } }>;

  /**
   * Delete a call log
   */
  deleteCallLog: (input: {
    /** The ID received when you create the call log */
    id: string;
  }) => Promise<{ success?: boolean }>;

  /**
   * Get details of a call log
   */
  getCallLog: (input: {
    /** The ID received when you create the call log */
    id: string;
  }) => Promise<{ success?: boolean; data?: { user_id?: number; activity_id?: number; subject?: string; duration?: string; outcome: "connected" | "no_answer" | "left_message" | "left_voicemail" | "wrong_number" | "busy"; from_phone_number?: string; to_phone_number: string; start_time: string; end_time: string; person_id?: number; org_id?: number; deal_id?: number; lead_id?: string; note?: string } & { id?: string; has_recording?: boolean; company_id?: number } }>;

  /**
   * Attach an audio file to the call log
   */
  addCallLogAudioFile: (input: {
    /** Audio file supported by the HTML5 specification */
    file: string;
    /** The ID received when you create the call log */
    id: string;
  }) => Promise<{ success?: boolean }>;

  /**
   * Add a channel
   */
  addChannel: (input: {
    /** The name of the channel */
    name: string;
    /** The channel ID */
    provider_channel_id: string;
    /** The URL for an icon that represents your channel */
    avatar_url?: string;
    /** If true, enables templates logic on UI. Requires getTemplates endpoint implemented. Find out more [here](https://pipedrive.readme.io/docs/implementing-messaging-app-extension). */
    template_support?: boolean;
    /** It controls the icons (like the icon next to the conversation) */
    provider_type?: "facebook" | "whatsapp" | "other";
  }) => Promise<{ success?: boolean; data?: { id?: string; name?: string; avatar_url?: string; provider_channel_id?: string; marketplace_client_id?: string; pd_company_id?: number; pd_user_id?: number; created_at?: string; provider_type?: "facebook" | "whatsapp" | "other"; template_support?: boolean } }>;

  /**
   * Delete a channel
   */
  deleteChannel: (input: {
    /** The ID of the channel provided by the integration */
    id: string;
  }) => Promise<{ success?: boolean }>;

  /**
   * Receives an incoming message
   */
  receiveMessage: (input: {
    /** The ID of the message */
    id: string;
    /** The channel ID as in the provider */
    channel_id: string;
    /** The ID of the provider's user that sent the message */
    sender_id: string;
    /** The ID of the conversation */
    conversation_id: string;
    /** The body of the message */
    message: string;
    /** The status of the message */
    status: "sent" | "delivered" | "read" | "failed";
    /** The date and time when the message was created in the provider, in UTC. Format: YYYY-MM-DD HH:MM */
    created_at: string;
    /** The date and time when the message can no longer receive a reply, in UTC. Format: YYYY-MM-DD HH:MM */
    reply_by?: string;
    /** A URL that can open the conversation in the provider's side */
    conversation_link?: string;
    /** The list of attachments available in the message */
    attachments?: ({ id: string; type: string; name?: string; size?: number; url: string; preview_url?: string; link_expires?: boolean })[];
  }) => Promise<{ success?: boolean; data?: { id: string; channel_id: string; sender_id: string; conversation_id: string; message: string; status: "sent" | "delivered" | "read" | "failed"; created_at: string; reply_by?: string; conversation_link?: string; attachments?: ({ id: string; type: string; name?: string; size?: number; url: string; preview_url?: string; link_expires?: boolean })[] } }>;

  /**
   * Delete a conversation
   */
  deleteConversation: (input: {
    /** The ID of the channel provided by the integration */
    "channel-id": string;
    /** The ID of the conversation provided by the integration */
    "conversation-id": string;
  }) => Promise<{ success?: boolean }>;

  /**
   * Get all supported currencies
   */
  getCurrencies: (input: {
    /** Optional search term that is searched for from currency's name and/or code */
    term?: string;
  }) => Promise<{ success?: boolean; data?: ({ id?: number; code?: string; name?: string; decimal_points?: number; symbol?: string; active_flag?: boolean; is_custom_flag?: boolean })[] }>;

  /**
   * Get all archived deals
   */
  getArchivedDeals: (input: {
    /** If supplied, only deals matching the given user will be returned. However, `filter_id` and `owned_by_you` takes precedence over `user_id` when supplied. */
    user_id?: number;
    /** The ID of the filter to use */
    filter_id?: number;
    /** If supplied, only deals linked to the specified person are returned. If filter_id is provided, this is ignored. */
    person_id?: number;
    /** If supplied, only deals linked to the specified organization are returned. If filter_id is provided, this is ignored. */
    org_id?: number;
    /** If supplied, only deals linked to the specified product are returned. If filter_id is provided, this is ignored. */
    product_id?: number;
    /** If supplied, only deals in the specified pipeline are returned. If filter_id is provided, this is ignored. */
    pipeline_id?: number;
    /** If supplied, only deals in the specified stage are returned. If filter_id is provided, this is ignored. */
    stage_id?: number;
    /** Only fetch deals with a specific status. If omitted, all not deleted deals are returned. If set to deleted, deals that have been deleted up to 30 days ago will be included. */
    status?: "open" | "won" | "lost" | "deleted" | "all_not_deleted";
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
    /** The field names and sorting mode separated by a comma (`field_name_1 ASC`, `field_name_2 DESC`). Only first-level field keys are supported (no nested keys). */
    sort?: string;
    /** When supplied, only deals owned by you are returned. However, `filter_id` takes precedence over `owned_by_you` when both are supplied. */
    owned_by_you?: 0 | 1;
  }) => Promise<{ success?: boolean; data?: ({ id?: number; creator_user_id?: { id?: number; name?: string; email?: string; has_pic?: boolean; pic_hash?: string | null; active_flag?: boolean; value?: number }; user_id?: { id?: number; name?: string; email?: string; has_pic?: boolean; pic_hash?: string | null; active_flag?: boolean } & { value?: number }; person_id?: { active_flag?: boolean; name?: string; email?: ({ label?: string; value?: string; primary?: boolean })[]; phone?: ({ label?: string; value?: string; primary?: boolean })[]; owner_id?: number } & { value?: number }; org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string; active_flag?: boolean; cc_email?: string } & { value?: number } } & { stage_id?: number; title?: string; value?: number; currency?: string; add_time?: string; update_time?: string; stage_change_time?: string; active?: boolean; deleted?: boolean; is_archived?: boolean; status?: string; probability?: number | null; next_activity_date?: string; next_activity_time?: string; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null; lost_reason?: string | null; visible_to?: string; close_time?: string | null; pipeline_id?: number; won_time?: string; first_won_time?: string; lost_time?: string; products_count?: number; files_count?: number; notes_count?: number; followers_count?: number; email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; participants_count?: number; expected_close_date?: string; last_incoming_mail_time?: string; last_outgoing_mail_time?: string; label?: string; stage_order_nr?: number; person_name?: string; org_name?: string; next_activity_subject?: string; next_activity_type?: string; next_activity_duration?: string; next_activity_note?: string; formatted_value?: string; weighted_value?: number; formatted_weighted_value?: string; weighted_value_currency?: string; rotten_time?: string | null; owner_name?: string; cc_email?: string; org_hidden?: boolean; person_hidden?: boolean; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; arr?: number | null; mrr?: number | null; acv?: number | null; arr_currency?: string | null; mrr_currency?: string | null; acv_currency?: string | null })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean }; related_objects?: { user?: { USER_ID?: { id?: number; name?: string; email?: string; has_pic?: number; pic_hash?: string | null; active_flag?: boolean } & { [key: string]: unknown } }; organization?: { ORGANIZATION_ID?: { active_flag?: boolean } & { id?: number } & { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } }; person?: { PERSON_ID?: { active_flag?: boolean } & { id?: number; name?: string; email?: ({ label?: string; value?: string; primary?: boolean })[]; phone?: ({ label?: string; value?: string; primary?: boolean })[]; owner_id?: number } } } }>;

  /**
   * Get deals summary
   */
  getDealsSummary: (input: {
    /** Only fetch deals with a specific status. open = Open, won = Won, lost = Lost. */
    status?: "open" | "won" | "lost";
    /** <code>user_id</code> will not be considered. Only deals matching the given filter will be returned. */
    filter_id?: number;
    /** Only deals matching the given user will be returned. `user_id` will not be considered if you use `filter_id`. */
    user_id?: number;
    /** Only deals within the given pipeline will be returned */
    pipeline_id?: number;
    /** Only deals within the given stage will be returned */
    stage_id?: number;
  }) => Promise<{ success?: boolean; data?: { values_total?: { value?: number; count?: number; value_converted?: number; value_formatted?: string; value_converted_formatted?: string }; weighted_values_total?: { value?: number; count?: number; value_formatted?: string }; total_count?: number; total_currency_converted_value?: number; total_weighted_currency_converted_value?: number; total_currency_converted_value_formatted?: string; total_weighted_currency_converted_value_formatted?: string } }>;

  /**
   * Get archived deals summary
   */
  getArchivedDealsSummary: (input: {
    /** Only fetch deals with a specific status. open = Open, won = Won, lost = Lost. */
    status?: "open" | "won" | "lost";
    /** <code>user_id</code> will not be considered. Only deals matching the given filter will be returned. */
    filter_id?: number;
    /** Only deals matching the given user will be returned. `user_id` will not be considered if you use `filter_id`. */
    user_id?: number;
    /** Only deals within the given pipeline will be returned */
    pipeline_id?: number;
    /** Only deals within the given stage will be returned */
    stage_id?: number;
  }) => Promise<{ success?: boolean; data?: { values_total?: { value?: number; count?: number; value_converted?: number; value_formatted?: string; value_converted_formatted?: string }; weighted_values_total?: { value?: number; count?: number; value_formatted?: string }; total_count?: number; total_currency_converted_value?: number; total_weighted_currency_converted_value?: number; total_currency_converted_value_formatted?: string; total_weighted_currency_converted_value_formatted?: string } }>;

  /**
   * Get deals timeline
   */
  getDealsTimeline: (input: {
    /** The date when the first interval starts. Format: YYYY-MM-DD. */
    start_date: string;
    /** The type of the interval<table><tr><th>Value</th><th>Description</th></tr><tr><td>`day`</td><td>Day</td></tr><tr><td>`week`</td><td>A full week (7 days) starting from `start_date`</td></tr><tr><td>`month`</td><td>A full month (depending on the number of days in given month) starting from `start_date`</td></tr><tr><td>`quarter`</td><td>A full quarter (3 months) starting from `start_date`</td></tr></table> */
    interval: "day" | "week" | "month" | "quarter";
    /** The number of given intervals, starting from `start_date`, to fetch. E.g. 3 (months). */
    amount: number;
    /** The date field key which deals will be retrieved from */
    field_key: string;
    /** If supplied, only deals matching the given user will be returned */
    user_id?: number;
    /** If supplied, only deals matching the given pipeline will be returned */
    pipeline_id?: number;
    /** If supplied, only deals matching the given filter will be returned */
    filter_id?: number;
    /** Whether to exclude deals list (1) or not (0). Note that when deals are excluded, the timeline summary (counts and values) is still returned. */
    exclude_deals?: 0 | 1;
    /** The 3-letter currency code of any of the supported currencies. When supplied, `totals_converted` is returned per each interval which contains the currency-converted total amounts in the given currency. You may also set this parameter to `default_currency` in which case the user's default currency is used. */
    totals_convert_currency?: string;
  }) => Promise<{ success?: boolean; data?: { period_start?: string; period_end?: string; deals?: ({ id?: number; creator_user_id?: number; user_id?: number; person_id?: number; org_id?: number } & { stage_id?: number; title?: string; value?: number; currency?: string; add_time?: string; update_time?: string; stage_change_time?: string; active?: boolean; deleted?: boolean; is_archived?: boolean; status?: string; probability?: number | null; next_activity_date?: string; next_activity_time?: string; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null; lost_reason?: string | null; visible_to?: string; close_time?: string | null; pipeline_id?: number; won_time?: string; first_won_time?: string; lost_time?: string; products_count?: number; files_count?: number; notes_count?: number; followers_count?: number; email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; participants_count?: number; expected_close_date?: string; last_incoming_mail_time?: string; last_outgoing_mail_time?: string; label?: string; stage_order_nr?: number; person_name?: string; org_name?: string; next_activity_subject?: string; next_activity_type?: string; next_activity_duration?: string; next_activity_note?: string; formatted_value?: string; weighted_value?: number; formatted_weighted_value?: string; weighted_value_currency?: string; rotten_time?: string | null; owner_name?: string; cc_email?: string; org_hidden?: boolean; person_hidden?: boolean; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; arr?: number | null; mrr?: number | null; acv?: number | null; arr_currency?: string | null; mrr_currency?: string | null; acv_currency?: string | null })[]; totals?: { count?: number; values?: { [key: string]: unknown }; weighted_values?: { [key: string]: unknown }; open_count?: number; open_values?: { [key: string]: unknown }; weighted_open_values?: { [key: string]: unknown }; won_count?: number; won_values?: { [key: string]: unknown } } } }>;

  /**
   * Get archived deals timeline
   */
  getArchivedDealsTimeline: (input: {
    /** The date when the first interval starts. Format: YYYY-MM-DD. */
    start_date: string;
    /** The type of the interval<table><tr><th>Value</th><th>Description</th></tr><tr><td>`day`</td><td>Day</td></tr><tr><td>`week`</td><td>A full week (7 days) starting from `start_date`</td></tr><tr><td>`month`</td><td>A full month (depending on the number of days in given month) starting from `start_date`</td></tr><tr><td>`quarter`</td><td>A full quarter (3 months) starting from `start_date`</td></tr></table> */
    interval: "day" | "week" | "month" | "quarter";
    /** The number of given intervals, starting from `start_date`, to fetch. E.g. 3 (months). */
    amount: number;
    /** The date field key which deals will be retrieved from */
    field_key: string;
    /** If supplied, only deals matching the given user will be returned */
    user_id?: number;
    /** If supplied, only deals matching the given pipeline will be returned */
    pipeline_id?: number;
    /** If supplied, only deals matching the given filter will be returned */
    filter_id?: number;
    /** Whether to exclude deals list (1) or not (0). Note that when deals are excluded, the timeline summary (counts and values) is still returned. */
    exclude_deals?: 0 | 1;
    /** The 3-letter currency code of any of the supported currencies. When supplied, `totals_converted` is returned per each interval which contains the currency-converted total amounts in the given currency. You may also set this parameter to `default_currency` in which case the user's default currency is used. */
    totals_convert_currency?: string;
  }) => Promise<{ success?: boolean; data?: { period_start?: string; period_end?: string; deals?: ({ id?: number; creator_user_id?: number; user_id?: number; person_id?: number; org_id?: number } & { stage_id?: number; title?: string; value?: number; currency?: string; add_time?: string; update_time?: string; stage_change_time?: string; active?: boolean; deleted?: boolean; is_archived?: boolean; status?: string; probability?: number | null; next_activity_date?: string; next_activity_time?: string; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null; lost_reason?: string | null; visible_to?: string; close_time?: string | null; pipeline_id?: number; won_time?: string; first_won_time?: string; lost_time?: string; products_count?: number; files_count?: number; notes_count?: number; followers_count?: number; email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; participants_count?: number; expected_close_date?: string; last_incoming_mail_time?: string; last_outgoing_mail_time?: string; label?: string; stage_order_nr?: number; person_name?: string; org_name?: string; next_activity_subject?: string; next_activity_type?: string; next_activity_duration?: string; next_activity_note?: string; formatted_value?: string; weighted_value?: number; formatted_weighted_value?: string; weighted_value_currency?: string; rotten_time?: string | null; owner_name?: string; cc_email?: string; org_hidden?: boolean; person_hidden?: boolean; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; arr?: number | null; mrr?: number | null; acv?: number | null; arr_currency?: string | null; mrr_currency?: string | null; acv_currency?: string | null })[]; totals?: { count?: number; values?: { [key: string]: unknown }; weighted_values?: { [key: string]: unknown }; open_count?: number; open_values?: { [key: string]: unknown }; weighted_open_values?: { [key: string]: unknown }; won_count?: number; won_values?: { [key: string]: unknown } } } }>;

  /**
   * List updates about deal field values
   */
  getDealChangelog: (input: {
    /** The ID of the deal */
    id: number;
    /** For pagination, the marker (an opaque string value) representing the first item on the next page */
    cursor?: string;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ field_key?: string; old_value?: string | null; new_value?: string | null; actor_user_id?: number; time?: string; change_source?: string | null; change_source_user_agent?: string | null; is_bulk_update_flag?: boolean })[]; additional_data?: { next_cursor?: string } }>;

  /**
   * Duplicate deal
   */
  duplicateDeal: (input: {
    /** The ID of the deal */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; creator_user_id?: number; user_id?: number; person_id?: number; org_id?: number } & { stage_id?: number; title?: string; value?: number; currency?: string; add_time?: string; update_time?: string; stage_change_time?: string; active?: boolean; deleted?: boolean; is_archived?: boolean; status?: string; probability?: number | null; next_activity_date?: string; next_activity_time?: string; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null; lost_reason?: string | null; visible_to?: string; close_time?: string | null; pipeline_id?: number; won_time?: string; first_won_time?: string; lost_time?: string; products_count?: number; files_count?: number; notes_count?: number; followers_count?: number; email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; participants_count?: number; expected_close_date?: string; last_incoming_mail_time?: string; last_outgoing_mail_time?: string; label?: string; stage_order_nr?: number; person_name?: string; org_name?: string; next_activity_subject?: string; next_activity_type?: string; next_activity_duration?: string; next_activity_note?: string; formatted_value?: string; weighted_value?: number; formatted_weighted_value?: string; weighted_value_currency?: string; rotten_time?: string | null; owner_name?: string; cc_email?: string; org_hidden?: boolean; person_hidden?: boolean; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; arr?: number | null; mrr?: number | null; acv?: number | null; arr_currency?: string | null; mrr_currency?: string | null; acv_currency?: string | null } }>;

  /**
   * List files attached to a deal
   */
  getDealFiles: (input: {
    /** The ID of the deal */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page. Please note that a maximum value of 100 is allowed. */
    limit?: number;
    /** Supported fields: `id`, `update_time` */
    sort?: string;
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number; user_id?: number; deal_id?: number; person_id?: number; org_id?: number; product_id?: number; activity_id?: number; lead_id?: string; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; cid?: string; s3_bucket?: string; mail_message_id?: string; mail_template_id?: string; deal_name?: string; person_name?: string; org_name?: string; product_name?: string; lead_name?: string; url?: string; name?: string; description?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * List updates about a deal
   */
  getDealUpdates: (input: {
    /** The ID of the deal */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
    /** Whether to show custom field updates or not. 1 = Include custom field changes. If omitted returns changes without custom field updates. */
    all_changes?: string;
    /** A comma-separated string for filtering out item specific updates. (Possible values - call, activity, plannedActivity, change, note, deal, file, dealChange, personChange, organizationChange, follower, dealFollower, personFollower, organizationFollower, participant, comment, mailMessage, mailMessageWithAttachment, invoice, document, marketing_campaign_stat, marketing_status_change). */
    items?: string;
  }) => Promise<{ success?: boolean } & { data?: ({ object?: string; timestamp?: string; data?: { [key: string]: unknown } })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean }; related_objects?: { deal?: { DEAL_ID?: { id?: number; title?: string; status?: string; value?: number; currency?: string; stage_id?: number; pipeline_id?: number } }; organization?: { ORGANIZATION_ID?: { id?: number } & { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } }; user?: { USER_ID?: { id?: number; name?: string; email?: string; has_pic?: number; pic_hash?: string | null; active_flag?: boolean } & { [key: string]: unknown } }; person?: { PERSON_ID?: { active_flag?: boolean } & { id?: number; name?: string; email?: ({ label?: string; value?: string; primary?: boolean })[]; phone?: ({ label?: string; value?: string; primary?: boolean })[]; owner_id?: number } } } }>;

  /**
   * List updates about participants of a deal
   */
  getDealParticipantsChangelog: (input: {
    /** The ID of the deal */
    id: number;
    /** Items shown per page */
    limit?: number;
    /** For pagination, the marker (an opaque string value) representing the first item on the next page */
    cursor?: string;
  }) => Promise<{ success?: boolean; data?: ({ actor_user_id?: number; person_id?: number; action?: string; time?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * List followers of a deal
   */
  getDealFollowers: (input: {
    /** The ID of the deal */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: ({ user_id?: number; id?: number; deal_id?: number; add_time?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Add a follower to a deal
   */
  addDealFollower: (input: {
    /** The ID of the user */
    user_id: number;
    /** The ID of the deal */
    id: number;
  }) => Promise<{ success?: boolean; data?: { user_id?: number; id?: number; deal_id?: number; add_time?: string } }>;

  /**
   * Delete a follower from a deal
   */
  deleteDealFollower: (input: {
    /** The ID of the deal */
    id: number;
    /** The ID of the relationship between the follower and the deal */
    follower_id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } }>;

  /**
   * List mail messages associated with a deal
   */
  getDealMailMessages: (input: {
    /** The ID of the deal */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ object?: string; timestamp?: string; data?: { id?: number; from?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; to?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; cc?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; bcc?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; body_url?: string; account_id?: string; user_id?: number; mail_thread_id?: number; subject?: string; snippet?: string; mail_tracking_status?: "opened" | "not opened" | null; mail_link_tracking_enabled_flag?: 0 | 1; read_flag?: 0 | 1; draft?: string; draft_flag?: 0 | 1; synced_flag?: 0 | 1; deleted_flag?: 0 | 1; has_body_flag?: 0 | 1; sent_flag?: 0 | 1; sent_from_pipedrive_flag?: 0 | 1; smart_bcc_flag?: 0 | 1; message_time?: string; add_time?: string; update_time?: string; has_attachments_flag?: 0 | 1; has_inline_attachments_flag?: 0 | 1; has_real_attachments_flag?: 0 | 1 } & { nylas_id?: string; s3_bucket?: string; s3_bucket_path?: string; external_deleted_flag?: boolean; mua_message_id?: string; template_id?: number; timestamp?: string; item_type?: string; company_id?: number } })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Merge two deals
   */
  mergeDeals: (input: {
    /** The ID of the deal that the deal will be merged with */
    merge_with_id: number;
    /** The ID of the deal */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; creator_user_id?: number; user_id?: number; person_id?: number; org_id?: number } & { stage_id?: number; title?: string; value?: number; currency?: string; add_time?: string; update_time?: string; stage_change_time?: string; active?: boolean; deleted?: boolean; is_archived?: boolean; status?: string; probability?: number | null; next_activity_date?: string; next_activity_time?: string; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null; lost_reason?: string | null; visible_to?: string; close_time?: string | null; pipeline_id?: number; won_time?: string; first_won_time?: string; lost_time?: string; products_count?: number; files_count?: number; notes_count?: number; followers_count?: number; email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; participants_count?: number; expected_close_date?: string; last_incoming_mail_time?: string; last_outgoing_mail_time?: string; label?: string; stage_order_nr?: number; person_name?: string; org_name?: string; next_activity_subject?: string; next_activity_type?: string; next_activity_duration?: string; next_activity_note?: string; formatted_value?: string; weighted_value?: number; formatted_weighted_value?: string; weighted_value_currency?: string; rotten_time?: string | null; owner_name?: string; cc_email?: string; org_hidden?: boolean; person_hidden?: boolean; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; arr?: number | null; mrr?: number | null; acv?: number | null; arr_currency?: string | null; mrr_currency?: string | null; acv_currency?: string | null } & { merge_what_id?: number } }>;

  /**
   * List participants of a deal
   */
  getDealParticipants: (input: {
    /** The ID of the deal */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean; data?: ({ id?: number; person_id?: { active_flag?: boolean; name?: string; email?: ({ value?: string; primary?: boolean; label?: string })[]; phone?: ({ value?: string; primary?: boolean; label?: string })[]; owner_id?: number; company_id?: number; value?: number }; add_time?: string; active_flag?: boolean; related_item_data?: { deal_id?: number; title?: string }; person?: { id?: number; company_id?: number; active_flag?: boolean; phone?: ({ value?: string; primary?: boolean; label?: string })[]; email?: ({ value?: string; primary?: boolean; label?: string })[]; first_char?: string; add_time?: string; update_time?: string; visible_to?: string; picture_id?: { id?: number; item_type?: string; item_id?: number; active_flag?: boolean; add_time?: string; update_time?: string; added_by_user_id?: number; pictures?: { "128"?: string; "512"?: string } } | null; label?: number | null; label_ids?: (number)[]; org_name?: string | null; owner_name?: string; cc_email?: string | null } & { owner_id?: { id?: number; name?: string; email?: string; has_pic?: number; pic_hash?: string | null; active_flag?: boolean } & { value?: number }; org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null; label_ids?: (number)[]; value?: number; active_flag?: boolean } | null } & { name?: string; first_name?: string; last_name?: string | null } & { email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; files_count?: number; notes_count?: number; followers_count?: number } & { last_incoming_mail_time?: string | null; last_outgoing_mail_time?: string | null } & { open_deals_count?: number; related_open_deals_count?: number; closed_deals_count?: number; related_closed_deals_count?: number; won_deals_count?: number; related_won_deals_count?: number; lost_deals_count?: number; related_lost_deals_count?: number } & { next_activity_date?: string | null; next_activity_time?: string | null; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null }; added_by_user_id?: { success?: boolean } & { data?: { id?: number; name?: string; default_currency?: string; locale?: string; lang?: number; email?: string; phone?: string | null; activated?: boolean; last_login?: string; created?: string; modified?: string | null; has_created_company?: boolean; access?: ({ app?: "global" | "sales" | "campaigns" | "projects" | "account_settings" | "partnership"; admin?: boolean; permission_set_id?: string })[]; active_flag?: boolean; timezone_name?: string; timezone_offset?: string; role_id?: number; icon_url?: string | null; is_you?: boolean; is_deleted?: boolean } }; related_item_type?: string; related_item_id?: number })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean }; related_objects?: { user?: { USER_ID?: { id?: number; name?: string; email?: string; has_pic?: number; pic_hash?: string | null; active_flag?: boolean } & { [key: string]: unknown } }; organization?: { ORGANIZATION_ID?: { active_flag?: boolean } & { id?: number } & { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } }; person?: { PERSON_ID?: { active_flag?: boolean } & { id?: number; name?: string; email?: ({ label?: string; value?: string; primary?: boolean })[]; phone?: ({ label?: string; value?: string; primary?: boolean })[]; owner_id?: number } } } }>;

  /**
   * Add a participant to a deal
   */
  addDealParticipant: (input: {
    /** The ID of the person */
    person_id: number;
    /** The ID of the deal */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; person_id?: { active_flag?: boolean; name?: string; email?: ({ value?: string; primary?: boolean; label?: string })[]; phone?: ({ value?: string; primary?: boolean; label?: string })[]; owner_id?: number; company_id?: number; value?: number }; add_time?: string; active_flag?: boolean; related_item_data?: { deal_id?: number; title?: string }; person?: { id?: number; company_id?: number; active_flag?: boolean; phone?: ({ value?: string; primary?: boolean; label?: string })[]; email?: ({ value?: string; primary?: boolean; label?: string })[]; first_char?: string; add_time?: string; update_time?: string; visible_to?: string; picture_id?: { id?: number; item_type?: string; item_id?: number; active_flag?: boolean; add_time?: string; update_time?: string; added_by_user_id?: number; pictures?: { "128"?: string; "512"?: string } } | null; label?: number | null; label_ids?: (number)[]; org_name?: string | null; owner_name?: string; cc_email?: string | null } & { owner_id?: { id?: number; name?: string; email?: string; has_pic?: number; pic_hash?: string | null; active_flag?: boolean } & { value?: number }; org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null; label_ids?: (number)[]; value?: number; active_flag?: boolean } | null } & { name?: string; first_name?: string; last_name?: string | null } & { email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; files_count?: number; notes_count?: number; followers_count?: number } & { last_incoming_mail_time?: string | null; last_outgoing_mail_time?: string | null } & { open_deals_count?: number; related_open_deals_count?: number; closed_deals_count?: number; related_closed_deals_count?: number; won_deals_count?: number; related_won_deals_count?: number; lost_deals_count?: number; related_lost_deals_count?: number } & { next_activity_date?: string | null; next_activity_time?: string | null; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null }; added_by_user_id?: { success?: boolean } & { data?: { id?: number; name?: string; default_currency?: string; locale?: string; lang?: number; email?: string; phone?: string | null; activated?: boolean; last_login?: string; created?: string; modified?: string | null; has_created_company?: boolean; access?: ({ app?: "global" | "sales" | "campaigns" | "projects" | "account_settings" | "partnership"; admin?: boolean; permission_set_id?: string })[]; active_flag?: boolean; timezone_name?: string; timezone_offset?: string; role_id?: number; icon_url?: string | null; is_you?: boolean; is_deleted?: boolean } }; related_item_type?: string; related_item_id?: number }; related_objects?: { user?: { USER_ID?: { id?: number; name?: string; email?: string; has_pic?: number; pic_hash?: string | null; active_flag?: boolean } & { [key: string]: unknown } }; person?: { PERSON_ID?: { active_flag?: boolean } & { id?: number; name?: string; email?: ({ label?: string; value?: string; primary?: boolean })[]; phone?: ({ label?: string; value?: string; primary?: boolean })[]; owner_id?: number } } } }>;

  /**
   * Delete a participant from a deal
   */
  deleteDealParticipant: (input: {
    /** The ID of the deal */
    id: number;
    /** The ID of the participant of the deal */
    deal_participant_id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } }>;

  /**
   * List permitted users
   */
  getDealUsers: (input: {
    /** The ID of the deal */
    id: number;
  }) => Promise<{ success?: boolean }>;

  /**
   * Get all deal fields
   */
  getDealFields: (input: {
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & unknown & { data?: ({ id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Add a new deal field
   */
  addDealField: (input: {
    /** The name of the field */
    name: string;
    /** When `field_type` is either set or enum, possible options must be supplied as a JSON-encoded sequential array of objects. Example: `[{"label":"New Item"}]` */
    options?: ({ [key: string]: unknown })[];
    /** Whether the field is available in the 'add new' modal or not (both in the web and mobile app) */
    add_visible_flag?: boolean;
    /** The type of the field<table><tr><th>Value</th><th>Description</th></tr><tr><td>`address`</td><td>Address field</td></tr><tr><td>`date`</td><td>Date (format YYYY-MM-DD)</td></tr><tr><td>`daterange`</td><td>Date-range field (has a start date and end date value, both YYYY-MM-DD)</td></tr><tr><td>`double`</td><td>Numeric value</td></tr><tr><td>`enum`</td><td>Options field with a single possible chosen option</td></tr><tr></tr><tr><td>`monetary`</td><td>Monetary field (has a numeric value and a currency value)</td></tr><tr><td>`org`</td><td>Organization field (contains an organization ID which is stored on the same account)</td></tr><tr><td>`people`</td><td>Person field (contains a person ID which is stored on the same account)</td></tr><tr><td>`phone`</td><td>Phone field (up to 255 numbers and/or characters)</td></tr><tr><td>`set`</td><td>Options field with a possibility of having multiple chosen options</td></tr><tr><td>`text`</td><td>Long text (up to 65k characters)</td></tr><tr><td>`time`</td><td>Time field (format HH:MM:SS)</td></tr><tr><td>`timerange`</td><td>Time-range field (has a start time and end time value, both HH:MM:SS)</td></tr><tr><td>`user`</td><td>User field (contains a user ID of another Pipedrive user)</td></tr><tr><td>`varchar`</td><td>Text (up to 255 characters)</td></tr><tr><td>`varchar_auto`</td><td>Autocomplete text (up to 255 characters)</td></tr><tr><td>`visible_to`</td><td>System field that keeps item's visibility setting</td></tr></table> */
    field_type: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to";
  }) => Promise<{ success?: boolean } & { data?: { id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" } }>;

  /**
   * Delete multiple deal fields in bulk
   */
  deleteDealFields: (input: {
    /** The comma-separated field IDs to delete */
    ids: string;
  }) => Promise<{ success?: boolean } & { data?: { id?: (number)[] } }>;

  /**
   * Get one deal field
   */
  getDealField: (input: {
    /** The ID of the field */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" } }>;

  /**
   * Delete a deal field
   */
  deleteDealField: (input: {
    /** The ID of the field */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * Update a deal field
   */
  updateDealField: (input: {
    /** The name of the field */
    name?: string;
    /** When `field_type` is either set or enum, possible options must be supplied as a JSON-encoded sequential array of objects. All active items must be supplied and already existing items must have their ID supplied. New items only require a label. Example: `[{"id":123,"label":"Existing Item"},{"label":"New Item"}]` */
    options?: ({ [key: string]: unknown })[];
    /** Whether the field is available in 'add new' modal or not (both in web and mobile app) */
    add_visible_flag?: boolean;
    /** The ID of the field */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" } }>;

  /**
   * Get all files
   */
  getFiles: (input: {
    /** Pagination start */
    start?: number;
    /** Items shown per page. Please note that a maximum value of 100 is allowed. */
    limit?: number;
    /** Supported fields: `id`, `update_time` */
    sort?: string;
  }) => Promise<{ success?: boolean; data?: ({ id?: number; user_id?: number; deal_id?: number; person_id?: number; org_id?: number; product_id?: number; activity_id?: number; lead_id?: string; project_id?: number; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; cid?: string; s3_bucket?: string; mail_message_id?: string; mail_template_id?: string; deal_name?: string; person_name?: string; org_name?: string; product_name?: string; lead_name?: string; project_name?: string; url?: string; name?: string; description?: string })[]; additional_data?: { pagination?: { start?: number; limit?: number; more_items_in_collection?: boolean } & { next_start?: number } } }>;

  /**
   * Add file
   */
  addFile: (input: {
    /** A single file, supplied in the multipart/form-data encoding and contained within the given boundaries */
    file: string;
    /** The ID of the deal to associate file(s) with */
    deal_id?: number;
    /** The ID of the person to associate file(s) with */
    person_id?: number;
    /** The ID of the organization to associate file(s) with */
    org_id?: number;
    /** The ID of the product to associate file(s) with */
    product_id?: number;
    /** The ID of the activity to associate file(s) with */
    activity_id?: number;
    /** The ID of the lead to associate file(s) with */
    lead_id?: string;
    /** The ID of the project to associate file(s) with */
    project_id?: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; user_id?: number; deal_id?: number; person_id?: number; org_id?: number; product_id?: number; activity_id?: number; lead_id?: string; project_id?: number; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; cid?: string; s3_bucket?: string; mail_message_id?: string; mail_template_id?: string; deal_name?: string; person_name?: string; org_name?: string; product_name?: string; lead_name?: string; project_name?: string; url?: string; name?: string; description?: string } }>;

  /**
   * Create a remote file and link it to an item
   */
  addFileAndLinkIt: (input: {
    /** The file type */
    file_type: "gdoc" | "gslides" | "gsheet" | "gform" | "gdraw";
    /** The title of the file */
    title: string;
    /** The item type */
    item_type: "deal" | "organization" | "person";
    /** The ID of the item to associate the file with */
    item_id: number;
    /** The location type to send the file to. Only `googledrive` is supported at the moment. */
    remote_location: "googledrive";
  }) => Promise<{ success?: boolean; data?: { id?: number; user_id?: number; deal_id?: number; person_id?: number; org_id?: number; product_id?: number; activity_id?: number; lead_id?: string; project_id?: number; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; cid?: string; s3_bucket?: string; mail_message_id?: string; mail_template_id?: string; deal_name?: string; person_name?: string; org_name?: string; product_name?: string; lead_name?: string; project_name?: string; url?: string; name?: string; description?: string } }>;

  /**
   * Link a remote file to an item
   */
  linkFileToItem: (input: {
    /** The item type */
    item_type: "deal" | "organization" | "person";
    /** The ID of the item to associate the file with */
    item_id: number;
    /** The remote item ID */
    remote_id: string;
    /** The location type to send the file to. Only `googledrive` is supported at the moment. */
    remote_location: "googledrive";
  }) => Promise<{ success?: boolean; data?: { id?: number; user_id?: number; deal_id?: number; person_id?: number; org_id?: number; product_id?: number; activity_id?: number; lead_id?: string; project_id?: number; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; cid?: string; s3_bucket?: string; mail_message_id?: string; mail_template_id?: string; deal_name?: string; person_name?: string; org_name?: string; product_name?: string; lead_name?: string; project_name?: string; url?: string; name?: string; description?: string } }>;

  /**
   * Delete a file
   */
  deleteFile: (input: {
    /** The ID of the file */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } }>;

  /**
   * Get one file
   */
  getFile: (input: {
    /** The ID of the file */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; user_id?: number; deal_id?: number; person_id?: number; org_id?: number; product_id?: number; activity_id?: number; lead_id?: string; project_id?: number; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; cid?: string; s3_bucket?: string; mail_message_id?: string; mail_template_id?: string; deal_name?: string; person_name?: string; org_name?: string; product_name?: string; lead_name?: string; project_name?: string; url?: string; name?: string; description?: string } }>;

  /**
   * Update file details
   */
  updateFile: (input: {
    /** The visible name of the file */
    name?: string;
    /** The description of the file */
    description?: string;
    /** The ID of the file */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; user_id?: number; deal_id?: number; person_id?: number; org_id?: number; product_id?: number; activity_id?: number; lead_id?: string; project_id?: number; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; cid?: string; s3_bucket?: string; mail_message_id?: string; mail_template_id?: string; deal_name?: string; person_name?: string; org_name?: string; product_name?: string; lead_name?: string; project_name?: string; url?: string; name?: string; description?: string } }>;

  /**
   * Download one file
   */
  downloadFile: (input: {
    /** The ID of the file */
    id: number;
  }) => Promise<string>;

  /**
   * Delete multiple filters in bulk
   */
  deleteFilters: (input: {
    /** The comma-separated filter IDs to delete */
    ids: string;
  }) => Promise<{ success?: boolean } & { data?: { id?: (number)[] } }>;

  /**
   * Get all filters
   */
  getFilters: (input: {
    /** The types of filters to fetch */
    type?: "deals" | "leads" | "org" | "people" | "products" | "activity" | "projects";
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number; name?: string; filter_code?: string | null; is_editable?: boolean; active_flag?: boolean; type?: "deals" | "leads" | "org" | "people" | "products" | "activity" | "projects"; temporary_flag?: boolean | null; user_id?: number; add_time?: string; update_time?: string | null; visible_to?: "1" | "3" | "5" | "7"; last_used_time?: string | null; custom_view_id?: number | null })[] }>;

  /**
   * Add a new filter
   */
  addFilter: (input: {
    /** The name of the filter */
    name: string;
    /** The conditions of the filter as a JSON object. Please note that a maximum of 16 conditions is allowed per filter and `date` values must be supplied in the `YYYY-MM-DD` format. It requires a minimum structure as follows: `{"glue":"and","conditions":[{"glue":"and","conditions": [CONDITION_OBJECTS]},{"glue":"or","conditions":[CONDITION_OBJECTS]}]}`. Replace `CONDITION_OBJECTS` with JSON objects of the following structure: `{"object":"","field_id":"", "operator":"","value":"", "extra_value":""}` or leave the array empty. Depending on the object type you should use another API endpoint to get `field_id`. There are five types of objects you can choose from: `"person"`, `"deal"`, `"organization"`, `"product"`, `"activity"` and you can use these types of operators depending on what type of a field you have: `"IS NOT NULL"`, `"IS NULL"`, `"<="`, `">="`, `"<"`, `">"`, `"!="`, `"="`, `"LIKE '$%'"`, `"LIKE '%$%'"`, `"NOT LIKE '$%'"`. To get a better understanding of how filters work try creating them directly from the Pipedrive application. */
    conditions: { [key: string]: unknown };
    /** The type of filter to create */
    type: "deals" | "leads" | "org" | "people" | "products" | "activity" | "projects";
    /** If set to `true`, each condition in the response includes a `field_code` field identifying the field by its code name */
    include_field_code?: boolean;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; name?: string; filter_code?: string | null; is_editable?: boolean; active_flag?: boolean; type?: "deals" | "leads" | "org" | "people" | "products" | "activity" | "projects"; temporary_flag?: boolean | null; user_id?: number; add_time?: string; update_time?: string | null; visible_to?: "1" | "3" | "5" | "7"; last_used_time?: string | null; custom_view_id?: number | null; conditions?: { glue?: "and"; conditions?: ({ glue?: "and" | "or"; conditions?: ({ object?: string; field_id?: string; operator?: string; value?: string | null; extra_value?: string | null; json_value_flag?: boolean; field_code?: string | null })[] })[] } } }>;

  /**
   * Get all filter helpers
   */
  getFilterHelpers: () => Promise<{ [key: string]: unknown }>;

  /**
   * Delete a filter
   */
  deleteFilter: (input: {
    /** The ID of the filter */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * Get one filter
   */
  getFilter: (input: {
    /** The ID of the filter */
    id: number;
    /** If set to `true`, each condition in the response includes a `field_code` field identifying the field by its code name */
    include_field_code?: boolean;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; name?: string; filter_code?: string | null; is_editable?: boolean; active_flag?: boolean; type?: "deals" | "leads" | "org" | "people" | "products" | "activity" | "projects"; temporary_flag?: boolean | null; user_id?: number; add_time?: string; update_time?: string | null; visible_to?: "1" | "3" | "5" | "7"; last_used_time?: string | null; custom_view_id?: number | null; conditions?: { glue?: "and"; conditions?: ({ glue?: "and" | "or"; conditions?: ({ object?: string; field_id?: string; operator?: string; value?: string | null; extra_value?: string | null; json_value_flag?: boolean; field_code?: string | null })[] })[] } } }>;

  /**
   * Update filter
   */
  updateFilter: (input: {
    /** The name of the filter */
    name?: string;
    /** The conditions of the filter as a JSON object. Please note that a maximum of 16 conditions is allowed per filter and `date` values must be supplied in the `YYYY-MM-DD` format. It requires a minimum structure as follows: `{"glue":"and","conditions":[{"glue":"and","conditions": [CONDITION_OBJECTS]},{"glue":"or","conditions":[CONDITION_OBJECTS]}]}`. Replace `CONDITION_OBJECTS` with JSON objects of the following structure: `{"object":"","field_id":"", "operator":"","value":"", "extra_value":""}` or leave the array empty. Depending on the object type you should use another API endpoint to get `field_id`. There are five types of objects you can choose from: `"person"`, `"deal"`, `"organization"`, `"product"`, `"activity"` and you can use these types of operators depending on what type of a field you have: `"IS NOT NULL"`, `"IS NULL"`, `"<="`, `">="`, `"<"`, `">"`, `"!="`, `"="`, `"LIKE '$%'"`, `"LIKE '%$%'"`, `"NOT LIKE '$%'"`. To get a better understanding of how filters work try creating them directly from the Pipedrive application. */
    conditions: { [key: string]: unknown };
    /** The ID of the filter */
    id: number;
    /** If set to `true`, each condition in the response includes a `field_code` field identifying the field by its code name */
    include_field_code?: boolean;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; name?: string; filter_code?: string | null; is_editable?: boolean; active_flag?: boolean; type?: "deals" | "leads" | "org" | "people" | "products" | "activity" | "projects"; temporary_flag?: boolean | null; user_id?: number; add_time?: string; update_time?: string | null; visible_to?: "1" | "3" | "5" | "7"; last_used_time?: string | null; custom_view_id?: number | null; conditions?: { glue?: "and"; conditions?: ({ glue?: "and" | "or"; conditions?: ({ object?: string; field_id?: string; operator?: string; value?: string | null; extra_value?: string | null; json_value_flag?: boolean; field_code?: string | null })[] })[] } } }>;

  /**
   * Add a new goal
   */
  addGoal: (input: {
    /** The title of the goal */
    title?: string;
    /** Who this goal is assigned to. It requires the following JSON structure: `{ "id": "1", "type": "person" }`. `type` can be either `person`, `company` or `team`. ID of the assignee person, company or team. */
    assignee: { [key: string]: unknown };
    /** The type of the goal. It requires the following JSON structure: `{ "name": "deals_started", "params": { "pipeline_id": [1, 2], "activity_type_id": [9] } }`. Type can be one of: `deals_won`, `deals_progressed`, `activities_completed`, `activities_added`, `deals_started` or `revenue_forecast`. `params` can include `pipeline_id`, `stage_id` or `activity_type_id`. `stage_id` is related to only `deals_progressed` type of goals and `activity_type_id` to `activities_completed` or `activities_added` types of goals. The `pipeline_id` and `activity_type_id` need to be given as an array of integers. To track the goal in all pipelines, set `pipeline_id` as `null` and similarly, to track the goal for all activities, set `activity_type_id` as `null`.” */
    type: { [key: string]: unknown };
    /** The expected outcome of the goal. Expected outcome can be tracked either by `quantity` or by `sum`. It requires the following JSON structure: `{ "target": "50", "tracking_metric": "quantity" }` or `{ "target": "50", "tracking_metric": "sum", "currency_id": 1 }`. `currency_id` should only be added to `sum` type of goals. */
    expected_outcome: { [key: string]: unknown };
    /** The date when the goal starts and ends. It requires the following JSON structure: `{ "start": "2019-01-01", "end": "2022-12-31" }`. Date in format of YYYY-MM-DD. "end" can be set to `null` for an infinite, open-ended goal. */
    duration: { [key: string]: unknown };
    /** The interval of the goal */
    interval: "weekly" | "monthly" | "quarterly" | "yearly";
  }) => Promise<{ success?: boolean; data?: { goal?: { id?: string; owner_id?: number; title?: string; type?: { name?: string; params?: { pipeline_id?: (number)[]; activity_type_id?: (number)[] } }; assignee?: { id?: number; type?: string }; interval?: string; duration?: { start?: string; end?: string }; expected_outcome?: { target?: number; tracking_metric?: string }; is_active?: boolean; report_ids?: (string)[] } } }>;

  /**
   * Find goals
   */
  getGoals: (input: {
    /** The type of the goal. If provided, everyone's goals will be returned. */
    "type.name"?: "deals_won" | "deals_progressed" | "activities_completed" | "activities_added" | "deals_started";
    /** The title of the goal */
    title?: string;
    /** Whether the goal is active or not */
    is_active?: boolean;
    /** The ID of the user who's goal to fetch. When omitted, only your goals will be returned. */
    "assignee.id"?: number;
    /** The type of the goal's assignee. If provided, everyone's goals will be returned. */
    "assignee.type"?: "person" | "company" | "team";
    /** The numeric value of the outcome. If provided, everyone's goals will be returned. */
    "expected_outcome.target"?: number;
    /** The tracking metric of the expected outcome of the goal. If provided, everyone's goals will be returned. */
    "expected_outcome.tracking_metric"?: "quantity" | "sum";
    /** The numeric ID of the goal's currency. Only applicable to goals with `expected_outcome.tracking_metric` with value `sum`. If provided, everyone's goals will be returned. */
    "expected_outcome.currency_id"?: number;
    /** An array of pipeline IDs or `null` for all pipelines. If provided, everyone's goals will be returned. */
    "type.params.pipeline_id"?: (number)[];
    /** The ID of the stage. Applicable to only `deals_progressed` type of goals. If provided, everyone's goals will be returned. */
    "type.params.stage_id"?: number;
    /** An array of IDs or `null` for all activity types. Only applicable for `activities_completed` and/or `activities_added` types of goals. If provided, everyone's goals will be returned. */
    "type.params.activity_type_id"?: (number)[];
    /** The start date of the period for which to find goals. Date in format of YYYY-MM-DD. When `period.start` is provided, `period.end` must be provided too. */
    "period.start"?: string;
    /** The end date of the period for which to find goals. Date in format of YYYY-MM-DD. */
    "period.end"?: string;
  }) => Promise<{ success?: boolean; data?: { goals?: ({ id?: string; owner_id?: number; title?: string; type?: { name?: string; params?: { pipeline_id?: (number)[]; activity_type_id?: (number)[] } }; assignee?: { id?: number; type?: string }; interval?: string; duration?: { start?: string; end?: string }; expected_outcome?: { target?: number; tracking_metric?: string }; is_active?: boolean; report_ids?: (string)[] })[] } }>;

  /**
   * Update existing goal
   */
  updateGoal: (input: {
    /** The title of the goal */
    title?: string;
    /** Who this goal is assigned to. It requires the following JSON structure: `{ "id": "1", "type": "person" }`. `type` can be either `person`, `company` or `team`. ID of the assignee person, company or team. */
    assignee?: { [key: string]: unknown };
    /** The type of the goal. It requires the following JSON structure: `{ "name": "deals_started", "params": { "pipeline_id": [1, 2], "activity_type_id": [9] } }`. Type can be one of: `deals_won`, `deals_progressed`, `activities_completed`, `activities_added`, `deals_started` or `revenue_forecast`. `params` can include `pipeline_id`, `stage_id` or `activity_type_id`. `stage_id` is related to only `deals_progressed` type of goals and `activity_type_id` to `activities_completed` or `activities_added` types of goals. The `pipeline_id` and `activity_type_id` need to be given as an array of integers. To track the goal in all pipelines, set `pipeline_id` as `null` and similarly, to track the goal for all activities, set `activity_type_id` as `null`.” */
    type?: { [key: string]: unknown };
    /** The expected outcome of the goal. Expected outcome can be tracked either by `quantity` or by `sum`. It requires the following JSON structure: `{ "target": "50", "tracking_metric": "quantity" }` or `{ "target": "50", "tracking_metric": "sum", "currency_id": 1 }`. `currency_id` should only be added to `sum` type of goals. */
    expected_outcome?: { [key: string]: unknown };
    /** The date when the goal starts and ends. It requires the following JSON structure: `{ "start": "2019-01-01", "end": "2022-12-31" }`. Date in format of YYYY-MM-DD. "end" can be set to `null` for an infinite, open-ended goal. */
    duration?: { [key: string]: unknown };
    /** The interval of the goal */
    interval?: "weekly" | "monthly" | "quarterly" | "yearly";
    /** The ID of the goal */
    id: string;
  }) => Promise<{ success?: boolean; data?: { goal?: { id?: string; owner_id?: number; title?: string; type?: { name?: string; params?: { pipeline_id?: (number)[]; activity_type_id?: (number)[] } }; assignee?: { id?: number; type?: string }; interval?: string; duration?: { start?: string; end?: string }; expected_outcome?: { target?: number; tracking_metric?: string }; is_active?: boolean; report_ids?: (string)[] } } }>;

  /**
   * Delete existing goal
   */
  deleteGoal: (input: {
    /** The ID of the goal */
    id: string;
  }) => Promise<{ success?: boolean }>;

  /**
   * Get result of a goal
   */
  getGoalResult: (input: {
    /** The ID of the goal that the results are looked for */
    id: string;
    /** The start date of the period for which to find the goal's progress. Format: YYYY-MM-DD. This date must be the same or after the goal duration start date.  */
    "period.start": string;
    /** The end date of the period for which to find the goal's progress. Format: YYYY-MM-DD. This date must be the same or before the goal duration end date.  */
    "period.end": string;
  }) => Promise<{ success?: boolean; data?: { progress?: number; goal?: { id?: string; owner_id?: number; title?: string; type?: { name?: string; params?: { pipeline_id?: (number)[]; activity_type_id?: (number)[] } }; assignee?: { id?: number; type?: string }; interval?: string; duration?: { start?: string; end?: string }; expected_outcome?: { target?: number; tracking_metric?: string }; is_active?: boolean; report_ids?: (string)[] } } }>;

  /**
   * Get all leads
   */
  getLeads: (input: {
    /** For pagination, the limit of entries to be returned. If not provided, 100 items will be returned. */
    limit?: number;
    /** For pagination, the position that represents the first result for the page */
    start?: number;
    /** If supplied, only leads matching the given user will be returned. However, `filter_id` takes precedence over `owner_id` when supplied. */
    owner_id?: number;
    /** If supplied, only leads matching the given person will be returned. However, `filter_id` takes precedence over `person_id` when supplied. */
    person_id?: number;
    /** If supplied, only leads matching the given organization will be returned. However, `filter_id` takes precedence over `organization_id` when supplied. */
    organization_id?: number;
    /** The ID of the filter to use */
    filter_id?: number;
    /** If set, only leads with an `update_time` later than or equal to this time are returned. In ISO 8601 format, e.g. 2025-01-01T10:20:00Z. */
    updated_since?: string;
    /** The field names and sorting mode separated by a comma (`field_name_1 ASC`, `field_name_2 DESC`). Only first-level field keys are supported (no nested keys). */
    sort?: "id" | "title" | "owner_id" | "creator_id" | "was_seen" | "expected_close_date" | "next_activity_id" | "add_time" | "update_time";
  }) => Promise<{ success?: boolean; data?: ({ id?: string; title?: string; owner_id?: number; creator_id?: number; label_ids?: (string)[]; person_id?: number | null; organization_id?: number | null; source_name?: string; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; source_deal_id?: number | null; is_archived?: boolean; was_seen?: boolean; value?: { amount: number; currency: string } | null; expected_close_date?: string | null; next_activity_id?: number | null; add_time?: string; update_time?: string; visible_to?: "1" | "3" | "5" | "7"; cc_email?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Add a lead
   */
  addLead: (input: {
    /** The name of the lead */
    title: string;
    /** The ID of the user which will be the owner of the created lead. If not provided, the user making the request will be used. */
    owner_id?: number;
    /** The IDs of the lead labels which will be associated with the lead */
    label_ids?: (string)[];
    /** The ID of a person which this lead will be linked to. If the person does not exist yet, it needs to be created first. This property is required unless `organization_id` is specified. */
    person_id?: number;
    /** The ID of an organization which this lead will be linked to. If the organization does not exist yet, it needs to be created first. This property is required unless `person_id` is specified. */
    organization_id?: number;
    /** The potential value of the lead represented by a JSON object: `{ "amount": 200, "currency": "EUR" }`. Both amount and currency are required. */
    value?: { amount: number; currency: string } | null;
    /** The date of when the deal which will be created from the lead is expected to be closed. In ISO 8601 format: YYYY-MM-DD. */
    expected_close_date?: string;
    /** The visibility of the lead. If omitted, the visibility will be set to the default visibility setting of this item type for the authorized user. Read more about visibility groups <a href="https://support.pipedrive.com/en/article/visibility-groups" target="_blank" rel="noopener noreferrer">here</a>.<h4>Light / Growth and Professional plans</h4><table><tr><th style="width: 40px">Value</th><th>Description</th></tr><tr><td>`1`</td><td>Owner &amp; followers</td><tr><td>`3`</td><td>Entire company</td></tr></table><h4>Premium / Ultimate plan</h4><table><tr><th style="width: 40px">Value</th><th>Description</th></tr><tr><td>`1`</td><td>Owner only</td><tr><td>`3`</td><td>Owner's visibility group</td></tr><tr><td>`5`</td><td>Owner's visibility group and sub-groups</td></tr><tr><td>`7`</td><td>Entire company</td></tr></table> */
    visible_to?: "1" | "3" | "5" | "7";
    /** A flag indicating whether the lead was seen by someone in the Pipedrive UI */
    was_seen?: boolean;
    /** The optional ID to further distinguish the origin of the lead - e.g. Which API integration created this lead. If omitted, `origin_id` will be set to null. */
    origin_id?: string | null;
    /** The ID of Marketing channel this lead was created from. Provided value must be one of the channels configured for your company. You can fetch allowed values with <a href="https://developers.pipedrive.com/docs/api/v1/DealFields#getDealField" target="_blank" rel="noopener noreferrer">GET /v1/dealFields</a>. If omitted, channel will be set to null. */
    channel?: number | null;
    /** The optional ID to further distinguish the Marketing channel. If omitted, `channel_id` will be set to null. */
    channel_id?: string | null;
  }) => Promise<{ success?: boolean; data?: { id?: string; title?: string; owner_id?: number; creator_id?: number; label_ids?: (string)[]; person_id?: number | null; organization_id?: number | null; source_name?: string; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; source_deal_id?: number | null; is_archived?: boolean; was_seen?: boolean; value?: { amount: number; currency: string } | null; expected_close_date?: string | null; next_activity_id?: number | null; add_time?: string; update_time?: string; visible_to?: "1" | "3" | "5" | "7"; cc_email?: string } }>;

  /**
   * Get all archived leads
   */
  getArchivedLeads: (input: {
    /** For pagination, the limit of entries to be returned. If not provided, 100 items will be returned. */
    limit?: number;
    /** For pagination, the position that represents the first result for the page */
    start?: number;
    /** If supplied, only leads matching the given user will be returned. However, `filter_id` takes precedence over `owner_id` when supplied. */
    owner_id?: number;
    /** If supplied, only leads matching the given person will be returned. However, `filter_id` takes precedence over `person_id` when supplied. */
    person_id?: number;
    /** If supplied, only leads matching the given organization will be returned. However, `filter_id` takes precedence over `organization_id` when supplied. */
    organization_id?: number;
    /** The ID of the filter to use */
    filter_id?: number;
    /** The field names and sorting mode separated by a comma (`field_name_1 ASC`, `field_name_2 DESC`). Only first-level field keys are supported (no nested keys). */
    sort?: "id" | "title" | "owner_id" | "creator_id" | "was_seen" | "expected_close_date" | "next_activity_id" | "add_time" | "update_time";
  }) => Promise<{ success?: boolean; data?: ({ id?: string; title?: string; owner_id?: number; creator_id?: number; label_ids?: (string)[]; person_id?: number | null; organization_id?: number | null; source_name?: string; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; source_deal_id?: number | null; is_archived?: boolean; was_seen?: boolean; value?: { amount: number; currency: string } | null; expected_close_date?: string | null; next_activity_id?: number | null; add_time?: string; update_time?: string; visible_to?: "1" | "3" | "5" | "7"; cc_email?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Get one lead
   */
  getLead: (input: {
    /** The ID of the lead */
    id: string;
  }) => Promise<{ success?: boolean; data?: { id?: string; title?: string; owner_id?: number; creator_id?: number; label_ids?: (string)[]; person_id?: number | null; organization_id?: number | null; source_name?: string; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; source_deal_id?: number | null; is_archived?: boolean; was_seen?: boolean; value?: { amount: number; currency: string } | null; expected_close_date?: string | null; next_activity_id?: number | null; add_time?: string; update_time?: string; visible_to?: "1" | "3" | "5" | "7"; cc_email?: string } }>;

  /**
   * Update a lead
   */
  updateLead: (input: {
    /** The name of the lead */
    title?: string | null;
    /** The ID of the user which will be the owner of the created lead. If not provided, the user making the request will be used. */
    owner_id?: number;
    /** The IDs of the lead labels which will be associated with the lead */
    label_ids?: (string)[];
    /** The ID of a person which this lead will be linked to. If the person does not exist yet, it needs to be created first. A lead always has to be linked to a person or organization or both.  */
    person_id?: number | null;
    /** The ID of an organization which this lead will be linked to. If the organization does not exist yet, it needs to be created first. A lead always has to be linked to a person or organization or both. */
    organization_id?: number | null;
    /** A flag indicating whether the lead is archived or not */
    is_archived?: boolean;
    /** The potential value of the lead represented by a JSON object: `{ "amount": 200, "currency": "EUR" }`. Both amount and currency are required. */
    value?: { amount: number; currency: string } | null;
    /** The date of when the deal which will be created from the lead is expected to be closed. In ISO 8601 format: YYYY-MM-DD. */
    expected_close_date?: string | null;
    /** The visibility of the lead. If omitted, the visibility will be set to the default visibility setting of this item type for the authorized user. Read more about visibility groups <a href="https://support.pipedrive.com/en/article/visibility-groups" target="_blank" rel="noopener noreferrer">here</a>.<h4>Light / Growth and Professional plans</h4><table><tr><th style="width: 40px">Value</th><th>Description</th></tr><tr><td>`1`</td><td>Owner &amp; followers</td><tr><td>`3`</td><td>Entire company</td></tr></table><h4>Premium / Ultimate plan</h4><table><tr><th style="width: 40px">Value</th><th>Description</th></tr><tr><td>`1`</td><td>Owner only</td><tr><td>`3`</td><td>Owner's visibility group</td></tr><tr><td>`5`</td><td>Owner's visibility group and sub-groups</td></tr><tr><td>`7`</td><td>Entire company</td></tr></table> */
    visible_to?: "1" | "3" | "5" | "7";
    /** A flag indicating whether the lead was seen by someone in the Pipedrive UI */
    was_seen?: boolean;
    /** The ID of Marketing channel this lead was created from. Provided value must be one of the channels configured for your company which you can fetch with <a href="https://developers.pipedrive.com/docs/api/v1/DealFields#getDealField" target="_blank" rel="noopener noreferrer">GET /v1/dealFields</a>. */
    channel?: number | null;
    /** The optional ID to further distinguish the Marketing channel. */
    channel_id?: string | null;
    /** The ID of the lead */
    id: string;
  }) => Promise<{ success?: boolean; data?: { id?: string; title?: string; owner_id?: number; creator_id?: number; label_ids?: (string)[]; person_id?: number | null; organization_id?: number | null; source_name?: string; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; source_deal_id?: number | null; is_archived?: boolean; was_seen?: boolean; value?: { amount: number; currency: string } | null; expected_close_date?: string | null; next_activity_id?: number | null; add_time?: string; update_time?: string; visible_to?: "1" | "3" | "5" | "7"; cc_email?: string } }>;

  /**
   * Delete a lead
   */
  deleteLead: (input: {
    /** The ID of the lead */
    id: string;
  }) => Promise<{ success?: boolean; data?: { id?: string } }>;

  /**
   * List permitted users
   */
  getLeadUsers: (input: {
    /** The ID of the lead */
    id: string;
  }) => Promise<{ success?: boolean } & { data?: (number)[] }>;

  /**
   * Search leads
   */
  searchLeads: (input: {
    /** The search term to look for. Minimum 2 characters (or 1 if using `exact_match`). Please note that the search term has to be URL encoded. */
    term: string;
    /** A comma-separated string array. The fields to perform the search from. Defaults to all of them. */
    fields?: "custom_fields" | "notes" | "title";
    /** When enabled, only full exact matches against the given term are returned. It is <b>not</b> case sensitive. */
    exact_match?: boolean;
    /** Will filter leads by the provided person ID. The upper limit of found leads associated with the person is 2000. */
    person_id?: number;
    /** Will filter leads by the provided organization ID. The upper limit of found leads associated with the organization is 2000. */
    organization_id?: number;
    /** Supports including optional fields in the results which are not provided by default */
    include_fields?: "lead.was_seen";
    /** Pagination start. Note that the pagination is based on main results and does not include related items when using `search_for_related_items` parameter. */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: { items?: ({ result_score?: number; item?: { id?: string; type?: string; title?: string; owner?: { id?: number }; person?: { id?: number; name?: string }; organization?: { id?: number; name?: string }; phones?: (string)[]; emails?: (string)[]; custom_fields?: (string)[]; notes?: (string)[]; value?: number; currency?: string; visible_to?: number; is_archived?: boolean } })[] }; additional_data?: { pagination?: { start?: number; limit?: number; more_items_in_collection?: boolean; next_start?: number } } }>;

  /**
   * Get all lead fields
   */
  getLeadFields: (input: {
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & unknown & { data?: ({ id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Get all lead labels
   */
  getLeadLabels: () => Promise<{ success?: boolean; data?: ({ id?: string; name?: string; color?: "blue" | "brown" | "dark-gray" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "yellow"; add_time?: string; update_time?: string })[] }>;

  /**
   * Add a lead label
   */
  addLeadLabel: (input: {
    /** The name of the lead label */
    name: string;
    /** The color of the label. Only a subset of colors can be used. */
    color: "blue" | "brown" | "dark-gray" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "yellow";
  }) => Promise<{ success?: boolean; data?: { id?: string; name?: string; color?: "blue" | "brown" | "dark-gray" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "yellow"; add_time?: string; update_time?: string } }>;

  /**
   * Update a lead label
   */
  updateLeadLabel: (input: {
    /** The name of the lead label */
    name?: string;
    /** The color of the label. Only a subset of colors can be used. */
    color?: "blue" | "brown" | "dark-gray" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "yellow";
    /** The ID of the lead label */
    id: string;
  }) => Promise<{ success?: boolean; data?: { id?: string; name?: string; color?: "blue" | "brown" | "dark-gray" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "yellow"; add_time?: string; update_time?: string } }>;

  /**
   * Delete a lead label
   */
  deleteLeadLabel: (input: {
    /** The ID of the lead label */
    id: string;
  }) => Promise<{ success?: boolean; data?: { id?: string } }>;

  /**
   * Get all lead sources
   */
  getLeadSources: () => Promise<{ success?: boolean; data?: ({ name?: string })[] }>;

  /**
   * Get all teams
   */
  getTeams: (input: {
    /** The field name to sort returned teams by */
    order_by?: "id" | "name" | "manager_id" | "active_flag";
    /** When enabled, the teams will not include IDs of member users */
    skip_users?: 0 | 1;
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number } & { name?: string; description?: string; manager_id?: number; users?: (number)[] } & { active_flag?: 0 | 1; deleted_flag?: 0 | 1 } & { add_time?: string; created_by_user_id?: number })[] }>;

  /**
   * Add a new team
   */
  addTeam: (input: {
    /** The team name */
    name: string;
    /** The team description */
    description?: string;
    /** The team manager ID */
    manager_id: number;
    /** The list of user IDs */
    users?: (number)[];
  }) => Promise<{ success?: boolean } & { data?: { id?: number } & { name?: string; description?: string; manager_id?: number; users?: (number)[] } & { active_flag?: 0 | 1; deleted_flag?: 0 | 1 } & { add_time?: string; created_by_user_id?: number } }>;

  /**
   * Get a single team
   */
  getTeam: (input: {
    /** The ID of the team */
    id: number;
    /** When enabled, the teams will not include IDs of member users */
    skip_users?: 0 | 1;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } & { name?: string; description?: string; manager_id?: number; users?: (number)[] } & { active_flag?: 0 | 1; deleted_flag?: 0 | 1 } & { add_time?: string; created_by_user_id?: number } }>;

  /**
   * Update a team
   */
  updateTeam: (input: {
    /** The team name */
    name?: string;
    /** The team description */
    description?: string;
    /** The team manager ID */
    manager_id?: number;
    /** The list of user IDs */
    users?: (number)[];
    /** Flag that indicates whether the team is active */
    active_flag?: 0 | 1;
    /** Flag that indicates whether the team is deleted */
    deleted_flag?: 0 | 1;
    /** The ID of the team */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } & { name?: string; description?: string; manager_id?: number; users?: (number)[] } & { active_flag?: 0 | 1; deleted_flag?: 0 | 1 } & { add_time?: string; created_by_user_id?: number } }>;

  /**
   * Get all users in a team
   */
  getTeamUsers: (input: {
    /** The ID of the team */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: (number)[] }>;

  /**
   * Add users to a team
   */
  addTeamUser: (input: {
    /** The list of user IDs */
    users: (number)[];
    /** The ID of the team */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: (number)[] }>;

  /**
   * Delete users from a team
   */
  deleteTeamUser: (input: {
    /** The list of user IDs */
    users: (number)[];
    /** The ID of the team */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: (number)[] }>;

  /**
   * Get all teams of a user
   */
  getUserTeams: (input: {
    /** The ID of the user */
    id: number;
    /** The field name to sort returned teams by */
    order_by?: "id" | "name" | "manager_id" | "active_flag";
    /** When enabled, the teams will not include IDs of member users */
    skip_users?: 0 | 1;
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number } & { name?: string; description?: string; manager_id?: number; users?: (number)[] } & { active_flag?: 0 | 1; deleted_flag?: 0 | 1 } & { add_time?: string; created_by_user_id?: number })[] }>;

  /**
   * Get one mail message
   */
  getMailMessage: (input: {
    /** The ID of the mail message to fetch */
    id: number;
    /** Whether to include the full message body or not. `0` = Don't include, `1` = Include. */
    include_body?: 0 | 1;
  }) => Promise<{ success?: boolean; statusCode?: number; statusText?: string; service?: string } & { data?: { id?: number; from?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; to?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; cc?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; bcc?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; body_url?: string; account_id?: string; user_id?: number; mail_thread_id?: number; subject?: string; snippet?: string; mail_tracking_status?: "opened" | "not opened" | null; mail_link_tracking_enabled_flag?: 0 | 1; read_flag?: 0 | 1; draft?: string; draft_flag?: 0 | 1; synced_flag?: 0 | 1; deleted_flag?: 0 | 1; has_body_flag?: 0 | 1; sent_flag?: 0 | 1; sent_from_pipedrive_flag?: 0 | 1; smart_bcc_flag?: 0 | 1; message_time?: string; add_time?: string; update_time?: string; has_attachments_flag?: 0 | 1; has_inline_attachments_flag?: 0 | 1; has_real_attachments_flag?: 0 | 1 } }>;

  /**
   * Get mail threads
   */
  getMailThreads: (input: {
    /** The type of folder to fetch */
    folder: "inbox" | "drafts" | "sent" | "archive";
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number; account_id?: string; user_id?: number; subject?: string; snippet?: string; read_flag?: 0 | 1; mail_tracking_status?: string | null; has_attachments_flag?: 0 | 1; has_inline_attachments_flag?: 0 | 1; has_real_attachments_flag?: 0 | 1; deleted_flag?: 0 | 1; synced_flag?: 0 | 1; smart_bcc_flag?: 0 | 1; mail_link_tracking_enabled_flag?: 0 | 1 } & { parties?: { to?: ({ id?: number; name?: string; latest_sent?: boolean; email_address?: string; message_time?: number; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number; linked_organization_id?: number | null })[]; from?: ({ id?: number; name?: string; latest_sent?: boolean; email_address?: string; message_time?: number; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number; linked_organization_id?: number | null })[] }; drafts_parties?: ({ [key: string]: unknown })[]; folders?: (string)[]; version?: number; snippet_draft?: string | null; snippet_sent?: string; message_count?: number; has_draft_flag?: 0 | 1; has_sent_flag?: 0 | 1; archived_flag?: 0 | 1; shared_flag?: 0 | 1; external_deleted_flag?: 0 | 1; first_message_to_me_flag?: 0 | 1; last_message_timestamp?: string; first_message_timestamp?: string; last_message_sent_timestamp?: string | null; last_message_received_timestamp?: string; add_time?: string; update_time?: string; deal_id?: number | null; deal_status?: string | null; lead_id?: string | null; all_messages_sent_flag?: 0 | 1 })[] }>;

  /**
   * Delete mail thread
   */
  deleteMailThread: (input: {
    /** The ID of the mail thread */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * Get one mail thread
   */
  getMailThread: (input: {
    /** The ID of the mail thread */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; account_id?: string; user_id?: number; subject?: string; snippet?: string; read_flag?: 0 | 1; mail_tracking_status?: string | null; has_attachments_flag?: 0 | 1; has_inline_attachments_flag?: 0 | 1; has_real_attachments_flag?: 0 | 1; deleted_flag?: 0 | 1; synced_flag?: 0 | 1; smart_bcc_flag?: 0 | 1; mail_link_tracking_enabled_flag?: 0 | 1 } & { parties?: { to?: ({ id?: number; name?: string; latest_sent?: boolean; email_address?: string; message_time?: number; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number; linked_organization_id?: number | null })[]; from?: ({ id?: number; name?: string; latest_sent?: boolean; email_address?: string; message_time?: number; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number; linked_organization_id?: number | null })[] }; drafts_parties?: ({ [key: string]: unknown })[]; folders?: (string)[]; version?: number; snippet_draft?: string | null; snippet_sent?: string; message_count?: number; has_draft_flag?: 0 | 1; has_sent_flag?: 0 | 1; archived_flag?: 0 | 1; shared_flag?: 0 | 1; external_deleted_flag?: 0 | 1; first_message_to_me_flag?: 0 | 1; last_message_timestamp?: string; first_message_timestamp?: string; last_message_sent_timestamp?: string | null; last_message_received_timestamp?: string; add_time?: string; update_time?: string; deal_id?: number | null; deal_status?: string | null; lead_id?: string | null; all_messages_sent_flag?: 0 | 1 } }>;

  /**
   * Update mail thread details
   */
  updateMailThreadDetails: (input: {
    /** The ID of the deal this thread is associated with */
    deal_id?: number;
    /** The ID of the lead this thread is associated with */
    lead_id?: string;
    /** Whether this thread is shared with other users in your company */
    shared_flag?: 0 | 1;
    /** Whether this thread is read or unread */
    read_flag?: 0 | 1;
    /** Whether this thread is archived or not. You can only archive threads that belong to Inbox folder. Archived threads will disappear from Inbox. */
    archived_flag?: 0 | 1;
    /** The ID of the mail thread */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; account_id?: string; user_id?: number; subject?: string; snippet?: string; read_flag?: 0 | 1; mail_tracking_status?: string | null; has_attachments_flag?: 0 | 1; has_inline_attachments_flag?: 0 | 1; has_real_attachments_flag?: 0 | 1; deleted_flag?: 0 | 1; synced_flag?: 0 | 1; smart_bcc_flag?: 0 | 1; mail_link_tracking_enabled_flag?: 0 | 1 } & { parties?: { to?: ({ id?: number; name?: string; latest_sent?: boolean; email_address?: string; message_time?: number; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number; linked_organization_id?: number | null })[]; from?: ({ id?: number; name?: string; latest_sent?: boolean; email_address?: string; message_time?: number; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number; linked_organization_id?: number | null })[] }; drafts_parties?: ({ [key: string]: unknown })[]; folders?: (string)[]; version?: number; snippet_draft?: string | null; snippet_sent?: string; message_count?: number; has_draft_flag?: 0 | 1; has_sent_flag?: 0 | 1; archived_flag?: 0 | 1; shared_flag?: 0 | 1; external_deleted_flag?: 0 | 1; first_message_to_me_flag?: 0 | 1; last_message_timestamp?: string; first_message_timestamp?: string; last_message_sent_timestamp?: string | null; last_message_received_timestamp?: string; add_time?: string; update_time?: string; deal_id?: number | null; deal_status?: string | null; lead_id?: string | null; all_messages_sent_flag?: 0 | 1 } }>;

  /**
   * Get all mail messages of mail thread
   */
  getMailThreadMessages: (input: {
    /** The ID of the mail thread */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number; account_id?: string; user_id?: number; subject?: string; snippet?: string; read_flag?: 0 | 1; mail_tracking_status?: string | null; has_attachments_flag?: 0 | 1; has_inline_attachments_flag?: 0 | 1; has_real_attachments_flag?: 0 | 1; deleted_flag?: 0 | 1; synced_flag?: 0 | 1; smart_bcc_flag?: 0 | 1; mail_link_tracking_enabled_flag?: 0 | 1 } & { from?: ({ id?: number; name?: string; latest_sent?: boolean; email_address?: string; message_time?: number; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number; linked_organization_id?: number | null })[]; to?: ({ id?: number; name?: string; latest_sent?: boolean; email_address?: string; message_time?: number; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number; linked_organization_id?: number | null })[]; cc?: ({ id?: number; name?: string; latest_sent?: boolean; email_address?: string; message_time?: number; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number; linked_organization_id?: number | null })[]; bcc?: ({ id?: number; name?: string; latest_sent?: boolean; email_address?: string; message_time?: number; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number; linked_organization_id?: number | null })[]; body_url?: string; mail_thread_id?: number; draft?: string | null; has_body_flag?: 0 | 1; sent_flag?: 0 | 1; sent_from_pipedrive_flag?: 0 | 1; message_time?: string; add_time?: string; update_time?: string })[] }>;

  /**
   * Link a user with the installed video call integration
   */
  saveUserProviderLink: (input: {
    /** Unique identifier linking a user to the installed integration. Generated by the integration. */
    user_provider_id: string;
    /** Pipedrive user ID */
    user_id: number;
    /** Pipedrive company ID */
    company_id: number;
    /** Pipedrive Marketplace client ID of the installed integration */
    marketplace_client_id: string;
  }) => Promise<{ success?: boolean; data?: { message?: string } }>;

  /**
   * Delete the link between a user and the installed video call integration
   */
  deleteUserProviderLink: (input: {
    /** Unique identifier linking a user to the installed integration */
    id: string;
  }) => Promise<{ success?: boolean; data?: { message?: string } }>;

  /**
   * Get all notes
   */
  getNotes: (input: {
    /** The ID of the user whose notes to fetch. If omitted, notes by all users will be returned. */
    user_id?: number;
    /** The ID of the lead which notes to fetch. If omitted, notes about all leads will be returned. */
    lead_id?: string;
    /** The ID of the deal which notes to fetch. If omitted, notes about all deals will be returned. */
    deal_id?: number;
    /** The ID of the person whose notes to fetch. If omitted, notes about all persons will be returned. */
    person_id?: number;
    /** The ID of the organization which notes to fetch. If omitted, notes about all organizations will be returned. */
    org_id?: number;
    /** The ID of the project which notes to fetch. If omitted, notes about all projects will be returned. */
    project_id?: number;
    /** The ID of the task which notes to fetch. If omitted, notes about all tasks will be returned. */
    task_id?: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
    /** The field names and sorting mode separated by a comma (`field_name_1 ASC`, `field_name_2 DESC`). Only first-level field keys are supported (no nested keys). Supported fields: `id`, `user_id`, `deal_id`, `person_id`, `org_id`, `content`, `add_time`, `update_time`. */
    sort?: string;
    /** The date in format of YYYY-MM-DD from which notes to fetch */
    start_date?: string;
    /** The date in format of YYYY-MM-DD until which notes to fetch to */
    end_date?: string;
    /** If set, only notes with an `update_time` later than or equal to this time are returned. In RFC3339 format, e.g. 2025-01-01T10:20:00Z. */
    updated_since?: string;
    /** If set, the results are filtered by note to lead pinning state */
    pinned_to_lead_flag?: 0 | 1;
    /** If set, the results are filtered by note to deal pinning state */
    pinned_to_deal_flag?: 0 | 1;
    /** If set, the results are filtered by note to organization pinning state */
    pinned_to_organization_flag?: 0 | 1;
    /** If set, the results are filtered by note to person pinning state */
    pinned_to_person_flag?: 0 | 1;
    /** If set, the results are filtered by note to project pinning state */
    pinned_to_project_flag?: 0 | 1;
    /** If set, the results are filtered by note to task pinning state */
    pinned_to_task_flag?: 0 | 1;
  }) => Promise<{ success?: boolean; data?: ({ id?: number; active_flag?: boolean; add_time?: string; content?: string; deal?: { title?: string }; lead_id?: string; deal_id?: number; last_update_user_id?: number; org_id?: number; organization?: { name?: string }; person?: { name?: string }; person_id?: number; project_id?: number; project?: { title?: string }; task_id?: number; task?: { title?: string }; pinned_to_deal_flag?: boolean; pinned_to_organization_flag?: boolean; pinned_to_person_flag?: boolean; pinned_to_project_flag?: boolean; pinned_to_task_flag?: boolean; update_time?: string; user?: { email?: string; icon_url?: string; is_you?: boolean; name?: string }; user_id?: number })[]; additional_data?: { pagination?: { next_start?: number; start?: number; limit?: number; more_items_in_collection?: boolean } } }>;

  /**
   * Add a note
   */
  addNote: (input: {
    /** The content of the note in HTML format. Subject to sanitization on the back-end. */
    content: string;
    /** The ID of the lead the note will be attached to. This property is required unless one of (`deal_id/person_id/org_id/project_id/task_id`) is specified. */
    lead_id?: string;
    /** The ID of the deal the note will be attached to. This property is required unless one of (`lead_id/person_id/org_id/project_id/task_id`) is specified. */
    deal_id?: number;
    /** The ID of the person this note will be attached to. This property is required unless one of (`deal_id/lead_id/org_id/project_id/task_id`) is specified. */
    person_id?: number;
    /** The ID of the organization this note will be attached to. This property is required unless one of (`deal_id/lead_id/person_id/project_id/task_id`) is specified. */
    org_id?: number;
    /** The ID of the project the note will be attached to. This property is required unless one of (`deal_id/lead_id/person_id/org_id/task_id`) is specified. */
    project_id?: number;
    /** The ID of the task the note will be attached to. This property is required unless one of (`deal_id/lead_id/person_id/org_id/project_id`) is specified. */
    task_id?: number;
    /** The ID of the user who will be marked as the author of the note. Only an admin can change the author. */
    user_id?: number;
    /** The optional creation date & time of the note in UTC. Can be set in the past or in the future. Format: YYYY-MM-DD HH:MM:SS */
    add_time?: string;
    /** If set, the results are filtered by note to lead pinning state (`lead_id` is also required) */
    pinned_to_lead_flag?: 0 | 1;
    /** If set, the results are filtered by note to deal pinning state (`deal_id` is also required) */
    pinned_to_deal_flag?: 0 | 1;
    /** If set, the results are filtered by note to organization pinning state (`org_id` is also required) */
    pinned_to_organization_flag?: 0 | 1;
    /** If set, the results are filtered by note to person pinning state (`person_id` is also required) */
    pinned_to_person_flag?: 0 | 1;
    /** If set, the results are filtered by note to project pinning state (`project_id` is also required) */
    pinned_to_project_flag?: 0 | 1;
    /** If set, the results are filtered by note to task pinning state (`task_id` is also required) */
    pinned_to_task_flag?: 0 | 1;
    [key: string]: unknown;
  }) => Promise<{ success?: boolean; data?: { id?: number; active_flag?: boolean; add_time?: string; content?: string; deal?: { title?: string }; lead_id?: string; deal_id?: number; last_update_user_id?: number; org_id?: number; organization?: { name?: string }; person?: { name?: string }; person_id?: number; project_id?: number; project?: { title?: string }; task_id?: number; task?: { title?: string }; pinned_to_deal_flag?: boolean; pinned_to_organization_flag?: boolean; pinned_to_person_flag?: boolean; pinned_to_project_flag?: boolean; pinned_to_task_flag?: boolean; update_time?: string; user?: { email?: string; icon_url?: string; is_you?: boolean; name?: string }; user_id?: number } }>;

  /**
   * Delete a note
   */
  deleteNote: (input: {
    /** The ID of the note */
    id: number;
  }) => Promise<{ success?: boolean; data?: boolean }>;

  /**
   * Get one note
   */
  getNote: (input: {
    /** The ID of the note */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; active_flag?: boolean; add_time?: string; content?: string; deal?: { title?: string }; lead_id?: string; deal_id?: number; last_update_user_id?: number; org_id?: number; organization?: { name?: string }; person?: { name?: string }; person_id?: number; project_id?: number; project?: { title?: string }; task_id?: number; task?: { title?: string }; pinned_to_deal_flag?: boolean; pinned_to_organization_flag?: boolean; pinned_to_person_flag?: boolean; pinned_to_project_flag?: boolean; pinned_to_task_flag?: boolean; update_time?: string; user?: { email?: string; icon_url?: string; is_you?: boolean; name?: string }; user_id?: number } }>;

  /**
   * Update a note
   */
  updateNote: (input: {
    /** The content of the note in HTML format. Subject to sanitization on the back-end. */
    content?: string;
    /** The ID of the lead the note will be attached to */
    lead_id?: string;
    /** The ID of the deal the note will be attached to */
    deal_id?: number;
    /** The ID of the person the note will be attached to */
    person_id?: number;
    /** The ID of the organization the note will be attached to */
    org_id?: number;
    /** The ID of the project the note will be attached to */
    project_id?: number;
    /** The ID of the task the note will be attached to */
    task_id?: number;
    /** The ID of the user who will be marked as the author of the note. Only an admin can change the author. */
    user_id?: number;
    /** The optional creation date & time of the note in UTC. Can be set in the past or in the future. Format: YYYY-MM-DD HH:MM:SS */
    add_time?: string;
    /** If set, the results are filtered by note to lead pinning state (`lead_id` is also required) */
    pinned_to_lead_flag?: 0 | 1;
    /** If set, the results are filtered by note to deal pinning state (`deal_id` is also required) */
    pinned_to_deal_flag?: 0 | 1;
    /** If set, the results are filtered by note to organization pinning state (`org_id` is also required) */
    pinned_to_organization_flag?: 0 | 1;
    /** If set, the results are filtered by note to person pinning state (`person_id` is also required) */
    pinned_to_person_flag?: 0 | 1;
    /** If set, the results are filtered by note to project pinning state (`project_id` is also required) */
    pinned_to_project_flag?: 0 | 1;
    /** If set, the results are filtered by note to task pinning state (`task_id` is also required) */
    pinned_to_task_flag?: 0 | 1;
    /** The ID of the note */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; active_flag?: boolean; add_time?: string; content?: string; deal?: { title?: string }; lead_id?: string; deal_id?: number; last_update_user_id?: number; org_id?: number; organization?: { name?: string }; person?: { name?: string }; person_id?: number; project_id?: number; project?: { title?: string }; task_id?: number; task?: { title?: string }; pinned_to_deal_flag?: boolean; pinned_to_organization_flag?: boolean; pinned_to_person_flag?: boolean; pinned_to_project_flag?: boolean; pinned_to_task_flag?: boolean; update_time?: string; user?: { email?: string; icon_url?: string; is_you?: boolean; name?: string }; user_id?: number } }>;

  /**
   * Get all comments for a note
   */
  getNoteComments: (input: {
    /** The ID of the note */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean; data?: ({ uuid?: string; active_flag?: boolean; add_time?: string; update_time?: string; content?: string; object_id?: string; object_type?: string; user_id?: number; updater_id?: number; company_id?: number })[]; additional_data?: { pagination?: { next_start?: number; start?: number; limit?: number; more_items_in_collection?: boolean } } }>;

  /**
   * Add a comment to a note
   */
  addNoteComment: (input: {
    /** The content of the comment in HTML format. Subject to sanitization on the back-end. */
    content: string;
    /** The ID of the note */
    id: number;
  }) => Promise<{ success?: boolean; data?: { uuid?: string; active_flag?: boolean; add_time?: string; update_time?: string; content?: string; object_id?: string; object_type?: string; user_id?: number; updater_id?: number; company_id?: number } }>;

  /**
   * Get one comment
   */
  getComment: (input: {
    /** The ID of the note */
    id: number;
    /** The ID of the comment */
    commentId: string;
  }) => Promise<{ success?: boolean; data?: { uuid?: string; active_flag?: boolean; add_time?: string; update_time?: string; content?: string; object_id?: string; object_type?: string; user_id?: number; updater_id?: number; company_id?: number } }>;

  /**
   * Update a comment related to a note
   */
  updateCommentForNote: (input: {
    /** The content of the comment in HTML format. Subject to sanitization on the back-end. */
    content: string;
    /** The ID of the note */
    id: number;
    /** The ID of the comment */
    commentId: string;
  }) => Promise<{ success?: boolean; data?: { uuid?: string; active_flag?: boolean; add_time?: string; update_time?: string; content?: string; object_id?: string; object_type?: string; user_id?: number; updater_id?: number; company_id?: number } }>;

  /**
   * Delete a comment related to a note
   */
  deleteComment: (input: {
    /** The ID of the note */
    id: number;
    /** The ID of the comment */
    commentId: string;
  }) => Promise<{ success?: boolean; data?: boolean }>;

  /**
   * Get all note fields
   */
  getNoteFields: () => Promise<{ success?: boolean } & { data?: ({ id?: number; key?: string; name?: string; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; active_flag?: boolean; edit_flag?: boolean; bulk_edit_allowed?: boolean; mandatory_flag?: boolean; options?: ({ id?: number; label?: string })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Requesting authorization
   */
  authorize: (input: {
    /** The client ID provided to you by the Pipedrive Marketplace when you register your app */
    client_id: string;
    /** The callback URL you provided when you registered your app. Authorization code will be sent to that URL (if it matches with the value you entered in the registration form) if a user approves the app install. Or, if a customer declines, the corresponding error will also be sent to this URL. */
    redirect_uri: string;
    /** You may pass any random string as the state parameter and the same string will be returned to your app after a user authorizes access. It may be used to store the user's session ID from your app or distinguish different responses. Using state may increase security; see RFC-6749.  */
    state?: string;
  }) => Promise<unknown>;

  /**
   * Getting the tokens
   */
  getTokens: (input: {
    /** Since you are trying to exchange an authorization code for a pair of tokens, you must use the value "authorization_code" */
    grant_type?: "authorization_code" | "refresh_token";
    /** The authorization code that you received after the user confirmed app installation */
    code?: string;
    /** The callback URL you provided when you registered your app */
    redirect_uri?: string;
  }, options: { headers: { Authorization: string } }) => Promise<{ access_token?: string; token_type?: string; refresh_token?: string; scope?: string; expires_in?: number; api_domain?: string }>;

  /**
   * Refreshing the tokens
   */
  refreshTokens: (input: {
    /** Since you are trying to exchange an authorization code for a pair of tokens, you must use the value "authorization_code" */
    grant_type?: "authorization_code" | "refresh_token";
    /** The authorization code that you received after the user confirmed app installation */
    code?: string;
    /** The callback URL you provided when you registered your app */
    redirect_uri?: string;
  }, options: { headers: { Authorization: string } }) => Promise<{ access_token?: string; token_type?: string; refresh_token?: string; scope?: string; expires_in?: number; api_domain?: string }>;

  /**
   * List updates about organization field values
   */
  getOrganizationChangelog: (input: {
    /** The ID of the organization */
    id: number;
    /** For pagination, the marker (an opaque string value) representing the first item on the next page */
    cursor?: string;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ field_key?: string; old_value?: string | null; new_value?: string | null; actor_user_id?: number; time?: string; change_source?: string | null; change_source_user_agent?: string | null; is_bulk_update_flag?: boolean })[]; additional_data?: { next_cursor?: string } }>;

  /**
   * List files attached to an organization
   */
  getOrganizationFiles: (input: {
    /** The ID of the organization */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page. Please note that a maximum value of 100 is allowed. */
    limit?: number;
    /** Supported fields: `id`, `update_time` */
    sort?: string;
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number; user_id?: number; deal_id?: number; person_id?: number; org_id?: number; product_id?: number; activity_id?: number; lead_id?: string; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; cid?: string; s3_bucket?: string; mail_message_id?: string; mail_template_id?: string; deal_name?: string; person_name?: string; org_name?: string; product_name?: string; lead_name?: string; url?: string; name?: string; description?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * List updates about an organization
   */
  getOrganizationUpdates: (input: {
    /** The ID of the organization */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
    /** Whether to show custom field updates or not. 1 = Include custom field changes. If omitted, returns changes without custom field updates. */
    all_changes?: string;
    /** A comma-separated string for filtering out item specific updates. (Possible values - activity, plannedActivity, note, file, change, deal, follower, participant, mailMessage, mailMessageWithAttachment, invoice, activityFile, document). */
    items?: string;
  }) => Promise<{ success?: boolean } & { data?: ({ object?: string; timestamp?: string; data?: { [key: string]: unknown } })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean }; related_objects?: { organization?: { ORGANIZATION_ID?: { id?: number } & { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } }; user?: { USER_ID?: { id?: number; name?: string; email?: string; has_pic?: number; pic_hash?: string | null; active_flag?: boolean } & { [key: string]: unknown } } } }>;

  /**
   * List followers of an organization
   */
  getOrganizationFollowers: (input: {
    /** The ID of the organization */
    id: number;
  }) => Promise<{ success?: boolean; data?: ({ org_id?: number } & { user_id?: number; id?: number; add_time?: string })[]; additional_data?: { pagination?: { start?: number; limit?: number; more_items_in_collection?: boolean; next_start?: number } } }>;

  /**
   * Add a follower to an organization
   */
  addOrganizationFollower: (input: {
    /** The ID of the user */
    user_id: number;
    /** The ID of the organization */
    id: number;
  }) => Promise<{ success?: boolean; data?: { org_id?: number } & { user_id?: number; id?: number; add_time?: string } }>;

  /**
   * Delete a follower from an organization
   */
  deleteOrganizationFollower: (input: {
    /** The ID of the organization */
    id: number;
    /** The ID of the relationship between the follower and the organization */
    follower_id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } }>;

  /**
   * List mail messages associated with an organization
   */
  getOrganizationMailMessages: (input: {
    /** The ID of the organization */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ object?: string; timestamp?: string; data?: { id?: number; from?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; to?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; cc?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; bcc?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; body_url?: string; account_id?: string; user_id?: number; mail_thread_id?: number; subject?: string; snippet?: string; mail_tracking_status?: "opened" | "not opened" | null; mail_link_tracking_enabled_flag?: 0 | 1; read_flag?: 0 | 1; draft?: string; draft_flag?: 0 | 1; synced_flag?: 0 | 1; deleted_flag?: 0 | 1; has_body_flag?: 0 | 1; sent_flag?: 0 | 1; sent_from_pipedrive_flag?: 0 | 1; smart_bcc_flag?: 0 | 1; message_time?: string; add_time?: string; update_time?: string; has_attachments_flag?: 0 | 1; has_inline_attachments_flag?: 0 | 1; has_real_attachments_flag?: 0 | 1 } & { nylas_id?: string; s3_bucket?: string; s3_bucket_path?: string; external_deleted_flag?: boolean; mua_message_id?: string; template_id?: number; timestamp?: string; item_type?: string; company_id?: number } })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Merge two organizations
   */
  mergeOrganizations: (input: {
    /** The ID of the organization that the organization will be merged with */
    merge_with_id: number;
    /** The ID of the organization */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } }>;

  /**
   * List permitted users
   */
  getOrganizationUsers: (input: {
    /** The ID of the organization */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: (number)[] }>;

  /**
   * Get all organization fields
   */
  getOrganizationFields: (input: {
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & unknown & { data?: ({ id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Add a new organization field
   */
  addOrganizationField: (input: {
    /** The name of the field */
    name: string;
    /** When `field_type` is either set or enum, possible options must be supplied as a JSON-encoded sequential array of objects. Example: `[{"label":"New Item"}]` */
    options?: ({ [key: string]: unknown })[];
    /** Whether the field is available in the 'add new' modal or not (both in the web and mobile app) */
    add_visible_flag?: boolean;
    /** The type of the field<table><tr><th>Value</th><th>Description</th></tr><tr><td>`address`</td><td>Address field</td></tr><tr><td>`date`</td><td>Date (format YYYY-MM-DD)</td></tr><tr><td>`daterange`</td><td>Date-range field (has a start date and end date value, both YYYY-MM-DD)</td></tr><tr><td>`double`</td><td>Numeric value</td></tr><tr><td>`enum`</td><td>Options field with a single possible chosen option</td></tr><tr></tr><tr><td>`monetary`</td><td>Monetary field (has a numeric value and a currency value)</td></tr><tr><td>`org`</td><td>Organization field (contains an organization ID which is stored on the same account)</td></tr><tr><td>`people`</td><td>Person field (contains a person ID which is stored on the same account)</td></tr><tr><td>`phone`</td><td>Phone field (up to 255 numbers and/or characters)</td></tr><tr><td>`set`</td><td>Options field with a possibility of having multiple chosen options</td></tr><tr><td>`text`</td><td>Long text (up to 65k characters)</td></tr><tr><td>`time`</td><td>Time field (format HH:MM:SS)</td></tr><tr><td>`timerange`</td><td>Time-range field (has a start time and end time value, both HH:MM:SS)</td></tr><tr><td>`user`</td><td>User field (contains a user ID of another Pipedrive user)</td></tr><tr><td>`varchar`</td><td>Text (up to 255 characters)</td></tr><tr><td>`varchar_auto`</td><td>Autocomplete text (up to 255 characters)</td></tr><tr><td>`visible_to`</td><td>System field that keeps item's visibility setting</td></tr></table> */
    field_type: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to";
  }) => Promise<{ success?: boolean } & { data?: { id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" } }>;

  /**
   * Delete multiple organization fields in bulk
   */
  deleteOrganizationFields: (input: {
    /** The comma-separated field IDs to delete */
    ids: string;
  }) => Promise<{ success?: boolean } & { data?: { id?: (number)[] } }>;

  /**
   * Get one organization field
   */
  getOrganizationField: (input: {
    /** The ID of the field */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" } }>;

  /**
   * Delete an organization field
   */
  deleteOrganizationField: (input: {
    /** The ID of the field */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * Update an organization field
   */
  updateOrganizationField: (input: {
    /** The name of the field */
    name?: string;
    /** When `field_type` is either set or enum, possible options must be supplied as a JSON-encoded sequential array of objects. All active items must be supplied and already existing items must have their ID supplied. New items only require a label. Example: `[{"id":123,"label":"Existing Item"},{"label":"New Item"}]` */
    options?: ({ [key: string]: unknown })[];
    /** Whether the field is available in 'add new' modal or not (both in web and mobile app) */
    add_visible_flag?: boolean;
    /** The ID of the field */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" } }>;

  /**
   * Get all relationships for organization
   */
  getOrganizationRelationships: (input: {
    /** The ID of the organization to get relationships for */
    org_id: number;
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number; type?: string; rel_owner_org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } & { value?: number }; rel_linked_org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } & { value?: number }; add_time?: string; update_time?: string; active_flag?: string } & { calculated_type?: string; calculated_related_org_id?: number } & { related_organization_name?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean }; related_objects?: { organization?: { ORGANIZATION_ID?: { id?: number } & { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } } } }>;

  /**
   * Create an organization relationship
   */
  addOrganizationRelationship: (input: {
    /** The ID of the base organization for the returned calculated values */
    org_id?: number;
    /** The type of organization relationship */
    type: "parent" | "related";
    /** The owner of the relationship. If type is `parent`, then the owner is the parent and the linked organization is the daughter. */
    rel_owner_org_id: number;
    /** The linked organization in the relationship. If type is `parent`, then the linked organization is the daughter. */
    rel_linked_org_id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; type?: string; rel_owner_org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } & { value?: number }; rel_linked_org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } & { value?: number }; add_time?: string; update_time?: string; active_flag?: string }; related_objects?: { organization?: { ORGANIZATION_ID?: { id?: number } & { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } } } }>;

  /**
   * Delete an organization relationship
   */
  deleteOrganizationRelationship: (input: {
    /** The ID of the organization relationship */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * Get one organization relationship
   */
  getOrganizationRelationship: (input: {
    /** The ID of the organization relationship */
    id: number;
    /** The ID of the base organization for the returned calculated values */
    org_id?: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; type?: string; rel_owner_org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } & { value?: number }; rel_linked_org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } & { value?: number }; add_time?: string; update_time?: string; active_flag?: string } & { calculated_type?: string; calculated_related_org_id?: number }; related_objects?: { organization?: { ORGANIZATION_ID?: { id?: number } & { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } } } }>;

  /**
   * Update an organization relationship
   */
  updateOrganizationRelationship: (input: {
    /** The ID of the base organization for the returned calculated values */
    org_id?: number;
    /** The type of organization relationship */
    type?: "parent" | "related";
    /** The owner of this relationship. If type is `parent`, then the owner is the parent and the linked organization is the daughter. */
    rel_owner_org_id?: number;
    /** The linked organization in this relationship. If type is `parent`, then the linked organization is the daughter. */
    rel_linked_org_id?: number;
    /** The ID of the organization relationship */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; type?: string; rel_owner_org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } & { value?: number }; rel_linked_org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } & { value?: number }; add_time?: string; update_time?: string; active_flag?: string }; related_objects?: { organization?: { ORGANIZATION_ID?: { id?: number } & { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } } } }>;

  /**
   * Get all permission sets
   */
  getPermissionSets: (input: {
    /** The app to filter the permission sets by */
    app?: "sales" | "projects" | "campaigns" | "global" | "account_settings";
  }) => Promise<{ success?: boolean } & { data?: ({ id?: string; name?: string; description?: string; app?: "sales" | "projects" | "campaigns" | "global" | "account_settings"; type?: "admin" | "manager" | "regular" | "custom"; assignment_count?: number })[] }>;

  /**
   * Get one permission set
   */
  getPermissionSet: (input: {
    /** The ID of the permission set */
    id: string;
  }) => Promise<{ id?: string; name?: string; description?: string; app?: "sales" | "projects" | "campaigns" | "global" | "account_settings"; type?: "admin" | "manager" | "regular" | "custom"; assignment_count?: number } & { contents?: (string)[] }>;

  /**
   * List permission set assignments
   */
  getPermissionSetAssignments: (input: {
    /** The ID of the permission set */
    id: string;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ user_id?: number; permission_set_id?: string; name?: string })[] }>;

  /**
   * List updates about person field values
   */
  getPersonChangelog: (input: {
    /** The ID of the person */
    id: number;
    /** For pagination, the marker (an opaque string value) representing the first item on the next page */
    cursor?: string;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ field_key?: string; old_value?: string | null; new_value?: string | null; actor_user_id?: number; time?: string; change_source?: string | null; change_source_user_agent?: string | null; is_bulk_update_flag?: boolean })[]; additional_data?: { next_cursor?: string } }>;

  /**
   * List files attached to a person
   */
  getPersonFiles: (input: {
    /** The ID of the person */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page. Please note that a maximum value of 100 is allowed. */
    limit?: number;
    /** Supported fields: `id`, `update_time` */
    sort?: string;
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number; user_id?: number; deal_id?: number; person_id?: number; org_id?: number; product_id?: number; activity_id?: number; lead_id?: string; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; cid?: string; s3_bucket?: string; mail_message_id?: string; mail_template_id?: string; deal_name?: string; person_name?: string; org_name?: string; product_name?: string; lead_name?: string; url?: string; name?: string; description?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * List updates about a person
   */
  getPersonUpdates: (input: {
    /** The ID of the person */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
    /** Whether to show custom field updates or not. 1 = Include custom field changes. If omitted returns changes without custom field updates. */
    all_changes?: string;
    /** A comma-separated string for filtering out item specific updates. (Possible values - call, activity, plannedActivity, change, note, deal, file, dealChange, personChange, organizationChange, follower, dealFollower, personFollower, organizationFollower, participant, comment, mailMessage, mailMessageWithAttachment, invoice, document, marketing_campaign_stat, marketing_status_change). */
    items?: string;
  }) => Promise<{ success?: boolean } & { data?: ({ object?: string; timestamp?: string; data?: { [key: string]: unknown } })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean }; related_objects?: { deal?: { DEAL_ID?: { id?: number; title?: string; status?: string; value?: number; currency?: string; stage_id?: number; pipeline_id?: number } }; organization?: { ORGANIZATION_ID?: { id?: number } & { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } }; user?: { USER_ID?: { id?: number; name?: string; email?: string; has_pic?: number; pic_hash?: string | null; active_flag?: boolean } & { [key: string]: unknown } }; person?: { PERSON_ID?: { active_flag?: boolean } & { id?: number; name?: string; email?: ({ label?: string; value?: string; primary?: boolean })[]; phone?: ({ label?: string; value?: string; primary?: boolean })[]; owner_id?: number } } } }>;

  /**
   * List followers of a person
   */
  getPersonFollowers: (input: {
    /** The ID of the person */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: ({ user_id?: number; id?: number; deal_id?: number; add_time?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Add a follower to a person
   */
  addPersonFollower: (input: {
    /** The ID of the user */
    user_id: number;
    /** The ID of the person */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { user_id?: number; id?: number; person_id?: number; add_time?: string } }>;

  /**
   * Delete a follower from a person
   */
  deletePersonFollower: (input: {
    /** The ID of the person */
    id: number;
    /** The ID of the relationship between the follower and the person */
    follower_id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * List mail messages associated with a person
   */
  getPersonMailMessages: (input: {
    /** The ID of the person */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ object?: string; timestamp?: string; data?: { id?: number; from?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; to?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; cc?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; bcc?: ({ id?: number; email_address?: string; name?: string; linked_person_id?: number; linked_person_name?: string; mail_message_party_id?: number })[]; body_url?: string; account_id?: string; user_id?: number; mail_thread_id?: number; subject?: string; snippet?: string; mail_tracking_status?: "opened" | "not opened" | null; mail_link_tracking_enabled_flag?: 0 | 1; read_flag?: 0 | 1; draft?: string; draft_flag?: 0 | 1; synced_flag?: 0 | 1; deleted_flag?: 0 | 1; has_body_flag?: 0 | 1; sent_flag?: 0 | 1; sent_from_pipedrive_flag?: 0 | 1; smart_bcc_flag?: 0 | 1; message_time?: string; add_time?: string; update_time?: string; has_attachments_flag?: 0 | 1; has_inline_attachments_flag?: 0 | 1; has_real_attachments_flag?: 0 | 1 } & { nylas_id?: string; s3_bucket?: string; s3_bucket_path?: string; external_deleted_flag?: boolean; mua_message_id?: string; template_id?: number; timestamp?: string; item_type?: string; company_id?: number } })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Merge two persons
   */
  mergePersons: (input: {
    /** The ID of the person that will not be overwritten. This person’s data will be prioritized in case of conflict with the other person. */
    merge_with_id: number;
    /** The ID of the person */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; company_id?: number; active_flag?: boolean; phone?: ({ value?: string; primary?: boolean; label?: string })[]; email?: ({ value?: string; primary?: boolean; label?: string })[]; first_char?: string; add_time?: string; update_time?: string; visible_to?: string; picture_id?: { id?: number; item_type?: string; item_id?: number; active_flag?: boolean; add_time?: string; update_time?: string; added_by_user_id?: number; pictures?: { "128"?: string; "512"?: string } } | null; label?: number | null; label_ids?: (number)[]; org_name?: string | null; owner_name?: string; cc_email?: string | null } & { owner_id?: number; org_id?: number; merge_what_id?: number } & { name?: string; first_name?: string; last_name?: string | null } & { email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; files_count?: number; notes_count?: number; followers_count?: number } & { last_incoming_mail_time?: string | null; last_outgoing_mail_time?: string | null } & { open_deals_count?: number; related_open_deals_count?: number; closed_deals_count?: number; related_closed_deals_count?: number; won_deals_count?: number; related_won_deals_count?: number; lost_deals_count?: number; related_lost_deals_count?: number } & { next_activity_date?: string | null; next_activity_time?: string | null; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null } & { participant_open_deals_count?: number; participant_closed_deals_count?: number } }>;

  /**
   * List permitted users
   */
  getPersonUsers: (input: {
    /** The ID of the person */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: (number)[] }>;

  /**
   * Delete person picture
   */
  deletePersonPicture: (input: {
    /** The ID of the person */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * Add person picture
   */
  addPersonPicture: (input: {
    /** One image supplied in the multipart/form-data encoding */
    file: string;
    /** X coordinate to where start cropping form (in pixels) */
    crop_x?: number;
    /** Y coordinate to where start cropping form (in pixels) */
    crop_y?: number;
    /** The width of the cropping area (in pixels) */
    crop_width?: number;
    /** The height of the cropping area (in pixels) */
    crop_height?: number;
    /** The ID of the person */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { PICTURE_ID?: { id?: number } & { item_type?: string; item_id?: number; active_flag?: boolean; add_time?: string; update_time?: string; added_by_user_id?: number; pictures?: { "128"?: string; "512"?: string } } } }>;

  /**
   * List products associated with a person
   */
  getPersonProducts: (input: {
    /** The ID of the person */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ DEAL_ID?: { deal?: { id?: number; company_id?: number; creator_user_id?: number; user_id?: number; person_id?: number; org_id?: number; stage_id?: number; title?: string; value?: number; currency?: string; add_time?: string; first_add_time?: string; update_time?: string; stage_change_time?: string; active?: boolean; deleted?: boolean; status?: string; probability?: number | null; next_activity_date?: string; next_activity_time?: string; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null; lost_reason?: string | null; visible_to?: string; close_time?: string | null; pipeline_id?: number; won_time?: string; first_won_time?: string; lost_time?: string; products_count?: number; files_count?: number; notes_count?: number; followers_count?: number; email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; participants_count?: number; expected_close_date?: string; last_incoming_mail_time?: string; last_outgoing_mail_time?: string; label?: string }; product?: { id?: number; company_id?: number; name?: string; code?: string; description?: string; unit?: string; tax?: number; category?: string; active_flag?: boolean; selectable?: boolean; first_char?: string; visible_to?: "1" | "3" | "5" | "7"; owner_id?: number; files_count?: number; add_time?: string; update_time?: string; deal_id?: number } } })[]; additional_data?: { pagination?: { start?: number; limit?: number; more_items_in_collection?: boolean; next_start?: number } } }>;

  /**
   * Get all person fields
   */
  getPersonFields: (input: {
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & unknown & { data?: ({ id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Add a new person field
   */
  addPersonField: (input: {
    /** The name of the field */
    name: string;
    /** When `field_type` is either set or enum, possible options must be supplied as a JSON-encoded sequential array of objects. Example: `[{"label":"New Item"}]` */
    options?: ({ [key: string]: unknown })[];
    /** Whether the field is available in the 'add new' modal or not (both in the web and mobile app) */
    add_visible_flag?: boolean;
    /** The type of the field<table><tr><th>Value</th><th>Description</th></tr><tr><td>`address`</td><td>Address field</td></tr><tr><td>`date`</td><td>Date (format YYYY-MM-DD)</td></tr><tr><td>`daterange`</td><td>Date-range field (has a start date and end date value, both YYYY-MM-DD)</td></tr><tr><td>`double`</td><td>Numeric value</td></tr><tr><td>`enum`</td><td>Options field with a single possible chosen option</td></tr><tr></tr><tr><td>`monetary`</td><td>Monetary field (has a numeric value and a currency value)</td></tr><tr><td>`org`</td><td>Organization field (contains an organization ID which is stored on the same account)</td></tr><tr><td>`people`</td><td>Person field (contains a person ID which is stored on the same account)</td></tr><tr><td>`phone`</td><td>Phone field (up to 255 numbers and/or characters)</td></tr><tr><td>`set`</td><td>Options field with a possibility of having multiple chosen options</td></tr><tr><td>`text`</td><td>Long text (up to 65k characters)</td></tr><tr><td>`time`</td><td>Time field (format HH:MM:SS)</td></tr><tr><td>`timerange`</td><td>Time-range field (has a start time and end time value, both HH:MM:SS)</td></tr><tr><td>`user`</td><td>User field (contains a user ID of another Pipedrive user)</td></tr><tr><td>`varchar`</td><td>Text (up to 255 characters)</td></tr><tr><td>`varchar_auto`</td><td>Autocomplete text (up to 255 characters)</td></tr><tr><td>`visible_to`</td><td>System field that keeps item's visibility setting</td></tr></table> */
    field_type: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to";
  }) => Promise<{ success?: boolean } & { data?: { id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" } }>;

  /**
   * Delete multiple person fields in bulk
   */
  deletePersonFields: (input: {
    /** The comma-separated field IDs to delete */
    ids: string;
  }) => Promise<{ success?: boolean } & { data?: { id?: (number)[] } }>;

  /**
   * Get one person field
   */
  getPersonField: (input: {
    /** The ID of the field */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" } }>;

  /**
   * Delete a person field
   */
  deletePersonField: (input: {
    /** The ID of the field */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * Update a person field
   */
  updatePersonField: (input: {
    /** The name of the field */
    name?: string;
    /** When `field_type` is either set or enum, possible options must be supplied as a JSON-encoded sequential array of objects. All active items must be supplied and already existing items must have their ID supplied. New items only require a label. Example: `[{"id":123,"label":"Existing Item"},{"label":"New Item"}]` */
    options?: ({ [key: string]: unknown })[];
    /** Whether the field is available in 'add new' modal or not (both in web and mobile app) */
    add_visible_flag?: boolean;
    /** The ID of the field */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number | null; key?: string; name?: string; order_nr?: number; field_type?: "address" | "date" | "daterange" | "double" | "enum" | "monetary" | "org" | "people" | "phone" | "set" | "text" | "time" | "timerange" | "user" | "varchar" | "varchar_auto" | "visible_to"; add_time?: string; update_time?: string | null; last_updated_by_user_id?: number | null; created_by_user_id?: number | null; active_flag?: boolean; edit_flag?: boolean; index_visible_flag?: boolean; details_visible_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean; options?: ({ [key: string]: unknown })[] | null; options_deleted?: ({ [key: string]: unknown })[]; is_subfield?: boolean; subfields?: ({ [key: string]: unknown })[] } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" } }>;

  /**
   * Get deals conversion rates in pipeline
   */
  getPipelineConversionStatistics: (input: {
    /** The ID of the pipeline */
    id: number;
    /** The start of the period. Date in format of YYYY-MM-DD. */
    start_date: string;
    /** The end of the period. Date in format of YYYY-MM-DD. */
    end_date: string;
    /** The ID of the user who's pipeline metrics statistics to fetch. If omitted, the authorized user will be used. */
    user_id?: number;
  }) => Promise<{ success?: boolean } & { data?: { stage_conversions?: ({ from_stage_id?: number; to_stage_id?: number; conversion_rate?: number })[]; won_conversion?: number; lost_conversion?: number } }>;

  /**
   * Get deals in a pipeline
   */
  getPipelineDeals: (input: {
    /** The ID of the pipeline */
    id: number;
    /** If supplied, only deals matching the given filter will be returned */
    filter_id?: number;
    /** If supplied, `filter_id` will not be considered and only deals owned by the given user will be returned. If omitted, deals owned by the authorized user will be returned. */
    user_id?: number;
    /** If supplied, `filter_id` and `user_id` will not be considered – instead, deals owned by everyone will be returned */
    everyone?: 0 | 1;
    /** If supplied, only deals within the given stage will be returned */
    stage_id?: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
    /** Whether to include a summary of the pipeline in the `additional_data` or not */
    get_summary?: 0 | 1;
    /** The 3-letter currency code of any of the supported currencies. When supplied, `per_stages_converted` is returned inside `deals_summary` inside `additional_data` which contains the currency-converted total amounts in the given currency per each stage. You may also set this parameter to `default_currency` in which case users default currency is used. Only works when `get_summary` parameter flag is enabled. */
    totals_convert_currency?: string;
  }) => Promise<{ success?: boolean; data?: ({ id?: number; creator_user_id?: number; user_id?: number; person_id?: number; org_id?: number } & { stage_id?: number; title?: string; value?: number; currency?: string; add_time?: string; update_time?: string; stage_change_time?: string; active?: boolean; deleted?: boolean; is_archived?: boolean; status?: string; probability?: number | null; next_activity_date?: string; next_activity_time?: string; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null; lost_reason?: string | null; visible_to?: string; close_time?: string | null; pipeline_id?: number; won_time?: string; first_won_time?: string; lost_time?: string; products_count?: number; files_count?: number; notes_count?: number; followers_count?: number; email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; participants_count?: number; expected_close_date?: string; last_incoming_mail_time?: string; last_outgoing_mail_time?: string; label?: string; stage_order_nr?: number; person_name?: string; org_name?: string; next_activity_subject?: string; next_activity_type?: string; next_activity_duration?: string; next_activity_note?: string; formatted_value?: string; weighted_value?: number; formatted_weighted_value?: string; weighted_value_currency?: string; rotten_time?: string | null; owner_name?: string; cc_email?: string; org_hidden?: boolean; person_hidden?: boolean; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; arr?: number | null; mrr?: number | null; acv?: number | null; arr_currency?: string | null; mrr_currency?: string | null; acv_currency?: string | null })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Get deals movements in pipeline
   */
  getPipelineMovementStatistics: (input: {
    /** The ID of the pipeline */
    id: number;
    /** The start of the period. Date in format of YYYY-MM-DD. */
    start_date: string;
    /** The end of the period. Date in format of YYYY-MM-DD. */
    end_date: string;
    /** The ID of the user who's pipeline statistics to fetch. If omitted, the authorized user will be used. */
    user_id?: number;
  }) => Promise<{ success?: boolean } & { data?: { movements_between_stages?: { count?: number }; new_deals?: { count?: number; deals_ids?: (number)[]; values?: { CURRENCY_ID?: number }; formatted_values?: { CURRENCY_ID?: string } }; deals_left_open?: { count?: number; deals_ids?: (number)[]; values?: { CURRENCY_ID?: number }; formatted_values?: { CURRENCY_ID?: string } }; won_deals?: { count?: number; deals_ids?: (number)[]; values?: { CURRENCY_ID?: number }; formatted_values?: { CURRENCY_ID?: string } }; lost_deals?: { count?: number; deals_ids?: (number)[]; values?: { CURRENCY_ID?: number }; formatted_values?: { CURRENCY_ID?: string } }; average_age_in_days?: { across_all_stages?: number; by_stages?: ({ stage_id?: number; value?: number })[] } } }>;

  /**
   * Get deals where a product is attached to
   */
  getProductDeals: (input: {
    /** The ID of the product */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
    /** Only fetch deals with a specific status. If omitted, all not deleted deals are returned. If set to deleted, deals that have been deleted up to 30 days ago will be included. */
    status?: "open" | "won" | "lost" | "deleted" | "all_not_deleted";
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number; creator_user_id?: { id?: number; name?: string; email?: string; has_pic?: boolean; pic_hash?: string | null; active_flag?: boolean; value?: number }; user_id?: { id?: number; name?: string; email?: string; has_pic?: boolean; pic_hash?: string | null; active_flag?: boolean } & { value?: number }; person_id?: { active_flag?: boolean; name?: string; email?: ({ label?: string; value?: string; primary?: boolean })[]; phone?: ({ label?: string; value?: string; primary?: boolean })[]; owner_id?: number } & { value?: number }; org_id?: { name?: string; people_count?: number; owner_id?: number; address?: string; active_flag?: boolean; cc_email?: string } & { value?: number } } & { stage_id?: number; title?: string; value?: number; currency?: string; add_time?: string; update_time?: string; stage_change_time?: string; active?: boolean; deleted?: boolean; is_archived?: boolean; status?: string; probability?: number | null; next_activity_date?: string; next_activity_time?: string; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null; lost_reason?: string | null; visible_to?: string; close_time?: string | null; pipeline_id?: number; won_time?: string; first_won_time?: string; lost_time?: string; products_count?: number; files_count?: number; notes_count?: number; followers_count?: number; email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; participants_count?: number; expected_close_date?: string; last_incoming_mail_time?: string; last_outgoing_mail_time?: string; label?: string; stage_order_nr?: number; person_name?: string; org_name?: string; next_activity_subject?: string; next_activity_type?: string; next_activity_duration?: string; next_activity_note?: string; formatted_value?: string; weighted_value?: number; formatted_weighted_value?: string; weighted_value_currency?: string; rotten_time?: string | null; owner_name?: string; cc_email?: string; org_hidden?: boolean; person_hidden?: boolean; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; arr?: number | null; mrr?: number | null; acv?: number | null; arr_currency?: string | null; mrr_currency?: string | null; acv_currency?: string | null })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean }; related_objects?: { organization?: { ORGANIZATION_ID?: { active_flag?: boolean } & { id?: number } & { name?: string; people_count?: number; owner_id?: number; address?: string | null; cc_email?: string | null } }; person?: { PERSON_ID?: { active_flag?: boolean } & { id?: number; name?: string; email?: ({ label?: string; value?: string; primary?: boolean })[]; phone?: ({ label?: string; value?: string; primary?: boolean })[]; owner_id?: number } }; user?: { USER_ID?: { id?: number; name?: string; email?: string; has_pic?: number; pic_hash?: string | null; active_flag?: boolean } & { [key: string]: unknown } }; stage?: { id?: number; order_nr?: number; name?: string; active_flag?: boolean; deal_probability?: number; pipeline_id?: number; rotten_flag?: boolean; rotten_days?: number; add_time?: string; update_time?: string }; pipeline?: { id?: number; name?: string; url_title?: string; order_nr?: number; active?: boolean; deal_probability?: boolean; add_time?: string; update_time?: string } } }>;

  /**
   * List files attached to a product
   */
  getProductFiles: (input: {
    /** The ID of the product */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page. Please note that a maximum value of 100 is allowed. */
    limit?: number;
    /** Supported fields: `id`, `update_time` */
    sort?: string;
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number; product_id?: number; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; s3_bucket?: string; product_name?: string; url?: string; name?: string; description?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * List followers of a product
   */
  getProductFollowers: (input: {
    /** The ID of the product */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ user_id?: number; id?: number; product_id?: number; add_time?: string })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Add a follower to a product
   */
  addProductFollower: (input: {
    /** The ID of the user */
    user_id: number;
    /** The ID of the product */
    id: number;
  }) => Promise<{ success?: boolean; data?: { user_id?: number; id?: number; product_id?: number; add_time?: string } }>;

  /**
   * Delete a follower from a product
   */
  deleteProductFollower: (input: {
    /** The ID of the product */
    id: number;
    /** The ID of the relationship between the follower and the product */
    follower_id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } }>;

  /**
   * List permitted users
   */
  getProductUsers: (input: {
    /** The ID of the product */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: (number)[] }>;

  /**
   * Delete multiple product fields in bulk
   */
  deleteProductFields: (input: {
    /** The comma-separated field IDs to delete */
    ids: string;
  }) => Promise<{ success?: boolean; data?: { id?: (number)[] } }>;

  /**
   * Get all product fields
   */
  getProductFields: (input: {
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean; data?: ({ name: string; options?: ({ [key: string]: unknown })[]; field_type: "varchar" | "varchar_auto" | "text" | "double" | "monetary" | "date" | "set" | "enum" | "user" | "org" | "people" | "phone" | "time" | "timerange" | "daterange" | "address" } & { id?: number; key?: string; order_nr?: number; add_time?: string; update_time?: string; last_updated_by_user_id?: number; created_by_user_id?: number; active_flag?: boolean; edit_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean } & { field_type?: "boolean" | "double" | "int" | "json" | "date" | "daterange" | "time" | "timerange" | "text" | "varchar" | "varchar_auto" | "varchar_options" | "address" | "enum" | "monetary" | "phone" | "set" | "activity" | "deal" | "lead" | "org" | "people" | "pipeline" | "product" | "project" | "stage" | "user" | "billing_frequency" | "picture" | "price_list" | "projects_board" | "projects_phase" | "status" | "visible_to" })[]; additional_data?: { [key: string]: unknown } }>;

  /**
   * Add a new product field
   */
  addProductField: (input: {
    /** The name of the field */
    name: string;
    /** When `field_type` is either `set` or `enum`, possible options must be supplied as a JSON-encoded sequential array, for example:</br>`[{"label":"red"}, {"label":"blue"}, {"label":"lilac"}]` */
    options?: ({ [key: string]: unknown })[];
    /** The type of the field<table><tr><th>Value</th><th>Description</th></tr><tr><td>`varchar`</td><td>Text (up to 255 characters)</td><tr><td>`varchar_auto`</td><td>Autocomplete text (up to 255 characters)</td><tr><td>`text`</td><td>Long text (up to 65k characters)</td><tr><td>`double`</td><td>Numeric value</td><tr><td>`monetary`</td><td>Monetary field (has a numeric value and a currency value)</td><tr><td>`date`</td><td>Date (format YYYY-MM-DD)</td><tr><td>`set`</td><td>Options field with a possibility of having multiple chosen options</td><tr><td>`enum`</td><td>Options field with a single possible chosen option</td><tr><td>`user`</td><td>User field (contains a user ID of another Pipedrive user)</td><tr><td>`org`</td><td>Organization field (contains an organization ID which is stored on the same account)</td><tr><td>`people`</td><td>Person field (contains a product ID which is stored on the same account)</td><tr><td>`phone`</td><td>Phone field (up to 255 numbers and/or characters)</td><tr><td>`time`</td><td>Time field (format HH:MM:SS)</td><tr><td>`timerange`</td><td>Time-range field (has a start time and end time value, both HH:MM:SS)</td><tr><td>`daterange`</td><td>Date-range field (has a start date and end date value, both YYYY-MM-DD)</td><tr><td>`address`</td><td>Address field</dd></table> */
    field_type: "varchar" | "varchar_auto" | "text" | "double" | "monetary" | "date" | "set" | "enum" | "user" | "org" | "people" | "phone" | "time" | "timerange" | "daterange" | "address";
  }) => Promise<{ success?: boolean; data?: { name: string; options?: ({ [key: string]: unknown })[]; field_type: "varchar" | "varchar_auto" | "text" | "double" | "monetary" | "date" | "set" | "enum" | "user" | "org" | "people" | "phone" | "time" | "timerange" | "daterange" | "address" } & { id?: number; key?: string; order_nr?: number; add_time?: string; update_time?: string; last_updated_by_user_id?: number; created_by_user_id?: number; active_flag?: boolean; edit_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean } }>;

  /**
   * Delete a product field
   */
  deleteProductField: (input: {
    /** The ID of the product field */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } }>;

  /**
   * Get one product field
   */
  getProductField: (input: {
    /** The ID of the product field */
    id: number;
  }) => Promise<{ success?: boolean; data?: { name: string; options?: ({ [key: string]: unknown })[]; field_type: "varchar" | "varchar_auto" | "text" | "double" | "monetary" | "date" | "set" | "enum" | "user" | "org" | "people" | "phone" | "time" | "timerange" | "daterange" | "address" } & { id?: number; key?: string; order_nr?: number; add_time?: string; update_time?: string; last_updated_by_user_id?: number; created_by_user_id?: number; active_flag?: boolean; edit_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean } }>;

  /**
   * Update a product field
   */
  updateProductField: (input: {
    /** The name of the field */
    name?: string;
    /** When `field_type` is either set or enum, possible options on update must be supplied as an array of objects each containing id and label, for example: [{"id":1, "label":"red"},{"id":2, "label":"blue"},{"id":3, "label":"lilac"}] */
    options?: ({ [key: string]: unknown })[];
    /** The ID of the product field */
    id: number;
  }) => Promise<{ success?: boolean; data?: { name: string; options?: ({ [key: string]: unknown })[]; field_type: "varchar" | "varchar_auto" | "text" | "double" | "monetary" | "date" | "set" | "enum" | "user" | "org" | "people" | "phone" | "time" | "timerange" | "daterange" | "address" } & { id?: number; key?: string; order_nr?: number; add_time?: string; update_time?: string; last_updated_by_user_id?: number; created_by_user_id?: number; active_flag?: boolean; edit_flag?: boolean; add_visible_flag?: boolean; important_flag?: boolean; bulk_edit_allowed?: boolean; searchable_flag?: boolean; filtering_allowed?: boolean; sortable_flag?: boolean; mandatory_flag?: boolean } }>;

  /**
   * Get all projects
   */
  getProjects: (input: {
    /** For pagination, the marker (an opaque string value) representing the first item on the next page */
    cursor?: string;
    /** For pagination, the limit of entries to be returned. If not provided, 100 items will be returned. */
    limit?: number;
    /** The ID of the filter to use */
    filter_id?: number;
    /** If supplied, includes only projects with the specified statuses. Possible values are `open`, `completed`, `canceled` and `deleted`. By default `deleted` projects are not returned. */
    status?: string;
    /** If supplied, only projects in specified phase are returned */
    phase_id?: number;
    /** If supplied with `true` then archived projects are also included in the response. By default only not archived projects are returned. */
    include_archived?: boolean;
  }) => Promise<{ success?: boolean; data?: ({ id?: number } & { title?: string } & { board_id?: number; phase_id?: number; description?: string; status?: string; owner_id?: number; start_date?: string; end_date?: string; deal_ids?: (number)[]; org_id?: number; person_id?: number; labels?: (number)[]; health_status?: number | null } & { add_time?: string; update_time?: string; status_change_time?: string; archive_time?: string })[]; additional_data?: { next_cursor?: string } }>;

  /**
   * Add a project
   */
  addProject: (input: {
    /** The title of the project */
    title: string;
    /** The ID of the board this project is associated with */
    board_id?: number;
    /** The ID of the phase this project is associated with */
    phase_id?: number;
    /** The description of the project */
    description?: string;
    /** The status of the project */
    status?: string;
    /** The ID of a project owner */
    owner_id?: number;
    /** The start date of the project. Format: YYYY-MM-DD. */
    start_date?: string;
    /** The end date of the project. Format: YYYY-MM-DD. */
    end_date?: string;
    /** An array of IDs of the deals this project is associated with */
    deal_ids?: (number)[];
    /** The ID of the organization this project is associated with */
    org_id?: number;
    /** The ID of the person this project is associated with */
    person_id?: number;
    /** An array of IDs of the labels this project has */
    labels?: (number)[];
    /** The health status of the project */
    health_status?: number | null;
    /** The ID of the template the project will be based on */
    template_id?: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } & { title?: string } & { board_id?: number; phase_id?: number; description?: string; status?: string; owner_id?: number; start_date?: string; end_date?: string; deal_ids?: (number)[]; org_id?: number; person_id?: number; labels?: (number)[]; health_status?: number | null } & { add_time?: string; update_time?: string; status_change_time?: string; archive_time?: string }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Get details of a project
   */
  getProject: (input: {
    /** The ID of the project */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } & { title?: string } & { board_id?: number; phase_id?: number; description?: string; status?: string; owner_id?: number; start_date?: string; end_date?: string; deal_ids?: (number)[]; org_id?: number; person_id?: number; labels?: (number)[]; health_status?: number | null } & { add_time?: string; update_time?: string; status_change_time?: string; archive_time?: string }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Update a project
   */
  updateProject: (input: {
    /** The title of the project */
    title?: string;
    /** The ID of the board this project is associated with */
    board_id?: number;
    /** The ID of the phase this project is associated with */
    phase_id?: number;
    /** The description of the project */
    description?: string;
    /** The status of the project */
    status?: string;
    /** The ID of a project owner */
    owner_id?: number;
    /** The start date of the project. Format: YYYY-MM-DD. */
    start_date?: string;
    /** The end date of the project. Format: YYYY-MM-DD. */
    end_date?: string;
    /** An array of IDs of the deals this project is associated with */
    deal_ids?: (number)[];
    /** The ID of the organization this project is associated with */
    org_id?: number;
    /** The ID of the person this project is associated with */
    person_id?: number;
    /** An array of IDs of the labels this project has */
    labels?: (number)[];
    /** The health status of the project */
    health_status?: number | null;
    /** The ID of the project */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } & { title?: string } & { board_id?: number; phase_id?: number; description?: string; status?: string; owner_id?: number; start_date?: string; end_date?: string; deal_ids?: (number)[]; org_id?: number; person_id?: number; labels?: (number)[]; health_status?: number | null } & { add_time?: string; update_time?: string; status_change_time?: string; archive_time?: string }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Delete a project
   */
  deleteProject: (input: {
    /** The ID of the project */
    id: number;
  }) => Promise<{ success?: boolean; data?: { success?: boolean; data?: { id?: number } }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Archive a project
   */
  archiveProject: (input: {
    /** The ID of the project */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } & { title?: string } & { board_id?: number; phase_id?: number; description?: string; status?: string; owner_id?: number; start_date?: string; end_date?: string; deal_ids?: (number)[]; org_id?: number; person_id?: number; labels?: (number)[]; health_status?: number | null } & { add_time?: string; update_time?: string; status_change_time?: string; archive_time?: string }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Returns project plan
   */
  getProjectPlan: (input: {
    /** The ID of the project */
    id: number;
  }) => Promise<{ success?: boolean; data?: ({ item_id?: number; item_type?: string; phase_id?: number; group_id?: number })[]; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Update activity in project plan
   */
  putProjectPlanActivity: (input: {
    /** The ID of a phase on a project board */
    phase_id?: number;
    /** The ID of a group on a project board */
    group_id?: number;
    /** The ID of the project */
    id: number;
    /** The ID of the activity */
    activityId: number;
  }) => Promise<{ success?: boolean; data?: { item_id?: number; item_type?: string; phase_id?: number; group_id?: number }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Update task in project plan
   */
  putProjectPlanTask: (input: {
    /** The ID of a phase on a project board */
    phase_id?: number;
    /** The ID of a group on a project board */
    group_id?: number;
    /** The ID of the project */
    id: number;
    /** The ID of the task */
    taskId: number;
  }) => Promise<{ success?: boolean; data?: { item_id?: number; item_type?: string; phase_id?: number; group_id?: number }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Returns project groups
   */
  getProjectGroups: (input: {
    /** The ID of the project */
    id: number;
  }) => Promise<{ success?: boolean; data?: ({ id?: number; name?: string; order_nr?: number })[]; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Returns project tasks
   */
  getProjectTasks: (input: {
    /** The ID of the project */
    id: number;
  }) => Promise<{ success?: boolean; data?: ({ id?: number } & { title?: string; project_id?: number } & { description?: string; parent_task_id?: number; assignee_id?: number; assignee_ids?: (number)[]; done?: 0 | 1; due_date?: string } & { creator_id?: number; add_time?: string; update_time?: string; marked_as_done_time?: string })[]; additional_data?: { next_cursor?: string } }>;

  /**
   * Returns project activities
   */
  getProjectActivities: (input: {
    /** The ID of the project */
    id: number;
  }) => Promise<{ success?: boolean; data?: ({ due_date?: string; due_time?: string; duration?: string; deal_id?: number; lead_id?: string | null; person_id?: number; project_id?: number | null; org_id?: number; location?: string; public_description?: string } & { id?: number; done?: boolean; subject?: string; type?: string; user_id?: number; busy_flag?: boolean; company_id?: number; conference_meeting_client?: string; conference_meeting_url?: string; conference_meeting_id?: string; add_time?: string; marked_as_done_time?: string; active_flag?: boolean; update_time?: string; update_user_id?: number; source_timezone?: string; location_subpremise?: string; location_street_number?: string; location_route?: string; location_sublocality?: string; location_locality?: string; location_admin_area_level_1?: string; location_admin_area_level_2?: string; location_country?: string; location_postal_code?: string; location_formatted_address?: string })[]; additional_data?: { next_cursor?: string } }>;

  /**
   * Get all project boards
   */
  getProjectsBoards: () => Promise<{ success?: boolean; data?: ({ id?: number; name?: string; order_nr?: number; add_time?: string; update_time?: string })[]; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Get details of a board
   */
  getProjectsBoard: (input: {
    /** The ID of the project board */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; name?: string; order_nr?: number; add_time?: string; update_time?: string }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Get project phases
   */
  getProjectsPhases: (input: {
    /** ID of the board for which phases are requested */
    board_id: number;
  }) => Promise<{ success?: boolean; data?: ({ id?: number; name?: string; board_id?: number; order_nr?: number; add_time?: string; update_time?: string })[]; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Get details of a phase
   */
  getProjectsPhase: (input: {
    /** The ID of the project phase */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; name?: string; board_id?: number; order_nr?: number; add_time?: string; update_time?: string }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Get all project templates
   */
  getProjectTemplates: (input: {
    /** For pagination, the marker (an opaque string value) representing the first item on the next page */
    cursor?: string;
    /** For pagination, the limit of entries to be returned. If not provided, up to 500 items will be returned. */
    limit?: number;
  }) => Promise<{ success?: boolean; data?: ({ id?: number; title?: string; description?: string; projects_board_id?: number; owner_id?: number; add_time?: string; update_time?: string })[]; additional_data?: { next_cursor?: string } }>;

  /**
   * Get details of a template
   */
  getProjectTemplate: (input: {
    /** The ID of the project template */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number; title?: string; description?: string; projects_board_id?: number; owner_id?: number; add_time?: string; update_time?: string }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Get recents
   */
  getRecents: (input: {
    /** The timestamp in UTC. Format: YYYY-MM-DD HH:MM:SS. */
    since_timestamp: string;
    /** Multiple selection of item types to include in the query (optional) */
    items?: "activity" | "activityType" | "deal" | "file" | "filter" | "note" | "person" | "organization" | "pipeline" | "product" | "stage" | "user";
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean; data?: ({ item?: "activity"; id?: number; data?: { due_date?: string; due_time?: string; duration?: string; deal_id?: number; lead_id?: string | null; person_id?: number; project_id?: number | null; org_id?: number; location?: string; public_description?: string } & { id?: number; note?: string; done?: boolean; subject?: string; type?: string; user_id?: number; participants?: ({ [key: string]: unknown })[] | null; busy_flag?: boolean; attendees?: ({ [key: string]: unknown })[] | null; company_id?: number; reference_type?: string; reference_id?: number; conference_meeting_client?: string; conference_meeting_url?: string; conference_meeting_id?: string; add_time?: string; marked_as_done_time?: string; last_notification_time?: string; last_notification_user_id?: number; notification_language_id?: number; active_flag?: boolean; update_time?: string; update_user_id?: number; gcal_event_id?: string; google_calendar_id?: string; google_calendar_etag?: string; calendar_sync_include_context?: string; source_timezone?: string; rec_rule?: string; rec_rule_extension?: string; rec_master_activity_id?: number; series?: ({ [key: string]: unknown })[]; created_by_user_id?: number; location_subpremise?: string; location_street_number?: string; location_route?: string; location_sublocality?: string; location_locality?: string; location_admin_area_level_1?: string; location_admin_area_level_2?: string; location_country?: string; location_postal_code?: string; location_formatted_address?: string; org_name?: string; person_name?: string; deal_title?: string; owner_name?: string; person_dropbox_bcc?: string; deal_dropbox_bcc?: string; assigned_to_user_id?: number; file?: { [key: string]: unknown } } } | { item?: "activityType"; id?: number; data?: { id?: number; name?: string; icon_key?: "task" | "email" | "meeting" | "deadline" | "call" | "lunch" | "calendar" | "downarrow" | "document" | "smartphone" | "camera" | "scissors" | "cogs" | "bubble" | "uparrow" | "checkbox" | "signpost" | "shuffle" | "addressbook" | "linegraph" | "picture" | "car" | "world" | "search" | "clip" | "sound" | "brush" | "key" | "padlock" | "pricetag" | "suitcase" | "finish" | "plane" | "loop" | "wifi" | "truck" | "cart" | "bulb" | "bell" | "presentation"; color?: string; order_nr?: number; key_string?: string; active_flag?: boolean; is_custom_flag?: boolean; add_time?: string; update_time?: string } } | { item?: "deal"; id?: number; data?: { id?: number; creator_user_id?: number; user_id?: number; person_id?: number; org_id?: number } & { stage_id?: number; title?: string; value?: number; currency?: string; add_time?: string; update_time?: string; stage_change_time?: string; active?: boolean; deleted?: boolean; is_archived?: boolean; status?: string; probability?: number | null; next_activity_date?: string; next_activity_time?: string; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null; lost_reason?: string | null; visible_to?: string; close_time?: string | null; pipeline_id?: number; won_time?: string; first_won_time?: string; lost_time?: string; products_count?: number; files_count?: number; notes_count?: number; followers_count?: number; email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; participants_count?: number; expected_close_date?: string; last_incoming_mail_time?: string; last_outgoing_mail_time?: string; label?: string; stage_order_nr?: number; person_name?: string; org_name?: string; next_activity_subject?: string; next_activity_type?: string; next_activity_duration?: string; next_activity_note?: string; formatted_value?: string; weighted_value?: number; formatted_weighted_value?: string; weighted_value_currency?: string; rotten_time?: string | null; owner_name?: string; cc_email?: string; org_hidden?: boolean; person_hidden?: boolean; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; arr?: number | null; mrr?: number | null; acv?: number | null; arr_currency?: string | null; mrr_currency?: string | null; acv_currency?: string | null } } | { item?: "file"; id?: number; data?: { id?: number; user_id?: number; deal_id?: number; person_id?: number; org_id?: number; product_id?: number; activity_id?: number; lead_id?: string; add_time?: string; update_time?: string; file_name?: string; file_size?: number; active_flag?: boolean; inline_flag?: boolean; remote_location?: string; remote_id?: string; cid?: string; s3_bucket?: string; mail_message_id?: string; mail_template_id?: string; deal_name?: string; person_name?: string; org_name?: string; product_name?: string; lead_name?: string; url?: string; name?: string; description?: string } } | { item?: "filter"; id?: number; data?: { id?: number; name?: string; filter_code?: string | null; is_editable?: boolean; active_flag?: boolean; type?: "deals" | "leads" | "org" | "people" | "products" | "activity" | "projects"; temporary_flag?: boolean | null; user_id?: number; add_time?: string; update_time?: string | null; visible_to?: "1" | "3" | "5" | "7"; last_used_time?: string | null; custom_view_id?: number | null } } | { item?: "note"; id?: number; data?: { id?: number; active_flag?: boolean; add_time?: string; content?: string; deal?: { title?: string }; lead_id?: string; deal_id?: number; last_update_user_id?: number; org_id?: number; organization?: { name?: string }; person?: { name?: string }; person_id?: number; project_id?: number; project?: { title?: string }; task_id?: number; task?: { title?: string }; pinned_to_deal_flag?: boolean; pinned_to_organization_flag?: boolean; pinned_to_person_flag?: boolean; pinned_to_project_flag?: boolean; pinned_to_task_flag?: boolean; update_time?: string; user?: { email?: string; icon_url?: string; is_you?: boolean; name?: string }; user_id?: number } } | { item?: "person"; id?: number; data?: { id?: number; company_id?: number; active_flag?: boolean; phone?: ({ value?: string; primary?: boolean; label?: string })[]; email?: ({ value?: string; primary?: boolean; label?: string })[]; first_char?: string; add_time?: string; update_time?: string; visible_to?: string; picture_id?: { id?: number; item_type?: string; item_id?: number; active_flag?: boolean; add_time?: string; update_time?: string; added_by_user_id?: number; pictures?: { "128"?: string; "512"?: string } } | null; label?: number | null; label_ids?: (number)[]; org_name?: string | null; owner_name?: string; cc_email?: string | null } & { owner_id?: number; org_id?: number; merge_what_id?: number } & { name?: string; first_name?: string; last_name?: string | null } & { email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; files_count?: number; notes_count?: number; followers_count?: number } & { last_incoming_mail_time?: string | null; last_outgoing_mail_time?: string | null } & { open_deals_count?: number; related_open_deals_count?: number; closed_deals_count?: number; related_closed_deals_count?: number; won_deals_count?: number; related_won_deals_count?: number; lost_deals_count?: number; related_lost_deals_count?: number } & { next_activity_date?: string | null; next_activity_time?: string | null; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null } & { participant_open_deals_count?: number; participant_closed_deals_count?: number } } | { item?: "organization"; id?: number; data?: { id?: number; company_id?: number; owner_id?: { id?: number; name?: string; email?: string; has_pic?: number; pic_hash?: string | null; active_flag?: boolean } & { value?: number }; name?: string; active_flag?: boolean; picture_id?: { value?: number } & { item_type?: string; item_id?: number; active_flag?: boolean; add_time?: string; update_time?: string; added_by_user_id?: number; pictures?: { "128"?: string; "512"?: string } }; country_code?: string | null; first_char?: string; add_time?: string; update_time?: string; visible_to?: string; label?: number; label_ids?: (number)[]; owner_name?: string; cc_email?: string } & { email_messages_count?: number; people_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; files_count?: number; notes_count?: number; followers_count?: number } & { address?: string; address_subpremise?: string; address_street_number?: string; address_route?: string; address_sublocality?: string; address_locality?: string; address_admin_area_level_1?: string; address_admin_area_level_2?: string; address_country?: string; address_postal_code?: string; address_formatted_address?: string } & { open_deals_count?: number; related_open_deals_count?: number; closed_deals_count?: number; related_closed_deals_count?: number; won_deals_count?: number; related_won_deals_count?: number; lost_deals_count?: number; related_lost_deals_count?: number } & { next_activity_date?: string | null; next_activity_time?: string | null; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null } } | { item?: "pipeline"; id?: number; data?: { id?: number; name?: string; url_title?: string; order_nr?: number; active?: boolean; deal_probability?: boolean; add_time?: string; update_time?: string } } | { item?: "product"; id?: number; data?: { id?: number; name?: string; code?: string; description?: string; unit?: string; tax?: number; category?: string; active_flag?: boolean; selectable?: boolean; first_char?: string; visible_to?: number; owner_id?: number; files_count?: number; add_time?: string; update_time?: string; prices?: ({ [key: string]: unknown })[] } } | { item?: "stage"; id?: number; data?: { id?: number; order_nr?: number; name?: string; active_flag?: boolean; deal_probability?: number; pipeline_id?: number; rotten_flag?: boolean; rotten_days?: number; add_time?: string; update_time?: string } } | { item?: "user"; id?: number; data?: { id?: number; name?: string; default_currency?: string; locale?: string; lang?: number; email?: string; phone?: string | null; activated?: boolean; last_login?: string; created?: string; modified?: string | null; has_created_company?: boolean; access?: ({ app?: "global" | "sales" | "campaigns" | "projects" | "account_settings" | "partnership"; admin?: boolean; permission_set_id?: string })[]; active_flag?: boolean; timezone_name?: string; timezone_offset?: string; role_id?: number; icon_url?: string | null; is_you?: boolean; is_deleted?: boolean } })[]; additional_data?: { since_timestamp?: string; last_timestamp_on_page?: string; pagination?: { start?: number; limit?: number; more_items_in_collection?: boolean } } }>;

  /**
   * Get all roles
   */
  getRoles: (input: {
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ parent_role_id?: number | null; name?: string } & { id?: number; active_flag?: boolean; assignment_count?: string; sub_role_count?: string } & { level?: number })[]; additional_data?: { pagination?: { start?: number; limit?: number; more_items_in_collection?: boolean } } }>;

  /**
   * Add a role
   */
  addRole: (input: {
    /** The name of the role */
    name: string;
    /** The ID of the parent role */
    parent_role_id?: number | null;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * Delete a role
   */
  deleteRole: (input: {
    /** The ID of the role */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * Get one role
   */
  getRole: (input: {
    /** The ID of the role */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { parent_role_id?: number | null; name?: string } & { id?: number; active_flag?: boolean; assignment_count?: string; sub_role_count?: string }; additional_data?: { settings?: { deal_default_visibility?: number; lead_default_visibility?: number; org_default_visibility?: number; person_default_visibility?: number; product_default_visibility?: number; deal_access_level?: number; org_access_level?: number; person_access_level?: number; product_access_level?: number } } }>;

  /**
   * Update role details
   */
  updateRole: (input: {
    /** The ID of the parent role */
    parent_role_id?: number | null;
    /** The name of the role */
    name?: string;
    /** The ID of the role */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * Delete a role assignment
   */
  deleteRoleAssignment: (input: {
    /** The ID of the user */
    user_id: number;
    /** The ID of the role */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number } }>;

  /**
   * List role assignments
   */
  getRoleAssignments: (input: {
    /** The ID of the role */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ parent_role_id?: number | null; name?: string } & { user_id?: number; role_id?: number; active_flag?: boolean; type?: string })[]; additional_data?: { pagination?: { start?: number; limit?: number; more_items_in_collection?: boolean } } }>;

  /**
   * Add role assignment
   */
  addRoleAssignment: (input: {
    /** The ID of the user */
    user_id: number;
    /** The ID of the role */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { user_id?: number; role_id?: number } }>;

  /**
   * List role settings
   */
  getRoleSettings: (input: {
    /** The ID of the role */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { deal_default_visibility?: number; lead_default_visibility?: number; org_default_visibility?: number; person_default_visibility?: number; product_default_visibility?: number; deal_access_level?: number; org_access_level?: number; person_access_level?: number; product_access_level?: number } }>;

  /**
   * Add or update role setting
   */
  addOrUpdateRoleSetting: (input: {
    setting_key: "deal_default_visibility" | "lead_default_visibility" | "org_default_visibility" | "person_default_visibility" | "product_default_visibility";
    /** Possible values for the `default_visibility` setting depending on the subscription plan:<br> <table class='role-setting'> <caption><b>Light / Growth and Professional plans</b></caption> <tr><th><b>Value</b></th><th><b>Description</b></th></tr> <tr><td>`1`</td><td>Owner & Followers</td></tr> <tr><td>`3`</td><td>Entire company</td></tr> </table> <br> <table class='role-setting'> <caption><b>Premium / Ultimate plan</b></caption> <tr><th><b>Value</b></th><th><b>Description</b></th></tr> <tr><td>`1`</td><td>Owner only</td></tr> <tr><td>`3`</td><td>Owner&#39;s visibility group</td></tr> <tr><td>`5`</td><td>Owner&#39;s visibility group and sub-groups</td></tr> <tr><td>`7`</td><td>Entire company</td></tr> </table> <br> Read more about visibility groups <a href='https://support.pipedrive.com/en/article/visibility-groups'>here</a>. */
    value: 1 | 3 | 5 | 7;
    /** The ID of the role */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; deal_default_visibility?: 1 | 3 | 5 | 7 } }>;

  /**
   * List pipeline visibility for a role
   */
  getRolePipelines: (input: {
    /** The ID of the role */
    id: number;
    /** Whether to return the visible or hidden pipelines for the role */
    visible?: boolean;
  }) => Promise<{ success?: boolean } & { data?: { pipeline_ids?: (number)[]; visible?: boolean } }>;

  /**
   * Update pipeline visibility for a role
   */
  updateRolePipelines: (input: {
    /** The pipeline IDs to make the pipelines visible (add) and/or hidden (remove) for the specified role. It requires the following JSON structure: `{ "add": "[1]", "remove": "[3, 4]" }`. */
    visible_pipeline_ids: { [key: string]: unknown };
    /** The ID of the role */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { pipeline_ids?: (number)[]; visible?: boolean } }>;

  /**
   * Get deals in a stage
   */
  getStageDeals: (input: {
    /** The ID of the stage */
    id: number;
    /** If supplied, only deals matching the given filter will be returned */
    filter_id?: number;
    /** If supplied, `filter_id` will not be considered and only deals owned by the given user will be returned. If omitted, deals owned by the authorized user will be returned. */
    user_id?: number;
    /** If supplied, `filter_id` and `user_id` will not be considered – instead, deals owned by everyone will be returned */
    everyone?: 0 | 1;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean; data?: ({ id?: number; creator_user_id?: number; user_id?: number; person_id?: number; org_id?: number } & { stage_id?: number; title?: string; value?: number; currency?: string; add_time?: string; update_time?: string; stage_change_time?: string; active?: boolean; deleted?: boolean; is_archived?: boolean; status?: string; probability?: number | null; next_activity_date?: string; next_activity_time?: string; next_activity_id?: number | null; last_activity_id?: number | null; last_activity_date?: string | null; lost_reason?: string | null; visible_to?: string; close_time?: string | null; pipeline_id?: number; won_time?: string; first_won_time?: string; lost_time?: string; products_count?: number; files_count?: number; notes_count?: number; followers_count?: number; email_messages_count?: number; activities_count?: number; done_activities_count?: number; undone_activities_count?: number; participants_count?: number; expected_close_date?: string; last_incoming_mail_time?: string; last_outgoing_mail_time?: string; label?: string; stage_order_nr?: number; person_name?: string; org_name?: string; next_activity_subject?: string; next_activity_type?: string; next_activity_duration?: string; next_activity_note?: string; formatted_value?: string; weighted_value?: number; formatted_weighted_value?: string; weighted_value_currency?: string; rotten_time?: string | null; owner_name?: string; cc_email?: string; org_hidden?: boolean; person_hidden?: boolean; origin?: string; origin_id?: string | null; channel?: number | null; channel_id?: string | null; arr?: number | null; mrr?: number | null; acv?: number | null; arr_currency?: string | null; mrr_currency?: string | null; acv_currency?: string | null })[]; additional_data?: { start?: number; limit?: number; more_items_in_collection?: boolean } }>;

  /**
   * Get all tasks
   */
  getTasks: (input: {
    /** For pagination, the marker (an opaque string value) representing the first item on the next page */
    cursor?: string;
    /** For pagination, the limit of entries to be returned. If not provided, up to 500 items will be returned. */
    limit?: number;
    /** If supplied, only tasks that are assigned to this user are returned */
    assignee_id?: number;
    /** If supplied, only tasks that are assigned to this project are returned */
    project_id?: number;
    /** If `null` is supplied then only parent tasks are returned. If integer is supplied then only subtasks of a specific task are returned. By default all tasks are returned. */
    parent_task_id?: number;
    /** Whether the task is done or not. `0` = Not done, `1` = Done. If not omitted then returns both done and not done tasks. */
    done?: 0 | 1;
  }) => Promise<{ success?: boolean; data?: ({ id?: number } & { title?: string; project_id?: number } & { description?: string; parent_task_id?: number; assignee_id?: number; assignee_ids?: (number)[]; done?: 0 | 1; due_date?: string } & { creator_id?: number; add_time?: string; update_time?: string; marked_as_done_time?: string })[]; additional_data?: { next_cursor?: string } }>;

  /**
   * Add a task
   */
  addTask: (input: {
    /** The title of the task */
    title: string;
    /** The ID of a project */
    project_id: number;
    /** The description of the task */
    description?: string;
    /** The ID of a parent task. Can not be ID of a task which is already a subtask. */
    parent_task_id?: number;
    /** The ID of the user assigned to the task. When the `assignee_id` field is updated, the `assignee_ids` field value will be overwritten by the `assignee_id` field value. */
    assignee_id?: number;
    /** The IDs of users assigned to the task. When the `assignee_ids` field is updated, the `assignee_id` field value will be set to the first value of the `assignee_ids` field, or `null` if the list is empty. */
    assignee_ids?: (number)[];
    /** Whether the task is done or not. 0 = Not done, 1 = Done. */
    done?: 0 | 1;
    /** The due date of the task. Format: YYYY-MM-DD. */
    due_date?: string;
  }) => Promise<{ success?: boolean; data?: { id?: number } & { title?: string; project_id?: number } & { description?: string; parent_task_id?: number; assignee_id?: number; assignee_ids?: (number)[]; done?: 0 | 1; due_date?: string } & { creator_id?: number; add_time?: string; update_time?: string; marked_as_done_time?: string }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Get details of a task
   */
  getTask: (input: {
    /** The ID of the task */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } & { title?: string; project_id?: number } & { description?: string; parent_task_id?: number; assignee_id?: number; assignee_ids?: (number)[]; done?: 0 | 1; due_date?: string } & { creator_id?: number; add_time?: string; update_time?: string; marked_as_done_time?: string }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Update a task
   */
  updateTask: (input: {
    /** The title of the task */
    title?: string;
    /** The ID of the project this task is associated with */
    project_id?: number;
    /** The description of the task */
    description?: string;
    /** The ID of a parent task. Can not be ID of a task which is already a subtask. */
    parent_task_id?: number;
    /** The ID of the user assigned to the task. When the `assignee_id` field is updated, the `assignee_ids` field value will be overwritten by the `assignee_id` field value. */
    assignee_id?: number;
    /** The IDs of users assigned to the task. When the `assignee_ids` field is updated, the `assignee_id` field value will be set to the first value of the `assignee_ids` field, or `null` if the list is empty. */
    assignee_ids?: (number)[];
    /** Whether the task is done or not. 0 = Not done, 1 = Done. */
    done?: 0 | 1;
    /** The due date of the task. Format: YYYY-MM-DD. */
    due_date?: string;
    /** The ID of the task */
    id: number;
  }) => Promise<{ success?: boolean; data?: { id?: number } & { title?: string; project_id?: number } & { description?: string; parent_task_id?: number; assignee_id?: number; assignee_ids?: (number)[]; done?: 0 | 1; due_date?: string } & { creator_id?: number; add_time?: string; update_time?: string; marked_as_done_time?: string }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Delete a task
   */
  deleteTask: (input: {
    /** The ID of the task */
    id: number;
  }) => Promise<{ success?: boolean; data?: { success?: boolean; data?: { id?: number } }; additional_data?: { [key: string]: unknown } | null }>;

  /**
   * Get all users
   */
  getUsers: () => Promise<{ success?: boolean } & { data?: ({ id?: number; name?: string; default_currency?: string; locale?: string; lang?: number; email?: string; phone?: string | null; activated?: boolean; last_login?: string; created?: string; modified?: string | null; has_created_company?: boolean; access?: ({ app?: "global" | "sales" | "campaigns" | "projects" | "account_settings" | "partnership"; admin?: boolean; permission_set_id?: string })[]; active_flag?: boolean; timezone_name?: string; timezone_offset?: string; role_id?: number; icon_url?: string | null; is_you?: boolean; is_deleted?: boolean })[] }>;

  /**
   * Add a new user
   */
  addUser: (input: {
    /** The email of the user */
    email: string;
    /** The access given to the user. Each item in the array represents access to a specific app. Optionally may include either admin flag or permission set ID to specify which access to give within the app. If both are omitted, the default access for the corresponding app will be used. It requires structure as follows: `[{ app: 'sales', permission_set_id: '62cc4d7f-4038-4352-abf3-a8c1c822b631' }, { app: 'global', admin: true }, { app: 'account_settings' }]`  */
    access?: ({ app: "global" | "sales" | "campaigns" | "projects" | "account_settings" | "partnership"; admin?: boolean; permission_set_id?: string })[];
    /** Whether the user is active or not. `false` = Not activated, `true` = Activated */
    active_flag?: boolean;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; name?: string; default_currency?: string; locale?: string; lang?: number; email?: string; phone?: string | null; activated?: boolean; last_login?: string; created?: string; modified?: string | null; has_created_company?: boolean; access?: ({ app?: "global" | "sales" | "campaigns" | "projects" | "account_settings" | "partnership"; admin?: boolean; permission_set_id?: string })[]; active_flag?: boolean; timezone_name?: string; timezone_offset?: string; role_id?: number; icon_url?: string | null; is_you?: boolean; is_deleted?: boolean } }>;

  /**
   * Find users by name
   */
  findUsersByName: (input: {
    /** The search term to look for */
    term: string;
    /** When enabled, the term will only be matched against email addresses of users. Default: `false`. */
    search_by_email?: 0 | 1;
  }) => Promise<{ success?: boolean } & { data?: ({ id?: number; name?: string; default_currency?: string; locale?: string; lang?: number; email?: string; phone?: string | null; activated?: boolean; last_login?: string; created?: string; modified?: string | null; has_created_company?: boolean; access?: ({ app?: "global" | "sales" | "campaigns" | "projects" | "account_settings" | "partnership"; admin?: boolean; permission_set_id?: string })[]; active_flag?: boolean; timezone_name?: string; timezone_offset?: string; role_id?: number; icon_url?: string | null; is_you?: boolean; is_deleted?: boolean })[] }>;

  /**
   * Get current user data
   */
  getCurrentUser: () => Promise<{ success?: boolean } & { data?: { id?: number; name?: string; default_currency?: string; locale?: string; lang?: number; email?: string; phone?: string | null; activated?: boolean; last_login?: string; created?: string; modified?: string | null; has_created_company?: boolean; access?: ({ app?: "global" | "sales" | "campaigns" | "projects" | "account_settings" | "partnership"; admin?: boolean; permission_set_id?: string })[]; active_flag?: boolean; timezone_name?: string; timezone_offset?: string; role_id?: number; icon_url?: string | null; is_you?: boolean; is_deleted?: boolean } & { company_id?: number; company_name?: string; company_domain?: string; company_country?: string; company_industry?: string; language?: { language_code?: string; country_code?: string } } }>;

  /**
   * Get one user
   */
  getUser: (input: {
    /** The ID of the user */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; name?: string; default_currency?: string; locale?: string; lang?: number; email?: string; phone?: string | null; activated?: boolean; last_login?: string; created?: string; modified?: string | null; has_created_company?: boolean; access?: ({ app?: "global" | "sales" | "campaigns" | "projects" | "account_settings" | "partnership"; admin?: boolean; permission_set_id?: string })[]; active_flag?: boolean; timezone_name?: string; timezone_offset?: string; role_id?: number; icon_url?: string | null; is_you?: boolean; is_deleted?: boolean } }>;

  /**
   * Update user details
   */
  updateUser: (input: {
    /** Whether the user is active or not. `false` = Not activated, `true` = Activated */
    active_flag: boolean;
    /** The ID of the user */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { id?: number; name?: string; default_currency?: string; locale?: string; lang?: number; email?: string; phone?: string | null; activated?: boolean; last_login?: string; created?: string; modified?: string | null; has_created_company?: boolean; access?: ({ app?: "global" | "sales" | "campaigns" | "projects" | "account_settings" | "partnership"; admin?: boolean; permission_set_id?: string })[]; active_flag?: boolean; timezone_name?: string; timezone_offset?: string; role_id?: number; icon_url?: string | null; is_you?: boolean; is_deleted?: boolean } }>;

  /**
   * List followers of a user
   */
  getUserFollowers: (input: {
    /** The ID of the user */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: (number)[] }>;

  /**
   * List user permissions
   */
  getUserPermissions: (input: {
    /** The ID of the user */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { can_add_custom_fields?: boolean; can_add_products?: boolean; can_add_prospects_as_leads?: boolean; can_bulk_edit_items?: boolean; can_change_visibility_of_items?: boolean; can_convert_deals_to_leads?: boolean; can_create_own_workflow?: boolean; can_delete_activities?: boolean; can_delete_custom_fields?: boolean; can_delete_deals?: boolean; can_edit_custom_fields?: boolean; can_edit_deals_closed_date?: boolean; can_edit_products?: boolean; can_edit_shared_filters?: boolean; can_export_data_from_lists?: boolean; can_follow_other_users?: boolean; can_merge_deals?: boolean; can_merge_organizations?: boolean; can_merge_people?: boolean; can_modify_labels?: boolean; can_see_company_wide_statistics?: boolean; can_see_deals_list_summary?: boolean; can_see_hidden_items_names?: boolean; can_see_other_users?: boolean; can_see_other_users_statistics?: boolean; can_see_security_dashboard?: boolean; can_share_filters?: boolean; can_share_insights?: boolean; can_use_api?: boolean; can_use_email_tracking?: boolean; can_use_import?: boolean } }>;

  /**
   * List role assignments
   */
  getUserRoleAssignments: (input: {
    /** The ID of the user */
    id: number;
    /** Pagination start */
    start?: number;
    /** Items shown per page */
    limit?: number;
  }) => Promise<{ success?: boolean } & { data?: ({ parent_role_id?: number | null; name?: string } & { user_id?: number; role_id?: number; active_flag?: boolean; type?: string })[]; additional_data?: { pagination?: { start?: number; limit?: number; more_items_in_collection?: boolean } } }>;

  /**
   * List user role settings
   */
  getUserRoleSettings: (input: {
    /** The ID of the user */
    id: number;
  }) => Promise<{ success?: boolean } & { data?: { deal_default_visibility?: number; lead_default_visibility?: number; org_default_visibility?: number; person_default_visibility?: number; product_default_visibility?: number; deal_access_level?: number; org_access_level?: number; person_access_level?: number; product_access_level?: number } }>;

  /**
   * Get all user connections
   */
  getUserConnections: () => Promise<{ success?: boolean } & { data?: { google?: string } }>;

  /**
   * List settings of an authorized user
   */
  getUserSettings: () => Promise<{ success?: boolean } & { data?: { marketplace_team?: boolean; list_limit?: number; beta_app?: boolean; prevent_salesphone_callto_override?: boolean; file_upload_destination?: string; callto_link_syntax?: string; autofill_deal_expected_close_date?: boolean; person_duplicate_condition?: string } }>;

  /**
   * Get all Webhooks
   */
  getWebhooks: () => Promise<{ success?: boolean } & { status?: string } & { data?: ({ id?: number; company_id?: number; owner_id?: number; user_id?: number; event_action?: string; event_object?: string; subscription_url?: string; version?: string; is_active?: 0 | 1; add_time?: string; remove_time?: string | null; type?: "general" | "application" | "automation"; http_auth_user?: string | null; http_auth_password?: string | null; remove_reason?: string | null; last_delivery_time?: string | null; last_http_status?: number | null; admin_id?: number; name?: string })[] }>;

  /**
   * Create a new Webhook
   */
  addWebhook: (input: {
    /** A full, valid, publicly accessible URL which determines where to send the notifications. Please note that you cannot use Pipedrive API endpoints as the `subscription_url` and the chosen URL must not redirect to another link. */
    subscription_url: string;
    /** The type of action to receive notifications about. Wildcard will match all supported actions. */
    event_action: "create" | "change" | "delete" | "*";
    /** The type of object to receive notifications about. Wildcard will match all supported objects. */
    event_object: "activity" | "deal" | "lead" | "note" | "organization" | "person" | "pipeline" | "product" | "stage" | "user" | "*";
    /** The webhook's name */
    name: string;
    /** The ID of the user that this webhook will be authorized with. You have the option to use a different user's `user_id`. If it is not set, the current user's `user_id` will be used. As each webhook event is checked against a user's permissions, the webhook will only be sent if the user has access to the specified object(s). If you want to receive notifications for all events, please use a top-level admin user’s `user_id`. */
    user_id?: number;
    /** The HTTP basic auth username of the subscription URL endpoint (if required) */
    http_auth_user?: string | null;
    /** The HTTP basic auth password of the subscription URL endpoint (if required) */
    http_auth_password?: string | null;
    /** The webhook's version. NB! Webhooks v2 is the default from March 17th, 2025. See <a href="https://developers.pipedrive.com/changelog/post/breaking-change-webhooks-v2-will-become-the-new-default-version" target="_blank" rel="noopener noreferrer">this Changelog post</a> for more details. */
    version?: "1.0" | "2.0";
  }) => Promise<{ success?: boolean } & { status?: string } & { data?: { id?: number; company_id?: number; owner_id?: number; user_id?: number; event_action?: string; event_object?: string; subscription_url?: string; version?: string; is_active?: 0 | 1; add_time?: string; remove_time?: string | null; type?: "general" | "application" | "automation"; http_auth_user?: string | null; http_auth_password?: string | null; remove_reason?: string | null; last_delivery_time?: string | null; last_http_status?: number | null; admin_id?: number; name?: string } }>;

  /**
   * Delete existing Webhook
   */
  deleteWebhook: (input: {
    /** The ID of the Webhook to delete */
    id: number;
  }) => Promise<{ success?: boolean } & { status?: string }>;
};


