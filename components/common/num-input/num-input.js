// components/num-input/num-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    model: Object
  
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeOption: function (e) {
      let detail = {
        key: 'selectData.defaultIndex',
        value: e.detail
      }
      this.triggerEvent('mychange', detail)
      
    },
    changeValue: function(e){
      let detail = {
        key: 'value',
        value: e.detail.value
      }
      this.triggerEvent('mychange', detail)

    },
    changeLabel: function(){
      let index = this.data.model.labelIndex
      index = ((index + 1) >= this.data.model.labelList.length) ? 0 : (index + 1)
      let detail = {
        key:'labelIndex',
        value:index
      }
      this.triggerEvent('mychange', detail)
    },
    rangeJudgement: function(){
      let warning = false
      let val = parseFloat(this.data.model.value)
      let unitIndex = this.data.model.selectData.defaultIndex
      val = (unitIndex === 1) ? (val / 38.61) : val
      let index = this.data.model.labelIndex
      if (val < this.data.model.judgement[0 + index * 2] || val > this.data.model.judgement[1 + index * 2]) {
        warning = true
      }
      let detail = {
        key: 'isWarning',
        value: warning
      }
      this.triggerEvent('mychange', detail)
    }
  },
})
