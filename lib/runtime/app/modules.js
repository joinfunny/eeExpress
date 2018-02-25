let path = require("path");
let lodash = require("lodash");
let file = require("../utils/file");
let build = (app, modulePath) => {
  if(!modulePath) return
  let modules = file.moduleDirectory(
    path.isAbsolute(modulePath)
      ? modulePath
      : path.join(app.rootPath, modulePath)
  );
  for (let prop in modules) {
    if (modules.hasOwnProperty(prop)) {
      if (lodash.isFunction(modules[prop])) {
        app.modules[prop] = modules[prop](app);
      } else {
        app.modules[prop] = modules[prop];
      }
    }
  }
}
exports.use = app => {
  app.modules = {};
  if (!app.EE_EXPRESS_CONFIG.directory.module) return;
  let moduleArray = app.EE_EXPRESS_CONFIG.directory.module.split(',')
  moduleArray.forEach(modulePath => build(app, moduleArray))
};
