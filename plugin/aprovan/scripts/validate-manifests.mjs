#!/usr/bin/env node
/**
 * Lightweight manifest validation for the Aprovan MCP plugin.
 * Confirms JSON parses, required fields exist, and referenced paths resolve.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readJson(relativePath) {
  const absolute = join(pluginRoot, relativePath);
  if (!existsSync(absolute)) {
    throw new Error(`Missing file: ${relativePath}`);
  }
  return JSON.parse(readFileSync(absolute, "utf8"));
}

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

try {
  const portable = readJson("plugin.json");
  assert(portable.name === "aprovan", "plugin.json: name must be aprovan");
  assert(portable.version, "plugin.json: version required");

  const cursor = readJson(".cursor-plugin/plugin.json");
  assert(cursor.name === "aprovan", ".cursor-plugin/plugin.json: name must be aprovan");
  assert(cursor.mcpServers, ".cursor-plugin/plugin.json: mcpServers required");
  assert(cursor.variables?.properties?.APROVAN_MCP_URL, ".cursor-plugin: APROVAN_MCP_URL variable required");

  const claude = readJson(".claude-plugin/plugin.json");
  assert(claude.name === "aprovan", ".claude-plugin/plugin.json: name must be aprovan");
  assert(claude.mcpServers, ".claude-plugin/plugin.json: mcpServers required");
  assert(claude.userConfig?.APROVAN_MCP_URL, ".claude-plugin: APROVAN_MCP_URL userConfig required");

  const mcp = readJson("mcp.json");
  assert(mcp.mcpServers?.aprovan, "mcp.json: aprovan server required");
  assert(mcp.mcpServers.aprovan.type === "stdio", "mcp.json: aprovan must use stdio transport");
  assert(
    mcp.mcpServers.aprovan.args?.includes("@aprovan/mcp-plugin"),
    "mcp.json: must invoke @aprovan/mcp-plugin",
  );

  const claudeMcp = readJson(".mcp.json");
  assert(claudeMcp.mcpServers?.aprovan, ".mcp.json: aprovan server required");

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
