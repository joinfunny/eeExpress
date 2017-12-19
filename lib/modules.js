let path = require('path')
let AppConfig = require('./Runtime/App/AppConfig')
let Utils = require('./Runtime/App/utils')
let modules = {}

modules = Utils.file.moduleDirectory(path.join(path.resolve(), AppConfig.runtime.directory.module))

module.exports = modules
