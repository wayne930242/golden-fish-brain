import { TypeLaws } from "../data/laws"

export const setLastLaw = (law: TypeLaws) => {
  localStorage.setItem('last_law', law)
}

export const getLastLaw = (): TypeLaws => {
  const lastLaw = localStorage.getItem('last_law') as TypeLaws
  return lastLaw ?? null
}
