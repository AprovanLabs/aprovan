import type { DeleteOperations } from "./delete.js";
import type { GetOperations } from "./get.js";
import type { PatchOperations } from "./patch.js";
import type { PostOperations } from "./post.js";

export type HubspotClient = {
  delete: DeleteOperations;
  get: GetOperations;
  patch: PatchOperations;
  post: PostOperations;
};

export * from "./delete.js";
export * from "./get.js";
export * from "./patch.js";
export * from "./post.js";
export * from "./schemas.js";
