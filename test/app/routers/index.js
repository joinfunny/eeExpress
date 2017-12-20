let eeExpress = require('../../../lib/index')
var router = eeExpress.Router()
var cluster = require('cluster');
let index = 0

router.get('/', function(req, res, next) {
  index++
  //eeExpress.logger.info('test view index :' + index)
  //res.end('ok')
  //res.render('index')
  res.end('worker'+cluster.worker.id+',PID:'+process.pid);
})


module.exports = router
