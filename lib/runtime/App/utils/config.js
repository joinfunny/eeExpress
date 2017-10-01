/**
 * @author: jiangfeng
 * @summary: 配置文件相关方法
 */
let deepAssign = require('deep-assign')
module.exports = {
  getConfig: env => {
    let baseConfig = require('../../../config/base')
    let AppConfig = require('../../../config/' + (env || 'development'))
    let config = deepAssign({}, baseConfig, AppConfig)
    return config
  }
}
