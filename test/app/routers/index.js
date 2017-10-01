let eeExpress = require('../../../lib/index')
var router = eeExpress.Router()

router.get('/', function (req, res, next) {
  eeExpress.logger.info('test view index')
  res.render('index')
})


module.exports = router
