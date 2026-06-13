// tailwind.config.js
// Purpose: Tailwind CSS configuration.
// Extends the default theme with the brand's custom color palette, typography scale,
// font families (Google Fonts), animation utilities, and custom breakpoints.
// Enables JIT mode and configures content paths for tree-shaking.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lightSage: '#CACBA7',
        mutedGreen: '#AAB79A',
        forestSage: '#6D8575',
        deepForest: '#3D5757',
        brandBlack: '#000000',
      },

      maxWidth: {
        content: '1280px',
        wide: '1440px',
      },

      spacing: {
        section: '120px',
      },
    },
  },
  plugins: [],
};
