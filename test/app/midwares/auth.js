/**
 * @author: jiangfeng
 * @summary: 自定义的请求授权处理器中间件
 */

let Utils = require('../../../index').utils

function checkSessionAsync(req, res) {
  let sessionID = req.sessionID
  let userID = req.session.userID

  if (!(sessionID && userID)) {
    return new Promise((resolve) => {
      // 验证Token是否有效
      resolve(false)
    })
  } else {
    return new Promise((resolve) => {
      // 验证Token是否有效
      resolve(true)
    })
  }
}
module.exports = {
  apiAuth: (app) => {
    var outAuthServices = app.EE_EXPRESS_CONFIG.writeList.services
    return function(req, res, next) {
      let apiRegExp = new RegExp('^\\/' + app.EE_EXPRESS_CONFIG.proxyApiPrefix + '\\/')
      if (process.env.NODE_ENV === 'development') {
        next()
        return
      }
      // 服务授权验证
      if (apiRegExp.test(req.path)) {
        if (outAuthServices.indexOf(req.path.toLowerCase()) >= 0) {
          next()
          return
        }
        checkSessionAsync(req, res).then(result => {
          if (result) { next() } else {
            res.status(200).json({
              success: false,
              code: Utils.codes.RuntimeCodes.FaildAuthorizedUser.code,
              msg: Utils.codes.RuntimeCodes.FaildAuthorizedUser.msg
            })
            res.end()
          }
        })
      } else {
        next()
      }
    }
  }
}
