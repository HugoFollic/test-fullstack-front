import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: "./views",
  server: {
    port: 3000,
  },
  plugins: [
    deno(),
    vue(),
  ],
});