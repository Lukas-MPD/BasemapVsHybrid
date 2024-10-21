import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  server: {
    hmr: process.env.CODESANDBOX_SSE || process.env.GITPOD_WORKSPACE_ID ? 443 : undefined,
    proxy: {
      '/saveSurveyData': {
        target: 'https://test-projekt-server.de:3000',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
