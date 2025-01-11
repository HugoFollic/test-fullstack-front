import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

export default defineConfig({
  root: "./views",
  server: {
    port: 3000,
  },
  plugins: [
    deno(),
  ],
});