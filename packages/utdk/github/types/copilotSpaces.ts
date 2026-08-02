import type { BasicError, CopilotSpace, CopilotSpaceCollaborator, CopilotSpaceResource } from "./schemas.js";

export type CopilotSpacesOperations = {
  /**
   * List organization Copilot Spaces
   * @see https://docs.github.com/rest/copilot-spaces/copilot-spaces#list-organization-copilot-spaces
   */
  listForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. */
    after?: string;
  }) => Promise<{ spaces: (CopilotSpace)[] }>;

  /**
   * Create an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/copilot-spaces#create-an-organization-copilot-space
   */
  createForOrg: (input: {
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
  }) => Promise<CopilotSpace>;

  /**
   * Get an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/copilot-spaces#get-an-organization-copilot-space
   */
  getForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
  }) => Promise<CopilotSpace>;

  /**
   * Set an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/copilot-spaces#set-an-organization-copilot-space
   */
  updateForOrg: (input: {
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
  }) => Promise<CopilotSpace>;

  /**
   * Delete an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/copilot-spaces#delete-an-organization-copilot-space
   */
  deleteForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
  }) => Promise<BasicError>;

  /**
   * List collaborators for an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/collaborators#list-collaborators-for-an-organization-copilot-space
   */
  listCollaboratorsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
  }) => Promise<{ collaborators: (CopilotSpaceCollaborator)[] }>;

  /**
   * Add a collaborator to an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/collaborators#add-a-collaborator-to-an-organization-copilot-space
   */
  addCollaboratorForOrg: (input: {
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
  }) => Promise<CopilotSpaceCollaborator>;

  /**
   * Set a collaborator role for an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/collaborators#set-a-collaborator-role-for-an-organization-copilot-space
   */
  updateCollaboratorForOrg: (input: {
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
  }) => Promise<CopilotSpaceCollaborator>;

  /**
   * Remove a collaborator from an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/collaborators#remove-a-collaborator-from-an-organization-copilot-space
   */
  removeCollaboratorForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
    /** The type of actor (user or team). */
    actor_type: "User" | "Team";
    /** The username (for users) or team slug (for teams). The numeric ID of a user or team is also accepted. */
    actor_identifier: string;
  }) => Promise<BasicError>;

  /**
   * List resources for an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/resources#list-resources-for-an-organization-copilot-space
   */
  listResourcesForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
  }) => Promise<{ resources: (CopilotSpaceResource)[] }>;

  /**
   * Create a resource for an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/resources#create-a-resource-for-an-organization-copilot-space
   */
  createResourceForOrg: (input: {
    /** The type of resource to create. */
    resource_type: "repository" | "github_file" | "free_text" | "github_issue" | "github_pull_request";
    /** Resource-specific metadata. */
    metadata: { [key: string]: unknown };
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
  }) => Promise<CopilotSpaceResource>;

  /**
   * Get a resource for an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/resources#get-a-resource-for-an-organization-copilot-space
   */
  getResourceForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
    /** The unique identifier of the resource. */
    space_resource_id: number;
  }) => Promise<CopilotSpaceResource>;

  /**
   * Set a resource for an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/resources#set-a-resource-for-an-organization-copilot-space
   */
  updateResourceForOrg: (input: {
    /** Updated resource-specific metadata. */
    metadata?: { [key: string]: unknown };
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
    /** The unique identifier of the resource. */
    space_resource_id: number;
  }) => Promise<CopilotSpaceResource>;

  /**
   * Delete a resource from an organization Copilot Space
   * @see https://docs.github.com/rest/copilot-spaces/resources#delete-a-resource-from-an-organization-copilot-space
   */
  deleteResourceForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
    /** The unique identifier of the resource. */
    space_resource_id: number;
  }) => Promise<BasicError>;

  /**
   * List Copilot Spaces for a user
   * @see https://docs.github.com/rest/copilot-spaces/copilot-spaces#list-copilot-spaces-for-a-user
   */
  listForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. */
    after?: string;
  }) => Promise<{ spaces: (CopilotSpace)[] }>;

  /**
   * Create a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/copilot-spaces#create-a-copilot-space-for-a-user
   */
  createForUser: (input: {
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
  }) => Promise<CopilotSpace>;

  /**
   * Get a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/copilot-spaces#get-a-copilot-space-for-a-user
   */
  getForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
  }) => Promise<CopilotSpace>;

  /**
   * Set a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/copilot-spaces#set-a-copilot-space-for-a-user
   */
  updateForUser: (input: {
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
  }) => Promise<CopilotSpace>;

  /**
   * Delete a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/copilot-spaces#delete-a-copilot-space-for-a-user
   */
  deleteForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
  }) => Promise<BasicError>;

  /**
   * List collaborators for a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/collaborators#list-collaborators-for-a-copilot-space-for-a-user
   */
  listCollaboratorsForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
  }) => Promise<{ collaborators: (CopilotSpaceCollaborator)[] }>;

  /**
   * Add a collaborator to a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/collaborators#add-a-collaborator-to-a-copilot-space-for-a-user
   */
  addCollaboratorForUser: (input: {
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
  }) => Promise<CopilotSpaceCollaborator>;

  /**
   * Set a collaborator role for a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/collaborators#set-a-collaborator-role-for-a-copilot-space-for-a-user
   */
  updateCollaboratorForUser: (input: {
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
  }) => Promise<CopilotSpaceCollaborator>;

  /**
   * Remove a collaborator from a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/collaborators#remove-a-collaborator-from-a-copilot-space-for-a-user
   */
  removeCollaboratorForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
    /** The type of actor (must be `User` for user-owned spaces; `Team` will be rejected). */
    actor_type: "User" | "Team";
    /** The username of the collaborator. The numeric user ID is also accepted. */
    actor_identifier: string;
  }) => Promise<BasicError>;

  /**
   * List resources for a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/resources#list-resources-for-a-copilot-space-for-a-user
   */
  listResourcesForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
  }) => Promise<{ resources: (CopilotSpaceResource)[] }>;

  /**
   * Create a resource for a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/resources#create-a-resource-for-a-copilot-space-for-a-user
   */
  createResourceForUser: (input: {
    /** The type of resource to create. */
    resource_type: "repository" | "github_file" | "free_text" | "github_issue" | "github_pull_request";
    /** Resource-specific metadata. */
    metadata: { [key: string]: unknown };
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
  }) => Promise<CopilotSpaceResource>;

  /**
   * Get a resource for a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/resources#get-a-resource-for-a-copilot-space-for-a-user
   */
  getResourceForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
    /** The unique identifier of the resource. */
    space_resource_id: number;
  }) => Promise<CopilotSpaceResource>;

  /**
   * Set a resource for a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/resources#set-a-resource-for-a-copilot-space-for-a-user
   */
  updateResourceForUser: (input: {
    /** Updated resource-specific metadata. */
    metadata?: { [key: string]: unknown };
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
    /** The unique identifier of the resource. */
    space_resource_id: number;
  }) => Promise<CopilotSpaceResource>;

  /**
   * Delete a resource from a Copilot Space for a user
   * @see https://docs.github.com/rest/copilot-spaces/resources#delete-a-resource-from-a-copilot-space-for-a-user
   */
  deleteResourceForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the Copilot Space. */
    space_number: number;
    /** The unique identifier of the resource. */
    space_resource_id: number;
  }) => Promise<BasicError>;
};
