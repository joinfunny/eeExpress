/**
 * @author: jiangfeng
 * @summary: HttpClient
 * GET:
 * httclient.get({url:'/user/list',query:{a:1}}).then(function(result){})
 * POST:
 * httpclient.post({url:'/user/new',body:{username:'jiangfeng'}}).then(function(result){})
 */
var request = require('request-promise')
var codes = require('../utils/codes')
var log = console

/**
 * 包装配置项
 * GET：拼装URL，添加rdm随机数，防止请求缓存
 * POST：拼装请求体body
 * @param {any} options
 * @returns 返回合并后的配置
 */
function mergeOptions(options) {
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
  mergedOptions.host = options.host

  // merge url
  mergedOptions.url = mergedOptions.host + options.url + (queryParams.length > 0 ? ('?' + queryParams.join('&')) : '')

  return Object.assign({}, options, mergedOptions)
}

function onSuccess(body) {
  log.info('//===============[HttpClient] 服务请求返回结果 Begin==============//')
  log.info(body)
  log.info('//===============[HttpClient] 服务请求返回结果 End===============//')
  return bodyFormatter(body)
}

function onError(err) {
  log.error('//===============[HttpClient]  请求过程中发生异常==============//')
  log.err(err)
}
/**
 * @param {IncomingResponse} reponse 请求体输出对象的Body
 * @return {Object} 格式化为JSON对象
 */
function bodyFormatter(body) {
  var dataObject = {}
  dataObject = Object.prototype.toString.call(body) === '[object Object]' ? body : (JSON.parse(body) || {})
  var code = codes.ServiceCodes[dataObject.code + '']
  dataObject.success = code ? code.success : false
  dataObject.msg = code ? code.msg : (dataObject.msg || '')
  // dataObject.dataObject = dataObject.dataObject || dataObject.data
  // delete dataObject.data
  return dataObject
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
