const should = require('should')
const path = require('path')
const fs = require('fs')
let resolve = (file) => {
  return path.resolve('./lib/runtime', file)
}
let fileUtils = require(resolve('utils/file.js'))

describe('fileUtils.copy test', () => {
  let sourceDir = path.resolve('./test/example/utils/copy')
  let targetDir = path.join(sourceDir, 'target')
  before(() => {
    fileUtils.rm(targetDir, false)
  })

  it('source or target dose not exists', () => {
    let source = path.resolve(sourceDir, '../source.js')
    let target = targetDir
    // when we test the sence for throw error,we must build a new func
    let copy = () => {
      fileUtils.copy(source, target)
    }
    copy.should.throw(Error)
  })

  it('copy source.js to target', () => {
    let source = path.resolve(sourceDir, 'source.js')
    let target = targetDir
    fileUtils.copy(source, target)
    let exists = fs.existsSync(path.resolve(target, 'source.js'))
    exists.should.equal(true)
  })
  it('copy source directory to target', () => {
    let source = path.resolve(sourceDir, '../')
    let target = targetDir
    fileUtils.copy(source, target)
    fs.existsSync(path.resolve(target, 'source.js')).should.equal(true)
    fs.existsSync(path.resolve(target, 'copy')).should.equal(true)
    fs.existsSync(path.resolve(target, 'copy/other')).should.equal(true)
  })
})
