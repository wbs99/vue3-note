import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
      /**
       * 自定义插入位置
       * @default: body-last
       */
      //inject?: 'body-last' | 'body-first'
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: "__svg__icons__dom__",
    }),
  ],
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
