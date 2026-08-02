# Freebusy

1 operation · `utdk/google/calendar`

```ts
import calendar from "utdk/google/calendar";
```

## `calendar.calendarFreebusyQuery`

Returns free/busy information for a set of calendars. — [Provider docs](https://developers.google.com/google-apps/calendar/firstapp)

```ts
calendar.calendarFreebusyQuery(input: {
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
}): Promise<FreeBusyResponse>
```

<sub>`POST /freeBusy` · `calendar.freebusy.query`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
