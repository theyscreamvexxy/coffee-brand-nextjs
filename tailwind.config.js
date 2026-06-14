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
        lightSage:    '#CACBA7',   // warm sandy sage — headlines, warm accents
        mutedGreen:   '#AAB79A',   // mid sage — body text, secondary info
        forestSage:   '#6D8575',   // forest green — labels, rules, micro accents
        deepForest:   '#3D5757',   // deep teal — dark accents, borders
        brandBlack:   '#000000',   // pure brand black
        /* ── Section backgrounds ── not pure black, forest-tinted ── */
        forestDark:   '#0f1c14',   // BrandPhilosophy bg — very dark forest green
        journeyDark:  '#0a1410',   // JourneySection bg — dark forest, slight warmth
        forestDeep:   '#080f0a',   // OriginStory bg — deepest, most immersive
        productBlack: '#080808',   // SignatureCollection — near-black, product focus
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
