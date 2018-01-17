let eeExpress = require('../../../lib/index')
var router = eeExpress.Router()
const fs = require('fs')
const path = require('path')

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

router.get('/logs',function(req,res,next){
  let basePath = path.resolve('./test/app/statics/logs/');
  console.log(basePath);
  fs.readdir('./test/app/statics/logs', function(err, files) {
      var list = [];
      files.forEach(function(file, index) {
          let filePath = path.resolve('./test/app/statics/logs', file);
          let extName = path.extname(filePath)
          let statu = fs.statSync(filePath);
          if (statu.isFile() && extName === '.log' ) {
              list.push('<li><a href="/logs/' + file + '">' + file + '</a></li>');
          }
      });
      res.status(200).type('html').send('\
                  <h1>日志</h1>\
                  <hr>\
                  <ul>' + list.join('') + '</ul>')
          .end();
  });
})

module.exports = router
