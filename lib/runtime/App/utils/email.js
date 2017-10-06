/**
 * @author: jiangfeng
 * @summary: 邮件发送
 */
var nodemailer = require('nodemailer')
var transporter

function createSingltonTransporter(config) {
  if (!transporter) {
    transporter = nodemailer.createTransport(config.runtime.email)
  }
}
/**
 * 发送邮件
 * @param {any} from 发件地址
 * @param {any} to 收件列表
 * @param {any} subject 标题
 * @param {any} text text和html两者只支持一种
 * @param {any} html html 内容
 * @param {Function} cb 发送邮件的回调函数
 */
function send(from, to, subject, text, html, cb) {
  var mailOptions = {
    from: from, // 发件地址
    to: to, // 收件列表
    subject: subject, // 标题
    // text和html两者只支持一种
    text: text, // 标题
    html: html // html 内容
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    cb && cb(error, info)
  })
}

/**
 * 发送邮件Promise
 * @param {any} from 发件地址
 * @param {any} to 收件列表
 * @param {any} subject 标题
 * @param {any} text text和html两者只支持一种
 * @param {any} html html 内容
 * @returns {PromiseFunction} 返回邮件发送的Promise对象
 */
function sendAsync(from, to, subject, text, html) {
  return new Promise((resolve, reject) => {
    send(from, to, subject, text, html, function(error, info) {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}
module.exports = {
  createSingltonTransporter,
  send,
  sendAsync
}
