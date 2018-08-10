// components/radio-input/radio-input.js
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
    radioChange(e) {
      let index = parseInt(e.detail.value)
      this.triggerEvent('mychange', index)
    }
  }
})
