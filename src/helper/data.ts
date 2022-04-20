import { ICode } from "../interface"

export const LuckyCodes = (codes: ICode[], num: number): ICode[] => {
  if (num === NaN) return []
  const now = Date.now()
  const groupsCode: [ICode[], ICode[], ICode[], ICode[], ICode[]] = [[], [], [], [], []]

  for (const code of codes) {
    const times = code.reviewTime.length > 3 ? 4 : code.reviewTime.length
    if (times === 0) {
      groupsCode[0].push(code)
    }
    else if (code.reviewTime[code.reviewTime.length - 1] <= now) groupsCode[times].push(code)
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

export const getReviewTime = (code: ICode): number => {
  const now = Date.now()
  const times = code.reviewTime.length > 3 ? 4 : code.reviewTime.length

  return now + division[times]
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

