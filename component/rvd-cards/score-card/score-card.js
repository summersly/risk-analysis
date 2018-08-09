// component/score-card/score-card.js
import scoreModel from 'scoreModel'
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
    smokerModel: {
      label: '是否吸烟',
      radioList: ['否', '是'],
      index: 0
    },
    tcModel: {
      labelList: ['TC'],
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
      judgement: [3.9, 12],
      isWarning: false
    },
    ageModel: {
      labelList: ['年龄'],
      labelIndex: 0,
      value: '',
      selectData: {
        defaultIndex: 0,
        selectDisable: true,
        selectOptions: [
          {
            index: '0',
            context: 'years'
          }
        ]
      },
      judgement: [30, 100],
      isWarning: false
    },
    sbpModel: {
      labelList: ['收缩压'],
      labelIndex: 0,
      value: '',
      selectData: {
        defaultIndex: 0,
        selectDisable: true,
        selectOptions: [
          {
            index: '0',
            context: 'mmHg'
          }
        ]
      },
      judgement: [60, 200],
      isWarning: false
    },
    riskResult: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTCParam(e) {
      // 如果需要对切换单位后的数值做处理，也可以在这里判断key
      let that = this
      let key = 'tcModel.' + e.detail.key
      this.setData({
        [key]: e.detail.value
      })
      if (e.detail.key === 'selectData.defaultIndex' && this.data.tcModel.value) {
        let value = (e.detail.value == 0) ? (this.data.tcModel.value / 38.61).toFixed(2) : (this.data.tcModel.value * 38.61).toFixed(2)
        that.setData({
          'tcModel.value': value
        })
      }
    },
    changeAgeParam(e) {
      let key = 'ageModel.' + e.detail.key
      this.setData({
        [key]: e.detail.value
      })
    },
    changeSbpParam(e) {
      let key = 'sbpModel.' + e.detail.key
      this.setData({
        [key]: e.detail.value
      })
    },
    changeSexSelect: function(e) {
      this.setData({
        'sexModel.index': e.detail
      })
    },
    changeSmokerSelect: function (e) {
      this.setData({
        'smokerModel.index': e.detail
      })
    },
    calcResult:function (){
      /**
       * 进行输入判断并提示
       * 原则：若没有输入值 !value 或 isWarning则返回提示
       */
      let toastMessage = ''
      if (!this.data.ageModel.value) { //  || this.data.ageModel.isWarning
        toastMessage += this.data.ageModel.labelList[this.data.ageModel.labelIndex] + ','
      }
      if (!this.data.tcModel.value) { //  || this.data.tcModel.isWarning
        toastMessage += this.data.tcModel.labelList[this.data.tcModel.labelIndex] + ','
      }
      if (!this.data.sbpModel.value) { //  || this.data.sbpModel.isWarning
        toastMessage += this.data.sbpModel.labelList[this.data.sbpModel.labelIndex] + ','
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
      let sbpValue = parseInt(this.data.sbpModel.value)
      let tcValue = parseFloat(this.data.tcModel.value)
      let sex = this.data.sexModel.index
      let smoker = this.data.smokerModel.index
      let unitIndex = this.data.tcModel.selectData.defaultIndex
      tcValue = (unitIndex === 1) ? (tcValue / 38.61) : tcValue
      let riskResult = scoreModel.calculate(ageValue, tcValue, sbpValue, sex, smoker)
      this.setData({
        riskResult: riskResult
      })
    },
    clearInput: function(){
      this.setData({
        'smokerModel.index': 0,
        'sexModel.index': 0,
        'ageModel.value': '',
        'tcModel.value': '',
        'sbpModel.value': '',
        riskResult: ''
      })
    }
  }
})
