import { describe, expect, it } from "vitest";
import { groupOpenApiOperations } from "./grouping.js";

describe("groupOpenApiOperations", () => {
  it("groups operations by primary tag with fallback to path segment", () => {
    const groups = groupOpenApiOperations({
      openapi: "3.0.0",
      info: { title: "Example", version: "1.0.0" },
      paths: {
        "/users": {
          get: {
            operationId: "users.list",
            tags: ["Users"],
          },
        },
        "/health/check": {
          get: {
            operationId: "health.check",
          },
        },
      },
    } as never);

    expect(groups.find((group) => group.key === "users")?.operations).toHaveLength(1);
    expect(groups.find((group) => group.key === "health")?.operations).toHaveLength(1);
  });
});
