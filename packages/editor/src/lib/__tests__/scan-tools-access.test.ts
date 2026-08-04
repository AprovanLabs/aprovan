import { describe, expect, it } from "vitest";
import { scanToolsAccess } from "../scan-tools-access.js";

describe("scanToolsAccess", () => {
  it("collects namespaces from property access", () => {
    const result = scanToolsAccess(`
      await tools.vfs.read({ path: "/x" });
      await tools.github.repos.get({ owner: "a", repo: "b" });
    `);
    expect(result.namespaces).toEqual(["github", "vfs"]);
    expect(result.unresolved).toBe(false);
  });

  it("counts configured access once", () => {
    const result = scanToolsAccess(
      `await tools.github({ name: "work" }).repos.get({ owner: "a", repo: "b" });`,
    );
    expect(result.namespaces).toEqual(["github"]);
  });

  it("ignores shadowed local tools bindings", () => {
    const result = scanToolsAccess(`
      function inner() {
        const tools = { local: true };
        return tools.local;
      }
      await tools.vfs.read({ path: "/x" });
    `);
    expect(result.namespaces).toEqual(["vfs"]);
  });

  it("flags dynamic access as unresolved", () => {
    const result = scanToolsAccess(`await tools[someVariable].call();`);
    expect(result.unresolved).toBe(true);
  });

  it("ignores uses attribute semantics — only source matters", () => {
    const result = scanToolsAccess(`// uses="keyvalue events"\nawait tools.llm.createChatCompletion({ messages: [] });`);
    expect(result.namespaces).toEqual(["llm"]);
  });
});
