/**
 * @author jiangfeng
 * @summary Redis存储服务配置,支持两种模式：local,cluster
 */
let session = require(('express-session'))
let RedisStore = require('connect-redis')(session)
let ioRedis = require('ioredis')
module.exports.getInstance = function(app) {
  const redisMode = app.EE_EXPRESS_CONFIG.runtime.redis.mode
  const redisConfig = app.EE_EXPRESS_CONFIG.runtime.redis
  if (app.EE_EXPRESS_STORE) {
    app.logger.info('初始化当前应用Redis模式为' + redisMode)
    if (redisMode === 'cluster') {
      app.EE_EXPRESS_STORE = new RedisStore({
        logErrors: true,
        prefix: app.EE_EXPRESS_CONFIG.runtime.session.prefix,
        unset: 'destroy',
        client: new ioRedis.Cluster(redisConfig.cluster)
      })
    } else if (redisMode === 'local') {
      app.EE_EXPRESS_STORE = new RedisStore({
        host: redisConfig.local.host,
        port: redisConfig.local.port,
        pass: redisConfig.local.pass,
        logErrors: true,
        prefix: app.EE_EXPRESS_CONFIG.runtime.session.prefix,
        unset: 'destroy'
      })
    }
  }
  return app.EE_EXPRESS_STORE
}
