import type { GatewayClient } from "@aprovan/registry-main";
import type { Group, Member, PermissionGrant } from "./types";

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
