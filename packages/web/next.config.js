const { PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase) => {
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD
  const nodeEnv = (() => {
    if (isProd) return 'production'
    return 'development'
  })()

  console.log('ENV:', nodeEnv)

  const env = {
    development: {
      SERVER_URI: 'http://localhost:3002',
      APOLLO_SERVER_URI: 'http://localhost:3002/graphql',
      APOLLO_WS_URI: 'ws://localhost:3002/graphql',
      TOKEN_UPLOAD:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImF0IjoiMjAyMDEyMjMiLCJpYXQiOjE2MDg2OTM4ODZ9.6WrFIyA8q6Nc1T78uK7-dWm-6vllKF9mngmw4cQr-KI',
    },

    production: {
      SERVER_URI: 'http://localhost:4000',
      APOLLO_SERVER_URI: 'http://localhost:4000/graphql',
      TOKEN_UPLOAD:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImF0IjoiMjAyMDEyMjMiLCJpYXQiOjE2MDg2OTM4ODZ9.6WrFIyA8q6Nc1T78uK7-dWm-6vllKF9mngmw4cQr-KI',
    },
  }[nodeEnv]

  return {
    env,
  }
}
