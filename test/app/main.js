let app = require('./index')
let apiAuth = require('./midwares/index').auth.apiAuth
app.authRegister(apiAuth)
app.init()
app.run()
