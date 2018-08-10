const mensmokerArr = [[[26, 30, 35, 41, 47], [18, 21, 25, 29, 34], [13, 15, 17, 20, 24], [9, 10, 12, 14, 17]],
[[18, 21, 24, 28, 33], [12, 14, 17, 21, 24], [8, 10, 12, 14, 17], [6, 7, 8, 10, 12]],
[[12, 13, 16, 19, 22], [8, 9, 11, 13, 16], [5, 6, 8, 9, 11], [4, 4, 5, 6, 8]],
[[7, 8, 10, 12, 14], [5, 6, 7, 8, 10], [3, 4, 5, 6, 7], [2, 3, 3, 4, 5]],
[[2, 2, 3, 3, 4], [1, 2, 2, 2, 3], [1, 1, 1, 2, 2], [1, 1, 1, 1, 1]]]
const mennonsmokerArr = [[[14, 16, 19, 22, 26], [9, 11, 13, 15, 16], [6, 8, 9, 11, 13], [4, 5, 6, 7, 9]],
[[9, 11, 13, 5, 18], [6, 7, 9, 10, 12], [4, 5, 6, 7, 9], [3, 3, 4, 5, 6]],
[[6, 7, 8, 10, 12], [4, 5, 6, 7, 8], [3, 3, 4, 5, 6], [2, 2, 3, 3, 4]],
[[4, 4, 5, 6, 7], [2, 3, 3, 4, 5], [2, 2, 2, 3, 3], [1, 1, 2, 2, 2]],
[[1, 1, 1, 2, 2], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 0, 1, 1, 1]]]
const womensmokerArr = [[[13, 15, 17, 19, 22], [9, 10, 12, 13, 16], [6, 7, 8, 9, 11], [4, 5, 5, 6, 7]],
[[8, 9, 10, 11, 13], [5, 6, 7, 8, 9], [3, 4, 5, 5, 6], [2, 3, 3, 4, 4]],
[[4, 5, 5, 6, 7], [3, 3, 4, 4, 5], [2, 2, 2, 3, 3], [1, 1, 2, 2, 2]],
[[2, 2, 3, 3, 4], [1, 2, 2, 2, 3], [1, 1, 1, 1, 2], [1, 1, 1, 1, 1]],
[[0, 0, 0, 1, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]]
const womennonsmokerArr = [[[7, 8, 9, 10, 12], [5, 5, 6, 7, 8], [3, 3, 4, 5, 6], [2, 2, 3, 3, 4]],
[[4, 4, 5, 6, 7], [3, 3, 3, 4, 5], [2, 2, 2, 3, 3], [1, 1, 2, 2, 2]],
[[2, 2, 3, 3, 4], [1, 2, 2, 2, 3], [1, 1, 1, 1, 2], [1, 1, 1, 1, 1]],
[[1, 1, 1, 2, 2], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 0, 1, 1, 1]],
[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]]
export default {
  agelevel: function (age) {
    if (age < 45) {
      return 4
    } else if (age >= 45 && age < 53) {
      return 3
    } else if (age >= 53 && age < 58) {
      return 2
    } else if (age >= 58 && age < 63) {
      return 1
    } else if (age >= 63) {
      return 0
    }
  },
  sbplevel: function (sbp) {
    if (sbp < 130) {
      return 3
    } else if (sbp >= 130 && sbp < 150) {
      return 2
    } else if (sbp >= 150 && sbp < 170) {
      return 1
    } else if (sbp >= 170) {
      return 0
    }
  },
  tclevel: function (tc) {
    if (tc < 4.5) {
      return 0
    } else if (tc >= 4.5 && tc < 5.5) {
      return 1
    } else if (tc >= 5.5 && tc < 6.5) {
      return 2
    } else if (tc >= 6.5 && tc < 7.5) {
      return 3
    } else if (tc >= 7.5) {
      return 4
    }
  },
  calculate: function (ageValue, tcValue, sbpValue, sex, smoker) {
    let age = this.agelevel(ageValue)
    let sbp = this.sbplevel(sbpValue)
    let tc = this.tclevel(tcValue)
    let riskResult = ''
    if (!sex) {
      if (!smoker) {
        // men-nonsmoker
        riskResult = mennonsmokerArr[age][sbp][tc] + '%'
      } else {
        // men-smoker
        riskResult = mensmokerArr[age][sbp][tc] + '%'
      }
    } else {
      if (!smoker) {
        // women-nonsmoker
        riskResult = womennonsmokerArr[age][sbp][tc] + '%'
      } else {
        // women-smoker
        riskResult = womensmokerArr[age][sbp][tc] + '%'
      }
    }
    return riskResult
  }
}