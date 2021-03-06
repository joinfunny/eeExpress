
## ee-express:

**1. EEExpress.utils**
  - `httpClient` 发起Http请求。
    - `httpClient.get(options|Object)` GET请求,options属性有：host,url,query
    - `httpClient.post(options|Object)` POST请求,options属性有：host,url,body
    ```
    #示例：
    httpClient.get({
      host:'http://10.200.10.22:28080',
      url: '/user/list',
      query: {
        name: 'admin'
      }
    }).then(res => {
      console.log(res)
    })

    httpClient.post({
      host:'http://10.200.10.22:28080',
      url: '/login',
      body: {
        name: 'admin',
        pwd: '12345'
      }
    }).then(res => {
      console.log(res)
    })
    ```
  - `file`
    - `Array getFiles(path|String)` 获取指定路径下的所有文件，最终会返回一个文件清单Array
    - `void mkdirsSync(dirpath|String)` 创建一个不存在的文件夹，如果父文件夹不存在会自动创建
    - `void requireDirectory(directory|String, target|Object)`将某个文件夹下的所有文件输出包装到target对象下
    - `Object moduleDirectory(fullDirectory|String)` 将某个文件夹下的所有文件输出包装为一个模块，并返回。属性名自动转换为驼峰格式。
    - `PromiseObject zipFolderAsync(srcFolder|String, zipDirectory|String,  fileName|String)` 异步打包某一个文件夹到另外一个文件夹
    - `void copy(source|String, target|String)` 拷贝文件或者文件夹
    - `void rm(rmPath|String, delRoot|Boolean)` 递归删除指定的文件夹，并可以指定是否删除最顶端的文件夹
  - codes
  - email
  - tools
  - validator

**2. 创建EEExpress实例**
```
let instance = new EEExpress(config|Object, rootPath|String)
```

`config`
> 如果instance启动的时候不指定配置，则使用`./configs`文件夹下对应环境变量的配置文件。如果没有指定环境变量，则默认使用的是`./configs/index.js`文件的配置

`rootPath`
> 当前instance启动时可以指定其进程执行根目录，如果不指定，则默认会以当前process.cwd()作为其rootPath。在配置文件内的所有路径相关的设置都会以当前的rootPath作为基础路径。
`instance.init()`
> instance的初始化，app会根据当前加载的配置项进行初始化。

`instance.setConfig(config)`
> instance在启动之前可以通过`setConfig`方法指定其执行环境。不过此方法必须在init执行之前执行。否则设置无法生效。

`instance.authRegister([Array|Function])`
> instance可以通过此方法来注册自己的用户授权规则。其内置支持白名单功能，可在配置文件中设置`writeList`配置项。**==此处需要注意==**，*配置文件中的`disableAuthorize`的优先级最高，如果其配置项设置为`true`,则整个授权体系即被禁用。*

`app.config`
> app运行时生效的配置项。

#### 关于配置文件中的路径
如果设置的路径为空字符串，则系统不会加载对应的模块。比如：
`view: ''`,则instance不会设置view

默认配置：

```
/**
 * @author: jiangfeng
 * @summary: basic config
 */
module.exports = {
  appName: 'eeExpress',
  proxyHost: 'http://10.200.10.22:28080',
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
  },
  email: {
    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: {
      user: '348380264@qq.com',
      pass: 'dhrrpvicchuobhij'
    }
  },
  orm: {
    modelsRoot: './models',
    connections: {
      default: {
        adapter: 'mongo',
        hostname: 'localhost',
        port: 27017,
        user: 'jiangfeng',
        password: 'Aaa12345!!',
        database: 'sails'
      }
    },
    defaults: {
      migrate: 'safe'
    }
  }
}
```



