const should = require('should')
const path = require('path')
const fs = require('fs')
const EEExpress = require('../index')
let resolve = (file) => {
  return path.resolve('./lib/runtime', file)
}

describe('app config test', () => {
  let rootPath = process.cwd()
  let config = require('./app/configs/development.js')
  it('eeExpress instance default config and rootPath', () => {
    let app = new EEExpress()
    app.rootPath.should.equal(rootPath)
    app.app.rootPath.should.equal(rootPath)
    app.config.should.containEql({rootPath: rootPath})
    app.config.should.not.containEql(config)
  })

  it('eeExpress instance set config', () => {
    let app = new EEExpress(config)
    app.rootPath.should.equal(rootPath)
    app.app.rootPath.should.equal(rootPath)
    app.config.should.containEql({rootPath: rootPath})
    for (let key in config) {
      if (config.hasOwnProperty(key)) {
        app.config.should.have.value(key, config[key])
      }
    }
  })
})
