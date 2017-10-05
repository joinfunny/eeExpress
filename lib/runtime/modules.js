let AppConfig = require('./App/AppConfig')
let Utils = require('./App/Utils')
let modules = {}
Utils.moduleDirectory(AppConfig.runtime.directory.module, modules)

module.exports = modules
