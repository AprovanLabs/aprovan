# CalendarList

7 operations · `utdk/google/calendar`

```ts
import calendar from "utdk/google/calendar";
```

## `calendar.calendarCalendarListList`

Returns the calendars on the user's calendar list. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarListList(input: {
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
}): Promise<CalendarList>
```

<sub>`GET /users/me/calendarList` · `calendar.calendarList.list`</sub>

## `calendar.calendarCalendarListInsert`

Inserts an existing calendar into the user's calendar list. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarListInsert(input: {
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
}): Promise<CalendarListEntry>
```

<sub>`POST /users/me/calendarList` · `calendar.calendarList.insert`</sub>

## `calendar.calendarCalendarListDelete`

Removes a calendar from the user's calendar list. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarListDelete(input: {
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
}): Promise<unknown>
```

<sub>`DELETE /users/me/calendarList/{calendarId}` · `calendar.calendarList.delete`</sub>

## `calendar.calendarCalendarListGet`

Returns a calendar from the user's calendar list. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarListGet(input: {
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
}): Promise<CalendarListEntry>
```

<sub>`GET /users/me/calendarList/{calendarId}` · `calendar.calendarList.get`</sub>

## `calendar.calendarCalendarListPatch`

Updates an existing calendar on the user's calendar list. This method supports patch semantics. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarListPatch(input: {
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
}): Promise<CalendarListEntry>
```

<sub>`PATCH /users/me/calendarList/{calendarId}` · `calendar.calendarList.patch`</sub>

## `calendar.calendarCalendarListUpdate`

Updates an existing calendar on the user's calendar list. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarListUpdate(input: {
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
}): Promise<CalendarListEntry>
```

<sub>`PUT /users/me/calendarList/{calendarId}` · `calendar.calendarList.update`</sub>

## `calendar.calendarCalendarListWatch`

Watch for changes to CalendarList resources. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarListWatch(input: {
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
}): Promise<Channel>
```

<sub>`POST /users/me/calendarList/watch` · `calendar.calendarList.watch`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
