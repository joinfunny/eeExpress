let path = require("path");
let lodash = require("lodash");
let file = require("../utils/file");
exports.use = app => {
  if (!app.EE_EXPRESS_CONFIG.directory.module) return;
  app.modules = {};
  let modules = file.moduleDirectory(
    path.isAbsolute(app.EE_EXPRESS_CONFIG.directory.module)
      ? app.EE_EXPRESS_CONFIG.directory.module
      : path.join(app.rootPath, app.EE_EXPRESS_CONFIG.directory.module)
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
};
