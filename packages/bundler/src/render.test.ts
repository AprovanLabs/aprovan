import { describe, expect, it } from "vitest";
import {
  createProviderSchemaTypes,
  renderProviderGroupTypes,
  renderProviderReadme,
  renderProviderSchemas,
  renderNamespaceEntry,
  renderNamespacePackageJson,
  renderProviderMetadata,
  renderProviderPackageJson,
  renderProviderTypes,
  renderRootPackageJson,
} from "./render.js";
import type { ClientToolDefinition } from "./client-api.js";
import type { RegistryProvider } from "./provider.js";
import type { Tool } from "@utcp/sdk";

function createTool(name: string): Tool {
  return {
    name,
    description: `Tool ${name}`,
    tags: [],
    tool_call_template: {
      call_template_type: "http",
      http_method: "GET",
      url: "https://example.com",
      content_type: "application/json",
    },
    inputs: {
      type: "object",
      properties: {},
    },
    outputs: {
      type: "object",
      properties: {},
    },
  } as unknown as Tool;
}

function createClientToolDefinition(accessPath: string[]): ClientToolDefinition {
  return {
    accessPath,
    hasInput: true,
    hasOptions: false,
    inputType: "{}",
    optionsOptional: true,
    optionsType: "{}",
    runtimeMetadata: {
      accessPath,
      bodyKind: "none",
      bodyPropertyKeys: [],
      method: "GET",
      routeTemplate: "/",
      headerParameterKeys: [],
      pathConflictKeys: [],
      pathParameterKeys: [],
      queryConflictKeys: [],
      queryParameterKeys: [],
    },
  };
}

