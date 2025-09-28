import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Ifaz_umrah/',   // 👉 আপনার repo নাম এখানে দিতে হবে (case-sensitive)
  build: {
    outDir: 'docs'
  }
})
