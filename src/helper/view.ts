export const timeParser = (value: number): string => {
  const time = new Date(value)
  return (
    String(Number(time.getMonth()) + 1) + '/' + 
    time.getUTCDate() + '/' +
    time.getFullYear() 
  )
}
