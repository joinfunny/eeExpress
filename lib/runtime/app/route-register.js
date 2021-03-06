﻿/**
 * @author jiangfeng
 * @summary route handler
 * @desc 遍历对应文件夹下得所有文件，将其解析为对应的路由
 */
let path = require('path')
let file = require('../utils/file')
let ServiceHandler = require('./service-handler')

/**
 * muti directorys services register
 * @param {*Express} app
 */
function serviceRegister(app, proxyApiService) {
  let serviceDirectory = app.EE_EXPRESS_CONFIG.directory.service.split(',')
  var serviceObject = {}
  serviceDirectory.forEach(directory => {
    if (directory) {
      serviceObject = Object.assign(serviceObject, registerSingleDirectoryService(app, directory))
    }
  })
  // app.use('/', ServiceHandler(app, serviceObject).router)
  ServiceHandler(app, serviceObject, proxyApiService)
}

/**
 *  single directory services register
 * @param {* String} serviceDirectory service register directory path
 */
function registerSingleDirectoryService(app, serviceDirectory) {
  serviceDirectory = path.isAbsolute(serviceDirectory) ? serviceDirectory : path.join(app.rootPath, serviceDirectory)
  var services = file.getFiles(serviceDirectory)
  var serviceObject = {}
  services.forEach(function(item) {
    let service = require(item)(app)
    serviceObject = Object.assign(serviceObject, service)
  })
  return serviceObject
}

/**
 * muti routers register
 * @param {*Express} app Express instance
 */
function routeRegister(app) {
  let routerDirectory = app.EE_EXPRESS_CONFIG.directory.router.split(',')
  routerDirectory.forEach(directory => {
    if (directory) {
      registerSingleDirectoryRouter(app, directory)
    }
  })
}

/**
 * single router register
 * @param {* String} routerDirectory path of the router directory
 */
function registerSingleDirectoryRouter(app, routerDirectory) {
  routerDirectory = path.isAbsolute(routerDirectory) ? routerDirectory : path.join(app.rootPath, routerDirectory)
  var routes = file.getFiles(routerDirectory)
  routes.forEach(function(item) {
    let route = require(item)
    // app.use('/', route)
    route(app)
  })
}

exports.use = function(app, proxyApiService) {
  routeRegister(app)
  serviceRegister(app, proxyApiService)
}
