module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
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
