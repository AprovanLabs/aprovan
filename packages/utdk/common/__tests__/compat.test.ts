import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it, expect, afterEach } from "vitest";
import { parseCompatDocument, loadCompatDocuments } from "../compat.js";
import type { CompatDocument } from "../compat.js";

const validDocument = {
  schemaVersion: 1,
  interface: {
    id: "vcs",
    label: "Git hosting",
    description: "Git hosting for code review.",
    timeoutMs: 60_000,
    defaultsFor: [],
  },
  compat: [
    { provider: "github", label: "GitHub", module: "github/vcs" },
    {
      provider: "bitbucket",
      label: "Bitbucket",
      module: "bitbucket/vcs",
      unavailable: "The Bitbucket adapter module is not built yet.",
    },
  ],
};

describe("parseCompatDocument", () => {
  it("round-trips a valid document", () => {
    const parsed = parseCompatDocument(validDocument, "vcs/compat.json");
    expect(parsed).toEqual(validDocument as CompatDocument);
  });

  it("preserves entry options: moduleSpecifier, baseUrl, defaults, credentialless, capabilities", () => {
    const document = {
      schemaVersion: 1,
      interface: {
        id: "sandbox",
        label: "Sandbox",
        description: "Execution environments.",
        timeoutMs: 300_000,
        defaultsFor: ["create"],
      },
      compat: [
        {
          provider: "bashkit",
          label: "Bashkit (WASM)",
          module: "bashkit",
          moduleSpecifier: "@aprovan/sandbox-bashkit",
          baseUrl: "https://example.test",
          defaults: { image: "node" },
          credentialless: true,
          capabilities: ["exec", "files"],
        },
      ],
    };
    expect(parseCompatDocument(document, "sandbox/compat.json")).toEqual(document);
  });

  it("accepts a compatSource indirection instead of inline entries", () => {
    const document = {
      schemaVersion: 1,
      interface: {
        id: "llm",
        label: "LLM",
        description: "OpenAI-compatible chat completions.",
        timeoutMs: 120_000,
        defaultsFor: ["createChatCompletion"],
      },
      compatSource: "chat-provider-registry",
    };
    const parsed = parseCompatDocument(document, "llm/compat.json");
    expect(parsed.compatSource).toBe("chat-provider-registry");
    expect(parsed.compat).toBeUndefined();
  });

  it("accepts an empty compat array (new contract, no commitments)", () => {
    const document = {
      schemaVersion: 1,
      interface: {
        id: "vfs",
        label: "Files",
        description: "Minimal file contract.",
        timeoutMs: 60_000,
        defaultsFor: [],
      },
      compat: [],
    };
    expect(parseCompatDocument(document, "vfs/compat.json").compat).toEqual([]);
  });

  const rejects = (mutate: (doc: Record<string, unknown>) => void, field: string) => {
    const document = JSON.parse(JSON.stringify(validDocument)) as Record<string, unknown>;
    mutate(document);
    expect(() => parseCompatDocument(document, "vcs/compat.json")).toThrow(
      new RegExp(`vcs/compat\\.json.*${field.replace(/[.[\]]/gu, "\\$&")}`, "u"),
    );
  };

  it("rejects a non-object document naming the path", () => {
    expect(() => parseCompatDocument("nope", "vcs/compat.json")).toThrow(/vcs\/compat\.json.*document/u);
  });

  it("rejects a wrong schemaVersion", () => {
    rejects((doc) => (doc.schemaVersion = 2), "schemaVersion");
  });

  it("rejects a missing interface block", () => {
    rejects((doc) => delete doc.interface, "interface");
  });

  it("rejects a missing interface.id", () => {
    rejects((doc) => delete (doc.interface as Record<string, unknown>).id, "interface.id");
  });

  it("rejects a missing interface.label", () => {
    rejects((doc) => delete (doc.interface as Record<string, unknown>).label, "interface.label");
  });

  it("rejects a non-numeric interface.timeoutMs", () => {
    rejects((doc) => ((doc.interface as Record<string, unknown>).timeoutMs = "60s"), "interface.timeoutMs");
  });

  it("rejects a non-array interface.defaultsFor", () => {
    rejects((doc) => ((doc.interface as Record<string, unknown>).defaultsFor = "query"), "interface.defaultsFor");
  });

  it("rejects an entry without provider", () => {
    rejects((doc) => delete (doc.compat as Array<Record<string, unknown>>)[0]!.provider, "compat[0].provider");
  });

  it("rejects an entry without label", () => {
    rejects((doc) => delete (doc.compat as Array<Record<string, unknown>>)[0]!.label, "compat[0].label");
  });

  it("rejects an entry without module", () => {
    rejects((doc) => delete (doc.compat as Array<Record<string, unknown>>)[1]!.module, "compat[1].module");
  });

  it("rejects a non-boolean credentialless", () => {
    rejects(
      (doc) => (((doc.compat as Array<Record<string, unknown>>)[0]!).credentialless = "yes"),
      "compat[0].credentialless",
    );
  });

  it("rejects a non-object defaults", () => {
    rejects((doc) => (((doc.compat as Array<Record<string, unknown>>)[0]!).defaults = ["model"]), "compat[0].defaults");
  });

  it("rejects an unrecognized entry field (typo protection)", () => {
    rejects((doc) => (((doc.compat as Array<Record<string, unknown>>)[0]!).moduel = "oops"), "compat[0].moduel");
  });

  it("rejects declaring both compat and compatSource", () => {
    rejects((doc) => (doc.compatSource = "chat-provider-registry"), "compatSource");
  });

  it("rejects a document with neither compat nor compatSource", () => {
    rejects((doc) => delete doc.compat, "compat");
  });
});

