let eeExpress = require('../../../lib/index')
var router = eeExpress.Router()


router.get('/', function(req, res, next) {
  let count = req.query.count || 0
  let objCount = req.query.objCount || 0
  for(var i = 0; i < count; i++) {
    console.log(i)
  }
  let obj = {}
  for(var o = 0; o< objCount ; o++) {
    obj[objCount] = objCount
  }
  res.end(req.sessionID)
})

module.exports = router
