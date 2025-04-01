import path from 'path'
import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    process.env.ANALYZE
      ? (visualizer({ open: true, gzipSize: true }) as PluginOption)
      : null,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      // fix loading all icon chunks in dev mode
      // https://github.com/tabler/tabler-icons/issues/1233
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  server: {
    open: true,
    port: 4444,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-core': ['react', 'react-dom'],
          'vendor-ui': [
            'antd',
          ],
          'vendor-utils': [
            'axios',
            'dayjs',
            'zustand',
            '@tabler/icons-react',
          ],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'antd',
      'axios',
      'dayjs',
      'zustand',
      // 'i18next',
    ],
    exclude: ['@tabler/icons-react'],
  },
})
