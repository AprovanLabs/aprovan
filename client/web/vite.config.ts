import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { localPackagesPlugin } from "./vite/local-packages-plugin.js";

export default defineConfig(async () => {
  await import("./scripts/load-env.js");

  const GATEWAY_URL = process.env.GATEWAY_URL ?? "http://localhost:4000";

  return {
    base: "/chat/",
    plugins: [
      tailwindcss(),
      react(),
      localPackagesPlugin({
        "@aprovan/patchwork-image-shadcn": "../../packages/images/shadcn",
      }),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        // Keep the SW out of `pnpm dev` — it's a source of stale-content
        // confusion during local iteration and buys nothing there.
        devOptions: { enabled: false },
        includeAssets: ["apple-touch-icon.png"],
        manifest: {
          name: "Patchwork Chat",
          short_name: "Patchwork",
          description: "Chat with Patchwork widgets and workflows.",
          start_url: "/chat/",
          scope: "/chat/",
          display: "standalone",
          // Matches the app's dark theme tokens (--background / --foreground
          // in @aprovan/ui/theme.css, oklch(0.145 0 0) → #0a0a0a).
          background_color: "#0a0a0a",
          theme_color: "#0a0a0a",
          icons: [
            { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "maskable-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          // Precache the built shell only — this SPA has no server-rendered
          // routes, so everything the app needs to boot offline lives here.
          globPatterns: ["**/*.{js,css,html,svg,png,ico,woff,woff2}"],
          // The main chunk is ~2.6MB; Workbox's 2MB default would silently
          // skip precaching it, which defeats the point of offline support.
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          // SPA fallback for client-side routing, but scoped tightly to
          // `/chat/` — this bucket also serves the marketing site and the
          // registry app from sibling prefixes, and a stray fallback match
          // there would serve the chat shell instead of their content.
          navigateFallback: "/chat/index.html",
          navigateFallbackAllowlist: [/^\/chat\//],
          navigateFallbackDenylist: [/^\/api\//, /^\/chat\/api\//],
          // Never let Workbox intercept the gateway API: streaming SSE
          // completions and authenticated calls must always hit the network
          // directly, never be served from — or written into — the cache.
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
              handler: "NetworkOnly",
            },
          ],
        },
      }),
    ],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    server: {
      proxy: {
        "/gateway": {
          target: GATEWAY_URL,
          changeOrigin: true,
          rewrite: (urlPath) => urlPath.replace(/^\/gateway/, ""),
        },
      },
    },
  };
});
