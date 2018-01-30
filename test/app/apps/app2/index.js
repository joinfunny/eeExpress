process.env.NODE_ENV = process.env.NODE_ENV || 'development'
let EEExpress = require('../../../../lib/index')

module.exports = (function() {
  let config = require('./configs/' + process.env.NODE_ENV)
  let app = new EEExpress(config, __dirname)
  app.init()
  return app
})()
