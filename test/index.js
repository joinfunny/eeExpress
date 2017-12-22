require('mocha')
require('should')
let eeExpress = require('../lib/index')
let config = {
  app: {
    'disableAuthorize': true,
    'disableOrmMapping': true,
    'disableSession': false,
    'disableLog': true,
    'disableInternational': true,
    'disableGzip': true
  },
  runtime: {
    'directory': {
      'static': './test/app/statics',
      'view': './test/app/views',
      'service': './test/app/services',
      'router': './test/app/routers',
      'module': './test/app/modules'
    },
    'listenPort': '19098',
    'i18n': {
      'directory': './test/app/locales'
    },
    redis: {
      mode: 'local'
    },
    session: {
      'maxAge': 5000,
      'store': 'redis',
      'rolling': true,
      'resave': false,
      'saveUninitialized': true
    },
    orm: {
      modelsRoot: './test/app/models',
      'connections': {
        "cluster": {
          "adapter": "mongo",
          "hostname": "127.0.0.1",
          "port": "7000",
          "replSet": {
            "services": [{
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
