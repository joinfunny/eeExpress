require('mocha')
require('should')
let eeExpress = require('../lib/index')
let config = {
  runtime: {
    disableOrmMapping: false,
    'directory': {
      'static': './test/app/statics',
      'view': './test/app/views',
      'service': './test/app/services',
      'router': './test/app/routers',
      'module': './test/app/modules'
    },
    'listenPort': '9092',
    'i18n':{
      'directory': './test/app/locales'
    },
    orm:{
      modelsRoot:'./test/app/models'
    }
  }
}
eeExpress.config(config)

eeExpress.run()
