// pages/ASCVD/ASCVD.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: "",
    sex: false,
    smoker: false,
    diabetes: false,
    ldl: "",
    hdl: "",
    ldlfix2: "",
    hdlfix2: "",
    ldl_item: "LDL-C",
    ldl_unit: "mmol/L",
    hdl_unit: "mmol/L",
    sbp: "",
    dbp: "",
    ldlLevel: 0,
    RiskFactorNum: 0,
    hypertension: false,
    resultlevel: 0,
    result: null,
    RiskName: ["低危(<5%)", "中危(5%-9%)", "高危(≥10%)"],
    NormLevel: [[0, 0, 0], [0, 0, 0], [0, 0, 1], [0, 1, 1]],
    HyperLevel: [[0, 0, 0], [0, 1, 1], [1, 2, 2], [2, 2, 2]],
    //warning 
    ageWarn: false,
    ldlWarn: false,
    hdlWarn: false,
    sbpWarn: false,
    dbpWarn: false,
  },
  bindInputAge: function (e) {
    this.setData({
      age: e.detail.value,
      result: null,
      resultlevel:0,
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
      resultlevel: 0,
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
      resultlevel: 0,
    })
  },
  switchDiabetesChange: function (e) {
    var diabetes = false;
    if (e.detail.value == 1) {
      diabetes = true;
    }
    this.setData({
      diabetes: diabetes,
      result: null,
      resultlevel: 0,
    })
  },
  bindInputLdl: function (e) {
    this.setData({
      ldl: e.detail.value,
      result: null,
      resultlevel: 0,
    })
  },
  bindInputHdl: function (e) {
    this.setData({
      hdl: e.detail.value,
      result: null,
      resultlevel: 0,
    })
  },
  bindInputSbp: function (e) {
    this.setData({
      sbp: e.detail.value,
      result: null,
      resultlevel: 0,
    })
  },
  bindInputDbp: function (e) {
    this.setData({
      dbp: e.detail.value,
      result: null,
      resultlevel: 0,
    })
  },
  bindLDLItemChange: function () {
    if (this.data.ldl_item == "LDL-C") {
      this.setData({
        ldl_item: "TC",
        ldl: "",
        ldlfix2: "",
        result: null,
        resultlevel: 0,
      })
    }
    else {
      this.setData({
        ldl_item: "LDL-C",
        ldl: "",
        ldlfix2: "",
        result: null,
        resultlevel: 0,
      })
    }
  },
  bindLDLUnitChange: function () {
    if (this.data.ldl_unit == "mmol/L") {
      this.setData({
        ldl_unit: "mg/dL",
        ldl: this.data.ldl * 38.61,
        ldlfix2: (Math.round(this.data.ldl * 3861)) / 100
      })
    }
    else {
      this.setData({
        ldl_unit: "mmol/L",
        ldl: this.data.ldl / 38.61,
        ldlfix2: (Math.round(this.data.ldl / 0.3861)) / 100
      })
    }
  },
  bindHDLUnitChange: function () {
    if (this.data.hdl_unit == "mmol/L") {
      this.setData({
        hdl_unit: "mg/dL",
        hdl: this.data.hdl * 38.61,
        hdlfix2: (Math.round(this.data.hdl * 3861)) / 100
      })
    }
    else {
      this.setData({
        hdl_unit: "mmol/L",
        hdl: this.data.hdl / 38.61,
        hdlfix2: (Math.round(this.data.hdl / 0.3861)) / 100
      })
    }
  },

  /*
  calculate function
  */
  WarningJudge: function () {
    var age = Math.round(this.data.age);
    var ldl = this.data.ldl;
    var ldlunit = this.data.ldl_unit;
    var item = this.data.ldl_item;
    var hdl = this.data.hdl;
    var hdlunit = this.data.hdl_unit;
    var sbp = Math.round(this.data.sbp);
    var dbp = Math.round(this.data.dbp);
    //age judge
    if (age < 30 || age > 100) {
      this.setData({
        ageWarn: true
      })
    }
    //ldl-c/tc judge
    if (ldlunit == "mg/dL") {
      ldl = ldl / 38.61;
    }
    if (item == "LDL-C") {
      if (ldl < 1.8 || ldl > 10) {
        this.setData({
          ldlWarn: true
        })
      }
    }
    else {
      if (ldl < 3.1 || ldl > 14.4) {
        this.setData({
          ldlWarn: true
        })
      }
    }
    //hdl-c judge
    if (hdlunit == "mg/dL") {
      hdl = hdl / 38.61;
    }
    if (hdl < 0.5 || hdl > 3) {
      this.setData({
        hdlWarn: true
      })
    }
    //sbp&dbp judge
    if (sbp <= 60 || sbp > 200) {
      this.setData({
        sbpWarn: true
      })
    }
    if (dbp <= 40 || dbp > sbp) {
      this.setData({
        dbpWarn: true
      })
    }
  },
  //是否可以直接列为高危，并LDL/TC分层
  HighRiskJudge: function () {
    var age = Math.round(this.data.age);
    var ldl = this.data.ldl;
    var ldlunit = this.data.ldl_unit;
    var item = this.data.ldl_item;
    var diabetes = this.data.diabetes;
    var ldlhightag = false, ldlmidtag = false, agetag = false;
    var that = this;
    if (ldlunit == "mg/dL") {
      ldl = ldl / 38.61;
    }
    if (item == "LDL-C") {
      if (ldl >= 4.9) {
        ldlhightag = true;
      }
      else if (ldl >= 3.4 && ldl < 4.9) {
        ldlmidtag = true;
        console.log(ldl)
        that.setData({
          ldlLevel: 2
        })
      }
      else if (ldl >= 2.6 && ldl < 3.4) {
        ldlmidtag = true;
        that.setData({
          ldlLevel: 1
        })
      }
      else if (ldl >= 1.8 && ldl < 2.6) {
        ldlmidtag = true;
        that.setData({
          ldlLevel: 0
        })
      }
      else {
        that.setData({
          ldlLevel: -1
        })
      }
    }
    else {//TC
      if (ldl >= 7.2) {
        ldlhightag = true;
      }
      else if (ldl >= 5.2 && ldl < 7.2) {
        ldlmidtag = true;
        that.setData({
          ldlLevel: 2
        })
      }
      else if (ldl >= 4.1 && ldl < 5.2) {
        ldlmidtag = true;
        that.setData({
          ldlLevel: 1
        })
      }
      else if (ldl >= 3.1 && ldl < 4.1) {
        ldlmidtag = true;
        that.setData({
          ldlLevel: 0
        })
      }
      else {
        that.setData({
          ldlLevel: -1
        })
      }
    }
    if (age >= 40) {
      agetag = true;
    }
    if (ldlhightag) { return true; }
    else if (ldlmidtag && agetag && diabetes) { return true; }
    else { return false; }

  },
  //是否高血压
  HypertensionJudge: function () {
    var sbp = Math.round(this.data.sbp);
    var dbp = Math.round(this.data.dbp);
    if (sbp >= 140 || dbp >= 90) {
      this.setData({
        hypertension: true
      })
    }
    else {
      this.setData({
        hypertension: false
      })
    }
  },
  //危险因素个数计算
  RiskFactorNumCal: function () {
    var smoker = this.data.smoker;
    var hdl = this.data.hdl;
    var unit = this.data.hdl_unit;
    var age = Math.round(this.data.age);
    var sex = this.data.sex;
    var factor = 0;
    if (smoker) {
      factor++;
    }
    if (!sex && age >= 45) {
      factor++;
    }
    else if (sex && age >= 55) {
      factor++;
    }
    if (unit == "mg/dL") {
      hdl = hdl / 38.61;
    }
    if (hdl < 1) {
      factor++;
    }
    this.setData({
      RiskFactorNum: factor
    })
  },
  //危险分层
  RiskLevelJudge: function () {
    this.setData({
      ageWarn: false,
      sbpWarn: false,
      ldlWarn: false,
      hdlWarn: false,
      dbpWarn: false,
    })
    this.WarningJudge();
    if (!this.data.age || !this.data.sbp || !this.data.dbp || !this.data.ldl || !this.data.hdl) {
      console.log("false");
      return false;
    }
    //var highrisk=this.HighRiskJudge();
    if (this.HighRiskJudge()) {
      this.setData({
        result: this.data.RiskName[2]
      })
      console.log("true");
      return true;
    }
    this.HypertensionJudge();
    this.RiskFactorNumCal();
    var RiskFactorNum = this.data.RiskFactorNum;
    var ldlLevel = this.data.ldlLevel;
    var hypertension = this.data.hypertension;
    var tag = 0;
    if (hypertension) {
      //hypertension
      tag = this.data.HyperLevel[RiskFactorNum][ldlLevel];
    }
    else {
      tag = this.data.NormLevel[RiskFactorNum][ldlLevel];
    }
    this.setData({
      resultlevel: tag,
      result: this.data.RiskName[tag]
    })
    return this.data.RiskName[tag]
  },

  clear: function () {
    this.setData({
      age: "",
      sex: false,
      smoker: false,
      diabetes: false,
      ldl: "",
      hdl: "",
      ldlfix2: "",
      hdlfix2: "",
      ldl_item: "LDL-C",
      ldl_unit: "mmol/L",
      hdl_unit: "mmol/L",
      sbp: "",
      dbp: "",
      ldlLevel: 0,
      RiskFactorNum: 0,
      hypertension: false,
      resultlevel: 0,
      result: null,
      ageWarn: false,
      ldlWarn: false,
      hdlWarn: false,
      sbpWarn: false,
      dbpWarn: false,
    })
  },
  MoreRiskJudge: function () {
    //添加判断传参
    var BpRisk = false, SmokerRisk = false, HdlRisk = false;
    var hdl = this.data.hdl;
    if (this.data.sbp >= 160 || this.data.dbp >= 100) {
      BpRisk = true;
    }
    if (this.data.hdl_unit == 'mg/dL') {
      hdl = hdl / 38.61;
    }
    if (hdl < 1.0) {
      HdlRisk = true;
    }
    SmokerRisk=this.data.smoker;
    wx.navigateTo({
      url: 'ASCVD2?BpRisk=' + BpRisk + '&SmokerRisk=' + SmokerRisk + '&HdlRisk=' + HdlRisk,
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
      title: '疾病风险评估小助手',
      path: '/pages/ASCVD/ASCVD',
      success: function (res) {

      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }
})