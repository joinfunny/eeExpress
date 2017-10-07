/**
 * @author: jiangfeng
 * @summary: app main
 */
let express = require('express')
let http = require('http')
let deepAssign = require('deep-assign')
let Runtime = require('./runtime')

/**
 * eeExpress
 * {
 * 	app:Express instance,
 * 	runtime:Runtime,
 * 	config:Runtime.App.Appconfig
 * }
 */
var eeExpress = {
  config(config) {
    var that = this
    var app = that.app = express()
    // override system config
    that.appConfig = deepAssign(Runtime.App.AppConfig, config)
    selfInspection(that.appConfig)
    that.runtime = Runtime
    that.modules = require('./modules')
    Runtime.App.Log.use(app, that.appConfig)
    let logger = Runtime.App.Log.helper
    that.logger = app.logger = logger

    // register Session/Cookie memory
    Runtime.SessionStore.use(app, that.appConfig)
    // view parser
    Runtime.ViewParser.use(app, that.appConfig)

    // international
    Runtime.Internationalization.use(app, that.appConfig)

    // global header setting , cross domain setting,etc.
    if (that.appConfig.runtime.requestHeaders && that.appConfig.runtime.requestHeaders.length > 0) {
      app.use(function(req, res, next) {
        that.appConfig.runtime.requestHeaders.forEach(header => {
          res.setHeader(header[0], header[1])
        })
        next()
      })
    }

    // authorize setting
    // Runtime.Authorization.use(app, [midwares.auth.apiAuth])

    // router & service register
    Runtime.Router.use(app, that.appConfig)

    if (!that.appConfig.runtime.disableOrmMapping) {
      that.logger.info('loading orm mapping.\n')
      Runtime.OrmMapping.useAsync(that.appConfig.runtime.orm, (err, models) => {
        if (!err) {
          that.logger.info('orm loaded success.')
        } else {
          that.logger.error('orm loaded faild.\n')
          that.logger.error(err)
        }
      })
    }

    that.run()
    return that
  },
  run() {
    let app = this.app
    let config = this.appConfig
    let log = app.logger
    // 404 error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found')
      var warning = '404 Not Found,originalUrl:' + req.originalUrl
      app.logger.warn(warning)
      err.status = 404
      next()
    })
    // 开发环境错误提示
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500)
        app.logger.error(err.message)
        res.end('error:' + err + ',message:' + err.message)
        next()
      })
    } else {
      // 生产环境错误提示
      app.use(function(err, req, res, next) {
        res.status(req.status || 500)
        app.logger.error(err)
        res.render('error', {
          message: err.message,
          error: {}
        })
        next()
      })
    }

    // Get port from environment and store in Express.
    var port = normalizePort(config.runtime.listenPort || '3000')
    app.set('port', port)


    // Create HTTP server.
    var server = http.createServer(app)

    // Listen on provided port, on all network interfaces.
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
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


    // Event listener for HTTP server "error" event.
    function onError(error) {
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
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening() {
      var addr = server.address()
      var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
      log.debug('Listening on ' + bind)
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
  },
  Router() {
    return express.Router()
  }
}

function selfInspection(config) {
  Runtime.App.Utils.file.mkdirsSync(config.runtime.directory.static)
  Runtime.App.Utils.file.mkdirsSync(config.runtime.directory.view)
  Runtime.App.Utils.file.mkdirsSync(config.runtime.directory.service)
  Runtime.App.Utils.file.mkdirsSync(config.runtime.directory.router)
  Runtime.App.Utils.file.mkdirsSync(config.runtime.directory.module)
  Runtime.App.Utils.file.mkdirsSync(config.runtime.i18n.directory)
  Runtime.App.Utils.file.mkdirsSync(config.runtime.orm.modelsRoot)
}

module.exports = eeExpress
