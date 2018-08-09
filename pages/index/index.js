Page({
  data: {
    rvd_show: false,
    stomach_show: false,
    selectData: {
        defaultIndex: 0,
        selectDisable: false,
        selectOptions: [
          {
            index: '0',
            context: 'mmol/L'
          },
          {
            index: '1',
            context: 'mg/dL'
          }
        ]
    },
    tcModel: {
      labelList: ['TC', 'LDL-C'],
      labelIndex: 0,
      value: '',
      selectData: {
        defaultIndex: 0,
        selectDisable: false,
        selectOptions: [
          {
            index: '0',
            context: 'mmol/L'
          },
          {
            index: '1',
            context: 'mg/dL'
          }
        ]
      },
      judgement: function () {
        let warning = false
        let tc = parseFloat(this.data.tcModel.value)
        let unitIndex = this.data.tcModel.unitIndex
        tc = (unitIndex === 1) ? (tc / 38.61) : tc
        if (tc < 3.9 || tc > 12) {
          warning = true
        }
        this.tcModel.isWarning = warning
      },
      isWarning: false
    },
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载

  },
  tcRangeJudgement:function () {
    let warning = false
    let tc = parseFloat(this.data.tcModel.value)
    let unitIndex = this.data.tcModel.unitIndex
    tc = (unitIndex === 1) ? (tc / 38.61) : tc
    if (tc < 3.9 || tc > 12) {
      warning = true
    }
    this.tcModel.isWarning = warning
  },
  changeOption:function (e) {
    this.setData({
      'selectData.defaultIndex': e.detail
    })
  },
  onChangeShowState_rvd: function () {
    var that = this;
    that.setData({
      rvd_show: (!that.data.rvd_show),
      stomach_show: false,
    })
  },
  onChangeShowState_stomach: function () {
    var that = this;
    that.setData({
      stomach_show: (!that.data.stomach_show),
      rvd_show: false,
    })
  },
})