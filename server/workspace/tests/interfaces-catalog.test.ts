/**
 * The compat-catalog extraction is a behavior-preserving swap: the
 * `InterfaceDef[]` built from the contract packages' `compat.json` documents
 * (via @utdk/common/compat) must deep-equal the literals that lived in
 * `listInterfaces()` before the extraction, with `llm` still composed live
 * from the chat-provider registry.
 */
import { describe, expect, it } from "vitest";
import { listInterfaces } from "../src/interfaces.js";
import { listLlmProviders } from "../src/llm.js";

/** The pre-extraction `listInterfaces()` literals, verbatim. */
const preExtractionLiterals = () => [
  {
    id: "llm",
    label: "LLM",
    description:
      "OpenAI-compatible chat completions. Bind to any connected LLM provider; scripts call llm.createChatCompletion / llm.listModels.",
    timeoutMs: 120_000,
    defaultsFor: ["createChatCompletion"],
    compat: listLlmProviders().map((provider) => ({
      provider: provider.id,
      label: provider.label,
      module: provider.module,
      baseUrl: provider.baseUrl,
      defaults: { model: provider.defaultModel },
    })),
  },
  {
    id: "sql",
    label: "SQL",
    description:
      "Uniform SQL queries over relational backends; scripts call sql.query({ sql, params }). " +
      "Each backend is a handwritten UTDK provider module built on @utdk/sql. " +
      "Secrets live in the provider credential (Snowflake/Databricks token, Postgres connection string); " +
      "connection config (account, host, warehouse_id, database) rides the binding options.",
    timeoutMs: 60_000,
    defaultsFor: ["query"],
    compat: [
      { provider: "postgres", label: "PostgreSQL", module: "postgres" },
      { provider: "snowflake", label: "Snowflake", module: "snowflake" },
      { provider: "databricks", label: "Databricks", module: "databricks" },
    ],
  },
  {
    id: "sandbox",
    label: "Sandbox",
    description:
      "Execution environments with a filesystem and a shell: create/exec/read/write/list against any connected sandbox host. " +
      "Each backend is a handwritten UTDK provider module built on @utdk/sandbox. " +
      "Secrets live in the provider credential (API token, or a local host's client token); " +
      "the API root, default image and region ride the binding options. " +
      "Workspace-facing mounting, sync and commit live in the `sandboxes` core service — see docs/sandboxes.md.",
    timeoutMs: 300_000,
    defaultsFor: ["create"],
    compat: [
      {
        provider: "bashkit",
        label: "Bashkit (WASM)",
        module: "bashkit",
        moduleSpecifier: "@aprovan/sandbox-bashkit",
        credentialless: true,
      },
      {
        provider: "machine",
        label: "Registered machine",
        module: "machine",
        moduleSpecifier: "@aprovan/sandbox-host",
      },
      { provider: "fly/sprites", label: "fly.io Sprites", module: "fly/sprites" },
      {
        provider: "cloudflare/sandbox",
        label: "Cloudflare Sandbox",
        module: "cloudflare/sandbox",
      },
    ],
  },
  {
    id: "vcs",
    label: "Git hosting",
    description:
      "Git hosting for code review: repos.get, pullRequests.get/list/diff/comment/review, branches.get, files.get " +
      "against whichever host a workspace's code lives on. " +
      "Each backend is a handwritten UTDK provider module built on @utdk/vcs. " +
      "Credentials stay keyed by the concrete provider (github), so a connected GitHub account just works.",
    timeoutMs: 60_000,
    defaultsFor: [],
    compat: [
      {
        provider: "github",
        label: "GitHub",
        module: "github/vcs",
      },
      {
        provider: "bitbucket",
        label: "Bitbucket",
        module: "bitbucket/vcs",
        unavailable:
          "The Bitbucket adapter module is not built yet. The contract is @utdk/vcs; " +
          "the mapping to Bitbucket's REST API does not exist.",
      },
    ],
  },
  {
    id: "agent",
    label: "Agent runtime",
    description:
      "The agent loop itself: run/get/cancel against whichever runtime executes an agent's turns. " +
      "Each backend is a handwritten UTDK provider module built on @utdk/agent. " +
      "The default is the gateway's own in-process runner, which needs no credential; vendor runtimes " +
      "(OpenAI Assistants, a relayed harness) are bound like any other implementation. " +
      "Profiles, instruction layers, grants, mounts and entrypoints live in the `agents` core service " +
      "— see docs/agent-interface.md.",
    timeoutMs: 900_000,
    defaultsFor: ["run"],
    compat: [
      {
        provider: "native",
        label: "Aprovan runner (in-process)",
        module: "native",
        credentialless: true,
      },
      {
        provider: "openai",
        label: "OpenAI Assistants",
        module: "openai/assistants",
        unavailable:
          "The OpenAI Assistants adapter module is not built yet. The vendor surface exists " +
          "(utdk/openai generates createThreadAndRun/getRun/cancelRun); the run/get/cancel mapping does not.",
      },
      {
        provider: "harness",
        label: "Relayed harness",
        module: "harness",
        moduleSpecifier: "@aprovan/agent-host",
        unavailable: "@aprovan/agent-host is not built yet.",
      },
    ],
  },
];

describe("compat catalog extraction (behavior-preserving swap)", () => {
  it("produces InterfaceDef[] deep-equal to the pre-extraction literals", () => {
    expect(listInterfaces()).toEqual(preExtractionLiterals());
  });

  it("keeps llm composed live from the chat-provider registry", () => {
    const llm = listInterfaces().find((def) => def.id === "llm");
    expect(llm?.compat.map((entry) => entry.provider)).toEqual(
      listLlmProviders().map((provider) => provider.id),
    );
  });

  it("declares no webhooks interface anywhere (spec: webhooks never an interface)", () => {
    expect(listInterfaces().some((def) => def.id === "webhooks")).toBe(false);
  });
});
