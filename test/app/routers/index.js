let eeExpress = require('../../../lib/index')
var router = eeExpress.Router()
var cluster = require('cluster');


router.get('/', function(req, res, next) {
  let count = req.query.count || 0
  for(var i = 0; i < count; i++) {
    console.log(i)
  }
  res.end(req.sessionID)
})

module.exports = router
