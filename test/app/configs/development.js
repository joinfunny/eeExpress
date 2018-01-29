/**
 * @author: jiangfeng
 * @summary: env development config
 */
module.exports = {
  remoteHost: 'http://10.200.10.22:28080',
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
  listenPort: '6666'
}
