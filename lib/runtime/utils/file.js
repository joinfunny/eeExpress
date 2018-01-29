/**
 * @author: jiangfeng
 * @summary: 常用的文件操作方法
 */
let fs = require('fs')
let path = require('path')
let archiver = require('archiver')
let tools = require('./tools')

var FileUtils = {
  /**
   * 获取某个文件夹下的所有文件，输出为列表
   * @param {*String} path
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
   * 同步创建文件夹，不存在的文件夹会自动创建
   * 此处为完整文件路径
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
   * 遍历某个文件夹下的所有文件，逐一装载到target下
   */
  requireDirectory: function(directory, target) {
    var files = FileUtils.getFiles(directory)
    files.forEach(function(file) {
      Object.assign(target, require(file))
    }, this)
  },
  /**
   * 遍历某个文件夹下的所有文件，逐一装载到modules下，下划线会转化为驼峰属性
   * @param fullDirectory 要装载的完整路径
   * @return 返回装载完成的Module
   */
  moduleDirectory: function(fullDirectory) {
    var modules = {}
    var allFiles = FileUtils.getFiles(fullDirectory)
    allFiles.forEach(function(file) {
      var fileName = path.basename(file, '.js')
      var dirname = path.dirname(file)
      modules[tools.lineToCamelCase(fileName)] = require(path.join(dirname, fileName))
    }, this)
    return modules
  },
  /**
   * 压缩某个文件夹内的所有文件到zip中
   * @param {String} srcFolder 要压缩的文件夹
   * @param {String} zipDirectory 压缩到的文件夹
   * @param {String} fileName 压缩包的文件名称
   * @returns {PromiseFunction} 返回压缩完成后的Promise对象
   */
  zipFolderAsync: (srcFolder, zipDirectory, fileName) => {
    return new Promise((resolve, reject) => {
      if (FileUtils.mkdirsSync(zipDirectory)) {
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
  }
}
module.exports = FileUtils
