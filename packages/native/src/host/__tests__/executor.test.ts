/**
 * The local executor — lifecycle, files, exec, cloneRepo.
 *
 * Path containment cases live in `__tests__/contain.test.ts`.
 */

import { createHash } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LocalExecutor } from "../executor.js";

let root: string;
let outside: string;
let executor: LocalExecutor;

beforeEach(async () => {
  root = mkdtempSync(join(tmpdir(), "aprovan-root-"));
  outside = mkdtempSync(join(tmpdir(), "aprovan-outside-"));
  executor = new LocalExecutor({ root });
  await executor.init();
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
  rmSync(outside, { recursive: true, force: true });
});

async function newSandbox(): Promise<string> {
  const instance = (await executor.run("create", {})) as { id: string };
  return instance.id;
}

describe("files", () => {
  it("hashes with the same identity the workspace FS store uses", async () => {
    const id = await newSandbox();
    const content = "export const a = 1;\n";
    const written = (await executor.run("writeFile", { id, path: "src/a.ts", content })) as {
      hash: string;
    };
    expect(written.hash).toBe(createHash("sha256").update(content).digest("hex"));

    const listed = (await executor.run("listFiles", { id })) as Array<{
      path: string;
      hash: string;
    }>;
    expect(listed).toEqual([{ ...listed[0], path: "src/a.ts", hash: written.hash }]);
  });

  it("creates parent directories on write and round-trips content", async () => {
    const id = await newSandbox();
    await executor.run("writeFile", { id, path: "deep/nested/file.txt", content: "hi" });
    const read = (await executor.run("readFile", { id, path: "deep/nested/file.txt" })) as {
      content: string;
      encoding: string;
    };
    expect(read).toMatchObject({ content: "hi", encoding: "utf8" });
  });

  it("reports binary bodies as base64 rather than mangling them as text", async () => {
    const id = await newSandbox();
    writeFileSync(join(root, id, "blob.bin"), Buffer.from([0xff, 0xfe, 0x00, 0x01]));
    const read = (await executor.run("readFile", { id, path: "blob.bin" })) as {
      encoding: string;
    };
    expect(read.encoding).toBe("base64");
  });

  it("keeps dependency and VCS directories out of listings", async () => {
    const id = await newSandbox();
    mkdirSync(join(root, id, "node_modules", "pkg"), { recursive: true });
    writeFileSync(join(root, id, "node_modules", "pkg", "index.js"), "noise");
    writeFileSync(join(root, id, "index.js"), "mine");

    const entries = (await executor.run("listFiles", { id })) as Array<{ path: string }>;
    expect(entries.map((entry) => entry.path)).toEqual(["index.js"]);
  });
});

describe("exec", () => {
  it("runs in the sandbox and captures output", async () => {
    const id = await newSandbox();
    const result = (await executor.run("exec", { id, command: "echo hello" })) as {
      exitCode: number;
      stdout: string;
    };
    expect(result.exitCode).toBe(0);
    expect(result.stdout.trim()).toBe("hello");
  });

  it("reports a non-zero exit rather than throwing", async () => {
    const id = await newSandbox();
    const result = (await executor.run("exec", { id, command: "exit 3" })) as {
      exitCode: number;
    };
    expect(result.exitCode).toBe(3);
  });

  it("kills a command that outlives its deadline", async () => {
    const id = await newSandbox();
    const result = (await executor.run("exec", {
      id,
      command: "sleep 5",
      timeoutMs: 200,
    })) as { stderr: string };
    expect(result.stderr).toMatch(/killed after 200ms/u);
  });

  it("refuses a cwd outside the sandbox", async () => {
    const id = await newSandbox();
    await expect(
      executor.run("exec", { id, command: "ls", cwd: "../.." }),
    ).rejects.toThrow(/escapes the sandbox/u);
  });
});

