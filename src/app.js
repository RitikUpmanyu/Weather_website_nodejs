const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define paths
const pubdir = path.join(__dirname, "..", "/public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars
app.set("view engine", "hbs"); //this is for dynamic templating
app.set("views", viewsPath); //(optional) for cusomizing views path
hbs.registerPartials(partialsPath);

//setup static dir to serve
app.use(express.static(pubdir));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather app",
		name: "Ritik",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		para: "ya so this is the help page",
		name: "Ritik",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
		name: "ME ob",
	});
});

app.get("/product", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "you must provide the search term",
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "you must provide the search term",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({
					error,
				});
			}
			forecast(latitude, longitude, (error, data1) => {
				if (error) {
					return res.send({
						error,
					});
				}
				res.send({
					query: req.query.address,
					location,
					temperature: data1,
				});
			});
		}
	);
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "Sorry :( can't help you here",
		msg: "help article not found",
		name: "ritik",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		msg: "Page Not Found bruh",
		name: "ritik",
	});
});
app.listen(3000, () => {
	console.log("server up on 3000");
});
