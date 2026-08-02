# Teamdrives

5 operations · `utdk/google/drive`

```ts
import drive from "utdk/google/drive";
```

## `drive.driveTeamdrivesList`

Deprecated use drives.list instead. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveTeamdrivesList(input: {
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
  /** Maximum number of Team Drives to return. */
  pageSize?: number;
  /** Page token for Team Drives. */
  pageToken?: string;
  /** Query string for searching Team Drives. */
  q?: string;
  /** Issue the request as a domain administrator; if set to true, then all Team Drives of the domain in which the requester is an administrator are returned. */
  useDomainAdminAccess?: boolean;
}): Promise<TeamDriveList>
```

<sub>`GET /teamdrives` · `drive.teamdrives.list`</sub>

## `drive.driveTeamdrivesCreate`

Deprecated use drives.create instead. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveTeamdrivesCreate(input: {
  /** An image file and cropping parameters from which a background image for this Team Drive is set. This is a write only field; it can only be set on drive.teamdrives.update requests that don't set themeId. When specified, all fields of the backgroundImageFile must be set. */
  backgroundImageFile?: { id?: string; width?: number; xCoordinate?: number; yCoordinate?: number };
  /** A short-lived link to this Team Drive's background image. */
  backgroundImageLink?: string;
  /** Capabilities the current user has on this Team Drive. */
  capabilities?: { canAddChildren?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canChangeTeamDriveBackground?: boolean; canChangeTeamMembersOnlyRestriction?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteChildren?: boolean; canDeleteTeamDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRemoveChildren?: boolean; canRename?: boolean; canRenameTeamDrive?: boolean; canResetTeamDriveRestrictions?: boolean; canShare?: boolean; canTrashChildren?: boolean };
  /** The color of this Team Drive as an RGB hex string. It can only be set on a drive.teamdrives.update request that does not set themeId. */
  colorRgb?: string;
  /** The time at which the Team Drive was created (RFC 3339 date-time). */
  createdTime?: string;
  /** The ID of this Team Drive which is also the ID of the top level folder of this Team Drive. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#teamDrive". */
  kind?: string;
  /** The name of this Team Drive. */
  name?: string;
  /** The organizational unit of this shared drive. This field is only populated on drives.list responses when the useDomainAdminAccess parameter is set to true. */
  orgUnitId?: string;
  /** A set of restrictions that apply to this Team Drive or items inside this Team Drive. */
  restrictions?: { adminManagedRestrictions?: boolean; copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean; teamMembersOnly?: boolean };
  /** The ID of the theme from which the background image and color will be set. The set of possible teamDriveThemes can be retrieved from a drive.about.get response. When not specified on a drive.teamdrives.create request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set colorRgb or backgroundImageFile. */
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
  /** An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned. */
  requestId: string;
}): Promise<TeamDrive>
```

<sub>`POST /teamdrives` · `drive.teamdrives.create`</sub>

## `drive.driveTeamdrivesDelete`

Deprecated use drives.delete instead. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveTeamdrivesDelete(input: {
  /** The ID of the Team Drive */
  teamDriveId: string;
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

<sub>`DELETE /teamdrives/{teamDriveId}` · `drive.teamdrives.delete`</sub>

## `drive.driveTeamdrivesGet`

Deprecated use drives.get instead. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveTeamdrivesGet(input: {
  /** The ID of the Team Drive */
  teamDriveId: string;
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
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs. */
  useDomainAdminAccess?: boolean;
}): Promise<TeamDrive>
```

<sub>`GET /teamdrives/{teamDriveId}` · `drive.teamdrives.get`</sub>

## `drive.driveTeamdrivesUpdate`

Deprecated use drives.update instead — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveTeamdrivesUpdate(input: {
  /** An image file and cropping parameters from which a background image for this Team Drive is set. This is a write only field; it can only be set on drive.teamdrives.update requests that don't set themeId. When specified, all fields of the backgroundImageFile must be set. */
  backgroundImageFile?: { id?: string; width?: number; xCoordinate?: number; yCoordinate?: number };
  /** A short-lived link to this Team Drive's background image. */
  backgroundImageLink?: string;
  /** Capabilities the current user has on this Team Drive. */
  capabilities?: { canAddChildren?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canChangeTeamDriveBackground?: boolean; canChangeTeamMembersOnlyRestriction?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteChildren?: boolean; canDeleteTeamDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRemoveChildren?: boolean; canRename?: boolean; canRenameTeamDrive?: boolean; canResetTeamDriveRestrictions?: boolean; canShare?: boolean; canTrashChildren?: boolean };
  /** The color of this Team Drive as an RGB hex string. It can only be set on a drive.teamdrives.update request that does not set themeId. */
  colorRgb?: string;
  /** The time at which the Team Drive was created (RFC 3339 date-time). */
  createdTime?: string;
  /** The ID of this Team Drive which is also the ID of the top level folder of this Team Drive. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#teamDrive". */
  kind?: string;
  /** The name of this Team Drive. */
  name?: string;
  /** The organizational unit of this shared drive. This field is only populated on drives.list responses when the useDomainAdminAccess parameter is set to true. */
  orgUnitId?: string;
  /** A set of restrictions that apply to this Team Drive or items inside this Team Drive. */
  restrictions?: { adminManagedRestrictions?: boolean; copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean; teamMembersOnly?: boolean };
  /** The ID of the theme from which the background image and color will be set. The set of possible teamDriveThemes can be retrieved from a drive.about.get response. When not specified on a drive.teamdrives.create request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set colorRgb or backgroundImageFile. */
  themeId?: string;
  /** The ID of the Team Drive */
  teamDriveId: string;
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
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs. */
  useDomainAdminAccess?: boolean;
}): Promise<TeamDrive>
```

<sub>`PATCH /teamdrives/{teamDriveId}` · `drive.teamdrives.update`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
