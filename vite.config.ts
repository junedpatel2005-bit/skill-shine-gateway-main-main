import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    // Explicitly disable watching during builds to prevent infinite build loops
    build: {
      watch: null,
      rollupOptions: {
        external: ["better-sqlite3", "puppeteer", "puppeteer-core"],
      },
    },
    ssr: {
      external: ["better-sqlite3", "puppeteer", "puppeteer-core"],
    },
    optimizeDeps: {
      exclude: ["better-sqlite3", "puppeteer", "puppeteer-core"],
    },
    resolve: {
      alias: {
        "@/": "/src/",
        "better-sqlite3": "./src/lib/shims/better-sqlite3.ts",
      },
    },
  },
});