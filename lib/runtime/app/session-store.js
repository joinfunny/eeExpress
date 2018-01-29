/**
 * @author jiangfeng
 * @summary Session cache--redis, the default is memory cache
 */
let session = require('express-session')
let cookieParser = require('cookie-parser')
let RedisStore = require('./redis-store')

exports.use = function(app) {
  app.use(cookieParser())
  if (app.EE_EXPRESS_CONFIG.disableSession) {
    console.warn('app has disabled the session module.')
    return
  }
  var sessionStore = {
    secret: app.EE_EXPRESS_CONFIG.session.secret,
    name: app.EE_EXPRESS_CONFIG.session.name,
    cookie: {
      maxAge: app.EE_EXPRESS_CONFIG.session.maxAge
    },
    rolling: app.EE_EXPRESS_CONFIG.session.rolling,
    resave: app.EE_EXPRESS_CONFIG.session.resave,
    saveUninitialized: app.EE_EXPRESS_CONFIG.session.saveUninitialized
  }

  if (app.EE_EXPRESS_CONFIG.session.store === 'redis') {
    sessionStore.store = RedisStore.getInstance(app)
    app.logger.info('app initial `redis` mode to store the session message.')
  }
  app.use(session(sessionStore))
}
