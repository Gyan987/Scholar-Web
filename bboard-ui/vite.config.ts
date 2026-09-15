
// CrediFi frontend build configuration
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  cacheDir: ".vite",

  build: {
    target: "esnext",
    minify: false,

    rollupOptions: {
      output: {
        manualChunks(moduleId) {
          return moduleId.includes("onchain-runtime-v3") ? "midnight-wasm" : undefined;
        },
      },

      commonjsOptions: {
        transformMixedEsModules: true,
        extensions: [".js", ".cjs"],
        ignoreDynamicRequires: true,
      },
    },
  },

  plugins: [
    react(),
    wasm(),

    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (index) => `__tla_${index}`,
    }),

    {
      name: "credifi-wasm-resolver",

      resolveId(source, importer) {
        const runtimePackage = "@midnight-ntwrk/onchain-runtime-v3";
        const compactRuntime = "@midnight-ntwrk/compact-runtime";

        if (
          source === runtimePackage &&
          importer?.includes(compactRuntime)
        ) {
          return {
            id: source,
            external: false,
            moduleSideEffects: true,
          };
        }

        return null;
      },
    },
  ],

  optimizeDeps: {
    rolldownOptions: {
      target: "esnext",
      supported: {
        "top-level-await": true,
      },
      platform: "browser",
      format: "esm",

      loader: {
        ".wasm": "binary",
      },
    },

    include: [
      "@midnight-ntwrk/compact-runtime",
    ],

    exclude: [
      "@midnight-ntwrk/onchain-runtime-v3",
      "@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm_bg.wasm",
      "@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm.js",
    ],
  },

  define: {},

  checks: {
    importIsUndefined: false,
    pluginTimings: false,
  },

  resolve: {
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
      ".wasm",
    ],

    mainFields: [
      "browser",
      "module",
      "main",
    ],
  },
});
