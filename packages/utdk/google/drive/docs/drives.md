# Drives

7 operations · `utdk/google/drive`

```ts
import drive from "utdk/google/drive";
```

## `drive.driveDrivesList`

Lists the user's shared drives. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveDrivesList(input: {
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
  /** Maximum number of shared drives to return per page. */
  pageSize?: number;
  /** Page token for shared drives. */
  pageToken?: string;
  /** Query string for searching shared drives. */
  q?: string;
  /** Issue the request as a domain administrator; if set to true, then all shared drives of the domain in which the requester is an administrator are returned. */
  useDomainAdminAccess?: boolean;
}): Promise<DriveList>
```

<sub>`GET /drives` · `drive.drives.list`</sub>

## `drive.driveDrivesCreate`

Creates a shared drive. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveDrivesCreate(input: {
  /** An image file and cropping parameters from which a background image for this shared drive is set. This is a write-only field; it can only be set on drive.drives.update requests that don't set themeId. When specified, all fields of the backgroundImageFile must be set. */
  backgroundImageFile?: { id?: string; width?: number; xCoordinate?: number; yCoordinate?: number };
  /** A short-lived link to this shared drive's background image. */
  backgroundImageLink?: string;
  /** Capabilities the current user has on this shared drive. */
  capabilities?: { canAddChildren?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeDriveBackground?: boolean; canChangeDriveMembersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteChildren?: boolean; canDeleteDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRename?: boolean; canRenameDrive?: boolean; canResetDriveRestrictions?: boolean; canShare?: boolean; canTrashChildren?: boolean };
  /** The color of this shared drive as an RGB hex string. It can only be set on drive.drives.update requests that don't set themeId. */
  colorRgb?: string;
  /** The time at which the shared drive was created (RFC 3339 date-time). */
  createdTime?: string;
  /** Whether the shared drive is hidden from default view. */
  hidden?: boolean;
  /** The ID of this shared drive which is also the ID of the top level folder of this shared drive. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#drive". */
  kind?: string;
  /** The name of this shared drive. */
  name?: string;
  /** The organizational unit of this shared drive. This field is only populated on drives.list responses when the useDomainAdminAccess parameter is set to true. */
  orgUnitId?: string;
  /** A set of restrictions that apply to this shared drive or items inside this shared drive. */
  restrictions?: { adminManagedRestrictions?: boolean; copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; driveMembersOnly?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean };
  /** The ID of the theme from which the background image and color are set. The set of possible driveThemes can be retrieved from a drive.about.get response. When not specified on a drive.drives.create request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set colorRgb or backgroundImageFile. */
  themeId?: string;
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
  /** An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned. */
  requestId: string;
}): Promise<Drive>
```

<sub>`POST /drives` · `drive.drives.create`</sub>

## `drive.driveDrivesDelete`

Permanently deletes a shared drive for which the user is an organizer. The shared drive cannot contain any untrashed items. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveDrivesDelete(input: {
  /** The ID of the shared drive. */
  driveId: string;
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
  /** Whether any items inside the shared drive should also be deleted. This option is only supported when useDomainAdminAccess is also set to true. */
  allowItemDeletion?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
}): Promise<unknown>
```

<sub>`DELETE /drives/{driveId}` · `drive.drives.delete`</sub>

## `drive.driveDrivesGet`

Gets a shared drive's metadata by ID. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveDrivesGet(input: {
  /** The ID of the shared drive. */
  driveId: string;
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
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
}): Promise<Drive>
```

<sub>`GET /drives/{driveId}` · `drive.drives.get`</sub>

## `drive.driveDrivesUpdate`

Updates the metadata for a shared drive. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveDrivesUpdate(input: {
  /** An image file and cropping parameters from which a background image for this shared drive is set. This is a write-only field; it can only be set on drive.drives.update requests that don't set themeId. When specified, all fields of the backgroundImageFile must be set. */
  backgroundImageFile?: { id?: string; width?: number; xCoordinate?: number; yCoordinate?: number };
  /** A short-lived link to this shared drive's background image. */
  backgroundImageLink?: string;
  /** Capabilities the current user has on this shared drive. */
  capabilities?: { canAddChildren?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeDriveBackground?: boolean; canChangeDriveMembersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteChildren?: boolean; canDeleteDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRename?: boolean; canRenameDrive?: boolean; canResetDriveRestrictions?: boolean; canShare?: boolean; canTrashChildren?: boolean };
  /** The color of this shared drive as an RGB hex string. It can only be set on drive.drives.update requests that don't set themeId. */
  colorRgb?: string;
  /** The time at which the shared drive was created (RFC 3339 date-time). */
  createdTime?: string;
  /** Whether the shared drive is hidden from default view. */
  hidden?: boolean;
  /** The ID of this shared drive which is also the ID of the top level folder of this shared drive. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#drive". */
  kind?: string;
  /** The name of this shared drive. */
  name?: string;
  /** The organizational unit of this shared drive. This field is only populated on drives.list responses when the useDomainAdminAccess parameter is set to true. */
  orgUnitId?: string;
  /** A set of restrictions that apply to this shared drive or items inside this shared drive. */
  restrictions?: { adminManagedRestrictions?: boolean; copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; driveMembersOnly?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean };
  /** The ID of the theme from which the background image and color are set. The set of possible driveThemes can be retrieved from a drive.about.get response. When not specified on a drive.drives.create request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set colorRgb or backgroundImageFile. */
  themeId?: string;
  /** The ID of the shared drive. */
  driveId: string;
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
  /** Issue the request as a domain administrator. If set to true, then the requester is granted access if they're an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
}): Promise<Drive>
```

<sub>`PATCH /drives/{driveId}` · `drive.drives.update`</sub>

## `drive.driveDrivesHide`

Hides a shared drive from the default view. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveDrivesHide(input: {
  /** The ID of the shared drive. */
  driveId: string;
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
}): Promise<Drive>
```

<sub>`POST /drives/{driveId}/hide` · `drive.drives.hide`</sub>

## `drive.driveDrivesUnhide`

Restores a shared drive to the default view. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveDrivesUnhide(input: {
  /** The ID of the shared drive. */
  driveId: string;
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
}): Promise<Drive>
```

<sub>`POST /drives/{driveId}/unhide` · `drive.drives.unhide`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
