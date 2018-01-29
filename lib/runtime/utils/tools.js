module.exports = {
  /**
   * @description convert underline of the str charactors to camel case style
   */
  lineToCamelCase: str => {
    var re = /-(\w)/g
    str = str.replace(re, function($0, $1) {
      return $1.toUpperCase()
    })
    return str
  }
}
