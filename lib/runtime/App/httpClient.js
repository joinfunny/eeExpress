/**
 * @author: jiangfeng
 * @summary: HttpClient
 * GET:
 * httclient.get({url:'/user/list',query:{a:1}}).then(function(result){})
 * POST:
 * httpclient.post({url:'/user/new',body:{username:'jiangfeng'}}).then(function(result){})
 */
var request = require('request-promise')
var Utils = require('./Utils')
var AppConfig = require('./AppConfig')
var log = require('./log').helper

/**
 * 包装配置项
 * GET：拼装URL，添加rdm随机数，防止请求缓存
 * POST：拼装请求体body
 * @param {any} options
 * @returns 返回合并后的配置
 */
function mergeOptions (options) {
  let queryParams = []
  let mergedOptions = {}
  // wrap query string
  if (options.query) {
    Object.keys(options.query).forEach(key => {
      queryParams.push(key + '=' + options.query[key])
    })
    if (!options.query.rdm) {
      queryParams.push('rdm=' + new Date() * 1)
    }
  }
  // wrap post body
  if (options.body) {
    mergedOptions.json = true
    mergedOptions.body = options.body
  }

  // wrap headers
  if (options.headers) {
    mergedOptions.headers = options.headers
  }

  // init host
  mergedOptions.host = options.host || AppConfig.app.remoteHost

  // merge url
  mergedOptions.url = mergedOptions.host + options.url + (queryParams.length > 0 ? ('?' + queryParams.join('&')) : '')

  return Object.assign({}, options, mergedOptions)
}

function onSuccess (body) {
  log.info('//===============[HttpClient] 服务请求返回结果 Begin==============//')
  log.info(body)
  log.info('//===============[HttpClient] 服务请求返回结果 End===============//')
  return Utils.HttpClientResponseBodyDataFormatter(body)
}

function onError (err) {
  log.error('//===============[HttpClient]  请求过程中发生异常==============//')
  log.err(err)
}

module.exports = {
  get: options => {
    return request.get(mergeOptions(options).url)
      .then(onSuccess)
      .catch(onError)
  },
  post: options => {
    return request.post(mergeOptions(options))
      .then(onSuccess)
      .catch(onError)
  }
}
