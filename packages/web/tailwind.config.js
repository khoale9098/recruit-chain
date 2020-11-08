module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#5369f8',
      secondary: '#1e2139',
      success: '#43d39e',
      info: '#25c2e3',
      warning: '#ffbe0b',
      danger: '#ff5c75',
    }),
  },
  variants: {},
  plugins: [],
}
