#!/usr/bin/env node
/**
 * Lightweight manifest validation for the Aprovan MCP plugin (repo root).
 * Confirms JSON parses, required fields exist, and referenced paths resolve.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PRODUCTION_MCP_URL = "https://aprovan.com/api/mcp";
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readJson(relativePath) {
  const absolute = join(repoRoot, relativePath);
  if (!existsSync(absolute)) {
    throw new Error(`Missing file: ${relativePath}`);
  }
  return JSON.parse(readFileSync(absolute, "utf8"));
}

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertRemoteMcpServer(server, label) {
  assert(server, `${label}: aprovan server required`);
  assert(!server.command, `${label}: must not use stdio command transport`);
  assert(!server.args, `${label}: must not use stdio args`);
  assert(server.url === PRODUCTION_MCP_URL, `${label}: url must be ${PRODUCTION_MCP_URL}`);
}

try {
  const portable = readJson("plugin.json");
  assert(portable.name === "aprovan", "plugin.json: name must be aprovan");
  assert(portable.version, "plugin.json: version required");

  const cursor = readJson(".cursor-plugin/plugin.json");
  assert(cursor.name === "aprovan", ".cursor-plugin/plugin.json: name must be aprovan");
  assert(cursor.mcpServers, ".cursor-plugin/plugin.json: mcpServers required");

  const marketplace = readJson(".cursor-plugin/marketplace.json");
  assert(marketplace.name === "aprovan", ".cursor-plugin/marketplace.json: name must be aprovan");
  assert(marketplace.owner?.name, ".cursor-plugin/marketplace.json: owner.name required");
  assert(Array.isArray(marketplace.plugins) && marketplace.plugins.length > 0, ".cursor-plugin/marketplace.json: plugins array required");
  const marketplaceEntry = marketplace.plugins.find((entry) => entry.name === "aprovan");
  assert(marketplaceEntry, ".cursor-plugin/marketplace.json: must list aprovan plugin");
  assert(marketplaceEntry.source === ".", ".cursor-plugin/marketplace.json: aprovan source must be .");
  assert(marketplaceEntry.description, ".cursor-plugin/marketplace.json: aprovan description required");
  assert(
    existsSync(join(repoRoot, ".cursor-plugin", "plugin.json")),
    ".cursor-plugin/marketplace.json: source . must resolve to .cursor-plugin/plugin.json",
  );

  const claude = readJson(".claude-plugin/plugin.json");
  assert(claude.name === "aprovan", ".claude-plugin/plugin.json: name must be aprovan");
  assert(claude.mcpServers, ".claude-plugin/plugin.json: mcpServers required");

  const mcp = readJson("mcp.json");
  assertRemoteMcpServer(mcp.mcpServers?.aprovan, "mcp.json");
  assert(mcp.mcpServers.aprovan.type === "streamable-http", "mcp.json: must use streamable-http");

  const claudeMcp = readJson(".mcp.json");
  assertRemoteMcpServer(claudeMcp.mcpServers?.aprovan, ".mcp.json");

  const mcpServersPath =
    typeof cursor.mcpServers === "string" ? cursor.mcpServers : "./mcp.json";
  const resolvedMcp = mcpServersPath.startsWith("./")
    ? mcpServersPath
    : `./${mcpServersPath}`;
  readJson(resolvedMcp.replace(/^\.\//, ""));
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error));
}

if (errors.length > 0) {
  process.stderr.write("Manifest validation failed:\n");
  for (const message of errors) {
    process.stderr.write(`  - ${message}\n`);
  }
  process.exit(1);
}

process.stdout.write("All plugin manifests valid.\n");
