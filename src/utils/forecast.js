const request = require("request");

const forecast = (lat, lon, callback) => {
	const url =
		"http://api.openweathermap.org/data/2.5/weather?lat=" +
		lat +
		"&lon=" +
		lon +
		"&appid=5e8ed9c72a230a538ccd588db9f736ac&units=metric";

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather services");
		} else if (body.message) {
			callback(body.message);
		} else {
			const data = body;
			callback(undefined, {
				description: data.weather[0].description,
				temperature: data.main.temp,
				feels_like: data.main.feels_like,
				wind_speed: data.wind.speed,
			});
		}
	});
};

module.exports = forecast;
