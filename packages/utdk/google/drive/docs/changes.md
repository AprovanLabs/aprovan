# Changes

3 operations · `utdk/google/drive`

```ts
import drive from "utdk/google/drive";
```

## `drive.driveChangesList`

Lists the changes for a user or shared drive. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveChangesList(input: {
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
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method. */
  pageToken: string;
  /** The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier. */
  driveId?: string;
  /** Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file. */
  includeCorpusRemovals?: boolean;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** A comma-separated list of IDs of labels to include in the labelInfo part of the response. */
  includeLabels?: string;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access. */
  includeRemoved?: boolean;
  /** Deprecated use includeItemsFromAllDrives instead. */
  includeTeamDriveItems?: boolean;
  /** The maximum number of changes to return per page. */
  pageSize?: number;
  /** Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive. */
  restrictToMyDrive?: boolean;
  /** A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'. */
  spaces?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated use driveId instead. */
  teamDriveId?: string;
}): Promise<ChangeList>
```

<sub>`GET /changes` · `drive.changes.list`</sub>

## `drive.driveChangesGetStartPageToken`

Gets the starting pageToken for listing future changes. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveChangesGetStartPageToken(input: {
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
  /** The ID of the shared drive for which the starting pageToken for listing future changes from that shared drive is returned. */
  driveId?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated use driveId instead. */
  teamDriveId?: string;
}): Promise<StartPageToken>
```

<sub>`GET /changes/startPageToken` · `drive.changes.getStartPageToken`</sub>

## `drive.driveChangesWatch`

Subscribes to changes for a user. To use this method, you must include the pageToken query parameter. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveChangesWatch(input: {
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
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method. */
  pageToken: string;
  /** The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier. */
  driveId?: string;
  /** Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file. */
  includeCorpusRemovals?: boolean;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** A comma-separated list of IDs of labels to include in the labelInfo part of the response. */
  includeLabels?: string;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access. */
  includeRemoved?: boolean;
  /** Deprecated use includeItemsFromAllDrives instead. */
  includeTeamDriveItems?: boolean;
  /** The maximum number of changes to return per page. */
  pageSize?: number;
  /** Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive. */
  restrictToMyDrive?: boolean;
  /** A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'. */
  spaces?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated use driveId instead. */
  teamDriveId?: string;
}): Promise<Channel>
```

<sub>`POST /changes/watch` · `drive.changes.watch`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
