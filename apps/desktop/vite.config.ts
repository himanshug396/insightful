import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import { builtinModules } from 'module'

export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: {
        main: 'electron/main.js',
        preload: 'electron/preload.js',
      },
      onstart(options) {
        options.reload()
      },
      // this tells the plugin’s Vite build for the main process to leave certain imports external
      vite: {
        build: {
          rollupOptions: {
            // any module here will not be bundled and will instead be require()’d at runtime
            external: [
              'convict',
              // Electron’s own APIs
              'electron',
              // all Node.js built-ins so you don’t have to list each one
              ...builtinModules,
            ]
          }
        },
        // also make sure Vite doesn’t try to pre-bundle convict in the dev server
        optimizeDeps: {
          exclude: ['convict']
        }
      }
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
