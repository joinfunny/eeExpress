
module.exports = {
  '/api/test': {
    method: 'get',
    mock: {
      user: 1
    },
    beforeRequest: function(req, res) {
      req.query.id = 1
    },
    request: function(req, res, callback) {
      callback({
        success: true,
        msg: req.sessionID
      })
    },
    afterRequest: function(req, res, responseData) {
      responseData.data = 'test'
    }
  }
}
