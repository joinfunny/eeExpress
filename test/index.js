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
      modelsRoot:'./test/app/models',
      'connections': {
        default: "cluster",
        "cluster": {
          "adapter": "mongo",
          "replSet": {
            "services": [
              {
                "host": "192.168.2.155",
                "port": 7000
              },
              {
                "host": "192.168.2.155",
                "port": 7001
              },
              {
                "host": "192.168.2.155",
                "port": 7002
              }
            ],
            options: {
              rs_name: "testrs"
            }
          }
        }
      },
    }
  }
}
eeExpress.config(config)

eeExpress.run()

function check() {
  var complaint = {
    'docmentsNo': '2135535',
    'agentOrderNo': '5200012741201709290991109507',
    'feedback': '充错号码',
    'phoneNo': '15975807466',
    'coustomerRequest': '退款',
    'complaintSources': '客服',
    'timeLength': '0小时',
    'times': '1',
    'satisfaction': '0星',
    'record': '用户投诉; 客服工号3161624341认领了工单;',
    'orderTime': '2017-09-30 00:01:03',
    'type': 1
  }

  eeExpress.runtime.OrmMapping.models.complaints.create(complaint)
    .then(function () {
      return eeExpress.runtime.OrmMapping.models.complaints.destroy({
        'docmentsNo': '2135535'
      }).then(function (items) {
        if (items.length === 1) {
          eeExpress.logger.info('测试Mongodb操作成功')
        } else {
          eeExpress.logger.info('测试Mongodb操作失败')
        }
      })
    })
}

check()
