// pages/rvd/remain-risk/remain-risk.js
import remainRiskModel from 'remainRiskModel'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nHdlModel: {
      labelList: ['非-HDL-C'],
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
      judgement: [2, 7.5],
      isWarning: false
    },
    heightModel: {
      labelList: ['身高'],
      labelIndex: 0,
      value: '',
      selectData: {
        defaultIndex: 0,
        selectDisable: true,
        selectOptions: [
          {
            index: '0',
            context: 'cm'
          }
        ]
      },
      judgement: [80, 250],
      isWarning: false
    },
    weightModel: {
      labelList: ['体重'],
      labelIndex: 0,
      value: '',
      selectData: {
        defaultIndex: 0,
        selectDisable: true,
        selectOptions: [
          {
            index: '0',
            context: 'Kg'
          }
        ]
      },
      judgement: [20, 200],
      isWarning: false
    },
    bpRisk: 0,
    hdlRisk: 0,
    smokerRisk: 0
  },
  changenHdlParam(e) {
    let that = this
    let key = 'nHdlModel.' + e.detail.key
    this.setData({
      [key]: e.detail.value
    })
    if (e.detail.key === 'selectData.defaultIndex' && this.data.nHdlModel.value) {
      let value = (e.detail.value == 0) ? (this.data.nHdlModel.value / 38.61).toFixed(2) : (this.data.nHdlModel.value * 38.61).toFixed(2)
      that.setData({
        'nHdlModel.value': value
      })
    }
  },
  changeHeightParam(e) {
    let key = 'heightModel.' + e.detail.key
    this.setData({
      [key]: e.detail.value
    })
  },
  changeWeightParam(e) {
    let key = 'weightModel.' + e.detail.key
    this.setData({
      [key]: e.detail.value
    })
  },
  calcResult: function () {
    /**
     * 进行输入判断并提示
     * 原则：若没有输入值 !value 或 isWarning则返回提示
     */
    let toastMessage = ''
    if (!this.data.heightModel.value) { //  || this.data.heightModel.isWarning
      toastMessage += this.data.heightModel.labelList[this.data.heightModel.labelIndex] + ','
    }
    if (!this.data.nHdlModel.value) { //  || this.data.nHdlModel.isWarning
      toastMessage += this.data.nHdlModel.labelList[this.data.nHdlModel.labelIndex] + ','
    }
    if (!this.data.weightModel.value) { //  || this.data.weightModel.isWarning
      toastMessage += this.data.weightModel.labelList[this.data.weightModel.labelIndex] + ','
    }
    if (toastMessage) {
      wx.showToast({
        title: toastMessage.slice(0, -1) + ' 输入有误',
        icon: 'none',
        duration: 1500
      })
      return false
    }

    // TODO: 计算模型
    let heightValue = parseFloat(this.data.heightModel.value)
    let weightValue = parseFloat(this.data.weightModel.value)
    let nhdlValue = parseFloat(this.data.nHdlModel.value)
    let nhdlunitIndex = this.data.nHdlModel.selectData.defaultIndex
    //以mmol/l为计算单位
    nhdlValue = (nhdlunitIndex === 1) ? (nhdlValue / 38.61) : nhdlValue
    let bmi = remainRiskModel.bmilevel(heightValue, weightValue)
    let nhdl = remainRiskModel.nhdllevel(nhdlValue)
    let count = nhdl + bmi + this.data.bpRisk + this.data.hdlRisk + this.data.smokerRisk
    let result = '非高危患者'
    if (count >= 2){
       result = '高危患者'
    }
    this.setData({
      riskResult: result
    })
  },
  clearInput: function () {
    this.setData({
      'heightModel.value': '',
      'nHdlModel.value': '',
      'weightModel.value': '',
      riskResult: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bpRisk: parseInt(options.bp) ? 1 : 0,
      hdlRisk: parseInt(options.hdl),
      smokerRisk: parseInt(options.smoker)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})