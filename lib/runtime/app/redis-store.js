/**
 * @author jiangfeng
 * @summary Redis store config,support two mode：local,cluster,will add the third mode: sensitive
 */
let session = require('express-session')
let RedisStore = require('connect-redis')(session)
let ioRedis = require('ioredis')
module.exports.getInstance = function(app) {
  const redisConfig = app.EE_EXPRESS_CONFIG.redis
  const redisMode = redisConfig.mode
  if (app.EE_EXPRESS_STORE) {
    app.logger.info('init store mode of current app to `' + redisMode + '`')
    if (redisMode === 'cluster') {
      app.EE_EXPRESS_STORE = new RedisStore({
        logErrors: true,
        prefix: redisConfig.prefix,
        unset: 'destroy',
        client: new ioRedis.Cluster(redisConfig.cluster)
      })
    } else if (redisMode === 'local') {
      app.EE_EXPRESS_STORE = new RedisStore({
        host: redisConfig.local.host,
        port: redisConfig.local.port,
        pass: redisConfig.local.pass,
        logErrors: true,
        prefix: redisConfig.prefix,
        unset: 'destroy'
      })
    }
  }
  return app.EE_EXPRESS_STORE
}
