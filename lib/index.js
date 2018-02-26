/**
 * @author: jiangfeng
 * @summary: app main
 */
let express = require("express");
let http = require("http");
let deepAssign = require("deep-assign");
let _ = require("lodash");
let uuid = require("node-uuid");
let runtime = require("./runtime");
let defaultConfig = require("./config");

let eeExpressCache = {};
let instanceId = 0;

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
    this._instanceId = uuid.v4();
    eeExpressCache[this._instanceId] = {};
    this.rootPath = "";
    this.logger = null;
    this.config = null;
    this.app = express();
    this.rootPath = this.app.rootPath = rootPath;
    // override system config
    this.setConfig(config);
  }
  setConfig(config) {
    this.config = this.app.EE_EXPRESS_CONFIG = _.cloneDeep(
      deepAssign({}, defaultConfig, runtime.app.config(this.app), config)
    );
    // selfInspection(this.config)
  }
  /**
   * set the auth regular for this app
   * @param {*FunctionArray} filters set the filters for auth
   */
  authRegister(filters) {
    if (!filters) {
      throw new ReferenceError("you must set a filter function or array.");
    }
    if (!Array.isArray(filters)) {
      filters = [filters];
    }
    eeExpressCache[this._instanceId] = { authFilters: filters };
  }
  init() {
    runtime.app.log.use(this.app);
    this.logger = this.app.logger = runtime.app.log.helper;

    // register Session/Cookie memory
    runtime.app.sessionStore.use(this.app);
    // view parser
    runtime.app.viewParser.use(this.app);
    // orm mapping
    // runtime.app.orm.use(this.app)
    // international
    runtime.app.i18n.use(this.app);

    // global header setting , cross domain setting,etc.
    if (
      this.app.EE_EXPRESS_CONFIG.requestHeaders &&
      this.app.EE_EXPRESS_CONFIG.requestHeaders.length > 0
    ) {
      this.app.use((req, res, next) => {
        this.app.EE_EXPRESS_CONFIG.requestHeaders.forEach(header => {
          res.setHeader(header[0], header[1]);
        });
        next();
      });
    }

    // authorize setting
    runtime.app.auth.use(
      this.app,
      eeExpressCache[this._instanceId].authFilters || []
    );

    //first module register
    runtime.app.modules.use(this.app)
    //then router & service register
    runtime.app.routeRegister.use(this.app);
  }
  run() {
    let app = this.app;
    let config = this.config;
    let log = this.logger;
    // 404 error handler
    app.use(function(req, res, next) {
      var err = new Error("Not Found");
      var warning = "404 Not Found,originalUrl:" + req.originalUrl;
      log.warn(warning);
      err.status = 404;
      next();
    });
    // env dev error tip
    if (app.get("env") === "development") {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        log.error(err.message);
        res.end("error:" + err + ",message:" + err.message);
        next();
      });
    } else {
      // env production error tip
      app.use(function(err, req, res, next) {
        res.status(req.status || 500);
        log.error(err);
        res.render("error", {
          message: err.message,
          error: {}
        });
        next();
      });
    }

    // Get port from environment and store in Express.
    var port = normalizePort(config.listenPort || "3000");
    app.set("port", port);

    // Create HTTP server.
    var server = http.createServer(app);

    // Listen on provided port, on all network interfaces.
    server.listen(port);
    server.on("error", error => {
      if (error.syscall !== "listen") {
        throw error;
      }

      var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(bind + " requires elevated privileges");
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(bind + " is already in use");
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
    server.on("listening", () => {
      var addr = server.address();
      var bind =
        typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
      log.debug("Listening on " + bind);
    });
    console.log(process.env.NODE_ENV + " is running , port : " + port);

    // Normalize a port into a number, string, or false.
    function normalizePort(val) {
      var port = parseInt(val, 10);

      if (isNaN(port)) {
        // named pipe
        return val;
      }

      if (port >= 0) {
        // port number
        return port;
      }

      return false;
    }

    process.on("uncaughtException", function(err) {
      console.error("uncaughtException: %s", err.message);
      var worker = require("cluster").worker;
      if (worker) {
        process.send({
          cmd: "suicide",
          crash: err.stack,
          message: err.message
        });
        server.close(function() {
          process.exit(1);
        });
      }
    });
  }
}

EEExpress.utils = runtime.utils;

/* eslint-disable */
function selfInspection(config) {
  config.directory.static.split(",").forEach(directory => {
    runtime.utils.file.mkdirsSync(directory);
  });
  config.directory.view.split(",").forEach(directory => {
    runtime.utils.file.mkdirsSync(directory);
  });
  config.directory.service.split(",").forEach(directory => {
    runtime.utils.file.mkdirsSync(directory);
  });
  config.directory.router.split(",").forEach(directory => {
    runtime.utils.file.mkdirsSync(directory);
  });
  // runtime.utils.file.mkdirsSync(config.runtime.directory.module)
  // runtime.utils.file.mkdirsSync(config.runtime.i18n.directory)
  // runtime.utils.file.mkdirsSync(config.runtime.orm.modelsRoot)
}

module.exports = EEExpress;
