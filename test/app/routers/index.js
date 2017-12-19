let eeExpress = require('../../../lib/index')
var router = eeExpress.Router()

let index = 0

router.get('/', function(req, res, next) {
  index++
  //eeExpress.logger.info('test view index :' + index)
  res.end('ok')
  //res.render('index')
})


module.exports = router
