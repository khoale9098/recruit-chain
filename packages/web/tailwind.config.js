module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  important: true,
  future: {
    removeDeprecatedGapUtilities: true,
  },
  variants: {
    width: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
