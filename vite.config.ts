import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/PodstawyAutomatyki/",
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "PodstawyAutomatyki/assets/[name].[hash][extname]",
      },
    },
  },
});
