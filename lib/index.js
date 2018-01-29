/**
 * @author: jiangfeng
 * @summary: app main
 */
let express = require('express')
let http = require('http')
let deepAssign = require('deep-assign')
let runtime = require('./runtime')

/**
 * eeExpress
 * {
 * app:Express instance,
 * runtime:Runtime,
 * config:Runtime.App.Appconfig
 * }
 */
class EEExpress {
  constructor(config = null, rootPath = process.cwd()) {
    this.app = null
    this.logger = null
    this.config = null
    this.utils = runtime.utils
    let that = this
    let app = (that.app = express())
    app.rootPath = rootPath
    // override system config
    that.app.EE_EXPRESS_CONFIG = that.config = deepAssign(runtime.app.config(app))
    selfInspection(that.config)
    runtime.app.log.use(app)
    that.logger = app.logger = runtime.app.log.helper

    // register Session/Cookie memory
    runtime.app.sessionStore.use(app)
    // view parser
    runtime.app.viewParser.use(app)
    // orm mapping
    runtime.app.orm.use(app)
    // international
    runtime.app.i18n.use(app)

    // global header setting , cross domain setting,etc.
    if (
      that.app.EE_EXPRESS_CONFIG.requestHeaders &&
      that.app.EE_EXPRESS_CONFIG.requestHeaders.length > 0
    ) {
      app.use(function(req, res, next) {
        that.app.EE_EXPRESS_CONFIG.requestHeaders.forEach(header => {
          res.setHeader(header[0], header[1])
        })
        next()
      })
    }

    // authorize setting
    // Runtime.Authorization.use(app, [midwares.auth.apiAuth])

    // router & service register
    runtime.app.routeRegister.use(app)
  }

  run() {
    let app = this.app
    let config = this.config
    let log = this.logger
    // 404 error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found')
      var warning = '404 Not Found,originalUrl:' + req.originalUrl
      log.warn(warning)
      err.status = 404
      next()
    })
    // env dev error tip
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500)
        log.error(err.message)
        res.end('error:' + err + ',message:' + err.message)
        next()
      })
    } else {
      // env production error tip
      app.use(function(err, req, res, next) {
        res.status(req.status || 500)
        log.error(err)
        res.render('error', {
          message: err.message,
          error: {}
        })
        next()
      })
    }

    // Get port from environment and store in Express.
    var port = normalizePort(config.listenPort || '3000')
    app.set('port', port)

    // Create HTTP server.
    var server = http.createServer(app)

    // Listen on provided port, on all network interfaces.
    server.listen(port)
    server.on('error', (error) => {
      if (error.syscall !== 'listen') {
        throw error
      }

      var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges')
          process.exit(1)
          break
        case 'EADDRINUSE':
          console.error(bind + ' is already in use')
          process.exit(1)
          break
        default:
          throw error
      }
    })
    server.on('listening', () => {
      var addr = server.address()
      var bind =
        typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
      log.debug('Listening on ' + bind)
    })
    console.log(process.env.NODE_ENV + ' is running , port : ' + port)

    // Normalize a port into a number, string, or false.
    function normalizePort(val) {
      var port = parseInt(val, 10)

      if (isNaN(port)) {
        // named pipe
        return val
      }

      if (port >= 0) {
        // port number
        return port
      }

      return false
    }

    process.on('uncaughtException', function(err) {
      console.error('uncaughtException: %s', err.message)
      var worker = require('cluster').worker
      if (worker) {
        process.send({
          cmd: 'suicide',
          crash: err.stack,
          message: err.message
        })
        server.close(function() {
          process.exit(1)
        })
      }
    })
  }
}

function selfInspection(config) {
  config.directory.static.split(',').forEach(directory => {
    runtime.utils.file.mkdirsSync(directory)
  })
  config.directory.view.split(',').forEach(directory => {
    runtime.utils.file.mkdirsSync(directory)
  })
  config.directory.service.split(',').forEach(directory => {
    runtime.utils.file.mkdirsSync(directory)
  })
  config.directory.router.split(',').forEach(directory => {
    runtime.utils.file.mkdirsSync(directory)
  })
  // runtime.utils.file.mkdirsSync(config.runtime.directory.module)
  // runtime.utils.file.mkdirsSync(config.runtime.i18n.directory)
  // runtime.utils.file.mkdirsSync(config.runtime.orm.modelsRoot)
}

module.exports = EEExpress
