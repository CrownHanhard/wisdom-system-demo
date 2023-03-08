import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import * as path from "path";

function resolve(dir: string) {
  return path.resolve(__dirname, dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("fc-"),
        },
      },
    }),
    createSvgIconsPlugin({
      // config svg dir that can config multi
      iconDirs: [path.resolve(process.cwd(), "src/icons/common")],
      // appoint svg icon using mode
      symbolId: "icon-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        additionalData: '@import "@/styles/scss/global.scss";',
        // additionalData: '@use "@/assets/scss/global.scss" as *;'
      },
    },
  },
});
