/**
 * @author: jiangfeng
 * @summary 用户登录授权过滤器
 */

let AppConfig = require('./App/AppConfig')
let SessionStore = require('./sessionStore')
let Utils = require('./App/Utils')
let log = require('./App/log').helper

/**
 * 如果Session验证失败，跳回Login页面
 * 如果Session验证成功，继续执行
 */
function Authorization (req, res, next) {
  var outAuthRoutes = AppConfig.app.outAuthRoutes
  var outAuthServices = AppConfig.app.outAuthServices

  if (outAuthRoutes.indexOf(req.path.toLowerCase()) >= 0) {
    next()
    return
  }

  if (SessionStore.getUserId(req)) {
    log.info(SessionStore.getUserName(req) + ' has login.\r\n')
    next()
  } else {
    // 服务授权验证
    if (/^\/api\//.test(req.path)) {
      if (outAuthServices.indexOf(req.path.toLowerCase()) >= 0) {
        next()
        return
      }
      res.status(200).json({
        success: false,
        code: Utils.RuntimeCodes.FaildAuthorizedUser.code,
        msg: Utils.RuntimeCodes.FaildAuthorizedUser.msg
      })
      res.end()
    } else {
      // 路由授权验证
      log.warn('un-login,redirect to login\r\n')
      res.redirect(AppConfig.pages.loginUrl)
    }
  }
}

exports.use = function (app, arr) {
  if (process.env.NODE_ENV === 'development') return
  app.all('*', Authorization)
  if (arr && Array.isArray(arr)) {
    arr.forEach(item => {
      app.all('*', item)
    })
  }
}
