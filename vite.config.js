import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})

const dynamicRoutes = [
  '/', 
  '/about', 
  '/services', 
  '/blogs', 
  '/portfolio', 
  '/tools', 
  '/start-project',
  '/tutorials',
  '/tutorials/react',
  '/tutorials/node',
  '/tutorials/express',
  '/tutorials/mongodb',
  '/tools/svg-to-react',
  '/tools/json-to-ts',
  '/tools/jwt-decoder',
  '/tools/meta-extractor'
];

export default defineConfig({
  plugins: [
    react(),
    // Sitemap Plugin Configuration
    Sitemap({
      hostname: 'https://www.codelume.online',
      dynamicRoutes,
      generateRobotsTxt: true, // Google bots ko batayega sitemap kahan hai
    })
  ],
})