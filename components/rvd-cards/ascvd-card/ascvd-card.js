// components/rvd-cards/ascvd-card/ascvd-card.js
import ascvdModel from 'ascvdModel'
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
    diabetesModel: {
      label: '糖尿病患者',
      radioList: ['否', '是'],
      index: 0
    },
    tcModel: {
      labelList: ['LDL-C', 'TC'],
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
      judgement: [1.8, 10, 3.1, 14.4],
      isWarning: false
    },
    hdlModel: {
      labelList: ['HDL-C'],
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
      judgement: [0.26, 3],
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
    dbpModel: {
      labelList: ['舒张压'],
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
      judgement: [40, 200],
      isWarning: false
    },
    riskResult: '',
    more: false
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
      if (e.detail.key === 'labelIndex') {
        that.setData({
          'tcModel.value': ''
        })
      }
      if (e.detail.key === 'selectData.defaultIndex' && this.data.tcModel.value) {
        let value = (e.detail.value == 0) ? (this.data.tcModel.value / 38.61).toFixed(2) : (this.data.tcModel.value * 38.61).toFixed(2)
        that.setData({
          'tcModel.value': value
        })
      }
    },
    changeHdlParam(e) {
      let that = this
      let key = 'hdlModel.' + e.detail.key
      this.setData({
        [key]: e.detail.value
      })
      if (e.detail.key === 'selectData.defaultIndex' && this.data.hdlModel.value) {
        let value = (e.detail.value == 0) ? (this.data.hdlModel.value / 38.61).toFixed(2) : (this.data.hdlModel.value * 38.61).toFixed(2)
        that.setData({
          'hdlModel.value': value
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
    changeDbpParam(e) {
      let key = 'dbpModel.' + e.detail.key
      this.setData({
        [key]: e.detail.value
      })
    },
    changeSexSelect: function (e) {
      this.setData({
        'sexModel.index': e.detail
      })
    },
    changeSmokerSelect: function (e) {
      this.setData({
        'smokerModel.index': e.detail
      })
    },
    changeDiabetesSelect: function (e) {
      this.setData({
        'diabetesModel.index': e.detail
      })
    },
    calcResult: function () {
      /**
       * 进行输入判断并提示
       * 原则：若没有输入值 !value 或 isWarning则返回提示
       */
      let toastMessage = ''
      if (!this.data.ageModel.value) { //  || this.data.ageModel.isWarning
        toastMessage += this.data.ageModel.labelList[this.data.ageModel.labelIndex] + ','
      }
      if (!this.data.tcModel.value || this.data.tcModel.isWarning) { //  
        toastMessage += this.data.tcModel.labelList[this.data.tcModel.labelIndex] + ','
      }
      if (!this.data.hdlModel.value) { //  || this.data.hdlModel.isWarning
        toastMessage += this.data.hdlModel.labelList[this.data.hdlModel.labelIndex] + ','
      }
      if (!this.data.sbpModel.value) { //  || this.data.sbpModel.isWarning
        toastMessage += this.data.sbpModel.labelList[this.data.sbpModel.labelIndex] + ','
      }
      if (!this.data.dbpModel.value) { //  || this.data.dbpModel.isWarning
        toastMessage += this.data.dbpModel.labelList[this.data.dbpModel.labelIndex] + ','
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
      let dbpValue = parseInt(this.data.dbpModel.value)
      let tcValue = parseFloat(this.data.tcModel.value)
      let hdlValue = parseFloat(this.data.hdlModel.value)
      let sex = this.data.sexModel.index
      let smoker = this.data.smokerModel.index
      let diabetes = this.data.diabetesModel.index
      let tcunitIndex = this.data.tcModel.selectData.defaultIndex
      let hdlunitIndex = this.data.hdlModel.selectData.defaultIndex
      let lable = this.data.tcModel.labelIndex
      //以mmol/l为计算单位
      tcValue = (tcunitIndex === 1) ? (tcValue / 38.61) : tcValue
      hdlValue = (hdlunitIndex === 1) ? (hdlValue / 38.61) : hdlValue
      let Result = ascvdModel.calculate(ageValue, tcValue, hdlValue, sbpValue, dbpValue, sex, smoker, diabetes, lable)
      this.setData({
        riskResult: Result.riskResult,
        more:Result.more
      })
    },
    navToRemain:function(){
      let bp = ascvdModel.bplevel(this.data.sbpModel.value,this.data.dbpModel.value)
      let smoker = this.data.smokerModel.index
      let hdlunitIndex = this.data.hdlModel.selectData.defaultIndex
      let hdlValue = parseFloat(this.data.hdlModel.value)
      hdlValue = (hdlunitIndex === 1) ? (hdlValue / 38.61) : hdlValue      
      let hdl = ascvdModel.hdllevel(hdlValue)
      wx.navigateTo({
        url: '/pages/rvd/remain-risk/remain-risk?bp=' + bp + '&smoker=' + smoker + '&hdl=' + hdl
      })
    },
    clearInput: function () {
      this.setData({
        'smokerModel.index': 0,
        'sexModel.index': 0,
        'diabetesModel.index': 0,
        'ageModel.value': '',
        'tcModel.value': '',
        'hdlModel.value': '',
        'sbpModel.value': '',
        'dbpModel.value': '',
        riskResult: ''
      })
    }
  }
})


