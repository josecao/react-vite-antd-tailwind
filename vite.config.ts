import path from 'path'
import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { visualizer } from 'rollup-plugin-visualizer'

const manualChunks = (id: string) => {
  if (id.includes('@sentry')) {
    return 'sentry'
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    visualizer({
      open: true, // 👈 Tự mở browser khi build xong
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption
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
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
})

// import { defineConfig, type PluginOption } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import viteTsconfigPaths from 'vite-tsconfig-paths';
// import svgrPlugin from 'vite-plugin-svgr';
// import { configDefaults } from 'vitest/config';
// import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
// import { visualizer } from 'rollup-plugin-visualizer';

// const manualChunks = (id: string) => {
//   if (id.includes('@sentry')) {
//     return 'sentry';
//   }
// };
// //
// /* eslint-disable import/no-default-export */
// export default defineConfig({
//   plugins: [
//     react(),
//     viteTsconfigPaths(),
//     svgrPlugin(),
//     TanStackRouterVite(),
//     process.env.ANALYZE ? (visualizer({ open: true, gzipSize: true }) as PluginOption) : null,
//   ],
//   server: {
//     open: true,
//     port: 3000,
//   },
//   build: {
//     outDir: 'build',
//     rollupOptions: {
//       output: {
//         manualChunks,
//       },
//     },
//   },
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: 'src/setupTests.ts',
//     clearMocks: true,
//     exclude: [...configDefaults.exclude, 'e2e/**/*', 'e2e-playwright/**/*'],
//     coverage: {
//       reporter: ['text', 'json', 'html'],
//     },
//   },
// });
