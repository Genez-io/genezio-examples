import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import genezioLocalSDKReload from '@genezio/vite-plugin-genezio'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['src/sdk/'],
  },
  plugins: [react(), genezioLocalSDKReload()],
},
)
