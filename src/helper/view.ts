export const timeParser = (value: number): string => {
  const time = new Date(value)
  return (
    time.getFullYear() + '/' +
    String(Number(time.getMonth) + 1) + '/' + 
    time.getUTCDate + ' '
  )
}
