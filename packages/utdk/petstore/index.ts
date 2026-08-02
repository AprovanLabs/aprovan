import { readFile } from "node:fs/promises";
import type { CreateClientOptions } from "../client.js";
import { createClient, createLazyClient } from "../client.js";
import type { PetstoreClient } from "./types/index.js";
import { toolMetadata } from "./metadata.js";

export * from "./types/index.js";

export function createPetstoreClient(
  options: Omit<CreateClientOptions, "name" | "openApiDocument" | "toolMetadata"> = {},
): Promise<PetstoreClient> {
  return createClient<PetstoreClient>({
    ...options,
    name: "petstore",
    // Read + parsed on demand, and deliberately NOT via `import()`: either
    // form of import registers the document in Node's ESM registry, which
    // pins it for the lifetime of the process. Read from disk, the document
    // is owned by the client alone, so evicting a cached client actually
    // returns the memory (12MB for github). `openapi.json` ships beside this
    // module in dist — see copy-assets.mjs — so the module-relative URL holds
    // wherever the package is staged.
    openApiDocument: async () => JSON.parse(await readFile(new URL("./openapi.json", import.meta.url), "utf8")),
    toolMetadata,
  });
}

const defaultClient = createLazyClient(() => createPetstoreClient());

export default defaultClient;
