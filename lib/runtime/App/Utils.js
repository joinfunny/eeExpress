/**
 * @author: jiangfeng
 * @summary: 常用工具
 */
let _ = require('lodash')
let path = require('path')
let file = require('./utils/file')
let utilsDirectory = path.join(__dirname, './utils')

let Utils = Object.assign({

}, {
  _
}, file.moduleDirectory(utilsDirectory))


module.exports = Utils
