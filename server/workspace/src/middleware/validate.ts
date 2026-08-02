/**
 * Request-body validation.
 *
 * Standard pattern for every route that reads a JSON body: define a Zod schema
 * and pass it to `validateBody(schema)` as middleware. Handlers then read the
 * parsed, typed value via `c.req.valid("json")` — no manual type guards, no
 * `c.req.json()` try/catch.
 *
 * On failure a consistent `{ error }` 400 is returned describing the first
 * offending field.
 */

import { zValidator } from "@hono/zod-validator";
import type { ZodType } from "zod";

export const validateBody = <T extends ZodType>(schema: T) =>
  zValidator("json", schema, (result, c) => {
    if (!result.success) {
      const issue = result.error.issues[0];
      const field = issue?.path.join(".");
      return c.json(
        { error: issue ? `Invalid input: ${field || "body"} — ${issue.message}` : "Invalid input" },
        400,
      );
    }
  });
