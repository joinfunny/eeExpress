/**
 * @author: jiangfeng
 * @summary: env development config
 */
module.exports = {
  appName: 'sub-app-1',
  remoteHost: 'http://10.200.10.22:28081',
  disableAuthorize: true,
  disableOrmMapping: true,
  disableSession: false,
  disableLog: false,
  disableInternational: true,
  disableGzip: false,
  directory: {
    static: './static',
    view: './views',
    service: './services',
    router: './routers',
    module: './modules'
  },
  listenPort: '18081'
}
