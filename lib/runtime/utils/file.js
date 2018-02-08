/**
 * @author: jiangfeng
 * @summary: Commonly used file manipulation methods.
 */
let fs = require('fs')
let path = require('path')
let archiver = require('archiver')
let tools = require('./tools')

var fileUtils = {
  /**
   * gets all files under a folder and outputs an array.
   * @param path the path
   */
  getFiles: function(path) {
    let fileList = []
    let folderList = []
    let walk = function(path, fileList, folderList) {
      let files = fs.readdirSync(path)
      files.forEach(function(item) {
        let tmpPath = path + '/' + item
        let stats = fs.statSync(tmpPath)
        if (stats.isDirectory()) {
          walk(tmpPath, fileList, folderList)
          folderList.push(tmpPath)
        } else {
          fileList.push(tmpPath)
        }
      })
    }
    walk(path, fileList, folderList)
    return fileList
  },
  /**
   * create folders synchronously. folders that do not exist are created automatically.
   * @param dirpath the directory path must be the full path.
   */
  mkdirsSync: function(dirpath) {
    if (process.platform === 'win32') {
      dirpath = dirpath.replace('/', '\\')
    }
    if (!fs.existsSync(dirpath)) {
      var pathtmp
      dirpath.split(path.sep).forEach(function(dirname) {
        if (pathtmp) {
          pathtmp = path.join(pathtmp, dirname)
        } else {
          if (dirname === '') {
            pathtmp = '/'
          } else {
            pathtmp = dirname
          }
        }
        if (pathtmp.length > 0 && !fs.existsSync(pathtmp)) {
          if (!fs.mkdirSync(pathtmp)) {
            return false
          }
        }
      })
    }
    return true
  },
  /**
   * go through all the files under a folder and load them into `target`.
   * @param directory the files under a directory required to `target`
   * @param target this `target` mast be typeof Object
   */
  requireDirectory: function(directory, target) {
    var files = fileUtils.getFiles(directory)
    files.forEach(function(file) {
      Object.assign(target, require(file))
    }, this)
  },
  /**
   * go through all the files under a folder,
   * loading them into modules, and the underline will be converted to hump properties.
   * @param fullDirectory the full path to load
   * @return return the Module Object that was loaded
   */
  moduleDirectory: function(fullDirectory) {
    var modules = {}
    var allFiles = fileUtils.getFiles(fullDirectory)
    allFiles.forEach(function(file) {
      var fileName = path.basename(file, '.js')
      var dirname = path.dirname(file)
      modules[tools.lineToCamelCase(fileName)] = require(path.join(dirname, fileName))
    }, this)
    return modules
  },
  /**
   * compress all files in a folder to zip.
   * @param srcFolder folders to compress.
   * @param zipDirectory compressed folders.
   * @param fileName zip file name.
   * @returns returns a Promise object after the compression is completed.
   */
  zipFolderAsync: (srcFolder, zipDirectory, fileName) => {
    return new Promise((resolve, reject) => {
      if (fileUtils.mkdirsSync(zipDirectory)) {
        var archive = archiver.create('zip', {})
        archive.on('error', function(err) {
          reject(err)
        })
        var output = fs.createWriteStream(path.resolve(zipDirectory, fileName))
        output.on('close', function() {
          console.log(archive.pointer() + ' total bytes')
          console.log('archiver has been finalized and the output file descriptor has closed.')
          resolve(archive.pointer())
        })
        archive.pipe(output)
        archive.directory(srcFolder, path.parse(srcFolder).base)
        archive.finalize()
      } else {
        reject(new Error('directory created faild.'))
      }
    })
  },
  /**
   * copy files from source to target
   * @param source the source file or directory
   * @param target the target file or directory
   */
  copy: (source, target) => {
    let fileName = ''
    if (path.isAbsolute(source)) {
      source = path.resolve(source)
    }
    if (path.isAbsolute(target)) {
      target = path.resolve(target)
    }
    if (!fs.existsSync(source) || !fs.existsSync(target)) {
      throw new Error('the source or destination path dose not exists.')
    }

    if (fs.statSync(source).isDirectory()) {
      fileUtils.getFiles(source).forEach(file => {
        let relativeFilePath = path.relative(source, file)
        let targetFilePath = path.join(target, relativeFilePath)
        fileUtils.mkdirsSync(path.parse(targetFilePath).dir)
        fs.copyFileSync(file, targetFilePath)
      })
    } else {
      fileName = path.parse(source).base
      fs.copyFileSync(source, path.join(target, fileName))
    }
  },
  /**
   * delete all files under a folder, if the path is a file, then delete the file
   * @param path a file path or directory
   * @param delRoot if delete the currently specified directory. default `'true'`
   */
  rm: function(rmPath, delRoot = true) {
    let files = []
    let curPath = ''
    if (fs.existsSync(rmPath)) {
      files = fs.readdirSync(rmPath)
      files.forEach(function(file, index) {
        curPath = path.join(rmPath, file)
        if (fs.statSync(curPath).isDirectory()) {
          fileUtils.rm(curPath, true)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      if (delRoot) {
        fs.rmdirSync(rmPath)
      }
    }
  }
}
module.exports = fileUtils
