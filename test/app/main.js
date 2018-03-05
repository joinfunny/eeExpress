let app = require('./index')
let midwares = require('./midwares/index')
let apiAuth = midwares.auth.apiAuth
app.authRegister(apiAuth)
app.proxyApiServiceRegister(midwares.proxyApiService(app))
app.init()
app.run()
