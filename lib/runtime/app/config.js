let path = require('path')
let deepAssign = require('deep-assign')
/**
 * @author: jiangfeng
 * @summary: 加载配置文件
 * 两种模式：
 * 1. 如果在根路径下存在config.json，就使用 config.json作为系统运行的配置
 * 2. 否则使用admin下的config规则生成系统运行的配置
 */

module.exports = function(app) {
  let config = {}
  let baseConfig = require('../../config')
  if (process.env.NODE_ENV) {
    config = require(path.join(
      app.rootPath,
      'configs',
      process.env.NODE_ENV
    ))
  }
  return deepAssign({}, baseConfig, config, {rootPath: app.rootPath})
}
