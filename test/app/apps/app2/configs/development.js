/**
 * @author: jiangfeng
 * @summary: env development config
 */
module.exports = {
  appName: 'sub-app-2',
  remoteHost: 'http://10.200.10.22:28082',
  disableAuthorize: true,
  disableOrmMapping: true,
  disableSession: false,
  disableLog: false,
  disableInternational: true,
  disableGzip: false,
  directory: {
    subApps: './apps',
    static: './statics',
    view: './views',
    service: './services',
    router: './routers',
    module: './modules'
  },
  listenPort: '18082'
}
