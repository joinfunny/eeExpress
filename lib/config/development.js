/**
 * @author: jiangfeng
 * @summary: 开发环境的配置文件
 */
module.exports = {
  'app': {
    'remoteHost': 'http://10.200.10.22:28082'
  },
  'runtime': {
	'disableAuthorize': true,
    'listenPort': '9092',
    'session': {
      'maxAge': 7200000,
      'store': 'memory',
      'prefix': 'apm:',
      'secret': 'apm',
      'name': 'apm'
    },
    'log4js': {
      'customBaseDir': './logs/',
      'customDefaultAtt': {
        'type': 'dateFile',
        'absolute': false,
        'alwaysIncludePattern': true
      }
    },
    'redis': {
      'mode': 'cluster',
      'local': {
        'port': 6379,
        'host': '127.0.0.1'
      },
      'cluster': [{
        'port': 7000,
        'host': '10.200.10.36'
      }, {
        'port': 7001,
        'host': '10.200.10.36'
      }, {
        'port': 7000,
        'host': '10.200.10.37'
      }]
    }
  }
}
