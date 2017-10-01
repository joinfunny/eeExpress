/**
 * @author jiangfeng
 * @summary Session会话持久化存储--redis
 */
let appConfig = require('./App/AppConfig')
let session = require('express-session')
let cookieParser = require('cookie-parser')
let RedisStore = require('./redisStore')
let log = require('./App/log').helper

const SKEY = {
  '__SESSION_ID__': '__SESSION_ID__',
  '__USER_NAME__': '__USER_NAME__',
  '__CAAS_USER__': '__CAAS_USER__',
  '__RESOURCE__': '__RESOURCE__',
  '__X_AUTH_TOKEN__': '__X_AUTH_TOKEN__',
  '__USER_ID__': '__USER_ID__',
  '__USER_CODE__': '__USER_CODE__',
  '__CAAS_ACCESS_INFO__': '__CAAS_ACCESS_INFO__',
  '__SYS_INFO__': '__SYS_INFO__'
}

function use (app, appConfig) {
  app.use(cookieParser())
  var sessionStore = {
    secret: appConfig.runtime.session.secret,
    name: appConfig.runtime.session.name,
    cookie: {
      maxAge: appConfig.runtime.session.maxAge
    },
    resave: false,
    saveUninitialized: true
  }

  if (appConfig.runtime.session.store === 'redis') {
    sessionStore.store = RedisStore.getInstance()
    log.info('初始化当前应用Session的存储模式为Redis')
  }
  app.use(session(sessionStore))
}

function getSessionAsync (sessionId) {
  let client = RedisStore.getInstance().client

  return new Promise((resolve, reject) => {
    client.get(appConfig.runtime.session.prefix + sessionId, function (err, result) {
      if (!err) {
        try {
          result = JSON.parse(result)
        } catch (err) {
          result = null
        }
        resolve(result)
      } else {
        reject(err, result)
      }
    })
  })
}

function getSessionAccessInfoAsync (sessionId) {
  return getSessionAsync(sessionId)
    .then(session => {
      if (session) {
        return session[SKEY.__CAAS_ACCESS_INFO__]
      } else {
        return null
      }
    })
}

function setUserName (req, value) {
  req.session[SKEY.__USER_NAME__] = value
  log.info(req.session)
}

function getUserName (req) {
  log.info('当前Session记录：')
  log.info(req.session)
  return req.session[SKEY.__USER_NAME__]
}

function setUserInfo (req, info) {
  req.session[SKEY.__CAAS_USER__] = info
}

function getUserInfo (req) {
  return req.session[SKEY.__CAAS_USER__]
}

function setUserResource (req, resources) {
  req.session[SKEY.__RESOURCE__] = resources
}

function getUserResource (req) {
  return req.session[SKEY.__RESOURCE__] || []
}

function setSysInfoAsync (sysInfo) {
  let client = RedisStore.getInstance().client

  return new Promise((resolve, reject) => {
    client.set(appConfig.runtime.session.prefix + SKEY.__SYS_INFO__, JSON.stringify(sysInfo), function (err, result) {
      if (!err) {
        try {
          result = JSON.parse(result)
        } catch (err) {
          result = null
        }
        resolve(result)
      } else {
        reject(err, result)
      }
    })
  })
}

function getSysInfoAsync () {
  let client = RedisStore.getInstance().client

  return new Promise((resolve, reject) => {
    client.get(appConfig.runtime.session.prefix + SKEY.__SYS_INFO__, function (err, result) {
      if (!err) {
        try {
          result = JSON.parse(result)
        } catch (err) {
          result = null
        }
        resolve(result)
      } else {
        reject(err, result)
      }
    })
  })
}

/**
 * 资源检查
 * @param req
 * @param resource
 * @returns {boolean} true 有资源 false 无资源
 */
function checkUserResource (req, resource) {
  var res = req.session[SKEY.__RESOURCE__]
  if (res && res.length && res.indexOf(resource) > -1) {
    return true
  } else {
    return false
  }
}

function setXAuthToken (req, xAuthToken) {
  req.session[SKEY.__X_AUTH_TOKEN__] = xAuthToken
}

function getXAuthToken (req) {
  return req.session[SKEY.__X_AUTH_TOKEN__]
}

function setUserId (req, id) {
  req.session[SKEY.__USER_ID__] = id
}

function getUserId (req) {
  return req.session ? req.session[SKEY.__USER_ID__] : null
}

function setSessionId (req, sessionId) {
  req.session[SKEY.__SESSION_ID__] = sessionId
}

function getSessionId (req, sessionId) {
  return req.session ? req.session[SKEY.__SESSION_ID__] : null
}

function setUserCode (req, code) {
  req.session[SKEY.__USER_CODE__] = code
}

function getUserCode (req) {
  return req.session ? req.session[SKEY.__USER_CODE__] : null
}

function setAccessInfo (req, info) {
  req.session[SKEY.__CAAS_ACCESS_INFO__] = {
    accessToken: info.accessToken,
    expiresIn: info.expiresIn,
    refreshToken: info.refreshToken
  }
}

function getAccessInfo (req) {
  return req.session[SKEY.__CAAS_ACCESS_INFO__]
}

function clearSession (req) {
  req.session.__SESSION_ID__ = null
  req.session.__CAAS_USER__ = null
  req.session.__USER_ID__ = null
  req.session.__USER_CODE__ = null
  req.session.__USER_NAME__ = null
  req.session.__X_AUTH_TOKEN__ = null
  req.session.__RESOURCE__ = null
  req.session.__CAAS_ACCESS_INFO__ = null
}

module.exports = {
  use: use,
  SKEY: SKEY,
  setUserId: setUserId,
  getUserId: getUserId,
  setAccessInfo: setAccessInfo,
  getAccessInfo: getAccessInfo,
  setUserName: setUserName,
  getUserName: getUserName,
  setUserInfo: setUserInfo,
  getUserInfo: getUserInfo,
  getUserResource: getUserResource,
  setUserResource: setUserResource,
  checkUserResource: checkUserResource,
  setXAuthToken: setXAuthToken,
  getXAuthToken: getXAuthToken,
  clearSession: clearSession,
  setUserCode: setUserCode,
  getUserCode: getUserCode,
  getSessionId: getSessionId,
  setSessionId: setSessionId,
  getSessionAsync: getSessionAsync,
  getSessionAccessInfoAsync: getSessionAccessInfoAsync,
  setSysInfoAsync: setSysInfoAsync,
  getSysInfoAsync: getSysInfoAsync
}
