import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { crx } from "@crxjs/vite-plugin";
// import manifest from './manifest.json' // Node 14 & 16
import manifest from "./manifest.config"; // Node >=17
import { resolve } from "path";
// element plus 自动按需搭导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

const pathSrc = resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // 多页面打包配置（其实可以不用，直接使用router实现页面跳转也行）
      input: {
        popup: resolve(__dirname, "index.html"),
        help: resolve(__dirname, "./src/pages/help/index.html")
      },
      output: {
        dir: "dist",
        format: "es"
      }
    }
  },
  plugins: [
    vue(),
    crx({ manifest }),
    AutoImport({
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: resolve(pathSrc, 'components.d.ts')
    }),
    Icons({
      autoInstall: true
    })
  ],
  // 根据启动服务的端口修改，否则 hmr 不生效
  server: {
    strictPort: true,
    port: 5174,
    hmr: {
      clientPort: 5174
    }
  }
});
