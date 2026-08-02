export interface Member {
  userId: string;
  role: string;
  createdAt?: string;
}

export interface Group {
  workspaceId: string;
  groupId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionGrant {
  id: string;
  workspaceId: string;
  callerId: string;
  provider: string;
  operation: string;
  grantedBy: string;
  createdAt: string;
}