describe("loadCompatDocuments", () => {
  const cleanups: string[] = [];
  afterEach(() => {
    for (const dir of cleanups.splice(0)) rmSync(dir, { recursive: true, force: true });
  });

  const scaffold = (): string => {
    const root = mkdtempSync(path.join(tmpdir(), "utdk-compat-"));
    cleanups.push(root);
    return root;
  };

  const writePackage = (
    root: string,
    name: string,
    manifest: Record<string, unknown>,
    compat?: unknown,
  ): void => {
    const dir = path.join(root, name);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "package.json"), JSON.stringify(manifest));
    if (compat !== undefined) {
      writeFileSync(path.join(dir, "compat.json"), JSON.stringify(compat));
    }
  };

  it("enumerates by the utdk.contract marker and skips packages without compat.json", () => {
    const root = scaffold();
    writePackage(root, "vcs", { name: "@utdk/vcs", utdk: { contract: "vcs" } }, validDocument);
    writePackage(root, "vfs", { name: "@utdk/vfs", utdk: { contract: "vfs" } });
    writePackage(root, "helper", { name: "@utdk/helper" }, validDocument);

    const documents = loadCompatDocuments(root);
    expect([...documents.keys()]).toEqual(["vcs"]);
    expect(documents.get("vcs")?.compat).toHaveLength(2);
  });

  it("throws when the contracts directory is missing", () => {
    expect(() => loadCompatDocuments("/nonexistent/packages/contracts")).toThrow(
      /Contracts directory not found: \/nonexistent\/packages\/contracts/u,
    );
  });

  it("throws when interface.id disagrees with the package marker", () => {
    const root = scaffold();
    writePackage(root, "sql", { name: "@utdk/sql", utdk: { contract: "sql" } }, validDocument);
    expect(() => loadCompatDocuments(root)).toThrow(/interface\.id "vcs".*marker "sql"/u);
  });

  it("propagates validation errors naming the file", () => {
    const root = scaffold();
    writePackage(
      root,
      "vcs",
      { name: "@utdk/vcs", utdk: { contract: "vcs" } },
      { ...validDocument, schemaVersion: 9 },
    );
    expect(() => loadCompatDocuments(root)).toThrow(/compat\.json.*schemaVersion/u);
  });
});
