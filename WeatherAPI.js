const rootUrl='http://api.openweathermap.org/data/2.5/weather?appid=fd8e8f20fe50506a208982d447f5171a'

export const fetchWeather = (lat, lon) => {
	const url= rootUrl+'&lat='+lat+'&lon='+lon
	console.log("url: "+url)
	return fetch(url)
	.then(res=> res.json())
	.then(json => ({
		temp:json.main.temp,
		weather:json.weather[0].main,
		
	}))
}