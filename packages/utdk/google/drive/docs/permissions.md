# Permissions

5 operations · `utdk/google/drive`

```ts
import drive from "utdk/google/drive";
```

## `drive.drivePermissionsList`

Lists a file's or shared drive's permissions. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.drivePermissionsList(input: {
  /** The ID of the file or shared drive. */
  fileId: string;
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
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
  pageToken?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
}): Promise<PermissionList>
```

<sub>`GET /files/{fileId}/permissions` · `drive.permissions.list`</sub>

## `drive.drivePermissionsCreate`

Creates a permission for a file or shared drive. For more information on creating permissions, see Share files, folders & drives. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.drivePermissionsCreate(input: {
  /** Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type domain or anyone. */
  allowFileDiscovery?: boolean;
  /** Whether the account associated with this permission has been deleted. This field only pertains to user and group permissions. */
  deleted?: boolean;
  /** The "pretty" name of the value of the permission. The following is a list of examples for each type of permission:   - user - User's full name, as defined for their Google Account, such as "Joe Smith."  - group - Name of the Google Group, such as "The Company Administrators."  - domain - String domain name, such as "your-company.com."  - anyone - No displayName is present. */
  displayName?: string;
  /** The domain to which this permission refers. The following options are currently allowed:   - The entire domain, such as "your-company.com."  - A target audience, such as "ID.audience.googledomains.com." */
  domain?: string;
  /** The email address of the user or group to which this permission refers. */
  emailAddress?: string;
  /** The time at which this permission will expire (RFC 3339 date-time). Expiration times have the following restrictions:   - They cannot be set on shared drive items.  - They can only be set on user and group permissions.  - The time must be in the future.  - The time cannot be more than one year in the future. */
  expirationTime?: string;
  /** The ID of this permission. This is a unique identifier for the grantee, and is published in User resources as permissionId. IDs should be treated as opaque values. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#permission". */
  kind?: string;
  /** Whether the account associated with this permission is a pending owner. Only populated for user type permissions for files that aren't in a shared drive. */
  pendingOwner?: boolean;
  /** Details of whether the permissions on this shared drive item are inherited or are directly on this item. This is an output-only field that's present only for shared drive items. */
  permissionDetails?: ({ inherited?: boolean; inheritedFrom?: string; permissionType?: string; role?: string })[];
  /** A link to the user's profile photo, if available. */
  photoLink?: string;
  /** The role granted by this permission. While new values may be supported in the future, the following are currently allowed:   - owner  - organizer  - fileOrganizer  - writer  - commenter  - reader */
  role?: string;
  /** Deprecated - use permissionDetails instead. */
  teamDrivePermissionDetails?: ({ inherited?: boolean; inheritedFrom?: string; role?: string; teamDrivePermissionType?: string })[];
  /** The type of the grantee. Valid values are:   - user  - group  - domain  - anyone  When creating a permission, if type is user or group, you must provide an emailAddress for the user or group. When type is domain, you must provide a domain. There isn't extra information required for the anyone type. */
  type?: string;
  /** Indicates the view for this permission. Only populated for permissions that belong to a view. published is the only supported value. */
  view?: string;
  /** The ID of the file or shared drive. */
  fileId: string;
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
  /** A plain text custom message to include in the notification email. */
  emailMessage?: string;
  /** Deprecated. See moveToNewOwnersRoot for details. */
  enforceSingleParent?: boolean;
  /** This parameter will only take effect if the item is not in a shared drive and the request is attempting to transfer the ownership of the item. If set to true, the item will be moved to the new owner's My Drive root folder and all prior parents removed. If set to false, parents are not changed. */
  moveToNewOwnersRoot?: boolean;
  /** Whether to send a notification email when sharing to users or groups. This defaults to true for users and groups, and is not allowed for other requests. It must not be disabled for ownership transfers. */
  sendNotificationEmail?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. File owners can only transfer ownership of files existing on My Drive. Files existing in a shared drive are owned by the organization that owns that shared drive. Ownership transfers are not supported for files and folders in shared drives. Organizers of a shared drive can move items from that shared drive into their My Drive which transfers the ownership to them. */
  transferOwnership?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
}): Promise<Permission>
```

