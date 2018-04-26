// pages/ASCVD/ASCVD2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: "",
    weight: "",
    nhdl: "",
    nhdlfix2: "",
    nhdl_unit: "mmol/L",
    bmi: "",
    BpRisk: "",
    SmokerRisk: "",
    HdlRisk: "",
    RiskFactorNum: 0,
    result: null,
    heightWarn: false,
    weightWarn: false,
    nhdlWarn: false,
  },

  bindInputHeight: function (e) {
    this.setData({
      height: e.detail.value,
      result: null,
    })
  },
  bindInputWeight: function (e) {
    this.setData({
      weight: e.detail.value,
      result: null,
    })
  },
  bindInputNHdl: function (e) {
    this.setData({
      nhdl: e.detail.value,
      result: null,
    })
  },
  bindNHDLUnitChange: function () {
    if (this.data.nhdl_unit == "mmol/L") {
      this.setData({
        nhdl_unit: "mg/dL",
        nhdl: this.data.nhdl * 38.61,
        nhdlfix2: (Math.round(this.data.nhdl * 3861)) / 100
      })
    }
    else {
      this.setData({
        nhdl_unit: "mmol/L",
        nhdl: this.data.nhdl / 38.61,
        nhdlfix2: (Math.round(this.data.nhdl / 0.3861)) / 100
      })
    }
  },
  calculate: function () {
    //添加输入值合法性检测
    this.setData({
      heightWarn: false,
      weightWarn: false,
      nhdlWarn: false,
    })
    //检测nhdl输入有效性
    var nhdl = this.data.nhdl;
    var unit = this.data.nhdl_unit;
    if (unit == "mg/dL") {
      nhdl = nhdl / 38.61;
    }
    if (nhdl < 2 || nhdl > 7.5) {
      this.setData({
        nhdlWarn: true
      })
    }
    //检测身高体重输入有效性
    var height = this.data.height;
    var weight = this.data.weight;
    if (height < 80 || height > 250) {
      this.setData({
        heightWarn: true
      })
    }
    if (weight < 20 || weight > 200) {
      this.setData({
        weightWarn: true
      })
    }
    //危险因素计算
    var factor = 0, result = '非高危患者';
    if (this.data.BpRisk=='true'){
      factor++;
    }
    if (this.data.SmokerRisk == 'true') {
      factor++;
    }
    if (this.data.HdlRisk == 'true') {
      factor++;
    }
    if (nhdl > 5.2) {
      factor++
    }
    var bmi = weight * 10000 / (height * height);
    if (bmi >= 28) {
      factor++;
    }
    if (factor >= 2) {
      result = '高危患者'
    }
    this.setData({
      bmi: bmi,
      RiskFactorNum: factor,
      result: result
    })

  },

  clear: function () {
    this.setData({
      height: "",
      weight: "",
      nhdl: "",
      nhdlfix2: "",
      nhdl_unit: "mmol/L",
      bmi: "",
      RiskFactorNum: 0,
      result: null,
      heightWarn: false,
      weightWarn: false,
      nhdlWarn: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取血压 HDL-C SMOKER
    var BpRisk, SmokerRisk, HdlRisk;
    if (options.BpRisk){
      BpRisk = options.BpRisk;
    }
    if (options.SmokerRisk){
      SmokerRisk = options.SmokerRisk;
    }
    if (options.HdlRisk ){
      HdlRisk = options.HdlRisk;
    }
    this.setData({
      BpRisk: BpRisk,
      SmokerRisk: SmokerRisk,
      HdlRisk: HdlRisk
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