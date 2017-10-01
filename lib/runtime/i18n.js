/**
 * @author jiangfeng
 * @summary I18N语言国际化方案封装，默认为zh-CN
 */
var i18n = require('i18n')
/**
 * 自定义setLocale中间件
 * 登录用户账户的设置
 * 用户cookie中存储的locale信息
 * 用户浏览器的默认语言
 * 网站的默认语言
 */
/* eslint-disable */
function setLocale (req, res, next) {
  var locale
  // 当req进入i18n中间件的时候，已经通过sessionId信息获取了用户数据
  // 获取用户数据中的locale数据
  if (req.user) {
    locale = req.user.locale
  }
  // 获取cookie中的locale数据
  else if (req.signedCookies['locale']) {
    locale = req.signedCookies['locale']
  }
  // 获取浏览器第一个偏好语言，这个函数是express提供的
  else if (req.acceptsLanguages()) {
    locale = req.acceptsLanguages()
  }
  // 没有语言偏好的时候网站使用的语言为中文
  else {
    locale = 'zh-CN'
  }
  // 如果cookie中保存的语言偏好与此处使用的语言偏好不同，更新cookie中的语言偏好设置
  if (req.signedCookies['locale'] !== locale) {
    res.cookie('locale', locale, {
      signed: true,
      httpOnly: true
    })
  }
  // 设置i18n对这个请求所使用的语言
  req.setLocale(locale)
  next()
}

/**
 * 插件默认使用的语言映射规则：
 * 1.URL中设置的语言，需要配置文件中配置queryParameter属性
 * 2.Cookie中存储的语言，需要配置文件中配置cookie属性
 * 3.header内的accept-language，解析accept-language中的语言设置为数组，取第一个语言设置。
 */
exports.use = function (app, appConfig) {
  i18n.configure(appConfig.runtime.i18n)
  app.use(i18n.init)
}
