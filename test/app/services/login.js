module.exports = app => {
  return {
    "/api/test": {
      method: "get",
      mock: {
        on: true,
        dataRegular () {
          return 1
        }
      },
      beforeRequest: function(req, res) {
        req.query.id = 1;
      },
      request: function(req, res, callback) {
        callback({
          success: true,
          msg: req.sessionID
        });
      },
      afterRequest: function(req, res, responseData) {
        responseData.data = {
          config: app.EE_EXPRESS_CONFIG
        };
      }
    },
    "/api/server/v2/application/overview": {
      method: "post",
      beforeRequest: function(req, res) {
        console.warn('proxy api service self before request exec.')
        req.body = {
          condition: {
            startTime: 1519778345591,
            endTime: 1519780145591,
            tierId: "",
            instanceId: ""
          }
        };
      },
      afterRequest: function(req, res, responseData) {
        console.warn('proxy api service self after request exec.')
        responseData.msg = ' changed .'
      }
    }
  };
};
