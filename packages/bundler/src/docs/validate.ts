import type { DocsDiscoveredReference } from "./types.js";

export type DocsValidatedReference = DocsDiscoveredReference & {
  canonicalUrl: string;
  status: number;
};

export type DocsFailedReference = DocsDiscoveredReference & {
  reason: string;
  status?: number;
};

export type ValidateDocsReferencesResult = {
  valid: DocsValidatedReference[];
  failed: DocsFailedReference[];
};

async function fetchWithFallback(reference: DocsDiscoveredReference): Promise<Response> {
  const response = await fetch(reference.url, {
    method: "HEAD",
    redirect: "follow",
  });

  if (response.ok) {
    return response;
  }

  if (response.status === 405 || response.status === 501) {
    return fetch(reference.url, {
      method: "GET",
      redirect: "follow",
    });
  }

  return response;
}

export async function validateDocsReferences(
  references: DocsDiscoveredReference[],
): Promise<ValidateDocsReferencesResult> {
  const valid: DocsValidatedReference[] = [];
  const failed: DocsFailedReference[] = [];

  for (const reference of references) {
    try {
      const response = await fetchWithFallback(reference);

      if (!response.ok) {
        failed.push({
          ...reference,
          reason: `HTTP ${response.status} ${response.statusText}`.trim(),
          status: response.status,
        });
        continue;
      }

      valid.push({
        ...reference,
        canonicalUrl: response.url || reference.url,
        status: response.status,
      });
    } catch (error: unknown) {
      failed.push({
        ...reference,
        reason: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return { valid, failed };
}
