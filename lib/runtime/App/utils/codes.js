/**
 * @author: jiangfeng
 * @summary: 初始化系统下的各种code枚举
 */
let AppConfig = require('../AppConfig')
class RuntimeCode {
  constructor (code, success, tag, msg) {
    this.code = code
    this.success = success
    this.tag = tag
    this.msg = msg
  }
  toString () {
    return `{code}:{tag} {msg}`
  }
}
class ServiceCode {
  constructor (code, success, tag, msg) {
    this.code = code
    this.success = success
    this.tag = tag
    this.msg = msg
  }
  toString () {
    return `{code}:{tag} {msg}`
  }
}

let initRuntimeCodes = () => {
  let codes = {}
  AppConfig.message.runtime.forEach((item) => {
    codes[item[2] + ''] = new RuntimeCode(item[0], item[1], item[2], item[3])
  })
  return codes
}

let initServiceCodes = () => {
  let codes = {}
  AppConfig.message.service.forEach((item) => {
    codes[item[0] + ''] = new ServiceCode(item[0], item[1], item[2], item[3])
  })
  return codes
}

let initCaasCodes = () => {
  let codes = {}
  AppConfig.message.caas.forEach((item) => {
    codes[item[0] + ''] = new ServiceCode(item[0], item[1], item[2], item[3])
  })
  return codes
}

module.exports = {
  RuntimeCodes: initRuntimeCodes(),
  ServiceCodes: initServiceCodes(),
  CaasCodes: initCaasCodes()
}
