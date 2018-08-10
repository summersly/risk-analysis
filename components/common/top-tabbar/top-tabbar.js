// components/top-tabbar/top-tabbar.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabbarData:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick: function(e) {
      this.setData({
        activeIndex: parseInt(e.currentTarget.id)
      }) 
    },
    swiperChange: function(e){
      this.setData({
        activeIndex: e.detail.current
      })     
    }
  }
})
