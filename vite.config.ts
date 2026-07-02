import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  // Use repo-name base for GitHub Pages (jplovensa.github.io/fjallstudio)
  // Cloudflare Pages also works fine with this since it's deployed at the root.
  base: process.env.GITHUB_ACTIONS ? '/fjallstudio/' : '/',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
