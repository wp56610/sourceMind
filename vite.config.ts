import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import { resolve } from "path";
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css'
// https://vitejs.dev/config/
export default defineConfig({
  root: 'example',
  plugins: [
    react(),
    dts({ rollupTypes: true }),
    // TODO  reactScopedCssPlugin ts error, but it's work. 
    // reactScopedCssPlugin extend rollup.plugin, vitePlugin extend rollup.plugin too, maybe reactScopedCssPlugin should extend vitePlugin
    reactScopedCssPlugin({
      styleFileSuffix: ''
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        math: 'parens-division',
      },
      preprocessorOptions: {
        scss: {
        }
      }
    },
  },
  build:{
    outDir: '../dist',
    lib: {
      entry: resolve(__dirname, "src/main.tsx"), // 打包的入口文件
      formats: ['es'], //, 'cjs' , 'umd' , 'iife'
      name: 'mindMap',
      fileName: (format) => `mindMap.${format}.js` // 打包后的文件名
    },
    sourcemap: true, // 输出.map文件
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',
        }
      }
    }
  }
})
