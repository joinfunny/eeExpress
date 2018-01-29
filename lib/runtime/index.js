let path = require('path')
let file = require('./utils/file')
module.exports = {
  app: file.moduleDirectory(path.join(__dirname, './app')),
  utils: file.moduleDirectory(path.join(__dirname, './utils'))
}
