const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg1");
const msgTwo = document.querySelector("#msg2");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	msgOne.textContent = "loading...";
	msgTwo.textContent = "";
	const location = search.value;
	fetch("/weather?address=" + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				return (
					(msgOne.textContent = data.error), (msgTwo.textContent = "")
				);
			}
			console.log(data);
			msgOne.textContent = data.location;
			msgTwo.textContent =
				data.temperature.description +
				". It is currently " +
				data.temperature.temperature +
				"℃. Though it feels like " +
				data.temperature.feels_like +
				"℃ and wind speed is " +
				data.temperature.wind_speed;
		});
	});
});
