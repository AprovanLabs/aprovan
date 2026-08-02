# Calendars

6 operations · `utdk/google/calendar`

```ts
import calendar from "utdk/google/calendar";
```

## `calendar.calendarCalendarsInsert`

Creates a secondary calendar. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarsInsert(input: {
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
}): Promise<Calendar>
```

<sub>`POST /calendars` · `calendar.calendars.insert`</sub>

## `calendar.calendarCalendarsDelete`

Deletes a secondary calendar. Use calendars.clear for clearing all events on primary calendars. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarsDelete(input: {
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

<sub>`DELETE /calendars/{calendarId}` · `calendar.calendars.delete`</sub>

## `calendar.calendarCalendarsGet`

Returns metadata for a calendar. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarsGet(input: {
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
}): Promise<Calendar>
```

<sub>`GET /calendars/{calendarId}` · `calendar.calendars.get`</sub>

## `calendar.calendarCalendarsPatch`

Updates metadata for a calendar. This method supports patch semantics. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarsPatch(input: {
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
}): Promise<Calendar>
```

<sub>`PATCH /calendars/{calendarId}` · `calendar.calendars.patch`</sub>

## `calendar.calendarCalendarsUpdate`

Updates metadata for a calendar. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarsUpdate(input: {
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
}): Promise<Calendar>
```

<sub>`PUT /calendars/{calendarId}` · `calendar.calendars.update`</sub>

## `calendar.calendarCalendarsClear`

Clears a primary calendar. This operation deletes all events associated with the primary calendar of an account. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarCalendarsClear(input: {
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

<sub>`POST /calendars/{calendarId}/clear` · `calendar.calendars.clear`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
