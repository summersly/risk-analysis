// pages/SCORE/SCORE.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: null,
    age: "",
    sex: false,
    smoker: false,
    tc: "",
    tcfix2: "",
    tc_unit: "mmol/L",
    sbp: "",
    sexArr: ["男", "女"],
    smokerArr: ["否", "是"],
    mensmokerArr: [[[26, 30, 35, 41, 47], [18, 21, 25, 29, 34], [13, 15, 17, 20, 24], [9, 10, 12, 14, 17]],
    [[18, 21, 24, 28, 33], [12, 14, 17, 21, 24], [8, 10, 12, 14, 17], [6, 7, 8, 10, 12]],
    [[12, 13, 16, 19, 22], [8, 9, 11, 13, 16], [5, 6, 8, 9, 11], [4, 4, 5, 6, 8]],
    [[7, 8, 10, 12, 14], [5, 6, 7, 8, 10], [3, 4, 5, 6, 7], [2, 3, 3, 4, 5]],
    [[2, 2, 3, 3, 4], [1, 2, 2, 2, 3], [1, 1, 1, 2, 2], [1, 1, 1, 1, 1]]],
    mennonsmokerArr: [[[14, 16, 19, 22, 26], [9, 11, 13, 15, 16], [6, 8, 9, 11, 13], [4, 5, 6, 7, 9]],
    [[9, 11, 13, 5, 18], [6, 7, 9, 10, 12], [4, 5, 6, 7, 9], [3, 3, 4, 5, 6]],
    [[6, 7, 8, 10, 12], [4, 5, 6, 7, 8], [3, 3, 4, 5, 6], [2, 2, 3, 3, 4]],
    [[4, 4, 5, 6, 7], [2, 3, 3, 4, 5], [2, 2, 2, 3, 3], [1, 1, 2, 2, 2]],
    [[1, 1, 1, 2, 2], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 0, 1, 1, 1]]],
    womensmokerArr: [[[13, 15, 17, 19, 22], [9, 10, 12, 13, 16], [6, 7, 8, 9, 11], [4, 5, 5, 6, 7]],
    [[8, 9, 10, 11, 13], [5, 6, 7, 8, 9], [3, 4, 5, 5, 6], [2, 3, 3, 4, 4]],
    [[4, 5, 5, 6, 7], [3, 3, 4, 4, 5], [2, 2, 2, 3, 3], [1, 1, 2, 2, 2]],
    [[2, 2, 3, 3, 4], [1, 2, 2, 2, 3], [1, 1, 1, 1, 2], [1, 1, 1, 1, 1]],
    [[0, 0, 0, 1, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]],
    womennonsmokerArr: [[[7, 8, 9, 10, 12], [5, 5, 6, 7, 8], [3, 3, 4, 5, 6], [2, 2, 3, 3, 4]],
    [[4, 4, 5, 6, 7], [3, 3, 3, 4, 5], [2, 2, 2, 3, 3], [1, 1, 2, 2, 2]],
    [[2, 2, 3, 3, 4], [1, 2, 2, 2, 3], [1, 1, 1, 1, 2], [1, 1, 1, 1, 1]],
    [[1, 1, 1, 2, 2], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 0, 1, 1, 1]],
    [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]],
    ageWarn: false,
    tcWarn: false,
    sbpWarn: false,

  },
  bindInputAge: function (e) {
    this.setData({
      age: e.detail.value,
      result: null,
    })
  },
  switchSexChange: function (e) {
    var sex = false;
    if (e.detail.value == 1) {
      sex = true;
    }
    this.setData({
      sex: sex,
      result: null,
    })
  },
  switchSmokerChange: function (e) {
    var smoker = false;
    if (e.detail.value == 1) {
      smoker = true;
    }
    this.setData({
      smoker: smoker,
      result: null,
    })
  },
  bindInputTc: function (e) {
    this.setData({
      tc: e.detail.value,
      result: null,
    })
  },
  bindInputSbp: function (e) {
    this.setData({
      sbp: e.detail.value,
      result: null,
    })
  },
  bindUnitChange: function () {
    if (this.data.tc_unit == "mmol/L") {
      this.setData({
        tc_unit: "mg/dL",
        tc: this.data.tc * 38.61,
        tcfix2: (Math.round(this.data.tc * 3861)) / 100
      })
    }
    else {
      this.setData({
        tc_unit: "mmol/L",
        tc: this.data.tc / 38.61,
        tcfix2: (Math.round(this.data.tc / 0.3861)) / 100
      })
    }
  },
  step1: function () {
    var age = Math.round(this.data.age);
    if (age <= 30 || age > 100) {
      this.setData({
        ageWarn: true
      })
    }
    if (age < 45) {
      return 4;
    }
    else if (age >= 45 && age < 53) {
      return 3;
    }
    else if (age >= 53 && age < 58) {
      return 2;
    }
    else if (age >= 58 && age < 63) {
      return 1;
    }
    else if (age >= 63) {
      return 0;
    }
  },
  step2: function () {
    var sbp = Math.round(this.data.sbp);
    if (sbp <= 60 || sbp > 200) {
      this.setData({
        sbpWarn: true
      })
    }
    if (sbp < 130) {
      return 3;
    }
    else if (sbp >= 130 && sbp < 150) {
      return 2;
    }
    else if (sbp >= 150 && sbp < 170) {
      return 1;
    }
    else if (sbp >= 170) {
      return 0;
    }
  },
  step3: function () {
    var tc = this.data.tc;
    var unit = this.data.tc_unit;
    if (unit == "mg/dL") {
      tc = tc / 38.61;
    }
    if (tc < 3.9 || tc > 12) {
      this.setData({
        tcWarn: true
      })
    }
    if (tc < 4.5) {
      return 0;
    }
    else if (tc >= 4.5 && tc < 5.5) {
      return 1;
    }
    else if (tc >= 5.5 && tc < 6.5) {
      return 2;
    }
    else if (tc >= 6.5 && tc < 7.5) {
      return 3;
    }
    else if (tc >= 7.5) {
      return 4;
    }
  },
  calculate: function () {
    this.setData({
      ageWarn: false,
      sbpWarn: false,
      tcWarn: false
    })
    var sex = this.data.sex;
    var smoker = this.data.smoker;
    if (!this.data.age || !this.data.sbp || !this.data.tc) {
      console.log("false");
      return false;
    }
    var age = this.step1();
    var sbp = this.step2();
    var tc = this.step3();
    console.log(age)
    console.log(sbp)
    console.log(tc)
    var that = this;
    if (!sex) {
      if (!smoker) {
        //men-nonsmoker
        this.setData({
          result: this.data.mennonsmokerArr[age][sbp][tc]
        })
      } else {
        //men-smoker
        this.setData({
          result: this.data.mensmokerArr[age][sbp][tc]
        })
      }
    }
    else {
      if (!smoker) {
        //women-nonsmoker
        this.setData({
          result: this.data.womennonsmokerArr[age][sbp][tc]
        })
      } else {
        //women-smoker
        this.setData({
          result: this.data.womensmokerArr[age][sbp][tc]
        })
      }
    }
  },
  clear: function () {
    this.setData({
      result: null,
      age: "",
      sex: 0,
      smoker: 0,
      tc: "",
      tcfix2: "",
      tc_unit: "mmol/L",
      sbp: "",
      ageWarn: false,
      tcWarn: false,
      sbpWarn: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return {
      title: '风险评估工具',
      path: '/pages/SCORE/SCORE',
      success: function (res) {

      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }
})