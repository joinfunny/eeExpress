const fs = require('fs')
const path = require('path')
/**
 * @summary a middleware for creating sub apps
 * @param {* Object} app EEEXpress instance
 * @description 1.读取apps文件夹下的文件夹，从里边读取出各自的index.js,index.js主要用来生成一个express APP的，但是其可是设置run=false来阻止其自动启动。
                2.将读取的APP各自的配置信息输出记录，读取出配置信息中的APPName。这个appName作为其应用的关键信息，需要对其配置内的路由进行转向，对其服务前缀进行转向
 */
exports.use = app => {
  let apps = []
  let subAppsPath = path.isAbsolute(app.EE_EXPRESS_CONFIG.directory.subApps) ? app.EE_EXPRESS_CONFIG.directory.subApps : path.join(app.EE_EXPRESS_CONFIG.rootPath, app.EE_EXPRESS_CONFIG.directory.subApps)
  if (!fs.existsSync(subAppsPath)) {
    return
  }
  let files = fs.readdirSync(subAppsPath)
  files.forEach(file => {
    let stat = fs.statSync(path.join(subAppsPath, file))
    if (stat.isDirectory()) {
      let indexFilePath = path.join(subAppsPath, file, 'index.js')
      let existsIndex = fs.existsSync(indexFilePath)
      if (existsIndex) {
        let sub = require(indexFilePath)
        if (sub && sub.constructor && sub.constructor.name === 'EEExpress') {
          console.warn(`loading `)
          app.use('/' + file, sub.app)
        }
        apps.push(file)
        app.subApps = apps
      }
    }
  })
  process.env.NODE_APPS = apps.join(',')
}
