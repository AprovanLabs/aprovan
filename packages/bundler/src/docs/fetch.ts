import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { hashContent } from "./hash.js";
import type { DocsCachedSourceFile, DocsReferenceCategory } from "./types.js";
import type { DocsValidatedReference } from "./validate.js";

export type FetchDocsSourcesOptions = {
  references: DocsValidatedReference[];
  sourcesDir: string;
  rawSnapshotsDir?: string;
};

export type FetchDocsSourcesResult = {
  sources: DocsCachedSourceFile[];
  warnings: string[];
};

function sanitizeSlugSegment(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function getReferenceCategory(
  reference: DocsValidatedReference,
): DocsReferenceCategory {
  return reference.category ?? "other";
}

function buildMarkdownTitle(reference: DocsValidatedReference): string {
  return reference.label ?? reference.canonicalUrl ?? reference.url;
}

function normalizeHtmlToMarkdown(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/(p|div|section|article|h1|h2|h3|h4|h5|h6|li|tr)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function toMarkdown(
  body: string,
  contentType: string | null,
  reference: DocsValidatedReference,
): string {
  const normalizedContentType = contentType?.toLowerCase() ?? "";
  const title = buildMarkdownTitle(reference);

  if (normalizedContentType.includes("text/markdown")) {
    return body;
  }

  if (normalizedContentType.includes("text/html")) {
    return `# ${title}\n\n${normalizeHtmlToMarkdown(body)}\n`;
  }

  return `# ${title}\n\n\`\`\`\n${body.trim()}\n\`\`\`\n`;
}

export async function fetchDocsSources(
  options: FetchDocsSourcesOptions,
): Promise<FetchDocsSourcesResult> {
  await mkdir(options.sourcesDir, { recursive: true });

  if (options.rawSnapshotsDir) {
    await mkdir(options.rawSnapshotsDir, { recursive: true });
  }

  const sources: DocsCachedSourceFile[] = [];
  const warnings: string[] = [];

  for (const [index, reference] of options.references.entries()) {
    try {
      const response = await fetch(reference.canonicalUrl, {
        method: "GET",
        redirect: "follow",
        headers: {
          Accept:
            "text/markdown,text/html,text/plain,application/json;q=0.9,*/*;q=0.8",
        },
      });

      if (!response.ok) {
        warnings.push(
          `Failed to fetch ${reference.canonicalUrl}: HTTP ${response.status} ${response.statusText}`.trim(),
        );
        continue;
      }

      const body = await response.text();
      const contentType = response.headers.get("content-type");
      const markdownBody = toMarkdown(body, contentType, reference);
      const hash = hashContent(markdownBody);
      const stem = `${String(index + 1).padStart(3, "0")}-${
        sanitizeSlugSegment(buildMarkdownTitle(reference)) || "source"
      }`;
      const fileName = `${stem}.md`;
      const filePath = path.join(options.sourcesDir, fileName);

      await writeFile(filePath, markdownBody, "utf8");

      if (options.rawSnapshotsDir) {
        const rawSnapshotPath = path.join(
          options.rawSnapshotsDir,
          `${stem}.json`,
        );
        const headersObj: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headersObj[key] = value;
        });
        await writeFile(
          rawSnapshotPath,
          JSON.stringify(
            {
              url: reference.canonicalUrl,
              status: response.status,
              contentType,
              headers: headersObj,
            },
            null,
            2,
          ).concat("\n"),
          "utf8",
        );
      }

      sources.push({
        sourceUrl: reference.url,
        canonicalUrl: reference.canonicalUrl,
        category: getReferenceCategory(reference),
        title: reference.label,
        contentType: contentType ?? undefined,
        filePath,
        sha256: hash,
        fetchedAt: new Date().toISOString(),
      });
    } catch (error: unknown) {
      warnings.push(
        `Failed to fetch ${reference.canonicalUrl}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  return { sources, warnings };
}
