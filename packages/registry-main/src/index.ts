export interface GatewayConfig {
  mode: "none" | "oidc";
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
  credential?: ToolCredential;
  stream?: boolean;
}

export interface GatewayClientOptions {
  baseUrl: string;
  getToken?: () => string | undefined | Promise<string | undefined>;
  getWorkspaceId?: () => string | undefined;
}

export class GatewayClient {
  constructor(private readonly options: GatewayClientOptions) {}

  config(): Promise<GatewayConfig> {
    return this.request<GatewayConfig>("/config", false);
  }

  listTools(): Promise<{ tools: unknown[] }> {
    return this.request("/tools");
  }

  searchTools(query: string): Promise<{ tools: unknown[] }> {
    return this.request(`/tools/search?q=${encodeURIComponent(query)}`);
  }

  callTool<T>(
    provider: string,
    operation: string,
    request: ToolCallRequest,
  ): Promise<T> {
    return this.request(
      `/tools/${encodeURIComponent(provider)}/${operation}`,
      true,
      { method: "POST", body: JSON.stringify(request) },
    );
  }

  async streamTool(
    provider: string,
    operation: string,
    request: ToolCallRequest,
  ): Promise<ReadableStream<Uint8Array>> {
    const response = await this.fetch(
      `/tools/${encodeURIComponent(provider)}/${operation}`,
      true,
      {
        method: "POST",
        headers: { Accept: "text/event-stream" },
        body: JSON.stringify({ ...request, stream: true }),
      },
    );
    if (!response.body) throw new Error("Gateway returned no stream");
    return response.body;
  }

  getPrompt(name: string): Promise<unknown> {
    return this.request(`/prompts/${encodeURIComponent(name)}`);
  }

  putPrompt(name: string, content: string): Promise<unknown> {
    return this.request(`/prompts/${encodeURIComponent(name)}`, true, {
      method: "PUT",
      body: JSON.stringify({ content }),
    });
  }

  getArtifact(name: string, hash?: string): Promise<unknown> {
    const path = `/artifacts/${encodeURIComponent(name)}${hash ? `/${hash}` : ""}`;
    return this.request(path);
  }

  async request<T>(
    path: string,
    authenticated = true,
    init?: RequestInit,
  ): Promise<T> {
    const response = await this.fetch(path, authenticated, init);
    return (await response.json()) as T;
  }

  private async fetch(
    path: string,
    authenticated: boolean,
    init: RequestInit = {},
  ): Promise<Response> {
    const headers = new Headers(init.headers);
    headers.set("Content-Type", "application/json");
    if (authenticated) {
      const token = await this.options.getToken?.();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      const workspace = this.options.getWorkspaceId?.();
      if (workspace) headers.set("X-Aprovan-Workspace", workspace);
    }
    const response = await fetch(
      `${this.options.baseUrl.replace(/\/$/, "")}${path}`,
      { ...init, headers },
    );
    if (!response.ok) {
      let detail = "";
      try {
        const body = (await response.json()) as { error?: string; detail?: string };
        if (typeof body.error === "string") detail = body.error;
        if (typeof body.detail === "string") detail += `: ${body.detail}`;
      } catch {
        // non-JSON error body; report status only
      }
      throw new Error(
        detail
          ? `Gateway request failed (${response.status}): ${detail}`
          : `Gateway request failed (${response.status})`,
      );
    }
    return response;
  }
}
