let path = require('path')
let AppConfig = require('./runtime/App/AppConfig')
let Utils = require('./runtime/App/utils')
let modules = {}

modules = Utils.file.moduleDirectory(path.join(path.resolve(), AppConfig.runtime.directory.module))

module.exports = modules
