const mldlPtsTable = {
  mAgeLdlPts: [-1, 0, 1, 2, 3, 4, 5, 6, 7],
  mLdlLdlPts: [-3, 0, 0, 1, 2],
  mHdlLdlPts: [2, 1, 0, 0, -1],
  mBpLdlPts: [0, 0, 1, 2, 3],
  mDiabLdlPts: [0, 2],
  mSmokerLdlPts: [0, 2],
  mLDLRisk: [1, 2, 2, 3, 4, 4, 6, 7, 9, 11, 14, 18, 22, 27, 33, 40, 47, 56]
}
const mtcPtsTable = {
  mAgeCholPts: [-1, 0, 1, 2, 3, 4, 5, 6, 7],
  mTcCholPts: [-3, 0, 1, 2, 3],
  mHdlCholPts: [2, 1, 0, 0, -2],
  mBpCholPts: [0, 0, 1, 2, 3],
  mDiabCholPts: [0, 2],
  mSmokerCholPts: [0, 2],
  mCholRisk: [2, 2, 2, 3, 3, 4, 6, 7, 8, 10, 13, 16, 20, 25, 31, 37, 45, 53]
}
const fldlPtsTable = {
  fAgeLdlPts: [-9, -4, 0, 3, 6, 7, 8, 8, 8],
  fLdlLdlPts: [-2, 0, 0, 2, 2],
  fHdlLdlPts: [5, 2, 1, 0, -2],
  fBpLdlPts: [-3, 0, 0, 2, 3],
  fDiabLdlPts: [0, 4],
  fSmokerLdlPts: [0, 2],
  fLDLRisk: [1, 2, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17, 20, 24, 27, 32]
}
const ftcPtsTable = {
  fAgeCholPts: [-9, -4, 0, 3, 6, 7, 8, 8, 8],
  fTcCholPts: [-2, 0, 1, 1, 3],
  fHdlCholPts: [5, 2, 1, 0, -3],
  fBpCholPts: [-3, 0, 0, 2, 3],
  fDiabCholPts: [0, 4],
  fSmokerCholPts: [0, 2],
  fCholRisk: [1, 2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 10, 11, 13, 15, 15, 18, 20, 24, 27]
}
export default {
  agelevel: function(age) {
    if (age >= 30 && age <= 34) {
      return 0
    } else if (age >= 35 && age <= 39) {
      return 1
    } else if (age >= 40 && age <= 44) {
      return 2
    } else if (age >= 45 && age <= 49) {
      return 3
    } else if (age >= 50 && age <= 54) {
      return 4
    } else if (age >= 55 && age <= 59) {
      return 5
    } else if (age >= 60 && age <= 64) {
      return 6
    } else if (age >= 65 && age <= 69) {
      return 7
    } else if (age >= 70 && age <= 74) {
      return 8
    }
  },
  bplevel: function(sbp , dbp) {
    let spts, dpts
    if (sbp < 120) {
      spts = 0
    } else if (sbp >= 120 && sbp <= 129) {
      spts = 1
    } else if (sbp >= 130 && sbp <= 139) {
      spts = 2
    } else if (sbp >= 140 && sbp <= 159) {
      spts = 3
    } else if (sbp >= 160) {
      spts = 4
    }
    if (dbp < 80) {
      dpts = 0
    } else if (dbp >= 80 && dbp <= 84) {
      dpts = 1
    } else if (dbp >= 85 && dbp <= 89) {
      dpts = 2
    } else if (dbp >= 90 && dbp <= 99) {
      dpts = 3
    } else if (dbp >= 100) {
      dpts = 4
    }
    return spts > dpts ? spts : dpts
  },
  hdllevel: function(hdl) {
    if (hdl < 35) {
      return 0
    } else if (hdl >= 35 && hdl < 45) {
      return 1
    } else if (hdl >= 45 && hdl < 50) {
      return 2
    } else if (hdl >= 50 && hdl < 60) {
      return 3
    } else if (hdl >= 60) {
      return 4
    }
  },
  tclevel: function(tc,lable) {
    if (lable) {
      // tc
      if (tc < 160) {
        return 0
      } else if (tc >= 160 && tc < 200) {
        return 1
      } else if (tc >= 200 && tc < 240) {
        return 2
      } else if (tc >= 240 && tc < 280) {
        return 3
      } else if (tc >= 280) {
        return 4
      }
    } else {
      //ldl
      if (tc < 100) {
        return 0
      } else if (tc >= 100 && tc < 130) {
        return 1
      } else if (tc >= 130 && tc < 160) {
        return 2
      } else if (tc >= 160 && tc < 190) {
        return 3
      } else if (tc >= 190) {
        return 4
      }
    }
  },
  calculate: function (ageValue, tcValue, hdlValue, sbpValue, dbpValue, sex, smoker, diabetes, lable) {
    let age = this.agelevel(ageValue)
    let bp = this.bplevel(sbpValue, dbpValue)
    let tc = this.tclevel(tcValue,lable)
    let hdl = this.hdllevel(hdlValue)
    let riskResult = ''
    if (!sex) {
      if (!lable) {
        // use mldlPtsTable
        let pts1 = mldlPtsTable.mAgeLdlPts[age] + mldlPtsTable.mLdlLdlPts[tc] + mldlPtsTable.mHdlLdlPts[hdl]
        let pts2 = mldlPtsTable.mBpLdlPts[bp] + mldlPtsTable.mDiabLdlPts[diabetes] + mldlPtsTable.mSmokerLdlPts[smoker]
        let totalpts = pts1 + pts2 + 3
        console.log(pts1+pts2)
        if (totalpts < 0) {
          riskResult = '≤1%'
        } else if (totalpts > 17) {
          riskResult = '≥56%'
        } else {
          riskResult = mldlPtsTable.mLDLRisk[totalpts] + '%'
        }
      } else {
        // use mtcPtsTable
        let pts1 = mtcPtsTable.mAgeCholPts[age] + mtcPtsTable.mTcCholPts[tc] + mtcPtsTable.mHdlCholPts[hdl]
        let pts2 = mtcPtsTable.mBpCholPts[bp] + mtcPtsTable.mDiabCholPts[diabetes] + mtcPtsTable.mSmokerCholPts[smoker]
        let totalpts = pts1 + pts2 + 3
        if (totalpts < 0) {
          riskResult = '≤2%'
        } else if (totalpts > 17) {
          riskResult = '≥53%'
        } else {
          riskResult = mtcPtsTable.mCholRisk[totalpts] + '%'
        }
      }
    } else {
      if (!smoker) {
        // use fldlPtsTable
        let pts1 = fldlPtsTable.fAgeLdlPts[age] + fldlPtsTable.fLdlLdlPts[tc] + fldlPtsTable.fHdlLdlPts[hdl]
        let pts2 = fldlPtsTable.fBpLdlPts[bp] + fldlPtsTable.fDiabLdlPts[diabetes] + fldlPtsTable.fSmokerLdlPts[smoker]
        let totalpts = pts1 + pts2 + 2
        if (totalpts < 0) {
          riskResult = '≤1%'
        } else if (totalpts > 19) {
          riskResult = '≥32%'
        } else {
          riskResult = fldlPtsTable.fLDLRisk[totalpts] + '%'
        }
      } else {
        // use ftcPtsTable
        let pts1 = ftcPtsTable.fAgeCholPts[age] + ftcPtsTable.fTcCholPts[tc] + ftcPtsTable.fHdlCholPts[hdl]
        let pts2 = ftcPtsTable.fBpCholPts[bp] + ftcPtsTable.fDiabCholPts[diabetes] + ftcPtsTable.fSmokerCholPts[smoker]
        let totalpts = pts1 + pts2 + 2
        if (totalpts < 0) {
          riskResult = '≤1%'
        } else if (totalpts > 17) {
          riskResult = '≥27%'
        } else {
          riskResult = ftcPtsTable.fCholRisk[totalpts] + '%'
        }
      }
    }
    return riskResult
  }
}