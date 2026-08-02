export function createPreviewManifest(services?: string[]) {
  return {
    name: "preview",
    version: "1.0.0",
    platform: "browser" as const,
    image: "@aprovan/patchwork-image-shadcn",
    services,
  };
}
