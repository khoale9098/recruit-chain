module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  variants: {
    width: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
