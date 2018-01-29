let path = require('path')
let file = require('../utils/file')
module.exports = app => file.moduleDirectory(path.join(app.rootPath, app.EE_EXPRESS_CONFIG.directory.module))
