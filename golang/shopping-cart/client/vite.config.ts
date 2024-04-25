import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import genezioLocalSDKReload from "@genezio/vite-plugin-genezio";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), genezioLocalSDKReload()],
})
