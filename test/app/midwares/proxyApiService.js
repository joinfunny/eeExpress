/**
 * @author: jiangfeng
 * @summary: 自定义的代理API服务处理
 */

module.exports = app => {
  return {
    beforeRequest: function(req, res) {
      console.warn('proxy api service midware before request exec.')
    },
    afterRequest: function(req, res, responseData) {
      console.warn('proxy api service midware after request exec.')
    }
  };
};
