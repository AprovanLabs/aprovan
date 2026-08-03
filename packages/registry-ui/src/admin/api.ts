import type { GatewayClient } from "@aprovan/registry-main";
import type {
  ApiKey,
  AuditEntry,
  GrantSubjectKind,
  Group,
  GroupProfileSummary,
  Member,
  PermissionGrant,
  Profile,
  ProfileCreateInput,
  ProfileGrant,
  ProfileUpdateInput,
  ProfileWire,
} from "./types";

export async function listMembers(client: GatewayClient): Promise<Member[]> {
  const data = await client.request<{ members: Member[] }>("/members");
  return data.members;
}

export async function removeMember(client: GatewayClient, userId: string): Promise<void> {
  await client.request<void>(`/members/${userId}`, true, { method: "DELETE" });
}

export async function listGroups(client: GatewayClient): Promise<Group[]> {
  const data = await client.request<{ groups: Group[] }>("/groups");
  return data.groups;
}

export async function createGroup(
  client: GatewayClient,
  input: { name: string; description?: string },
): Promise<Group> {
  return client.request<Group>("/groups", true, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateGroup(
  client: GatewayClient,
  groupId: string,
  input: { name?: string; description?: string },
): Promise<Group> {
  return client.request<Group>(`/groups/${groupId}`, true, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteGroup(client: GatewayClient, groupId: string): Promise<void> {
  await client.request<void>(`/groups/${groupId}`, true, { method: "DELETE" });
}

export async function listGroupUsers(
  client: GatewayClient,
  groupId: string,
): Promise<string[]> {
  const data = await client.request<{ userIds: string[] }>(`/groups/${groupId}/users`);
  return data.userIds;
}

export async function addUserToGroup(
  client: GatewayClient,
  groupId: string,
  userId: string,
): Promise<void> {
  await client.request(`/groups/${groupId}/users`, true, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

export async function removeUserFromGroup(
  client: GatewayClient,
  groupId: string,
  userId: string,
): Promise<void> {
  await client.request(`/groups/${groupId}/users`, true, {
    method: "DELETE",
    body: JSON.stringify({ userId }),
  });
}

export async function listPermissions(
  client: GatewayClient,
  callerId?: string,
): Promise<PermissionGrant[]> {
  const query = callerId ? `?callerId=${encodeURIComponent(callerId)}` : "";
  const data = await client.request<{ permissions: PermissionGrant[] }>(
    `/permissions${query}`,
  );
  return data.permissions;
}

export async function revokePermission(client: GatewayClient, id: string): Promise<void> {
  await client.request<void>(`/permissions/${id}`, true, { method: "DELETE" });
}

export async function listApiKeys(client: GatewayClient): Promise<ApiKey[]> {
  const data = await client.request<{ keys: ApiKey[] }>("/api-keys");
  return data.keys;
}

export async function mintApiKey(
  client: GatewayClient,
  input: { label?: string } = {},
): Promise<{ key: ApiKey; plaintext: string }> {
  return client.request<{ key: ApiKey; plaintext: string }>("/api-keys", true, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function revokeApiKey(client: GatewayClient, id: string): Promise<void> {
  await client.request<{ revoked: boolean }>(`/api-keys/${id}`, true, { method: "DELETE" });
}

export async function listProfiles(client: GatewayClient): Promise<Profile[]> {
  const data = await client.request<{ profiles: Profile[] }>("/profiles");
  return data.profiles;
}

export async function createProfile(
  client: GatewayClient,
  input: ProfileCreateInput,
): Promise<Profile> {
  const data = await client.request<{ profile: Profile }>("/profiles", true, {
    method: "POST",
    body: JSON.stringify(input),
  });
  return data.profile;
}

export async function updateProfile(
  client: GatewayClient,
  id: string,
  input: ProfileUpdateInput,
): Promise<Profile> {
  const data = await client.request<{ profile: Profile }>(`/profiles/${id}`, true, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
  return data.profile;
}

export async function deleteProfile(client: GatewayClient, id: string): Promise<void> {
  await client.request<{ ok: boolean }>(`/profiles/${id}`, true, { method: "DELETE" });
}

export async function listProfileGrants(
  client: GatewayClient,
  profileId: string,
): Promise<ProfileGrant[]> {
  const data = await client.request<{ grants: ProfileGrant[] }>(
    `/profiles/${profileId}/grants`,
  );
  return data.grants;
}

export async function addProfileGrant(
  client: GatewayClient,
  profileId: string,
  subject: { kind: GrantSubjectKind; id: string },
): Promise<ProfileGrant> {
  const data = await client.request<{ grant: ProfileGrant }>(
    `/profiles/${profileId}/grants`,
    true,
    {
      method: "POST",
      body: JSON.stringify({ subject }),
    },
  );
  return data.grant;
}

export async function revokeProfileGrant(
  client: GatewayClient,
  profileId: string,
  subject: { kind: GrantSubjectKind; id: string },
): Promise<void> {
  await client.request<{ revoked: boolean }>(`/profiles/${profileId}/grants`, true, {
    method: "DELETE",
    body: JSON.stringify({ subject }),
  });
}

export async function listAudit(
  client: GatewayClient,
  filter?: { since?: string; limit?: number },
): Promise<AuditEntry[]> {
  const params = new URLSearchParams();
  if (filter?.since) params.set("since", filter.since);
  if (filter?.limit !== undefined) params.set("limit", String(filter.limit));
  const query = params.toString();
  const data = await client.request<{ audit: AuditEntry[] }>(
    `/audit${query ? `?${query}` : ""}`,
  );
  return data.audit;
}

/** Workspace profiles for the group attach picker (GET /profiles). */
export async function listWorkspaceProfiles(
  client: GatewayClient,
): Promise<ProfileWire[]> {
  const data = await client.request<{ profiles: ProfileWire[] }>("/profiles");
  return data.profiles;
}

export async function listGroupProfiles(
  client: GatewayClient,
  groupId: string,
): Promise<GroupProfileSummary[]> {
  const data = await client.request<{ profiles: GroupProfileSummary[] }>(
    `/groups/${groupId}/profiles`,
  );
  return data.profiles;
}

export async function attachGroupProfile(
  client: GatewayClient,
  groupId: string,
  profileRef: string,
): Promise<GroupProfileSummary> {
  return client.request<GroupProfileSummary>(`/groups/${groupId}/profiles`, true, {
    method: "POST",
    body: JSON.stringify({ profile: profileRef }),
  });
}

export async function detachGroupProfile(
  client: GatewayClient,
  groupId: string,
  profileRef: string,
): Promise<void> {
  await client.request<{ removed: boolean }>(`/groups/${groupId}/profiles`, true, {
    method: "DELETE",
    body: JSON.stringify({ profile: profileRef }),
  });
}
