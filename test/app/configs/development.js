/**
 * @author: jiangfeng
 * @summary: env development config
 */
module.exports = {
  appName: 'testApp',
  proxyHost: 'http://10.205.16.129:28082',
  disableAuthorize: true,
  disableOrmMapping: true,
  disableSession: false,
  disableLog: false,
  disableInternational: true,
  disableGzip: false,
  directory: {
    static: './statics',
    view: './views',
    service: './services',
    router: './routers',
    module: './modules'
  },
  listenPort: '18080'
}
