/**
 * The image's component inventory, and what having one buys.
 *
 * An image aliases a whole namespace of import paths (`@/components/ui/*`) onto
 * a single package, so that package's export list *is* the vocabulary a widget
 * may use. Without the list the alias resolves to an external CDN URL, esbuild
 * has nothing to check the imported names against, and a component that does
 * not exist compiles cleanly and dies in the browser — `The requested module
 * '.../@packagedcn/react' does not provide an export named 'Spinner'`, with no
 * file and no line, after the widget has already shipped.
 *
 * The builds here use the real esbuild-wasm and the real plugin, so what is
 * asserted is the actual compile behaviour rather than a description of it.
 */

import * as esbuild from "esbuild-wasm";
import { describe, it, expect } from "vitest";
import { cdnTransformPlugin, generateAliasModule } from "../transforms/cdn.js";

const TARGET = "@packagedcn/react";
const ALIASES = {
  "@/components/ui/*": TARGET,
  "@/components/*": TARGET,
  "@/lib/utils": TARGET,
};
const INVENTORY = ["Button", "Card", "CardHeader", "Skeleton", "Table", "TableHead", "cn"];

async function build(
  source: string,
  aliasExports?: Record<string, string[]>,
): Promise<string> {
  const result = await esbuild.build({
    stdin: { contents: source, loader: "tsx", sourcefile: "main.tsx" },
    bundle: true,
    write: false,
    format: "esm",
    target: "es2022",
    platform: "browser",
    logLevel: "silent",
    plugins: [
      cdnTransformPlugin({
        aliases: ALIASES,
        packages: { [TARGET]: "0.1.3" },
        deps: { react: "18" },
        ...(aliasExports ? { aliasExports } : {}),
      }),
    ],
  });
  return result.outputFiles?.[0]?.text ?? "";
}

describe("aliased imports with a declared inventory", () => {
  it("rejects a component the image does not have, naming the file and line", async () => {
    await expect(
      build(
        `import { Button } from "@/components/ui/button";\n` +
          `import { Spinner } from "@/components/ui/spinner";\n` +
          `export default () => [Button, Spinner];`,
        { [TARGET]: INVENTORY },
      ),
    ).rejects.toThrow(/for import "Spinner"/);

    // The same source is silently accepted without an inventory — this is the
    // regression being locked down, not a hypothetical.
    await expect(
      build(
        `import { Spinner } from "@/components/ui/spinner";\nexport default () => Spinner;`,
      ),
    ).resolves.toContain("esm.sh");
  });

  it("names the aliased package, not the CDN URL, so the error is readable", async () => {
    const error = await build(
      `import { Nope } from "@/components/ui/nope";\nexport default () => Nope;`,
      { [TARGET]: INVENTORY },
    ).catch((err: Error) => err.message);

    expect(error).toContain(`"image-alias:${TARGET}"`);
    expect(error).not.toContain("esm.sh");
    expect(error).not.toContain("deps=");
  });

  it("accepts every declared name and still resolves it from the CDN", async () => {
    const code = await build(
      `import { Button, Card } from "@/components/ui/card";\n` +
        `import { cn } from "@/lib/utils";\n` +
        `export default () => [Button, Card, cn];`,
      { [TARGET]: INVENTORY },
    );

    expect(code).toContain(`https://esm.sh/${TARGET}@0.1.3?deps=react@18`);
  });

  it("pulls in one namespace import, not the whole inventory", async () => {
    // A previous shape re-exported each name explicitly (`export { a, b } from
    // url`), which esbuild cannot tree-shake through an external module: every
    // widget then imported all 253 names, and any single one missing at
    // runtime killed the module — the original bug, re-armed at a wider blast
    // radius. A namespace import is not name-checked at link time.
    const code = await build(
      `import { Button } from "@/components/ui/button";\nexport default () => Button;`,
      { [TARGET]: INVENTORY },
    );

    const imports = code.match(/^import .*$/gm) ?? [];
    expect(imports).toHaveLength(1);
    expect(imports[0]).toMatch(/^import \* as \w+ from "https:\/\/esm\.sh\//);
    expect(code).not.toContain("Skeleton");
  });

  it("leaves subpath aliases alone", async () => {
    // An inventory describes a package root. A subpath re-exports whatever it
    // wants, so validating against the root's list would reject valid imports.
    const code = await build(
      `import { anything } from "@/components/ui/x";\nexport default () => anything;`,
      { "@packagedcn/react/deep": INVENTORY },
    );
    expect(code).toContain("esm.sh");
  });
});

describe("generateAliasModule", () => {
  it("skips names that are not expressible as identifiers", () => {
    const source = generateAliasModule("https://cdn/x", ["Button", "not-valid", "cn"]);
    expect(source).toContain("export const Button = mod.Button;");
    expect(source).toContain("export const cn = mod.cn;");
    expect(source).not.toContain("not-valid");
  });
});
