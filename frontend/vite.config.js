import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/**/*.test.js"], // Only run unit tests
    exclude: ["e2e/**", "tests-examples/**", "tests/e2e/**"], // Exclude E2E tests
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // ✅ Tambahkan konfigurasi untuk SPA routing
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // ✅ Dev server configuration untuk SPA
  server: {
    historyApiFallback: true,
  },
  // ✅ Preview server configuration untuk SPA
  preview: {
    historyApiFallback: true,
  },
});
