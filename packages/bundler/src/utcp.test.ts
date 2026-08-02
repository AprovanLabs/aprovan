import { beforeEach, describe, expect, it, vi } from "vitest";
import { addMissingOperationIds, loadProviderTools, sanitizeSchemaTypes } from "./utcp.js";

const { convert, OpenApiConverterClass } = vi.hoisted(() => {
  const convert = vi.fn((): { tools: unknown[] } => ({ tools: [] }));
  const OpenApiConverterClass = vi.fn(() => ({ convert }));
  return { convert, OpenApiConverterClass };
});

const { loadOpenApiDocumentMock } = vi.hoisted(() => ({
  loadOpenApiDocumentMock: vi.fn(async () => ({
    openapi: "3.0.0",
    info: { title: "Test", version: "1.0.0" },
    paths: {},
  })),
}));

vi.mock("@utcp/http", () => ({
  OpenApiConverter: OpenApiConverterClass,
  register: vi.fn(),
}));

vi.mock("./openapi.js", () => ({
  loadOpenApiDocument: loadOpenApiDocumentMock,
}));

describe("sanitizeSchemaTypes", () => {
  it("replaces type: file with type: string", () => {
    const spec = {
      parameters: [{ name: "file", in: "formData", type: "file" }],
    };

    expect(sanitizeSchemaTypes(spec)).toEqual({
      parameters: [{ name: "file", in: "formData", type: "string" }],
    });
  });

  it("replaces file type nested inside schema objects", () => {
    const spec = {
      paths: {
        "/upload": {
          post: {
            parameters: [
              { schema: { type: "file" } },
              { schema: { type: "string" } },
            ],
          },
        },
      },
    };

    const result = sanitizeSchemaTypes(spec) as any;
    expect(result.paths["/upload"].post.parameters[0].schema.type).toBe("string");
    expect(result.paths["/upload"].post.parameters[1].schema.type).toBe("string");
  });

  it("preserves other type values unchanged", () => {
    const spec = { type: "object", properties: { name: { type: "string" } } };
    expect(sanitizeSchemaTypes(spec)).toEqual(spec);
  });

  it("handles arrays recursively", () => {
    const spec = [{ type: "file" }, { type: "string" }];
    expect(sanitizeSchemaTypes(spec)).toEqual([{ type: "string" }, { type: "string" }]);
  });

  it("passes through primitives unchanged", () => {
    expect(sanitizeSchemaTypes("string")).toBe("string");
    expect(sanitizeSchemaTypes(42)).toBe(42);
    expect(sanitizeSchemaTypes(null)).toBe(null);
    expect(sanitizeSchemaTypes(undefined)).toBe(undefined);
  });
});

describe("addMissingOperationIds", () => {
  it("returns the spec unchanged when all operations have operationId", () => {
    const spec = {
      openapi: "3.0.0" as const,
      info: { title: "Test", version: "1.0.0" },
      paths: {
        "/users": {
          get: { operationId: "listUsers", responses: {} },
          post: { operationId: "createUser", responses: {} },
        },
      },
    };

    const result = addMissingOperationIds(spec);
    expect(result.paths?.["/users"]?.get?.operationId).toBe("listUsers");
    expect(result.paths?.["/users"]?.post?.operationId).toBe("createUser");
  });

  it("generates operationIds for operations that lack them", () => {
    const spec = {
      openapi: "3.0.0" as const,
      info: { title: "Test", version: "1.0.0" },
      paths: {
        "/auth/token": {
          post: { responses: {} },
        },
        "/users/{id}": {
          get: { responses: {} },
          delete: { responses: {} },
        },
      },
    };

    const result = addMissingOperationIds(spec);
    expect(result.paths?.["/auth/token"]?.post?.operationId).toBe("post_auth_token");
    expect(result.paths?.["/users/{id}"]?.get?.operationId).toBe("get_users_id");
    expect(result.paths?.["/users/{id}"]?.delete?.operationId).toBe("delete_users_id");
  });

  it("uses numeric suffix to resolve collisions between generated IDs", () => {
    const spec = {
      openapi: "3.0.0" as const,
      info: { title: "Test", version: "1.0.0" },
      paths: {
        "/a": {
          get: { operationId: "get_a", responses: {} },
        },
        "/a/": {
          get: { responses: {} },
        },
      },
    };

    const result = addMissingOperationIds(spec);
    expect(result.paths?.["/a/"]?.get?.operationId).toBe("get_a_2");
  });

  it("returns spec with no new operationIds when all operations already have them", () => {
    const spec = {
      openapi: "3.0.0" as const,
      info: { title: "T", version: "1" },
      paths: {
        "/ping": { get: { operationId: "ping", responses: {} } },
      },
    };

    const result = addMissingOperationIds(spec);
    expect(result.paths?.["/ping"]?.get?.operationId).toBe("ping");
  });
});

