/**
 * @author: jiangfeng
 * @summary: env development config
 */
module.exports = {
  appName: 'testApp',
  remoteHost: 'http://10.200.10.22:28080',
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
