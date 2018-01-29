
module.exports = {
  '/api/framework': {
    method: 'get',
    mock: {
      user: 1
    },
    beforeRequest: function(req, res) {
      console.log(req.query)
      req.query.id = 1
    },
    request: function(req, res, callback) {
      callback({
        success: true,
        msg: req.sessionID
      })
    },
    afterRequest: function(req, res, responseData) {
      responseData.data = 'framework'
    }
  }
}
