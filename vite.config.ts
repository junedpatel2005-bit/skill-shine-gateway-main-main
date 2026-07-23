// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    // better-sqlite3 and puppeteer are treated as external native/dynamic modules
    // to prevent Vite/Rollup from bundling them during the Vercel build.
    ssr: {
      external: ["better-sqlite3", "puppeteer", "puppeteer-core"],
    },
    optimizeDeps: {
      exclude: ["better-sqlite3", "puppeteer", "puppeteer-core"],
    },
    resolve: {
      alias: {
        "better-sqlite3": "./src/lib/shims/better-sqlite3.ts",
      },
    },
    build: {
      rollupOptions: {
        external: ["better-sqlite3", "puppeteer", "puppeteer-core"],
      },
    },
  },
});