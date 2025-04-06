import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

// Load environment variables
const env = dotenv.config()
dotenvExpand.expand(env)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL)
  }
})
