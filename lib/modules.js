let path = require('path')
let AppConfig = require('./Runtime/App/AppConfig')
let Utils = require('./Runtime/App/Utils')
let modules = {}

Utils.file.moduleDirectory(path.join(path.resolve(), AppConfig.runtime.directory.module), modules)

module.exports = modules
