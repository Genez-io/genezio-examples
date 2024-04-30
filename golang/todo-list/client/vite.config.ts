import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import genezioLocalSDKReload from "@genezio/vite-plugin-genezio";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), genezioLocalSDKReload()],
});
