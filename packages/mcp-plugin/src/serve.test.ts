import { describe, expect, it } from "vitest";
import { main } from "./serve.js";

describe("aprovan-mcp serve", () => {
  it("prints help without starting a child process", async () => {
    const code = await main(["--help"]);
    expect(code).toBe(0);
  });
});
