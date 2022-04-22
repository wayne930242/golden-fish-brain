export const EndTime = new Date('2022-07-15').getTime()

export const countDown = (): number => {
  const remain = EndTime - Date.now() > 0 ? EndTime - Date.now() : 0
  const remainingDay: number = ~~(remain / (1000 * 60 * 60 * 24))
  return remainingDay
}