describe("cloneRepo", () => {
  /** A local fixture repository: one commit on the default branch. */
  async function fixtureRepo(): Promise<string> {
    const repo = join(outside, "fixture-repo");
    mkdirSync(repo, { recursive: true });
    writeFileSync(join(repo, "SKILL.md"), "Always be kind.\n");
    mkdirSync(join(repo, "review"));
    writeFileSync(join(repo, "review", "SKILL.md"), "Ask for tests.\n");
    // Drive git through a scratch sandbox's exec so the test shares the
    // executor's own spawn plumbing (and its PATH).
    const gitBox = ((await executor.run("create", {})) as { id: string }).id;
    const run = async (command: string) => {
      const result = (await executor.run("exec", {
        id: gitBox,
        // Neutralize host-level signing config — a signed tag wants an editor.
        command: `git -c commit.gpgsign=false -c tag.gpgsign=false -C '${repo}' ${command}`,
      })) as { exitCode: number; stderr: string };
      if (result.exitCode !== 0) throw new Error(`git ${command}: ${result.stderr}`);
    };
    await run("init -q");
    await run("config user.email test@example.com");
    await run("config user.name Test");
    await run("add -A");
    await run("commit -q -m fixture");
    return repo;
  }

  it("clones into the mount and answers with a sha256 manifest", async () => {
    const repo = await fixtureRepo();
    const id = await newSandbox();
    const result = (await executor.run("cloneRepo", {
      id,
      path: "skills",
      repo: "acme/skills",
      remote: repo,
    })) as { path: string; files: Array<{ path: string; hash: string }> };

    expect(result.path).toBe("skills");
    expect(result.files.map((file) => file.path).sort()).toEqual([
      "SKILL.md",
      "review/SKILL.md",
    ]);
    expect(result.files.find((file) => file.path === "SKILL.md")?.hash).toBe(
      createHash("sha256").update("Always be kind.\n").digest("hex"),
    );

    // A real checkout, not a snapshot: git works inside it.
    const status = (await executor.run("exec", {
      id,
      command: "git status --porcelain && git rev-parse --abbrev-ref HEAD",
      cwd: "skills",
    })) as { exitCode: number; stdout: string };
    expect(status.exitCode).toBe(0);

    // And the agent can branch and commit — the PR flow's local half.
    const branch = (await executor.run("exec", {
      id,
      command:
        "git checkout -q -b agent/change && echo more >> SKILL.md" +
        " && git -c user.email=a@b -c user.name=Agent -c commit.gpgsign=false commit -qam change" +
        " && git log --oneline | wc -l",
      cwd: "skills",
    })) as { exitCode: number; stdout: string };
    expect(branch.exitCode).toBe(0);
    expect(Number(branch.stdout.trim())).toBe(2);
  });

  it("checks out the requested ref", async () => {
    const repo = await fixtureRepo();
    // Tag the current commit, then move the branch forward.
    const gitBox = ((await executor.run("create", {})) as { id: string }).id;
    await executor.run("exec", {
      id: gitBox,
      command: `git -c tag.gpgsign=false -C '${repo}' tag v1`,
    });
    await executor.run("exec", {
      id: gitBox,
      command: `cd '${repo}' && echo later > NEW.md && git add -A && git -c user.email=a@b -c user.name=T -c commit.gpgsign=false commit -qm later`,
    });

    const id = await newSandbox();
    const result = (await executor.run("cloneRepo", {
      id,
      path: "pinned",
      repo: "acme/skills",
      ref: "v1",
      remote: repo,
    })) as { files: Array<{ path: string }> };
    expect(result.files.map((file) => file.path)).not.toContain("NEW.md");
  });

  it("refuses a malformed repo spec and an escaping subPath", async () => {
    const id = await newSandbox();
    await expect(
      executor.run("cloneRepo", { id, path: "x", repo: "not a repo" }),
    ).rejects.toThrow(/owner\/name/u);
    await expect(
      executor.run("cloneRepo", { id, path: "x", repo: "a/b", subPath: "../up" }),
    ).rejects.toThrow(/repo-relative/u);
  });

  it("keeps the mount inside the sandbox", async () => {
    const id = await newSandbox();
    await expect(
      executor.run("cloneRepo", { id, path: "../outside", repo: "a/b" }),
    ).rejects.toThrow(/escapes the sandbox/u);
  });
});

describe("lifecycle", () => {
  it("creates, lists and destroys sandboxes under the root", async () => {
    const id = await newSandbox();
    const listed = (await executor.run("list", {})) as Array<{ id: string }>;
    expect(listed.map((entry) => entry.id)).toContain(id);

    expect(await executor.run("destroy", { id })).toEqual({ destroyed: true });
    expect(await executor.run("get", { id })).toBeUndefined();
    expect(await executor.run("destroy", { id })).toEqual({ destroyed: false });
  });

  it("fails create when the image requires a binary this machine lacks", async () => {
    await expect(
      executor.run("create", { base: { require: ["definitely-not-installed-xyz"] } }),
    ).rejects.toThrow(/does not have "definitely-not-installed-xyz" on PATH/u);
  });

  it("rejects an operation the local host does not implement", async () => {
    await expect(executor.run("exposePort", { id: "x", port: 3000 })).rejects.toThrow(
      /Unsupported operation: exposePort/u,
    );
  });
});
