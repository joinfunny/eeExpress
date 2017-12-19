/**
 * @author jiangfeng
 * @summary express视图解析
 */
let bodyParser = require('body-parser')
let compression = require('compression')
let favicon = require('serve-favicon')
let path = require('path')
let fs = require('fs')
let express = require('express')
let ejs = require('./ejs')
let rootPath = process.cwd()

exports.use = function (app) {
  // 启用gzip压缩
  if(app.disableGzip) {
    console.warn('app has disabled the gzip module.')
    return
  }
  app.use(compression())
  // 指定静态目录
  app.use(express.static(path.join(rootPath, app.EE_EXPRESS_CONFIG.runtime.directory.static)))

  // 指定favicon.ico请求对应的文件，判断当前是否存在此目录
  var filePath = path.join(rootPath, app.EE_EXPRESS_CONFIG.runtime.directory.static, 'favicon.ico')
  if (fs.existsSync(filePath)) {
    app.use(favicon(filePath))
  }

  // 指定视图层渲染根路径
  app.set('views', path.join(rootPath, app.EE_EXPRESS_CONFIG.runtime.directory.view))
  // 指定视图引擎
  app.engine('.html', ejs)
  app.set('view engine', 'html')

  // body解析
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
}
