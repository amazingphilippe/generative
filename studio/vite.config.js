// import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    minify: false,
    outDir: '../dist/components/studio',
    lib: {
      entry: 'src/main.js', // Entry point of your Vue app
      name: 'Studio', // Name of your library
      fileName: (format) => `studio.${format}.js`, // Output file name
      formats: ['esm'], // Formats for the output
    },
  },
})
