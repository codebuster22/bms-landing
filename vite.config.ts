import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'process.env.VITE_PLAUSIBLE_DOMAIN': JSON.stringify(process.env.VITE_PLAUSIBLE_DOMAIN),
    'process.env.VITE_PLAUSIBLE_API_HOST': JSON.stringify(process.env.VITE_PLAUSIBLE_API_HOST),
  },
});