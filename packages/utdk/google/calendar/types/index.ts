import type { Acl, AclRule, Calendar, CalendarList, CalendarListEntry, CalendarNotification, Channel, Colors, ConferenceData, ConferenceProperties, Event, EventAttachment, EventAttendee, EventDateTime, EventReminder, EventWorkingLocationProperties, Events, FreeBusyRequestItem, FreeBusyResponse, Setting, Settings } from "./schemas.js";

export type GoogleCalendarClient = {
  /**
   * Creates a secondary calendar.
   */
  calendarCalendarsInsert: (input: {
    /** Conferencing properties for this calendar, for example what types of conferences are allowed. */
    conferenceProperties?: ConferenceProperties;
    /** Description of the calendar. Optional. */
    description?: string;
    /** ETag of the resource. */
    etag?: string;
    /** Identifier of the calendar. To retrieve IDs call the calendarList.list() method. */
    id?: string;
    /** Type of the resource ("calendar#calendar"). */
    kind?: string;
    /** Geographic location of the calendar as free-form text. Optional. */
    location?: string;
    /** Title of the calendar. */
    summary?: string;
    /** The time zone of the calendar. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) Optional. */
    timeZone?: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<Calendar>;

  /**
   * Deletes a secondary calendar. Use calendars.clear for clearing all events on primary calendars.
   */
  calendarCalendarsDelete: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<unknown>;

  /**
   * Returns metadata for a calendar.
   */
  calendarCalendarsGet: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<Calendar>;

  /**
   * Updates metadata for a calendar. This method supports patch semantics.
   */
  calendarCalendarsPatch: (input: {
    /** Conferencing properties for this calendar, for example what types of conferences are allowed. */
    conferenceProperties?: ConferenceProperties;
    /** Description of the calendar. Optional. */
    description?: string;
    /** ETag of the resource. */
    etag?: string;
    /** Identifier of the calendar. To retrieve IDs call the calendarList.list() method. */
    id?: string;
    /** Type of the resource ("calendar#calendar"). */
    kind?: string;
    /** Geographic location of the calendar as free-form text. Optional. */
    location?: string;
    /** Title of the calendar. */
    summary?: string;
    /** The time zone of the calendar. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) Optional. */
    timeZone?: string;
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<Calendar>;

  /**
   * Updates metadata for a calendar.
   */
  calendarCalendarsUpdate: (input: {
    /** Conferencing properties for this calendar, for example what types of conferences are allowed. */
    conferenceProperties?: ConferenceProperties;
    /** Description of the calendar. Optional. */
    description?: string;
    /** ETag of the resource. */
    etag?: string;
    /** Identifier of the calendar. To retrieve IDs call the calendarList.list() method. */
    id?: string;
    /** Type of the resource ("calendar#calendar"). */
    kind?: string;
    /** Geographic location of the calendar as free-form text. Optional. */
    location?: string;
    /** Title of the calendar. */
    summary?: string;
    /** The time zone of the calendar. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) Optional. */
    timeZone?: string;
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<Calendar>;

  /**
   * Returns the rules in the access control list for the calendar.
   */
  calendarAclList: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
    maxResults?: number;
    /** Token specifying which result page to return. Optional. */
    pageToken?: string;
    /** Whether to include deleted ACLs in the result. Deleted ACLs are represented by role equal to "none". Deleted ACLs will always be included if syncToken is provided. Optional. The default is False. */
    showDeleted?: boolean;
    /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All entries deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
    syncToken?: string;
  }) => Promise<Acl>;

  /**
   * Creates an access control rule.
   */
  calendarAclInsert: (input: {
    /** ETag of the resource. */
    etag?: string;
    /** Identifier of the Access Control List (ACL) rule. See Sharing calendars. */
    id?: string;
    /** Type of the resource ("calendar#aclRule"). */
    kind?: string;
    /** The role assigned to the scope. Possible values are:   - "none" - Provides no access.  - "freeBusyReader" - Provides read access to free/busy information.  - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden.  - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible.  - "owner" - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs. */
    role?: string;
    /** The extent to which calendar access is granted by this ACL rule. */
    scope?: { type?: string; value?: string };
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Whether to send notifications about the calendar sharing change. Optional. The default is True. */
    sendNotifications?: boolean;
  }) => Promise<AclRule>;

  /**
   * Watch for changes to ACL resources.
   */
  calendarAclWatch: (input: {
    /** The address where notifications are delivered for this channel. */
    address?: string;
    /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
    expiration?: string;
    /** A UUID or similar unique string that identifies this channel. */
    id?: string;
    /** Identifies this as a notification channel used to watch for changes to a resource, which is "api#channel". */
    kind?: string;
    /** Additional parameters controlling delivery channel behavior. Optional. */
    params?: { [key: string]: string | undefined };
    /** A Boolean value to indicate whether payload is wanted. Optional. */
    payload?: boolean;
    /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
    resourceId?: string;
    /** A version-specific identifier for the watched resource. */
    resourceUri?: string;
    /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
    token?: string;
    /** The type of delivery mechanism used for this channel. Valid values are "web_hook" (or "webhook"). Both values refer to a channel where Http requests are used to deliver messages. */
    type?: string;
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
    maxResults?: number;
    /** Token specifying which result page to return. Optional. */
    pageToken?: string;
    /** Whether to include deleted ACLs in the result. Deleted ACLs are represented by role equal to "none". Deleted ACLs will always be included if syncToken is provided. Optional. The default is False. */
    showDeleted?: boolean;
    /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All entries deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
    syncToken?: string;
  }) => Promise<Channel>;

  /**
   * Deletes an access control rule.
   */
  calendarAclDelete: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** ACL rule identifier. */
    ruleId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<unknown>;

  /**
   * Returns an access control rule.
   */
  calendarAclGet: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** ACL rule identifier. */
    ruleId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<AclRule>;

  /**
   * Updates an access control rule. This method supports patch semantics.
   */
  calendarAclPatch: (input: {
    /** ETag of the resource. */
    etag?: string;
    /** Identifier of the Access Control List (ACL) rule. See Sharing calendars. */
    id?: string;
    /** Type of the resource ("calendar#aclRule"). */
    kind?: string;
    /** The role assigned to the scope. Possible values are:   - "none" - Provides no access.  - "freeBusyReader" - Provides read access to free/busy information.  - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden.  - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible.  - "owner" - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs. */
    role?: string;
    /** The extent to which calendar access is granted by this ACL rule. */
    scope?: { type?: string; value?: string };
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** ACL rule identifier. */
    ruleId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Whether to send notifications about the calendar sharing change. Note that there are no notifications on access removal. Optional. The default is True. */
    sendNotifications?: boolean;
  }) => Promise<AclRule>;

  /**
   * Updates an access control rule.
   */
  calendarAclUpdate: (input: {
    /** ETag of the resource. */
    etag?: string;
    /** Identifier of the Access Control List (ACL) rule. See Sharing calendars. */
    id?: string;
    /** Type of the resource ("calendar#aclRule"). */
    kind?: string;
    /** The role assigned to the scope. Possible values are:   - "none" - Provides no access.  - "freeBusyReader" - Provides read access to free/busy information.  - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden.  - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible.  - "owner" - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs. */
    role?: string;
    /** The extent to which calendar access is granted by this ACL rule. */
    scope?: { type?: string; value?: string };
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** ACL rule identifier. */
    ruleId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Whether to send notifications about the calendar sharing change. Note that there are no notifications on access removal. Optional. The default is True. */
    sendNotifications?: boolean;
  }) => Promise<AclRule>;

  /**
   * Clears a primary calendar. This operation deletes all events associated with the primary calendar of an account.
   */
  calendarCalendarsClear: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<unknown>;

  /**
   * Returns events on the specified calendar.
   */
  calendarEventsList: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided). */
    alwaysIncludeEmail?: boolean;
    /** Event types to return. Optional. Possible values are:  - "default"  - "focusTime"  - "outOfOffice"This parameter can be repeated multiple times to return events of different types. Currently, this is the only allowed value for this field:  - ["default", "focusTime", "outOfOffice"] This value will be the default.  If you're enrolled in the Working Location developer preview program, in addition to the default value above you can also set the "workingLocation" event type:  - ["default", "focusTime", "outOfOffice", "workingLocation"]  - ["workingLocation"] Additional combinations of these 4 event types will be made available in later releases. Developer Preview. */
    eventTypes?: (string)[];
    /** Specifies an event ID in the iCalendar format to be provided in the response. Optional. Use this if you want to search for an event by its iCalendar ID. */
    iCalUID?: string;
    /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
    maxAttendees?: number;
    /** Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional. */
    maxResults?: number;
    /** The order of the events returned in the result. Optional. The default is an unspecified, stable order. */
    orderBy?: "startTime" | "updated";
    /** Token specifying which result page to return. Optional. */
    pageToken?: string;
    /** Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints. */
    privateExtendedProperty?: (string)[];
    /** Free text search terms to find events that match these terms in the following fields: summary, description, location, attendee's displayName, attendee's email. Optional. */
    q?: string;
    /** Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints. */
    sharedExtendedProperty?: (string)[];
    /** Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False. */
    showDeleted?: boolean;
    /** Whether to include hidden invitations in the result. Optional. The default is False. */
    showHiddenInvitations?: boolean;
    /** Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False. */
    singleEvents?: boolean;
    /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False. There are several query parameters that cannot be specified together with nextSyncToken to ensure consistency of the client state.  These are:  - iCalUID  - orderBy  - privateExtendedProperty  - q  - sharedExtendedProperty  - timeMin  - timeMax  - updatedMin If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
    syncToken?: string;
    /** Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin. */
    timeMax?: string;
    /** Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax. */
    timeMin?: string;
    /** Time zone used in the response. Optional. The default is the time zone of the calendar. */
    timeZone?: string;
    /** Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time. */
    updatedMin?: string;
  }) => Promise<Events>;

  /**
   * Creates an event.
   */
  calendarEventsInsert: (input: {
    /** Whether anyone can invite themselves to the event (deprecated). Optional. The default is False. */
    anyoneCanAddSelf?: boolean;
    /** File attachments for the event. In order to modify attachments the supportsAttachments request parameter should be set to true. There can be at most 25 attachments per event, */
    attachments?: (EventAttachment)[];
    /** The attendees of the event. See the Events with attendees guide for more information on scheduling events with other calendar users. Service accounts need to use domain-wide delegation of authority to populate the attendee list. */
    attendees?: (EventAttendee)[];
    /** Whether attendees may have been omitted from the event's representation. When retrieving an event, this may be due to a restriction specified by the maxAttendee query parameter. When updating an event, this can be used to only update the participant's response. Optional. The default is False. */
    attendeesOmitted?: boolean;
    /** The color of the event. This is an ID referring to an entry in the event section of the colors definition (see the  colors endpoint). Optional. */
    colorId?: string;
    /** The conference-related information, such as details of a Google Meet conference. To create new conference details use the createRequest field. To persist your changes, remember to set the conferenceDataVersion request parameter to 1 for all event modification requests. */
    conferenceData?: ConferenceData;
    /** Creation time of the event (as a RFC3339 timestamp). Read-only. */
    created?: string;
    /** The creator of the event. Read-only. */
    creator?: { displayName?: string; email?: string; id?: string; self?: boolean };
    /** Description of the event. Can contain HTML. Optional. */
    description?: string;
    /** The (exclusive) end time of the event. For a recurring event, this is the end time of the first instance. */
    end?: EventDateTime;
    /** Whether the end time is actually unspecified. An end time is still provided for compatibility reasons, even if this attribute is set to True. The default is False. */
    endTimeUnspecified?: boolean;
    /** ETag of the resource. */
    etag?: string;
    /** Specific type of the event. Read-only. Possible values are:   - "default" - A regular event or not further specified.  - "outOfOffice" - An out-of-office event.  - "focusTime" - A focus-time event.  - "workingLocation" - A working location event. Developer Preview. */
    eventType?: string;
    /** Extended properties of the event. */
    extendedProperties?: { private?: { [key: string]: string | undefined }; shared?: { [key: string]: string | undefined } };
    /** A gadget that extends this event. Gadgets are deprecated; this structure is instead only used for returning birthday calendar metadata. */
    gadget?: { display?: string; height?: number; iconLink?: string; link?: string; preferences?: { [key: string]: string | undefined }; title?: string; type?: string; width?: number };
    /** Whether attendees other than the organizer can invite others to the event. Optional. The default is True. */
    guestsCanInviteOthers?: boolean;
    /** Whether attendees other than the organizer can modify the event. Optional. The default is False. */
    guestsCanModify?: boolean;
    /** Whether attendees other than the organizer can see who the event's attendees are. Optional. The default is True. */
    guestsCanSeeOtherGuests?: boolean;
    /** An absolute link to the Google Hangout associated with this event. Read-only. */
    hangoutLink?: string;
    /** An absolute link to this event in the Google Calendar Web UI. Read-only. */
    htmlLink?: string;
    /** Event unique identifier as defined in RFC5545. It is used to uniquely identify events accross calendaring systems and must be supplied when importing events via the import method. Note that the iCalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same iCalUIDs. To retrieve an event using its iCalUID, call the events.list method using the iCalUID parameter. To retrieve an event using its id, call the events.get method. */
    iCalUID?: string;
    /** Opaque identifier of the event. When creating new single or recurring events, you can specify their IDs. Provided IDs must follow these rules:   - characters allowed in the ID are those used in base32hex encoding, i.e. lowercase letters a-v and digits 0-9, see section 3.1.2 in RFC2938  - the length of the ID must be between 5 and 1024 characters  - the ID must be unique per calendar  Due to the globally distributed nature of the system, we cannot guarantee that ID collisions will be detected at event creation time. To minimize the risk of collisions we recommend using an established UUID algorithm such as one described in RFC4122. If you do not specify an ID, it will be automatically generated by the server. Note that the icalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same icalUIDs. */
    id?: string;
    /** Type of the resource ("calendar#event"). */
    kind?: string;
    /** Geographic location of the event as free-form text. Optional. */
    location?: string;
    /** Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". The default is False. Read-Only. */
    locked?: boolean;
    /** The organizer of the event. If the organizer is also an attendee, this is indicated with a separate entry in attendees with the organizer field set to True. To change the organizer, use the move operation. Read-only, except when importing an event. */
    organizer?: { displayName?: string; email?: string; id?: string; self?: boolean };
    /** For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. It uniquely identifies the instance within the recurring event series even if the instance was moved to a different time. Immutable. */
    originalStartTime?: EventDateTime;
    /** If set to True, Event propagation is disabled. Note that it is not the same thing as Private event properties. Optional. Immutable. The default is False. */
    privateCopy?: boolean;
    /** List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields. This field is omitted for single events or instances of recurring events. */
    recurrence?: (string)[];
    /** For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. Immutable. */
    recurringEventId?: string;
    /** Information about the event's reminders for the authenticated user. */
    reminders?: { overrides?: (EventReminder)[]; useDefault?: boolean };
    /** Sequence number as per iCalendar. */
    sequence?: number;
    /** Source from which the event was created. For example, a web page, an email message or any document identifiable by an URL with HTTP or HTTPS scheme. Can only be seen or modified by the creator of the event. */
    source?: { title?: string; url?: string };
    /** The (inclusive) start time of the event. For a recurring event, this is the start time of the first instance. */
    start?: EventDateTime;
    /** Status of the event. Optional. Possible values are:   - "confirmed" - The event is confirmed. This is the default status.  - "tentative" - The event is tentatively confirmed.  - "cancelled" - The event is cancelled (deleted). The list method returns cancelled events only on incremental sync (when syncToken or updatedMin are specified) or if the showDeleted flag is set to true. The get method always returns them. A cancelled status represents two different states depending on the event type:   - Cancelled exceptions of an uncancelled recurring event indicate that this instance should no longer be presented to the user. Clients should store these events for the lifetime of the parent recurring event. Cancelled exceptions are only guaranteed to have values for the id, recurringEventId and originalStartTime fields populated. The other fields might be empty.   - All other cancelled events represent deleted events. Clients should remove their locally synced copies. Such cancelled events will eventually disappear, so do not rely on them being available indefinitely. Deleted events are only guaranteed to have the id field populated.   On the organizer's calendar, cancelled events continue to expose event details (summary, location, etc.) so that they can be restored (undeleted). Similarly, the events to which the user was invited and that they manually removed continue to provide details. However, incremental sync requests with showDeleted set to false will not return these details. If an event changes its organizer (for example via the move operation) and the original organizer is not on the attendee list, it will leave behind a cancelled event where only the id field is guaranteed to be populated. */
    status?: string;
    /** Title of the event. */
    summary?: string;
    /** Whether the event blocks time on the calendar. Optional. Possible values are:   - "opaque" - Default value. The event does block time on the calendar. This is equivalent to setting Show me as to Busy in the Calendar UI.  - "transparent" - The event does not block time on the calendar. This is equivalent to setting Show me as to Available in the Calendar UI. */
    transparency?: string;
    /** Last modification time of the event (as a RFC3339 timestamp). Read-only. */
    updated?: string;
    /** Visibility of the event. Optional. Possible values are:   - "default" - Uses the default visibility for events on the calendar. This is the default value.  - "public" - The event is public and event details are visible to all readers of the calendar.  - "private" - The event is private and only event attendees may view event details.  - "confidential" - The event is private. This value is provided for compatibility reasons. */
    visibility?: string;
    /** Developer Preview: Working Location event data. Read-only. */
    workingLocationProperties?: EventWorkingLocationProperties;
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. */
    conferenceDataVersion?: number;
    /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
    maxAttendees?: number;
    /** Deprecated. Please use sendUpdates instead.  Whether to send notifications about the creation of the new event. Note that some emails might still be sent even if you set the value to false. The default is false. */
    sendNotifications?: boolean;
    /** Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false. */
    sendUpdates?: "all" | "externalOnly" | "none";
    /** Whether API client performing operation supports event attachments. Optional. The default is False. */
    supportsAttachments?: boolean;
  }) => Promise<Event>;

  /**
   * Imports an event. This operation is used to add a private copy of an existing event to a calendar.
   */
  calendarEventsImport: (input: {
    /** Whether anyone can invite themselves to the event (deprecated). Optional. The default is False. */
    anyoneCanAddSelf?: boolean;
    /** File attachments for the event. In order to modify attachments the supportsAttachments request parameter should be set to true. There can be at most 25 attachments per event, */
    attachments?: (EventAttachment)[];
    /** The attendees of the event. See the Events with attendees guide for more information on scheduling events with other calendar users. Service accounts need to use domain-wide delegation of authority to populate the attendee list. */
    attendees?: (EventAttendee)[];
    /** Whether attendees may have been omitted from the event's representation. When retrieving an event, this may be due to a restriction specified by the maxAttendee query parameter. When updating an event, this can be used to only update the participant's response. Optional. The default is False. */
    attendeesOmitted?: boolean;
    /** The color of the event. This is an ID referring to an entry in the event section of the colors definition (see the  colors endpoint). Optional. */
    colorId?: string;
    /** The conference-related information, such as details of a Google Meet conference. To create new conference details use the createRequest field. To persist your changes, remember to set the conferenceDataVersion request parameter to 1 for all event modification requests. */
    conferenceData?: ConferenceData;
    /** Creation time of the event (as a RFC3339 timestamp). Read-only. */
    created?: string;
    /** The creator of the event. Read-only. */
    creator?: { displayName?: string; email?: string; id?: string; self?: boolean };
    /** Description of the event. Can contain HTML. Optional. */
    description?: string;
    /** The (exclusive) end time of the event. For a recurring event, this is the end time of the first instance. */
    end?: EventDateTime;
    /** Whether the end time is actually unspecified. An end time is still provided for compatibility reasons, even if this attribute is set to True. The default is False. */
    endTimeUnspecified?: boolean;
    /** ETag of the resource. */
    etag?: string;
    /** Specific type of the event. Read-only. Possible values are:   - "default" - A regular event or not further specified.  - "outOfOffice" - An out-of-office event.  - "focusTime" - A focus-time event.  - "workingLocation" - A working location event. Developer Preview. */
    eventType?: string;
    /** Extended properties of the event. */
    extendedProperties?: { private?: { [key: string]: string | undefined }; shared?: { [key: string]: string | undefined } };
    /** A gadget that extends this event. Gadgets are deprecated; this structure is instead only used for returning birthday calendar metadata. */
    gadget?: { display?: string; height?: number; iconLink?: string; link?: string; preferences?: { [key: string]: string | undefined }; title?: string; type?: string; width?: number };
    /** Whether attendees other than the organizer can invite others to the event. Optional. The default is True. */
    guestsCanInviteOthers?: boolean;
    /** Whether attendees other than the organizer can modify the event. Optional. The default is False. */
    guestsCanModify?: boolean;
    /** Whether attendees other than the organizer can see who the event's attendees are. Optional. The default is True. */
    guestsCanSeeOtherGuests?: boolean;
    /** An absolute link to the Google Hangout associated with this event. Read-only. */
    hangoutLink?: string;
    /** An absolute link to this event in the Google Calendar Web UI. Read-only. */
    htmlLink?: string;
    /** Event unique identifier as defined in RFC5545. It is used to uniquely identify events accross calendaring systems and must be supplied when importing events via the import method. Note that the iCalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same iCalUIDs. To retrieve an event using its iCalUID, call the events.list method using the iCalUID parameter. To retrieve an event using its id, call the events.get method. */
    iCalUID?: string;
    /** Opaque identifier of the event. When creating new single or recurring events, you can specify their IDs. Provided IDs must follow these rules:   - characters allowed in the ID are those used in base32hex encoding, i.e. lowercase letters a-v and digits 0-9, see section 3.1.2 in RFC2938  - the length of the ID must be between 5 and 1024 characters  - the ID must be unique per calendar  Due to the globally distributed nature of the system, we cannot guarantee that ID collisions will be detected at event creation time. To minimize the risk of collisions we recommend using an established UUID algorithm such as one described in RFC4122. If you do not specify an ID, it will be automatically generated by the server. Note that the icalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same icalUIDs. */
    id?: string;
    /** Type of the resource ("calendar#event"). */
    kind?: string;
    /** Geographic location of the event as free-form text. Optional. */
    location?: string;
    /** Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". The default is False. Read-Only. */
    locked?: boolean;
    /** The organizer of the event. If the organizer is also an attendee, this is indicated with a separate entry in attendees with the organizer field set to True. To change the organizer, use the move operation. Read-only, except when importing an event. */
    organizer?: { displayName?: string; email?: string; id?: string; self?: boolean };
    /** For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. It uniquely identifies the instance within the recurring event series even if the instance was moved to a different time. Immutable. */
    originalStartTime?: EventDateTime;
    /** If set to True, Event propagation is disabled. Note that it is not the same thing as Private event properties. Optional. Immutable. The default is False. */
    privateCopy?: boolean;
    /** List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields. This field is omitted for single events or instances of recurring events. */
    recurrence?: (string)[];
    /** For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. Immutable. */
    recurringEventId?: string;
    /** Information about the event's reminders for the authenticated user. */
    reminders?: { overrides?: (EventReminder)[]; useDefault?: boolean };
    /** Sequence number as per iCalendar. */
    sequence?: number;
    /** Source from which the event was created. For example, a web page, an email message or any document identifiable by an URL with HTTP or HTTPS scheme. Can only be seen or modified by the creator of the event. */
    source?: { title?: string; url?: string };
    /** The (inclusive) start time of the event. For a recurring event, this is the start time of the first instance. */
    start?: EventDateTime;
    /** Status of the event. Optional. Possible values are:   - "confirmed" - The event is confirmed. This is the default status.  - "tentative" - The event is tentatively confirmed.  - "cancelled" - The event is cancelled (deleted). The list method returns cancelled events only on incremental sync (when syncToken or updatedMin are specified) or if the showDeleted flag is set to true. The get method always returns them. A cancelled status represents two different states depending on the event type:   - Cancelled exceptions of an uncancelled recurring event indicate that this instance should no longer be presented to the user. Clients should store these events for the lifetime of the parent recurring event. Cancelled exceptions are only guaranteed to have values for the id, recurringEventId and originalStartTime fields populated. The other fields might be empty.   - All other cancelled events represent deleted events. Clients should remove their locally synced copies. Such cancelled events will eventually disappear, so do not rely on them being available indefinitely. Deleted events are only guaranteed to have the id field populated.   On the organizer's calendar, cancelled events continue to expose event details (summary, location, etc.) so that they can be restored (undeleted). Similarly, the events to which the user was invited and that they manually removed continue to provide details. However, incremental sync requests with showDeleted set to false will not return these details. If an event changes its organizer (for example via the move operation) and the original organizer is not on the attendee list, it will leave behind a cancelled event where only the id field is guaranteed to be populated. */
    status?: string;
    /** Title of the event. */
    summary?: string;
    /** Whether the event blocks time on the calendar. Optional. Possible values are:   - "opaque" - Default value. The event does block time on the calendar. This is equivalent to setting Show me as to Busy in the Calendar UI.  - "transparent" - The event does not block time on the calendar. This is equivalent to setting Show me as to Available in the Calendar UI. */
    transparency?: string;
    /** Last modification time of the event (as a RFC3339 timestamp). Read-only. */
    updated?: string;
    /** Visibility of the event. Optional. Possible values are:   - "default" - Uses the default visibility for events on the calendar. This is the default value.  - "public" - The event is public and event details are visible to all readers of the calendar.  - "private" - The event is private and only event attendees may view event details.  - "confidential" - The event is private. This value is provided for compatibility reasons. */
    visibility?: string;
    /** Developer Preview: Working Location event data. Read-only. */
    workingLocationProperties?: EventWorkingLocationProperties;
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. */
    conferenceDataVersion?: number;
    /** Whether API client performing operation supports event attachments. Optional. The default is False. */
    supportsAttachments?: boolean;
  }) => Promise<Event>;

  /**
   * Creates an event based on a simple text string.
   */
  calendarEventsQuickAdd: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** The text describing the event to be created. */
    text: string;
    /** Deprecated. Please use sendUpdates instead.  Whether to send notifications about the creation of the event. Note that some emails might still be sent even if you set the value to false. The default is false. */
    sendNotifications?: boolean;
    /** Guests who should receive notifications about the creation of the new event. */
    sendUpdates?: "all" | "externalOnly" | "none";
  }) => Promise<Event>;

  /**
   * Watch for changes to Events resources.
   */
  calendarEventsWatch: (input: {
    /** The address where notifications are delivered for this channel. */
    address?: string;
    /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
    expiration?: string;
    /** A UUID or similar unique string that identifies this channel. */
    id?: string;
    /** Identifies this as a notification channel used to watch for changes to a resource, which is "api#channel". */
    kind?: string;
    /** Additional parameters controlling delivery channel behavior. Optional. */
    params?: { [key: string]: string | undefined };
    /** A Boolean value to indicate whether payload is wanted. Optional. */
    payload?: boolean;
    /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
    resourceId?: string;
    /** A version-specific identifier for the watched resource. */
    resourceUri?: string;
    /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
    token?: string;
    /** The type of delivery mechanism used for this channel. Valid values are "web_hook" (or "webhook"). Both values refer to a channel where Http requests are used to deliver messages. */
    type?: string;
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided). */
    alwaysIncludeEmail?: boolean;
    /** Event types to return. Optional. Possible values are:  - "default"  - "focusTime"  - "outOfOffice"This parameter can be repeated multiple times to return events of different types. Currently, this is the only allowed value for this field:  - ["default", "focusTime", "outOfOffice"] This value will be the default.  If you're enrolled in the Working Location developer preview program, in addition to the default value above you can also set the "workingLocation" event type:  - ["default", "focusTime", "outOfOffice", "workingLocation"]  - ["workingLocation"] Additional combinations of these 4 event types will be made available in later releases. Developer Preview. */
    eventTypes?: (string)[];
    /** Specifies an event ID in the iCalendar format to be provided in the response. Optional. Use this if you want to search for an event by its iCalendar ID. */
    iCalUID?: string;
    /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
    maxAttendees?: number;
    /** Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional. */
    maxResults?: number;
    /** The order of the events returned in the result. Optional. The default is an unspecified, stable order. */
    orderBy?: "startTime" | "updated";
    /** Token specifying which result page to return. Optional. */
    pageToken?: string;
    /** Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints. */
    privateExtendedProperty?: (string)[];
    /** Free text search terms to find events that match these terms in the following fields: summary, description, location, attendee's displayName, attendee's email. Optional. */
    q?: string;
    /** Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints. */
    sharedExtendedProperty?: (string)[];
    /** Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False. */
    showDeleted?: boolean;
    /** Whether to include hidden invitations in the result. Optional. The default is False. */
    showHiddenInvitations?: boolean;
    /** Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False. */
    singleEvents?: boolean;
    /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False. There are several query parameters that cannot be specified together with nextSyncToken to ensure consistency of the client state.  These are:  - iCalUID  - orderBy  - privateExtendedProperty  - q  - sharedExtendedProperty  - timeMin  - timeMax  - updatedMin If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
    syncToken?: string;
    /** Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin. */
    timeMax?: string;
    /** Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax. */
    timeMin?: string;
    /** Time zone used in the response. Optional. The default is the time zone of the calendar. */
    timeZone?: string;
    /** Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time. */
    updatedMin?: string;
  }) => Promise<Channel>;

  /**
   * Deletes an event.
   */
  calendarEventsDelete: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Event identifier. */
    eventId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Deprecated. Please use sendUpdates instead.  Whether to send notifications about the deletion of the event. Note that some emails might still be sent even if you set the value to false. The default is false. */
    sendNotifications?: boolean;
    /** Guests who should receive notifications about the deletion of the event. */
    sendUpdates?: "all" | "externalOnly" | "none";
  }) => Promise<unknown>;

  /**
   * Returns an event based on its Google Calendar ID. To retrieve an event using its iCalendar ID, call the events.list method using the iCalUID parameter.
   */
  calendarEventsGet: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Event identifier. */
    eventId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided). */
    alwaysIncludeEmail?: boolean;
    /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
    maxAttendees?: number;
    /** Time zone used in the response. Optional. The default is the time zone of the calendar. */
    timeZone?: string;
  }) => Promise<Event>;

  /**
   * Updates an event. This method supports patch semantics.
   */
  calendarEventsPatch: (input: {
    /** Whether anyone can invite themselves to the event (deprecated). Optional. The default is False. */
    anyoneCanAddSelf?: boolean;
    /** File attachments for the event. In order to modify attachments the supportsAttachments request parameter should be set to true. There can be at most 25 attachments per event, */
    attachments?: (EventAttachment)[];
    /** The attendees of the event. See the Events with attendees guide for more information on scheduling events with other calendar users. Service accounts need to use domain-wide delegation of authority to populate the attendee list. */
    attendees?: (EventAttendee)[];
    /** Whether attendees may have been omitted from the event's representation. When retrieving an event, this may be due to a restriction specified by the maxAttendee query parameter. When updating an event, this can be used to only update the participant's response. Optional. The default is False. */
    attendeesOmitted?: boolean;
    /** The color of the event. This is an ID referring to an entry in the event section of the colors definition (see the  colors endpoint). Optional. */
    colorId?: string;
    /** The conference-related information, such as details of a Google Meet conference. To create new conference details use the createRequest field. To persist your changes, remember to set the conferenceDataVersion request parameter to 1 for all event modification requests. */
    conferenceData?: ConferenceData;
    /** Creation time of the event (as a RFC3339 timestamp). Read-only. */
    created?: string;
    /** The creator of the event. Read-only. */
    creator?: { displayName?: string; email?: string; id?: string; self?: boolean };
    /** Description of the event. Can contain HTML. Optional. */
    description?: string;
    /** The (exclusive) end time of the event. For a recurring event, this is the end time of the first instance. */
    end?: EventDateTime;
    /** Whether the end time is actually unspecified. An end time is still provided for compatibility reasons, even if this attribute is set to True. The default is False. */
    endTimeUnspecified?: boolean;
    /** ETag of the resource. */
    etag?: string;
    /** Specific type of the event. Read-only. Possible values are:   - "default" - A regular event or not further specified.  - "outOfOffice" - An out-of-office event.  - "focusTime" - A focus-time event.  - "workingLocation" - A working location event. Developer Preview. */
    eventType?: string;
    /** Extended properties of the event. */
    extendedProperties?: { private?: { [key: string]: string | undefined }; shared?: { [key: string]: string | undefined } };
    /** A gadget that extends this event. Gadgets are deprecated; this structure is instead only used for returning birthday calendar metadata. */
    gadget?: { display?: string; height?: number; iconLink?: string; link?: string; preferences?: { [key: string]: string | undefined }; title?: string; type?: string; width?: number };
    /** Whether attendees other than the organizer can invite others to the event. Optional. The default is True. */
    guestsCanInviteOthers?: boolean;
    /** Whether attendees other than the organizer can modify the event. Optional. The default is False. */
    guestsCanModify?: boolean;
    /** Whether attendees other than the organizer can see who the event's attendees are. Optional. The default is True. */
    guestsCanSeeOtherGuests?: boolean;
    /** An absolute link to the Google Hangout associated with this event. Read-only. */
    hangoutLink?: string;
    /** An absolute link to this event in the Google Calendar Web UI. Read-only. */
    htmlLink?: string;
    /** Event unique identifier as defined in RFC5545. It is used to uniquely identify events accross calendaring systems and must be supplied when importing events via the import method. Note that the iCalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same iCalUIDs. To retrieve an event using its iCalUID, call the events.list method using the iCalUID parameter. To retrieve an event using its id, call the events.get method. */
    iCalUID?: string;
    /** Opaque identifier of the event. When creating new single or recurring events, you can specify their IDs. Provided IDs must follow these rules:   - characters allowed in the ID are those used in base32hex encoding, i.e. lowercase letters a-v and digits 0-9, see section 3.1.2 in RFC2938  - the length of the ID must be between 5 and 1024 characters  - the ID must be unique per calendar  Due to the globally distributed nature of the system, we cannot guarantee that ID collisions will be detected at event creation time. To minimize the risk of collisions we recommend using an established UUID algorithm such as one described in RFC4122. If you do not specify an ID, it will be automatically generated by the server. Note that the icalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same icalUIDs. */
    id?: string;
    /** Type of the resource ("calendar#event"). */
    kind?: string;
    /** Geographic location of the event as free-form text. Optional. */
    location?: string;
    /** Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". The default is False. Read-Only. */
    locked?: boolean;
    /** The organizer of the event. If the organizer is also an attendee, this is indicated with a separate entry in attendees with the organizer field set to True. To change the organizer, use the move operation. Read-only, except when importing an event. */
    organizer?: { displayName?: string; email?: string; id?: string; self?: boolean };
    /** For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. It uniquely identifies the instance within the recurring event series even if the instance was moved to a different time. Immutable. */
    originalStartTime?: EventDateTime;
    /** If set to True, Event propagation is disabled. Note that it is not the same thing as Private event properties. Optional. Immutable. The default is False. */
    privateCopy?: boolean;
    /** List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields. This field is omitted for single events or instances of recurring events. */
    recurrence?: (string)[];
    /** For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. Immutable. */
    recurringEventId?: string;
    /** Information about the event's reminders for the authenticated user. */
    reminders?: { overrides?: (EventReminder)[]; useDefault?: boolean };
    /** Sequence number as per iCalendar. */
    sequence?: number;
    /** Source from which the event was created. For example, a web page, an email message or any document identifiable by an URL with HTTP or HTTPS scheme. Can only be seen or modified by the creator of the event. */
    source?: { title?: string; url?: string };
    /** The (inclusive) start time of the event. For a recurring event, this is the start time of the first instance. */
    start?: EventDateTime;
    /** Status of the event. Optional. Possible values are:   - "confirmed" - The event is confirmed. This is the default status.  - "tentative" - The event is tentatively confirmed.  - "cancelled" - The event is cancelled (deleted). The list method returns cancelled events only on incremental sync (when syncToken or updatedMin are specified) or if the showDeleted flag is set to true. The get method always returns them. A cancelled status represents two different states depending on the event type:   - Cancelled exceptions of an uncancelled recurring event indicate that this instance should no longer be presented to the user. Clients should store these events for the lifetime of the parent recurring event. Cancelled exceptions are only guaranteed to have values for the id, recurringEventId and originalStartTime fields populated. The other fields might be empty.   - All other cancelled events represent deleted events. Clients should remove their locally synced copies. Such cancelled events will eventually disappear, so do not rely on them being available indefinitely. Deleted events are only guaranteed to have the id field populated.   On the organizer's calendar, cancelled events continue to expose event details (summary, location, etc.) so that they can be restored (undeleted). Similarly, the events to which the user was invited and that they manually removed continue to provide details. However, incremental sync requests with showDeleted set to false will not return these details. If an event changes its organizer (for example via the move operation) and the original organizer is not on the attendee list, it will leave behind a cancelled event where only the id field is guaranteed to be populated. */
    status?: string;
    /** Title of the event. */
    summary?: string;
    /** Whether the event blocks time on the calendar. Optional. Possible values are:   - "opaque" - Default value. The event does block time on the calendar. This is equivalent to setting Show me as to Busy in the Calendar UI.  - "transparent" - The event does not block time on the calendar. This is equivalent to setting Show me as to Available in the Calendar UI. */
    transparency?: string;
    /** Last modification time of the event (as a RFC3339 timestamp). Read-only. */
    updated?: string;
    /** Visibility of the event. Optional. Possible values are:   - "default" - Uses the default visibility for events on the calendar. This is the default value.  - "public" - The event is public and event details are visible to all readers of the calendar.  - "private" - The event is private and only event attendees may view event details.  - "confidential" - The event is private. This value is provided for compatibility reasons. */
    visibility?: string;
    /** Developer Preview: Working Location event data. Read-only. */
    workingLocationProperties?: EventWorkingLocationProperties;
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Event identifier. */
    eventId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided). */
    alwaysIncludeEmail?: boolean;
    /** Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. */
    conferenceDataVersion?: number;
    /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
    maxAttendees?: number;
    /** Deprecated. Please use sendUpdates instead.  Whether to send notifications about the event update (for example, description changes, etc.). Note that some emails might still be sent even if you set the value to false. The default is false. */
    sendNotifications?: boolean;
    /** Guests who should receive notifications about the event update (for example, title changes, etc.). */
    sendUpdates?: "all" | "externalOnly" | "none";
    /** Whether API client performing operation supports event attachments. Optional. The default is False. */
    supportsAttachments?: boolean;
  }) => Promise<Event>;

  /**
   * Updates an event.
   */
  calendarEventsUpdate: (input: {
    /** Whether anyone can invite themselves to the event (deprecated). Optional. The default is False. */
    anyoneCanAddSelf?: boolean;
    /** File attachments for the event. In order to modify attachments the supportsAttachments request parameter should be set to true. There can be at most 25 attachments per event, */
    attachments?: (EventAttachment)[];
    /** The attendees of the event. See the Events with attendees guide for more information on scheduling events with other calendar users. Service accounts need to use domain-wide delegation of authority to populate the attendee list. */
    attendees?: (EventAttendee)[];
    /** Whether attendees may have been omitted from the event's representation. When retrieving an event, this may be due to a restriction specified by the maxAttendee query parameter. When updating an event, this can be used to only update the participant's response. Optional. The default is False. */
    attendeesOmitted?: boolean;
    /** The color of the event. This is an ID referring to an entry in the event section of the colors definition (see the  colors endpoint). Optional. */
    colorId?: string;
    /** The conference-related information, such as details of a Google Meet conference. To create new conference details use the createRequest field. To persist your changes, remember to set the conferenceDataVersion request parameter to 1 for all event modification requests. */
    conferenceData?: ConferenceData;
    /** Creation time of the event (as a RFC3339 timestamp). Read-only. */
    created?: string;
    /** The creator of the event. Read-only. */
    creator?: { displayName?: string; email?: string; id?: string; self?: boolean };
    /** Description of the event. Can contain HTML. Optional. */
    description?: string;
    /** The (exclusive) end time of the event. For a recurring event, this is the end time of the first instance. */
    end?: EventDateTime;
    /** Whether the end time is actually unspecified. An end time is still provided for compatibility reasons, even if this attribute is set to True. The default is False. */
    endTimeUnspecified?: boolean;
    /** ETag of the resource. */
    etag?: string;
    /** Specific type of the event. Read-only. Possible values are:   - "default" - A regular event or not further specified.  - "outOfOffice" - An out-of-office event.  - "focusTime" - A focus-time event.  - "workingLocation" - A working location event. Developer Preview. */
    eventType?: string;
    /** Extended properties of the event. */
    extendedProperties?: { private?: { [key: string]: string | undefined }; shared?: { [key: string]: string | undefined } };
    /** A gadget that extends this event. Gadgets are deprecated; this structure is instead only used for returning birthday calendar metadata. */
    gadget?: { display?: string; height?: number; iconLink?: string; link?: string; preferences?: { [key: string]: string | undefined }; title?: string; type?: string; width?: number };
    /** Whether attendees other than the organizer can invite others to the event. Optional. The default is True. */
    guestsCanInviteOthers?: boolean;
    /** Whether attendees other than the organizer can modify the event. Optional. The default is False. */
    guestsCanModify?: boolean;
    /** Whether attendees other than the organizer can see who the event's attendees are. Optional. The default is True. */
    guestsCanSeeOtherGuests?: boolean;
    /** An absolute link to the Google Hangout associated with this event. Read-only. */
    hangoutLink?: string;
    /** An absolute link to this event in the Google Calendar Web UI. Read-only. */
    htmlLink?: string;
    /** Event unique identifier as defined in RFC5545. It is used to uniquely identify events accross calendaring systems and must be supplied when importing events via the import method. Note that the iCalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same iCalUIDs. To retrieve an event using its iCalUID, call the events.list method using the iCalUID parameter. To retrieve an event using its id, call the events.get method. */
    iCalUID?: string;
    /** Opaque identifier of the event. When creating new single or recurring events, you can specify their IDs. Provided IDs must follow these rules:   - characters allowed in the ID are those used in base32hex encoding, i.e. lowercase letters a-v and digits 0-9, see section 3.1.2 in RFC2938  - the length of the ID must be between 5 and 1024 characters  - the ID must be unique per calendar  Due to the globally distributed nature of the system, we cannot guarantee that ID collisions will be detected at event creation time. To minimize the risk of collisions we recommend using an established UUID algorithm such as one described in RFC4122. If you do not specify an ID, it will be automatically generated by the server. Note that the icalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same icalUIDs. */
    id?: string;
    /** Type of the resource ("calendar#event"). */
    kind?: string;
    /** Geographic location of the event as free-form text. Optional. */
    location?: string;
    /** Whether this is a locked event copy where no changes can be made to the main event fields "summary", "description", "location", "start", "end" or "recurrence". The default is False. Read-Only. */
    locked?: boolean;
    /** The organizer of the event. If the organizer is also an attendee, this is indicated with a separate entry in attendees with the organizer field set to True. To change the organizer, use the move operation. Read-only, except when importing an event. */
    organizer?: { displayName?: string; email?: string; id?: string; self?: boolean };
    /** For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. It uniquely identifies the instance within the recurring event series even if the instance was moved to a different time. Immutable. */
    originalStartTime?: EventDateTime;
    /** If set to True, Event propagation is disabled. Note that it is not the same thing as Private event properties. Optional. Immutable. The default is False. */
    privateCopy?: boolean;
    /** List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields. This field is omitted for single events or instances of recurring events. */
    recurrence?: (string)[];
    /** For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. Immutable. */
    recurringEventId?: string;
    /** Information about the event's reminders for the authenticated user. */
    reminders?: { overrides?: (EventReminder)[]; useDefault?: boolean };
    /** Sequence number as per iCalendar. */
    sequence?: number;
    /** Source from which the event was created. For example, a web page, an email message or any document identifiable by an URL with HTTP or HTTPS scheme. Can only be seen or modified by the creator of the event. */
    source?: { title?: string; url?: string };
    /** The (inclusive) start time of the event. For a recurring event, this is the start time of the first instance. */
    start?: EventDateTime;
    /** Status of the event. Optional. Possible values are:   - "confirmed" - The event is confirmed. This is the default status.  - "tentative" - The event is tentatively confirmed.  - "cancelled" - The event is cancelled (deleted). The list method returns cancelled events only on incremental sync (when syncToken or updatedMin are specified) or if the showDeleted flag is set to true. The get method always returns them. A cancelled status represents two different states depending on the event type:   - Cancelled exceptions of an uncancelled recurring event indicate that this instance should no longer be presented to the user. Clients should store these events for the lifetime of the parent recurring event. Cancelled exceptions are only guaranteed to have values for the id, recurringEventId and originalStartTime fields populated. The other fields might be empty.   - All other cancelled events represent deleted events. Clients should remove their locally synced copies. Such cancelled events will eventually disappear, so do not rely on them being available indefinitely. Deleted events are only guaranteed to have the id field populated.   On the organizer's calendar, cancelled events continue to expose event details (summary, location, etc.) so that they can be restored (undeleted). Similarly, the events to which the user was invited and that they manually removed continue to provide details. However, incremental sync requests with showDeleted set to false will not return these details. If an event changes its organizer (for example via the move operation) and the original organizer is not on the attendee list, it will leave behind a cancelled event where only the id field is guaranteed to be populated. */
    status?: string;
    /** Title of the event. */
    summary?: string;
    /** Whether the event blocks time on the calendar. Optional. Possible values are:   - "opaque" - Default value. The event does block time on the calendar. This is equivalent to setting Show me as to Busy in the Calendar UI.  - "transparent" - The event does not block time on the calendar. This is equivalent to setting Show me as to Available in the Calendar UI. */
    transparency?: string;
    /** Last modification time of the event (as a RFC3339 timestamp). Read-only. */
    updated?: string;
    /** Visibility of the event. Optional. Possible values are:   - "default" - Uses the default visibility for events on the calendar. This is the default value.  - "public" - The event is public and event details are visible to all readers of the calendar.  - "private" - The event is private and only event attendees may view event details.  - "confidential" - The event is private. This value is provided for compatibility reasons. */
    visibility?: string;
    /** Developer Preview: Working Location event data. Read-only. */
    workingLocationProperties?: EventWorkingLocationProperties;
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Event identifier. */
    eventId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided). */
    alwaysIncludeEmail?: boolean;
    /** Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. */
    conferenceDataVersion?: number;
    /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
    maxAttendees?: number;
    /** Deprecated. Please use sendUpdates instead.  Whether to send notifications about the event update (for example, description changes, etc.). Note that some emails might still be sent even if you set the value to false. The default is false. */
    sendNotifications?: boolean;
    /** Guests who should receive notifications about the event update (for example, title changes, etc.). */
    sendUpdates?: "all" | "externalOnly" | "none";
    /** Whether API client performing operation supports event attachments. Optional. The default is False. */
    supportsAttachments?: boolean;
  }) => Promise<Event>;

  /**
   * Returns instances of the specified recurring event.
   */
  calendarEventsInstances: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Recurring event identifier. */
    eventId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided). */
    alwaysIncludeEmail?: boolean;
    /** The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional. */
    maxAttendees?: number;
    /** Maximum number of events returned on one result page. By default the value is 250 events. The page size can never be larger than 2500 events. Optional. */
    maxResults?: number;
    /** The original start time of the instance in the result. Optional. */
    originalStart?: string;
    /** Token specifying which result page to return. Optional. */
    pageToken?: string;
    /** Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events will still be included if singleEvents is False. Optional. The default is False. */
    showDeleted?: boolean;
    /** Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset. */
    timeMax?: string;
    /** Lower bound (inclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset. */
    timeMin?: string;
    /** Time zone used in the response. Optional. The default is the time zone of the calendar. */
    timeZone?: string;
  }) => Promise<Events>;

  /**
   * Moves an event to another calendar, i.e. changes an event's organizer.
   */
  calendarEventsMove: (input: {
    /** Calendar identifier of the source calendar where the event currently is on. */
    calendarId: string;
    /** Event identifier. */
    eventId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Calendar identifier of the target calendar where the event is to be moved to. */
    destination: string;
    /** Deprecated. Please use sendUpdates instead.  Whether to send notifications about the change of the event's organizer. Note that some emails might still be sent even if you set the value to false. The default is false. */
    sendNotifications?: boolean;
    /** Guests who should receive notifications about the change of the event's organizer. */
    sendUpdates?: "all" | "externalOnly" | "none";
  }) => Promise<Event>;

  /**
   * Stop watching resources through this channel
   */
  calendarChannelsStop: (input: {
    /** The address where notifications are delivered for this channel. */
    address?: string;
    /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
    expiration?: string;
    /** A UUID or similar unique string that identifies this channel. */
    id?: string;
    /** Identifies this as a notification channel used to watch for changes to a resource, which is "api#channel". */
    kind?: string;
    /** Additional parameters controlling delivery channel behavior. Optional. */
    params?: { [key: string]: string | undefined };
    /** A Boolean value to indicate whether payload is wanted. Optional. */
    payload?: boolean;
    /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
    resourceId?: string;
    /** A version-specific identifier for the watched resource. */
    resourceUri?: string;
    /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
    token?: string;
    /** The type of delivery mechanism used for this channel. Valid values are "web_hook" (or "webhook"). Both values refer to a channel where Http requests are used to deliver messages. */
    type?: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<unknown>;

  /**
   * Returns the color definitions for calendars and events.
   */
  calendarColorsGet: (input: {
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<Colors>;

  /**
   * Returns free/busy information for a set of calendars.
   */
  calendarFreebusyQuery: (input: {
    /** Maximal number of calendars for which FreeBusy information is to be provided. Optional. Maximum value is 50. */
    calendarExpansionMax?: number;
    /** Maximal number of calendar identifiers to be provided for a single group. Optional. An error is returned for a group with more members than this value. Maximum value is 100. */
    groupExpansionMax?: number;
    /** List of calendars and/or groups to query. */
    items?: (FreeBusyRequestItem)[];
    /** The end of the interval for the query formatted as per RFC3339. */
    timeMax?: string;
    /** The start of the interval for the query formatted as per RFC3339. */
    timeMin?: string;
    /** Time zone used in the response. Optional. The default is UTC. */
    timeZone?: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<FreeBusyResponse>;

  /**
   * Returns the calendars on the user's calendar list.
   */
  calendarCalendarListList: (input: {
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
    maxResults?: number;
    /** The minimum access role for the user in the returned entries. Optional. The default is no restriction. */
    minAccessRole?: "freeBusyReader" | "owner" | "reader" | "writer";
    /** Token specifying which result page to return. Optional. */
    pageToken?: string;
    /** Whether to include deleted calendar list entries in the result. Optional. The default is False. */
    showDeleted?: boolean;
    /** Whether to show hidden entries. Optional. The default is False. */
    showHidden?: boolean;
    /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If only read-only fields such as calendar properties or ACLs have changed, the entry won't be returned. All entries deleted and hidden since the previous list request will always be in the result set and it is not allowed to set showDeleted neither showHidden to False. To ensure client state consistency minAccessRole query parameter cannot be specified together with nextSyncToken. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
    syncToken?: string;
  }) => Promise<CalendarList>;

  /**
   * Inserts an existing calendar into the user's calendar list.
   */
  calendarCalendarListInsert: (input: {
    /** The effective access role that the authenticated user has on the calendar. Read-only. Possible values are:   - "freeBusyReader" - Provides read access to free/busy information.  - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden.  - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible.  - "owner" - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs. */
    accessRole?: string;
    /** The main color of the calendar in the hexadecimal format "#0088aa". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional. */
    backgroundColor?: string;
    /** The color of the calendar. This is an ID referring to an entry in the calendar section of the colors definition (see the colors endpoint). This property is superseded by the backgroundColor and foregroundColor properties and can be ignored when using these properties. Optional. */
    colorId?: string;
    /** Conferencing properties for this calendar, for example what types of conferences are allowed. */
    conferenceProperties?: ConferenceProperties;
    /** The default reminders that the authenticated user has for this calendar. */
    defaultReminders?: (EventReminder)[];
    /** Whether this calendar list entry has been deleted from the calendar list. Read-only. Optional. The default is False. */
    deleted?: boolean;
    /** Description of the calendar. Optional. Read-only. */
    description?: string;
    /** ETag of the resource. */
    etag?: string;
    /** The foreground color of the calendar in the hexadecimal format "#ffffff". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional. */
    foregroundColor?: string;
    /** Whether the calendar has been hidden from the list. Optional. The attribute is only returned when the calendar is hidden, in which case the value is true. */
    hidden?: boolean;
    /** Identifier of the calendar. */
    id?: string;
    /** Type of the resource ("calendar#calendarListEntry"). */
    kind?: string;
    /** Geographic location of the calendar as free-form text. Optional. Read-only. */
    location?: string;
    /** The notifications that the authenticated user is receiving for this calendar. */
    notificationSettings?: { notifications?: (CalendarNotification)[] };
    /** Whether the calendar is the primary calendar of the authenticated user. Read-only. Optional. The default is False. */
    primary?: boolean;
    /** Whether the calendar content shows up in the calendar UI. Optional. The default is False. */
    selected?: boolean;
    /** Title of the calendar. Read-only. */
    summary?: string;
    /** The summary that the authenticated user has set for this calendar. Optional. */
    summaryOverride?: string;
    /** The time zone of the calendar. Optional. Read-only. */
    timeZone?: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False. */
    colorRgbFormat?: boolean;
  }) => Promise<CalendarListEntry>;

  /**
   * Watch for changes to CalendarList resources.
   */
  calendarCalendarListWatch: (input: {
    /** The address where notifications are delivered for this channel. */
    address?: string;
    /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
    expiration?: string;
    /** A UUID or similar unique string that identifies this channel. */
    id?: string;
    /** Identifies this as a notification channel used to watch for changes to a resource, which is "api#channel". */
    kind?: string;
    /** Additional parameters controlling delivery channel behavior. Optional. */
    params?: { [key: string]: string | undefined };
    /** A Boolean value to indicate whether payload is wanted. Optional. */
    payload?: boolean;
    /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
    resourceId?: string;
    /** A version-specific identifier for the watched resource. */
    resourceUri?: string;
    /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
    token?: string;
    /** The type of delivery mechanism used for this channel. Valid values are "web_hook" (or "webhook"). Both values refer to a channel where Http requests are used to deliver messages. */
    type?: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
    maxResults?: number;
    /** The minimum access role for the user in the returned entries. Optional. The default is no restriction. */
    minAccessRole?: "freeBusyReader" | "owner" | "reader" | "writer";
    /** Token specifying which result page to return. Optional. */
    pageToken?: string;
    /** Whether to include deleted calendar list entries in the result. Optional. The default is False. */
    showDeleted?: boolean;
    /** Whether to show hidden entries. Optional. The default is False. */
    showHidden?: boolean;
    /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If only read-only fields such as calendar properties or ACLs have changed, the entry won't be returned. All entries deleted and hidden since the previous list request will always be in the result set and it is not allowed to set showDeleted neither showHidden to False. To ensure client state consistency minAccessRole query parameter cannot be specified together with nextSyncToken. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
    syncToken?: string;
  }) => Promise<Channel>;

  /**
   * Removes a calendar from the user's calendar list.
   */
  calendarCalendarListDelete: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<unknown>;

  /**
   * Returns a calendar from the user's calendar list.
   */
  calendarCalendarListGet: (input: {
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<CalendarListEntry>;

  /**
   * Updates an existing calendar on the user's calendar list. This method supports patch semantics.
   */
  calendarCalendarListPatch: (input: {
    /** The effective access role that the authenticated user has on the calendar. Read-only. Possible values are:   - "freeBusyReader" - Provides read access to free/busy information.  - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden.  - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible.  - "owner" - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs. */
    accessRole?: string;
    /** The main color of the calendar in the hexadecimal format "#0088aa". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional. */
    backgroundColor?: string;
    /** The color of the calendar. This is an ID referring to an entry in the calendar section of the colors definition (see the colors endpoint). This property is superseded by the backgroundColor and foregroundColor properties and can be ignored when using these properties. Optional. */
    colorId?: string;
    /** Conferencing properties for this calendar, for example what types of conferences are allowed. */
    conferenceProperties?: ConferenceProperties;
    /** The default reminders that the authenticated user has for this calendar. */
    defaultReminders?: (EventReminder)[];
    /** Whether this calendar list entry has been deleted from the calendar list. Read-only. Optional. The default is False. */
    deleted?: boolean;
    /** Description of the calendar. Optional. Read-only. */
    description?: string;
    /** ETag of the resource. */
    etag?: string;
    /** The foreground color of the calendar in the hexadecimal format "#ffffff". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional. */
    foregroundColor?: string;
    /** Whether the calendar has been hidden from the list. Optional. The attribute is only returned when the calendar is hidden, in which case the value is true. */
    hidden?: boolean;
    /** Identifier of the calendar. */
    id?: string;
    /** Type of the resource ("calendar#calendarListEntry"). */
    kind?: string;
    /** Geographic location of the calendar as free-form text. Optional. Read-only. */
    location?: string;
    /** The notifications that the authenticated user is receiving for this calendar. */
    notificationSettings?: { notifications?: (CalendarNotification)[] };
    /** Whether the calendar is the primary calendar of the authenticated user. Read-only. Optional. The default is False. */
    primary?: boolean;
    /** Whether the calendar content shows up in the calendar UI. Optional. The default is False. */
    selected?: boolean;
    /** Title of the calendar. Read-only. */
    summary?: string;
    /** The summary that the authenticated user has set for this calendar. Optional. */
    summaryOverride?: string;
    /** The time zone of the calendar. Optional. Read-only. */
    timeZone?: string;
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False. */
    colorRgbFormat?: boolean;
  }) => Promise<CalendarListEntry>;

  /**
   * Updates an existing calendar on the user's calendar list.
   */
  calendarCalendarListUpdate: (input: {
    /** The effective access role that the authenticated user has on the calendar. Read-only. Possible values are:   - "freeBusyReader" - Provides read access to free/busy information.  - "reader" - Provides read access to the calendar. Private events will appear to users with reader access, but event details will be hidden.  - "writer" - Provides read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible.  - "owner" - Provides ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs. */
    accessRole?: string;
    /** The main color of the calendar in the hexadecimal format "#0088aa". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional. */
    backgroundColor?: string;
    /** The color of the calendar. This is an ID referring to an entry in the calendar section of the colors definition (see the colors endpoint). This property is superseded by the backgroundColor and foregroundColor properties and can be ignored when using these properties. Optional. */
    colorId?: string;
    /** Conferencing properties for this calendar, for example what types of conferences are allowed. */
    conferenceProperties?: ConferenceProperties;
    /** The default reminders that the authenticated user has for this calendar. */
    defaultReminders?: (EventReminder)[];
    /** Whether this calendar list entry has been deleted from the calendar list. Read-only. Optional. The default is False. */
    deleted?: boolean;
    /** Description of the calendar. Optional. Read-only. */
    description?: string;
    /** ETag of the resource. */
    etag?: string;
    /** The foreground color of the calendar in the hexadecimal format "#ffffff". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional. */
    foregroundColor?: string;
    /** Whether the calendar has been hidden from the list. Optional. The attribute is only returned when the calendar is hidden, in which case the value is true. */
    hidden?: boolean;
    /** Identifier of the calendar. */
    id?: string;
    /** Type of the resource ("calendar#calendarListEntry"). */
    kind?: string;
    /** Geographic location of the calendar as free-form text. Optional. Read-only. */
    location?: string;
    /** The notifications that the authenticated user is receiving for this calendar. */
    notificationSettings?: { notifications?: (CalendarNotification)[] };
    /** Whether the calendar is the primary calendar of the authenticated user. Read-only. Optional. The default is False. */
    primary?: boolean;
    /** Whether the calendar content shows up in the calendar UI. Optional. The default is False. */
    selected?: boolean;
    /** Title of the calendar. Read-only. */
    summary?: string;
    /** The summary that the authenticated user has set for this calendar. Optional. */
    summaryOverride?: string;
    /** The time zone of the calendar. Optional. Read-only. */
    timeZone?: string;
    /** Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword. */
    calendarId: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False. */
    colorRgbFormat?: boolean;
  }) => Promise<CalendarListEntry>;

  /**
   * Returns all user settings for the authenticated user.
   */
  calendarSettingsList: (input: {
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
    maxResults?: number;
    /** Token specifying which result page to return. Optional. */
    pageToken?: string;
    /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
    syncToken?: string;
  }) => Promise<Settings>;

  /**
   * Watch for changes to Settings resources.
   */
  calendarSettingsWatch: (input: {
    /** The address where notifications are delivered for this channel. */
    address?: string;
    /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
    expiration?: string;
    /** A UUID or similar unique string that identifies this channel. */
    id?: string;
    /** Identifies this as a notification channel used to watch for changes to a resource, which is "api#channel". */
    kind?: string;
    /** Additional parameters controlling delivery channel behavior. Optional. */
    params?: { [key: string]: string | undefined };
    /** A Boolean value to indicate whether payload is wanted. Optional. */
    payload?: boolean;
    /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
    resourceId?: string;
    /** A version-specific identifier for the watched resource. */
    resourceUri?: string;
    /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
    token?: string;
    /** The type of delivery mechanism used for this channel. Valid values are "web_hook" (or "webhook"). Both values refer to a channel where Http requests are used to deliver messages. */
    type?: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
    /** Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional. */
    maxResults?: number;
    /** Token specifying which result page to return. Optional. */
    pageToken?: string;
    /** Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries. */
    syncToken?: string;
  }) => Promise<Channel>;

  /**
   * Returns a single user setting.
   */
  calendarSettingsGet: (input: {
    /** The id of the user setting. */
    setting: string;
    /** Data format for the response. */
    alt?: "json";
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
    quotaUser?: string;
    /** Deprecated. Please use quotaUser instead. */
    userIp?: string;
  }) => Promise<Setting>;
};

export * from "./schemas.js";
