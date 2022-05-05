export const fetchPhoto = async (): Promise<string> => {
  return fetch('https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=en-US', {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    }
  })
    .then((data) => {
      console.log('Fetched Pic', data)
      return data
    })
    .catch((err) => {
      console.log('Error fetched pic', err)
      return null
    })
}
