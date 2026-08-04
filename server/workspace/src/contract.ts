import type { AuthMode } from "./middleware/auth.js";

export interface GatewayConfig {
  mode: AuthMode;
  auth: {
    authority?: string;
    clientId?: string;
    domain?: string;
  };
  features: {
    ephemeralCredentials: boolean;
    streaming: boolean;
  };
  version: string;
}

export interface ToolCredential {
  type: "bearer_token" | "api_key";
  token?: string;
  value?: string;
  name?: string;
  in?: "header" | "query";
}

export interface ToolCallRequest {
  args: Record<string, unknown>;
  /** Profile name pinned by depth-0 configure / client pin. Travels out of band. */
  profile?: string;
  /** Call-site options (no transport keys). Merged over profile options. */
  options?: Record<string, unknown>;
  credential?: ToolCredential;
  stream?: boolean;
}
