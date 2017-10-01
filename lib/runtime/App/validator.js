/**
 * @author jiangfeng
 * @summary 数据验证器
 * @desc Http请求中的数据校验，也可用于前台业务数据的校验
 * @example new Validator('abc',{
 *  required:true,
 *  validType: string/,
 *  validParams: null,
 *  missingMessage: '字段不可为空',
 *  invalidMessage: '格式校验错误',
 *  rules:[]
 * })
 */
/* eslint-disable no-useless-escape,no-eval */
let defaultOptions = {
  required: false,
  validType: null,
  validParams: null,
  missingMessage: 'This field is required.',
  invalidMessage: null,
  rules: {
    email: {
      validator: function (value) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value)
      },
      message: 'Please enter a valid email address.'
    },
    url: {
      validator: function (value) {
        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
      },
      message: 'Please enter a valid URL.'
    },
    length: {
      validator: function (value, range) {
        var len = String.prototype.trim.call(value).length
        return len >= range[0] && len <= range[1]
      },
      message: '请输入{0}-{1}位字符.'
    },
    minLength: {
      validator: function (value, param) {
        return value.length >= param[0]
      },
      message: '请输入最小{0}位字符.'
    },
    maxLength: {
      validator: function (value, param) {
        return param[0] >= value.length
      },
      message: '请输入最大{0}位字符.'
    },
    min: {
      validator: function (value, param) {
        param[2] = param[2] || '输入值必须大于{0}'
        var numType = param[1] = param[1] ? param[1] : 'int'
        if (numType === 'int') {
          return parseInt(value) > param[0]
        } else if (numType === 'float') {
          return parseFloat(value) > param[0]
        }
      },
      message: '{2}'
    },
    max: {
      validator: function (value, param) {
        param[2] = param[2] || '输入值必须小于{0}'
        var numType = param[1] = param[1] ? param[1] : 'int'
        if (numType === 'int') {
          return parseInt(value) < param[0]
        } else if (numType === 'float') {
          return parseFloat(value) < param[0]
        }
      },
      message: '{2}'
    },
    equals: {
      validator: function (value, param) {
        return value === param[0]
      },
      message: '必须等于{0}'
    },
    web: {
      validator: function (value) {
        return /^(http[s]{0,1}|ftp):\/\//i.test(value)
      },
      message: '网址格式错误.'
    },
    mobile: {
      validator: function (value) {
        return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(value)
      },
      message: '手机号码格式错误.'
    },
    date: {
      validator: function (value) {
        return /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/i.test(String.prototype.trim(value))
      },
      message: '曰期格式错误,如2012-09-11.'
    },
    CHS: {
      validator: function (value, param) {
        return /^[\u0391-\uFFE5]+$/.test(value)
      },
      message: '请输入汉字'
    },
    CHE: {
      validator: function (value, param) {
        return /^([a-zA-Z]|[\u4e00-\u9fa5])+$/.test(value)
      },
      message: '请输入中文或英文，不能包含数字和其他特殊字符'
    },
    CHEN: {
      validator: function (value, param) {
        return /^([a-zA-Z]|[\u4e00-\u9fa5]|[0-9])+$/.test(value)
      },
      message: '请输入中文、英文、数字，不支持特殊字符'
    },
    UserName: {
      validator: function (value, param) {
        return /^[\u0391-\uFFE5\w]+$/.test(value)
      },
      message: '用户名称只允许汉字、英文字母、数字及下划线'
    }
  }
}
class Validator {
  constructor (data, options) {
    this.data = data
    this.options = Object.assign({}, defaultOptions, options)
    this._result = {valid: true, message: ''}
  }
  get result () {
    return this._result
  }
  validate () {
    this.result.message = ''
    if (this.options.required) {
      if (this.data === null || this.data === undefined || this.data === '') {
        this._result.message = this.options.missingMessage
        this._result.valid = false
        return this
      }
    }
    if (this.options.validType) {
      if (Array.isArray(this.options.validType)) {
        for (var i = 0; i < this.options.validType.length; i++) {
          if (!this.validateRule(this.options.validType[i])) {
            this._result.valid = false
            return this
          }
        }
      } else {
        if (typeof this.options.validType === 'string') {
          if (!this.validateRule(this.options.validType)) {
            this._result.valid = false
            return this
          }
        } else {
          for (var type in this.options.validType) {
            var params = this.options.validType[type]
            if (!this.validateRule(type, params)) {
              this._result.valid = false
              return this
            }
          }
        }
      }
    }
    return this
  }
  get isValid () {
    return this.validate().valid
  }
  get message () {
    return this.validate().message
  }
  validateRule (value, validParams) {
    var filter = /([a-zA-Z_]+)(.*)/.exec(value)
    var rule = this.options.rules[filter[1]]
    if (rule && this.data) {
      var args = validParams || this.options.validParams || eval(filter[2])
      if (!rule['validator'].call(null, this.data, args)) {
        var msg = rule['message']
        if (args) {
          for (var i = 0; i < args.length; i++) {
            msg = msg.replace(new RegExp('\\{' + i + '\\}', 'g'), args[i])
          }
        }
        this._result.message = this.options.invalidMessage || msg
        return false
      }
    }
    return true
  }
}

module.exports = Validator