<sub>`POST /files/{fileId}/permissions` · `drive.permissions.create`</sub>

## `drive.drivePermissionsDelete`

Deletes a permission. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.drivePermissionsDelete(input: {
  /** The ID of the file or shared drive. */
  fileId: string;
  /** The ID of the permission. */
  permissionId: string;
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
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
}): Promise<unknown>
```

<sub>`DELETE /files/{fileId}/permissions/{permissionId}` · `drive.permissions.delete`</sub>

## `drive.drivePermissionsGet`

Gets a permission by ID. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.drivePermissionsGet(input: {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the permission. */
  permissionId: string;
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
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
}): Promise<Permission>
```

<sub>`GET /files/{fileId}/permissions/{permissionId}` · `drive.permissions.get`</sub>

## `drive.drivePermissionsUpdate`

Updates a permission with patch semantics. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.drivePermissionsUpdate(input: {
  /** Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type domain or anyone. */
  allowFileDiscovery?: boolean;
  /** Whether the account associated with this permission has been deleted. This field only pertains to user and group permissions. */
  deleted?: boolean;
  /** The "pretty" name of the value of the permission. The following is a list of examples for each type of permission:   - user - User's full name, as defined for their Google Account, such as "Joe Smith."  - group - Name of the Google Group, such as "The Company Administrators."  - domain - String domain name, such as "your-company.com."  - anyone - No displayName is present. */
  displayName?: string;
  /** The domain to which this permission refers. The following options are currently allowed:   - The entire domain, such as "your-company.com."  - A target audience, such as "ID.audience.googledomains.com." */
  domain?: string;
  /** The email address of the user or group to which this permission refers. */
  emailAddress?: string;
  /** The time at which this permission will expire (RFC 3339 date-time). Expiration times have the following restrictions:   - They cannot be set on shared drive items.  - They can only be set on user and group permissions.  - The time must be in the future.  - The time cannot be more than one year in the future. */
  expirationTime?: string;
  /** The ID of this permission. This is a unique identifier for the grantee, and is published in User resources as permissionId. IDs should be treated as opaque values. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#permission". */
  kind?: string;
  /** Whether the account associated with this permission is a pending owner. Only populated for user type permissions for files that aren't in a shared drive. */
  pendingOwner?: boolean;
  /** Details of whether the permissions on this shared drive item are inherited or are directly on this item. This is an output-only field that's present only for shared drive items. */
  permissionDetails?: ({ inherited?: boolean; inheritedFrom?: string; permissionType?: string; role?: string })[];
  /** A link to the user's profile photo, if available. */
  photoLink?: string;
  /** The role granted by this permission. While new values may be supported in the future, the following are currently allowed:   - owner  - organizer  - fileOrganizer  - writer  - commenter  - reader */
  role?: string;
  /** Deprecated - use permissionDetails instead. */
  teamDrivePermissionDetails?: ({ inherited?: boolean; inheritedFrom?: string; role?: string; teamDrivePermissionType?: string })[];
  /** The type of the grantee. Valid values are:   - user  - group  - domain  - anyone  When creating a permission, if type is user or group, you must provide an emailAddress for the user or group. When type is domain, you must provide a domain. There isn't extra information required for the anyone type. */
  type?: string;
  /** Indicates the view for this permission. Only populated for permissions that belong to a view. published is the only supported value. */
  view?: string;
  /** The ID of the file or shared drive. */
  fileId: string;
  /** The ID of the permission. */
  permissionId: string;
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
  /** Whether to remove the expiration date. */
  removeExpiration?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. File owners can only transfer ownership of files existing on My Drive. Files existing in a shared drive are owned by the organization that owns that shared drive. Ownership transfers are not supported for files and folders in shared drives. Organizers of a shared drive can move items from that shared drive into their My Drive which transfers the ownership to them. */
  transferOwnership?: boolean;
  /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
  useDomainAdminAccess?: boolean;
}): Promise<Permission>
```

<sub>`PATCH /files/{fileId}/permissions/{permissionId}` · `drive.permissions.update`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
