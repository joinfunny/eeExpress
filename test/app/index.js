process.env.NODE_ENV = 'development'
let EEExpress = require('../../lib/index')

module.exports = (function() {
  let config = require('./configs/' + process.env.NODE_ENV)
  return new EEExpress(config, __dirname)
})()
