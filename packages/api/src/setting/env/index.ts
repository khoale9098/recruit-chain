/* eslint-disable global-require,import/no-dynamic-require */
const env = process.env.NODE_ENV || 'development'
const envConfig = require(`./${env}`)

export default envConfig.default
