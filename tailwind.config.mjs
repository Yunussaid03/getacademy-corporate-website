/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#FADB50',
          'gold-deep': '#CCB030',
          dark: '#1A2E26',
          forest: '#1A2E26',
          sage: '#406D59',
          'sage-dark': '#315646',
          light: '#F8FAF9',
          canvas: '#F1F5F3',
          border: '#E2E8F0',
          text: '#1A202C',
          muted: '#4A5568',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
