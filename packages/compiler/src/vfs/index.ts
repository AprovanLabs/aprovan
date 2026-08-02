// Core types and utilities
export type {
  ChangeRecord,
  ConflictRecord,
  ConflictStrategy,
  DirEntry,
  FileStats,
  FSProvider,
  SyncEngine,
  SyncEventCallback,
  SyncEventType,
  SyncResult,
  SyncStatus,
  WatchCallback,
  WatchEventType,
} from "./core/types.js";

export {
  basename,
  createDirEntry,
  createFileStats,
  dirname,
  join,
  normalizePath,
} from "./core/utils.js";

export { VirtualFS } from "./core/virtual-fs.js";

// Backends
export { MemoryBackend } from "./backends/memory.js";

export type { VirtualFile, VirtualProject } from "./types.js";
export {
  createProjectFromFiles,
  createSingleFileProject,
  resolveEntry,
  detectMainFile,
} from "./project.js";
