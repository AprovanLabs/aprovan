export {
  createGatewayClient,
  DEFAULT_AUTH_HEADER,
  GatewayError,
  saveStoredSession,
  loadStoredSession,
  clearStoredSession,
  type GatewayClient,
  type GatewayClientConfig,
  type GatewayRequestOptions,
  type SessionInfo,
  type WorkspaceSummary,
  type SessionStoreKeys,
  type StoredSession,
} from "./client";

export {
  createGatewayResolver,
  type CreateGatewayResolverOptions,
  type GatewayResolver,
  type WorkspaceEndpoint,
  type WorkspaceEndpointSource,
} from "./resolver";

export {
  useGatewaySession,
  type GatewaySessionState,
  type GatewaySessionStatus,
} from "./react";
