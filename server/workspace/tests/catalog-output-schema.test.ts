/**
 * Stream 8.4: catalog-derived tool entries pick the lowest 2xx success schema.
 */

import { describe, expect, it } from "vitest";
import { outputSchemaFromCatalogOp } from "../src/services.js";

describe("outputSchemaFromCatalogOp", () => {
  it("picks the lowest 2xx status schema", () => {
    const schema = outputSchemaFromCatalogOp({
      outputs: {
        "404": { description: "missing", schema: { type: "object", properties: { err: {} } } },
        "201": { description: "created", schema: { type: "object", properties: { id: { type: "string" } } } },
        "200": { description: "ok", schema: { type: "object", properties: { ok: { type: "boolean" } } } },
      },
    });
    expect(schema).toEqual({ type: "object", properties: { ok: { type: "boolean" } } });
  });

  it("omits when responseUnknown", () => {
    expect(
      outputSchemaFromCatalogOp({
        responseUnknown: true,
        outputs: {
          "200": { description: "ok", schema: { type: "string" } },
        },
      }),
    ).toBeUndefined();
  });

  it("omits when no 2xx schema", () => {
    expect(
      outputSchemaFromCatalogOp({
        outputs: {
          "400": { description: "bad", schema: { type: "object" } },
          "204": { description: "empty", schema: null },
        },
      }),
    ).toBeUndefined();
  });
});
