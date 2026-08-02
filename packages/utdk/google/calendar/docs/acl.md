# Acl

7 operations · `utdk/google/calendar`

```ts
import calendar from "utdk/google/calendar";
```

## `calendar.calendarAclList`

Returns the rules in the access control list for the calendar. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarAclList(input: {
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
}): Promise<Acl>
```

<sub>`GET /calendars/{calendarId}/acl` · `calendar.acl.list`</sub>

## `calendar.calendarAclInsert`

Creates an access control rule. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarAclInsert(input: {
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
}): Promise<AclRule>
```

<sub>`POST /calendars/{calendarId}/acl` · `calendar.acl.insert`</sub>

## `calendar.calendarAclDelete`

Deletes an access control rule. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarAclDelete(input: {
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
}): Promise<unknown>
```

<sub>`DELETE /calendars/{calendarId}/acl/{ruleId}` · `calendar.acl.delete`</sub>

## `calendar.calendarAclGet`

Returns an access control rule. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarAclGet(input: {
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
}): Promise<AclRule>
```

<sub>`GET /calendars/{calendarId}/acl/{ruleId}` · `calendar.acl.get`</sub>

## `calendar.calendarAclPatch`

Updates an access control rule. This method supports patch semantics. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarAclPatch(input: {
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
}): Promise<AclRule>
```

<sub>`PATCH /calendars/{calendarId}/acl/{ruleId}` · `calendar.acl.patch`</sub>

## `calendar.calendarAclUpdate`

Updates an access control rule. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarAclUpdate(input: {
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
}): Promise<AclRule>
```

<sub>`PUT /calendars/{calendarId}/acl/{ruleId}` · `calendar.acl.update`</sub>

## `calendar.calendarAclWatch`

Watch for changes to ACL resources. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarAclWatch(input: {
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
}): Promise<Channel>
```

<sub>`POST /calendars/{calendarId}/acl/watch` · `calendar.acl.watch`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
