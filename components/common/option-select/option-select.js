// components/option-select/option-select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectStatus: false,
    // selectOptions: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    EmitchangeOption:function(e) {
      this.triggerEvent('changeOption', parseInt(e.target.dataset.index))
    },
    changeStatus:function() {
  
      if (this.data.selectData.selectOptions.length > 1) {
        this.setData({
          selectStatus: !this.data.selectStatus
        })
      }
      
    }
  }
})
