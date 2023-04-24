import { defineConfig, loadEnv, ConfigEnv, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { resolve } from "path";
const pathResolve = (dir: string): string => resolve(__dirname, ".", dir);

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 环境变量
  const env = loadEnv(mode, process.cwd());
  // 开发环境判断
  const isDev = mode === "dev";
  console.info(env, "env");
  return defineConfig({
    base: "./",
    publicDir: "public",
    server: {
      host: "0.0.0.0",
      port: 8000,
      open: true,
      proxy: {
        "/dev-api": {
          target: "http://172.17.30.13:8123/", // 后端服务实际地址
          // target: "http://172.17.30.13:8823/safety_knowledge-api/", // 后端服务实际地址
          // target: env.VITE_APP_BASE_API, // 后端服务实际地址
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ""),
        },
      },
    },
    resolve: {
      alias: [{ find: "@", replacement: pathResolve("src") }],
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    plugins: [
      vue(),
      WindiCSS(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [
          // Auto import functions from Element Plus
          ElementPlusResolver(),
          // Auto import icon components
          IconsResolver({
            prefix: "Icon",
          }),
        ],
        dts: "src/auto-import.d.ts",
      }),
      Components({
        resolvers: [
          // Auto register Element Plus components
          ElementPlusResolver(),
          // Auto register icon components
          IconsResolver({
            enabledCollections: ["ep"],
          }),
        ],
      }),
    ],
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@import "/src/styles/index.scss";',
    //     },
    //   },
    // },
    optimizeDeps: {
      include: [],
    },
    build: {
      // outDir: "dist",
      outDir: env.VITE_APP_BASE_NAME + Math.floor(Math.random() * 1000 + 1),
      assetsDir: "assets",
      cssCodeSplit: true, // 启用/禁用CSS代码拆分
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  });
};
