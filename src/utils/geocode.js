const request = require("request");

const geocode = (adress, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		adress +
		".json?access_token=pk.eyJ1Ijoicml0aWt1cG1hbnl1IiwiYSI6ImNrYTk4ZHBhZDAzbW4yeXJ1MWtrOTU0ZXcifQ.WFNrSKVNQmFUqA1BJlJHqg&limit=1";
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to convert this address to a location");
		} else if (body.message) {
			callback(body.message);
		} else if (body.features.length == 0) {
			callback("Adress not found. Try again with different search");
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
