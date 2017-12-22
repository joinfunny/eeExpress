/**
 * @author: jiangfeng
 * @summary: 基础配置文件
 */
module.exports = {
  'app': {
    'remoteHost': 'http://10.200.10.22:28080',
    'disableAuthorize': true,
    'disableOrmMapping': true,
    'disableSession': false,
    'disableLog': false,
    'disableInternational': true,
    'disableGzip': false
  },
  'runtime': {
    'directory': {
      'static': './static',
      'view': './views',
      'service': './services',
      'router': './routers',
      'module': './modules'
    },
    'writeList': {
      routers: [
        '/',
        '/login'
      ],
      services: []
    },
    'listenPort': '6666',
    'requestHeaders': [
      ['Access-Control-Allow-Origin', '*'],
      ['Access-Control-Allow-Headers', 'accept, content-type'],
      ['X-Powered-By', 'eeExpress'],
    ],
    'pages': {
      'loginUrl': '/login',
      'errorUrl': '/404'
    },
    'session': {
      //默认两天过期
      'maxAge': 7200000,
      //支持memory,redis
      'store': 'memory',
      'prefix': 'eeExpress:',
      'secret': 'eeExpress',
      'name': 'eeExpress',
      // 每个请求都重新设置一个 cookie，默认为 false。
      'rolling': true,
      // 即使 session 没有被修改，也保存 session 值，默认为 true。
      'resave': true,
      'saveUninitialized': true
    },
    'log': 'log4js',
    'log4js': {
      'customBaseDir': './logs/',
      'customDefaultAtt': {
        'type': 'dateFile',
        'absolute': false,
        'alwaysIncludePattern': true
      },
      'appenders': [{
          'type': 'console'
        },
        {
          'pattern': 'yyyy-MM-dd/service-name/debug.log',
          'category': 'logDebug'
        },
        {
          'pattern': 'yyyy-MM-dd/service-name/info.log',
          'category': 'logInfo'
        },
        {
          'pattern': 'yyyy-MM-dd/service-name/warn.log',
          'category': 'logWarn'
        },
        {
          'pattern': 'yyyy-MM-dd/service-name/err.log',
          'category': 'logErr'
        }
      ],
      'replaceConsole': true,
      'levels': {
        'logDebug': 'ALL',
        'logInfo': 'ALL',
        'logWarn': 'ALL',
        'logErr': 'ALL'
      }
    },
    'redis': {
      'mode': 'local',
      'local': {
        'port': 6379,
        'host': '127.0.0.1'
      }
    },
    'i18n': {
      'locales': ['en-US', 'zh-CN'],
      'defaultLocale': 'zh-CN',
      'directory': './locales',
      'updateFiles': false,
      'autoReload': true,
      'cookie': 'lang',
      'queryParameter': 'lang',
      'indent': '\t',
      'extension': '.json'
    },
    "email": {
      "service": "qq",
      "port": 465,
      "secureConnection": true,
      "auth": {
        "user": "348380264@qq.com",
        "pass": "dhrrpvicchuobhij"
      }
    },
    'orm': {
      'modelsRoot': './models',
      'connections': {
        "default": {
          "adapter": "mongo",
          "hostname": "localhost",
          "port": 27017,
          "user": "jiangfeng",
          "password": "Aaa12345!!",
          "database": "sails"
        }
      },
      "defaults": {
        "migrate": "safe"
      }
    }
  },
  'message': {
    'http': [
      ['100', true, 'Continue', '客户端应当继续发送请求'],
      ['101', true, 'Switching Protocols', '服务器已经理解了客户端的请求'],
      ['102', true, 'Processing', '处理将被继续执行'],
      ['200', true, 'OK', '请求成功'],
      ['201', true, 'Created', '需要的资源无法及时建立'],
      ['202', true, 'Accepted', '服务器已接受请求，但尚未处理'],
      ['203', true, 'Non-Authoritative Information', '服务器已成功处理了请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝。'],
      ['204', true, 'No Content', '服务器成功处理了请求，但不需要返回任何实体内容，并且希望返回更新了的元信息。'],
      ['205', true, 'Reset Content', '服务器成功处理了请求，且没有返回任何内容。'],
      ['206', true, 'Partial Content', '服务器已经成功处理了部分 GET 请求。'],
      ['207', true, 'Multi-Status', '之后的消息体将是一个XML消息，并且可能依照之前子请求数量的不同，包含一系列独立的响应代码。'],
      ['300', true, 'Multiple Choices', '被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。'],
      ['301', true, 'Moved Permanently', '被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一'],
      ['302', true, 'Move temporarily', '请求的资源临时从不同的 URI响应请求。'],
      ['303', true, 'See Other', '对应当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源。'],
      ['304', true, 'Not Modified', '文档内容没与任何改变'],
      ['305', true, 'Use Proxy', '必须通过指定的代理才能被访问。'],
      ['306', true, 'Switch Proxy', '306状态码已经不再被使用'],
      ['307', true, 'Temporary Redirect', '请求的资源临时从不同的URI 响应请求。'],
      ['400', true, 'Bad Request', '未经授权的访问'],
      ['401', true, 'Unauthorized', '当前请求需要用户验证'],
      ['402', true, 'Payment Required', '该状态码是为了将来可能的需求而预留的。'],
      ['403', true, 'Forbidden', '访问被禁止'],
      ['404', true, 'Not Found', '请求的资源不存在'],
      ['405', true, 'Method Not Allowed', '不被允许的HTTP方法'],
      ['406', true, 'Not Acceptable', '请求的资源的内容特性无法满足请求头中的条件，因而无法生成响应实体'],
      ['407', true, 'Proxy Authentication Required', '必须在代理服务器上进行身份验证'],
      ['408', true, 'Request Timeout', '请求超时'],
      ['409', true, 'Conflict', '被请求的资源的当前状态之间存在冲突，请求无法完成'],
      ['410', true, 'Gone', '被请求的资源在服务器上已经不再可用，而且没有任何已知的转发地址'],
      ['411', true, 'Length Required', '必须指定请求的Content-Length'],
      ['412', true, 'Precondition Failed', '请求不满足先决条件'],
      ['413', true, 'Request Entity Too Large', '状态不合法'],
      ['414', true, 'Request-URI Too Long', '请求的URI 长度超过了服务器能够解释的长度'],
      ['415', true, 'Unsupported Media Type', '媒体类型不被支持'],
      ['416', true, 'Requested Range Not Satisfiable', '资源的可用范围不重合'],
      ['417', true, 'Expectation Failed', 'Expect 的内容无法被满足'],
      ['422', true, 'Unprocessable Entity', '请求语义错误'],
      ['423', true, 'Locked', '当前资源被锁定'],
      ['500', true, 'Internal Server Error', '未知错误'],
      ['501', true, 'Not Implemented', '不支持的请求'],
      ['502', true, 'Bad Gateway', '网关或代理服务器请求错误'],
      ['503', true, 'Service Unavailable', '服务器当前无法处理请求'],
      ['504', true, 'Gateway Timeout', '网关或代理服务器请求超时'],
      ['505', true, 'HTTP Version Not Supported', '服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本'],
      ['600', true, 'Unparseable Response Headers', '没有返回响应头部']
    ],
    'runtime': [
      ['M9000', false, 'FaildAuthorizedUser', '当前用户会话已过期，操作失败！'],
      ['M9001', false, 'InvalidParameter', '缺少必要的参数'],
      ['M9002', false, 'RequiredUsername', '用户名称不可为空'],
      ['M9003', false, 'RequiredPassword', '密码不可为空'],
      ['M9004', false, 'RequiredVcode', '验证码不可为空'],
      ['M9005', false, 'RequiredNickname', '昵称不可为空'],
      ['M9006', false, 'RequiredEmail', '邮箱不可为空'],
      ['M9007', false, 'RequiredMobile', '手机号码不可为空'],
      ['M9008', false, 'FailedOnQueryData', '数据查询失败'],
      ['M9009', false, 'InvalidUsernameOrPassword', '用户名或密码输入错误'],
      ['M9010', false, 'ErrorVcode', '验证码输入错误'],
      ['M9011', false, 'RequiredHttphost', 'http请求地址不可为空'],
      ['M9012', false, 'RequiredRequest', 'http请求地址不可为空'],
      ['M9013', false, 'RequiredResponse', 'http请求地址不可为空'],
      ['M9014', false, 'RequiredHttphostAndErrorRegExp', "urlPath必须为字符串，且不可为空.'"],
      ['M9015', false, 'FaildHttpRequest', '服务请求失败，请联系系统管理员！']
    ],
    'service': [
      ['0', true, 'Success', '成功']
    ],
    'caas': [
      ['E9011', false, 'InvalidParameterException', '缺少必要的参数'],
      ['E9012', false, 'InvalidSignException', '签名校验失败'],
      ['E9021', false, 'LoginFailedException', '用户名或密码错误'],
      ['E9022', false, 'UserNotFoundException', '用户不存在'],
      ['E9031', false, 'AppNotExistedException', '客户端不存在'],
      ['E9032', false, 'InvalidAppException', '客户端不合法'],
      ['E9041', false, 'InvalidAuthCodeException', '认证code不合法'],
      ['E9051', false, 'InvalidAccessTokenException', '授权token不合法'],
      ['E9052', false, 'NotAuthorizedException', '未经授权的访问'],
      ['E9061', false, 'InvalidRefreshTokenException', '刷新token不合法'],
      ['E9000', false, 'CaasExecption', '未知错误']
    ]
  }
}
