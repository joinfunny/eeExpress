let path = require('path')
let fs = require('fs')
let deepAssign = require('deep-assign')
let _ = require('lodash')
/**
 * @author: jiangfeng
 * @summary: 根据环境变量加载配置文件
 */

module.exports = function(app) {
  let config = {}
  let envConfigFileName = process.env.NODE_ENV || 'index.js'
  let envConfigFilePath = path.join(app.rootPath, 'configs', envConfigFileName)
  if (fs.existsSync(envConfigFilePath)) {
    config = _.cloneDeep(deepAssign({}, require(envConfigFilePath), {
      rootPath: app.rootPath
    }))
  } else {
    config = { rootPath: app.rootPath }
  }
  return config
}
