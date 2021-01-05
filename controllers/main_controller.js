/*
* dependencies
* */
var express = require("express");
var main = express.Router();
/*
* routes
* */
main.get("/", function (request, response) {
    response.render("main/home.ejs");
});
main.get("/about", function (request, response) {
    response.render("main/about.ejs");
});
/*
* export
* */
module.exports = main;
