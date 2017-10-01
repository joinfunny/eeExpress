/**
 * @author: jiangfeng
 * @summary: 对HTTPClient对象返回对象的各种包装
 */
var codes = require('./codes')
module.exports = {
  /**
   * @param success 是否成功
   * @param msg 回调返回的消息
   * @param dataObject 回调最终返回的默认数据
   */
  GetCallBackObject: (success, msg, dataObject) => {
    return {
      success: success || false,
      msg: msg || '',
      dataObject: dataObject || null
    }
  },
  /**
   * @param {IncomingResponse} reponse 请求体输出对象
   * @return {Object} 格式化为JSON对象
   */
  HttpClientResponseDataFormatter: (response) => {
    var dataObject = {}
    dataObject = Object.prototype.toString.call(response.body) === '[object Object]' ? response.body : (JSON.parse(response.body) || {})
    var code = codes.ServiceCodes[dataObject.code + '']
    dataObject.success = code ? code.success : (dataObject.message === 'success' ? true : (dataObject.status === 'success'))
    dataObject.msg = code ? code.msg : (dataObject.msg || dataObject.message || '')
    // dataObject.dataObject = dataObject.dataObject || dataObject.data
    // delete dataObject.data
    return dataObject
  },
  /**
   * @param {IncomingResponse} reponse 请求体输出对象的Body
   * @return {Object} 格式化为JSON对象
   */
  HttpClientResponseBodyDataFormatter: (body) => {
    var dataObject = {}
    dataObject = Object.prototype.toString.call(body) === '[object Object]' ? body : (JSON.parse(body) || {})
    var code = codes.ServiceCodes[dataObject.code + '']
    dataObject.success = code ? code.success : false
    dataObject.msg = code ? code.msg : (dataObject.msg || '')
    // dataObject.dataObject = dataObject.dataObject || dataObject.data
    // delete dataObject.data
    return dataObject
  }
}
