import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        'gold': '#D4AF37',
        'maroon': '#800020',
        'cream': '#FFF8F0',
        'navy': '#0A2342',
      },
      fontFamily: {
        'cursive': ['"Dancing Script"', 'cursive'],
        'elegant': ['"Playfair Display"', 'serif'],
        'simple': ['"Work Sans"', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out',
        'slideUp': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [react(), tailwindcss()],
})
