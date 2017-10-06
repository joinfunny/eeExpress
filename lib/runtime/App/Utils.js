/**
 * @author: jiangfeng
 * @summary: 常用工具
 */
let _ = require('lodash')
let file = require('./utils/file')
let utilsDirectory = './lib/runtime/App/utils'

let Utils = Object.assign({

}, {
  _
}, file.moduleDirectory(utilsDirectory))


module.exports = Utils
