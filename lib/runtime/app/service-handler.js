/**
 * @author: jiangfeng
 * @summary: Service hanlder
 */
/* eslint-disable no-useless-escape */
let Mock = require('mockjs')
let Validator = require('../utils/validator')
let httpclient = require('../utils/http-client')
let _ = require('lodash')

const apiService = app => {
  let proxyHost = app.EE_EXPRESS_CONFIG.proxyHost
  let apiRouter = '/' + app.EE_EXPRESS_CONFIG.proxyApiPrefix + '/*'
  let apiRegExp = '^\\/' + app.EE_EXPRESS_CONFIG.proxyApiPrefix + '(.+)'
  return {
    [apiRouter]: {
      method: 'all',
      beforeRequest: (req, res) => { },
      request: (req, res, callback) => {
        let method = req.method.toLowerCase() || 'get'
        let results = apiRegExp.exec(req.url)
        let url = ''
        if (results === null || (results && typeof (results[1]) !== 'string' && results[1].length)) {
          url = ''
        } else {
          url = results[1].replace(/\+/g, ' ')
        }

        let params = {
          host: proxyHost,
          url: url
        }

        if (method === 'post') {
          params.body = req.body
        }

        httpclient[method](params)
          .then(responseData => {
            callback(responseData)
          })
          .catch(err => {
            console.error(err)
          })
      },
      afterRequest: (req, res, responseData) => {

      }
    }
  }
}

class ServiceGenerator {
  constructor(app, services) {
    this.app = app
    this.services = services
  }
  register() {
    for (let url in this.services) {
      let originService = this.services[url]
      originService.url = url
      let service = new Service(originService)
      this.app[service.method](service.options.url, service.onRouter.bind(service))
    }
  }
}

class Service {
  constructor(options) {
    this.options = options
    this.method = options.method || 'get'
  }
  onRouter(req, res, next) {
    let that = this
    if (that.beforeExecute(req, res)) {
      /**
       * mock验证规则
       * 1.如果当前出于生产环境，则不进行Mock
       * 3.配置中如果mock属性不为undefined 则进行Mock
       */
      if (process.env.NODE_ENV.indexOf('production') === -1 && typeof (req.query.mock) !== 'undefined') {
        that.onMocking(req, res, that.options.mock)
      }

      that.options.request && that.options.request.call(that, req, res, function(actionResult) {
        that.actionResult = actionResult
        that.afterExecute(req, res, actionResult)
        res.json(actionResult)
        res.end()
      })
    }
  }
  /**
   * 执行前对请求体数据进行校验
   */
  beforeExecute(request, response) {
    response.setHeader('Content-Type', 'application/json;charset=utf-8')
    let validResult = {
      valid: true,
      message: ''
    }
    if (this.options.validate) {
      let method = this.options.method
      let dataObj = method === 'get' ? request.query : request.body
      this.options.validate.forEach((validater) => {
        if (validResult.valid) {
          validResult = new Validator(dataObj[validater.field], validater.options).validate().result
        }
      })
    }
    if (!validResult.valid) {
      response.json({
        success: false,
        code: 100,
        msg: validResult.message
      })
      response.end()
    } else {
      var beforeRequest = this.options.beforeRequest
      beforeRequest && _.isFunction(beforeRequest) && beforeRequest.call(this, request, response)
    }

    return validResult.valid
  }
  /**
   * 执行完之后，对服务的处理
   *
   * @param {IncomingRequst} request
   * @param {IncomingResponse} response
   */
  afterExecute(request, response, actionResult) {
    let afterRequest = this.options.afterRequest
    afterRequest && _.isFunction(afterRequest) && afterRequest.call(this, request, response, actionResult)
  }
  /**
   * Mock数据
   * @param {IncomingRequest} request
   * @param {IncomingResponse} response
   * @param {Object|Function} dataRegular Mock数据的规则，可以是函数，也可以是数据规则JSON，如果是函数需要最终返回数据规则JSON
   */
  onMocking(request, response, dataRegular) {
    console.warn('正在Mock service："' + request.path + '" 数据...')
    let data
    if (_.isFunction(dataRegular)) {
      data = dataRegular.call(this, request)
    } else {
      data = Mock.mock(dataRegular)
    }
    response.json({
      success: true,
      dataObject: data
    })
    response.end()
  }
}

module.exports = (app, ServiceObject) => {
  new ServiceGenerator(app, ServiceObject).register()
  new ServiceGenerator(app, apiService(app)).register()
}
