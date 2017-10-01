/**
 * @author: jiangfeng
 * @summary: 自定义的请求授权处理器中间件
 */
let Modules = require('../modules')
let Runtime = require('../runtime')
let Utils = Runtime.App.Utils
let SessionStore = Runtime.SessionStore
var outAuthServices = Runtime.App.AppConfig.app.outAuthServices

function checkSessionAsync (req, res) {
  let sessionId = SessionStore.getSessionId(req)
  let token = SessionStore.getAccessInfo(req).accessToken

  if (!(sessionId && token)) {
    return new Promise((resolve) => {
      // 验证Token是否有效
      resolve(false)
    })
  }

  return Modules.sso.checkSessionAsync(sessionId, token)
    .then(result => {
      if (result && result.success) {
        return true
      } else {
        SessionStore.clearSession(req)
        return false
      }
    })
}
module.exports = {
  apiAuth: function (req, res, next) {
    if (process.env.NODE_ENV === 'development') {
      next()
      return
    }
    // 服务授权验证
    if (/^\/api\//.test(req.path)) {
      if (outAuthServices.indexOf(req.path.toLowerCase()) >= 0) {
        next()
        return
      }
      checkSessionAsync(req, res).then(result => {
        if (result) { next() } else {
          res.status(200).json({
            success: false,
            code: Utils.RuntimeCodes.FaildAuthorizedUser.code,
            msg: Utils.RuntimeCodes.FaildAuthorizedUser.msg
          })
          res.end()
        }
      })
    } else {
      next()
    }
  }
}
