// components/result-footer/result-footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    result: String,
    more: Boolean,
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
    on_calculate: function() {
      this.triggerEvent('calculateclick', {})
    },
    on_clear: function() {
      this.triggerEvent('clearclick', {})
    },
    MoreRiskJudge: function() {
      this.triggerEvent('toremain', {})      
    }
  }
})
