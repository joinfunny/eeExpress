var Waterline = require('waterline')
var mongoAdapter = require('sails-mongo')
var path = require('path')
var utils = require('./App/Utils')
var orm = new Waterline()
var ormMappings = {
  useAsync: (config, cb) => {
    // 遍历查找models文件夹下的所有model，加载为waterline的collection
    let models = utils.file.moduleDirectory(path.join(path.resolve(), config.modelsRoot))
    Object.keys(models).forEach(key => {
      orm.loadCollection(Waterline.Collection.extend(models[key]))
    })
    let ormConfig = Object.assign({}, config, {
      adapters: {
        'default': mongoAdapter,
        'mongo': mongoAdapter
      }
    })
    orm.initialize(ormConfig, function(err, models) {
      if (!err) {
        ormMappings.models = models.collections
      }
      cb && cb(err, models)
    })
  },
  models: {}
}

module.exports = ormMappings
