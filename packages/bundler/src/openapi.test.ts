import { afterEach, describe, expect, it, vi } from "vitest";
import { applyProviderOpenApiOptions, buildPublicTypeMap, loadOpenApiDocument } from "./openapi.js";
import type { RegistryProvider } from "./provider.js";
import type { Tool } from "@utcp/sdk";
import type { OpenAPIV3 } from "openapi-types";

function createTool(name: string, httpMethod: string, url: string): Tool {
  return {
    name,
    description: name,
    tags: [],
    tool_call_template: {
      call_template_type: "http",
      http_method: httpMethod,
      url,
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

describe("loadOpenApiDocument", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("parses JSON OpenAPI documents", async () => {
    const provider: RegistryProvider = {
      name: "example-json",
      url: "https://example.com/openapi.json",
      content_type: "application/json",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ openapi: "3.0.0", info: { title: "JSON API", version: "1.0.0" }, paths: {} }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    const document = await loadOpenApiDocument(provider);

    expect(document.info?.title).toBe("JSON API");
  });

  it("parses YAML OpenAPI documents", async () => {
    const provider: RegistryProvider = {
      name: "datadog",
      url: "https://example.com/openapi.yaml",
      content_type: "application/x-yaml",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          ["openapi: 3.0.0", "info:", "  title: Datadog API", "  version: 1.0.0", "paths: {}"].join("\n"),
          {
            status: 200,
            headers: { "Content-Type": "application/x-yaml" },
          },
        ),
      ),
    );

    const document = await loadOpenApiDocument(provider);

    expect(document.info?.title).toBe("Datadog API");
  });
});

describe("buildPublicTypeMap", () => {
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
    } as const;

    const typeMap = buildPublicTypeMap(openApiDocument as never, [tool]);

    expect(typeMap.get(tool.name)?.outputType).toBe("{ id: string }");
  });

  describe("with a schema render context", () => {
    // Two components that reference each other, reachable from the response
    // through several paths. Without the named-ref short-circuit each path
    // re-expands the whole cycle, which is what makes real cross-referential
    // specs (stripe) exhaust the heap.
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Cyclic", version: "1.0.0" },
      paths: {
        "/customers/{id}": {
          get: {
            responses: {
              "200": {
                description: "ok",
                content: { "application/json": { schema: { $ref: "#/components/schemas/customer" } } },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          customer: {
            type: "object",
            properties: {
              id: { type: "string" },
              invoice: { $ref: "#/components/schemas/invoice" },
              invoices: { type: "array", items: { $ref: "#/components/schemas/invoice" } },
            },
            required: ["id"],
          },
          invoice: {
            type: "object",
            properties: {
              customer: { $ref: "#/components/schemas/customer" },
              latest: { $ref: "#/components/schemas/invoice" },
            },
          },
        },
      },
    } as const;

    const tool = createTool("acme.getCustomer", "GET", "https://api.acme.com/customers/{id}");

    it("renders response refs as named types instead of expanding them", () => {
      const typeMap = buildPublicTypeMap(openApiDocument as never, [tool], {
        refTypeName: (ref) => (ref === "#/components/schemas/customer" ? "Customer" : "Invoice"),
      });

      expect(typeMap.get(tool.name)?.outputType).toBe("Customer");
    });

    it("still inlines refs that have no generated name", () => {
      const typeMap = buildPublicTypeMap(openApiDocument as never, [tool], {
        refTypeName: () => undefined,
      });

      expect(typeMap.get(tool.name)?.outputType).toContain("id: string");
    });
  });
});

describe("applyProviderOpenApiOptions", () => {
  it("strips configured operation prefixes from generated docs", () => {
    const provider: RegistryProvider = {
      name: "google/books",
      url: "https://example.com/openapi.json",
      options: {
        operations: {
          stripPrefix: "books.",
        },
      },
    };
    const openApiDocument = {
      openapi: "3.0.0",
      info: { title: "Google Books", version: "1.0.0" },
      paths: {
        "/volumes": {
          get: {
            operationId: "books.volumes.list",
            responses: {
              "200": {
                description: "ok",
              },
            },
          },
        },
      },
    } as OpenAPIV3.Document;

    const normalizedDocument = applyProviderOpenApiOptions(openApiDocument, provider);

    expect(normalizedDocument.paths?.["/volumes"]?.get?.operationId).toBe("volumes.list");
    expect(openApiDocument.paths?.["/volumes"]?.get?.operationId).toBe("books.volumes.list");
  });
});
