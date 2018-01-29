var Waterline = require('waterline')
var mongoAdapter = require('sails-mongo')
var path = require('path')
var deasync = require('deasync')
var file = require('../utils/file')
var orm = new Waterline()
var ormMappings = {
  use: (app) => {
    if (app.EE_EXPRESS_CONFIG.disableOrmMapping) {
      app.logger.warn('app has disabled the orm mapping module.')
      return
    }
    var isReturn = false
    app.logger.info('loading orm mapping.\n')
    // 遍历查找models文件夹下的所有model，加载为waterline的collection
    let models = file.moduleDirectory(path.join(app.rootPath, app.EE_EXPRESS_CONFIG.orm.modelsRoot))
    Object.keys(models).forEach(key => {
      orm.loadCollection(Waterline.Collection.extend(models[key]))
    })
    let ormConfig = Object.assign({}, app.EE_EXPRESS_CONFIG.orm, {
      adapters: {
        'default': mongoAdapter,
        'mongo': mongoAdapter
      }
    })
    orm.initialize(ormConfig, function(err, models) {
      if (!err) {
        ormMappings.models = models.collections
        app.logger.info('orm loaded success.')
        app.models = models
      } else {
        app.logger.error('orm loaded faild.\n')
        app.logger.error(err)
      }
      isReturn = true
    })
    /* eslint-disable no-unmodified-loop-condition */
    while (!isReturn) {
      deasync.runLoopOnce()
    }
  },
  models: {}
}

module.exports = ormMappings
