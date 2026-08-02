import { afterEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

afterEach(() => {
  delete process.env["OIDC_ISSUER"];
  delete process.env["OIDCAUDIENCE"];
});

describe("greenfield gateway contract", () => {
  it("advertises local auth mode without OIDC", async () => {
    const response = await createApp().request("/config");
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      mode: "none",
      features: { ephemeralCredentials: true, streaming: true },
    });
  });

  it("publishes one workspace-less MCP resource", async () => {
    const response = await createApp().request(
      "/.well-known/oauth-protected-resource/api/mcp",
      { headers: { Host: "aprovan.com" } },
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      resource: "https://aprovan.com/api/mcp",
      resource_name: "Aprovan Gateway",
    });
  });

  it("does not expose workspace-scoped MCP routes", async () => {
    const response = await createApp().request("/mcp/workspace-id", {
      method: "POST",
    });
    expect(response.status).toBe(404);
  });

  it("requires the strict tool request envelope", async () => {
    const response = await createApp().request("/tools/github/users.get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: "aprovan" }),
    });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "args must be an object" });
  });
});
