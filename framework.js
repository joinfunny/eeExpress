/*
1.读取apps文件夹下的文件夹，从里边读取出各自的index.js,index.js主要用来生成一个express APP的，但是其可是设置run=false来阻止其自动启动。
2.将读取的APP各自的配置信息输出记录，读取出配置信息中的APPName。这个appName作为其应用的关键信息，需要对其配置内的路由进行转向，对其服务前缀进行转向
*/
process.env.NODE_ENV = 'development'
let apps = []
let EEExpress = require('./lib/index')
const fs = require('fs')
const path = require('path')

let config = require('./configs/' + process.env.NODE_ENV)

let framework = new EEExpress(config, __dirname)

let appRootPath = path.resolve('./apps')

let files = fs.readdirSync(appRootPath)

files.forEach(file => {
  let stat = fs.statSync(path.join(appRootPath, file))
  if (stat.isDirectory()) {
    let indexFilePath = path.join(appRootPath, file, 'index.js')
    let existsIndex = fs.existsSync(indexFilePath)
    if (existsIndex) {
      let sub = require(indexFilePath)(false)
      framework.app.use('/' + file, sub.app)
      apps.push(file)
    }
  }
})
process.env.NODE_APPS = apps.join(',')

framework.run()
