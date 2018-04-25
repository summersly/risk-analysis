// pages/Framingham/Framingham.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: "",
    sex: 0,
    sexname: "男",
    smoker: 0,
    smokername: "否",
    diabetes: 0,
    diabname: "否",
    ldl: "",
    hdl: "",
    ldlfix2: "",
    hdlfix2: "",
    ldl_item: "LDL-C",
    ldl_unit: "mmol/L",
    hdl_unit: "mmol/L",
    sbp: "",
    dbp: "",
    sexArr: ["男", "女"],
    smokerArr: ["否", "是"],
    diabArr: ["否", "是"],
    //LDL Pts Table for men
    mAgeLdlPts: [-1, 0, 1, 2, 3, 4, 5, 6, 7],
    mLdlLdlPts: [-3, 0, 0, 1, 2],
    mHdlLdlPts: [2, 1, 0, 0, -1],
    mBpLdlPts: [0, 0, 1, 2, 3],
    mDiabLdlPts: [0, 2],
    mSmokerLdlPts: [0, 2],
    mLDLRisk: [1, 2, 2, 3, 4, 4, 6, 7, 9, 11, 14, 18, 22, 27, 33, 40, 47, 56],
    //Chol Pts Table for men
    mAgeCholPts: [-1, 0, 1, 2, 3, 4, 5, 6, 7],
    mTcCholPts: [-3, 0, 1, 2, 3],
    mHdlCholPts: [2, 1, 0, 0, -2],
    mBpCholPts: [0, 0, 1, 2, 3],
    mDiabCholPts: [0, 2],
    mSmokerCholPts: [0, 2],
    mCholRisk: [2, 2, 2, 3, 3, 4, 6, 7, 8, 10, 13, 16, 20, 25, 31, 37, 45, 53],
    //LDL Pts Table for women
    fAgeLdlPts: [-9, -4, 0, 3, 6, 7, 8, 8, 8],
    fLdlLdlPts: [-2, 0, 0, 2, 2],
    fHdlLdlPts: [5, 2, 1, 0, -2],
    fBpLdlPts: [-3, 0, 0, 2, 3],
    fDiabLdlPts: [0, 4],
    fSmokerLdlPts: [0, 2],
    fLDLRisk: [1, 2, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17, 20, 24, 27, 32],
    //Chol Pts Table for women
    fAgeCholPts: [-9, -4, 0, 3, 6, 7, 8, 8, 8],
    fTcCholPts: [-2, 0, 1, 1, 3],
    fHdlCholPts: [5, 2, 1, 0, -3],
    fBpCholPts: [-3, 0, 0, 2, 3],
    fDiabCholPts: [0, 4],
    fSmokerCholPts: [0, 2],
    fCholRisk: [1, 2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 10, 11, 13, 15, 15, 18, 20, 24, 27],
    result: null,
    ponittotal: 0,
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
    })
  },
  switchSexChange: function (e) {
    this.setData({
      sex: e.detail.value,
      result: null,
    })
  },
  switchSmokerChange: function (e) {
    this.setData({
      smoker: e.detail.value,
      result: null,
    })
  },
  switchDiabetesChange: function (e) {
    this.setData({
      diabetes: e.detail.value,
      result: null,
    })
  },
  bindsexChange: function (e) {
    this.setData({
      sexname: this.data.sexArr[e.detail.value],
      sex: e.detail.value,
      result: null,
    })
  },
  bindsmokerChange: function (e) {
    this.setData({
      smokername: this.data.smokerArr[e.detail.value],
      smoker: e.detail.value,
      result: null,
    })
  },
  binddiabChange: function (e) {
    this.setData({
      diabname: this.data.diabArr[e.detail.value],
      diabetes: e.detail.value,
      result: null,
    })
  },
  bindInputLdl: function (e) {
    this.setData({
      ldl: e.detail.value,
      result: null,
    })
  },
  bindInputHdl: function (e) {
    this.setData({
      hdl: e.detail.value,
      result: null,
    })
  },
  bindInputSbp: function (e) {
    this.setData({
      sbp: e.detail.value,
      result: null,
    })
  },
  bindInputDbp: function (e) {
    this.setData({
      dbp: e.detail.value,
      result: null,
    })
  },
  bindLDLItemChange: function () {
    if (this.data.ldl_item == "LDL-C") {
      this.setData({
        ldl_item: "TC",
        ldl: "",
        ldlfix2: "",
        result:null,
      })
    }
    else {
      this.setData({
        ldl_item: "LDL-C",
        ldl: "",
        ldlfix2: "",
        result:null,
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
  step1: function () {
    var age = Math.round(this.data.age);
    if (age < 30 || age > 74) {
      this.setData({
        ageWarn: true
      })
      return -1;
    }
    else if (age >= 30 && age <= 34) {
      return 0;
    }
    else if (age >= 35 && age <= 39) {
      return 1;
    }
    else if (age >= 40 && age <= 44) {
      return 2;
    }
    else if (age >= 45 && age <= 49) {
      return 3;
    }
    else if (age >= 50 && age <= 54) {
      return 4;
    }
    else if (age >= 55 && age <= 59) {
      return 5;
    }
    else if (age >= 60 && age <= 64) {
      return 6;
    }
    else if (age >= 65 && age <= 69) {
      return 7;
    }
    else if (age >= 70 && age <= 74) {
      return 8;
    }
  },
  step2_1: function () {
    var ldl = this.data.ldl;
    var unit = this.data.ldl_unit;
    if (unit == "mmol/L") {
      ldl = ldl * 38.61;
    }
    console.log(ldl)
    if (ldl < 80 || ldl > 350) {
      this.setData({
        ldlWarn: true
      })
    }
    if (ldl < 100) {
      return 0;
    }
    else if (ldl >= 100 && ldl < 130) {
      return 1;
    }
    else if (ldl >= 130 && ldl < 160) {
      return 2;
    }
    else if (ldl >= 160 && ldl < 190) {
      return 3;
    }
    else if (ldl >= 190) {
      return 4;
    }
  },
  step2_2: function () {
    var ldl = this.data.ldl;
    var unit = this.data.ldl_unit;
    if (unit == "mmol/L") {
      ldl = ldl * 38.61;
    }
    console.log(ldl)
    if (ldl < 150 || ldl > 465) {
      this.setData({
        ldlWarn: true
      })
    }
    if (ldl < 160) {
      return 0;
    }
    else if (ldl >= 160 && ldl < 200) {
      return 1;
    }
    else if (ldl >= 200 && ldl < 240) {
      return 2;
    }
    else if (ldl >= 240 && ldl < 280) {
      return 3;
    }
    else if (ldl >= 280) {
      return 4;
    }
  },
  step3: function () {
    var hdl = this.data.hdl;
    var unit = this.data.hdl_unit;
    if (unit == "mmol/L") {
      hdl = hdl * 38.61;
    }
    if (hdl < 10 || hdl > 80) {
      this.setData({
        hdlWarn: true
      })
    }
    if (hdl < 35) {
      return 0;
    }
    else if (hdl >= 35 && hdl < 45) {
      return 1;
    }
    else if (hdl >= 45 && hdl < 50) {
      return 2;
    }
    else if (hdl >= 50 && hdl < 60) {
      return 3;
    }
    else if (hdl >= 60) {
      return 4;
    }
  },
  step4: function () {
    var sbp = Math.round(this.data.sbp);
    var dbp = Math.round(this.data.dbp);
    var spts, dpts;
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
    if (sbp < 120) {
      spts = 0;
    }
    else if (sbp >= 120 && sbp <= 129) {
      spts = 1;
    }
    else if (sbp >= 130 && sbp <= 139) {
      spts = 2;
    }
    else if (sbp >= 140 && sbp <= 159) {
      spts = 3;
    }
    else if (sbp >= 160) {
      spts = 4;
    }
    if (dbp < 80) {
      dpts = 0;
    }
    else if (dbp >= 80 && dbp <= 84) {
      dpts = 1;
    }
    else if (dbp >= 85 && dbp <= 89) {
      dpts = 2;
    }
    else if (dbp >= 90 && dbp <= 99) {
      dpts = 3;
    }
    else if (dbp >= 100) {
      dpts = 4;
    }
    if (spts > dpts) { return spts }
    else return dpts;
  },
  step5: function () {
    var diabetes = this.data.diabetes;
    if (!diabetes) {
      return 0;
    }
    else {
      return 1;
    }
  },
  step6: function () {
    var smoker = this.data.smoker;
    if (!smoker) {
      return 0;
    }
    else {
      return 1;
    }
  },
  calculate: function () {
    //添加输入值合法性检测
    this.setData({
      ageWarn: false,
      sbpWarn: false,
      ldlWarn: false,
      hdlWarn: false
    })
    var sex = this.data.sex, step2, ldlortc;
    if (this.data.ldl_item == "LDL-C") {
      step2 = this.step2_1();
      ldlortc = 0;//ldl
    }
    else {
      step2 = this.step2_2();
      ldlortc = 1;//tc
    }
    var step1 = this.step1(), step3 = this.step3();
    var step4 = this.step4(), step5 = this.step5(), step6 = this.step6();
    console.log(step4)
    if (step1 == -1 || !this.data.sbp || !this.data.ldl || !this.data.hdl) {
      console.log("false");
      return false;
    }
    //risk of chd in men
    var that = this;
    if (!sex) {
      if (!ldlortc) {
        var pts1 = this.data.mAgeLdlPts[step1], pts2 = this.data.mLdlLdlPts[step2];
        var pts3 = this.data.mHdlLdlPts[step3], pts4 = this.data.mBpLdlPts[step4];
        var pts5 = this.data.mDiabLdlPts[step5], pts6 = this.data.mSmokerLdlPts[step6];
        var ponittotal = pts1 + pts2 + pts3 + pts4 + pts5 + pts6 + 3;//+3为了对应arr的index
        that.setData({
          ponittotal: ponittotal - 3
        })
        if (ponittotal < 0) {
          that.setData({
            result: 1
          })
        }
        else if (ponittotal > 17) {
          that.setData({
            result: 56
          })
        }
        else {
          that.setData({
            result: this.data.mLDLRisk[ponittotal]
          })
        }
      }
      else {
        var pts1 = this.data.mAgeCholPts[step1], pts2 = this.data.mTcCholPts[step2];
        var pts3 = this.data.mHdlCholPts[step3], pts4 = this.data.mBpCholPts[step4];
        var pts5 = this.data.mDiabCholPts[step5], pts6 = this.data.mSmokerCholPts[step6];
        var ponittotal = pts1 + pts2 + pts3 + pts4 + pts5 + pts6 + 3;//+3为了对应arr的index
        that.setData({
          ponittotal: ponittotal - 3
        })
        if (ponittotal < 0) {
          that.setData({
            result: 2
          })
        }
        else if (ponittotal > 17) {
          that.setData({
            result: 53
          })
        }
        else {
          that.setData({
            result: this.data.mCholRisk[ponittotal]
          })
        }
      }
    }
    else {
      if (!ldlortc) {
        var pts1 = this.data.fAgeLdlPts[step1], pts2 = this.data.fLdlLdlPts[step2];
        var pts3 = this.data.fHdlLdlPts[step3], pts4 = this.data.fBpLdlPts[step4];
        var pts5 = this.data.fDiabLdlPts[step5], pts6 = this.data.fSmokerLdlPts[step6];
        console.log(pts1);
        console.log(pts2);
        console.log(pts3);
        console.log(pts4);
        console.log(pts5);
        console.log(pts6);
        var ponittotal = pts1 + pts2 + pts3 + pts4 + pts5 + pts6 + 2;//+2为了对应arr的index
        that.setData({
          ponittotal: ponittotal - 2
        })
        if (ponittotal < 0) {
          that.setData({
            result: 1
          })
        }
        else if (ponittotal > 19) {
          that.setData({
            result: 32
          })
        }
        else {
          that.setData({
            result: this.data.fLDLRisk[ponittotal]
          })
        }
      }
      else {
        var pts1 = this.data.fAgeCholPts[step1], pts2 = this.data.fTcCholPts[step2];
        var pts3 = this.data.fHdlCholPts[step3], pts4 = this.data.fBpCholPts[step4];
        var pts5 = this.data.fDiabCholPts[step5], pts6 = this.data.fSmokerCholPts[step6];
        console.log(pts1);
        console.log(pts2);
        console.log(pts3);
        console.log(pts4);
        console.log(pts5);
        console.log(pts6);
        var ponittotal = pts1 + pts2 + pts3 + pts4 + pts5 + pts6 + 2;//+2为了对应arr的index
        that.setData({
          ponittotal: ponittotal - 2
        })
        if (ponittotal < 0) {
          that.setData({
            result: 1
          })
        }
        else if (ponittotal > 19) {
          that.setData({
            result: 27
          })
        }
        else {
          that.setData({
            result: this.data.fCholRisk[ponittotal]
          })
        }
      }
    }
  },

  clear:function(){
    this.setData({
      age: "",
      sex: 0,
      smoker: 0,
      diabetes: 0,
      ldl: "",
      hdl: "",
      ldlfix2: "",
      hdlfix2: "",
      ldl_item: "LDL-C",
      ldl_unit: "mmol/L",
      hdl_unit: "mmol/L",
      sbp: "",
      dbp: "",
      result:null,
      ageWarn: false,
      ldlWarn: false,
      hdlWarn: false,
      sbpWarn: false,
      dbpWarn: false,
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
      path: '/pages/Framingham/Framingham',
      success: function (res) {

      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }
})