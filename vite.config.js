import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["jwt-decode"],
  },
  build: {
    target: "esnext", // Use the latest JavaScript syntax for modern browsers
    minify: "esbuild", // Minifies the JS and CSS using esbuild (default and fast)
    cssCodeSplit: true, // Ensures that CSS is code-split and optimized
    rollupOptions: {
      output: {
        // Use hashed filenames for better caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
