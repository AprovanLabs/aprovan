/**
 * Library entry point for `@aprovan/workspace`.
 *
 * The package is one thing delivered three ways: `workspace start` on a
 * laptop, `ghcr.io/aprovanlabs/workspace` on ECS, and — via these exports — a
 * server embedded directly in a host process, which is how the desktop app
 * runs the platform without shelling out.
 *
 * To run it as a program, use ./cli.ts.
 */

export { createWorkspaceApp, startWorkspace } from "./server.js";
export type { StartWorkspaceOptions, WorkspaceHandle } from "./server.js";

export { attachRealtime } from "./realtime/socket.js";
export type { AttachRealtimeOptions, RealtimeHandle } from "./realtime/socket.js";

export {
  getWorkspaceConfig,
  loadWorkspaceConfig,
  setWorkspaceConfig,
  resetWorkspaceConfig,
  workspaceDataDir,
  isAwsMode,
} from "./runtime/config.js";
export type {
  WorkspaceConfig,
  WorkspaceMode,
  DataConfig,
  SqliteDataConfig,
  AwsDataConfig,
} from "./runtime/config.js";

export type { GatewayConfig } from "./contract.js";
