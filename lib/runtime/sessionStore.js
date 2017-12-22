/**
 * @author jiangfeng
 * @summary Session会话持久化存储--redis
 */
let session = require('express-session')
let cookieParser = require('cookie-parser')
let RedisStore = require('./redisStore')

exports.use = function(app) {
  app.use(cookieParser())
  if (app.EE_EXPRESS_CONFIG.app.disableSession) {
    console.warn('app has disabled the session module.')
    return
  }
  var sessionStore = {
    secret: app.EE_EXPRESS_CONFIG.runtime.session.secret,
    name: app.EE_EXPRESS_CONFIG.runtime.session.name,
    cookie: {
      maxAge: app.EE_EXPRESS_CONFIG.runtime.session.maxAge
    },
    rolling: app.EE_EXPRESS_CONFIG.runtime.session.rolling,
    resave: app.EE_EXPRESS_CONFIG.runtime.session.resave,
    saveUninitialized: app.EE_EXPRESS_CONFIG.runtime.session.saveUninitialized
  }

  if (app.EE_EXPRESS_CONFIG.runtime.session.store === 'redis') {
    sessionStore.store = RedisStore.getInstance(app)
    app.logger.info('app initial `redis` mode to store the session message.')
  }
  app.use(session(sessionStore))
}
