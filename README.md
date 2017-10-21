# eeExpress
通过对Node插件的引用、封装，创建一个简单的、企业级的Express项目框架

### 框架特性：
- 使用配置文件对整个应用进行配置
- 内置日志记录方案
- Session持久化支持内存／redis（单点或集群）
- 服务支持自定义透传格式，可定义透传服务路由规则
- 通过制定路由生命周期，对路由及服务的各个阶段的数据进行自定义
- 采用mockJS插件提供对对服务数据的Mock
- 内建国际化多语言实现，只需要定义语言包即可
- 视图使用EJS模版引擎构建

eeExpress API
  - runtime _运行时Core_
      - App _应用类库_
          - Utils _常用工具包_

      - Authorization 提供默认的授权机制
      - RedisStore
          - `getInstance` _获取当前设置的RedisClient实例，当前支持两种模式：cluster和local。可以在配置文件的redis配置节中灵活调整_
          ```
          // Redis相关配置：
          'redis': {
            'mode': 'local', // Redis支持两种模式，local／cluster
            'local': { 'port': 6379, 'host': '127.0.0.1' },
            'cluster':[
              { 'port': 7000, 'host': '10.200.10.22' },
              { 'port': 7001, 'host': '10.200.10.22' },
              { 'port': 7000, 'host': '10.200.10.23' },
              { 'port': 7001, 'host': '10.200.10.23' }
            ]
          }

          ```
      - ServiceHandler _注册服务，eeExpress会自动对应配置节`runtime.directory.service`下的文件夹，将此文件夹下的所有文件注册为服务（具有特定规则的路由）_
          - `register(service)` _服务注册方法_
          - `router` _Express原生的`router`_
      - Router
          - ~~_use 暂不开放_~~
      - SessionStore
          - `use(app, appConfig)` _内部使用_
          - `SKEY` _当前内部使用的Session存储的Key_
          - `setUserId(req,userId)`:_设置用户ID_
          - `getUserId(req)`:_获取用户ID_
          - `setAccessInfo(requserId)`:_设置权限信息_
          - `getAccessInfo(req)`:_获取权限信息_
          - `setUserName(req,userName)`:_设置用户名称_
          - `getUserName(req)`:_获取用户名称_
          - `setUserInfo(req,userInfo)`:_设置用户信息_
          - `getUserInfo(req)`:_获取用户信息_
          - `getUserResource(req)`:_获取用户资源信息_
          - `setUserResource(req,userResources)`:_设置用户资源_
          - `checkUserResource(req,resource)`:_检查用户资源_
          - `setXAuthToken(req,token)`:_设置oAuth2用户授权Token_
          - `getXAuthToken(req)`:_获取oAuth2用户授权Token_
          - `clearSession(req)`:_清除Session_
          - `setUserCode(req,code)`:_设置用户CODE_
          - `getUserCode(req)`:_获取用户CODE_
          - `getSessionId(req)`:_获取当前会话ID_
          - `setSessionId(req,sid)`:_设置当前会话ID_
          - `getSessionAsync(req)`:_异步获取Session信息，如果存储使用Redis，可使用此方法获取当前会话Session信息_
          - `getSessionAccessInfoAsync(req)`:_异步获取SessionAccessInfo，同上_
          - `setSysInfoAsync(req,sysInfo)`:_异步设置系统信息_
          - `getSysInfoAsync(req)`:_异步获取系统信息_
      - ViewParser _此模块主要用来视图页面展示相关，目前自动启用gzip压缩，视图模版引擎默认使用ejs，并自动解析view文件夹下边的`.html`文件，并自动查找静态资源包下是否存在`favicon.ico`，如果存在则自动装载为应用的图标_
      - Internationalization
      - Mock
  - modules
  - models _`orm mapping data model`，自动加载runtime.orm.modelsRoot下的所有文件，映射为对应mongo数据库的数据表。_
  - appConfig
  - logger
