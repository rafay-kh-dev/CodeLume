import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

// CodeLume ke tamam important URLs yahan define karein
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
    tailwindcss(),
    // Sitemap Plugin Configuration
    Sitemap({
      hostname: 'https://www.codelume.online',
      dynamicRoutes,
      generateRobotsTxt: true, // Google bots ko batayega sitemap kahan hai
    })
  ],
  base: '/',
})