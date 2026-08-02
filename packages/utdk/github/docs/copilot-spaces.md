# Copilot Spaces

28 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.copilotSpaces.listForOrg`

List organization Copilot Spaces — [API reference](https://docs.github.com/rest/copilot-spaces/copilot-spaces#list-organization-copilot-spaces)

```ts
github.copilotSpaces.listForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. */
  after?: string;
}): Promise<{ spaces: (CopilotSpace)[] }>
```

<sub>`GET /orgs/{org}/copilot-spaces` · `copilot-spaces/list-for-org`</sub>

## `github.copilotSpaces.createForOrg`

Create an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/copilot-spaces#create-an-organization-copilot-space)

```ts
github.copilotSpaces.createForOrg(input: {
  /** The name of the Copilot Space. */
  name: string;
  /** A description of the Copilot Space. */
  description?: string;
  /** General instructions for the Copilot Space. */
  general_instructions?: string;
  /** The base role that determines default permissions for organization members. - `no_access`: No default access (default) - `reader`: Organization members can read the space - `writer`: Organization members can read and edit the space - `admin`: Organization members have full admin access to the space */
  base_role?: "reader" | "writer" | "admin" | "no_access";
  /** Resources to attach to the space. */
  resources_attributes?: ({ resource_type?: "repository" | "github_file" | "free_text" | "github_issue" | "github_pull_request" | "media_content" | "uploaded_text_file"; metadata?: { repository_id?: number; file_path?: string; text?: string; name?: string; number?: number } })[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<CopilotSpace>
```

<sub>`POST /orgs/{org}/copilot-spaces` · `copilot-spaces/create-for-org`</sub>

## `github.copilotSpaces.deleteForOrg`

Delete an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/copilot-spaces#delete-an-organization-copilot-space)

```ts
github.copilotSpaces.deleteForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/copilot-spaces/{space_number}` · `copilot-spaces/delete-for-org`</sub>

## `github.copilotSpaces.getForOrg`

Get an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/copilot-spaces#get-an-organization-copilot-space)

```ts
github.copilotSpaces.getForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<CopilotSpace>
```

<sub>`GET /orgs/{org}/copilot-spaces/{space_number}` · `copilot-spaces/get-for-org`</sub>

## `github.copilotSpaces.updateForOrg`

Set an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/copilot-spaces#set-an-organization-copilot-space)

```ts
github.copilotSpaces.updateForOrg(input: {
  /** The name of the Copilot Space. */
  name?: string;
  /** A description of the Copilot Space. */
  description?: string;
  /** General instructions for the Copilot Space. */
  general_instructions?: string;
  /** The base role that determines default permissions for organization members. Changing this field requires admin permissions. - `no_access`: No default access (default) - `reader`: Organization members can read the space - `writer`: Organization members can read and edit the space - `admin`: Organization members have full admin access to the space */
  base_role?: "reader" | "writer" | "admin" | "no_access";
  /** Resources to attach to the space. */
  resources_attributes?: ({ resource_type?: "repository" | "github_file" | "free_text" | "github_issue" | "github_pull_request" | "media_content" | "uploaded_text_file"; metadata?: { repository_id?: number; file_path?: string; text?: string; name?: string; number?: number } })[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<CopilotSpace>
```

<sub>`PUT /orgs/{org}/copilot-spaces/{space_number}` · `copilot-spaces/update-for-org`</sub>

## `github.copilotSpaces.listCollaboratorsForOrg`

List collaborators for an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/collaborators#list-collaborators-for-an-organization-copilot-space)

```ts
github.copilotSpaces.listCollaboratorsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<{ collaborators: (CopilotSpaceCollaborator)[] }>
```

<sub>`GET /orgs/{org}/copilot-spaces/{space_number}/collaborators` · `copilot-spaces/list-collaborators-for-org`</sub>

## `github.copilotSpaces.addCollaboratorForOrg`

Add a collaborator to an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/collaborators#add-a-collaborator-to-an-organization-copilot-space)

```ts
github.copilotSpaces.addCollaboratorForOrg(input: {
  /** The type of actor (user or team). */
  actor_type: "User" | "Team";
  /** The username (for users) or team slug (for teams). The numeric ID of a user or team is also accepted. */
  actor_identifier: string;
  /** The role to grant to the collaborator. */
  role: "reader" | "writer" | "admin";
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<CopilotSpaceCollaborator>
```

<sub>`POST /orgs/{org}/copilot-spaces/{space_number}/collaborators` · `copilot-spaces/add-collaborator-for-org`</sub>

## `github.copilotSpaces.removeCollaboratorForOrg`

Remove a collaborator from an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/collaborators#remove-a-collaborator-from-an-organization-copilot-space)

```ts
github.copilotSpaces.removeCollaboratorForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
  /** The type of actor (user or team). */
  actor_type: "User" | "Team";
  /** The username (for users) or team slug (for teams). The numeric ID of a user or team is also accepted. */
  actor_identifier: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}` · `copilot-spaces/remove-collaborator-for-org`</sub>

## `github.copilotSpaces.updateCollaboratorForOrg`

Set a collaborator role for an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/collaborators#set-a-collaborator-role-for-an-organization-copilot-space)

```ts
github.copilotSpaces.updateCollaboratorForOrg(input: {
  /** The new role to grant to the collaborator. Use `no_access` to remove the collaborator. */
  role: "reader" | "writer" | "admin" | "no_access";
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
  /** The type of actor (user or team). */
  actor_type: "User" | "Team";
  /** The username (for users) or team slug (for teams). The numeric ID of a user or team is also accepted. */
  actor_identifier: string;
}): Promise<CopilotSpaceCollaborator>
```

<sub>`PUT /orgs/{org}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}` · `copilot-spaces/update-collaborator-for-org`</sub>

## `github.copilotSpaces.listResourcesForOrg`

List resources for an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/resources#list-resources-for-an-organization-copilot-space)

```ts
github.copilotSpaces.listResourcesForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<{ resources: (CopilotSpaceResource)[] }>
```

<sub>`GET /orgs/{org}/copilot-spaces/{space_number}/resources` · `copilot-spaces/list-resources-for-org`</sub>

## `github.copilotSpaces.createResourceForOrg`

Create a resource for an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/resources#create-a-resource-for-an-organization-copilot-space)

```ts
github.copilotSpaces.createResourceForOrg(input: {
  /** The type of resource to create. */
  resource_type: "repository" | "github_file" | "free_text" | "github_issue" | "github_pull_request";
  /** Resource-specific metadata. */
  metadata: { [key: string]: unknown };
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<CopilotSpaceResource>
```

<sub>`POST /orgs/{org}/copilot-spaces/{space_number}/resources` · `copilot-spaces/create-resource-for-org`</sub>

## `github.copilotSpaces.deleteResourceForOrg`

Delete a resource from an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/resources#delete-a-resource-from-an-organization-copilot-space)

```ts
github.copilotSpaces.deleteResourceForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
  /** The unique identifier of the resource. */
  space_resource_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}` · `copilot-spaces/delete-resource-for-org`</sub>

## `github.copilotSpaces.getResourceForOrg`

Get a resource for an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/resources#get-a-resource-for-an-organization-copilot-space)

```ts
github.copilotSpaces.getResourceForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
  /** The unique identifier of the resource. */
  space_resource_id: number;
}): Promise<CopilotSpaceResource>
```

<sub>`GET /orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}` · `copilot-spaces/get-resource-for-org`</sub>

## `github.copilotSpaces.updateResourceForOrg`

Set a resource for an organization Copilot Space — [API reference](https://docs.github.com/rest/copilot-spaces/resources#set-a-resource-for-an-organization-copilot-space)

```ts
github.copilotSpaces.updateResourceForOrg(input: {
  /** Updated resource-specific metadata. */
  metadata?: { [key: string]: unknown };
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
  /** The unique identifier of the resource. */
  space_resource_id: number;
}): Promise<CopilotSpaceResource>
```

<sub>`PUT /orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}` · `copilot-spaces/update-resource-for-org`</sub>

## `github.copilotSpaces.listForUser`

List Copilot Spaces for a user — [API reference](https://docs.github.com/rest/copilot-spaces/copilot-spaces#list-copilot-spaces-for-a-user)

```ts
github.copilotSpaces.listForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. */
  after?: string;
}): Promise<{ spaces: (CopilotSpace)[] }>
```

<sub>`GET /users/{username}/copilot-spaces` · `copilot-spaces/list-for-user`</sub>

## `github.copilotSpaces.createForUser`

Create a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/copilot-spaces#create-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.createForUser(input: {
  /** The name of the Copilot Space. */
  name: string;
  /** A description of the Copilot Space. */
  description?: string;
  /** General instructions for the Copilot Space. */
  general_instructions?: string;
  /** The base role that determines default permissions for the space. - `no_access`: No default access (default) - `reader`: Makes the space publicly readable Note: User spaces do not support writer or admin base roles. */
  base_role?: "reader" | "no_access";
  /** Resources to attach to the space. */
  resources_attributes?: ({ resource_type?: "repository" | "github_file" | "free_text" | "github_issue" | "github_pull_request" | "media_content" | "uploaded_text_file"; metadata?: { repository_id?: number; file_path?: string; text?: string; name?: string; number?: number } })[];
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<CopilotSpace>
```

<sub>`POST /users/{username}/copilot-spaces` · `copilot-spaces/create-for-user`</sub>

## `github.copilotSpaces.deleteForUser`

Delete a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/copilot-spaces#delete-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.deleteForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<BasicError>
```

<sub>`DELETE /users/{username}/copilot-spaces/{space_number}` · `copilot-spaces/delete-for-user`</sub>

## `github.copilotSpaces.getForUser`

Get a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/copilot-spaces#get-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.getForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<CopilotSpace>
```

<sub>`GET /users/{username}/copilot-spaces/{space_number}` · `copilot-spaces/get-for-user`</sub>

## `github.copilotSpaces.updateForUser`

Set a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/copilot-spaces#set-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.updateForUser(input: {
  /** The name of the Copilot Space. */
  name?: string;
  /** A description of the Copilot Space. */
  description?: string;
  /** General instructions for the Copilot Space. */
  general_instructions?: string;
  /** The base role that determines default permissions for the space. Changing this field requires admin permissions. - `no_access`: No default access (default) - `reader`: Makes the space publicly readable Note: User spaces do not support writer or admin base roles. */
  base_role?: "reader" | "no_access";
  /** Resources to attach to the space. */
  resources_attributes?: ({ resource_type?: "repository" | "github_file" | "free_text" | "github_issue" | "github_pull_request" | "media_content" | "uploaded_text_file"; metadata?: { repository_id?: number; file_path?: string; text?: string; name?: string; number?: number } })[];
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<CopilotSpace>
```

<sub>`PUT /users/{username}/copilot-spaces/{space_number}` · `copilot-spaces/update-for-user`</sub>

## `github.copilotSpaces.listCollaboratorsForUser`

List collaborators for a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/collaborators#list-collaborators-for-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.listCollaboratorsForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<{ collaborators: (CopilotSpaceCollaborator)[] }>
```

<sub>`GET /users/{username}/copilot-spaces/{space_number}/collaborators` · `copilot-spaces/list-collaborators-for-user`</sub>

## `github.copilotSpaces.addCollaboratorForUser`

Add a collaborator to a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/collaborators#add-a-collaborator-to-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.addCollaboratorForUser(input: {
  /** The type of actor (must be `User` for user-owned spaces; `Team` will be rejected). */
  actor_type: "User" | "Team";
  /** The username of the collaborator. The numeric user ID is also accepted. */
  actor_identifier: string;
  /** The role to grant to the collaborator. */
  role: "reader" | "writer" | "admin";
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<CopilotSpaceCollaborator>
```

<sub>`POST /users/{username}/copilot-spaces/{space_number}/collaborators` · `copilot-spaces/add-collaborator-for-user`</sub>

## `github.copilotSpaces.removeCollaboratorForUser`

Remove a collaborator from a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/collaborators#remove-a-collaborator-from-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.removeCollaboratorForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
  /** The type of actor (must be `User` for user-owned spaces; `Team` will be rejected). */
  actor_type: "User" | "Team";
  /** The username of the collaborator. The numeric user ID is also accepted. */
  actor_identifier: string;
}): Promise<BasicError>
```

<sub>`DELETE /users/{username}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}` · `copilot-spaces/remove-collaborator-for-user`</sub>

## `github.copilotSpaces.updateCollaboratorForUser`

Set a collaborator role for a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/collaborators#set-a-collaborator-role-for-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.updateCollaboratorForUser(input: {
  /** The new role to grant to the collaborator. Use `no_access` to remove the collaborator. */
  role: "reader" | "writer" | "admin" | "no_access";
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
  /** The type of actor (must be `User` for user-owned spaces; `Team` will be rejected). */
  actor_type: "User" | "Team";
  /** The username of the collaborator. The numeric user ID is also accepted. */
  actor_identifier: string;
}): Promise<CopilotSpaceCollaborator>
```

<sub>`PUT /users/{username}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}` · `copilot-spaces/update-collaborator-for-user`</sub>

## `github.copilotSpaces.listResourcesForUser`

List resources for a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/resources#list-resources-for-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.listResourcesForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<{ resources: (CopilotSpaceResource)[] }>
```

