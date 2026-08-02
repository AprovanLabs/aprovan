import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hashContent } from "./hash.js";

export type DocsPromptAssets = {
  outputStyle: string;
  indexGuidance: string;
  hash: string;
};

const DEFAULT_PROMPTS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "prompts");

export async function loadDocsPromptAssets(promptsDir = DEFAULT_PROMPTS_DIR): Promise<DocsPromptAssets> {
  const outputStylePath = path.join(promptsDir, "docs-output-style.md");
  const indexGuidancePath = path.join(promptsDir, "docs-index-guidance.md");
  const [outputStyle, indexGuidance] = await Promise.all([
    readFile(outputStylePath, "utf8"),
    readFile(indexGuidancePath, "utf8"),
  ]);
  const hash = hashContent(`${outputStyle}\n---\n${indexGuidance}`);

  return {
    outputStyle,
    indexGuidance,
    hash,
  };
}
