const moment = require('moment')
/**
 * 对数组进行补数处理
 * @param {*DateTime} startTime 开始时间
 * @param {*DateTime} endTime 结束时间
 * @param {*Array} body 要补数据的数组
 * @param {*Int} count 要补充到的数据量
 */
let complementList = (startTime, endTime, body, count) => {
  let list = body.list
  if (list.length >= 30) {
    return
  }
  let newList = []
  let timeSpan = endTime - startTime
  let interval = Math.floor(timeSpan / count)
  let current = null
  let prev = list[0]
  let currentTime = 0
  let nextTime = 0
  for (let i = 0; i < count; i++) {
    // 如果存在
    current = list.slice(0, 1)[0]
    if (current) {
      currentTime = current.x
      nextTime = startTime + interval * (i + 1)
      if (currentTime >= prev.x && currentTime < nextTime) {
        list.splice(0, 1)
      } else {
        current = {
          x: nextTime,
          y: 0,
          startTime: moment(nextTime).format('YYYY-MM-DD HH:mm'),
          endTime: moment(nextTime + interval).format('YYYY-MM-DD HH:mm')
        }
      }
    } else {
      current = {
        x: nextTime,
        y: 0,
        startTime: moment(nextTime).format('YYYY-MM-DD HH:mm'),
        endTime: moment(nextTime + interval).format('YYYY-MM-DD HH:mm')
      }
    }
    prev = current
    newList.push(current)
  }
  body.list = newList
}

module.exports = {
  AppTypeEnum: {
    COMMON: '0', // (new Byte("0"), "通用类型"),
    JAVA: '1', // (new Byte("1"), "Java类型"),
    TUXEDO: '2', // (new Byte("2"), "Tuxedo类型"),
    BROWSER: '3', // (new Byte("3"), "Browser探针"),
    PHP: '4' // (new Byte("4"), "PHP类型"),
  },
  /**
   * Byte转换为MB数据
   * @param {any} request 请求
   * @param {any} response 返回
   * @param {any} responseData 返回对象
   */
  biteToMb (request, response, responseData) {
    if (responseData.unit && responseData.unit === 'b' && responseData.data && Array.isArray(responseData.data)) {
      responseData.data.forEach((item, index) => {
        item.list.forEach((listItem) => {
          listItem.y = Math.round(listItem.y / 1024 / 1024 * 1000) / 1000
        })
      })
      responseData.unit = 'MB'
    }
  },

  /**
   * 计算某一个时间段的每分钟平均值（APM-89）
   * @param request
   * @param response
   * @param responseData
   */
  avgMinuteCount (request, response, responseData) {
    let diffTime = function (startTimeStr, endTimeStr) {
      let s = new Date(startTimeStr)
      let e = new Date(endTimeStr)
      return parseInt(e - s) / 1000 / 60
    }
    if (responseData.data && Array.isArray(responseData.data)) {
      responseData.data.map(dataItem => {
        dataItem.list.map(listItem => {
          let minute = diffTime(listItem.startTime, listItem.endTime)
          listItem.y = listItem.y / minute
        })
      })
    }
  },
  /**
   * 补数
   *
   * @param {any} request
   * @param {any} response
   * @param {any} responseData
   */
  complement (request, response, responseData) {
    let paths = [
      '/errorRate/countFromError',
      ''
    ].map((item) => {
      return item.toLowerCase()
    })
    if (paths.indexOf(request.path.toLowerCase()) <= -1) {
      return
    }
    let startTime = responseData.startTime
    let endTime = responseData.endTime
    responseData.data.forEach((list, index) => {
      complementList(startTime, endTime, list, 30)
    })
    responseData.node = true
  },
  /**
   * 过滤掉组数中指定的一项
   * @param {any} originData
   */
  filterData (originData, keyWord) {}
}
