/**
 * @author: jiangfeng
 * @summary: basic config
 */
module.exports = {
  appName: 'eeExpress',
  proxyHost: 'http://localhost:18080',
  proxyApiPrefix: 'api',
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
  writeList: {
    routers: ['/', '/login'],
    services: []
  },
  listenPort: '6666',
  requestHeaders: [
    ['Access-Control-Allow-Origin', '*'],
    ['Access-Control-Allow-Headers', 'accept, content-type'],
    ['X-Powered-By', 'eeExpress']
  ],
  pages: {
    loginUrl: '/login',
    errorUrl: '/404'
  },
  session: {
    // 默认两天过期
    maxAge: 7200000,
    // 支持memory,redis
    authField: 'userID',
    store: 'memory',
    prefix: 'eeExpress:',
    secret: 'eeExpress',
    name: 'eeExpress',
    // 每个请求都重新设置一个 cookie，默认为 false。
    rolling: true,
    // 即使 session 没有被修改，也保存 session 值，默认为 true。
    resave: true,
    saveUninitialized: true
  },
  log: 'log4js',
  log4js: {
    customBaseDir: './logs/',
    customDefaultAtt: {
      type: 'dateFile',
      absolute: false,
      alwaysIncludePattern: true
    },
    appenders: [
      {
        type: 'console'
      },
      {
        pattern: 'yyyy-MM-dd/service-name/debug.log',
        category: 'logDebug'
      },
      {
        pattern: 'yyyy-MM-dd/service-name/info.log',
        category: 'logInfo'
      },
      {
        pattern: 'yyyy-MM-dd/service-name/warn.log',
        category: 'logWarn'
      },
      {
        pattern: 'yyyy-MM-dd/service-name/err.log',
        category: 'logErr'
      }
    ],
    replaceConsole: true,
    levels: {
      logDebug: 'ALL',
      logInfo: 'ALL',
      logWarn: 'ALL',
      logErr: 'ALL'
    }
  },
  redis: {
    mode: 'local', // cluster
    prefix: 'eeExpress:',
    local: {
      port: 6379,
      host: '127.0.0.1'
    }
  },
  i18n: {
    locales: ['en-US', 'zh-CN'],
    defaultLocale: 'zh-CN',
    directory: './locales',
    updateFiles: false,
    autoReload: true,
    cookie: 'lang',
    queryParameter: 'lang',
    indent: '\t',
    extension: '.json'
  }
}
