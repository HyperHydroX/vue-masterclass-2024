import { URL, fileURLToPath } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueRouter(), vue({
    template: {
      compilerOptions: {
        isCustomElement: element => element.startsWith('iconify-icon'),
      },
    },
  }), Components()],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
