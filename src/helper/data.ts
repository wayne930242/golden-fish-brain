import { ICode } from "../interface"
export const LuckyCodes = (code: ICode[], num: number): ICode[] => {
  if (num === NaN) return []

  return shuffle(code).slice(0, num - 1)
}

const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const day: number = 1000 * 60 * 50 * 24

// Index is the 'should review' number 
const division = [
  2 * day,
  4 * day,
  8 * day,
  15 * day,
  30 * day,
]
