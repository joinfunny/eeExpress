let eeExpress = require('../../../lib/index')
let Runtime = eeExpress.runtime

module.exports = {
  '/api/user/test': {
    method: 'get',
    mock: {
      user: 1
    },
    beforeRequest: function (req, res) {
      console.log(req.query)
      req.query.id = 1
    },
    request: function (req, res, callback) {
      console.log(req.session)
      console.log(req.query)
      callback({
        success: true,
        msg: req.sessionID
      })
    },
    afterRequest: function (req, res, responseData) {
      responseData.data = 11
    }
  },
  '/api/user/test1': {
    method: 'post',
    mock: {
      user: 1
    },
    beforeRequest: function (req, res) {
      console.log(req.query)
      req.body.id = 1
    },
    request: function (req, res, callback) {
      console.log(req.session)
      console.log(req.query)
      callback({
        success: true,
        msg: req.sessionID
      })
    },
    afterRequest: function (req, res, responseData) {
      responseData.data = 11
    }
  }
}
