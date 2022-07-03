import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      comp: path.resolve(__dirname, "src/components"),
      style: path.resolve(__dirname, "src/style"),
      api: path.resolve(__dirname, "src/api"),
      utils: path.resolve(__dirname, "src/utils"),
      views: path.resolve(__dirname, "src/views"),
      routers: path.resolve(__dirname, "src/routers"),
      config: path.resolve(__dirname, "src/config"),
    },
  },
});
