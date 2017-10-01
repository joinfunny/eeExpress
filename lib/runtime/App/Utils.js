/**
 * @author: jiangfeng
 * @summary: 常用工具
 */
let _ = require('lodash')
let file = require('./utils/file')
let path = require('path')
let utilsDirectory = path.resolve(__dirname, './utils')

let Utils = Object.assign({

}, {
  _
})
file.requireDirectory(utilsDirectory, Utils)

module.exports = Utils
