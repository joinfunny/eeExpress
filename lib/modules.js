let AppConfig = require('./Runtime/App/AppConfig')
let Utils = require('./Runtime/App/Utils')
let modules = {}
Utils.file.moduleDirectory(AppConfig.runtime.directory.module, modules)

module.exports = modules
