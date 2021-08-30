var express = require("express");
var app = express();
var request = require("request");
var port = 3000;

app.set("view engine", "ejs");

app.get("/", function (req, res) {
	res.render("search");
});

app.get("/results", function (req, res) {
	var query = req.query.search;
	var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";

	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("results", { data: data });
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
