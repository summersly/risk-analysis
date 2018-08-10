const app = getApp()

Page({
  data: {
    calculatorList: [
      {
        name: '心血管风险',
        icon: 'http://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-medical-calculator/icon/rvd.png',
        route: '/pages/rvd/rvd'
      }, {
        name: '胃功能',
        icon: 'http://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-medical-calculator/icon/stomach.png',
        route: '/pages/stomach/stomach'
      }
    ]
  }
})