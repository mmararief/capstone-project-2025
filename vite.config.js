import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Pastikan ini cara yang benar untuk integrasi Tailwind Anda, atau gunakan setup PostCSS standar
import path from "path";
import { fileURLToPath } from "url"; // 1. Impor fileURLToPath dari 'url'

// 2. Dapatkan __dirname versi ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // 3. Sekarang __dirname sudah terdefinisi dengan benar
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
