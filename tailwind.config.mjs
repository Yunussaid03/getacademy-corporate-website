/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#FADB50',
          'gold-deep': '#CCB030',
          dark: '#244336',         // Lightened from #1A2E26: fresher, greener deep sage
          forest: '#244336',       // Lightened from #1A2E26
          sage: '#406D59',         // Primary reference green
          'sage-dark': '#315646',   // Richer deep sage for hover/accents
          'sage-light': '#EBF3EF',  // Soft light-green tint background
          light: '#F4F8F6',        // Fresher light green-tinted canvas
          canvas: '#EBF2EE',       // Light tinted background for alternating sections
          border: '#D8E3DE',       // Soft sage-tinted neutral border
          text: '#1A202C',         // High contrast text
          muted: '#4A5568',        // Readable secondary text
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
