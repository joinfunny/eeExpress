require('mocha')
require('should')
let eeExpress = require('../lib/index')
let config = {
  runtime: {
    'disableAuthorize': true,
    'disableOrmMapping': true,
    'disableSession': true,
    'disableLog': true,
    'disableInternational': true,
    'disableGzip': true,
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
      modelsRoot:'./test/app/models',
      'connections': {
        "cluster": {
          "adapter": "mongo",
          "hostname": "127.0.0.1",
          "port": "7000",
          "replSet": {
            "services": [
              {
                "host": "localhost",
                "port": 7000
              },
              {
                "host": "localhost",
                "port": 7001
              },
              {
                "host": "localhost",
                "port": 7002
              }
            ],
            options: {
              "rs_name": "testrs"
            }
          }
        }
      },
    }
  }
}
eeExpress.config(config)

eeExpress.run()