describe("renderProviderTypes", () => {
  it("emits JSDoc comments and multi-line format for object input schemas with descriptions", () => {
    const rendered = renderProviderTypes(
      { name: "github" },
      [createTool("github.repos/get")],
      new Map(),
      new Map([
        [
          "github.repos/get",
          {
            ...createClientToolDefinition(["repos", "get"]),
            hasInput: true,
            inputSchema: {
              type: "object",
              properties: {
                owner: { type: "string", description: "The account owner of the repository." },
                repo: { type: "string", description: "The name of the repository without the .git extension." },
                issue_number: { type: "number" },
              },
              required: ["owner", "repo"],
            },
            inputType: "{ owner: string; repo: string; issue_number?: number }",
          },
        ],
      ]),
    );

    expect(rendered).toContain("/** The account owner of the repository. */");
    expect(rendered).toContain("owner: string;");
    expect(rendered).toContain("/** The name of the repository without the .git extension. */");
    expect(rendered).toContain("repo: string;");
    expect(rendered).toContain("issue_number?: number;");
    expect(rendered).toMatch(/input: \{\n/);
    expect(rendered).not.toContain("input: { owner: string");
  });

  it("renders object output schemas compactly", () => {
    const rendered = renderProviderTypes(
      { name: "github" },
      [
        {
          ...createTool("github.users/get"),
          outputs: {
            type: "object",
            properties: {
              login: { type: "string", description: "The user's login handle." },
              id: { type: "number", description: "Unique identifier for the user." },
            },
            required: ["login", "id"],
          },
        },
      ],
      new Map(),
      new Map([["github.users/get", createClientToolDefinition(["users", "get"])]]),
    );

    expect(rendered).toContain("Promise<{ login: string; id: number }>");
  });

  it("keeps compact inline format when inputSchema has no properties with descriptions", () => {
    const rendered = renderProviderTypes(
      { name: "example" },
      [createTool("example.ping")],
      new Map(),
      new Map([
        [
          "example.ping",
          {
            ...createClientToolDefinition(["ping"]),
            hasInput: false,
          },
        ],
      ]),
    );

    expect(rendered).toContain("ping: () => Promise<{ [key: string]: unknown }>;");
    expect(rendered).not.toMatch(/Promise<\{\n/);
  });

  it("preserves pre-rendered types from publicTypeMap without expansion", () => {
    const rendered = renderProviderTypes(
      { name: "github" },
      [createTool("github.users/get-by-username")],
      new Map([
        [
          "github.users/get-by-username",
          {
            inputType: "{ username: string }",
            outputType: "{ login: string }",
          },
        ],
      ]),
      new Map([
        [
          "github.users/get-by-username",
          {
            ...createClientToolDefinition(["users", "getByUsername"]),
            hasInput: true,
            inputType: "{ username: string }",
          },
        ],
      ]),
    );

    expect(rendered).toContain("input: { username: string }");
    expect(rendered).toContain("Promise<{ login: string }>");
    expect(rendered).not.toMatch(/input: \{\n/);
  });

  it("preserves operationId word boundaries in accessor names", () => {
    const rendered = renderProviderTypes(
      { name: "datadog" },
      [createTool("datadog.AddMemberTeam")],
      new Map(),
      new Map([["datadog.AddMemberTeam", createClientToolDefinition(["addMemberTeam"])]]),
    );

    expect(rendered).toContain("addMemberTeam: (input:");
    expect(rendered).not.toContain("addmemberteam: (input:");
    expect(rendered).not.toContain("export namespace datadog");
  });

  it("normalizes mixed naming styles consistently", () => {
    const rendered = renderProviderTypes(
      { name: "example" },
      [createTool("example.api_keys/ListAPIKeys"), createTool("example.events/list-events")],
      new Map(),
      new Map([
        ["example.api_keys/ListAPIKeys", createClientToolDefinition(["apiKeys", "listApiKeys"])],
        ["example.events/list-events", createClientToolDefinition(["events", "listEvents"])],
      ]),
    );

    expect(rendered).toContain("apiKeys: {");
    expect(rendered).toContain("listApiKeys: (input:");
    expect(rendered).toContain("events: {");
    expect(rendered).toContain("listEvents: (input:");
  });

  it("inlines method types and labels the second argument as options", () => {
    const rendered = renderProviderTypes(
      { name: "github" },
      [createTool("github.users/get-by-username")],
      new Map([
        [
          "github.users/get-by-username",
          {
            inputType: "{ username: string }",
            outputType: "{ login: string }",
          },
        ],
      ]),
      new Map([
        [
          "github.users/get-by-username",
          {
            ...createClientToolDefinition(["users", "getByUsername"]),
            hasInput: true,
            hasOptions: true,
            inputType: "{ username: string }",
            optionsType: '{ params: { username: string }; headers?: { "x-trace-id"?: string } }',
            optionsOptional: false,
          },
        ],
      ]),
    );

    expect(rendered).toContain(
      'getByUsername: (input: { username: string }, options: { params: { username: string }; headers?: { "x-trace-id"?: string } }) => Promise<{ login: string }>',
    );
    expect(rendered).not.toContain("RequestOverrides");
    expect(rendered).not.toContain("export namespace github");
    expect(rendered).not.toContain("github.users_get_by_username");
  });

  it("omits the input argument for tools with no input or options", () => {
    const rendered = renderProviderTypes(
      { name: "example" },
      [createTool("example.get-queue")],
      new Map(),
      new Map([
        [
          "example.get-queue",
          {
            ...createClientToolDefinition(["getQueue"]),
            hasInput: false,
          },
        ],
      ]),
    );

    expect(rendered).toContain("getQueue: () => Promise<{ [key: string]: unknown }>;");
    expect(rendered).not.toContain("getQueue: (input:");
  });

  it("uses options as the only argument for input-less tools with overrides", () => {
    const rendered = renderProviderTypes(
      { name: "example" },
      [createTool("example.inspect")],
      new Map(),
      new Map([
        [
          "example.inspect",
          {
            ...createClientToolDefinition(["inspect"]),
            hasInput: false,
            hasOptions: true,
            optionsType: '{ headers: { "x-api-key": string } }',
            optionsOptional: false,
          },
        ],
      ]),
    );

    expect(rendered).toContain('inspect: (options: { headers: { "x-api-key": string } }) => Promise<{ [key: string]: unknown }>;');
    expect(rendered).not.toContain("inspect: (input:");
  });
});

describe("nested provider rendering", () => {
  it("adds namespace and leaf exports to the root package", () => {
    const rendered = renderRootPackageJson([
      { name: "github", url: "https://example.com/github.json" },
      { name: "google/books", url: "https://example.com/google-books.json" },
    ] satisfies RegistryProvider[]);

    expect(rendered).toContain('"./github"');
    expect(rendered).toContain('"./google"');
    expect(rendered).toContain('"./google/books"');
  });

  it("renders namespace entries for nested providers", () => {
    const rendered = renderNamespaceEntry(
      ["google"],
      [
        { name: "google/books", url: "https://example.com/google-books.json" },
        { name: "google/calendar", url: "https://example.com/google-calendar.json" },
      ] satisfies RegistryProvider[],
    );

    expect(rendered).toContain('export { default as books } from "./books/index.js";');
    expect(rendered).toContain('export { default as calendar } from "./calendar/index.js";');
    expect(rendered).not.toContain("export *");
  });

  it("renders the namespace package as a private, nameless subpath package", () => {
    const rendered = renderNamespacePackageJson(
      "google/books",
      [{ name: "google/books", url: "https://example.com/google-books.json" }] satisfies RegistryProvider[],
      undefined,
      new Date("2026-04-07T00:00:00.000Z"),
    );

    expect(rendered).toContain('"private": true');
    expect(rendered).not.toContain('"name":');
    expect(rendered).toContain('"namespace": "google"');
    expect(rendered).toContain('"providers": [');
    expect(rendered).toContain('"google/books"');
  });

  it("strips the full provider prefix from metadata keys", () => {
    const rendered = renderProviderMetadata(
      {
        name: "google/books",
        options: {
          operations: {
            stripPrefix: "books.",
          },
        },
      },
      new Map([["google.books.volumes/list", createClientToolDefinition(["volumes", "list"])]]),
      "../../client.js",
    );

    expect(rendered).toContain('"volumes/list"');
    expect(rendered).not.toContain('"books.volumes/list"');
    expect(rendered).toContain('"../../client.js"');
  });

  it("includes description and parameterDescriptions in metadata output", () => {
    const entry = createClientToolDefinition(["listItems"]);
    entry.runtimeMetadata.description = "Returns a paginated list of items";
    entry.runtimeMetadata.parameterDescriptions = {
      limit: "Maximum items to return",
      offset: "Offset for pagination",
    };

    const rendered = renderProviderMetadata(
      { name: "example" },
      new Map([["example.listItems", entry]]),
    );

    expect(rendered).toContain('"description": "Returns a paginated list of items"');
    expect(rendered).toContain('"parameterDescriptions"');
    expect(rendered).toContain('"limit": "Maximum items to return"');
    expect(rendered).toContain('"offset": "Offset for pagination"');
  });

  it("omits undefined description and parameterDescriptions from metadata output", () => {
    const entry = createClientToolDefinition(["getItem"]);
    entry.runtimeMetadata.description = undefined;
    entry.runtimeMetadata.parameterDescriptions = undefined;

    const rendered = renderProviderMetadata(
      { name: "example" },
      new Map([["example.getItem", entry]]),
    );

    expect(rendered).not.toContain('"description"');
    expect(rendered).not.toContain('"parameterDescriptions"');
  });

  it("includes provider auth metadata in package json utdk metadata", () => {
    const rendered = renderProviderPackageJson(
      {
        name: "openai",
        url: "https://example.com/openapi.json",
        options: {
          auth: {
            auth_type: "api_key",
            api_key: "Bearer ${OPENAI_API_KEY}",
            var_name: "Authorization",
            location: "header",
          },
        },
      },
      {
        openapi: "3.0.0",
        info: {
          title: "OpenAI API",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            bearer: {
              type: "http",
              scheme: "bearer",
            },
          },
        },
      } as never,
      undefined,
      new Date("2026-04-07T00:00:00.000Z"),
    );

    expect(rendered).toContain('"provider": "openai"');
    expect(rendered).toContain('"auth": {');
    expect(rendered).toContain('"id": "bearer"');
    expect(rendered).toContain('"scheme": "bearer"');
  });

  it("includes provider OpenAPI icon metadata in package json utdk metadata", () => {
    const rendered = renderProviderPackageJson(
      {
        name: "google/drive",
        url: "https://example.com/google-drive.json",
      },
      {
        openapi: "3.0.0",
        info: {
          title: "Google Drive",
          version: "1.0.0",
          "x-logo": {
            url: "https://example.com/google-drive.png",
          },
        },
      } as never,
      undefined,
      new Date("2026-04-07T00:00:00.000Z"),
    );

    expect(rendered).toContain('"icon": "https://example.com/google-drive.png"');
  });

  it("prefers registry OpenAPI icon metadata over the OpenAPI document", () => {
    const rendered = renderProviderPackageJson(
      {
        name: "google/drive",
        url: "https://example.com/google-drive.json",
        options: {
          openapi: {
            icon: "https://example.com/registry-google-drive.png",
          },
        },
      },
      {
        openapi: "3.0.0",
        info: {
          title: "Google Drive",
          version: "1.0.0",
          "x-logo": {
            url: "https://example.com/google-drive.png",
          },
        },
      } as never,
      undefined,
      new Date("2026-04-07T00:00:00.000Z"),
    );

    expect(rendered).toContain('"icon": "https://example.com/registry-google-drive.png"');
    expect(rendered).not.toContain('"icon": "https://example.com/google-drive.png"');
  });

  it("renders a leaf package json for nested providers", () => {
    const rendered = renderProviderPackageJson(
      {
        name: "google/books",
        url: "https://example.com/google-books.json",
        options: {
          auth: [
            {
              auth_type: "oauth2",
              flow: "authorization_code",
              client_id: "${CLIENT_ID}",
              client_secret: "${CLIENT_SECRET}",
              authorization_url: "https://accounts.google.com/o/oauth2/auth",
              token_url: "https://accounts.google.com/o/oauth2/token",
            },
          ],
        },
      },
      {
        openapi: "3.0.0",
        info: {
          title: "Google Books",
          version: "1.0.0",
        },
      } as never,
      undefined,
      new Date("2026-04-07T00:00:00.000Z"),
      {
        includePackageName: false,
      },
    );

    expect(rendered).toContain('"private": true');
    expect(rendered).not.toContain('"name": "@utdk/google/books"');
    expect(rendered).toContain('"provider": "google/books"');
    expect(rendered).toContain('"auth": {');
    expect(rendered).toContain('"schemes": []');
  });

  it("renders docs metadata additively under utdk.docs", () => {
    const rendered = renderProviderPackageJson(
      {
        name: "openai",
        url: "https://example.com/openapi.json",
      },
      {
        openapi: "3.0.0",
        info: {
          title: "OpenAI API",
          version: "1.0.0",
        },
      } as never,
      undefined,
      new Date("2026-04-07T00:00:00.000Z"),
      {
        docsMetadata: {
          manifestPath: ".registry/openai/manifest.json",
          indexPath: ".registry/openai/index.md",
          docsPath: "packages/utdk/openai/docs",
          generatedAt: "2026-04-07T00:00:00.000Z",
          sourceCount: 3,
          openApiHash: "abc",
          promptHash: "def",
        },
      },
    );

    expect(rendered).toContain('"docs": {');
    expect(rendered).toContain('"manifestPath": ".registry/openai/manifest.json"');
    expect(rendered).toContain('"sourceCount": 3');
  });

  it("uses generated readme content when provided", () => {
    const rendered = renderProviderReadme(
      {
        name: "openai",
        url: "https://example.com/openapi.json",
      } as RegistryProvider,
      {
        generatedReadme: "# OpenAI\n\nGenerated docs.\n",
      },
    );

    expect(rendered).toBe("# OpenAI\n\nGenerated docs.\n");
  });

  it("generates enriched readme from OpenAPI document when no generatedReadme is provided", () => {
    const rendered = renderProviderReadme(
      {
        name: "openai",
        url: "https://example.com/openapi.json",
        options: {
          auth: {
            auth_type: "api_key",
            api_key: "Bearer ${OPENAI_API_KEY}",
            var_name: "Authorization",
            location: "header",
          },
        },
      } as RegistryProvider,
      {
        openApiDocument: {
          openapi: "3.0.0",
          info: {
            title: "OpenAI API",
            version: "1.0.0",
            description: "The OpenAI REST API.",
          },
          components: {
            securitySchemes: {
              bearer: { type: "http", scheme: "bearer" },
            },
          },
          paths: {
            "/responses": {
              post: {
                operationId: "responses.create",
                summary: "Create response",
                tags: ["Responses"],
                responses: { "200": { description: "ok" } },
              },
            },
            "/models": {
              get: {
                operationId: "models.list",
                summary: "List models",
                tags: ["Models"],
                responses: { "200": { description: "ok" } },
              },
            },
          },
        } as never,
      },
    );

    expect(rendered).toContain("# OpenAI API");
    expect(rendered).toContain("The OpenAI REST API.");
    expect(rendered).toContain("**Operations**: 2");
    expect(rendered).toContain("**Authentication**: http:bearer");
    expect(rendered).toContain("**Top capabilities**: Models, Responses");
    expect(rendered).toContain("@utdk/openai");
    expect(rendered).toContain("## Quick start");
  });

  it("falls back to basic one-liner when no OpenAPI document or generatedReadme is provided", () => {
    const rendered = renderProviderReadme(
      {
        name: "openai",
        url: "https://example.com/openapi.json",
      } as RegistryProvider,
    );

    expect(rendered).toContain("# openai");
    expect(rendered).toContain("Generated UTDK provider types");
    expect(rendered).not.toContain("## Quick start");
    expect(rendered).not.toContain("## Documentation");
  });
});

describe("named schema types", () => {
  const document = {
    openapi: "3.0.0",
    info: { title: "Example", version: "1.0.0" },
    paths: {},
    components: {
      schemas: {
        "simple-user": {
          type: "object",
          description: "A GitHub user.",
          properties: {
            login: { type: "string", description: "The user's login handle." },
            plan: { $ref: "#/components/schemas/plan" },
          },
          required: ["login"],
        },
        plan: {
          type: "object",
          properties: { name: { type: "string" } },
        },
      },
    },
  } as never;

  it("creates PascalCase names for component schemas", () => {
    const schemaTypes = createProviderSchemaTypes(document);

    expect(schemaTypes).not.toBeNull();
    expect(schemaTypes!.refToName.get("#/components/schemas/simple-user")).toBe("SimpleUser");
    expect(schemaTypes!.refToName.get("#/components/schemas/plan")).toBe("Plan");
  });

  it("renders schemas.ts with exported named types referencing each other", () => {
    const schemaTypes = createProviderSchemaTypes(document)!;
    const rendered = renderProviderSchemas(schemaTypes);

    expect(rendered).toContain("/** A GitHub user. */");
    expect(rendered).toContain("export type SimpleUser = {");
    expect(rendered).toContain("plan?: Plan;");
    expect(rendered).toContain("export type Plan = {");
  });

  it("references named types in group signatures and imports them from schemas.ts", () => {
    const schemaTypes = createProviderSchemaTypes(document)!;
    const groups = renderProviderGroupTypes(
      { name: "github" },
      [createTool("github.users/get")],
      new Map([
        [
          "github.users/get",
          {
            inputType: "{}",
            outputType: "{ [key: string]: unknown }",
            rawResponseSchema: { $ref: "#/components/schemas/simple-user" },
            docsUrl: "https://docs.github.com/rest/users",
          },
        ],
      ]),
      new Map([["github.users/get", createClientToolDefinition(["users", "get"])]]),
      schemaTypes,
    );

    const usersFile = groups.get("users.ts")!;
    expect(usersFile).toContain('import type { SimpleUser } from "./schemas.js";');
    expect(usersFile).toContain("Promise<SimpleUser>");
    expect(usersFile).toContain("@see https://docs.github.com/rest/users");
    expect(usersFile).not.toContain("Access as:");
    expect(groups.get("schemas.ts")).toContain("export type SimpleUser = {");
  });

  it("returns null when the document declares no component schemas", () => {
    expect(
      createProviderSchemaTypes({ openapi: "3.0.0", info: {}, paths: {} } as never),
    ).toBeNull();
  });
});