describe("loadProviderTools", () => {
  const provider = {
    name: "example",
    url: "https://example.com/openapi.json",
    fetch_method: "GET" as const,
  };

  const fakeDoc = {
    openapi: "3.0.0" as const,
    info: { title: "Example", version: "1.0.0" },
    paths: {
      "/items": { get: { operationId: "listItems", responses: {} } },
    },
  };

  beforeEach(() => {
    convert.mockClear();
    OpenApiConverterClass.mockClear();
    loadOpenApiDocumentMock.mockClear();
    convert.mockReturnValue({ tools: [] });
  });

  it("uses the pre-loaded document when provided, skipping loadOpenApiDocument", async () => {
    await loadProviderTools(provider, fakeDoc as any);

    expect(loadOpenApiDocumentMock).not.toHaveBeenCalled();
    expect(OpenApiConverterClass).toHaveBeenCalledOnce();
  });

  it("calls loadOpenApiDocument when no document is provided", async () => {
    loadOpenApiDocumentMock.mockResolvedValueOnce(fakeDoc as any);
    await loadProviderTools(provider);

    expect(loadOpenApiDocumentMock).toHaveBeenCalledWith(provider);
    expect(OpenApiConverterClass).toHaveBeenCalledOnce();
  });

  it("passes specUrl and callTemplateName to OpenApiConverter", async () => {
    await loadProviderTools(provider, fakeDoc as any);

    expect(OpenApiConverterClass).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        specUrl: "https://example.com/openapi.json",
        callTemplateName: "example",
      }),
    );
  });

  it("passes the primary auth option to OpenApiConverter when configured", async () => {
    const primaryAuth = {
      auth_type: "api_key",
      api_key: "${DD_API_KEY}",
      var_name: "DD-API-KEY",
      location: "header",
    };

    const providerWithAuth = {
      ...provider,
      options: {
        auth: [
          primaryAuth,
          {
            auth_type: "api_key",
            api_key: "${DD_APP_KEY}",
            var_name: "DD-APPLICATION-KEY",
            location: "header",
          },
        ],
      },
    };

    await loadProviderTools(providerWithAuth, fakeDoc as any);

    expect(OpenApiConverterClass).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        authTools: primaryAuth,
      }),
    );
  });

  it("prefixes tool names with the provider name", async () => {
    convert.mockReturnValue({
      tools: [{ name: "listItems", tool_call_template: { url: "https://example.com/items" } }],
    });

    const result = await loadProviderTools(provider, fakeDoc as any);

    expect(result.tools).toHaveLength(1);
    expect(result.tools.at(0)?.name).toBe("example.listItems");
  });

  it("does not double-prefix if the tool name already starts with the provider prefix", async () => {
    convert.mockReturnValue({
      tools: [{ name: "example.listItems", tool_call_template: { url: "https://example.com/items" } }],
    });

    const result = await loadProviderTools(provider, fakeDoc as any);

    expect(result.tools.at(0)?.name).toBe("example.listItems");
  });

  it("sanitizes non-word characters in provider name when prefixing", async () => {
    const dotProvider = { ...provider, name: "my.provider" };
    convert.mockReturnValue({
      tools: [{ name: "doThing", tool_call_template: { url: "https://example.com/" } }],
    });

    const result = await loadProviderTools(dotProvider, fakeDoc as any);

    expect(result.tools.at(0)?.name).toBe("my_provider.doThing");
  });

  it("returns empty tools and writes to stderr when convert() throws", async () => {
    convert.mockImplementation(() => {
      throw new Error("Schema validation failed");
    });

    const stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);

    const result = await loadProviderTools(provider, fakeDoc as any);

    expect(result.tools).toHaveLength(0);
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining("Schema validation failed"));
    stderrSpy.mockRestore();
  });
});
