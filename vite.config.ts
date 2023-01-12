import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      components: "/src/components",
      icons: "/src/components/icons",
      hooks: "/src/hooks",
      pages: "/src/pages",
      routes: "/src/routes",
      store: "/src/store",
      utils: "/src/utils",
      theme: "/src/theme",
      interfaces: "/src/interfaces",
      services: "/src/services",
    },
  },
});
