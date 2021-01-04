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
/*
* export
* */
module.exports = main;
