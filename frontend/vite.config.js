// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Permet l'accès depuis d'autres appareils
    watch: {
      usePolling: true, // ✅ Essentiel pour certains environnements
      interval: 1000,   // ✅ Vérifie les changements toutes les 1s
    },
  },
  // Forcer le rechargement complet si nécessaire
  optimizeDeps: {
    force: true,
  },
})