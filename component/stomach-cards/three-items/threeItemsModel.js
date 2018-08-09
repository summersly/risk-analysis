const scoreSystem = {
  ageTable: [0, 0, 5, 6, 10],
  G17Table: [0, 3, 5, 5],
  sexTable: [4, 0],
  PGRTable: [0, 0, 3]
}

function agelevel(age) {
  if (age > 69) {
    return 4
  } else if (age > 59) {
    return 3 //  40+
  } else if (age > 49) {
    return 2
  } else if (age >= 40) {
    return 1
  } else return 0
}

function PGRlevel(PGR) {
  if (PGR < 3.89) {
    return 2 //  40+
  } else if (PGR <= 7) {
    return 1 //  40-
  } else return 0
}

function G17level(G17) {
  if (G17 > 7) {
    return 3 //  40-
  } else if (G17 > 5.7) {
    return 2 //  40+
  } else if (G17 > 1.5) {
    return 1
  } else return 0
}
export default {
  calculate: function(ageValue, pgrValue, g17Value, sex) {
    let age = agelevel(ageValue)
    let pgr = PGRlevel(pgrValue)
    let g17 = G17level(g17Value)
    console.log(age)
    console.log(pgr)
    console.log(g17)
    let riskResult = ''
    if (!age) {
      // 40以下三项评估
      if (g17 === 3) {
        if (pgr) {
          // PGR异常 G17异常
          riskResult = '胃病风险程度较高，需门诊进一步治疗'
        } else {
          // PGR正常
          riskResult = '胃病风险程度低，定期复查'
        }
      } else {
        if (pgr) {
          // PGR异常 G17正常
          riskResult = '胃病风险程度低，定期复查'
        } else {
          // PGR正常
          riskResult = '胃功能基本正常'
        }
      }
    } else {
      let score = scoreSystem.ageTable[age] + scoreSystem.G17Table[g17] + scoreSystem.sexTable[sex] + scoreSystem.PGRTable[pgr]
      if (score > 0 && score <= 10) {
        if (pgr < 2 && g17 < 2) {
          riskResult = '胃功能基本正常' //  两项正常
        } else if (pgr < 2 || g17 < 2) {
          riskResult = '胃病风险程度低，定期复查'
        } else {
          riskResult = '胃病风险程度较高，需门诊进一步治疗'
        }
      } else if (score >= 11 && score <= 15) {
        if (pgr < 2 && g17 < 2) {
          riskResult = '定期复查' //  两项正常
        } else {
          riskResult = '胃镜检查'
        }
      } else {
        riskResult = '强烈推荐胃镜检查'
      }
    }
    return riskResult
  }
}