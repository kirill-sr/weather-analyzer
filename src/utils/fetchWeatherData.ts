export async function fetchWeatherData(startDate: Date, endDate: Date) {
  const url = 'http://localhost:3000/api/meteo'
  const parsedStartDate = startDate.toISOString().split('T')[0]
  const parsedEndDate = endDate.toISOString().split('T')[0]

  const data = await fetch(`${url}?start_date=${parsedStartDate}&end_date=${parsedEndDate}`)
  return await data.json()
}