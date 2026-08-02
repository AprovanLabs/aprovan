import type { ToolRuntimeMetadataMap } from "../../client.js";

export const toolMetadata = {
  "calendar.calendars.insert": {
    "accessPath": [
      "calendarCalendarsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conferenceProperties",
      "description",
      "etag",
      "id",
      "kind",
      "location",
      "summary",
      "timeZone"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/calendars",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Creates a secondary calendar."
  },
  "calendar.calendars.delete": {
    "accessPath": [
      "calendarCalendarsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Deletes a secondary calendar. Use calendars.clear for clearing all events on primary calendars.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."
    }
  },
  "calendar.calendars.get": {
    "accessPath": [
      "calendarCalendarsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Returns metadata for a calendar.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."
    }
  },
  "calendar.calendars.patch": {
    "accessPath": [
      "calendarCalendarsPatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conferenceProperties",
      "description",
      "etag",
      "id",
      "kind",
      "location",
      "summary",
      "timeZone"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Updates metadata for a calendar. This method supports patch semantics.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."
    }
  },
  "calendar.calendars.update": {
    "accessPath": [
      "calendarCalendarsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conferenceProperties",
      "description",
      "etag",
      "id",
      "kind",
      "location",
      "summary",
      "timeZone"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Updates metadata for a calendar.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."
    }
  },
  "calendar.acl.list": {
    "accessPath": [
      "calendarAclList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/acl",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "pageToken",
      "showDeleted",
      "syncToken"
    ],
    "description": "Returns the rules in the access control list for the calendar.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "maxResults": "Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional.",
      "pageToken": "Token specifying which result page to return. Optional.",
      "showDeleted": "Whether to include deleted ACLs in the result. Deleted ACLs are represented by role equal to \"none\". Deleted ACLs will always be included if syncToken is provided. Optional. The default is False.",
      "syncToken": "Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All entries deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False.\nIf the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries."
    }
  },
  "calendar.acl.insert": {
    "accessPath": [
      "calendarAclInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "role",
      "scope"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/acl",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "sendNotifications"
    ],
    "description": "Creates an access control rule.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "sendNotifications": "Whether to send notifications about the calendar sharing change. Optional. The default is True."
    }
  },
  "calendar.acl.watch": {
    "accessPath": [
      "calendarAclWatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "expiration",
      "id",
      "kind",
      "params",
      "payload",
      "resourceId",
      "resourceUri",
      "token",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/acl/watch",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "pageToken",
      "showDeleted",
      "syncToken"
    ],
    "description": "Watch for changes to ACL resources.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "maxResults": "Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional.",
      "pageToken": "Token specifying which result page to return. Optional.",
      "showDeleted": "Whether to include deleted ACLs in the result. Deleted ACLs are represented by role equal to \"none\". Deleted ACLs will always be included if syncToken is provided. Optional. The default is False.",
      "syncToken": "Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All entries deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False.\nIf the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries."
    }
  },
  "calendar.acl.delete": {
    "accessPath": [
      "calendarAclDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/acl/{ruleId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId",
      "ruleId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Deletes an access control rule.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "ruleId": "ACL rule identifier."
    }
  },
  "calendar.acl.get": {
    "accessPath": [
      "calendarAclGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/acl/{ruleId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId",
      "ruleId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Returns an access control rule.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "ruleId": "ACL rule identifier."
    }
  },
  "calendar.acl.patch": {
    "accessPath": [
      "calendarAclPatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "role",
      "scope"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/acl/{ruleId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId",
      "ruleId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "sendNotifications"
    ],
    "description": "Updates an access control rule. This method supports patch semantics.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "ruleId": "ACL rule identifier.",
      "sendNotifications": "Whether to send notifications about the calendar sharing change. Note that there are no notifications on access removal. Optional. The default is True."
    }
  },
  "calendar.acl.update": {
    "accessPath": [
      "calendarAclUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "role",
      "scope"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/acl/{ruleId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId",
      "ruleId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "sendNotifications"
    ],
    "description": "Updates an access control rule.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "ruleId": "ACL rule identifier.",
      "sendNotifications": "Whether to send notifications about the calendar sharing change. Note that there are no notifications on access removal. Optional. The default is True."
    }
  },
  "calendar.calendars.clear": {
    "accessPath": [
      "calendarCalendarsClear"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/clear",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Clears a primary calendar. This operation deletes all events associated with the primary calendar of an account.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."
    }
  },
  "calendar.events.list": {
    "accessPath": [
      "calendarEventsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "eventTypes",
      "iCalUID",
      "maxAttendees",
      "maxResults",
      "orderBy",
      "pageToken",
      "privateExtendedProperty",
      "q",
      "sharedExtendedProperty",
      "showDeleted",
      "showHiddenInvitations",
      "singleEvents",
      "syncToken",
      "timeMax",
      "timeMin",
      "timeZone",
      "updatedMin"
    ],
    "description": "Returns events on the specified calendar.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "alwaysIncludeEmail": "Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided).",
      "eventTypes": "Event types to return. Optional. Possible values are: \n- \"default\" \n- \"focusTime\" \n- \"outOfOffice\"This parameter can be repeated multiple times to return events of different types. Currently, this is the only allowed value for this field: \n- [\"default\", \"focusTime\", \"outOfOffice\"] This value will be the default.\n\nIf you're enrolled in the Working Location developer preview program, in addition to the default value above you can also set the \"workingLocation\" event type: \n- [\"default\", \"focusTime\", \"outOfOffice\", \"workingLocation\"] \n- [\"workingLocation\"] Additional combinations of these 4 event types will be made available in later releases. Developer Preview.",
      "iCalUID": "Specifies an event ID in the iCalendar format to be provided in the response. Optional. Use this if you want to search for an event by its iCalendar ID.",
      "maxAttendees": "The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.",
      "maxResults": "Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional.",
      "orderBy": "The order of the events returned in the result. Optional. The default is an unspecified, stable order.",
      "pageToken": "Token specifying which result page to return. Optional.",
      "privateExtendedProperty": "Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints.",
      "q": "Free text search terms to find events that match these terms in the following fields: summary, description, location, attendee's displayName, attendee's email. Optional.",
      "sharedExtendedProperty": "Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints.",
      "showDeleted": "Whether to include deleted events (with status equals \"cancelled\") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False.",
      "showHiddenInvitations": "Whether to include hidden invitations in the result. Optional. The default is False.",
      "singleEvents": "Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False.",
      "syncToken": "Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False.\nThere are several query parameters that cannot be specified together with nextSyncToken to ensure consistency of the client state.\n\nThese are: \n- iCalUID \n- orderBy \n- privateExtendedProperty \n- q \n- sharedExtendedProperty \n- timeMin \n- timeMax \n- updatedMin If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries.",
      "timeMax": "Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin.",
      "timeMin": "Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax.",
      "timeZone": "Time zone used in the response. Optional. The default is the time zone of the calendar.",
      "updatedMin": "Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time."
    }
  },
  "calendar.events.insert": {
    "accessPath": [
      "calendarEventsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "anyoneCanAddSelf",
      "attachments",
      "attendees",
      "attendeesOmitted",
      "colorId",
      "conferenceData",
      "created",
      "creator",
      "description",
      "end",
      "endTimeUnspecified",
      "etag",
      "eventType",
      "extendedProperties",
      "gadget",
      "guestsCanInviteOthers",
      "guestsCanModify",
      "guestsCanSeeOtherGuests",
      "hangoutLink",
      "htmlLink",
      "iCalUID",
      "id",
      "kind",
      "location",
      "locked",
      "organizer",
      "originalStartTime",
      "privateCopy",
      "recurrence",
      "recurringEventId",
      "reminders",
      "sequence",
      "source",
      "start",
      "status",
      "summary",
      "transparency",
      "updated",
      "visibility",
      "workingLocationProperties"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "conferenceDataVersion",
      "maxAttendees",
      "sendNotifications",
      "sendUpdates",
      "supportsAttachments"
    ],
    "description": "Creates an event.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "conferenceDataVersion": "Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0.",
      "maxAttendees": "The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.",
      "sendNotifications": "Deprecated. Please use sendUpdates instead.\n\nWhether to send notifications about the creation of the new event. Note that some emails might still be sent even if you set the value to false. The default is false.",
      "sendUpdates": "Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false.",
      "supportsAttachments": "Whether API client performing operation supports event attachments. Optional. The default is False."
    }
  },
  "calendar.events.import": {
    "accessPath": [
      "calendarEventsImport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "anyoneCanAddSelf",
      "attachments",
      "attendees",
      "attendeesOmitted",
      "colorId",
      "conferenceData",
      "created",
      "creator",
      "description",
      "end",
      "endTimeUnspecified",
      "etag",
      "eventType",
      "extendedProperties",
      "gadget",
      "guestsCanInviteOthers",
      "guestsCanModify",
      "guestsCanSeeOtherGuests",
      "hangoutLink",
      "htmlLink",
      "iCalUID",
      "id",
      "kind",
      "location",
      "locked",
      "organizer",
      "originalStartTime",
      "privateCopy",
      "recurrence",
      "recurringEventId",
      "reminders",
      "sequence",
      "source",
      "start",
      "status",
      "summary",
      "transparency",
      "updated",
      "visibility",
      "workingLocationProperties"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events/import",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "conferenceDataVersion",
      "supportsAttachments"
    ],
    "description": "Imports an event. This operation is used to add a private copy of an existing event to a calendar.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "conferenceDataVersion": "Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0.",
      "supportsAttachments": "Whether API client performing operation supports event attachments. Optional. The default is False."
    }
  },
  "calendar.events.quickAdd": {
    "accessPath": [
      "calendarEventsQuickAdd"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events/quickAdd",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "text",
      "sendNotifications",
      "sendUpdates"
    ],
    "description": "Creates an event based on a simple text string.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "text": "The text describing the event to be created.",
      "sendNotifications": "Deprecated. Please use sendUpdates instead.\n\nWhether to send notifications about the creation of the event. Note that some emails might still be sent even if you set the value to false. The default is false.",
      "sendUpdates": "Guests who should receive notifications about the creation of the new event."
    }
  },
  "calendar.events.watch": {
    "accessPath": [
      "calendarEventsWatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "expiration",
      "id",
      "kind",
      "params",
      "payload",
      "resourceId",
      "resourceUri",
      "token",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events/watch",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "eventTypes",
      "iCalUID",
      "maxAttendees",
      "maxResults",
      "orderBy",
      "pageToken",
      "privateExtendedProperty",
      "q",
      "sharedExtendedProperty",
      "showDeleted",
      "showHiddenInvitations",
      "singleEvents",
      "syncToken",
      "timeMax",
      "timeMin",
      "timeZone",
      "updatedMin"
    ],
    "description": "Watch for changes to Events resources.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "alwaysIncludeEmail": "Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided).",
      "eventTypes": "Event types to return. Optional. Possible values are: \n- \"default\" \n- \"focusTime\" \n- \"outOfOffice\"This parameter can be repeated multiple times to return events of different types. Currently, this is the only allowed value for this field: \n- [\"default\", \"focusTime\", \"outOfOffice\"] This value will be the default.\n\nIf you're enrolled in the Working Location developer preview program, in addition to the default value above you can also set the \"workingLocation\" event type: \n- [\"default\", \"focusTime\", \"outOfOffice\", \"workingLocation\"] \n- [\"workingLocation\"] Additional combinations of these 4 event types will be made available in later releases. Developer Preview.",
      "iCalUID": "Specifies an event ID in the iCalendar format to be provided in the response. Optional. Use this if you want to search for an event by its iCalendar ID.",
      "maxAttendees": "The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.",
      "maxResults": "Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional.",
      "orderBy": "The order of the events returned in the result. Optional. The default is an unspecified, stable order.",
      "pageToken": "Token specifying which result page to return. Optional.",
      "privateExtendedProperty": "Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints.",
      "q": "Free text search terms to find events that match these terms in the following fields: summary, description, location, attendee's displayName, attendee's email. Optional.",
      "sharedExtendedProperty": "Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints.",
      "showDeleted": "Whether to include deleted events (with status equals \"cancelled\") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False.",
      "showHiddenInvitations": "Whether to include hidden invitations in the result. Optional. The default is False.",
      "singleEvents": "Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False.",
      "syncToken": "Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False.\nThere are several query parameters that cannot be specified together with nextSyncToken to ensure consistency of the client state.\n\nThese are: \n- iCalUID \n- orderBy \n- privateExtendedProperty \n- q \n- sharedExtendedProperty \n- timeMin \n- timeMax \n- updatedMin If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries.",
      "timeMax": "Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin.",
      "timeMin": "Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax.",
      "timeZone": "Time zone used in the response. Optional. The default is the time zone of the calendar.",
      "updatedMin": "Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time."
    }
  },
  "calendar.events.delete": {
    "accessPath": [
      "calendarEventsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events/{eventId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId",
      "eventId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "sendNotifications",
      "sendUpdates"
    ],
    "description": "Deletes an event.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "eventId": "Event identifier.",
      "sendNotifications": "Deprecated. Please use sendUpdates instead.\n\nWhether to send notifications about the deletion of the event. Note that some emails might still be sent even if you set the value to false. The default is false.",
      "sendUpdates": "Guests who should receive notifications about the deletion of the event."
    }
  },
  "calendar.events.get": {
    "accessPath": [
      "calendarEventsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events/{eventId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId",
      "eventId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "maxAttendees",
      "timeZone"
    ],
    "description": "Returns an event based on its Google Calendar ID. To retrieve an event using its iCalendar ID, call the events.list method using the iCalUID parameter.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "eventId": "Event identifier.",
      "alwaysIncludeEmail": "Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided).",
      "maxAttendees": "The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.",
      "timeZone": "Time zone used in the response. Optional. The default is the time zone of the calendar."
    }
  },
  "calendar.events.patch": {
    "accessPath": [
      "calendarEventsPatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "anyoneCanAddSelf",
      "attachments",
      "attendees",
      "attendeesOmitted",
      "colorId",
      "conferenceData",
      "created",
      "creator",
      "description",
      "end",
      "endTimeUnspecified",
      "etag",
      "eventType",
      "extendedProperties",
      "gadget",
      "guestsCanInviteOthers",
      "guestsCanModify",
      "guestsCanSeeOtherGuests",
      "hangoutLink",
      "htmlLink",
      "iCalUID",
      "id",
      "kind",
      "location",
      "locked",
      "organizer",
      "originalStartTime",
      "privateCopy",
      "recurrence",
      "recurringEventId",
      "reminders",
      "sequence",
      "source",
      "start",
      "status",
      "summary",
      "transparency",
      "updated",
      "visibility",
      "workingLocationProperties"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events/{eventId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId",
      "eventId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "conferenceDataVersion",
      "maxAttendees",
      "sendNotifications",
      "sendUpdates",
      "supportsAttachments"
    ],
    "description": "Updates an event. This method supports patch semantics.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "eventId": "Event identifier.",
      "alwaysIncludeEmail": "Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided).",
      "conferenceDataVersion": "Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0.",
      "maxAttendees": "The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.",
      "sendNotifications": "Deprecated. Please use sendUpdates instead.\n\nWhether to send notifications about the event update (for example, description changes, etc.). Note that some emails might still be sent even if you set the value to false. The default is false.",
      "sendUpdates": "Guests who should receive notifications about the event update (for example, title changes, etc.).",
      "supportsAttachments": "Whether API client performing operation supports event attachments. Optional. The default is False."
    }
  },
  "calendar.events.update": {
    "accessPath": [
      "calendarEventsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "anyoneCanAddSelf",
      "attachments",
      "attendees",
      "attendeesOmitted",
      "colorId",
      "conferenceData",
      "created",
      "creator",
      "description",
      "end",
      "endTimeUnspecified",
      "etag",
      "eventType",
      "extendedProperties",
      "gadget",
      "guestsCanInviteOthers",
      "guestsCanModify",
      "guestsCanSeeOtherGuests",
      "hangoutLink",
      "htmlLink",
      "iCalUID",
      "id",
      "kind",
      "location",
      "locked",
      "organizer",
      "originalStartTime",
      "privateCopy",
      "recurrence",
      "recurringEventId",
      "reminders",
      "sequence",
      "source",
      "start",
      "status",
      "summary",
      "transparency",
      "updated",
      "visibility",
      "workingLocationProperties"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events/{eventId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId",
      "eventId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "conferenceDataVersion",
      "maxAttendees",
      "sendNotifications",
      "sendUpdates",
      "supportsAttachments"
    ],
    "description": "Updates an event.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "eventId": "Event identifier.",
      "alwaysIncludeEmail": "Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided).",
      "conferenceDataVersion": "Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0.",
      "maxAttendees": "The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.",
      "sendNotifications": "Deprecated. Please use sendUpdates instead.\n\nWhether to send notifications about the event update (for example, description changes, etc.). Note that some emails might still be sent even if you set the value to false. The default is false.",
      "sendUpdates": "Guests who should receive notifications about the event update (for example, title changes, etc.).",
      "supportsAttachments": "Whether API client performing operation supports event attachments. Optional. The default is False."
    }
  },
  "calendar.events.instances": {
    "accessPath": [
      "calendarEventsInstances"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events/{eventId}/instances",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId",
      "eventId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "alwaysIncludeEmail",
      "maxAttendees",
      "maxResults",
      "originalStart",
      "pageToken",
      "showDeleted",
      "timeMax",
      "timeMin",
      "timeZone"
    ],
    "description": "Returns instances of the specified recurring event.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "eventId": "Recurring event identifier.",
      "alwaysIncludeEmail": "Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided).",
      "maxAttendees": "The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.",
      "maxResults": "Maximum number of events returned on one result page. By default the value is 250 events. The page size can never be larger than 2500 events. Optional.",
      "originalStart": "The original start time of the instance in the result. Optional.",
      "pageToken": "Token specifying which result page to return. Optional.",
      "showDeleted": "Whether to include deleted events (with status equals \"cancelled\") in the result. Cancelled instances of recurring events will still be included if singleEvents is False. Optional. The default is False.",
      "timeMax": "Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset.",
      "timeMin": "Lower bound (inclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset.",
      "timeZone": "Time zone used in the response. Optional. The default is the time zone of the calendar."
    }
  },
  "calendar.events.move": {
    "accessPath": [
      "calendarEventsMove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/calendars/{calendarId}/events/{eventId}/move",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId",
      "eventId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "destination",
      "sendNotifications",
      "sendUpdates"
    ],
    "description": "Moves an event to another calendar, i.e. changes an event's organizer.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier of the source calendar where the event currently is on.",
      "eventId": "Event identifier.",
      "destination": "Calendar identifier of the target calendar where the event is to be moved to.",
      "sendNotifications": "Deprecated. Please use sendUpdates instead.\n\nWhether to send notifications about the change of the event's organizer. Note that some emails might still be sent even if you set the value to false. The default is false.",
      "sendUpdates": "Guests who should receive notifications about the change of the event's organizer."
    }
  },
  "calendar.channels.stop": {
    "accessPath": [
      "calendarChannelsStop"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "expiration",
      "id",
      "kind",
      "params",
      "payload",
      "resourceId",
      "resourceUri",
      "token",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/channels/stop",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Stop watching resources through this channel"
  },
  "calendar.colors.get": {
    "accessPath": [
      "calendarColorsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/colors",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Returns the color definitions for calendars and events."
  },
  "calendar.freebusy.query": {
    "accessPath": [
      "calendarFreebusyQuery"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "calendarExpansionMax",
      "groupExpansionMax",
      "items",
      "timeMax",
      "timeMin",
      "timeZone"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/freeBusy",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Returns free/busy information for a set of calendars."
  },
  "calendar.calendarList.list": {
    "accessPath": [
      "calendarCalendarListList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/users/me/calendarList",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "minAccessRole",
      "pageToken",
      "showDeleted",
      "showHidden",
      "syncToken"
    ],
    "description": "Returns the calendars on the user's calendar list.",
    "parameterDescriptions": {
      "maxResults": "Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional.",
      "minAccessRole": "The minimum access role for the user in the returned entries. Optional. The default is no restriction.",
      "pageToken": "Token specifying which result page to return. Optional.",
      "showDeleted": "Whether to include deleted calendar list entries in the result. Optional. The default is False.",
      "showHidden": "Whether to show hidden entries. Optional. The default is False.",
      "syncToken": "Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If only read-only fields such as calendar properties or ACLs have changed, the entry won't be returned. All entries deleted and hidden since the previous list request will always be in the result set and it is not allowed to set showDeleted neither showHidden to False.\nTo ensure client state consistency minAccessRole query parameter cannot be specified together with nextSyncToken.\nIf the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries."
    }
  },
  "calendar.calendarList.insert": {
    "accessPath": [
      "calendarCalendarListInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accessRole",
      "backgroundColor",
      "colorId",
      "conferenceProperties",
      "defaultReminders",
      "deleted",
      "description",
      "etag",
      "foregroundColor",
      "hidden",
      "id",
      "kind",
      "location",
      "notificationSettings",
      "primary",
      "selected",
      "summary",
      "summaryOverride",
      "timeZone"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/users/me/calendarList",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "colorRgbFormat"
    ],
    "description": "Inserts an existing calendar into the user's calendar list.",
    "parameterDescriptions": {
      "colorRgbFormat": "Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False."
    }
  },
  "calendar.calendarList.watch": {
    "accessPath": [
      "calendarCalendarListWatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "expiration",
      "id",
      "kind",
      "params",
      "payload",
      "resourceId",
      "resourceUri",
      "token",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/users/me/calendarList/watch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "minAccessRole",
      "pageToken",
      "showDeleted",
      "showHidden",
      "syncToken"
    ],
    "description": "Watch for changes to CalendarList resources.",
    "parameterDescriptions": {
      "maxResults": "Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional.",
      "minAccessRole": "The minimum access role for the user in the returned entries. Optional. The default is no restriction.",
      "pageToken": "Token specifying which result page to return. Optional.",
      "showDeleted": "Whether to include deleted calendar list entries in the result. Optional. The default is False.",
      "showHidden": "Whether to show hidden entries. Optional. The default is False.",
      "syncToken": "Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If only read-only fields such as calendar properties or ACLs have changed, the entry won't be returned. All entries deleted and hidden since the previous list request will always be in the result set and it is not allowed to set showDeleted neither showHidden to False.\nTo ensure client state consistency minAccessRole query parameter cannot be specified together with nextSyncToken.\nIf the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries."
    }
  },
  "calendar.calendarList.delete": {
    "accessPath": [
      "calendarCalendarListDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/calendar/v3/users/me/calendarList/{calendarId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Removes a calendar from the user's calendar list.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."
    }
  },
  "calendar.calendarList.get": {
    "accessPath": [
      "calendarCalendarListGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/users/me/calendarList/{calendarId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Returns a calendar from the user's calendar list.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."
    }
  },
  "calendar.calendarList.patch": {
    "accessPath": [
      "calendarCalendarListPatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accessRole",
      "backgroundColor",
      "colorId",
      "conferenceProperties",
      "defaultReminders",
      "deleted",
      "description",
      "etag",
      "foregroundColor",
      "hidden",
      "id",
      "kind",
      "location",
      "notificationSettings",
      "primary",
      "selected",
      "summary",
      "summaryOverride",
      "timeZone"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/calendar/v3/users/me/calendarList/{calendarId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "colorRgbFormat"
    ],
    "description": "Updates an existing calendar on the user's calendar list. This method supports patch semantics.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "colorRgbFormat": "Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False."
    }
  },
  "calendar.calendarList.update": {
    "accessPath": [
      "calendarCalendarListUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accessRole",
      "backgroundColor",
      "colorId",
      "conferenceProperties",
      "defaultReminders",
      "deleted",
      "description",
      "etag",
      "foregroundColor",
      "hidden",
      "id",
      "kind",
      "location",
      "notificationSettings",
      "primary",
      "selected",
      "summary",
      "summaryOverride",
      "timeZone"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/calendar/v3/users/me/calendarList/{calendarId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calendarId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "colorRgbFormat"
    ],
    "description": "Updates an existing calendar on the user's calendar list.",
    "parameterDescriptions": {
      "calendarId": "Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword.",
      "colorRgbFormat": "Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False."
    }
  },
  "calendar.settings.list": {
    "accessPath": [
      "calendarSettingsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/users/me/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "pageToken",
      "syncToken"
    ],
    "description": "Returns all user settings for the authenticated user.",
    "parameterDescriptions": {
      "maxResults": "Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional.",
      "pageToken": "Token specifying which result page to return. Optional.",
      "syncToken": "Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then.\nIf the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries."
    }
  },
  "calendar.settings.watch": {
    "accessPath": [
      "calendarSettingsWatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "expiration",
      "id",
      "kind",
      "params",
      "payload",
      "resourceId",
      "resourceUri",
      "token",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/calendar/v3/users/me/settings/watch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "pageToken",
      "syncToken"
    ],
    "description": "Watch for changes to Settings resources.",
    "parameterDescriptions": {
      "maxResults": "Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional.",
      "pageToken": "Token specifying which result page to return. Optional.",
      "syncToken": "Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then.\nIf the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries."
    }
  },
  "calendar.settings.get": {
    "accessPath": [
      "calendarSettingsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/calendar/v3/users/me/settings/{setting}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "setting"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Returns a single user setting.",
    "parameterDescriptions": {
      "setting": "The id of the user setting."
    }
  }
} satisfies ToolRuntimeMetadataMap;
