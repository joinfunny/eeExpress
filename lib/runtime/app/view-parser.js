/**
 * @author jiangfeng
 * @summary express view parse
 */
let path = require('path')
let fs = require('fs')
let express = require('express')
let bodyParser = require('body-parser')
let compression = require('compression')
let favicon = require('serve-favicon')
let ejs = require('ejs')
ejs.delimiter = '$'

/**
 * view template wrapper
 * @param {String} path
 * @param {Object|Function} options or callback
 * @param {Function|undefined} fn
 * @returns {String}
 * @api public
 */
let ejsWrapper = app => {
  return function(path, options, fn) {
    var viewConfig = JSON.parse(JSON.stringify(app.EE_EXPRESS_CONFIG))
    options.config = options.config || {}
    for (var i in options.config) {
      viewConfig[i] = options.config[i]
    }
    options.appConfig = viewConfig
    console.log(viewConfig)
    options.delimiter = '$'
    ejs.renderFile(path, options, fn)
  }
}

exports.use = function(app) {
  // enable gzip
  if (app.disableGzip) {
    console.warn('app has disabled the gzip module.')
    return
  }
  app.use(compression())
  // set static directory
  let statics = app.EE_EXPRESS_CONFIG.directory.static.split(',')
  let dir = ''
  let faviconed = false
  let faviconPath = ''
  statics.forEach(directory => {
    if (directory) {
      dir = path.isAbsolute(directory) ? directory : path.join(app.rootPath, directory)
      app.use(express.static(dir))
      if (!faviconed) {
      // if `favicon.ico` exists, then set it.
        faviconPath = path.isAbsolute(directory) ? path.join(directory, 'favicon.ico') : path.join(app.rootPath, app.EE_EXPRESS_CONFIG.directory.static, 'favicon.ico')
        if (fs.existsSync(faviconPath)) {
          app.use(favicon(faviconPath))
          faviconed = true
        }
      }
    }
  })

  let views = app.EE_EXPRESS_CONFIG.directory.view.split(',')
  // set views directory
  views.forEach((directory, index) => {
    if (directory) {
      views[index] = path.isAbsolute(directory) ? directory : path.join(app.rootPath, directory)
    }
  })
  app.set('views', views)

  // set view engine.
  app.engine('.html', ejsWrapper(app))
  app.set('view engine', 'html')

  // parse request body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
}
