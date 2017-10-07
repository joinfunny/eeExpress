module.exports = {
  tableName: 'complaints',
  schema: true,
  connection: 'default',
  autoPK: false,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  attributes: {
    docmentsNo: {
      type: 'string',
      required: true,
      unique: false,
      primaryKey: false,
      index: true
    },
    orderTime: {
      type: 'string'
    },
    agentOrderNo: {
      type: 'string'
    },
    feedback: {
      type: 'string'
    },
    coustomerRequest: {
      type: 'string'
    },
    phoneNo: {
      type: 'string'
    },
    type: {
      type: 'integer'
    },
    sign: {
      type: 'string'
    },
    // 投诉来源
    complaintSources: {
      type: 'string'
    },
    // 投诉时长
    timeLength: {
      type: 'string'
    },
    // 投诉次数
    times: {
      type: 'string'
    },
    // 满意度
    satisfaction: {
      type: 'string'
    },
    // 流转信息
    record: {
      type: 'string'
    }
  }
}
