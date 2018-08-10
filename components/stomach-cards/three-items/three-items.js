// components/stomach-cards/three-items/three-items.js
import threeItemsModel from 'threeItemsModel'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    sexModel: {
      label: '性别',
      radioList: ['男', '女'],
      index: 0
    },
    ageModel: {
      labelList: ['年龄'],
      labelIndex: 0,
      value: '',
      selectData: {
        defaultIndex: 0,
        selectDisable: true,
        selectOptions: [{
          index: '0',
          context: 'years'
        }]
      },
      judgement: [0, 100],
      isWarning: false
    },
    pgrModel: {
      labelList: ['PGR'],
      labelIndex: 0,
      value: '',
      selectData: {
        defaultIndex: 0,
        selectDisable: true,
        selectOptions: [{
          index: '0',
          context: ''
        }]
      },
      judgement: [0, 10000],
      isWarning: false
    },
    g17Model: {
      labelList: ['G17'],
      labelIndex: 0,
      value: '',
      selectData: {
        defaultIndex: 0,
        selectDisable: true,
        selectOptions: [{
          index: '0',
          context: 'pmol/L'
        }]
      },
      judgement: [0, 100],
      isWarning: false
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changePGRaram(e) {
      let key = 'pgrModel.' + e.detail.key
      this.setData({
        [key]: e.detail.value
      })
    },
    changeG17Param(e) {
      let key = 'g17Model.' + e.detail.key
      this.setData({
        [key]: e.detail.value
      })
    },
    changeAgeParam(e) {
      let key = 'ageModel.' + e.detail.key
      this.setData({
        [key]: e.detail.value
      })
    },
    changeSexSelect: function(e) {
      this.setData({
        'sexModel.index': e.detail
      })
    },
    calcResult: function() {
      /**
       * 进行输入判断并提示
       * 原则：若没有输入值 !value 或 isWarning则返回提示
       */
      let toastMessage = ''
      if (!this.data.ageModel.value) { //  || this.data.ageModel.isWarning
        toastMessage += this.data.ageModel.labelList[this.data.ageModel.labelIndex] + ','
      }
      if (!this.data.pgrModel.value) { //  || this.data.pgrModel.isWarning
        toastMessage += this.data.pgrModel.labelList[this.data.pgrModel.labelIndex] + ','
      }
      if (!this.data.g17Model.value) { //  || this.data.g17Model.isWarning
        toastMessage += this.data.g17Model.labelList[this.data.g17Model.labelIndex] + ','
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
      let ageValue = parseInt(this.data.ageModel.value)
      let pgrValue = parseFloat(this.data.pgrModel.value)
      let g17Value = parseFloat(this.data.g17Model.value)
      let sex = this.data.sexModel.index
      let riskResult = threeItemsModel.calculate(ageValue, pgrValue, g17Value, sex)
      this.setData({
        riskResult: riskResult
      })
    },
    clearInput: function() {
      this.setData({
        'sexModel.index': 0,
        'ageModel.value': '',
        'pgrModel.value': '',
        'g17Model.value': '',
        riskResult: ''
      })
    }
  }
})