<sub>`GET /users/{username}/copilot-spaces/{space_number}/resources` · `copilot-spaces/list-resources-for-user`</sub>

## `github.copilotSpaces.createResourceForUser`

Create a resource for a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/resources#create-a-resource-for-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.createResourceForUser(input: {
  /** The type of resource to create. */
  resource_type: "repository" | "github_file" | "free_text" | "github_issue" | "github_pull_request";
  /** Resource-specific metadata. */
  metadata: { [key: string]: unknown };
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
}): Promise<CopilotSpaceResource>
```

<sub>`POST /users/{username}/copilot-spaces/{space_number}/resources` · `copilot-spaces/create-resource-for-user`</sub>

## `github.copilotSpaces.deleteResourceForUser`

Delete a resource from a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/resources#delete-a-resource-from-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.deleteResourceForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
  /** The unique identifier of the resource. */
  space_resource_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}` · `copilot-spaces/delete-resource-for-user`</sub>

## `github.copilotSpaces.getResourceForUser`

Get a resource for a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/resources#get-a-resource-for-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.getResourceForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
  /** The unique identifier of the resource. */
  space_resource_id: number;
}): Promise<CopilotSpaceResource>
```

<sub>`GET /users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}` · `copilot-spaces/get-resource-for-user`</sub>

## `github.copilotSpaces.updateResourceForUser`

Set a resource for a Copilot Space for a user — [API reference](https://docs.github.com/rest/copilot-spaces/resources#set-a-resource-for-a-copilot-space-for-a-user)

```ts
github.copilotSpaces.updateResourceForUser(input: {
  /** Updated resource-specific metadata. */
  metadata?: { [key: string]: unknown };
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the Copilot Space. */
  space_number: number;
  /** The unique identifier of the resource. */
  space_resource_id: number;
}): Promise<CopilotSpaceResource>
```

<sub>`PUT /users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}` · `copilot-spaces/update-resource-for-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
