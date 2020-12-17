module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  theme: {
    textColor: (theme) => ({
      ...theme('colors'),
      primary: '#5369f8',
      secondary: '#1e2139',
      success: '#43d39e',
      info: '#25c2e3',
      warning: '#ffbe0b',
      danger: '#ff5c75',
    }),

    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#5369f8',
      secondary: '#1e2139',
      success: '#43d39e',
      info: '#25c2e3',
      warning: '#ffbe0b',
      danger: '#ff5c75',
    }),
    borderColor: (theme) => ({
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
