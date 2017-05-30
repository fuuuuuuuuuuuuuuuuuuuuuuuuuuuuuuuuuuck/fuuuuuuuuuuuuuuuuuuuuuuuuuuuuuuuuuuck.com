const _ = require('lodash')
const development = require('./development')
const production = require('./production')
const test = require('./test')

const env = process.env.NODE_ENV || 'development'

const configs = {
    development,
    test,
    production
}

const defaultConfig = {
    env,
}

const config = _.merge(defaultConfig,configs[env])

module.exports = config