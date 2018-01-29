/**
 * @author: jiangfeng
 * @summary 用户登录授权过滤器
 */
let SessionStore = require('./session-store')
let codes = require('../utils/codes')

/**
 * 如果Session验证失败，跳回Login页面
 * 如果Session验证成功，继续执行
 */
function Authorization(app) {
  return (req, res, next) => {
    var outAuthRoutes = app.EE_EXPRESS_CONFIG.outAuthRoutes
    var outAuthServices = app.EE_EXPRESS_CONFIG.outAuthServices

    if (outAuthRoutes.indexOf(req.path.toLowerCase()) >= 0) {
      next()
      return
    }

    if (SessionStore.getUserId(req)) {
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
          code: codes.RuntimeCodes.FaildAuthorizedUser.code,
          msg: codes.RuntimeCodes.FaildAuthorizedUser.msg
        })
        res.end()
      } else {
        // 路由授权验证
        res.redirect(app.config.pages.loginUrl)
      }
    }
  }
}

exports.use = function(app, arr) {
  if (app.EE_EXPRESS_CONFIG.disableAuth) {
    console.warn('app has disabled the auth module.')
    return
  }
  app.all('*', Authorization(app))
  if (arr && Array.isArray(arr)) {
    arr.forEach(item => {
      app.all('*', item(app))
    })
  }
}
