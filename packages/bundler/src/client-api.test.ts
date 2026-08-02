import { describe, expect, it } from "vitest";
import { buildClientToolMap } from "./client-api.js";
import type { Tool } from "@utcp/sdk";
import type { OpenAPIV3 } from "openapi-types";


function createTool(name: string, httpMethod: string, url: string, contentType = "application/json"): Tool {
  return {
    name,
    description: name,
    tags: [],
    tool_call_template: {
      call_template_type: "http",
      http_method: httpMethod,
      url,
      content_type: contentType,
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

describe("buildClientToolMap", () => {
  it("renames duplicate nested method leaves to call", () => {
    const tool = createTool("example.CreateLogsMetric/CreateLogsMetric", "POST", "https://api.example.com/v1/logs/metrics");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Example", version: "1.0.0" },
      paths: {
        "/v1/logs/metrics": {
          post: {
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        properties: {
                          value: { type: "string" },
                        },
                        required: ["value"],
                      },
                    },
                    required: ["data"],
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "ok",
              },
            },
          },
        },
      },
    } as unknown as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "example" }).get(tool.name);

    expect(metadata?.accessPath).toEqual(["createLogsMetric", "call"]);
  });

  it("keeps body fields in input and moves conflicting transport fields to overrides", () => {
    const tool = createTool("example.fooBar", "POST", "https://api.example.com/v1/{id}/example");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Example", version: "1.0.0" },
      paths: {
        "/v1/{id}/example": {
          post: {
            parameters: [
              { in: "path", name: "id", required: true, schema: { type: "string" } },
              { in: "query", name: "id", schema: { type: "string" } },
              { in: "query", name: "buzz", schema: { type: "string" } },
              { in: "header", name: "x-trace-id", schema: { type: "string" } },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      qux: { type: "string" },
                    },
                    required: ["id", "qux"],
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "ok",
              },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "example" }).get(tool.name);

    expect(metadata?.inputType).toContain("id: string");
    expect(metadata?.inputType).toContain("qux: string");
    expect(metadata?.inputType).not.toContain("body:");
    expect(metadata?.hasOptions).toBe(true);
    expect(metadata?.optionsType).toContain("params: { id: string }");
    expect(metadata?.optionsType).toContain("query?: { id?: string }");
    expect(metadata?.optionsType).not.toContain("buzz");
    expect(metadata?.optionsType).toContain('"x-trace-id"?: string');
  });

  it("matches operations when the server url contributes a base path", () => {
    const tool = createTool("openai.createResponse", "POST", "https://api.openai.com/v1/responses");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "OpenAI", version: "1.0.0" },
      servers: [{ url: "https://api.openai.com/v1" }],
      paths: {
        "/responses": {
          post: {
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      model: { type: "string" },
                    },
                    required: ["model"],
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "ok",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                      },
                      required: ["id"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "openai" }).get(tool.name);

    expect(metadata?.inputType).toContain("model: string");
  });

  it("strips the full provider prefix for dotted provider names", () => {
    const tool = createTool("google.books.volumes/list", "GET", "https://www.googleapis.com/books/v1/volumes");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Google Books", version: "1.0.0" },
      paths: {
        "/books/v1/volumes": {
          get: {
            responses: {
              "200": {
                description: "ok",
              },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], {
      name: "google/books",
      options: {
        operations: {
          stripPrefix: "books.",
        },
      },
    }).get(tool.name);

    expect(metadata?.accessPath).toEqual(["volumes", "list"]);
  });

  it("keeps primitive request bodies as raw body input", () => {
    const tool = createTool("spotify.uploadPlaylistCover", "PUT", "https://api.spotify.com/playlists/{playlist_id}/images", "image/jpeg");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Spotify", version: "1.0.0" },
      paths: {
        "/playlists/{playlist_id}/images": {
          put: {
            parameters: [{ in: "path", name: "playlist_id", required: true, schema: { type: "string" } }],
            requestBody: {
              required: true,
              content: {
                "image/jpeg": {
                  schema: {
                    type: "string",
                    required: true,
                  } as unknown as OpenAPIV3.SchemaObject,
                },
              },
            },
            responses: {
              "200": {
                description: "ok",
              },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "spotify" }).get(tool.name);

    expect(metadata?.inputType).toContain("body: string");
    expect(metadata?.runtimeMetadata.bodyKind).toBe("raw");
  });

  it("promotes object bodies with additionalProperties to top-level input", () => {
    const tool = createTool("spotify.createPlaylist", "POST", "https://api.spotify.com/users/{user_id}/playlists");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Spotify", version: "1.0.0" },
      paths: {
        "/users/{user_id}/playlists": {
          post: {
            parameters: [{ in: "path", name: "user_id", required: true, schema: { type: "string" } }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      public: { type: "boolean" },
                    },
                    required: ["name"],
                    additionalProperties: true,
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "ok",
              },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "spotify" }).get(tool.name);

    expect(metadata?.inputType).toContain("name: string");
    expect(metadata?.inputType).toContain("public?: boolean");
    expect(metadata?.inputType).toContain("[key: string]: unknown");
    expect(metadata?.inputType).not.toContain("body:");
    expect(metadata?.runtimeMetadata.bodyKind).toBe("properties");
    expect(metadata?.runtimeMetadata.bodyAllowsAdditionalProperties).toBe(true);
  });

  it("populates description from operation summary", () => {
    const tool = createTool("example.getFoo", "GET", "https://api.example.com/v1/foo");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Example", version: "1.0.0" },
      paths: {
        "/v1/foo": {
          get: {
            summary: "Retrieve a foo by ID",
            responses: {
              "200": { description: "ok" },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "example" }).get(tool.name);

    expect(metadata?.runtimeMetadata.description).toBe("Retrieve a foo by ID");
  });

  it("falls back to operation description when summary is absent", () => {
    const tool = createTool("example.getFoo", "GET", "https://api.example.com/v1/foo");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Example", version: "1.0.0" },
      paths: {
        "/v1/foo": {
          get: {
            description: "Retrieves a foo from the collection",
            responses: {
              "200": { description: "ok" },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "example" }).get(tool.name);

    expect(metadata?.runtimeMetadata.description).toBe("Retrieves a foo from the collection");
  });

  it("falls back to tool description when operation has neither summary nor description", () => {
    const tool = createTool("example.getFoo", "GET", "https://api.example.com/v1/foo");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Example", version: "1.0.0" },
      paths: {
        "/v1/foo": {
          get: {
            responses: {
              "200": { description: "ok" },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "example" }).get(tool.name);

    expect(metadata?.runtimeMetadata.description).toBe("example.getFoo");
  });

  it("populates parameterDescriptions from operation parameters", () => {
    const tool = createTool("example.getFoo", "GET", "https://api.example.com/v1/foo");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Example", version: "1.0.0" },
      paths: {
        "/v1/foo": {
          get: {
            parameters: [
              {
                in: "query",
                name: "limit",
                description: "Maximum number of items to return",
                schema: { type: "integer" },
              },
              {
                in: "query",
                name: "offset",
                description: "Number of items to skip before starting collection",
                schema: { type: "integer" },
              },
              {
                in: "query",
                name: "filter",
                schema: { type: "string" },
              },
            ],
            responses: {
              "200": { description: "ok" },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "example" }).get(tool.name);

    expect(metadata?.runtimeMetadata.parameterDescriptions).toEqual({
      limit: "Maximum number of items to return",
      offset: "Number of items to skip before starting collection",
    });
  });

  it("leaves description and parameterDescriptions undefined when absent", () => {
    const tool = createTool("example.getBar", "GET", "https://api.example.com/v1/bar");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Example", version: "1.0.0" },
      paths: {
        "/v1/bar": {
          get: {
            responses: {
              "200": { description: "ok" },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "example" }).get(tool.name);

    expect(metadata?.runtimeMetadata.description).toBe("example.getBar");
    expect(metadata?.runtimeMetadata.parameterDescriptions).toBeUndefined();
  });

  it("includes parameter descriptions in inputSchema property schemas", () => {
    const tool = createTool("example.getRepo", "GET", "https://api.example.com/v1/{owner}/{repo}");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Example", version: "1.0.0" },
      paths: {
        "/v1/{owner}/{repo}": {
          get: {
            parameters: [
              {
                in: "path",
                name: "owner",
                required: true,
                description: "The account owner of the repository.",
                schema: { type: "string" },
              },
              {
                in: "path",
                name: "repo",
                required: true,
                description: "The repository name without the .git extension.",
                schema: { type: "string" },
              },
              {
                in: "query",
                name: "per_page",
                description: "The number of results per page.",
                schema: { type: "integer" },
              },
            ],
            responses: {
              "200": { description: "ok" },
            },
          },
        },
      },
    } as unknown as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "example" }).get(tool.name);

    expect(metadata?.inputSchema?.properties?.["owner"]).toMatchObject({
      type: "string",
      description: "The account owner of the repository.",
    });
    expect(metadata?.inputSchema?.properties?.["repo"]).toMatchObject({
      type: "string",
      description: "The repository name without the .git extension.",
    });
    expect(metadata?.inputSchema?.properties?.["per_page"]).toMatchObject({
      type: "integer",
      description: "The number of results per page.",
    });
  });

  it("omits inputSchema when tool has no input properties", () => {
    const tool = createTool("example.ping", "GET", "https://api.example.com/v1/ping");
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Example", version: "1.0.0" },
      paths: {
        "/v1/ping": {
          get: {
            responses: {
              "200": { description: "ok" },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const metadata = buildClientToolMap(openApiDocument, [tool], { name: "example" }).get(tool.name);

    expect(metadata?.hasInput).toBe(false);
    expect(metadata?.inputSchema).toBeUndefined();
  });
});
