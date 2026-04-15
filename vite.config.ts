import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProduction = mode === 'production';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        target: ['es2020', 'edge89'],
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: isProduction,
            drop_debugger: isProduction
          },
          output: {
            comments: false
          }
        },
        cssCodeSplit: true,
        sourcemap: !isProduction,
        reportCompressedSize: !isProduction,
        chunkSizeWarningLimit: 800,
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              // Split all seed data files
              if (id.includes('/data/')) {
                const match = id.match(/\/data\/([^\/]+)\.ts$/);
                if (match) {
                  return `seeds-${match[1]}`;
                }
              }
              // Keep vendor modules separate
              if (id.includes('node_modules')) {
                if (id.includes('react')) {
                  return 'vendor-react';
                }
                if (id.includes('google') || id.includes('genai')) {
                  return 'vendor-ai';
                }
                if (id.includes('lucide')) {
                  return 'vendor-icons';
                }
                return 'vendor-other';
              }
              return undefined;
            }
          }
        }
      }
    };
});
