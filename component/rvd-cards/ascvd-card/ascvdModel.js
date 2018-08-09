const RiskNameList = ['低危(<5%)', '中危(5%-9%)', '高危(≥10%)']
const NormLevel = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 1],
  [0, 1, 1]
]
const HyperLevel = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 2, 2],
  [2, 2, 2]
]
export default {
  agelevel: function(sex, age) {
    if (!sex) {
      return age > 45 ? 1 : 0 // 1危险因素为真
    } else {
      return age > 55 ? 1 : 0
    }
  },
  bplevel: function(sbp, dbp) {
    if (sbp >= 160 || dbp >= 100) {
      return 2
    } else if (sbp >= 140 || dbp >= 90) {
      return 1 //  1危险因素为真
    } else return 0
  },
  hdllevel: function(hdl) {
    if (hdl < 1) {
      return 1 //  1危险因素为真
    } else return 0
  },
  tclevel: function(tc, lable) {
    if (lable) {
      // tc
      if (tc >= 7.2) {
        return 3
      } else if (tc >= 5.2 && tc < 7.2) {
        return 2
      } else if (tc >= 4.1 && tc < 5.2) {
        return 1
      } else if (tc >= 3.1 && tc < 4.1) {
        return 0
      } else {
        return -1
      }
    } else {
      //ldl
      if (tc >= 4.9) {
        return 3
      } else if (tc >= 3.4 && tc < 4.9) {
        return 2
      } else if (tc >= 2.6 && tc < 3.4) {
        return 1
      } else if (tc >= 1.8 && tc < 2.6) {
        return 0
      } else {
        return -1
      }
    }
  },
  calculate: function(ageValue, tcValue, hdlValue, sbpValue, dbpValue, sex, smoker, diabetes, lable) {
    let age = this.agelevel(sex, ageValue)
    let bp = this.bplevel(sbpValue, dbpValue)
    let hdl = this.hdllevel(hdlValue)
    let tc = this.tclevel(tcValue, lable)
    let riskResultIndex = 0
    let riskFactorNum = smoker + age + hdl
    if ((tc == 3) || (diabetes && (ageValue >= 40) && tc != 3)) {
      riskResultIndex = 2
    } else {
      if (bp) {
        riskResultIndex = HyperLevel[riskFactorNum][tc]
      } else {
        riskResultIndex = NormLevel[riskFactorNum][tc]
      }
    }
    let more = (riskResultIndex == 1 && ageValue < 55 && ageValue > 0)
    return {
      riskResult: RiskNameList[riskResultIndex],
      more: more
    }
  },

}