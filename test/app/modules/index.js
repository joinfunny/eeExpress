let eeExpress = require('../../../lib/index')
const path = require('path')
let modules = {}
eeExpress.runtime.App.Utils.getFiles(__dirname).forEach(function (file) {
  var fileName = path.basename(file, '.js')
  if (fileName !== 'index') {
    modules[fileName] = require(file)
  }
}, this)

module.exports = modules
