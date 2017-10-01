/**
 * @author jiangfeng
 * @summary 路由处理器
 * @desc 遍历对应文件夹下得所有文件，将其解析为对应的路由
 */
let path = require('path')
let Utils = require('./App/utils')
let ServiceHandler = require('./serviceHandler')

/**
 * 注册服务
 * @param {*Express} app
 * @param {*Object} appConfig 配置对象
 */
function serviceRegister (app, appConfig) {
  // release环境不走mock模式
  let serviceDirectory = appConfig.runtime.directory.service
  serviceDirectory = path.join(path.resolve(), serviceDirectory)
  var services = Utils.getFiles(serviceDirectory)
  var serviceObject = {}
  services.forEach(function (item) {
    let service = require(item)
    serviceObject = Object.assign(serviceObject, service)
  })

  app.use('/', ServiceHandler(serviceObject).router)
}

/**
 *注册路由
 * @param {*Express} app Express实例
 * @param {*Object} appConfig 配置对象
 */
function routeRegister (app, appConfig) {
  let routerDirectory = appConfig.runtime.directory.router
  routerDirectory = path.join(path.resolve(), routerDirectory)
  var routes = Utils.getFiles(routerDirectory)
  routes.forEach(function (item) {
    let route = require(item)
    app.use('/', route)
  })
}

exports.use = function (app, appConfig) {
  routeRegister(app, appConfig)
  serviceRegister(app, appConfig)
}
