import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Ifaz_umrah/',
  build: { outDir: 'docs' }
})