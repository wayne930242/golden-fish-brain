import { ICode } from "../interface"
import { timeParser } from "./view"

export const LuckyCodes = (codes: ICode[], num: number, type: string = 'memoCurve'): ICode[] => {
  if (num === NaN) return []
  const groupsCode: [ICode[], ICode[], ICode[], ICode[], ICode[]] = [[], [], [], [], []]

  switch (type) {
    case 'peeped':
      for (const code of codes) {
        const times = code.reviewTime.length > 3 ? 4 : code.reviewTime.length
        if (times === 0) {
          groupsCode[0].push(code)
        }
        else if (code.hasPeeped.length !== 0 && code.hasPeeped[code.hasPeeped.length - 1]) {
          groupsCode[0].push(code)
        }
      }
      break
    case 'familiar':
      for (const code of codes) {
        const times = code.reviewTime.length > 3 ? 4 : code.reviewTime.length
        if (times === 0) {
          groupsCode[0].push(code)
        }
        else if (code.familiar.length !== 0 && code.familiar[code.hasPeeped.length - 1]) {
          groupsCode[code.familiar[code.hasPeeped.length - 1]].push(code)
        }
      }
      break
    default:
      const now = Date.now()
      for (const code of codes) {
        const times = code.reviewTime.length > 3 ? 4 : code.reviewTime.length
        if (times === 0) {
          groupsCode[0].push(code)
        }
        else if (code.reviewTime[code.reviewTime.length - 1] + division[times] <= now) groupsCode[times].push(code)
      }
  }

  const result: ICode[] = []
  let i = 0
  let p = 0
  while (i < num && p < 5) {
    const r = Math.floor(Math.random() * (groupsCode[p].length))
    if (groupsCode[p][r] !== undefined) {
      result.push(groupsCode[p][r])
      groupsCode[p].splice(r, 1)
    }
    i++
    if (i > groupsCode[p].length) p++
  }
  return result
}

export const getReviewString = (code: ICode): string => {
  const times = code.reviewTime.length > 3 ? 4 : code.reviewTime.length
  if (times === 0) return '還沒複習過'

  return '已經複習' +
    code.reviewTime.length + '次，' +
    '下次複習時間：' + timeParser(code.reviewTime[code.reviewTime.length - 1] + division[times])
}

const day: number = 1000 * 60 * 50 * 24
const longTime = 30 * day

// Index is the 'should review' number 
const division = [
  2 * day,
  4 * day,
  8 * day,
  15 * day,
  longTime,
]

