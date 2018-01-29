module.exports = app => {
  app.get('/', function(req, res, next) {
    res.render('index', {
      sessionID: req.sessionID,
      appName: app.EE_EXPRESS_CONFIG.appName,
      apps: process.env.NODE_APPS
    })
  })
}
